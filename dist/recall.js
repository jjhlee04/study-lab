/* Anki-style written recall per subject: type the answer, then rate Again/Hard/Good/Easy.
 * Scheduling: FSRS (RecallCore + vendored ts-fsrs). Local-first, included in study backup/sync. */
(function () {
  'use strict';
  const Core = window.RecallCore, KEY = 'study-recall-v1';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const names = {unix:'유닉스 프로그래밍', 'programming-languages':'프로그래밍언어론', 'discrete-math':'이산수학', 'data-centric-ml':'데이터중심머신러닝', 'data-communication':'데이터통신'};
  let db = {version:1, records:{}, days:{}, sessions:{}, settings:{decks:{}}};
  let stored = null, externalChange = false;
  try { stored = localStorage.getItem(KEY); const data = JSON.parse(stored); if (data?.version === 1 && data.records && data.days && data.sessions) db = data; } catch {}
  db.settings ||= {}; db.settings.decks ||= {};
  // Old fixed-interval records keep their due dates and become FSRS review cards (original values kept in record.legacy).
  for (const [id, r] of Object.entries(db.records)) db.records[id] = Core.upgrade(r);
  let root = null, course = '', scope = 'all', deck = 'all', session = null, view = 'plan', lastTick = performance.now(), lastSave = 0;
  const bank = () => window.RECALL_CARDS || [];
  let index = null, indexSize = -1;
  const byId = id => { if (indexSize !== bank().length) { index = new Map(bank().map(c => [c.id, c])); indexSize = bank().length; } return index.get(id); };
  const deckSettings = (key = course) => db.settings.decks[key] || {};
  const schedSettings = (cid = course) => ({retention: deckSettings(cid).retention ?? Core.DEFAULTS.retention});
  function save() {
    if (window.__studyApplyingCloud) return true;
    let current;
    try { current = localStorage.getItem(KEY); }
    catch { window.StudyTools?.notice('이 브라우저에서는 복습 기록을 저장할 수 없습니다. 저장 권한을 확인하세요.'); return false; }
    if (externalChange || current !== stored) {
      externalChange = true;
      if (session) session.running = false;
      window.StudyTools?.notice('다른 탭에서 복습 기록이 바뀌었습니다. 덮어쓰지 않고 멈췄어요. 새로고침해 이어가세요.');
      return false;
    }
    try { const next = JSON.stringify(db); localStorage.setItem(KEY, next); stored = next; return true; }
    catch { window.StudyTools?.notice('복습 기록을 저장하지 못했습니다. 전체 백업 후 저장 공간을 확인하세요.'); return false; }
  }
  function day(cid = course) {
    const key = Core.dayKey();
    db.days[key] ||= {};
    const d = db.days[key][cid] ||= {seconds:0, attempts:0, correct:0, newIds:[]};
    d.reviewIds ||= [];
    return d;
  }
  const sessionKey = () => `${Core.dayKey()}:${course}:${scope}:${deck}`;
  function eligible(cid = course, selectedScope = scope) {
    const list = bank().filter(c => c.course === cid);
    const ranges = selectedScope === 'all' ? null : window.StudyLibrary?.scope(cid, selectedScope);
    return window.PlannerCore.eligible(list, ranges, window.StudyPlanner?.learned(cid) || {});
  }
  const cards = () => eligible().filter(c => deck === 'all' || Core.chapterOf(c) === deck);
  const planFor = (list, cid = course) => Core.plan(list, db.records, day(cid), Date.now(), {course: cid, settings: db.settings, chapterOfId: id => byId(id) ? Core.chapterOf(byId(id)) : ''});
  const todayPlan = () => planFor(cards());
  function chapterTitle(id) {
    const ch = (window.COURSE_CHAPTERS || []).find(c => c.id === id);
    if (ch) return ch.title;
    const m = String(id).match(/^unix-(w\d+)$/);
    return m ? `유닉스 ${m[1]}` : id;
  }
  function decks() {
    const seen = [];
    for (const c of bank()) if (c.course === course && !seen.includes(Core.chapterOf(c))) seen.push(Core.chapterOf(c));
    return seen;
  }
  function clock(seconds) {
    const n = Math.max(0, Math.ceil(seconds));
    return `${String(Math.floor(n / 60)).padStart(2,'0')}:${String(n % 60).padStart(2,'0')}`;
  }
  const source = c => c.course === 'unix' ? `#${c.src[0].slice(5)}/${c.src[1]}/learn` : `#/course/${encodeURIComponent(c.course)}/textbook/${encodeURIComponent(c.src[0])}/${c.src[1]}`;
  const active = () => root?.isConnected && $('#st-tools')?.open && view === 'session' && session?.running && !document.hidden && document.hasFocus();
  function tick() {
    const now = performance.now(), delta = Math.max(0, (now - lastTick) / 1000);
    lastTick = now;
    if (session && session.date !== Core.dayKey()) {
      session.running = false; save(); view = 'plan'; session = null;
      if (root?.isConnected) render();
      return;
    }
    // A suspended computer or a hidden window is never treated as study time.
    if (active() && delta < 2.5) {
      day().seconds += delta;
      session.seconds += delta;
      if (!session.feedback) session.cardSeconds = (session.cardSeconds || 0) + delta;
      if (now - lastSave > 5000) { save(); lastSave = now; }
    }
    const timer = root && $('#rc-time', root);
    if (timer) timer.textContent = day().seconds >= 900 ? `+${clock(day().seconds - 900)}` : clock(900 - day().seconds);
    const progress = root && $('#rc-time-progress', root);
    if (progress) progress.value = Math.min(900, day().seconds);
    const reached = root && $('#rc-time-reached', root);
    if (reached) reached.hidden = day().seconds < 900;
    // A learning card that becomes due while waiting is shown without a manual refresh.
    if (view === 'session' && session && !session.currentId && !session.feedback && root?.isConnected && todayPlan().selected.length) render();
  }
  function leave() {
    tick();
    if (session?.running) { session.running = false; save(); }
    if ($('#st-tools')) delete $('#st-tools').dataset.recallRunning;
  }
  function mount(target, options) {
    leave(); root = target; course = options.course; scope = options.scope;
    const chosen = db.settings.lastDeck?.[course];
    deck = chosen && decks().includes(chosen) ? chosen : 'all';
    session = db.sessions[sessionKey()] || null;
    if (session) {
      session.running = false;
      if (session.currentId && !cards().some(c => c.id === session.currentId)) { session.currentId = null; session.draft = ''; session.feedback = null; }
    }
    view = 'plan'; lastTick = performance.now(); render();
    const modal = $('#st-tools');
    if (modal && !modal.dataset.recallCloseBound) {
      modal.dataset.recallCloseBound = 'true';
      modal.addEventListener('close', leave);
    }
  }
  function setMode(running) {
    const modal = $('#st-tools');
    if (modal) {
      modal.dataset.recallRunning = String(running);
      $('#st-title', modal).textContent = running ? '카드 복습' : '학습 도구';
    }
  }
  function render() {
    if (!root?.isConnected) return;
    setMode(view === 'session');
    if (view === 'session') renderSession();
    else if (view === 'result') renderResult();
    else if (view === 'stats') renderStats();
    else renderPlan();
  }
  function help() {
    return `<details class="rc-help"><summary>복습 방법과 일정</summary><p>단답형·빈칸에 직접 답합니다. 정답은 제출하거나 ‘기억 안 남’을 누른 뒤에만 나옵니다. 용어의 띄어쓰기·등록된 동의어는 허용하지만 숫자·부호·명령의 대소문자는 함부로 바꾸지 않습니다.</p><p>답을 확인한 뒤 <b>다시 · 어려움 · 보통 · 쉬움</b> 중 하나를 고릅니다. 틀렸으면 ‘다시’, 맞혔으면 ‘보통’이 미리 선택되어 있습니다. 버튼 아래 시간이 다음 복습 시점입니다. 키보드 1~4로도 고를 수 있습니다.</p><p>일정은 Anki가 쓰는 것과 같은 FSRS 알고리즘(ts-fsrs, MIT)으로 정합니다. 목표 기억률(기본 90%)에 맞춰 다음 복습 때 기억할 확률이 그 값이 되는 날로 잡습니다. 새 카드와 틀린 카드는 1분·10분 뒤 같은 날 다시 확인합니다. 아직 내 기록으로 매개변수를 최적화하지 않은 기본값을 씁니다.</p><p>15분은 하루 목표 시간입니다. 넘겨도 계속할 수 있고, 다른 탭·창과 일시정지 시간은 세지 않습니다. 기존 시험 기록과 이전 복습 일정은 그대로 이어집니다.</p></details>`;
  }
  function deckOptions() {
    const list = decks();
    if (list.length < 2) return '';
    return `<label class="rc-deck">덱<select id="rc-deck"><option value="all" ${deck==='all'?'selected':''}>${esc(names[course]||course)} 전체</option>${list.map(id => `<option value="${esc(id)}" ${deck===id?'selected':''}>${esc(chapterTitle(id))}</option>`).join('')}</select></label>`;
  }
  function settingsForm() {
    const c = deckSettings(course), dk = deck === 'all' ? null : deckSettings(course + '/' + deck);
    const ret = Math.round((c.retention ?? Core.DEFAULTS.retention) * 100);
    const field = (name, label, value, placeholder) => `<label>${label}<input name="${name}" type="number" inputmode="numeric" min="0" max="9999" value="${value ?? ''}" placeholder="${placeholder}"></label>`;
    return `<details class="rc-settings"><summary>덱 설정 · 목표 기억률 ${ret}%</summary><form id="rc-settings-form"><label>목표 기억률<select name="retention">${[80,85,88,90,92,95].map(v => `<option value="${v/100}" ${v===ret?'selected':''}>${v}%${v===90?' (기본)':''}</option>`).join('')}</select></label>${field('newPerDay', `${esc(names[course]||course)} · 하루 새 카드`, c.newPerDay, Core.DEFAULTS.newPerDay)}${field('reviewsPerDay', `${esc(names[course]||course)} · 하루 복습 한도`, c.reviewsPerDay, Core.DEFAULTS.reviewsPerDay)}${dk ? field('deckNew', `${esc(chapterTitle(deck))} · 하루 새 카드(비우면 과목 한도만)`, dk.newPerDay, '') : ''}<p class="rc-caption">목표 기억률을 높이면 더 자주 복습합니다. 바꾼 값은 다음 평가부터 적용됩니다.</p><button class="rc-text-button" type="submit">설정 저장</button></form></details>`;
  }
  function renderPlan() {
    const p = todayPlan(), d = day();
    const resumable = session && !session.finished && (session.feedback || session.currentId);
    const total = p.learn.length + p.review.length + p.newToday.length;
    const later = p.laterLearn.length;
    root.innerHTML = `<section class="rc-plan rc-shell"><p class="rc-eyebrow">매일 조금씩, 기억을 꺼내는 시간</p><h3>${esc(names[course] || course)}<br><span>오늘의 카드</span></h3>${deckOptions()}<div class="rc-plan-stats rc-counts"><div class="rc-c-new"><strong>${p.newToday.length}</strong><span>새 카드</span></div><div class="rc-c-learn"><strong>${p.learn.length + later}</strong><span>학습 중</span></div><div class="rc-c-review"><strong>${p.review.length}</strong><span>복습</span></div></div><p class="rc-time-line">오늘 공부한 시간 <b>${clock(d.seconds)}</b> · 목표 15분</p><progress class="rc-progress" max="900" value="${Math.min(900,d.seconds)}" aria-label="오늘의 15분 목표"></progress>${eligible().length ? `<button class="rc-primary" id="rc-start" ${!resumable && !total && !p.nextLearn?'disabled':''}>${resumable?'이어서 복습하기':total||p.nextLearn?'복습 시작':'오늘 예정된 카드를 마쳤어요'}</button>` : '<p class="rc-empty">아직 카드가 없습니다. 아래 배운 범위와 시험범위를 설정해 주세요.</p>'}<p class="rc-caption">${total ? '학습 중인 카드 → 복습 → 새 카드 순서로 나옵니다.' : later ? `학습 중인 카드 ${later}장은 정해진 시간이 지나면 다시 나옵니다.` : p.reviewAll.length > p.review.length ? '오늘 복습 한도에 도달했습니다. 덱 설정에서 한도를 늘릴 수 있습니다.' : p.fresh.length && !p.newToday.length ? '오늘 새 카드 한도를 채웠습니다.' : '배운 범위 안의 카드를 일정에 따라 복습합니다.'}</p><div class="rc-plan-links"><button class="rc-text-button" id="rc-stats">통계 보기</button></div>${settingsForm()}${help()}</section>`;
    const start = $('#rc-start', root);
    if (start) start.onclick = () => {
      if (!resumable) create();
      else { session.running = true; session.finished = false; }
      view = 'session'; lastTick = performance.now(); save(); render();
    };
    const sel = $('#rc-deck', root);
    if (sel) sel.onchange = () => { deck = sel.value; db.settings.lastDeck ||= {}; db.settings.lastDeck[course] = deck; session = db.sessions[sessionKey()] || null; save(); render(); };
    $('#rc-stats', root).onclick = () => { view = 'stats'; render(); };
    $('#rc-settings-form', root).onsubmit = ev => {
      ev.preventDefault();
      const f = new FormData(ev.target), num = v => { const s = String(v ?? '').trim(); if (!s) return undefined; const n = Math.floor(Number(s)); return Number.isFinite(n) && n >= 0 && n <= 9999 ? n : undefined; };
      const c = db.settings.decks[course] ||= {};
      c.retention = Core.clampRetention(f.get('retention'));
      c.newPerDay = num(f.get('newPerDay')); c.reviewsPerDay = num(f.get('reviewsPerDay'));
      if (deck !== 'all') { const dk = db.settings.decks[course + '/' + deck] ||= {}; dk.newPerDay = num(f.get('deckNew')); }
      if (session?.feedback) session.feedback.preview = null; // re-preview with the new retention
      save(); render();
    };
    root.insertAdjacentHTML('beforeend', window.StudyPlanner?.learnedForm(course) || '');
    if (scope !== 'all') { const link = document.createElement('a'); link.className = 'rc-text-button'; link.href = '#/course/' + encodeURIComponent(course) + '/exams'; link.textContent = '시험범위 설정'; link.onclick = () => $('#st-tools').close(); root.append(link); }
    window.StudyPlanner?.bindLearned(root, course, () => mount(root, {course, scope}));
  }
  function create() {
    session = {date:Core.dayKey(), course, scope, deck, seconds:0, attempts:0, correct:0, history:[], running:true, draft:'', cardSeconds:0, currentId:null, kind:null};
    db.sessions[sessionKey()] = session;
    // Keep resumable sessions for 14 days, but retain schedules and daily totals.
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 14);
    for (const [key, s] of Object.entries(db.sessions)) if (s.date < Core.dayKey(cutoff)) delete db.sessions[key];
  }
  function pick() {
    if (!session) return null;
    if (session.currentId && (session.feedback || cards().some(c => c.id === session.currentId))) return byId(session.currentId);
    const p = todayPlan();
    // Anki order: due learning cards, then reviews, then new cards; learning cards up to 20 minutes early when nothing else is left.
    const next = p.selected[0] || (p.nextLearn ? {id:p.nextLearn.id, kind:'learn'} : null);
    if (!next) return null;
    session.currentId = next.id; session.kind = next.kind; session.draft = ''; session.cardSeconds = 0;
    save(); return byId(next.id);
  }
  const kindLabel = k => k === 'due' ? '복습' : k === 'learn' ? '학습 중 · 다시 확인' : '새 카드';
  function renderSession() {
    const c = pick();
    if (!c) { finish(); return; }
    const feedback = session.feedback, p = todayPlan();
    root.innerHTML = `<section class="rc-session rc-shell"><div class="rc-session-top"><span>${esc(names[course]||course)}${deck!=='all'?' · '+esc(chapterTitle(deck)):''}</span><div><span id="rc-time" role="timer" aria-live="off">${day().seconds>=900?'+'+clock(day().seconds-900):clock(900-day().seconds)}</span><button class="rc-text-button" id="rc-pause">${session.running?'일시정지':'계속하기'}</button></div></div><progress id="rc-time-progress" class="rc-progress" max="900" value="${Math.min(900,day().seconds)}" aria-label="오늘의 복습 시간"></progress><div class="rc-question-head"><span class="rc-kind rc-k-${session.kind||'new'}">${feedback?'답 확인':kindLabel(session.kind)}</span><span class="rc-remaining" title="새 카드 · 학습 중 · 복습"><b class="rc-n-new">${p.newToday.length}</b> <b class="rc-n-learn">${p.learn.length+p.laterLearn.length}</b> <b class="rc-n-review">${p.review.length}</b></span></div><h3 class="rc-question">${esc(c.q).replace(/___/g,'<span class="rc-blank" aria-label="빈칸">&nbsp;&nbsp;&nbsp;&nbsp;</span>')}</h3>${!session.running?'<p class="rc-paused" role="status">잠시 쉬는 중이에요. 시간도 멈췄습니다.</p>':''}${feedback?feedbackHTML(c,feedback):answerHTML(c)}<p id="rc-time-reached" class="rc-time-reached" ${day().seconds>=900?'':'hidden'}>오늘 목표 15분을 채웠어요. 원하면 계속해도 됩니다.</p><div class="rc-footer"><button class="rc-text-button" id="rc-exit">오늘 학습 정리</button><span>선택지 없이, 내 기억으로</span></div></section>`;
    $('#rc-pause', root).onclick = () => { tick(); session.running = !session.running; lastTick = performance.now(); save(); render(); };
    $('#rc-exit', root).onclick = () => { tick(); finish(); };
    if (!feedback) bindAnswer();
    else bindFeedback(c);
    if (!feedback && session.running) $('#rc-answer', root)?.focus({preventScroll:true});
  }
  function answerHTML(c) {
    return `<form id="rc-answer-form" autocomplete="off"><label for="rc-answer" class="rc-answer-label">${c.type==='cloze'?'빈칸에 들어갈 답':'떠올린 답'}</label><input id="rc-answer" class="rc-answer ${c.mode==='verbatim'?'rc-mono':''}" type="text" value="${esc(session.draft)}" maxlength="500" placeholder="여기에 직접 입력하세요" spellcheck="false" autocorrect="off" autocapitalize="off" ${!session.running?'disabled':''}><div class="rc-actions"><button class="rc-primary" type="submit" id="rc-submit" ${!session.running||!session.draft.trim()?'disabled':''}>답 제출 <span aria-hidden="true">↵</span></button><button class="rc-text-button" id="rc-forgot" type="button" ${!session.running?'disabled':''}>기억 안 남</button></div></form>`;
  }
  function bindAnswer() {
    const input = $('#rc-answer', root);
    input.oninput = () => { session.draft = input.value; $('#rc-submit', root).disabled = !input.value.trim() || !session.running; save(); };
    $('#rc-answer-form', root).onsubmit = ev => { ev.preventDefault(); if (ev.isComposing || !session.running || !session.draft.trim()) return; grade(false); };
    // Enter while composing Korean must finish composition, not submit.
    input.addEventListener('keydown', ev => { if (ev.key === 'Enter' && (ev.isComposing || ev.keyCode === 229)) ev.preventDefault(); });
    $('#rc-forgot', root).onclick = () => { if (session.running) grade(true); };
  }
  function grade(forgot) {
    if (session.feedback) return;
    tick(); const c = byId(session.currentId), ok = !forgot && Core.correct(c, session.draft);
    session.feedback = {id:crypto.randomUUID(), answer:session.draft, correct:ok, forgot, time:Date.now(), seconds:session.cardSeconds, suggested: ok ? 3 : 1, preview:null};
    if (!save()) session.running = false;
    render();
  }
  function previewFor(c, f) {
    if (!f.preview) { f.preview = Core.preview(db.records[c.id], schedSettings(c.course), f.time); save(); }
    return f.preview;
  }
  function feedbackHTML(c, f) {
    let choices;
    try { choices = previewFor(c, f); } catch (e) { return `<p class="rc-empty" role="alert">${esc(e.message)} 새로고침해 주세요.</p>`; }
    return `<div class="rc-feedback ${f.correct?'is-correct':'is-relearn'}" role="status"><p class="rc-feedback-title">${f.correct?(f.manual?'정답으로 정정했어요':'정답이에요'):f.forgot?'기억을 다시 채워요':'답이 달라요'}</p><dl class="rc-comparison"><div><dt>내 답</dt><dd>${esc(f.forgot?'기억 안 남':f.answer)}</dd></div><div><dt>인정 답안</dt><dd>${esc(c.answers[0])}</dd></div></dl><p class="rc-explanation">${esc(c.why)}</p><a id="rc-source" href="${source(c)}">원문 ${c.src[1]}쪽에서 확인 ↗</a>${!f.correct&&!f.forgot?'<button class="rc-text-button rc-correct-manually" id="rc-correct-manually">같은 뜻이에요 · 정답으로 정정</button>':''}</div><p class="rc-rate-title">얼마나 잘 기억했나요?</p><div class="rc-ratings" role="group" aria-label="기억 평가">${choices.map(ch => `<button type="button" class="rc-rate rc-rate-${ch.key} ${ch.rating===f.suggested?'is-suggested':''}" data-rating="${ch.rating}" ${!session.running?'disabled':''}><span class="rc-rate-label">${ch.label}</span><span class="rc-rate-after">${ch.after}</span><kbd>${ch.rating}</kbd></button>`).join('')}</div>`;
  }
  function bindFeedback(c) {
    root.querySelectorAll('.rc-rate').forEach(b => b.onclick = () => rate(c, Number(b.dataset.rating)));
    root.onkeydown = ev => {
      if (!session?.feedback || !session.running || !/^[1-4]$/.test(ev.key) || ev.target.matches?.('input,textarea,select')) return;
      ev.preventDefault(); ev.stopPropagation(); rate(c, Number(ev.key));
    };
    $('.rc-rate.is-suggested', root)?.focus({preventScroll:true});
    $('#rc-source', root).onclick = () => { leave(); $('#st-tools').close(); };
    const correction = $('#rc-correct-manually', root);
    if (correction) correction.onclick = () => { const f = session.feedback; f.correct = true; f.manual = true; f.suggested = 3; save(); render(); };
  }
  function rate(c, rating) {
    const f = session?.feedback;
    if (!f || !session.running) return;
    tick();
    const choice = previewFor(c, f).find(ch => ch.rating === rating);
    if (!choice) return;
    const before = db.records[c.id], prev = Core.stateOf(before), d = day(c.course);
    db.records[c.id] = Core.apply(before, choice, {id:f.id, answer:f.answer, correct:f.correct, manual:f.manual, forgot:f.forgot, seconds:f.seconds}, f.time);
    session.attempts++; d.attempts++;
    if (f.correct) { session.correct++; d.correct++; }
    if (prev === 'new' && !d.newIds.includes(c.id)) d.newIds.push(c.id);
    if (prev === 'review' && !d.reviewIds.includes(c.id)) d.reviewIds.push(c.id);
    session.history.push({id:f.id, cardId:c.id, at:f.time, rating, correct:f.correct, manual:!!f.manual, forgot:f.forgot});
    delete session.feedback; session.currentId = null; session.kind = null; session.draft = ''; session.cardSeconds = 0;
    save(); render();
  }
  function finish() {
    tick(); if (session) { session.running = false; session.finished = !todayPlan().selected.length; save(); }
    view = 'result'; render(); dashboard();
  }
  function renderResult() {
    const p = todayPlan(), d = day(), history = session?.history || [];
    const again = [...new Map(history.filter(a => a.rating === 1).map(a => [a.cardId, a])).values()];
    const left = p.selected.length || p.nextLearn;
    root.innerHTML = `<section class="rc-result rc-shell"><span class="rc-result-mark" aria-hidden="true">✓</span><p class="rc-eyebrow">${esc(names[course]||course)} · 오늘의 기록</p><h3>${left?'잠시 멈췄어요':p.laterLearn.length?'지금 볼 카드는 다 풀었어요':'오늘 예정된 카드를 마쳤어요'}</h3><div class="rc-plan-stats"><div><strong>${clock(d.seconds)}</strong><span>직접 공부한 시간</span></div><div><strong>${d.attempts}</strong><span>평가한 카드</span></div><div><strong>${d.attempts?Math.round(d.correct/d.attempts*100):0}%</strong><span>입력 정답률</span></div></div>${p.laterLearn.length?`<p class="rc-intro">학습 중인 카드 ${p.laterLearn.length}장은 정해진 시간이 지나면 다시 나옵니다(가장 빠른 카드 ${new Date(Core.dueOf(db.records[p.laterLearn[0].id])).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})}).</p>`:'<p class="rc-intro">정답을 읽기만 한 카드는 맞힌 것으로 세지 않습니다. 다음 일정에 맞춰 다시 만나요.</p>'}${again.length?`<details class="rc-result-wrongs"><summary>‘다시’로 평가한 카드 ${again.length}개</summary>${again.map(a => { const c = byId(a.cardId); return c ? `<p>${esc(c.q)}<small>다음 확인 · ${new Date(Core.dueOf(db.records[c.id])).toLocaleString('ko-KR',{month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'})}</small></p>` : ''; }).join('')}</details>`:''}<div class="rc-result-actions">${left?'<button class="rc-primary" id="rc-resume">남은 카드 이어서</button>':''}<button class="rc-text-button" id="rc-stats">통계 보기</button><button class="rc-text-button" id="rc-plan">과목·덱 선택으로</button></div></section>`;
    if ($('#rc-resume', root)) $('#rc-resume', root).onclick = () => { if (!session) create(); session.running = true; session.finished = false; view = 'session'; lastTick = performance.now(); save(); render(); };
    $('#rc-stats', root).onclick = () => { view = 'stats'; render(); };
    $('#rc-plan', root).onclick = () => { view = 'plan'; render(); };
    // When the earliest missed card becomes due while this screen is open, offer to continue.
    clearTimeout(renderResult.timer);
    if (!left && p.laterLearn.length) { const wait = Core.dueOf(db.records[p.laterLearn[0].id]) - Date.now(); if (wait < 3600000) renderResult.timer = setTimeout(() => { if (view === 'result' && root?.isConnected) render(); }, Math.max(1000, wait + 500)); }
  }
  /* ---------- statistics ---------- */
  function stats(cid = course) {
    const all = bank().filter(c => c.course === cid && (deck === 'all' || Core.chapterOf(c) === deck));
    const now = Date.now(), counts = {new:0, learn:0, review:0, leech:0}, forecast = Array(30).fill(0), hard = [];
    const start = new Date(); start.setHours(0, 0, 0, 0);
    let pass = 0, reviews = 0;
    for (const c of all) {
      const r = db.records[c.id], st = Core.stateOf(r);
      counts[st]++;
      if (!r) continue;
      if ((r.lapses || 0) >= Core.DEFAULTS.leech) counts.leech++;
      if ((r.lapses || 0) >= 2) hard.push({c, r});
      const due = Core.dueOf(r), offset = Math.max(0, Math.floor((due - start) / Core.DAY));
      if (offset < 30) forecast[offset]++;
      for (const a of r.history || []) {
        if (now - a.at > 30 * Core.DAY) continue;
        // True retention counts reviews of graduated cards only (not same-day learning steps).
        const review = a.rating ? a.prevState === 'review' : true;
        if (!review) continue;
        reviews++; if (a.rating ? a.rating > 1 : a.correct) pass++;
      }
    }
    hard.sort((a, b) => (b.r.lapses || 0) - (a.r.lapses || 0));
    const days = [];
    for (let i = 104; i >= 0; i--) { const d = new Date(start); d.setDate(d.getDate() - i); const key = Core.dayKey(d); days.push({key, n: db.days[key]?.[cid]?.attempts || 0, dow: d.getDay()}); }
    return {counts, forecast, hard: hard.slice(0, 10), retention: reviews ? pass / reviews : null, reviews, days, total: all.length};
  }
  function renderStats() {
    const s = stats(), target = schedSettings().retention, max = Math.max(1, ...s.forecast), hmax = Math.max(1, ...s.days.map(d => d.n));
    const level = n => n ? Math.min(4, Math.ceil(n / hmax * 4)) : 0;
    const pad = s.days[0].dow; // align the heat map to week columns (Sunday first)
    const studied = s.days.filter(d => d.n).length;
    root.innerHTML = `<section class="rc-stats rc-shell"><p class="rc-eyebrow">${esc(names[course]||course)}${deck!=='all'?' · '+esc(chapterTitle(deck)):''} · 통계</p><h3>기억 상태</h3><div class="rc-plan-stats rc-counts rc-stat-counts"><div class="rc-c-new"><strong>${s.counts.new}</strong><span>새 카드</span></div><div class="rc-c-learn"><strong>${s.counts.learn}</strong><span>학습 중</span></div><div class="rc-c-review"><strong>${s.counts.review}</strong><span>복습 단계</span></div><div class="rc-c-leech"><strong>${s.counts.leech}</strong><span>어려운 카드</span></div></div><section class="rc-stat-block"><h4>실제 기억률 <small>최근 30일 복습 기준</small></h4>${s.retention===null?'<p class="rc-caption">아직 복습 단계 카드의 평가 기록이 없습니다.</p>':`<p class="rc-retention"><b>${Math.round(s.retention*100)}%</b> <span>목표 ${Math.round(target*100)}% · 평가 ${s.reviews}회</span></p><p class="rc-caption">${s.reviews<30?'평가 횟수가 적어 아직 참고용입니다. ':''}‘다시’가 아닌 평가를 기억한 것으로 셉니다.</p>`}</section><section class="rc-stat-block"><h4>복습 기록 <small>최근 15주 · ${studied}일 공부</small></h4><div class="rc-heat" role="img" aria-label="최근 15주 날짜별 평가 수">${Array(pad).fill('<i class="rc-h-pad"></i>').join('')}${s.days.map(d => `<i class="rc-h${level(d.n)}" title="${d.key} · ${d.n}장"></i>`).join('')}</div></section><section class="rc-stat-block"><h4>앞으로 30일 복습 예정 <small>오늘 ${s.forecast[0]}장</small></h4><div class="rc-forecast" role="img" aria-label="날짜별 복습 예정 카드 수">${s.forecast.map((n, i) => `<span style="--h:${Math.round(n/max*100)}%" title="${i===0?'오늘':i+'일 뒤'} · ${n}장"></span>`).join('')}</div><div class="rc-forecast-axis"><span>오늘</span><span>15일</span><span>30일</span></div></section><section class="rc-stat-block"><h4>자주 틀리는 카드 <small>‘다시’ 2회 이상 · ${Core.DEFAULTS.leech}회 이상은 어려운 카드</small></h4>${s.hard.length?`<ul class="rc-hard">${s.hard.map(({c, r}) => `<li><a href="${source(c)}" class="rc-hard-link">${esc(c.q)}</a><span>${r.lapses}회${r.lapses>=Core.DEFAULTS.leech?' · 어려운 카드':''}</span></li>`).join('')}</ul>`:'<p class="rc-caption">아직 자주 틀리는 카드가 없습니다.</p>'}</section><button class="rc-text-button" id="rc-plan">← 오늘의 카드로</button></section>`;
    $('#rc-plan', root).onclick = () => { view = 'plan'; render(); };
    root.querySelectorAll('.rc-hard-link').forEach(a => a.onclick = () => { leave(); $('#st-tools').close(); });
  }
  function dashboard() {
    document.querySelectorAll('.cv-card').forEach(host => {
      const href = host.querySelector('a')?.getAttribute('href') || '';
      const cid = href.startsWith('#w') ? 'unix' : decodeURIComponent(href.match(/^#\/course\/([^/]+)/)?.[1] || '');
      if (!cid || !bank().some(c => c.course === cid)) return;
      let button = $('.rc-home-start', host);
      if (!button) { button = document.createElement('button'); button.type = 'button'; button.className = 'rc-home-start'; host.append(button); button.onclick = () => window.StudyTools.open('cards', cid); }
      const s = summary(cid, 'final'), due = s?.due || 0;
      const text = `카드 ${Math.floor(day(cid).seconds / 60)} / 15분 · ${due ? '복습 ' + due + '장' : s?.fresh ? '새 카드 ' + s.fresh + '장' : '오늘 카드 시작'} →`;
      if (button.textContent !== text) button.textContent = text;
    });
  }
  document.addEventListener('visibilitychange', () => { lastTick = performance.now(); });
  window.addEventListener('storage', event => {
    if (event.key !== KEY || event.newValue === stored) return;
    externalChange = true;
    if (session) session.running = false;
    if (root?.isConnected && $('#st-tools')?.open) {
      window.StudyTools?.notice('다른 탭에서 복습 기록이 바뀌었습니다. 새로고침 후 이어가세요.');
      render();
    }
  });
  window.addEventListener('blur', () => { lastTick = performance.now(); });
  window.addEventListener('focus', () => { lastTick = performance.now(); });
  window.addEventListener('pagehide', leave);
  setInterval(() => { tick(); if (session?.running && !root?.isConnected) leave(); }, 1000);
  // Used by the planner and home cards: counts for today, or the stored totals of a past day.
  function summary(cid, selectedScope = 'final', date = Core.dayKey()) {
    const list = bank().filter(c => c.course === cid);
    if (!list.length) return null;
    if (date !== Core.dayKey()) { const d = db.days[date]?.[cid]; return d?.attempts ? {due:0, fresh:0, selected:0, remaining:0, attempts:d.attempts, seconds:d.seconds} : null; }
    const allowed = eligible(cid, selectedScope), daily = day(cid), p = planFor(allowed, cid);
    const pending = Object.values(db.sessions).some(s => s.date === Core.dayKey() && s.course === cid && !s.finished && s.currentId);
    return {due:p.due.length + p.laterLearn.length, fresh:p.newToday.length, selected:p.selected.length + Number(pending && !p.selected.length), remaining:p.remaining, attempts:daily.attempts, seconds:daily.seconds};
  }
  window.RecallPractice = {mount, leave, dashboard, summary};
})();
