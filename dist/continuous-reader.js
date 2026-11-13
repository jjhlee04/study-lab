(function(){
'use strict';
const CS=window.CourseStudy,originalHTML=CS.html,originalBind=CS.bind;
let sheets=[],current=null,observer=null,view='explain',course=null,materials=null;
const preference='study-continuous-reader-v1',LAST_VIEW='study-reader-last-view-v1';  // 처음 여는 장·쪽은 마지막에 쓰던 원문/교재 화면으로 연다
function enabled(){return localStorage.getItem(preference)!=='single';}
CS.html=function(c,ms,number){
 if(number||!enabled()||!ms.length)return originalHTML(c,ms,number);
 const state=CS.info(c,ms);if(!state.built)return originalHTML(c,ms);const template=document.createElement('template');
 template.innerHTML=originalHTML(c,ms);const section=template.content.firstElementChild;
 section.classList.add('continuous-reader');section.querySelector('.cs-layout').remove();section.querySelector(':scope>p')?.remove();
 const toolbar=section.querySelector('.cs-toolbar');toolbar.classList.add('cr-controls');
 const switcher=document.createElement('button');switcher.type='button';switcher.className='s-btn';switcher.dataset.readMode='single';switcher.textContent='한 쪽 보기';toolbar.append(switcher);
 const tabs=document.createElement('nav');tabs.className='cr-tabs cs-view-tabs';tabs.setAttribute('aria-label','학습 화면');
 for(const [id,label]of [['explain','설명'],['lab','실험'],['quiz','문제'],['source','원문']]){const b=document.createElement('button');b.type='button';b.dataset.view=id;b.textContent=label;b.setAttribute('aria-pressed',String(id===view));tabs.append(b);}section.prepend(tabs);
 const stream=document.createElement('div');stream.className='cr-stream';
 for(let n=1;n<=state.count;n++){
  const t=document.createElement('template');t.innerHTML=originalHTML(c,ms,n);const sheet=t.content.firstElementChild,prefix='cr-'+n+'-';sheet.className='cr-sheet';sheet.dataset.page=n;sheet.dataset.prefix=prefix;
  for(const el of sheet.querySelectorAll('[id]')){el.dataset.originalId=el.id;el.id=prefix+el.id;}
  for(const el of sheet.querySelectorAll('[for]'))el.htmlFor=prefix+el.htmlFor;
  const lesson=sheet.querySelector('.cs-lesson');lesson.dataset.prefix=prefix;lesson.dataset.page=n;
  const mark=document.createElement('span');mark.className='cr-page-number';mark.textContent='PDF '+n+' / '+state.count;lesson.querySelector('.cs-pageheading>div').prepend(mark);stream.append(sheet);
 }
 section.append(stream);return section.outerHTML;
};
CS.bind=function(c,ms){
 observer?.disconnect();sheets=[];current=null;course=c;materials=ms;
 const reader=document.querySelector('.continuous-reader');document.body.classList.toggle('reading-wide',!!document.querySelector('.cs-reader')||!document.body.classList.contains('lib-view'));
 if(!reader){originalBind(c,ms);const toolbar=document.querySelector('.cs-reader>.cs-toolbar');if(toolbar){const b=document.createElement('button');b.type='button';b.className='s-btn';b.textContent='이어 읽기';b.onclick=()=>{localStorage.setItem(preference,'continuous');dispatchEvent(new HashChangeEvent('hashchange'));};toolbar.append(b);}return;}
 const state=CS.info(c,ms);view='explain';try{view=JSON.parse(localStorage.getItem('study-reader-views-v1'))?.[c.id+':'+state.m.id+':'+state.n]||(localStorage.getItem(LAST_VIEW)==='source'?'source':'explain');}catch{}sheets=[...reader.querySelectorAll('.cr-sheet')];
 for(const sheet of sheets){const n=+sheet.dataset.page;originalBind(c,ms,sheet,n);const lesson=sheet.querySelector('.cs-lesson'),lab=sheet.querySelector('[data-original-id=cs-interactive]');if(lab&&window.PLLab.mode(state.m.chapter,n))lab.innerHTML='<section class="pl-lab"></section>';sheet.views=window.CourseViews.prepare(lesson,c.id+':'+state.m.id+':'+n);sheet.views.buttons.lab.disabled=!window.PLLab.mode(state.m.chapter,n);}
 const chapter=reader.querySelector('#cs-chapter'),page=reader.querySelector('#cs-page');
 chapter.onchange=()=>{location.hash=`#/course/${c.id}/textbook/${encodeURIComponent(chapter.value)}/1`;};
 function jump(n){const s=sheets[n-1];if(s){if(s.hidden)select('explain');activate(s);s.scrollIntoView({block:'start',behavior:'instant'});}}
 page.onchange=()=>jump(+page.value);reader.querySelector('#cs-previous').onclick=()=>jump(Math.max(1,+page.value-1));reader.querySelector('#cs-next').onclick=()=>jump(Math.min(state.count,+page.value+1));
 reader.querySelector('[data-read-mode]').onclick=()=>{localStorage.setItem(preference,'single');location.hash=`#/course/${c.id}/textbook/${state.m.id}/${page.value}`;dispatchEvent(new HashChangeEvent('hashchange'));};
 function select(id){view=id;try{localStorage.setItem(LAST_VIEW,id==='source'?'source':'explain');}catch{}if(current&&!current.views.buttons[id].disabled)current.views.select(id,true);for(const s of sheets){s.hidden=id==='quiz'&&s.views.buttons.quiz.disabled;s.views.select(id,false);const pane=s.querySelector('.cs-view-panel:not([hidden])');if(s.views.buttons[id].disabled){for(const p of s.querySelectorAll('.cs-view-panel'))p.hidden=true;let empty=s.querySelector('.cr-empty');if(!empty){empty=document.createElement('p');empty.className='cr-empty s-muted';s.querySelector('.cs-lesson').append(empty);}empty.textContent=id==='lab'?'이 쪽에는 실험이 없습니다.':'이 쪽에는 문제가 없습니다.';empty.hidden=false;}else s.querySelector('.cr-empty')?.setAttribute('hidden','');}
  reader.querySelectorAll('.cr-tabs [data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===id)));if(current)mountLab(current);window.Notebook?.refresh();window.dispatchEvent(new CustomEvent('continuous-reader-view',{detail:{view:id}}));
 }
 function navigate(n,id,allowEmpty=false){const sheet=sheets[n-1];if(!sheet||sheet.views.buttons[id]?.disabled&&!allowEmpty)return;activate(sheet);const lesson=sheet.querySelector('.cs-lesson');if(window.ReaderLinks)window.ReaderLinks.transition(lesson,id,()=>select(id));else{const top=sheet.getBoundingClientRect().top;select(id);window.scrollBy(0,sheet.getBoundingClientRect().top-top);}}
 window.ContinuousReader.navigate=navigate;
 reader.querySelectorAll('.cr-tabs [data-view]').forEach(b=>b.onclick=()=>{if(current)navigate(+current.dataset.page,b.dataset.view,true);});
 function mountLab(sheet){if(view!=='lab')return;const root=sheet.querySelector('[data-original-id=cs-interactive]');if(root&&!root.dataset.mounted){root.dataset.mounted='true';window.PLLab.mount(root,state.m.chapter,+sheet.dataset.page,(key,result)=>CS.saveLab(c,ms,+sheet.dataset.page,key,result));}}
 function activate(sheet){if(current===sheet)return;const old=current?.querySelector('#notebook-ink');if(old){const copy=old.cloneNode(true);copy.removeAttribute('id');copy.classList.add('cr-ink-preview');copy.style.pointerEvents='none';current.querySelector('.cs-lesson').append(copy);}current=sheet;CS.remember(c,ms,+sheet.dataset.page);sheet.querySelector('.cr-ink-preview')?.remove();window.ContinuousReader.active=sheet.querySelector('.cs-lesson');page.value=sheet.dataset.page;reader.querySelector('.cr-tabs [data-view=quiz]').hidden=sheet.views.buttons.quiz.disabled;reader.querySelector('#cs-previous').disabled=+page.value===1;reader.querySelector('#cs-next').disabled=+page.value===state.count;mountLab(sheet);window.Notebook?.refresh();window.dispatchEvent(new CustomEvent('continuous-reader-page',{detail:{page:+sheet.dataset.page}}));}
 function renderPage(n,prefix){const t=document.createElement('template');t.innerHTML=originalHTML(c,ms,n);const sheet=t.content.firstElementChild;sheet.className='cr-sheet';sheet.dataset.page=n;sheet.dataset.prefix=prefix;for(const el of sheet.querySelectorAll('[id]')){el.dataset.originalId=el.id;el.id=prefix+el.id;}for(const el of sheet.querySelectorAll('[for]'))el.htmlFor=prefix+el.htmlFor;const lesson=sheet.querySelector('.cs-lesson');lesson.dataset.prefix=prefix;lesson.dataset.page=n;return{sheet,lesson,bind(){originalBind(c,ms,sheet,n);return window.CourseViews.prepare(lesson,c.id+':'+state.m.id+':'+n);}};}
 Object.assign(window.ContinuousReader,{course:c,materials:ms,chapter:state.m.id,count:state.count,jump,select,renderPage,view:()=>view,page:()=>current?+current.dataset.page:state.n,sheet:n=>sheets[n-1]});
 observer=new IntersectionObserver(entries=>{const visible=sheets.filter(s=>{const r=s.getBoundingClientRect();return r.bottom>140&&r.top<innerHeight;});const next=visible.find(s=>s.getBoundingClientRect().top<=180&&s.getBoundingClientRect().bottom>180)||visible[0];if(next)activate(next);},{rootMargin:'-120px 0px -40% 0px',threshold:0});sheets.forEach(s=>observer.observe(s));
 if(view==='quiz'&&sheets[state.n-1].views.buttons.quiz.disabled)view='explain';select(view);activate(sheets[state.n-1]);requestAnimationFrame(()=>requestAnimationFrame(()=>jump(state.n)));window.dispatchEvent(new CustomEvent('continuous-reader-ready'));
};
window.ContinuousReader={active:null,getView:()=>view};
let resizing;window.addEventListener('resize',()=>{const active=current;if(!active?.isConnected)return;clearTimeout(resizing);resizing=setTimeout(()=>{document.querySelectorAll('.cr-ink-preview').forEach(n=>n.remove());active.scrollIntoView({block:'start',behavior:'instant'});},100);});
new MutationObserver(()=>{if(!document.querySelector('.cs-reader')){document.body.classList.remove('reading-wide');window.ContinuousReader.active=null;}}).observe(document.querySelector('#school-app'),{childList:true});
window.dispatchEvent(new HashChangeEvent('hashchange'));
})();
