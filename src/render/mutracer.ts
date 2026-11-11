// ① 경로 추적 — MuTracer(@meimu/mutracer 0.2.0, WebGPU 우선 · WebGL 2 대체). 기존 웹 플래너(MutracerRenderer)와 같은 연결 방식:
// 별도 캔버스를 three 캔버스 밑에 깔고, THREESync 가 three 장면을 그대로 읽어 바뀐 것만 반영한다(도어 열림·모듈 교체 자동).
//
// 설정 = MuTracer 공식 뷰어(mutracer.meimu-studio.com/viewer) 기본값 그대로 — 뷰어 번들에서 확인(2026-10-27)
// - 최종: 64샘플 · 반사 6 · 해상도 1(배율 2 화면은 0.75 — 뷰어 0.5 는 흐릿해서 올림) · 수렴 중에도 OIDN standard 로 단계적 노이즈 제거
// - 미리보기(카메라를 움직이는 동안): 해상도 1(배율 2 화면 0.75, 느리면 0.5 까지 자동 — 뷰어는 0.5) · 80ms · 1샘플 · 반사 6(뷰어는 2 — 그늘이 어두워 톤이 달랐다) · 매 샘플 OIDN small · 최종에 맞춰 배운 톤 곡선
//   → 움직이는 동안 자글거리지 않는다. 컨트롤을 넘겨야 「움직이는 중」을 알고 미리보기로 바꾼다
// - 셰이더 컴파일(약 12초)은 페이지가 한가할 때 미리(prewarm), 엔진은 끄면 멈춰만 둔다
import type * as THREE from 'three';
import { Engine, RenderLoop, THREESync } from '@meimu/mutracer';

const MAX_SAMPLES = 64;
const WEIGHTS = `${import.meta.env.BASE_URL}oidn/`;     // OIDN 가중치(public/oidn) — 패키지 기본 경로는 Vite 개발 서버에서 못 읽는다
type Controls = { update(): unknown; addEventListener(t: 'start' | 'end', f: () => void): void; removeEventListener(t: 'start' | 'end', f: () => void): void };
type Inst = { engine: Engine; loop: RenderLoop; canvas: HTMLCanvasElement; ready: boolean; hold: Hold };
let inst: Inst | null = null;
let shown = false;
let onStatus: (text: string) => void = () => {};

// 움직임(카메라·도어)이 멈추거나 재질을 바꾸면 최종 렌더가 처음부터 다시 쌓이는데, 샘플이 몇 개뿐인 첫 화면은
// 노이즈 제거를 거쳐도 회색으로 어둡게 나와 「멈출 때마다 깜빡」였다(실측). 마지막으로 보이던 화면(미리보기·충분히 쌓인 최종)을
// 계속 복사해 두고, 최종이 HOLD_SAMPLES 샘플이 될 때까지 그 화면을 위에 덮어 두었다가 서서히 걷는다
const HOLD_SAMPLES = 8;type Hold = { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; has: boolean; on: boolean };
function makeHold(host: HTMLElement, src: HTMLCanvasElement): Hold {
  const canvas = document.createElement('canvas');
  canvas.className = 'mt-canvas';
  canvas.style.opacity = '0';
  canvas.style.transition = 'opacity .3s ease-out';
  src.after(canvas);
  return { canvas, ctx: canvas.getContext('2d')!, has: false, on: false };
}
// 미리보기(1샘플)는 노이즈 제거를 거쳐도 최종과 톤이 다르다 — 어둡고(평균 137 vs 158) 그늘이 특히 어둡고(하위 5% 93 vs 130)
// 덜 따뜻하다(R 비 1.026 vs 1.048, 2026-11-03 실측). 예전엔 화면 전체 밝기 배율(brightness)만 올려 밝은 곳은 더 밝고 색은 그대로였다
// (사용자 지적 「이동할 때랑 가만히 있을 때 빛이나 톤앤매너가 다르다」). 이제 최종이 끝날 때마다 직전 미리보기와 채널별 분위(1~99%)를
// 맞춘 톤 곡선을 배워(SVG feComponentTransfer) 미리보기에만 입힌다 — 밝기·대비·색이 함께 맞는다. 급변하지 않게 반씩 섞는다
const QS = [0.01, 0.05, 0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 0.99];
const NT = 33;                               // 곡선 표 칸 수(0 ~ 1)
// 시작 곡선 — 반사 6 미리보기 실측(평균 110 → 158)에 맞춘 단순 배율 1.4. 첫 최종이 끝나면 배운 곡선으로 바뀐다
let curve: number[][] = [0, 1, 2].map(() => Array.from({ length: NT }, (_, i) => Math.min(1, (i / (NT - 1)) * 1.4)));
let pvStats: number[][] | null = null;       // 직전 미리보기 채널별 분위(0 ~ 1)
const probe = document.createElement('canvas'); probe.width = 64; probe.height = 36;
const probeCtx = probe.getContext('2d', { willReadFrequently: true })!;
function quantiles(src: HTMLCanvasElement) {
  probeCtx.drawImage(src, 0, 0, probe.width, probe.height);
  const d = probeCtx.getImageData(0, 0, probe.width, probe.height).data, n = d.length / 4;
  return [0, 1, 2].map(c => {
    const v = new Float32Array(n); for (let i = 0; i < n; i++) v[i] = d[i * 4 + c] / 255;
    v.sort(); return QS.map(q => v[Math.min(n - 1, Math.floor(q * n))]);
  });
}
/** 미리보기 분위 p → 최종 분위 f 로 가는 단조 곡선(표). 너무 크게 꺾이지 않게 x×0.8 ~ x×2.4 안으로 */
function buildCurve(p: number[], f: number[]) {
  const xs = [0, ...p, 1], ys = [0, ...f, 1];
  for (let i = 1; i < xs.length; i++) { if (xs[i] <= xs[i - 1]) xs[i] = xs[i - 1] + 1e-4; ys[i] = Math.max(ys[i], ys[i - 1]); }
  return Array.from({ length: NT }, (_, k) => {
    const x = k / (NT - 1); let j = 1; while (j < xs.length - 1 && xs[j] < x) j++;
    const t = THREE_clamp((x - xs[j - 1]) / (xs[j] - xs[j - 1]), 0, 1), y = ys[j - 1] + t * (ys[j] - ys[j - 1]);
    return THREE_clamp(y, x * 0.8, Math.min(1, x * 2.4));
  });
}
const TONE_ID = 'mt-preview-tone';
let toneFuncs: SVGElement[] = [];
function toneFilter() {
  if (!toneFuncs.length) {
    const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute';
    const f = document.createElementNS(NS, 'filter'); f.id = TONE_ID; f.setAttribute('color-interpolation-filters', 'sRGB');
    const ct = document.createElementNS(NS, 'feComponentTransfer');
    toneFuncs = ['feFuncR', 'feFuncG', 'feFuncB'].map(t => { const e = document.createElementNS(NS, t); e.setAttribute('type', 'table'); ct.append(e); return e; });
    f.append(ct); svg.append(f); document.body.append(svg);
  }
  toneFuncs.forEach((e, c) => e.setAttribute('tableValues', curve[c].map(v => v.toFixed(4)).join(' ')));
  return `url(#${TONE_ID})`;
}

/** 화면에 내보낸 직후 — 최종이 막 시작됐으면 담아 둔 화면으로 덮고, 아니면 지금 화면을 담아 둔다 */
function holdAfterPresent(me: Inst, shownRender: unknown) {
  const h = me.hold, src = me.canvas;
  const preview = shownRender === me.loop.preview, final = shownRender === me.loop.final;
  src.style.filter = preview ? toneFilter() : '';
  if (preview) pvStats = quantiles(src);
  else if (final && me.loop.final.converged && pvStats) {
    // 같은 장면의 미리보기 ↔ 최종 분위로 곡선을 배운다(반씩 섞어 급변하지 않게)
    const fs = quantiles(src), p = pvStats;
    curve = curve.map((old, c) => { const t = buildCurve(p[c], fs[c]); return old.map((v, k) => v * 0.5 + t[k] * 0.5); });
    pvStats = null; toneFilter();
  }
  // 샘플 수가 아니라 「화면에 나간 노이즈 제거 결과가 몇 샘플짜리인가」로 판단한다. 0.2.0 은 progressive 정리를
  // 첫 샘플 다음엔 두 배 이상·0.5초 이상 간격으로만 한다 — 샘플이 8개 쌓여도 화면은 아직 1~2샘플 정리본(어두움)이라
  // 샘플 수로 걷으면 「밝은 덮개 → 어두운 그림 0.4초 → 밝은 그림」으로 깜빡였다(실측 밝기 163 → 122 → 164)
  const fin = me.loop.final as unknown as { samples: number; converged: boolean; _denoisedSamples?: number };
  const shownSamples = fin._denoisedSamples ?? fin.samples;   // 내부 값 — 없어지면 샘플 수로
  if (final && !fin.converged && shownSamples < HOLD_SAMPLES) {
    if (h.has && !h.on) { h.on = true; h.canvas.style.transition = 'none'; h.canvas.style.opacity = '1'; }
    return;
  }
  if (h.on) {
    h.on = false;
    // 충분히 쌓였으면 서서히 걷고, 다시 움직여 미리보기가 나오면 바로 걷는다
    h.canvas.style.transition = final ? 'opacity .3s ease-out' : 'none';
    h.canvas.style.opacity = '0';
  }
  if (h.canvas.width !== src.width || h.canvas.height !== src.height) { h.canvas.width = src.width; h.canvas.height = src.height; }
  h.ctx.filter = preview ? toneFilter() : 'none';
  h.ctx.drawImage(src, 0, 0);
  h.ctx.filter = 'none';
  h.has = true;
}
const THREE_clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function create(host: HTMLElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: Controls, ptState?: () => () => void): Inst {
  const canvas = document.createElement('canvas');
  canvas.className = 'mt-canvas';
  canvas.style.visibility = 'hidden';
  host.prepend(canvas);
  const engine = new Engine({ canvas });
  const sync = new THREESync(engine, {
    scene, camera, controls,
    updateControls: false,                 // 컨트롤은 플래너 화면 루프가 돌린다(감쇠 이중 적용 방지)
    // 치수선·선택 상자(선)·핫스팟은 경로 추적에 넣지 않는다. 표준 재질만 변환
    convertMaterial: (m: THREE.Material) => (m as THREE.MeshStandardMaterial).isMeshStandardMaterial ? undefined : null,
  } as any);
  // 화면에 안 보일 때(미리 준비) 장면을 읽어 가는 순간에만 실사 상태를 입혔다 되돌린다 — 실시간 화면은 그대로 두고
  // 실사를 켤 때와 같은 셰이더를 미리 컴파일한다(켤 때 컴파일 2.9초 → 0, 좋은 그림까지 4.6 → 1.5초)
  if (ptState) {
    const up = sync.update.bind(sync);
    sync.update = () => { if (shown) return up(); const restore = ptState(); try { up(); } finally { restore(); } };
  }
  const dpr = Math.min(devicePixelRatio, 2);
  const loop = new RenderLoop(engine, {
    sync,
    // 움직이는 동안 노이즈 제거된 미리보기만 보여 준다 — 끄면 제거 전 1샘플 화면이 그대로 보여 자글거린다(실측)
    coalesceSceneUpdates: true,
    preview: {
      // 움직이는 동안에도 화면 픽셀 그대로(사용자 요청 2026-10-29) — 0.5 는 흐렸다. 끄는 동안 실측(RTX 4080, 1600×1100):
      // 0.5 = 초당 41장·선명도 2.35 / 1 = 32장·3.13(멈춘 최종 2.94 보다 또렷). 느리면 0.5 까지만 자동으로 낮춘다
      resolutionScale: dpr >= 2 ? 0.75 : 1, timeBudgetMs: 80, adaptiveResolution: { targetFrameMs: 80, minScale: 0.5 },
      // 반사 6 — 2 면 간접광이 모자라 그늘이 어두웠다(하위 5% 밝기 93 vs 최종 130). 6 으로 올려도 샘플 시간 43 → 44ms(4080, 2026-11-03 실측)
      maxSamples: 1, bounces: 6, bevel: false, dispersionWavelengths: 1, directLightCandidates: 2,
      denoiser: { type: 'jnlm', schedule: 'every-sample' },
    },
    final: {
      // 해상도 — 공식 뷰어 기본(0.5)은 늘려 보여 흐릿했다(사용자 보고 2026-10-29). 화면 픽셀 그대로, 배율 2 화면만 0.75(CSS 픽셀당 1.5)
      maxSamples: MAX_SAMPLES, bounces: 6, resolutionScale: dpr >= 2 ? 0.75 : 1,
      // 0.2.0 공식 뷰어와 같게 — 멈춰 있으면 화면 프레임 사이에도 샘플을 채워 GPU 를 다 쓴다(움직이는 동안은 루프가 알아서 끈다).
      // 한 번에 넘기는 일감은 timeBudgetMs 기본 21ms
      batchSamples: true,
      denoiser: { type: 'jnlm', schedule: 'progressive' },
    },
  } as any);
  const me: Inst = { engine, loop, canvas, ready: false, hold: makeHold(host, canvas) };
  // 렌더 루프가 화면에 내보내는 바로 그 순간에 덮개를 판단·복사한다(같은 프레임 — 어두운 첫 화면이 한 장도 새지 않게)
  const present = engine.display.present.bind(engine.display);
  // 화면 설정(화이트밸런스·채도 등)은 여기서 바꾸지 않는다 — 바꾸면 MuTracer 가 노이즈 제거본을 지우고(_displayChanged),
  // 다 쌓인 뒤면 다시 만들지 않아 검정 잡티가 남고 깜빡였다(2026-10-29 멈춘 그림 색 보정 시도 → 되돌림)
  engine.display.present = (r: Parameters<typeof present>[0]) => { const shownRender = present(r); if (shownRender && shown) holdAfterPresent(me, shownRender); return shownRender; };
  // 캔버스는 화면 실제 픽셀(배율 포함) — 렌더 해상도는 위 resolutionScale 로 따로
  const resize = () => engine.display.setSize(Math.max(1, Math.round(host.clientWidth * dpr)), Math.max(1, Math.round(host.clientHeight * dpr)));
  new ResizeObserver(resize).observe(host); resize();
  const update = () => {
    if (!me.ready && loop.samples > 0) {
      me.ready = true;
      if (!shown) loop.stop();             // 미리 준비 — 첫 샘플(컴파일 끝)에서 멈춰 둔다
    }
    if (shown) onStatus(`MuTracer(${engine.backend ?? '…'}) ${statusText(loop.status)} · ${loop.samples}/${MAX_SAMPLES} 샘플`);
  };
  loop.on('status', update); loop.on('sample', update);
  engine.display.toneMapping = 'agx' as any;
  engine.display.toneMappingExposure = exposure * 1.5;
  engine.init().then(() => {
    if (engine.backend !== 'webgpu') return;     // WebGL 은 OIDN 없음 — JNLM 그대로
    // 매 샘플 정리 — 바꾼 뒤 「바로 좋아지게」(사용자 요청 2026-10-29). progressive(0.2.0: 두 배 이상·0.5초 간격)는
    // 놓은 뒤 좋은 그림까지 0.9초, 매 샘플은 0.58초. 대신 64샘플 완성은 3.2 → 4.3초(정리 비용, 1600×1100 실측)
    loop.final.setDenoiser({ type: 'oidn', model: 'standard', schedule: 'every-sample', weightsBaseUrl: WEIGHTS } as any).catch(e => console.warn('[MuTracer] OIDN', e));
    loop.preview?.setDenoiser({ type: 'oidn', model: 'small', schedule: 'every-sample', weightsBaseUrl: WEIGHTS } as any).catch(e => console.warn('[MuTracer] OIDN', e));
  }).catch(e => onStatus(`MuTracer 시작 실패: ${e?.message ?? e}`));
  loop.start();
  (window as any).__mutracer = { engine, sync, loop };
  return me;
}

let exposure = 1;
/** 노출 — 조명 패널. 실시간(Neutral) 화면과 밝기를 맞추려고 AgX 쪽을 조금 올린다 */
export function setMutracerExposure(v: number) {
  exposure = v;
  if (inst) inst.engine.display.toneMappingExposure = v * 1.5;
}

/** 페이지가 한가할 때 엔진을 만들고 셰이더 컴파일까지 해 둔다 (첫 샘플에서 멈춤) */
export function prewarmMutracer(host: HTMLElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: Controls, ptState?: () => () => void) {
  if (!inst) inst = create(host, scene, camera, controls, ptState);
}

/** cover = 켜기 직전의 실시간 화면 — 첫 노이즈 제거본이 어두워 「켜자마자 어두웠다 밝아짐」이 보이므로 그 화면으로 덮어 둔다 */
export function showMutracer(host: HTMLElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: Controls, status: (text: string) => void, cover?: HTMLCanvasElement) {
  onStatus = status;
  shown = true;
  if (!inst) inst = create(host, scene, camera, controls);
  inst.canvas.style.visibility = '';
  inst.hold.canvas.style.visibility = '';
  const h = inst.hold;
  if (cover && cover.width > 0) {
    h.canvas.width = inst.canvas.width; h.canvas.height = inst.canvas.height;
    h.ctx.drawImage(cover, 0, 0, h.canvas.width, h.canvas.height);
    h.has = true; h.on = true;
    h.canvas.style.transition = 'none'; h.canvas.style.opacity = '1';
  }
  inst.loop.start();
  // 다 쌓인 그림이 남아 있으면 루프가 다시 내보내지 않는다 — 한 번 내보내 덮개를 걷는다(안 하면 실시간 덮개가 그대로 남았다, 실측)
  if (inst.loop.final.converged) inst.engine.display.present(inst.loop.final);
  onStatus(inst.ready ? 'MuTracer 렌더 중…' : 'MuTracer 셰이더 준비 중… (처음 한 번 10초 남짓)');
}

export function hideMutracer() {
  shown = false;
  if (!inst) return;
  inst.canvas.style.visibility = 'hidden';
  inst.hold.canvas.style.visibility = 'hidden';
  inst.hold.on = false; inst.hold.has = false; inst.hold.canvas.style.opacity = '0';
  inst.canvas.style.filter = '';
  if (inst.ready) inst.loop.stop();       // 누적은 남기고 멈춤 — 다시 켜면 바로 이어진다
}

function statusText(s: string) {
  return ({ preparing: '장면 준비', compiling: '셰이더 준비', converging: '수렴 중', denoising: '노이즈 제거', finished: '완료', error: '오류', previewing: '미리보기' } as Record<string, string>)[s] ?? s;
}
