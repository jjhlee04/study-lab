/* Daily subject planner. No seed tasks or inferred completion records. */
(function () {
  'use strict';
  const Core=window.PlannerCore, KEY='study-planner-v1';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaults=[['unix','유닉스 프로그래밍'],['programming-languages','프로그래밍언어론'],['discrete-math','이산수학'],['data-centric-ml','데이터중심머신러닝'],['data-communication','데이터통신']];
  const read=()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{};}catch{return {};}};
  const timerOwner=crypto.randomUUID();
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
  const deadlines=()=>window.StudyAssignments.deadlines(courses);
  function deadlineLinks(rows){
    return rows.map(a=>`<a href="${window.StudyAssignments.href(a.cid,a.id)}">${esc(window.StudyAssignments.dueText(a))} · ${esc(a.title)}</a>`).join('');
  }
  const dayTime=(data,date=selected)=>data.studyTime?.[date]||{};
  const totalTime=(data,date=selected)=>Object.values(dayTime(data,date)).reduce((sum,ms)=>sum+ms,0);
  function timeLabel(ms){
    const seconds=Math.floor(ms/1000), hours=Math.floor(seconds/3600), minutes=Math.floor(seconds%3600/60);
    return [hours&&hours+'시간',minutes&&minutes+'분',(seconds%60||!ms)&&seconds%60+'초'].filter(Boolean).join(' ')||'0초';
  }
  function clockLabel(ms){
    const seconds=Math.floor(ms/1000);
    return [Math.floor(seconds/3600),Math.floor(seconds%3600/60),seconds%60].map(n=>String(n).padStart(2,'0')).join(':');
  }
  const elapsed=(timer,now=Date.now())=>timer.ms+(timer.startedAt?Math.max(0,now-timer.startedAt):0);
  function timerPanel(data){
    const timer=data.timer;
    if(timer){
      const name=courses.find(c=>c.id===timer.course)?.name||timer.course;
      const owned=timer.owner===timerOwner;
      return `<section class="pl-timer" aria-label="공부 타이머"><div><strong>${esc(name)}</strong>
        <small>${fmt(timer.date)} · ${timer.startedAt?'측정 중':'일시정지'}</small></div>
        <span id="pl-clock" class="pl-clock">${clockLabel(elapsed(timer))}</span>
        <div class="pl-timer-actions">
          ${!timer.startedAt||owned?`<button type="button" id="pl-toggle-timer">${timer.startedAt?'일시정지':'계속 공부'}</button>`:''}
          <button type="button" id="pl-stop-timer" class="pl-primary">종료·저장</button>
        </div></section>`;
    }
    return `<form class="pl-timer" id="pl-start-timer"><label>공부할 과목 <select name="course">${courses.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select></label><button class="pl-primary" type="submit">공부 시작</button></form>`;
  }
  function pauseTimer(){
    const timer=read().timer;
    if(!timer?.startedAt||timer.owner!==timerOwner)return;
    update(d=>{
      const t=d.timer;
      if(t?.startedAt&&t.owner===timerOwner){t.ms=elapsed(t);t.startedAt=null;}
    });
  }
  function bindTimer(){
    $('#pl-start-timer',host)?.addEventListener('submit',ev=>{
      ev.preventDefault();
      const course=new FormData(ev.target).get('course');
      if(update(d=>{d.timer??={id:crypto.randomUUID(),course,date:selected,ms:0,startedAt:Date.now(),owner:timerOwner};}))refresh();
    });
    $('#pl-toggle-timer',host)?.addEventListener('click',()=>{
      const t=read().timer;
      if(t?.startedAt)pauseTimer();
      else update(d=>{
        if(d.timer&&!d.timer.startedAt){d.timer.startedAt=Date.now();d.timer.owner=timerOwner;}
      });
      refresh();
    });
    $('#pl-stop-timer',host)?.addEventListener('click',()=>{
      const t=read().timer;
      if(!t)return;
      const saved=update(d=>{
        if(d.timer?.id!==t.id)return;
        const session=d.timer;
        const ms=elapsed(session);
        if(ms>0){
          d.studyTime??={};
          const day=d.studyTime[session.date]??={};
          day[session.course]=(day[session.course]||0)+ms;
        }
        delete d.timer;
      });
      if(saved){refresh();notice('공부 시간을 저장했습니다.');}
    });
  }
  function calendar(){
    const first=Core.parse(month+'-01'), offset=first.getUTCDay(), start=Core.add(month+'-01',-offset);
    const end=new Date(first);end.setUTCMonth(end.getUTCMonth()+1);end.setUTCDate(0);
    const data=read(), due=deadlines(), cells=Array.from({length:Math.ceil((offset+end.getUTCDate())/7)*7},(_,n)=>{
      const date=Core.add(start,n), outside=date.slice(0,7)!==month, day=data.days?.[date];
      const hasPlan=Object.values(day||{}).some(e=>e.tasks?.length||e.note||e.rest)||totalTime(data,date)>0||courses.some(c=>window.RecallPractice?.summary(c.id,'final',date)?.attempts>0);
      const isDue=due.some(a=>a.due.startsWith(date+'T'));const isExam=courses.some(c=>examDays(c.id).includes(date));
      return `<button type="button" data-pl-day="${date}" class="${outside?'pl-outside ':''}${date===selected?'pl-selected ':''}${date===Core.today()?'pl-today ':''}${isExam?'pl-exam-day ':''}${isDue?'pl-due-day':''}" aria-label="${fmt(date)}${hasPlan?' · 기록 있음':''}${isExam?' · 기말고사':''}${isDue?' · 과제 마감':''}" ${date===selected?'aria-current="date"':''}><span>${Number(date.slice(-2))}</span>${hasPlan||data.records?.[date]?'<i aria-hidden="true"></i>':''}</button>`;
    }).join('');
    return `<div class="pl-cal-heading"><button type="button" data-pl-month="-1" aria-label="이전 달">${icon('left')}</button><strong>${first.getUTCFullYear()}년 ${first.getUTCMonth()+1}월</strong><button type="button" data-pl-month="1" aria-label="다음 달">${icon('right')}</button></div><div class="pl-cal-week" aria-hidden="true">${['일','월','화','수','목','금','토'].map(d=>`<span>${d}</span>`).join('')}</div><div class="pl-cal-grid">${cells}</div><button type="button" class="pl-today-link" id="pl-today">오늘로</button>`;
  }
  function flash(cid,date=selected){
    return window.RecallPractice?.summary?.(cid,'final',date)||null;
  }
  function subject(c,data){
    const e=entry(data,c.id), tasks=e.tasks||[], study=dayTime(data)[c.id], f=flash(c.id), automatic=!!(f&&(f.due>0||f.fresh>0||f.attempts>0));
    const autoDone=automatic&&f.attempts>0&&(!f.remaining||!f.selected);
    const complete=tasks.length+Number(automatic)>0&&tasks.every(t=>t.done)&&(!automatic||autoDone);
    const status=e.rest?'오늘은 쉬기':complete?'완료':tasks.length||automatic?'학습 진행':'계획 없음';
    return `<section class="pl-subject ${e.rest?'pl-rest':''}" data-pl-course="${esc(c.id)}" aria-labelledby="pl-heading-${esc(c.id)}"><div class="pl-subject-head"><div class="pl-name-status"><h2 id="pl-heading-${esc(c.id)}"><a href="#/course/${encodeURIComponent(c.id)}/home">${esc(c.name)}</a></h2><button type="button" class="pl-status ${status==='계획 없음'?'pl-neutral':''}" data-pl-rest="${esc(c.id)}" aria-label="${esc(c.name)} ${e.rest?'공부하기로 변경':'오늘 쉬기'}" aria-pressed="${!!e.rest}">${status}</button></div><div class="pl-subject-actions">${study?`<span class="pl-study-time">${timeLabel(study)}</span>`:'' }<button type="button" class="pl-add-toggle" data-pl-add-toggle="${esc(c.id)}" aria-label="${esc(c.name)} 할 일 입력" aria-expanded="${!tasks.length&&!automatic}">＋</button><button type="button" class="pl-note-button" data-pl-note="${esc(c.id)}" aria-expanded="${!!e.note}">${icon('note')}메모</button></div></div>${examDays(c.id).includes(selected)?`<p class="pl-exam-note">기말고사 · ${examDate(c.id)?fmt(examDate(c.id)):'12.15–12.21'}</p>`:''}<div class="pl-task-list">${tasks.map(t=>`<div class="pl-task ${t.done?'pl-done':''}"><label><input type="checkbox" data-pl-check="${esc(t.id)}" ${t.done?'checked':''}><span>${esc(t.text)}${t.assignment?` <a class="pl-task-origin" href="${window.StudyAssignments.href(c.id,t.assignment.id)}">${esc(t.assignment.title)}</a>`:''}</span></label><button type="button" class="pl-task-edit" data-pl-edit-task="${esc(t.id)}" aria-label="${esc(t.text)} 수정">수정</button><button type="button" data-pl-remove="${esc(t.id)}" aria-label="${esc(t.text)} 삭제">×</button></div>`).join('')}${automatic?`<div class="pl-task pl-auto ${autoDone?'pl-done':''}"><span class="pl-auto-check" aria-hidden="true">${autoDone?'✓':''}</span><button type="button" data-pl-flash="${esc(c.id)}">플래시카드 15분${f.attempts?` · ${f.attempts}장 학습`:''}</button><small>복습 ${f.due} · 새 카드 ${f.fresh}</small></div>`:''}</div><form class="pl-add-task" data-pl-add="${esc(c.id)}" ${tasks.length||automatic?'hidden':''}><label class="sr-only" for="pl-new-${esc(c.id)}">${esc(c.name)} 할 일</label><input id="pl-new-${esc(c.id)}" name="task" maxlength="240" placeholder="${e.rest?'필요한 할 일만 적어 두세요.':'＋ 할 일 추가'}" autocomplete="off"><button type="submit" aria-label="${esc(c.name)} 할 일 추가">추가</button></form><div class="pl-note" ${e.note?'':'hidden'}><label class="sr-only" for="pl-note-${esc(c.id)}">${esc(c.name)} 메모</label><textarea id="pl-note-${esc(c.id)}" data-pl-memo="${esc(c.id)}" rows="2" maxlength="4000" placeholder="메모를 작성하세요.">${esc(e.note||'')}</textarea></div></section>`;
  }
  function totals(data,record){
    let total=0,done=0;
    for(const c of courses){const e=entry(data,c.id);if(e.rest)continue;for(const t of e.tasks||[]){total++;if(t.done)done++;}const f=flash(c.id);if(record){const saved=record.flash[c.id];if(saved){total++;if(saved.done)done++;}}else if(f&&(f.due||f.fresh||f.attempts)){total++;if(f.attempts&&(!f.remaining||!f.selected))done++;}}
    return {total,done};
  }
  function recordView(data,record,t){
    const rows=courses.map(c=>{
      const e=entry(data,c.id), tasks=e.tasks||[], f=record.flash[c.id], study=dayTime(data)[c.id];
      return `<section class="pl-record-row"><h2>${esc(c.name)}${study?`<small class="pl-study-time">${timeLabel(study)}</small>`:''}</h2><div>
        ${tasks.length||f?`<ul>${tasks.map(task=>`<li><span class="pl-record-mark" aria-label="${task.done?'완료':'미완료'}">${task.done?'✓':'○'}</span><span>${esc(task.text)}${task.assignment?` <a class="pl-task-origin" href="${window.StudyAssignments.href(c.id,task.assignment.id)}">${esc(task.assignment.title)}</a>`:''}</span></li>`).join('')}
        ${f?`<li><span class="pl-record-mark" aria-label="${f.done?'완료':'미완료'}">${f.done?'✓':'○'}</span><span>플래시카드 15분${f.attempts?` · ${f.attempts}장 학습`:''}</span></li>`:''}</ul>`:''}
        ${e.rest||(!tasks.length&&!f&&!e.note&&!study)?`<p class="pl-record-empty">${e.rest?'오늘은 쉬기':'기록 없음'}</p>`:''}
        ${e.note?`<p class="pl-record-note">${esc(e.note)}</p>`:''}</div></section>`;
    }).join('');
    const upcoming=deadlines().filter(a=>!a.submitted&&a.due.slice(0,10)>=selected).slice(0,3);
    const day=Core.parse(selected);
    return `<article class="pl-record"><div class="pl-record-heading"><h2 tabindex="-1">하루 공부 기록</h2><button type="button" id="pl-edit-record">다시 편집</button></div>
      <div class="pl-record-date"><time datetime="${selected}">${selected.slice(5).replace('-','.')}</time><span>${day.toLocaleDateString('ko-KR',{weekday:'long',timeZone:'UTC'})}</span><strong>${t.done}/${t.total} 완료${totalTime(data)?` · 공부 ${timeLabel(totalTime(data))}`:''}</strong></div>
      ${rows}${upcoming.length?`<div class="pl-deadlines"><strong>다가오는 마감</strong>${deadlineLinks(upcoming)}</div>`:''}
    </article>`;
  }
  function changeView(record){
    const drafts=$$('[data-pl-add]',host).map(form=>[form.dataset.plAdd,$('input',form).value.trim()]).filter(([,text])=>text);
    const saved=update(d=>{
      d.records??={};
      if(record){delete d.records[selected];return;}
      d.days[selected]??={};
      for(const [cid,text] of drafts){
        const e=d.days[selected][cid]??={tasks:[],note:'',rest:false};
        (e.tasks??=[]).push({id:crypto.randomUUID(),text,done:false});
        e.rest=false;
      }
      const snapshots={};
      for(const c of courses){
        const f=flash(c.id);
        if(f&&(f.due||f.fresh||f.attempts))snapshots[c.id]={attempts:f.attempts,done:f.attempts>0&&(!f.remaining||!f.selected)};
      }
      d.records[selected]={flash:snapshots};
    });
    if(saved){refresh();$('.pl-record-heading h2, .pl-header h1',host)?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  function render(root){
    host=root;courses=allCourses();
    const previous=selected,date=location.hash.split('/')[2];selected=Core.parse(date)?date:Core.today();
    if(previous!==selected||!Core.parse(month+'-01'))month=selected.slice(0,7);
    document.body.classList.add('planner-view');document.body.classList.remove('reading-wide');
    document.title=`${fmt(selected,{month:'numeric',day:'numeric'})} · 스터디 플래너 | 학습 서재`;
    const data=read(),record=data.records?.[selected],t=totals(data,record),w=Core.week(selected),due=deadlines().filter(a=>a.due.startsWith(selected+'T'));
    host.innerHTML=`<aside class="pl-sidebar"><a class="pl-brand" href="#/library/2/2">학습 서재</a><nav aria-label="플래너 메뉴"><a href="#/library/2/2">${icon('home')}내 서재</a><a href="#/planner/${selected}" class="pl-nav-selected" aria-current="page">${icon('calendar')}스터디 플래너</a><button type="button" id="pl-calendar-toggle" aria-expanded="${calendarOpen}">${icon('calendar')}캘린더</button><button type="button" id="pl-cards">${icon('cards')}플래시카드</button></nav><div class="pl-calendar ${calendarOpen?'pl-calendar-open':''}" id="pl-calendar">${calendar()}</div></aside><main class="pl-main" id="s-content" tabindex="-1"><header class="pl-header"><h1 tabindex="-1">스터디 플래너</h1><div class="pl-date"><button type="button" data-pl-shift="-1" aria-label="전날">${icon('left')}</button><label class="pl-date-label">${icon('calendar')}<span>${fmt(selected)}</span><input type="date" id="pl-date-input" aria-label="계획 날짜" value="${selected}" min="2000-01-01" max="2100-12-31"></label><button type="button" data-pl-shift="1" aria-label="다음 날">${icon('right')}</button></div>${w?`<span class="pl-week">${w}주차</span>`:''}<button type="button" class="pl-exam" id="pl-exam">${icon('exam')}기말고사 12.15–12.21</button></header>${timerPanel(data)}${record?recordView(data,record,t):`${due.length?`<div class="pl-deadlines"><strong>과제 마감</strong>${deadlineLinks(due)}</div>`:''}<div class="pl-subjects">${courses.map(c=>subject(c,data)).join('')}</div><footer class="pl-footer"><span id="pl-total">완료 ${t.done} / ${t.total}${totalTime(data)?` · 공부 ${timeLabel(totalTime(data))}`:''}</span><span id="pl-save-status" role="status" aria-live="polite"></span><button type="button" id="pl-finish" class="pl-primary">완료</button></footer>`}</main>`;
    bind();
  }
  function refresh(){if(host?.isConnected&&document.body.classList.contains('planner-view'))render(host);}
  function navigate(date){selected=date;month=date.slice(0,7);location.hash=`#/planner/${date}`;}
  function bind(){
    bindTimer();
    $('#pl-date-input',host).onchange=ev=>{if(Core.parse(ev.target.value))navigate(ev.target.value);};
    $$('[data-pl-day]',host).forEach(b=>b.onclick=()=>navigate(b.dataset.plDay));
    $$('[data-pl-shift]',host).forEach(b=>b.onclick=()=>navigate(Core.add(selected,Number(b.dataset.plShift))));
    $$('[data-pl-month]',host).forEach(b=>b.onclick=()=>{const d=Core.parse(month+'-01');d.setUTCMonth(d.getUTCMonth()+Number(b.dataset.plMonth));month=Core.key(d).slice(0,7);refresh();});
    $('#pl-today',host).onclick=()=>{if(selected===Core.today()){month=selected.slice(0,7);refresh();}else navigate(Core.today());};
    $('#pl-calendar-toggle',host).onclick=()=>{calendarOpen=!calendarOpen;$('#pl-calendar').classList.toggle('pl-calendar-open',calendarOpen);$('#pl-calendar-toggle').setAttribute('aria-expanded',calendarOpen);if(matchMedia('(min-width:651px)').matches)$('#pl-calendar').querySelector('.pl-selected')?.focus();};
    $('#pl-cards',host).onclick=()=>openCards();$('#pl-exam',host).onclick=showExams;
    $('#pl-finish',host)?.addEventListener('click',()=>changeView(false));
    $('#pl-edit-record',host)?.addEventListener('click',()=>changeView(true));
    $$('[data-pl-edit-task]',host).forEach(b=>b.onclick=()=>{
      const cid=b.closest('[data-pl-course]').dataset.plCourse;
      const task=entry(read(),cid).tasks.find(t=>t.id===b.dataset.plEditTask);
      const d=dialog('할 일 수정',`<form id="pl-edit-task-form" class="s-form"><label class="s-form-field">할 일<input name="text" maxlength="240" required value="${esc(task.text)}"></label><button type="submit" class="pl-primary">저장</button></form>`);
      $('#pl-edit-task-form',d).onsubmit=ev=>{
        ev.preventDefault();
        const text=new FormData(ev.target).get('text').trim();
        if(text&&edit(cid,e=>e.tasks.find(t=>t.id===task.id).text=text)){d.close();refresh();}
      };
    });
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
    const timer=read().timer;
    for(const bar of $$('.cv-bar')){
      let a=$('[data-open-planner]',bar);
      if(!a){a=document.createElement('a');a.className='s-btn';a.dataset.openPlanner='';bar.append(a);}
      const text=timer?(timer.startedAt?'공부 타이머 · 측정 중':'공부 타이머 · 일시정지'):'플래너';
      if(a.textContent!==text)a.textContent=text;
      a.setAttribute('href','#/planner/'+(timer?.date||Core.today()));
    }
  }
  let pending;new MutationObserver(()=>{cancelAnimationFrame(pending);pending=requestAnimationFrame(enhancements);}).observe(document.body,{childList:true,subtree:true});
  window.addEventListener('storage',ev=>{if(ev.key===KEY){refresh();enhancements();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseTimer();else{refresh();enhancements();}});
  window.addEventListener('pagehide',pauseTimer);
  setInterval(()=>{
    const clock=$('#pl-clock');
    if(!clock)return;
    const timer=read().timer;
    if(timer)clock.textContent=clockLabel(elapsed(timer));
  },1000);
  document.addEventListener('close',ev=>{if(ev.target.id==='st-tools')refresh();},true);
  function addAssignment(cid,date,a,task){
    return update(d=>{
      d.days[date]??={};
      const e=d.days[date][cid]??={tasks:[],note:'',rest:false};
      e.tasks??=[];
      if(e.tasks.some(t=>t.assignment?.id===a.id&&t.assignment.task===task.id))return;
      e.tasks.push({id:crypto.randomUUID(),text:task.text,done:false,assignment:{id:a.id,task:task.id,title:a.title}});
      e.rest=false;
    });
  }
  window.StudyPlanner={render,learned,learnedForm,bindLearned,refresh,addAssignment};
  enhancements();
  if(location.hash.startsWith('#/planner'))window.dispatchEvent(new HashChangeEvent('hashchange'));
})();
