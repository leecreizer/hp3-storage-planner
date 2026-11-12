// 방 부속 모델 — 창문(창틀·미닫이 창짝·유리·창대) · 커튼 · 맞은편 침대와 침구. 전부 코드로 만든 단순 형상(단위 m)
// 좌표는 scene.ts 방과 같다: x = 붙박이장 왼쪽 끝 0, y = 바닥 0, z = 뒷벽(붙박이장 벽) 0 → 앞 +
import * as THREE from 'three';
import { loadDoing, loadMark } from './loadlog';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const pvc = new THREE.MeshPhysicalMaterial({ color: '#f1f1ee', roughness: 0.35 });
// 유리 — 반투명(opacity). 실사(MuTracer)는 그림자 광선에도 투명도를 적용해 햇빛 줄무늬가 막히지 않는다(docs/materials.md Alpha)
const glass = new THREE.MeshPhysicalMaterial({ color: '#dfe9ec', roughness: 0.03, metalness: 0, transparent: true, opacity: 0.12, depthWrite: false });
const sillMat = new THREE.MeshPhysicalMaterial({ color: '#ecebe6', roughness: 0.3, clearcoat: 0.3 });
// 한 면(실내 쪽)만 — 양면이면 창으로 든 햇빛이 뒷면 대신 앞면을 밝혀 창 윗선 높이에 밝기 경계가 졌다. 그림자는 양면으로
export const drapeMat = new THREE.MeshPhysicalMaterial({ color: '#ddd5c6', roughness: 0.95, sheen: 0.6, sheenColor: '#ffffff', sheenRoughness: 0.8, shadowSide: THREE.DoubleSide });
const railMat = new THREE.MeshPhysicalMaterial({ color: '#f6f5f2', roughness: 0.5 });

function box(g: THREE.Group, w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, name: string, shadow = true) {
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  b.position.set(x + w / 2, y + h / 2, z + d / 2); b.name = name;
  b.castShadow = shadow; b.receiveShadow = true;
  g.add(b); return b;
}
function soft(g: THREE.Group, w: number, h: number, d: number, r: number, m: THREE.Material, cx: number, cy: number, cz: number, name: string) {
  const b = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2) - 1e-4), m);
  b.position.set(cx, cy, cz); b.name = name; b.castShadow = b.receiveShadow = true;
  g.add(b); return b;
}

/** 창 — 오른쪽 벽(x = wx 부터 두께 T) 개구부 z0~z1 · y0~y1. 바깥틀 + 미닫이 창짝 2짝 + 유리 + 실내 창대 */
export function addWindow(g: THREE.Group, wx: number, z0: number, z1: number, y0: number, y1: number) {
  const f = 0.06, fd = 0.08, fx = wx + 0.02;          // 바깥틀 굵기·깊이
  box(g, fd, y1 - y0, f, pvc, fx, y0, z0, 'window-frame');
  box(g, fd, y1 - y0, f, pvc, fx, y0, z1 - f, 'window-frame');
  box(g, fd, f, z1 - z0 - 2 * f, pvc, fx, y1 - f, z0 + f, 'window-frame');
  box(g, fd, f, z1 - z0 - 2 * f, pvc, fx, y0, z0 + f, 'window-frame');
  // 창짝 — 안쪽 레일(실내 쪽)에 앞 짝, 바깥 레일에 뒤 짝. 가운데서 5cm 겹친다
  const iz0 = z0 + f, iz1 = z1 - f, iy0 = y0 + f, iy1 = y1 - f;
  const sw = (iz1 - iz0) / 2 + 0.025, s = 0.05, sd = 0.035;
  const sash = (x: number, za: number) => {
    box(g, sd, iy1 - iy0, s, pvc, x, iy0, za, 'window-sash');
    box(g, sd, iy1 - iy0, s, pvc, x, iy0, za + sw - s, 'window-sash');
    box(g, sd, s, sw - 2 * s, pvc, x, iy1 - s, za + s, 'window-sash');
    box(g, sd, s, sw - 2 * s, pvc, x, iy0, za + s, 'window-sash');
    box(g, 0.006, iy1 - iy0 - 2 * s, sw - 2 * s, glass, x + sd / 2 - 0.003, iy0 + s, za + s, 'window-glass', false);
  };
  sash(fx + 0.003, iz0);                 // 실내 쪽 짝(왼쪽 = 붙박이장 쪽)
  sash(fx + 0.042, iz1 - sw);            // 바깥 짝(오른쪽)
  // 실내 창대 — 벽면에서 4cm 나온 판. 윗면을 개구부 아래 벽 윗면(y0)보다 3mm 높게 — 같은 높이면 두 면이 겹쳐 자글거렸다(사용자 지적 2026-11-04)
  box(g, 0.06, 0.028, z1 - z0 + 0.08, sillMat, wx - 0.04, y0 - 0.025, z0 - 0.04, 'window-sill');
}

/** 주름 커튼 한 폭 — 위는 촘촘히 잡히고 아래로 갈수록 주름이 벌어진다. 벽(x = wx)과 나란히, 실내 쪽(-x)을 본다 */
function drape(width: number, height: number, folds: number, depth: number) {
  const nu = folds * 8, nv = 24;
  const pos: number[] = [], idx: number[] = [];
  for (let j = 0; j <= nv; j++) {
    const v = j / nv, y = v * height;                      // 0 = 아래
    const amp = depth * (0.55 + 0.45 * (1 - v));           // 아래로 갈수록 깊은 주름
    for (let i = 0; i <= nu; i++) {
      const u = i / nu;
      pos.push(-amp * (0.5 - 0.5 * Math.cos(u * folds * Math.PI * 2)), y, u * width);
    }
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
    idx.push(a, b, c, b, d, c);                          // 앞면 = 실내 쪽(-x)
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx); geo.computeVertexNormals();
  return geo;
}

/** 커튼 — 천장 속 커튼 박스(윗면 top)에 단 레일 + 창 양옆으로 걷어 둔 두 폭. zMin 은 붙박이장 앞(벽에 붙은 장과 겹치지 않게) */
export function addCurtains(g: THREE.Group, wx: number, z0: number, z1: number, H: number, zMin: number) {
  const off = 0.12;                                        // 벽에서 커튼까지
  const za = Math.max(zMin, z0 - 0.3), zb = z1 + 0.3;
  box(g, 0.035, 0.022, zb - za + 0.04, railMat, wx - off - 0.0175, H - 0.022, za - 0.02, 'curtain-rail');
  const h = H - 0.03 - 0.015;                              // 레일 아래(박스 속) ~ 바닥 1.5cm 위
  const w = 0.55;
  for (const zs of [za, zb - w]) {
    const m = new THREE.Mesh(drape(w, h, 6, 0.09), drapeMat);
    m.position.set(wx - off + 0.045, 0.015, zs); m.name = 'curtain';
    m.castShadow = m.receiveShadow = true;
    g.add(m);
  }
}

// ---------------------------------------------------------------- 침대 · 침구 (고품질 — 형상으로 주름·볼륨을 만든다)
const fabric = (color: string, sheen: string, rough = 0.92, sheenAmt = 0.7) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: rough, sheen: sheenAmt, sheenColor: sheen, sheenRoughness: 0.6 });
const headMat = fabric('#9b9184', '#e4ddd2', 0.95, 0.8);          // 헤드보드·프레임 — 웜그레이 패브릭
const legMat = new THREE.MeshPhysicalMaterial({ color: '#6b4f38', roughness: 0.45, clearcoat: 0.25, clearcoatRoughness: 0.4 });
const mattMat = fabric('#f4f3ef', '#ffffff', 0.88, 0.5);
const pipeMat = fabric('#e2e0da', '#ffffff', 0.85, 0.4);
const duvetMat = fabric('#f2efe8', '#ffffff', 0.93, 0.8);           // 이불 — 오프화이트 면
duvetMat.side = THREE.DoubleSide;
const throwMat = fabric('#7d8a7f', '#d5ddd6', 0.97, 0.9);           // 발치 블랭킷 — 세이지 니트
throwMat.side = THREE.DoubleSide;
const pillowMat = fabric('#f6f5f1', '#ffffff', 0.9, 0.7);
const cushionA = fabric('#c7a689', '#f2e4d4', 0.95, 0.9);            // 베이지 테라코타
const cushionB = fabric('#5f6b63', '#c9d2cc', 0.95, 0.9);            // 세이지 그린
const woodMat = new THREE.MeshPhysicalMaterial({ color: '#9a7656', roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.35 });
const brassMat = new THREE.MeshPhysicalMaterial({ color: '#b8955a', metalness: 1, roughness: 0.3 });
const ceramicMat = new THREE.MeshPhysicalMaterial({ color: '#e8e3da', roughness: 0.35, clearcoat: 0.6 });
const shadeMat = new THREE.MeshPhysicalMaterial({ color: '#f3eee4', roughness: 0.95, sheen: 0.5, sheenColor: '#ffffff', side: THREE.DoubleSide });
const rugMat = fabric('#cfc6b8', '#efe8dc', 1, 1);
const bookA = new THREE.MeshPhysicalMaterial({ color: '#3d4a52', roughness: 0.7 });
const bookB = new THREE.MeshPhysicalMaterial({ color: '#c9bba4', roughness: 0.7 });

/** 부드러운 값 잡음 — 이불·베개 주름용(결정적이라 다시 만들어도 같은 모양) */
function wrinkle(x: number, z: number, seed = 0) {
  return Math.sin(x * 7.1 + seed) * Math.sin(z * 5.3 + seed * 1.7) * 0.5
    + Math.sin(x * 13.7 - z * 9.1 + seed * 2.3) * 0.3 + Math.sin(x * 23.3 + z * 19.7 + seed) * 0.2;
}
function mesh(g: THREE.Group, geo: THREE.BufferGeometry, m: THREE.Material, name: string) {
  geo.computeVertexNormals();
  const o = new THREE.Mesh(geo, m); o.name = name; o.castShadow = o.receiveShadow = true; g.add(o); return o;
}
/** (u, v) ∈ [0,1]² 격자 곡면 */
function grid(nu: number, nv: number, f: (u: number, v: number) => [number, number, number]) {
  const pos: number[] = [], idx: number[] = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) pos.push(...f(i / nu, j / nv));
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx);
  return geo;
}

/** 덮개 천 — 폭 w · 길이 l 윗면(높이 top, z 0~l)을 덮고 양옆과 발치(z<0 쪽)로 drop 만큼 흘러내린다.
 *  가장자리는 반지름 r 로 둥글게 넘어가고, 늘어진 부분엔 세로 주름, 윗면은 볼륨(puff)과 잔주름 */
function cover(w: number, l: number, top: number, drop: number, r: number, puff: number, seed: number, footHang = true) {
  const arc = r * Math.PI / 2;
  const hangX = arc + drop, hangZ = footHang ? arc + drop : 0;
  const U = w + 2 * hangX, V = l + hangZ;
  return grid(150, 130, (u, v) => {
    const s = (u - 0.5) * U, t = v * V - hangZ;
    const dx = Math.max(0, Math.abs(s) - w / 2), dz = Math.max(0, -t);
    const d = Math.max(dx, dz);
    // 가장자리를 넘어간 거리 d → 바깥으로 나간 h · 내려간 y (둥근 모서리 다음은 수직으로 늘어진다)
    let h: number, y: number;
    if (d <= arc) { const a = d / r; h = r * Math.sin(a); y = r * (1 - Math.cos(a)); }
    else { h = r + (d - arc) * 0.06; y = r + (d - arc); }
    const hang = Math.max(0, d - arc) / Math.max(drop, 1e-3);
    const along = dx >= dz ? t : s;
    const fold = hang * 0.022 * Math.sin(along * 16 + seed) * (0.6 + 0.4 * Math.sin(along * 5.3 + seed));
    const sx = Math.sign(s) || 1;
    let x = s, z = Math.max(t, 0);
    if (d > 0) {
      const off = h + fold;
      if (dx >= dz) { x = sx * (w / 2 + off); z = dz > 0 ? -off * (dz / dx) : Math.max(t, 0); }
      else { z = -off; x = dx > 0 ? sx * (w / 2 + off * (dx / dz)) : s; }
    }
    // 윗면 볼륨 — 가운데 도톰, 가장자리로 줄고 잔주름
    const ex = Math.min(1, (w / 2 - Math.min(Math.abs(s), w / 2)) / 0.25);
    const ez = footHang ? Math.min(1, Math.max(t, 0) / 0.25) : 1;
    const py = d === 0 ? puff * (0.55 + 0.45 * ex * ez) + puff * 0.35 * wrinkle(s, t, seed) : puff * 0.3 * wrinkle(s, t, seed);
    return [x, top - y + py, z];
  });
}

/** 베개 — 초타원체(가장자리로 갈수록 얇아지는 솜 쿠션). w×h, 두께 th, e 가 작을수록 네모 */
function pillowGeo(w: number, h: number, th: number, e: number, seed: number) {
  const sp = (c: number, p: number) => Math.sign(c) * Math.pow(Math.abs(c), p);
  return grid(72, 48, (u, v) => {
    const lon = (u - 0.5) * Math.PI * 2, lat = (v - 0.5) * Math.PI;
    const cl = sp(Math.cos(lat), 0.9), sl = sp(Math.sin(lat), 0.9);
    const x = w / 2 * cl * sp(Math.cos(lon), e), y = h / 2 * cl * sp(Math.sin(lon), e), z = th / 2 * sl;
    const r = Math.hypot(x / (w / 2), y / (h / 2));
    return [x, y, z * (1 - 0.12 * Math.exp(-r * r * 4)) + z * 0.06 * wrinkle(x, y, seed)];
  });
}

/** 침대 + 침구 — 맞은편 벽(z = D)에 헤드보드를 붙인 퀸(1500×2000). cx = 침대 가운데, roomW = 방 폭(협탁은 자리가 될 때만) */
export function addBed(g: THREE.Group, cx: number, D: number, roomW: number) {
  const bed = new THREE.Group(); bed.name = 'bed'; g.add(bed);
  const mw = 1.5, ml = 2.0, fw = mw + 0.1, fl = ml + 0.08;
  const hz = D - 0.1;                                      // 헤드보드 앞면
  const zf = hz - fl;                                      // 프레임 발치
  // 헤드보드 — 세로 채널 누빔 10줄 + 뒤판
  const hbW = fw + 0.12, hbH = 1.1, nCh = 10;
  soft(bed, hbW, hbH - 0.02, 0.05, 0.015, headMat, cx, (hbH - 0.02) / 2, D - 0.04, 'bed-headboard');
  for (let k = 0; k < nCh; k++) {
    const cw = hbW / nCh;
    soft(bed, cw - 0.004, hbH - 0.06, 0.07, 0.03, headMat, cx - hbW / 2 + cw * (k + 0.5), 0.05 + (hbH - 0.06) / 2, hz + 0.03, 'bed-headboard');
  }
  // 프레임 — 패브릭으로 감싼 받침(바닥에서 12cm 들뜸) + 원목 다리 4
  const fb = 0.12, fh = 0.2;
  soft(bed, fw, fh, fl, 0.035, headMat, cx, fb + fh / 2, zf + fl / 2, 'bed-frame');
  for (const sx of [-1, 1]) for (const sz of [0, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.015, fb, 20), legMat);
    leg.position.set(cx + sx * (fw / 2 - 0.08), fb / 2, zf + 0.08 + sz * (fl - 0.16)); leg.name = 'bed-leg';
    leg.castShadow = leg.receiveShadow = true; bed.add(leg);
  }
  // 매트리스 — 둥근 상자 + 윗면 테두리 파이핑
  const mb = fb + fh - 0.03, mh = 0.26, mt = mb + mh;
  const mz = hz - ml / 2 - 0.02;
  soft(bed, mw, mh, ml, 0.06, mattMat, cx, mb + mh / 2, mz, 'bed-mattress');
  const pa = mw / 2 - 0.05, pb = ml / 2 - 0.05, pc = 0.05;
  const rr = new THREE.Shape();
  rr.moveTo(-pa, -pb - pc); rr.lineTo(pa, -pb - pc); rr.quadraticCurveTo(pa + pc, -pb - pc, pa + pc, -pb); rr.lineTo(pa + pc, pb);
  rr.quadraticCurveTo(pa + pc, pb + pc, pa, pb + pc); rr.lineTo(-pa, pb + pc); rr.quadraticCurveTo(-pa - pc, pb + pc, -pa - pc, pb);
  rr.lineTo(-pa - pc, -pb); rr.quadraticCurveTo(-pa - pc, -pb - pc, -pa, -pb - pc);
  const pts = rr.getSpacedPoints(200).slice(0, -1).map(p => new THREE.Vector3(cx + p.x, mt - 0.012, mz + p.y));
  mesh(bed, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 400, 0.008, 8, true), pipeMat, 'bed-piping');
  // 이불 — 매트리스 발치 쪽 74% 를 덮고 양옆·발치로 흘러내린다
  const dl = ml * 0.74, th = 0.05;
  const duv = mesh(bed, cover(mw, dl, mt + th, mh + 0.05, 0.07, 0.04, 1.3), duvetMat, 'bed-duvet');
  duv.position.set(cx, 0, mz - ml / 2);
  // 이불 윗단을 접어 넘긴 단 — 머리 쪽 가장자리를 두툼한 둥근 띠로
  soft(bed, mw + 0.16, 0.07, 0.22, 0.035, duvetMat, cx, mt + th + 0.025, mz - ml / 2 + dl - 0.06, 'bed-duvet-fold');
  // 발치 블랭킷 — 이불 위를 가로질러 양옆으로 늘어진다
  const thr = mesh(bed, cover(mw + 0.12, 0.5, mt + th + 0.05, mh, 0.08, 0.012, 4.1, false), throwMat, 'bed-throw');
  thr.position.set(cx, 0, mz - ml / 2 + 0.16);
  // 베개 2(뒤, 기대 세움) · 유로 쿠션 2 · 작은 쿠션 1
  const pil = (x: number, z: number, w: number, h: number, t: number, tilt: number, yaw: number, m: THREE.Material, seed: number, name: string) => {
    const o = mesh(bed, pillowGeo(w, h, t, 0.25, seed), m, name);
    o.position.set(x, mt + (h / 2) * Math.cos(tilt) + 0.005, z);
    o.rotation.set(-tilt, yaw, 0, 'YXZ');
  };
  pil(cx - 0.37, hz - 0.13, 0.68, 0.46, 0.17, 0.32, 0.02, pillowMat, 1, 'bed-pillow');
  pil(cx + 0.37, hz - 0.13, 0.68, 0.46, 0.17, 0.32, -0.03, pillowMat, 2, 'bed-pillow');
  pil(cx - 0.3, hz - 0.3, 0.5, 0.42, 0.15, 0.24, 0.05, cushionA, 3, 'bed-cushion');
  pil(cx + 0.3, hz - 0.3, 0.5, 0.42, 0.15, 0.24, -0.06, cushionB, 4, 'bed-cushion');
  pil(cx + 0.02, hz - 0.44, 0.42, 0.28, 0.13, 0.18, 0.08, cushionA, 5, 'bed-cushion');
  // 러그 — 침대 아래에서 발치 쪽으로 나온다
  const rugW = Math.min(fw + 0.9, roomW - 0.3), rugL = fl * 0.65 + 0.6;
  soft(bed, rugW, 0.012, rugL, 0.006, rugMat, cx, 0.006, zf - 0.6 + rugL / 2, 'rug');
  // 협탁 + 스탠드 + 책 — 침대 양옆에 55cm 이상 남을 때만
  const side = (roomW - hbW) / 2;
  if (side >= 0.55) for (const sgn of [-1, 1]) {
    const nx = cx + sgn * (hbW / 2 + 0.04 + 0.23), nz = D - 0.23, nw = 0.46, nd = 0.4, nh = 0.5, lg = 0.12;
    soft(bed, nw, nh - lg, nd, 0.012, woodMat, nx, lg + (nh - lg) / 2, nz, 'nightstand');
    for (const k of [0, 1]) {                                 // 서랍 앞판 2 · 손잡이
      const dh = (nh - lg - 0.03) / 2, dy = lg + 0.012 + dh * k + dh / 2;
      soft(bed, nw - 0.03, dh - 0.008, 0.012, 0.004, woodMat, nx, dy, nz - nd / 2 - 0.004, 'nightstand-drawer');
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), brassMat);
      knob.position.set(nx, dy, nz - nd / 2 - 0.016); knob.name = 'nightstand-knob'; knob.castShadow = true; bed.add(knob);
    }
    for (const lx of [-1, 1]) for (const lz of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.01, lg, 14), legMat);
      leg.position.set(nx + lx * (nw / 2 - 0.04), lg / 2, nz + lz * (nd / 2 - 0.04)); leg.castShadow = true; leg.name = 'nightstand-leg'; bed.add(leg);
    }
    // 스탠드 — 도자기 몸통 + 천 갓(불은 켜지 않는다 — 조명 기준값을 바꾸지 않는다)
    const prof = [0.0001, 0.07, 0.085, 0.08, 0.05, 0.02, 0.012, 0.0001].map((r, i) => new THREE.Vector2(r, i * 0.04));
    const lamp = new THREE.Mesh(new THREE.LatheGeometry(prof, 32), ceramicMat);
    lamp.position.set(nx + sgn * 0.06, nh, nz + 0.02); lamp.castShadow = lamp.receiveShadow = true; lamp.name = 'lamp-base'; bed.add(lamp);
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.2, 40, 1, true), shadeMat);
    shade.position.set(nx + sgn * 0.06, nh + 0.38, nz + 0.02); shade.castShadow = true; shade.name = 'lamp-shade'; bed.add(shade);
    const book = (h: number, y: number, rot: number, m: THREE.Material) => {
      const bk = new THREE.Mesh(new THREE.BoxGeometry(0.22, h, 0.16), m);
      bk.position.set(nx - sgn * 0.09, y + h / 2, nz - 0.03); bk.rotation.y = rot; bk.castShadow = bk.receiveShadow = true; bk.name = 'book'; bed.add(bk);
    };
    book(0.03, nh, 0.1, bookA); book(0.022, nh + 0.03, -0.12, bookB);
  }
}

// ---------------------------------------------------------------- 홈뷰 한샘 상품(실제 모델)으로 방 꾸미기
// public/props/room — 자산 폴더(VITE_ASSET_ROOT)/homvue 변환본 사본(사용자 지시 2026-10-29: 커튼·침대·침구·옆 선반장을 홈뷰에서)
//   bed      페블 침대 부클베이지 K (ABIB02082)     nightstand  유로 606 시에나 협탁 월넛 (ACIB00570)
//   shelf    유로 501 플랫 퓨어오크 2단 책장 800 (BKIC04243)
//   bedding  침구 세트(3FO4ED7GF0Q5, 매트리스 포함)  curtain     홈뷰 커튼(꼭짓점 126만 → 단순화 8%, 98MB → 8.3MB)
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const roomLoader = new GLTFLoader();
const roomCache = new Map<string, Promise<THREE.Object3D>>();
const roomLoaded = new Map<string, THREE.Object3D>();
const cachedGeo = new WeakSet<THREE.BufferGeometry>();
/** 모델 캐시가 가진 지오메트리인가 — 방을 다시 만들 때 이것만 남기고 버린다(놓을 때마다 복제가 같은 지오메트리를 쓴다) */
export const isCachedGeometry = (g: THREE.BufferGeometry) => cachedGeo.has(g);
/** 설비 모델(props/fix/*.glb) — 방 소품과 같은 길(캐시 · 재질 하나로). 흰 플라스틱이라 무광 + 코팅 */
export const fixtureModelGlb = (name: string) => roomModel('fix/' + name, () => 'matte');
/** 지금 장면에서 안 쓰는 방 모델 텍스처를 GPU 에서 내린다 — 방 스타일을 바꿀 때마다 앞 스타일 텍스처가 남아 메모리가 늘었다(582 → 아기방 전환 후 542MB 중
 *  상당분이 이전 스타일 것, 2026-10-30). 모델·이미지는 캐시에 남으므로 다시 쓰면 그때 다시 올린다 */
export function releaseRoomTextures(inUse: Set<THREE.Texture>, geoInUse: Set<THREE.BufferGeometry>) {
  for (const sc of roomLoaded.values()) sc.traverse(o => {
    // 지오메트리도 — 들렀던 스타일 모델의 꼭짓점 버퍼가 남아 있었다(스타일 4개 → 43 → 65MB)
    const g = (o as THREE.Mesh).geometry; if (g && !geoInUse.has(g)) g.dispose();
    const m = (o as THREE.Mesh).material; if (!m) return;
    for (const mt of [m].flat()) for (const v of Object.values(mt)) if ((v as THREE.Texture)?.isTexture && !inUse.has(v as THREE.Texture)) (v as THREE.Texture).dispose();
  });
}
// 재질 바로잡기 — 홈뷰 변환본은 천(침구·커튼·침대 패브릭)의 거칠기가 0 이라 플라스틱처럼 번들거렸고(사용자 지적 2026-10-29)
// 원목도 0.2 로 지나치게 반짝였다. 모델마다 재질 종류를 정해 물리 재질로 바꾼다(지도·노멀·투명은 그대로)
type MatKind = 'fabric' | 'sheer' | 'wood' | 'metal' | 'matte';
const MAT_RULE: Record<string, (m: THREE.MeshStandardMaterial) => MatKind> = {
  bedding: m => (m.transparent ? 'sheer' : 'fabric'),
  bed: m => (m.map ? 'fabric' : 'matte'),                      // 부클 패브릭 · 받침·다리
  curtain: m => (/In/.test(m.name) ? 'sheer' : /Rail/.test(m.name) ? 'metal' : 'fabric'),
  nightstand: m => (m.map ? 'wood' : 'metal'),
  rug: () => 'fabric',
  shelf: m => (m.map ? 'wood' : 'matte'),
};
/** 방 스타일 가구 재질 — 홈뷰 변환본은 거칠기 0 이라 번들거린다. 이름으로 종류를 정한다 */
function styleRule(name: string): ((m: THREE.MeshStandardMaterial) => MatKind) | undefined {
  if (!name.startsWith('style/')) return undefined;
  if (/mat$/.test(name)) return () => 'fabric';
  if (/bed$/.test(name)) return m => (m.map ? 'fabric' : 'matte');
  if (/chair$/.test(name)) return m => (m.metalness > 0.5 ? 'metal' : 'matte');
  return m => (m.metalness > 0.5 ? 'metal' : m.map ? 'wood' : 'matte');
}
function fixMaterial(m: THREE.MeshStandardMaterial, kind: MatKind) {
  const p = new THREE.MeshPhysicalMaterial();
  THREE.MeshStandardMaterial.prototype.copy.call(p, m);
  p.metalness = kind === 'metal' ? Math.max(m.metalness, 0.6) : 0;
  switch (kind) {
    case 'fabric': p.roughness = 0.93; p.sheen = 0.7; p.sheenRoughness = 0.6; p.sheenColor.set('#ffffff'); break;
    case 'sheer':
      // 속커튼 — 반투명(사용자 지시 2026-11-06 「속커튼 재질은 반투명으로 빛을 투과」). 뒤가 비치고, 창빛을 받아 은은히 밝다(투과광 흉내 — 발광 조금).
      // 그림자는 만들지 않는다(커튼 꾸밀 때 castShadow 끔) — 햇빛이 그대로 들어온다
      // 비닐처럼 번들거렸다(사용자 지적 2026-11-06 「좀 더 불투명하게 · 비닐 같아 천 느낌으로」) — 불투명도 0.5 → 0.75, 반사(정반사·환경맵)를 거의 빼고
      // 천 결 광택(sheen)만 넓고 부드럽게. 발광도 줄여 형광처럼 뜨지 않게
      p.roughness = 1; p.specularIntensity = 0.15; p.envMapIntensity = 0.3;
      p.sheen = 0.25; p.sheenRoughness = 0.9; p.sheenColor.set('#f4efe6');
      p.transparent = true; p.opacity = Math.min(m.opacity ?? 1, 0.75); p.side = THREE.DoubleSide; p.depthWrite = false;
      p.emissive.set('#fff7ea'); p.emissiveIntensity = 0.08;
      break;
    // 가구 겉면은 빛이 살짝 비치는 정도(코팅 0.3) — 화장대·서랍장이 무광 판처럼 죽어 보였다(사용자 지시 2026-11-03 「반사 최대 1 이면 0.3, 모든 가구」).
    // 바닥 코팅도 같은 0.3(scene.ts applySurface). 천·커튼은 그대로
    case 'wood': p.roughness = 0.52; p.clearcoat = 0.3; p.clearcoatRoughness = 0.35; break;
    case 'metal': p.roughness = 0.35; break;
    case 'matte': p.roughness = 0.7; p.clearcoat = 0.3; p.clearcoatRoughness = 0.35; break;
  }
  return p;
}
// ---- 셰이더 하나로 — 불러온 가구 재질을 같은 모양으로 맞춘다(사용자 지시 2026-11-05 「가로 진행」).
// three 는 재질의 지도 유무 · 켜진 기능(천·코팅) · 재질 종류 · 정점 배치마다 셰이더(파이프라인)를 따로 짓는다. 가구 재질이
// 27가지로 갈려 처음 보는 방 스타일마다 30~40개를 새로 지었고, GPU 가 그 컴파일로 15~40초 동안 화면을 멈췄다(실측).
// 모두 같은 모양이면 첫 방에서 한 번 짓고 다른 스타일도 그대로 쓴다.
//  - 재질은 Physical 하나 · 빈 색·거칠기·금속 지도 칸은 1×1 흰 텍스처(곱해도 그대로). 노멀 지도는 채우지 않는다(아래)
//  - 천(sheen)·코팅(clearcoat)은 보이지 않는 값(1e-4)으로 다 켠다 — 셰이더 열쇠는 0 이냐 아니냐만 본다
//  - 구운 그늘 지도(aoMap)는 재질에서 빼 userData.prodAOMap 으로 — 그늘막(spaceao.ts)만 쓴다(재질엔 세기 0 이라 원래 안 보였다)
//  - 정점은 position·normal·tangent·uv·uv1·_ao 의 float 따로 배열로(압축·끼워 넣은 배열도 풀어서). _ao 가 없으면 1(트임)로 채운다
//  - 투명 재질(유리·얇은 천)도 같게 — 투명끼리 셰이더 하나(불투명과는 그리는 방식이 달라 따로)
const flat1 = (css: string, srgb: boolean) => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d')!; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter;
  t.userData.dummy = true; t.name = 'dummy';
  return t;
};
let DUMMY: { white: THREE.Texture; lin: THREE.Texture } | null = null;
const dummies = () => (DUMMY ??= { white: flat1('#ffffff', true), lin: flat1('#ffffff', false) });
const EPS = 1e-4;
function unifyMaterial(m: THREE.Material): THREE.Material {
  const s = m as THREE.MeshStandardMaterial;
  if (!s.isMeshStandardMaterial || (s as any).isNodeMaterial) return m;
  let p = s as THREE.MeshPhysicalMaterial;
  if (!(s as THREE.MeshPhysicalMaterial).isMeshPhysicalMaterial) {
    p = new THREE.MeshPhysicalMaterial();
    THREE.MeshStandardMaterial.prototype.copy.call(p, s);
  }
  if (p.aoMap) { p.userData.prodAOMap = p.aoMap; p.aoMap = null; }
  p.aoMapIntensity = 1;
  const d = dummies();
  // 노멀 지도는 채우지 않는다 — 노멀 지도가 없던 모델은 탄젠트가 엉터리라, 빈 노멀 지도를 붙이면 그 탄젠트로 법선이 흔들려
  // 카메라를 돌릴 때 책상·책장 세로 판이 깜빡였다(사용자 지적 2026-11-05, 실측: 빼면 깜빡임 0.28 → 0.09). 노멀 있음/없음 2가지로 남긴다
  p.map ??= d.white; p.roughnessMap ??= d.lin; p.metalnessMap ??= d.lin;
  if (!p.clearcoat) p.clearcoat = EPS;
  if (!p.clearcoatRoughness) p.clearcoatRoughness = 0.35;
  if (!p.sheen) p.sheen = EPS;                         // 천 색이 검정이면 더해지는 빛이 0 — 겉보기는 그대로
  if (!p.sheenRoughness) p.sheenRoughness = 0.6;
  if (!p.roughness && p.metalness < 0.95) p.roughness = 1e-3;   // 거울(금속 1 · 거칠기 0)은 그대로 — 거울 재질로 바꿔 끼운다
  return p;
}
const UNI_ATTRS: [string, number][] = [['position', 3], ['normal', 3], ['tangent', 4], ['uv', 2], ['uv1', 2], ['_ao', 1]];
function unifyGeometry(g: THREE.BufferGeometry, keepColor: boolean) {
  if (g.userData.unified) return;
  g.userData.unified = true;
  if (!g.attributes.normal) g.computeVertexNormals();
  const n = g.attributes.position.count;
  const fl = (name: string, size: number) => {
    const a = g.getAttribute(name) as THREE.BufferAttribute | THREE.InterleavedBufferAttribute | undefined;
    if (!a) return null;
    if ((a as THREE.BufferAttribute).array instanceof Float32Array && !(a as THREE.InterleavedBufferAttribute).isInterleavedBufferAttribute && !a.normalized && a.itemSize === size) return a as THREE.BufferAttribute;
    const out = new Float32Array(n * size);
    for (let i = 0; i < n; i++) for (let k = 0; k < size; k++) out[i * size + k] = k < a.itemSize ? a.getComponent(i, k) : k === 3 ? 1 : 0;
    return new THREE.BufferAttribute(out, size);
  };
  const got: Record<string, THREE.BufferAttribute | null> = {};
  for (const [name, size] of UNI_ATTRS) got[name] = fl(name, size);
  got.uv ??= new THREE.BufferAttribute(new Float32Array(n * 2), 2);
  got.uv1 ??= got.uv.clone();
  if (!got._ao) { const a = new Float32Array(n).fill(1); got._ao = new THREE.BufferAttribute(a, 1); }
  for (const k of Object.keys(g.attributes)) if (!(keepColor && k === 'color')) g.deleteAttribute(k);
  for (const [name] of UNI_ATTRS) if (got[name]) g.setAttribute(name, got[name]!);
  if (keepColor && g.attributes.color) { const c = fl('color', 4); if (c) g.setAttribute('color', c); }
  if (!got.tangent) {
    try { g.computeTangents(); } catch { /* 아래에서 채운다 */ }
    if (!g.attributes.tangent) g.setAttribute('tangent', new THREE.BufferAttribute(new Float32Array(n * 4), 4));
  }
  fixTangents(g);
}
/** 탄젠트 바로잡기 — UV 가 한 점에 겹친 삼각형은 탄젠트가 0 으로 나온다. 0 을 정규화하면 값이 깨져 노멀 지도가 있는 천(침구)이
 *  검게 뚫렸다(사용자 지적 2026-11-05, 실측: 침구 재질 2개에서 꼭짓점 1,500개씩). 0·깨진 값·법선과 나란한 것은 법선에 수직인 아무 방향으로 */
function fixTangents(g: THREE.BufferGeometry) {
  const t = g.getAttribute('tangent') as THREE.BufferAttribute, nr = g.getAttribute('normal') as THREE.BufferAttribute;
  const N = new THREE.Vector3(), T = new THREE.Vector3(), A = new THREE.Vector3();
  let fixed = 0;
  for (let i = 0; i < t.count; i++) {
    N.fromBufferAttribute(nr, i);
    if (!(N.lengthSq() > 1e-12)) N.set(0, 1, 0); else N.normalize();
    T.set(t.getX(i), t.getY(i), t.getZ(i));
    const w = t.getW(i), len = T.length();
    if (Number.isFinite(len) && len > 1e-4 && Math.abs(T.dot(N)) < 0.95 * len && (w === 1 || w === -1)) continue;
    if (Math.abs(N.x) < 0.9) A.set(1, 0, 0); else A.set(0, 1, 0);
    T.copy(A).addScaledVector(N, -N.dot(A)).normalize();
    t.setXYZW(i, T.x, T.y, T.z, w === -1 ? -1 : 1); fixed++;
  }
  if (fixed) t.needsUpdate = true;
}
/** 모델 하나를 셰이더 하나로 — 재질(같은 재질은 한 번) · 정점 */
function unifyModel(root: THREE.Object3D) {
  const done = new Map<THREE.Material, THREE.Material>();
  root.traverse(o => {
    const mm = o as THREE.Mesh;
    if (!mm.isMesh) return;
    const mats = [mm.material].flat();
    const vao = !!mm.geometry.attributes._ao;                               // 정점 그늘로 구운 모델(bake_hv_ao.py)
    const fix = (m: THREE.Material) => { let n = done.get(m); if (!n) { n = unifyMaterial(m); if (vao) n.userData.vao = true; done.set(m, n); } return n; };
    mm.material = Array.isArray(mm.material) ? mm.material.map(fix) : fix(mm.material);
    unifyGeometry(mm.geometry, mats.some(m => m.vertexColors));
  });
}
function roomModel(name: string, ruleIn?: (m: THREE.MeshStandardMaterial) => MatKind | null) {
  let p = roomCache.get(name);
  if (!p) {
    p = roomLoader.loadAsync(`${import.meta.env.BASE_URL}props/${name.includes('/') ? name : 'room/' + name}.glb`).then(g => {
      const rule = ruleIn ?? MAT_RULE[name] ?? styleRule(name), done = new Map<THREE.Material, THREE.Material>();
      g.scene.traverse(o => {
        const mm = o as THREE.Mesh;
        if (!mm.isMesh) return;
        mm.castShadow = mm.receiveShadow = true;
        if (!rule) return;
        const fix = (m: THREE.Material) => {
          let n = done.get(m);
          if (!n) { const k = rule(m as THREE.MeshStandardMaterial); n = k ? fixMaterial(m as THREE.MeshStandardMaterial, k) : m; done.set(m, n); }
          return n;
        };
        mm.material = Array.isArray(mm.material) ? mm.material.map(fix) : fix(mm.material);
      });
      // 불러온 모델 재질은 값이 같으면 하나로 합쳐도 된다(batch.ts) — 앱이 따로 바꾸는 재질(벽·바닥·몰딩·조명)과 구분
      // 상품 표시 — 금속성 2/255(spaceao.ts PROD_FLAG). 상품 라이트맵이 켜지면 화면 그늘을 겹치지 않는다. 금속 부분(손잡이 등)은 그대로
      // 비스듬히 볼 때 텍스처가 뭉개지지 않게 — 비등방 필터 16(기본 1). 천장 에어컨 로고·토출구 결이 서서 올려다보면 흐려 안 보였다(사용자 지적 2026-11-06 「시스템 에어컨 텍스처가 너무 떨어져」)
      g.scene.traverse(o => { const mm = o as THREE.Mesh; if (mm.isMesh) [mm.material].flat().forEach(m => { for (const v of Object.values(m)) if ((v as THREE.Texture)?.isTexture) (v as THREE.Texture).anisotropy = 16; }); });
      g.scene.traverse(o => { const mm = o as THREE.Mesh; if (mm.isMesh) [mm.material].flat().forEach(m => { m.userData.shareable = true; m.userData.src = name; const s = m as THREE.MeshStandardMaterial; if (s.isMeshStandardMaterial && s.metalness < 0.01) s.metalness = 2 / 255; if (s.aoMap) s.aoMapIntensity = 0; }); });   // 구운 그늘은 그늘막으로(spaceao.ts applyProdAO) — 간접광에 또 곱하지 않는다
      unifyModel(g.scene);
      g.scene.userData.src = name;
      roomLoaded.set(name, g.scene);
      g.scene.traverse(o => { if ((o as THREE.Mesh).isMesh) cachedGeo.add((o as THREE.Mesh).geometry); });
      return g.scene;
    });
    roomCache.set(name, p);
  }
  return p.then(s => { const c = s.clone(true); c.userData.hvItem = true; return c; });
}
/** 몸체 크기(모델 좌표) — 손잡이·노브처럼 옆으로 조금 튀어나온 부분은 뺀다(사용자 지시 2026-11-04 「책상 오른쪽 손잡이는 전체 사이즈에서 제외, 모든 소품에」).
 *  모델 가로(x)·깊이(z)를 1cm 단면으로 훑어 단면 넓이(높이 × 다른 쪽 폭)가 가장 큰 단면의 15% 도 안 되는 끝부분을 최대 12cm 까지 잘라낸다.
 *  다리처럼 위 판과 이어진 단면은 판 폭이 잡혀 넓으므로 잘리지 않는다. 모델 사본마다 한 번 계산해 둔다 */
const CORE_BIN = 0.01, CORE_FRAC = 0.15, CORE_MAX = 0.12, CORE_FACE = 0.05, CORE_FACE_MAX = 0.035;
function coreLocal(root: THREE.Object3D): THREE.Box3 {
  const cached = root.userData.coreL as THREE.Box3 | undefined;
  if (cached?.isBox3) return cached;      // 복제(clone)는 userData 를 JSON 으로 옮겨 Box3 가 아니게 된다 — 그땐 다시 잰다
  root.updateMatrixWorld(true);
  const inv = root.matrixWorld.clone().invert(), m = new THREE.Matrix4(), v = new THREE.Vector3();
  const pts: number[] = [];
  // 면 — 가운데 x·z 와 x·z 방향으로 보이는 넓이(그 축에 수직인 단면에 비친 넓이)
  const tri: number[] = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), e1 = new THREE.Vector3(), e2 = new THREE.Vector3();
  root.traverse(o => {
    const me = o as THREE.Mesh;
    if (!me.isMesh || !me.visible) return;
    const pos = me.geometry.getAttribute('position'); if (!pos) return;
    m.multiplyMatrices(inv, me.matrixWorld);
    const st = Math.max(1, Math.floor(pos.count / 20000));
    for (let k = 0; k < pos.count; k += st) { v.fromBufferAttribute(pos, k).applyMatrix4(m); pts.push(v.x, v.y, v.z); }
    const idx = me.geometry.index, n = idx ? idx.count : pos.count, ts = Math.max(1, Math.floor(n / 3 / 40000));
    for (let t = 0; t + 2 < n; t += 3 * ts) {
      a.fromBufferAttribute(pos, idx ? idx.getX(t) : t).applyMatrix4(m); b.fromBufferAttribute(pos, idx ? idx.getX(t + 1) : t + 1).applyMatrix4(m); c.fromBufferAttribute(pos, idx ? idx.getX(t + 2) : t + 2).applyMatrix4(m);
      e1.subVectors(b, a).cross(e2.subVectors(c, a));
      tri.push((a.x + b.x + c.x) / 3, (a.z + b.z + c.z) / 3, Math.abs(e1.x) / 2 * ts, Math.abs(e1.z) / 2 * ts);
    }
  });
  const box = new THREE.Box3();
  for (let k = 0; k < pts.length; k += 3) box.expandByPoint(v.set(pts[k], pts[k + 1], pts[k + 2]));
  if (box.isEmpty()) { root.userData.coreL = box; return box; }
  // 축 a(0 = x, 2 = z)를 따라 단면 넓이 → 양 끝에서 작은 단면을 잘라낸 범위
  const trim = (a: 0 | 2) => {
    const o = a === 0 ? 2 : 0, lo = box.min.getComponent(a), n = Math.max(1, Math.ceil((box.max.getComponent(a) - lo) / CORE_BIN));
    const y0 = new Float32Array(n).fill(Infinity), y1 = new Float32Array(n).fill(-Infinity), q0 = new Float32Array(n).fill(Infinity), q1 = new Float32Array(n).fill(-Infinity);
    for (let k = 0; k < pts.length; k += 3) {
      const i = Math.min(n - 1, Math.floor((pts[k + a] - lo) / CORE_BIN)), y = pts[k + 1], q = pts[k + o];
      if (y < y0[i]) y0[i] = y; if (y > y1[i]) y1[i] = y; if (q < q0[i]) q0[i] = q; if (q > q1[i]) q1[i] = q;
    }
    const cov = (i: number) => (y1[i] >= y0[i] ? (y1[i] - y0[i]) * (q1[i] - q0[i]) : 0);
    let mx = 0; for (let i = 0; i < n; i++) mx = Math.max(mx, cov(i));
    // 실제로 그 단면을 막는 면 넓이 — 감싼 상자만 보면 손잡이(위)와 바닥 받침(아래)처럼 흩어진 작은 조각이 단면 전체로 잡혔다
    // (학생방 책상: 옆판 앞 1.4cm 가 남아 옆 장이 책상에 붙지 않고 1.4cm 떠서 멈췄다, 사용자 지적 2026-11-04)
    const pa = new Float32Array(n);
    for (let k = 0; k < tri.length; k += 4) { const i = Math.min(n - 1, Math.max(0, Math.floor(((a === 0 ? tri[k] : tri[k + 1]) - lo) / CORE_BIN))); pa[i] += a === 0 ? tri[k + 2] : tri[k + 3]; }
    let pmx = 0; for (let i = 0; i < n; i++) pmx = Math.max(pmx, pa[i]);
    // 면 넓이 기준은 끝에서 3.5cm 까지만 — 손잡이·노브·바닥 받침 정도. 더 들어가면 책상 상판 앞 턱·침대 끝처럼 실제로 부딪히는 몸체였다(11cm·8cm 잘림 실측)
    const faceLim = Math.round(CORE_FACE_MAX / CORE_BIN);
    const small = (i: number) => cov(i) < mx * CORE_FRAC || (pa[i] < pmx * CORE_FACE && Math.min(i, n - 1 - i) < faceLim);
    const lim = Math.floor(CORE_MAX / CORE_BIN);
    let i0 = 0, i1 = n - 1;
    while (i0 < lim && i0 < i1 && small(i0)) i0++;
    while (n - 1 - i1 < lim && i1 > i0 && small(i1)) i1--;
    // 너무 많이 잘리면(절반 넘게) 판정이 틀린 것 — 원래대로
    if ((i1 - i0 + 1) < n * 0.5) return;
    box.min.setComponent(a, lo + i0 * CORE_BIN); box.max.setComponent(a, Math.min(box.max.getComponent(a), lo + (i1 + 1) * CORE_BIN));
  };
  trim(0); trim(2);
  root.userData.coreL = box;
  return box;
}
/** 크기 상자(월드) — 불러온 모델(hvItem)은 몸체 크기로, 나머지 메시는 그대로 */
export function coreBox(o: THREE.Object3D): THREE.Box3 {
  o.updateMatrixWorld(true);
  const b = new THREE.Box3();
  const visit = (x: THREE.Object3D) => {
    if (!x.visible || x.name === 'contact-shadow') return;   // 가구 밑 그늘판(contact.ts)은 크기가 아니다
    if (x.userData.hvItem) { b.union(coreLocal(x).clone().applyMatrix4(x.matrixWorld)); return; }
    if ((x as THREE.Mesh).isMesh) b.expandByObject(x, false);
    for (const c of x.children) visit(c);
  };
  visit(o);
  return b;
}
const boxOf = (o: THREE.Object3D) => coreBox(o);
/** 바닥 위 모델을 세로축으로 돌려 놓기 — 그룹으로 감싸 돌리고, 감싼 그룹의 상자 기준으로 자리 잡는다 */
/** 커튼 접기 — 모델(폭 4.12m, x 축) 꼭짓점을 자락별로 옮긴다. 결과는 레일 za~zb 를 x 축에 펼친 미터 단위(가운데 0).
 *  - 레일: 전체 길이를 za~zb 로
 *  - 겉커튼(Out)·속커튼(In) 왼쪽·오른쪽 자락: 레일 끝에서 창 가장자리 12cm 안쪽까지 모아 접는다(자락 폭 20~68cm).
 *    자리가 좁으면(장·방문에 밀리면) 22cm 까지 더 촘촘히 접힌다. 주름 깊이(z)는 그대로라 폭을 줄이면 접힌 모양이 된다
 *  꼭짓점 법선·접선도 같은 비율로 바로잡는다. 모델 지오메트리는 캐시에서 공유하므로 복제해서 고친다 */
function foldCurtain(src: THREE.Object3D, za: number, zb: number, w0: number, w1: number, want: { L?: number; R?: number; Li?: number; Ri?: number } = {}) {
  const mid = (za + zb) / 2, a = za - mid, b = zb - mid, half = (b - a) / 2;
  // 왼쪽 자락은 창을 30cm 덮게(2026-11-03 「너무 창문을 가리지 못해」), 오른쪽 자락은 창을 70cm 가량 덮게 펼친다(사용자 지시 2026-10-30 「오른쪽 커튼은 창문을 많이 가려줘」) — 원본 폭보다 넓으면 주름이 성기게 펴진다
  // 사용자가 끌어 정한 폭이 있으면 그것(사용자 지시 2026-11-03 「한쪽씩 끌어 펴거나 줄이게」) — 20cm(다 모음) ~ 레일 절반(가운데서 만남)
  const dL0 = THREE.MathUtils.clamp(w0 - mid + 0.3 - a, 0.2, 0.68), dR0 = THREE.MathUtils.clamp(b - (w1 - mid - 0.7), 0.2, 1.0);
  const dL = want.L != null ? THREE.MathUtils.clamp(want.L, 0.2, half) : dL0;
  const dR = want.R != null ? THREE.MathUtils.clamp(want.R, 0.2, half) : dR0;
  // 속커튼 — 겉커튼과 따로 펴고 모은다(사용자 지시 2026-11-06 「안감과 겉감을 따로 열고 닫게」). 끌지 않았으면 처음 모양(겉커튼 기본 폭 × 1.25)
  const dLi = want.Li != null ? THREE.MathUtils.clamp(want.Li, 0.2, half) : Math.min(dL0 * 1.25, half);
  const dRi = want.Ri != null ? THREE.MathUtils.clamp(want.Ri, 0.2, half) : Math.min(dR0 * 1.25, half);
  // 원본 자락 범위(x) — 겉 ±(1.38~2.061), 속 왼쪽 -2.061~-0.86 · 오른쪽 0.69~2.061 (glb 꼭짓점 분포 실측)
  const SRC: Record<string, [number, number, number, number]> = { Out: [-2.061, -1.38, 1.38, 2.061], In: [-2.061, -0.86, 0.69, 2.061] };
  const out = new THREE.Group();
  src.updateMatrixWorld(true);
  src.traverse(o => {
    const m = o as THREE.Mesh; if (!m.isMesh) return;
    const g = m.geometry.clone(); g.applyMatrix4(m.matrixWorld);
    const mat = m.material as THREE.Material, kind = /Rail/.test(mat.name) ? 'Rail' : /In/.test(mat.name) ? 'In' : 'Out';
    const pos = g.getAttribute('position'), nor = g.getAttribute('normal'), tan = g.getAttribute('tangent');
    const v = new THREE.Vector3(), side = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); side[i] = x;
      let s0: number, s1: number, t0: number, t1: number;
      if (kind === 'Rail') { s0 = -2.061; s1 = 2.061; t0 = a; t1 = b; }
      else {
        const r = SRC[kind], inner = kind === 'In';
        // 속커튼은 레일 절반을 넘지 않게 — 넘으면 가운데서 좌우 속커튼이 같은 깊이로 겹쳐 깜빡인다
        if (x < 0) { s0 = r[0]; s1 = r[1]; t0 = a; t1 = a + Math.min(inner ? dLi : dL, half); } else { s0 = r[2]; s1 = r[3]; t0 = b - Math.min(inner ? dRi : dR, half); t1 = b; }
      }
      const sc = (t1 - t0) / (s1 - s0);
      pos.setX(i, t0 + (x - s0) * sc);
      if (nor) { v.fromBufferAttribute(nor, i); v.x /= sc; v.normalize(); nor.setXYZ(i, v.x, v.y, v.z); }
      if (tan) { v.set(tan.getX(i) * sc, tan.getY(i), tan.getZ(i)).normalize(); tan.setXYZ(i, v.x, v.y, v.z); }
    }
    // 자락은 좌우를 따로 — 한쪽씩 골라 끈다. 원래 x 의 부호로 삼각형을 나눈다(레일은 하나)
    const parts: [THREE.BufferGeometry, 'L' | 'R' | null][] = kind === 'Rail' ? [[g, null]] : (['L', 'R'] as const).map(sd => [splitSide(g, side, sd === 'L'), sd]);
    for (const [pg, sd] of parts) {
      pg.computeBoundingBox(); pg.computeBoundingSphere();
      const n = new THREE.Mesh(pg, m.material); n.castShadow = m.castShadow; n.receiveShadow = m.receiveShadow;
      if (sd) { n.userData.curtainSide = sd; n.userData.curtainLayer = kind; }   // 속커튼(In) · 겉커튼(Out) — 따로 잡아 끈다
      out.add(n);
    }
    if (kind !== 'Rail') g.dispose();
  });
  out.userData.rail = [a, b];
  return out;
}
/** 삼각형 중 원래 x 가 왼쪽(<0)인 것만(또는 오른쪽만) 새 지오메트리로 */
function splitSide(g: THREE.BufferGeometry, side: Float32Array, left: boolean) {
  const idx = g.index, n = idx ? idx.count : g.getAttribute('position').count, at = (i: number) => (idx ? idx.getX(i) : i);
  const pick: number[] = [];
  for (let t = 0; t < n; t += 3) if ((side[at(t)] < 0) === left) pick.push(at(t), at(t + 1), at(t + 2));
  const out = new THREE.BufferGeometry();
  // 값은 접근자로 읽는다 — 커튼 glb 는 꼭짓점 값이 한 버퍼에 섞여(interleaved, 간격 56바이트) 배열을 바로 읽으면 엉뚱한 값이 들어가 자락이 깨졌다(2026-11-03)
  for (const [name, attr] of Object.entries(g.attributes) as [string, THREE.BufferAttribute][]) {
    const sz = attr.itemSize, arr = new Float32Array(pick.length * sz);
    const get = [attr.getX, attr.getY, attr.getZ, attr.getW];      // 정규화된 정수 값도 실수로 풀어 준다
    pick.forEach((v, j) => { for (let c = 0; c < sz; c++) arr[j * sz + c] = get[c].call(attr, v); });
    out.setAttribute(name, new THREE.BufferAttribute(arr, sz));
  }
  return out;
}
/** 커튼 아랫단 누르기 — 창 벽(x = wx) 앞 가구 뒤로 가는 부분을 가구 뒷면과 벽 사이 얇은 층으로 납작하게(주름 깊이 → 0).
 *  가구 윗면 위 25cm 동안 서서히 풀고, 가구 폭 양옆 8cm 도 서서히 풀어 꺾인 자국이 없게. c 는 창 벽 좌표(부모 없음) */
/** 실내 창대(벽에서 4cm 나온 판, 창 폭 + 양옆 4cm) — 커튼이 뚫지 않게. 창대 윗면 높이부터 아래는 창대 앞(벽에서 4.6cm)으로 떨어지고,
 *  그 위 10cm 는 벽 쪽으로 부드럽게 이어진다(사용자 지적 2026-11-04 「창문 턱 때문에 오른쪽 커튼이 뚫린다」 — 가구 뒤로 벽에 붙여 누른 아랫단을 창대가 뚫었다) */
const SILL_OUT = 0.04;
function clearSill(c: THREE.Object3D, wx: number, sillY: number, z0: number, z1: number) {
  c.updateMatrixWorld(true);
  const v = new THREE.Vector3(), inv = new THREE.Matrix4(), front = wx - SILL_OUT - 0.006;
  const ss = (e0: number, e1: number, x: number) => { const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  c.traverse(o => {
    const m = o as THREE.Mesh; if (!m.isMesh) return;
    const pos = m.geometry.getAttribute('position') as THREE.BufferAttribute;
    inv.copy(m.matrixWorld).invert();
    let changed = false;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      if (v.x <= front) continue;
      // 창대 폭(양옆 4cm + 여유 2cm) 안 · 창대 윗면 아래면 앞으로. 위 10cm 는 섞는다
      const kz = ss(z0 - 0.07, z0 - 0.05, v.z) * (1 - ss(z1 + 0.05, z1 + 0.07, v.z));
      const ky = 1 - ss(sillY + 0.005, sillY + 0.1, v.y);
      const k = kz * ky; if (k <= 0) continue;
      v.x += (front - v.x) * k; v.applyMatrix4(inv); pos.setXYZ(i, v.x, v.y, v.z); changed = true;
    }
    if (changed) { pos.needsUpdate = true; m.geometry.computeVertexNormals(); m.geometry.computeBoundingBox(); m.geometry.computeBoundingSphere(); }
  });
}
function flattenBehind(c: THREE.Object3D, boxes: THREE.Box3[], wx: number) {
  c.updateMatrixWorld(true);
  const v = new THREE.Vector3(), inv = new THREE.Matrix4();
  const ss = (e0: number, e1: number, x: number) => { const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  c.traverse(o => {
    const m = o as THREE.Mesh; if (!m.isMesh) return;
    const pos = m.geometry.getAttribute('position') as THREE.BufferAttribute;
    inv.copy(m.matrixWorld).invert();
    // 이 자락의 깊이 범위(벽에서 먼 쪽 lo ~ 벽 쪽 hi)
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld); lo = Math.min(lo, v.x); hi = Math.max(hi, v.x); }
    if (!(hi > lo)) return;
    let changed = false;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      let f = 0, back = wx;
      for (const b of boxes) {
        const k = (1 - ss(b.max.y + 0.02, b.max.y + 0.27, v.y)) * ss(b.min.z - 0.08, b.min.z, v.z) * (1 - ss(b.max.z, b.max.z + 0.08, v.z));
        if (k > f) { f = k; back = b.max.x; }
      }
      if (f <= 0) continue;
      // 가구 뒷면과 벽 사이 — 틈이 1cm 도 안 되면 벽 앞 1cm 층으로
      const b0 = Math.min(Math.max(back + 0.004, wx - 0.03), wx - 0.012), b1 = wx - 0.004;
      const x = b0 + (v.x - lo) / (hi - lo) * (b1 - b0);
      v.x += (x - v.x) * f; v.applyMatrix4(inv); pos.setXYZ(i, v.x, v.y, v.z); changed = true;
    }
    if (changed) { pos.needsUpdate = true; m.geometry.computeBoundingBox(); m.geometry.computeBoundingSphere(); }
  });
}
/** 묶음 이름 — 본체(가구) 먼저, 없으면 의자·소품. 같은 이름이 여럿이면 하나로 */
const CAT_KO: [RegExp, string][] = [[/BookCase/, '책장'], [/StorageCabinet/, '수납장'], [/Chiffonier/, '서랍장'], [/Nightstand/, '협탁'], [/Desk/, '책상'], [/Bed$/, '침대'],
  [/Closet|BuiltIn/, '옷장'], [/Chair/, '의자'], [/Rug/, '러그'], [/Plant/, '화분'], [/Frame/, '액자'], [/Book/, '책'], [/Electronic/, '전자제품'], [/Fabric|Matrres/, '침구'], [/Ceramic|Deco|Kids/, '소품']];
function unitLabel(its: { cat: string; role: string }[]) {
  const ko = (c: string) => CAT_KO.find(([r]) => r.test(c))?.[1] ?? '가구';
  const pick = ['main', 'chair', 'prop'].map(r => its.filter(i => i.role === r).map(i => ko(i.cat))).find(a => a.length) ?? ['가구'];
  return [...new Set(pick)].slice(0, 3).join('·');
}
function wrap(o: THREE.Object3D, rotY: number) { const w = new THREE.Group(); w.add(o); w.rotation.y = rotY; return w; }
/** 높은 쪽(헤드보드·베개)이 +z 인가 — 아니면 180° 돌린다 */
function highEndIsPlusZ(o: THREE.Object3D) {
  const b = boxOf(o), zc = (b.min.z + b.max.z) / 2, v = new THREE.Vector3();
  let hiP = -Infinity, hiM = -Infinity;
  o.traverse(m => {
    const mm = m as THREE.Mesh; if (!mm.isMesh) return;
    const pos = mm.geometry.getAttribute('position');
    for (let k = 0; k < pos.count; k += 7) { v.fromBufferAttribute(pos, k).applyMatrix4(mm.matrixWorld); if (v.z > zc) hiP = Math.max(hiP, v.y); else hiM = Math.max(hiM, v.y); }
  });
  return hiP >= hiM;
}
/** 상자 기준으로 놓기: x 가운데 cx, 뒤(+z) 끝 zBack, 바닥 y */
function placeBox(o: THREE.Object3D, cx: number, zBack: number, y = 0) {
  const b = boxOf(o);
  o.position.x += cx - (b.min.x + b.max.x) / 2;
  o.position.z += zBack - b.max.z;
  o.position.y += y - b.min.y;
}

/** 방 스타일 — 안방 · 아기방 · 학생방 · 자녀방(성인) · 드레스룸(붙박이장 · 시스템장 · 혼합) */
export type RoomStyle = 'master' | 'baby' | 'student' | 'adult' | 'dress-builtin' | 'dress-system' | 'dress-mixed';
export const ROOM_STYLES: { id: RoomStyle; name: string; group?: string; desc: string }[] = [
  { id: 'master', name: '안방', desc: '월넛 + 부클 — 킹 침대 · 협탁 · 서랍장' },
  { id: 'baby', name: '아기방', desc: '화이트 + 파스텔 — 범퍼 침대 · 놀이매트' },
  { id: 'student', name: '학생방', desc: '화이트 — 싱글 침대 · 책상 · 책장' },
  { id: 'adult', name: '자녀방(성인)', desc: '오크 + 블랙 — 싱글 침대 · 책상 · 책장' },
  { id: 'dress-builtin', name: '붙박이장', group: '드레스룸', desc: '아일랜드장 · 화장대' },
  { id: 'dress-system', name: '시스템장', group: '드레스룸', desc: '벽면 시스템장 · 아일랜드장' },
  { id: 'dress-mixed', name: '혼합', group: '드레스룸', desc: '거울 시스템장 · 아일랜드장 · 화장대' },
];
/** 홈뷰 묶음 이동 — 가구를 눌러 골라 끌어 옮기고 돌리고 뺀다(사용자 지시 2026-11-02 「배치된 상품들을 선택해서 이동하게」) */
/** rot = 90° 단위(예전 저장분), ang = 도(5° 단위 돌리기·회전 고리 — 사용자 지시 2026-11-03). 실제 각 = rot × 90 + ang */
export type HvMove = { dx: number; dz: number; rot: number; ang?: number; del?: boolean; cL?: number; cR?: number; /** 속커튼 자락 폭(m) — 겉커튼과 따로 */ cLi?: number; cRi?: number; /** 벽 장식 높이 이동(m) */ dy?: number;
  /** 벽 장식을 사용자가 벽째 옮겼다(다른 벽으로 · 벽에 딱 붙여) — dx·dz·dy 는 원래 기준점에서 그대로 간 거리, 장 앞 자동 밀기·겹침 표시 안 함 */ free?: boolean };
/** 커튼 자락 폭(레일 따라 m) — 묶음 이동과 같은 곳(moves['_curtain'])에 저장. 없으면 창에 맞춘 기본 */
export const CURTAIN_KEY = '_curtain';
export type RoomFurnishOpts = {
  x0: number; x1: number; D: number; H: number;
  /** 창 — 창 벽 좌표(L: 창 벽이 x = x1 인 오른쪽 벽, 벽 따라 z)의 창 구간·커튼 위·커튼 자락 범위. m = L → 방 좌표, zone = 커튼 자리(방 좌표 x0·x1·z0·z1) */
  win: { x1: number; z0: number; z1: number; top: number; zMin: number; zMax?: number; m: THREE.Matrix4; zone: [number, number, number, number]; sill?: number };
  /** 홈뷰 꾸밈을 원본 방 그대로 — 이 홈뷰 벽이 장 벽(뒤)이 되게 통째로 돌려 놓는다(2026-11-02 「방을 먼저 불러오고 장 벽을 고른다」) */
  hvWall?: 'B' | 'F' | 'L' | 'R' | null;
  /** 사용자가 옮긴 묶음(원본 그대로 모드) — 묶음 키 → 옮긴 거리(방 좌표 m)·90° 회전 수·뺌 */
  moves?: Record<string, HvMove>;
  /** 묶음 목록을 받아 갈 자리(뺀 묶음 포함) — 「뺀 가구 되살리기」 목록 */
  unitsInfo?: { key: string; label: string; del: boolean }[];
  /** 방 스타일 — 고른 스타일에 맞는 가구 */
  style?: RoomStyle;
  /** 비워 둘 자리(바닥 x0, x1, z0, z1) — 방문이 열리며 쓸고 지나는 곳 · 장 앞(도어 여는 자리 포함) */
  avoid?: [number, number, number, number][];
  /** 장 앞 통로 깊이(m) — avoid 의 장 상자에서 장 앞면을 되짚는 데 쓴다 */
  aisle?: number;
  /** 자리를 먼저 잡고 모델을 뒤에 끼울 때 — 모델 하나가 끼워질 때마다(화면을 다시 그리게) */
  onFill?: (added: THREE.Object3D[]) => void;
};
/** 다음 화면까지 기다린다 — 끼운 것을 한 프레임씩 보여 주려고. 화면이 안 그려지는 탭(가려짐)이면 기다리지 않고, 늦어도 0.1초 */
const nextFrame = () => document.hidden ? Promise.resolve() : new Promise<void>(r => { const t = setTimeout(r, 100); requestAnimationFrame(() => { clearTimeout(t); r(); }); });
/** 맞은편 벽(z = D)에 침대 + 침구 + 협탁 2 + (자리 되면) 2단 책장, 창(오른쪽 벽 x1)에 커튼. alive() 가 거짓이면(방이 다시 만들어짐) 버린다 */

// ---- 홈뷰 방 꾸밈 옮겨 놓기 (사용자 지시 2026-10-30 「홈뷰에서의 각 방들 구성을 참고해서 배치」 · 「방별 소품도 달라져야」)
// public/data/hvrooms.json — 홈뷰 레벨(방 꾸밈 MDxx)에서 뽑은 가구·소품(위치·회전·크기, 홈뷰 glb 좌표 = m). 모델은 public/props/hv
// 옮기는 법(2026-11-02 「배치된 구조를 안 보고 위치만 가져온다」 — 가구마다 따로 벽을 바꿔 옮기다 책상 묶음·책장이 빠지고 벽 선반만 떠 있었다):
//  ① 방 전체를 한 덩어리로 돌린다 — 홈뷰 붙박이장 벽(없으면 가구가 가장 적은 벽)을 우리 장 벽으로. 좌우 반전은 둘 다 놓아 보고 많이 들어가는 쪽
//  ② 묶음(붙은 가구 세트 + 위·안 소품 + 짝 의자 + 가구 위 벽 장식) 단위로 옮기고, 묶음은 가까운 벽과의 거리를 그대로(가운데는 방 비율)
//  ③ 자리가 없으면 벽을 따라 밀고, 그래도 없으면 묶음째 뺀다(세트는 가구별로 나눠 한 번 더). 회전은 기울기까지(q)
type HvItem = { m: string; cat: string; role: 'main' | 'chair' | 'prop'; p: [number, number, number]; ry: number; q?: [number, number, number, number]; s: [number, number, number] };
type HvRoom = { src: string; floor: [number, number, number, number] | null; items: HvItem[];
  /** 창(홈뷰 창 자리 조명에서) — 벽·벽 따라 가운데(홈뷰 x 또는 z)·폭·높이·창대 */
  win?: { wall: 'B' | 'F' | 'L' | 'R'; c: number; w: number; h: number; sill: number } | null;
  /** 붙박이장이 등 붙인 벽 · 장 벽 기본값(붙박이장 벽, 없으면 창 벽 말고 가구가 가장 적은 벽) */
  closet?: 'B' | 'F' | 'L' | 'R' | null; defWall?: 'B' | 'F' | 'L' | 'R';
  /** 방문(홈뷰 벽 구멍에서) — 벽·벽 따라 구간(홈뷰 x 또는 z)·높이 */
  door?: { wall: 'B' | 'F' | 'L' | 'R'; a: number; b: number; h: number } | null };
export type HvRoomInfo = { floor: [number, number, number, number] } & Pick<HvRoom, 'win' | 'closet' | 'defWall' | 'door'>;
/** 홈뷰 원본 방 정보(크기·창·붙박이장 벽) — 방을 먼저 불러오고 장 벽을 고르는 흐름(main.ts) */
export async function hvRoomInfo(style: RoomStyle): Promise<HvRoomInfo | null> {
  const r = (await hvData())[style];
  return r?.floor ? { floor: r.floor, win: r.win ?? null, closet: r.closet ?? null, defWall: r.defWall, door: r.door ?? null } : null;
}
let hvRooms: Promise<Record<string, HvRoom>> | null = null;
const hvData = (): Promise<Record<string, HvRoom>> => (hvRooms ??= fetch(`${import.meta.env.BASE_URL}data/hvrooms.json`).then(r => r.json() as Promise<Record<string, HvRoom>>).catch(() => ({} as Record<string, HvRoom>)));
/** 투명 천을 빼는 홈뷰 종류(침구·매트리스·쿠션·옷) */
const HV_SHEER = /Fabric|Matrres|Cushion|Cloth/;
/** 홈뷰 방 모델 몸체 상자(모델 좌표 — coreLocal 과 같은 값, [최소 xyz, 최대 xyz]). tools/hvboxes.html 로 굽는다.
 *  모델·hvrooms.json 을 바꾸면 다시 굽는다 — 없거나 빠진 모델이 있으면 예전처럼 다 받은 뒤에 놓는다 */
let hvBoxes: Promise<Record<string, number[] | null>> | null = null;
const hvBoxData = (): Promise<Record<string, number[] | null>> => (hvBoxes ??= fetch(`${import.meta.env.BASE_URL}data/hvboxes.json`)
  .then(r => (r.ok ? r.json() : {})).catch(() => ({})));
/** 몸체 상자 굽기(tools/hvboxes.html) — 홈뷰 방 꾸밈에 나오는 모델 전부 */
export async function bakeHvBoxes() {
  const cats = new Map<string, string>();
  for (const r of Object.values(await hvData())) for (const it of r.items) cats.set(it.m, it.cat);
  // 못 쓰는 모델(받기·재질 정리 실패)은 null — 방을 지을 때도 그 자리는 빠진다(예전처럼)
  const out: Record<string, number[] | null> = {};
  for (const [n, cat] of cats) {
    const m = await roomModel('hv/' + n, hvRule(cat)).catch(e => { console.warn('[몸체 상자] 못 씀', n, String(e?.stack ?? e).slice(0, 300)); return null; });
    if (!m) { out[n] = null; continue; }
    if (HV_SHEER.test(cat)) dropSheer(m);
    const b = coreLocal(m);
    out[n] = [...b.min.toArray(), ...b.max.toArray()].map(v => Math.round(v * 1e5) / 1e5);
  }
  return out;
}
/** 홈뷰 소품 재질 — 종류(카테고리)로 */
/** 침구의 투명 천(비치는 덧담요·레이스) 메시를 뺀다 — 사용자 지시 2026-11-03 「침구로 투명 재질의 천은 제거」.
 *  모델 캐시 원본에서 빼므로 이 방을 다시 만들어도 다시 붙지 않는다 */
function dropSheer(root: THREE.Object3D) {
  const sheer = (m: THREE.Material) => m.transparent || (m.opacity ?? 1) < 1;
  const drop: THREE.Object3D[] = [];
  root.traverse(o => { const mm = o as THREE.Mesh; if (mm.isMesh && [mm.material].flat().every(sheer)) drop.push(mm); });
  drop.forEach(o => o.removeFromParent());
}
function hvRule(cat: string): (m: THREE.MeshStandardMaterial) => MatKind | null {
  return m => {
    // 거울 유리 — 홈뷰 변환본은 금속·거칠기 값이 빠져 glTF 기본(금속 1 · 거칠기 1)이라 회색 쇠판처럼 나왔다. 거울 값으로 두면
    // 실시간은 장 거울과 같은 평면 반사(scene.ts noWindowLight), 실사는 정반사
    if (/Mirror/.test(cat) && /mirror|거울/i.test(m.name)) { m.metalness = 1; m.roughness = 0; m.color.set('#ffffff'); return null; }
    // LED(침대 헤드·패널 핀조명) — 홈뷰 변환본은 발광 값이 빠진 채 와서 꺼져 보였다(사용자 지시 2026-11-03 「침대 조명 불이 들어오게, 패널과 똑같이」).
    // 재질은 그대로(발광은 실시간·실사 모두 빛으로 계산된다).
    // 침대·패널·핀조명의 빛은 하나로(사용자 지시 2026-11-03 「침대·침대 패널 빛을 통일」) — 460 패널만 주황(1, 0.58, 0.17) × 3.2 로
    // 다른 것보다 세 배 밝고 붉었다.
    // 빛 값만이 아니라 재질 전체를 800 패널 LED(DFIB00322 「LED」)와 같게 — 460 은 바탕이 검정 · 거칠기 0.5 라 같은 빛이라도 색이 달랐다
    // (사용자 지시 2026-11-03 「800 패널 빛 머테리얼을 그대로」): 바탕 흰색 · 거칠기 0 · 금속 0 · 빛 (1, 0.82, 0.28) × 1
    if (/^LED$/i.test(m.name) || (/Bed/.test(cat) && m.emissive.getHex() !== 0)) {
      m.color.setRGB(1, 1, 1); m.roughness = 0; m.metalness = 0; m.map = null;
      m.emissive.setRGB(1, 0.8195, 0.2782, THREE.LinearSRGBColorSpace); m.emissiveIntensity = 1; m.emissiveMap = null;
      m.name = 'LED';
      return null;
    }
    if (m.transparent || (m.opacity ?? 1) < 1) {                            // 유리·투명 — 그대로
      // 천의 투명 덧층(안방 담요 「1wdes」: 거칠기 0)은 유리처럼 매끈하게 들어와 화면 반사(SSR)에서 얼음처럼 번들거렸다(2026-11-03) — 천 거칠기로
      if (/Fabric|Rug|Cushion|Cloth|Matrres/.test(cat) && m.roughness < 0.6) m.roughness = 0.85;
      return null;
    }
    if (/Plant/.test(cat)) return null;
    if (/Fabric|Rug|Cushion|Cloth|Matrres/.test(cat)) return 'fabric';
    if (m.metalness > 0.5) return 'metal';
    if (/Bed$/.test(cat)) return m.map ? 'fabric' : 'matte';
    return m.map ? 'wood' : 'matte';
  };
}
type Wall = 'F' | 'L' | 'R' | 'B';
/** 옮기는 묶음 — 서로 붙은 큰 가구와 그 위·안 소품, 짝 의자, 가구 위 벽 장식. 통째로 움직이고 안 들어가면 통째로 뺀다 */
type Unit = { members: number[]; kind: 'furn' | 'decor' | 'rug'; wall: Wall | null; parts?: number[][] };

async function addHomvueModule(g: THREE.Group, o: RoomFurnishOpts, style: RoomStyle, alive: () => boolean,
  ctx: { free: (x0: number, x1: number, z0: number, z1: number, h?: number) => boolean; taken: THREE.Box3[]; midZ: () => number; pending: Promise<unknown>[] }): Promise<boolean> {
  const mod = (await hvData())[style];
  if (!mod?.floor || !mod.items.length) return false;
  const names = [...new Set(mod.items.map(i => i.m))];
  const catOf = new Map(mod.items.map(i => [i.m, i.cat]));
  const getModel = (n: string) => roomModel('hv/' + n, hvRule(catOf.get(n)!)).then(m => { if (HV_SHEER.test(catOf.get(n)!)) dropSheer(m); return m; });
  const loaded = new Map<string, THREE.Object3D | null>();
  // 몸체 상자를 미리 구워 뒀으면(data/hvboxes.json) 모델을 받기 전에 빈 자리표로 자리부터 잡는다 — 자리 계산은 상자만 쓴다.
  // 모델은 뒤에서 가구 → 소품 순으로 받아 자리표에 끼운다(사용자 지시 2026-11-12 「공간 → 장 → 가구 → 소품 절차적으로」)
  const boxes = await hvBoxData();
  const early = names.every(n => n in boxes && (boxes[n] === null || boxes[n]!.length === 6));
  if (early) for (const n of names) {
    const b = boxes[n];
    if (!b) { loaded.set(n, null); continue; }
    const px = new THREE.Group();
    px.userData.hvItem = true; px.userData.hvName = n;
    px.userData.coreL = new THREE.Box3(new THREE.Vector3(b[0], b[1], b[2]), new THREE.Vector3(b[3], b[4], b[5]));
    loaded.set(n, px);
  }
  else await Promise.all(names.map(async n => { loaded.set(n, await getModel(n).catch(() => null)); }));
  if (!alive()) return true;
  /** 복제 — 몸체 상자(coreL)도 함께. clone 은 userData 를 JSON 으로 옮겨 Box3 가 빠진다(자리표는 메시가 없어 다시 잴 수 없다) */
  const dup = (m: THREE.Object3D) => { const c = m.clone(true); const k = m.userData.coreL as THREE.Box3 | undefined; if (k?.isBox3) c.userData.coreL = k.clone(); return c; };
  const items = mod.items;
  const N = items.length;
  const [fx0, fx1, fz0, fz1] = mod.floor;
  // 아이템마다 따로 복제(같은 모델이 여러 번 나온다) · 홈뷰 자리 행렬(기울기 포함 전체 회전 q) · 모델 자체 상자 가운데(좌우 반전용)
  const objs = items.map(it => { const m = loaded.get(it.m); return m ? dup(m) : null; });
  /** 자리표에 모델 끼우기 — 놓인 것만, 가구(침대·책상·의자 등) 먼저 다 받고 소품 */
  const fill = () => {
    if (!early) return;
    const by = new Map<string, { ob: THREE.Object3D; furn: boolean; rug: boolean }[]>();
    objs.forEach((ob, i) => {
      if (!ob?.parent) return;
      const n = ob.userData.hvName as string;
      if (!by.has(n)) by.set(n, []);
      by.get(n)!.push({ ob, furn: items[i].role !== 'prop', rug: isRug(i) });
    });
    // 모델 하나씩 끼우고 한 프레임 쉰다 — 다시 지을 때는 모델을 이미 받아 둬서 가구·소품이 한 프레임에 다 들어오고, 그 프레임에서 셰이더를
    // 한꺼번에 지어 화면이 멈춘 뒤 다 된 모습이 한 번에 떴다(사용자 지적 2026-11-12 「한 번에 보여주려니 끊겨서 멈춘 느낌 — 공간과 장을 순차적으로」).
    // 한 개씩이면 셰이더 짓기도 프레임마다 나뉘고 가구가 하나씩 놓이는 게 보인다
    let line: Promise<void> = Promise.resolve();
    const put = (n: string, m: THREE.Object3D | null) => (line = line.then(async () => {
      if (!m || !alive()) return;
      const added: THREE.Object3D[] = [];
      by.get(n)!.forEach((t, k) => {
        const c = k ? m.clone(true) : m;
        c.position.set(0, 0, 0); c.quaternion.identity(); c.scale.set(1, 1, 1);
        if (t.rug) c.traverse(x => { x.castShadow = false; });
        t.ob.add(c); added.push(c);
      });
      o.onFill?.(added);
      await nextFrame();
    }));
    const wave = (furn: boolean) => Promise.all([...by.keys()].filter(n => by.get(n)!.some(t => t.furn) === furn)
      .map(n => getModel(n).catch(e => { console.warn('[홈뷰 꾸밈] 모델', n, e); return null; }).then(m => put(n, m))));
    ctx.pending.push(wave(true).then(() => { loadMark('가구 다 옴'); loadDoing('소품 받아 끼우기'); return alive() ? wave(false) : undefined; }).then(() => loadMark('소품 다 옴')));
  };
  // 비정상 크기·비율 소품 — 홈뷰 배율이 잘못 들어온 것(자녀방 벽 액자 11.6배 → 7.4m, 탁상 액자 6.1배 → 1.6m, 아기방 오르골 0.04배 → 8mm).
  // 배율을 버리고 모델 원래 크기로, 원래 크기도 이상하면 이 방의 같은 종류 정상 소품으로 바꾼다(사용자 지시 2026-11-03 「비율이 이상한 소품은 다른 걸로 교체」)
  const PROP_MAX: [RegExp, number][] = [[/Frame/, 1.3], [/Rug/, 4], [/Fabric|Matrres/, 2.6], [/Plant/, 2]];
  const nativeSize = (m: THREE.Object3D) => { const c = dup(m); c.position.set(0, 0, 0); c.quaternion.identity(); c.scale.set(1, 1, 1); return boxOf(c).getSize(new THREE.Vector3()); };
  const sane = (v: THREE.Vector3, cat: string) => { const mx = Math.max(v.x, v.y, v.z); return mx >= 0.03 && mx <= (PROP_MAX.find(([r]) => r.test(cat))?.[1] ?? 1); };
  const scl = items.map(it => [...it.s] as [number, number, number]);
  items.forEach((it, i) => {
    const m = loaded.get(it.m); if (it.role !== 'prop' || !it.cat.startsWith('ETC/') || !m) return;   // 침대 헤드 벽판(BedPanel 1.2m) 같은 가구 부품은 빼고
    const ns = nativeSize(m), sz = ns.clone().multiply(new THREE.Vector3(...it.s.map(Math.abs) as [number, number, number]));
    const ratio = Math.max(...it.s.map(Math.abs)) / Math.max(1e-6, Math.min(...it.s.map(Math.abs)));
    if (sane(sz, it.cat) && ratio <= 3) return;
    if (sane(ns, it.cat)) { scl[i] = [1, 1, 1]; console.info('[홈뷰 소품] 배율 무시', it.m, it.s); return; }
    const sub = items.find(o => o.cat === it.cat && o.m !== it.m && loaded.get(o.m) && sane(nativeSize(loaded.get(o.m)!).multiply(new THREE.Vector3(...o.s.map(Math.abs) as [number, number, number])), o.cat));
    objs[i] = sub ? dup(loaded.get(sub.m)!) : null;
    if (sub) scl[i] = [...sub.s] as [number, number, number];
    console.info('[홈뷰 소품] 교체', it.m, '→', sub?.m ?? '(뺌)');
  });
  const hvM: (THREE.Matrix4 | null)[] = [], localCx: number[] = [], hb: (THREE.Box3 | null)[] = [];
  objs.forEach((ob, i) => {
    if (!ob) { hvM.push(null); localCx.push(0); hb.push(null); return; }
    ob.position.set(0, 0, 0); ob.quaternion.identity(); ob.scale.set(1, 1, 1);
    const lb = boxOf(ob); localCx.push((lb.min.x + lb.max.x) / 2);
    const it = items[i];
    ob.position.set(...it.p);
    if (it.q) ob.quaternion.set(...it.q); else ob.rotation.set(0, THREE.MathUtils.degToRad(it.ry), 0);
    ob.scale.set(...scl[i]);
    ob.updateMatrixWorld(true);
    hvM.push(ob.matrix.clone()); hb.push(boxOf(ob));
  });
  const fwd = (i: number) => { const e = hvM[i]!.elements; return new THREE.Vector2(e[8], e[10]).normalize(); };
  const wallDist = (b: THREE.Box3): Record<Wall, number> => ({ L: b.min.x - fx0, R: fx1 - b.max.x, B: b.min.z - fz0, F: fz1 - b.max.z });
  const nearWall = (b: THREE.Box3, lim: number): Wall | null => { const d = Object.entries(wallDist(b)).sort((a, c) => a[1] - c[1])[0]; return d[1] < lim ? d[0] as Wall : null; };
  /** 등 붙인 벽 — 뒷면(-앞)이 향하는 벽이 35cm 안이면 그 벽, 아니면 가까운 벽 */
  const backWall = (i: number): Wall | null => {
    const f = fwd(i), b = hb[i]!;
    const w: Wall = Math.abs(f.x) > Math.abs(f.y) ? (f.x > 0 ? 'L' : 'R') : (f.y > 0 ? 'B' : 'F');
    return wallDist(b)[w] < 0.35 ? w : nearWall(b, 0.35);
  };
  // 깔개 — 이름이 Rug 이거나 바닥에 깔린 넓고 납작한 것(책상 위 노트·오르골처럼 납작한 소품은 아니다)
  const foot = (b: THREE.Box3) => (b.max.x - b.min.x) * (b.max.z - b.min.z);
  const isRug = (i: number) => /Rug/.test(items[i].cat) || (!!hb[i] && hb[i]!.max.y - hb[i]!.min.y < 0.04 && hb[i]!.min.y < 0.02 && foot(hb[i]!) > 0.5);
  const closet = (i: number) => items[i].cat.startsWith('Things/');
  const thin = (i: number) => { const b = hb[i]!; return Math.min(b.max.x - b.min.x, b.max.z - b.min.z) < 0.06; };
  const ok = (i: number) => !!objs[i];
  const mains = [...Array(N).keys()].filter(i => ok(i) && items[i].role === 'main' && !closet(i) && !thin(i));
  const closets = [...Array(N).keys()].filter(i => ok(i) && closet(i));
  const gap = (a: THREE.Box3, b: THREE.Box3) => Math.hypot(Math.max(a.min.x - b.max.x, 0, b.min.x - a.max.x), Math.max(a.min.z - b.max.z, 0, b.min.z - a.max.z));

  // ---- 1) 묶음 만들기
  // 원본 그대로(사용자가 끌어 옮기는 방)는 떨어져 있는 것끼리 따로 — 의자는 책상과 따로, 책상 위 소품은 책상과 하나(사용자 지시 2026-11-03).
  // 자동 배치(장 벽이 홈뷰와 다른 방)는 세트째 옮겨야 구성이 살아서 예전 묶음 그대로
  const apart = !!o.hvWall;
  const inFoot = (b: THREE.Box3, p: THREE.Vector3, m = 0.02) => p.x > b.min.x - m && p.x < b.max.x + m && p.z > b.min.z - m && p.z < b.max.z + m;
  // 원본 그대로면 바닥에 선 것은 가구·소품 모두 하나씩(사용자 지시 2026-11-03 — 침대·침대 패널·서랍장이 한 묶음이 돼 영역이 커져 장 자리와 겹쳤다).
  // 침구·패널 조명·상판 위 소품처럼 들려 있는 것만 받치거나 달고 있는 것을 따라간다
  const standing = (i: number) => ok(i) && !closet(i) && !isRug(i) && !thin(i) && items[i].role !== 'chair' && hb[i]!.min.y <= 0.03
    && !closets.some(k => inFoot(hb[k]!, hb[i]!.getCenter(new THREE.Vector3())));
  const hosts = apart ? [...Array(N).keys()].filter(i => mains.includes(i) || standing(i)) : mains;
  // 자동 배치면 큰 가구끼리 3cm 안으로 붙어 있으면 한 세트(침대+협탁, 책상+책장)
  const root = new Map<number, number>(hosts.map(i => [i, i]));
  const find = (i: number): number => (root.get(i) === i ? i : find(root.get(i)!));
  if (!apart) for (const a of mains) for (const b of mains) if (a < b && gap(hb[a]!, hb[b]!) < 0.03) root.set(find(a), find(b));
  const unitOf = new Map<number, Unit>();
  for (const i of hosts) { const r = find(i); if (!unitOf.has(r)) unitOf.set(r, { members: [], kind: 'furn', wall: null }); unitOf.get(r)!.members.push(i); }
  const units = [...unitOf.values()];
  const unitHaving = (j: number) => units.find(u => u.members.includes(j))!;
  for (let i = 0; i < N; i++) {
    if (!ok(i) || hosts.includes(i) || closet(i)) continue;
    const b = hb[i]!, c = b.getCenter(new THREE.Vector3());
    // 붙박이장 안·위 소품 — 우리 장이 대신하므로 뺀다
    if (closets.some(k => inFoot(hb[k]!, c))) continue;
    if (isRug(i)) { units.push({ members: [i], kind: 'rug', wall: null }); continue; }
    // 문짝·얇은 판 — 높이와 상관없이 자기와 가장 많이 겹치는 가구(3cm 여유)와 한 몸. 장 앞면을 덮는 문은 그 장이 가장 많이 겹친다.
    // 예전엔 바닥에서 3cm 뜬 책장 아래 문이 「바닥 판」 규칙(가장 가까운 가구)으로 옆 책상에 붙었다(사용자 지적 2026-11-04 「장과 붙은 도어는 하나로」)
    if (thin(i)) {
      const lap = (j: number) => { const q = hb[j]!.clone().expandByScalar(0.03).intersect(b.clone()); return q.isEmpty() ? 0 : (q.max.x - q.min.x + 1e-3) * (q.max.y - q.min.y) * (q.max.z - q.min.z + 1e-3); };
      const own = hosts.map(j => [j, lap(j)] as const).filter(x => x[1] > 0).sort((x, y) => y[1] - x[1])[0];
      if (own) { unitHaving(own[0]).members.push(i); continue; }
    }
    const lifted = b.min.y > 0.03;
    if (lifted) {
      // 받치는 가구(발자국 안 · 윗면이 소품 밑 근처)
      // 원본 그대로면 윗면에 얹힌 것만(3cm) — 10cm 면 협탁 위로 떠 있는 패널 조명이 협탁에 붙었다(핀조명을 패널 구멍 높이 53cm 로 내리자
      // 협탁 윗면 49cm 와 4.3cm 라 5cm 에서도 붙었다). 책 위에 얹은 것은 아래 「겹쳐 쌓인 것」이 받는다
      const sup = hosts.filter(j => inFoot(hb[j]!, c) && hb[j]!.max.y >= b.min.y - (apart ? 0.03 : 0.1) && hb[j]!.min.y <= b.min.y + 0.02)
        .sort((x, y) => hb[y]!.max.y - hb[x]!.max.y)[0];
      if (sup !== undefined) { unitHaving(sup).members.push(i); continue; }
      // 옆에 달린 것(패널 조명·벽 선반) — 닿아 있고 그 높이까지 올라오는 것 중 가장 높은 것
      const hang = apart ? hosts.filter(j => gap(hb[j]!, b) < 0.03 && hb[j]!.max.y >= b.min.y + 0.05).sort((x, y) => hb[y]!.max.y - hb[x]!.max.y)[0] : undefined;
      if (hang !== undefined) { unitHaving(hang).members.push(i); continue; }
      // 책 위에 얹은 시계·소품처럼 겹쳐 쌓인 것 — 받침 윗면에서 10cm 안
      const low = apart ? hosts.filter(j => inFoot(hb[j]!, c) && hb[j]!.max.y >= b.min.y - 0.1 && hb[j]!.min.y <= b.min.y + 0.02).sort((x, y) => hb[y]!.max.y - hb[x]!.max.y)[0] : undefined;
      if (low !== undefined) { unitHaving(low).members.push(i); continue; }
      // 벽 장식(액자·시계·벽 선반) — 같은 벽에 등 붙인 가구 위면 그 묶음, 아니면 혼자 그 벽에
      const w = nearWall(b, 0.12);
      if (w) {
        const along = (x: THREE.Box3) => (w === 'L' || w === 'R' ? [x.min.z, x.max.z] : [x.min.x, x.max.x]);
        const [a0, a1] = along(b);
        // 원본 그대로면 벽 장식은 늘 혼자 — 침대 위 액자가 침대 묶음에 붙어 있었다(사용자 지시 2026-11-03 「침대는 침구·매트리스만 한 덩어리」).
        // 거울은 예외 — 화장대 거울은 화장대와 한 몸이라 화장대를 옮기면 따라가야 한다(옮긴 화장대 위에 거울이 없었다, 사용자 지적 2026-11-03)
        const onWall = (j: number) => backWall(j) === w && along(hb[j]!)[0] - 0.15 < a1 && along(hb[j]!)[1] + 0.15 > a0;
        const host = !apart ? hosts.find(onWall)
          : /Mirror/.test(items[i].cat) ? hosts.filter(j => onWall(j) && hb[j]!.max.y <= b.min.y + 0.05).sort((x, y) => hb[y]!.max.y - hb[x]!.max.y)[0]
          : undefined;
        if (host !== undefined) unitHaving(host).members.push(i);
        else units.push({ members: [i], kind: 'decor', wall: w });
        continue;
      }
    }
    // 의자 — 책상·화장대·테이블 짝(80cm 안)이면 그 묶음, 아니면 혼자(흔들의자가 아기 침대 묶음에 붙어 묶음이 2.9m 가 돼 아무 데도 못 들어갔다)
    if (items[i].role === 'chair') {
      const mate = mains.filter(j => /Desk|Vanity|Table/.test(items[j].cat)).map(j => [j, gap(hb[j]!, b)] as const).sort((x, y) => x[1] - y[1])[0];
      if (!apart && mate && mate[1] < 0.8) unitHaving(mate[0]).members.push(i);
      else units.push({ members: [i], kind: 'furn', wall: null });
      continue;
    }
    // 바닥 소품·얇은 판 — 가까운 가구 묶음에(판은 1.2m, 소품은 0.5m 안). 없으면 판은 빼고 소품은 혼자
    // 원본 그대로면 소품은 가구에 닿아 있을 때(3cm)만 그 묶음
    // 원본 그대로면 떠 있는 얇은 것(벽시계 — 벽에서 20cm 라 벽 장식 판정에 안 걸렸다)은 1.2m 밖 침대에 붙지 않고 혼자 그 벽에
    if (apart && lifted) { const w = nearWall(b, 0.5); if (w) units.push({ members: [i], kind: 'decor', wall: w }); continue; }
    const lim = thin(i) ? 1.2 : apart ? 0.03 : 0.5;
    const near = mains.map(j => [j, gap(hb[j]!, b)] as const).sort((x, y) => x[1] - y[1])[0];
    if (near && near[1] < lim) unitHaving(near[0]).members.push(i);
    else if (!lifted && !thin(i)) units.push({ members: [i], kind: 'furn', wall: null });
  }
  // 세트(큰 가구 2개 이상) — 통째로 안 들어가면 가구별로 나눠 다시 해 본다. 소품은 가까운 가구를 따라간다
  for (const u of units) {
    const big = u.members.filter(i => mains.includes(i));
    if (big.length < 2) continue;
    const parts = big.map(j => [j]);
    for (const i of u.members) if (!big.includes(i)) {
      const c = hb[i]!.getCenter(new THREE.Vector3());
      const k = big.map((j, n) => [n, inFoot(hb[j]!, c) ? -1 : gap(hb[j]!, hb[i]!)] as const).sort((x, y) => x[1] - y[1])[0][0];
      parts[k].push(i);
    }
    // 나눠 놓을 땐 큰 가구(침대 먼저)부터 — 작은 선반이 먼저 자리를 잡아 아기 침대가 빠졌다
    const w = (j: number) => foot(hb[j]!) * (/Bed$/.test(items[j].cat) ? 3 : 1);
    u.parts = parts.sort((x, y) => w(y[0]) - w(x[0]));
  }

  // ---- 2) 홈뷰 벽 하나를 우리 장 벽(z = 0)으로 — 붙박이장이 있으면 그 벽. 없으면 네 벽 × 좌우 반전을 모두 놓아 보고 많이 들어가는 쪽
  // (「가구가 적은 벽」으로 정했더니 아기방 책장 벽이 장 벽이 돼 책장이 방 가운데로 밀려났다)
  const rigid = !!o.hvWall;                                 // 원본 방 그대로 — 고른 벽이 장 벽, 밀어 옮기지 않는다
  let backs: Wall[] = rigid ? [o.hvWall!] : ['B', 'F', 'L', 'R'];
  let closetFace: number | null = null;                       // 홈뷰 붙박이장 앞면 깊이(뒷벽에서)
  if (closets.length) {
    const k = closets.sort((a, c) => foot(hb[c]!) - foot(hb[a]!))[0];
    const w = backWall(k) ?? nearWall(hb[k]!, 9)!;
    if (!rigid) backs = [w];
    if (!rigid || w === o.hvWall) closetFace = { L: hb[k]!.max.x - fx0, R: fx1 - hb[k]!.min.x, B: hb[k]!.max.z - fz0, F: fz1 - hb[k]!.min.z }[w];
  }
  // 우리 장 앞면 · 장 앞 비움(도어 여는 자리 60cm) 끝. 홈뷰 붙박이장 앞에 붙어 있던 가구는 비움 끝에 붙인다
  // (장 앞면에 붙였더니 비움 자리에 걸려 침대·책상이 통째로 빠졌다)
  // 빈자리 판정(free)이 비움 둘레 5cm 를 더 막으므로 6cm 띄운다
  const clearEnd = Math.max(0, ...(o.avoid ?? []).filter(r => r[2] <= 0.01).map(r => r[3])) + 0.06;
  const wardFront = Math.max(0, clearEnd - 0.66);
  // 홈뷰(x, z) → 정규 좌표(u = 뒷벽 따라, v = 뒷벽에서 방 안쪽). 회전 행렬이 되게 u 를 고른다(L: u = -z, R: u = +z, B: +x, F: -x)
  const axes: Record<Wall, [[number, number], [number, number]]> = {
    B: [[1, 0], [0, 1]], F: [[-1, 0], [0, -1]], L: [[0, -1], [1, 0]], R: [[0, 1], [-1, 0]],
  };
  const corners = [[fx0, fz0], [fx1, fz0], [fx0, fz1], [fx1, fz1]];
  const Wo = o.x1 - o.x0;
  type Pose = { pos: THREE.Vector3; quat: THREE.Quaternion; scl: THREE.Vector3; box: THREE.Box3 };
  /** 반전 여부 하나로 전부 놓아 본다. dry 면 놓지 않고 점수만(놓인 큰 가구 발자국 합) */
  const arrange = (back: Wall, mirror: boolean, dry: boolean) => {
    const backFace = closetFace ?? 0;
    const [ua, va] = axes[back];
    const u = mirror ? [-ua[0], -ua[1]] : ua;
    const tu = -Math.min(...corners.map(c => c[0] * u[0] + c[1] * u[1]));
    const tv = -Math.min(...corners.map(c => c[0] * va[0] + c[1] * va[1]));
    const Wh = Math.max(...corners.map(c => c[0] * u[0] + c[1] * u[1])) + tu, Dh = Math.max(...corners.map(c => c[0] * va[0] + c[1] * va[1])) + tv;
    const G = new THREE.Matrix4().set(u[0], 0, u[1], tu, 0, 1, 0, 0, va[0], 0, va[1], tv, 0, 0, 0, 1);
    // 아이템별 정규 자세 — 반전이면 모델을 자기 상자 가운데에서 좌우로 다시 뒤집어 형상은 그대로 둔다
    const pose: (Pose | null)[] = objs.map((ob, i) => {
      if (!ob) return null;
      const m = G.clone().multiply(hvM[i]!);
      if (mirror) m.multiply(new THREE.Matrix4().makeTranslation(localCx[i], 0, 0)).multiply(new THREE.Matrix4().makeScale(-1, 1, 1)).multiply(new THREE.Matrix4().makeTranslation(-localCx[i], 0, 0));
      const p: Pose = { pos: new THREE.Vector3(), quat: new THREE.Quaternion(), scl: new THREE.Vector3(), box: new THREE.Box3() };
      m.decompose(p.pos, p.quat, p.scl);
      ob.position.copy(p.pos); ob.quaternion.copy(p.quat); ob.scale.copy(p.scl); ob.updateMatrixWorld(true);
      p.box = boxOf(ob);
      return p;
    });
    const taken0 = ctx.taken.length;
    let score = 0;
    const out: { i: number; dx: number; dz: number }[] = [];
    const boxOfMembers = (ms: number[]) => ms.reduce((b, i) => b.union(pose[i]!.box), new THREE.Box3());
    /** 정규 상자 → 우리 방 자리(x, z 이동량). 벽에 붙은 쪽은 벽과의 거리를 그대로, 아니면 방 크기 비율로 */
    const target = (b: THREE.Box3) => {
      let dx: number, dz: number;
      const l = b.min.x, r = Wh - b.max.x;
      if (l < 0.35 && l <= r) dx = o.x0 + l - b.min.x;
      else if (r < 0.35) dx = o.x1 - r - b.max.x;
      else dx = o.x0 + ((b.min.x + b.max.x) / 2) * Wo / Wh - (b.min.x + b.max.x) / 2;
      const near = b.min.z - backFace, far = Dh - b.max.z;
      if (rigid) {
        // 원본 방 그대로 — 뒷벽(장 벽)·맞은편 벽과의 거리를 지키고, 가운데는 방 깊이 비율로
        if (b.min.z < 0.35 && b.min.z <= far) dz = 0;
        else if (far < 0.35) dz = o.D - far - b.max.z;
        else dz = ((b.min.z + b.max.z) / 2) * o.D / Dh - (b.min.z + b.max.z) / 2;
        return { dx, dz, onU: l < 0.35 || r < 0.35, onV: b.min.z < 0.35 || far < 0.35 };
      }
      if (near < 0.35 && near <= far) dz = clearEnd + Math.max(0, near) - b.min.z;
      else if (far < 0.35) dz = o.D - far - b.max.z;
      else { const t = ((b.min.z + b.max.z) / 2 - backFace) / Math.max(0.1, Dh - backFace); dz = clearEnd + t * (o.D - clearEnd) - (b.min.z + b.max.z) / 2; }
      return { dx, dz, onU: l < 0.35 || r < 0.35, onV: near < 0.35 || far < 0.35 };
    };
    const floorMembers = (ms: number[]) => ms.filter(i => pose[i]!.box.min.y < 0.3);
    const tryPlace = (ms: number[], kind: Unit['kind']) => {
      // 자리 맞춤·충돌은 가구 본체로 — 침대 이불처럼 원본에서도 벽 밖으로 삐져나온 소품 상자에 끌려 침대가 벽에서 밀려났다
      const b = boxOfMembers(ms);
      const big = ms.filter(i => mains.includes(i));
      const mb = boxOfMembers(big.length ? big : ms);
      const solid = floorMembers(ms).filter(i => items[i].role !== 'prop' || !big.length);
      const fb = boxOfMembers(solid.length ? solid : ms);
      const h = fb.max.y;
      const t = target(mb);
      if (rigid && kind !== 'rug') return t;          // 원본 그대로 — 겹침·이동은 놓을 때(아래) 묶음째 판정
      // 붙은 벽 = 가장 큰 가구의 등이 향한 정규 벽(35cm 안). 그 벽을 따라서만 민다
      const lead = [...(big.length ? big : ms)].sort((x, y) => foot(pose[y]!.box) - foot(pose[x]!.box))[0];
      const fw = new THREE.Vector3(0, 0, 1).applyQuaternion(pose[lead]!.quat);
      const wallOf = (): 'u' | 'v' | null => {
        if (!big.length) return null;
        if (Math.abs(fw.x) > Math.abs(fw.z)) return (fw.x > 0 ? mb.min.x : Wh - mb.max.x) < 0.35 ? 'u' : null;
        return (fw.z > 0 ? mb.min.z - backFace : Dh - mb.max.z) < 0.35 ? 'v' : null;
      };
      const along = wallOf();
      if (kind === 'rug') {
        // 깔개 — 겹쳐도 된다. 방 안으로만
        const dx = THREE.MathUtils.clamp(t.dx, o.x0 + 0.05 - b.min.x, o.x1 - 0.05 - b.max.x), dz = THREE.MathUtils.clamp(t.dz, wardFront + 0.05 - b.min.z, o.D - 0.05 - b.max.z);
        return { dx, dz };
      }
      const fits = (dx: number, dz: number) => {
        // 방 안(벽 장식 포함 전체) + 바닥 자리(가구 발자국)
        if (fb.min.x + dx < o.x0 - 0.005 || fb.max.x + dx > o.x1 + 0.005 || fb.min.z + dz < -0.005 || fb.max.z + dz > o.D + 0.005) return false;
        // 소품은 가운데가 방 안이면 된다(이불·쿠션은 원본에서도 벽 너머로 삐져나와 있다)
        if (ms.some(i => { const c = pose[i]!.box.getCenter(new THREE.Vector3()); return c.x + dx < o.x0 || c.x + dx > o.x1 || c.z + dz < 0 || c.z + dz > o.D; })) return false;
        if (kind === 'decor') {
          // 벽 장식 — 장 앞(뒷벽)·창 자리엔 걸 수 없다
          if (b.min.z + dz < wardFront + 0.05) return false;
          const zn = o.win.zone;
          if (b.max.x + dx > zn[0] && b.min.x + dx < zn[1] && b.max.z + dz > zn[2] && b.min.z + dz < zn[3]) return false;
          return true;
        }
        if (rigid) {
          // 원본 그대로 — 장·통로·방문과 실제로 겹칠 때만 뺀다(빈자리 검사의 둘레 5cm 여유를 두면 장 앞 통로 끝에 붙은 침대가 빠졌다)
          const x0 = fb.min.x + dx, x1 = fb.max.x + dx, z0 = fb.min.z + dz, z1 = fb.max.z + dz, zn = o.win.zone;
          return !(o.avoid ?? []).some(r => x0 < r[1] - 0.005 && x1 > r[0] + 0.005 && z0 < r[3] - 0.005 && z1 > r[2] + 0.005)
            && !ctx.taken.some(q => x0 < q.max.x - 0.005 && x1 > q.min.x + 0.005 && z0 < q.max.z - 0.005 && z1 > q.min.z + 0.005)
            && !(h > 1.2 && x1 > zn[0] && x0 < zn[1] && z1 > zn[2] && z0 < zn[3]);
        }
        return ctx.free(fb.min.x + dx, fb.max.x + dx, fb.min.z + dz, fb.max.z + dz, h);
      };
      if (fits(t.dx, t.dz)) return t;
      if (rigid) return null;                          // 원본 그대로 — 장·통로·방문에 걸리면 그 묶음만 뺀다(사용자 선택 2026-11-02)
      // 붙은 벽을 따라서만 가까운 빈 곳 — 벽에서 떼어 방 가운데로 밀지 않는다(아기방 책장이 방 한가운데 섰다).
      // 옆벽(u)에 붙었으면 앞뒤로, 뒷·앞벽(v)에 붙었으면 좌우로, 구석이면 둘 다, 가운데 가구는 좌우 먼저
      const dirs: [number, number][] = along === 'u' ? [[0, 1]] : along === 'v' ? [[1, 0]] : kind === 'decor' ? (t.onU ? [[0, 1]] : [[1, 0]]) : [[1, 0], [0, 1]];
      for (const [ax, az] of dirs) for (let k = 1; k <= 40; k++) for (const s of [1, -1]) {
        const dx = t.dx + ax * s * k * 0.05, dz = t.dz + az * s * k * 0.05;
        if (fits(dx, dz)) return { dx, dz };
      }
      return null;
    };
    const unitsOut: { ms: number[]; dx: number; dz: number; kind: Unit['kind'] }[] = [];
    const commit = (ms: number[], at: { dx: number; dz: number }, kind: Unit['kind'] = 'furn') => {
      for (const i of ms) out.push({ i, dx: at.dx, dz: at.dz });
      unitsOut.push({ ms, dx: at.dx, dz: at.dz, kind });
      if (!rigid) for (const i of floorMembers(ms)) { const bb = pose[i]!.box.clone().translate(new THREE.Vector3(at.dx, 0, at.dz)); ctx.taken.push(bb); }
      // 점수 = 놓인 큰 가구 발자국 합. 침대는 3배 — 방의 주인공이 빠지고 작은 가구만 많이 들어가는 배치를 고르지 않게(아기방 아기 침대가 빠졌다)
      score += ms.filter(i => mains.includes(i)).reduce((n, i) => n + foot(pose[i]!.box) * (/Bed$/.test(items[i].cat) ? 3 : 1), 0) + ms.length * 0.01;
    };
    // 큰 묶음부터 — 침대·세트가 먼저 자리를 잡는다. 깔개는 맨 나중
    const order = [...units].sort((a, c) => (a.kind === 'rug' ? 1 : 0) - (c.kind === 'rug' ? 1 : 0) || foot(boxOfMembers(c.members)) - foot(boxOfMembers(a.members)));
    for (const un of order) {
      const at = tryPlace(un.members, un.kind);
      if (at) { commit(un.members, at, un.kind); continue; }
      for (const part of un.parts ?? []) { const a2 = tryPlace(part, 'furn'); if (a2) commit(part, a2); }
    }
    if (dry) ctx.taken.length = taken0;
    return { score, out, pose, unitsOut };
  };
  let pick: [Wall, boolean] = [backs[0], false], top = -1;
  for (const w of backs) for (const mi of rigid ? [false] : [false, true]) { const r = arrange(w, mi, true); if (r.score > top + 1e-6) { top = r.score; pick = [w, mi]; } }
  const best = arrange(pick[0], pick[1], false);
  // 큰 가구가 절반도 못 들어가면(좁은 방) 꾸밈을 버리고 예전 규칙으로
  const placedMains = best.out.filter(x => mains.includes(x.i)).length;
  if (!rigid && placedMains < Math.ceil(mains.length / 2)) { ctx.taken.length = 0; return false; }
  const nameOf = (i: number) => { const it = items[i]; return /Bed$/.test(it.cat) && it.role === 'main' ? 'bed' : it.role !== 'prop' ? 'room-furn' : /Fabric|Matrres/.test(it.cat) ? 'bedding' : 'room-deco'; };
  if (!rigid) {
    for (const { i, dx, dz } of best.out) {
      const ob = objs[i]!, p = best.pose[i]!;
      ob.position.set(p.pos.x + dx, p.pos.y, p.pos.z + dz); ob.quaternion.copy(p.quat); ob.scale.copy(p.scl);
      ob.name = nameOf(i);
      if (isRug(i)) ob.traverse(mm => { mm.castShadow = false; });
      g.add(ob);
    }
    fill();
    return true;
  }
  // ---- 원본 그대로 — 묶음마다 그룹(hv-unit)으로. 바닥 가운데가 기준점이라 끌어 옮기고 90° 돌린다.
  // 장·장 앞 통로·방문·다른 묶음과 겹치면 빼지 않고 표시만(userData.conflict) — 사용자가 골라 옮긴다
  const moves = o.moves ?? {};
  // 커튼 자리(창 앞 키 큰 가구)는 겹침으로 치지 않는다 — 커튼이 그 가구를 피해 접힌다(2026-11-03). 원본 배치인데 빨갛게 보였다
  // 의자는 책상·테이블 밑으로 들어간다 — 의자 ↔ 책상 묶음끼리는 겹쳐도 겹침이 아니다(scene.ts unitObstacles 와 같은 규칙)
  const tuckOf = new Map<THREE.Box3, 'chair' | 'table'>();
  const free = (x0: number, x1: number, z0: number, z1: number, tuck?: 'chair' | 'table') =>
    x0 >= o.x0 - 0.005 && x1 <= o.x1 + 0.005 && z0 >= -0.005 && z1 <= o.D + 0.005
    && !(o.avoid ?? []).some(r => x0 < r[1] - 0.005 && x1 > r[0] + 0.005 && z0 < r[3] - 0.005 && z1 > r[2] + 0.005)
    // 묶음끼리는 3cm 까지 봐준다 — 원본에서 서로 붙어 있던 가구(서랍장↔책상 1cm, 패널↔서랍장 3cm 파고듦)를 따로 나누자 서로 빨갛게 됐다
    && !ctx.taken.some(q => (!tuck || !tuckOf.has(q) || tuckOf.get(q) === tuck) && x0 < q.max.x - 0.03 && x1 > q.min.x + 0.03 && z0 < q.max.z - 0.03 && z1 > q.min.z + 0.03);
  const wardZ = Math.max(0, ...(o.avoid ?? []).filter(r => r[2] <= 0.01).map(r => r[3] - (o.aisle ?? 0.6)));   // 장 앞면(장이 없으면 0)
  for (const u of best.unitsOut) {
    // 열쇠 = 묶음 바탕(바닥에 선 가구 하나) — 붙는 소품이 바뀌어도 그대로. 예전엔 소속 중 가장 작은 번호라 묶음 규칙을 바꾸자
    // 침대 세트에 저장된 이동(78cm)이 협탁에 붙어 엉뚱한 가구가 빨갛게 됐다(2026-11-03)
    const key = 'u' + (u.ms.find(i => hosts.includes(i)) ?? Math.min(...u.ms)), mv = moves[key];
    o.unitsInfo?.push({ key, label: unitLabel(u.ms.map(i => items[i])), del: !!mv?.del });
    if (mv?.del) continue;
    const bx = u.ms.reduce((b, i) => b.union(best.pose[i]!.box), new THREE.Box3()).translate(new THREE.Vector3(u.dx, 0, u.dz));
    const c = bx.getCenter(new THREE.Vector3());
    const ug = new THREE.Group(); ug.name = 'hv-unit'; ug.userData.hvUnit = key; ug.userData.kind = u.kind;
    ug.userData.hvBase = new THREE.Vector3(c.x, 0, c.z);   // 옮기기 전 기준점 — 벽째 옮긴 벽 장식은 여기서 바로 잰다(main.ts)
    const tuck = u.ms.every(i => items[i].role === 'chair') ? 'chair' as const
      : u.ms.some(i => mains.includes(i) && /Desk|Vanity|Table/.test(items[i].cat)) ? 'table' as const : undefined;
    ug.userData.tuck = tuck;
    ug.position.set(c.x + (mv?.dx ?? 0), u.kind === 'decor' ? mv?.dy ?? 0 : 0, c.z + (mv?.dz ?? 0));   // 벽 장식은 높이도 옮긴다
    // 돌린 각 — 예전엔 이 줄이 윗줄 주석 안에 들어가 있어 방을 다시 만들면 돌린 가구가 0° 로 돌아갔다(사용자 지적 2026-11-06 「회전 시 각도가 안 보인다」)
    ug.rotation.y = ((mv?.rot ?? 0) * 90 + (mv?.ang ?? 0)) * Math.PI / 180;
    for (const i of u.ms) {
      const ob = objs[i]!, p = best.pose[i]!;
      ob.position.set(p.pos.x + u.dx - c.x, p.pos.y, p.pos.z + u.dz - c.z); ob.quaternion.copy(p.quat); ob.scale.copy(p.scl);
      ob.name = nameOf(i); ob.userData.hvCode = items[i].m;   // 상품코드 — 묶음 확인용
      if (isRug(i)) ob.traverse(mm => { mm.castShadow = false; });
      ug.add(ob);
    }
    g.add(ug); ug.updateMatrixWorld(true);
    // 겹침 — 바닥에 선 본체(가구·의자)로. 소품만 있는 묶음은 그 소품으로
    const solid = u.ms.filter(i => best.pose[i]!.box.min.y < 0.3 && (items[i].role !== 'prop' || !u.ms.some(j => mains.includes(j))));
    const boxes = (solid.length ? solid : u.ms).map(i => boxOf(objs[i]!));
    const fb = boxes.reduce((b, x) => b.union(x), new THREE.Box3());
    let conflict = false;
    if (u.kind === 'decor') {
      // 장 벽 장식 — 장·방문 자리(벽에 붙은 비울 자리)와 가로로 겹치면 겹침. 사용자가 옮기지 않았으면 그 벽에서 가장 가까운 빈 자리로 민다
      // (장을 놓은 벽에 원래 걸려 있던 시계가 장 앞면에 박혀 빨갛게 됐다, 2026-11-03)
      const blk = mv?.free ? [] : (o.avoid ?? []).filter(r => r[2] <= 0.01);   // 사용자가 벽째 옮긴 것은 밀지 않는다
      const hitB = (a0: number, a1: number) => blk.some(r => a0 < r[1] - 0.005 && a1 > r[0] + 0.005);
      // 미는 자리는 옮기기 전(원래) 자리로 정한다 — 옮긴 값(dx)은 민 자리 기준이라, 옮겼다고 밀기를 빼면 높이만 바꿔도 장식이 옆으로 튀었다(2026-11-05)
      const base = fb.clone().translate(new THREE.Vector3(-(mv?.dx ?? 0), 0, -(mv?.dz ?? 0)));
      if (base.min.z < wardZ + 0.05 && hitB(base.min.x, base.max.x)) {
        const wd = base.max.x - base.min.x;
        const cand = blk.flatMap(r => [r[0] - 0.05 - wd, r[1] + 0.05]).filter(a => a >= o.x0 + 0.05 && a + wd <= o.x1 - 0.05 && !hitB(a, a + wd));
        const a = cand.sort((p, q) => Math.abs(p - base.min.x) - Math.abs(q - base.min.x))[0];
        if (a !== undefined) { ug.position.x += a - base.min.x; fb.translate(new THREE.Vector3(a - base.min.x, 0, 0)); ug.updateMatrixWorld(true); }
      }
      // 사용자가 옮긴 벽 장식은 장·방문·창과 겹쳐도 그대로 둔다(사용자 지시 2026-11-05 「소품들은 무시하고 배치 가능하도록」)
      conflict = !mv && fb.min.z < wardZ + 0.05 && hitB(fb.min.x, fb.max.x);
    }
    else if (u.kind !== 'rug') conflict = !free(fb.min.x, fb.max.x, fb.min.z, fb.max.z, tuck);
    ug.userData.conflict = conflict;
    // 바닥 발자국(묶음 기준점 기준, 돌리기 전) — 끌고 돌릴 때 벽·장·다른 가구에 막히고 붙는 판정(scene.ts constrainUnit)
    const lb = (solid.length ? solid : u.ms).reduce((b, i) => b.union(best.pose[i]!.box), new THREE.Box3()).translate(new THREE.Vector3(u.dx - c.x, 0, u.dz - c.z));
    ug.userData.fpL = [lb.min.x, lb.max.x, lb.min.z, lb.max.z];
    if (!conflict && u.kind === 'furn') { ctx.taken.push(...boxes); if (tuck) for (const b of boxes) tuckOf.set(b, tuck); }
  }
  fill();
  return true;
}

export async function addHomvueRoom(g: THREE.Group, o: RoomFurnishOpts, alive: () => boolean) {
  const style = o.style ?? 'master';
  const SET: Record<RoomStyle, string[]> = {
    master: ['style/master_dresser'],
    baby: ['style/baby_bed', 'style/baby_store', 'style/baby_chair', 'style/baby_mat'],
    student: ['style/stu_bed', 'style/stu_desk', 'style/stu_chair', 'style/stu_store'],
    adult: ['style/adult_bed', 'style/adult_desk', 'style/adult_chair', 'style/adult_ns'],
    'dress-builtin': ['style/dr_island', 'style/dr_vanity'],
    'dress-system': ['style/dr_sys_a', 'style/dr_sys_b', 'style/dr_sys_m', 'style/dr_island'],
    'dress-mixed': ['style/dr_sys_m', 'style/dr_sys_b', 'style/dr_island', 'style/dr_vanity'],
  };
  const load = (n: string) => roomModel(n).then(m => { if (n === 'bedding') dropSheer(m); return m; }).catch(e => { console.warn('[방 소품]', n, e); return null; });
  const master = style === 'master', dress = style.startsWith('dress');
  const curtainP = load('curtain');
  type M = THREE.Object3D | null;
  const none = null as M;     // 「null 로만 대입됐다」고 좁혀 읽지 않게(아래 loadLegacy 가 채운다)
  let bedM = none, beddingM = none, ns1 = none, ns2 = none, shelfM = none, art1M = none, art2M = none, rugM = none, plantM = none, lampM = none;
  const extra = new Map<string, THREE.Object3D | null>();
  /** 예전 규칙 가구·소품 — 홈뷰 꾸밈을 못 쓸 때(드레스룸·좁은 방)만 받는다. 예전엔 늘 먼저 받아, 홈뷰 꾸밈을 쓰는 안방에서도
   *  안 쓰는 침구(8MB)·침대·화분 등 14MB 를 다 받은 뒤에야 홈뷰 가구를 받기 시작했다(처음 열기 11초 지연, 실측 2026-11-12) */
  const loadLegacy = async () => {
    [bedM, beddingM, ns1, ns2, shelfM, art1M, art2M, rugM, plantM, lampM] = await Promise.all(
      // 스타일마다 색·재질 톤을 하나로(사용자 지적 2026-10-30 「톤이 섞여 정신없다」) — 안방 = 월넛 + 부클 베이지(옆 서랍장도 월넛),
      // 자녀방(성인) = 오크 + 블랙(책장 BKIC04243 오크·블랙 다리), 학생방 = 화이트, 아기방 = 화이트 + 파스텔, 드레스룸 = 올 화이트
      [master ? 'bed' : '', dress ? '' : 'bedding', master ? 'nightstand' : '', master ? 'nightstand' : '', master ? 'style/master_chest' : style === 'adult' ? 'shelf' : '',
        'art1', master || dress ? 'art2' : '', dress || style !== 'baby' ? 'rug' : '', 'plant', 'lamp'].map(n => (n ? load(n) : Promise.resolve(null))));
    await Promise.all(SET[style].map(async n => { extra.set(n.slice(6), await load(n)); }));
  };
  /** 자리를 먼저 잡고 뒤에서 끼우는 모델 받기(홈뷰 꾸밈) — 다 끼워진 뒤에 끝난다 */
  const pending: Promise<unknown>[] = [];
  const W = o.x1 - o.x0, cx = (o.x0 + o.x1) / 2;
  // ---- 공통 도구 — 빈 자리 판정(방문 열림·장 앞·커튼 자리·놓인 가구) · 구석 · 맞은편 벽 한 줄 · 왼쪽 벽
  const taken: THREE.Box3[] = [];
  // 벽에 맞닿는 건 된다(홈뷰 가구는 벽에 딱 붙어 있다 — 2cm 여유를 요구했더니 전부 탈락했다). 커튼 자리 = 커튼박스 폭(20cm)+5cm
  // 커튼 자리는 키 큰 가구(1.2m 넘게 — 장·책장)만 막는다. 침대·책상·낮은 수납장은 창가에 붙어도 되고 커튼이 그만큼 접힌다
  // (작은 방 2970×3500 에서 침대가 창가 모서리까지 닿아야 했다 — 막았더니 들어갈 자리가 없었다)
  const free = (x0: number, x1: number, z0: number, z1: number, h = 9) =>
    x0 >= o.x0 - 0.005 && x1 <= o.x1 + 0.005 && z1 <= o.D + 0.005 && z0 >= -0.005
    && !(o.avoid ?? []).some(r => x0 < r[1] + 0.05 && x1 > r[0] - 0.05 && z0 < r[3] + 0.05 && z1 > r[2] - 0.05)
    && !taken.some(t => x0 < t.max.x - 0.005 && x1 > t.min.x + 0.005 && z0 < t.max.z - 0.005 && z1 > t.min.z + 0.005)
    && !(h > 1.2 && x1 > o.win.zone[0] && x0 < o.win.zone[1] && z1 > o.win.zone[2] && z0 < o.win.zone[3]);   // 창 쪽 커튼 자리
  const placeAt = (obj: THREE.Object3D, x: number, z: number, y = 0) => {
    const b = boxOf(obj);
    obj.position.x += x - (b.min.x + b.max.x) / 2; obj.position.z += z - (b.min.z + b.max.z) / 2; obj.position.y += y - b.min.y;
  };
  const add = (obj: THREE.Object3D, name = 'room-furn') => { obj.name = name; g.add(obj); taken.push(boxOf(obj)); return obj; };
  /** 맞은편 벽(+z)을 따라 왼→오 한 줄 — 빈 곳 중 가운데(want)에 가까운 자리. 안 들어가면 뒤에서부터 optional 을 뺀다 */
  const frontRow = (items: { o: THREE.Object3D; gap?: number; optional?: boolean; name?: string }[], want = cx) => {
    const list = [...items];
    while (list.length) {
      const ws = list.map(it => { const b = boxOf(it.o); return { w: b.max.x - b.min.x, d: b.max.z - b.min.z }; });
      const total = ws.reduce((n, s, i) => n + s.w + (i ? (list[i].gap ?? 0.05) : 0), 0);
      let best: number | null = null;
      for (let a = o.x0 + 0.02; a + total <= o.x1 - 0.02; a += 0.02) {
        let x = a, ok = true;
        for (let i = 0; i < list.length && ok; i++) { if (i) x += list[i].gap ?? 0.05; if (!free(x, x + ws[i].w, o.D - 0.02 - ws[i].d, o.D - 0.02)) ok = false; x += ws[i].w; }
        if (ok && (best === null || Math.abs(a + total / 2 - want) < Math.abs(best + total / 2 - want))) best = a;
      }
      if (best !== null) {
        let x = best;
        list.forEach((it, i) => { if (i) x += it.gap ?? 0.05; placeBox(it.o, x + ws[i].w / 2, o.D - 0.02); add(it.o, it.name); x += ws[i].w; });
        return list.map(it => it.o);
      }
      const k = list.map(it => !!it.optional).lastIndexOf(true);
      if (k < 0) return [];
      list.splice(k, 1);
    }
    return [];
  };
  /** 왼쪽 벽(x0)에 붙여 방 쪽(+x)을 보게 — 앞에 비울 깊이(front, 의자 등) 포함 빈 곳 중 want 에 가까운 z */
  const leftWall = (obj: THREE.Object3D, want: number, front = 0) => {
    const b = boxOf(obj), w = b.max.x - b.min.x, d = b.max.z - b.min.z;
    let best: number | null = null;
    for (let z = d / 2 + 0.05; z <= o.D - 0.02 - d / 2; z += 0.04) {
      if (!free(o.x0 + 0.02, o.x0 + 0.02 + w + front, z - d / 2, z + d / 2)) continue;
      if (best === null || Math.abs(z - want) < Math.abs(best - want)) best = z;
    }
    if (best === null) return null;
    placeAt(obj, o.x0 + 0.02 + w / 2, best); add(obj);
    return obj;
  };
  /** 의자 — 책상 앞(방 쪽)에 반쯤 넣어 책상을 보게. 모델 앞면 +z 기준 */
  const chairAt = (chair: THREE.Object3D | null | undefined, desk: THREE.Object3D) => {
    if (!chair) return;
    const c = wrap(chair, -Math.PI / 2);          // 앞면(+z) → -x(왼쪽 벽 책상 쪽)
    const db = boxOf(desk), cb = boxOf(c);
    placeAt(c, db.max.x + (cb.max.x - cb.min.x) / 2 - 0.18, (db.min.z + db.max.z) / 2);
    c.name = 'room-furn'; g.add(c);
  };
  /** 침구를 침대 크기에 맞춰 — 킹 침구를 싱글·슈퍼싱글에 줄여 쓴다 */
  const dressBed = (bed: THREE.Object3D) => {
    if (!beddingM) return;
    const bb = boxOf(bed), bx = (bb.min.x + bb.max.x) / 2;
    const bd = wrap(beddingM, highEndIsPlusZ(beddingM) ? 0 : Math.PI); bd.name = 'bedding';
    const deck = new THREE.Raycaster(new THREE.Vector3(bx, bb.max.y + 0.5, (bb.min.z + bb.max.z) / 2 - 0.2), new THREE.Vector3(0, -1, 0)).intersectObject(bed, true)[0]?.point.y ?? 0.3;
    const hb = new THREE.Raycaster(new THREE.Vector3(bx, deck + 0.3, bb.max.z + 0.1), new THREE.Vector3(0, 0, -1)).intersectObject(bed, true)[0]?.point.z ?? bb.max.z - 0.1;
    const s0 = boxOf(bd), sx = (bb.max.x - bb.min.x - 0.08) / (s0.max.x - s0.min.x), sz = Math.min(1, (hb - bb.min.z) / (s0.max.z - s0.min.z));
    bd.scale.set(Math.min(1, sx), 1, sz);
    placeBox(bd, bx, hb - 0.01, deck);
    g.add(bd);
  };
  /** 액자 한 점 — 가구 위 벽 가운데 */
  const artAbove = (m: THREE.Object3D | null, x: number, overY: number) => {
    if (!m) return;
    const a = wrap(m, Math.PI); const ab = boxOf(a), ah = ab.max.y - ab.min.y;
    placeBox(a, x, o.D - 0.002, Math.max(overY + 0.25, 1.45 - ah / 2)); a.name = 'room-deco'; g.add(a);
  };
  /** 러그 — (x, z) 가운데에 깔기, 방문·장 앞에 걸리면 줄인다 */
  const rugAt = (m: THREE.Object3D | null | undefined, x: number, z: number) => {
    if (!m) return;
    const r = wrap(m, 0); let rb = boxOf(r);
    if (rb.max.z - rb.min.z > rb.max.x - rb.min.x) { r.rotation.y = Math.PI / 2; rb = boxOf(r); }
    const rw = rb.max.x - rb.min.x, rd = rb.max.z - rb.min.z;
    let s = 1;
    while (s > 0.5 && (o.avoid ?? []).some(q => x - rw * s / 2 < q[1] && x + rw * s / 2 > q[0] && z - rd * s / 2 < q[3] && z + rd * s / 2 > q[2])) s -= 0.05;
    if (s <= 0.5) return;
    r.scale.multiplyScalar(s);
    placeAt(r, THREE.MathUtils.clamp(x, o.x0 + rw * s / 2 + 0.05, o.x1 - rw * s / 2 - 0.05), THREE.MathUtils.clamp(z, rd * s / 2 + 0.05, o.D - rd * s / 2 - 0.05), 0.001);
    r.name = 'room-deco'; r.traverse(mm => { mm.castShadow = false; }); g.add(r);
  };
  // 화분 · 스탠드 조명 — 맞은편 벽 구석 → 옆벽(창 쪽은 커튼 아래, 왼쪽 벽) 순으로 빈 곳. 구석이 방문·협탁으로 차는 일이 많다(실측).
  // 화분은 잎이 퍼진 폭이 아니라 가운데 60%(화분 쪽)로 자리를 판정한다
  const corner = (m: THREE.Object3D | null, sides: number[], foot: number) => {
    if (!m) return;
    const p = wrap(m, 0); const pb = boxOf(p), pw = (pb.max.x - pb.min.x) * foot, pd = (pb.max.z - pb.min.z) * foot;
    const spots: [number, number][] = [];
    for (const side of sides) for (let k = 0; k < 6; k++)
      spots.push([side > 0 ? o.x1 - 0.1 - pw / 2 - k * 0.12 : o.x0 + 0.1 + pw / 2 + k * 0.12, o.D - 0.08 - pd / 2]);
    for (const side of sides) for (let z = o.D - 0.1 - pd / 2; z > o.D / 2; z -= 0.12)
      spots.push([side > 0 ? o.x1 - 0.08 - pw / 2 : o.x0 + 0.08 + pw / 2, z]);
    for (const [x, z] of spots) {
      if (!free(x - pw / 2, x + pw / 2, z - pd / 2, z + pd / 2)) continue;
      placeBox(p, x, z + (pb.max.z - pb.min.z) / 2); p.name = 'room-deco'; g.add(p);
      const t = boxOf(p); t.expandByScalar(-0.5 * (1 - foot) * Math.min(t.max.x - t.min.x, t.max.z - t.min.z)); taken.push(t);
      return;
    }
  };
  const FACE_ROOM = Math.PI, FACE_RIGHT = Math.PI / 2;   // 앞면 +z 모델 — 맞은편 벽에선 180°, 왼쪽 벽에선 +x 로
  const X = (n: string, rot = FACE_ROOM) => { const m = extra.get(n); return m ? wrap(m, rot) : null; };
  // 침대 — 높은 쪽(헤드보드·등판)을 맞은편 벽(+z)으로. 감싸기 전 원본으로 판정한다(감싼 뒤엔 행렬이 갱신 전이라 틀렸다 — 아기 침대 등판이 방을 봤다)
  const Xbed = (n: string) => { const m = extra.get(n); return m ? wrap(m, highEndIsPlusZ(m) ? 0 : Math.PI) : null; };
  // 가운데 바닥 — 장 앞(도어 여는 자리)과 맞은편 가구 사이
  const midZ = () => {
    const back = Math.max(0, ...(o.avoid ?? []).filter(r => r[2] <= 0.01).map(r => r[3]));   // 장 앞 비움 끝
    const frontFurn = Math.min(o.D, ...taken.filter(t => t.max.z > o.D - 0.1).map(t => t.min.z));
    return (back + frontFurn) / 2;
  };

  // 홈뷰 방 꾸밈이 있으면 그대로 옮겨 놓는다(가구·소품). 자료·모델을 못 받으면 아래 예전 규칙
  const usedHv = await addHomvueModule(g, o, style, alive, { free, taken, midZ, pending }).catch(e => { console.warn('[홈뷰 꾸밈]', e); return false; });
  if (!alive()) return;
  if (!usedHv) { await loadLegacy(); if (!alive()) return; }
  if (!usedHv && !master) {
    if (style === 'baby') {
      // 아기방 — [수납장][가드 저상 침대] 맞은편 벽, 가운데 놀이매트 + 유아 소파, 침대 위 액자
      const bed = X('baby_bed', Math.PI); const store = X('baby_store');   // 범퍼 침대 — 앞뒤 높이가 같아 자동 판정이 안 된다(모델 앞면 +z → 방 쪽으로 180°)
      const row = frontRow([...(store ? [{ o: store, optional: true, gap: 0.1 }] : []), ...(bed ? [{ o: bed, name: 'bed' }] : [])]);
      const b = row.find(x => x === bed);
      if (b) artAbove(art1M, (boxOf(b).min.x + boxOf(b).max.x) / 2, boxOf(b).max.y);
      const mat = X('baby_mat', 0);
      if (mat) rugAt(mat, cx - 0.2, midZ());
      const ch = X('baby_chair', 0);
      if (ch) { const z = midZ(); const cb = boxOf(ch); if (free(cx + 0.6, cx + 0.6 + (cb.max.x - cb.min.x), z - 0.3, z + 0.3)) { placeAt(ch, cx + 0.95, z); add(ch); } }
    } else if (style === 'student' || style === 'adult') {
      // 학생방·자녀방(성인) — 맞은편 벽 [침대][수납장·협탁], 왼쪽 벽 책상 + 의자, 침대 위 액자
      const s = style === 'student';
      const bed = Xbed(s ? 'stu_bed' : 'adult_bed');
      const side = s ? X('stu_store') : X('adult_ns');
      const shelf = !s && shelfM ? wrap(shelfM, FACE_ROOM) : null;
      const row = frontRow([...(bed ? [{ o: bed, name: 'bed' }] : []), ...(side ? [{ o: side, optional: true, name: s ? 'room-furn' : 'nightstand' }] : []),
        ...(shelf ? [{ o: shelf, optional: true, gap: 0.08, name: 'side-shelf' }] : [])], cx + 0.4);
      if (bed && row.includes(bed)) { dressBed(bed); artAbove(art1M, (boxOf(bed).min.x + boxOf(bed).max.x) / 2, boxOf(bed).max.y); }
      const desk = X(s ? 'stu_desk' : 'adult_desk', FACE_RIGHT);
      if (desk && leftWall(desk, o.D * 0.55, 0.75)) chairAt(extra.get(s ? 'stu_chair' : 'adult_chair'), desk);
      if (!s && rugM && bed && row.includes(bed)) { const bb = boxOf(bed); rugAt(rugM, (bb.min.x + bb.max.x) / 2, bb.min.z + 0.25); }
    } else {
      // 드레스룸 — 침대 없이 수납. 붙박이장 = 아일랜드장 + 화장대 / 시스템장 = 벽면 시스템장 2 + 아일랜드 / 혼합 = 거울 시스템장 + 시스템장 + 아일랜드 + 화장대
      if (style === 'dress-system') {
        // 벽면 시스템장 a·b 는 모델 앞면(서랍·선반 쪽)이 -z 라 그대로 두면 방 쪽을 본다 — 180° 돌렸더니 서랍 앞면이 벽을 봤다(사용자 지적 2026-10-30)
        frontRow([{ o: X('dr_sys_a', 0)! }, { o: X('dr_sys_b', 0)!, optional: true, gap: 0 }].filter(it => it.o));
        const m = X('dr_sys_m', FACE_RIGHT); if (m) leftWall(m, o.D * 0.6, 0.6);
      } else if (style === 'dress-mixed') {
        frontRow([{ o: X('dr_sys_m')! }, { o: X('dr_sys_b', 0)!, optional: true, gap: 0 }].filter(it => it.o));
        const v = X('dr_vanity', FACE_RIGHT); if (v) leftWall(v, o.D * 0.6, 0.6);
      } else {
        // 액자는 두지 않는다 — 화장대 옆 벽에 걸었더니 구석 화분과 겹쳤다(2026-10-30)
        const v = X('dr_vanity'); if (v) frontRow([{ o: v }], cx);
      }
      // 아일랜드장 — 가운데, 둘레는 지나갈 자리. 60cm 를 요구했더니 84타입 드레스룸(2700×3500)에선 장 앞 통로와 겹쳐 늘 빠졌다 →
      // 앞뒤(장 앞 통로 쪽은 이미 비어 있다) 45cm · 좌우 50cm
      const isl = X('dr_island', 0);
      if (isl) {
        const ib = boxOf(isl); if (ib.max.z - ib.min.z > ib.max.x - ib.min.x) { isl.rotation.y += Math.PI / 2; }
        const b2 = boxOf(isl), w = b2.max.x - b2.min.x, d = b2.max.z - b2.min.z, z0 = midZ();
        // 가운데에서 가까운 자리부터 — 방문 열림 자리(왼쪽 벽)를 피해 옆으로 비켜서도 된다
        let at: [number, number] | null = null;
        for (const m of [0.45, 0.35]) {
          for (let k = 0; k <= 16 && !at; k++) for (const dx of k ? [k * 0.05, -k * 0.05] : [0]) for (const dz of [0, 0.1, -0.1, 0.2, -0.2]) {
            const x = cx + dx, z = z0 + dz;
            if (!at && free(x - w / 2 - m, x + w / 2 + m, z - d / 2 - m, z + d / 2 + m)) at = [x, z];
          }
          if (at) break;
        }
        if (at) { rugAt(rugM, at[0], at[1]); placeAt(isl, at[0], at[1]); add(isl); }
        else {
          // 가운데 자리가 없으면(84타입 드레스룸 2700×3500 — 왼쪽 방문 열림 자리와 장 앞 통로를 빼면 1580 아일랜드가 못 들어간다)
          // 창가 벽에 길게 붙인다. 낮은 장이라 창을 가리지 않고, 커튼은 이 장을 피해 접힌다
          isl.rotation.y += Math.PI / 2;
          const b3 = boxOf(isl), w3 = b3.max.x - b3.min.x, d3 = b3.max.z - b3.min.z, xw = o.x1 - 0.02 - w3 / 2;
          let zb: number | null = null;
          for (let z = o.D - 0.02 - d3 / 2; z - d3 / 2 > 0; z -= 0.05) if (free(xw - w3 / 2, xw + w3 / 2, z - d3 / 2, z + d3 / 2, 1)) { zb = z; break; }
          if (zb !== null) { placeAt(isl, xw, zb); add(isl); rugAt(rugM, (o.x0 + xw - w3 / 2) / 2 + 0.2, z0); }
          else rugAt(rugM, cx, z0);
        }
      }
    }
    corner(plantM, [1, -1], 0.6);
    corner(lampM, [-1, 1], 1);
  }
  // 침대 — 헤드보드가 맞은편 벽(+z)으로
  if (!usedHv && bedM && master) {
    const bed = wrap(bedM, highEndIsPlusZ(bedM) ? 0 : Math.PI); bed.name = 'bed';
    // 침대·협탁·선반장 자리 — 맞은편 벽을 따라 [선반장][협탁][침대][협탁]. 방문 열림 자리와 겹치지 않는 곳 중 방 가운데에 가까운 곳,
    // 안 되면 선반장 → 협탁 순으로 뺀다
    const sizeOf = (m: THREE.Object3D | null) => { if (!m) return null; const b = boxOf(m); return { w: b.max.x - b.min.x, d: b.max.z - b.min.z }; };
    // 협탁·선반장 모델은 앞면이 +z — 맞은편 벽(+z)에 붙이면 벽을 봐서(사용자 지적 2026-10-29) 180° 돌려 방 쪽으로
    const FACE_ROOM = Math.PI;
    const bS = sizeOf(bed)!, nS = sizeOf(ns1), sS = sizeOf(shelfM);
    const hit = (a0: number, a1: number, d: number) => (o.avoid ?? []).some(r => a0 < r[1] + 0.05 && a1 > r[0] - 0.05 && o.D - d - 0.05 < r[3] && o.D > r[2]);
    const configs: { shelf: boolean; ns: boolean }[] = [{ shelf: !!sS, ns: !!nS }, { shelf: false, ns: !!nS }, { shelf: false, ns: false }];
    let plan: { bedX: number; shelf: boolean; ns: boolean } | null = null;
    for (const cf of configs) {
      const left = (cf.shelf ? sS!.w + 0.08 : 0) + (cf.ns ? nS!.w + 0.05 : 0), right = cf.ns ? nS!.w + 0.05 : 0;
      let best: number | null = null;
      for (let bx = o.x0 + 0.02 + left + bS.w / 2; bx + bS.w / 2 + right <= o.x1 - 0.02; bx += 0.02) {
        const a = bx - bS.w / 2, b = bx + bS.w / 2;
        if (hit(a, b, bS.d)) continue;
        if (cf.ns && (hit(a - 0.05 - nS!.w, a - 0.05, nS!.d) || hit(b + 0.05, b + 0.05 + nS!.w, nS!.d))) continue;
        if (cf.shelf && hit(a - left, a - left + sS!.w, sS!.d)) continue;
        if (best === null || Math.abs(bx - cx) < Math.abs(best - cx)) best = bx;
      }
      if (best !== null) { plan = { bedX: best, ...cf }; break; }
    }
    if (!plan) plan = { bedX: cx, shelf: false, ns: false };
    placeBox(bed, plan.bedX, o.D - 0.02);
    g.add(bed);
    const bb = boxOf(bed);
    // 침구(매트리스 포함) — 침대 받침 윗면 높이를 가운데에서 위→아래 광선으로
    if (beddingM) {
      const bd = wrap(beddingM, highEndIsPlusZ(beddingM) ? 0 : Math.PI); bd.name = 'bedding';
      const rc = new THREE.Raycaster(new THREE.Vector3(plan.bedX, bb.max.y + 0.5, (bb.min.z + bb.max.z) / 2 - 0.2), new THREE.Vector3(0, -1, 0));
      const deck = rc.intersectObject(bed, true)[0]?.point.y ?? 0.3;
      // 헤드보드 앞면 — 머리 쪽에서 광선을 -z 로(높이 = 받침 + 30cm)
      const hb = new THREE.Raycaster(new THREE.Vector3(plan.bedX, deck + 0.3, bb.max.z + 0.1), new THREE.Vector3(0, 0, -1)).intersectObject(bed, true)[0]?.point.z ?? bb.max.z - 0.1;
      placeBox(bd, plan.bedX, hb - 0.01, deck);
      bd.traverse(m => { m.name = m.name || 'bedding'; });
      g.add(bd);
    }
    // 협탁 — 침대 양옆(자리가 될 때만)
    const nsList: THREE.Object3D[] = [];
    for (const [m, side] of [[ns1, -1], [ns2, 1]] as const) {
      if (!m || !plan.ns) continue;
      const n = wrap(m, FACE_ROOM); const nb = boxOf(n), nw = nb.max.x - nb.min.x;
      const nx = side < 0 ? bb.min.x - 0.05 - nw / 2 : bb.max.x + 0.05 + nw / 2;
      if (nx - nw / 2 < o.x0 + 0.02 || nx + nw / 2 > o.x1 - 0.02) continue;
      placeBox(n, nx, o.D - 0.02); n.name = 'nightstand';
      g.add(n); nsList.push(n);
    }
    // 2단 책장 — 왼쪽 협탁(없으면 침대) 옆, 왼쪽 벽까지 자리가 될 때
    if (shelfM && plan.shelf) {
      const s = wrap(shelfM, FACE_ROOM); const sb = boxOf(s), sw = sb.max.x - sb.min.x;
      const leftEdge = nsList.length ? Math.min(...nsList.map(n => boxOf(n).min.x)) : bb.min.x;
      const sx = leftEdge - 0.08 - sw / 2;
      if (sx - sw / 2 >= o.x0 + 0.02) { placeBox(s, sx, o.D - 0.02); s.name = 'side-shelf'; g.add(s); }
    }
    // 방 꾸미기 — 거울에 비치는 맞은편이 휑했다(사용자 지적 2026-10-30). 홈뷰 소품: 침대 위 액자 한 쌍 · 침대 밑 러그 ·
    // 구석 큰 화분 · 반대 구석 스탠드 조명. 방문 열림 자리·가구·커튼 자리는 피한다
    taken.push(...g.children.filter(c => ['bed', 'nightstand', 'side-shelf'].includes(c.name)).map(c => boxOf(c)));
    // 액자 — 헤드보드 위 벽에 50×70 두 점(가운데 사이 12cm)
    const arts = [art1M, art2M].filter((m): m is THREE.Object3D => !!m);
    arts.forEach((m, i) => {
      const a = wrap(m, Math.PI); const ab = boxOf(a), aw = ab.max.x - ab.min.x, ah = ab.max.y - ab.min.y;   // 그림 면이 +z — 맞은편 벽에선 돌려야 방을 본다
      const ax = plan!.bedX + (arts.length === 2 ? (i ? 1 : -1) * (aw / 2 + 0.06) : 0);
      placeBox(a, ax, o.D - 0.002, Math.max(bb.max.y + 0.22, 1.5 - ah / 2));
      a.name = 'room-deco'; g.add(a);
    });
    // 러그 — 침대 아래 2/3 에 걸쳐 양옆으로 나오게(긴 변 = 가로)
    if (rugM) {
      const r = wrap(rugM, 0); let rb = boxOf(r);
      if (rb.max.z - rb.min.z > rb.max.x - rb.min.x) { r.rotation.y = Math.PI / 2; rb = boxOf(r); }
      const rw = rb.max.x - rb.min.x, rd = rb.max.z - rb.min.z;
      const zBack = bb.max.z - (bb.max.z - bb.min.z) * 0.3;
      // 방문 열림 자리와 겹치면 그만큼 줄인다(두께 2cm 라 문에 걸린다)
      let s = 1;
      while (s > 0.55 && (o.avoid ?? []).some(q => plan!.bedX - rw * s / 2 < q[1] && plan!.bedX + rw * s / 2 > q[0] && zBack - rd * s < q[3] && zBack > q[2])) s -= 0.05;
      if (s > 0.55) {
        r.scale.multiplyScalar(s);
        placeBox(r, THREE.MathUtils.clamp(plan!.bedX, o.x0 + rw * s / 2 + 0.05, o.x1 - rw * s / 2 - 0.05), zBack, 0.001);
        r.name = 'room-deco'; r.traverse(m => { m.castShadow = false; });
        g.add(r);
      }
    }
    // 서랍장 — 왼쪽 벽, 협탁과 같은 월넛(앞에 서랍 여는 자리 60cm)
    const dr = X('master_dresser', FACE_RIGHT); if (dr) leftWall(dr, o.D * 0.6, 0.6);
    corner(plantM, [1, -1], 0.6);
    corner(lampM, [-1, 1], 1);
  }
  // 커튼 — 모델 폭(x)을 창 쪽 벽(z)으로 돌리고, 커튼 박스 윗면 ~ 바닥 1cm 위로 늘린다.
  // 레일은 창 양옆 15cm 까지, 자락(겉·속 좌우 넷)은 창 양옆에 주름을 모아 접어 둔다 — 통째로 늘였을 땐 오른쪽 자락이
  // 창에서 떨어져 벽에 퍼졌고, 장 쪽으로 밀려도 납작해질 뿐 접혀 보이지 않았다(사용자 지적 2026-10-30)
  const curtainM = await curtainP;
  if (!alive()) return;
  if (curtainM) {
    // 장·방문 쪽으로는 침범하지 않는다(사용자 지시 2026-10-29)
    // 레일 = 창 양옆 15cm — 자락이 창틀 가장자리에 대칭으로 모인다
    let za = Math.max(o.win.zMin, o.win.z0 - 0.15), zb = Math.max(za + 0.5, Math.min(o.win.zMax ?? Infinity, o.win.z1 + 0.15));
    // 커튼과 가구(사용자 지시 2026-11-03):
    //  - 벽을 막아 틈이 없는 키 큰 장(벽에 붙은 1.9m 이상)만 피해 접는다 — 창 가운데보다 앞(+z)이면 끝을, 뒤면 시작을 당긴다
    //  - 틈이 있는 낮은 가구(침대·책상·낮은 장)는 커튼을 다 펼치고, 가구 뒤로 가는 아랫단만 벽 쪽으로 납작하게 눌러(주름 없이) 겹친다
    //    — 예전엔 낮은 가구도 레일을 잘라 커튼이 한쪽으로 몰려 창을 못 가렸다
    const wc = (o.win.z0 + o.win.z1) / 2;
    const toL = o.win.m.clone().invert();
    const behind: THREE.Box3[] = [];                    // 커튼 아랫단을 눌러 줄 가구(창 벽 좌표)
    for (const t0 of taken) {
      const t = t0.clone().applyMatrix4(toL);           // 방 좌표 → 창 벽 좌표
      if (t.max.x < o.win.x1 - 0.35 || t.max.z < za - 0.3 || t.min.z > zb + 0.3) continue;
      const blocks = t.max.y >= 1.9 && t.max.x >= o.win.x1 - 0.08;
      if (!blocks) { behind.push(t); continue; }
      if (t.max.z < za || t.min.z > zb) continue;
      if ((t.min.z + t.max.z) / 2 > wc) zb = Math.min(zb, t.min.z - 0.02); else za = Math.max(za, t.max.z + 0.02);
    }
    if (zb - za < 0.5) { const m = (za + zb) / 2; za = m - 0.25; zb = m + 0.25; }
    const win = o.win;
    const build = (want: { L?: number; R?: number; Li?: number; Ri?: number }) => {
      const cg = foldCurtain(curtainM, za, zb, win.z0, win.z1, want);
      const c = wrap(cg, -Math.PI / 2); c.name = 'curtain-set';
      const sz = boxOf(c).getSize(new THREE.Vector3());
      c.scale.set(1, (win.top - 0.01) / sz.y, 1);
      const cb = boxOf(c);
      c.position.x += (win.x1 - 0.1) - (cb.min.x + cb.max.x) / 2;
      c.position.z += (za + zb) / 2 - (cb.min.z + cb.max.z) / 2;
      c.position.y += 0.01 - cb.min.y;
      if (behind.length) flattenBehind(c, behind, win.x1);
      if (win.sill != null) clearSill(c, win.x1, win.sill, win.z0, win.z1);
      // 창 하늘빛(면광원)을 받지 않게 — scene.noWindowLight 가 이름으로 찾는다. 얇은 속커튼은 햇빛 그림자를 만들지 않는다
      c.traverse(m => {
        const mm = m as THREE.Mesh; if (!mm.isMesh) return;
        mm.name = 'curtain';
        const mt = mm.material as THREE.MeshStandardMaterial;
        if (mt.transparent || (mt.opacity ?? 1) < 1) mm.castShadow = false;
      });
      return c;
    };
    const saved = o.moves?.[CURTAIN_KEY];
    const c = build({ L: saved?.cL, R: saved?.cR, Li: saved?.cLi, Ri: saved?.cRi });
    // 자락을 끌어 펴고 줄이기 — 같은 자리·같은 순서의 메시라 지오메트리만 바꿔 끼운다(재질은 noWindowLight 가 바꿔 둔 그대로)
    const rail = (c.children[0].userData.rail as [number, number]);
    const cur: { L?: number; R?: number; Li?: number; Ri?: number } = { L: saved?.cL, R: saved?.cR, Li: saved?.cLi, Ri: saved?.cRi };
    c.userData.curtain = {
      rail, cur,
      /** 지금 폭(기본값이면 접힌 결과에서 잰다) */
      width: (sd: 'L' | 'R', layer: 'In' | 'Out' = 'Out') => {
        let lo = Infinity, hi = -Infinity;
        for (const mm of c.children[0].children as THREE.Mesh[]) {
          if (mm.userData.curtainSide !== sd || mm.userData.curtainLayer !== layer) continue;
          const bb = mm.geometry.boundingBox!; lo = Math.min(lo, bb.min.x); hi = Math.max(hi, bb.max.x);
        }
        return sd === 'L' ? hi - rail[0] : rail[1] - lo;
      },
      refold: (want: { L?: number; R?: number; Li?: number; Ri?: number }) => {
        Object.assign(cur, want);
        const fresh = build(cur);
        const olds = c.children[0].children as THREE.Mesh[], news = fresh.children[0].children as THREE.Mesh[];
        olds.forEach((m, i) => { if (m.geometry !== news[i].geometry) { if (!isCachedGeometry(m.geometry)) m.geometry.dispose(); m.geometry = news[i].geometry; } });
      },
    };
    c.updateMatrix(); c.applyMatrix4(win.m);          // 창이 있는 벽으로
    g.add(c);
  }
  await Promise.all(pending);
}
