/* 이산수학 실험실 · 입력에 따라 결정적으로 동작하는 교육용 모델
 * PLLab.mount/mode를 감싸서 dm 챕터에서는 이 실험실을 사용한다. */
(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let timer=null;const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
const fact=n=>{let r=1n;for(let i=2n;i<=BigInt(n);i++)r*=i;return r;};
const C=(n,r)=>r<0||r>n?0n:fact(n)/(fact(r)*fact(n-r));
const P=(n,r)=>r<0||r>n?0n:fact(n)/fact(n-r);
const fmt=x=>String(x).replace(/\B(?=(\d{3})+(?!\d))/g,',');
const num=(v,lo,hi,d)=>{v=parseInt(v,10);return Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):d;};

function mode(ch,n){
  if(ch==='dm05'){
    if(n>=35&&n<=37)return 'recfn';
    if(n>=38&&n<=41||n===64)return 'euclid';
    if(n>=42&&n<=48||n===53||n===54)return 'rset';
    if(n>=49&&n<=52||n===55||n===56)return 'fbt';
    if(n===57||n===58)return 'lex';
    if(n>=61&&n<=63||n===67)return 'stack';
    if(n===65)return 'mpower';
    if(n===66)return 'bsearch';
    if(n>=68&&n<=74)return 'merge';
    return null;
  }
  if(ch==='dm06'){
    if(n>=5&&n<=11||n===53)return 'product';
    if(n>=12&&n<=19)return 'incl';
    if(n===20)return 'circle';
    if(n>=24&&n<=28)return 'pigeon';
    if(n>=31&&n<=42||n===59)return 'combi';
    if(n>=45&&n<=50)return 'pascal';
    if(n>=54&&n<=58)return 'stars';
    if(n===60||n===61)return 'anagram';
    if(n>=62&&n<=64)return 'boxes';
  }
  return null;
}
const TITLES={recfn:'재귀 정의 계산기',euclid:'유클리드 알고리즘과 라메의 정리',rset:'재귀적 집합 만들기와 원소 판정',fbt:'전이진 나무 직접 키우기',lex:'a(m,n) 표를 사전식 순서로 채우기',stack:'재귀 호출 스택 추적',mpower:'재귀 모듈러 거듭제곱 추적',bsearch:'재귀 이진 탐색 추적',merge:'병합 정렬 단계별 실행',
  product:'곱의 법칙: 직접 나열해 세기',incl:'포함배제: 비트열 조건 세기',circle:'원탁 배치와 나눗셈 법칙',pigeon:'비둘기집 원리 실험',combi:'순열·조합 나열기',pascal:'파스칼 삼각형과 이항계수',stars:'별과 막대로 반복 조합 세기',anagram:'같은 글자가 있는 순열',boxes:'대상을 상자에 나누는 네 가지 경우'};

/* 단계형 실험 공통 틀: steps = [{html, note}] */
function stepper(root,build){
  const out=root.querySelector('.dm-out'),note=root.querySelector('.dm-step-note'),count=root.querySelector('.dm-count');
  let steps=[],i=0;
  const render=()=>{const s=steps[i]||{html:'',note:''};out.innerHTML=s.html;note.textContent=s.note||'';count.textContent=steps.length?`${i+1} / ${steps.length}단계`:'';root.querySelector('[data-a=prev]').disabled=i<=0;root.querySelector('[data-a=next]').disabled=i>=steps.length-1;};
  const reset=()=>{stop();root.querySelector('[data-a=play]').textContent='자동 재생';try{steps=build();}catch(err){steps=[{html:`<p class="dm-err">${esc(err.message)}</p>`,note:''}];}i=0;render();};
  root.querySelector('[data-a=prev]').onclick=()=>{stop();i=Math.max(0,i-1);render();};
  root.querySelector('[data-a=next]').onclick=()=>{stop();i=Math.min(steps.length-1,i+1);render();};
  root.querySelector('[data-a=end]').onclick=()=>{stop();i=steps.length-1;render();};
  root.querySelector('[data-a=play]').onclick=ev=>{if(timer){stop();ev.target.textContent='자동 재생';return;}ev.target.textContent='일시 정지';timer=setInterval(()=>{if(i>=steps.length-1){stop();ev.target.textContent='자동 재생';return;}i++;render();},1300);};
  root.querySelector('[data-a=apply]').onclick=reset;
  root.querySelectorAll('.dm-inputs input,.dm-inputs select').forEach(el=>el.onchange=reset);
  reset();
}
const stepControls='<div class="dm-controls"><button class="s-btn" data-a="prev">‹ 이전</button><button class="s-btn teal" data-a="next">다음 ›</button><button class="s-btn" data-a="play">자동 재생</button><button class="s-btn" data-a="end">끝으로</button><span class="dm-count"></span></div><p class="dm-step-note" aria-live="polite"></p><div class="dm-out"></div>';
const shell=(kind,inputs,body)=>`<section class="dm-lab"><h3>${TITLES[kind]}</h3><p class="dm-model-note">교육용 모델 · 조건을 바꾸고 [적용]을 누르세요</p><div class="dm-inputs">${inputs}<button class="s-btn" data-a="apply">적용</button></div>${body}</section>`;
const field=(name,label,value,attrs='')=>`<label>${label}<input name="${name}" value="${esc(value)}" ${attrs}></label>`;
const sel=(name,label,opts,v)=>`<label>${label}<select name="${name}">${opts.map(([k,t])=>`<option value="${k}" ${k===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
const val=(root,n)=>root.querySelector(`[name=${n}]`).value;
const table=(head,rows)=>`<div class="dm-scroll"><table class="dm-table"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr${r.cls?` class="${r.cls}"`:''}>${r.cells.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const LABS={
recfn(root,n){
  root.innerHTML=shell('recfn',sel('f','정의',[['lin','f(0)=a, f(n+1)=b·f(n)+c'],['fact','계승 f(0)=1, f(n+1)=(n+1)·f(n)'],['sum','합 S(n)=Σ_{k=0}^{n} k²']],n===36?'lin':n===37?'sum':'lin')+field('a','a',3,'type=number')+field('b','b',2,'type=number')+field('c','c',3,'type=number')+field('n','계산할 n (최대 12)',4,'type=number min=0 max=12'),stepControls);
  stepper(root,()=>{const kind=val(root,'f'),N=num(val(root,'n'),0,12,4),a=BigInt(num(val(root,'a'),-99,99,3)),b=BigInt(num(val(root,'b'),-9,9,2)),c=BigInt(num(val(root,'c'),-99,99,3));
    const rows=[],steps=[];let v;
    for(let k=0;k<=N;k++){let rule;
      if(kind==='lin'){if(k===0){v=a;rule=`기초: f(0) = ${a}`;}else{const p=v;v=b*p+c;rule=`f(${k}) = ${b}·f(${k-1}) + ${c} = ${b}·${p} + ${c} = ${v}`;}}
      else if(kind==='fact'){if(k===0){v=1n;rule='기초: f(0) = 1';}else{const p=v;v=BigInt(k)*p;rule=`f(${k}) = ${k}·f(${k-1}) = ${k}·${p} = ${v}`;}}
      else{if(k===0){v=0n;rule='기초: S(0) = a0 = 0² = 0';}else{const p=v;v=p+BigInt(k*k);rule=`S(${k}) = S(${k-1}) + ${k}² = ${p} + ${k*k} = ${v}`;}}
      rows.push({cells:[k,esc(rule),`<b>${fmt(v)}</b>`]});
      steps.push({html:table(['n','계산','값'],rows.map((r,i)=>({...r,cls:i===rows.length-1?'dm-now':''}))),note:k===0?'기초 단계에서 출발값을 정합니다.':'재귀 단계: 바로 앞 값만 사용해 다음 값을 계산합니다.'});}
    return steps;});
},
euclid(root,n){
  root.innerHTML=shell('euclid',field('a','a (큰 수)',55,'type=number min=1')+field('b','b (작은 수)',34,'type=number min=1'),stepControls);
  stepper(root,()=>{let a=num(val(root,'a'),1,1e12,55),b=num(val(root,'b'),1,1e12,34);if(a<b)[a,b]=[b,a];
    const digits=String(b).length,bound=5*digits,rows=[],steps=[];let x=a,y=b,cnt=0;
    const fib=[0,1];while(fib.length<80)fib.push(fib[fib.length-1]+fib[fib.length-2]);
    while(y>0){const q=Math.floor(x/y),r=x%y;cnt++;rows.push({cells:[cnt,`${x} = ${y} · ${q} + ${r}`,r===0?'멈춤':'']});steps.push({html:table(['나눗셈','식',''],rows),note:r===0?`나머지 0 → gcd(${a}, ${b}) = ${y}`:'나머지로 다시 나눕니다. (재귀 gcd(b mod a, a)와 같은 과정)'});[x,y]=[y,r];}
    const fn1=fib[cnt+1];
    steps.push({html:table(['나눗셈','식',''],rows)+`<div class="dm-result"><p>나눗셈 횟수 n = <b>${cnt}</b>, gcd = <b>${x}</b></p><p>라메의 정리 상한: b의 자릿수 ${digits} × 5 = <b>${bound}</b> → ${cnt} ≤ ${bound} ${cnt<=bound?'✔':'✘'}</p><p>증명의 핵심: b ≥ f(n+1) = f(${cnt+1}) = ${fmt(fn1)} → ${b} ≥ ${fmt(fn1)} ${b>=fn1?'✔':'✘'}</p><p class="dm-hint">연속한 피보나치 수(예: 89, 55)를 넣으면 나눗셈이 가장 많이 필요합니다.</p></div>`,note:'결과 비교'});
    return steps;});
},
rset(root,n){
  const def=n===47||n===54?'paren':n>=44&&n<=46?'str':'three';
  root.innerHTML=shell('rset',sel('r','재귀 정의',[['three','S: 3 ∈ S, x,y ∈ S ⇒ x+y ∈ S'],['str','Σ* (Σ={a,b}): λ, w ⇒ wa, wb'],['paren','균형 괄호 P: (), w ⇒ ()w, (w), w()']],def)+field('t','원소인지 확인할 값',def==='paren'?'(()())':def==='str'?'aab':'12'),stepControls);
  stepper(root,()=>{const r=val(root,'r'),t=val(root,'t').trim(),steps=[];
    let level=r==='three'?[3]:r==='str'?['']:['()'];let all=new Set(level.map(String));
    const show=x=>r==='str'?(x===''?'λ':x):String(x);
    const gen=(cur,allset)=>{const out=new Set();const arr=[...allset];
      if(r==='three'){for(const x of arr)for(const y of arr){const s=+x+ +y;if(s<=60)out.add(String(s));}}
      else if(r==='str'){for(const w of cur)if(w.length<4){out.add(w+'a');out.add(w+'b');}}
      else{for(const w of cur)if(w.length<=6){out.add('()'+w);out.add('('+w+')');out.add(w+'()');}}
      return [...out].filter(x=>!allset.has(x));};
    steps.push({html:`<p><b>기초 단계</b>: ${level.map(show).map(esc).join(', ')}</p>`,note:'기초 단계의 원소에서 시작합니다.'});
    let cur=level.map(String);
    for(let s=1;s<=3;s++){const nw=gen(cur,all);nw.forEach(x=>all.add(x));cur=nw;
      const sorted=[...all].sort((a,b)=>r==='three'?a-b:a.length-b.length||a.localeCompare(b));
      steps.push({html:`<p><b>${s}번 적용 후 새로 생긴 원소</b>: ${nw.length?nw.sort((a,b)=>r==='three'?a-b:a.length-b.length).map(show).map(esc).join(', '):'(없음)'}</p><p class="dm-small">지금까지: ${sorted.map(show).map(esc).join(', ')}${r==='three'?' (60 이하만 표시)':''}</p>`,note:'재귀 단계 규칙을 지금까지의 원소에 적용합니다.'});}
    // 판정
    let verdict;
    if(r==='three'){const v=Number(t);verdict=Number.isInteger(v)&&v>0&&v%3===0?`${t} ∈ S: ${v/3}개의 3을 더해 만들 수 있습니다 (3 + 3 + … ). 53쪽 증명대로 S = 3의 양의 배수.`:`${esc(t)} ∉ S: S의 모든 원소는 3의 양의 배수입니다(구조적 귀납법: 3은 배수, 배수+배수=배수).`;}
    else if(r==='str'){verdict=/^[ab]*$/.test(t)?`${esc(t||'λ')} ∈ Σ*: λ에서 시작해 ${t.split('').map(ch=>esc(ch)).join(', ') || '(아무것도 붙이지 않음)'} 순서로 기호를 붙이면 됩니다.`:`${esc(t)} ∉ Σ*: Σ = {a, b} 밖의 기호가 들어 있습니다.`;}
    else{const path=parenPath(t);verdict=path?`${esc(t)} ∈ P. 만드는 순서: ${path.map(esc).join(' → ')}`:`${esc(t)} ∉ P. ${parenWhy(t)}`;}
    steps.push({html:`<div class="dm-result"><p>${verdict}</p></div>`,note:'원소 판정'});
    return steps;});
},
fbt(root,n){
  root.innerHTML=`<section class="dm-lab"><h3>${TITLES.fbt}</h3><p class="dm-model-note">잎(●)을 누르면 자식 두 개가 생깁니다 = 그 자리에 점∙점을 붙인 T1∙T2. 높이 h(T), 꼭짓점 수 n(T), 상한 2^(h+1)−1을 비교하세요.</p><div class="dm-controls"><button class="s-btn" data-a="reset">기초 단계로 (점 하나)</button><button class="s-btn" data-a="full">꽉 찬 나무 만들기</button><button class="s-btn" data-a="undo">되돌리기</button></div><div class="dm-out"></div></section>`;
  let tree={},hist=[];
  const h=t=>t.l?1+Math.max(h(t.l),h(t.r)):0,cnt=t=>t.l?1+cnt(t.l)+cnt(t.r):1,leaves=t=>t.l?leaves(t.l)+leaves(t.r):1;
  const full=d=>d===0?{}:{l:full(d-1),r:full(d-1)};
  const draw=()=>{const H=h(tree),N=cnt(tree),W=Math.max(320,Math.min(900,60*2**Math.min(H,4))),R=14,lh=70,pos=[];let id=0;
    const place=(t,x0,x1,d,path)=>{const x=(x0+x1)/2,y=30+d*lh,me={x,y,t,path,id:id++};pos.push(me);if(t.l){const L=place(t.l,x0,x,d+1,path+'l'),Rr=place(t.r,x,x1,d+1,path+'r');me.c=[L,Rr];}return me;};
    place(tree,0,W,0,'');
    const svg=`<svg viewBox="0 0 ${W} ${60+H*lh}" class="dm-tree" style="max-width:${W}px" role="img" aria-label="전이진 나무, 높이 ${H}, 꼭짓점 ${N}개">${pos.filter(p=>p.c).map(p=>p.c.map(c=>`<line x1="${p.x}" y1="${p.y}" x2="${c.x}" y2="${c.y}"/>`).join('')).join('')}${pos.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="${R}" class="${p.t.l?'dm-in':'dm-leaf'}" data-path="${p.path}" ${p.t.l?'':'tabindex="0" role="button" aria-label="이 잎 확장"'}/>`).join('')}</svg>`;
    const bound=2**(H+1)-1;
    root.querySelector('.dm-out').innerHTML=`<div class="dm-scroll">${svg}</div><div class="dm-result"><p>h(T) = <b>${H}</b>, n(T) = <b>${N}</b>, 잎 = ${leaves(tree)}개</p><p>정리: n(T) ≤ 2^(h(T)+1) − 1 = ${bound} → ${N} ≤ ${bound} ${N<=bound?'✔':'✘'} ${N===bound?'(등호: 꽉 찬 나무)':''}</p><p class="dm-small">꼭짓점 수는 항상 홀수입니다(내부 꼭짓점마다 자식 2개).</p></div>`;
    root.querySelectorAll('circle.dm-leaf').forEach(c=>{const go=()=>{if(h(tree)>=5){return;}hist.push(JSON.stringify(tree));let t=tree;for(const ch of c.dataset.path)t=ch==='l'?t.l:t.r;t.l={};t.r={};draw();};c.onclick=go;c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}};});};
  root.querySelector('[data-a=reset]').onclick=()=>{hist.push(JSON.stringify(tree));tree={};draw();};
  root.querySelector('[data-a=full]').onclick=()=>{hist.push(JSON.stringify(tree));tree=full(Math.min(3,Math.max(1,h(tree))));draw();};
  root.querySelector('[data-a=undo]').onclick=()=>{if(hist.length){tree=JSON.parse(hist.pop());draw();}};
  draw();
},
lex(root,n){
  root.innerHTML=shell('lex',field('m','m 최대',3,'type=number min=1 max=5')+field('n','n 최대',3,'type=number min=1 max=5'),stepControls);
  stepper(root,()=>{const M=num(val(root,'m'),1,5,3),N=num(val(root,'n'),1,5,3),A={},order=[],steps=[];
    for(let m=0;m<=M;m++)for(let k=0;k<=N;k++)order.push([m,k]);
    for(const [m,k] of order){let how;
      if(m===0&&k===0){A[m+','+k]=0;how='a(0,0) = 0 (기초)';}
      else if(k===0){A[m+','+k]=A[(m-1)+',0']+1;how=`n=0 → a(${m},0) = a(${m-1},0) + 1 = ${A[(m-1)+',0']} + 1 = ${A[m+','+k]}`;}
      else{A[m+','+k]=A[m+','+(k-1)]+k;how=`n>0 → a(${m},${k}) = a(${m},${k-1}) + ${k} = ${A[m+','+(k-1)]} + ${k} = ${A[m+','+k]}`;}
      const f=m+k*(k+1)/2;
      const grid=`<div class="dm-scroll"><table class="dm-table dm-grid"><thead><tr><th>m \\ n</th>${Array.from({length:N+1},(_,j)=>`<th>${j}</th>`).join('')}</tr></thead><tbody>${Array.from({length:M+1},(_,i)=>`<tr><th>${i}</th>${Array.from({length:N+1},(_,j)=>{const key=i+','+j;return `<td class="${i===m&&j===k?'dm-now':''}">${key in A?A[key]:''}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div>`;
      steps.push({html:grid+`<p>${esc(how)}</p><p class="dm-small">공식 m + n(n+1)/2 = ${m} + ${k}·${k+1}/2 = ${f} ${f===A[m+','+k]?'✔':'✘'}</p>`,note:`사전식 순서 (${m},${k}): 계산에 쓰는 칸은 모두 이미 채워져 있습니다(더 작은 쌍).`});}
    return steps;});
},
stack(root,n){
  root.innerHTML=shell('stack',sel('f','알고리즘',[['fact','factorial(n)'],['power','power(a, n)']],n===63||n===67?'power':'fact')+field('a','a (power)',2,'type=number')+field('n','n (최대 8)',4,'type=number min=0 max=8'),stepControls);
  stepper(root,()=>{const f=val(root,'f'),N=num(val(root,'n'),0,8,4),a=num(val(root,'a'),-9,9,2)||2,steps=[],stack=[];
    const name=k=>f==='fact'?`factorial(${k})`:`power(${a}, ${k})`;
    const view=(hl)=>`<div class="dm-stack">${stack.slice().reverse().map((s,i)=>`<div class="dm-frame ${i===0?'dm-now':''}">${esc(s)}</div>`).join('')}</div>`;
    for(let k=N;k>=0;k--){stack.push(name(k)+(k===0?'  → 기저 사례':`  → ${f==='fact'?k:a} · ${name(k-1)} 계산 대기`));steps.push({html:view(),note:k===0?'기저 사례에 도달: 더 이상 호출하지 않고 값을 반환합니다.':`${name(k)} 호출 → ${name(k-1)}을(를) 먼저 계산해야 합니다.`});}
    let v=1;
    for(let k=0;k<=N;k++){if(k>0)v=(f==='fact'?k:a)*v;stack.pop();steps.push({html:view()+`<p class="dm-result">${esc(name(k))} = <b>${v}</b> 반환</p>`,note:k===0?'기저 사례가 1을 반환합니다.':`돌아오며 곱합니다: ${f==='fact'?k:a} × ${f==='fact'?(k===0?1:v/k):v/a} = ${v}`});}
    steps.push({html:`<div class="dm-result"><p>최종 결과: ${esc(name(N))} = <b>${v}</b></p><p>호출 횟수: ${N+1}번 (n, n−1, …, 0)</p></div>`,note:'결과'});
    return steps;});
},
mpower(root,n){
  root.innerHTML=shell('mpower',field('b','b',3,'type=number min=1')+field('n','n (지수)',5,'type=number min=0 max=100000')+field('m','m (≥2)',7,'type=number min=2'),stepControls);
  stepper(root,()=>{const b=num(val(root,'b'),1,1e6,3),N=num(val(root,'n'),0,1e5,5),m=num(val(root,'m'),2,1e6,7),calls=[],steps=[];
    let k=N;while(true){calls.push(k);if(k===0)break;k=Math.floor(k/2);}
    calls.forEach((k,i)=>steps.push({html:table(['호출','지수','유형'],calls.slice(0,i+1).map((x,j)=>({cells:[j+1,x,x===0?'기저 사례':x%2?'홀수':'짝수'],cls:j===i?'dm-now':''}))),note:k===0?'n=0 → 1을 반환':`지수 ${k} → 다음 호출 지수 ⌊${k}/2⌋ = ${Math.floor(k/2)}`}));
    let v=1;const rows=[];
    for(let i=calls.length-1;i>=0;i--){const k=calls[i];let how;
      if(k===0){v=1;how='1';}else{const p=v;const sq=(p*p)%m;if(k%2===0){v=sq;how=`${p}² mod ${m} = ${v}`;}else{v=(sq*(b%m))%m;how=`(${p}² mod ${m}) · ${b} mod ${m} = ${sq}·${b%m} mod ${m} = ${v}`;}}
      rows.push({cells:[k,esc(how),`<b>${v}</b>`]});steps.push({html:table(['지수','계산','b^지수 mod m'],rows),note:'돌아오며 제곱하고, 지수가 홀수였으면 b를 한 번 더 곱합니다.'});}
    let check=1n;{let B=BigInt(b)%BigInt(m),E=BigInt(N),M=BigInt(m);while(E>0n){if(E&1n)check=check*B%M;B=B*B%M;E>>=1n;}}
    steps.push({html:`<div class="dm-result"><p>${b}^${N} mod ${m} = <b>${v}</b> (검산 ${check}) ${BigInt(v)===check?'✔':'✘'}</p><p>재귀 호출 ${calls.length}번 — 지수가 매번 절반이므로 약 log₂ n번입니다.</p></div>`,note:'결과'});
    return steps;});
},
bsearch(root,n){
  root.innerHTML=shell('bsearch',field('a','증가 수열 (쉼표로 구분)','1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 19, 20, 22')+field('x','찾을 값 x',19,'type=number'),stepControls);
  stepper(root,()=>{const arr=val(root,'a').split(/[ ,]+/).filter(Boolean).map(Number);if(arr.some(isNaN)||!arr.length)throw Error('수열은 숫자를 쉼표로 구분해 입력하세요.');for(let i=1;i<arr.length;i++)if(arr[i]<=arr[i-1])throw Error('수열은 증가 순서여야 합니다.');
    const x=Number(val(root,'x')),steps=[];let i=1,j=arr.length,res=null;
    const view=(i,j,m,found)=>`<div class="dm-cells">${arr.map((v,k)=>`<span class="${k+1<i||k+1>j?'dm-off':''} ${k+1===m?(found?'dm-hit':'dm-now'):''}"><small>${k+1}</small>${v}</span>`).join('')}</div>`;
    while(true){const m=Math.floor((i+j)/2),am=arr[m-1];
      if(x===am){res=m;steps.push({html:view(i,j,m,true),note:`binary search(${i}, ${j}, ${x}): m = ⌊(${i}+${j})/2⌋ = ${m}, a${m} = ${am} = x → ${m} 반환`});break;}
      if(x<am&&i<m){steps.push({html:view(i,j,m),note:`binary search(${i}, ${j}): m = ${m}, a${m} = ${am}. x < a${m} → 왼쪽 (${i} ~ ${m-1})`});j=m-1;continue;}
      if(x>am&&j>m){steps.push({html:view(i,j,m),note:`binary search(${i}, ${j}): m = ${m}, a${m} = ${am}. x > a${m} → 오른쪽 (${m+1} ~ ${j})`});i=m+1;continue;}
      res=0;steps.push({html:view(i,j,m),note:`m = ${m}, a${m} = ${am} ≠ x 이고 더 줄일 범위가 없음 → 0 반환 (없음)`});break;}
    steps.push({html:`<div class="dm-result"><p>반환값: <b>${res}</b>${res?` (a${res} = ${x})`:' — 수열에 없음'}</p><p>재귀 호출 ${steps.length}번 (원소 ${arr.length}개, log₂ ${arr.length} ≈ ${Math.log2(arr.length).toFixed(1)})</p></div>`,note:'결과'});
    return steps;});
},
merge(root,n){
  root.innerHTML=shell('merge',field('a','정렬할 리스트','8, 2, 4, 6, 9, 7, 10, 1, 5, 3'),stepControls);
  stepper(root,()=>{const arr=val(root,'a').split(/[ ,]+/).filter(Boolean).map(Number);if(!arr.length||arr.some(isNaN))throw Error('숫자를 쉼표로 구분해 입력하세요.');if(arr.length>16)throw Error('16개 이하로 입력하세요.');
    const steps=[];let total=0;
    const rec=(L,depth)=>{if(L.length<=1)return L;const m=Math.floor(L.length/2),L1=L.slice(0,m),L2=L.slice(m);steps.push({html:`<p class="dm-split">${'　'.repeat(depth)}[${L.join(', ')}] → [${L1.join(', ')}] | [${L2.join(', ')}]</p>`,note:`분할: m = ⌊${L.length}/2⌋ = ${m} (비교 없음)`});
      const A=rec(L1,depth+1),B=rec(L2,depth+1);const out=[],log=[];let i=0,j=0,c=0;
      while(i<A.length&&j<B.length){c++;if(A[i]<=B[j]){log.push(`${A[i]} ≤ ${B[j]} → ${A[i]}`);out.push(A[i++]);}else{log.push(`${A[i]} > ${B[j]} → ${B[j]}`);out.push(B[j++]);}}
      const rest=A.slice(i).concat(B.slice(j));out.push(...rest);total+=c;
      steps.push({html:`<p class="dm-merge">merge([${A.join(', ')}], [${B.join(', ')}]) = <b>[${out.join(', ')}]</b></p><p class="dm-small">비교: ${log.join(' · ')}${rest.length?` · 남은 ${rest.join(', ')} 붙임`:''}</p><p class="dm-small">이번 비교 ${c}번 (상한 ${A.length}+${B.length}−1 = ${A.length+B.length-1}), 누적 ${total}번</p>`,note:'병합: 맨 앞끼리 비교해 작은 것을 꺼냅니다.'});return out;};
    const res=rec(arr,0);const nn=arr.length,lg=Math.log2(nn);
    steps.push({html:`<div class="dm-result"><p>결과: <b>[${res.join(', ')}]</b></p><p>전체 비교 ${total}번${Number.isInteger(lg)?` · n = 2^${lg}이므로 상한 n log n − n + 1 = ${nn*lg-nn+1}`:''}</p></div>`,note:'결과'});
    return steps;});
},
product(root,n){
  root.innerHTML=shell('product',field('s','자리별 기호 (자리마다 | 로 구분)',n===53?'a,b,c|a,b,c':'0,1|0,1|0,1')+sel('rep','같은 기호 반복',[['y','허용'],['n','금지 (서로 다르게)']],'y'),stepControls);
  stepper(root,()=>{const slots=val(root,'s').split('|').map(x=>x.split(',').map(s=>s.trim()).filter(Boolean));if(slots.length>6||slots.some(s=>!s.length))throw Error('자리 1~6개, 각 자리에 기호를 1개 이상 입력하세요.');const rep=val(root,'rep')==='y';
    let res=[[]];const steps=[];
    slots.forEach((opts,i)=>{const nx=[];for(const r of res)for(const o of opts)if(rep||!r.includes(o))nx.push(r.concat(o));res=nx;
      steps.push({html:`<p>${i+1}번째 자리 선택지: {${opts.map(esc).join(', ')}}${rep?'':' (앞에서 쓴 것 제외)'}</p><p>지금까지 경우의 수: <b>${fmt(res.length)}</b></p><div class="dm-list">${res.slice(0,64).map(r=>`<span>${esc(r.join(''))}</span>`).join('')}${res.length>64?'<span>…</span>':''}</div>`,note:'곱의 법칙: 앞에서 만든 경우 각각에 이 자리의 선택을 이어 붙입니다.'});});
    steps.push({html:`<div class="dm-result"><p>${rep?slots.map(s=>s.length).join(' × ')+' = ':''}<b>${fmt(res.length)}</b>가지</p>${rep?'':'<p class="dm-small">반복 금지면 자리마다 남은 가짓수가 줄어듭니다.</p>'}</div>`,note:'결과'});
    return steps;});
},
incl(root,n){
  root.innerHTML=shell('incl',field('len','비트열 길이 (3~10)',8,'type=number min=3 max=10')+field('pre','조건 A: 이 비트로 시작','1')+field('suf','조건 B: 이 비트로 끝','00'),stepControls);
  stepper(root,()=>{const L=num(val(root,'len'),3,10,8),pre=val(root,'pre').trim(),suf=val(root,'suf').trim();if(!/^[01]*$/.test(pre+suf)||pre.length+suf.length>L)throw Error('조건은 0과 1로, 길이 합이 비트열 길이 이하가 되게 입력하세요.');
    const all=[];for(let i=0;i<2**L;i++)all.push(i.toString(2).padStart(L,'0'));
    const A=all.filter(s=>s.startsWith(pre)),B=all.filter(s=>s.endsWith(suf)),AB=A.filter(s=>s.endsWith(suf)),U=all.filter(s=>s.startsWith(pre)||s.endsWith(suf));
    const list=xs=>L<=5?`<div class="dm-list">${xs.map(s=>`<span>${s}</span>`).join('')}</div>`:'';
    return [
      {html:`<p>|A| = ${pre||'(조건 없음)'}로 시작 = 2^${L-pre.length} = <b>${A.length}</b></p>${list(A)}`,note:`고정된 앞 ${pre.length}자리를 빼고 나머지 ${L-pre.length}자리가 자유롭습니다.`},
      {html:`<p>|B| = ${suf||'(조건 없음)'}로 끝 = 2^${L-suf.length} = <b>${B.length}</b></p>${list(B)}`,note:`고정된 뒤 ${suf.length}자리를 빼고 나머지 ${L-suf.length}자리가 자유롭습니다.`},
      {html:`<p>|A ∩ B| = 둘 다 = 2^${L-pre.length-suf.length} = <b>${AB.length}</b></p>${list(AB)}`,note:'두 조건을 모두 만족: 고정 자리가 더 많습니다.'},
      {html:`<div class="dm-result"><p>|A ∪ B| = ${A.length} + ${B.length} − ${AB.length} = <b>${A.length+B.length-AB.length}</b></p><p>직접 센 결과: ${U.length} ${U.length===A.length+B.length-AB.length?'✔':'✘'}</p><p class="dm-small">겹침을 빼지 않으면 ${A.length+B.length}로 ${AB.length}만큼 많이 셉니다.</p></div>`,note:'포함배제 원리'}];});
},
circle(root,n){
  root.innerHTML=shell('circle',field('k','사람 수 (3~5)',4,'type=number min=3 max=5'),stepControls);
  stepper(root,()=>{const k=num(val(root,'k'),3,5,4),ppl='ABCDE'.slice(0,k).split('');const perms=[];const go=(cur,rest)=>{if(!rest.length){perms.push(cur.join(''));return;}rest.forEach((p,i)=>go(cur.concat(p),rest.filter((_,j)=>j!==i)));};go([],ppl);
    const groups=new Map();for(const s of perms){let best=s;for(let r=1;r<k;r++){const t=s.slice(r)+s.slice(0,r);if(t<best)best=t;}if(!groups.has(best))groups.set(best,[]);groups.get(best).push(s);}
    return [{html:`<p>자리 1~${k}에 일렬로 앉히기: ${k}! = <b>${perms.length}</b></p><div class="dm-list">${perms.map(s=>`<span>${s}</span>`).join('')}</div>`,note:'먼저 자리 번호를 붙여 모두 셉니다.'},
      {html:`<p>회전해서 같아지는 것끼리 묶기 (각 묶음 ${k}개)</p>${[...groups.values()].map(g=>`<div class="dm-group">${g.map(s=>`<span>${s}</span>`).join('')}</div>`).join('')}`,note:'원탁에서는 모두 한 칸씩 돌려 앉아도 이웃이 같습니다.'},
      {html:`<div class="dm-result"><p>${k}! / ${k} = ${perms.length} / ${k} = <b>${groups.size}</b>가지 = (${k}−1)!</p></div>`,note:'나눗셈 법칙'}];});
},
pigeon(root,n){
  root.innerHTML=shell('pigeon',field('N','물건 수 N',n===26?13:10,'type=number min=1 max=60')+field('k','상자 수 k',n===26?12:3,'type=number min=1 max=12')+sel('how','넣는 방법',[['even','최대한 고르게 (최악의 경우)'],['rand','무작위']],'even'),stepControls);
  stepper(root,()=>{const N=num(val(root,'N'),1,60,10),k=num(val(root,'k'),1,12,3),even=val(root,'how')==='even',box=Array(k).fill(0),steps=[];
    for(let i=0;i<N;i++){const b=even?i%k:Math.floor(Math.random()*k);box[b]++;if(i===N-1||N<=20)steps.push({html:`<div class="dm-boxes">${box.map((c,j)=>`<div class="dm-box ${j===b?'dm-now':''}"><b>${j+1}</b><span>${'●'.repeat(Math.min(c,20))}${c>20?'…':''}</span><small>${c}</small></div>`).join('')}</div>`,note:`${i+1}번째 물건을 ${b+1}번 상자에 넣음`});}
    const mx=Math.max(...box),need=Math.ceil(N/k);
    steps.push({html:steps[steps.length-1].html+`<div class="dm-result"><p>가장 많이 든 상자: <b>${mx}</b>개</p><p>일반화된 비둘기집 원리: ⌈${N}/${k}⌉ = <b>${need}</b> 이상 보장 → ${mx} ≥ ${need} ${mx>=need?'✔':'✘'}</p><p class="dm-small">"최대한 고르게"로 넣어도 ${need}개가 든 상자가 생깁니다. 이것이 최악의 경우입니다.</p></div>`,note:'결과'});
    return steps;});
},
combi(root,n){
  const def=n>=36?'c':'p';
  root.innerHTML=shell('combi',field('n','원소 수 n (1~7)',4,'type=number min=1 max=7')+field('r','고를 개수 r (0~5)',2,'type=number min=0 max=5')+sel('ord','순서',[['p','따짐 (순열)'],['c','따지지 않음 (조합)']],def)+sel('rep','반복',[['n','허용 안 함'],['y','허용']],'n'),stepControls);
  stepper(root,()=>{const N=num(val(root,'n'),1,7,4),R=num(val(root,'r'),0,5,2),ord=val(root,'ord')==='p',rep=val(root,'rep')==='y',S='abcdefg'.slice(0,N).split(''),out=[];
    if(!rep&&R>N)throw Error('반복 없이 n보다 많이 고를 수 없습니다. r을 줄이거나 반복을 허용하세요.');
    const go=(cur,start,used)=>{if(cur.length===R){out.push(cur.join(''));return;}for(let i=ord?0:start;i<N;i++){if(!rep&&used.has(i))continue;const u=new Set(used);u.add(i);go(cur.concat(S[i]),rep?i:i+1,u);}};
    go([],0,new Set());
    const formula=ord?(rep?`n^r = ${N}^${R}`:`P(${N},${R}) = ${N}!/${N-R}!`):(rep?`C(n+r−1, r) = C(${N+R-1},${R})`:`C(${N},${R}) = ${N}!/(${R}!·${N-R}!)`);
    const val2=ord?(rep?BigInt(N)**BigInt(R):P(N,R)):(rep?C(N+R-1,R):C(N,R));
    return [{html:`<p>집합 {${S.join(', ')}}에서 ${R}개, ${ord?'순서 따짐':'순서 무관'}, ${rep?'반복 허용':'반복 없음'}</p><div class="dm-list">${out.slice(0,210).map(s=>`<span>${ord?s.split('').join(','):'{'+s.split('').join(',')+'}'}</span>`).join('')}${out.length>210?'<span>…</span>':''}</div>`,note:'모든 경우를 직접 나열했습니다.'},
      {html:`<div class="dm-result"><p>나열한 개수: <b>${out.length}</b></p><p>공식: ${formula} = <b>${fmt(val2)}</b> ${BigInt(out.length)===val2?'✔':'✘'}</p><p class="dm-small">순서를 바꿔 보세요: 같은 n, r에서 순열 수 = 조합 수 × r! (반복 없음일 때)</p></div>`,note:'공식과 비교'}];});
},
pascal(root,n){
  root.innerHTML=shell('pascal',field('rows','행 수 (n = 0 ~ 12)',7,'type=number min=1 max=12')+field('a','(ax + by)^n 의 a',n===47?2:1,'type=number')+field('b','b',n===47?-3:1,'type=number')+field('e','n',n===47?5:4,'type=number min=0 max=12')+field('j','y의 지수 j',2,'type=number min=0 max=12'),stepControls);
  stepper(root,()=>{const rows=num(val(root,'rows'),1,12,7),steps=[];const tri=[];
    for(let i=0;i<=rows;i++){tri.push(Array.from({length:i+1},(_,k)=>Number(C(i,k))));
      steps.push({html:`<div class="dm-pascal">${tri.map((r,ri)=>`<div><small>n=${ri}</small>${r.map((v,k)=>`<span class="${ri===i?'dm-now':''}" title="C(${ri},${k})">${v}</span>`).join('')}</div>`).join('')}</div>`,note:i===0?'C(0,0) = 1':`n=${i} 행: 양 끝 1, 안쪽은 위 두 수의 합 (파스칼 항등식). 행의 합 = 2^${i} = ${2**i}`});}
    const A=BigInt(num(val(root,'a'),-9,9,1)),B=BigInt(num(val(root,'b'),-9,9,1)),E=num(val(root,'e'),0,12,4),J=Math.min(num(val(root,'j'),0,12,2),E);
    const coef=C(E,J)*A**BigInt(E-J)*B**BigInt(J);
    steps.push({html:`<div class="dm-result"><p>(${A}x + ${B<0n?'('+B+')':B}y)^${E} 에서 x^${E-J} y^${J} 의 계수</p><p>= C(${E}, ${J}) · ${A}^${E-J} · (${B})^${J} = ${C(E,J)} · ${A**BigInt(E-J)} · ${B**BigInt(J)} = <b>${fmt(coef)}</b></p><p class="dm-small">${B<0n&&J%2?'음수의 홀수 제곱 → 계수가 음수입니다.':'부호를 확인하세요: 음수의 짝수 제곱은 양수.'}</p></div>`,note:'이항정리로 특정 항의 계수 계산'});
    return steps;});
},
stars(root,n){
  const d=n===58?[4,6]:n===57?[3,11]:[3,4];
  root.innerHTML=shell('stars',field('n','종류 수 n (칸)',d[0],'type=number min=1 max=7')+field('r','고를 개수 r (별)',d[1],'type=number min=0 max=12'),stepControls);
  stepper(root,()=>{const N=num(val(root,'n'),1,7,3),R=num(val(root,'r'),0,12,4),out=[];
    const go=(i,left,cur)=>{if(i===N-1){out.push(cur.concat(left));return;}for(let x=left;x>=0;x--)go(i+1,left-x,cur.concat(x));};go(0,R,[]);
    const sb=v=>v.map(x=>'★'.repeat(x)).join('|');
    return [{html:`<p>${N}칸 → 막대 ${N-1}개, 별 ${R}개, 자리 ${N+R-1}개</p><p class="dm-small">예: (${out[0].join(', ')}) → <code>${sb(out[0])}</code></p>`,note:'각 선택을 별과 막대 배열로 바꿉니다.'},
      {html:`<div class="dm-scroll"><div class="dm-list dm-sb">${out.slice(0,300).map(v=>`<span title="(${v.join(', ')})"><code>${sb(v)}</code><small>(${v.join(',')})</small></span>`).join('')}${out.length>300?'<span>…</span>':''}</div></div>`,note:'모든 배열을 나열했습니다(칸마다 별 개수 = 그 종류를 고른 개수).'},
      {html:`<div class="dm-result"><p>나열한 개수: <b>${fmt(out.length)}</b></p><p>C(n + r − 1, r) = C(${N+R-1}, ${R}) = <b>${fmt(C(N+R-1,R))}</b> ${BigInt(out.length)===C(N+R-1,R)?'✔':'✘'}</p><p class="dm-small">= x1 + … + x${N} = ${R} 의 음이 아닌 정수해 개수</p></div>`,note:'공식과 비교'}];});
},
anagram(root,n){
  root.innerHTML=shell('anagram',field('w','단어 (최대 10글자)','SUCCESS'),stepControls);
  stepper(root,()=>{const w=val(root,'w').trim().toUpperCase().replace(/\s/g,'');if(!w||w.length>10)throw Error('1~10글자 단어를 입력하세요.');
    const cnt={};for(const ch of w)cnt[ch]=(cnt[ch]||0)+1;const ks=Object.keys(cnt);
    let total=fact(w.length);for(const k of ks)total/=fact(cnt[k]);
    let left=w.length;const parts=ks.map(k=>{const c=C(left,cnt[k]);const s=`${k}×${cnt[k]}: C(${left},${cnt[k]}) = ${c}`;left-=cnt[k];return s;});
    let list='';if(total<=240n){const set=new Set();const go=(cur,rest)=>{if(!rest.length){set.add(cur);return;}const seen=new Set();for(let i=0;i<rest.length;i++){if(seen.has(rest[i]))continue;seen.add(rest[i]);go(cur+rest[i],rest.slice(0,i)+rest.slice(i+1));}};go('',w.split('').sort().join(''));list=`<div class="dm-list">${[...set].map(s=>`<span>${s}</span>`).join('')}</div><p class="dm-small">직접 나열: ${set.size}개</p>`;}
    return [{html:`<p>글자 개수: ${ks.map(k=>`${k}×${cnt[k]}`).join(', ')} (총 ${w.length})</p><p>같은 글자도 구별하면 ${w.length}! = ${fmt(fact(w.length))}</p>`,note:'같은 글자끼리 자리를 바꿔도 같은 문자열입니다.'},
      {html:`<p>${parts.map(esc).join('<br>')}</p>`,note:'글자 종류마다 남은 자리에서 위치를 고릅니다.'},
      {html:`<div class="dm-result"><p>${w.length}! / (${ks.map(k=>cnt[k]+'!').join(' · ')}) = <b>${fmt(total)}</b></p></div>${list}`,note:'정리 3 공식'}];});
},
boxes(root,n){
  root.innerHTML=shell('boxes',field('o','대상 수 (1~6)',4,'type=number min=1 max=6')+field('b','상자 수 (1~4)',3,'type=number min=1 max=4'),stepControls);
  stepper(root,()=>{const O=num(val(root,'o'),1,6,4),B=num(val(root,'b'),1,4,3);
    // 구별O→구별O: B^O
    const dd=B**O;
    // 구별X→구별O: 별과 막대
    const id=Number(C(O+B-1,B-1));
    // 구별O→구별X: 집합 분할 블록 수 ≤ B (스털링 수 합)
    const S=Array.from({length:O+1},()=>Array(O+1).fill(0));S[0][0]=1;for(let i=1;i<=O;i++)for(let k=1;k<=i;k++)S[i][k]=k*S[i-1][k]+S[i-1][k-1];let di=0;for(let k=1;k<=Math.min(B,O);k++)di+=S[O][k];
    // 구별X→구별X: O의 분할 중 부분 ≤ B개
    const parts=[];const go=(rem,max,cur)=>{if(rem===0){if(cur.length<=B)parts.push(cur);return;}for(let x=Math.min(rem,max);x>=1;x--)go(rem-x,x,cur.concat(x));};go(O,O,[]);
    return [{html:table(['','상자 구별 O','상자 구별 X'],[{cells:['<b>대상 구별 O</b>',`${B}^${O} = <b>${dd}</b><br><small>대상마다 상자 선택 (개수 제한 없음)</small>`,`<b>${di}</b><br><small>제2종 스털링 수 S(${O},1)+…+S(${O},${Math.min(B,O)})</small>`]},{cells:['<b>대상 구별 X</b>',`C(${O}+${B}−1, ${B}−1) = <b>${id}</b><br><small>별과 막대</small>`,`<b>${parts.length}</b><br><small>${O}을(를) ${B}개 이하 양의 정수 합으로</small>`]}]),note:'빈 상자를 허용한 네 경우의 개수입니다(직접 계산).'},
      {html:`<p>대상 구별 X · 상자 구별 X: ${O}의 분할 (부분 ${B}개 이하)</p><div class="dm-list">${parts.map(p=>`<span>${p.join('+')}</span>`).join('')}</div><p class="dm-small">자료 예: 같은 책 6권, 똑같은 상자 4개 → 9가지. 대상 6, 상자 4로 바꿔 확인하세요.</p>`,note:'정수 분할 나열'},
      {html:`<p class="dm-small">자료 예: 직원 4명, 똑같은 사무실 3개 → 14가지 (대상 4, 상자 3의 오른쪽 위 칸). 63쪽 n!/(n1!···nk!)은 "상자별 개수가 정해진" 경우라 이 표의 ${B}^${O}과 다릅니다.</p>`,note:'자료 예제와 대조'}];});
}};

function parenPath(t){ // 균형 괄호 생성 경로 (규칙 역추적)
  const memo=new Map();
  const f=s=>{if(memo.has(s))return memo.get(s);let r=null;
    if(s==='()')r=['()'];
    else if(s.length>=4&&s.length%2===0){
      if(s.startsWith('()')){const p=f(s.slice(2));if(p)r=p.concat(s);}
      if(!r&&s.endsWith('()')){const p=f(s.slice(0,-2));if(p)r=p.concat(s);}
      if(!r&&s[0]==='('&&s[s.length-1]===')'){const p=f(s.slice(1,-1));if(p)r=p.concat(s);}
    }
    memo.set(s,r);return r;};
  return /^[()]+$/.test(t)?f(t):null;
}
function parenWhy(t){if(!/^[()]*$/.test(t))return '괄호 이외의 문자가 있습니다.';const o=[...t].filter(c=>c==='(').length,c=t.length-o;if(o!==c)return `( ${o}개, ) ${c}개로 개수가 다릅니다. P의 모든 원소는 개수가 같습니다(구조적 귀납법).`;if(t[0]!=='(')return 'P의 모든 원소는 ( 로 시작합니다(세 규칙 모두 결과가 ( 로 시작).';let d=0;for(const ch of t){d+=ch==='('?1:-1;if(d<0)return '앞에서부터 읽을 때 ) 가 ( 보다 많아지는 지점이 있습니다.';}return '규칙 ()w, (w), w() 로 만들 수 없습니다.';}

const DM={mode,stop,mount(root,ch,n){stop();const k=mode(ch,n);if(!k){root.innerHTML='';return;}try{LABS[k](root,n);}catch(err){root.innerHTML=`<p class="dm-err">실험을 불러오지 못했습니다: ${esc(err.message)}</p>`;}}};
window.DMLab=DM;
const orig=window.PLLab;
if(orig){window.PLLab={...orig,mount(root,ch,n,cb){if(String(ch).startsWith('dm')){orig.stop();return DM.mount(root,ch,n);}stop();return orig.mount(root,ch,n,cb);},mode(ch,n){return String(ch).startsWith('dm')?DM.mode(ch,n):orig.mode(ch,n);},stop(){orig.stop();stop();}};}
})();
