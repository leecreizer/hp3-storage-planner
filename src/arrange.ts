// 말로 장 배치 — 「긴 옷이 많아」「이불이랑 옷을 같이」 같은 문장을 칸 구성으로 바꾼다.
// 기준(사전 지식)은 한샘이 계획마다 정해 둔 칸별 대표 구성(카탈로그 rep — 타입별 107개 계획)에서 뽑는다:
//   ① 타입마다 종류 비율(예: 시그니처 서랍형 = 외부서랍·짧은 옷·이불) ② 종류마다 놓이는 위치(예: 외부서랍 왼쪽 끝, 이불장 오른쪽)
// 문장은 단어 규칙으로 요구 가중치를 만들고(많이·위주 = 강하게, 없어도·빼고 = 빼기, "두 칸" = 개수),
// 칸마다 고를 수 있는 몸통 조합을 전부(최대 4칸 × 12종) 점수 매겨 가장 맞는 구성을 고른다.
import type { Design, Planner } from './catalog';

export type Need = 'long' | 'short' | 'pants' | 'drawerIn' | 'drawerOut' | 'shelf' | 'bedding' | 'powder';
export const NEED_LABEL: Record<Need, string> = {
  long: '긴 옷', short: '짧은 옷', pants: '바지', drawerIn: '내부 서랍', drawerOut: '외부 서랍',
  shelf: '선반', bedding: '이불', powder: '화장대',
};
const NEEDS = Object.keys(NEED_LABEL) as Need[];

export function needOf(name: string): Need | null {
  if (name.includes('파우더')) return 'powder';
  // 멀티서랍형은 도어 안쪽 서랍(카탈로그 외부 서랍 수 0, 몸통 모델과 한 덩어리) — 외부서랍만 앞에 보인다
  if (name.includes('외부서랍')) return 'drawerOut';
  if (name.includes('내부서랍') || name.includes('T서랍') || name.includes('멀티서랍')) return 'drawerIn';
  if (name.includes('1단 행거')) return 'long';
  if (name.includes('2단 행거')) return 'short';
  if (name.includes('바지걸이')) return 'pants';
  if (name.includes('이불')) return 'bedding';
  if (name.includes('선반')) return 'shelf';
  return null;
}

// ---------------------------------------------------------------- 문장 해석
type Rule = { re: RegExp; add: Partial<Record<Need | 'drawer', number>>; tag?: string };
const RULES: Rule[] = [
  { re: /긴\s*옷|롱\s*(코트|패딩|원피스|스커트)|코트|원피스|패딩|드레스|트렌치|롱\s*치마/g, add: { long: 1 } },
  { re: /짧은\s*옷|셔츠|블라우스|자켓|재킷|정장|양복|상의|티셔츠를?\s*걸|걸어\s*두/g, add: { short: 1 } },
  { re: /바지|슬랙스|청바지|하의/g, add: { pants: 1 } },
  { re: /외부\s*서랍|겉\s*서랍|바깥\s*서랍|멀티\s*서랍|보이는\s*서랍/g, add: { drawerOut: 1.2 } },
  { re: /내부\s*서랍|안쪽\s*서랍|숨은\s*서랍|속\s*서랍/g, add: { drawerIn: 1.2 } },
  { re: /서랍|속옷|양말|잡동사니|소품|액세서리|넥타이|스카프|개어서|개서/g, add: { drawer: 1 } },
  { re: /선반|가방|모자|니트|스웨터|접어|오픈|수납함|박스/g, add: { shelf: 1 } },
  { re: /이불|침구|베개|토퍼|담요|요\s*이불|겨울\s*이불/g, add: { bedding: 1 } },
  { re: /화장|파우더|메이크업|화장대/g, add: { powder: 1.2 } },
  // 상황 — 직접 말하지 않아도 필요한 칸
  { re: /수납(이|을|력|량)?\s*(이\s*)?(많|최대|넉넉|크|좋)|많이\s*(들어|넣)|꽉\s*채|최대한/g, add: { short: 1.2, drawer: 0.9, shelf: 0.7, bedding: 0.4, long: -0.3 }, tag: '수납 많이' },
  { re: /옷(이|을)?\s*(정말\s*)?많|행거/g, add: { short: 1, long: 0.4 }, tag: '옷 많이' },
  // 그냥 「옷」 — 위 규칙들이 쓴 자리는 지워져 있으므로 남은 「옷」만 걸린다
  { re: /옷/g, add: { short: 0.8, long: 0.3 } },
  { re: /아이|아기|유아|어린이|애기/g, add: { drawer: 1, shelf: 0.6 }, tag: '아이 옷' },
  { re: /부부|남편|아내|둘이|두\s*사람/g, add: { short: 0.6, long: 0.5, drawer: 0.5 }, tag: '부부' },
  { re: /계절|철\s*지난|여름\s*옷|겨울\s*옷/g, add: { drawer: 0.6, bedding: 0.5 }, tag: '계절옷' },
];
const MORE = /많|여러|위주|가득|넉넉|주로|대부분|충분|잔뜩/;   // 「꼭 필요」는 있어야 한다는 뜻이지 여러 칸이 아니다
const LESS = /조금|약간|하나만|적게|작게/;
const NOT = /없어도|없이|빼|말고|필요\s*없|안\s*(필요|써|넣)|제외|싫/;
const KNUM: Record<string, number> = { 한: 1, 하나: 1, 두: 2, 둘: 2, 세: 3, 셋: 3, 네: 4, 넷: 4 };

export type Intent = { w: Record<Need, number>; drawer: number; counts: Partial<Record<Need | 'drawer', number>>; tags: string[]; dense: boolean };

export function parsePrompt(text: string): Intent {
  const w = Object.fromEntries(NEEDS.map(n => [n, 0])) as Record<Need, number>;
  let drawer = 0;
  const counts: Intent['counts'] = {};
  const tags: string[] = [];
  // 「외부 서랍」은 「서랍」 규칙에 다시 걸리지 않게 한 번 쓴 자리는 지운다
  let rest = text;
  for (const r of RULES) {
    rest = rest.replace(r.re, (m, ...a) => {
      const at = a[a.length - 2] as number;
      const near = rest.slice(Math.max(0, at - 6), at + m.length + 12);
      const after = rest.slice(at + m.length, at + m.length + 12);
      let k = 1;
      if (NOT.test(after) || NOT.test(rest.slice(Math.max(0, at - 4), at))) k = -1.5;
      else if (MORE.test(near)) k = 1.6;
      else if (LESS.test(near)) k = 0.6;
      const cnt = /(\d|한|하나|두|둘|세|셋|네|넷)\s*칸/.exec(after);
      for (const [key, v] of Object.entries(r.add) as [Need | 'drawer', number][]) {
        if (key === 'drawer') drawer += v * k; else w[key] += v * k;
        if (cnt && k > 0 && Object.keys(r.add).length === 1) counts[key] = +cnt[1] || KNUM[cnt[1]] || 1;
      }
      if (r.tag && k > 0 && !tags.includes(r.tag)) tags.push(r.tag);
      return ' '.repeat(m.length);
    });
  }
  return { w, drawer, counts, tags, dense: tags.includes('수납 많이') };
}

// ---------------------------------------------------------------- 한샘 기본 구성에서 배운 기준
type Prior = { share: Record<Need, number>; pos: Record<Need, number> };
const priorCache = new Map<number, Prior>();
export function learnPrior(pl: Planner, typeId: number): Prior {
  const hit = priorCache.get(typeId); if (hit) return hit;
  const cnt = Object.fromEntries(NEEDS.map(n => [n, 0])) as Record<Need, number>;
  const posSum = { ...cnt }; let total = 0;
  for (const pid of pl.type(typeId).plans) {
    const p = pl.plan(pid), n = p.slots.length;
    p.slots.forEach((s, i) => {
      const k = needOf(pl.c(s.rep).name); if (!k) return;
      cnt[k]++; posSum[k] += n > 1 ? i / (n - 1) : 0.5; total++;
    });
  }
  const share = Object.fromEntries(NEEDS.map(n => [n, total ? cnt[n] / total : 0])) as Record<Need, number>;
  // 기본 구성에 안 나오는 종류는 가운데(0.5)
  const pos = Object.fromEntries(NEEDS.map(n => [n, cnt[n] ? posSum[n] / cnt[n] : 0.5])) as Record<Need, number>;
  const pr = { share, pos };
  priorCache.set(typeId, pr);
  return pr;
}

// ---------------------------------------------------------------- 배치
export type Arranged = { design: Design; lines: string[]; read: string[]; missing: string[]; switched: string | null; index: number; count: number };

/** 말한 타입·그레이드 — 「슬라이딩」「시그니처」「가성비」 */
function typeBonus(text: string, t: { name: string; doorType: string }) {
  let b = 0;
  if (/슬라이딩|미닫이/.test(text)) b += t.doorType === 'SLIDING' ? 2 : -1;
  if (/여닫이/.test(text)) b += t.doorType === 'SWING' ? 1 : -1;
  if (/시그니처|고급|프리미엄/.test(text)) b += t.name.includes('시그니처') ? 2 : -0.5;
  if (/에센셜|저렴|가성비|실속|싸게/.test(text)) b += t.name.includes('에센셜') ? 2 : -0.5;
  if (/외부\s*서랍|서랍형/.test(text)) b += t.name.includes('서랍형') ? 0.8 : 0;
  return b;
}

/** 지금 타입·폭에 원하는 구성이 없으면 같은 폭의 다른 타입(에센셜/시그니처 · 기본/서랍/슬라이딩/파우더)까지 보고 가장 맞는 것으로.
 *  들어온 타입은 +1, 도어 방식(여닫이/슬라이딩)이 같으면 +0.5 — 비슷하면 바꾸지 않는다.
 *  variant — 같은 말을 다시 하면 다음 안(점수 순 상위 후보 중 구성이 다른 것, 최대 6개를 돌아가며) */
export function arrange(pl: Planner, d: Design, text: string, variant = 0): Arranged {
  const it = parsePrompt(text);
  const cur = pl.type(d.typeId);
  const all: { total: number; design: Design; fit: ReturnType<typeof fitType> }[] = [];
  for (const t of pl.cat.types) {
    const cand = t.id === d.typeId ? d : pl.newDesign(t.id, d.width, d);
    if (!cand) continue;
    const r = fitType(pl, cand, { ...it, counts: { ...it.counts } });
    const bonus = (t.id === d.typeId ? 1 : 0) + (t.doorType === cur.doorType ? 0.5 : 0) + typeBonus(text, t);
    for (const c of r.cands) all.push({ total: c.score + bonus, design: c.design, fit: r });
  }
  all.sort((a, b) => b.total - a.total);
  // 다음 안 = 직전 안과 칸마다 최대한 다른 구성(사용자 지시 2026-10-29: 「제안을 누르면 장 하나만 바뀐다 — 모든 장에 적용」).
  // 1등보다 6점 넘게 낮은 안은 쓰지 않는다. 다른 칸 수가 같으면 점수 높은 쪽
  const uniq = new Map<string, (typeof all)[number]>();
  for (const a of all) {
    const key = a.design.typeId + ':' + a.design.slots.map(s => pl.c(s.bodyId).name).join(',');
    if (!uniq.has(key) && a.total >= all[0].total - 6) uniq.set(key, a);
  }
  const pool = [...uniq.values()];
  const names = (x: (typeof all)[number]) => x.design.slots.map(s => pl.c(s.bodyId).name);
  // 칸마다 놓인 몸통끼리 비교 — 타입만 바뀌고 칸 구성이 같으면 다른 안이 아니다
  const diff = (a: (typeof all)[number], b: (typeof all)[number]) => {
    const na = names(a), nb = names(b);
    return Math.max(na.length, nb.length) - na.filter((v, k) => v === nb[k]).length;
  };
  const list: typeof all = [pool.shift()!];
  while (list.length < 6 && pool.length) {
    const last = list[list.length - 1];
    let bi = 0;
    for (let k = 1; k < pool.length; k++) {
      const dk = diff(pool[k], last), db = diff(pool[bi], last);
      // 다른 칸 수 → 들어온 타입 그대로인 안 → 점수
      const sk = pool[k].design.typeId === d.typeId, sb = pool[bi].design.typeId === d.typeId;
      if (dk > db || (dk === db && (sk !== sb ? sk : pool[k].total > pool[bi].total))) bi = k;
    }
    list.push(pool.splice(bi, 1)[0]);
  }
  const index = variant % list.length, r = list[index];
  const nt = pl.type(r.design.typeId);
  const why = r.fit.asked.filter(n => !r.fit.curAvail(d).has(n)).map(n => NEED_LABEL[n]).join('·');
  const switched = nt.id === d.typeId ? null : `「${nt.name}」으로 바꿔 보여 드려요 (지금 「${cur.name}」${why ? ` — ${why} 칸이 없어서` : ''})`;
  const lines = r.design.slots.map((s, i) => {
    const c = pl.c(s.bodyId), k = needOf(c.name);
    return `${i + 1}번째 칸 · ${c.name}${k ? ` (${NEED_LABEL[k]})` : ''}`;
  });
  return { design: r.design, lines, read: r.fit.read, missing: r.fit.missing, switched, index, count: list.length };
}

function fitType(pl: Planner, d: Design, it: Intent) {
  const pr = learnPrior(pl, d.typeId);
  const N = d.slots.length;
  // 칸마다 고를 수 있는 종류 → 대표 몸통(같은 종류 변형 A·B·C 중 한샘 대표 구성에 쓰인 것, 없으면 첫 번째)
  const opts = d.slots.map(s => {
    const def = pl.slotDef(d, s.slotSeq);
    const by = new Map<Need, number>();
    // 수납 많이 → 같은 종류에서 단이 많은 몸통(3단 서랍 > 2단 > 1단)
    const tiers = (id: number) => +(/(\d)단/.exec(pl.c(id).name)?.[1] ?? 0);
    for (const b of def.bodies) {
      const k = needOf(pl.c(b.id).name); if (!k) continue;
      const cur = by.get(k);
      if (cur == null) by.set(k, b.id);
      else if (it.dense && k !== 'long' && k !== 'short' ? tiers(b.id) > tiers(cur) : b.id === def.rep) by.set(k, b.id);
    }
    return [...by.entries()];
  });
  const availAll = new Set(opts.flatMap(o => o.map(([k]) => k)));
  // 「서랍」(종류 안 정함) → 이 타입에서 더 흔한 쪽
  const w = { ...it.w };
  if (it.drawer) {
    const k: Need = !availAll.has('drawerIn') ? 'drawerOut' : !availAll.has('drawerOut') ? 'drawerIn'
      : pr.share.drawerOut >= pr.share.drawerIn ? 'drawerOut' : 'drawerIn';
    w[k] += it.drawer;
    if (it.counts.drawer && !it.counts[k]) it.counts[k] = it.counts.drawer;
  }
  const asked = NEEDS.filter(n => w[n] > 0);
  // 바라는 칸 수 — 요구 가중치 + 한샘 기본 비율(말이 없으면 기본 구성에 가깝게)
  const want = Object.fromEntries(NEEDS.map(n => [n, Math.max(0, w[n]) + pr.share[n] * 0.8])) as Record<Need, number>;
  const sum = NEEDS.reduce((a, n) => a + (availAll.has(n) ? want[n] : 0), 0) || 1;
  // 강조하지 않은 요구(「이불도」)는 한 칸까지 — 많이·위주라고 해야 여러 칸
  const desired = Object.fromEntries(NEEDS.map(n => {
    let v = availAll.has(n) ? N * want[n] / sum : 0;
    if (w[n] > 0 && w[n] < 1.5 && !it.dense) v = Math.min(v, 1);
    return [n, it.counts[n] ?? v];
  })) as Record<Need, number>;

  // 몸통 조합(순서 무관)마다 가장 좋은 배치 하나 — 같은 말을 다시 하면 순서만 바뀐 안이 아니라 구성이 다른 안을 보여 준다
  const byMix = new Map<string, { score: number; pick: [Need, number][] }>();
  const cur: [Need, number][] = [];
  const count = Object.fromEntries(NEEDS.map(n => [n, 0])) as Record<Need, number>;
  const dfs = (i: number) => {
    if (i === N) {
      let sc = 0;
      for (const n of NEEDS) {
        sc -= (count[n] - desired[n]) ** 2;                         // 바라는 칸 수에 가깝게
        if (w[n] > 0 && count[n] > 0) sc += 1.5;                    // 말한 것은 꼭 한 칸은
        if (w[n] < 0) sc += w[n] * count[n] * 2;                    // 빼 달라는 것
        if (it.counts[n] != null) sc -= 3 * Math.abs(count[n] - it.counts[n]!);
      }
      cur.forEach(([n], j) => {                                     // 한샘 기본 구성의 자리
        const x = N > 1 ? j / (N - 1) : 0.5;
        sc -= 0.6 * (x - pr.pos[n]) ** 2;
      });
      // 같은 종류는 붙여 둔다(긴 옷 칸이 양끝으로 갈라지지 않게)
      for (let j = 1; j < N; j++) if (cur[j][0] === cur[j - 1][0]) sc += 0.15;
      const mix = cur.map(([, id]) => pl.c(id).name).sort().join(',');
      const had = byMix.get(mix);
      if (!had || sc > had.score) byMix.set(mix, { score: sc, pick: cur.slice() });
      return;
    }
    for (const o of opts[i]) { cur.push(o); count[o[0]]++; dfs(i + 1); count[o[0]]--; cur.pop(); }
  };
  dfs(0);

  // 이 타입·폭에 없는 요구는 감점 — 다른 타입과 견줄 때 쓴다
  const tops = [...byMix.values()].sort((a, b) => b.score - a.score).slice(0, 10);
  const pen = asked.filter(n => !availAll.has(n)).reduce((a, n) => a + 3 * w[n], 0);
  const cands = tops.map(t => ({ score: t.score - pen, design: { ...d, slots: d.slots.map((s, i) => ({ ...s, bodyId: t.pick[i]?.[1] ?? s.bodyId })) } as Design }));
  const read = [
    ...asked.map(n => `${NEED_LABEL[n]}${w[n] >= 1.5 ? ' 많이' : ''}${it.counts[n] ? ` ${it.counts[n]}칸` : ''}`),
    ...NEEDS.filter(n => w[n] < 0).map(n => `${NEED_LABEL[n]} 빼기`),
    ...it.tags,
  ];
  // 이 타입에 없는 종류 — 어느 타입에 있는지 알려 준다
  const missing = asked.filter(n => !availAll.has(n)).map(n => {
    const has = pl.cat.types.filter(t => t.plans.some(pid => pl.plan(pid).slots.some(s => s.bodies.some(b => needOf(pl.c(b.id).name) === n))));
    return `${NEED_LABEL[n]} 칸은 이 타입·폭에 없습니다${has.length ? ` — ${has.map(t => t.name).join(', ')}에서 고를 수 있어요` : ''}`;
  });
  // 들어온 설계에서 고를 수 있던 종류(타입을 바꾼 이유를 말할 때)
  const curAvail = (src: Design) => new Set(src.slots.flatMap(s => pl.slotDef(src, s.slotSeq).bodies.map(b => needOf(pl.c(b.id).name)).filter((x): x is Need => !!x)));
  return { cands, read, missing, asked, curAvail };
}
