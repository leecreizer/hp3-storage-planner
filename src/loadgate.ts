// 받는 순서 — 공간 → 장 → 가구 → 소품 → (그다음) 장 안 홈뷰 의류·가방 · 몸통·도어 미리 받기.
// 처음 열 때 이것들이 한꺼번에 받기를 다퉈 방 꾸밈이 다 올 때까지 24초가 걸렸다(사용자 지적 2026-11-12 「공간 불러오고 장, 가구, 소품 이런 식으로 절차적으로」).
// 방 꾸밈이 한 번 다 오면 열리고 계속 열려 있다 — 뒤로 미룬 받기는 처음 열 때만 문제다
let open = false;
const waiters: (() => void)[] = [];
/** 방 꾸밈(가구·소품)이 처음 다 왔다 — scene.ts buildRoom */
export function roomFurnished() { if (open) return; open = true; waiters.splice(0).forEach(f => f()); }
/** 방 꾸밈이 다 온 뒤에 */
export function afterRoom(): Promise<void> { return open ? Promise.resolve() : new Promise(r => waiters.push(r)); }
export function roomGateOpen() { return open; }
