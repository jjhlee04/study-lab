/* PL 09 데이터 타입 · 생성 파일: authoring/programming-languages/build_pl09.py
 * 쪽 번호와 순서는 영문 원문 PL-09-Types.pdf를 따른다. 해설·예제·풀이·퀴즈는 원문 개념을 풀어 쓴 보충 설명이다. */
(() => {
  window.COURSE_CHAPTERS.push({
 "id": "pl09",
 "title": "PL 09 · 데이터 타입",
 "url": "original/PL-09-Types.pdf",
 "startPage": 4,
 "finalRange": "전체",
 "quizVersion": "v2",
 "pages": [
  {
   "page": 1,
   "title": "데이터 타입 · 표지",
   "explanation": "Programming Languages 10장 \"Data Types\"(교재 Louden & Lambert 8장) 표지입니다. 이 사이트에서는 PL 09로 분류했습니다. 학습 내용과 퀴즈는 4쪽부터 시작합니다.",
   "kind": "structure",
   "role": "표지",
   "image": "pages/pl09-01.jpg",
   "text": "Programming Languages\n10. Data Types\n(Chapter 8)\nJi Eun Kim\nFall 2026"
  },
  {
   "page": 2,
   "title": "이 장의 주제",
   "explanation": "이 장은 다음 순서로 진행합니다.\n① 데이터 타입과 타입 정보 → ② 타입 시스템(강한·약한·동적 타입) → ③ 단순 타입(열거형, 부분 범위) → ④ 타입 생성자(곱, 합, 부분집합, 배열·함수, 포인터) → ⑤ 타입 동등성 → ⑥ 타입 검사 → ⑦ 타입 변환 → ⑧ 다형적 타입 검사(Hindley-Milner).\n앞에서 만든 개념이 뒤에서 계속 쓰이므로 순서대로 읽는 것을 권합니다.",
   "kind": "structure",
   "role": "목차",
   "image": "pages/pl09-02.jpg",
   "text": "Topics\n\n• Data types and type information\n• Type system\n• Simple types\n• Type constructors\n• Type equivalence\n• Type checking\n• Type conversion\n• Polymorphic type checking\n2"
  },
  {
   "page": 3,
   "title": "구분 · 데이터 타입과 타입 정보",
   "explanation": "첫 단원 \"Data Types and Type Information\"의 구분 쪽입니다. 다음 쪽에서 타입의 두 가지 정의를 배웁니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-03.jpg",
   "text": "Data Types and Type Information\n\n3"
  },
  {
   "page": 4,
   "title": "타입은 값과 연산의 집합",
   "explanation": "타입 이름(예: int)은 그 타입의 변수가 가질 수 있는 값과, 그 값이 메모리 안에서 표현되는 방식을 함께 알려 줍니다. 원문은 타입을 두 단계로 정의합니다. 정의 1은 \"값의 집합\", 정의 2는 \"값의 집합 + 그 값에 쓸 수 있는 연산의 집합\"입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "타입 이름은 ① 변수가 담을 수 있는 값의 범위와 ② 그 값의 내부 표현 방식을 나타낸다.",
     "정의 1 · 타입 = 값의 집합. Java의 int x는 x ∈ {−2147483648, …, 2147483647}이라는 뜻이다(32비트, −2³¹ ~ 2³¹−1).",
     "정의 2 · 타입 = 값의 집합 + 그 값에 적용할 수 있고 정해진 성질을 갖는 연산의 집합.",
     "원문이 든 연산의 예: 정수·실수의 산술 연산, 배열의 첨자 연산 [ ], 구조체·레코드의 멤버 선택 연산(.)"
    ],
    "analogy": "타입은 \"상자 사용 설명서\"와 같습니다. 정수 상자 설명서에는 \"−21억~21억 사이의 정수만 넣으시오\"(값)와 \"+, −, ×, ÷ 가능\"(연산)이 함께 적혀 있습니다. 배열 상자 설명서에는 \"[번호]로 칸을 꺼낼 수 있음\"이 적혀 있습니다.",
    "examples": [
     {
      "title": "값의 집합과 연산 확인하기",
      "code": "int x = 2147483647;          // int 집합의 가장 큰 값\nSystem.out.println(x + 1);   // 정수 덧셈 연산\n\nint[] a = {10, 20, 30};\nSystem.out.println(a[1]);    // 배열의 첨자 연산 [ ]",
      "lang": "Java",
      "out": "-2147483648\n20",
      "note": "첫 줄: 수학적으로는 2147483648이지만 이 값은 int 집합 밖입니다. Java의 int 덧셈은 32비트 안에서 계산되어 가장 작은 값으로 넘어갑니다(오버플로). \"int = 정해진 범위의 값 + 정해진 방식의 연산\"이라는 정의 2가 그대로 드러나는 예입니다. (보충 예제)",
      "error": false
     }
    ],
    "steps": [
     "int x를 선언하면 x가 가질 수 있는 값은 −2147483648부터 2147483647까지로 정해진다(정의 1).",
     "x + 1을 계산할 때는 int 타입이 제공하는 정수 덧셈 연산이 쓰인다(정의 2의 \"연산\").",
     "결과 2147483648은 int 값의 집합에 없으므로, Java의 int 덧셈 규칙(32비트 2의 보수)에 따라 −2147483648이 된다.",
     "a는 int 배열 타입이므로 첨자 연산 [ ]를 쓸 수 있고 a[1]은 두 번째 원소 20이다."
    ],
    "trap": [
     "원문 4쪽의 \"x Î Integers\"에서 Î는 원소 기호 ∈가 PDF 글꼴 문제로 깨진 것입니다. \"x는 정수 집합의 원소\"로 읽으세요.",
     "정의 1만 기억하면 \"타입 = 값의 범위\"로 끝나기 쉽습니다. 시험에서는 연산까지 포함한 정의 2가 더 완전한 정의라는 점을 구분하세요."
    ],
    "recap": "타입 = 값의 집합 + 그 값에 쓸 수 있는 연산의 집합. 타입 이름은 값의 범위와 내부 표현도 알려 준다.",
    "source": "PDF 4쪽"
   },
   "quizzes": [
    [
     "원문의 정의 2에 따르면 데이터 타입은 무엇인가?",
     [
      "값의 집합과, 그 값에 적용할 수 있는 연산의 집합",
      "값의 집합만",
      "변수 이름들의 집합"
     ],
     "정의 1은 값의 집합, 정의 2는 여기에 연산의 집합을 더한 것입니다.",
     [
      "정의 2 그대로입니다.",
      "정의 1에 해당합니다.",
      "타입은 이름의 집합이 아닙니다."
     ]
    ],
    [
     "Java에서 int x = 2147483647; 다음 x + 1의 결과는?",
     [
      "-2147483648",
      "2147483648",
      "컴파일 오류"
     ],
     "int의 최댓값에 1을 더하면 32비트 범위를 넘어 가장 작은 값으로 넘어갑니다.",
     [
      "오버플로 결과입니다.",
      "int 값의 집합 밖이라 표현할 수 없습니다.",
      "상수가 아닌 변수 연산이므로 컴파일은 됩니다."
     ]
    ],
    [
     "원문이 \"배열 타입의 연산\"으로 든 예는?",
     [
      "첨자 연산 [ ]",
      "멤버 선택 연산 .",
      "나머지 연산 %"
     ],
     "배열에는 첨자(subscript) 연산, 구조체·레코드에는 멤버 선택 연산이 예로 나옵니다.",
     [
      "배열의 연산입니다.",
      "구조체·레코드의 연산입니다.",
      "정수 산술 연산입니다."
     ]
    ]
   ],
   "image": "pages/pl09-04.jpg",
   "text": "Data Types and Type Information\n\n• Type name represents the possible values that a variable of that type\n•\n\ncan hold and the way those values are represented internally\nData type (definition 1): a set of values\n• e.g., int in Java:\nint x;\nx Î Integers= [-2147483648, 2147483647]\n\n• Data type (definition 2): a set of values, together with a set of\noperations on that values having certain properties, e.g.,\n– arithmetic operations on integers or reals\n– subscript operation [ ] on arrays\n– member selection operation on structure or record types\n\n4",
   "quiz": [
    "원문의 정의 2에 따르면 데이터 타입은 무엇인가?",
    [
     "값의 집합과, 그 값에 적용할 수 있는 연산의 집합",
     "값의 집합만",
     "변수 이름들의 집합"
    ],
    "정의 1은 값의 집합, 정의 2는 여기에 연산의 집합을 더한 것입니다."
   ],
   "quizReasons": [
    "정의 2 그대로입니다.",
    "정의 1에 해당합니다.",
    "타입은 이름의 집합이 아닙니다."
   ]
  },
  {
   "page": 5,
   "title": "타입이 결과를 바꾸는 예: z = x / y",
   "explanation": "같은 식 z = x / y라도 x, y, z의 타입에 따라 어떤 나눗셈을 할지, 결과를 어디에 저장할 수 있는지가 달라집니다. 타입은 프로그램의 의미 자체를 결정합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "x, y가 int이면 정수 나눗셈을 한다. 5 / 2 = 2 (소수 부분 버림).",
     "정수 결과 2를 int z에 넣으면 2, double z에 넣으면 자동으로 2.0이 된다.",
     "x, y가 double이면 실수 나눗셈을 한다. 5.0 / 2.0 = 2.5.",
     "실수 결과 2.5를 int z에 넣는 것은 Java에서 컴파일 오류다(값 손실 가능). double z에는 2.5가 들어간다."
    ],
    "analogy": "타입은 계산기 모드와 같습니다. 정수 모드 계산기는 5 ÷ 2를 2로 보여 주고, 실수 모드 계산기는 2.5로 보여 줍니다. 버튼(/)은 같아도 모드(타입)에 따라 결과가 다릅니다.",
    "examples": [
     {
      "title": "int로 나누기",
      "code": "int x = 5, y = 2;\nint    z1 = x / y;\ndouble z2 = x / y;\nSystem.out.println(z1);\nSystem.out.println(z2);",
      "lang": "Java",
      "out": "2\n2.0",
      "note": "z2도 2.0입니다. 나눗셈은 int끼리 먼저 계산되어 2가 되고, 그 다음에 double로 바뀌기 때문입니다.",
      "error": false
     },
     {
      "title": "double로 나누기",
      "code": "double x = 5, y = 2;\ndouble z = x / y;     // 2.5\nint    w = x / y;     // ← 이 줄 때문에 컴파일되지 않음",
      "lang": "Java",
      "out": "error: incompatible types: possible lossy conversion from double to int\n    int    w = x / y;\n                 ^",
      "note": "원문의 \"int z: wrong!\"은 이 컴파일 오류를 뜻합니다. 실수를 정수에 넣으면 소수 부분이 사라질 수 있어 Java는 자동 변환을 막습니다.",
      "error": true
     }
    ],
    "steps": [
     "피연산자 x, y의 타입을 먼저 본다. 둘 다 int → 정수 나눗셈, 하나라도 double → 실수 나눗셈.",
     "나눗셈 결과의 타입을 정한다. int / int → int, double / double → double.",
     "대입할 변수 z의 타입과 비교한다. int → double은 자동으로 넓혀 주고(2 → 2.0), double → int는 Java가 거부한다.",
     "실수 결과를 원하면 나누기 전에 바꿔야 한다: (double) x / y = 2.5."
    ],
    "trap": [
     "double z = x / y;(x, y는 int)의 결과는 2.5가 아니라 2.0입니다. 저장할 변수의 타입은 나눗셈 방식에 영향을 주지 않습니다.",
     "(double)(x / y)는 이미 2가 된 뒤 변환하므로 2.0이고, (double) x / y는 x를 먼저 바꾸므로 2.5입니다."
    ],
    "recap": "나눗셈 방식은 피연산자의 타입이, 대입 가능 여부는 변수의 타입이 결정한다.",
    "source": "PDF 5쪽"
   },
   "quizzes": [
    [
     "int x = 5, y = 2; double z = x / y; 일 때 z의 값은?",
     [
      "2.0",
      "2.5",
      "컴파일 오류"
     ],
     "x / y는 정수 나눗셈으로 먼저 2가 되고, double에 넣으며 2.0이 됩니다.",
     [
      "맞습니다.",
      "나눗셈이 정수끼리 이루어집니다.",
      "int → double은 자동으로 허용됩니다."
     ]
    ],
    [
     "double x = 5, y = 2; int z = x / y; 를 Java로 컴파일하면?",
     [
      "컴파일 오류가 난다",
      "z = 2가 된다",
      "z = 3이 된다"
     ],
     "double 결과를 int에 넣는 축소 변환은 명시적 캐스트가 필요합니다.",
     [
      "원문의 \"int z: wrong!\"입니다.",
      "C라면 2가 되지만 Java는 거부합니다.",
      "반올림하지 않습니다."
     ]
    ],
    [
     "int x = 5, y = 2;에서 2.5를 얻으려면?",
     [
      "(double) x / y",
      "(double)(x / y)",
      "x / y + 0.0"
     ],
     "나누기 전에 피연산자 하나를 double로 바꿔야 실수 나눗셈이 됩니다.",
     [
      "x가 먼저 5.0이 됩니다.",
      "이미 2가 된 뒤 바꿔 2.0입니다.",
      "2 + 0.0 = 2.0입니다."
     ]
    ]
   ],
   "image": "pages/pl09-05.jpg",
   "text": "Why are data types important?\n● Example: z = x / y; (Java)\n\nint x, y;\nx = 5;\ny = 2;\nz = x / y;\ndouble x, y;\nx = 5;\ny = 2;\nz = x / y;\n\n■\n\ninteger division, x/y results in 2.\n\n■\n\nint z: z = 2;\n\n■\n\ndouble z:\n\n■\n\nfloating-point division, x/y results in 2.5\nint z: wrong!\ndouble z: z = 2.5;\n\n■\n■\n\nz = 2.0;\n\n5",
   "quiz": [
    "int x = 5, y = 2; double z = x / y; 일 때 z의 값은?",
    [
     "2.0",
     "2.5",
     "컴파일 오류"
    ],
    "x / y는 정수 나눗셈으로 먼저 2가 되고, double에 넣으며 2.0이 됩니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "나눗셈이 정수끼리 이루어집니다.",
    "int → double은 자동으로 허용됩니다."
   ]
  },
  {
   "page": 6,
   "title": "강한 타입 언어 (Strongly-typed)",
   "explanation": "원문은 Ada, ML, Haskell, Java, Pascal을 강한 타입 언어로 소개합니다. 대부분의 타입 오류를 번역(컴파일) 시점에 잡고, 배열 범위 초과처럼 일부는 실행 중에 검사해 오류를 보고합니다. 핵심은 \"타입 오류 때문에 데이터가 망가지는 일이 실행 중에 생기지 않는다\"는 점입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "강한 타입 언어: 대부분의 타입 오류를 번역 시점에 발견하고, 일부(예: 배열 첨자 범위 초과)는 실행 중 검사해 런타임 오류로 보고한다.",
     "장점 ① 실행 중 데이터를 망가뜨리는 오류가 생기지 않는다(안전하지 않은 프로그램이 데이터 오류를 일으킬 수 없다).",
     "장점 ② 번역·실행 효율, ③ 보안·신뢰성.",
     "단점 ① 안전한 프로그램도 거부할 수 있다: 적법한(legal) 프로그램 ⊂ 안전한(safe) 프로그램.",
     "단점 ② 프로그래머가 타입 정보를 명시해야 하는 부담이 있다."
    ],
    "analogy": "강한 타입 언어는 \"출입 심사가 엄격한 공항\"과 같습니다. 대부분은 탑승 전(컴파일)에 걸러 내고, 일부는 탑승 중(실행 중)에도 확인합니다. 그래서 사고(데이터 손상)는 거의 없지만, 서류가 조금만 애매해도 실제로는 문제없는 승객을 돌려보내기도 합니다.",
    "examples": [
     {
      "title": "실행 중 검사의 예: 배열 범위 초과",
      "code": "int[] a = new int[3];\na[5] = 1;     // 컴파일은 통과, 실행 중 검사",
      "lang": "Java",
      "out": "Exception in thread \"main\" java.lang.ArrayIndexOutOfBoundsException:\n    Index 5 out of bounds for length 3",
      "note": "Java는 잘못된 칸에 쓰기 전에 멈춥니다. 같은 코드를 C로 쓰면 검사 없이 다른 메모리를 덮어쓸 수 있습니다(정의되지 않은 동작). 이것이 \"데이터를 망가뜨리는 오류가 없다\"는 장점의 의미입니다.",
      "error": true
     }
    ],
    "steps": [
     "컴파일러가 선언된 타입을 보고 대부분의 오류를 먼저 거른다.",
     "컴파일 시점에 알 수 없는 것(배열 첨자 값 등)은 실행 중에 검사 코드를 넣어 확인한다.",
     "검사에 걸리면 데이터를 건드리기 전에 런타임 오류를 낸다 → 데이터 손상 없음.",
     "대신 컴파일러가 증명하지 못하는 안전한 코드는 거부될 수 있다(7쪽 예제)."
    ],
    "trap": [
     "\"강한 타입\"과 \"정적 타입 검사\"는 다른 기준입니다. 강한/약한은 타입 위반을 얼마나 확실히 막는가, 정적/동적은 언제 검사하는가입니다. 원문 정의는 두 성질을 함께 가진 언어(Java 등)를 예로 들어 설명합니다.",
     "Java도 모든 것을 컴파일 시점에 검사하지는 않습니다. 배열 범위와 다운캐스트(82쪽)는 실행 중에 검사합니다."
    ],
    "recap": "강한 타입 = 타입 위반으로 데이터가 망가지지 않게 막음. 대가는 일부 안전한 프로그램의 거부와 타입 표기 부담.",
    "source": "PDF 6쪽"
   },
   "quizzes": [
    [
     "원문이 강한 타입 언어에서도 \"실행 중\"에 검사한다고 든 예는?",
     [
      "배열 첨자 범위 초과",
      "정수와 문자열의 덧셈",
      "함수 반환 타입 누락"
     ],
     "첨자 값은 실행해 봐야 알 수 있으므로 실행 중에 검사합니다.",
     [
      "원문의 예입니다.",
      "Java에서는 컴파일 시점에 결정됩니다.",
      "컴파일 시점에 검사됩니다."
     ]
    ],
    [
     "\"legal programs ⊂ safe programs\"가 뜻하는 것은?",
     [
      "컴파일러가 허용하는 프로그램은 안전하지만, 안전한 프로그램 중 일부는 거부될 수 있다",
      "안전한 프로그램은 모두 컴파일된다",
      "적법한 프로그램 중 일부는 안전하지 않다"
     ],
     "적법한 프로그램 집합이 안전한 프로그램 집합의 부분집합입니다. 그 차이가 \"안전하지만 거부되는 프로그램\"입니다.",
     [
      "부분집합 관계를 정확히 읽었습니다.",
      "그렇다면 두 집합이 같아야 합니다.",
      "강한 타입 언어의 장점과 반대입니다."
     ]
    ],
    [
     "원문이 강한 타입 언어의 단점으로 든 것은?",
     [
      "프로그래머가 타입 정보를 명시해야 하는 부담",
      "실행 중 데이터 손상이 잦다",
      "번역 효율이 떨어진다"
     ],
     "단점은 안전한 프로그램의 거부와 명시적 타입 정보 부담입니다.",
     [
      "원문의 단점입니다.",
      "장점(데이터 손상 없음)과 반대입니다.",
      "원문은 효율을 장점으로 듭니다."
     ]
    ]
   ],
   "image": "pages/pl09-06.jpg",
   "text": "Strongly-Typed Languages\nStrongly-typed: (Ada, ML, Haskell, Java, Pascal)\n○ Most data type errors detected at translation time\n○ A few checked during execution and runtime error reported (e.g.,\nsubscript out of array bounds).\n● Pros:\n○ No data-corrupting errors can occur during execution. (i.e., no unsafe\nprogram can cause data errors.)\n○ Efficiency (in translation and execution.)\n○ Security/reliability\n● Cons:\n○ May reject safe programs (i.e., legal programs is a subset of safe\nprograms.)\n○ Burden on programmers, may often need to provide explicit type\ninformation.\n\n6",
   "quiz": [
    "원문이 강한 타입 언어에서도 \"실행 중\"에 검사한다고 든 예는?",
    [
     "배열 첨자 범위 초과",
     "정수와 문자열의 덧셈",
     "함수 반환 타입 누락"
    ],
    "첨자 값은 실행해 봐야 알 수 있으므로 실행 중에 검사합니다."
   ],
   "quizReasons": [
    "원문의 예입니다.",
    "Java에서는 컴파일 시점에 결정됩니다.",
    "컴파일 시점에 검사됩니다."
   ]
  },
  {
   "page": 7,
   "title": "적법한 프로그램 ⊂ 안전한 프로그램: Java 예",
   "explanation": "컴파일러는 선언된 타입과 코드의 구조만 보고 판단합니다. 그래서 실제로 실행하면 문제가 없는 코드도 \"증명할 수 없으면\" 거부합니다. 원문은 세 가지 Java 예를 듭니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "실제 타입은 맞지만 선언 타입이 다른 경우: Object o = \"hello\"; String s = o; → 컴파일 오류.",
     "절대 실행되지 않는 코드라도 검사한다: if (false) { int n = \"abc\"; } → 컴파일 오류.",
     "모든 경로가 return하지만 컴파일러가 모르는 경우: if (n >= 0) return 1; if (n < 0) return -1; → \"missing return statement\".",
     "고치는 방법: 캐스트로 의도를 알리거나(String s = (String) o;), 구조만 봐도 모든 경로가 return하도록 else를 쓴다."
    ],
    "analogy": "시험 감독관이 \"답은 맞았는데 풀이 과정이 없으니 감점\"하는 것과 비슷합니다. 실제로는 옳더라도, 규칙(선언 타입·코드 구조)으로 옳다는 것을 보여 주지 못하면 통과시키지 않습니다.",
    "examples": [
     {
      "title": "선언 타입이 다른 경우",
      "code": "Object o = \"hello\";   // 실제 객체는 String\nString s = o;         // 컴파일러는 o를 Object로만 본다",
      "lang": "Java",
      "out": "error: incompatible types: Object cannot be converted to String",
      "note": "고친 코드: String s = (String) o; → 실행 중 검사(82쪽)를 통과해 정상 동작합니다.",
      "error": true
     },
     {
      "title": "구조만으로 판단하는 return 검사",
      "code": "int sign(int n) {\n    if (n >= 0) return 1;\n    if (n < 0)  return -1;\n}                         // ← missing return statement\n\nint sign2(int n) {        // 적법한 버전\n    if (n >= 0) return 1;\n    else        return -1;\n}",
      "lang": "Java",
      "out": "error: missing return statement",
      "note": "Java 컴파일러는 두 if 조건이 서로를 보완한다는 사실을 계산하지 않습니다. else를 쓰면 구조만 봐도 모든 경로가 return합니다.",
      "error": true
     }
    ],
    "steps": [
     "String s = o; 를 검사할 때 컴파일러는 o의 선언 타입 Object만 본다. Object → String 대입 규칙이 없으므로 거부한다.",
     "if (false) 블록도 타입 검사 대상이다. \"abc\"(String)를 int에 넣는 규칙이 없으므로 거부한다.",
     "sign은 조건 두 개가 모든 정수를 덮지만, 컴파일러는 조건 내용을 따지지 않고 \"if 다음에 return 없는 경로가 있다\"고 본다.",
     "세 경우 모두 실행하면 안전하지만 적법하지 않다 → 안전한 프로그램 중 일부가 거부된다(6쪽)."
    ],
    "trap": [
     "원문 주석 \"double n=NaN일 경우 unsafe!\"는 매개변수가 double이라고 가정한 설명입니다. 이 예의 n은 int라 NaN이 없습니다. 자세한 대조는 아래 자료 검토를 보세요.",
     "거부 이유는 \"실행하면 오류가 나서\"가 아닙니다. \"규칙으로 안전함을 확인할 수 없어서\"입니다."
    ],
    "recap": "컴파일러는 실제 값이 아니라 선언 타입과 코드 구조로 판단한다. 그래서 안전하지만 거부되는 프로그램이 생긴다.",
    "source": "PDF 7쪽"
   },
   "quizzes": [
    [
     "Object o = \"hello\"; String s = o; 는 Java에서 어떻게 되는가?",
     [
      "컴파일 오류",
      "정상 실행되어 s는 \"hello\"",
      "실행 중 ClassCastException"
     ],
     "컴파일러는 o의 선언 타입 Object만 보고 String 대입을 거부합니다.",
     [
      "선언 타입 기준 판단입니다.",
      "실제 객체는 String이지만 컴파일 단계에서 막힙니다.",
      "컴파일조차 되지 않으므로 실행 단계까지 가지 않습니다."
     ]
    ],
    [
     "if (false) { int n = \"abc\"; } 는?",
     [
      "실행되지 않는 블록이어도 컴파일 오류",
      "실행되지 않으므로 통과",
      "경고만 나고 통과"
     ],
     "타입 검사는 실행 여부와 관계없이 모든 코드에 적용됩니다.",
     [
      "맞습니다.",
      "타입 검사는 실행 경로를 따지지 않습니다.",
      "String을 int에 넣는 것은 오류입니다."
     ]
    ],
    [
     "원문의 sign 함수가 컴파일되도록 고치는 가장 간단한 방법은?",
     [
      "두 번째 if를 else로 바꾼다",
      "n을 long으로 바꾼다",
      "함수 앞에 static을 붙인다"
     ],
     "else를 쓰면 코드 구조만으로도 모든 경로가 return함을 알 수 있습니다.",
     [
      "원문의 수정 방법입니다.",
      "타입을 바꿔도 경로 구조는 같습니다.",
      "return 경로 문제와 무관합니다."
     ]
    ]
   ],
   "review": {
    "original": "// double n=NaN 일 경우 unsafe!  (int sign(int n) 예제 옆 주석)",
    "checked": "예제의 매개변수는 int라서 NaN이 될 수 없습니다. 이 주석은 같은 코드를 double n으로 바꾼 경우의 설명으로 읽어야 맞습니다. double이면 n이 NaN일 때 n >= 0과 n < 0이 모두 거짓이라 return 없이 끝나는 경로가 실제로 생깁니다. 즉 Java의 \"구조로 return을 확인하는 규칙\"은 이런 경우까지 막아 줍니다. int 예제가 거부되는 이유는 NaN 때문이 아니라 컴파일러가 조건의 내용을 분석하지 않기 때문입니다.",
    "label": "보충 설명 · 원문 주석의 적용 범위",
    "ask": "강의에서 이 주석을 double 매개변수 기준으로 설명했는지 확인하세요."
   },
   "image": "pages/pl09-07.jpg",
   "text": "Legal programs ⊂ Safe programs: Java examples\n실제 type 은 맞지만 선언이 다른 경우\nObject o = \"hello\";\nString s = o;\n// Compilation error: Object를 String에 대입할 수 없음\n절대 실행 되지 않는 코드\nif (false) {\nint n = \"abc\"; // Compilation error\n}\n모든 경우에 return하지만 compile는 모름\nint sign(int n) {\nif (n >= 0) return 1;\nif (n < 0) return -1;\n} // Compilation error : missing return statement\n// double n=NaN 일 경우 unsafe!\n\n=>\n\n//legal\nint sign(int n) {\nif (n >= 0) return 1;\nelse return -1;\n// 구조만 봐도 모든 경로가 return\n}\n7",
   "quiz": [
    "Object o = \"hello\"; String s = o; 는 Java에서 어떻게 되는가?",
    [
     "컴파일 오류",
     "정상 실행되어 s는 \"hello\"",
     "실행 중 ClassCastException"
    ],
    "컴파일러는 o의 선언 타입 Object만 보고 String 대입을 거부합니다."
   ],
   "quizReasons": [
    "선언 타입 기준 판단입니다.",
    "실제 객체는 String이지만 컴파일 단계에서 막힙니다.",
    "컴파일조차 되지 않으므로 실행 단계까지 가지 않습니다."
   ]
  },
  {
   "page": 8,
   "title": "약한 타입 언어와 동적 타입 언어",
   "explanation": "약한 타입 언어는 타입 규칙에 \"빠져나갈 구멍\"이 있어 안전하지 않은 프로그램을 허용할 수 있습니다(C, C++). 원문이 \"untyped(또는 동적 타입)\"라고 부른 언어는 정적 타입 시스템이 없고 모든 안전 검사를 실행 중에 합니다(Scheme, Smalltalk, Python, Ruby).",
   "kind": "lesson",
   "lesson": {
    "core": [
     "약한 타입(weakly-typed): 안전하지 않은 프로그램을 허용하는 허점이 있다. 예: C·C++에서는 정수·포인터·배열을 서로 섞어 쓸 수 있다.",
     "int *p = (int *)0x1000; 은 컴파일된다. 컴파일러는 그 주소에 정말 유효한 정수가 있는지 확인할 수 없다.",
     "동적 타입(원문 표현: untyped): 정적 타입 시스템이 없고 모든 안전 검사를 실행 중에 한다.",
     "실행 중 검사에는 시간이 들어 실행이 느려질 수 있다. Python의 \"1\" + 1은 실행 중 TypeError로 막힌다."
    ],
    "analogy": "약한 타입은 \"검문소에 뒷문이 있는 도로\", 동적 타입은 \"검문을 출발 전이 아니라 달리는 도중에 하는 도로\"입니다. 둘은 다른 이야기입니다. 달리는 도중에 검문해도 뒷문이 없으면(파이썬) 위험한 차는 결국 멈춰 세워집니다.",
    "examples": [
     {
      "title": "C: 허점(loophole) 이용",
      "code": "int *p = (int *)0x1000;   // 정수 → 포인터: 컴파일 통과\nprintf(\"%d\\n\", *p);       // 그 주소에 무엇이 있는지 아무도 모름",
      "lang": "C",
      "out": "Segmentation fault (core dumped)",
      "note": "실행 결과는 정해져 있지 않습니다(정의되지 않은 동작). 위 출력은 일반적인 Linux에서 흔히 보는 예입니다. 언어가 막아 주지 않는다는 점이 \"약한\" 타입의 의미입니다.",
      "error": true,
      "outLabel": "실행 결과 예 · Linux"
     },
     {
      "title": "Python: 실행 중 검사",
      "code": "print(\"1\" + 1)",
      "lang": "Python",
      "out": "TypeError: can only concatenate str (not \"int\") to str",
      "note": "Python은 실행하기 전에는 타입을 검사하지 않지만, 실행 중 잘못된 연산을 만나면 멈춥니다. 데이터가 조용히 망가지지 않습니다.",
      "error": true
     },
     {
      "title": "두 기준을 나누어 보기",
      "code": "",
      "lang": "",
      "out": "            검사 시점: 정적(실행 전)      동적(실행 중)\n엄격함 강   Java, Ada, ML, Haskell       Python, Ruby, Scheme\n엄격함 약   C, C++                       (예: JavaScript의 \"1\"+1 → \"11\")",
      "note": "표는 보충 정리입니다. JavaScript 칸은 암묵 변환이 많은 언어의 예로 든 것이며, 언어 분류는 교재마다 다를 수 있습니다.",
      "error": false,
      "outLabel": "보충 정리표"
     }
    ],
    "steps": [
     "C 예: (int *) 캐스트로 정수를 포인터로 바꾸는 것을 언어가 허용한다 → 컴파일 통과.",
     "실행 중에도 언어는 *p가 유효한지 검사하지 않는다 → 잘못된 메모리 접근, 데이터 손상 가능.",
     "Python 예: 실행 전 타입 검사는 없다. \"1\" + 1을 실행하는 순간 str + int 규칙이 없음을 확인한다.",
     "규칙 위반을 발견하면 TypeError로 멈춘다 → 안전성은 지키되, 오류 발견이 실행 시점으로 늦어진다."
    ],
    "trap": [
     "\"동적 타입 = 약한 타입\"이 아닙니다. Python은 동적으로 검사하지만 str + int를 막으므로 안전한 쪽에 가깝습니다.",
     "원문은 untyped와 dynamically typed를 같은 뜻으로 묶었습니다. 엄밀히 untyped는 값에 타입 구분 자체가 없는 경우(예: 어셈블리)를 가리키는 경우가 많습니다. 아래 자료 검토를 참고하세요."
    ],
    "recap": "약한 타입 = 안전하지 않은 프로그램을 허용하는 허점이 있음. 동적 타입 = 검사를 실행 중에 함. 두 기준은 서로 다르다.",
    "source": "PDF 8쪽"
   },
   "quizzes": [
    [
     "Python에서 \"1\" + 1을 실행하면?",
     [
      "실행 중 TypeError가 난다",
      "\"11\"이 출력된다",
      "2가 출력된다"
     ],
     "Python은 실행 중에 str + int를 검사해 거부합니다.",
     [
      "원문 예입니다.",
      "JavaScript식 암묵 변환입니다.",
      "자동으로 숫자로 바꾸지 않습니다."
     ]
    ],
    [
     "원문이 C를 약한 타입 언어로 분류한 근거는?",
     [
      "정수·포인터·배열을 서로 섞어 쓸 수 있는 허점",
      "실행 중에만 타입을 검사함",
      "타입 선언이 전혀 없음"
     ],
     "C는 정적으로 검사하지만 허점 때문에 안전하지 않은 프로그램을 허용합니다.",
     [
      "원문 표현입니다.",
      "C는 컴파일 시점에 검사합니다.",
      "C는 타입 선언이 필요합니다."
     ]
    ],
    [
     "\"Python은 실행 중에 검사하므로 약한 타입 언어다\"라는 주장은?",
     [
      "틀렸다. 검사 시점과 위반을 막는 엄격함은 별개의 기준이다",
      "맞다. 동적 검사는 곧 약한 타입이다",
      "맞다. Python은 타입이 없다"
     ],
     "동적/정적은 \"언제\", 강/약은 \"얼마나 확실히 막는가\"입니다.",
     [
      "두 축을 구분했습니다.",
      "동적이지만 str + int를 막습니다.",
      "값마다 타입이 있습니다."
     ]
    ]
   ],
   "review": {
    "original": "Untyped (or dynamically typed) languages: languages without static type systems … Code with type errors: slower execution time",
    "checked": "\"untyped\"와 \"dynamically typed\"는 보통 구분합니다. Python·Scheme의 값은 실행 중에 타입을 가지며 검사되므로 \"동적 타입 언어\"라고 부르는 것이 더 정확합니다. 또 \"slower execution time\"은 타입 오류가 있는 코드가 느리다는 뜻이 아니라, 실행 중 타입 검사를 하는 비용 때문에 실행이 느려질 수 있다는 뜻으로 읽는 것이 자연스럽습니다.",
    "label": "용어 보충 · 일반 교재 용법과 대조",
    "ask": "시험 답안에서 untyped와 dynamically typed를 같은 뜻으로 써도 되는지 강의 기준을 확인하세요."
   },
   "image": "pages/pl09-08.jpg",
   "text": "Weakly-typed and untyped languages\n\n• Weakly-typed language: one that has loopholes that may allow unsafe\nprograms\n• Example: C, C++\n• interoperability of integers, pointers, arrays.\n\ne.g., int *p = (int *)0x1000; // 컴파일러가 해당 주소에 실제로 유효한 정수\n데이터가 있는지 검사할 수 없음\n\n• Untyped (or dynamically typed) languages: languages without static\ntype systems\n– All safety checking is performed at execution time\n– Code with type errors: slower execution time\n– Example: Scheme, smalltalk, script languages (Python, Ruby)\n– Python: ”1” + 1 #TypeError!\n\n8",
   "quiz": [
    "Python에서 \"1\" + 1을 실행하면?",
    [
     "실행 중 TypeError가 난다",
     "\"11\"이 출력된다",
     "2가 출력된다"
    ],
    "Python은 실행 중에 str + int를 검사해 거부합니다."
   ],
   "quizReasons": [
    "원문 예입니다.",
    "JavaScript식 암묵 변환입니다.",
    "자동으로 숫자로 바꾸지 않습니다."
   ]
  },
  {
   "page": 9,
   "title": "설계의 균형: 안전성 vs 유연성",
   "explanation": "타입 시스템은 안전성(security)과 유연성(flexibility)을 함께 높이려 합니다. 원문이 말하는 유연성은 ① 안전한데도 거부되는 프로그램의 수를 줄이고, ② 프로그래머가 직접 적어야 하는 타입 정보를 줄이는 것입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "유연성 ① 안전하지만 적법하지 않은(safe illegal) 프로그램의 수를 줄인다.",
     "유연성 ② 프로그래머가 제공해야 하는 타입 정보의 양을 줄인다.",
     "한쪽 끝: 명시적 타입 표기도, 정적 타입 검사도 없는 최대 유연성(동적 타입 언어).",
     "다른 쪽 끝: 정적 타입 검사를 하는 최대 제한성(엄격한 정적 타입 언어)."
    ],
    "analogy": "안전벨트와 편안함의 관계와 비슷합니다. 벨트를 꽉 조이면(엄격한 정적 검사) 사고에는 강하지만 움직이기 불편하고, 풀면 편하지만 위험합니다. 좋은 설계는 \"잘 맞는 벨트\", 즉 안전은 지키면서 불편은 줄이는 방법을 찾습니다.",
    "examples": [
     {
      "title": "같은 함수를 두 방식으로",
      "code": "# Python: 타입 표기 없이 int에도 str에도 동작 (유연)\ndef add(a, b):\n    return a + b\nprint(add(1, 2), add(\"a\", \"b\"))",
      "lang": "Python",
      "out": "3 ab",
      "note": "대신 add(1, \"b\") 같은 실수는 실행해야 발견됩니다.",
      "error": false
     },
     {
      "title": "",
      "code": "// Java: 타입을 적어야 하고, 실수는 컴파일 시점에 발견 (안전)\nstatic int add(int a, int b) { return a + b; }\nadd(1, \"b\");   // 컴파일 오류",
      "lang": "Java",
      "out": "error: incompatible types: String cannot be converted to int",
      "note": "그 사이의 절충안이 85쪽의 타입 추론입니다. 타입을 적지 않아도 컴파일러가 추론해 정적으로 검사합니다.",
      "error": true
     }
    ],
    "steps": [
     "유연성을 높이려면 안전한 프로그램을 덜 거부하고(①) 타입 표기를 덜 요구해야(②) 한다.",
     "그러나 정적 검사를 없애면 유연해지는 대신 오류를 실행 전에 잡지 못한다.",
     "엄격한 정적 검사는 안전하지만 표기 부담과 \"안전한데 거부\"가 늘어난다.",
     "언어 설계는 이 두 끝 사이 어딘가를 선택하고, 타입 추론 같은 기법으로 두 장점을 함께 얻으려 한다."
    ],
    "trap": [
     "여기서 security는 해킹 방어만이 아니라 \"타입 오류로 인한 잘못된 동작을 막는다\"는 넓은 뜻입니다.",
     "유연성은 \"아무 코드나 허용\"이 아닙니다. 안전한 프로그램을 덜 거부하는 것이 목표입니다."
    ],
    "recap": "타입 시스템 설계 = 안전성(엄격한 정적 검사)과 유연성(거부·표기 부담 감소)의 균형.",
    "source": "PDF 9쪽"
   },
   "quizzes": [
    [
     "원문이 말하는 유연성(flexibility)을 높이는 방법은?",
     [
      "안전하지만 거부되는 프로그램 수와 필요한 타입 표기량을 줄인다",
      "타입 검사를 모두 없앤다",
      "모든 변수를 Object로 선언한다"
     ],
     "원문의 두 기준: safe illegal 프로그램 감소, 프로그래머가 제공할 타입 정보 감소.",
     [
      "원문 그대로입니다.",
      "그러면 안전성을 잃습니다.",
      "타입 정보가 사라져 검사가 약해집니다."
     ]
    ],
    [
     "\"최대 제한성\" 쪽 끝에 해당하는 것은?",
     [
      "정적 타입 검사",
      "명시적 타입 표기가 없는 동적 검사",
      "타입 변환을 모두 자동으로 허용"
     ],
     "원문: Maximum restrictiveness, static type checking.",
     [
      "맞습니다.",
      "유연성 쪽 끝입니다.",
      "제한을 푸는 방향입니다."
     ]
    ],
    [
     "타입 표기를 줄이면서도 정적 검사를 유지하는 기법(85쪽)은?",
     [
      "타입 추론(Hindley-Milner)",
      "암묵적 축소 변환",
      "태그 없는 공용체"
     ],
     "타입 추론은 표기 없이도 컴파일러가 타입을 결정해 검사합니다.",
     [
      "절충안입니다.",
      "안전성을 낮춥니다.",
      "안전하지 않은 타입 구성입니다."
     ]
    ]
   ],
   "image": "pages/pl09-09.jpg",
   "text": "Design Trade-off: Security vs. flexibility\n● A type system tries to maximize both flexibility and security\n○\n\nflexibility:\n■ reduce the number of safe illegal programs &\n■ reduce the amount of type information the programmer must\nsupply.\n\n● Flexibility, no explicit typing or static type checking\n\nvs.\n● Maximum restrictiveness, static type checking\n\n9",
   "quiz": [
    "원문이 말하는 유연성(flexibility)을 높이는 방법은?",
    [
     "안전하지만 거부되는 프로그램 수와 필요한 타입 표기량을 줄인다",
     "타입 검사를 모두 없앤다",
     "모든 변수를 Object로 선언한다"
    ],
    "원문의 두 기준: safe illegal 프로그램 감소, 프로그래머가 제공할 타입 정보 감소."
   ],
   "quizReasons": [
    "원문 그대로입니다.",
    "그러면 안전성을 잃습니다.",
    "타입 정보가 사라져 검사가 약해집니다."
   ]
  },
  {
   "page": 10,
   "title": "구분 · 단순 타입",
   "explanation": "\"Simple Types\" 단원의 구분 쪽입니다. 다음 쪽부터 정수·문자 같은 기본 타입과 열거형·부분 범위 타입을 다룹니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-10.jpg",
   "text": "Simple Types\n\n10"
  },
  {
   "page": 11,
   "title": "단순 데이터 타입",
   "explanation": "단순 타입은 산술적 구조나 순서 구조 외에 더 이상 쪼갤 내부 구조가 없는 타입입니다. 정수, 실수(double), 문자, 불리언이 대표적이며, 대개 하드웨어가 직접 지원합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "단순 타입: 고유한 산술 구조·순서 구조 말고는 다른 구조가 없다(더 분해할 수 없는 최소 단위).",
     "예: integer, double, character, boolean.",
     "하드웨어가 직접 지원하는 경우가 많다(정수는 ALU, 실수는 FPU) → 크기·범위가 기계에 따라 달라질 수 있다.",
     "int, double, short, long, unsigned int 같은 기본 제공 타입 대부분이 단순 타입이다. 예외: Java의 String은 단순 타입이 아니다(클래스).",
     "미리 정의되지 않은 단순 타입도 있다: 열거형(enumerated), 부분 범위(subrange)."
    ],
    "analogy": "레고로 비유하면 단순 타입은 \"더 이상 분해할 수 없는 기본 블록 하나\"이고, 배열·구조체는 블록을 조립한 작품입니다. 기본 블록의 크기는 공장(하드웨어)마다 조금씩 다를 수 있습니다.",
    "examples": [
     {
      "title": "기계에 따라 달라지는 크기",
      "code": "#include <stdio.h>\nint main(void) {\n    printf(\"%zu %zu\\n\", sizeof(int), sizeof(long));\n}",
      "lang": "C",
      "out": "4 8",
      "note": "64비트 Linux에서 흔한 결과입니다. 64비트 Windows에서는 long이 4바이트라 \"4 4\"가 나옵니다. C 표준은 최소 범위만 정하므로 이런 기계 의존성이 생깁니다.",
      "error": false,
      "outLabel": "실행 결과 예 · 64비트 Linux"
     },
     {
      "title": "Java String은 단순 타입이 아님",
      "code": "String s = \"hello\";\nSystem.out.println(s.length());   // 객체의 메서드 호출",
      "lang": "Java",
      "out": "5",
      "note": "String 값은 내부에 문자 배열과 메서드를 가진 객체입니다. 그래서 원문은 예외로 듭니다.",
      "error": false
     }
    ],
    "steps": [
     "어떤 타입의 값이 다른 값들로 조립되어 있는지 확인한다. 정수 7은 더 쪼갤 구성 요소가 없다 → 단순 타입.",
     "문자열 \"hello\"는 문자 5개로 이루어진다 → Java에서는 객체(클래스 타입).",
     "단순 타입 연산은 CPU의 ALU·FPU 명령으로 바로 수행되는 경우가 많다.",
     "그래서 C처럼 하드웨어에 맞추는 언어에서는 int·long 크기가 기계마다 다를 수 있다."
    ],
    "trap": [
     "\"기본 제공(predefined)\"과 \"단순(simple)\"은 같은 뜻이 아닙니다. String은 기본 제공이지만 단순하지 않고, 열거형은 단순하지만 프로그래머가 정의합니다.",
     "Java는 int를 항상 32비트로 고정합니다. 기계 의존성은 주로 C·C++ 이야기입니다."
    ],
    "recap": "단순 타입 = 내부 구조가 없는 기본 값(정수·실수·문자·불리언 + 열거형·부분 범위). 하드웨어 지원과 기계 의존성이 특징.",
    "source": "PDF 11쪽"
   },
   "quizzes": [
    [
     "원문이 \"기본 제공이지만 단순 타입은 아니다\"라고 든 예는?",
     [
      "Java의 String",
      "C의 unsigned int",
      "Java의 double"
     ],
     "String은 내부 구조를 가진 클래스 타입입니다.",
     [
      "원문의 예외입니다.",
      "단순 타입입니다.",
      "단순 타입입니다."
     ]
    ],
    [
     "단순 타입이 기계에 의존할 수 있는 이유는?",
     [
      "ALU·FPU 같은 하드웨어가 직접 지원하기 때문",
      "모든 언어가 크기를 64비트로 고정하기 때문",
      "컴파일러가 타입을 검사하지 않기 때문"
     ],
     "하드웨어 표현을 그대로 쓰면 크기·범위가 기계마다 달라질 수 있습니다.",
     [
      "원문의 설명입니다.",
      "그렇다면 기계 의존성이 없습니다.",
      "검사 여부와 무관합니다."
     ]
    ],
    [
     "미리 정의되지 않은(프로그래머가 정의하는) 단순 타입은?",
     [
      "열거형과 부분 범위 타입",
      "배열과 구조체",
      "포인터와 함수"
     ],
     "원문: Some simple types are not predefined — enumerated types, subrange types.",
     [
      "맞습니다.",
      "복합(구조) 타입입니다.",
      "타입 생성자로 만드는 타입입니다."
     ]
    ]
   ],
   "image": "pages/pl09-11.jpg",
   "text": "Simple Data Types\n● Have no other structure than their inherent arithmetic or sequential\n\nstructure (내부적으로 더 이상 분해할 수 없는 최소 단위의 데이터 형태)\n○\n\ne.g., integer, double, character, and boolean.\n\n● Often directly supported in hardware.\n\nmachine dependency (e.g., ALU, FPU)\n● Most predefined types (e.g., int, double, short, long,\nunsigned int)are simple types.\n○ exceptions: e.g., String in Java ( not simple type).\n○\n\n● Some simple types are not predefined\n○\n○\n\nenumerated types\nsubrange types\n\n11",
   "quiz": [
    "원문이 \"기본 제공이지만 단순 타입은 아니다\"라고 든 예는?",
    [
     "Java의 String",
     "C의 unsigned int",
     "Java의 double"
    ],
    "String은 내부 구조를 가진 클래스 타입입니다."
   ],
   "quizReasons": [
    "원문의 예외입니다.",
    "단순 타입입니다.",
    "단순 타입입니다."
   ]
  },
  {
   "page": 12,
   "title": "열거형 (Enumerated Types)",
   "explanation": "열거형은 원소에 이름을 붙여 하나하나 나열해 정의한 \"순서 있는 집합\"입니다. C, Ada, ML 모두 문법은 다르지만 같은 개념을 표현합니다. 기본 연산은 다음 값(successor)과 이전 값(predecessor)이고, 내부 표현은 언어마다 다릅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "열거형 = 원소에 이름을 붙여 명시적으로 나열한 순서 있는 집합.",
     "C: enum Color_Type {Red, Green, Blue};  Ada: type Color_Type is (Red, Green, Blue);  ML: datatype Color_Type = Red | Green | Blue;",
     "연산: successor(다음 값), predecessor(이전 값). 순서가 있으므로 비교도 가능하다.",
     "내부 표현은 다양하다. Ada는 값의 이름 자체로 다루고(정수라고 가정하지 않음), C는 정수 0, 1, 2…(또는 프로그래머가 지정한 값)이다."
    ],
    "analogy": "열거형은 \"번호표 대신 이름표가 붙은 줄 서기\"입니다. 빨강, 초록, 파랑 순서로 서 있으면 \"초록 다음은 파랑\"(successor)처럼 물을 수 있습니다. C는 이름표 뒤에 몰래 번호(0, 1, 2)를 적어 두고, Ada는 이름표만 보여 줍니다.",
    "examples": [
     {
      "title": "세 언어의 같은 열거형",
      "code": "enum Color_Type {Red, Green, Blue};          /* C   */\ntype Color_Type is (Red, Green, Blue);       -- Ada\ndatatype Color_Type = Red | Green | Blue;    (* ML  *)",
      "lang": "C · Ada · ML",
      "out": "",
      "note": "세 줄 모두 \"Red < Green < Blue 순서의 값 3개로 이루어진 새 타입\"을 만듭니다. 주석 기호도 언어마다 다릅니다(/* */, --, (* *)).",
      "error": false
     },
     {
      "title": "C에서 열거 값의 정체",
      "code": "enum Color_Type {Red, Green, Blue};\nprintf(\"%d %d %d\\n\", Red, Green, Blue);",
      "lang": "C",
      "out": "0 1 2",
      "note": "",
      "error": false
     }
    ],
    "steps": [
     "값을 나열한다: Red, Green, Blue. 나열한 순서가 곧 값의 순서다.",
     "successor(Red) = Green, predecessor(Blue) = Green처럼 순서를 따라 이동할 수 있다.",
     "C에서는 각 이름이 정수 상수가 된다(0, 1, 2). 그래서 printf %d로 숫자가 출력된다.",
     "Ada에서는 값을 정수로 가정하지 않고 이름으로 다룬다. 출력하면 이름이 나온다(13쪽)."
    ],
    "trap": [
     "C의 열거 값은 사실상 int 상수라서 열거형이 아닌 정수와 자유롭게 섞입니다(14쪽). \"열거형이면 다 안전하다\"가 아닙니다.",
     "마지막 값의 successor, 첫 값의 predecessor는 없습니다. Ada에서는 실행 중 오류가 납니다(13쪽)."
    ],
    "recap": "열거형 = 이름을 나열한 순서 집합. 연산은 successor/predecessor. 내부 표현은 언어마다 다르다(C는 정수).",
    "source": "PDF 12쪽"
   },
   "quizzes": [
    [
     "원문이 열거형의 연산으로 든 것은?",
     [
      "successor와 predecessor",
      "곱셈과 나눗셈",
      "첨자 연산"
     ],
     "순서 있는 집합이므로 다음 값과 이전 값을 구할 수 있습니다.",
     [
      "원문 그대로입니다.",
      "열거형에는 산술 연산이 기본 제공되지 않습니다(18쪽).",
      "배열의 연산입니다."
     ]
    ],
    [
     "C에서 enum Color_Type {Red, Green, Blue};일 때 Blue의 값은?",
     [
      "2",
      "3",
      "1"
     ],
     "C 열거 상수는 0부터 1씩 증가합니다: Red 0, Green 1, Blue 2.",
     [
      "맞습니다.",
      "1부터 세면 안 됩니다.",
      "Green의 값입니다."
     ]
    ],
    [
     "원문에 따르면 Ada에서 열거형 값의 내부 표현은?",
     [
      "값의 이름 자체로 다루며 정수라고 가정하지 않는다",
      "항상 0부터 시작하는 정수",
      "문자열 포인터"
     ],
     "원문: Ada — actual names, C — integer.",
     [
      "원문 내용입니다.",
      "C의 방식입니다.",
      "원문에 없는 설명입니다."
     ]
    ]
   ],
   "image": "pages/pl09-12.jpg",
   "text": "Enumerated Types\nOrdered set, whose elements are named and listed explicitly.\n● Examples:\nenum Color_Type {Red, Green, Blue};\n\n( C )\n\ntype Color_Type is (Red, Green, Blue);\n\n( Ada )\n\ndatatype Color_Type = Red | Green | Blue;\n\n( ML )\n\n● Operations?\n○\n\nSuccessor and predecessor\n\n● Internal representation is varied.\n○\n\nAda: actual names\n\n○\n\nC: integer (0, 1, .. or defined by the programmer )\n\n12",
   "quiz": [
    "원문이 열거형의 연산으로 든 것은?",
    [
     "successor와 predecessor",
     "곱셈과 나눗셈",
     "첨자 연산"
    ],
    "순서 있는 집합이므로 다음 값과 이전 값을 구할 수 있습니다."
   ],
   "quizReasons": [
    "원문 그대로입니다.",
    "열거형에는 산술 연산이 기본 제공되지 않습니다(18쪽).",
    "배열의 연산입니다."
   ]
  },
  {
   "page": 13,
   "title": "Ada 열거형 예: Succ과 Pred",
   "explanation": "Ada에서는 Color_Type'Succ(x)로 다음 값, Color_Type'Pred(x)로 이전 값을 구합니다. 출력하면 정수가 아니라 값의 이름이 나옵니다. 마지막 값에서 Succ을 부르면 실행 중 오류가 납니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "type Color_Type is (Red, Green, Blue); 순서: Red → Green → Blue.",
     "Color_Type'Succ(x): x의 다음 값, Color_Type'Pred(x): x의 이전 값. (' 뒤에 오는 Succ·Pred를 속성(attribute)이라 한다)",
     "값의 내부 표현에 대해 아무 가정도 하지 않는다 → put(x)는 이름(GREEN)을 출력한다.",
     "마지막 값 Blue의 Succ은 존재하지 않는다 → 실행 중 오류(런타임 오류)."
    ],
    "analogy": "엘리베이터 버튼과 같습니다. 2층(Green)에서 위로(Succ) 가면 3층(Blue), 아래로(Pred) 가면 다시 2층입니다. 꼭대기 층(Blue)에서 위로 가라고 하면 \"없는 층\"이라며 멈춥니다.",
    "examples": [
     {
      "title": "왼쪽 예: 이동 후 출력",
      "code": "type Color_Type is (Red, Green, Blue);\nx : Color_Type := Green;\nx := Color_Type'Succ(x);   -- Blue\nx := Color_Type'Pred(x);   -- Green\nput(x);",
      "lang": "Ada",
      "out": "GREEN",
      "note": "Ada의 열거형 출력은 기본적으로 대문자 이름을 씁니다.",
      "error": false
     },
     {
      "title": "오른쪽 예: 마지막 값 너머로 이동",
      "code": "x : Color_Type := Green;\nx := Color_Type'Succ(x);   -- Blue\nx := Color_Type'Succ(x);   -- Blue 다음 값은 없음",
      "lang": "Ada",
      "out": "raised CONSTRAINT_ERROR (실행 중 오류)",
      "note": "원문의 \"runtime error\"입니다. 오류 메시지의 정확한 문구는 컴파일러마다 다릅니다.",
      "error": true
     }
    ],
    "steps": [
     "x는 Green에서 시작한다.",
     "Succ(Green) = Blue를 x에 넣는다.",
     "Pred(Blue) = Green을 x에 넣는다. put(x)는 이름 GREEN을 출력한다.",
     "오른쪽 예: Green → Blue까지는 정상. Succ(Blue)는 범위 밖이라 실행 중 CONSTRAINT_ERROR가 난다."
    ],
    "trap": [
     "원문 코드의 ’(둥근 따옴표)는 슬라이드 서식입니다. 실제 Ada 코드에서는 작은따옴표(')를 씁니다.",
     "Succ(Blue)가 Red로 되돌아가지 않습니다. 순환하지 않고 오류가 납니다."
    ],
    "recap": "Ada: 'Succ / 'Pred로 순서 이동, 출력은 이름, 범위 밖 이동은 실행 중 오류.",
    "source": "PDF 13쪽"
   },
   "quizzes": [
    [
     "x := Green; x := Color_Type'Succ(x); x := Color_Type'Pred(x); put(x); 의 출력은?",
     [
      "GREEN",
      "BLUE",
      "1"
     ],
     "Green → Blue → Green 순서로 바뀌고, 이름을 출력합니다.",
     [
      "맞습니다.",
      "Pred로 다시 돌아왔습니다.",
      "Ada는 정수가 아니라 이름을 출력합니다."
     ]
    ],
    [
     "x가 Blue일 때 Color_Type'Succ(x)를 실행하면?",
     [
      "실행 중 오류가 난다",
      "Red가 된다",
      "Blue 그대로다"
     ],
     "마지막 값의 다음 값은 없으므로 런타임 오류입니다.",
     [
      "원문의 runtime error입니다.",
      "순환하지 않습니다.",
      "값을 유지하지 않고 오류를 냅니다."
     ]
    ],
    [
     "원문이 Ada 열거형의 특징으로 든 것은?",
     [
      "값의 내부 표현을 가정하지 않고 이름 자체를 출력한다",
      "값이 0부터 시작하는 정수로 출력된다",
      "Succ과 Pred를 쓸 수 없다"
     ],
     "원문: No assumptions about the internal representation of values / Print the value name itself.",
     [
      "원문 그대로입니다.",
      "C의 특징입니다.",
      "바로 이 쪽의 연산입니다."
     ]
    ]
   ],
   "image": "pages/pl09-13.jpg",
   "text": "Ada Example\ntype Color_Type is (Red, Green, Blue);\nx : Color_Type := Green;\nx := Color_Type’Succ(x); -- Blue\nx := Color_Type’Pred(x); -- Green\nput(x);\n-- prints GREEN\n\nx := Color_Type’Succ(x);\nx := Color_Type’Succ(x);\n-- runtime error\n\n● No assumptions about the internal representation of values\n● Print the value name itself\n\n13",
   "quiz": [
    "x := Green; x := Color_Type'Succ(x); x := Color_Type'Pred(x); put(x); 의 출력은?",
    [
     "GREEN",
     "BLUE",
     "1"
    ],
    "Green → Blue → Green 순서로 바뀌고, 이름을 출력합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "Pred로 다시 돌아왔습니다.",
    "Ada는 정수가 아니라 이름을 출력합니다."
   ]
  },
  {
   "page": 14,
   "title": "C 열거형 예: enum은 정수다",
   "explanation": "C의 enum은 사실상 int입니다. 값을 직접 지정할 수 있고, 같은 값을 여러 상수에 줄 수도 있으며, ++와 --로 열거형에 없는 값이 되어도 막지 않습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "enum Color {Red, Green, Blue}; → Red 0, Green 1, Blue 2.",
     "enum NewColor {NewRed=3, NewGreen=2, NewBlue=2}; 처럼 값을 직접 정할 수 있고, 같은 값도 허용된다.",
     "x++, y-- 같은 정수 연산이 그대로 적용된다. 결과가 열거형의 어떤 상수와도 같지 않아도 오류가 아니다.",
     "정리: C의 enum은 정수 상수에 이름을 붙인 것에 가깝다."
    ],
    "analogy": "C의 enum은 \"이름표가 붙은 숫자 카드\"입니다. 카드 뒷면이 숫자라서 1을 더하거나 빼는 것을 아무도 막지 않습니다. 그 결과가 이름표 없는 숫자가 되어도 그대로 쓰입니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "#include <stdio.h>\nenum Color {Red, Green, Blue};                     // 0, 1, 2\nenum NewColor {NewRed=3, NewGreen=2, NewBlue=2};\n\nint main() {\n    enum Color x = Green;        // x is 1\n    enum NewColor y = NewBlue;   // y is 2\n    x++;                         // 2 -- Blue\n    y--;                         // 1 -- 열거형에 없는 값\n    printf(\"%d\\n\", x);\n    printf(\"%d\\n\", y);\n    return 0;\n}",
      "lang": "C",
      "out": "2\n1",
      "note": "",
      "error": false
     }
    ],
    "steps": [
     "x = Green → x의 정수 값은 1.",
     "y = NewBlue → NewBlue는 2로 지정되었으므로 y는 2.",
     "x++ → 2. 이 값은 Blue와 같다.",
     "y-- → 1. NewColor의 상수(3, 2, 2) 중 어느 것과도 같지 않지만 C는 허용한다.",
     "printf(\"%d\\n\", x)와 printf(\"%d\\n\", y)는 2와 1을 출력한다."
    ],
    "trap": [
     "원문 코드 printf(\"%d\\n“,x)의 “는 슬라이드 서식 때문에 바뀐 따옴표입니다. 실제 코드에서는 일반 큰따옴표(\")여야 컴파일됩니다.",
     "C++에서는 enum 변수에 ++를 바로 쓸 수 없습니다(별도 연산자를 정의해야 함). 이 예제는 C 기준입니다.",
     "값을 지정하지 않은 상수는 \"바로 앞 상수 + 1\"입니다. enum E {A, B=4, C};라면 C는 5입니다."
    ],
    "recap": "C enum = 이름 붙은 정수. 값 지정·중복 허용, 정수 연산으로 범위를 벗어나도 막지 않는다.",
    "source": "PDF 14쪽"
   },
   "quizzes": [
    [
     "원문 예제에서 x++ 후 printf(\"%d\\n\", x)의 출력은?",
     [
      "2",
      "1",
      "Blue"
     ],
     "Green(1)에서 1 증가해 2가 됩니다.",
     [
      "맞습니다.",
      "증가 전 값입니다.",
      "C는 이름이 아니라 정수를 출력합니다."
     ]
    ],
    [
     "C에서 enum E {A, B = 4, C};일 때 C의 값은?",
     [
      "5",
      "2",
      "4"
     ],
     "지정하지 않은 상수는 앞 상수의 값 + 1입니다.",
     [
      "맞습니다.",
      "순서 번호로 세면 안 됩니다.",
      "B의 값입니다."
     ]
    ],
    [
     "원문 예제에서 y-- 후 y는 1이다. 이에 대한 설명으로 옳은 것은?",
     [
      "NewColor의 어느 상수와도 같지 않지만 C는 허용한다",
      "컴파일 오류가 난다",
      "NewGreen과 같은 값이다"
     ],
     "NewColor 상수는 3, 2, 2뿐입니다. C는 범위를 검사하지 않습니다.",
     [
      "원문의 \"not even in the enum\"입니다.",
      "C enum은 정수라 허용됩니다.",
      "NewGreen은 2입니다."
     ]
    ]
   ],
   "image": "pages/pl09-14.jpg",
   "text": "C Example\n#include <stdio.h>\nenum Color {Red, Green, Blue}; // 0, 1, 2\nenum NewColor {NewRed=3, NewGreen=2, NewBlue=2};\nint main() {\nenum Color x = Green;\n// x is 1\nenum NewColor y = NewBlue; // y is 2\nx++;\n// 2 -- Blue\ny--;\n// 1 -- not even in the enum\nprintf(\"%d\\n“,x); //2\nprintf(\"%d\\n\",y); //1\nreturn 0;\n}\n\n● enum in C is simply int\n● Can customize the values\n\n14",
   "quiz": [
    "원문 예제에서 x++ 후 printf(\"%d\\n\", x)의 출력은?",
    [
     "2",
     "1",
     "Blue"
    ],
    "Green(1)에서 1 증가해 2가 됩니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "증가 전 값입니다.",
    "C는 이름이 아니라 정수를 출력합니다."
   ]
  },
  {
   "page": 15,
   "title": "Java enum: 단순 타입이 아니라 클래스",
   "explanation": "Java의 enum은 정수 상수가 아니라 클래스입니다. 각 상수(MERCURY, EARTH)는 그 클래스의 객체이며, 필드·생성자·메서드를 가질 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "public enum Planet { MERCURY(2.4397e6), EARTH(6.37814e6); … } → 상수마다 생성자 인자를 넘겨 객체를 만든다.",
     "각 상수는 public static final 객체다(원문 주석: static and final object).",
     "private final double radius; 처럼 필드를 두고, 생성자 Planet(double radius)로 값을 저장한다.",
     "Planet.values()는 선언 순서대로 모든 상수를 담은 배열을 돌려준다."
    ],
    "analogy": "C의 enum이 \"이름표 붙은 숫자 카드\"라면 Java의 enum은 \"명함 있는 사람\"입니다. 각 상수가 자기 정보(반지름)와 할 수 있는 일(메서드)을 가진 독립된 객체입니다.",
    "examples": [
     {
      "title": "원문 예제 정리",
      "code": "public enum Planet {\n    MERCURY(2.4397e6), EARTH(6.37814e6);\n\n    private final double radius;\n    Planet(double radius) { this.radius = radius; }\n    private double radius() { return radius; }\n\n    public static void main(String[] args) {\n        for (Planet p : Planet.values())\n            System.out.printf(\"The radius of %s is %f\\n\", p, p.radius());\n    }\n}",
      "lang": "Java",
      "out": "The radius of MERCURY is 2439700.000000\nThe radius of EARTH is 6378140.000000",
      "note": "%s에는 상수 이름(toString)이, %f에는 소수점 아래 6자리 실수가 들어갑니다.",
      "error": false
     }
    ],
    "steps": [
     "클래스가 로드될 때 MERCURY = new Planet(2.4397e6), EARTH = new Planet(6.37814e6)처럼 객체 두 개가 만들어진다.",
     "각 객체의 radius 필드에 생성자 인자가 저장된다.",
     "Planet.values()가 {MERCURY, EARTH}를 선언 순서대로 돌려준다.",
     "반복마다 printf가 이름과 반지름을 출력한다: 2.4397e6 = 2439700.0, 6.37814e6 = 6378140.0."
    ],
    "trap": [
     "원문은 printf 문자열이 두 줄로 나뉘고 “ ” 따옴표가 쓰여 있습니다. 슬라이드 서식이며, 실제 코드는 한 줄 문자열과 일반 큰따옴표여야 합니다.",
     "Java enum 생성자는 외부에서 new로 호출할 수 없습니다. 상수 선언에서만 쓰입니다.",
     "radius()가 private이어도 같은 enum 안의 main에서 호출하므로 문제없습니다."
    ],
    "recap": "Java enum = 클래스. 상수는 그 클래스의 static final 객체이며 필드·메서드를 가질 수 있다.",
    "source": "PDF 15쪽"
   },
   "quizzes": [
    [
     "Java enum 상수 MERCURY의 정체는?",
     [
      "Planet 클래스의 객체(static final)",
      "int 상수 0",
      "문자열 \"MERCURY\""
     ],
     "원문 제목: not simple type, but class.",
     [
      "맞습니다.",
      "C의 방식입니다.",
      "출력할 때 이름이 문자열로 나올 뿐입니다."
     ]
    ],
    [
     "예제에서 두 번째로 출력되는 줄은?",
     [
      "The radius of EARTH is 6378140.000000",
      "The radius of EARTH is 6.37814e6",
      "The radius of 1 is 6378140.000000"
     ],
     "values()는 선언 순서를 따르고, %f는 소수 6자리로 출력합니다.",
     [
      "맞습니다.",
      "%f는 지수 표기를 쓰지 않습니다.",
      "%s에는 상수 이름이 들어갑니다."
     ]
    ],
    [
     "Planet.values()가 돌려주는 것은?",
     [
      "선언 순서대로 모든 상수를 담은 배열",
      "반지름 값들의 배열",
      "상수 개수"
     ],
     "for (Planet p : Planet.values())로 모든 상수를 순회합니다.",
     [
      "맞습니다.",
      "상수(객체) 배열입니다.",
      "개수는 values().length입니다."
     ]
    ]
   ],
   "image": "pages/pl09-15.jpg",
   "text": "Java enum Example – not simple type, but class\npublic enum Planet { // static and final object\nMERCURY (2.4397e6), EARTH (6.37814e6);\nprivate final double radius; //\nPlanet(double radius) { this.radius = radius; }\nprivate double radius() { return radius; }\npublic static void main(String[] args) {\nfor (Planet p : Planet.values())\nSystem.out.printf(“The radius of\n%f\\n\", p, p.radius());\n}\n}\n\n%s is\n\nThe radius of MERCURY is 2439700.000000\n15\nThe radius of EARTH is 6378140.000000",
   "quiz": [
    "Java enum 상수 MERCURY의 정체는?",
    [
     "Planet 클래스의 객체(static final)",
     "int 상수 0",
     "문자열 \"MERCURY\""
    ],
    "원문 제목: not simple type, but class."
   ],
   "quizReasons": [
    "맞습니다.",
    "C의 방식입니다.",
    "출력할 때 이름이 문자열로 나올 뿐입니다."
   ]
  },
  {
   "page": 16,
   "title": "열거형의 장점",
   "explanation": "원문은 열거형의 장점을 네 가지로 평가합니다: 효율성, 가독성, 유지보수성, 신뢰성. 각 장점이 어떤 상황에서 드러나는지 연결해 기억하세요.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "효율성(Efficiency): 컴파일러가 작은 정수 같은 간결하고 효율적인 표현을 고를 수 있다.",
     "가독성(Readability): 색을 숫자로 적지 않아도 된다(2 대신 Blue).",
     "유지보수성(Maintainability): 새 색을 추가해도 하드코딩한 상수를 고칠 필요가 없다(17쪽).",
     "신뢰성(Reliability): 컴파일러가 연산과 값의 범위를 검사할 수 있다(18쪽)."
    ],
    "analogy": "서랍에 \"1번, 2번\" 대신 \"양말, 속옷\"이라고 적어 두는 것과 같습니다. 읽기 쉽고(가독성), 서랍을 하나 끼워 넣어도 번호를 다시 매길 필요가 없고(유지보수), 양말 칸에 책을 넣으려 하면 바로 알 수 있습니다(신뢰성).",
    "examples": [
     {
      "title": "숫자 대신 이름",
      "code": "int color = 2;                 /* 2가 무슨 색인지 주석 없이는 모름 */\nenum Color {Red, Green, Blue};\nenum Color c = Blue;           /* 의도가 바로 보임 */",
      "lang": "C",
      "out": "",
      "note": "두 코드는 기계에서 같은 정수 2를 쓸 수 있습니다(효율성). 차이는 사람이 읽고 고치기 쉬운가입니다.",
      "error": false
     }
    ],
    "steps": [
     "코드에 2라는 숫자가 있으면 그 의미를 따로 기억해야 한다.",
     "enum으로 이름을 붙이면 Blue처럼 의도가 드러난다 → 가독성.",
     "상수 목록이 바뀌어도 이름으로 쓴 코드는 그대로 둘 수 있다 → 유지보수성.",
     "언어가 열거형을 별도 타입으로 다루면(Ada) 잘못된 대입·연산을 컴파일러가 막는다 → 신뢰성."
    ],
    "trap": [
     "신뢰성 장점은 언어에 따라 다릅니다. C처럼 enum이 int와 섞이면 컴파일러 검사 효과가 작습니다(14쪽). Ada처럼 별도 타입으로 다룰 때 크게 드러납니다(18쪽)."
    ],
    "recap": "열거형 장점 4가지: 효율성(간결한 표현), 가독성(숫자 대신 이름), 유지보수성(상수 수정 불필요), 신뢰성(컴파일러 검사).",
    "source": "PDF 16쪽"
   },
   "quizzes": [
    [
     "\"새 색을 추가해도 하드코딩된 상수를 고칠 필요가 없다\"는 어떤 장점인가?",
     [
      "유지보수성",
      "효율성",
      "신뢰성"
     ],
     "원문: Maintainability — adding a new color doesn't require updating hard-coded constants.",
     [
      "맞습니다.",
      "표현 크기에 관한 장점입니다.",
      "컴파일러 검사에 관한 장점입니다."
     ]
    ],
    [
     "\"컴파일러가 연산과 값의 범위를 검사할 수 있다\"는 어떤 장점인가?",
     [
      "신뢰성",
      "가독성",
      "유지보수성"
     ],
     "원문: Reliability — compiler can check operations and ranges of value.",
     [
      "맞습니다.",
      "사람이 읽기 쉬운 것에 관한 장점입니다.",
      "변경에 관한 장점입니다."
     ]
    ],
    [
     "열거형의 효율성 장점으로 원문이 든 것은?",
     [
      "컴파일러가 작은 정수 같은 간결한 표현을 고를 수 있다",
      "열거 값마다 별도 객체를 만든다",
      "열거 값을 문자열로 저장한다"
     ],
     "원문: compiler can select and use a compact efficient representation (e.g., small integers).",
     [
      "원문 그대로입니다.",
      "오히려 메모리를 더 씁니다.",
      "간결한 표현이 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-16.jpg",
   "text": "Evaluation of Enumeration Types\n● Efficiency – e.g., compiler can select and use a compact efficient\n\nrepresentation (e.g., small integers)\n● Readability -- e.g. no need to code a color as a number\n● Maintainability – e.g., adding a new color doesn’t require updating\n\nhard-coded constants.\n● Reliability -- e.g. compiler can check operations and ranges of value.\n\n16",
   "quiz": [
    "\"새 색을 추가해도 하드코딩된 상수를 고칠 필요가 없다\"는 어떤 장점인가?",
    [
     "유지보수성",
     "효율성",
     "신뢰성"
    ],
    "원문: Maintainability — adding a new color doesn't require updating hard-coded constants."
   ],
   "quizReasons": [
    "맞습니다.",
    "표현 크기에 관한 장점입니다.",
    "컴파일러 검사에 관한 장점입니다."
   ]
  },
  {
   "page": 17,
   "title": "C 예: 열거형이 유지보수를 돕는 방식",
   "explanation": "처음 enum에 White, Green, Blue, Black이 있다가 나중에 Yellow를 추가하면 Green의 정수 값이 1에서 2로 바뀝니다. 비교를 i < Green처럼 이름으로 쓴 코드는 그대로 맞고, i < 1처럼 숫자로 쓴 코드는 고쳐야 합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "처음: enum Color {White, Green, Blue, Black}; → White 0, Green 1, Blue 2, Black 3.",
     "나중: enum Color {White, Yellow, Green, Blue, Black}; → White 0, Yellow 1, Green 2, Blue 3, Black 4.",
     "의도: \"Green보다 작으면 밝은 색\". i < Green으로 쓰면 enum이 바뀌어도 의도가 유지된다.",
     "열거형 없이 if (i < 1)로 썼다면 Yellow 추가 후 if (i < 2)로 직접 고쳐야 한다."
    ],
    "analogy": "\"우리 반 3번까지 앞줄\"이라고 정하면 전학생이 오면 번호가 밀려 규칙을 고쳐야 합니다. \"철수보다 앞에 선 사람\"이라고 정하면 전학생이 와도 규칙을 그대로 쓸 수 있습니다.",
    "examples": [
     {
      "title": "원문 예제(Yellow 추가 후)",
      "code": "enum Color {White, Yellow, Green, Blue, Black};   // Green == 2\nint main(){\n    enum Color x = Black;\n    int i = x;                 // 4\n    while (i >= White){\n        if (i < Green)         // 의도: Green보다 작으면 밝은 색\n            printf(\"this is a light color!\\n\");\n        i--;\n    }\n}",
      "lang": "C",
      "out": "this is a light color!\nthis is a light color!",
      "note": "i = 1(Yellow), 0(White)일 때 두 번 출력됩니다. Yellow 추가 전에는 i = 0일 때 한 번만 출력됩니다.",
      "error": false
     },
     {
      "title": "숫자로 하드코딩했다면",
      "code": "if (i < 1) printf(\"this is a light color!\\n\");   /* Yellow 추가 후 틀린 코드 */\nif (i < 2) printf(\"this is a light color!\\n\");   /* 직접 고쳐야 하는 코드  */",
      "lang": "C",
      "out": "",
      "note": "고치지 않으면 Yellow(1)가 밝은 색으로 처리되지 않습니다. 컴파일러는 이 의미상 오류를 알려 주지 않습니다.",
      "error": false
     }
    ],
    "steps": [
     "Yellow 추가 후 정수 값을 다시 매긴다: White 0, Yellow 1, Green 2, Blue 3, Black 4.",
     "i는 Black = 4에서 시작해 White = 0까지 1씩 줄어든다: 4, 3, 2, 1, 0.",
     "i < Green(2)이 참인 것은 i = 1, 0 → 출력 2번.",
     "같은 코드를 i < 1로 썼다면 i = 0일 때만 참 → Yellow를 놓친다."
    ],
    "trap": [
     "원문 예제의 printf에 쓰인 “ ”는 슬라이드 서식입니다. 실제 코드는 일반 큰따옴표입니다.",
     "원문은 두 enum 선언을 나란히 보여 주지만, 한 프로그램에 같은 이름의 enum을 두 번 선언할 수는 없습니다. \"수정 전/수정 후\" 두 버전으로 읽으세요."
    ],
    "recap": "이름으로 비교하면 열거형 순서가 바뀌어도 코드가 자동으로 맞는다. 숫자를 하드코딩하면 직접 고쳐야 한다.",
    "source": "PDF 17쪽"
   },
   "quizzes": [
    [
     "Yellow를 추가한 뒤 Green의 정수 값은?",
     [
      "2",
      "1",
      "3"
     ],
     "White 0, Yellow 1, Green 2입니다.",
     [
      "맞습니다.",
      "추가 전 값입니다.",
      "Blue의 값입니다."
     ]
    ],
    [
     "Yellow 추가 후 예제(i < Green)에서 \"this is a light color!\"는 몇 번 출력되는가?",
     [
      "2번",
      "1번",
      "4번"
     ],
     "i가 4, 3, 2, 1, 0 중 2보다 작은 1과 0에서 출력합니다.",
     [
      "맞습니다.",
      "Yellow 추가 전의 횟수입니다.",
      "Green 이상은 출력하지 않습니다."
     ]
    ],
    [
     "i < 1로 하드코딩한 코드를 Yellow 추가 후에도 그대로 두면?",
     [
      "Yellow가 밝은 색으로 처리되지 않는다",
      "컴파일 오류가 난다",
      "Black이 밝은 색으로 처리된다"
     ],
     "숫자 1은 enum 변경을 따라가지 않습니다. 컴파일러도 의미 오류를 알려 주지 않습니다.",
     [
      "맞습니다.",
      "문법적으로는 문제없습니다.",
      "Black은 4입니다."
     ]
    ]
   ],
   "image": "pages/pl09-17.jpg",
   "text": "C Example for Maintainability\nenum Color {White, Green, Blue, Black};\n//initial, Green => 1\nenum Color {White, Yellow, Green, Blue, Black}; // added Yellow later, Green=>2\nint main(){\nenum Color x = Black;\nint i = x;\nwhile (i >= White){\nif (i < Green) //Intention: green 보다 작으면 밝은 색\nprintf(“this is a light color!\\n”);\ni--;\n}\n..\n}\nWhat if no enumeration?\nif (i < 1) printf(“this is a light color!\\n”);\n=> Has to be changed to:\nif (i < 2) printf(“this is a light color!\\n”);\n17",
   "quiz": [
    "Yellow를 추가한 뒤 Green의 정수 값은?",
    [
     "2",
     "1",
     "3"
    ],
    "White 0, Yellow 1, Green 2입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "추가 전 값입니다.",
    "Blue의 값입니다."
   ]
  },
  {
   "page": 18,
   "title": "Ada 예: 열거형이 신뢰성을 높이는 방식",
   "explanation": "Ada는 열거형마다 별개의 타입을 만듭니다. 그래서 DAY 변수에 DIRECTION 값(WEST)이나 정수(5)를 넣거나, DAY끼리 +를 하는 것을 컴파일 시점에 거부합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "type DAY is (MON, …, SUN); 와 type DIRECTION is (NORTH, EAST, SOUTH, WEST); 는 서로 다른 타입이다.",
     "TODAY := WEST; → 오류: WEST는 DAY 값이 아니다.",
     "TODAY := 5; → 오류: 정수 5는 DAY 값이 아니다.",
     "TODAY := TODAY + START; → 오류: DAY 타입에는 + 연산이 정의되어 있지 않다.",
     "같은 타입끼리의 대입(START := TODAY;)은 합법이다."
    ],
    "analogy": "Ada의 열거형은 \"규격이 다른 플러그\"입니다. 요일 콘센트에 방향 플러그(WEST)나 숫자 플러그(5)는 아예 들어가지 않습니다. C의 enum은 모든 플러그가 같은 모양(int)이라 아무거나 꽂힙니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "type DAY is (MON, TUE, WED, THU, FRI, SAT, SUN);\ntype DIRECTION is (NORTH, EAST, SOUTH, WEST);\nGOAL  : DIRECTION;\nTODAY : DAY;\nSTART : DAY;\n\nTODAY := MON;            -- OK\nGOAL  := WEST;           -- OK\nSTART := TODAY;          -- OK: 둘 다 DAY\nTODAY := WEST;           -- Illegal: WEST는 DAY 값이 아님\nTODAY := 5;              -- Illegal: 5는 DAY 값이 아님\nTODAY := TODAY + START;  -- Illegal: DAY에는 \"+\"가 없음",
      "lang": "Ada",
      "out": "컴파일 오류 3개 (마지막 세 줄)",
      "note": "세 오류 모두 실행 전에 발견됩니다.",
      "error": true,
      "outLabel": "컴파일 결과"
     },
     {
      "title": "C라면?",
      "code": "enum day {MON, TUE, WED, THU, FRI, SAT, SUN};\nenum day today = 5;          /* 허용: enum은 정수 */\ntoday = today + MON;         /* 허용 */",
      "lang": "C",
      "out": "",
      "note": "같은 실수를 C 컴파일러는 대부분 그대로 통과시킵니다. 열거형의 신뢰성 장점은 언어가 열거형을 독립된 타입으로 다룰 때 생깁니다.",
      "error": false
     }
    ],
    "steps": [
     "각 대입문의 왼쪽 변수 타입과 오른쪽 값의 타입을 비교한다.",
     "MON → DAY, WEST → DIRECTION: 같은 타입끼리만 대입할 수 있다.",
     "정수 리터럴 5는 DAY가 아니다 → 거부.",
     "TODAY + START: DAY 타입에 정의된 연산 목록에 +가 없다 → 거부. (타입 = 값 + 연산, 4쪽)"
    ],
    "trap": [
     "원문 주석의 \"at compile time\"은 이 오류들이 실행 전에 발견된다는 뜻입니다.",
     "DAY에 +가 없다고 순서 연산까지 없는 것은 아닙니다. DAY'Succ(TODAY), 비교 연산(<)은 쓸 수 있습니다."
    ],
    "recap": "Ada 열거형은 독립된 타입: 다른 열거형·정수 대입과 정의되지 않은 연산(+)을 컴파일 시점에 거부한다.",
    "source": "PDF 18쪽"
   },
   "quizzes": [
    [
     "TODAY := WEST; 가 거부되는 이유는?",
     [
      "WEST는 DIRECTION 타입이라 DAY 변수에 넣을 수 없다",
      "WEST가 정의되지 않았다",
      "대입 연산자가 틀렸다"
     ],
     "DAY와 DIRECTION은 서로 다른 타입입니다.",
     [
      "맞습니다.",
      "DIRECTION에 정의되어 있습니다.",
      "Ada 대입은 :=가 맞습니다."
     ]
    ],
    [
     "원문 예제에서 합법인 문장은?",
     [
      "START := TODAY;",
      "TODAY := 5;",
      "TODAY := TODAY + START;"
     ],
     "둘 다 DAY 타입이므로 대입할 수 있습니다.",
     [
      "맞습니다.",
      "정수는 DAY 값이 아닙니다.",
      "DAY에는 +가 없습니다."
     ]
    ],
    [
     "TODAY := TODAY + START;가 오류인 이유를 \"타입 = 값 + 연산\" 관점에서 고르면?",
     [
      "DAY 타입의 연산 집합에 +가 없기 때문",
      "DAY의 값이 7개뿐이기 때문",
      "START가 초기화되지 않았기 때문"
     ],
     "연산이 정의되지 않은 타입에는 그 연산을 적용할 수 없습니다.",
     [
      "맞습니다.",
      "값의 개수와 무관합니다.",
      "원문의 이유가 아닙니다(START는 앞에서 대입됨)."
     ]
    ]
   ],
   "image": "pages/pl09-18.jpg",
   "text": "Ada Example for Reliability\ntype DAY is (MON, TUE, WED, THU, FRI, SAT, SUN);\ntype DIRECTION is (NORTH, EAST, SOUTH, WEST);\nGOAL : DIRECTION;\nTODAY : DAY;\nSTART : DAY;\nTODAY := MON;\nGOAL := WEST;\nSTART := TODAY;\nTODAY := WEST; -- Illegal: WEST is not a DAY value at compile time\nTODAY := 5; -- Illegal: 5 is not a DAY value\nTODAY := TODAY + START; -- Illegal: \"+\" is not defined for DAYS\n18",
   "quiz": [
    "TODAY := WEST; 가 거부되는 이유는?",
    [
     "WEST는 DIRECTION 타입이라 DAY 변수에 넣을 수 없다",
     "WEST가 정의되지 않았다",
     "대입 연산자가 틀렸다"
    ],
    "DAY와 DIRECTION은 서로 다른 타입입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "DIRECTION에 정의되어 있습니다.",
    "Ada 대입은 :=가 맞습니다."
   ]
  },
  {
   "page": 19,
   "title": "부분 범위 타입과 서수 타입",
   "explanation": "부분 범위(subrange) 타입은 단순 타입에서 최솟값과 최댓값을 정해 연속된 일부만 쓰는 타입입니다(Ada: range 0..9). 서수(ordinal) 타입은 값들이 띄엄띄엄 순서대로 놓인 타입으로, 비교 연산이 있고 다음·이전 값을 구할 수 있습니다. 실수는 서수 타입이 아닙니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "부분 범위 타입: 가장 작은 값과 가장 큰 값을 지정해 만든 단순 타입의 연속 부분집합. 예: type Digit_Type is range 0..9;",
     "서수 타입: 값의 집합에 이산적(discrete) 순서가 있는 타입.",
     "정수 타입은 모두 서수 타입이다. 항상 비교 연산이 있고, successor·predecessor 연산이 있는 경우가 많다.",
     "실수는 서수 타입이 아니다. 어떤 실수의 \"바로 다음 실수\"가 정의되지 않기 때문이다."
    ],
    "analogy": "부분 범위는 \"놀이기구 키 제한(120~190cm)\"처럼 원래 범위에서 일부만 허용하는 규칙입니다. 서수 타입은 계단처럼 한 칸씩 셀 수 있는 값, 실수는 경사로처럼 \"바로 다음 칸\"이 없는 값입니다.",
    "examples": [
     {
      "title": "범위 밖 값을 넣으면",
      "code": "type Digit_Type is range 0..9;   -- 0, 1, 2, …, 9\nD : Digit_Type := 9;\nD := D + 1;                      -- 10은 범위 밖",
      "lang": "Ada",
      "out": "raised CONSTRAINT_ERROR (실행 중 범위 검사 실패)",
      "note": "D + 1은 계산할 수 있지만, 결과 10을 Digit_Type 변수에 저장할 때 범위 검사에 걸립니다.",
      "error": true
     }
    ],
    "steps": [
     "Digit_Type의 값 집합은 {0, 1, …, 9}이다.",
     "D = 9에서 D + 1 = 10을 계산한다.",
     "10을 D에 저장하기 전에 0..9 범위인지 검사한다.",
     "범위를 벗어나므로 실행 중 CONSTRAINT_ERROR가 발생한다."
    ],
    "trap": [
     "원문 Ada 코드의 \"//0, 1, 2, …\"는 설명용 주석 표기입니다. Ada 주석은 --입니다.",
     "부분 범위의 위반은 변수에 넣을 값이 실행 중에 정해지는 경우가 많아 실행 중에 검사됩니다.",
     "\"순서가 있다\"만으로는 서수 타입이 아닙니다. 실수도 크기 비교는 되지만 이산적이지 않아서 서수가 아닙니다."
    ],
    "recap": "부분 범위 = 최소·최대로 제한한 연속 부분집합. 서수 = 이산적 순서(비교 + 다음/이전 값). 실수는 서수가 아니다.",
    "source": "PDF 19쪽"
   },
   "quizzes": [
    [
     "다음 중 서수(ordinal) 타입이 아닌 것은?",
     [
      "실수(float)",
      "정수(int)",
      "열거형"
     ],
     "실수에는 successor와 predecessor가 없습니다.",
     [
      "맞습니다.",
      "모든 정수 타입은 서수입니다.",
      "열거형은 순서 있는 이산 집합입니다."
     ]
    ],
    [
     "type Digit_Type is range 0..9;인 변수 D가 9일 때 D := D + 1;을 실행하면?",
     [
      "실행 중 범위 검사 오류",
      "D가 0으로 돌아간다",
      "D가 10이 된다"
     ],
     "결과 10은 0..9 범위 밖이므로 저장 전에 거부됩니다.",
     [
      "맞습니다.",
      "순환하지 않습니다.",
      "부분 범위를 벗어난 값은 저장할 수 없습니다."
     ]
    ],
    [
     "부분 범위(subrange) 타입을 정의하는 방법은?",
     [
      "기존 단순 타입의 가장 작은 값과 가장 큰 값을 지정한다",
      "허용할 값을 이름으로 하나씩 나열한다",
      "두 타입의 값을 쌍으로 묶는다"
     ],
     "원문: specified by giving least and greatest elements.",
     [
      "맞습니다.",
      "열거형입니다.",
      "데카르트 곱입니다."
     ]
    ]
   ],
   "image": "pages/pl09-19.jpg",
   "text": "Subrange Types and Ordinal Types\n\n• Subrange types: contiguous subsets of simple types specified by giving\n•\n\nleast and greatest elements\nExample in Ada:\n\ntype Digit_Type is range 0..9; //0, 1, 2, 3,…, 8, 9\n\n• Ordinal (서수) types: types that exhibit a discrete order on the set of\nvalues\n\n– All numeric integer types are ordinal types\n– Always have comparison operators\n– Often have successor and predecessor operations\n\n• Real numbers are not ordinal; they have no successor and predecessor\noperations\n\n19",
   "quiz": [
    "다음 중 서수(ordinal) 타입이 아닌 것은?",
    [
     "실수(float)",
     "정수(int)",
     "열거형"
    ],
    "실수에는 successor와 predecessor가 없습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "모든 정수 타입은 서수입니다.",
    "열거형은 순서 있는 이산 집합입니다."
   ]
  },
  {
   "page": 20,
   "title": "구분 · 타입 생성자",
   "explanation": "\"Type Constructors\" 단원의 구분 쪽입니다. 다음 쪽부터 기존 타입을 조합·제한해 새 타입을 만드는 방법(곱, 합, 부분집합, 함수·배열, 포인터)을 다룹니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-20.jpg",
   "text": "Type Constructors\n\n20"
  },
  {
   "page": 21,
   "title": "타입 생성자: 새 타입을 만드는 방법",
   "explanation": "타입 생성자는 이미 있는 타입으로 새 타입을 만드는 도구입니다. 원문은 이를 집합 연산에 대응시켜 정리합니다. 데카르트 곱(레코드·구조체·튜플), 합집합(공용체), 부분집합(부분 범위), 함수(배열)가 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "데카르트 곱(Cartesian product) → record, struct, tuple",
     "합집합(Union) → 태그 있는/없는 공용체(union)",
     "부분집합(Subset) → 부분 범위(subrange)",
     "함수(Functions) → 배열(그리고 함수 타입)",
     "예외 ① 집합 연산에 대응하지 않는 생성자도 있다: 포인터(메모리 구조에 더 가깝다).",
     "예외 ② 대응하는 타입 생성자가 없는 집합 연산도 있다: 교집합(intersection)."
    ],
    "analogy": "타입 생성자는 레고 조립 설명서입니다. \"블록 두 개를 나란히 붙이기\"(곱), \"둘 중 하나만 끼우기\"(합), \"빨간 블록만 쓰기\"(부분집합), \"번호 붙은 칸마다 블록 하나씩\"(배열)처럼 기본 블록으로 새 모양을 만드는 규칙입니다.",
    "examples": [
     {
      "title": "C로 본 네 가지 생성자",
      "code": "struct Point { int x; int y; };    /* 곱:      int × int            */\nunion  Num   { int i; double d; }; /* 합:      int ∪ double         */\nint    a[3];                       /* 함수:    {0,1,2} → int        */\nint   *p;                          /* 포인터:  집합 연산에 대응 안 함 */",
      "lang": "C",
      "out": "",
      "note": "부분집합은 C에 직접적인 문법이 없어 Ada 예(type Digit_Type is range 0..9;)로 봅니다(19·32쪽).",
      "error": false
     }
    ],
    "steps": [
     "새 타입이 \"여러 값을 동시에\" 담는가? → 곱(struct).",
     "\"여러 후보 중 하나만\" 담는가? → 합(union).",
     "\"기존 타입 값 중 일부만\" 허용하는가? → 부분집합(subrange).",
     "\"번호(인덱스)마다 값 하나\"를 대응시키는가? → 함수(배열).",
     "어디에도 해당하지 않으면(주소를 담는 포인터) 메모리 구조 쪽 생성자로 본다."
    ],
    "trap": [
     "원문의 \"closer\"는 \"closer to memory structure(메모리 구조에 더 가깝다)\"라는 뜻입니다.",
     "교집합은 집합 연산이지만 \"두 타입 모두에 속하는 값\"만 담는 타입을 만드는 일반적인 생성자는 대부분의 언어에 없습니다."
    ],
    "recap": "타입 생성자 = 집합 연산: 곱(레코드), 합(공용체), 부분집합(부분 범위), 함수(배열). 포인터는 예외, 교집합은 생성자 없음.",
    "source": "PDF 21쪽"
   },
   "quizzes": [
    [
     "record·struct는 어떤 집합 연산에 대응하는가?",
     [
      "데카르트 곱",
      "합집합",
      "부분집합"
     ],
     "여러 성분을 동시에 갖는 값이므로 곱입니다.",
     [
      "맞습니다.",
      "공용체에 대응합니다.",
      "부분 범위에 대응합니다."
     ]
    ],
    [
     "원문이 \"대응하는 타입 생성자가 없는 집합 연산\"으로 든 것은?",
     [
      "교집합",
      "합집합",
      "데카르트 곱"
     ],
     "원문: Some set operators don't have corresponding type constructors (e.g., intersection).",
     [
      "맞습니다.",
      "공용체가 있습니다.",
      "레코드가 있습니다."
     ]
    ],
    [
     "집합 연산에 대응하지 않고 메모리 구조에 가까운 타입 생성자는?",
     [
      "포인터",
      "배열",
      "부분 범위"
     ],
     "포인터는 주소의 집합을 만듭니다.",
     [
      "맞습니다.",
      "함수에 대응합니다.",
      "부분집합에 대응합니다."
     ]
    ]
   ],
   "image": "pages/pl09-21.jpg",
   "text": "Type Constructors: Defining New Types\n● Type constructors as set operations:\n○\n○\n○\n○\n\nCartesian product (e.g., record, struct, tuple)\nUnion (e.g., (un)tagged union)\nSubset (e.g., subrange)\nFunctions (Arrays)\n\n● Some type constructors do not correspond to set operations (e.g.,\n\npointers, closer to memory structure)\n● Some set operators don’t have corresponding type constructors (e.g.,\n\nintersection)\n21",
   "quiz": [
    "record·struct는 어떤 집합 연산에 대응하는가?",
    [
     "데카르트 곱",
     "합집합",
     "부분집합"
    ],
    "여러 성분을 동시에 갖는 값이므로 곱입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "공용체에 대응합니다.",
    "부분 범위에 대응합니다."
   ]
  },
  {
   "page": 22,
   "title": "데카르트 곱 (Cartesian Product)",
   "explanation": "두 집합 U와 V의 데카르트 곱 U × V는 U의 원소 하나와 V의 원소 하나로 만든 순서쌍 (u, v)의 집합입니다. 기본 연산은 성분을 꺼내는 투영(projection)이고, 프로그래밍 언어에서는 레코드나 구조체로 제공됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "U × V = {(u, v) | u ∈ U 그리고 v ∈ V}. 순서쌍이므로 (u, v)와 (v, u)는 다르다.",
     "투영 연산: p1: U × V → U, p2: U × V → V. p1((u, v)) = u, p2((u, v)) = v.",
     "값의 개수: U에 m개, V에 n개 원소가 있으면 U × V에는 m × n개의 순서쌍이 있다.",
     "많은 언어가 데카르트 곱을 record나 structure로 제공한다."
    ],
    "analogy": "세트 메뉴와 같습니다. 버거 3종 중 하나와 음료 2종 중 하나를 고르면 가능한 세트는 3 × 2 = 6가지입니다. 세트에서 \"버거만 꺼내기\"가 p1, \"음료만 꺼내기\"가 p2입니다.",
    "examples": [
     {
      "title": "곱의 원소와 투영",
      "code": "U = {0, 1}            V = {'a', 'b', 'c'}\n\nU × V = {(0,'a'), (0,'b'), (0,'c'),\n         (1,'a'), (1,'b'), (1,'c')}     → 2 × 3 = 6개\n\np1((1,'c')) = 1        p2((1,'c')) = 'c'",
      "lang": "수학 표기",
      "out": "",
      "note": "",
      "error": false
     },
     {
      "title": "Python 튜플로 확인",
      "code": "pair = (1, 'c')\nprint(pair[0], pair[1])",
      "lang": "Python",
      "out": "1 c",
      "note": "pair[0]이 p1, pair[1]이 p2 역할을 합니다(위치로 성분을 고름).",
      "error": false
     }
    ],
    "steps": [
     "U에서 원소 하나를 고른다(2가지).",
     "V에서 원소 하나를 고른다(3가지).",
     "두 선택을 순서대로 묶어 쌍을 만든다 → 2 × 3 = 6개.",
     "쌍에서 첫째·둘째 성분을 꺼내는 것이 p1, p2다."
    ],
    "trap": [
     "원문 PDF의 \"U ´ V\", \"u Î U\"에서 ´는 ×, Î는 ∈가 글꼴 문제로 깨진 것입니다.",
     "곱 타입의 값은 성분을 \"모두\" 가집니다. 둘 중 하나만 갖는 것은 합(union, 28쪽)입니다."
    ],
    "recap": "U × V = 순서쌍 (u, v)의 집합. 투영 p1, p2로 성분을 꺼낸다. 언어에서는 레코드·구조체.",
    "source": "PDF 22쪽"
   },
   "quizzes": [
    [
     "p2((3, 'a'))의 값은?",
     [
      "'a'",
      "3",
      "(3, 'a')"
     ],
     "p2는 두 번째 성분을 꺼냅니다.",
     [
      "맞습니다.",
      "p1의 결과입니다.",
      "쌍 전체가 아니라 성분 하나입니다."
     ]
    ],
    [
     "U = {0, 1}, V = {a, b, c}일 때 U × V의 원소 개수는?",
     [
      "6",
      "5",
      "9"
     ],
     "2 × 3 = 6입니다.",
     [
      "맞습니다.",
      "합집합의 크기입니다.",
      "3 × 3입니다."
     ]
    ],
    [
     "많은 프로그래밍 언어에서 데카르트 곱에 해당하는 것은?",
     [
      "레코드·구조체",
      "공용체",
      "포인터"
     ],
     "원문: available as the record or structure.",
     [
      "맞습니다.",
      "합집합에 해당합니다.",
      "집합 연산에 대응하지 않습니다."
     ]
    ]
   ],
   "image": "pages/pl09-22.jpg",
   "text": "Cartesian Product (데카르트 곱)\n● Ordered pairs of elements from U and V\n\nU ´ V = {(u, v) | u Î U and v ÎV}\n● Operations: projection\n\np1: U ´ V → U; p2 : U ´ V → V\np1((u,v))=u;\n\np2((u,v))=v\n\n● Cartesian Product is available as the record or structure in many\n\nprogramming languages.\n\n22",
   "quiz": [
    "p2((3, 'a'))의 값은?",
    [
     "'a'",
     "3",
     "(3, 'a')"
    ],
    "p2는 두 번째 성분을 꺼냅니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "p1의 결과입니다.",
    "쌍 전체가 아니라 성분 하나입니다."
   ]
  },
  {
   "page": 23,
   "title": "타입의 데카르트 곱 예: C struct와 Ada record",
   "explanation": "C의 struct IntCharReal { int i; char c; double r; }은 int × char × double이라는 곱 타입입니다. Ada의 record도 같은 개념이며 integer × character × float가 됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "C struct: 필드 int i, char c, double r → int × char × double.",
     "Ada record: i: integer; c: character; r: float; end record; → integer × character × float.",
     "곱 타입의 값 하나는 세 필드 값을 모두 동시에 가진다.",
     "성분은 필드 이름으로 꺼낸다(x.i, x.c, x.r)."
    ],
    "analogy": "구조체는 칸이 정해진 도시락통입니다. 밥 칸(int), 반찬 칸(char), 국 칸(double)이 모두 한 통에 들어 있고, 칸 이름으로 원하는 것을 꺼냅니다.",
    "examples": [
     {
      "title": "값 만들고 성분 꺼내기",
      "code": "struct IntCharReal { int i; char c; double r; };\n\nstruct IntCharReal x = {1, 'a', 3.14};\nprintf(\"%d %c %.2f\\n\", x.i, x.c, x.r);",
      "lang": "C",
      "out": "1 a 3.14",
      "note": "",
      "error": false
     },
     {
      "title": "같은 타입을 Ada로",
      "code": "type IntCharReal is record\n   i : integer;\n   c : character;\n   r : float;\nend record;\n\nx : IntCharReal := (1, 'a', 3.14);",
      "lang": "Ada",
      "out": "",
      "note": "Ada는 { } 대신 record … end record와 ( ) 집합체(aggregate)로 값을 만듭니다.",
      "error": false
     }
    ],
    "steps": [
     "선언한 필드 순서대로 성분 타입을 적는다: int, char, double.",
     "곱 기호로 잇는다: int × char × double.",
     "초기화 {1, 'a', 3.14}는 이 곱의 순서쌍(정확히는 세 쌍) 하나다.",
     "x.c처럼 이름으로 성분을 고르면 투영과 같은 일을 한다."
    ],
    "trap": [
     "C의 double r에 대응하는 Ada 필드는 float입니다. 원문 표기 그대로 정리했으며, 실제 크기·정밀도는 언어와 구현에 따라 다릅니다.",
     "struct 값 하나는 필드를 \"모두\" 갖습니다. union은 \"하나만\" 유효합니다(28쪽)."
    ],
    "recap": "struct·record = 필드 타입들의 데카르트 곱. 값은 모든 필드를 동시에 가지며, 필드 이름으로 성분을 고른다.",
    "source": "PDF 23쪽"
   },
   "quizzes": [
    [
     "struct IntCharReal { int i; char c; double r; }이 나타내는 곱은?",
     [
      "int × char × double",
      "int ∪ char ∪ double",
      "double × char × int"
     ],
     "선언된 필드 순서대로 곱합니다.",
     [
      "맞습니다.",
      "합집합(공용체)입니다.",
      "순서가 다릅니다."
     ]
    ],
    [
     "struct IntCharReal x = {1, 'a', 3.14};에서 x.c의 값은?",
     [
      "'a'",
      "1",
      "3.14"
     ],
     "두 번째 필드 c에 'a'가 들어갑니다.",
     [
      "맞습니다.",
      "x.i의 값입니다.",
      "x.r의 값입니다."
     ]
    ],
    [
     "구조체 값 하나가 담는 것은?",
     [
      "모든 필드의 값을 동시에",
      "필드 중 하나의 값만",
      "필드 이름 목록만"
     ],
     "곱 타입은 성분을 모두 가집니다.",
     [
      "맞습니다.",
      "공용체의 특징입니다.",
      "값을 담습니다."
     ]
    ]
   ],
   "image": "pages/pl09-23.jpg",
   "text": "Example: Cartesian Product of Type\n● struct in C :\n\nstruct IntCharReal\n{\n\n● record in Ada\n\ntype IntCharReal is record\n\nint i;\n\ni: integer;\n\nchar c;\n\nc: character;\n\ndouble r;\n\nr: float;\n\n};\n\nend record;\n\nint ´ char ´ double\n\nint ´ character ´ float\n23",
   "quiz": [
    "struct IntCharReal { int i; char c; double r; }이 나타내는 곱은?",
    [
     "int × char × double",
     "int ∪ char ∪ double",
     "double × char × int"
    ],
    "선언된 필드 순서대로 곱합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "합집합(공용체)입니다.",
    "순서가 다릅니다."
   ]
  },
  {
   "page": 24,
   "title": "같은 타입인가? (1) 필드 순서만 다른 구조체",
   "explanation": "두 구조체가 같은 필드를 가졌지만 선언 순서가 다르면 같은 타입일까요? 데카르트 곱으로 보면 int × char × double과 char × int × double은 순서가 다른 곱이므로 다릅니다. 메모리에서도 필드 위치(오프셋)가 달라집니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "왼쪽: { int i; char c; double r; } → int × char × double.",
     "오른쪽: { char c; int i; double r; } → char × int × double.",
     "순서쌍은 순서가 중요하므로 두 곱은 다르다 → 다른 타입.",
     "메모리 배치도 다르다: 같은 필드라도 구조체 시작점에서의 거리(오프셋)가 달라진다."
    ],
    "analogy": "도시락통 칸 순서가 다르면 다른 도시락통입니다. \"왼쪽 첫 칸에 밥\"이라고 기억한 사람이 다른 통을 열면 반찬을 꺼내게 됩니다. 프로그램은 필드를 \"통 시작점에서 몇 바이트 떨어진 칸\"으로 찾기 때문입니다.",
    "examples": [
     {
      "title": "오프셋 확인",
      "code": "#include <stdio.h>\n#include <stddef.h>\nstruct A { int i; char c; double r; };\nstruct B { char c; int i; double r; };\n\nint main(void) {\n    printf(\"A: i=%zu c=%zu r=%zu\\n\", offsetof(struct A,i), offsetof(struct A,c), offsetof(struct A,r));\n    printf(\"B: i=%zu c=%zu r=%zu\\n\", offsetof(struct B,i), offsetof(struct B,c), offsetof(struct B,r));\n}",
      "lang": "C",
      "out": "A: i=0 c=4 r=8\nB: i=4 c=0 r=8",
      "note": "64비트 x86 환경의 일반적인 결과입니다. 정렬 때문에 생기는 빈 바이트(padding) 크기는 환경마다 다를 수 있습니다. 같은 이름 IntCharReal을 한 파일에서 두 번 정의할 수는 없어 A, B로 나누었습니다.",
      "error": false,
      "outLabel": "실행 결과 예 · 64비트 x86"
     }
    ],
    "steps": [
     "각 구조체를 필드 순서대로 곱으로 바꾼다.",
     "두 곱의 첫 성분을 비교한다: int vs char → 이미 다르다.",
     "따라서 데카르트 곱 관점에서 다른 타입이다.",
     "offsetof로 보면 i의 위치가 0과 4로 다르다 → 한 타입으로 저장한 데이터를 다른 타입으로 읽으면 엉뚱한 값을 읽는다."
    ],
    "trap": [
     "필드의 \"집합\"이 같아도 \"순서\"가 다르면 다른 곱입니다.",
     "두 구조체의 sizeof가 우연히 같아도(위 예는 둘 다 16바이트일 수 있음) 같은 타입이라는 뜻은 아닙니다."
    ],
    "recap": "필드 순서가 다르면 데카르트 곱이 다르다 → 다른 타입이고 메모리 배치(오프셋)도 다르다.",
    "source": "PDF 24쪽"
   },
   "quizzes": [
    [
     "필드 순서만 다른 두 구조체({int i; char c; double r;}와 {char c; int i; double r;})는?",
     [
      "서로 다른 타입이다",
      "항상 같은 타입이다",
      "sizeof가 같으면 같은 타입이다"
     ],
     "곱의 순서가 다릅니다: int × char × double ≠ char × int × double.",
     [
      "맞습니다.",
      "순서쌍은 순서가 중요합니다.",
      "크기는 타입 동등성의 기준이 아닙니다."
     ]
    ],
    [
     "필드 순서가 바뀌면 메모리에서 달라지는 것은?",
     [
      "각 필드의 오프셋(시작점에서의 거리)",
      "필드의 이름",
      "char 한 개의 크기"
     ],
     "같은 필드라도 놓이는 위치가 달라집니다.",
     [
      "맞습니다.",
      "이름은 그대로입니다.",
      "char는 항상 1바이트입니다."
     ]
    ],
    [
     "int × char × double과 char × int × double의 관계는?",
     [
      "순서가 달라 서로 다른 곱이다",
      "원소가 같으므로 같은 곱이다",
      "하나가 다른 하나의 부분집합이다"
     ],
     "데카르트 곱은 순서쌍의 집합입니다.",
     [
      "맞습니다.",
      "(1, 'a')와 ('a', 1)은 다른 쌍입니다.",
      "부분집합 관계가 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-24.jpg",
   "text": "C Example: the same type?\nstruct IntCharReal\n{\nint i;\nchar c;\ndouble r;\n};\n\nstruct IntCharReal\n{\nchar c;\nint i;\ndouble r;\n};\n\n24",
   "quiz": [
    "필드 순서만 다른 두 구조체({int i; char c; double r;}와 {char c; int i; double r;})는?",
    [
     "서로 다른 타입이다",
     "항상 같은 타입이다",
     "sizeof가 같으면 같은 타입이다"
    ],
    "곱의 순서가 다릅니다: int × char × double ≠ char × int × double."
   ],
   "quizReasons": [
    "맞습니다.",
    "순서쌍은 순서가 중요합니다.",
    "크기는 타입 동등성의 기준이 아닙니다."
   ]
  },
  {
   "page": 25,
   "title": "같은 타입인가? (2) 필드 이름만 다른 구조체",
   "explanation": "이번에는 필드 타입과 순서가 똑같고 이름만 다릅니다(i, c, r vs j, ch, d). 순수한 데카르트 곱으로는 둘 다 int × char × double이라 같습니다. 하지만 대부분의 언어는 필드 이름도 타입의 일부로 보아 다른 타입으로 취급합니다(26쪽).",
   "kind": "lesson",
   "lesson": {
    "core": [
     "두 구조체 모두 int × char × double이다.",
     "순수 데카르트 곱 관점: 성분을 위치로만 구분하므로 같은 타입.",
     "대부분의 언어 관점: 필드 이름이 타입의 일부이므로 다른 타입.",
     "이유: 성분을 꺼내는 방법이 다르다. 한쪽은 x.i, 다른 쪽은 y.j로 접근해야 한다."
    ],
    "analogy": "내용물과 칸 순서가 같은 도시락통이라도 한 통에는 칸 이름표가 \"밥/반찬/국\", 다른 통에는 \"주식/부식/수프\"라고 붙어 있다면, \"밥 칸 열어 줘\"라는 요청은 한쪽에서만 통합니다.",
    "examples": [
     {
      "title": "이름이 다르면 접근 방법이 다르다",
      "code": "struct R1 { int i; char c;  double r; };\nstruct R2 { int j; char ch; double d; };\n\nstruct R2 y = {1, 'a', 3.14};\nprintf(\"%d\\n\", y.i);      /* R2에는 i가 없음 */",
      "lang": "C",
      "out": "error: 'struct R2' has no member named 'i' ",
      "note": "같은 곱이라도 이름이 다르면 같은 식(y.i)을 쓸 수 없습니다. 이것이 대부분의 언어가 두 타입을 구분하는 이유입니다.",
      "error": true
     }
    ],
    "steps": [
     "필드 타입을 순서대로 나열해 곱을 비교한다: 둘 다 int × char × double.",
     "\"위치로만 구분\"하는 순수 곱이라면 같다고 판단한다.",
     "필드 이름까지 비교한다: i/c/r vs j/ch/d → 다르다.",
     "이름이 타입의 일부인 언어에서는 다른 타입이다."
    ],
    "trap": [
     "24쪽(순서가 다름)과 25쪽(이름이 다름)은 비교 기준이 다릅니다. 순서 차이는 곱 자체가 다르고, 이름 차이는 \"이름을 타입에 포함하느냐\"에 따라 판단이 갈립니다.",
     "C에서는 struct 태그(R1, R2)도 다르므로 어차피 다른 타입입니다. 이 쪽의 질문은 \"구조만 비교한다면?\"이라는 사고 실험입니다(57~59쪽에서 이어짐)."
    ],
    "recap": "필드 이름만 다른 구조체: 순수 곱으로는 같지만, 이름을 타입의 일부로 보는 대부분의 언어에서는 다르다.",
    "source": "PDF 25쪽"
   },
   "quizzes": [
    [
     "필드 이름만 다른 두 구조체를 \"순수 데카르트 곱\"으로 본다면?",
     [
      "같은 타입이다",
      "다른 타입이다",
      "비교할 수 없다"
     ],
     "곱은 위치로만 성분을 구분하므로 int × char × double로 같습니다.",
     [
      "맞습니다.",
      "이름을 고려할 때의 판단입니다.",
      "곱끼리 비교할 수 있습니다."
     ]
    ],
    [
     "대부분의 언어가 필드 이름만 다른 두 구조체를 다른 타입으로 보는 이유는?",
     [
      "필드 이름이 타입의 일부이고 접근 방법(x.i vs y.j)이 다르기 때문",
      "메모리 크기가 다르기 때문",
      "필드 순서가 다르기 때문"
     ],
     "원문 26쪽: Most languages consider component names to be part of the type.",
     [
      "맞습니다.",
      "타입·순서가 같아 크기도 같습니다.",
      "순서는 같습니다."
     ]
    ],
    [
     "struct R2 { int j; char ch; double d; } y;에서 y.i를 쓰면?",
     [
      "컴파일 오류",
      "y.j의 값을 읽는다",
      "0을 읽는다"
     ],
     "R2에는 i라는 멤버가 없습니다.",
     [
      "맞습니다.",
      "위치로 대신 찾지 않습니다.",
      "없는 멤버는 접근할 수 없습니다."
     ]
    ]
   ],
   "image": "pages/pl09-25.jpg",
   "text": "C Example: the same type?\nstruct IntCharReal\n{\nint i;\nchar c;\ndouble r;\n}\n\nstruct IntCharReal\n{\nint j;\nchar ch;\ndouble d;\n}\n\n25",
   "quiz": [
    "필드 이름만 다른 두 구조체를 \"순수 데카르트 곱\"으로 본다면?",
    [
     "같은 타입이다",
     "다른 타입이다",
     "비교할 수 없다"
    ],
    "곱은 위치로만 성분을 구분하므로 int × char × double로 같습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "이름을 고려할 때의 판단입니다.",
    "곱끼리 비교할 수 있습니다."
   ]
  },
  {
   "page": 26,
   "title": "레코드는 정확히 데카르트 곱이 아니다",
   "explanation": "데카르트 곱에서는 성분을 \"위치\"로 가리키지만, 레코드·구조체에서는 \"이름\"으로 가리킵니다. 대부분의 언어는 성분 이름을 레코드 타입의 일부로 봅니다. 그래서 25쪽의 두 타입은 같은 곱을 나타내더라도 다른 타입이 될 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "데카르트 곱: 성분을 위치로 가리킨다(첫째, 둘째, 셋째).",
     "레코드·구조체: 성분에 이름이 있다.",
     "대부분의 언어는 성분 이름을 레코드 타입 정의의 일부로 본다.",
     "성분 선택자(x.i)는 \"이름에 의한 투영\"이다.",
     "그래서 같은 곱을 나타내는 두 타입도 이름이 다르면 다른 타입으로 볼 수 있다."
    ],
    "analogy": "데카르트 곱은 \"번호로 부르는 사물함\"(1번, 2번, 3번), 레코드는 \"이름표가 붙은 사물함\"(i, c, r)입니다. 번호 사물함은 순서만 같으면 같지만, 이름표 사물함은 이름표도 같아야 같습니다.",
    "examples": [
     {
      "title": "위치로 고르기 vs 이름으로 고르기",
      "code": "# 위치로 고르기: 튜플(순수 곱에 가까움)\nt = (1, 'a', 3.14)\nprint(t[0])\n\n# 이름으로 고르기: 레코드에 해당\nfrom dataclasses import dataclass\n@dataclass\nclass IntCharReal:\n    i: int\n    c: str\n    r: float\nx = IntCharReal(1, 'a', 3.14)\nprint(x.i)",
      "lang": "Python",
      "out": "1\n1",
      "note": "두 방식 모두 첫 성분 1을 꺼내지만, 튜플은 위치(0)로, 레코드는 이름(i)으로 고릅니다. (보충 예제)",
      "error": false
     }
    ],
    "steps": [
     "곱의 성분은 p1, p2, p3처럼 위치로 꺼낸다.",
     "레코드는 x.i처럼 이름으로 꺼낸다 → x.i는 이름 i에 의한 투영이다.",
     "이름이 타입의 일부라면, 이름이 다른 두 레코드는 꺼내는 방법이 달라 다른 타입이다.",
     "그래서 25쪽의 두 구조체는 같은 곱이지만 다른 타입으로 볼 수 있다."
    ],
    "trap": [
     "\"레코드 = 데카르트 곱\"이라고만 외우면 25쪽 질문에서 틀리기 쉽습니다. 레코드는 \"이름이 붙은 곱\"입니다."
    ],
    "recap": "레코드 = 이름 붙은 데카르트 곱. 성분 선택자는 이름에 의한 투영이고, 이름은 보통 타입의 일부다.",
    "source": "PDF 26쪽"
   },
   "quizzes": [
    [
     "데카르트 곱에서 성분을 가리키는 방법은?",
     [
      "위치",
      "이름",
      "메모리 주소"
     ],
     "원문: Cartesian product — they are referred to by position.",
     [
      "맞습니다.",
      "레코드의 방법입니다.",
      "타입 이론의 정의가 아닙니다."
     ]
    ],
    [
     "x.i 같은 성분 선택자는 어떤 연산에 해당하는가?",
     [
      "이름에 의한 투영",
      "합집합",
      "역참조"
     ],
     "원문: Component selector — projection by component names.",
     [
      "맞습니다.",
      "공용체 개념입니다.",
      "포인터 연산입니다."
     ]
    ],
    [
     "원문에 따르면 대부분의 언어는 레코드의 성분 이름을 어떻게 보는가?",
     [
      "레코드 타입의 일부로 본다",
      "타입과 무관한 주석으로 본다",
      "컴파일 후 지워지므로 무시한다"
     ],
     "원문: Most languages consider component names to be part of the type.",
     [
      "맞습니다.",
      "타입 비교에 영향을 줍니다.",
      "타입 검사에서 사용합니다."
     ]
    ]
   ],
   "image": "pages/pl09-26.jpg",
   "text": "Record/structure are not exactly Cartesian products\n\n• Cartesian product vs. a record structure:\n\n– Cartesian product: they are referred to by position\n– Record/struct structure: components have names\n\n● Most languages consider component names to be part of the type\n\ndefined by a record structure\n● Component selector: projection by component names\n\nstruct IntCharReal x;\n\nx.i;\n\n● Thus the previous two types can be considered different, even\n\nthough they represent the same Cartesian product.\n26",
   "quiz": [
    "데카르트 곱에서 성분을 가리키는 방법은?",
    [
     "위치",
     "이름",
     "메모리 주소"
    ],
    "원문: Cartesian product — they are referred to by position."
   ],
   "quizReasons": [
    "맞습니다.",
    "레코드의 방법입니다.",
    "타입 이론의 정의가 아닙니다."
   ]
  },
  {
   "page": 27,
   "title": "ML 튜플: 순수한 데카르트 곱",
   "explanation": "ML의 튜플은 성분에 이름이 없고 위치로만 구분하므로 데카르트 곱과 거의 같습니다. type IntCharReal = int * char * real;로 타입에 별칭을 붙일 수 있고, #3으로 세 번째 성분을 꺼냅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "ML 튜플은 레코드보다 순수한 형태로, 데카르트 곱과 본질적으로 같다.",
     "type IntCharReal = int * char * real; — *가 곱 기호 ×에 해당한다. 성분에는 이름이 없다(원문 주석 \"No name\").",
     "(2, #\"a\", 3.14)는 int * char * real 타입의 값이다. #\"a\"는 ML의 문자 리터럴이다.",
     "#3(2, #\"a\", 3.14) ⇒ 3.14: 세 번째 위치의 값을 꺼낸다(투영 p3)."
    ],
    "analogy": "튜플은 이름표 없는 일렬 사물함입니다. \"세 번째 칸 열어 줘\"(#3)라고 위치로만 부릅니다.",
    "examples": [
     {
      "title": "SML 대화형 실행",
      "code": "type IntCharReal = int * char * real;\nval t = (2, #\"a\", 3.14);\n#1 t;\n#3 t;",
      "lang": "Standard ML",
      "out": "val t = (2,#\"a\",3.14) : int * char * real\nval it = 2 : int\nval it = 3.14 : real",
      "note": "SML/NJ 같은 대화형 환경에서 각 식의 값과 타입이 함께 출력됩니다(type 선언의 응답은 생략, 출력 형식은 구현마다 조금 다를 수 있음). t의 타입 int * char * real은 IntCharReal과 같은 타입입니다.",
      "error": false
     }
    ],
    "steps": [
     "튜플 (2, #\"a\", 3.14)의 성분 타입을 순서대로 읽는다: int, char, real.",
     "타입은 int * char * real이다.",
     "#1은 첫 번째 성분 2를, #3은 세 번째 성분 3.14를 돌려준다.",
     "이름이 아니라 위치로 꺼내므로 순수 데카르트 곱의 투영과 같다."
    ],
    "trap": [
     "ML에서 #\"a\"는 문자, \"a\"는 문자열입니다. #3의 #은 \"선택\" 연산이므로 둘을 구분하세요.",
     "type 선언은 새 타입이 아니라 별칭입니다. int * char * real과 IntCharReal은 같은 타입입니다."
    ],
    "recap": "ML 튜플 = 이름 없는 순수 데카르트 곱. #n으로 n번째 성분을 꺼낸다.",
    "source": "PDF 27쪽"
   },
   "quizzes": [
    [
     "#3(2, #\"a\", 3.14)의 값은?",
     [
      "3.14",
      "#\"a\"",
      "2"
     ],
     "세 번째 위치의 성분입니다.",
     [
      "맞습니다.",
      "두 번째 성분입니다.",
      "첫 번째 성분입니다."
     ]
    ],
    [
     "(2, #\"a\", 3.14)의 ML 타입은?",
     [
      "int * char * real",
      "int * string * real",
      "int list"
     ],
     "#\"a\"는 char, 3.14는 real입니다.",
     [
      "맞습니다.",
      "#\"a\"는 문자열이 아니라 문자입니다.",
      "리스트가 아니라 튜플입니다."
     ]
    ],
    [
     "ML 튜플이 \"순수한\" 데카르트 곱이라고 불리는 이유는?",
     [
      "성분에 이름이 없고 위치로만 구분하기 때문",
      "모든 성분 타입이 같아야 하기 때문",
      "포인터로 구현되기 때문"
     ],
     "레코드와 달리 이름이 타입에 들어가지 않습니다.",
     [
      "맞습니다.",
      "성분 타입은 달라도 됩니다.",
      "구현 방식과 무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-27.jpg",
   "text": "ML: Pure Cartesian Product\nTuple: a purer form of record structure in ML that is essentially identical to\nthe Cartesian product\n#1\n\n#2\n\n#3\n\ntype IntCharReal = int * char * real;//No name for type\n● (2, #\"a\", 3.14)\n● #3(2, #\"a\", 3.14) => 3.14\n○\n\nget the value of #3 position\n\n27",
   "quiz": [
    "#3(2, #\"a\", 3.14)의 값은?",
    [
     "3.14",
     "#\"a\"",
     "2"
    ],
    "세 번째 위치의 성분입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "두 번째 성분입니다.",
    "첫 번째 성분입니다."
   ]
  },
  {
   "page": 28,
   "title": "합집합 타입: 공용체 (Union)",
   "explanation": "합집합 U ∪ V는 U나 V에 속하는 값의 집합입니다. 공용체(union)는 서로 다른 타입의 데이터를 같은 메모리 영역에 겹쳐 저장해, 한 번에 한 종류의 값만 유효합니다. 동시에 필요하지 않은 데이터가 있을 때 메모리를 아낍니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "U ∪ V = {x | x ∈ U 또는 x ∈ V}.",
     "다른 타입의 데이터를 겹치는 영역에 저장 → 메모리 절약. 한 시점에는 한 타입의 값만 유효하다.",
     "판별 공용체(discriminated union): 태그(판별자)를 붙여 현재 어떤 타입의 값인지 구분한다.",
     "비판별 공용체(undiscriminated union): 태그가 없다.",
     "비판별 공용체가 있는 언어의 타입 시스템은 안전하지 않다."
    ],
    "analogy": "공용체는 \"한 칸짜리 사물함을 여러 사람이 번갈아 쓰는 것\"입니다. 칸은 하나라 공간이 절약되지만, 지금 누구의 물건이 들어 있는지 메모(태그)가 없으면 남의 물건을 꺼낼 수 있습니다.",
    "examples": [
     {
      "title": "struct와 union의 크기 비교",
      "code": "struct S { int i; double r; };   /* i와 r을 모두 저장 */\nunion  U { int i; double r; };   /* i와 r이 같은 자리를 공유 */\nprintf(\"%zu %zu\\n\", sizeof(struct S), sizeof(union U));",
      "lang": "C",
      "out": "16 8",
      "note": "union의 크기는 가장 큰 멤버(double 8바이트)에 맞춰집니다. struct는 두 멤버와 정렬용 빈 공간을 모두 포함합니다(64비트 x86 예).",
      "error": false,
      "outLabel": "실행 결과 예 · 64비트 x86"
     }
    ],
    "steps": [
     "union U의 멤버 i(4바이트)와 r(8바이트)는 같은 시작 주소를 쓴다.",
     "크기는 가장 큰 멤버에 맞춘 8바이트다.",
     "x.i에 쓰면 r이 차지하던 바이트 일부가 덮어써진다 → 동시에 둘 다 유효할 수 없다.",
     "어떤 멤버가 유효한지 알려 주는 태그가 없다면 잘못 읽어도 언어가 막지 못한다 → 안전하지 않다."
    ],
    "trap": [
     "곱(struct)은 \"모두\", 합(union)은 \"하나만\"입니다. 이 차이가 시험에서 가장 자주 비교됩니다.",
     "\"판별(discriminated)\"은 차별이 아니라 \"구별한다\"는 뜻입니다. 태그 = 판별자 = discriminator."
    ],
    "recap": "공용체 = 합집합 타입. 같은 메모리를 공유해 한 번에 하나만 유효. 태그 있으면 판별, 없으면 비판별(안전하지 않음).",
    "source": "PDF 28쪽"
   },
   "quizzes": [
    [
     "union { int i; double r; }의 크기는 일반적으로 무엇에 맞춰지는가?",
     [
      "가장 큰 멤버의 크기",
      "모든 멤버 크기의 합",
      "가장 작은 멤버의 크기"
     ],
     "멤버들이 같은 영역을 공유하므로 가장 큰 멤버가 들어갈 공간이 필요합니다.",
     [
      "맞습니다.",
      "구조체에 해당합니다.",
      "큰 멤버가 들어가지 못합니다."
     ]
    ],
    [
     "판별 공용체(discriminated union)의 특징은?",
     [
      "태그로 현재 값의 타입을 구분한다",
      "모든 멤버를 동시에 저장한다",
      "태그 없이 겹쳐 저장한다"
     ],
     "원문: a tag or discriminator is added to distinguish the type.",
     [
      "맞습니다.",
      "구조체입니다.",
      "비판별 공용체입니다."
     ]
    ],
    [
     "원문에 따르면 비판별 공용체가 있는 언어의 타입 시스템은?",
     [
      "안전하지 않다",
      "항상 안전하다",
      "동적 타입이다"
     ],
     "원문: A language with undiscriminated unions has an unsafe type system.",
     [
      "맞습니다.",
      "태그가 없어 잘못된 해석을 막지 못합니다.",
      "검사 시점과는 별개입니다."
     ]
    ]
   ],
   "image": "pages/pl09-28.jpg",
   "text": "Union\n● U È V = { x | xÎU or xÎV}\n○\n\nData items with different types are stored in overlapping region,\nreduce memory allocation.\n\n○\n\nOnly one type of value is valid at one time.\n\n● Unions are useful in reducing memory allocation requirements for\n\nstructures when different data items are not needed simultaneously\n● Two varieties:\n○\n\nDiscriminated unions: a tag or discriminator is added to the\nunion to distinguish the type of its elements\n\n○\n\nUndiscriminated unions: lack the tags\n\n● A language with undiscriminated unions has an unsafe type system\n28",
   "quiz": [
    "union { int i; double r; }의 크기는 일반적으로 무엇에 맞춰지는가?",
    [
     "가장 큰 멤버의 크기",
     "모든 멤버 크기의 합",
     "가장 작은 멤버의 크기"
    ],
    "멤버들이 같은 영역을 공유하므로 가장 큰 멤버가 들어갈 공간이 필요합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "구조체에 해당합니다.",
    "큰 멤버가 들어가지 못합니다."
   ]
  },
  {
   "page": 29,
   "title": "C의 비판별 공용체",
   "explanation": "C와 C++의 union은 태그가 없는 비판별 공용체입니다. x.i에 1을 넣고 x.r을 읽으면 정수 비트를 실수로 해석한 엉뚱한 값이 나옵니다. 어느 멤버가 유효한지 언어가 알려 주지 않으므로 안전하지 않습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "union IntOrReal { int i; double r; }; — i와 r은 같은 메모리를 공유한다.",
     "x.i = 1; 다음 printf(\"%f\\n\", x.r);는 예상하지 못한 값을 출력한다.",
     "태그(판별자)가 없어 현재 어떤 타입의 값인지 구분할 수 없다.",
     "잘못 읽어도 컴파일러와 실행 환경이 막지 않는다 → unsafe."
    ],
    "analogy": "같은 종이에 연필로 숫자를 적어 두었는데, 다른 사람이 그 종이를 \"악보\"라고 생각하고 읽는 상황입니다. 종이(메모리)는 같지만 해석 방법이 달라 엉뚱한 내용이 됩니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "union IntOrReal {\n    int i;\n    double r;\n};\nunion IntOrReal x;\nx.i = 1;\nprintf(\"%f\\n\", x.r);   /* r로 저장한 적이 없음 */",
      "lang": "C",
      "out": "0.000000",
      "note": "흔히 0.000000이나 의미 없는 수가 나옵니다. 정수 1의 비트(그리고 초기화되지 않은 나머지 바이트)를 double로 해석한 결과라 값은 환경에 따라 달라집니다.",
      "error": false,
      "outLabel": "실행 결과 예 · 값은 환경마다 다름"
     }
    ],
    "steps": [
     "x.i = 1은 union의 앞 4바이트에 정수 1의 비트를 쓴다.",
     "x.r은 같은 8바이트를 double 형식(부호·지수·가수)으로 읽는다.",
     "정수 1의 비트 모양은 double로 보면 0에 아주 가까운 수(또는 쓰레기 값)다.",
     "언어는 \"마지막에 i에 썼다\"는 정보를 저장하지 않으므로 이 실수를 검사하지 못한다."
    ],
    "trap": [
     "\"오류가 난다\"가 아니라 \"엉뚱한 값을 조용히 읽는다\"가 핵심입니다. 그래서 더 위험합니다.",
     "C++에서는 마지막에 쓰지 않은 멤버를 읽는 것이 정의되지 않은 동작입니다. C에서도 결과를 믿을 수 없습니다."
    ],
    "recap": "C union = 태그 없는 공용체. 다른 멤버로 읽어도 막지 않아 예측할 수 없는 값이 나온다 → 안전하지 않다.",
    "source": "PDF 29쪽"
   },
   "quizzes": [
    [
     "x.i = 1; 다음 printf(\"%f\\n\", x.r);의 결과로 가장 알맞은 설명은?",
     [
      "예측할 수 없는 값이 출력된다",
      "1.000000이 출력된다",
      "컴파일 오류가 난다"
     ],
     "정수 비트를 실수로 해석하므로 의미 없는 값이 나옵니다.",
     [
      "맞습니다.",
      "자동 변환이 일어나지 않습니다.",
      "C는 이 코드를 허용합니다."
     ]
    ],
    [
     "C union에 없어서 안전하지 않은 것은?",
     [
      "현재 유효한 멤버를 나타내는 태그",
      "멤버 이름",
      "메모리 공간"
     ],
     "원문: No tag/discriminator to distinguish which type the element is.",
     [
      "맞습니다.",
      "이름은 있습니다.",
      "공간은 공유됩니다."
     ]
    ],
    [
     "union IntOrReal에서 i와 r의 관계는?",
     [
      "같은 메모리 영역을 공유한다",
      "서로 다른 메모리에 따로 저장된다",
      "r이 i를 가리키는 포인터다"
     ],
     "공용체의 멤버는 겹쳐 저장됩니다.",
     [
      "맞습니다.",
      "구조체의 방식입니다.",
      "포인터 관계가 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-29.jpg",
   "text": "Undiscriminated Union in C\n● In C and C++, the union type constructor creates undiscriminated unions\nunion IntOrReal {\nint i;\ndouble r;\n};\nunion IntOrReal x;\nx.i = 1;\nprintf(“%f\\n”, x.r); // print an unexpected value\n● No tag/discriminator to distinguish which type the element is\n● Can be unsafe\n29",
   "quiz": [
    "x.i = 1; 다음 printf(\"%f\\n\", x.r);의 결과로 가장 알맞은 설명은?",
    [
     "예측할 수 없는 값이 출력된다",
     "1.000000이 출력된다",
     "컴파일 오류가 난다"
    ],
    "정수 비트를 실수로 해석하므로 의미 없는 값이 나옵니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "자동 변환이 일어나지 않습니다.",
    "C는 이 코드를 허용합니다."
   ]
  },
  {
   "page": 30,
   "title": "C++에서 태그를 직접 붙인 공용체: 여전히 안전하지 않다",
   "explanation": "struct 안에 bool isInt 태그와 이름 없는 union을 함께 두면 판별 공용체를 흉내 낼 수 있습니다. 하지만 태그와 실제 저장 값을 맞추는 일을 프로그래머가 해야 하므로, 실수하면 그대로 잘못된 값을 읽습니다. 원문의 답: 여전히 unsafe.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "struct IntOrReal { bool isInt; union { int i; double r; }; };",
     "사용 규칙: 정수를 넣으면 isInt = true, 실수를 넣으면 isInt = false로 함께 바꾼다.",
     "읽을 때는 if (x.isInt) x.i else x.r로 태그를 확인한다.",
     "하지만 언어가 이 규칙을 강제하지 않는다 → 태그와 값이 어긋날 수 있다 → 여전히 안전하지 않다."
    ],
    "analogy": "사물함 문에 \"지금 철수 물건\"이라는 포스트잇을 붙이는 방법입니다. 포스트잇이 있어 나아졌지만, 영희가 물건을 넣고 포스트잇을 안 바꾸면 여전히 틀린 물건을 꺼내게 됩니다.",
    "examples": [
     {
      "title": "규칙대로 쓴 경우",
      "code": "IntOrReal x;\nx.isInt = true;\nx.i = 1;\nif (x.isInt) printf(\"%d\\n\", x.i);\nelse         printf(\"%f\\n\", x.r);",
      "lang": "C++",
      "out": "1",
      "note": "",
      "error": false
     },
     {
      "title": "태그를 잊은 경우",
      "code": "x.isInt = true;     // 태그는 정수라고 함\nx.r = 2.5;          // 실제로는 실수를 저장\nif (x.isInt) printf(\"%d\\n\", x.i);   // 실수 비트를 정수로 해석",
      "lang": "C++",
      "out": "0",
      "note": "흔히 0이나 의미 없는 정수가 나옵니다(환경마다 다름). 컴파일러는 경고하지 않습니다.",
      "error": true,
      "outLabel": "실행 결과 예 · 잘못된 값"
     }
    ],
    "steps": [
     "정상 흐름: 값을 쓸 때 태그를 같이 바꾼다 → 읽을 때 태그로 올바른 멤버를 고른다.",
     "실수 흐름: x.r에 2.5를 넣었지만 isInt는 true로 남아 있다.",
     "읽는 코드는 태그만 믿고 x.i를 읽는다 → 2.5의 비트 일부를 정수로 해석한다.",
     "태그와 값의 일치를 검사하는 주체가 언어가 아니라 프로그래머이므로 안전하지 않다."
    ],
    "trap": [
     "\"태그가 있으면 판별 공용체 = 안전\"이 아닙니다. 태그를 언어가 관리·검사해야 안전합니다(31쪽 Ada).",
     "이름 없는 union 멤버(anonymous union)는 C++과 C11 이후의 C에서 쓸 수 있습니다."
    ],
    "recap": "태그를 수동으로 관리하는 공용체는 프로그래머 실수를 막지 못해 여전히 안전하지 않다.",
    "source": "PDF 30쪽"
   },
   "quizzes": [
    [
     "원문은 bool 태그를 붙인 C++ struct + union을 어떻게 평가하는가?",
     [
      "여전히 안전하지 않다",
      "완전히 안전하다",
      "컴파일되지 않는다"
     ],
     "원문: Still unsafe! Since it is up to the programmer.",
     [
      "맞습니다.",
      "태그 관리를 언어가 강제하지 않습니다.",
      "정상적으로 컴파일됩니다."
     ]
    ],
    [
     "이 방식이 안전하지 않은 근본 이유는?",
     [
      "태그와 실제 저장 값의 일치를 프로그래머가 관리해야 하기 때문",
      "bool 타입이 1바이트이기 때문",
      "union이 struct 안에 들어갈 수 없기 때문"
     ],
     "언어가 일치 여부를 검사하지 않습니다.",
     [
      "맞습니다.",
      "크기와 무관합니다.",
      "들어갈 수 있습니다."
     ]
    ],
    [
     "다음 중 태그와 값이 어긋나는 코드는?",
     [
      "x.isInt = true; x.r = 2.5;",
      "x.isInt = false; x.r = 2.5;",
      "x.isInt = true; x.i = 1;"
     ],
     "태그는 정수인데 실수를 저장했습니다.",
     [
      "맞습니다.",
      "일치합니다.",
      "일치합니다."
     ]
    ]
   ],
   "image": "pages/pl09-30.jpg",
   "text": "Create Discriminated Union in C++\nstruct IntOrReal {\nbool isInt;\nunion {\nint i;\ndouble r;\n};\n};\n\n• Safe now or not?\n• Still unsafe! Since it is upto\nthe programmer\n\nIntOrReal x;\nx.isInt = true;\nx.i = 1;\n...\nif (x.isInt) printf(“%d\\n”, x.i);\nelse printf(“%f\\n”, x.r);\n30",
   "quiz": [
    "원문은 bool 태그를 붙인 C++ struct + union을 어떻게 평가하는가?",
    [
     "여전히 안전하지 않다",
     "완전히 안전하다",
     "컴파일되지 않는다"
    ],
    "원문: Still unsafe! Since it is up to the programmer."
   ],
   "quizReasons": [
    "맞습니다.",
    "태그 관리를 언어가 강제하지 않습니다.",
    "정상적으로 컴파일됩니다."
   ]
  },
  {
   "page": 31,
   "title": "Ada의 판별 공용체: 변형 레코드",
   "explanation": "Ada는 판별자(discriminant)가 붙은 변형 레코드(variant record)로 판별 공용체를 제공합니다. 판별자 값에 따라 어떤 필드를 쓸 수 있는지 정해지고, 맞지 않는 필드에 접근하면 실행 중 오류가 납니다. 프로그래머가 일관성 없는 데이터를 만들 수 없어 안전합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "type IntOrReal (which: Disc) is record case which is when IsInt => i: integer; when IsReal => r: float; end case; end record;",
     "판별자 which가 IsInt이면 i만, IsReal이면 r만 존재한다.",
     "x: IntOrReal := (IsReal, 2.3); — 판별자와 값을 함께 지정해야 한다.",
     "put(x.i);는 x.which = IsReal이므로 실행 중 오류(판별자 검사 실패)가 난다.",
     "원문 평가: Safe! 일관성 없는 데이터를 만들 수 없다."
    ],
    "analogy": "Ada의 변형 레코드는 \"자동 잠금 사물함\"입니다. 문에 \"실수 칸\"이라고 표시되면 정수 칸 열쇠로는 열리지 않습니다. 표시를 바꾸려면 내용물까지 통째로 바꿔야 해서 표시와 내용이 어긋날 수 없습니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "type Disc is (IsInt, IsReal);\ntype IntOrReal (which: Disc) is\nrecord\n   case which is\n      when IsInt  => i: integer;\n      when IsReal => r: float;\n   end case;\nend record;\n...\nx: IntOrReal := (IsReal, 2.3);\nput(x.r);    -- OK\nput(x.i);    -- x.which = IsReal → 오류",
      "lang": "Ada",
      "out": " 2.30000E+00\nraised CONSTRAINT_ERROR : discriminant check failed",
      "note": "첫 줄은 put(x.r)의 출력(형식은 구현마다 다를 수 있음), 둘째 줄은 put(x.i)에서 생긴 실행 중 오류입니다.",
      "error": true,
      "outLabel": "실행 결과 예"
     }
    ],
    "steps": [
     "x를 만들 때 판별자 IsReal과 값 2.3을 함께 지정한다 → 태그와 값이 처음부터 일치.",
     "x.r 접근: 판별자가 IsReal이므로 허용된다.",
     "x.i 접근: 실행 중 \"x.which = IsInt인가?\"를 검사한다 → 아니므로 CONSTRAINT_ERROR.",
     "판별자만 따로 바꾸는 대입은 허용되지 않는다(레코드 전체를 새 값으로 바꿔야 함) → 태그와 값이 어긋날 수 없다."
    ],
    "trap": [
     "Ada에서도 오류는 \"실행 중\"에 납니다. 안전하다는 것은 컴파일 시점에 모두 잡는다는 뜻이 아니라, 잘못된 해석이 조용히 일어나지 않는다는 뜻입니다.",
     "30쪽 C++ 방식과의 차이: 태그 관리와 검사를 언어가 한다."
    ],
    "recap": "Ada 변형 레코드 = 언어가 관리하는 판별 공용체. 판별자와 맞지 않는 필드 접근은 실행 중 검사로 막는다 → 안전.",
    "source": "PDF 31쪽"
   },
   "quizzes": [
    [
     "x: IntOrReal := (IsReal, 2.3); 다음 put(x.i);를 실행하면?",
     [
      "실행 중 오류가 난다",
      "2를 출력한다",
      "쓰레기 값을 출력한다"
     ],
     "판별자 검사에서 IsReal ≠ IsInt가 발견됩니다.",
     [
      "원문의 ERROR at execution time입니다.",
      "자동 변환하지 않습니다.",
      "Ada는 잘못된 해석을 허용하지 않습니다."
     ]
    ],
    [
     "Ada 변형 레코드에서 사용할 수 있는 필드를 결정하는 것은?",
     [
      "판별자(which)의 값",
      "마지막에 대입한 필드",
      "레코드의 메모리 크기"
     ],
     "판별자가 활성 변형을 정합니다.",
     [
      "맞습니다.",
      "C 공용체의 관례입니다.",
      "크기와 무관합니다."
     ]
    ],
    [
     "원문이 Ada 방식을 \"Safe!\"라고 한 이유는?",
     [
      "프로그래머가 일관성 없는 데이터를 만들 수 없기 때문",
      "모든 오류를 컴파일 시점에 잡기 때문",
      "공용체를 쓰지 않기 때문"
     ],
     "원문: programmers won't be able to create inconsistent data.",
     [
      "맞습니다.",
      "이 오류는 실행 중에 잡힙니다.",
      "변형 레코드는 공용체의 한 형태입니다."
     ]
    ]
   ],
   "image": "pages/pl09-31.jpg",
   "text": "Discriminated Union in Ada\n● Variant record (with tag or discriminator)\ntype Disc is (IsInt, IsReal);\nSafe!: programmers\ntype IntOrReal (which: Disc) is\nwon’t be able to create\nrecord\ninconsistent data\ncase which is\nwhen IsInt => i: integer;\nwhen IsReal => r: float;\nend case;\nend record;\n...\nx: IntOrReal := (IsReal, 2.3);\nput (x.i); -- generates ERROR at execution time,\n-- x.which = IsReal at this point\n31",
   "quiz": [
    "x: IntOrReal := (IsReal, 2.3); 다음 put(x.i);를 실행하면?",
    [
     "실행 중 오류가 난다",
     "2를 출력한다",
     "쓰레기 값을 출력한다"
    ],
    "판별자 검사에서 IsReal ≠ IsInt가 발견됩니다."
   ],
   "quizReasons": [
    "원문의 ERROR at execution time입니다.",
    "자동 변환하지 않습니다.",
    "Ada는 잘못된 해석을 허용하지 않습니다."
   ]
  },
  {
   "page": 32,
   "title": "부분집합 타입: Ada의 type vs subtype",
   "explanation": "부분집합 타입은 기존 타입 V에서 어떤 조건을 만족하는 값만 모은 타입입니다. Ada에서는 하한·상한(범위)으로 지정합니다. 이때 type으로 만들면 완전히 새로운 타입(Integer와 섞어 계산 불가), subtype으로 만들면 Integer의 부분집합(Integer와 섞어 계산 가능)이 됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "부분집합: U = {v | v가 조건을 만족하고 v ∈ V}.",
     "Ada subtype 메커니즘: 범위(하한·상한)를 지정해 부분집합을 만든다.",
     "type Digit_Type is range 0..9; → 완전히 새로운 타입. Integer와 함께 연산할 수 없다.",
     "subtype IntDigit_Type is integer range 0..9; → Integer의 서브타입. Integer와 함께 연산할 수 있다.",
     "두 경우 모두 0..9 밖의 값을 넣으면 범위 검사 오류가 난다."
    ],
    "analogy": "type은 \"새 화폐를 발행\"하는 것, subtype은 \"원화 중 1만 원 이하 지폐만 받는 가게\"입니다. 새 화폐는 원화와 바로 더할 수 없지만, 1만 원 이하 지폐는 여전히 원화라서 다른 원화와 더할 수 있습니다.",
    "examples": [
     {
      "title": "섞어서 계산해 보기",
      "code": "type    Digit_Type    is range 0..9;          -- 새 타입\nsubtype IntDigit_Type is Integer range 0..9;  -- Integer의 부분집합\n\nI : Integer       := 3;\nD : Digit_Type    := 5;\nS : IntDigit_Type := 5;\n\nI := I + S;   -- OK: S는 Integer의 서브타입\nI := I + D;   -- 컴파일 오류: Integer와 Digit_Type은 다른 타입",
      "lang": "Ada",
      "out": "error: invalid operand types for operator \"+\"   (I + D 줄)",
      "note": "오류 문구는 컴파일러마다 다릅니다. 핵심은 I + S는 통과하고 I + D는 타입 불일치로 거부된다는 점입니다.",
      "error": true,
      "outLabel": "컴파일 결과 예"
     }
    ],
    "steps": [
     "I + S: S의 타입 IntDigit_Type은 Integer의 서브타입 → Integer 연산 +를 그대로 쓴다 → 통과.",
     "I + D: D의 타입 Digit_Type은 Integer와 별개 타입 → Integer + Digit_Type 연산이 없다 → 거부.",
     "D와 섞으려면 명시적 변환이 필요하다: I := I + Integer(D);",
     "S := 12;처럼 범위 밖 값은 서브타입 제약을 어겨 Constraint_Error가 난다(컴파일러가 미리 경고하기도 함)."
    ],
    "trap": [
     "type ... is range와 subtype ... is Integer range는 범위가 같아도 의미가 다릅니다. \"새 타입인가, 기존 타입의 일부인가\"를 구분하세요.",
     "원문 그림의 \"completely new type / Integer와 연산 불가\"는 type 쪽, \"subtype / Integer와 연산 가능\"은 subtype 쪽 설명입니다."
    ],
    "recap": "Ada: type = 새 타입(기존 타입과 섞기 불가), subtype = 기존 타입의 부분집합(연산 공유).",
    "source": "PDF 32쪽"
   },
   "quizzes": [
    [
     "subtype IntDigit_Type is Integer range 0..9;인 S와 Integer I에 대해 I + S는?",
     [
      "허용된다",
      "컴파일 오류",
      "실행 중 항상 오류"
     ],
     "서브타입은 부모 타입 Integer의 연산을 그대로 씁니다.",
     [
      "맞습니다.",
      "새 타입이 아니라 서브타입입니다.",
      "범위 안의 값이면 정상입니다."
     ]
    ],
    [
     "type Digit_Type is range 0..9;인 D와 Integer I에 대해 I + D는?",
     [
      "컴파일 오류",
      "허용된다",
      "D가 자동으로 Integer로 바뀐다"
     ],
     "Digit_Type은 Integer와 별개의 새 타입입니다.",
     [
      "맞습니다.",
      "타입이 다릅니다.",
      "Ada는 이런 암묵 변환을 하지 않습니다."
     ]
    ],
    [
     "subtype IntDigit_Type 변수에 12를 대입하면?",
     [
      "범위 제약 위반(Constraint_Error)",
      "12가 그대로 저장된다",
      "9로 잘려 저장된다"
     ],
     "서브타입도 범위 0..9를 지켜야 합니다.",
     [
      "맞습니다.",
      "범위를 검사합니다.",
      "잘라내지 않습니다."
     ]
    ]
   ],
   "image": "pages/pl09-32.jpg",
   "text": "Subset\n● U = { v | v satisfies certain conditions and v ∈ V}\n● Ada subtype mechanism: by specifying subrange (lower and upper\n\nbound)\n● Example 1\n○\n\ntype Digit_Type is range 0..9;\n\ncompletely new type\nInteger와 연산 불가\n\nvs.\n○\n\nsubtype IntDigit_Type is integer range 0..9;\nsubtype\nInteger와 연산 가능\n32",
   "quiz": [
    "subtype IntDigit_Type is Integer range 0..9;인 S와 Integer I에 대해 I + S는?",
    [
     "허용된다",
     "컴파일 오류",
     "실행 중 항상 오류"
    ],
    "서브타입은 부모 타입 Integer의 연산을 그대로 씁니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "새 타입이 아니라 서브타입입니다.",
    "범위 안의 값이면 정상입니다."
   ]
  },
  {
   "page": 33,
   "title": "Ada subtype 예 2: 판별자 제약",
   "explanation": "부분집합은 범위뿐 아니라 판별자로도 만들 수 있습니다. subtype IRInt is IntOrReal(IsInt);는 정수 변형만, IRReal은 실수 변형만 허용하는 서브타입입니다. 서브타입은 부모 타입의 연산을 물려받습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "subtype IRInt is IntOrReal(IsInt); → which가 IsInt인 값만 허용.",
     "subtype IRReal is IntOrReal(IsReal); → which가 IsReal인 값만 허용.",
     "x: IRReal := 2.3; → 컴파일 오류. 2.3은 float이지 IntOrReal 레코드 값이 아니다.",
     "x: IRReal := (IsReal, 2.3); → OK. 판별자와 값을 갖춘 레코드 값이다.",
     "부분집합 타입은 부모 타입의 연산을 상속한다."
    ],
    "analogy": "IntOrReal이 \"정수 칸 또는 실수 칸이 있는 상자\" 종류 전체라면, IRReal은 \"실수 칸 상자만\" 받는 선반입니다. 선반에 상자 없이 실수(2.3)만 올려놓을 수는 없고, 실수 칸 상자 (IsReal, 2.3)를 올려야 합니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "type Disc is (IsInt, IsReal);\ntype IntOrReal (which: Disc) is record\n   case which is\n      when IsInt  => i: integer;\n      when IsReal => r: float;\n   end case;\nend record;\n\nsubtype IRInt  is IntOrReal(IsInt);\nsubtype IRReal is IntOrReal(IsReal);\n\nx: IRReal := 2.3;            -- compile error\nx: IRReal := (IsReal, 2.3);  -- OK",
      "lang": "Ada",
      "out": "2.3 줄: 컴파일 오류 (타입 불일치: 레코드 값이 필요함)",
      "note": "",
      "error": true,
      "outLabel": "컴파일 결과"
     },
     {
      "title": "제약을 어기면",
      "code": "y: IRInt := (IsReal, 2.3);   -- IRInt는 IsInt만 허용",
      "lang": "Ada",
      "out": "raised CONSTRAINT_ERROR : discriminant check failed",
      "note": "타입은 같은 IntOrReal이라 컴파일은 될 수 있지만, 판별자 제약(IsInt)을 실행 중 검사해 거부합니다. 컴파일러가 미리 경고를 내기도 합니다. (보충 예제)",
      "error": true,
      "outLabel": "실행 결과 예"
     }
    ],
    "steps": [
     "IRReal의 값은 IntOrReal 값 중 which = IsReal인 것들의 부분집합이다.",
     "2.3은 float 하나라 IntOrReal 레코드가 아니다 → 타입부터 맞지 않아 컴파일 오류.",
     "(IsReal, 2.3)은 판별자 IsReal과 r = 2.3을 가진 레코드 → IRReal 제약을 만족 → OK.",
     "IRReal 변수에도 IntOrReal에 정의된 연산(대입, 비교, 필드 접근 등)을 그대로 쓸 수 있다."
    ],
    "trap": [
     "x: IRReal := 2.3이 거부되는 이유는 \"판별자 제약 위반\"이 아니라 \"레코드가 아닌 값\"이기 때문입니다.",
     "원문은 같은 이름 x를 두 번 선언하지만, 두 줄을 따로 비교하는 예시로 읽으세요(한 영역에서 같은 이름을 두 번 선언할 수는 없음)."
    ],
    "recap": "판별자로 제한한 서브타입(IRInt, IRReal)도 부분집합 타입이며 부모 연산을 상속한다.",
    "source": "PDF 33쪽"
   },
   "quizzes": [
    [
     "x: IRReal := 2.3;이 컴파일 오류인 이유는?",
     [
      "2.3은 IntOrReal 레코드 값이 아니기 때문",
      "2.3이 0..9 범위를 벗어나기 때문",
      "IRReal이 정수만 허용하기 때문"
     ],
     "서브타입 IRReal도 레코드 타입입니다. 판별자와 값을 갖춘 레코드가 필요합니다.",
     [
      "맞습니다.",
      "범위 제약과 무관합니다.",
      "IRReal은 실수 변형입니다."
     ]
    ],
    [
     "subtype IRInt is IntOrReal(IsInt);가 허용하는 값은?",
     [
      "판별자가 IsInt인 IntOrReal 값만",
      "판별자가 IsReal인 값만",
      "모든 IntOrReal 값"
     ],
     "판별자 제약으로 정수 변형만 남긴 부분집합입니다.",
     [
      "맞습니다.",
      "IRReal입니다.",
      "제약이 없는 부모 타입입니다."
     ]
    ],
    [
     "원문에 따르면 부분집합(서브)타입의 연산은?",
     [
      "부모 타입에서 상속한다",
      "모두 새로 정의해야 한다",
      "연산이 없다"
     ],
     "원문: subset types inherit operations from their parent types.",
     [
      "맞습니다.",
      "상속됩니다.",
      "부모의 연산을 씁니다."
     ]
    ]
   ],
   "image": "pages/pl09-33.jpg",
   "text": "subtype in Ada\n● Example 2\ntype Disc is (IsInt, IsReal);\ntype IntOrReal (which: Disc) is record\ncase which is\nwhen IsInt => i: integer;\nwhen IsReal => r: float;\nend case;\nend record;\nsubtype IRInt is IntOrReal(IsInt);\nsubtype IRReal is IntOrReal(IsReal);\n\nsubset types inherit operations\nfrom their parent types.\n\nx: IRReal := 2.3; -- compile error\nx: IRReal := (IsReal, 2.3); -- OK\n33",
   "quiz": [
    "x: IRReal := 2.3;이 컴파일 오류인 이유는?",
    [
     "2.3은 IntOrReal 레코드 값이 아니기 때문",
     "2.3이 0..9 범위를 벗어나기 때문",
     "IRReal이 정수만 허용하기 때문"
    ],
    "서브타입 IRReal도 레코드 타입입니다. 판별자와 값을 갖춘 레코드가 필요합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "범위 제약과 무관합니다.",
    "IRReal은 실수 변형입니다."
   ]
  },
  {
   "page": 34,
   "title": "부분집합 타입과 상속",
   "explanation": "부분집합 타입은 부모 타입의 연산을 물려받습니다. 대부분의 언어는 어떤 연산을 물려받고 어떤 것을 빼는지 프로그래머가 고르게 하지 않습니다. 객체 지향 언어의 상속도 서브타입 메커니즘으로 볼 수 있으며, 물려받을 연산을 훨씬 세밀하게 제어할 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "부분집합 타입은 부모 타입의 연산을 상속한다.",
     "대부분의 언어에서는 어떤 연산을 상속할지 프로그래머가 지정할 수 없다(전부 상속).",
     "객체 지향 언어의 상속도 서브타입 메커니즘으로 볼 수 있다.",
     "객체 지향 상속은 연산을 재정의(override)하거나 추가하는 등 훨씬 많은 제어를 허용한다."
    ],
    "analogy": "Ada 서브타입은 \"부모 가게 메뉴를 그대로 가져오는 분점\"입니다. 객체 지향 상속은 \"메뉴를 가져오되 일부는 우리 방식으로 바꾸고 신메뉴도 추가하는 프랜차이즈\"입니다.",
    "examples": [
     {
      "title": "상속으로 연산을 물려받고 바꾸기",
      "code": "class Shape {\n    double area() { return 0; }\n    String name() { return \"shape\"; }\n}\nclass Square extends Shape {\n    double side = 2;\n    @Override double area() { return side * side; }  // 재정의\n    double perimeter() { return 4 * side; }          // 추가\n}\n\nShape s = new Square();\nSystem.out.println(s.name() + \" \" + s.area());",
      "lang": "Java",
      "out": "shape 4.0",
      "note": "name()은 그대로 물려받고, area()는 Square 방식으로 바뀌었습니다. Square는 Shape가 쓰이는 자리에 들어갈 수 있으므로 서브타입입니다. (보충 예제)",
      "error": false
     }
    ],
    "steps": [
     "Square extends Shape → Square는 Shape의 모든 연산(area, name)을 물려받는다.",
     "area()를 재정의해 Square에 맞는 계산으로 바꾼다.",
     "perimeter()를 새로 추가한다.",
     "Shape 변수에 Square 객체를 넣어도 Shape의 연산을 모두 쓸 수 있다 → 서브타입처럼 동작한다."
    ],
    "trap": [
     "Ada의 범위 서브타입에서는 \"덧셈은 물려받고 뺄셈은 빼기\" 같은 선택을 할 수 없습니다. 원문이 말하는 \"더 많은 제어\"는 객체 지향 상속의 재정의·추가 능력입니다."
    ],
    "recap": "부분집합 타입은 부모 연산을 통째로 상속한다. 객체 지향 상속은 같은 서브타입 개념에 재정의·추가 같은 세밀한 제어를 더한 것이다.",
    "source": "PDF 34쪽"
   },
   "quizzes": [
    [
     "대부분의 언어에서 부분집합 타입이 상속할 연산을 프로그래머가 고를 수 있는가?",
     [
      "고를 수 없다",
      "하나씩 고를 수 있다",
      "연산을 상속하지 않는다"
     ],
     "원문: Most languages do not allow the programmer to specify which operations are inherited.",
     [
      "맞습니다.",
      "대부분의 언어는 지원하지 않습니다.",
      "상속합니다."
     ]
    ],
    [
     "객체 지향 상속이 일반 부분집합 타입과 다른 점은?",
     [
      "상속할 연산을 훨씬 세밀하게 제어할 수 있다",
      "연산을 전혀 상속하지 않는다",
      "값의 범위만 제한한다"
     ],
     "원문: with a great deal more control over which operations are inherited.",
     [
      "맞습니다.",
      "상속합니다.",
      "범위 제한은 Ada subtype의 방식입니다."
     ]
    ],
    [
     "예제에서 s.name() + \" \" + s.area()의 출력은?",
     [
      "shape 4.0",
      "shape 0.0",
      "square 4.0"
     ],
     "name()은 상속, area()는 Square의 재정의가 실행됩니다.",
     [
      "맞습니다.",
      "재정의된 area()가 실행됩니다.",
      "name()은 재정의하지 않았습니다."
     ]
    ]
   ],
   "image": "pages/pl09-34.jpg",
   "text": "Subset\n\n• Subset types inherit operations from their parent types\n– Most languages do not allow the programmer to specify which\noperations are inherited and which are not\n\n• Inheritance in object-oriented languages can also be viewed as a\nsubtype mechanism\n\n– With a great deal more control over which operations are inherited\n\n34",
   "quiz": [
    "대부분의 언어에서 부분집합 타입이 상속할 연산을 프로그래머가 고를 수 있는가?",
    [
     "고를 수 없다",
     "하나씩 고를 수 있다",
     "연산을 상속하지 않는다"
    ],
    "원문: Most languages do not allow the programmer to specify which operations are inherited."
   ],
   "quizReasons": [
    "맞습니다.",
    "대부분의 언어는 지원하지 않습니다.",
    "상속합니다."
   ]
  },
  {
   "page": 35,
   "title": "배열과 함수: f: U → V",
   "explanation": "집합 U에서 집합 V로 가는 모든 함수의 집합 f: U → V는 프로그래밍 언어에서 배열 타입이나 함수 타입이 됩니다. 배열은 인덱스(U)로 원소(V)를 찾아 주는 대응이고, 함수는 매개변수(U)를 받아 반환값(V)을 계산하는 규칙입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "타입 f: U → V = U에서 V로 가는 모든 함수의 집합 → 배열 타입 또는 함수 타입.",
     "배열: U가 서수 타입(정수 인덱스 등)일 때의 함수. 인덱스로 원소를 찾는 대응(mapping)이다.",
     "함수: U를 입력, V를 출력으로 하는 대응. 반환값을 계산하는 로직이다.",
     "차이: 배열은 결과를 미리 저장해 두고 찾고, 함수는 호출할 때마다 계산한다."
    ],
    "analogy": "배열은 \"미리 적어 둔 번호표 목록\"(1번 → 철수, 2번 → 영희)이고, 함수는 \"번호를 주면 계산해서 답을 알려 주는 계산기\"입니다. 둘 다 입력 하나에 출력 하나를 대응시킨다는 점에서 같은 f: U → V입니다.",
    "examples": [
     {
      "title": "같은 대응을 배열과 함수로",
      "code": "int sq_table[4] = {0, 1, 4, 9};        /* 배열: {0,1,2,3} → int, 저장 */\nint sq(int x) { return x * x; }        /* 함수: int → int, 계산      */\n\nprintf(\"%d %d\\n\", sq_table[3], sq(3));",
      "lang": "C",
      "out": "9 9",
      "note": "두 표현 모두 3을 9에 대응시킵니다. 배열은 인덱스 범위(0..3)가 정해진 유한한 대응이고, 함수는 모든 int에 대해 규칙으로 대응합니다.",
      "error": false
     }
    ],
    "steps": [
     "배열 int sq_table[4]를 함수로 보면 U = {0, 1, 2, 3}(인덱스), V = int(원소 타입)이다.",
     "sq_table[3]은 \"함수 sq_table에 3을 넣은 결과\" = 9다.",
     "함수 sq는 U = int, V = int인 대응이며 x * x를 계산해 돌려준다.",
     "따라서 배열 타입과 함수 타입은 모두 U → V 형태의 타입으로 설명할 수 있다."
    ],
    "trap": [
     "배열의 U는 서수 타입이어야 합니다(19쪽). 실수를 인덱스로 쓰는 배열은 만들 수 없습니다.",
     "원문 표의 \"컴포넌트/요소(V)\"는 배열 원소의 타입입니다."
    ],
    "recap": "배열 = 서수 인덱스 U → 원소 V의 저장된 대응, 함수 = U → V의 계산 규칙. 둘 다 f: U → V 타입이다.",
    "source": "PDF 35쪽"
   },
   "quizzes": [
    [
     "배열 int a[3]을 함수 f: U → V로 볼 때 U와 V는?",
     [
      "U = {0, 1, 2}, V = int",
      "U = int, V = {0, 1, 2}",
      "U = 3, V = int[]"
     ],
     "U는 인덱스 집합, V는 원소 타입입니다.",
     [
      "맞습니다.",
      "방향이 반대입니다.",
      "U는 인덱스의 집합입니다."
     ]
    ],
    [
     "원문 표에서 배열이 함수와 구별되는 조건은?",
     [
      "U가 서수 타입일 때의 함수다",
      "V가 반드시 정수다",
      "U가 실수다"
     ],
     "원문: Array — U가 서수 타입(ordinal type)일 때의 함수.",
     [
      "맞습니다.",
      "원소 타입은 무엇이든 됩니다.",
      "실수는 서수가 아닙니다."
     ]
    ],
    [
     "배열과 함수의 동작 차이로 옳은 것은?",
     [
      "배열은 저장된 원소를 인덱스로 찾고, 함수는 호출할 때 결과를 계산한다",
      "배열은 계산하고 함수는 저장한다",
      "둘은 아무 관계가 없다"
     ],
     "원문 표: 배열은 인덱스로 요소를 찾는 매핑, 함수는 반환값을 계산하는 로직입니다.",
     [
      "맞습니다.",
      "반대입니다.",
      "둘 다 U → V 대응입니다."
     ]
    ]
   ],
   "image": "pages/pl09-35.jpg",
   "text": "Arrays and Functions\n\n• The set of all functions f:U→V\n• Array type or\n• Function type\n개념\n\n수학적 정의\n\n프로그래밍\n\n타입 f:U→V\n\n집합 U에서 집합 V로의 모든\n함수들의 집합\n\n배열 타입 또는 함수 타입\n\nArray\n\nU가 서수 타입(ordinal type)일\n때의 함수\n\n인덱스(U)에 의해\n컴포넌트/요소(V)를 찾는 매핑\n\nFunction\n\nU를 입력으로, V를 출력으로\n하는 매핑\n\n매개변수(U)를 받아 반환 값(V)을\n계산하는 로직\n35",
   "quiz": [
    "배열 int a[3]을 함수 f: U → V로 볼 때 U와 V는?",
    [
     "U = {0, 1, 2}, V = int",
     "U = int, V = {0, 1, 2}",
     "U = 3, V = int[]"
    ],
    "U는 인덱스 집합, V는 원소 타입입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "방향이 반대입니다.",
    "U는 인덱스의 집합입니다."
   ]
  },
  {
   "page": 36,
   "title": "C/C++ 배열 (1): 크기와 선언",
   "explanation": "C/C++의 지역 배열은 스택에 할당되고 크기는 보통 컴파일 시점에 정해집니다. 크기 없이 선언한 배열 타입은 불완전 타입(incomplete type)이라 메모리를 할당하지 않으며, 초기화 목록이 있으면 원소 수로 크기가 정해집니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "지역 배열: 스택에 할당, 크기는 정적으로(컴파일 시점에) 지정.",
     "typedef int TenIntArray[10]; → 크기 10인 int 배열 타입.",
     "typedef int IntArray[]; → 크기 없는 배열 타입(불완전 타입). 이것만으로는 메모리를 할당하지 않는다.",
     "int z[] = {1,2,3,4}; → 초기화 목록으로 크기 4가 추론된다. IntArray w = {1,2}; → 크기 2.",
     "IntArray v; → 블록 안에서는 불법. 크기를 알 수 없어 메모리를 잡을 수 없다."
    ],
    "analogy": "크기 없는 배열 타입은 \"칸 수가 비어 있는 주문서\"입니다. 주문서만으로는 상자를 만들 수 없지만, \"사과, 배\"처럼 물건 목록을 함께 주면 칸 수(2)를 알 수 있어 상자를 만들 수 있습니다.",
    "examples": [
     {
      "title": "크기 확인",
      "code": "typedef int TenIntArray[10];\ntypedef int IntArray[];\n\nTenIntArray x;\nint z[] = {1, 2, 3, 4};\nIntArray w = {1, 2};\nprintf(\"%zu %zu %zu\\n\", sizeof x, sizeof z, sizeof w);",
      "lang": "C",
      "out": "40 16 8",
      "note": "int가 4바이트인 환경 기준입니다. 원소 수는 각각 10, 4, 2입니다.",
      "error": false
     },
     {
      "title": "크기를 알 수 없는 선언",
      "code": "void f(void) {\n    IntArray v;      /* 블록 안: 크기 정보 없음 */\n}",
      "lang": "C",
      "out": "error: array size missing in 'v' ",
      "note": "GCC의 메시지 예입니다. 컴파일러는 v에 몇 바이트를 잡아야 할지 모릅니다.",
      "error": true
     }
    ],
    "steps": [
     "TenIntArray x: 크기 10이 타입에 들어 있다 → 10 × 4 = 40바이트.",
     "int z[]: 크기는 비었지만 초기화 원소 4개 → 크기 4로 완성 → 16바이트.",
     "IntArray w = {1,2}: 불완전 타입이 초기화 원소 2개로 완성 → 8바이트.",
     "IntArray v: 완성할 정보가 없다 → 블록 안에서는 오류."
    ],
    "trap": [
     "\"typedef int IntArray[];는 OK\"인 이유는 타입 이름만 만들고 메모리를 잡지 않기 때문입니다. 변수를 만들 때 크기가 필요합니다.",
     "원문의 \"illegal(block scope)\"처럼 블록 밖(파일 범위)에서는 불완전 배열 선언이 다른 규칙으로 허용될 수 있습니다. 시험에서는 블록 안 기준으로 기억하세요."
    ],
    "recap": "C 지역 배열 크기는 컴파일 시점에 정해진다. 크기 없는 배열 타입은 불완전 타입이며, 초기화 목록이 크기를 정해 줄 수 있다.",
    "source": "PDF 36쪽"
   },
   "quizzes": [
    [
     "int z[] = {1, 2, 3, 4};에서 z의 원소 수는?",
     [
      "4",
      "0",
      "컴파일 오류"
     ],
     "초기화 목록의 원소 수로 크기가 정해집니다.",
     [
      "맞습니다.",
      "크기가 추론됩니다.",
      "합법입니다."
     ]
    ],
    [
     "함수 블록 안의 IntArray v; (typedef int IntArray[];)는?",
     [
      "크기를 몰라 불법이다",
      "크기 0인 배열이 된다",
      "크기 10인 배열이 된다"
     ],
     "불완전 타입으로는 메모리를 할당할 수 없습니다.",
     [
      "맞습니다.",
      "크기 0으로 만들지 않습니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "typedef int IntArray[];만 선언했을 때 일어나는 일은?",
     [
      "불완전한 배열 타입 이름만 생기고 메모리는 할당되지 않는다",
      "크기 1인 배열이 할당된다",
      "컴파일 오류"
     ],
     "원문: incomplete type, no memory allocation.",
     [
      "맞습니다.",
      "변수가 아니라 타입 이름입니다.",
      "합법입니다."
     ]
    ]
   ],
   "image": "pages/pl09-36.jpg",
   "text": "Array in C/C++\n● Allocated on stack (for local array), size statically specified (at compile\n\ntime).\ntypedef int TenIntArray [10];\ntypedef int IntArray []; // array type w/o size: OK\n//(incomplete type, no memory allocation)\nTenIntArray x;\nint y[5];\nint z[]={1,2,3,4}; // OK. size inferred from\n// initializer:4\nIntArray w = {1,2}; // OK. size become 2\nIntArray v;\n//illegal(block scope):size unknown\n\n36",
   "quiz": [
    "int z[] = {1, 2, 3, 4};에서 z의 원소 수는?",
    [
     "4",
     "0",
     "컴파일 오류"
    ],
    "초기화 목록의 원소 수로 크기가 정해집니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "크기가 추론됩니다.",
    "합법입니다."
   ]
  },
  {
   "page": 37,
   "title": "C/C++ 배열 (2): 가변 길이 배열(VLA)",
   "explanation": "가변 길이 배열(VLA)은 실행 중에 정한 크기로 지역 배열을 선언하는 기능입니다. C89와 C++에서는 배열 크기가 상수여야 해서 불법이고, C99에서 합법이 되었으며(지역 배열만), C11부터는 구현이 선택할 수 있는 선택 기능이 되었습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "int n = …; /* 사용자 입력 */ int a[n]; → VLA.",
     "C89(1989)·C++: 불법. 배열 크기는 상수여야 한다.",
     "C99: 합법(지역 배열에만).",
     "C11(2011) 이후: 선택 기능(optional). 지원하지 않는 컴파일러도 표준을 따르는 것이다.",
     "C 표준 흐름: C89 → C99 → C11 → C17 → C23."
    ],
    "analogy": "VLA는 \"손님 수를 듣고 그 자리에서 의자를 놓는 식당\"입니다. C89 식당은 예약한 의자 수(상수)만 놓을 수 있고, C99 식당은 현장 인원에 맞춰 놓아 줍니다. C11부터는 이 서비스가 \"가게마다 선택\"이 되었습니다.",
    "examples": [
     {
      "title": "실행 중에 크기가 정해지는 배열",
      "code": "#include <stdio.h>\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);          /* 입력: 5 */\n    int a[n];                 /* VLA: 크기가 실행 중 결정 */\n    printf(\"%zu\\n\", sizeof a);\n}",
      "lang": "C99",
      "out": "20",
      "note": "입력 5일 때 5 × 4바이트 = 20. 보통 sizeof는 컴파일 시점에 계산되지만, VLA에 대한 sizeof는 실행 중에 계산됩니다.",
      "error": false,
      "outLabel": "실행 결과 · 입력 5"
     }
    ],
    "steps": [
     "scanf로 n = 5를 읽는다(실행 중).",
     "int a[n];에서 n을 평가해 원소 5개짜리 배열을 스택에 만든다.",
     "sizeof a도 실행 중의 n으로 계산해 20을 돌려준다.",
     "같은 코드를 C89 규칙이나 표준 C++로 컴파일하면 \"크기가 상수가 아님\" 오류가 난다."
    ],
    "trap": [
     "GCC 같은 컴파일러는 C++에서도 VLA를 확장 기능으로 허용하기도 합니다. 하지만 표준 C++에는 VLA가 없습니다(38쪽).",
     "C11 이후 VLA를 지원하지 않는 구현은 __STDC_NO_VLA__ 매크로를 1로 정의합니다(보충)."
    ],
    "recap": "VLA = 실행 중 크기를 정하는 지역 배열. C89·C++ 불법, C99 합법, C11+ 선택 기능.",
    "source": "PDF 37쪽"
   },
   "quizzes": [
    [
     "VLA가 처음 합법이 된 C 표준은?",
     [
      "C99",
      "C89",
      "C11"
     ],
     "원문: C99: legal (VLA, local arrays only).",
     [
      "맞습니다.",
      "C89에서는 불법입니다.",
      "C11에서는 선택 기능으로 바뀌었습니다."
     ]
    ],
    [
     "C11 이후 VLA의 지위는?",
     [
      "선택 기능(optional)",
      "필수 기능",
      "완전히 삭제됨"
     ],
     "원문: C11 and later: optional feature.",
     [
      "맞습니다.",
      "C99에서의 지위입니다.",
      "삭제되지 않았습니다."
     ]
    ],
    [
     "VLA a에 대한 sizeof a는 언제 계산되는가?",
     [
      "실행 중",
      "컴파일 시점",
      "링크 시점"
     ],
     "크기가 실행 중에 정해지므로 sizeof도 실행 중에 계산합니다.",
     [
      "맞습니다.",
      "일반 배열의 경우입니다.",
      "무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-37.jpg",
   "text": "Array in C/C++\nint n = ... //from user input\nint a[n]; // VLA\n○\n\nVLA (Variable Length Array):배열 크기를 실행 중에 정해서\n지역 배열을 선언할 수 있게 컴파일러가 처리\n■ C89/C++ : illegal (1989년), array size must be a constant\n■ C99: legal (VLA, local arrays only)\n■ C11(2011년) and later: optional feature\nC version: C89 → C99 → C11 → C17 → C23\n37",
   "quiz": [
    "VLA가 처음 합법이 된 C 표준은?",
    [
     "C99",
     "C89",
     "C11"
    ],
    "원문: C99: legal (VLA, local arrays only)."
   ],
   "quizReasons": [
    "맞습니다.",
    "C89에서는 불법입니다.",
    "C11에서는 선택 기능으로 바뀌었습니다."
   ]
  },
  {
   "page": 38,
   "title": "C/C++ 배열 (3): 함수 인자로 크기 정하기",
   "explanation": "함수 매개변수 size로 지역 배열 크기를 정하는 int a[size];는 표준 C++에서는 불법, C99에서는 합법, C11 이후에는 선택 기능입니다. 37쪽 VLA 규칙을 함수 안에 적용한 예입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "int f(int size) { int a[size]; } — size는 호출할 때마다 달라지는 값이다.",
     "C++: 불법(배열 크기는 컴파일 시점 상수여야 함).",
     "C99: 합법(VLA). C11+: 선택 기능.",
     "표준 C++에서 실행 중 크기를 정하려면 std::vector나 new[]를 쓴다(보충)."
    ],
    "analogy": "같은 레시피라도 C++ 주방은 \"그릇 크기를 미리 정해 두어야\" 하고, C99 주방은 \"주문 들어온 양에 맞춰 그릇을 고를 수\" 있습니다.",
    "examples": [
     {
      "title": "C99에서는 합법",
      "code": "int f(int size) {\n    int a[size];           /* C99: VLA */\n    return (int)(sizeof a / sizeof a[0]);\n}\n/* printf(\"%d\\n\", f(7)); */",
      "lang": "C99",
      "out": "7",
      "note": "",
      "error": false
     },
     {
      "title": "표준 C++의 대안",
      "code": "#include <vector>\nint f(int size) {\n    std::vector<int> a(size);   // 힙에 size개 원소\n    return static_cast<int>(a.size());\n}",
      "lang": "C++",
      "out": "f(7) == 7",
      "note": "std::vector는 실행 중 크기를 정할 수 있고, 나중에 크기를 바꿀 수도 있습니다. (보충 예제)",
      "error": false,
      "outLabel": "결과"
     }
    ],
    "steps": [
     "f(7)을 호출하면 size = 7이 된다.",
     "C99: int a[size]가 7칸 배열을 스택에 만든다 → sizeof a / sizeof a[0] = 7.",
     "표준 C++: 같은 줄이 \"상수가 아닌 배열 크기\"로 거부된다.",
     "C++에서는 std::vector<int> a(size)로 같은 목적을 이룬다."
    ],
    "trap": [
     "g++가 이 코드를 받아 주더라도 그것은 GCC 확장입니다. -pedantic 옵션을 주면 경고가 납니다. 언어 표준 규칙과 특정 컴파일러의 확장을 구분하세요."
    ],
    "recap": "매개변수로 정한 크기의 지역 배열: C++ 불법, C99 합법, C11+ 선택. C++에서는 vector를 쓴다.",
    "source": "PDF 38쪽"
   },
   "quizzes": [
    [
     "표준 C++에서 int f(int size) { int a[size]; }는?",
     [
      "불법이다",
      "합법이다",
      "경고 없이 크기 0 배열이 된다"
     ],
     "원문: C++: illegal.",
     [
      "맞습니다.",
      "C99에서 합법입니다.",
      "그런 규칙은 없습니다."
     ]
    ],
    [
     "같은 코드를 C99로 컴파일하면?",
     [
      "합법(VLA)",
      "불법",
      "선택 기능이라 항상 거부된다"
     ],
     "원문: C99: legal.",
     [
      "맞습니다.",
      "C89·C++ 기준입니다.",
      "선택 기능은 C11 이후 이야기입니다."
     ]
    ],
    [
     "표준 C++에서 실행 중 크기를 정한 배열이 필요할 때의 일반적인 대안은?",
     [
      "std::vector",
      "typedef int IntArray[];",
      "union"
     ],
     "vector는 실행 중 크기를 정하고 바꿀 수도 있습니다.",
     [
      "맞습니다.",
      "불완전 타입일 뿐입니다.",
      "배열이 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-38.jpg",
   "text": "Array in C/C++\n● dynamically defining an array size in C++:\n\nint f(int size) {\nint a[size]; // C++: illegal / C99: legal / C11+: optional\n}\n\n38",
   "quiz": [
    "표준 C++에서 int f(int size) { int a[size]; }는?",
    [
     "불법이다",
     "합법이다",
     "경고 없이 크기 0 배열이 된다"
    ],
    "원문: C++: illegal."
   ],
   "quizReasons": [
    "맞습니다.",
    "C99에서 합법입니다.",
    "그런 규칙은 없습니다."
   ]
  },
  {
   "page": 39,
   "title": "C/C++ 배열 매개변수는 포인터다",
   "explanation": "함수 매개변수 int a[]는 실제로 int *a입니다. 배열 전체가 아니라 첫 원소의 주소만 전달되므로 크기를 따로 넘겨야 하고, 함수 안에서 sizeof(a)는 배열 크기가 아니라 포인터 크기입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "int array_max(int a[], int size) — 매개변수 a는 사실 int *a다.",
     "호출할 때 주소만 전달된다 → 배열 길이 정보는 함께 가지 않는다.",
     "그래서 크기를 size로 따로 넘겨야 한다.",
     "함수 안의 sizeof(a)는 포인터 크기(64비트에서 보통 8)다."
    ],
    "analogy": "배열을 함수에 넘기는 것은 \"책 전체가 아니라 책이 있는 서가 위치만 알려 주는 것\"입니다. 위치만으로는 책이 몇 권인지 알 수 없어서, 권수(size)를 따로 알려 줘야 합니다.",
    "examples": [
     {
      "title": "sizeof 비교와 array_max",
      "code": "#include <stdio.h>\nint array_max(int a[], int size) {\n    printf(\"in function: %zu\\n\", sizeof(a));   /* 포인터 크기 */\n    int temp = a[0];\n    for (int i = 1; i < size; i++)\n        if (a[i] > temp) temp = a[i];\n    return temp;\n}\nint main(void) {\n    int x[10] = {3, 9, 2, 7, 1, 8, 5, 6, 4, 0};\n    printf(\"in main: %zu\\n\", sizeof(x));        /* 배열 전체 크기 */\n    printf(\"max = %d\\n\", array_max(x, 10));\n}",
      "lang": "C",
      "out": "in main: 40\nin function: 8\nmax = 9",
      "note": "GCC는 함수 안 sizeof(a)에 \"returns size of int *\" 경고를 냅니다. 64비트 환경 예입니다.",
      "error": false,
      "outLabel": "실행 결과 예 · 64비트"
     }
    ],
    "steps": [
     "main의 x는 진짜 배열이다 → sizeof(x) = 10 × 4 = 40.",
     "array_max(x, 10) 호출 시 x는 첫 원소 주소로 바뀌어 전달된다.",
     "함수의 a는 int *이므로 sizeof(a) = 8(포인터 크기).",
     "반복문은 size = 10을 이용해 a[0]~a[9]를 검사하고 최댓값 9를 돌려준다."
    ],
    "trap": [
     "매개변수에 int a[10]처럼 크기를 적어도 여전히 int *a로 조정됩니다. 크기는 무시됩니다.",
     "배열 → 포인터 변환은 52쪽에서 더 자세히 다룹니다."
    ],
    "recap": "C 배열 매개변수 int a[] = int *a. 주소만 전달되므로 크기는 따로 넘기고, 함수 안 sizeof(a)는 포인터 크기다.",
    "source": "PDF 39쪽"
   },
   "quizzes": [
    [
     "함수 매개변수 int a[]에 대해 함수 안의 sizeof(a)는?",
     [
      "포인터 크기",
      "호출자가 넘긴 배열 전체 크기",
      "배열 원소 수"
     ],
     "매개변수 선언 int a[]는 int *a로 조정됩니다.",
     [
      "맞습니다.",
      "배열 정보는 전달되지 않습니다.",
      "원소 수는 알 수 없습니다."
     ]
    ],
    [
     "array_max가 size를 따로 받는 이유는?",
     [
      "배열의 주소만 전달되어 길이를 알 수 없기 때문",
      "C 배열은 길이가 항상 10이기 때문",
      "최댓값 계산 속도를 높이기 위해"
     ],
     "원문: only the address is passed. So the size must be passed separately.",
     [
      "맞습니다.",
      "근거가 없습니다.",
      "정확성 문제입니다."
     ]
    ],
    [
     "매개변수 선언 int a[]와 같은 의미의 선언은?",
     [
      "int *a",
      "int a",
      "int **a"
     ],
     "배열 매개변수는 원소 타입에 대한 포인터로 조정됩니다.",
     [
      "맞습니다.",
      "정수 하나입니다.",
      "포인터의 포인터입니다."
     ]
    ]
   ],
   "image": "pages/pl09-39.jpg",
   "text": "Array in C/C++\n● An array parameter can omit its size int array_max(int a[], int size)\n○\n○\n○\n\na is actually a pointer (int *a); only the address is passed\nSo the size must be passed separately\nsizeof(a) gives the pointer size, not the array size\n\nint array_max (int a[], int size){\nint temp;\n...\nreturn temp;\n}\n39",
   "quiz": [
    "함수 매개변수 int a[]에 대해 함수 안의 sizeof(a)는?",
    [
     "포인터 크기",
     "호출자가 넘긴 배열 전체 크기",
     "배열 원소 수"
    ],
    "매개변수 선언 int a[]는 int *a로 조정됩니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "배열 정보는 전달되지 않습니다.",
    "원소 수는 알 수 없습니다."
   ]
  },
  {
   "page": 40,
   "title": "Java 배열",
   "explanation": "Java 배열은 힙에 할당되고, 크기를 실행 중에 정할 수 있습니다. 배열 객체가 길이 정보를 함께 가지므로 .length로 크기를 얻을 수 있고, 메서드에 넘긴 뒤에도 길이를 알 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "Java 배열은 힙(heap)에 할당되며 크기는 동적으로(실행 중) 정할 수 있다.",
     "int[] x = new int[n]; → n이 실행 중 값이어도 합법이다.",
     "크기는 배열 정보의 일부이므로 x.length로 얻는다.",
     "배열을 메서드에 넘기면 같은 배열 객체를 가리키는 참조가 전달된다 → 메서드 안에서도 .length를 쓸 수 있다."
    ],
    "analogy": "Java 배열은 \"라벨에 칸 수가 적힌 상자\"입니다. 상자를 다른 사람(메서드)에게 건네도 라벨(.length)이 붙어 있어서 칸 수를 따로 알려 줄 필요가 없습니다.",
    "examples": [
     {
      "title": "실행 중 크기와 length",
      "code": "static int count(int[] a) { return a.length; }\n\npublic static void main(String[] args) {\n    int n = 5;                    // 사용자 입력이라고 가정\n    int[] x = new int[n];         // 실행 중 크기 결정\n    System.out.println(x.length);\n    System.out.println(count(x)); // 메서드 안에서도 길이를 앎\n    System.out.println(x[0]);     // 기본값\n}",
      "lang": "Java",
      "out": "5\n5\n0",
      "note": "new int[n]으로 만든 배열의 원소는 0으로 초기화됩니다.",
      "error": false
     }
    ],
    "steps": [
     "new int[5]가 힙에 int 5개짜리 배열 객체를 만든다(길이 5를 함께 저장).",
     "x에는 그 객체를 가리키는 참조가 저장된다.",
     "x.length는 객체에 저장된 길이 5를 읽는다.",
     "count(x)에 참조가 전달되어도 같은 객체이므로 a.length = 5다. (C의 39쪽과 비교)"
    ],
    "trap": [
     "length는 메서드가 아니라 필드입니다. x.length()라고 쓰면 오류입니다(String은 s.length()).",
     "배열을 만든 뒤에는 길이를 바꿀 수 없습니다. 크기를 바꾸려면 새 배열을 만들거나 ArrayList를 씁니다."
    ],
    "recap": "Java 배열 = 힙에 할당, 실행 중 크기 지정, 길이 정보를 함께 가짐(.length).",
    "source": "PDF 40쪽"
   },
   "quizzes": [
    [
     "원문에 따르면 Java 배열이 할당되는 곳은?",
     [
      "힙",
      "스택",
      "레지스터"
     ],
     "원문: Allocated on heap, size dynamically specified.",
     [
      "맞습니다.",
      "C의 지역 배열입니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "Java에서 배열 x의 크기를 얻는 표현은?",
     [
      "x.length",
      "x.length()",
      "sizeof(x)"
     ],
     "length는 배열 객체의 필드입니다.",
     [
      "맞습니다.",
      "String의 메서드 형식입니다.",
      "Java에는 sizeof가 없습니다."
     ]
    ],
    [
     "Java 배열을 메서드에 넘긴 뒤 메서드 안에서 길이를 알 수 있는가?",
     [
      "알 수 있다. 배열 객체가 길이 정보를 가진다",
      "알 수 없다. 크기를 따로 넘겨야 한다",
      "컴파일 시점에만 알 수 있다"
     ],
     "C(39쪽)와 달리 길이가 배열 정보의 일부입니다.",
     [
      "맞습니다.",
      "C의 경우입니다.",
      "실행 중에도 압니다."
     ]
    ]
   ],
   "image": "pages/pl09-40.jpg",
   "text": "Array in Java\n● Allocated on heap, size dynamically specified;\n● Size can be obtained by .length (a part of array information)\n\nint n = ...\n//from user input\nint [] x = new int [n]; // not illegal\nSystem.out.println(x.length);\n\n40",
   "quiz": [
    "원문에 따르면 Java 배열이 할당되는 곳은?",
    [
     "힙",
     "스택",
     "레지스터"
    ],
    "원문: Allocated on heap, size dynamically specified."
   ],
   "quizReasons": [
    "맞습니다.",
    "C의 지역 배열입니다.",
    "근거가 없습니다."
   ]
  },
  {
   "page": 41,
   "title": "Ada 배열: 인덱스 범위를 실행 중에 정하기",
   "explanation": "Ada는 인덱스 범위를 정하지 않은 배열 타입(range <>)을 선언해 두고, 변수를 만들 때 실행 중 값으로 범위를 정할 수 있습니다. 배열은 스택에 할당되고, x'range로 실제 인덱스 범위를 순회합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "type IntToInt is array(integer range <>) of integer; → 인덱스 범위가 정해지지 않은(unconstrained) 배열 타입.",
     "x: IntToInt(1..n) := (others => 0); → 실행 중 읽은 n으로 범위 1..n을 정하고 모든 원소를 0으로 초기화.",
     "크기는 동적으로 정하지만 할당은 스택에 한다(declare 블록).",
     "for i in x'range loop … → x의 실제 인덱스 범위(1..n)를 자동으로 사용한다."
    ],
    "analogy": "range <>는 \"칸 수 미정\"이라고 적힌 주문서이고, declare 블록에서 손님 수(n)를 듣고 칸을 확정합니다. x'range는 \"이 상자의 칸 번호 범위\"를 상자 스스로 알려 주는 기능입니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "type IntToInt is array(integer range <>) of integer;\nn : Integer;\nget(n);                          -- 입력: 3\ndeclare\n   x: IntToInt(1..n) := (others => 0);\nbegin\n   for i in x'range loop         -- i = 1, 2, 3\n      put(x(i));\n   end loop;\nend;",
      "lang": "Ada",
      "out": "          0          0          0",
      "note": "Integer의 put은 기본 폭(11칸)에 오른쪽 정렬해 출력하므로 앞에 공백이 붙습니다.",
      "error": false,
      "outLabel": "실행 결과 · 입력 3"
     }
    ],
    "steps": [
     "get(n)으로 n = 3을 읽는다.",
     "declare 블록에 들어가면서 x를 인덱스 1..3인 배열로 스택에 만든다.",
     "(others => 0)이 모든 원소를 0으로 채운다.",
     "x'range = 1..3이므로 반복문이 x(1), x(2), x(3)을 출력한다."
    ],
    "trap": [
     "원문 코드의 x’range에 쓰인 ’는 슬라이드 서식입니다. 실제 코드에서는 작은따옴표(x'range)를 씁니다.",
     "Ada 배열은 x(i)처럼 소괄호로 원소에 접근합니다(C의 x[i]와 다름)."
    ],
    "recap": "Ada: range <>로 범위 미정 배열 타입을 만들고, 실행 중 범위를 정해 스택에 할당한다. x'range로 실제 범위를 순회한다.",
    "source": "PDF 41쪽"
   },
   "quizzes": [
    [
     "type IntToInt is array(integer range <>) of integer;에서 range <>의 뜻은?",
     [
      "인덱스 범위를 객체를 만들 때 정한다",
      "인덱스가 0부터 시작한다",
      "배열 크기가 무한하다"
     ],
     "범위가 정해지지 않은(unconstrained) 배열 타입입니다.",
     [
      "맞습니다.",
      "Ada는 하한을 직접 정합니다.",
      "객체마다 유한한 범위를 갖습니다."
     ]
    ],
    [
     "n = 3일 때 x: IntToInt(1..n)에서 x'range는?",
     [
      "1..3",
      "0..2",
      "0..3"
     ],
     "선언한 인덱스 범위 그대로입니다.",
     [
      "맞습니다.",
      "C식 인덱스입니다.",
      "원소가 4개가 됩니다."
     ]
    ],
    [
     "(others => 0)이 하는 일은?",
     [
      "모든 원소를 0으로 초기화한다",
      "0번 원소만 초기화한다",
      "배열 크기를 0으로 만든다"
     ],
     "others는 \"나머지 모든 원소\"를 뜻합니다.",
     [
      "맞습니다.",
      "모든 원소에 적용됩니다.",
      "크기와 무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-41.jpg",
   "text": "Array in Ada\n● size dynamically specified; allocation on stack\n● Set of subscripts\n\ntype IntToInt is array(integer range <>) of integer;\nn : Integer;\nget(n);\n-- from user input\ndeclare\nx: IntToInt(1..n) :=(others =>0);\nbegin\nfor i in x’range loop\nput(x(i));\nend loop;\nend;\n41",
   "quiz": [
    "type IntToInt is array(integer range <>) of integer;에서 range <>의 뜻은?",
    [
     "인덱스 범위를 객체를 만들 때 정한다",
     "인덱스가 0부터 시작한다",
     "배열 크기가 무한하다"
    ],
    "범위가 정해지지 않은(unconstrained) 배열 타입입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "Ada는 하한을 직접 정합니다.",
    "객체마다 유한한 범위를 갖습니다."
   ]
  },
  {
   "page": 42,
   "title": "Ada vs C99: 같은 일을 하는 두 코드",
   "explanation": "Ada 코드와 C99 VLA 코드는 모두 실행 중 크기 n의 배열을 만들고 출력합니다. 차이는 인덱스 범위(1..n vs 0..n-1), 초기화(0으로 채움 vs 초기화 없음), 범위 검사(실행 중 검사 vs 검사 없음)입니다. 원문의 질문 \"x[n] ?\"은 이 차이를 묻습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "Ada: 인덱스 1..n, (others => 0)으로 초기화, 범위 밖 접근은 실행 중 오류.",
     "C99: 인덱스 0..n-1, 초기화하지 않음, 범위 밖 접근을 검사하지 않음.",
     "C의 x[n]은 마지막 원소 다음 칸 → 범위 밖 → 정의되지 않은 동작(오류 없이 아무 값이나 읽을 수 있음).",
     "Ada의 x(n)은 정상(마지막 원소). x(n+1)은 Constraint_Error."
    ],
    "analogy": "두 건물 모두 n층이지만 Ada 건물은 1층부터, C 건물은 0층부터 번호를 붙입니다. C 건물에서 \"n층\"을 누르면 옥상 바깥으로 나가는데 경비원이 없어 아무도 막지 않습니다.",
    "examples": [
     {
      "title": "원문 C99 코드와 범위 밖 접근",
      "code": "scanf(\"%d\", &n);              /* n = 3 */\n{\n    int x[n];                 /* 초기화되지 않음 */\n    for (int i = 0; i < n; i++)\n        printf(\"%d\", x[i]);   /* 알 수 없는 값 */\n    printf(\"%d\", x[n]);       /* x[3]: 범위 밖 */\n}",
      "lang": "C99",
      "out": "(예측할 수 없는 값들, 오류 메시지 없음)",
      "note": "C VLA는 = {0}으로 초기화할 수 없어(C23 이전) 값이 정해져 있지 않습니다. 원문 C 코드는 Ada처럼 0을 출력하려면 반복문으로 직접 0을 넣어야 합니다.",
      "error": true,
      "outLabel": "실행 결과"
     },
     {
      "title": "Ada에서 같은 실수를 하면",
      "code": "put(x(n));       -- n = 3: 마지막 원소, 정상\nput(x(n + 1));   -- 범위 밖",
      "lang": "Ada",
      "out": "          0\nraised CONSTRAINT_ERROR : index check failed",
      "note": "",
      "error": true,
      "outLabel": "실행 결과 예"
     }
    ],
    "steps": [
     "두 코드 모두 n을 실행 중에 읽고 그 크기로 지역 배열을 만든다.",
     "Ada는 원소를 0으로 채우고 1..n을 순회한다 → 0 0 0.",
     "C는 원소를 초기화하지 않고 0..n-1을 순회한다 → 알 수 없는 값.",
     "x[n]: C는 검사하지 않아 범위 밖 메모리를 읽는다. Ada는 범위 검사로 막는다."
    ],
    "trap": [
     "C에서 x[n]은 \"마지막 원소\"가 아닙니다. 마지막 원소는 x[n-1]입니다.",
     "원문의 \"x[n] ?\"은 오타가 아니라 생각해 보라는 질문입니다."
    ],
    "recap": "Ada 1..n·초기화·범위 검사 vs C 0..n-1·초기화 없음·검사 없음. C의 x[n]은 범위 밖이다.",
    "source": "PDF 42쪽"
   },
   "quizzes": [
    [
     "C99 코드에서 x[n]에 접근하면?",
     [
      "범위 밖이지만 검사하지 않아 정의되지 않은 동작이 된다",
      "마지막 원소를 읽는다",
      "실행 중 반드시 예외가 난다"
     ],
     "C 배열 인덱스는 0..n-1입니다.",
     [
      "맞습니다.",
      "마지막 원소는 x[n-1]입니다.",
      "C는 범위를 검사하지 않습니다."
     ]
    ],
    [
     "Ada 코드(x: IntToInt(1..n))에서 x(n)은?",
     [
      "마지막 원소로 정상 접근이다",
      "범위 밖이다",
      "첫 원소다"
     ],
     "인덱스 범위가 1..n입니다.",
     [
      "맞습니다.",
      "범위 안입니다.",
      "첫 원소는 x(1)입니다."
     ]
    ],
    [
     "원문 C99 코드가 출력하는 값에 대한 설명으로 옳은 것은?",
     [
      "배열을 초기화하지 않아 알 수 없는 값이 출력될 수 있다",
      "항상 0이 출력된다",
      "컴파일 오류가 난다"
     ],
     "Ada의 (others => 0)에 해당하는 초기화가 C 코드에는 없습니다.",
     [
      "맞습니다.",
      "Ada의 결과입니다.",
      "C99에서 합법입니다."
     ]
    ]
   ],
   "image": "pages/pl09-42.jpg",
   "text": "Ada vs. C\n-- Ada\nget(n);\n-- from user input\ndeclare\nx: IntToInt(1..n) :=(others =>0);\nbegin\nfor i in x’range loop\nput(x(i));\nend loop;\nend;\n\n/* C99 */\nscanf(\"%d\", &n);\n{\nint x[n];\nfor (int i = 0; i < n; i++)\nprintf(\"%d\", x[i]);\n}\n\nx[n] ?\n\n42",
   "quiz": [
    "C99 코드에서 x[n]에 접근하면?",
    [
     "범위 밖이지만 검사하지 않아 정의되지 않은 동작이 된다",
     "마지막 원소를 읽는다",
     "실행 중 반드시 예외가 난다"
    ],
    "C 배열 인덱스는 0..n-1입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "마지막 원소는 x[n-1]입니다.",
    "C는 범위를 검사하지 않습니다."
   ]
  },
  {
   "page": 43,
   "title": "다차원 배열",
   "explanation": "다차원 배열은 인덱스를 여러 개 쓰는 배열입니다. C/C++와 Java는 int x[10][20], new int[10][20]처럼 씁니다. Ada에서는 진짜 2차원 배열(x(i, j))과 배열의 배열(x(i)(j))이 서로 다른 타입입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "C/C++: int x[10][20];",
     "Java: int[][] x = new int[10][20];",
     "Ada 2차원 배열: type Matrix_Type is array(1..10, -10..10) of integer; → x(i, j)로 접근.",
     "Ada 배열의 배열: type Row is array(-10..10) of Integer; type Matrix_Type is array(1..10) of Row; → x(i)(j)로 접근.",
     "Ada에서 두 선언은 다르다. 배열의 배열은 행 하나(x(i))를 통째로 다룰 수 있다."
    ],
    "analogy": "2차원 배열은 \"가로세로 좌석 번호(3열 5번)로 부르는 극장\"이고, 배열의 배열은 \"열마다 따로 된 줄이 있고, 줄 안에서 번호를 부르는 극장\"입니다. 후자는 \"3번 줄 전체\"를 한 덩어리로 가리킬 수 있습니다.",
    "examples": [
     {
      "title": "Ada 두 방식 비교",
      "code": "type Matrix_Type is array(1..10, -10..10) of integer;\nM : Matrix_Type;\nM(2, -10) := 7;            -- 인덱스 두 개를 한 번에\n\ntype Row is array(-10..10) of Integer;\ntype Matrix2 is array(1..10) of Row;\nN : Matrix2;\nN(2)(-10) := 7;            -- 행을 고르고, 그 안에서 원소를 고름\nR : Row := N(2);           -- 행 전체를 꺼낼 수 있음",
      "lang": "Ada",
      "out": "",
      "note": "원문은 두 타입에 같은 이름 Matrix_Type을 썼지만, 한 프로그램에서는 이름을 달리해야 해서 Matrix2로 바꾸었습니다.",
      "error": false
     }
    ],
    "steps": [
     "Matrix_Type의 첫 인덱스는 1..10(10개), 둘째는 -10..10(21개) → 원소 210개.",
     "M(2, -10)은 인덱스 두 개로 원소 하나를 바로 고른다.",
     "Matrix2는 Row 10개로 된 배열이다. N(2)는 Row 하나, N(2)(-10)은 그 Row의 원소다.",
     "그래서 R := N(2)처럼 행 단위 대입이 가능하지만, M에서는 M(2)만 따로 꺼낼 수 없다."
    ],
    "trap": [
     "-10..10의 원소 수는 20이 아니라 21입니다(0 포함).",
     "C의 int x[10][20]은 문법상 \"배열의 배열\"이지만 메모리에 연속으로 놓입니다. Java의 int[][]는 행마다 별도 배열 객체입니다(45쪽)."
    ],
    "recap": "다차원 배열 = 여러 인덱스. Ada는 x(i, j) 2차원 배열과 x(i)(j) 배열의 배열을 구분한다.",
    "source": "PDF 43쪽"
   },
   "quizzes": [
    [
     "type Matrix_Type is array(1..10, -10..10) of integer;의 원소 수는?",
     [
      "210",
      "200",
      "100"
     ],
     "10 × 21 = 210입니다(-10..10은 21개).",
     [
      "맞습니다.",
      "-10..10을 20개로 셌습니다.",
      "둘째 차원을 잘못 셌습니다."
     ]
    ],
    [
     "Ada에서 x(i)(j)로 접근하는 것은?",
     [
      "배열의 배열",
      "2차원 배열",
      "포인터 배열"
     ],
     "원문: x(i)(j); -- 배열의 배열.",
     [
      "맞습니다.",
      "x(i, j)로 접근합니다.",
      "포인터와 무관합니다."
     ]
    ],
    [
     "Ada의 배열의 배열에서만 가능한 것은?",
     [
      "행 하나 x(i)를 통째로 꺼내 다루기",
      "음수 인덱스 사용",
      "원소를 정수로 저장"
     ],
     "각 행이 Row 타입 값이므로 단위로 다룰 수 있습니다.",
     [
      "맞습니다.",
      "두 방식 모두 가능합니다.",
      "두 방식 모두 가능합니다."
     ]
    ]
   ],
   "image": "pages/pl09-43.jpg",
   "text": "Multi-dimensional arrays\n● C/C++:\n\nint x[10][20];\n\n● Java: int [][] x = new int [10][20];\n● Ada: These two are different\n\ntype Matrix_Type is array(1..10, -10..10) of\ninteger;\nx(i,j); -- 2차원 배열\ntype Row is array(-10..10) of Integer\ntype Matrix_Type is array(1..10) of Row;\nx(i)(j); -- 배열의 배열\n43",
   "quiz": [
    "type Matrix_Type is array(1..10, -10..10) of integer;의 원소 수는?",
    [
     "210",
     "200",
     "100"
    ],
    "10 × 21 = 210입니다(-10..10은 21개)."
   ],
   "quizReasons": [
    "맞습니다.",
    "-10..10을 20개로 셌습니다.",
    "둘째 차원을 잘못 셌습니다."
   ]
  },
  {
   "page": 44,
   "title": "배열의 저장 (1): 행 우선과 열 우선",
   "explanation": "2차원 배열은 메모리에 한 줄로 저장됩니다. 행 우선(row-major)은 한 행을 다 놓고 다음 행으로, 열 우선(column-major)은 한 열을 다 놓고 다음 열로 갑니다. C/C++는 반드시 행 우선이므로, 2차원 배열 매개변수에는 둘째 차원 크기가 필요합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "행 우선: x[1,-10], x[1,-9], …, x[1,10], x[2,-10], …, x[2,10], x[3,-10], …",
     "열 우선: x[1,-10], x[2,-10], …, x[10,-10], x[1,-9], …, x[10,-9], x[1,-8], …",
     "C/C++는 행 우선이어야 한다.",
     "int array_max(int a[][20], int size) — 20(둘째 차원 크기)이 있어야 a[i]와 a[i+1] 사이의 메모리 거리를 계산할 수 있다.",
     "행 우선에서 원소 위치: (i − 첫째 하한) × 열 수 + (j − 둘째 하한)."
    ],
    "analogy": "책장에 책을 꽂는 순서와 같습니다. 행 우선은 \"1층 왼쪽부터 끝까지, 그다음 2층\"으로, 열 우선은 \"맨 왼쪽 칸을 1층부터 맨 위까지, 그다음 칸\"으로 꽂습니다. 몇 번째 책인지 계산하려면 한 층에 몇 권 들어가는지 알아야 합니다.",
    "examples": [
     {
      "title": "C에서 오프셋 계산",
      "code": "int a[3][4];\nprintf(\"%td\\n\", &a[2][1] - &a[0][0]);   /* 원소 단위 거리 */",
      "lang": "C",
      "out": "9",
      "note": "앞의 두 행(2 × 4 = 8개)을 지나 셋째 행의 두 번째 원소(+1) → 9.",
      "error": false
     },
     {
      "title": "원문 Ada 배열 x(1..10, -10..10)의 위치",
      "code": "",
      "lang": "",
      "out": "열 수 = 10 − (−10) + 1 = 21\nx[1,-10] → (1−1)×21 + (−10+10) = 0\nx[1, 10] → 0×21 + 20            = 20\nx[2,-10] → 1×21 + 0             = 21   ← 행 우선에서 x[1,10] 바로 다음\nx[3, 5]  → 2×21 + 15            = 57",
      "note": "행 우선 기준 계산입니다.",
      "error": false,
      "outLabel": "계산"
     }
    ],
    "steps": [
     "열(둘째 차원) 수를 구한다: C의 a[3][4]는 4, Ada 예는 21.",
     "행 번호에서 하한을 빼고 열 수를 곱한다 → 앞 행들을 건너뛴 거리.",
     "열 번호에서 하한을 빼서 더한다 → 그 행 안에서의 거리.",
     "C 함수가 a[i][j]를 계산하려면 열 수가 필요하다 → 매개변수에 a[][20]처럼 둘째 차원을 적어야 한다."
    ],
    "trap": [
     "첫째 차원 크기(행 수)는 위치 계산에 필요 없어서 생략할 수 있습니다. 둘째 차원 이후는 생략할 수 없습니다.",
     "열 우선을 쓰는 대표 언어는 Fortran입니다(보충). 원문은 C/C++가 행 우선이라는 점만 강조합니다."
    ],
    "recap": "행 우선 위치 = (i − 하한₁) × 열 수 + (j − 하한₂). C는 행 우선이라 매개변수에 둘째 차원 크기가 필요하다.",
    "source": "PDF 44쪽"
   },
   "quizzes": [
    [
     "C의 int a[3][4]에서 a[2][1]의 원소 단위 오프셋은?",
     [
      "9",
      "7",
      "6"
     ],
     "2 × 4 + 1 = 9입니다.",
     [
      "맞습니다.",
      "행 길이를 3으로 계산했습니다.",
      "2 × 3으로 계산했습니다."
     ]
    ],
    [
     "원문 배열 x(1..10, -10..10)를 행 우선으로 저장할 때 x[1,10] 바로 다음 원소는?",
     [
      "x[2,-10]",
      "x[1,11]",
      "x[2,10]"
     ],
     "첫 행의 마지막 원소 다음에는 둘째 행의 첫 원소가 옵니다.",
     [
      "맞습니다.",
      "둘째 인덱스는 10까지입니다.",
      "둘째 행의 마지막 원소입니다."
     ]
    ],
    [
     "int array_max(int a[][20], int size)에서 20이 꼭 필요한 이유는?",
     [
      "a[i]와 a[i+1] 사이의 메모리 거리를 계산하기 위해",
      "행 수를 알기 위해",
      "배열 원소를 20으로 초기화하기 위해"
     ],
     "원문: The size of the 2nd dimension is required for compiler to compute the distance between a[i] and a[i+1].",
     [
      "맞습니다.",
      "행 수는 size로 받습니다.",
      "초기화와 무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-44.jpg",
   "text": "Storage for Array (1/2)\n● row-major form\n\nx[1,-10],x[1,-9],…,x[1,10],x[2,-10],…,x[2,10],x[3,10],…\n● column-major form\n\nx[1,-10],x[2,-10],…,x[10,-10],x[1,-9],…,x[10,9],x[1,-8],…\n● C/C++: must be row-major form\n\nint array_max(int a[][20], int size)\n○\n\nrow-major form: The size of the 2nd dimension is required for\ncompiler to compute the distance in memory between a[i] and a[i+1]\n44",
   "quiz": [
    "C의 int a[3][4]에서 a[2][1]의 원소 단위 오프셋은?",
    [
     "9",
     "7",
     "6"
    ],
    "2 × 4 + 1 = 9입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "행 길이를 3으로 계산했습니다.",
    "2 × 3으로 계산했습니다."
   ]
  },
  {
   "page": 45,
   "title": "배열의 저장 (2): Java의 배열의 배열",
   "explanation": "Java의 2차원 배열은 \"배열 참조를 원소로 가진 배열\"입니다. 각 행이 독립된 배열 객체라 행마다 길이가 달라도 되고(들쭉날쭉한 배열), 각 행이 자기 길이를 알기 때문에 매개변수에 크기를 적을 필요가 없습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "int array_max(int[][] a) — 크기를 적지 않는다. 호출 시 .length로 알 수 있다.",
     "int[][] t = new int[][] { {4}, {8, 6, 1, 2}, {5, 0} }; → 행 길이 1, 4, 2.",
     "t는 행 3개(배열 참조 3개)를 담은 배열이고, 각 행은 별도의 int 배열 객체다.",
     "t.length = 3(행 수), t[1].length = 4(둘째 행의 길이)."
    ],
    "analogy": "Java 2차원 배열은 \"번호가 붙은 서랍장에, 서랍마다 길이가 다른 상자가 들어 있는 것\"입니다. 서랍장(t)은 상자를 가리키기만 하고, 상자마다 자기 칸 수(.length)가 적혀 있습니다.",
    "examples": [
     {
      "title": "들쭉날쭉한 배열에서 최댓값 찾기",
      "code": "static int array_max(int[][] a) {\n    int max = Integer.MIN_VALUE;\n    for (int i = 0; i < a.length; i++)          // 행 수\n        for (int j = 0; j < a[i].length; j++)   // 각 행의 길이\n            if (a[i][j] > max) max = a[i][j];\n    return max;\n}\n\nint[][] t = new int[][] { {4}, {8, 6, 1, 2}, {5, 0} };\nSystem.out.println(t.length + \" \" + t[1].length);\nSystem.out.println(array_max(t));",
      "lang": "Java",
      "out": "3 4\n8",
      "note": "원문은 array_max의 본문을 생략했습니다. 위 본문은 동작을 보여 주기 위한 보충 코드입니다.",
      "error": false
     }
    ],
    "steps": [
     "t.length = 3이므로 i는 0, 1, 2.",
     "i = 0: 행 {4}, 길이 1 → max = 4.",
     "i = 1: 행 {8, 6, 1, 2}, 길이 4 → max = 8.",
     "i = 2: 행 {5, 0}, 길이 2 → 8보다 큰 값 없음 → 결과 8."
    ],
    "trap": [
     "C의 int a[][20]과 달리 Java는 행 길이가 모두 같다고 가정하지 않습니다. 그래서 a[i].length를 행마다 확인해야 합니다.",
     "Java 2차원 배열은 메모리에 한 덩어리로 연속 저장된다는 보장이 없습니다. 행 우선/열 우선 공식(44쪽)이 그대로 적용되지 않습니다."
    ],
    "recap": "Java 2차원 배열 = 행 배열들의 참조 배열. 행 길이가 달라도 되고, 길이를 .length로 알 수 있어 크기 매개변수가 필요 없다.",
    "source": "PDF 45쪽"
   },
   "quizzes": [
    [
     "t = { {4}, {8, 6, 1, 2}, {5, 0} }일 때 t[1].length는?",
     [
      "4",
      "3",
      "7"
     ],
     "둘째 행 {8, 6, 1, 2}의 길이입니다.",
     [
      "맞습니다.",
      "행 수 t.length입니다.",
      "전체 원소 수입니다."
     ]
    ],
    [
     "array_max(t)의 결과는?",
     [
      "8",
      "4",
      "5"
     ],
     "모든 행을 확인하면 가장 큰 값은 8입니다.",
     [
      "맞습니다.",
      "첫 행만 봤습니다.",
      "마지막 행의 최댓값입니다."
     ]
    ],
    [
     "Java에서 서로 다른 길이의 행을 가질 수 있는 이유는?",
     [
      "각 행이 별도의 배열 객체이기 때문",
      "배열에는 길이 정보가 없기 때문",
      "모든 행이 같은 배열을 참조하기 때문"
     ],
     "2차원 배열은 배열 참조를 원소로 갖는 배열입니다.",
     [
      "맞습니다.",
      "길이 정보가 있습니다.",
      "행마다 다른 배열입니다."
     ]
    ]
   ],
   "image": "pages/pl09-45.jpg",
   "text": "Storage for Array (2/2)\n● Java\nint array_max(int [][]a)\n○\n\n호출 시 배열을 넘기면 크기는 .length로 알 수 있음\n\nint[][] t = new int[][] { {4}, {8, 6, 1, 2}, {5, 0} };\narray_max(t);\n\n45",
   "quiz": [
    "t = { {4}, {8, 6, 1, 2}, {5, 0} }일 때 t[1].length는?",
    [
     "4",
     "3",
     "7"
    ],
    "둘째 행 {8, 6, 1, 2}의 길이입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "행 수 t.length입니다.",
    "전체 원소 수입니다."
   ]
  },
  {
   "page": 46,
   "title": "C의 함수 타입",
   "explanation": "어떤 언어에서는 일반 함수·프로시저 타입을 만들 수 있습니다. C에서는 typedef int (*IntFunction)(int);로 \"int를 받아 int를 반환하는 함수의 포인터\" 타입을 만들고, 변수나 매개변수에 함수를 담아 쓸 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "typedef int (*IntFunction)(int); → int 매개변수 하나, int 반환 함수를 가리키는 포인터 타입.",
     "int square(int x) { return x*x; }  IntFunction f = square; → 함수 이름이 함수 포인터로 변환되어 f에 저장된다.",
     "int evaluate(IntFunction g, int value) { return g(value); } → 함수를 매개변수로 받아 호출한다.",
     "evaluate(f, 3)은 square(3) = 9를 돌려준다."
    ],
    "analogy": "함수 포인터는 \"전화번호\"와 같습니다. square라는 가게의 번호를 f에 적어 두면, evaluate는 그 번호로 전화(g(value))를 걸어 일을 맡깁니다. 다른 가게 번호를 넘기면 다른 일을 시킬 수 있습니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "typedef int (*IntFunction)(int);\n\nint square(int x) { return x * x; }\nIntFunction f = square;\n\nint evaluate(IntFunction g, int value) {\n    return g(value);\n}\n...\nprintf(\"%d\\n\", evaluate(f, 3));   /* square(3) */",
      "lang": "C",
      "out": "9",
      "note": "",
      "error": false
     }
    ],
    "steps": [
     "IntFunction 타입을 읽는다: (*IntFunction)은 포인터, (int)는 매개변수 목록, 맨 앞 int는 반환 타입.",
     "f = square: square의 주소가 f에 저장된다.",
     "evaluate(f, 3): g = f(= square), value = 3.",
     "g(value) = square(3) = 9를 반환하고 printf가 9를 출력한다."
    ],
    "trap": [
     "괄호가 중요합니다. typedef int *IntFunction(int);라고 쓰면 \"int *를 반환하는 함수 타입\"이 됩니다.",
     "C 함수 포인터는 함수를 \"가리킬\" 뿐 실행 중 새 함수를 만들 수는 없습니다. ML처럼 함수를 완전한 값으로 다루는 것(47쪽)과 비교하세요."
    ],
    "recap": "C 함수 타입: typedef 반환형 (*이름)(매개변수형); 함수 포인터를 변수·매개변수로 전달해 호출한다.",
    "source": "PDF 46쪽"
   },
   "quizzes": [
    [
     "원문 예제에서 printf(\"%d\\n\", evaluate(f, 3));의 출력은?",
     [
      "9",
      "3",
      "6"
     ],
     "evaluate는 g(3) = square(3) = 9를 반환합니다.",
     [
      "맞습니다.",
      "인자 값입니다.",
      "3 + 3입니다."
     ]
    ],
    [
     "typedef int (*IntFunction)(int);가 만드는 타입은?",
     [
      "int를 받아 int를 반환하는 함수의 포인터 타입",
      "int 포인터를 반환하는 함수 타입",
      "int 배열 타입"
     ],
     "(*이름)은 포인터, 뒤의 (int)는 매개변수, 앞의 int는 반환 타입입니다.",
     [
      "맞습니다.",
      "괄호가 없을 때의 의미입니다.",
      "배열이 아닙니다."
     ]
    ],
    [
     "IntFunction f = square;에서 f에 저장되는 것은?",
     [
      "함수 square를 가리키는 포인터",
      "square(0)의 결과",
      "square 함수 코드의 복사본"
     ],
     "함수 이름은 함수 포인터로 변환됩니다.",
     [
      "맞습니다.",
      "호출하지 않았습니다.",
      "코드를 복사하지 않습니다."
     ]
    ]
   ],
   "image": "pages/pl09-46.jpg",
   "text": "Function Type in C\n● General function and procedure types can be created in some languages.\n● Example: in C, define a function type from integers to integers:\n● define a function type with int parameter and int return\ntypedef int (*IntFunction)(int);\npointer to function\n● Use this type for variables or parameters:\nint square(int x) {return x*x;}\nIntFunction f = square;\nint evaluate(IntFunction g, int value){\nreturn g(value);\n}\n…\nprintf(“%d\\n”,evaluate(f,3)); // square(3)\n46",
   "quiz": [
    "원문 예제에서 printf(\"%d\\n\", evaluate(f, 3));의 출력은?",
    [
     "9",
     "3",
     "6"
    ],
    "evaluate는 g(3) = square(3) = 9를 반환합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "인자 값입니다.",
    "3 + 3입니다."
   ]
  },
  {
   "page": 47,
   "title": "ML의 함수 타입: 일급 값",
   "explanation": "ML에서는 함수가 일급 값(first-class value)입니다. type IntFunction = int -> int;로 함수 타입에 이름을 붙이고, 함수를 변수에 담고, 다른 함수의 인자로 넘기고, 결과로 돌려받을 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "type IntFunction = int -> int; → int를 받아 int를 반환하는 함수 타입.",
     "fun square(x: int) = x * x;  val f = square; → 함수를 값처럼 변수에 담는다.",
     "fun evaluate(g: IntFunction, value: int) = g value; → g value는 \"g를 value에 적용\"(호출)이다.",
     "evaluate(f, 3); ⇒ 9.",
     "일급 값: 변수에 저장, 인자로 전달, 결과로 반환이 모두 가능한 값."
    ],
    "analogy": "일급 값은 \"어디든 들고 다닐 수 있는 물건\"입니다. ML의 함수는 숫자처럼 주머니(변수)에 넣고, 남에게 건네고(인자), 돌려받을(반환) 수 있습니다.",
    "examples": [
     {
      "title": "SML 대화형 실행",
      "code": "type IntFunction = int -> int;\nfun square (x: int) = x * x;\nval f = square;\nfun evaluate (g: IntFunction, value: int) = g value;\nevaluate (f, 3);",
      "lang": "Standard ML",
      "out": "val square = fn : int -> int\nval f = fn : int -> int\nval it = 9 : int",
      "note": "함수 값은 내용 대신 fn으로 표시되고 타입이 함께 출력됩니다. type·evaluate 선언에 대한 응답 줄은 생략했습니다(출력 형식은 구현마다 다를 수 있음).",
      "error": false
     }
    ],
    "steps": [
     "square의 타입은 int -> int다.",
     "val f = square;로 f도 같은 함수를 가리킨다(타입 int -> int).",
     "evaluate(f, 3)에서 g = f, value = 3.",
     "g value = square 3 = 9."
    ],
    "trap": [
     "ML에서 함수 적용은 괄호 없이 공백으로 씁니다: g value. g(value)도 같은 뜻이지만 괄호는 묶음일 뿐입니다.",
     "원문의 \"함수 본문 시작\"은 = 기호 오른쪽이 함수 본문이라는 표시입니다."
    ],
    "recap": "ML 함수 = 일급 값. 함수 타입 int -> int에 이름을 붙이고 변수·인자·반환값으로 자유롭게 쓴다.",
    "source": "PDF 47쪽"
   },
   "quizzes": [
    [
     "evaluate(f, 3);의 결과는?",
     [
      "9",
      "3",
      "fn"
     ],
     "g value = square 3 = 9입니다.",
     [
      "맞습니다.",
      "인자 값입니다.",
      "함수 자체가 아니라 적용 결과입니다."
     ]
    ],
    [
     "ML에서 g value가 뜻하는 것은?",
     [
      "함수 g를 value에 적용(호출)한다",
      "g와 value를 곱한다",
      "g에 value를 대입한다"
     ],
     "원문: g를 value에 적용.",
     [
      "맞습니다.",
      "곱셈은 *입니다.",
      "대입이 아닙니다."
     ]
    ],
    [
     "함수가 일급 값이면 할 수 있는 일은?",
     [
      "함수를 다른 함수의 인자로 넘긴다",
      "반환 타입 없이 아무 값이나 반환한다",
      "함수를 한 번만 호출할 수 있다"
     ],
     "일급 값은 저장·전달·반환이 가능합니다.",
     [
      "맞습니다.",
      "타입 검사는 그대로입니다.",
      "호출 횟수와 무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-47.jpg",
   "text": "Function Type in ML\ntype IntFunction = int -> int;\nfun square(x: int) = x * x;\n함수 본문 시작\nval f = square;\nfun evaluate(g:IntFunction, value:int) = g value;\n…\ng를 value에 적용\nevaluate(f,3); (*evaluates to 9 *)\nFunction: First class value\n47",
   "quiz": [
    "evaluate(f, 3);의 결과는?",
    [
     "9",
     "3",
     "fn"
    ],
    "g value = square 3 = 9입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "인자 값입니다.",
    "함수 자체가 아니라 적용 결과입니다."
   ]
  },
  {
   "page": 48,
   "title": "벡터와 리스트",
   "explanation": "함수형 언어는 보통 배열을 직접 제공하지 않고 벡터나 리스트를 씁니다. 벡터는 배열처럼 인덱스로 접근하되 더 유연하고, 리스트는 첫 원소부터 하나씩 세어 내려가며 접근합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "함수형 언어: 보통 배열을 제공하지 않는다.",
     "벡터(Scheme): 배열과 비슷하지만 더 유연하다(원문: 특히 동적 크기 조정).",
     "리스트: 벡터와 비슷하지만, 첫 원소부터 차례로 세어 내려가며 접근할 수 있다.",
     "그래서 리스트의 k번째 원소 접근은 k에 비례해 시간이 걸린다(보충)."
    ],
    "analogy": "벡터는 \"번호가 적힌 사물함\"이라 7번을 바로 엽니다. 리스트는 \"손을 잡고 늘어선 줄\"이라 7번째 사람을 찾으려면 맨 앞부터 한 명씩 세어 가야 합니다.",
    "examples": [
     {
      "title": "Scheme에서 벡터와 리스트",
      "code": "(define v (vector 10 20 30))\n(define lst (list 10 20 30))\n(display (vector-ref v 2))   ; 인덱스로 바로\n(newline)\n(display (list-ref lst 2))   ; 앞에서부터 두 번 cdr 후 car\n(newline)\n(display (car (cdr (cdr lst))))",
      "lang": "Scheme",
      "out": "30\n30\n30",
      "note": "list-ref는 내부적으로 (car (cdr (cdr lst)))처럼 앞에서부터 세어 내려갑니다.",
      "error": false
     }
    ],
    "steps": [
     "(vector-ref v 2): 벡터의 2번 칸을 바로 읽는다 → 30.",
     "(list-ref lst 2): 첫 원소에서 시작한다.",
     "cdr로 한 칸, 또 cdr로 한 칸 이동 → (30).",
     "car로 그 원소를 꺼낸다 → 30."
    ],
    "trap": [
     "원문은 Scheme 벡터의 장점으로 \"동적 크기 조정\"을 들었습니다. 표준 Scheme 벡터는 만든 뒤 길이가 고정되므로 보충 설명을 함께 보세요(아래 자료 검토)."
    ],
    "recap": "함수형 언어: 배열 대신 벡터(인덱스 접근)와 리스트(앞에서부터 순차 접근)를 쓴다.",
    "source": "PDF 48쪽"
   },
   "quizzes": [
    [
     "원문에 따르면 리스트의 원소에 접근하는 방식은?",
     [
      "첫 원소부터 차례로 세어 내려간다",
      "인덱스로 바로 접근한다",
      "해시로 찾는다"
     ],
     "원문: can only be accessed by counting down from the first element.",
     [
      "맞습니다.",
      "벡터·배열의 방식입니다.",
      "원문 내용이 아닙니다."
     ]
    ],
    [
     "(vector-ref (vector 10 20 30) 2)의 값은?",
     [
      "30",
      "20",
      "10"
     ],
     "인덱스는 0부터 시작합니다.",
     [
      "맞습니다.",
      "인덱스 1입니다.",
      "인덱스 0입니다."
     ]
    ],
    [
     "(car (cdr (cdr (list 10 20 30))))의 값은?",
     [
      "30",
      "(30)",
      "20"
     ],
     "cdr 두 번으로 (30), car로 30을 꺼냅니다.",
     [
      "맞습니다.",
      "car를 적용하기 전의 리스트입니다.",
      "cdr을 한 번만 적용했습니다."
     ]
    ]
   ],
   "review": {
    "original": "Vectors: like arrays, more flexibility, especially dynamic resizability. (Scheme)",
    "checked": "표준 Scheme(R5RS·R7RS)의 벡터는 (make-vector n)으로 만들 때 길이를 실행 중 값으로 정할 수 있지만, 만든 뒤에 길이를 늘리거나 줄이는 표준 연산은 없습니다. 만든 뒤에도 크기가 늘어나는 \"동적 벡터\"는 C++ std::vector, Java ArrayList 같은 라이브러리 자료구조의 특징입니다. 원문 문장은 일반적인 벡터 자료구조의 장점을 설명한 것으로 읽는 것이 안전합니다.",
    "label": "보충 설명 · 표준 Scheme 대조",
    "ask": "강의에서 Scheme 벡터의 \"동적 크기\"를 생성 시점의 크기 결정으로 설명했는지 확인하세요."
   },
   "image": "pages/pl09-48.jpg",
   "text": "Vector, List\nFunctional languages: usually do not supply array\n● Vectors: like arrays, more flexibility, especially dynamic resizability.\n\n(Scheme)\n● Lists: like vectors, can only be accessed by counting down from the\n\nfirst element.\n\n48",
   "quiz": [
    "원문에 따르면 리스트의 원소에 접근하는 방식은?",
    [
     "첫 원소부터 차례로 세어 내려간다",
     "인덱스로 바로 접근한다",
     "해시로 찾는다"
    ],
    "원문: can only be accessed by counting down from the first element."
   ],
   "quizReasons": [
    "맞습니다.",
    "벡터·배열의 방식입니다.",
    "원문 내용이 아닙니다."
   ]
  },
  {
   "page": 49,
   "title": "포인터 타입",
   "explanation": "포인터 타입의 값은 메모리 주소들과 특별한 값 nil(null)입니다. 포인터는 주소를 유연하게 다루고(주소 연산, 역참조, 주소 연산자, void *), 동적 메모리를 관리하며(malloc/new, free/delete), 연결 리스트 같은 재귀 자료구조를 만들 수 있게 합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "포인터 타입의 값 = 메모리 주소들 + 특별한 값 nil 또는 null.",
     "장점 ① 주소 지정의 유연성: 주소 산술(ptr + 1), 명시적 역참조(*ptr), 주소 연산자(&var), 가리키는 타입이 정해지지 않은 포인터(void *).",
     "장점 ② 동적 메모리 관리: malloc / new로 할당, free / delete로 해제.",
     "장점 ③ 재귀 자료구조: struct CharListNode { char data; struct CharListNode* next; };"
    ],
    "analogy": "포인터는 \"집 주소가 적힌 쪽지\"입니다. 쪽지 자체는 집이 아니지만, 주소를 따라가면(역참조) 집에 갈 수 있고, 옆집 주소(ptr + 1)도 계산할 수 있습니다. 빈 쪽지(null)는 \"갈 곳 없음\"입니다.",
    "examples": [
     {
      "title": "주소 산술·역참조·동적 할당",
      "code": "int a[3] = {10, 20, 30};\nint *ptr = &a[0];                  /* &: 주소 연산자 */\nprintf(\"%d %d\\n\", *ptr, *(ptr + 1));\n\nint *h = malloc(sizeof(int));      /* 동적 할당 */\n*h = 7;\nprintf(\"%d\\n\", *h);\nfree(h);                           /* 해제 */",
      "lang": "C",
      "out": "10 20\n7",
      "note": "ptr + 1은 주소에 1바이트가 아니라 int 하나 크기(보통 4바이트)를 더한 주소입니다.",
      "error": false
     }
    ],
    "steps": [
     "&a[0]으로 첫 원소의 주소를 ptr에 저장한다.",
     "*ptr은 그 주소의 값 10, *(ptr + 1)은 다음 int 위치의 값 20이다.",
     "malloc이 int 하나 크기의 메모리를 힙에서 할당하고 주소를 돌려준다.",
     "*h = 7로 그곳에 값을 쓰고 읽은 뒤, free로 돌려준다."
    ],
    "trap": [
     "포인터 산술의 단위는 바이트가 아니라 \"가리키는 타입의 크기\"입니다.",
     "void *는 주소만 알고 가리키는 타입을 모르는 포인터라 바로 역참조할 수 없습니다. 사용할 때 다른 포인터 타입으로 바꿉니다(80쪽)."
    ],
    "recap": "포인터 = 주소 + null. 주소 산술·역참조·동적 할당·재귀 자료구조를 가능하게 한다.",
    "source": "PDF 49쪽"
   },
   "quizzes": [
    [
     "포인터 타입의 값의 범위는?",
     [
      "메모리 주소들과 특별한 값 null(nil)",
      "정수만",
      "모든 타입의 값"
     ],
     "원문: range of values consists of memory addresses and a special value, nil, or null.",
     [
      "맞습니다.",
      "주소는 정수와 다른 타입입니다.",
      "가리키는 대상이 아니라 주소입니다."
     ]
    ],
    [
     "int *ptr = &a[0];일 때 *(ptr + 1)이 가리키는 것은?",
     [
      "a[1]",
      "a[0]의 다음 바이트",
      "a[0] + 1의 값"
     ],
     "ptr + 1은 int 하나만큼 뒤의 주소입니다.",
     [
      "맞습니다.",
      "단위는 int 크기입니다.",
      "값에 1을 더한 것이 아닙니다."
     ]
    ],
    [
     "원문의 void *에 대한 설명으로 옳은 것은?",
     [
      "가리키는 대상의 타입이 정해지지 않은 포인터",
      "값이 없는 함수",
      "널 포인터 상수"
     ],
     "원문: domain type not fixed (void *).",
     [
      "맞습니다.",
      "void 반환 함수와 다릅니다.",
      "null과 다릅니다."
     ]
    ]
   ],
   "image": "pages/pl09-49.jpg",
   "text": "Pointer\n● A pointer type: range of values consists of memory addresses and a special\nvalue, nil, or null\n*ptr\n● Advantages:\nptr+1\n○ Addressing flexibility (address arithmetic, explicit dereferencing and\n&var address-of operator, domain type not fixed (void *))\n○ Dynamic storage management e.g.,\n■ malloc /new, free/delete\n○ Recursive data structures, e.g., linked list\nstruct CharListNode{\nchar data;\nstruct CharListNode* next;\n};\ntypedef struct CharListNode* CharList;\n\n49",
   "quiz": [
    "포인터 타입의 값의 범위는?",
    [
     "메모리 주소들과 특별한 값 null(nil)",
     "정수만",
     "모든 타입의 값"
    ],
    "원문: range of values consists of memory addresses and a special value, nil, or null."
   ],
   "quizReasons": [
    "맞습니다.",
    "주소는 정수와 다른 타입입니다.",
    "가리키는 대상이 아니라 주소입니다."
   ]
  },
  {
   "page": 50,
   "title": "포인터와 재귀 타입: 참조 생성자",
   "explanation": "참조(포인터) 생성자는 \"특정 타입을 가리키는 모든 주소의 집합\"을 만듭니다. C의 typedef int* IntPtr;가 그 예입니다. 자동 메모리 관리를 하는 언어에서는 포인터가 암묵적입니다. Java의 모든 객체는 new로 명시적으로 할당되지만, 해제는 가비지 컬렉션이 자동으로 합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "참조/포인터 생성자: 지정한 타입을 가리키는 모든 주소의 집합을 만든다.",
     "typedef int* IntPtr; → 정수가 저장된 모든 주소들의 타입.",
     "자동 메모리 관리를 하는 언어에서는 포인터가 겉으로 드러나지 않는다(암묵적).",
     "Java: 모든 객체는 사실상 포인터(참조)로 다뤄진다. new로 명시적 할당, 가비지 컬렉션(GC)으로 자동 해제."
    ],
    "analogy": "C는 \"직접 주소를 적고 집도 직접 허무는 도시\"(포인터·free), Java는 \"주소는 내부적으로 관리하고, 아무도 찾지 않는 빈집은 청소 업체(GC)가 알아서 치우는 도시\"입니다.",
    "examples": [
     {
      "title": "Java 참조는 암묵적 포인터",
      "code": "int[] a = {1, 2, 3};\nint[] b = a;          // 배열을 복사하지 않고 같은 객체를 가리킴\nb[0] = 99;\nSystem.out.println(a[0]);\na = null;             // 이제 a는 아무것도 가리키지 않음\nb = null;             // 배열을 가리키는 참조가 없어지면 GC가 회수할 수 있음",
      "lang": "Java",
      "out": "99",
      "note": "b[0]을 바꾸었는데 a[0]도 99입니다. a와 b가 같은 객체를 가리키는 포인터처럼 동작하기 때문입니다(별칭).",
      "error": false
     }
    ],
    "steps": [
     "new(여기서는 배열 초기화)로 힙에 배열 객체를 만들고, a에 그 위치(참조)를 저장한다.",
     "b = a는 참조를 복사한다 → 두 변수가 같은 객체를 가리킨다.",
     "b[0] = 99는 그 객체를 바꾸므로 a[0]도 99로 보인다.",
     "객체를 가리키는 참조가 모두 사라지면 GC가 나중에 메모리를 회수한다. free 같은 명시적 해제는 없다."
    ],
    "trap": [
     "Java에 \"포인터가 없다\"는 말은 주소 산술(ptr + 1)이나 직접 해제가 없다는 뜻이지, 객체를 가리키는 개념이 없다는 뜻이 아닙니다.",
     "GC가 회수하는 \"시점\"은 정해져 있지 않습니다. null을 넣는 즉시 해제되는 것이 아닙니다."
    ],
    "recap": "포인터 생성자 = 어떤 타입을 가리키는 주소의 집합. Java 객체는 암묵적 포인터이며 new로 할당, GC로 해제.",
    "source": "PDF 50쪽"
   },
   "quizzes": [
    [
     "C의 typedef int* IntPtr;가 만드는 타입은?",
     [
      "정수가 저장된 주소들의 타입",
      "정수 배열 타입",
      "정수와 같은 타입"
     ],
     "원문: Constructs the type of all addresses where integers are stored.",
     [
      "맞습니다.",
      "배열이 아닙니다.",
      "int와 다른 타입입니다."
     ]
    ],
    [
     "Java 객체의 메모리 해제는 어떻게 이루어지는가?",
     [
      "가비지 컬렉션이 자동으로 한다",
      "delete로 명시적으로 한다",
      "해제되지 않는다"
     ],
     "원문: deallocated automatically by garbage collection.",
     [
      "맞습니다.",
      "C++의 방식입니다.",
      "GC가 회수합니다."
     ]
    ],
    [
     "int[] a = {1, 2, 3}; int[] b = a; b[0] = 99; 다음 a[0]은?",
     [
      "99",
      "1",
      "컴파일 오류"
     ],
     "a와 b가 같은 배열 객체를 가리킵니다.",
     [
      "맞습니다.",
      "배열이 복사되지 않았습니다.",
      "합법입니다."
     ]
    ]
   ],
   "image": "pages/pl09-50.jpg",
   "text": "Pointers and Recursive Types\n\n• Reference or pointer constructor: constructs the set of all addresses\n•\n\nthat refer to a specified type\nExample in C: typedef int* IntPtr;\n\n– Constructs the type of all addresses where integers are stored\n\n• Pointers are implicit in languages that perform automatic memory\nmanagement\n– In Java, all objects are implicitly pointers that are allocated explicitly\n(using the new operator) but deallocated automatically by garbage\ncollection\n\n50",
   "quiz": [
    "C의 typedef int* IntPtr;가 만드는 타입은?",
    [
     "정수가 저장된 주소들의 타입",
     "정수 배열 타입",
     "정수와 같은 타입"
    ],
    "원문: Constructs the type of all addresses where integers are stored."
   ],
   "quizReasons": [
    "맞습니다.",
    "배열이 아닙니다.",
    "int와 다른 타입입니다."
   ]
  },
  {
   "page": 51,
   "title": "C++ 참조(reference)와 포인터",
   "explanation": "이 쪽의 예제는 Java가 아니라 C++의 참조입니다. 참조(&)는 시스템이 관리하는 객체의 주소로, 값처럼 다루거나 연산할 수 없고(복사만 가능) 객체의 별칭(alias)으로 동작합니다. 포인터는 프로그래머가 값으로 다루고 조작할 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "참조: 시스템이 관리하는 객체의 주소. 값으로 쓰거나 연산할 수 없다(복사 제외) → 객체의 별칭.",
     "포인터: 값으로 쓸 수 있고 프로그래머가 조작할 수 있다(주소 산술, 다른 객체로 바꾸기 등).",
     "C++ 참조는 타입 뒤에 &를 붙여 만든다: double& s = r;",
     "s는 r의 다른 이름이다. s += 1은 r을 바꾼다 → cout << r은 3.3."
    ],
    "analogy": "참조는 \"별명\"입니다. 철수의 별명이 \"뭉치\"라면 뭉치에게 모자를 씌우는 것은 철수에게 씌우는 것과 같습니다. 별명을 다른 사람에게 옮겨 붙일 수는 없습니다. 포인터는 \"손가락으로 가리키기\"라서 다른 사람을 가리키도록 바꿀 수 있습니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "double r = 2.3;\ndouble& s = r;     // s is a reference to r. C++ only\ns += 1;\ncout << r << endl;",
      "lang": "C++",
      "out": "3.3",
      "note": "",
      "error": false
     },
     {
      "title": "같은 일을 포인터로",
      "code": "double r = 2.3;\ndouble* p = &r;    // 주소를 값으로 저장\n*p += 1;           // 명시적 역참조\ncout << r << endl;\np = nullptr;       // 포인터는 다른 값으로 바꿀 수 있음",
      "lang": "C++",
      "out": "3.3",
      "note": "참조는 *를 쓰지 않아도 자동으로 r에 접근합니다. 대신 s가 다른 변수를 가리키도록 바꿀 수 없습니다.",
      "error": false
     }
    ],
    "steps": [
     "double& s = r;로 s를 r에 묶는다. 이후 s는 r과 같은 저장 공간을 뜻한다.",
     "s += 1은 r의 값을 2.3에서 3.3으로 바꾼다.",
     "cout << r은 3.3을 출력한다.",
     "포인터 버전은 &r로 주소를 얻고 *p로 역참조해야 하며, p 자체를 다른 주소로 바꿀 수 있다."
    ],
    "trap": [
     "이 쪽의 &는 두 가지로 쓰입니다. 선언의 double& s는 \"참조 타입\", 식의 &r은 \"주소 연산자\"입니다.",
     "Java의 참조 변수는 다른 객체를 가리키도록 다시 대입할 수 있어 C++ 참조와 다릅니다. \"복사만 가능하고 연산은 불가\"라는 원문 정의는 Java 참조에도 맞지만, 이 쪽의 코드는 C++입니다.",
     "C에는 참조 타입이 없습니다(원문 주석 \"C++ only\")."
    ],
    "recap": "C++ 참조 = 객체의 별칭(조작 불가). 포인터 = 프로그래머가 값으로 다루는 주소. double& s = r; s += 1;은 r을 바꾼다.",
    "source": "PDF 51쪽"
   },
   "quizzes": [
    [
     "원문 예제에서 cout << r << endl;의 출력은?",
     [
      "3.3",
      "2.3",
      "1"
     ],
     "s는 r의 별칭이므로 s += 1이 r을 바꿉니다.",
     [
      "맞습니다.",
      "별칭을 통해 바뀌었습니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "double& s = r;에서 s의 성격은?",
     [
      "r의 별칭(참조)",
      "r의 값을 복사한 새 변수",
      "r의 주소를 담은 포인터 변수"
     ],
     "원문: Alias of an object.",
     [
      "맞습니다.",
      "복사라면 r이 바뀌지 않습니다.",
      "포인터처럼 값으로 조작할 수 없습니다."
     ]
    ],
    [
     "원문에 따른 참조와 포인터의 차이는?",
     [
      "포인터는 값으로 조작할 수 있고, 참조는 복사 외에는 조작할 수 없다",
      "참조는 주소 산술이 가능하다",
      "포인터는 C++에만 있다"
     ],
     "원문: Reference — cannot be used as a value or operated on (except copying). Pointer — can be manipulated.",
     [
      "맞습니다.",
      "반대입니다.",
      "포인터는 C에도 있습니다."
     ]
    ]
   ],
   "image": "pages/pl09-51.jpg",
   "text": "Pointers and Recursive Types (cont’d.)\n\n• Reference(&): address of an object under control of the system that\ncannot be used as a value or operated on in any way (except copying)\n\n• Alias of an object\n• Pointer: can be used as a value and manipulated by the programmer\n• References in C++ are created by a postfix & operator\ndouble r= 2.3;\ndouble& s = r;\n\n// s is a reference to r. C++ only\n\ns +=1;\ncout << r << endl; // prints 3.3\n51",
   "quiz": [
    "원문 예제에서 cout << r << endl;의 출력은?",
    [
     "3.3",
     "2.3",
     "1"
    ],
    "s는 r의 별칭이므로 s += 1이 r을 바꿉니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "별칭을 통해 바뀌었습니다.",
    "근거가 없습니다."
   ]
  },
  {
   "page": 52,
   "title": "포인터와 배열",
   "explanation": "C에서 배열 a와 포인터 p = a는 같은 방식으로 원소에 접근할 수 있습니다. a[2]는 *(a + 2)의 줄임 표현이고, 덧셈은 교환법칙이 성립하므로 2[a]도 같은 원소를 가리킵니다. 다만 원문의 \"배열은 첫 원소에 대한 상수 포인터\"라는 문장은 보충이 필요합니다(아래 자료 검토).",
   "kind": "lesson",
   "lesson": {
    "core": [
     "int* p = a; → 대부분의 식에서 배열 a는 첫 원소의 주소로 변환된다. p는 a[0]을 가리킨다.",
     "*p = a[0] = 1, *(p + 2) = a[2] = 3, *(a + 2) = 3.",
     "a[2]는 *(a + 2)의 줄임 표현이다.",
     "*(a + 2) = *(2 + a)이므로 2[a]도 3이다(덧셈의 교환법칙).",
     "정확한 규칙: 배열과 포인터는 다른 타입이다. sizeof a, &a 등에서는 배열이 포인터로 변환되지 않는다."
    ],
    "analogy": "배열은 \"아파트 단지\", 포인터는 \"단지 1동 주소가 적힌 쪽지\"입니다. 길 안내를 할 때는 단지 이름이 1동 주소로 바뀌어 쓰이지만(대부분의 식), \"단지 전체 면적\"(sizeof)을 물으면 쪽지 크기가 아니라 단지 크기를 답합니다.",
    "examples": [
     {
      "title": "원문 예제 + sizeof 비교",
      "code": "int a[] = {1, 2, 3, 4, 5};\nint* p = a;                  /* p는 a[0]을 가리킴 */\nprintf(\"%d\\n\", *p);          /* a[0] */\nprintf(\"%d\\n\", *(p + 2));    /* a[2] */\nprintf(\"%d\\n\", *(a + 2));    /* a[2] */\nprintf(\"%d\\n\", 2[a]);        /* *(2 + a) = a[2] */\nprintf(\"%zu %zu\\n\", sizeof a, sizeof p);",
      "lang": "C",
      "out": "1\n3\n3\n3\n20 8",
      "note": "마지막 줄은 보충 예제입니다. sizeof a는 배열 전체(5 × 4 = 20바이트), sizeof p는 포인터 크기(64비트에서 8)입니다. 둘이 같은 것이라면 크기가 같아야 합니다.",
      "error": false,
      "outLabel": "실행 결과 예 · 64비트"
     }
    ],
    "steps": [
     "int* p = a;에서 a는 첫 원소 주소로 변환되어 p에 저장된다.",
     "*(p + 2): p에서 int 두 개만큼 이동한 위치의 값 → 3.",
     "*(a + 2): 식 안의 a도 첫 원소 주소로 변환된다 → 같은 계산 → 3.",
     "2[a]는 정의상 *(2 + a)이고, 2 + a = a + 2이므로 3.",
     "sizeof a에서는 변환이 일어나지 않아 배열 전체 크기 20이 나온다."
    ],
    "trap": [
     "\"배열 = 포인터\"로 외우면 sizeof, &a(배열 전체의 주소, 타입 int (*)[5]), 배열에 대입 불가(a = p는 오류) 같은 문제를 틀립니다.",
     "2[a]는 합법이지만 읽기 어려워 실제 코드에서는 쓰지 않습니다. 시험에서는 a[i] ≡ *(a + i)를 보여 주는 예로만 기억하세요."
    ],
    "recap": "a[i] ≡ *(a + i). 배열은 대부분의 식에서 첫 원소 포인터로 변환되지만, 배열과 포인터는 다른 타입이다(sizeof 등은 예외).",
    "source": "PDF 52쪽"
   },
   "quizzes": [
    [
     "원문 예제에서 printf(\"%d\\n\", *(p+2));의 출력은?",
     [
      "3",
      "2",
      "1"
     ],
     "p + 2는 a[2]의 주소이고 a[2] = 3입니다.",
     [
      "맞습니다.",
      "포인터 값에 2를 더한 것이 아니라 원소 두 개를 이동했습니다.",
      "*p의 값입니다."
     ]
    ],
    [
     "2[a]가 a[2]와 같은 이유는?",
     [
      "a[i]가 *(a + i)의 줄임이고 덧셈은 교환법칙이 성립하기 때문",
      "2가 배열 이름으로 바뀌기 때문",
      "컴파일러가 오타를 고쳐 주기 때문"
     ],
     "a[2] = *(a + 2) = *(2 + a) = 2[a].",
     [
      "맞습니다.",
      "근거가 없습니다.",
      "정의에 따른 합법 코드입니다."
     ]
    ],
    [
     "C에서 배열 a가 첫 원소 포인터로 변환되지 않는 경우는?",
     [
      "sizeof a",
      "함수 호출 f(a)",
      "포인터 초기화 int *p = a"
     ],
     "sizeof의 피연산자인 배열은 배열 그대로입니다.",
     [
      "맞습니다.",
      "변환됩니다(39쪽).",
      "변환됩니다."
     ]
    ]
   ],
   "review": {
    "original": "Array are implicitly constant pointers to their first component.",
    "checked": "배열은 포인터가 아닙니다. 배열 타입(int[5])과 포인터 타입(int *)은 다른 타입이고 크기도 다릅니다(sizeof a = 20, sizeof p = 8). 정확한 규칙은 \"대부분의 식에서 배열이 첫 원소를 가리키는 포인터로 변환된다(array-to-pointer conversion)\"입니다. 예외는 sizeof의 피연산자, 단항 &의 피연산자, 문자 배열을 초기화하는 문자열 리터럴입니다. 원문 표현은 변환 결과가 수정할 수 없는 값(a = p 불가)이라는 점을 \"상수 포인터\"로 단순화한 설명입니다.",
    "label": "원문 단순화 · C 표준 규칙으로 보충",
    "ask": "시험에서 \"배열은 상수 포인터\"라는 원문 표현을 그대로 쓰는지 확인하세요."
   },
   "image": "pages/pl09-52.jpg",
   "text": "Pointer and Array\n● Array are implicitly constant pointers to their first component.\n\nint a[] = {1,2,3,4,5};\nint* p = a;\n\n// a[0] = 1, etc.\n\n// p points to first component of a\n\nprintf(\"%d\\n\", *p);\n\n// prints value of a[0], so 1\n\nprintf(\"%d\\n\", *(p+2)); // prints value of a[2]= 3\nprintf(\"%d\\n\", *(a+2)); // also prints 3\nprintf(\"%d\\n\", 2[a]);\n\n// also prints 3!\na[2] : shortcut of *(a +2)\nby the commutative addition *(a + 2)\n52",
   "quiz": [
    "원문 예제에서 printf(\"%d\\n\", *(p+2));의 출력은?",
    [
     "3",
     "2",
     "1"
    ],
    "p + 2는 a[2]의 주소이고 a[2] = 3입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "포인터 값에 2를 더한 것이 아니라 원소 두 개를 이동했습니다.",
    "*p의 값입니다."
   ]
  },
  {
   "page": 53,
   "title": "재귀 타입: 자기 자신을 포함하는 타입",
   "explanation": "재귀 타입은 선언 안에서 자기 자신을 쓰는 타입입니다. C에서 struct CharList 안에 struct CharList next;를 직접 넣는 것은 불법입니다. C는 모든 데이터 타입의 최대 크기가 번역 시점에 고정되어야 하는데, 자기 자신을 통째로 포함하면 크기가 무한해지기 때문입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "재귀 타입: 자신의 선언 안에서 자신을 사용하는 타입.",
     "struct CharList { char data; struct CharList next; }; → C에서 불법.",
     "C의 데이터 할당 전략: 각 데이터 타입은 번역 시점에 정해진 고정 최대 크기를 가져야 한다.",
     "next가 CharList 전체를 담으면 크기 = 1 + 크기(CharList) → 끝없이 커져 정할 수 없다.",
     "해결: 포인터를 써서 수동으로 동적 할당한다(54쪽)."
    ],
    "analogy": "러시아 인형(마트료시카)이 \"자기와 똑같은 크기의 인형\"을 안에 넣어야 한다면 영원히 끝나지 않습니다. 대신 \"다음 인형이 있는 위치를 적은 쪽지\"(포인터)를 넣으면 쪽지 크기는 일정합니다.",
    "examples": [
     {
      "title": "직접 포함하면",
      "code": "struct CharList {\n    char data;\n    struct CharList next;   /* not legal in C! */\n};",
      "lang": "C",
      "out": "error: field 'next' has incomplete type",
      "note": "구조체 정의가 끝나기 전에는 struct CharList의 크기를 알 수 없어 \"불완전 타입\" 오류가 납니다.",
      "error": true
     }
    ],
    "steps": [
     "컴파일러는 struct CharList의 크기를 계산하려 한다.",
     "data는 1바이트, next는 struct CharList 크기만큼 필요하다.",
     "next의 크기를 알려면 다시 struct CharList의 크기를 알아야 한다 → 끝없는 반복.",
     "크기를 고정할 수 없으므로 C는 이 선언을 거부한다."
    ],
    "trap": [
     "재귀 타입 자체가 나쁜 것은 아닙니다. 포인터로 연결하면 C에서도 만들 수 있고, ML 같은 언어는 재귀 타입을 직접 선언할 수 있습니다."
    ],
    "recap": "자기 자신을 값으로 포함하는 구조체는 크기를 정할 수 없어 C에서 불법이다. 포인터로 연결한다.",
    "source": "PDF 53쪽"
   },
   "quizzes": [
    [
     "struct CharList { char data; struct CharList next; };가 C에서 불법인 이유는?",
     [
      "구조체 크기가 무한해져 번역 시점에 정할 수 없기 때문",
      "char와 struct를 섞을 수 없기 때문",
      "필드 이름 next가 예약어이기 때문"
     ],
     "C는 각 타입의 크기가 번역 시점에 고정되어야 합니다.",
     [
      "맞습니다.",
      "섞을 수 있습니다.",
      "예약어가 아닙니다."
     ]
    ],
    [
     "C에서 재귀 구조를 만드는 방법은?",
     [
      "자기 타입을 가리키는 포인터 필드를 둔다",
      "필드를 union으로 바꾼다",
      "typedef로 이름만 바꾼다"
     ],
     "원문: Use pointer to allow manual dynamic allocation.",
     [
      "맞습니다.",
      "크기 문제를 해결하지 못합니다.",
      "이름만 바뀝니다."
     ]
    ],
    [
     "원문이 말한 C의 데이터 할당 원칙은?",
     [
      "각 데이터 타입은 번역 시점에 정해진 고정 최대 크기를 가져야 한다",
      "모든 데이터는 힙에 할당된다",
      "구조체 크기는 실행 중에 정해진다"
     ],
     "원문: each data type should have a fixed maximum size determined at translation time.",
     [
      "맞습니다.",
      "근거가 없습니다.",
      "반대입니다."
     ]
    ]
   ],
   "image": "pages/pl09-53.jpg",
   "text": "Recursive Type\n● Recursive type: a type that uses itself in its declaration\n\nstruct CharList{\nchar data;\nstruct CharList next; // not legal in C!\n};\n\n• C’s data allocation strategy: each data type should have a fixed\nmaximum size determined at translation time.\n• Use pointer to allow manual dynamic allocation\n\n53",
   "quiz": [
    "struct CharList { char data; struct CharList next; };가 C에서 불법인 이유는?",
    [
     "구조체 크기가 무한해져 번역 시점에 정할 수 없기 때문",
     "char와 struct를 섞을 수 없기 때문",
     "필드 이름 next가 예약어이기 때문"
    ],
    "C는 각 타입의 크기가 번역 시점에 고정되어야 합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "섞을 수 있습니다.",
    "예약어가 아닙니다."
   ]
  },
  {
   "page": 54,
   "title": "재귀 타입: 포인터로 연결하기",
   "explanation": "필드를 struct CharListNode* next;처럼 포인터로 바꾸면 C에서도 합법입니다. 포인터의 크기는 정해져 있으므로 구조체 크기를 계산할 수 있습니다. 노드는 malloc으로 실행 중에 만들고, next = 0(널 포인터)으로 리스트의 끝을 표시합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "struct CharListNode { char data; struct CharListNode* next; }; → 합법.",
     "typedef struct CharListNode* Charlist; → 노드를 가리키는 포인터 타입에 이름을 붙인다.",
     "Charlist c1 = (Charlist) malloc(sizeof(struct CharListNode)); → 노드 하나를 힙에 할당.",
     "(*c1).data = 'a'; (*c1).next = 0; → 데이터를 넣고, 다음 노드가 없음을 표시한다.",
     "(*c1).data는 c1->data와 같은 뜻이다."
    ],
    "analogy": "이제 인형 안에는 \"다음 인형 위치 쪽지\"만 들어 있습니다. 쪽지가 비어 있으면(0) 마지막 인형입니다. 새 인형은 필요할 때마다 창고(힙)에서 꺼내 옵니다.",
    "examples": [
     {
      "title": "노드 두 개로 리스트 만들기",
      "code": "struct CharListNode {\n    char data;\n    struct CharListNode* next;     /* now legal in C! */\n};\ntypedef struct CharListNode* Charlist;\n\nCharlist c1 = (Charlist) malloc(sizeof(struct CharListNode));\n(*c1).data = 'a';\n(*c1).next = 0;                    /* 끝 표시 */\n\nCharlist c2 = malloc(sizeof(struct CharListNode));\nc2->data = 'b';\nc2->next = 0;\nc1->next = c2;                     /* a → b */\n\nfor (Charlist p = c1; p != 0; p = p->next)\n    printf(\"%c \", p->data);",
      "lang": "C",
      "out": "a b ",
      "note": "c1 부분은 원문 그대로이고, c2를 연결하고 출력하는 부분은 보충 예제입니다.",
      "error": false
     }
    ],
    "steps": [
     "sizeof(struct CharListNode) = char 1바이트 + (정렬용 빈 공간) + 포인터 크기 → 고정된 값.",
     "malloc으로 c1 노드를 만들고 data = 'a', next = 0으로 채운다.",
     "c2 노드를 만들어 data = 'b'로 채우고 c1->next에 c2의 주소를 넣는다.",
     "반복문은 p = c1에서 시작해 p->next를 따라가며 0을 만나면 멈춘다 → a b 출력."
    ],
    "trap": [
     "(*c1).data에서 괄호가 필요합니다. *c1.data는 *(c1.data)로 해석되어 오류입니다. 그래서 c1->data를 주로 씁니다.",
     "next = 0의 0은 널 포인터 상수입니다. 리터럴 0이 정수이면서 모든 포인터 타입의 값이 될 수 있다는 점은 72쪽에서 다룹니다.",
     "원문 코드에는 CharList(53쪽)와 Charlist(54쪽)가 섞여 있습니다. 서로 다른 이름이므로 한 이름으로 통일해 읽으세요."
    ],
    "recap": "포인터 필드로 자기 타입을 가리키면 크기가 고정되어 재귀 자료구조를 만들 수 있다. 끝은 null(0)로 표시한다.",
    "source": "PDF 54쪽"
   },
   "quizzes": [
    [
     "(*c1).data와 같은 의미의 표현은?",
     [
      "c1->data",
      "*c1.data",
      "&c1.data"
     ],
     "포인터가 가리키는 구조체의 멤버는 ->로 접근할 수 있습니다.",
     [
      "맞습니다.",
      "연산자 우선순위 때문에 다른 뜻입니다.",
      "주소 연산자입니다."
     ]
    ],
    [
     "(*c1).next = 0;의 의미는?",
     [
      "다음 노드가 없다(널 포인터)",
      "다음 노드의 data가 0이다",
      "c1을 해제한다"
     ],
     "0은 널 포인터로 리스트의 끝을 표시합니다.",
     [
      "맞습니다.",
      "next는 노드의 주소입니다.",
      "해제는 free입니다."
     ]
    ],
    [
     "struct CharListNode의 크기를 번역 시점에 정할 수 있는 이유는?",
     [
      "next가 포인터라 크기가 고정되어 있기 때문",
      "malloc이 크기를 정해 주기 때문",
      "노드가 하나뿐이기 때문"
     ],
     "포인터 크기는 가리키는 대상과 관계없이 일정합니다.",
     [
      "맞습니다.",
      "malloc은 sizeof로 계산한 크기를 받습니다.",
      "노드 수와 무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-54.jpg",
   "text": "Recursive Type (Cont’d)\nstruct CharListNode{\nchar data;\nstruct CharListNode* next; //now legal in C!\n};\ntypedef struct CharListNode* Charlist;\nCharlist c1 = (Charlist) malloc(sizeof(struct\nCharListNode));\n(*c1).data = ‘a’;\n(*c1).next = 0;\n\n54",
   "quiz": [
    "(*c1).data와 같은 의미의 표현은?",
    [
     "c1->data",
     "*c1.data",
     "&c1.data"
    ],
    "포인터가 가리키는 구조체의 멤버는 ->로 접근할 수 있습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "연산자 우선순위 때문에 다른 뜻입니다.",
    "주소 연산자입니다."
   ]
  },
  {
   "page": 55,
   "title": "구분 · 타입 동등성",
   "explanation": "\"Type Equivalence\" 단원의 구분 쪽입니다. 두 타입이 \"같은 타입\"인지 판단하는 두 가지 기준(구조적 동등성, 이름 동등성)과 언어별 규칙을 다룹니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-55.jpg",
   "text": "Type Equivalence\n\n55"
  },
  {
   "page": 56,
   "title": "타입 동등성: 구조적 동등성과 이름 동등성",
   "explanation": "두 타입이 같은지 판단하는 대표적인 방법은 두 가지입니다. 구조적 동등성은 \"같은 모양으로 만들어졌으면 같다\", 이름 동등성은 \"같은 이름이어야 같다\"입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "질문: 두 데이터 타입이 같은지 어떻게 결정하는가?",
     "구조적 동등성(structural equivalence): 같은 구조를 가지면 같은 타입. 즉 같은 단순 타입에서 같은 타입 생성자를 같은 방식으로 적용해 만든 타입.",
     "이름 동등성(name equivalence): 이름이 같을 때만 같은 타입.",
     "이름 동등성에서 두 변수는 선언에 정확히 같은 타입 이름을 쓸 때만 타입이 같다."
    ],
    "analogy": "구조적 동등성은 \"설계도가 같으면 같은 집\"으로 보고, 이름 동등성은 \"주소(이름)가 같아야 같은 집\"으로 봅니다. 쌍둥이 아파트 두 동은 설계도로 보면 같지만, 주소로 보면 다른 집입니다.",
    "examples": [
     {
      "title": "같은 모양, 다른 이름",
      "code": "typedef struct { int x; } A;\ntypedef struct { int x; } B;\nA a;  B b;\na = b;      /* 구조로 보면 같음, 이름으로 보면 다름 */",
      "lang": "C",
      "out": "error: incompatible types when assigning to type 'A' from type 'B' ",
      "note": "C는 구조체에 이름 동등성을 쓰므로(64쪽) 거부합니다. 구조적 동등성을 쓰는 언어라면 허용됩니다.",
      "error": true
     }
    ],
    "steps": [
     "A와 B의 구조를 펼친다: 둘 다 struct { int x; }.",
     "구조적 동등성: 같은 생성자(struct)로 같은 단순 타입(int)과 같은 필드에서 만들었다 → 같은 타입.",
     "이름 동등성: 타입 이름 A와 B가 다르다 → 다른 타입.",
     "언어가 어느 기준을 쓰는지에 따라 a = b의 적법성이 갈린다."
    ],
    "trap": [
     "\"이름\"은 변수 이름이 아니라 타입 이름입니다. A a;와 A c;의 a, c는 이름이 달라도 같은 타입 이름 A를 쓰므로 같은 타입입니다."
    ],
    "recap": "구조적 동등성 = 같은 방식으로 만든 같은 구조면 같다. 이름 동등성 = 같은 타입 이름일 때만 같다.",
    "source": "PDF 56쪽"
   },
   "quizzes": [
    [
     "이름 동등성이 중심으로 삼는 것은?",
     [
      "타입 선언의 정체성(타입 이름)",
      "메모리 크기",
      "필드 값의 일치 여부"
     ],
     "이름 동등성은 같은 타입 이름을 썼는지로 판단합니다.",
     [
      "맞습니다.",
      "크기는 기준이 아닙니다.",
      "값이 아니라 타입을 비교합니다."
     ]
    ],
    [
     "원문의 구조적 동등성 정의로 옳은 것은?",
     [
      "같은 단순 타입에서 같은 타입 생성자를 같은 방식으로 적용해 만든 타입",
      "이름이 같은 타입",
      "크기가 같은 타입"
     ],
     "원문: Built in the same way using the same type constructors from the same simple types.",
     [
      "맞습니다.",
      "이름 동등성입니다.",
      "크기는 기준이 아닙니다."
     ]
    ],
    [
     "typedef struct { int x; } A;와 typedef struct { int x; } B;는?",
     [
      "구조적으로는 같고, 이름으로는 다르다",
      "구조적으로도 이름으로도 같다",
      "구조적으로도 이름으로도 다르다"
     ],
     "구조는 같고 타입 이름은 다릅니다.",
     [
      "맞습니다.",
      "이름이 다릅니다.",
      "구조는 같습니다."
     ]
    ]
   ],
   "image": "pages/pl09-56.jpg",
   "text": "Type Equivalence\n● How to decide if two types are the same?\n● Structural equivalence: two data types are the same if they have the\n\nsame structure\n○ Built in the same way using the same type constructors from\nthe same simple types\n● Name equivalence: two types are the same only if they have the\nsame name\n○ Two variables are type equivalent only if their declarations use\nexactly the same type name\n56",
   "quiz": [
    "이름 동등성이 중심으로 삼는 것은?",
    [
     "타입 선언의 정체성(타입 이름)",
     "메모리 크기",
     "필드 값의 일치 여부"
    ],
    "이름 동등성은 같은 타입 이름을 썼는지로 판단합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "크기는 기준이 아닙니다.",
    "값이 아니라 타입을 비교합니다."
   ]
  },
  {
   "page": 57,
   "title": "구조적 동등성 예: Rec1, Rec2, Rec3",
   "explanation": "Rec1과 Rec2는 char × int × char[10]으로 구조가 같아 구조적으로 동등합니다. Rec3은 필드 순서가 int × char × char[10]이라 Rec1과 구조적으로 동등하지 않습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "struct Rec1 { char x; int y; char z[10]; }; → char × int × char[10].",
     "struct Rec2 { char x; int y; char z[10]; }; → char × int × char[10] → Rec1과 구조적으로 동등.",
     "struct Rec3 { int y; char x; char z[10]; }; → int × char × char[10] → Rec1과 동등하지 않음.",
     "비교 방법: 각 구조체를 필드 순서대로 곱으로 바꾼 뒤 비교한다."
    ],
    "analogy": "세 개의 레고 탑이 있습니다. Rec1과 Rec2는 \"빨강-파랑-노랑 10칸\" 순서로 같고, Rec3은 \"파랑-빨강-노랑 10칸\"이라 블록 종류는 같아도 쌓은 순서가 다릅니다.",
    "examples": [
     {
      "title": "곱으로 바꿔 비교",
      "code": "",
      "lang": "",
      "out": "Rec1 = char × int × char[10]\nRec2 = char × int × char[10]   → Rec1과 같음 (구조적 동등)\nRec3 = int  × char × char[10]  → 첫 성분부터 다름 (동등하지 않음)",
      "note": "",
      "error": false,
      "outLabel": "비교"
     }
    ],
    "steps": [
     "Rec1의 필드를 순서대로 읽는다: char, int, char[10].",
     "Rec2도 같은 순서 → 같은 곱 → 구조적으로 동등.",
     "Rec3은 int, char, char[10] → 첫 성분이 int ≠ char.",
     "곱은 순서가 중요하므로(24쪽) Rec3은 Rec1과 구조적으로 동등하지 않다."
    ],
    "trap": [
     "이 예에서는 필드 이름(x, y, z)도 같습니다. 이름까지 고려할지는 59쪽에서 따로 다룹니다.",
     "C 자체는 struct에 이름 동등성을 쓰므로 Rec1과 Rec2도 C에서는 다른 타입입니다. 이 쪽은 \"구조적 동등성이라는 기준을 적용하면\"이라는 설명입니다."
    ],
    "recap": "구조적 동등성 비교 = 필드를 순서대로 곱으로 펼쳐 비교. 순서가 다르면 동등하지 않다.",
    "source": "PDF 57쪽"
   },
   "quizzes": [
    [
     "Rec1과 Rec2의 관계는?",
     [
      "구조적으로 동등하다",
      "구조적으로 동등하지 않다",
      "이름 동등하다"
     ],
     "둘 다 char × int × char[10]입니다.",
     [
      "맞습니다.",
      "구조가 같습니다.",
      "이름(Rec1, Rec2)이 다릅니다."
     ]
    ],
    [
     "Rec1과 Rec3이 구조적으로 동등하지 않은 이유는?",
     [
      "필드 순서가 달라 곱이 다르기 때문",
      "필드 개수가 다르기 때문",
      "배열 크기가 다르기 때문"
     ],
     "char × int × … 와 int × char × …는 다른 곱입니다.",
     [
      "맞습니다.",
      "둘 다 세 개입니다.",
      "둘 다 char[10]입니다."
     ]
    ],
    [
     "Rec3을 곱으로 나타내면?",
     [
      "int × char × char[10]",
      "char × int × char[10]",
      "int × char × char"
     ],
     "Rec3의 필드 순서는 y(int), x(char), z(char[10])입니다.",
     [
      "맞습니다.",
      "Rec1의 곱입니다.",
      "배열 타입이 빠졌습니다."
     ]
    ]
   ],
   "image": "pages/pl09-57.jpg",
   "text": "Structural Equivalence\n\n• Example:\n– Rec1 and Rec2 are structurally\nequivalent\n– char X int X char[10]\n– Rec1 and Rec3 are not structurally\nequivalent\n– char X int X char[10] vs.\n– int X char X char[10]\n\n57",
   "quiz": [
    "Rec1과 Rec2의 관계는?",
    [
     "구조적으로 동등하다",
     "구조적으로 동등하지 않다",
     "이름 동등하다"
    ],
    "둘 다 char × int × char[10]입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "구조가 같습니다.",
    "이름(Rec1, Rec2)이 다릅니다."
   ]
  },
  {
   "page": 58,
   "title": "구조적 동등성: 배열 크기는 타입의 일부인가?",
   "explanation": "구조적 동등성을 적용하려면 \"타입 생성자를 적용할 때 어떤 정보가 타입에 들어가는가\"를 정해야 합니다. typedef int A1[10];과 typedef int A2[20];은 배열 크기(인덱스 집합의 크기)가 타입의 일부가 아니라면 동등하고, 일부라면 동등하지 않습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "질문: 타입 생성자를 적용할 때 얼마나 많은 정보가 타입에 포함되는가?",
     "typedef int A1[10]; typedef int A2[20];",
     "인덱스 집합의 크기가 배열 타입의 일부가 아니면 → A1과 A2는 구조적으로 동등.",
     "크기가 배열 타입의 일부라면 → 동등하지 않음.",
     "C에서는 크기가 배열 타입의 일부다(int[10] ≠ int[20]). Java에서는 크기가 타입의 일부가 아니다(65쪽)."
    ],
    "analogy": "\"10인용 식탁\"과 \"20인용 식탁\"이 같은 종류인가? \"식탁\"이라는 종류만 보면 같고, \"몇 인용\"까지 종류에 넣으면 다릅니다. 언어가 크기를 종류에 넣느냐가 기준입니다.",
    "examples": [
     {
      "title": "C에서 크기가 타입에 들어가는지 확인",
      "code": "typedef int A1[10];\ntypedef int A2[20];\nA1 x;  A2 y;\nA1 *p = &x;     /* OK: int (*)[10] */\nA1 *q = &y;     /* int (*)[20]을 int (*)[10]에 넣으려 함 */\n\nvoid f(int a[]) { }\nf(x); f(y);     /* 둘 다 OK: 매개변수는 int *로 조정됨 */",
      "lang": "C",
      "out": "warning: initialization of 'int (*)[10]' from incompatible pointer type 'int (*)[20]' ",
      "note": "C에서 int[10]과 int[20]은 다른 타입입니다. 함수 인자로 넘길 때는 둘 다 int *로 변환되므로(39쪽) 차이가 드러나지 않을 뿐입니다. (보충 예제)",
      "error": true,
      "outLabel": "컴파일 결과 예 · GCC"
     }
    ],
    "steps": [
     "A1 = int 원소, 인덱스 0..9의 배열. A2 = int 원소, 인덱스 0..19의 배열.",
     "언어 규칙 A: 배열 타입 = \"원소 타입의 배열\"만 기록 → A1과 A2는 같은 구조.",
     "언어 규칙 B: 배열 타입 = \"원소 타입 + 크기\" 기록 → 크기가 달라 다른 구조.",
     "C는 규칙 B다. 그래서 배열 전체의 주소(&y)를 다른 크기의 배열 포인터에 넣으면 경고(호환되지 않는 타입)가 난다."
    ],
    "trap": [
     "\"C 함수에 int[10]과 int[20]을 모두 넘길 수 있으니 같은 타입\"이라고 생각하면 틀립니다. 매개변수 조정(포인터 변환) 때문에 생기는 현상입니다."
    ],
    "recap": "구조적 동등성에서는 생성자가 어떤 정보(예: 배열 크기)를 타입에 넣는지에 따라 결론이 달라진다. C는 크기를 넣는다.",
    "source": "PDF 58쪽"
   },
   "quizzes": [
    [
     "배열 크기가 배열 타입의 일부가 아닌 언어에서 int[10]과 int[20]은?",
     [
      "구조적으로 동등하다",
      "구조적으로 동등하지 않다",
      "비교할 수 없다"
     ],
     "원문: Yes, if size of the index set is not part of an array type.",
     [
      "맞습니다.",
      "크기가 타입의 일부일 때의 결론입니다.",
      "비교할 수 있습니다."
     ]
    ],
    [
     "C에서 int[10]과 int[20]의 관계는?",
     [
      "크기가 타입의 일부라 서로 다른 타입이다",
      "같은 타입이다",
      "둘 다 int *와 같은 타입이다"
     ],
     "C 배열 타입에는 원소 수가 포함됩니다.",
     [
      "맞습니다.",
      "배열 포인터 대입에서 차이가 드러납니다.",
      "변환될 수 있을 뿐 같은 타입은 아닙니다."
     ]
    ],
    [
     "C에서 void f(int a[])에 int[10]과 int[20]을 모두 넘길 수 있는 이유는?",
     [
      "매개변수가 int *로 조정되고 배열이 포인터로 변환되기 때문",
      "C 배열에는 크기 정보가 없기 때문",
      "두 배열이 같은 타입이기 때문"
     ],
     "39·52쪽의 배열→포인터 변환입니다.",
     [
      "맞습니다.",
      "배열 타입에는 크기가 있습니다.",
      "다른 타입입니다."
     ]
    ]
   ],
   "image": "pages/pl09-58.jpg",
   "text": "Structural Equivalence\n\n• How much information is included in a type under the application of\na type constructor?\n\n• Example: are A1 and A2 structurally equivalent in a language?\n• typedef int A1[10]\n• typedef int A2[20]\n– Yes, if size of the index set is not part of an array type\n– Otherwise, no\n\n58",
   "quiz": [
    "배열 크기가 배열 타입의 일부가 아닌 언어에서 int[10]과 int[20]은?",
    [
     "구조적으로 동등하다",
     "구조적으로 동등하지 않다",
     "비교할 수 없다"
    ],
    "원문: Yes, if size of the index set is not part of an array type."
   ],
   "quizReasons": [
    "맞습니다.",
    "크기가 타입의 일부일 때의 결론입니다.",
    "비교할 수 있습니다."
   ]
  },
  {
   "page": 59,
   "title": "구조적 동등성: 멤버 이름은 어떻게 볼까?",
   "explanation": "배열 크기와 비슷한 질문이 구조체 멤버 이름에도 생깁니다. RecA { char x; int y; }와 RecB { char a; int b; }는 단순한 데카르트 곱으로 보면 같습니다. 하지만 대부분의 언어는 동등하지 않다고 봅니다. 멤버에 접근할 때 서로 다른 이름(.x와 .a)을 써야 하기 때문입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "RecA = char × int (이름 x, y), RecB = char × int (이름 a, b).",
     "구조체를 단지 데카르트 곱으로 본다면 → 구조적으로 동등.",
     "대부분의 언어에서는 동등하지 않다 → 멤버 데이터에 접근하는 이름이 다르기 때문(RecA: .x, RecB: .a).",
     "즉 대부분의 언어는 멤버 이름을 구조의 일부로 본다(25·26쪽과 같은 결론)."
    ],
    "analogy": "모양이 같은 두 리모컨이 있는데, 한쪽 버튼에는 \"전원/음량\", 다른 쪽에는 \"켜기/소리\"라고 적혀 있습니다. 회로는 같아도 \"전원 버튼 눌러\"라는 설명서는 한쪽에만 맞습니다.",
    "examples": [
     {
      "title": "같은 코드가 한쪽에서만 통한다",
      "code": "struct RecA { char x; int y; };\nstruct RecB { char a; int b; };\n\nstruct RecA s;  s.x = 'k';   /* OK */\nstruct RecB t;  t.x = 'k';   /* RecB에는 x가 없음 */",
      "lang": "C",
      "out": "error: 'struct RecB' has no member named 'x' ",
      "note": "",
      "error": true
     }
    ],
    "steps": [
     "두 구조체의 필드 타입을 순서대로 비교한다: char × int로 같다.",
     "멤버 이름을 비교한다: x, y vs a, b로 다르다.",
     "이름을 무시하는 순수 곱 관점 → 동등.",
     "이름으로 접근하는 대부분의 언어 관점 → 같은 코드(s.x)를 양쪽에 쓸 수 없으므로 동등하지 않다."
    ],
    "trap": [
     "원문의 \"typically\"(보통)에 주의하세요. 이름을 무시하는 언어 설계도 가능하다는 뜻입니다."
    ],
    "recap": "멤버 이름만 다른 구조체: 순수 곱으로는 동등, 대부분의 언어에서는 접근 이름이 달라 동등하지 않다.",
    "source": "PDF 59쪽"
   },
   "quizzes": [
    [
     "구조체를 단지 데카르트 곱으로 본다면 RecA { char x; int y; }와 RecB { char a; int b; }는?",
     [
      "구조적으로 동등하다",
      "구조적으로 동등하지 않다",
      "이름 동등하다"
     ],
     "원문: If structures are considered to be just Cartesian products, then yes.",
     [
      "맞습니다.",
      "이름을 고려할 때의 결론입니다.",
      "타입 이름이 다릅니다."
     ]
    ],
    [
     "대부분의 언어가 RecA와 RecB를 동등하지 않다고 보는 이유는?",
     [
      "멤버에 접근할 때 서로 다른 이름을 써야 하기 때문",
      "필드 순서가 다르기 때문",
      "크기가 다르기 때문"
     ],
     "원문: different names to access member data (RecA: .x, RecB: .a).",
     [
      "맞습니다.",
      "순서는 같습니다.",
      "크기는 같습니다."
     ]
    ],
    [
     "struct RecB t;에서 t.x = 'k';는?",
     [
      "컴파일 오류",
      "t.a에 'k'가 들어간다",
      "경고 후 실행된다"
     ],
     "RecB에는 x라는 멤버가 없습니다.",
     [
      "맞습니다.",
      "위치로 대신 찾지 않습니다.",
      "오류입니다."
     ]
    ]
   ],
   "image": "pages/pl09-59.jpg",
   "text": "Type Equivalence\n● Similar question arises regarding member names of structures\n● Example: Are these two structures structurally equivalent?\n\n– If structures are considered to be just Cartesian products, then\n\nyes\n– They are typically not considered equivalent in most languages,\nbecause variables of different structures would have to use\ndifferent names to access member data (RecA: .x, RecB:.a)\n59",
   "quiz": [
    "구조체를 단지 데카르트 곱으로 본다면 RecA { char x; int y; }와 RecB { char a; int b; }는?",
    [
     "구조적으로 동등하다",
     "구조적으로 동등하지 않다",
     "이름 동등하다"
    ],
    "원문: If structures are considered to be just Cartesian products, then yes."
   ],
   "quizReasons": [
    "맞습니다.",
    "이름을 고려할 때의 결론입니다.",
    "타입 이름이 다릅니다."
   ]
  },
  {
   "page": 60,
   "title": "타입 이름이 있을 때의 구조 비교",
   "explanation": "선언에 타입 이름이 명시될 수도, 안 될 수도 있습니다. C에서는 이름 없는(익명) 타입으로 변수를 선언할 수 있고, struct·union 태그나 typedef로 이름을 붙일 수도 있습니다. 이름이 있는 타입의 구조적 동등성은 각 이름을 그 선언의 타입 식으로 바꿔 넣어 비교하면 됩니다(재귀 타입은 예외).",
   "kind": "lesson",
   "lesson": {
    "core": [
     "C 변수 선언은 익명 타입을 쓸 수 있다: struct { int a; } v;",
     "이름은 struct/union 태그로 주거나 typedef로 줄 수 있다.",
     "이름이 있을 때 구조적 동등성 검사: 각 타입 이름을 선언된 타입 식으로 치환한 뒤 비교한다.",
     "예: typedef struct { int a; } S; S var1; → var1의 타입 S를 struct { int a; }로 바꾼다.",
     "예외: 재귀 타입. 이름을 치환하면 그 안에 또 이름이 나와 끝나지 않는다."
    ],
    "analogy": "별명으로 불리는 사람들을 비교할 때 \"별명 → 실명\"으로 바꿔 놓고 비교하는 것과 같습니다. 다만 \"자기 이름 안에 자기 이름이 들어간 사람\"은 바꿔도 바꿔도 끝나지 않습니다.",
    "examples": [
     {
      "title": "이름 치환",
      "code": "typedef struct { int a; } S;\nS var1;                      /* S → struct { int a; } */\n\nstruct Node { int v; struct Node *next; };\n/* Node를 치환하면: struct { int v; struct { int v; struct { … } *next; } *next; } */",
      "lang": "C",
      "out": "",
      "note": "첫 예는 한 번 치환으로 끝납니다. 재귀 타입 Node는 치환할 때마다 Node가 다시 나와 끝없이 펼쳐집니다. 그래서 원문은 재귀 타입을 예외로 둡니다(이런 경우 실제 구현은 이미 비교 중인 쌍을 기억하는 방법을 씁니다).",
      "error": false
     }
    ],
    "steps": [
     "var1의 선언 타입 S를 찾는다.",
     "S를 선언된 타입 식 struct { int a; }로 바꾼다.",
     "다른 변수도 같은 방식으로 이름을 모두 펼친 뒤, 두 타입 식이 같은 구조인지 비교한다.",
     "재귀 타입은 펼치기가 끝나지 않으므로 이 단순한 방법을 그대로 쓸 수 없다."
    ],
    "trap": [
     "C에서 typedef 이름은 새 타입이 아니라 별칭입니다(64쪽). 그래서 C에서는 typedef 이름을 펼쳐 비교하는 것이 자연스럽습니다.",
     "구조적 동등성의 치환 규칙과, C가 구조체에 실제로 쓰는 이름 동등성 규칙은 다릅니다. 이 쪽은 \"구조적 동등성을 검사하는 방법\" 설명입니다."
    ],
    "recap": "이름 있는 타입의 구조 비교 = 이름을 타입 식으로 치환해 비교. 재귀 타입은 치환이 끝나지 않아 예외.",
    "source": "PDF 60쪽"
   },
   "quizzes": [
    [
     "타입 이름이 있을 때 구조적 동등성을 검사하는 방법은?",
     [
      "각 이름을 선언된 타입 식으로 치환해 비교한다",
      "이름의 철자를 비교한다",
      "변수 이름을 비교한다"
     ],
     "원문: replacing each name by its associated type expression.",
     [
      "맞습니다.",
      "이름 동등성의 방식입니다.",
      "변수 이름은 무관합니다."
     ]
    ],
    [
     "이 치환 방법의 예외는?",
     [
      "재귀 타입",
      "배열 타입",
      "정수 타입"
     ],
     "재귀 타입은 치환해도 자기 이름이 다시 나와 끝나지 않습니다.",
     [
      "맞습니다.",
      "배열은 치환할 수 있습니다.",
      "정수는 이미 단순 타입입니다."
     ]
    ],
    [
     "C에서 이름 없는(익명) 타입으로 선언한 변수의 예는?",
     [
      "struct { int a; } v;",
      "typedef int Count;",
      "struct S { int a; };"
     ],
     "타입에 태그도 typedef 이름도 없습니다.",
     [
      "맞습니다.",
      "이름(Count)을 붙이는 선언입니다.",
      "태그 S가 있습니다."
     ]
    ]
   ],
   "image": "pages/pl09-60.jpg",
   "text": "Type Equivalence\n\n• Type names in declarations may or may not be given explicitly\n– In C, variable declarations can use anonymous types\n– Names can also be given right in structs and unions, or by\nusing a typedef\n\n• Structural equivalence when type names are present can be done by\nsimply replacing each name by its associated type expression in its\ndeclaration (except for recursive types)\ntypedef struct { int a; } S;\nS var1; // replace S -> struct { int a; }\n60",
   "quiz": [
    "타입 이름이 있을 때 구조적 동등성을 검사하는 방법은?",
    [
     "각 이름을 선언된 타입 식으로 치환해 비교한다",
     "이름의 철자를 비교한다",
     "변수 이름을 비교한다"
    ],
    "원문: replacing each name by its associated type expression."
   ],
   "quizReasons": [
    "맞습니다.",
    "이름 동등성의 방식입니다.",
    "변수 이름은 무관합니다."
   ]
  },
  {
   "page": 61,
   "title": "이름 동등성",
   "explanation": "이름 동등성은 두 타입의 이름이 같을 때만 같은 타입으로 봅니다. 모든 타입에 명시적 이름이 있다면 구조적 동등성보다 구현이 쉽습니다(이름만 비교하면 됨). 두 변수는 선언에 정확히 같은 타입 이름을 쓸 때만 타입이 같습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "이름 동등성: 두 타입은 이름이 같을 때만 같다.",
     "모든 타입에 명시적 이름이 있는 한, 구조적 동등성보다 구현이 쉽다.",
     "같은 이름이면 같은 선언을 가리키므로 구조도 당연히 같다고 가정한다.",
     "두 변수는 선언에 정확히 같은 타입 이름을 쓸 때만 타입이 같다."
    ],
    "analogy": "이름 동등성은 \"학번으로 학생을 구분\"하는 방식입니다. 외모(구조)를 하나하나 비교할 필요 없이 학번만 비교하면 되니 빠르고 간단합니다. 쌍둥이도 학번이 다르면 다른 사람입니다.",
    "examples": [
     {
      "title": "단위 실수를 막는 이름 동등성",
      "code": "type Celsius    is new Float;\ntype Fahrenheit is new Float;\n\nC : Celsius := 36.5;\nF : Fahrenheit;\nF := C;                  -- 구조(Float)는 같지만 이름이 다름\nF := Fahrenheit(C) * 9.0 / 5.0 + 32.0;   -- 명시적 변환은 가능",
      "lang": "Ada",
      "out": "error: expected type \"Fahrenheit\" / found type \"Celsius\"   (F := C 줄)",
      "note": "구조가 같아도 이름이 다르면 섞지 못하게 해서 섭씨와 화씨를 실수로 대입하는 오류를 막습니다. 오류 문구는 컴파일러마다 다릅니다. (보충 예제)",
      "error": true,
      "outLabel": "컴파일 결과 예"
     }
    ],
    "steps": [
     "F := C를 검사할 때 C의 타입 이름(Celsius)과 F의 타입 이름(Fahrenheit)을 비교한다.",
     "이름이 다르므로 바로 다른 타입으로 판정한다. 구조(Float)를 펼쳐 볼 필요가 없다.",
     "같은 타입 이름끼리만 대입을 허용한다.",
     "섞어야 한다면 Fahrenheit(C)처럼 명시적 변환을 쓴다."
    ],
    "trap": [
     "\"구현이 쉽다\"는 조건이 붙어 있습니다: 모든 타입에 명시적 이름이 있어야 합니다. C의 익명 struct처럼 이름 없는 타입이 있으면 내부 이름을 따로 붙여야 합니다(62쪽)."
    ],
    "recap": "이름 동등성 = 같은 타입 이름일 때만 같은 타입. 이름만 비교하면 되어 구현이 쉽고, 의미가 다른 같은 구조의 타입을 섞지 못하게 한다.",
    "source": "PDF 61쪽"
   },
   "quizzes": [
    [
     "이름 동등성이 구조적 동등성보다 구현이 쉬운 이유는?",
     [
      "타입 이름만 비교하면 되기 때문",
      "모든 타입을 펼쳐 비교하기 때문",
      "타입 검사를 하지 않기 때문"
     ],
     "원문: Easier to implement, as long as every type has an explicit name.",
     [
      "맞습니다.",
      "구조적 동등성의 방식입니다.",
      "검사는 합니다."
     ]
    ],
    [
     "Celsius와 Fahrenheit가 모두 new Float인 Ada에서 F := C;는?",
     [
      "컴파일 오류",
      "허용된다",
      "실행 중 오류"
     ],
     "이름이 다른 두 타입이므로 이름 동등성에서 다른 타입입니다.",
     [
      "맞습니다.",
      "구조가 같아도 이름이 다릅니다.",
      "컴파일 시점에 거부됩니다."
     ]
    ],
    [
     "이름 동등성을 쉽게 적용하기 위한 조건은?",
     [
      "모든 타입에 명시적 이름이 있어야 한다",
      "모든 타입이 같은 크기여야 한다",
      "재귀 타입이 없어야 한다"
     ],
     "원문: as long as every type has an explicit name.",
     [
      "맞습니다.",
      "크기와 무관합니다.",
      "구조적 동등성의 예외 조건입니다."
     ]
    ]
   ],
   "image": "pages/pl09-61.jpg",
   "text": "Name Equivalence\n\n• Name equivalence: two types are the same only if they have the\nsame name\n\n– Easier to implement than structural equivalence, as long as every\ntype has an explicit name\n\n– Two types are equivalent only if they are the same name\n– assume the structure of those two types should be same.\n– Two variables are type equivalent only if their declarations use\nexactly the same type name\n\n61",
   "quiz": [
    "이름 동등성이 구조적 동등성보다 구현이 쉬운 이유는?",
    [
     "타입 이름만 비교하면 되기 때문",
     "모든 타입을 펼쳐 비교하기 때문",
     "타입 검사를 하지 않기 때문"
    ],
    "원문: Easier to implement, as long as every type has an explicit name."
   ],
   "quizReasons": [
    "맞습니다.",
    "구조적 동등성의 방식입니다.",
    "검사는 합니다."
   ]
  },
  {
   "page": 62,
   "title": "C 스타일 코드에서 타입 이름 찾기",
   "explanation": "C에서는 같은 구조의 타입이라도 이름을 갖는 방법이 여러 가지입니다. 변수 a의 타입은 struct RecA와 typedef 이름 RecA, 두 이름을 가집니다. b의 타입은 RecB 하나뿐이고(struct 태그 생략), c의 타입은 프로그래머가 쓸 수 있는 이름이 아예 없습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "struct RecA { char x; int y; } a; typedef struct RecA RecA; → a의 타입 이름: struct RecA, RecA(둘).",
     "typedef struct { char x; int y; } RecB; RecB b; → b의 타입 이름: RecB 하나(태그 없음).",
     "struct { char x; int y; } c; → c의 타입에는 이름이 없다(컴파일러 내부 이름만 있음).",
     "이름 동등성을 적용하려면 이렇게 각 변수의 타입 이름을 먼저 파악해야 한다."
    ],
    "analogy": "같은 사람이 \"본명\"과 \"별명\"을 둘 다 가질 수 있고(a), 별명만 있을 수도 있고(b), 이름 없이 \"그 사람\"으로만 불릴 수도 있습니다(c).",
    "examples": [
     {
      "title": "원문 코드",
      "code": "struct RecA {\n    char x;\n    int y;\n} a;\n\ntypedef struct RecA RecA;\n\ntypedef struct {\n    char x;\n    int y;\n} RecB;\n\nRecB b;\n\nstruct {\n    char x;\n    int y;\n} c;",
      "lang": "C",
      "out": "a : struct RecA, RecA  (이름 두 개)\nb : RecB               (이름 하나)\nc : (이름 없음)",
      "note": "",
      "error": false,
      "outLabel": "각 변수의 타입 이름"
     }
    ],
    "steps": [
     "a: 선언에 태그 RecA가 있다 → struct RecA. 뒤의 typedef가 같은 타입에 RecA라는 별칭을 더한다.",
     "b: typedef가 태그 없는 struct에 RecB라는 이름을 붙였다 → RecB 하나.",
     "c: 태그도 typedef도 없다 → 프로그래머가 이 타입을 다시 가리킬 방법이 없다.",
     "세 변수는 모두 char × int라는 같은 구조를 가진다(63쪽에서 동등성 비교)."
    ],
    "trap": [
     "C에서 struct 태그(struct RecA의 RecA)와 typedef 이름(RecA)은 서로 다른 이름 공간에 있어 같은 철자를 함께 쓸 수 있습니다.",
     "c의 타입은 이름이 없으므로 같은 타입의 변수를 나중에 더 선언할 수 없습니다."
    ],
    "recap": "C 변수의 타입 이름: 태그+typedef로 둘(a), typedef만 하나(b), 익명이면 없음(c).",
    "source": "PDF 62쪽"
   },
   "quizzes": [
    [
     "변수 a의 타입이 가진 이름은?",
     [
      "struct RecA와 RecA 두 개",
      "RecA 하나",
      "이름 없음"
     ],
     "태그와 typedef 별칭이 둘 다 있습니다.",
     [
      "맞습니다.",
      "struct RecA도 이름입니다.",
      "이름이 있습니다."
     ]
    ],
    [
     "변수 c의 타입 이름은?",
     [
      "프로그래머가 쓸 수 있는 이름이 없다",
      "c",
      "struct c"
     ],
     "원문: c has no type name at all (only an internal name).",
     [
      "맞습니다.",
      "c는 변수 이름입니다.",
      "태그가 없습니다."
     ]
    ],
    [
     "변수 b의 타입 이름은?",
     [
      "RecB 하나",
      "struct RecB와 RecB",
      "이름 없음"
     ],
     "태그 없는 struct에 typedef로 RecB만 붙였습니다.",
     [
      "맞습니다.",
      "struct 태그가 없습니다.",
      "typedef 이름이 있습니다."
     ]
    ]
   ],
   "image": "pages/pl09-62.jpg",
   "text": "Type Equivalence (cont’d.)\n\n• Example: in C “style” code\n– Variable a has two names: struct\n\nRecA and RecA (given by the\ntypedef)\n– Variable b has only the name RecB\n(the struct name was left blank)\n– Variable c has no type name at all\n(only an internal name not usable by\nthe programmer)\n\n62",
   "quiz": [
    "변수 a의 타입이 가진 이름은?",
    [
     "struct RecA와 RecA 두 개",
     "RecA 하나",
     "이름 없음"
    ],
    "태그와 typedef 별칭이 둘 다 있습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "struct RecA도 이름입니다.",
    "이름이 있습니다."
   ]
  },
  {
   "page": 63,
   "title": "C 스타일 코드의 동등성 판정",
   "explanation": "a, b, c, d가 모두 { char x; int y; } 구조라면 네 변수는 구조적으로 동등합니다. 순수 이름 동등성에서는 같은 이름 struct RecA로 선언한 a와 c만 동등하고, b(RecA 별칭)와 d(익명)는 다른 변수와 동등하지 않습니다. 실제 C에서는 typedef가 별칭이므로 a, b, c가 같은 타입이고 d만 다릅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "코드: struct RecA {…}; typedef struct RecA RecA; struct RecA a; RecA b; struct RecA c; struct {…} d;",
     "구조적 동등성: a, b, c, d 모두 char × int → 모두 동등.",
     "순수 이름 동등성: a와 c는 같은 이름 struct RecA → 동등. b는 이름 RecA(다른 철자의 이름) → a, c와 동등하지 않음. d는 이름 없음 → 누구와도 동등하지 않음.",
     "실제 C 규칙(원문 Note): a, b, c가 같은 타입. typedef는 별칭일 뿐이고(선언 동등성), d의 익명 struct는 다른 타입."
    ],
    "analogy": "순수 이름 동등성은 \"출석부의 이름 칸에 적힌 글자 그대로\" 비교합니다. \"struct RecA\"와 \"RecA\"는 같은 사람의 본명과 별명이지만 글자가 달라 다른 사람으로 처리됩니다. 실제 C는 \"별명은 본명과 같은 사람\"이라고 알고 있습니다.",
    "examples": [
     {
      "title": "실제 C 컴파일러로 확인",
      "code": "struct RecA { char x; int y; };\ntypedef struct RecA RecA;\nstruct RecA a;\nRecA b;\nstruct RecA c;\nstruct { char x; int y; } d;\n\na = b;   /* OK: RecA는 struct RecA의 별칭 */\na = c;   /* OK */\na = d;   /* 익명 struct는 다른 타입 */",
      "lang": "C",
      "out": "error: incompatible types when assigning to type 'struct RecA' from type 'struct <anonymous>' ",
      "note": "앞의 두 대입은 통과하고 a = d만 오류입니다. 원문 Note의 빈 칸에 들어갈 답은 \"Type equivalence: a, b, c\"입니다.",
      "error": true,
      "outLabel": "컴파일 결과 예 · GCC"
     }
    ],
    "steps": [
     "구조적: 네 변수의 타입을 펼치면 모두 struct { char x; int y; } → 모두 동등.",
     "순수 이름: 선언에 쓴 타입 이름을 그대로 비교 → a, c(struct RecA)만 같다.",
     "b의 RecA는 typedef 이름이라 글자 그대로는 struct RecA와 다르다 → 순수 이름 동등성에서는 다르다.",
     "실제 C: typedef 이름을 원래 타입으로 되돌려 비교(선언 동등성) → a, b, c 동등, d 다름."
    ],
    "trap": [
     "원문의 세 질문(…structurally equivalent? / a and c are (pure) name equivalent…? / b and d…?)에는 모두 \"예\"가 답입니다.",
     "\"순수(pure) 이름 동등성\"과 \"C의 실제 규칙(선언 동등성)\"을 구분하세요. b의 판정이 두 기준에서 다릅니다."
    ],
    "recap": "구조적: a,b,c,d 모두 동등. 순수 이름: a와 c만. 실제 C: a, b, c 같은 타입, 익명 d는 다름.",
    "source": "PDF 63쪽"
   },
   "quizzes": [
    [
     "실제 C 규칙에서 서로 같은 타입인 변수들은?",
     [
      "a, b, c",
      "a, c",
      "a, b, c, d"
     ],
     "typedef RecA는 struct RecA의 별칭이고, d는 익명 struct라 다릅니다.",
     [
      "맞습니다.",
      "순수 이름 동등성의 결론입니다.",
      "구조적 동등성의 결론입니다."
     ]
    ],
    [
     "순수 이름 동등성에서 동등한 변수 쌍은?",
     [
      "a와 c",
      "a와 b",
      "b와 d"
     ],
     "둘 다 정확히 struct RecA라는 이름으로 선언되었습니다.",
     [
      "맞습니다.",
      "b는 다른 이름(RecA)을 씁니다.",
      "d는 이름이 없습니다."
     ]
    ],
    [
     "C에서 a = d;를 컴파일하면?",
     [
      "오류: 익명 struct는 struct RecA와 다른 타입",
      "허용된다",
      "경고만 난다"
     ],
     "C는 struct에 이름 동등성을 씁니다.",
     [
      "맞습니다.",
      "구조가 같아도 다른 타입입니다.",
      "오류입니다."
     ]
    ]
   ],
   "image": "pages/pl09-63.jpg",
   "text": "Type Equivalence\n\n• Example: in C “style” code:\n– a, b, c, and d are structurally\nequivalent?\n– a and c are (pure) name\nequivalent, and not name\nequivalent to b or d?\n– b and d are not (pure) name\nequivalent to any other variable?\n\n● Note: in C\n– Type equivalence: a, b, c\n63",
   "quiz": [
    "실제 C 규칙에서 서로 같은 타입인 변수들은?",
    [
     "a, b, c",
     "a, c",
     "a, b, c, d"
    ],
    "typedef RecA는 struct RecA의 별칭이고, d는 익명 struct라 다릅니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "순수 이름 동등성의 결론입니다.",
    "구조적 동등성의 결론입니다."
   ]
  },
  {
   "page": 64,
   "title": "언어별 타입 동등성 규칙",
   "explanation": "Ada는 거의 모든 경우에 타입 이름을 요구하는 순수 이름 동등성을 씁니다. C는 struct·union에는 이름 동등성, 나머지에는 구조적 동등성을 쓰고, typedef는 새 타입이 아니라 별칭입니다(정확히는 선언 동등성). Pascal은 C와 비슷하지만 거의 모든 타입 생성자가 새로운, 동등하지 않은 타입을 만듭니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "Ada: 순수 이름 동등성. 변수·함수 선언에 거의 항상 타입 이름이 필요하다.",
     "C: struct와 union은 이름 동등성, 그 밖의 모든 것(포인터, 배열, 함수 등)은 구조적 동등성.",
     "C의 typedef는 새 데이터 타입을 만들지 않는다(별칭). 정확히는 선언 동등성: 같은 타입 이름에서 유도된 두 타입은 동등하다.",
     "Pascal: C와 비슷하지만 거의 모든 타입 생성자가 새로운, 동등하지 않은 타입을 만든다."
    ],
    "analogy": "Ada는 \"명찰 검사관\"(이름이 같아야 통과), C는 \"구조체는 명찰, 나머지는 모양 검사\", Pascal은 \"새로 만든 것은 모두 새 명찰을 단다\"는 규칙입니다.",
    "examples": [
     {
      "title": "C의 혼합 규칙",
      "code": "typedef int Count;\nCount n = 3;\nint m = n;                 /* OK: typedef는 별칭 */\n\nint (*p)[3];\nint (*q)[3];\np = q;                     /* OK: 포인터·배열은 구조적 */\n\nstruct A { int x; } s1;\nstruct B { int x; } s2;\ns1 = s2;                   /* 오류: struct는 이름 동등성 */",
      "lang": "C",
      "out": "error: incompatible types when assigning to type 'struct A' from type 'struct B' ",
      "note": "앞의 두 대입은 통과하고 마지막만 오류입니다.",
      "error": true,
      "outLabel": "컴파일 결과 예 · GCC"
     }
    ],
    "steps": [
     "Count n → int m: Count는 int의 별칭이므로 같은 타입이다.",
     "p와 q는 둘 다 \"int 3개짜리 배열을 가리키는 포인터\"로 같은 구조 → 구조적 동등성으로 같은 타입.",
     "s1과 s2는 구조가 같지만 struct 태그 A, B가 다르다 → 이름 동등성으로 다른 타입.",
     "그래서 C는 한 언어 안에서 두 규칙을 섞어 쓴다."
    ],
    "trap": [
     "typedef가 \"새 타입\"을 만든다고 생각하면 Count와 int를 섞을 수 없다고 착각합니다. C에서 typedef는 이름만 추가합니다.",
     "Ada에서 \"새 타입\"을 만들려면 type ... is new ...를, 기존 타입의 일부를 쓰려면 subtype을 씁니다(32·61쪽)."
    ],
    "recap": "Ada = 순수 이름. C = struct/union은 이름, 나머지는 구조, typedef는 별칭(선언 동등성). Pascal = 생성자마다 새 타입.",
    "source": "PDF 64쪽"
   },
   "quizzes": [
    [
     "C의 typedef int Count;에서 Count는?",
     [
      "int의 별칭",
      "int와 호환되지 않는 새 타입",
      "정수를 담는 구조체"
     ],
     "원문: typedef does not create a new data type (but just alias).",
     [
      "맞습니다.",
      "새 타입을 만들지 않습니다.",
      "구조체가 아닙니다."
     ]
    ],
    [
     "C가 struct와 union에 쓰는 동등성 규칙은?",
     [
      "이름 동등성",
      "구조적 동등성",
      "동등성 검사를 하지 않음"
     ],
     "원문: Name equivalence for struct and union.",
     [
      "맞습니다.",
      "그 밖의 타입에 쓰는 규칙입니다.",
      "검사합니다."
     ]
    ],
    [
     "원문에 따르면 Ada의 타입 동등성 규칙은?",
     [
      "순수 이름 동등성",
      "순수 구조적 동등성",
      "typedef 기반 별칭 규칙"
     ],
     "원문: Ada — Pure form of name equivalence.",
     [
      "맞습니다.",
      "Ada는 이름을 요구합니다.",
      "C의 특징입니다."
     ]
    ]
   ],
   "image": "pages/pl09-64.jpg",
   "text": "Type Equivalence Rules in Various Languages\n\n• Ada: Pure form of name equivalence\n\n– Requires type names in variable and function declarations in\nvirtually all cases\n\n• C\n• Name equivalence for struct and union\n• Structural equivalence for everything else\n• typedef does not create a new data type (but just alias).\n• precisely, C uses declaration equivalence (two types are\nequivalent if they are derived from the same type name)\n\n• Pascal\n• Similar to C, except that almost all type constructors lead to new,\ninequivalent types\n\n64",
   "quiz": [
    "C의 typedef int Count;에서 Count는?",
    [
     "int의 별칭",
     "int와 호환되지 않는 새 타입",
     "정수를 담는 구조체"
    ],
    "원문: typedef does not create a new data type (but just alias)."
   ],
   "quizReasons": [
    "맞습니다.",
    "새 타입을 만들지 않습니다.",
    "구조체가 아닙니다."
   ]
  },
  {
   "page": 65,
   "title": "Java의 타입 동등성",
   "explanation": "Java의 방식은 단순합니다. typedef가 없고, class와 interface 선언이 새 타입 이름을 만들며 이 타입들에는 이름 동등성을 씁니다. 배열은 구조적 동등성을 쓰되, 원소(기본) 타입이 같은지는 특별한 규칙으로 판단합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "Java에는 typedef가 없다.",
     "class·interface 선언은 새 타입 이름을 만들고, 이 타입들은 이름 동등성으로 비교한다.",
     "배열은 구조적 동등성: 원소 타입이 같으면 크기와 상관없이 같은 배열 타입이다.",
     "int[] x = new int[3]; int[] y = new int[100]; x = y; → OK(둘 다 int[]).",
     "int[] p와 Integer[] q는 원소 타입(int vs Integer)이 달라 p = q, q = p 모두 컴파일 오류."
    ],
    "analogy": "Java 배열 타입은 \"무엇을 담는 상자인가\"로만 구분합니다. 3칸 상자든 100칸 상자든 \"int 상자\"면 같은 종류입니다. 하지만 \"int 상자\"와 \"Integer 상자\"는 담는 물건이 달라 다른 종류입니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "int[] x = new int[3];\nint[] y = new int[100];\nx = y;            // OK: both int[]\n\nint[]     p = {1, 2, 3};\nInteger[] q = {1, 2, 3};\np = q;            // Compilation error\nq = p;            // Compilation error",
      "lang": "Java",
      "out": "error: incompatible types: Integer[] cannot be converted to int[]\nerror: incompatible types: int[] cannot be converted to Integer[]",
      "note": "int와 Integer 사이에는 원소 하나씩은 자동 박싱·언박싱이 되지만, 배열 전체를 바꿔 주지는 않습니다.",
      "error": true
     }
    ],
    "steps": [
     "x와 y의 타입은 둘 다 int[]. 크기(3, 100)는 타입이 아니라 객체의 정보다 → x = y 허용.",
     "p는 int[], q는 Integer[]. 원소 타입 int(기본 타입)와 Integer(클래스)가 다르다.",
     "따라서 두 배열 타입은 동등하지 않다 → 양방향 대입 모두 컴파일 오류.",
     "서로 다른 두 class는 필드가 같아도 이름이 다르면 다른 타입이다(이름 동등성)."
    ],
    "trap": [
     "C(58쪽)에서는 배열 크기가 타입에 들어가지만, Java에서는 들어가지 않습니다.",
     "Integer i = 1;이 되니 Integer[] q = p;도 될 것 같지만 안 됩니다. 박싱은 값 하나에만 적용됩니다."
    ],
    "recap": "Java: class·interface는 이름 동등성, 배열은 원소 타입 기준의 구조적 동등성(크기 무관). int[] ≠ Integer[].",
    "source": "PDF 65쪽"
   },
   "quizzes": [
    [
     "int[] x = new int[3]; int[] y = new int[100]; x = y;는?",
     [
      "OK: 둘 다 int[] 타입이다",
      "크기가 달라 컴파일 오류",
      "실행 중 오류"
     ],
     "Java 배열 타입에는 크기가 들어가지 않습니다.",
     [
      "맞습니다.",
      "C와 다른 규칙입니다.",
      "대입은 정상 실행됩니다."
     ]
    ],
    [
     "int[] p; Integer[] q;에서 p = q;는?",
     [
      "컴파일 오류",
      "OK: 자동 언박싱된다",
      "실행 중 ClassCastException"
     ],
     "원소 타입이 달라 배열 타입이 동등하지 않습니다.",
     [
      "맞습니다.",
      "배열 전체에는 박싱 규칙이 적용되지 않습니다.",
      "컴파일 단계에서 거부됩니다."
     ]
    ],
    [
     "Java에서 class 타입들은 어떤 규칙으로 비교하는가?",
     [
      "이름 동등성",
      "구조적 동등성",
      "typedef 별칭 규칙"
     ],
     "원문: class and interface declarations implicitly create new type names, and name equivalence is used.",
     [
      "맞습니다.",
      "배열에 쓰는 규칙입니다.",
      "Java에는 typedef가 없습니다."
     ]
    ]
   ],
   "image": "pages/pl09-65.jpg",
   "text": "Type Equivalence (cont’d.)\n\n• Java’s approach is simple:\n– It has no typedefs\n– class and interface declarations implicitly create new type\nnames, and name equivalence is used for these types\n– Arrays use structural equivalence, with special rules for\nestablishing base type (e.g., int, double etc) equivalence\nint[] x = new int[3];\nint[] y = new int[100];\nx = y;\n// OK: both int[]\n\nint[]\np = {1, 2, 3};\nInteger[] q = {1, 2, 3};\np = q;\n// Compilation error\nq = p;\n// Compilation error\n65",
   "quiz": [
    "int[] x = new int[3]; int[] y = new int[100]; x = y;는?",
    [
     "OK: 둘 다 int[] 타입이다",
     "크기가 달라 컴파일 오류",
     "실행 중 오류"
    ],
    "Java 배열 타입에는 크기가 들어가지 않습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "C와 다른 규칙입니다.",
    "대입은 정상 실행됩니다."
   ]
  },
  {
   "page": 66,
   "title": "구분 · 타입 검사",
   "explanation": "\"Type Checking\" 단원의 구분 쪽입니다. 프로그램이 타입 측면에서 올바른지 판단하는 과정(타입 추론, 동등성, 호환성)과 암묵적 타입, 겹치는 타입, 공유 연산을 다룹니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-66.jpg",
   "text": "Type Checking\n\n66"
  },
  {
   "page": 67,
   "title": "타입 검사의 세 요소",
   "explanation": "타입 검사는 프로그램이 데이터 타입 측면에서 올바른지 판단하는 일입니다. 이를 위해 식의 타입을 정하는 타입 추론, 두 타입이 같은지 보는 타입 동등성, 특정 상황에서 정확한 동등성을 완화하는 타입 호환성이 필요합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "타입 검사(type checking): 프로그램이 데이터 타입 측면에서 올바른지 결정한다.",
     "타입 추론(type inference): 식의 타입을 결정한다(예: 1 + 2.5는 double).",
     "타입 동등성(type equivalence): 두 타입이 같은가?(56~65쪽)",
     "타입 호환성(type compatibility): 어떤 상황에서는 정확히 같지 않아도 허용한다. 예: double 변수에 int 값을 쓰는 것."
    ],
    "analogy": "택배 검수원에 비유하면, 타입 추론은 \"이 상자 안에 무엇이 들었는지 알아내기\", 동등성은 \"주문한 물건과 똑같은가\", 호환성은 \"똑같지는 않지만 받아도 되는가(작은 물건을 큰 칸에 넣기)\"입니다.",
    "examples": [
     {
      "title": "세 요소가 함께 작동하는 예",
      "code": "double d = 3;          // 호환성: int → double 허용\nvar t = 1 + 2.5;       // 추론: t의 타입은 double\nint i = 3.0;           // 호환되지 않음: double → int",
      "lang": "Java",
      "out": "error: incompatible types: possible lossy conversion from double to int   (int i = 3.0 줄)",
      "note": "var(Java 10+)는 지역 변수 타입을 초기값에서 추론하게 하는 문법입니다. (보충 예제)",
      "error": true
     }
    ],
    "steps": [
     "double d = 3: 3의 타입을 추론(int) → d의 타입 double과 같은지 확인(동등하지 않음) → int를 double 자리에 써도 되는지 확인(호환 가능) → 허용.",
     "1 + 2.5: 피연산자 int, double → 결과 타입 double로 추론 → t는 double.",
     "int i = 3.0: 3.0은 double → int와 동등하지 않음 → double을 int 자리에 쓰는 것은 호환되지 않음 → 오류.",
     "타입 검사는 이 세 질문을 식과 문장마다 반복한다."
    ],
    "trap": [
     "호환성은 대칭이 아닙니다. int → double은 되지만 double → int는 (Java에서) 안 됩니다."
    ],
    "recap": "타입 검사 = 타입 추론(식의 타입) + 타입 동등성(같은가) + 타입 호환성(같지 않아도 허용되는가).",
    "source": "PDF 67쪽"
   },
   "quizzes": [
    [
     "식의 타입을 결정하는 타입 검사 요소는?",
     [
      "타입 추론",
      "타입 동등성",
      "타입 변환"
     ],
     "원문: Type Inference — Types of expressions.",
     [
      "맞습니다.",
      "두 타입 비교입니다.",
      "세 요소에 속하지 않습니다."
     ]
    ],
    [
     "double 변수에 int 값을 쓰는 것을 허용하는 개념은?",
     [
      "타입 호환성",
      "타입 동등성",
      "이름 동등성"
     ],
     "원문: Type Compatibility — e.g., using int in double type variable.",
     [
      "맞습니다.",
      "int와 double은 같은 타입이 아닙니다.",
      "동등성 규칙의 한 종류입니다."
     ]
    ],
    [
     "Java에서 int i = 3.0;은?",
     [
      "컴파일 오류(호환되지 않음)",
      "허용되어 i = 3",
      "경고만 난다"
     ],
     "double → int는 값 손실 가능성 때문에 자동으로 허용되지 않습니다.",
     [
      "맞습니다.",
      "C라면 허용됩니다.",
      "오류입니다."
     ]
    ]
   ],
   "image": "pages/pl09-67.jpg",
   "text": "Type Checking\n\n• Type Checking: Determine whether the program is correct in terms of\ndata types.\n\n• Type Inference: Types of expressions\n• Type Equivalence: Are two types the same?\n• Type Compatibility: Relaxing exact type equivalence under\ncertain circumstances\n\n• E.g., using int in double type variable\n67",
   "quiz": [
    "식의 타입을 결정하는 타입 검사 요소는?",
    [
     "타입 추론",
     "타입 동등성",
     "타입 변환"
    ],
    "원문: Type Inference — Types of expressions."
   ],
   "quizReasons": [
    "맞습니다.",
    "두 타입 비교입니다.",
    "세 요소에 속하지 않습니다."
   ]
  },
  {
   "page": 68,
   "title": "예제: x = y/2 + c",
   "explanation": "long y; float x; double c;일 때 x = y/2 + c를 단계별로 타입 검사합니다. 2는 long으로 승격되어 y/2는 long, 여기에 double c를 더하려고 y/2가 double로 승격되어 결과는 double입니다. 이 double을 float x에 넣을 때 C는 경고하거나 허용하고, Java는 컴파일 오류를 냅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "y는 long, 2는 int → 2를 long으로 승격 → y/2는 long(정수 나눗셈).",
     "c는 double, y/2는 long → y/2를 double로 승격 → y/2 + c는 double.",
     "x는 float, 오른쪽은 double → 축소 대입.",
     "C: 경고하거나 그냥 허용(암묵적 변환). Java: 컴파일 오류."
    ],
    "analogy": "그릇 크기가 다른 재료를 섞는 요리입니다. 작은 그릇의 재료는 큰 그릇으로 옮겨 섞고(승격), 다 섞은 큰 그릇의 음식을 작은 그릇(float)에 담으려 할 때 C는 \"넘칠 수도 있지만 담아 줄게\", Java는 \"명시적으로 덜어 담아라\"라고 합니다.",
    "examples": [
     {
      "title": "C",
      "code": "long y = 5;  float x;  double c = 0.5;\nx = y/2 + c;\nprintf(\"%f\\n\", x);",
      "lang": "C",
      "out": "2.500000",
      "note": "y/2 = 2(정수 나눗셈), 2.0 + 0.5 = 2.5. -Wconversion 같은 옵션을 켜면 double → float 변환 경고가 나옵니다.",
      "error": false
     },
     {
      "title": "Java",
      "code": "long y = 5;  float x;  double c = 0.5;\nx = y/2 + c;",
      "lang": "Java",
      "out": "error: incompatible types: possible lossy conversion from double to float",
      "note": "고치려면 x = (float)(y/2 + c);처럼 명시적으로 변환합니다.",
      "error": true
     }
    ],
    "steps": [
     "y/2: long / int → int 2를 long으로 승격 → long / long = 2 (5/2의 몫).",
     "y/2 + c: long + double → long 2를 double 2.0으로 승격 → 2.0 + 0.5 = 2.5 (double).",
     "x = (double 2.5): float ← double은 축소 변환이다.",
     "C는 암묵적으로 변환해 x = 2.5f, Java는 명시적 캐스트가 없으면 거부한다."
    ],
    "trap": [
     "y/2를 계산할 때는 아직 c와 만나지 않았으므로 정수 나눗셈입니다. 결과가 2.5인 것은 c = 0.5 덕분이지 y/2가 2.5라서가 아닙니다.",
     "같은 내용이 77쪽에 다시 나옵니다(타입 변환 관점)."
    ],
    "recap": "x = y/2 + c: long/int → long, long + double → double, double → float 대입은 C 경고·허용, Java 오류.",
    "source": "PDF 68쪽"
   },
   "quizzes": [
    [
     "long y;일 때 y/2의 타입은?",
     [
      "long",
      "int",
      "double"
     ],
     "2(int)가 long으로 승격되어 long / long입니다.",
     [
      "맞습니다.",
      "더 큰 타입 쪽으로 승격됩니다.",
      "아직 실수와 만나지 않았습니다."
     ]
    ],
    [
     "Java에서 x = y/2 + c;(x는 float, c는 double)는?",
     [
      "컴파일 오류",
      "경고 후 허용",
      "실행 중 오류"
     ],
     "double → float 축소 변환은 명시적 캐스트가 필요합니다.",
     [
      "맞습니다.",
      "C의 동작입니다.",
      "컴파일 단계에서 거부됩니다."
     ]
    ],
    [
     "C에서 long y = 5; double c = 0.5;일 때 y/2 + c의 값은?",
     [
      "2.5",
      "3.0",
      "2.0"
     ],
     "y/2 = 2(정수 나눗셈), 2.0 + 0.5 = 2.5.",
     [
      "맞습니다.",
      "5/2를 2.5로 계산했습니다.",
      "c를 더하지 않았습니다."
     ]
    ]
   ],
   "image": "pages/pl09-68.jpg",
   "text": "Example\nlong y;\nfloat x;\ndouble c;\nx = y/2 + c;\n● y is long, 2 is int, so promoted to long, y/2 long\n● c is double, y/2 is long, so promoted to double,\n\ny/2 + c is double\n● x is float, y/2 + c is double, what happens?\n○ C?\nwarning or OK\n○ Java? compile error\n68",
   "quiz": [
    "long y;일 때 y/2의 타입은?",
    [
     "long",
     "int",
     "double"
    ],
    "2(int)가 long으로 승격되어 long / long입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "더 큰 타입 쪽으로 승격됩니다.",
    "아직 실수와 만나지 않았습니다."
   ]
  },
  {
   "page": 69,
   "title": "예제: C에서 구조적으로 같지만 이름이 다른 구조체 매개변수",
   "explanation": "struct RecA { int i; double r; };와 매개변수 타입 struct { int i; double r; }는 구조가 같지만 이름이 다릅니다. C는 struct에 이름 동등성을 쓰므로 p(a)는 타입 오류이고, 매개변수 타입이 struct RecA인 q(a)는 합법입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "int p(struct { int i; double r; } x) — 매개변수 타입은 익명 struct.",
     "int q(struct RecA x) — 매개변수 타입은 struct RecA.",
     "struct RecA a; int b;",
     "b = p(a); → 타입 오류(구조적으로는 같지만 이름 동등이 아님).",
     "b = q(a); → 합법."
    ],
    "analogy": "같은 모양의 열쇠라도 \"RecA 열쇠\"라고 등록된 것만 RecA 자물쇠를 엽니다. p의 자물쇠는 \"이름 없는 열쇠\"용이라 RecA 열쇠가 맞지 않습니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "struct RecA {\n    int i;\n    double r;\n};\nint p(struct { int i; double r; } x) { return x.i; }\nint q(struct RecA x) { return x.i; }\n\nstruct RecA a;\nint b;\nb = p(a);   /* type error! */\nb = q(a);   /* legal */",
      "lang": "C",
      "out": "warning: anonymous struct declared inside parameter list will not be visible outside of this definition\nerror: incompatible type for argument 1 of 'p' ",
      "note": "두 번째 줄이 원문의 type error입니다. 첫 줄 경고는 매개변수 목록 안에서 선언한 익명 struct를 함수 밖에서 다시 쓸 수 없다는 뜻입니다.",
      "error": true,
      "outLabel": "컴파일 결과 예 · GCC"
     }
    ],
    "steps": [
     "p의 매개변수 타입은 이름 없는 struct, a의 타입은 struct RecA.",
     "구조를 비교하면 둘 다 int × double → 구조적으로 동등.",
     "C는 struct에 이름 동등성을 쓴다(64쪽) → 이름이 다르므로 다른 타입 → p(a)는 오류.",
     "q의 매개변수 타입은 struct RecA로 a와 이름이 같다 → q(a)는 합법."
    ],
    "trap": [
     "\"구조가 같으니 함수에 넘길 수 있다\"는 잘못된 추론입니다. C의 struct는 이름이 같아야 합니다.",
     "익명 struct를 매개변수 목록에 바로 쓰면 호출하는 쪽에서 그 타입의 값을 만들 방법이 없어, 실제로는 거의 쓰지 않는 형태입니다."
    ],
    "recap": "C struct는 이름 동등성: 구조가 같아도 이름이 다르면 인자로 넘길 수 없다(p(a) 오류, q(a) 합법).",
    "source": "PDF 69쪽"
   },
   "quizzes": [
    [
     "b = p(a);는?",
     [
      "타입 오류",
      "합법",
      "경고 후 정상 실행"
     ],
     "익명 struct와 struct RecA는 이름이 달라 다른 타입입니다.",
     [
      "맞습니다.",
      "구조만 같습니다.",
      "오류입니다."
     ]
    ],
    [
     "b = q(a);는?",
     [
      "합법",
      "타입 오류",
      "실행 중 오류"
     ],
     "q의 매개변수 타입이 a와 같은 struct RecA입니다.",
     [
      "맞습니다.",
      "이름이 같습니다.",
      "정상입니다."
     ]
    ],
    [
     "원문이 p(a)를 오류로 판단한 근거는?",
     [
      "구조적으로는 같지만 이름 동등이 아니기 때문",
      "필드 순서가 다르기 때문",
      "double을 int로 바꿔야 하기 때문"
     ],
     "원문: structural equivalent but not name equivalent.",
     [
      "맞습니다.",
      "순서는 같습니다.",
      "필드 타입은 같습니다."
     ]
    ]
   ],
   "image": "pages/pl09-69.jpg",
   "text": "Example: C\nstruct RecA {\nint i;\ndouble r;\n};\n\nstruct RecA a;\nint b;\nb = p(a); //type error!\nb = q(a); //legal\n\nint p(struct {int i; double r;} x)\n{ ... }\nstructural equivalent but not name equivalent:\nint q(struct RecA x)\n{ ... }\n69",
   "quiz": [
    "b = p(a);는?",
    [
     "타입 오류",
     "합법",
     "경고 후 정상 실행"
    ],
    "익명 struct와 struct RecA는 이름이 달라 다른 타입입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "구조만 같습니다.",
    "오류입니다."
   ]
  },
  {
   "page": 70,
   "title": "암묵적 타입 (1): 현재 C 기준",
   "explanation": "암묵적 타입은 선언에 명시하지 않은 타입으로, 번역기가 문맥이나 표준 규칙으로 추론합니다. C99부터는 선언에서 타입을 아예 빼는 implicit int가 없어졌습니다. 다만 unsigned x;처럼 int라는 단어만 생략한 선언은 여전히 합법입니다. 리터럴은 대표적인 암묵적 타입의 예입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "암묵적 타입: 선언에 명시되지 않아 번역기가 문맥이나 표준 규칙으로 추론하는 타입.",
     "C99부터 implicit int 제거: 모든 선언에 타입이 필요하다. 예전 컴파일러는 경고만 했지만 GCC 14+, Clang 16+는 오류로 처리한다.",
     "unsigned x; long y;는 여전히 합법이다. int라는 단어만 생략한 것(unsigned int, long int).",
     "Pascal: 이름 상수는 나타내는 리터럴의 타입을 암묵적으로 갖는다.",
     "리터럴: 10은 int, 3.14는 double, 'A'는 C에서 int, C++·Java에서 char."
    ],
    "analogy": "암묵적 타입은 \"말하지 않아도 아는 것\"입니다. \"3.14\"라고 쓰면 누구나 소수라고 알듯이 번역기도 규칙으로 타입을 정합니다. 다만 C는 예전의 \"아무 말 없으면 정수\"라는 관습을 없앴습니다.",
    "examples": [
     {
      "title": "문자 리터럴의 타입: C vs C++",
      "code": "#include <stdio.h>\nint main(void) {\n    printf(\"%zu\\n\", sizeof('A'));\n}",
      "lang": "C / C++",
      "out": "C로 컴파일:   4\nC++로 컴파일: 1",
      "note": "C에서 'A'는 int(보통 4바이트), C++에서는 char(1바이트)입니다. (보충 예제)",
      "error": false,
      "outLabel": "실행 결과 예"
     },
     {
      "title": "implicit int가 없어진 뒤",
      "code": "unsigned u = 1;   /* OK: unsigned int */\nlong     l = 2;   /* OK: long int     */\nstatic   s = 3;   /* 타입 없음: implicit int */",
      "lang": "C",
      "out": "error: type defaults to 'int' in declaration of 's' [-Wimplicit-int]",
      "note": "GCC 14 이상에서 C99 이후 모드로 컴파일한 예입니다. 예전 컴파일러는 같은 내용을 경고로만 알렸습니다.",
      "error": true,
      "outLabel": "컴파일 결과 예 · GCC 14+"
     }
    ],
    "steps": [
     "10, 3.14, 'A' 같은 리터럴은 선언 없이도 표준 규칙으로 타입이 정해진다.",
     "unsigned u: 타입 지정자 unsigned가 있으므로 int만 생략된 것 → unsigned int.",
     "static s: 저장 클래스만 있고 타입 지정자가 없다 → 예전 규칙이라면 int, C99 이후는 불법.",
     "GCC 14+·Clang 16+는 이를 기본적으로 오류로 처리한다."
    ],
    "trap": [
     "\"unsigned x;도 implicit int인가?\"가 자주 헷갈립니다. 원문은 이것이 여전히 합법이며 단지 int라는 단어를 생략한 것이라고 구분합니다.",
     "70쪽과 71쪽은 같은 주제의 두 버전입니다. 70쪽은 최신 컴파일러 동작을, 71쪽은 C99 이전 규칙을 더 자세히 적었습니다."
    ],
    "recap": "암묵적 타입 = 번역기가 추론하는 타입. C99부터 타입 생략 선언(implicit int)은 불법, unsigned x;는 합법. 리터럴은 암묵적 타입의 대표 예.",
    "source": "PDF 70쪽"
   },
   "quizzes": [
    [
     "C에서 문자 리터럴 'A'의 타입은?",
     [
      "int",
      "char",
      "string"
     ],
     "원문: 'A' : int (in C), char in C++ and Java.",
     [
      "맞습니다.",
      "C++·Java의 타입입니다.",
      "문자열이 아닙니다."
     ]
    ],
    [
     "C99 이후 unsigned x;는?",
     [
      "합법이다(unsigned int)",
      "implicit int라 불법이다",
      "unsigned char가 된다"
     ],
     "원문: unsigned x; long y; are still legal: int is just omitted.",
     [
      "맞습니다.",
      "타입 지정자 unsigned가 있습니다.",
      "unsigned int입니다."
     ]
    ],
    [
     "GCC 14 이상에서 타입 없이 static s = 3;을 C99 이후 모드로 컴파일하면?",
     [
      "오류",
      "경고 후 int로 처리",
      "아무 메시지 없이 int"
     ],
     "원문: GCC 14+ and Clang 16+ report an error.",
     [
      "맞습니다.",
      "예전 컴파일러의 동작입니다.",
      "예전 C89 규칙입니다."
     ]
    ]
   ],
   "image": "pages/pl09-70.jpg",
   "text": "Implicit Types\n• Implicit types: types that are not explicitly given in a declaration\n– The type must be inferred by the translator, either from context\n\n•\n\ninformation or from standard rules\nIn C:\n• Note: since C99, implicit int is removed; every declaration needs a\ntype.\n• Older compilers only warn; GCC 14+ and Clang 16+ report an\nerror.\n• unsigned x; long y; are still legal: int is just omitted.\n\n• In Pascal named constants are implicitly typed by the literals they\nrepresent\n\n• Literals are the major example of implicitly typed entities\n• e.g., 10 : int, 3.14: double, ‘A’: int (in C), char in C++ and Java\n\n70",
   "quiz": [
    "C에서 문자 리터럴 'A'의 타입은?",
    [
     "int",
     "char",
     "string"
    ],
    "원문: 'A' : int (in C), char in C++ and Java."
   ],
   "quizReasons": [
    "맞습니다.",
    "C++·Java의 타입입니다.",
    "문자열이 아닙니다."
   ]
  },
  {
   "page": 71,
   "title": "암묵적 타입 (2): C99 이전 규칙",
   "explanation": "70쪽과 같은 주제를 C99 이전 규칙 중심으로 정리한 쪽입니다. 예전 C에서는 타입을 생략한 변수가 암묵적으로 int였고, 반환 타입을 생략한 함수는 int를 반환했습니다. C99부터 이런 생략은 불법이지만, 리터럴과 식은 여전히 암묵적으로 타입이 정해집니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "예전 C(C89): 타입을 생략한 변수는 암묵적으로 int.",
     "예전 C: 반환 타입을 생략한 함수는 암묵적으로 int를 반환.",
     "C99부터 implicit int(선언에서 타입 생략)는 불법. 리터럴과 식은 여전히 암묵적으로 타입이 정해진다.",
     "Pascal 이름 상수와 리터럴의 암묵적 타입은 70쪽과 같다."
    ],
    "analogy": "옛날 C는 \"말 안 하면 정수\"라는 관습이 있었습니다. 지금은 \"반드시 말해야 한다\"로 바뀌었지만, 숫자 10처럼 보면 아는 것(리터럴)은 여전히 말하지 않아도 됩니다.",
    "examples": [
     {
      "title": "K&R 시절 코드",
      "code": "f(x)          /* 반환 타입 생략 → int, 매개변수 x도 int */\n{\n    return x * 2;\n}\nmain() { printf(\"%d\\n\", f(21)); }",
      "lang": "C89",
      "out": "42",
      "note": "C89 컴파일러에서는 동작합니다. 현대 컴파일러에서 C99 이후 모드로 컴파일하면 반환 타입·매개변수 타입 누락이 오류로 처리됩니다(GCC 14+, Clang 16+).",
      "error": false,
      "outLabel": "실행 결과 · C89 모드"
     }
    ],
    "steps": [
     "f의 반환 타입이 없다 → 예전 규칙에서는 int.",
     "매개변수 x의 타입 선언이 없다 → 예전 규칙에서는 int.",
     "f(21) = 42를 int로 반환하고 출력한다.",
     "C99 이후에는 int f(int x)처럼 명시해야 한다."
    ],
    "trap": [
     "식 x * 2의 타입(int)은 여전히 규칙으로 추론됩니다. 사라진 것은 \"선언에서 타입을 생략하는 것\"뿐입니다."
    ],
    "recap": "예전 C: 타입 생략 변수·함수 반환은 int. C99부터 불법. 리터럴·식의 암묵적 타입은 그대로.",
    "source": "PDF 71쪽"
   },
   "quizzes": [
    [
     "C89에서 반환 타입을 생략한 함수 f(x) { … }의 반환 타입은?",
     [
      "int",
      "void",
      "컴파일 오류"
     ],
     "원문: Functions implicitly return an integer value if no return type is given.",
     [
      "맞습니다.",
      "예전 규칙은 int입니다.",
      "C89에서는 허용됩니다."
     ]
    ],
    [
     "C99 이후에도 여전히 암묵적으로 타입이 정해지는 것은?",
     [
      "리터럴과 식",
      "타입을 생략한 변수 선언",
      "반환 타입을 생략한 함수"
     ],
     "원문: Literals and expressions are still implicitly typed.",
     [
      "맞습니다.",
      "C99부터 불법입니다.",
      "C99부터 불법입니다."
     ]
    ],
    [
     "C에서 리터럴 3.14의 타입은?",
     [
      "double",
      "float",
      "int"
     ],
     "접미사가 없는 실수 리터럴은 double입니다(3.14f가 float).",
     [
      "맞습니다.",
      "f 접미사가 필요합니다.",
      "실수입니다."
     ]
    ]
   ],
   "image": "pages/pl09-71.jpg",
   "text": "Implicit Types\n\n• Implicit types: types that are not explicitly given in a declaration\n\n– The type must be inferred by the translator, either from context\n\n•\n\n•\n•\n\ninformation or from standard rules\nIn C:\n• Variables are implicitly integers if no type is given,\n• Functions implicitly return an integer value if no return type is given\n• Note: since C99, implicit integer (omitting the type in a declaration)\nis illegal. Literals and expressions are still implicitly typed.\nIn Pascal named constants are implicitly typed by the literals they\nrepresent\nLiterals are the major example of implicitly typed entities\n\n• e.g., 10 : int, 3.14: double, ‘A’: int (in C), char in C++ and Java\n\n71",
   "quiz": [
    "C89에서 반환 타입을 생략한 함수 f(x) { … }의 반환 타입은?",
    [
     "int",
     "void",
     "컴파일 오류"
    ],
    "원문: Functions implicitly return an integer value if no return type is given."
   ],
   "quizReasons": [
    "맞습니다.",
    "예전 규칙은 int입니다.",
    "C89에서는 허용됩니다."
   ]
  },
  {
   "page": 72,
   "title": "겹치는 타입과 여러 타입을 갖는 값",
   "explanation": "두 타입은 공통 값을 가지며 겹칠 수 있습니다. 타입이 서로 겹치지 않는 편이 바람직하지만, 그렇게 하면 객체 지향 언어에서 상속으로 서브타입을 만드는 능력이 사라집니다. C의 int와 unsigned int, 리터럴 0, Java의 null이 겹침의 예입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "두 타입이 공통 값을 가지며 겹칠 수 있다.",
     "타입이 서로소(disjoint)이면 좋지만, 그러면 상속으로 서브타입을 만드는 능력을 잃는다(서브타입 값은 부모 타입의 값이기도 하다).",
     "C: unsigned int와 int는 겹친다(0 ~ INT_MAX).",
     "C: 리터럴 0은 모든 정수 타입의 값이자 모든 포인터 타입의 값이며, 널 포인터를 나타낸다.",
     "Java: 리터럴 null은 모든 참조 타입의 값이다."
    ],
    "analogy": "한 사람이 \"학생\"이면서 \"동아리 회원\"일 수 있는 것처럼 하나의 값이 여러 타입에 속할 수 있습니다. 0은 정수 모임에도, 포인터 모임에도 들어가는 \"만능 회원\"입니다.",
    "examples": [
     {
      "title": "0과 null은 여러 타입의 값",
      "code": "int      i = 0;\nunsigned u = 0;\nchar     c = 0;\ndouble  *p = 0;      /* 0 → 널 포인터 */",
      "lang": "C",
      "out": "",
      "note": "같은 리터럴 0이 네 가지 타입의 값으로 쓰였습니다.",
      "error": false
     },
     {
      "title": "",
      "code": "String   s = null;   // OK\nInteger  n = null;   // OK\nint[]    a = null;   // OK (배열도 참조 타입)\nint      k = null;   // 기본 타입에는 null이 없음",
      "lang": "Java",
      "out": "error: incompatible types: <null> cannot be converted to int",
      "note": "",
      "error": true
     }
    ],
    "steps": [
     "int의 값 범위와 unsigned int의 값 범위를 그려 본다 → 0부터 INT_MAX까지가 공통 부분이다.",
     "C에서 리터럴 0은 정수 문맥에서는 정수 0, 포인터 문맥에서는 널 포인터가 된다.",
     "Java의 null은 어떤 참조 타입 변수에도 들어갈 수 있다 → 모든 참조 타입의 값.",
     "기본 타입(int)은 참조 타입이 아니므로 null을 담을 수 없다."
    ],
    "trap": [
     "\"0은 포인터 타입의 값\"이라고 해서 아무 정수나 포인터에 넣을 수 있는 것은 아닙니다. 상수 0(널 포인터 상수)만 특별합니다(int *p = 5;는 경고·오류)."
    ],
    "recap": "타입은 겹칠 수 있다(서브타입을 위해 필요). C의 0은 모든 정수·포인터 타입의 값, Java의 null은 모든 참조 타입의 값.",
    "source": "PDF 72쪽"
   },
   "quizzes": [
    [
     "C에서 리터럴 0의 특징은?",
     [
      "모든 정수 타입의 값이자 모든 포인터 타입의 값(널 포인터)이다",
      "int 타입의 값일 뿐이다",
      "포인터에는 쓸 수 없다"
     ],
     "원문: the literal 0 is a value for every integral type, a value of every pointer type.",
     [
      "맞습니다.",
      "여러 타입의 값입니다.",
      "널 포인터로 쓰입니다."
     ]
    ],
    [
     "Java에서 int k = null;은?",
     [
      "컴파일 오류",
      "k = 0",
      "실행 중 NullPointerException"
     ],
     "null은 참조 타입의 값이고 int는 기본 타입입니다.",
     [
      "맞습니다.",
      "자동으로 0이 되지 않습니다.",
      "컴파일 단계에서 거부됩니다."
     ]
    ],
    [
     "원문이 \"타입을 서로소로 만들면 잃는 것\"으로 든 것은?",
     [
      "상속으로 서브타입을 만드는 능력",
      "정수 연산",
      "포인터 산술"
     ],
     "서브타입의 값은 부모 타입의 값이기도 하므로 타입이 겹쳐야 합니다.",
     [
      "맞습니다.",
      "무관합니다.",
      "무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-72.jpg",
   "text": "Overlapping Types and Multiply-Typed Values\n\n• Two types may overlap, with values in common\n• Although preferable for types to be disjoint, this would eliminate the\nability to create subtypes through inheritance in object-oriented\nlanguages\n\n• In C, types like unsigned int and int overlap\n• In C, the literal 0 is a value for every integral type, a value of every\n•\n\npointer type, and represents the null pointer\nIn Java, the literal value null is a value of every reference type\n\n72",
   "quiz": [
    "C에서 리터럴 0의 특징은?",
    [
     "모든 정수 타입의 값이자 모든 포인터 타입의 값(널 포인터)이다",
     "int 타입의 값일 뿐이다",
     "포인터에는 쓸 수 없다"
    ],
    "원문: the literal 0 is a value for every integral type, a value of every pointer type."
   ],
   "quizReasons": [
    "맞습니다.",
    "여러 타입의 값입니다.",
    "널 포인터로 쓰입니다."
   ]
  },
  {
   "page": 73,
   "title": "공유 연산과 연산자 오버로딩",
   "explanation": "각 타입에는 (보통 암묵적으로) 연산들이 연결되어 있습니다. 연산은 여러 타입이 공유하거나, 이름은 같지만 실제로는 다른 연산일 수 있습니다. 예를 들어 +는 실수 덧셈, 정수 덧셈, 집합 합집합일 수 있습니다. 같은 이름을 다른 연산에 쓰는 것을 오버로딩이라 하며, 번역기는 피연산자의 타입으로 어느 연산인지 결정합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "각 타입에는 보통 암묵적으로 연산 집합이 연결된다(4쪽 정의 2).",
     "연산은 여러 타입이 공유하거나, 같은 이름의 서로 다른 연산일 수 있다.",
     "예: +는 실수 덧셈(FPU), 정수 덧셈(ALU), 집합 합집합일 수 있다.",
     "오버로딩(overloaded operation): 같은 이름을 서로 다른 연산에 쓴다.",
     "번역기는 피연산자의 타입을 보고 어떤 연산인지 결정해야 한다."
    ],
    "analogy": "\"열다\"라는 동사는 문을 열 때, 파일을 열 때, 회의를 열 때 하는 일이 모두 다릅니다. 무엇을(피연산자) 여는지 보고 어떤 행동인지 결정하는 것이 오버로딩 해석입니다.",
    "examples": [
     {
      "title": "Java의 +",
      "code": "System.out.println(1 + 2);      // int 덧셈\nSystem.out.println(1.5 + 2);    // double 덧셈 (2 → 2.0)\nSystem.out.println(\"a\" + 1);    // 문자열 연결",
      "lang": "Java",
      "out": "3\n3.5\na1",
      "note": "같은 +가 피연산자 타입에 따라 세 가지 다른 연산으로 번역됩니다.",
      "error": false
     }
    ],
    "steps": [
     "1 + 2: 두 피연산자 모두 int → 정수 덧셈(ALU 명령).",
     "1.5 + 2: double과 int → int를 double로 바꾼 뒤 실수 덧셈(FPU 명령).",
     "\"a\" + 1: 한쪽이 String → 문자열 연결 연산.",
     "번역기는 실행 전에 피연산자 타입으로 연산을 고른다."
    ],
    "trap": [
     "원문의 \"집합 합집합\"을 +로 쓰는 예는 Pascal 등입니다. Python의 집합은 |를 씁니다. 언어마다 연산자 이름이 다릅니다.",
     "오버로딩 해석에는 타입 정보가 필요합니다. 그래서 암묵적 변환이 많으면 어느 연산인지 모호해질 수 있습니다(79쪽)."
    ],
    "recap": "오버로딩 = 같은 이름(+)이 타입에 따라 다른 연산. 번역기가 피연산자 타입으로 결정한다.",
    "source": "PDF 73쪽"
   },
   "quizzes": [
    [
     "오버로딩된 연산(overloaded operation)의 정의는?",
     [
      "같은 이름을 서로 다른 연산에 쓰는 것",
      "연산을 너무 많이 호출하는 것",
      "하나의 연산을 여러 번 정의하는 오류"
     ],
     "원문: the same name is used for different operations.",
     [
      "맞습니다.",
      "무관합니다.",
      "오류가 아닙니다."
     ]
    ],
    [
     "번역기가 오버로딩된 + 중 하나를 고르는 기준은?",
     [
      "피연산자의 타입",
      "변수의 이름",
      "줄 번호"
     ],
     "원문: based on the types of the operands.",
     [
      "맞습니다.",
      "이름은 기준이 아닙니다.",
      "무관합니다."
     ]
    ],
    [
     "Java에서 System.out.println(\"a\" + 1);의 출력은?",
     [
      "a1",
      "컴파일 오류",
      "b"
     ],
     "한쪽이 String이면 +는 문자열 연결입니다.",
     [
      "맞습니다.",
      "합법입니다.",
      "문자 코드 덧셈이 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-73.jpg",
   "text": "Shared Operations\n\n• Each type is associated, usually implicitly, with a set of operations\n• Operations: shared among several types or have the same name as\nother operations that may be different\n\n• Example: + operator can be real addition, integer addition, or set union\n• Integer addition: ALU vs. real addition: FPU\n• Overloaded operation: the same name is used for different operations\n• Translator must decide which operation is meant based on the\ntypes of the operands\n\n73",
   "quiz": [
    "오버로딩된 연산(overloaded operation)의 정의는?",
    [
     "같은 이름을 서로 다른 연산에 쓰는 것",
     "연산을 너무 많이 호출하는 것",
     "하나의 연산을 여러 번 정의하는 오류"
    ],
    "원문: the same name is used for different operations."
   ],
   "quizReasons": [
    "맞습니다.",
    "무관합니다.",
    "오류가 아닙니다."
   ]
  },
  {
   "page": 74,
   "title": "구분 · 타입 변환",
   "explanation": "\"Type Conversion\" 단원의 구분 쪽입니다. 암묵적·명시적 변환, 확대·축소 변환, 캐스트와 업캐스트·다운캐스트, 변환 함수를 다룹니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-74.jpg",
   "text": "Type Conversion\n\n74"
  },
  {
   "page": 75,
   "title": "타입 변환: 암묵적 변환과 확대 변환",
   "explanation": "타입 변환은 한 타입의 값을 다른 타입으로 바꾸는 것입니다. 번역기가 자동으로 끼워 넣는 변환을 암묵적 변환(coercion)이라고 합니다. 대상 타입의 범위가 원래 타입의 범위를 모두 덮으면 확대(widening) 변환입니다. 확대 변환은 오버플로는 없지만 정밀도를 잃을 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "타입 변환: 한 타입에서 다른 타입으로 바꾸는 것. 타입 시스템에 내장되어 자동으로 일어날 수도 있다.",
     "암묵적 변환(coercion): 번역기가 코드에 끼워 넣는 변환.",
     "확대 변환(widening): 대상 타입의 범위가 원래 타입의 범위를 덮는다 → 오버플로 없음. 단, 일부는 정밀도를 잃을 수 있다.",
     "예: Java에서 int 16777217(2²⁴ + 1)을 float에 넣으면 캐스트 없이 컴파일되지만 16777216.0이 된다.",
     "축소 변환(narrowing): 데이터를 잃을 수 있는 변환(76쪽)."
    ],
    "analogy": "확대 변환은 \"작은 컵의 물을 큰 컵에 붓기\"라 넘치지는 않습니다. 하지만 float라는 큰 컵은 눈금이 듬성듬성해서(유효 숫자 24비트), 아주 큰 수는 가장 가까운 눈금으로 반올림됩니다.",
    "examples": [
     {
      "title": "원문 예제: 확대 변환인데 정밀도 손실",
      "code": "int i = 16777217;        // 2^24 + 1\nfloat f = i;             // widening, compiles without cast\nSystem.out.println(f);\nSystem.out.println((int) f);",
      "lang": "Java",
      "out": "1.6777216E7\n16777216",
      "note": "float의 가수(유효 숫자)는 24비트라서 2²⁴ + 1을 정확히 표현할 수 없고 가장 가까운 16777216으로 반올림됩니다.",
      "error": false
     }
    ],
    "steps": [
     "int 16777217을 이진수로 쓰면 1 뒤에 0이 23개, 마지막에 1 → 유효 비트 25개가 필요하다.",
     "float는 유효 비트 24개만 저장한다 → 마지막 1을 담을 수 없다.",
     "가장 가까운 표현 가능한 값 16777216.0으로 반올림된다.",
     "범위(최대 약 3.4 × 10³⁸)는 int를 모두 덮으므로 확대 변환이고, Java는 캐스트 없이 허용한다."
    ],
    "trap": [
     "\"확대 = 손실 없음\"이 아닙니다. 확대 변환은 범위를 덮을 뿐, int → float, long → double처럼 정밀도를 잃을 수 있습니다.",
     "coercion은 \"강제\"라는 뜻이지만 여기서는 \"번역기가 자동으로 하는 변환\"을 가리킵니다."
    ],
    "recap": "암묵적 변환 = 번역기가 넣는 변환. 확대 변환은 범위를 덮어 오버플로는 없지만 정밀도 손실은 가능(int 16777217 → 16777216.0).",
    "source": "PDF 75쪽"
   },
   "quizzes": [
    [
     "Java에서 int i = 16777217; float f = i;일 때 f의 값은?",
     [
      "16777216.0",
      "16777217.0",
      "컴파일 오류"
     ],
     "float의 유효 숫자가 24비트라 2²⁴ + 1을 정확히 담지 못합니다.",
     [
      "맞습니다.",
      "정밀도 손실이 생깁니다.",
      "확대 변환이라 캐스트 없이 허용됩니다."
     ]
    ],
    [
     "확대 변환(widening conversion)의 정의는?",
     [
      "대상 타입의 범위가 원래 타입의 범위를 덮는 변환",
      "값의 비트 수를 줄이는 변환",
      "항상 값이 정확히 보존되는 변환"
     ],
     "원문: target data type's range covers the source type.",
     [
      "맞습니다.",
      "축소에 가깝습니다.",
      "정밀도는 잃을 수 있습니다."
     ]
    ],
    [
     "암묵적 변환(coercion)을 코드에 넣는 주체는?",
     [
      "번역기(컴파일러·인터프리터)",
      "프로그래머",
      "운영체제"
     ],
     "원문: Implicit conversion (or coercion): inserted by the translator.",
     [
      "맞습니다.",
      "프로그래머가 쓰면 명시적 변환(캐스트)입니다.",
      "무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-75.jpg",
   "text": "Type Conversion\n\n• Type conversion: converting from one type to another\n– Can be built into the type system to happen automatically\n\n• Implicit conversion (or coercion): inserted by the translator\n• Widening conversion: target data type’s range covers the source type\n• No overflow, but some may lose precision\n//Java\nint i = 16777217; // 2^24 + 1\nfloat f = i;\n// widening, compiles without cast\n// f == 16777216.0 → precision lost\n\n• Narrowing conversion: conversion may involve a loss of data\n75",
   "quiz": [
    "Java에서 int i = 16777217; float f = i;일 때 f의 값은?",
    [
     "16777216.0",
     "16777217.0",
     "컴파일 오류"
    ],
    "float의 유효 숫자가 24비트라 2²⁴ + 1을 정확히 담지 못합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "정밀도 손실이 생깁니다.",
    "확대 변환이라 캐스트 없이 허용됩니다."
   ]
  },
  {
   "page": 76,
   "title": "축소 변환",
   "explanation": "축소(narrowing) 변환은 대상 타입의 범위가 원래 타입을 덮지 못하는 변환입니다. 값이 넘치거나 잘리거나 정밀도를 잃을 수 있습니다. C는 축소 변환도 암묵적으로 하고, Java는 명시적 캐스트를 요구합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "축소 변환: 대상 타입의 범위가 원래 타입을 덮지 못할 수 있다(예: double → int, int → byte).",
     "값이 넘치거나(overflow), 잘리거나(cut off), 정밀도를 잃을 수 있다.",
     "C: int a = 3.7; → 3(0 쪽으로 버림). float f = 0.1; → 0.100000001490116… int c = 1e10; → 정의되지 않은 동작(int 범위 밖).",
     "Java: 명시적 캐스트가 필요하다. (int) 3.7 → 3, float f = 0.1f 또는 (float) 0.1, (int) 1e10 → 2147483647(최댓값으로 고정).",
     "Java에서 int a = 3.7; float f = 0.1;은 컴파일 오류다."
    ],
    "analogy": "큰 컵의 물을 작은 컵에 붓는 것입니다. C는 \"알아서 부어 줄게, 넘치는 건 모르겠다\", Java는 \"넘칠 수 있으니 직접 붓겠다고 말해(캐스트)\"라고 요구합니다. Java는 넘치는 물을 컵 가장자리까지만 채웁니다(최댓값 고정).",
    "examples": [
     {
      "title": "Java: 캐스트로 명시",
      "code": "int   a = (int) 3.7;      // 소수 부분 버림\nfloat f = (float) 0.1;    // 또는 0.1f\nint   c = (int) 1e10;     // int 범위 밖\nSystem.out.println(a);\nSystem.out.println(f);\nSystem.out.println((double) f);\nSystem.out.println(c);",
      "lang": "Java",
      "out": "3\n0.1\n0.10000000149011612\n2147483647",
      "note": "f를 출력하면 0.1로 보이지만, double로 넓혀 보면 float에 실제로 저장된 근삿값이 드러납니다.",
      "error": false
     },
     {
      "title": "C: 암묵적 축소",
      "code": "int   a = 3.7;     /* 3 */\nfloat f = 0.1;     /* 0.100000001490116... */\nint   c = 1e10;    /* 정의되지 않은 동작: 경고 가능 */\nprintf(\"%d %.15f\\n\", a, f);",
      "lang": "C",
      "out": "3 0.100000001490116",
      "note": "c의 값은 정해져 있지 않으므로 출력하지 않았습니다. GCC는 1e10 줄에 \"overflow in conversion\" 경고를 냅니다.",
      "error": false
     }
    ],
    "steps": [
     "3.7 → int: 소수 부분을 0 쪽으로 버린다 → 3. (−3.7이면 −3)",
     "0.1 → float: 0.1은 이진수로 정확히 표현할 수 없어 float의 가장 가까운 값 0.100000001490116…이 된다.",
     "1e10 → int: int 최댓값(2147483647)보다 크다. C는 결과를 정의하지 않는다.",
     "Java는 (int) 1e10을 int 최댓값 2147483647로 고정한다."
    ],
    "trap": [
     "C의 축소는 반올림이 아니라 0 쪽으로 버림입니다. (int) 3.7은 4가 아니라 3입니다.",
     "원문 C 코드의 \"/ / 3\"은 주석 기호 //에 공백이 들어간 슬라이드 서식 문제입니다.",
     "Java의 float f = 0.1;이 오류인 이유: 0.1은 double 리터럴이고, double → float는 축소 변환이기 때문입니다."
    ],
    "recap": "축소 변환 = 넘침·잘림·정밀도 손실 가능. C는 암묵적으로 허용(범위 밖은 정의되지 않은 동작), Java는 캐스트 필요((int) 1e10 = 2147483647).",
    "source": "PDF 76쪽"
   },
   "quizzes": [
    [
     "Java에서 (int) 3.7의 값은?",
     [
      "3",
      "4",
      "컴파일 오류"
     ],
     "소수 부분을 0 쪽으로 버립니다.",
     [
      "맞습니다.",
      "반올림하지 않습니다.",
      "명시적 캐스트이므로 허용됩니다."
     ]
    ],
    [
     "Java에서 (int) 1e10의 값은?",
     [
      "2147483647",
      "정의되지 않음",
      "-2147483648"
     ],
     "원문: out of range, clamped to max.",
     [
      "맞습니다.",
      "C의 경우입니다.",
      "최솟값이 아니라 최댓값으로 고정됩니다."
     ]
    ],
    [
     "C에서 int c = 1e10;의 결과는?",
     [
      "정의되지 않은 동작",
      "항상 2147483647",
      "컴파일 오류"
     ],
     "원문: undefined behavior: out of int range.",
     [
      "맞습니다.",
      "Java의 규칙입니다.",
      "C는 허용합니다(경고 가능)."
     ]
    ]
   ],
   "image": "pages/pl09-76.jpg",
   "text": "Type Conversion\n• Narrowing conversion: the target type's range may not cover the\nsource type\n\n• values can overflow or be cut off, as well as lose precision\n• (e.g., double → int, int → byte)\n// C\nint a = 3.7;\nfloat f = 0.1;\nint c = 1e10;\n\n/ / 3 : fraction cut off (toward zero)\n// 0.100000001490116... : precision lost\n// undefined behavior: out of int range\n\n//Java: use explicit casting\nint a = (int) 3.7;\n// 3 : fraction cut off , a =3.7 compilation error\nfloat f = 0.1f;\n// or f = (float) 0.1; f = 0.1 로 하면 compilation error\nint c = (int) 1e10;\n// 2147483647 : out of range, clamped to max\n\n76",
   "quiz": [
    "Java에서 (int) 3.7의 값은?",
    [
     "3",
     "4",
     "컴파일 오류"
    ],
    "소수 부분을 0 쪽으로 버립니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "반올림하지 않습니다.",
    "명시적 캐스트이므로 허용됩니다."
   ]
  },
  {
   "page": 77,
   "title": "예제 다시 보기: x = y/2 + c의 변환 과정",
   "explanation": "68쪽의 예제를 타입 변환의 관점에서 다시 봅니다. 오른쪽 식에서는 확대 변환(int → long, long → double)이 두 번 일어나고, 마지막 대입에서는 축소 변환(double → float)이 필요합니다. C는 이 축소를 암묵적으로 하고, Java는 거부합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "2(int) → long: 확대 변환(승격).",
     "y/2(long) → double: 확대 변환(승격). y/2 + c는 double.",
     "double → float(x에 대입): 축소 변환.",
     "C: 암묵적으로 축소한다(경고 가능). Java: 명시적 캐스트 없이는 컴파일 오류."
    ],
    "analogy": "재료를 큰 그릇으로 옮기며 섞는 단계(확대)는 문제가 없고, 마지막에 작은 그릇(float)에 담는 단계(축소)가 문제입니다. C는 그냥 담고, Java는 \"덜어 담겠다\"는 표시를 요구합니다.",
    "examples": [
     {
      "title": "Java에서 고친 코드",
      "code": "long y = 5;  float x;  double c = 0.5;\nx = (float)(y / 2 + c);\nSystem.out.println(x);",
      "lang": "Java",
      "out": "2.5",
      "note": "(float)는 합 전체에 적용해야 합니다. (float) y / 2 + c라고 쓰면 계산 순서가 바뀌고 결과도 다시 double이 됩니다.",
      "error": false
     }
    ],
    "steps": [
     "y / 2: 2를 long으로 넓힌다 → long 나눗셈 → 2.",
     "2 + c: 2를 double로 넓힌다 → 2.0 + 0.5 = 2.5(double).",
     "x = 2.5: double → float 축소가 필요하다.",
     "Java는 (float) 캐스트로 명시해야 대입을 허용한다."
    ],
    "trap": [
     "\"C?\", \"Java?\"라는 원문의 질문은 68쪽에 답이 있습니다: C는 경고하거나 허용, Java는 컴파일 오류.",
     "승격(promotion)은 확대 변환의 한 종류입니다. 식을 계산하려고 피연산자를 공통 타입으로 넓히는 것을 말합니다."
    ],
    "recap": "x = y/2 + c: 오른쪽은 확대 변환 두 번(int→long, long→double), 대입은 축소 변환(double→float).",
    "source": "PDF 77쪽"
   },
   "quizzes": [
    [
     "y/2 + c(y는 long, c는 double)의 타입은?",
     [
      "double",
      "long",
      "float"
     ],
     "long과 double이 만나면 double로 승격됩니다.",
     [
      "맞습니다.",
      "c가 double입니다.",
      "대입 전의 식은 double입니다."
     ]
    ],
    [
     "이 예제의 오른쪽 식에서 일어나는 확대 변환 두 가지는?",
     [
      "int → long, long → double",
      "double → float, long → int",
      "float → double, int → char"
     ],
     "2가 long으로, y/2가 double로 넓혀집니다.",
     [
      "맞습니다.",
      "축소 변환입니다.",
      "이 예제와 무관합니다."
     ]
    ],
    [
     "Java에서 x에 대입하도록 고친 코드로 알맞은 것은?",
     [
      "x = (float)(y / 2 + c);",
      "x = y / 2 + c;",
      "x = (float) y / 2 + c;"
     ],
     "합 전체를 float로 바꿔야 합니다.",
     [
      "맞습니다.",
      "원래의 오류 코드입니다.",
      "결과가 다시 double이 됩니다."
     ]
    ]
   ],
   "image": "pages/pl09-77.jpg",
   "text": "Example\nlong y;\nfloat x;\ndouble c;\nx = y/2 + c;\n\n●\n\ny long, 2 is int, so promoted to long, y/2\nlong.\n\n●\n\nc is double, y/2 is long, so promoted to\ndouble, y/2 + c is double.\n\n●\n\nx Is float, y/2+c is double, what\nhappens?\n○\n\nC?\n\n○\n\nJava?\n\n77",
   "quiz": [
    "y/2 + c(y는 long, c는 double)의 타입은?",
    [
     "double",
     "long",
     "float"
    ],
    "long과 double이 만나면 double로 승격됩니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "c가 double입니다.",
    "대입 전의 식은 double입니다."
   ]
  },
  {
   "page": 78,
   "title": "암묵적 변환과 명시적 변환(캐스트)",
   "explanation": "암묵적 변환은 편리하지만 타입 검사를 약하게 만들어 오류를 놓치게 하고, 프로그래머의 예상과 다르게 변환되면 뜻밖의 동작을 낳습니다. 명시적 변환(캐스트)은 변환이 코드에 드러나 뜻밖의 동작이 줄고, 번역기가 오버로딩을 해석하기도 쉬워집니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "암묵적 변환의 단점 ① 타입 검사를 약하게 해 오류가 잡히지 않을 수 있다.",
     "암묵적 변환의 단점 ② 프로그래머의 예상과 다른 방식으로 변환되면 뜻밖의 동작을 한다.",
     "명시적 변환(캐스트): 변환 지시를 코드에 직접 적는다.",
     "캐스트의 장점: 변환이 문서화되고, 뜻밖의 동작 가능성이 줄고, 번역기가 오버로딩을 해석하기 쉬워진다."
    ],
    "analogy": "암묵적 변환은 \"말 안 해도 알아서 바꿔 주는 비서\"입니다. 편하지만 가끔 내 생각과 다르게 바꿉니다. 명시적 변환은 \"이렇게 바꿔 주세요\"라고 적어 주는 메모라서 읽는 사람도 무슨 일이 일어나는지 압니다.",
    "examples": [
     {
      "title": "뜻밖의 암묵적 변환",
      "code": "int      i = -1;\nunsigned u = 1;\nif (i < u) printf(\"yes\\n\");\nelse       printf(\"no\\n\");",
      "lang": "C",
      "out": "no",
      "note": "i가 unsigned로 바뀌어 4294967295가 되므로(32비트 unsigned 기준) -1 < 1이 거짓이 됩니다. 컴파일러는 기본 설정에서 아무 말도 하지 않습니다(-Wsign-compare를 켜면 경고). (보충 예제)",
      "error": false
     },
     {
      "title": "캐스트로 의도를 드러내기",
      "code": "if (i < (int) u) printf(\"yes\\n\");",
      "lang": "C",
      "out": "yes",
      "note": "어떤 타입으로 비교할지 코드에 적었으므로 결과를 예측할 수 있습니다.",
      "error": false
     }
    ],
    "steps": [
     "i < u에서 피연산자 타입이 int와 unsigned int로 다르다.",
     "C의 일반 산술 변환 규칙에 따라 int가 unsigned int로 바뀐다 → -1은 4294967295.",
     "4294967295 < 1은 거짓 → \"no\".",
     "(int) u로 명시하면 int끼리 비교 → -1 < 1 → \"yes\"."
    ],
    "trap": [
     "명시적 캐스트도 만능은 아닙니다. 잘못된 캐스트는 오류를 숨길 수 있습니다(80·82쪽). 장점은 \"변환이 일어난다는 사실이 보인다\"는 것입니다."
    ],
    "recap": "암묵적 변환 = 편리하지만 오류를 숨기고 예상 밖 동작 가능. 명시적 변환 = 의도가 드러나고 오버로딩 해석이 쉬움.",
    "source": "PDF 78쪽"
   },
   "quizzes": [
    [
     "C에서 int i = -1; unsigned u = 1;일 때 i < u의 결과는?",
     [
      "거짓",
      "참",
      "컴파일 오류"
     ],
     "i가 unsigned로 변환되어 매우 큰 수가 됩니다.",
     [
      "맞습니다.",
      "암묵적 변환을 고려하지 않았습니다.",
      "허용됩니다."
     ]
    ],
    [
     "원문이 든 명시적 변환(캐스트)의 장점이 아닌 것은?",
     [
      "모든 변환 오류를 실행 전에 자동으로 고쳐 준다",
      "변환이 코드에 문서화된다",
      "번역기가 오버로딩을 해석하기 쉬워진다"
     ],
     "캐스트는 의도를 보여 줄 뿐 오류를 고쳐 주지 않습니다.",
     [
      "원문에 없는 주장입니다.",
      "원문의 장점입니다.",
      "원문의 장점입니다."
     ]
    ],
    [
     "원문이 든 암묵적 변환의 위험은?",
     [
      "타입 검사를 약하게 해 오류가 잡히지 않을 수 있다",
      "프로그램이 항상 느려진다",
      "모든 변환이 컴파일 오류가 된다"
     ],
     "원문: Can weaken type checking so that errors may not be caught.",
     [
      "맞습니다.",
      "원문의 위험이 아닙니다.",
      "반대입니다."
     ]
    ]
   ],
   "image": "pages/pl09-78.jpg",
   "text": "Type Conversion\n\n• Implicit conversion:\n– Can weaken type checking so that errors may not be caught\n– Can cause unexpected behavior if the conversion is done in a\ndifferent way than the programmer expects\n\n• Explicit conversion (or cast): conversion directives are written into\nthe code\n\n– Conversions are documented in the code\n– Less likelihood of unexpected behavior\n– Makes it easier for the translator to resolve overloading\n78",
   "quiz": [
    "C에서 int i = -1; unsigned u = 1;일 때 i < u의 결과는?",
    [
     "거짓",
     "참",
     "컴파일 오류"
    ],
    "i가 unsigned로 변환되어 매우 큰 수가 됩니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "암묵적 변환을 고려하지 않았습니다.",
    "허용됩니다."
   ]
  },
  {
   "page": 79,
   "title": "오버로딩과 암묵적 변환이 만나면: 모호한 호출",
   "explanation": "C++에 max(int, double)과 max(double, int)가 함께 있을 때 max(2, 3)은 모호합니다. 첫 번째 인자를 double로 바꾸든 두 번째 인자를 바꾸든 똑같이 한 번의 변환이 필요해 어느 쪽도 더 낫지 않기 때문입니다. Java는 산술 타입에 확대 암묵 변환만 허용하고, C++는 축소 변환에 경고를 냅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "double max(int, double); double max(double, int); max(2, 3);",
     "후보 1: 둘째 인자 3을 double로 변환. 후보 2: 첫째 인자 2를 double로 변환.",
     "두 후보 모두 인자 하나에서만 더 잘 맞는다 → 최선의 후보가 없어 모호(ambiguous).",
     "Java는 산술 타입에 대해 확대 암묵 변환만 허용한다.",
     "C++는 축소 변환에 경고 메시지를 낸다."
    ],
    "analogy": "두 식당 중 하나를 고르는데, A는 가깝지만 비싸고 B는 싸지만 멉니다. 둘 다 한 가지씩 더 낫다면 \"어느 쪽이 더 좋다\"고 정할 수 없습니다. 컴파일러도 이럴 때 고르지 않고 오류를 냅니다.",
    "examples": [
     {
      "title": "원문 예제",
      "code": "double max(int, double);\ndouble max(double, int);\nmax(2, 3);",
      "lang": "C++",
      "out": "error: call of overloaded 'max(int, int)' is ambiguous",
      "note": "",
      "error": true,
      "outLabel": "컴파일 결과 예 · g++"
     },
     {
      "title": "모호함 없애기",
      "code": "max(2, 3.0);   // max(int, double)과 정확히 일치\nmax(2.0, 3);   // max(double, int)과 정확히 일치\nmax(2, (double) 3);",
      "lang": "C++",
      "out": "세 호출 모두 컴파일됨",
      "note": "인자 타입을 맞추거나 캐스트로 명시하면 후보가 하나로 정해집니다(78쪽 캐스트의 장점).",
      "error": false,
      "outLabel": "컴파일 결과"
     }
    ],
    "steps": [
     "인자 타입은 (int, int)다.",
     "max(int, double): 첫 인자 정확히 일치, 둘째 인자 int → double 변환 필요.",
     "max(double, int): 첫 인자 int → double 변환 필요, 둘째 인자 정확히 일치.",
     "어느 후보도 모든 인자에서 다른 후보보다 낫지 않다 → 모호한 호출 오류."
    ],
    "trap": [
     "\"먼저 선언된 함수가 선택된다\" 같은 규칙은 없습니다.",
     "Java의 \"확대만 암묵 허용\"에는 예외가 하나 있습니다. byte b = 10;처럼 범위 안의 상수를 대입할 때는 축소 변환이 허용됩니다(보충)."
    ],
    "recap": "오버로딩 + 암묵적 변환 → 같은 비용의 후보가 둘이면 모호. Java는 산술 확대 변환만 암묵 허용, C++는 축소에 경고.",
    "source": "PDF 79쪽"
   },
   "quizzes": [
    [
     "C++에서 f(int, double)과 f(double, int)가 있을 때 f(1, 2)는?",
     [
      "호출이 모호하다",
      "첫 번째 선언이 무조건 선택된다",
      "두 번째 선언이 무조건 선택된다"
     ],
     "각 후보가 인자 하나에서만 더 잘 맞습니다.",
     [
      "맞습니다.",
      "선언 순서는 기준이 아닙니다.",
      "선언 순서는 기준이 아닙니다."
     ]
    ],
    [
     "같은 상황에서 max(2, 3.0)이 선택하는 함수는?",
     [
      "max(int, double)",
      "max(double, int)",
      "여전히 모호하다"
     ],
     "두 인자가 모두 정확히 일치합니다.",
     [
      "맞습니다.",
      "첫 인자를 변환해야 합니다.",
      "정확히 일치하는 후보가 있습니다."
     ]
    ],
    [
     "원문에 따르면 Java가 산술 타입에 허용하는 암묵적 변환은?",
     [
      "확대 변환만",
      "축소 변환만",
      "확대와 축소 모두"
     ],
     "원문: Java only permits widening implicit conversions for arithmetic types.",
     [
      "맞습니다.",
      "반대입니다.",
      "축소는 캐스트가 필요합니다."
     ]
    ]
   ],
   "image": "pages/pl09-79.jpg",
   "text": "Type Conversion (cont’d.)\n\n• Example In C++:\ndouble max (int, double);\ndouble max (double, int);\nmax (2, 3)\n\n– Ambiguous, because of the possible implicit conversions from int\nto double on either first or second parameter\n\n• Java only permits widening implicit conversions for arithmetic types\n• C++ emits warning messages for narrowing\n79",
   "quiz": [
    "C++에서 f(int, double)과 f(double, int)가 있을 때 f(1, 2)는?",
    [
     "호출이 모호하다",
     "첫 번째 선언이 무조건 선택된다",
     "두 번째 선언이 무조건 선택된다"
    ],
    "각 후보가 인자 하나에서만 더 잘 맞습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "선언 순서는 기준이 아닙니다.",
    "선언 순서는 기준이 아닙니다."
   ]
  },
  {
   "page": 80,
   "title": "명시적 캐스트의 제한",
   "explanation": "명시적 캐스트는 어느 정도 제한되어야 합니다. 보통 단순 타입이나 산술 타입으로 제한합니다. 구조 타입(struct, record)의 캐스트를 허용한다면 메모리 크기가 같아야 하는데, 이는 메모리를 다른 타입으로 재해석하는 것이라 메모리 손상이나 실행 중 오류를 일으킬 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "명시적 캐스트는 보통 단순 타입, 또는 산술 타입으로 제한된다.",
     "구조 타입의 캐스트를 허용한다면 메모리 크기가 같아야 한다 → 번역기가 메모리를 다른 타입으로 재해석한다.",
     "재해석은 메모리 손상이나 실행 중 오류를 일으킬 수 있다.",
     "C의 malloc과 free는 일반(익명) 포인터 타입 void *로 선언되어 있다.",
     "객체 지향 언어는 서브타입 → 슈퍼타입(업캐스트), 그리고 경우에 따라 그 반대(다운캐스트)를 허용한다(81·82쪽)."
    ],
    "analogy": "재해석 캐스트는 \"같은 크기의 종이를 다른 양식으로 읽기\"입니다. 세금 신고서를 주문서 양식으로 읽으면 칸 위치는 맞아도 내용은 엉뚱해집니다.",
    "examples": [
     {
      "title": "값 변환 vs 비트 재해석",
      "code": "#include <stdio.h>\n#include <string.h>\nint main(void) {\n    float f = 1.0f;\n    int converted = (int) f;          /* 값을 바꿈: 1 */\n    int bits;\n    memcpy(&bits, &f, sizeof bits);   /* 같은 비트를 int로 다시 읽음 */\n    printf(\"%d %d 0x%X\\n\", converted, bits, bits);\n}",
      "lang": "C",
      "out": "1 1065353216 0x3F800000",
      "note": "float 1.0의 비트(0x3F800000)를 정수로 읽으면 1이 아니라 1065353216입니다. 같은 크기(4바이트)라도 다른 타입으로 재해석하면 의미가 완전히 달라집니다. (보충 예제)",
      "error": false
     },
     {
      "title": "void *와 malloc",
      "code": "int *a = malloc(10 * sizeof *a);   /* C: void * → int * 암묵 변환 */\nint *b = (int *) malloc(40);       /* C++에서는 캐스트가 필요 */",
      "lang": "C",
      "out": "",
      "note": "malloc은 어떤 타입의 메모리가 필요한지 모르므로 void *를 돌려줍니다.",
      "error": false
     }
    ],
    "steps": [
     "(int) f는 \"값 1.0을 정수 1로\" 바꾸는 표현 변경 변환이다.",
     "memcpy는 float의 4바이트를 그대로 int 4바이트로 옮긴다 → 재해석.",
     "같은 비트 0x3F800000이 int로는 1065353216이다.",
     "구조체 캐스트가 같은 크기를 요구하는 이유도 이것이다. 바이트는 그대로 두고 해석만 바꾸기 때문이다."
    ],
    "trap": [
     "*(int *)&f처럼 포인터 캐스트로 재해석하는 코드는 C의 엄격한 앨리어싱 규칙에 걸려 정의되지 않은 동작이 될 수 있습니다. 예제에서 memcpy를 쓴 이유입니다.",
     "C에서는 void *를 다른 객체 포인터에 넣을 때 캐스트가 없어도 되지만, C++에서는 필요합니다."
    ],
    "recap": "캐스트는 보통 단순·산술 타입으로 제한. 구조 타입 캐스트는 같은 크기의 메모리 재해석이라 위험. malloc은 void *를 쓴다.",
    "source": "PDF 80쪽"
   },
   "quizzes": [
    [
     "C의 malloc이 돌려주는 포인터 타입은?",
     [
      "void *",
      "int *",
      "char"
     ],
     "원문: malloc and free functions are declared using a generic pointer type void*.",
     [
      "맞습니다.",
      "사용하는 쪽에서 바꿉니다.",
      "포인터가 아닙니다."
     ]
    ],
    [
     "구조 타입 사이의 캐스트를 허용할 때 같은 메모리 크기가 필요한 이유는?",
     [
      "메모리를 그대로 두고 다른 타입으로 재해석하기 때문",
      "필드 이름을 비교하기 위해",
      "가비지 컬렉션을 위해"
     ],
     "원문: Allows translation to reinterpret the memory as a different type.",
     [
      "맞습니다.",
      "이름과 무관합니다.",
      "무관합니다."
     ]
    ],
    [
     "float 1.0의 비트를 그대로 int로 읽은 값(위 예제)은?",
     [
      "1065353216",
      "1",
      "0"
     ],
     "float 1.0의 비트 패턴 0x3F800000을 정수로 읽은 값입니다.",
     [
      "맞습니다.",
      "값 변환 (int) f의 결과입니다.",
      "비트가 0이 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-80.jpg",
   "text": "Type Conversion\n\n• Explicit casts need to be somewhat restricted\n– Often to simple types, or just arithmetic types\n\n• If casts are permitted for structured types (e.g., struct, record), they\nmust have identical sizes in memory\n\n– Allows translation to reinterpret the memory as a different type\n– causes memory corruption or runtime error\n\n• Example: in C, malloc and free functions are declared using a\ngeneric pointer or anonymous pointer type void*\n\n• Object-oriented languages allow conversions from subtypes to\nsupertypes (upcasting) and back (downcasting) in some cases\n80",
   "quiz": [
    "C의 malloc이 돌려주는 포인터 타입은?",
    [
     "void *",
     "int *",
     "char"
    ],
    "원문: malloc and free functions are declared using a generic pointer type void*."
   ],
   "quizReasons": [
    "맞습니다.",
    "사용하는 쪽에서 바꿉니다.",
    "포인터가 아닙니다."
   ]
  },
  {
   "page": 81,
   "title": "Java의 변환 네 가지",
   "explanation": "Java의 변환은 \"암묵적/명시적\"과 \"표현이 바뀌는지/안 바뀌는지\"로 나눠 볼 수 있습니다. int → double 승격은 암묵적이며 표현이 바뀌고, 업캐스트는 암묵적이며 표현이 그대로입니다. (int) 1.5는 명시적이며 표현이 바뀌고, 다운캐스트는 명시적이며 표현이 그대로입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "암묵적 + 표현 변경: 타입 승격. 예: int → double.",
     "암묵적 + 표현 그대로: 업캐스트(서브타입 → 슈퍼타입). SubA s = new SubA(); A a = s; 객체는 그대로이고 참조의 타입만 바뀐다.",
     "명시적 + 표현 변경: double x = 1.5; int y = (int) x; → 64비트 0x3FF8000000000000이 32비트 0x00000001로 바뀐다.",
     "명시적 + 표현 그대로: 다운캐스트(슈퍼타입 → 서브타입). A a = new SubA(); SubA s = (SubA) a; 객체는 그대로이고 참조의 타입만 바뀐다."
    ],
    "analogy": "표현 변경은 \"원화를 달러로 환전\"(돈의 형태 자체가 바뀜)이고, 표현 그대로는 \"같은 사람을 학생증으로 보다가 사원증으로 보기\"(사람은 그대로, 보는 관점만 바뀜)입니다.",
    "examples": [
     {
      "title": "2 × 2로 정리",
      "code": "",
      "lang": "",
      "out": "                 표현이 바뀜                      표현 그대로(참조 타입만 바뀜)\n암묵적 변환     int → double (승격)              업캐스트  A a = s;\n명시적 변환     (int) 1.5 → 1                    다운캐스트 (SubA) a",
      "note": "",
      "error": false,
      "outLabel": "정리표"
     },
     {
      "title": "비트가 실제로 바뀌는지 확인",
      "code": "double x = 1.5;\nint y = (int) x;\nSystem.out.println(Long.toHexString(Double.doubleToLongBits(x)));\nSystem.out.println(Integer.toHexString(y));",
      "lang": "Java",
      "out": "3ff8000000000000\n1",
      "note": "1.5의 double 표현과 정수 1의 표현은 완전히 다른 비트입니다. 원문의 16진수 값과 일치합니다.",
      "error": false
     }
    ],
    "steps": [
     "변환 전후의 메모리 표현이 다른가? 숫자 타입 사이(int, double)는 다르다 → 표현 변경.",
     "참조 타입 사이(A, SubA)는 객체를 건드리지 않고 \"어떤 타입으로 보는가\"만 바뀐다 → 표현 그대로.",
     "안전한 방향(넓히기, 업캐스트)은 암묵적으로 허용된다.",
     "위험할 수 있는 방향(축소, 다운캐스트)은 명시적 캐스트가 필요하다."
    ],
    "trap": [
     "다운캐스트는 표현을 바꾸지 않으므로, 객체가 실제로 그 타입이 아니면 바꿔 줄 수 없습니다. 그래서 실행 중 검사가 필요합니다(82쪽)."
    ],
    "recap": "Java 변환 = (암묵적/명시적) × (표현 변경/그대로): 승격, 업캐스트, 숫자 캐스트, 다운캐스트.",
    "source": "PDF 81쪽"
   },
   "quizzes": [
    [
     "Java의 int → double 승격은 어디에 속하는가?",
     [
      "암묵적 변환, 표현 변경",
      "암묵적 변환, 표현 그대로",
      "명시적 변환, 표현 그대로"
     ],
     "정수와 실수는 메모리 표현이 다릅니다.",
     [
      "맞습니다.",
      "업캐스트에 해당합니다.",
      "다운캐스트에 해당합니다."
     ]
    ],
    [
     "Java의 다운캐스트 (SubA) a는 어디에 속하는가?",
     [
      "명시적 변환, 표현 그대로",
      "암묵적 변환, 표현 변경",
      "명시적 변환, 표현 변경"
     ],
     "원문: No representation change — downcasting. 객체는 그대로, 참조의 타입만 바뀜.",
     [
      "맞습니다.",
      "캐스트가 필요합니다.",
      "객체 표현은 바뀌지 않습니다."
     ]
    ],
    [
     "double x = 1.5; int y = (int) x;에서 y는?",
     [
      "1",
      "2",
      "1.5"
     ],
     "소수 부분을 버립니다.",
     [
      "맞습니다.",
      "반올림하지 않습니다.",
      "int에는 소수가 없습니다."
     ]
    ]
   ],
   "image": "pages/pl09-81.jpg",
   "text": "Example: Java\n● Implicit conversion:\n○\n\n○\n\nRepresentation change\n■ type promotion, e.g., int to double\nNo representation change (객체는 그대로, 참조 타입만 바뀜)\nSubA s = new SubA();\n■ upcasting (subtype to super type)\nA a = s; // implicit upcasting\n\n● Explicit conversion:\n○\n\n○\n\nRepresentation change\ndouble x = 1.5; // x: 0x3FF8000000000000 (64bits)\nint y = (int)x; // y: 0x00000001(32비트)\nNo representation change\nA a = new SubA();\n■ downcasting (super type to subtype) SubA s = (SubA) a;\n\n81\n// 객체는 그대로, 참조의 타입만 바뀜",
   "quiz": [
    "Java의 int → double 승격은 어디에 속하는가?",
    [
     "암묵적 변환, 표현 변경",
     "암묵적 변환, 표현 그대로",
     "명시적 변환, 표현 그대로"
    ],
    "정수와 실수는 메모리 표현이 다릅니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "업캐스트에 해당합니다.",
    "다운캐스트에 해당합니다."
   ]
  },
  {
   "page": 82,
   "title": "Java 업캐스트와 다운캐스트",
   "explanation": "SubA가 A를 상속하고, A에는 필드 x, SubA에는 필드 y가 있습니다. A a = new SubA();라면 컴파일러는 a를 A로만 보므로 a.x는 되지만 a.y는 컴파일 오류입니다. 실행 중 실제 객체 타입은 SubA입니다. ((SubA) a).y처럼 캐스트하면 실행 중 검사를 통과해 접근할 수 있습니다. 하지만 실제 A 객체를 SubA로 다운캐스트하면 컴파일은 되어도 실행 중 ClassCastException이 납니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "SubA s = new SubA(); A a = s; → 암묵적 업캐스트, OK.",
     "A a = new SubA(); a.x → OK(A에 x가 있음). a.y → 컴파일 오류(컴파일러는 a를 A로만 봄).",
     "a.getClass() → class SubA(실행 중 실제 객체의 타입).",
     "((SubA) a).y → OK. 캐스트로 \"SubA로 보겠다\"고 알리고, 실행 중 검사를 통과한다.",
     "A a = new A(); SubA s = (SubA) a; → 컴파일 OK, 실행 중 ClassCastException."
    ],
    "analogy": "\"동물\" 상자에 \"강아지\"를 넣으면(업캐스트) 상자 라벨만 보고는 \"짖기\"를 시킬 수 없습니다(a.y 오류). \"강아지 맞아\"라고 확인하고 꺼내면 짖게 할 수 있지만(다운캐스트), 상자 안이 고양이라면 확인 단계에서 걸립니다(ClassCastException).",
    "examples": [
     {
      "title": "원문 예제를 실행 가능한 형태로",
      "code": "class A    { int x = 1; }\nclass SubA extends A { int y = 2; }\n\nA a1 = new SubA();\nSystem.out.println(a1.x);              // OK\n// System.out.println(a1.y);           // 컴파일 오류: A에는 y가 없음\nSystem.out.println(a1.getClass());     // 실제 객체 타입\nSystem.out.println(((SubA) a1).y);     // 캐스트 후 접근\n\nA a2 = new A();\nSubA s = (SubA) a2;                    // 컴파일 OK",
      "lang": "Java",
      "out": "1\nclass SubA\n2\nException in thread \"main\" java.lang.ClassCastException:\n    class A cannot be cast to class SubA",
      "note": "원문은 변수 이름 a, s를 여러 번 다시 선언하므로, 한 프로그램에서 실행되도록 a1, a2로 나누었습니다.",
      "error": true,
      "outLabel": "실행 결과 예"
     }
    ],
    "steps": [
     "a1의 선언 타입은 A, 실제 객체는 SubA다.",
     "컴파일러는 선언 타입 A만 보고 멤버를 확인한다 → x는 있음, y는 없음.",
     "(SubA) a1: 실행 중 \"실제 객체가 SubA인가?\"를 검사한다 → 맞으므로 y = 2를 읽는다.",
     "(SubA) a2: 실제 객체가 A이므로 검사에 실패한다 → ClassCastException."
    ],
    "trap": [
     "다운캐스트가 컴파일된다고 안전한 것이 아닙니다. 컴파일러는 \"그럴 수도 있다\"만 확인하고, 실제 확인은 실행 중에 합니다(6쪽: 강한 타입 언어도 일부는 실행 중 검사).",
     "getClass()는 선언 타입이 아니라 실제 객체의 클래스를 돌려줍니다."
    ],
    "recap": "업캐스트는 암묵적이고 안전. 다운캐스트는 명시적이며 실행 중 검사를 거쳐 실패하면 ClassCastException.",
    "source": "PDF 82쪽"
   },
   "quizzes": [
    [
     "A a = new SubA(); 다음 a.y(y는 SubA에만 있음)는?",
     [
      "컴파일 오류",
      "2를 읽는다",
      "실행 중 오류"
     ],
     "컴파일러는 a를 선언 타입 A로만 봅니다.",
     [
      "맞습니다.",
      "캐스트가 필요합니다.",
      "컴파일 단계에서 막힙니다."
     ]
    ],
    [
     "A a = new SubA(); a.getClass()의 결과는?",
     [
      "class SubA",
      "class A",
      "class Object"
     ],
     "실행 중 실제 객체의 타입을 돌려줍니다.",
     [
      "맞습니다.",
      "선언 타입입니다.",
      "실제 클래스가 있습니다."
     ]
    ],
    [
     "Java에서 실제 객체와 맞지 않는 참조 다운캐스트의 결과는?",
     [
      "실행 중 ClassCastException",
      "객체가 대상 타입으로 변경된다",
      "새 객체가 자동 생성된다"
     ],
     "다운캐스트는 표현을 바꾸지 않으므로 맞지 않으면 실패합니다.",
     [
      "맞습니다.",
      "객체는 바뀌지 않습니다.",
      "새 객체를 만들지 않습니다."
     ]
    ]
   ],
   "image": "pages/pl09-82.jpg",
   "text": "Java\n\nSubA extends A\n\nA\n\nx\n\nSub A\n\ny\n\nSubA s = new SubA();\nA a = s;\n// OK: implicit upcasting\nA a = new SubA();\na.x;\na.y;\na.getClass();\n((SubA) a).y;\n\n// OK: A에 x가 있음\n// 컴파일 에러: 컴파일러는 a를 A로만 봄\n// class SubA: 실행 중 실제 객체 타입\n// OK: 캐스트로 SubA로 보겠다고 알려 줌, 실행 중 검사 통과\n\nA a = new A();\nSubA s = (SubA) a; // explicit downcasting, 컴파일 OK,\n// runtime에 ClassCastException error\n82",
   "quiz": [
    "A a = new SubA(); 다음 a.y(y는 SubA에만 있음)는?",
    [
     "컴파일 오류",
     "2를 읽는다",
     "실행 중 오류"
    ],
    "컴파일러는 a를 선언 타입 A로만 봅니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "캐스트가 필요합니다.",
    "컴파일 단계에서 막힙니다."
   ]
  },
  {
   "page": 83,
   "title": "캐스트 대신 변환 함수",
   "explanation": "캐스트의 대안은 미리 정의된 함수나 라이브러리 함수로 변환하는 것이며, 이 방법은 안전합니다. Ada는 속성 함수 Integer'Image(X)로 정수를 문자열로 바꾸고, Java는 Integer.toString(정수 → 문자열)과 Integer.parseInt(문자열 → 정수)를 씁니다. 원문의 String.parseInt는 잘못된 이름입니다(아래 자료 검토). 태그 없는 공용체는 서로 다른 타입의 값을 구분할 수 없어 타입 안전성이 없습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "캐스트의 대안: 미리 정의된 함수·라이브러리 함수로 변환한다(안전).",
     "Ada: 속성 함수. Integer'Image(X) — Integer는 타입, Image는 속성, 정수를 문자열 표현으로 바꾼다.",
     "Java: Integer.toString(int → String), Integer.parseInt(String → int).",
     "변환 함수는 잘못된 입력을 검사해 오류로 알린다(예: NumberFormatException).",
     "태그 없는 공용체: 판별자가 없어 번역기가 값의 타입을 구분할 수 없다 → 타입 안전성 없음."
    ],
    "analogy": "캐스트는 \"이건 숫자라고 우기기\"이고, 변환 함수는 \"통역사에게 맡기기\"입니다. 통역사는 알아들을 수 없는 말(\"4x2\")을 받으면 번역하지 않고 문제를 알려 줍니다.",
    "examples": [
     {
      "title": "Java 변환 함수",
      "code": "int n = Integer.parseInt(\"42\");      // String → int (파싱)\nString s = Integer.toString(42);     // int → String (포매팅)\nSystem.out.println(n + 1);\nSystem.out.println(s + 1);\nSystem.out.println(Integer.parseInt(\"4x2\"));",
      "lang": "Java",
      "out": "43\n421\nException in thread \"main\" java.lang.NumberFormatException: For input string: \"4x2\"",
      "note": "n + 1은 정수 덧셈, s + 1은 문자열 연결입니다. 잘못된 문자열은 조용히 이상한 값이 되지 않고 예외로 알려집니다.",
      "error": true,
      "outLabel": "실행 결과"
     },
     {
      "title": "Ada 속성 함수",
      "code": "put_line(Integer'Image(42));",
      "lang": "Ada",
      "out": " 42",
      "note": "Integer'Image는 음수 부호 자리를 위해 양수 앞에 공백 하나를 붙입니다.",
      "error": false
     }
    ],
    "steps": [
     "Integer.parseInt(\"42\"): 문자 '4', '2'를 읽어 정수 42를 만든다(파싱).",
     "n + 1 = 43(정수 덧셈).",
     "Integer.toString(42) = \"42\", \"42\" + 1 = \"421\"(문자열 연결).",
     "Integer.parseInt(\"4x2\"): 숫자가 아닌 문자 x를 만나 NumberFormatException을 던진다."
    ],
    "trap": [
     "String.parseInt라는 메서드는 없습니다. 시험 답안에는 Integer.parseInt를 쓰세요.",
     "(int) \"42\"처럼 캐스트로 문자열을 정수로 바꿀 수는 없습니다. 문자열 → 정수는 변환 함수(파싱)로만 합니다."
    ],
    "recap": "캐스트 대신 변환 함수(Integer'Image, Integer.toString, Integer.parseInt)를 쓰면 안전하다. 태그 없는 공용체는 타입 안전성이 없다.",
    "source": "PDF 83쪽"
   },
   "quizzes": [
    [
     "Java에서 String을 int로 바꾸는 올바른 메서드는?",
     [
      "Integer.parseInt",
      "String.parseInt",
      "(int) 캐스트"
     ],
     "원문의 String.parseInt는 존재하지 않는 이름입니다.",
     [
      "맞습니다.",
      "Java에 없는 메서드입니다.",
      "문자열은 캐스트로 바꿀 수 없습니다."
     ]
    ],
    [
     "Ada의 Integer'Image(42)의 결과는?",
     [
      "\" 42\" (앞에 공백이 붙은 문자열)",
      "정수 42",
      "\"Image\""
     ],
     "정수를 문자열 표현으로 바꾸며, 양수 앞에는 부호 자리 공백이 붙습니다.",
     [
      "맞습니다.",
      "문자열로 바꿉니다.",
      "속성 이름이 아닙니다."
     ]
    ],
    [
     "문자열 \"42\"에서 정수 42를 얻는 과정은?",
     [
      "파싱",
      "포매팅",
      "업캐스트"
     ],
     "문자열을 읽어 값으로 해석하는 것이 파싱입니다.",
     [
      "맞습니다.",
      "반대 방향(값 → 문자열)입니다.",
      "참조 타입 변환입니다."
     ]
    ]
   ],
   "review": {
    "original": "Java contains functions e.g. … String.parseInt to convert from String to int",
    "checked": "Java 표준 라이브러리에 String.parseInt는 없습니다. 문자열을 int로 바꾸는 메서드는 java.lang.Integer의 Integer.parseInt(String)입니다(Integer.valueOf(String)은 Integer 객체를 돌려줌). int를 String으로 바꾸는 Integer.toString(int)은 원문대로 맞습니다.",
    "label": "원문 오류 · Java API 이름",
    "ask": "강의 자료의 오타로 보입니다. 시험 답안에는 Integer.parseInt를 쓰는 것이 안전합니다."
   },
   "image": "pages/pl09-83.jpg",
   "text": "Type Conversion\n• Alternative to casts is to use predefined or library functions to perform\nconversions (safe)\n– Ada uses attribute functions to allow conversions\n– Example: Integer 'Image(X)\n– Integer: type, Image: attribute, convert integer to string\nrepresentation\n– Java contains functions e.g.\n– Integer.toString to convert from int to String\n– String.parseInt to convert from String to int\n\n• Undiscriminated unions can hold values of different types\n\n– With no discriminant or tag, a translator cannot distinguish values of\none type from another\n– No type safety\n\n83",
   "quiz": [
    "Java에서 String을 int로 바꾸는 올바른 메서드는?",
    [
     "Integer.parseInt",
     "String.parseInt",
     "(int) 캐스트"
    ],
    "원문의 String.parseInt는 존재하지 않는 이름입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "Java에 없는 메서드입니다.",
    "문자열은 캐스트로 바꿀 수 없습니다."
   ]
  },
  {
   "page": 84,
   "title": "구분 · 다형적 타입 검사",
   "explanation": "\"Polymorphic Type Checking\" 단원의 구분 쪽입니다. 선언이 없어도 이름의 사용을 모아 타입을 추론하는 Hindley-Milner 타입 검사를 다룹니다.",
   "kind": "structure",
   "role": "구분 쪽",
   "image": "pages/pl09-84.jpg",
   "text": "Polymorphic Type Checking\n\n84"
  },
  {
   "page": 85,
   "title": "다형적 타입 검사와 타입 추론",
   "explanation": "대부분의 정적 타입 언어는 선언에 모든 이름의 타입을 명시하도록 요구했습니다. 하지만 명시적 선언 없이도 타입을 정할 수 있습니다. 이름이 쓰인 곳들에서 정보를 모아 타입을 추론하고, 어떤 사용이 다른 사용과 맞지 않으면 타입 오류로 판정합니다. 이것이 ML·Haskell이 쓰는 Hindley-Milner 타입 검사입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "대부분의 정적 타입 언어: 선언에서 모든 이름의 타입을 명시해야 한다.",
     "명시적 선언 없이도 타입을 정할 수 있다: 이름의 사용 정보를 모아 그 모든 사용에서 타입을 추론한다.",
     "일부 사용이 다른 사용과 맞지 않으면 타입 오류를 선언한다.",
     "이 타입 추론·검사 방법이 Hindley-Milner 타입 검사이며, ML·Haskell 같은 함수형 언어가 쓴다."
    ],
    "analogy": "탐정이 단서(이름이 쓰인 곳)를 모아 범인(타입)을 추리하는 것과 같습니다. \"x에 2를 곱했다\" → x는 숫자. 단서끼리 모순되면(\"x를 조건으로 쓰면서 1도 더했다\") 추리가 실패한 것, 즉 타입 오류입니다.",
    "examples": [
     {
      "title": "ML의 타입 추론",
      "code": "fun double x = x * 2;\nfun id x = x;\nfun bad x = if x then x + 1 else 0;",
      "lang": "Standard ML",
      "out": "val double = fn : int -> int\nval id = fn : 'a -> 'a\nError: operator and operand don't agree (bad: x가 bool이면서 int)",
      "note": "타입을 하나도 적지 않았지만 double은 int -> int, id는 어떤 타입에도 쓸 수 있는 'a -> 'a로 추론됩니다. bad는 사용이 서로 맞지 않아 거부됩니다(오류 문구는 구현마다 다름).",
      "error": true,
      "outLabel": "출력 예 · SML/NJ"
     }
    ],
    "steps": [
     "double: x * 2에서 2가 int이므로 x도 int, 결과도 int → int -> int.",
     "id: x를 그대로 돌려줄 뿐 x에 대한 제약이 없다 → 아무 타입 'a → 'a -> 'a(다형적).",
     "bad: if x then …에서 x는 bool이어야 한다.",
     "x + 1에서 x는 int여야 한다 → bool과 int가 충돌 → 타입 오류."
    ],
    "trap": [
     "타입 추론이 있다고 동적 타입 언어가 되는 것은 아닙니다. ML은 실행 전에 모든 타입을 정해 검사하는 정적 타입 언어입니다.",
     "'a(알파)는 \"아직 정해지지 않은, 어떤 타입이든 될 수 있는 자리\"를 뜻하는 타입 변수입니다."
    ],
    "recap": "Hindley-Milner = 선언 없이 이름의 모든 사용에서 타입을 추론하고, 사용끼리 모순되면 타입 오류로 판정하는 정적 검사.",
    "source": "PDF 85쪽"
   },
   "quizzes": [
    [
     "Hindley-Milner 타입 검사는 선언 없는 이름의 타입을 어떻게 정하는가?",
     [
      "이름의 모든 사용에서 정보를 모아 추론한다",
      "실행해 보고 정한다",
      "모든 이름을 int로 가정한다"
     ],
     "원문: collect information on the uses of a name and infer the type from the set of all uses.",
     [
      "맞습니다.",
      "정적 검사입니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "ML에서 fun id x = x;의 추론된 타입은?",
     [
      "'a -> 'a",
      "int -> int",
      "unit"
     ],
     "x에 아무 제약이 없으므로 어떤 타입에도 쓸 수 있는 다형 타입입니다.",
     [
      "맞습니다.",
      "제약이 없어 int로 정할 근거가 없습니다.",
      "함수 타입입니다."
     ]
    ],
    [
     "이름의 어떤 사용이 다른 사용과 맞지 않으면?",
     [
      "타입 오류로 판정한다",
      "나중 사용을 따른다",
      "실행 중에 결정한다"
     ],
     "원문: Can declare a type error because some of the uses are incompatible with others.",
     [
      "맞습니다.",
      "근거가 없습니다.",
      "실행 전에 판정합니다."
     ]
    ]
   ],
   "image": "pages/pl09-85.jpg",
   "text": "Polymorphic Type Checking\n\n• Most statically typed languages required that explicit type\ninformation be given for all names in declarations\n• It is possible to determine types of names without explicit\ndeclaration:\n\n– Can collect information on the uses of a name and infer the type\nfrom the set of all uses\n– Can declare a type error because some of the uses are\nincompatible with others\n\n• This type inference and type checking is called Hindley-Milner\ntype checking\n\n• Functional PL (ML, Haskell)\n\n85",
   "quiz": [
    "Hindley-Milner 타입 검사는 선언 없는 이름의 타입을 어떻게 정하는가?",
    [
     "이름의 모든 사용에서 정보를 모아 추론한다",
     "실행해 보고 정한다",
     "모든 이름을 int로 가정한다"
    ],
    "원문: collect information on the uses of a name and infer the type from the set of all uses."
   ],
   "quizReasons": [
    "맞습니다.",
    "정적 검사입니다.",
    "근거가 없습니다."
   ]
  },
  {
   "page": 86,
   "title": "일반적인 타입 검사 (1): 문법 트리",
   "explanation": "C 코드 a[i] + i를 예로 들면, a는 정수 배열로, i는 정수로 선언되어 있어야 하고 결과는 정수입니다. 타입 검사기는 이 식의 문법 트리에서 시작합니다. 루트는 +, 왼쪽 자식은 첨자 노드 [](자식 a와 i), 오른쪽 자식은 i입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "예제 식: a[i] + i (C).",
     "조건: a는 정수 배열, i는 정수로 선언되어야 하며, 결과는 정수다.",
     "타입 검사기는 문법 트리(Figure 8.8)에서 출발한다.",
     "트리 모양: + 의 왼쪽 = [ ](자식: a, i), 오른쪽 = i."
    ],
    "analogy": "문법 트리는 \"식의 조립도\"입니다. 맨 위에 마지막으로 하는 연산(+)이 있고, 그 아래로 재료가 매달려 있습니다. 타입 검사는 조립도의 각 연결이 맞는 부품인지 확인하는 일입니다.",
    "examples": [
     {
      "title": "a[i] + i의 문법 트리",
      "code": "",
      "lang": "",
      "out": "          +\n        /   \\\n      [ ]    i\n     /   \\\n    a     i",
      "note": "첨자 연산이 덧셈보다 먼저 묶이므로 [ ] 노드가 + 의 왼쪽 자식이 됩니다.",
      "error": false,
      "outLabel": "Figure 8.8 다시 그리기"
     }
    ],
    "steps": [
     "식을 연산자 우선순위대로 묶는다: (a[i]) + i.",
     "가장 나중에 하는 연산 +를 루트로 둔다.",
     "+의 왼쪽 피연산자 a[i]는 첨자 노드 [ ]이고, 그 자식은 a와 i다.",
     "+의 오른쪽 피연산자는 i다. 이 트리의 잎(a, i, i)부터 타입을 채워 올라간다(87~89쪽)."
    ],
    "trap": [
     "i는 트리에 두 번 나타납니다. 같은 변수이므로 같은 타입이어야 한다는 점이 90쪽 이후 추론에서 중요해집니다."
    ],
    "recap": "타입 검사는 문법 트리에서 시작한다. a[i] + i의 트리: + (왼쪽 [ ](a, i), 오른쪽 i).",
    "source": "PDF 86쪽"
   },
   "quizzes": [
    [
     "a[i] + i의 문법 트리에서 루트 노드는?",
     [
      "+",
      "[ ]",
      "a"
     ],
     "가장 나중에 수행하는 연산이 루트입니다.",
     [
      "맞습니다.",
      "+의 왼쪽 자식입니다.",
      "잎 노드입니다."
     ]
    ],
    [
     "첨자 노드 [ ]의 두 자식은?",
     [
      "a와 i",
      "i와 i",
      "a와 +"
     ],
     "a[i]는 배열 a와 인덱스 i로 이루어집니다.",
     [
      "맞습니다.",
      "오른쪽 i는 +의 자식입니다.",
      "+는 부모입니다."
     ]
    ],
    [
     "C에서 a[i] + i가 정수 결과를 내려면 a는 어떻게 선언되어야 하는가?",
     [
      "정수 배열",
      "실수 배열",
      "함수 포인터"
     ],
     "원문: a must be declared as an array of integers.",
     [
      "맞습니다.",
      "원문 조건과 다릅니다.",
      "첨자 연산 대상이 아닙니다."
     ]
    ]
   ],
   "image": "pages/pl09-86.jpg",
   "text": "Conventional Type Checking\n\n• Example in C code: a[i] + i\n– a must be declared as an\n\n•\n\narray of integers, and i as\nan integer, giving an integer\nresult\nType checker starts out with this\nsyntax tree:\n\n86",
   "quiz": [
    "a[i] + i의 문법 트리에서 루트 노드는?",
    [
     "+",
     "[ ]",
     "a"
    ],
    "가장 나중에 수행하는 연산이 루트입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "+의 왼쪽 자식입니다.",
    "잎 노드입니다."
   ]
  },
  {
   "page": 87,
   "title": "일반적인 타입 검사 (2): 잎에 선언 타입 채우기",
   "explanation": "일반적인 타입 검사에서는 먼저 잎 노드(이름)의 타입을 선언에서 가져와 채웁니다. int a[10]; int i;이므로 a는 array of int, i는 int가 됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "선언: int a[10]; int i;",
     "잎 노드 a의 타입 = array of int(선언에서 가져옴).",
     "잎 노드 i의 타입 = int(두 군데 모두).",
     "이제 아래에서 위로 각 연산 노드를 검사한다(88·89쪽)."
    ],
    "analogy": "조립도의 맨 아래 부품마다 \"규격표\"(선언)를 붙이는 단계입니다. 규격이 붙어야 위쪽 연결부가 맞는지 확인할 수 있습니다.",
    "examples": [
     {
      "title": "잎에 타입을 채운 트리",
      "code": "",
      "lang": "",
      "out": "             +\n           /   \\\n         [ ]    i : int\n        /   \\\na : array of int   i : int",
      "note": "",
      "error": false,
      "outLabel": "잎 타입 채우기"
     }
    ],
    "steps": [
     "선언 int a[10];을 읽어 a에 array of int를 붙인다.",
     "선언 int i;를 읽어 두 i 잎 모두에 int를 붙인다.",
     "아직 [ ]와 + 노드의 타입은 모른다.",
     "다음 단계에서 아래쪽 노드([ ])부터 검사한다."
    ],
    "trap": [
     "일반적인 타입 검사는 선언이 있다는 전제에서 출발합니다. 선언이 없을 때는 타입 변수를 쓰는 Hindley-Milner 방식이 필요합니다(90쪽).",
     "array of int의 크기(10)는 이 검사에서 쓰이지 않습니다. 원소 타입만 중요합니다."
    ],
    "recap": "일반 타입 검사 1단계: 선언에서 잎(이름)의 타입을 가져온다. a: array of int, i: int.",
    "source": "PDF 87쪽"
   },
   "quizzes": [
    [
     "일반적인 타입 검사에서 잎 노드의 타입은 어디서 가져오는가?",
     [
      "선언",
      "실행 결과",
      "연산자"
     ],
     "원문: Types of the names (leaf nodes) are filled in from declarations.",
     [
      "맞습니다.",
      "정적 검사입니다.",
      "연산자는 위쪽 노드입니다."
     ]
    ],
    [
     "int a[10];일 때 잎 a의 타입은?",
     [
      "array of int",
      "int",
      "int *"
     ],
     "배열 선언이므로 int 원소의 배열입니다.",
     [
      "맞습니다.",
      "원소의 타입입니다.",
      "배열 타입 그대로 붙입니다."
     ]
    ],
    [
     "잎에 타입을 채운 뒤 검사하는 방향은?",
     [
      "아래에서 위로(잎 → 루트)",
      "위에서 아래로(루트 → 잎)",
      "오른쪽에서 왼쪽으로만"
     ],
     "자식의 타입을 알아야 부모 연산을 검사할 수 있습니다.",
     [
      "맞습니다.",
      "부모는 자식 정보가 필요합니다.",
      "근거가 없습니다."
     ]
    ]
   ],
   "image": "pages/pl09-87.jpg",
   "text": "Conventional Type Checking (cont’d)\n\n• Types of the names (leaf nodes)\nare filled in from declarations\nint a[10];\nint i;\n...\na[i] + i\n\n87",
   "quiz": [
    "일반적인 타입 검사에서 잎 노드의 타입은 어디서 가져오는가?",
    [
     "선언",
     "실행 결과",
     "연산자"
    ],
    "원문: Types of the names (leaf nodes) are filled in from declarations."
   ],
   "quizReasons": [
    "맞습니다.",
    "정적 검사입니다.",
    "연산자는 위쪽 노드입니다."
   ]
  },
  {
   "page": 88,
   "title": "일반적인 타입 검사 (3): 첨자 노드",
   "explanation": "다음으로 첨자 노드 [ ]를 검사합니다. 왼쪽 피연산자는 배열이어야 하고, 오른쪽 피연산자는 int여야 합니다. 두 조건을 만족하면 첨자 노드의 타입은 배열의 원소 타입인 int로 추론됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "첨자 노드 [ ] 규칙 ① 왼쪽 피연산자는 배열이어야 한다.",
     "규칙 ② 오른쪽 피연산자는 int여야 한다.",
     "추론: 첨자 노드의 타입 = 배열의 원소 타입.",
     "a: array of int, i: int → a[i]: int (Figure 8.10)."
    ],
    "analogy": "\"몇 번째 서랍(정수)을 열어라\"는 요청은 서랍장(배열)에만 할 수 있고, 꺼낸 물건의 종류는 서랍장에 넣어 둔 물건의 종류(원소 타입)입니다.",
    "examples": [
     {
      "title": "첨자 노드까지 채운 트리",
      "code": "",
      "lang": "",
      "out": "             +\n           /   \\\n       [ ] : int    i : int\n        /   \\\na : array of int   i : int",
      "note": "",
      "error": false,
      "outLabel": "Figure 8.10 다시 그리기"
     },
     {
      "title": "규칙을 어기면",
      "code": "int a[10];\ndouble d = 1.0;\nint k = a[d];       /* 첨자가 int가 아님 */",
      "lang": "C",
      "out": "error: array subscript is not an integer",
      "note": "첨자 노드의 오른쪽 규칙이 실패한 예입니다. (보충 예제)",
      "error": true
     }
    ],
    "steps": [
     "왼쪽 a의 타입 array of int → 배열이다 → 규칙 ① 통과.",
     "오른쪽 i의 타입 int → 규칙 ② 통과.",
     "배열의 원소 타입 int를 첨자 노드의 타입으로 정한다.",
     "이제 +의 두 자식 타입이 모두 정해졌다(89쪽)."
    ],
    "trap": [
     "첨자 노드의 타입은 배열 전체의 타입(array of int)이 아니라 원소의 타입(int)입니다."
    ],
    "recap": "첨자 노드: 왼쪽은 배열, 오른쪽은 int여야 하고, 결과 타입은 배열의 원소 타입.",
    "source": "PDF 88쪽"
   },
   "quizzes": [
    [
     "첨자 노드 [ ]의 왼쪽 피연산자 조건은?",
     [
      "배열이어야 한다",
      "int여야 한다",
      "double이어야 한다"
     ],
     "원문: Left operand must be an array.",
     [
      "맞습니다.",
      "오른쪽 피연산자의 조건입니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "첨자 노드 [ ]의 오른쪽 피연산자 조건은?",
     [
      "int여야 한다",
      "배열이어야 한다",
      "아무 타입이나 된다"
     ],
     "원문: Right operand must be an int.",
     [
      "맞습니다.",
      "왼쪽의 조건입니다.",
      "정수여야 합니다."
     ]
    ],
    [
     "a가 array of int일 때 첨자 노드 a[i]의 추론된 타입은?",
     [
      "int",
      "array of int",
      "bool"
     ],
     "원문: Inferred type of the subscript node is the component type of the array — int.",
     [
      "맞습니다.",
      "배열 전체의 타입입니다.",
      "근거가 없습니다."
     ]
    ]
   ],
   "image": "pages/pl09-88.jpg",
   "text": "Conventional Type Checking (cont’d)\n\n• Type checker now checks the\nsubscript node (labeled [])\n\n– Left operand must be an\narray\n– Right operand must be an\nint\n\n– Inferred type of the subscript\nnode is the component type\nof the array - int\n\n88",
   "quiz": [
    "첨자 노드 [ ]의 왼쪽 피연산자 조건은?",
    [
     "배열이어야 한다",
     "int여야 한다",
     "double이어야 한다"
    ],
    "원문: Left operand must be an array."
   ],
   "quizReasons": [
    "맞습니다.",
    "오른쪽 피연산자의 조건입니다.",
    "근거가 없습니다."
   ]
  },
  {
   "page": 89,
   "title": "일반적인 타입 검사 (4): + 노드",
   "explanation": "마지막으로 + 노드를 검사합니다. 두 피연산자는 같은 타입이어야 하고, 그 타입에 + 연산이 있어야 합니다. 결과 타입은 피연산자의 타입이므로 a[i] + i는 int입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "+ 노드 규칙 ① 두 피연산자의 타입이 같아야 한다.",
     "규칙 ② 그 타입에 + 연산이 있어야 한다.",
     "결과 타입 = 피연산자의 타입.",
     "a[i]: int, i: int → 규칙 통과 → a[i] + i: int. 전체 식이 타입 검사를 통과한다."
    ],
    "analogy": "저울 양쪽에 같은 단위(둘 다 kg)를 올려야 더할 수 있고, 더한 결과도 kg입니다. 단위가 다르거나(int와 배열), 더할 수 없는 물건이면 거부됩니다.",
    "examples": [
     {
      "title": "검사가 끝난 트리",
      "code": "",
      "lang": "",
      "out": "           + : int\n           /     \\\n       [ ] : int    i : int\n        /   \\\na : array of int   i : int",
      "note": "",
      "error": false,
      "outLabel": "완성된 트리"
     }
    ],
    "steps": [
     "+의 왼쪽 자식 타입 int, 오른쪽 자식 타입 int를 비교한다 → 같음.",
     "int에는 + 연산(정수 덧셈)이 있다.",
     "결과 타입 = int를 + 노드에 붙인다.",
     "루트까지 타입이 정해졌으므로 식 a[i] + i는 타입이 올바르다."
    ],
    "trap": [
     "이 쪽의 + 규칙(\"두 피연산자가 같은 타입\")은 설명을 위해 단순화한 규칙입니다. 실제 C는 int + double처럼 타입이 달라도 승격 후 더합니다(68쪽).",
     "a[i] + a처럼 int와 배열을 더하는 식은 규칙 ①에서 거부됩니다(C에서는 포인터 산술로 해석되는 또 다른 규칙이 있어 결과가 다름)."
    ],
    "recap": "+ 노드: 두 피연산자가 같은 타입이고 그 타입에 +가 있어야 하며, 결과는 그 타입. a[i] + i는 int.",
    "source": "PDF 89쪽"
   },
   "quizzes": [
    [
     "원문의 + 노드 검사 조건으로 옳은 것은?",
     [
      "두 피연산자가 같은 타입이고 그 타입에 + 연산이 있어야 한다",
      "왼쪽 피연산자가 배열이어야 한다",
      "오른쪽 피연산자가 반드시 상수여야 한다"
     ],
     "원문: Both operands must have the same type / This type must have a + operation.",
     [
      "맞습니다.",
      "첨자 노드의 조건입니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "a[i] + i의 최종 타입은?",
     [
      "int",
      "array of int",
      "double"
     ],
     "피연산자 타입 int가 결과 타입입니다.",
     [
      "맞습니다.",
      "a의 타입입니다.",
      "근거가 없습니다."
     ]
    ],
    [
     "+ 노드의 결과 타입은 무엇으로 정해지는가?",
     [
      "피연산자의 타입",
      "항상 int",
      "왼쪽 자식의 이름"
     ],
     "원문: Result is the type of the operands.",
     [
      "맞습니다.",
      "이 예에서만 int입니다.",
      "이름은 무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-89.jpg",
   "text": "Conventional Type Checking (cont’d)\n• + node type is checked\n– Both operands must have\nthe same type\n– This type must have a +\noperation\n– Result is the type of the\noperands - int\n\n89",
   "quiz": [
    "원문의 + 노드 검사 조건으로 옳은 것은?",
    [
     "두 피연산자가 같은 타입이고 그 타입에 + 연산이 있어야 한다",
     "왼쪽 피연산자가 배열이어야 한다",
     "오른쪽 피연산자가 반드시 상수여야 한다"
    ],
    "원문: Both operands must have the same type / This type must have a + operation."
   ],
   "quizReasons": [
    "맞습니다.",
    "첨자 노드의 조건입니다.",
    "근거가 없습니다."
   ]
  },
  {
   "page": 90,
   "title": "Hindley-Milner 타입 검사 (1): 타입 변수 부여",
   "explanation": "이번에는 a와 i의 선언이 없다고 가정합니다. Hindley-Milner 타입 검사기는 먼저 아직 타입이 없는 모든 이름에 타입 변수를 붙입니다. a에는 α, i에는 β를 붙이고, 두 군데 나오는 i는 같은 변수이므로 둘 다 β입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "상황: a[i] + i에서 a와 i의 선언이 없다.",
     "1단계: 타입이 없는 모든 이름에 타입 변수를 붙인다(Figure 8.12).",
     "a : α, i : β(i가 나오는 두 곳 모두 같은 β).",
     "타입 변수는 \"아직 모르는 타입\"을 나타내는 자리다. 이후 트리를 검사하며 값을 채운다."
    ],
    "analogy": "수학 문제에서 모르는 값을 x, y로 두는 것과 같습니다. a의 타입을 α, i의 타입을 β라고 두고, 식의 조건(방정식)을 하나씩 풀어 값을 찾아 갑니다.",
    "examples": [
     {
      "title": "타입 변수를 붙인 트리",
      "code": "",
      "lang": "",
      "out": "          +\n        /   \\\n      [ ]    i : β\n     /   \\\n a : α    i : β",
      "note": "같은 이름 i에는 같은 타입 변수 β를 씁니다.",
      "error": false,
      "outLabel": "Figure 8.12 다시 그리기"
     }
    ],
    "steps": [
     "트리의 잎 a, i, i를 확인한다. 선언이 없어 타입을 모른다.",
     "새 타입 변수 α를 a에 붙인다.",
     "새 타입 변수 β를 i에 붙인다. 두 번째 i도 같은 이름이므로 β.",
     "이제 트리 위로 올라가며 각 노드의 규칙에서 α, β에 대한 조건을 얻는다(91쪽)."
    ],
    "trap": [
     "두 i에 서로 다른 변수(β, β′)를 붙이면 안 됩니다. 같은 이름은 같은 타입이라는 제약을 처음부터 반영합니다."
    ],
    "recap": "HM 1단계: 선언 없는 이름마다 타입 변수(α, β)를 붙인다. 같은 이름에는 같은 변수.",
    "source": "PDF 90쪽"
   },
   "quizzes": [
    [
     "선언이 없을 때 Hindley-Milner 검사기가 처음 하는 일은?",
     [
      "타입이 없는 모든 이름에 타입 변수를 붙인다",
      "모든 이름을 int로 정한다",
      "타입 오류를 낸다"
     ],
     "원문: assign type variables to all names that do not yet have types.",
     [
      "맞습니다.",
      "추론 전에 정할 근거가 없습니다.",
      "오류가 아닙니다."
     ]
    ],
    [
     "a[i] + i에서 두 번 나오는 i에 붙는 타입 변수는?",
     [
      "둘 다 같은 β",
      "각각 다른 β와 γ",
      "하나는 α, 하나는 β"
     ],
     "같은 이름은 같은 타입이어야 합니다.",
     [
      "맞습니다.",
      "같은 변수입니다.",
      "α는 a의 변수입니다."
     ]
    ],
    [
     "타입 변수 α, β가 뜻하는 것은?",
     [
      "아직 정해지지 않은 타입을 나타내는 자리",
      "정수 상수",
      "변수의 메모리 주소"
     ],
     "이후 검사 과정에서 실제 타입으로 바뀝니다.",
     [
      "맞습니다.",
      "값이 아니라 타입입니다.",
      "무관합니다."
     ]
    ]
   ],
   "image": "pages/pl09-90.jpg",
   "text": "Hindley-Milner Type Checking\n\n• Example:\na[i] + i\n– What if the declarations of a\nand i were missing?\n\n• Type checker would first assign\ntype variables to all names that\ndo not yet have types\n\n90",
   "quiz": [
    "선언이 없을 때 Hindley-Milner 검사기가 처음 하는 일은?",
    [
     "타입이 없는 모든 이름에 타입 변수를 붙인다",
     "모든 이름을 int로 정한다",
     "타입 오류를 낸다"
    ],
    "원문: assign type variables to all names that do not yet have types."
   ],
   "quizReasons": [
    "맞습니다.",
    "추론 전에 정할 근거가 없습니다.",
    "오류가 아닙니다."
   ]
  },
  {
   "page": 91,
   "title": "Hindley-Milner 타입 검사 (2): 첨자 노드에서 추론",
   "explanation": "첨자 노드를 검사합니다. 왼쪽 a는 배열이어야 하므로 α를 \"array of γ\"(γ는 원소 타입을 나타내는 새 타입 변수)로 바꾸고, 오른쪽 i는 int여야 하므로 β를 int로 정해 트리 전체의 β를 int로 바꿉니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "첨자 노드 규칙: 왼쪽은 배열, 오른쪽은 int.",
     "a가 배열이어야 한다 → α = array of γ. 원소 타입은 아직 모르므로 새 타입 변수 γ를 쓴다.",
     "i는 int여야 한다 → β = int.",
     "β를 트리 전체에서 int로 바꾼다 → 오른쪽 i도 int가 된다(Figure 8.13)."
    ],
    "analogy": "\"이 서랍장(a)은 서랍장이어야 하고, 번호(i)는 정수여야 한다\"는 조건이 생겼습니다. 서랍 안 물건의 종류(γ)는 아직 모르므로 \"물건 종류 = γ\"로 남겨 둡니다.",
    "examples": [
     {
      "title": "첨자 노드 검사 후",
      "code": "",
      "lang": "",
      "out": "             +\n           /   \\\n         [ ]    i : int\n        /   \\\na : array of γ   i : int\n\n치환 기록:  α := array of γ\n            β := int   (트리의 모든 β에 적용)",
      "note": "",
      "error": false,
      "outLabel": "Figure 8.13 다시 그리기"
     }
    ],
    "steps": [
     "[ ]의 왼쪽 a : α. 배열이어야 하므로 α를 array of γ로 정한다.",
     "[ ]의 오른쪽 i : β. int여야 하므로 β = int.",
     "β가 나오는 모든 곳(오른쪽 i 포함)을 int로 바꾼다.",
     "아직 모르는 것은 γ(배열 원소 타입) 하나다."
    ],
    "trap": [
     "α를 곧바로 array of int로 정하지 않습니다. 첨자 노드만 봐서는 원소 타입을 알 수 없기 때문입니다.",
     "\"한 곳에서 정한 값을 모든 곳에 반영\"하는 것이 94쪽에서 말하는 인스턴스화(instantiation)입니다."
    ],
    "recap": "HM 2단계: 첨자 규칙에서 α = array of γ, β = int를 얻고, β를 트리 전체에서 int로 바꾼다.",
    "source": "PDF 91쪽"
   },
   "quizzes": [
    [
     "첨자 노드 검사 후 a의 타입은?",
     [
      "array of γ",
      "array of int",
      "int"
     ],
     "배열이라는 것만 알고 원소 타입은 아직 모릅니다.",
     [
      "맞습니다.",
      "원소 타입은 93쪽에서 정해집니다.",
      "a는 배열이어야 합니다."
     ]
    ],
    [
     "β에 대해 일어나는 일은?",
     [
      "int로 정해지고 트리의 모든 β가 int로 바뀐다",
      "첨자 노드의 β만 int로 바뀐다",
      "β는 그대로 남는다"
     ],
     "원문: Replaces β with int in the entire tree.",
     [
      "맞습니다.",
      "모든 곳에 반영합니다.",
      "int로 정해집니다."
     ]
    ],
    [
     "새 타입 변수 γ가 필요한 이유는?",
     [
      "배열의 원소 타입을 아직 모르기 때문",
      "i의 타입을 모르기 때문",
      "+ 연산을 검사하기 위해"
     ],
     "a가 배열이라는 사실만 알았기 때문입니다.",
     [
      "맞습니다.",
      "i는 int로 정해졌습니다.",
      "+는 아직 검사 전입니다."
     ]
    ]
   ],
   "image": "pages/pl09-91.jpg",
   "text": "Hindley-Milner Type Checking (cont’d)\n\n• Type checker now checks\nthe subscript node\n– Infers that a must be\nan array\n– Infers that i must\nhave an int\n– Replaces β with int\nin the entire tree\n\n91",
   "quiz": [
    "첨자 노드 검사 후 a의 타입은?",
    [
     "array of γ",
     "array of int",
     "int"
    ],
    "배열이라는 것만 알고 원소 타입은 아직 모릅니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "원소 타입은 93쪽에서 정해집니다.",
    "a는 배열이어야 합니다."
   ]
  },
  {
   "page": 92,
   "title": "Hindley-Milner 타입 검사 (3): 첨자 노드의 타입 γ",
   "explanation": "첨자 노드 a[i]는 이제 타입이 올바르다고 판정되고, 그 타입은 배열의 원소 타입인 γ입니다. γ가 무엇인지는 아직 모르지만, 지금까지의 조건과는 모순이 없습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "a : array of γ, i : int → 첨자 규칙을 만족한다 → 첨자 노드는 타입이 올바르다.",
     "첨자 노드의 타입 = 원소 타입 = γ(Figure 8.14).",
     "γ는 아직 미정이다. 위쪽 + 노드에서 정해질 것이다.",
     "\"타입이 올바르다\" = 지금까지 모은 조건끼리 모순이 없다."
    ],
    "analogy": "방정식을 풀다가 \"y는 아직 모르지만, 지금까지의 식과는 모순이 없다\" 단계에 온 것입니다. y(γ)는 다음 식(+ 노드)에서 정해집니다.",
    "examples": [
     {
      "title": "첨자 노드에 γ를 붙인 트리",
      "code": "",
      "lang": "",
      "out": "             +\n           /   \\\n       [ ] : γ      i : int\n        /   \\\na : array of γ   i : int",
      "note": "",
      "error": false,
      "outLabel": "Figure 8.14 다시 그리기"
     }
    ],
    "steps": [
     "첨자 노드의 왼쪽이 array of γ로 배열 조건을 만족한다.",
     "오른쪽이 int로 인덱스 조건을 만족한다.",
     "규칙에 따라 노드 타입 = 원소 타입 γ.",
     "다음은 + 노드: 왼쪽 γ, 오른쪽 int(93쪽)."
    ],
    "trap": [
     "γ가 미정이라고 해서 오류가 아닙니다. HM 검사는 정해지지 않은 타입 변수를 그대로 들고 다니다가 조건이 생기면 채웁니다."
    ],
    "recap": "HM 3단계: 첨자 노드는 타입이 올바르며 타입은 γ(원소 타입, 아직 미정).",
    "source": "PDF 92쪽"
   },
   "quizzes": [
    [
     "이 단계에서 첨자 노드 a[i]의 타입은?",
     [
      "γ",
      "int",
      "α"
     ],
     "원소 타입 γ가 첨자 노드의 타입입니다.",
     [
      "맞습니다.",
      "93쪽에서 정해집니다.",
      "α는 이미 array of γ로 바뀌었습니다."
     ]
    ],
    [
     "\"첨자 노드가 type correct하다\"는 의미는?",
     [
      "지금까지의 타입 조건과 모순이 없다",
      "모든 타입 변수가 결정되었다",
      "실행해 보니 오류가 없었다"
     ],
     "γ는 아직 미정이지만 조건은 만족합니다.",
     [
      "맞습니다.",
      "γ가 남아 있습니다.",
      "정적 검사입니다."
     ]
    ],
    [
     "이 단계에서 아직 결정되지 않은 타입 변수는?",
     [
      "γ",
      "β",
      "없음"
     ],
     "β는 int로 정해졌고 γ만 남아 있습니다.",
     [
      "맞습니다.",
      "91쪽에서 int로 정해졌습니다.",
      "γ가 남아 있습니다."
     ]
    ]
   ],
   "image": "pages/pl09-92.jpg",
   "text": "Hindley-Milner Type Checking (cont’d)\n\n• Type checker now\nconcludes that the\nsubscript node is type\ncorrect and has the type γ\n\n92",
   "quiz": [
    "이 단계에서 첨자 노드 a[i]의 타입은?",
    [
     "γ",
     "int",
     "α"
    ],
    "원소 타입 γ가 첨자 노드의 타입입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "93쪽에서 정해집니다.",
    "α는 이미 array of γ로 바뀌었습니다."
   ]
  },
  {
   "page": 93,
   "title": "Hindley-Milner 타입 검사 (4): + 노드에서 γ 결정",
   "explanation": "+ 노드를 검사합니다. 두 피연산자는 같은 타입이어야 하는데 왼쪽은 γ, 오른쪽은 int입니다. 그러므로 γ = int이고, 트리의 모든 γ를 int로 바꿉니다. 결과적으로 a는 array of int, a[i]는 int, 전체 식도 int입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "+ 규칙: 두 피연산자의 타입이 같아야 한다 → γ = int.",
     "트리 전체의 γ를 int로 바꾼다(Figure 8.15).",
     "결과: a : array of int, a[i] : int, i : int, a[i] + i : int.",
     "선언 없이도 87~89쪽의 일반 검사와 같은 결론을 얻었다."
    ],
    "analogy": "마지막 식이 \"y = 정수\"를 알려 주었습니다. 그 값을 앞의 모든 식에 다시 넣으면 모든 미지수가 풀립니다.",
    "examples": [
     {
      "title": "γ를 int로 바꾼 최종 트리",
      "code": "",
      "lang": "",
      "out": "           + : int\n           /     \\\n       [ ] : int    i : int\n        /   \\\na : array of int   i : int\n\n최종 치환:  α = array of int,  β = int,  γ = int",
      "note": "",
      "error": false,
      "outLabel": "Figure 8.15 다시 그리기"
     }
    ],
    "steps": [
     "+의 왼쪽 타입 γ, 오른쪽 타입 int.",
     "두 타입이 같아야 하므로 γ와 int를 같게 만든다 → γ = int.",
     "γ가 나오는 모든 곳(첨자 노드, a의 원소 타입)을 int로 바꾼다.",
     "int에는 +가 있으므로 + 노드도 통과 → 결과 타입 int."
    ],
    "trap": [
     "a의 타입은 선언에서가 아니라 사용(첨자로 쓰임 + 결과에 i를 더함)에서 추론되었습니다. 85쪽의 \"모든 사용에서 정보를 모은다\"가 바로 이 과정입니다."
    ],
    "recap": "HM 4단계: + 규칙에서 γ = int → 모든 γ를 int로 → a는 array of int, 식 전체는 int.",
    "source": "PDF 93쪽"
   },
   "quizzes": [
    [
     "+ 노드 검사에서 결정되는 것은?",
     [
      "γ = int",
      "β = array of int",
      "α = int"
     ],
     "왼쪽 γ와 오른쪽 int가 같아야 합니다.",
     [
      "맞습니다.",
      "β는 이미 int입니다.",
      "α는 array of γ입니다."
     ]
    ],
    [
     "강의의 정수 덧셈 규칙에서 a[i] + i가 유효하면 a의 원소 타입은?",
     [
      "int",
      "배열 전체 타입과 같다",
      "어떤 타입이든 가능하다"
     ],
     "a[i]는 정수 덧셈의 피연산자이므로 int여야 합니다.",
     [
      "맞습니다.",
      "원소 타입은 a[i]의 타입입니다.",
      "+ 규칙이 제약합니다."
     ]
    ],
    [
     "추론이 끝난 뒤 a의 최종 타입은?",
     [
      "array of int",
      "array of γ",
      "int"
     ],
     "γ = int를 대입한 결과입니다.",
     [
      "맞습니다.",
      "γ가 int로 바뀌었습니다.",
      "a는 배열입니다."
     ]
    ]
   ],
   "image": "pages/pl09-93.jpg",
   "text": "Hindley-Milner Type Checking (cont’d)\n• + node type is checked\n– Concludes that γ must\nbe type int\n– Replaces γ\neverywhere by int\n\n93",
   "quiz": [
    "+ 노드 검사에서 결정되는 것은?",
    [
     "γ = int",
     "β = array of int",
     "α = int"
    ],
    "왼쪽 γ와 오른쪽 int가 같아야 합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "β는 이미 int입니다.",
    "α는 array of γ입니다."
   ]
  },
  {
   "page": 94,
   "title": "단일화(unification)와 인스턴스화(instantiation)",
   "explanation": "단일화는 타입 검사가 성공하도록 타입 변수가 들어 있는 타입 식들을 같게 맞추는 과정으로, 일종의 패턴 매칭입니다. 인스턴스화는 타입 변수를 실제 타입으로 바꾸는 것이며, 바꿀 때는 그 변수의 모든 출현을 함께 바꿔야 합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "단일화(unification): 타입 검사가 성공하도록 타입 변수의 타입 식을 바꿔 두 식을 같게 만든다(패턴 매칭의 한 형태).",
     "인스턴스화(instantiation): 타입 변수(α, β)를 실제 타입(int)으로 바꾸면, 그 변수의 모든 출현을 갱신해야 한다.",
     "예: array of α와 array of β를 단일화 → α = β로 정하고, β가 나오는 모든 곳을 α로 바꾼다.",
     "단일화가 불가능하면(예: int와 array of α, int와 bool) 타입 오류다."
    ],
    "analogy": "단일화는 \"두 퍼즐 조각의 모양 맞추기\"입니다. array of α와 array of int를 겹치면 바깥 모양(array of)은 같으니 빈칸 α에 int를 끼우면 됩니다. 바깥 모양부터 다르면(int vs array) 맞출 수 없습니다.",
    "examples": [
     {
      "title": "단일화 예",
      "code": "",
      "lang": "",
      "out": "① array of α  ≟  array of β    →  α = β     (β를 모두 α로 바꿈)\n② array of α  ≟  array of int  →  α = int   (α를 모두 int로 바꿈)\n③ γ           ≟  int           →  γ = int   (93쪽의 경우)\n④ int         ≟  array of α    →  실패: 바깥 생성자가 다름 → 타입 오류\n⑤ int         ≟  bool          →  실패: 서로 다른 기본 타입 → 타입 오류",
      "note": "보충 정리입니다. 원문은 ①을 예로 듭니다.",
      "error": false,
      "outLabel": "단일화 결과"
     }
    ],
    "steps": [
     "두 타입 식의 바깥 모양(생성자)을 비교한다. 둘 다 array of이면 안쪽을 비교한다.",
     "한쪽이 타입 변수라면 그 변수를 다른 쪽 식으로 정한다(α = β, α = int).",
     "정한 내용을 그 변수가 나오는 모든 곳에 반영한다(인스턴스화).",
     "바깥 모양이 다르거나 서로 다른 기본 타입이면 맞출 수 없다 → 타입 오류."
    ],
    "trap": [
     "인스턴스화는 \"한 곳만\" 바꾸는 것이 아닙니다. 91쪽에서 β를 트리 전체에서 바꾼 것처럼 모든 출현을 함께 바꿉니다.",
     "단일화는 값이 아니라 타입 식을 맞추는 일입니다."
    ],
    "recap": "단일화 = 두 타입 식을 같게 만드는 패턴 매칭(실패하면 타입 오류). 인스턴스화 = 타입 변수를 실제 타입으로 바꾸고 모든 출현을 갱신.",
    "source": "PDF 94쪽"
   },
   "quizzes": [
    [
     "array of α와 array of int를 단일화하면 무엇을 얻는가?",
     [
      "α = int",
      "α = array of int",
      "α는 결정할 수 없다"
     ],
     "바깥 생성자가 같으므로 안쪽 α와 int를 같게 맞춥니다.",
     [
      "맞습니다.",
      "바깥의 array of는 이미 맞췄습니다.",
      "결정됩니다."
     ]
    ],
    [
     "같은 타입 변수에 int와 bool이 동시에 요구되면?",
     [
      "제약이 충돌해 타입 오류가 된다",
      "나중에 나온 bool을 택한다",
      "둘 다 허용된다"
     ],
     "int와 bool은 단일화할 수 없습니다.",
     [
      "맞습니다.",
      "순서로 정하지 않습니다.",
      "한 변수는 한 타입입니다."
     ]
    ],
    [
     "인스턴스화(instantiation)에서 반드시 지켜야 하는 것은?",
     [
      "그 타입 변수의 모든 출현을 함께 바꾼다",
      "처음 나온 곳만 바꾼다",
      "타입 변수를 지운다"
     ],
     "원문: all instances of that variable must be updated.",
     [
      "맞습니다.",
      "모든 곳을 바꿉니다.",
      "실제 타입으로 바꿉니다."
     ]
    ]
   ],
   "image": "pages/pl09-94.jpg",
   "text": "Hindley-Milner Type Checking (cont’d)\n\n• Unification: The process of changing type expressions for variables to\nensure type checking succeeds. It's a form of pattern matching.\n\n• Instantiation: When a type variable (e.g., α, β) is replaced by an\nactual type (e.g., int), all instances of that variable must be updated.\n\n• Example: To check array of α against array of β, the system must unify\nthem. It determines α == β and replaces all β with α everywhere it\noccurs.\n\n94",
   "quiz": [
    "array of α와 array of int를 단일화하면 무엇을 얻는가?",
    [
     "α = int",
     "α = array of int",
     "α는 결정할 수 없다"
    ],
    "바깥 생성자가 같으므로 안쪽 α와 int를 같게 맞춥니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "바깥의 array of는 이미 맞췄습니다.",
    "결정됩니다."
   ]
  },
  {
   "page": 95,
   "title": "Hindley-Milner 타입 검사의 장점",
   "explanation": "Hindley-Milner 방식은 프로그래머가 적어야 하는 타입 정보를 줄이면서도(단순한 타입 표기), 타입을 가능한 한 일반적으로 유지하며 일관성을 엄격히 검사하고(강한 일관성), 강력한 매개변수 다형성을 자동으로 제공합니다(암묵적 다형성).",
   "kind": "lesson",
   "lesson": {
    "core": [
     "단순한 타입 표기(Simplified Typing): 프로그래머가 써야 하는 명시적 타입 정보가 줄어든다.",
     "강한 일관성(Strong Consistency): 타입을 가능한 한 일반적으로 유지하면서도 일관성을 엄격하게 검사한다.",
     "암묵적 다형성(Implicit Polymorphism): 강력한 매개변수 다형성을 자동으로 구현한다.",
     "예: Array of α는 무한히 많은 타입의 집합(Array of int, Array of String, …)을 나타낸다."
    ],
    "analogy": "\"모든 크기에 맞는 상자 하나\"를 설계하는 것과 같습니다. 원소 종류를 α로 남겨 두면 정수 배열에도, 문자열 배열에도 같은 코드를 쓸 수 있고, 섞어 쓰는 실수는 여전히 검사로 막습니다.",
    "examples": [
     {
      "title": "하나의 함수, 여러 타입",
      "code": "fun len [] = 0\n  | len (_ :: t) = 1 + len t;\nlen [1, 2, 3];\nlen [\"a\", \"b\"];",
      "lang": "Standard ML",
      "out": "val len = fn : 'a list -> int\nval it = 3 : int\nval it = 2 : int",
      "note": "타입을 적지 않았지만 len은 'a list -> int로 추론되어 어떤 원소 타입의 리스트에도 쓸 수 있습니다. (보충 예제)",
      "error": false
     }
    ],
    "steps": [
     "len의 정의에서 원소(_)를 쓰지 않는다 → 원소 타입에 대한 제약이 없다 → 'a.",
     "1 + len t → 결과는 int.",
     "따라서 len : 'a list -> int. 이것이 암묵적 매개변수 다형성이다.",
     "len [1, 2, 3]은 'a = int로, len [\"a\", \"b\"]는 'a = string으로 인스턴스화되어 각각 검사된다."
    ],
    "trap": [
     "\"가능한 한 일반적\"이라는 것은 제약이 없는 부분을 타입 변수로 남겨 둔다는 뜻입니다. 제약이 생기면(93쪽처럼) 구체적인 타입으로 정해집니다.",
     "다형성이라고 검사가 느슨한 것은 아닙니다. 하나의 리스트에 int와 string을 섞는 것은 여전히 타입 오류입니다."
    ],
    "recap": "HM 장점: 타입 표기 감소, 일반적이면서 엄격한 일관성 검사, 자동 매개변수 다형성(Array of α = 무한한 타입 집합).",
    "source": "PDF 95쪽"
   },
   "quizzes": [
    [
     "ML에서 len : 'a list -> int가 뜻하는 것은?",
     [
      "어떤 원소 타입의 리스트에도 쓸 수 있고 int를 돌려준다",
      "int 리스트에만 쓸 수 있다",
      "실행 중에 타입을 검사한다"
     ],
     "'a는 어떤 타입으로도 인스턴스화될 수 있는 타입 변수입니다.",
     [
      "맞습니다.",
      "원소 타입 제약이 없습니다.",
      "정적으로 검사됩니다."
     ]
    ],
    [
     "원문에서 Array of α가 나타내는 것은?",
     [
      "무한히 많은 타입의 집합",
      "α라는 이름의 배열 하나",
      "크기가 α인 배열"
     ],
     "원문: The type Array of α represents an infinite set of types.",
     [
      "맞습니다.",
      "변수가 아니라 타입입니다.",
      "α는 원소 타입입니다."
     ]
    ],
    [
     "원문이 든 Hindley-Milner의 장점이 아닌 것은?",
     [
      "모든 이름의 타입을 프로그래머가 직접 적게 한다",
      "명시적 타입 정보를 줄인다",
      "매개변수 다형성을 자동으로 구현한다"
     ],
     "오히려 타입 표기를 줄이는 것이 장점입니다.",
     [
      "장점이 아닙니다.",
      "원문의 장점입니다.",
      "원문의 장점입니다."
     ]
    ]
   ],
   "image": "pages/pl09-95.jpg",
   "text": "Hindley-Milner Type Checking (cont’d)\n\n• Simplified Typing: Reduces the amount of explicit type information\nthe programmer must write.\n\n• Strong Consistency: Allows types to remain as general as possible\nwhile still being strongly checked for consistency.\n\n• Implicit Polymorphism: Automatically implements powerful\nparametric polymorphism.\n\n• Example: The type Array of α represents an infinite set of types\n(e.g., Array of int, Array of String, etc.).\n\n95",
   "quiz": [
    "ML에서 len : 'a list -> int가 뜻하는 것은?",
    [
     "어떤 원소 타입의 리스트에도 쓸 수 있고 int를 돌려준다",
     "int 리스트에만 쓸 수 있다",
     "실행 중에 타입을 검사한다"
    ],
    "'a는 어떤 타입으로도 인스턴스화될 수 있는 타입 변수입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "원소 타입 제약이 없습니다.",
    "정적으로 검사됩니다."
   ]
  },
  {
   "page": 96,
   "title": "참고문헌",
   "explanation": "[1] Programming Languages: Principles and Practice, Louden & Lambert, 3rd edition, Course Technology. 이 장의 그림(Figure 8.8~8.15)과 예제는 이 교재 8장을 바탕으로 합니다. 학습 내용과 퀴즈는 없습니다.",
   "kind": "structure",
   "role": "참고문헌",
   "image": "pages/pl09-96.jpg",
   "text": "References\n[1] Programming languages principles and practice, Louden & Lambert, 3rd\nedition, Course Technology\n\n96"
  }
 ]
});
})();
