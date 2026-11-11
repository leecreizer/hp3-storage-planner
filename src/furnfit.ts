// ---- 배치 가능 가구(사용자 지시 2026-11-06 「침대·책상·화장대 계산도 해야 해서 배치 가능 가구 목록이 대충은 있어야」).
// 장을 놓고 남은 바닥(장 + 장 앞 통로 · 방문 열리는 자리 · 지금 놓인 가구 제외)에 어떤 크기가 들어가는지 — 벽에 붙여 놓는 것만 본다.
// 동선 — 방문에서 각 가구 앞(비울 자리)과 장 앞까지 폭 60cm 통로로 걸어갈 수 있어야 한다(사용자 지적 2026-11-06 「가구와 겹치고 최소 동선 확보가 안 된다」).
// 크기는 일반 표준(프레임·몸체 포함 대략, mm). 한샘 상품 크기로 바꾸려면 FIT_ITEMS 만 고치면 된다
export type FitCat = 'bed' | 'desk' | 'vanity';
/** w = 벽을 따라 폭, d = 벽에서 나온 깊이, front = 앞에 비울 자리(의자·앉는 자리), side = 한쪽 옆에 비울 자리(침대 오르내리는 곳) */
export type FitItem = { id: string; cat: FitCat; name: string; w: number; d: number; front: number; side: number };
/** 최소 통로 폭(m) — 사람 한 명이 지나는 폭. 침대 옆 비울 자리도 이 폭 */
export const WALK = 0.6;
export const FIT_ITEMS: FitItem[] = [
  { id: 'bed-k', cat: 'bed', name: '킹 침대', w: 1700, d: 2150, front: 0, side: WALK * 1000 },
  { id: 'bed-q', cat: 'bed', name: '퀸 침대', w: 1600, d: 2150, front: 0, side: WALK * 1000 },
  { id: 'bed-ss', cat: 'bed', name: '슈퍼싱글 침대', w: 1200, d: 2100, front: 0, side: WALK * 1000 },
  { id: 'bed-s', cat: 'bed', name: '싱글 침대', w: 1100, d: 2100, front: 0, side: WALK * 1000 },
  { id: 'desk-14', cat: 'desk', name: '책상 1400', w: 1400, d: 700, front: 700, side: 0 },
  { id: 'desk-12', cat: 'desk', name: '책상 1200', w: 1200, d: 600, front: 700, side: 0 },
  { id: 'desk-10', cat: 'desk', name: '책상 1000', w: 1000, d: 600, front: 700, side: 0 },
  { id: 'van-10', cat: 'vanity', name: '화장대 1000', w: 1000, d: 450, front: 600, side: 0 },
  { id: 'van-8', cat: 'vanity', name: '화장대 800', w: 800, d: 400, front: 600, side: 0 },
];
export const FIT_CAT_KO: Record<FitCat, string> = { bed: '침대', desk: '책상', vanity: '화장대' };
/** 바닥 사각형 [x0, x1, z0, z1] (m) */
export type Rect = [number, number, number, number];
/** blocks = 가구를 놓을 수 없는 곳(장·통로·방문 열리는 자리·놓인 가구), solid = 걸어 지나갈 수 없는 곳(장 몸체·놓인 가구),
 *  entry = 방문 안쪽(동선 시작), reach = 꼭 걸어갈 수 있어야 하는 곳(장 앞) */
export type FitRoom = { x0: number; x1: number; D: number; blocks: Rect[]; solid?: Rect[]; entry?: Rect | null; reach?: Rect[] };
export type Placed = { item: FitItem; foot: Rect; clear: Rect[]; wall: 'back' | 'front' | 'left' | 'right' };

const EPS = 1e-6;
const hit = (a: Rect, b: Rect) => a[0] < b[1] - EPS && b[0] < a[1] - EPS && a[2] < b[3] - EPS && b[2] < a[3] - EPS;
const inside = (a: Rect, r: FitRoom) => a[0] >= r.x0 - EPS && a[1] <= r.x1 + EPS && a[2] >= -EPS && a[3] <= r.D + EPS;

/** 벽에 붙여 놓을 수 있는 자리 전부(10cm 간격) — 방 안 · 막힌 곳(장·통로·방문) 밖 */
function spots(it: FitItem, room: FitRoom): Placed[] {
  const out: Placed[] = [], w = it.w / 1000, d = it.d / 1000, f = it.front / 1000, s = it.side / 1000, { x0, x1, D } = room, step = 0.1;
  const walls = [['back', x1 - x0], ['front', x1 - x0], ['left', D], ['right', D]] as const;
  for (const [wall, len] of walls) {
    const n = Math.floor((len - w) / step + EPS);
    const as = Array.from({ length: Math.max(0, n + 1) }, (_, i) => i * step);
    if (len - w > EPS && n * step < len - w - EPS) as.push(len - w);          // 벽 끝에 딱 붙인 자리도
    for (const a of as) {
      // 벽 좌표(a ~ a+w 따라, 0 ~ dep 안쪽) → 방 좌표
      const R = (u0: number, u1: number, v0: number, v1: number): Rect => {
        switch (wall) {
          case 'back': return [x0 + u0, x0 + u1, v0, v1];
          case 'front': return [x0 + u0, x0 + u1, D - v1, D - v0];
          case 'left': return [x0 + v0, x0 + v1, u0, u1];
          default: return [x1 - v1, x1 - v0, u0, u1];
        }
      };
      const foot = R(a, a + w, 0, d);
      const fronts = f > 0 ? [R(a, a + w, d, d + f)] : [];
      const sides = s > 0 ? [[R(a - s, a, 0, d)], [R(a + w, a + w + s, 0, d)]] : [[]];
      for (const sd of sides) {
        const clear = [...fronts, ...sd];
        if (![foot, ...clear].every(r => inside(r, room))) continue;
        if ([foot, ...clear].some(r => room.blocks.some(b => hit(r, b)))) continue;
        out.push({ item: it, foot, clear, wall });
      }
    }
  }
  return out;
}
// ---- 동선 — 10cm 격자에서 사람 가운데가 설 수 있는 칸(벽·몸체에서 통로 폭의 반 이상 떨어진 칸)을 방문에서부터 넓혀 간다
const CELL = 0.1;
function walkable(room: FitRoom, done: Placed[]) {
  if (!room.entry) return true;                                         // 방문이 없으면 동선을 보지 않는다
  const r = WALK / 2 - 0.01, nx = Math.max(1, Math.round((room.x1 - room.x0) / CELL)), nz = Math.max(1, Math.round(room.D / CELL));
  const solid = [...(room.solid ?? []), ...done.map(p => p.foot)];
  const cx = (i: number) => room.x0 + (i + 0.5) * CELL, cz = (j: number) => (j + 0.5) * CELL;
  const free = new Uint8Array(nx * nz);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const x = cx(i), z = cz(j);
    if (x - r < room.x0 || x + r > room.x1 || z - r < 0 || z + r > room.D) continue;
    if (solid.some(s => x + r > s[0] && x - r < s[1] && z + r > s[2] && z - r < s[3])) continue;
    free[j * nx + i] = 1;
  }
  const cellsIn = (a: Rect) => { const o: number[] = []; for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) { const x = cx(i), z = cz(j); if (x >= a[0] && x <= a[1] && z >= a[2] && z <= a[3]) o.push(j * nx + i); } return o; };
  const seen = new Uint8Array(nx * nz), q: number[] = [];
  for (const k of cellsIn(room.entry)) if (free[k]) { seen[k] = 1; q.push(k); }
  if (!q.length) return false;
  while (q.length) {
    const k = q.pop()!, i = k % nx, j = (k - i) / nx;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= nx || b >= nz) continue;
      const n = b * nx + a; if (!free[n] || seen[n]) continue; seen[n] = 1; q.push(n);
    }
  }
  // 가구마다 비울 자리 중 한 곳 이상에 닿는가 · 장 앞에 닿는가
  const touch = (a: Rect) => cellsIn(a).some(k => seen[k]);
  return done.every(p => p.clear.some(touch)) && (room.reach ?? []).every(touch);
}

/** 이미 놓인 것과 함께 놓을 수 있나 — 몸체는 남의 몸체·비울 자리와 겹치지 않고, 비울 자리는 남의 몸체와 겹치지 않는다(비울 자리끼리는 같이 써도 된다) */
const fits = (p: Placed, done: Placed[]) => done.every(q => !hit(p.foot, q.foot) && q.clear.every(c => !hit(p.foot, c)) && p.clear.every(c => !hit(c, q.foot)));

/** 여러 가구를 함께 — 앞 가구부터 자리를 정하고 뒤 가구가 안 들어가면 앞 가구 자리를 바꿔 본다(찾는 횟수 제한) */
export function placeSet(items: FitItem[], room: FitRoom): Placed[] | null {
  const cand = items.map(it => spots(it, room));
  if (cand.some(c => !c.length)) return null;
  let budget = 400000, leaves = 400;
  const go = (i: number, done: Placed[]): Placed[] | null => {
    if (i === items.length) return --leaves >= 0 && walkable(room, done) ? done : null;
    for (const p of cand[i]) {
      if (--budget < 0 || leaves < 0) return null;
      if (!fits(p, done)) continue;
      const r = go(i + 1, [...done, p]);
      if (r) return r;
    }
    return null;
  };
  return go(0, []);
}

export type FitReport = {
  /** 하나씩 — 그 가구만 놓을 때 들어가나 */
  single: { item: FitItem; ok: boolean }[];
  /** 함께 놓기 추천 — 침대 + 책상 + 화장대 중 가장 크게 들어가는 조합(셋이 안 되면 둘) */
  set: Placed[] | null;
};
export function fitReport(room: FitRoom): FitReport {
  const single = FIT_ITEMS.map(item => ({ item, ok: !!placeSet([item], room) }));
  const ok = (c: FitCat) => single.filter(s => s.ok && s.item.cat === c).map(s => s.item);   // 큰 것부터(목록 순서)
  const beds = ok('bed'), desks = ok('desk'), vans = ok('vanity');
  // 셋 → 둘(침대+책상 · 침대+화장대 · 책상+화장대) 순으로, 각 분류는 큰 것부터 — 처음 들어가는 조합
  const groups: FitItem[][][] = [[beds, desks, vans], [beds, desks], [beds, vans], [desks, vans]];
  for (const g of groups) {
    if (g.some(l => !l.length)) continue;
    // 침대 크기를 먼저 지키고(가장 중요한 가구), 그 안에서 책상·화장대를 크게
    const combos: FitItem[][] = [[]];
    for (const l of g) combos.splice(0, combos.length, ...combos.flatMap(c => l.map(x => [...c, x])));
    for (const c of combos) { const r = placeSet(c, room); if (r) return { single, set: r }; }
  }
  const one = single.find(s => s.ok);
  return { single, set: one ? placeSet([one.item], room) : null };
}
