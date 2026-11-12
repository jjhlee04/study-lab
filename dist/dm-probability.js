/* 이산수학 7장 이산 확률 · 생성 파일: authoring/discrete-math/build_dm07.py
 * 쪽 번호와 순서는 원문 슬라이드 DM-07-discrete-probability.pdf를 따른다. 해설·예제·풀이·퀴즈는 원문 개념을 풀어 쓴 보충 설명이다. */
window.COURSE_CHAPTERS=(window.COURSE_CHAPTERS||[]).concat([{
 "id": "dm07",
 "course": "discrete-math",
 "title": "7장 · Discrete Probability (이산 확률)",
 "url": "original/DM-07-discrete-probability.pdf",
 "startPage": 5,
 "finalRange": "전체",
 "quizVersion": "v2",
 "pages": [
  {
   "page": 1,
   "title": "7장 이산 확률(Discrete Probability) · 표지",
   "explanation": "7장 이산 확률이 시작되는 표지입니다. 퀴즈는 없습니다.",
   "kind": "structure",
   "role": "표지",
   "image": "pages/dm07-01.jpg",
   "text": "Discrete Probability\nChapter 7\nWith Question/Answer Animations\n. All rights reserved. Authorized only for instructor use in the classroom. No reproduction or further distribution permitted without the prior written consent of McGraw-Hill Education.",
   "quiz": null
  },
  {
   "page": 2,
   "title": "7장 학습 목록",
   "explanation": "7장은 7.1 이산 확률 입문 → 7.2 확률론 → 7.3 베이즈 정리 → 7.4 기댓값과 분산 순서입니다. 6장에서 배운 셈(곱의 법칙, 조합)이 확률 계산의 분자·분모를 세는 도구로 계속 쓰입니다.",
   "kind": "structure",
   "role": "목차",
   "image": "pages/dm07-02.jpg",
   "text": "Chapter Summary\nIntroduction to Discrete Probability\nProbability Theory\nBayes’ Theorem\nExpected Value and Variance",
   "quiz": null
  },
  {
   "page": 3,
   "title": "7.1 이산 확률 입문 · 표지",
   "explanation": "7.1절 이산 확률 입문(An Introduction to Discrete Probability)이 시작되는 표지입니다.",
   "kind": "structure",
   "role": "절 표지",
   "image": "pages/dm07-03.jpg",
   "text": "An Introduction to Discrete\nProbability\nSection 7.1",
   "quiz": null
  },
  {
   "page": 4,
   "title": "7.1절 학습 목록",
   "explanation": "유한 확률(라플라스의 정의) → 여사건과 합사건의 확률 → 확률적 추론(몬티 홀 문제) 순서입니다.",
   "kind": "structure",
   "role": "목차",
   "image": "pages/dm07-04.jpg",
   "text": "Section Summary\n1\nFinite Probability\nProbabilities of Complements and Unions of\nEvents\nProbabilistic Reasoning",
   "quiz": null
  },
  {
   "page": 5,
   "title": "사건의 확률: 라플라스의 정의",
   "explanation": "라플라스의 고전적 확률은 \"모든 결과가 똑같이 일어날 법할 때, 사건에 속한 결과 수 ÷ 전체 결과 수\"입니다. 먼저 실험·표본공간·사건이라는 세 용어를 정확히 구분해야 합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "실험(experiment): 정해진 결과들 중 하나를 내는 절차. 예) 주사위 한 번 던지기.",
     "표본공간(sample space) S: 가능한 모든 결과의 집합. 예) S = {1, 2, 3, 4, 5, 6}.",
     "사건(event) E: 표본공간의 부분집합. 예) \"짝수가 나온다\" = {2, 4, 6}.",
     "라플라스의 정의: S가 유한하고 모든 결과가 똑같이 일어날 법하면 p(E) = |E|/|S|.",
     "항상 0 ≤ p(E) ≤ 1. 이유: 0 ≤ |E| ≤ |S|이므로 0 ≤ |E|/|S| ≤ |S|/|S| = 1."
    ],
    "analogy": "제비뽑기 통에 쪽지 |S|장이 들어 있고 그중 당첨 쪽지가 |E|장이면, 당첨 확률은 당첨 쪽지 수 ÷ 전체 쪽지 수입니다. 쪽지 크기가 모두 같아야(똑같이 일어날 법해야) 이 나눗셈이 공정합니다.",
    "examples": [
     {
      "title": "주사위 한 번: 짝수가 나올 확률",
      "code": "S = {1, 2, 3, 4, 5, 6}        |S| = 6\nE = {2, 4, 6}                 |E| = 3\np(E) = |E| / |S| = 3/6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1/2",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "공집합과 전체집합",
      "code": "E = ∅ (불가능한 사건)  → p(∅) = 0/6 = 0\nE = S (반드시 일어남)   → p(S) = 6/6 = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "확률은 항상 0 이상 1 이하",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "실험이 무엇인지 정합니다(무엇을 몇 번 하는가).",
     "표본공간 S를 쓰고 |S|를 셉니다. 6장의 곱의 법칙·조합이 여기서 쓰입니다.",
     "구하려는 사건 E에 속하는 결과를 세어 |E|를 구합니다.",
     "모든 결과가 똑같이 일어날 법한지 확인한 뒤 |E|/|S|를 계산합니다."
    ],
    "trap": [
     "라플라스의 정의는 \"똑같이 일어날 법함(equally likely)\"이 전제입니다. 찌그러진 주사위처럼 결과마다 확률이 다르면 7.2절의 일반적 정의를 써야 합니다.",
     "사건은 결과 하나가 아니라 결과들의 집합입니다. \"짝수\"라는 사건에는 결과가 3개 들어 있습니다."
    ],
    "recap": "라플라스 확률 = |E|/|S| (전제: 유한 표본공간, 모든 결과가 똑같이 일어날 법함). 항상 0 ≤ p(E) ≤ 1.",
    "source": "PDF 5쪽"
   },
   "quizzes": [
    [
     "표본공간(sample space)의 정의로 옳은 것은?",
     [
      "실험에서 가능한 모든 결과의 집합",
      "실험에서 구하려는 결과들의 집합",
      "확률이 0보다 큰 사건 하나"
     ],
     "원문: The sample space of the experiment is the set of possible outcomes.",
     [
      "맞습니다.",
      "그것은 사건(event)입니다. 사건은 표본공간의 부분집합입니다.",
      "표본공간은 사건이 아니라 결과 전체의 집합입니다."
     ]
    ],
    [
     "라플라스의 정의 p(E) = |E|/|S|를 그대로 쓸 수 있는 조건은?",
     [
      "표본공간이 유한하고 모든 결과가 똑같이 일어날 법하다",
      "사건 E가 공집합이 아니다",
      "결과마다 확률이 달라도 개수만 셀 수 있으면 된다"
     ],
     "원문 정의: If S is a finite sample space of equally likely outcomes...",
     [
      "맞습니다.",
      "E가 공집합이어도 p(E) = 0으로 성립합니다.",
      "확률이 다르면 개수 비율로 계산할 수 없습니다(7.2절의 일반적 정의 필요)."
     ]
    ],
    [
     "어떤 사건 E에 대해 p(E)가 가질 수 없는 값은?",
     [
      "1.2",
      "0",
      "1"
     ],
     "0 ≤ |E| ≤ |S|이므로 0 ≤ p(E) ≤ 1입니다.",
     [
      "1보다 클 수 없습니다.",
      "불가능한 사건(∅)의 확률입니다.",
      "반드시 일어나는 사건(S)의 확률입니다."
     ]
    ]
   ],
   "image": "pages/dm07-05.jpg",
   "text": "Probability of an Event\nWe first study Pierre-Simon Laplace’s classical theory\nof probability, which he introduced in the 18th century,\nwhen he analyzed games of chance.\n1\nPierre-Simon Laplace\n(1749-1827)\nWe first define these key terms:\n•\nAn experiment is a procedure that yields one of a given set of possible outcomes.\n•\nThe sample space of the experiment is the set of possible outcomes.\n•\nAn event is a subset of the sample space.\nHere is how Laplace defined the probability of an event:\nDefinition: If S is a finite sample space of equally likely outcomes, and E is an\nevent, that is, a subset of S, then the probability of E is p(E) = |E|/|S|.\nFor every event E, we have 0 ≤ p(E) ≤ 1. This follows directly from the\ndefinition because 0 ≤ p(E) = |E|/|S| ≤ |S|/|S| ≤ 1, since 0 ≤ |E| ≤ |S|.",
   "quiz": [
    "표본공간(sample space)의 정의로 옳은 것은?",
    [
     "실험에서 가능한 모든 결과의 집합",
     "실험에서 구하려는 결과들의 집합",
     "확률이 0보다 큰 사건 하나"
    ],
    "원문: The sample space of the experiment is the set of possible outcomes."
   ],
   "quizReasons": [
    "맞습니다.",
    "그것은 사건(event)입니다. 사건은 표본공간의 부분집합입니다.",
    "표본공간은 사건이 아니라 결과 전체의 집합입니다."
   ]
  },
  {
   "page": 6,
   "title": "라플라스 정의 적용 1: 공 꺼내기와 주사위 두 개",
   "explanation": "첫 예는 결과 9개 중 파란 공 4개를 세는 문제이고, 둘째 예는 주사위 두 개의 결과 36개 중 합이 7인 6개를 세는 문제입니다. 둘째 예에서 결과를 (첫째 눈, 둘째 눈)의 순서쌍으로 보는 것이 핵심입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "항아리에 파란 공 4개, 빨간 공 5개 → 결과 9개, 파란 공 4개 → p = 4/9.",
     "주사위 두 개: 곱의 법칙으로 결과 6·6 = 6^2 = 36개.",
     "합이 7인 결과: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6개.",
     "p(합 = 7) = 6/36 = 1/6."
    ],
    "analogy": "주사위 두 개를 빨간 주사위와 파란 주사위로 색을 칠해 두면, (빨강 3, 파랑 4)와 (빨강 4, 파랑 3)이 서로 다른 결과라는 것이 분명해집니다.",
    "examples": [
     {
      "title": "합이 7인 경우를 표로 세기",
      "code": "      둘째 눈 →  1  2  3  4  5  6\n첫째 1          .  .  .  .  .  ●\n첫째 2          .  .  .  .  ●  .\n첫째 3          .  .  .  ●  .  .\n첫째 4          .  .  ●  .  .  .\n첫째 5          .  ●  .  .  .  .\n첫째 6          ●  .  .  .  .  .\n칸 36개 중 ● 6개",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(합 = 7) = 6/36 = 1/6",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "비교: 합이 2일 확률",
      "code": "합이 2인 결과는 (1,1) 하나뿐\np(합 = 2) = 1/36",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1/36 (합 7보다 훨씬 작다)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "결과를 순서쌍 (첫째 눈, 둘째 눈)으로 정의합니다.",
     "곱의 법칙으로 |S| = 6·6 = 36.",
     "합이 7이 되는 순서쌍을 빠짐없이 나열해 |E| = 6.",
     "p = 6/36 = 1/6로 약분합니다."
    ],
    "trap": [
     "합(2~12)을 결과로 보면 결과가 11개지만, 합마다 일어날 가능성이 달라서 라플라스 정의를 쓸 수 없습니다. 반드시 똑같이 일어날 법한 순서쌍 36개를 기준으로 셉니다.",
     "(3,4)와 (4,3)을 하나로 세면 틀립니다."
    ],
    "recap": "주사위 두 개는 순서쌍 36개가 표본공간. 합이 7인 순서쌍 6개 → 1/6.",
    "source": "PDF 6쪽"
   },
   "quizzes": [
    [
     "주사위 두 개를 던질 때 합이 7일 확률은?",
     [
      "1/6",
      "1/11",
      "6/11"
     ],
     "순서쌍 36개 중 6개입니다.",
     [
      "6/36 = 1/6입니다.",
      "합 2~12의 11가지를 똑같이 일어날 법하다고 본 오답입니다.",
      "분모를 11로 둔 오답입니다."
     ]
    ],
    [
     "파란 공 4개, 빨간 공 5개가 든 항아리에서 하나를 꺼낼 때 빨간 공일 확률은?",
     [
      "5/9",
      "4/9",
      "5/4"
     ],
     "전체 9개 중 빨간 공 5개입니다.",
     [
      "맞습니다.",
      "파란 공일 확률입니다.",
      "빨강 ÷ 파랑은 확률이 아닙니다(1보다 큼)."
     ]
    ],
    [
     "주사위 두 개를 던질 때 합이 12일 확률은?",
     [
      "1/36",
      "1/6",
      "1/11"
     ],
     "합 12는 (6,6) 한 가지뿐입니다.",
     [
      "맞습니다.",
      "합 7의 확률입니다.",
      "합을 결과로 본 오답입니다."
     ]
    ]
   ],
   "image": "pages/dm07-06.jpg",
   "text": "Applying Laplace’s Definition\n1\nExample: An urn contains four blue balls and five red balls.\nWhat is the probability that a ball chosen from the urn is\nblue?\nSolution: The probability that the ball is chosen is 4/9 since\nthere are nine possible outcomes, and four of these produce\na blue ball.\nExample: What is the probability that when two dice are\nrolled, the sum of the numbers on the two dice is 7?\nSolution: By the product rule there are 62 = 36 possible\noutcomes. Six of these sum to 7. Hence, the probability of\nobtaining a 7 is 6/36 = 1/6.",
   "quiz": [
    "주사위 두 개를 던질 때 합이 7일 확률은?",
    [
     "1/6",
     "1/11",
     "6/11"
    ],
    "순서쌍 36개 중 6개입니다."
   ],
   "quizReasons": [
    "6/36 = 1/6입니다.",
    "합 2~12의 11가지를 똑같이 일어날 법하다고 본 오답입니다.",
    "분모를 11로 둔 오답입니다."
   ]
  },
  {
   "page": 7,
   "title": "라플라스 정의 적용 2: 네 자리 복권",
   "explanation": "네 자리 숫자를 순서대로 맞히는 복권입니다. 전체 경우 수는 곱의 법칙으로 10^4이고, \"정확히 세 자리만 맞히는\" 경우는 틀릴 자리를 고르고 그 자리에 들어갈 틀린 숫자를 고르는 방식으로 셉니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "전체: 각 자리 0~9 → 10^4 = 10,000가지.",
     "1등(네 자리 모두 일치): 1가지 → 1/10,000 = 0.0001.",
     "정확히 세 자리 일치: 틀린 자리 4곳 중 하나 × 그 자리의 틀린 숫자 9가지 = 4·9 = 36가지.",
     "작은 상금 확률: 36/10,000 = 9/2500 = 0.0036."
    ],
    "analogy": "네 칸 자물쇠에서 정답과 한 칸만 다른 번호를 세는 것과 같습니다. 어느 칸을 틀릴지 4가지, 그 칸을 정답 말고 다른 숫자로 돌리는 방법 9가지입니다.",
    "examples": [
     {
      "title": "정확히 세 자리 일치 세기",
      "code": "당첨 번호: 1 2 3 4\n틀린 자리가 1번째: x 2 3 4  (x ≠ 1) → 9가지\n틀린 자리가 2번째: 1 x 3 4  (x ≠ 2) → 9가지\n틀린 자리가 3번째: 1 2 x 4            → 9가지\n틀린 자리가 4번째: 1 2 3 x            → 9가지\n합의 법칙: 9 + 9 + 9 + 9 = 36",
      "lang": "",
      "codeLabel": "풀이",
      "out": "36/10,000 = 9/2500 = 0.0036",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "응용: 적어도 세 자리 일치",
      "code": "정확히 3자리 36가지 + 4자리 모두 1가지 = 37가지",
      "lang": "",
      "codeLabel": "풀이",
      "out": "37/10,000 = 0.0037",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "전체 경우 수를 곱의 법칙으로 셉니다: 10·10·10·10.",
     "\"정확히 세 자리\"를 틀린 자리 위치별로 나눕니다(4가지 경우).",
     "각 경우 틀린 자리의 숫자는 정답을 뺀 9가지입니다.",
     "합의 법칙으로 36가지, 확률은 36/10,000입니다."
    ],
    "trap": [
     "틀린 자리의 숫자를 10가지로 세면 정답 숫자까지 포함되어 \"네 자리 모두 일치\"가 섞입니다. 반드시 9가지입니다.",
     "\"정확히 세 자리\"와 \"적어도 세 자리\"는 다릅니다. 적어도 세 자리는 1등 1가지를 더합니다."
    ],
    "recap": "정확히 k자리 일치 = (틀릴 자리 고르기) × (틀린 숫자 9가지씩). 네 자리 중 세 자리 일치는 36/10,000.",
    "source": "PDF 7쪽"
   },
   "quizzes": [
    [
     "네 자리 복권에서 정확히 세 자리만 일치하는 번호의 수는?",
     [
      "36",
      "40",
      "9"
     ],
     "틀린 자리 4곳 × 틀린 숫자 9가지 = 36.",
     [
      "맞습니다.",
      "틀린 자리에 정답 숫자까지 넣은 4·10입니다.",
      "틀린 자리를 하나로 고정했을 때의 수입니다."
     ]
    ],
    [
     "네 자리 복권의 1등(네 자리 모두 순서대로 일치) 확률은?",
     [
      "1/10,000",
      "4/10,000",
      "1/C(10,4)"
     ],
     "전체 10^4 = 10,000가지 중 1가지입니다.",
     [
      "맞습니다.",
      "자리 수를 곱할 이유가 없습니다.",
      "순서가 있고 숫자 반복도 허용되므로 조합이 아닙니다."
     ]
    ],
    [
     "같은 복권에서 적어도 세 자리가 일치할 확률은?",
     [
      "37/10,000",
      "36/10,000",
      "40/10,000"
     ],
     "정확히 세 자리 36가지 + 네 자리 1가지 = 37가지.",
     [
      "맞습니다.",
      "네 자리 모두 일치하는 경우를 빠뜨렸습니다.",
      "틀린 숫자를 10가지로 센 값입니다."
     ]
    ]
   ],
   "image": "pages/dm07-07.jpg",
   "text": "Applying Laplace’s Definition\n2\nExample: In a lottery, a player wins a large prize when they pick four digits that\nmatch, in correct order, four digits selected by a random mechanical process.\nWhat is the probability that a player wins the prize?\nSolution: By the product rule there are 104 = 10,000 ways to pick four digits.\n•\nSince there is only 1 way to pick the correct digits, the probability of winning the\nlarge prize is 1/10,000 = 0.0001.\nA smaller prize is won if only three digits are matched. What is the probability\nthat a player wins the small prize?\nSolution: If exactly three digits are matched, one of the four digits must be\nincorrect and the other three digits must be correct. For the digit that is\nincorrect, there are 9 possible choices. Hence, by the sum rule, there a total of\n36 possible ways to choose four digits that match exactly three of the winning\nfour digits. The probability of winning the small price is 36/10,000 = 9/2500 =\n0.0036.",
   "quiz": [
    "네 자리 복권에서 정확히 세 자리만 일치하는 번호의 수는?",
    [
     "36",
     "40",
     "9"
    ],
    "틀린 자리 4곳 × 틀린 숫자 9가지 = 36."
   ],
   "quizReasons": [
    "맞습니다.",
    "틀린 자리에 정답 숫자까지 넣은 4·10입니다.",
    "틀린 자리를 하나로 고정했을 때의 수입니다."
   ]
  },
  {
   "page": 8,
   "title": "라플라스 정의 적용 3: 6/40 로또",
   "explanation": "1~40 중 6개 숫자를 고르는 복권은 순서를 따지지 않으므로 표본공간의 크기가 조합 C(40,6)입니다. 당첨 조합은 하나뿐이라 확률은 1/C(40,6)입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "순서 없이 서로 다른 6개를 고름 → 조합 C(40,6) = 40!/(34!·6!) = 3,838,380.",
     "당첨 조합은 1가지 → p = 1/3,838,380 ≈ 0.00000026.",
     "6장의 조합 공식이 표본공간 크기를 세는 데 그대로 쓰입니다."
    ],
    "analogy": "숫자 6개가 적힌 공을 한 봉투에 넣어 제출한다고 생각하면, 봉투 안의 순서는 의미가 없습니다. 그래서 순열이 아니라 조합입니다.",
    "examples": [
     {
      "title": "C(40,6) 계산",
      "code": "C(40,6) = (40·39·38·37·36·35) / (6·5·4·3·2·1)\n        = 2,763,633,600 / 720\n        = 3,838,380",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p = 1/3,838,380 ≈ 0.00000026",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "비교: 순서까지 맞혀야 한다면",
      "code": "순서 있는 경우 수 = 40·39·38·37·36·35 = 2,763,633,600\n= C(40,6) × 6! (6개를 줄 세우는 방법 720배)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "순서를 따지면 확률은 720분의 1로 더 작아진다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "고르는 것이 순서 없는 선택인지 확인합니다(로또 → 순서 없음).",
     "|S| = C(40,6)을 계산합니다.",
     "당첨되는 선택의 수 |E| = 1.",
     "p = 1/C(40,6)."
    ],
    "trap": [
     "C(40,6)을 40^6이나 40·39·…·35(순열)와 혼동하지 마세요. 같은 숫자를 두 번 고를 수 없고 순서도 없습니다.",
     "분모를 쓸 때 계산값보다 식 C(40,6)을 먼저 적어 두면 실수가 줄어듭니다."
    ],
    "recap": "순서 없이 n개 중 k개 → 표본공간 C(n,k). 6/40 로또 당첨 확률 = 1/C(40,6) = 1/3,838,380.",
    "source": "PDF 8쪽"
   },
   "quizzes": [
    [
     "1~40 중 서로 다른 6개를 순서 없이 고르는 방법의 수는?",
     [
      "C(40,6)",
      "40^6",
      "P(40,6)"
     ],
     "중복 없이, 순서 없이 고르므로 조합입니다.",
     [
      "맞습니다.",
      "중복을 허용하고 순서를 따지는 경우입니다.",
      "순서를 따지는 순열입니다."
     ]
    ],
    [
     "같은 방식으로 1~10 중 2개를 고르는 복권의 당첨 확률은?",
     [
      "1/45",
      "1/90",
      "1/100"
     ],
     "C(10,2) = 45이므로 1/45.",
     [
      "맞습니다.",
      "순서를 따진 P(10,2) = 90을 쓴 값입니다.",
      "중복과 순서를 모두 허용한 10^2입니다."
     ]
    ]
   ],
   "image": "pages/dm07-08.jpg",
   "text": "Applying Laplace’s Definition\n3\nExample: There are many lotteries that award prizes to people who\ncorrectly choose a set of six numbers out of the first n positive\nintegers, where n is usually between 30 and 60. What is the\nprobability that a person picks the correct six numbers out of 40?\nSolution: The number of ways to choose six numbers out of 40 is\nC(40,6) = 40!/(34!6!) = 3,838,380.\nHence, the probability of picking a winning combination is 1/\n3,838,380 ≈ 0.00000026.\nCan you work out the probability of winning the lottery with the\nbiggest prize where you live?",
   "quiz": [
    "1~40 중 서로 다른 6개를 순서 없이 고르는 방법의 수는?",
    [
     "C(40,6)",
     "40^6",
     "P(40,6)"
    ],
    "중복 없이, 순서 없이 고르므로 조합입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "중복을 허용하고 순서를 따지는 경우입니다.",
    "순서를 따지는 순열입니다."
   ]
  },
  {
   "page": 9,
   "title": "라플라스 정의 적용 4: 비복원 추출과 복원 추출",
   "explanation": "1~50번 공에서 11, 4, 17, 39, 23을 \"그 순서대로\" 뽑을 확률입니다. 뽑은 공을 다시 넣는지(복원) 넣지 않는지(비복원)에 따라 표본공간 크기가 달라집니다. 순서가 정해져 있으므로 두 경우 모두 곱의 법칙(순서 있는 나열)으로 셉니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "비복원 추출(without replacement): 50·49·48·47·46 = 254,251,200가지 → p = 1/254,251,200.",
     "복원 추출(with replacement): 50·50·50·50·50 = 50^5 = 312,500,000가지 → p = 1/312,500,000.",
     "\"그 순서대로\"이므로 원하는 결과는 두 경우 모두 1가지입니다.",
     "복원 추출은 같은 번호가 다시 나올 수 있어 경우 수가 더 많고, 그래서 특정 순서의 확률이 더 작습니다."
    ],
    "analogy": "비복원은 카드 뽑기(뽑은 카드는 손에 남음), 복원은 주사위 굴리기(매번 같은 상태로 다시 시작)에 가깝습니다.",
    "examples": [
     {
      "title": "두 방식 비교",
      "code": "비복원: 50 → 49 → 48 → 47 → 46  (매번 하나씩 줄어듦)\n        곱 = 254,251,200\n복원:   50 → 50 → 50 → 50 → 50  (매번 그대로)\n        곱 = 50^5 = 312,500,000",
      "lang": "",
      "codeLabel": "풀이",
      "out": "비복원 1/254,251,200  >  복원 1/312,500,000",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "작은 예: 공 3개에서 2개를 순서대로",
      "code": "비복원: 3·2 = 6가지  (12, 13, 21, 23, 31, 32)\n복원:   3·3 = 9가지  (위 6가지 + 11, 22, 33)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "특정 순서 (1,2)의 확률: 비복원 1/6, 복원 1/9",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "순서가 중요한지 확인합니다(\"in that order\" → 순서 있음).",
     "복원 여부를 확인하고 단계마다 남은 선택지 수를 적습니다.",
     "곱의 법칙으로 |S|를 구합니다.",
     "원하는 순서는 1가지이므로 p = 1/|S|."
    ],
    "trap": [
     "순서가 정해져 있으므로 조합 C(50,5)를 쓰면 틀립니다.",
     "복원 추출에서 같은 번호가 두 번 나오는 결과도 표본공간에 포함되어야 모든 결과가 똑같이 일어날 법해집니다."
    ],
    "recap": "순서 있는 추출: 비복원 n(n−1)…(n−k+1), 복원 n^k. 특정 순서 하나의 확률 = 1/(그 수).",
    "source": "PDF 9쪽"
   },
   "quizzes": [
    [
     "1~50번 공에서 5개를 복원 추출로 순서대로 뽑을 때 가능한 결과의 수는?",
     [
      "50^5",
      "50·49·48·47·46",
      "C(50,5)"
     ],
     "매번 50가지가 그대로 남습니다.",
     [
      "맞습니다.",
      "비복원 추출의 경우 수입니다.",
      "순서 없이 서로 다른 5개를 고르는 수입니다."
     ]
    ],
    [
     "같은 조건에서 특정 순서(11, 4, 17, 39, 23)가 나올 확률이 더 큰 쪽은?",
     [
      "비복원 추출",
      "복원 추출",
      "두 경우가 같다"
     ],
     "비복원의 표본공간(254,251,200)이 복원(312,500,000)보다 작아서 1/|S|가 더 큽니다.",
     [
      "맞습니다.",
      "복원 추출은 경우 수가 더 많아 확률이 더 작습니다.",
      "분모가 다르므로 같지 않습니다."
     ]
    ],
    [
     "공 3개(1, 2, 3)에서 2개를 비복원으로 순서대로 뽑을 때 (1, 2)가 나올 확률은?",
     [
      "1/6",
      "1/9",
      "1/3"
     ],
     "3·2 = 6가지 중 1가지입니다.",
     [
      "맞습니다.",
      "복원 추출(3·3 = 9)의 경우입니다.",
      "조합 C(3,2) = 3을 쓴 값입니다."
     ]
    ]
   ],
   "image": "pages/dm07-09.jpg",
   "text": "Applying Laplace’s Definition\n4\nExample: What is the probability that the numbers 11, 4, 17,\n39, and 23 are drawn in that order from a bin with 50 balls\nlabeled with the numbers 1,2, …, 50 if\na)\nThe ball selected is not returned to the bin.\nb) The ball selected is returned to the bin before the next ball is\nselected.\nSolution: Use the product rule in each case.\na)\nSampling without replacement: The probability is 1/254,251,200\nsince there are 50 ∙49 ∙48 ∙47 ∙46 = 254,251,200 ways to choose the\nfive balls.\nb)\nSampling with replacement: The probability is 1/505 =\n1/312,500,000 since 505 = 312,500,000.",
   "quiz": [
    "1~50번 공에서 5개를 복원 추출로 순서대로 뽑을 때 가능한 결과의 수는?",
    [
     "50^5",
     "50·49·48·47·46",
     "C(50,5)"
    ],
    "매번 50가지가 그대로 남습니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "비복원 추출의 경우 수입니다.",
    "순서 없이 서로 다른 5개를 고르는 수입니다."
   ]
  },
  {
   "page": 10,
   "title": "여사건의 확률: p(Ē) = 1 − p(E)",
   "explanation": "여사건 Ē = S − E는 \"E가 일어나지 않는 사건\"입니다. 결과 수가 |Ē| = |S| − |E|이므로 확률도 1에서 빼서 구합니다. \"적어도 하나\"가 들어간 문제를 쉽게 푸는 핵심 도구입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "여사건(complementary event): Ē = S − E.",
     "정리 1: p(Ē) = 1 − p(E).",
     "증명: |Ē| = |S| − |E|이므로 p(Ē) = (|S| − |E|)/|S| = 1 − |E|/|S| = 1 − p(E).",
     "p(E) + p(Ē) = 1. E와 Ē 중 정확히 하나가 반드시 일어납니다."
    ],
    "analogy": "시험 합격률이 70%라면 불합격률은 계산할 필요 없이 30%입니다. 전체(100%)에서 빼면 됩니다.",
    "examples": [
     {
      "title": "주사위에서 6이 아닐 확률",
      "code": "E = {6}               p(E) = 1/6\nĒ = {1, 2, 3, 4, 5}    p(Ē) = 1 − 1/6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "5/6",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "동전 3번에서 적어도 한 번 앞면",
      "code": "Ē = \"모두 뒷면\" = {TTT}   p(Ē) = 1/2^3 = 1/8\np(E) = 1 − 1/8",
      "lang": "",
      "codeLabel": "풀이",
      "out": "7/8",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "구하려는 사건 E를 말로 정확히 씁니다.",
     "E의 여사건 Ē를 말로 바꿉니다(\"적어도 하나\" ↔ \"하나도 없음\").",
     "p(Ē)가 더 쉽게 계산되는지 확인하고 계산합니다.",
     "p(E) = 1 − p(Ē)."
    ],
    "trap": [
     "\"적어도 하나\"의 여사건은 \"모두 아님(하나도 없음)\"이지 \"정확히 하나\"가 아닙니다.",
     "여사건은 표본공간 S 안에서의 차집합입니다. S를 먼저 정해야 Ē도 정해집니다."
    ],
    "recap": "p(Ē) = 1 − p(E). \"적어도 하나\"는 여사건 \"하나도 없음\"으로 바꿔 계산합니다.",
    "source": "PDF 10쪽"
   },
   "quizzes": [
    [
     "사건 \"적어도 하나의 비트가 0\"의 여사건은?",
     [
      "모든 비트가 1",
      "정확히 하나의 비트가 0",
      "모든 비트가 0"
     ],
     "\"적어도 하나가 0\"이 아니려면 0이 하나도 없어야 합니다.",
     [
      "맞습니다.",
      "\"정확히 하나\"는 원래 사건의 일부입니다.",
      "이것은 원래 사건에 포함됩니다."
     ]
    ],
    [
     "p(E) = 0.35이면 p(Ē)는?",
     [
      "0.65",
      "0.35",
      "1.35"
     ],
     "p(Ē) = 1 − 0.35 = 0.65.",
     [
      "맞습니다.",
      "여사건은 원래 사건과 같은 확률이 아닙니다.",
      "확률은 1을 넘을 수 없습니다."
     ]
    ]
   ],
   "image": "pages/dm07-10.jpg",
   "text": "The Probability of Complements and\nUnions of Events\n1\nTheorem 1: Let E be an event in sample space S.\nThe probability of the event E = S − E, the\ncomplementary event of E, is given by\n( )\np E = 1− p ( E) .\nProof: Using the fact that | E | =| S | − | E |,\n|S |−|E|\n|E|\np E =\n= 1−\n= 1− p ( E) .\n|S|\n|S|\n( )",
   "quiz": [
    "사건 \"적어도 하나의 비트가 0\"의 여사건은?",
    [
     "모든 비트가 1",
     "정확히 하나의 비트가 0",
     "모든 비트가 0"
    ],
    "\"적어도 하나가 0\"이 아니려면 0이 하나도 없어야 합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "\"정확히 하나\"는 원래 사건의 일부입니다.",
    "이것은 원래 사건에 포함됩니다."
   ]
  },
  {
   "page": 11,
   "title": "여사건 예: 10비트 중 적어도 하나가 0",
   "explanation": "길이 10인 비트열에서 0이 적어도 하나 있을 확률을 직접 세려면 0이 1개, 2개, …, 10개인 경우를 모두 더해야 합니다. 여사건 \"모든 비트가 1\"은 단 한 가지이므로 1에서 빼면 바로 끝납니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "|S| = 2^10 = 1024 (비트 10개, 각 2가지).",
     "Ē = \"모든 비트가 1\" = {1111111111} → |Ē| = 1.",
     "p(E) = 1 − p(Ē) = 1 − 1/2^10 = 1 − 1/1024 = 1023/1024."
    ],
    "analogy": "자물쇠 다이얼 10개가 모두 1에 맞춰져 있을 확률은 아주 작습니다. 그러니 \"하나라도 1이 아닌\" 확률은 거의 1입니다.",
    "examples": [
     {
      "title": "직접 세기 vs 여사건",
      "code": "직접: C(10,1) + C(10,2) + … + C(10,10) = 2^10 − 1 = 1023가지\n여사건: 전체 1024 − 모두 1인 1가지 = 1023가지",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(E) = 1023/1024",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "같은 방법: 길이 4 비트열",
      "code": "적어도 하나가 0 → 1 − 1/2^4 = 1 − 1/16",
      "lang": "",
      "codeLabel": "풀이",
      "out": "15/16",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "E = 적어도 하나가 0. 여사건 Ē = 모두 1.",
     "|S| = 2^10 = 1024, |Ē| = 1.",
     "p(Ē) = 1/1024.",
     "p(E) = 1 − 1/1024 = 1023/1024."
    ],
    "trap": [
     "분모는 10이 아니라 2^10입니다. 비트 하나마다 2가지씩 곱합니다.",
     "원문 문장 \"Then is the event that all of the bits are 1s\"에는 여사건 기호(Ē)가 빠져 있습니다."
    ],
    "recap": "\"적어도 하나\"는 여사건으로: 1 − 1/2^10 = 1023/1024.",
    "source": "PDF 11쪽"
   },
   "quizzes": [
    [
     "길이 10인 비트열에서 적어도 하나의 비트가 0일 확률은?",
     [
      "1023/1024",
      "1/1024",
      "10/1024"
     ],
     "여사건(모두 1)의 확률 1/1024를 1에서 뺍니다.",
     [
      "맞습니다.",
      "여사건(모두 1)의 확률입니다.",
      "정확히 하나가 0인 경우의 수 10을 쓴 값입니다."
     ]
    ],
    [
     "길이 5인 비트열에서 적어도 하나의 비트가 1일 확률은?",
     [
      "31/32",
      "1/32",
      "5/32"
     ],
     "여사건 \"모두 0\"의 확률 1/2^5 = 1/32 → 1 − 1/32.",
     [
      "맞습니다.",
      "모두 0일 확률입니다.",
      "정확히 하나가 1인 경우만 센 값입니다."
     ]
    ]
   ],
   "review": {
    "original": "Solution: Let E be the event that at least one of the 10 bits is 0. Then is the event that all of the bits are 1s.",
    "checked": "\"Then Ē is the event…\"에서 여사건 기호 Ē가 빠진 문장입니다. 아래 식 p(E) = 1 − p(Ē) = 1 − |Ē|/|S|에서 보듯 \"모든 비트가 1\"은 여사건 Ē입니다. 계산 결과 1023/1024는 맞습니다.",
    "label": "원문 기호 누락 · 문맥으로 보충",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-11.jpg",
   "text": "The Probability of Complements and\nUnions of Events\n2\nExample: A sequence of 10 bits is chosen\nrandomly. What is the probability that at least\none of these bits is 0?\nSolution: Let E be the event that at least one of\nthe 10 bits is 0. Then is the event that all of the\nbits are 1s. The size of the sample space S is 210.\nHence,\n( )\n|E|\n1\n1\n1023\np ( E) = 1− p E = 1−\n= 1 − 10 = 1 −\n=\n.\n|S|\n2\n1024 1024",
   "quiz": [
    "길이 10인 비트열에서 적어도 하나의 비트가 0일 확률은?",
    [
     "1023/1024",
     "1/1024",
     "10/1024"
    ],
    "여사건(모두 1)의 확률 1/1024를 1에서 뺍니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "여사건(모두 1)의 확률입니다.",
    "정확히 하나가 0인 경우의 수 10을 쓴 값입니다."
   ]
  },
  {
   "page": 12,
   "title": "합사건의 확률: 포함배제",
   "explanation": "두 사건 중 적어도 하나가 일어날 확률은 두 확률을 더한 뒤, 두 번 더해진 교집합을 한 번 빼서 구합니다. 2.2절의 포함배제 |A ∪ B| = |A| + |B| − |A ∩ B|를 |S|로 나눈 것입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정리 2: p(E1 ∪ E2) = p(E1) + p(E2) − p(E1 ∩ E2).",
     "증명: |E1 ∪ E2| = |E1| + |E2| − |E1 ∩ E2|의 양변을 |S|로 나눕니다.",
     "E1과 E2가 서로소(E1 ∩ E2 = ∅)이면 p(E1 ∪ E2) = p(E1) + p(E2)."
    ],
    "analogy": "반 학생 중 축구부와 농구부를 더하면 두 동아리를 모두 하는 학생이 두 번 세어집니다. 그 학생들을 한 번 빼야 \"둘 중 하나라도 하는 학생 수\"가 됩니다.",
    "examples": [
     {
      "title": "카드 52장: 하트이거나 그림 카드(J, Q, K)",
      "code": "p(하트) = 13/52,  p(그림) = 12/52,  p(하트 ∩ 그림) = 3/52\np(하트 ∪ 그림) = 13/52 + 12/52 − 3/52 = 22/52",
      "lang": "",
      "codeLabel": "풀이",
      "out": "11/26",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "주사위: 짝수이거나 3 이상",
      "code": "E1 = {2,4,6}, E2 = {3,4,5,6}, E1 ∩ E2 = {4,6}\np = 3/6 + 4/6 − 2/6 = 5/6\n직접 확인: E1 ∪ E2 = {2,3,4,5,6} → 5/6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "5/6",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "두 사건 E1, E2를 정의합니다.",
     "p(E1), p(E2)를 구합니다.",
     "교집합 E1 ∩ E2(두 조건을 모두 만족)를 찾고 p(E1 ∩ E2)를 구합니다.",
     "p(E1) + p(E2) − p(E1 ∩ E2)."
    ],
    "trap": [
     "교집합을 빼지 않고 더하기만 하면 확률이 1을 넘을 수도 있습니다.",
     "\"또는(or)\"은 합사건, \"그리고(and)\"는 교사건입니다."
    ],
    "recap": "p(E1 ∪ E2) = p(E1) + p(E2) − p(E1 ∩ E2). 서로소면 그냥 더합니다.",
    "source": "PDF 12쪽"
   },
   "quizzes": [
    [
     "p(A) = 0.5, p(B) = 0.4, p(A ∩ B) = 0.2일 때 p(A ∪ B)는?",
     [
      "0.7",
      "0.9",
      "0.2"
     ],
     "0.5 + 0.4 − 0.2 = 0.7.",
     [
      "맞습니다.",
      "교집합을 빼지 않았습니다.",
      "교집합의 확률입니다."
     ]
    ],
    [
     "E1 ∩ E2 = ∅일 때 p(E1 ∪ E2)는?",
     [
      "p(E1) + p(E2)",
      "p(E1)·p(E2)",
      "p(E1) + p(E2) − 1"
     ],
     "교집합 확률이 0이므로 빼는 항이 없어집니다.",
     [
      "맞습니다.",
      "곱은 독립 사건의 교집합 확률(7.2절)입니다.",
      "1을 뺄 근거가 없습니다."
     ]
    ]
   ],
   "image": "pages/dm07-12.jpg",
   "text": "The Probability of Complements and\nUnions of Events\n3\nTheorem 2: Let E1 and E2 be events in the sample\nspace S. Then\np ( E1  E2 ) = p ( E1 ) + p ( E2 ) − p ( E1  E2 )\nProof: Given the inclusion-exclusion formula from\nSection 2.2, | A  B |=| A | + | B | − | A  B |, it follows that\n| E1  E2 | | E1 | + | E2 | − | E1  E2 |\np ( E1  E2 ) =\n=\n|S|\n|S|\n| E1 | | E2 | | E1  E2 |\n=\n+\n−\n|S| |S|\n|S|\n= p ( E1 ) + p ( E2 ) − p ( E1  E2 ) .",
   "quiz": [
    "p(A) = 0.5, p(B) = 0.4, p(A ∩ B) = 0.2일 때 p(A ∪ B)는?",
    [
     "0.7",
     "0.9",
     "0.2"
    ],
    "0.5 + 0.4 − 0.2 = 0.7."
   ],
   "quizReasons": [
    "맞습니다.",
    "교집합을 빼지 않았습니다.",
    "교집합의 확률입니다."
   ]
  },
  {
   "page": 13,
   "title": "합사건 예: 2 또는 5의 배수",
   "explanation": "1~100 중 하나를 고를 때 2 또는 5로 나누어떨어질 확률입니다. 2와 5로 모두 나누어떨어지는 수(10의 배수)가 두 번 세어지므로 한 번 뺍니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "E1 = 2의 배수: 50개 → 50/100.",
     "E2 = 5의 배수: 20개 → 20/100.",
     "E1 ∩ E2 = 2와 5의 배수 = 10의 배수: 10개 → 10/100.",
     "p(E1 ∪ E2) = 50/100 + 20/100 − 10/100 = 60/100 = 3/5."
    ],
    "analogy": "2의 배수 칸에 파란 스티커, 5의 배수 칸에 빨간 스티커를 붙이면 10, 20, … 칸에는 스티커가 두 장 붙습니다. 스티커가 붙은 칸 수를 셀 때 두 장짜리 칸은 한 번만 세야 합니다.",
    "examples": [
     {
      "title": "배수 개수 세기",
      "code": "2의 배수: ⌊100/2⌋ = 50\n5의 배수: ⌊100/5⌋ = 20\n10의 배수: ⌊100/10⌋ = 10\n|E1 ∪ E2| = 50 + 20 − 10 = 60",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p = 60/100 = 3/5",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "응용: 3 또는 4의 배수(1~100)",
      "code": "3의 배수 33, 4의 배수 25, 12의 배수 8\n33 + 25 − 8 = 50",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p = 50/100 = 1/2",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "각 조건을 만족하는 수의 개수를 ⌊100/d⌋로 셉니다.",
     "두 조건을 모두 만족하는 수(최소공배수의 배수)를 셉니다.",
     "포함배제로 합집합 크기를 구합니다.",
     "|S| = 100으로 나눕니다."
    ],
    "trap": [
     "2와 5의 공통 배수는 10의 배수입니다(최소공배수). 4와 6처럼 서로소가 아니면 곱 24가 아니라 최소공배수 12의 배수를 셉니다.",
     "원문의 P(E2)는 p(E2)와 같은 뜻입니다(대소문자 차이)."
    ],
    "recap": "배수 문제의 합사건: ⌊n/a⌋ + ⌊n/b⌋ − ⌊n/lcm(a,b)⌋을 n으로 나눕니다.",
    "source": "PDF 13쪽"
   },
   "quizzes": [
    [
     "1~100 중 무작위로 고른 수가 2 또는 5의 배수일 확률은?",
     [
      "3/5",
      "7/10",
      "1/10"
     ],
     "(50 + 20 − 10)/100 = 60/100 = 3/5.",
     [
      "맞습니다.",
      "10의 배수를 빼지 않았습니다(70/100).",
      "두 조건을 모두 만족할 확률입니다."
     ]
    ],
    [
     "1~100 중 3 또는 4의 배수인 수의 개수는?",
     [
      "50",
      "58",
      "42"
     ],
     "33 + 25 − 8(12의 배수) = 50.",
     [
      "맞습니다.",
      "12의 배수를 빼지 않았습니다.",
      "12의 배수를 두 번 뺐습니다."
     ]
    ],
    [
     "1~100 중 4 또는 6의 배수를 셀 때 빼야 하는 공통 배수는?",
     [
      "12의 배수",
      "24의 배수",
      "2의 배수"
     ],
     "4와 6을 모두 나누어떨어지게 하는 최소의 수는 최소공배수 12입니다.",
     [
      "맞습니다.",
      "24의 배수만 빼면 12, 36, 60, 84를 놓칩니다.",
      "2의 배수에는 4·6의 배수가 아닌 수도 많습니다."
     ]
    ]
   ],
   "image": "pages/dm07-13.jpg",
   "text": "The Probability of Complements and\nUnions of Events\n4\nExample: What is the probability that a positive integer selected\nat random from the set of positive integers not exceeding 100 is\ndivisible by either 2 or 5?\nSolution: Let E1 be the event that the integer is divisible by 2\nand E2 be the event that it is divisible 5? Then the event that the\ninteger is divisible by 2 or 5 is E1 ∪ E2 and E1 ∩ E2 is the event\nthat it is divisible by 2 and 5.\nIt follows that:\np ( E1  E2 ) = p ( E1 ) + P ( E2 ) − p ( E1  E2 )\n= 50 /100 + 20 /100 − 10 /100 = 3 / 5.",
   "quiz": [
    "1~100 중 무작위로 고른 수가 2 또는 5의 배수일 확률은?",
    [
     "3/5",
     "7/10",
     "1/10"
    ],
    "(50 + 20 − 10)/100 = 60/100 = 3/5."
   ],
   "quizReasons": [
    "맞습니다.",
    "10의 배수를 빼지 않았습니다(70/100).",
    "두 조건을 모두 만족할 확률입니다."
   ]
  },
  {
   "page": 14,
   "title": "몬티 홀 문제",
   "explanation": "문 3개 중 하나 뒤에 상품이 있습니다. 내가 문을 고르면, 정답을 아는 진행자가 남은 문 중 상품이 없는 문 하나를 엽니다. 이때 바꾸는 것이 유리할까요? 원문 답은 \"바꿔라\"입니다. 바꾸면 이길 확률이 2/3입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "처음 고른 문이 정답일 확률은 1/3이고, 진행자가 문을 연 뒤에도 이 값은 변하지 않습니다.",
     "진행자는 항상 상품이 없는 문을 엽니다. 이 규칙이 핵심입니다.",
     "바꾸기 전략은 \"처음 고른 문이 틀렸을 때\" 반드시 이깁니다. 그 확률은 2/3입니다.",
     "따라서 유지하면 1/3, 바꾸면 2/3."
    ],
    "analogy": "문이 100개라고 상상해 보세요. 내가 하나를 고르고, 진행자가 꽝인 문 98개를 열어 하나만 남겨 둡니다. 내가 처음에 1/100로 맞혔을 가능성보다, 진행자가 일부러 남겨 둔 그 문이 정답일 가능성(99/100)이 훨씬 큽니다.",
    "examples": [
     {
      "title": "상품 위치별로 따져 보기 (내가 1번 문을 고른 경우)",
      "code": "상품 위치 | 진행자가 여는 문 | 유지 결과 | 바꾸기 결과\n  1번     | 2번 또는 3번     | 승        | 패\n  2번     | 3번              | 패        | 승\n  3번     | 2번              | 패        | 승\n각 경우 확률 1/3",
      "lang": "",
      "codeLabel": "풀이",
      "out": "유지 승률 1/3, 바꾸기 승률 2/3",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "흔한 오해",
      "code": "\"문 2개 남았으니 반반\" → 틀림\n남은 두 문은 대칭이 아님: 내 문은 진행자가 건드릴 수 없었고,\n남은 문은 진행자가 정답을 피해서 남겨 둔 문",
      "lang": "",
      "codeLabel": "풀이",
      "out": "진행자의 정보가 확률을 바꾼다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "상품 위치(3가지, 각 1/3)로 경우를 나눕니다.",
     "각 경우에 진행자가 어떤 문을 여는지 적습니다(항상 꽝인 문).",
     "유지·바꾸기 전략의 승패를 표로 정리합니다.",
     "이기는 경우의 확률을 더합니다: 바꾸기 = 1/3 + 1/3 = 2/3."
    ],
    "trap": [
     "\"남은 문 2개라서 1/2\"은 진행자가 무작위로 문을 여는 경우와 혼동한 것입니다. 원문 조건은 진행자가 정답을 알고 꽝인 문만 연다는 것입니다.",
     "처음 선택이 맞을 확률 1/3은 진행자의 행동과 상관없이 그대로입니다."
    ],
    "recap": "진행자가 항상 꽝인 문을 열면 바꾸는 쪽이 2/3로 유리합니다(처음 선택이 틀렸을 확률).",
    "source": "PDF 14쪽"
   },
   "quizzes": [
    [
     "몬티 홀 문제에서 문을 바꾸면 이길 확률은?",
     [
      "2/3",
      "1/2",
      "1/3"
     ],
     "처음 선택이 틀렸을 확률(2/3)만큼 바꾸기가 이깁니다.",
     [
      "맞습니다.",
      "진행자의 규칙을 무시한 오해입니다.",
      "바꾸지 않을 때의 승률입니다."
     ]
    ],
    [
     "바꾸기 전략이 반드시 이기는 경우는?",
     [
      "처음 고른 문이 꽝일 때",
      "처음 고른 문이 정답일 때",
      "진행자가 1번 문을 열 때"
     ],
     "처음 고른 문이 꽝이면 진행자가 나머지 꽝을 열고, 남은 문이 정답입니다.",
     [
      "맞습니다.",
      "이때는 바꾸면 집니다.",
      "진행자는 내가 고른 문을 열지 않습니다."
     ]
    ],
    [
     "2/3라는 답이 성립하는 데 꼭 필요한 조건은?",
     [
      "진행자가 정답을 알고 항상 꽝인 문을 연다",
      "진행자가 아무 문이나 무작위로 연다",
      "문이 정확히 2개 남는다"
     ],
     "원문: the game show host always opens a door that does not have the prize.",
     [
      "맞습니다.",
      "무작위로 연다면 분석이 달라집니다.",
      "남는 문 수만으로는 확률이 정해지지 않습니다."
     ]
    ]
   ],
   "image": "pages/dm07-14.jpg",
   "text": "Monty Hall Puzzle\nExample: You are asked to select one of the three doors to open.\nThere is a large prize behind one of the doors and if you select that\ndoor, you win the prize. After you select a door, the game show host\nopens one of the other doors (which he knows is not the winning\ndoor). The prize is not behind the door and he gives you the\nopportunity to switch your selection. Should you switch?\n(This is a notoriously confusing problem that has been the subject of much discussion.\nDo a web search to see why!)\nSolution: You should switch. The probability that your initial pick is\ncorrect is 1/3. This is the same whether or not you switch doors. But\nsince the game show host always opens a door that does not have the\nprize, if you switch the probability of winning will be 2/3, because you\nwin if your initial pick was not the correct door and the probability\nyour initial pick was wrong is 2/3.",
   "quiz": [
    "몬티 홀 문제에서 문을 바꾸면 이길 확률은?",
    [
     "2/3",
     "1/2",
     "1/3"
    ],
    "처음 선택이 틀렸을 확률(2/3)만큼 바꾸기가 이깁니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "진행자의 규칙을 무시한 오해입니다.",
    "바꾸지 않을 때의 승률입니다."
   ]
  },
  {
   "page": 15,
   "title": "7.2 확률론 · 표지",
   "explanation": "7.2절 확률론(Probability Theory)이 시작되는 표지입니다.",
   "kind": "structure",
   "role": "절 표지",
   "image": "pages/dm07-15.jpg",
   "text": "Probability Theory\nSection 7.2",
   "quiz": null
  },
  {
   "page": 16,
   "title": "7.2절 학습 목록",
   "explanation": "확률 배정 → 여사건·합사건 → 조건부확률 → 독립 → 베르누이 시행과 이항분포 → 확률변수 → 생일 문제 → 몬테카를로 알고리즘 순서입니다. 확률적 방법(The Probabilistic Method)은 슬라이드에 포함되지 않았다고 적혀 있어 이 교재에서도 다루지 않습니다.",
   "kind": "structure",
   "role": "목차",
   "image": "pages/dm07-16.jpg",
   "text": "Section Summary\n2\nAssigning Probabilities\nProbabilities of Complements and Unions of Events\nConditional Probability\nIndependence\nBernoulli Trials and the Binomial Distribution\nRandom Variables\nThe Birthday Problem\nMonte Carlo Algorithms\nThe Probabilistic Method (not currently included in the\noverheads)",
   "quiz": null
  },
  {
   "page": 17,
   "title": "확률 배정: 확률분포",
   "explanation": "라플라스의 정의는 모든 결과가 똑같이 일어날 법하다고 가정했습니다. 7.2절은 이 가정을 버리고, 결과 s마다 확률 p(s)를 직접 배정합니다. 두 조건만 지키면 어떤 배정이든 확률분포가 됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "유한 표본공간 S의 각 결과 s에 확률 p(s)를 배정합니다.",
     "조건 i: 모든 s ∈ S에 대해 0 ≤ p(s) ≤ 1.",
     "조건 ii: 모든 결과의 확률을 더하면 1. Σ(s ∈ S) p(s) = 1.",
     "이 두 조건을 만족하는 함수 p를 확률분포(probability distribution)라고 합니다."
    ],
    "analogy": "케이크 한 판(전체 1)을 결과들에게 나눠 주는 것과 같습니다. 조각 크기는 달라도 되지만, 음수 조각은 없고 조각을 모두 합치면 정확히 한 판이어야 합니다.",
    "examples": [
     {
      "title": "올바른 배정과 잘못된 배정",
      "code": "S = {a, b, c}\n① p(a)=0.5, p(b)=0.3, p(c)=0.2  → 합 1.0, 모두 0~1  ✓ 확률분포\n② p(a)=0.6, p(b)=0.3, p(c)=0.2  → 합 1.1           ✗\n③ p(a)=1.2, p(b)=−0.1, p(c)=−0.1 → 합 1.0이지만 범위 위반 ✗",
      "lang": "",
      "codeLabel": "풀이",
      "out": "①만 확률분포",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "라플라스 정의와의 관계",
      "code": "모든 결과에 같은 값 1/|S|를 배정하면\np(E) = |E| · (1/|S|) = |E|/|S|  → 7.1절의 정의와 같아진다",
      "lang": "",
      "codeLabel": "풀이",
      "out": "라플라스 정의는 일반적 정의의 특수한 경우",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "결과마다 확률 값을 적습니다.",
     "각 값이 0 이상 1 이하인지 확인합니다.",
     "모두 더해 1인지 확인합니다.",
     "두 조건을 모두 만족하면 확률분포입니다."
    ],
    "trap": [
     "합이 1이어도 음수 값이 있으면 확률분포가 아닙니다. 두 조건을 모두 확인해야 합니다.",
     "확률분포는 \"결과\"에 확률을 배정하는 함수이고, 사건의 확률은 그 결과들의 합으로 정해집니다(20쪽)."
    ],
    "recap": "확률분포 = 결과마다 0~1의 값을 배정하고 합이 1인 함수 p.",
    "source": "PDF 17쪽"
   },
   "quizzes": [
    [
     "S = {x, y, z}에서 p(x) = 0.2, p(y) = 0.5일 때, p가 확률분포가 되려면 p(z)는?",
     [
      "0.3",
      "0.7",
      "0.5"
     ],
     "합이 1이어야 하므로 1 − 0.2 − 0.5 = 0.3.",
     [
      "맞습니다.",
      "합이 1.4가 됩니다.",
      "합이 1.2가 됩니다."
     ]
    ],
    [
     "확률분포의 조건이 아닌 것은?",
     [
      "모든 결과의 확률이 같아야 한다",
      "각 p(s)는 0 이상 1 이하",
      "모든 p(s)의 합은 1"
     ],
     "7.2절의 일반적 정의는 결과마다 확률이 달라도 됩니다.",
     [
      "맞습니다. 이것은 라플라스 정의의 전제일 뿐입니다.",
      "조건 i입니다.",
      "조건 ii입니다."
     ]
    ]
   ],
   "image": "pages/dm07-17.jpg",
   "text": "Assigning Probabilities\n1\nLaplace’s definition from the previous section, assumes that all outcomes are\nequally likely. Now we introduce a more general definition of probabilities\nthat avoids this restriction.\nLet S be a sample space of an experiment with a finite number of outcomes.\nWe assign a probability p(s) to each outcome s, so that:\ni.\n0  p ( s )  1 for each s  S\nii.\n p ( s) = 1\ns S\nThe function p from the set of all outcomes of the sample space S is called a\nprobability distribution.",
   "quiz": [
    "S = {x, y, z}에서 p(x) = 0.2, p(y) = 0.5일 때, p가 확률분포가 되려면 p(z)는?",
    [
     "0.3",
     "0.7",
     "0.5"
    ],
    "합이 1이어야 하므로 1 − 0.2 − 0.5 = 0.3."
   ],
   "quizReasons": [
    "맞습니다.",
    "합이 1.4가 됩니다.",
    "합이 1.2가 됩니다."
   ]
  },
  {
   "page": 18,
   "title": "확률 배정 예: 공정한 동전과 편향된 동전",
   "explanation": "공정한 동전은 앞면(H)과 뒷면(T)에 1/2씩 배정합니다. 앞면이 뒷면보다 두 배 자주 나오는 편향된 동전은 p(H) = 2p(T)라는 관계와 p(H) + p(T) = 1을 연립해 풉니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "공정한 동전: p(H) = p(T) = 1/2.",
     "편향된 동전: p(H) = 2p(T).",
     "합이 1: 2p(T) + p(T) = 3p(T) = 1 → p(T) = 1/3, p(H) = 2/3."
    ],
    "analogy": "\"앞면이 두 배 자주\"는 앞면 2칸, 뒷면 1칸짜리 돌림판과 같습니다. 칸이 모두 3개이므로 앞면 2/3, 뒷면 1/3입니다.",
    "examples": [
     {
      "title": "관계식에서 확률 구하기",
      "code": "조건:  p(H) = 2·p(T)\n합:    p(H) + p(T) = 1\n대입:  2·p(T) + p(T) = 3·p(T) = 1\n       p(T) = 1/3,  p(H) = 2/3",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(H) = 2/3, p(T) = 1/3",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "같은 방법: 앞면이 세 배 자주",
      "code": "p(H) = 3·p(T) → 4·p(T) = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(T) = 1/4, p(H) = 3/4",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "문제의 비율을 식으로 씁니다(p(H) = k·p(T)).",
     "확률의 합이 1이라는 식을 씁니다.",
     "한 변수로 정리해 풉니다.",
     "구한 값이 0~1이고 합이 1인지 확인합니다."
    ],
    "trap": [
     "\"두 배 자주\"를 p(H) = 2, p(T) = 1처럼 횟수 그대로 쓰면 합이 1이 아닙니다. 반드시 합이 1이 되게 나눕니다.",
     "p(H) = 1/2 + 1/2 같은 식으로 \"1/2을 두 배\"하면 1이 되어 뒷면 확률이 0이 됩니다."
    ],
    "recap": "비율 조건 + 합 1 조건을 연립하면 확률이 정해집니다. 앞면이 두 배 → 2/3, 1/3.",
    "source": "PDF 18쪽"
   },
   "quizzes": [
    [
     "앞면이 뒷면보다 두 배 자주 나오는 동전에서 p(T)는?",
     [
      "1/3",
      "1/2",
      "2/3"
     ],
     "3p(T) = 1 → p(T) = 1/3.",
     [
      "맞습니다.",
      "공정한 동전의 값입니다.",
      "p(H)의 값입니다."
     ]
    ],
    [
     "앞면이 뒷면보다 네 배 자주 나오는 동전에서 p(H)는?",
     [
      "4/5",
      "1/5",
      "4/4"
     ],
     "p(H) = 4p(T), 5p(T) = 1 → p(T) = 1/5, p(H) = 4/5.",
     [
      "맞습니다.",
      "p(T)의 값입니다.",
      "확률의 합 조건을 쓰지 않은 값입니다."
     ]
    ]
   ],
   "image": "pages/dm07-18.jpg",
   "text": "Assigning Probabilities\n2\nExample: What probabilities should we assign to the\noutcomes H(heads) and T (tails) when a fair coin is\nflipped? What probabilities should be assigned to these\noutcomes when the coin is biased so that heads comes up\ntwice as often as tails?\nSolution: For a fair coin, we have p(H) = p(T) = ½.\nFor a biased coin, we have p(H) = 2p(T).\nBecause p(H) + p(T) = 1, it follows that\n2p(T) + p(T) = 3p(T) = 1.\nHence, p(T) = 1/3 and p(H) = 2/3.",
   "quiz": [
    "앞면이 뒷면보다 두 배 자주 나오는 동전에서 p(T)는?",
    [
     "1/3",
     "1/2",
     "2/3"
    ],
    "3p(T) = 1 → p(T) = 1/3."
   ],
   "quizReasons": [
    "맞습니다.",
    "공정한 동전의 값입니다.",
    "p(H)의 값입니다."
   ]
  },
  {
   "page": 19,
   "title": "균등분포",
   "explanation": "원소가 n개인 집합 S의 모든 원소에 1/n씩 배정하는 분포가 균등분포(uniform distribution)입니다. 원문 말대로 이 경우에는 라플라스의 정의를 그대로 써도 결과가 같습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "균등분포: |S| = n일 때 모든 s ∈ S에 p(s) = 1/n.",
     "두 조건 확인: 1/n은 0~1이고, n개를 더하면 n·(1/n) = 1.",
     "균등분포에서는 p(E) = |E|·(1/n) = |E|/|S| → 라플라스 정의와 같습니다.",
     "공정한 동전: p(H) = p(T) = 1/2 (n = 2인 균등분포)."
    ],
    "analogy": "모든 학생에게 사탕을 똑같이 나눠 주는 것과 같습니다. n명이면 한 명당 1/n입니다.",
    "examples": [
     {
      "title": "공정한 주사위",
      "code": "S = {1,…,6}, 균등분포 → 각 1/6\np({1,2}) = 1/6 + 1/6 = 2/6 = 1/3",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1/3 (라플라스: |E|/|S| = 2/6과 같다)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "표본공간의 원소 수 n을 셉니다.",
     "각 결과에 1/n을 배정합니다.",
     "사건의 확률은 (사건의 원소 수)/n입니다."
    ],
    "trap": [
     "균등분포는 \"모든 결과가 똑같이 일어날 법함\"의 다른 이름입니다. 편향된 동전·주사위에는 쓸 수 없습니다."
    ],
    "recap": "균등분포 = 모든 결과에 1/n. 이때 p(E) = |E|/n (라플라스 정의와 같다).",
    "source": "PDF 19쪽"
   },
   "quizzes": [
    [
     "원소가 8개인 집합의 균등분포에서 각 원소의 확률은?",
     [
      "1/8",
      "1/2",
      "8"
     ],
     "균등분포는 모든 원소에 1/n을 배정합니다.",
     [
      "맞습니다.",
      "원소 수와 상관없이 1/2이 되는 것은 아닙니다.",
      "확률은 1을 넘을 수 없습니다."
     ]
    ],
    [
     "균등분포에서 사건 E의 확률은?",
     [
      "|E|/|S|",
      "1/|E|",
      "|S|/|E|"
     ],
     "원소마다 1/|S|이고, E에 속한 원소가 |E|개입니다.",
     [
      "맞습니다.",
      "사건 크기에 반비례하지 않습니다.",
      "1보다 클 수 있는 잘못된 식입니다."
     ]
    ]
   ],
   "image": "pages/dm07-19.jpg",
   "text": "Uniform Distribution\nDefinition: Suppose that S is a set with n\nelements. The uniform distribution assigns the\nprobability 1/n to each element of S. (Note that\nwe could have used Laplace’s definition here.)\nExample: Consider again the coin flipping\nexample, but with a fair coin.\nNow p(H) = p(T) = 1/2.",
   "quiz": [
    "원소가 8개인 집합의 균등분포에서 각 원소의 확률은?",
    [
     "1/8",
     "1/2",
     "8"
    ],
    "균등분포는 모든 원소에 1/n을 배정합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "원소 수와 상관없이 1/2이 되는 것은 아닙니다.",
    "확률은 1을 넘을 수 없습니다."
   ]
  },
  {
   "page": 20,
   "title": "사건의 확률: 결과 확률의 합",
   "explanation": "일반적인 확률분포에서 사건 E의 확률은 E에 속한 결과들의 확률을 모두 더한 값입니다. 결과마다 확률이 달라도 되므로, 개수를 세는 대신 확률 값을 더합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의: p(E) = Σ(s ∈ E) p(s). E에 속한 결과의 확률을 모두 더합니다.",
     "분포에 대한 가정(똑같이 일어날 법함)이 없습니다.",
     "균등분포라면 이 합이 |E|·(1/|S|) = |E|/|S|가 됩니다."
    ],
    "analogy": "장바구니 총액은 담은 물건 가격의 합입니다. 물건마다 가격이 달라도 담은 것만 더하면 됩니다. 사건 = 장바구니, 결과의 확률 = 가격입니다.",
    "examples": [
     {
      "title": "편향된 동전 두 번 (p(H) = 2/3, p(T) = 1/3, 독립)",
      "code": "p(HH) = 4/9, p(HT) = 2/9, p(TH) = 2/9, p(TT) = 1/9  (합 1)\nE = \"앞면이 정확히 한 번\" = {HT, TH}\np(E) = 2/9 + 2/9",
      "lang": "",
      "codeLabel": "풀이",
      "out": "4/9",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "잘못된 방법과 비교",
      "code": "|E|/|S| = 2/4 = 1/2  ← 결과 확률이 달라서 틀림",
      "lang": "",
      "codeLabel": "풀이",
      "out": "정답은 4/9",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "E에 속한 결과를 나열합니다.",
     "각 결과의 확률 p(s)를 적습니다.",
     "모두 더합니다."
    ],
    "trap": [
     "원문 식은 Σ 아래가 s ∈ S로 적혀 있지만 정의 문장(\"the sum of the probabilities of the outcomes in E\")대로 s ∈ E가 맞습니다. s ∈ S로 더하면 항상 1이 됩니다.",
     "결과 확률이 다를 때 |E|/|S|를 쓰면 틀립니다."
    ],
    "recap": "p(E) = Σ(s ∈ E) p(s). 개수가 아니라 확률 값을 더합니다.",
    "source": "PDF 20쪽"
   },
   "quizzes": [
    [
     "일반적 확률분포에서 사건 E의 확률을 구하는 방법은?",
     [
      "E에 속한 결과들의 확률을 더한다",
      "E의 원소 수를 S의 원소 수로 나눈다",
      "S의 모든 결과의 확률을 더한다"
     ],
     "정의: p(E) = Σ(s ∈ E) p(s).",
     [
      "맞습니다.",
      "균등분포일 때만 맞는 방법입니다.",
      "그 합은 항상 1입니다."
     ]
    ],
    [
     "p(a) = 0.1, p(b) = 0.3, p(c) = 0.6일 때 p({a, c})는?",
     [
      "0.7",
      "2/3",
      "0.06"
     ],
     "0.1 + 0.6 = 0.7.",
     [
      "맞습니다.",
      "원소 수 비율 2/3을 쓴 오답입니다.",
      "확률을 곱한 값입니다."
     ]
    ]
   ],
   "review": {
    "original": "p(E) = Σ_{s ∈ S} p(s)  (Σ 아래 첨자가 s ∈ S)",
    "checked": "정의 문장 \"The probability of the event E is the sum of the probabilities of the outcomes in E\"에 따르면 Σ 아래는 s ∈ E여야 합니다. s ∈ S로 더하면 조건 ii에 의해 항상 1이 됩니다. 교재(Rosen)의 정의도 p(E) = Σ_{s∈E} p(s)입니다.",
    "label": "원문 첨자 오타 의심 · 정의 문장과 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-20.jpg",
   "text": "Probability of an Event\n2\nDefinition: The probability of the event E is the sum of\nthe probabilities of the outcomes in E.\np ( E ) =  p ( s)\ns S\nNote that now no assumption is being made about the\ndistribution.",
   "quiz": [
    "일반적 확률분포에서 사건 E의 확률을 구하는 방법은?",
    [
     "E에 속한 결과들의 확률을 더한다",
     "E의 원소 수를 S의 원소 수로 나눈다",
     "S의 모든 결과의 확률을 더한다"
    ],
    "정의: p(E) = Σ(s ∈ E) p(s)."
   ],
   "quizReasons": [
    "맞습니다.",
    "균등분포일 때만 맞는 방법입니다.",
    "그 합은 항상 1입니다."
   ]
  },
  {
   "page": 21,
   "title": "예: 3이 두 배 자주 나오는 주사위",
   "explanation": "3이 다른 눈보다 두 배 자주 나오고 나머지 다섯 눈은 똑같이 나오는 주사위에서 홀수가 나올 확률입니다. 먼저 결과 확률을 정한 뒤, 사건 {1, 3, 5}의 확률을 더합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "나머지 눈의 확률을 x라 하면 p(3) = 2x.",
     "합이 1: 5x + 2x = 7x = 1 → x = 1/7, p(3) = 2/7.",
     "E = {1, 3, 5}: p(E) = 1/7 + 2/7 + 1/7 = 4/7."
    ],
    "analogy": "주사위 면에 표를 붙인다고 생각하면 3에는 2장, 나머지에는 1장씩 모두 7장입니다. 홀수 면(1, 3, 5)의 표는 1 + 2 + 1 = 4장입니다.",
    "examples": [
     {
      "title": "결과 확률 표",
      "code": "눈:    1    2    3    4    5    6\n확률: 1/7  1/7  2/7  1/7  1/7  1/7   (합 7/7 = 1)\np(홀수) = p(1) + p(3) + p(5) = 1/7 + 2/7 + 1/7",
      "lang": "",
      "codeLabel": "풀이",
      "out": "4/7",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "같은 주사위: 짝수가 나올 확률",
      "code": "p(2) + p(4) + p(6) = 3/7   (또는 1 − 4/7)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "3/7",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "미지수 x(보통 눈의 확률)를 둡니다.",
     "조건을 식으로: p(3) = 2x, 나머지 다섯 눈 = x.",
     "합 1에서 x = 1/7.",
     "사건의 결과 확률을 더합니다."
    ],
    "trap": [
     "\"3이 두 배\"를 p(3) = 2/6으로 놓으면 합이 7/6이 되어 틀립니다. 합이 1이 되도록 다시 나눠야 합니다.",
     "홀수 사건의 결과 수(3개)를 6으로 나눈 1/2은 균등분포일 때만 맞습니다."
    ],
    "recap": "편향 주사위: 가중치 합(7)으로 나눠 결과 확률을 정한 뒤 사건의 결과 확률을 더합니다. 홀수 = 4/7.",
    "source": "PDF 21쪽"
   },
   "quizzes": [
    [
     "3이 다른 눈의 두 배로 나오는 주사위에서 p(3)은?",
     [
      "2/7",
      "2/6",
      "1/3"
     ],
     "7x = 1 → x = 1/7, p(3) = 2/7.",
     [
      "맞습니다.",
      "합이 1이 되지 않는 값입니다.",
      "2/6을 약분한 값으로 여전히 틀립니다."
     ]
    ],
    [
     "같은 주사위에서 홀수가 나올 확률은?",
     [
      "4/7",
      "1/2",
      "3/7"
     ],
     "1/7 + 2/7 + 1/7 = 4/7.",
     [
      "맞습니다.",
      "균등분포로 착각한 값입니다.",
      "짝수가 나올 확률입니다."
     ]
    ],
    [
     "6이 다른 눈의 세 배로 나오고 나머지 다섯 눈은 같은 확률인 주사위에서 p(6)은?",
     [
      "3/8",
      "3/6",
      "1/8"
     ],
     "5x + 3x = 8x = 1 → x = 1/8, p(6) = 3/8.",
     [
      "맞습니다.",
      "합이 1이 되지 않습니다.",
      "다른 눈 하나의 확률입니다."
     ]
    ]
   ],
   "image": "pages/dm07-21.jpg",
   "text": "Example\nExample: Suppose that a die is biased so that 3 appears\ntwice as often as each other number, but that the other\nfive outcomes are equally likely. What is the probability\nthat an odd number appears when we roll this die?\nSolution: We want the probability of the event\nE = {1,3,5}. We have p(3) = 2/7 and\np(1) = p(2) = p(4) = p(5) = p(6) = 1/7.\nHence, p(E) = p(1) + p(3) + p(5) =\n1/7 + 2/7 + 1/7 = 4/7.",
   "quiz": [
    "3이 다른 눈의 두 배로 나오는 주사위에서 p(3)은?",
    [
     "2/7",
     "2/6",
     "1/3"
    ],
    "7x = 1 → x = 1/7, p(3) = 2/7."
   ],
   "quizReasons": [
    "맞습니다.",
    "합이 1이 되지 않는 값입니다.",
    "2/6을 약분한 값으로 여전히 틀립니다."
   ]
  },
  {
   "page": 22,
   "title": "일반적 정의에서도 성립하는 여사건·합사건 공식",
   "explanation": "7.1절의 두 공식(여사건, 포함배제)은 결과 수를 세서 증명했지만, 결과 확률이 서로 다른 일반적인 분포에서도 그대로 성립합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "여사건: p(Ē) = 1 − p(E). 각 결과는 E와 Ē 중 정확히 한쪽에만 속하므로 1 = Σ(s∈S) p(s) = p(E) + p(Ē).",
     "합사건: p(E1 ∪ E2) = p(E1) + p(E2) − p(E1 ∩ E2)도 그대로 성립합니다.",
     "증명의 열쇠: 결과 개수 대신 결과 확률을 더해도 \"두 번 세어진 부분을 한 번 뺀다\"는 논리가 같습니다."
    ],
    "analogy": "사람 수 대신 몸무게를 더해도 \"두 무리에 겹치는 사람은 한 번 빼라\"는 규칙은 똑같이 통합니다.",
    "examples": [
     {
      "title": "편향 주사위(21쪽)에서 확인",
      "code": "p(홀수) = 4/7 → p(짝수) = 1 − 4/7 = 3/7\n직접: p(2) + p(4) + p(6) = 3/7  ✓",
      "lang": "",
      "codeLabel": "풀이",
      "out": "여사건 공식 성립",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "합사건 확인",
      "code": "E1 = 홀수 {1,3,5}: 4/7,  E2 = {3,4}: 2/7 + 1/7 = 3/7\nE1 ∩ E2 = {3}: 2/7\np(E1 ∪ E2) = 4/7 + 3/7 − 2/7 = 5/7\n직접: {1,3,4,5} → 1/7 + 2/7 + 1/7 + 1/7 = 5/7  ✓",
      "lang": "",
      "codeLabel": "풀이",
      "out": "포함배제 성립",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "각 사건에 속한 결과의 확률을 더해 p(E1), p(E2), p(E1 ∩ E2)를 구합니다.",
     "공식에 대입합니다.",
     "합집합의 결과를 직접 더해 같은지 확인합니다."
    ],
    "trap": [
     "공식은 같지만 각 항은 개수 비율이 아니라 확률의 합으로 계산해야 합니다."
    ],
    "recap": "여사건·포함배제 공식은 결과 확률이 달라도 그대로 성립합니다.",
    "source": "PDF 22쪽"
   },
   "quizzes": [
    [
     "편향된 주사위에서 p(E) = 4/7이면 p(Ē)는?",
     [
      "3/7",
      "4/7",
      "1/2"
     ],
     "여사건 공식은 일반적 분포에서도 성립합니다.",
     [
      "맞습니다.",
      "원래 사건의 확률입니다.",
      "균등분포로 착각한 값입니다."
     ]
    ],
    [
     "결과 확률이 서로 다른 분포에서 포함배제 공식 p(E1∪E2) = p(E1)+p(E2)−p(E1∩E2)는?",
     [
      "그대로 성립한다",
      "균등분포에서만 성립한다",
      "서로소일 때만 성립한다"
     ],
     "원문: also still holds under the new definition.",
     [
      "맞습니다.",
      "일반적 정의에서도 성립합니다.",
      "서로소가 아니어도 성립합니다(서로소면 교집합 항이 0)."
     ]
    ]
   ],
   "image": "pages/dm07-22.jpg",
   "text": "Probabilities of Complements and\nUnions of Events\nComplements: p ( E ) = 1 − p ( E ) still holds. Since each\noutcome is in either E or E , but not both,\n p ( s) = 1 = p ( E ) + p ( E ) .\ns S\nUnions: p ( E1  E2 ) = p ( E1 ) + p ( E2 ) − p ( E1  E2 )\nalso still holds under the new definition.",
   "quiz": [
    "편향된 주사위에서 p(E) = 4/7이면 p(Ē)는?",
    [
     "3/7",
     "4/7",
     "1/2"
    ],
    "여사건 공식은 일반적 분포에서도 성립합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "원래 사건의 확률입니다.",
    "균등분포로 착각한 값입니다."
   ]
  },
  {
   "page": 23,
   "title": "서로소 사건들의 합",
   "explanation": "사건들이 둘씩 서로소(pairwise disjoint, 어떤 두 사건도 공통 결과가 없음)이면, 그 합사건의 확률은 각 사건 확률의 합입니다. 사건이 무한히 많아도(E1, E2, …) 성립합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "둘씩 서로소: i ≠ j이면 Ei ∩ Ej = ∅.",
     "정리: p(∪ Ei) = Σ p(Ei).",
     "포함배제에서 교집합 항이 모두 0이 된 경우입니다.",
     "증명은 교재 연습문제 36, 37번(슬라이드에는 없음)."
    ],
    "analogy": "서로 다른 반 학생 수를 더하면 학년 학생 수가 됩니다. 한 학생이 두 반에 속하지 않으니 빼야 할 중복이 없습니다.",
    "examples": [
     {
      "title": "주사위를 눈별로 나누기",
      "code": "E1 = {1}, E2 = {2}, …, E6 = {6}  (둘씩 서로소)\np(E1 ∪ … ∪ E6) = 1/6 + … + 1/6 = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "= p(S) = 1",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "주의: 서로소가 아닌 경우",
      "code": "A = {1,2}, B = {2,3}: A ∩ B = {2}\np(A) + p(B) = 4/6이지만 p(A ∪ B) = 3/6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "서로소가 아니면 그냥 더할 수 없다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "사건들 사이에 공통 결과가 있는지 확인합니다.",
     "모든 쌍이 서로소이면 확률을 그대로 더합니다.",
     "공통 결과가 있으면 포함배제를 씁니다."
    ],
    "trap": [
     "\"둘씩 서로소\"는 모든 쌍에서 교집합이 비어야 한다는 뜻입니다. 한 쌍이라도 겹치면 이 정리를 쓸 수 없습니다."
    ],
    "recap": "둘씩 서로소인 사건들의 합사건 확률 = 각 확률의 합.",
    "source": "PDF 23쪽"
   },
   "quizzes": [
    [
     "E1, E2, E3이 둘씩 서로소이고 각 확률이 0.1, 0.2, 0.3이면 p(E1 ∪ E2 ∪ E3)는?",
     [
      "0.6",
      "0.006",
      "0.3"
     ],
     "서로소이므로 그대로 더합니다.",
     [
      "맞습니다.",
      "확률을 곱한 값입니다.",
      "가장 큰 값만 고른 것입니다."
     ]
    ],
    [
     "A = {1, 2}, B = {2, 3}인 공정한 주사위에서 p(A ∪ B)는?",
     [
      "1/2",
      "2/3",
      "1/3"
     ],
     "A ∪ B = {1, 2, 3} → 3/6. 서로소가 아니므로 2/6 + 2/6을 그대로 더하면 틀립니다.",
     [
      "맞습니다.",
      "서로소가 아닌데 그냥 더한 값입니다.",
      "한 사건의 확률입니다."
     ]
    ]
   ],
   "image": "pages/dm07-23.jpg",
   "text": "Combinations of Events\nTheorem: If E1, E2, … is a sequence of pairwise disjoint\nevents in a sample space S, then\n\n\np  U Ei  =  p ( Ei )\n i \ni\nsee Exercises 36 and 37 for the proof",
   "quiz": [
    "E1, E2, E3이 둘씩 서로소이고 각 확률이 0.1, 0.2, 0.3이면 p(E1 ∪ E2 ∪ E3)는?",
    [
     "0.6",
     "0.006",
     "0.3"
    ],
    "서로소이므로 그대로 더합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "확률을 곱한 값입니다.",
    "가장 큰 값만 고른 것입니다."
   ]
  },
  {
   "page": 24,
   "title": "조건부확률",
   "explanation": "F가 일어났다는 것을 알 때 E가 일어날 확률을 조건부확률 p(E|F)라고 합니다. 표본공간을 F로 좁힌 뒤, 그 안에서 E가 차지하는 비율로 계산합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의: p(F) > 0일 때 p(E|F) = p(E ∩ F)/p(F).",
     "읽는 법: \"F가 주어졌을 때 E의 확률\".",
     "예: 길이 4 비트열, F = 첫 비트 0, E = 0이 연속 두 개 이상.",
     "E ∩ F = {0000, 0001, 0010, 0011, 0100} → p(E ∩ F) = 5/16, p(F) = 8/16 = 1/2.",
     "p(E|F) = (5/16)/(1/2) = 5/8."
    ],
    "analogy": "전교생 중 안경 쓴 학생 비율과, \"우리 반 학생 중\" 안경 쓴 학생 비율은 다릅니다. 조건부확률은 관심 범위를 우리 반(F)으로 좁힌 비율입니다.",
    "examples": [
     {
      "title": "F(첫 비트가 0) 안에서 직접 세기",
      "code": "F = {0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111}  (8개)\n0이 연속 두 개 이상:  0000 0001 0010 0011 0100     (5개)\n                     0101 0110 0111 → 연속 00 없음",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(E|F) = 5/8",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "정의식으로 계산",
      "code": "p(E ∩ F) = 5/16,  p(F) = 8/16\np(E|F) = (5/16) / (8/16) = 5/8",
      "lang": "",
      "codeLabel": "풀이",
      "out": "5/8",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "조건 F에 해당하는 결과를 나열하고 p(F)를 구합니다.",
     "F 안에서 E도 만족하는 결과(E ∩ F)를 찾습니다.",
     "p(E ∩ F)를 p(F)로 나눕니다.",
     "균등분포이면 |E ∩ F|/|F|로 바로 계산해도 됩니다."
    ],
    "trap": [
     "p(E|F)와 p(F|E)는 다릅니다. 분모가 p(F)인지 p(E)인지 확인하세요.",
     "분모가 p(S) = 1이 아니라 p(F)입니다. 조건을 알면 표본공간이 F로 줄어듭니다.",
     "0100도 마지막 두 비트가 00이므로 E에 속합니다."
    ],
    "recap": "p(E|F) = p(E ∩ F)/p(F). 표본공간을 F로 좁혀서 다시 비율을 구합니다.",
    "source": "PDF 24쪽"
   },
   "quizzes": [
    [
     "길이 4 비트열에서 첫 비트가 0일 때 0이 연속 두 개 이상일 조건부확률은?",
     [
      "5/8",
      "5/16",
      "1/2"
     ],
     "(5/16)/(1/2) = 5/8.",
     [
      "맞습니다.",
      "p(E ∩ F)이고 조건부확률이 아닙니다.",
      "p(F)입니다."
     ]
    ],
    [
     "p(E ∩ F) = 0.2, p(F) = 0.5일 때 p(E|F)는?",
     [
      "0.4",
      "0.1",
      "0.7"
     ],
     "0.2/0.5 = 0.4.",
     [
      "맞습니다.",
      "곱한 값입니다.",
      "더한 값입니다."
     ]
    ],
    [
     "공정한 주사위에서 짝수가 나왔다는 것을 알 때 4 이상일 확률은?",
     [
      "2/3",
      "1/2",
      "1/3"
     ],
     "F = {2,4,6}, E ∩ F = {4,6} → 2/3.",
     [
      "맞습니다.",
      "조건 없이 4 이상일 확률(3/6)입니다.",
      "p(E ∩ F) = 2/6을 그대로 쓴 값입니다."
     ]
    ]
   ],
   "image": "pages/dm07-24.jpg",
   "text": "Conditional Probability\n1\nDefinition: Let E and F be events with p(F) > 0. The conditional probability of E\ngiven F, denoted by P(E|F), is defined as:\np(E  F)\np(E | F) =\np(F)\nExample: A bit string of length four is generated at random so that each of\nthe 16 bit strings of length 4 is equally likely. What is the probability that it\ncontains at least two consecutive 0s, given that its first bit is a 0?\nSolution: Let E be the event that the bit string contains at least two\nconsecutive 0s, and F be the event that the first bit is a 0.\n•\nSince E ⋂ F = {0000, 0001, 0010, 0011, 0100}, p(E⋂F)=5/16.\n•\nBecause 8 bit strings of length 4 start with a 0, p(F) = 8/16= ½.\nHence,\np ( E  F ) 5 /16 5\np(E | F) =\n=\n= .\np(F)\n1/ 2 8",
   "quiz": [
    "길이 4 비트열에서 첫 비트가 0일 때 0이 연속 두 개 이상일 조건부확률은?",
    [
     "5/8",
     "5/16",
     "1/2"
    ],
    "(5/16)/(1/2) = 5/8."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(E ∩ F)이고 조건부확률이 아닙니다.",
    "p(F)입니다."
   ]
  },
  {
   "page": 25,
   "title": "조건부확률 예: 두 아이 문제",
   "explanation": "아이가 둘인 가정에서 \"적어도 한 명이 아들\"이라는 것을 알 때 둘 다 아들일 확률입니다. BB, BG, GB, GG가 똑같이 일어날 법하다고 가정하면 답은 1/2이 아니라 1/3입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "E = 둘 다 아들 = {BB}, F = 적어도 한 명이 아들 = {BB, BG, GB}.",
     "E ∩ F = {BB} → p(E ∩ F) = 1/4, p(F) = 3/4.",
     "p(E|F) = (1/4)/(3/4) = 1/3."
    ],
    "analogy": "세 가족(BB, BG, GB)이 \"아들 있음\" 모임에 왔습니다. 그중 아들만 둘인 가족은 하나뿐이니 1/3입니다.",
    "examples": [
     {
      "title": "조건 안에서 세기",
      "code": "F = {BB, BG, GB}   ← GG는 조건에서 제외\nE ∩ F = {BB}",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(E|F) = 1/3",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "비교: \"첫째가 아들\"이라는 조건이면",
      "code": "F' = {BB, BG}, E ∩ F' = {BB}\np(E|F') = 1/2",
      "lang": "",
      "codeLabel": "풀이",
      "out": "조건이 달라지면 답도 달라진다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "가능한 결과를 순서까지 구분해 나열합니다(BG와 GB는 다름).",
     "조건 F에 맞는 결과만 남깁니다.",
     "그 안에서 E의 비율을 구합니다."
    ],
    "trap": [
     "\"적어도 한 명이 아들\"과 \"첫째가 아들\"은 다른 조건입니다. 앞은 1/3, 뒤는 1/2입니다.",
     "BG와 GB를 하나로 합쳐 {BB, 아들딸, GG} 3가지로 보면 똑같이 일어날 법하지 않아 틀립니다."
    ],
    "recap": "적어도 한 명이 아들 → {BB, BG, GB} 중 BB → 1/3.",
    "source": "PDF 25쪽"
   },
   "quizzes": [
    [
     "아이가 둘인 가정에서 적어도 한 명이 아들일 때 둘 다 아들일 확률은?",
     [
      "1/3",
      "1/2",
      "1/4"
     ],
     "F = {BB, BG, GB} 중 BB 하나입니다.",
     [
      "맞습니다.",
      "\"첫째가 아들\"이라는 조건일 때의 답입니다.",
      "조건 없이 둘 다 아들일 확률입니다."
     ]
    ],
    [
     "아이가 둘인 가정에서 첫째가 딸일 때 둘 다 딸일 확률은?",
     [
      "1/2",
      "1/3",
      "1/4"
     ],
     "F = {GB, GG} 중 GG 하나입니다.",
     [
      "맞습니다.",
      "\"적어도 한 명이 딸\" 조건일 때의 답입니다.",
      "조건 없는 확률입니다."
     ]
    ]
   ],
   "image": "pages/dm07-25.jpg",
   "text": "Conditional Probability\n2\nExample: What is the conditional probability that a family with\ntwo children has two boys, given that they have at least one boy.\nAssume that each of the possibilities BB, BG, GB, and GG is equally\nlikely where B represents a boy and G represents a girl.\nSolution: Let E be the event that the family has two boys and let F\nbe the event that the family has at least one boy. Then E = {BB}, F\n= {BB, BG, GB}, and E ⋂ F = {BB}.\n• It follows that p(F) = 3/4 and p(E⋂F)=1/4.\nHence,\np ( E  F ) 1/ 4 1\np(E | F) =\n=\n= .\np(F)\n3/ 4 3",
   "quiz": [
    "아이가 둘인 가정에서 적어도 한 명이 아들일 때 둘 다 아들일 확률은?",
    [
     "1/3",
     "1/2",
     "1/4"
    ],
    "F = {BB, BG, GB} 중 BB 하나입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "\"첫째가 아들\"이라는 조건일 때의 답입니다.",
    "조건 없이 둘 다 아들일 확률입니다."
   ]
  },
  {
   "page": 26,
   "title": "독립 사건",
   "explanation": "두 사건이 독립이라는 것은 한 사건이 일어났다는 정보가 다른 사건의 확률을 바꾸지 않는다는 뜻입니다. 정의는 곱셈 공식 p(E ∩ F) = p(E)p(F)로 확인합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의: E와 F가 독립 ⇔ p(E ∩ F) = p(E)·p(F).",
     "p(F) > 0이면 독립은 p(E|F) = p(E)와 같은 뜻입니다.",
     "예: 길이 4 비트열, E = 1로 시작, F = 1의 개수가 짝수.",
     "p(E) = p(F) = 8/16 = 1/2, E ∩ F = {1111, 1100, 1010, 1001} → 4/16 = 1/4.",
     "1/4 = (1/2)(1/2)이므로 E와 F는 독립입니다."
    ],
    "analogy": "오늘 내가 우산을 챙겼는지와 내일 로또 번호는 서로 영향을 주지 않습니다. 하나를 알아도 다른 쪽 확률이 그대로면 독립입니다.",
    "examples": [
     {
      "title": "곱셈 공식으로 확인",
      "code": "p(E) = 8/16 = 1/2\np(F) = 8/16 = 1/2   (1이 0개·2개·4개: 1 + 6 + 1 = 8)\np(E ∩ F) = 4/16 = 1/4\np(E)·p(F) = 1/4  →  같다",
      "lang": "",
      "codeLabel": "풀이",
      "out": "독립",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "조건부확률로 다시 보기",
      "code": "p(F|E) = p(E ∩ F)/p(E) = (1/4)/(1/2) = 1/2 = p(F)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1로 시작한다는 정보가 F의 확률을 바꾸지 않는다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "p(E), p(F)를 각각 구합니다.",
     "교집합 E ∩ F의 확률을 직접 셉니다.",
     "p(E ∩ F)와 p(E)·p(F)를 비교합니다.",
     "같으면 독립, 다르면 독립이 아닙니다."
    ],
    "trap": [
     "독립과 서로소(배반)는 다릅니다. 확률이 0보다 큰 두 서로소 사건은 오히려 독립이 아닙니다(하나가 일어나면 다른 하나는 절대 안 일어남).",
     "\"직관적으로 관계없어 보인다\"는 판단 대신 곱셈 공식을 직접 확인해야 합니다."
    ],
    "recap": "독립 ⇔ p(E ∩ F) = p(E)p(F). 직접 계산으로 확인합니다.",
    "source": "PDF 26쪽"
   },
   "quizzes": [
    [
     "p(E) = 0.3, p(F) = 0.5, p(E ∩ F) = 0.15일 때 E와 F는?",
     [
      "독립이다",
      "독립이 아니다",
      "서로소이다"
     ],
     "0.3 × 0.5 = 0.15 = p(E ∩ F).",
     [
      "맞습니다.",
      "곱셈 공식이 성립하므로 독립입니다.",
      "교집합 확률이 0이 아니므로 서로소가 아닙니다."
     ]
    ],
    [
     "p(E) > 0, p(F) > 0이고 E ∩ F = ∅이면 E와 F는?",
     [
      "독립이 아니다",
      "항상 독립이다",
      "알 수 없다"
     ],
     "p(E ∩ F) = 0이지만 p(E)p(F) > 0이므로 곱셈 공식이 성립하지 않습니다.",
     [
      "맞습니다.",
      "서로소와 독립을 혼동했습니다.",
      "조건만으로 판정할 수 있습니다."
     ]
    ],
    [
     "독립인 E, F에서 p(F) > 0일 때 p(E|F)는?",
     [
      "p(E)",
      "p(E)·p(F)",
      "p(F)"
     ],
     "p(E|F) = p(E ∩ F)/p(F) = p(E)p(F)/p(F) = p(E).",
     [
      "맞습니다.",
      "이것은 p(E ∩ F)입니다.",
      "조건 사건의 확률입니다."
     ]
    ]
   ],
   "image": "pages/dm07-26.jpg",
   "text": "Independence\n1\nDefinition: The events E and F are independent if and only if\np ( E  F ) = p ( E) p ( F ) .\nExample: Suppose E is the event that a randomly generated bit string of\nlength four begins with a 1 and F is the event that this bit string contains an\neven number of 1s. Are E and F independent if the 16 bit strings of length four\nare equally likely?\nSolution: There are eight bit strings of length four that begin with a 1, and\neight bit strings of length four that contain an even number of 1s.\n•\nSince the number of bit strings of length 4 is 16,\np ( E ) = p ( F ) = 8 /16 = 1/ 2.\n•\nSince E⋂F = {1111, 1100, 1010, 1001}, p(E⋂F) = 4/16=1/4.\nWe conclude that E and F are independent, because\np ( E  F ) = 1/ 4 = (1/ 2)(1/ 2) = p ( E ) p ( F )",
   "quiz": [
    "p(E) = 0.3, p(F) = 0.5, p(E ∩ F) = 0.15일 때 E와 F는?",
    [
     "독립이다",
     "독립이 아니다",
     "서로소이다"
    ],
    "0.3 × 0.5 = 0.15 = p(E ∩ F)."
   ],
   "quizReasons": [
    "맞습니다.",
    "곱셈 공식이 성립하므로 독립입니다.",
    "교집합 확률이 0이 아니므로 서로소가 아닙니다."
   ]
  },
  {
   "page": 27,
   "title": "독립이 아닌 예: 두 아이",
   "explanation": "25쪽의 두 아이 문제에서 E = 둘 다 아들, F = 적어도 한 명이 아들입니다. p(E)·p(F)와 p(E ∩ F)가 다르므로 독립이 아닙니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(E) = 1/4 (BB), p(F) = 3/4, p(E ∩ F) = 1/4.",
     "p(E)·p(F) = 3/16 ≠ 1/4 = p(E ∩ F) → 독립이 아닙니다.",
     "해석: \"둘 다 아들\"이면 \"적어도 한 명이 아들\"은 반드시 참이므로 정보가 서로 영향을 줍니다."
    ],
    "analogy": "E가 F에 완전히 포함되어 있으면 E가 일어났다는 것만으로 F가 확정됩니다. 그런 관계에서 독립일 수는 없습니다(F가 확실한 사건인 경우 제외).",
    "examples": [
     {
      "title": "곱셈 공식 비교",
      "code": "p(E)·p(F) = (1/4)(3/4) = 3/16\np(E ∩ F) = 1/4 = 4/16\n3/16 ≠ 4/16",
      "lang": "",
      "codeLabel": "풀이",
      "out": "독립이 아니다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "조건부확률로 확인",
      "code": "p(E|F) = 1/3 (25쪽) ≠ p(E) = 1/4",
      "lang": "",
      "codeLabel": "풀이",
      "out": "정보 F가 E의 확률을 바꾼다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "p(E), p(F), p(E ∩ F)를 구합니다.",
     "p(E)·p(F)를 계산합니다.",
     "두 값을 비교해 다르면 독립이 아닙니다."
    ],
    "trap": [
     "E ⊂ F이면 p(E ∩ F) = p(E)입니다. 독립이려면 p(E) = p(E)p(F), 즉 p(F) = 1(또는 p(E) = 0)이어야 합니다."
    ],
    "recap": "두 아이 문제의 E, F: 3/16 ≠ 1/4 → 독립 아님.",
    "source": "PDF 27쪽"
   },
   "quizzes": [
    [
     "두 아이 문제에서 p(E)·p(F)의 값은?",
     [
      "3/16",
      "1/4",
      "1/3"
     ],
     "(1/4)(3/4) = 3/16.",
     [
      "맞습니다.",
      "p(E ∩ F)의 값입니다.",
      "p(E|F)의 값입니다."
     ]
    ],
    [
     "E ⊂ F이고 0 < p(E), p(F) < 1이면 E와 F는?",
     [
      "독립이 아니다",
      "항상 독립이다",
      "서로소이다"
     ],
     "p(E ∩ F) = p(E)인데 p(E)p(F) < p(E)이므로 같을 수 없습니다.",
     [
      "맞습니다.",
      "포함 관계면 정보가 서로 영향을 줍니다.",
      "E ∩ F = E ≠ ∅이므로 서로소가 아닙니다."
     ]
    ]
   ],
   "image": "pages/dm07-27.jpg",
   "text": "Independence\n2\nExample: Assume (as in the previous example) that\neach of the four ways a family can have two children\n(BB, GG, BG,GB) is equally likely. Are the events E, that\na family with two children has two boys, and F, that a\nfamily with two children has at least one boy,\nindependent?\nSolution: Because E = {BB}, p(E) = 1/4. We saw\npreviously that that p(F) = 3/4 and p(E⋂F)=1/4. The\nevents E and F are not independent since\np ( E ) p ( F ) = 3 /16  1/ 4 = p ( E  F ) .",
   "quiz": [
    "두 아이 문제에서 p(E)·p(F)의 값은?",
    [
     "3/16",
     "1/4",
     "1/3"
    ],
    "(1/4)(3/4) = 3/16."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(E ∩ F)의 값입니다.",
    "p(E|F)의 값입니다."
   ]
  },
  {
   "page": 28,
   "title": "쌍별 독립과 상호 독립",
   "explanation": "사건이 셋 이상일 때 독립의 정의는 두 가지입니다. 모든 두 사건 쌍만 곱셈 공식을 만족하면 쌍별 독립, 두 개 이상을 고른 모든 부분 모임이 곱셈 공식을 만족하면 상호 독립입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "쌍별 독립(pairwise independent): 1 ≤ i < j ≤ n인 모든 쌍에서 p(Ei ∩ Ej) = p(Ei)p(Ej).",
     "상호 독립(mutually independent): 2개 이상을 고른 모든 모임 Ei1, …, Eim에 대해 p(Ei1 ∩ … ∩ Eim) = p(Ei1)···p(Eim).",
     "상호 독립이면 쌍별 독립이지만, 쌍별 독립이라고 상호 독립인 것은 아닙니다."
    ],
    "analogy": "세 친구가 둘씩 짝지어 보면 서로 영향이 없어 보여도, 셋이 모이면 규칙이 생길 수 있습니다. 쌍별 독립은 \"둘씩만\" 검사한 것입니다.",
    "examples": [
     {
      "title": "쌍별 독립이지만 상호 독립이 아닌 예 (공정한 동전 두 번)",
      "code": "A = 첫째 앞면, B = 둘째 앞면, C = 두 결과가 같음\np(A) = p(B) = p(C) = 1/2\np(A∩B) = p(A∩C) = p(B∩C) = 1/4 = (1/2)(1/2)   → 쌍별 독립\np(A∩B∩C) = p(HH) = 1/4  ≠  (1/2)^3 = 1/8      → 상호 독립 아님",
      "lang": "",
      "codeLabel": "풀이",
      "out": "A, B가 정해지면 C도 정해진다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "세 사건이 상호 독립이려면 확인할 식",
      "code": "p(A∩B) = p(A)p(B), p(A∩C) = p(A)p(C), p(B∩C) = p(B)p(C)\np(A∩B∩C) = p(A)p(B)p(C)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "모두 4개 (2개짜리 3개 + 3개짜리 1개)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "모든 두 사건 쌍에 대해 곱셈 공식을 확인합니다(쌍별 독립).",
     "상호 독립을 보려면 세 개, 네 개, … 를 고른 모임도 모두 확인합니다.",
     "하나라도 성립하지 않으면 상호 독립이 아닙니다."
    ],
    "trap": [
     "원문은 쌍의 조건을 \"i ≤ j ≤ n\"으로 적었지만, 같은 사건끼리(i = j)는 비교하지 않으므로 1 ≤ i < j ≤ n이 맞습니다.",
     "쌍별 독립 ⇒ 상호 독립은 거짓입니다(위 동전 예)."
    ],
    "recap": "쌍별 독립 = 모든 쌍만 곱셈 공식. 상호 독립 = 2개 이상 모든 모임이 곱셈 공식. 상호 ⇒ 쌍별, 역은 거짓.",
    "source": "PDF 28쪽"
   },
   "quizzes": [
    [
     "쌍별 독립과 상호 독립의 관계로 옳은 것은?",
     [
      "상호 독립이면 쌍별 독립이지만, 그 역은 성립하지 않는다",
      "쌍별 독립이면 항상 상호 독립이다",
      "두 개념은 항상 같다"
     ],
     "동전 두 번의 A, B, C 예는 쌍별 독립이지만 상호 독립이 아닙니다.",
     [
      "맞습니다.",
      "반례가 있습니다.",
      "세 개 이상에서는 다를 수 있습니다."
     ]
    ],
    [
     "세 사건 A, B, C가 상호 독립인지 확인할 때 필요한 등식의 개수는?",
     [
      "4개",
      "3개",
      "1개"
     ],
     "두 개짜리 3개(AB, AC, BC) + 세 개짜리 1개(ABC).",
     [
      "맞습니다.",
      "쌍별 독립만 확인한 개수입니다.",
      "세 개짜리만으로는 부족합니다."
     ]
    ],
    [
     "동전 두 번 예에서 p(A ∩ B ∩ C)는?",
     [
      "1/4",
      "1/8",
      "1/2"
     ],
     "A ∩ B ∩ C = {HH}이므로 1/4. 상호 독립이라면 1/8이어야 합니다.",
     [
      "맞습니다.",
      "상호 독립일 때의 값으로, 실제 값과 다릅니다.",
      "사건 하나의 확률입니다."
     ]
    ]
   ],
   "review": {
    "original": "pairwise independent if and only if p(Ei∩Ej) = p(Ei) p(Ej) for all pairs i and j with i ≤ j ≤ n.",
    "checked": "같은 사건끼리(i = j)는 p(Ei) = p(Ei)^2가 되어 조건이 성립하지 않으므로, 쌍의 범위는 1 ≤ i < j ≤ n이어야 합니다. 바로 아래 상호 독립 정의도 1 ≤ i1 < i2 < … 처럼 엄격한 부등호를 씁니다.",
    "label": "원문 부등호 오타 의심 · 정의와 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-28.jpg",
   "text": "Pairwise and Mutual Independence\nDefinition: The events E1, E2, …, En are pairwise\nindependent if and only if p(Ei⋂Ej) = p(Ei) p(Ej) for all\npairs i and j with i ≤ j ≤ n.\nThe events are mutually independent if\np ( Ei1  Ei 2  L  Eim ) = p ( Ei1 ) p ( Ei 2 ) L p ( Eim )\nwhenever ij, j = 1,2,…., m, are integers with\n1 ≤ i1 < i2 <∙∙∙ < im ≤ n and m ≥ 2.",
   "quiz": [
    "쌍별 독립과 상호 독립의 관계로 옳은 것은?",
    [
     "상호 독립이면 쌍별 독립이지만, 그 역은 성립하지 않는다",
     "쌍별 독립이면 항상 상호 독립이다",
     "두 개념은 항상 같다"
    ],
    "동전 두 번의 A, B, C 예는 쌍별 독립이지만 상호 독립이 아닙니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "반례가 있습니다.",
    "세 개 이상에서는 다를 수 있습니다."
   ]
  },
  {
   "page": 29,
   "title": "베르누이 시행",
   "explanation": "결과가 두 가지(성공/실패)뿐인 실험을 한 번 하는 것을 베르누이 시행이라고 합니다. 성공 확률 p와 실패 확률 q는 p + q = 1을 만족합니다. 이런 시행을 n번 독립적으로 반복할 때 성공 횟수의 확률이 다음 쪽의 주제입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "베르누이 시행: 결과가 두 가지뿐인 실험 한 번(동전 던지기, 비트 하나 생성 등).",
     "한 결과를 성공(success), 다른 결과를 실패(failure)라고 부릅니다.",
     "성공 확률 p, 실패 확률 q이면 p + q = 1.",
     "관심 문제: n번의 상호 독립인 베르누이 시행에서 성공이 정확히 k번일 확률."
    ],
    "analogy": "\"합격/불합격\"만 있는 시험을 한 번 보는 것이 베르누이 시행입니다. 어느 쪽을 성공이라 부를지는 우리가 정하기 나름입니다.",
    "examples": [
     {
      "title": "베르누이 시행의 예",
      "code": "공정한 동전: 앞면 = 성공, p = 1/2, q = 1/2\n주사위: \"6이 나옴\" = 성공, p = 1/6, q = 5/6\n불량 검사: \"불량\" = 성공, p = 0.02, q = 0.98",
      "lang": "",
      "codeLabel": "풀이",
      "out": "결과를 두 가지로 묶으면 베르누이 시행",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "결과를 두 가지(성공/실패)로 나눕니다.",
     "성공 확률 p를 정합니다.",
     "q = 1 − p로 실패 확률을 구합니다."
    ],
    "trap": [
     "주사위처럼 결과가 6가지여도 \"6인가 아닌가\"로 묶으면 베르누이 시행이 됩니다.",
     "\"성공\"은 좋은 일이라는 뜻이 아니라 관심 있는 결과라는 뜻입니다(예: 불량품 발견).",
     "원문의 James Bernoulli 생몰년 (1854 – 1705)은 오타로 보입니다(1654 – 1705)."
    ],
    "recap": "베르누이 시행 = 결과 두 가지, 성공 p, 실패 q = 1 − p.",
    "source": "PDF 29쪽"
   },
   "quizzes": [
    [
     "주사위를 던져 \"3의 배수가 나옴\"을 성공으로 보는 베르누이 시행에서 q는?",
     [
      "2/3",
      "1/3",
      "1/2"
     ],
     "3의 배수는 {3, 6} → p = 2/6 = 1/3, q = 1 − 1/3 = 2/3.",
     [
      "맞습니다.",
      "성공 확률 p입니다.",
      "균등하게 반반으로 나눈 오답입니다."
     ]
    ],
    [
     "베르누이 시행에 대한 설명으로 옳지 않은 것은?",
     [
      "성공 확률과 실패 확률은 항상 1/2씩이다",
      "결과는 두 가지뿐이다",
      "p + q = 1이다"
     ],
     "편향된 동전처럼 p ≠ 1/2인 베르누이 시행도 있습니다.",
     [
      "맞습니다. 이것이 틀린 설명입니다.",
      "정의입니다.",
      "두 결과 중 하나는 반드시 일어납니다."
     ]
    ]
   ],
   "review": {
    "original": "James Bernoulli (1854 – 1705)",
    "checked": "태어난 해가 죽은 해보다 늦어 모순입니다. 야코프(James) 베르누이의 생몰년은 1654 – 1705입니다. 내용 이해에는 영향이 없습니다.",
    "label": "원문 연도 오타 의심",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-29.jpg",
   "text": "Bernoulli Trials\n1 James Bernoulli\n(1854 – 1705)\nDefinition: Suppose an experiment can have only two possible\noutcomes, e.g., the flipping of a coin or the random generation\nof a bit.\n• Each performance of the experiment is called a Bernoulli trial.\n• One outcome is called a success and the other a failure.\n• If p is the probability of success and q the probability of failure,\nthen p + q = 1.\nMany problems involve determining the probability of k\nsuccesses when an experiment consists of n mutually\nindependent Bernoulli trials.",
   "quiz": [
    "주사위를 던져 \"3의 배수가 나옴\"을 성공으로 보는 베르누이 시행에서 q는?",
    [
     "2/3",
     "1/3",
     "1/2"
    ],
    "3의 배수는 {3, 6} → p = 2/6 = 1/3, q = 1 − 1/3 = 2/3."
   ],
   "quizReasons": [
    "맞습니다.",
    "성공 확률 p입니다.",
    "균등하게 반반으로 나눈 오답입니다."
   ]
  },
  {
   "page": 30,
   "title": "베르누이 시행 예: 편향된 동전 7번 중 앞면 정확히 4번",
   "explanation": "앞면 확률이 2/3인 동전을 7번 던질 때 앞면이 정확히 4번일 확률입니다. 앞면이 나올 자리 4곳을 고르는 방법 C(7,4)와, 그런 결과 하나의 확률 (2/3)^4(1/3)^3을 곱합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "앞면 4번·뒷면 3번인 결과 하나(예: HHHHTTT)의 확률: (2/3)^4·(1/3)^3 (시행이 독립이므로 곱).",
     "앞면 위치 4곳을 고르는 방법: C(7,4) = 35가지. 모두 같은 확률입니다.",
     "p = C(7,4)·(2/3)^4·(1/3)^3 = 35·16/2187 = 560/2187."
    ],
    "analogy": "7칸짜리 줄에 앞면 스티커 4장을 붙이는 방법이 35가지이고, 어떻게 붙이든 그 줄이 나올 확률은 똑같습니다. 그래서 \"가짓수 × 하나의 확률\"입니다.",
    "examples": [
     {
      "title": "계산",
      "code": "C(7,4) = 35\n(2/3)^4 = 16/81,   (1/3)^3 = 1/27\n35 · (16/81) · (1/27) = 35·16 / 3^7 = 560 / 2187",
      "lang": "",
      "codeLabel": "풀이",
      "out": "560/2187 ≈ 0.256",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "결과 하나의 확률이 순서와 무관한 이유",
      "code": "HHHHTTT: (2/3)(2/3)(2/3)(2/3)(1/3)(1/3)(1/3)\nTHTHHTH: (1/3)(2/3)(1/3)(2/3)(2/3)(1/3)(2/3)\n곱하는 수의 순서만 다르고 값은 같다",
      "lang": "",
      "codeLabel": "풀이",
      "out": "(2/3)^4 (1/3)^3",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "성공(앞면) 확률 p = 2/3, 실패 q = 1/3, 시행 n = 7, 성공 k = 4.",
     "성공 위치 고르기: C(7,4) = 35.",
     "결과 하나의 확률: p^4·q^3.",
     "곱해서 35·16/2187 = 560/2187."
    ],
    "trap": [
     "원문의 \"2^7 = 128 possible outcomes\"는 결과의 개수일 뿐이고, 결과들의 확률이 같지 않으므로 128로 나누면 안 됩니다.",
     "C(7,4)를 빠뜨리고 (2/3)^4(1/3)^3만 쓰면 \"특정 순서 하나\"의 확률이 됩니다."
    ],
    "recap": "정확히 k번 성공 = C(n,k)·p^k·q^(n−k). 예: C(7,4)(2/3)^4(1/3)^3 = 560/2187.",
    "source": "PDF 30쪽"
   },
   "quizzes": [
    [
     "앞면 확률 2/3인 동전을 7번 던져 앞면이 정확히 4번 나올 확률은?",
     [
      "560/2187",
      "16/2187",
      "35/128"
     ],
     "C(7,4)(2/3)^4(1/3)^3 = 35·16/2187.",
     [
      "맞습니다.",
      "C(7,4)를 곱하지 않은 값입니다.",
      "모든 결과가 똑같이 일어날 법하다고 본 오답입니다."
     ]
    ],
    [
     "공정한 동전을 4번 던져 앞면이 정확히 2번 나올 확률은?",
     [
      "3/8",
      "1/16",
      "1/2"
     ],
     "C(4,2)(1/2)^2(1/2)^2 = 6/16 = 3/8.",
     [
      "맞습니다.",
      "특정 순서 하나의 확률입니다.",
      "2/4로 착각한 값입니다."
     ]
    ],
    [
     "n번 시행에서 성공이 정확히 k번인 결과(성공·실패 나열)의 개수는?",
     [
      "C(n,k)",
      "n^k",
      "k!"
     ],
     "성공이 들어갈 자리 k개를 n자리 중에서 고릅니다.",
     [
      "맞습니다.",
      "중복순열의 수입니다.",
      "성공끼리 줄 세우는 수입니다."
     ]
    ]
   ],
   "image": "pages/dm07-30.jpg",
   "text": "Bernoulli Trials\n2\nExample: A coin is biased so that the probability of heads is 2/3.\nWhat is the probability that exactly four heads occur when the\ncoin is flipped seven times?\nSolution: There are 27 = 128 possible outcomes. The number of\nways four of the seven flips can be heads is C(7,4). The\nprobability of each of the outcomes is (2/3)4(1/3)3 since the\nseven flips are independent. Hence, the probability that exactly\nfour heads occur is\nC(7,4) (2/3)4(1/3)3 = (35∙ 16)/ 27 = 560/ 2187.",
   "quiz": [
    "앞면 확률 2/3인 동전을 7번 던져 앞면이 정확히 4번 나올 확률은?",
    [
     "560/2187",
     "16/2187",
     "35/128"
    ],
    "C(7,4)(2/3)^4(1/3)^3 = 35·16/2187."
   ],
   "quizReasons": [
    "맞습니다.",
    "C(7,4)를 곱하지 않은 값입니다.",
    "모든 결과가 똑같이 일어날 법하다고 본 오답입니다."
   ]
  },
  {
   "page": 31,
   "title": "이항분포: n번 중 정확히 k번 성공할 확률",
   "explanation": "30쪽의 계산을 일반화한 정리입니다. 성공 확률 p인 독립 베르누이 시행 n번에서 정확히 k번 성공할 확률은 C(n,k)p^k q^(n−k)이고, k의 함수로 본 이 값 b(k:n,p)를 이항분포라고 합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정리 2: p(정확히 k번 성공) = C(n,k)·p^k·q^(n−k), q = 1 − p.",
     "증명: 결과는 S/F로 이루어진 n-튜플. k번 성공, n−k번 실패인 튜플 하나의 확률은 p^k q^(n−k)이고, 그런 튜플은 C(n,k)개.",
     "표기: b(k:n,p) = C(n,k)p^k q^(n−k). k = 0, 1, …, n에 대한 이 값들의 모임이 이항분포.",
     "이항정리로 확인: Σ(k=0..n) C(n,k)p^k q^(n−k) = (p + q)^n = 1."
    ],
    "analogy": "이름이 \"이항\"인 이유는 (p + q)^n을 이항정리로 펼친 각 항이 바로 b(k:n,p)이기 때문입니다.",
    "examples": [
     {
      "title": "n = 3, p = 1/2인 이항분포 전체",
      "code": "b(0:3,1/2) = C(3,0)(1/2)^3 = 1/8\nb(1:3,1/2) = C(3,1)(1/2)^3 = 3/8\nb(2:3,1/2) = C(3,2)(1/2)^3 = 3/8\nb(3:3,1/2) = C(3,3)(1/2)^3 = 1/8\n합 = 8/8 = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "(1/2 + 1/2)^3 = 1과 일치",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "불량률 0.1, 제품 5개 중 불량 정확히 1개",
      "code": "b(1:5,0.1) = C(5,1)(0.1)^1(0.9)^4 = 5 · 0.1 · 0.6561",
      "lang": "",
      "codeLabel": "풀이",
      "out": "0.32805",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "n, k, p를 정하고 q = 1 − p를 구합니다.",
     "C(n,k)를 식으로 적습니다.",
     "p^k와 q^(n−k)를 곱합니다(지수의 합이 n인지 확인).",
     "세 값을 곱합니다."
    ],
    "trap": [
     "원문 증명의 \"k successes and k − 1 failures\"는 오타입니다. 실패 횟수는 n − k입니다(식 p^k q^(n−k)와 일치).",
     "q의 지수는 n − k입니다. p와 q의 지수를 더하면 항상 n이어야 합니다."
    ],
    "recap": "b(k:n,p) = C(n,k)p^k q^(n−k). 지수 합 = n, 전체 합 = (p+q)^n = 1.",
    "source": "PDF 31쪽"
   },
   "quizzes": [
    [
     "독립 베르누이 시행 n번에서 정확히 k번 성공할 확률은?",
     [
      "C(n,k)p^k q^(n−k)",
      "p^k q^(n−k)",
      "C(n,k)p^k q^(k−1)"
     ],
     "원문 정리 2입니다.",
     [
      "맞습니다.",
      "특정 순서 하나의 확률입니다.",
      "원문 증명의 오타(k − 1)를 그대로 쓴 식입니다."
     ]
    ],
    [
     "b(2:5,1/3)의 값은?",
     [
      "C(5,2)(1/3)^2(2/3)^3",
      "C(5,2)(1/3)^3(2/3)^2",
      "(1/3)^2(2/3)^3"
     ],
     "n = 5, k = 2, p = 1/3, q = 2/3 → C(5,2)p^2 q^3 = 10·(1/9)·(8/27) = 80/243.",
     [
      "맞습니다.",
      "p와 q의 지수가 바뀌었습니다.",
      "C(5,2)가 빠졌습니다."
     ]
    ],
    [
     "k = 0부터 n까지 b(k:n,p)를 모두 더한 값은?",
     [
      "1",
      "n",
      "np"
     ],
     "이항정리로 (p + q)^n = 1^n = 1.",
     [
      "맞습니다.",
      "시행 횟수입니다.",
      "성공 횟수의 기댓값(7.4절)입니다."
     ]
    ]
   ],
   "review": {
    "original": "The probability of each outcome of n trials consisting of k successes and k − 1 failures (in any order) is p^k q^(n−k).",
    "checked": "n번 시행 중 k번이 성공이면 실패는 n − k번입니다. 바로 뒤의 식 p^k q^(n−k)도 실패 n − k번을 뜻합니다. \"k − 1 failures\"는 \"n − k failures\"의 오타로 보입니다.",
    "label": "원문 오타 의심 · 식과 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-31.jpg",
   "text": "Probability of k Successes in n\nIndependent Bernoulli Trials.\nTheorem 2: The probability of exactly k successes in n independent\nBernoulli trials, with probability of success p and probability of failure q\n= 1 − p, is\nC(n,k)pkqn−k.\nProof: The outcome of n Bernoulli trials is an n-tuple (t1,t2,…,tn), where\neach is ti either S (success) or F (failure). The probability of each\noutcome of n trials consisting of k successes and k − 1 failures (in any\norder) is pkqn−k. Because there are C(n,k) n-tuples of Ss and Fs that\ncontain exactly k Ss, the probability of k successes is C(n,k)pkqn−k.\nWe denote by b(k:n,p) the probability of k successes in n independent\nBernoulli trials with p the probability of success. Viewed as a function\nof k, b(k:n,p) is the binomial distribution. By Theorem 2,\nb(k:n,p) = C(n,k)pkqn−k.",
   "quiz": [
    "독립 베르누이 시행 n번에서 정확히 k번 성공할 확률은?",
    [
     "C(n,k)p^k q^(n−k)",
     "p^k q^(n−k)",
     "C(n,k)p^k q^(k−1)"
    ],
    "원문 정리 2입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "특정 순서 하나의 확률입니다.",
    "원문 증명의 오타(k − 1)를 그대로 쓴 식입니다."
   ]
  },
  {
   "page": 32,
   "title": "확률변수",
   "explanation": "확률변수는 이름과 달리 \"변수\"도 아니고 \"무작위\"도 아닙니다. 표본공간의 각 결과에 실수 하나를 대응시키는 함수입니다. 예를 들어 동전 세 번의 결과 HTH에 앞면 개수 2를 대응시키는 함수가 확률변수입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의: 확률변수(random variable)는 표본공간 S에서 실수 집합으로 가는 함수 X: S → ℝ.",
     "결과 하나하나에 실수 값 하나를 배정합니다.",
     "원문 강조: A random variable is a function. It is not a variable, and it is not random!",
     "이름 일화: Feller와 Doob이 동전을 던져 \"random variable\"과 \"chance variable\" 중 정했고, 결과는 \"random variable\"."
    ],
    "analogy": "확률변수는 채점기와 같습니다. 시험지(결과)가 들어오면 점수(실수)를 돌려줍니다. 무작위인 것은 어떤 시험지가 들어오느냐이고, 채점 규칙 자체는 정해져 있습니다.",
    "examples": [
     {
      "title": "동전 두 번에서 정의할 수 있는 확률변수들",
      "code": "결과 s:      HH   HT   TH   TT\nX(s)=앞면 수: 2    1    1    0\nY(s)=첫 결과가 H면 1, 아니면 0: 1  1  0  0\nZ(s)=앞면 수 × 100원:  200  100  100  0",
      "lang": "",
      "codeLabel": "풀이",
      "out": "같은 표본공간에 여러 확률변수를 정의할 수 있다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "표본공간의 결과들을 나열합니다.",
     "각 결과에 대응시킬 실수를 규칙대로 적습니다.",
     "이 대응 표 전체가 하나의 확률변수(함수)입니다."
    ],
    "trap": [
     "확률변수의 값은 결과에 따라 정해지는 실수이고, 확률은 아닙니다. X(HT) = 1은 \"앞면 수가 1\"이라는 뜻이지 확률 1이 아닙니다.",
     "사건(결과의 집합)과 확률변수(결과 → 실수 함수)를 혼동하지 마세요."
    ],
    "recap": "확률변수 = 결과마다 실수를 배정하는 함수. 변수도 아니고 무작위도 아니다.",
    "source": "PDF 32쪽"
   },
   "quizzes": [
    [
     "확률변수의 정의로 옳은 것은?",
     [
      "표본공간에서 실수 집합으로 가는 함수",
      "확률 값을 저장하는 변수",
      "표본공간의 부분집합"
     ],
     "원문: a function from the sample space of an experiment to the set of real numbers.",
     [
      "맞습니다.",
      "확률변수의 값은 확률이 아닙니다.",
      "그것은 사건입니다."
     ]
    ],
    [
     "동전 세 번에서 X = 앞면 개수일 때 X(THT)는?",
     [
      "1",
      "2",
      "1/8"
     ],
     "THT에는 앞면이 1개입니다.",
     [
      "맞습니다.",
      "뒷면 개수입니다.",
      "결과 THT의 확률이고, 확률변수의 값이 아닙니다."
     ]
    ]
   ],
   "image": "pages/dm07-32.jpg",
   "text": "Random Variables\n1\nDefinition: A random variable is a function from the sample\nspace of an experiment to the set of real numbers. That is, a\nrandom variable assigns a real number to each possible\noutcome.\nA random variable is a function. It is not a variable, and it is\nnot random!\nIn the late 1940s W. Feller and J.L. Doob flipped a coin to see\nwhether both would use “random variable” or the more\nfitting “chance variable.” Unfortunately, Feller won and the\nterm “random variable” has been used ever since.",
   "quiz": [
    "확률변수의 정의로 옳은 것은?",
    [
     "표본공간에서 실수 집합으로 가는 함수",
     "확률 값을 저장하는 변수",
     "표본공간의 부분집합"
    ],
    "원문: a function from the sample space of an experiment to the set of real numbers."
   ],
   "quizReasons": [
    "맞습니다.",
    "확률변수의 값은 확률이 아닙니다.",
    "그것은 사건입니다."
   ]
  },
  {
   "page": 33,
   "title": "확률변수의 분포",
   "explanation": "확률변수 X의 분포는 X가 가질 수 있는 각 값 r과 그 값을 가질 확률 p(X = r)의 쌍들입니다. 동전 세 번의 앞면 개수 X는 0, 1, 2, 3을 각각 1/8, 3/8, 3/8, 1/8의 확률로 가집니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "분포: 모든 r ∈ X(S)에 대한 쌍 (r, p(X = r))의 집합.",
     "p(X = r) = X(s) = r인 결과 s들의 확률의 합.",
     "동전 세 번, X = 앞면 수: X(HHH) = 3, X(TTT) = 0, HHT·HTH·THH → 2, TTH·THT·HTT → 1.",
     "결과 8개가 각각 1/8 → p(X=3) = 1/8, p(X=2) = 3/8, p(X=1) = 3/8, p(X=0) = 1/8."
    ],
    "analogy": "반 학생들의 점수표(확률변수)에서 \"몇 점이 몇 명\"인지 정리한 도수분포표가 분포입니다. 결과별 표를 값별 표로 묶은 것입니다.",
    "examples": [
     {
      "title": "결과별 표 → 값별 표",
      "code": "결과: HHH HHT HTH THH HTT THT TTH TTT\nX:     3   2   2   2   1   1   1   0\n\n값 r:       0    1    2    3\np(X = r):  1/8  3/8  3/8  1/8   (합 1)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "이항분포 b(k:3,1/2)와 같다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "사건으로 바꿔 읽기",
      "code": "\"X = 2\"는 사건 {HHT, HTH, THH}를 줄여 쓴 것\np(X ≥ 2) = 3/8 + 1/8",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1/2",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "결과마다 X 값을 적습니다.",
     "같은 값을 갖는 결과끼리 묶습니다.",
     "묶음마다 결과 확률을 더해 p(X = r)를 구합니다.",
     "모든 p(X = r)의 합이 1인지 확인합니다."
    ],
    "trap": [
     "p(X = r)은 값 r의 확률이고, X(s)는 결과 s에서의 값입니다. 둘을 혼동하지 마세요.",
     "X = 1인 결과는 TTH, THT, HTT 세 개입니다(원문 순서와 무관)."
    ],
    "recap": "분포 = (값, 그 값의 확률) 쌍들. 동전 세 번 앞면 수: 1/8, 3/8, 3/8, 1/8.",
    "source": "PDF 33쪽"
   },
   "quizzes": [
    [
     "동전 세 번에서 X = 앞면 개수일 때 p(X = 2)는?",
     [
      "3/8",
      "1/8",
      "2/8"
     ],
     "HHT, HTH, THH 세 결과입니다.",
     [
      "맞습니다.",
      "X = 3 또는 X = 0의 확률입니다.",
      "결과를 2개로 잘못 셌습니다."
     ]
    ],
    [
     "같은 X에서 p(X ≥ 1)은?",
     [
      "7/8",
      "3/8",
      "1/8"
     ],
     "1 − p(X = 0) = 1 − 1/8.",
     [
      "맞습니다.",
      "X = 1 또는 X = 2 하나의 확률입니다.",
      "X = 0의 확률입니다."
     ]
    ],
    [
     "확률변수 X의 분포에서 p(X = r)들을 모두 더하면?",
     [
      "1",
      "X가 가질 수 있는 값의 개수",
      "0"
     ],
     "모든 결과가 정확히 하나의 값에 묶이므로 합은 1입니다.",
     [
      "맞습니다.",
      "값의 개수와는 무관합니다.",
      "확률의 합은 1입니다."
     ]
    ]
   ],
   "image": "pages/dm07-33.jpg",
   "text": "Random Variables\n2\nDefinition: The distribution of a random variable X on a sample space S\nis the set of pairs (r, p(X = r)) for all r ∊ X(S), where\np(X = r) is the probability that X takes the value r.\nExample: Suppose that a coin is flipped three times. Let X(t) be the\nrandom variable that equals the number of heads that appear when t\nis the outcome. Then X(t) takes on the following values:\nX ( HHH ) = 3, X (TTT ) = 0\nX ( HHT ) = X ( HTH ) = X (THH ) = 2,\nX (TTH ) = X (THT ) = X ( HTT ) = 1.\nEach of the eight possible outcomes has probability 1/8. So, the\ndistribution of X(t) is p(X = 3) = 1/8, p(X = 2) = 3/8,\np(X = 1) = 3/8, and p(X = 0) = 1/8.",
   "quiz": [
    "동전 세 번에서 X = 앞면 개수일 때 p(X = 2)는?",
    [
     "3/8",
     "1/8",
     "2/8"
    ],
    "HHT, HTH, THH 세 결과입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "X = 3 또는 X = 0의 확률입니다.",
    "결과를 2개로 잘못 셌습니다."
   ]
  },
  {
   "page": 34,
   "title": "생일 문제",
   "explanation": "n명 중 적어도 두 명의 생일이 같을 확률이 1/2을 넘으려면 몇 명이 필요할까요? 원문은 1년을 366일로 가정해 \"모두 생일이 다를 확률\" pn을 구한 뒤 1에서 뺍니다. 답은 놀랍게도 23명입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "가정: 생일은 366일 중 똑같이 일어날 법하다(원문 가정).",
     "pn = n명의 생일이 모두 다를 확률. 사람이 한 명씩 들어온다고 보고 차례로 곱합니다.",
     "j번째 사람이 앞의 j − 1명과 다를 확률: (366 − (j − 1))/366 = (367 − j)/366.",
     "pn = (365/366)(364/366)···((367 − n)/366), 구하는 확률은 1 − pn.",
     "n = 22: 1 − pn ≈ 0.475, n = 23: 1 − pn ≈ 0.506 → 최소 23명."
    ],
    "analogy": "반 친구 23명이면 생일이 겹치는 \"쌍\"의 수는 C(23,2) = 253쌍이나 됩니다. 사람 수보다 쌍의 수가 훨씬 빨리 늘어서 생각보다 일찍 겹칩니다.",
    "examples": [
     {
      "title": "곱을 차례로 쌓기",
      "code": "p2 = 365/366\np3 = (365/366)(364/366)\n…\np23 = (365/366)(364/366)···(344/366)\n1 − p22 ≈ 0.475,  1 − p23 ≈ 0.506",
      "lang": "",
      "codeLabel": "풀이",
      "out": "23명부터 1/2을 넘는다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "여사건을 쓰는 이유",
      "code": "\"적어도 두 명이 같다\" = 한 쌍, 두 쌍, 세 명이 같음 … 경우가 너무 많음\n여사건 \"모두 다르다\"는 곱 하나로 끝남",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1 − p(모두 다름)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "구하려는 사건(적어도 두 명이 같음)의 여사건(모두 다름)을 씁니다.",
     "사람을 한 명씩 추가하며 앞사람들과 다를 확률을 곱합니다: 365/366, 364/366, ….",
     "n번째 항이 (367 − n)/366인지 확인합니다.",
     "1 − pn이 1/2을 넘는 최소 n을 찾습니다(23)."
    ],
    "trap": [
     "원문 슬라이드는 1년을 366일로 놓았습니다. 365일로 계산하는 교재·문제도 많으니 문제의 가정을 먼저 확인하세요(23이라는 답은 둘 다 같음).",
     "원문의 \"pn that at least two of n people have different birthdays\"는 \"all n people have different birthdays\"의 오타로 보입니다.",
     "원문의 n = 22 값 0.457은 직접 계산하면 약 0.475입니다(366일 기준)."
    ],
    "recap": "생일 문제: 1 − (365/366)(364/366)···((367 − n)/366). 23명에서 처음으로 1/2을 넘는다.",
    "source": "PDF 34쪽"
   },
   "quizzes": [
    [
     "원문 가정(366일)에서 3명의 생일이 모두 다를 확률 p3은?",
     [
      "(365/366)(364/366)",
      "(365/366)^2",
      "1 − 1/366"
     ],
     "둘째 사람 365/366, 셋째 사람 364/366을 곱합니다.",
     [
      "맞습니다.",
      "셋째 사람도 365일 중에서 고른다고 본 오답입니다.",
      "두 사람만 비교한 값입니다."
     ]
    ],
    [
     "적어도 두 명의 생일이 같을 확률이 1/2을 넘는 최소 인원은?",
     [
      "23명",
      "183명",
      "366명"
     ],
     "1 − p23 ≈ 0.506 > 1/2.",
     [
      "맞습니다.",
      "366의 절반이라는 직관은 틀립니다.",
      "366명이면 확률이 거의 1이지만 최소 인원은 아닙니다."
     ]
    ],
    [
     "n명 중 적어도 두 명의 생일이 같을 확률을 구할 때 원문이 쓴 방법은?",
     [
      "모두 다를 확률을 구해 1에서 뺀다",
      "같은 생일 쌍의 수를 모두 더한다",
      "n/366을 계산한다"
     ],
     "여사건 pn(모두 다름)을 곱으로 구한 뒤 1 − pn.",
     [
      "맞습니다.",
      "경우가 겹쳐 복잡합니다.",
      "근거 없는 식입니다."
     ]
    ]
   ],
   "review": {
    "original": "First, we find the probability pn that at least two of n people have different birthdays. … for n = 22, 1 − pn ≈ 0.457",
    "checked": "① pn은 이어지는 식 (365/366)(364/366)···과 \"1 − pn = 적어도 두 명이 같을 확률\"로 보아 \"n명 모두 생일이 다를 확률\"이어야 합니다. ② 366일 가정으로 직접 계산하면 1 − p22 ≈ 0.4748, 1 − p23 ≈ 0.5063입니다(365일이면 0.4757, 0.5073). n = 22 값 0.457은 0.475의 자리 바뀜으로 보입니다. 결론(23명)은 맞습니다.",
    "label": "원문 오타 의심 · 직접 계산",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-34.jpg",
   "text": "The Famous Birthday Problem\nThe puzzle of finding the number of people needed in a room to ensure that the probability of at\nleast two of them having the same birthday is more than ½ has a surprising answer, which we now\nfind.\nSolution: We assume that all birthdays are equally likely and that there are 366 days in the year.\nFirst, we find the probability pn that at least two of n people have different birthdays.\nNow, imagine the people entering the room one by one. The probability that at least two have the\nsame birthday is 1− pn .\n•\nThe probability that the birthday of the second person is different from that of the first is 365/366.\n•\nThe probability that the birthday of the third person is different from the other two, when these have two\ndifferent birthdays, is 364/366.\n•\nIn general, the probability that the jth person has a birthday different from the birthdays of those already\nin the room, assuming that these people all have different birthdays,\nis (366 − (j − 1))/366 = (367 − j)/366.\n•\nHence, pn = (365/366)(364/366)∙∙∙ (367 − n)/366.\n•\nTherefore , 1− pn = 1−(365/366)(364/366)∙∙∙ (367 − n)/366.\nChecking various values for n with computation help tells us that for n = 22, 1− pn ≈ 0.457, and for\nn = 23, 1− pn ≈ 0.506. Consequently, a minimum number of 23 people are needed so that that the\nprobability that at least two of them have the same birthday is greater than 1/2.",
   "quiz": [
    "원문 가정(366일)에서 3명의 생일이 모두 다를 확률 p3은?",
    [
     "(365/366)(364/366)",
     "(365/366)^2",
     "1 − 1/366"
    ],
    "둘째 사람 365/366, 셋째 사람 364/366을 곱합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "셋째 사람도 365일 중에서 고른다고 본 오답입니다.",
    "두 사람만 비교한 값입니다."
   ]
  },
  {
   "page": 35,
   "title": "몬테카를로 알고리즘",
   "explanation": "한 단계 이상에서 무작위 선택을 하는 알고리즘을 확률적 알고리즘이라고 합니다. 그중 몬테카를로 알고리즘은 참/거짓을 답하는 결정 문제를 위한 것으로, 검사를 반복하다가 \"참\"이 나오면 바로 참이라고 답하고, 끝까지 \"모름\"만 나오면 거짓이라고 답합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "확률적 알고리즘(probabilistic algorithm): 하나 이상의 단계에서 무작위 선택을 함.",
     "몬테카를로 알고리즘: 결정 문제(답이 참 또는 거짓)에 쓰는 확률적 알고리즘.",
     "각 검사는 \"참\" 또는 \"모름(unknown)\"으로 응답합니다.",
     "\"참\"이 나오면 즉시 참으로 종료. 정해진 횟수의 검사가 모두 \"모름\"이면 \"거짓\"을 출력.",
     "검사를 충분히 많이 하면 \"거짓\"이라는 답이 틀릴 확률이 매우 작아집니다."
    ],
    "analogy": "방에 고양이가 있는지 확인하려고 손전등을 무작위 방향으로 비춘다고 해 봅시다. 고양이가 보이면 \"있다\"는 확실합니다. 열 번 비춰도 안 보이면 \"없다\"고 답하지만, 틀렸을 가능성이 조금 남습니다.",
    "examples": [
     {
      "title": "오류가 생기는 쪽은 한쪽뿐",
      "code": "출력 \"참\"  → 검사에서 증거를 실제로 찾은 경우 → 항상 맞음\n출력 \"거짓\" → 증거를 못 찾은 경우 → 실제로는 참일 수도 있음\n한 번의 검사가 놓칠 확률이 1/2 이하라면 10번 모두 놓칠 확률 ≤ (1/2)^10 ≈ 0.001",
      "lang": "",
      "codeLabel": "풀이",
      "out": "검사를 늘릴수록 거짓 답의 오류 확률이 줄어든다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "검사 하나가 \"참(확실한 증거)\" 또는 \"모름\"을 내도록 설계합니다.",
     "검사를 k번 반복합니다(매번 무작위 선택).",
     "한 번이라도 \"참\"이면 참, 모두 \"모름\"이면 거짓을 출력합니다.",
     "한 번 놓칠 확률이 q 이하면 오류 확률은 q^k 이하입니다(독립 반복)."
    ],
    "trap": [
     "몬테카를로 알고리즘의 \"참\" 답은 틀리지 않고, 틀릴 수 있는 것은 \"거짓\" 답입니다(이 슬라이드의 설정).",
     "\"모름\"은 거짓이라는 뜻이 아니라 이번 검사로는 판단할 수 없다는 뜻입니다."
    ],
    "recap": "몬테카를로: 검사 반복, \"참\"이 나오면 참, 끝까지 \"모름\"이면 거짓. 거짓 답의 오류 확률은 반복할수록 작아진다.",
    "source": "PDF 35쪽"
   },
   "quizzes": [
    [
     "원문의 몬테카를로 알고리즘에서 \"거짓\"을 출력하는 경우는?",
     [
      "정해진 횟수의 검사가 모두 \"모름\"일 때",
      "첫 검사가 \"모름\"일 때",
      "검사 중 한 번이라도 \"참\"일 때"
     ],
     "After running a specified sequence of tests where every step yields \"unknown\", the algorithm outputs \"false\".",
     [
      "맞습니다.",
      "한 번의 \"모름\"으로는 멈추지 않습니다.",
      "그때는 \"참\"으로 종료합니다."
     ]
    ],
    [
     "이 알고리즘에서 틀릴 수 있는 출력은?",
     [
      "거짓",
      "참",
      "둘 다 틀릴 수 없다"
     ],
     "\"참\"은 실제 증거를 찾았을 때만 나오므로 틀리지 않습니다.",
     [
      "맞습니다.",
      "\"참\"은 증거가 있을 때만 출력됩니다.",
      "\"거짓\" 답은 증거를 놓친 것일 수 있습니다."
     ]
    ],
    [
     "한 번의 검사가 증거를 놓칠 확률이 1/2이고 검사를 독립적으로 5번 할 때, 참인 입력에 \"거짓\"이라고 답할 확률은?",
     [
      "1/32",
      "5/2",
      "1/10"
     ],
     "5번 모두 놓칠 확률 (1/2)^5 = 1/32.",
     [
      "맞습니다.",
      "확률은 1을 넘을 수 없습니다.",
      "근거 없는 값입니다."
     ]
    ]
   ],
   "image": "pages/dm07-35.jpg",
   "text": "Monte Carlo Algorithms\nAlgorithms that make random choices at one or more steps are\ncalled probabilistic algorithms.\nMonte Carlo algorithms are probabilistic algorithms used to\nanswer decision problems, which are problems that either have\n“true” or “false” as their answer.\n• A Monte Carlo algorithm consists of a sequence of tests. For each test the\nalgorithm responds “true” or ‘unknown.’\n• If the response is “true,” the algorithm terminates with the answer is\n“true.”\n• After running a specified sequence of tests where every step yields\n“unknown”, the algorithm outputs “false.”\n• The idea is that the probability of the algorithm incorrectly outputting\n“false” should be very small as long as a sufficient number of tests are\nperformed.",
   "quiz": [
    "원문의 몬테카를로 알고리즘에서 \"거짓\"을 출력하는 경우는?",
    [
     "정해진 횟수의 검사가 모두 \"모름\"일 때",
     "첫 검사가 \"모름\"일 때",
     "검사 중 한 번이라도 \"참\"일 때"
    ],
    "After running a specified sequence of tests where every step yields \"unknown\", the algorithm outputs \"false\"."
   ],
   "quizReasons": [
    "맞습니다.",
    "한 번의 \"모름\"으로는 멈추지 않습니다.",
    "그때는 \"참\"으로 종료합니다."
   ]
  },
  {
   "page": 36,
   "title": "확률적 소수 판정",
   "explanation": "RSA 암호의 큰 소수를 찾을 때 쓰는 확률적 소수 판정은 몬테카를로 알고리즘의 예입니다. 무작위 밑 b로 밀러 검사를 했을 때 n이 실패하면 n은 확실히 합성수(\"참\")이고, 통과하면 소수인지 합성수인지 \"모름\"입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "밀러 검사(Miller's test): 1 < b < n인 무작위 정수 b를 밑으로 n을 검사.",
     "n이 검사에 실패 → n은 합성수(확실). 몬테카를로의 \"참\"(합성수다) 응답.",
     "n이 통과 → 소수일 수도, 합성수일 수도 있음. \"모름\" 응답.",
     "합성수가 무작위 b에 대해 밀러 검사를 통과할 확률은 1/4 미만.",
     "k번 독립 반복을 모두 통과한 합성수일 확률 < (1/4)^k. k = 10이면 100만분의 1 미만."
    ],
    "analogy": "위조지폐 감별기를 무작위로 고른 각도에서 10번 비췄는데 한 번도 걸리지 않았다면, 위조지폐일 가능성은 아주 작습니다. 한 번이라도 걸리면 위조는 확실합니다.",
    "examples": [
     {
      "title": "반복 횟수와 오류 확률",
      "code": "k = 1:  < 1/4\nk = 5:  < (1/4)^5 = 1/1024\nk = 10: < (1/4)^10 = 1/1,048,576  < 1/1,000,000",
      "lang": "",
      "codeLabel": "풀이",
      "out": "10번이면 100만분의 1 미만",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "결정 문제로 보기",
      "code": "질문: \"n은 합성수인가?\"\n검사 실패 → \"참\"(합성수) → 확실\n10번 모두 통과 → \"거짓\"(소수로 판정) → 아주 작은 확률로 틀림",
      "lang": "",
      "codeLabel": "풀이",
      "out": "소수 판정의 오류는 \"합성수를 소수라고 하는\" 쪽에서만 생긴다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "무작위 밑 b(1 < b < n)를 고릅니다.",
     "밀러 검사를 합니다. 실패하면 합성수로 확정하고 종료.",
     "통과하면 새 b로 반복합니다.",
     "k번 모두 통과하면 소수로 판정합니다(틀릴 확률 < (1/4)^k)."
    ],
    "trap": [
     "검사를 통과했다고 소수가 확실한 것은 아닙니다. 확실한 것은 \"실패하면 합성수\"뿐입니다.",
     "원문 문장 \"The probability that a composite integer passes n Miller's test is for a random b, is less that ¼\"은 문법이 어긋나 있습니다. 뜻은 \"합성수 n이 무작위 b에 대해 밀러 검사를 통과할 확률은 1/4 미만\"입니다."
    ],
    "recap": "밀러 검사: 실패 → 합성수 확정, 통과 → 모름. k번 통과한 합성수일 확률 < (1/4)^k.",
    "source": "PDF 36쪽"
   },
   "quizzes": [
    [
     "밀러 검사에서 n이 검사에 실패하면?",
     [
      "n은 합성수로 확정된다",
      "n은 소수로 확정된다",
      "아무것도 알 수 없다"
     ],
     "원문: An integer n greater than 1 can be shown to be composite if it fails a particular test.",
     [
      "맞습니다.",
      "소수는 검사에 실패하지 않습니다.",
      "실패는 합성수의 확실한 증거입니다."
     ]
    ],
    [
     "합성수 n이 무작위 밑으로 하는 밀러 검사를 5번 연속 통과할 확률의 상한은?",
     [
      "(1/4)^5",
      "5/4",
      "(3/4)^5"
     ],
     "한 번 통과할 확률이 1/4 미만이고 독립 반복이므로 (1/4)^5 미만입니다.",
     [
      "맞습니다.",
      "확률은 1을 넘을 수 없습니다.",
      "1 − 1/4를 거듭제곱한 잘못된 값입니다."
     ]
    ],
    [
     "밀러 검사를 이용한 소수 판정에서 틀릴 수 있는 판정은?",
     [
      "합성수를 소수로 판정하는 것",
      "소수를 합성수로 판정하는 것",
      "두 경우 모두 자주 틀린다"
     ],
     "합성수 판정은 확실한 증거(검사 실패)가 있을 때만 하므로 틀리지 않습니다.",
     [
      "맞습니다.",
      "소수는 검사에 실패하지 않습니다.",
      "틀리는 쪽은 한쪽뿐이고 확률도 매우 작습니다."
     ]
    ]
   ],
   "review": {
    "original": "The probability that a composite integer passes n Miller's test is for a random b, is less that ¼.",
    "checked": "문장이 어긋나 있습니다. 의미는 \"합성수 n이 무작위 밑 b에 대한 밀러 검사를 통과할 확률은 1/4 미만이다(less than ¼)\"입니다. 이어지는 (1/4)^k 계산과 일치합니다.",
    "label": "원문 문장 오류 · 문맥으로 보충",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-36.jpg",
   "text": "Probabilistic Primality Testing\nProbabilistic primality testing (see Example 16 in text) is an example of a\nMonte Carlo algorithm, which is used to find large primes to generate the\nencryption keys for RSA cryptography (as discussed in Chapter 4).\n•\nAn integer n greater than 1 can be shown to be composite (i.e., not prime) if it fails\na particular test (Miller’s test), using a random integer b with 1 < b < n as the\nbase. But if n passes Miller’s test for a particular base b, it may either be prime or\ncomposite. The probability that a composite integer passes n Miller’s test is for a\nrandom b, is less that ¼.\n•\nSo failing the test, is the “true” response in a Monte Carlo algorithm, and passing\nthe test is “unknown.”\n•\nIf the test is performed k times (choosing a random integer b each time) and the\nnumber n passes Miller’s test at every iteration, then the probability that it is\ncomposite is less than (1/4)k. So for a sufficiently, large k, the probability that n is\ncomposite even though it has passed all k iterations of Miller’s test is small. For\nexample, with 10 iterations, the probability that n is composite is less than 1 in\n1,000,000.",
   "quiz": [
    "밀러 검사에서 n이 검사에 실패하면?",
    [
     "n은 합성수로 확정된다",
     "n은 소수로 확정된다",
     "아무것도 알 수 없다"
    ],
    "원문: An integer n greater than 1 can be shown to be composite if it fails a particular test."
   ],
   "quizReasons": [
    "맞습니다.",
    "소수는 검사에 실패하지 않습니다.",
    "실패는 합성수의 확실한 증거입니다."
   ]
  },
  {
   "page": 37,
   "title": "7.3 베이즈 정리 · 표지",
   "explanation": "7.3절 베이즈 정리(Bayes' Theorem)가 시작되는 표지입니다.",
   "kind": "structure",
   "role": "절 표지",
   "image": "pages/dm07-37.jpg",
   "text": "Bayes’ Theorem\nSection 7.3",
   "quiz": null
  },
  {
   "page": 38,
   "title": "7.3절 학습 목록",
   "explanation": "베이즈 정리 → 일반화된 베이즈 정리 → 베이지안 스팸 필터 순서입니다. AI 응용은 슬라이드에 포함되지 않았다고 적혀 있어 이 교재에서도 다루지 않습니다.",
   "kind": "structure",
   "role": "목차",
   "image": "pages/dm07-38.jpg",
   "text": "Section Summary\n3\nBayes’ Theorem\nGeneralized Bayes’ Theorem\nBayesian Spam Filters\nA.I. Applications (optional, not currently included in the\noverheads)",
   "quiz": null
  },
  {
   "page": 39,
   "title": "베이즈 정리가 필요한 이유",
   "explanation": "검사가 양성일 때 실제로 병이 있을 확률은 \"병이 있을 때 양성이 나올 확률\"과 다릅니다. 베이즈 정리는 우리가 아는 방향의 조건부확률 p(결과|원인)로부터 알고 싶은 방향 p(원인|결과)를 계산하게 해 줍니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "질문 예 ①: 검사가 양성일 때 실제로 병이 있을 확률은?",
     "질문 예 ②: 검사가 음성인데도 실제로 병이 있을 확률은?",
     "보통 아는 것: p(양성 | 병 있음), p(양성 | 병 없음), 병의 유병률 p(병 있음).",
     "알고 싶은 것: p(병 있음 | 양성) → 조건의 방향이 반대입니다.",
     "응용 분야: 의학, 법, 인공지능, 공학 등."
    ],
    "analogy": "\"범인은 모두 현장에 갔다\"는 것과 \"현장에 간 사람은 모두 범인이다\"는 다릅니다. 조건의 방향을 바꾸는 계산이 베이즈 정리입니다.",
    "examples": [
     {
      "title": "방향이 다른 두 확률",
      "code": "검사의 성능(제조사가 알려 줌):  p(양성 | 병)  = 0.99\n환자가 궁금한 것:               p(병 | 양성)  = ?\n둘은 같지 않다 (44~45쪽 예에서는 약 0.002)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "조건부확률의 방향을 바꾸려면 베이즈 정리가 필요",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "알고 있는 확률을 \"p(무엇|무엇)\" 꼴로 적습니다.",
     "구하려는 확률도 같은 꼴로 적습니다.",
     "조건의 방향이 반대인지 확인합니다. 반대라면 베이즈 정리를 씁니다."
    ],
    "trap": [
     "p(양성|병)이 높다고 p(병|양성)도 높은 것은 아닙니다. 병이 아주 드물면 양성의 대부분이 오진일 수 있습니다."
    ],
    "recap": "베이즈 정리 = 알고 있는 p(결과|원인)로 알고 싶은 p(원인|결과)를 구하는 도구.",
    "source": "PDF 39쪽"
   },
   "quizzes": [
    [
     "검사 정확도 p(양성 | 병)과 같은 값이라고 할 수 없는 것은?",
     [
      "p(병 | 양성)",
      "p(양성 | 병)",
      "병이 있는 사람 중 양성 비율"
     ],
     "조건의 방향이 반대인 확률은 일반적으로 다릅니다.",
     [
      "맞습니다. 이 값은 베이즈 정리로 따로 구해야 합니다.",
      "같은 값입니다.",
      "p(양성 | 병)의 뜻 그대로입니다."
     ]
    ],
    [
     "베이즈 정리를 쓰는 상황으로 가장 알맞은 것은?",
     [
      "p(E|F)를 알고 p(F|E)를 구할 때",
      "두 사건의 합사건 확률을 구할 때",
      "표본공간의 원소 수를 셀 때"
     ],
     "조건의 방향을 바꾸는 것이 베이즈 정리의 역할입니다.",
     [
      "맞습니다.",
      "포함배제 공식을 씁니다.",
      "셈의 법칙을 씁니다."
     ]
    ]
   ],
   "image": "pages/dm07-39.jpg",
   "text": "Motivation for Bayes’ Theorem\nBayes’ theorem allows us to use probability to answer\nquestions such as the following:\n• Given that someone tests positive for having a particular\ndisease, what is the probability that they actually do\nhave the disease?\n• Given that someone tests negative for the disease, what\nis the probability, that in fact they do have the disease?\nBayes’ theorem has applications to medicine, law,\nartificial intelligence, engineering, and many diverse\nother areas.",
   "quiz": [
    "검사 정확도 p(양성 | 병)과 같은 값이라고 할 수 없는 것은?",
    [
     "p(병 | 양성)",
     "p(양성 | 병)",
     "병이 있는 사람 중 양성 비율"
    ],
    "조건의 방향이 반대인 확률은 일반적으로 다릅니다."
   ],
   "quizReasons": [
    "맞습니다. 이 값은 베이즈 정리로 따로 구해야 합니다.",
    "같은 값입니다.",
    "p(양성 | 병)의 뜻 그대로입니다."
   ]
  },
  {
   "page": 40,
   "title": "베이즈 정리",
   "explanation": "베이즈 정리는 p(E|F), p(E|F̄), p(F)를 알 때 p(F|E)를 구하는 공식입니다. 분모는 E가 일어나는 두 경로(F를 거쳐서, F̄를 거쳐서)의 확률을 더한 p(E)입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "베이즈 정리: p(E) ≠ 0, p(F) ≠ 0이면\np(F|E) = p(E|F)p(F) / [p(E|F)p(F) + p(E|F̄)p(F̄)].",
     "분자: F이면서 E일 확률 p(E ∩ F).",
     "분모: E일 확률 전체 p(E) = p(E|F)p(F) + p(E|F̄)p(F̄).",
     "예: 상자 1(초록 2, 빨강 7), 상자 2(초록 4, 빨강 3)에서 상자를 무작위로 고르고 공을 하나 꺼냈더니 빨강 → 상자 1일 확률은 49/76 ≈ 0.645."
    ],
    "analogy": "빨간 공이 나오는 길은 \"상자 1 → 빨강\"과 \"상자 2 → 빨강\" 두 갈래입니다. 전체 빨강 중 상자 1을 거쳐 온 몫이 p(상자 1 | 빨강)입니다.",
    "examples": [
     {
      "title": "상자 문제 (E = 빨강, F = 상자 1)",
      "code": "p(F) = 1/2,  p(F̄) = 1/2\np(E|F) = 7/9,  p(E|F̄) = 3/7\n분자 = (7/9)(1/2) = 7/18\n분모 = (7/9)(1/2) + (3/7)(1/2) = 7/18 + 3/14 = 49/126 + 27/126 = 76/126 = 38/63\np(F|E) = (7/18) / (38/63) = (7·63)/(18·38) = 441/684",
      "lang": "",
      "codeLabel": "풀이",
      "out": "49/76 ≈ 0.645",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "나무 그림으로 보기",
      "code": "            ┌ 빨강 7/9 → (1/2)(7/9) = 7/18\n상자 1 (1/2)┤\n            └ 초록 2/9\n            ┌ 빨강 3/7 → (1/2)(3/7) = 3/14\n상자 2 (1/2)┤\n            └ 초록 4/7\n빨강 전체 = 7/18 + 3/14,  그중 상자 1 몫 = 7/18",
      "lang": "",
      "codeLabel": "풀이",
      "out": "(7/18) ÷ (7/18 + 3/14) = 49/76",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "원인 사건 F와 관찰 사건 E를 정합니다(F = 상자 1, E = 빨강).",
     "사전확률 p(F), p(F̄)와 조건부확률 p(E|F), p(E|F̄)를 적습니다.",
     "분자 p(E|F)p(F)를 계산합니다.",
     "분모 = 분자 + p(E|F̄)p(F̄)를 계산하고 나눕니다."
    ],
    "trap": [
     "분모의 두 번째 항은 p(E|F̄)p(F̄)입니다. p(F̄|E)와 혼동하지 마세요.",
     "상자 1을 고를 확률이 1/2이어도, 빨강이 관찰된 뒤에는 상자 1일 확률이 1/2보다 커집니다(상자 1에 빨강이 더 많으므로)."
    ],
    "recap": "p(F|E) = p(E|F)p(F) / [p(E|F)p(F) + p(E|F̄)p(F̄)]. 분모 = E가 일어나는 모든 경로의 확률 합.",
    "source": "PDF 40쪽"
   },
   "quizzes": [
    [
     "상자 문제에서 빨간 공이 나왔을 때 상자 1에서 꺼냈을 확률은?",
     [
      "49/76",
      "7/9",
      "1/2"
     ],
     "(7/18)/(38/63) = 49/76 ≈ 0.645.",
     [
      "맞습니다.",
      "p(빨강 | 상자 1)이고 방향이 반대입니다.",
      "관찰 전의 사전확률입니다."
     ]
    ],
    [
     "같은 상자 문제에서 빨간 공이 나왔을 때 상자 2에서 꺼냈을 확률은?",
     [
      "27/76",
      "3/7",
      "49/76"
     ],
     "1 − 49/76 = 27/76. (3/14)/(38/63) = 27/76으로도 확인됩니다.",
     [
      "맞습니다.",
      "p(빨강 | 상자 2)입니다.",
      "상자 1일 확률입니다."
     ]
    ],
    [
     "베이즈 정리의 분모 p(E|F)p(F) + p(E|F̄)p(F̄)가 나타내는 것은?",
     [
      "p(E)",
      "p(F)",
      "p(F|E)"
     ],
     "E가 F를 거쳐 일어나는 확률과 F̄를 거쳐 일어나는 확률의 합입니다.",
     [
      "맞습니다.",
      "사전확률 p(F)는 분자의 일부일 뿐입니다.",
      "구하려는 값 자체입니다."
     ]
    ]
   ],
   "image": "pages/dm07-40.jpg",
   "text": "Bayes’ Theorem Thomas Bayes\n(1702-1761)\nBayes’ Theorem: Suppose that E and F are events from a sample space S such\nthat p(E)≠ 0 and p(F) ≠ 0. Then:\np ( F | E) =\np(E | F) p(F)\n(\n) ( )\np(E | F) p(F) + p E | F p F\nExample: We have two boxes. The first box contains two green balls and\nseven red balls. The second contains four green balls and three red balls.\nBob selects one of the boxes at random. Then he selects a ball from that box\nat random. If he has a red ball, what is the probability that he selected a ball\nfrom the first box.\n•\nLet E be the event that Bob has chosen a red ball and F be the event that Bob has\nchosen the first box.\n•\nBy Bayes’ theorem the probability that Bob has picked the first box is:\np ( F | E) =\n7 /18 49\n( 7 / 9)(1/ 2)\n=\n=\n 0.645.\n( 7 / 9)(1/ 2) + ( 3 / 7)(1/ 2) 38 / 63 76",
   "quiz": [
    "상자 문제에서 빨간 공이 나왔을 때 상자 1에서 꺼냈을 확률은?",
    [
     "49/76",
     "7/9",
     "1/2"
    ],
    "(7/18)/(38/63) = 49/76 ≈ 0.645."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(빨강 | 상자 1)이고 방향이 반대입니다.",
    "관찰 전의 사전확률입니다."
   ]
  },
  {
   "page": 41,
   "title": "베이즈 정리 유도 1: 조건부확률 두 개",
   "explanation": "베이즈 정리는 조건부확률의 정의 하나에서 출발합니다. 같은 교집합 p(E ∩ F)를 분자로 갖는 두 조건부확률 p(E|F)와 p(F|E)를 나란히 써 둡니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의: p(E|F) = p(E ∩ F)/p(F).",
     "역할을 바꾸면: p(F|E) = p(E ∩ F)/p(E).",
     "두 식의 분자는 같은 p(E ∩ F)이고, 분모만 다릅니다."
    ],
    "analogy": "같은 케이크 조각(E ∩ F)을 \"F 케이크 전체\" 기준으로 보면 p(E|F), \"E 케이크 전체\" 기준으로 보면 p(F|E)입니다.",
    "examples": [
     {
      "title": "숫자로 확인 (주사위, E = 짝수, F = 4 이상)",
      "code": "E ∩ F = {4, 6} → p(E ∩ F) = 2/6\np(E|F) = (2/6)/(3/6) = 2/3\np(F|E) = (2/6)/(3/6) = 2/3   (이 예에서는 p(E) = p(F)라 같음)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "분자는 같고 분모가 다르다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "분모가 다른 예 (E = {6}, F = 짝수)",
      "code": "p(E ∩ F) = 1/6\np(E|F) = (1/6)/(3/6) = 1/3\np(F|E) = (1/6)/(1/6) = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "보통은 p(E|F) ≠ p(F|E)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "조건부확률의 정의를 씁니다.",
     "E와 F의 역할을 바꾼 정의를 하나 더 씁니다.",
     "공통 분자 p(E ∩ F)에 주목합니다(다음 쪽에서 이용)."
    ],
    "trap": [
     "p(E ∩ F) = p(F ∩ E)입니다(교집합은 순서와 무관). 하지만 p(E|F)와 p(F|E)는 일반적으로 다릅니다."
    ],
    "recap": "p(E|F) = p(E∩F)/p(F), p(F|E) = p(E∩F)/p(E). 분자가 같다.",
    "source": "PDF 41쪽"
   },
   "quizzes": [
    [
     "p(F|E)의 정의는?",
     [
      "p(E ∩ F)/p(E)",
      "p(E ∩ F)/p(F)",
      "p(E)/p(F)"
     ],
     "조건이 E이므로 분모가 p(E)입니다.",
     [
      "맞습니다.",
      "p(E|F)의 정의입니다.",
      "교집합이 빠졌습니다."
     ]
    ],
    [
     "공정한 주사위에서 E = {6}, F = 짝수일 때 p(F|E)는?",
     [
      "1",
      "1/3",
      "1/6"
     ],
     "6은 반드시 짝수이므로 (1/6)/(1/6) = 1.",
     [
      "맞습니다.",
      "p(E|F)의 값입니다.",
      "p(E ∩ F)의 값입니다."
     ]
    ]
   ],
   "image": "pages/dm07-41.jpg",
   "text": "Derivation of Bayes’ Theorem\nRecall the definition of the conditional probability\np(E|F):\np(E  F)\np(E | F) =\np(F)\nFrom this definition, it follows that:\np(E  F)\np(E  F)\np(E | F) =\n, p ( F | E) =\np(F)\np ( E)\n1",
   "quiz": [
    "p(F|E)의 정의는?",
    [
     "p(E ∩ F)/p(E)",
     "p(E ∩ F)/p(F)",
     "p(E)/p(F)"
    ],
    "조건이 E이므로 분모가 p(E)입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(E|F)의 정의입니다.",
    "교집합이 빠졌습니다."
   ]
  },
  {
   "page": 42,
   "title": "베이즈 정리 유도 2: 곱셈 규칙과 방향 바꾸기",
   "explanation": "41쪽의 두 식에서 분모를 양변에 곱하면 p(E ∩ F)를 두 가지로 나타낼 수 있습니다. 둘을 같다고 놓고 정리하면 조건의 방향을 바꾸는 식이 나옵니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "곱셈 규칙: p(E|F)p(F) = p(E ∩ F),  p(F|E)p(E) = p(E ∩ F).",
     "같다고 놓기: p(E|F)p(F) = p(F|E)p(E).",
     "정리: p(F|E) = p(E|F)p(F)/p(E),  p(E|F) = p(F|E)p(E)/p(F)."
    ],
    "analogy": "같은 넓이의 직사각형을 \"가로 × 세로\"로도, \"세로 × 가로\"로도 구할 수 있는 것과 같습니다. 두 계산이 같다는 것에서 한 변의 길이를 역산합니다.",
    "examples": [
     {
      "title": "식 변형 따라가기",
      "code": "p(E|F) = p(E ∩ F)/p(F)   →  p(E ∩ F) = p(E|F)p(F)\np(F|E) = p(E ∩ F)/p(E)   →  p(E ∩ F) = p(F|E)p(E)\n∴ p(F|E)p(E) = p(E|F)p(F)\n∴ p(F|E) = p(E|F)p(F) / p(E)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "베이즈 정리의 기본형",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "숫자로 확인 (E = {6}, F = 짝수)",
      "code": "p(F|E) = p(E|F)p(F)/p(E) = (1/3)(1/2)/(1/6) = (1/6)/(1/6)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1 (41쪽 결과와 같다)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "조건부확률 정의에서 분모를 넘겨 곱셈 규칙 두 개를 씁니다.",
     "두 식의 좌변이 같은 p(E ∩ F)이므로 우변끼리 같다고 놓습니다.",
     "원하는 조건부확률에 대해 풉니다."
    ],
    "trap": [
     "기본형 p(F|E) = p(E|F)p(F)/p(E)에서 p(E)를 직접 모를 때가 많습니다. 그래서 43쪽에서 p(E)를 전개합니다."
    ],
    "recap": "p(E|F)p(F) = p(F|E)p(E) → p(F|E) = p(E|F)p(F)/p(E).",
    "source": "PDF 42쪽"
   },
   "quizzes": [
    [
     "p(E|F) = 0.5, p(F) = 0.4, p(E) = 0.25일 때 p(F|E)는?",
     [
      "0.8",
      "0.2",
      "0.5"
     ],
     "(0.5)(0.4)/0.25 = 0.2/0.25 = 0.8.",
     [
      "맞습니다.",
      "분자 p(E ∩ F) = 0.2에서 멈췄습니다.",
      "p(E|F)를 그대로 쓴 값입니다."
     ]
    ],
    [
     "곱셈 규칙으로 옳은 것은?",
     [
      "p(E ∩ F) = p(E|F)p(F)",
      "p(E ∩ F) = p(E|F)p(E)",
      "p(E ∩ F) = p(E)p(F) (항상)"
     ],
     "조건부확률 정의의 분모를 넘긴 식입니다.",
     [
      "맞습니다.",
      "조건(F)과 곱하는 확률(E)이 맞지 않습니다.",
      "독립일 때만 성립합니다."
     ]
    ]
   ],
   "image": "pages/dm07-42.jpg",
   "text": "Derivation of Bayes’ Theorem\n2\nOn the last slide we showed that\np ( E | F ) p ( F ) = p ( E  F ) , p ( F | E) p ( E) = p ( E  F )\nEquating the two formulas p ( E | F ) p ( F ) = p ( F | E ) p ( E )\nfor p(E F) shows that\nSolving for p(E|F) and for p(F|E) tells us that\np ( F | E) p ( E)\np(E | F) p(F)\np(E | F) =\n, p ( F | E) =\np(F)\np ( E)",
   "quiz": [
    "p(E|F) = 0.5, p(F) = 0.4, p(E) = 0.25일 때 p(F|E)는?",
    [
     "0.8",
     "0.2",
     "0.5"
    ],
    "(0.5)(0.4)/0.25 = 0.2/0.25 = 0.8."
   ],
   "quizReasons": [
    "맞습니다.",
    "분자 p(E ∩ F) = 0.2에서 멈췄습니다.",
    "p(E|F)를 그대로 쓴 값입니다."
   ]
  },
  {
   "page": 43,
   "title": "베이즈 정리 유도 3: 전확률 공식으로 p(E) 전개",
   "explanation": "p(E)를 모를 때는 표본공간을 F와 F̄로 나눠 E를 두 조각으로 쪼갭니다. E = (E ∩ F) ∪ (E ∩ F̄)이고 두 조각은 서로소이므로 확률을 더하고, 각 조각을 곱셈 규칙으로 바꿉니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "E = E ∩ S = E ∩ (F ∪ F̄) = (E ∩ F) ∪ (E ∩ F̄).",
     "(E ∩ F) ∩ (E ∩ F̄) = ∅ (서로소).",
     "p(E) = p(E ∩ F) + p(E ∩ F̄) = p(E|F)p(F) + p(E|F̄)p(F̄)  (전확률 공식).",
     "42쪽 식에 대입: p(F|E) = p(E|F)p(F) / [p(E|F)p(F) + p(E|F̄)p(F̄)]."
    ],
    "analogy": "전교생의 안경 착용률은 \"1반의 착용률 × 1반 비율 + 2반의 착용률 × 2반 비율\"처럼 반별로 나눠 더해서 구할 수 있습니다.",
    "examples": [
     {
      "title": "상자 문제(40쪽)의 p(빨강)",
      "code": "p(빨강) = p(빨강|상자1)p(상자1) + p(빨강|상자2)p(상자2)\n        = (7/9)(1/2) + (3/7)(1/2)\n        = 7/18 + 3/14 = 38/63",
      "lang": "",
      "codeLabel": "풀이",
      "out": "38/63 ≈ 0.603",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "유도의 흐름",
      "code": "정의 → 곱셈 규칙 → p(F|E) = p(E|F)p(F)/p(E)\n          ↓ p(E)를 전확률 공식으로 전개\np(F|E) = p(E|F)p(F) / [p(E|F)p(F) + p(E|F̄)p(F̄)]",
      "lang": "",
      "codeLabel": "풀이",
      "out": "베이즈 정리 완성",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "표본공간을 F와 F̄로 나눕니다.",
     "E를 E ∩ F와 E ∩ F̄로 나누고 서로소임을 확인합니다.",
     "두 조각의 확률을 곱셈 규칙으로 바꿔 더합니다.",
     "기본형의 p(E) 자리에 넣습니다."
    ],
    "trap": [
     "원문의 \"E ∩ S = E ∩ (F ∩ F̄)\"는 \"E ∩ (F ∪ F̄)\"의 오타로 보입니다. F ∩ F̄는 공집합이므로 그대로 읽으면 E = ∅이 됩니다.",
     "전확률 공식의 두 항 모두 \"조건부확률 × 그 조건의 확률\" 꼴입니다."
    ],
    "recap": "전확률 공식 p(E) = p(E|F)p(F) + p(E|F̄)p(F̄)을 넣으면 베이즈 정리가 완성됩니다.",
    "source": "PDF 43쪽"
   },
   "quizzes": [
    [
     "전확률 공식으로 옳은 것은?",
     [
      "p(E) = p(E|F)p(F) + p(E|F̄)p(F̄)",
      "p(E) = p(F|E)p(F) + p(F̄|E)p(F̄)",
      "p(E) = p(E|F) + p(E|F̄)"
     ],
     "E를 F와 F̄로 나눈 두 조각의 확률을 더합니다.",
     [
      "맞습니다.",
      "조건부확률의 방향이 틀렸습니다.",
      "각 항에 조건의 확률을 곱해야 합니다."
     ]
    ],
    [
     "p(E|F) = 0.9, p(F) = 0.2, p(E|F̄) = 0.1일 때 p(E)는?",
     [
      "0.26",
      "1.0",
      "0.18"
     ],
     "0.9·0.2 + 0.1·0.8 = 0.18 + 0.08 = 0.26.",
     [
      "맞습니다.",
      "0.9 + 0.1로 가중치를 빼먹었습니다.",
      "첫 항만 계산했습니다."
     ]
    ],
    [
     "유도에서 E = (E ∩ F) ∪ (E ∩ F̄)로 나눌 수 있는 이유는?",
     [
      "F ∪ F̄ = S이기 때문",
      "E와 F가 독립이기 때문",
      "F ∩ F̄ = S이기 때문"
     ],
     "E = E ∩ S = E ∩ (F ∪ F̄)에 분배법칙을 씁니다.",
     [
      "맞습니다.",
      "독립은 필요 없습니다.",
      "F ∩ F̄는 공집합입니다(원문 오타 주의)."
     ]
    ]
   ],
   "review": {
    "original": "because E = E ∩ S = E ∩ (F ∩ F̄) = (E ∩ F) ∪ (E ∩ F̄)",
    "checked": "F ∩ F̄ = ∅이므로 이대로라면 E = ∅이 됩니다. 분배법칙으로 (E ∩ F) ∪ (E ∩ F̄)가 나오려면 S = F ∪ F̄를 써서 E ∩ (F ∪ F̄)여야 합니다. ∪ 대신 ∩가 들어간 오타로 보입니다.",
    "label": "원문 기호 오타 의심 · 집합 법칙으로 확인",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-43.jpg",
   "text": "Derivation of Bayes’ Theorem\np(E | F) p(F)\np ( F | E) =\np ( E)\nOn the last slide we\nshowed that:\nNote that\nsince\n(\n) ( )\np ( E) = p ( E | F ) p ( F ) + p E | F p F\n(\np ( E) = p ( E  F ) + p E  F\n( )\n(E  F) (E  F) = \n)\n(\nbecause E = E  S = E  F  F = ( E  F )  E  F\nand\nBy the definition of conditional probability,\n(\n)\n(\n)\n) ( )\np ( E) = p ( E  F ) + p E  F = p ( E | F ) p ( F ) + p E | F p F\nHence,\np ( F | E) =\np(E | F) p(F)\n(\n) ( )\np(E | F) p(F) + p E | F p F",
   "quiz": [
    "전확률 공식으로 옳은 것은?",
    [
     "p(E) = p(E|F)p(F) + p(E|F̄)p(F̄)",
     "p(E) = p(F|E)p(F) + p(F̄|E)p(F̄)",
     "p(E) = p(E|F) + p(E|F̄)"
    ],
    "E를 F와 F̄로 나눈 두 조각의 확률을 더합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "조건부확률의 방향이 틀렸습니다.",
    "각 항에 조건의 확률을 곱해야 합니다."
   ]
  },
  {
   "page": 44,
   "title": "베이즈 정리 응용 1: 희귀병 검사 (문제)",
   "explanation": "10만 명 중 1명이 걸리는 희귀병의 검사 문제입니다. 병이 있으면 99% 양성, 병이 없으면 99.5% 음성이 나옵니다. (a) 양성인 사람이 실제로 병이 있을 확률, (b) 음성인 사람이 실제로 병이 없을 확률을 구합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "유병률: p(D) = 1/100,000 = 0.00001.",
     "민감도: p(양성 | 병) = 0.99.",
     "특이도: p(음성 | 병 없음) = 0.995 → 위양성 p(양성 | 병 없음) = 0.005.",
     "구할 것: (a) p(병 | 양성), (b) p(병 없음 | 음성). 결과는 45, 46쪽."
    ],
    "analogy": "아주 정확한 화재경보기라도 불이 거의 안 나는 건물이라면, 울린 경보의 대부분은 오작동일 수 있습니다.",
    "examples": [
     {
      "title": "10만 명으로 상상해 보기 (근사)",
      "code": "병 있음 1명   → 양성 약 0.99명\n병 없음 99,999명 → 양성 약 0.005 × 99,999 ≈ 500명\n양성 약 501명 중 진짜 환자는 1명 정도",
      "lang": "",
      "codeLabel": "풀이",
      "out": "양성이어도 병일 확률은 약 0.002",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "사건을 정의합니다: D = 병 있음, E = 양성.",
     "주어진 값을 조건부확률로 바꿉니다: p(E|D) = 0.99, p(Ē|D̄) = 0.995.",
     "필요한 여사건 값을 구합니다: p(E|D̄) = 0.005, p(D̄) = 0.99999.",
     "베이즈 정리에 넣을 준비를 합니다."
    ],
    "trap": [
     "\"99.5%가 음성\"은 병이 없는 사람에 대한 값(p(Ē|D̄))입니다. 위양성률 p(E|D̄)는 1 − 0.995 = 0.005입니다.",
     "검사가 정확해도 유병률이 매우 낮으면 양성 판정의 신뢰도가 낮아집니다."
    ],
    "recap": "주어진 비율을 p(E|D), p(Ē|D̄), p(D)로 정확히 번역하는 것이 베이즈 문제의 첫걸음.",
    "source": "PDF 44쪽"
   },
   "quizzes": [
    [
     "\"병이 없는 사람에게 99.5% 음성\"일 때 p(양성 | 병 없음)은?",
     [
      "0.005",
      "0.995",
      "0.01"
     ],
     "1 − 0.995 = 0.005.",
     [
      "맞습니다.",
      "p(음성 | 병 없음)입니다.",
      "p(음성 | 병)입니다."
     ]
    ],
    [
     "유병률이 10만 명 중 1명일 때 p(D̄)는?",
     [
      "0.99999",
      "0.00001",
      "0.99"
     ],
     "1 − 0.00001 = 0.99999.",
     [
      "맞습니다.",
      "p(D)입니다.",
      "민감도와 혼동했습니다."
     ]
    ]
   ],
   "image": "pages/dm07-44.jpg",
   "text": "Applying Bayes’ Theorem\n1\nExample: Suppose that one person in 100,000 has a\nparticular disease. There is a test for the disease that\ngives a positive result 99% of the time when given to\nsomeone with the disease. When given to someone\nwithout the disease, 99.5% of the time it gives a\nnegative result. Find\na) the probability that a person who test positive has the\ndisease.\nb) the probability that a person who test negative does not\nhave the disease.\nShould someone who tests positive be worried?",
   "quiz": [
    "\"병이 없는 사람에게 99.5% 음성\"일 때 p(양성 | 병 없음)은?",
    [
     "0.005",
     "0.995",
     "0.01"
    ],
    "1 − 0.995 = 0.005."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(음성 | 병 없음)입니다.",
    "p(음성 | 병)입니다."
   ]
  },
  {
   "page": 45,
   "title": "베이즈 정리 응용 2: 양성일 때 병일 확률",
   "explanation": "44쪽 값으로 p(D|E)를 계산하면 약 0.002입니다. 검사가 99% 정확해도 양성 판정을 받은 사람 중 실제 환자는 약 0.2%뿐입니다. 병이 너무 드물어서 위양성(0.005 × 0.99999)이 진양성(0.99 × 0.00001)보다 훨씬 많기 때문입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(D) = 0.00001, p(D̄) = 0.99999.",
     "p(E|D) = 0.99, p(Ē|D) = 0.01, p(E|D̄) = 0.005, p(Ē|D̄) = 0.995.",
     "p(D|E) = (0.99)(0.00001) / [(0.99)(0.00001) + (0.005)(0.99999)] ≈ 0.002.",
     "원문 결론: 양성이 나와도 너무 걱정하지 마라."
    ],
    "analogy": "양성 판정 봉투 501개가 있는데 진짜 환자의 봉투는 1개 정도입니다. 내 봉투가 그 1개일 확률은 약 1/500입니다.",
    "examples": [
     {
      "title": "계산",
      "code": "분자 = (0.99)(0.00001) = 0.0000099\n위양성 = (0.005)(0.99999) = 0.00499995\n분모 = 0.0000099 + 0.00499995 = 0.00500985\np(D|E) = 0.0000099 / 0.00500985",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.00198 ≈ 0.002",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "왜 작을까 (원문의 질문)",
      "code": "분모의 두 항 비교:\n  진양성 0.0000099  vs  위양성 0.00499995\n위양성이 약 500배 많다 → 유병률 0.00001이 너무 작기 때문",
      "lang": "",
      "codeLabel": "풀이",
      "out": "사전확률(유병률)이 결과를 좌우한다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "분자 p(E|D)p(D)를 계산합니다.",
     "위양성 항 p(E|D̄)p(D̄)를 계산합니다.",
     "분모 = 두 항의 합.",
     "나누어 약 0.002를 얻습니다."
    ],
    "trap": [
     "p(E|D) = 0.99를 답으로 쓰는 실수가 가장 흔합니다. 구하는 것은 p(D|E)입니다.",
     "분모에 p(D̄) = 0.99999를 곱하는 것을 잊으면 결과가 크게 달라집니다(이 문제에선 0.99999 ≈ 1이라 차이는 작음)."
    ],
    "recap": "p(병|양성) ≈ 0.002. 유병률이 매우 낮으면 위양성이 진양성을 압도한다.",
    "source": "PDF 45쪽"
   },
   "quizzes": [
    [
     "원문 희귀병 문제에서 양성일 때 실제로 병이 있을 확률은 약?",
     [
      "0.002",
      "0.99",
      "0.5"
     ],
     "(0.99)(0.00001)/[(0.99)(0.00001) + (0.005)(0.99999)] ≈ 0.002.",
     [
      "맞습니다.",
      "p(양성 | 병)입니다.",
      "근거 없는 값입니다."
     ]
    ],
    [
     "이 결과가 작게 나오는 가장 큰 이유는?",
     [
      "유병률이 매우 낮아 위양성이 진양성보다 훨씬 많다",
      "검사 민감도가 낮다",
      "검사 결과가 독립이 아니다"
     ],
     "분모에서 위양성 항(약 0.005)이 진양성 항(약 0.00001)을 압도합니다.",
     [
      "맞습니다.",
      "민감도 0.99는 높습니다.",
      "독립성은 이 계산과 관계없습니다."
     ]
    ],
    [
     "같은 검사에서 유병률이 1/100(0.01)이라면 p(D|E)는? (소수 셋째 자리 근사)",
     [
      "약 0.667",
      "약 0.002",
      "약 0.99"
     ],
     "(0.99)(0.01)/[(0.99)(0.01) + (0.005)(0.99)] = 0.0099/0.01485 ≈ 0.667.",
     [
      "맞습니다. 유병률이 커지면 양성의 신뢰도가 크게 오릅니다.",
      "원래 유병률의 값입니다.",
      "민감도입니다."
     ]
    ]
   ],
   "image": "pages/dm07-45.jpg",
   "text": "Applying Bayes’ Theorem\n2\nSolution: Let D be the event that the person has the\ndisease, and E be the event that this person tests positive.\nWe need to compute p( D | E ) from p ( D) , p( E | D), p ( E | D ), p ( D ) .\n( )\np ( E | D ) = .99 p ( E | D ) = .01 p ( E | D ) = .005 p ( E | D ) = .995\np( D) = 1/100, 000 = 0.00001 p D = 1 − 0.00001 = 0.99999\np ( D | E) =\n=\np ( E | D) p ( D)\n(\n) ( )\np ( E | D) p ( D) + p E | D p D\n( 0.99)( 0.00001)\n( 0.99)( 0.00001) + ( 0.005)( 0.99999)\n 0.002\nCan you use this formula\nto explain why the\nresulting probability is\nsurprisingly small?\nSo, don’t worry too much, if your test\nfor this disease comes back positive.",
   "quiz": [
    "원문 희귀병 문제에서 양성일 때 실제로 병이 있을 확률은 약?",
    [
     "0.002",
     "0.99",
     "0.5"
    ],
    "(0.99)(0.00001)/[(0.99)(0.00001) + (0.005)(0.99999)] ≈ 0.002."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(양성 | 병)입니다.",
    "근거 없는 값입니다."
   ]
  },
  {
   "page": 46,
   "title": "베이즈 정리 응용 3: 음성일 때 병이 없을 확률",
   "explanation": "검사가 음성일 때 병이 없을 확률 p(D̄|Ē)는 약 0.9999999입니다. 즉 음성인데 병이 있을 확률 p(D|Ē)는 약 0.0000001로, 음성 결과는 매우 믿을 만합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(D̄|Ē) = p(Ē|D̄)p(D̄) / [p(Ē|D̄)p(D̄) + p(Ē|D)p(D)].",
     "= (0.995)(0.99999) / [(0.995)(0.99999) + (0.01)(0.00001)] ≈ 0.9999999.",
     "p(D|Ē) = 1 − p(D̄|Ē) ≈ 0.0000001.",
     "원문 결론: 음성이면 병이 있을 가능성은 극히 낮다."
    ],
    "analogy": "거의 아무도 걸리지 않는 병이라 원래부터 병이 없을 확률이 0.99999였고, 음성 결과가 그 확신을 조금 더 높인 것입니다.",
    "examples": [
     {
      "title": "계산",
      "code": "분자 = (0.995)(0.99999) = 0.99499005\n위음성 = (0.01)(0.00001) = 0.0000001\np(D̄|Ē) = 0.99499005 / (0.99499005 + 0.0000001)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.9999999,  p(D|Ē) ≈ 0.0000001",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "45쪽과 비교",
      "code": "양성일 때 병일 확률  p(D|E) ≈ 0.002\n음성일 때 병일 확률  p(D|Ē) ≈ 0.0000001",
      "lang": "",
      "codeLabel": "풀이",
      "out": "이 검사는 음성 결과가 특히 믿을 만하다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "이번에는 원인 사건을 D̄(병 없음), 관찰을 Ē(음성)로 둡니다.",
     "분자 p(Ē|D̄)p(D̄)를 계산합니다.",
     "분모에 위음성 항 p(Ē|D)p(D)를 더합니다.",
     "나누고, 필요하면 1에서 빼서 p(D|Ē)를 구합니다."
    ],
    "trap": [
     "분모 두 번째 항은 p(Ē|D)p(D) = (0.01)(0.00001)입니다. p(Ē|D) = 1 − 0.99 = 0.01을 써야 합니다.",
     "베이즈 정리의 F 자리에 D̄를 넣으면 F̄ 자리는 D가 됩니다."
    ],
    "recap": "p(병 없음|음성) ≈ 0.9999999 → 음성이면 병일 확률 ≈ 0.0000001.",
    "source": "PDF 46쪽"
   },
   "quizzes": [
    [
     "희귀병 문제에서 음성일 때 실제로 병이 있을 확률은 약?",
     [
      "0.0000001",
      "0.01",
      "0.002"
     ],
     "1 − 0.9999999 = 0.0000001.",
     [
      "맞습니다.",
      "p(음성 | 병)입니다.",
      "양성일 때 병일 확률입니다."
     ]
    ],
    [
     "p(D̄|Ē)를 베이즈 정리로 구할 때 분모의 두 번째 항은?",
     [
      "p(Ē|D)p(D)",
      "p(E|D)p(D)",
      "p(Ē|D̄)p(D̄)"
     ],
     "Ē가 D를 거쳐 일어나는 경로(위음성)입니다.",
     [
      "맞습니다.",
      "음성이 아니라 양성 경로입니다.",
      "이것은 분자(첫 번째 항)입니다."
     ]
    ]
   ],
   "image": "pages/dm07-46.jpg",
   "text": "Applying Bayes’ Theorem\n3\nWhat if the result is negative?\n(\n(\n)\n)\np ( D | E) =\np ( E | D) p ( D) + p ( E | D) p ( D)\np E|D p D\nSo, the probability you\nhave the disease if you\ntest negative is\n(\np D|E\n)\n 1 − 0.9999999\n= 0.0000001.\n0.995)( 0.99999)\n(\n=\n( 0.995)( 0.99999) + ( 0.01)( 0.00001)\n 0.9999999\nSo, it is extremely unlikely you have the disease if you\ntest negative.",
   "quiz": [
    "희귀병 문제에서 음성일 때 실제로 병이 있을 확률은 약?",
    [
     "0.0000001",
     "0.01",
     "0.002"
    ],
    "1 − 0.9999999 = 0.0000001."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(음성 | 병)입니다.",
    "양성일 때 병일 확률입니다."
   ]
  },
  {
   "page": 47,
   "title": "일반화된 베이즈 정리",
   "explanation": "원인이 둘(F, F̄)이 아니라 n개(F1, …, Fn)일 때의 베이즈 정리입니다. F1, …, Fn이 서로 배반이고 합치면 표본공간 전체가 될 때(분할), E를 관찰한 뒤 원인 Fj일 확률을 구합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "조건: F1, …, Fn은 서로 배반(mutually exclusive)이고 F1 ∪ … ∪ Fn = S.",
     "p(Fj|E) = p(E|Fj)p(Fj) / Σ(i=1..n) p(E|Fi)p(Fi).",
     "분모는 n개 경로 전체의 전확률 p(E).",
     "n = 2, F1 = F, F2 = F̄이면 40쪽의 베이즈 정리가 됩니다."
    ],
    "analogy": "불량품이 나왔을 때 어느 공장에서 왔는지 따지는 문제입니다. 공장마다 \"생산 비율 × 불량률\"이 불량품 전체에서 차지하는 몫이 그 공장일 확률입니다.",
    "examples": [
     {
      "title": "기계 A, B, C (생산 50%, 30%, 20%, 불량률 1%, 2%, 3%)",
      "code": "p(불량) = (0.5)(0.01) + (0.3)(0.02) + (0.2)(0.03)\n        = 0.005 + 0.006 + 0.006 = 0.017\np(C | 불량) = 0.006 / 0.017 = 6/17",
      "lang": "",
      "codeLabel": "풀이",
      "out": "6/17 ≈ 0.353",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "같은 문제의 나머지",
      "code": "p(A | 불량) = 0.005/0.017 = 5/17\np(B | 불량) = 0.006/0.017 = 6/17\n합: 5/17 + 6/17 + 6/17 = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "사후확률의 합은 1",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "원인 F1, …, Fn이 겹치지 않고 전체를 덮는지 확인합니다.",
     "각 원인의 경로 확률 p(E|Fi)p(Fi)를 모두 계산합니다.",
     "모두 더해 p(E)를 구합니다.",
     "원하는 원인 Fj의 경로 확률을 p(E)로 나눕니다."
    ],
    "trap": [
     "원인들이 겹치거나 전체를 덮지 못하면 분모가 p(E)가 아니게 됩니다.",
     "원문의 \"Assume that p(E) ≠ 0 for i = 1, 2, …, n\"은 표현이 어색합니다. p(E) ≠ 0이면 충분하고, \"for i\"는 필요 없는 말입니다(교재는 p(Fi) ≠ 0도 함께 가정)."
    ],
    "recap": "p(Fj|E) = p(E|Fj)p(Fj) / Σ p(E|Fi)p(Fi). 분모 = 모든 원인 경로의 합.",
    "source": "PDF 47쪽"
   },
   "quizzes": [
    [
     "기계 A, B, C 문제에서 불량품이 기계 C에서 나왔을 확률은?",
     [
      "6/17",
      "3/100",
      "1/3"
     ],
     "0.006/0.017 = 6/17.",
     [
      "맞습니다.",
      "p(불량 | C)입니다.",
      "기계 수로 나눈 근거 없는 값입니다."
     ]
    ],
    [
     "일반화된 베이즈 정리에서 F1, …, Fn에 필요한 조건은?",
     [
      "서로 배반이고 합집합이 S",
      "서로 독립",
      "모두 같은 확률"
     ],
     "mutually exclusive events such that ∪Fi = S (분할).",
     [
      "맞습니다.",
      "독립은 필요 없습니다.",
      "확률이 달라도 됩니다."
     ]
    ],
    [
     "같은 문제에서 p(A | 불량)은?",
     [
      "5/17",
      "1/2",
      "1/100"
     ],
     "0.005/0.017 = 5/17.",
     [
      "맞습니다.",
      "불량과 무관한 사전확률입니다.",
      "p(불량 | A)입니다."
     ]
    ]
   ],
   "review": {
    "original": "Assume that p(E) ≠ 0 for i = 1, 2, …, n.",
    "checked": "p(E)에는 첨자 i가 없으므로 \"for i = 1, 2, …, n\"은 어울리지 않습니다. 필요한 가정은 p(E) ≠ 0이고, 교재(Rosen)에는 p(Fi) ≠ 0 (i = 1, …, n)도 함께 적혀 있습니다. 공식 자체는 맞습니다.",
    "label": "원문 표현 어색 · 교재와 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-47.jpg",
   "text": "Generalized Bayes’ Theorem\nGeneralized Bayes’ Theorem: Suppose that E is an\nevent from a sample space S and that F1, F2, …, Fn are\nmutually exclusive events such that U F = S\nn\ni\ni\nAssume that p(E) ≠ 0 for i = 1, 2, …, n. Then\n(\n)\np Fj | E =\n(\n) ( ) .\np E | Fj p Fj\n\nn\ni =1\np ( E | Fi ) p ( Fi )\nExercise 17 asks for the proof.",
   "quiz": [
    "기계 A, B, C 문제에서 불량품이 기계 C에서 나왔을 확률은?",
    [
     "6/17",
     "3/100",
     "1/3"
    ],
    "0.006/0.017 = 6/17."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(불량 | C)입니다.",
    "기계 수로 나눈 근거 없는 값입니다."
   ]
  },
  {
   "page": 48,
   "title": "베이지안 스팸 필터 1: 단어 빈도 추정",
   "explanation": "스팸 메일 모음 B와 정상 메일 모음 G가 있을 때, 단어 w가 각 모음에서 몇 통에 나오는지 세어 \"스팸이 w를 포함할 확률\"과 \"정상 메일이 w를 포함할 확률\"을 추정합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "nB(w): 스팸 모음 B에서 w를 포함한 메일 수, nG(w): 정상 모음 G에서 w를 포함한 메일 수.",
     "스팸이 w를 포함할 추정 확률: p(w) = nB(w)/|B|.",
     "정상 메일이 w를 포함할 추정 확률: q(w) = nG(w)/|G|.",
     "이 두 값이 다음 쪽 베이즈 정리의 p(E|S), p(E|S̄) 자리에 들어갑니다."
    ],
    "analogy": "광고 전단지 더미와 친구 편지 더미에서 \"무료\"라는 단어가 들어간 장수를 세어 보는 것과 같습니다. 각 더미의 전체 장수로 나누면 비율이 됩니다.",
    "examples": [
     {
      "title": "빈도 세기",
      "code": "스팸 3000통 중 \"free\" 포함 600통  → p(free) = 600/3000 = 0.2\n정상 2000통 중 \"free\" 포함 40통   → q(free) = 40/2000 = 0.02",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p(w) = 0.2, q(w) = 0.02",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "스팸 모음과 정상 모음의 크기 |B|, |G|를 셉니다.",
     "각 모음에서 단어 w를 포함한 메일 수를 셉니다.",
     "각 모음 크기로 나눠 p(w), q(w)를 구합니다."
    ],
    "trap": [
     "p(w)는 \"w를 포함한 메일이 스팸일 확률\"이 아니라 \"스팸이 w를 포함할 확률\" p(E|S)입니다. 스팸일 확률은 다음 쪽의 r(w)입니다.",
     "p(w)와 q(w)는 서로 다른 모음 크기로 나눕니다(전체 메일 수로 나누지 않음)."
    ],
    "recap": "p(w) = nB(w)/|B| ≈ p(E|S), q(w) = nG(w)/|G| ≈ p(E|S̄).",
    "source": "PDF 48쪽"
   },
   "quizzes": [
    [
     "스팸 2000통 중 400통, 정상 1000통 중 60통에 \"stock\"이 있을 때 q(stock)은?",
     [
      "0.06",
      "0.2",
      "60/3000"
     ],
     "q(w) = nG(w)/|G| = 60/1000.",
     [
      "맞습니다.",
      "p(stock)입니다.",
      "전체 메일 수로 나눴습니다."
     ]
    ],
    [
     "p(w) = nB(w)/|B|가 추정하는 확률은?",
     [
      "스팸 메일이 단어 w를 포함할 확률",
      "단어 w를 포함한 메일이 스팸일 확률",
      "임의의 메일이 스팸일 확률"
     ],
     "원문: Estimated probability that a spam message contains w.",
     [
      "맞습니다.",
      "그것은 r(w)가 추정합니다(49쪽).",
      "그것은 p(S)입니다."
     ]
    ]
   ],
   "image": "pages/dm07-48.jpg",
   "text": "Bayesian Spam Filters\n1\nHow do we develop a tool for determining whether an\nemail is likely to be spam?\nIf we have an initial set B of spam messages and set G of\nnon-spam messages. We can use this information along\nwith Bayes’ law to predict the probability that a new email\nmessage is spam.\nWe look at a particular word w, and count the number of\ntimes that it occurs in B and in G; nB(w) and nG(w).\n• Estimated probability that a spam message contains w is:\np(w) = nB(w)/|B|\n• Estimated probability that a message that is not spam\ncontains w is:\nq(w) = nG(w)/|G|",
   "quiz": [
    "스팸 2000통 중 400통, 정상 1000통 중 60통에 \"stock\"이 있을 때 q(stock)은?",
    [
     "0.06",
     "0.2",
     "60/3000"
    ],
    "q(w) = nG(w)/|G| = 60/1000."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(stock)입니다.",
    "전체 메일 수로 나눴습니다."
   ]
  },
  {
   "page": 49,
   "title": "베이지안 스팸 필터 2: r(w)",
   "explanation": "S = 스팸, E = 단어 w를 포함이라 두고 베이즈 정리로 p(S|E)를 구합니다. 스팸과 정상이 반반이라고 가정하면(p(S) = 1/2) 사전확률이 약분되어 r(w) = p(w)/(p(w) + q(w))가 됩니다. r(w)가 기준값보다 크면 스팸으로 분류합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "베이즈 정리: p(S|E) = p(E|S)p(S) / [p(E|S)p(S) + p(E|S̄)p(S̄)].",
     "p(S) = p(S̄) = 1/2이면: p(S|E) = p(E|S) / [p(E|S) + p(E|S̄)].",
     "추정값을 넣으면: r(w) = p(w) / (p(w) + q(w)).",
     "r(w)가 정한 기준(threshold)보다 크면 스팸으로 분류.",
     "스팸 비율 자료가 있으면 p(S)를 1/2 대신 더 나은 값으로 추정할 수 있습니다(교재 연습문제 22)."
    ],
    "analogy": "두 상자(스팸/정상)를 반반 확률로 고른 뒤 단어 하나를 관찰하는 문제와 같습니다. 40쪽의 상자 문제와 구조가 똑같습니다.",
    "examples": [
     {
      "title": "\"free\" 예 (48쪽 값)",
      "code": "p(free) = 0.2,  q(free) = 0.02\nr(free) = 0.2 / (0.2 + 0.02) = 0.2 / 0.22",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.909 → 기준 0.9보다 크면 스팸",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "p(S) = 1/2이 약분되는 과정",
      "code": "p(S|E) = p(E|S)(1/2) / [p(E|S)(1/2) + p(E|S̄)(1/2)]\n       = p(E|S) / [p(E|S) + p(E|S̄)]",
      "lang": "",
      "codeLabel": "풀이",
      "out": "사전확률이 같으면 지워진다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "p(w), q(w)를 구합니다(48쪽).",
     "p(S) = 1/2 가정을 확인합니다.",
     "r(w) = p(w)/(p(w) + q(w))를 계산합니다.",
     "기준값과 비교해 분류합니다."
    ],
    "trap": [
     "r(w) 공식은 p(S) = 1/2 가정에서만 이 모양입니다. 스팸 비율이 다르면 p(S)를 곱한 베이즈 정리 원래 식을 써야 합니다.",
     "분모는 p(w) + q(w)이지 1이 아닙니다."
    ],
    "recap": "r(w) = p(w)/(p(w) + q(w)) (p(S) = 1/2 가정). 기준보다 크면 스팸.",
    "source": "PDF 49쪽"
   },
   "quizzes": [
    [
     "p(w) = 0.3, q(w) = 0.1일 때 r(w)는?",
     [
      "0.75",
      "0.3",
      "0.4"
     ],
     "0.3/(0.3 + 0.1) = 0.75.",
     [
      "맞습니다.",
      "p(w)를 그대로 쓴 값입니다.",
      "분모만 계산했습니다."
     ]
    ],
    [
     "r(w) = p(w)/(p(w) + q(w)) 공식이 성립하려면 필요한 가정은?",
     [
      "메일이 스팸일 사전확률이 1/2",
      "단어들이 서로 독립",
      "p(w) = q(w)"
     ],
     "p(S) = p(S̄) = 1/2이면 사전확률이 약분됩니다.",
     [
      "맞습니다.",
      "단어 하나만 쓰므로 독립 가정은 필요 없습니다(51쪽에서 필요).",
      "그러면 r(w) = 1/2이 될 뿐입니다."
     ]
    ],
    [
     "r(w)가 추정하는 확률은?",
     [
      "단어 w를 포함한 메일이 스팸일 확률",
      "스팸이 단어 w를 포함할 확률",
      "정상 메일이 단어 w를 포함할 확률"
     ],
     "r(w)는 p(S|E)의 추정값입니다.",
     [
      "맞습니다.",
      "그것은 p(w)입니다.",
      "그것은 q(w)입니다."
     ]
    ]
   ],
   "image": "pages/dm07-49.jpg",
   "text": "Bayesian Spam Filters\n2\nLet S be the event that the message is spam, and E be\nthe event that the message contains the word w.\nUsing Bayes’ Rule,\nAssuming that it is\nequally likely that an\narbitrary message is\nspam and is not\nspam; i.e., p(S) = ½.\nUsing our\nempirical\nestimates of\np(E | S) and\np(E |S).\np ( S | E) =\np ( S | E) =\np(E | S) p(S)\n(\n) ()\np(E | S) p(S) + p E | S p S\np(E | S)\n(\np(E | S) + p E | S\np ( w)\nr ( w) =\np ( w) + q ( w)\n)\nNote: If we have data on\nthe frequency of spam\nmessages, we can obtain\na better estimate for p(s).\n(See Exercise 22.)\nr(w) estimates the probability that the\nmessage is spam. We can class the message\nas spam if r(w) is above a threshold.",
   "quiz": [
    "p(w) = 0.3, q(w) = 0.1일 때 r(w)는?",
    [
     "0.75",
     "0.3",
     "0.4"
    ],
    "0.3/(0.3 + 0.1) = 0.75."
   ],
   "quizReasons": [
    "맞습니다.",
    "p(w)를 그대로 쓴 값입니다.",
    "분모만 계산했습니다."
   ]
  },
  {
   "page": 50,
   "title": "베이지안 스팸 필터 3: \"Rolex\" 예",
   "explanation": "\"Rolex\"가 스팸 2000통 중 250통, 정상 1000통 중 5통에 나옵니다. p(Rolex) = 0.125, q(Rolex) = 0.005이므로 r(Rolex) ≈ 0.962이고, 기준 0.9보다 커서 스팸으로 분류합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(Rolex) = 250/2000 = 0.125.",
     "q(Rolex) = 5/1000 = 0.005.",
     "r(Rolex) = 0.125/(0.125 + 0.005) = 0.125/0.13 ≈ 0.962.",
     "0.962 > 0.9 → 스팸으로 분류하고 거부."
    ],
    "analogy": "\"Rolex\"는 스팸 8통 중 1통꼴로, 정상 메일 200통 중 1통꼴로 나옵니다. 25배나 차이가 나니 스팸 쪽으로 강하게 기웁니다.",
    "examples": [
     {
      "title": "계산",
      "code": "p(Rolex) = 250/2000 = 0.125\nq(Rolex) = 5/1000   = 0.005\nr(Rolex) = 0.125 / (0.125 + 0.005) = 0.125 / 0.130",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.962 > 0.9 → 스팸",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "기준이 0.97이라면",
      "code": "0.962 < 0.97 → 스팸으로 분류하지 않음",
      "lang": "",
      "codeLabel": "풀이",
      "out": "기준값에 따라 분류가 달라진다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "p(w) = 250/2000을 계산합니다.",
     "q(w) = 5/1000을 계산합니다.",
     "r(w) = p/(p + q)를 계산합니다.",
     "기준 0.9와 비교합니다."
    ],
    "trap": [
     "원문은 p(Rolex) = 250/2000을 \".0125\"로 적었지만 250/2000 = 0.125입니다. 바로 아래 계산도 0.125를 씁니다.",
     "p와 q의 분모(2000과 1000)가 다르다는 점에 주의하세요."
    ],
    "recap": "r(Rolex) = 0.125/(0.125 + 0.005) ≈ 0.962 > 0.9 → 스팸.",
    "source": "PDF 50쪽"
   },
   "quizzes": [
    [
     "p(Rolex)의 올바른 값은?",
     [
      "0.125",
      "0.0125",
      "250/3000"
     ],
     "250/2000 = 0.125. 원문의 .0125는 오타입니다.",
     [
      "맞습니다.",
      "원문 오타를 그대로 쓴 값입니다.",
      "전체 메일 수로 나눴습니다."
     ]
    ],
    [
     "r(Rolex)는 약?",
     [
      "0.962",
      "0.125",
      "0.714"
     ],
     "0.125/0.13 ≈ 0.962.",
     [
      "맞습니다.",
      "p(Rolex)입니다.",
      "오타 값 0.0125로 계산하면 0.0125/0.0175 ≈ 0.714가 됩니다."
     ]
    ],
    [
     "기준이 0.9일 때 이 메일의 분류는?",
     [
      "스팸",
      "정상",
      "판단 불가"
     ],
     "0.962 > 0.9.",
     [
      "맞습니다.",
      "r이 기준보다 큽니다.",
      "기준과 비교하면 판단할 수 있습니다."
     ]
    ]
   ],
   "review": {
    "original": "Solution: p(Rolex) = 250/2000 = .0125",
    "checked": "250/2000 = 0.125입니다. 바로 아래 r(Rolex) 식에서도 0.125를 사용하므로 \".0125\"는 소수점 위치 오타입니다. 결과 r ≈ 0.962는 맞습니다.",
    "label": "원문 숫자 오타 · 직접 계산",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-50.jpg",
   "text": "Bayesian Spam Filters\n3\nExample: We find that the word “Rolex” occurs in 250 out\nof 2000 spam messages and occurs in 5 out of 1000 nonspam messages. Estimate the probability that an incoming\nmessage is spam. Suppose our threshold for rejecting the\nemail is 0.9.\nSolution: p(Rolex) = 250/2000 =.0125 and\nq(Rolex) = 5/1000 = 0.005.\np ( Rolex)\n0.125\n0.125\nr ( Rolex) =\n=\n=\n 0.962\np ( Rolex) + q ( Rolex ) 0.125 + .005 0.125 + .005\nWe class the message as spam and\nreject the email!",
   "quiz": [
    "p(Rolex)의 올바른 값은?",
    [
     "0.125",
     "0.0125",
     "250/3000"
    ],
    "250/2000 = 0.125. 원문의 .0125는 오타입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "원문 오타를 그대로 쓴 값입니다.",
    "전체 메일 수로 나눴습니다."
   ]
  },
  {
   "page": 51,
   "title": "여러 단어를 쓰는 스팸 필터 1",
   "explanation": "단어 하나보다 여러 단어를 증거로 쓰면 정확도가 높아집니다. 두 단어 w1, w2를 쓸 때, 단어 포함 사건 E1, E2가 (스팸 안에서, 정상 안에서 각각) 독립이라고 단순화하고 p(S) = 1/2을 가정하면 확률을 곱해서 계산할 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "E1 = w1 포함, E2 = w2 포함.",
     "단순화 가정: 사건들이 독립, p(S) = 1/2.",
     "p(S|E1 ∩ E2) = p(E1|S)p(E2|S) / [p(E1|S)p(E2|S) + p(E1|S̄)p(E2|S̄)].",
     "추정값: r(w1, w2) = p(w1)p(w2) / [p(w1)p(w2) + q(w1)q(w2)]."
    ],
    "analogy": "용의자를 판단할 때 단서 하나보다 단서 두 개가 더 확실합니다. 단서들이 서로 상관없다고 가정하면 각 단서의 무게를 곱해서 합칠 수 있습니다.",
    "examples": [
     {
      "title": "단어 하나 vs 두 개 (가상의 값)",
      "code": "w1: p = 0.3, q = 0.1   →  r(w1) = 0.3/0.4 = 0.75\nw2: p = 0.2, q = 0.05  →  r(w2) = 0.2/0.25 = 0.8\n둘 다: r = (0.3)(0.2) / [(0.3)(0.2) + (0.1)(0.05)] = 0.06/0.065",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.923 (각각보다 확신이 커진다)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "단어마다 p(wi), q(wi)를 구합니다.",
     "스팸 쪽 곱 p(w1)p(w2)와 정상 쪽 곱 q(w1)q(w2)를 계산합니다.",
     "r = 스팸 곱 / (스팸 곱 + 정상 곱).",
     "기준값과 비교합니다."
    ],
    "trap": [
     "분모는 p(w1)p(w2) + q(w1)q(w2)입니다. p(w1)q(w2) 같은 섞인 곱은 들어가지 않습니다.",
     "독립 가정은 계산을 쉽게 하려는 단순화입니다. 실제 단어들은 함께 나오는 경향이 있을 수 있습니다."
    ],
    "recap": "r(w1, w2) = p(w1)p(w2) / [p(w1)p(w2) + q(w1)q(w2)] (독립·p(S) = 1/2 가정).",
    "source": "PDF 51쪽"
   },
   "quizzes": [
    [
     "두 단어 스팸 필터 r(w1, w2)의 분모는?",
     [
      "p(w1)p(w2) + q(w1)q(w2)",
      "p(w1)q(w2) + q(w1)p(w2)",
      "p(w1) + p(w2)"
     ],
     "스팸 경로의 곱과 정상 경로의 곱을 더합니다.",
     [
      "맞습니다.",
      "경로가 섞였습니다.",
      "곱이 아니라 합을 썼습니다."
     ]
    ],
    [
     "여러 단어 필터에서 곱셈으로 결합하기 위해 둔 가정은?",
     [
      "단어 포함 사건들이 독립이다",
      "모든 단어의 p(w)가 같다",
      "스팸 메일이 없다"
     ],
     "원문: We make the simplifying assumption that the events are independent.",
     [
      "맞습니다.",
      "단어마다 값이 달라도 됩니다.",
      "근거 없는 가정입니다."
     ]
    ]
   ],
   "image": "pages/dm07-51.jpg",
   "text": "Bayesian Spam Filters using Multiple\nWords\n1\nAccuracy can be improved by considering more than\none word as evidence.\nConsider the case where E1 and E2 denote the events\nthat the message contains the words w1 and w2\nrespectively.\nWe make the simplifying assumption that the events\nare independent. And again we assume that p(S) = ½.\np ( S | E1  E2 ) =\np ( E1 | S ) p ( E2 | S )\n(\np ( w1 ) p ( w2 )\nr ( w1 , w2 ) =\np ( w1 ) p ( w2 ) + q ( w1 ) q ( w2 )\n) (\np ( E1 | S ) p ( E2 | S ) + p E1 | S p E2 | S\n)",
   "quiz": [
    "두 단어 스팸 필터 r(w1, w2)의 분모는?",
    [
     "p(w1)p(w2) + q(w1)q(w2)",
     "p(w1)q(w2) + q(w1)p(w2)",
     "p(w1) + p(w2)"
    ],
    "스팸 경로의 곱과 정상 경로의 곱을 더합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "경로가 섞였습니다.",
    "곱이 아니라 합을 썼습니다."
   ]
  },
  {
   "page": 52,
   "title": "여러 단어를 쓰는 스팸 필터 2: \"stock\"과 \"undervalued\"",
   "explanation": "스팸 2000통, 정상 1000통에서 \"stock\"은 400통·60통, \"undervalued\"는 200통·25통에 나옵니다. 두 단어를 함께 쓰면 r ≈ 0.930이고, 기준 0.9보다 커서 스팸으로 분류합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(stock) = 400/2000 = 0.2, q(stock) = 60/1000 = 0.06.",
     "p(undervalued) = 200/2000 = 0.1, q(undervalued) = 25/1000 = 0.025.",
     "r = (0.2)(0.1) / [(0.2)(0.1) + (0.06)(0.025)] = 0.02/0.0215 ≈ 0.930.",
     "0.930 > 0.9 → 스팸."
    ],
    "analogy": "각 단어만 보면 애매해도, 두 단서가 같은 방향(스팸)을 가리키면 확신이 커집니다.",
    "examples": [
     {
      "title": "계산",
      "code": "스팸 곱 = (0.2)(0.1)   = 0.02\n정상 곱 = (0.06)(0.025) = 0.0015\nr = 0.02 / (0.02 + 0.0015) = 0.02 / 0.0215",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.930 > 0.9 → 스팸",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "단어 하나씩만 쓰면",
      "code": "r(stock) = 0.2/(0.2 + 0.06) ≈ 0.769\nr(undervalued) = 0.1/(0.1 + 0.025) = 0.8",
      "lang": "",
      "codeLabel": "풀이",
      "out": "둘 다 0.9 미만 → 단어 하나로는 스팸으로 분류하지 못한다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "단어별 p, q를 각 모음 크기로 나눠 구합니다.",
     "스팸 곱과 정상 곱을 계산합니다.",
     "r을 계산합니다.",
     "기준 0.9와 비교합니다."
    ],
    "trap": [
     "q(undervalued) = 25/1000 = 0.025입니다(0.25가 아님).",
     "단어 하나씩으로는 기준을 넘지 못해도 두 단어를 합치면 넘을 수 있습니다."
    ],
    "recap": "r(stock, undervalued) = 0.02/0.0215 ≈ 0.930 → 스팸.",
    "source": "PDF 52쪽"
   },
   "quizzes": [
    [
     "r(stock, undervalued)는 약?",
     [
      "0.930",
      "0.769",
      "0.8"
     ],
     "0.02/(0.02 + 0.0015) ≈ 0.930.",
     [
      "맞습니다.",
      "stock 하나만 쓴 값입니다.",
      "undervalued 하나만 쓴 값입니다."
     ]
    ],
    [
     "q(undervalued)의 값은?",
     [
      "0.025",
      "0.25",
      "0.1"
     ],
     "25/1000 = 0.025.",
     [
      "맞습니다.",
      "자릿수를 잘못 셌습니다.",
      "p(undervalued)입니다."
     ]
    ],
    [
     "기준 0.9에서 \"stock\" 한 단어만으로 판단하면?",
     [
      "스팸이 아니다 (r ≈ 0.769)",
      "스팸이다 (r ≈ 0.930)",
      "스팸이다 (r = 0.2)"
     ],
     "r(stock) = 0.2/0.26 ≈ 0.769 < 0.9.",
     [
      "맞습니다.",
      "두 단어를 함께 쓴 값입니다.",
      "p(stock)을 r로 착각했습니다."
     ]
    ]
   ],
   "image": "pages/dm07-52.jpg",
   "text": "Bayesian Spam Filters using Multiple\nWords\n2\nExample: We have 2000 spam messages and 1000 non-spam\nmessages. The word “stock” occurs 400 times in the spam\nmessages and 60 times in the non-spam. The word\n“undervalued” occurs in 200 spam messages and 25 non-spam.\nSolution: p(stock) = 400/2000 = .2, q(stock) = 60/1000=.06,\np(undervalued) = 200/2000 = .1, q(undervalued) = 25/1000 = .025\np ( stock ) p ( undervalued )\nr ( stock , undervalued ) =\np ( stock ) p ( undervalued ) + q ( stock ) q ( undervalued )\n0.2)( 0.1)\n(\n=\n 0.930\n( 0.2)( 0.1) + ( 0.06)( 0.025)\nIf our threshold is .9, we class the message as spam and reject it.",
   "quiz": [
    "r(stock, undervalued)는 약?",
    [
     "0.930",
     "0.769",
     "0.8"
    ],
    "0.02/(0.02 + 0.0015) ≈ 0.930."
   ],
   "quizReasons": [
    "맞습니다.",
    "stock 하나만 쓴 값입니다.",
    "undervalued 하나만 쓴 값입니다."
   ]
  },
  {
   "page": 53,
   "title": "여러 단어를 쓰는 스팸 필터 3: k개 단어",
   "explanation": "단어를 k개로 늘려도 같은 방식입니다. 독립 가정 아래 스팸 쪽 확률들의 곱과 정상 쪽 확률들의 곱을 비교합니다. 단어를 많이 쓸수록 대체로 정확해지고, 단어 쌍을 한 덩어리로 보는 등의 개선도 가능합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(S | E1 ∩ … ∩ Ek) = Π p(Ei|S) / [Π p(Ei|S) + Π p(Ei|S̄)]  (i = 1..k).",
     "r(w1, …, wk) = Π p(wi) / [Π p(wi) + Π q(wi)].",
     "단어가 많을수록 필터가 정확해지는 경향이 있습니다.",
     "추가 개선: 단어 쌍을 하나의 블록으로 보거나 특정 문자열 유형을 고려."
    ],
    "analogy": "증인 여러 명의 진술이 서로 독립이라면, 모두 같은 쪽을 가리킬수록 판단이 확실해집니다.",
    "examples": [
     {
      "title": "세 단어 예 (가상의 값)",
      "code": "p: 0.2, 0.1, 0.3     q: 0.06, 0.025, 0.1\n스팸 곱 = 0.2·0.1·0.3 = 0.006\n정상 곱 = 0.06·0.025·0.1 = 0.00015\nr = 0.006 / (0.006 + 0.00015) = 0.006/0.00615",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≈ 0.976",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "k개 단어의 p(wi), q(wi)를 모두 구합니다.",
     "Π p(wi)와 Π q(wi)를 계산합니다.",
     "r = Π p / (Π p + Π q)."
    ],
    "trap": [
     "원문 식의 분모 첫 곱이 p(E1|S)로 적혀 있는데 Π p(Ei|S)가 맞습니다(첨자 i).",
     "원문 r 식의 분모 둘째 곱이 Π p(wi)로 적혀 있는데 Π q(wi)가 맞습니다. 이대로면 r = 1/2로 항상 같아집니다.",
     "원문 r(w1, w2, …, wn)의 n은 k와 같은 뜻입니다."
    ],
    "recap": "r(w1, …, wk) = Π p(wi) / [Π p(wi) + Π q(wi)].",
    "source": "PDF 53쪽"
   },
   "quizzes": [
    [
     "k개 단어 스팸 필터 r의 분모로 옳은 것은?",
     [
      "Π p(wi) + Π q(wi)",
      "Π p(wi) + Π p(wi)",
      "Σ p(wi) + Σ q(wi)"
     ],
     "스팸 경로 곱과 정상 경로 곱의 합입니다.",
     [
      "맞습니다.",
      "원문 오타를 그대로 쓰면 r이 항상 1/2이 됩니다.",
      "곱이 아니라 합을 썼습니다."
     ]
    ],
    [
     "원문 슬라이드 r 식의 분모를 Π p(wi) + Π p(wi)로 그대로 계산하면 r은?",
     [
      "항상 1/2",
      "항상 1",
      "항상 0"
     ],
     "Π p / (2 Π p) = 1/2.",
     [
      "맞습니다. 그래서 오타임을 알 수 있습니다.",
      "분모가 분자의 두 배입니다.",
      "분자가 0이 아닌 한 0이 아닙니다."
     ]
    ]
   ],
   "review": {
    "original": "p(S | ∩Ei) = Π p(Ei|S) / [Π p(E1|S) + Π p(Ei|S̄)],   r(w1, w2, …, wn) = Π p(wi) / [Π p(wi) + Π p(wi)]",
    "checked": "① 첫 식 분모의 첫 곱은 p(E1|S)가 아니라 p(Ei|S)여야 합니다. ② r 식 분모의 둘째 곱은 정상 메일 쪽이므로 Π q(wi)여야 합니다. 그대로면 r = 1/2로 항상 같아집니다. 두 단어 공식(51쪽) r(w1, w2) = p(w1)p(w2)/[p(w1)p(w2) + q(w1)q(w2)]를 k개로 늘린 것과 대조하면 확인됩니다. ③ r의 인수 wn은 wk와 같은 뜻입니다.",
    "label": "원문 식 오타 의심 · 51쪽 공식과 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-53.jpg",
   "text": "Bayesian Spam Filters using Multiple\nWords\n3\nIn general, the more words we consider, the more\naccurate the spam filter. With the independence\nassumption if we consider k words:\np ( Ei | S )\n\n\n\ni =1\np  S | I Ei  =\n i =1   k p ( E1 | S ) +  k p Ei | S\ni =1\ni =1\nk\nk\n(\nr ( w1 , w2 ,K wn ) =\n\n\nk\ni =1\nk\ni =1\n)\np ( wi )\np ( wi ) +  i =1 p ( wi )\nk\nWe can further improve the filter by considering pairs of words\nas a single block or certain types of strings.",
   "quiz": [
    "k개 단어 스팸 필터 r의 분모로 옳은 것은?",
    [
     "Π p(wi) + Π q(wi)",
     "Π p(wi) + Π p(wi)",
     "Σ p(wi) + Σ q(wi)"
    ],
    "스팸 경로 곱과 정상 경로 곱의 합입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "원문 오타를 그대로 쓰면 r이 항상 1/2이 됩니다.",
    "곱이 아니라 합을 썼습니다."
   ]
  },
  {
   "page": 54,
   "title": "7.4 기댓값과 분산 · 표지",
   "explanation": "7.4절 기댓값과 분산(Expected Value and Variance)이 시작되는 표지입니다.",
   "kind": "structure",
   "role": "절 표지",
   "image": "pages/dm07-54.jpg",
   "text": "Expected Value and\nVariance\nSection 7.4",
   "quiz": null
  },
  {
   "page": 55,
   "title": "7.4절 학습 목록",
   "explanation": "기댓값 → 기댓값의 선형성 → 평균 시간 복잡도 → 기하분포 → 독립 확률변수 → 분산 → 체비쇼프 부등식 순서입니다.",
   "kind": "structure",
   "role": "목차",
   "image": "pages/dm07-55.jpg",
   "text": "Section Summary\n4\nExpected Value\nLinearity of Expectations\nAverage-Case Computational Complexity\nGeometric Distribution\nIndependent Random Variables\nVariance\nChebyshev’s Inequality",
   "quiz": null
  },
  {
   "page": 56,
   "title": "기댓값",
   "explanation": "확률변수 X의 기댓값(평균)은 결과마다 \"X 값 × 그 결과의 확률\"을 모두 더한 값입니다. 실험을 아주 많이 반복했을 때 X 값의 평균이 가까워지는 값이라고 생각하면 됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의: E(X) = Σ(s ∈ S) p(s)·X(s). 기댓값(expected value), 기대값, 평균(mean)이라고도 합니다.",
     "공정한 주사위의 눈 X: 값 1~6이 각각 1/6.",
     "E(X) = 1·(1/6) + 2·(1/6) + … + 6·(1/6) = 21/6 = 7/2.",
     "기댓값이 실제로 나올 수 있는 값일 필요는 없습니다(주사위에서 3.5는 나오지 않음)."
    ],
    "analogy": "시소의 무게중심과 같습니다. 각 값 위치에 확률만큼의 무게를 올려놓으면 균형이 잡히는 지점이 기댓값입니다.",
    "examples": [
     {
      "title": "공정한 주사위",
      "code": "E(X) = (1 + 2 + 3 + 4 + 5 + 6) · (1/6) = 21/6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "7/2 = 3.5",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "편향된 주사위(21쪽: 3이 2/7, 나머지 1/7)",
      "code": "E(X) = (1 + 2 + 4 + 5 + 6)·(1/7) + 3·(2/7)\n     = 18/7 + 6/7 = 24/7",
      "lang": "",
      "codeLabel": "풀이",
      "out": "24/7 ≈ 3.43",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "결과(또는 값)마다 X 값과 확률을 표로 적습니다.",
     "각 행에서 값 × 확률을 계산합니다.",
     "모두 더합니다."
    ],
    "trap": [
     "기댓값은 확률을 가중치로 한 가중평균입니다. 결과 확률이 다르면 단순평균(값의 합 ÷ 개수)과 다릅니다.",
     "원문 식의 Σ 아래 \"x ∈ S\"는 결과를 뜻하는 s ∈ S로 읽으면 됩니다."
    ],
    "recap": "E(X) = Σ p(s)X(s). 공정한 주사위의 기댓값 = 7/2.",
    "source": "PDF 56쪽"
   },
   "quizzes": [
    [
     "공정한 주사위 눈의 기댓값은?",
     [
      "7/2",
      "3",
      "21"
     ],
     "21/6 = 7/2.",
     [
      "맞습니다.",
      "중앙값처럼 어림한 값입니다.",
      "확률을 곱하지 않은 합입니다."
     ]
    ],
    [
     "X가 0을 확률 0.7, 10을 확률 0.3으로 가질 때 E(X)는?",
     [
      "3",
      "5",
      "0.3"
     ],
     "0·0.7 + 10·0.3 = 3.",
     [
      "맞습니다.",
      "두 값의 단순평균입니다.",
      "확률 하나만 쓴 값입니다."
     ]
    ],
    [
     "기댓값에 대한 설명으로 옳은 것은?",
     [
      "확률변수가 실제로 가질 수 없는 값일 수도 있다",
      "항상 가장 자주 나오는 값이다",
      "항상 정수이다"
     ],
     "주사위의 기댓값 3.5는 실제로 나오지 않습니다.",
     [
      "맞습니다.",
      "그것은 최빈값입니다.",
      "3.5처럼 정수가 아닐 수 있습니다."
     ]
    ]
   ],
   "review": {
    "original": "E(X) = Σ_{x ∈ S} p(s) X(s)",
    "checked": "Σ 아래 첨자가 x로 적혀 있지만 더하는 대상은 결과 s이므로 s ∈ S가 맞습니다. 정의 E(X) = Σ_{s∈S} p(s)X(s)로 읽으면 됩니다.",
    "label": "원문 첨자 오타 의심",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-56.jpg",
   "text": "Expected Value\n1\nDefinition: The expected value (or expectation or\nmean) of the random variable X(s) on the sample space\nS is equal to\nE ( X ) =  p ( s) X ( s) .\nx S\nExample-Expected Value of a Die: Let X be the number\nthat comes up when a fair die is rolled. What is the\nexpected value of X?\nSolution: The random variable X takes the values 1, 2,\n3, 4, 5, or 6. Each has probability 1/6. It follows that\n1\n1\n1\n21 7\nE ( X ) = 1 +  2 + L  6 =\n= .\n6\n6\n6\n6 2",
   "quiz": [
    "공정한 주사위 눈의 기댓값은?",
    [
     "7/2",
     "3",
     "21"
    ],
    "21/6 = 7/2."
   ],
   "quizReasons": [
    "맞습니다.",
    "중앙값처럼 어림한 값입니다.",
    "확률을 곱하지 않은 합입니다."
   ]
  },
  {
   "page": 57,
   "title": "기댓값 정리 1: 값별로 묶어서 계산",
   "explanation": "결과마다 더하는 대신, X가 가질 수 있는 값 r별로 묶어서 \"값 × 그 값의 확률\"을 더해도 같은 기댓값이 나옵니다. 결과가 많을 때 훨씬 빠릅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "p(X = r) = Σ(s ∈ S, X(s) = r) p(s): X가 r이 되는 결과들의 확률 합.",
     "정리 1: E(X) = Σ(r ∈ X(S)) p(X = r)·r.",
     "증명 아이디어: 결과별 합 Σ p(s)X(s)에서 X(s) 값이 같은 항끼리 묶으면 r·p(X = r)이 됩니다."
    ],
    "analogy": "동전을 결과별로 세는 대신 \"500원짜리 몇 개, 100원짜리 몇 개\"로 묶어 세는 것과 같습니다. 합계는 같습니다.",
    "examples": [
     {
      "title": "동전 세 번의 앞면 수 X (33쪽 분포)",
      "code": "결과별: 8개 결과 × (1/8) × X값 = (3 + 2+2+2 + 1+1+1 + 0)/8 = 12/8\n값별:   0·(1/8) + 1·(3/8) + 2·(3/8) + 3·(1/8) = 12/8",
      "lang": "",
      "codeLabel": "풀이",
      "out": "E(X) = 3/2",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "주사위 두 개 합의 기댓값",
      "code": "값별: 2·(1/36) + 3·(2/36) + … + 7·(6/36) + … + 12·(1/36) = 252/36",
      "lang": "",
      "codeLabel": "풀이",
      "out": "7",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "X의 분포(값별 확률 표)를 만듭니다.",
     "각 값 r에 p(X = r)를 곱합니다.",
     "모두 더합니다."
    ],
    "trap": [
     "원문 증명의 마지막 식 끝 \"r.s\"는 불필요한 문자입니다. E(X) = Σ p(X = r)·r입니다.",
     "값별로 묶을 때 확률을 더해야 합니다(같은 값을 갖는 결과의 개수만 세면 안 됨)."
    ],
    "recap": "E(X) = Σ r·p(X = r). 분포 표만 있으면 기댓값을 구할 수 있습니다.",
    "source": "PDF 57쪽"
   },
   "quizzes": [
    [
     "동전 세 번의 앞면 수 X의 기댓값은?",
     [
      "3/2",
      "1",
      "2"
     ],
     "0·1/8 + 1·3/8 + 2·3/8 + 3·1/8 = 12/8 = 3/2.",
     [
      "맞습니다.",
      "근거 없는 값입니다.",
      "가장 큰 확률값 중 하나를 고른 것입니다."
     ]
    ],
    [
     "p(X = 1) = 0.2, p(X = 2) = 0.5, p(X = 4) = 0.3일 때 E(X)는?",
     [
      "2.4",
      "7/3",
      "1"
     ],
     "1·0.2 + 2·0.5 + 4·0.3 = 0.2 + 1.0 + 1.2 = 2.4.",
     [
      "맞습니다.",
      "값들의 단순평균입니다.",
      "확률의 합입니다."
     ]
    ]
   ],
   "review": {
    "original": "E(X) = Σ_{r ∈ X(S)} p(X = r) r.s",
    "checked": "식 끝의 \".s\"는 불필요한 문자로 보입니다. 정리 1의 결론 E(X) = Σ_{r∈X(S)} p(X = r)·r과 같습니다.",
    "label": "원문 식 잡문자",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-57.jpg",
   "text": "Expected Value\n2\nTheorem 1: If X is a random variable and p(X = r) is the\nprobability that X = r, so that\np ( X = r ) =  sS , X ( s) = r p ( s ) , then\nE ( X ) =  p ( X = r ) r.\nr X ( S )\nProof: Suppose that X is a random variable with range\nX(S) and let p(X = r) be the probability that X takes the\nvalue r. Consequently, p(X = r) is the sum of the\nprobabilities of the outcomes s such that X(s) = r. Hence,\nE ( X ) =  p ( X = r ) r.s\nr X ( S )",
   "quiz": [
    "동전 세 번의 앞면 수 X의 기댓값은?",
    [
     "3/2",
     "1",
     "2"
    ],
    "0·1/8 + 1·3/8 + 2·3/8 + 3·1/8 = 12/8 = 3/2."
   ],
   "quizReasons": [
    "맞습니다.",
    "근거 없는 값입니다.",
    "가장 큰 확률값 중 하나를 고른 것입니다."
   ]
  },
  {
   "page": 58,
   "title": "기댓값 정리 2: 베르누이 시행의 성공 횟수",
   "explanation": "성공 확률 p인 독립 베르누이 시행을 n번 할 때 성공 횟수의 기댓값은 np입니다. 정리 1에 이항분포 p(X = k) = C(n,k)p^k q^(n−k)를 넣어 증명을 시작합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정리 2: 상호 독립 베르누이 시행 n번(성공 확률 p)에서 성공 횟수의 기댓값 = np.",
     "X = 성공 횟수, p(X = k) = C(n,k)p^k q^(n−k) (7.2절 정리 2).",
     "정리 1에 의해 E(X) = Σ(k=1..n) k·p(X = k)로 시작합니다(k = 0 항은 0이라 생략).",
     "나머지 증명은 59쪽."
    ],
    "analogy": "자유투 성공률 70%인 선수가 10번 던지면 평균 7번 성공한다고 예상하는 것과 같습니다.",
    "examples": [
     {
      "title": "공식 사용",
      "code": "공정한 동전 100번의 앞면 수: np = 100 · 1/2 = 50\n주사위 60번 중 6이 나오는 횟수: np = 60 · 1/6 = 10",
      "lang": "",
      "codeLabel": "풀이",
      "out": "50, 10",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "작은 경우로 확인 (n = 3, p = 1/2)",
      "code": "Σ k·p(X=k) = 0·1/8 + 1·3/8 + 2·3/8 + 3·1/8 = 3/2\nnp = 3 · 1/2 = 3/2  ✓",
      "lang": "",
      "codeLabel": "풀이",
      "out": "정리 2와 일치",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "시행 횟수 n과 성공 확률 p를 확인합니다.",
     "시행이 상호 독립인지 확인합니다.",
     "E(X) = np로 계산합니다."
    ],
    "trap": [
     "원문 정리 2 문장 \"where, the probability of success on each trial, p = np\"는 \"각 시행의 성공 확률이 p일 때, 기댓값은 np\"라는 뜻입니다. p = np라는 등식이 아닙니다."
    ],
    "recap": "이항분포의 기댓값 = np.",
    "source": "PDF 58쪽"
   },
   "quizzes": [
    [
     "성공 확률 0.2인 독립 시행을 50번 할 때 성공 횟수의 기댓값은?",
     [
      "10",
      "0.2",
      "40"
     ],
     "np = 50 · 0.2 = 10.",
     [
      "맞습니다.",
      "한 번의 성공 확률입니다.",
      "실패 횟수의 기댓값 nq입니다."
     ]
    ],
    [
     "정리 2 증명의 출발점은?",
     [
      "E(X) = Σ k·p(X = k)에 이항분포를 넣는다",
      "E(X) = p + q",
      "E(X) = C(n,k)"
     ],
     "정리 1(값별 기댓값)과 7.2절 이항분포를 결합합니다.",
     [
      "맞습니다.",
      "p + q = 1일 뿐입니다.",
      "경우의 수일 뿐입니다."
     ]
    ]
   ],
   "review": {
    "original": "Theorem 2: The expected number of successes when n mutually independent Bernoulli trials are performed, where, the probability of success on each trial, p = np.",
    "checked": "문장이 잘못 이어졌습니다. 의미는 \"각 시행의 성공 확률이 p일 때, 성공 횟수의 기댓값은 np이다\"입니다. p = np라는 등식으로 읽으면 안 됩니다.",
    "label": "원문 문장 오류 · 문맥으로 보충",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-58.jpg",
   "text": "Expected Value\n3\nTheorem 2: The expected number of successes when n\nmutually independent Bernoulli trials are performed,\nwhere, the probability of success on each trial, p = np.\nProof: Let X be the random variable equal to the\nnumber of success in n trials. By Theorem 2 of section\n7.2, p(X = k) = C(n,k)pkqn−k. Hence,\nn\nE ( X ) =  kp ( X = k ) by Theorem 1\nk =1",
   "quiz": [
    "성공 확률 0.2인 독립 시행을 50번 할 때 성공 횟수의 기댓값은?",
    [
     "10",
     "0.2",
     "40"
    ],
    "np = 50 · 0.2 = 10."
   ],
   "quizReasons": [
    "맞습니다.",
    "한 번의 성공 확률입니다.",
    "실패 횟수의 기댓값 nq입니다."
   ]
  },
  {
   "page": 59,
   "title": "정리 2의 증명: np 유도",
   "explanation": "이항분포의 기댓값 Σ k·C(n,k)p^k q^(n−k)를 정리해 np를 얻는 과정입니다. 핵심은 k·C(n,k) = n·C(n−1, k−1)이라는 항등식과, 첨자를 j = k − 1로 바꾼 뒤 이항정리를 쓰는 것입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "① E(X) = Σ(k=1..n) k·C(n,k)p^k q^(n−k).",
     "② k·C(n,k) = n·C(n−1, k−1) (6.4절 연습문제 21).",
     "③ np를 밖으로: np·Σ(k=1..n) C(n−1, k−1)p^(k−1) q^(n−k).",
     "④ j = k − 1로 바꾸기: np·Σ(j=0..n−1) C(n−1, j)p^j q^(n−1−j).",
     "⑤ 이항정리: Σ = (p + q)^(n−1) = 1 → E(X) = np."
    ],
    "analogy": "\"n명 중 k명의 대표를 뽑고 그중 회장 1명을 정하기(k·C(n,k))\"는 \"회장을 먼저 n명 중 뽑고 나머지 n−1명 중 대표 k−1명 뽑기(n·C(n−1,k−1))\"와 같은 수입니다.",
    "examples": [
     {
      "title": "항등식 확인 (n = 5, k = 2)",
      "code": "k·C(n,k) = 2·C(5,2) = 2·10 = 20\nn·C(n−1,k−1) = 5·C(4,1) = 5·4 = 20",
      "lang": "",
      "codeLabel": "풀이",
      "out": "같다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "④ → ⑤",
      "code": "Σ(j=0..n−1) C(n−1,j) p^j q^(n−1−j) = (p + q)^(n−1)  (이항정리)\n= 1^(n−1) = 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "E(X) = np · 1 = np",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "정리 1로 기댓값을 합으로 씁니다.",
     "k·C(n,k)를 n·C(n−1, k−1)로 바꿉니다.",
     "공통인 np를 합 밖으로 꺼냅니다.",
     "j = k − 1로 첨자를 바꿔 이항정리 꼴을 만듭니다.",
     "(p + q)^(n−1) = 1을 써서 np를 얻습니다."
    ],
    "trap": [
     "원문의 \"= np(p + 1)^(n−1)\"은 오타로 보입니다. 이항정리로 나오는 값은 (p + q)^(n−1)이고, 다음 줄 \"because p + q = 1\"과도 맞습니다.",
     "첨자를 바꾸면 합의 범위도 k = 1..n → j = 0..n−1로 바뀝니다."
    ],
    "recap": "k·C(n,k) = n·C(n−1,k−1) → np를 꺼내고 → 이항정리 (p+q)^(n−1) = 1 → E(X) = np.",
    "source": "PDF 59쪽"
   },
   "quizzes": [
    [
     "증명에서 쓰인 항등식 k·C(n,k)와 같은 것은?",
     [
      "n·C(n−1, k−1)",
      "n·C(n, k−1)",
      "k·C(n−1, k)"
     ],
     "6.4절 연습문제 21의 항등식입니다.",
     [
      "맞습니다.",
      "n − 1이 아니라 n을 썼습니다.",
      "항등식이 아닙니다."
     ]
    ],
    [
     "증명의 마지막 합 Σ(j=0..n−1) C(n−1,j)p^j q^(n−1−j)의 값은?",
     [
      "(p + q)^(n−1) = 1",
      "(p + 1)^(n−1)",
      "n"
     ],
     "이항정리에 의해 (p + q)^(n−1)이고, p + q = 1입니다.",
     [
      "맞습니다.",
      "원문 오타를 그대로 쓴 식입니다.",
      "근거 없는 값입니다."
     ]
    ]
   ],
   "review": {
    "original": "= np(p + 1)^(n−1)   by the binomial theorem",
    "checked": "이항정리로 Σ C(n−1,j)p^j q^(n−1−j) = (p + q)^(n−1)입니다. 다음 줄의 이유 \"because p + q = 1\"과 맞추려면 (p + q)^(n−1)이어야 하므로 (p + 1)은 오타로 보입니다.",
    "label": "원문 식 오타 의심 · 이항정리와 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-59.jpg",
   "text": "Expected Value\n4\nn\nE ( X ) =  kp ( X = k )\nfrom previous page\nk =1\nn\n=  kC ( n, k ) p k q n − k\nby Theorem 2 in Section 7.2\nk =1\nn\n=  nC ( n − 1, k − 1) p k q n − k\nby Exercise 21 in Section 6.4\nk =1\nn\n= np  C ( n − 1, k − 1) p k −1q n − k\nfactoringnpfrom each term\nk =1\nn −1\n= np  C ( n − 1, j ) p j q n −1− j\nshifting index of summation with j = k −1\n= np ( p + 1)\nby the binomialtheom\nj =0\n= np.\nn −1\nbecause p + q = 1\nWe see that the expected number of successes in n mutually\nindependent Bernoulli trials is np.",
   "quiz": [
    "증명에서 쓰인 항등식 k·C(n,k)와 같은 것은?",
    [
     "n·C(n−1, k−1)",
     "n·C(n, k−1)",
     "k·C(n−1, k)"
    ],
    "6.4절 연습문제 21의 항등식입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "n − 1이 아니라 n을 썼습니다.",
    "항등식이 아닙니다."
   ]
  },
  {
   "page": 60,
   "title": "기댓값의 선형성",
   "explanation": "기댓값은 선형입니다. 여러 확률변수 합의 기댓값은 각 기댓값의 합이고, aX + b의 기댓값은 aE(X) + b입니다. 확률변수들이 독립이 아니어도 성립한다는 점이 강력합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정리 3 (i): E(X1 + X2 + … + Xn) = E(X1) + E(X2) + … + E(Xn).",
     "정리 3 (ii): E(aX + b) = aE(X) + b (a, b는 실수).",
     "독립 가정이 필요 없습니다.",
     "증명은 교재 참고(슬라이드에는 없음)."
    ],
    "analogy": "두 반의 점수를 합친 총점의 평균은 각 반 평균 점수의 합과 같습니다. 반끼리 서로 영향을 주더라도 마찬가지입니다.",
    "examples": [
     {
      "title": "주사위 두 개 합의 기댓값",
      "code": "X1, X2 = 각 주사위의 눈, E(Xi) = 7/2\nE(X1 + X2) = 7/2 + 7/2 = 7",
      "lang": "",
      "codeLabel": "풀이",
      "out": "7 (57쪽의 252/36 계산과 같다)",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "aX + b",
      "code": "주사위 눈 X에 대해 Y = 2X + 1\nE(Y) = 2·(7/2) + 1",
      "lang": "",
      "codeLabel": "풀이",
      "out": "8",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "구하려는 확률변수를 간단한 확률변수들의 합으로 나눕니다.",
     "각 부분의 기댓값을 구합니다.",
     "더합니다(독립 여부를 확인할 필요 없음)."
    ],
    "trap": [
     "선형성은 합에 대한 성질입니다. 곱 E(XY) = E(X)E(Y)는 독립일 때만 성립합니다(70쪽).",
     "E(aX + b) = aE(X) + b에서 b도 그대로 더해집니다."
    ],
    "recap": "E(ΣXi) = ΣE(Xi), E(aX + b) = aE(X) + b. 독립이 아니어도 성립.",
    "source": "PDF 60쪽"
   },
   "quizzes": [
    [
     "주사위 세 개 눈의 합의 기댓값은?",
     [
      "21/2",
      "7/2",
      "18"
     ],
     "3 · 7/2 = 21/2.",
     [
      "맞습니다.",
      "주사위 하나의 기댓값입니다.",
      "최댓값입니다."
     ]
    ],
    [
     "E(X) = 4일 때 E(3X − 2)는?",
     [
      "10",
      "12",
      "4"
     ],
     "3·4 − 2 = 10.",
     [
      "맞습니다.",
      "−2를 빼먹었습니다.",
      "변환을 적용하지 않았습니다."
     ]
    ],
    [
     "E(X + Y) = E(X) + E(Y)가 성립하는 조건은?",
     [
      "항상 성립한다",
      "X, Y가 독립일 때만",
      "X, Y가 같은 분포일 때만"
     ],
     "기댓값의 선형성은 독립 가정이 필요 없습니다.",
     [
      "맞습니다.",
      "독립이 필요한 것은 E(XY) = E(X)E(Y)입니다.",
      "분포가 달라도 성립합니다."
     ]
    ]
   ],
   "image": "pages/dm07-60.jpg",
   "text": "Linearity of Expectations\n1\nThe following theorem tells us that expected values are\nlinear. For example, the expected value of the sum of\nrandom variables is the sum of their expected values.\nTheorem 3: If Xi, i = 1, 2, …,n with n a positive integer,\nare random variables on S, and if a and b are real\nnumbers, then\n( i) E ( X1 + X 2 + K + X n ) = E ( X1 ) + E ( X 2 ) + K + E ( X n )\n( ii ) E ( aX + b) = aE ( X ) + b.\nsee the text for the proof",
   "quiz": [
    "주사위 세 개 눈의 합의 기댓값은?",
    [
     "21/2",
     "7/2",
     "18"
    ],
    "3 · 7/2 = 21/2."
   ],
   "quizReasons": [
    "맞습니다.",
    "주사위 하나의 기댓값입니다.",
    "최댓값입니다."
   ]
  },
  {
   "page": 61,
   "title": "선형성 응용 1: 모자 돌려주기 문제",
   "explanation": "모자 보관 번호표를 잃어버린 직원이 n명의 손님에게 모자를 무작위로 돌려줍니다. 자기 모자를 받는 사람 수의 기댓값은? Xi(i번째 사람이 자기 모자를 받으면 1)로 나누면 각 기댓값이 1/n이고, 합하면 정확히 1입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "X = 자기 모자를 받은 사람 수 = X1 + X2 + … + Xn.",
     "Xi = 1 (i번째 사람이 자기 모자를 받음), 0 (아님) — 지시 확률변수.",
     "p(Xi = 1) = 1/n → E(Xi) = 1·(1/n) + 0·p(Xi = 0) = 1/n.",
     "선형성: E(X) = n·(1/n) = 1. 사람 수 n과 무관하게 평균 1명!"
    ],
    "analogy": "Xi는 \"맞으면 1점, 아니면 0점\"짜리 채점표입니다. 각 사람의 기대 점수를 더하면 전체 기대 점수가 됩니다. Xi들이 서로 독립이 아니어도 선형성은 쓸 수 있습니다.",
    "examples": [
     {
      "title": "n = 3으로 직접 확인",
      "code": "돌려주는 방법 3! = 6가지 (손님 1,2,3에게 준 모자 번호)\n123 → 3명   132 → 1명   213 → 1명\n231 → 0명   312 → 0명   321 → 1명\n평균 = (3 + 1 + 1 + 0 + 0 + 1)/6 = 6/6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1 (공식과 일치)",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "지시 확률변수의 기댓값",
      "code": "E(Xi) = 1·p(Xi = 1) + 0·p(Xi = 0) = p(Xi = 1)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "지시 확률변수의 기댓값 = 그 사건의 확률",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "세고 싶은 양을 \"사람마다 0 또는 1\"인 지시 확률변수의 합으로 씁니다.",
     "각 Xi의 기댓값 = p(Xi = 1) = 1/n.",
     "선형성으로 더합니다: n·(1/n) = 1."
    ],
    "trap": [
     "원문 마지막 식 \"n·1/n − 1\"은 \"n·(1/n) = 1\"의 오타입니다(결론도 \"exactly 1\").",
     "Xi들은 독립이 아닙니다(앞사람들이 모두 자기 모자를 받으면 마지막 사람도 반드시 받음). 그래도 선형성은 성립합니다."
    ],
    "recap": "지시 확률변수 + 선형성: E(X) = Σ p(Xi = 1) = n·(1/n) = 1.",
    "source": "PDF 61쪽"
   },
   "quizzes": [
    [
     "모자 돌려주기 문제에서 자기 모자를 받는 사람 수의 기댓값은?",
     [
      "1",
      "n/2",
      "1/n"
     ],
     "n·(1/n) = 1.",
     [
      "맞습니다.",
      "근거 없는 값입니다.",
      "한 사람이 자기 모자를 받을 확률입니다."
     ]
    ],
    [
     "지시 확률변수 Xi(사건 A가 일어나면 1, 아니면 0)의 기댓값은?",
     [
      "p(A)",
      "1",
      "1/2"
     ],
     "E(Xi) = 1·p(A) + 0·p(Ā) = p(A).",
     [
      "맞습니다.",
      "항상 1은 아닙니다.",
      "사건 확률이 1/2일 때만입니다."
     ]
    ],
    [
     "손님이 100명이면 자기 모자를 받는 사람 수의 기댓값은?",
     [
      "1",
      "100",
      "0.01"
     ],
     "원문: this answer remains the same no matter how many people have checked their hats.",
     [
      "맞습니다.",
      "모두 받는 경우의 값입니다.",
      "한 사람이 받을 확률입니다."
     ]
    ]
   ],
   "review": {
    "original": "E(X) = E(X1) + E(X2) + ··· + E(Xn) = n · 1/n − 1.",
    "checked": "n개의 1/n을 더하면 n·(1/n) = 1입니다. 바로 아래 결론 \"the average number of people who receive the correct hat is exactly 1\"과도 맞으므로 \"− 1\"은 \"= 1\"의 오타로 보입니다.",
    "label": "원문 식 오타 의심 · 직접 계산",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-61.jpg",
   "text": "Linearity of Expectations\n2\nExpected Value in the Hatcheck Problem: A new employee started a job checking\nhats, but forgot to put the claim check numbers on the hats. So, the n customers just\nreceive a random hat from those remaining. What is the expected number of hat\nreturned correctly?\nSolution: Let X be the random variable that equals the number of people who receive\nthe correct hat. Note that X = X1 + X2 + ∙∙∙ + Xn,\nwhere Xi = 1 if the ith person receives the hat and Xi = 0 otherwise.\n•\nBecause it is equally likely that the checker returns any of the hats to the ith person, it\nfollows that the probability that the ith person receives the correct hat is 1/n. Consequently\n(by Theorem 1), for all I\nE ( X i ) = 1 p ( X i = 1) + 0  p ( X i = 0) = 11/ n + 0 = 1/ n.\n•\nBy the linearity of expectations (Theorem 3), it follows that:\nE ( X ) = E ( X 1 ) + E ( X 2 ) + L + E ( X n ) = n 1/ n − 1.\nConsequently, the average number of people who receive the correct hat is exactly 1.\n( Surprisingly, this answer remains the same no matter how many people have\nchecked their hats!)",
   "quiz": [
    "모자 돌려주기 문제에서 자기 모자를 받는 사람 수의 기댓값은?",
    [
     "1",
     "n/2",
     "1/n"
    ],
    "n·(1/n) = 1."
   ],
   "quizReasons": [
    "맞습니다.",
    "근거 없는 값입니다.",
    "한 사람이 자기 모자를 받을 확률입니다."
   ]
  },
  {
   "page": 62,
   "title": "선형성 응용 2: 순열의 역순 쌍 개수",
   "explanation": "1~n의 순열에서 i < j인데 j가 i보다 앞에 오는 쌍 (i, j)를 역순(inversion)이라고 합니다. 무작위 순열의 평균 역순 개수는 쌍마다 지시 확률변수를 두고 선형성을 쓰면 n(n − 1)/4입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "역순: i < j이고 순열에서 j가 i보다 앞에 있는 쌍 (i, j).",
     "예: 3, 5, 1, 4, 2의 역순 6개 → (1,3), (1,5), (2,3), (2,4), (2,5), (4,5).",
     "Ii,j = 1 ((i, j)가 역순), 0 (아님). X = Σ(1 ≤ i < j ≤ n) Ii,j.",
     "i가 앞일 확률 = j가 앞일 확률 → E(Ii,j) = 1/2.",
     "쌍의 수 C(n,2) → E(X) = C(n,2)·(1/2) = n(n − 1)/4."
    ],
    "analogy": "줄을 무작위로 세우면 어떤 두 사람이든 \"키 작은 사람이 앞\"일 확률과 \"키 큰 사람이 앞\"일 확률이 반반입니다. 그래서 전체 쌍의 절반 정도가 \"뒤집힌\" 상태입니다.",
    "examples": [
     {
      "title": "3, 5, 1, 4, 2의 역순 찾기",
      "code": "3 뒤의 더 작은 수: 1, 2         → (1,3), (2,3)\n5 뒤의 더 작은 수: 1, 4, 2      → (1,5), (4,5), (2,5)\n1 뒤의 더 작은 수: 없음\n4 뒤의 더 작은 수: 2            → (2,4)\n합 2 + 3 + 0 + 1 = 6",
      "lang": "",
      "codeLabel": "풀이",
      "out": "6개",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "평균 역순 개수",
      "code": "n = 5: C(5,2)·(1/2) = 10/2 = 5\n일반: C(n,2)/2 = n(n − 1)/4",
      "lang": "",
      "codeLabel": "풀이",
      "out": "n = 5이면 평균 5개",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "역순 개수를 쌍마다의 지시 확률변수 합으로 씁니다.",
     "한 쌍이 역순일 확률(대칭성으로 1/2)을 구합니다.",
     "쌍의 개수 C(n,2)를 곱합니다(선형성).",
     "n(n − 1)/2 · 1/2 = n(n − 1)/4."
    ],
    "trap": [
     "역순은 (작은 수, 큰 수) 순서쌍으로 적습니다. (3,1)이 아니라 (1,3)입니다.",
     "원문 중간 식 \"(n − 1)/2 · 1/2\"에는 n이 빠져 보입니다. C(n,2) = n(n − 1)/2이고, 결론 n(n − 1)/4가 맞습니다."
    ],
    "recap": "평균 역순 개수 = C(n,2)·(1/2) = n(n − 1)/4.",
    "source": "PDF 62쪽"
   },
   "quizzes": [
    [
     "순열 2, 3, 1의 역순 개수는?",
     [
      "2",
      "1",
      "3"
     ],
     "2 뒤에 더 작은 1이 있어 (1,2), 3 뒤에 더 작은 1이 있어 (1,3). 모두 2개입니다.",
     [
      "맞습니다.",
      "하나를 빠뜨렸습니다.",
      "(2,3)은 역순이 아닙니다(2가 3 앞)."
     ]
    ],
    [
     "1~n의 무작위 순열에서 평균 역순 개수는?",
     [
      "n(n − 1)/4",
      "n(n − 1)/2",
      "(n − 1)/4"
     ],
     "C(n,2)·(1/2) = n(n − 1)/4.",
     [
      "맞습니다.",
      "가능한 최대 역순 개수(완전히 거꾸로)입니다.",
      "n을 빠뜨렸습니다(원문 중간 식 주의)."
     ]
    ],
    [
     "E(Ii,j) = 1/2인 이유는?",
     [
      "무작위 순열에서 i가 앞일 확률과 j가 앞일 확률이 같아서",
      "i와 j가 독립이어서",
      "역순 쌍이 전체의 절반으로 고정되어서"
     ],
     "대칭성: i가 앞인 순열과 j가 앞인 순열이 일대일로 대응합니다.",
     [
      "맞습니다.",
      "독립성은 근거가 아닙니다.",
      "역순 개수는 순열마다 다릅니다."
     ]
    ]
   ],
   "review": {
    "original": "E(X) = Σ E(Ii,j) = C(n,2) · 1/2 = (n − 1)/2 · 1/2.",
    "checked": "C(n,2) = n(n − 1)/2이므로 중간 식은 n(n − 1)/2 · 1/2이어야 합니다. 분자의 n이 빠진 것으로 보이며, 결론 \"average of n(n − 1)/4 inversions\"는 맞습니다.",
    "label": "원문 식 누락 의심 · 직접 계산",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-62.jpg",
   "text": "Linearity of Expectations\n3\nExpected Number of Inversions in a Permutation: The ordered pair (i,j) is an inversion in\na permutation of the first n positive integers if i < j, but j precedes i in the permutation.\nExample: There are six inversions in the permutation of 3,5, 1, 4, 2\n(1, 3), (1, 5), (2, 3), (2, 4), (2, 5), (4, 5).\nFind the average number of inversions in a random permutation of the first n integers.\nSolution: Let Ii,j be the random variable on the set of all permutations of the first n\npositive integers with Ii,j = 1 if (i,j) is an inversion of the permutation and Ii,j = 0\notherwise. If X is the random variable equal to the number of inversions in the\npermutation, then\nX=\nI .\n\ni, j\n1 i  j  n\n•\nSince it is equally likely for i to precede j in a randomly chosen permutation as it is for j to\nprecede i, we have: E(Ii,j) = 1 ∙p(Ii ,j = 1) + 0 ∙p(Ii,j = 0) = 1 ∙ 1/2 + 0 = ½, for all (i,j) .\n•\nBecause there are  2 pairs i and j with 1 ≤ i < j ≤ n, by the linearity of expectations\n n\n(Theorem 3), we have:\n n 1 n − 1 1\nE ( X ) =  E Ii, j =    =\n .\n2\n\n\n2\n2\n2\n1 i  j  n\n( )\nConsequently, it follows that there is an average of n(n −1)/4 inversions in a random\npermutation of the first n positive integers.",
   "quiz": [
    "순열 2, 3, 1의 역순 개수는?",
    [
     "2",
     "1",
     "3"
    ],
    "2 뒤에 더 작은 1이 있어 (1,2), 3 뒤에 더 작은 1이 있어 (1,3). 모두 2개입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "하나를 빠뜨렸습니다.",
    "(2,3)은 역순이 아닙니다(2가 3 앞)."
   ]
  },
  {
   "page": 63,
   "title": "평균 시간 복잡도",
   "explanation": "알고리즘의 평균 시간 복잡도는 기댓값으로 구합니다. 입력 aj마다 연산 횟수 X(aj)와 그 입력이 나올 확률 p(aj)를 정하면, 평균 연산 횟수는 E(X) = Σ p(aj)X(aj)입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "표본공간 = 가능한 입력들 a1, …, an.",
     "확률변수 X(aj) = 입력 aj에서 알고리즘이 쓰는 연산 횟수.",
     "각 입력에 확률 p(aj)를 배정합니다.",
     "평균 시간 복잡도 = E(X) = Σ(j=1..n) p(aj)X(aj)."
    ],
    "analogy": "버스로 출근하는 평균 시간은 \"막히는 날 시간 × 막히는 날 확률 + 안 막히는 날 시간 × 그 확률\"입니다. 입력(날씨·요일)마다 걸리는 시간이 달라도 평균은 기댓값입니다.",
    "examples": [
     {
      "title": "간단한 예",
      "code": "입력 유형  확률  연산 횟수\n   A       0.5     10\n   B       0.3     20\n   C       0.2     50\nE(X) = 0.5·10 + 0.3·20 + 0.2·50 = 5 + 6 + 10",
      "lang": "",
      "codeLabel": "풀이",
      "out": "평균 21번",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "입력을 유형별로 나눕니다(연산 횟수가 같은 입력끼리).",
     "유형마다 연산 횟수와 확률을 정합니다.",
     "기댓값 공식으로 더합니다."
    ],
    "trap": [
     "평균 복잡도는 최악의 경우(가장 큰 연산 횟수)와 다릅니다. 입력 분포 가정에 따라 값이 달라집니다."
    ],
    "recap": "평균 시간 복잡도 = 연산 횟수 X의 기댓값 Σ p(aj)X(aj).",
    "source": "PDF 63쪽"
   },
   "quizzes": [
    [
     "평균 시간 복잡도를 구하는 식은?",
     [
      "Σ p(aj)X(aj)",
      "max X(aj)",
      "Σ X(aj)"
     ],
     "입력 확률을 가중치로 한 연산 횟수의 기댓값입니다.",
     [
      "맞습니다.",
      "최악의 경우 복잡도입니다.",
      "확률을 곱하지 않았습니다."
     ]
    ],
    [
     "입력 유형 두 개가 각각 확률 0.5이고 연산 횟수가 4번, 10번이면 평균 연산 횟수는?",
     [
      "7",
      "10",
      "14"
     ],
     "0.5·4 + 0.5·10 = 7.",
     [
      "맞습니다.",
      "최악의 경우입니다.",
      "확률을 곱하지 않은 합입니다."
     ]
    ]
   ],
   "image": "pages/dm07-63.jpg",
   "text": "Average-Case Computational\nComplexity\nThe average-case computational complexity\nof an algorithm can be found by computing the\nexpected value of a random variable.\nLet the sample space of an experiment be the set of possible\ninputs aj, j = 1, 2, …,n, and let the random variable X be the\nassignment to aj of the number of operations used by the\nalgorithm when given aj as input.\nAssign a probability p(aj) to each possible input value aj.\nThe expected value of X is the average-case computational\ncomplexity of the algorithm.\nn\nE( X ) =  p aj X aj .\nj =1\n( ) ( )",
   "quiz": [
    "평균 시간 복잡도를 구하는 식은?",
    [
     "Σ p(aj)X(aj)",
     "max X(aj)",
     "Σ X(aj)"
    ],
    "입력 확률을 가중치로 한 연산 횟수의 기댓값입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "최악의 경우 복잡도입니다.",
    "확률을 곱하지 않았습니다."
   ]
  },
  {
   "page": 64,
   "title": "선형 탐색의 평균 복잡도 1: 문제와 알고리즘",
   "explanation": "x가 리스트에 있을 확률이 p이고, 있다면 n개 원소 중 어느 것이든 똑같이 일어날 법할 때 선형 탐색의 평균 비교 횟수를 구합니다. 먼저 3장의 선형 탐색 알고리즘을 다시 봅니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "선형 탐색: i = 1부터 차례로 \"i ≤ n 그리고 x ≠ ai\"를 검사하며 i를 늘립니다.",
     "찾으면 위치 i, 못 찾으면 0을 반환합니다.",
     "조건: p(x가 리스트에 있음) = p, 있다면 각 위치일 확률 p/n.",
     "비교 횟수 계산은 65쪽."
    ],
    "analogy": "책장 맨 왼쪽부터 한 권씩 제목을 확인하는 것과 같습니다. 찾는 책이 앞쪽에 있을수록 빨리 끝납니다.",
    "examples": [
     {
      "title": "알고리즘(원문)",
      "code": "procedure linear search(x: integer, a1, a2, …, an: distinct integers)\ni := 1\nwhile (i ≤ n and x ≠ ai)\n    i := i + 1\nif i ≤ n then location := i\nelse location := 0\nreturn location",
      "lang": "",
      "codeLabel": "의사코드",
      "out": "찾은 위치 또는 0",
      "note": "",
      "error": false,
      "outLabel": "반환값"
     }
    ],
    "steps": [
     "while 조건에 비교가 두 개(i ≤ n, x ≠ ai) 있다는 점을 확인합니다.",
     "루프가 끝난 뒤 if i ≤ n에서 비교가 하나 더 있습니다.",
     "x가 i번째에 있을 때와 없을 때의 비교 횟수를 다음 쪽에서 셉니다."
    ],
    "trap": [
     "여기서 \"비교\"는 x ≠ ai만이 아니라 i ≤ n 같은 경계 검사도 포함합니다."
    ],
    "recap": "선형 탐색의 평균 비교 횟수 문제: 있을 확률 p, 각 위치 p/n, 없을 확률 q = 1 − p.",
    "source": "PDF 64쪽"
   },
   "quizzes": [
    [
     "x가 리스트에 있을 확률이 p이고 위치가 균등할 때, x가 3번째 원소일 확률은?",
     [
      "p/n",
      "1/n",
      "p"
     ],
     "리스트에 있을 확률 p를 n개 위치에 똑같이 나눕니다.",
     [
      "맞습니다.",
      "x가 반드시 있을 때(p = 1)만 맞습니다.",
      "리스트 어딘가에 있을 확률입니다."
     ]
    ],
    [
     "선형 탐색에서 x가 리스트에 없을 때 반환값은?",
     [
      "0",
      "n",
      "n + 1"
     ],
     "else location := 0.",
     [
      "맞습니다.",
      "마지막 위치입니다.",
      "루프 종료 시 i 값이지만 반환값은 아닙니다."
     ]
    ]
   ],
   "image": "pages/dm07-64.jpg",
   "text": "Average-Case Complexity of Linear\nSearch\n1\nWhat is the average-case complexity of linear\nsearch (described in Chapter 3) if the probability\nthat x is in the list is p and it is equally likely that\nx is any of the n elements of the list?\nprocedure linear search(x: integer, a1, a2, …,an: distinct integers)\ni := 1\nwhile (i ≤ n and x ≠ ai)\ni := i + 1\nif i ≤ n then location := i\nelse location := 0\nreturn location{location is the subscript of the term that equals x, or is 0 if x is\nnot found}",
   "quiz": [
    "x가 리스트에 있을 확률이 p이고 위치가 균등할 때, x가 3번째 원소일 확률은?",
    [
     "p/n",
     "1/n",
     "p"
    ],
    "리스트에 있을 확률 p를 n개 위치에 똑같이 나눕니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "x가 반드시 있을 때(p = 1)만 맞습니다.",
    "리스트 어딘가에 있을 확률입니다."
   ]
  },
  {
   "page": 65,
   "title": "선형 탐색의 평균 복잡도 2: 계산",
   "explanation": "입력 유형은 n + 1가지(x = ai인 n가지 + 리스트에 없음)입니다. x = ai이면 2i + 1번, 없으면 2n + 2번 비교합니다. 기댓값을 정리하면 E = p(n + 2) + (2n + 2)q입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "x = ai: 비교 2i + 1번, 확률 p/n.",
     "x가 없음: 비교 2n + 2번, 확률 q = 1 − p.",
     "E = (p/n)(3 + 5 + … + (2n + 1)) + (2n + 2)q.",
     "3 + 5 + … + (2n + 1) = (n + 1)^2 − 1 (5.1절 예제 2) → E = p(n + 2) + (2n + 2)q.",
     "특수한 경우: p = 1 → n + 2,  p = 1/2 → (3n + 4)/2,  p = 3/4 → (5n + 8)/4,  p = 0 → 2n + 2."
    ],
    "analogy": "뒤쪽에 있을수록, 혹은 아예 없을수록 오래 걸립니다. 평균은 \"있을 때의 평균 시간\"과 \"없을 때의 시간\"을 확률로 섞은 것입니다.",
    "examples": [
     {
      "title": "합 정리",
      "code": "(p/n)·((n + 1)^2 − 1) = (p/n)·(n^2 + 2n) = p(n + 2)\nE = p(n + 2) + (2n + 2)q",
      "lang": "",
      "codeLabel": "풀이",
      "out": "E = p(n + 2) + (2n + 2)q",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "p = 3/4, q = 1/4",
      "code": "E = (3/4)(n + 2) + (1/4)(2n + 2)\n  = (3n + 6)/4 + (2n + 2)/4\n  = (5n + 8)/4",
      "lang": "",
      "codeLabel": "풀이",
      "out": "(5n + 8)/4",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "입력 유형별 비교 횟수와 확률을 표로 정리합니다.",
     "기댓값 식을 씁니다.",
     "홀수 합 3 + 5 + … + (2n + 1) = (n + 1)^2 − 1을 써서 정리합니다.",
     "주어진 p, q를 대입합니다."
    ],
    "trap": [
     "원문의 p = 3/4 줄은 \"(n + 2)/4 + (n + 1)/2\"로 적혀 있지만 첫 항은 3(n + 2)/4가 맞습니다. 최종값 (5n + 8)/4는 맞습니다.",
     "홀수 합은 3부터 시작합니다(i = 1일 때 2·1 + 1 = 3)."
    ],
    "recap": "선형 탐색 평균 비교 횟수 E = p(n + 2) + (2n + 2)q.",
    "source": "PDF 65쪽"
   },
   "quizzes": [
    [
     "x가 반드시 리스트에 있을 때(p = 1) 선형 탐색의 평균 비교 횟수는?",
     [
      "n + 2",
      "2n + 2",
      "(3n + 4)/2"
     ],
     "q = 0이므로 E = n + 2.",
     [
      "맞습니다.",
      "x가 없을 때(p = 0)의 값입니다.",
      "p = 1/2일 때의 값입니다."
     ]
    ],
    [
     "x가 리스트의 i번째 원소일 때 비교 횟수는?",
     [
      "2i + 1",
      "2i",
      "i"
     ],
     "원문: 2i + 1 comparisons are needed if x equals the ith element.",
     [
      "맞습니다.",
      "마지막 if 비교 하나를 빠뜨렸습니다.",
      "x ≠ ai 비교만 센 값입니다."
     ]
    ],
    [
     "p = 1/2일 때 평균 비교 횟수는?",
     [
      "(3n + 4)/2",
      "(5n + 8)/4",
      "n + 2"
     ],
     "(1/2)(n + 2) + (1/2)(2n + 2) = (3n + 4)/2.",
     [
      "맞습니다.",
      "p = 3/4일 때의 값입니다.",
      "p = 1일 때의 값입니다."
     ]
    ]
   ],
   "review": {
    "original": "When p is ¾ and q = ¼ then E = (n + 2)/4 + (n + 1)/2 = (5n + 8)/4.",
    "checked": "E = p(n + 2) + (2n + 2)q에 p = 3/4, q = 1/4를 넣으면 3(n + 2)/4 + (n + 1)/2입니다. 원문 첫 항에 3이 빠졌습니다. 3(n + 2)/4 + (n + 1)/2 = (3n + 6 + 2n + 2)/4 = (5n + 8)/4로 최종값은 맞습니다.",
    "label": "원문 중간식 누락 의심 · 직접 계산",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-65.jpg",
   "text": "Average-Case Complexity of Linear\nSearch\n2\nSolution: There are n + 1 possible types of input: one type for each of the n\nnumbers on the list and one additional type for the numbers not on the list.\nRecall that:\n•\n•\n2i + 1 comparisons are needed if x equals the ith element of the list.\n2n + 2 comparisons are used if x is not on the list.\nThe probability that x equals ai is p/n and the probability that x is not in the\nlist is q = 1− p. The average-case case computational complexity of the linear\nsearch algorithm is:\nE = 3 p / n + 5 p / n + + (2n + 1) p / n + (2n + 2)q\n= ( p / n)(3 + 5 + . + (2n + 1)) + (2n + 2)q\n= ( p / n)((n + 1) 2 − 1) + (2n + 2)q ( Example 2 from Sec tion 5.1)\n= p (n + 2) + (2n + 2)q.\n•\n•\n•\n•\nWhen x is guaranteed to be in the list, p = 1, q = 0, so that E = n + 2.\nWhen p is ½ and q = ½, then E = (n + 2)/2 + n + 1 = (3n + 4) /2.\nWhen p is ¾ and q = ¼ then E = (n + 2)/4 + (n + 1)/2 = (5n + 8) /4.\nWhen x is guaranteed not to be in the list, p = 0 and q = 1, then E = 2n + 2.",
   "quiz": [
    "x가 반드시 리스트에 있을 때(p = 1) 선형 탐색의 평균 비교 횟수는?",
    [
     "n + 2",
     "2n + 2",
     "(3n + 4)/2"
    ],
    "q = 0이므로 E = n + 2."
   ],
   "quizReasons": [
    "맞습니다.",
    "x가 없을 때(p = 0)의 값입니다.",
    "p = 1/2일 때의 값입니다."
   ]
  },
  {
   "page": 66,
   "title": "삽입 정렬의 평균 복잡도 1: 알고리즘",
   "explanation": "n개의 서로 다른 원소를 삽입 정렬할 때 평균 비교 횟수를 구합니다. 삽입 정렬은 i = 2, …, n 단계마다 i번째 원소를 앞의 정렬된 i − 1개 사이의 알맞은 자리에 끼워 넣습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "i번째 단계: 원래 리스트의 i번째 원소를 앞의 정렬된 i − 1개 원소 사이의 올바른 위치에 삽입.",
     "원문 의사코드: 앞에서부터(i := 1) aj > ai인 동안 i를 늘려 삽입 위치를 찾습니다.",
     "위치를 찾은 뒤 원소들을 한 칸씩 뒤로 밀고 aj를 넣습니다.",
     "구할 것: 전체 비교 횟수의 기댓값(67~68쪽)."
    ],
    "analogy": "손에 든 카드를 정리할 때 새 카드를 한 장 받을 때마다 왼쪽부터 보면서 들어갈 자리를 찾는 것과 같습니다.",
    "examples": [
     {
      "title": "삽입 정렬 의사코드(원문)",
      "code": "procedure insertion sort(a1, …, an: reals with n ≥ 2)\nfor j := 2 to n\n    i := 1\n    while aj > ai\n        i := i + 1\n    m := aj\n    for k := 0 to j − i − 1\n        aj−k := aj−k−1\n    ai := m\n{Now a1, …, an is in increasing order}",
      "lang": "",
      "codeLabel": "의사코드",
      "out": "오름차순 정렬",
      "note": "",
      "error": false,
      "outLabel": "결과"
     },
     {
      "title": "작은 예: 3, 1, 2",
      "code": "j=2: a2=1을 [3] 앞에서부터 비교 → 1 > 3? 아니오 → 맨 앞에 삽입 → 1, 3, 2\nj=3: a3=2를 [1, 3]과 비교 → 2 > 1? 예, 2 > 3? 아니오 → 둘째 자리 → 1, 2, 3",
      "lang": "",
      "codeLabel": "풀이",
      "out": "1, 2, 3",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "j = 2부터 n까지 각 원소를 차례로 처리합니다.",
     "앞에서부터 aj > ai를 비교하며 삽입 위치를 찾습니다.",
     "찾은 위치 뒤의 원소들을 한 칸씩 밀고 aj를 넣습니다."
    ],
    "trap": [
     "이 버전은 삽입 위치를 앞(왼쪽)에서부터 찾습니다. 뒤에서부터 찾는 흔한 구현과 비교 횟수가 다를 수 있습니다."
    ],
    "recap": "삽입 정렬: 단계 i마다 i번째 원소를 앞의 정렬된 부분에 끼워 넣는다.",
    "source": "PDF 66쪽"
   },
   "quizzes": [
    [
     "삽입 정렬의 i번째 단계에서 하는 일은?",
     [
      "i번째 원소를 앞의 정렬된 i − 1개 사이에 끼워 넣는다",
      "가장 작은 원소를 찾아 맨 앞과 바꾼다",
      "이웃한 두 원소를 비교해 바꾼다"
     ],
     "원문: inserts the ith element in the original list into the correct position in the sorted list of the first i − 1 elements.",
     [
      "맞습니다.",
      "선택 정렬입니다.",
      "버블 정렬입니다."
     ]
    ],
    [
     "원문 의사코드에서 삽입 위치를 찾는 방향은?",
     [
      "앞(왼쪽)에서부터",
      "뒤(오른쪽)에서부터",
      "가운데에서부터(이진 탐색)"
     ],
     "i := 1에서 시작해 aj > ai인 동안 i를 늘립니다.",
     [
      "맞습니다.",
      "이 버전은 i := 1부터 시작합니다.",
      "이진 탐색은 쓰지 않습니다."
     ]
    ]
   ],
   "image": "pages/dm07-66.jpg",
   "text": "Average-Case Complexity of Insertion\nSort\n1\nWhat is the average number of comparisons used by\ninsertion sort from Chapter 3) to sort n distinct\nelements?\n• At step i for i = 2, ….,n,\ninsertion sort inserts the\nith element in the original\nlist into the correct position\nin the sorted list of the\nfirst i -1 elements.\nprocedure insertion sort\n(a1,…,an: reals with n ≥ 2)\nfor j := 2 to n\ni := 1\nwhile aj > ai\ni := i + 1\nm := aj\nfor k := 0 to j − i − 1\naj-k := aj-k-1\nai := m\n{Now a1,…,an is in increasing order}",
   "quiz": [
    "삽입 정렬의 i번째 단계에서 하는 일은?",
    [
     "i번째 원소를 앞의 정렬된 i − 1개 사이에 끼워 넣는다",
     "가장 작은 원소를 찾아 맨 앞과 바꾼다",
     "이웃한 두 원소를 비교해 바꾼다"
    ],
    "원문: inserts the ith element in the original list into the correct position in the sorted list of the first i − 1 elements."
   ],
   "quizReasons": [
    "맞습니다.",
    "선택 정렬입니다.",
    "버블 정렬입니다."
   ]
  },
  {
   "page": 67,
   "title": "삽입 정렬의 평균 복잡도 2: 확률변수로 나누기",
   "explanation": "전체 비교 횟수 X를 단계별 비교 횟수 X2, …, Xn의 합으로 나누고, 선형성으로 E(X) = E(X2) + … + E(Xn)을 씁니다. 각 단계에서 삽입될 위치가 균등하다고 가정합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "X = X2 + X3 + … + Xn, Xi = ai를 삽입할 때의 비교 횟수.",
     "선형성: E(X) = E(X2) + … + E(Xn).",
     "pj(k) = 처음 j개 중 가장 큰 원소가 k번째에 있을 확률(1 ≤ k ≤ j). 균등분포 가정: pj(k) = 1/j.",
     "ai가 k번째 위치에 들어가면 비교 횟수 Xi(k) = k."
    ],
    "analogy": "여러 단계로 된 일의 평균 시간은 단계별 평균 시간의 합입니다. 단계가 서로 영향을 주더라도 선형성으로 나눠 계산할 수 있습니다.",
    "examples": [
     {
      "title": "n = 3에서의 분해",
      "code": "X = X2 + X3\nX2: a2를 [a1]에 넣을 때 비교 수 (위치 1 또는 2)\nX3: a3를 정렬된 [·,·]에 넣을 때 비교 수 (위치 1, 2, 3)\nE(X) = E(X2) + E(X3)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "단계별 기댓값을 더하면 된다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "전체 비교 횟수를 단계별 비교 횟수의 합으로 씁니다.",
     "선형성으로 기댓값을 단계별로 나눕니다.",
     "각 단계에서 위치 k(1~i)가 똑같이 일어날 법하다고 가정합니다(확률 1/i).",
     "위치 k일 때의 비교 횟수 k를 씁니다(계산은 68쪽)."
    ],
    "trap": [
     "균등분포 가정(모든 위치가 확률 1/i)은 입력 순서가 무작위라는 가정에서 나옵니다."
    ],
    "recap": "X = ΣXi, E(X) = ΣE(Xi), 위치 k의 확률 1/i, 그때 비교 k번.",
    "source": "PDF 67쪽"
   },
   "quizzes": [
    [
     "삽입 정렬 분석에서 E(X) = E(X2) + … + E(Xn)으로 쓸 수 있는 근거는?",
     [
      "기댓값의 선형성",
      "Xi들의 독립성",
      "이항분포"
     ],
     "선형성은 독립이 아니어도 성립합니다.",
     [
      "맞습니다.",
      "독립은 필요 없습니다.",
      "관련 없습니다."
     ]
    ],
    [
     "균등분포 가정에서 ai가 k번째 위치에 삽입될 확률은? (1 ≤ k ≤ i)",
     [
      "1/i",
      "1/n",
      "k/i"
     ],
     "위치 i가지가 똑같이 일어날 법합니다.",
     [
      "맞습니다.",
      "전체 원소 수가 아니라 그 단계의 위치 수 i입니다.",
      "위치마다 확률이 같습니다."
     ]
    ]
   ],
   "image": "pages/dm07-67.jpg",
   "text": "Average-Case Complexity of Insertion\nSort\n2\nSolution: Let X be the random variable equal to the number of\ncomparisons used by insertion sort to sort a list of a1, a2, …., an\ndistinct elements. E(X) is the average number of comparisons.\n• Let Xi be the random variable equal to the number of comparisons used\nto insert ai into the proper position after the first i −1 elements a1, a2, ….,\nai-1 have been sorted.\n• Since X = X2 + X3 + ∙∙∙ + Xn,\nE(X) = E(X2 + X3 + ∙∙∙ + Xn) = E(X2) + E(X3) + ∙∙∙ + E(Xn).\nTo find E(Xi) for i = 2,3,…,n, let pj(k) be the probability that the\nlargest of the first j elements in the list occurs at the kth position,\nthat is, max(a1, a2, …., aj ) = ak, where 1 ≤ k ≤ j.\nAssume uniform distribution; pj(k) = 1/j .\nThen Xi(k) = k.",
   "quiz": [
    "삽입 정렬 분석에서 E(X) = E(X2) + … + E(Xn)으로 쓸 수 있는 근거는?",
    [
     "기댓값의 선형성",
     "Xi들의 독립성",
     "이항분포"
    ],
    "선형성은 독립이 아니어도 성립합니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "독립은 필요 없습니다.",
    "관련 없습니다."
   ]
  },
  {
   "page": 68,
   "title": "삽입 정렬의 평균 복잡도 3: 계산",
   "explanation": "각 단계의 기댓값 E(Xi) = Σ(k=1..i) (1/i)·k = (i + 1)/2를 구한 뒤 i = 2..n에 대해 더합니다. 결과는 (n^2 + 3n − 4)/4로, 평균적으로도 Θ(n^2)입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "E(Xi) = Σ(k=1..i) (1/i)·k = (1/i)·i(i + 1)/2 = (i + 1)/2.",
     "E(X) = Σ(i=2..n) (i + 1)/2 = (1/2)Σ(j=3..n+1) j.",
     "= (1/2)[(n + 1)(n + 2)/2 − (1 + 2)] = (n^2 + 3n − 4)/4.",
     "결론: 평균 시간 복잡도는 Θ(n^2) (원문 슬라이드는 마지막 문장이 잘려 있음)."
    ],
    "analogy": "각 단계에서 평균적으로 정렬된 부분의 절반쯤을 훑습니다. 절반씩이라도 단계가 n번이면 전체는 n^2에 비례합니다.",
    "examples": [
     {
      "title": "합 계산",
      "code": "Σ(i=2..n) (i + 1)/2 = (3 + 4 + … + (n + 1))/2\n3 + … + (n + 1) = (1 + 2 + … + (n + 1)) − (1 + 2) = (n + 1)(n + 2)/2 − 3\nE(X) = (1/2)[(n + 1)(n + 2)/2 − 3] = (n^2 + 3n + 2 − 6)/4",
      "lang": "",
      "codeLabel": "풀이",
      "out": "(n^2 + 3n − 4)/4",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "n = 3으로 확인",
      "code": "(9 + 9 − 4)/4 = 14/4 = 3.5\n직접: E(X2) + E(X3) = 3/2 + 2 = 3.5",
      "lang": "",
      "codeLabel": "풀이",
      "out": "일치",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "한 단계의 기댓값 E(Xi) = (i + 1)/2를 구합니다(1~i의 평균).",
     "i = 2..n에 대해 더합니다.",
     "첨자를 j = i + 1로 바꿔 연속 정수의 합으로 만듭니다.",
     "1부터의 합 공식에서 빠진 항(1, 2)을 빼고 정리합니다."
    ],
    "trap": [
     "합의 범위가 j = 3부터라서 1 + 2 = 3을 빼야 합니다.",
     "원문 마지막 줄 \"Hence, the average-case complexity is\" 뒤가 잘려 있습니다. (n^2 + 3n − 4)/4이므로 Θ(n^2)가 결론입니다(교재 Rosen)."
    ],
    "recap": "삽입 정렬 평균 비교 횟수 = (n^2 + 3n − 4)/4 = Θ(n^2).",
    "source": "PDF 68쪽"
   },
   "quizzes": [
    [
     "E(Xi) = Σ(k=1..i) (1/i)·k의 값은?",
     [
      "(i + 1)/2",
      "i/2",
      "i(i + 1)/2"
     ],
     "1부터 i까지의 평균입니다.",
     [
      "맞습니다.",
      "1을 빠뜨렸습니다.",
      "1/i을 곱하지 않은 합입니다."
     ]
    ],
    [
     "삽입 정렬(n개)의 평균 비교 횟수는?",
     [
      "(n^2 + 3n − 4)/4",
      "n(n − 1)/2",
      "n^2"
     ],
     "(1/2)[(n + 1)(n + 2)/2 − 3].",
     [
      "맞습니다.",
      "근거 없는 식입니다(다른 분석의 최악 횟수와 혼동).",
      "근사일 뿐 정확한 값이 아닙니다."
     ]
    ],
    [
     "n = 4일 때 평균 비교 횟수는?",
     [
      "6",
      "5",
      "7"
     ],
     "(16 + 12 − 4)/4 = 24/4 = 6.",
     [
      "맞습니다.",
      "계산 실수입니다.",
      "−4를 빼먹으면 7이 됩니다."
     ]
    ]
   ],
   "review": {
    "original": "Hence, the average-case complexity is",
    "checked": "문장이 끝나지 않은 채 잘려 있습니다. 위 계산 (n^2 + 3n − 4)/4로부터 평균 시간 복잡도는 Θ(n^2)입니다(교재 Rosen의 결론과 같음).",
    "label": "원문 문장 잘림 · 계산으로 보충",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-68.jpg",
   "text": "Average-Case Complexity of Insertion\nSort\n3\nSince ai could be inserted into any of the first i positions\n1\n1 i\n1 i ( i + 1) i + 1\nE ( X i ) =  pi ( k )  X i ( k ) =   k =  k = \n=\ni k =1\ni\n2\n2\nk =1\nk =1 i\ni\ni\nIt follows that\ni + 1 1 n +1\nE ( X ) =  E ( X i ) =\n= j\n2 j =3\ni=2\ni=2 2\nn\nn\n1 ( n + 1)( n + 2) 1\nn 2 + 3n − 4\n=\n− (1 + 2) =\n2\n2\n2\n4\nHence, the average-case complexity is",
   "quiz": [
    "E(Xi) = Σ(k=1..i) (1/i)·k의 값은?",
    [
     "(i + 1)/2",
     "i/2",
     "i(i + 1)/2"
    ],
    "1부터 i까지의 평균입니다."
   ],
   "quizReasons": [
    "맞습니다.",
    "1을 빠뜨렸습니다.",
    "1/i을 곱하지 않은 합입니다."
   ]
  },
  {
   "page": 69,
   "title": "기하분포",
   "explanation": "처음으로 성공할 때까지 독립 시행을 반복할 때, 시행 횟수 X는 기하분포를 따릅니다. 첫 k − 1번 실패하고 k번째에 성공할 확률이 (1 − p)^(k−1)p이고, 기댓값은 1/p입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의 2: p(X = k) = (1 − p)^(k−1)·p (k = 1, 2, 3, …), 0 ≤ p ≤ 1.",
     "정리 4: 기하분포의 기댓값 E(X) = 1/p.",
     "예: 뒷면 확률 p인 동전을 뒷면이 나올 때까지 던짐. 표본공간 {T, HT, HHT, HHHT, …}.",
     "X(T) = 1, X(HT) = 2, X(HHT) = 3, … → E(X) = 1/p."
    ],
    "analogy": "주사위에서 6이 나올 확률은 1/6이므로, 평균적으로 6번째쯤 처음 6이 나옵니다. \"성공 확률의 역수 = 평균 시도 횟수\"라고 기억하면 됩니다.",
    "examples": [
     {
      "title": "주사위에서 6이 처음 나올 때까지",
      "code": "p = 1/6\np(X = 1) = 1/6\np(X = 2) = (5/6)(1/6) = 5/36\np(X = 3) = (5/6)^2(1/6) = 25/216\nE(X) = 1/p",
      "lang": "",
      "codeLabel": "풀이",
      "out": "6번",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "공정한 동전에서 뒷면이 처음 나올 때까지",
      "code": "p = 1/2 → E(X) = 2",
      "lang": "",
      "codeLabel": "풀이",
      "out": "평균 2번",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "성공 확률 p를 정합니다.",
     "\"처음 성공까지의 시행 횟수\"인지 확인합니다.",
     "p(X = k) = (1 − p)^(k−1)p, E(X) = 1/p를 씁니다."
    ],
    "trap": [
     "X는 성공한 시행까지 포함한 횟수입니다(실패 횟수가 아님). 그래서 X ≥ 1.",
     "표본공간이 무한하므로 유한 표본공간을 가정한 앞의 정의를 확장한 것입니다(자세한 내용은 교재)."
    ],
    "recap": "기하분포: p(X = k) = (1 − p)^(k−1)p, E(X) = 1/p.",
    "source": "PDF 69쪽"
   },
   "quizzes": [
    [
     "성공 확률 0.25인 시행을 처음 성공할 때까지 반복할 때 시행 횟수의 기댓값은?",
     [
      "4",
      "0.25",
      "3"
     ],
     "E(X) = 1/p = 1/0.25 = 4.",
     [
      "맞습니다.",
      "성공 확률 자체입니다.",
      "실패 횟수의 기댓값(1/p − 1)입니다."
     ]
    ],
    [
     "기하분포에서 p(X = 3)은?",
     [
      "(1 − p)^2·p",
      "p^3",
      "(1 − p)·p^2"
     ],
     "두 번 실패 후 세 번째에 성공합니다.",
     [
      "맞습니다.",
      "세 번 연속 성공 확률입니다.",
      "실패·성공 횟수가 바뀌었습니다."
     ]
    ],
    [
     "주사위에서 6이 처음 나올 때까지 던질 때, 정확히 2번째에 처음 나올 확률은?",
     [
      "5/36",
      "1/36",
      "1/6"
     ],
     "(5/6)(1/6) = 5/36.",
     [
      "맞습니다.",
      "두 번 모두 6일 확률입니다.",
      "첫 번째에 나올 확률입니다."
     ]
    ]
   ],
   "image": "pages/dm07-69.jpg",
   "text": "The Geometric Distribution\nDefinition 2: A random variable X has geometric distribution with\nparameter p if p(X = k) = (1 − p)k-1p for k = 1,2,3,…, where p is a\nreal number with 0 ≤ p ≤ 1.\nTheorem 4: If the random variable X has the geometric distribution\nwith parameter p, then E(X) = 1/p.\nExample: Suppose the probability that a coin comes up tails is p.\nWhat is the expected number of flips until this coin comes up tails?\n• The sample space is {T, HT, HHT, HHHT, HHHHT, …}.\n• Let X be the random variable equal to the number of flips in an element of\nthe sample space; X(T) = 1, X(HT) = 2, X(HHT) = 3, etc.\n• By Theorem 4, E(X) = 1/p.\nsee text for full details",
   "quiz": [
    "성공 확률 0.25인 시행을 처음 성공할 때까지 반복할 때 시행 횟수의 기댓값은?",
    [
     "4",
     "0.25",
     "3"
    ],
    "E(X) = 1/p = 1/0.25 = 4."
   ],
   "quizReasons": [
    "맞습니다.",
    "성공 확률 자체입니다.",
    "실패 횟수의 기댓값(1/p − 1)입니다."
   ]
  },
  {
   "page": 70,
   "title": "독립 확률변수",
   "explanation": "두 확률변수 X, Y가 독립이라는 것은 모든 값 r1, r2에 대해 \"X = r1 그리고 Y = r2\"의 확률이 각 확률의 곱이라는 뜻입니다. 독립이면 곱의 기댓값이 기댓값의 곱이 됩니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "정의 3: X, Y가 독립 ⇔ 모든 r1, r2에 대해 p(X = r1 그리고 Y = r2) = p(X = r1)·p(Y = r2).",
     "정리 5: X, Y가 독립이면 E(XY) = E(X)E(Y).",
     "독립이 아니면 E(XY) = E(X)E(Y)가 성립하지 않을 수 있습니다.",
     "증명은 교재 참고."
    ],
    "analogy": "두 주사위를 따로 던지면 한쪽 눈이 다른 쪽에 영향을 주지 않습니다. 이럴 때만 \"곱의 평균 = 평균의 곱\"이 됩니다.",
    "examples": [
     {
      "title": "독립인 경우: 주사위 두 개",
      "code": "X, Y = 두 주사위의 눈 (독립)\nE(XY) = E(X)E(Y) = (7/2)(7/2)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "49/4",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "독립이 아닌 경우: Y = X (같은 주사위)",
      "code": "E(X·X) = E(X^2) = 91/6 ≈ 15.17\nE(X)E(X) = 49/4 = 12.25",
      "lang": "",
      "codeLabel": "풀이",
      "out": "다르다 → 독립 가정이 필요",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "X, Y가 독립인지 확인합니다(별개의 실험, 서로 영향 없음 등).",
     "독립이면 E(XY) = E(X)E(Y)로 계산합니다.",
     "독립이 아니면 결과마다 X(s)Y(s)를 구해 직접 기댓값을 계산합니다."
    ],
    "trap": [
     "합의 기댓값 E(X + Y) = E(X) + E(Y)는 항상 성립하지만, 곱의 기댓값 공식은 독립일 때만 성립합니다."
    ],
    "recap": "독립 확률변수: p(X = r1, Y = r2) = p(X = r1)p(Y = r2). 이때 E(XY) = E(X)E(Y).",
    "source": "PDF 70쪽"
   },
   "quizzes": [
    [
     "독립인 X, Y에서 E(X) = 2, E(Y) = 5일 때 E(XY)는?",
     [
      "10",
      "7",
      "알 수 없다"
     ],
     "정리 5: E(XY) = E(X)E(Y).",
     [
      "맞습니다.",
      "합의 기댓값입니다.",
      "독립이면 계산할 수 있습니다."
     ]
    ],
    [
     "E(XY) = E(X)E(Y)가 항상 성립한다고 할 수 있는 조건은?",
     [
      "X와 Y가 독립",
      "아무 조건 없이 항상",
      "X와 Y의 기댓값이 같음"
     ],
     "Y = X인 주사위 예처럼 독립이 아니면 다를 수 있습니다.",
     [
      "맞습니다.",
      "반례가 있습니다(E(X^2) ≠ E(X)^2).",
      "기댓값이 같아도 성립하지 않을 수 있습니다."
     ]
    ]
   ],
   "image": "pages/dm07-70.jpg",
   "text": "Independent Random Variables\nDefinition 3: The random variables X and Y on a sample\nspace S are independent if\np(X = r1 and Y = r2) = p(X = r1)∙ p(Y = r2).\nTheorem 5: If X and Y are independent variables on a\nsample space S, then E(XY) = E(X)E(Y).\nsee text for full proof",
   "quiz": [
    "독립인 X, Y에서 E(X) = 2, E(Y) = 5일 때 E(XY)는?",
    [
     "10",
     "7",
     "알 수 없다"
    ],
    "정리 5: E(XY) = E(X)E(Y)."
   ],
   "quizReasons": [
    "맞습니다.",
    "합의 기댓값입니다.",
    "독립이면 계산할 수 있습니다."
   ]
  },
  {
   "page": 71,
   "title": "분산",
   "explanation": "분산은 확률변수가 기댓값에서 얼마나 퍼져 있는지를 나타냅니다. 편차 X(s) − E(X)를 제곱해 확률로 가중평균합니다. 계산할 때는 V(X) = E(X^2) − E(X)^2가 편리합니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "편차: X(s) − E(X).",
     "정의 4: V(X) = Σ(s ∈ S) (X(s) − E(X))^2·p(s). 편차 제곱의 가중평균.",
     "표준편차: σ(X) = √V(X).",
     "정리 6: V(X) = E(X^2) − E(X)^2.",
     "따름정리 1: E(X) = μ이면 V(X) = E((X − μ)^2)."
    ],
    "analogy": "과녁 맞히기에서 평균 위치(기댓값)가 같아도 화살이 촘촘히 모인 사람과 여기저기 흩어진 사람이 있습니다. 흩어진 정도가 분산입니다.",
    "examples": [
     {
      "title": "두 확률변수 비교",
      "code": "X: 4 또는 6 (각 1/2)  → E(X) = 5\n   V(X) = (4−5)^2·1/2 + (6−5)^2·1/2 = 1\nY: 0 또는 10 (각 1/2) → E(Y) = 5\n   V(Y) = (0−5)^2·1/2 + (10−5)^2·1/2 = 25",
      "lang": "",
      "codeLabel": "풀이",
      "out": "평균은 같아도 Y가 훨씬 더 퍼져 있다",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "정리 6으로 다시 계산",
      "code": "E(Y^2) = 0·1/2 + 100·1/2 = 50\nV(Y) = 50 − 5^2 = 25",
      "lang": "",
      "codeLabel": "풀이",
      "out": "같은 값",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "E(X)를 구합니다.",
     "E(X^2) = Σ X(s)^2 p(s)를 구합니다.",
     "V(X) = E(X^2) − E(X)^2.",
     "필요하면 √를 씌워 표준편차를 구합니다."
    ],
    "trap": [
     "E(X^2)와 E(X)^2는 다릅니다. 앞은 \"제곱의 평균\", 뒤는 \"평균의 제곱\"입니다.",
     "분산은 제곱 단위이므로 항상 0 이상입니다. 음수가 나오면 계산 실수입니다."
    ],
    "recap": "V(X) = Σ(X(s) − E(X))^2 p(s) = E(X^2) − E(X)^2, σ(X) = √V(X).",
    "source": "PDF 71쪽"
   },
   "quizzes": [
    [
     "E(X) = 3, E(X^2) = 13일 때 V(X)는?",
     [
      "4",
      "10",
      "13"
     ],
     "13 − 3^2 = 4.",
     [
      "맞습니다.",
      "3을 제곱하지 않았습니다.",
      "E(X^2) 자체입니다."
     ]
    ],
    [
     "V(X) = 9일 때 표준편차 σ(X)는?",
     [
      "3",
      "9",
      "81"
     ],
     "σ(X) = √9 = 3.",
     [
      "맞습니다.",
      "분산입니다.",
      "제곱한 값입니다."
     ]
    ],
    [
     "X가 0 또는 2를 각각 확률 1/2로 가질 때 V(X)는?",
     [
      "1",
      "2",
      "0"
     ],
     "E(X) = 1, E(X^2) = 2 → 2 − 1 = 1.",
     [
      "맞습니다.",
      "E(X^2)입니다.",
      "분산은 값이 퍼져 있으면 0이 아닙니다."
     ]
    ]
   ],
   "image": "pages/dm07-71.jpg",
   "text": "Variance\n1\nDeviation: The deviation of X at s ∊ S is X(s) − E(X), the difference between the value of\nX and the mean of X.\nDefinition 4: Let X be a random variable on the sample space S. The variance of X,\ndenoted by V(X) is\n2\nV ( X ) =  ( X ( s) − E ( X )) p ( s) .\ns S\nThat is V(X) is the weighted average of the square of the deviation of X. The standard\ndeviation of X, denoted by σ(X) is defined to be V ( X ) .\nTheorem 6: If X is a random variable on a sample space S, then V(X) = E(X2) − E(X)2.\nsee text for the proof\nCorollary 1: If X is a random variable on a sample space S and E(X) = μ , then\nV(X) = E((X −μ)2).\nsee text for the proof",
   "quiz": [
    "E(X) = 3, E(X^2) = 13일 때 V(X)는?",
    [
     "4",
     "10",
     "13"
    ],
    "13 − 3^2 = 4."
   ],
   "quizReasons": [
    "맞습니다.",
    "3을 제곱하지 않았습니다.",
    "E(X^2) 자체입니다."
   ]
  },
  {
   "page": 72,
   "title": "분산 예: 베르누이 확률변수와 주사위",
   "explanation": "성공이면 1, 실패면 0인 베르누이 확률변수의 분산은 pq입니다. 공정한 주사위 눈의 분산은 E(X^2) = 91/6과 E(X) = 7/2로 계산하면 35/12입니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "베르누이: X가 0, 1만 가지므로 X^2 = X → E(X^2) = E(X) = p.",
     "V(X) = p − p^2 = p(1 − p) = pq.",
     "주사위: E(X^2) = (1/6)(1^2 + 2^2 + … + 6^2) = 91/6.",
     "V(X) = 91/6 − (7/2)^2 = 91/6 − 49/4 = 35/12."
    ],
    "analogy": "동전 하나를 0/1 점수로 보면 공정할 때(p = 1/2) 결과가 가장 불확실해서 분산 pq = 1/4이 최대입니다. 한쪽으로 치우칠수록 분산이 줄어듭니다.",
    "examples": [
     {
      "title": "주사위 분산 계산",
      "code": "E(X^2) = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6\nE(X)^2 = (7/2)^2 = 49/4\nV(X) = 91/6 − 49/4 = 182/12 − 147/12",
      "lang": "",
      "codeLabel": "풀이",
      "out": "35/12 ≈ 2.92",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "베르누이 분산의 값들",
      "code": "p = 1/2: pq = 1/4\np = 0.9: pq = 0.09\np = 1:   pq = 0 (항상 성공, 퍼짐 없음)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "p = 1/2에서 최대",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "E(X)를 구합니다(베르누이: p, 주사위: 7/2).",
     "E(X^2)를 구합니다(베르누이: X^2 = X라 p, 주사위: 91/6).",
     "V(X) = E(X^2) − E(X)^2."
    ],
    "trap": [
     "주사위에서 E(X^2) = (7/2)^2로 착각하면 분산이 0이 됩니다. 제곱의 평균을 따로 계산해야 합니다.",
     "분모를 통분할 때 91/6 − 49/4 = (182 − 147)/12입니다."
    ],
    "recap": "베르누이 분산 = pq, 주사위 분산 = 91/6 − 49/4 = 35/12.",
    "source": "PDF 72쪽"
   },
   "quizzes": [
    [
     "성공 확률 0.3인 베르누이 확률변수의 분산은?",
     [
      "0.21",
      "0.3",
      "0.09"
     ],
     "pq = 0.3·0.7 = 0.21.",
     [
      "맞습니다.",
      "기댓값 p입니다.",
      "p^2입니다."
     ]
    ],
    [
     "공정한 주사위 눈의 분산은?",
     [
      "35/12",
      "91/6",
      "49/4"
     ],
     "91/6 − 49/4 = 35/12.",
     [
      "맞습니다.",
      "E(X^2)입니다.",
      "E(X)^2입니다."
     ]
    ],
    [
     "베르누이 확률변수에서 X^2 = X인 이유는?",
     [
      "X가 0 또는 1만 가지기 때문",
      "X가 독립이기 때문",
      "p + q = 1이기 때문"
     ],
     "0^2 = 0, 1^2 = 1.",
     [
      "맞습니다.",
      "독립성과 무관합니다.",
      "이 등식과 무관합니다."
     ]
    ]
   ],
   "image": "pages/dm07-72.jpg",
   "text": "Variance\n2\nExample: What is the variance of the random variable X, where X(t) = 1 if a\nBernoulli trial is a success and X(t) = 0 if it is a failure, where p is the\nprobability of success and q is the probability of failure?\nSolution: Because X takes only the values 0 and 1, it follows that X2(t) = X(t).\nHence,\n( )\nV ( X ) = E X 2 − E ( X ) = p − p 2 = p (1 − p ) = pq.\n2\nVariance of the Value of a Die: What is the variance of a random variable X,\nwhere X is the number that comes up when a fair die is rolled?\nSolution: We have V ( X ) = E ( X 2 ) − E ( X ) 2 . In an earlier example, we saw that\nE(X) = 7/2. Note that\n( )\n(\n)\nE X 2 = 1/ 6 12 + 22 + 32 + 42 + 52 + 62 = 91/ 6.\n2\nWe conclude that V ( X ) = 91 −  7  = 35 .\n6  2\n12",
   "quiz": [
    "성공 확률 0.3인 베르누이 확률변수의 분산은?",
    [
     "0.21",
     "0.3",
     "0.09"
    ],
    "pq = 0.3·0.7 = 0.21."
   ],
   "quizReasons": [
    "맞습니다.",
    "기댓값 p입니다.",
    "p^2입니다."
   ]
  },
  {
   "page": 73,
   "title": "비에네메 공식: 독립 합의 분산",
   "explanation": "독립인 확률변수 합의 분산은 각 분산의 합입니다(비에네메 공식). 이를 이용하면 n번 베르누이 시행의 성공 횟수의 분산이 npq임을 바로 얻습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "비에네메 공식: X, Y가 독립이면 V(X + Y) = V(X) + V(Y).",
     "X1, …, Xn이 쌍별 독립이면 V(X1 + … + Xn) = V(X1) + … + V(Xn).",
     "예: Xi = i번째 시행이 성공이면 1, 실패면 0. X = X1 + X2 + … + Xn은 성공 횟수.",
     "V(Xi) = pq(72쪽) → V(X) = npq."
    ],
    "analogy": "독립인 오차들은 서로 상쇄되거나 겹치는 규칙이 없어서, 퍼진 정도(분산)가 그대로 쌓입니다.",
    "examples": [
     {
      "title": "공정한 동전 100번의 앞면 수",
      "code": "n = 100, p = q = 1/2\nV(X) = npq = 100 · 1/4 = 25,  σ(X) = 5",
      "lang": "",
      "codeLabel": "풀이",
      "out": "분산 25, 표준편차 5",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "독립이 아니면 성립하지 않는 예",
      "code": "Y = X (같은 확률변수):  V(X + X) = V(2X) = 4V(X)\nV(X) + V(X) = 2V(X)",
      "lang": "",
      "codeLabel": "풀이",
      "out": "4V(X) ≠ 2V(X) (V(X) > 0일 때)",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "구하려는 확률변수를 독립인 확률변수들의 합으로 씁니다.",
     "각 부분의 분산을 구합니다.",
     "독립(쌍별 독립)이면 분산을 더합니다."
    ],
    "trap": [
     "원문 \"Let X = X2 + X3 + …. Xn\"은 X = X1 + X2 + … + Xn의 오타입니다(성공 횟수는 모든 시행의 합).",
     "기댓값의 합은 항상 성립하지만, 분산의 합은 독립(쌍별 독립)이 필요합니다."
    ],
    "recap": "독립이면 V(ΣXi) = ΣV(Xi). 이항분포의 분산 = npq.",
    "source": "PDF 73쪽"
   },
   "quizzes": [
    [
     "성공 확률 0.2인 독립 시행 50번의 성공 횟수의 분산은?",
     [
      "8",
      "10",
      "0.16"
     ],
     "npq = 50·0.2·0.8 = 8.",
     [
      "맞습니다.",
      "기댓값 np입니다.",
      "시행 한 번의 분산 pq입니다."
     ]
    ],
    [
     "V(X + Y) = V(X) + V(Y)가 보장되는 조건은?",
     [
      "X와 Y가 독립",
      "항상",
      "E(X) = E(Y)"
     ],
     "비에네메 공식의 가정입니다.",
     [
      "맞습니다.",
      "Y = X이면 성립하지 않습니다.",
      "기댓값이 같아도 보장되지 않습니다."
     ]
    ],
    [
     "n번 베르누이 시행의 성공 횟수 X를 지시 확률변수로 바르게 쓴 것은?",
     [
      "X = X1 + X2 + … + Xn",
      "X = X2 + X3 + … + Xn",
      "X = X1·X2···Xn"
     ],
     "모든 시행의 성공 여부를 더해야 합니다(원문 오타 주의).",
     [
      "맞습니다.",
      "첫 시행이 빠졌습니다(원문 오타).",
      "곱은 모두 성공했는지를 나타냅니다."
     ]
    ]
   ],
   "review": {
    "original": "Let X = X2 + X3 + …. Xn. Then X counts the number of successes in the n trials.",
    "checked": "n번 시행의 성공 횟수는 X = X1 + X2 + … + Xn입니다. 바로 다음 줄 V(X) = V(X1) + V(X2) + … + V(Xn)도 X1부터 더합니다. X2에서 시작한 것은 오타로 보입니다.",
    "label": "원문 첨자 오타 의심 · 다음 줄과 대조",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-73.jpg",
   "text": "Variance\nIrenée-Jules Bienaymé\n3\n(1796-1878)\nBienaymé‘s Formula: If X and Y are two independent random variables on a sample\nspace S, then V(X + Y) = V(X) + V(Y). Furthermore, if Xi, i = 1,2, …,n, with n a positive\ninteger, are pairwise independent random variables on S, then\nV ( X1 + X 2 + L + X n ) = V ( X1 ) + V ( X 2 ) + L + V ( X n ) .\nsee text for the proof\nExample: Find the variance of the number of successes when n independent Bernoulli\ntrials are performed, where on each trial, p is the probability of success and q is the\nprobability of failure.\nSolution: Let Xi be the random variable with Xi ((t1, t2, …., tn)) = 1 if trial ti is a success\nand Xi ((t1, t2, …., tn)) = 0 if it is a failure. Let X = X2 + X3 + …. Xn. Then X counts the\nnumber of successes in the n trials.\n•\nBy Bienaymé ‘s Formula, it follows that V(X)= V(X1) + V(X2) + ∙∙∙ + V(Xn).\n•\nBy the previous example ,V(Xi) = pq for i = 1,2, …,n.\nHence, V(X) = npq.",
   "quiz": [
    "성공 확률 0.2인 독립 시행 50번의 성공 횟수의 분산은?",
    [
     "8",
     "10",
     "0.16"
    ],
    "npq = 50·0.2·0.8 = 8."
   ],
   "quizReasons": [
    "맞습니다.",
    "기댓값 np입니다.",
    "시행 한 번의 분산 pq입니다."
   ]
  },
  {
   "page": 74,
   "title": "체비쇼프 부등식",
   "explanation": "체비쇼프 부등식은 분산만 알면 확률변수가 기댓값에서 r 이상 벗어날 확률의 상한을 줍니다: p(|X − E(X)| ≥ r) ≤ V(X)/r^2. 분포를 몰라도 쓸 수 있습니다.",
   "kind": "lesson",
   "lesson": {
    "core": [
     "체비쇼프 부등식: r > 0이면 p(|X(s) − E(X)| ≥ r) ≤ V(X)/r^2.",
     "예: 공정한 동전 n번의 뒷면 수 X → E(X) = n/2, V(X) = n/4.",
     "r = √n: p(|X − n/2| ≥ √n) ≤ (n/4)/(√n)^2 = 1/4.",
     "해석: n번 던진 뒷면 수가 평균 n/2에서 √n 이상 벗어날 확률은 1/4 이하."
    ],
    "analogy": "반 평균 점수와 분산만 알려 줘도 \"평균에서 20점 이상 벗어난 학생은 많아야 몇 %\"라고 말할 수 있습니다. 점수 분포 모양을 몰라도 됩니다.",
    "examples": [
     {
      "title": "원문 예 (r = √n)",
      "code": "E(X) = n/2,  V(X) = n/4\np(|X − n/2| ≥ √n) ≤ (n/4) / (√n)^2 = (n/4)/n",
      "lang": "",
      "codeLabel": "풀이",
      "out": "≤ 1/4",
      "note": "",
      "error": false,
      "outLabel": "답"
     },
     {
      "title": "구체적인 수: 동전 100번",
      "code": "E(X) = 50, V(X) = 25, r = 10 (= √100)\np(|X − 50| ≥ 10) ≤ 25/100 = 1/4\n즉 뒷면 수가 40 이하 또는 60 이상일 확률 ≤ 1/4",
      "lang": "",
      "codeLabel": "풀이",
      "out": "상한일 뿐 실제 확률은 이보다 작다",
      "note": "",
      "error": false,
      "outLabel": "답"
     }
    ],
    "steps": [
     "E(X)와 V(X)를 구합니다.",
     "벗어나는 거리 r을 정합니다.",
     "V(X)/r^2을 계산해 확률의 상한으로 씁니다."
    ],
    "trap": [
     "원문 식의 \"V(X) | r^2\"는 V(X)/r^2(나눗셈)이고, 예의 \"(n/4)(√n)^2\"도 (n/4)/(√n)^2이어야 결과 1/4이 나옵니다.",
     "체비쇼프 부등식은 상한(≤)만 알려 줍니다. 실제 확률은 훨씬 작을 수 있습니다.",
     "원문 해석 문장의 \"by more than √n\"은 식의 \"≥ √n(√n 이상)\"과 맞추어 읽으세요."
    ],
    "recap": "p(|X − E(X)| ≥ r) ≤ V(X)/r^2. 분산만으로 \"많이 벗어날 확률\"의 상한을 준다.",
    "source": "PDF 74쪽"
   },
   "quizzes": [
    [
     "E(X) = 10, V(X) = 4일 때 p(|X − 10| ≥ 4)의 체비쇼프 상한은?",
     [
      "1/4",
      "1",
      "4/16을 넘을 수도 있다"
     ],
     "V(X)/r^2 = 4/16 = 1/4.",
     [
      "맞습니다.",
      "V(X)/r = 4/4를 쓴 오답입니다.",
      "부등식은 상한을 보장합니다."
     ]
    ],
    [
     "공정한 동전 n번의 뒷면 수 X의 분산은?",
     [
      "n/4",
      "n/2",
      "√n"
     ],
     "npq = n·(1/2)·(1/2).",
     [
      "맞습니다.",
      "기댓값입니다.",
      "원문 예의 r 값입니다."
     ]
    ],
    [
     "체비쇼프 부등식이 알려 주는 것은?",
     [
      "기댓값에서 r 이상 벗어날 확률의 상한",
      "기댓값에서 r 이상 벗어날 확률의 정확한 값",
      "분산의 하한"
     ],
     "≤ V(X)/r^2로 위쪽 한계만 줍니다.",
     [
      "맞습니다.",
      "정확한 값이 아니라 상한입니다.",
      "분산은 주어진 값으로 씁니다."
     ]
    ]
   ],
   "review": {
    "original": "p(|X(s) − E(X)| ≥ r) ≤ V(X) | r^2.   …   p(|X(s) − n/2| ≥ √n) ≤ (n/4)(√n)^2 = 1/4.",
    "checked": "부등식의 우변은 V(X)/r^2(나눗셈)입니다. 예의 우변도 (n/4)/(√n)^2 = (n/4)/n = 1/4이어야 하며, (n/4)(√n)^2로 곱하면 n^2/4가 되어 1/4이 나오지 않습니다. 결론 1/4은 맞습니다.",
    "label": "원문 기호 오타 의심 · 직접 계산",
    "ask": "필요하면 강의에서 확인하세요."
   },
   "image": "pages/dm07-74.jpg",
   "text": "Chebyshev’s Inequality\nPafnuty Lvovich Chebyshev\n(1821-1894)\nChebyschev’s Inequality: Let X be a random variable on a sample space S with\nprobability function p. If r is a positive real number, then\np (| X ( s ) − E ( X ) |  r )  V ( X ) | r 2 .\nsee text for the proof\nExample: Suppose that X is a random variable that counts the number of tails when a\nfair coin is tossed n times. Note that X is the number of successes when n independent\nBernoulli trials, each with probability of success ½ are done. Hence, (by Theorem 2)\nE(X) = n/2 and (by Example 18) V(X) = n/4.\nBy Chebyschev’s inequality with r = √n,\n(\n)\np | X ( s ) − n / 2 |  n  ( n / 4)\n( n ) = 1/ 4.\n2\nThis means that the probability that the number of tails that come up on n tosses\ndeviates from the mean , n/2, by more than √n is no larger than ¼.",
   "quiz": [
    "E(X) = 10, V(X) = 4일 때 p(|X − 10| ≥ 4)의 체비쇼프 상한은?",
    [
     "1/4",
     "1",
     "4/16을 넘을 수도 있다"
    ],
    "V(X)/r^2 = 4/16 = 1/4."
   ],
   "quizReasons": [
    "맞습니다.",
    "V(X)/r = 4/4를 쓴 오답입니다.",
    "부등식은 상한을 보장합니다."
   ]
  }
 ]
}]);
