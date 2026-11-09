(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;',
  })[c]);
  const pl = 'programming-languages';
  const source = 'PL-assignment-3-v1.pdf';
  const seed = {
    id:'pl-assignment-3', title:'PL 과제 3', due:'2026-11-17T23:59',
    filename:'<이름>_assignment3.pdf', instructions:'코드를 제외한 풀이는 손으로 작성.',
    tasks:[
      ['6.5 정규표현식','교과서 246~254쪽'],
      ['6.11 뺄셈·나눗셈의 BNF, EBNF, 구문 다이어그램','교과서 246~254쪽'],
      ['Static Scope','지정 지점 3곳의 심볼 테이블과 출력값',3],
      ['Dynamic Scope','지정 지점 3곳의 심볼 테이블과 출력값',4],
      ['Aliases','11·15행 직후 그림, 별칭 관계, 출력값',6],
      ['sum 오버로드 · C++·Java','각 호출이 선택하는 함수 번호 또는 오류',5],
    ].map(([text,note,page],i)=>({id:'q'+(i+1),text,note,page,done:false})),
  };
  const href = (cid,id='') => '#/course/'+encodeURIComponent(cid)+'/assignments'+(id?'/'+encodeURIComponent(id):'');
  const list = c => c.assignments ?? (c.id===pl?[seed]:[]);
  const sorted = rows => [...rows].sort((a,b)=>(a.due||'~').localeCompare(b.due||'~'));
  const deadlines = courses => sorted(courses.flatMap(c=>list(c).filter(a=>a.due).map(a=>({...a,cid:c.id}))));
  const count = a => a.tasks.filter(t=>t.done).length;
  function status(a) {
    if(a.submitted)return '제출 완료';
    if(a.due&&new Date(a.due)<new Date())return '마감 지남';
    const done=count(a);
    if(a.tasks.length&&done===a.tasks.length)return '제출 준비';
    return a.started||done?'진행 중':'시작 전';
  }
  function dueText(a) {
    if(!a.due)return '마감 미지정';
    const [date,time]=a.due.split('T');
    return new Date(date+'T00:00:00').toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'short'})+' '+time;
  }
  function form(a) {
    return `<form id="as-form" class="s-form">
      <label class="s-form-field">과제명<input name="title" required maxlength="120" value="${esc(a?.title)}"></label>
      <label class="s-form-field">마감<input name="due" type="datetime-local" value="${esc(a?.due)}"></label>
      <label class="s-form-field">제출 파일명<input name="filename" maxlength="180" value="${esc(a?.filename)}"></label>
      <label class="s-form-field">제출 조건<textarea name="instructions" maxlength="4000" rows="2">${esc(a?.instructions)}</textarea></label>
      <label class="s-form-field">문항 · 한 줄에 하나<textarea name="tasks" maxlength="12000" rows="6">${esc(a?.tasks.map(t=>t.text).join('\n'))}</textarea></label>
      <button class="s-btn teal">저장</button>
    </form>`;
  }
  function view(c) {
    const id=location.hash.split('/')[4];
    const rows=list(c), a=rows.find(x=>x.id===id), create=id==='new';
    if(create)return `<section class="s-section"><a href="${href(c.id)}">← 과제 목록</a><h2>과제 추가</h2>${form()}</section>`;
    if(!a)return `<section class="s-section"><h2>과제</h2><div class="s-actions"><a class="s-btn teal" href="${href(c.id,'new')}">과제 추가</a></div>
      ${sorted(rows).map(x=>`<a class="s-review-link" href="${href(c.id,x.id)}"><strong>${esc(x.title)}</strong><small>${esc(dueText(x))} · ${count(x)}/${x.tasks.length} · ${status(x)}</small></a>`).join('')||'<p>등록한 과제가 없습니다.</p>'}</section>`;
    const seeded=c.id===pl&&a.id===seed.id;
    return `<section class="s-section as-detail"><a href="${href(c.id)}">← 과제 목록</a>
      <h2>${esc(a.title)}</h2><p><strong>${esc(dueText(a))}</strong> · ${status(a)} · ${count(a)}/${a.tasks.length}</p>
      ${a.filename||a.instructions?`<div class="s-notice"><strong>제출 조건</strong>${a.filename?`<p class="as-text">${esc(a.filename)}</p>`:''}${a.instructions?`<p class="as-text">${esc(a.instructions)}</p>`:''}</div>`:''}
      ${seeded?`<div class="s-actions"><button type="button" class="s-btn" data-as-pdf="1">과제 PDF</button><a class="s-btn" href="#/course/${pl}/textbook/pl08/17">강의 노트 08</a></div>`:''}
      <h3>문항</h3>
      ${a.tasks.length?`<label class="as-date">플래너 날짜 <input type="date" id="as-plan-date" required value="${window.PlannerCore.today()}"></label>`:''}
      <ul class="as-tasks">${a.tasks.map(t=>`<li><label><input type="checkbox" data-as-check="${esc(t.id)}" ${t.done?'checked':''}> ${esc(t.text)}</label>
      ${t.note?`<small>${esc(t.note)}</small>`:''}<div class="s-actions">${seeded&&t.page?`<button class="s-btn" type="button" data-as-pdf="${t.page}">문항 PDF</button>`:''}
      <button class="s-btn" type="button" data-as-plan="${esc(t.id)}">플래너에 추가</button></div></li>`).join('')}</ul>
      <p id="as-feedback" role="status"></p>
      <div class="s-actions">${!a.started&&!a.submitted?`<button type="button" class="s-btn" id="as-start">진행 시작</button>`:''}<button type="button" class="s-btn teal" id="as-submit">${a.submitted?'제출 완료 취소':'제출 완료'}</button></div>
      <details><summary>과제 수정</summary>${form(a)}</details></section>`;
  }
  function bind(c,save,openSource) {
    const q=s=>document.querySelector(s), id=location.hash.split('/')[4], a=list(c).find(x=>x.id===id);
    const change=fn=>save(rows=>fn(rows.find(x=>x.id===id)),list(c));
    q('#as-form')?.addEventListener('submit',ev=>{
      ev.preventDefault();
      const f=new FormData(ev.target), title=f.get('title').trim();
      if(!title)return;
      const old=[...(a?.tasks||[])], nextId=a?.id||crypto.randomUUID();
      const tasks=f.get('tasks').split('\n').map(s=>s.trim()).filter(Boolean).map(text=>{
        const index=old.findIndex(t=>t.text===text);
        return index<0?{id:crypto.randomUUID(),text,done:false}:old.splice(index,1)[0];
      });
      const next={...a,id:nextId,title,tasks,due:f.get('due'),filename:f.get('filename').trim(),instructions:f.get('instructions').trim()};
      if(save(rows=>{const i=rows.findIndex(x=>x.id===nextId);if(i<0)rows.push(next);else rows[i]=next;},list(c)))location.hash=href(c.id,nextId);
    });
    q('#as-start')?.addEventListener('click',()=>change(x=>x.started=true));
    q('#as-submit')?.addEventListener('click',()=>change(x=>x.submitted=!x.submitted));
    for(const b of document.querySelectorAll('[data-as-check]'))b.onchange=()=>{
      if(!change(x=>{x.tasks.find(t=>t.id===b.dataset.asCheck).done=b.checked;x.started=true;}))b.checked=!b.checked;
    };
    for(const b of document.querySelectorAll('[data-as-pdf]'))b.onclick=()=>openSource(source,Number(b.dataset.asPdf));
    for(const b of document.querySelectorAll('[data-as-plan]'))b.onclick=()=>{
      const date=q('#as-plan-date').value, task=a.tasks.find(t=>t.id===b.dataset.asPlan);
      if(!window.PlannerCore.parse(date)){q('#as-plan-date').reportValidity();return;}
      if(window.StudyPlanner.addAssignment(c.id,date,a,task)){
        const link=document.createElement('a');
        link.href='#/planner/'+date;
        link.textContent='플래너 보기';
        q('#as-feedback').replaceChildren('플래너에 추가했습니다. ',link);
      }
    };
  }
  window.StudyAssignments={view,bind,href,deadlines,dueText};
})();
