/* 모의고사 · 문제 유형 · 오답 모음
 * 문항 출처: data.js(유닉스 페이지 퀴즈), courses.js(프로그래밍언어론 페이지 퀴즈), exam-bank.js(추가 문항)
 * 저장 키: study-mock-exam-v1 (기존 학습 기록 키와 분리)
 */
(function(){
'use strict';
const KEY='study-mock-exam-v1';
const TYPES=[['mc','선다형'],['tf','참·거짓'],['short','단답형'],['code','실행 결과 예측']];
const TYPE_NAME=Object.fromEntries(TYPES);
const DEFAULTS={unix:{mc:20,tf:0,short:20,code:0},'programming-languages':{mc:10,tf:5,short:5,code:5},'discrete-math':{mc:10,tf:5,short:10,code:5},'data-communication':{mc:15,tf:5,short:10,code:5}};
/* 표지·운영 안내·저작권 안내처럼 시험 내용이 아닌 유닉스 페이지는 문항에서 제외 */
const UNIX_SKIP=new Set(['w01-1','w01-2','w01-4','w01-5','w01-13','w01-20','w02-1','w02-10','w02-22','w02-54','w06-1','w06-19','w06-20']);
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

let db={settings:{},current:{},wrong:{},history:{}};
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')db={...db,...v};}catch{}
let saveFailed=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(db));saveFailed=false;}catch{saveFailed=true;}}

/* ── 문항 은행 ── */
let bankCache=null;
function bank(){
  if(bankCache)return bankCache;
  const list=[];
  for(const l of window.LESSONS||[]){
    if(!l.quiz||UNIX_SKIP.has(l.id))continue;
    list.push({id:'ux-mc-'+l.id,course:'unix',src:['unix-'+l.unit,l.page],type:'mc',q:l.quiz.question,options:l.quiz.options,answer:l.quiz.answer,why:l.quiz.why,title:l.title});
  }
  for(const ch of window.COURSE_CHAPTERS||[]){
    for(const p of ch.pages){
      if(!p.quiz||p.kind==='structure')continue;
      list.push({id:({'discrete-math':'dm','data-communication':'dc'}[ch.course]||'pl')+'-mc-'+ch.id+'-'+p.page,course:ch.course||'programming-languages',src:[ch.id,p.page],type:'mc',q:p.quiz[0],options:p.quiz[1],answer:0,why:p.quiz[2],reasons:p.quizReasons,title:p.title});
    }
  }
  for(const x of window.EXAM_BANK||[])list.push(x);
  bankCache=list;return list;
}
const byId=id=>bank().find(x=>x.id===id);

function srcLabel(item){
  const[m,p]=item.src;
  if(m.startsWith('unix-'))return `${m.slice(5)} · ${p}쪽`;
  const ch=(window.COURSE_CHAPTERS||[]).find(c=>c.id===m);
  return `${ch?ch.title.split('·')[0].trim():m} · PDF ${p}쪽`;
}
function srcHref(item,courseId){
  const[m,p]=item.src;
  if(m.startsWith('unix-'))return `#${m.slice(5)}/${p}/learn`;
  return `#/course/${encodeURIComponent(courseId)}/textbook/${encodeURIComponent(m)}/${p}`;
}

/* ── 채점 ── */
const norm=s=>String(s??'').normalize('NFC').toLowerCase().replace(/[\s"'`“”‘’.()]/g,'');
function isCorrect(item,ans){
  if(ans===undefined||ans===null||ans==='')return false;
  if(item.type==='mc')return +ans===item.answer;
  if(item.type==='tf')return (ans==='true')===item.answer;
  const a=norm(ans);return item.answer.some(x=>norm(x)===a);
}
function answerText(item){
  if(item.type==='mc')return item.options[item.answer];
  if(item.type==='tf')return item.answer?'참 (O)':'거짓 (X)';
  return item.answer[0];
}
function userText(item,ans,ex){
  if(ans===undefined||ans==='')return '응답 없음';
  if(item.type==='mc')return item.options[+ans];
  if(item.type==='tf')return ans==='true'?'참 (O)':'거짓 (X)';
  return ans;
}

/* ── 범위 ── */
function scopeOf(courseId,mode){
  if(mode==='all')return null;
  try{const s=window.StudyLibrary?.scope?.(courseId,mode);return s&&Object.keys(s).length?s:undefined;}catch{return undefined;}
}
function inScope(item,scope){
  if(scope===null)return true;
  if(!scope)return false;
  const[m,p]=item.src;
  if(!(m in scope))return false;
  return scope[m]===null||scope[m].includes(p);
}
function pool(courseId,mode){
  const scope=scopeOf(courseId,mode);
  return bank().filter(x=>x.course===courseId&&inScope(x,scope));
}
function settings(courseId){
  const s=db.settings[courseId]||{};
  return {counts:{...(DEFAULTS[courseId]||{mc:10,tf:5,short:5,code:0}),...(s.counts||{})},mode:s.mode||'all'};
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function makeExam(courseId,ids,label){
  const order={};
  for(const id of ids){const it=byId(id);if(it&&it.type==='mc')order[id]=shuffle(it.options.map((_,i)=>i));}
  db.current[courseId]={ids,order,answers:{},submitted:false,label,created:Date.now(),overrides:{}};
  save();
}
function generate(courseId){
  const st=settings(courseId),p=pool(courseId,st.mode),ids=[];
  for(const[t]of TYPES){const n=Math.max(0,Math.min(+st.counts[t]||0,p.filter(x=>x.type===t).length));ids.push(...shuffle(p.filter(x=>x.type===t)).slice(0,n).map(x=>x.id));}
  if(!ids.length)return false;
  const modeName={all:'과목 전체',mid:'중간고사 범위',final:'기말고사 범위'}[st.mode];
  makeExam(courseId,ids,modeName);return true;
}
function wrongIds(courseId){return Object.keys(db.wrong[courseId]||{}).filter(byId);}

/* ── 화면 ── */
let ctx=null; // {course, tab}
function mount(course,tab){
  ctx={course,tab};
  const root=q('#mx-root'),wroot=q('#mx-wrong-root');
  if(root)renderExam(root);
  if(wroot)renderWrong(wroot);
}
function courseHasBank(id){return bank().some(x=>x.course===id);}

function renderExam(root){
  const c=ctx.course,cur=db.current[c.id];
  if(!courseHasBank(c.id)){root.innerHTML=`<section class="s-section mx"><h2>모의고사</h2><div class="s-notice waiting">이 과목은 아직 문제 은행이 없습니다. 강의자료로 학습 교재와 문항을 만든 뒤 모의고사를 생성할 수 있습니다.</div></section>`;return;}
  if(cur&&!cur.submitted)return renderTaking(root,cur);
  if(cur&&cur.submitted)return renderResult(root,cur);
  renderSetup(root);
}

function renderSetup(root){
  const c=ctx.course,st=settings(c.id);
  const modes=[['all','과목 전체'],['mid','중간고사 범위'],['final','기말고사 범위']];
  const avail=m=>{const p=pool(c.id,m);return Object.fromEntries(TYPES.map(([t])=>[t,p.filter(x=>x.type===t).length]));};
  const av=avail(st.mode),total=TYPES.reduce((s,[t])=>s+Math.min(+st.counts[t]||0,av[t]),0);
  const wn=wrongIds(c.id).length,hist=(db.history[c.id]||[]).slice(-5).reverse();
  root.innerHTML=`<section class="s-section mx"><h2>모의고사</h2>
  <p class="mx-lead">강의자료 범위에서 문제를 뽑아 한 번에 풉니다. 제출하기 전에는 정답이 보이지 않고, 제출하면 자동 채점과 해설, 근거 페이지가 나옵니다.</p>
  <form id="mx-setup" class="mx-setup">
    <fieldset class="mx-modes"><legend>출제 범위</legend>${modes.map(([m,n])=>{const ok=m==='all'||scopeOf(c.id,m)!==undefined;return `<label class="${ok?'':'mx-off'}"><input type="radio" name="mode" value="${m}" ${st.mode===m?'checked':''} ${ok?'':'disabled'}> ${n}${ok?'':' <small>(시험범위 미지정)</small>'}</label>`;}).join('')}</fieldset>
    <fieldset class="mx-counts"><legend>문제 유형별 개수</legend>
      <div class="mx-count-grid">${TYPES.map(([t,n])=>`<label><span>${n}</span><input type="number" name="${t}" min="0" max="${av[t]}" value="${Math.min(+st.counts[t]||0,av[t])}" inputmode="numeric"><small>출제 가능 ${av[t]}개</small></label>`).join('')}</div>
      <div class="mx-ratio" aria-live="polite">${ratioBar(st.counts,av)}</div>
      ${DEFAULTS[c.id]?`<button type="button" class="s-btn ghost" id="mx-preset">기본 구성으로 (${TYPES.filter(([t])=>DEFAULTS[c.id][t]).map(([t,n])=>`${n} ${DEFAULTS[c.id][t]}`).join(' + ')})</button>`:''}
    </fieldset>
    <div class="s-actions"><button class="s-btn teal" type="submit" ${total?'':'disabled'}>모의고사 시작 · ${total}문제</button>${wn?`<button type="button" class="s-btn" id="mx-retry-wrong">틀린 문제만 다시 풀기 (${wn})</button>`:''}</div>
  </form>
  ${hist.length?`<details class="mx-history"><summary>최근 응시 기록</summary><ul>${hist.map(h=>`<li>${new Date(h.at).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})} · ${e(h.label)} · <b>${h.score}/${h.total}</b></li>`).join('')}</ul></details>`:''}
  <details class="mx-help"><summary>채점 방식 안내</summary><p>단답형과 실행 결과 예측은 대소문자·띄어쓰기·따옴표·마침표·괄호를 무시하고 인정 답안 목록과 비교합니다. 같은 뜻인데 오답 처리되면 결과 화면에서 직접 정답으로 인정할 수 있습니다. 추가 문항은 모두 표시된 근거 페이지의 내용으로 만들었으며, 실제 시험 출제 범위나 비중을 뜻하지 않습니다.</p></details>
  ${saveFailed?'<p class="mx-warn">브라우저 저장에 실패했습니다. 새로고침하면 진행 상황이 사라질 수 있습니다.</p>':''}
  </section>`;
  const form=q('#mx-setup');
  const read=()=>{const f=new FormData(form);return{mode:f.get('mode')||'all',counts:Object.fromEntries(TYPES.map(([t])=>[t,Math.max(0,parseInt(f.get(t))||0)]))};};
  const persist=()=>{db.settings[c.id]=read();save();};
  qa('input[name=mode]',form).forEach(r=>r.onchange=()=>{persist();renderSetup(root);});
  qa('.mx-counts input',form).forEach(i=>i.oninput=()=>{persist();const s=settings(c.id),a=avail(s.mode);q('.mx-ratio',form).innerHTML=ratioBar(s.counts,a);const t=TYPES.reduce((n,[k])=>n+Math.min(s.counts[k],a[k]),0);const b=q('button[type=submit]',form);b.textContent=`모의고사 시작 · ${t}문제`;b.disabled=!t;});
  if(q('#mx-preset'))q('#mx-preset').onclick=()=>{db.settings[c.id]={mode:read().mode,counts:{...DEFAULTS[c.id]}};save();renderSetup(root);};
  form.onsubmit=ev=>{ev.preventDefault();persist();if(generate(c.id)){renderExam(root);root.scrollIntoView({block:'start'});}};
  if(q('#mx-retry-wrong'))q('#mx-retry-wrong').onclick=()=>{makeExam(c.id,shuffle(wrongIds(c.id)),'틀린 문제 복습');renderExam(root);root.scrollIntoView({block:'start'});};
}
function ratioBar(counts,av){
  const n=TYPES.map(([t])=>Math.min(+counts[t]||0,av[t])),sum=n.reduce((a,b)=>a+b,0);
  if(!sum)return '<span class="mx-ratio-empty">문제 수를 1개 이상 정해 주세요.</span>';
  return `<div class="mx-bar">${TYPES.map(([t,name],i)=>n[i]?`<span class="mx-seg mx-t-${t}" style="flex:${n[i]}">${name} ${Math.round(n[i]/sum*100)}%</span>`:'').join('')}</div>`;
}

function questionHTML(item,i,cur,graded){
  const ans=cur.answers[item.id],name='mx-'+i;
  let body='';
  if(item.code)body+=`<pre class="mx-code"><code>${e(item.code)}</code></pre>`;
  if(item.type==='mc'){
    const order=cur.order[item.id]||item.options.map((_,k)=>k);
    body+=`<div class="mx-opts">${order.map((k,j)=>`<label class="mx-opt${graded?(k===item.answer?' is-answer':(String(k)===String(ans)?' is-wrong':'')):''}"><input type="radio" name="${name}" value="${k}" ${String(ans)===String(k)?'checked':''} ${graded?'disabled':''}><span class="mx-num">${j+1}</span><span>${e(item.options[k])}</span></label>`).join('')}</div>`;
  }else if(item.type==='tf'){
    body+=`<div class="mx-opts mx-tf">${[['true','참 (O)'],['false','거짓 (X)']].map(([v,l])=>`<label class="mx-opt${graded?((v==='true')===item.answer?' is-answer':(ans===v?' is-wrong':'')):''}"><input type="radio" name="${name}" value="${v}" ${ans===v?'checked':''} ${graded?'disabled':''}><span>${l}</span></label>`).join('')}</div>`;
  }else if(item.type==='code'){
    body+=`<label class="mx-text"><span class="mx-text-label">실행 결과 <small>(여러 줄이면 줄을 바꿔 입력)</small></span><textarea name="${name}" rows="${Math.min(4,(item.answer[0].match(/\n/g)||[]).length+1)}" spellcheck="false" autocapitalize="off" ${graded?'disabled':''}>${e(ans||'')}</textarea></label>`;
  }else{
    body+=`<label class="mx-text"><span class="mx-text-label">답</span><input type="text" name="${name}" value="${e(ans||'')}" autocomplete="off" autocapitalize="off" spellcheck="false" ${graded?'disabled':''}></label>`;
  }
  return body;
}

function renderTaking(root,cur){
  const c=ctx.course,items=cur.ids.map(byId).filter(Boolean);
  const done=()=>items.filter(it=>cur.answers[it.id]!==undefined&&cur.answers[it.id]!=='').length;
  let lastType='';
  root.innerHTML=`<section class="s-section mx"><div class="mx-head"><h2>모의고사 <small>${e(cur.label)} · ${items.length}문제</small></h2><div class="mx-progress"><span id="mx-done">${done()}</span> / ${items.length} 응답</div></div>
  <form id="mx-form" class="mx-form" novalidate>${items.map((it,i)=>{const sec=it.type!==lastType?`<h3 class="mx-type-head">${TYPE_NAME[it.type]}</h3>`:'';lastType=it.type;return `${sec}<article class="mx-q" id="mx-q-${i}"><div class="mx-qhead"><span class="mx-qno">${i+1}</span><span class="mx-badge mx-t-${it.type}">${TYPE_NAME[it.type]}</span></div><p class="mx-stem">${e(it.q)}</p>${questionHTML(it,i,cur,false)}</article>`;}).join('')}
  <div class="mx-submit-bar"><p id="mx-submit-note" class="mx-note"></p><div class="s-actions"><button class="s-btn teal" type="submit" id="mx-submit">제출하고 채점하기</button><button class="s-btn" type="button" id="mx-quit">그만두기</button></div></div></form></section>`;
  const form=q('#mx-form');
  const update=(el)=>{const i=+el.name.slice(3),it=items[i];cur.answers[it.id]=el.value;save();q('#mx-done').textContent=done();};
  qa('input[type=radio]',form).forEach(r=>r.onchange=()=>update(r));
  qa('input[type=text],textarea',form).forEach(t=>t.oninput=()=>update(t));
  qa('input[type=text]',form).forEach(t=>t.onkeydown=ev=>{if(ev.key==='Enter')ev.preventDefault();});
  let confirmSubmit=false,confirmQuit=false;
  form.onsubmit=ev=>{ev.preventDefault();const left=items.length-done();if(left&&!confirmSubmit){confirmSubmit=true;q('#mx-submit-note').textContent=`아직 답하지 않은 문제가 ${left}개 있습니다. 그대로 제출하려면 한 번 더 누르세요.`;q('#mx-submit').textContent='그래도 제출';return;}submit(c.id,cur,items);renderExam(root);root.scrollIntoView({block:'start'});};
  q('#mx-quit').onclick=()=>{if(!confirmQuit){confirmQuit=true;q('#mx-quit').textContent='정말 그만두기 (응답 삭제)';return;}delete db.current[c.id];save();renderExam(root);};
}

function submit(courseId,cur,items){
  cur.submitted=true;cur.submittedAt=Date.now();
  const w=db.wrong[courseId]||(db.wrong[courseId]={});
  let score=0;
  for(const it of items){const ok=isCorrect(it,cur.answers[it.id]);if(ok){score++;delete w[it.id];}else{w[it.id]={count:(w[it.id]?.count||0)+1,last:Date.now()};}}
  cur.score=score;
  (db.history[courseId]||(db.history[courseId]=[])).push({at:Date.now(),label:cur.label,score,total:items.length});
  db.history[courseId]=db.history[courseId].slice(-30);
  save();
}

function renderResult(root,cur){
  const c=ctx.course,items=cur.ids.map(byId).filter(Boolean);
  const ok=it=>cur.overrides[it.id]||isCorrect(it,cur.answers[it.id]);
  const score=items.filter(ok).length;
  const byType=TYPES.map(([t,n])=>{const xs=items.filter(it=>it.type===t);return xs.length?{t,n,total:xs.length,ok:xs.filter(ok).length}:null;}).filter(Boolean);
  const pct=items.length?Math.round(score/items.length*100):0;
  root.innerHTML=`<section class="s-section mx"><div class="mx-head"><h2>채점 결과 <small>${e(cur.label)}</small></h2></div>
  <div class="mx-score"><div class="mx-score-main"><strong>${score}</strong><span>/ ${items.length}</span><em>${pct}점</em></div><ul class="mx-score-types">${byType.map(b=>`<li><span>${b.n}</span><b>${b.ok} / ${b.total}</b></li>`).join('')}</ul></div>
  <div class="s-actions mx-result-actions"><label class="mx-filter"><input type="checkbox" id="mx-only-wrong"> 틀린 문제만 보기</label><button class="s-btn teal" id="mx-new">새 모의고사</button>${items.length-score?`<button class="s-btn" id="mx-redo-wrong">이번에 틀린 ${items.length-score}문제 다시 풀기</button>`:''}</div>
  <div class="mx-form">${items.map((it,i)=>{const good=ok(it),ans=cur.answers[it.id];return `<article class="mx-q ${good?'mx-good':'mx-bad'}" data-good="${good}"><div class="mx-qhead"><span class="mx-qno">${i+1}</span><span class="mx-badge mx-t-${it.type}">${TYPE_NAME[it.type]}</span><span class="mx-mark">${good?(cur.overrides[it.id]?'정답 (직접 인정)':'정답'):'오답'}</span></div><p class="mx-stem">${e(it.q)}</p>${questionHTML(it,i,cur,true)}
    ${(it.type==='short'||it.type==='code')?`<dl class="mx-compare"><div><dt>내 답</dt><dd><pre>${e(userText(it,ans))}</pre></dd></div><div><dt>정답</dt><dd><pre>${e(answerText(it))}</pre>${it.answer.length>1?`<small>인정 답안: ${it.answer.slice(1).map(e).join(' · ')}</small>`:''}</dd></div></dl>`:''}
    <div class="mx-why"><b>해설</b><p>${e(it.why)}</p>${it.type==='mc'&&it.reasons?`<details><summary>선택지별 이유</summary><ul>${it.options.map((o,k)=>`<li><b>${e(o)}</b> — ${e(it.reasons[k]||'')}</li>`).join('')}</ul></details>`:''}</div>
    <div class="mx-qfoot"><a class="mx-src" href="${srcHref(it,c.id)}">근거: ${e(srcLabel(it))} 학습하기 →</a>${!good&&(it.type==='short'||it.type==='code')&&ans?`<button class="s-btn ghost" data-accept="${e(it.id)}">같은 뜻이므로 정답으로 인정</button>`:''}</div></article>`;}).join('')}</div></section>`;
  q('#mx-only-wrong').onchange=ev=>qa('.mx-q',root).forEach(a=>a.hidden=ev.target.checked&&a.dataset.good==='true');
  q('#mx-new').onclick=()=>{delete db.current[c.id];save();renderExam(root);root.scrollIntoView({block:'start'});};
  if(q('#mx-redo-wrong'))q('#mx-redo-wrong').onclick=()=>{makeExam(c.id,items.filter(it=>!ok(it)).map(it=>it.id),'틀린 문제 다시 풀기');renderExam(root);root.scrollIntoView({block:'start'});};
  qa('[data-accept]',root).forEach(b=>b.onclick=()=>{const id=b.dataset.accept;cur.overrides[id]=true;if(db.wrong[c.id])delete db.wrong[c.id][id];const h=db.history[c.id];if(h&&h.length&&h[h.length-1].total===items.length)h[h.length-1].score=items.filter(ok).length;save();const y=window.scrollY;renderResult(root,cur);window.scrollTo(0,y);});
}

function renderWrong(root){
  const c=ctx.course;if(!courseHasBank(c.id)){root.innerHTML='';return;}
  const w=db.wrong[c.id]||{},items=wrongIds(c.id).map(byId).sort((a,b)=>(w[b.id].count-w[a.id].count)||(w[b.id].last-w[a.id].last));
  root.innerHTML=`<section class="s-section mx"><h2>모의고사 오답</h2><p>모의고사에서 틀린 문제입니다. 다시 맞히면 목록에서 빠집니다.</p>${items.length?`<div class="s-actions"><a class="s-btn teal" href="#/course/${encodeURIComponent(c.id)}/exams" id="mx-wrong-start">오답 ${items.length}문제 다시 풀기</a></div><ul class="mx-wrong-list">${items.map(it=>`<li><span class="mx-badge mx-t-${it.type}">${TYPE_NAME[it.type]}</span><span class="mx-wrong-q">${e(it.q)}</span><a href="${srcHref(it,c.id)}">${e(srcLabel(it))}</a><small>${w[it.id].count}회 틀림</small></li>`).join('')}</ul>`:'<div class="s-notice">모의고사 오답이 없습니다.</div>'}</section>`;
  if(q('#mx-wrong-start'))q('#mx-wrong-start').onclick=()=>{makeExam(c.id,shuffle(items.map(x=>x.id)),'틀린 문제 복습');};
}

window.MockExam={mount,bank,isCorrect,_db:()=>db};
})();
