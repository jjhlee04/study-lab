(function(){
'use strict';
const lists=new Map();let previous=null,lastList=null,sequence=0;
function refresh(){const nav=document.getElementById('cs-list'),chapter=document.getElementById('cs-chapter'),page=document.getElementById('cs-page');if(!nav||!chapter||!page){previous=null;lastList=null;return;}if(nav===lastList)return;lastList=nav;const course=location.hash.split('/')[2],key=course+':'+chapter.value,now={key,page:page.value,course},changed=previous&&previous.course===course&&(previous.key!==key||previous.page!==now.page);previous=now;
nav.scrollTop=lists.get(key)||0;nav.scrollLeft=0;nav.addEventListener('scroll',()=>{lists.set(key,nav.scrollTop);if(nav.scrollLeft)nav.scrollLeft=0;},{passive:true});
if(changed){const id=++sequence;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(id!==sequence||!nav.isConnected)return;nav.scrollTop=lists.get(key)||0;nav.scrollLeft=0;if(matchMedia('(max-width:1000px)').matches)nav.closest('.cs-toc').open=false;const anchor=document.querySelector('.cs-reader>p.s-muted')||document.querySelector('.cs-layout');if(anchor)window.scrollTo({top:Math.max(0,window.scrollY+anchor.getBoundingClientRect().top-16),behavior:'instant'});}));}
}
new MutationObserver(refresh).observe(document.getElementById('school-app'),{childList:true});refresh();
})();
