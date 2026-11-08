/* Daily subject planner. No seed tasks or inferred completion records. */
(function () {
  'use strict';
  const Core=window.PlannerCore, KEY='study-planner-v1';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaults=[['unix','유닉스 프로그래밍'],['programming-languages','프로그래밍언어론'],['discrete-math','이산수학'],['data-centric-ml','데이터중심머신러닝'],['data-communication','데이터통신']];
  const read=()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{};}catch{return {};}};
  let host=null, selected=Core.today(), month=selected.slice(0,7), courses=[], calendarOpen=false;
  function notice(text){window.StudyTools?.notice(text);}
  function update(change){
    if(window.__studyApplyingCloud)return false;
    const next=read();next.version=1;next.days||={};next.learned||={};
    change(next);
    try{localStorage.setItem(KEY,JSON.stringify(next));return true;}
    catch{notice('기록을 저장하지 못했습니다. 저장 공간을 확인해 주세요.');return false;}
  }
  function allCourses(){
    const list=window.StudyLibrary?.courses?.()||[];
    const result=defaults.map(([id,name])=>({id,name,...list.find(c=>c.id===id)}));
    for(const c of list)if(!result.some(x=>x.id===c.id))result.push(c);
    return result;
  }
  const entry=(data,cid,date=selected)=>data.days?.[date]?.[cid]||{tasks:[],note:'',rest:false};
  function edit(cid,fn){return update(d=>{d.days[selected]||={};d.days[selected][cid]||={tasks:[],note:'',rest:false};fn(d.days[selected][cid]);});}
  const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${({home:'<path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',cards:'<rect x="7" y="3" width="14" height="16" rx="2"/><path d="M3 7v14h14M10 8h8m-8 4h6"/>',note:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',left:'<path d="m14 5-7 7 7 7"/>',right:'<path d="m10 5 7 7-7 7"/>',exam:'<path d="m2 8 10-5 10 5-10 5zM6 11v6c4 4 8 4 12 0v-6M22 8v9"/>'})[name]||''}</svg>`;
  function fmt(date,options={month:'long',day:'numeric',weekday:'long'}){return Core.parse(date).toLocaleDateString('ko-KR',{...options,timeZone:'UTC'});}
  function examDate(cid){return window.MockExam?.dates?.()[cid]?.final||'';}
  const examDays=cid=>examDate(cid)?[examDate(cid)]:Array.from({length:7},(_,n)=>Core.add(Core.examStart,n));
  function calendar(){
    const first=Core.parse(month+'-01'), offset=first.getUTCDay(), start=Core.add(month+'-01',-offset);
    const end=new Date(first);end.setUTCMonth(end.getUTCMonth()+1);end.setUTCDate(0);
    const data=read(), cells=Array.from({length:Math.ceil((offset+end.getUTCDate())/7)*7},(_,n)=>{
      const date=Core.add(start,n), outside=date.slice(0,7)!==month, day=data.days?.[date];
      const hasPlan=Object.values(day||{}).some(e=>e.tasks?.length||e.note||e.rest)||courses.some(c=>window.RecallPractice?.summary(c.id,'final',date)?.attempts>0);
      const isExam=courses.some(c=>examDays(c.id).includes(date));
      return `<button type="button" data-pl-day="${date}" class="${outside?'pl-outside ':''}${date===selected?'pl-selected ':''}${date===Core.today()?'pl-today ':''}${isExam?'pl-exam-day':''}" aria-label="${fmt(date)}${hasPlan?' · 기록 있음':''}${isExam?' · 기말고사':''}" ${date===selected?'aria-current="date"':''}><span>${Number(date.slice(-2))}</span>${hasPlan?'<i aria-hidden="true"></i>':''}</button>`;
    }).join('');
    return `<div class="pl-cal-heading"><button type="button" data-pl-month="-1" aria-label="이전 달">${icon('left')}</button><strong>${first.getUTCFullYear()}년 ${first.getUTCMonth()+1}월</strong><button type="button" data-pl-month="1" aria-label="다음 달">${icon('right')}</button></div><div class="pl-cal-week" aria-hidden="true">${['일','월','화','수','목','금','토'].map(d=>`<span>${d}</span>`).join('')}</div><div class="pl-cal-grid">${cells}</div><button type="button" class="pl-today-link" id="pl-today">오늘로</button>`;
  }
  function flash(cid,date=selected){
    return window.RecallPractice?.summary?.(cid,'final',date)||null;
  }
  function subject(c,data){
    const e=entry(data,c.id), tasks=e.tasks||[], f=flash(c.id), automatic=!!(f&&(f.due>0||f.fresh>0||f.attempts>0));
    const autoDone=automatic&&f.attempts>0&&(!f.remaining||!f.selected);
    const complete=tasks.length+Number(automatic)>0&&tasks.every(t=>t.done)&&(!automatic||autoDone);
    const status=e.rest?'오늘은 쉬기':complete?'완료':tasks.length||automatic?'학습 진행':'계획 없음';
    return `<section class="pl-subject ${e.rest?'pl-rest':''}" data-pl-course="${esc(c.id)}" aria-labelledby="pl-heading-${esc(c.id)}"><div class="pl-subject-head"><div class="pl-name-status"><h2 id="pl-heading-${esc(c.id)}"><a href="#/course/${encodeURIComponent(c.id)}/home">${esc(c.name)}</a></h2><button type="button" class="pl-status ${status==='계획 없음'?'pl-neutral':''}" data-pl-rest="${esc(c.id)}" aria-label="${esc(c.name)} ${e.rest?'공부하기로 변경':'오늘 쉬기'}" aria-pressed="${!!e.rest}">${status}</button></div><div class="pl-subject-actions"><button type="button" class="pl-add-toggle" data-pl-add-toggle="${esc(c.id)}" aria-label="${esc(c.name)} 할 일 입력" aria-expanded="${!tasks.length&&!automatic}">＋</button><button type="button" class="pl-note-button" data-pl-note="${esc(c.id)}" aria-expanded="${!!e.note}">${icon('note')}메모</button></div></div>${examDays(c.id).includes(selected)?`<p class="pl-exam-note">기말고사 · ${examDate(c.id)?fmt(examDate(c.id)):'12.15–12.21'}</p>`:''}<div class="pl-task-list">${tasks.map(t=>`<div class="pl-task ${t.done?'pl-done':''}"><label><input type="checkbox" data-pl-check="${esc(t.id)}" ${t.done?'checked':''}><span>${esc(t.text)}</span></label><button type="button" data-pl-remove="${esc(t.id)}" aria-label="${esc(t.text)} 삭제">×</button></div>`).join('')}${automatic?`<div class="pl-task pl-auto ${autoDone?'pl-done':''}"><span class="pl-auto-check" aria-hidden="true">${autoDone?'✓':''}</span><button type="button" data-pl-flash="${esc(c.id)}">플래시카드 15분${f.attempts?` · ${f.attempts}장 학습`:''}</button><small>복습 ${f.due} · 새 카드 ${f.fresh}</small></div>`:''}</div><form class="pl-add-task" data-pl-add="${esc(c.id)}" ${tasks.length||automatic?'hidden':''}><label class="sr-only" for="pl-new-${esc(c.id)}">${esc(c.name)} 할 일</label><input id="pl-new-${esc(c.id)}" name="task" maxlength="240" placeholder="${e.rest?'필요한 할 일만 적어 두세요.':'＋ 할 일 추가'}" autocomplete="off"><button type="submit" aria-label="${esc(c.name)} 할 일 추가">추가</button></form><div class="pl-note" ${e.note?'':'hidden'}><label class="sr-only" for="pl-note-${esc(c.id)}">${esc(c.name)} 메모</label><textarea id="pl-note-${esc(c.id)}" data-pl-memo="${esc(c.id)}" rows="2" maxlength="4000" placeholder="메모를 작성하세요.">${esc(e.note||'')}</textarea></div></section>`;
  }
  function totals(data){
    let total=0,done=0;
    for(const c of courses){const e=entry(data,c.id);if(e.rest)continue;for(const t of e.tasks||[]){total++;if(t.done)done++;}const f=flash(c.id);if(f&&(f.due||f.fresh||f.attempts)){total++;if(f.attempts&&(!f.remaining||!f.selected))done++;}}
    return {total,done};
  }
  function render(root){
    host=root;courses=allCourses();
    const previous=selected,date=location.hash.split('/')[2];selected=Core.parse(date)?date:Core.today();
    if(previous!==selected||!Core.parse(month+'-01'))month=selected.slice(0,7);
    document.body.classList.add('planner-view');document.body.classList.remove('reading-wide');
    document.title=`${fmt(selected,{month:'numeric',day:'numeric'})} · 스터디 플래너 | 학습 서재`;
    const data=read(),t=totals(data),w=Core.week(selected);
    host.innerHTML=`<aside class="pl-sidebar"><a class="pl-brand" href="#/library/2/2">학습 서재</a><nav aria-label="플래너 메뉴"><a href="#/library/2/2">${icon('home')}내 서재</a><a href="#/planner/${selected}" class="pl-nav-selected" aria-current="page">${icon('calendar')}스터디 플래너</a><button type="button" id="pl-calendar-toggle" aria-expanded="${calendarOpen}">${icon('calendar')}캘린더</button><button type="button" id="pl-cards">${icon('cards')}플래시카드</button></nav><div class="pl-calendar ${calendarOpen?'pl-calendar-open':''}" id="pl-calendar">${calendar()}</div></aside><main class="pl-main" id="s-content" tabindex="-1"><header class="pl-header"><h1>오늘의 계획</h1><div class="pl-date"><button type="button" data-pl-shift="-1" aria-label="전날">${icon('left')}</button><label class="pl-date-label">${icon('calendar')}<span>${fmt(selected)}</span><input type="date" id="pl-date-input" aria-label="계획 날짜" value="${selected}" min="2000-01-01" max="2100-12-31"></label><button type="button" data-pl-shift="1" aria-label="다음 날">${icon('right')}</button></div>${w?`<span class="pl-week">${w}주차</span>`:''}<button type="button" class="pl-exam" id="pl-exam">${icon('exam')}기말고사 12.15–12.21</button></header><div class="pl-subjects">${courses.map(c=>subject(c,data)).join('')}</div><footer class="pl-footer"><span id="pl-total">완료 ${t.done} / ${t.total}</span><span id="pl-save-status" role="status" aria-live="polite"></span></footer></main>`;
    bind();
  }
  function refresh(){if(host?.isConnected&&document.body.classList.contains('planner-view'))render(host);}
  function navigate(date){selected=date;month=date.slice(0,7);location.hash=`#/planner/${date}`;}
  function bind(){
    $('#pl-date-input',host).onchange=ev=>{if(Core.parse(ev.target.value))navigate(ev.target.value);};
    $$('[data-pl-day]',host).forEach(b=>b.onclick=()=>navigate(b.dataset.plDay));
    $$('[data-pl-shift]',host).forEach(b=>b.onclick=()=>navigate(Core.add(selected,Number(b.dataset.plShift))));
    $$('[data-pl-month]',host).forEach(b=>b.onclick=()=>{const d=Core.parse(month+'-01');d.setUTCMonth(d.getUTCMonth()+Number(b.dataset.plMonth));month=Core.key(d).slice(0,7);refresh();});
    $('#pl-today',host).onclick=()=>{if(selected===Core.today()){month=selected.slice(0,7);refresh();}else navigate(Core.today());};
    $('#pl-calendar-toggle',host).onclick=()=>{calendarOpen=!calendarOpen;$('#pl-calendar').classList.toggle('pl-calendar-open',calendarOpen);$('#pl-calendar-toggle').setAttribute('aria-expanded',calendarOpen);if(matchMedia('(min-width:651px)').matches)$('#pl-calendar').querySelector('.pl-selected')?.focus();};
    $('#pl-cards',host).onclick=()=>openCards();$('#pl-exam',host).onclick=showExams;
    $$('[data-pl-add]',host).forEach(form=>form.onsubmit=ev=>{ev.preventDefault();const input=$('input',form),text=input.value.trim();if(!text)return;if(edit(form.dataset.plAdd,e=>{e.tasks||=[];e.tasks.push({id:crypto.randomUUID(),text,done:false});e.rest=false;})){refresh();const newForm=$('[data-pl-add="'+CSS.escape(form.dataset.plAdd)+'"]',host);newForm.hidden=false;$('[data-pl-add-toggle="'+CSS.escape(form.dataset.plAdd)+'"]',host).setAttribute('aria-expanded','true');$('input',newForm).focus({preventScroll:true});}});
    $$('[data-pl-add-toggle]',host).forEach(b=>b.onclick=()=>{const form=$('.pl-add-task',b.closest('.pl-subject'));form.hidden=!form.hidden;b.setAttribute('aria-expanded',String(!form.hidden));if(!form.hidden)$('input',form).focus({preventScroll:true});});
    $$('[data-pl-check]',host).forEach(input=>input.onchange=()=>{const cid=input.closest('[data-pl-course]').dataset.plCourse;if(edit(cid,e=>{const t=e.tasks?.find(t=>t.id===input.dataset.plCheck);if(t)t.done=input.checked;}))refresh();else input.checked=!input.checked;});
    $$('[data-pl-remove]',host).forEach(b=>b.onclick=()=>{const cid=b.closest('[data-pl-course]').dataset.plCourse;let removed;if(edit(cid,e=>{removed=e.tasks.find(t=>t.id===b.dataset.plRemove);e.tasks=e.tasks.filter(t=>t.id!==b.dataset.plRemove);})){refresh();if(removed)offerUndo(cid,removed);}});
    $$('[data-pl-rest]',host).forEach(b=>b.onclick=()=>{if(edit(b.dataset.plRest,e=>e.rest=!e.rest))refresh();});
    $$('[data-pl-note]',host).forEach(b=>b.onclick=()=>{const note=$('.pl-note',b.closest('.pl-subject'));note.hidden=!note.hidden;b.setAttribute('aria-expanded',String(!note.hidden));if(!note.hidden)$('textarea',note).focus({preventScroll:true});});
    $$('[data-pl-memo]',host).forEach(input=>input.oninput=()=>{$('#pl-save-status').textContent=edit(input.dataset.plMemo,e=>e.note=input.value)?'저장됨':'저장하지 못함';});
    $$('[data-pl-flash]',host).forEach(b=>b.onclick=()=>openCards(b.dataset.plFlash));
  }
  function offerUndo(cid,task){const s=$('#pl-save-status',host);s.textContent='할 일을 삭제했습니다. ';const b=document.createElement('button');b.type='button';b.textContent='되돌리기';b.onclick=()=>{if(edit(cid,e=>e.tasks.push(task)))refresh();};s.append(b);}
  function openCards(cid='unix'){window.StudyTools.open('cards',cid,'final');}
  function dialog(title,contents){
    let d=$('#pl-dialog');if(!d){d=document.createElement('dialog');d.id='pl-dialog';d.className='pl-dialog';document.body.append(d);d.addEventListener('click',ev=>{if(ev.target===d)d.close();});}
    d.innerHTML=`<header><h2>${title}</h2><button type="button" id="pl-dialog-close">닫기</button></header>${contents}`;$('#pl-dialog-close',d).onclick=()=>d.close();d.showModal();return d;
  }
  function countdown(date){const days=Math.round((Core.parse(date)-Core.parse(Core.today()))/86400000);return days>0?'D-'+days:days===0?'D-day':'종료';}
  function showExams(){
    const d=dialog('기말고사',`<p class="pl-dialog-sub">12월 15일 화요일 – 12월 21일 월요일 · 16주차</p><form id="pl-exam-form">${allCourses().map(c=>{const date=examDate(c.id);return `<label class="pl-exam-row"><span>${esc(c.name)}<small>${date?fmt(date):'12.15–12.21'} · ${countdown(date||Core.examStart)}</small></span><input type="date" aria-label="${esc(c.name)} 기말고사 날짜" data-pl-exam-date="${esc(c.id)}" value="${esc(date)}" min="2026-09-01" max="2027-02-28"></label>`;}).join('')}<p id="pl-exam-message" role="status"></p><button class="pl-primary" type="submit">일정 저장</button></form>`);
    $('#pl-exam-form',d).onsubmit=ev=>{ev.preventDefault();const values={};for(const i of $$('[data-pl-exam-date]',d)){if(i.value&&!Core.parse(i.value))return;values[i.dataset.plExamDate]=i.value;}if(window.MockExam.setFinalDates(values)){d.close();refresh();}else $('#pl-exam-message',d).textContent='일정을 저장하지 못했습니다.';};
  }
  function learned(cid){
    const values=read().learned?.[cid]||{},out={};
    for(const m of materials(cid)){try{out[m.id]=Core.range(values[m.id]||'',m.pages);}catch{out[m.id]=[];}}
    return out;
  }
  function materials(cid){
    if(cid==='unix')return [['unix-w01','w01 · 강의 소개와 Linux',29],['unix-w02','w02 · Linux 명령어·vi·Makefile',75],['unix-w06','w06 · 파일 시스템과 파일 입출력',73],['unix-w09','w09 · 표준 입출력',48]].map(([id,title,pages])=>({id,title,pages}));
    return (window.COURSE_CHAPTERS||[]).filter(c=>(c.course||'programming-languages')===cid).map(c=>({id:c.id,title:c.title,pages:c.pages.length}));
  }
  function learnedForm(cid){
    const values=read().learned?.[cid]||{},ms=materials(cid);
    return `<details class="pl-learned"><summary>배운 범위 설정</summary><p>수업에서 배운 쪽을 입력하세요. 선택한 범위에 속한 복습 카드가 나옵니다.</p><form id="pl-learned-form">${ms.map(m=>`<label>${esc(m.title)}<span class="pl-learned-input"><input data-learned="${esc(m.id)}" data-max="${m.pages}" value="${esc(values[m.id]||'')}" placeholder="1-30 또는 전체" maxlength="500"><small>/ ${m.pages}쪽</small></span></label>`).join('')||'<p>등록된 교재가 없습니다.</p>'}<p id="pl-learned-message" role="status"></p>${ms.length?'<button type="submit" class="s-btn">범위 저장</button>':''}</form></details>`;
  }
  function bindLearned(root,cid,onSaved){const form=$('#pl-learned-form',root);if(!form)return;form.onsubmit=ev=>{ev.preventDefault();const values={};try{for(const input of $$('[data-learned]',form)){Core.range(input.value,Number(input.dataset.max));values[input.dataset.learned]=input.value.trim();}}catch(e){$('#pl-learned-message',form).textContent=e.message;return;}if(update(d=>d.learned[cid]=values)){onSaved();notice('배운 범위를 저장했습니다.');}};}
  function enhancements(){
    for(const side of $$('.s-side'))if(!$('.pl-entry',side)){const a=document.createElement('a');a.className='s-home-link pl-entry';a.href='#/planner/'+Core.today();a.innerHTML=icon('calendar')+'스터디 플래너';$('.s-home-link',side)?.after(a);}
    for(const bar of $$('.cv-bar'))if(!$('[data-open-planner]',bar)){const a=document.createElement('a');a.className='s-btn';a.dataset.openPlanner='';a.href='#/planner/'+Core.today();a.textContent='플래너';bar.append(a);}
  }
  let pending;new MutationObserver(()=>{cancelAnimationFrame(pending);pending=requestAnimationFrame(enhancements);}).observe(document.body,{childList:true,subtree:true});
  window.addEventListener('storage',ev=>{if(ev.key===KEY)refresh();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  document.addEventListener('close',ev=>{if(ev.target.id==='st-tools')refresh();},true);
  window.StudyPlanner={render,learned,learnedForm,bindLearned,refresh};
  enhancements();
  if(location.hash.startsWith('#/planner'))window.dispatchEvent(new HashChangeEvent('hashchange'));
})();
