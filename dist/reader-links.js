(function(){
'use strict';
const SPECS=[['explain','설명'],['source','원문'],['quiz','퀴즈']],UNIX={explain:'learn',source:'original',quiz:'quiz'};
const positions=new Map();let transaction=0,pendingUpdate=false;
function currentView(lesson){return lesson.closest('.continuous-reader')?window.ContinuousReader.getView():lesson.dataset.readerView||'explain';}
function key(lesson){return lesson.dataset.readerKey;}
function offset(lesson){return -lesson.getBoundingClientRect().top;}
function topGap(){return 64+(parseFloat(getComputedStyle(document.querySelector('#notebook-reveal')).scrollMarginTop)||0);}
function record(lesson,view){positions.set(key(lesson)+':'+view,offset(lesson));}
function restore(lesson,id,apply){const token=++transaction;apply();const saved=positions.get(key(lesson)+':'+id),relative=saved??-topGap();
 function place(){if(token!==transaction||!lesson.isConnected)return;const top=scrollY+lesson.getBoundingClientRect().top+relative;window.scrollTo({top:Math.max(0,top),behavior:'instant'});window.Notebook?.refresh();}
 place();requestAnimationFrame(()=>requestAnimationFrame(place));
 if(id==='source'){const source=lesson.querySelector('.cs-source');if(source)source.open=true;const images=[...lesson.querySelectorAll('.cs-source img,.original-grid img')];images.forEach(img=>img.loading='eager');if(images.length)Promise.allSettled(images.map(img=>img.decode())).then(place);}
 updateAll();
}
function transition(lesson,id,apply){const old=currentView(lesson);if(old===id)return;record(lesson,old);restore(lesson,id,apply);}
function navigate(lesson,id){if(!lesson?.readerViews||lesson.readerViews.buttons[id]?.disabled)return;if(lesson.closest('.continuous-reader'))window.ContinuousReader.navigate(+lesson.dataset.page,id);else transition(lesson,id,()=>lesson.readerViews.select(id));}
function makeLinks(lesson,location,unix=false){const nav=document.createElement('nav');nav.className='reader-page-links reader-links-'+location;nav.setAttribute('aria-label',location==='top'?'같은 쪽 학습 화면':'이 쪽 이어서 공부하기');for(const[id,label]of SPECS){const b=document.createElement('button');b.type='button';b.dataset.readerGo=id;b.textContent=label;b.onclick=()=>{if(unix)document.querySelector('.workspace [data-tab="'+UNIX[id]+'"]').click();else navigate(lesson,id);};nav.append(b);}return nav;}
function mount(lesson){if(!lesson.readerViews||lesson.dataset.linksReady)return;lesson.dataset.linksReady='true';lesson.querySelector('.cs-pageheading>div')?.append(makeLinks(lesson,'top'));for(const pane of Object.values(lesson.readerViews.panes))pane.append(makeLinks(lesson,'bottom'));}
function updateLinks(host,view,hasQuiz){host.querySelectorAll('.reader-page-links [data-reader-go]').forEach(b=>{const id=b.dataset.readerGo,missing=id==='quiz'&&!hasQuiz;b.hidden=missing;b.disabled=id===view;b.setAttribute('aria-pressed',String(id===view));b.textContent=SPECS.find(([v])=>v===id)[1];b.title='같은 쪽의 '+b.textContent;});}
function unixContext(){const m=location.hash.match(/^#(w\d+)\/(\d+)\/(\w+)/);return m?{key:'unix:'+m[1]+':'+m[2],view:Object.keys(UNIX).find(k=>UNIX[k]===m[3])||m[3]}:null;}
function mountUnix(){if(document.body.classList.contains('lib-view'))return;const panel=document.querySelector('#panel'),ctx=unixContext();if(!panel||!ctx)return;panel.dataset.readerKey=ctx.key;let heading=document.querySelector('.workspace .heading .reader-page-links');if(!heading){heading=makeLinks(panel,'top',true);document.querySelector('.workspace .heading>div')?.append(heading);}if(!panel.querySelector(':scope>.reader-page-links'))panel.append(makeLinks(panel,'bottom',true));const hasQuiz=!document.querySelector('.workspace [data-tab=quiz]').hidden;updateLinks(document.querySelector('.workspace .heading'),ctx.view,hasQuiz);updateLinks(panel,ctx.view,hasQuiz);}
function updateAll(){document.querySelectorAll('.cs-lesson').forEach(lesson=>{mount(lesson);if(lesson.readerViews)updateLinks(lesson,currentView(lesson),!lesson.readerViews.buttons.quiz.disabled);});mountUnix();}
function schedule(){if(pendingUpdate)return;pendingUpdate=true;requestAnimationFrame(()=>{pendingUpdate=false;updateAll();});}
// Existing Unix tabs keep their original renderer and progress keys.
document.addEventListener('click',e=>{const button=e.target instanceof Element&&e.target.closest('.workspace [data-tab]');if(!button||document.body.classList.contains('lib-view'))return;const ctx=unixContext(),panel=document.querySelector('#panel'),id=Object.keys(UNIX).find(k=>UNIX[k]===button.dataset.tab);if(!ctx||!id||ctx.view===id)return;panel.dataset.readerKey=ctx.key;record(panel,ctx.view);const token=++transaction;queueMicrotask(()=>{if(token!==transaction)return;restore(panel,id,()=>{});});},true);
// Cancel late image-related restoration as soon as the user takes over.
for(const name of ['wheel','touchmove','pointerdown','keydown'])window.addEventListener(name,()=>transaction++,{capture:true,passive:true});
document.addEventListener('reader-view-change',schedule);for(const id of ['school-app','panel']){const host=document.getElementById(id);if(host)new MutationObserver(schedule).observe(host,{childList:true});}
window.addEventListener('hashchange',()=>{transaction++;schedule();});window.ReaderLinks={navigate,transition};updateAll();
})();
