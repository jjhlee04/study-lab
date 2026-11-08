/* Written recall catalog. Only vetted short-answer items; never strip choices from MC/TF. */
(function(){
'use strict';
const omit=new Set(['ux-s02','dc-s05']);
const revisions={
 'ux-s06':{type:'cloze',q:'파일 이름을 제외한 소유자·권한·크기·데이터 블록 정보는 ___에 저장된다.'},
 'ux-s08':{mode:'verbatim'},
 'ux-s15':{answer:['rm -r dir','rm -rf dir']},
 'ux-s17':{type:'cloze',q:'요청 권한이 0666이고 umask가 0022일 때 실제 파일 권한은 ___이다. (8진수 숫자)',answer:['644','0644']},
 'ux-s20':{type:'cloze',q:'file1의 inode 번호가 14378이다. ln file1 file2로 만든 file2의 inode 번호는 ___이다.'},
 'ux-s22':{q:'tar 명령에서 gzip 압축을 사용하게 하는 소문자 옵션 한 글자는?'},
 'ux-s31':{type:'cloze',q:'열린 파일의 현재 offset과 참조 계수를 보관하는 전역 테이블은 ___이다.'},
 'ux-s37':{q:'일반 파일에서 0보다 큰 바이트 수를 요청한 read가 오류 없이 0을 반환했다. 파일의 어떤 지점에 도달했는가?'},
 'ux-s45':{q:'제공된 강의자료의 역사적 Linux 모델에서 dirty page를 저장장치에 쓰는 커널 스레드의 이름은?',why:'자료에 제시된 역사적 이름은 pdflush입니다. 현재 Linux의 모든 구현이 이 이름을 사용한다는 뜻은 아닙니다.'},
 'pl-s03':{type:'cloze',q:'문맥 자유 문법의 네 구성요소는 단말 기호, 비단말 기호, 시작 기호, ___이다.'},
 'pl-s04':{q:'문법의 연산자 우선순위가 곱셈을 덧셈보다 먼저 계산하게 할 때, 3 + 4 * 5의 값은?',answer:['23']},
 'pl-s06':{q:'YACC/Bison 같은 파서 생성기가 주로 사용하는 파싱 방향을 한 용어로 쓰세요.'},
 'pl-s07':{q:'제공된 바인딩 시점 분류에서, 전역 변수의 저장 위치가 연결되는 시점은?'},
 'pl-s08':{type:'cloze',q:'이름(name)을 저장 위치(location)에 연결하는 바인딩을 ___이라고 한다.'},
 'pl-s12':{type:'cloze',q:'할당은 되어 있지만 프로그램에서 더 이상 접근할 수 없는 메모리를 ___라고 한다.'},
 'dm-s01':{type:'cloze',q:'f(0)=3, f(n+1)=2f(n)+3으로 정의할 때 f(3)=___이다.'},
 'dm-s05':{type:'cloze',q:'재귀적 정의의 기초·재귀 단계를 따라 모든 원소의 성질을 증명하는 방법은 ___이다.'},
 'dm-s13':{type:'cloze',q:'원소가 6개인 집합의 부분집합은 모두 ___개이다.'},
 'dm-s18':{type:'cloze',q:'서로 다른 7개에서 순서를 고려하여 3개를 뽑는 경우의 수 P(7,3)=___이다.'},
 'dm-s19':{type:'cloze',q:'서로 다른 8개에서 순서 없이 3개를 고르는 경우의 수 C(8,3)=___이다.'},
 'dc-s01':{type:'cloze',q:'링크 계층에서 데이터그램을 캡슐화하는 2계층 패킷을 ___이라고 한다.'},
 'dc-s02':{type:'cloze',q:'링크 계층을 구현하는 네트워크 인터페이스 카드의 영문 약어는 ___이다.'},
 'dc-s03':{q:'데이터 D=101110, 생성자 G=1001이다. 뒤에 0을 3개 붙여 modulo-2 나눗셈을 했을 때 CRC 나머지는? (앞의 0을 포함한 3비트)',mode:'verbatim'},
 'dc-s04':{mode:'verbatim'},
 'dc-s22':{mode:'formula'},
 'dc-s23':{mode:'formula'},
 'dc-s36':{q:'제공된 강의자료의 1972년 연혁에 적힌 호스트 간(host-host) 프로토콜의 약어는?',why:'이 문항은 제공된 연혁 슬라이드의 NCP 표기를 확인합니다. 실제 프로토콜의 최초 등장 연도를 단정하는 문제는 아닙니다.'},
 'dc-s07':{answer:['0.18','1/(2e)','18%']},
 'dc-s10':{type:'cloze',q:'이 강의에서 다루는 Ethernet의 MAC 주소 길이는 ___비트이다.',answer:['48']},
 'dc-s13':{mode:'verbatim'},
 'dc-s15':{type:'cloze',q:'IEEE 802.1Q 태그의 VLAN ID 필드는 ___비트이다.',answer:['12']}
};
const exact=new Set(['ux-s08','ux-s09','ux-s10','ux-s11','ux-s13','ux-s14','ux-s15','ux-s19','ux-s22','ux-s24','ux-s25','ux-s27','ux-s33','ux-s34','ux-s35','ux-s36','ux-s38','ux-s39','ux-s40','dc-s03','dc-s04','dc-s13']);
window.RECALL_CARDS=[...(window.EXAM_BANK||[]), ...(window.W09_EXAM||[])].filter(x=>x.type==='short'&&!omit.has(x.id)).map(x=>{
 const r=revisions[x.id]||{},answers=r.answer||x.answer;
 return {id:'recall-'+x.id,originId:x.id,course:x.course,src:x.src,type:r.type||'short',q:r.q||x.q,answers:[...new Set(answers)],why:r.why||x.why,mode:r.mode||(exact.has(x.id)?'verbatim':/^[+−-]?(?:\d|\.)/.test(answers[0])?'formula':'term')};
});
window.RECALL_CARDS.push({id:'recall-pl-s04-grouped',course:'programming-languages',src:['pl07',44],type:'short',q:'덧셈을 먼저 묶은 식 (3 + 4) * 5의 값은?',answers:['35'],why:'괄호 안의 3+4=7을 먼저 구한 뒤 5를 곱하면 35입니다.',mode:'term'});
})();
