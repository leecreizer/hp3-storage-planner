// 붙박이장 3D — 원본 셀프 플래너의 Unity 에셋 번들을 변환한 glTF(public/models, tools/convert_bundles.py)를 조립한다
// 단위 m, x=왼쪽 끝 0, y=바닥 0, z=뒤벽 0 → 앞 +. 몸통은 바닥 가운데가 원점, 도어는 경첩 쪽 모서리가 원점이다.
// 몸통 안의 기준점 노드(L1·R1 · 슬라이딩 IN_L1·IN_R1·OUT1)에 도어를 단다 — 원본 시뮬레이터와 같은 방식.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { fillSlot, loadWardAssets } from './props';
import { batchStatic } from './batch';
import { ACC_INFO, doorScarf, type SlotAcc } from './props';
import type { Content, Design, Planner } from './catalog';

const MM = 0.001;
const H = 2.4;                   // 설치 높이(상부 써라운딩 위 끝)
const BODY_Z = 0.3;              // 몸통 원점(깊이 600 의 가운데)

export type DoorKind = 'L' | 'R' | 'SLIDE' | 'DRAWER' | 'LIFT';
export type DoorPart = {
  obj: THREE.Object3D;           // 움직이는 노드
  slot: number;
  kind: DoorKind;
  base: THREE.Vector3;           // 닫힌 위치
  travel: number;                // 슬라이딩·서랍 이동 거리(m, 부호 = 방향)
  isDoor: boolean;               // 도어(몸통 탭에서 숨김) / 몸통 일부(서랍·리프트업)
};
export type Built = {
  root: THREE.Group;
  width: number;
  slots: { x0: number; x1: number; group: THREE.Group; hotspot: THREE.Vector3 }[];
  doors: DoorPart[];
  sides: number;
  frontZ: number;
  /** 소품이 든 칸이 모두 도어·서랍으로 가려지는가 — 그러면 문이 다 닫혔을 때 장 안 소품을 그리지 않는다(Stage.cullWardProps) */
  propsCovered: boolean;
};

// ---- glTF 불러오기 (번들마다 한 번, 놓을 때마다 복제 — 재질·텍스처는 공유)
const loader = new GLTFLoader();
const cache = new Map<string, Promise<THREE.Object3D>>();
// 번들마다 같은 이미지(tex/….jpg)를 따로 읽어 GPU 에 같은 텍스처가 여러 벌 올라갔다(몸통 1024 텍스처 6벌 ≈ 34MB, 2026-10-30 실측).
// 이미지 경로와 샘플링 값이 같으면 처음 읽은 텍스처 하나를 같이 쓴다
const texShared = new Map<string, THREE.Texture>();
const TEX_KEYS = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap', 'alphaMap', 'bumpMap'] as const;
function shareTextures(mt: THREE.Material) {
  for (const k of TEX_KEYS) {
    const t = (mt as any)[k] as THREE.Texture | null | undefined;
    if (!t?.name) continue;
    const key = `${t.name}|${t.channel}|${t.wrapS}${t.wrapT}|${t.repeat.x},${t.repeat.y}|${t.offset.x},${t.offset.y}|${t.rotation}|${t.flipY}|${t.colorSpace}`;
    const s = texShared.get(key);
    if (!s) texShared.set(key, t);
    else if (s !== t) { (mt as any)[k] = s; t.dispose(); }
  }
}
// ---- 구운 그늘(AO) — Blender 로 번들마다 구운 판({b}.ao.gltf = 원본 + 두 번째 UV + 그늘 이미지, 2026-11-02).
// 칸 안쪽·선반 밑·뒷판 구석의 그늘을 미리 구워 둬 SSGI·GTAO 가 화면에서 못 잡는 접촉 그늘을 채운다. 굽기 도구는 scratchpad bake_ao.py.
// 목록(models/ao.json)에 있는 번들만 구운 판을 받는다. 그늘은 간접광(환경광)에만 곱해지고 직접광(해·다운라이트)은 그대로다
const aoList: Promise<Set<string>> = fetch(`${import.meta.env.BASE_URL}models/ao.json`)
  .then(r => (r.ok ? r.json() : [])).then((a: string[]) => new Set(a)).catch(() => new Set<string>());
const aoMats = new Set<THREE.MeshStandardMaterial>();
let aoOn = true;
/** 구운 그늘 켜기/끄기 — 재질 값만 바꾼다(다시 불러오지 않는다) */
export function setBakedAO(on: boolean) {
  aoOn = on;
  aoMats.forEach(m => (m.aoMapIntensity = on ? 1 : 0));
}
function load(bundle: string): Promise<THREE.Object3D> {
  let p = cache.get(bundle);
  if (!p) {
    p = aoList.then(ao => loader.loadAsync(`${import.meta.env.BASE_URL}models/${bundle}${ao.has(bundle) ? '.ao' : ''}.gltf`)).then(g => {
      g.scene.traverse(o => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.castShadow = m.receiveShadow = true;
        for (const mt of [m.material].flat() as THREE.MeshStandardMaterial[]) {
          shareTextures(mt);
          if (mt.map) mt.map.anisotropy = 8;
          // 원본 URP Lit 그대로(광택 0 = 거칠기 1). 거울(금속 1·광택 1)만 실시간 반사 큐브맵을 받는다
          mt.userData.mirror = mt.metalness >= 0.99 && mt.roughness <= 0.01;
          // 번들이 달라도 값이 같은 재질(몸통 색 등)은 하나로 합쳐 그린다(batch.ts). 거울은 평면 반사로 바꿔 끼우므로 빼고
          mt.userData.shareable = !mt.userData.mirror && !mt.name?.includes('거울');
          if (mt.aoMap) { aoMats.add(mt); mt.aoMapIntensity = aoOn ? 1 : 0; }
        }
      });
      return g.scene;
    });
    cache.set(bundle, p);
  }
  return p;
}
async function place(c: Content | null | undefined): Promise<THREE.Object3D | null> {
  if (!c?.bundle) return null;
  try { return (await load(c.bundle)).clone(true); } catch (e) { console.warn('[모델] 불러오기 실패', c.bundle, e); return null; }
}
/** 앞으로 쓸 모델을 미리 받아 둔다 (몸통 목록·도어 컬러를 바꿀 때 기다림 줄이기) */
export function preload(cs: (Content | null | undefined)[]) { cs.forEach(c => c?.bundle && load(c.bundle).catch(() => {})); }

const ANCHOR: Record<string, string[]> = {
  LEFT: ['L1'], RIGHT: ['R1'], IN_LEFT: ['IN_L1'], IN_RIGHT: ['IN_R1'], OUT: ['OUT1'],
};
/** 원본 모델 도어 기준점 보정(m, [x, y]) — 기준점(L1·R1)이 hotspot 노드 아래에 달려 있는데, 이 두 몸통만 hotspot 이 옮겨져 있어
 *  도어가 옆 칸 도어와 다른 자리에 붙었다(사용자 지적 2026-11-10 「2단 행거장만 도어 붙는 위치가 다르다」).
 *  몸통 모델 119개 전수 실측 — 나머지는 같은 라인끼리 기준점이 같다(x = ±(폭/2 − 2mm), y = 에센셜 29mm · 시그니처 29.5mm).
 *  hk1001047 시그니처 2단 행거형 900: y 35.5mm(6mm 높음) · cbib12117 에센셜 2단 행거형 1000: x 1.4mm 왼쪽 */
const ANCHOR_FIX: Record<string, [number, number]> = { hk1001047: [0, -0.00601], cbib12117: [0.00141, 0] };

function bbox(o: THREE.Object3D) { o.updateMatrixWorld(true); return new THREE.Box3().setFromObject(o); }
/** 거울 EP 판 — 도어 거울과 같은 은경(금속 1 · 거칠기 거의 0) */
/** 줄눈(도어·상부 써라운딩 틈 뒤) — 어두운 무광 */
const REVEAL_MAT = new THREE.MeshStandardMaterial({ name: '줄눈', color: '#2b2826', roughness: 1, metalness: 0 });
const EP_MIRROR = new THREE.MeshPhysicalMaterial({ name: '거울 EP', color: '#e9edef', metalness: 1, roughness: 0.03 });

/** 설계 → 붙박이장 Group */
/** opts.lift = 따로 둘 칸(합치지 않는다) — 고른 칸을 앞으로 내밀어 마우스로 끌기 위해(사용자 지시 2026-11-09 「선택하면 장이 앞으로 돌출되고 마우스에 붙어 이동」) */
export async function buildWardrobe(pl: Planner, d: Design, opts: { lift?: number } = {}): Promise<Built> {
  const t = pl.type(d.typeId);
  const wardProps = loadWardAssets();          // 장 안 소품 모델(처음 한 번) — 번들과 같이 받는다
  const root = new THREE.Group(); root.name = 'wardrobe';
  const { bodies, side } = pl.layout(d);
  const W = d.width * MM, sd = side * MM;

  // 필요한 모델을 한꺼번에 받는다
  const doorLists = d.slots.map((_, i) => pl.doorsFor(d, i));
  const sideSur = pl.surroundFor(d, 'SIDE', side <= 100 ? 100 : 200) ?? pl.surroundFor(d, 'SIDE');
  const topSur = pl.surroundFor(d, 'TOP');
  const plan = pl.plan(d.planId);
  const panel = (loc: string) => plan.panels.map(id => pl.c(id)).find(c => c.panelLoc === loc);
  const [bodyObjs, doorObjs, sideL, sideR, topProto, epL, epR] = await Promise.all([
    Promise.all(bodies.map(place)),
    Promise.all(doorLists.map(ds => Promise.all(ds.map(place)))),
    place(sideSur), place(sideSur), place(topSur),
    d.options.epLeft ? place(panel('LEFT')) : null,
    d.options.epRight ? place(panel('RIGHT')) : null,
  ]);
  await wardProps;

  const parts: DoorPart[] = [];
  const slots: Built['slots'] = [];
  let bodyTop = 0, frontZ = BODY_Z + 0.33;
  let x = sd;
  bodies.forEach((c, i) => {
    const w = c.w * MM;
    const g = new THREE.Group(); g.name = 'slot-' + i; g.userData.slot = i;
    g.position.set(x + w / 2, 0, BODY_Z);
    root.add(g);
    const body = bodyObjs[i];
    if (body) {
      g.add(body);
      g.updateMatrixWorld(true);             // 이후 월드 좌표 = 붙박이장(root) 좌표
      bodyTop = Math.max(bodyTop, bbox(body).max.y);
      // 몸통 안의 움직이는 부분 — 외부서랍(이름 끝 _01·_02…)은 앞으로, 리프트업 거울은 위로
      body.traverse(o => {
        // 재질이 여럿인 노드는 GLTFLoader 가 Group(자식 Mesh 들)으로 만든다 — 노드 이름으로 고르고 그 자식은 건너뛴다
        if (/_0\d$/.test(o.name) && !/^(BONG|LIFTUP)/.test(o.name) && !/_0\d$/.test(o.parent?.name ?? '')) {
          // 서랍 고르기 — 화면에서 누른 서랍(외부서랍 앞판)
          o.userData.drawerRoot = true;
          o.traverse(c => { c.userData.drawer = true; });
          parts.push({ obj: o, slot: i, kind: 'DRAWER', base: o.position.clone(), travel: 0.34, isDoor: false });
        }
      });
      const lift = body.getObjectByName('LIFTUP_01');
      if (lift) {
        // 위 끝 앞 모서리를 축으로 들어 올린다
        const lb = bbox(lift);
        const pivot = new THREE.Group(); pivot.name = 'liftup-pivot';
        const top = new THREE.Vector3(0, lb.max.y, lb.max.z);
        lift.parent!.worldToLocal(top);
        pivot.position.copy(top);
        lift.parent!.add(pivot);
        pivot.attach(lift);
        parts.push({ obj: pivot, slot: i, kind: 'LIFT', base: pivot.position.clone(), travel: 0, isDoor: false });
      }
    }

    // 도어 — 몸통 기준점에 단다
    const anchors = new Map<string, THREE.Vector3>();
    const fix = ANCHOR_FIX[c.bundle ?? ''];
    body?.traverse(o => {
      if (/^(IN_)?[LR]1$|^OUT1$/.test(o.name)) {
        const a = o.getWorldPosition(new THREE.Vector3()).sub(g.position);
        if (fix) { a.x += fix[0]; a.y += fix[1]; }
        anchors.set(o.name, a);
      }
    });
    doorLists[i].forEach((dc, k) => {
      const door = doorObjs[i][k];
      if (!door) return;
      // 도어 한 짝씩 고르기 — 화면에서 누른 도어가 몇 번째인지
      door.userData.doorRoot = true;
      door.traverse(o => { o.userData.door = k; });
      const want = ANCHOR[dc.loc ?? ''] ?? [];
      const name = want.find(n => anchors.has(n)) ?? [...anchors.keys()][k] ?? [...anchors.keys()][0];
      const a = name ? anchors.get(name)! : new THREE.Vector3(dc.loc === 'RIGHT' ? w / 2 : -w / 2, 0.03, 0.305);
      const db = bbox(door);
      const depth = db.max.z - db.min.z;
      // 도어 액세서리 — 안쪽 면(뒷면)에. 도어 무리에 달아 도어와 같이 열린다. 경첩 반대쪽 1/3 · 높이 1.55m 에서 아래로
      if ((d.slots[i].doorAcc?.[k] ?? []).some(id => ACC_INFO[pl.c(id)?.code ?? '']?.kind === 'scarf') && t.doorType !== 'SLIDING') {
        door.updateMatrixWorld(true);
        const inv = door.matrixWorld.clone().invert(), lb = new THREE.Box3(), mb = new THREE.Box3();
        door.traverse(o => { const m = o as THREE.Mesh; if (!m.isMesh) return; if (!m.geometry.boundingBox) m.geometry.computeBoundingBox(); lb.union(mb.copy(m.geometry.boundingBox!).applyMatrix4(inv.clone().multiply(m.matrixWorld))); });
        const sc = doorScarf(); const cx = (lb.min.x + lb.max.x) / 2, hw = (lb.max.x - lb.min.x) / 2;
        const away = (dc.loc === 'RIGHT' || dc.loc === 'IN_RIGHT') ? -1 : 1;   // 경첩 반대쪽으로 치우쳐(손잡이 쪽)
        sc.position.set(cx + away * hw * 0.35, Math.min(lb.max.y - 0.25, 1.6), lb.min.z - 0.002);
        door.add(sc);
      }
      const sliding = t.doorType === 'SLIDING';
      if (sliding) {
        door.position.copy(a);
        g.add(door);
        // 바깥 레일 도어가 옆 칸(안쪽 레일 도어 앞)으로 밀려 열린다. 마지막 칸이면 왼쪽으로.
        // 안쪽 레일 도어끼리는 같은 레일이라 함께 움직이면 부딪힌다 — 제자리
        const dir = i < bodies.length - 1 ? 1 : -1;
        const travel = dc.loc === 'OUT' ? dir * (db.max.x - db.min.x) * 0.98 : 0;
        parts.push({ obj: door, slot: i, kind: 'SLIDE', base: door.position.clone(), travel, isDoor: true });
      } else {
        // 여닫이 — 경첩은 도어 앞면 모서리 축으로 돈다(옆 칸 도어와 겹치지 않게)
        const right = name ? /R1$/.test(name) : dc.loc === 'RIGHT';
        const pivot = new THREE.Group(); pivot.name = 'hinge';
        pivot.position.set(a.x, a.y, a.z + depth);
        door.position.set(0, 0, -depth);
        pivot.add(door);
        g.add(pivot);
        parts.push({ obj: pivot, slot: i, kind: right ? 'R' : 'L', base: pivot.position.clone(), travel: 0, isDoor: true });
      }
      frontZ = Math.max(frontZ, BODY_Z + a.z + depth);
    });

    // 장 안 소품 — 칸 모양(봉·선반)을 읽어 옷·이불·상자를 채운다(props.ts)
    // 칸에 놓은 수납 액세서리 — 상품 코드로 종류(트레이 대·소 · 스카프걸이)
    const acc: SlotAcc = {};
    for (const id of d.slots[i].acc ?? []) { const k = ACC_INFO[pl.c(id)?.code ?? '']?.kind; if (k) acc[k] = true; }
    // 소품 씨앗 = 몸통 + 같은 몸통 중 몇 번째 — 칸 순번(i)으로 하면 칸을 옮길 때마다 옷·소품이 바뀌었다(사용자 지적 2026-11-09 「장 위치가 바뀌니 소품이 바뀐다」)
    const nth = d.slots.slice(0, i).filter(x => x.bodyId === d.slots[i].bodyId).length;
    if (body) fillSlot(g, body, c.name, c.id * 31 + nth * 7 + 1, d.wear, acc);
    g.traverse(o => { o.userData.slot = i; });
    slots.push({ x0: x, x1: x + w, group: g, hotspot: new THREE.Vector3(x + w / 2, 1.65, frontZ + 0.03) });
    x += w;
  });
  // 앞면 = 닫힌 도어 판의 실제 앞면(사용자 지시 2026-11-05 「서라운딩이 장도어보다 더 앞으로 나왔어」).
  // 위의 frontZ 는 기준점 + 도어 두께로 짐작한 값이고 초깃값(몸통 + 33cm)이 바닥이라, 도어가 그보다 얕으면 써라운딩·엔드판넬이 도어보다 앞에 섰다(실측 7mm).
  // 도어마다 가장 넓은 판(손잡이·몰딩 바 제외)의 앞면을 재 가장 앞의 것을 쓴다. 도어 없는 장은 그대로
  let doorTop = -Infinity;                   // 닫힌 도어 위 끝(가장 높은 것) — 상부 써라운딩과의 틈 줄눈에 쓴다
  {
    root.updateMatrixWorld(true);
    const inv = root.matrixWorld.clone().invert(), mb = new THREE.Box3();
    let face = -Infinity;
    for (const p of parts) {
      if (!p.isDoor) continue;
      let best = 0, z = -Infinity;
      p.obj.traverse(o => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
        mb.copy(m.geometry.boundingBox!).applyMatrix4(inv.clone().multiply(m.matrixWorld));
        doorTop = Math.max(doorTop, mb.max.y);
        const area = (mb.max.x - mb.min.x) * (mb.max.y - mb.min.y);
        if (area > best) { best = area; z = mb.max.z; }
      });
      face = Math.max(face, z);
    }
    if (Number.isFinite(face)) frontZ = face;
  }
  slots.forEach(s => (s.hotspot.z = frontZ + 0.03));

  // 써라운딩 — 양옆은 남는 폭에 맞춰 늘리고, 상부는 2400mm 판을 눕혀 이어 붙인다 (앞면 = 도어 앞면)
  const plateZ = (o: THREE.Object3D) => { const b = bbox(o); return frontZ - b.max.z; };
  if (sd > 0.001) {
    [sideL, sideR].forEach((s, k) => {
      if (!s) return;
      const b = bbox(s), sw = b.max.x - b.min.x, sh = b.max.y - b.min.y;
      s.scale.set(sd / sw, H / sh, 1);
      s.position.set(k === 0 ? sd / 2 : W - sd / 2, 0, plateZ(s));
      s.name = k === 0 ? 'surround-L' : 'surround-R';
      root.add(s);
    });
  }
  // 줄눈 — 상부 써라운딩을 몸통 위에서 3mm 띄워 단다. 도어 위 틈 2.5mm 만으로는 서 있는 눈높이에서 1화소도 안 돼 줄이 안 보였다(사용자 지적 2026-11-09).
  // 도어가 몸통 위 끝 가까이까지(틈 3cm 안) 올라오는 장만 — 슬라이딩처럼 도어가 써라운딩 뒤로 들어가는 장은 그대로
  const REVEAL = 0.003, revealed = Number.isFinite(doorTop) && bodyTop - doorTop > -0.0005 && bodyTop - doorTop < 0.03;
  const surBot = bodyTop + (revealed ? REVEAL : 0);
  const topH = H - surBot;
  if (topProto && topH > 0.005) {
    const b = bbox(topProto), pw = b.max.x - b.min.x, ph = b.max.y - b.min.y;
    const len = W - 2 * sd, n = Math.max(1, Math.ceil(len / ph));
    for (let k = 0; k < n; k++) {
      const s = k === 0 ? topProto : topProto.clone(true);
      s.scale.set(topH / pw, len / n / ph, 1);
      s.rotation.z = -Math.PI / 2;           // 세로 판 → 가로로 눕힘 (길이가 x 방향)
      s.position.set(sd + (len / n) * k, surBot + topH / 2, 0);
      s.position.z = frontZ - (b.max.z);
      s.name = 'surround-top';
      root.add(s);
    }
    // 도어 위 끝과 상부 써라운딩 사이 줄눈 — 틈(시그니처 2.5mm)으로 뒤 몸통 윗면이 같은 밝기로 비쳐 도어와 써라운딩이 한 판처럼 붙어 보였다
    // (사용자 지적 2026-11-09 「도어와 상부 써라운딩이 겹쳐 보인다」 → 「합쳐져 보임, 줄눈이 보이게」). 틈 뒤(도어·써라운딩 판 뒷면 바로 뒤)에 어두운 띠를 둬
    // 틈으로만 보이게 한다 — 위아래 6mm 씩은 판 뒤에 숨는다
    const gap = surBot - doorTop;
    if (revealed) {
      const gh = gap + 0.012, len2 = W - 2 * sd;
      const strip = new THREE.Mesh(new THREE.BoxGeometry(len2, gh, 0.0015), REVEAL_MAT);
      strip.position.set(sd + len2 / 2, doorTop - 0.006 + gh / 2, frontZ - 0.0215);
      strip.name = 'surround-gap'; strip.castShadow = false; strip.receiveShadow = false;
      root.add(strip);
    }
  }
  // 엔드판넬 — 설치 폭 안쪽으로 EP 두께만큼, 앞면은 옆 써라운딩 판 뒷면에 맞춘다: 정면에서는 써라운딩 판이 EP 두께를 가리고
  // 옆에서는 EP 바깥 면이 판 바깥 모서리와 맞는다(사용자 요청 2026-10-29 — 예전엔 폭 바깥에 앞면을 맞춰 18mm 옆면이 정면에 보였다).
  // 옆 써라운딩 판이 EP 보다 좁거나 없으면 가릴 판이 없어 예전처럼 바깥 옆면
  [epL, epR].forEach((e, k) => {
    if (!e) return;
    const b = bbox(e), th = b.max.x - b.min.x;
    const plate = sd >= th ? (k === 0 ? sideL : sideR) : null;
    if (plate?.parent) {
      e.position.set(k === 0 ? th / 2 : W - th / 2, 0, bbox(plate).min.z - b.max.z);
    } else {
      e.position.set(k === 0 ? -th / 2 : W + th / 2, 0, frontZ - b.max.z);
    }
    e.name = k === 0 ? 'ep-L' : 'ep-R';
    root.add(e);
    // 거울 EP — 바깥 면(벽 쪽이 아닌 드러난 옆면)에 거울 판. 재질 이름 「거울」이라 실시간 화면에서 평면 반사(scene noWindowLight)
    if (k === 0 ? d.options.epMirrorL : d.options.epMirrorR) {
      const eb = bbox(e), H = eb.max.y - eb.min.y, D = eb.max.z - eb.min.z, t = 0.004;
      const m = new THREE.Mesh(new THREE.BoxGeometry(t, H - 0.01, D - 0.01), EP_MIRROR);
      m.position.set(k === 0 ? eb.min.x - t / 2 : eb.max.x + t / 2, (eb.min.y + eb.max.y) / 2, (eb.min.z + eb.max.z) / 2);
      // 장(root) 좌표에 직접 — EP 모델에 배율이 있어도 거울 판이 찌그러지지 않게. 어느 쪽 EP 인지는 userData 로(scene.pickEP)
      m.name = 'ep-mirror'; m.userData.epSide = k === 0 ? 'L' : 'R'; m.userData.mirrorN = [k === 0 ? -1 : 1, 0, 0];   // 바깥을 비춘다(scene mirrorMat) m.castShadow = true; m.receiveShadow = true;
      root.add(m);
    }
  });
  // 드로우콜 줄이기 — 장 안 소품 · 몸통 고정 부분 · 써라운딩을 칸 구분 없이 재질별로 합친다(batch.ts).
  // 도어·서랍·리프트업은 움직이고 거울은 평면 반사 재질로 바꿔 끼우므로 그대로. 칸 고르기는 맞은 자리의 x 로 한다(Stage.pickSlot)
  const mirror = (o: THREE.Object3D) => !!(o as THREE.Mesh).isMesh && [(o as THREE.Mesh).material].flat().some(m => m.userData.mirror || m.name?.includes('거울'));
  const moving = (o: THREE.Object3D) => !!(o.userData.doorRoot || o.userData.drawerRoot) || o.name === 'liftup-pivot' || o.name === 'hinge' || mirror(o);
  // 비치는 도어(유리·투명)는 가리지 않는다
  const seeThrough = (o: THREE.Object3D) => { let t = false; o.traverse(m => { if ((m as THREE.Mesh).isMesh && [(m as THREE.Mesh).material].flat().some(x => x.transparent || (x.opacity ?? 1) < 1 || (x as THREE.MeshPhysicalMaterial).transmission > 0)) t = true; }); return t; };
  // 소품이 든 칸마다 앞을 가리는 부품(도어·서랍·리프트업)이 있나 — 오픈 칸이 하나라도 있으면 소품은 늘 보인다
  const propsCovered = slots.every((s, i) => { let has = false; s.group.getObjectByName('slot-props')?.traverse(o => { if ((o as THREE.Mesh).isMesh) has = true; }); return !has || parts.some(p => p.slot === i && !seeThrough(p.obj)); });
  const propsG = new THREE.Group(); propsG.name = 'slot-props'; root.add(propsG);
  const liftG = opts.lift != null ? slots[opts.lift]?.group : undefined;   // 따로 둘 칸 — 몸통·소품을 합치지 않는다
  batchStatic(slots.filter(s => s.group !== liftG).map(s => s.group.getObjectByName('slot-props')).filter((o): o is THREE.Object3D => !!o), propsG, { name: 'slot-props', shadowMin: 0.15 });
  batchStatic([...slots.filter(s => s.group !== liftG).map(s => s.group), ...root.children.filter(c => !c.name.startsWith('slot-'))], root,
    { skip: o => o === propsG || moving(o) || o.name === 'slot-props' || o.name === 'ep-L' || o.name === 'ep-R', name: 'body' });
  root.position.set(0.002, 0, 0.003);   // 벽면과 같은 평면이 되면 깜박임 — 살짝 띄움
  return { root, width: W, slots, doors: parts, sides: sd, frontZ, propsCovered };
}

/** 도어 열림 (0 닫힘 ~ 1 열림). hideDoors = 원본 몸통 탭처럼 도어를 숨김 */
export function setDoorOpen(b: Built, t: number, hideDoors = false) {
  const e = t * t * (3 - 2 * t);
  for (const p of b.doors) {
    if (p.isDoor) p.obj.visible = !hideDoors;
    switch (p.kind) {
      case 'L': p.obj.rotation.y = -e * Math.PI / 2; break;
      case 'R': p.obj.rotation.y = e * Math.PI / 2; break;
      case 'SLIDE':
        p.obj.position.x = p.base.x + e * p.travel;
        break;
      case 'DRAWER': p.obj.position.z = p.base.z + e * p.travel; break;
      case 'LIFT': p.obj.rotation.x = -e * 1.45; break;
    }
  }
}
