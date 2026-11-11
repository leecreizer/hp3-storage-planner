// 붙박이장 셀프 플래너 카탈로그 — 시뮬레이터 API 스냅샷(public/data/catalog.json)을 읽고 계획·도어·가격을 계산한다

export type DoorColor = {
  id: number; name: string; lineup: string; lineupDesc: string; mirror: boolean;
  image: string | null; images: string[];
};
export type TypeDef = {
  id: number; name: string; image: string; group: string; groupDesc: string;
  doorType: 'SWING' | 'SLIDING'; min: number; max: number; bodyColor: 'SIGNATURE' | 'BASIC';
  baseboard: number; doorColors: DoorColor[]; plans: number[];
};
export type SlotDef = { seq: number; name: string; w: number; rep: number; doorLoc: string | null; bodies: { id: number; doors: number[] }[] };
export type Plan = {
  id: number; typeId: number; min: number; max: number; side: number; top: number;
  sideCut: [number, number]; height: [number, number]; depth: number; movable: boolean;
  slots: SlotDef[]; surroundings: number[]; panels: number[]; accessories: number[];
  baseboards: number[]; rails: number[]; included: { id: number; qty: number }[];
};
export type Content = {
  id: number; kind: string; name: string; w: number; d: number; h: number;
  detail: string | null; drawers: number | null; bodyColor: string | null;
  doorType: string | null; doorColorId: number | null; mirror: boolean | null;
  loc: string | null; surType: string | null; panelLoc: string | null;
  price: number; code: string | null; thumb: string | null; detailImg: string | null;
  bundle: string | null;         // 원본 Unity 에셋 번들 이름 → public/models/{bundle}.gltf
};
export type Catalog = { types: TypeDef[]; plans: Record<string, Plan>; contents: Record<string, Content> };

export async function loadCatalog(): Promise<Catalog> {
  const r = await fetch(`${import.meta.env.BASE_URL}data/catalog.json`);
  return r.json();
}

/** 설계 상태 — 시뮬레이터 화면에서 사용자가 고르는 것 전부 */
export type Design = {
  typeId: number;
  width: number;                 // 설치 공간 가로(mm)
  planId: number;
  doorColorId: number;           // 전체 도어 컬러
  slots: { slotSeq: number; bodyId: number; doorColorId: number | null; doors?: (number | null)[]; drawerColorId?: number | null; acc?: number[]; doorAcc?: (number[] | null)[] }[];   // acc = 그 칸에 놓은 수납 액세서리(상품 id) — 칸을 옮기면 같이 간다   // 배치 순서대로 (null = 전체 컬러 따름) · doors = 도어 한 짝씩 색(왼→오, null = 칸 색 따름)
  /** epMirrorL·R = 노출 EP 를 거울 EP 로(사용자 지시 2026-11-06 「거울 EP 로 할지 일반 EP 로 할지 교체 가능하게」) — 카탈로그에 거울 EP 상품이 없어 일반 EP 바깥 면에 거울을 덧댄다 */
  options: { epLeft: boolean; epRight: boolean; acc: boolean; epMirrorL?: boolean; epMirrorR?: boolean };
  space?: number;                // 설치 공간(장 벽 길이, mm) — 없으면 width. 방 출입문 자리를 빼고 남은 곳에 장(width)을 놓는다
  offset?: number;               // 설치 공간 안 장 왼쪽 끝(mm)
  run?: [number, number];        // 사용자가 고른 놓을 자리 [a, b](mm, 설치 공간 기준) — 사이즈 추천에서 설비를 피한 자리 · 가린 자리를 골랐을 때. 없으면 가장 긴 자리
  wear?: string;                 // 말로 배치에 쓴 문장 — 장 안 옷 구성(셔츠·정장·코트·니트·아이…)을 고른다(props.ts)
};

const SYNTH = 1_000_000;
/** 고른 조합 구성 id = PICK + 타입id×1e13 + 가로(mm)×1e8 + 폭별 칸 수(타입 몸통 폭 목록 순서로 한 자리씩) — 저장된 설계를 다시 열어도 같은 조합 */
const PICK = 1e15;
/** 양옆 써라운딩(마감) 한쪽 최대 폭(mm). 장 크기가 바뀌면 써라운딩부터 0~100 안에서 늘고 줄고, 넘으면 그때 장(몸통 조합)을 바꾼다(사용자 규칙) */
export const SIDE_MAX = 100;   // 계산 구성 id = SYNTH + 타입id×100000 + 가로(mm)

export class Planner {
  cat: Catalog;
  constructor(cat: Catalog) { this.cat = cat; }

  c(id: number): Content { return this.cat.contents[id]; }
  type(id: number): TypeDef { return this.cat.types.find(t => t.id === id)!; }
  plan(id: number): Plan {
    if (this.cat.plans[id]) return this.cat.plans[id];
    // 계산 구성 — id 에 타입·가로가 들어 있어 저장된 설계를 다시 열어도 같은 구성이 나온다
    if (id < SYNTH) return undefined as unknown as Plan;
    if (id >= PICK) {
      const r = id - PICK, typeId = Math.floor(r / 1e13), width = Math.floor((r % 1e13) / 1e8), code = String(Math.round(r % 1e8));
      if (!this.cat.types.some(t => t.id === typeId)) return null as unknown as Plan;
      const ws = this.slotPool(typeId).widths, digits = code.padStart(ws.length, '0').slice(-ws.length);
      return this.pickPlan(typeId, width, ws.flatMap((w, i) => Array(+digits[i]).fill(w))) as Plan;
    }
    const typeId = Math.floor((id - SYNTH) / 100000), width = (id - SYNTH) % 100000;
    return (this.cat.types.some(t => t.id === typeId) ? this.synthPlan(typeId, width) : null) as Plan;
  }

  /** 가로에 맞는 구성 — 한샘 구성표(2410~4200mm 등)에 있으면 그것, 없으면 몸통 폭을 조합해 계산(사용자 지시 2026-11-02 「크기 제한 풀어」) */
  planFor(typeId: number, width: number): Plan | null {
    const t = this.type(typeId);
    const ps = t.plans.map(id => this.cat.plans[id]);
    // 구성표도 양옆 써라운딩이 0~SIDE_MAX 안일 때만 — 넘으면 몸통을 다시 조합한다
    const sideOf = (p: Plan) => (width - p.slots.reduce((n, s) => n + (this.c(s.rep)?.w ?? s.w), 0)) / 2;
    return ps.find(p => width >= p.min && width <= p.max && sideOf(p) >= 0 && sideOf(p) <= SIDE_MAX) ?? this.synthPlan(typeId, width);
  }

  /** 이 타입 칸에 쓰는 몸통 폭(큰 순) — 계산 구성·고른 조합이 쓰는 목록 */
  bodyWidths(typeId: number): number[] { return this.slotPool(typeId).widths; }

  /** 이 타입으로 만들 수 있는 가장 작은 장(mm) — 가장 좁은 몸통 하나(써라운딩 0) */
  minWidth(typeId: number): number {
    return Math.min(...this.slotPool(typeId).widths);
  }

  /** 타입의 칸 정의를 자리(첫 칸·가운데·끝 칸)·폭별로 — 계산 구성에 쓴다 */
  private poolCache = new Map<number, { defs: Map<string, SlotDef>; widths: number[] }>();
  private slotPool(typeId: number) {
    let p = this.poolCache.get(typeId);
    if (!p) {
      const defs = new Map<string, SlotDef>();
      for (const pid of this.type(typeId).plans) {
        const sl = this.cat.plans[pid].slots;
        sl.forEach((s, i) => {
          if (!s.bodies.some(b => this.c(b.id)?.bundle)) return;
          const pos = i === 0 ? 'first' : i === sl.length - 1 ? 'last' : 'mid';
          if (!defs.has(`${pos}:${s.w}`)) defs.set(`${pos}:${s.w}`, s);
          if (!defs.has(`any:${s.w}`)) defs.set(`any:${s.w}`, s);
        });
      }
      const widths = [...new Set([...defs.values()].map(s => s.w))].sort((a, b) => b - a);
      p = { defs, widths };
      this.poolCache.set(typeId, p);
    }
    return p;
  }

  /** 구성표 밖 가로 → 몸통 폭 조합. 양옆 마감(써라운딩)이 0~SIDE_MAX 가 되는 합 중 몸통 합이 가장 큰 것(= 써라운딩이 가장 작은 것).
   *  한샘 구성표가 같은 규칙이다(예: 몸통 2400 구성 = 가로 2410~2600, 양옆 5~100). 좁은 몸통(800 미만, 예 500)은 구성표처럼 끝 칸에 하나까지만 */
  private synthCache = new Map<number, Plan | null>();
  private synthPlan(typeId: number, width: number): Plan | null {
    const id = SYNTH + typeId * 100000 + width;
    if (this.synthCache.has(id)) return this.synthCache.get(id)!;
    const { widths } = this.slotPool(typeId);
    const full = widths.filter(w => w >= 800), short = widths.filter(w => w < 800);
    const U = 50, maxU = Math.floor(width / U);
    // 넓은 몸통만으로 만들 수 있는 합 — 합마다 칸 수가 가장 적은 조합
    const best: (number[] | null)[] = Array(maxU + 1).fill(null); best[0] = [];
    for (let s = 1; s <= maxU; s++) for (const w of full) {
      const k = s - w / U; if (k < 0 || !best[k]) continue;
      if (!best[s] || best[k]!.length + 1 < best[s]!.length) best[s] = [...best[k]!, w];
    }
    let pick = null as number[] | null, score = Infinity;
    for (const [lo, hi] of [[0, SIDE_MAX]]) {
      for (let s = 0; s <= maxU; s++) {
        if (!best[s]) continue;
        for (const sw of [0, ...short]) {
          const ws = sw ? [...best[s]!, sw] : best[s]!;
          const sum = s * U + sw, side = (width - sum) / 2;
          if (!ws.length || side < lo || side > hi) continue;
          const sc = side + (sw ? 30 : 0) + ws.length * 3;
          if (sc < score) { score = sc; pick = ws; }
        }
      }
      if (pick) break;
    }
    if (!pick) { this.synthCache.set(id, null); return null; }
    const plan = this.buildPlan(typeId, width, pick, id);
    this.synthCache.set(id, plan);
    return plan;
  }
  /** 몸통 폭 목록 → 구성(넓은 몸통 큰 순, 좁은 몸통은 끝 칸). 써라운딩·EP·레일·포함 품목은 가까운 구성표에서 */
  private buildPlan(typeId: number, width: number, pick: number[], id: number): Plan {
    const t = this.type(typeId), { defs } = this.slotPool(typeId);
    const ws = [...pick.filter(w => w >= 800).sort((a, b) => b - a), ...pick.filter(w => w < 800)];
    const n = ws.length;
    const slots: SlotDef[] = ws.map((w, i) => {
      const pos = n === 1 || i === 0 ? 'first' : i === n - 1 ? 'last' : 'mid';
      const def = defs.get(`${pos}:${w}`) ?? defs.get(`any:${w}`)!;
      return { ...def, seq: i + 1 };
    });
    // 나머지(써라운딩·EP·걸레받이·레일·포함 품목)는 가장 가까운 구성표에서
    const ps = t.plans.map(pid => this.cat.plans[pid]);
    const base = ps.reduce((a, p) => (Math.abs(p.max - width) < Math.abs(a.max - width) ? p : a), ps[0]);
    return { ...base, id, typeId, min: width, max: width, side: Math.round((width - ws.reduce((a, b) => a + b, 0)) / 2), slots };
  }
  /** 사용자가 고른 몸통 조합 그대로의 구성(설치 가능 길이 계산 상자에서 고른 것 — 사용자 지시 2026-11-05). 써라운딩이 0~SIDE_MAX 밖이거나 표현할 수 없으면 null */
  private pickCache = new Map<number, Plan | null>();
  pickPlan(typeId: number, width: number, ws: number[]): Plan | null {
    const pool = this.slotPool(typeId).widths, cnt = pool.map(w => ws.filter(x => x === w).length);
    const side = (width - ws.reduce((a, b) => a + b, 0)) / 2;
    if (!ws.length || ws.some(w => !pool.includes(w)) || cnt.some(n => n > 9) || pool.length > 8 || side < 0 || side > SIDE_MAX) return null;
    const id = PICK + typeId * 1e13 + width * 1e8 + Number(cnt.join(''));
    if (this.pickCache.has(id)) return this.pickCache.get(id)!;
    const plan = this.buildPlan(typeId, width, ws, id);
    this.pickCache.set(id, plan);
    return plan;
  }
  /** 고른 몸통 조합으로 새 설계 */
  pickDesign(typeId: number, width: number, ws: number[], keep?: Design): Design | null {
    const p = this.pickPlan(typeId, width, ws);
    if (!p) return null;
    const t = this.type(typeId);
    const color = keep && t.doorColors.some(c => c.id === keep.doorColorId) ? keep.doorColorId : t.doorColors[0].id;
    return { typeId, width, planId: p.id, doorColorId: color, slots: p.slots.map(s => ({ slotSeq: s.seq, bodyId: s.rep, doorColorId: null })), options: keep?.options ?? { epLeft: false, epRight: false, acc: false } };
  }

  /** 타입·가로로 새 설계 (몸통은 대표 구성, 도어는 첫 컬러) */
  newDesign(typeId: number, width: number, keep?: Design): Design | null {
    const p = this.planFor(typeId, width);
    if (!p) return null;
    const t = this.type(typeId);
    const color = keep && t.doorColors.some(c => c.id === keep.doorColorId) ? keep.doorColorId : t.doorColors[0].id;
    return {
      typeId, width, planId: p.id, doorColorId: color,
      slots: p.slots.map(s => ({ slotSeq: s.seq, bodyId: s.rep, doorColorId: null })),
      options: keep?.options ?? { epLeft: false, epRight: false, acc: false },
    };
  }

  slotDef(d: Design, slotSeq: number): SlotDef { return this.plan(d.planId).slots.find(s => s.seq === slotSeq)!; }

  /** 이 타입이 가진 몸통 전부(모든 계획의 칸에서) — 몸통 id → 받는 도어·레일 자리. 모델(번들)이 있는 것만.
   *  칸 폭은 계획마다 정해져 있지만, 같은 타입의 다른 폭 몸통도 모델이 있으니 칸마다 골라 끼울 수 있다(사용자 지시 2026-10-30) */
  private entryCache = new Map<number, Map<number, { id: number; doors: number[]; doorLoc: string | null }>>();
  typeEntries(typeId: number) {
    let m = this.entryCache.get(typeId);
    if (!m) {
      m = new Map();
      for (const pid of this.type(typeId).plans) for (const sd of this.plan(pid).slots) for (const b of sd.bodies) {
        if (!this.c(b.id)?.bundle) continue;
        const e = m.get(b.id);
        if (!e) m.set(b.id, { id: b.id, doors: [...b.doors], doorLoc: sd.doorLoc });
        else for (const x of b.doors) if (!e.doors.includes(x)) e.doors.push(x);
      }
      this.entryCache.set(typeId, m);
    }
    return m;
  }
  /** 칸 몸통 항목 — 계획의 칸 정의에 없으면(다른 폭으로 바꾼 칸) 타입 전체에서 */
  private entry(d: Design, i: number, id: number) {
    const def = this.slotDef(d, d.slots[i].slotSeq);
    return def.bodies.find(b => b.id === id) ?? this.typeEntries(d.typeId).get(id) ?? null;
  }
  /** 이 칸에 고를 수 있는 폭 — 타입이 가진 몸통 폭 전부. fits = 바꿔도 설치 폭 안에 들어가나(양옆 마감 0~SIDE_MAX) */
  slotWidths(d: Design, i: number): { w: number; fits: boolean }[] {
    const cur = this.c(this.bodyFor(d, i).id).w, sum = this.layout(d).sum;
    const ws = [...new Set([...this.typeEntries(d.typeId).values()].map(e => this.c(e.id).w))].sort((a, b) => a - b);
    return ws.map(w => { const side = (d.width - (sum - cur + w)) / 2; return { w, fits: side >= 0 && side <= SIDE_MAX }; });
  }
  /** 이 폭의 몸통(이름마다 하나) — 칸 정의에 있는 것 먼저 */
  bodiesOfWidth(d: Design, i: number, w: number): number[] {
    const def = this.slotDef(d, d.slots[i].slotSeq), seen = new Set<string>(), out: number[] = [];
    for (const e of [...def.bodies, ...this.typeEntries(d.typeId).values()]) {
      const c = this.c(e.id); if (!c || c.w !== w || !c.bundle) continue;
      if (seen.has(c.name)) continue; seen.add(c.name); out.push(e.id);
    }
    return out;
  }

  /** 실제로 놓이는 몸통 — 외부서랍형·파우더형은 서랍 앞판 색마다 몸통이 따로 있다(같은 이름·폭, 받는 도어 컬러가 다름).
   *  원본 시뮬레이터처럼 도어 컬러를 바꾸면 그 색 도어를 받는 몸통으로 바꿔 끼운다 */
  bodyFor(d: Design, i: number): { id: number; doors: number[] } {
    const s = d.slots[i], def = this.slotDef(d, s.slotSeq);
    const body = this.entry(d, i, s.bodyId) ?? def.bodies[0];
    // 서랍 앞판 색을 따로 골랐으면 그 색 몸통(외부서랍형은 앞판 색마다 몸통이 따로 있다)
    const want = s.drawerColorId ?? s.doorColorId ?? d.doorColorId;
    const has = (b: { doors: number[] }) => b.doors.some(id => this.c(id)?.doorColorId === want);
    if (has(body)) return body;
    const me = this.c(body.id);
    const pool = [...def.bodies, ...this.typeEntries(d.typeId).values()];
    return pool.find(b => b.id !== body.id && has(b) && this.c(b.id).name === me.name && this.c(b.id).w === me.w) ?? body;
  }

  /** 몸통에 맞는 도어(왼쪽→오른쪽). 고른 컬러가 그 몸통에 없으면(예: 서랍형에 거울) 첫 컬러로 */
  doorsFor(d: Design, i: number): Content[] {
    const s = d.slots[i], def = this.slotDef(d, s.slotSeq);
    const all = this.doorPool(d, i);
    const want = s.doorColorId ?? d.doorColorId;
    const t = this.type(d.typeId);
    for (const cid of [want, ...t.doorColors.map(c => c.id)]) {
      let ds = all.filter(x => x.doorColorId === cid);
      // 레일 자리 — 다른 폭으로 바꾼 칸은 그 몸통이 원래 있던 칸의 자리
      const loc = def.bodies.some(b => b.id === s.bodyId) ? def.doorLoc : (this.typeEntries(d.typeId).get(s.bodyId)?.doorLoc ?? def.doorLoc);
      if (t.doorType === 'SLIDING') ds = ds.filter(x => this.slideMatch(x.loc, loc)).slice(0, 1);
      if (!ds.length) continue;
      ds.sort((a, b) => locOrder(a.loc) - locOrder(b.loc));
      // 도어 한 짝씩 고른 색 — 같은 자리(loc)에 그 색 도어가 있으면 바꿔 끼운다(같은 몸통의 색 변형 몸통 도어까지)
      s.doors?.forEach((c, k) => {
        if (c == null || !ds[k]) return;
        const alt = this.doorPool(d, i).find(x => x.doorColorId === c && x.loc === ds[k].loc);
        if (alt) ds[k] = alt;
      });
      return ds;
    }
    return [];
  }

  /** 이 칸 몸통(같은 이름·폭의 색 변형 포함)이 받는 도어 전부 — 도어 한 짝씩 색 고르기용 */
  doorPool(d: Design, i: number): Content[] {
    const s = d.slots[i], def = this.slotDef(d, s.slotSeq), me = this.c(s.bodyId);
    const seen = new Set<number>(), out: Content[] = [];
    for (const b of [...def.bodies, ...this.typeEntries(d.typeId).values()]) {
      if (this.c(b.id).name !== me.name || this.c(b.id).w !== me.w) continue;
      for (const id of b.doors) { if (seen.has(id)) continue; seen.add(id); const c = this.c(id); if (c) out.push(c); }
    }
    return out;
  }

  /** 슬라이딩: 칸의 레일 자리(안쪽 왼·오른, 바깥)와 같은 도어 */
  private slideMatch(doorLoc: string | null, slotLoc: string | null): boolean {
    return !slotLoc || doorLoc === slotLoc;
  }

  /** 도어 컬러 → 써라운딩(색 이름이 가장 많이 겹치는 것) */
  surroundFor(d: Design, surType: 'SIDE' | 'TOP', w?: number): Content | null {
    const p = this.plan(d.planId), t = this.type(d.typeId);
    const col = t.doorColors.find(c => c.id === d.doorColorId && !c.mirror) ?? t.doorColors.find(c => !c.mirror)!;
    const words = `${col.lineup} ${col.name}`.split(/[\s_]+/).filter(Boolean);
    const list = p.surroundings.map(id => this.c(id)).filter(c => c.surType === surType && (w == null || c.w === w));
    const score = (c: Content) => words.reduce((n, wd) => n + (c.name.includes(wd) ? 1 : 0), 0) + (t.doorType === 'SLIDING' === c.name.includes('SL') ? 0.5 : 0);
    return list.sort((a, b) => score(b) - score(a))[0] ?? null;
  }

  /** 몸통 합 · 양쪽 써라운딩 폭 */
  layout(d: Design) {
    const bodies = d.slots.map((_, i) => this.c(this.bodyFor(d, i).id));
    const sum = bodies.reduce((n, b) => n + b.w, 0);
    const side = Math.max(0, (d.width - sum) / 2);
    return { bodies, sum, side };
  }

  /** 견적 — 시뮬레이터 총 구매가와 같은 규칙(판매가+시공비, 써라운딩 측부 2·상부·걸레받이는 2400mm 단위) */
  quote(d: Design) {
    const p = this.plan(d.planId), lines: { name: string; qty: number; unit: number }[] = [];
    const add = (c: Content | null | undefined, qty = 1) => { if (c && qty > 0) lines.push({ name: c.name, qty, unit: c.price }); };
    const { side } = this.layout(d);
    d.slots.forEach((_, i) => { add(this.c(this.bodyFor(d, i).id)); this.doorsFor(d, i).forEach(x => add(x)); });
    add(this.surroundFor(d, 'SIDE', side <= 100 ? 100 : 200), 2);   // 써라운딩은 SIDE_MAX(100) 안이라 측부 100 규격
    add(this.surroundFor(d, 'TOP'), Math.ceil(d.width / 2400));
    const bb = this.c(this.type(d.typeId).baseboard) ?? this.c(p.baseboards[0]);
    add(bb, Math.ceil(d.width / 2400));
    if (p.rails.length) add(this.c(p.rails[0]), Math.floor(d.slots.length / 2));
    p.included.forEach(x => add(this.c(x.id), x.qty));
    const panel = (loc: string) => p.panels.map(id => this.c(id)).find(c => c.panelLoc === loc);
    if (d.options.epLeft) add(panel('LEFT'));
    if (d.options.epRight) add(panel('RIGHT'));
    // 수납 액세서리 — 칸마다 놓은 것(사용자 지시 2026-11-09 「ACC 도 장·도어를 고르면 목록 · 고르면 배치」). 예전 설계의 전체 ACC 세트(options.acc)는 칸에 놓은 것이 없을 때만
    const accs = d.slots.flatMap(s => [...(s.acc ?? []), ...(s.doorAcc ?? []).flatMap(x => x ?? [])]);   // 칸 · 도어(doorAcc[도어 순번])
    if (accs.length) accs.forEach(id => add(this.c(id))); else if (d.options.acc) add(this.c(p.accessories[0]));
    const total = lines.reduce((n, l) => n + l.qty * l.unit, 0);
    return { lines, total };
  }

  /** 몸통 카테고리 (몸통 탭 목록 묶음) */
  bodyCategory(name: string): string {
    if (name.includes('파우더')) return '파우더형';
    if (name.includes('외부서랍')) return '서랍형';
    if (name.includes('내부서랍') || name.includes('T서랍') || name.includes('멀티서랍')) return '내부서랍형';   // 멀티서랍 = 도어 안쪽
    if (name.includes('행거')) return '행거형';
    if (name.includes('바지걸이')) return '바지걸이형';
    if (name.includes('이불')) return '이불수납형';
    if (name.includes('선반')) return '선반형';
    return '기타';
  }
}

function locOrder(loc: string | null): number {
  return { LEFT: 0, IN_LEFT: 0, OUT: 1, RIGHT: 2, IN_RIGHT: 2 }[loc ?? ''] ?? 1;
}

export const won = (n: number) => n.toLocaleString('ko-KR');
