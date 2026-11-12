// 불러오기·재구성 기록 분석 — node tools/loadlog-report.mjs [파일...]
// 파일: 개발 서버가 쌓은 logs/loadlog.jsonl, 또는 화면 「기록 저장」으로 받은 storage-planner-loadlog-*.json
// 파일을 안 주면 logs/loadlog.jsonl. --last N 이면 마지막 N 건만, --kind 재구성 이면 그 종류만
import { readFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const lastN = +(opt('--last') ?? 0), kindOnly = opt('--kind');
const files = args.length ? args : ['logs/loadlog.jsonl'];

/** {env, run}[] 로 통일 */
function read(f) {
  if (!existsSync(f)) { console.error(`없음: ${f}`); return []; }
  const txt = readFileSync(f, 'utf8').trim();
  if (!txt) return [];
  if (txt.startsWith('{') && txt.includes('"runs"')) {
    const j = JSON.parse(txt);
    return j.runs.map(run => ({ env: j.env, run }));
  }
  return txt.split('\n').filter(Boolean).map(l => JSON.parse(l));
}
let rows = files.flatMap(read);
if (kindOnly) rows = rows.filter(r => r.run.kind === kindOnly);
if (lastN) rows = rows.slice(-lastN);
if (!rows.length) { console.log('기록 없음'); process.exit(0); }

const s = (ms) => `${(ms / 1000).toFixed(1)}초`;
const pad = (t, n) => { t = String(t); let w = 0; for (const c of t) w += c.charCodeAt(0) > 0x2e80 ? 2 : 1; return t + ' '.repeat(Math.max(0, n - w)); };
const gpu = (e) => typeof e?.gpu === 'object' ? [e.gpu.vendor, e.gpu.arch, e.gpu.device || e.gpu.desc].filter(Boolean).join(' ') : e?.gpu ?? '?';

// ---------- 기기
const envs = new Map(rows.map(r => [r.env?.session, r.env]));
console.log(`\n■ 기기 ${envs.size}개 · 기록 ${rows.length}건`);
for (const e of envs.values()) console.log(`  [${e?.session}] 판 ${e?.build?.hash ?? '?'} · GPU ${gpu(e)} · 코어 ${e?.cores} · 메모리 ${e?.memGB ?? '?'}GB · 화면 ${e?.screen} · ${(e?.ua ?? '').match(/(Chrome|Edg|Firefox|Safari)\/[\d.]+/g)?.join(' ') ?? ''}`);

// ---------- 건별
console.log('\n■ 건별');
for (const { env, run: r } of rows) {
  const c = r.ctx ?? {};
  console.log(`\n▶ ${r.at} [${env?.session}] ${r.kind}${r.cause ? ` · ${r.cause}` : ''} — ${s(r.total ?? 0)} (${r.end})`);
  console.log(`  단계 ${c.tier ?? '?'} · ${c.canvas ?? '?'} · 배율 ${c.dpr ?? '?'} · 방 ${c.room ? `${c.room.w}×${c.room.d}` : '?'} · 장 폭 ${c.design?.width ?? '?'}${c.visible === 'hidden' ? ' · ⚠ 탭이 가려진 채 끝남(시간이 늘어남)' : ''}`);
  let prev = 0;
  for (const m of r.marks) { console.log(`   ${pad(s(m.t), 7)} ${pad(m.label, 34)} +${s(m.t - prev)}`); prev = m.t; }
  const f = r.frames ?? {};
  console.log(`   화면 끊김 ${f.slow ?? 0}번 / ${f.n ?? 0}프레임 · 가장 길게 ${f.worst ?? 0}ms`);
  const st = [...(r.stalls ?? [])].sort((a, b) => b.d - a.d).slice(0, 5);
  if (st.length) console.log('   오래 멈춤 ' + st.map(x => `${s(x.t)} ${x.d}ms ${x.what}`).join(' | '));
  if (r.net) console.log(`   받은 파일 ${r.net.files}개 · ${(r.net.kb / 1024).toFixed(1)}MB · 캐시 ${r.net.cached}개 · 느린 것 ${r.net.slow.slice(0, 3).map(x => `${x.name} ${x.ms}ms`).join(', ')}`);
  if (r.bake) console.log(`   라이트맵 ${r.bake}`);
}

// ---------- 종류별 묶음 — 같은 단계 사이 시간의 중앙값
console.log('\n■ 종류별 (중앙값)');
const med = (a) => { const b = [...a].sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : 0; };
const kinds = [...new Set(rows.map(r => r.run.kind))];
for (const k of kinds) {
  const rs = rows.filter(r => r.run.kind === k).map(r => r.run);
  console.log(`  ${k} ${rs.length}건 · 전체 ${s(med(rs.map(r => r.total ?? 0)))} (최소 ${s(Math.min(...rs.map(r => r.total ?? 0)))} · 최대 ${s(Math.max(...rs.map(r => r.total ?? 0)))})`);
  const labels = [...new Set(rs.flatMap(r => r.marks.map(m => m.label)))].filter(l => !l.includes(':'));
  for (const l of labels) {
    const ts = rs.map(r => r.marks.find(m => m.label === l)?.t).filter(t => t != null);
    if (ts.length) console.log(`     ${pad(l, 30)} ${s(med(ts))}`);
  }
}

// ---------- 어디서 시간을 쓰나 — 멈춤 이름별 합
console.log('\n■ 멈춤 원인별 합(전체 기록)');
const by = new Map();
for (const { run } of rows) for (const x of run.stalls ?? []) { const v = by.get(x.what) ?? { n: 0, ms: 0, max: 0 }; v.n++; v.ms += x.d; v.max = Math.max(v.max, x.d); by.set(x.what, v); }
[...by].sort((a, b) => b[1].ms - a[1].ms).slice(0, 10).forEach(([w, v]) => console.log(`  ${pad(w, 40)} ${v.n}번 · 합 ${s(v.ms)} · 최대 ${v.max}ms`));

// ---------- 짚을 것
console.log('\n■ 짚을 것');
const hints = [];
for (const { run: r } of rows) {
  const tag = `${r.at} ${r.kind}`;
  if (r.ctx?.visible === 'hidden') hints.push(`${tag}: 탭이 가려진 상태 — 브라우저가 속도를 늦춰 시간이 부풀었다`);
  // 화면 갱신(requestAnimationFrame)이 초당 20번도 안 돌았다 — 창이 다른 창에 가려졌거나 최소화돼 브라우저가 늦춘 것(실측 2026-11-12 시험 창 초당 9번).
  // 환경맵 찍기·덮개 걷기·그리기가 모두 화면 갱신을 기다려 그만큼 늦어진다
  const fps = (r.frames?.n ?? 0) / Math.max(1, (r.total ?? 0) / 1000);
  if ((r.total ?? 0) > 3000 && fps < 20) hints.push(`${tag}: 화면 갱신이 초당 ${fps.toFixed(1)}번 — 창이 가려졌거나 최소화돼 늦춰졌을 수 있다(시간이 부풀었음)`);
  if (r.end?.startsWith('다음 건')) hints.push(`${tag}: 끝나기 전에 다른 변경이 들어와 끊김(${r.end})`);
  if (r.end?.startsWith('시간 초과')) hints.push(`${tag}: 120초 안에 끝나지 않음 — 마지막 단계 「${r.marks.at(-1)?.label}」 뒤에서 멈췄다`);
  const firstNet = r.net && r.net.kb > 5000 && r.net.cached < r.net.files / 2;
  if (firstNet) hints.push(`${tag}: 새로 받은 파일 ${(r.net.kb / 1024).toFixed(1)}MB — 네트워크가 시간의 큰 몫일 수 있다(캐시 ${r.net.cached}/${r.net.files})`);
  const big = (r.stalls ?? []).filter(x => x.d >= 1500);
  for (const x of big) hints.push(`${tag}: ${s(x.t)} 에 ${x.d}ms 멈춤 「${x.what}」`);
  const m = Object.fromEntries(r.marks.map(x => [x.label, x.t]));
  if (m['라이트맵 굽기 시작'] != null && m['라이트맵 끝'] != null && m['라이트맵 끝'] - m['라이트맵 굽기 시작'] > 8000) hints.push(`${tag}: 라이트맵 굽기 ${s(m['라이트맵 끝'] - m['라이트맵 굽기 시작'])} — 굽기 정밀도(quality.bake)·가림 삼각형을 볼 것`);
  if (r.marks.some(x => x.label.startsWith('공간 다시 짓기'))) hints.push(`${tag}: 처음 열기 중 공간을 두 번 지음 — ${r.marks.filter(x => x.label.startsWith('공간 다시 짓기')).map(x => x.label).join(', ')}`);
}
console.log(hints.length ? hints.map(h => '  · ' + h).join('\n') : '  없음');
