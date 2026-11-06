/* Calendar dates are civil dates; week 1 starts on 2026-09-01. */
(function (root) {
  'use strict';
  const DAY = 86400000;
  function parse(key) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key || '')) return null;
    const [y,m,d] = key.split('-').map(Number), date = new Date(Date.UTC(y,m-1,d));
    return date.toISOString().slice(0,10) === key ? date : null;
  }
  const key = date => date.toISOString().slice(0,10);
  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function add(date, n) { return key(new Date(parse(date).getTime() + n * DAY)); }
  const termStart = '2026-09-01', examStart = add(termStart,15*7), examEnd = add(examStart,6);
  function week(date) {
    const d = parse(date); if (!d) return null;
    const n = Math.floor((d-parse(termStart))/DAY/7)+1;
    return n >= 1 && n <= 16 ? n : null;
  }
  function range(text, max) {
    if (!text?.trim()) return [];
    if (text.trim() === '전체') return Array.from({length:max},(_,i)=>i+1);
    if (!/^\s*\d+(?:\s*-\s*\d+)?(?:\s*,\s*\d+(?:\s*-\s*\d+)?)*\s*$/.test(text)) throw Error('전체 또는 1-30, 35처럼 입력하세요.');
    const out = new Set();
    for (const part of text.split(',')) {
      const [a,b=a] = part.split('-').map(Number);
      if (a<1 || b<a || b>max) throw Error(`1~${max}쪽 안에서 선택하세요.`);
      for(let p=a;p<=b;p++)out.add(p);
    }
    return [...out];
  }
  function inScope(card, scope) {
    return scope === null || !!(scope && Object.hasOwn(scope,card.src[0]) && (scope[card.src[0]]===null || scope[card.src[0]].includes(card.src[1])));
  }
  // Existing memories survive a change of exam or learned range. Only new cards are gated.
  function eligible(cards, records, scope, learned) {
    return cards.filter(card => records[card.id] || (inScope(card,scope) && !!learned[card.src[0]]?.includes(card.src[1])));
  }
  root.PlannerCore = Object.freeze({parse,key,today,add,week,range,inScope,eligible,termStart,examStart,examEnd});
})(globalThis);
