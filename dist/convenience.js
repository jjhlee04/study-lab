/* 사용자 편의 기능: 상단 도구(검색·북마크·필기·테마·설정), PC 필기 막대 자동 숨김, 단축키,
 * 홈 대시보드, 목차 필터, 북마크, 전체 검색, 다크 모드, 전체 백업/복원.
 * 저장 키: study-convenience-v1 (기존 저장 키는 읽기만 하며, 백업 복원 때만 사용자가 선택해 덮어씀) */
(function(){
'use strict';
const KEY='study-convenience-v1';
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const readJSON=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')||{};}catch{return {};}};
let st={toolbar:'auto',theme:'auto',lessonOnly:true,bookmarks:[]};
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v)st={...st,...v};}catch{}
if(!Array.isArray(st.bookmarks))st.bookmarks=[];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st));}catch{}};
const isPC=()=>matchMedia('(pointer: fine)').matches&&!matchMedia('(any-pointer: coarse)').matches;
const svg=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const ICON={search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',star:'<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z"/>',pen:'<path d="m5 16 11-11 3 3L8 19l-4 1zM14 7l3 3"/>',moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>'};
const COURSE_NAMES=()=>{const lib=readJSON('study-library-v1');const m={unix:'유닉스 프로그래밍','programming-languages':'프로그래밍언어론','discrete-math':'이산수학','data-centric-ml':'데이터중심머신러닝','data-communication':'데이터통신'};for(const c of lib.courses||[])m[c.id]=c.name;return m;};

/* ── 테마 ── */
function applyTheme(){const dark=st.theme==='dark'||(st.theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',applyTheme);applyTheme();

/* ── A. 필기 도구 막대 ── */
let penOpen=false;
function toolbarAuto(){return st.toolbar==='button'||(st.toolbar==='auto'&&isPC());}
function initToolbar(){const NO=window.NotebookOptions;if(!NO)return;if(st.toolbar==='always'){if(NO.isHidden())NO.show();return;}if(toolbarAuto()){NO.hide(true);penOpen=false;}}
function togglePen(force){const NO=window.NotebookOptions;if(!NO)return;const open=force??NO.isHidden();if(open){NO.show();window.Notebook?.setMode('pen');penOpen=true;}else{window.Notebook?.setMode('move');if(toolbarAuto())NO.hide(true);penOpen=false;}refreshBars();}

/* ── 상단 도구 ── */
function barHTML(){const pen=toolbarAuto();return `<div class="cv-bar" role="toolbar" aria-label="편의 도구">
<button type="button" data-cv="search" title="전체 검색 (/)">${svg(ICON.search)}<span>검색</span></button>
<button type="button" data-cv="marks" title="북마크">${svg(ICON.star)}<span>북마크</span></button>
${pen?`<button type="button" data-cv="pen" aria-pressed="${penOpen}" title="필기 도구 열기/닫기 (P, Esc)">${svg(ICON.pen)}<span>필기</span></button>`:''}
<button type="button" data-cv="theme" title="밝게/어둡게">${svg(ICON.moon)}<span>테마</span></button>
<button type="button" data-cv="settings" title="편의 설정·백업">${svg(ICON.gear)}<span>설정</span></button></div>`;}
function bindBar(bar){bar.querySelector('[data-cv=search]').onclick=openSearch;bar.querySelector('[data-cv=marks]').onclick=openMarks;bar.querySelector('[data-cv=theme]').onclick=()=>{const dark=document.documentElement.dataset.theme==='dark';st.theme=dark?'light':'dark';save();applyTheme();};bar.querySelector('[data-cv=settings]').onclick=openSettings;const p=bar.querySelector('[data-cv=pen]');if(p)p.onclick=()=>togglePen();}
function refreshBars(){qa('.cv-bar').forEach(b=>{const wrap=document.createElement('div');wrap.innerHTML=barHTML();const nb=wrap.firstElementChild;b.replaceWith(nb);bindBar(nb);});}
function ensureBars(){
  const top=q('#school-app .s-topbar');if(top&&!top.querySelector('.cv-bar')){const w=document.createElement('div');w.innerHTML=barHTML();const b=w.firstElementChild;const last=top.lastElementChild;top.insertBefore(b,last&&last.matches('button,a')?last:null);bindBar(b);}
  const hd=q('.workspace > header');if(hd&&!hd.querySelector('.cv-bar')){const w=document.createElement('div');w.innerHTML=barHTML();const b=w.firstElementChild;hd.insertBefore(b,hd.querySelector('.page-controls'));bindBar(b);}
}

/* ── 공용 대화상자 ── */
function dialog(id,title,body){let d=q('#'+id);if(!d){d=document.createElement('dialog');d.id=id;d.className='cv-dialog';document.body.append(d);d.addEventListener('click',ev=>{if(ev.target===d)d.close();});d.addEventListener('keydown',ev=>{if(ev.key==='Escape'){ev.preventDefault();d.close();}});}
  d.innerHTML=`<div class="cv-dialog-head"><h2>${title}</h2><button type="button" class="s-btn" data-close>닫기</button></div><div class="cv-dialog-body">${body}</div>`;d.querySelector('[data-close]').onclick=()=>d.close();if(!d.open)d.showModal();return d;}

/* ── B5. 전체 검색 ── */
let index=null;
function buildIndex(){if(index)return index;index=[];const N=COURSE_NAMES();
  for(const l of window.LESSONS||[])index.push({course:N.unix||'유닉스',title:`${l.unit} ${l.page}쪽 · ${l.title}`,href:`#${l.unit}/${l.page}/learn`,text:[l.title,l.original,(l.explain||[]).join(' ')].join('\n')});
  for(const ch of window.COURSE_CHAPTERS||[]){const cid=ch.course||'programming-languages';for(const p of ch.pages){if(p.kind==='outside')continue;index.push({course:N[cid]||cid,title:`${ch.title.split('·')[0].trim()} ${p.page}쪽 · ${p.title}`,href:`#/course/${encodeURIComponent(cid)}/textbook/${encodeURIComponent(ch.id)}/${p.page}`,text:[p.title,p.text,p.explanation,p.lesson?.example||''].join('\n')});}}
  return index;}
function openSearch(){const d=dialog('cv-search','전체 검색',`<input type="search" id="cv-q" placeholder="모든 과목의 제목·원문·해설에서 찾기 (예: CRC, 비둘기집, fork)" autocomplete="off"><p class="cv-small" id="cv-count"></p><ol id="cv-results" class="cv-results"></ol>`);
  const inp=d.querySelector('#cv-q'),out=d.querySelector('#cv-results'),cnt=d.querySelector('#cv-count');
  const run=()=>{const t=inp.value.trim().toLowerCase();if(t.length<2){out.innerHTML='';cnt.textContent='두 글자 이상 입력하세요.';return;}const idx=buildIndex(),res=[];for(const r of idx){const low=r.text.toLowerCase(),i=low.indexOf(t);if(i<0&&!r.title.toLowerCase().includes(t))continue;const j=Math.max(0,i);const snip=r.text.slice(Math.max(0,j-40),j+t.length+60).replace(/\s+/g,' ');res.push({...r,snip,score:(r.title.toLowerCase().includes(t)?2:0)+(i>=0?1:0)});}
    res.sort((a,b)=>b.score-a.score);cnt.textContent=`${res.length}개 찾음${res.length>80?' (앞 80개 표시)':''}`;
    const hl=s=>{const k=s.toLowerCase().indexOf(t);return k<0?e(s):e(s.slice(0,k))+'<mark>'+e(s.slice(k,k+t.length))+'</mark>'+e(s.slice(k+t.length));};
    out.innerHTML=res.slice(0,80).map(r=>`<li><a href="${r.href}"><b>${e(r.course)}</b> · ${hl(r.title)}<small>…${hl(r.snip)}…</small></a></li>`).join('');qa('a',out).forEach(a=>a.onclick=()=>d.close());};
  inp.oninput=run;inp.focus();}

/* ── B4. 북마크 ── */
function currentPage(){const h=location.hash;let m=h.match(/^#(w\d+)\/(\d+)/);if(m){const l=(window.LESSONS||[]).find(x=>x.unit===m[1]&&x.page===+m[2]);return {key:`#${m[1]}/${m[2]}/learn`,course:'unix',title:l?`${l.unit} ${l.page}쪽 · ${l.title}`:h};}
  m=h.match(/^#\/course\/([^/]+)\/(textbook|home)(?:\/([^/]+)\/(\d+))?/);if(!m)return null;const cid=decodeURIComponent(m[1]);let mid=m[3]&&decodeURIComponent(m[3]),n=m[4]&&+m[4];
  if(!mid){const last=readJSON('course-study-v1').last?.[cid];if(!last)return null;mid=last.material;n=last.page;}
  const ch=(window.COURSE_CHAPTERS||[]).find(c=>c.id===mid);const p=ch?.pages[n-1];return {key:`#/course/${encodeURIComponent(cid)}/textbook/${encodeURIComponent(mid)}/${n}`,course:cid,title:`${ch?ch.title.split('·')[0].trim():mid} ${n}쪽 · ${p?.title||''}`};}
const isMarked=k=>st.bookmarks.some(b=>b.key===k);
function toggleMark(){const c=currentPage();if(!c)return;if(isMarked(c.key))st.bookmarks=st.bookmarks.filter(b=>b.key!==c.key);else st.bookmarks.unshift({...c,at:Date.now()});save();placeStar();}
function placeStar(){const c=currentPage();qa('.cv-star').forEach(x=>{if(!c||x.dataset.key!==c.key)x.remove();});if(!c)return;
  const host=q('#school-app:not([hidden]) .cs-lesson h2')||(q('#school-app')?.hidden!==false?q('.workspace .heading h1#title'):null);if(!host)return;
  let b=host.parentElement.querySelector('.cv-star');if(!b){b=document.createElement('button');b.type='button';b.className='cv-star';b.onclick=toggleMark;host.after(b);}
  const on=isMarked(c.key),state=c.key+'|'+on;if(b.dataset.state===state)return;b.dataset.state=state;b.dataset.key=c.key;b.setAttribute('aria-pressed',String(on));b.title=on?'북마크 해제 (B)':'북마크 추가 (B)';b.innerHTML=svg(ICON.star)+`<span>${on?'북마크됨':'북마크'}</span>`;}
function openMarks(){const N=COURSE_NAMES(),groups={};for(const b of st.bookmarks)(groups[b.course]??=[]).push(b);
  const d=dialog('cv-marks','북마크',st.bookmarks.length?Object.entries(groups).map(([c,list])=>`<h3>${e(N[c]||c)}</h3><ul class="cv-results">${list.map(b=>`<li><a href="${b.key}">${e(b.title)}</a><button type="button" class="s-btn ghost" data-del="${e(b.key)}">삭제</button></li>`).join('')}</ul>`).join(''):'<p>아직 북마크한 쪽이 없습니다. 각 쪽 제목 옆의 ☆ 버튼(또는 B 키)으로 추가하세요.</p>');
  qa('a',d).forEach(a=>a.onclick=()=>d.close());qa('[data-del]',d).forEach(x=>x.onclick=()=>{st.bookmarks=st.bookmarks.filter(b=>b.key!==x.dataset.del);save();placeStar();openMarks();});}

/* ── B3. 목차 필터 (학습 쪽만) ── */
function applyListFilter(){const list=q('#cs-list');if(!list)return;const m=location.hash.match(/^#\/course\/([^/]+)\/(?:textbook|home)(?:\/([^/]+))?/);const last=readJSON('course-study-v1').last?.[m&&decodeURIComponent(m[1])];const mid=(m&&m[2]&&decodeURIComponent(m[2]))||last?.material||q('#cs-chapter')?.value;const ch=(window.COURSE_CHAPTERS||[]).find(c=>c.id===mid);
  if(!ch)return;let box=list.parentElement.querySelector('.cv-lesson-only');if(!box){box=document.createElement('label');box.className='cv-lesson-only';box.innerHTML='<input type="checkbox"> 학습 쪽만 (표지·목차·부록·범위 밖 숨김)';list.before(box);box.querySelector('input').onchange=ev=>{st.lessonOnly=ev.target.checked;save();applyListFilter();};}
  box.querySelector('input').checked=st.lessonOnly;let hidden=0;
  qa('a',list).forEach(a=>{const n=+(a.querySelector('span')?.textContent||0);const p=ch.pages[n-1];const off=st.lessonOnly&&p&&p.kind!=='lesson'&&!a.hasAttribute('aria-current');a.classList.toggle('cv-off',off);if(off)hidden++;});
  box.dataset.count=hidden?`${hidden}쪽 숨김`:'';}

/* ── B1. 홈 대시보드 ── */
function progress(){const N=COURSE_NAMES(),out=[];const up=readJSON('unix-lab-progress-v1');
  if(window.LESSONS){const L=window.LESSONS,done=new Set(up.done||[]),last=up.last;const l=last&&L.find(x=>x.unit===last.unit&&x.page===last.page);out.push({id:'unix',name:N.unix,done:L.filter(x=>done.has(x.id)).length,total:L.length,href:l?`#${l.unit}/${l.page}/${last.tab||'learn'}`:'#w01/1/learn',last:l?`${l.unit} ${l.page}쪽 · ${l.title}`:'처음부터'});}
  const rec=readJSON('course-study-v1'),byC={};for(const ch of window.COURSE_CHAPTERS||[])(byC[ch.course||'programming-languages']??=[]).push(ch);
  for(const [cid,chs] of Object.entries(byC)){let total=0,done=0;for(const ch of chs)for(const p of ch.pages){if(p.kind!=='lesson')continue;total++;if(rec.pages?.[`${cid}:${ch.id}:${p.page}`]?.done)done++;}
    const last=rec.last?.[cid];const ch=last&&chs.find(c=>c.id===last.material);const start=chs[0];const sp=start.startPage||1;
    out.push({id:cid,name:N[cid]||cid,done,total,href:ch?`#/course/${encodeURIComponent(cid)}/textbook/${encodeURIComponent(ch.id)}/${last.page}`:`#/course/${encodeURIComponent(cid)}/textbook/${encodeURIComponent(start.id)}/${sp}`,last:ch?`${ch.title.split('·')[0].trim()} ${last.page}쪽 · ${ch.pages[last.page-1]?.title||''}`:'처음부터'});}
  return out;}
function dashboard(){const main=q('#school-app .s-main');if(!main||!/^#\/?library|^$|^#$/.test(location.hash||'#'))return;if(main.querySelector('.cv-dash'))return;
  const ME=window.MockExam,items=progress();let dueTotal=0,near=null;
  const cards=items.map(it=>{const due=ME?ME.dueIds(it.id).length:0;dueTotal+=due;for(const t of ['mid','final']){const n=ME?.dday(it.id,t);if(n!==null&&n!==undefined&&n>=0&&(!near||n<near.n))near={n,name:it.name,t};}
    const pct=it.total?Math.round(it.done/it.total*100):0;
    return `<article class="cv-card"><h3>${e(it.name)}</h3><div class="cv-prog" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div><p class="cv-small">학습 완료 ${it.done} / ${it.total}쪽 (${pct}%)</p><p class="cv-small">마지막: ${e(it.last)}</p><div class="cv-card-actions"><a class="s-btn teal" href="${it.href}">이어서 공부하기</a>${due?`<a class="s-btn" href="#/course/${encodeURIComponent(it.id)}/exams">오늘 복습 ${due}</a>`:''}</div></article>`;}).join('');
  const sec=document.createElement('section');sec.className='cv-dash';
  sec.innerHTML=`<div class="cv-dash-head"><h2>내 학습 현황</h2><p class="cv-small">${near?`가장 가까운 시험: ${e(near.name)} ${near.t==='mid'?'중간':'기말'} ${near.n===0?'D-day':'D-'+near.n} · `:''}오늘 복습할 문제 ${dueTotal}개 · 북마크 ${st.bookmarks.length}개</p></div><div class="cv-cards">${cards}</div>`;
  const top=main.querySelector('.s-topbar');(top?top.after(sec):main.prepend(sec));}

/* ── D2. 전체 백업/복원 + 설정 ── */
const BACKUP_KEYS=k=>k!=='study-sync-local-v1'&&(k==='unix-lab-progress-v1'||k==='course-study-v1'||k.startsWith('study-'));
function exportAll(){const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(BACKUP_KEYS(k))data[k]=localStorage.getItem(k);}
  const blob=new Blob([JSON.stringify({app:'study-lab',version:1,created:new Date().toISOString(),keys:data},null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`study-lab-backup-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);return Object.keys(data).length;}
function deepMerge(a,b){if(Array.isArray(a)&&Array.isArray(b))return [...new Set([...a,...b].map(x=>JSON.stringify(x)))].map(x=>JSON.parse(x));if(a&&b&&typeof a==='object'&&typeof b==='object'){const o={...a};for(const [k,v] of Object.entries(b))o[k]=k in a?deepMerge(a[k],v):v;return o;}return a===undefined?b:a;}
async function importAll(file,mode){const txt=await file.text();let v;try{v=JSON.parse(txt);}catch{throw Error('JSON 파일이 아닙니다.');}if(v?.app!=='study-lab'||!v.keys||typeof v.keys!=='object')throw Error('study-lab 전체 백업 파일이 아닙니다.');
  let n=0;for(const [k,raw] of Object.entries(v.keys)){if(!BACKUP_KEYS(k)||typeof raw!=='string')continue;if(mode==='replace'||localStorage.getItem(k)===null)localStorage.setItem(k,raw);else{try{localStorage.setItem(k,JSON.stringify(deepMerge(JSON.parse(localStorage.getItem(k)),JSON.parse(raw))));}catch{continue;}}n++;}return n;}
function openSettings(){const d=dialog('cv-settings','편의 설정',`
<section><h3>필기 도구 막대</h3><div class="cv-radios">${[['auto','자동 (PC는 상단 필기 버튼으로 열기, 펜·터치 기기는 항상 표시)'],['button','항상 버튼으로 열기'],['always','항상 표시']].map(([k,t])=>`<label><input type="radio" name="cv-tb" value="${k}" ${st.toolbar===k?'checked':''}> ${t}</label>`).join('')}</div>
<p class="cv-small">현재 기기: ${isPC()?'마우스(PC)':'펜·터치'} · 필기 도구 숨기기 등 세부 설정은 <button type="button" class="s-btn ghost" id="cv-nb-settings">필기 설정 열기</button></p></section>
<section><h3>화면</h3><div class="cv-radios">${[['auto','기기 설정 따름'],['light','밝게'],['dark','어둡게']].map(([k,t])=>`<label><input type="radio" name="cv-th" value="${k}" ${st.theme===k?'checked':''}> ${t}</label>`).join('')}</div><p class="cv-small">어둡게에서도 강의 원문 이미지는 원래 색으로 보입니다.</p></section>
<section><h3>전체 백업 · 복원</h3><p class="cv-small">진도, 교재 메모, 퀴즈·모의고사 기록, 복습 일정, 북마크, 필기, 설정을 파일 하나로 저장합니다. 녹음 파일과 직접 등록한 PDF는 용량 때문에 포함하지 않습니다. 다른 기기나 새 주소에서 불러와 이어서 쓸 수 있습니다.</p>
<div class="s-actions"><button type="button" class="s-btn teal" id="cv-export">전체 백업 파일 받기</button></div>
<div class="cv-import"><label>백업 파일 선택<input type="file" id="cv-file" accept="application/json,.json"></label><div class="cv-radios"><label><input type="radio" name="cv-im" value="merge" checked> 합치기 (지금 기록 유지 + 백업의 기록 추가)</label><label><input type="radio" name="cv-im" value="replace"> 덮어쓰기 (백업 시점으로 되돌림)</label></div><button type="button" class="s-btn" id="cv-import">불러오기</button></div><p id="cv-msg" class="cv-small" role="status"></p></section>
<section><h3>단축키</h3><table class="cv-keys"><tbody>${[['← / →','이전 / 다음 쪽'],['1 2 3 4','설명 · 실험 · 문제 · 원문 탭'],['/','전체 검색'],['B','현재 쪽 북마크'],['P / E','펜 / 지우개 (필기 막대 열기)'],['Esc','필기 끝내기(이동) · 막대 닫기'],['H','필기 막대 보이기/숨기기']].map(([k,t])=>`<tr><th><kbd>${k}</kbd></th><td>${t}</td></tr>`).join('')}</tbody></table><p class="cv-small">입력칸에 글을 쓰는 중에는 단축키가 동작하지 않습니다.</p></section>`);
  qa('[name=cv-tb]',d).forEach(r=>r.onchange=()=>{st.toolbar=r.value;save();if(st.toolbar==='always')window.NotebookOptions?.show();else initToolbar();refreshBars();});
  qa('[name=cv-th]',d).forEach(r=>r.onchange=()=>{st.theme=r.value;save();applyTheme();});
  d.querySelector('#cv-nb-settings').onclick=()=>{d.close();window.NotebookOptions?.openSettings();};
  d.querySelector('#cv-export').onclick=()=>{const n=exportAll();d.querySelector('#cv-msg').textContent=`${n}개 기록을 백업 파일로 저장했습니다.`;};
  d.querySelector('#cv-import').onclick=async()=>{const f=d.querySelector('#cv-file').files[0],msg=d.querySelector('#cv-msg');if(!f){msg.textContent='백업 파일을 먼저 선택하세요.';return;}const mode=d.querySelector('[name=cv-im]:checked').value;if(mode==='replace'&&!d.querySelector('#cv-import').dataset.sure){d.querySelector('#cv-import').dataset.sure='1';msg.textContent='덮어쓰면 지금 기록이 백업 시점으로 바뀝니다. 계속하려면 한 번 더 누르세요.';return;}
    try{const n=await importAll(f,mode);window.__studyApplyingCloud=true;msg.textContent=`${n}개 기록을 불러왔습니다. 화면을 새로 고칩니다…`;setTimeout(()=>location.reload(),900);}catch(err){msg.textContent=err.message;}};}

/* ── 단축키 ── */
document.addEventListener('keydown',ev=>{if(ev.defaultPrevented||ev.ctrlKey||ev.metaKey||ev.altKey)return;const t=ev.target;if(t.closest&&t.closest('input,textarea,select,[contenteditable="true"],[role=tab],dialog'))return;
  const unix=q('#school-app')?.hidden;const k=ev.key;
  const click=sel=>{const b=q(sel);if(b&&!b.disabled){b.click();return true;}return false;};
  if(k==='ArrowLeft'||k==='ArrowRight'){const ok=unix?click(k==='ArrowLeft'?'#prev':'#next'):click(k==='ArrowLeft'?'#cs-previous':'#cs-next');if(ok)ev.preventDefault();return;}
  if(/^[1-4]$/.test(k)){const i=+k-1;if(unix){const map=['learn','lab','quiz','original'];if(click(`.tabs [data-tab="${map[i]}"]`))ev.preventDefault();}else{const tabs=qa('.cs-view-tabs [role=tab]');if(tabs[i]&&!tabs[i].disabled){tabs[i].click();ev.preventDefault();}}return;}
  if(k==='/'){ev.preventDefault();openSearch();return;}
  if(k==='b'||k==='B'){if(currentPage()){toggleMark();ev.preventDefault();}return;}
  if(k==='p'||k==='P'){if(window.NotebookOptions?.isHidden())togglePen(true);else window.Notebook?.setMode('pen');ev.preventDefault();return;}
  if(k==='e'||k==='E'){if(window.NotebookOptions?.isHidden())togglePen(true);window.Notebook?.setMode('eraser');ev.preventDefault();return;}
  if(k==='h'||k==='H'){togglePen(window.NotebookOptions?.isHidden());ev.preventDefault();return;}
  if(k==='Escape'&&!window.NotebookOptions?.isHidden()&&toolbarAuto()){togglePen(false);}
});

/* ── 화면 변화 감지 ── */
let pending=0;const tick=()=>{cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{ensureBars();dashboard();applyListFilter();placeStar();});};
new MutationObserver(tick).observe(document.body,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>{tick();setTimeout(tick,60);});
window.addEventListener('notebook-pagechange',tick);
initToolbar();tick();
window.StudyConvenience={exportAll,importAll,openSearch,openSettings,progress,state:()=>st};
})();
