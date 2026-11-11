// 공간 라이트맵 계산 작업자 — 화면을 멈추지 않게 메인 스레드 밖에서 광선을 쏜다(spaceao.ts)
// 받는 것: 가림 형상(월드 좌표 삼각형 — 앞쪽 nShell 개는 공간 면, 정점마다 아틀라스 UV) · 삼각형 반사율 · 텍셀 표본(위치 + 법선) · 조명
// 두 단계:
//  - 'direct' : 표본마다 ① 해·조명이 직접 닿는 빛(튄 빛의 씨앗) ② 창으로 드는 하늘빛(창 면을 나눠 그림자 광선) ③ 벽 속에 묻힌 표본인지
//  - 'bounce' : 표본마다 반구로 광선을 쏴 맞은 면이 내보내는 빛(반사율 × 그 면에 든 빛)을 모은다 — 한 번 튄 빛
// 단위는 실시간 조명과 같다 — 해 = 조도(lux), 조명 = 광도(cd, 거리² 감쇠), 창 = 휘도(nit). 그래서 결과를 그대로 lightMap 으로 쓴다
import * as THREE from 'three';
import { MeshBVH, SAH } from 'three-mesh-bvh';

/** bake = 다운라이트(실시간 그림자가 없다) — 그림자 포함 직접광을 조명 층에 굽는다. 아니면(해·메인 조명·라인) 실시간이 그리고 튄 빛 씨앗으로만 */
export type Spot = { p: number[]; d: number[]; cosO: number; cosI: number; rgb: number[]; area?: boolean; bake?: boolean };
export type Win = { c: number[]; u: number[]; v: number[]; n: number[]; rgb: number[] };   // c = 창 면 가운데(바깥쪽), u·v = 반 너비 벡터, n = 방 안쪽
export type LightIn = { sunDir: number[]; sunRgb: number[]; spots: Spot[]; wins: Win[] };
type Job = {
  id: string; key: string; occ?: Float32Array; uv?: Float32Array; alb?: Float32Array; nShell: number;
  mode: 'direct' | 'bounce'; samples: Float32Array; light: LightIn; rays: number;
  src?: Float32Array; W?: number; H?: number; avg?: number[]; tix?: Int32Array;
};
const ctx = self as unknown as { onmessage: (e: MessageEvent<Job>) => void; postMessage: (m: unknown, t?: Transferable[]) => void };

let cache: { key: string; bvh: MeshBVH; pos: Float32Array; uv: Float32Array; alb: Float32Array } | null = null;
const ray = new THREE.Ray(), o = new THREE.Vector3(), nrm = new THREE.Vector3(), t = new THREE.Vector3(), b = new THREE.Vector3(), d = new THREE.Vector3(), q = new THREE.Vector3();
const tri = new THREE.Triangle(), bary = new THREE.Vector3(), hp = new THREE.Vector3();

/** p 에서 dir 로 far 안에 막히는 것이 있나 */
function blocked(bvh: MeshBVH, p: THREE.Vector3, dir: THREE.Vector3, far: number) {
  ray.origin.copy(p); ray.direction.copy(dir);
  return !!bvh.raycastFirst(ray, THREE.DoubleSide, 0, far);
}

ctx.onmessage = e => {
  const j = e.data, t0 = performance.now();
  // 가림 형상(열쇠 = 형상 지문)이 같으면 BVH 를 다시 짓지 않는다 — 조명만 바뀐 굽기 · 성긴 판 → 고운 판. 아틀라스 UV(공간 면)는 판마다 다르니 늘 새로
  if (!cache || cache.key !== j.key) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(j.occ!, 3));
    cache = { key: j.key, bvh: new MeshBVH(g, { targetLeafSize: 8, strategy: SAH }), pos: j.occ!, uv: j.uv!, alb: j.alb! };   // SAH — 짓기는 1.2초로 느리지만 광선이 2.5~3배 빠르다(42만 삼각형, 실측)
  }
  if (j.uv) cache.uv = j.uv;
  const { bvh, pos, uv, alb } = cache;
  const t1 = performance.now();
  const n = j.samples.length / 6, L = j.light;
  const sd = new THREE.Vector3().fromArray(L.sunDir);
  const sunOn = L.sunRgb[0] + L.sunRgb[1] + L.sunRgb[2] > 0;
  // 반구 방향 묶음(골든 각 나선 · 코사인 분포) — 표본마다 돌려서 쓴다
  const dirs: [number, number, number][] = [];
  for (let k = 0; k < j.rays; k++) {
    const r = Math.sqrt((k + 0.5) / j.rays), phi = k * 2.399963229728653;
    dirs.push([r * Math.cos(phi), r * Math.sin(phi), Math.sqrt(Math.max(0, 1 - r * r))]);
  }
  const frame = (i: number) => {
    o.set(j.samples[i * 6], j.samples[i * 6 + 1], j.samples[i * 6 + 2]);
    nrm.set(j.samples[i * 6 + 3], j.samples[i * 6 + 4], j.samples[i * 6 + 5]);
    t.set(Math.abs(nrm.x) < 0.9 ? 1 : 0, Math.abs(nrm.x) < 0.9 ? 0 : 1, 0).cross(nrm).normalize();
    b.crossVectors(nrm, t);
  };
  const hemi = (i: number, k: number) => {
    const rot = ((i * 0.618034) % 1) * Math.PI * 2, cr = Math.cos(rot), sr = Math.sin(rot);
    const [x0, y0, z] = dirs[k], x = x0 * cr - y0 * sr, y = x0 * sr + y0 * cr;
    return d.set(t.x * x + b.x * y + nrm.x * z, t.y * x + b.y * y + nrm.y * z, t.z * x + b.z * y + nrm.z * z);
  };

  if (j.mode === 'direct') {
    // 출력: 표본마다 [씨앗(실시간 직접광 + 하늘) r g b, 하늘 r g b, 조명 층(다운라이트 직접광) r g b, 묻힘(0/1)]
    const out = new Float32Array(n * 10);
    const WS = 4;                                     // 창 면을 4×4 로 나눠 그늘 광선(자리를 텍셀마다 흔들어 띠가 안 생기게)
    for (let i = 0; i < n; i++) {
      frame(i);
      // 묻힘 검사 — 짧은 광선이 면 뒤쪽을 많이 맞으면 벽·가구 속 표본(모서리 텍셀). 메인에서 이웃 값으로 메운다
      let back = 0;
      for (let k = 0; k < 8; k++) {
        hemi(i, Math.floor((k + 0.5) * j.rays / 8)); ray.origin.copy(o); ray.direction.copy(d);
        const h = bvh.raycastFirst(ray, THREE.DoubleSide, 0, 0.25);
        if (h && h.face && h.face.normal.dot(d) > 0 && Math.floor(h.face.a / 3) < j.nShell) back++;   // 공간 면(벽·바닥) 뒤쪽만 — 가구 판은 한쪽 면뿐이라 뒤를 맞아도 벽 속이 아니다(책상 뒤 벽이 밝게 메워졌다)
      }
      out[i * 10 + 9] = back >= 3 ? 1 : 0;
      let r = 0, g = 0, bb = 0, lr = 0, lg = 0, lb = 0;
      // 해 — 조도 × cos
      if (sunOn) {
        const c = nrm.dot(sd);
        if (c > 0 && !blocked(bvh, o, sd, 60)) { r += L.sunRgb[0] * c; g += L.sunRgb[1] * c; bb += L.sunRgb[2] * c; }
      }
      // 조명 — 광도 × 각 감쇠 × cos / 거리²
      for (const s of L.spots) {
        q.fromArray(s.p).sub(o); const dist = q.length(); q.divideScalar(dist);
        const c = nrm.dot(q); if (c <= 0) continue;
        const ca = -(q.x * s.d[0] + q.y * s.d[1] + q.z * s.d[2]);
        const att = s.area ? Math.max(0, ca) : THREE.MathUtils.smoothstep(ca, s.cosO, s.cosI);
        if (att <= 0 || blocked(bvh, o, q, dist - 0.02)) continue;
        const k = att * c / Math.max(dist * dist, 0.09);   // 30cm 안은 점광원 근사가 터진다(벽에 붙은 라인 조명) — 그 거리로 묶는다
        if (s.bake) { lr += s.rgb[0] * k; lg += s.rgb[1] * k; lb += s.rgb[2] * k; } else { r += s.rgb[0] * k; g += s.rgb[1] * k; bb += s.rgb[2] * k; }
      }
      out[i * 10 + 6] = lr; out[i * 10 + 7] = lg; out[i * 10 + 8] = lb;
      // 창 하늘빛 — 면광원 적분: 휘도 × cos(받는 면) × cos(창) × 넓이 / 거리². 아래(땅)를 보는 방향은 어둡게
      let sr = 0, sg = 0, sb = 0;
      for (const w of L.wins) {
        const area = 4 * Math.hypot(w.u[0], w.u[1], w.u[2]) * Math.hypot(w.v[0], w.v[1], w.v[2]) / (WS * WS);
        for (let a = 0; a < WS; a++) for (let c2 = 0; c2 < WS; c2++) {
          const fa = ((a + 0.5 + ((i * 0.37 + c2 * 0.13) % 1 - 0.5) * 0.8) / WS) * 2 - 1, fb = ((c2 + 0.5 + ((i * 0.71 + a * 0.29) % 1 - 0.5) * 0.8) / WS) * 2 - 1;
          q.set(w.c[0] + w.u[0] * fa + w.v[0] * fb - o.x, w.c[1] + w.u[1] * fa + w.v[1] * fb - o.y, w.c[2] + w.u[2] * fa + w.v[2] * fb - o.z);
          const dist = q.length(); q.divideScalar(dist);
          const cr = nrm.dot(q), cw = -(q.x * w.n[0] + q.y * w.n[1] + q.z * w.n[2]);
          if (cr <= 0 || cw <= 0 || blocked(bvh, o, q, dist - 0.01)) continue;
          const sky = q.y >= 0 ? 1 + q.y : 0.35;      // 하늘(위) 쪽이 밝고 땅(아래) 쪽은 어둡다
          const k = sky * cr * cw * area / (dist * dist);
          sr += w.rgb[0] * k; sg += w.rgb[1] * k; sb += w.rgb[2] * k;
        }
      }
      out[i * 10] = r + sr; out[i * 10 + 1] = g + sg; out[i * 10 + 2] = bb + sb;
      out[i * 10 + 3] = sr; out[i * 10 + 4] = sg; out[i * 10 + 5] = sb;
    }
    ctx.postMessage({ id: j.id, out, ms: [Math.round(t1 - t0), Math.round(performance.now() - t1)], tris: pos.length / 9 }, [out.buffer]);
    return;
  }

  // ---- 튄 빛 — 반구 광선이 맞은 면: 공간 면이면 씨앗 지도에서 그 자리 빛을, 가구면 방 평균 빛을 · 반사율을 곱해
  // 씨앗은 두 층(6 칸) — [기본(해·하늘·실시간 조명) rgb, 조명 층 rgb]. 튄 빛도 두 층으로 돌려줘 조명 밝기를 다시 굽지 않고 바꾼다
  const src = j.src!, W = j.W!, H = j.H!, avg = j.avg!;
  const out = new Float32Array(n * 6);
  const look = (u: number, v: number, c: number) => {   // 쌍선형
    const x = u * W - 0.5, y = v * H - 0.5, x0 = Math.max(0, Math.min(W - 1, Math.floor(x))), y0 = Math.max(0, Math.min(H - 1, Math.floor(y)));
    const x1 = Math.min(W - 1, x0 + 1), y1 = Math.min(H - 1, y0 + 1), fx = Math.min(1, Math.max(0, x - x0)), fy = Math.min(1, Math.max(0, y - y0));
    const s = (xx: number, yy: number) => src[(yy * W + xx) * 6 + c];
    return (s(x0, y0) * (1 - fx) + s(x1, y0) * fx) * (1 - fy) + (s(x0, y1) * (1 - fx) + s(x1, y1) * fx) * fy;
  };
  // 가구 면이 내보내는 빛 — 그 면에 든 빛을 모른다. 방 평균을 쓰면 벽에 붙은 판 뒤쪽(책상 타공판 뒤 벽)도 평균만큼 밝아졌다(실측).
  // 그래서 광선을 쏜 텍셀 자기 자리 빛(가까운 가구는 비슷한 빛을 받는다) + 평균의 15% — 자기 자리가 그늘이면 가구 뒤도 그늘
  const acc = new Float64Array(6), fur = new Float64Array(6), tix = j.tix!;
  for (let i = 0; i < n; i++) {
    frame(i);
    acc.fill(0);
    for (let c = 0; c < 6; c++) fur[c] = Math.min(src[tix[i] * 6 + c], 2 * avg[c]) + 0.15 * avg[c];
    for (let k = 0; k < j.rays; k++) {
      hemi(i, k); ray.origin.copy(o); ray.direction.copy(d);
      const h = bvh.raycastFirst(ray, THREE.DoubleSide, 0, 30);
      if (!h || !h.face) continue;                     // 창 밖으로 나간 광선 — 하늘빛은 'direct' 에서 창 면으로 셌다
      if (h.face.normal.dot(d) > 0) continue;           // 면 뒤쪽
      const ti = Math.floor(h.face.a / 3);
      const al = [alb[ti * 3], alb[ti * 3 + 1], alb[ti * 3 + 2]];
      if (ti < j.nShell) {
        tri.a.fromArray(pos, ti * 9); tri.b.fromArray(pos, ti * 9 + 3); tri.c.fromArray(pos, ti * 9 + 6);
        tri.getBarycoord(hp.copy(h.point), bary);
        const u = uv[ti * 6] * bary.x + uv[ti * 6 + 2] * bary.y + uv[ti * 6 + 4] * bary.z;
        const v = uv[ti * 6 + 1] * bary.x + uv[ti * 6 + 3] * bary.y + uv[ti * 6 + 5] * bary.z;
        for (let c = 0; c < 6; c++) acc[c] += al[c % 3] * look(u, v, c);
      } else for (let c = 0; c < 6; c++) acc[c] += al[c % 3] * fur[c];
    }
    // 코사인 분포 표본이라 조도 = 평균(반사율 × 맞은 면 조도)
    for (let c = 0; c < 6; c++) out[i * 6 + c] = acc[c] / j.rays;
  }
  ctx.postMessage({ id: j.id, out, ms: [Math.round(t1 - t0), Math.round(performance.now() - t1)], tris: pos.length / 9 }, [out.buffer]);
};
