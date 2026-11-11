// 공간 라이트맵 — 벽·바닥·천장에 실제 빛을 굽는다(사용자 지시 2026-11-04 「AO 말고 라이트맵으로 구워줘」).
// 처음 만든 판은 반경 0.8m 안 가림만 재는 AO 였다 — 빛이 어디서 오는지 몰라 구석만 고르게 어두워지고 창 쪽이 밝고 안쪽이 어두운 흐름이 없었다.
//  1) 공간 면(벽·바닥·천장·몰딩)을 평면 조각으로 나눠 겹치지 않는 둘째 UV(uv1)를 깐다 — 텍셀 4cm 안팎
//  2) 텍셀마다(작업자 · three-mesh-bvh)
//     - 창 하늘빛: 창 면을 5×5 로 나눠 그림자 광선 — 가구·커튼·창틀이 가리면 그늘, 창에서 멀수록 약해진다
//     - 해·조명이 직접 닿는 빛: 실시간이 그대로 그리므로 굽지 않고 튄 빛의 씨앗으로만 쓴다
//     - 한 번 튄 빛: 반구 광선이 맞은 면의 (반사율 × 그 면에 든 빛) — 해가 든 바닥 자리가 벽·천장을 밝힌다. 여러 번 튐은 배율로 어림
//  3) 결과(조도, 실시간 조명과 같은 단위)를 공간 재질의 lightMap 으로 — 실시간 창 면광원(그림자 없음)과 환경광은 공간 면에서 빼고
//     이 라이트맵이 대신한다(scene.ts shellLightmap). 해·조명 직접광과 그 그림자는 실시간 그대로
// 방·장·가구·해·조명이 바뀌면 다시 굽는다(0.6초 모아서, 화면은 멈추지 않는다). 실사(경로 추적)는 빛을 직접 계산하므로 뺀다
import * as THREE from 'three';
// @ts-expect-error — 타입 선언이 없는 three 부속(상자 묶어 넣기)
import { potpack } from 'three/addons/libs/potpack.module.js';
import type { LightIn } from './spaceao.worker';
export type { LightIn };

const LIFT = 0.015, PAD = 2, MAX_SIDE = 2048, CELL_MIN = 0.04, WORKERS = Math.min(12, Math.max(1, (navigator.hardwareConcurrency || 4) - 2));   // 4개 고정이었다 — 코어 24 PC 에서 광선이 대부분이라 작업자 수만큼 빨라진다
const BOUNCE_RAYS = 24;
/** 한 번 튄 빛 → 여러 번 튐 어림 배율(흰 벽 방, 반사율 ~0.6 기준 1/(1-ρ·f) ≈ 1.6) */
const MULTI = 1.6;
/** 공간 면 — buildRoom 이 만든 이름. 합친(batch) 뒤엔 room-shell */
const SHELL = /^(room-shell|floor|ceiling|curtain-box|wall-)/;

const cur: { meshes: THREE.Mesh[]; tex: THREE.DataTexture | null; base?: Float32Array; lamp?: Float32Array } = { meshes: [], tex: null };
export const SPACE_AO_NAME = 'space-ao';
/** 화면 그늘(AO)·화면 간접광(SSGI)을 뺄 자리 표시 — 재질 금속성에 눈에 안 띄는 값을 넣어 화면 버퍼(재질 색 a = 금속성, 8비트)로 구분한다(raster.ts).
 *  라이트맵이 켜진 공간엔 화면 그늘·간접광을 겹치지 않는다(사용자 지시 2026-11-04 「공간 라이트맵이 적용되면 AO 는 공간 적용 안 하는 게 맞다」) */
export const SPACE_FLAG = 1 / 255, PROD_FLAG = 2 / 255;
const workers: Worker[] = [];
let seq = 0;

/** 라이트맵을 뗀다 — 방을 다시 만들기 전·실사 모드. 재질 되돌리기는 굽기 때 받은 clear(scene.ts) */
let onClear: ((meshes: THREE.Mesh[]) => void) | null = null;
export function clearSpaceAO() {
  carry?.forEach(c => c.geo.dispose()); carry = null;
  onClear?.(cur.meshes);
  cur.meshes = [];
  cur.tex?.dispose(); cur.tex = null; cur.base = cur.lamp = undefined;
  seq++;                                     // 진행 중인 계산 결과는 버린다
}
// ---- 가구를 옮길 때 — 라이트맵을 떼지 않고 이어 단다(사용자 지시 2026-11-05 「상품 이동하면 라이트맵이 새로 생성되는데 상품 바닥 그림자 아니면 다시 그리지마」).
// 가구를 옮기면 방을 다시 만들지만 벽·바닥·천장 모양은 그대로다. 옛 공간 메시의 지오메트리(uv1 포함)를 떠 두었다가, 새 방의 공간 메시가
// 같은 모양이면 그대로 끼우고 지금 라이트맵을 단다. 바닥 그림자가 바뀐 새 라이트맵은 이어서 굽고, 다 구우면 한 번에 바꾼다
let carry: { name: string; geo: THREE.BufferGeometry }[] | null = null;
/** 방을 버리기 전 — 라이트맵 텍스처는 두고 옛 메시 지오메트리만 떠 둔다(옛 메시는 곧 버려진다). 진행 중 굽기는 버린다 */
export function detachSpaceAO() {
  carry?.forEach(c => c.geo.dispose());
  carry = cur.tex ? cur.meshes.map(m => ({ name: m.name, geo: m.geometry.clone() })) : null;
  cur.meshes = [];
  seq++;
}
const SHELL_OF = (room: THREE.Object3D) => {
  const R: THREE.Mesh[] = [];
  room.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh && m.visible && SHELL.test(m.name) && !Array.isArray(m.material) && !(m.material as THREE.Material).transparent) R.push(m); });
  return R;
};
/** 새 방에 옛 라이트맵을 이어 단다 — 공간 메시가 순서·이름·꼭짓점까지 같을 때만. 못 이으면 라이트맵을 버린다(다음 굽기가 새로) */
export function carrySpaceAO(room: THREE.Object3D, apply: (meshes: THREE.Mesh[], tex: THREE.DataTexture) => void): boolean {
  const old = carry; carry = null;
  if (!old || !cur.tex) return false;
  room.updateMatrixWorld(true);
  const R = SHELL_OF(room);
  const same = R.length === old.length && R.every((m, i) => {
    if (m.name !== old[i].name) return false;
    const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry;
    const a = g.getAttribute('position'), b = old[i].geo.getAttribute('position');
    let ok = a.count === b.count;
    for (let k = 0; ok && k < a.count; k += Math.max(1, a.count >> 6)) ok = Math.abs(a.getX(k) - b.getX(k)) + Math.abs(a.getY(k) - b.getY(k)) + Math.abs(a.getZ(k) - b.getZ(k)) < 1e-4;
    if (g !== m.geometry) g.dispose();
    return ok;
  });
  if (!same) { old.forEach(c => c.geo.dispose()); cur.tex.dispose(); cur.tex = null; cur.base = cur.lamp = undefined; return false; }
  R.forEach((m, i) => { const g = m.geometry; m.geometry = old[i].geo; g.dispose(); });
  cur.meshes = R;
  apply(R, cur.tex);
  return true;
}
/** 시험 도구용 — 지금 라이트맵(조도, 반정밀 RGBA) */
export function spaceAOTexture() { return cur; }

type Chart = { cell?: number; mesh: number; tris: number[]; ax: number; sg: number; plane: number; u: number; v: number; u0: number; v0: number; u1: number; v1: number; box?: { w: number; h: number; x: number; y: number } };

/** 재질 반사율(rgb) — 색 × (무늬 이미지가 있으면 평균 0.5 어림) */
function albedoOf(m: THREE.Mesh): [number, number, number] {
  const mt = [m.material].flat()[0] as THREE.MeshStandardMaterial | undefined;
  const c = mt?.color ?? new THREE.Color(0.6, 0.6, 0.6), k = mt?.map ? 0.5 : 1;
  const cl = (x: number) => Math.min(0.9, Math.max(0.04, x * k));
  return [cl(c.r), cl(c.g), cl(c.b)];
}

/** 굽기 — room 의 공간 면에, room · extra(장)의 보이는 불투명 메시를 가림으로. 끝나면 apply(공간 메시, 라이트맵)를 부르고 걸린 시간을 돌려준다 */
export async function bakeSpaceAO(room: THREE.Object3D, extra: THREE.Object3D[], light: LightIn, inside: THREE.Box3,
  apply: (meshes: THREE.Mesh[], tex: THREE.DataTexture) => void, clear: (meshes: THREE.Mesh[]) => void,
  qual: { cell: number; bounce: number } = { cell: CELL_MIN, bounce: BOUNCE_RAYS }): Promise<string | null> {
  const my = ++seq, t0 = performance.now();
  room.updateMatrixWorld(true); extra.forEach(o => o.updateMatrixWorld(true));
  // ---- 받는 면 — 공간 면 메시(불투명)
  const R = SHELL_OF(room);
  if (!R.length) return null;

  // ---- 조각(평면) 나누기 — 월드 좌표 축 정렬 면. 삼각형 법선의 큰 축 · 방향 · 평면 위치(5mm)
  const geos = R.map(m => (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()));
  const charts = new Map<string, Chart>();
  const p = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], e1 = new THREE.Vector3(), e2 = new THREE.Vector3(), nn = new THREE.Vector3();
  geos.forEach((g, mi) => {
    const pos = g.getAttribute('position'), mw = R[mi].matrixWorld;
    for (let tri = 0; tri < pos.count / 3; tri++) {
      for (let k = 0; k < 3; k++) p[k].fromBufferAttribute(pos, tri * 3 + k).applyMatrix4(mw);
      nn.crossVectors(e1.subVectors(p[1], p[0]), e2.subVectors(p[2], p[0]));
      if (nn.lengthSq() < 1e-12) continue;
      const a = [Math.abs(nn.x), Math.abs(nn.y), Math.abs(nn.z)], ax = a[0] > a[1] && a[0] > a[2] ? 0 : a[1] > a[2] ? 1 : 2;
      const sg = Math.sign(nn.getComponent(ax)), plane = Math.round((p[0].getComponent(ax) + p[1].getComponent(ax) + p[2].getComponent(ax)) / 3 / 0.005) * 0.005;
      const key = `${mi}|${ax}|${sg}|${plane.toFixed(3)}`;
      const u = (ax + 1) % 3, v = (ax + 2) % 3;
      let c = charts.get(key);
      if (!c) charts.set(key, c = { mesh: mi, tris: [], ax, sg, plane, u, v, u0: Infinity, v0: Infinity, u1: -Infinity, v1: -Infinity });
      c.tris.push(tri);
      for (const q of p) { c.u0 = Math.min(c.u0, q.getComponent(u)); c.u1 = Math.max(c.u1, q.getComponent(u)); c.v0 = Math.min(c.v0, q.getComponent(v)); c.v1 = Math.max(c.v1, q.getComponent(v)); }
    }
  });
  const list = [...charts.values()];
  // ---- 텍셀 크기 — 전체 면적이 한 장(최대 2048)에 들어가게, 4cm 보다 촘촘하진 않게
  const area = list.reduce((s, c) => s + (c.u1 - c.u0 + 0.04) * (c.v1 - c.v0 + 0.04), 0);
  let cell = Math.max(qual.cell, Math.sqrt(area / (0.55 * 1024 * 1024)));
  let dims = { w: 0, h: 0 };
  for (let tries = 0; tries < 6; tries++) {
    // 얇은 조각(한 변 25cm 미만 — 걸레받이 6cm·몰딩·창대 옆면)은 텍셀을 1/4(1cm)로 — 4cm 면 두 칸뿐이라 바닥 모서리 쪽 그늘 변화가 안 담겨
    // 밝은 띠로 보였다(사용자 지적 2026-11-04 「걸레받이 라이트맵도 공간하고 똑같이」)
    list.forEach(c => {
      c.cell = Math.min(c.u1 - c.u0, c.v1 - c.v0) < 0.25 ? Math.max(0.01, cell / 4) : cell;
      c.box = { w: Math.ceil((c.u1 - c.u0) / c.cell) + 1 + 2 * PAD, h: Math.ceil((c.v1 - c.v0) / c.cell) + 1 + 2 * PAD, x: 0, y: 0 };
    });
    const boxes = list.map(c => c.box!);
    dims = potpack(boxes) as { w: number; h: number };
    if (Math.max(dims.w, dims.h) <= MAX_SIDE) break;
    cell *= Math.max(dims.w, dims.h) / MAX_SIDE * 1.05;
  }
  const W = Math.ceil(dims.w), H = Math.ceil(dims.h);
  // ---- uv1 — 조각 안 위치를 텍셀 단위로
  geos.forEach(g => g.setAttribute('uv1', new THREE.BufferAttribute(new Float32Array(g.getAttribute('position').count * 2), 2)));
  const q = new THREE.Vector3();
  for (const c of list) {
    const g = geos[c.mesh], pos = g.getAttribute('position'), uv1 = g.getAttribute('uv1') as THREE.BufferAttribute, mw = R[c.mesh].matrixWorld;
    for (const tri of c.tris) for (let k = 0; k < 3; k++) {
      const vi = tri * 3 + k; q.fromBufferAttribute(pos, vi).applyMatrix4(mw);
      uv1.setXY(vi, (c.box!.x + PAD + (q.getComponent(c.u) - c.u0) / c.cell! + 0.5) / W, (c.box!.y + PAD + (q.getComponent(c.v) - c.v0) / c.cell! + 0.5) / H);
    }
  }
  // ---- 표본 — 조각 상자(여백 포함)의 텍셀 가운데마다, 면 위 1.5cm. 텍셀마다 조각 번호(번짐·메우기를 조각 안에서만)
  const texOf: number[] = [], smp: number[] = [];
  const chartOf = new Int32Array(W * H).fill(-1);
  // 방 밖을 보는 조각(벽 바깥면·벽 윗면)은 재지 않는다 — 안 보이는데 표본의 1/3 이었다(실측 137k 중 45k 가 벽 속·밖)
  const probe = new THREE.Vector3();
  list.forEach((c, ci) => {
    const b = c.box!;
    probe.setComponent(c.ax, c.plane + c.sg * 0.05); probe.setComponent(c.u, (c.u0 + c.u1) / 2); probe.setComponent(c.v, (c.v0 + c.v1) / 2);
    if (!inside.containsPoint(probe)) return;
    for (let ty = 0; ty < b.h; ty++) for (let tx = 0; tx < b.w; tx++) {
      const uu = c.u0 + (tx - PAD) * c.cell!, vv = c.v0 + (ty - PAD) * c.cell!;
      const w = [0, 0, 0]; w[c.ax] = c.plane + c.sg * LIFT; w[c.u] = uu; w[c.v] = vv;
      const n = [0, 0, 0]; n[c.ax] = c.sg;
      const ti = (b.y + ty) * W + b.x + tx;
      smp.push(w[0], w[1], w[2], n[0], n[1], n[2]); texOf.push(ti); chartOf[ti] = ci;
    }
  });
  // ---- 가림 형상 — 공간 면 삼각형을 앞에(아틀라스 UV 를 안다 — 튄 빛이 그 자리 빛을 읽는다), 그다음 나머지
  const shellPos: number[] = [], shellUV: number[] = [], shellAlb: number[] = [];
  geos.forEach((g, mi) => {
    const pos = g.getAttribute('position'), uv1 = g.getAttribute('uv1'), mw = R[mi].matrixWorld, al = albedoOf(R[mi]);
    for (let i = 0; i < pos.count; i++) { q.fromBufferAttribute(pos, i).applyMatrix4(mw); shellPos.push(q.x, q.y, q.z); shellUV.push(uv1.getX(i), uv1.getY(i)); }
    for (let t = 0; t < pos.count / 3; t++) shellAlb.push(...al);
  });
  const rest = collectOcc(room, extra, new Set(R));
  const nShell = shellPos.length / 9;
  const occ = new Float32Array(shellPos.length + rest.pos.length); occ.set(shellPos); occ.set(rest.pos, shellPos.length);
  const uvA = new Float32Array(shellUV);   // 공간 면 삼각형만(작업자는 앞쪽 nShell 개만 UV 를 읽는다)
  const alb = new Float32Array(occ.length / 9 * 3); alb.set(shellAlb); alb.set(rest.alb, shellAlb.length);
  // 형상 지문 — 같으면 작업자가 BVH 를 그대로 쓴다(가림 형상·반사율은 다시 보내지 않는다)
  let hsum = occ.length; for (let i = 0; i < occ.length; i += 97) hsum = (hsum * 31 + Math.round(occ[i] * 1000)) | 0;
  const key = `${occ.length}:${hsum}`, tPrep = performance.now() - t0;
  const smpA = new Float32Array(smp);

  // ---- 1단계: 직접 닿는 빛(씨앗) · 창 하늘빛 · 다운라이트 층 · 묻힘
  const d1 = await runJobs(key, { occ, uv: uvA, alb, nShell }, smpA, 10, { mode: 'direct', light, rays: 32 }, undefined, String(my));
  if (my !== seq || R.some(m => !m.parent)) { geos.forEach(g => g.dispose()); return null; }
  const N = W * H;
  // seed = 6 칸(기본 rgb · 조명 층 rgb), 나머지는 3 칸
  const seed = new Float32Array(N * 6), sky = new Float32Array(N * 3), lampD = new Float32Array(N * 3), has = new Uint8Array(N);
  let buried = 0;
  texOf.forEach((ti, i) => {
    const o = i * 10;
    if (d1.out[o + 9]) { buried++; return; }           // 벽 속 표본 — 아래에서 이웃 값으로
    for (let c = 0; c < 3; c++) {
      seed[ti * 6 + c] = d1.out[o + c]; seed[ti * 6 + 3 + c] = d1.out[o + 6 + c];
      sky[ti * 3 + c] = d1.out[o + 3 + c]; lampD[ti * 3 + c] = d1.out[o + 6 + c];
    }
    has[ti] = 1;
  });
  // 방 평균 빛(가구가 내보내는 빛 어림) — 두 층
  const avg = [0, 0, 0, 0, 0, 0]; let cnt = 0;
  for (let i = 0; i < N; i++) if (has[i]) { for (let c = 0; c < 6; c++) avg[c] += seed[i * 6 + c]; cnt++; }
  avg.forEach((_, c) => (avg[c] /= Math.max(1, cnt)));
  dilate([sky, lampD], has.slice(), chartOf, W, H, 3);
  dilate([seed], has.slice(), chartOf, W, H, 6);

  // ---- 2단계: 한 번 튄 빛(두 층)
  const d2 = await runJobs(key, null, smpA, 6, { mode: 'bounce', light, rays: qual.bounce, src: seed, W, H, avg }, new Int32Array(texOf), String(my));
  if (my !== seq || R.some(m => !m.parent)) { geos.forEach(g => g.dispose()); return null; }
  const bounce = new Float32Array(N * 3), lampB = new Float32Array(N * 3);
  texOf.forEach((ti, i) => { if (has[ti]) for (let c = 0; c < 3; c++) { bounce[ti * 3 + c] = d2.out[i * 6 + c]; lampB[ti * 3 + c] = d2.out[i * 6 + 3 + c]; } });
  dilate([bounce, lampB], has.slice(), chartOf, W, H, 3);
  // 튄 빛은 넓게 번지는 빛이라 크게 번지게(광선 잡티 제거), 직접 든 빛은 그림자 가장자리가 살게 조금만 — 모두 조각 안에서만
  blurChart(bounce, chartOf, W, H, 2, 3); blurChart(lampB, chartOf, W, H, 2, 3);
  blurChart(sky, chartOf, W, H, 1, 1); blurChart(lampD, chartOf, W, H, 1, 1);
  // ---- 라이트맵 = 하늘 + 튄 빛 × 여러 번 튐 + 조명 층 × (지금 조명 밝기 / 구울 때 밝기) — 조명 밝기는 다시 굽지 않고 바로(setSpaceLamp)
  const base = new Float32Array(N * 3), lamp = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) { base[i] = sky[i] + bounce[i] * MULTI; lamp[i] = lampD[i] + lampB[i] * MULTI; }
  const tex = new THREE.DataTexture(new Uint16Array(N * 4), W, H, THREE.RGBAFormat, THREE.HalfFloatType);
  tex.channel = 1; tex.magFilter = tex.minFilter = THREE.LinearFilter; tex.colorSpace = THREE.LinearSRGBColorSpace;
  // ---- 입히기 — 지오메트리에 uv1, 재질은 scene.ts 가(apply)
  clearSpaceAO(); seq = my;                  // clearSpaceAO 가 seq 를 올리지만 이 결과는 살린다
  R.forEach((m, i) => { const old = m.geometry; m.geometry = geos[i]; old.dispose(); });
  cur.tex = tex; cur.meshes = R; cur.base = base; cur.lamp = lamp; onClear = clear;
  compose(1);
  apply(R, tex);
  let mean = 0, meanL = 0; for (let i = 0; i < N; i++) if (has[i]) { mean += base[i * 3 + 1]; meanL += lamp[i * 3 + 1]; }
  return `${qual.cell > CELL_MIN ? '성긴 판' : '고운 판'} · 작업자 ${WORKERS} · ${W}×${H} · 텍셀 ${Math.round(cell * 1000)}mm · 표본 ${texOf.length} · 벽 속 ${buried} · 가림 삼각형 ${d1.tris} · 평균 조도(G) 하늘+튄 빛 ${(mean / Math.max(1, cnt)).toFixed(2)} · 다운라이트 ${(meanL / Math.max(1, cnt)).toFixed(2)} · 준비 ${Math.round(tPrep)}ms · BVH ${d1.ms[0]}ms · 직접 ${d1.ms[1]}ms · 튄 빛 ${d2.ms[1]}ms · 전체 ${Math.round(performance.now() - t0)}ms`;
}

/** 라이트맵 = 기본 + 조명 층 × k (반정밀 RGBA) */
function compose(k: number) {
  const t = cur.tex; if (!t || !cur.base || !cur.lamp) return;
  const d = t.image.data as Uint16Array, N = d.length / 4, one = THREE.DataUtils.toHalfFloat(1);
  for (let i = 0; i < N; i++) {
    for (let c = 0; c < 3; c++) d[i * 4 + c] = THREE.DataUtils.toHalfFloat(cur.base[i * 3 + c] + cur.lamp[i * 3 + c] * k);
    d[i * 4 + 3] = one;
  }
  t.needsUpdate = true;
}
/** 조명 밝기만 바뀌었을 때 — 구울 때 밝기 대비 배율로 바로 다시 섞는다(굽기는 뒤에서 따로) */
export function setSpaceLamp(k: number) { compose(k); }

/** 빈 텍셀(묻힘·여백)을 같은 조각의 채워진 이웃 평균으로 — 몇 번 반복해 번져 나간다 */
function dilate(maps: Float32Array[], has: Uint8Array, chartOf: Int32Array, W: number, H: number, st: number) {
  for (let it = 0; it < 8; it++) {
    const add: number[] = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x; if (has[i] || chartOf[i] < 0) continue;
      let c = 0; const s = maps.map(() => new Array(st).fill(0));
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
        const j = yy * W + xx; if (!has[j] || chartOf[j] !== chartOf[i]) continue;
        maps.forEach((m, k) => { for (let q = 0; q < st; q++) s[k][q] += m[j * st + q]; }); c++;
      }
      if (!c) continue;
      maps.forEach((m, k) => { for (let q = 0; q < st; q++) m[i * st + q] = s[k][q] / c; });
      add.push(i);
    }
    if (!add.length) break;
    add.forEach(i => (has[i] = 1));
  }
}
/** 조각 안에서만 상자 번짐(반경 r, passes 번) */
function blurChart(m: Float32Array, chartOf: Int32Array, W: number, H: number, r: number, passes: number) {
  const tmp = new Float32Array(m.length);
  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x, ci = chartOf[i];
      if (ci < 0) { tmp[i * 3] = m[i * 3]; tmp[i * 3 + 1] = m[i * 3 + 1]; tmp[i * 3 + 2] = m[i * 3 + 2]; continue; }
      let a = 0, b = 0, c = 0, n = 0;
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
        const j = yy * W + xx; if (chartOf[j] !== ci) continue;
        a += m[j * 3]; b += m[j * 3 + 1]; c += m[j * 3 + 2]; n++;
      }
      tmp[i * 3] = a / n; tmp[i * 3 + 1] = b / n; tmp[i * 3 + 2] = c / n;
    }
    m.set(tmp);
  }
}

/** 붙박이장 안 옷·소품 — 장 안에 갇혀 방 빛에 영향이 없는데 삼각형이 53만 개였다(실측). 장 몸통·도어는 가린다 */
const SKIP_OCC = /^(slot-props|prop-garment)$/;
/** 가림 형상 — 보이는 불투명 메시 전부(월드 삼각형) + 삼각형 반사율. 그늘판·그늘막·유리·선·빼라는 메시(공간 면)는 뺀다 */
function collectOcc(room: THREE.Object3D, extra: THREE.Object3D[], skip: Set<THREE.Object3D>) {
  const occ: number[] = [], alb: number[] = [];
  const v = new THREE.Vector3();
  const addOcc = (o: THREE.Object3D) => o.traverse(x => {
    const m = x as THREE.Mesh;
    if (!m.isMesh || (m as any).isInstancedMesh || !m.geometry?.getAttribute('position') || skip.has(m)) return;
    for (let pp: THREE.Object3D | null = m; pp; pp = pp.parent) if (!pp.visible || SKIP_OCC.test(pp.name)) return;
    // 아주 작은 것(책·소품 20cm 미만)은 방 빛을 거의 가리지 않는다 — 삼각형만 많다
    if (!m.geometry.boundingSphere) m.geometry.computeBoundingSphere();
    if (m.geometry.boundingSphere!.radius * m.matrixWorld.getMaxScaleOnAxis() < 0.1) return;
    // 조명 기구(빛나는 원판·테두리)는 빛을 가리지 않는다 — 조명 바로 옆이라 그림자 광선이 늘 걸린다
    if (m.name === 'contact-shadow' || m.name === SPACE_AO_NAME || m.name === PROD_AO_NAME || m.name === 'window-glass' || m.name === 'edge-lines' || m.name === 'lamp-fixture' || m.name === 'lamp-glow') return;
    const mt = [m.material].flat()[0] as THREE.Material | undefined; if (mt?.transparent && (mt.opacity ?? 1) < 0.6) return;
    const pos = m.geometry.getAttribute('position'), idx = m.geometry.index, n = idx ? idx.count : pos.count;
    for (let i = 0; i < n; i++) { v.fromBufferAttribute(pos, idx ? idx.getX(i) : i).applyMatrix4(m.matrixWorld); occ.push(v.x, v.y, v.z); }
    const al = albedoOf(m); for (let t = 0; t < Math.floor(n / 3); t++) alb.push(...al);
  });
  addOcc(room); extra.forEach(addOcc);
  return { pos: new Float32Array(occ), alb: new Float32Array(alb) };
}
/** 표본을 작업자 수만큼 나눠 동시에. 가림 형상은 작업자가 열쇠로 기억해 2단계에선 다시 보내지 않는다(BVH 도 다시 짓지 않는다) */
let lastShell = 0, sentKey = '';
async function runJobs(key: string, geo: { occ: Float32Array; uv: Float32Array; alb: Float32Array; nShell: number } | null, smp: Float32Array, stride: number, extra: Record<string, unknown>, tix?: Int32Array, run = key) {
  while (workers.length < WORKERS) workers.push(new Worker(new URL('./spaceao.worker.ts', import.meta.url), { type: 'module' }));
  if (geo) lastShell = geo.nShell;
  const nS = smp.length / 6, per = Math.ceil(nS / WORKERS);
  const parts = await Promise.all(workers.map((w, k) => new Promise<{ out: Float32Array; ms: number[]; tris: number }>((ok, bad) => {
    const id = `${run}:${extra.mode}:${k}`;
    w.onmessage = e => { if (e.data.id === id) ok(e.data); };
    w.onerror = ev => { sentKey = ''; bad(ev); };
    const s = smp.slice(k * per * 6, Math.min(nS, (k + 1) * per) * 6);
    const tx = tix?.slice(k * per, Math.min(nS, (k + 1) * per));
    const send = geo ? (sentKey === key ? { uv: geo.uv } : { occ: geo.occ, uv: geo.uv, alb: geo.alb }) : {};
    w.postMessage({ id, key, nShell: lastShell, ...send, ...extra, samples: s, tix: tx }, [s.buffer]);
  })));
  if (geo) sentKey = key;
  const out = new Float32Array(nS * stride); parts.forEach((p2, k) => out.set(p2.out, k * per * stride));
  return { out, ms: [Math.max(...parts.map(p2 => p2.ms[0])), Math.max(...parts.map(p2 => p2.ms[1]))], tris: parts[0].tris };
}

// ---------------------------------------------------------------- 상품(가구) 라이트맵
// 모델이 그늘을 갖고 다닌다 — tools/bake_hv_ao.py 가 Blender 로 모델마다 미리 구워 GLB 에 넣었다(두 번째 UV + occlusionTexture).
// 앱은 굽지 않고 배치만 한다(사용자 지시 2026-11-04 「원본 소스로 갖고 있어서 그냥 배치만 되도록」).
// 재질 aoMap 은 간접광에만 곱해져 해·조명이 센 실시간 화면에선 거의 안 보인다(공간 라이트맵 실측) — 공간처럼 그늘막으로 최종 밝기를 어둡게 한다.
//  - 그늘막은 원래 메시의 지오메트리를 함께 쓴다(복사 없음 · 두 번째 UV 그대로). 재질은 모델 그늘 이미지마다 하나(검정 · 투명도 = 1 - 그늘)
//  - 원래 재질의 aoMap 은 세기 0 으로 둔다(furnish.ts) — 간접광까지 두 번 어두워지지 않게
export const PROD_AO_NAME = 'prod-ao';
const pmats = new Map<THREE.Texture, THREE.MeshBasicMaterial>();
const povers: THREE.Mesh[] = [];
let pk = 0.6;
export function clearProdAO() { for (const o of povers) o.removeFromParent(); povers.length = 0; pdone = new WeakSet(); }
/** 그늘막을 이미 단 메시 — 가구를 옮겨도 그대로 둔다(사용자 지시 2026-11-04 「상품이 이동한다고 상품 라이트맵은 꺼지거나 다시 생성하면 안 되고 그대로 유지」) */
let pdone = new WeakSet<THREE.Mesh>();
export function setProdAOIntensity(k: number) { pk = k; pmats.forEach(m => (m.opacity = k)); vmat.opacity = k; }
/** 정점 그늘(_AO — 조각이 많은 촘촘한 모델, bake_hv_ao.py) 그늘막 — 위치·인덱스는 원래 지오메트리 것을 함께 쓰고 색(검정 · 투명도 = 1 - 그늘)만 따로 */
const vmat = new THREE.MeshBasicMaterial({ color: 0x000000, vertexColors: true, transparent: true, opacity: 0.6, depthWrite: false, toneMapped: false,
  polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: -2 });
const vgeo = new WeakMap<THREE.BufferGeometry, THREE.BufferGeometry>();
function vertexOverlayOf(src: THREE.BufferGeometry) {
  let g = vgeo.get(src);
  if (g) return g;
  const a = src.getAttribute('_ao') as THREE.BufferAttribute, col = new Float32Array(a.count * 4);
  for (let i = 0; i < a.count; i++) col[i * 4 + 3] = 1 - a.getX(i);
  g = new THREE.BufferGeometry();
  g.setAttribute('position', src.getAttribute('position')); g.setAttribute('color', new THREE.BufferAttribute(col, 4));
  if (src.index) g.setIndex(src.index);
  g.groups = src.groups; g.drawRange = src.drawRange; g.boundingSphere = src.boundingSphere; g.boundingBox = src.boundingBox;
  vgeo.set(src, g);
  return g;
}

/** 그늘 이미지 → 투명도 판(1 - 그늘). alphaMap 은 초록 칸을 투명도로 읽는다 */
function overlayMatOf(t: THREE.Texture) {
  let m = pmats.get(t);
  if (m) return m;
  const img = t.image as CanvasImageSource & { width: number; height: number };
  const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
  const cx = cv.getContext('2d', { willReadFrequently: true })!; cx.drawImage(img, 0, 0);
  const d = cx.getImageData(0, 0, cv.width, cv.height), a = d.data;
  for (let i = 0; i < a.length; i += 4) { const v = 255 - a[i]; a[i] = a[i + 1] = a[i + 2] = v; a[i + 3] = 255; }
  cx.putImageData(d, 0, 0);
  const at = new THREE.CanvasTexture(cv);
  at.flipY = t.flipY; at.channel = t.channel; at.colorSpace = THREE.NoColorSpace; at.wrapS = at.wrapT = THREE.ClampToEdgeWrapping; at.anisotropy = 4;
  m = new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: at, transparent: true, opacity: pk, depthWrite: false, toneMapped: false,
    polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: -2 });
  pmats.set(t, m);
  return m;
}

/** 방의 홈뷰 모델 중 구운 그늘을 가진 메시에 그늘막을 단다 — 이미 단 메시는 건드리지 않고 새로 생긴 메시에만(가구를 옮겨도 그늘막은 그대로 따라간다).
 *  떨어져 나간 메시(가구 삭제·교체)의 그늘막만 뗀다. 단 메시 수 · 새로 단 수 · 모델 메시 수 */
export function applyProdAO(room: THREE.Object3D, intensity: number) {
  pk = intensity;
  for (let i = povers.length - 1; i >= 0; i--) if (!povers[i].userData.src?.parent || !povers[i].parent) { povers[i].removeFromParent(); povers.splice(i, 1); }
  const list: THREE.Mesh[] = [];
  let total = 0;
  room.traverse(o => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || m.name === PROD_AO_NAME || !m.parent || pdone.has(m)) { if (pdone.has(m)) total++; return; }
    let u: THREE.Object3D | null = m; while (u && u.name !== 'hv-unit') u = u.parent;
    if (!u) return;
    total++;
    const mt = [m.material].flat()[0] as THREE.MeshStandardMaterial;
    // 구운 그늘 — 정점(userData.vao · _ao) 또는 지도(userData.prodAOMap — furnish.ts 가 재질에서 빼 둔 aoMap)
    const aoT = (mt?.userData.prodAOMap ?? mt?.aoMap) as THREE.Texture | undefined;
    if (mt && !mt.transparent && ((mt.userData.vao && m.geometry.getAttribute('_ao')) || (aoT && m.geometry.getAttribute(`uv${aoT.channel || ''}`)))) list.push(m);
  });
  for (const m of list) {
    const mt = [m.material].flat()[0] as THREE.MeshStandardMaterial;
    const o = mt.userData.vao ? new THREE.Mesh(vertexOverlayOf(m.geometry), vmat) : new THREE.Mesh(m.geometry, overlayMatOf((mt.userData.prodAOMap ?? mt.aoMap)!));
    o.name = PROD_AO_NAME; o.castShadow = o.receiveShadow = false; o.raycast = () => {}; o.renderOrder = 1;
    o.matrixAutoUpdate = false; o.matrix.copy(m.matrix); o.visible = m.visible; o.userData.src = m;
    m.parent!.add(o); povers.push(o); pdone.add(m);
  }
  pmats.forEach(x => (x.opacity = pk)); vmat.opacity = pk;
  return { hit: povers.length, added: list.length, total };
}
