(function(){
'use strict';
const KEY='study-text-selection-v1';let allowed=localStorage.getItem(KEY)==='true';
const setting=document.createElement('label');setting.className='notebook-check';setting.innerHTML='<span>본문 선택·복사 허용</span><input id="reader-copy" type="checkbox">';document.querySelector('#notebook-settings section').prepend(setting);const input=setting.querySelector('input');
function apply(){document.documentElement.classList.toggle('selection-locked',!allowed);input.checked=allowed;if(!allowed)getSelection()?.removeAllRanges();}input.onchange=()=>{allowed=input.checked;localStorage.setItem(KEY,String(allowed));apply();};apply();
function editable(target){return target instanceof Element&&!!target.closest('input,textarea,[contenteditable=true]');}
for(const type of ['selectstart','copy','cut','dragstart'])document.addEventListener(type,e=>{const tools=e.target instanceof Element&&e.target.closest('#notebook-tools');if(tools||(!allowed&&!editable(e.target)))e.preventDefault();});
document.addEventListener('click',e=>{const b=e.target instanceof Element&&e.target.closest('#s-menu,#menu');if(!b)return;const library=b.id==='s-menu';if(library&&!document.body.classList.contains('reading-wide'))return;e.preventDefault();e.stopImmediatePropagation();const cls=library?'s-menu-open':'menu-open';document.body.classList.toggle(cls);b.setAttribute('aria-expanded',String(document.body.classList.contains(cls)));},true);
const bar=document.querySelector('#notebook-tools'),button=document.createElement('button');button.id='notebook-collapse';button.type='button';button.textContent='접기';button.title='필기 도구 접기';button.onclick=()=>{window.Notebook.setMode('move');localStorage.setItem('study-tools-collapsed-v1','true');window.NotebookOptions.hide();};bar.append(button);
const reveal=document.querySelector('#notebook-reveal');reveal.innerHTML='<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="m5 16 11-11 3 3L8 19l-4 1zM14 7l3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';reveal.title='필기 도구 펼치기';reveal.setAttribute('aria-label','필기 도구 펼치기');
reveal.addEventListener('click',()=>localStorage.setItem('study-tools-collapsed-v1','false'));if(localStorage.getItem('study-tools-collapsed-v1')==='true')window.NotebookOptions.hide();
// A collapsed toolbar remains reachable, including after automatic toolbar hiding.
const watch=new MutationObserver(()=>{reveal.hidden=!bar.hidden;});watch.observe(bar,{attributes:true,attributeFilter:['hidden']});reveal.hidden=!bar.hidden;
})();
