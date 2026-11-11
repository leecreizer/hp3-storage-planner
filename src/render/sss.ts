/**
 * 화면 그림자(SSS) — three 의 SSSNode 그대로에 「광선 위 지점의 깊이」 읽는 법만 고쳤다.
 *
 * 원본은 광선 위 지점(화소 사이)의 깊이를 가장 가까운 화소 하나에서 읽는다. 바닥을 비스듬히 볼 때 그 반 화소 어긋남이
 * 해 광선이 바닥 위로 뜬 높이(해 고도 16° 면 처음 몇 걸음은 수 mm)보다 커서, 바닥이 자기 위를 지나는 광선을 가린다고 잘못 보고
 * 햇빛 자리에 검은 점을 뿌렸다. 멈춘 화면은 TRAA 가 여러 장을 섞어 옅게 묻었지만 돌리는 동안엔 얼룩으로 보였다
 * (부엌 플래너 사용자 지적 2026-11-06 「SSR+SSS 에서 카메라 회전 시 얼룩」 — 해가 낮을 때만, 고도 42 면 광선이 빨리 떠서 안 생김. 같은 SSS 라 붙박이장도 같이).
 * 이웃 네 화소의 깊이를 광선 위치로 쌍선형 보간한다 — 평평한 면은 깊이 버퍼 값이 화면 좌표의 일차식이라 정확히 맞아 자기 그늘이 없다.
 * 원근 카메라 · 일반 깊이 버퍼만(부엌 · 붙박이장 둘 다 그렇다)
 */
import SSSNode from 'three/addons/tsl/display/SSSNode.js';
import * as TSL from 'three/tsl';

// TSL 타입 정의가 노드 차원(vec2 · vec3)을 끝까지 따라가지 못해 이 파일에선 느슨하게 쓴다(원본 JS 를 그대로 옮긴 코드)
const { Break, Fn, If, Loop, abs, context, float, floor, fract, getScreenPosition, getViewPosition, int, interleavedGradientNoise, lightPosition, lightTargetPosition, max, mix, perspectiveDepthToViewZ, rand, screenCoordinate, uv, vec2 } = TSL as any;

class SSSNodeFix extends SSSNode {
  setup(builder: any) {
    const me = this as any;
    const res = me._resolution;
    const uvNode = uv();
    const viewZ = (d: any) => perspectiveDepthToViewZ(d, me._cameraNear, me._cameraFar);
    // 화소 중심(+0.5) 좌표 → 그 화소 깊이 그대로(깊이 텍스처는 가장 가까운 화소로 읽힌다)
    const texel = (p: any) => me.depthNode.sample(p.div(res)).r;
    const depthAt = (xy: any) => {
      const p = xy.sub(0.5), b = floor(p).add(0.5), f = fract(p);
      return mix(mix(texel(b), texel(b.add(vec2(1, 0))), f.x), mix(texel(b.add(vec2(0, 1))), texel(b.add(vec2(1, 1))), f.x), f.y);
    };
    const sss = Fn(() => {
      const depth = me.depthNode.sample(uvNode).r.toVar();
      depth.greaterThanEqual(1.0).discard();
      // 광선 — 시작점(이 화소)에서 해 쪽으로 maxDistance(m), 화면에선 d0 → d1
      const rayStart = getViewPosition(uvNode, depth, me._cameraProjectionMatrixInverse).toVar();
      const rayDir = me._cameraViewMatrix.transformDirection(lightPosition(me._mainLight).sub(lightTargetPosition(me._mainLight))).toConst();
      const rayEnd = rayStart.add(rayDir.mul(me.maxDistance)).toConst();
      const d0 = screenCoordinate.xy.toVar();
      const d1 = getScreenPosition(rayEnd, me._cameraProjectionMatrix).mul(res).toVar();
      const totalLen = d1.sub(d0).length().toVar();
      const xLen = d1.x.sub(d0.x).toVar(), yLen = d1.y.sub(d0.y).toVar();
      const totalStep = int(max(abs(xLen), abs(yLen)).mul(me.quality.clamp())).toConst();
      const xSpan = xLen.div(totalStep).toVar(), ySpan = yLen.div(totalStep).toVar();
      const offset = fract(interleavedGradientNoise(screenCoordinate).add(me._temporalOffset)).add(rand(uvNode.add(me._frameId))).toConst();
      const occlusion = float(0).toVar();
      Loop(totalStep, ({ i }: any) => {
        const xy = vec2(d0.x.add(xSpan.mul(float(i).add(offset))), d0.y.add(ySpan.mul(float(i).add(offset)))).toVar();
        If(xy.x.lessThan(0).or(xy.x.greaterThan(res.x)).or(xy.y.lessThan(0)).or(xy.y.greaterThan(res.y)), () => { Break(); });
        const fragZ = viewZ(depthAt(xy)).toConst();
        const rayPos = mix(rayStart, rayEnd, xy.sub(d0).length().div(totalLen));
        // 깊이 버퍼 면이 광선보다 앞(카메라 쪽)이고 두께 안이면 가림
        const depthDelta = rayPos.z.sub(fragZ).negate();
        If(depthDelta.greaterThan(0).and(depthDelta.lessThan(me.thickness)), () => { occlusion.assign(me.shadowIntensity); Break(); });
      });
      return occlusion.oneMinus();
    });
    me._material.contextNode = context(builder.getSharedContext());
    me._material.fragmentNode = sss();
    me._material.needsUpdate = true;
    return me._textureNode;
  }
}

export const sss = (depthNode: ConstructorParameters<typeof SSSNode>[0], camera: ConstructorParameters<typeof SSSNode>[1], mainLight: ConstructorParameters<typeof SSSNode>[2]) => new SSSNodeFix(depthNode, camera, mainLight);
