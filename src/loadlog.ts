// 처음 열기 단계별 시간 · 오래 멈춘 일 — ?stats(FPS 표시) 아래에 보인다.
// 노트북(i7-1165G7 · Iris Xe)에서 「다 불러와 적용하는 데 60초」였는데 이 PC 측정(16~21초)과 달랐다(사용자 지적 2026-11-12 「너가 계산한거랑 다르다」) —
// 내장 그래픽의 셰이더 컴파일은 이 PC 에서 재현되지 않는다. 그래서 그 기기에서 직접 보이게 한다
const marks: { t: number; label: string }[] = [];
const stalls: { t: number; d: number; what: string }[] = [];
let doing = '불러오기';

/** 단계 표시 — 한 번만(같은 이름은 처음 것) */
export function loadMark(label: string) {
  if (marks.some(m => m.label === label)) return;
  marks.push({ t: performance.now(), label });
}
/** 지금 하는 일 — 그동안 생긴 긴 멈춤(longtask)에 붙는 이름 */
export function loadDoing(what: string) { doing = what; }
/** 직접 잰 멈춤(동기 작업 시간) */
export function loadStall(what: string, d: number, t = performance.now() - d) { if (d >= 150) stalls.push({ t, d, what }); }

try {
  new PerformanceObserver(l => {
    for (const e of l.getEntries()) {
      if (e.duration < 300) continue;
      // 직접 잰 멈춤과 겹치면 그쪽 이름을 쓴다
      if (stalls.some(s => s.t < e.startTime + e.duration && s.t + s.d > e.startTime)) continue;
      stalls.push({ t: e.startTime, d: e.duration, what: doing });
    }
  }).observe({ type: 'longtask', buffered: true });
} catch { /* longtask 를 모르는 브라우저 */ }

const sec = (t: number) => `${(t / 1000).toFixed(1)}초`;
/** 표시용 HTML — 단계(페이지 연 뒤) · 가장 길게 멈춘 3번 */
export function loadReport() {
  if (!marks.length) return '';
  const top = [...stalls].sort((a, b) => b.d - a.d).slice(0, 3);
  return '<br><small>처음 열기(페이지 연 뒤)</small>'
    + marks.map(m => `<br><small>${sec(m.t)} ${m.label}</small>`).join('')
    + (top.length ? '<br><small>오래 멈춤</small>' + top.map(s => `<br><small>${sec(s.t)} ${Math.round(s.d)}ms ${s.what}</small>`).join('') : '');
}
