/* Pure written-recall grading and calendar-day scheduling; no answer evaluation. */
(function (root) {
  'use strict';
  const INTERVALS = [1, 3, 7, 14, 30, 60, 90];
  function dayKey(value = Date.now()) {
    const d = new Date(value);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function normalize(value, mode = 'term') {
    let text = String(value ?? '').normalize('NFC').trim();
    if (mode === 'verbatim') return text;
    // Whitespace in "2 3" must not turn it into the number 23.
    if (/\d\s+\d/.test(text)) return text;
    text = text.replace(/\s+/g, '');
    if (mode === 'formula') return text.replace(/−/g, '-');
    return text.toLocaleLowerCase();
  }
  function correct(card, answer) {
    if (!String(answer ?? '').trim()) return false;
    const typed = normalize(answer, card.mode);
    return card.answers.some(a => {
      const expected = normalize(a, card.mode);
      if (expected === typed) return true;
      return card.mode === 'formula' && decimal(expected) !== null && decimal(expected) === decimal(typed);
    });
  }
  function decimal(text) {
    // Exact decimal formatting only: no eval, float rounding, unit or bit-string conversion.
    const match = text.match(/^([+-]?)(\d*)(?:\.(\d*))?$/);
    if (!match || !(match[2] || match[3])) return null;
    const whole = match[2].replace(/^0+(?=\d)/, '') || '0';
    const fraction = (match[3] || '').replace(/0+$/, '');
    return (match[1] === '-' && (whole !== '0' || fraction) ? '-' : '') + whole + (fraction ? '.' + fraction : '');
  }
  function nextDay(now, days) {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
  function review(previous, ok, confidence, now = Date.now()) {
    const old = previous || {};
    const sameDay = old.lastDay === dayKey(now);
    let stage = Number.isInteger(old.stage) ? old.stage : -1;
    let interval;
    if (!ok) {
      stage = -1;
      interval = 1;
    } else if (confidence === 'unsure') {
      stage = Math.max(0, stage);
      interval = Math.max(1, Math.min(7, Math.floor((old.interval || 2) / 2)));
    } else {
      stage = Math.min(INTERVALS.length - 1, Math.max(0, stage + (sameDay && stage >= 0 ? 0 : 1)));
      interval = INTERVALS[stage];
    }
    return {
      ...old, stage, interval, due: nextDay(now, interval), lastDay: dayKey(now),
      reviewedAt: now, attempts: (old.attempts || 0) + 1,
      lapses: (old.lapses || 0) + (ok ? 0 : 1), lastCorrect: ok,
      confidence: ok ? confidence : 'forgot'
    };
  }
  function plan(cards, records, daily, now = Date.now()) {
    const due = cards.filter(c => records[c.id] && records[c.id].due <= now)
      .sort((a, b) => records[a.id].due - records[b.id].due || a.id.localeCompare(b.id));
    const fresh = cards.filter(c => !records[c.id]);
    const remaining = Math.max(0, 900 - (daily.seconds || 0));
    const samples = due.map(c => records[c.id].meanSeconds).filter(v => v > 0);
    const estimate = samples.length ? Math.max(20, Math.min(120, samples.reduce((a, b) => a + b, 0) / samples.length)) : 45;
    const capacity = remaining ? Math.max(1, Math.floor(remaining / estimate)) : 0;
    const selectedDue = due.slice(0, capacity);
    const newAllowance = due.length > selectedDue.length ? 0 : Math.max(0, 3 - (daily.newIds || []).length);
    const selectedNew = fresh.slice(0, Math.min(newAllowance, Math.max(0, capacity - selectedDue.length)));
    return { due, fresh, remaining, selected: [...selectedDue.map(c => ({id:c.id, kind:'due', after:0})), ...selectedNew.map(c => ({id:c.id, kind:'new', after:0}))] };
  }
  root.RecallCore = Object.freeze({ INTERVALS, dayKey, normalize, correct, nextDay, review, plan });
})(globalThis);
