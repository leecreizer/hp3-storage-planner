// 말로 배치 시험 — node --experimental-strip-types tools/test_arrange.mts
import fs from 'node:fs';
import { Planner } from '../src/catalog.ts';
import { arrange, parsePrompt } from '../src/arrange.ts';
const cat = JSON.parse(fs.readFileSync('public/data/catalog.json', 'utf8'));
const p = new Planner(cat);
const asks = ['수납이 많았으면 좋겠어', '난 긴옷이 많아서 긴 옷장들이 필요해', '침구류 넣는 곳과 옷을 같이 보관하게해줘',
  '서랍 위주로, 긴 옷은 없어도 돼', '부부가 같이 써요, 바지 걸 곳도', '긴 옷 두 칸이랑 이불장', '화장대도 있었으면', '슬라이딩 도어로 해줘', '바지 걸 곳이 꼭 필요해', '외부 서랍이 보이는 장으로', ''];
for (const [tid, w] of [[9, 3100], [10, 3400], [5, 2600]]) {
  const d = p.newDesign(tid, w)!;
  console.log(`\n== ${p.type(tid).name} ${w}mm · 기본: ${d.slots.map(s => p.c(s.bodyId).name).join(' | ')}`);
  for (const a of asks) {
    const r = arrange(p, d, a);
    console.log(`「${a}」 → [${r.read.join(', ')}] ${r.design.typeId !== d.typeId ? '⇒ ' + p.type(r.design.typeId).name + ' ' : ''}${r.design.slots.map(s => p.c(s.bodyId).name).join(' | ')}${r.missing.length ? '  ※ ' + r.missing.join(' / ') : ''}`);
  }
}
console.log(JSON.stringify(parsePrompt('서랍 위주로, 긴 옷은 없어도 돼')));
