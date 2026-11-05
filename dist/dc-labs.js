/* 데이터통신 실험실 · 입력에 따라 결정적으로(ALOHA 시뮬레이션만 난수) 동작하는 교육용 모델
 * PLLab.mount/mode를 감싸 dc 챕터에서 이 실험실을 사용한다. 실제 네트워크 장비를 실행하지 않는다. */
(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let timer=null;const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
const num=(v,lo,hi,d)=>{v=Number(v);return Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):d;};
const T={parity:'Parity 검사: 비트를 뒤집어 보기',checksum:'인터넷 checksum 계산',crc:'CRC 나눗셈 단계별 계산',aloha:'ALOHA 효율 실험',backoff:'이진 지수 백오프',addr:'다른 LAN으로 보내기: 홉별 주소 추적',sw:'자가 학습 스위치',vlan:'포트 기반 VLAN 전달',mpls:'MPLS 레이블 교환 따라가기',day:'웹 요청의 하루: 단계별 프로토콜'};
function mode(ch,n){
  if(ch==='dc09'){
    if(n===11||n===12)return 'parity';if(n===13)return 'checksum';if(n===14||n===15)return 'crc';
    if(n>=24&&n<=28)return 'aloha';if(n>=31&&n<=34)return 'backoff';
    if(n>=45&&n<=51)return 'addr';if(n>=60&&n<=67)return 'sw';if(n>=70&&n<=74)return 'vlan';
    if(n>=77&&n<=81)return 'mpls';if(n>=87&&n<=94)return 'day';
  }
  return null;
}
const shell=(k,inputs,body)=>`<section class="dm-lab"><h3>${T[k]}</h3><p class="dm-model-note">교육용 모델 · 조건을 바꾸고 [적용]을 누르세요</p>${inputs?`<div class="dm-inputs">${inputs}<button class="s-btn" data-a="apply">적용</button></div>`:''}${body}</section>`;
const field=(n,l,v,a='')=>`<label>${l}<input name="${n}" value="${esc(v)}" ${a}></label>`;
const sel=(n,l,o,v)=>`<label>${l}<select name="${n}">${o.map(([k,t])=>`<option value="${k}" ${k===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
const val=(r,n)=>r.querySelector(`[name=${n}]`).value;
const ctrl='<div class="dm-controls"><button class="s-btn" data-a="prev">‹ 이전</button><button class="s-btn teal" data-a="next">다음 ›</button><button class="s-btn" data-a="play">자동 재생</button><button class="s-btn" data-a="end">끝으로</button><span class="dm-count"></span></div><p class="dm-step-note" aria-live="polite"></p><div class="dm-out"></div>';
function stepper(root,build){
  const out=root.querySelector('.dm-out'),note=root.querySelector('.dm-step-note'),cnt=root.querySelector('.dm-count');let steps=[],i=0;
  const render=()=>{const s=steps[i]||{};out.innerHTML=s.html||'';note.textContent=s.note||'';cnt.textContent=steps.length?`${i+1} / ${steps.length}단계`:'';root.querySelector('[data-a=prev]').disabled=i<=0;root.querySelector('[data-a=next]').disabled=i>=steps.length-1;};
  const reset=()=>{stop();root.querySelector('[data-a=play]').textContent='자동 재생';try{steps=build();}catch(e){steps=[{html:`<p class="dm-err">${esc(e.message)}</p>`}];}i=0;render();};
  root.querySelector('[data-a=prev]').onclick=()=>{stop();i=Math.max(0,i-1);render();};
  root.querySelector('[data-a=next]').onclick=()=>{stop();i=Math.min(steps.length-1,i+1);render();};
  root.querySelector('[data-a=end]').onclick=()=>{stop();i=steps.length-1;render();};
  root.querySelector('[data-a=play]').onclick=e=>{if(timer){stop();e.target.textContent='자동 재생';return;}e.target.textContent='일시 정지';timer=setInterval(()=>{if(i>=steps.length-1){stop();e.target.textContent='자동 재생';return;}i++;render();},1300);};
  const ap=root.querySelector('[data-a=apply]');if(ap)ap.onclick=reset;
  root.querySelectorAll('.dm-inputs input,.dm-inputs select').forEach(el=>el.onchange=reset);reset();
}
const tbl=(h,rows)=>`<div class="dm-scroll"><table class="dm-table"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr${r.cls?` class="${r.cls}"`:''}>${r.c.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const bitsOnly=s=>{s=String(s).replace(/\s/g,'');if(!/^[01]+$/.test(s))throw Error('0과 1만 입력하세요.');return s;};

const LABS={
parity(root){
  root.innerHTML=shell('parity',sel('m','방식',[['2d','2차원 parity (짝수)'],['1d','단일 비트 parity (짝수)']],'2d')+field('d','데이터 (행은 / 로 구분)','10101/11110/01110')+field('f','뒤집을 비트 위치 (행,열 / 1d는 열만, 쉼표로 여러 개)','2,3'),ctrl);
  stepper(root,()=>{const m=val(root,'m');const rows=val(root,'d').split('/').map(bitsOnly);
    if(m==='1d'){const d=rows.join('');const p=(d.split('').filter(x=>x==='1').length)%2;const pos=val(root,'f').split(',').map(x=>parseInt(x)).filter(x=>x>=1&&x<=d.length+1);
      let r=(d+p).split('');pos.forEach(k=>r[k-1]=r[k-1]==='1'?'0':'1');const ones=r.filter(x=>x==='1').length;
      return [{html:`<p>데이터 ${d} → 1의 개수 ${d.split('').filter(x=>x==='1').length}개 → 짝수 parity 비트 <b>${p}</b></p><p class="dm-small">전송: ${d}<b>${p}</b></p>`,note:'1의 총 개수를 짝수로 맞추는 비트를 붙입니다.'},
        {html:`<p>수신: ${r.join('')} (뒤집은 비트 ${pos.length}개)</p><div class="dm-result"><p>수신한 1의 개수 ${ones}개 → ${ones%2?'<b>홀수 → 오류 검출</b>':'<b>짝수 → 오류 없음으로 판단</b>'}</p><p class="dm-small">${pos.length%2===0&&pos.length?'짝수 개 비트가 바뀌면 단일 parity는 검출하지 못합니다.':pos.length?'홀수 개 비트 오류는 검출되지만 위치는 알 수 없습니다.':''}</p></div>`,note:'수신측 검사'}];}
    const W=rows[0].length;if(rows.some(r=>r.length!==W))throw Error('모든 행의 길이를 같게 입력하세요.');
    const rp=rows.map(r=>r.split('').filter(x=>x==='1').length%2);const cp=Array.from({length:W},(_,j)=>rows.filter(r=>r[j]==='1').length%2);const corner=rp.reduce((a,b)=>a^b,0);
    const g=rows.map(r=>r.split(''));const flips=val(root,'f').split(';').join(',').split(',').map(x=>parseInt(x));const fl=[];for(let k=0;k+1<flips.length;k+=2){const a=flips[k],b=flips[k+1];if(a>=1&&a<=rows.length&&b>=1&&b<=W){fl.push([a-1,b-1]);g[a-1][b-1]=g[a-1][b-1]==='1'?'0':'1';}}
    const badR=g.map((r,i)=>r.filter(x=>x==='1').length%2!==rp[i]),badC=Array.from({length:W},(_,j)=>g.filter(r=>r[j]==='1').length%2!==cp[j]);
    const draw=(G,mark)=>`<div class="dm-scroll"><table class="dm-table dm-grid"><tbody>${G.map((r,i)=>`<tr>${r.map((x,j)=>`<td class="${mark&&fl.some(([a,b])=>a===i&&b===j)?'dm-now':''}">${x}</td>`).join('')}<td class="dc-par ${mark&&badR[i]?'dc-bad':''}">${rp[i]}</td></tr>`).join('')}<tr>${cp.map((x,j)=>`<td class="dc-par ${mark&&badC[j]?'dc-bad':''}">${x}</td>`).join('')}<td class="dc-par">${corner}</td></tr></tbody></table></div>`;
    const nr=badR.filter(Boolean).length,nc=badC.filter(Boolean).length;let verdict;
    if(!nr&&!nc)verdict=fl.length?'모든 parity가 맞습니다. 바뀐 비트들이 서로 상쇄되어 검출되지 않았습니다.':'오류 없음.';
    else if(nr===1&&nc===1){const i=badR.indexOf(true),j=badC.indexOf(true);verdict=`틀린 행 ${i+1}, 틀린 열 ${j+1} → 교차점 비트를 뒤집어 <b>정정</b>할 수 있습니다.`;}
    else verdict=`틀린 행 ${nr}개, 틀린 열 ${nc}개 → 오류는 <b>검출</b>되지만 위치를 하나로 정할 수 없어 정정할 수 없습니다.`;
    return [{html:draw(rows.map(r=>r.split('')),false),note:'행 끝과 열 아래에 짝수 parity를 계산했습니다(오른쪽 아래 = 전체 parity).'},{html:draw(g,true)+`<div class="dm-result"><p>${verdict}</p></div>`,note:'지정한 비트를 뒤집은 뒤 수신측이 행·열 parity를 다시 계산합니다.'}];});
},
checksum(root){
  root.innerHTML=shell('checksum',field('w','16비트 단어들 (쉼표로 구분)','1110011001100110, 1101010101010101'),ctrl);
  stepper(root,()=>{const ws=val(root,'w').split(',').map(bitsOnly);if(ws.some(w=>w.length!==16))throw Error('각 단어는 16비트로 입력하세요.');
    let sum=0;const steps=[];const b=x=>x.toString(2).padStart(16,'0').replace(/(\d{4})(?=\d)/g,'$1 ');
    ws.forEach((w,i)=>{const v=parseInt(w,2);const raw=sum+v;let s=raw;let wrap='';if(s>0xffff){s=(s&0xffff)+1;wrap=` → 올림 1을 다시 더함(wraparound): ${b(s)}`;}steps.push({html:`<p class="dm-merge">${i?b(sum):'0000 0000 0000 0000'}<br>+ ${b(v)}<br>= ${raw.toString(2).padStart(16,'0')}${wrap}</p>`,note:`${i+1}번째 단어를 더합니다.`});sum=s;});
    const cs=(~sum)&0xffff;const check=(sum+cs)&0xffff;
    steps.push({html:`<div class="dm-result"><p>합: ${b(sum)}</p><p>checksum = 1의 보수 = <b>${b(cs)}</b></p><p class="dm-small">수신측: 합 + checksum = ${b(check)} ${check===0xffff?'→ 모두 1, 오류 검출 안 됨':'→ 오류'}</p></div>`,note:'합의 비트를 모두 뒤집습니다.'});return steps;});
},
crc(root){
  root.innerHTML=shell('crc',field('d','데이터 D','101110')+field('g','생성자 G','1001')+field('f','수신측에서 뒤집을 비트 위치 (선택, 쉼표)',''),ctrl);
  stepper(root,()=>{const D=bitsOnly(val(root,'d')),G=bitsOnly(val(root,'g'));if(G.length<2||G[0]!=='1')throw Error('G는 1로 시작하는 2비트 이상이어야 합니다.');if(D.length>24)throw Error('D는 24비트 이하로 입력하세요.');
    const r=G.length-1;const div=(bits)=>{const a=bits.split('');const lines=[];for(let i=0;i+r<a.length;i++){if(a[i]==='1'){for(let j=0;j<G.length;j++)a[i+j]=a[i+j]===G[j]?'0':'1';lines.push({i,xor:G});}else lines.push({i,xor:'0'.repeat(G.length)});lines[lines.length-1].after=a.join('');}return {rem:a.slice(-r).join(''),lines};};
    const padded=D+'0'.repeat(r),res=div(padded),steps=[];
    steps.push({html:`<p>r = |G| − 1 = ${r}. D 뒤에 0을 ${r}개 붙임: <code>${padded}</code></p>`,note:'D·2^r 를 만듭니다.'});
    res.lines.forEach((l,k)=>steps.push({html:`<p class="dm-merge">${l.after.split('').map((c,j)=>j<l.i+1?`<span class="dc-dim">${c}</span>`:j<=l.i+r?`<b>${c}</b>`:c).join('')}</p><p class="dm-small">위치 ${l.i+1}: ${l.xor===G?'맨 앞 비트 1 → G('+G+')와 XOR':'맨 앞 비트 0 → 0…0과 XOR(변화 없음)'}</p>`,note:`modulo 2 나눗셈 ${k+1}단계 (빌림 없는 XOR)`}));
    const tx=D+res.rem;let rx=tx.split('');const fl=val(root,'f').split(',').map(x=>parseInt(x)).filter(x=>x>=1&&x<=tx.length);fl.forEach(k=>rx[k-1]=rx[k-1]==='1'?'0':'1');rx=rx.join('');const chk=div(rx).rem;
    steps.push({html:`<div class="dm-result"><p>나머지 R = <b>${res.rem}</b> → 전송 비트열 <code>${D} ${res.rem}</code></p><p>수신 ${fl.length?`(비트 ${fl.join(', ')} 뒤집음)`:''}: <code>${rx}</code> ÷ ${G} → 나머지 <b>${chk}</b> ${/^0+$/.test(chk)?'→ 오류 검출 안 됨':'→ <b>오류 검출!</b>'}</p></div>`,note:'결과와 수신측 검사'});return steps;});
},
aloha(root){
  root.innerHTML=shell('aloha',sel('t','방식',[['s','Slotted ALOHA'],['p','순수 ALOHA']],'s')+field('n','노드 수 N',10,'type=number min=2 max=50')+field('p','전송 확률 p',0.1,'type=number step=0.01 min=0.01 max=1')+field('k','시뮬레이션 슬롯 수',2000,'type=number min=100 max=20000'),ctrl);
  stepper(root,()=>{const sl=val(root,'t')==='s',N=num(val(root,'n'),2,50,10),p=num(val(root,'p'),0.01,1,0.1),K=num(val(root,'k'),100,20000,2000);
    const th=sl?N*p*Math.pow(1-p,N-1):N*p*Math.pow(1-p,2*(N-1));
    let ok=0,prev=0;const show=[];for(let s=0;s<K;s++){let c=0;for(let i=0;i<N;i++)if(Math.random()<p)c++;
      if(sl){if(c===1)ok++;if(s<24)show.push(c===0?'·':c===1?'S':'C');}
      else{}}
    let sim;
    if(!sl){ // 순수 ALOHA: 각 프레임 시작 시각을 연속으로 뽑아 겹침 판정
      const starts=[];for(let s=0;s<K;s++)for(let i=0;i<N;i++)if(Math.random()<p)starts.push(s+Math.random());starts.sort((a,b)=>a-b);let good=0;for(let i=0;i<starts.length;i++){const a=i>0?starts[i]-starts[i-1]:9,b=i<starts.length-1?starts[i+1]-starts[i]:9;if(a>=1&&b>=1)good++;}sim=good/K;}
    else sim=ok/K;
    const best=sl?1/N:1/(2*N-1),bestv=sl?N*best*Math.pow(1-best,N-1):N*best*Math.pow(1-best,2*(N-1));
    return [{html:sl?`<p>처음 24슬롯: <code>${show.join(' ')}</code></p><p class="dm-small">S = 성공(한 노드만 전송), C = 충돌, · = 빈 슬롯</p>`:'<p>순수 ALOHA는 슬롯이 없어, 프레임 시작 시각을 연속 시간으로 뽑아 앞뒤 1 이내 겹침을 판정합니다.</p>',note:'무작위 실험'},
      {html:`<div class="dm-result"><p>실험 효율(성공 비율): <b>${sim.toFixed(3)}</b></p><p>이론값 ${sl?'Np(1−p)^(N−1)':'Np(1−p)^(2(N−1))'} = <b>${th.toFixed(3)}</b></p><p class="dm-small">이 N에서 최적 p ≈ ${best.toFixed(3)} → 효율 ${bestv.toFixed(3)} · N → ∞ 극한: ${sl?'1/e ≈ 0.368':'1/(2e) ≈ 0.184'}</p></div>`,note:'실험값과 이론값 비교(난수라 실행마다 조금씩 다름)'}];});
},
backoff(root){
  root.innerHTML=shell('backoff',field('m','연속 충돌 횟수 m',3,'type=number min=1 max=16')+field('bps','링크 속도 (Mbps)',100,'type=number min=1 max=100000'),ctrl);
  stepper(root,()=>{const M=num(val(root,'m'),1,16,3),R=num(val(root,'bps'),1,1e5,100),steps=[];const bt=1/(R*1e6);
    for(let m=1;m<=M;m++){const hi=Math.pow(2,m)-1,K=Math.floor(Math.random()*(hi+1));steps.push({html:tbl(['충돌 m','K 범위','고른 K(예)','대기 = K·512비트 시간','최대 대기'],Array.from({length:m},(_,j)=>{const mm=j+1,h=Math.pow(2,mm)-1;return {c:[mm,`{0, …, ${h}}`,mm===m?K:'',mm===m?`${K}·512 = ${K*512}비트 시간 ≈ ${(K*512*bt*1e6).toFixed(2)} μs`:'',`${h*512}비트 시간`],cls:mm===m?'dm-now':''};})),note:`${m}번째 충돌: 범위 크기 2^${m} = ${hi+1}`});}
    steps.push({html:steps[steps.length-1].html+`<div class="dm-result"><p>충돌이 늘수록 범위가 두 배씩 커져 재충돌 확률이 줄어듭니다.</p><p class="dm-small">512비트 시간 = ${R} Mbps에서 ${(512*bt*1e6).toFixed(2)} μs. (표준은 m이 10을 넘으면 범위를 {0,…,1023}에 고정 — 슬라이드 밖 보충)</p></div>`,note:'정리'});return steps;});
},
addr(root){
  root.innerHTML=shell('addr','',ctrl);
  const A={ip:'111.111.111.111',mac:'74-29-9C-E8-FF-55'},R1={ip:'111.111.111.110',mac:'E6-E9-00-17-BB-4B'},R2={ip:'222.222.222.220',mac:'1A-23-F9-CD-06-9B'},B={ip:'222.222.222.222',mac:'49-BD-D2-C7-56-2A'};
  const fr=(ms,md,cls)=>`<div class="dc-frame ${cls||''}"><span class="dc-mac">MAC ${ms} → ${md}</span><span class="dc-ip">IP ${A.ip} → ${B.ip}</span><span>data</span></div>`;
  stepper(root,()=>[
    {html:`<p>A ${A.ip} / ${A.mac}<br>R(LAN1) ${R1.ip} / ${R1.mac} · R(LAN2) ${R2.ip} / ${R2.mac}<br>B ${B.ip} / ${B.mac}</p>`,note:'자료 51쪽 그림의 주소입니다. A는 B의 IP, R의 IP, R(LAN1쪽)의 MAC을 압니다.'},
    {html:`<p>A의 ARP 테이블에 R(${R1.ip})이 없다면: ARP 질의 → 목적지 MAC FF-FF-FF-FF-FF-FF → R이 ${R1.mac}로 응답</p>`,note:'첫 홉 라우터의 MAC을 ARP로 얻습니다(B의 MAC이 아님).'},
    {html:fr(A.mac,R1.mac,'dm-now')+'<p class="dm-small">LAN1 프레임: MAC 목적지 = R, IP 목적지 = B</p>',note:'A가 프레임을 만들어 LAN1로 보냅니다(자료 48쪽).'},
    {html:`<p>R(LAN1쪽)이 프레임 수신 → MAC 헤더 제거 → datagram(IP ${A.ip} → ${B.ip})을 IP 계층으로</p>`,note:'라우터는 IP 계층까지 올립니다(자료 49쪽).'},
    {html:`<p>포워딩 테이블: ${B.ip} → LAN2 인터페이스. ARP로 B의 MAC ${B.mac} 확인</p>`,note:'다음 홉이 B 자신이므로 B의 MAC이 필요합니다.'},
    {html:fr(R2.mac,B.mac,'dm-now')+'<p class="dm-small">LAN2 프레임: MAC 출발 = R(LAN2쪽), 목적 = B</p>',note:'새 프레임을 만들어 LAN2로 보냅니다(자료 50~51쪽).'},
    {html:fr(A.mac,R1.mac)+fr(R2.mac,B.mac)+'<div class="dm-result"><p>MAC 주소는 홉마다 바뀌고, IP 주소(A → B)는 끝까지 같습니다.</p></div>',note:'비교'}]);
},
sw(root){
  root.innerHTML=shell('sw',sel('topo','구성',[['one','스위치 1대 (A~F, 포트 1~6)'],['multi','스위치 4대 (S1~S4, 자료 67쪽)']],'one')+field('seq','보낼 프레임 순서 (출발>목적, 쉼표)','A>D, D>A, B>A, E>F'),ctrl);
  stepper(root,()=>{const multi=val(root,'topo')==='multi';
    // 스위치 1대: 호스트 A~F가 포트 1~6. 4대: S1(A,B,C)-S4, S2(D,E,F)-S4, S3(G,H,I)-S4. 각 스위치 포트: 호스트 1~3, 상향 4. S4 포트 1→S1, 2→S2, 3→S3
    const hosts=multi?'ABCDEFGHI':'ABCDEF';const seq=val(root,'seq').split(',').map(s=>s.trim().toUpperCase()).filter(Boolean).map(s=>s.split('>'));
    if(seq.some(x=>x.length!==2||!hosts.includes(x[0])||!hosts.includes(x[1])||x[0]===x[1]))throw Error(`출발>목적 형식으로, 호스트 ${hosts.split('').join(', ')} 중에서 입력하세요.`);
    const sws=multi?['S1','S2','S3','S4']:['S'];const tables=Object.fromEntries(sws.map(s=>[s,{}]));
    const home=h=>{if(!multi)return {sw:'S',port:hosts.indexOf(h)+1};const g=Math.floor(hosts.indexOf(h)/3);return {sw:'S'+(g+1),port:hosts.indexOf(h)%3+1};};
    const links=sw=>{ // 포트 → 이웃
      if(!multi)return Object.fromEntries(hosts.split('').map((h,i)=>[i+1,{host:h}]));
      if(sw==='S4')return {1:{sw:'S1',port:4},2:{sw:'S2',port:4},3:{sw:'S3',port:4}};
      const g=+sw[1]-1;const o={};for(let i=0;i<3;i++)o[i+1]={host:hosts[g*3+i]};o[4]={sw:'S4',port:g+1};return o;};
    const steps=[];
    const view=()=>`<div class="dc-tables">${sws.map(s=>`<div><b>${s}</b>${tbl(['MAC','포트'],Object.entries(tables[s]).map(([m,p])=>({c:[m,p]})))}</div>`).join('')}</div>`;
    for(const [src,dst] of seq){const log=[];const recv=new Set();
      const q=[{sw:home(src).sw,inPort:home(src).port}];
      while(q.length){const {sw,inPort}=q.shift();const L=links(sw);tables[sw][src]=inPort;const known=tables[sw][dst];
        let outs;if(known!==undefined){if(known===inPort){log.push(`${sw}: ${dst}는 들어온 포트 ${inPort}에 있음 → 버림(여과)`);outs=[];}else{log.push(`${sw}: 학습 (${src}→포트 ${inPort}), ${dst}는 포트 ${known} → 그 포트로만 전달`);outs=[known];}}
        else{outs=Object.keys(L).map(Number).filter(p=>p!==inPort);log.push(`${sw}: 학습 (${src}→포트 ${inPort}), ${dst} 위치 모름 → 포트 ${outs.join(', ')}로 flood`);}
        for(const p of outs){const nb=L[p];if(nb.host)recv.add(nb.host);else q.push({sw:nb.sw,inPort:nb.port});}}
      steps.push({html:`<p class="dm-merge">${log.map(esc).join('<br>')}</p><p class="dm-small">프레임을 받은 호스트: ${[...recv].join(', ')||'없음'} ${recv.has(dst)?'(목적지 도달)':''} — 목적지가 아닌 호스트는 어댑터가 버림</p>`+view(),note:`${src} → ${dst} 프레임`});}
    steps.push({html:view()+'<div class="dm-result"><p>테이블은 프레임의 출발지 MAC으로만 채워집니다. 프레임이 지나가지 않은 스위치는 그 호스트를 학습하지 못합니다.</p></div>',note:'최종 스위치 테이블'});return steps;});
},
vlan(root){
  root.innerHTML=shell('vlan',field('ee','EE VLAN 포트','1-8')+field('cs','CS VLAN 포트','9-15')+field('src','프레임이 들어온 포트',3,'type=number min=1 max=16')+sel('kind','프레임 종류',[['bc','브로드캐스트(ARP 등)'],['uc','다른 VLAN 호스트로 유니캐스트']],'bc'),ctrl);
  stepper(root,()=>{const rng=s=>{const o=new Set();for(const part of s.split(',')){const [a,b]=part.split('-').map(x=>parseInt(x));if(!a)continue;for(let i=a;i<=(b||a);i++)o.add(i);}return o;};
    const EE=rng(val(root,'ee')),CS=rng(val(root,'cs')),p=num(val(root,'src'),1,16,3),k=val(root,'kind');
    const v=EE.has(p)?'EE':CS.has(p)?'CS':null;if(!v)throw Error('들어온 포트가 어느 VLAN에도 속하지 않습니다.');const same=v==='EE'?EE:CS;
    const cells=Array.from({length:16},(_,i)=>i+1).map(i=>`<span class="${i===p?'dm-now':''} ${EE.has(i)?'dc-ee':CS.has(i)?'dc-cs':'dm-off'} ${k==='bc'&&same.has(i)&&i!==p?'dm-hit':''}"><small>${i}</small>${EE.has(i)?'EE':CS.has(i)?'CS':'-'}</span>`).join('');
    return [{html:`<div class="dm-cells">${cells}</div>`,note:`포트 ${p}는 ${v} VLAN`},
      {html:`<div class="dm-cells">${cells}</div><div class="dm-result"><p>${k==='bc'?`브로드캐스트는 같은 VLAN(${v})의 포트 ${[...same].filter(i=>i!==p).join(', ')}로만 전달됩니다.`:`다른 VLAN으로는 스위치가 링크 계층에서 직접 전달하지 않습니다 → 라우터를 거쳐야 합니다.`}</p><p class="dm-small">여러 스위치에 걸칠 때는 트렁크 포트에서 802.1Q 태그(VLAN ID 12비트)로 구분합니다.</p></div>`,note:'트래픽 분리'}];});
},
mpls(root){
  root.innerHTML=shell('mpls',sel('dst','목적지',[['A0','A (R4 인터페이스 0 경로)'],['A1','A (R4 인터페이스 1 경로)'],['D','D']],'A0'),ctrl);
  const tab={R4:[{in:'-',out:10,dest:'A',ifc:0,next:'R3'},{in:'-',out:12,dest:'D',ifc:0,next:'R3'},{in:'-',out:8,dest:'A',ifc:1,next:'R2'}],R3:[{in:10,out:6,dest:'A',ifc:1,next:'R1'},{in:12,out:9,dest:'D',ifc:0,next:'D'}],R2:[{in:8,out:6,dest:'A',ifc:0,next:'R1'}],R1:[{in:6,out:'-',dest:'A',ifc:0,next:'A'}]};
  stepper(root,()=>{const d=val(root,'dst');let r='R4',label='-';const steps=[];const pick0=d==='A0'?tab.R4[0]:d==='A1'?tab.R4[2]:tab.R4[1];
    let row=pick0;steps.push({html:tbl(['라우터','입력 레이블','출력 레이블','목적지','인터페이스'],tab.R4.map(x=>({c:['R4',x.in,x.out,x.dest,x.ifc],cls:x===row?'dm-now':''}))),note:'진입 라우터 R4가 목적지(와 정책)에 따라 첫 레이블을 붙입니다.'});
    label=row.out;r=row.next;
    while(tab[r]){row=tab[r].find(x=>x.in===label);if(!row)break;steps.push({html:tbl(['라우터','입력 레이블','출력 레이블','목적지','인터페이스'],tab[r].map(x=>({c:[r,x.in,x.out,x.dest,x.ifc],cls:x===row?'dm-now':''}))),note:`${r}: 입력 레이블 ${label} → ${row.out==='-'?'레이블 제거':'출력 레이블 '+row.out} (IP 주소는 보지 않음)`});label=row.out;r=row.next;}
    steps.push({html:`<div class="dm-result"><p>도착: ${r}</p><p class="dm-small">같은 목적지 A라도 R4가 고른 레이블(10 또는 8)에 따라 경로가 달라집니다. (자료 81쪽 표)</p></div>`,note:'결과'});return steps;});
},
day(root){
  root.innerHTML=shell('day','',ctrl);
  const S=[['DHCP 요청','DHCP ⊂ UDP ⊂ IP ⊂ Ethernet','목적지 MAC FF-FF-FF-FF-FF-FF 브로드캐스트 → DHCP 서버(라우터)','노트북에 아직 IP 주소가 없습니다.'],
    ['DHCP ACK','내 IP, 디폴트 라우터 IP, DNS 서버 이름·IP','스위치는 요청 프레임으로 노트북 위치를 학습 → 해당 포트로만 전달','이제 IP 정보는 알지만 라우터의 MAC은 모릅니다.'],
    ['ARP','ARP 질의(브로드캐스트) / 응답(유니캐스트)','디폴트 라우터 인터페이스의 MAC 획득','DNS 서버는 다른 네트워크라 첫 홉 라우터 MAC이 필요합니다.'],
    ['DNS 질의/응답','DNS ⊂ UDP ⊂ IP ⊂ Ethernet','스위치 → 라우터 → Comcast 네트워크 → DNS 서버 (포워딩 테이블: RIP, OSPF, IS-IS, BGP)','www.google.com = 64.233.169.105'],
    ['TCP 연결','SYN → SYNACK (→ ACK)','웹 서버와 3단계 핸드셰이크','HTTP는 TCP 위에서 동작합니다.'],
    ['HTTP 요청/응답','HTTP ⊂ TCP ⊂ IP ⊂ (링크마다 다른 프레임)','요청 → 웹 서버 → 응답(웹 페이지)','웹 페이지가 표시됩니다.']];
  stepper(root,()=>S.map((s,i)=>({html:tbl(['단계','프로토콜','캡슐화/메시지','전달','왜 필요한가'],S.slice(0,i+1).map((x,j)=>({c:[j+1,x[0],x[1],x[2],x[3]],cls:j===i?'dm-now':''}))),note:`${i+1}. ${s[0]}`})));
}};
const DC={mode,stop,mount(root,ch,n){stop();const k=mode(ch,n);if(!k){root.innerHTML='';return;}try{LABS[k](root,n);}catch(e){root.innerHTML=`<p class="dm-err">실험을 불러오지 못했습니다: ${esc(e.message)}</p>`;}}};
window.DCLab=DC;
const prev=window.PLLab;
if(prev){window.PLLab={...prev,mount(root,ch,n,cb){if(String(ch).startsWith('dc')){prev.stop();return DC.mount(root,ch,n);}stop();return prev.mount(root,ch,n,cb);},mode(ch,n){return String(ch).startsWith('dc')?DC.mode(ch,n):prev.mode(ch,n);},stop(){prev.stop();stop();}};}
})();
