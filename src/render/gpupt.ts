// ⑤ 경로 추적 · three-gpu-pathtracer(WebGPU) — 실시간과 같은 WebGPU 렌더러로 같은 캔버스에 그린다(사용자 지시 2026-11-03).
// 설정은 공식 예제 denoise.html 그대로 — 절반 해상도로 6 샘플 추적 → OIDN 노이즈 제거 → FSR 로 화면 크기까지 키움(선명도 1) · ACES 톤매핑.
// 패키지는 vendor/ 사본(three-gpu-pathtracer 0.0.27 · @pmndrs/upscaler 0.3.0) — node_modules 가 다른 웹 프로젝트 설치본과 같은 폴더라 거기에 깔면
// 그쪽(0.0.24 를 쓴다)까지 바뀐다. three · three-mesh-bvh 0.9.16 · oidn-webgpu 0.6.0 은 그 node_modules 것을 그대로 쓴다
import * as THREE from 'three';
import type { WebGPURenderer } from 'three/webgpu';
import { WebGPUPathTracer, OIDNDenoiser, FSRUpscaler } from '../../vendor/three-gpu-pathtracer/src/webgpu/index.js';
import { Upscaler } from '../../vendor/pmndrs-upscaler/dist/index.js';
import { initUNetFromURL } from 'oidn-webgpu';

/** 예제 denoise.js 의 params 그대로 */
export const GPUPT = { renderScale: 0.5, maxSamples: 6, denoise: true, upscale: true, sharpness: 1 };
// OIDN 가중치 — MuTracer 와 같은 파일(public/oidn). 예제의 rt_hdr.tza(색만 쓰는 모델)는 보조 버퍼를 끌 때만 필요하다
const AUX_WEIGHTS = `${import.meta.env.BASE_URL}oidn/rt_hdr_alb_nrm.tza`;

type PT = InstanceType<typeof WebGPUPathTracer>;
let pt: PT | null = null;
let den: InstanceType<typeof OIDNDenoiser> | null = null;
let saved: { tm: THREE.ToneMapping; exp: number } | null = null;

function make(renderer: WebGPURenderer) {
  if (pt) return pt;
  pt = new WebGPUPathTracer(renderer);
  pt.renderScale = GPUPT.renderScale;
  pt.maxSamples = GPUPT.maxSamples;
  den = new OIDNDenoiser({ initUNetFromURL, auxWeightsUrl: AUX_WEIGHTS });
  pt.setDenoiser(GPUPT.denoise ? den : null);
  const up = new FSRUpscaler({ Upscaler });
  up.sharpness = GPUPT.sharpness;
  pt.setUpscaler(GPUPT.upscale ? up : null);
  (window as any).__gpupt = pt;
  return pt;
}
/** 장면을 넘긴다 — 밝기 0 인 채움 조명(조명 개수 고정용 10여 개)은 빼고. 경로 추적은 조명을 무작위로 골라 샘플하므로
 *  꺼진 조명도 샘플을 나눠 가져가 노이즈가 더디게 걷혔다 */
function capture(p: PT, scene: THREE.Scene, camera: THREE.Camera) {
  const off: THREE.Light[] = [];
  scene.traverse(o => { const l = o as THREE.Light; if (l.isLight && l.visible && !(l as THREE.AmbientLight).isAmbientLight && l.intensity <= 0) { l.visible = false; off.push(l); } });
  try { p.setScene(scene, camera); } finally { off.forEach(l => (l.visible = true)); }
}

/** 미리 준비 — 실사를 켜기 전 한가할 때. 켜는 순간 걸리던 첫 비용(실측 1600×1100): 경로 추적 셰이더 컴파일 ~4.5초 ·
 *  OIDN 신경망 받기·짓기 3.9초 · 보조 버퍼(알베도·법선) 셰이더 0.9초. 공식 예제는 이것을 로딩 화면 뒤에서 치른다(그래서 「2초」).
 *  done = 한 장 그린 실시간 화면을 다시 그리게 */
export async function prewarmGpuPt(renderer: WebGPURenderer, scene: THREE.Scene, camera: THREE.Camera, done: () => void) {
  const p = make(renderer);
  const net = (den as any)._initUNet(true) as Promise<unknown>;     // 가중치 받기·파이프라인 — 그동안 아래 컴파일
  capture(p, scene, camera);
  p.renderSample();                                                  // 경로 추적 셰이더 컴파일
  (den as any)._renderAuxiliaryBuffers(64, 64);                      // 보조 버퍼(MRT) 재질 변형 컴파일
  p.reset();
  done();
  await net;
}

/** 켜기 — 장면을 통째로 넘긴다(BVH 를 짓는다). 장면이 바뀌면 다시 부른다 */
export function showGpuPt(renderer: WebGPURenderer, scene: THREE.Scene, camera: THREE.Camera, exposure: number) {
  const p = make(renderer);
  if (!saved) saved = { tm: renderer.toneMapping, exp: renderer.toneMappingExposure };
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  capture(p, scene, camera);
}
export function hideGpuPt(renderer: WebGPURenderer) {
  if (saved) { renderer.toneMapping = saved.tm; renderer.toneMappingExposure = saved.exp; saved = null; }
}
/** 매 프레임 — 다 쌓이면(6 샘플 + 노이즈 제거) 마지막 그림만 다시 내보낸다 */
export function renderGpuPt() { pt?.renderSample(); }
export const gpuPtCamera = () => pt?.updateCamera();
