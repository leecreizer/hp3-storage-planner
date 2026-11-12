// 붙박이장 셀프 플래너 (웹) — store.hanssem.com/storage-simulator 기능 재현 + 해 방향 · 실사 렌더
import './defaults';   // 처음 여는 사람의 기본 상태 — 다른 모듈이 저장소를 읽기 전에
import { ACC_INFO, onWardHvReady } from './props';
import './style.css';
import * as THREE from 'three';
import { loadCatalog, Planner, won, SIDE_MAX, type Design, type DoorColor, type TypeDef } from './catalog';
import { buildWardrobe, preload, setDoorOpen, type Built } from './model';
import { ROOM_STYLES, type RoomStyle, hvRoomInfo, coreBox, type HvRoomInfo, type HvMove } from './furnish';
import { FIT_CAT_KO, FIT_ITEMS, fitReport, type FitRoom, type Rect } from './furnfit';
import { CEILING_LIGHTS, DOOR_H, FIXTURE_SPEC, fixtureSize, ROOM_D, ROOM_H, ROOM_LAYOUTS, Stage, WINDOW_DEFAULT, type FixtureKind, type RoomFixture, type RoomWindow, type CeilingLight, type RenderMode, type RoomDoor, type RoomLayout, type RoomLight, type Sun, type SurfaceKind } from './scene';
import { POST_DEFAULTS, type PostSettings } from './render/raster';
import { AUTO_TIER, GPU_NAME, PROFILES, QUALITY_FORCED, qualityChoice, setQualityChoice, type QualityChoice } from './quality';
import { arrange } from './arrange';
import { roomGateOpen } from './loadgate';
import { loadBegin, loadClear, loadContext, loadDownload, loadCount, loadEndAfterFrame, loadKind, loadMark, loadReport } from './loadlog';

const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
const h = (tag: string, cls = '', html = '') => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
const img = (src: string | null | undefined) => !src ? '' : src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src}`;

const cat = await loadCatalog();
const pl = new Planner(cat);
(window as any).__pl = pl;   // 시험 도구용

const stage = new Stage($('#viewport'));
// 조명 패널 값(해 · 실내 조명 · 환경광 · 노출 · 그림자) — 다시 열어도 그대로(사용자 지시 2026-11-03 「모든 값들을 저장」).
// 바꿀 때마다(0.3초 모아서) 저장한다. 슬라이더·프리셋·색 고르기가 모두 이 세 함수를 거친다
const LIGHT_KEY = 'storage-planner.light.v1';
try {
  const v = JSON.parse(localStorage.getItem(LIGHT_KEY) ?? 'null');
  if (v?.sun) stage.setSun(v.sun);
  if (v?.room) stage.setRoomLight(v.room);
  if (v?.shadow) stage.setShadow(v.shadow);
} catch { /* 처음 · 저장소 없음 */ }
{
  let t = 0;
  const save = () => { clearTimeout(t); t = window.setTimeout(() => { try { localStorage.setItem(LIGHT_KEY, JSON.stringify({ sun: stage.sunCfg, room: stage.roomCfg, shadow: stage.shadowCfg })); } catch { /* 이번 화면엔 반영 */ } }, 300); };
  for (const k of ['setSun', 'setRoomLight', 'setShadow'] as const) {
    const f = (stage[k] as (p: object) => void).bind(stage);
    (stage as any)[k] = (p: object) => { f(p); save(); };
  }
}
const LAYOUT_KEY = 'storage-planner.layout';
try { const l = localStorage.getItem(LAYOUT_KEY) as RoomLayout | null; if (l && ROOM_LAYOUTS.some(x => x.id === l)) stage.layout = l; } catch { /* 저장소 없으면 기본 */ }
// 방 크기(mm)·장 설치 벽 — 기본 = 홈뷰 84A 방 크기(안방 3640×4960, 셋째 방 2970×3500, 둘째 방 2700×3500, 높이 2400)
// 사용자가 직접 고치기 전까지는 방 공간을 바꾸면 그 방 기본 크기로(사용자 지시 2026-10-30)
type WardWall = 'back' | 'left' | 'right' | 'front';
const ROOMDIM_KEY = 'storage-planner.roomdims.v1';
const STYLE_DIMS: Record<string, [number, number]> = { master: [3640, 4960], baby: [2970, 3500], student: [2970, 3500], adult: [2970, 3500], 'dress-builtin': [2700, 3500], 'dress-system': [2700, 3500], 'dress-mixed': [2700, 3500] };
let roomDims: { w: number; d: number; h: number; wall: WardWall; custom: boolean } = { w: 3640, d: 4960, h: 2400, wall: 'back', custom: false };
try { const v = JSON.parse(localStorage.getItem(ROOMDIM_KEY) ?? 'null'); if (v && v.w > 0 && v.d > 0 && v.h > 0) roomDims = { ...roomDims, ...v }; } catch { /* 기본 84A 안방 */ }
// 방마다 크기·장 벽·장 놓음을 기억한다 — 방 공간을 다시 고르거나 다른 방에 갔다 와도 고친 그대로(사용자 지시 2026-11-03 「위치 수정하면 저장」)
// 옮긴 가구는 장 벽별로 저장되므로, 벽이 기본으로 돌아가면 옮긴 것이 사라진 것처럼 보였다
const PLAN_KEY = 'storage-planner.hvplan.v1';
// 장 설계(몸통·칸·도어·ACC·자리)와 공간 구조도 방마다 — 예전엔 설계가 하나라 방을 바꿔도 같은 크기·같은 자리로 놓였다(사용자 지적 2026-11-10)
let hvPlans: Record<string, { dims: typeof roomDims; ward: boolean; design?: Design; layout?: RoomLayout; split?: number; avoid?: boolean }> = {};
try { hvPlans = JSON.parse(localStorage.getItem(PLAN_KEY) ?? '{}') ?? {}; } catch { /* 처음 */ }
let planHold = false;                  // 방 공간을 바꾸는 중 — 이전 방 값이 새 방 이름으로 저장되지 않게
const savePlan = () => {
  if (planHold || !hvRoom) return;
  hvPlans[stage.roomStyle] = { dims: { ...roomDims }, ward: wardShown, design: design ? structuredClone(design) : undefined, layout: stage.layout, split: gapSplit, avoid: avoidPref ?? undefined };
  try { localStorage.setItem(PLAN_KEY, JSON.stringify(hvPlans)); } catch { /* 이번 화면엔 반영 */ }
};
const saveRoomDims = () => { try { localStorage.setItem(ROOMDIM_KEY, JSON.stringify(roomDims)); } catch { /* 이번 화면엔 반영 */ } savePlan(); };
/** 장을 놓는 벽 길이 · 그 벽에서 맞은편까지 깊이(mm) */
const wallLen = () => (roomDims.wall === 'back' || roomDims.wall === 'front' ? roomDims.w : roomDims.d);
const roomDepth = () => (roomDims.wall === 'back' || roomDims.wall === 'front' ? roomDims.d : roomDims.w);
let gapSplit = 0.5;                    // 양쪽 오픈일 때 왼쪽 몫
/** 3D 화면에서 고른 것 — 방문·창·가구 묶음 */
let picked: 'door' | 'window' | 'furn' | 'fix' | 'curtain' | null = null;
// ---- 설비(콘센트 · 통신단자함 · 벽걸이 에어컨) — 사용자 지시 2026-11-06 「붙박이장이 콘센트·단자함을 가리는지, 에어컨과 간섭하는지 생각해야 —
// 소품으로 달아 두고 없으면 빼면 된다」. 장과 겹치면 경고만 한다(사용자 결정 — 장 자리·추천은 바꾸지 않는다)
const FIX_KEY = 'storage-planner.fixtures.v1';
let selFix: string | null = null;          // 고른 설비
let fixWarnEl: HTMLElement | null = null;  // 장 크기 패널의 설비 경고 자리
let fitEl: HTMLElement | null = null;      // 장 크기 패널의 배치 가능 가구 자리
let fitShow = (() => { try { return localStorage.getItem('storage-planner.fitshow') === '1'; } catch { return false; } })();
let fixtures: RoomFixture[] = loadFixtures();
/** 장 벽 콘센트·통신단자함 — 가리고 놓기(false) / 피해서 놓기(true). 장 자리 계산(wardrobeSpot · wallCapacity)이 같이 쓴다(사용자 지시 2026-11-06) */
// 설비 피하기 — avoidPref = 사이즈 추천에서 사용자가 고른 값(null = 자동: 피해서 장이 들어가면 피하고, 안 들어가면 가린다).
// 방문·설비가 바뀌면 자동으로 돌아간다(사용자 지시 2026-11-10 「도어·몰딩·설비 위치가 바뀌면 배치 가능 길이도 바뀌면서 알아서 배치 가능한 장으로」).
// wardAvoidFix = 지금 장 자리에 쓰는 값(fitToSpace 가 정한다)
const AVOID_KEY = 'storage-planner.avoidfix';
let avoidPref: boolean | null = (() => { try { const v = localStorage.getItem(AVOID_KEY); return v == null ? null : v === '1'; } catch { return null; } })();
let wardAvoidFix = avoidPref ?? true;
let blocksKey = '';                         // 장 벽 설비 자리 — 바뀌었을 때만 장을 다시 잡는다
const setAvoidPref = (v: boolean | null) => { avoidPref = v; try { if (v == null) localStorage.removeItem(AVOID_KEY); else localStorage.setItem(AVOID_KEY, v ? '1' : '0'); } catch { /* 이번 화면엔 반영 */ } };
stage.setRoomDims(roomDepth() / 1000, roomDims.h / 1000);
stage.fixtures = fixtures; stage.fixAuto = fixAutoAtLoad();
const STYLE_KEY = 'storage-planner.roomstyle';
// ---- 방 먼저 · 장은 나중(사용자 지시 2026-11-02 「방을 소품하고 먼저 불러오고, 장 벽을 정한 뒤 크기를 넣으면 보여 주자」)
// 홈뷰 원본 방(크기·가구·창)을 그대로 불러오고, 고른 벽(roomDims.wall)이 장 벽이 되게 방을 통째로 돌린다. 장은 크기 「적용」 뒤에 놓는다
let hvRoom: HvRoomInfo | null = null;
let wardShown = true;                  // 저장된 설계로 다시 열면 장을 바로 보인다. 방 공간을 고르면 숨긴다
const WALL2HV: Record<WardWall, 'B' | 'F' | 'L' | 'R'> = { back: 'B', front: 'F', left: 'L', right: 'R' };
const HV2WALL: Record<'B' | 'F' | 'L' | 'R', WardWall> = { B: 'back', F: 'front', L: 'left', R: 'right' };
/** 홈뷰 벽 → 장 기준 축(u = 장 벽 따라, v = 장 벽에서 방 안쪽) — 회전만(반전 없음) */
const HV_AXES: Record<'B' | 'F' | 'L' | 'R', [[number, number], [number, number]]> = { B: [[1, 0], [0, 1]], F: [[-1, 0], [0, -1]], L: [[0, -1], [1, 0]], R: [[0, 1], [-1, 0]] };
// 사용자가 옮긴 가구 묶음 · 창(스타일·장 벽별) — 다시 열어도 그대로
// v2 — 묶음을 가구 하나씩으로 나누며 묶음 열쇠가 바뀌었다(2026-11-03). v1 이동은 다른 가구에 붙어 버려 새로 시작한다
const MOVES_KEY = 'storage-planner.hvmoves.v2', USERWIN_KEY = 'storage-planner.hvwin.v1';
try { stage.hvMoves = JSON.parse(localStorage.getItem(MOVES_KEY) ?? '{}') ?? {}; } catch { /* 처음 */ }
let userWin: Record<string, { winWall: 'left' | 'right' | 'front'; win: RoomWindow }> = {};
try { userWin = JSON.parse(localStorage.getItem(USERWIN_KEY) ?? '{}') ?? {}; } catch { /* 처음 */ }
const saveMoves = () => { try { localStorage.setItem(MOVES_KEY, JSON.stringify(stage.hvMoves)); } catch { /* 이번 화면엔 그대로 */ } };
const USERDOOR_KEY = 'storage-planner.hvdoor.v1';
let userDoor: Record<string, RoomDoor | null> = {};
try { userDoor = JSON.parse(localStorage.getItem(USERDOOR_KEY) ?? '{}') ?? {}; } catch { /* 처음 */ }
const saveUserWin = () => { try { localStorage.setItem(USERWIN_KEY, JSON.stringify(userWin)); } catch { /* 이번 화면엔 그대로 */ } };
const winKey = () => `${stage.roomStyle}|${roomDims.wall}`;
/** 장 벽을 이 벽으로 하면 창은 장 기준 어느 벽인가(창 벽 자체면 null — 장을 놓을 수 없다) */
function winWallFor(w: WardWall): 'left' | 'right' | 'front' | null {
  if (!hvRoom?.win) return 'right';
  const [u, v] = HV_AXES[WALL2HV[w]], n = ({ B: [0, -1], F: [0, 1], L: [-1, 0], R: [1, 0] } as const)[hvRoom.win.wall];
  const nu = n[0] * u[0] + n[1] * u[1], nv = n[0] * v[0] + n[1] * v[1];
  return nu > 0.5 ? 'right' : nu < -0.5 ? 'left' : nv > 0.5 ? 'front' : null;
}
/** 지금 방 크기·장 벽으로 장면 계획 — 창 자리(창 벽 좌표 t)는 홈뷰 창 가운데를 돌려 잰다(방 크기를 바꾸면 비율로) */
function roomPlan() {
  const uw = userWin[winKey()];
  if (uw) return { winWall: uw.winWall, hvWall: hvRoom && winWallFor(roomDims.wall) ? WALL2HV[roomDims.wall] : null, win: uw.win, wardHidden: !wardShown };
  const ww = winWallFor(roomDims.wall);
  if (!hvRoom?.win || !ww) return { winWall: 'right' as const, hvWall: hvRoom && ww ? WALL2HV[roomDims.wall] : null, wardHidden: !wardShown };
  const [fx0, fx1, fz0, fz1] = hvRoom.floor, w = hvRoom.win;
  const [u, v] = HV_AXES[WALL2HV[roomDims.wall]];
  const corners = [[fx0, fz0], [fx1, fz0], [fx0, fz1], [fx1, fz1]];
  const U = (p: number[]) => p[0] * u[0] + p[1] * u[1], V = (p: number[]) => p[0] * v[0] + p[1] * v[1];
  const tu = -Math.min(...corners.map(U)), tv = -Math.min(...corners.map(V));
  const Wh = Math.max(...corners.map(U)) + tu, Dh = Math.max(...corners.map(V)) + tv;
  const P = w.wall === 'B' ? [w.c, fz0] : w.wall === 'F' ? [w.c, fz1] : w.wall === 'L' ? [fx0, w.c] : [fx1, w.c];
  const Wo = wallLen() / 1000, Do = roomDepth() / 1000;
  const uc = (U(P) + tu) * Wo / Wh, vc = (V(P) + tv) * Do / Dh;
  const along = ww === 'right' ? vc : ww === 'left' ? Do - vc : Wo - uc;
  return { winWall: ww, hvWall: WALL2HV[roomDims.wall], win: { t: along - w.w / 2, w: w.w, h: w.h, sill: w.sill }, wardHidden: !wardShown };
}
/** 홈뷰 원본 방문 → 장 기준 방문(벽·t) — 장 벽을 바꾸면 문도 같이 돈다(방 크기를 바꾸면 비율로) */
function hvDoor(): RoomDoor | null {
  const dr = hvRoom?.door; if (!hvRoom || !dr) return null;
  const [fx0, fx1, fz0, fz1] = hvRoom.floor;
  const [u, v] = HV_AXES[WALL2HV[roomDims.wall]];
  const corners = [[fx0, fz0], [fx1, fz0], [fx0, fz1], [fx1, fz1]];
  const U = (p: number[]) => p[0] * u[0] + p[1] * u[1], V = (p: number[]) => p[0] * v[0] + p[1] * v[1];
  const tu = -Math.min(...corners.map(U)), tv = -Math.min(...corners.map(V));
  const Wh = Math.max(...corners.map(U)) + tu, Dh = Math.max(...corners.map(V)) + tv;
  const Wo = wallLen() / 1000, Do = roomDepth() / 1000;
  const ends = dr.wall === 'B' ? [[dr.a, fz0], [dr.b, fz0]] : dr.wall === 'F' ? [[dr.a, fz1], [dr.b, fz1]] : dr.wall === 'L' ? [[fx0, dr.a], [fx0, dr.b]] : [[fx1, dr.a], [fx1, dr.b]];
  const n = ({ B: [0, -1], F: [0, 1], L: [-1, 0], R: [1, 0] } as const)[dr.wall];
  const nu = n[0] * u[0] + n[1] * u[1], nv = n[0] * v[0] + n[1] * v[1];
  const wall: RoomDoor['wall'] = nu > 0.5 ? 'right' : nu < -0.5 ? 'left' : nv > 0.5 ? 'front' : 'back';
  const us = ends.map(p => (U(p) + tu) * Wo / Wh), vs = ends.map(p => (V(p) + tv) * Do / Dh);
  const [a, b] = wall === 'back' || wall === 'front' ? [Math.min(...us), Math.max(...us)] : [Math.min(...vs), Math.max(...vs)];
  return { wall, t: a, w: b - a, hinge: roomDoor?.hinge ?? 'L', h: Math.min(dr.h, roomDims.h / 1000 - 0.12) };
}
/** 장면 계획 + 홈뷰 방문 함께 */
function applyPlan() {
  const k = winKey(), d = k in userDoor ? userDoor[k] : hvDoor();   // 사용자가 고친 방문이 먼저
  if (k in userDoor && !d) { roomDoor = null; saveDoor(); stage.setDoor(null); }
  if (d) { roomDoor = d; saveDoor(); stage.setDoor(roomDoor); }
  stage.setRoomPlan(roomPlan());
}
/** 방 공간을 고르면 — 홈뷰 원본 크기·기본 장 벽으로, 장은 숨긴다 */
async function loadHvRoom(style: RoomStyle, fresh: boolean) {
  hvRoom = await hvRoomInfo(style);
  const saved = hvPlans[style];            // 다시 열 때(새로고침 포함)도 장을 숨겨 둔 그대로
  planHold = false;
  if (hvRoom && saved) { roomDims = { ...saved.dims }; wardShown = saved.ward; saveRoomDims(); }   // 이 방에서 고친 그대로
  else if (hvRoom && fresh) {
    const [fx0, fx1, fz0, fz1] = hvRoom.floor;
    roomDims = { ...roomDims, w: Math.round((fx1 - fx0) * 1000), d: Math.round((fz1 - fz0) * 1000), h: 2400, wall: HV2WALL[hvRoom.defWall ?? 'B'], custom: false };
    saveRoomDims();
    wardShown = false;
  }
  if (hvRoom && !winWallFor(roomDims.wall)) roomDims = { ...roomDims, wall: HV2WALL[hvRoom.defWall ?? 'B'] };
  // 이 방에서 짠 장이 있으면 그대로, 처음 여는 방이면 지금 타입으로 그 방 벽에 꽉 채워 새로 짠다(크기·자리를 이전 방에서 끌고 오지 않는다)
  const sd = saved?.design && validDesign(saved.design) ? structuredClone(saved.design) : null;
  const setLay = (l: RoomLayout) => { if (stage.layout !== l) stage.setLayout(l); try { localStorage.setItem(LAYOUT_KEY, l); } catch { /* 이번 화면엔 반영 */ } };
  if (sd) {
    design = sd; setLay(saved!.layout ?? 'fit'); gapSplit = saved!.split ?? 0.5;
    setAvoidPref(saved!.avoid ?? null);
    selSlot = 0; syncEP(); saveDesign();
  } else if (fresh && design) {
    const t = pl.type(design.typeId), w = Math.max(pl.minWidth(t.id), wallLen());
    design = { ...(autoDesign(design.typeId, w, design) ?? pl.newDesign(design.typeId, w, design))!, space: undefined, offset: 0, run: undefined, wear: design.wear };
    setLay('fit'); gapSplit = 0.5; selSlot = 0; syncEP(); saveDesign();
  }
  // 홈뷰 방은 열 때마다 원본 방문 자리로 — 예전 기본 방문(맞은편 벽)이 남아 창과 같은 벽에 붙어 있었다(사용자 지적 2026-11-02)
  if (hvRoom) applyPlan(); else stage.setRoomPlan(roomPlan());
  applyRoom(!fresh && !!sd && stage.fixAuto); renderPanel(); drawOverlay(); savePlan();
}

try { const v = localStorage.getItem(STYLE_KEY) as RoomStyle | null; if (v && ROOM_STYLES.some(x => x.id === v)) stage.roomStyle = v; } catch { /* 기본 안방 */ }
const OPENW_KEY = 'storage-planner.openw';
try { const o = JSON.parse(localStorage.getItem(OPENW_KEY) ?? 'null'); if (o && o.L > 0 && o.R > 0) stage.openW = { L: o.L, R: o.R }; } catch { /* 기본 1.5m */ }
(window as any).__stage = stage;   // 콘솔·시험 도구용
(window as any).__fit = () => ({ room: fitRoom(), rep: fitReport(fitRoom()) });   // 시험 도구용 — 배치 가능 가구 계산
let design: Design | null = null;
let built: Built | null = null;
let tab = 'door' as 'door' | 'body';
let step: 'design' | 'options' = 'design';
let selSlot = 0;
let doorOpen = 0, doorTarget = 0;
/** 장 문이 다 닫혔고(몸통 탭은 도어를 숨겨 안이 보인다) 소품 칸이 모두 가려지면 장 안 소품을 숨긴다 */
const cullProps = () => stage.cullWardProps(!!built?.propsCovered && doorOpen === 0 && tab !== 'body');
let showDims = false;                    // 보기 「재질+라인+사이즈」
let hoverDoor: { slot: number; door: number; obj: THREE.Object3D } | null = null;     // 도어 탭에서 마우스가 올라간 도어 한 짝·서랍(door = -1)

// ---------- 타입 선택
function openTypeModal() {
  const m = $('#type-modal'); m.hidden = false;
  const list = $('#type-list'); list.innerHTML = '';
  let pick = design?.typeId ?? 9;
  const groups = [...new Set(cat.types.map(t => t.group))];
  for (const g of groups) {
    const ts = cat.types.filter(t => t.group === g);
    list.append(h('p', 'type-group', ts[0].groupDesc));
    const row = h('div', 'type-row');
    ts.forEach(t => {
      const b = h('button', 'type-card' + (t.id === pick ? ' on' : ''), `<img src="${img(t.image)}" alt=""><span>${t.name}</span>`);
      b.onclick = () => { pick = t.id; list.querySelectorAll('.type-card').forEach(x => x.classList.remove('on')); b.classList.add('on'); };
      row.append(b);
    });
    list.append(row);
  }
  $('#type-ok').onclick = () => {
    loadMark('장 타입 확인');
    const t = pl.type(pick);
    const space = design?.space ?? design?.width ?? 3100;
    const w = Math.max(pl.minWidth(t.id), space);   // 구성표 범위(2410~4200) 밖도 몸통 조합으로 계산된다
    design = (autoDesign(pick, w, design ?? undefined) ?? pl.newDesign(pick, w, design ?? undefined))!;
    design.space = w;
    syncEP();
    selSlot = 0; step = 'design'; tab = 'door'; doorTarget = 0;
    m.hidden = true; fitToSpace(true);
  };
  $('#type-close').onclick = () => { if (design) m.hidden = true; };
}

// ---------- 설계 저장·불러오기 — 새로고침·코드 반영(HMR)으로 페이지가 다시 열려도 하던 설계 그대로(사용자 요청 2026-10-29)
const DESIGN_KEY = 'storage-planner.design.v1';
function saveDesign() {
  try { if (design) localStorage.setItem(DESIGN_KEY, JSON.stringify(design)); } catch { /* 저장 못 해도 이번 화면엔 그대로 */ }
  savePlan();
}
/** 카탈로그가 바뀌어 없는 타입·계획·몸통이면 못 쓴다 */
function validDesign(d: Design | null): d is Design {
  if (!d || !cat.types.some(t => t.id === d.typeId) || !pl.plan(d.planId)) return false;
  return !d.slots.some(s => !pl.plan(d.planId).slots.some(x => x.seq === s.slotSeq) || !pl.typeEntries(d.typeId).has(s.bodyId) && !pl.plan(d.planId).slots.some(x => x.seq === s.slotSeq && x.bodies.some(b => b.id === s.bodyId)));
}
function loadDesign(): Design | null {
  try {
    const d = JSON.parse(localStorage.getItem(DESIGN_KEY) || 'null') as Design | null;
    return validDesign(d) ? d : null;
  } catch { return null; }
}

// ---------- 3D 다시 만들기 (원본 모델 glTF 를 받아 조립 — 늦게 끝난 이전 조립은 버린다)
let buildSeq = 0;
/** 시점 단추 — 지금 시점만 검게 */
// 툴바 아이콘은 세부 메뉴가 열린 동안만 검게(사용자 지시 2026-11-09 「아이콘을 눌러 세부 메뉴가 나타나야 검은색」) — 시점·도어·전체 화면처럼 메뉴가 없는 단추는 칠하지 않는다
function markView(_k: 'persp' | 'front') { $('#v-front').classList.remove('on'); }   // 3D 단추는 뺐다(사용자 지시 2026-11-09 「2D·3D 전환 기능이 없어 3D 아이콘 제거」)
/** quick = 칸 고르기·순서 바꾸기 — 장 자리가 그대로면 방·라이트맵을 다시 만들지 않는다(Stage.setWardrobe) */
async function rebuild(resetView = false, quick = false, why = quick ? '칸 고르기·순서' : '장 설계 변경') {
  if (!design) return;
  // 기록(loadlog) — 장만 바뀌면 이 건으로 끝나고, 장 자리·폭이 바뀌어 방을 다시 지으면 Stage.buildRoom 이 「재구성」으로 바꾼다
  loadBegin('장 바꾸기', `${why} · 폭 ${design.width} · 공간 ${design.space ?? design.width}`);
  const seq = ++buildSeq;
  const b = await buildWardrobe(pl, design, { lift: wardSlot != null && wardOpen() ? wardSlot : undefined });
  if (seq !== buildSeq) return;
  loadMark('장 모델 다 옴');
  built = b;
  // 놓을 자리가 없어진 칸 액세서리는 뺀다 — 트레이를 넣은 뒤 몸통을 서랍형으로 바꾸면 체크·가격만 남고 모델은 안 보였다(사용자 지적 2026-11-09).
  // 칸 메뉴에는 「이 칸엔 ○○이 없어요」로 흐리게 남는다
  let dropped = false;
  design.slots.forEach((s, i) => {
    const fit = b.slots[i]?.group.userData.fit as Record<string, boolean> | undefined;
    if (!fit || !s.acc?.length) return;
    const keep = s.acc.filter(id => fit[ACC_INFO[pl.c(id)?.code ?? '']?.kind ?? ''] !== false);
    if (keep.length !== s.acc.length) { s.acc = keep; dropped = true; }
  });
  if (dropped) render();
  saveDesign();
  hoverDoor = null;                        // 이전 장의 도어·서랍을 가리키지 않게
  stage.setWardrobe(built, (design.offset ?? 0) / 1000, (design.space ?? design.width) / 1000, quick);
  if (loadKind() === '장 바꾸기') { loadMark('장 놓음'); loadEndAfterFrame('장 그림(방 그대로)', '장 바꾸기'); }
  setDoorOpen(built, doorOpen, doorsHidden()); cullProps();
  refreshFixWarn(); refreshFit();
  if (resetView) { stage.view('persp'); markView('persp'); }
  drawOverlay();
  applyLift();
  // 칸 메뉴가 열려 있으면 새 몸통 기준으로 다시 — 몸통을 바꾸면 메뉴가 조립 전 장(예전 몸통)의 선반으로 액세서리 가능 여부를 보여 줬다
  const wp = $('#door-pop');
  if (wardSlot != null && !wp.hidden && wp.dataset.kind === 'slot') { const top = wp.scrollTop; renderWardPop(); wp.scrollTop = top; }
  preloadPlan();
  // 실사(① MuTracer · ⑤ 경로 추적) 미리 준비는 하지 않는다 — GPU 셰이더 컴파일이 GPU 를 붙잡아 실시간 화면이 수 초씩 멈췄다
  // (사용자 지시 2026-11-03 「GPU 쓰는 건 렌더링 모드가 바뀔 때」). 실사를 처음 고를 때 준비한다
}
// 홈뷰 장 소품(뒤에서 받는 중)이 다 오면 장 안만 다시 채운다 — 장 자리는 그대로라 방·라이트맵은 두고
onWardHvReady(() => { if (built) void rebuild(false, true, '장 안 의류 도착'); });
let prewarmed = false;
/** 지금 계획에서 고를 수 있는 몸통·도어 모델을 미리 받아 둔다 */
function preloadPlan() {
  if (!design) return;
  // 덮개가 떠 있는 동안(처음 열기·방 재구성)은 미룬다 — 몸통·도어 167개(16MB)가 방 짓기와 다퉜다(실측 2026-11-09)
  // 방 가구·소품을 처음 다 받기 전에도 미룬다(loadgate — 받는 순서 공간 → 장 → 가구 → 소품 → 미리 받기)
  if (stage.isBusy || !roomGateOpen()) { setTimeout(preloadPlan, 1500); return; }
  const p = pl.plan(design.planId);
  preload(p.slots.flatMap(s => s.bodies.flatMap(b => [pl.c(b.id), ...b.doors.map(id => pl.c(id))])));
}

function drawOverlay() {
  if (stage.curtainPicked !== (picked === 'curtain')) stage.markCurtain(picked === 'curtain');   // 다른 것을 고르면 커튼 테두리를 끈다
  stage.showDoorZone(picked === 'door');
  stage.markOpening(picked === 'door' && roomDoor ? 'door' : picked === 'window' ? 'window' : null);   // 고른 방문·창에 파란 테두리   // 방문 열림 자리(파란 부채꼴)는 방문을 골랐을 때만(사용자 지시 2026-11-05)
  if (!built || !design) return;
  stage.clearOverlay();
  // 규격 치수 — 보기 「재질+라인+사이즈」에서만(사용자 지시 2026-10-29). 도어·몸통 탭 모두
  if (showDims) {
    const H = 2.4, z = built.frontZ + 0.04;
    stage.dimLine(new THREE.Vector3(0, H + 0.12, z), new THREE.Vector3(built.width, H + 0.12, z), `${design.width}`);
    const xs = [0, built.sides, ...built.slots.map(s => s.x1), built.width];
    for (let i = 0; i < xs.length - 1; i++) {
      const w = Math.round((xs[i + 1] - xs[i]) * 1000);
      if (w > 0) stage.dimLine(new THREE.Vector3(xs[i], H + 0.03, z), new THREE.Vector3(xs[i + 1], H + 0.03, z), `${w}`);
    }
    stage.dimLine(new THREE.Vector3(-0.08, 0, z), new THREE.Vector3(-0.08, H, z), '2400');
    gapDims(H + 0.12, z);
    const S = design.space ?? design.width;
    if (S !== design.width) {
      const off = (design.offset ?? 0) / 1000;
      stage.dimLine(new THREE.Vector3(-off, H + 0.22, z), new THREE.Vector3(S / 1000 - off, H + 0.22, z), `설치 공간 ${S}`);
    }
  }
  if (roomDoor && !roomDoorPop.hidden) drawDoorDims();
  if (!windowPop.hidden) drawWindowDims();
  if (tab === 'body') {
    const s = built.slots[selSlot];
    if (s) stage.selectBox(s.x0, s.x1, 0.03, 2.2);
    // 칸 선택 점은 뺐다(사용자 지시 2026-11-09 「장에 표시되는 점 UI 제거」) — 칸은 장을 직접 눌러 고른다(3D 클릭 · pickSlot)
  } else if (hoverDoor) {
    // 도어 탭 — 점 대신 도어를 한 짝씩 직접 누른다. 마우스가 올라간 도어를 테두리로
    const o = hoverDoor.door < 0 ? hoverDoor.obj : doorObj(hoverDoor.slot, hoverDoor.door);
    if (o?.parent) stage.outline(o);
  }
  // 고른 칸(도어 열림) — 끄는 중이면 상자가 마우스를 따라가고, 놓일 칸에 옅은 상자
  // 고른 칸(튀어나온 칸) · 도어 메뉴의 도어 — 선 테두리
  const dp = $('#door-pop'), marks: THREE.Object3D[] = [];
  if (wardSlot != null && wardOpen() && built.slots[wardSlot]) marks.push(built.slots[wardSlot].group);
  if (selDoor && !dp.hidden && dp.dataset.kind === 'door') {
    const o = selDoor.door >= 0 ? doorObj(selDoor.slot, selDoor.door) : built.doors.find(p => p.slot === selDoor!.slot && p.kind === 'DRAWER')?.obj ?? null;
    if (o) marks.push(o);
  }
  stage.markPicked(marks);
  stage.markDirty(true);
}

/** 지금 화면의 i번째 칸 k번째 도어 물체 */
/** 도어 메뉴가 가리키는 도어(서랍 = -1) — 메뉴가 떠 있는 동안 테두리 */
let selDoor: { slot: number; door: number } | null = null;
function doorObj(i: number, k: number): THREE.Object3D | null {
  let hit: THREE.Object3D | null = null;
  built?.slots[i]?.group.traverse(o => { if (!hit && o.userData.doorRoot && o.userData.door === k) hit = o; });
  return hit;
}

/** 칸 i 에 놓을 수 있는 수납 액세서리 목록 — 칸 메뉴 · 도어 메뉴(사용자 지시 2026-11-09 「ACC 도 장이나 도어가 선택되면 설치 가능한 리스트, 고르면 배치」).
 *  이 타입 계획이 파는 것만. 그 칸에 자리가 없으면(트레이 = 선반 · 스카프걸이 = 옷걸이 봉) 흐리게. 누르면 놓고 · 다시 누르면 뺀다 */
function accSection(pop: HTMLElement, i: number, after: () => void, door?: number) {
  if (!design || !built) return;
  const d = design, s = d.slots[i], ids = [...new Set(pl.plan(d.planId).accessories)].filter(id => ACC_INFO[pl.c(id)?.code ?? '']?.on === (door == null ? 'slot' : 'door'));
  if (!ids.length) return;
  const fit = (built.slots[i]?.group.userData.fit ?? {}) as Record<string, boolean>;
  pop.append(h('div', 'pop-sub', '수납 액세서리'));
  ids.forEach(id => {
    const c = pl.c(id), info = ACC_INFO[c.code ?? '']!;
    const list = () => door == null ? (s.acc ?? []) : (s.doorAcc?.[door] ?? []);
    const on = list().includes(id), ok = on || (door == null ? !!fit[info.kind] : pl.type(d.typeId).doorType !== 'SLIDING');
    const cap = door == null ? (built!.slots[i]?.group.userData.trayCap as Record<string, number> | undefined)?.[info.kind] : undefined;
    const part = ok && cap != null && cap > 0 && cap < 4 ? `<br><small class="acc-no">4개 중 ${cap}개만 들어가요(선반이 모자라요)</small>` : '';
    const b = h('button', 'pop-item' + (on ? ' on' : ''), `<img src="${img(c.detailImg ?? c.thumb)}" alt=""><span>${info.name}${ok ? part : `<br><small class="acc-no">이 칸엔 ${info.need}이 없어요</small>`}</span><small>${on ? '빼기' : '+' + won(c.price) + '원'}</small>`) as HTMLButtonElement;
    b.disabled = !ok;
    b.onclick = () => {
      // 트레이 대·소는 한 칸에 하나만(같은 선반 자리)
      const kinds = (x: number) => ACC_INFO[pl.c(x)?.code ?? '']?.kind;
      const tray = (k?: string) => k === 'trayL' || k === 'trayS';
      const next = on ? list().filter(x => x !== id) : [...list().filter(x => !(tray(info.kind) && tray(kinds(x)))), id];
      if (door == null) s.acc = next; else { (s.doorAcc ??= [])[door] = next; }
      void rebuild(false, true).then(after); render();
    };
    b.oncontextmenu = e => { e.preventDefault(); showDetail(info.name, [img(c.detailImg ?? c.thumb)]); };
    pop.append(b);
  });
}

// ---------- 도어 한 짝씩 바꾸기 (3D 화면에서 도어를 직접 누른다)
let doorScope: 'one' | 'all' = 'one';      // 도어 메뉴에서 색을 바꿀 범위 — 선택한 도어만 / 전체 교체
function openDoorPicker(i: number, k: number) {
  if (!design) return;
  const t = pl.type(design.typeId), s = design.slots[i];
  const cur = pl.doorsFor(design, i)[k];
  if (!cur) return;
  const side = cur.loc === 'LEFT' || cur.loc === 'IN_LEFT' ? '왼쪽 ' : cur.loc === 'RIGHT' || cur.loc === 'IN_RIGHT' ? '오른쪽 ' : '';
  unpickWard(); selDoor = { slot: i, door: k };
  const pop = $('#door-pop'); pop.hidden = false; pop.innerHTML = ''; pop.dataset.kind = 'door';
  pop.append(h('div', 'pop-title', `${i + 1}번째 칸 ${side}도어`));
  // 같은 자리(loc)에 끼울 수 있는 도어 색 — 같은 몸통의 색 변형(서랍 앞판 색별 몸통)이 받는 도어까지
  const avail = new Set(pl.doorPool(design, i).filter(x => x.loc === cur.loc).map(x => x.doorColorId));
  // 바꿀 범위 — 선택한 도어만 / 전체 교체(사용자 지시 2026-11-09 「도어는 전체 교체랑 선택한 도어만 교체되도록」).
  // 예전엔 「전체 도어와 같게」·「모든 도어 한 번에」 두 목록이 같은 일을 해 헷갈렸다 — 범위 하나를 고르고 색 목록은 하나
  const seg = h('div', 'pop-row');
  for (const [v, label] of [['one', '선택한 도어만'], ['all', '전체 교체']] as const) {
    const b = h('button', 'btn-gray' + (doorScope === v ? ' on' : ''), label);
    b.onclick = () => { doorScope = v; openDoorPicker(i, k); };
    seg.append(b);
  }
  pop.append(seg);
  // 선택한 도어만 — 칸·전체 색과 같은 색을 고르면 따름(null)으로 둬, 나중에 전체 교체하면 같이 바뀐다
  const inherit = s.doorColorId ?? design.doorColorId, eff = s.doors?.[k] ?? inherit;
  const allSame = design.slots.every(x => x.doorColorId == null && !x.doors?.some(v => v != null));
  const one = doorScope === 'one';
  (one ? t.doorColors.filter(c => avail.has(c.id)) : t.doorColors).forEach(c => {
    const on = one ? eff === c.id : allSame && design!.doorColorId === c.id;
    const b = h('button', 'pop-item' + (on ? ' on' : ''), `<img src="${img(c.image)}" alt=""><span>${c.lineup} ${c.name}</span><small>상세</small>`);
    b.onclick = () => {
      if (one) (s.doors ??= [])[k] = c.id === inherit ? null : c.id;
      else { design!.doorColorId = c.id; design!.slots.forEach(x => { x.doorColorId = null; x.doors = undefined; }); }
      // 다시 지은 뒤 메뉴를 다시 열어 체크·외곽선이 새 도어를 가리키게
      void rebuild().then(() => openDoorPicker(i, k)); render();
    };
    b.querySelector('small')!.addEventListener('click', e => { e.stopPropagation(); showDetail(`${c.lineup} ${c.name}`, c.images.map(img)); });
    pop.append(b);
  });
  accSection(pop, i, () => { if (!pop.hidden && pop.dataset.kind === 'door') openDoorPicker(i, k); }, k);
  const close = h('button', 'pop-close', '닫기'); close.onclick = () => (pop.hidden = true); pop.append(close);
}

/** 서랍 바꾸기 — 앞판 색(외부서랍형은 앞판 색마다 몸통이 따로) · 서랍 구성(1·2·3단, 슬림, 멀티) */
function openDrawerPicker(i: number) {
  if (!design) return;
  const d = design, t = pl.type(d.typeId), s = d.slots[i], def = pl.slotDef(d, s.slotSeq);
  const me = pl.c(pl.bodyFor(d, i).id);
  unpickWard(); selDoor = { slot: i, door: -1 };
  const pop = $('#door-pop'); pop.hidden = false; pop.innerHTML = ''; pop.dataset.kind = 'door';
  pop.append(h('div', 'pop-title', `${i + 1}번째 칸 서랍 · ${me.name}`));
  // 앞판 색 — 같은 이름·폭 몸통 변형마다 받는 도어 색이 곧 서랍 앞판 색
  const pool = [...def.bodies, ...pl.typeEntries(d.typeId).values()];   // 다른 폭으로 바꾼 칸 — 타입 전체 몸통에서
  const variants = pool.filter((b, k) => pool.findIndex(x => x.id === b.id) === k && pl.c(b.id).name === me.name && pl.c(b.id).w === me.w);
  const colorIds = [...new Set(variants.flatMap(b => b.doors.map(id => pl.c(id)?.doorColorId)))].filter((x): x is number => x != null);
  if (variants.length > 1 && colorIds.length > 1) {
    pop.append(h('div', 'pop-sub', '서랍 앞판 색'));
    const opts: (DoorColor | null)[] = [null, ...t.doorColors.filter(c => colorIds.includes(c.id))];
    opts.forEach(c => {
      const on = (s.drawerColorId ?? null) === (c?.id ?? null);
      const b = h('button', 'pop-item' + (on ? ' on' : ''), c ? `<img src="${img(c.image)}" alt=""><span>${c.lineup} ${c.name}</span>` : '<span class="same">도어 색과 같게</span>');
      b.onclick = () => { s.drawerColorId = c?.id ?? null; pop.hidden = true; rebuild(); render(); };
      pop.append(b);
    });
  }
  // 서랍 구성 — 이 칸에서 고를 수 있는 서랍 몸통(이름·폭마다 하나)
  const seen = new Set<string>();
  const kinds = pool.filter(b => {
    const c = pl.c(b.id), k = c.name + '|' + c.w;
    if (c.w !== me.w || !/서랍|파우더/.test(c.name) || seen.has(k)) return false;
    seen.add(k); return true;
  });
  if (kinds.length > 1) {
    pop.append(h('div', 'pop-sub', '서랍 구성'));
    kinds.forEach(b => {
      const c = pl.c(b.id), on = c.name === me.name && c.w === me.w, diff = c.price - me.price;
      const btn = h('button', 'pop-item' + (on ? ' on' : ''), `<img src="${img(c.thumb)}" alt=""><span>${c.name}</span><small>${diff === 0 ? '' : (diff > 0 ? '+' : '') + won(diff) + '원'}</small>`);
      btn.onclick = () => { s.bodyId = b.id; pop.hidden = true; rebuild(); render(); };
      pop.append(btn);
    });
  }
  const close = h('button', 'pop-close', '닫기'); close.onclick = () => (pop.hidden = true); pop.append(close);
}

// ---------- 오른쪽 패널
function render() { renderPanel(); }
function renderPanel() {
  if (!design) return;
  const t = pl.type(design.typeId);
  const q = pl.quote(design);
  const p = $('#panel'); p.innerHTML = '';
  p.append(h('h1', '', '붙박이장 셀프 플래너'));
  const head = h('div', 'type-head', `<span>${t.name}</span>`);
  const re = h('button', 'btn-line', '↻ 다시 선택'); re.onclick = openTypeModal; head.append(re); p.append(head);

  // 방 공간 — 설치 공간 위, 공간 구조와 같은 카드 형식(사용자 지시 2026-10-30: 혼자 다른 메뉴 형식이었다)
  p.append(h('h2', '', '방 공간을 선택해주세요.'));
  const sty = h('div', 'layout-row style-row');
  ROOM_STYLES.forEach(rs => {
    const label = rs.group ? `${rs.group}<br>${rs.name}` : rs.name;
    const b = h('button', 'layout-card' + (stage.roomStyle === rs.id ? ' on' : ''), `${styleIcon(rs.id)}<span>${label}</span>`) as HTMLButtonElement;
    b.title = rs.desc;
    b.onclick = () => {
      if (stage.roomStyle === rs.id) return;
      savePlan();                          // 떠나는 방의 장 설계 · 자리를 그 방 이름으로
      planHold = true;
      unpickWard(); $('#door-pop').hidden = true; selSlot = 0;
      stage.setRoomStyle(rs.id); try { localStorage.setItem(STYLE_KEY, rs.id); } catch { /* 이번 화면엔 반영 */ }
      if (!roomDims.custom) { const [w, d] = STYLE_DIMS[rs.id] ?? [3640, 4960]; roomDims = { ...roomDims, w, d, h: 2400 }; saveRoomDims(); applyRoom(); }
      void loadHvRoom(rs.id, true);       // 홈뷰 원본 방이 있으면 그 크기·벽으로 다시(장은 숨김)
      renderPanel();
    };
    sty.append(b);
  });
  p.append(sty);
  const curSt = ROOM_STYLES.find(x => x.id === stage.roomStyle);
  if (curSt) p.append(h('p', 'hint', curSt.desc));
  // 뺀 가구 — 하나씩 되살린다(사용자 질문 2026-11-03 「뺀 가구는 어떻게 되살리지?」)
  delBox = h('div', 'del-box'); renderDelBox(); p.append(delBox);
  // 방 크기 — 가로 · 세로 · 높이(mm). 고치면 그 값을 계속 쓴다(방 공간을 바꿔도 기본 크기로 되돌리지 않음)
  p.append(h('h2', '', '방 크기를 입력해주세요.'));
  const dimRow = h('div', 'dim-row');
  const dimIn = (label: string, key: 'w' | 'd' | 'h', min: number, max: number) => {
    const lab = h('label', '', `<span>${label}</span>`);
    const i = h('input') as HTMLInputElement; i.type = 'number'; i.step = '10'; i.value = String(roomDims[key]); i.min = String(min); i.max = String(max);
    const ok = () => {
      const v = Math.round(+i.value);
      if (!(v >= min && v <= max)) { alert(`${label}는 ${min}~${max}mm 로 입력해 주세요.`); i.value = String(roomDims[key]); return; }
      if (v === roomDims[key]) return;
      roomDims = { ...roomDims, [key]: v, custom: true }; saveRoomDims(); applyPlan(); applyRoom(); renderPanel();
    };
    i.onchange = ok; i.onkeydown = e => { if (e.key === 'Enter') ok(); };
    lab.append(i, h('small', '', 'mm')); dimRow.append(lab);
  };
  dimIn('가로', 'w', 1800, 30000); dimIn('세로', 'd', 1800, 30000); dimIn('높이', 'h', 2400, 2800);
  p.append(dimRow);
  // 설치할 벽 — 그 벽 길이가 장을 놓을 수 있는 최대 폭
  p.append(h('h2', '', '설치할 벽면을 선택해주세요.'));
  const wallRow = h('div', 'layout-row wall-row');
  ([['back', '정면 벽'], ['left', '왼쪽 벽'], ['right', '오른쪽 벽'], ['front', '뒤쪽 벽']] as [WardWall, string][]).forEach(([w, name]) => {
    const len = w === 'back' || w === 'front' ? roomDims.w : roomDims.d;
    const isWin = !winWallFor(w);         // 홈뷰 원본 방의 창 벽 — 장을 놓을 수 없다
    const b = h('button', 'layout-card' + (roomDims.wall === w ? ' on' : ''), `${wallIcon(w)}<span>${name}<br><small>${isWin ? '창 있는 벽' : `${len}mm`}</small></span>`) as HTMLButtonElement;
    if (isWin) b.toggleAttribute('disabled', true);
    b.onclick = () => { if (roomDims.wall === w || isWin) return; if (design) design.run = undefined; roomDims = { ...roomDims, wall: w }; saveRoomDims(); applyPlan(); applyRoom(); renderPanel(); };
    wallRow.append(b);
  });
  p.append(wallRow);
  // 공간 구조 — 설치할 벽면 바로 아래(사용자 지시 2026-11-09)
  p.append(h('h2', '', '공간 구조를 선택해주세요.'));
  const lay = h('div', 'layout-row');
  ROOM_LAYOUTS.forEach(l => {
    const b = h('button', 'layout-card' + (stage.layout === l.id ? ' on' : ''), `${layoutIcon(l.id)}<span>${l.name}</span>`);
    b.onclick = () => {
      stage.setLayout(l.id);
      try { localStorage.setItem(LAYOUT_KEY, l.id); } catch { /* 이번 화면엔 반영된다 */ }
      if (l.id === 'openBoth') gapSplit = 0.5;
      syncEP(); fitToSpace(true);
    };
    lay.append(b);
  });
  p.append(lay);
  p.append(h('p', 'hint', '열린 쪽 옆면에는 엔드판넬(EP)이 자동으로 붙습니다.'));
  p.append(capBox(t));
  // 장 크기 — 구성표(2410~4200mm) 밖도 몸통 폭을 조합해 계산해 놓는다(사용자 지시 2026-11-02 「크기 제한 풀어」).
  // 벽보다 크면 그 벽을 장 크기만큼 늘리고, 벽보다 작은데 「꽉 채우기」면 남는 자리를 오른쪽으로 연다(입력값이 벽 길이로 덮이지 않게)
  const minW = pl.minWidth(t.id);
  p.append(h('h2', '', '장 크기를 입력해주세요.'));
  const row = h('div', 'size-row');
  const inp = h('input') as HTMLInputElement; inp.type = 'number'; inp.value = String(design.space ?? design.width); inp.min = String(minW);
  const unit = h('span', 'unit', 'mm');
  const apply = h('button', 'btn-gray', '적용');
  const warn = h('p', 'hint size-warn'); warn.hidden = true;
  const check = () => {
    const w = Math.round(+inp.value);
    const msg = !(w >= minW) ? `${t.name}은(는) 가장 좁은 칸 하나만 놓아도 ${minW}mm 이상이에요.` : '';
    warn.textContent = msg; warn.hidden = !msg; inp.classList.toggle('bad', !!msg); apply.toggleAttribute('disabled', !!msg);
    return !msg;
  };
  inp.oninput = check;
  apply.onclick = () => {
    if (!check()) return;
    if (!wardShown) { wardShown = true; stage.setRoomPlan(roomPlan()); savePlan(); }   // 장 벽·크기를 정했으니 장을 놓는다
    const w = Math.round(+inp.value), Lw = wallLen();
    design!.space = w; design!.run = undefined; selSlot = 0;
    const lay: RoomLayout = w >= Lw ? 'fit' : stage.layout === 'fit' ? 'openR' : stage.layout;
    if (lay !== stage.layout) { stage.setLayout(lay); try { localStorage.setItem(LAYOUT_KEY, lay); } catch { /* 이번 화면엔 반영 */ } syncEP(); }
    if (w > Lw) {
      roomDims = { ...roomDims, [roomDims.wall === 'back' || roomDims.wall === 'front' ? 'w' : 'd']: w, custom: true };
      saveRoomDims(); applyRoom(); renderPanel();
    } else fitToSpace(true);
  };
  inp.onkeydown = e => { if (e.key === 'Enter') apply.click(); };
  row.append(inp, unit, apply); p.append(row, warn);
  recBox = h('div', 'rec-box'); renderRecBox(); p.append(recBox);
  if (!wardShown) p.append(h('p', 'hint door-note', '장 벽과 크기를 정하고 「적용」을 누르면 장이 놓여요. 장과 장 앞 통로에 걸리는 가구는 빠져요.'));
  p.append(h('p', 'hint', `${minW}mm 이상 · 넣은 크기에 맞춰 칸 폭을 계산해 놓아요. 설치할 벽(${wallLen()}mm)보다 크면 벽을 늘리고, 작으면 남는 자리는 아래 공간 구조로 정해요.`));
  if ((design.space ?? design.width) !== design.width) p.append(h('p', 'hint door-note', `설치 공간 ${design.space}mm 중 방문이 열리는 자리를 빼고 장 ${design.width}mm 를 놓았어요.`));
  if (doorNote) p.append(h('p', 'hint door-warn', doorNote));
  fixWarnEl = h('div', 'fix-warn'); p.append(fixWarnEl); refreshFixWarn();
  p.append(h('h2', '', '배치 가능 가구'));
  fitEl = h('div', 'rec-box fit-box'); p.append(fitEl); refreshFit();


  // 도어 색 · 몸통 고르기는 오른쪽 패널에서 뺐다 — 장을 누르면 뜨는 장 메뉴(왼쪽 위)에서(사용자 지시 2026-11-09 「오른쪽은 공간·크기·스타일·가격 위주,
  // 나머지는 장을 누르면 장 메뉴에서 — 아이콘 메뉴처럼 독립된 메뉴로」). 도어가 닫혀 있으면 도어를 눌러 도어 메뉴, 열려 있으면 칸을 눌러 칸 메뉴
  // 도어 스타일 — 모든 도어 한 번에(스타일은 오른쪽, 사용자 지시 2026-11-09). 한 짝씩은 3D 에서 그 도어를 눌러
  p.append(h('h2', '', '도어 스타일'));
  const allSame = design.slots.every(x => x.doorColorId == null && !x.doors?.some(v => v != null));
  const dg = h('div', 'surf-grid door-style');
  t.doorColors.forEach(c => {
    const on = allSame && design!.doorColorId === c.id;
    const b = h('button', 'surf-card' + (on ? ' on' : ''), `<img src="${img(c.image)}" alt=""><span>${c.name}</span>`) as HTMLButtonElement;
    b.title = `${c.lineup} ${c.name} — 모든 도어를 이 색으로`;
    b.onclick = () => { design!.doorColorId = c.id; design!.slots.forEach(x => { x.doorColorId = null; x.doors = undefined; }); if ($('#door-pop').dataset.kind === 'door') $('#door-pop').hidden = true; rebuild(); render(); };
    b.oncontextmenu = e => { e.preventDefault(); showDetail(`${c.lineup} ${c.name}`, c.images.map(img)); };
    dg.append(b);
  });
  p.append(dg);
  if (!allSame) p.append(h('p', 'hint', '도어마다 색이 달라요 — 위 색을 누르면 모든 도어가 그 색으로 맞춰져요.'));
  p.append(h('p', 'hint door-note', '도어 한 짝만 바꾸려면 3D 화면에서 그 도어를, 칸(몸통)은 도어를 열고 칸을 누르면 메뉴가 떠요.'));
  // 「다음」(추가 옵션) 단계는 없앴다(사용자 지시 2026-11-09) — 액세서리는 칸·도어 메뉴에서, EP 일반/거울은 3D 에서 EP 를 눌러
  p.append(footer(q.total, [['견적 보기', showQuote, 'btn-black']]));
}

/** 장 ↔ 좌우 벽 빈 공간 치수(입력 가능) — 「재질+라인+사이즈」(사용자 지시 2026-10-30).
 *  입력값 = 장 옆면에서 그 쪽 벽까지. 설치 공간 안 남는 자리보다 크면 그 쪽 벽을 그만큼 밀어(공간 구조 「오픈」) 방이 넓어지고,
 *  0 이면 벽이 장에 붙는다(그 쪽 닫힘). 남는 자리보다 작게 넣으면 설치 공간을 줄인다 */
function gapDims(y: number, z: number) {
  if (!built || !design) return;
  const off = (design.offset ?? 0) / 1000, S = (design.space ?? design.width) / 1000, w = built.width;
  const wl = stage.rx0 - off, wr = stage.rx1 - off;       // 편집 표시는 장 왼쪽 끝이 0
  for (const side of ['L', 'R'] as const) {
    const a = side === 'L' ? wl : w, b = side === 'L' ? 0 : wr, gap = Math.max(0, b - a);
    if (gap > 0.005) stage.dimLine(new THREE.Vector3(a, y, z), new THREE.Vector3(b, y, z), '');
    // 입력칸은 장 옆 30cm 안쪽에 — 가운데 두면 넓은 빈 공간에선 정면 화면 밖으로 나갔다
    const lx = side === 'L' ? -Math.max(0.15, Math.min(gap / 2, 0.3)) : w + Math.max(0.15, Math.min(gap / 2, 0.3));
    const el = stage.label('', new THREE.Vector3(lx, y + 0.05, z), 'dim dim-edit');
    const inp = document.createElement('input'); inp.type = 'number'; inp.step = '10'; inp.min = '0';
    inp.value = String(Math.round(gap * 1000)); inp.title = side === 'L' ? '왼쪽 벽까지 빈 공간(mm)' : '오른쪽 벽까지 빈 공간(mm)';
    const apply = () => {
      // 방 가로(벽 길이)는 그대로 — 이쪽 빈 자리를 v 로, 장 크기를 그만큼 줄이거나 늘린다
      const v = +inp.value / 1000; if (!(v >= 0)) return;
      const Lw = wallLen() / 1000;
      const gL = side === 'L' ? v : stage.openW.L, gR = side === 'R' ? v : stage.openW.R;
      const sp = Math.round((Lw - gL - gR) * 1000), tt = pl.type(design!.typeId);
      if (sp < pl.minWidth(tt.id)) { alert(`빈 자리를 빼면 장이 ${sp}mm 라 ${tt.name}(최소 ${pl.minWidth(tt.id)}mm)이 들어가지 않아요.`); return; }
      design!.space = sp;
      const lay: RoomLayout = gL >= 0.05 && gR >= 0.05 ? 'openBoth' : gL >= 0.05 ? 'openL' : gR >= 0.05 ? 'openR' : 'fit';
      if (lay === 'openBoth') gapSplit = gL / (gL + gR);
      try { localStorage.setItem(LAYOUT_KEY, lay); } catch { /* 이번 화면엔 반영 */ }
      stage.setLayout(lay); syncEP(); fitToSpace(); renderPanel();
    };
    inp.onchange = apply; inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') apply(); };
    inp.onpointerdown = e => e.stopPropagation();
    el.append(inp);
    if (side === 'L') el.prepend(document.createTextNode('◀벽 ')); else el.append(document.createTextNode(' 벽▶'));
  }
}

/** 엔드판넬(EP)은 공간 구조를 따른다 — 열린 쪽 옆면에만 붙인다(벽에 붙은 쪽은 안 보이므로 뺀다).
 *  추가 옵션 단계에서는 고르지 않는다(사용자 지시 2026-10-29) */
/** EP 두께(mm) — 이 장 구성의 엔드판넬 */
function epThick() {
  const p = design ? pl.plan(design.planId) : null;
  return p?.panels.map(id => pl.c(id)).find(c => c?.panelLoc === 'LEFT')?.d ?? 18;
}
/** 써라운딩이 EP 보다 얇거나 없다 — EP 가 장 폭 바깥에 붙는다(model.ts) */
const epOutside = () => !!design && pl.layout(design).side < epThick();
function syncEP() {
  if (!design) return;
  const L = stage.layout, S = design.space ?? design.width;
  // 써라운딩이 빠지면(EP 두께보다 얇으면) 벽이 있어도 양옆에 EP — 몸통 옆면 재질이 그대로 드러나고, 벽에 바로 붙은 도어는 열 때 벽에 걸린다
  // (사용자 지시 2026-11-12 「서라운딩이 빠지면 무조건 EP라도 — 벽이 있어도 조화를 위해, EP 가 없으면 도어 열림에도 벽과 간섭」).
  // EP 는 장 폭 바깥이라 벽 쪽이면 그만큼 띄운다(공간 안에서 자리가 될 때 — 안 되면 fitToSpace 가 장 폭을 줄인다)
  const out = epOutside(), ep = epThick();
  const wallL = !(L === 'openL' || L === 'openBoth'), wallR = !(L === 'openR' || L === 'openBoth');
  if (out) {
    let o = design.offset ?? 0;
    if (wallR && o + design.width > S - ep) o = S - ep - design.width;
    if (wallL && o < ep) o = ep;
    if (o + design.width <= S - (wallR ? ep : 0) + 0.5) design.offset = o;
  }
  const off = design.offset ?? 0;
  // 열린 구조뿐 아니라 꽉 채우기여도 옆이 벽이 아니면 EP(사용자 지적 2026-11-06 「최대 크기로 놓기 하니 EP 가 빠진다 — 옆 공간이 벽이 아니면 EP」).
  // 방문·콘센트를 피해 놓으면 장 한쪽이 벽에서 떨어진다 — 5mm 넘게 떨어진 쪽
  design.options.epLeft = out || !wallL || off > 5;
  design.options.epRight = out || !wallR || off + design.width < S - 5;
}

/** 설치할 벽 그림 — 위에서 본 방, 고른 벽에 장(회색 띠) */
function wallIcon(w: WardWall) {
  const bar = { back: 'x="6" y="6" width="40" height="7"', front: 'x="6" y="29" width="40" height="7"', left: 'x="6" y="6" width="7" height="30"', right: 'x="39" y="6" width="7" height="30"' }[w];
  return `<svg viewBox="0 0 52 40" width="52" height="40" aria-hidden="true"><rect x="6" y="6" width="40" height="30" fill="#f4f4f2"/><rect ${bar} fill="#bbb"/><rect x="6" y="6" width="40" height="30" fill="none" stroke="#333" stroke-width="2.5"/></svg>`;
}
/** 공간 구조 평면 그림 — 위에서 본 방(벽 = 진한 선), 붙박이장 = 회색 상자 */
/** 방 공간 그림 — 공간 구조 그림과 같은 평면(위에서 본 방, 장 = 회색 띠) 위에 그 방의 대표 가구 */
function styleIcon(id: RoomStyle) {
  const f = '#c9c3b8', s = '#333';
  const furn: Record<RoomStyle, string> = {
    master: `<rect x="17" y="22" width="20" height="14" rx="1.5" fill="${f}"/><rect x="18.5" y="31" width="7.5" height="4" rx="1" fill="#fff"/><rect x="28" y="31" width="7.5" height="4" rx="1" fill="#fff"/><rect x="11" y="31" width="5" height="5" fill="${f}"/><rect x="38" y="31" width="5" height="5" fill="${f}"/>`,
    baby: `<rect x="16" y="25" width="22" height="11" rx="2" fill="none" stroke="${s}" stroke-width="1.6"/><circle cx="22" cy="21" r="2.4" fill="${f}"/><circle cx="29" cy="20" r="1.8" fill="${f}"/>`,
    student: `<rect x="26" y="24" width="11" height="12" rx="1" fill="${f}"/><rect x="27.5" y="32" width="8" height="3" rx="1" fill="#fff"/><rect x="8" y="18" width="5" height="12" fill="${s}"/><circle cx="16" cy="24" r="2" fill="${f}"/>`,
    adult: `<rect x="25" y="23" width="13" height="13" rx="1" fill="${f}"/><rect x="26.5" y="32" width="10" height="3" rx="1" fill="#fff"/><rect x="39" y="31" width="4" height="5" fill="${f}"/><rect x="8" y="18" width="5" height="14" fill="#9a7b5b"/><circle cx="16" cy="25" r="2" fill="${s}"/>`,
    'dress-builtin': `<rect x="20" y="22" width="14" height="6" rx="1" fill="${f}"/><rect x="38" y="31" width="7" height="5" fill="${f}"/>`,
    'dress-system': `<rect x="11" y="31" width="32" height="5" fill="${f}"/><path d="M15 31v5M21 31v5M27 31v5M33 31v5M39 31v5" stroke="#fff" stroke-width="1"/><rect x="8" y="18" width="4" height="12" fill="${f}"/><rect x="21" y="21" width="12" height="5" rx="1" fill="${f}"/>`,
    'dress-mixed': `<rect x="11" y="31" width="20" height="5" fill="${f}"/><path d="M16 31v5M21 31v5M26 31v5" stroke="#fff" stroke-width="1"/><rect x="8" y="19" width="4" height="9" fill="${f}"/><rect x="20" y="21" width="12" height="5" rx="1" fill="${f}"/>`,
  };
  return `<svg viewBox="0 0 52 40" width="52" height="40" aria-hidden="true">
    <rect x="6" y="6" width="40" height="30" fill="#f4f4f2"/>
    <rect x="6" y="6" width="40" height="7" fill="#bbb"/>
    ${furn[id]}
    <path d="M6 36V6H46V36" fill="none" stroke="${s}" stroke-width="2.5"/>
  </svg>`;
}

function layoutIcon(id: RoomLayout) {
  const L = id === 'openL' || id === 'openBoth' ? 14 : 0, R = id === 'openR' || id === 'openBoth' ? 14 : 0;
  const x0 = 6, x1 = x0 + L + 40 + R, wx = x0 + L;
  return `<svg viewBox="0 0 ${x1 + 6} 40" width="${x1 + 6}" height="40" aria-hidden="true">
    <rect x="${x0}" y="6" width="${x1 - x0}" height="30" fill="#f4f4f2"/>
    <rect x="${wx}" y="6" width="40" height="9" fill="#bbb"/>
    <path d="M${x0} 36V6H${x1}V36" fill="none" stroke="#333" stroke-width="2.5"/>
  </svg>`;
}

function footer(total: number, btns: [string, () => void, string][]) {
  const f = h('div', 'footer', `<div class="total"><span>총 구매가</span><b>${won(total)}<small>원</small></b></div>`);
  const r = h('div', 'footer-btns');
  btns.forEach(([t, fn, cls]) => { const b = h('button', cls, t); b.onclick = fn; r.append(b); });
  f.append(r); return f;
}

function showQuote() {
  const q = pl.quote(design!), t = pl.type(design!.typeId);
  const rows = q.lines.map(l => `<tr><td>${l.name}</td><td>${l.qty}</td><td>${won(l.unit)}</td><td>${won(l.unit * l.qty)}</td></tr>`).join('');
  showModal(`${t.name} · ${design!.width}mm 견적`, `<table class="quote"><thead><tr><th>품목</th><th>수량</th><th>단가</th><th>금액</th></tr></thead><tbody>${rows}</tbody>
    <tfoot><tr><td colspan="3">총 구매가 (판매가 + 시공비)</td><td>${won(q.total)}</td></tr></tfoot></table>
    <p class="hint">가격·구성은 한샘몰 셀프 플래너 공개 데이터(2026-10-27 스냅샷) 기준입니다.</p>`);
}
function showDetail(title: string, srcs: string[]) {
  showModal(title, `<div class="detail-imgs">${srcs.filter(Boolean).map(s => `<img src="${s}" alt="">`).join('')}</div>`);
}
function showModal(title: string, html: string) {
  const m = $('#info-modal'); m.hidden = false;
  $('#info-title').textContent = title; $('#info-body').innerHTML = html;
  $('#info-close').onclick = () => (m.hidden = true);
}

// ---------- 말로 배치 — 화면 아래 입력창. 문장 → 칸 구성(arrange.ts) → 몸통 탭으로 보여 준다
const EXAMPLES = [
  '수납이 많았으면 좋겠어', '난 긴 옷이 많아서 긴 옷장들이 필요해', '침구류 넣는 곳과 옷을 같이 보관하게 해줘',
  '서랍 위주로, 긴 옷은 없어도 돼', '부부가 같이 써요, 바지 걸 곳도', '셔츠랑 정장을 많이 걸어야 해',
  '아이 옷이랑 장난감 정리할 곳', '겨울 이불이 많아서 이불장 두 칸', '화장대도 같이 있었으면 좋겠어',
  '슬라이딩 도어로 깔끔하게', '가성비 좋은 구성으로', '시그니처로 고급스럽게',
  '외부 서랍이 보이는 장으로', '니트랑 가방 올려둘 선반이 많았으면', '코트랑 원피스 위주, 서랍 조금',
  '혼자 쓰는 작은 방, 옷 적당히', '계절옷 보관할 곳이 넉넉하게', '바지가 많아 바지걸이 두 칸',
];
const promptIn = $<HTMLInputElement>('#prompt-in'), promptOut = $('#prompt-out');
const ex = $('#prompt-bar .prompt-ex');
EXAMPLES.forEach(t => { const b = h('button', '', t) as HTMLButtonElement; b.type = 'button'; b.onclick = () => { if (exDragged) return; promptIn.value = t; runPrompt(); }; ex.append(b); });
// 예제 줄 — 넘치는 예제는 좌우 화살표 · 끌어서 · 휠로 넘겨 본다
const exPrev = h('button', 'ex-nav prev', '‹') as HTMLButtonElement, exNext = h('button', 'ex-nav next', '›') as HTMLButtonElement;
exPrev.type = exNext.type = 'button';
exPrev.title = '앞 예제'; exNext.title = '다음 예제';
ex.before(exPrev); ex.after(exNext);
const exWrap = h('div', 'prompt-ex-wrap'); exPrev.before(exWrap); exWrap.append(exPrev, ex, exNext);
const exNav = () => { exPrev.disabled = ex.scrollLeft <= 2; exNext.disabled = ex.scrollLeft + ex.clientWidth >= ex.scrollWidth - 2; };
exPrev.onclick = () => ex.scrollBy({ left: -ex.clientWidth * 0.8, behavior: 'smooth' });
exNext.onclick = () => ex.scrollBy({ left: ex.clientWidth * 0.8, behavior: 'smooth' });
ex.addEventListener('scroll', exNav); addEventListener('resize', exNav); requestAnimationFrame(exNav);
ex.addEventListener('wheel', e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { ex.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
let exDrag: { x: number; left: number } | null = null, exDragged = false;
ex.addEventListener('pointerdown', e => { exDrag = { x: e.clientX, left: ex.scrollLeft }; exDragged = false; });
addEventListener('pointermove', e => { if (!exDrag) return; const dx = e.clientX - exDrag.x; if (Math.abs(dx) > 5) exDragged = true; ex.scrollLeft = exDrag.left - dx; });
addEventListener('pointerup', () => { exDrag = null; setTimeout(() => (exDragged = false)); });

$('#prompt-bar').addEventListener('submit', e => { e.preventDefault(); runPrompt(); });
// 같은 말을 다시 하면 다음 안 — 처음 말했을 때의 설계(타입·폭)를 기준으로 상위 후보를 돌아가며
let lastAsk: { text: string; base: Design; variant: number } | null = null;
function runPrompt() {
  const text = promptIn.value.trim();
  if (!design || !text) return;
  if (lastAsk?.text === text) lastAsk.variant++;
  else lastAsk = { text, base: structuredClone(design), variant: 0 };
  const r = arrange(pl, lastAsk.base, text, lastAsk.variant);
  const typeChanged = r.design.typeId !== design.typeId;
  design = { ...structuredClone(r.design), space: lastAsk.base.space, offset: lastAsk.base.offset, wear: text };
  if (typeChanged) syncEP();
  // 도어를 열어 칸 구성이 바로 보이게(몸통 탭은 없앴다 — 칸은 도어를 연 채 눌러 칸 메뉴에서)
  step = 'design'; tab = 'door'; selSlot = 0; unpickWard(); doorTarget = 1;
  rebuild(typeChanged); render();
  promptOut.hidden = false;
  promptOut.innerHTML = `<div class="read">${r.read.length ? r.read.map(x => `<span>${x}</span>`).join('') : '<span>특별한 요구를 못 찾아 한샘 기본 구성에 가깝게</span>'}`
    + `<b class="variant">제안 ${r.index + 1} / ${r.count}${r.count > 1 ? ' · 다시 누르면 다른 구성' : ''}</b></div>`
    + `<ol>${r.lines.map(l => `<li>${l.replace(/^\d+번째 칸 · /, '')}</li>`).join('')}</ol>`
    + (r.switched ? `<p class="switched">${r.switched}</p>` : '')
    + r.missing.map(m => `<p class="miss">${m}</p>`).join('');
}
promptIn.addEventListener('input', () => { if (lastAsk && promptIn.value.trim() !== lastAsk.text) lastAsk = null; });

// ---------- 화면 도구: 시점 · 도어 · 실사 렌더 · 해 방향
// 툴바 단추는 골랐거나 켜진 것만 검게 — 지금 시점 · 열린 도어 · 전체 화면 · 열린 메뉴 창 · 기본이 아닌 보기/실사(사용자 지시 2026-11-06)
$('#v-front').onclick = () => { stage.view('front'); markView('front'); };
markView('persp');
$('#v-door').onclick = () => { doorTarget = doorTarget > 0.5 ? 0 : 1; if (doorTarget < 0.5) unpickWard(); };
$('#v-full').onclick = () => document.fullscreenElement ? document.exitFullscreen() : $('#viewport').requestFullscreen();
// 보기: 재질 / 재질+라인
const lookPop = $('#look-pop'), renderPop = $('#render-pop'), sunPanel = $('#sun-panel');
const surfPop = $('#surf-pop'), postPanel = $('#post-panel');
const roomDoorPop = $('#roomdoor-pop'), windowPop = $('#window-pop'), fixPop = $('#fix-pop');
const pops = [lookPop, renderPop, sunPanel, surfPop, postPanel, roomDoorPop, windowPop, fixPop];
const toggle = (p: HTMLElement) => { const show = p.hidden; const had = !roomDoorPop.hidden || !windowPop.hidden; pops.forEach(x => (x.hidden = true)); p.hidden = !show; if (had) drawOverlay(); };
// 메뉴 단추는 그 메뉴 창이 열려 있거나 기본이 아닌 상태(재질+라인 · 실사 방식)가 켜져 있을 때만 검게 — 뭘 골랐는지 보이게.
// 창은 여러 곳에서 열고 닫으므로(3D 에서 방문 · 창문 · 설비를 누르면 열림) hidden 속성을 지켜본다
const MENUS: [HTMLElement, HTMLElement][] = [[$('#v-look'), lookPop], [$('#v-path'), renderPop], [$('#v-sun'), sunPanel], [$('#v-surf'), surfPop], [$('#v-post'), postPanel], [$('#v-roomdoor'), roomDoorPop], [$('#v-window'), windowPop], [$('#v-fixture'), fixPop]];
const menuOn = new Map<HTMLElement, boolean>();
const paintMenus = () => { for (const [b, p] of MENUS) b.classList.toggle('on', !p.hidden); };   // 메뉴가 열린 동안만 — 켜진 상태(보기·실사 모드)로는 칠하지 않는다
const setMenuOn = (b: HTMLElement, on: boolean) => { menuOn.set(b, on); paintMenus(); };
{ const mo = new MutationObserver(paintMenus); for (const [, p] of MENUS) mo.observe(p, { attributes: true, attributeFilter: ['hidden'] }); }
$('#v-look').onclick = () => toggle(lookPop);
// 바닥·벽 재질 (쿠지알러 재질 라이브러리 — 판매 중 바닥재·벽지). 탭 · 분류 · 검색
// CMF — 바닥·벽지·걸레받이를 묶은 세트(사용자 지시 2026-10-30). 벽지는 이미지 평균색으로 골랐다(무지에 가까운 것)
type Cmf = { id: string; name: string; desc: string; floor: string; wall: string; trim: string };
const CMF_SETS: Cmf[] = [
  { id: 'natural', name: '내추럴 화이트', desc: '워시오크 · 화이트 벽지', floor: '91610600', wall: '456673451', trim: '#f6f5f2' },
  { id: 'warm', name: '웜 베이지', desc: '베이지오크 · 샌드 베이지 벽지', floor: '525564345', wall: '259792802', trim: '#efe8de' },
  { id: 'greige', name: '소프트 그레이지', desc: '미스티오크 · 그레이지 벽지', floor: '608146484', wall: '76488444', trim: '#cfc8bf' },
  { id: 'gray', name: '모던 그레이', desc: '리얼그레이오크 · 라이트그레이 벽지', floor: '91615723', wall: '118173185', trim: '#a9aaa8' },
  { id: 'walnut', name: '딥 월넛', desc: '월넛 원목마루 · 아이보리 벽지', floor: '207398020', wall: '314297168', trim: '#4e3b2e' },
  { id: 'brown', name: '클래식 브라운', desc: '브라운오크 · 로즈 베이지 벽지', floor: '525564349', wall: '112790559', trim: '#8f7059' },
  { id: 'sage', name: '세이지 그린', desc: '화이트오크 · 세이지 벽지', floor: '525564341', wall: '508570562', trim: '#f2f4f1' },
  { id: 'marble', name: '마블 스톤', desc: '비앙코 마블 · 웜 화이트 벽지', floor: '295028928', wall: '488344168', trim: '#f4f3f1' },
];
const SURF_KEY = 'storage-planner.surfaces.v1';
function saveSurfaces() { try { localStorage.setItem(SURF_KEY, JSON.stringify({ ...stage.surfaceSel, trim: stage.trimColor })); } catch { /* 이번 화면엔 그대로 */ } }
let surfRestored = false;
function restoreSurfaces() {
  if (surfRestored || stage.surfaces.wall.length < 2) return;
  surfRestored = true;
  try {
    const s = JSON.parse(localStorage.getItem(SURF_KEY) ?? 'null');
    if (!s) return;
    if (s.floor) stage.setSurface('floor', s.floor);
    if (s.wall) stage.setSurface('wall', s.wall);
    if (s.trim) stage.setTrim(s.trim);
  } catch { /* 기본 */ }
}
const surfUI = { kind: 'cmf' as SurfaceKind | 'cmf', group: '', q: '' };
function renderSurfaces() {
  restoreSurfaces();
  if (surfUI.kind === 'cmf') { renderCmf(); return; }
  const kind = surfUI.kind;
  const all = stage.surfaces[kind];
  const groups = [...new Set(all.map(x => x.group ?? ''))];
  if (surfUI.group && !groups.includes(surfUI.group)) surfUI.group = '';
  const cur = all.find(x => x.id === stage.surfaceSel[kind]);
  surfPop.innerHTML = '';
  surfHead();
  if (cur) surfPop.append(h('p', 'surf-cur', `지금: <b>${cur.name}</b>${cur.code ? ` · ${cur.code}` : ''}${cur.size ? ` · 이미지 ${cur.size[0]}×${cur.size[1]}m` : ''}`));
  const q = h('input', 'surf-q') as HTMLInputElement;
  q.placeholder = '이름 · 상품코드 검색'; q.value = surfUI.q;
  q.oninput = () => { surfUI.q = q.value; drawGrid(); };
  surfPop.append(q);
  const chips = h('div', 'surf-chips');
  ['', ...groups].forEach(g => {
    const n = g ? all.filter(x => (x.group ?? '') === g).length : all.length;
    const b = h('button', g === surfUI.group ? 'on' : '', `${g || '전체'} <small>${n}</small>`);
    b.onclick = () => { surfUI.group = g; renderSurfaces(); };
    chips.append(b);
  });
  surfPop.append(chips);
  const grid = h('div', 'surf-grid');
  surfPop.append(grid);
  function drawGrid() {
    grid.innerHTML = '';
    const words = surfUI.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    all.filter(sf => (!surfUI.group || (sf.group ?? '') === surfUI.group)
      && words.every(w => `${sf.name} ${sf.code ?? ''} ${sf.series ?? ''}`.toLowerCase().includes(w)))
      .forEach(sf => {
        const on = stage.surfaceSel[kind] === sf.id;
        const col = sf.color ? `rgb(${sf.color.map(v => Math.round(Math.pow(v, 1 / 2.2) * 255)).join(',')})` : '#eee';
        const pic = sf.thumb ? `<img loading="lazy" src="${img(sf.thumb)}" alt="">` : `<span class="swatch" style="background:${col}"></span>`;
        const b = h('button', 'surf-card' + (on ? ' on' : ''), `${pic}<span>${sf.name}</span>`);
        b.title = [sf.name, sf.code, sf.series, sf.size && `이미지 ${sf.size[0]}×${sf.size[1]}m`].filter(Boolean).join(' · ');
        b.onclick = () => { stage.setSurface(kind, sf.id); saveSurfaces(); renderSurfaces(); };
        grid.append(b);
      });
  }
  drawGrid();
}
function surfHead() {
  surfPop.append(h('div', 'sun-title', `CMF <small>바닥·벽지·걸레받이·몰딩 · 바닥 ${stage.surfaces.floor.length} · 벽지 ${stage.surfaces.wall.length}</small>`));
  const tabs = h('div', 'surf-tabs');
  (['cmf', 'floor', 'wall'] as const).forEach(k => {
    const b = h('button', k === surfUI.kind ? 'on' : '', k === 'cmf' ? 'CMF 세트' : k === 'floor' ? '바닥' : '벽');
    b.onclick = () => { surfUI.kind = k; surfUI.group = ''; surfUI.q = ''; renderSurfaces(); };
    tabs.append(b);
  });
  surfPop.append(tabs);
}
/** CMF 세트 — 누르면 바닥·벽지·걸레받이를 한 번에 */
function renderCmf() {
  surfPop.innerHTML = '';
  surfHead();
  const find = (k: SurfaceKind, id: string) => stage.surfaces[k].find(x => x.id === id);
  const grid = h('div', 'cmf-grid');
  for (const c of CMF_SETS) {
    const f = find('floor', c.floor), w = find('wall', c.wall);
    if (!f || !w) continue;
    const on = stage.surfaceSel.floor === c.floor && stage.surfaceSel.wall === c.wall && stage.trimColor === c.trim;
    const b = h('button', 'cmf-card' + (on ? ' on' : ''),
      `<span class="cmf-pic"><img loading="lazy" src="${img(w.thumb ?? w.map ?? '')}" alt=""><i style="background:${c.trim}"></i><img loading="lazy" src="${img(f.thumb ?? f.map ?? '')}" alt=""></span><b>${c.name}</b><small>${c.desc}</small>`);
    b.title = `바닥 ${f.name} · 벽지 ${w.name} · 걸레받이·문틀 몰딩 ${c.trim}`;
    b.onclick = () => { stage.setSurface('floor', c.floor); stage.setSurface('wall', c.wall); stage.setTrim(c.trim); saveSurfaces(); renderSurfaces(); };
    grid.append(b);
  }
  surfPop.append(grid);
  surfPop.append(h('p', 'hint', '세트를 고른 뒤 「바닥」·「벽」 탭에서 하나씩 바꿀 수도 있어요.'));
}
stage.onSurfaces = renderSurfaces;
renderSurfaces();
$('#v-surf').onclick = () => toggle(surfPop);
lookPop.querySelectorAll<HTMLButtonElement>('[data-look]').forEach(b => b.onclick = () => {
  lookPop.querySelectorAll('[data-look]').forEach(x => x.classList.toggle('on', x === b));
  const look = b.dataset.look;
  setMenuOn($('#v-look'), look !== 'mat');
  stage.setLines(look === 'line' || look === 'size');
  showDims = look === 'size';
  drawOverlay();
});
// 소품 보이기·숨기기 — 다음에 열어도 그대로
const PROPS_KEY = 'storage-planner.props';
const propsBtn = $('#look-props');
const setProps = (v: boolean) => { stage.setPropsVisible(v); propsBtn.classList.toggle('on', v); try { localStorage.setItem(PROPS_KEY, v ? '1' : '0'); } catch { /* 이번 화면엔 그대로 */ } };
propsBtn.onclick = () => setProps(!stage.propsVisible);
try { if (localStorage.getItem(PROPS_KEY) === '0') setProps(false); } catch { /* 기본 보이기 */ }
// 실사: 실시간 / ① MuTracer / ② 라이트맵 굽기 / ③ 서펠 GI
$('#v-path').onclick = () => toggle(renderPop);
// ④ 실시간 고품질 = 실시간 화면 + 화면 반사(SSR) + 접촉 그림자(SSS). 실시간(기본)을 고르면 둘을 끈다(사용자 지시 2026-11-03)
const HQ = (on: boolean) => { if (!!stage.raster.post.ssr !== on || !!stage.raster.post.sss !== on) { stage.setPost({ ssr: on, sss: on }); if (!postPanel.hidden) renderPost(); } };
if (stage.raster.kind !== 'webgpu') renderPop.querySelectorAll<HTMLButtonElement>('[data-mode=hq], [data-mode=gpupt]').forEach(b => b.setAttribute('disabled', ''));
if (stage.raster.post.ssr || stage.raster.post.sss) { renderPop.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('on', (x as HTMLElement).dataset.mode === 'hq')); setMenuOn($('#v-path'), true); }
renderPop.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(b => b.onclick = async () => {
  const hq = b.dataset.mode === 'hq';
  const mode = (hq ? 'raster' : b.dataset.mode) as RenderMode;
  if (hq) HQ(true); else if (mode === 'raster') HQ(false);
  renderPop.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('on', x === b));
  setMenuOn($('#v-path'), mode !== 'raster' || hq);
  $('#samples').hidden = mode === 'raster';
  $('#samples').textContent = '';
  renderPop.hidden = true;
  await stage.setMode(mode);
});
stage.onStatus = t => { $('#samples').textContent = t; };
// 굽기·서펠 결과를 저장해 두는 열쇠 — 설계 전체 + 도어 열림 + 탭(몸통 탭은 도어 숨김)
stage.stateKey = () => JSON.stringify([design, doorTarget, tab, stage.surfaceSel, stage.layout]);
$('#v-sun').onclick = () => toggle(sunPanel);
// 조명 패널 — 해 · 실내 조명 · 환경광 · 노출 (슬라이더를 움직이는 동안 바로 반영)
type Slider = { id: string; get: () => number; set: (v: number) => void; fmt: (v: number) => string };
const sliders: Slider[] = [
  { id: '#sun-az', get: () => stage.sunCfg.azimuth, set: v => stage.setSun({ azimuth: v }), fmt: v => `${v}°` },
  { id: '#sun-el', get: () => stage.sunCfg.elevation, set: v => stage.setSun({ elevation: v }), fmt: v => `${v}°` },
  { id: '#sun-in', get: () => stage.sunCfg.intensity, set: v => stage.setSun({ intensity: v }), fmt: v => v.toFixed(1) },
  { id: '#sh-str', get: () => stage.shadowCfg.strength, set: v => stage.setShadow({ strength: v }), fmt: v => v.toFixed(2) },
  { id: '#sh-soft', get: () => stage.shadowCfg.soft, set: v => stage.setShadow({ soft: v }), fmt: v => v.toFixed(1) },
  { id: '#sky', get: () => stage.roomCfg.sky, set: v => stage.setRoomLight({ sky: v }), fmt: v => v.toFixed(2) },
  { id: '#lamp', get: () => stage.roomCfg.lamp, set: v => stage.setRoomLight({ lamp: v }), fmt: v => v.toFixed(2) },
  { id: '#kelvin', get: () => stage.roomCfg.kelvin, set: v => stage.setRoomLight({ kelvin: v }), fmt: v => `${v}K` },
  { id: '#sun-k', get: () => stage.sunCfg.kelvin ?? 5200, set: v => stage.setSun({ kelvin: v }), fmt: v => `${v}K` },
  { id: '#envi', get: () => stage.roomCfg.env, set: v => stage.setRoomLight({ env: v }), fmt: v => v.toFixed(2) },
  { id: '#expo', get: () => stage.roomCfg.exposure, set: v => stage.setRoomLight({ exposure: v }), fmt: v => v.toFixed(2) },
];
// 모든 조절값은 슬라이더 옆 칸에 숫자로 직접 넣을 수도 있다(사용자 지시 2026-10-30). 칸 ↔ 슬라이더가 서로 따라간다
/** 슬라이더 칸 값 — 단계(step) 자릿수로 */
const stepFmt = (r: HTMLInputElement, v: number) => { const d = (r.step.split('.')[1] ?? '').length; return v.toFixed(d); };
/** 숫자 칸을 슬라이더에 묶는다 — 입력하면 범위 안으로 잘라 반영 */
function bindNum(r: HTMLInputElement, box: HTMLInputElement, apply: (v: number) => void) {
  Object.assign(box, { min: r.min, max: r.max, step: r.step });
  box.title = `${r.min} ~ ${r.max} — 직접 입력`;
  box.onchange = () => {
    let v = +box.value;
    if (!Number.isFinite(v)) { box.value = stepFmt(r, +r.value); return; }
    v = Math.min(+r.max, Math.max(+r.min, v));
    r.value = String(v); box.value = stepFmt(r, v); apply(v);
  };
  box.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') box.blur(); };
}
const syncSliders = () => sliders.forEach(sl => {
  const r = $<HTMLInputElement>(sl.id); r.value = String(sl.get()); $<HTMLInputElement>(sl.id + '-v').value = stepFmt(r, sl.get());
});
sliders.forEach(sl => {
  const r = $<HTMLInputElement>(sl.id), box = $<HTMLInputElement>(sl.id + '-v');
  r.oninput = () => { sl.set(+r.value); box.value = stepFmt(r, +r.value); };
  bindNum(r, box, v => sl.set(v));
});
syncSliders();
// 실내 조명 빛 색 — 자주 쓰는 색 칩 + 직접 고르기. 색온도와 곱해진다(흰색 = 색온도 그대로)
const LAMP_COLORS: [string, string][] = [['#ffffff', '흰색(색온도대로)'], ['#ffe2b8', '웜 앰버'], ['#ffd0d6', '로즈'], ['#d7e8ff', '쿨 블루'], ['#d9f2df', '민트'], ['#e6d9ff', '라벤더']];
const lampColIn = $<HTMLInputElement>('#lamp-col'), lampChips = $('#lamp-colors');
const setLampColor = (c: string) => {
  stage.setRoomLight({ lampColor: c }); lampColIn.value = c;
  lampChips.querySelectorAll('button').forEach(b => b.classList.toggle('on', (b as HTMLButtonElement).dataset.c === c));
};
LAMP_COLORS.forEach(([c, name]) => {
  const b = h('button', '', '') as HTMLButtonElement; b.type = 'button'; b.dataset.c = c; b.title = name; b.style.background = c;
  b.onclick = () => setLampColor(c); lampChips.append(b);
});
lampColIn.oninput = () => setLampColor(lampColIn.value);
setLampColor(stage.roomCfg.lampColor ?? '#ffffff');
// 천장 조명 구성 — 다운라이트 + 라인(기본) · 다운라이트만 · 라인만 · 등 패널. 다음에 열어도 그대로
const CEIL_KEY = 'storage-planner.ceiling';
const ceilSel = $<HTMLSelectElement>('#ceil-sel');
CEILING_LIGHTS.forEach(c => ceilSel.append(new Option(c.name, c.id)));
try { const c = localStorage.getItem(CEIL_KEY) as CeilingLight | null; if (c && CEILING_LIGHTS.some(x => x.id === c)) stage.ceiling = c; } catch { /* 기본 */ }
ceilSel.value = stage.ceiling;
ceilSel.onchange = () => { stage.setCeiling(ceilSel.value as CeilingLight); try { localStorage.setItem(CEIL_KEY, stage.ceiling); } catch { /* 이번 화면엔 반영 */ } };
// 시간대 — 해 위치·세기와 실내 조명을 함께
const PRESETS: Record<string, { sun: Partial<Sun>; room: Partial<RoomLight> }> = {
  // 밝게(기본) — 한샘 카탈로그 렌더처럼: 직사광 약하게, 창 산란광으로 고르게
  bright: { sun: { azimuth: 30, elevation: 42, intensity: 3, kelvin: 5200 }, room: { lamp: 0.3, sky: 1.8, env: 1.0, exposure: 1.05 } },
  morning: { sun: { azimuth: -50, elevation: 18, intensity: 3.0, kelvin: 4300 }, room: { lamp: 0.4, sky: 1.6, env: 1.1, exposure: 1.2 } },
  noon: { sun: { azimuth: -10, elevation: 55, intensity: 4.2, kelvin: 5800 }, room: { lamp: 0.25, sky: 2.4, env: 1.2, exposure: 1.2 } },
  afternoon: { sun: { azimuth: 22, elevation: 26, intensity: 3.6, kelvin: 4800 }, room: { lamp: 0.6, sky: 1.2, env: 1, exposure: 1.1 } },
  sunset: { sun: { azimuth: 60, elevation: 7, intensity: 2.2, kelvin: 3000 }, room: { lamp: 1.0, sky: 0.5, env: 1, exposure: 1.1 } },
  night: { sun: { intensity: 0 }, room: { lamp: 1.5, sky: 0, env: 1, exposure: 1.1 } },
};
document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach(b => b.onclick = () => {
  const p = PRESETS[b.dataset.preset!];
  stage.setSun(p.sun); stage.setRoomLight(p.room); syncSliders();
});

// 후처리 — 실시간(기본) 화면에만. 바꾸는 즉시 반영하고 이 브라우저에 기억한다. 렌더러가 못 하는 항목은 흐리게(WebGL 은 AO·톤만)
type PostCtl =
  | { kind: 'range'; key: keyof PostSettings; label: string; min: number; max: number; step: number; fmt?: (v: number) => string }
  | { kind: 'check'; key: keyof PostSettings; label: string }
  | { kind: 'select'; key: keyof PostSettings; label: string; options: [string, string][] }
  | { kind: 'grp'; label: string; note?: string }
  | { kind: 'button'; label: string; run: (b: HTMLButtonElement) => void };
const POST_CTLS: PostCtl[] = [
  { kind: 'grp', label: '간접광 · AO', note: '화면 공간(SSGI)' },
  { kind: 'check', key: 'ssgi', label: '켜기' },
  { kind: 'select', key: 'aoKind', label: '방식', options: [['both', '간접광 SSGI + AO GTAO'], ['ssgi', 'SSGI — 간접광 + AO'], ['gtao', 'GTAO — AO 만 (노이즈 적음)']] },
  { kind: 'range', key: 'aoRadius', label: 'GTAO 반경 (퍼짐)', min: 0.05, max: 2, step: 0.05, fmt: v => `${v.toFixed(2)}m` },
  { kind: 'range', key: 'aoThick', label: 'GTAO 두께 (뒤로 퍼짐)', min: 0.05, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}m` },
  { kind: 'range', key: 'aoPow', label: 'AO 대비 (진하기 곡선)', min: 0.5, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'range', key: 'aoSoft', label: 'AO 부드럽게 (0 = 끔)', min: 0, max: 12, step: 1, fmt: v => v.toFixed(0) },
  { kind: 'select', key: 'quality', label: '품질', options: [['low', '낮음 (빠름)'], ['mid', '보통'], ['high', '높음 (느림)']] },
  { kind: 'select', key: 'giRes', label: '해상도', options: [['half', '절반 (빠름)'], ['full', '전체 (느림)']] },
  { kind: 'range', key: 'gi', label: '간접광', min: 0, max: 20, step: 0.5, fmt: v => v.toFixed(1) },
  { kind: 'range', key: 'ao', label: 'AO', min: 0, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'range', key: 'radius', label: '반경', min: 0.2, max: 5, step: 0.1, fmt: v => `${v.toFixed(1)}m` },
  { kind: 'range', key: 'thickness', label: '두께', min: 0.05, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}m` },
  { kind: 'select', key: 'giSpace', label: '샘플링', options: [['world', '월드 (고르게 퍼짐)'], ['screen', '화면 (가까운 곳 자세히 · 모서리 번짐)']] },
  { kind: 'range', key: 'giOcc', label: '모서리 누르기', min: 0, max: 1, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'check', key: 'denoise', label: '노이즈 제거 (자글거림)' },
  // 라이트맵·그늘은 한 묶음으로(사용자 지시 2026-11-05 「라이트맵 관련 메뉴는 탭을 하나로 — 간접광 AO 처럼」). 예전엔 장 그늘·가구 밑 그림자·
  // 공간 라이트맵·상품 라이트맵이 각각 제목으로 끊겨 무엇이 라이트맵인지 헷갈렸다
  { kind: 'grp', label: '라이트맵 · 그늘', note: '미리 구운 빛과 그늘' },
  { kind: 'check', key: 'spaceAO', label: '공간 라이트맵 (창 하늘빛 · 한 번 튄 빛)' },
  { kind: 'range', key: 'spaceLMStr', label: '공간 세기', min: 0, max: 2, step: 0.05, fmt: v => `×${v.toFixed(2)}` },
  { kind: 'check', key: 'spaceKeepAO', label: '공간 라이트맵 위에도 화면 AO' },
  { kind: 'check', key: 'prodAO', label: '상품 라이트맵 (가구 자체 그늘)' },
  { kind: 'range', key: 'prodAOStr', label: '상품 세기', min: 0, max: 1, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'check', key: 'bakedAO', label: '장 그늘 (칸 안쪽 · 선반 밑)' },
  { kind: 'check', key: 'contact', label: '가구 밑 그림자 (바닥 닿는 자리)' },
  { kind: 'range', key: 'depthFx', label: '공간감 (창에서 멀수록 어둡게)', min: 0, max: 1, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'grp', label: '안티앨리어싱', note: 'TRAA — 끄면 간접광 노이즈가 남는다' },
  { kind: 'check', key: 'traa', label: '켜기' },
  { kind: 'select', key: 'aa', label: 'TRAA 끈 때', options: [['msaa', 'MSAA 4배 (가볍게 · 테두리 깔끔)'], ['smaa', 'SMAA'], ['fxaa', 'FXAA (가장 가볍다)'], ['none', '끔']] },
  { kind: 'grp', label: '톤 · 색' },
  { kind: 'select', key: 'toneMapping', label: '톤매핑', options: [['agx', 'AgX (실사와 같음)'], ['neutral', 'Neutral'], ['aces', 'ACES']] },
  { kind: 'range', key: 'exposure', label: '노출 배율', min: 0.3, max: 3, step: 0.05, fmt: v => `×${v.toFixed(2)}` },
  { kind: 'range', key: 'contrast', label: '대비', min: 0.5, max: 1.5, step: 0.01, fmt: v => v.toFixed(2) },
  { kind: 'range', key: 'saturation', label: '채도', min: 0, max: 2, step: 0.01, fmt: v => v.toFixed(2) },
  { kind: 'range', key: 'vignette', label: '비네팅', min: 0, max: 1, step: 0.01, fmt: v => v.toFixed(2) },
  { kind: 'grp', label: '화면 반사 · 그림자', note: 'SSR · SSS — 실사 메뉴 「④ 실시간 고품질」이 함께 켠다(무겁다)' },
  { kind: 'check', key: 'ssr', label: '화면 반사 (SSR)' },
  { kind: 'range', key: 'ssrIntensity', label: '반사 세기', min: 0, max: 2, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'check', key: 'sss', label: '접촉 그림자 (SSS · 햇빛)' },
  { kind: 'grp', label: '반사', note: '거울 — 평면 반사(거울마다 장면을 한 번 더 그린다)' },
  { kind: 'select', key: 'reflect', label: '거울 품질', options: [['high', '높음 (화면 해상도)'], ['mid', '보통 (60%)'], ['low', '낮음 (35%)'], ['off', '끔 (환경맵 · 가장 가벼움)']] },
  { kind: 'grp', label: '카메라', note: '화각 · 움직임 속도' },
  { kind: 'range', key: 'camFov', label: '화각', min: 25, max: 90, step: 1, fmt: v => `${v}°` },
  { kind: 'range', key: 'camRot', label: '회전 속도', min: 0.2, max: 3, step: 0.1, fmt: v => `×${v.toFixed(1)}` },
  { kind: 'range', key: 'camZoom', label: '확대 속도', min: 0.2, max: 3, step: 0.1, fmt: v => `×${v.toFixed(1)}` },
  { kind: 'range', key: 'camPan', label: '이동 속도', min: 0.2, max: 3, step: 0.1, fmt: v => `×${v.toFixed(1)}` },
  { kind: 'check', key: 'camDamping', label: '부드럽게 멈추기 (관성)' },
  { kind: 'check', key: 'camGrab', label: '화면 잡아끌기 (회전 방향 반대)' },
  { kind: 'grp', label: '창밖 환경맵', note: 'Poly Haven CC0 HDRI — 창으로 보이는 풍경만 바꾼다(실내 조명은 그대로)' },
  { kind: 'select', key: 'outside', label: '풍경', options: [['park', '공원 (나무·잔디)'], ['city', '도시 광장'], ['river', '강변 빌딩'], ['skyline', '고층 스카이라인'], ['sky', '하늘만 (구름)'], ['off', '끔 (단색)']] },
  { kind: 'range', key: 'outsideRot', label: '방향', min: -180, max: 180, step: 5, fmt: v => `${v}°` },
  { kind: 'grp', label: '블룸', note: '밝은 곳 빛 번짐' },
  { kind: 'check', key: 'bloom', label: '켜기' },
  { kind: 'range', key: 'bloomStrength', label: '세기', min: 0, max: 2, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'range', key: 'bloomThreshold', label: '문턱', min: 0, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
  { kind: 'range', key: 'bloomRadius', label: '반경', min: 0, max: 1, step: 0.05, fmt: v => v.toFixed(2) },
];
function renderPost() {
  const r = stage.raster, post = r.post as Record<string, unknown>;
  postPanel.innerHTML = '';
  postPanel.append(h('div', 'sun-title', `후처리 <small>실시간 화면 · ${r.kind === 'webgpu' ? 'WebGPU' : 'WebGL (AO·톤만)'}</small>`));
  // 화면 성능 단계가 끈 항목 — 값은 기억해 두고(높음으로 돌리면 그대로) 이 단계에서만 꺼진다
  // 단계가 기본으로 끈 항목 — 체크하면 그 단계에서도 켜진다(사용자 지시 2026-11-12). 직접 바꾼 항목은 흐리게 두지 않는다
  const capped = Object.fromEntries(Object.entries(stage.quality.caps).filter(([k]) => !r.userSet.has(k as keyof PostSettings))) as Record<string, unknown>;
  if (Object.keys(capped).length) postPanel.append(h('p', 'note', `화면 성능 「${stage.quality.label}」 단계라 흐린 항목은 기본으로 꺼 두었어요 — 체크하면 켜져요(「기본값으로」를 누르면 다시 꺼요)`));
  for (const c of POST_CTLS) {
    if (c.kind === 'grp') { postPanel.append(h('div', 'grp', `${c.label}${c.note ? ` <small>${c.note}</small>` : ''}`)); continue; }
    if (c.kind === 'button') { const b = h('button', 'reset', c.label) as HTMLButtonElement; b.type = 'button'; b.onclick = () => c.run(b); postPanel.append(b); continue; }
    const on = r.supports.has(c.key);
    const row = h('label', (c.kind === 'check' ? 'chk' : '') + (on && !(c.key in capped) ? '' : ' off'));
    row.title = !on ? 'WebGPU 화면에서만 — 주소의 ?webgl 을 빼고 열어 주세요' : c.key in capped ? `화면 성능 「${stage.quality.label}」에서 기본으로 꺼 둔 항목 — 체크하거나 바꾸면 켜져요` : '';
    row.append(h('span', '', c.label));
    /** 직접 바꿨다 — 단계가 꺼 둔 항목이어도 이제 켜져 있으니 흐리게 두지 않는다 */
    const lift = () => { if (on && c.key in capped) { row.classList.remove('off'); row.title = ''; } };
    if (c.kind === 'range') {
      const inp = h('input') as HTMLInputElement, out = h('input', 'val') as HTMLInputElement;
      Object.assign(inp, { type: 'range', min: String(c.min), max: String(c.max), step: String(c.step), value: String(post[c.key]), disabled: !on });
      out.type = 'number'; out.disabled = !on;
      const show = (v: number) => (out.value = stepFmt(inp, v));
      show(post[c.key] as number);
      inp.oninput = () => { stage.setPost({ [c.key]: +inp.value }); show(+inp.value); lift(); };
      bindNum(inp, out, v => { stage.setPost({ [c.key]: v }); lift(); });
      row.append(inp, out);
    } else if (c.kind === 'check') {
      const inp = h('input') as HTMLInputElement;
      Object.assign(inp, { type: 'checkbox', checked: !!post[c.key], disabled: !on });
      inp.onchange = () => { stage.setPost({ [c.key]: inp.checked }); lift(); };
      row.append(inp);
    } else {
      const sel = h('select') as HTMLSelectElement;
      c.options.forEach(([v, t]) => sel.append(new Option(t, v, false, post[c.key] === v)));
      sel.disabled = !on;
      sel.onchange = () => { stage.setPost({ [c.key]: sel.value }); lift(); };
      row.append(sel);
    }
    postPanel.append(row);
  }
  postPanel.append(h('p', 'note', '실사(경로 추적)·굽기·서펠 화면에는 쓰이지 않는다. 노출 배율은 조명 패널의 노출에 곱한다'));
  const reset = h('button', 'reset', '기본값으로');
  reset.onclick = () => { postBase(); renderPost(); };
  postPanel.append(reset);
  // 비교 — 기본(깊이감 요청 전 값)과 깊이감 강조안을 오간다. 단축키 C
  const same = (p: Partial<PostSettings>) => Object.entries({ ...POST_DEFAULTS, ...p, ...keepScene() }).every(([k, v]) => post[k] === v);
  const cmp = h('div', 'cmp');
  for (const [name, p] of [['기본 (수정 전)', {}], ['깊이감 강조', DEPTH_LOOK]] as const) {
    const b = h('button', 'reset' + (same(p) ? ' on' : ''), name);
    b.onclick = () => { postBase(p); renderPost(); };
    cmp.append(b);
  }
  postPanel.firstElementChild!.after(cmp);
}
/** 기본값(+ 고른 안)으로 — 직접 바꾼 기록을 지워 화면 성능 단계 기본을 다시 따른다. 고른 안의 항목만 직접 고른 것으로 남긴다 */
function postBase(p: Partial<PostSettings> = {}) {
  stage.setPost({ ...POST_DEFAULTS, ...p, ...keepScene() });
  stage.raster.clearUserSet();
  if (Object.keys(p).length) stage.setPost(p);
  stage.setQuality(stage.quality);          // 단계가 다시 끈 값의 화면 쪽(거울 반사 등)도 맞춘다
}
/** 깊이감·입체감 강조안 — 간접광 SSGI + 구석 그늘 GTAO · 품질 높음 · AO 1 · 노출 1.35 · 대비 1.05 · 비네팅 0.25.
 *  비교 뒤 기본은 수정 전으로 되돌렸다(사용자 지시 2026-10-29) — 이 안은 비교용으로 남긴다 */
const DEPTH_LOOK: Partial<PostSettings> = {
  quality: 'high', ao: 1, aoKind: 'both', aoRadius: 0.6, exposure: 1.35, contrast: 1.05, vignette: 0.25,
};
/** 화면 톤과 상관없는 설정 — 창밖 환경맵(풍경·방향)·카메라. 기본값·비교로 톤을 바꿔도 지금 값을 둔다
 *  (예전엔 함께 기본값으로 덮여 「환경맵 설정이 저장이 안 된다」 — 사용자 지적 2026-11-04) */
const SCENE_KEYS = ['outside', 'outsideRot', 'camFov', 'camRot', 'camZoom', 'camPan', 'camDamping', 'camGrab'] as const;
function keepScene(): Partial<PostSettings> {
  const p = stage.raster.post as Record<string, unknown>;
  return Object.fromEntries(SCENE_KEYS.map(k => [k, p[k]])) as Partial<PostSettings>;
}
addEventListener('keydown', e => {
  if (e.key !== 'c' && e.key !== 'C') return;
  if ((e.target as HTMLElement).closest('input, select, textarea')) return;
  const deep = Object.entries(DEPTH_LOOK).every(([k, v]) => (stage.raster.post as Record<string, unknown>)[k] === v);
  postBase(deep ? {} : DEPTH_LOOK);
  renderPost();
});
renderPost();
$('#v-post').onclick = () => toggle(postPanel);

// ---- 화면 성능 단계(사용자 지시 2026-11-11 「노트북에서도 쾌적하게, 60프레임」) — 실사 메뉴 아래. 자동 = GPU 이름으로(내장 그래픽이면 노트북)
const gpuShort = (() => {
  const m = /ANGLE \([^,]*,\s*([^,]+?)(?:\s*\(0x[0-9a-f]+\))?(?:\s+Direct3D|\s+OpenGL|\s+Vulkan|,|\))/i.exec(GPU_NAME);
  return (m ? m[1] : GPU_NAME).replace(/\((R|TM)\)/gi, '').replace(/\s+/g, ' ').trim();
})();
function renderQuality() {
  const row = $('#q-row'); row.innerHTML = '';
  ([['auto', `자동 · ${PROFILES[AUTO_TIER].label}`], ['low', PROFILES.low.label], ['mid', PROFILES.mid.label], ['high', PROFILES.high.label]] as [QualityChoice, string][]).forEach(([c, t]) => {
    const b = h('button', qualityChoice() === c ? 'on' : '', t) as HTMLButtonElement;
    b.type = 'button';   // 주소의 ?q= 는 시작 단계만 정한다 — 버튼은 잠그지 않는다(사용자 지시 2026-11-12 「고성능 노트북도 있는데 막아버리면」)
    b.onclick = () => { stage.setQuality(setQualityChoice(c)); renderQuality(); if (!postPanel.hidden) renderPost(); };
    row.append(b);
  });
  $('#q-gpu').textContent = gpuShort ? `그래픽: ${gpuShort}` : '';
  const q = stage.quality;
  $('#q-note').textContent = q.name === 'low' ? '노트북 — 화면 배율 1, 무거운 화면 효과(간접광·화면 반사·거울 반사·블룸) 끔. 구운 그늘은 그대로'
    : q.name === 'mid' ? '보통 — 구석 그늘(AO)·계단 지우기만, 간접광·화면 반사·블룸 끔'
    : '높음 — 후처리 메뉴 설정 그대로(데스크톱 그래픽카드용)';
}
renderQuality();
// FPS 표시 — 바뀐 게 없으면 그리지 않으므로(배터리·발열) 그동안은 「멈춤」. ?stats 로 열면 처음부터 켬
const FPS_KEY = 'storage-planner.fps';
const fpsEl = h('div'); fpsEl.id = 'fps'; $('#viewport').append(fpsEl);
// 글은 0.25초마다 새로 쓰고, 기록 단추는 한 번만 만든다(새로 쓰는 글 안에 두면 누르는 사이 단추가 바뀌어 눌리지 않는다)
const fpsTxt = h('div'); fpsEl.append(fpsTxt);
const logBar = h('div', 'loadlog-bar');
const logSave = h('button', '', '기록 저장') as HTMLButtonElement, logDel = h('button', '', '지우기') as HTMLButtonElement;
logSave.onclick = () => loadDownload();
logDel.onclick = () => { if (confirm('이 브라우저에 쌓인 불러오기 기록을 지울까요?')) loadClear(); };
logBar.append(logSave, logDel); fpsEl.append(logBar);
// 기록에 남길 화면 설정 — 같은 기기라도 단계·후처리·방 크기에 따라 시간이 달라 함께 봐야 한다
loadContext(() => {
  const cv = stage.renderer.domElement;
  const ls = (k: string) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
  return {
    tier: stage.quality.name, mode: stage.mode, canvas: `${cv.width}×${cv.height}`, dpr: +stage.renderer.getPixelRatio().toFixed(2),
    post: stage.raster.post,
    design: design ? { type: design.typeId, width: design.width, space: design.space, offset: design.offset, slots: design.slots.length, ep: design.options } : null,
    layout: localStorage.getItem('storage-planner.layout'), room: ls('storage-planner.roomdims.v1'),
    visible: document.visibilityState,
  };
});
const fpsBox = $('#q-fps') as HTMLInputElement;
const setFps = (on: boolean) => { fpsEl.hidden = !on; fpsBox.checked = on; try { localStorage.setItem(FPS_KEY, on ? '1' : '0'); } catch { /* 이번 화면엔 반영 */ } };
fpsBox.onchange = () => setFps(fpsBox.checked);
setFps(new URLSearchParams(location.search).has('stats') || (() => { try { return localStorage.getItem(FPS_KEY) === '1'; } catch { return false; } })());
setInterval(() => {
  if (fpsEl.hidden) return;
  const f = stage.perf.frames, n = f.length, now = performance.now();
  const live = n > 1 && now - f[n - 1] < 300;
  const ms = live ? (f[n - 1] - f[0]) / (n - 1) : 0;
  const cv = stage.renderer.domElement;
  fpsTxt.innerHTML = (live ? `<b>${Math.round(1000 / ms)}</b> fps · ${ms.toFixed(1)}ms` : '<b>멈춤</b> <small>바뀐 게 없어 그리지 않아요</small>')
    + `<br><small>${stage.quality.label} · ${cv.width}×${cv.height} · 배율 ${stage.renderer.getPixelRatio().toFixed(2)}</small>` + loadReport();
  logSave.textContent = `기록 저장(${loadCount()}건)`;
}, 250);

// 3D 화면 클릭: 몸통 탭이면 칸 선택, 도어 탭이면 누른 도어의 칸 도어 바꾸기.
// 화면을 돌리려고 끈 것은 클릭이 아니다(누른 곳에서 5px 넘게 움직였으면 무시)
const cv = stage.renderer.domElement;
let downAt: { x: number; y: number; t: number } | null = null;
let movedAt = 0;                         // 카메라가 마지막으로 움직인 시각(회전·이동·확대·관성)
let camMovedAt = 0;                      // 카메라가 실제로 움직인 시각만('change') — 'start' 는 누르기만 해도 와서 칸 클릭 판정엔 못 쓴다
cv.addEventListener('pointerdown', e => { downAt = { x: e.clientX, y: e.clientY, t: performance.now() }; });
cv.addEventListener('pointerup', e => {
  if (doorDragged) { doorDragged = false; downAt = null; return; }
  if (!design || e.button !== 0 || !downAt) return;
  const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y), t0 = downAt.t; downAt = null;
  // 끌었거나, 누르고 있는 동안 화면이 움직였으면(회전·이동·관성) 선택이 아니다
  if (moved > 5 || movedAt > t0) return;
  const ep = stage.pickEP(e);
  if (ep) { openEpPop(ep); return; }
  if (!epPop.hidden) closeEpPop();
  const i = stage.pickSlot(e);
  if (i == null) return;
  if (tab === 'body') { selSlot = i; drawOverlay(); renderPanel(); return; }
  const d = stage.pickDoor(e);
  if (d) d.door < 0 ? openDrawerPicker(d.slot) : openDoorPicker(d.slot, d.door);
});
// 도어 탭 — 마우스가 올라간 도어를 테두리·손 모양 커서로.
// 회전·이동·확대 중(관성으로 미끄러지는 동안 포함)에는 표시도 선택도 하지 않는다(사용자 지시)
let hoverRaf = 0;
const clearHover = () => { cv.style.cursor = ''; if (hoverDoor) { hoverDoor = null; drawOverlay(); } };
stage.controls.addEventListener('start', () => { movedAt = performance.now(); clearHover(); });
stage.controls.addEventListener('change', () => { movedAt = camMovedAt = performance.now(); if (hoverDoor) clearHover(); });
cv.addEventListener('pointermove', e => {
  if (e.buttons || tab !== 'door' || stage.mode !== 'raster') return;
  if (performance.now() - movedAt < 250) return;
  cancelAnimationFrame(hoverRaf);
  hoverRaf = requestAnimationFrame(() => {
    const d = stage.pickDoor(e);
    cv.style.cursor = d ? 'pointer' : '';
    if (d?.slot !== hoverDoor?.slot || d?.door !== hoverDoor?.door || d?.obj !== hoverDoor?.obj) { hoverDoor = d; drawOverlay(); }
  });
});
cv.addEventListener('pointerleave', () => { cv.style.cursor = ''; if (hoverDoor) { hoverDoor = null; drawOverlay(); } });

// ---------- 칸 고르기·끌어 순서 바꾸기(사용자 지시 2026-11-09 「도어가 열려 있으면 장이 선택되고 드래그 이동, 닫혀 있으면 도어 선택」
// → 「장 선택이 개별로 — 지금은 여러 개가 같이 선택돼」). 도어가 열린 동안(몸통 탭 제외) 칸을 누르면 그 칸 하나를 고르고, 5px 넘게 끌면
// 고른 칸이 앞으로 15cm 튀어나오고 마우스에 붙어 같이 움직인다(사용자 지시 2026-11-09 「선·박스는 지저분하고 직관적이지 않아 — 돌출 + 마우스에 붙어 이동」).
// 고른 칸만 합치지 않고 지어(buildWardrobe lift) 따로 움직일 수 있다. 끄는 동안 놓일 자리가 바뀌면 그 순서로 바로 다시 짓는다(실시간).
// 옮기는 것은 몸통·도어 색·서랍 색이고, 자리 규격(slotSeq — 슬라이딩 레일 앞뒤)은 자리에 남긴다
let wardSlot: number | null = null;
/** 도어 숨김 — 몸통 탭, 또는 칸을 잡고 있는 동안(사용자 지시 2026-11-09 「장이 선택되면 도어는 숨기고 이동이 끝나면 다시 보이게」) */
const doorsHidden = () => tab === 'body' || wardSlot != null;   // 칸을 고른 동안 숨기고 고르기를 풀면 보인다(누르고 떼는 사이 껐다 켜면 깜빡였다)
let wardDrag: { i0: number; cur: number; order: Design['slots']; seqs: number[]; ranges: [number, number][]; r0: [number, number]; sx: number; sy: number; x0: number; dx: number; live: boolean; wasSel: boolean } | null = null;
const wardOpen = () => doorTarget > 0.5 && tab !== 'body' && step === 'design';
/** 칸 i 를 to 자리로 — 사이 칸은 한 칸씩 밀린다 */
function moveSlot(i: number, to: number) {
  if (!design || to === i || to < 0 || to >= design.slots.length) return;
  const ss = design.slots, seqs = ss.map(x => x.slotSeq);
  const [m] = ss.splice(i, 1); ss.splice(to, 0, m);
  ss.forEach((x, k) => (x.slotSeq = seqs[k]));
  wardSlot = to; selSlot = to;
  saveDesign(); rebuild(false, true); render(); renderWardPop();
}
function renderWardPop() {
  const pop = $('#door-pop');
  if (wardSlot == null || !design || !built) { if (pop.dataset.kind === 'slot') pop.hidden = true; return; }
  const d = design, i = wardSlot, n = d.slots.length, s = d.slots[i];
  const cur = pl.c(pl.bodyFor(d, i).id), def = pl.slotDef(d, s.slotSeq);
  pop.hidden = false; pop.innerHTML = ''; pop.dataset.kind = 'slot';
  pop.append(h('div', 'pop-title', `${i + 1}번째 칸 · ${cur.name}`));
  pop.append(h('p', 'pop-note', '칸을 끌어 순서를 바꿔요. 도어를 닫으면 도어를 눌러 색을 바꿔요.'));
  const row = h('div', 'pop-row');
  const mv = (t: string, to: number) => { const b = h('button', 'btn-line', t) as HTMLButtonElement; b.disabled = to < 0 || to >= n; b.onclick = () => moveSlot(i, to); row.append(b); };
  mv('◀ 왼쪽으로', i - 1); mv('오른쪽으로 ▶', i + 1);
  pop.append(row);
  accSection(pop, i, () => renderWardPop());                               // 액세서리는 위쪽 — 몸통 목록 아래면 스크롤해야 보였다
  // 칸 폭 — 이 타입의 몸통 폭(설치 폭은 그대로라 양옆 마감이 준다·는다). 폭이 바뀌면 장 모양이 바뀌어 방도 다시 짓는다
  pop.append(h('div', 'pop-sub', '칸 폭'));
  const wrow = h('div', 'slot-widths');
  for (const { w, fits } of pl.slotWidths(d, i)) {
    const b = h('button', w === cur.w ? 'on' : '', `${w}`) as HTMLButtonElement;
    b.disabled = !fits && w !== cur.w;
    b.title = fits ? `${w}mm 몸통으로` : '설치 폭을 넘거나 양옆 마감이 너무 커져요';
    b.onclick = () => {
      if (w === cur.w) return;
      const ids = pl.bodiesOfWidth(d, i, w);
      const same = ids.find(id => pl.bodyCategory(pl.c(id).name) === pl.bodyCategory(cur.name));
      s.bodyId = same ?? ids[0]; s.doors = undefined; s.drawerColorId = null;
      void rebuild(); render(); renderWardPop();
    };
    wrow.append(b);
  }
  pop.append(wrow);
  // 몸통 — 지금 폭의 몸통(이름·폭마다 하나). 같은 폭이라 장 자리가 그대로 — 빠른 다시 짓기
  const groups = new Map<string, number[]>(), seen = new Set<string>();
  [...def.bodies.filter(b => pl.c(b.id).w === cur.w), ...pl.bodiesOfWidth(d, i, cur.w).map(id => ({ id }))].forEach(b => {
    const c = pl.c(b.id), key = c.name + '|' + c.w;
    if (seen.has(key)) return; seen.add(key);
    const g = pl.bodyCategory(c.name); groups.set(g, [...(groups.get(g) ?? []), b.id]);
  });
  for (const [g, ids] of groups) {
    pop.append(h('div', 'pop-sub', g));
    ids.forEach(id => {
      const c = pl.c(id), diff = c.price - cur.price;
      const b = h('button', 'pop-item' + (c.name === cur.name && c.w === cur.w ? ' on' : ''),
        `<img src="${img(c.thumb)}" alt=""><span>${c.name}</span><small>${diff === 0 ? '' : (diff > 0 ? '+' : '') + won(diff) + '원'}</small>`);
      b.onclick = () => { s.bodyId = id; void rebuild(false, true); render(); renderWardPop(); };
      b.oncontextmenu = e => { e.preventDefault(); showDetail(c.name, [img(c.detailImg ?? c.thumb)]); };
      pop.append(b);
    });
  }
  const close = h('button', 'pop-close', '닫기'); close.onclick = () => unpickWard(); pop.append(close);
}
/** 칸 i 고르기 — 도어 숨김 · 칸 메뉴 · 그 칸만 따로 지어 띄운다 */
function pickWardSlot(i: number) {
  if (!built) return;
  wardSlot = i; selSlot = i; setDoorOpen(built, doorOpen, doorsHidden()); renderWardPop(); void rebuild(false, true);
}
function unpickWard() {
  if (wardSlot == null) return;
  wardSlot = null;
  const pop = $('#door-pop'); if (pop.dataset.kind === 'slot') pop.hidden = true;
  if (built) setDoorOpen(built, doorOpen, doorsHidden());                 // 고르기를 풀면 도어 다시
  applyLift(); drawOverlay();
}
// ---- 끄는 칸 띄우기 — 끄는 동안 앞으로 LIFT 만큼 · x 는 손 위치, 놓으면 제자리로. 목표로 부드럽게 다가간다(liftAnim)
const LIFT = 0.18;
let liftG: THREE.Object3D | null = null;
const liftTo = new THREE.Vector2();                                          // (x, z) 목표 — 칸 무리 좌표
function applyLift() {
  if (!built) return;
  const s = wardSlot != null && wardOpen() ? built.slots[wardSlot] : null;
  const prev = liftG;
  // 앞 칸이 지금 있던 자리(손 위치 · 띄운 높이) — 끄는 중 다시 지은 장의 새 칸이 그 자리에서 바로 이어 간다(다시 튀어나오는 깜박임 없이)
  const carry = prev ? { x: prev.position.x, up: prev.position.z - (prev.userData.baseZ ?? prev.position.z) } : null;
  if (prev && (!s || s.group !== prev)) {
    // 다른 칸 · 해제 · 다시 지은 장 — 앞 칸은 제자리로
    prev.position.x = prev.userData.baseX ?? prev.position.x; prev.position.z = prev.userData.baseZ ?? prev.position.z;
    liftG = null; stage.markDirty();
  }
  if (!s) return;
  const g = s.group;
  g.userData.baseX ??= g.position.x; g.userData.baseZ ??= g.position.z;
  if (carry && prev !== g && wardDrag?.live) { g.position.x = carry.x; g.position.z = g.userData.baseZ + carry.up; }
  liftG = g;
  // 선택과 이동을 나눈다(사용자 지시 2026-11-09 「선택한 채 다른 장으로 교체도 하니 선택 상태와 이동 상태가 구분돼야」) —
  // 고르기만 하면 제자리(외곽선 · 칸 메뉴), 끄는 동안만 앞으로 튀어나와 손을 따라가고 놓으면 제자리로 들어간다
  const wd = wardDrag?.live ? wardDrag : null;
  liftTo.set(wd ? (wd.r0[0] + wd.r0[1]) / 2 + wd.dx : g.userData.baseX, g.userData.baseZ + (wd ? LIFT : 0));
}
(function liftAnim() {
  requestAnimationFrame(liftAnim);
  const g = liftG as THREE.Object3D | null; if (!g) return;   // 즉시 실행이라 TS 가 null 로 좁혀 본다
  const nx = g.position.x + (liftTo.x - g.position.x) * 0.35, nz = g.position.z + (liftTo.y - g.position.z) * 0.25;
  if (Math.abs(nx - g.position.x) + Math.abs(nz - g.position.z) < 1e-5) return;
  g.position.x = nx; g.position.z = nz; stage.markDirty();
})();
/** 고르지 않은 칸을 누른 자리 — 떼었을 때 5px 안이고 화면이 안 움직였으면 고른다 */
let wardClick: { i: number; sx: number; sy: number; t: number } | null = null;
cv.addEventListener('pointerdown', e => {
  wardClick = null;
  if (e.button !== 0 || stage.mode !== 'raster' || !built || !design || !wardOpen()) return;
  // 고른 칸 위면 다른 검사 없이 그 칸을 잡는다 — 설비·가구·도어 검사는 고르지 않은 칸을 고를 때만
  const selHit = wardSlot != null && !!built.slots[wardSlot] && stage.hitsGroup(e, built.slots[wardSlot].group);
  const i = selHit ? wardSlot! : stage.pickSlot(e);
  if (i == null) return;
  if (!selHit && stage.pickFixture(e)) return;                           // 장 뒤 설비(주황 표시)는 설비 고르기가 먼저
  if (!selHit && stage.pickDoor(e)) return;                                // 도어를 누르면 도어(열려 있어도) — 칸은 몸통 영역만(사용자 지적 2026-11-09 「도어까지 장으로 봐서 몸통 밖인데 장이 선택돼」)
  if (!selHit && picked === 'furn' && selUnit && stage.unitsAt(e).some(x => x.userData.hvUnit === selUnit)) return;
  if (!selHit && stage.pickUnit(e)) return;                                           // 장 앞을 가린 가구(침대 등)는 가구 고르기가 먼저
  // 고르기 = 클릭(외곽선만), 옮기기 = 고른 칸을 누른 채 끌기(그때만 튀어나와 손을 따라간다) — 사용자 지시 2026-11-09
  // 「선택만 하면 라인만, 선택된 상태에서 누르고 드래그하면 애니메이션되며 이동」. 고르지 않은 칸을 끌면 화면 회전
  if (wardSlot !== i) { wardClick = { i, sx: e.clientX, sy: e.clientY, t: performance.now() }; return; }
  const p = stage.frontPlaneAt(e); if (!p) return;
  const ranges = built.slots.map(o => [o.x0, o.x1] as [number, number]);
  wardDrag = { i0: i, cur: i, order: [...design.slots], seqs: design.slots.map(x => x.slotSeq), ranges, r0: ranges[i], sx: e.clientX, sy: e.clientY, x0: p.x, dx: 0, live: false, wasSel: true };
  stage.controls.enabled = false; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (!wardDrag) {
    if (!e.buttons && stage.mode === 'raster' && built && wardOpen() && performance.now() - movedAt > 250) {
      const k = stage.pickSlot(e), over = k != null && !stage.pickDoor(e);
      // 고른 칸 = 잡는 손(끌어 옮기기), 고르지 않은 칸 = 누르는 손(클릭해 고르기)
      if (over) cv.style.cursor = k === wardSlot ? 'grab' : 'pointer'; else if (cv.style.cursor === 'grab') cv.style.cursor = '';
    }
    return;
  }
  const wd = wardDrag;
  if (!wd.live) {
    if (Math.hypot(e.clientX - wd.sx, e.clientY - wd.sy) <= 5) return;
    wd.live = true;
  }
  const p = stage.frontPlaneAt(e); if (!p || !built || !design) return;
  const W = wd.ranges[wd.ranges.length - 1][1], [a0, b0] = wd.r0;
  wd.dx = THREE.MathUtils.clamp(p.x - wd.x0, wd.ranges[0][0] - a0, W - b0);   // 점선 상자가 장 밖으로 나가지 않게
  // 놓일 자리 — 오른쪽으로 끌면 끄는 칸 오른쪽 끝이, 왼쪽으로 끌면 왼쪽 끝이 넘어선 칸 가운데 수만큼(처음 자리 기준).
  // 가운데끼리 비교하면 폭이 다른 칸(1000 ↔ 900)은 장 끝까지 끌어도 옆 칸 가운데를 못 넘어 바뀌지 않았다
  const mid = (r: [number, number]) => (r[0] + r[1]) / 2;
  const to = wd.i0 + wd.ranges.filter((r, k) => k > wd.i0 && mid(r) < b0 + wd.dx).length - wd.ranges.filter((r, k) => k < wd.i0 && mid(r) > a0 + wd.dx).length;
  if (to !== wd.cur) {
    // 실시간 — 그 순서로 바로 다시 짓는다(사용자 지시 2026-11-09 「이동하면 장이 바뀌는 형태가 실시간으로」). 자리 규격(slotSeq)은 자리에 남긴다
    const arr = wd.order.filter((_, k) => k !== wd.i0); arr.splice(to, 0, wd.order[wd.i0]);
    arr.forEach((x, k) => (x.slotSeq = wd.seqs[k]));
    design.slots = arr; wd.cur = to; wardSlot = to; selSlot = to;
    void rebuild(false, true); renderWardPop();
  }
  applyLift();
}, true);
cv.addEventListener('pointerup', e => {
  if (!wardDrag) {
    // 고르지 않은 칸 클릭 — 끌었거나 누르는 동안 화면이 움직였으면(회전·이동·관성) 고르지 않는다
    const wc = wardClick; wardClick = null;
    if (!wc || e.button !== 0 || !built || !design || !wardOpen()) return;
    if (Math.hypot(e.clientX - wc.sx, e.clientY - wc.sy) > 5 || camMovedAt > wc.t) return;
    e.stopImmediatePropagation();                                          // 아래 「빈 곳 클릭 = 고르기 풀기」까지 가지 않게
    if (picked && picked !== 'furn') { picked = null; roomDoorPop.hidden = true; windowPop.hidden = true; }
    if (selFix) unpickFix();
    pickWardSlot(wc.i);
    return;
  }
  const wd = wardDrag; wardDrag = null;
  stage.controls.enabled = true; cv.style.cursor = '';
  e.stopImmediatePropagation();                                            // 아래 칸·도어 고르기 클릭까지 막는다(doorDragged 를 켜면 끄는 처리가 막혀 다음 클릭이 사라진다)
  if (picked && picked !== 'furn') { picked = null; roomDoorPop.hidden = true; windowPop.hidden = true; }
  if (selFix) unpickFix();
  if (!wd.live && wd.wasSel) { unpickWard(); return; }                    // 고른 칸을 다시 누르면 고르기 취소
  wardSlot = wd.cur; selSlot = wd.cur;
  if (wd.live && wd.cur !== wd.i0) { saveDesign(); render(); }             // 순서는 끄는 동안 이미 바꿔 지었다
  renderWardPop(); applyLift();                                            // 놓으면 칸 자리로 들어가고 고른 채로 남는다
}, true);

// 도어 열림 애니메이션 — 도어 단추는 열린 동안 검게(도어를 여닫는 곳이 여럿이라 여기서 맞춘다)
(function anim() {
  requestAnimationFrame(anim);
  if (!built || doorOpen === doorTarget) return;
  doorOpen = doorTarget > doorOpen ? Math.min(doorTarget, doorOpen + 0.035) : Math.max(doorTarget, doorOpen - 0.035);
  if (doorOpen === doorTarget) stage.sceneChanged({ lightmap: false });   // 도어 열림은 공간 라이트맵을 다시 굽지 않는다
  setDoorOpen(built, doorOpen, doorsHidden()); cullProps();
  stage.markDirty();
})();

// ---------- 방 출입문 — 3D 화면에서 끌어 벽을 따라 옮긴다. 문이 열리는 자리(파란 부채꼴)가 장 앞 자리와 겹치면
// 그만큼 비우고 남은 곳에 장을 다시 놓는다(사용자 지시 2026-10-29: 「왼쪽에 문이 있어 열고 닫아야 하면 왼쪽 공간을 확보하고 설계」)
const DOOR_KEY = 'storage-planner.roomdoor.v1';
function loadDoor(): RoomDoor | null {
  try {
    const raw = localStorage.getItem(DOOR_KEY);
    if (raw === 'none') return null;
    const d = raw ? JSON.parse(raw) as RoomDoor : null;
    if (d && ['left', 'right', 'back', 'front'].includes(d.wall)) return d;
  } catch { /* 기본 문 */ }
  // 기본 = 왼쪽 벽, 장 바로 옆(장 앞 통로 끝) — 통로는 어차피 비워 두는 자리라 가구 자리를 가장 덜 먹는다.
  // 침대 벽 끝에 두었을 땐 84A 작은 방에서 침대·책상이 들어갈 자리가 모자랐다(실측)
  return { wall: 'left', t: 1.3, w: 0.9, hinge: 'R' };
}
/** user = 사용자가 고친 방문 — 홈뷰 방은 방·장 벽별로 따로 기억해, 다시 열거나 벽·크기를 바꿔도 원본 방문으로 덮지 않는다(사용자 지적 2026-11-03) */
function saveDoor(user = false) {
  try { localStorage.setItem(DOOR_KEY, roomDoor ? JSON.stringify(roomDoor) : 'none'); } catch { /* 이번 화면엔 그대로 */ }
  if (user && hvRoom) { userDoor[winKey()] = roomDoor ? { ...roomDoor } : null; try { localStorage.setItem(USERDOOR_KEY, JSON.stringify(userDoor)); } catch { /* 이번 화면엔 그대로 */ } }
}
let roomDoor: RoomDoor | null = loadDoor();
let doorNote = '';
stage.door = roomDoor;

// ---- 설치 가능 길이 · 장 조합 미리 계산(사용자 지시 2026-11-05).
// 고른 벽에 방문이 있으면 문(문틀 몰딩 포함)과 열림 자리를 빼고, 없으면 벽 전체. 창 있는 벽은 장 벽으로 고를 수 없다.
// 빼는 자리는 장 자리 계산(wardrobeSpot)과 같은 함수(doorBlock) 하나로 — 둘이 따로 셈하던 때는 추천 목록과 실제 배치가 어긋났다
// (사용자 지적 2026-11-05 「도어 문틀 50 빼고 나머지 공간에 배치 가능한 장 조합으로 추천하고 배치 — 꼬이더라」)
const DOOR_CASING = 0.07;   // 방문 문틀 몰딩 폭 — scene.ts 문틀(cw)과 같은 값
const DOOR_GAP = 0.05;      // 문틀(옆벽 문은 열리는 자리)과 장 사이 간격 50mm
/** 설치 공간(0 ~ S, m) 중 방문 때문에 비워야 하는 구간 [ba, bb](mm 단위로 반올림한 m). 장 벽 문 = 문 + 양옆 문틀 + 간격,
 *  옆벽·맞은편 문 = 열리며 쓸고 지나는 자리가 장 앞(장 깊이 + 도어 여는 자리 55cm)에 걸칠 때 그 폭 + 간격. 걸치지 않으면 null */
function doorBlock(S: number, frontZ: number, x0: number, x1: number): [number, number] | null {
  if (!roomDoor) return null;
  const d = roomDoor, w = d.w, D = 5.4;
  let r: [number, number, number, number];                  // x0, x1, z0, z1
  switch (d.wall) {
    case 'left': r = [x0, x0 + w, d.t, d.t + w]; break;
    case 'right': r = [x1 - w, x1, d.t, d.t + w]; break;
    case 'back': r = [x0 + d.t - DOOR_CASING, x0 + d.t + w + DOOR_CASING, 0, w]; break;
    default: r = [x0 + d.t, x0 + d.t + w, D - w, D];
  }
  if (r[2] >= frontZ + 0.55 || r[3] <= 0) return null;
  const ba = Math.round((r[0] - DOOR_GAP) * 1000) / 1000, bb = Math.round((r[1] + DOOR_GAP) * 1000) / 1000;
  return bb <= 0 || ba >= S ? null : [ba, bb];
}
type WallCap = { Lw: number; door: { a: number; b: number; w: number; side: boolean } | null; runs: [number, number][]; best: [number, number] };
function wallCapacity(avoid = wardAvoidFix): WallCap {
  const Lw = wallLen();
  const blk = roomDoor ? doorBlock(Lw / 1000, built?.frontZ ?? 0.63, 0, Lw / 1000) : null;
  const door = blk ? { a: Math.max(0, Math.round(blk[0] * 1000)), b: Math.min(Lw, Math.round(blk[1] * 1000)), w: Math.round(roomDoor!.w * 1000), side: roomDoor!.wall !== 'back' } : null;
  // 방문 자리를 뺀 자리들(방문 문구용) — 두 자리 길이가 같으면 왼쪽(wardrobeSpot 과 같은 규칙)
  const runs = (door ? [[0, door.a], [door.b, Lw]] as [number, number][] : [[0, Lw]] as [number, number][]).filter(r => r[1] - r[0] > 0);
  const blocks = [...(blk ? [blk] : []), ...(avoid ? fixBlocks() : [])];
  const [a, b] = blocks.length ? bestRun(Lw / 1000, blocks) : [0, Lw / 1000];
  return { Lw, door, runs, best: [Math.round(a * 1000), Math.round(b * 1000)] };
}
/** 길이 L(mm)에 놓을 몸통 조합 — 계산 구성(catalog synthPlan)과 같은 규칙: 800 이상 몸통 여러 개 + 좁은 몸통(800 미만)은 끝에 하나까지.
 *  양옆 써라운딩 각 0~SIDE_MAX 로 L 을 꽉 채우는 조합(써라운딩 작은 순 → 칸 수 적은 순). 그런 조합이 없으면(몸통 폭 사이에 낀 길이)
 *  가장 크게 들어가는 조합 — 장 크기 = 몸통 + 양옆 써라운딩 SIDE_MAX, 남는 자리(spare)는 비운다(문 쪽) */
type Combo = { ws: number[]; sum: number; side: number; width: number; spare: number };
function combosFor(typeId: number, L: number): Combo[] {
  const ws = pl.bodyWidths(typeId);
  const full = ws.filter(w => w >= 800), short = ws.filter(w => w < 800);
  const all: Combo[] = [], seen = new Set<string>();
  const add = (pick: number[]) => {
    const sum = pick.reduce((n, w) => n + w, 0);
    if (!pick.length || sum > L) return;
    const k = pick.join(','); if (seen.has(k)) return; seen.add(k);
    const width = Math.min(L, sum + 2 * SIDE_MAX);
    all.push({ ws: pick, sum, side: (width - sum) / 2, width, spare: L - width });
  };
  const walk = (i: number, pick: number[], sum: number) => {
    if (all.length > 3000 || pick.length > 10) return;
    add(pick); for (const s of short) if (sum + s <= L) add([...pick, s]);
    for (let j = i; j < full.length; j++) if (sum + full[j] <= L) walk(j, [...pick, full[j]], sum + full[j]);
  };
  walk(0, [], 0);
  const fit = all.filter(c => c.spare === 0);
  if (fit.length) return fit.sort((x, y) => x.side - y.side || x.ws.length - y.ws.length);
  return all.sort((x, y) => x.spare - y.spare || x.ws.length - y.ws.length);
}
/** 자동 조합 — 써라운딩이 가장 얇은 조합(combosFor 첫째 = 추천 목록 맨 위)(사용자 지시 2026-11-06 「자동선택은 써라운딩이 가장 얇은 조합으로」).
 *  예전엔 한샘 구성표가 먼저였고 계산 구성도 좁은 몸통·칸 수에 점수를 매겨 목록 맨 위와 달랐다. 구성표가 같은 몸통·폭이면 구성표를 쓴다 */
const bodyKey = (ws: number[]) => [...ws].sort((a, b) => b - a).join(',');
function autoDesign(typeId: number, L: number, keep?: Design): Design | null {
  const c = combosFor(typeId, L)[0];
  if (!c) return null;
  const nd = pl.newDesign(typeId, c.width, keep);
  if (nd && bodyKey(nd.slots.map(s => pl.c(s.bodyId)?.w ?? 0)) === bodyKey(c.ws)) return nd;
  return pl.pickDesign(typeId, c.width, c.ws, keep);
}
function capBox(t: TypeDef) {
  const el = h('div', 'rec-box cap-box');
  const cap = wallCapacity(), mmf = (v: number) => Math.round(v).toLocaleString();
  const L = cap.best[1] - cap.best[0], minW = pl.minWidth(t.id);
  if (cap.door) {
    el.append(h('p', 'rec-text', cap.door.side
      ? `옆벽 방문(${mmf(cap.door.w)}mm)이 열리는 자리가 장 앞에 걸쳐요. 거기서 50mm 띄워 <b>${mmf(cap.door.a)} ~ ${mmf(cap.door.b)}mm</b> 구간은 장을 놓을 수 없어요.`
      : `이 벽에 방문(${mmf(cap.door.w)}mm)이 있어요. 문과 문틀에 50mm 간격까지 <b>${mmf(cap.door.a)} ~ ${mmf(cap.door.b)}mm</b> 구간은 장을 놓을 수 없어요.`));
    el.append(h('p', 'rec-text', `놓을 수 있는 자리 — ${cap.runs.map(r => `${r[0] === 0 ? '왼쪽' : '오른쪽'} ${mmf(r[1] - r[0])}mm`).join(' · ') || '없음'}`));
  } else el.append(h('p', 'rec-text', `이 벽엔 방문이 없어 벽 전체 ${mmf(cap.Lw)}mm 에 장을 놓을 수 있어요.`));
  if (fixCases(el, t)) return el;
  if (L < minW) { el.append(h('p', 'rec-text', `가장 긴 자리가 ${mmf(L)}mm 라 ${t.name}(최소 ${mmf(minW)}mm)이 들어가지 않아요.`)); return el; }
  const list = combosFor(t.id, L), partial = list.length > 0 && list[0].spare > 0;
  el.append(h('p', 'rec-text', partial
    ? `<b>자리 ${mmf(L)}mm</b> — 양옆 써라운딩 0~${SIDE_MAX}mm 로 꽉 맞는 조합이 없어요. 가장 크게 들어가는 조합이에요(남는 자리는 문 쪽에 비워요).`
    : `<b>장 크기 최대 ${mmf(L)}mm</b> — 들어가는 장 조합(양옆 써라운딩 각 0~${SIDE_MAX}mm)`));
  const key = bodyKey;
  // 자동 = 「최대 크기로 놓기」가 고르는 것(placeAt → autoDesign) — 목록 맨 위(써라운딩이 가장 얇은 조합)
  const autoKey = list[0] ? key(list[0].ws) : '';
  // 지금 놓인 장 — 이 자리에 그 크기로 놓여 있을 때만 그 조합을 표시
  const curKey = design ? key(design.slots.map((_, i) => pl.c(pl.bodyFor(design!, i).id).w)) : '';
  // 조합을 누르면 그 조합으로 이 자리에 바로 놓는다(사용자 지시 2026-11-05 「전체 공간에 배치 가능하면 선택되도록」)
  const ul = h('ul', 'cap-list');
  for (const c of list.slice(0, 6)) {
    const k = key(c.ws), isAuto = k === autoKey, on = k === curKey && design!.width === c.width;
    const li = h('li', on ? 'on' : '', `<span>${c.ws.map(w => mmf(w)).join(' + ')}</span><small>몸통 ${mmf(c.sum)} · 써라운딩 각 ${mmf(c.side)}mm${c.spare ? ` · 남는 자리 ${mmf(c.spare)}mm` : ''}${isAuto ? ' · 자동' : ''}${on ? ' · 선택됨' : ''}</small>`);
    li.tabIndex = 0; li.setAttribute('role', 'button'); li.title = '이 조합으로 놓기';
    li.onclick = () => placeAt(cap, L, c);
    li.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); placeAt(cap, L, c); } };
    ul.append(li);
  }
  if (!list.length) ul.append(h('li', '', `<small>${mmf(L)}mm 에 들어가는 몸통이 없어요.</small>`));
  el.append(ul);
  if (list.length > 6) el.append(h('p', 'rec-text', `외 ${list.length - 6}가지 — 몸통 탭에서 칸마다 폭을 바꿔 고를 수 있어요.`));
  const b = h('button', 'btn-gray', `최대 크기로 놓기 · ${mmf(list[0]?.width ?? L)}mm (자동 조합)`) as HTMLButtonElement;
  b.onclick = () => placeAt(cap, L);
  el.append(b);
  return el;
}
/** 장 벽에 설비(콘센트·스위치·멀티패널·통신단자함)가 장 자리에 걸릴 때 — 모든 경우를 보여 주고 사용자가 고른다(사용자 지시 2026-11-09
 *  「설비를 가리든 안 가리든 모든 경우의 수를 체크해 배치 가능을 추천 — 사용자가 판단하게」).
 *   ① 가리고 놓기 — 방문만 피한 가장 긴 자리, 들어가는 조합들
 *   ② 피해서 놓기 — 방문·설비(양옆 50mm)로 나뉜 자리마다, 들어가는 조합들(장이 안 들어가는 자리도 흐리게 보여 준다)
 *  누르면 그 자리 · 그 조합으로 놓는다(design.run). 설비가 장 자리에 없으면 false — 예전 목록 그대로 */
function fixCases(el: HTMLElement, t: TypeDef): boolean {
  if (!design) return false;
  const cover = wallCapacity(false), fb = fixBlocks(), wf = wallFixtures(), mmf = (v: number) => Math.round(v).toLocaleString();
  const inRun = wf.filter((_, i) => fb[i][1] * 1000 > cover.best[0] && fb[i][0] * 1000 < cover.best[1]);
  if (!inRun.length) return false;
  const minW = pl.minWidth(t.id), Lw = cover.Lw;
  const names = inRun.map(f => `${FIXTURE_SPEC[f.kind].name}(왼쪽 벽에서 ${mmf((stage.fixtureFrame(f).p.x - fixtureSize(f).w / 2) * 1000)}mm)`).join(' · ');
  el.append(h('p', 'rec-text', `장 자리에 <b>${names}</b>${josa(FIXTURE_SPEC[inRun[inRun.length - 1].kind].name)} 있어요. 놓을 수 있는 경우를 모두 보여 드려요 — 골라 주세요.`));
  const curKey = bodyKey(design.slots.map((_, i) => pl.c(pl.bodyFor(design!, i).id).w)), curOff = design.offset ?? 0;
  /** 자리 [a, b](mm)에 들어가는 조합 목록 — 누르면 그 자리에 */
  const list = (run: [number, number], avoid: boolean, n: number) => {
    const L = run[1] - run[0], ul = h('ul', 'cap-list');
    const cs = L >= minW ? combosFor(t.id, L).slice(0, n) : [];
    for (const c of cs) {
      const on = wardAvoidFix === avoid && bodyKey(c.ws) === curKey && design!.width === c.width && curOff >= run[0] - 1 && curOff + design!.width <= run[1] + 1;
      const li = h('li', on ? 'on' : '', `<span>${c.ws.map(w => mmf(w)).join(' + ')}</span><small>장 ${mmf(c.width)} · 써라운딩 각 ${mmf(c.side)}mm${c.spare ? ` · 남는 자리 ${mmf(c.spare)}mm` : ''}${on ? ' · 선택됨' : ''}</small>`);
      li.tabIndex = 0; li.setAttribute('role', 'button'); li.title = '이 자리 · 이 조합으로 놓기';
      const go = () => placeAt(wallCapacity(avoid), L, c, run, avoid);
      li.onclick = go; li.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } };
      ul.append(li);
    }
    if (!cs.length) ul.append(h('li', 'cap-none', `<small>${mmf(L)}mm — ${t.name}(최소 ${mmf(minW)}mm)이 들어가지 않아요</small>`));
    return ul;
  };
  // ① 가리고 놓기
  el.append(h('p', 'case-head', `<b>① 설비를 가리고 놓기</b> · 자리 ${mmf(cover.best[1] - cover.best[0])}mm`));
  el.append(h('p', 'case-note', '설비가 장 뒤로 가려져요 — 그대로 가릴지, 위치를 옮길지(전기·통신 공사) 미리 정해야 해요.'));
  el.append(list(cover.best as [number, number], false, 3));
  // ② 피해서 놓기 — 막힌 곳(방문 · 설비 양옆 50mm) 사이 자리마다
  const doorB = cover.door ? [{ a: cover.door.a, b: cover.door.b, name: '방문' }] : [];
  const fixB = wf.map((f, i) => ({ a: Math.round(fb[i][0] * 1000), b: Math.round(fb[i][1] * 1000), name: FIXTURE_SPEC[f.kind].name }));
  const blocks = [...doorB, ...fixB].map(x => ({ ...x, a: Math.max(0, x.a), b: Math.min(Lw, x.b) })).filter(x => x.b > x.a).sort((p, q) => p.a - q.a);
  const runs: { a: number; b: number; left: string; right: string }[] = [];
  let at = 0, left = '왼쪽 벽';
  for (const bk of blocks) { if (bk.a > at + 1) runs.push({ a: at, b: bk.a, left, right: bk.name }); if (bk.b > at) { at = bk.b; left = bk.name; } }
  if (Lw > at + 1) runs.push({ a: at, b: Lw, left, right: '오른쪽 벽' });
  runs.sort((p, q) => (q.b - q.a) - (p.b - p.a));
  el.append(h('p', 'case-head', `<b>② 설비를 피해서 놓기</b> · 설비 양옆 50mm 를 비운 자리 ${runs.length}곳`));
  el.append(h('p', 'case-note', '콘센트·단자함·스위치를 그대로 쓸 수 있어요. 자리마다 들어가는 장을 보여 드려요.'));
  runs.forEach((r, k) => {
    el.append(h('p', 'case-run', `자리 ${k + 1} · ${r.left} ~ ${r.right} <b>${mmf(r.b - r.a)}mm</b> <small>(${mmf(r.a)} ~ ${mmf(r.b)})</small>`));
    el.append(list([r.a, r.b], true, 2));
  });
  const b = h('button', 'btn-gray', '가장 크게 놓기 (설비를 가리고)') as HTMLButtonElement;
  b.onclick = () => placeAt(cover, cover.best[1] - cover.best[0], undefined, undefined, false);
  el.append(b);
  return true;
}
/** 고른 벽의 가장 긴 자리에 — c 가 있으면 그 몸통 조합으로, 없으면 자동 조합(autoDesign — 써라운딩이 가장 얇은 조합, 꽉 맞는 게 없으면 가장 크게 들어가는 조합).
 *  자동도 지금 몸통을 늘려 쓰지 않고 새로 짠다 — 예전엔 직전에 고른 조합이 남았다 */
function placeAt(cap: WallCap, L: number, c?: Combo, run?: [number, number], avoid?: boolean) {
  if (!design) return;
  // 고른 자리(사이즈 추천 목록) — 없으면 가장 긴 자리
  if (avoid != null) { wardAvoidFix = avoid; setAvoidPref(avoid); }
  design.run = run;
  if (!wardShown) { wardShown = true; stage.setRoomPlan(roomPlan()); }
  // 벽 전체를 설치 공간으로 — 방문이 있으면 fitToSpace(wardrobeSpot)가 같은 값으로 문 자리를 빼고 긴 쪽에 놓는다
  design.space = cap.Lw; selSlot = 0;
  if (stage.layout !== 'fit') { stage.setLayout('fit'); try { localStorage.setItem(LAYOUT_KEY, 'fit'); } catch { /* 이번 화면엔 반영 */ } }
  const nd = c ? pl.pickDesign(design.typeId, c.width, c.ws, design) : autoDesign(design.typeId, L, design);
  if (nd) design = { ...nd, space: design.space, offset: design.offset, wear: design.wear, run: design.run };   // 폭이 자리에 맞으면 fitToSpace 가 다시 짜지 않고 자리만 잡는다
  syncEP(); fitToSpace(true); savePlan();
}

/** 설치 공간 S(m) 안에서 문 열림 자리를 피한 장 자리 [a, b] — 장 앞 자리 = 장 깊이 + 장 도어 여는 자리 55cm */
function wardrobeSpot(S: number, frontZ: number): { a: number; b: number; blocked: boolean } {
  const full = { a: 0, b: S, blocked: false };
  // 방문이 없는 벽이어도 장 벽 설비(피해서 놓기)는 본다 — 예전엔 방문이 없으면 바로 벽 전체를 돌려 설비 자리가 빠졌다(사용자 지적 2026-11-09)
  const L = stage.layout, x0 = L === 'openL' || L === 'openBoth' ? -stage.openW.L : 0, x1 = S + (L === 'openR' || L === 'openBoth' ? stage.openW.R : 0);
  const blk = roomDoor ? doorBlock(S, frontZ, x0, x1) : null;
  const blocks = [...(blk ? [blk] : []), ...(wardAvoidFix ? fixBlocks() : [])];
  // 사이즈 추천에서 고른 자리 — 공간 안이고 막힌 곳과 안 겹치면 그 자리(설비·방문을 옮겨 겹치게 되면 가장 긴 자리로)
  const pick = design?.run;
  if (pick) {
    const a = pick[0] / 1000, b = pick[1] / 1000;
    if (a >= -1e-6 && b <= S + 1e-6 && b - a > 0.05 && !blocks.some(([p, q]) => p < b - 1e-4 && q > a + 1e-4)) return { a, b, blocked: a > 1e-6 || b < S - 1e-6 };
  }
  if (!blocks.length) return full;
  const [a, b] = bestRun(S, blocks);
  return { a, b, blocked: true };
}
// ---- 장 벽 콘센트·통신단자함 — 장 자리 추천에 같이 넣는다(사용자 지시 2026-11-06 「콘센트나 통신단자함이 있으면 그 크기를 같이 계산해서 배치 추천 —
// 뺀 것과 더한 것 둘 다 추천하고 내용도 적어놔」). 가리고 놓기 = 벽 자리 그대로(설비는 장 뒤로), 피해서 놓기 = 설비 양옆 50mm 까지 비우고 남는 가장 긴 자리
const FIX_GAP = 0.05;
/** 장 벽(뒤 벽)에 있는 콘센트·통신단자함 — 뺀 것 제외 */
const wallFixtures = () => fixtures.filter(f => !f.del && f.wall === 'back' && (f.kind === 'outlet' || f.kind === 'telecom' || f.kind === 'switch' || f.kind === 'multi'));
/** 그 설비 자리 [a, b](m, 장 공간 좌표) — 설비 폭 + 양옆 50mm */
function fixBlocks(): [number, number][] {
  return wallFixtures().map(f => { const x = stage.fixtureFrame(f).p.x, w = fixtureSize(f).w / 2 + FIX_GAP; return [Math.round((x - w) * 1000) / 1000, Math.round((x + w) * 1000) / 1000] as [number, number]; });
}
/** 0 ~ S 에서 막힌 구간을 뺀 가장 긴 자리(같으면 왼쪽) */
function bestRun(S: number, blocks: [number, number][]): [number, number] {
  const bs = blocks.map(([a, b]) => [Math.max(0, a), Math.min(S, b)] as [number, number]).filter(([a, b]) => b > a).sort((p, q) => p[0] - q[0]);
  const runs: [number, number][] = []; let at = 0;
  for (const [a, b] of bs) { if (a > at) runs.push([at, a]); at = Math.max(at, b); }
  if (S > at) runs.push([at, S]);
  return runs.reduce((x, y) => (y[1] - y[0] > x[1] - x[0] + 1e-9 ? y : x), runs[0] ?? [0, 0]);
}
/** 설치 공간·문 자리에 맞춰 장 폭·자리를 정하고 다시 만든다 */
/** 방 크기·설치할 벽을 장면에 — 깊이·높이, 그리고 장 자리를 다시 */
function applyRoom(keepSpot = false) {
  // 방문을 새 벽 안으로 — 침대 벽(맞은편)의 창 쪽 끝에 있던 문은 그 끝을 지킨다
  if (roomDoor) {
    const span = (roomDoor.wall === 'back' || roomDoor.wall === 'front' ? wallLen() : roomDepth()) / 1000;
    roomDoor.t = Math.min(roomDoor.t, Math.max(0.08, span - roomDoor.w - 0.15));
    saveDoor(); stage.setDoor(roomDoor);
  }
  stage.setRoomDims(roomDepth() / 1000, roomDims.h / 1000); fitToSpace(true, keepSpot);
}
/** keepSpot = 저장된 장 폭·자리 그대로(공간 구조·오픈 폭만 맞춘다) — 처음 열 때 설비를 방에 맞춰 옮기기 전(stage.fixAuto).
 *  그때 다시 계산하면 옮기기 전 설비 자리로 장 자리가 나와(2320 → 2691), 설비를 옮긴 뒤 원래 자리(2320)로 돌아오며
 *  방을 한 번 더 지었다 — 처음 열기 기록(loadlog)에 「공간 다시 짓기: 장 자리·칸」(실측 2026-11-12). 설비를 옮긴 뒤엔 fixChanged 가 다시 맞춘다 */
function fitToSpace(resetView = false, keepSpot = false) {
  if (!design) return;
  const t = pl.type(design.typeId);
  // 장 크기(설치 폭)는 벽 길이 안. 꽉 채우기면 벽 전체, 아니면 남는 자리를 공간 구조대로 — 오른쪽 오픈 = 오른쪽에, 왼쪽 오픈 = 왼쪽에, 양쪽 = 나눠
  const Lw = wallLen();
  if (stage.layout === 'fit') design.space = Lw;
  design.space = Math.min(design.space ?? design.width, Lw);
  const gap = Math.max(0, Lw - design.space) / 1000;
  const L = stage.layout;
  stage.openW = L === 'openR' ? { L: 0, R: gap } : L === 'openL' ? { L: gap, R: 0 } : L === 'openBoth' ? { L: gap * gapSplit, R: gap * (1 - gapSplit) } : { L: 0, R: 0 };
  if (keepSpot) { syncEP(); rebuild(resetView); render(); return; }
  const S = (design.space ?? design.width) / 1000;
  const minW = pl.minWidth(t.id);
  // 자동(사용자가 가리기·피하기를 안 골랐다) — 설비를 피해서 장이 들어가면 피하고, 안 들어가면 가린다
  if (avoidPref == null) {
    wardAvoidFix = true;
    const sp = wardrobeSpot(S, built?.frontZ ?? 0.63);
    if ((sp.b - sp.a) * 1000 < minW - 0.5) wardAvoidFix = false;
  } else wardAvoidFix = avoidPref;
  blocksKey = JSON.stringify(fixBlocks());
  const spot = wardrobeSpot(S, built?.frontZ ?? 0.63);
  let w = Math.round((spot.b - spot.a) * 1000);   // 구성표 최대(4200)로 자르지 않는다 — 넘으면 몸통 조합으로 계산
  let off = Math.round(spot.a * 1000);
  doorNote = '';
  if (w < minW) {
    doorNote = `방문이 열리는 자리를 빼면 장 자리가 ${w}mm 라 ${t.name}(최소 ${minW}mm)이 들어가지 않아요 — 방문을 옮기거나 설치 공간을 늘려 주세요.`;
    w = Math.max(minW, Math.round(S * 1000)); off = 0;
  }
  const setW = (w: number) => {
    if (!design || w === design.width) return;
    // 써라운딩부터 — 지금 몸통 그대로 양옆이 0~SIDE_MAX 안이면 칸 구성은 두고 폭만(써라운딩이 늘고 준다). 넘을 때만 장을 다시 짠다(사용자 규칙)
    const sum = pl.layout(design).sum, side = (w - sum) / 2;
    if (side >= 0 && side <= SIDE_MAX) design.width = w;
    else {
      // 자동 조합(써라운딩이 가장 얇은 조합). 꽉 맞는 조합이 없는 자리(몸통 폭 사이에 낀 길이)면 가장 크게 들어가는 조합 —
      // 남는 자리는 비운다(아래에서 문 반대쪽 벽에 붙인다). 예전엔 장을 그대로 둬 문과 겹쳤다
      const nd = autoDesign(design.typeId, w, design);
      if (nd) { design = { ...nd, space: design.space, offset: off, wear: design.wear, run: design.run }; }
    }
  };
  setW(w);
  // 써라운딩이 EP 보다 얇으면 양옆에 EP(벽이 있어도 — syncEP) — 장 폭 바깥에 붙으므로 그 두께만큼 자리를 낸다.
  // 몸통 그대로 써라운딩을 EP 두께 이상으로 키울 수 있으면 그대로 둔다(그러면 EP 가 필요 없다)
  const ep = epThick();
  let epOut = false;
  if (w >= minW && epOutside()) {
    setW(w - 2 * ep);
    if (epOutside()) epOut = true;
    else setW(w);                                // 줄인 조합의 써라운딩이 EP 보다 두껍다 — 원래 폭으로 써라운딩만 키운다
  }
  // 넓은 쪽이 오른쪽이면 오른쪽 벽에 붙인다(남는 자리는 문 쪽으로) · EP 가 바깥에 붙으면 그 두께만큼 띄운다
  if (spot.blocked && spot.a > 0 && w >= minW) off = Math.round(spot.b * 1000) - design.width - (epOut ? ep : 0);
  else if (epOut) off += ep;
  design.offset = off;
  syncEP();                                  // 자리가 정해진 뒤 — 벽에서 떨어진 쪽에 EP
  rebuild(resetView); render();
}

// 끌어서 옮기기 — 문 위에서 누르면 화면 회전 대신 문을 잡는다(캡처 단계 — OrbitControls 보다 먼저)
let doorDrag = false, doorDragged = false;
// 방문·창 선택 — 클릭(누른 자리에서 떼기)으로만 고른다. 누른 채 움직이면 그 아래에 문·창이 있어도 카메라 회전이고,
// 고른 것만 끌어 옮긴다(사용자 지시 2026-10-30: 「클릭 후 마우스를 떼지 않고 회전·이동은 선택이 아니다」)
// ---------- 커튼 — 좌우 자락을 한쪽씩 잡고 레일 따라 끌어 펴거나 모은다(사용자 지시 2026-11-03). 가구·문·창 고르기보다 먼저 받는다
// 고른 커튼만 끈다 — 화면을 돌리려고 누른 자리가 마침 커튼이면 커튼 자락이 끌려 왔다(사용자 지적 2026-11-12 「선택 후 드래그한 것도 아닌데 회전하다 커튼이 선택되면서 드래그」).
// 문·창·가구처럼 클릭(누른 자리에서 떼기)으로 먼저 고른다
let curtainDrag = false;
const unpickCurtain = () => { if (picked === 'curtain') picked = null; stage.markCurtain(false); };
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster' || picked !== 'curtain' || !stage.startCurtainDrag(e)) return;
  curtainDrag = true;
  stage.controls.enabled = false; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'ew-resize';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (curtainDrag) { stage.moveCurtainDrag(e); e.stopImmediatePropagation(); return; }
  if (!e.buttons && stage.mode === 'raster' && stage.pickCurtain(e)) cv.style.cursor = picked === 'curtain' ? 'ew-resize' : 'pointer';
}, true);
cv.addEventListener('pointerup', e => {
  if (!curtainDrag) return;
  curtainDrag = false; stage.controls.enabled = true; cv.style.cursor = '';
  if (stage.endCurtainDrag()) saveMoves();
  e.stopImmediatePropagation();
}, true);

let selUnit: string | null = null;          // 고른 가구 묶음(홈뷰 꾸밈)
let pickDown: { x: number; y: number; door: boolean; win: boolean; cur: boolean; fix: string | null; unit: string | null } | null = null;
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster') { pickDown = null; return; }
  const door = !!roomDoor && stage.hitsRoomDoor(e);
  // 커튼 — 겉커튼은 창보다 먼저, 비치는 속커튼은 창이 아닌 자리에서만(창을 덮어 창을 못 고르게 되지 않게)
  const ch = door ? null : stage.pickCurtain(e), win = !door && stage.hitsWindow(e), cur = !!ch && (ch.layer === 'Out' || !win);
  const fix = door || win || cur ? null : stage.pickFixture(e);
  pickDown = { x: e.clientX, y: e.clientY, door, win: win && !cur, cur, fix, unit: door || win || cur || fix ? null : (stage.pickUnit(e)?.userData.hvUnit ?? null) };
}, true);
const unpickUnit = () => { selUnit = null; furnPop.hidden = true; stage.markUnits(null); };
cv.addEventListener('pointerup', e => {
  const pd = pickDown; pickDown = null;
  if (!pd || doorDrag || winDrag || furnDrag || rotDrag || fixDrag || Math.hypot(e.clientX - pd.x, e.clientY - pd.y) > 5) return;
  unpickWard();
  if (pd.cur) { unpickUnit(); if (selFix) unpickFix(); picked = 'curtain'; pops.forEach(x => (x.hidden = true)); stage.markCurtain(true); drawOverlay(); doorDragged = true; return; }
  if (picked === 'curtain') unpickCurtain();
  if (pd.fix) { unpickUnit(); picked = 'fix'; selFix = pd.fix; pops.forEach(x => (x.hidden = x !== fixPop)); renderFixPop(); stage.markFixtures(selFix); drawOverlay(); doorDragged = true; return; }
  if (selFix) unpickFix();
  if (pd.door) { unpickUnit(); picked = 'door'; renderRoomDoorPop(); pops.forEach(x => (x.hidden = x !== roomDoorPop)); drawOverlay(); doorDragged = true; }
  else if (pd.win) { unpickUnit(); picked = 'window'; renderWindowPop(); pops.forEach(x => (x.hidden = x !== windowPop)); drawOverlay(); doorDragged = true; }
  else if (pd.unit) { picked = 'furn'; selUnit = pd.unit; pops.forEach(x => (x.hidden = true)); renderFurnPop(); stage.markUnits(selUnit); drawOverlay(); doorDragged = true; }
  else if (picked) { picked = null; roomDoorPop.hidden = true; windowPop.hidden = true; unpickUnit(); drawOverlay(); }
}, true);

// ---------- 가구 묶음 — 고른 묶음을 바닥을 따라 끌어 옮긴다(사용자 지시 2026-11-02). 놓을 때 방을 조용히 다시 만들어 겹침을 다시 본다
const furnPop = h('div', 'mode-pop'); furnPop.id = 'furn-pop'; furnPop.hidden = true; windowPop.after(furnPop);
// ---------- 노출 EP — 3D 에서 눌러 고르고 일반 EP / 거울 EP 로 바꾼다(사용자 지시 2026-11-06 「EP 선택되도록 · 거울 EP 교체 가능하게」)
const epPop = h('div', 'mode-pop'); epPop.id = 'ep-pop'; epPop.hidden = true; furnPop.after(epPop);
let epSide: 'L' | 'R' | null = null;
const epMirror = (s: 'L' | 'R') => !!(s === 'L' ? design?.options.epMirrorL : design?.options.epMirrorR);
function setEpMirror(s: 'L' | 'R', on: boolean) {
  if (!design) return;
  if (s === 'L') design.options.epMirrorL = on; else design.options.epMirrorR = on;
  saveDesign(); rebuild(); render(); if (!epPop.hidden) renderEpPop();
}
function renderEpPop() {
  const p = epPop, s = epSide; p.innerHTML = '';
  if (!s || !design) { p.hidden = true; return; }
  p.append(h('div', 'sun-title', `${s === 'L' ? '왼쪽' : '오른쪽'} EP <small>장 옆이 벽이 아니라 드러난 쪽 마감</small>`));
  const row = h('div', 'rd-row');
  ([[false, '일반 EP'], [true, '거울 EP']] as [boolean, string][]).forEach(([on, t]) => {
    const b = h('button', epMirror(s) === on ? 'on' : '', t) as HTMLButtonElement;
    b.onclick = () => setEpMirror(s, on);
    row.append(b);
  });
  p.append(row);
  p.append(h('p', 'note', '거울 EP 는 일반 EP 바깥 면에 거울을 덧댄 것이에요. 카탈로그에 거울 EP 상품이 없어 견적은 일반 EP 가격 그대로예요(거울 가공비 별도).'));
  p.hidden = false;
}
function openEpPop(s: 'L' | 'R') {
  epSide = s; pops.forEach(x => (x.hidden = true)); furnPop.hidden = true;
  renderEpPop(); stage.markEP(s);
}
function closeEpPop() { epSide = null; epPop.hidden = true; stage.markEP(null); }
let furnDrag: { u: THREE.Object3D; start: THREE.Vector3; p0: THREE.Vector3; moved: boolean; decor: boolean; stack: string[]; sx: number; sy: number; live: boolean;
  /** 벽 장식 — 벽째 옮기기(stage.decorGrab) */ g?: ReturnType<Stage['decorGrab']> } | null = null;
const curMove = (k: string) => stage.hvMoves[stage.movesKey]?.[k] ?? { dx: 0, dz: 0, rot: 0 };
/** 고른 묶음을 다시 눌렀다 — 그 자리에 겹친 다음 묶음으로(맨 뒤면 맨 앞으로). 러그는 다른 묶음이 겹쳐 있으면 건너뛴다(가구를 다시 누를 때마다 러그로 넘어가지 않게) */
function cycleUnit(stack: string[]) {
  const kind = (k: string) => stage.findUnit(k)?.userData.kind;
  const list = stack.some(k => kind(k) !== 'rug') ? stack.filter(k => kind(k) !== 'rug' || k === selUnit) : stack;
  if (list.length < 2 || !selUnit) return;
  const next = list[(list.indexOf(selUnit) + 1) % list.length];
  if (!next || next === selUnit) return;
  selUnit = next; picked = 'furn'; renderFurnPop(); stage.markUnits(selUnit); drawOverlay();
}
function renderFurnPop() {
  const p = furnPop; p.innerHTML = '';
  if (!selUnit) { p.hidden = true; return; }
  const u = stage.findUnit(selUnit);
  p.append(h('div', 'sun-title', `가구 <small>끌어 옮기고, 바닥 고리를 끌어 돌려요 · ${((Math.round(curAng(curMove(selUnit))) % 360) + 360) % 360}°</small>`));
  if (u?.userData.conflict) p.append(h('p', 'note bad', '장·장 앞 통로·방문과 겹쳐요 — 끌어서 옮기거나 빼 주세요.'));
  const rrow = h('div', 'rd-row');
  const rbtn = (t: string, d: number) => { const b = h('button', '', t) as HTMLButtonElement; b.onclick = () => rotateBy(d); rrow.append(b); };
  rbtn('↺ 5°', 5); rbtn('↻ 5°', -5); rbtn('↻ 90°', -90);
  p.append(rrow);
  // 벽 장식 높이 — 바닥에서 장식 아래 끝까지(mm). 끌어서도 위아래로 옮긴다(사용자 지시 2026-11-05 「벽 배치 상품은 높이도 자유롭게」)
  if (u?.userData.kind === 'decor') {
    const k = selUnit, bottom = () => Math.round(coreBox(u).min.y * 1000);
    const setBottom = (mm: number) => {
      const m = curMove(k), y = stage.clampDecorY(u, u.position.y + (mm / 1000 - coreBox(u).min.y));
      stage.setUnitMove(k, { ...m, dy: (m.dy ?? 0) + (y - u.position.y) }); saveMoves();
    };
    const hrow = h('div', 'rd-row', '<span>바닥에서</span>');
    const inp = h('input') as HTMLInputElement; inp.type = 'text'; inp.inputMode = 'numeric'; inp.value = String(bottom()); inp.style.width = '64px';
    inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') setBottom(+inp.value); };
    inp.onchange = () => { if (+inp.value >= 0) setBottom(+inp.value); };
    const step = (t: string, d: number) => { const b = h('button', '', t) as HTMLButtonElement; b.onclick = () => setBottom(bottom() + d); return b; };
    hrow.append(inp, h('small', 'rd-unit', 'mm'), step('▲ 5cm', 50), step('▼ 5cm', -50));
    p.append(hrow);
  }
  const row = h('div', 'rd-row');
  const btn = (t: string, fn: () => void) => { const b = h('button', '', t) as HTMLButtonElement; b.onclick = fn; row.append(b); };
  btn('원래 자리', () => { stage.setUnitMove(selUnit!, null); saveMoves(); });
  btn('빼기', () => { stage.setUnitMove(selUnit!, { ...curMove(selUnit!), del: true }); saveMoves(); picked = null; unpickUnit(); });
  p.append(row);
  p.append(h('p', 'note', '뺀 가구는 오른쪽 「뺀 가구」에서 되살려요. 가구가 겹쳐 있으면 같은 자리를 다시 눌러 뒤 가구로 넘어가요. 뒤에 가려져도 고른 가구가 끌려요.'));
  const row2 = h('div', 'rd-row');
  const reset = h('button', '', '이 방 가구 처음대로') as HTMLButtonElement;
  reset.onclick = () => { delete stage.hvMoves[stage.movesKey]; saveMoves(); stage.setUnitMove('_', null); };
  const close = h('button', '', '닫기') as HTMLButtonElement; close.onclick = () => { picked = null; unpickUnit(); };
  row2.append(reset, close); p.append(row2);
  p.hidden = false;
}
// 회전 — 각도(도)로 저장한다. 돌린 뒤 벽·장·다른 가구와 겹치면 가장 조금 밀어 낸다(사용자 지시 2026-11-03 「좌우 5도씩·회전 기즈모」)
const curAng = (m: HvMove) => (m.rot ?? 0) * 90 + (m.ang ?? 0);
const normAng = (a: number) => { a = ((a % 360) + 360) % 360; return a > 180 ? a - 360 : a; };
function setUnitAng(deg: number) {
  const k = selUnit, u = stage.findUnit(k); if (!k || !u) return;
  const m = curMove(k), a = normAng(Math.round(deg / 5) * 5);
  stage.previewRot(u, a * Math.PI / 180);
  const s = stage.settleUnit(u);
  stage.setUnitMove(k, { ...m, rot: 0, ang: a, dx: m.dx + s.x, dz: m.dz + s.z }); saveMoves();
}
const rotateBy = (d: number) => { if (selUnit) setUnitAng(curAng(curMove(selUnit)) + d); };
let rotDrag: { u: THREE.Object3D; a0: number; r0: number; moved: boolean } | null = null;
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster' || picked !== 'furn' || !selUnit) return;
  const a0 = stage.ringAt(e), u = stage.findUnit(selUnit); if (a0 == null || !u) return;
  rotDrag = { u, a0, r0: u.rotation.y, moved: false };
  stage.controls.enabled = false; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (!rotDrag) { if (!e.buttons && picked === 'furn' && selUnit && stage.mode === 'raster' && stage.ringAt(e) != null) cv.style.cursor = 'grab'; return; }
  const a = stage.ringAngle(e); if (a == null) return;
  const deg = Math.round((rotDrag.r0 + a - rotDrag.a0) * 180 / Math.PI / 5) * 5;   // 5° 단위로 딸깍
  const r = deg * Math.PI / 180;
  if (Math.abs(r - rotDrag.u.rotation.y) > 1e-4) {
    stage.previewRot(rotDrag.u, r); rotDrag.moved = true;
    // 메뉴 제목의 각도도 돌리는 대로(바닥 고리 옆 각도 표시와 같은 값)
    const sm = furnPop.querySelector('.sun-title small'); if (sm) sm.textContent = `끌어 옮기고, 바닥 고리를 끌어 돌려요 · ${((deg % 360) + 360) % 360}°`;
  }
});
cv.addEventListener('pointerup', () => {
  if (!rotDrag) return;
  const rd = rotDrag; rotDrag = null;
  stage.controls.enabled = true; cv.style.cursor = ''; doorDragged = true;
  if (rd.moved) setUnitAng(rd.u.rotation.y * 180 / Math.PI);
}, true);
// ---- 장 자리 추천 — 고른 벽에서 가구·방문 열림과 안 겹치는 자리(사용자 요청 2026-11-03 「남은 작업」)
// 장 몸통 + 장 앞 통로(도어가 쓸고 나오는 깊이, scene.aisleDepth) 안에 걸리는 가구를 피한다. 넣은 크기가 들어가는 자리 중 벽 끝에 붙는 쪽, 없으면 가장 긴 자리
type WardRec = { a: number; len: number; lay: RoomLayout; split: number; fits: boolean; ok: boolean };
function wardRec(): WardRec | null {
  if (!hvRoom || !design) return null;
  const Lw = wallLen() / 1000, band = (built?.frontZ ?? 0.63) + stage.aisleDepth();
  const runs = stage.wardFreeRuns(band).map(([a, b]) => [Math.max(0, a), Math.min(Lw, b)] as [number, number]).filter(r => r[1] - r[0] > 0.05);
  const want = Math.min((design.space ?? design.width) / 1000, Lw), minW = pl.minWidth(design.typeId) / 1000;
  const wall = (r: number[]) => (r[0] < 0.01 ? 1 : 0) + (r[1] > Lw - 0.01 ? 1 : 0);
  const fitsR = runs.filter(r => r[1] - r[0] >= want - 1e-3).sort((x, y) => wall(y) - wall(x) || (x[1] - x[0]) - (y[1] - y[0]));
  let r = fitsR[0], len = want;
  if (!r) { r = [...runs].sort((x, y) => (y[1] - y[0]) - (x[1] - x[0]))[0]; if (!r) return null; len = Math.floor((r[1] - r[0]) * 100) / 100; }
  // 지금 장 자리가 이미 비어 있으면 추천하지 않는다
  const cs = ((design.offset ?? 0) / 1000) - stage.rx0, ce = cs + design.width / 1000;
  const ok = wardShown && runs.some(q => q[0] <= cs + 0.005 && q[1] >= ce - 0.005);
  const a = r[0] > 0.01 && r[1] > Lw - 0.01 ? r[1] - len : r[0];
  const gl = a, gr = Lw - a - len;
  const lay: RoomLayout = gl < 0.01 && gr < 0.01 ? 'fit' : gl < 0.01 ? 'openR' : gr < 0.01 ? 'openL' : 'openBoth';
  return len < minW ? { a, len, lay, split: 0.5, fits: false, ok: false } : { a, len, lay, split: gl / Math.max(1e-3, gl + gr), fits: !!fitsR[0], ok };
}
let recBox: HTMLElement | null = null;
function renderRecBox() {
  const el = recBox; if (!el) return; el.innerHTML = '';
  const rc = wardRec();
  el.hidden = !rc || rc.ok; if (!rc || rc.ok) return;
  const mmf = (m: number) => Math.round(m * 1000).toLocaleString();
  const minW = design ? pl.minWidth(design.typeId) : 0;
  if (rc.len * 1000 < minW) { el.append(h('p', 'rec-text', `이 벽엔 가구·방문과 안 겹치는 자리가 ${mmf(rc.len)}mm 뿐이라 장(최소 ${minW.toLocaleString()}mm)이 들어가지 않아요. 다른 벽을 고르거나 가구를 옮겨 주세요.`)); return; }
  const layName = ROOM_LAYOUTS.find(l => l.id === rc.lay)?.name ?? '';
  el.append(h('p', 'rec-text', rc.fits
    ? `추천 자리 — 벽 왼쪽 끝에서 ${mmf(rc.a)} ~ ${mmf(rc.a + rc.len)}mm 는 가구·방문과 안 겹쳐요.`
    : `넣은 크기는 가구와 겹쳐요. 안 겹치는 가장 긴 자리는 ${mmf(rc.a)} ~ ${mmf(rc.a + rc.len)}mm (${mmf(rc.len)}mm) 예요.`));
  const b = h('button', 'btn-gray', `추천대로 놓기 · ${mmf(rc.len)}mm · ${layName}`) as HTMLButtonElement;
  b.onclick = () => {
    if (!design) return;
    if (!wardShown) { wardShown = true; stage.setRoomPlan(roomPlan()); }
    design.space = Math.round(rc.len * 1000); selSlot = 0;
    if (rc.lay === 'openBoth') gapSplit = rc.split;
    if (rc.lay !== stage.layout) { stage.setLayout(rc.lay); try { localStorage.setItem(LAYOUT_KEY, rc.lay); } catch { /* 이번 화면엔 반영 */ } }
    syncEP(); fitToSpace(true); savePlan();
  };
  el.append(b);
}
let delBox: HTMLElement | null = null;
function renderDelBox() {
  const el = delBox; if (!el) return; el.innerHTML = '';
  const gone = stage.hvUnitsInfo.filter(u => u.del);
  el.hidden = !gone.length; if (!gone.length) return;
  el.append(h('div', 'del-title', `뺀 가구 ${gone.length}개 <small>누르면 원래 자리로 되살려요</small>`));
  const row = h('div', 'del-row');
  for (const u of gone) {
    const b = h('button', '', `↩ ${u.label}`) as HTMLButtonElement;
    b.onclick = () => { stage.setUnitMove(u.key, null); saveMoves(); };
    row.append(b);
  }
  if (gone.length > 1) {
    const all = h('button', '', '모두 되살리기') as HTMLButtonElement;
    all.onclick = () => { const k = stage.movesKey, cur = { ...(stage.hvMoves[k] ?? {}) }; for (const u of gone) delete cur[u.key]; stage.hvMoves[k] = cur; saveMoves(); stage.setUnitMove('_', null); };
    row.append(all);
  }
  el.append(row);
}
stage.onRoomBuilt = () => {
  // 설비를 방에 맞춰 옮겼으면 장 자리 추천(가리고 / 피해서 놓기)을 옮긴 자리로 다시 — 추천 상자는 방보다 먼저 그려져 처음 자리(방문 쪽)로 계산돼
  // 콘센트·스위치가 장 자리에 있어도 안내가 빠졌다(사용자 지적 2026-11-09 「콘센트·스위치를 같이 계산한 사이즈 추천이 왜 빠졌지」)
  if (stage.fixSettled) { stage.fixSettled = false; refreshFixWarn(); fixChanged(); }
  renderDelBox(); renderRecBox(); refreshFit(); if (selUnit && !stage.findUnit(selUnit)) unpickUnit(); stage.markUnits(selUnit); if (selUnit) renderFurnPop(); };
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster' || picked !== 'furn' || !selUnit) return;
  // 고른 묶음이 마우스 아래 어딘가에 있으면 — 앞에 다른 묶음이 겹쳐 가려도 고른 묶음을 끈다(예전엔 맨 앞이 고른 묶음일 때만 끌려 화면이 돌았다)
  const stack = stage.unitsAt(e), u = stack.find(x => x.userData.hvUnit === selUnit); if (!u) return;
  // 벽 장식은 걸린 벽 면을 따라(옆·위아래), 나머지는 바닥을 따라 끈다
  const decor = u.userData.kind === 'decor';
  const p0 = decor ? stage.decorWallAt(e, u) : stage.floorAt(e); if (!p0) return;
  furnDrag = { u, start: u.position.clone(), p0, moved: false, decor, stack: stack.map(x => x.userData.hvUnit as string), sx: e.clientX, sy: e.clientY, live: false,
    g: decor ? stage.decorGrab(e, u) : undefined };
  stage.controls.enabled = false; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (!furnDrag) { if (!e.buttons && picked === 'furn' && selUnit && stage.mode === 'raster') cv.style.cursor = stage.unitsAt(e).some(x => x.userData.hvUnit === selUnit) || stage.ringAt(e) != null ? 'grab' : ''; return; }
  // 화면에서 5px 넘게 움직여야 끌기 — 클릭할 때 손이 1~3px 흔들려도 가구가 밀리지 않고 「다시 누르면 뒤 가구」가 되게(실측: 흔들린 클릭마다 1cm 씩 밀렸다)
  if (!furnDrag.live) { if (Math.hypot(e.clientX - furnDrag.sx, e.clientY - furnDrag.sy) <= 5) return; furnDrag.live = true; }
  // 벽 장식 — 가리키는 벽에 등을 대고 딱 붙여 옮긴다(다른 벽이면 그 벽을 보게 돌려서)
  if (furnDrag.g) {
    const r = stage.decorDrag(e, furnDrag.u, furnDrag.g); if (!r) return;
    if (r.pos.distanceTo(furnDrag.u.position) > 0.002 || Math.abs(r.rot - furnDrag.u.rotation.y) > 1e-3) { stage.previewUnit(furnDrag.u, r.pos, r.rot); furnDrag.moved = true; }
    return;
  }
  const p = furnDrag.decor ? stage.decorWallAt(e, furnDrag.u) : stage.floorAt(e); if (!p) return;
  const want = furnDrag.start.clone().add(p.sub(furnDrag.p0));
  want.y = furnDrag.decor ? stage.clampDecorY(furnDrag.u, want.y) : furnDrag.start.y;
  // 지금 자리에서 마우스 쪽으로 쓸어 간다 — 벽·장·다른 가구에서 멈추고 미끄러지며, 6cm 안이면 붙는다
  const pos = stage.constrainUnit(furnDrag.u, furnDrag.u.position, want);
  if (pos.distanceTo(furnDrag.u.position) > 0.002) { stage.previewUnit(furnDrag.u, pos); furnDrag.moved = true; }
});
cv.addEventListener('pointerup', () => {
  if (!furnDrag) return;
  const fd = furnDrag; furnDrag = null;
  stage.controls.enabled = true; cv.style.cursor = '';
  doorDragged = true;
  if (!fd.moved) { cycleUnit(fd.stack); return; }
  if (!selUnit) return;
  const d = fd.u.position.clone().sub(fd.start), m = curMove(selUnit);
  const base = fd.u.userData.hvBase as THREE.Vector3 | undefined;
  if (fd.g && base) {
    // 벽째 옮긴 벽 장식 — 원래 기준점에서 그대로 간 거리 · 돌린 각(90° 단위 + 나머지)으로 저장
    const deg = THREE.MathUtils.radToDeg(fd.u.rotation.y), rot = Math.round(deg / 90);
    stage.setUnitMove(selUnit, { ...m, dx: fd.u.position.x - base.x, dz: fd.u.position.z - base.z, dy: fd.u.position.y, rot: ((rot % 4) + 4) % 4, ang: deg - rot * 90, free: true }); saveMoves();
    return;
  }
  stage.setUnitMove(selUnit, { ...m, dx: m.dx + d.x, dz: m.dz + d.z, ...(fd.decor ? { dy: (m.dy ?? 0) + d.y } : {}) }); saveMoves();
}, true);
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster' || !roomDoor || picked !== 'door' || !stage.hitsRoomDoor(e)) return;
  doorDrag = true; doorDragged = false;
  stage.controls.enabled = false;
  cv.setPointerCapture(e.pointerId);
  cv.style.cursor = 'grabbing';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (!doorDrag || !roomDoor) { if (!e.buttons && stage.mode === 'raster' && roomDoor && tab !== 'door') cv.style.cursor = stage.hitsRoomDoor(e) ? (picked === 'door' ? 'grab' : 'pointer') : ''; return; }
  const nd = stage.doorAt(e, roomDoor);
  if (nd.wall !== roomDoor.wall || Math.abs(nd.t - roomDoor.t) > 0.005) {
    roomDoor = nd; stage.setDoor(roomDoor); doorDragged = true;
    if (!roomDoorPop.hidden) { renderRoomDoorPop(); drawOverlay(); }
  }
});
cv.addEventListener('pointerup', () => {
  if (!doorDrag) return;
  doorDrag = false; stage.controls.enabled = true; cv.style.cursor = '';
  saveDoor(doorDragged);
  if (doorDragged) envChanged();
}, true);

// ---------- 설비 — 고른 설비를 벽을 따라 끌어 옮긴다(다른 벽을 가리키면 그 벽으로). 높이도 마우스를 따른다
let fixDrag = false;
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster' || picked !== 'fix' || !selFix || stage.pickFixture(e) !== selFix) return;
  fixDrag = true; doorDragged = false;
  stage.controls.enabled = false; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (!fixDrag) {
    if (!e.buttons && stage.mode === 'raster' && tab !== 'door' && !doorDrag && !winDrag) { const id = stage.pickFixture(e); if (id) cv.style.cursor = id === selFix ? 'grab' : 'pointer'; }
    return;
  }
  const f = fixtures.find(x => x.id === selFix); if (!f) return;
  const n = stage.fixtureAt(e, f);
  if (n.wall !== f.wall || Math.abs(n.t - f.t) > 0.003 || Math.abs(n.y - f.y) > 0.003) { Object.assign(f, n); stage.setFixtures(fixtures); stage.markFixtures(selFix); doorDragged = true; }
});
cv.addEventListener('pointerup', () => {
  if (!fixDrag) return;
  fixDrag = false; stage.controls.enabled = true; cv.style.cursor = '';
  if (doorDragged) { saveFixtures(); renderFixPop(); refreshFixWarn(); fixChanged(); }
}, true);
/** 기본 설비 — 장 벽 콘센트(장이 가리는 흔한 자리) · 침대 벽 콘센트 · 창 없는 옆벽에 통신단자함(아래) · 창문 앞 천장에 시스템 에어컨 */
function defaultFixtures(): RoomFixture[] {
  // 기본 자리 = 2026-11-12 사용자가 쓰던 안방 설비(사용자 지시 「현재 설정으로 기본」). 저장한 설비가 없으면 방을 지은 뒤
  // stage.settleFixtures 가 가구·창·방문을 피해 민다(시스템 에어컨은 창 앞, 스위치·멀티패널은 방문 손잡이 쪽)
  return [
    { id: 'outlet-1', kind: 'outlet', wall: 'back', t: 1, y: 0.25 },
    { id: 'outlet-2', kind: 'outlet', wall: 'right', t: 2.487, y: 0.195 },
    { id: 'telecom-1', kind: 'telecom', wall: 'left', t: 1.38, y: 0.3 },
    // 에어컨 기본은 시스템 에어컨(사용자 지시 2026-11-12 「기본 에어컨은 벽걸이 말고 시스템 에어컨으로 창문 앞으로」) — 벽걸이는 빼 두고 목록에서 되살린다
    { id: 'aircon-1', kind: 'aircon', wall: 'left', t: 3.96, y: 2.0, del: true },
    { id: 'ceilac-1', kind: 'ceilac', wall: 'ceiling', t: 1.871, y: 4.21, rot: 180 },
    { id: 'switch-1', kind: 'switch', wall: 'back', t: 1.006, y: 1.14 },
    { id: 'multi-1', kind: 'multi', wall: 'back', t: 1.195, y: 1.14 },
  ];
}
function loadFixtures(): RoomFixture[] {
  try {
    const a = JSON.parse(localStorage.getItem(FIX_KEY) || 'null') as RoomFixture[] | null;
    if (Array.isArray(a)) return a.filter(f => f && f.kind in FIXTURE_SPEC && ['left', 'right', 'back', 'front', 'ceiling'].includes(f.wall) && (f.kind === 'ceilac') === (f.wall === 'ceiling'));
  } catch { /* 기본 설비 */ }
  return defaultFixtures();
}
function saveFixtures() { stage.fixAuto = false; try { localStorage.setItem(FIX_KEY, JSON.stringify(fixtures)); } catch { /* 이번 화면엔 그대로 */ } }
/** 저장한 설비가 없으면 기본 설비 — 방을 꾸민 뒤 빈 벽 자리로 밀어 준다(stage.settleFixtures). 한 번이라도 고치면 그 자리를 지킨다 */
function fixAutoAtLoad() { try { return localStorage.getItem(FIX_KEY) == null; } catch { return true; } }
const WALL_KO: Record<RoomFixture['wall'], string> = { back: '장 벽', left: '왼쪽 벽', front: '맞은편 벽', right: '오른쪽 벽', ceiling: '천장' };
/** 이/가 — 마지막 글자 받침으로 */
const josa = (w: string) => { const c = w.charCodeAt(w.length - 1) - 0xac00; return c >= 0 && c < 11172 && c % 28 ? '이' : '가'; };
function fixMsg(f: RoomFixture) {
  const at = WALL_KO[f.wall];
  if (f.kind === 'ceilac') return '천장 시스템 에어컨이 장 위에 걸려요 — 장을 천장까지 채우려면 에어컨 위치와 천장 구조를 먼저 확인해 주세요.';
  return f.kind === 'aircon'
    ? `${at} 벽걸이 에어컨이 장과 겹쳐요 — 장 높이·깊이·위치나 에어컨·배관 자리를 확인해 주세요.`
    : `${at} ${FIXTURE_SPEC[f.kind].name}${josa(FIXTURE_SPEC[f.kind].name)} 장에 가려져요 — 그대로 가릴지, 위치를 옮길지 미리 정해 주세요.`;
}
/** 장과 겹친 설비 — 3D 주황 테두리 + 장 크기 패널 경고(경고만, 장 자리는 그대로) */
function refreshFixWarn() {
  stage.markFixtures(selFix);
  const clash = new Set(stage.fixtureClashes()), list = fixtures.filter(f => !f.del && clash.has(f.id));
  if (fixWarnEl) fixWarnEl.innerHTML = list.map(f => `<p class="hint door-warn">${fixMsg(f)}</p>`).join('');
  if (!fixPop.hidden) renderFixPop();
}
/** 설비 삭제 — 목록에서 지운다(사용자 지시 2026-11-06 「배치된 설비 상품 삭제되도록」). 기본 설비는 「처음 설비로」로 돌아온다 */
function removeFix(id: string) {
  fixtures = fixtures.filter(x => x.id !== id);
  if (selFix === id) unpickFix();
  stage.setFixtures(fixtures); saveFixtures(); refreshFixWarn(); fixChanged(); renderFixPop();
}
window.addEventListener('keydown', e => {
  if ((e.key === 'r' || e.key === 'R') && selFix && picked === 'fix' && !e.ctrlKey && !e.metaKey && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { const f = fixtures.find(x => x.id === selFix); if (f) { e.preventDefault(); rotateFix(f); } return; }
  if ((e.key === 'Delete' || e.key === 'Backspace') && selFix && picked === 'fix' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); removeFix(selFix); }
});
function unpickFix() { selFix = null; if (picked === 'fix') picked = null; stage.markFixtures(null); }
/** 90° 돌리기 — 벽 설비는 가운데 높이를 지킨다(아래 끝 y 를 새 높이에 맞춰) */
function rotateFix(f: RoomFixture) {
  const r = ((f.rot ?? 0) + 90) % 360, h0 = fixtureSize(f).h, h1 = fixtureSize({ kind: f.kind, rot: r }).h;
  setFix(f, f.wall === 'ceiling' ? { rot: r } : { rot: r, y: Math.max(0.02, Math.round((f.y + (h0 - h1) / 2) * 1000) / 1000) });
  stage.markFixtures(selFix); renderFixPop();
}
function setFix(f: RoomFixture, n: Partial<RoomFixture>) {
  Object.assign(f, n); stage.setFixtures(fixtures); saveFixtures(); refreshFixWarn(); fixChanged();
}
/** 설비가 바뀌었다 — 피해서 놓기면 장 자리를 다시 잡고, 아니면 추천 상자만 다시 */
function fixChanged() {
  // 장 벽 설비 자리가 그대로면(다른 벽 설비) 장은 두고 추천 상자만
  if (!design || JSON.stringify(fixBlocks()) === blocksKey) { renderPanel(); return; }
  envChanged();
}
/** 방문·설비가 바뀌었다 — 고른 자리·가리기/피하기 선택을 풀고 바뀐 배치 가능 길이로 장을 다시 잡는다 */
function envChanged() {
  setAvoidPref(null);
  if (design) design.run = undefined;
  fitToSpace();
}
function renderFixPop() {
  const p = fixPop; p.innerHTML = '';
  const clash = new Set(stage.fixtureClashes());
  const f = fixtures.find(x => x.id === selFix && !x.del);
  if (f) {
    const sp = fixtureSize(f), fr = stage.fixtureFrame(f);
    // 90° 씩 돌리기 — 가운데 자리는 그대로(벽 설비는 아래 끝을 가운데에 맞춰 옮긴다). 고른 채 R 키로도
    const rotBtn = () => { const b = h('button', '', `↻ 90° 돌리기${f.rot ? ` <small>(${f.rot}°)</small>` : ''}`) as HTMLButtonElement; b.title = '시계 반대 방향으로 90° — 고른 채 R 키'; b.onclick = () => rotateFix(f); return b; };
    p.append(h('div', 'sun-title', `${sp.name} <small>끌어서 ${f.wall === 'ceiling' ? '천장' : '벽'}을 따라 옮겨요 · ${Math.round(sp.w * 1000)}×${Math.round(sp.h * 1000)}mm</small>`));
    if (clash.has(f.id)) p.append(h('p', 'note bad', fixMsg(f)));
    if (f.wall === 'ceiling') {
      // 천장 — 판 가장자리에서 왼쪽 벽 · 장 벽까지(mm)
      const dr = h('div', 'rd-dist');
      ([['왼쪽 벽까지', fr.t - sp.w / 2, (v: number) => ({ t: v + sp.w / 2 })], ['장 벽에서', fr.y - sp.h / 2, (v: number) => ({ y: v + sp.h / 2 })]] as [string, number, (v: number) => Partial<RoomFixture>][]).forEach(([lab0, cur, set]) => {
        const lab = h('label', '', `<span>${lab0}</span>`);
        const inp = h('input') as HTMLInputElement; inp.type = 'number'; inp.step = '10'; inp.min = '0'; inp.value = String(Math.round(cur * 1000));
        const apply = () => { const v = +inp.value / 1000; if (v >= 0) setFix(f, set(v)); };
        inp.onchange = apply; inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') apply(); };
        lab.append(inp); dr.append(lab);
      });
      p.append(dr);
      const ar = h('div', 'rd-row');
      const del = h('button', '', '빼기') as HTMLButtonElement; del.onclick = () => { setFix(f, { del: true }); unpickFix(); renderFixPop(); };
      const rm = h('button', '', '삭제') as HTMLButtonElement; rm.onclick = () => removeFix(f.id);
      const done = h('button', '', '고르기 끝') as HTMLButtonElement; done.onclick = () => { unpickFix(); renderFixPop(); };
      ar.append(rotBtn(), del, rm, done); p.append(ar);
    } else {
    const wr = h('div', 'rd-row', '<span>벽</span>');
    (['back', 'left', 'front', 'right'] as const).forEach(w => {
      const b = h('button', f.wall === w ? 'on' : '', WALL_KO[w]) as HTMLButtonElement;
      b.onclick = () => setFix(f, { wall: w, t: (w === 'back' || w === 'front' ? stage.rx1 - stage.rx0 : ROOM_D) / 2 });
      wr.append(b);
    });
    p.append(wr);
    // 설비 가장자리에서 좌우 벽까지(방 안에서 그 벽을 바라볼 때) — 방문과 같은 방식
    const lowSide = f.wall === 'back' || f.wall === 'right' ? 'left' : 'right';
    const lo = fr.t - sp.w / 2, hi = fr.span - fr.t - sp.w / 2;
    const dr = h('div', 'rd-dist');
    (['left', 'right'] as const).forEach(side => {
      const lab = h('label', '', `<span>${side === 'left' ? '왼쪽 벽까지' : '오른쪽 벽까지'}</span>`);
      const inp = h('input') as HTMLInputElement; inp.type = 'number'; inp.step = '10'; inp.min = '0';
      inp.value = String(Math.round((side === lowSide ? lo : hi) * 1000));
      const apply = () => { const v = +inp.value / 1000; if (!(v >= 0)) return; setFix(f, { t: side === lowSide ? v + sp.w / 2 : fr.span - v - sp.w / 2 }); };
      inp.onchange = apply; inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') apply(); };
      lab.append(inp); dr.append(lab);
    });
    p.append(dr);
    const hr = h('div', 'rd-row', '<span>바닥에서</span>');
    const hi2 = h('input') as HTMLInputElement; hi2.type = 'number'; hi2.step = '10'; hi2.min = '0'; hi2.style.width = '72px';
    hi2.value = String(Math.round(fr.y * 1000));
    const applyY = () => { const v = +hi2.value / 1000; if (v >= 0) setFix(f, { y: v }); };
    hi2.onchange = applyY; hi2.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') applyY(); };
    hr.append(hi2, h('small', 'rd-unit', 'mm · 아래 끝까지')); p.append(hr);
    const ar = h('div', 'rd-row');
    const del = h('button', '', '빼기') as HTMLButtonElement; del.onclick = () => { setFix(f, { del: true }); unpickFix(); renderFixPop(); };
    const rm = h('button', '', '삭제') as HTMLButtonElement; rm.onclick = () => removeFix(f.id);
    const done = h('button', '', '고르기 끝') as HTMLButtonElement; done.onclick = () => { unpickFix(); renderFixPop(); };
    ar.append(rotBtn(), del, rm, done); p.append(ar);
    }
  } else p.append(h('div', 'sun-title', '설비 <small>콘센트 · 스위치 · 멀티패널 · 통신단자함 · 에어컨</small>'));
  // 목록 — 고르기 · 빼기 · 되살리기
  const ul = h('div', 'fx-list');
  fixtures.forEach(x => {
    const sp = FIXTURE_SPEC[x.kind];
    const st = x.del ? '뺌' : clash.has(x.id) ? '장과 겹침' : '';
    const li = h('div', 'fx-item' + (x.id === selFix ? ' on' : '') + (x.del ? ' off' : ''), `<span>${sp.name}</span><small class="${st === '장과 겹침' ? 'bad' : ''}">${WALL_KO[x.wall]}${st ? ` · ${st}` : ''}</small>`);
    const b = h('button', '', x.del ? '되살리기' : '고르기') as HTMLButtonElement;
    b.onclick = () => {
      if (x.del) setFix(x, { del: false });
      selFix = x.id; picked = 'fix'; stage.markFixtures(selFix); renderFixPop();
    };
    const x2 = h('button', 'fx-rm', '×') as HTMLButtonElement; x2.title = '삭제'; x2.onclick = () => removeFix(x.id);
    li.append(b, x2); ul.append(li);
  });
  p.append(ul);
  const add = h('div', 'rd-row', '<span>달기</span>');
  (['outlet', 'switch', 'multi', 'telecom', 'aircon', 'ceilac'] as FixtureKind[]).forEach(k => {
    const b = h('button', '', FIXTURE_SPEC[k].name) as HTMLButtonElement;
    b.onclick = () => {
      const n: RoomFixture = k === 'ceilac'
        ? { id: `${k}-${Date.now().toString(36)}`, kind: k, wall: 'ceiling', t: (stage.rx1 - stage.rx0) / 2, y: ROOM_D / 2 }
        : { id: `${k}-${Date.now().toString(36)}`, kind: k, wall: 'back', t: (stage.rx1 - stage.rx0) / 2, y: k === 'aircon' ? 2.0 : k === 'switch' || k === 'multi' ? 1.14 : 0.3 };
      fixtures.push(n); selFix = n.id; picked = 'fix'; queueMicrotask(fixChanged);
      stage.setFixtures(fixtures); saveFixtures(); refreshFixWarn(); renderFixPop();
    };
    add.append(b);
  });
  p.append(add);
  const rr = h('div', 'rd-row', '<span></span>');
  const reset = h('button', '', '처음 설비로') as HTMLButtonElement;
  // 처음 설비로 — 저장을 지우고 기본 설비. 빈 자리 찾기는 방을 다시 꾸밀 때(다음에 방을 열거나 장을 옮길 때)
  reset.onclick = () => { fixtures = defaultFixtures(); unpickFix(); try { localStorage.removeItem(FIX_KEY); } catch { /* 이번 화면엔 그대로 */ } stage.fixAuto = true; stage.fixtures = fixtures; stage.settleFixtures(); refreshFixWarn(); renderFixPop(); fixChanged(); };
  rr.append(reset); p.append(rr);
  p.append(h('p', 'note', '설비를 옮기거나 달면 장이 설비를 피해 다시 놓여요. 피할 자리가 모자라면 가리고 놓고 주황 테두리로 알려요 — 사이즈 추천에서 가리기·피하기를 직접 고를 수도 있어요. 빼기는 목록에 남아 되살릴 수 있고, 삭제(×)는 목록에서 지워요(Delete 키도). 처음 설비로 누르면 기본 설비가 돌아와요.'));
  p.hidden = false;
}
// 열려 있으면 닫고, 닫혀 있으면 다른 메뉴를 닫고 연다 — 예전엔 renderFixPop 이 먼저 메뉴를 보이게 한 뒤 toggle 이 「보이니까 닫기」로 받아 아이콘을 눌러도 안 떴다(사용자 지적 2026-11-06)
$('#v-fixture').onclick = () => { if (fixPop.hidden) { pops.forEach(x => (x.hidden = true)); renderFixPop(); if (selFix) picked = 'fix'; } else { fixPop.hidden = true; unpickFix(); } drawOverlay(); };

// ---------- 배치 가능 가구(침대 · 책상 · 화장대) — 장 + 장 앞 통로(55cm) · 방문 열리는 자리를 뺀 빈 방 기준(furnfit.ts)
const FIT_COLOR = { bed: 0x3b6fe0, desk: 0x1f9d6b, vanity: 0xb04fd6 } as const;
function fitRoom(): FitRoom {
  const blocks: Rect[] = [], solid: Rect[] = [], reach: Rect[] = [];
  const w = stage.wardrobe;
  if (w && wardShown) {
    const a = w.root.position.x, b = a + w.width;
    blocks.push([a, b, 0, w.frontZ + 0.55]); solid.push([a, b, 0, w.frontZ]); reach.push([a, b, w.frontZ, w.frontZ + 0.55]);
  }
  const sw = stage.doorSwing(); if (sw) blocks.push(sw);
  // 지금 놓인 가구 — 피해서 놓고, 걸어 지나가지도 못한다. 가구를 빼면(가구 메뉴 「빼기」) 그 자리도 계산에 들어간다
  for (const r of stage.furnitureRects()) { blocks.push(r); solid.push(r); }
  return { x0: stage.rx0, x1: stage.rx1, D: ROOM_D, blocks, solid, entry: sw, reach };
}
function refreshFit() {
  if (!fitEl) return;
  const el = fitEl; el.innerHTML = '';
  const rep = fitReport(fitRoom()), mm = (v: number) => Math.round(v).toLocaleString();
  el.append(h('p', 'rec-text', `장·장 앞 통로(55cm)·방문이 열리는 자리와 <b>지금 놓인 가구를 피해</b> 벽에 붙여 놓아요. 책상·화장대 앞(70·60cm)과 침대 한쪽 옆(60cm)을 비우고, 방문에서 각 가구 앞과 장 앞까지 <b>폭 60cm 통로</b>로 갈 수 있어야 해요. 놓인 가구를 빼면 그 자리도 계산해요. 크기는 일반 표준(대략)이에요.`));
  const ul = h('div', 'fit-list');
  for (const cat of ['bed', 'desk', 'vanity'] as const) {
    const items = rep.single.filter(s => s.item.cat === cat);
    const row = h('div', 'fit-row', `<span>${FIT_CAT_KO[cat]}</span>`);
    for (const s of items) row.append(h('small', s.ok ? 'ok' : 'no', `${s.ok ? '○' : '✕'} ${s.item.name.replace(FIT_CAT_KO[cat], '').trim() || s.item.name} <em>${mm(s.item.w)}×${mm(s.item.d)}</em>`));
    ul.append(row);
  }
  el.append(ul);
  const set = rep.set;
  el.append(h('p', 'rec-text', set
    ? `<b>함께 놓기 추천</b> — ${set.map(p => p.item.name).join(' + ')}`
    : `<b>함께 놓기 추천</b> — 들어가는 가구가 없어요.${stage.emptyRoom ? '' : ' 놓인 가구를 빼거나 숨기면 그 자리도 계산해요.'}`));
  // 놓인 가구가 자리를 다 차지하면 아무것도 안 들어간다 — 놓인 가구를 숨기고 빈 방 기준으로도 본다
  const eb = h('button', 'btn-gray', stage.emptyRoom ? '놓인 가구 다시 보기' : '놓인 가구 숨기고 빈 방으로 보기') as HTMLButtonElement;
  eb.onclick = () => { stage.setEmptyRoom(!stage.emptyRoom); refreshFit(); };
  el.append(eb);
  if (set) {
    const b = h('button', 'btn-gray', fitShow ? '바닥 표시 끄기' : '추천 자리 바닥에 표시') as HTMLButtonElement;
    b.onclick = () => { fitShow = !fitShow; try { localStorage.setItem('storage-planner.fitshow', fitShow ? '1' : '0'); } catch { /* 이번 화면엔 반영 */ } refreshFit(); };
    el.append(b);
  }
  stage.showFootprints(fitShow && set ? set.flatMap(p => [
    { r: p.foot, color: FIT_COLOR[p.item.cat], label: `${p.item.name} ${mm(p.item.w)}×${mm(p.item.d)}` },
    ...p.clear.map(r => ({ r, color: FIT_COLOR[p.item.cat], clear: true })),
  ]) : null);
}

/** 방문 좌우 벽까지 거리(m) — 방 안에서 그 벽을 바라볼 때의 왼쪽·오른쪽. 문틀 안쪽(문 열리는 자리) 끝에서 벽 면까지 */
function wallSpan(d: RoomDoor) { return d.wall === 'back' || d.wall === 'front' ? stage.rx1 - stage.rx0 : ROOM_D; }
function doorDist(d: RoomDoor) {
  const lo = d.t, hi = wallSpan(d) - d.t - d.w;               // 벽 좌표가 작은 쪽 · 큰 쪽
  // 바라보는 방향의 오른쪽: 장 벽(-z 를 봄) = +x · 맞은편(+z) = -x · 왼쪽 벽(-x) = -z · 오른쪽 벽(+x) = +z
  return d.wall === 'back' || d.wall === 'right' ? { left: lo, right: hi } : { left: hi, right: lo };
}
function setDoorDist(side: 'left' | 'right', m: number) {
  if (!roomDoor) return;
  const lowSide = roomDoor.wall === 'back' || roomDoor.wall === 'right' ? 'left' : 'right';
  const max = wallSpan(roomDoor) - roomDoor.w - 0.08;
  const t = side === lowSide ? m : wallSpan(roomDoor) - roomDoor.w - m;
  roomDoor.t = THREE.MathUtils.clamp(t, 0.08, max);
}
/** 방문 좌우 치수선 — 문 위 15cm 높이, 벽에서 2cm 안쪽(장 자리만큼 옮겨진 편집 표시 기준으로 되돌린다) */
function drawDoorDims() {
  const d = roomDoor!, off = (design?.offset ?? 0) / 1000, y = Math.min(2.36, (d.h ?? DOOR_H) + 0.13), x0 = stage.rx0 - off, x1 = stage.rx1 - off;
  const span = wallSpan(d), P = (a: number) => {
    switch (d.wall) {
      case 'back': return new THREE.Vector3(x0 + a, y, 0.02);
      case 'front': return new THREE.Vector3(x0 + a, y, ROOM_D - 0.02);
      case 'left': return new THREE.Vector3(x0 + 0.02, y, a);
      default: return new THREE.Vector3(x1 - 0.02, y, a);
    }
  };
  const mm = (v: number) => `${Math.round(v * 1000)}`;
  if (d.t > 0.005) stage.dimLine(P(0), P(d.t), mm(d.t));
  const e = d.t + d.w;
  if (span - e > 0.005) stage.dimLine(P(e), P(span), mm(span - e));
  stage.dimLine(P(d.t), P(e), `문 ${mm(d.w)}`);
}

// 방문 설정 — 폭 · 경첩 · 없애기
function renderRoomDoorPop() {
  const p = roomDoorPop; p.innerHTML = '';
  p.append(h('div', 'sun-title', '방문 <small>3D 화면에서 문을 끌어 옮겨요</small>'));
  const row = (label: string, opts: [string, () => void, boolean][]) => {
    const r = h('div', 'rd-row', `<span>${label}</span>`);
    opts.forEach(([t, fn, on]) => { const b = h('button', on ? 'on' : '', t) as HTMLButtonElement; b.onclick = () => { fn(); saveDoor(true); stage.setDoor(roomDoor); renderRoomDoorPop(); envChanged(); }; r.append(b); });
    p.append(r);
  };
  if (roomDoor) {
    // 좌우 벽까지 거리(mm) — 입력하면 그만큼 옮긴다
    const dist = doorDist(roomDoor);
    const dr = h('div', 'rd-dist');
    (['left', 'right'] as const).forEach(side => {
      const lab = h('label', '', `<span>${side === 'left' ? '왼쪽 벽까지' : '오른쪽 벽까지'}</span>`);
      const inp = h('input') as HTMLInputElement; inp.type = 'number'; inp.step = '10'; inp.min = '80';
      inp.value = String(Math.round(dist[side] * 1000));
      const apply = () => { const v = +inp.value; if (!(v >= 0)) return; setDoorDist(side, v / 1000); saveDoor(true); stage.setDoor(roomDoor); renderRoomDoorPop(); envChanged(); };
      inp.onchange = apply; inp.onkeydown = e => { if (e.key === 'Enter') apply(); };
      lab.append(inp, h('small', '', 'mm')); dr.append(lab);
    });
    p.append(dr);
    // 크기 — 눌러 고르거나 직접 입력(mm)(사용자 지시 2026-10-30)
    // 크기 — 한 칸에서 직접 입력하거나 ▾ 를 눌러 목록에서 고른다(사용자 지시 2026-10-30: 입력과 선택을 한 칸으로)
    const sizeRow = (label: string, presets: number[], get: () => number, set: (mm: number) => void, min: number, max: number) => {
      const r = h('div', 'rd-row', `<span>${label}</span>`);
      const box = h('div', 'rd-combo');
      const inp = h('input') as HTMLInputElement; inp.type = 'text'; inp.inputMode = 'numeric';
      inp.value = String(Math.round(get())); inp.title = `${min}~${max}mm — 직접 입력하거나 ▾ 로 고르기`;
      const btn = h('button', 'rd-caret', '▾') as HTMLButtonElement; btn.type = 'button';
      const list = h('div', 'rd-list'); list.hidden = true;
      const commit = (v: number) => {
        if (!(v >= min && v <= max)) { inp.value = String(Math.round(get())); return; }
        set(Math.round(v)); saveDoor(true); stage.setDoor(roomDoor); renderRoomDoorPop(); envChanged();
      };
      for (const v of presets) {
        const o = h('button', Math.abs(get() - v) < 1 ? 'on' : '', `${v}`) as HTMLButtonElement; o.type = 'button';
        o.onpointerdown = e => { e.preventDefault(); list.hidden = true; commit(v); };   // 입력칸 blur 보다 먼저
        list.append(o);
      }
      btn.onpointerdown = e => { e.preventDefault(); list.hidden = !list.hidden; if (!list.hidden) inp.focus(); };
      inp.onfocus = () => { list.hidden = false; inp.select(); };
      inp.onclick = () => { list.hidden = false; };
      inp.onblur = () => { list.hidden = true; if (+inp.value !== Math.round(get())) commit(+inp.value); };
      inp.onkeydown = e => { if (e.key === 'Enter') { list.hidden = true; commit(+inp.value); } else if (e.key === 'Escape') { inp.value = String(Math.round(get())); inp.blur(); } };
      box.append(inp, btn, list);
      r.append(box, h('small', 'rd-unit', 'mm')); p.append(r);
    };
    sizeRow('폭', [700, 800, 900, 1000], () => roomDoor!.w * 1000, mm => { roomDoor!.w = mm / 1000; }, 600, 1500);
    sizeRow('높이', [2000, 2100, 2300], () => (roomDoor!.h ?? DOOR_H) * 1000, mm => { roomDoor!.h = mm / 1000; }, 1800, 2300);   // 문틀 7cm 가 천장(2.4m) 아래로
    row('경첩', [['왼쪽', () => { roomDoor!.hinge = 'L'; }, roomDoor.hinge === 'L'], ['오른쪽', () => { roomDoor!.hinge = 'R'; }, roomDoor.hinge === 'R']]);
    row('벽', [['장 벽', () => { roomDoor!.wall = 'back'; }, roomDoor.wall === 'back'], ['왼쪽', () => { roomDoor!.wall = 'left'; }, roomDoor.wall === 'left'],
      ['맞은편', () => { roomDoor!.wall = 'front'; }, roomDoor.wall === 'front'], ['오른쪽', () => { roomDoor!.wall = 'right'; roomDoor!.t = 3.2; }, roomDoor.wall === 'right']]);
    row('', [['방문 없애기', () => { roomDoor = null; }, false]]);
  } else row('', [['방문 놓기', () => { roomDoor = { wall: 'front', t: Math.max(0.15, wallLen() / 1000 - 1.05), w: 0.9, hinge: 'L' }; }, false]]);
  p.append(h('p', 'note', '파란 부채꼴 = 문이 열리는 자리. 장 앞(장 도어 여는 자리 포함)과 겹치면 그만큼 비우고 장을 다시 놓아요.'));
}
$('#v-roomdoor').onclick = () => { renderRoomDoorPop(); toggle(roomDoorPop); picked = roomDoorPop.hidden ? null : 'door'; drawOverlay(); };

// ---------- 창문 — 방문처럼 3D 에서 눌러 고치고 끌어 옮긴다(사용자 지시 2026-10-30). 오른쪽(창) 벽 안에서만.
// 커튼·커튼박스 조명·창 빛은 창을 따라 다시 놓인다. 끄는 동안엔 창만 미리 움직이고 놓을 때 방을 다시 만든다(매번 만들면 무겁다)
const WIN_KEY = 'storage-planner.window.v1';
try { const w = JSON.parse(localStorage.getItem(WIN_KEY) ?? 'null'); if (w && w.w > 0 && w.h > 0) stage.win = { ...WINDOW_DEFAULT, ...w }; } catch { /* 기본 창 */ }
const saveWin = () => { try { localStorage.setItem(WIN_KEY, JSON.stringify(stage.win)); } catch { /* 이번 화면엔 그대로 */ } };
const applyWin = (w: RoomWindow) => {
  stage.setWindow(stage.fitWindow(w)); saveWin();
  userWin[winKey()] = { winWall: stage.winWall, win: { ...stage.win } }; saveUserWin();   // 방을 다시 계획해도 사용자가 고친 창 그대로
  renderWindowPop(); drawOverlay();
};
let winDrag = false, winDragged = false, winNext: RoomWindow | null = null;
let winWallNext: { wall: 'left' | 'right' | 'front'; t: number } | null = null;   // 다른 벽으로 옮기는 중
cv.addEventListener('pointerdown', e => {
  if (e.button !== 0 || stage.mode !== 'raster' || picked !== 'window' || !stage.hitsWindow(e)) return;
  winDrag = true; winDragged = false; winNext = null; winWallNext = null;
  stage.controls.enabled = false;
  cv.setPointerCapture(e.pointerId);
  cv.style.cursor = 'grabbing';
  e.stopImmediatePropagation();
}, true);
cv.addEventListener('pointermove', e => {
  if (!winDrag) { if (!e.buttons && stage.mode === 'raster' && tab !== 'door' && !doorDrag && stage.hitsWindow(e)) cv.style.cursor = picked === 'window' ? 'grab' : 'pointer'; return; }
  // 마우스가 다른 벽(장 벽 빼고)을 가리키면 그 벽으로 — 미리보기 사각형만 보이고 놓을 때 옮긴다(사용자 지시 2026-11-02)
  const at = stage.windowWallAt(e);
  if (at && at.wall !== stage.winWall) { winWallNext = { wall: at.wall, t: at.t - stage.win.w / 2 }; winNext = null; winDragged = true; stage.ghostWindow(winWallNext, stage.win); return; }
  if (winWallNext) { winWallNext = null; stage.ghostWindow(null, stage.win); }
  const n = stage.windowAt(e, stage.win);
  if (Math.abs(n.t - stage.win.t) > 0.005) { winNext = n; winDragged = true; }
});
cv.addEventListener('pointerup', () => {
  if (!winDrag) return;
  winDrag = false; stage.controls.enabled = true; cv.style.cursor = '';
  if (winWallNext) {
    stage.ghostWindow(null, stage.win);
    userWin[winKey()] = { winWall: winWallNext.wall, win: { ...stage.win, t: winWallNext.t } }; saveUserWin();
    winWallNext = null; stage.setRoomPlan(roomPlan()); renderWindowPop(); drawOverlay();
  } else if (winDragged && winNext) applyWin(winNext);
  doorDragged = true;                 // 이어지는 장 선택 클릭은 무시(방문과 같은 깃발)
}, true);

/** 창 좌우 벽까지(m) — 방 안에서 창 벽(+x)을 바라볼 때 왼쪽 = 장 벽 쪽 */
const winDist = (w: RoomWindow) => ({ left: w.t, right: stage.wf.len - w.t - w.w });   // 창 벽 길이(창이 다른 벽이어도)
/** 창 치수선 — 창 위 10cm 높이에 좌우 벽까지·창 폭, 창 옆에 창대 높이 */
function drawWindowDims() {
  const w = stage.win, off = (design?.offset ?? 0) / 1000, y = Math.min(2.36, w.sill + w.h + 0.1), LN = stage.wf.len;
  // 창 벽 좌표(L) → 방 → 편집 표시 좌표(장 왼쪽 끝이 0)
  const P = (z: number, yy = y) => stage.winToRoom(new THREE.Vector3(stage.wf.x1 - 0.02, yy, z)).sub(new THREE.Vector3(off, 0, 0));
  const mm = (v: number) => `${Math.round(v * 1000)}`;
  if (w.t > 0.005) stage.dimLine(P(0), P(w.t), mm(w.t));
  stage.dimLine(P(w.t), P(w.t + w.w), `창 ${mm(w.w)}`);
  if (LN - w.t - w.w > 0.005) stage.dimLine(P(w.t + w.w), P(LN), mm(LN - w.t - w.w));
  if (w.sill > 0.005) stage.dimLine(P(w.t + w.w + 0.12, 0), P(w.t + w.w + 0.12, w.sill), `바닥에서 ${mm(w.sill)}`);
}
function renderWindowPop() {
  const p = windowPop; p.innerHTML = '';
  p.append(h('div', 'sun-title', '창문 <small>3D 화면에서 창을 끌어 옮겨요</small>'));
  const w = stage.win, dist = winDist(w);
  const dr = h('div', 'rd-dist');
  (['left', 'right'] as const).forEach(side => {
    const lab = h('label', '', `<span>${side === 'left' ? '왼쪽 벽까지' : '오른쪽 벽까지'}</span>`);
    const inp = h('input') as HTMLInputElement; inp.type = 'number'; inp.step = '10'; inp.min = '100';
    inp.value = String(Math.round(dist[side] * 1000));
    const apply = () => { const v = +inp.value / 1000; if (!(v >= 0)) return; applyWin({ ...stage.win, t: side === 'left' ? v : stage.wf.len - stage.win.w - v }); };
    inp.onchange = apply; inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') apply(); };
    lab.append(inp); dr.append(lab);
  });
  p.append(dr);
  // 크기 — 한 칸에서 직접 입력하거나 ▾ 로 고른다(방문과 같은 칸)
  const combo = (label: string, presets: number[], get: () => number, set: (mm: number) => RoomWindow, unit = 'mm') => {
    const r = h('div', 'rd-row', `<span>${label}</span>`);
    const box = h('div', 'rd-combo');
    const inp = h('input') as HTMLInputElement; inp.type = 'text'; inp.inputMode = 'numeric'; inp.value = String(Math.round(get()));
    const btn = h('button', 'rd-caret', '▾') as HTMLButtonElement; btn.type = 'button';
    const list = h('div', 'rd-list'); list.hidden = true;
    const commit = (v: number) => { if (!(v >= 0)) { inp.value = String(Math.round(get())); return; } applyWin(set(Math.round(v))); };
    for (const v of presets) {
      const o = h('button', Math.abs(get() - v) < 1 ? 'on' : '', `${v}`) as HTMLButtonElement; o.type = 'button';
      o.onpointerdown = e => { e.preventDefault(); list.hidden = true; commit(v); };
      list.append(o);
    }
    btn.onpointerdown = e => { e.preventDefault(); list.hidden = !list.hidden; if (!list.hidden) inp.focus(); };
    inp.onfocus = () => { list.hidden = false; inp.select(); };
    inp.onclick = () => { list.hidden = false; };
    inp.onblur = () => { list.hidden = true; if (+inp.value !== Math.round(get())) commit(+inp.value); };
    inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') { list.hidden = true; commit(+inp.value); } else if (e.key === 'Escape') { inp.value = String(Math.round(get())); inp.blur(); } };
    box.append(inp, btn, list);
    r.append(box, h('small', 'rd-unit', unit)); p.append(r);
  };
  // 폭은 가운데를 기준으로 넓힌다
  combo('폭', [1200, 1500, 1800, 2200, 2400, 3000], () => w.w * 1000, mm => ({ ...stage.win, t: stage.win.t + (stage.win.w - mm / 1000) / 2, w: mm / 1000 }));
  // 높이는 바닥에서 높이를 뺀 벽 높이 안에서(사용자 지시 2026-11-05 「바닥을 뺀 벽 높이 기준으로 가능 높이를 입력받게」) —
  // 예전엔 넘치게 넣으면 fitWindow 가 바닥에서 높이를 내려 맞춰, 높이를 바꿨는데 창이 바닥 쪽으로 내려갔다. 이제 바닥에서 높이는 그대로 두고 높이를 줄인다
  const maxH = Math.max(400, Math.floor((ROOM_H - 0.25 - w.sill) * 1000));
  combo('높이', [...[1200, 1500, 1650, 1800, 2000].filter(v => v < maxH), maxH], () => w.h * 1000,
    mm => ({ ...stage.win, h: Math.max(0.4, Math.min(mm, maxH) / 1000) }), `mm · 최대 ${maxH.toLocaleString()}`);
  // 바닥에서 창 아래 끝까지(창대 높이) — 사용자 지시 2026-11-03. 100mm 아래·천장 25cm 안쪽은 fitWindow 가 맞춘다
  combo('바닥에서', [100, 300, 500, 800, 900, 1000], () => w.sill * 1000, mm => {
    // 입력한 높이를 지킨다 — 천장(25cm 안쪽)에 걸리면 창 높이를 줄인다(줄이지 않으면 바닥 높이가 깎여 입력이 안 먹은 것처럼 보였다)
    const s = Math.max(0.1, mm / 1000);
    return { ...stage.win, sill: s, h: Math.max(0.4, Math.min(stage.win.h, ROOM_H - 0.25 - s)) };
  });
  const rr = h('div', 'rd-row', '<span></span>');
  const reset = h('button', '', '처음 창으로') as HTMLButtonElement; reset.onclick = () => applyWin({ ...WINDOW_DEFAULT });
  rr.append(reset); p.append(rr);
  p.append(h('p', 'note', '바닥에서 = 바닥부터 창 아래 끝까지 높이. 창을 끌어 다른 벽으로도 옮겨요. 폭은 가운데를 기준으로 넓어지고 커튼·커튼박스 조명·창 빛이 창을 따라가요. 장·방문과는 겹치지 않게 맞춰요.'));
}
$('#v-window').onclick = () => { renderWindowPop(); toggle(windowPop); picked = windowPop.hidden ? null : 'window'; drawOverlay(); };

// 메뉴 닫기(X) — 모든 메뉴 오른쪽 위(사용자 지시 2026-10-30). 내용을 다시 그리는 메뉴도 있어 버튼이 빠지면 다시 붙인다
function addCloseButton(p: HTMLElement) {
  const ensure = () => {
    if (p.querySelector(':scope > .pop-x')) return;
    // 글자(×)는 글꼴 기준선 때문에 원 가운데서 어긋났다(사용자 지적) — 선 두 개짜리 아이콘
    const b = h('button', 'pop-x', '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>') as HTMLButtonElement;
    b.type = 'button'; b.title = '닫기';
    b.onclick = e => {
      e.stopPropagation(); p.hidden = true;
      if (p === roomDoorPop || p === windowPop) { picked = null; drawOverlay(); }
      if (p === fixPop) unpickFix();
      if (p === epPop) closeEpPop();
      if (p.id === 'door-pop' && p.dataset.kind === 'slot') unpickWard();
    };
    p.prepend(b);
  };
  ensure();
  new MutationObserver(ensure).observe(p, { childList: true });
}
[...pops, $('#door-pop')].forEach(addCloseButton);
new MutationObserver(() => drawOverlay()).observe($('#door-pop'), { attributes: true, attributeFilter: ['hidden'] });
addCloseButton(epPop);


// 처음 열 때 — 지난번 설계가 있으면 그대로 불러오고(타입 선택부터 다시 하지 않는다), 없으면 타입 선택
const restored = loadDesign();
// 불러온 설계도 지금 EP 규칙으로(써라운딩이 EP 보다 얇으면 양옆 EP · 벽 쪽은 그 두께만큼 띄움 — 2026-11-12)
if (restored) { design = restored; syncEP(); saveDesign(); rebuild(true); render(); } else openTypeModal();
void loadHvRoom(stage.roomStyle, false);
