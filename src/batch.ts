// 드로우콜 줄이기 — 움직이지 않는 메시를 재질별로 한 덩어리로 합친다(2026-10-30 「드로우콜을 최대로 줄여」).
// 그림자·거울 반사·실내 환경맵이 장면을 몇 번씩 다시 그리므로, 메시 수가 줄면 그 패스들이 함께 준다.
//  - 같은 재질(같은 객체)끼리 합친다. 불러온 모델 재질(userData.shareable)은 값이 같으면 다른 객체여도 하나로 본다
//  - 그림자: 작은 것(가장 긴 변 < shadowMin)은 그림자를 드리우지 않는다 — 그림자 패스마다 드로우콜이 붙는다
//  - 합친 지오메트리는 이 덩어리만의 것 — 방·장을 다시 만들 때 disposeBatched 로 버린다(원본 지오메트리는 모델 캐시가 공유해 버리지 않는다)
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const texKey = (t: THREE.Texture | null | undefined) =>
  t ? `${t.source.uuid}:${t.repeat.x},${t.repeat.y}:${t.offset.x},${t.offset.y}:${t.rotation}:${t.wrapS}${t.wrapT}:${t.channel}:${t.flipY}` : '';
const PROPS = ['roughness', 'metalness', 'opacity', 'transparent', 'alphaTest', 'side', 'shadowSide', 'envMapIntensity', 'emissiveIntensity', 'vertexColors', 'flatShading',
  'sheen', 'sheenRoughness', 'clearcoat', 'clearcoatRoughness', 'transmission', 'thickness', 'ior', 'specularIntensity', 'iridescence', 'anisotropy', 'depthWrite', 'polygonOffset', 'aoMapIntensity'] as const;
const MAPS = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'alphaMap', 'emissiveMap', 'bumpMap', 'sheenColorMap', 'clearcoatMap', 'specularIntensityMap'] as const;
function matKey(m: THREE.Material): string {
  if (!m.userData.shareable) return m.uuid;
  const a = m as any;
  return [m.type, a.color?.getHexString(), a.emissive?.getHexString(), a.sheenColor?.getHexString(), a.normalScale ? `${a.normalScale.x},${a.normalScale.y}` : '', a.bumpScale,
    ...PROPS.map(k => a[k]), ...MAPS.map(k => texKey(a[k])), texKey(m.userData.prodAOMap), m.userData.vao ? 'vao' : ''].join('|');   // 구운 그늘(그늘막용)이 다르면 합치지 않는다
}
function attrKey(g: THREE.BufferGeometry) {
  return Object.keys(g.attributes).sort().map(k => { const at = g.attributes[k] as THREE.BufferAttribute; return `${k}${at.itemSize}${at.normalized ? 'n' : ''}${(at.array as any).constructor.name}`; }).join(',') + (g.index ? '#i' : '#n');
}

export type BatchOpts = {
  /** 이 노드(와 그 아래)는 건드리지 않는다 — 움직이는 것 · 눌러서 고르는 것 · 재질을 바꿔 끼우는 것 */
  skip?: (o: THREE.Object3D) => boolean;
  /** 가장 긴 변이 이보다 작으면 그림자를 드리우지 않는다(m) */
  shadowMin?: number;
  /** 합친 메시 이름 · userData(고르기용 slot 등) */
  name?: string;
  userData?: Record<string, unknown>;
};

/** sources 아래의 고정 메시를 합쳐 target 에 단다. 합친 수(드로우콜이 준 수)를 돌려준다 */
export function batchStatic(sources: THREE.Object3D[], target: THREE.Object3D, opt: BatchOpts = {}): number {
  target.updateMatrixWorld(true);
  const inv = target.matrixWorld.clone().invert();
  const shared = new Map<string, THREE.Material>();
  const buckets = new Map<string, { mat: THREE.Material; cast: boolean; recv: boolean; items: { mesh: THREE.Mesh; m: THREE.Matrix4 }[] }>();
  const box = new THREE.Box3(), size = new THREE.Vector3();
  const visit = (o: THREE.Object3D) => {
    if (!o.visible || opt.skip?.(o)) return;
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh && !(mesh as any).isInstancedMesh && !(mesh as any).isSkinnedMesh && !Array.isArray(mesh.material)
      && !Object.keys(mesh.geometry.morphAttributes).length && mesh.geometry.attributes.position && !mesh.children.length) {
      const mt = mesh.material as THREE.Material;
      const mk = matKey(mt);
      if (!shared.has(mk)) shared.set(mk, mt);
      let cast = mesh.castShadow;
      if (cast && opt.shadowMin) {
        box.setFromObject(mesh).getSize(size);
        if (Math.max(size.x, size.y, size.z) < opt.shadowMin) cast = false;
      }
      const k = `${mk}|${attrKey(mesh.geometry)}|${cast}|${mesh.receiveShadow}|${mesh.renderOrder}`;
      let b = buckets.get(k);
      if (!b) buckets.set(k, b = { mat: shared.get(mk)!, cast, recv: mesh.receiveShadow, items: [] });
      b.items.push({ mesh, m: inv.clone().multiply(mesh.matrixWorld) });
      return;
    }
    for (const c of [...o.children]) visit(c);
  };
  for (const s of sources) { s.updateMatrixWorld(true); visit(s); }
  let saved = 0;
  for (const b of buckets.values()) {
    // 하나뿐이어도 그림자 여부가 바뀌었으면 그대로 둔 채 값만 바꾼다
    if (b.items.length < 2) { const it = b.items[0]; it.mesh.castShadow = b.cast; continue; }
    const geos = b.items.map(it => {
      const g = it.mesh.geometry.clone();
      g.morphAttributes = {};
      g.clearGroups();
      g.applyMatrix4(it.m);
      return g;
    });
    const merged = mergeGeometries(geos, false);
    geos.forEach(g => g.dispose());
    if (!merged) continue;
    merged.computeBoundingBox(); merged.computeBoundingSphere();
    const mesh = new THREE.Mesh(merged, b.mat);
    mesh.castShadow = b.cast; mesh.receiveShadow = b.recv;
    mesh.name = opt.name ?? 'batched';
    Object.assign(mesh.userData, opt.userData, { batched: true });
    target.add(mesh);
    for (const it of b.items) it.mesh.removeFromParent();
    saved += b.items.length - 1;
  }
  return saved;
}

/** 합친 지오메트리 버리기 — 방·장을 다시 만들기 전에 */
export function disposeBatched(root: THREE.Object3D) {
  root.traverse(o => { if (o.userData.batched) (o as THREE.Mesh).geometry.dispose(); });
}
