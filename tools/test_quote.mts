import fs from 'node:fs';
import { Planner } from '../src/catalog.ts';
const cat = JSON.parse(fs.readFileSync('public/data/catalog.json', 'utf8'));
const p = new Planner(cat);
for (const [tid, w] of [[9, 3100], [5, 3400], [7, 3400], [10, 3400], [11, 3400], [9, 2410], [9, 4200]]) {
  const d = p.newDesign(tid, w)!;
  const q = p.quote(d);
  console.log(p.type(tid).name, w, 'plan', d.planId, 'slots', d.slots.map(s => p.c(s.bodyId).w + ':' + p.c(s.bodyId).name).join(' | '), 'side', p.layout(d).side, '총', q.total.toLocaleString());
}
const d = p.newDesign(9, 3100)!; console.log(p.quote(d).lines.map(l => `${l.name} x${l.qty} ${l.unit}`).join('\n'));
