"""PL 09 데이터 타입 · 쓰기 복습 카드(단답·빈칸). 실행: python3 pl09_cards.py → dist/recall-cards-pl09.js
각 카드는 원문 PDF 쪽(src)에 근거하며, 객관식 문항을 선택지만 떼어 옮기지 않는다.
mode: term(띄어쓰기·대소문자 무시) / formula(숫자 표기 비교) / verbatim(그대로 비교)"""
import json, os

CARDS = []

def C(page, q, answers, why, mode='term'):
    kind = 'cloze' if '___' in q else 'short'
    CARDS.append(dict(id=f'recall-pl09-{len(CARDS) + 1:03d}', course='programming-languages', src=['pl09', page],
                      type=kind, q=q, answers=list(answers), why=why, mode=mode))

C(4, '원문의 정의 2에서 데이터 타입은 값의 집합과, 그 값에 적용할 수 있는 ___의 집합이다.', ['연산', 'operation', 'operations'],
  '정의 1은 값의 집합, 정의 2는 값의 집합 + 연산의 집합입니다.')
C(4, 'Java int가 가질 수 있는 가장 큰 값은?', ['2147483647'], '32비트 int의 범위는 −2³¹ ~ 2³¹−1(2147483647)입니다.', 'formula')
C(5, 'Java에서 int x = 5, y = 2; double z = x / y; 일 때 z의 값은?', ['2.0'], 'x / y가 정수 나눗셈으로 먼저 2가 되고, double에 넣으며 2.0이 됩니다.', 'formula')
C(5, 'Java에서 int x = 5, y = 2;일 때 (double) x / y의 값은?', ['2.5'], 'x를 먼저 5.0으로 바꾸므로 실수 나눗셈 5.0 / 2 = 2.5입니다.', 'formula')
C(6, '강한 타입 언어에서 적법한(legal) 프로그램의 집합은 안전한(safe) 프로그램 집합의 ___이다.', ['부분집합', 'subset'],
  'legal programs ⊂ safe programs: 안전하지만 거부되는 프로그램이 있을 수 있습니다.')
C(6, '원문이 강한 타입 언어에서도 실행 중에 검사한다고 든 오류는? (배열 관련)', ['배열 첨자 범위 초과', '첨자 범위 초과', '배열 범위 초과', '인덱스 범위 초과', '배열 첨자 범위', 'subscript out of array bounds', 'index out of bounds'],
  '첨자 값은 실행해 봐야 알 수 있어 실행 중에 검사합니다(Java: ArrayIndexOutOfBoundsException).')
C(7, 'Java에서 Object o = "hello"; String s = o; 를 컴파일하면 어떻게 되는가?', ['컴파일 오류', '컴파일에러', 'compile error', 'compilation error'],
  '컴파일러는 o의 선언 타입 Object만 보고 String 대입을 거부합니다. 실제 객체가 String이어도 마찬가지입니다.')
C(7, 'if (n >= 0) return 1; if (n < 0) return -1;로 끝나는 Java 메서드의 컴파일 오류 메시지는?', ['missing return statement'],
  '컴파일러는 두 조건이 서로를 보완한다는 것을 계산하지 않습니다. else로 바꾸면 통과합니다.')
C(8, '정수·포인터·배열을 섞어 쓰는 C처럼 안전하지 않은 프로그램을 허용하는 허점이 있는 언어를 ___ 타입 언어라고 한다.', ['약한', '약한 타입', 'weakly', 'weak'],
  '원문: Weakly-typed language — one that has loopholes that may allow unsafe programs.')
C(8, 'Python에서 "1" + 1을 실행하면 발생하는 예외 이름은?', ['TypeError'], 'Python은 실행 중에 str + int를 검사해 TypeError로 막습니다.')
C(8, '정적 타입 시스템 없이 모든 안전 검사를 실행 중에 하는 언어를 ___ 타입 언어라고 한다.', ['동적', '동적 타입', 'dynamically typed', 'dynamic'],
  '원문은 untyped(dynamically typed)라고 부릅니다. 검사 시점(동적)과 엄격함(강/약)은 별개의 기준입니다.')
C(9, '타입 시스템은 안전성(security)과 ___을 함께 높이려 한다.', ['유연성', 'flexibility'],
  '유연성 = 안전하지만 거부되는 프로그램 수와 프로그래머가 적어야 하는 타입 정보를 줄이는 것.')
C(11, '정수·실수·문자·불리언처럼 고유한 산술·순서 구조 외에 내부 구조가 없는 타입을 무엇이라 하는가?', ['단순 타입', 'simple type', 'simple types', '단순 데이터 타입'],
  '원문: Simple Data Types — have no other structure than their inherent arithmetic or sequential structure.')
C(11, '원문이 "기본 제공이지만 단순 타입이 아니다"라고 든 Java 타입은?', ['String'], 'String은 내부 구조와 메서드를 가진 클래스 타입입니다.')
C(12, '원소에 이름을 붙여 명시적으로 나열한 순서 있는 집합 타입은?', ['열거형', '열거 타입', 'enumerated type', 'enum'],
  '원문: Enumerated Types — ordered set, whose elements are named and listed explicitly.')
C(12, 'C에서 enum Color {Red, Green, Blue};일 때 Blue의 정수 값은?', ['2'], 'C 열거 상수는 0부터 1씩 증가합니다: Red 0, Green 1, Blue 2.', 'formula')
C(13, "Ada에서 열거형의 다음 값을 구하는 속성 이름은? (예: Color_Type'___(x))", ['Succ', "'Succ"], "Color_Type'Succ(Green) = Blue, 'Pred는 이전 값입니다.")
C(13, "Ada에서 마지막 열거 값 Blue에 Color_Type'Succ를 적용하면 ___ 오류가 난다.", ['실행 중', '런타임', 'runtime', '실행시간', '실행'],
  '다음 값이 없으므로 실행 중 CONSTRAINT_ERROR가 납니다. 처음으로 되돌아가지 않습니다.')
C(14, 'C에서 enum E {A, B = 4, C};일 때 C의 값은?', ['5'], '값을 지정하지 않은 상수는 바로 앞 상수 값 + 1입니다.', 'formula')
C(15, 'Java enum의 각 상수(예: Planet.EARTH)는 그 enum 클래스의 ___이다.', ['객체', '인스턴스', 'object', 'instance'],
  'Java enum은 클래스이고 상수는 public static final 객체입니다.')
C(16, '"새 색을 추가해도 하드코딩된 상수를 고칠 필요가 없다"는 열거형의 어떤 장점인가?', ['유지보수성', 'maintainability', '유지 보수성'],
  '원문의 네 가지 장점: 효율성, 가독성, 유지보수성, 신뢰성.')
C(17, '원문 C 예제에서 enum Color에 Yellow를 White 다음에 추가하면 Green의 정수 값은?', ['2'], 'White 0, Yellow 1, Green 2가 됩니다.', 'formula')
C(18, 'Ada에서 TODAY := TODAY + START;(둘 다 DAY 타입)가 오류인 이유: DAY 타입에는 ___ 연산이 정의되어 있지 않다.', ['+', '덧셈', '더하기'],
  '타입 = 값 + 연산. DAY의 연산 집합에 +가 없습니다.')
C(19, '실수가 서수(ordinal) 타입이 아닌 이유: successor와 ___ 연산이 없다.', ['predecessor', 'pred', '이전 값'],
  '어떤 실수의 바로 다음·이전 실수는 정의되지 않습니다.')
C(19, 'type Digit_Type is range 0..9;처럼 최솟값과 최댓값을 지정해 만든 타입은?', ['부분 범위 타입', '부분범위', 'subrange', 'subrange type'],
  '원문: Subrange types — contiguous subsets of simple types specified by least and greatest elements.')
C(21, 'record·struct는 어떤 집합 연산에 대응하는 타입 생성자인가?', ['데카르트 곱', '곱', 'cartesian product', '카테시안 곱'],
  '여러 성분을 동시에 갖는 값이므로 곱입니다.')
C(21, '원문이 "대응하는 타입 생성자가 없는 집합 연산"으로 든 것은?', ['교집합', 'intersection'], '대부분의 언어는 두 타입에 모두 속하는 값만 담는 생성자를 제공하지 않습니다.')
C(22, 'U = {0, 1}, V = {a, b, c}일 때 U × V의 원소 개수는?', ['6'], '2 × 3 = 6개의 순서쌍입니다.', 'formula')
C(22, '데카르트 곱의 값에서 성분 하나를 꺼내는 연산(p1, p2)의 이름은?', ['투영', '사영', 'projection'], 'p1((u, v)) = u, p2((u, v)) = v.')
C(24, '구조체 필드의 선언 순서가 바뀌면 메모리에서 각 필드의 ___(구조체 시작점에서의 거리)이 달라진다.', ['오프셋', 'offset'],
  '같은 필드라도 놓이는 위치가 달라집니다(예: offsetof).')
C(26, '데카르트 곱은 성분을 ___로 가리키고, 레코드는 이름으로 가리킨다.', ['위치', 'position', '순서'],
  '원문: Cartesian product — referred to by position, record — components have names.')
C(27, 'ML에서 #3(2, #"a", 3.14)의 값은?', ['3.14'], '#3은 세 번째 위치의 성분을 꺼냅니다.', 'formula')
C(28, '태그(판별자)를 붙여 현재 값의 타입을 구분하는 공용체를 무엇이라 하는가?', ['판별 공용체', 'discriminated union', '태그 있는 공용체', 'tagged union'],
  '태그가 없으면 비판별 공용체이며, 이런 공용체가 있는 언어의 타입 시스템은 안전하지 않습니다.')
C(29, 'C union에 없어서 현재 유효한 멤버를 알 수 없는 것은?', ['태그', '판별자', 'tag', 'discriminator'], 'C·C++의 union은 비판별 공용체입니다.')
C(31, 'Ada 변형 레코드에서 어떤 변형 필드를 쓸 수 있는지 정하는 값은?', ['판별자', 'discriminant'], '판별자와 맞지 않는 필드에 접근하면 실행 중 오류가 납니다.')
C(32, 'Ada에서 Integer와 섞어 계산할 수 있는 0..9 범위 타입을 만드는 키워드는? (___ IntDigit_Type is integer range 0..9;)', ['subtype'],
  'type ... is range 0..9는 Integer와 섞을 수 없는 완전히 새 타입입니다.')
C(33, '부분집합(서브)타입은 부모 타입의 ___을 상속한다.', ['연산', 'operation', 'operations'], '원문: subset types inherit operations from their parent types.')
C(35, '배열은 정의역 U가 ___ 타입일 때의 함수 f: U → V로 볼 수 있다.', ['서수', 'ordinal'], '인덱스는 이산적이고 순서가 있어야 합니다.')
C(36, 'C에서 int z[] = {1, 2, 3, 4};의 원소 수는?', ['4'], '초기화 목록의 원소 수로 크기가 정해집니다.', 'formula')
C(37, '가변 길이 배열(VLA)이 처음 합법이 된 C 표준은?', ['C99'], 'C89·C++에서는 불법, C99에서 합법, C11부터는 선택 기능입니다.')
C(37, 'C11 이후 VLA의 지위는?', ['선택 기능', 'optional', '선택', '옵션'], '지원하지 않는 구현은 __STDC_NO_VLA__를 정의합니다.')
C(39, 'C 함수 매개변수 int a[]와 같은 의미의 매개변수 선언은?', ['int *a', 'int* a'], '배열 매개변수는 원소 포인터로 조정됩니다. 그래서 함수 안 sizeof(a)는 포인터 크기입니다.')
C(40, 'Java 배열 x의 길이를 얻는 필드 이름은?', ['length', 'x.length'], 'length는 메서드가 아니라 필드입니다(x.length()는 오류).')
C(41, "Ada에서 배열 x의 실제 인덱스 범위를 순회할 때 쓰는 속성은? (for i in x'___ loop)", ['range', "'range", "x'range"],
  "x'range는 선언한 인덱스 범위(예: 1..n)를 돌려줍니다.")
C(43, 'Ada의 array(1..10, -10..10) of integer의 원소 수는?', ['210'], '10 × 21 = 210 (−10..10은 0을 포함해 21개).', 'formula')
C(44, 'C의 int a[3][4]에서 a[2][1]의 원소 단위 오프셋은?', ['9'], '2 × 4 + 1 = 9 (행 우선).', 'formula')
C(44, 'C/C++의 다차원 배열은 행 우선과 열 우선 중 어느 방식으로 저장되는가?', ['행 우선', 'row-major', 'row major', '행우선'],
  '그래서 int a[][20]처럼 둘째 차원 크기가 있어야 a[i]와 a[i+1] 사이 거리를 계산할 수 있습니다.')
C(45, 'Java에서 int[][] t = { {4}, {8, 6, 1, 2}, {5, 0} };일 때 t[1].length는?', ['4'], 'Java 2차원 배열은 행마다 별도 배열이라 길이가 다를 수 있습니다.', 'formula')
C(46, 'C의 typedef int (*IntFunction)(int);는 int를 받아 int를 반환하는 ___의 포인터 타입이다.', ['함수', 'function'],
  '(*이름)은 포인터, 뒤 (int)는 매개변수, 앞 int는 반환 타입입니다.')
C(47, '변수에 담고, 인자로 넘기고, 결과로 돌려받을 수 있는 값을 무엇이라 하는가? (ML의 함수)', ['일급 값', '일급 객체', 'first-class value', 'first class value', '일급'],
  '원문: Function — First class value.')
C(48, 'Scheme에서 (vector-ref (vector 10 20 30) 2)의 값은?', ['30'], '벡터 인덱스는 0부터 시작합니다.', 'formula')
C(49, '포인터 타입의 값은 메모리 주소들과 특별한 값 ___(또는 nil)이다.', ['null', 'nil', 'NULL', '널'], '널 포인터는 아무것도 가리키지 않음을 나타냅니다.')
C(50, 'Java 객체의 메모리는 어떤 방식으로 해제되는가?', ['가비지 컬렉션', '가비지 컬렉터', 'gc', 'garbage collection', '가비지컬렉션'],
  'new로 명시적으로 할당하지만 해제는 가비지 컬렉션이 자동으로 합니다.')
C(51, 'C++에서 double r = 2.3; double& s = r; s += 1; cout << r; 의 출력은?', ['3.3'], 's는 r의 별칭이므로 s를 바꾸면 r이 바뀝니다.', 'formula')
C(51, 'C++ 참조(double& s = r)는 객체 r의 ___이다.', ['별칭', 'alias', '다른 이름'], '원문: Reference — alias of an object. 포인터와 달리 값으로 조작할 수 없습니다.')
C(52, 'C에서 a[i]와 같은 의미의 포인터 식은?', ['*(a+i)', '*(i+a)', '*(a + i)'], 'a[i]는 *(a + i)의 줄임 표현이고, 덧셈의 교환법칙으로 i[a]도 같습니다.')
C(52, 'int a[5];(int는 4바이트)일 때 sizeof a의 값은?', ['20'], 'sizeof의 피연산자인 배열은 포인터로 변환되지 않아 배열 전체 크기가 나옵니다.', 'formula')
C(53, 'C에서 연결 리스트 노드의 next 필드를 자기 구조체 타입 그대로가 아니라 무엇으로 선언해야 하는가?', ['포인터', 'pointer', '구조체 포인터'],
  '자기 자신을 값으로 포함하면 크기가 무한해져 번역 시점에 정할 수 없습니다.')
C(54, 'C에서 (*c1).data와 같은 의미의 표현은?', ['c1->data'], '포인터가 가리키는 구조체 멤버는 ->로 접근합니다.')
C(56, '두 타입의 이름이 같을 때만 같은 타입으로 보는 규칙은?', ['이름 동등성', 'name equivalence'], '구조가 같으면 같다고 보는 것은 구조적 동등성입니다.')
C(56, '같은 단순 타입에서 같은 생성자를 같은 방식으로 적용해 만든 타입을 같다고 보는 규칙은?', ['구조적 동등성', 'structural equivalence'],
  '원문: Built in the same way using the same type constructors from the same simple types.')
C(58, 'C의 배열 타입에는 원소 타입과 함께 ___가 들어간다. 그래서 int[10]과 int[20]은 다른 타입이다.', ['크기', '원소 수', '길이', 'size'],
  '함수 인자로 넘길 때는 둘 다 int *로 변환되어 차이가 드러나지 않을 뿐입니다.')
C(60, '타입 이름을 타입 식으로 치환해 구조를 비교하는 방법의 예외는?', ['재귀 타입', 'recursive type', '재귀적 타입'], '치환할 때마다 자기 이름이 다시 나와 끝나지 않습니다.')
C(64, 'C는 struct와 union에 어떤 동등성 규칙을 쓰는가?', ['이름 동등성', 'name equivalence', '선언 동등성'], '그 밖의 타입(포인터·배열 등)에는 구조적 동등성을 씁니다.')
C(64, 'C의 typedef는 새 타입이 아니라 기존 타입의 ___을 만든다.', ['별칭', 'alias', '다른 이름'], '원문: typedef does not create a new data type (but just alias).')
C(64, 'Ada가 쓰는 타입 동등성 규칙은?', ['순수 이름 동등성', '이름 동등성', 'pure name equivalence', 'name equivalence'], '변수·함수 선언에 거의 항상 타입 이름이 필요합니다.')
C(65, 'Java 배열 타입은 어떤 동등성 규칙으로 비교하는가? (크기와 무관하게 int[]끼리 대입 가능)', ['구조적 동등성', 'structural equivalence'],
  'class·interface는 이름 동등성, 배열은 원소 타입 기준 구조적 동등성입니다.')
C(67, 'int 값을 double 변수에 쓰는 것처럼 정확한 동등성을 완화해 허용하는 개념은?', ['타입 호환성', '호환성', 'type compatibility', 'compatibility'],
  '타입 검사 = 타입 추론 + 타입 동등성 + 타입 호환성.')
C(67, '식의 타입을 결정하는 타입 검사 요소는?', ['타입 추론', 'type inference', '추론'], '예: 1 + 2.5의 타입은 double로 추론됩니다.')
C(68, 'long y;일 때 y/2의 타입은?', ['long'], '2(int)가 long으로 승격되어 long / long입니다.')
C(70, 'C에서 문자 리터럴 \'A\'의 타입은?', ['int'], "C에서는 int, C++·Java에서는 char입니다. C에서 sizeof('A')는 보통 4.")
C(72, 'Java에서 모든 참조 타입의 값이 될 수 있는 리터럴은?', ['null'], 'int 같은 기본 타입에는 null을 넣을 수 없습니다.')
C(73, '같은 이름(예: +)을 서로 다른 연산에 쓰는 것을 무엇이라 하는가?', ['오버로딩', '중복 정의', 'overloading', 'overload'], '번역기가 피연산자 타입으로 어떤 연산인지 결정합니다.')
C(75, '번역기가 코드에 끼워 넣는 암묵적 변환의 다른 이름(영어)은?', ['coercion'], '원문: Implicit conversion (or coercion): inserted by the translator.')
C(75, 'Java에서 int i = 16777217; float f = i;일 때 f의 값은?', ['16777216', '16777216.0'], 'float의 유효 숫자는 24비트라 2²⁴ + 1을 정확히 담지 못합니다(확대 변환의 정밀도 손실).', 'formula')
C(75, '대상 타입의 범위가 원래 타입의 범위를 모두 덮는 변환은?', ['확대 변환', 'widening', 'widening conversion', '확장 변환'], '오버플로는 없지만 정밀도는 잃을 수 있습니다.')
C(76, 'Java에서 (int) 1e10의 값은?', ['2147483647'], 'int 범위를 넘으면 최댓값으로 고정됩니다. C의 int c = 1e10;은 정의되지 않은 동작입니다.', 'formula')
C(76, 'Java에서 (int) 3.7의 값은?', ['3'], '소수 부분을 0 쪽으로 버립니다(반올림 아님).', 'formula')
C(78, '변환을 코드에 직접 적는 명시적 변환을 무엇이라 하는가?', ['캐스트', 'cast', '형 변환', '캐스팅'], '변환이 문서화되고 오버로딩 해석이 쉬워집니다.')
C(79, 'C++에 f(int, double)과 f(double, int)가 있을 때 f(1, 2) 호출은 어떤 상태인가?', ['모호하다', '모호', 'ambiguous', '모호함'],
  '두 후보가 각각 인자 하나에서만 더 잘 맞아 최선의 후보가 없습니다.')
C(80, 'C의 malloc이 돌려주는 포인터 타입은?', ['void *', 'void*'], '가리키는 대상 타입이 정해지지 않은 일반 포인터입니다.')
C(81, 'Java 업캐스트·다운캐스트는 객체는 그대로 두고 ___의 타입만 바꾼다.', ['참조', 'reference', '참조 변수'], '그래서 표현이 바뀌지 않는 변환으로 분류됩니다.')
C(82, 'Java에서 A a = new A(); SubA s = (SubA) a;를 실행하면 발생하는 예외는?', ['ClassCastException'], '컴파일은 되지만 실제 객체가 SubA가 아니라 실행 중 검사에서 실패합니다.')
C(83, 'Java에서 문자열 "42"를 int 42로 바꾸는 메서드는?', ['Integer.parseInt', 'Integer.parseInt()'], '원문의 String.parseInt는 잘못된 이름입니다.')
C(83, '문자열을 읽어 값으로 해석하는 과정(예: "42" → 42)을 무엇이라 하는가?', ['파싱', '구문 분석', 'parsing', 'parse'], '반대 방향(값 → 문자열)은 포매팅입니다.')
C(85, '선언 없이 이름의 모든 사용에서 타입을 추론하는 ML·Haskell의 타입 검사 방식은?', ['Hindley-Milner', '힌들리-밀너', 'hindley milner', 'HM'],
  '사용끼리 모순되면 타입 오류로 판정하는 정적 검사입니다.')
C(85, "ML에서 fun id x = x;의 추론된 타입은?", ["'a -> 'a", "'a->'a", 'α -> α'], 'x에 제약이 없어 어떤 타입에도 쓸 수 있는 다형 타입입니다.')
C(90, 'Hindley-Milner 검사기가 선언 없는 이름에 먼저 붙이는 것은?', ['타입 변수', 'type variable', '타입변수'], '예: a에 α, i에 β를 붙인 뒤 조건을 풀어 갑니다.')
C(91, 'a[i] + i의 HM 검사에서 첨자 노드를 본 뒤 a의 타입은? (원소 타입은 아직 모름)', ['array of γ', 'array of gamma', 'γ의 배열', 'γ 배열'],
  'a가 배열이어야 하므로 α = array of γ로 바꿉니다.')
C(93, 'a[i] + i의 HM 검사에서 + 노드를 본 뒤 γ의 값은?', ['int'], '+의 두 피연산자 타입(γ와 int)이 같아야 하므로 γ = int입니다.')
C(94, '두 타입 식을 같게 맞추는 패턴 매칭 과정을 무엇이라 하는가?', ['단일화', '통합', 'unification'], '예: array of α와 array of int를 단일화하면 α = int.')
C(94, '타입 변수를 실제 타입으로 바꾸고 그 변수의 모든 출현을 함께 갱신하는 것을 무엇이라 하는가?', ['인스턴스화', 'instantiation', '구체화'],
  '한 곳만 바꾸지 않고 모든 출현을 바꿉니다.')
C(94, 'array of α와 array of int를 단일화하면 α는?', ['int', 'α = int', 'α=int'], '바깥 생성자(array of)가 같으므로 안쪽 α와 int를 같게 맞춥니다.')
C(95, 'Hindley-Milner 방식이 자동으로 제공하는 다형성은?', ['매개변수 다형성', 'parametric polymorphism', '파라메트릭 다형성', '매개변수적 다형성'],
  '예: Array of α는 무한히 많은 타입의 집합을 나타냅니다.')

ids = [c['id'] for c in CARDS]
assert len(ids) == len(set(ids))
for c in CARDS:
    assert c['answers'] and c['why'] and 1 <= c['src'][1] <= 96, c
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'dist', 'recall-cards-pl09.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('/* PL 09 데이터 타입 쓰기 복습 카드 · 생성 파일: authoring/programming-languages/pl09_cards.py */\n')
    f.write('(window.RECALL_CARDS = window.RECALL_CARDS || []).push(...' + json.dumps(CARDS, ensure_ascii=False, indent=0) + ');\n')
print('cards', len(CARDS))
