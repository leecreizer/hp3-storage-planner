// 실시간(기본) 화면 렌더러 — 기본 WebGPU: SSGI(화면 공간 간접광 + AO) + TRAA(시간 누적 안티앨리어싱) + 블룸·색 보정.
// ?webgl 이면 예전 WebGL: GTAO + SMAA (WebGPU 가 없거나 비교할 때).
//
// SSGI 는 매 프레임 샘플 방향을 돌려 가며 TRAA 가 쌓아 노이즈를 지운다 — 멈춘 뒤에도 settleFrames 만큼 더 그려야 깨끗해진다.
// 후처리 값(PostSettings)은 화면의 「후처리」 메뉴에서 바꾸고, 이 브라우저에 기억한다
import * as THREE from 'three';
import { WebGPURenderer, RenderPipeline, PMREMGenerator as GPUPMREMGenerator, RectAreaLightNode } from 'three/webgpu';
import {
  pass, mrt, output, diffuseColor, normalView, packNormalToRGB, unpackRGBToNormal, sample, velocity, vec4, add,
  uniform, float, renderOutput, saturation, screenUV, smoothstep, vec2, materialMetalness, materialRoughness, builtinShadowContext, abs, step, mix,
  vec3, getViewPosition, cameraProjectionMatrixInverse, cameraWorldMatrix, pow,
} from 'three/tsl';
import { ssr } from 'three/addons/tsl/display/SSRNode.js';
import { temporalReproject } from 'three/addons/tsl/display/TemporalReprojectNode.js';
import { recurrentDenoise } from 'three/addons/tsl/display/RecurrentDenoiseNode.js';
import { sss } from './sss';
import { ssgi } from 'three/addons/tsl/display/SSGINode.js';
import { traa } from 'three/addons/tsl/display/TRAANode.js';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { outline } from 'three/addons/tsl/display/OutlineNode.js';
import { denoise } from 'three/addons/tsl/display/DenoiseNode.js';
import { fxaa } from 'three/addons/tsl/display/FXAANode.js';
import { ao as gtaoNode } from 'three/addons/tsl/display/GTAONode.js';
import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

export type ToneMap = 'agx' | 'neutral' | 'aces';
export type GIQuality = 'low' | 'mid' | 'high';
export type PostSettings = {
  ssgi: boolean; quality: GIQuality; gi: number; ao: number; radius: number; thickness: number;
  giSpace: 'world' | 'screen'; giOcc: number; denoise: boolean;
  /** SSGI 해상도 — half = 가로세로 절반(화소 1/4). 간접광·AO 는 부드럽게 변하는 빛이라 차이가 거의 없고, 화면 전체 효과 중 가장 무거운 패스가 1/4 로 준다 */
  giRes: 'half' | 'full';
  /** ssgi = 간접광 + AO, gtao = AO 만(노이즈 적음 — 간접광은 실내 환경맵), both = 간접광 SSGI + AO GTAO */
  aoKind: 'ssgi' | 'gtao' | 'both'; aoRadius: number;
  /** AO 세부(사용자 지시 「AO 를 디테일하게 — 퍼짐·부드럽게」): 두께 = 물체 뒤로 그늘이 퍼지는 깊이(GTAO), 대비 = 그늘 곡선(ao^대비), 부드럽게 = 경계를 지키는 번짐 반경(0 = 끔) */
  aoThick: number; aoPow: number; aoSoft: number;
  traa: boolean;
  toneMapping: ToneMap; exposure: number; contrast: number; saturation: number; vignette: number;
  bloom: boolean; bloomStrength: number; bloomThreshold: number; bloomRadius: number;
  /** 거울 반사 — off = 실내 환경맵(방 가운데서 찍은 저해상도라 크고 흐리다), 그 외 = 평면 반사(거울 면 기준으로 장면을 한 번 더 그린다) 해상도 */
  reflect: 'off' | 'low' | 'mid' | 'high';
  /** 창밖 환경맵 — off = 단색 하늘, sky = 기본 하늘(구름), 그 외 = Poly Haven CC0 풍경 HDRI */
  outside: 'off' | 'sky' | 'park' | 'city' | 'river' | 'skyline';
  /** 창밖 풍경 돌리기(도) */
  outsideRot: number;
  /** 카메라 — 화각(세로, 도) · 회전(고개 돌리기)·확대(휠)·이동(오른쪽 끌기) 속도 배율 · 관성 */
  camFov: number; camRot: number; camZoom: number; camPan: number; camDamping: boolean;
  /** 회전 방향 — false = 마우스 방향으로 고개, true = 화면을 잡아끄는 반대 방향 */
  camGrab: boolean;
  /** 장 그늘 — Blender 로 번들마다 구운 AO(칸 안쪽·선반 밑). 재질에 곱하므로 WebGL 화면에서도 쓰인다 */
  bakedAO: boolean;
  /** 가구 밑 접촉 그림자(contact.ts) */
  contact: boolean;
  /** 공간 라이트맵(spaceao.ts) — 켜기 · 세기 */
  spaceAO: boolean; spaceLMStr: number;
  /** 공간 라이트맵이 덮는 벽·바닥·천장에도 화면 AO 를 남길지 — 끄면(기본) 라이트맵만, 켜면 라이트맵 위에 화면 AO 도 */
  spaceKeepAO: boolean;
  /** 공간감 — 창에서 멀수록 · 창을 등진 면(창 옆 벽)일수록 어둡게(0 = 끔). 천장 조명·환경광처럼 고르게 비추는 빛이 창 쪽 밝기 흐름을 지워 깊이가 약했다 */
  depthFx: number;
  /** 상품(가구) 라이트맵 — 꼭짓점마다 구운 그늘 */
  prodAO: boolean; prodAOStr: number;
  /** 화면 반사(SSR) — 바닥·도어 같은 매끈한 면에 방 안 물체가 비친다. 확률적 GGX 광선 + 시간 재투영 + 순환 노이즈 제거
   *  (three 예제 webgpu_postprocessing_ssr_denoise 와 같은 연결, 사용자 지시 2026-11-03). 화면 밖은 비치지 않으므로 실내 환경맵 반사에 더한다 */
  ssr: boolean; ssrIntensity: number;
  /** 화면 그림자(SSS) — 햇빛 그림자 맵이 놓치는 접촉 그림자(물체가 바닥·벽에 닿는 곳). 깊이를 먼저 한 번 더 그린다
   *  (three 예제 webgpu_postprocessing_sss) */
  sss: boolean;
};
/** 기본값 — 실사(MuTracer) 기준 사진에 맞춘 값(2026-10-29) */
export const POST_DEFAULTS: PostSettings = {
  // 빛 번짐(2026-10-29): 화면 기준 샘플링은 안쪽 모서리(천장·벽, 붙박이장 외곽·아래)에 바로 옆 면을 아주 가까운 광원으로 잡아
  // 간접광이 가는 띠로 몰렸다(더한 빛의 상위 2% 픽셀이 25%). 세기를 낮춰도 띠 모양은 그대로였다.
  // → 월드 기준 샘플링(면 전체로 고르게 퍼짐, 9%) + 간접광에 AO 곱하기(모서리 누르기 — 안쪽 모서리는 실제로 빛이 막혀 어둡다).
  // 이 조합에서 간접광 6 · 반경 3m 가 실사 기준 칸별 오차 0.138 로 가장 가까웠고 외곽이 간접광을 끈 화면처럼 깔끔했다
  // 기본값 = 사용자가 후처리 메뉴에서 맞춘 값 그대로(사용자 지시 2026-11-03 「현재 설정값을 기본값으로, 리셋해도 유지」)
  ssgi: true, quality: 'high', gi: 1, ao: 0.7, radius: 4.2, thickness: 1, giSpace: 'world', giOcc: 1, giRes: 'half',
  // 자글거림(2026-10-29, 도어 연 칸 안·상부 판): SSGI 의 AO 노이즈가 TRAA 로 다 안 지워졌다(SSGI 끄면 잡티 6.2 → 3.5, 간접광만 끄면 그대로).
  // 깊이·법선을 보며 경계는 지키고 면 안쪽만 펴는 공간 노이즈 제거를 AO·간접광에 건다
  denoise: true,
  // 기본 = GTAO(AO 만) — SSGI 는 열린 칸 위처럼 깊이가 크게 끊기는 곳에 노이즈가 남아 노이즈 제거 뒤에도 얼룩이 졌다
  // (상부 판 잡티 SSGI 1.69 / GTAO 0.81, 천장 1.48 / 0.31). 간접광은 실내 환경맵이 넣는다.
  // 깊이감·입체감(사용자 요청 2026-10-29): 반경 0.6m · 세기 1 · 비네팅 0.25 · 대비 1.05 → 대비(로그 표준편차) 0.375 로 실사 0.359 수준
  // → 공간감이 수정 전(SSGI)보다 떨어졌다(사용자). 간접광이 빠져서 — 간접광은 SSGI, AO 는 깨끗한 GTAO 로 합친다(both).
  // 간접광도 열린 칸 위에서 얼룩이 져, 품질 높음(3×16) + 간접광 노이즈 제거를 넓게(반경 12)
  // → 비교해 본 뒤 기본은 수정 전(SSGI 하나 · AO 0.7 · 노출 1.25 · 대비 1 · 비네팅 0)으로 되돌렸다(사용자 지시 2026-10-29).
  //   깊이감 강조안(both · 높음 · AO 1 · 노출 1.35 · 대비 1.05 · 비네팅 0.25)은 후처리 메뉴의 비교 버튼에 남긴다(main.ts DEPTH_LOOK)
  // 모서리가 하얗게 떴다(사용자 지적 2026-11-03, 천장·벽·문틀·장 테두리 모든 모서리) — 환경맵이 이미 고른 간접광을 주는데 SSGI 간접광(6)이
  // 화면 안 가까운 면이 있는 안쪽 모서리에만 더해져 모서리가 어두워지기는커녕 밝아졌다. 간접광 3 + 깨끗한 GTAO 그늘(both, AO 1)로 —
  // 같은 밝기에서 모서리에 자연스러운 그늘(실측 비교 2026-11-03 cn1/opts)
  aoKind: 'both', aoRadius: 0.15, aoThick: 1, aoPow: 1, aoSoft: 0,
  traa: true,
  // 노출 배율 — 조명 패널 노출 × 이 값. 실사(AgX)는 ×1.5, 실시간은 같은 AgX 로 1.4 에서 밝기 170(실사 158)이라 1.25
  toneMapping: 'aces', exposure: 1.5, contrast: 1, saturation: 1, vignette: 0.06,
  bloom: true, bloomStrength: 0.1, bloomThreshold: 1, bloomRadius: 0.4,
  // 거울이 환경맵이라 크게·흐리게 비쳤다(사용자 지적 2026-10-29) → 평면 반사 보통(화면의 60%)
  reflect: 'mid',
  // 창밖이 하늘만 보였다 → 풍경 환경맵(사용자 지시 2026-10-30)
  outside: 'sky', outsideRot: -20,
  camFov: 60, camRot: 1, camZoom: 1, camPan: 1, camDamping: true, camGrab: false,
  bakedAO: true,
  contact: true,
  spaceAO: true, spaceLMStr: 1, spaceKeepAO: false, depthFx: 0.5, prodAO: true, prodAOStr: 0.6,
  // 화면 반사는 켬(사용자 설정 2026-11-03) — 접촉 그림자(SSS)는 끔
  ssr: true, ssrIntensity: 0.5, sss: false,
};
// 기본값 = 2026-11-12 사용자가 쓰던 후처리(사용자 지시 「현재 정의된 모든 옵션 체크 내용으로 기본설정」) — 위 값들의 내력은 주석대로 두고 덮는다.
// 화면 성능 단계(quality.ts)는 이 위에서 사양에 맞게 처음 값만 끈다 — 사용자가 체크하면 그 단계에서도 켜진다(아래 userSet)
Object.assign(POST_DEFAULTS, {
  ssgi: true, quality: 'high', gi: 1, ao: 0.7, radius: 4.2, thickness: 1, giSpace: 'world', giOcc: 1, giRes: 'half', denoise: true,
  aoKind: 'both', aoRadius: 0.15, aoThick: 1, aoPow: 1, aoSoft: 0, traa: true,
  toneMapping: 'aces', exposure: 1.5, contrast: 1, saturation: 1, vignette: 0.06,
  bloom: true, bloomStrength: 0.1, bloomThreshold: 1, bloomRadius: 0.4,
  reflect: 'mid', outside: 'skyline', outsideRot: -140,
  camFov: 60, camRot: 1, camZoom: 1, camPan: 1, camDamping: true, camGrab: false,
  bakedAO: true, contact: true, spaceAO: true, spaceLMStr: 1, spaceKeepAO: true, depthFx: 0.5, prodAO: true, prodAOStr: 0.6,
  ssr: true, ssrIntensity: 0.5, sss: true,
} satisfies PostSettings);
/** SSGINode 문서의 시간 누적용 권장값 — 슬라이스 × 걸음 */
const QUALITY: Record<GIQuality, [number, number]> = { low: [1, 12], mid: [2, 8], high: [3, 16] };
const TONE: Record<ToneMap, THREE.ToneMapping> = { agx: THREE.AgXToneMapping, neutral: THREE.NeutralToneMapping, aces: THREE.ACESFilmicToneMapping };

export type RasterRenderer = THREE.WebGLRenderer | WebGPURenderer;
export interface Raster {
  kind: 'webgpu' | 'webgl';
  renderer: RasterRenderer;
  /** 실내 환경맵(큐브) → 환경광 — 렌더러마다 PMREM 이 따로다 */
  pmremFromCubemap(cube: THREE.CubeTexture, target: THREE.RenderTarget | null): THREE.RenderTarget;
  /** WebGPU 는 장치 준비가 비동기 — 끝나기 전엔 그리지 않는다 */
  ready: boolean;
  init(): Promise<void>;
  setSize(w: number, h: number): void;
  render(): void;
  /** 멈춘 뒤 더 그릴 프레임 수 — 시간 누적(TRAA·SSGI)이 수렴하도록. WebGL(GTAO)은 0 */
  settleFrames: number;
  post: PostSettings;
  /** 이 렌더러가 반영하는 후처리 항목 — 나머지는 메뉴에서 끈다 */
  supports: ReadonlySet<keyof PostSettings>;
  setPost(p: Partial<PostSettings>): void;
  /** 공간감 기준 창 — 창 면 가운데 c · 방 안쪽 법선 n · 창에서 맞은편 벽까지 거리 depth(m). null = 창 없음(효과 끔) */
  setWindow(w: { c: number[]; n: number[]; depth: number } | null): void;
  /** 고른 물체 외곽선 — 물체 실루엣 바깥 테두리만(빈 배열 = 끔). false 면 이 렌더러는 외곽선을 못 그린다(선 상자로 대신) */
  setOutline(objs: THREE.Object3D[]): boolean;
  /** 화면 성능 단계(quality.ts) — caps = 후처리 설정 위에 덮어쓸 값(저장하지 않는다), lite = 장면 한 장 + FXAA 만 */
  setQuality(caps: Partial<PostSettings>, lite: boolean): void;
  /** 사용자가 직접 바꾼 항목 — 화면 성능 단계가 끄지 않는다 */
  readonly userSet: ReadonlySet<keyof PostSettings>;
  /** 직접 바꾼 기록을 지운다(「기본값으로」) — 다시 단계 기본을 따른다 */
  clearUserSet(): void;
}

const params = new URLSearchParams(location.search);
/** 외곽선 색 — 선택 파랑(#2f6bff, 화면 색) */
const OUTLINE_RGB = vec3(0x2f / 255, 0x6b / 255, 1);
const POST_KEY = 'storage-planner.post.v7';
/** 사용자가 직접 바꾼 후처리 항목 — 화면 성능 단계는 처음 값만 정하고, 사용자가 체크·조절한 항목은 그 단계에서도 그대로 쓴다
 *  (사용자 지시 2026-11-12 「노트북도 고성능이 있는데 막아버리면 — 설정만 사양에 맞춰 끄고 사용자가 체크하면 적용되게」) */
const SET_KEY = 'storage-planner.postset.v1';
function loadSet(): Set<keyof PostSettings> { try { return new Set(JSON.parse(localStorage.getItem(SET_KEY) || '[]')); } catch { return new Set(); } }
function saveSet(s: Set<keyof PostSettings>) { try { localStorage.setItem(SET_KEY, JSON.stringify([...s])); } catch { /* 이번 화면엔 반영 */ } }
/** 가벼운 화면(장면 한 장 + FXAA)에선 못 그리는 효과 — 사용자가 하나라도 켜면 단계가 노트북이어도 전체 화면 처리로 그린다 */
const HEAVY: (keyof PostSettings)[] = ['ssgi', 'ssr', 'sss', 'traa', 'bloom', 'denoise', 'aoKind'];   // 예전 판(v1~v6)이 저장돼 있어도 새 기본값을 쓰게(v7 = 모서리 그늘 both)
function loadPost(): PostSettings {
  try { return { ...POST_DEFAULTS, ...JSON.parse(localStorage.getItem(POST_KEY) || '{}') }; } catch { return { ...POST_DEFAULTS }; }
}
function savePost(p: PostSettings) {
  try { localStorage.setItem(POST_KEY, JSON.stringify(p)); } catch { /* 저장 못 해도 이번 화면엔 반영된다 */ }
}

/** mainLight = 화면 그림자(SSS)를 거는 해(방향광) */
export function createRaster(scene: THREE.Scene, camera: THREE.PerspectiveCamera, mainLight?: THREE.DirectionalLight): Raster {
  return params.has('webgl') ? webgl(scene, camera) : webgpu(scene, camera, mainLight);
}

/** 셰이더 캐시 붙잡기 — three 는 같은 셰이더를 쓰던 마지막 물체가 버려지면 그 셰이더 캐시도 지운다.
 *  장·방을 고칠 때마다 옛 것을 버리고 새로 만드므로, 새 것의 모든 재질을 메인 화면·환경맵 12면·그림자마다 처음부터 다시 지었다
 *  (실측 2026-11-02: 도어 색 한 번에 1.7초 + 0.9초 멈춤 → 붙잡으면 환경맵 0.07초).
 *  버려지는 셰이더를 최근 쓴 순서로 KEEP 개까지 붙잡는다 — 거울 반사처럼 만들 때마다 새로 생기는 셰이더(편집마다 몇 개)가 끝없이 쌓이지 않게 */
function keepShaderCache(renderer: WebGPURenderer, KEEP = 600) {
  // ① 노드 셰이더(JS 에서 짓는 셰이더 코드)
  const nodes = (renderer as any)._nodes;
  const keptStates = new Map<any, unknown>();                  // 붙잡은 상태 → 캐시 키 (넣은 순서 = 오래된 순)
  const del = nodes.delete.bind(nodes);
  nodes.delete = (o: any) => {
    const s = o?.isRenderObject ? nodes.get(o).nodeBuilderState : undefined;
    if (s) {
      if (keptStates.has(s)) keptStates.delete(s); else s.usedTimes++;
      keptStates.set(s, nodes.getForRenderCacheKey(o));
      for (const [old, key] of keptStates) {
        if (keptStates.size <= KEEP) break;
        keptStates.delete(old);
        if (--old.usedTimes === 0) nodes.nodeBuilderCache.delete(key);
      }
    }
    return del(o);
  };
  // ② GPU 파이프라인(그래픽카드가 컴파일한 셰이더) — 같은 식으로 버려졌다 다시 컴파일돼 화면이 JS 밖에서 멈췄다
  const pipes = (renderer as any)._pipelines;
  const keptPipes = new Set<any>();
  const pdel = pipes.delete.bind(pipes);
  pipes.delete = (o: any) => {
    const p = pipes.get(o).pipeline;
    if (p && !p.isComputePipeline) {
      if (keptPipes.has(p)) keptPipes.delete(p);
      else { p.usedTimes++; p.vertexProgram.usedTimes++; p.fragmentProgram.usedTimes++; }
      keptPipes.add(p);
      for (const old of keptPipes) {
        if (keptPipes.size <= KEEP) break;
        keptPipes.delete(old);
        if (--old.usedTimes === 0) pipes._releasePipeline(old);
        for (const pr of [old.vertexProgram, old.fragmentProgram]) if (--pr.usedTimes === 0) pipes._releaseProgram(pr);
      }
    }
    return pdel(o);
  };
}

function webgpu(scene: THREE.Scene, camera: THREE.PerspectiveCamera, mainLight?: THREE.DirectionalLight): Raster {
  // ?gputime — 프레임 GPU 시간 측정(타임스탬프 쿼리). 성능 비교·최적화 시험용
  const renderer = new WebGPURenderer({ antialias: false, trackTimestamp: params.has('gputime') });
  RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init());
  // user = 사용자가 「후처리」 메뉴에서 고른 값(저장), post = 실제로 쓰는 값 = user 위에 화면 성능 단계(caps)를 덮은 것
  const user = loadPost();
  const post: PostSettings = { ...user };
  let caps: Partial<PostSettings> = {}, lite = false, liteOn = false;
  const userSet = loadSet();
  renderer.toneMapping = TONE[post.toneMapping];
  let pmrem: GPUPMREMGenerator | null = null;
  let pipeline: RenderPipeline | null = null;
  let gi: any = null;
  const outlineObjs: THREE.Object3D[] = [];
  let outl: any = null;
  let rebuild = () => {};
  // 색 보정은 톤매핑 뒤(화면 색) — 값만 바뀌면 그래프를 다시 만들지 않는다
  const u = { contrast: uniform(post.contrast), saturation: uniform(post.saturation), vignette: uniform(post.vignette) };
  const aoPowU = uniform(post.aoPow);               // AO 대비(곡선)
  const gtaoMix = uniform(Math.min(1, post.ao));   // GTAO 를 섞는 세기(AO 세기 슬라이더)
  const giOcc = uniform(post.giOcc);            // 간접광 × AO 를 섞는 정도 — 1 이면 안쪽 모서리의 간접광을 AO 만큼 누른다
  const ssrMix = uniform(post.ssrIntensity);      // 화면 반사를 더하는 세기
  // 공간감 — 창 면(점·안쪽 법선)·방 깊이·세기
  const winP = uniform(new THREE.Vector3()), winN = uniform(new THREE.Vector3(0, 0, 1)), winDepth = uniform(3), winOn = uniform(0), depthAmt = uniform(post.depthFx);
  // 라이트맵이 켜진 자리엔 화면 그늘(AO)을 겹치지 않는다 — 공간(금속성 1/255)·상품(2/255) 표시로 구분(spaceao.ts)
  const spaceOn = uniform(post.spaceAO ? 1 : 0), prodOn = uniform(0);
  const spaceAOOff = uniform(post.spaceAO && !post.spaceKeepAO ? 1 : 0);   // 라이트맵 자리에서 화면 AO 를 끄는지(메뉴 체크)
  // 이 거칠기 사이에서 반사를 줄여 끈다 — 0.45 아래(바닥·도장 도어·금속)는 다, 0.65 위(천·종이)는 없음. 0.5~0.7·세기 1 에서도 번들거림 없었다(2026-11-03)
  const ssrRoughLo = uniform(0.45), ssrRoughHi = uniform(0.65);
  const applyGI = () => {
    if (!gi) return;
    const [slices, steps] = QUALITY[post.quality];
    gi.sliceCount.value = slices; gi.stepCount.value = steps;
    gi.giIntensity.value = post.gi; gi.aoIntensity.value = post.ao; gi.radius.value = post.radius; gi.thickness.value = post.thickness;
    gi.useScreenSpaceSampling.value = post.giSpace === 'screen';
    giOcc.value = post.giOcc;
    gtaoMix.value = Math.min(1, post.ao);
    const g = (me as any)?.gtao;
    if (g) { g.radius.value = post.aoRadius; g.thickness.value = post.aoThick; g.samples.value = post.quality === 'high' ? 24 : post.quality === 'low' ? 8 : 16; }
    aoPowU.value = post.aoPow;
    const sd = (me as any)?.gtaoSoft; if (sd) sd.radius.value = Math.max(1, post.aoSoft);
  };
  const me: Raster = {
    kind: 'webgpu', renderer, ready: false, post,
    // 멈춘 뒤 더 그리는 프레임 — 시간 누적(TRAA·SSGI·SSR)이 없으면 0(노트북 단계는 손을 떼면 바로 멈춘다)
    get settleFrames() { return liteOn || (!post.traa && !post.ssgi && !post.ssr) ? 0 : 48; },
    supports: new Set(Object.keys(POST_DEFAULTS) as (keyof PostSettings)[]),
    async init() {
      await renderer.init();
      keepShaderCache(renderer);         // 노드 관리자는 init 안에서 생긴다
      pmrem = new GPUPMREMGenerator(renderer);
      // 장면 한 번 그리기 — 색·깊이·재질 색(간접광에 곱한다)·법선·움직임(TRAA)을 함께
      const scenePass = pass(scene, camera);
      // 반사(SSR)용으로 금속성은 재질 색 a, 거칠기는 법선 a 에 함께 담는다(버퍼를 늘리지 않게 — 예제와 같음)
      scenePass.setMRT(mrt({ output, diffuseColor: vec4(diffuseColor.rgb, materialMetalness), normal: vec4(packNormalToRGB(normalView).rgb, materialRoughness), velocity }));
      const color = scenePass.getTextureNode('output');
      const diffuse = scenePass.getTextureNode('diffuseColor');
      const depth = scenePass.getTextureNode('depth');
      const normalTex = scenePass.getTextureNode('normal');
      const vel = scenePass.getTextureNode('velocity');
      // 재질 색·법선은 8비트로 충분 — 화면 크기 버퍼 대역폭을 줄인다(three 공식 예제와 같음)
      scenePass.getTexture('diffuseColor').type = THREE.UnsignedByteType;
      scenePass.getTexture('normal').type = THREE.UnsignedByteType;
      const sceneNormal = sample((uv: any) => unpackRGBToNormal(normalTex.sample(uv).rgb));
      gi = ssgi(color, depth, sceneNormal, camera);
      // 해상도 배율 — SSGI 는 매 프레임 그리기 크기로 setSize 를 부른다. 결과는 화면 좌표로 읽으므로(쌍선형 확대) 그대로 맞는다
      const giSize = gi.setSize.bind(gi);
      gi.setSize = (w: number, h: number) => { const k = post.giRes === 'full' ? 1 : 0.5; giSize(Math.max(1, Math.round(w * k)), Math.max(1, Math.round(h * k))); };
      applyGI();
      // 결과 = 직접광 × AO + 재질 색 × 간접광.
      // SSGI 노드 자체는 AO(r) 텍스처, 간접광은 getGINode() 로 따로다(0.186) — 한 노드의 rgb·a 로 읽으면 AO 가 간접광으로 들어가
      // 재질 색이 통째로 더해져 조명과 상관없이 하얗고 평평했다(실측: 조명·환경광 다 꺼도 밝기 193)
      // 화면 그늘을 쓸 정도 — 라이트맵이 덮는 공간·상품이면 0(그늘 = 1)
      // 상품(가구)엔 화면 그늘을 남긴다 — 상품 라이트맵은 넓은 그늘만 잡고 상판 밑·모서리 같은 세밀한 그늘은 화면 AO 가 맡는다
      // (상품도 빼 봤더니 가구가 오히려 평평해졌다, 사용자 지적 「많이 깨진다」 2026-11-04). prodOn 은 0 고정
      const keep = float(1).sub(spaceOn.mul(step(abs(diffuse.a.sub(1 / 255)), 0.5 / 255))).sub(prodOn.mul(step(abs(diffuse.a.sub(2 / 255)), 0.5 / 255)));
      // 화면 AO 는 메뉴 체크(spaceKeepAO)로 따로 — 켜면 라이트맵 자리에도 AO 를 남긴다. 간접광(SSGI) 빼기는 그대로
      const keepA = float(1).sub(spaceAOOff.mul(step(abs(diffuse.a.sub(1 / 255)), 0.5 / 255))).sub(prodOn.mul(step(abs(diffuse.a.sub(2 / 255)), 0.5 / 255)));
      const keepAO = (ao: any) => mix(float(1), pow(ao.max(1e-4), aoPowU), keepA);
      // 화면 간접광(SSGI)도 라이트맵이 덮는 공간에선 뺀다 — 튄 빛을 라이트맵이 이미 담았다(두 번 밝아진다)
      const litOf = (ao0: any, ind: any) => { const ao = keepAO(ao0); return vec4(add(color.rgb.mul(ao), diffuse.rgb.mul(ind).mul(keep).mul(float(1).sub(giOcc).add(giOcc.mul(ao)))), color.a); };
      // 노드는 쓸 때 처음 한 번 만든다(노이즈 제거·GTAO 는 버퍼를 가진다)
      const cache = new Map<string, any>();
      const once = (k: string, make: () => any) => cache.get(k) ?? cache.set(k, make()).get(k);
      const ssgiAO = () => post.denoise ? once('aoDen', () => (denoise(gi, depth, sceneNormal, camera) as any).r) : gi.r;
      const ssgiGI = () => post.denoise ? once('giDen', () => {
        const dn: any = denoise(gi.getGINode(), depth, sceneNormal, camera);
        // 간접광은 원래 부드럽게 변하는 빛 — 기본(반경 5·밝기 민감도 5)보다 넓고 고르게 편다. 열린 칸 위 상부 판의 얼룩이 크게 줄었다
        dn.radius.value = 12; dn.lumaPhi.value = 2;
        (me as any).giDenoise = dn;
        return dn.rgb;
      }) : gi.getGINode().rgb;
      // GTAO — 깨끗한 AO(세기 = AO 슬라이더로 섞는다)
      const gtaoAO = () => once('gtao', () => {
        const n: any = gtaoNode(depth, sceneNormal, camera);
        n.useTemporalFiltering = true;              // TRAA 와 함께 — 프레임마다 방향을 돌려 쌓는다
        (me as any).gtao = n; applyGI();
        return n;
      });
      // 부드럽게 — 깊이·법선 경계는 지키고 면 안쪽 그늘만 편다(0 이면 그대로)
      const gtaoTex = () => post.aoSoft > 0
        ? once('gtaoSoft', () => { const dn: any = denoise(gtaoAO().getTextureNode(), depth, sceneNormal, camera); dn.lumaPhi.value = 8; (me as any).gtaoSoft = dn; applyGI(); return dn.r; })
        : gtaoAO().getTextureNode().r;
      const gtaoVal = () => float(1).sub(gtaoMix).add(gtaoMix.mul(gtaoTex()));
      // 방식: ssgi = 간접광+AO 모두 SSGI / gtao = AO 만(간접광은 실내 환경맵) / both = 간접광 SSGI + AO GTAO
      const beauty = () => {
        if (!post.ssgi) return color;
        const k = `${post.aoKind}|${post.denoise}|${post.aoSoft > 0}`;
        if (post.aoKind === 'gtao') return once(k, () => vec4(color.rgb.mul(keepAO(gtaoVal())), color.a));
        if (post.aoKind === 'both') return once(k, () => litOf(gtaoVal(), ssgiGI()));
        return once(k, () => litOf(ssgiAO(), ssgiGI()));
      };
      // 화면 반사(SSR) — 확률적 광선 → 시간 재투영 → 순환 노이즈 제거, 노이즈 제거본을 다시 SSR 이력으로(여러 번 튕긴 반사)
      const ssrRGB = () => once('ssr', () => {
        const metalRough = sample((uv: any) => vec2(diffuse.sample(uv).a, normalTex.sample(uv).a));
        const s: any = ssr(color, depth, sceneNormal, { stochastic: true, diffuseNode: diffuse, metalnessNode: diffuse.a, roughnessNode: normalTex.a, camera } as any);
        // 실내 — 화면 밖으로 나간 광선은 검게 흐리지 않고 0(환경맵 반사가 그대로 남는다). 방 크기(m)에 맞춘 거리·두께
        s.screenEdgeFadeBlack = true; s.quality.value = 0.25; s.maxDistance.value = 3; s.thickness.value = 0.05; s.maxLuminance.value = 35;
        const tr: any = temporalReproject(s, depth, normalTex, vel, camera, { mode: 'specular', accumulate: false } as any);
        tr.maxFrames.value = 16; tr.clampIntensity.value = 0.25; tr.flickerSuppression.value = 1; tr.hitPointReprojection.value = true;
        const dn: any = recurrentDenoise(tr, camera, { depth, normal: normalTex, raw: s, metalRoughness: metalRough, mode: 'specular', accumulate: true } as any);
        dn.alphaSource = 'raylength';
        dn.lumaPhi.value = 0.75; dn.depthPhi.value = 20; dn.normalPhi.value = 0.3; dn.roughnessPhi.value = 100; dn.radius.value = 1.5;
        dn.alphaPhi.value = 5; dn.strength.value = 0.725; dn.adapt.value = 0.5;
        s.setHistory(dn, vel); tr.setHistoryTexture(dn);
        (me as any).ssr = s; (me as any).ssrDenoise = dn; (me as any).ssrRough = [ssrRoughLo, ssrRoughHi];
        // 매끈한 면에만 — 반쯤 거친 면(천·책 등 거칠기 0.5 안팎이 많다)은 실내 환경맵 반사가 이미 있어 SSR 을 더하면 겹쳐 번들거렸다
        // (안방 회색 담요가 얼음처럼 반짝, 2026-11-03 실측 — 실제 원인은 담요 위 거칠기 0 투명 덧층, furnish.ts hvRule 에서 천 거칠기로)
        return dn.rgb.mul(ssrMix).mul(float(1).sub(smoothstep(ssrRoughLo, ssrRoughHi, normalTex.a)));
      });
      const withSSR = (b: any) => post.ssr ? once(`ssr+${post.ssgi}|${post.aoKind}|${post.denoise}|${post.aoSoft > 0}`, () => vec4(b.rgb.add(ssrRGB()), b.a)) : b;
      // 화면 그림자(SSS) — 깊이를 먼저 그리고(pre-pass), 해 그림자에 곱하도록 장면 그리기 문맥에 넣는다
      const sssContext = () => once('sss', () => {
        const pre = pass(scene, camera); (pre as any).transparent = false;
        pre.setMRT(mrt({ output: velocity }));
        const sp: any = sss(pre.getTextureNode('depth'), camera, mainLight!);
        // 광선 길이 5cm — 물체가 닿는 자리의 짧은 그림자만. 15cm 일 땐 햇빛 받는 안쪽 모서리(천장–장 몰딩 · 벽 윗선 · 걸레받이)마다
        // 두꺼운 띠가 생겼다(부엌 플래너 13번 실측 2026-11-06: 몰딩 밝기 78 → 61, 0.05/0.01 이면 77)
        sp.maxDistance.value = 0.05; sp.thickness.value = 0.01; sp.quality.value = 0.5; sp.useTemporalFiltering = post.traa;
        (me as any).sss = sp;
        return builtinShadowContext(sp.getTextureNode().sample(screenUV).r, mainLight!);
      });
      // 켜고 끄는 항목(SSGI·노이즈 제거·TRAA·블룸·톤매핑)은 그래프를 다시 만든다. TRAA·블룸 노드는 버퍼를 가지므로 경우별로 한 번만 만든다
      const traaOf = new Map<any, any>();
      const getTraa = (b: any) => traaOf.get(b) ?? traaOf.set(b, traa(b, depth, vel, camera)).get(b);
      const glow = bloom(color, post.bloomStrength, post.bloomRadius, post.bloomThreshold);
      // 고른 칸·도어 외곽선(사용자 지시 2026-11-09 「선택 상태가 각각 박스로 보이는데 외곽 라인으로」) — 고른 물체 실루엣의 바깥 테두리만.
      // 고른 것이 없으면 OutlineNode 가 그리기를 건너뛰어 평소엔 비용이 없다. 톤매핑·색 보정 뒤에 얹어 색이 그대로 나온다
      outl = outline(scene, camera, { selectedObjects: outlineObjs, edgeThickness: uniform(1.5), edgeGlow: uniform(0), downSampleRatio: 1 });
      // 공간감(사용자 지시 2026-11-05 「창문에서 멀어지는 쪽이 어두워지고 창 바로 옆 빛이 닿지 않는 곳이 어두워야」) — 화소의 월드 위치·법선으로
      //  ① 창 면에서 방 안쪽으로 멀수록(맞은편 벽에서 최대) ② 창을 등진 면(창이 있는 벽 · 가구 뒷면)일수록 어둡게.
      // 공간 라이트맵만으로는 흐름이 약했다 — 벽 밝기의 절반 이상이 천장 조명·다운라이트·환경광처럼 고르게 비추는 빛이었다(실측: 라이트맵 감마를 키워도 화면 변화 미미)
      // 창 밖(창 면 너머)·배경은 그대로
      const depthFactor = (() => {
        const wp = cameraWorldMatrix.mul(vec4(getViewPosition(screenUV, depth, cameraProjectionMatrixInverse), 1)).xyz;
        const wn = cameraWorldMatrix.mul(vec4(unpackRGBToNormal(normalTex.rgb), 0)).xyz;
        const s = wp.sub(winP).dot(winN);
        const far = smoothstep(0.3, winDepth, s);
        const back = smoothstep(0.2, 0.9, wn.dot(winN));
        const f = float(1).sub(depthAmt.mul(0.6).mul(far)).mul(float(1).sub(depthAmt.mul(0.45).mul(back)));
        return mix(float(1), f, winOn.mul(step(-0.05, s)).mul(step(depth, 0.99999)));
      })();
      // 가벼운 화면(노트북 단계) — 장면을 색·깊이만으로 한 번 그린다(재질 색·법선·움직임 버퍼 4장을 쓰지 않아 대역폭이 준다).
      // 공간감은 깊이만으로 되는 「창에서 멀수록」만 남긴다(창을 등진 면은 법선이 필요하다)
      const litePass = pass(scene, camera);
      const liteColor = litePass.getTextureNode('output'), liteDepth = litePass.getTextureNode('depth');
      const liteFactor = (() => {
        const wp = cameraWorldMatrix.mul(vec4(getViewPosition(screenUV, liteDepth, cameraProjectionMatrixInverse), 1)).xyz;
        const s = wp.sub(winP).dot(winN);
        const f = float(1).sub(depthAmt.mul(0.6).mul(smoothstep(0.3, winDepth, s)));
        return mix(float(1), f, winOn.mul(step(-0.05, s)).mul(step(liteDepth, 0.99999)));
      })();
      (me as any).glow = glow;
      pipeline = new RenderPipeline(renderer);
      pipeline.outputColorTransform = false;       // 톤매핑은 아래 renderOutput 에서 — 그 뒤에 색 보정
      rebuild = () => {
        if (liteOn) {
          (scenePass as any).contextNode = null;
          const shown: any = renderOutput(vec4(liteColor.rgb.mul(liteFactor), liteColor.a));
          let rgb = saturation(shown.rgb, u.saturation);
          rgb = rgb.sub(0.5).mul(u.contrast).add(0.5);
          const d = screenUV.sub(0.5).length().mul(1.4142);
          rgb = rgb.mul(float(1).sub(u.vignette.mul(smoothstep(0.35, 1.0, d))));
          rgb = mix(rgb, OUTLINE_RGB, outl.visibleEdge.mul(4).clamp(0, 1));
          // 계단 — TRAA(프레임마다 쌓기) 대신 한 장으로 끝나는 FXAA(화면 색 기준이라 톤매핑 뒤에)
          pipeline!.outputNode = fxaa(vec4(rgb.clamp(0, 1), shown.a));
          pipeline!.needsUpdate = true;
          return;
        }
        (scenePass as any).contextNode = post.sss && mainLight ? sssContext() : null;
        let c: any = post.traa ? getTraa(withSSR(beauty())) : withSSR(beauty());
        c = vec4(c.rgb.mul(depthFactor), c.a);
        if (post.bloom) c = vec4(c.rgb.add(glow.rgb), c.a);
        const shown: any = renderOutput(c);          // 렌더러의 톤매핑·노출 → sRGB
        let rgb = saturation(shown.rgb, u.saturation);
        rgb = rgb.sub(0.5).mul(u.contrast).add(0.5);
        const d = screenUV.sub(0.5).length().mul(1.4142);
        rgb = rgb.mul(float(1).sub(u.vignette.mul(smoothstep(0.35, 1.0, d))));
        rgb = mix(rgb, OUTLINE_RGB, outl.visibleEdge.mul(4).clamp(0, 1));
        pipeline!.outputNode = vec4(rgb.clamp(0, 1), shown.a);
        pipeline!.needsUpdate = true;
      };
      rebuild();
      (me as any).gi = gi;                       // 시험 도구에서 세기 조절용
      me.ready = true;
    },
    pmremFromCubemap(cube, target) {
      return pmrem!.fromCubemap(cube, target as any) as unknown as THREE.RenderTarget;
    },
    setSize(w, h) { renderer.setSize(w, h); },
    render() { pipeline?.render(); },
    userSet,
    clearUserSet() { userSet.clear(); saveSet(userSet); applyEff(false); },
    setPost(p) {
      Object.assign(user, p);
      savePost(user);
      for (const k of Object.keys(p) as (keyof PostSettings)[]) userSet.add(k);
      saveSet(userSet);
      applyEff(false);
    },
    setOutline(objs) { outlineObjs.length = 0; outlineObjs.push(...objs); return true; },
    setQuality(c, l) {
      caps = c;
      const liteChanged = l !== lite; lite = l;
      applyEff(liteChanged);
    },
    setWindow(w) {
      winOn.value = w ? 1 : 0;
      if (w) { winP.value.fromArray(w.c); winN.value.fromArray(w.n); winDepth.value = Math.max(0.5, w.depth); }
    },
  };
  /** 실제 값(post) = 사용자 값 위에 단계 덮기 → 바뀐 만큼 반영(켜고 끄는 항목은 그래프를 다시 짓는다) */
  function applyEff(force: boolean) {
      // 단계가 끄는 값은 사용자가 직접 바꾸지 않은 항목에만
      const capsEff = Object.fromEntries(Object.entries(caps).filter(([k]) => !userSet.has(k as keyof PostSettings))) as Partial<PostSettings>;
      const next: PostSettings = { ...user, ...capsEff };
      const liteNext = lite && !HEAVY.some(k => userSet.has(k) && (k === 'aoKind' || !!next[k]));
      if (liteNext !== liteOn) { liteOn = liteNext; force = true; }
      const structural = force || (['ssgi', 'aoKind', 'denoise', 'traa', 'bloom', 'toneMapping', 'ssr', 'sss'] as const).some(k => next[k] !== post[k])
        || (next.aoSoft > 0) !== (post.aoSoft > 0);   // 부드럽게 켜고 끄기는 노드를 끼우고 뺀다
      Object.assign(post, next);
      renderer.toneMapping = TONE[post.toneMapping];
      ssrMix.value = post.ssrIntensity;
      spaceOn.value = post.spaceAO ? 1 : 0; prodOn.value = 0; spaceAOOff.value = post.spaceAO && !post.spaceKeepAO ? 1 : 0;
      u.contrast.value = post.contrast; u.saturation.value = post.saturation; u.vignette.value = post.vignette;
      depthAmt.value = post.depthFx;
      const glow = (me as any).glow;
      if (glow) { glow.strength.value = post.bloomStrength; glow.radius.value = post.bloomRadius; glow.threshold.value = post.bloomThreshold; }
      applyGI();
      if (structural) rebuild();
  }
  return me;
}

function webgl(scene: THREE.Scene, camera: THREE.PerspectiveCamera): Raster {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  RectAreaLightUniformsLib.init();
  const post = loadPost();
  renderer.toneMapping = TONE[post.toneMapping];
  const pmrem = new THREE.PMREMGenerator(renderer);
  // 안티알리아싱 — 후처리(AO)를 거치면 화면이 별도 버퍼에 그려져 renderer 의 antialias 가 안 먹는다. 그 버퍼에 MSAA 4배
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: params.get('msaa') === '0' ? 0 : 4 }));
  composer.addPass(new RenderPass(scene, camera));
  const gtao = new GTAOPass(scene, camera, 1, 1);
  gtao.updateGtaoMaterial({ radius: 0.3, distanceExponent: 1.5, thickness: 1, scale: 0.8, samples: 16 });
  // AO 는 안티알리아싱 없는 깊이·노멀로 계산해 도어 틈(4~5mm)·경계가 점선처럼 반짝였다(AO 끄면 깨끗 — 실측).
  // 노이즈 제거 반경을 넓히고 세기를 낮춘 뒤, 최종 화면에 SMAA 를 한 번 더
  gtao.updatePdMaterial({ radius: 14, lumaPhi: 10, depthPhi: 1, normalPhi: 2 });
  // WebGL 은 AO 만 — 「간접광·AO」 켜기 = GTAO 켜기, AO 세기 = 섞는 세기(실사 비교에서 1.0 은 대비가 세져 기본 0.7 ≈ 예전 0.5)
  const applyAO = () => { gtao.enabled = post.ssgi && params.get('ao') !== '0'; gtao.blendIntensity = Math.min(1, post.ao * 0.7); };
  applyAO();
  composer.addPass(gtao);
  composer.addPass(new OutputPass());
  composer.addPass(new SMAAPass());
  return {
    kind: 'webgl', renderer, ready: true, settleFrames: 0, post,
    supports: new Set<keyof PostSettings>(['ssgi', 'ao', 'toneMapping', 'exposure', 'bakedAO']),
    async init() {},
    pmremFromCubemap(cube, target) { return pmrem.fromCubemap(cube, (target as THREE.WebGLRenderTarget) ?? undefined); },
    setSize(w, h) { renderer.setSize(w, h); composer.setSize(w, h); },
    render() { composer.render(); },
    setPost(p) { Object.assign(post, p); renderer.toneMapping = TONE[post.toneMapping]; applyAO(); savePost(post); },
    setWindow() { /* WebGL 은 공간감 효과 없음 */ },
    setOutline() { return false; },
    setQuality() { /* WebGL 은 AO·톤만이라 단계 없음(화소 배율만 Stage 가 맞춘다) */ },
    userSet: new Set<keyof PostSettings>(),
    clearUserSet() { /* 단계 없음 */ },
  };
}
