(function(root){
'use strict';
const scenarios={
 basic:{name:'open → read → write → lseek',pages:'w06 25–42쪽',steps:[['open',3,'A','RDWR'],['read',3,3],['write',3,'xy'],['seek',3,0,'SET'],['read',3,12],['read',3,2],['close',3]]},
 independent:{name:'같은 파일을 두 번 open',pages:'w06 43–45쪽 · 원문 흐름의 축소 예제',steps:[['open',3,'A','RDONLY'],['open',4,'B','RDONLY'],['read',3,3],['seek',3,1,'CUR'],['read',3,3],['read',4,3],['seek',4,1,'CUR'],['read',4,3]]},
 processes:{name:'서로 다른 프로세스의 open',pages:'w06 46–48쪽',steps:[['open',3,'A','RDONLY','P1'],['open',3,'B','RDONLY','P2'],['read',3,3,'P1'],['read',3,2,'P2'],['read',3,2,'P1']]},
 duplicate:{name:'dup으로 offset 공유',pages:'w06 55–58쪽 · 원문 흐름의 축소 예제',steps:[['open',3,'A','RDONLY'],['dup',3,4],['read',3,3],['seek',3,1,'CUR'],['read',4,3],['close',3],['read',4,1]]},
 redirect:{name:'dup2로 표준 출력 연결',pages:'w06 57·59쪽 · stdio 버퍼를 비운 상태의 write 모델',steps:[['open',3,'A','WRONLY'],['dup2',3,1],['write',1,'OK'],['close',3],['write',1,'!']]},
 append:{name:'O_APPEND와 파일 끝 너머',pages:'w06 26·40–41쪽',steps:[['open',3,'A','RDWR'],['seek',3,11,'SET'],['write',3,'Z'],['open',4,'B','APPEND'],['seek',4,0,'SET'],['write',4,'!'],['seek',3,8,'SET'],['read',3,8]]},
 partial:{name:'짧은 read · 부분 write · 오류',pages:'w06 32–39쪽 · 부분 전송을 의도적으로 주입',steps:[['open',3,'A','RDWR'],['seek',3,-2,'END'],['read',3,5],['read',3,2],['seek',3,0,'SET'],['partial',3,'WXYZ',2],['write',3,'YZ'],['close',3],['read',3,1]]},
 position:{name:'pread · pwrite · truncate',pages:'w06 49·53–54쪽 · O_APPEND 없음',steps:[['open',3,'A','RDWR'],['read',3,2],['pread',3,3,4],['pwrite',3,'xy',4],['truncate',5],['truncate',9],['read',3,7]]},
 errors:{name:'접근 모드와 잘못된 seek',pages:'w06 24–33·40–41쪽',steps:[['open',3,'A','RDONLY'],['write',3,'X'],['seek',3,-1,'SET'],['read',3,2],['close',3],['dup',3,4]]}
};
function initial(text='ABCDEFGH'){return {data:Array.from(text),fds:{'P1:0':'stdin','P1:1':'stdout','P1:2':'stderr'},files:{},buffer:'',ret:'—',errno:'—',note:'시작 전입니다. 0·1·2번 표준 fd는 이미 열려 있고 test.txt는 존재한다고 가정합니다.',active:null};}
function fdkey(fd,p='P1'){return p+':'+fd;}
function code(o){let [t,a,b,c,p]=o;const prefix=p?'/* '+p+' */ ':'';switch(t){case 'open':return prefix+`fd${a} = open("test.txt", O_${c==='APPEND'?'WRONLY | O_APPEND':c});`;case 'read':return (c?'/* '+c+' */ ':'')+`n = read(${a}, buf, ${b});`;case 'write':return `n = write(${a}, "${b}", ${b.length});`;case 'partial':return `n = write(${a}, "${b}", ${b.length}); /* 2 bytes만 기록 */`;case 'seek':return `pos = lseek(${a}, ${b}, SEEK_${c});`;case 'dup':return `fd${b} = dup(${a});`;case 'dup2':return `dup2(${a}, ${b});`;case 'close':return `close(${a});`;case 'pread':return `n = pread(${a}, buf, ${b}, ${c});`;case 'pwrite':return `n = pwrite(${a}, "${b}", ${b.length}, ${c});`;case 'truncate':return `truncate("test.txt", ${a});`;}}
function execute(s,op){s=JSON.parse(JSON.stringify(s));let[t,a,b,c,p]=op;s.errno='—';s.active=null;let key=fdkey(a,(t==='read'?c:p)||'P1');let id=s.fds[key],f=s.files[id];function fail(e,msg){s.ret=-1;s.errno=e;s.note=msg;return s;}
 if(t==='open'){s.files[b]={offset:0,mode:c,inode:101};s.fds[key]=b;s.ret=a;s.active=b;s.note=`${key} → 열린 항목 ${b} → inode 101. 새로운 open은 offset 0의 독립 항목을 만듭니다.`;return s;}
 if(t==='truncate'){s.data.length=Math.min(s.data.length,a);while(s.data.length<a)s.data.push('\0');s.ret=0;s.note=`파일 크기 ${a}바이트. 확장 구간은 0으로 읽히고 열린 파일 offset은 그대로입니다.`;return s;}
 if(!f)return fail('EBADF','유효한 열린 파일 참조가 없습니다. 호출은 -1로 실패합니다.');s.active=id;
 if(t==='dup'||t==='dup2'){s.fds[fdkey(b)]=id;s.ret=b;s.note=`fd ${b}가 같은 열린 항목 ${id}를 참조합니다. offset ${f.offset}과 파일 상태 플래그를 공유합니다.`;}
 else if(t==='close'){delete s.fds[key];s.active=null;s.ret=0;s.note='해당 fd의 참조를 닫았습니다. 다른 fd가 같은 열린 항목을 참조하면 그 상태는 유지됩니다.';}
 else if(t==='seek'){let base=c==='SET'?0:c==='CUR'?f.offset:s.data.length;let n=base+b;if(n<0)return fail('EINVAL','최종 offset이 음수이므로 실패합니다. 기존 위치는 유지됩니다.');f.offset=n;s.ret=n;s.note=`offset을 ${n}으로 이동했습니다. 위치만 바뀌며 파일 크기 ${s.data.length}는 그대로입니다.`;}
 else if(t==='read'||t==='pread'){if(f.mode==='WRONLY'||f.mode==='APPEND')return fail('EBADF','읽기 불가능한 접근 모드입니다.');let pos=t==='pread'?c:f.offset;s.buffer=s.data.slice(pos,pos+b).join('');s.ret=s.buffer.length;if(t==='read')f.offset+=s.ret;s.note=s.ret===0?'EOF: 요청 길이는 양수지만 읽을 데이터가 없어 0을 반환했습니다.':`${s.ret}바이트를 읽었습니다. ${t==='pread'?'pread이므로 현재 offset은 유지됩니다.':'읽은 수만큼 공유 offset이 증가합니다.'} 버퍼의 NUL은 자동 추가되지 않습니다.`;}
 else if(t==='write'||t==='partial'||t==='pwrite'){if(f.mode==='RDONLY')return fail('EBADF','읽기 전용 fd에는 쓸 수 없습니다.');let pos=t==='pwrite'?c:f.mode==='APPEND'?s.data.length:f.offset;let chars=Array.from(b).slice(0,t==='partial'?c:b.length);while(s.data.length<pos)s.data.push('\0');chars.forEach((x,i)=>s.data[pos+i]=x);if(t!=='pwrite')f.offset=pos+chars.length;s.ret=chars.length;s.note=`${chars.length}바이트를 기록했습니다. ${t==='partial'?'부분 성공입니다. 남은 바이트는 다시 write해야 합니다.':t==='pwrite'?'현재 offset은 유지됩니다.':f.mode==='APPEND'?'O_APPEND이므로 직전 seek와 관계없이 파일 끝에 씁니다.':'기존 위치의 데이터는 덮어씁니다.'}`;}
 return s;}
function run(name,n,text){let s=initial(text);for(const op of scenarios[name].steps.slice(0,n))s=execute(s,op);return s;}
const api={scenarios,initial,execute,run,code};root.UnixEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
