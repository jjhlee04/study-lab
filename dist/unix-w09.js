/* Page-aligned study notes for the locally registered week 9 PDF. */
(() => {
  const notes = [
    ['표준 입출력', '이번 장은 파일 디스크립터 위에서 동작하는 C 표준 입출력의 사용법을 다룹니다. 읽기·쓰기 함수의 반환값, 버퍼링, 위치 이동을 구분해 보세요.'],
    ['시스템 호출과 표준 라이브러리', 'read/write는 파일 디스크립터를 받습니다. fread/fwrite는 FILE *를 받으며 라이브러리가 여러 요청을 버퍼에 모을 수 있습니다.', 'fread가 받는 파일 핸들의 타입은?', 'FILE *', 'int', 'fpos_t', 'size_t'],
    ['스트림과 FILE 포인터', '스트림은 프로그램과 입출력 대상 사이의 데이터 흐름입니다. 실행 시 stdin, stdout, stderr가 기본으로 열립니다.', '기본 오류 출력 스트림은?', 'stderr', 'stdin', 'stdout', 'EOF'],
    ['FILE의 내부 상태', 'FILE은 버퍼, 위치, 오류 상태를 관리합니다. 강의에 나온 내부 필드는 구현 예입니다. POSIX에서 디스크립터가 필요하면 fileno(fp)를 사용합니다.', 'POSIX에서 스트림의 디스크립터를 얻는 함수는?', 'fileno', 'ftell', 'fgetpos', 'feof'],
    ['세 가지 버퍼링', '완전 버퍼링은 데이터를 모아 전달하고, 줄 버퍼링은 개행에서 출력을 전달합니다. 명시적 fflush와 닫기도 출력 전달 계기가 됩니다.', '개행을 만나면 출력을 전달하는 버퍼링 방식은?', '줄 버퍼링', '완전 버퍼링', '무버퍼링', '파일 잠금'],
    ['fopen 선언과 반환값', 'fopen(path, mode)은 성공하면 FILE *를 반환합니다. 실패하면 NULL을 반환하므로 사용하기 전에 검사합니다.', 'fopen 실패 반환값은?', 'NULL', 'EOF', '0개의 객체', '양의 정수'],
    ['fopen 모드 비교', 'r은 기존 파일 읽기, w는 생성 또는 기존 내용 잘라내기, a는 생성 또는 끝에 추가입니다. +는 읽기와 쓰기를 모두 허용합니다. POSIX의 b는 효과가 없습니다.', '기존 내용을 보존하고 끝에 쓰는 기본 모드는?', 'a', 'w', 'r', 'w+'],
    ['읽기 모드로 열기', 'fopen("test.txt", "r")은 읽을 수 있는 기존 파일을 요구합니다. 실패 분기에서는 파일을 읽지 않고 오류를 처리합니다.', '존재하지 않는 파일을 r로 열면?', 'NULL을 반환한다', '빈 파일을 만든다', '쓰기 전용으로 연다', 'stdin을 반환한다'],
    ['freopen과 fdopen', 'freopen은 기존 스트림을 다른 파일에 연결할 때, fdopen은 이미 열려 있는 디스크립터에 스트림을 붙일 때 씁니다.', 'open으로 얻은 디스크립터에 스트림을 붙이는 함수는?', 'fdopen', 'freopen', 'fopen', 'fileno'],
    ['재연결과 연결의 차이', 'fdopen 모드는 디스크립터의 접근 권한과 맞아야 합니다. fdopen(fd, "w") 자체는 기존 파일을 잘라내지 않습니다.', 'fdopen(fd, "w")가 기존 파일을 잘라내는가?', '잘라내지 않는다', '항상 0바이트로 줄인다', '첫 줄만 지운다', '닫을 때 잘라낸다'],
    ['stdout을 파일로 보내기', 'freopen이 성공한 뒤의 printf는 새 stdout으로 갑니다. 그 전에 출력한 문장은 기존 stdout으로 전달됩니다.', 'stdout 재연결 성공 이후 printf의 목적지는?', '새로 연결한 파일', '항상 화면', 'stdin', 'stderr'],
    ['fdopen 후 자원 정리', 'fdopen이 성공하면 fclose(fp)가 연결된 디스크립터도 닫습니다. fdopen이 실패하면 호출자가 원래 디스크립터를 닫아야 합니다.', 'fdopen 성공 후 스트림과 디스크립터를 함께 닫는 함수는?', 'fclose', 'fflush', 'clearerr', 'rewind'],
    ['fclose 반환값', 'fclose는 출력 버퍼를 처리하고 스트림을 닫습니다. 성공은 0, 실패는 EOF입니다. 지연된 쓰기 오류가 여기서 드러날 수 있습니다.', 'fclose 실패 반환값은?', 'EOF', 'NULL', '1', 'FILE *'],
    ['정상 종료와 출력 버퍼', '정상적인 종료는 열린 출력 스트림을 비웁니다. 저장 성공 여부가 중요하면 직접 fclose를 호출하고 반환값을 검사하세요.', '버퍼에 있던 쓰기 실패를 확인하려면 무엇을 검사하나?', 'fclose의 반환값', '포인터의 주소', '파일 이름의 길이', 'stdin의 EOF 상태'],
    ['입출력 함수 고르기', '한 바이트는 fgetc/fputc, 문자열은 fgets/fputs, 객체 배열은 fread/fwrite, 서식은 fscanf/fprintf로 다룹니다.', '형식 문자열을 사용해 지정 스트림에 출력하는 함수는?', 'fprintf', 'fputs', 'fwrite', 'fputc'],
    ['문자 입력에서 int가 필요한 이유', 'fgetc는 읽은 바이트를 unsigned char 값으로 해석해 int로 반환합니다. EOF도 같은 반환 경로를 사용합니다.', 'fgetc 반환값을 받을 변수 타입은?', 'int', 'char', 'FILE *', 'size_t'],
    ['getchar와 표준 입력', 'getchar()는 stdin에서 다음 문자를 읽습니다. getc는 매크로일 수 있으므로 인자에 부작용이 있는 식을 피하세요.', 'getchar()가 읽는 기본 스트림은?', 'stdin', 'stdout', 'stderr', '최근 열린 파일'],
    ['ungetc의 반환값', 'ungetc는 입력 스트림에 문자를 되돌립니다. 성공하면 되돌린 문자 값, 실패하면 EOF가 반환됩니다.', 'ungetc에 EOF를 넘기면?', '실패한다', '파일에 EOF 바이트를 쓴다', '파일 끝에 이동한다', '버퍼를 비운다'],
    ['되돌리기와 실제 파일', '되돌린 문자는 다음 입력 함수가 먼저 읽습니다. 파일 내용은 그대로이며 성공한 ungetc는 EOF 표시를 지웁니다.', 'ungetc로 되돌린 문자는 어디에서 소비되는가?', '다음 스트림 읽기', '다음 파일 쓰기', '다음 fclose', '다음 fprintf'],
    ['숫자와 연산자 분리', '12345+67을 읽을 때 숫자 반복이 +에서 끝납니다. +를 되돌리면 다음 반복에서 연산자로 처리할 수 있습니다. 바깥 반복도 fgetc 반환값으로 종료하고 EOF는 되돌리지 마세요.', '12345를 읽고 처음 만난 +를 보존할 함수는?', 'ungetc', 'fputc', 'clearerr', 'fflush'],
    ['문자 출력 선언', 'fputc(c, fp)는 c를 unsigned char로 변환해 한 바이트를 씁니다. 오류 시 EOF를 반환합니다.', '문자 출력 오류를 나타내는 반환값은?', 'EOF', 'NULL', '항상 0', 'SEEK_END'],
    ['putchar의 목적지', 'putchar(c)는 표준 출력에 한 문자를 보냅니다. 임의의 스트림을 지정하려면 fputc(c, fp)를 씁니다.', 'putchar(c)의 목적지는?', 'stdout', 'stdin', 'stderr', '최근 읽은 파일'],
    ['fgets의 크기 제한', 'fgets(buf, n, fp)는 최대 n-1개를 읽고 끝에 널 문자를 붙입니다. 읽은 개행은 저장됩니다.', 'fgets(buf, 8, fp)가 읽을 수 있는 최대 문자 수는?', '7', '8', '9', '제한 없음'],
    ['fgets와 gets의 차이', 'gets는 버퍼 길이를 전달받지 못해 범위를 넘겨 쓸 수 있고 현대 C에서 제거됐습니다. fgets도 한 번에 줄 전체가 들어간다고 가정하면 안 됩니다.', '길이 제한을 지정할 수 있는 줄 입력 함수는?', 'fgets', 'gets', 'fputs', 'putchar'],
    ['문자열 출력 선언', 'fputs(str, fp)는 널 종료 문자열의 내용만 지정 스트림에 씁니다. 종료 널 문자는 출력하지 않습니다.', 'fputs가 종료 널 문자를 쓰는가?', '쓰지 않는다', '항상 쓴다', '파일에서만 쓴다', '개행 뒤에 쓴다'],
    ['puts의 자동 개행', 'puts는 stdout에 문자열을 쓰고 개행을 추가합니다. fputs에는 자동 개행이 없습니다.', '자동으로 개행을 붙이는 함수는?', 'puts', 'fputs', 'fwrite', 'fputc'],
    ['텍스트 파일 복사 흐름', 'fgets가 성공한 동안 fputs로 출력합니다. 긴 줄은 여러 번 나뉘어도 조각을 순서대로 쓰면 이어집니다. 루프 뒤 ferror로 읽기 실패를 확인합니다.', 'fgets 반복의 조건으로 적절한 것은?', '반환값이 NULL이 아님', 'feof가 참임', '읽기 전에 ferror가 참임', '버퍼의 첫 글자가 개행임'],
    ['이진 입출력 반환 단위', 'fread와 fwrite는 size 바이트짜리 객체를 nobj개 요청하고, 완전히 처리한 객체 수를 돌려줍니다.', 'fread(buf, 4, 3, fp)가 완전한 객체 2개를 읽으면?', '2', '8', '3', '12'],
    ['size와 nobj 구분', '요청 바이트 수는 size × nobj입니다. 반환값을 nobj와 비교하면 전체 요청을 만족했는지 알 수 있습니다.', '크기 4인 객체를 5개 요청하면 몇 바이트인가?', '20', '9', '5', '4'],
    ['구조체를 파일로 쓰기', 'fwrite로 구조체 한 개를 기록할 수 있지만 패딩, 타입 크기, 바이트 순서가 환경마다 달라질 수 있습니다. 교환용 파일은 필드별 형식을 정의하세요.', '구조체 이진 저장의 이식성을 떨어뜨리는 요소는?', '패딩과 바이트 순서', '변수 이름 길이', 'printf의 개행 유무', '파일의 확장자'],
    ['스트림 위치 관련 함수', 'ftell은 현재 위치 조회, fseek는 기준점에 따른 이동, rewind는 시작 위치로 돌아가는 동작입니다.', '현재 스트림 위치를 조회하는 함수는?', 'ftell', 'rewind', 'fseek', 'clearerr'],
    ['SEEK_SET·CUR·END', 'SEEK_SET은 시작, SEEK_CUR은 현재 위치, SEEK_END는 파일 끝을 기준으로 삼습니다. fseek 결과도 검사해야 합니다.', '현재 위치를 기준으로 이동하는 상수는?', 'SEEK_CUR', 'SEEK_SET', 'SEEK_END', 'EOF'],
    ['파일 끝으로 이동한 뒤 위치 읽기', 'seek 가능한 POSIX 일반 파일에서는 끝으로 이동한 뒤 ftell로 바이트 위치를 얻을 수 있습니다. 파이프처럼 탐색할 수 없는 입력에 일반화하면 안 됩니다.', 'fseek(fp, 0, SEEK_END)의 이동 목적지는?', '파일 끝', '파일 시작', '현재 위치 그대로', '마지막 줄 시작'],
    ['n번째 바이트 읽기', '사람이 세는 첫 번째 바이트의 오프셋은 0입니다. n번째 바이트는 n-1로 이동하고 입력 결과가 EOF인지 확인합니다.', '파일의 5번째 바이트를 읽을 시작 기준 오프셋은?', '4', '5', '6', '0'],
    ['rewind로 다시 읽기', 'rewind는 스트림 위치를 처음으로 되돌리고 오류 표시도 지웁니다. 반환값이 없어서 이동 성공을 확인해야 할 때는 fseek가 편합니다.', 'rewind가 이동하는 위치는?', '파일 시작', '파일 끝', '현재 위치', '오류가 발생한 위치'],
    ['fgetpos와 fsetpos', 'fgetpos는 위치를 fpos_t 객체에 저장하고 fsetpos는 저장한 위치를 복원합니다. fpos_t는 산술 계산용 정수로 가정하지 않습니다.', '저장한 스트림 위치를 복원하는 함수는?', 'fsetpos', 'fgetpos', 'ftell', 'clearerr'],
    ['EOF와 읽기 오류 구분', 'fgetc의 EOF 반환은 파일 끝이나 오류일 수 있습니다. 어느 경우인지 알아보려면 상태 표시를 조사합니다.', '읽기 오류 표시를 검사하는 함수는?', 'ferror', 'feof', 'fflush', 'fclose'],
    ['feof·ferror·clearerr', 'feof는 이전 읽기가 파일 끝을 만났는지 확인합니다. clearerr는 EOF와 오류 표시를 모두 지우며 위치는 움직이지 않습니다.', 'EOF와 오류 표시를 모두 초기화하는 함수는?', 'clearerr', 'feof', 'ferror', 'ftell'],
    ['EOF를 한 글자로 출력하지 않기', '원문의 while(!feof(fp)) 패턴은 읽은 값이 EOF인지 확인하기 전에 출력할 수 있습니다. 읽기 성공을 반복 조건으로 두고, 종료 후 ferror를 확인하세요.', 'fgetc를 반복하면서 출력할 조건은?', '반환값이 EOF가 아님', 'ferror가 0이기만 함', '읽기 전에 feof가 0임', '반환값이 항상 양수임'],
    ['개행과 버퍼 가득 참', '줄 버퍼는 개행 외에도 버퍼가 차거나 명시적으로 비울 때 전달됩니다. stdout이 파일로 바뀌면 터미널과 버퍼링 동작이 다를 수 있습니다.', '줄 버퍼 출력을 개행 없이 바로 전달할 함수는?', 'fflush', 'feof', 'fgetpos', 'ungetc'],
    ['fflush의 인자', 'fflush(fp)는 해당 출력 스트림의 미전달 데이터를 보내고, fflush(NULL)은 비울 수 있는 모든 출력 스트림에 적용됩니다.', '모든 출력 스트림을 비우려면?', 'fflush(NULL)', 'fclose(NULL)', 'clearerr(NULL)', 'rewind(NULL)'],
    ['프롬프트를 바로 보이게 하기', '개행 없이 프롬프트를 출력한 다음 사용자 입력을 기다릴 때 fflush(stdout)를 호출하면 라이브러리 버퍼가 전달됩니다. 디스크에 영구 저장됐다는 뜻은 아닙니다.', 'stdout의 C 라이브러리 출력 버퍼를 비우는 호출은?', 'fflush(stdout)', 'clearerr(stdout)', 'ferror(stdout)', 'rewind(stdout)'],
    ['sleep과 출력 순서', '완전 버퍼링된 stdout에 짧은 문장을 쓰면 첫 sleep 동안 보이지 않을 수 있습니다. 예제는 첫 sleep 뒤 fflush를 호출해 출력이 보이는 시점을 제어합니다.', '완전 버퍼링 예제에서 명시적으로 출력이 전달되는 호출은?', 'fflush', '첫 번째 sleep', '두 번째 sleep', 'fprintf가 버퍼에 쓰는 순간'],
    ['setbuf와 BUFSIZ', 'setbuf(fp, NULL)은 무버퍼링입니다. 사용자 버퍼를 주면 최소 BUFSIZ 바이트가 필요합니다. BUFSIZ 값을 특정 숫자로 가정하지 마세요.', 'setbuf로 무버퍼링을 선택할 때 두 번째 인자는?', 'NULL', 'EOF', 'BUFSIZ', 'SEEK_SET'],
    ['setvbuf의 세 가지 모드', 'setvbuf는 버퍼의 방식과 크기를 지정합니다. _IOFBF는 완전, _IOLBF는 줄, _IONBF는 무버퍼링입니다.', 'setvbuf의 줄 버퍼링 모드는?', '_IOLBF', '_IOFBF', '_IONBF', 'SEEK_CUR'],
    ['버퍼 설정의 호출 순서', '버퍼 설정은 스트림을 연 후 첫 입출력 전에 하세요. 원문처럼 이미 출력한 뒤 버퍼 방식을 바꾸는 코드를 이식 가능한 패턴으로 외우지 마세요.', 'setvbuf를 호출하기 적절한 시점은?', '첫 입출력 전', '첫 printf 후', 'fclose 뒤', 'EOF를 읽은 뒤'],
    ['스레드와 스트림 잠금', 'flockfile은 스트림 잠금을 얻고, ftrylockfile은 기다리지 않고 시도합니다. ftrylockfile 성공은 0이며 잠금은 funlockfile로 해제합니다.', 'ftrylockfile 성공 반환값은?', '0', 'EOF', 'NULL', '항상 1'],
    ['여러 줄을 한 묶음으로 출력하기', '여러 fputs 호출 전체를 flockfile/funlockfile로 감싸면 같은 스트림에 쓰는 다른 스레드의 호출이 중간에 섞이는 것을 막습니다. 파일 전체를 프로세스 간 잠그는 API와 구분하세요.', 'flockfile로 얻은 스트림 잠금을 해제하는 함수는?', 'funlockfile', 'fflush', 'fclose', 'clearerr']
  ];
  const material = 'unix-w09';
  const shortPages = new Set([4, 6, 9, 13, 16, 18, 22, 23, 26, 28, 31, 34, 36, 37, 38, 41, 44, 45, 47, 48]);
  const examples = {
    5: '예: 터미널의 줄 버퍼링 stdout에 "ABC"를 쓰면 버퍼에 남을 수 있습니다. 개행을 쓰면 앞의 ABC와 개행이 함께 전달됩니다.',
    7: '예: 내용이 OLD인 파일에 NEW를 쓰면 w는 NEW, a는 OLDNEW가 됩니다. r+로 파일 시작에서 같은 길이를 덮어쓰면 NEW가 됩니다.',
    12: '순서: open 성공 확인 → fdopen 성공 확인 → fprintf 반환값 확인 → fclose 반환값 확인. fdopen 실패 분기에서는 close(fd)로 정리합니다.',
    20: '입력 12345+67의 처리 결과: 숫자 12345 → 연산자 + → 숫자 67. 첫 숫자 반복에서 읽은 +를 되돌리지 않으면 연산자가 빠집니다.',
    23: '예: 입력이 abcdef\n이고 버퍼가 5바이트라면 첫 호출은 abcd와 종료 널을 저장합니다. 다음 호출은 ef, 개행, 종료 널을 저장합니다.',
    28: '예: 4바이트 객체를 3개 요청해 8바이트짜리 파일을 읽으면 완성한 객체는 2개입니다. 반환값 2를 바이트 수로 해석하지 마세요.',
    34: '예: ABCDE의 5번째 바이트는 4번 오프셋의 E입니다. fseek(fp, 4, SEEK_SET)이 성공한 뒤 fgetc(fp)로 E를 읽습니다.',
    39: '안전한 반복: while ((ch = fgetc(fp)) != EOF) { ... }로 읽은 바이트만 처리합니다. 반복을 빠져나온 뒤 ferror(fp)를 검사합니다.',
    43: '예: 짧은 문장을 완전 버퍼링 스트림에 쓰고 5초 기다린 뒤 fflush하면, 버퍼가 차지 않았다는 조건에서 문장은 fflush 시점에 전달됩니다.',
    48: '스레드 A가 잠금을 잡고 두 줄을 연속 출력하는 동안, 같은 FILE *를 쓰는 스레드 B는 잠금 해제 후에 출력할 수 있습니다.'
  };
  window.W09_EXAM = [];
  notes.forEach(([title, explanation, question, answer, ...distractors], index) => {
    const page = index + 1;
    const quiz = question ? {question, options: [answer, ...distractors], answer: 0, why: explanation} : null;
    const explain = examples[page] ? [explanation, examples[page]] : [explanation];
    window.LESSONS.push({id: 'w09-' + page, unit: 'w09', page, title, explain, original: '', quiz});
    if (shortPages.has(page)) {
      window.W09_EXAM.push({id: 'ux-w09-s' + page, course: 'unix', src: [material, page], type: 'short', q: question, answer: [answer], why: explanation, title});
    }
  });

  window.W09Lab = {
    html(page) {
      return `<article class="quiz"><h2>표준 출력 버퍼 실험</h2>
        <p>현재 학습: ${notes[page - 1][0]} · 버퍼 크기를 8자로 가정합니다.</p>
        <label>버퍼링 <select id="w09-mode"><option value="full">완전 버퍼링</option><option value="line">줄 버퍼링</option><option value="none">무버퍼링</option></select></label>
        <div class="quiz-actions">
          <button type="button" id="w09-write">ABC 쓰기</button>
          <button type="button" id="w09-newline">개행 쓰기</button>
          <button type="button" id="w09-flush">fflush 호출</button>
        </div>
        <h3>버퍼에 남은 내용</h3><pre id="w09-buffer">비어 있음</pre>
        <h3>전달된 출력</h3><pre id="w09-output" aria-live="polite">비어 있음</pre>
        <p>줄 버퍼링과 완전 버퍼링에서 개행을 넣었을 때 결과를 비교해 보세요.</p></article>`;
    },
    bind() {
      const mode = document.getElementById('w09-mode');
      if (!mode) return;
      let buffer = '', output = '';
      const show = () => {
        document.getElementById('w09-buffer').textContent = buffer ? JSON.stringify(buffer) : '비어 있음';
        document.getElementById('w09-output').textContent = output ? JSON.stringify(output) : '비어 있음';
      };
      const flush = () => { output += buffer; buffer = ''; show(); };
      const write = text => {
        for (const char of text) {
          buffer += char;
          if (mode.value === 'none' || buffer.length === 8 || (mode.value === 'line' && char === '\n')) flush();
        }
        show();
      };
      mode.onchange = () => { buffer = ''; output = ''; show(); };
      document.getElementById('w09-write').onclick = () => write('ABC');
      document.getElementById('w09-newline').onclick = () => write('\n');
      document.getElementById('w09-flush').onclick = flush;
    }
  };
})();
