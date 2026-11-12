// 불러오기·재구성 기록 — 처음 열기 · 공간 재구성 · 장 바꾸기 · 라이트맵 다시 굽기를 한 건씩 잰다.
// 노트북(i7-1165G7 · Iris Xe)에서 「다 불러와 적용하는 데 60초」였는데 이 PC 측정(16~21초)과 달랐다(사용자 지적 2026-11-12 「너가 계산한거랑 다르다」).
// 그래서 그 기기에서 잰 것을 그대로 받아 분석한다(사용자 지시 2026-11-12 「최초 불러올 때랑 재구성할 때의 속도와 시간을 log 로 만들어 분석해 문제 해결」).
//  · 개발 서버(5210 · 사내망 5211) — 한 건이 끝날 때마다 logs/loadlog.jsonl 에 바로 쌓인다(vite.config.ts 의 /__loadlog)
//  · 배포(Pages) — 브라우저에 최근 60건을 두고, ?stats 표시의 「기록 저장」으로 JSON 파일을 내려받는다
//  · 분석 — node tools/loadlog-report.mjs <파일>
declare const __BUILD__: { hash: string; time: string };

type Mark = { t: number; label: string };
type Stall = { t: number; d: number; what: string };
export type Run = {
  id: string; kind: string; cause: string; at: string;
  /** 페이지 연 뒤 시작 시각(ms) — 아래 t 는 모두 이 건의 시작부터 */
  t0: number; total?: number; end?: string;
  marks: Mark[]; stalls: Stall[];
  /** 화면 갱신 간격(requestAnimationFrame) — 50ms 넘게 걸린 번수 · 가장 긴 것. 메인 스레드가 막힌 정도 */
  frames: { n: number; slow: number; worst: number };
  net?: { files: number; kb: number; cached: number; slow: { name: string; ms: number; kb: number }[] };
  bake?: string;
  ctx?: Record<string, unknown>;
};

const KEY = 'storage-planner.loadlog.v1';
const KEEP = 60;
const SESSION = Math.random().toString(36).slice(2, 8);
let seq = 0;
let cur: Run | null = null;
let last: Run | null = null;
let doing = '불러오기';
let ctxFn: (() => Record<string, unknown>) | null = null;
let endTimer = 0;
const r1 = (n: number) => Math.round(n);

// 자원 기록은 기본 250개에서 멈춘다 — 처음 열기만 받는 파일이 250개를 넘었다(실측 2026-11-12)
try { performance.setResourceTimingBufferSize(5000); } catch { /* 모르는 브라우저 */ }

// ---------- 기기 정보(한 번)
export const loadEnv: Record<string, unknown> = {
  session: SESSION,
  build: typeof __BUILD__ !== 'undefined' ? __BUILD__ : null,
  url: location.href,
  ua: navigator.userAgent,
  cores: navigator.hardwareConcurrency,
  memGB: (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null,
  screen: `${screen.width}×${screen.height} @${devicePixelRatio}`,
};
void (async () => {
  try {
    const a = await (navigator as Navigator & { gpu?: { requestAdapter(): Promise<{ info?: Record<string, string> } | null> } }).gpu?.requestAdapter();
    const i = a?.info;
    loadEnv.gpu = i ? { vendor: i.vendor, arch: i.architecture, device: i.device, desc: i.description } : (a ? '정보 없음' : 'WebGPU 없음');
  } catch { loadEnv.gpu = '조회 실패'; }
})();

/** 기록할 화면 설정(화면 성능 단계·후처리·방 크기 등) — main.ts 가 넣는다 */
export function loadContext(fn: () => Record<string, unknown>) { ctxFn = fn; }

// ---------- 화면 갱신 간격 — 건이 열려 있는 동안만 잰다
let rafOn = false, lastFrame = 0;
function tick(t: number) {
  if (!cur) { rafOn = false; return; }
  if (lastFrame) { const d = t - lastFrame, f = cur.frames; f.n++; if (d > 50) f.slow++; if (d > f.worst) f.worst = r1(d); }
  lastFrame = t;
  requestAnimationFrame(tick);
}
function startFrames() { if (rafOn) return; rafOn = true; lastFrame = 0; requestAnimationFrame(tick); }

function open(kind: string, cause: string, t0 = performance.now()): Run {
  if (cur) close(`다음 건이 시작돼 끊김(${kind})`);
  cur = { id: `${SESSION}-${++seq}`, kind, cause, at: new Date(performance.timeOrigin + t0).toLocaleString('sv-SE'), t0: r1(t0), marks: [], stalls: [], frames: { n: 0, slow: 0, worst: 0 } };
  clearTimeout(endTimer);
  endTimer = window.setTimeout(() => close('시간 초과(120초)'), 120000);
  // 앞 건의 마지막 프레임부터 재면 그 사이(건 밖)가 한 프레임으로 잡힌다 — 7초짜리 건에 22초 프레임이 찍혔다(실측 2026-11-12)
  lastFrame = 0;
  startFrames();
  return cur;
}

function close(reason: string) {
  const r = cur; if (!r) return;
  cur = null; clearTimeout(endTimer);
  const tEnd = performance.now();
  r.total = r1(tEnd - r.t0); r.end = reason;
  // 이 건 동안 받은 파일
  try {
    const es = (performance.getEntriesByType('resource') as PerformanceResourceTiming[]).filter(e => e.startTime >= r.t0 && e.startTime <= tEnd);
    if (es.length) r.net = {
      files: es.length,
      kb: r1(es.reduce((a, e) => a + (e.transferSize || 0), 0) / 1024),
      cached: es.filter(e => !e.transferSize && e.decodedBodySize > 0).length,
      slow: [...es].sort((a, b) => b.duration - a.duration).slice(0, 5).map(e => ({ name: e.name.split('/').slice(-2).join('/').slice(0, 80), ms: r1(e.duration), kb: r1((e.transferSize || e.decodedBodySize || 0) / 1024) })),
    };
  } catch { /* 자원 기록 없음 */ }
  try { r.ctx = ctxFn?.(); } catch (e) { r.ctx = { 오류: String(e) }; }
  last = r;
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '[]') as Run[];
    all.push(r);
    localStorage.setItem(KEY, JSON.stringify(all.slice(-KEEP)));
    saved = Math.min(all.length, KEEP);
  } catch { /* 저장소가 꽉 찼으면 이번 화면 기록만 */ }
  console.info(`[불러오기 기록] ${r.kind}${r.cause ? ` · ${r.cause}` : ''} — ${(r.total / 1000).toFixed(1)}초 (${reason})`);
  if (import.meta.env.DEV) void fetch('/__loadlog', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ env: loadEnv, run: r }) }).catch(() => { /* 개발 서버가 받지 못해도 브라우저에는 남는다 */ });
}

// 처음 열기 — 페이지를 연 순간(0)부터
open('처음 열기', '', 0);

/** 단계 표시 — 한 건에 같은 이름은 한 번(처음 것) */
export function loadMark(label: string) {
  if (!cur || cur.marks.some(m => m.label === label)) return;
  cur.marks.push({ t: r1(performance.now() - cur.t0), label });
}
/** 지금 하는 일 — 그동안 생긴 긴 멈춤(longtask)에 붙는 이름 */
export function loadDoing(what: string) { doing = what; }
/** 직접 잰 멈춤(동기 작업 시간) */
export function loadStall(what: string, d: number, t = performance.now() - d) {
  if (cur && d >= 150) cur.stalls.push({ t: r1(t - cur.t0), d: r1(d), what });
}
/** 라이트맵 굽기 내역(spaceao.ts 가 돌려준 글) */
export function loadBake(info: string) { if (cur) cur.bake = info; }
/** 진행 중인 건이 있나 */
export const loadOpen = () => !!cur;
export const loadKind = () => cur?.kind ?? null;

/** 새 건 시작. 이미 진행 중인 건이 있으면 끊지 않고 그 건에 「무엇이 끼어들었나」만 표시한다(soft) */
export function loadBegin(kind: string, cause: string, soft = true) {
  // 같은 종류가 또 오면(장 바꾸기 중 다시 장 바꾸기) 앞 건을 끝내고 새로 — 뒤에서 온 「장 안 의류 도착」 건에 사용자의 장 크기 변경이 묻혔다(실측 2026-11-12)
  if (cur && soft && cur.kind !== kind) { push(`${kind}: ${cause}`); return; }
  open(kind, cause);
}
/** 같은 이름이어도 매번 남긴다 — 몇 번 끼어들었나·몇 번 다시 지었나를 세야 한다 */
function push(label: string) { if (cur) cur.marks.push({ t: r1(performance.now() - cur.t0), label }); }
/** 공간 재구성 — 처음 열기·재구성 중이면 그 건 안에 「다시 짓기」로(한 건 안에서 두 번 지은 것이 보이게),
 *  방금 시작한 「장 바꾸기」면 그 건을 재구성으로 바꾼다 */
export function loadRebuild(cause: string) {
  if (cur?.kind === '처음 열기' || cur?.kind === '재구성') {
    if (cur.marks.some(m => m.label === '공간 짓기 시작')) push(`공간 다시 짓기: ${cause}`);
    return;
  }
  if (cur?.kind === '장 바꾸기') { cur.kind = '재구성'; cur.cause = `${cause} (${cur.cause})`; return; }
  open('재구성', cause);
}
/** 건 끝 — kind 를 주면 그 종류일 때만 */
export function loadEnd(reason: string, kind?: string) {
  if (!cur || (kind && cur.kind !== kind)) return;
  close(reason);
}
/** 다음 화면이 그려진 뒤 끝 — 장만 바꾼 경우(방·라이트맵 그대로) */
export function loadEndAfterFrame(reason: string, kind: string) {
  const r = cur;
  requestAnimationFrame(() => requestAnimationFrame(() => { if (cur === r && cur?.kind === kind) close(reason); }));
  // 탭이 가려져 화면을 안 그리면 위가 오지 않는다 — 뒤에서 온 장 안 의류 건이 35초로 찍혔다(실측 2026-11-12). 1.5초 뒤엔 그대로 끝낸다
  setTimeout(() => { if (cur === r && cur?.kind === kind) close(`${reason} — 화면이 안 그려져 1.5초에 끝냄(탭 가려짐)`); }, 1500);
}

try {
  new PerformanceObserver(l => {
    for (const e of l.getEntries()) {
      if (!cur || e.duration < 300 || e.startTime < cur.t0) continue;
      const t = e.startTime - cur.t0;
      // 직접 잰 멈춤과 겹치면 그쪽 이름을 쓴다
      if (cur.stalls.some(s => s.t < t + e.duration && s.t + s.d > t)) continue;
      cur.stalls.push({ t: r1(t), d: r1(e.duration), what: doing });
    }
  }).observe({ type: 'longtask', buffered: true });
} catch { /* longtask 를 모르는 브라우저 */ }

// ---------- 내보내기
/** 브라우저에 쌓인 기록 전부 */
export function loadHistory(): Run[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') as Run[]; } catch { return []; }
}
/** JSON 파일로 내려받기 — 배포 화면(노트북)에서 잰 것을 그대로 넘겨받는다 */
export function loadDownload() {
  const data = { env: loadEnv, saved: new Date().toLocaleString('sv-SE'), runs: loadHistory() };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' }));
  a.download = `storage-planner-loadlog-${data.saved.replace(/[ :]/g, '').replace(/-/g, '')}.json`;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export function loadClear() { try { localStorage.removeItem(KEY); } catch { /* */ } last = null; saved = 0; }
/** 쌓인 건수(표시용 — 매번 저장소를 읽지 않게) */
let saved = loadHistory().length;
export const loadCount = () => saved;
// 개발 도구·자동 시험용
(window as unknown as Record<string, unknown>).loadlog = { env: loadEnv, history: loadHistory, current: () => cur, download: loadDownload, clear: loadClear };

const sec = (t: number) => `${(t / 1000).toFixed(1)}초`;
/** 표시용 HTML — 진행 중인 건(없으면 마지막 건)의 단계 · 가장 길게 멈춘 3번 */
export function loadReport() {
  const r = cur ?? last;
  if (!r) return '';
  const head = `${r.kind}${r.cause ? ` · ${r.cause}` : ''}${cur ? ' (진행 중)' : ` — ${sec(r.total ?? 0)}`}`;
  const top = [...r.stalls].sort((a, b) => b.d - a.d).slice(0, 3);
  let prev = 0;
  return `<br><small><b style="font-size:12px">${head}</b></small>`
    + r.marks.map(m => { const d = m.t - prev; prev = m.t; return `<br><small>${sec(m.t)} ${m.label}${d >= 1000 ? ` <span style="opacity:.6">+${sec(d)}</span>` : ''}</small>`; }).join('')
    + `<br><small>끊긴 화면 ${r.frames.slow}번 · 가장 길게 ${r.frames.worst}ms</small>`
    + (top.length ? '<br><small>오래 멈춤</small>' + top.map(s => `<br><small>${sec(s.t)} ${s.d}ms ${s.what}</small>`).join('') : '');
}
