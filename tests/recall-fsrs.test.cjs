const {test} = require('node:test');
const assert = require('node:assert/strict');
globalThis.FSRS = require('../dist/vendor/ts-fsrs-5.4.2.umd.js');
require('../dist/recall-core.js');
const R = globalThis.RecallCore, F = globalThis.FSRS;
const MIN = 60000, DAY = 86400000;
const t0 = new Date('2026-11-10T10:00:00').getTime();

test('preview/apply follows ts-fsrs exactly for the same review sequence', () => {
  const ref = F.fsrs({request_retention: 0.9, maximum_interval: 36500, enable_fuzz: true, enable_short_term: true,
    learning_steps: ['1m', '10m'], relearning_steps: ['10m']});
  let card = F.createEmptyCard(new Date(t0)), record, now = t0;
  for (const rating of [3, 3, 3, 1, 3, 4, 2, 3]) {
    const choice = R.preview(record, {retention: 0.9}, now).find(c => c.rating === rating);
    record = R.apply(record, choice, {correct: rating > 1}, now);
    card = ref.next(card, new Date(now), rating).card;
    assert.equal(record.fsrs.due, +card.due);
    assert.equal(record.fsrs.state, card.state);
    assert.ok(Math.abs(record.fsrs.stability - card.stability) < 1e-9);
    assert.ok(Math.abs(record.fsrs.difficulty - card.difficulty) < 1e-9);
    now = record.fsrs.due + 5 * MIN;
  }
});

test('new cards use Anki-like learning steps (1 min, 10 min) and Easy graduates', () => {
  const p = R.preview(undefined, {}, t0);
  assert.deepEqual(p.map(x => x.key), ['again', 'hard', 'good', 'easy']);
  assert.equal(p[0].card.due - t0, 1 * MIN);
  assert.equal(p[2].card.due - t0, 10 * MIN);
  assert.equal(p[2].card.state, 1);           // still learning
  assert.equal(p[3].card.state, 2);           // Easy: review
  assert.ok(p[3].card.due - t0 >= DAY);
  assert.equal(p[0].after, '1분');
});

test('old fixed-interval records keep their due date and become review cards', () => {
  const old = {stage: 2, interval: 7, due: t0 + 3 * DAY, lastDay: '2026-11-06', reviewedAt: t0 - 4 * DAY, attempts: 3, lapses: 1, lastCorrect: true, confidence: 'sure', history: [{at: t0 - 4 * DAY, correct: true}]};
  const up = R.upgrade(old, t0);
  assert.equal(up.due, old.due);
  assert.equal(up.fsrs.due, old.due);
  assert.equal(up.fsrs.state, 2);
  assert.equal(up.fsrs.stability, 7);
  assert.equal(up.legacy.interval, 7);
  assert.deepEqual(up.history, old.history);
  assert.equal(R.stateOf(old), 'review');      // readers work before the upgrade, too
  assert.equal(R.upgrade(up, t0), up);         // idempotent
  const next = R.apply(up, R.preview(up, {}, old.due).find(c => c.rating === 3), {correct: true}, old.due);
  assert.ok(next.fsrs.due > old.due + DAY);
  assert.equal(next.legacy.interval, 7);
});

test('daily queue: learning first, then due reviews, then new cards within course and deck limits', () => {
  const cards = [
    {id: 'n1', src: ['pl09', 4]}, {id: 'n2', src: ['pl09', 5]}, {id: 'n3', src: ['pl07', 3]}, {id: 'n4', src: ['pl07', 4]},
    {id: 'rv', src: ['pl09', 6]}, {id: 'rvLate', src: ['pl09', 7]}, {id: 'ln', src: ['pl09', 8]}].map(c => ({...c, course: 'programming-languages'}));
  const review = due => ({fsrs: {due, stability: 3, difficulty: 5, elapsed_days: 0, scheduled_days: 3, learning_steps: 0, reps: 2, lapses: 0, state: 2, last_review: due - 3 * DAY}, due});
  const records = {rv: review(t0 - DAY), rvLate: review(t0 + 3 * DAY),
    ln: {fsrs: {due: t0 - MIN, stability: 1, difficulty: 5, elapsed_days: 0, scheduled_days: 0, learning_steps: 1, reps: 1, lapses: 0, state: 1, last_review: t0 - 11 * MIN}}};
  const settings = {decks: {'programming-languages': {newPerDay: 3}, 'programming-languages/pl09': {newPerDay: 1}}};
  const p = R.plan(cards, records, {seconds: 0, newIds: [], reviewIds: []}, t0, {course: 'programming-languages', settings});
  assert.deepEqual(p.selected.map(x => x.id), ['ln', 'rv', 'n1', 'n3', 'n4']);
  assert.deepEqual(p.selected.map(x => x.kind), ['learn', 'due', 'new', 'new', 'new']);
  // One pl09 card was already introduced today: the deck limit leaves no pl09 new card.
  const q = R.plan(cards, records, {newIds: ['old-pl09'], reviewIds: ['x']}, t0,
    {course: 'programming-languages', settings: {decks: {'programming-languages/pl09': {newPerDay: 1}, 'programming-languages': {reviewsPerDay: 1}}}, chapterOfId: () => 'pl09'});
  assert.deepEqual(q.newToday.map(c => c.id), ['n3', 'n4']);
  assert.deepEqual(q.review.map(c => c.id), []);      // review limit already used
  assert.deepEqual(q.reviewAll.map(c => c.id), ['rv']);
});

test('learn-ahead offers a learning card due within 20 minutes when nothing else is left', () => {
  const card = {id: 'a', course: 'x', src: ['c', 1]};
  const rec = {fsrs: {due: t0 + 9 * MIN, stability: 1, difficulty: 5, elapsed_days: 0, scheduled_days: 0, learning_steps: 1, reps: 1, lapses: 0, state: 1, last_review: t0 - MIN}};
  const p = R.plan([card], {a: rec}, {}, t0, {course: 'x'});
  assert.equal(p.selected.length, 0);
  assert.equal(p.nextLearn.id, 'a');
  const far = {fsrs: {...rec.fsrs, due: t0 + 40 * MIN}};
  assert.equal(R.plan([card], {a: far}, {}, t0, {course: 'x'}).nextLearn, null);
});

test('retention is clamped and changes the schedule', () => {
  assert.equal(R.clampRetention(2), 0.97);
  assert.equal(R.clampRetention('x'), 0.9);
  const base = {fsrs: {due: t0, stability: 10, difficulty: 5, elapsed_days: 10, scheduled_days: 10, learning_steps: 0, reps: 5, lapses: 0, state: 2, last_review: t0 - 10 * DAY}};
  const at = r => R.preview(base, {retention: r}, t0).find(c => c.rating === 3).card.scheduled_days;
  assert.ok(at(0.8) > at(0.95));
});
