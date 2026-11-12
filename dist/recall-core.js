/* Written-recall grading and FSRS scheduling (Anki-style 4-button review).
 * Scheduling math comes from ts-fsrs (MIT, vendored in vendor/ts-fsrs-5.4.2.umd.js as window.FSRS).
 * Answer grading stays deterministic and never evaluates the typed text as code. */
(function (root) {
  'use strict';
  const DAY = 86400000;
  const INTERVALS = [1, 3, 7, 14, 30, 60, 90]; // legacy fixed intervals (kept for old records)
  const DEFAULTS = Object.freeze({retention: 0.9, newPerDay: 10, reviewsPerDay: 100, learnAheadMinutes: 0, leech: 8});
  const RATINGS = [
    {value: 1, key: 'again', label: '다시'},
    {value: 2, key: 'hard', label: '어려움'},
    {value: 3, key: 'good', label: '보통'},
    {value: 4, key: 'easy', label: '쉬움'}
  ];
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
  function endOfDay(now = Date.now()) {
    const d = new Date(now);
    d.setHours(24, 0, 0, 0);
    return d.getTime();
  }
  /* ---------- FSRS ---------- */
  const lib = () => {
    if (!root.FSRS?.fsrs) throw Error('FSRS 스케줄러를 불러오지 못했습니다.');
    return root.FSRS;
  };
  const clampRetention = v => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.min(0.97, Math.max(0.7, n)) : DEFAULTS.retention;
  };
  const schedulers = new Map();
  function scheduler(settings) {
    const params = {request_retention: clampRetention(settings?.retention), maximum_interval: 36500, enable_fuzz: true,
      // One 10-minute step only for misses: a new card answered Good graduates straight to review (days later),
      // and nothing is shown before it is due (no learn-ahead), so answers are recalled, not copied from minutes ago.
      enable_short_term: true, learning_steps: ['10m'], relearning_steps: ['10m']};
    const key = JSON.stringify(params);
    if (!schedulers.has(key)) schedulers.set(key, lib().fsrs(params));
    return schedulers.get(key);
  }
  const serialize = c => ({due: +c.due, stability: c.stability, difficulty: c.difficulty, elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days, learning_steps: c.learning_steps, reps: c.reps, lapses: c.lapses, state: c.state,
    last_review: c.last_review ? +c.last_review : null});
  function isLegacy(record) { return !!record && !record.fsrs && Number.isFinite(record.due); }
  // Old fixed-interval records become review cards whose stability is the last planned interval.
  function legacyCard(record, now) {
    const interval = Math.max(1, Number(record.interval) || 1);
    const last = Number(record.reviewedAt) || (Number(record.due) - interval * DAY) || now;
    return {due: Number(record.due), stability: interval, difficulty: 5, elapsed_days: 0, scheduled_days: interval,
      learning_steps: 0, reps: Number(record.attempts) || 1, lapses: Number(record.lapses) || 0, state: 2, last_review: last};
  }
  function memory(record, now = Date.now()) {
    if (record?.fsrs) return record.fsrs;
    if (isLegacy(record)) return legacyCard(record, now);
    return null;
  }
  function toCard(record, now) {
    const m = memory(record, now);
    if (!m) return lib().createEmptyCard(new Date(now));
    return {...m, due: new Date(m.due), last_review: m.last_review ? new Date(m.last_review) : undefined};
  }
  function upgrade(record, now = Date.now()) {
    if (!isLegacy(record)) return record;
    const {stage, interval, due, lastDay, reviewedAt, attempts, lapses, lastCorrect, confidence} = record;
    return {...record, fsrs: legacyCard(record, now),
      legacy: {stage, interval, due, lastDay, reviewedAt, attempts, lapses, lastCorrect, confidence}};
  }
  // 'new' | 'learn' (Learning/Relearning) | 'review'
  function stateOf(record) {
    const m = memory(record);
    if (!m) return 'new';
    return m.state === 1 || m.state === 3 ? 'learn' : m.state === 2 ? 'review' : 'new';
  }
  function dueOf(record) { const m = memory(record); return m ? m.due : null; }
  function span(ms) {
    const minutes = Math.max(1, Math.round(ms / 60000));
    if (minutes < 60) return `${minutes}분`;
    const hours = Math.round(minutes / 60);
    if (minutes < 1440) return `${hours}시간`;
    const days = Math.round(ms / DAY);
    if (days < 30) return `${days}일`;
    if (days < 365) return `${(days / 30).toFixed(1).replace(/\.0$/, '')}개월`;
    return `${(days / 365).toFixed(1).replace(/\.0$/, '')}년`;
  }
  // Preview all four outcomes once; the chosen one is applied exactly as previewed.
  function preview(record, settings, now = Date.now()) {
    const s = scheduler(settings), card = toCard(record, now), result = s.repeat(card, new Date(now));
    return RATINGS.map(r => {
      const next = result[r.value].card;
      return {rating: r.value, key: r.key, label: r.label, card: serialize(next), after: span(+next.due - now)};
    });
  }
  function apply(record, choice, meta = {}, now = Date.now()) {
    const old = upgrade(record || {}, now);
    const prevState = stateOf(old);
    const attempt = {id: meta.id, at: now, rating: choice.rating, prevState, answer: meta.answer, correct: !!meta.correct,
      manual: !!meta.manual, forgot: !!meta.forgot, seconds: meta.seconds};
    const history = [...(old.history || []), attempt].slice(-40);
    const seconds = Math.max(1, Number(meta.seconds) || 1);
    return {...old, fsrs: choice.card, due: choice.card.due, lastDay: dayKey(now), reviewedAt: now,
      attempts: (old.attempts || 0) + 1, lapses: choice.card.lapses, lastCorrect: !!meta.correct, lastRating: choice.rating,
      meanSeconds: old.meanSeconds ? old.meanSeconds * 0.7 + seconds * 0.3 : seconds, history};
  }
  function retrievability(record, settings, now = Date.now()) {
    const m = memory(record, now);
    if (!m || m.state === 0) return null;
    return scheduler(settings).get_retrievability(toCard(record, now), new Date(now), false);
  }
  /* ---------- daily queue with Anki-style limits ---------- */
  const chapterOf = card => card.src?.[0] || '';
  function limitFor(settings, key, field) {
    const deck = settings?.decks?.[key];
    const n = Number(deck?.[field]);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
  }
  function plan(cards, records, daily = {}, now = Date.now(), options = {}) {
    const settings = options.settings || {}, course = options.course || cards[0]?.course || '';
    const byId = new Map(cards.map(c => [c.id, c]));
    const courseNew = limitFor(settings, course, 'newPerDay') ?? (options.newPerDay ?? DEFAULTS.newPerDay);
    const courseRev = limitFor(settings, course, 'reviewsPerDay') ?? DEFAULTS.reviewsPerDay;
    const newIds = daily.newIds || [], reviewIds = daily.reviewIds || [];
    const used = (ids, ch) => ids.filter(id => (byId.get(id) ? chapterOf(byId.get(id)) : (options.chapterOfId?.(id) || '')) === ch).length;
    const room = (field, ids, ch, courseLimit) => {
      const deck = limitFor(settings, course + '/' + ch, field);
      const left = courseLimit - ids.length;
      return Math.max(0, deck === null ? left : Math.min(left, deck - used(ids, ch)));
    };
    const learn = [], laterLearn = [], reviewAll = [], fresh = [];
    const end = endOfDay(now), ahead = now + DEFAULTS.learnAheadMinutes * 60000;
    for (const c of cards) {
      const r = records[c.id], st = stateOf(r);
      if (st === 'new') { fresh.push(c); continue; }
      const due = dueOf(r);
      if (st === 'learn') { if (due <= now) learn.push(c); else if (due < end) laterLearn.push(c); }
      else if (due < end) reviewAll.push(c);
    }
    const byDue = (a, b) => dueOf(records[a.id]) - dueOf(records[b.id]) || a.id.localeCompare(b.id);
    learn.sort(byDue); laterLearn.sort(byDue); reviewAll.sort(byDue);
    const review = [], chapterRev = {};
    let revLeft = Math.max(0, courseRev - reviewIds.length);
    for (const c of reviewAll) {
      if (revLeft <= 0) break;
      const ch = chapterOf(c);
      chapterRev[ch] ??= room('reviewsPerDay', reviewIds, ch, courseRev);
      if (chapterRev[ch] <= 0) continue;
      review.push(c); chapterRev[ch]--; revLeft--;
    }
    const fresh_ = [], chapterNew = {};
    let newLeft = Math.max(0, courseNew - newIds.length);
    for (const c of fresh) {
      if (newLeft <= 0) break;
      const ch = chapterOf(c);
      chapterNew[ch] ??= room('newPerDay', newIds, ch, courseNew);
      if (chapterNew[ch] <= 0) continue;
      fresh_.push(c); chapterNew[ch]--; newLeft--;
    }
    const nextLearn = laterLearn.find(c => dueOf(records[c.id]) <= ahead) || null;
    const remaining = Math.max(0, 900 - (daily.seconds || 0));
    const selected = [...learn.map(c => ({id: c.id, kind: 'learn'})), ...review.map(c => ({id: c.id, kind: 'due'})),
      ...fresh_.map(c => ({id: c.id, kind: 'new'}))];
    // `due` keeps its old meaning for callers: cards that need review today (learning + review).
    return {learn, laterLearn, nextLearn, review, reviewAll, due: [...learn, ...review], fresh, newToday: fresh_, remaining, selected};
  }
  /* ---------- legacy fixed-interval rule (only for reading old data/tests) ---------- */
  function review(previous, ok, confidence, now = Date.now()) {
    const old = previous || {};
    const sameDay = old.lastDay === dayKey(now);
    let stage = Number.isInteger(old.stage) ? old.stage : -1;
    let interval;
    if (!ok) { stage = -1; interval = 1; }
    else if (confidence === 'unsure') { stage = Math.max(0, stage); interval = Math.max(1, Math.min(7, Math.floor((old.interval || 2) / 2))); }
    else { stage = Math.min(INTERVALS.length - 1, Math.max(0, stage + (sameDay && stage >= 0 ? 0 : 1))); interval = INTERVALS[stage]; }
    return {...old, stage, interval, due: nextDay(now, interval), lastDay: dayKey(now), reviewedAt: now, attempts: (old.attempts || 0) + 1,
      lapses: (old.lapses || 0) + (ok ? 0 : 1), lastCorrect: ok, confidence: ok ? confidence : 'forgot'};
  }
  root.RecallCore = Object.freeze({INTERVALS, DEFAULTS, RATINGS, DAY, dayKey, normalize, correct, nextDay, endOfDay, review,
    plan, preview, apply, upgrade, stateOf, dueOf, memory, retrievability, span, scheduler, clampRetention, chapterOf});
})(globalThis);
