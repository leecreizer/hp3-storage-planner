// 가구 밑 접촉 그림자 — 가구가 바닥에 붙어 보이게 묶음(hv-unit)마다 바닥에 부드러운 그늘판을 깐다(사용자 요청 2026-11-04 「MuTracer 처럼 자연스러운 그림자」 2안).
// 실시간 화면은 그림자 지도가 해·메인 조명 방향 그림자만 만들어, 하늘·벽에서 고르게 드는 빛이 가구 밑에서 막혀 생기는 그늘이 없다.
// 묶음 형상을 위에서 내려다본 모양을 2cm 격자에 칠하고(바닥에 가까운 면일수록 진하게) 번지게 해서 투명한 검은 판으로 깐다.
//  - 가까운 그늘: 바닥 35cm 안 면, 6cm 번짐 — 다리·밑판이 바닥에 닿는 자리
//  - 넓은 그늘: 1.2m 아래 면 전체, 16cm 번짐 — 가구가 가린 하늘빛
// 판은 묶음의 자식이라 끌어 옮기고 돌려도 따라간다. 실사(경로 추적)·굽기·서펠은 그늘을 직접 계산하므로 숨긴다(scene.ts setMode · embed.ts)
import * as THREE from 'three';

export const CONTACT_NAME = 'contact-shadow';
const CELL = 0.02, PAD = 0.24, MAXN = 256;
const NEAR_H = 0.35, FAR_H = 1.2;
const NEAR_K = 0.55, FAR_K = 0.32;          // 진하기(불투명도) — 바로 밑이 가장 진한 곳 기준

const made: { tex: THREE.Texture; geo: THREE.BufferGeometry; mat: THREE.Material }[] = [];
/** 지난 방에서 만든 그늘판 텍스처·지오메트리 버리기 */
function release() { for (const m of made) { m.tex.dispose(); m.geo.dispose(); m.mat.dispose(); } made.length = 0; }

/** 분리 가능한 상자 번짐 3번 ≈ 가우시안(sigma ≈ r) */
function blur(a: Float32Array, w: number, h: number, r: number) {
  if (r < 1) return;
  const t = new Float32Array(a.length);
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < h; y++) {           // 가로
      let s = 0; const row = y * w;
      for (let x = -r; x <= r; x++) s += a[row + Math.min(w - 1, Math.max(0, x))];
      for (let x = 0; x < w; x++) {
        t[row + x] = s / (2 * r + 1);
        s += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < w; x++) {           // 세로
      let s = 0;
      for (let y = -r; y <= r; y++) s += t[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = s / (2 * r + 1);
        s += t[Math.min(h - 1, y + r + 1) * w + x] - t[Math.max(0, y - r) * w + x];
      }
    }
  }
}

/** 묶음 하나의 그늘판 — 묶음 좌표(돌리기 전)로 만들어 묶음에 단다. 바닥에 서지 않은 묶음(벽 장식)은 건너뛴다 */
function addOne(u: THREE.Object3D, floorY: (x0: number, x1: number, z0: number, z1: number) => number) {
  u.updateMatrixWorld(true);
  const inv = u.matrixWorld.clone().invert(), m = new THREE.Matrix4();
  const tris: number[] = [];                // x,y,z ×3
  let minY = Infinity;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  u.traverse(o => {
    const me = o as THREE.Mesh;
    if (!me.isMesh || !me.visible || o.name === CONTACT_NAME) return;
    const mt = [me.material].flat()[0] as THREE.Material | undefined;
    if (mt?.transparent && (mt.opacity ?? 1) < 0.5) return;
    const pos = me.geometry.getAttribute('position'); if (!pos) return;
    const idx = me.geometry.index;
    m.multiplyMatrices(inv, me.matrixWorld);
    const n = idx ? idx.count : pos.count;
    for (let k = 0; k + 2 < n; k += 3) {
      const i0 = idx ? idx.getX(k) : k, i1 = idx ? idx.getX(k + 1) : k + 1, i2 = idx ? idx.getX(k + 2) : k + 2;
      a.fromBufferAttribute(pos, i0).applyMatrix4(m); b.fromBufferAttribute(pos, i1).applyMatrix4(m); c.fromBufferAttribute(pos, i2).applyMatrix4(m);
      const ty = Math.min(a.y, b.y, c.y);
      if (ty > FAR_H) continue;
      minY = Math.min(minY, ty);
      tris.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
    }
  });
  if (!tris.length || minY > 0.06) return;   // 바닥에서 뜬 묶음(벽 장식·벽 선반)
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (let k = 0; k < tris.length; k += 3) { x0 = Math.min(x0, tris[k]); x1 = Math.max(x1, tris[k]); z0 = Math.min(z0, tris[k + 2]); z1 = Math.max(z1, tris[k + 2]); }
  x0 -= PAD; x1 += PAD; z0 -= PAD; z1 += PAD;
  const cell = Math.max(CELL, (x1 - x0) / MAXN, (z1 - z0) / MAXN);
  const W = Math.ceil((x1 - x0) / cell), H = Math.ceil((z1 - z0) / cell);
  const near = new Float32Array(W * H), far = new Float32Array(W * H);
  const put = (gx: number, gz: number, wn: number, wf: number) => {
    if (gx < 0 || gz < 0 || gx >= W || gz >= H) return;
    const i = gz * W + gx; if (wn > near[i]) near[i] = wn; if (wf > far[i]) far[i] = wf;
  };
  // 삼각형을 바닥(xz)에 비춰 칠한다 — 칸 가운데가 삼각형 안이면. 옆을 보는 얇은 삼각형은 꼭짓점 칸도 칠한다
  for (let k = 0; k < tris.length; k += 9) {
    const ax = tris[k], az = tris[k + 2], bx = tris[k + 3], bz = tris[k + 5], cx = tris[k + 6], cz = tris[k + 8];
    const ty = Math.min(tris[k + 1], tris[k + 4], tris[k + 7]);
    const wn = ty < NEAR_H ? Math.pow(1 - ty / NEAR_H, 1.5) : 0;
    const wf = 1 - ty / FAR_H;
    const gx0 = Math.floor((Math.min(ax, bx, cx) - x0) / cell), gx1 = Math.floor((Math.max(ax, bx, cx) - x0) / cell);
    const gz0 = Math.floor((Math.min(az, bz, cz) - z0) / cell), gz1 = Math.floor((Math.max(az, bz, cz) - z0) / cell);
    const d = (bz - cz) * (ax - cx) + (cx - bx) * (az - cz);
    if (Math.abs(d) > 1e-10 && (gx1 - gx0) * (gz1 - gz0) < 4000) {
      for (let gz = gz0; gz <= gz1; gz++) for (let gx = gx0; gx <= gx1; gx++) {
        const px = x0 + (gx + 0.5) * cell, pz = z0 + (gz + 0.5) * cell;
        const l1 = ((bz - cz) * (px - cx) + (cx - bx) * (pz - cz)) / d, l2 = ((cz - az) * (px - cx) + (ax - cx) * (pz - cz)) / d;
        if (l1 >= -0.02 && l2 >= -0.02 && l1 + l2 <= 1.02) put(gx, gz, wn, wf);
      }
    }
    for (const [vx, vz] of [[ax, az], [bx, bz], [cx, cz]]) put(Math.floor((vx - x0) / cell), Math.floor((vz - z0) / cell), wn, wf);
  }
  blur(near, W, H, Math.max(1, Math.round(0.06 / cell)));
  blur(far, W, H, Math.max(1, Math.round(0.16 / cell)));
  const data = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const al = Math.min(1, near[i] * NEAR_K + far[i] * FAR_K);
    data[i * 4 + 3] = Math.round(al * 255);
  }
  const tex = new THREE.DataTexture(data, W, H, THREE.RGBAFormat);
  tex.magFilter = tex.minFilter = THREE.LinearFilter; tex.needsUpdate = true;
  const geo = new THREE.PlaneGeometry(W * cell, H * cell);
  geo.rotateX(-Math.PI / 2);                // 칸 (0,0) = (x0, z0) 이 텍스처 v=0 — 눕히면 v 가 +z 로 간다
  geo.scale(1, 1, -1);                      // 뒤집힌 z 를 바로잡고
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({ color: 0x000000, map: tex, transparent: true, depthWrite: false, toneMapped: false,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  mat.side = THREE.DoubleSide;
  const p = new THREE.Mesh(geo, mat);
  p.name = CONTACT_NAME; p.castShadow = p.receiveShadow = false; p.renderOrder = 1;
  p.raycast = () => {};                     // 가구 고르기를 가리지 않게
  // 바닥(깔개가 밑에 있으면 깔개 위) 1.5mm 위
  p.position.set((x0 + x1) / 2, floorY(x0, x1, z0, z1) + 0.0015, (z0 + z1) / 2);
  u.add(p);
  made.push({ tex, geo, mat });
}

/** 방의 가구 묶음마다 그늘판 — 묶음을 합치기(batchRoom) 전에 부른다. 깔개 묶음은 그늘을 받는 쪽이라 건너뛴다 */
export function addContactShadows(room: THREE.Object3D, visible: boolean) {
  const t0 = performance.now();
  release();
  const units = room.children.filter(o => o.name === 'hv-unit');
  room.updateMatrixWorld(true);
  const rugs = units.filter(u => u.userData.kind === 'rug').map(u => new THREE.Box3().setFromObject(u));
  for (const u of units) {
    const k = u.userData.kind;
    if (k === 'rug' || k === 'decor') continue;
    // 묶음 좌표 상자 → 방 좌표에서 겹치는 깔개 윗면 높이
    const floorY = (ax: number, bx: number, az: number, bz: number) => {
      const bb = new THREE.Box3(new THREE.Vector3(ax, 0, az), new THREE.Vector3(bx, 0.01, bz)).applyMatrix4(u.matrixWorld);
      let y = 0;
      for (const r of rugs) if (r.max.x > bb.min.x && r.min.x < bb.max.x && r.max.z > bb.min.z && r.min.z < bb.max.z) y = Math.max(y, r.max.y);
      return y - u.position.y;
    };
    addOne(u, floorY);
    u.traverse(o => { if (o.name === CONTACT_NAME) o.visible = visible; });
  }  console.info('[가구 밑 그림자]', made.length, '개', Math.round(performance.now() - t0), 'ms');
}

/** 실시간 화면에서만 보이게 / 후처리 메뉴 켜기·끄기 */
export function setContactVisible(root: THREE.Object3D, v: boolean) {
  root.traverse(o => { if (o.name === CONTACT_NAME) o.visible = v; });
}
