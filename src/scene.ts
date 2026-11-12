// 장면 — 방(창으로 햇빛), 해 방향 조절, 실시간(그림자·AO) / 실사 3방식(MuTracer · 라이트맵 굽기 · 서펠 GI), 재질·라인 보기, 치수선·핫스팟·고르기
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { setBakedAO, type Built } from './model';
import { addContactShadows, setContactVisible } from './contact';
import { bakeSpaceAO, clearSpaceAO, detachSpaceAO, carrySpaceAO, setSpaceLamp, spaceAOTexture, SPACE_FLAG, applyProdAO, clearProdAO, setProdAOIntensity, type LightIn } from './render/spaceao';
(window as any).__spaceAO = spaceAOTexture;   // 시험 도구용
(window as any).__THREE = THREE;             // 시험 도구용(상자 계산)
import { addHomvueRoom, addWindow, coreBox, drapeMat, fixtureModelGlb, isCachedGeometry, releaseRoomTextures, CURTAIN_KEY, type RoomStyle, type HvMove } from './furnish';
import { batchStatic, disposeBatched } from './batch';
/** 장 메시 레이어 — 장 앞 다운라이트 그림자 지도에 장만 그린다 */
const WARDROBE_LAYER = 1;
import { MeshBasicNodeMaterial, MeshPhysicalNodeMaterial, type WebGPURenderer } from 'three/webgpu';
import { float, lights, materialColor, normalView, positionViewDirection, reflector } from 'three/tsl';
import { createRaster, type PostSettings, type Raster, type RasterRenderer } from './render/raster';
import { quality, effectiveDpr, type QualityProfile } from './quality';
import { roomFurnished } from './loadgate';
import { loadBake, loadBegin, loadDoing, loadEnd, loadMark, loadOpen, loadRebuild, loadStall } from './loadlog';
// MuTracer(실사)는 쓸 때 불러온다 — 정적으로 불러오면 모듈 약 240개 · 10MB 가 다 와야 앱이 시작해 첫 화면이 늦었다(2026-10-29 실측)
type MT = typeof import('./render/mutracer');
let mt: MT | null = null;
let mtLoading: Promise<MT> | null = null;
let mtExposure = 1;
const loadMt = () => mtLoading ??= import('./render/mutracer').then(m => { mt = m; m.setMutracerExposure(mtExposure); return m; });
// ⑤ three-gpu-pathtracer(WebGPU) — 이것도 쓸 때 불러온다
type GPT = typeof import('./render/gpupt');
let gpt: GPT | null = null;
const loadGpt = () => import('./render/gpupt').then(m => (gpt = m));
import { startEmbed, type EmbedKind, type EmbedHandle, type LightPayload } from './render/embed';

// 방 깊이(장 벽 ↔ 맞은편 벽)·천장 높이(m) — 패널 「방 크기」에서 바꾼다(기본 = 홈뷰 84A 안방 3640×4960×2400, 사용자 지시 2026-10-30)
export let ROOM_D = 4.96, ROOM_H = 2.4;
/** 공간 구조 — 붙박이장 옆으로 벽이 바로 붙는지(닫힘), 방이 더 이어지는지(오픈) */
export type RoomLayout = 'fit' | 'openR' | 'openL' | 'openBoth';
export const ROOM_LAYOUTS: { id: RoomLayout; name: string }[] = [
  { id: 'fit', name: '꽉 채우기' }, { id: 'openR', name: '우측 공간 오픈' },
  { id: 'openL', name: '좌측 공간 오픈' }, { id: 'openBoth', name: '양쪽 공간 오픈' },
];
const OPEN_W = 1.5;             // 오픈된 쪽으로 이어지는 방 폭(m) 기본값
export type Sun = { azimuth: number; elevation: number; intensity: number; kelvin?: number };
/** 실내 조명 · 환경광 · 노출 — 조명 패널에서 실시간으로 바꾼다 */
export type RoomLight = { lamp: number; kelvin: number; sky: number; env: number; exposure: number; lampColor?: string };
export type RenderMode = 'raster' | 'mutracer' | 'gpupt' | EmbedKind;
/** 경로 추적 모드 — 가짜 창 빛·구운 그늘 대신 실제 하늘·직접 계산 */
const isPath = (m: RenderMode) => m === 'mutracer' || m === 'gpupt';
/** 방 출입문 — 어느 벽(장 벽 = back, 맞은편 = front, 왼쪽·오른쪽), 벽 시작에서 문 가장자리까지 t(m), 폭 w(m), 경첩 쪽(문 앞에서 보아 왼쪽 L / 오른쪽 R) */
export type RoomDoor = { wall: 'left' | 'right' | 'back' | 'front'; t: number; w: number; hinge: 'L' | 'R'; h?: number };
export const DOOR_H = 2.1;
/** 창 — 오른쪽(창) 벽. t = 장 벽에서 창 왼쪽 끝까지(m), w = 폭, sill = 창대 높이, h = 창 높이 */
export type RoomWindow = { t: number; w: number; sill: number; h: number };
export const WINDOW_DEFAULT: RoomWindow = { t: 0.7, w: 2.2, sill: 0.5, h: 1.65 };
/** 설비 — 콘센트 · 통신단자함 · 벽걸이 에어컨(사용자 지시 2026-11-06 「장이 가리는지 생각해야 하니 소품으로 달아 — 없으면 빼면 된다」).
 *  wall = 방문과 같은 벽 이름, t = 벽 시작에서 설비 가운데까지(m), y = 바닥에서 설비 아래 끝까지(m), del = 뺐음 */
export type FixtureKind = 'outlet' | 'telecom' | 'aircon' | 'ceilac' | 'switch' | 'multi';
/** 천장 설비(시스템 에어컨, 사용자 지시 2026-11-06 「천장형도 추가」)는 wall = 'ceiling' · t = 왼쪽 벽에서 가운데까지 · y = 장 벽에서 가운데까지(m) */
/** rot = 돌린 각도(도, 90 단위) — 벽 설비는 벽 면 안에서, 천장 설비는 천장 면 안에서 돈다(사용자 지시 2026-11-10 「설비 모델링이 회전되도록」) */
export type RoomFixture = { id: string; kind: FixtureKind; wall: RoomDoor['wall'] | 'ceiling'; t: number; y: number; del?: boolean; rot?: number };
/** 크기(m) — 가로 w · 세로 h · 벽에서 나온 깊이 d */
export const FIXTURE_SPEC: Record<FixtureKind, { name: string; w: number; h: number; d: number }> = {
  outlet: { name: '콘센트', w: 0.072, h: 0.122, d: 0.01 },
  telecom: { name: '통신단자함', w: 0.3, h: 0.4, d: 0.025 },
  aircon: { name: '벽걸이 에어컨', w: 0.9, h: 0.3, d: 0.21 },
  // 시스템 에어컨 — 홈뷰 RS1000121(삼성 1way 천장형, 1410 × 500 × 35mm. 사용자 지시 2026-11-06 「홈뷰에 천장형 에어컨 있어 가져와」)
  ceilac: { name: '시스템 에어컨', w: 1.41, h: 0.5, d: 0.035 },
  // 조명 스위치(2구) · 멀티패널(스위치 2구 + 콘센트 일체형) — 사용자 지시 2026-11-06 「불 켜는 스위치랑 멀티패널도 추가」
  switch: { name: '조명 스위치', w: 0.072, h: 0.122, d: 0.012 },
  multi: { name: '멀티패널', w: 0.15, h: 0.122, d: 0.012 },   // 4방향 천장형 — w × h 가 천장 판, d 가 천장 아래로 내려온 두께
};
/** 돌린 뒤 차지하는 크기 — 90°·270° 면 가로·세로가 바뀐다 */
/** 시스템 에어컨 모델의 바람 나오는 쪽 — 0 이면 모델 +z, 180 이면 -z(settleFixtures 가 방 안을 보게 돌린다) */
const CEILAC_OUT = 0;
export function fixtureSize(f: Pick<RoomFixture, 'kind' | 'rot'>) {
  const s = FIXTURE_SPEC[f.kind];
  return ((f.rot ?? 0) / 90) % 2 ? { ...s, w: s.h, h: s.w } : s;
}
/** 바닥재·벽지 — 쿠지알러 재질 라이브러리 사본(tools/import_kujiale_surfaces.py → public/data/surfaces.json).
 *  이미지 한 장이 덮는 실제 크기 = size(가로·세로 m) */
export type Surface = { id: string; name: string; code?: string; group?: string; series?: string; size?: [number, number]; uvMeters: number; roughness?: number; color?: number[]; map?: string; normalMap?: string; thumb?: string };
export type SurfaceKind = 'floor' | 'wall';
/** 벽지 텍스처 반복 배율 */
const WALL_UV = 2.5;   // 5 → 2.5(사용자 「벽지가 잘 보이게 두 배 줄여」 2026-10-30)
const BASE_SURFACES: Record<SurfaceKind, Surface> = {
  floor: { id: 'oak', name: '브러쉬 베이지오크', group: '기본', uvMeters: 1, map: 'tex/floor_oak.jpg', thumb: 'tex/floor_oak.jpg' },
  wall: { id: 'paint', name: '화이트 도장', group: '기본', uvMeters: 1, color: [0.93, 0.925, 0.91] },
};

/** 색온도(K) → 빛 색 (Tanner Helland 근사, sRGB) */
export function kelvinColor(k: number): THREE.Color {
  const t = k / 100, c = (v: number) => THREE.MathUtils.clamp(v, 0, 255) / 255;
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  // 눈·카메라의 화이트밸런스처럼 흰색 쪽으로 45% — 그대로 쓰면 3000K 가 주황으로 보인다
  return new THREE.Color().setRGB(c(r), c(g), c(b), THREE.SRGBColorSpace).lerp(new THREE.Color(1, 1, 1), 0.45);
}

// 실내 조명 기준 세기 — 조명 패널의 「실내 조명」 1.0 일 때
const DOWNLIGHT_CD = 6;         // 다운라이트 한 개(칸델라) — 해(3.6)와 맞춘 상대값
const PANEL_NITS = 2.5;         // 천장 등 패널(니트)
const LINE_NITS = 14;           // 라인 조명(폭 4cm 띠, 니트) — 침대 벽 간접등·커튼박스
const ROOM_DOWN_CD = 4;         // 방 가운데 다운라이트(칸델라)
const MAIN_CD = 8;              // 방 메인 조명(천장 가운데, 그림자) — 다운라이트 두 개 남짓
export type CeilingLight = 'mix' | 'down' | 'line' | 'panel';
export const CEILING_LIGHTS: { id: CeilingLight; name: string }[] = [
  { id: 'mix', name: '다운라이트 + 라인' }, { id: 'down', name: '다운라이트만' }, { id: 'line', name: '라인 조명만' }, { id: 'panel', name: '등 패널 (예전)' },
];
// 창 하늘빛(산란광, 실시간 전용 — 경로 추적은 끄고 실제 하늘을 받는다) — 「창 빛」 1.0 일 때.
// 5 였을 땐 실시간이 실사보다 두 배 밝고 창 쪽이 2.5~2.9배였다(2026-10-29 실사 기준 칸별 비교) → 1
const WINDOW_NITS = 1;

// 실시간(래스터) 화면을 실사(MuTracer) 기준 사진에 맞춘 배율 — 같은 시점·기본 조명에서 밝기·대비·색을 비교해 정함(2026-10-29).
// 맞추기 전: 밝기 220 / 대비(로그 표준편차) 0.25 / R-B 5.4, 실사 158 / 0.36 / 12.2 → 맞춘 뒤 ≈160 / 0.36 / 13.7.
// 톤매핑(AgX)·노출 배율(1.25)은 후처리 설정 기본값으로 옮겼다(render/raster.ts POST_DEFAULTS) — 「후처리」 메뉴에서 바꾼다
const RASTER_ENV = 0.85;       // 조명 패널 환경광 × — 실내 환경맵은 가림 없이 고르게 비춰 공간감이 사라졌다

/** 화면에 실제로 보이는지 — 부모까지(숨긴 묶음 안 메시는 자기 visible 이 true 로 남는다). 칸을 고르면 도어 묶음을 숨기는데
 *  메시 visible 만 보던 고르기가 안 보이는 도어를 맞혀, 고른 칸을 끌어도 「도어를 눌렀다」로 보고 화면이 돌았다(사용자 지적 2026-11-09) */
function shown(o: THREE.Object3D | null): boolean { for (; o; o = o.parent) if (!o.visible) return false; return true; }

export class Stage {
  renderer: RasterRenderer;
  /** 실시간 화면 렌더러 — 기본 WebGPU(SSGI+TRAA), ?webgl 이면 WebGL(GTAO+SMAA). render/raster.ts */
  raster: Raster;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 0.05, 60);
  controls: OrbitControls;
  labels: CSS2DRenderer;
  sun = new THREE.DirectionalLight(0xfff1dc, 3.2);
  // 직사광이 약했다(사용자 지적 2026-10-30) — 세기 1.2 → 3, 고도 62° → 42°(빛이 방 안쪽까지 든다)
  // 기본 빛 = 2026-11-12 사용자가 쓰던 설정(사용자 지시 「빛 셋팅도 지금 설정으로 기본」) — 낮은 아침 해(고도 16°) 6500K
  sunCfg: Sun = { azimuth: 21, elevation: 16, intensity: 3, kelvin: 6500 };
  /** 그림자 — 진하기(0 = 없음 ~ 1) · 부드럽게(PCF 반경) */
  shadowCfg = { strength: 1, soft: 8 };
  setShadow(p: Partial<{ strength: number; soft: number }>) { Object.assign(this.shadowCfg, p); this.dirty = true; }
  // 기본 = 한샘 카탈로그 렌더처럼 — 직사광은 약하게, 창 산란광으로 고르게 밝게, 다운라이트는 은은하게
  // 실내 조명 색온도 5000K 고정(사용자 지시 2026-10-29) — 시간대 프리셋도 바꾸지 않는다. 슬라이더로 직접 바꿀 때만 달라진다
  roomCfg: RoomLight = { lamp: 0.3, kelvin: 6000, sky: 1.8, env: 1.0, exposure: 1, lampColor: '#ffffff' };
  /** 실내 조명 빛 색 — 색온도 × 고른 색(사용자 지시 2026-10-30 「조명 색을 고를 수 있게」) */
  lampCol() { return kelvinColor(this.roomCfg.kelvin).multiply(new THREE.Color(this.roomCfg.lampColor ?? '#ffffff')); }
  room = new THREE.Group();
  lamps = new THREE.Group();           // 천장 다운라이트 · 등 패널 (방과 함께 굽기·서펠에도 넘어간다)
  /** 방 스타일 — 안방 · 아기방 · 학생방 · 자녀방(성인) · 드레스룸 3종(furnish.ts ROOM_STYLES) */
  roomStyle: RoomStyle = 'master';
  setRoomStyle(s: RoomStyle) { if (s === this.roomStyle) return; this.roomStyle = s; this.roomKey = ''; if (this.lastRoom) this.buildRoom(...this.lastRoom); this.sceneChanged(); }
  /** 방 깊이·높이 바꾸기(m) — 방문·창은 새 벽 안으로 바로잡는다 */
  setRoomDims(d: number, h: number) {
    if (Math.abs(d - ROOM_D) < 1e-4 && Math.abs(h - ROOM_H) < 1e-4) return;
    ROOM_D = d; ROOM_H = h;
    if (this.door && (this.door.wall === 'left' || this.door.wall === 'right')) this.door.t = THREE.MathUtils.clamp(this.door.t, 0.08, d - this.door.w - 0.08);
    if (this.door) this.door.h = Math.min(this.door.h ?? DOOR_H, h - 0.12);
    this.roomKey = ''; if (this.lastRoom) this.buildRoom(...this.lastRoom); this.sceneChanged();
  }
  /** 천장 조명 구성 — 조명 패널 「천장 조명」 */
  ceiling: CeilingLight = 'mix';
  setCeiling(c: CeilingLight) { if (c === this.ceiling) return; this.ceiling = c; this.roomKey = ''; if (this.lastRoom) this.buildRoom(...this.lastRoom); this.sceneChanged(); }
  private lastRoom: [number, number, number, number] | null = null;
  /** 창 — 방문처럼 3D 에서 눌러 고치고 끌어 옮긴다(사용자 지시 2026-10-30). 커튼·커튼박스 조명·창 빛이 따라간다 */
  win: RoomWindow = { ...WINDOW_DEFAULT };
  /** 원하는 창(사용자가 고친 값·홈뷰 원본) — 방이 잠깐 좁아져 줄어든 창(win)이 그대로 남지 않게 따로 둔다 */
  private winWant: RoomWindow | null = null;
  setWindow(w: RoomWindow) { this.win = { ...w }; this.winWant = { ...w }; this.roomKey = ''; if (this.lastRoom) this.buildRoom(...this.lastRoom); this.sceneChanged(); }
  private winG = new THREE.Group();
  /** 창 벽(장 기준) — 홈뷰 원본 방은 창이 원래 벽에 있다. 장 벽을 고르면 왼쪽·맞은편 벽이 되기도 한다. 'right' 가 예전 그대로 */
  winWall: 'left' | 'right' | 'front' = 'right';
  /** 방(꾸밈)을 다 만든 뒤 — 고른 묶음·겹침 표시를 다시(main.ts) */
  onRoomBuilt?: () => void;
  /** 방을 지으며 설비 자리를 옮겼나(settleFixtures) — onRoomBuilt 가 읽고 끈다 */
  fixSettled = false;
  /** 홈뷰 방 꾸밈을 붙일 홈뷰 벽(= 장 벽) — 원본 방을 이 벽이 장 벽(뒤)이 되게 통째로 돌려 놓는다. null 이면 예전처럼 장에 맞춰 옮겨 놓는다 */
  hvWall: 'B' | 'F' | 'L' | 'R' | null = null;
  /** 장 숨김 — 방(꾸밈)을 먼저 보여 주고, 장 벽·크기를 정하면 놓는다(사용자 지시 2026-11-02) */
  wardHidden = false;
  setRoomPlan(p: { winWall: 'left' | 'right' | 'front'; hvWall: 'B' | 'F' | 'L' | 'R' | null; win?: RoomWindow; wardHidden: boolean }) {
    this.winWall = p.winWall; this.hvWall = p.hvWall; if (p.win) { this.win = { ...p.win }; this.winWant = { ...p.win }; }
    this.wardHidden = p.wardHidden; if (this.wardrobe) this.wardrobe.root.visible = !p.wardHidden;
    this.overlay.visible = !p.wardHidden;
    this.roomKey = ''; if (this.lastRoom) this.buildRoom(...this.lastRoom); this.applyOutside(); this.sceneChanged();
  }
  /** 창 벽 좌표(L) → 방 좌표 — L 에선 창 벽이 x = wf.x1(오른쪽 벽), 벽 따라 z = 0 ~ wf.len. zs·ze = 벽 양 끝에서 장이 막은 길이 */
  wf = { m: new THREE.Matrix4(), inv: new THREE.Matrix4(), x0: 0, x1: 0, len: 0, zs: 0, ze: 0, yaw: 0 };
  private winFrame(x0: number, x1: number, D: number, frontZ: number, flushL: boolean, flushR: boolean) {
    const f = this.wf;
    const block = this.wardHidden ? 0 : frontZ;
    if (this.winWall === 'front') { f.m.makeRotationY(-Math.PI / 2).setPosition(x1, 0, 0); f.x0 = 0; f.x1 = D; f.len = x1 - x0; f.zs = 0; f.ze = 0; f.yaw = -Math.PI / 2; }
    else if (this.winWall === 'left') { f.m.makeRotationY(Math.PI).setPosition(x0 + x1, 0, D); f.x0 = x0; f.x1 = x1; f.len = D; f.zs = 0; f.ze = flushL ? block : 0; f.yaw = Math.PI; }
    else { f.m.identity(); f.x0 = x0; f.x1 = x1; f.len = D; f.zs = flushR ? block : 0; f.ze = 0; f.yaw = 0; }
    f.inv.copy(f.m).invert();
  }
  /** 창 벽에 있는 방문의 L 구간(z) */
  private doorL(): [number, number] | null {
    const d = this.door; if (!d || d.wall !== this.winWall) return null;
    if (this.winWall === 'right') return [d.t, d.t + d.w];
    if (this.winWall === 'left') return [ROOM_D - d.t - d.w, ROOM_D - d.t];
    return [this.wf.len - d.t - d.w, this.wf.len - d.t];
  }
  /** 창 벽 좌표(L)의 점 → 방 좌표 */
  winToRoom(p: THREE.Vector3) { return p.clone().applyMatrix4(this.wf.m); }

  // ---- 홈뷰 가구 묶음 고르기·옮기기(사용자 지시 2026-11-02 「배치된 상품들을 선택해서 이동하게」)
  /** 스타일·장 벽별 묶음 이동 — main.ts 가 저장한다 */
  hvMoves: Record<string, Record<string, HvMove>> = {};
  /** 지금 방의 묶음 목록(뺀 것 포함) — 「뺀 가구 되살리기」 */
  hvUnitsInfo: { key: string; label: string; del: boolean }[] = [];
  get movesKey() { return `${this.roomStyle}|${this.hvWall}`; }
  /** 묶음 하나의 이동을 바꾸고 방을 조용히(재구성 표시 없이) 다시 만든다 */
  setUnitMove(key: string, mv: HvMove | null) {
    const k = this.movesKey, cur = { ...(this.hvMoves[k] ?? {}) };
    if (mv) cur[key] = mv; else delete cur[key];
    this.hvMoves[k] = cur;
    this.quietBuild = true; this.roomKey = ''; if (this.lastRoom) this.buildRoom(...this.lastRoom); this.quietBuild = false;
    this.sceneChanged();
  }
  private quietBuild = false;
  /** 가구 이동 재구성을 시작한 시각 — 0 이 아니면 새 방이 다 놓일 때까지 그리지 않는다 */
  private holdAt = 0;
  /** 화면 좌표 아래 가구 묶음(장·방문·창이 앞을 가리면 없음) */
  /** 화면 좌표 아래 가구 묶음 전부(앞에서 뒤 순서, 겹친 것까지) — 벽·바닥·천장에 닿으면 거기서 멈춘다(장 속에 묻힌 묶음은 장 뒤라도 넣는다).
   *  겹친 상품 고르기(사용자 지적 2026-11-06 「상품이 겹쳐 선택이 안 되거나, 선택돼도 이동·회전이 안 된다」) — 고른 묶음이 뒤에 있어도 끌고, 같은 자리를 다시 누르면 뒤 묶음으로 */
  unitsAt(ev: PointerEvent): THREE.Object3D[] {
    const targets: THREE.Object3D[] = [this.room]; if (this.wardrobe?.root.visible) targets.push(this.wardrobe.root);
    const unitOf = (x: THREE.Object3D | null) => { for (let o = x; o; o = o.parent) if (o.name === 'hv-unit') return o; return null; };
    const inWard = (x: THREE.Object3D | null) => { for (let o = x; o; o = o.parent) if (o === this.wardrobe?.root) return true; return false; };
    const out: THREE.Object3D[] = [];
    for (const h of this.rayAt(ev).intersectObjects(targets, true)) {
      if (!shown(h.object) || h.object.name === 'curtain' || h.object.name === 'open-mark') continue;
      const u = unitOf(h.object);
      if (u) { if (!out.includes(u)) out.push(u); continue; }
      if (inWard(h.object)) continue;              // 장 뒤에 묻힌 묶음도 — 장은 지나친다
      break;                                       // 벽·바닥·천장 — 그 뒤는 방 밖
    }
    return out;
  }
  pickUnit(ev: PointerEvent): THREE.Object3D | null {
    const targets: THREE.Object3D[] = [this.room]; if (this.wardrobe?.root.visible) targets.push(this.wardrobe.root);
    const unitOf = (x: THREE.Object3D | null) => { for (let o = x; o; o = o.parent) if (o.name === 'hv-unit') return o; return null; };
    const hits = this.rayAt(ev).intersectObjects(targets, true).filter(h => shown(h.object));
    const first = hits[0] ? unitOf(hits[0].object) : null;
    if (first) return first;
    // 장과 겹친 묶음은 장 속에 묻혀 앞이 가려도 고른다 — 그래야 끌어내 옮길 수 있다
    for (const h of hits) { const u = unitOf(h.object); if (u?.userData.conflict) return u; }
    return null;
  }
  // ---- 커튼 자락 끌기(사용자 지시 2026-11-03 「한쪽씩 골라 끌어서 펴거나 줄이게」) — 좌우 자락을 따로 레일 따라
  private curDrag: { c: THREE.Object3D; cg: THREE.Object3D; side: 'L' | 'R'; layer: 'In' | 'Out'; w0: number; x0: number; z0: number; raf: number; w?: number } | null = null;
  /** 화면 좌표 아래가 커튼 자락이면 그 쪽(L/R) — 앞을 다른 물체가 가리면 없음 */
  pickCurtain(ev: PointerEvent): { c: THREE.Object3D; side: 'L' | 'R'; layer: 'In' | 'Out'; point: THREE.Vector3 } | null {
    const targets: THREE.Object3D[] = [this.room]; if (this.wardrobe?.root.visible) targets.push(this.wardrobe.root);
    // 반투명 속커튼이 겉커튼 앞에 걸려 있어도 겉커튼을 잡는다 — 맨 앞 불투명 물체 앞까지의 커튼 중 겉커튼이 먼저, 없으면 속커튼(속커튼만 보이는 자리)
    const hs = this.rayAt(ev).intersectObjects(targets, true).filter(x => shown(x.object));
    const stop = hs.findIndex(x => !x.object.userData.curtainLayer);
    const cs = (stop < 0 ? hs : hs.slice(0, stop)).filter(x => x.object.userData.curtainSide);
    const h = cs.find(x => x.object.userData.curtainLayer === 'Out') ?? cs[0];
    const side = h?.object.userData.curtainSide as 'L' | 'R' | undefined;
    if (!h || !side) return null;
    let c: THREE.Object3D | null = h.object; while (c && c.name !== 'curtain-set') c = c.parent;
    return c?.userData.curtain ? { c, side, layer: h.object.userData.curtainLayer === 'In' ? 'In' : 'Out', point: h.point } : null;
  }
  /** 고른 커튼 — 파란 테두리(편집 표시, 거울엔 안 비친다). 방을 다시 지으면 커튼이 새로 생기므로 그때도 다시(buildRoom 끝) */
  private curMark = new THREE.Group();
  private curPicked = false;
  get curtainPicked() { return this.curPicked; }
  markCurtain(on: boolean) {
    this.curPicked = on;
    this.curMark.traverse(o => { const m = o as THREE.Mesh; m.geometry?.dispose(); (m.material as THREE.Material | undefined)?.dispose?.(); });
    this.curMark.clear();
    const c = on ? this.room.children.find(o => o.name === 'curtain-set') : undefined;
    if (c) {
      // 가구 묶음 고르기와 같은 모양 — 선 + 반투명 면(깊이 무시. 선만으론 벽·천장에 묻혀 안 보였다)
      const b = new THREE.Box3().setFromObject(c), col = 0x2f6bff;
      const h = new THREE.Box3Helper(b, col); h.layers.set(1); this.curMark.add(h);
      const sz = b.getSize(new THREE.Vector3()), fill = new THREE.Mesh(new THREE.BoxGeometry(sz.x, sz.y, sz.z),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.1, depthTest: false, depthWrite: false }));
      fill.position.copy(b.getCenter(new THREE.Vector3())); fill.layers.set(1); fill.renderOrder = 9; this.curMark.add(fill);
      if (!this.curMark.parent) this.scene.add(this.curMark);
    }
    this.dirty = true;
  }
  /** 커튼 레일 좌표(가운데 0, 레일 방향 x) 위 마우스 x — 자락이 걸린 세로 면(z = z0)과 만나는 자리 */
  private railX(ev: PointerEvent, cg: THREE.Object3D, z0: number) {
    const r = this.rayAt(ev).ray.clone().applyMatrix4(cg.matrixWorld.clone().invert());
    if (Math.abs(r.direction.z) < 1e-6) return null;
    const t = (z0 - r.origin.z) / r.direction.z;
    return r.origin.x + r.direction.x * t;
  }
  startCurtainDrag(ev: PointerEvent) {
    const p = this.pickCurtain(ev); if (!p) return false;
    const cg = p.c.children[0]; cg.updateWorldMatrix(true, false);
    const local = cg.worldToLocal(p.point.clone());
    const x0 = this.railX(ev, cg, local.z); if (x0 == null) return false;
    // 잡은 겹(속커튼 · 겉커튼)만 — 따로 열고 닫는다
    this.curDrag = { c: p.c, cg, side: p.side, layer: p.layer, w0: p.c.userData.curtain.width(p.side, p.layer), x0, z0: local.z, raf: 0 };
    return true;
  }
  moveCurtainDrag(ev: PointerEvent) {
    const d = this.curDrag; if (!d) return;
    const x = this.railX(ev, d.cg, d.z0); if (x == null) return;
    const w = d.side === 'L' ? d.w0 + (x - d.x0) : d.w0 - (x - d.x0);
    // 다시 접기는 프레임에 한 번(자락 꼭짓점 수만 개)
    cancelAnimationFrame(d.raf); d.w = w;
    d.raf = requestAnimationFrame(() => { d.c.userData.curtain.refold({ [this.curKey(d)]: w }); d.w = undefined; this.dirty = true; });
  }
  /** 끝 — 정한 폭을 방(스타일·장 벽)별로 기억한다(main.ts 가 저장) */
  endCurtainDrag() {
    const d = this.curDrag; this.curDrag = null; if (!d) return false;
    cancelAnimationFrame(d.raf);
    if (d.w != null) { d.c.userData.curtain.refold({ [this.curKey(d)]: d.w }); this.dirty = true; }   // 마지막 움직임이 아직 안 접혔으면
    const cur = d.c.userData.curtain.cur as { L?: number; R?: number; Li?: number; Ri?: number };
    const k = this.movesKey, all = { ...(this.hvMoves[k] ?? {}) };
    all[CURTAIN_KEY] = { dx: 0, dz: 0, rot: 0, cL: cur.L, cR: cur.R, cLi: cur.Li, cRi: cur.Ri };
    this.hvMoves[k] = all;
    if (this.curPicked) this.markCurtain(true);    // 펴고 접은 폭으로 테두리를 다시
    this.sceneChanged();
    return true;
  }
  /** 접기 값 이름 — 겉커튼 L · R, 속커튼 Li · Ri */
  private curKey(d: { side: 'L' | 'R'; layer: 'In' | 'Out' }) { return d.layer === 'In' ? `${d.side}i` : d.side; }
  get curtainDragging() { return !!this.curDrag; }
  findUnit(key: string | null) { let u: THREE.Object3D | null = null; if (key) this.room.traverse(o => { if (o.name === 'hv-unit' && o.userData.hvUnit === key) u = o; }); return u as THREE.Object3D | null; }
  /** 바닥(y = 0) 위 마우스 자리 */
  /** 벽 장식이 걸린 벽(가장 가까운 벽) 면 위 마우스 자리 — 벽을 따라 옆·위아래로 끈다 */
  decorWallAt(ev: PointerEvent, u: THREE.Object3D) {
    const r = this.unitRect(u, u.position); if (!r) return null;
    const d = [r[0] - this.rx0, this.rx1 - r[1], r[2], ROOM_D - r[3]], k = d.indexOf(Math.min(...d));
    const n = k < 2 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1), c = [this.rx0, this.rx1, 0, ROOM_D][k];
    return this.rayAt(ev).ray.intersectPlane(new THREE.Plane(n, -c), new THREE.Vector3());
  }
  // ---- 벽 장식 벽째 옮기기(사용자 지시 2026-11-12 「소품들도 다른 벽으로 이동 가능하게, 벽에 붙어 이동하는 소품은 벽에 딱 붙여서」)
  // 마우스가 가리키는 벽(방 안에서 보이는 네 벽 중 가장 가까운 것)에 등을 대고 딱 붙인다. 다른 벽을 가리키면 그 벽을 보게 돌려 옮긴다
  /** 끌기 시작 — 등 방향(묶음 좌표, 걸린 벽 쪽) · 잡은 점(묶음 좌표) · 돌리기 전 몸체 상자(묶음 기준점 기준) */
  decorGrab(ev: PointerEvent, u: THREE.Object3D) {
    const r = this.unitRect(u, u.position), p = this.decorWallAt(ev, u); if (!r || !p) return null;
    const d = [r[0] - this.rx0, this.rx1 - r[1], r[2], ROOM_D - r[3]], k = d.indexOf(Math.min(...d));
    const Y = new THREE.Vector3(0, 1, 0), inv = -u.rotation.y;
    const out = [new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 1)][k];
    // 실제 모양으로 벽에 붙인다(몸체 크기로 붙이면 걸이 등 튀어나온 부분이 벽을 뚫었다) — 묶음 좌표 = 돌리기 전 기준점 기준
    const box = this.meshLocalBox(u);
    return { back: out.clone().applyAxisAngle(Y, inv), grab: p.clone().sub(u.position).applyAxisAngle(Y, inv), box };
  }
  /** 끄는 중 — 놓을 자리(기준점)·돌린 각(라디안). 가리키는 벽이 없으면 null */
  decorDrag(ev: PointerEvent, u: THREE.Object3D, g: { back: THREE.Vector3; grab: THREE.Vector3; box: THREE.Box3 }) {
    const ray = this.rayAt(ev).ray, D = ROOM_D, H = ROOM_H;
    // 네 벽 안쪽 면 — 안쪽 법선 · 면 자리. 방 밖에서 보며 지나는 가까운 벽(바깥 면)은 건너뛴다
    const walls = [{ n: new THREE.Vector3(1, 0, 0), c: this.rx0 }, { n: new THREE.Vector3(-1, 0, 0), c: this.rx1 },
      { n: new THREE.Vector3(0, 0, 1), c: 0 }, { n: new THREE.Vector3(0, 0, -1), c: D }];
    let k = -1, tBest = Infinity;
    const hit = new THREE.Vector3();
    walls.forEach((w, i) => {
      const den = ray.direction.dot(w.n); if (den > -1e-6) return;
      const t = ((i < 2 ? w.c * w.n.x : w.c * w.n.z) - ray.origin.dot(w.n)) / den; if (t <= 0 || t >= tBest) return;
      const q = ray.origin.clone().addScaledVector(ray.direction, t);
      const along = i < 2 ? q.z >= -0.05 && q.z <= D + 0.05 : q.x >= this.rx0 - 0.05 && q.x <= this.rx1 + 0.05;
      if (!along || q.y < -0.05 || q.y > H + 0.05) return;
      k = i; tBest = t; hit.copy(q);
    });
    if (k < 0) return null;
    const Y = new THREE.Vector3(0, 1, 0), out = walls[k].n.clone().negate();
    const rot = Math.atan2(out.x, out.z) - Math.atan2(g.back.x, g.back.z);
    const rb = g.box.clone().applyMatrix4(new THREE.Matrix4().makeRotationY(rot));
    const pos = hit.clone().sub(g.grab.clone().applyAxisAngle(Y, rot));
    // 등을 벽에 딱 — 그 벽을 따라서는 방 안(양 끝 벽에 닿을 때까지)
    if (k === 0) pos.x = this.rx0 - rb.min.x; else if (k === 1) pos.x = this.rx1 - rb.max.x;
    else if (k === 2) pos.z = -rb.min.z; else pos.z = D - rb.max.z;
    if (k < 2) pos.z = THREE.MathUtils.clamp(pos.z, -rb.min.z, Math.max(-rb.min.z, D - rb.max.z));
    else pos.x = THREE.MathUtils.clamp(pos.x, this.rx0 - rb.min.x, Math.max(this.rx0 - rb.min.x, this.rx1 - rb.max.x));
    pos.y = THREE.MathUtils.clamp(pos.y, 0.02 - g.box.min.y, Math.max(0.02 - g.box.min.y, H - 0.02 - g.box.max.y));
    return { pos, rot: Math.atan2(Math.sin(rot), Math.cos(rot)) };
  }
  /** 벽 장식 높이 — 묶음 기준점 y 를 장식이 바닥 2cm 위 ~ 천장 2cm 아래에 들도록 */
  clampDecorY(u: THREE.Object3D, y: number) {
    const b = coreBox(u), lo = b.min.y - u.position.y, hi = b.max.y - u.position.y;
    return THREE.MathUtils.clamp(y, 0.02 - lo, ROOM_H - 0.02 - hi);
  }
  floorAt(ev: PointerEvent) {
    const r = this.rayAt(ev).ray; if (Math.abs(r.direction.y) < 1e-6) return null;
    const k = -r.origin.y / r.direction.y; return k > 0 ? r.origin.clone().addScaledVector(r.direction, k) : null;
  }
  /** 선택(파랑)·겹침(빨강) 상자 — 편집 표시(레이어 1, 거울엔 안 비친다) */
  private unitMarks = new THREE.Group();
  private markSel: string | null = null;
  markUnits(selKey: string | null) {
    this.markSel = selKey;
    this.unitMarks.traverse(o => { if (o instanceof CSS2DObject) o.element.remove(); (o as THREE.Mesh).geometry?.dispose(); ((o as THREE.Mesh).material as THREE.Material | undefined)?.dispose?.(); });
    this.unitMarks.clear();
    if (!this.unitMarks.parent) this.scene.add(this.unitMarks);
    this.room.traverse(o => {
      if (o.name !== 'hv-unit') return;
      const sel = o.userData.hvUnit === selKey, bad = !!o.userData.conflict && !this.wardHidden;
      if (!sel && !bad) return;
      const b = coreBox(o); b.min.y = Math.max(b.min.y, 0.005);   // 손잡이 등 튀어나온 부분은 뺀 몸체 크기(furnish.ts)
      const col = sel ? 0x2f6bff : 0xff3b30;
      const h = new THREE.Box3Helper(b, col); h.layers.set(1); this.unitMarks.add(h);
      // 선만으론 1px 이라 잘 안 보인다 — 반투명 면을 덧입힌다(깊이 무시: 장 속에 묻힌 묶음도 보이게)
      const sz = b.getSize(new THREE.Vector3()), fill = new THREE.Mesh(new THREE.BoxGeometry(sz.x, sz.y, sz.z),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: sel ? 0.1 : 0.14, depthTest: false, depthWrite: false }));
      // Box3Helper 는 상자에 맞춰 자기를 키우고 옮긴다 — 면은 자식이 아니라 형제로(자식이면 크기·위치가 두 번 먹었다)
      fill.position.copy(b.getCenter(new THREE.Vector3())); fill.layers.set(1); fill.renderOrder = 9; this.unitMarks.add(fill);
      if (sel) this.addRing(o);
    });
    if (!this.unitMarks.children.some(c => c.name === 'rot-ring')) this.ring = null;
    this.applyOpenMark();
    this.dirty = true;
  }
  // ---- 방문·창 선택 표시(사용자 지시 2026-11-05 「도어나 창문 선택하면 선택 표시를 해줘」) — 가구 묶음과 같은 파란 테두리 + 옅은 면.
  // 문·창 무리(doorG · winG)의 자식으로 달아 끌어 옮길 때 함께 움직인다. 방을 다시 만들면(무리 비움) markUnits 가 다시 단다
  private openSel: 'door' | 'window' | null = null;
  markOpening(kind: 'door' | 'window' | null) {
    if (kind === this.openSel && (!kind || (kind === 'door' ? this.doorG : this.winG).getObjectByName('open-mark'))) return;
    this.openSel = kind; this.applyOpenMark(); this.dirty = true;
  }
  private applyOpenMark() {
    for (const g of [this.doorG, this.winG]) for (const o of g.children.filter(c => c.name === 'open-mark')) {
      o.removeFromParent(); o.traverse(c => { (c as THREE.Mesh).geometry?.dispose(); ((c as THREE.Mesh).material as THREE.Material | undefined)?.dispose?.(); });
    }
    const g = this.openSel === 'door' ? this.doorG : this.openSel === 'window' ? this.winG : null;
    if (g?.parent) this.addMark(g, 0x2f6bff);
  }
  /** 무리 g 둘레에 테두리 + 옅은 면(무리의 자식 'open-mark') — 방문·창·설비 선택 표시 */
  private addMark(g: THREE.Object3D, col: number, fill = true, name = 'open-mark') {
    // 무리 좌표로 상자를 잰다(옆벽 문·창은 무리가 돌아 있어 월드 상자로는 비뚤어진다). 커튼은 빼고 문틀·창틀까지
    g.updateMatrixWorld(true);
    const inv = g.matrixWorld.clone().invert(), b = new THREE.Box3(), mb = new THREE.Box3();
    g.traverse(o => {
      const m = o as THREE.Mesh;
      if (!m.isMesh || !m.visible || m.name === 'curtain' || !m.geometry) return;
      if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
      b.union(mb.copy(m.geometry.boundingBox!).applyMatrix4(inv.clone().multiply(m.matrixWorld)));
    });
    if (b.isEmpty()) return;
    b.expandByScalar(0.01);
    const mark = new THREE.Group(); mark.name = name;
    const sz = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
    const line = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(sz.x, sz.y, sz.z)),
      new THREE.LineBasicMaterial({ color: col, depthTest: false, depthWrite: false }));
    const fillM = new THREE.Mesh(new THREE.BoxGeometry(sz.x, sz.y, sz.z),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.1, depthTest: false, depthWrite: false }));
    for (const o of fill ? [line, fillM] : [line]) { o.position.copy(c); o.layers.set(1); o.renderOrder = 9; o.raycast = () => {}; mark.add(o); }
    g.add(mark);
  }
  /** 고른 칸·도어 테두리 — 선만(칸 안을 가리지 않게). 물체에 붙어 같이 움직인다(튀어나온 칸 · 열리는 도어). 사용자 지시 2026-11-09 「선택된 것 라인이 있어야」 */
  markPicked(objs: THREE.Object3D[]) {
    this.wardrobe?.root.traverse(o => { for (const c of o.children.filter(x => x.name === 'sel-mark')) c.removeFromParent(); });
    // 외곽선(실루엣 바깥 테두리) — 상자 선은 뒤쪽 모서리까지 보여 「각각 박스」로 읽혔다(사용자 지적 2026-11-09). 외곽선을 못 그리는 렌더러(WebGL)만 상자 선
    if (!this.raster.setOutline(objs)) for (const g of objs) this.addMark(g, 0x2f6bff, false, 'sel-mark');
    this.dirty = true;
  }
  // ---- 회전 고리 — 고른 묶음 둘레 바닥에 고리를 그리고, 고리를 잡아 끌면 5° 단위로 돈다(사용자 지시 2026-11-03)
  /** 고리 중심(묶음 기준점)·반지름 */
  ring: { c: THREE.Vector3; R: number; a: number } | null = null;
  private addRing(u: THREE.Object3D) {
    const f = u.userData.fpL as number[] | undefined; if (!f) return;
    const R = Math.max(Math.hypot(Math.max(-f[0], f[1]), Math.max(-f[2], f[3])) + 0.12, 0.45);
    const mat = () => new THREE.MeshBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.75, depthTest: false, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(R - 0.025, R + 0.025, 96), mat());
    ring.rotation.x = -Math.PI / 2; ring.position.set(u.position.x, 0.02, u.position.z); ring.name = 'rot-ring';
    // 손잡이 — 묶음 앞쪽(기준 +z) 방향 점. 돌리면 따라 돈다
    const a = u.rotation.y, knob = new THREE.Mesh(new THREE.CircleGeometry(0.07, 32), mat());
    knob.rotation.x = -Math.PI / 2; knob.position.set(u.position.x + R * Math.sin(a), 0.021, u.position.z + R * Math.cos(a));
    for (const m of [ring, knob]) { m.layers.set(1); m.renderOrder = 11; this.unitMarks.add(m); }
    // 지금 각도 — 손잡이 바깥에(사용자 지시 2026-11-06 「선택 회전 시 현재 각도가 안 보인다」). 돌리는 중에도 previewRot → markUnits 로 다시 그려 따라 바뀐다
    const deg = ((Math.round(a * 180 / Math.PI) % 360) + 360) % 360;
    const el = document.createElement('div'); el.className = 'rot-deg'; el.textContent = `${deg}°`;
    const lab = new CSS2DObject(el); lab.position.set(u.position.x + (R + 0.24) * Math.sin(a), 0.03, u.position.z + (R + 0.24) * Math.cos(a));
    this.unitMarks.add(lab);
    this.ring = { c: u.position.clone(), R, a };
  }
  /** 마우스가 고리 위면 그 방향 각(라디안, atan2(x, z) — rotation.y 와 같은 방향), 아니면 null.
   *  고리는 바닥에 있지만 가구 위에 겹쳐 그려진다 — 마우스 아래 가구가 있으면 손잡이 근처만 고리로 본다(가구를 누르면 끌기·다시 누르기가 먼저, 2026-11-06) */
  ringAt(ev: PointerEvent): number | null {
    const g = this.ring, p = g && this.floorAt(ev); if (!g || !p) return null;
    if (this.unitsAt(ev).length && Math.hypot(p.x - (g.c.x + g.R * Math.sin(g.a)), p.z - (g.c.z + g.R * Math.cos(g.a))) > 0.15) return null;
    return Math.abs(Math.hypot(p.x - g.c.x, p.z - g.c.z) - g.R) < 0.12 ? Math.atan2(p.x - g.c.x, p.z - g.c.z) : null;
  }
  /** 고리 중심에서 본 마우스 방향 각(끄는 중 — 고리에서 벗어나도) */
  ringAngle(ev: PointerEvent): number | null {
    const g = this.ring, p = g && this.floorAt(ev); return g && p ? Math.atan2(p.x - g.c.x, p.z - g.c.z) : null;
  }
  /** 돌리는 중 미리보기 */
  previewRot(u: THREE.Object3D, ang: number) { u.rotation.y = ang; u.updateMatrixWorld(true); this.markUnits(this.markSel); }
  /** 끄는 중 미리보기 — 묶음과 상자를 함께 옮긴다 */
  previewUnit(u: THREE.Object3D, pos: THREE.Vector3, rot?: number) {
    u.position.copy(pos); if (rot !== undefined) u.rotation.y = rot; u.updateMatrixWorld(true);
    this.markUnits(this.markSel);           // 표시를 묶음 새 자리로(묶음 몇 개라 가볍다)
  }

  // ---- 끌기 제약 — 벽·장·장 앞 통로·방문 열림·다른 가구를 뚫지 않고 미끄러지며, 6cm 안이면 딱 붙는다
  // (사용자 지적 2026-11-03 「가구 이동시 스냅이 안 걸리니까 벽을 뚫고 지나가던지 가구끼리 겹쳐」)
  /** 장·장 앞 통로·방문 열림 자리(x0, x1, z0, z1) — 방을 만들 때 */
  private unitAvoid: [number, number, number, number][] = [];
  /** 묶음 바닥 발자국(x0, x1, z0, z1) — pos 에 놓고 ang(라디안, 기본 지금 각)으로 돌렸을 때. 비스듬하면 그 외접 사각형 */
  unitRect(u: THREE.Object3D, pos: THREE.Vector3, ang = u.rotation.y): number[] | null {
    const f = u.userData.fpL as number[] | undefined; if (!f) return null;
    const c = Math.cos(ang), s = Math.sin(ang);
    const cs = [[f[0], f[2]], [f[1], f[2]], [f[0], f[3]], [f[1], f[3]]].map(([x, z]) => [x * c + z * s, -x * s + z * c]);   // y 축 회전
    const xs = cs.map(p => p[0]), zs = cs.map(p => p[1]);
    return [pos.x + Math.min(...xs), pos.x + Math.max(...xs), pos.z + Math.min(...zs), pos.z + Math.max(...zs)];
  }
  /** 장 자리 추천 — 장 벽(z = 0)을 따라 가구(장 앞 band 안에 걸린 것)·방문 열림이 없는 구간. 벽 왼쪽 끝 기준(m) */
  wardFreeRuns(band: number): [number, number][] {
    const x0 = this.rx0, x1 = this.rx1, blk: [number, number][] = [];
    this.room.traverse(o => { if (o.name === 'hv-unit' && o.userData.kind === 'furn') { const r = this.unitRect(o, o.position); if (r && r[2] < band) blk.push([r[0], r[1]]); } });
    const sw = this.doorSwing(x0, x1); if (sw && sw[2] < band) blk.push([sw[0], sw[1]]);
    blk.sort((a, b) => a[0] - b[0]);
    const runs: [number, number][] = []; let cur = x0;
    for (const [a, b] of blk) { if (a > cur + 0.01) runs.push([cur - x0, Math.min(a, x1) - x0]); cur = Math.max(cur, b); }
    if (x1 > cur + 0.01) runs.push([cur - x0, x1 - x0]);
    return runs;
  }
  /** 막는 것 — 가구 묶음만 서로 막는다(러그·벽 장식은 벽만). 의자는 책상·테이블 밑으로 들어간다(furnish.ts 겹침 판정과 같은 규칙) */
  private unitObstacles(u: THREE.Object3D) {
    // 벽 장식은 벽에만 막힌다 — 장·장 도어 열림·방문·창 자리는 무시하고 건다(사용자 지시 2026-11-05 「소품들은 무시하고 배치 가능하도록」)
    if (u.userData.kind === 'decor') return [];
    if (u.userData.kind !== 'furn') return [];
    const obs: number[][] = [...this.unitAvoid];
    const tuck = u.userData.tuck;
    this.room.traverse(o => {
      if (o.name !== 'hv-unit' || o === u || o.userData.kind !== 'furn') return;
      if (tuck && o.userData.tuck && o.userData.tuck !== tuck) return;
      const r = this.unitRect(o, o.position); if (r) obs.push(r);
    });
    return obs;
  }
  /** from → to 로 끌 때 갈 수 있는 자리. 축마다 쓸어 가며 처음 닿는 면에서 멈추고(뚫고 지나가지 않는다), 남은 축으로 미끄러진다 */
  /** 실제 모양 범위(묶음 좌표, 돌리기 전) — 몸체 크기(fpL)는 손잡이 등 튀어나온 부분을 빼서 벽에 붙이면 그만큼 벽을 뚫었다
   *  (사용자 지적 2026-11-12 「안방 침대가 약간 벽을 뚫고 들어가」 — 실측 1cm). 벽과의 판정에만 쓴다. 바닥 그늘판은 뺀다 */
  meshLocalBox(u: THREE.Object3D) {
    u.updateMatrixWorld(true);
    const inv = u.matrixWorld.clone().invert(), m = new THREE.Matrix4(), b = new THREE.Box3(), t = new THREE.Box3();
    u.traverse(o => {
      const me = o as THREE.Mesh;
      if (!me.isMesh || me.name === 'contact-shadow' || !me.geometry) return;
      for (let q: THREE.Object3D | null = me; q && q !== u; q = q.parent) if (!q.visible) return;
      if (!me.geometry.boundingBox) me.geometry.computeBoundingBox();
      b.union(t.copy(me.geometry.boundingBox!).applyMatrix4(m.multiplyMatrices(inv, me.matrixWorld)));
    });
    return b;
  }
  /** 벽 판정용 범위 — 몸체 사각형(unitRect) 기준으로 실제 모양이 더 나간 만큼 벽을 안쪽으로 당긴 값 [x0, x1, z0, z1] */
  private wallBounds(u: THREE.Object3D, at: THREE.Vector3) {
    const W = [this.rx0, this.rx1, 0, ROOM_D];
    const r = this.unitRect(u, at), mb = this.meshLocalBox(u);
    if (!r || mb.isEmpty()) return W;
    const f = u.userData.fpL as number[], ang = u.rotation.y;
    const save = u.userData.fpL; u.userData.fpL = [Math.min(f[0], mb.min.x), Math.max(f[1], mb.max.x), Math.min(f[2], mb.min.z), Math.max(f[3], mb.max.z)];
    const rm = this.unitRect(u, at, ang)!; u.userData.fpL = save;
    const cap = (v: number) => Math.min(Math.max(v, 0), 0.15);   // 이상하게 큰 모양(늘어진 천 등)은 15cm 까지만
    return [W[0] + cap(r[0] - rm[0]), W[1] - cap(rm[1] - r[1]), W[2] + cap(r[2] - rm[2]), W[3] - cap(rm[3] - r[3])];
  }
  /** 실제 모양이 벽을 뚫은 묶음을 방 안으로 — 모델이 다 들어온 뒤 한 번(buildRoom). 몸체 크기로 놓아 튀어나온 부분이 벽에 박혀 있었다 */
  private pushUnitsOutOfWalls() {
    for (const u of this.room.children) {
      if (u.name !== 'hv-unit' || u.userData.kind === 'rug') continue;
      const r = this.unitRect(u, u.position); if (!r) continue;
      const w = this.wallBounds(u, u.position);
      const dx = r[0] < w[0] - 0.002 ? w[0] - r[0] : r[1] > w[1] + 0.002 ? w[1] - r[1] : 0;
      const dz = r[2] < w[2] - 0.002 ? w[2] - r[2] : r[3] > w[3] + 0.002 ? w[3] - r[3] : 0;
      if (dx || dz) { u.position.x += dx; u.position.z += dz; u.updateMatrixWorld(true); }
    }
  }
  constrainUnit(u: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3 {
    const r0 = this.unitRect(u, from); if (!r0) return to.clone();
    const wb = this.wallBounds(u, from);
    const E = 0.002, SNAP = 0.06, W = [[wb[0], wb[1]], [wb[2], wb[3]]];
    const hit = (r: number[], b: number[]) => r[0] < b[1] - E && r[1] > b[0] + E && r[2] < b[3] - E && r[3] > b[2] + E;
    // 처음부터 겹친 것(장 속에 묻힌 채 시작)은 막지 않는다 — 그래야 끌어낼 수 있다
    const obs = this.unitObstacles(u).filter(b => !hit(r0, b));
    const mv = (r: number[], a: number, d: number) => { const n = r.slice(); n[a * 2] += d; n[a * 2 + 1] += d; return n; };
    const side = (r: number[], b: number[], a: number) => { const o = a ? 0 : 2; return r[o] < b[o + 1] - E && r[o + 1] > b[o] + E; };
    const slide = (r: number[], a: number, d: number) => {
      const lo = a * 2;
      if (d > 0) { let lim = W[a][1] - r[lo + 1]; for (const b of obs) if (side(r, b, a) && b[lo] >= r[lo + 1] - E) lim = Math.min(lim, b[lo] - r[lo + 1]); return Math.min(d, Math.max(0, lim)); }
      let lim = W[a][0] - r[lo]; for (const b of obs) if (side(r, b, a) && b[lo + 1] <= r[lo] + E) lim = Math.max(lim, b[lo + 1] - r[lo]); return Math.max(d, Math.min(0, lim));
    };
    // 벽·가구 면이 6cm 안이면 붙인다
    const snap = (r: number[], a: number) => {
      const lo = a * 2, c = [W[a][0] - r[lo], W[a][1] - r[lo + 1]];
      for (const b of obs) if (side(r, b, a)) { if (b[lo + 1] <= r[lo] + E) c.push(b[lo + 1] - r[lo]); if (b[lo] >= r[lo + 1] - E) c.push(b[lo] - r[lo + 1]); }
      const g = c.filter(x => Math.abs(x) > 1e-4 && Math.abs(x) <= SNAP).sort((x, y) => Math.abs(x) - Math.abs(y))[0];
      return g ? slide(r, a, g) : 0;
    };
    const want = [to.x - from.x, to.z - from.z];
    // 벽 장식(액자·시계)은 걸린 벽을 따라서만 — 가장 가까운 벽에 수직인 방향은 잠근다(방 안으로 끌려 나와 떠 있지 않게)
    if (u.userData.kind === 'decor') {
      const d = [r0[0] - this.rx0, this.rx1 - r0[1], r0[2], ROOM_D - r0[3]];
      want[d.indexOf(Math.min(...d)) < 2 ? 0 : 1] = 0;
    }
    const run = (order: number[]) => {
      let r = r0; const dd = [0, 0];
      for (const a of order) { const s = slide(r, a, want[a]); dd[a] += s; r = mv(r, a, s); }
      for (const a of [0, 1]) { const s = snap(r, a); dd[a] += s; r = mv(r, a, s); }
      return { dd, err: Math.hypot(want[0] - dd[0], want[1] - dd[1]) };
    };
    const a = run([0, 1]), b = run([1, 0]), best = a.err <= b.err ? a : b;
    return new THREE.Vector3(from.x + best.dd[0], to.y, from.z + best.dd[1]);
  }
  /** 지금 각(돌린 뒤)에서 벽·장·가구와 안 겹치게 가장 조금 밀어 낼 거리(x, z). 못 찾으면 0(겹침 표시로 남는다) */
  settleUnit(u: THREE.Object3D): { x: number; z: number } {
    const r0 = this.unitRect(u, u.position); if (!r0) return { x: 0, z: 0 };
    const E = 0.002, obs = this.unitObstacles(u);
    const hit = (r: number[], b: number[]) => r[0] < b[1] - E && r[1] > b[0] + E && r[2] < b[3] - E && r[3] > b[2] + E;
    const at = (d: number[]) => [r0[0] + d[0], r0[1] + d[0], r0[2] + d[1], r0[3] + d[1]];
    const inRoom = (d: number[]) => {   // 방 안으로 끌어들이는 만큼 더한다
      const r = at(d), cx = r[0] < this.rx0 ? this.rx0 - r[0] : r[1] > this.rx1 ? this.rx1 - r[1] : 0, cz = r[2] < 0 ? -r[2] : r[3] > ROOM_D ? ROOM_D - r[3] : 0;
      return [d[0] + cx, d[1] + cz];
    };
    let best: number[] | null = null, frontier = [[0, 0]];
    for (let depth = 0; depth < 4 && frontier.length; depth++) {
      const next: number[][] = [];
      for (const d0 of frontier) {
        const d = inRoom(d0), r = at(d), over = obs.filter(b => hit(r, b));
        if (!over.length) { if (!best || Math.hypot(d[0], d[1]) < Math.hypot(best[0], best[1])) best = d; continue; }
        for (const b of over) next.push([d[0] + b[1] - r[0], d[1]], [d[0] + b[0] - r[1], d[1]], [d[0], d[1] + b[3] - r[2]], [d[0], d[1] + b[2] - r[3]]);
      }
      frontier = next.slice(0, 400);
    }
    // 들어갈 자리가 없으면(돌린 책상이 장 앞 통로와 맞은편 벽 사이보다 길 때 등) 방 안으로만 넣고 겹침 표시로 남긴다
    const d = best ?? inRoom([0, 0]);
    return { x: d[0], z: d[1] };
  }

  /** 창 끌기 — 마우스가 가리키는 벽(장 벽 빼고)과 그 벽 위 자리. 다른 벽이면 놓을 때 그 벽으로 옮긴다 */
  windowWallAt(ev: PointerEvent): { wall: 'left' | 'right' | 'front'; t: number; len: number; p: THREE.Vector3 } | null {
    const rc = this.rayAt(ev), o = rc.ray.origin, v = rc.ray.direction, D = ROOM_D, x0 = this.rx0, x1 = this.rx1;
    const c: { wall: 'left' | 'right' | 'front'; k: number; t: number; len: number; p: THREE.Vector3 }[] = [];
    const tryX = (wall: 'left' | 'right', x: number) => { if (Math.abs(v.x) < 1e-6) return; const k = (x - o.x) / v.x; if (k <= 0) return; const p = o.clone().addScaledVector(v, k); if (p.z < 0 || p.z > D || p.y < 0 || p.y > ROOM_H) return; c.push({ wall, k, t: wall === 'right' ? p.z : D - p.z, len: D, p }); };
    const tryZ = (z: number) => { if (Math.abs(v.z) < 1e-6) return; const k = (z - o.z) / v.z; if (k <= 0) return; const p = o.clone().addScaledVector(v, k); if (p.x < x0 || p.x > x1 || p.y < 0 || p.y > ROOM_H) return; c.push({ wall: 'front', k, t: x1 - p.x, len: x1 - x0, p }); };
    tryX('left', x0); tryX('right', x1); tryZ(D);
    return c.sort((a, b) => a.k - b.k)[0] ?? null;
  }
  /** 창 다른 벽 미리보기 — 창 크기 사각형 */
  private winGhost: THREE.Mesh | null = null;
  ghostWindow(at: { wall: 'left' | 'right' | 'front'; t: number } | null, w: RoomWindow) {
    if (!at) { this.winGhost?.removeFromParent(); this.dirty = true; return; }
    if (!this.winGhost) {
      this.winGhost = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.35, depthTest: false, side: THREE.DoubleSide }));
      this.winGhost.layers.set(1); this.winGhost.renderOrder = 10;
    }
    const g = this.winGhost, D = ROOM_D, x0 = this.rx0, x1 = this.rx1, y = w.sill + w.h / 2, a = THREE.MathUtils.clamp(at.t, 0.1, Math.max(0.1, (at.wall === 'front' ? x1 - x0 : D) - w.w - 0.1)) + w.w / 2;
    g.scale.set(w.w, w.h, 1);
    if (at.wall === 'front') { g.position.set(x1 - a, y, D - 0.01); g.rotation.set(0, 0, 0); }
    else if (at.wall === 'right') { g.position.set(x1 - 0.01, y, a); g.rotation.set(0, Math.PI / 2, 0); }
    else { g.position.set(x0 + 0.01, y, D - a); g.rotation.set(0, Math.PI / 2, 0); }
    if (!g.parent) this.scene.add(g);
    this.dirty = true;
  }
  /** 창 하늘빛 — 실시간은 창을 지나는 하늘 산란광을 따로 계산하지 못해 창 크기 면광원으로 넣는다. 경로 추적은 하늘을 직접 계산하므로 끈다 */
  windowLight = new THREE.RectAreaLight(0xe6edff, WINDOW_NITS, 1, 1);
  wardrobe: Built | null = null;
  overlay = new THREE.Group();         // 치수선 · 핫스팟 · 선택 상자
  mode: RenderMode = 'raster';
  lines = false;                       // 재질+라인 보기
  onStatus?: (text: string) => void;   // 실사 모드 진행 상태
  private sky: THREE.DataTexture | null = null;
  /** 바닥·벽 재질 — 방을 다시 만들지 않고 재질만 바꾼다 */
  surfaces: Record<SurfaceKind, Surface[]> = { floor: [BASE_SURFACES.floor], wall: [BASE_SURFACES.wall] };
  surfaceSel: Record<SurfaceKind, string> = { floor: 'oak', wall: 'paint' };
  /** 걸레받이·몰딩 색 — CMF 세트가 바닥·벽지와 함께 바꾼다. 몰딩 = 방문 문틀(있을 때만). 방에 없는 몰딩은 바뀔 것도 없다 */
  private trimMat = new THREE.MeshPhysicalMaterial({ color: '#f6f5f2', roughness: 0.45, metalness: SPACE_FLAG });   // 공간 표시(spaceao.ts)
  trimColor = '#f6f5f2';
  setTrim(hex: string) { this.trimColor = hex; this.trimMat.color.set(hex); Stage.casingMat.color.set(hex); this.syncShellLM(); this.dirty = true; this.envDirty = true; this.sceneChanged(); }
  private floorMat = new THREE.MeshPhysicalMaterial({ roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.25, metalness: SPACE_FLAG });
  private wallMat = new THREE.MeshPhysicalMaterial({ roughness: 0.9, metalness: SPACE_FLAG });
  private texCache = new Map<string, THREE.Texture>();
  // 다시 그리기 — 장면이 바뀌면 그림자 지도까지, 카메라·편집 표시만 바뀌면 화면만(그림자는 그대로) 다시 그린다.
  // 카메라를 돌리기만 해도 그림자 5장(해 + 다운라이트 4)을 매 프레임 새로 그렸다(실측 2026-10-30)
  private _dirty = true;
  private shadowDirty = true;
  private get dirty() { return this._dirty; }
  private set dirty(v: boolean) { this._dirty = v; if (v) { this.shadowDirty = true; if (this.mode === 'gpupt') this.gptRescene(); } }
  /** ⑤ — 장면(가구·조명·재질)이 바뀌면 BVH 를 다시 짓는다. 연달아 바뀌면(슬라이더) 멈춘 뒤 한 번 */
  private gptTimer = 0;
  private gptRescene() {
    clearTimeout(this.gptTimer);
    this.gptTimer = window.setTimeout(() => {
      if (this.mode !== 'gpupt' || !gpt || this.raster.kind !== 'webgpu') return;
      this.noWindowLight(false); this.overlay.visible = false; this.scene.updateMatrixWorld(true);
      gpt.showGpuPt(this.raster.renderer as WebGPURenderer, this.scene, this.camera, this.roomCfg.exposure);
    }, 300);
  }
  private roomW = 0;
  /** 공간 구조 — 기본은 예전과 같은 「우측 오픈」(붙박이장 폭 + 오른쪽 1.5m) */
  layout: RoomLayout = 'openR';
  private roomKey = '';
  private roomParts: [string, string][] | null = null;
  /** 방 안쪽 가로 범위(m) — 붙박이장은 0 ~ 폭 */
  /** 오픈된 쪽으로 이어지는 방 폭(m) — 「재질+라인+사이즈」에서 벽까지 빈 공간을 입력해 바꾼다 */
  openW = { L: OPEN_W, R: OPEN_W };
  rx0 = 0;
  rx1 = 0;
  /** 장 놓인 자리 — 설치 공간(벽) 안에서 왼쪽 끝 x(m). 방 출입문 자리를 비우면 0 보다 크다 */
  private wOff = 0;
  // 방문 — 사용자가 놓은 값(doorWant, main 의 roomDoor 와 같은 객체)과 지금 그린 값(door)을 나눈다. 방을 지을 때 문을 벽 안으로 당기는 보정은
  // 그린 값에만 한다 — 예전엔 공유 객체를 직접 고쳐, 레이아웃을 바꾸는 순간 옛 장 폭(1.2m)으로 잠깐 지은 방에 맞춰 문이 0.83m → 0.37m 로
  // 영구히 옮겨졌고, 추천 목록(옛 문 자리)과 실제 배치(옮겨진 문)가 어긋났다(사용자 지적 2026-11-05 「꼬이더라」)
  private doorWant: RoomDoor | null = null;
  private doorDrawn: RoomDoor | null = null;
  get door() { return this.doorDrawn; }
  set door(d: RoomDoor | null) { this.doorWant = d; this.doorDrawn = d; }
  /** 소품 보이기 — 장 안 소품(옷·이불·상자) + 방 소품(침대·침구·협탁·선반장·커튼) */
  propsVisible = true;
  private doorG = new THREE.Group();
  private doorZone = new THREE.Group();
  /** 설비(콘센트·통신단자함·에어컨) — 방을 다시 만들면 drawFixtures 가 다시 단다 */
  fixtures: RoomFixture[] = [];
  private fixGs: THREE.Group[] = [];
  private fixSel: string | null = null;
  /** 기본 설비(사용자가 아직 손대지 않음) — 방을 꾸민 뒤 가구·창·방문을 피한 벽 자리로 민다(settleFixtures) */
  fixAuto = false;
  private camWantR = 0;                // 벽에 막히기 전 원하던 거리 — 벽에서 벗어나면 다시 이 거리로
  private camSetR = -1;                // 지난 프레임에 벽 처리로 맞춘 거리

  // ---- 조명 재사용·개수 고정 — three 셰이더는 조명 id·개수·순서를 코드에 넣는다. 조명을 새로 만들거나 개수가 바뀌면
  // 장면의 모든 재질 셰이더를 처음부터 다시 짓는다(실측 2026-11-02: 방 스타일 한 번에 수 초, 칸 3→4 · 방 조명 6→4 에 셰이더 +190벌·최대 26초 멈춤).
  // 그래서 ① 같은 순서로 꺼내 써서 id 를 지키고 ② 개수를 묶음별 최대치로 고정한다 — 남는 자리는 밝기 0(filler)으로 둔다
  private static readonly LIGHT_CAP = { ward: 4, room: 10, rect: 2 };   // 장 앞(그림자, 칸 최대 4) · 방 다운라이트 · 면광원(패널 1 / 라인 2)
  private lightPool = { ward: [] as THREE.SpotLight[], room: [] as THREE.SpotLight[], rect: [] as THREE.RectAreaLight[] };
  private lightN = { ward: 0, room: 0, rect: 0 };
  private takeSpot(intensity: number, angle: number, penumbra: number, shadow: boolean) {
    const k = shadow ? 'ward' : 'room';
    let s = this.lightPool[k][this.lightN[k]++];
    if (!s) this.lightPool[k].push(s = new THREE.SpotLight());
    Object.assign(s, { intensity, angle, penumbra, distance: 0, decay: 2, castShadow: shadow, name: '', visible: true, userData: {} });
    s.color.set(0xffffff); s.position.set(0, 0, 0); s.target.position.set(0, 0, 0); s.layers.set(0);
    return s;
  }
  private takeRect(intensity: number, w: number, h: number) {
    let r = this.lightPool.rect[this.lightN.rect++];
    if (!r) this.lightPool.rect.push(r = new THREE.RectAreaLight());
    Object.assign(r, { intensity, width: w, height: h, name: '', visible: true, userData: {} });
    r.color.set(0xffffff); r.position.set(0, 0, 0); r.rotation.set(0, 0, 0); r.layers.set(0);
    return r;
  }
  /** 쓴 조명 + 밝기 0 채움 조명을 늘 같은 순서(장 앞 → 방 → 면광원)·같은 개수로 단다 */
  private mountLights(cx: number, H: number, cz: number) {
    const C = Stage.LIGHT_CAP;
    (['ward', 'room', 'rect'] as const).forEach(k => {
      const n = Math.max(C[k], this.lightN[k]);
      for (let i = 0; i < n; i++) {
        let l = this.lightPool[k][i] as THREE.Light | undefined;
        if (i >= this.lightN[k]) {      // 채움 — 천장 가운데에서 아래로, 밝기 0
          l = k === 'rect' ? this.takeRect(0, 0.1, 0.1) : this.takeSpot(0, 0.5, 0, k === 'ward');
          l.position.set(cx, H - 0.02, cz);
          if (k === 'rect') l.lookAt(cx + 0.01, 0, cz); else (l as THREE.SpotLight).target.position.set(cx, 0, cz);
          if (k === 'ward') { const sh = (l as THREE.SpotLight).shadow; sh.camera.layers.set(WARDROBE_LAYER); sh.mapSize.set(1024, 1024); }
          l.userData.filler = true;
          l.visible = !this.quality?.lite;   // 노트북 단계는 채움 조명을 뺀다(아래 applyFillers)
        }
        this.lamps.add(l!);
        if ((l as THREE.SpotLight).isSpotLight) this.lamps.add((l as THREE.SpotLight).target);
      }
    });
    // 방 메인 조명 — 천장 가운데에서 방 전체를 비추고 가구 그림자를 바닥·벽에 드리운다(사용자 제안 2026-11-03 「그림자가 없어 입체감·공간감이 약해」).
    // 창 빛(면광원)·환경광은 그림자를 못 만들고 방 다운라이트는 그림자 지도 수(재질당 텍스처 16) 때문에 꺼 둬서 실시간 화면에 가구 그림자가 없었다.
    // 늘 같은 한 개(만들 때 한 번) — 조명 개수가 바뀌면 모든 재질 셰이더를 다시 짓는다. 그림자는 장면이 바뀔 때만 다시 그린다(syncShadows)
    const L = this.mainLight;
    L.position.set(cx, H - 0.03, cz); L.target.position.set(cx, 0, cz);
    this.lamps.add(L, L.target);
  }
  readonly mainLight = (() => {
    const l = new THREE.SpotLight(0xffffff, MAIN_CD, 0, 1.1, 0.7, 2);   // 반각 63° — 깊이 5m 방도 모서리까지
    l.name = 'main-light'; l.userData.main = true;
    l.castShadow = true;
    l.shadow.mapSize.set(2048, 2048);
    l.shadow.camera.near = 0.1; l.shadow.camera.far = 8;
    l.shadow.bias = -0.0005; l.shadow.normalBias = 0.02;
    l.userData.mutracerRadius = 0.15;                       // 경로 추적: 지름 30cm 등 — 그림자 가장자리가 부드럽다
    return l;
  })();

  // ---- 공간 재구성 중 표시 — 방을 다시 만드는 동안 화면 가운데(사용자 요청 2026-11-02).
  // 켜면 두 프레임은 그리지 않고 넘겨 표시가 먼저 화면에 나오게 한다(셰이더 준비로 멈추기 전에)
  private busyEl = Object.assign(document.createElement('div'), {
    className: 'busy-overlay', innerHTML: '<div class="busy-box"><span class="busy-spin"></span><span>공간을 재구성 중입니다…</span></div>' });
  private busyHold = 0;
  private busyWaitEnv = false;
  private busySeq = 0;
  /** 처음 방이 다 지어졌나 — 그 전엔 덮개를 불투명하게(사용자 지적 2026-11-09 「처음 리셋되면 깨진 화면이 나온다」: 붙잡아 둘 옛 그림이 없어
   *  짓는 중인 장면 — 바깥 땅·벽 조각 — 이 반투명 덮개 뒤로 그대로 보였다) */
  private roomShown = false;
  private envSinceBusy = false;
  /** 방 꾸밈(가구·소품 모델)을 받아 끼우는 중 — 덮개는 공간·장까지만 덮고 걷는다. 그동안 공간 라이트맵은 굽지 않고 다 온 뒤 한 번(사용자 지시 2026-11-12 「공간 → 장 → 가구 → 소품」) */
  private furnishing = false;
  /** 라이트맵을 다 구우면 뒤로 미룬 받기(장 안 홈뷰 의류·몸통 미리 받기)를 연다 — 굽는 동안 그 25MB 를 풀어 CPU 를 나눠 써
   *  굽기가 3초 → 14초가 됐다(실측 2026-11-12, 노트북 단계). 굽지 않는 모드면 바로, 굽기가 안 끝나도 30초 뒤엔 연다 */
  private gateWait = 0;
  private openGateAfterBake() {
    const p = this.raster.post;
    if (this.mode !== 'raster' || (!p.spaceAO && !p.prodAO)) { roomFurnished(); loadEnd('라이트맵 굽지 않음'); return; }
    clearTimeout(this.gateWait);
    this.gateWait = window.setTimeout(() => { this.gateWait = 0; roomFurnished(); }, 30000);
  }
  private setBusy(on: boolean) {
    if (on) this.busySeq++;
    else { this.roomShown = true; loadMark('덮개 걷힘'); loadDoing('가구 받아 끼우기'); }
    this.busyEl.classList.toggle('busy-full', !this.roomShown);
    this.busyEl.hidden = !on;
    this.busyWaitEnv = false;
    this.busyHold = on ? 2 : 0;
  }

  constructor(private host: HTMLElement) {
    this.raster = createRaster(this.scene, this.camera, this.sun);
    this.renderer = this.raster.renderer;
    setBakedAO(this.raster.post.bakedAO);
    // 화소 배율·화면 효과는 화면 성능 단계(quality.ts)가 정한다 — 높음 = 배율 1.5 까지(배율 2 화면은 화소가 4배라 1.5 로 묶어 44% 줄인다, 계단은 TRAA),
    // 노트북 = 배율 1 · 화소 예산 · 화면 효과 끔(resize 가 그릴 칸 크기로 배율을 다시 잰다)
    this.quality = quality();
    this.raster.setQuality(this.quality.caps, this.quality.lite);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.quality.dpr));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    // 톤매핑은 후처리 설정이 정한다(기본 AgX — 실사와 같은 곡선. Neutral 은 실사보다 하얗고 평평했다)
    this.renderer.toneMappingExposure = this.roomCfg.exposure * this.raster.post.exposure;
    host.appendChild(this.renderer.domElement);
    this.labels = new CSS2DRenderer();
    this.labels.domElement.className = 'labels';
    host.appendChild(this.labels.domElement);
    this.busyEl.hidden = false; this.busyEl.classList.add('busy-full');   // 첫 방이 나올 때까지 덮어 둔다
    host.appendChild(this.busyEl);
    fetch(`${import.meta.env.BASE_URL}data/surfaces.json`).then(r => r.json()).then((d: Record<SurfaceKind, Surface[]>) => {
      this.surfaces = { floor: [BASE_SURFACES.floor, ...d.floor], wall: [BASE_SURFACES.wall, ...d.wall] };
      // 기본 바닥 = 연한 워시 오크(한샘 카탈로그 렌더 느낌). 이미 고른 게 있으면 그대로
      const wash = d.floor.find(x => x.name.includes('워시오크'));
      if (wash && this.surfaceSel.floor === 'oak') this.setSurface('floor', wash.id);
      this.onSurfaces?.();
    }).catch(() => {});
    this.setSurface('floor', 'oak'); this.setSurface('wall', 'paint');

    // 하늘 HDR(등장방형) — 창밖 배경. 실내 환경맵은 방 안에서 찍는다(updateEnv). 경로 추적은 하늘을 환경광으로 받는다
    this.scene.background = new THREE.Color('#dfe6ec');
    // sky_nosun = sky.hdr 에서 태양 점만 하늘 밝기(휘도 8)로 누른 것 — 원본은 230픽셀 태양이 빛의 67%라, 경로 추적 환경광으로 쓰면
    // 조명 패널의 해와 따로 「두 번째 해」가 늘 같은 방향에서 창으로 들어와 바닥에 고정된 햇빛 자국을 냈다(사용자 보고 2026-10-29)
    new HDRLoader().load(`${import.meta.env.BASE_URL}env/sky_nosun.hdr`, tex => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      this.sky = tex;
      this.applyOutside();
      this.applyLight();
    });

    this.sun.castShadow = true;
    // 2048 + 방에 꼭 맞춘 그림자 범위(applySun) — 예전 4096 × 가로세로 10m 와 선명도가 비슷하고 메모리는 64 → 16MB
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0002;
    this.sun.shadow.normalBias = 0.02;
    this.sun.shadow.radius = 3;
    this.scene.add(this.sun, this.sun.target);
    this.scene.add(this.room, this.overlay);
    this.doorZone.userData.keep = true; this.overlay.add(this.doorZone);
    this.doorZone.visible = false;           // 방문을 골랐을 때만 보인다(showDoorZone)
    this.camera.layers.enable(1);            // 편집 표시(레이어 1) — 화면엔 보이고 거울 반사엔 안 비친다

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI * 0.55;
    this.controls.minDistance = 0.8;
    this.controls.maxDistance = 9;
    this.controls.addEventListener('change', () => { this._dirty = true; if (this.mode === 'gpupt') gpt?.gpuPtCamera(); });   // 카메라만 — 그림자 그대로
    this.lookAround();
    this.applyCamera();

    new ResizeObserver(() => this.resize()).observe(host);
    this.resize();
    // WebGPU 는 장치 준비가 비동기 — 준비되면 환경맵부터 다시 찍고 그린다
    this.raster.init().then(() => { this.envDirty = true; this.dirty = true; })
      .catch(e => this.onStatus?.(`실시간 렌더러 시작 실패: ${e?.message ?? e} — 주소에 ?webgl 을 붙여 열어 주세요`));
    this.loop();
  }

  // ---- 방: 붙박이장 폭 + 오픈된 쪽으로 1.5m(공간 구조), 깊이 5.4m, 높이 2.4m. 오른쪽 벽 큰 창 · 걸레받이 · 천장 조명
  /** spaceW = 설치 공간(장 벽 길이, m). 장은 그 안 wx0 ~ wx1 에 놓인다(방 출입문 자리를 비우면 한쪽이 빈다) */
  /** 장 앞 통로 깊이(m) — 도어가 실제로 쓸고 나오는 만큼. 여닫이는 문짝 폭, 서랍은 빼는 길이(34cm), 슬라이딩은 서는 자리만.
   *  +1cm(문짝이 가구에 닿지 않을 만큼), 40~60cm 안. 예전 60cm 고정이라 깊이 3500 방에서 침대(6cm)·서랍장(10cm)이 걸려 빨갛게 됐다(2026-11-03, 문짝 49.5cm 장) */
  aisleDepth() {
    const w = this.wardrobe;
    if (!w) return 0.6;
    let reach = 0;
    const b = new THREE.Box3();
    for (const p of w.doors) {
      if (p.kind === 'L' || p.kind === 'R') { b.setFromObject(p.obj); reach = Math.max(reach, b.max.x - b.min.x, b.max.z - b.min.z); }   // 열린 채면 z 쪽이 폭
      else if (p.kind === 'DRAWER') reach = Math.max(reach, p.travel);
    }
    return THREE.MathUtils.clamp(reach + 0.01, 0.4, 0.6);
  }
  buildRoom(spaceW: number, frontZ = 0.63, wx0 = 0, wx1 = spaceW) {
    this.lastRoom = [spaceW, frontZ, wx0, wx1];
    // 열쇠엔 창을 맞추기 전 값(원하는 창)을 넣는다 — 맞춘 창(this.win)을 넣었더니 짓는 중에 창이 방에 맞춰지며(창대 0.5 → 0.35m) 열쇠가 바뀌어
    // 같은 방을 한 번 더 통째로 지었다 — 덮개가 두 번 뜨고 가구 받기·라이트맵도 두 번(실측 2026-11-12, 처음 열기 6초)
    this.winWant ??= { ...this.win };
    // 방문이 바뀌면 가구 자리도 다시. 이름을 붙여 둔다 — 재구성 기록(loadlog)에 「무엇이 바뀌어 다시 지었나」를 남긴다
    const parts: [string, string][] = [
      ['공간 폭', `${spaceW}`], ['장 자리', `${wx0}|${wx1}`], ['칸', `${this.wardrobe?.slots.map(sl => sl.x1.toFixed(3)).join(',')}`],
      ['공간 구조', `${this.layout}`], ['방문', JSON.stringify(this.door)], ['오픈 폭', `${this.openW.L}|${this.openW.R}`], ['천장 조명', `${this.ceiling}`],
      ['창', JSON.stringify(this.winWant)], ['방 꾸밈', `${this.roomStyle}`], ['방 크기', `${ROOM_D}|${ROOM_H}`], ['창 벽', `${this.winWall}`],
      ['장 벽', `${this.hvWall}`], ['장 숨김', `${this.wardHidden}`], ['가구 옮김', JSON.stringify(this.hvMoves[this.movesKey] ?? {})],
    ];
    const key = parts.map(p => p[1]).join('|');
    if (key === this.roomKey) return;
    const changed = this.roomParts ? parts.filter((p, i) => p[1] !== this.roomParts![i][1]).map(p => p[0]) : [];
    this.roomParts = parts;
    loadRebuild((changed.length ? changed.join('·') : '설정 변경') + (this.quietBuild ? ' (화면 유지)' : ''));
    this.roomKey = key;
    this.roomW = spaceW;
    const L = this.layout;
    const x0 = L === 'openL' || L === 'openBoth' ? -this.openW.L : 0;
    const x1 = spaceW + (L === 'openR' || L === 'openBoth' ? this.openW.R : 0);
    const flushL = wx0 <= x0 + 1e-3, flushR = wx1 >= x1 - 1e-3;   // 장이 옆벽에 붙었나
    this.rx0 = x0; this.rx1 = x1;
    // 방문을 벽 안으로 — 방 크기가 줄면 문이 벽 밖에 남아 열림 자리가 엉뚱한 곳을 막았다(실측 2026-10-30)
    const dw = this.doorWant;
    if (dw) {
      const span = dw.wall === 'back' || dw.wall === 'front' ? x1 - x0 : ROOM_D;
      const t = THREE.MathUtils.clamp(dw.t, 0.08, Math.max(0.08, span - dw.w - 0.08));
      this.doorDrawn = t === dw.t ? dw : { ...dw, t };
    }
    // 가구 이동(조용한 재구성) — 새 방이 다 놓일 때까지 그리지 않는다(화면엔 옛 그림이 그대로). 다 놓이면 라이트맵을 이어 단 채로 한 번에 바뀐다
    const quiet = this.quietBuild;
    this.holdAt = quiet ? performance.now() : 0;
    if (!quiet) this.setBusy(true);
    this.releaseRoom(quiet);
    this.room.clear();
    this.lamps.clear();
    this.lightN = { ward: 0, room: 0, rect: 0 };
    const W = x1 - x0, D = ROOM_D, H = ROOM_H, T = 0.12;
    const wall = this.wallMat;
    const ceil = new THREE.MeshPhysicalMaterial({ color: '#fbfbfa', roughness: 0.95, metalness: SPACE_FLAG });
    // 천장·벽은 바깥 면으로 그림자를 그린다 — three 기본(뒷면)이면 천장 아랫면이 가림면이 돼, 벽 맨 위 몇 mm 에 햇빛이 새
    // 천장·벽 연결부에 흰 선이 생겼다(사용자 지적 2026-10-30, 해를 끄면 사라짐). 바깥 면은 두께(12cm)만큼 떨어져 새지 않는다
    ceil.shadowSide = THREE.FrontSide; wall.shadowSide = THREE.FrontSide;
    const trim = this.trimMat;
    const floor = this.floorMat;
    const add = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, name: string) => {
      const g = new THREE.BoxGeometry(w, h, d);
      worldUV(g, x + w / 2, y + h / 2, z + d / 2);
      const b = new THREE.Mesh(g, m);
      b.position.set(x + w / 2, y + h / 2, z + d / 2); b.castShadow = b.receiveShadow = true; b.name = name;
      this.room.add(b); return b;
    };
    add(W + 2 * T, T, D + 2 * T, floor, x0 - T, -T, -T, 'floor');
    // 창 벽 좌표(L) — 창이 있는 벽을 오른쪽 벽으로 보는 좌표. 창 구멍·커튼박스·창틀·창 빛·커튼은 예전 오른쪽 벽 코드 그대로 L 에서 만들고
    // 묶음째 돌려 창이 있는 벽에 붙인다(2026-11-02 「홈뷰 원본 창 위치 그대로」 — 장 벽을 고르면 창이 왼쪽·맞은편 벽에도 온다)
    this.winFrame(x0, x1, D, frontZ, flushL, flushR);
    const f = this.wf, lx0 = f.x0, lx1 = f.x1, LN = f.len, zs = f.zs, ze = f.ze;
    const wfG = new THREE.Group(); wfG.name = 'window-wall'; wfG.matrixAutoUpdate = false; wfG.matrix.copy(f.m); this.room.add(wfG);
    const addL = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, name: string) => { const o = add(w, h, d, m, x, y, z, name); wfG.add(o); return o; };
    // 천장 — 창 벽을 따라 커튼 박스를 천장 속으로 판다(폭 20cm · 깊이 15cm). 벽에 붙은 장 위쪽은 평천장
    const bw = 0.2, PD = 0.15;
    addL(lx1 - lx0 - bw + T, T, LN + 2 * T, ceil, lx0 - T, H, -T, 'ceiling');
    if (zs > 0) addL(bw + T, T, zs + T, ceil, lx1 - bw, H, -T, 'ceiling');
    if (ze > 0) addL(bw + T, T, ze + T, ceil, lx1 - bw, H, LN - ze, 'ceiling');
    addL(bw + T, T, LN - ze + (ze === 0 ? T : 0) - zs, ceil, lx1 - bw, H + PD, zs, 'ceiling');
    addL(0.02, PD + T, LN - zs - ze, ceil, lx1 - bw - 0.02, H, zs, 'curtain-box');
    if (zs > 0) addL(bw, PD + T, 0.02, ceil, lx1 - bw, H, zs - 0.02, 'curtain-box');
    if (ze > 0) addL(bw, PD + T, 0.02, ceil, lx1 - bw, H, LN - ze, 'curtain-box');
    addL(T, PD + T, LN + 2 * T, wall, lx1, H, -T, 'wall-window');
    if (zs === 0) addL(bw, PD + T, T, wall, lx1 - bw, H, -T, 'wall-window');
    if (ze === 0) addL(bw, PD + T, T, wall, lx1 - bw, H, LN, 'wall-window');
    // 창 없는 벽 — 방 좌표 그대로
    add(W + 2 * T, H, T, wall, x0 - T, 0, -T, 'wall-back');
    if (this.winWall !== 'left') add(T, H, D, wall, x0 - T, 0, 0, 'wall-left');
    if (this.winWall !== 'front') add(W + 2 * T, H, T, wall, x0 - T, 0, D, 'wall-front');
    if (this.winWall !== 'right') add(T, H, D, wall, x1, 0, 0, 'wall-right');
    // 창 벽 + 창(this.win — t 는 창 벽을 따라 L 의 z). 양 끝은 벽 두께만큼 더 — 맞은편 벽이 창 벽이면 모서리를 메운다
    this.win = this.fitWindow(this.winWant ?? this.win);
    const z0 = this.win.t, z1 = this.win.t + this.win.w, y0 = this.win.sill, y1 = this.win.sill + this.win.h;
    addL(T, H, z0 + T, wall, lx1, 0, -T, 'wall-window');
    addL(T, H, LN - z1 + T, wall, lx1, 0, z1, 'wall-window');
    addL(T, y0, z1 - z0, wall, lx1, 0, z0, 'wall-window');
    addL(T, H - y1, z1 - z0, wall, lx1, y1, z0, 'wall-window');
    // 창문(창틀·미닫이 창짝·유리·창대) · 커튼 · 맞은편 침대와 침구 — furnish.ts
    if (this.glassRefl) { this.mirrorMats.delete(this.glassRefl.mat); this.glassRefl.mat.dispose(); this.glassRefl = null; }   // 창을 다시 만든다
    this.winG = new THREE.Group(); this.winG.name = 'window';
    addWindow(this.winG, lx1, z0, z1, y0, y1);
    // 창틀은 창 묶음 안에서만 합친다 — 창을 눌러 고르고 끌어 옮기는 단위가 이 묶음이다. 유리는 반사 재질로 바꿔 끼우므로 그대로
    batchStatic([this.winG], this.winG, { skip: o => o.name === 'window-glass' || !!((o as THREE.Mesh).material as THREE.Material | undefined)?.transparent, name: 'window-frame' });
    wfG.add(this.winG);
    // 커튼·침대·침구·협탁·옆 선반장 — 홈뷰 한샘 상품 모델(비동기로 받아 붙인다. 그 사이 방이 다시 만들어지면 버린다)
    const sw = this.doorSwing(x0, x1);
    // 커튼 자리(L) — 창에 맞춘다(사용자 지시 2026-10-30). 장이 창 벽에 붙었으면 장 몸통에만 닿지 않게, 같은 벽의 방문 앞에서 멈춘다
    const dl = this.doorL();
    const cMin = zs > 0 ? zs + 0.02 : dl && dl[1] < z0 ? dl[1] + 0.1 : 0.05;
    const cMax = ze > 0 ? LN - ze - 0.02 : dl && dl[0] > z1 ? dl[0] - 0.1 : LN - 0.05;
    // 커튼 자리(방 좌표 상자) — 키 큰 가구가 못 들어가는 곳
    const zone = new THREE.Box3(new THREE.Vector3(lx1 - 0.25, 0, z0 - 0.3), new THREE.Vector3(lx1, H, z1 + 0.3)).applyMatrix4(f.m);
    const aisle = this.aisleDepth();
    const wardAvoid: [number, number, number, number][] = this.wardHidden ? [] : [[wx0 - 0.05, wx1 + 0.05, 0, frontZ + aisle]];
    this.unitAvoid = [...(sw ? [sw] : []), ...wardAvoid];
    const unitsInfo: { key: string; label: string; del: boolean }[] = [];
    this.furnishing = true;
    loadMark('공간 짓기 시작'); if (!quiet) loadDoing('공간·장 짓기');
    void addHomvueRoom(this.room, { x0, x1, D, H, win: { x1: lx1, z0, z1, top: H + PD, zMin: cMin, zMax: cMax, m: f.m.clone(), zone: [zone.min.x, zone.max.x, zone.min.z, zone.max.z], sill: y0 },
      avoid: [...(sw ? [sw] : []), ...wardAvoid], aisle, style: this.roomStyle, hvWall: this.hvWall, moves: this.hvMoves[this.movesKey], unitsInfo,
      onFill: added => {
        if (this.roomKey !== key) return;
        // 끼운 모델은 그 프레임에 시야 밖이어도 그린다(셰이더를 그때 짓는다) — 다 놓인 뒤 한꺼번에 짓던 「셰이더 미리 짓기」가 1.6~4초 멈췄다
        this.warmOnce.push(...added);
        // 상품 구운 그늘도 놓일 때 같이 — 다 놓인 뒤 한꺼번에 달면 덧층 재질을 그때 몰아 짓는다
        if (this.mode === 'raster' && this.raster.post.prodAO) applyProdAO(this.room, this.raster.post.prodAOStr ?? 0.6);
        if (!quiet) this.dirty = true;
      } }, () => this.roomKey === key)
      .then(() => { if (this.roomKey !== key) return; this.hvUnitsInfo = unitsInfo;
        this.pushUnitsOutOfWalls();
        this.furnishing = false; this.openGateAfterBake();
        const tPost = performance.now(); loadMark('가구·소품 다 옴');
        addContactShadows(this.room, this.mode === 'raster' && this.raster.post.contact !== false);   // 가구 밑 그림자 — 묶음을 합치기 전에
        // 합치기 전 — 가구 묶음이 따로 있을 때 자리를 잰다. 설비가 옮겨졌으면 알린다(장 자리 추천이 옮긴 자리로 다시 계산되게 — onRoomBuilt)
        const fixBefore = JSON.stringify(this.fixtures);
        this.settleFixtures();
        this.fixSettled = JSON.stringify(this.fixtures) !== fixBefore;
        this.batchRoom(); this.applyProps(); this.noWindowLight(this.mode === 'raster');
        // 라이트맵은 새 메시가 생긴 그 자리에서 — 상품 그늘은 모델에 든 그대로 바로, 공간은 옛 것을 이어 단다(새 바닥 그림자는 이어서 굽는다)
        if (quiet) carrySpaceAO(this.room, (ms, tex) => this.shellLightmap(ms, tex));
        if (this.mode === 'raster' && this.raster.post.prodAO) applyProdAO(this.room, this.raster.post.prodAOStr ?? 0.6);
        this.holdAt = 0;
        this.depthWindow();
        // 환경맵은 라이트맵을 입힌 뒤 한 번 — 여기서 찍고 라이트맵 뒤에 또 찍어 두 번 멈췄다. 굽기가 안 오면 30초 뒤 찍는다
        if (this.mode === 'raster' && this.raster.post.spaceAO) { clearTimeout(this.envWaitBake); this.envWaitBake = window.setTimeout(() => this.releaseEnvWait(), 30000); }
        this.envDirty = true; this.dirty = true; this.warmAll = true; this.sceneChanged();
        // 실시간이면 환경맵을 찍고 새 방을 한 번 그린 뒤 끈다(loop). 실사·굽기 화면은 그쪽이 자기 진행 상태를 보인다
        if (this.curPicked) this.markCurtain(true);   // 새로 지은 커튼에 테두리를 다시
        this.onRoomBuilt?.();
        loadStall('가구 다 온 뒤 정리(그림자판·묶기·그늘막)', performance.now() - tPost, tPost); loadDoing('라이트맵 굽기');
        if (this.mode !== 'raster') this.setBusy(false); else if (this.isBusy) this.revealAfterDraw = true; })
      .catch(e => { console.warn('[방] 꾸미기 실패', e); if (this.roomKey === key) { this.furnishing = false; roomFurnished(); this.setBusy(false); this.holdAt = 0; this.sceneChanged(); } });
    this.noWindowLight(this.mode === 'raster');
    // 창 크기의 1.3배를 창 밖 0.62m 에 — 아래로 기울이면 사각형 윗변이 안쪽으로 0.46m(×1.3 → 0.6m) 기울어
    // 창 바로 앞(x1 + 0.01)에 두었을 땐 방 안으로 들어와 거울에 밝은 사각형으로 비쳤다(사용자 지적 2026-10-29).
    // 멀어진 만큼 키워 방 안에서 보이는 크기(입체각)를 예전과 비슷하게 둔다
    const wk = 1.3, wd = T + 0.62;
    this.windowLight.removeFromParent();      // 부모 없이 L 좌표 그대로 방향을 잡고 창 벽 묶음에 단다
    this.windowLight.width = (z1 - z0) * wk; this.windowLight.height = (y1 - y0) * wk;
    this.windowLight.position.set(lx1 + wd, (y0 + y1) / 2, (z0 + z1) / 2);
    // 아래로 기울인다 — 하늘빛은 창으로 내려 들어온다. 정면(수평)이면 위로도 비춰 창 쪽 천장이 실사보다 1.5~1.8배 밝았다
    this.windowLight.lookAt(lx1 + wd - 3, (y0 + y1) / 2 - 2, (z0 + z1) / 2);
    this.windowLight.name = 'window-sky';
    wfG.add(this.windowLight);
    // 걸레받이 60mm — 벽을 따라 끊김 없이(붙박이장 뒤·옆은 빼고, 옆벽이 붙은 쪽은 장 앞부터).
    // 창 아래(창대 50cm)도 잇는다 — 비워 뒀더니 오른쪽 벽에서 끊겨 보였다(사용자 지적 2026-10-30). 방문 자리는 문틀 바깥에서 끊는다
    const bb = 0.06, bt = 0.012;
    const run = (wall: RoomDoor['wall'], a0: number, a1: number, put: (a: number, b: number) => void) => {
      const d = this.door, segs: [number, number][] = [[a0, a1]];
      if (d && d.wall === wall) {
        const s0 = (wall === 'back' || wall === 'front' ? x0 : 0) + d.t - 0.075, s1 = s0 + d.w + 0.15;
        segs.splice(0, 1, [a0, Math.min(a1, s0)], [Math.max(a0, s1), a1]);
      }
      for (const [p, q] of segs) if (q - p > 0.01) put(p, q);
    };
    const zl = flushL ? frontZ : 0, zr = flushR ? frontZ : 0;
    run('back', x0, wx0, (p, q) => add(q - p, bb, bt, trim, p, 0, 0, 'baseboard'));
    run('back', wx1, x1, (p, q) => add(q - p, bb, bt, trim, p, 0, 0, 'baseboard'));
    run('left', zl, D, (p, q) => add(bt, bb, q - p, trim, x0, 0, p, 'baseboard'));
    run('front', x0, x1, (p, q) => add(q - p, bb, bt, trim, p, 0, D - bt, 'baseboard'));
    run('right', zr, D, (p, q) => add(bt, bb, q - p, trim, x1 - bt, 0, p, 'baseboard'));

    // 천장 다운라이트 — 붙박이장 앞 45cm, 약 80cm 간격으로 도어 면을 비춘다(월워셔)
    // 장 앞 다운라이트 — 칸(도어)마다 한가운데 위에 하나씩(사용자 지시 2026-10-30 「정렬을 예쁘게」). 칸 정보가 없으면 80cm 간격.
    // 예전엔 장 폭을 80cm 로 나눠 칸과 어긋났다
    const slotX = this.wardrobe?.slots.length ? this.wardrobe.slots.map(sl => wx0 + (sl.x0 + sl.x1) / 2) : null;
    const n = slotX ? slotX.length : Math.max(2, Math.round((wx1 - wx0) / 0.8));
    const fixture = new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 1 });
    fixture.userData.lampFixture = true;
    const ring = new THREE.MeshStandardMaterial({ color: '#f2f2f2', roughness: 0.4 });
    for (let k = 0; k < n; k++) {
      const x = slotX ? slotX[k] : wx0 + (wx1 - wx0) * (k + 0.5) / n, z = frontZ + 0.45;
      // 바로 아래를 향한 넓고 부드러운 빛 — 도어 면에 둥근 빛 무늬가 지지 않게
      const spot = this.takeSpot(DOWNLIGHT_CD, THREE.MathUtils.degToRad(60), 1, true);
      spot.position.set(x, H - 0.02, z);
      spot.target.position.set(x, 0, z);
      spot.castShadow = true;
      spot.shadow.mapSize.set(1024, 1024);
      spot.shadow.bias = -0.0004; spot.shadow.normalBias = 0.02;
      // 그림자는 장만(레이어 1) — 장 앞 도어 면을 비추는 빛이라 방 가구 그림자는 닿지 않는다. 방 전체를 그림자 지도에 다시 그리던
      // 드로우콜(장면이 바뀔 때마다 빛마다 ~100번)을 장 메시 수로 줄인다(2026-10-30). 해 그림자는 그대로 전부
      spot.shadow.camera.layers.set(WARDROBE_LAYER);
      spot.userData.mutracerRadius = 0.035;              // 경로 추적: 지름 7cm 광원 — 그림자 가장자리가 부드럽다
      spot.name = 'downlight';
      const r = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.006, 32), ring);
      r.position.set(x, H - 0.003, z); this.lamps.add(r);
      const d = new THREE.Mesh(new THREE.CircleGeometry(0.045, 32), fixture);
      d.rotation.x = Math.PI / 2; d.position.set(x, H - 0.0065, z); d.name = 'lamp-glow';
      this.lamps.add(d);
    }
    const cx = (x0 + x1) / 2, C = this.ceiling;
    // 방 천장 조명(사용자 지시 2026-10-30 「다운라이트·라인 조명으로 예쁘게」) — 조명 패널 「천장 조명」으로 고른다
    if (C === 'panel') {
      // 예전: 방 가운데 60×60 등 패널
      const pw = 0.6;
      const panel = this.takeRect(PANEL_NITS, pw, pw);
      panel.position.set(cx, H - 0.012, D * 0.5);
      panel.lookAt(cx, 0, D * 0.5);
      panel.name = 'ceiling-panel';
      const pm = new THREE.Mesh(new THREE.PlaneGeometry(pw, pw), fixture);
      pm.rotation.x = Math.PI / 2; pm.position.set(cx, H - 0.011, D * 0.5); pm.name = 'lamp-glow';
      this.lamps.add(pm);
    }
    if (C === 'mix' || C === 'down') {
      // 벽을 따라 — 가운데 한 줄보다 벽 쪽이 낫다(사용자 지시 2026-10-30). 벽에서 45cm, 벽 쪽으로 조금 기울여 벽면을 쓸어내린다.
      // 왼쪽 벽 · 창 쪽(커튼박스 바로 안, 커튼도 비춘다) 한 줄씩, 「다운라이트만」이면 침대 벽에도(기본은 라인 간접등이 맡는다).
      // 장 앞(도어 여는 자리 포함 ~1.1m)은 장 다운라이트가 있어 비운다
      const put = (x: number, z: number, aimX: number, aimZ: number) => {
        const spot = this.takeSpot(ROOM_DOWN_CD, THREE.MathUtils.degToRad(50), 0.9, false);
        spot.position.set(x, H - 0.02, z); spot.target.position.set(x + aimX, 0, z + aimZ);
        // 그림자 없음 — 그림자 지도는 재질 하나가 받는 텍스처 수(WebGPU 16)를 먹는다. 벽 쪽 8개까지 켰더니 한도를 넘어
        // 방 전체가 그려지지 않았다(2026-10-30 실측 「공간이 사라졌어」). 그림자는 해 + 장 다운라이트만
        spot.castShadow = false;
        spot.userData.mutracerRadius = 0.035; spot.userData.roomDown = true; spot.name = 'downlight';
        const r = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.006, 32), ring);
        r.position.set(x, H - 0.003, z); this.lamps.add(r);
        const d = new THREE.Mesh(new THREE.CircleGeometry(0.045, 32), fixture);
        d.rotation.x = Math.PI / 2; d.position.set(x, H - 0.0065, z); d.name = 'lamp-glow';
        this.lamps.add(d);
      };
      const row = (a0: number, a1: number, gap: number, at: (u: number) => void) => {
        if (a1 - a0 < 0.3) return;
        const m = Math.max(2, Math.round((a1 - a0) / gap) + 1);
        for (let k = 0; k < m; k++) at(a0 + (a1 - a0) * k / (m - 1));
      };
      // 장 앞 줄(z = 장 앞 45cm)에서 시작해 같은 간격(~1m)으로 이어지게 — 천장이 바둑판처럼 정렬된다
      const zf = frontZ + 0.45, zb = D - 0.55, inset = 0.45;
      const steps = Math.max(1, Math.round((zb - zf) / 1.0)), g = (zb - zf) / steps;
      for (let k = 1; k <= steps; k++) {
        const z = zf + g * k;
        put(x0 + inset, z, -0.35, 0);                    // 왼쪽 벽
        put(x1 - bw - 0.3, z, 0.35, 0);                  // 창 쪽(커튼)
      }
      if (C === 'down') row(x0 + inset + 0.6, x1 - bw - 0.9, 1.2, x => put(x, D - inset, 0, 0.35));   // 침대 벽
    }
    if (C === 'mix' || C === 'line') {
      // 라인 조명 — 천장에 묻힌 폭 4cm 띠. 면광원(그림자 없음) + 발광 띠(경로 추적은 이 띠가 광원)
      const line = (x: number, y: number, z: number, len: number, alongX: boolean, tilt: THREE.Vector3, name: string, glowY?: number) => {
        // 빛은 -z 로 나가고 띠 길이는 면의 x 축 — 수직 아래로만 보면 lookAt 이 축을 못 정하므로 tilt 를 조금 기울여 준다
        // (기울인 쪽 축과 위쪽의 외적 = 띠 방향: 벽 쪽(+z) 기울이면 x 축, 방 쪽(-x) 기울이면 z 축)
        const l = this.takeRect(LINE_NITS, len, 0.04);
        l.position.set(x, y, z); l.lookAt(x + tilt.x, y + tilt.y, z + tilt.z);
        l.name = name; l.userData.line = true;
        if (glowY !== undefined) {
          const g = new THREE.Mesh(new THREE.PlaneGeometry(alongX ? len : 0.04, alongX ? 0.04 : len), fixture);
          g.rotation.x = Math.PI / 2; g.position.set(x, glowY, z); g.name = 'lamp-glow'; this.lamps.add(g);
        }
      };
      // ① 침대 벽(맞은편) 간접등 — 벽에서 15cm, 벽 쪽으로 기울여 액자·헤드보드를 쓸어내린다. 커튼박스가 있는 쪽 끝은 비운다.
      // 맞은편 벽에 창이 있으면 왼쪽(창이 왼쪽이면 오른쪽) 벽을 쓸어내린다
      if (this.winWall !== 'front') {
        const bx0 = x0 + 0.15 + (this.winWall === 'left' ? bw : 0), bx1 = x1 - 0.1 - (this.winWall === 'right' ? bw : 0);
        if (bx1 - bx0 > 0.5) line((bx0 + bx1) / 2, H - 0.005, D - 0.15, bx1 - bx0, true, new THREE.Vector3(0, -1, 0.45), 'line-wall', H - 0.004);
      } else {
        const sx = this.winWall === 'front' ? x0 + 0.15 : x1 - 0.15, sz0 = frontZ + 0.7, sz1 = D - 0.1 - bw;
        if (sz1 - sz0 > 0.5) line(sx, H - 0.005, (sz0 + sz1) / 2, sz1 - sz0, false, new THREE.Vector3(-0.45, -1, 0), 'line-wall', H - 0.004);
      }
      // ② 커튼박스 안 — 위에서 커튼을 은은하게(띠는 박스 속이라 안 보인다). 창 벽 좌표(L)에서 잡아 방 좌표로
      const cz0 = Math.max(zs + 0.05, z0 - 0.35), cz1 = Math.min(LN - ze - 0.05, z1 + 0.35);
      const lp = this.winToRoom(new THREE.Vector3(lx1 - bw / 2, H + PD - 0.02, (cz0 + cz1) / 2));
      const ld = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), f.yaw);
      line(lp.x, lp.y, lp.z, cz1 - cz0, Math.abs(ld.x) > 0.5, new THREE.Vector3(-0.2, -1, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), f.yaw), 'line-curtain');
    }
    this.mountLights(cx, H, D * 0.5);
    this.room.add(this.lamps);
    this.drawDoor();
    this.drawFixtures();
    this.applySun();
    this.applyLight();
    this.dirty = true;
    // 공간(벽·바닥·창·조명)과 장이 놓였다 — 덮개를 걷는다. 가구·소품은 받는 대로 끼워지고, 다 오면 라이트맵·환경맵을 한 번 더(위 then)
    // 다시 지을 때는 옛 환경맵으로 바로 그리고 덮개를 걷는다 — 환경맵을 먼저 찍느라(1~3초) 공간·장이 늦게 보였다. 새 환경맵은 라이트맵 뒤 한 번.
    // 처음 열 때는 환경맵이 없어 어둡게 보이므로 공간만 한 번 찍고 걷는다
    if (!quiet) {
      this.envDirty = true;
      if (this.mode !== 'raster') this.setBusy(false);
      else if (this.envRT) this.revealAfterDraw = true;
      else this.busyWaitEnv = true;
    }
  }

  /** 공간 구조 바꾸기 — 방만 다시 만든다 */
  setLayout(l: RoomLayout) {
    if (l === this.layout) return;
    this.layout = l;
    if (!this.wardrobe) return;
    this.buildRoom(this.wardrobe.width, this.wardrobe.frontZ);
    if (this.lines) this.applyLines();
    this.sceneChanged();
    this.envDirty = true;
    this.view('persp');
  }

  /** off = 설치 공간 안 장 왼쪽 끝(m), space = 설치 공간 폭(m) */
  /** quick = 칸 고르기·칸 순서 바꾸기처럼 장 자리(벽에서 거리·폭·깊이·공간 폭)가 그대로인 다시 짓기 — 방 재구성·공간 라이트맵·셰이더 예열·환경맵을 건너뛴다.
   *  칸을 끌 때마다 「공간 재구성」이 뜨고 라이트맵을 다시 구워 프레임이 2~12초씩 멈췄다(사용자 지적 2026-11-09 「흐름이 끊겨 — 장끼리 교체는 재생성하지 마」) */
  setWardrobe(b: Built, off = 0, space = b.width, quick = false) {
    queueMicrotask(() => { if (this.epSel) this.markEP(this.epSel); });   // 고른 EP 표시를 새 장에 다시
    if (this.wardrobe) { this.scene.remove(this.wardrobe.root); disposeBatched(this.wardrobe.root); this.wardrobe.root.traverse(o => this.dropMirror(o)); }
    this.wardrobe = b;
    const lr = this.lastRoom;
    const same = quick && !!lr && Math.abs(lr[0] - space) < 1e-6 && Math.abs(lr[1] - b.frontZ) < 1e-6 && Math.abs(lr[2] - off) < 1e-6 && Math.abs(lr[3] - (off + b.width)) < 1e-6;
    b.root.visible = !this.wardHidden;                    // 방을 먼저 보여 주는 동안은 숨긴 채로
    b.root.traverse(o => o.layers.enable(WARDROBE_LAYER));   // 장 다운라이트 그림자는 이 레이어만 그린다
    b.root.position.x = off;
    this.wOff = off;
    this.overlay.position.x = off;           // 치수선·선택 표시는 장 좌표 그대로
    if (this.fpG) this.fpG.position.x = -off; // 배치 가능 가구 자리는 방 좌표 — 무리가 장만큼 옮겨진 것을 되돌린다
    this.doorZone.position.x = -off;
    this.scene.add(b.root);
    const k0 = this.roomKey;
    if (!same) this.buildRoom(space, b.frontZ, off, off + b.width);
    // 방을 새로 지으면 셰이더 예열·환경맵은 가구가 다 놓인 뒤 그쪽에서 한다 — 여기서 하면 빈 방으로 한 번 더(처음 열 때 1.7초 + 환경맵 헛일, 실측 2026-11-09)
    const roomRebuilt = this.roomKey !== k0;
    if (!same && !roomRebuilt) this.warmAll = true;
    this.noWindowLight(this.mode === 'raster');      // 새 장의 거울
    this.applyProps();
    if (this.lines) this.applyLines();
    // 굽기·서펠은 장면을 GLB 로 넘긴 사진 같은 상태 — 모듈·도어 컬러가 바뀌면 다시 넘긴다
    this.sceneChanged(same ? { lightmap: false } : {});
    if (!same && !roomRebuilt) this.envDirty = true;
    this.dirty = true;
  }
  /** 공간 재구성 덮개가 떠 있나 — 그동안은 미리 받기 같은 일을 미룬다 */
  get isBusy() { return !this.busyEl.hidden; }

  // ---- 실내 환경맵: 방 가운데서 큐브맵을 찍어 환경광·반사로 쓴다(거울·마루·도어 반사가 방을 비춘다).
  // 찍을 때 앞서 찍은 환경맵이 벽을 밝히므로 두 번 찍으면 벽에서 튄 빛(1차 반사광)까지 담긴다
  private envCube = new THREE.WebGLCubeRenderTarget(256, { type: THREE.HalfFloatType });
  private envCam = new THREE.CubeCamera(0.05, 30, this.envCube);
  private envRT: THREE.RenderTarget | null = null;
  private envDirty = true;
  private envAt = 0;
  updateReflections() { this.envDirty = true; }
  private updateEnv() {
    if (!this.wardrobe || this.mode === 'mutracer' || !this.raster.ready) return;
    if (this.busyWaitEnv) this.envSinceBusy = true;
    this.envDirty = false; this.envAt = performance.now();
    const tEnv = performance.now();
    const ov = this.overlay.visible; this.overlay.visible = false;
    // 노트북 단계 — 환경맵엔 공간(벽·바닥·천장·창·조명)만. 가구·소품·장·설비 재질을 큐브맵용으로 또 짓지 않는다(환경광·반사 차이는 작다)
    const hid: THREE.Object3D[] = [];
    if (this.quality.lite) {
      const FURN = ['hv-unit', 'bed', 'bedding', 'nightstand', 'side-shelf', 'room-deco', 'room-furn', 'curtain-set'];
      for (const o of [...this.room.children.filter(c => FURN.includes(c.name)), this.wardrobe.root, ...this.fixGs]) if (o.visible) { o.visible = false; hid.push(o); }
    }
    const sm = this.renderer.shadowMap as { autoUpdate?: boolean; needsUpdate?: boolean };
    sm.autoUpdate = false; sm.needsUpdate = true;        // 그림자는 첫 면에서 한 번만
    this.envCam.position.set((this.rx0 + this.rx1) / 2, 1.3, 2.2);
    // 매번 처음부터 두 번만 — 이전 환경맵 위에 계속 찍으면 하얀 닫힌 방에서 빛이 끝없이 불어난다(실측: 하얗게 날아감)
    this.scene.environment = null;
    for (let k = 0; k < 2; k++) {
      this.envCam.update(this.renderer as THREE.WebGLRenderer, this.scene);
      this.envRT = this.raster.pmremFromCubemap(this.envCube.texture, this.envRT);
      this.scene.environment = this.envRT.texture;
    }
    sm.autoUpdate = true; sm.needsUpdate = true;      // 숨겼던 가구가 그림자에 다시 들어가게
    hid.forEach(o => (o.visible = true));
    this.overlay.visible = ov;
    this.dirty = true;
    loadStall('환경맵 찍기', performance.now() - tEnv);
  }

  // ---- 해: 방위각(오른쪽 창 기준 0° = 창 정면, +는 앞쪽에서), 고도
  applySun() {
    const { azimuth, elevation, intensity } = this.sunCfg;
    const wf = this.wf;
    const target = this.sunTarget.set(wf.x0 + (wf.x1 - wf.x0) * 0.45, 0.6, this.win.t + this.win.w / 2 - 0.2).applyMatrix4(wf.m);   // 창 가운데 앞(창 벽 좌표 → 방)
    const az = THREE.MathUtils.degToRad(azimuth), el = THREE.MathUtils.degToRad(elevation);
    // 방위각은 창 기준(창 벽 좌표 +x = 창 바깥) — 창이 다른 벽이면 그만큼 돌린다
    const dir = new THREE.Vector3(Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az)).applyAxisAngle(new THREE.Vector3(0, 1, 0), wf.yaw);
    this.sun.position.copy(target).addScaledVector(dir, 12);
    this.sun.target.position.copy(target);
    this.sun.intensity = intensity;
    // 해 색온도(사용자 지시 2026-10-30) — 기본 5200K(예전 고정색 #fff1dc 와 비슷)
    this.sun.color.copy(kelvinColor(this.sunCfg.kelvin ?? 5200));
    this.sun.visible = true;              // 밤(세기 0)에도 숨기지 않는다 — 숨기면 조명 개수가 바뀌어 모든 재질 셰이더를 다시 짓는다
    // 그림자 범위 = 방(벽 두께 포함) 꼭짓점을 해 쪽에서 본 상자 + 15cm. 예전엔 가로세로 10m 고정이라 지도의 대부분이 방 밖이었다
    const s = this.sun.shadow.camera as THREE.OrthographicCamera;
    const view = new THREE.Matrix4().lookAt(this.sun.position, target, new THREE.Vector3(0, 1, 0)).setPosition(this.sun.position).invert();
    let l = Infinity, r = -Infinity, b = Infinity, t = -Infinity, n = Infinity, f = -Infinity;
    for (const x of [this.rx0 - 0.15, this.rx1 + 0.15]) for (const y of [-0.15, ROOM_H + 0.4]) for (const z of [-0.15, ROOM_D + 0.15]) {
      const p = new THREE.Vector3(x, y, z).applyMatrix4(view);
      l = Math.min(l, p.x); r = Math.max(r, p.x); b = Math.min(b, p.y); t = Math.max(t, p.y); n = Math.min(n, -p.z); f = Math.max(f, -p.z);
    }
    const m = 0.15;
    Object.assign(s, { left: l - m, right: r + m, top: t + m, bottom: b - m, near: Math.max(0.1, n - 1), far: f + 1 });
    s.updateProjectionMatrix();
    this.skyLevel();
    this.dirty = true;
    this.envDirty = true;
    this.scheduleSpaceAO();               // 공간 라이트맵 — 해가 바뀌면 다시 굽는다(놓은 뒤 0.6초)
    // 서펠은 지금 화면에 해만 바꿔 보낸다(실시간). 굽기는 해 방향이 바뀌면 그 상태로 새로 굽는다(놓은 뒤 한 번)
    // 굽기·서펠 — 조명 값만 바로 보낸다(실시간)
    this.pushLight();
  }
  sunTarget = new THREE.Vector3();
  setSun(p: Partial<Sun>) { Object.assign(this.sunCfg, p); this.applySun(); }

  // ---- 창밖 환경맵 — 창으로 보이는 배경만 바꾼다. 실내 환경광·경로 추적 환경광은 기본 하늘(sky_nosun) 그대로
  // 풍경 HDRI 는 해가 그대로 들어 있어 환경광으로 쓰면 「두 번째 해」가 생긴다(2026-10-29 sky_nosun 을 만든 이유)
  private static OUTSIDE: Record<string, { file: string; gain: number; rot: number }> = {
    // gain — 창으로 보이는 띠(지평선 조금 위~아래) 평균 휘도를 기본 하늘에 맞춘 배율(중앙값·평균의 기하평균, 실측)
    // rot — 창 정면에 보기 좋은 쪽이 오게 돌린 기본 방향(도). 90° 씩 돌려 찍어 골랐다
    park: { file: 'park_parking_2k.hdr', gain: 6, rot: 0 },
    city: { file: 'rotes_rathaus_2k.hdr', gain: 1.3, rot: 180 },
    river: { file: 'modern_buildings_2_2k.hdr', gain: 2, rot: 0 },
    skyline: { file: 'hotel_rooftop_balcony_2k.hdr', gain: 0.8, rot: 90 },
  };
  private outsideTex = new Map<string, Promise<THREE.Texture>>();
  private outsideGain = 1;
  private applyOutside() {
    const p = this.raster.post, key = p.outside;
    this.scene.backgroundRotation.set(0, THREE.MathUtils.degToRad((p.outsideRot ?? 0) + (Stage.OUTSIDE[key]?.rot ?? 0)) + this.wf.yaw, 0);   // 창이 다른 벽이면 풍경도 그쪽으로
    const done = () => { this.skyLevel(); this.dirty = true; this.envDirty = true; };
    if (key === 'off') { this.scene.background = new THREE.Color('#dfe6ec'); this.outsideGain = 1; return done(); }
    const o = Stage.OUTSIDE[key];
    if (!o) { if (this.sky) this.scene.background = this.sky; this.outsideGain = 1; return done(); }
    let t = this.outsideTex.get(key);
    if (!t) {
      t = new HDRLoader().loadAsync(`${import.meta.env.BASE_URL}env/${o.file}`).then(tex => { tex.mapping = THREE.EquirectangularReflectionMapping; return tex; });
      this.outsideTex.set(key, t);
    }
    void t.then(tex => {
      if (this.raster.post.outside !== key) return;
      this.scene.background = tex; this.outsideGain = o.gain; done();
    }).catch(e => console.warn('[창밖 환경맵]', key, e));
  }

  /** 창밖 하늘 밝기 — 해 세기를 따라간다(밤이면 어둡게) */
  private skyLevel() {
    // 창밖 하늘 = 「창 빛」 — 해 세기와 따로(해는 직사광 줄무늬, 창 빛은 방을 고르게 채우는 산란광)
    const sky = this.roomCfg.sky;
    const k = THREE.MathUtils.clamp(sky / 2, 0.02, 2);
    this.scene.backgroundIntensity = 0.9 * k * this.outsideGain;
    this.windowLight.intensity = WINDOW_NITS * sky;
    this.windowLight.visible = !isPath(this.mode);   // 하늘 0 이어도 세기만 0(숨기면 셰이더를 다시 짓는다)
    // 경로 추적은 가짜 창 빛 대신 실제 하늘이 창으로 든다 — 실시간 화면과 밝기를 맞춘 세기
    if (isPath(this.mode)) this.scene.environmentIntensity = this.ptEnvIntensity();
    return k;
  }
  /** 경로 추적 환경광(하늘 HDR) 세기 — 창 빛 × 환경광 슬라이더. 예전엔 창 빛만 따라가 실사에선 환경광 슬라이더가 안 먹었다
   *  (사용자 요청 2026-10-29). 기본 환경광 1 이면 예전과 같다 */
  private ptEnvIntensity() { return this.roomCfg.sky * 1.2 * this.roomCfg.env; }

  // ---- 바닥·벽 재질 (Homvue 바닥재·벽지). 방 UV 가 미터 단위라 텍스처 반복 = 1 / uvMeters
  onSurfaces?: () => void;
  private tex(url: string, srgb: boolean) {
    let t = this.texCache.get(url);
    if (!t) {
      t = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}${url}`, () => { this.dirty = true; this.envDirty = true; });
      t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; t.flipY = false;
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
      this.texCache.set(url, t);
    }
    return t;
  }
  setSurface(kind: SurfaceKind, id: string) {
    const sf = this.surfaces[kind].find(x => x.id === id);
    if (!sf) return;
    this.surfaceSel[kind] = id;
    const m = kind === 'floor' ? this.floorMat : this.wallMat;
    // 방 UV 는 미터 — 이미지 한 장이 size(m) 를 덮도록 반복 횟수 = 1 / 크기
    // 벽지는 촘촘히(WALL_UV 배) — 쿠지알러 벽지 이미지(1m·0.5m)를 그 크기로 깔면 결이 굵게 보였다(사용자 지적 2026-10-30)
    const k = kind === 'wall' ? WALL_UV : 1;
    const [ru, rv] = (sf.size ? [1 / sf.size[0], 1 / sf.size[1]] : [1 / (sf.uvMeters || 1), 1 / (sf.uvMeters || 1)]).map(r => r * k);
    m.map = sf.map ? this.tex(sf.map, true) : null;
    m.normalMap = sf.normalMap ? this.tex(sf.normalMap, false) : null;
    // 벽지는 무늬 결(엠보)을 색 이미지에서 살짝 — 빛이 비스듬히 들 때 질감이 보인다
    m.bumpMap = kind === 'wall' && sf.map ? this.tex(sf.map, false) : null;
    m.bumpScale = 0.6;
    [m.map, m.normalMap, m.bumpMap].forEach(t => t?.repeat.set(ru, rv));
    m.color.setRGB(...((sf.color ?? [1, 1, 1]) as [number, number, number]));
    // 바닥은 코팅층으로 은은한 반사(강마루·장판), 벽지는 무광
    if (kind === 'floor') { m.roughness = Math.min(sf.roughness ?? 0.55, 0.6); m.clearcoat = 0.3; m.clearcoatRoughness = 0.35; }
    else { m.roughness = 0.9; m.clearcoat = 0; }
    m.needsUpdate = true;
    this.syncShellLM();
    this.dirty = true; this.envDirty = true;
    this.sceneChanged();      // 굽기·서펠은 장면을 다시 넘긴다
  }

  // ---- 실내 조명 · 환경광 · 노출
  applyLight() {
    const { lamp, env, exposure } = this.roomCfg;
    const col = this.lampCol();
    // 끌 때도 숨기지 않고 밝기만 0 — 숨기면 조명 개수가 바뀌어 모든 재질 셰이더를 다시 짓는다
    this.lamps.traverse(o => {
      if ((o as THREE.SpotLight).isSpotLight) { const l = o as THREE.SpotLight; l.color.copy(col); l.intensity = l.userData.filler ? 0 : (l.userData.main ? MAIN_CD : l.userData.roomDown ? ROOM_DOWN_CD : DOWNLIGHT_CD) * lamp; }
      if ((o as THREE.RectAreaLight).isRectAreaLight) { const l = o as THREE.RectAreaLight; l.color.copy(col); l.intensity = l.userData.filler ? 0 : (l.userData.line ? LINE_NITS : PANEL_NITS) * lamp; }
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m?.userData?.lampFixture) { m.emissive.copy(col); m.emissiveIntensity = Math.max(0.05, lamp * 2.2); }
    });
    this.renderer.toneMappingExposure = exposure * this.raster.post.exposure;
    mtExposure = exposure; mt?.setMutracerExposure(exposure);
    if (!isPath(this.mode)) this.scene.environmentIntensity = env * RASTER_ENV;
    this.skyLevel();
    this.dirty = true;
    this.envDirty = true;
    setSpaceLamp(this.lmLamp > 0 ? lamp / this.lmLamp : 1);   // 공간 라이트맵 — 다운라이트 층은 밝기 비율로 바로
    this.scheduleSpaceAO();               // 그리고 다시 굽는다(색·창 빛·꺼짐에서 켜짐)
    this.pushLight();
  }
  setRoomLight(p: Partial<RoomLight>) { Object.assign(this.roomCfg, p); this.applyLight(); }

  /** 후처리(실시간 화면) — 「후처리」 메뉴 */
  setPost(p: Partial<PostSettings>) {
    const reflChanged = 'reflect' in p && p.reflect !== this.raster.post.reflect;
    const outChanged = ('outside' in p && p.outside !== this.raster.post.outside) || ('outsideRot' in p && p.outsideRot !== this.raster.post.outsideRot);
    this.raster.setPost(p);
    if ('bakedAO' in p) setBakedAO(this.raster.post.bakedAO);
    if ('contact' in p) setContactVisible(this.room, this.mode === 'raster' && this.raster.post.contact !== false);
    if ('spaceAO' in p) { if (this.raster.post.spaceAO) this.scheduleSpaceAO(); else clearSpaceAO(); }
    if ('spaceLMStr' in p) { this.lmMats.forEach(m => (m.lightMapIntensity = this.raster.post.spaceLMStr ?? 1)); this.dirty = true; this.envDirty = true; }
    if ('prodAO' in p) { if (this.raster.post.prodAO) this.scheduleSpaceAO(); else clearProdAO(); }
    if ('prodAOStr' in p) setProdAOIntensity(this.raster.post.prodAOStr);
    if (reflChanged) this.noWindowLight(this.mode === 'raster');
    if (outChanged) this.applyOutside();
    this.applyCamera();
    this.renderer.toneMappingExposure = this.roomCfg.exposure * this.raster.post.exposure;
    this.dirty = true;
  }

  // ---- 카메라
  view(kind: 'front' | 'persp' | 'interior') {
    if (!this.wardrobe) return;
    const W = this.wardrobe.width;
    const c = new THREE.Vector3(this.wOff + W / 2, 1.2, 0.3);
    const vf = THREE.MathUtils.degToRad(this.camera.fov / 2), hf = Math.atan(Math.tan(vf) * this.camera.aspect);
    // 장 전체 + 바닥·천장이 조금 보이도록 20% 여유 (방 깊이를 넘지 않게)
    const dist = Math.min(ROOM_D - 0.45, 1.2 * Math.max((W / 2 + 0.25) / Math.tan(hf), 1.35 / Math.tan(vf)));
    // 비스듬한 시점은 열린 공간 쪽에서 — 좌측 오픈이면 왼쪽에서 본다
    const dir = kind === 'front' ? new THREE.Vector3(0, 0.02, 1) : new THREE.Vector3(this.layout === 'openL' ? -0.38 : 0.38, 0.12, 1);
    if (kind === 'interior') dir.set(0.1, 0.05, 1);
    this.camera.position.copy(c).addScaledVector(dir.normalize(), dist);
    this.camera.position.x = THREE.MathUtils.clamp(this.camera.position.x, this.rx0 + 0.15, this.rx1 - 0.15);
    this.controls.target.copy(c);
    this.controls.update();
    this.dirty = true;
  }

  // ---- 방 출입문 — 벽 위에 문틀·문짝·손잡이, 바닥에 열리는 자리(부채꼴). 방을 다시 만들지 않고 문만 바꾼다
  // 방문은 무광(사용자 지적 2026-11-03) — 예전 거칠기 0.55 + 코팅 0.2 라 코팅층이 매끈하게 번들거렸다
  private static doorMat = new THREE.MeshPhysicalMaterial({ color: '#efece6', roughness: 0.85, clearcoat: 0 });
  private static casingMat = new THREE.MeshPhysicalMaterial({ color: '#f4f2ee', roughness: 0.45 });
  private static leverMat = new THREE.MeshPhysicalMaterial({ color: '#bdbab4', metalness: 1, roughness: 0.25 });
  private static zoneMat = new THREE.MeshBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.12, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
  private static zoneLine = new THREE.LineBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.6 });
  /** 벽마다: 문 가운데 자리(바닥, 벽 안쪽 면)와 세로축 회전(문 앞면 = 방 안쪽) · 벽 길이 */
  doorFrame(d: RoomDoor) {
    const D = ROOM_D, x0 = this.rx0, x1 = this.rx1;
    switch (d.wall) {
      case 'back': return { p: new THREE.Vector3(x0 + d.t + d.w / 2, 0, 0), rot: 0, len: x1 - x0 };
      case 'front': return { p: new THREE.Vector3(x0 + d.t + d.w / 2, 0, D), rot: Math.PI, len: x1 - x0 };
      case 'left': return { p: new THREE.Vector3(x0, 0, d.t + d.w / 2), rot: Math.PI / 2, len: D };
      default: return { p: new THREE.Vector3(x1, 0, d.t + d.w / 2), rot: -Math.PI / 2, len: D };
    }
  }
  /** 방문이 열리며 쓸고 지나는 바닥 자리 [x0, x1, z0, z1] (문틀 몰딩 포함) */
  doorSwing(x0 = this.rx0, x1 = this.rx1): [number, number, number, number] | null {
    const d = this.door; if (!d) return null;
    const w = d.w, m = 0.08, D = ROOM_D;
    switch (d.wall) {
      case 'left': return [x0, x0 + w, d.t - m, d.t + w + m];
      case 'right': return [x1 - w, x1, d.t - m, d.t + w + m];
      case 'back': return [x0 + d.t - m, x0 + d.t + w + m, 0, w];
      default: return [x0 + d.t - m, x0 + d.t + w + m, D - w, D];
    }
  }
  /** 방 가로 범위(설치 공간 기준, m) — 문 자리 계산용 */
  roomSpan() { return { x0: this.rx0, x1: this.rx1, D: ROOM_D }; }
  /** 방을 다시 만들기 전에 GPU 자원을 버린다 — 버리지 않아 방을 다시 만들 때마다 쌓였다(2026-10-30 실측: 스타일을 9번 바꾸자
   *  렌더 타깃 15 → 47개, 텍스처 371 → 622MB). 장 다운라이트 그림자 지도 3장 · 가구 거울 반사 버퍼 · 벽·조명기구·창틀 지오메트리.
   *  모델 캐시 지오메트리(놓을 때마다 복제가 같이 쓴다)와 재질은 그대로 둔다 */
  private releaseRoom(quiet = false) {
    // 가구 이동이면 공간 라이트맵은 떼지 않고 이어 단다(carrySpaceAO). 상품 그늘막은 옛 메시와 함께 버려지고 새 메시에 바로 다시 단다
    if (quiet) detachSpaceAO(); else clearSpaceAO();
    clearProdAO();
    // 조명은 버리지 않는다 — 다음 방에서 그대로 다시 쓴다(takeSpot·takeRect). 그림자 지도도 함께 재사용돼 쌓이지 않는다
    this.room.traverse(o => {
      this.dropMirror(o);
      const g = (o as THREE.Mesh).geometry;              // 메시·선(커튼박스 선 등) 모두
      if (g && !isCachedGeometry(g)) g.dispose();
    });
    // 창 유리 반사 — 반사면 기준점이 옛 창 묶음에 붙어 있어 새 창에선 다시 만든다(창을 옮기면 반사면이 어긋났다)
    if (this.glassRefl) { this.mirrorMats.delete(this.glassRefl.mat); this.glassRefl.mat.dispose(); this.glassRefl.node.dispose(); this.glassRefl = null; }
  }
  /** 거울 메시의 평면 반사(렌더 타깃 포함)를 버린다 */
  private dropMirror(o: THREE.Object3D) {
    const r = o.userData.refl as { target: THREE.Object3D; mat: THREE.Material; node: { dispose(): void } } | undefined;
    if (!r?.node) return;
    r.target.removeFromParent(); this.mirrorMats.delete(r.mat); r.mat.dispose(); r.node.dispose();
    delete o.userData.refl;
  }
  /** 드로우콜 줄이기 — 꾸밈이 다 놓인 뒤 방의 고정 메시를 재질별로 합친다(batch.ts).
   *  방문·창(눌러서 고른다)·커튼·거울·유리(재질을 바꿔 끼운다)·조명은 그대로. 가구·소품은 「소품 보이기」로 함께 숨기므로 한 묶음(room-furn) */
  private batchRoom() {
    const FURN = ['bed', 'bedding', 'nightstand', 'side-shelf', 'room-deco', 'room-furn'];
    const mirrorish = (o: THREE.Object3D) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      return !!m && !Array.isArray(m) && (m.name?.includes('거울') || ((m.metalness ?? 0) >= 0.95 && (m.roughness ?? 1) <= 0.05));
    };
    const fixedSkip = (o: THREE.Object3D) => o === this.doorG || o === this.winG || o === this.lamps || o.name === 'fixture' || (o as THREE.Light).isLight
      || o.name === 'curtain-set' || o.name === 'curtain' || o.name === 'window-glass' || o.name === 'lamp-glow' || mirrorish(o) || !!(o as THREE.Mesh).material && ((o as THREE.Mesh).material as THREE.Material).transparent;
    // 홈뷰 묶음(hv-unit)은 묶음 안에서만 합친다 — 묶음째 골라 끌어 옮긴다
    for (const u of this.room.children.filter(o => o.name === 'hv-unit')) batchStatic([u], u, { skip: fixedSkip, shadowMin: 0.3, name: 'room-furn' });
    const furn = this.room.children.filter(o => FURN.includes(o.name));
    const shell = this.room.children.filter(o => !FURN.includes(o.name) && o.name !== 'hv-unit');
    const fg = new THREE.Group(); fg.name = 'room-furn'; this.room.add(fg);
    let n = batchStatic(furn, fg, { skip: fixedSkip, shadowMin: 0.3, name: 'room-furn' });
    n += batchStatic(shell, this.room, { skip: fixedSkip, name: 'room-shell' });
    // 빛나는 원판(lamp-glow)도 같이 — 재질 하나를 조명 패널이 값만 바꾼다(applyLight)
    n += batchStatic([this.lamps], this.lamps, { skip: o => (o as THREE.Light).isLight, name: 'lamp-fixture' });
    // 다 비운 묶음은 뺀다
    for (const o of [...furn]) { let has = false; o.traverse(c => { if ((c as THREE.Mesh).isMesh) has = true; }); if (!has) o.removeFromParent(); }
    (window as any).__batched = n;
    const inUse = new Set<THREE.Texture>(), geoInUse = new Set<THREE.BufferGeometry>();
    this.scene.traverse(o => { const g = (o as THREE.Mesh).geometry; if (g) geoInUse.add(g); const m = (o as THREE.Mesh).material; if (m) for (const mt of [m].flat()) for (const v of Object.values(mt)) if ((v as THREE.Texture)?.isTexture) inUse.add(v as THREE.Texture); });
    releaseRoomTextures(inUse, geoInUse);
    this.dirty = true;
  }
  setPropsVisible(v: boolean) { this.propsVisible = v; this.applyProps(); this.dirty = true; this.envDirty = true; this.sceneChanged(); }
  /** 장 문이 다 닫혀 안이 안 보이면 장 안 소품(옷·이불·상자)을 그리지 않는다(사용자 지시 2026-11-05 「장 문을 닫으면 소품을 컬링해서 최적화」).
   *  그림자·반사·라이트맵 굽기 가림에서도 함께 빠진다 — 닫힌 장 안이라 바깥 빛에 영향이 없다 */
  private wardPropsCulled = false;
  cullWardProps(c: boolean) {
    if (c === this.wardPropsCulled) return;
    this.wardPropsCulled = c;
    this.wardrobe?.root.traverse(o => { if (o.name === 'slot-props') o.visible = this.propsVisible && !c; });
    this.dirty = true;
  }
  private applyProps() {
    const v = this.propsVisible;
    this.wardrobe?.root.traverse(o => { if (o.name === 'slot-props') o.visible = v && !this.wardPropsCulled; });
    // 빈 방으로 보기(배치 가능 가구) — 바닥 가구만 숨긴다. 러그·벽 장식·커튼은 그대로
    const furn = (o: THREE.Object3D) => ['bed', 'bedding', 'nightstand', 'side-shelf', 'room-furn'].includes(o.name) || (o.name === 'hv-unit' && o.userData.kind === 'furn');
    for (const o of this.room.children) if (['bed', 'bedding', 'nightstand', 'side-shelf', 'curtain-set', 'room-deco', 'room-furn', 'hv-unit'].includes(o.name)) o.visible = v && !(this.emptyRoom && furn(o));
  }
  /** 빈 방으로 보기 — 놓인 바닥 가구를 숨긴다(배치 가능 가구를 빈 방 기준으로 볼 때). 숨긴 가구는 furnitureRects 에서도 빠진다 */
  emptyRoom = false;
  setEmptyRoom(v: boolean) { if (this.emptyRoom === v) return; this.emptyRoom = v; this.applyProps(); this.dirty = true; this.envDirty = true; this.sceneChanged(); }
  setDoor(d: RoomDoor | null) { this.door = d; this.drawDoor(); this.dirty = true; this.envDirty = true; this.sceneChanged(); }
  // ---- 설비 — 콘센트 · 통신단자함 · 벽걸이 에어컨. 장과 겹치면 경고만 한다(사용자 결정 2026-11-06) — 장 자리는 바꾸지 않는다
  private static fixMat = new THREE.MeshPhysicalMaterial({ color: '#f5f4f1', roughness: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.3 });
  private static fixGrey = new THREE.MeshPhysicalMaterial({ color: '#dddbd6', roughness: 0.55 });
  private static fixDark = new THREE.MeshPhysicalMaterial({ color: '#2b2c2e', roughness: 0.6 });
  private static fixLed = new THREE.MeshBasicMaterial({ color: '#7fb6ff' });
  setFixtures(list: RoomFixture[]) { this.fixtures = list; this.drawFixtures(); this.dirty = true; this.sceneChanged({ lightmap: false }); }
  /** 설비 자리 — p = 벽 위 아래 끝 가운데, rot = 방 안쪽이 +z 가 되게. t·y 는 벽 안으로 당긴다(값은 바꾸지 않는다) */
  fixtureFrame(f: RoomFixture) {
    const s = fixtureSize(f), D = ROOM_D, x0 = this.rx0, x1 = this.rx1;
    if (f.wall === 'ceiling') {
      const mx = s.w / 2 + 0.05, mz = s.h / 2 + 0.05, span = x1 - x0;
      const t = THREE.MathUtils.clamp(f.t, mx, Math.max(mx, span - mx)), y = THREE.MathUtils.clamp(f.y, mz, Math.max(mz, D - mz));
      return { p: new THREE.Vector3(x0 + t, ROOM_H, y), rot: 0, span, t, y };
    }
    const span = f.wall === 'back' || f.wall === 'front' ? x1 - x0 : D, m = s.w / 2 + 0.02;
    const t = THREE.MathUtils.clamp(f.t, m, Math.max(m, span - m)), y = THREE.MathUtils.clamp(f.y, 0.02, Math.max(0.02, ROOM_H - s.h - 0.01));
    switch (f.wall) {
      case 'back': return { p: new THREE.Vector3(x0 + t, y, 0), rot: 0, span, t, y };
      case 'front': return { p: new THREE.Vector3(x0 + t, y, D), rot: Math.PI, span, t, y };
      case 'left': return { p: new THREE.Vector3(x0, y, t), rot: Math.PI / 2, span, t, y };
      default: return { p: new THREE.Vector3(x1, y, t), rot: -Math.PI / 2, span, t, y };
    }
  }
  private drawFixtures() {
    for (const g of this.fixGs) { g.removeFromParent(); g.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh && !isCachedGeometry(m.geometry)) m.geometry.dispose(); }); }
    this.fixGs = [];
    // 천장 에어컨 모델을 아직 안 불렀으면 부르고, 오면 다시 그린다(그동안은 코드로 만든 모양)
    if (!Stage.ceilacGlb && this.fixtures.some(f => !f.del && f.kind === 'ceilac')) {
      Stage.ceilacP ??= fixtureModelGlb('ceilac').then(m => (Stage.ceilacGlb = m)).catch(e => { console.warn('[설비] 천장 에어컨 모델', e); return null; });
      Stage.ceilacP.then(m => { if (m && this.fixGs.length) { this.drawFixtures(); this.dirty = true; this.sceneChanged({ lightmap: false }); } });
    }
    for (const f of this.fixtures) {
      if (f.del) continue;
      const g = new THREE.Group(), m = Stage.fixtureModel(f.kind), fr = this.fixtureFrame(f), r = THREE.MathUtils.degToRad(f.rot ?? 0);
      // 돌리기 — 벽 설비는 가운데를 축으로 벽 면 안에서(아래 끝이 여전히 y), 천장 설비는 세로 축으로
      if (r) {
        const pv = new THREE.Group();
        if (f.wall === 'ceiling') pv.rotation.y = r;
        else { m.position.y = -FIXTURE_SPEC[f.kind].h / 2; pv.position.y = fixtureSize(f).h / 2; pv.rotation.z = r; }
        pv.add(m); g.add(pv);
      } else g.add(m);
      g.name = 'fixture'; g.userData.fixId = f.id;
      g.position.copy(fr.p); g.rotation.y = fr.rot;
      this.room.add(g); this.fixGs.push(g);
    }
    this.applyFixMark();
  }
  /** 설비 모양(코드로 만든 단순 형상) — 가로 x · 위 y(아래 끝 0) · 방 안쪽 z(벽 면 0) */
  private static ceilacGlb: THREE.Object3D | null = null;
  private static ceilacP: Promise<THREE.Object3D | null> | null = null;
  private static fixtureModel(kind: FixtureKind) {
    const g = new THREE.Group(), s = FIXTURE_SPEC[kind];
    if (kind === 'ceilac' && Stage.ceilacGlb) {
      // 홈뷰 모델 — 윗면이 y 0(천장), 아래로 35mm. 긴 쪽이 x
      const m = Stage.ceilacGlb.clone(true);
      m.traverse(o => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; o.name = 'fixture-part'; } });
      g.add(m);
      return g;
    }
    const add = (geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, shadow = true) => {
      const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = shadow; o.receiveShadow = true; o.name = 'fixture-part'; g.add(o); return o;
    };
    if (kind === 'outlet') {
      // 2구 콘센트 — 판 + 둥근 꽂는 자리 2 + 핀 구멍
      add(new RoundedBoxGeometry(s.w, s.h, s.d, 3, 0.004), Stage.fixMat, 0, s.h / 2, s.d / 2, false);
      for (const dy of [-0.029, 0.029]) {
        const c = add(new THREE.CylinderGeometry(0.018, 0.018, 0.004, 28), Stage.fixGrey, 0, s.h / 2 + dy, s.d + 0.001, false); c.rotation.x = Math.PI / 2;
        for (const dx of [-0.0095, 0.0095]) { const h = add(new THREE.CylinderGeometry(0.0026, 0.0026, 0.002, 12), Stage.fixDark, dx, s.h / 2 + dy, s.d + 0.0028, false); h.rotation.x = Math.PI / 2; }
      }
    } else if (kind === 'telecom') {
      // 통신단자함 — 몸체 + 문짝(살짝 나옴) + 잠금 손잡이 + 위쪽 통풍 구멍
      add(new THREE.BoxGeometry(s.w, s.h, s.d - 0.006), Stage.fixGrey, 0, s.h / 2, (s.d - 0.006) / 2);
      add(new RoundedBoxGeometry(s.w - 0.016, s.h - 0.016, 0.006, 2, 0.002), Stage.fixMat, 0, s.h / 2, s.d - 0.003);
      add(new THREE.BoxGeometry(0.012, 0.045, 0.006), Stage.fixGrey, s.w / 2 - 0.03, s.h / 2, s.d + 0.002, false);
      for (let k = 0; k < 5; k++) add(new THREE.BoxGeometry(0.04, 0.004, 0.002), Stage.fixDark, -0.08 + k * 0.04, s.h - 0.035, s.d + 0.001, false);
    } else if (kind === 'switch' || kind === 'multi') {
      // 판 + 누름 스위치(2구 — 위아래 두 칸). 멀티패널은 오른쪽에 콘센트 한 구
      add(new RoundedBoxGeometry(s.w, s.h, s.d, 3, 0.004), Stage.fixMat, 0, s.h / 2, s.d / 2, false);
      const sx = kind === 'multi' ? -s.w / 2 + 0.038 : 0;
      for (const dy of [-0.026, 0.026]) {
        add(new RoundedBoxGeometry(0.05, 0.046, 0.006, 2, 0.002), Stage.fixMat, sx, s.h / 2 + dy, s.d + 0.003, false);
        add(new THREE.BoxGeometry(0.05, 0.001, 0.001), Stage.fixGrey, sx, s.h / 2 + dy - 0.0235, s.d + 0.0035, false);
        add(new THREE.BoxGeometry(0.006, 0.002, 0.001), Stage.fixLed, sx + 0.018, s.h / 2 + dy + 0.017, s.d + 0.0062, false);   // 표시등
      }
      if (kind === 'multi') {
        const ox = s.w / 2 - 0.038;
        const c = add(new THREE.CylinderGeometry(0.018, 0.018, 0.004, 28), Stage.fixGrey, ox, s.h / 2, s.d + 0.001, false); c.rotation.x = Math.PI / 2;
        for (const dx of [-0.0095, 0.0095]) { const h = add(new THREE.CylinderGeometry(0.0026, 0.0026, 0.002, 12), Stage.fixDark, ox + dx, s.h / 2, s.d + 0.0028, false); h.rotation.x = Math.PI / 2; }
        add(new THREE.BoxGeometry(0.001, s.h - 0.02, 0.001), Stage.fixGrey, 0.001, s.h / 2, s.d + 0.0005, false);   // 칸 나눔 선
      }
    } else if (kind === 'ceilac') {
      // 시스템 에어컨 — 홈뷰 모델이 오기 전 잠깐 보이는 모양(천장 판 + 가운데 그릴 + 토출구). 천장(y = 0)에서 아래로
      add(new RoundedBoxGeometry(s.w, s.d, s.h, 3, 0.01), Stage.fixMat, 0, -s.d / 2, 0);
      add(new THREE.BoxGeometry(0.56, 0.004, 0.56), Stage.fixGrey, 0, -s.d - 0.001, 0, false);
      for (let k = -3; k <= 3; k++) {
        add(new THREE.BoxGeometry(0.54, 0.002, 0.004), Stage.fixDark, 0, -s.d - 0.0035, k * 0.075, false);
        add(new THREE.BoxGeometry(0.004, 0.002, 0.54), Stage.fixDark, k * 0.075, -s.d - 0.0035, 0, false);
      }
      for (const sg of [-1, 1]) {
        add(new THREE.BoxGeometry(0.62, 0.004, 0.07), Stage.fixDark, 0, -s.d - 0.001, sg * 0.37, false);
        add(new THREE.BoxGeometry(0.07, 0.004, 0.62), Stage.fixDark, sg * 0.37, -s.d - 0.001, 0, false);
        add(new THREE.BoxGeometry(0.6, 0.006, 0.045), Stage.fixMat, 0, -s.d - 0.004, sg * 0.37, false);
        add(new THREE.BoxGeometry(0.045, 0.006, 0.6), Stage.fixMat, sg * 0.37, -s.d - 0.004, 0, false);
      }
    } else {
      // 벽걸이 에어컨 — 둥근 몸체 + 아래 바람 나오는 곳 + 앞판 이음선 + 표시등
      add(new RoundedBoxGeometry(s.w, s.h, s.d, 4, 0.04), Stage.fixMat, 0, s.h / 2, s.d / 2);
      add(new THREE.BoxGeometry(s.w - 0.12, 0.04, 0.12), Stage.fixDark, 0, 0.022, s.d - 0.07, false);
      add(new THREE.BoxGeometry(s.w - 0.06, 0.003, 0.003), Stage.fixGrey, 0, 0.1, s.d + 0.0005, false);
      add(new THREE.BoxGeometry(0.03, 0.006, 0.002), Stage.fixLed, s.w / 2 - 0.12, 0.075, s.d + 0.001, false);
    }
    return g;
  }
  /** 설비 상자(설비 무리 좌표) — 벽 설비는 방 안쪽으로 10cm 늘리고(장 뒤판이 벽에서 떠 있어도 가린 것으로), 천장 설비는 아래로 30cm(장이 천장까지 차면 걸린다). m = 사방 여유 */
  private static fixBox(f: Pick<RoomFixture, 'kind' | 'rot'>, m = 0) {
    const s = fixtureSize(f);
    return f.kind === 'ceilac'
      ? new THREE.Box3(new THREE.Vector3(-s.w / 2 - m, -0.3, -s.h / 2 - m), new THREE.Vector3(s.w / 2 + m, 0.01, s.h / 2 + m))
      : new THREE.Box3(new THREE.Vector3(-s.w / 2 - m, -m, 0), new THREE.Vector3(s.w / 2 + m, s.h + m, s.d + 0.1));
  }
  /** 기본 설비를 가구·창·방문과 겹치지 않는 자리로 — 처음 자리(t)에서 5cm 씩 양쪽으로 넓혀 가며 빈 곳을 찾는다.
   *  기본 위치는 방을 모르고 정한 값이라 방마다 액자·선반장·침대 뒤에 걸렸다(실측 2026-11-06). 장은 피하지 않는다 — 가리는지 알려 주는 게 목적이다 */
  settleFixtures() {
    if (!this.fixAuto || !this.fixtures.length) return;
    const FURN = ['hv-unit', 'bed', 'bedding', 'nightstand', 'side-shelf', 'room-deco', 'curtain-set'];
    const obst: THREE.Box3[] = [];
    this.room.updateMatrixWorld(true);
    for (const o of this.room.children) {
      if (!o.visible || !(FURN.includes(o.name) || o === this.doorG || o === this.winG)) continue;
      const b = new THREE.Box3().setFromObject(o);
      if (!b.isEmpty()) obst.push(b);
    }
    // 장 앞 통로(장 깊이 + 도어 여는 자리 55cm) — 장 벽 콘센트 말고는 여기 두지 않는다(장 옆 벽에 두면 장에 가려지거나 통로에 걸린다)
    const aisle = new THREE.Box3(new THREE.Vector3(-1e3, -1, -1), new THREE.Vector3(1e3, ROOM_H + 1, (this.wardrobe?.frontZ ?? 0.63) + 0.55));
    const placed: THREE.Box3[] = [], mx = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 1, 0);
    const boxAt = (f: RoomFixture) => {
      const fr = this.fixtureFrame(f);
      mx.compose(fr.p, q.setFromAxisAngle(up, fr.rot), one);
      // 여유 — 에어컨은 바람이 나오고 배관이 지나 15cm, 나머지는 3cm
      return { b: Stage.fixBox(f, f.kind === 'aircon' || f.kind === 'ceilac' ? 0.15 : 0.03).applyMatrix4(mx), fr };
    };
    const free = (f: RoomFixture, furn = true) => {
      const t0 = this.fixtureFrame(f).t;
      for (let k = 0; k < 200; k++) {
        const t = t0 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.05, { b, fr } = boxAt({ ...f, t });
        if (Math.abs(fr.t - t) > 1e-6) continue;                              // 벽 끝을 넘었다
        if ((furn && obst.some(o => o.intersectsBox(b))) || placed.some(o => o.intersectsBox(b)) || (f.wall !== 'back' && aisle.intersectsBox(b))) continue;
        return { t: Math.round(t * 1000) / 1000, b };
      }
      return null;
    };
    // 천장 설비 — 천장 등(다운라이트·등 패널)과 장 앞 통로 위를 피해 가운데에서 5cm 씩 넓혀 가며
    const lampB: THREE.Box3[] = [];
    this.lamps.updateMatrixWorld(true);
    this.lamps.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh && m.visible) lampB.push(new THREE.Box3().setFromObject(m)); });
    const ceilFree = (f: RoomFixture) => {
      const fr0 = this.fixtureFrame(f);
      for (let r = 0; r <= 40; r++) for (let a = -r; a <= r; a++) for (const [dx, dz] of [[a, -r], [a, r], [-r, a], [r, a]]) {
        const n = { ...f, t: fr0.t + dx * 0.05, y: fr0.y + dz * 0.05 }, { b, fr } = boxAt(n);
        if (Math.abs(fr.t - n.t) > 1e-6 || Math.abs(fr.y - n.y) > 1e-6) continue;
        if (lampB.some(o => o.intersectsBox(b)) || placed.some(o => o.intersectsBox(b)) || aisle.intersectsBox(b)) continue;
        return { t: Math.round(n.t * 1000) / 1000, y: Math.round(n.y * 1000) / 1000, b };
      }
      return null;
    };
    // 시스템 에어컨(기본) — 창문 앞 천장, 긴 쪽을 창과 나란히 · 바람 나오는 쪽이 방 안을 보게(1방향 천장형).
    // 창 벽에서 가운데까지 0.75m(커튼박스 20cm + 몸체 절반 25cm + 30cm). 등·통로를 피하는 건 아래 ceilFree 가 이 자리에서 넓혀 가며
    {
      const f0 = this.wf, w = this.win;
      const p0 = this.winToRoom(new THREE.Vector3(f0.x1 - 0.75, ROOM_H, w.t + w.w / 2));
      const r = Math.round(THREE.MathUtils.radToDeg(Math.atan2(-Math.cos(f0.yaw), Math.sin(f0.yaw))) / 90) * 90 + CEILAC_OUT;
      for (const f of this.fixtures) if (f.kind === 'ceilac' && !f.del) { f.t = p0.x - this.rx0; f.y = p0.z; f.rot = ((r % 360) + 360) % 360; }
    }
    const dr = this.door;
    let nearDoor = 0;
    // 손잡이 쪽(경첩 반대) — drawDoor 의 손잡이 자리. 벽 좌표 t 가 커지는 쪽이 손잡이 쪽인가: 장 벽·오른쪽 벽은 그대로, 맞은편·왼쪽 벽은 뒤집힘
    const hSign = dr ? (dr.hinge === 'L' ? 1 : -1) * (dr.wall === 'back' || dr.wall === 'right' ? 1 : -1) : 1;
    for (const f of this.fixtures) {
      if (f.del || !dr || (f.kind !== 'switch' && f.kind !== 'multi')) continue;
      const w = fixtureSize(f).w;
      f.wall = dr.wall; f.t = dr.t + dr.w / 2 + hSign * (dr.w / 2 + 0.07 + 0.08 + nearDoor + w / 2); nearDoor += w + 0.03;   // 손잡이 쪽 문틀(70mm) 옆 80mm 부터 나란히
    }
    for (const f of this.fixtures) {
      if (f.del) continue;
      if (f.wall === 'ceiling') { const r = ceilFree(f); if (r) { f.t = r.t; f.y = r.y; placed.push(r.b); } continue; }
      // 그 벽에 자리가 없으면(벽 아래가 가구로 꽉 찼다) 다른 벽 — 장 벽은 빼고, 벽 가운데에서 찾는다.
      // 어느 벽에도 빈 곳이 없으면(작은 방) 가구 뒤라도 처음 벽에 — 다른 설비와 겹치지만 않게(실측: 통신단자함이 콘센트와 겹쳤다)
      const walls = f.wall === 'back' ? ['back'] as const : [f.wall, ...(['left', 'right', 'front'] as const).filter(w => w !== f.wall)];
      const tries = [...walls.map((wall, i) => ({ n: i === 0 ? f : { ...f, wall: wall as RoomFixture['wall'], t: (wall === 'front' ? this.rx1 - this.rx0 : ROOM_D) / 2 }, furn: true })), { n: f, furn: false }];
      for (const { n, furn } of tries) {
        const r = free(n, furn);
        if (r) { f.wall = n.wall; f.t = r.t; placed.push(r.b); break; }
      }
    }
    this.drawFixtures();
  }
  /** 고른 설비(파랑) · 장과 겹친 설비(주황) 표시 — 장 뒤에 가려진 콘센트도 테두리는 보인다 */
  markFixtures(sel: string | null) { this.fixSel = sel; this.applyFixMark(); this.dirty = true; }
  private applyFixMark() {
    const clash = new Set(this.fixtureClashes());
    for (const g of this.fixGs) {
      for (const o of g.children.filter(c => c.name === 'open-mark')) { o.removeFromParent(); o.traverse(c => { (c as THREE.Mesh).geometry?.dispose(); ((c as THREE.Mesh).material as THREE.Material | undefined)?.dispose?.(); }); }
      const id = g.userData.fixId as string;
      if (id === this.fixSel) this.addMark(g, 0x2f6bff);
      else if (clash.has(id)) this.addMark(g, 0xff8a1f);
    }
  }
  /** 장과 겹치는 설비 id — 벽에 붙은 설비를 방 안쪽으로 10cm 늘려(장 뒤판이 벽에서 떠 있어도) 장 몸체 상자와 겹치면 가린 것 */
  fixtureClashes(): string[] {
    const w = this.wardrobe;
    if (!w || this.wardHidden || !w.root.parent) return [];
    w.root.updateMatrixWorld(true);
    const wb = new THREE.Box3().setFromObject(w.root);
    wb.min.x = w.root.position.x; wb.max.x = w.root.position.x + w.width;                 // 열린 도어·소품은 빼고 장 몸체만
    wb.min.z = Math.max(wb.min.z, 0); wb.max.z = Math.min(wb.max.z, w.root.position.z + w.frontZ);
    const out: string[] = [];
    for (const g of this.fixGs) {
      g.updateMatrixWorld(true);
      const fb = Stage.fixBox(this.fixtures.find(f => f.id === g.userData.fixId) ?? { kind: 'outlet' }).applyMatrix4(g.matrixWorld);
      if (fb.intersectsBox(wb)) out.push(g.userData.fixId as string);
    }
    return out;
  }
  /** 화면 좌표 아래 설비 id(앞을 가리는 것이 없을 때) */
  pickFixture(ev: PointerEvent): string | null {
    if (!this.fixGs.length) return null;
    const targets: THREE.Object3D[] = [this.room]; if (this.wardrobe) targets.push(this.wardrobe.root);
    const hits = this.rayAt(ev).intersectObjects(targets, true).filter(h => h.object.name !== 'curtain');
    const fixOf = (o: THREE.Object3D | null) => { for (; o; o = o.parent) if (o.userData.fixId) return o.userData.fixId as string; return null; };
    const first = fixOf(hits[0]?.object ?? null);
    if (first) return first;
    // 장 뒤에 가려진 설비(주황 표시) — 장을 비쳐 고른다(사용자 지시 2026-11-06 「장 뒤 오브젝트는 표기만 되고 선택이 안 돼 — 선택해서 이동·삭제」).
    // 앞을 가린 것이 장(몸체·도어·소품)일 때만. 벽·다른 가구가 가리면 그대로 못 고른다
    const w = this.wardrobe?.root, hidden = new Set(this.fixtureClashes());
    const inWard = (o: THREE.Object3D | null) => { for (; o; o = o.parent) if (o === w) return true; return false; };
    for (const h of hits) {
      const id = fixOf(h.object);
      if (id) return hidden.has(id) ? id : null;
      if (!inWard(h.object)) return null;
    }
    return null;
  }
  /** 끄는 중 — 마우스가 가리키는 벽 면으로(다른 벽을 가리키면 그 벽으로). 가운데를 마우스에 */
  fixtureAt(ev: PointerEvent, f: RoomFixture): RoomFixture {
    const s = fixtureSize(f), rc = this.rayAt(ev), o = rc.ray.origin, v = rc.ray.direction, D = ROOM_D, x0 = this.rx0, x1 = this.rx1;
    if (f.wall === 'ceiling') {
      if (v.y <= 1e-6) return f;
      const p = o.clone().addScaledVector(v, (ROOM_H - o.y) / v.y), fr = this.fixtureFrame({ ...f, t: p.x - x0, y: p.z });
      return { ...f, t: Math.round(fr.t * 1000) / 1000, y: Math.round(fr.y * 1000) / 1000 };
    }
    const cands: { wall: RoomDoor['wall']; k: number; along: number; y: number }[] = [];
    const tryPlane = (wall: RoomDoor['wall'], axis: 'x' | 'z', at: number) => {
      const dv = axis === 'x' ? v.x : v.z; if (Math.abs(dv) < 1e-6) return;
      const k = (at - (axis === 'x' ? o.x : o.z)) / dv; if (k <= 0) return;
      const p = o.clone().addScaledVector(v, k);
      if (p.y < -0.1 || p.y > ROOM_H + 0.2) return;
      const along = axis === 'x' ? p.z : p.x - x0, len = axis === 'x' ? D : x1 - x0;
      if (along < -0.1 || along > len + 0.1) return;
      cands.push({ wall, k, along, y: p.y });
    };
    tryPlane('left', 'x', x0); tryPlane('right', 'x', x1); tryPlane('back', 'z', 0); tryPlane('front', 'z', D);
    const b = cands.sort((a, c) => a.k - c.k)[0];
    if (!b) return f;
    const n = { ...f, wall: b.wall, t: b.along, y: b.y - s.h / 2 }, fr = this.fixtureFrame(n);
    return { ...n, t: Math.round(fr.t * 1000) / 1000, y: Math.round(fr.y * 1000) / 1000 };
  }
  private drawDoor() {
    for (const r of [this.doorG, this.doorZone]) r.traverse(o => (o as THREE.Mesh).geometry?.dispose());
    this.doorG.clear(); this.doorZone.clear();
    this.doorG.removeFromParent();
    const d = this.door;
    if (!d) return;
    const f = this.doorFrame(d), w = d.w, h = d.h ?? DOOR_H, cw = 0.07, cd = 0.018;
    const g = this.doorG; g.name = 'room-door';
    g.position.copy(f.p); g.rotation.set(0, f.rot, 0);
    const box = (bw: number, bh: number, bd: number, m: THREE.Material, x: number, y: number, z: number, name: string) => {
      const o = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), m); o.position.set(x, y, z); o.name = name;
      o.castShadow = o.receiveShadow = true; g.add(o); return o;
    };
    // 문틀(몰딩) — 양옆·위
    box(cw, h + cw, cd, Stage.casingMat, -w / 2 - cw / 2, (h + cw) / 2, cd / 2, 'door-casing');
    box(cw, h + cw, cd, Stage.casingMat, w / 2 + cw / 2, (h + cw) / 2, cd / 2, 'door-casing');
    box(w, cw, cd, Stage.casingMat, 0, h + cw / 2, cd / 2, 'door-casing');
    // 문짝 — 문틀 안쪽으로 1cm 들어가게(사용자 지적 2026-11-06 「문이 문틀보다 앞으로 나와 있다」). 앞면 = 문틀 앞면(cd) - 1cm, 두께 38mm 는 벽 속으로
    const lf = cd - 0.01, dz = lf - 0.029;            // 예전 앞면(벽에서 29mm) 기준으로 붙어 있던 손잡이·경첩도 같은 만큼 안으로
    box(w - 0.006, h - 0.006, 0.038, Stage.doorMat, 0, h / 2, lf - 0.019, 'door-leaf');
    // 손잡이 — 경첩 반대편, 높이 1m (로즈 + 레버)
    const hs = d.hinge === 'L' ? 1 : -1;               // 경첩 L(문 앞에서 보아 왼쪽) → 손잡이 오른쪽(+x)
    const hx = hs * (w / 2 - 0.07);
    const rose = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.01, 24), Stage.leverMat);
    rose.rotation.x = Math.PI / 2; rose.position.set(hx, 1.0, 0.034 + dz); rose.name = 'door-handle'; g.add(rose);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.05, 12), Stage.leverMat);
    neck.rotation.x = Math.PI / 2; neck.position.set(hx, 1.0, 0.06 + dz); neck.name = 'door-handle'; g.add(neck);
    const lever = new THREE.Mesh(new THREE.CapsuleGeometry(0.009, 0.11, 4, 10), Stage.leverMat);
    lever.rotation.z = Math.PI / 2; lever.position.set(hx - hs * 0.055, 1.0, 0.083 + dz); lever.name = 'door-handle'; g.add(lever);
    // 경첩 3개 — 경첩 쪽 모서리
    for (const y of [0.2, h / 2, h - 0.2]) box(0.012, 0.1, 0.012, Stage.leverMat, -hs * (w / 2 - 0.004), y, 0.032 + dz, 'door-hinge');
    batchStatic([g], g, { name: 'room-door-part' });   // 문 묶음 안에서 재질별로 — 문틀·문짝·손잡이·경첩 10개 → 3개
    this.room.add(g);
    // 열리는 자리 — 경첩을 중심으로 반지름 = 문 폭, 닫힌 방향에서 방 안쪽(+z)까지 90°
    const start = d.hinge === 'L' ? 0 : Math.PI / 2;
    const sector = new THREE.Mesh(new THREE.CircleGeometry(w, 40, start, Math.PI / 2), Stage.zoneMat);
    sector.rotation.x = Math.PI / 2;
    const arcPts = Array.from({ length: 41 }, (_, i) => { const a = start + (Math.PI / 2) * (i / 40); return new THREE.Vector3(Math.cos(a) * w, 0, Math.sin(a) * w); });
    const arc = new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), Stage.zoneLine);
    [sector, arc].forEach(o => (o.raycast = () => {}));
    const hinge = new THREE.Group(); hinge.add(sector, arc);
    hinge.position.set(-hs * w / 2, 0.004, 0.02);
    const holder = new THREE.Group(); holder.add(hinge);
    holder.position.copy(f.p); holder.rotation.y = f.rot;
    this.doorZone.add(holder);
  }
  private rayAt(ev: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    const rc = new THREE.Raycaster(); rc.setFromCamera(ndc, this.camera);
    return rc;
  }
  /** 화면 좌표가 방 출입문 위인가(앞을 가리는 것이 없을 때) */
  hitsRoomDoor(ev: PointerEvent) {
    if (!this.door || !this.doorG.parent) return false;
    const targets: THREE.Object3D[] = [this.room]; if (this.wardrobe) targets.push(this.wardrobe.root);
    const hit = this.rayAt(ev).intersectObjects(targets, true)[0];
    if (!hit) return false;
    for (let o: THREE.Object3D | null = hit.object; o; o = o.parent) if (o === this.doorG) return true;
    return false;
  }
  /** 회전 = 카메라 자리에서 고개 돌리기(사용자 지시 2026-10-30 「어느 영역 중심이 아니라 카메라 중심으로」).
   *  궤도 회전은 끄고 왼쪽 끌기(손가락 하나)로 방향만 돌린다 — 마우스 방향(「화면 잡아끌기」 켜면 반대).
   *  목표점은 같은 거리 앞으로 옮겨 두어(방 안으로 제한) 휠 확대·오른쪽 끌기 이동은 OrbitControls 그대로 */
  private lookAround() {
    const c = this.controls, el = this.renderer.domElement, K0 = 0.0035;
    c.enableRotate = false;
    const ptrs = new Set<number>();
    let last: { x: number; y: number } | null = null;
    const sph = new THREE.Spherical(), dir = new THREE.Vector3();
    el.addEventListener('pointerdown', e => {
      ptrs.add(e.pointerId);
      last = e.button === 0 && ptrs.size === 1 && this.mode !== 'bake' && this.mode !== 'surfel' ? { x: e.clientX, y: e.clientY } : null;
    });
    // 놓기는 window 캡처로 받는다 — 칸 고르기·끌기가 캔버스에서 pointerup 을 막으면(stopImmediatePropagation) 여기서 못 받아
    // last 가 남고, 다음에 고른 칸을 끌 때 칸 이동과 함께 화면이 돌았다(사용자 지적 2026-11-09)
    const end = (e: PointerEvent) => { ptrs.delete(e.pointerId); if (!ptrs.size) last = null; };
    window.addEventListener('pointerup', end, true); window.addEventListener('pointercancel', end, true);
    el.addEventListener('pointermove', e => {
      if (!c.enabled) { last = null; return; }   // 칸·가구·설비를 끄는 동안은 회전하지 않는다
      if (!last || ptrs.size !== 1 || !(e.buttons & 1)) return;
      const dx = e.clientX - last.x, dy = e.clientY - last.y; last = { x: e.clientX, y: e.clientY };
      if (!dx && !dy) return;
      const p = this.camera.position;
      dir.subVectors(c.target, p); const dist = dir.length();
      sph.setFromVector3(dir);
      // 기본 = 마우스 방향으로 고개를 돌린다(오른쪽으로 끌면 오른쪽을 본다 — 사용자 지시 2026-10-30 「마우스 방향 반전」).
      // 후처리 「화면 잡아끌기」를 켜면 예전처럼 반대(스트리트뷰)
      const K = K0 * (this.raster.post.camRot ?? 1) * (this.raster.post.camGrab ? 1 : -1);
      sph.theta += dx * K;
      sph.phi = THREE.MathUtils.clamp(sph.phi - dy * K, 0.15, Math.PI - 0.15);
      dir.setFromSpherical(sph).normalize();
      // 목표점은 방 안에 — 벽 밖이면 카메라 제한(keepCameraInRoom)이 엉뚱하게 당긴다
      const lo = [this.rx0, 0, 0], hi = [this.rx1, ROOM_H, ROOM_D], pv = [p.x, p.y, p.z], dv = [dir.x, dir.y, dir.z];
      let tMax = dist;
      for (let i = 0; i < 3; i++) {
        if (dv[i] > 1e-6) tMax = Math.min(tMax, (hi[i] - 0.05 - pv[i]) / dv[i]);
        else if (dv[i] < -1e-6) tMax = Math.min(tMax, (lo[i] + 0.05 - pv[i]) / dv[i]);
      }
      c.target.copy(p).addScaledVector(dir, Math.max(0.3, tMax));
      this.camWantR = this.camera.position.distanceTo(c.target);
      c.update();
      c.dispatchEvent({ type: 'change' });
    });
  }
  /** 카메라 설정(후처리 「카메라」) — 화각·확대·이동 속도·관성. 회전 속도는 lookAround 가 읽는다 */
  private applyCamera() {
    const p = this.raster.post, cam = this.camera;
    const fov = THREE.MathUtils.clamp(p.camFov ?? 45, 20, 100);
    if (Math.abs(cam.fov - fov) > 1e-3) { cam.fov = fov; cam.updateProjectionMatrix(); }
    this.controls.zoomSpeed = p.camZoom ?? 1;
    this.controls.panSpeed = p.camPan ?? 1;
    if (this.mode !== 'mutracer') this.controls.enableDamping = p.camDamping ?? true;
    this.dirty = true;
  }
  /** 창 자리 바로잡기 — 벽 끝(10cm)·장(창 쪽 벽에 붙었으면 장 앞 15cm)·천장(창 위 25cm 는 커튼박스·벽)·같은 벽 방문과 겹치지 않게 */
  fitWindow(w: RoomWindow): RoomWindow {
    // 창 벽(L) 안 — 벽 끝에서 장이 막은 길이(zs·ze)는 비운다
    const f = this.wf, LN = f.len || ROOM_D, zMin = f.zs > 0 ? f.zs + 0.15 : 0.1, zMax = LN - (f.ze > 0 ? f.ze + 0.15 : 0.1);
    const r = { ...w };
    r.w = THREE.MathUtils.clamp(r.w, 0.4, Math.max(0.4, zMax - zMin));
    r.h = THREE.MathUtils.clamp(r.h, 0.4, ROOM_H - 0.25 - 0.1);
    r.sill = THREE.MathUtils.clamp(r.sill, 0.1, ROOM_H - 0.25 - r.h);
    r.t = THREE.MathUtils.clamp(r.t, zMin, Math.max(zMin, zMax - r.w));
    const d = this.doorL();
    if (d && r.t < d[1] + 0.12 && r.t + r.w > d[0] - 0.12) {
      // 방문을 피해 넓은 쪽으로
      const before = d[0] - 0.12 - zMin, after = zMax - (d[1] + 0.12);
      if (before >= r.w && (before >= after || after < r.w)) r.t = Math.min(r.t, d[0] - 0.12 - r.w);
      else if (after >= r.w) r.t = Math.max(r.t, d[1] + 0.12);
    }
    return r;
  }
  /** 화면 좌표가 창 위인가 */
  hitsWindow(ev: PointerEvent) {
    if (!this.winG.parent) return false;
    const targets: THREE.Object3D[] = [this.room]; if (this.wardrobe) targets.push(this.wardrobe.root);
    // 커튼은 지나친다 — 창 앞을 덮은 속커튼에 막혀 창을 못 골랐다
    const hit = this.rayAt(ev).intersectObjects(targets, true).find(h => h.object.name !== 'curtain');
    if (!hit) return false;
    for (let o: THREE.Object3D | null = hit.object; o; o = o.parent) if (o === this.winG) return true;
    return false;
  }
  /** 끄는 중 — 창 벽(x = rx1) 위 마우스 자리로. 방은 놓을 때 다시 만들고, 그동안은 창만 미리 옮겨 보인다 */
  windowAt(ev: PointerEvent, w: RoomWindow): RoomWindow {
    const rc = this.rayAt(ev), o = rc.ray.origin.clone().applyMatrix4(this.wf.inv), v = rc.ray.direction.clone().transformDirection(this.wf.inv);
    if (Math.abs(v.x) < 1e-6) return w;
    const k = (this.wf.x1 - o.x) / v.x; if (k <= 0) return w;
    const p = o.clone().addScaledVector(v, k);
    const n = this.fitWindow({ ...w, t: p.z - w.w / 2 });
    this.winG.position.z = n.t - this.win.t;      // 미리보기
    this.dirty = true;
    return n;
  }
  /** 끄는 중 — 마우스가 가리키는 벽으로 문을 옮긴다(벽 끝·창과 겹치지 않게) */
  doorAt(ev: PointerEvent, d: RoomDoor): RoomDoor {
    const rc = this.rayAt(ev);
    const o = rc.ray.origin, v = rc.ray.direction, D = ROOM_D, x0 = this.rx0, x1 = this.rx1;
    const cands: { wall: RoomDoor['wall']; k: number; along: number; len: number }[] = [];
    const tryPlane = (wall: RoomDoor['wall'], axis: 'x' | 'z', at: number) => {
      const dv = axis === 'x' ? v.x : v.z; if (Math.abs(dv) < 1e-6) return;
      const k = (at - (axis === 'x' ? o.x : o.z)) / dv; if (k <= 0) return;
      const p = o.clone().addScaledVector(v, k);
      if (p.y < -0.1 || p.y > ROOM_H + 0.3) return;
      const along = axis === 'x' ? p.z : p.x - x0, len = axis === 'x' ? D : x1 - x0;
      if (along < -0.2 || along > len + 0.2) return;
      cands.push({ wall, k, along, len });
    };
    tryPlane('left', 'x', x0); tryPlane('right', 'x', x1); tryPlane('back', 'z', 0); tryPlane('front', 'z', D);
    const c = cands.sort((a, b) => a.k - b.k)[0];
    if (!c) return d;
    let t = THREE.MathUtils.clamp(c.along - d.w / 2, 0.08, c.len - d.w - 0.08);
    // 오른쪽 벽 창과 겹치면 가까운 쪽 바깥으로
    // 창 구간(L)을 그 벽의 t 로 — 오른쪽 벽은 그대로, 왼쪽 벽은 깊이에서 뒤집고, 맞은편 벽은 방 폭에서 뒤집는다
    const la = this.win.t - 0.05, lb = this.win.t + this.win.w + 0.05;
    const [wa, wb] = this.winWall === 'right' ? [la, lb] : this.winWall === 'left' ? [D - lb, D - la] : [this.wf.len - lb, this.wf.len - la];
    if (c.wall === this.winWall && t < wb && t + d.w > wa) t = (t + d.w / 2 < (wa + wb) / 2) ? Math.max(0.08, wa - d.w) : wb;
    return { ...d, wall: c.wall, t };
  }

  // ---- 치수선 · 핫스팟 (CSS 라벨)
  /** 방문 열림 자리(파란 부채꼴) 보이기 — 방문을 골랐을 때만 */
  showDoorZone(v: boolean) { if (this.doorZone.visible !== v) { this.doorZone.visible = v; this.dirty = true; } }
  /** 지금 놓인 가구(홈뷰 묶음 중 바닥 가구 · 보이는 것)의 바닥 사각형 [x0, x1, z0, z1] — 배치 가능 가구 계산에서 피한다. 러그·벽 장식은 뺀다 */
  furnitureRects(): [number, number, number, number][] {
    const out: [number, number, number, number][] = [];
    for (const o of this.room.children) {
      if (o.name !== 'hv-unit' || !o.visible || o.userData.kind !== 'furn') continue;
      const b = new THREE.Box3().setFromObject(o);
      if (!b.isEmpty()) out.push([Math.max(this.rx0, b.min.x), Math.min(this.rx1, b.max.x), Math.max(0, b.min.z), Math.min(ROOM_D, b.max.z)]);
    }
    return out;
  }
  /** 배치 가능 가구 자리 — 바닥에 몸체(짙게)·비울 자리(옅게) 사각형 + 이름표. 치수선 지우기(clearOverlay)에 안 지워진다(keep) */
  private fpG: THREE.Group | null = null;
  showFootprints(list: { r: [number, number, number, number]; color: number; clear?: boolean; label?: string }[] | null) {
    if (this.fpG) {
      this.fpG.traverse(o => { if (o instanceof CSS2DObject) o.element.remove(); (o as THREE.Mesh).geometry?.dispose(); ((o as THREE.Mesh).material as THREE.Material | undefined)?.dispose?.(); });
      this.fpG.removeFromParent(); this.fpG = null;
    }
    if (list?.length) {
      const g = new THREE.Group(); g.name = 'open-mark'; g.userData.keep = true;
      for (const it of list) {
        const [x0, x1, z0, z1] = it.r, w = x1 - x0, d = z1 - z0, c = new THREE.Vector3((x0 + x1) / 2, it.clear ? 0.028 : 0.03, (z0 + z1) / 2)   // 러그(2cm) 위 — 벽 너머로 비치지 않게 깊이 검사는 켠다(방 밖에 있는 것처럼 보였다);
        const plane = new THREE.PlaneGeometry(w, d); plane.rotateX(-Math.PI / 2);
        const fill = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ color: it.color, transparent: true, opacity: it.clear ? 0.14 : 0.32, depthWrite: false }));
        const line = new THREE.LineSegments(new THREE.EdgesGeometry(plane), new THREE.LineBasicMaterial({ color: it.color, transparent: true, opacity: it.clear ? 0.45 : 1 }));
        for (const o of [fill, line]) { o.position.copy(c); o.renderOrder = 8; o.layers.set(1); o.raycast = () => {}; g.add(o); }
        if (it.label) {
          const el = document.createElement('div'); el.className = 'fp-label'; el.textContent = it.label;
          const o = new CSS2DObject(el); o.position.set(c.x, 0.02, c.z); g.add(o);
        }
      }
      g.position.x = -this.overlay.position.x;   // 무리(overlay)는 장 좌표(장만큼 옮겨짐) — 이 표시는 방 좌표라 되돌린다(장만큼 밀려 방 밖으로 나가 보였다)
      this.overlay.add(g); this.fpG = g;
    }
    this.dirty = true;
  }
  clearOverlay() {
    for (const c of [...this.overlay.children]) {
      if (c.userData.keep) continue;                 // 방 출입문 열림 자리
      c.traverse(o => { if (o instanceof CSS2DObject) o.element.remove(); });
      this.overlay.remove(c);
    }
  }
  label(text: string, pos: THREE.Vector3, cls = 'dim') {
    const el = document.createElement('div'); el.className = cls; el.textContent = text;
    const o = new CSS2DObject(el); o.position.copy(pos); this.overlay.add(o); return el;
  }
  dimLine(a: THREE.Vector3, b: THREE.Vector3, text: string) {
    const g = new THREE.BufferGeometry().setFromPoints([a, b]);
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x555555 }));
    this.overlay.add(line);
    for (const p of [a, b]) {
      const tick = new THREE.BufferGeometry().setFromPoints([p.clone().add(new THREE.Vector3(0, -0.03, 0)), p.clone().add(new THREE.Vector3(0, 0.03, 0))]);
      this.overlay.add(new THREE.Line(tick, line.material));
    }
    this.label(text, a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 0.05, 0)));
  }
  hotspot(pos: THREE.Vector3, onClick: () => void, title: string) {
    const el = this.label('', pos, 'hotspot');
    el.title = title;
    el.addEventListener('pointerdown', e => { e.stopPropagation(); onClick(); });
    return el;
  }
  /** 선택 표시 — 앞면에 굵은 파란 테두리(1.2cm 막대) + 옅은 파란 면. 선(LineSegments)은 1px 이라 잘 안 보였다(사용자 지적) */
  private static selMat = new THREE.MeshBasicMaterial({ color: 0x2f6bff, toneMapped: false });
  private static selFill = new THREE.MeshBasicMaterial({ color: 0x2f6bff, toneMapped: false, transparent: true, opacity: 0.16, depthWrite: false });
  private frontFrame(x0: number, x1: number, y0: number, y1: number, z: number, fill = true) {
    const t = 0.012, g = new THREE.Group(), w = x1 - x0, h = y1 - y0;
    const bar = (bw: number, bh: number, x: number, y: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.004), Stage.selMat);
      m.position.set(x, y, z); m.raycast = () => {}; g.add(m);
    };
    bar(w + t, t, x0 + w / 2, y0); bar(w + t, t, x0 + w / 2, y1);
    bar(t, h + t, x0, y0 + h / 2); bar(t, h + t, x1, y0 + h / 2);
    if (fill) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(w, h), Stage.selFill);
      f.position.set(x0 + w / 2, y0 + h / 2, z - 0.001); f.raycast = () => {}; g.add(f);
    }
    this.overlay.add(g);
  }
  /** 장 앞면(z = frontZ) 세로 평면 위 마우스 자리(방 좌표) — 칸을 끌어 순서 바꿀 때. 평면과 나란하거나 뒤쪽이면 없음 */
  frontPlaneAt(ev: PointerEvent): THREE.Vector3 | null {
    if (!this.wardrobe) return null;
    const r = this.rayAt(ev).ray, z = this.wardrobe.root.position.z + this.wardrobe.frontZ;
    if (Math.abs(r.direction.z) < 1e-4) return null;
    const k = (z - r.origin.z) / r.direction.z;
    return k > 0 ? r.origin.clone().addScaledVector(r.direction, k) : null;
  }
  selectBox(x0: number, x1: number, y0: number, y1: number) {
    this.frontFrame(x0, x1, y0, y1, (this.wardrobe?.frontZ ?? 0.63) + 0.006, false);
  }
  /** 화면 좌표 → 누른 도어(칸 · 몇 번째 도어 · 도어 물체)·서랍(door = -1). 둘 다 아니면 null */
  pickDoor(ev: PointerEvent): { slot: number; door: number; obj: THREE.Object3D } | null {
    if (!this.wardrobe) return null;
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    const rc = new THREE.Raycaster(); rc.setFromCamera(ndc, this.camera);
    const hit = rc.intersectObject(this.wardrobe.root, true).find(h => shown(h.object));
    if (!hit) return null;
    const u = hit.object.userData;
    if (u.door == null && !u.drawer) return null;
    let o: THREE.Object3D = hit.object;
    while (o.parent && !(u.drawer ? o.userData.drawerRoot : o.userData.doorRoot)) o = o.parent;
    return { slot: u.slot, door: u.drawer ? -1 : u.door, obj: o };
  }
  /** 도어 한 짝 선택 표시 — 도어 앞면에 굵은 테두리 + 옅은 면 */
  outline(obj: THREE.Object3D) {
    const b = new THREE.Box3().setFromObject(obj), ox = this.overlay.position.x;
    this.frontFrame(b.min.x - ox, b.max.x - ox, b.min.y, b.max.y, b.max.z + 0.006);
  }

  /** 화면 좌표 → 몸통 칸 번호 */
  /** 화면 좌표 아래가 노출 EP 면 그 쪽('L' | 'R') — 앞을 다른 것이 가리면 없음 */
  pickEP(ev: PointerEvent): 'L' | 'R' | null {
    if (!this.wardrobe) return null;
    const targets: THREE.Object3D[] = [this.wardrobe.root, this.room];
    const hit = this.rayAt(ev).intersectObjects(targets, true).find(h => shown(h.object) && h.object.name !== 'open-mark');
    if (hit?.object.name === 'ep-mirror') return hit.object.userData.epSide as 'L' | 'R';
    for (let o: THREE.Object3D | null = hit?.object ?? null; o; o = o.parent) if (o.name === 'ep-L' || o.name === 'ep-R') return o.name === 'ep-L' ? 'L' : 'R';
    return null;
  }
  /** 고른 EP 표시(파란 테두리) — 장을 다시 만들면 다시 단다 */
  private epSel: 'L' | 'R' | null = null;
  markEP(side: 'L' | 'R' | null) {
    this.epSel = side;
    this.wardrobe?.root.traverse(o => { if (o.name === 'ep-L' || o.name === 'ep-R') for (const c of o.children.filter(x => x.name === 'open-mark')) c.removeFromParent(); });
    const g = side && this.wardrobe?.root.getObjectByName(side === 'L' ? 'ep-L' : 'ep-R');
    if (g) this.addMark(g, 0x2f6bff);
    this.dirty = true;
  }
  /** 화면 좌표 아래에 물체 g(보이는 부분)가 있는지 — 다른 물체는 보지 않는다. 고른 칸 잡기용: 이미 고른 것이라 뜻이 분명해,
   *  장 뒤 설비·장과 겹친 가구·숨긴 도어 검사에 걸려 화면 회전으로 넘어가던 것을 막는다(사용자 지적 2026-11-09 「마우스 회전되는 문제」) */
  hitsGroup(ev: PointerEvent, g: THREE.Object3D): boolean {
    return this.rayAt(ev).intersectObject(g, true).some(h => shown(h.object) && h.object.name !== 'sel-mark' && h.object.name !== 'open-mark');
  }
  pickSlot(ev: PointerEvent): number | null {
    if (!this.wardrobe) return null;
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    const rc = new THREE.Raycaster(); rc.setFromCamera(ndc, this.camera);
    const hit = rc.intersectObject(this.wardrobe.root, true).find(h => shown(h.object));
    if (!hit) return null;
    if (hit.object.userData.slot != null) return hit.object.userData.slot;
    // 몸통·소품은 칸 구분 없이 합쳐져 있다(batch.ts) — 맞은 자리의 x 로 칸을 찾는다
    const x = this.wardrobe.root.worldToLocal(hit.point.clone()).x;
    const i = this.wardrobe.slots.findIndex(s => x >= s.x0 - 1e-3 && x <= s.x1 + 1e-3);
    return i >= 0 ? i : null;
  }

  // ---- 보기: 재질 / 재질+라인 — 모서리 선(EdgesGeometry)을 메시 자식으로 붙여 도어·서랍과 함께 움직인다
  private edgeCache = new WeakMap<THREE.BufferGeometry, THREE.EdgesGeometry>();
  private edgeMat = new THREE.LineBasicMaterial({ color: 0x2b2b2b });
  setLines(on: boolean) { this.lines = on; this.applyLines(); }
  private applyLines() {
    if (!this.wardrobe) return;
    const meshes: THREE.Mesh[] = [];
    // 장 안 소품(slot-props)은 빼고 — 천 모서리 선은 지저분하고 무겁다
    const inProps = (o: THREE.Object3D) => { for (let p: THREE.Object3D | null = o; p; p = p.parent) if (p.name === 'slot-props') return true; return false; };
    this.wardrobe.root.traverse(o => { if ((o as THREE.Mesh).isMesh && !inProps(o)) meshes.push(o as THREE.Mesh); });
    // 선이 면과 같은 깊이라 점선처럼 끊긴다 — 라인 보기에선 면을 살짝 뒤로 민다
    for (const m of meshes) for (const mt of [m.material].flat()) {
      mt.polygonOffset = this.lines; mt.polygonOffsetFactor = 1; mt.polygonOffsetUnits = 1;
    }
    for (const m of meshes) {
      const old = m.children.find(c => c.name === 'edge-lines');
      if (old) m.remove(old);
      if (!this.lines) continue;
      let eg = this.edgeCache.get(m.geometry);
      if (!eg) { eg = new THREE.EdgesGeometry(m.geometry, 28); this.edgeCache.set(m.geometry, eg); }
      const l = new THREE.LineSegments(eg, this.edgeMat);
      l.name = 'edge-lines'; l.raycast = () => {};
      m.add(l);
    }
    this.dirty = true;
  }

  /** 굽기·서펠은 장면을 GLB 로 넘긴 사진 같은 상태 — 모듈·컬러·도어 열림이 바뀌면 그 상태로 다시 넘긴다 (MuTracer 는 자동 반영).
   *  한 번 만든 결과는 장면 상태(설계·도어 열림·탭)별로 저장해 두고, 같은 상태로 돌아오면 다시 굽지 않는다 */
  stateKey: () => string = () => '';
  private embedCache = new Map<string, EmbedHandle>();
  private embedPending = new Set<string>();
  private static EMBED_KEEP = 4;          // 엔진 화면(iframe)마다 GPU 를 따로 쓴다 — 최근 4개만 둔다
  private resendTimer = 0;
  // 조명은 열쇠에 넣지 않는다 — 조명은 값만 보내 실시간으로 바꾼다(pushLight)
  private embedKey(kind: EmbedKind) { return `${kind}|${this.stateKey()}`; }
  /** 엔진에 보낼 조명 값 — 실시간 화면과 같은 해·다운라이트·발광 기구·노출 */
  private lightPayload(): LightPayload {
    const { lamp, exposure } = this.roomCfg;
    const col = this.lampCol().getHex();
    return {
      sun: { ...this.sunCfg }, sunTarget: this.sunTarget.toArray(),
      spot: { intensity: DOWNLIGHT_CD * lamp, color: col },
      glow: { intensity: Math.max(0.05, lamp * 2.2), color: col },
      exposure,
    };
  }
  private pushLight() {
    if (this.mode !== 'bake' && this.mode !== 'surfel') return;
    this.embedCache.get(this.embedKey(this.mode))?.setLight(this.lightPayload());
  }
  /** 방 안쪽 상자(라이트맵 — 방 밖을 보는 면은 굽지 않는다) */
  /** 공간감 기준 창(raster depthFactor) — 창 면 가운데·방 안쪽 법선·맞은편 벽까지 거리. 창이 여럿이면 가장 큰 것 */
  private depthWindow() {
    const keep = this.lmLamp, wins = this.lightIn().wins; this.lmLamp = keep;   // lightIn 은 굽기 기준 조명 밝기를 적는다 — 여기선 건드리지 않는다
    const w = wins.sort((a, b) => Math.hypot(...b.u) * Math.hypot(...b.v) - Math.hypot(...a.u) * Math.hypot(...a.v))[0];
    if (!w) { this.raster.setWindow(null); return; }
    const box = this.insideBox(), ax = w.n.findIndex(v => Math.abs(v) > 0.5);
    const depth = w.n[ax] > 0 ? box.max.getComponent(ax) - w.c[ax] : w.c[ax] - box.min.getComponent(ax);
    this.raster.setWindow({ c: w.c, n: w.n, depth });
  }
  private insideBox() { const sp = this.roomSpan(); return new THREE.Box3(new THREE.Vector3(sp.x0 - 0.01, -0.01, -0.01), new THREE.Vector3(sp.x1 + 0.01, ROOM_H + 0.01, sp.D + 0.01)); }
  /** 공간 라이트맵에 넘길 조명 — 실시간 조명 값 그대로(해 = lux, 조명 = cd, 창 = nit). 창 면은 유리 묶음의 바깥면 */
  private lightIn(): LightIn {
    this.scene.updateMatrixWorld(true);
    const V = () => new THREE.Vector3();
    const sunDir = this.sun.position.clone().sub(this.sun.target.position).normalize();
    const rgb = (c: THREE.Color, k: number) => [c.r * k, c.g * k, c.b * k];
    const spots: LightIn['spots'] = [];
    this.lamps.traverse(o => {
      const l = o as THREE.SpotLight, r = o as THREE.RectAreaLight;
      if (l.isSpotLight && !l.userData.filler && l.intensity > 0) {
        const p = l.getWorldPosition(V()), d = l.target.getWorldPosition(V()).sub(p).normalize();
        // 다운라이트·메인 조명은 굽는다(그림자 포함) — 다운라이트는 실시간 그림자가 없고, 메인 조명은 그림자 지도가 얇은 틈(책상 타공판 뒤)에서 샌다. 장 조명은 실시간 그대로
        spots.push({ p: p.toArray(), d: d.toArray(), cosO: Math.cos(l.angle), cosI: Math.cos(l.angle * (1 - l.penumbra)), rgb: rgb(l.color, l.intensity), bake: !l.castShadow || !!l.userData.main });
      } else if (r.isRectAreaLight && !r.userData.filler && r.intensity > 0) {
        // 라인·패널 — 가운데 한 점, 정면 광도 = 휘도 × 넓이(정면에서 멀어질수록 cos)
        const p = r.getWorldPosition(V()), d = new THREE.Vector3(0, 0, -1).applyQuaternion(r.getWorldQuaternion(new THREE.Quaternion()));
        spots.push({ p: p.toArray(), d: d.toArray(), cosO: 0, cosI: 0, rgb: rgb(r.color, r.intensity * r.width * r.height), area: true });
      }
    });
    // 창 — 유리를 평면(얇은 축 · 15cm)으로 묶어 상자 하나씩. 바깥면 2cm 밖에서 빛이 들어온다(창틀이 가린다)
    const sp = this.roomSpan(), mid = new THREE.Vector3((sp.x0 + sp.x1) / 2, 1.2, sp.D / 2);
    const groups = new Map<string, THREE.Box3>();
    this.room.traverse(o => {
      if (o.name !== 'window-glass' || !(o as THREE.Mesh).isMesh) return;
      for (let pp: THREE.Object3D | null = o; pp; pp = pp.parent) if (!pp.visible) return;
      const b = new THREE.Box3().setFromObject(o), s = b.getSize(V());
      const ax = s.x < s.y && s.x < s.z ? 0 : s.y < s.z ? 1 : 2, c = b.getCenter(V());
      const k = `${ax}|${Math.round(c.getComponent(ax) / 0.15)}`;
      const g = groups.get(k); if (g) g.union(b); else groups.set(k, b);
    });
    const wins: LightIn['wins'] = [];
    const wl = this.windowLight;
    for (const [k, b] of groups) {
      const ax = +k.split('|')[0], c = b.getCenter(V()), s = b.getSize(V());
      const n = V(); n.setComponent(ax, Math.sign(mid.getComponent(ax) - c.getComponent(ax)) || 1);   // 방 안쪽
      c.setComponent(ax, (n.getComponent(ax) > 0 ? b.min : b.max).getComponent(ax) - n.getComponent(ax) * 0.02);
      const ua = (ax + 1) % 3, va = (ax + 2) % 3, u = V(), v = V();
      u.setComponent(ua, s.getComponent(ua) / 2); v.setComponent(va, s.getComponent(va) / 2);
      wins.push({ c: c.toArray(), u: u.toArray(), v: v.toArray(), n: n.toArray(), rgb: rgb(wl.color, wl.intensity) });
    }
    this.lmLamp = this.roomCfg.lamp;
    return { sunDir: sunDir.toArray(), sunRgb: rgb(this.sun.color, this.sun.intensity), spots, wins };
  }
  /** 공간 라이트맵을 재질에 — 공간 재질마다 라이트맵을 단 사본(원래 재질은 그대로: 실사·굽기·서펠·바닥재 바꾸기가 원본을 쓴다).
   *  WebGPU 는 실시간 창 면광원(그림자 없는 가짜 하늘빛)을 뺀 조명만 받게 한다 — 창 하늘빛은 라이트맵이 그림자까지 담았다.
   *  환경광도 줄인다 — 실내 환경맵은 가림 없이 고르게 비춰 공간감을 지운다(반사는 조금 남긴다). tex = null 이면 되돌린다 */
  private lmMats = new Map<THREE.Material, THREE.MeshStandardMaterial>();
  /** 라이트맵을 구울 때의 조명 밝기 — 밝기만 바꾸면 그 비율로 바로 다시 섞는다 */
  private lmLamp = 1;
  private static readonly LM_KEYS = ['color', 'map', 'roughness', 'roughnessMap', 'metalness', 'metalnessMap', 'normalMap', 'normalScale', 'bumpMap', 'bumpScale', 'emissive', 'emissiveMap',
    'emissiveIntensity', 'side', 'shadowSide', 'clearcoat', 'clearcoatRoughness', 'polygonOffset', 'polygonOffsetFactor', 'polygonOffsetUnits'] as const;
  private shellLightmap(meshes: THREE.Mesh[], tex: THREE.Texture | null) {
    // 사본 → 원본 — 메시 표시(userData)로 찾지 않는다: 방을 다시 합칠(batch) 때 사본을 단 메시가 새 메시로 바뀌어 표시가 사라졌다(실측 오류)
    const origOf = new Map<THREE.Material, THREE.MeshStandardMaterial>();
    this.lmMats.forEach((c, o) => origOf.set(c, o as THREE.MeshStandardMaterial));
    if (!tex) {
      for (const m of meshes) { const o = origOf.get(m.material as THREE.Material); if (o) m.material = o; }
      this.dirty = true; this.envDirty = true;
      return;
    }
    let ls: ReturnType<typeof lights> | null = null;
    if (this.raster.kind === 'webgpu') {
      // 창 면광원·다운라이트·메인 조명은 뺀다 — 라이트맵에 그림자째 구웠다
      const arr: THREE.Light[] = [this.sun];
      this.lamps.traverse(o => { const l = o as THREE.SpotLight; if (l.isLight && !(l.isSpotLight && (!l.castShadow || l.userData.main))) arr.push(l); });
      ls = lights(arr);
    }
    for (const m of meshes) {
      const cur = m.material as THREE.MeshStandardMaterial;
      const orig = origOf.get(cur) ?? cur;
      let c = this.lmMats.get(orig);
      if (!c) {
        c = (ls ? new MeshPhysicalNodeMaterial() : new THREE.MeshPhysicalMaterial()) as unknown as THREE.MeshStandardMaterial;
        c.name = orig.name; this.lmMats.set(orig, c);
      }
      for (const k of Stage.LM_KEYS) if ((orig as any)[k] !== undefined) (c as any)[k] = (orig as any)[k];
      if (ls) (c as unknown as MeshPhysicalNodeMaterial).lightsNode = ls;
      c.envMapIntensity = (orig.envMapIntensity ?? 1) * 0.25;
      // 라이트맵 텍스처만 바뀐 것은 재질을 다시 짓지 않는다(셰이더 다시 컴파일 = 멈칫) — 처음 달 때만
      const fresh = !c.lightMap;
      c.lightMap = tex; c.lightMapIntensity = this.raster.post.spaceLMStr ?? 1;
      if (fresh) c.needsUpdate = true;
      m.material = c;
    }
    this.dirty = true; this.envDirty = true;
  }
  /** 바닥재·벽지·몰딩 색을 바꾸면 라이트맵 사본에도 바로(다시 굽기를 기다리지 않게) */
  private syncShellLM() {
    for (const [orig, c] of this.lmMats) {
      for (const k of Stage.LM_KEYS) if ((orig as any)[k] !== undefined) (c as any)[k] = (orig as any)[k];
      c.needsUpdate = true;
    }
  }
  /** 공간 라이트맵 다시 굽기 — 0.6초 모아서(끌기·연속 변경 중엔 미룬다). 실시간 화면에서만 */
  private aoTimer = 0;
  /** 라이트맵 뒤로 미룬 환경맵 찍기를 푼다 */
  private releaseEnvWait() { if (!this.envWaitBake) return; clearTimeout(this.envWaitBake); this.envWaitBake = 0; this.envDirty = true; this.dirty = true; }
  scheduleSpaceAO() {
    clearTimeout(this.aoTimer);
    const p = this.raster.post;
    if (this.mode !== 'raster' || (!p.spaceAO && !p.prodAO)) { this.releaseEnvWait(); return; }
    if (this.furnishing) return;          // 가구·소품을 받는 중 — 다 끼운 뒤 buildRoom 이 다시 부른다(빈 방을 미리 굽지 않게)
    // 방을 아직 한 번도 안 지었다 — 처음 열 때 공간 구조·설정을 넣는 sceneChanged 가 빈 장면을 굽기 시작해(처음 열기 기록 9.3초 「라이트맵 굽기 시작」이
    // 「공간 짓기 시작」보다 먼저, 실측 2026-11-12) 방 짓기와 CPU 를 나눠 썼다
    if (!this.roomParts) return;
    this.aoTimer = window.setTimeout(async () => {
      // 상품 먼저(굽지 않고 모델 그늘을 다는 것뿐이라 바로) — 이미 단 것은 그대로, 새로 생긴 가구에만(tools/bake_hv_ao.py)
      // 공간은 그다음 다시 굽는다 — 가구가 옮겨지면 공간 라이트맵만 새로
      const extra = this.wardrobe && !this.wardHidden ? [this.wardrobe.root] : [];
      try {
        if (this.raster.post.prodAO && this.mode === 'raster') {
          const r = applyProdAO(this.room, this.raster.post.prodAOStr ?? 0.6);
          if (r.added) { console.info('[상품 라이트맵] 구운 그늘', `${r.hit}/${r.total} (새로 ${r.added})`); this.dirty = true; }
        }
        if (this.raster.post.spaceAO) {
          // 가림에서 빼는 소품 — 받는 면은 벽·바닥·천장뿐이라 가구 위·벽에 걸린 소품과 낮은 소품(러그·작은 물건)은 그늘을 거의 안 만들고 삼각형만 많다.
          // 바닥에 선 키 큰 소품(화분·스탠드)은 둔다. 실측 2026-11-12 40mm 6.1 → 4.5초(삼각형 28만 → 16만)
          this.room.traverse(o => {
            if (o.name !== 'room-deco') return;
            const b = new THREE.Box3().setFromObject(o);
            o.userData.noOcc = !b.isEmpty() && (b.min.y > 0.05 || b.max.y - b.min.y < 0.3);
          });
          // 성긴 판을 먼저 굽는 단계는 뺐다 — SAH BVH 로 광선이 3배 빨라져 짓기(1.2초)가 대부분이라 두 번 굽는 이득이 없고 화면만 두 번 바뀌었다
          // 처음 열기·재구성 중이 아니면 굽기만 따로 한 건(빛·설정을 바꿔 다시 굽기)
          if (!loadOpen()) loadBegin('라이트맵 다시 굽기', '빛·설정·가구 변경', false);
          loadMark('라이트맵 굽기 시작'); loadDoing('라이트맵 굽기');
          const info = await bakeSpaceAO(this.room, extra, this.lightIn(), this.insideBox(), (ms, tex) => this.shellLightmap(ms, tex), ms => this.shellLightmap(ms, null), this.quality.bake);
          if (info) { console.info('[공간 라이트맵]', info); this.dirty = true; this.envDirty = true; loadBake(info); loadMark('라이트맵 끝'); loadDoing('보기'); loadEnd('라이트맵 끝'); }
        } else loadEnd('상품 그늘만(공간 라이트맵 끔)');
      } catch (e) { console.warn('[라이트맵] 실패', e); loadEnd(`라이트맵 실패: ${e}`); }
      finally { this.releaseEnvWait(); if (this.gateWait) { clearTimeout(this.gateWait); this.gateWait = 0; roomFurnished(); } }
    }, 600);
  }
  /** 장면이 바뀌었다 — 공간 라이트맵 다시 굽기 + 굽기·서펠 엔진에 다시 넘기기.
   *  lightmap = false: 장 도어 열고 닫기·탭 바꾸기 — 방 빛에 영향이 거의 없어 공간 라이트맵은 다시 굽지 않는다(사용자 지적 2026-11-04 「문열림 때문에 라이트맵이 다시 구워지는 건가?」) */
  sceneChanged(o: { lightmap?: boolean } = {}) {
    if (o.lightmap !== false) this.scheduleSpaceAO();
    if (this.mode !== 'bake' && this.mode !== 'surfel') return;
    clearTimeout(this.resendTimer);
    this.resendTimer = window.setTimeout(() => { if (this.mode === 'bake' || this.mode === 'surfel') void this.showEmbed(this.mode); }, 400);
  }
  private async showEmbed(kind: EmbedKind) {
    const key = this.embedKey(kind);
    this.embedCache.forEach((h, k) => h.setActive(k === key));
    const hit = this.embedCache.get(key);
    if (hit) {
      this.embedCache.delete(key); this.embedCache.set(key, hit);   // 최근 쓴 것으로
      hit.setLight(this.lightPayload());                          // 저장해 둔 사이 바뀐 조명 (같으면 엔진이 무시)
      this.onStatus?.(hit.status || '저장해 둔 결과');
      return;
    }
    if (!this.wardrobe || this.embedPending.has(key)) return;
    this.embedPending.add(key);
    try {
      const h = await startEmbed(kind, this.host, [this.room, this.wardrobe.root], this.camera, this.controls.target,
        this.lightPayload(), t => this.onStatus?.(t));
      this.embedCache.set(key, h);
      h.setLight(this.lightPayload());                            // 내보내는 사이 바뀐 조명
      h.setActive(this.mode === kind && this.embedKey(kind) === key);
      while (this.embedCache.size > Stage.EMBED_KEEP) {
        const [old, oh] = this.embedCache.entries().next().value!;
        oh.dispose(); this.embedCache.delete(old);
      }
    } finally {
      this.embedPending.delete(key);
    }
  }

  /** ① MuTracer 셰이더 컴파일(약 12초)을 미리 — 실사를 누를 때 기다리지 않게 */
  prewarm() {
    if (!this.wardrobe) return;
    this.scene.updateMatrixWorld(true);
    void loadMt().then(m => m.prewarmMutracer(this.host, this.scene, this.camera, this.controls, () => this.pathTraceState()));
    // ⑤ 도 — 첫 켜기에 9초쯤(셰이더 4.5 · OIDN 신경망 3.9 · 보조 버퍼 0.9) 걸리던 것을 미리. MuTracer 컴파일과 겹치지 않게 조금 뒤에
    if (this.raster.kind === 'webgpu') window.setTimeout(() => void loadGpt().then(g => {
      if (this.mode !== 'raster') return;
      const restore = this.pathTraceState();
      try { return g.prewarmGpuPt(this.raster.renderer as WebGPURenderer, this.scene, this.camera, () => { this.dirty = true; }); }
      finally { restore(); }
    }).catch(e => console.warn('[⑤ 경로 추적] 미리 준비', e)), 6000);
  }

  /** 실사 모드와 같은 장면 상태(하늘 환경광·창 사각 조명 끔·보조선 숨김)를 잠시 입히고 되돌리는 함수를 준다.
   *  미리 준비가 실시간 상태(실내 환경맵·창 조명)로 컴파일하면 실사를 켤 때 셰이더를 다시 만들어 2.9초 멈췄다(실측) */
  private pathTraceState() {
    const env = this.scene.environment, ei = this.scene.environmentIntensity, wl = this.windowLight.visible, ov = this.overlay.visible;
    if (this.sky) { this.scene.environment = this.sky; this.scene.environmentIntensity = this.ptEnvIntensity(); }
    this.windowLight.visible = false;
    this.overlay.visible = false;
    this.noWindowLight(false);
    return () => {
      this.scene.environment = env; this.scene.environmentIntensity = ei; this.windowLight.visible = wl; this.overlay.visible = ov;
      this.noWindowLight(this.mode === 'raster');
    };
  }

  /** 거울 평면 반사 재질 — 거울 메시마다 반사 노드 하나. 반사면 기준점은 거울 메시의 자식이라 도어를 열면 같이 움직인다.
   *  앞 방향 = 거울의 가장 얇은 축 중 문짝 몸통 반대쪽(거울은 문짝 앞면에 붙어 있다) */
  private glossFlatOf = new WeakMap<THREE.Material, THREE.Material>();
  /** 하이글로시 칠 — 반사 끔일 때. 원래 색 그대로(금속 0), 광택은 환경맵 정도로만 */
  private glossFlat(orig: THREE.Material) {
    let m = this.glossFlatOf.get(orig);
    if (!m) { const c = (orig as THREE.MeshStandardMaterial).clone(); c.metalness = 0; c.metalnessMap = null; c.roughness = Math.max(c.roughness, 0.08); this.glossFlatOf.set(orig, c); m = c; }
    return m;
  }
  private mirrorMat(m: THREE.Mesh, scale: number, gloss?: { orig: THREE.Material; keys: readonly string[]; ls: ReturnType<typeof lights> | null }): THREE.Material {
    const u = m.userData;
    if (u.refl && u.reflScale === scale && !!u.reflGloss === !!gloss) { if (gloss?.ls) (u.refl.mat as MeshPhysicalNodeMaterial).lightsNode = gloss.ls; return u.refl.mat; }
    u.reflGloss = !!gloss;
    if (u.refl) this.dropMirror(m);
    m.geometry.computeBoundingBox();
    const bb = m.geometry.boundingBox!, sz = bb.getSize(new THREE.Vector3()), c = bb.getCenter(new THREE.Vector3());
    const ax = sz.x <= sz.y && sz.x <= sz.z ? 'x' : sz.y <= sz.z ? 'y' : 'z';
    // 앞 방향 — 장을 만들 때 도어는 닫혀 있다(setWardrobe 가 setDoorOpen 보다 먼저) → 방 쪽(세상 +z)을 보는 면.
    // 문짝 몸통 반대쪽으로 정했을 땐 거울이 문짝 자체라 판정이 뒤집혀 반사가 까맣게 나왔다(실측)
    m.updateWorldMatrix(true, false);
    const wn = new THREE.Vector3().setComponent('xyz'.indexOf(ax), 1).transformDirection(m.matrixWorld);
    // 방 가운데를 보는 쪽이 앞 — 장 거울(+z)만 생각해 wn.z 로 정했더니 옆 벽 거울(화장대 원형 거울)은 z 성분이 0 이라 앞뒤가 운에 맡겨졌다
    const toRoom = new THREE.Vector3((this.rx0 + this.rx1) / 2, 1.2, ROOM_D / 2).sub(c.clone().applyMatrix4(m.matrixWorld));
    // 비추는 쪽을 모델이 정해 둔 거울(거울 EP — 드러난 옆면, model.ts)은 그 방향. 왼쪽 EP 는 방 가운데보다 왼쪽에서 바깥(-x)을 봐 판정이 뒤집혔다(까맣게, 2026-11-06)
    const forced = m.userData.mirrorN as number[] | undefined;
    const sign = forced ? (Math.sign(forced['xyz'.indexOf(ax)]) || 1) : wn.dot(toRoom) >= 0 ? 1 : -1;
    const n = new THREE.Vector3().setComponent('xyz'.indexOf(ax), sign);
    const target = new THREE.Object3D(); target.name = 'mirror-plane';
    target.position.copy(c).addScaledVector(n, sz[ax] / 2 + 0.0005);
    target.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    m.add(target);
    // bounces 기본(true) = 렌더할 때마다 갱신. false(프레임에 한 번)는 그 프레임 첫 렌더 — 그림자 지도 — 시점으로 그려져 까맣게 나왔다(실측)
    const r = reflector({ resolutionScale: scale, target });
    const base = (r as any).reflector;
    // 반사 카메라는 화면 카메라 복제(레이어 포함) — 편집 표시(레이어 1: 치수선·선택·방문 열림 자리)는 반사에서 뺀다
    base?.getVirtualCamera?.(this.camera)?.layers.disable(1);
    if (base) this.gateReflector(base, target, scale);
    let mat: MeshBasicNodeMaterial | MeshPhysicalNodeMaterial;
    if (gloss) {
      // 하이글로시 도어 — 거울과 같은 평면 반사(같은 해상도·같은 크기로 비친다, 사용자 지시 2026-11-03).
      // 바탕은 원래 칠 색 그대로, 반사는 유광 칠(유전체)처럼 위에 얹기만 한다(사용자 지시 2026-11-05 「원래재질이 정확하게 표시되고 반사만」).
      // 예전엔 원본 금속 0.2 를 흉내 내 칠을 0.8배로 깎고 반사를 정면에서도 23% 더해, 흰 도어가 방 그림에 덮여 회색으로 보였다.
      // 정면 6% → 비스듬할수록 진하게(프레넬). 반사만큼 칠을 덜어 밝기가 넘치지 않게. 큐브 반사는 끈다(거칠기 1 — 두 번 비치지 않게)
      const n = new MeshPhysicalNodeMaterial();
      for (const k of gloss.keys) if ((gloss.orig as any)[k] !== undefined) (n as any)[k] = (gloss.orig as any)[k];
      n.roughness = 1; n.metalness = 0; n.clearcoat = 0; n.metalnessMap = null; n.roughnessMap = null;
      const cos = normalView.dot(positionViewDirection).abs().clamp(0, 1);
      const fr = float(1).sub(cos).pow(5).mul(0.94).add(0.06);
      n.colorNode = materialColor.mul(float(1).sub(fr));
      n.emissiveNode = r.rgb.mul(fr);
      if (gloss.ls) n.lightsNode = gloss.ls;
      mat = n;
    } else {
      mat = new MeshBasicNodeMaterial();
      mat.colorNode = r.rgb.mul(0.92);                  // 거울 반사율 ~92%
    }
    mat.name = gloss ? 'gloss-reflector' : 'mirror-reflector';
    this.mirrorMats.add(mat);
    u.refl = { target, mat, node: r }; u.reflScale = scale;
    return mat;
  }

  /** 창 유리 평면 반사 — 환경맵(방 가운데서 찍은 흐린 큐브)만으론 유리 반사율(정면 4%)이 너무 약해 유리가 없는 것처럼 보였다
   *  (사용자 지적 2026-10-30 「아직도 반사가 안 돼」). 유리 면 기준으로 방을 한 번 더 그려 비추고, 정면은 옅게(16%)
   *  비스듬할수록 진하게(~65%) 섞어 바깥 풍경과 방 반사가 같이 보이게. 창 두 짝(4cm 차이)은 반사 한 장을 같이 쓴다 */
  private glassRefl: { mat: THREE.Material; scale: number; node: { dispose(): void } } | null = null;
  private glassMat(m: THREE.Mesh, scale: number): THREE.Material {
    if (this.glassRefl && this.glassRefl.scale === scale) return this.glassRefl.mat;
    if (this.glassRefl) { this.mirrorMats.delete(this.glassRefl.mat); this.glassRefl.mat.dispose(); this.glassRefl.node.dispose(); }
    // 반사면 = 유리의 방 쪽 면(창 벽 x = rx1 쪽에서 방 안 -x 를 본다). 창 묶음(winG)의 자식 — 끌기 미리보기에도 따라간다
    m.updateWorldMatrix(true, false);
    this.winG.updateWorldMatrix(true, false);
    // 유리 상자를 창 묶음 좌표(L — 창 벽이 +x)로 — 창이 왼쪽·맞은편 벽이어도 같은 식
    const toG = this.winG.matrixWorld.clone().invert().multiply(m.matrixWorld);
    m.geometry.computeBoundingBox();
    const bb = m.geometry.boundingBox!.clone().applyMatrix4(toG), c = bb.getCenter(new THREE.Vector3());
    const target = new THREE.Object3D(); target.name = 'glass-plane';
    target.position.set(bb.min.x - 0.0005, c.y, c.z);
    target.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(-1, 0, 0));
    this.winG.add(target);
    const r = reflector({ resolutionScale: scale, target });
    const base = (r as any).reflector;
    base?.getVirtualCamera?.(this.camera)?.layers.disable(1);
    if (base) this.gateReflector(base, target, scale);
    const mat = new MeshBasicNodeMaterial();
    mat.colorNode = r.rgb;
    const facing = normalView.dot(positionViewDirection).abs().clamp(0, 1);
    // 방이 너무 비친다(사용자 지적 2026-11-04) — 반사 세기 절반: 정면 8% ~ 비스듬히 33%
    mat.opacityNode = float(1).sub(facing).pow(2).mul(0.25).add(0.08);
    mat.transparent = true; mat.depthWrite = false; mat.name = 'glass-reflector';
    this.mirrorMats.add(mat);                   // 다른 반사를 그릴 땐 숨긴다(읽기·쓰기 충돌 방지)
    this.glassRefl = { mat, scale, node: r };
    return mat;
  }

  /** 거울 반사를 언제 그릴지 — 너무 느렸다(사용자 지적 2026-10-30). three 기본은 「렌더할 때마다」라
   *  그림자 지도·환경맵·다른 거울을 그릴 때마다 장면을 다시 그렸고(거울 속 거울로 거울 수만큼 겹겹이), 그때마다 그림자도 새로 계산했다.
   *  - 화면 카메라로 그릴 때만, 프레임에 한 번
   *  - 같은 면(닫힌 거울 도어들)은 처음 그린 것을 같이 쓴다 — 반사 텍스처는 화면 좌표라 같은 면이면 그대로 맞는다
   *  - 같은 면 판정은 2cm — 몸통마다 도어 면이 몇 mm~1cm 달라 6짝이 3장으로 나뉘었다(실측). 1cm 차이는 반사에서 보이지 않는다
   *  - 반사를 그릴 땐 그림자를 다시 계산하지 않는다(그림자는 장면이 바뀐 프레임에만 — syncShadows)
   *  - 움직이는 동안은 절반 해상도, 멈추면 한 번만 제 해상도로 그리고 그 뒤 노이즈 걷는 프레임들에선 그리지 않는다 */
  private refl = { frame: 0, mode: 'low' as 'low' | 'full' | 'skip', done: [] as { n: THREE.Vector3; c: number; tex: THREE.Texture }[] };
  private reflSharp = false;
  private mirrorMats = new Set<THREE.Material>();
  private gateReflector(base: any, target: THREE.Object3D, scale: number) {
    const orig = base.updateBefore.bind(base);
    const n = new THREE.Vector3(), p = new THREE.Vector3(), q = new THREE.Quaternion();
    let last = -1;
    base.updateBefore = (frame: { camera: THREE.Camera }) => {
      const st = this.refl;
      if (frame.camera !== this.camera || st.mode === 'skip' || last === st.frame) return;
      last = st.frame;
      target.matrixWorld.decompose(p, q, n);
      n.set(0, 0, 1).applyQuaternion(q);
      const c = n.dot(p);
      const same = st.done.find(d => d.n.dot(n) > 0.9999 && Math.abs(d.c - c) < 0.02);
      if (same) { base.textureNode.value = same.tex; return; }
      base.resolutionScale = st.mode === 'low' ? Math.max(0.2, scale * 0.5) : scale;
      // 반사를 그리는 동안 거울은 전부 숨긴다 — 같은 면 거울이 지금 그리는 텍스처를 쓰고 있으면 읽기·쓰기 충돌(WebGPU 오류, 실측)
      const mats = [...this.mirrorMats];
      for (const m of mats) m.visible = false;
      try { orig(frame); } finally { for (const m of mats) m.visible = true; }
      st.done.push({ n: n.clone(), c, tex: base.textureNode.value });
    };
  }

  /** 창 하늘빛(면광원)을 받지 않을 재질 — 커튼 · 거울. 실시간(WebGPU)에선 그 빛을 뺀 노드 재질로 바꾸고, 실사·굽기·서펠에선 원래 재질.
   *  - 커튼: 창 밖에 아래로 기울여 둔 그림자 없는 면광원이라 벽에 바짝 붙은 커튼은 그 평면 아래쪽만 빛을 받아 밝기 경계가 졌다(실측)
   *  - 거울: 면광원의 정반사가 밝은 사각형으로 비쳤다(사용자 지적 2026-10-29) — 거울엔 창 너머 하늘(환경맵)만 비친다
   *  실사·굽기·서펠은 이 가짜 창 빛을 쓰지 않고, 노드 재질을 읽지 못한다 */
  private nodeOf = new Map<THREE.Material, MeshPhysicalNodeMaterial>();
  private noWindowLight(raster: boolean) {
    const node = raster && this.raster.kind === 'webgpu';
    const targets: THREE.Mesh[] = [];
    let inWard = false;                    // 하이글로시 평면 반사는 장 도어만(방 소품마다 반사 렌더가 늘지 않게)
    const pick = (o: THREE.Object3D) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const orig = (m.userData.origMat ?? m.material) as THREE.MeshStandardMaterial;
      if (Array.isArray(orig)) return;
      const mirror = orig.name?.includes('거울') || ((orig.metalness ?? 0) >= 0.95 && (orig.roughness ?? 1) <= 0.05);
      const glass = o.name === 'window-glass';
      // 하이글로시 도어 칠(거칠기 0 · 금속 아님) — 거울처럼 평면 반사
      const gloss = inWard && !mirror && !glass && o.name !== 'curtain' && (orig.roughness ?? 1) <= 0.05 && (orig.metalness ?? 0) < 0.95 && !orig.transparent;
      if (o.name === 'curtain' || mirror || glass || gloss) { m.userData.origMat = orig; m.userData.isMirror = mirror; m.userData.isGlass = glass; m.userData.isGloss = gloss; targets.push(m); }
    };
    this.room.traverse(pick);
    inWard = true; this.wardrobe?.root.traverse(pick);
    if (!targets.length) return;
    let ls: ReturnType<typeof lights> | null = null;
    if (node) {
      const arr: THREE.Light[] = [this.sun];
      this.lamps.traverse(o => { if ((o as THREE.Light).isLight) arr.push(o as THREE.Light); });
      ls = lights(arr);
    }
    const KEYS = ['color', 'map', 'roughness', 'roughnessMap', 'metalness', 'metalnessMap', 'normalMap', 'normalScale', 'aoMap', 'emissive', 'emissiveMap',
      'emissiveIntensity', 'envMapIntensity', 'opacity', 'transparent', 'side', 'shadowSide', 'sheen', 'sheenColor', 'sheenRoughness', 'clearcoat', 'clearcoatRoughness', 'alphaTest', 'specularIntensity'] as const;
    const refl = this.raster.post.reflect, scale = { off: 0, low: 0.35, mid: 0.6, high: 1 }[refl] ?? 0.6;
    for (const m of targets) {
      const orig = m.userData.origMat as THREE.MeshPhysicalMaterial;
      if (!node) { m.material = orig; continue; }
      // 거울 — 평면 반사(후처리 「반사」). 끔이면 아래 환경맵 재질
      if (m.userData.isMirror && scale > 0) { m.material = this.mirrorMat(m, scale); continue; }
      // 하이글로시 — 거울과 같은 평면 반사(반사 끔이면 원래 재질 그대로)
      // 반사 끔 — 원래 칠 색 그대로(금속 0). 원본의 금속 0.2 는 흰 칠을 회색으로 만들었다
      if (m.userData.isGloss) { m.material = scale > 0 ? this.mirrorMat(m, scale, { orig, keys: KEYS, ls }) : this.glossFlat(orig); continue; }
      // 창 유리 — 평면 반사(거울과 같은 「반사」 품질). 끔이면 아래 프레넬 재질
      if (m.userData.isGlass && scale > 0) { m.material = this.glassMat(m, scale); continue; }
      let n = this.nodeOf.get(orig);
      if (!n) {
        n = new MeshPhysicalNodeMaterial();
        for (const k of KEYS) if ((orig as any)[k] !== undefined) (n as any)[k] = (orig as any)[k];
        n.name = orig.name;
        if (orig.transparent) n.depthWrite = orig.depthWrite;
        if (m.userData.isGlass) {
          // 창 유리 — 투명도 12% 판이라 반사가 거의 없어 유리가 없는 것처럼 보였다(사용자 지적 2026-10-30).
          // 프레넬: 정면은 거의 투명(12%), 비스듬할수록 방이 비친다(최대 ~80%). 실사는 원래 재질(그림자 광선이 투명도를 쓴다)
          const facing = normalView.dot(positionViewDirection).abs().clamp(0, 1);
          // 반사 세기 절반(사용자 지적 2026-11-04) — 6% ~ 40%
          n.opacityNode = float(1).sub(facing).pow(3).mul(0.34).add(0.06);
          n.color.set('#e4eeec'); n.roughness = 0.02; n.metalness = 0; n.envMapIntensity = 0.7;
          n.transparent = true; n.depthWrite = false;
        }
        this.nodeOf.set(orig, n);
      }
      n.lightsNode = ls!; n.needsUpdate = true;
      m.material = n;
    }
  }

  // ---- 렌더 모드: 실시간 / ① MuTracer / ② 라이트맵 굽기 / ③ 서펠 GI
  private modeReq = 0;
  async setMode(mode: RenderMode) {
    // 늦게 끝난 앞 요청이 뒤 요청을 덮지 않게 — MuTracer 를 받는 동안 「실시간」을 누르면, 받은 뒤 MuTracer 로 바뀌어
    // 메뉴는 실시간인데 경로 추적이 계속 돌았다(부엌 플래너에서 실측)
    const req = ++this.modeReq;
    if (mode === this.mode) return;
    // 실사 모듈 — 보통은 한가할 때 미리 받아 둬서 바로 끝난다(이미 끝난 약속을 기다리는 건 같은 작업 안이라 아래 덮개 복사도 그대로 된다)
    const m = mode === 'mutracer' ? await loadMt() : mt;
    if (mode === 'gpupt') { if (this.raster.kind !== 'webgpu') return; await loadGpt(); }
    if (req !== this.modeReq || mode === this.mode) return;
    // WebGPU 캔버스는 화면에 내보낸 뒤 복사하면 비어 있다(실측 평균 0) — 실사 덮개로 쓸 실시간 화면을 장면 상태를 바꾸기 전에 다시 그린다
    if (mode === 'mutracer' && this.mode === 'raster' && this.raster.kind === 'webgpu' && this.raster.ready) this.raster.render();
    mt?.hideMutracer();
    if (this.mode === 'gpupt' && this.raster.kind === 'webgpu') gpt?.hideGpuPt(this.raster.renderer as WebGPURenderer);
    this.embedCache.forEach(h => h.setActive(false));
    this.mode = mode;
    const raster = mode === 'raster';
    this.noWindowLight(raster);
    this.overlay.visible = raster;
    this.labels.domElement.style.display = raster ? '' : 'none';
    // three 캔버스는 투명하게 두고 마우스는 그대로 받는다(궤도 회전) — MuTracer 가 밑의 캔버스에 그린다
    this.renderer.domElement.style.opacity = mode === 'mutracer' ? '0' : '';
    // 경로 추적은 손을 떼면 바로 멈춘다 — 감속(damping)이 0.01mm 단위로 3~4초 더 움직여 그동안 샘플링을 시작하지 못했다(실측)
    this.controls.enableDamping = !isPath(mode) && (this.raster.post.camDamping ?? true);
    // 구운 장 그늘(aoMap)은 실시간에서만 — 경로 추적은 그늘을 직접 계산하므로 두 번 어두워진다(사용자 지시 2026-11-03 「MuTracer 에서는 라이트맵이 꺼져야」)
    setBakedAO(raster && this.raster.post.bakedAO);
    setContactVisible(this.room, raster && this.raster.post.contact !== false);   // 가구 밑 그림자도 실시간에서만
    if (raster) this.scheduleSpaceAO(); else { clearSpaceAO(); clearProdAO(); }   // 공간·상품 라이트맵도 — 경로 추적은 그늘을 직접 계산한다
    // 환경광 — 실시간은 방 안에서 찍은 실내 환경맵, 경로 추적은 하늘 HDR(실내 반사광은 경로 추적이 직접 계산한다)
    this.skyLevel();
    if (isPath(mode) && this.sky) { this.scene.environment = this.sky; this.skyLevel(); }
    else if (this.envRT) { this.scene.environment = this.envRT.texture; this.scene.environmentIntensity = this.roomCfg.env * RASTER_ENV; }
    if (mode === 'mutracer') {
      this.scene.updateMatrixWorld(true);
      // 직전 실시간 화면을 덮개로 넘긴다 — WebGL 은 preserveDrawingBuffer 라 그대로, WebGPU 는 맨 위에서 다시 그려 둔 것(같은 작업 안이라 읽힌다)
      m!.showMutracer(this.host, this.scene, this.camera, this.controls, t => this.onStatus?.(t), this.renderer.domElement);
    } else if (mode === 'gpupt') {
      this.scene.updateMatrixWorld(true);
      gpt!.showGpuPt(this.raster.renderer as WebGPURenderer, this.scene, this.camera, this.roomCfg.exposure);
    } else if (mode === 'bake' || mode === 'surfel') {
      await this.showEmbed(mode);
    }
    if (mode === 'gpupt') this._dirty = true;      // 방금 장면을 넘겼다 — 다시 짓지 않게(dirty 설정자는 다시 짓기를 건다)
    else this.dirty = true;
  }

  /** 화면 성능 단계 — 화소 배율 · 화면 효과(덮어쓰기) · 거울 반사 방식 */
  quality: QualityProfile;
  /** 밝기 0 채움 조명 — 높음·보통은 켜 둔다(조명 개수가 늘 같아야 칸 수가 바뀌어도 셰이더를 다시 짓지 않는다).
   *  노트북은 뺀다: 화소마다 조명 수만큼 계산해 방 전체 시점 GPU 시간이 약 30% 줄었다(채움 6개, 2026-11-11 실측).
   *  대신 칸 수·방 조명 수가 바뀔 때 셰이더를 한 번 다시 짓는다 */
  private applyFillers() {
    const on = !this.quality.lite;
    this.lamps.traverse(o => { if ((o as THREE.Light).isLight && o.userData.filler) o.visible = on; });
  }
  setQuality(q: QualityProfile) {
    const refl = this.raster.post.reflect, bakeChanged = JSON.stringify(q.bake) !== JSON.stringify(this.quality.bake);
    this.quality = q;
    this.applyFillers();
    this.raster.setQuality(q.caps, q.lite);
    if (this.raster.post.reflect !== refl) this.noWindowLight(this.mode === 'raster');
    if (bakeChanged) this.scheduleSpaceAO();   // 라이트맵 굽기 정밀도가 다른 단계 — 다시 굽는다
    this.resize();
    this.dirty = true;
  }
  /** 그린 프레임 수 · 간격 — 화면 성능 표시(FPS)용. 바뀐 게 없으면 그리지 않으므로 그동안은 0 */
  readonly perf = { frames: [] as number[] };

  resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    const dpr = effectiveDpr(w, h, this.quality);
    if (Math.abs(this.renderer.getPixelRatio() - dpr) > 1e-3) this.renderer.setPixelRatio(dpr);
    this.raster.setSize(w, h);
    this.labels.setSize(w, h);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.dirty = true;
  }
  /** view = 편집 표시(선택 테두리·치수선)만 바뀜 — 그림자는 다시 그리지 않는다 */
  markDirty(view = false) { if (view) this._dirty = true; else this.dirty = true; }

  private keepCameraInRoom() {
    const p = this.camera.position, t = this.controls.target, m = 0.15;
    const lo = [this.rx0 + m, 0.3, m], hi = [this.rx1 - m, ROOM_H - m, ROOM_D - m];
    const d = p.clone().sub(t), r = d.length();
    if (r < 1e-6) return;
    // 컨트롤이 거리를 바꾸지 않았으면(회전만) 원하던 거리를 유지, 바꿨으면(확대·시점 버튼) 그 거리가 새 기준
    if (Math.abs(r - this.camSetR) > 1e-5) this.camWantR = r;
    d.divideScalar(r);
    let tMax = this.camWantR;
    const tv = [t.x, t.y, t.z], dv = [d.x, d.y, d.z];
    for (let i = 0; i < 3; i++) {
      if (dv[i] > 1e-6) tMax = Math.min(tMax, (hi[i] - tv[i]) / dv[i]);
      else if (dv[i] < -1e-6) tMax = Math.min(tMax, (lo[i] - tv[i]) / dv[i]);
    }
    tMax = Math.max(this.controls.minDistance * 0.5, tMax);
    if (Math.abs(tMax - r) > 1e-5) { p.copy(t).addScaledVector(d, tMax); this._dirty = true; }
    this.camSetR = tMax;
  }

  private loop = () => {
    requestAnimationFrame(this.loop);
    this.controls.update();
    // 카메라는 방 안에만 — 벽을 뚫고 나가면 벽 뒷면이 안 그려져 하늘만 보인다
    // 축마다 잘라 넣으면 시선 각도가 바뀌어 궤도 컨트롤(감속)과 서로 밀어 카메라가 떨렸다 → 각도는 두고 대상까지 거리만 줄인다
    if (this.roomW) this.keepCameraInRoom();
    if (this.mode === 'gpupt') { gpt?.renderGpuPt(); return; }
    if (this.mode !== 'raster') return;
    // 조명·장면이 바뀌면 실내 환경맵을 다시 찍는다 (슬라이더를 끄는 동안은 0.1초에 한 번)
    if (!this.raster.ready) return;
    if (this.busyHold > 0) { this.busyHold--; return; }
    if (this.holdAt && performance.now() - this.holdAt < 3000) return;   // 가구 이동 재구성 중 — 옛 그림을 둔다(3초 넘으면 그냥 그린다)
    // 가구·소품을 받아 끼우는 동안은 찍지 않는다 — 찍을 때마다 새로 들어온 재질 셰이더를 큐브맵용으로 한꺼번에 지어 6초씩 멈췄다
    // (실측 2026-11-12, CPU 4배 느리게: 덮개 걷힌 뒤 10.5초에 6.3초 멈춤 · 그중 updateEnv 4.7초). 덮개를 걷기 전 공간만 찍는 첫 번은 둔다
    if (this.envDirty && (!this.furnishing || this.busyWaitEnv) && !this.envWaitBake && performance.now() - this.envAt > 100) this.updateEnv();
    // 바뀐 게 없어도 settleFrames 동안은 더 그린다 — SSGI·TRAA 가 프레임마다 쌓아야 노이즈가 걷힌다
    if (this._dirty) { this._dirty = false; this.settle = this.raster.settleFrames; this.refl.mode = 'low'; this.reflSharp = true; this.syncShadows(); }
    else if (this.settle > 0) { this.settle--; this.refl.mode = this.reflSharp ? 'full' : 'skip'; this.reflSharp = false; }
    else return;
    this.refl.frame++; this.refl.done.length = 0;
    this.overlay.traverse(o => o.layers.set(1));   // 편집 표시는 레이어 1 — 거울 반사에 안 비친다
    if (this.warmAll || this.warmOnce.length) {
      // 시야 밖 물체까지 그려 셰이더를 미리 짓는다 — 방을 둘러볼 때 처음 들어오는 가구마다 파이프라인을 그 자리에서 지어
      // 0.2~1초씩 멈췄다(실측 2026-11-03: 4초 돌기에 멈춤 10번 · 새 파이프라인 9개, 프레임 중간값 16.7ms 인데 p95 246ms).
      // 가구·소품은 끼울 때 하나씩(warmOnce), 다 놓인 뒤 한 번 더 전부(warmAll — 그때는 대부분 지어져 있어 짧다)
      const all = this.warmAll, roots = all ? [this.scene] : this.warmOnce.slice();
      this.warmAll = false; this.warmOnce.length = 0;
      const off: THREE.Object3D[] = [];
      for (const r of roots) r.traverse(o => { if (o.frustumCulled && ((o as THREE.Mesh).isMesh || (o as THREE.Points).isPoints)) { o.frustumCulled = false; off.push(o); } });
      const t = performance.now();
      try { this.raster.render(); } finally { off.forEach(o => (o.frustumCulled = true)); }
      loadStall(all ? '셰이더 미리 짓기(시야 밖 포함 전부)' : '끼운 모델 셰이더 짓기', performance.now() - t);
    } else { const t = performance.now(); this.raster.render(); loadStall('그리기(새 재질 셰이더 짓기)', performance.now() - t); }
    if (this.revealAfterDraw) { this.revealAfterDraw = false; const k = this.busySeq; requestAnimationFrame(() => { if (k === this.busySeq && this.isBusy) this.setBusy(false); }); }
    const pf = this.perf.frames, now = performance.now();
    pf.push(now); while (pf.length && now - pf[0] > 1000) pf.shift();
    this.labels.render(this.scene, this.camera);
    // 가구가 다 놓인 뒤 환경맵을 한 번 찍었으면 덮개를 걷는다 — 공간 라이트맵 굽기가 끝나며 환경맵을 다시 찍으라 해 덮개가 라이트맵까지 기다렸다
    // (처음 열 때 5초 넘게, 실측 2026-11-09). 라이트맵은 걷힌 뒤 이어 입혀진다
    if (this.busyWaitEnv && (this.envSinceBusy || !this.envDirty)) { this.busyWaitEnv = false; this.envSinceBusy = false; const k = this.busySeq; requestAnimationFrame(() => { if (k === this.busySeq) this.setBusy(false); }); }
  };
  private settle = 0;
  /** 다음 실시간 프레임에 시야 밖까지 그려 셰이더를 미리 짓는다 */
  private warmAll = false;
  /** 다음 프레임에 시야 밖이어도 그릴 것 — 방금 끼운 가구·소품 모델 */
  private warmOnce: THREE.Object3D[] = [];
  /** 다음 프레임을 그린 뒤 덮개를 걷는다 — 다시 지을 때 공간·장을 환경맵을 기다리지 않고 바로 보인다 */
  private revealAfterDraw = false;
  /** 라이트맵을 구운 뒤 환경맵을 찍는다 — 가구가 다 놓인 때와 라이트맵을 입힌 때 두 번 찍던 것을 한 번으로(찍을 때마다 1~3초 멈춤) */
  private envWaitBake = 0;
  /** 그림자 지도는 장면이 바뀐 프레임에만 새로 그린다 */
  private syncShadows() {
    const upd = this.shadowDirty; this.shadowDirty = false;
    this.scene.traverse(o => {
      const l = o as THREE.DirectionalLight;
      if (!l.isLight || !l.castShadow || !l.shadow) return;
      l.shadow.autoUpdate = false;
      if (upd && !l.userData.filler) l.shadow.needsUpdate = true;
      (l.shadow as THREE.LightShadow & { intensity: number }).intensity = this.shadowCfg.strength;
      l.shadow.radius = this.shadowCfg.soft;
    });
  }
}

/** 상자 UV 를 미터 단위 실제 좌표로 — 면 방향에 따라 바닥(x,z)·앞뒤 벽(x,y)·옆 벽(z,y). 벽 크기와 상관없이 무늬 크기가 같다 */
function worldUV(g: THREE.BufferGeometry, cx: number, cy: number, cz: number) {
  const p = g.getAttribute('position'), n = g.getAttribute('normal'), uv = g.getAttribute('uv');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) + cx, y = p.getY(i) + cy, z = p.getZ(i) + cz;
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i));
    if (ay > 0.5) uv.setXY(i, x, z);
    else if (ax > 0.5) uv.setXY(i, z, y);
    else uv.setXY(i, x, y);
  }
  uv.needsUpdate = true;
}
