// 처음 여는 사람의 기본 상태 — 2026-11-12 사용자가 쓰던 화면 그대로(사용자 지시 「현재 정의된 모든 옵션 체크 내용으로 기본설정, 빛 셋팅도,
// 장 및 소품 위치까지 다 기본으로」). 저장된 값이 없을 때만 넣는다 — 이미 쓰던 사람의 값은 건드리지 않는다.
// 후처리(render/raster.ts POST_DEFAULTS) · 빛(scene.ts sunCfg·roomCfg·shadowCfg) · 설비(main.ts defaultFixtures)는 코드 기본값 자체를 바꿨다
// — 「기본값으로」 버튼과 화면 성능 단계가 그 값을 기준으로 삼아야 해서. 여기는 방·장·가구 자리처럼 화면에서 고친 상태다.
// main.ts 맨 처음에 불러온다(다른 모듈이 저장소를 읽기 전에)
const DOOR = { wall: 'back', t: 0.08, w: 0.7494117426643603, hinge: 'R', h: 2.17 };
const DESIGN = {
  typeId: 9, width: 2320, planId: 1902320, doorColorId: 1,
  slots: [{ slotSeq: 1, bodyId: 645, doorColorId: null }, { slotSeq: 2, bodyId: 659, doorColorId: null }, { slotSeq: 3, bodyId: 644, doorColorId: null }],
  options: { epLeft: true, epRight: false, acc: false }, space: 3100, offset: 780,
};
const DIMS = { w: 3640, d: 4960, h: 2400, wall: 'back', custom: false };
const SEED: Record<string, unknown> = {
  'storage-planner.layout': 'openL',
  'storage-planner.design.v1': DESIGN,
  'storage-planner.roomdims.v1': DIMS,
  'storage-planner.hvplan.v1': { master: { dims: DIMS, ward: true, design: DESIGN, layout: 'openL', split: 0.5 } },
  'storage-planner.roomdoor.v1': DOOR,
  'storage-planner.hvdoor.v1': { 'master|back': DOOR },
  // 가구·소품 옮긴 자리(안방 · 장 벽 B) — 벽 장식 3개는 벽째 옮김(free)
  'storage-planner.hvmoves.v2': {
    'master|B': {
      u2: { dx: -2.15851111215482, dz: 2.0880264476054857, rot: 1, dy: -0.09713580005914535, ang: 0, free: true },
      u10: { dx: -0.009955845567299448, dz: 0.5809892444912332, rot: 0 },
      u23: { dx: 0.0008597910094867711, dz: 1.1369351246610204, rot: 0 },
      u24: { dx: 0.028639570468000253, dz: 1.1663595333544226, rot: 0 },
      u5: { dx: 0.00003782759771421909, dz: 0.4494538682137508, rot: 0, dy: 0.028402785670059938, ang: 0, free: true },
      u0: { dx: 0.000028302042103014666, dz: 0.26915950586591286, rot: 0, dy: 0.018878627576235374, ang: 0, free: true },
      u11: { dx: 0.010517133020899738, dz: 0.6945386710899006, rot: 0 },
    },
  },
  // FPS · 처음 열기 시간 표시
  'storage-planner.fps': '1',
};
try {
  for (const [k, v] of Object.entries(SEED)) if (localStorage.getItem(k) == null) localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
} catch { /* 저장소를 못 쓰면 코드 기본값 */ }
