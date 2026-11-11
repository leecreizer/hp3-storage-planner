// ② 라이트맵 굽기(zalo/three.js webgpu_lightmap_baking) · ③ 서펠 GI(jure/webgiya)
// 두 엔진은 WebGPU 렌더러를 쓰고(서펠은 three 0.182) 플래너의 WebGL 렌더러와 장면을 나눌 수 없다.
// 그래서 시험 앱(라이트맵 굽기 · 서펠 GI)을 임베드 빌드해 public/engines 에 두고 iframe 으로 띄운 뒤,
// 지금 장면(방 + 붙박이장)을 GLB 로, 시점·조명은 값으로 보낸다. 엔진 코드는 시험 때 그대로다.
//
// 조명은 실시간 — 장면을 다시 넘기지 않고 값만 보낸다(type 'light'). 굽기 엔진은 직접광(해·다운라이트)을 원래 실시간으로
// 그리고(directLight 'live') 라이트맵에는 해·하늘의 튄 빛만 굽는다. 다운라이트·천장 조명(발광 기구)은 굽지 않고 실시간으로만
// (사용자 지시 2026-11-02 — 엔진 embedMain liveLampsOff). 그래서 조명 값은 즉시 바뀌고, 해가 바뀔 때만 놓은 뒤 다시 굽는다.
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

export type EmbedKind = 'bake' | 'surfel';
type Sun = { azimuth: number; elevation: number; intensity: number };
/** 엔진에 보내는 조명 값 — 다운라이트 세기(칸델라)·발광 기구·색은 절댓값 */
export type LightPayload = {
  sun: Sun; sunTarget: number[];
  spot: { intensity: number; color: number };
  glow: { intensity: number; color: number };
  exposure: number;
};
export type EmbedHandle = { setLight(l: LightPayload): void; setActive(on: boolean): void; readonly status: string; dispose(): void };

const PAGES: Record<EmbedKind, string> = {
  bake: 'engines/bake/embed.html',
  surfel: 'engines/surfel/index.html?embed&scene=planner',
};

export async function startEmbed(kind: EmbedKind, host: HTMLElement, objects: THREE.Object3D[],
  camera: THREE.PerspectiveCamera, target: THREE.Vector3, light: LightPayload,
  onStatus: (text: string) => void): Promise<EmbedHandle> {
  onStatus('장면 내보내는 중…');
  // 보기용 모서리 선은 빼고 보이는 메시만
  const lines: THREE.Object3D[] = [];
  objects.forEach(o => o.traverse(c => { if ((c.name === 'edge-lines' || c.name === 'contact-shadow' || c.name === 'open-mark' || c.name === 'sel-mark') && c.visible) { c.visible = false; lines.push(c); } }));
  // 구운 장 그늘(aoMap)은 빼고 보낸다 — 굽기·서펠 엔진이 그늘을 직접 계산하므로 같이 보내면 두 번 어두워진다
  const aoOff = new Map<THREE.MeshStandardMaterial, THREE.Texture>();
  objects.forEach(o => o.traverse(c => {
    for (const m of [(c as THREE.Mesh).material ?? []].flat() as THREE.MeshStandardMaterial[]) if (m.aoMap) { aoOff.set(m, m.aoMap); m.aoMap = null; }
  }));
  let glb: ArrayBuffer;
  try {
    glb = await new GLTFExporter().parseAsync(objects, { binary: true, onlyVisible: true }) as ArrayBuffer;
  } finally {
    lines.forEach(l => (l.visible = true));
    aoOff.forEach((t, m) => (m.aoMap = t));
  }

  const frame = document.createElement('iframe');
  frame.className = 'engine-frame';
  frame.src = `${import.meta.env.BASE_URL}${PAGES[kind]}`;
  frame.allow = 'fullscreen';
  host.append(frame);
  onStatus(kind === 'bake' ? '라이트맵 굽기 엔진 시작 중…' : '서펠 GI 엔진 시작 중…');

  let active = true, status = '', loaded = false;
  let last = light;
  const send = (m: unknown, transfer: Transferable[] = []) => frame.contentWindow?.postMessage(m, '*', transfer);
  const onMsg = (e: MessageEvent) => {
    if (e.source !== frame.contentWindow) return;
    const m = e.data;
    if (m?.type === 'ready') {
      loaded = true;
      send({
        type: 'scene', glb, light: last, sun: last.sun, sunTarget: last.sunTarget,
        camera: { position: camera.position.toArray(), target: target.toArray(), fov: camera.fov },
      }, [glb]);
    } else if (m?.type === 'status') {
      status = [m.text, m.warning].filter(Boolean).join(' · ');
      if (active) onStatus(status);
    }
  };
  window.addEventListener('message', onMsg);
  return {
    get status() { return status; },
    // 저장해 둔 결과 사이를 오갈 때 — 숨긴 화면은 브라우저가 그리기를 멈춘다
    setActive(on) { active = on; frame.style.display = on ? '' : 'none'; if (on && status) onStatus(status); },
    // 조명 값만 보낸다 — 엔진이 직접광은 즉시, 튄 빛은 놓은 뒤 다시 굽는다(엔진 쪽에서 같은 값이면 무시)
    setLight(l) { last = l; if (loaded) send({ type: 'light', light: l }); },
    dispose() {
      window.removeEventListener('message', onMsg);
      frame.remove();
    },
  };
}
