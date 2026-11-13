/* 원문 모드: 이어 읽기에서 '원문' 화면을 고르면 원본 쪽 이미지만 PDF처럼 위아래로 이어 보여 준다.
 * 오른쪽 아래에 '현재 쪽 / 전체 쪽'과 [설명][퀴즈]를 두고, 누르면 그 쪽의 설명·퀴즈를 패널로 연다(원문 스크롤 위치는 그대로).
 * 교재 화면(설명·실험·문제)에서도 쪽 번호와 [원문 보기]를 보여 준다. continuous-reader.js가 제공하는 ContinuousReader API를 쓴다. */
(function(){
'use strict';
const pager=document.createElement('div');pager.id='sr-pager';pager.hidden=true;
pager.innerHTML='<button type="button" class="sr-count" title="눌러서 쪽 이동"></button><form class="sr-jump" hidden><input type="number" inputmode="numeric" min="1" aria-label="이동할 쪽 번호"><button type="submit">이동</button></form><button type="button" data-sr="explain">설명</button><button type="button" data-sr="quiz">퀴즈</button><button type="button" data-sr="source">원문 보기</button>';
const panel=document.createElement('aside');panel.id='sr-panel';panel.hidden=true;panel.setAttribute('aria-label','이 쪽의 설명과 퀴즈');
panel.innerHTML='<div class="sr-head"><strong class="sr-title"></strong><div class="sr-tabs" role="tablist"><button type="button" role="tab" data-tab="explain">설명</button><button type="button" role="tab" data-tab="quiz">퀴즈</button></div><button type="button" class="sr-close">닫기</button></div><div class="sr-body"></div><div class="sr-foot"><a class="sr-pdf" target="_blank" rel="noopener">원본 PDF 파일 열기 ↗</a><button type="button" class="sr-book">교재 화면으로</button></div>';
document.body.append(pager,panel);
const $=(root,s)=>root.querySelector(s),body=$(panel,'.sr-body');
let CR=null,page=1,tab='explain',want='explain',shown=0,dirty=false,follow=null;

const reader=()=>document.querySelector('.continuous-reader');
const ready=()=>{const r=reader();return !!(CR&&CR.count&&r&&r.getClientRects().length&&CR.sheet(1)?.isConnected&&/^#\/course\//.test(location.hash));};
const hasQuiz=n=>!!CR.sheet(n)?.querySelector('[data-original-id="cs-quiz"]');
const chapter=()=>(window.COURSE_CHAPTERS||[]).find(c=>c.id===CR.chapter);
function update(){
  if(!ready()){pager.hidden=true;close();document.body.classList.remove('sr-source');return;}
  const source=CR.view()==='source';
  reader().classList.toggle('cr-source-mode',source);document.body.classList.toggle('sr-source',source);
  if(source)for(const d of reader().querySelectorAll('.cr-sheet .cs-source:not([open])'))d.open=true;
  reader().style.setProperty('--sr-ratio',chapter()?.imageRatio||'4/3');  // 아직 안 불러온 쪽 이미지 자리(16:9 슬라이드 등)
  pager.hidden=!panel.hidden;$(pager,'.sr-count').textContent=page+' / '+CR.count;
  for(const k of ['explain','quiz'])$(pager,`[data-sr=${k}]`).hidden=!source;
  $(pager,'[data-sr=quiz]').disabled=!hasQuiz(page);$(pager,'[data-sr=source]').hidden=source;
  if(!source&&!panel.hidden)close();
}
function render(n){
  const copy=CR.renderPage(n,'sp-');body.replaceChildren(copy.sheet);const views=copy.bind();
  shown=n;const heading=copy.lesson.querySelector('.cs-pageheading h2,.cs-pageheading h3');
  $(panel,'.sr-title').textContent=`${n} / ${CR.count}쪽 · ${heading?heading.textContent.trim():''}`;
  const ch=chapter();const pdf=$(panel,'.sr-pdf');pdf.hidden=!ch?.url;if(ch?.url)pdf.href=ch.url+'#page='+n;
  panel.views=views;show(want);
}
function show(t){
  if(t==='quiz'&&!hasQuiz(shown))t='explain';tab=t;
  panel.views?.select(t,false);
  for(const b of panel.querySelectorAll('.sr-tabs [data-tab]')){b.setAttribute('aria-selected',String(b.dataset.tab===t));b.disabled=b.dataset.tab==='quiz'&&!hasQuiz(shown);}
  body.scrollTop=0;
}
// 패널을 열고 닫으면 원문 폭이 바뀌므로, 보던 쪽의 같은 위치(비율)가 화면에 남도록 스크롤을 맞춘다.
function keepPlace(change){
  const s=ready()?CR.sheet(page):null;if(!s){change();return;}
  const r=s.getBoundingClientRect(),f=r.height?(0-r.top)/r.height:0;change();
  const r2=s.getBoundingClientRect();window.scrollBy(0,r2.top+f*r2.height);
}
function open(t){tab=want=t;keepPlace(()=>{panel.hidden=false;document.body.classList.add('sr-panel-open');});render(page);update();$(panel,'.sr-close').focus({preventScroll:true});}
function close(){clearTimeout(follow);if(panel.hidden)return;keepPlace(()=>{panel.hidden=true;document.body.classList.remove('sr-panel-open');});body.replaceChildren();panel.views=null;shown=0;pager.hidden=!ready();}
function toBook(){
  close();if(!ready())return;
  const reload=dirty;dirty=false;
  if(reload){history.replaceState(null,'',`#/course/${encodeURIComponent(CR.course.id)}/textbook/${encodeURIComponent(CR.chapter)}/${page}`);CR.select('explain');window.dispatchEvent(new HashChangeEvent('hashchange'));return;}  // 패널에서 푼 퀴즈를 교재 화면에 다시 그려 반영
  window.ContinuousReader.navigate(page,'explain',true);
}

pager.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!ready())return;
  if(b.classList.contains('sr-count')){const f=$(pager,'.sr-jump'),i=$(f,'input');f.hidden=false;b.hidden=true;i.max=CR.count;i.value=page;i.focus();i.select();return;}
  if(b.dataset.sr==='source'){window.ContinuousReader.navigate(page,'source',true);return;}
  if(b.dataset.sr)open(b.dataset.sr);
});
const jumpForm=$(pager,'.sr-jump');
function endJump(){jumpForm.hidden=true;$(pager,'.sr-count').hidden=false;}
jumpForm.addEventListener('submit',e=>{e.preventDefault();const n=Math.round(+$(jumpForm,'input').value);endJump();if(ready()&&n>=1&&n<=CR.count)CR.jump(n);});
$(jumpForm,'input').addEventListener('blur',()=>setTimeout(endJump,150));
$(jumpForm,'input').addEventListener('keydown',e=>{if(e.key==='Escape')endJump();});
panel.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.tab){want=b.dataset.tab;show(want);}
  else if(b.classList.contains('sr-close'))close();
  else if(b.classList.contains('sr-book'))toBook();
});
panel.addEventListener('submit',()=>{dirty=true;},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close();});

addEventListener('continuous-reader-ready',()=>{CR=window.ContinuousReader;page=CR.page();close();update();});
addEventListener('continuous-reader-page',e=>{page=e.detail.page;update();clearTimeout(follow);if(!panel.hidden&&page!==shown)follow=setTimeout(()=>{if(!panel.hidden&&ready()&&page!==shown)render(page);},250);});
addEventListener('continuous-reader-view',()=>{if(CR?.view()!=='source')dirty=false;update();});
new MutationObserver(()=>{if(!reader())update();}).observe(document.getElementById('school-app')||document.body,{childList:true});
addEventListener('hashchange',()=>{update();setTimeout(update,300);});
})();
