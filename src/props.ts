// 장 안 소품 — 칸 몸통 모양을 읽어(옷걸이 봉 BONG 노드 · 선반 높이는 위에서 아래로 쏜 광선) 실제 쓰는 모습으로 채운다.
//   봉 아래: 긴 칸 = 코트류, 바지걸이 = 반 접은 바지류, 나머지 = 상의류(티셔츠·긴팔·셔츠·정장 재킷·패딩·후드) (사용자 지시 2026-11-04)
//   선반: 이불장 = 개어 쌓은 이불, 낮은 칸 = 개어 둔 스웨터, 선반 많은 칸 = 모자·가방도, 높은 칸 = 수납 상자·바구니·가방
//   말로 배치에 쓴 문장(Design.wear)으로 옷 구성을 바꾼다 — 셔츠·정장 / 코트·원피스 / 니트·가방 / 아이 / 겨울·계절
//   소품은 칸 안쪽을 넘지 않게 줄인다(옷 폭·길이·두께, 선반 물건 크기) — 장을 뚫고 나오면 안 된다
// 형상은 출처 표기 의무가 없는 무료 모델만 쓴다(사용자 지시 2026-11-04 — CC-BY 는 전부 뺌): Sketchfab CC0 · Free Standard, Poly Haven CC0.
//   public/props/ward — Blender 로 정리: 입은 자세 소매를 내리고, 마네킹을 잘라내고, 면 줄이고, 텍스처 512~1024,
//   옷마다 어깨선 안쪽에 맞춘 옷걸이(직접 모델링)를 같이 넣었다 — 옷과 옷걸이를 같은 배율로 다뤄야 옷걸이가 옷을 뚫지 않는다.
//   원피스 = Smithsonian 실물 스캔 CC0 2벌, 롱코트 = Free Standard 정장 재킷 몸판을 늘려 만듦(색만 입힘). 군복류는 넣지 않는다(사용자 지시)
//   상의 · 바지 · 모자 · 백팩 · 개어 둔 수건 · 이불 세트 = Sketchfab Free Standard
//   어부 모자 · 라탄 바구니 2 · 종이 상자 · 여행가방 = Poly Haven CC0
//   홈뷰 Cloth 소품(사용자 지시 2026-11-06 「Cloth 소품들 장에 배치 — glb 로 최적화·압축, 다양하게 특히 가방·접혀 있는 의류」) — public/props/ward/hv.
//     원본 242MB(가방 하나 94만 면) → Blender 로 겹친 점 합치기 · 면 줄이기(옷 5천 · 바지 3천 · 가방 5천, 고밀도 스캔 가방 2~6만) ·
//     텍스처 원본 1024 WebP 90 · Draco(텍스처 좌표 24비트 — 12비트는 타일 UV 범위가 넓어 뭉개졌다, 사용자 지적 2026-11-06) ·
//     텍스처 변환·둘째 UV 를 첫째 UV 에 구움(앱이 둘째 UV + 텍스처 변환을 제대로 못 써 무늬가 눌렸다) → 57개 약 25MB.
//     원본과 같은 카메라로 나란히 렌더해 무늬·로고 자리가 그대로인지 전수 확인. 스캔 가방 sumka_sakvoiazh 는 줄이면 박음질·테두리가 사라져 뺐다.
//     걸린 옷은 고리를 지우고 옷걸이 몸체 재질을 hanger 로(우리 고리·벨벳 옷걸이 그대로), 개어 둔 옷·가방은 바닥 가운데 원점. 신발·우산은 넣지 않는다
//   모델을 못 불러오면 예전 코드 형상으로 그린다. 모양·색은 칸마다 정해진 씨앗(seed)으로 골라 다시 만들어도 같다
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// ---- 실제 모델 (장 만들기 전에 한 번 불러 둔다 — buildWardrobe 가 기다림)
type Piece = { geo: THREE.BufferGeometry; mat: THREE.Material };
/** 옷걸이 옷 — 원점 = 옷걸이 몸체 꼭대기 1.2cm 아래. 봉과 직각으로 돌려 둔다: 옷 폭 = z, 두께 = x.
 *  w = 폭(소매 포함), th = 두께, bottom = 원점 아래 밑단까지(음수) */
type Hung = { name: string; parts: Piece[]; hanger: THREE.BufferGeometry; w: number; th: number; bottom: number };
type Item = { name: string; parts: Piece[]; size: THREE.Vector3 };
type Ward = { tops: Record<string, Hung>; coats: Record<string, Hung>; pants: Record<string, Hung>;
  fold: Piece; fold3: THREE.Vector3; bedding: Item; box: Item; baskets: Item[]; suitcase: Item; bags: Item[]; hats: Item[];
  /** 홈뷰 — 개어 둔 옷 한 벌씩(쌓는다) · 이미 쌓인 더미 · 가방 */
  hvFold: Item[]; hvStacks: Item[]; hvBags: Item[] };
let ward: Ward | null = null;
let wardLoading: Promise<void> | null = null;
const WARD_DIR = `${import.meta.env.BASE_URL}props/ward/`;
const TOPS = ['top_tee', 'top_shirt', 'top_polo', 'top_sweater', 'top_suit', 'top_jacket', 'top_hoodie'];   // 블라우스(스캔)는 소매가 꼬여 구겨져 보여 뺐다
const COATS = ['coat_long', 'dress_white', 'dress_feedsack'];
const PANTS = ['pants_jeans', 'pants_black', 'pants_white'];
const BAGS = ['bag_backpack'], HATS = ['hat_bucket', 'hat_bowler', 'hat_straw', 'hat_cap', 'hat_beanie', 'hat_fisher'];
// 홈뷰 Cloth — 셔츠·블라우스류 / 재킷·코트류(짧은) / 긴 옷 / 바지 / 개어 둔 옷(한 벌 · 더미) / 가방
const HV_SHIRT = ['Clothes_06', 'Clothes_07', 'Clothes_12', 'Clothes_23', 'Clothes_24', 'maika', 'shirt008', 'shirt_014', 'shirt_022', 'shirt_023', 'shirt_024', 'sweater012'].map(n => 'hv/hvtop_' + n);
const HV_JACKET = ['Clothes_08', 'Clothes_09', 'Clothes_14', 'Clothes_20', 'clothes06_coat_01', 'clothes06_jacket', 'clothes06_jacket_02', 'clothes06_sweater', 'jacket_016', 'jacket_017', 'jak', 'jaket_w', 'rub'].map(n => 'hv/hvtop_' + n);
const HV_COATS = ['Clothes_21', 'coat_bej', 'plaw'].map(n => 'hv/hvcoat_' + n);
const HV_PANTS = ['Pants_01', 'Plants599', 'Plants600', 'pantsw_013', 'pantsz_013'].map(n => 'hv/hvpants_' + n);
const HV_STACKS = ['Clothes_27', 'Clothes_acc_01', 'Clothes_acc_02', 'Plaid_03_knitted001'].map(n => 'hv/hvfold_' + n);
const HV_FOLD = ['Line149', 'Line153', 'Line154', 'Plaid_007', 'Plaid_008', 'Plane614', 'cloth4551', 'cloth4552', 'cloth4553', 'cloth4554', 'cloth4555', 'cloth4556'].map(n => 'hv/hvfold_' + n);
const HV_BAGS = ['Box667866', 'LeatherToteHandbag_Brown', 'Woman_handbag_orange', 'bag_giv', 'briefcase', 'small_bag002', 'sumki_07', 'tote_bag'].map(n => 'hv/hvbag_' + n);
const size3 = (gs: THREE.BufferGeometry[]) => { const b = new THREE.Box3(); gs.forEach(g => { g.computeBoundingBox(); b.union(g.boundingBox!); }); return b.getSize(new THREE.Vector3()); };
export function loadWardAssets() {
  return wardLoading ??= (async () => {
    const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(`${import.meta.env.BASE_URL}draco/`));   // 홈뷰 소품은 Draco 압축
    const load = async (f: string) => {
      const gl = await loader.loadAsync(`${WARD_DIR}${f}.glb`);
      gl.scene.updateMatrixWorld(true);
      const out: Piece[] = [];
      // 비등방 필터 16 — 장 안 옷·가방을 비스듬히 볼 때 무늬가 뭉개지지 않게(기본 1)
      gl.scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) for (const v of Object.values(m.material as THREE.Material)) if ((v as THREE.Texture)?.isTexture) (v as THREE.Texture).anisotropy = 16; });
      gl.scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) out.push({ geo: m.geometry.clone().applyMatrix4(m.matrixWorld), mat: m.material as THREE.Material }); });
      return out;
    };
    try {
      const names = [...TOPS, ...COATS, ...PANTS, 'folded', 'bedding', 'box', 'basket', 'basket_lid', 'suitcase', ...BAGS, ...HATS];
      const got = new Map(await Promise.all(names.map(async n => [n, await load(n)] as const)));
      const has = (n: string) => got.has(n);
      const hung = (name: string): Hung => {
        const ps = got.get(name)!;
        // 옷 = 옷걸이가 아닌 조각 전부(재킷은 단추·안감 등 재질 여럿). 'cloth' 재질만 색을 입히고 나머지는 원본 텍스처 그대로
        const hanger = ps.find(p => p.mat.name.startsWith('hanger'))!.geo.rotateY(Math.PI / 2);
        const parts = ps.filter(p => !p.mat.name.startsWith('hanger'));
        parts.forEach(p => {
          p.geo.rotateY(Math.PI / 2);
          const m = p.mat as THREE.MeshStandardMaterial;
          if (!m.name.startsWith('cloth')) { m.metalness = 0; if (!m.roughnessMap) m.roughness = Math.max(m.roughness, 0.6); m.userData.shareable = true; }
        });
        const cb = new THREE.Box3(); parts.forEach(p => { p.geo.computeBoundingBox(); cb.union(p.geo.boundingBox!); });
        return { name, parts, hanger, w: cb.max.z - cb.min.z, th: cb.max.x - cb.min.x, bottom: cb.min.y };
      };
      const item = (name: string): Item => { const parts = got.get(name)!; return { name, parts, size: size3(parts.map(p => p.geo)) }; };
      const rec = (ns: string[]) => Object.fromEntries(ns.filter(has).map(n => [n, hung(n)]));
      const fo = got.get('folded')![0];
      tameNormal((fo.mat as THREE.MeshStandardMaterial).normalMap);
      ward = {
        tops: rec(TOPS), coats: rec(COATS), pants: rec(PANTS),
        hvFold: [], hvStacks: [], hvBags: [],
        fold: fo, fold3: size3([fo.geo]), bedding: item('bedding'), box: item('box'), baskets: [item('basket'), item('basket_lid')], suitcase: item('suitcase'),
        bags: [...BAGS.map(item), ...makeBags()], hats: HATS.map(item),
      };
      [ward.bedding, ward.box, ward.suitcase, ...ward.baskets, ...ward.bags, ...ward.hats, ...ward.hvFold, ...ward.hvStacks, ...ward.hvBags].flatMap(it => it.parts).forEach(p => { p.mat.userData.shareable = true; });
      // 바구니 옆면은 PNG 투명(엮은 틈) — 잘라 그린다
      ward.baskets.flatMap(b => b.parts).forEach(p => { const m = p.mat as THREE.MeshStandardMaterial; if (m.transparent || m.alphaTest > 0) { m.transparent = false; m.alphaTest = 0.5; } });
      // 홈뷰 의류·가방(57개 · 25MB)은 기다리지 않는다 — 처음 열 때 이것을 다 받아 풀어야 장을 지어 방 짓기까지 3초 늦었다(실측 2026-11-09,
      // 사용자 지적 「최초 오픈이 너무 오래 걸려」). 기본 소품으로 먼저 짓고, 다 오면 합쳐 넣고 알린다(onWardHvReady → 장 안만 다시)
      void (async () => {
        const hvNames = [...HV_SHIRT, ...HV_JACKET, ...HV_COATS, ...HV_PANTS, ...HV_STACKS, ...HV_FOLD, ...HV_BAGS];
        (await Promise.allSettled(hvNames.map(async n => [n, await load(n)] as const))).forEach((r, i) => { if (r.status === 'fulfilled') got.set(r.value[0], r.value[1]); else console.warn('[장 소품] 홈뷰', hvNames[i], r.reason); });
        if (!ward) return;
        Object.assign(ward.tops, rec([...HV_SHIRT, ...HV_JACKET])); Object.assign(ward.coats, rec(HV_COATS)); Object.assign(ward.pants, rec(HV_PANTS));
        ward.hvFold = HV_FOLD.filter(has).map(item); ward.hvStacks = HV_STACKS.filter(has).map(item); ward.hvBags = HV_BAGS.filter(has).map(item);
        [...ward.hvFold, ...ward.hvStacks, ...ward.hvBags].flatMap(it => it.parts).forEach(p => { p.mat.userData.shareable = true; });
        hvReady = true; hvListeners.forEach(f => f());
      })();
    } catch (e) {
      console.warn('장 안 소품 모델을 못 불러 코드 형상으로 그립니다', e);
    }
  })();
}
let hvReady = false;
const hvListeners: (() => void)[] = [];
/** 홈뷰 장 소품이 다 오면 한 번 — 장 안을 그것으로 다시 채운다 */
export function onWardHvReady(f: () => void) { if (hvReady) f(); else hvListeners.push(f); }
// ---- 수건 노멀맵 다듬기(사용자 지시 2026-11-05 「장 소품 그림자가 깨지고 이상하게 표현」).
// folded.glb 노멀맵의 테리(수건 고리) 부분은 화소마다 방향이 들쭉날쭉하고 JPEG 라 길이가 0 에 가깝거나 안쪽을 보는 값이 섞여 있다(실측 1.6% 가 뒤집힘).
// 멀리서 줄여 보면(밉맵) 그 값들이 평균돼 노멀이 무너지고, 빛·화면 AO 가 그 자리를 검은 얼룩으로 그렸다. 불러올 때 한 번 —
// 3×3 으로 고르게 하고 위쪽 성분을 0.55 이상으로 묶어 다시 정규화한다(주름·줄무늬 모양은 남는다)
function tameNormal(t: THREE.Texture | null) {
  const img = t?.image as CanvasImageSource & { width: number; height: number } | undefined;
  if (!t || !img?.width) return;
  const W = img.width, H = img.height, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const cx = cv.getContext('2d')!; cx.drawImage(img, 0, 0);
  const d = cx.getImageData(0, 0, W, H), p = d.data, src = new Float32Array(W * H * 2);
  for (let i = 0; i < W * H; i++) { src[i * 2] = p[i * 4] / 127.5 - 1; src[i * 2 + 1] = p[i * 4 + 1] / 127.5 - 1; }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let sx = 0, sy = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const k = (((y + dy + H) % H) * W + ((x + dx + W) % W)) * 2; sx += src[k]; sy += src[k + 1];
    }
    sx /= 9; sy /= 9;
    const z = Math.max(0.55, Math.sqrt(Math.max(0, 1 - sx * sx - sy * sy))), l = Math.hypot(sx, sy, z), i = (y * W + x) * 4;
    p[i] = (sx / l + 1) * 127.5; p[i + 1] = (sy / l + 1) * 127.5; p[i + 2] = (z / l + 1) * 127.5; p[i + 3] = 255;
  }
  cx.putImageData(d, 0, 0);
  t.image = cv; t.needsUpdate = true;
}
// ---- 핸드백 — 직접 만든 형상(사용자 지시 2026-11-05 「가방 핸드백 등도 추가」). 무료 실사 핸드백은 전부 CC-BY 라(출처 표기 의무 — 쓰지 않는다) 코드로 만든다.
//   토트백(사다리꼴 몸통 + 손잡이 둘) · 플랩 숄더백(덮개 + 금속 잠금 + 짧은 체인) · 클러치(납작한 몸통 + 덮개). 원점 = 바닥 가운데
const LEATHER = ['#1f1d1c', '#7a4e2d', '#c8a27a', '#e6dccb', '#5a1f24', '#4b5340', '#8c8c86'];
const leatherCache = new Map<string, THREE.MeshPhysicalMaterial>();
const leather = (hex: string) => {
  let m = leatherCache.get(hex);
  if (!m) { m = new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.45, clearcoat: 0.25, clearcoatRoughness: 0.45, sheen: 0.2, sheenColor: '#ffffff', sheenRoughness: 0.6 }); m.name = 'leather'; m.userData.shareable = true; leatherCache.set(hex, m); }
  return m;
};
const goldMat = new THREE.MeshPhysicalMaterial({ color: '#c9a45c', metalness: 1, roughness: 0.3 }); goldMat.userData.shareable = true;
/** 고리 손잡이 — 너비 w · 높이 h 의 반타원을 굵기 r 관으로. z = 몸통 앞뒤 자리 */
function arcHandle(w: number, h: number, r: number, y0: number, z: number, lean = 0) {
  // lean — 손잡이를 뒤로 눕힌 정도(라디안). 선반에 둘 땐 손잡이가 몸통 위로 눕는다(세우면 선반 칸보다 높아 빠졌다)
  const pts: THREE.Vector3[] = [];
  for (let k = 0; k <= 16; k++) { const a = Math.PI * k / 16, up = Math.sin(a) * h; pts.push(new THREE.Vector3(-Math.cos(a) * w / 2, y0 + up * Math.cos(lean), z - up * Math.sin(lean))); }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, r, 8, false);
}
function makeBags(): Item[] {
  const out: Item[] = [];
  const item = (name: string, parts: Piece[]) => out.push({ name, parts, size: size3(parts.map(p => p.geo)) });
  LEATHER.forEach((hex, i) => {
    const L = leather(hex);
    if (i % 3 === 0) {
      // 토트백 — 바닥 30cm · 위 26cm · 높이 19cm · 폭 11cm, 손잡이 둘(뒤로 살짝 눕힘)
      const sh = new THREE.Shape(); sh.moveTo(-0.15, 0); sh.lineTo(0.15, 0); sh.quadraticCurveTo(0.14, 0.1, 0.13, 0.19); sh.lineTo(-0.13, 0.19); sh.quadraticCurveTo(-0.14, 0.1, -0.15, 0); 
      const body = new THREE.ExtrudeGeometry(sh, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 6 });
      body.translate(0, 0.012, -0.045);
      item(`bag_tote${i}`, [{ geo: body, mat: L }, { geo: arcHandle(0.12, 0.085, 0.006, 0.2, 0.03, 0.5), mat: L }, { geo: arcHandle(0.12, 0.085, 0.006, 0.2, -0.03, -0.5), mat: L }]);
    } else if (i % 3 === 1) {
      // 플랩 숄더백 — 22×15×8cm, 앞 덮개 · 금속 잠금 · 뒤로 눕힌 체인
      const body = new RoundedBoxGeometry(0.22, 0.15, 0.08, 4, 0.025); body.translate(0, 0.075, 0);
      const fs = new THREE.Shape(); fs.moveTo(-0.112, 0); fs.lineTo(0.112, 0); fs.lineTo(0.112, -0.07); fs.quadraticCurveTo(0, -0.1, -0.112, -0.07); fs.closePath();
      const flap = new THREE.ExtrudeGeometry(fs, { depth: 0.006, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.003, bevelSegments: 2, curveSegments: 8 });
      flap.translate(0, 0.15, 0.041);
      const clasp = new RoundedBoxGeometry(0.026, 0.018, 0.008, 2, 0.003); clasp.translate(0, 0.068, 0.05);
      item(`bag_flap${i}`, [{ geo: body, mat: L }, { geo: flap, mat: L }, { geo: clasp, mat: goldMat }, { geo: arcHandle(0.15, 0.08, 0.0035, 0.15, 0, 1.0), mat: goldMat }]);
    } else {
      // 봉투형 클러치 — 26×14×4cm, 세모 덮개 · 금속 장식
      const body = new RoundedBoxGeometry(0.26, 0.14, 0.04, 4, 0.012); body.translate(0, 0.07, 0);
      const fs = new THREE.Shape(); fs.moveTo(-0.13, 0); fs.lineTo(0.13, 0); fs.lineTo(0, -0.085); fs.closePath();
      const flap = new THREE.ExtrudeGeometry(fs, { depth: 0.005, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.004, bevelSegments: 2 });
      flap.translate(0, 0.138, 0.02);
      const pin = new THREE.CylinderGeometry(0.008, 0.008, 0.006, 16); pin.rotateX(Math.PI / 2); pin.translate(0, 0.058, 0.027);
      item(`bag_clutch${i}`, [{ geo: body, mat: L }, { geo: flap, mat: L }, { geo: pin, mat: goldMat }]);
    }
  });
  return out;
}

/** 옷걸이 고리 — 봉을 감싸는 반원 + 몸체까지 내려오는 줄기. 원점 = 봉 가운데, 고리는 y-z 면(봉 방향 x 와 직각).
 *  줄기 8cm — 셔츠·패딩 깃이 옷걸이 위로 4~5cm 올라와서 짧으면 깃이 봉에 박힌다 */
const HOOK_R = 0.014, HOOK_BASE = -0.08;
let hookGeo: THREE.BufferGeometry | null = null;
function hook() {
  if (hookGeo) return hookGeo;
  const pts: THREE.Vector3[] = [new THREE.Vector3(0, HOOK_BASE, -HOOK_R), new THREE.Vector3(0, -0.012, -HOOK_R)];
  for (let k = 0; k <= 14; k++) { const a = Math.PI - (k / 14) * (Math.PI * 1.3); pts.push(new THREE.Vector3(0, Math.sin(a) * HOOK_R, Math.cos(a) * HOOK_R)); }
  return hookGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.0022, 5, false);
}

// ---- 말로 배치 문장 → 옷 구성 (종류별 가중치 · 아이 옷 · 잡화 비율)
type Mix = { tops: Record<string, number>; coats: Record<string, number>; pants: Record<string, number>; kids: boolean; accessory: number };
function wearMix(text = ''): Mix {
  const m: Mix = {
    tops: { top_tee: 1, top_shirt: 1, top_polo: 0.8, top_sweater: 0.7, top_suit: 0.5, top_jacket: 0.5, top_hoodie: 0.7 },
    coats: { coat_long: 2.5, dress_white: 0.5, dress_feedsack: 0.5 },
    pants: { pants_jeans: 1, pants_black: 1, pants_white: 0.6 },
    kids: /아이|아기|유아|어린이|키즈/.test(text), accessory: 0.5,   // 가방을 더 자주(사용자 지시 2026-11-06 「특히 가방」) — 0.35 → 0.5
  };
  // 홈뷰 실물 옷 — 기본으로 섞는다(셔츠·블라우스 각 0.35 · 재킷 0.3 · 긴 옷 0.8 · 바지 0.5). 아이 옷 문장이면 빼고 아래 문장 규칙이 키운다
  const hvW = (ns: string[], w: number, into: Record<string, number>) => ns.forEach(n => (into[n] = w));
  hvW(HV_SHIRT, 0.35, m.tops); hvW(HV_JACKET, 0.3, m.tops); hvW(HV_COATS, 0.8, m.coats); hvW(HV_PANTS, 0.5, m.pants);
  if (/셔츠|정장|수트|양복|출근|오피스/.test(text)) {
    Object.assign(m.tops, { top_shirt: 3, top_suit: 3, top_polo: 1, top_tee: 0.3, top_hoodie: 0.2, top_jacket: 0.2 });
    Object.assign(m.pants, { pants_black: 2, pants_white: 1, pants_jeans: 0.4 });
    Object.assign(m.coats, { coat_long: 3, dress_white: 0.3, dress_feedsack: 0.3 });
  }
  if (/코트|원피스|드레스/.test(text)) Object.assign(m.coats, { coat_long: 2, dress_white: 2, dress_feedsack: 2 });
  if (/겨울|계절|패딩|외투/.test(text)) Object.assign(m.tops, { top_hoodie: 2, top_jacket: 1.5, top_sweater: 1.5 });
  if (/캐주얼|티셔츠|후드|맨투맨/.test(text)) Object.assign(m.tops, { top_tee: 2.5, top_hoodie: 2, top_jacket: 1.5, top_suit: 0.2 });
  if (/가방|모자|잡화/.test(text)) m.accessory = 0.6;
  if (/셔츠|정장|수트|양복|출근|오피스/.test(text)) { hvW(HV_SHIRT, 1, m.tops); hvW(HV_JACKET, 0.8, m.tops); hvW(HV_PANTS, 1, m.pants); }
  if (/코트|원피스|드레스/.test(text)) hvW(HV_COATS, 2, m.coats);
  if (/겨울|계절|패딩|외투|캐주얼/.test(text)) hvW(HV_JACKET, 0.8, m.tops);
  if (m.kids) { Object.assign(m.tops, { top_tee: 3, top_hoodie: 2, top_polo: 1, top_suit: 0 }); hvW([...HV_SHIRT, ...HV_JACKET], 0, m.tops); hvW(HV_COATS, 0, m.coats); hvW(HV_PANTS, 0, m.pants); }
  return m;
}
const pick = (R: () => number, w: Record<string, number>) => {
  const es = Object.entries(w).filter(([, v]) => v > 0), t = es.reduce((a, [, v]) => a + v, 0);
  let r = R() * t;
  for (const [k, v] of es) if ((r -= v) <= 0) return k;
  return es[es.length - 1][0];
};
// 옷 종류별 색 — 셔츠는 밝게, 재킷·코트는 무게감 있게, 청바지는 데님 계열
const PALETTE: Record<string, string[]> = {
  top_tee: ['#f4f2ee', '#e9e4da', '#2b2f36', '#8e9aa6', '#c9d3dc', '#a7b5a0', '#d8c7b4', '#5b6b7e'],
  top_shirt: ['#f7f6f2', '#dfe7ef', '#c7d6e6', '#f1ece2', '#e9e4da', '#b9c7d6'],
  top_polo: ['#f4f2ee', '#2f3640', '#8e9aa6', '#a7b5a0', '#d8c7b4', '#5b6b7e'],
  top_sweater: ['#e8dccb', '#c9b79c', '#8a6f5a', '#d9d4cc', '#7d8b7a', '#3f4a56', '#efe7da', '#a35d4f'],
  coat_long: ['#b89a74', '#a07d58', '#2f3640', '#3a3633', '#6b6259', '#47504a', '#d6cbbb', '#8a8580'],
};
// 걸린 옷 두께(m) — 모델은 입은 자세라 몸통 부피가 그대로다(셔츠 37cm). 옷걸이에 걸린 옷처럼 이 두께로 납작하게 누른다(사용자 지시 2026-11-04)
// 처음 값은 너무 얇았다(사용자 지시 2026-11-04 「두께 2배」) — 전부 2배
const FLAT: Record<string, number> = {
  top_tee: 0.06, top_shirt: 0.07, top_polo: 0.07, top_sweater: 0.09, top_suit: 0.12, top_jacket: 0.12, top_hoodie: 0.11,
  coat_long: 0.13, dress_white: 0.08, dress_feedsack: 0.1, pants_jeans: 0.08, pants_black: 0.08, pants_white: 0.07,
};
const KIDS = ['#f5c9c1', '#f6e3a1', '#bfe0d4', '#bcd3f0', '#d8c8ef', '#ffffff', '#f2b48c'];
const KNIT = ['#e8dccb', '#c9b79c', '#8a6f5a', '#d9d4cc', '#7d8b7a', '#c98f7d', '#3f4a56', '#efe7da', '#a35d4f', '#5b6b7e'];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// ---- 재질 (색마다 하나 — 공유)
const matCache = new Map<string, THREE.MeshPhysicalMaterial>();
const cloth = (hex: string) => {
  let m = matCache.get(hex);
  if (!m) { m = new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.92, sheen: 0.6, sheenColor: '#ffffff', sheenRoughness: 0.7 }); matCache.set(hex, m); }
  return m;
};
const WEAR = ['#e9e4da', '#f4f2ee', '#c9d3dc', '#8e9aa6', '#3f4a56', '#2b2f36', '#b9a58c', '#7a6a58', '#d8c7b4', '#a7b5a0', '#6d7f6a', '#c98f7d', '#efe1cf', '#5b6b7e'];
const COAT = ['#3a3633', '#5e534a', '#8a7b6b', '#bfae98', '#2f3640', '#6b5747', '#d6cbbb', '#47504a'];
const BEDDING = ['#f1ede6', '#e6e0d6', '#d9e0e4', '#ece3d9', '#cfd8cc', '#f6f4f0'];
const hangerMat = new THREE.MeshPhysicalMaterial({ color: '#c8c5bf', metalness: 0.9, roughness: 0.3 });
const boxMat = new THREE.MeshPhysicalMaterial({ color: '#e8e2d6', roughness: 0.85 });
const basketMat = new THREE.MeshPhysicalMaterial({ color: '#b89a74', roughness: 0.9, sheen: 0.3, sheenColor: '#e0cfb5' });
// 실제 모델용 — 벨벳 옷걸이 · 개어 둔 옷(모델 노멀맵 = 천 주름 공유) · 리넨 상자
const velvetMat = new THREE.MeshPhysicalMaterial({ color: '#4a4744', roughness: 0.85, sheen: 0.5, sheenColor: '#8a8580', sheenRoughness: 0.6 });
const foldCache = new Map<string, THREE.MeshPhysicalMaterial>();
const foldMat = (hex: string) => {
  let m = foldCache.get(hex);
  if (!m) {
    const src = ward!.fold.mat as THREE.MeshStandardMaterial;
    m = new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.92, sheen: 0.6, sheenColor: '#ffffff', sheenRoughness: 0.7, normalMap: src.normalMap, normalScale: src.normalScale });
    foldCache.set(hex, m);
  }
  return m;
};
const tintCache = new Map<string, THREE.Material>();
/** 옷 조각 재질 — 'cloth' 는 색(hex)을 입힌 천, 그 밖은 모델 원본(데님·울·가죽 텍스처) */
function partMat(src: THREE.Material, hex: string) {
  if (!src.name.startsWith('cloth')) return src;
  const key = `${src.uuid}|${hex}`;
  let m = tintCache.get(key);
  if (!m) {
    const a = src as THREE.MeshStandardMaterial, fold = ward!.fold.mat as THREE.MeshStandardMaterial;
    m = new THREE.MeshPhysicalMaterial({
      color: hex, roughness: 0.9, roughnessMap: a.roughnessMap ?? null, sheen: 0.5, sheenColor: '#ffffff', sheenRoughness: 0.7,
      normalMap: a.normalMap ?? fold.normalMap, normalScale: a.normalMap ? a.normalScale : new THREE.Vector2(0.6, 0.6),
    });
    tintCache.set(key, m);
  }
  return m;
}

// ---- 형상
const geoCache = new Map<string, THREE.BufferGeometry>();
/** 옷 — 어깨선이 처지고 아래로 내려가는 판(폭 w = 앞뒤 z, 길이 len, 두께 th = 봉 방향 x). 옷걸이 위 끝이 원점 */
function garmentGeo(w: number, len: number, th: number, flare: number) {
  const key = `g${w.toFixed(2)}|${len.toFixed(2)}|${th.toFixed(3)}|${flare.toFixed(2)}`;
  let g = geoCache.get(key);
  if (g) return g;
  const s = new THREE.Shape(), hw = w / 2, sh = 0.05, bw = hw * (1 + flare);
  s.moveTo(-0.035, 0); s.lineTo(0.035, 0);                              // 목
  s.quadraticCurveTo(hw * 0.7, -sh * 0.3, hw, -sh);                      // 오른 어깨
  s.lineTo(hw * 0.98, -len * 0.35);
  s.quadraticCurveTo(bw, -len * 0.75, bw, -len);                         // 옆선 → 밑단
  s.lineTo(-bw, -len);
  s.quadraticCurveTo(-bw, -len * 0.75, -hw * 0.98, -len * 0.35);
  s.lineTo(-hw, -sh);
  s.quadraticCurveTo(-hw * 0.7, -sh * 0.3, -0.035, 0);
  g = new THREE.ExtrudeGeometry(s, { depth: th, bevelEnabled: true, bevelThickness: th * 0.45, bevelSize: 0.008, bevelSegments: 2, curveSegments: 6 });
  g.translate(0, 0, -th / 2);
  g.rotateY(Math.PI / 2);                                                // 판의 폭 → z(앞뒤), 두께 → x(봉 방향)
  geoCache.set(key, g);
  return g;
}
/** 옷걸이 — 고리 + 어깨 막대 */
function hangerGeo(w: number) {
  const key = `h${w.toFixed(2)}`;
  let g = geoCache.get(key);
  if (g) return g;
  const hook = new THREE.TorusGeometry(0.018, 0.0025, 6, 14, Math.PI * 1.25);
  hook.rotateY(Math.PI / 2); hook.rotateX(-Math.PI * 0.12); hook.translate(0, 0.03, 0);
  const bar = new THREE.CylinderGeometry(0.003, 0.003, w * 0.92, 6);
  bar.rotateX(Math.PI / 2); bar.translate(0, -0.012, 0);
  g = mergeGeos([hook, bar]);
  geoCache.set(key, g);
  return g;
}
function mergeGeos(gs: THREE.BufferGeometry[]) {
  const pos: number[] = [], nor: number[] = [], idx: number[] = [];
  let off = 0;
  for (const g of gs) {
    const ng = g.index ? g : g;
    const p = ng.getAttribute('position'), n = ng.getAttribute('normal');
    for (let i = 0; i < p.count; i++) { pos.push(p.getX(i), p.getY(i), p.getZ(i)); nor.push(n.getX(i), n.getY(i), n.getZ(i)); }
    if (ng.index) for (let i = 0; i < ng.index.count; i++) idx.push(ng.index.getX(i) + off);
    else for (let i = 0; i < p.count; i++) idx.push(i + off);
    off += p.count;
  }
  const m = new THREE.BufferGeometry();
  m.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  m.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  m.setIndex(idx);
  return m;
}
const rbox = (w: number, h: number, d: number, r: number) => {
  const key = `b${w.toFixed(3)}|${h.toFixed(3)}|${d.toFixed(3)}|${r}`;
  let g = geoCache.get(key);
  if (!g) { g = new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2) - 1e-4); geoCache.set(key, g); }
  return g;
};

function put(g: THREE.Object3D, geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, name: string) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z); o.name = name; o.castShadow = o.receiveShadow = true;
  o.raycast = () => {};                     // 칸·도어 고르기를 가리지 않게
  g.add(o); return o;
}

/** 봉 — 윗면 높이 y · 가로 x0~x1 · 앞뒤 가운데 z(장마다 봉 자리가 다르다 — 사용자 지시 2026-11-06 「옷걸이가 장의 옷걸이 봉에 맞게, 장마다 봉 위치가 달라」) */
type Rod = { y: number; x0: number; x1: number; z: number };
/** 선반 위 물건 — 모델 비율 그대로, 폭 w · 높이 h · 깊이 d 를 넘지 않게(장을 뚫고 나오지 않게) 줄여 바닥 가운데에 놓는다 */
function putItem(g: THREE.Object3D, it: Item, x: number, y: number, z: number, w: number, h: number, d: number) {
  const s = Math.min(1, w / it.size.x, h / it.size.y, d / it.size.z);
  for (const p of it.parts) put(g, p.geo, p.mat, x, y, z, 'prop-box').scale.setScalar(s);
}

/** 가방 고르기 — 홈뷰 실물 가방을 더 자주(65%) */
const bagPool = (R: () => number) => (ward!.hvBags.length && R() < 0.65 ? ward!.hvBags : ward!.bags);
/** 칸 하나 채우기. host = 칸 그룹(이 그룹 좌표로 놓는다), body = 몸통 모델, kind = 몸통 이름, seed = 칸마다 다른 수 */
// ---- 수납 액세서리(사용자 지시 2026-11-09 「ACC 도 장·도어를 고르면 설치 가능한 목록을 보여 주고 고르면 배치」).
// 카탈로그 액세서리 모델(fgib*)은 형상이 비어 있어 상품 사진대로 코드로 만든다 — 칸칸트레이(대·소) 4개는 선반 하나에 나란히, 스카프걸이는 봉 끝 옆판에
export type SlotAcc = { trayL?: boolean; trayS?: boolean; scarf?: boolean };
/** on = 붙는 곳 — 칸(선반) · 도어(안쪽 면). 스카프걸이는 도어 안쪽에 단다(사용자 지시 2026-11-09 「스카프·넥타이·벨트 걸이, 거울은 도어에 붙이는 ACC」) */
export const ACC_INFO: Record<string, { kind: keyof SlotAcc; name: string; need: string; on: 'slot' | 'door' }> = {
  FGIB00551: { kind: 'trayL', name: '칸칸트레이(대) 4개', need: '높이 17cm 넘는 선반', on: 'slot' },
  FGIB00721: { kind: 'trayS', name: '칸칸트레이(소) 4개', need: '높이 10cm 넘는 선반', on: 'slot' },
  FGIB00723: { kind: 'scarf', name: '스카프걸이 1개', need: '여닫이 도어', on: 'door' },
};
/** 도어 안쪽 면에 다는 스카프걸이 — 원점 = 기둥 위 끝, 고리는 -z(장 안쪽)로. 도어 무리 좌표로 놓는다 */
export function doorScarf(len = 0.12) { const m = new THREE.Mesh(scarfGeos(len), chromeMat); m.rotation.y = Math.PI; m.name = 'prop-acc'; m.castShadow = true; m.raycast = () => {}; return m; }
const trayMat = new THREE.MeshPhysicalMaterial({ color: '#e6ebef', roughness: 0.42, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.5, sheen: 0.15, sheenColor: '#ffffff' });
trayMat.name = 'acc-tray'; trayMat.userData.shareable = true;
const chromeMat = new THREE.MeshPhysicalMaterial({ color: '#d9dcdf', metalness: 1, roughness: 0.18 });
chromeMat.name = 'acc-chrome'; chromeMat.userData.shareable = true;
/** 트레이 하나 — 바닥 + 네 벽 + (소는) 칸막이. 원점 = 바닥 가운데, 폭 w(x) · 깊이 d(z) · 높이 h */
function trayGeos(w: number, d: number, h: number, small: boolean) {
  const t = 0.003, gs: THREE.BufferGeometry[] = [];
  const box = (bw: number, bh: number, bd: number, x: number, y: number, z: number) => { const g = new THREE.BoxGeometry(bw, bh, bd); g.translate(x, y, z); gs.push(g); };
  box(w, t, d, 0, t / 2, 0);
  box(t, h, d, -w / 2 + t / 2, h / 2, 0); box(t, h, d, w / 2 - t / 2, h / 2, 0);
  box(w, h, t, 0, h / 2, -d / 2 + t / 2); box(w, h, t, 0, h / 2, d / 2 - t / 2);
  // 앞 손잡이 턱 · 칸막이(소 = 세로 1 + 가로 2, 대 = 가로 1)
  box(w, 0.006, 0.012, 0, h - 0.003, d / 2 + 0.006);
  if (small) { box(t, h * 0.85, d - 0.01, 0, h * 0.425, 0); box(w - 0.01, h * 0.85, t, 0, h * 0.425, -d / 6); box(w - 0.01, h * 0.85, t, 0, h * 0.425, d / 6); }
  else box(w - 0.01, h * 0.8, t, 0, h * 0.4, 0);
  return mergeGeos(gs.map(g => g.toNonIndexed()).map(g => { g.computeVertexNormals(); return g; }));
}
/** 스카프걸이 — 옆판에 붙는 세로 기둥 + 앞으로 뻗은 U 고리 3개(사진 FGIB00723). 원점 = 기둥 위 끝, 고리는 +z(앞)로 len 만큼 */
function scarfGeos(len: number) {
  const gs: THREE.BufferGeometry[] = [], r = 0.0045;
  const post = new THREE.CylinderGeometry(0.008, 0.008, 0.44, 12); post.translate(0, -0.22, 0); gs.push(post);
  for (const y of [-0.05, -0.39]) { const b = new THREE.BoxGeometry(0.02, 0.03, 0.03); b.translate(0.01, y, 0); gs.push(b); }   // 옆판 고정 브래킷
  for (let k = 0; k < 3; k++) {
    const y0 = -0.07 - k * 0.12, gap = 0.04, L = len - k * 0.02;
    const pts: THREE.Vector3[] = [new THREE.Vector3(0, y0, 0), new THREE.Vector3(0, y0, L)];
    for (let a = 1; a <= 10; a++) { const t = Math.PI * a / 10; pts.push(new THREE.Vector3(0, y0 - gap / 2 + Math.cos(t) * gap / 2, L + Math.sin(t) * gap / 2)); }
    pts.push(new THREE.Vector3(0, y0 - gap, 0));
    gs.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.05), 48, r, 6, false));
  }
  return mergeGeos(gs.map(g => (g.index ? g : g)));
}

export function fillSlot(host: THREE.Object3D, body: THREE.Object3D, kind: string, seed: number, wear?: string, acc: SlotAcc = {}) {
  const R = rng(seed * 7919 + kind.length * 104729);
  const mix = wearMix(wear);
  host.updateMatrixWorld(true);
  const bb = new THREE.Box3().setFromObject(body);
  const zc = (bb.min.z + bb.max.z) / 2 - 0.02, depth = bb.max.z - bb.min.z;
  // 옷걸이 봉
  const rods: Rod[] = [];
  // 옷걸이 봉 — BONG 노드 아래 메시에 봉(과 받침)이 들어 있다. 2단 행거 1000 은 위·아래 봉이 메시 하나라(노드 위치·상자로는 하나만 보였다 — 실측)
  // 봉 = 가로(x)로 25cm 넘게 뻗은 수평 모서리. 봉 옆면은 양 끝을 잇는 긴 모서리, 받침(천판에 붙는 판)은 짧은 모서리뿐이라 빠진다.
  // 예전엔 점을 높이 2cm 칸으로 묶어 폭 25cm 넘는 칸을 봉으로 봤다 — 양 끝 받침 윗부분이 같은 높이에 있어 그것이 봉으로 잡혀
  // 옷걸이가 봉보다 높이 떠 있었다(사용자 지적 2026-11-06 「옷걸이가 장의 봉에 맞게 · 장마다 봉 위치가 달라」). 서랍 손잡이(폭 20cm)도 빠진다
  const inRod = (o: THREE.Object3D) => { for (let p: THREE.Object3D | null = o; p && p !== body; p = p.parent) if (/^BONG/.test(p.name)) return true; return false; };
  const segs: { y0: number; y1: number; z0: number; z1: number; x0: number; x1: number }[] = [];
  const v = new THREE.Vector3(), w2 = new THREE.Vector3();
  body.traverse(o => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || !inRod(m)) return;
    const pos = m.geometry.getAttribute('position'), idx = m.geometry.index;
    const nTri = (idx ? idx.count : pos.count) / 3, at = (k: number) => (idx ? idx.getX(k) : k);
    for (let t = 0; t < nTri; t++) for (let e = 0; e < 3; e++) {
      v.fromBufferAttribute(pos, at(t * 3 + e)).applyMatrix4(m.matrixWorld);
      w2.fromBufferAttribute(pos, at(t * 3 + (e + 1) % 3)).applyMatrix4(m.matrixWorld);
      if (Math.abs(v.x - w2.x) < 0.25 || Math.abs(v.y - w2.y) > 0.01 || Math.abs(v.z - w2.z) > 0.01) continue;
      segs.push({ y0: Math.min(v.y, w2.y), y1: Math.max(v.y, w2.y), z0: Math.min(v.z, w2.z), z1: Math.max(v.z, w2.z), x0: Math.min(v.x, w2.x), x1: Math.max(v.x, w2.x) });
    }
  });
  // 봉 하나(원기둥 · 각관)의 옆 모서리들 → 높이 8cm 안은 하나로. y = 윗면(옷걸이가 걸리는 곳) · z = 앞뒤 가운데 · x = 가장 긴 범위
  const groups: { yl: number; yh: number; zl: number; zh: number; x0: number; x1: number }[] = [];
  for (const sg of segs.sort((a, b) => a.y0 - b.y0)) {
    const gr = groups.find(gq => sg.y0 < gq.yh + 0.08 && sg.y1 > gq.yl - 0.08);
    if (gr) { gr.yl = Math.min(gr.yl, sg.y0); gr.yh = Math.max(gr.yh, sg.y1); gr.zl = Math.min(gr.zl, sg.z0); gr.zh = Math.max(gr.zh, sg.z1); gr.x0 = Math.min(gr.x0, sg.x0); gr.x1 = Math.max(gr.x1, sg.x1); }
    else groups.push({ yl: sg.y0, yh: sg.y1, zl: sg.z0, zh: sg.z1, x0: sg.x0, x1: sg.x1 });
  }
  for (const gq of groups) if (gq.yh >= 0.3) rods.push({ y: gq.yh, x0: gq.x0, x1: gq.x1, z: (gq.zl + gq.zh) / 2 });
  rods.sort((a, b) => a.y - b.y);
  // 선반 높이 — 세로 세 줄로 위에서 아래로 광선(봉·외부서랍 노드는 빼고 위를 보는 면만)
  const solids: THREE.Object3D[] = [];
  body.traverse(o => { if ((o as THREE.Mesh).isMesh && !inRod(o)) solids.push(o); });
  const rc = new THREE.Raycaster();
  // 줄 — 칸 폭을 30cm 안팎으로 나눈다(1000 = 3줄, 500 = 1줄). 예전엔 늘 3줄이라 500 쪽장은 한 줄이 17cm 뿐이어서
  // 가방·상자·개어 둔 옷이 다른 장보다 훨씬 작게 줄었다(사용자 지적 2026-11-05 「쪽장에 소품이 너무 작게」)
  const nCol = Math.max(1, Math.floor((bb.max.x - bb.min.x) / 0.3 + 1e-6));
  const colW = (bb.max.x - bb.min.x) / nCol;
  const cols = Array.from({ length: nCol }, (_, k) => bb.min.x + colW * (k + 0.5));
  const levels = (x: number) => {
    rc.set(new THREE.Vector3(x, bb.max.y - 0.02, zc), new THREE.Vector3(0, -1, 0));
    const ys: number[] = [];
    for (const h of rc.intersectObjects(solids, false)) {
      const n = h.face?.normal.clone().transformDirection(h.object.matrixWorld);
      if (n && n.y > 0.7 && !ys.some(y => Math.abs(y - h.point.y) < 0.02)) ys.push(h.point.y);
    }
    // 위 끝 — 천판 아래(몸통 높이 - 판 두께)
    return { floor: ys.sort((a, b) => a - b), ceil: bb.max.y - 0.03 };
  };
  const colInfo = cols.map(levels);
  // 서랍 자리(외부서랍 무리 상자) — 선반 높이를 잴 때 서랍 안 바닥도 위를 보는 면이라 선반으로 잡혀,
  // 칸칸트레이·소품이 서랍 속에 놓여 앞판에 가려졌다(사용자 지적 2026-11-09 「ACC 체크만 되고 모델이 안 보여」)
  // 내부서랍은 몸통 메시 하나에 같이 들어 있어(CBIB12132 등 — 노드 = 몸통·봉·도어뿐, 실측) 이름으로 못 찾는다 → 앞에서 광선을 쏴
  // 깊이의 앞쪽 절반 안에서 앞을 보는 판에 막히면 서랍(앞판)으로 본다 — 내부서랍 앞판은 몸통 앞면보다 9cm 안쪽(z 0.51 / 앞면 0.60, 실측). 열린 선반은 뒤판(0.02)까지 들어간다
  const drawers: THREE.Box3[] = [];
  body.traverse(o => { if (o.userData.drawerRoot) drawers.push(new THREE.Box3().setFromObject(o)); });
  const closedFront = (x: number, y: number) => {
    rc.set(new THREE.Vector3(x, y, bb.max.z + 0.1), new THREE.Vector3(0, 0, -1));
    const h = rc.intersectObjects(solids, false)[0];
    const n = h?.face?.normal.clone().transformDirection(h.object.matrixWorld);
    return !!h && !!n && n.z > 0.7 && h.point.z > (bb.min.z + bb.max.z) / 2;
  };
  const inDrawer = (x0: number, x1: number, lo: number, hi: number) =>
    drawers.some(b => b.min.x < x1 && b.max.x > x0 && b.min.y < hi - 0.02 && b.max.y > lo + 0.02) || closedFront((x0 + x1) / 2, lo + Math.min(0.06, (hi - lo) / 2));
  const surfAt = (x: number) => colInfo[Math.max(0, Math.min(nCol - 1, Math.floor((x - bb.min.x) / colW)))];
  const hangKind = kind.includes('바지') ? 'pants' : null;
  // 선반이 많은 칸(한 줄에 4단 이상) — 개어 둔 옷 사이에 모자·가방도 둔다(사용자 지시 2026-11-04)
  const shelfy = Math.max(...colInfo.map(c => c.floor.length)) >= 4;
  const g = new THREE.Group(); g.name = 'slot-props';
  g.userData.debug = { rods, cols: colInfo, bb: [bb.min.toArray(), bb.max.toArray()], kind };

  // ---- 봉 아래 옷
  const busy: { x0: number; x1: number; y0: number; y1: number }[] = [];
  // 스카프걸이 자리 — 가장 위 봉(봉 아래 45cm 넘게 빈 것)의 오른쪽 끝 9cm 를 비워 옆판에 단다
  const scarfRod = [...rods].sort((a, b) => b.y - a.y).find(r => r.y - Math.max(...surfAt(r.x1 - 0.05).floor.filter(y => y < r.y - 0.2), bb.min.y) > 0.5) ?? null;
  for (const r0 of rods) {
    const r = acc.scarf && r0 === scarfRod ? { ...r0, x1: r0.x1 - 0.09 } : r0;
    const xm = (r.x0 + r.x1) / 2, info = surfAt(xm);
    const below = Math.max(...info.floor.filter(y => y < r.y - 0.2), bb.min.y);
    const lowerRod = Math.max(...rods.filter(o => o !== r0 && o.y < r.y - 0.2 && o.x0 < r.x1 && o.x1 > r.x0).map(o => o.y + 0.06), -1);
    const room = r.y - Math.max(below, lowerRod) - 0.06;
    if (room < 0.35) continue;
    const long = room > 1.15;
    const w = Math.min(0.44, depth - 0.12);
    // 옷 앞뒤 가운데 = 봉 가운데(고리 반지름만큼 뒤 — 고리 줄기가 옷 가운데로 내려온다). 봉 자리를 못 읽었으면 몸통 가운데
    const rz = Number.isFinite(r.z) ? r.z : (bb.min.z + bb.max.z) / 2 + HOOK_R, gz = rz - HOOK_R;
    const zRoom = 2 * Math.min(gz - bb.min.z, bb.max.z - gz) - 0.1;          // 봉이 앞·뒤로 치우치면 그쪽 여유만큼만(앞뒤 판 · 여유 5cm 씩)
    const fill = 0.92 + R() * 0.08;                                       // 봉을 채우는 정도 — 거의 가득(사용자 지시 2026-11-04 「너무 헐렁해, 풍부하게」)
    let x = r.x0 + 0.04;
    const xEnd = r.x1 - 0.04 - (r.x1 - r.x0) * (1 - fill);
    while (x < xEnd) {
      let len: number, th: number, col: string, flare = 0;
      if (hangKind === 'pants') { len = Math.min(room, 0.5 + R() * 0.12); th = 0.028; col = WEAR[Math.floor(R() * WEAR.length)]; }
      else if (long) { len = Math.min(room, 0.95 + R() * 0.3); th = 0.045 + R() * 0.02; col = COAT[Math.floor(R() * COAT.length)]; flare = R() * 0.12; }
      else { len = Math.min(room, 0.55 + R() * 0.3); th = 0.03 + R() * 0.02; col = WEAR[Math.floor(R() * WEAR.length)]; flare = R() * 0.05; }
      const ww = hangKind === 'pants' ? w * 0.75 : w;
      if (ward) {
        // 실제 모델 — 긴 칸 = 코트류, 바지걸이 = 바지류, 나머지 = 상의류. 봉 가운데(윗면 1.2cm 아래)에 고리, 그 아래 옷걸이 몸체 · 옷.
        // 옷과 옷걸이는 같은 배율 — 따로 늘이면 옷걸이가 어깨를 뚫는다. 칸 안쪽(앞뒤 깊이·아래 선반·옆판)을 넘지 않게 줄인다
        // 아직 안 온 옷(홈뷰 — 뒤에서 받는 중)은 빼고 고른다
        const pickIn = <T,>(rec: Record<string, T>, w: Record<string, number>) => rec[pick(R, Object.fromEntries(Object.entries(w).filter(([k]) => rec[k])))];
        const a = hangKind === 'pants' ? pickIn(ward.pants, mix.pants) : long ? pickIn(ward.coats, mix.coats) : pickIn(ward.tops, mix.tops);
        const pal = mix.kids && !long ? KIDS : PALETTE[a.name] ?? ['#ffffff'];
        const c = pal[Math.floor(R() * pal.length)];
        const s = Math.min(mix.kids && !long ? 0.7 : 1, zRoom / a.w);
        const cy = r.y - 0.012, bodyY = cy + HOOK_BASE - 0.012 * s;
        const avail = r.y - Math.max(below, lowerRod) - 0.03;
        const sy = Math.min(s, (avail - (r.y - bodyY)) / -a.bottom);
        const sx = s * Math.min(1, (FLAT[a.name] ?? a.th) / a.th);       // 봉 방향(옷 앞뒤) 두께만 누른다
        const half = a.th * sx / 2;
        if (x === r.x0 + 0.04) x = r.x0 + half + 0.02;
        if (x + half > r.x1 - 0.02 || sy < s * 0.6) break;
        const tilt = (R() - 0.5) * 0.03;                                   // 살짝씩 다르게 걸린다
        put(g, hook(), hangerMat, x, cy, rz, 'prop-hanger');               // 고리 = 봉 가운데
        const pieces: [THREE.BufferGeometry, THREE.Material, string][] = [[a.hanger, velvetMat, 'prop-hanger'], ...a.parts.map(p => [p.geo, partMat(p.mat, c), 'prop-garment'] as [THREE.BufferGeometry, THREE.Material, string])];
        for (const [geo, m, nm] of pieces) {
          const o = put(g, geo, m, x, bodyY, gz, nm);
          o.scale.set(sx, sy, s); o.rotation.x = tilt;
        }
        busy.push({ x0: r.x0, x1: r.x1, y0: bodyY + a.bottom * sy - 0.02, y1: r.y + 0.05 });
        x += a.th * sx * 0.55 + 0.004 + R() * 0.008;                     // 옷끼리 살짝 눌려 붙는 간격(두께의 55%)
        continue;
      }
      put(g, hangerGeo(Math.min(ww, zRoom)), hangerMat, x, r.y - 0.012, rz, 'prop-hanger');
      const o = put(g, garmentGeo(Math.min(ww, zRoom), len, th, flare), cloth(col), x, r.y - 0.035, rz, 'prop-garment');
      o.rotation.x = (R() - 0.5) * 0.04;                                  // 살짝씩 다르게 걸린다
      busy.push({ x0: r.x0, x1: r.x1, y0: r.y - len - 0.05, y1: r.y + 0.05 });
      x += th + 0.012 + R() * 0.03;
    }
  }

  // ---- 칸막이 — 높이 y 에서 세로 판(옆판·칸막이) 사이 빈 자리 [a, b] 들.
  // 예전엔 몸통 폭을 30cm 줄로만 나눠, 칸막이가 촘촘한 작은 수납칸에 가방·상자가 칸막이에 걸쳐 놓였다(사용자 지적 2026-11-09 「공간에 안 맞는 상품」)
  const cellsAt = (y: number): [number, number][] => {
    const ev: { x: number; open: boolean }[] = [];
    for (const dir of [1, -1]) {
      rc.set(new THREE.Vector3(dir > 0 ? bb.min.x - 0.05 : bb.max.x + 0.05, y, zc), new THREE.Vector3(dir, 0, 0));
      for (const h of rc.intersectObjects(solids, false)) {
        const n = h.face?.normal.clone().transformDirection(h.object.matrixWorld);
        if (n && Math.abs(n.x) > 0.7 && !ev.some(e => Math.abs(e.x - h.point.x) < 0.003)) ev.push({ x: h.point.x, open: n.x > 0 });   // +x 를 보는 면 = 빈 자리 왼쪽 끝
      }
    }
    ev.sort((a, b) => a.x - b.x);
    if (!ev.length || !ev[0].open) ev.unshift({ x: bb.min.x, open: true });
    if (ev[ev.length - 1].open) ev.push({ x: bb.max.x, open: false });
    const out: [number, number][] = [];
    for (let k = 0; k + 1 < ev.length; k++) if (ev[k].open && !ev[k + 1].open && ev[k + 1].x - ev[k].x > 0.06) out.push([ev[k].x, ev[k + 1].x]);
    return out;
  };
  /** 크기에 맞는 물건만 — 15% 까지는 줄여 넣는다(putItem). 그보다 작은 자리에 억지로 줄여 넣지 않는다 */
  const fitsIn = (it: Item, w: number, h: number) => it.size.x * 0.85 <= w && it.size.y * 0.85 <= h;
  // ---- 칸칸트레이 자리 — 옷이 걸리지 않은 선반을 손 닿는 높이(1m)에 가까운 순서로. 같은 높이의 옆 줄은 같은 선반(그 칸 폭만큼).
  // 4개 세트라 한 선반에 다 안 들어가면 다음 선반에 이어 놓는다(T선반형 옆 선반은 폭 30cm — 하나만 들어갔다)
  type Shelf = { y: number; gap: number; x0: number; x1: number };
  const shelvesFor = (minGap: number): Shelf[] => {
    const out: Shelf[] = [];
    cols.forEach((cx, ci) => {
      const { floor, ceil } = colInfo[ci], bounds = [...floor, ceil];
      for (let k = 0; k < floor.length; k++) {
        const lo = floor[k], gap = bounds[k + 1] - lo;
        if (gap < minGap || lo < 0.35 || lo > 1.75 || busy.some(b => cx > b.x0 && cx < b.x1 && b.y0 < lo + gap - 0.02 && b.y1 > lo + 0.02)) continue;
        // 칸막이 사이 빈 자리 안으로만(트레이가 칸막이에 걸치지 않게) · 서랍 속은 빼고
        const cell = cellsAt(lo + Math.min(0.08, gap / 2)).find(([a, b]) => a <= cx && b >= cx);
        if (!cell) continue;
        const x0 = Math.max(cell[0], cx - colW / 2), x1 = Math.min(cell[1], cx + colW / 2);
        if (inDrawer(x0, x1, lo, lo + gap)) continue;
        // 같은 높이 · 붙은 줄이면 한 선반으로 잇는다(칸막이를 사이에 두면 잇지 않는다)
        const same = out.find(o => Math.abs(o.y - lo) < 0.02 && Math.abs(o.x1 - x0) < 0.01);
        if (same) { same.x1 = x1; same.gap = Math.min(same.gap, gap); }
        else out.push({ y: lo, gap, x0, x1 });
      }
    });
    return out.sort((a, b) => Math.abs(a.y - 1.0) - Math.abs(b.y - 1.0));
  };
  const TRAY_W = 0.155, TRAY_STEP = TRAY_W + 0.008;
  const fitsOn = (sh: Shelf) => Math.max(0, Math.min(4, Math.floor((sh.x1 - sh.x0 - 0.02 + 0.008) / TRAY_STEP)));
  const shL = shelvesFor(0.17).filter(x => fitsOn(x) > 0), shS = shelvesFor(0.1).filter(x => fitsOn(x) > 0);
  host.userData.fit = { trayL: shL.length > 0, trayS: shS.length > 0, scarf: !!scarfRod };   // 칸 메뉴 액세서리 목록이 읽는다(놓을 수 없는 것은 흐리게)
  // 트레이 4개 세트 중 이 칸에 들어가는 개수 — 칸 메뉴가 「4개 중 N개만 들어가요」로 알린다(멀티서랍형 2 · T선반형 3, 실측 2026-11-09)
  const capOf = (list: Shelf[]) => Math.min(4, list.reduce((n, sh) => n + fitsOn(sh), 0));
  host.userData.trayCap = { trayL: capOf(shL), trayS: capOf(shS) };
  // 놓을 선반 — 4개가 찰 때까지
  const trayShelves: (Shelf & { n: number })[] = [];
  for (let left = 4, list = acc.trayL ? shL : acc.trayS ? shS : []; left > 0 && list.length; ) {
    const sh = list.shift()!, n = Math.min(left, fitsOn(sh));
    trayShelves.push({ ...sh, n }); left -= n;
  }
  // ---- 선반 위 물건
  const isBed = kind.includes('이불');
  cols.forEach((cx0, ci) => {
    const { floor, ceil } = colInfo[ci];
    const bounds = [...floor, ceil];
    const c0 = cx0 - colW / 2, c1 = cx0 + colW / 2;
    for (let k = 0; k < floor.length; k++) {
      const lo = floor[k], hi = bounds[k + 1];
      const gap = hi - lo;
      if (gap < 0.14) continue;
      // 놓을 자리 — 칸막이가 이 줄을 안 가르면 예전처럼 줄 하나, 가르면 가운데가 이 줄에 있는 빈 자리마다(옆 줄과 겹치지 않게)
      const cells = cellsAt(lo + Math.min(0.08, gap / 2));
      // 칸막이 없는 줄(빈 자리 하나가 몸통 폭 전체) = 예전처럼 30cm 줄마다. 칸막이로 나뉘면 빈 자리마다 30cm 안팎으로 다시 나눈다
      // (가운데가 이 줄에 있는 빈 자리만 — 옆 줄과 겹치지 않게). j/n = 빈 자리 안 몇 번째 / 몇 개
      const whole = cells.find(([a, b]) => a <= bb.min.x + 0.05 && b >= bb.max.x - 0.05);
      const spots = whole ? [{ cx: cx0, usable: colW - 0.03, cell: whole, j: ci, n: nCol }]
        : cells.filter(([a, b]) => (a + b) / 2 >= c0 && (a + b) / 2 < c1).flatMap(([a, b]) => {
          const n = Math.max(1, Math.floor((b - a) / 0.3 + 1e-6)), w = (b - a) / n;
          return Array.from({ length: n }, (_, j) => ({ cx: a + w * (j + 0.5), usable: w - 0.02, cell: [a, b] as [number, number], j, n }));
        });
      for (const { cx, usable, cell, j: sj, n: sn } of spots) {
      // 이 자리에 옷이 걸려 있으면 비운다
      if (busy.some(b => cx > b.x0 && cx < b.x1 && b.y0 < hi - 0.02 && b.y1 > lo + 0.02)) continue;
      if (trayShelves.some(t => Math.abs(lo - t.y) < 0.02 && cx > t.x0 && cx < t.x1)) continue;   // 칸칸트레이 자리
      if (inDrawer(cx - usable / 2, cx + usable / 2, lo, hi)) continue;                                // 서랍 속
      // 이불은 넓은 칸(60cm 이상)에만 — 칸막이로 나뉜 작은 칸엔 옷·가방·상자(사용자 지시 2026-11-10 「부피 큰 이불은 작은 칸에 넣지 말고 의류·가방 등 소품」)
      const wideCell = cell[1] - cell[0] >= 0.6;
      if (isBed && gap > 0.3 && wideCell) {
        // 개어 쌓은 이불 — 빈 자리(칸막이 사이) 가운데에 그 폭만큼 넓게(같은 자리 옆 줄은 같은 더미가 덮는다).
        // 예전엔 장 가운데 줄에만 놓아, 칸막이로 나뉜 이불장 아래 칸들이 비었다(사용자 지적 2026-11-09)
        if (sj !== Math.floor(sn / 2)) continue;
        const bx = (cell[0] + cell[1]) / 2, bw = Math.min(cell[1] - cell[0] - 0.04, 0.86);
        let y = lo;
        while (y < lo + gap - 0.2) {
          const t = 0.11 + R() * 0.07;
          if (y + t > hi - 0.06) break;
          if (ward) {
            // 이불 세트 한 더미 — 칸 폭·깊이에 맞추고 높이는 남는 만큼(최대 45cm)
            const it = ward.bedding, f = it.size, hh = Math.min(hi - y - 0.06, 0.45), c = BEDDING[Math.floor(R() * BEDDING.length)];
            for (const p of it.parts) put(g, p.geo, partMat(p.mat, c), bx, y, zc, 'prop-bedding').scale.set(bw / f.x, hh / f.y, depth * 0.72 / f.z);
            break;
          }
          put(g, rbox(bw - R() * 0.06, t, depth * 0.72, 0.045), cloth(BEDDING[Math.floor(R() * BEDDING.length)]), bx + (R() - 0.5) * 0.03, y + t / 2, zc, 'prop-bedding');
          y += t;
        }
      } else if (gap < 0.5) {
        // 선반 많은 칸 · 잡화를 말한 경우 — 모자·가방(칸 높이·폭·깊이에 맞는 것만, 넘치면 줄인다)
        if (ward && (isBed || shelfy || mix.accessory > 0.5) && R() < (isBed ? Math.max(0.45, mix.accessory) : mix.accessory)) {
          const fits = [...ward.hats, ...bagPool(R)].filter(it => fitsIn(it, usable, gap - 0.03));   // 폭·높이 15% 까지만 줄인다
          if (fits.length) { putItem(g, fits[Math.floor(R() * fits.length)], cx, lo, zc, usable, gap - 0.03, depth - 0.12); continue; }
        }
        // 개어 둔 스웨터 더미 1~2개(사용자 지시 2026-11-04 — 스웨터류는 접어서)
        const n = Math.max(1, Math.floor((usable + 0.02) / 0.32)), sw = Math.min(0.3, usable / n - 0.02);   // 더미 폭은 장마다 같게(최대 30cm)
        for (let j = 0; j < n; j++) {
          if (R() < 0.05 && !isBed) continue;   // 가끔 한 더미 비움 — 이불장 작은 칸은 비우지 않는다
          let y = lo;
          const h = Math.min(gap - 0.05, 0.2 + R() * 0.15);
          const xj = cx - usable / 2 + (j + 0.5) * (usable / n) + (R() - 0.5) * 0.01, dz = Math.min(0.36, depth - 0.16);
          if (ward?.hvFold.length && R() < (mix.kids ? 0.2 : 0.65)) {
            // 홈뷰 실물 — 이미 쌓인 더미 하나, 아니면 한 벌씩 골라 쌓는다(벌마다 다른 옷 · 앞뒤를 가끔 뒤집어)
            if (ward.hvStacks.length && R() < 0.35) { putItem(g, ward.hvStacks[Math.floor(R() * ward.hvStacks.length)], xj, lo, zc + 0.02, sw, gap - 0.04, dz); continue; }
            while (y < lo + h) {
              const it = ward.hvFold[Math.floor(R() * ward.hvFold.length)], s = Math.min(1, sw / it.size.x, dz / it.size.z), t = it.size.y * s;
              if (y + t > hi - 0.03) break;
              const ry = (R() < 0.5 ? Math.PI : 0) + (R() - 0.5) * 0.08;
              for (const p of it.parts) { const o = put(g, p.geo, p.mat, xj, y, zc + 0.02, 'prop-folded'); o.scale.setScalar(s); o.rotation.y = ry; }
              y += t * 0.9;                                                   // 천이라 살짝 눌려 겹친다
            }
            continue;
          }
          while (y < lo + h) {
            if (ward) {
              const t = 0.045 + R() * 0.03;
              if (y + t > hi - 0.03) break;
              const pal = mix.kids ? KIDS : KNIT;
              const f = ward.fold3, o = put(g, ward.fold.geo, foldMat(pal[Math.floor(R() * pal.length)]),
                cx - usable / 2 + (j + 0.5) * (usable / n) + (R() - 0.5) * 0.01, y, zc + 0.02, 'prop-folded');
              o.scale.set((sw - R() * 0.02) / f.x, t / f.y, Math.min(0.3, depth - 0.2) / f.z);
              y += t;
              continue;
            }
            const t = 0.035 + R() * 0.03;
            put(g, rbox(sw - R() * 0.02, t, Math.min(0.3, depth - 0.2), 0.012), cloth(WEAR[Math.floor(R() * WEAR.length)]),
              cx - usable / 2 + (j + 0.5) * (usable / n) + (R() - 0.5) * 0.01, y + t / 2, zc + 0.02, 'prop-folded');
            y += t;
          }
        }
      } else if (isBed || R() < 0.75) {
        // 수납 상자 · 바구니 · 가방(이불장 작은 칸은 비우지 않는다)
        const bw = Math.min(usable - 0.02, 0.32), bh = Math.min(gap - 0.08, 0.26 + R() * 0.06);
        if (ward) {
          const bd = Math.min(0.36, depth - 0.16);
          const r3 = R();
          const bp = bagPool(R);
          let it = r3 < mix.accessory * 0.6 ? bp[Math.floor(R() * bp.length)] : r3 < 0.45 ? ward.box : r3 < 0.6 ? ward.suitcase : ward.baskets[Math.floor(R() * ward.baskets.length)];
          // 자리에 안 맞으면 맞는 것으로 바꾼다 — 없으면 비운다
          if (!fitsIn(it, usable - 0.02, gap - 0.04)) {
            const ok = [ward.box, ward.suitcase, ...ward.baskets, ...bp].filter(x => fitsIn(x, usable - 0.02, gap - 0.04));
            if (!ok.length) continue;
            it = ok[Math.floor(R() * ok.length)];
          }
          putItem(g, it, cx, lo, zc, usable - 0.02, gap - 0.04, bd);
          continue;
        }
        put(g, rbox(bw, bh, Math.min(0.36, depth - 0.16), 0.01), R() < 0.5 ? boxMat : basketMat, cx, lo + bh / 2, zc, 'prop-box');
      }
      }
    }
  });
  // ---- 액세서리 놓기
  for (const t of trayShelves) {
    const small = !acc.trayL, h = Math.min(small ? 0.075 : 0.15, t.gap - 0.03), d = Math.min(0.34, depth - 0.16);
    const geo = trayGeos(TRAY_W, d, h, small), x0 = (t.x0 + t.x1) / 2 - (t.n * TRAY_STEP - 0.008) / 2 + TRAY_W / 2;
    for (let k = 0; k < t.n; k++) put(g, geo, trayMat, x0 + k * TRAY_STEP, t.y + 0.001, zc, 'prop-acc');
  }
  if (acc.scarf && scarfRod) {
    const len = Math.min(0.34, depth - 0.16);
    put(g, scarfGeos(len), chromeMat, scarfRod.x1 - 0.03, scarfRod.y - 0.07, bb.min.z + 0.06, 'prop-acc');
  }
  // 칸 그룹 좌표로
  host.add(g);
  g.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(host.matrixWorld).invert();
  g.applyMatrix4(inv);
  return g;
}
