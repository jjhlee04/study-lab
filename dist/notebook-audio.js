(function(){
'use strict';
// Recording keeps going when the dialog is closed or the reader moves to another page.
// Every second of audio is also written to IndexedDB ("parts"), so a recording that the
// browser or the OS cuts off (app switch, screen lock, tab killed) keeps everything up to
// that second: the segment is saved as a clip, and recording resumes as a new segment
// when the page is visible again. Parts left behind by a killed page are recovered on the
// next visit.
const UI_KEY='study-audio-ui-v1',LOCK='study-audio-recording',LIMIT=100*1024*1024;
let dbPromise,recorder=null,stream=null,host=null,urls=[],saving=0,clock=null;
let session=null,want=false,resuming=false,interrupted='',paused=false,notice='',noticeTimer=null,wake=null,unlock=null,muteCheck=null,partChain=Promise.resolve();
let mini=false;try{mini=JSON.parse(localStorage.getItem(UI_KEY))?.mini===true;}catch{}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function pageName(key){const p=key.split(':');if(p[0]==='unix')return `유닉스 프로그래밍 · ${p[1]} · ${p[2]}쪽`;if(p[0]==='course'){let name='학습 과목';try{name=JSON.parse(localStorage.getItem('study-library-v1'))?.courses?.find(c=>c.id===p[1])?.name||(p[1]==='programming-languages'?'프로그래밍언어론':name);}catch{}const ch=window.COURSE_CHAPTERS?.find(c=>c.id===p[2]);return `${name} · ${ch?.title||'강의자료'} · ${p[3]}쪽`;}return '전체 서재';}
function activate(button,fn){let touch=-1000;button.onclick=e=>{if(e.detail>0&&performance.now()-touch<600)return;fn(e);};button.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse'){e.preventDefault();touch=performance.now();button.click();}});}
const clockText=ms=>{const s=Math.max(0,Math.floor(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};

const badge=document.createElement('div');badge.id='notebook-recording-badge';badge.hidden=true;
badge.innerHTML='<button type="button" class="rec-dot" aria-label="녹음 표시 크게 보기" title="녹음 중 · 눌러서 크게 보기"></button><span class="rec-text" role="status"></span><span class="rec-actions"><button type="button" data-act="resume" hidden>이어서 녹음</button><button type="button" data-act="mini" title="작은 점으로 줄입니다. 녹음은 계속됩니다.">작게</button><button type="button" data-act="stop">녹음 종료</button><button type="button" data-act="dismiss" hidden>닫기</button></span>';
document.body.append(badge);
const act=name=>badge.querySelector(`[data-act="${name}"]`);
activate(badge.querySelector('.rec-dot'),()=>setMini(!mini));
activate(act('mini'),()=>setMini(true));activate(act('stop'),finish);activate(act('resume'),()=>resume(true));activate(act('dismiss'),()=>{notice='';update();});
function setMini(v){mini=v;try{localStorage.setItem(UI_KEY,JSON.stringify({mini}));}catch{}update();}
function say(text,ms=8000){notice=text;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>{notice='';update();},ms);update();}

function db(){return dbPromise??=new Promise((resolve,reject)=>{const r=indexedDB.open('study-audio-v1',2);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('clips'))d.createObjectStore('clips',{keyPath:'id'});if(!d.objectStoreNames.contains('parts'))d.createObjectStore('parts',{keyPath:'id'});};r.onsuccess=()=>{r.result.onversionchange=()=>r.result.close();resolve(r.result);};r.onerror=()=>reject(Error('녹음 보관함을 열지 못했습니다.'));});}
async function tx(store,mode,fn){const d=await db();return new Promise((resolve,reject)=>{const t=d.transaction(store,mode);let out;const r=fn(t.objectStore(store));if(r)r.onsuccess=()=>{out=r.result;};t.oncomplete=()=>resolve(out);t.onabort=t.onerror=()=>reject(t.error||Error('저장소 오류'));});}
const write=clip=>tx('clips','readwrite',s=>{s.put(clip);}).catch(()=>{throw Error('녹음을 저장하지 못했습니다. 저장 공간을 확인하고 아래 파일을 내려받으세요.');});
const all=()=>tx('clips','readonly',s=>s.getAll()).then(r=>r.sort((a,b)=>b.created-a.created)).catch(()=>{throw Error('녹음 목록을 읽지 못했습니다.');});
const putPart=part=>tx('parts','readwrite',s=>{s.put(part);});
const dropParts=key=>tx('parts','readwrite',s=>{s.delete(IDBKeyRange.bound(key+':',key+':￿'));}).catch(()=>{});
function message(text){if(host?.isConnected)host.querySelector('#audio-status').textContent=text;}

function update(){
  const running=recorder?.state==='recording',active=want||saving>0;
  badge.hidden=!active&&!notice;
  const small=mini&&running&&!interrupted&&!paused&&!notice;
  badge.classList.toggle('mini',small);badge.classList.toggle('warn',!!interrupted||paused);
  const total=session?Date.now()-session.t0:0;
  const text=notice&&!active?notice:interrupted?interrupted:running?(paused?'⏸ 마이크 입력이 멈췄습니다 · '+clockText(total):'● 녹음 중 '+clockText(total)):want?'● 녹음 준비 중…':'녹음을 저장하는 중…';
  badge.querySelector('.rec-text').textContent=text;badge.querySelector('.rec-dot').title='녹음 중 '+clockText(total)+' · 눌러서 크게 보기';
  act('resume').hidden=!(want&&interrupted&&!resuming&&!running);act('mini').hidden=!running;act('stop').hidden=!want;act('dismiss').hidden=active;
  document.getElementById('notebook-record')?.classList.toggle('is-recording',want);
  if(host?.isConnected){host.querySelector('#audio-start').disabled=want||saving>0;host.querySelector('#audio-stop').disabled=!want;host.querySelector('#audio-live').textContent=active?text:'';}
  if(active&&!clock)clock=setInterval(update,500);if(!active&&clock){clearInterval(clock);clock=null;}
}

async function acquireWake(){if(!want||wake||document.hidden||!navigator.wakeLock)return;try{wake=await navigator.wakeLock.request('screen');wake.addEventListener('release',()=>{wake=null;});if(!want)releaseWake();}catch{}}
function releaseWake(){const w=wake;wake=null;w?.release().catch(()=>{});}
function holdLock(){if(unlock||!navigator.locks)return;navigator.locks.request(LOCK,()=>new Promise(r=>{unlock=r;})).catch(()=>{});}
function releaseLock(){unlock?.();unlock=null;}
function stopStream(s){s?.getTracks().forEach(t=>t.stop());}

async function openSegment(){
  const s=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
  const types=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'],type=types.find(t=>MediaRecorder.isTypeSupported(t));
  const rec=type?new MediaRecorder(s,{mimeType:type}):new MediaRecorder(s);
  const seg=session.seg,meta={key:session.id+'-'+seg,page:session.page,title:seg>1?`${session.title} (이어서 ${seg})`:session.title,started:Date.now()};
  const parts=[];let total=0,seq=0;
  stream=s;recorder=rec;rec.userStop=false;paused=false;
  const track=s.getAudioTracks()[0];
  if(track){track.onmute=()=>{if(rec===recorder){paused=true;update();}};track.onunmute=()=>{if(rec===recorder){paused=false;update();}};track.onended=()=>{if(rec.state!=='inactive')rec.stop();};}
  rec.ondataavailable=e=>{if(!e.data.size)return;parts.push(e.data);total+=e.data.size;const part={...meta,id:meta.key+':'+String(seq++).padStart(6,'0'),mime:rec.mimeType||e.data.type,at:Date.now(),blob:e.data};partChain=partChain.then(()=>putPart(part)).catch(()=>{});if(total>LIMIT&&rec.state==='recording'){message('100MB에 도달하여 녹음을 종료합니다.');finish();}};
  rec.onerror=()=>{message('녹음 중 오류가 발생했습니다. 수집된 부분을 저장합니다.');if(rec.state!=='inactive')rec.stop();};
  rec.onstop=()=>closeSegment(rec,s,parts,meta);
  rec.start(1000);
}
async function closeSegment(rec,s,parts,meta){
  stopStream(s);if(rec===recorder){recorder=null;stream=null;paused=false;}
  saving++;update();
  const type=rec.mimeType||parts[0]?.type||'audio/webm',blob=new Blob(parts,{type}),duration=Date.now()-meta.started;
  if(blob.size){
    const ext=type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm';
    const clip={id:crypto.randomUUID(),page:meta.page,title:meta.title,filename:meta.title+'.'+ext,created:meta.started,duration,blob};
    try{await write(clip);await partChain;await dropParts(meta.key);message('저장됨 · '+meta.title);await renderList();}
    catch(e){message(e.message);if(host?.isConnected){const a=document.createElement('a'),url=URL.createObjectURL(blob);urls.push(url);a.href=url;a.download=clip.filename;a.textContent='저장되지 않은 녹음 내려받기';host.querySelector('#audio-recovery').append(a);}}
  }else{await partChain;await dropParts(meta.key);if(rec.userStop)message('녹음 데이터가 없습니다. 마이크 입력 상태를 확인하세요.');}
  saving--;
  if(want&&!rec.userStop){interrupted='녹음이 끊겼습니다 · '+clockText(duration)+'까지 저장됨';releaseWake();if(!document.hidden)resume(false);}
  else if(!want&&!saving){releaseWake();releaseLock();}
  update();
}

async function start(){
  if(want||saving)return;
  if(!window.isSecureContext||!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){message('이 브라우저에서는 마이크 녹음을 사용할 수 없습니다. 녹음 파일 등록은 사용할 수 있습니다. Safari에서 사이트를 직접 열어 보세요.');return;}
  session={id:Date.now().toString(36)+Math.random().toString(36).slice(2,8),page:window.Notebook.getPageKey(),title:host.querySelector('#audio-title').value.trim()||'학습 녹음',seg:1,t0:Date.now()};
  want=true;interrupted='';notice='';holdLock();update();
  try{await openSegment();message('녹음 중 · 창을 닫아도 녹음은 계속됩니다.');acquireWake();}
  catch(e){want=false;session=null;releaseLock();message(e.name==='NotAllowedError'?'마이크 권한이 거부되었거나 브라우저가 허용하지 않습니다. 사이트 권한을 확인하거나 Safari에서 직접 열어 주세요.':e.name==='NotFoundError'?'사용할 수 있는 마이크를 찾지 못했습니다.':'녹음을 시작하지 못했습니다: '+e.message);}
  update();
}
async function resume(byUser){
  if(!want||resuming||recorder||document.hidden)return;
  resuming=true;update();
  try{session.seg++;await openSegment();interrupted='';acquireWake();if(!want)finish();}
  catch(e){session.seg--;interrupted='녹음이 끊겼습니다 · 앞부분은 저장됨. ‘이어서 녹음’을 눌러 주세요.';if(byUser&&e.name==='NotAllowedError')interrupted='마이크 권한이 없어 이어서 녹음하지 못했습니다.';}
  resuming=false;update();
}
function finish(){
  want=false;interrupted='';clearTimeout(muteCheck);
  if(recorder&&recorder.state!=='inactive'){recorder.userStop=true;recorder.stop();}
  else if(!saving){releaseWake();releaseLock();}
  update();
}

// Parts left in IndexedDB belong to a recording whose page died before it could save.
async function recover(){
  const run=async()=>{let parts;try{parts=await tx('parts','readonly',s=>s.getAll());}catch{return;}if(!parts?.length)return;
    const groups=new Map();for(const p of parts){if(!navigator.locks&&Date.now()-p.at<60000)continue;if(!groups.has(p.key))groups.set(p.key,[]);groups.get(p.key).push(p);}
    let saved=0;for(const [key,list] of groups){list.sort((a,b)=>a.id<b.id?-1:1);const last=list[list.length-1],type=last.mime||list[0].blob.type||'audio/webm',ext=type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm',title=(last.title||'학습 녹음')+' (복구됨)';
      try{await write({id:crypto.randomUUID(),page:last.page||'library',title,filename:title+'.'+ext,created:last.started||last.at,duration:last.at-(last.started||last.at),blob:new Blob(list.map(p=>p.blob),{type})});await dropParts(key);saved++;}catch{}}
    if(saved){say(`끊긴 녹음 ${saved}개를 복구해 녹음 목록에 저장했습니다.`,15000);renderList();}};
  if(navigator.locks)navigator.locks.request(LOCK,{ifAvailable:true},lock=>lock?run():null).catch(()=>{});else run();
}

async function renderList(){if(!host?.isConnected)return;const root=host;try{const clips=await all();if(root!==host)return;root.querySelectorAll('audio').forEach(a=>a.pause());urls.forEach(URL.revokeObjectURL);urls=[];const showAll=root.querySelector('#audio-all').checked,page=window.Notebook.getPageKey(),list=clips.filter(c=>showAll||c.page===page),box=root.querySelector('#audio-list');box.innerHTML=list.length?'':'<p>등록된 녹음이 없습니다.</p>';for(const clip of list){const row=document.createElement('article'),url=URL.createObjectURL(clip.blob);urls.push(url);row.className='audio-clip';row.innerHTML=`<h4>${esc(clip.title)}</h4><p>${new Date(clip.created).toLocaleString('ko-KR')} · ${(clip.blob.size/1024/1024).toFixed(2)}MB${clip.duration?' · '+clockText(clip.duration):''}</p><small>연결 위치: ${esc(pageName(clip.page))}</small><audio controls preload="metadata" src="${url}"></audio><p class="audio-play-error" role="status"></p><a href="${url}" download="${esc(clip.filename)}">녹음 내려받기</a> <button type="button">삭제</button>`;row.querySelector('audio').onerror=()=>row.querySelector('.audio-play-error').textContent='이 브라우저가 이 파일의 재생 형식을 지원하지 않을 수 있습니다. 내려받아 재생해 주세요.';activate(row.querySelector('button'),async()=>{try{await tx('clips','readwrite',s=>{s.delete(clip.id);});await renderList();message('삭제됨');}catch(e){message('삭제하지 못했습니다.');}});box.append(row);}}catch(e){message(e.message);}}
function mount(element){host=element;host.innerHTML=`<details class="audio-help"><summary>보관 안내</summary><p>녹음과 등록 파일은 이 브라우저에만 보관됩니다. 서버 업로드·기기 간 동기화는 하지 않습니다. 중요한 녹음은 내려받아 보관하세요.</p><p>녹음 중에도 이 창을 닫고 다른 페이지로 이동할 수 있습니다. 녹음은 1초마다 이 기기에 저장되므로, 앱 전환·화면 잠금·새로 고침으로 끊겨도 그때까지의 녹음은 남습니다. 끊긴 뒤 화면으로 돌아오면 새 녹음 파일로 이어서 녹음합니다(제목 뒤에 ‘이어서 2’).</p><p>iPhone·iPad는 다른 앱으로 전환하거나 화면이 잠기면 시스템이 마이크를 멈춥니다. 그 사이의 소리는 녹음되지 않으니, 긴 녹음은 Safari를 화면에 띄워 두세요. 녹음 중에는 화면이 자동으로 꺼지지 않게 요청합니다.</p></details><label>녹음 제목<input id="audio-title" maxlength="150" placeholder="예: 구문 7장 복습"></label><div class="notebook-actions"><button type="button" id="audio-start">녹음 시작</button><button type="button" id="audio-stop" disabled>녹음 종료·저장</button></div><p id="audio-live" role="status"></p><small class="audio-close-hint">녹음 중에도 ‘닫기’로 이 창을 닫을 수 있습니다. 화면 위 표시는 ‘작게’를 누르면 작은 점으로 줄어듭니다.</small><label>녹음 파일 등록<input id="audio-upload" type="file" accept="audio/*,.m4a,.mp3,.wav,.ogg,.webm,.aac,.mp4" multiple></label><small>파일당 최대 100MB · 현재 페이지에 연결합니다.</small><p id="audio-status" role="status"></p><div id="audio-recovery"></div><label><input id="audio-all" type="checkbox"> 모든 페이지 녹음 보기</label><div id="audio-list"></div>`;activate(host.querySelector('#audio-start'),start);activate(host.querySelector('#audio-stop'),finish);host.querySelector('#audio-all').onchange=renderList;host.querySelector('#audio-upload').onchange=async e=>{const files=[...e.target.files],page=window.Notebook.getPageKey();for(const f of files){if(f.size>LIMIT){message(f.name+': 100MB 이하로 등록해 주세요.');continue;}if(!f.size||!(/\.(mp3|m4a|wav|ogg|webm|aac|mp4)$/i.test(f.name)||f.type.startsWith('audio/'))){message(f.name+': 오디오 파일을 선택해 주세요.');continue;}try{await write({id:crypto.randomUUID(),page,title:f.name,filename:f.name,created:Date.now(),blob:f});message('등록됨');}catch(err){message(err.message);}}e.target.value='';await renderList();};update();renderList();}

// Hidden page: flush the buffered second to IndexedDB, but never stop the recording here.
function flush(){if(recorder?.state==='recording'){try{recorder.requestData();}catch{}}}
function visible(){if(document.hidden||!want)return;acquireWake();if(!recorder){resume(false);return;}clearTimeout(muteCheck);muteCheck=setTimeout(()=>{const t=stream?.getAudioTracks()[0];if(want&&recorder&&t&&(t.muted||t.readyState==='ended')){paused=false;recorder.stop();}},2500);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)flush();else visible();});
window.addEventListener('pageshow',visible);window.addEventListener('pagehide',flush);
window.addEventListener('beforeunload',e=>{if(want||saving){flush();e.preventDefault();e.returnValue='';}});
recover();
window.StudyAudio={mount};
})();
