/* Fifteen minutes per subject: written retrieval, local-first, included in study sync. */
(function () {
  'use strict';
  const Core = window.RecallCore, KEY = 'study-recall-v1';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const names = {unix:'유닉스 프로그래밍', 'programming-languages':'프로그래밍언어론', 'discrete-math':'이산수학', 'data-communication':'데이터통신'};
  let db = {version:1, records:{}, days:{}, sessions:{}};
  let stored = null, externalChange = false;
  try { stored = localStorage.getItem(KEY); const data = JSON.parse(stored); if (data?.version === 1 && data.records && data.days && data.sessions) db = data; } catch {}
  let root = null, course = '', scope = 'all', session = null, view = 'plan', lastTick = performance.now(), lastSave = 0;
  const bank = () => window.RECALL_CARDS || [];
  const byId = id => bank().find(c => c.id === id);
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
    return db.days[key][cid] ||= {seconds:0, attempts:0, correct:0, newIds:[]};
  }
  const sessionKey = () => `${Core.dayKey()}:${course}:${scope}`;
  function cards() {
    const list = bank().filter(c => c.course === course);
    const ranges = scope === 'all' ? null : window.StudyLibrary?.scope(course, scope);
    return window.PlannerCore.eligible(list, db.records, ranges, window.StudyPlanner?.learned(course)||{});
  }
  const todayPlan = () => Core.plan(cards(), db.records, day());
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
    if (timer) timer.textContent = clock(900 - day().seconds);
    const progress = root && $('#rc-time-progress', root);
    if (progress) progress.value = Math.min(900, day().seconds);
    const reached = root && $('#rc-time-reached', root);
    if (reached) reached.hidden = day().seconds < 900;
    const next = root && $('#rc-next', root);
    if (next && day().seconds >= 900) next.textContent = '오늘 마치기';
  }
  function leave() {
    tick();
    if (session?.running) { session.running = false; save(); }
    if ($('#st-tools')) delete $('#st-tools').dataset.recallRunning;
  }
  function mount(target, options) {
    leave(); root = target; course = options.course; scope = options.scope;
    session = db.sessions[sessionKey()] || null;
    if (session) {
      session.running = false;
      const allowed = new Set(cards().map(c=>c.id));
      session.queue = (session.queue||[]).filter(item=>allowed.has(item.id));
      if(session.currentId&&!allowed.has(session.currentId)){session.currentId=null;session.draft='';session.feedback=null;}
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
      $('#st-title', modal).textContent = running ? '15분 인출 복습' : '학습 도구';
    }
  }
  function render() {
    if (!root?.isConnected) return;
    setMode(view === 'session');
    if (view === 'session') renderSession();
    else if (view === 'result') renderResult();
    else renderPlan();
  }
  function help() {
    return `<details class="rc-help"><summary>복습 방법과 기록</summary><p>단답형·빈칸에 직접 답합니다. 정답은 제출하거나 ‘기억 안 남’을 누른 뒤에만 나옵니다. 용어의 띄어쓰기·등록된 동의어는 허용하지만 숫자·부호·명령의 대소문자는 함부로 바꾸지 않습니다.</p><p>초기 간격은 1·3·7·14·30일이며 정답과 확신도에 따라 조정합니다. 같은 날 다시 맞힌 것만으로 간격을 계속 늘리지는 않습니다. 느린 답변 자체는 감점하지 않습니다.</p><p>과목별 하루 목표는 15분입니다. 다른 탭·창과 일시정지 시간은 제외하며 브라우저를 닫으면 멈춥니다. 예정된 카드가 적으면 일찍 마쳐도 됩니다. 기존 시험 기록은 유지하고 이 쓰기 복습의 일정은 별도로 저장합니다.</p></details>`;
  }
  function renderPlan() {
    const p = todayPlan(), d = day(), resumable = session && !session.finished && day().seconds<900 && (session.feedback || session.queue?.some(item=>item.after<=session.attempts));
    root.innerHTML = `<section class="rc-plan rc-shell"><p class="rc-eyebrow">매일 조금씩, 기억을 꺼내는 시간</p><h3>${esc(names[course] || course)}<br><span>오늘의 15분</span></h3><p class="rc-intro">답을 고르지 않고, 직접 떠올려 적어 보세요.</p><div class="rc-plan-stats"><div><strong>${p.due.length}</strong><span>복습할 카드</span></div><div><strong>${p.selected.filter(c=>c.kind==='new').length}</strong><span>새 카드 · 최대</span></div><div><strong>${clock(d.seconds)}</strong><span>오늘 공부한 시간</span></div></div><progress class="rc-progress" max="900" value="${Math.min(900,d.seconds)}" aria-label="오늘의 15분 목표"></progress>${cards().length ? `<button class="rc-primary" id="rc-start" ${!resumable && !p.selected.length?'disabled':''}>${resumable?'이어서 복습하기':d.seconds>=900?'오늘 목표를 채웠어요':p.selected.length?'오늘 복습 시작':'오늘 예정된 복습을 마쳤어요'}</button>` : '<p class="rc-empty">새 카드가 없습니다. 배운 범위와 시험범위를 설정해 주세요.</p>'}${p.due.length ? `<p class="rc-caption">복습 기한이 지난 카드부터 시작하고, 시간이 남으면 새 카드를 조금씩 더해요.</p>` : p.fresh.length ? '<p class="rc-caption">처음에는 새 카드 3장으로 가볍게 시작해요.</p>' : '<p class="rc-caption">배운 범위 안에서 새 카드를 추가합니다. 이전에 공부한 카드는 복습 일정에 따라 함께 나옵니다.</p>'}${!p.selected.length && !p.due.length && p.fresh.length && d.seconds<900 ? '<button class="rc-text-button" id="rc-extra">새 카드 3장 더 공부하기</button>' : ''}${help()}</section>`;
    const start = $('#rc-start',root);
    if (start) start.onclick = () => {
      if (!resumable) create(p.selected);
      else { session.running = true; session.finished = false; }
      view = 'session'; lastTick = performance.now(); save(); render();
    };
    if ($('#rc-extra',root)) $('#rc-extra',root).onclick = extra;
    root.insertAdjacentHTML('beforeend',window.StudyPlanner?.learnedForm(course)||'');
    if(scope!=='all'){const link=document.createElement('a');link.className='rc-text-button';link.href='#/course/'+encodeURIComponent(course)+'/exams';link.textContent='시험범위 설정';link.onclick=()=>$('#st-tools').close();root.append(link);}
    window.StudyPlanner?.bindLearned(root,course,()=>mount(root,{course,scope}));
  }
  function create(queue) {
    session = {date:Core.dayKey(), course, scope, queue:structuredClone(queue), seconds:0, attempts:0, correct:0, repeats:{}, history:[], running:true, draft:'', confidence:'sure', cardSeconds:0};
    db.sessions[sessionKey()] = session;
    // Keep resumable sessions for 14 days, but retain schedules and daily totals.
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate()-14);
    for (const [key,s] of Object.entries(db.sessions)) if (s.date<Core.dayKey(cutoff)) delete db.sessions[key];
  }
  function extra() {
    const p = todayPlan();
    if (p.due.length || day().seconds >= 900) return;
    const queue = p.fresh.slice(0,3).map(c=>({id:c.id,kind:'new',after:0}));
    if (!queue.length) return;
    if (session) { session.queue.push(...queue); session.finished=false; session.running=true; }
    else create(queue);
    view='session'; lastTick=performance.now(); save(); render();
  }
  function pick() {
    if (!session) return null;
    if (session.feedback) return byId(session.currentId);
    if (session.currentId && session.queue.some(c=>c.id===session.currentId)) return byId(session.currentId);
    const index = session.queue.findIndex(c=>c.after<=session.attempts && byId(c.id));
    if (index<0) return null;
    const item=session.queue.splice(index,1)[0]; session.queue.unshift(item);
    session.currentId=item.id; session.draft=''; session.confidence='sure'; session.cardSeconds=0;
    save(); return byId(item.id);
  }
  function renderSession() {
    const c = pick();
    if (!c) { finish(); return; }
    const feedback=session.feedback, kind=session.queue[0]?.kind;
    root.innerHTML=`<section class="rc-session rc-shell"><div class="rc-session-top"><span>${esc(names[course]||course)}</span><div><span id="rc-time" role="timer" aria-live="off">${clock(900-day().seconds)}</span><button class="rc-text-button" id="rc-pause">${session.running?'일시정지':'계속하기'}</button></div></div><progress id="rc-time-progress" class="rc-progress" max="900" value="${Math.min(900,day().seconds)}" aria-label="오늘의 복습 시간"></progress><div class="rc-question-head"><span class="rc-kind">${feedback?'답 확인':kind==='due'?'기억 되살리기':kind==='retry'?'한 번 더 떠올리기':'새로운 기억'}</span><span>${session.attempts+(feedback?0:1)}번째 카드</span></div><h3 class="rc-question">${esc(c.q).replace(/___/g,'<span class="rc-blank" aria-label="빈칸">&nbsp;&nbsp;&nbsp;&nbsp;</span>')}</h3>${!session.running?'<p class="rc-paused" role="status">잠시 쉬는 중이에요. 시간도 멈췄습니다.</p>':''}${feedback?feedbackHTML(c,feedback):answerHTML(c)}<p id="rc-time-reached" class="rc-time-reached" ${day().seconds>=900?'':'hidden'}>오늘 15분을 채웠어요. 이 카드까지 확인하고 마치면 됩니다.</p><div class="rc-footer"><button class="rc-text-button" id="rc-exit">오늘 학습 정리</button><span>선택지 없이, 내 기억으로</span></div></section>`;
    $('#rc-pause',root).onclick=()=>{tick();session.running=!session.running;lastTick=performance.now();save();render();};
    $('#rc-exit',root).onclick=()=>{tick();if(session.feedback)advance(false);finish();};
    if (!feedback) bindAnswer();
    else bindFeedback(c);
    if (!feedback && session.running) $('#rc-answer',root)?.focus({preventScroll:true});
  }
  function answerHTML(c) {
    return `<form id="rc-answer-form" autocomplete="off"><label for="rc-answer" class="rc-answer-label">${c.type==='cloze'?'빈칸에 들어갈 답':'떠올린 답'}</label><input id="rc-answer" class="rc-answer ${c.mode==='verbatim'?'rc-mono':''}" type="text" value="${esc(session.draft)}" maxlength="500" placeholder="여기에 직접 입력하세요" spellcheck="false" autocorrect="off" autocapitalize="off" ${!session.running?'disabled':''}><fieldset class="rc-confidence" ${!session.running?'disabled':''}><legend>지금 기억은 어떤가요?</legend><label><input type="radio" name="rc-confidence" value="sure" ${session.confidence==='sure'?'checked':''}> 확실하게 떠올랐어요</label><label><input type="radio" name="rc-confidence" value="unsure" ${session.confidence==='unsure'?'checked':''}> 조금 헷갈려요</label></fieldset><div class="rc-actions"><button class="rc-primary" type="submit" id="rc-submit" ${!session.running||!session.draft.trim()?'disabled':''}>답 제출 <span aria-hidden="true">↵</span></button><button class="rc-text-button" id="rc-forgot" type="button" ${!session.running?'disabled':''}>기억 안 남</button></div></form>`;
  }
  function bindAnswer() {
    const input=$('#rc-answer',root);
    input.oninput=()=>{session.draft=input.value;$('#rc-submit',root).disabled=!input.value.trim()||!session.running;save();};
    root.querySelectorAll('[name=rc-confidence]').forEach(i=>i.onchange=()=>{session.confidence=i.value;save();});
    $('#rc-answer-form',root).onsubmit=ev=>{ev.preventDefault();if(ev.isComposing||!session.running||!session.draft.trim())return;grade(false);};
    // Enter while composing Korean must finish composition, not submit.
    input.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&(ev.isComposing||ev.keyCode===229))ev.preventDefault();});
    $('#rc-forgot',root).onclick=()=>{if(session.running)grade(true);};
  }
  function grade(forgot) {
    if(session.feedback)return;
    tick(); const c=byId(session.currentId),ok=!forgot&&Core.correct(c,session.draft);
    const before=structuredClone(db.records[c.id]||{}),time=Date.now();
    const feedback={id:crypto.randomUUID(),answer:session.draft,correct:ok,forgot,confidence:session.confidence,before,time,seconds:session.cardSeconds};
    session.feedback=feedback; session.attempts++; day().attempts++;
    if(!day().newIds.includes(c.id)&&!before.attempts)day().newIds.push(c.id);
    updateGrade(c,feedback,false);
    if(!save()){session.running=false;}
    render();
  }
  function updateGrade(c,f,replacing) {
    if(replacing) { if(f.oldCorrect){session.correct--;day().correct--;} }
    if(f.correct){session.correct++;day().correct++;}
    const record=Core.review(f.before,f.correct,f.confidence,f.time);
    record.meanSeconds=f.before.meanSeconds?f.before.meanSeconds*0.7+Math.max(1,f.seconds)*0.3:Math.max(1,f.seconds);
    const attempt={id:f.id,at:f.time,answer:f.answer,correct:f.correct,manual:!!f.manual,forgot:f.forgot,confidence:f.confidence,seconds:f.seconds};
    record.history=[...(f.before.history||[]),attempt].slice(-20);
    db.records[c.id]=record;
    const history=session.history.filter(x=>x.id!==f.id);history.push({...attempt,cardId:c.id});session.history=history;
  }
  function feedbackHTML(c,f) {
    const due=new Date(db.records[c.id].due).toLocaleDateString('ko-KR',{month:'long',day:'numeric'});
    return `<div class="rc-feedback ${f.correct?'is-correct':'is-relearn'}" role="status"><p class="rc-feedback-title">${f.correct?(f.manual?'정답으로 정정했어요':'정답이에요'):'기억을 다시 채워요'}</p><dl class="rc-comparison"><div><dt>내 답</dt><dd>${esc(f.forgot?'기억 안 남':f.answer)}</dd></div><div><dt>인정 답안</dt><dd>${esc(c.answers[0])}</dd></div></dl><p class="rc-explanation">${esc(c.why)}</p><a id="rc-source" href="${source(c)}">원문 ${c.src[1]}쪽에서 확인 ↗</a>${!f.correct&&!f.forgot?'<button class="rc-text-button rc-correct-manually" id="rc-correct-manually">같은 뜻이에요 · 정답으로 정정</button>':''}<p class="rc-next-date">다음 복습 · ${due}${f.correct&&f.confidence==='unsure'?' · 헷갈린 카드는 짧은 간격으로':''}</p></div><button class="rc-primary" id="rc-next" ${!session.running?'disabled':''}>${day().seconds>=900?'오늘 마치기':'다음 카드'} <span aria-hidden="true">→</span></button>`;
  }
  function bindFeedback(c) {
    $('#rc-next',root).onclick=()=>{if(!session.running)return;tick();advance();};
    $('#rc-source',root).onclick=()=>{leave();$('#st-tools').close();};
    const correction=$('#rc-correct-manually',root);
    if(correction)correction.onclick=()=>{const f=session.feedback;f.oldCorrect=f.correct;f.correct=true;f.manual=true;f.confidence='unsure';updateGrade(c,f,true);save();render();};
  }
  function advance(draw=true) {
    const f=session.feedback;
    if(!f)return;
    const current=session.queue.shift();
    if(!f.correct&&(session.repeats[current.id]||0)<2){session.repeats[current.id]=(session.repeats[current.id]||0)+1;session.queue.push({id:current.id,kind:'retry',after:session.attempts+2});}
    delete session.feedback;delete session.currentId;session.draft='';session.cardSeconds=0;
    save();
    if(draw){if(day().seconds>=900)finish();else render();}
  }
  function finish() {
    tick(); if(session){session.running=false;session.finished=!session.queue.length||day().seconds>=900;save();}
    view='result';render();dashboard();
  }
  function renderResult() {
    const p=todayPlan(),d=day(),history=session?.history||[],wrong=[...new Map(history.filter(a=>!a.correct).map(a=>[a.cardId,a])).values()];
    const resumable=session?.queue.some(item=>item.after<=session.attempts)&&d.seconds<900;
    root.innerHTML=`<section class="rc-result rc-shell"><span class="rc-result-mark" aria-hidden="true">✓</span><p class="rc-eyebrow">${esc(names[course]||course)} · 오늘의 기록</p><h3>${d.seconds>=900?'오늘의 15분을 채웠어요':'짧게라도, 한 번 더 기억했어요'}</h3><div class="rc-plan-stats"><div><strong>${clock(d.seconds)}</strong><span>직접 공부한 시간</span></div><div><strong>${d.correct}</strong><span>정답으로 확인</span></div><div><strong>${wrong.length}</strong><span>이번에 다시 볼 답</span></div></div><p class="rc-intro">정답을 읽기만 한 카드는 맞힌 것으로 세지 않습니다. 다음 일정에 맞춰 다시 만나요.</p>${wrong.length?`<details class="rc-result-wrongs"><summary>이번에 기억나지 않았던 카드 ${wrong.length}개</summary>${wrong.map(a=>{const c=byId(a.cardId);return c?`<p>${esc(c.q)}<small>다음 복습 · ${new Date(db.records[c.id].due).toLocaleDateString('ko-KR',{month:'long',day:'numeric'})}</small></p>`:'';}).join('')}</details>`:''}<div class="rc-result-actions">${resumable?'<button class="rc-primary" id="rc-resume">남은 카드 이어서</button>':''}${!p.due.length&&p.fresh.length&&d.seconds<900?'<button class="rc-text-button" id="rc-extra">원하면 새 카드 3장 더</button>':''}<button class="rc-text-button" id="rc-plan">과목·범위 선택으로</button></div></section>`;
    if($('#rc-resume',root))$('#rc-resume',root).onclick=()=>{session.running=true;view='session';lastTick=performance.now();save();render();};
    if($('#rc-extra',root))$('#rc-extra',root).onclick=extra;
    $('#rc-plan',root).onclick=()=>{view='plan';render();};
  }
  function dashboard() {
    document.querySelectorAll('.cv-card').forEach(host=>{
      const href=host.querySelector('a')?.getAttribute('href')||'';
      const cid=href.startsWith('#w')?'unix':decodeURIComponent(href.match(/^#\/course\/([^/]+)/)?.[1]||'');
      if(!cid||!bank().some(c=>c.course===cid))return;
      let button=$('.rc-home-start',host);
      if(!button){button=document.createElement('button');button.type='button';button.className='rc-home-start';host.append(button);button.onclick=()=>window.StudyTools.open('cards',cid);}
      const due=bank().filter(c=>c.course===cid&&db.records[c.id]?.due<=Date.now()).length;
      const text=`${Math.floor(day(cid).seconds/60)} / 15분 · ${due?'복습 '+due+'장':'오늘 카드 시작'} →`;
      if(button.textContent!==text)button.textContent=text;
    });
  }
  document.addEventListener('visibilitychange',()=>{lastTick=performance.now();});
  window.addEventListener('storage',event=>{
    if(event.key!==KEY || event.newValue===stored)return;
    externalChange=true;
    if(session)session.running=false;
    if(root?.isConnected && $('#st-tools')?.open){
      window.StudyTools?.notice('다른 탭에서 복습 기록이 바뀌었습니다. 새로고침 후 이어가세요.');
      render();
    }
  });
  window.addEventListener('blur',()=>{lastTick=performance.now();});
  window.addEventListener('focus',()=>{lastTick=performance.now();});
  window.addEventListener('pagehide',leave);
  setInterval(()=>{tick();if(session?.running&&!root?.isConnected)leave();},1000);
  function summary(cid,selectedScope='final',date=Core.dayKey()) {
    const records=db.records,list=bank().filter(c=>c.course===cid);
    if(!list.length)return null;
    if(date!==Core.dayKey()){const d=db.days[date]?.[cid];return d?.attempts?{due:0,fresh:0,selected:0,remaining:0,attempts:d.attempts,seconds:d.seconds}:null;}
    const ranges=selectedScope==='all'?null:window.StudyLibrary?.scope(cid,selectedScope);
    const allowed=window.PlannerCore.eligible(list,records,ranges,window.StudyPlanner?.learned(cid)||{});
    const daily=day(cid),p=Core.plan(allowed,records,daily);
    const pending=Object.values(db.sessions).some(s=>s.date===Core.dayKey()&&s.course===cid&&!s.finished&&s.queue?.length);
    return {due:p.due.length,fresh:p.selected.filter(c=>c.kind==='new').length,selected:p.selected.length+Number(pending),remaining:p.remaining,attempts:daily.attempts,seconds:daily.seconds};
  }
  window.RecallPractice={mount,leave,dashboard,summary};
})();
