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
// A tap opens tools; dragging the compact button only changes its position.
const ICON_POSITION='study-pen-button-position-v1';let iconPosition=null,gesture=null,suppressClickUntil=0;
try{const p=JSON.parse(localStorage.getItem(ICON_POSITION));if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))iconPosition={x:Math.max(0,Math.min(1,p.x)),y:Math.max(0,Math.min(1,p.y))};}catch{}
function iconBounds(){const v=window.visualViewport,margin=12,size=40,topInset=parseFloat(getComputedStyle(reveal).scrollMarginTop)||0;const left=(v?.offsetLeft||0)+margin,top=(v?.offsetTop||0)+margin+topInset;return{left,top,width:Math.max(0,(v?.width||innerWidth)-size-margin*2),height:Math.max(0,(v?.height||innerHeight)-size-margin*2-topInset)};}
function placeIcon(x,y){const b=iconBounds();reveal.style.left=Math.max(b.left,Math.min(b.left+b.width,x))+'px';reveal.style.top=Math.max(b.top,Math.min(b.top+b.height,y))+'px';reveal.style.right='auto';reveal.style.bottom='auto';}
function restoreIcon(){if(gesture||!iconPosition)return;const b=iconBounds();placeIcon(b.left+iconPosition.x*b.width,b.top+iconPosition.y*b.height);}
function saveIcon(){const b=iconBounds(),r=reveal.getBoundingClientRect();iconPosition={x:b.width?(r.left-b.left)/b.width:0,y:b.height?(r.top-b.top)/b.height:0};try{localStorage.setItem(ICON_POSITION,JSON.stringify(iconPosition));}catch{}}
reveal.title='필기 도구 · 끌어서 이동';reveal.setAttribute('aria-label','필기 도구 펼치기 · 끌어서 위치 이동');
reveal.addEventListener('pointerdown',e=>{if(e.button!==0||gesture)return;const r=reveal.getBoundingClientRect();gesture={id:e.pointerId,x:e.clientX,y:e.clientY,left:r.left,top:r.top,moved:false};reveal.setPointerCapture(e.pointerId);},true);
reveal.addEventListener('pointermove',e=>{if(gesture?.id!==e.pointerId)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(!gesture.moved&&Math.hypot(dx,dy)<7)return;gesture.moved=true;e.preventDefault();placeIcon(gesture.left+dx,gesture.top+dy);reveal.classList.add('pen-icon-dragging');},true);
function endIconGesture(e,cancelled=false){if(gesture?.id!==e.pointerId)return;const g=gesture;gesture=null;reveal.classList.remove('pen-icon-dragging');if(g.moved){e.preventDefault();e.stopImmediatePropagation();suppressClickUntil=performance.now()+600;if(cancelled){if(iconPosition)restoreIcon();else placeIcon(g.left,g.top);}else saveIcon();}if(reveal.hasPointerCapture(e.pointerId))reveal.releasePointerCapture(e.pointerId);}
reveal.addEventListener('pointerup',e=>endIconGesture(e),true);reveal.addEventListener('pointercancel',e=>endIconGesture(e,true),true);
reveal.addEventListener('lostpointercapture',e=>{if(gesture?.id===e.pointerId)endIconGesture(e,true);},true);
reveal.addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
reveal.addEventListener('keydown',e=>{const d={ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]}[e.key];if(!d)return;e.preventDefault();const r=reveal.getBoundingClientRect();placeIcon(r.left+d[0],r.top+d[1]);saveIcon();});
reveal.addEventListener('contextmenu',e=>e.preventDefault());reveal.addEventListener('dragstart',e=>e.preventDefault());window.addEventListener('resize',restoreIcon);window.visualViewport?.addEventListener('resize',restoreIcon);window.visualViewport?.addEventListener('scroll',restoreIcon);restoreIcon();
// Learning controls appear while scrolling without changing document layout.
const AUTO_TABS='.continuous-reader>.cr-tabs,.cs-reader:not(.continuous-reader) .cs-view-tabs,.workspace .tabs';
let visibleTabs=null,tabsTimer=null,heldTabPointer=null,keyboardTabs=false;
function prepareAutoTabs(){document.querySelectorAll(AUTO_TABS).forEach(nav=>{nav.classList.add('reader-auto-tabs');window.ReaderQuickMenu?.ensure(nav);});}
function activeTabs(){return [...document.querySelectorAll(AUTO_TABS)].find(nav=>nav.getClientRects().length);}
function tabsFor(target){return target instanceof Element?target.closest('.reader-auto-tabs'):null;}
function scheduleTabsHide(){clearTimeout(tabsTimer);tabsTimer=setTimeout(()=>{if(!visibleTabs)return;if(window.ReaderQuickMenu?.isOpen()||heldTabPointer!==null||keyboardTabs&&visibleTabs.contains(document.activeElement))return;visibleTabs.classList.remove('reader-tabs-visible');visibleTabs=null;},2000);}
function showTabs(nav=activeTabs()){if(!nav)return;if(visibleTabs&&visibleTabs!==nav)visibleTabs.classList.remove('reader-tabs-visible');visibleTabs=nav;nav.classList.add('reader-tabs-visible');scheduleTabsHide();}
window.addEventListener('scroll',()=>showTabs(),{passive:true});
document.addEventListener('pointerdown',e=>{keyboardTabs=false;const nav=tabsFor(e.target);if(nav){heldTabPointer=e.pointerId;showTabs(nav);}else if(visibleTabs)scheduleTabsHide();},true);
function releaseTabs(e){if(heldTabPointer!==e.pointerId)return;heldTabPointer=null;if(visibleTabs)scheduleTabsHide();}
document.addEventListener('pointerup',releaseTabs,true);document.addEventListener('pointercancel',releaseTabs,true);
document.addEventListener('keydown',e=>{if(e.key==='Tab')keyboardTabs=true;const nav=tabsFor(e.target);if(nav){keyboardTabs=true;showTabs(nav);}},true);
document.addEventListener('focusin',e=>{const nav=tabsFor(e.target);if(nav&&keyboardTabs)showTabs(nav);});
document.addEventListener('focusout',()=>{if(visibleTabs)scheduleTabsHide();});
document.addEventListener('click',e=>{const nav=tabsFor(e.target);if(nav)showTabs(nav);},true);
for(const id of ['school-app','panel']){const el=document.getElementById(id);if(el)new MutationObserver(prepareAutoTabs).observe(el,{childList:true});}
window.addEventListener('reader-menu-toggle',e=>{if(e.detail.open)showTabs(e.detail.nav);else scheduleTabsHide();});
window.addEventListener('pagehide',()=>{clearTimeout(tabsTimer);heldTabPointer=null;});prepareAutoTabs();
})();
