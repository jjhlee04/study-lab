const {test}=require('node:test');
const assert=require('node:assert/strict');
require('../dist/planner-core.js');
require('../dist/recall-core.js');
const C=globalThis.PlannerCore;
test('Tuesday–Monday academic weeks and final exam week',()=>{
  for(const day of ['2026-09-01','2026-09-07'])assert.equal(C.week(day),1);
  assert.equal(C.week('2026-09-08'),2);
  assert.equal(C.week('2026-11-06'),10);
  assert.equal(C.examStart,'2026-12-15');assert.equal(C.examEnd,'2026-12-21');
  assert.equal(C.week(C.examEnd),16);assert.equal(C.week('2026-12-22'),null);
});
test('civil dates handle invalid dates, leap days, and month/year changes',()=>{
  for(const bad of ['2026-02-29','2026-13-01','2026-11-31','hello',''])assert.equal(C.parse(bad),null);
  assert.ok(C.parse('2028-02-29'));assert.equal(C.add('2026-12-31',1),'2027-01-01');
  assert.equal(C.add('2026-11-01',-1),'2026-10-31');
});
test('learned page ranges preserve skipped sections and reject invalid ranges',()=>{
  assert.deepEqual(C.range('1-3, 6',10),[1,2,3,6]);assert.deepEqual(C.range('',10),[]);
  assert.deepEqual(C.range('전체',3),[1,2,3]);
  for(const bad of ['0','3-2','1-11','1.5','<script>'])assert.throws(()=>C.range(bad,10));
});
test('exam and learned ranges gate reviews and new cards without changing records',()=>{
  const cards=[{id:'mid',src:['mid',2]},{id:'new',src:['final',4]},{id:'ahead',src:['final',8]},{id:'unseen-mid',src:['mid',3]}];
  const records={mid:{due:0,stage:2}},before=JSON.stringify(records);
  assert.deepEqual(C.eligible(cards,{final:[4,8]},{final:[1,2,3,4]}).map(c=>c.id),['new']);
  assert.deepEqual(C.eligible(cards,{final:[4,8]},{}).map(c=>c.id),[]);
  assert.equal(JSON.stringify(records),before);
  const plan=RecallCore.plan(C.eligible(cards,{final:[4,8]},{final:[4]}),records,{seconds:0,newIds:[]},Date.now());
  assert.deepEqual(plan.selected.map(c=>c.id),['new']);
});
