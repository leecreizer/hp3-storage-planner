// 화면 성능(화질) 단계 — 노트북 내장 그래픽에서도 60프레임으로 돌게 하는 설정 묶음(사용자 지시 2026-11-11 「노트북에서도 쾌적하게, 60프레임」).
// 대상 노트북 = i7-1165G7 + Intel Iris Xe(한영 프로젝트에서 받은 사양).
//
// 측정(이 PC RTX 4080, 화소를 9배로 늘려 GPU 를 채운 상태, 안방 · 장 정면/방 전체 돌기 2026-11-11):
//   전부 켬 29~33ms → 화면 효과(SSGI·GTAO·SSR·노이즈 제거·TRAA·블룸·거울 평면 반사) 끔 5~9ms — 화면 효과가 GPU 시간의 약 80%.
//   그다음이 조명(밝기 0 채움 포함 13개 끄면 3.8~4.7ms), 장 그림자 4개는 거의 차이 없음.
// 그래서 낮은 단계는 ① 화소 수(배율 1 · 화소 예산) ② 화면 효과를 끄고 가벼운 FXAA 로 계단만 편다 — 구운 그늘(장 AO·공간·상품 라이트맵)은 그대로라 입체감은 남는다.
//
// 고르는 곳 = 「실사」 메뉴 아래 화면 성능. 고른 값은 브라우저에 기억한다. ?q=low|mid|high 는 그 판에서만(비교 측정용, 저장 안 함)
import type { PostSettings } from './render/raster';

export type QualityName = 'low' | 'mid' | 'high';
export type QualityChoice = 'auto' | QualityName;
export type QualityProfile = {
  name: QualityName; label: string;
  /** 화소 배율 상한 · 한 장에 그릴 최대 화소 수(내장 그래픽은 채우기 속도에서 막힌다 — 큰 화면이면 배율 1 도 무겁다) */
  dpr: number; maxPixels: number;
  /** 가벼운 화면 — 장면을 한 장만 그리고(재질 색·법선·움직임 버퍼 없음) FXAA. 화면 효과는 다 끈다 */
  lite: boolean;
  /** 후처리 설정 위에 덮어쓰는 값 — 사용자가 「후처리」 메뉴에서 고른 값은 그대로 두고 이 단계에서만 끈다 */
  caps: Partial<PostSettings>;
};

export const PROFILES: Record<QualityName, QualityProfile> = {
  high: { name: 'high', label: '높음', dpr: 1.5, maxPixels: Infinity, lite: false, caps: {} },
  // 보통 — 간접광·화면 반사·블룸을 빼고 깨끗한 구석 그늘(GTAO)과 TRAA 만. 거울은 낮은 해상도 평면 반사
  mid: { name: 'mid', label: '보통', dpr: 1.25, maxPixels: 2.2e6, lite: false, caps: { ssr: false, sss: false, bloom: false, aoKind: 'gtao', quality: 'low', reflect: 'low' } },
  // 노트북 — 화면 효과 없음, 배율 1 · 130만 화소(FHD 노트북 150% 배율이면 그리는 칸이 약 86만 화소라 배율 1 그대로)
  low: { name: 'low', label: '노트북', dpr: 1, maxPixels: 1.3e6, lite: true, caps: { ssgi: false, ssr: false, sss: false, traa: false, bloom: false, denoise: false, reflect: 'off' } },
};
const KEY = 'storage-planner.quality';
const params = new URLSearchParams(location.search);
const FORCED = (['low', 'mid', 'high'] as const).find(q => q === params.get('q')) ?? null;

/** GPU 이름 — 렌더러를 만들기 전에 단계를 정해야 해서 WebGL 캔버스 하나로 미리 읽는다 */
export const GPU_NAME = (() => {
  try {
    const gl = document.createElement('canvas').getContext('webgl2') ?? document.createElement('canvas').getContext('webgl');
    if (!gl) return '';
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return name;
  } catch { return ''; }
})();

/** 자동 판정 — 내장 그래픽(Intel UHD·Iris Xe·AMD 내장 Radeon Graphics·모바일)·소프트웨어 렌더링이면 노트북 단계.
 *  코어 수로 가르지 않는다(i7-1165G7 은 8스레드라 코어로 보면 높게 잡힌다 — 한영 프로젝트 실측) */
export const AUTO_TIER: QualityName = (() => {
  const g = GPU_NAME.toLowerCase();
  if (/swiftshader|llvmpipe|software|microsoft basic/.test(g)) return 'low';
  if (/intel|uhd|iris|hd graphics|mali|adreno|powervr|apple gpu|radeon\(tm\) graphics|radeon graphics|vega \d+ graphics/.test(g)) return 'low';
  if (/geforce\s*(mx|gt\s)|radeon\s*(r[2-7]|hd)|quadro\s*(k|p[45]\d\d\b)/.test(g)) return 'mid';
  if (matchMedia('(pointer: coarse)').matches) return 'low';
  return 'high';
})();

let choice: QualityChoice = (() => {
  if (FORCED) return FORCED;
  try { const v = localStorage.getItem(KEY); return v === 'low' || v === 'mid' || v === 'high' || v === 'auto' ? v : 'auto'; } catch { return 'auto'; }
})();
export const QUALITY_FORCED = FORCED;
export function qualityChoice(): QualityChoice { return choice; }
export function quality(): QualityProfile { return PROFILES[choice === 'auto' ? AUTO_TIER : choice]; }
export function setQualityChoice(c: QualityChoice) {
  choice = c;
  if (!FORCED) try { localStorage.setItem(KEY, c); } catch { /* 이번 화면엔 반영된다 */ }
  return quality();
}
/** 실제 화소 배율 — 단계 상한 · 기기 배율 · 화소 예산 중 가장 작은 값(0.75 아래로는 내리지 않는다) */
export function effectiveDpr(w: number, h: number, p = quality()) {
  const byBudget = Math.sqrt(p.maxPixels / Math.max(1, w * h));
  return Math.max(0.75, Math.min(devicePixelRatio || 1, p.dpr, byBudget));
}
