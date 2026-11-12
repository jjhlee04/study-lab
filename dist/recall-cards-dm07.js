/* 이산수학 7장 이산 확률 쓰기 복습 카드 · 생성 파일: authoring/discrete-math/dm07_cards.py */
(window.RECALL_CARDS = window.RECALL_CARDS || []).push(...[
{
"id": "recall-dm07-001",
"course": "discrete-math",
"src": [
"dm07",
5
],
"type": "short",
"q": "실험에서 가능한 모든 결과의 집합을 무엇이라 하는가?",
"answers": [
"표본공간",
"sample space"
],
"why": "사건은 표본공간의 부분집합입니다.",
"mode": "term"
},
{
"id": "recall-dm07-002",
"course": "discrete-math",
"src": [
"dm07",
5
],
"type": "short",
"q": "표본공간의 부분집합을 무엇이라 하는가?",
"answers": [
"사건",
"event"
],
"why": "예: 주사위에서 \"짝수\" = {2, 4, 6}.",
"mode": "term"
},
{
"id": "recall-dm07-003",
"course": "discrete-math",
"src": [
"dm07",
5
],
"type": "cloze",
"q": "라플라스의 정의: 모든 결과가 똑같이 일어날 법할 때 p(E) = ___",
"answers": [
"|E|/|S|"
],
"why": "사건의 결과 수 ÷ 전체 결과 수.",
"mode": "formula"
},
{
"id": "recall-dm07-004",
"course": "discrete-math",
"src": [
"dm07",
6
],
"type": "short",
"q": "주사위 두 개를 던져 합이 7일 확률은? (기약분수)",
"answers": [
"1/6"
],
"why": "순서쌍 36개 중 6개 → 6/36 = 1/6.",
"mode": "formula"
},
{
"id": "recall-dm07-005",
"course": "discrete-math",
"src": [
"dm07",
6
],
"type": "short",
"q": "파란 공 4개, 빨간 공 5개인 항아리에서 파란 공을 꺼낼 확률은?",
"answers": [
"4/9"
],
"why": "전체 9개 중 4개.",
"mode": "formula"
},
{
"id": "recall-dm07-006",
"course": "discrete-math",
"src": [
"dm07",
7
],
"type": "short",
"q": "네 자리 복권에서 정확히 세 자리만 일치하는 번호의 수는?",
"answers": [
"36"
],
"why": "틀린 자리 4곳 × 틀린 숫자 9가지.",
"mode": "formula"
},
{
"id": "recall-dm07-007",
"course": "discrete-math",
"src": [
"dm07",
7
],
"type": "short",
"q": "네 자리 복권에서 정확히 세 자리만 일치할 확률은? (소수)",
"answers": [
"0.0036"
],
"why": "36/10,000 = 9/2500 = 0.0036.",
"mode": "formula"
},
{
"id": "recall-dm07-008",
"course": "discrete-math",
"src": [
"dm07",
8
],
"type": "short",
"q": "1~40 중 6개를 고르는 로또의 경우의 수 C(40,6)의 값은?",
"answers": [
"3838380",
"3,838,380"
],
"why": "40!/(34!·6!) = 3,838,380.",
"mode": "formula"
},
{
"id": "recall-dm07-009",
"course": "discrete-math",
"src": [
"dm07",
9
],
"type": "short",
"q": "1~50번 공 5개를 복원 추출로 순서대로 뽑는 경우의 수는? (거듭제곱 식, ^ 사용)",
"answers": [
"50^5"
],
"why": "매번 50가지 → 50^5 = 312,500,000.",
"mode": "formula"
},
{
"id": "recall-dm07-010",
"course": "discrete-math",
"src": [
"dm07",
9
],
"type": "cloze",
"q": "뽑은 공을 다시 넣지 않고 뽑는 방식을 ___ 추출이라 한다.",
"answers": [
"비복원",
"without replacement",
"비복원추출"
],
"why": "복원 추출(with replacement)은 다시 넣는 방식입니다.",
"mode": "term"
},
{
"id": "recall-dm07-011",
"course": "discrete-math",
"src": [
"dm07",
10
],
"type": "cloze",
"q": "여사건의 확률: p(Ē) = ___",
"answers": [
"1 − p(E)",
"1-p(E)"
],
"why": "정리 1. 각 결과는 E와 Ē 중 정확히 하나에 속합니다.",
"mode": "formula"
},
{
"id": "recall-dm07-012",
"course": "discrete-math",
"src": [
"dm07",
11
],
"type": "short",
"q": "길이 10인 비트열에서 적어도 하나의 비트가 0일 확률은? (분수)",
"answers": [
"1023/1024"
],
"why": "1 − 1/2^10.",
"mode": "formula"
},
{
"id": "recall-dm07-013",
"course": "discrete-math",
"src": [
"dm07",
12
],
"type": "cloze",
"q": "p(E1 ∪ E2) = p(E1) + p(E2) − ___",
"answers": [
"p(E1 ∩ E2)",
"p(E1∩E2)"
],
"why": "포함배제: 두 번 더해진 교집합을 한 번 뺍니다.",
"mode": "formula"
},
{
"id": "recall-dm07-014",
"course": "discrete-math",
"src": [
"dm07",
13
],
"type": "short",
"q": "1~100 중 2 또는 5의 배수를 고를 확률은? (기약분수)",
"answers": [
"3/5"
],
"why": "(50 + 20 − 10)/100.",
"mode": "formula"
},
{
"id": "recall-dm07-015",
"course": "discrete-math",
"src": [
"dm07",
14
],
"type": "short",
"q": "몬티 홀 문제에서 문을 바꾸면 이길 확률은?",
"answers": [
"2/3"
],
"why": "처음 고른 문이 틀렸을 확률(2/3)만큼 바꾸기가 이깁니다.",
"mode": "formula"
},
{
"id": "recall-dm07-016",
"course": "discrete-math",
"src": [
"dm07",
17
],
"type": "short",
"q": "결과마다 0~1의 확률을 배정하고 그 합이 1인 함수 p를 무엇이라 하는가?",
"answers": [
"확률분포",
"probability distribution"
],
"why": "조건 i: 0 ≤ p(s) ≤ 1, 조건 ii: Σp(s) = 1.",
"mode": "term"
},
{
"id": "recall-dm07-017",
"course": "discrete-math",
"src": [
"dm07",
18
],
"type": "short",
"q": "앞면이 뒷면보다 두 배 자주 나오는 동전에서 p(H)는?",
"answers": [
"2/3"
],
"why": "2p(T) + p(T) = 1 → p(T) = 1/3.",
"mode": "formula"
},
{
"id": "recall-dm07-018",
"course": "discrete-math",
"src": [
"dm07",
19
],
"type": "short",
"q": "원소 n개인 집합의 모든 원소에 1/n을 배정하는 분포는?",
"answers": [
"균등분포",
"uniform distribution",
"균일분포"
],
"why": "라플라스 정의와 같은 결과를 줍니다.",
"mode": "term"
},
{
"id": "recall-dm07-019",
"course": "discrete-math",
"src": [
"dm07",
20
],
"type": "cloze",
"q": "일반적 분포에서 사건 E의 확률은 E에 속한 결과들의 ___의 합이다.",
"answers": [
"확률",
"p(s)",
"확률값"
],
"why": "p(E) = Σ(s∈E) p(s).",
"mode": "term"
},
{
"id": "recall-dm07-020",
"course": "discrete-math",
"src": [
"dm07",
21
],
"type": "short",
"q": "3이 다른 눈의 두 배로 나오는 주사위에서 홀수가 나올 확률은?",
"answers": [
"4/7"
],
"why": "p(3) = 2/7, 나머지 1/7 → 1/7 + 2/7 + 1/7.",
"mode": "formula"
},
{
"id": "recall-dm07-021",
"course": "discrete-math",
"src": [
"dm07",
24
],
"type": "cloze",
"q": "조건부확률 p(E|F)의 정의: p(E ∩ F)를 ___로 나눈다.",
"answers": [
"p(F)"
],
"why": "p(F) > 0일 때 p(E|F) = p(E ∩ F)/p(F).",
"mode": "formula"
},
{
"id": "recall-dm07-022",
"course": "discrete-math",
"src": [
"dm07",
24
],
"type": "short",
"q": "길이 4 비트열에서 첫 비트가 0일 때 0이 연속 두 개 이상일 확률은?",
"answers": [
"5/8"
],
"why": "(5/16)/(1/2).",
"mode": "formula"
},
{
"id": "recall-dm07-023",
"course": "discrete-math",
"src": [
"dm07",
25
],
"type": "short",
"q": "아이가 둘인 가정에서 적어도 한 명이 아들일 때 둘 다 아들일 확률은?",
"answers": [
"1/3"
],
"why": "{BB, BG, GB} 중 BB.",
"mode": "formula"
},
{
"id": "recall-dm07-024",
"course": "discrete-math",
"src": [
"dm07",
26
],
"type": "cloze",
"q": "두 사건 E, F가 독립일 조건: p(E ∩ F) = ___",
"answers": [
"p(E)p(F)",
"p(E)·p(F)",
"p(E)*p(F)"
],
"why": "곱셈 공식으로 확인합니다.",
"mode": "formula"
},
{
"id": "recall-dm07-025",
"course": "discrete-math",
"src": [
"dm07",
27
],
"type": "short",
"q": "두 아이 문제에서 p(E)·p(F)의 값은? (E = 둘 다 아들, F = 적어도 한 명 아들)",
"answers": [
"3/16"
],
"why": "(1/4)(3/4) = 3/16 ≠ 1/4이므로 독립이 아닙니다.",
"mode": "formula"
},
{
"id": "recall-dm07-026",
"course": "discrete-math",
"src": [
"dm07",
28
],
"type": "cloze",
"q": "모든 쌍만 곱셈 공식을 만족하는 독립을 ___ 독립이라 한다.",
"answers": [
"쌍별",
"pairwise",
"쌍별 독립"
],
"why": "모든 부분 모임이 만족하면 상호(mutually) 독립.",
"mode": "term"
},
{
"id": "recall-dm07-027",
"course": "discrete-math",
"src": [
"dm07",
28
],
"type": "short",
"q": "세 사건이 상호 독립인지 확인하려면 등식 몇 개를 확인해야 하는가?",
"answers": [
"4",
"4개"
],
"why": "두 개짜리 3개 + 세 개짜리 1개.",
"mode": "formula"
},
{
"id": "recall-dm07-028",
"course": "discrete-math",
"src": [
"dm07",
29
],
"type": "short",
"q": "결과가 두 가지(성공/실패)뿐인 실험 한 번을 무엇이라 하는가?",
"answers": [
"베르누이 시행",
"Bernoulli trial",
"베르누이시행"
],
"why": "성공 확률 p, 실패 확률 q, p + q = 1.",
"mode": "term"
},
{
"id": "recall-dm07-029",
"course": "discrete-math",
"src": [
"dm07",
30
],
"type": "short",
"q": "앞면 확률 2/3인 동전 7번 중 앞면이 정확히 4번일 확률은? (분수)",
"answers": [
"560/2187"
],
"why": "C(7,4)(2/3)^4(1/3)^3 = 35·16/2187.",
"mode": "formula"
},
{
"id": "recall-dm07-030",
"course": "discrete-math",
"src": [
"dm07",
31
],
"type": "cloze",
"q": "n번 독립 베르누이 시행에서 정확히 k번 성공할 확률 b(k:n,p) = C(n,k)·p^k·q^___",
"answers": [
"(n−k)",
"n−k",
"n-k",
"(n-k)"
],
"why": "실패 횟수는 n − k(원문 증명의 k − 1은 오타).",
"mode": "formula"
},
{
"id": "recall-dm07-031",
"course": "discrete-math",
"src": [
"dm07",
31
],
"type": "short",
"q": "b(k:n,p)를 k의 함수로 본 분포의 이름은?",
"answers": [
"이항분포",
"binomial distribution"
],
"why": "b(k:n,p) = C(n,k)p^k q^(n−k).",
"mode": "term"
},
{
"id": "recall-dm07-032",
"course": "discrete-math",
"src": [
"dm07",
32
],
"type": "short",
"q": "표본공간에서 실수 집합으로 가는 함수를 무엇이라 하는가?",
"answers": [
"확률변수",
"random variable"
],
"why": "변수도 아니고 무작위도 아닌 함수입니다.",
"mode": "term"
},
{
"id": "recall-dm07-033",
"course": "discrete-math",
"src": [
"dm07",
33
],
"type": "short",
"q": "동전 세 번에서 앞면 수 X에 대해 p(X = 2)는?",
"answers": [
"3/8"
],
"why": "HHT, HTH, THH.",
"mode": "formula"
},
{
"id": "recall-dm07-034",
"course": "discrete-math",
"src": [
"dm07",
34
],
"type": "short",
"q": "생일 문제(원문 366일 가정)에서 적어도 두 명의 생일이 같을 확률이 1/2을 넘는 최소 인원은?",
"answers": [
"23",
"23명"
],
"why": "1 − p23 ≈ 0.506.",
"mode": "formula"
},
{
"id": "recall-dm07-035",
"course": "discrete-math",
"src": [
"dm07",
34
],
"type": "cloze",
"q": "생일 문제(366일)에서 j번째 사람의 생일이 앞사람들과 모두 다를 확률은 (367 − j)/___",
"answers": [
"366"
],
"why": "원문은 1년을 366일로 가정합니다.",
"mode": "formula"
},
{
"id": "recall-dm07-036",
"course": "discrete-math",
"src": [
"dm07",
35
],
"type": "short",
"q": "검사에서 \"참\" 또는 \"모름\"을 내고, 끝까지 \"모름\"이면 \"거짓\"을 출력하는 확률적 알고리즘은?",
"answers": [
"몬테카를로 알고리즘",
"몬테카를로",
"Monte Carlo",
"Monte Carlo algorithm"
],
"why": "결정 문제(참/거짓)에 씁니다.",
"mode": "term"
},
{
"id": "recall-dm07-037",
"course": "discrete-math",
"src": [
"dm07",
36
],
"type": "short",
"q": "합성수가 무작위 밑 b에 대한 밀러 검사를 통과할 확률의 상한은?",
"answers": [
"1/4"
],
"why": "k번 연속 통과 확률 < (1/4)^k.",
"mode": "formula"
},
{
"id": "recall-dm07-038",
"course": "discrete-math",
"src": [
"dm07",
36
],
"type": "cloze",
"q": "밀러 검사에 실패한 n은 반드시 ___이다.",
"answers": [
"합성수",
"composite"
],
"why": "실패는 합성수의 확실한 증거입니다.",
"mode": "term"
},
{
"id": "recall-dm07-039",
"course": "discrete-math",
"src": [
"dm07",
40
],
"type": "cloze",
"q": "베이즈 정리: p(F|E) = p(E|F)p(F) / [p(E|F)p(F) + p(E|F̄)·___]",
"answers": [
"p(F̄)",
"p(Fbar)",
"p(not F)"
],
"why": "분모는 E가 F, F̄를 거쳐 일어나는 두 경로의 합 p(E).",
"mode": "formula"
},
{
"id": "recall-dm07-040",
"course": "discrete-math",
"src": [
"dm07",
40
],
"type": "short",
"q": "상자 1(초록 2, 빨강 7), 상자 2(초록 4, 빨강 3) 문제에서 빨강일 때 상자 1일 확률은?",
"answers": [
"49/76"
],
"why": "(7/18)/(38/63) = 49/76 ≈ 0.645.",
"mode": "formula"
},
{
"id": "recall-dm07-041",
"course": "discrete-math",
"src": [
"dm07",
42
],
"type": "cloze",
"q": "곱셈 규칙: p(E ∩ F) = p(E|F)·___",
"answers": [
"p(F)"
],
"why": "조건부확률 정의의 분모를 넘긴 식.",
"mode": "formula"
},
{
"id": "recall-dm07-042",
"course": "discrete-math",
"src": [
"dm07",
43
],
"type": "cloze",
"q": "전확률 공식: p(E) = p(E|F)p(F) + ___",
"answers": [
"p(E|F̄)p(F̄)",
"p(E|Fbar)p(Fbar)"
],
"why": "E를 F와 F̄로 나눈 두 조각의 합.",
"mode": "formula"
},
{
"id": "recall-dm07-043",
"course": "discrete-math",
"src": [
"dm07",
45
],
"type": "short",
"q": "원문 희귀병 문제(유병률 1/100,000)에서 양성일 때 병이 있을 확률은 약? (소수 셋째 자리)",
"answers": [
"0.002"
],
"why": "(0.99)(0.00001)/[(0.99)(0.00001) + (0.005)(0.99999)] ≈ 0.002.",
"mode": "formula"
},
{
"id": "recall-dm07-044",
"course": "discrete-math",
"src": [
"dm07",
44
],
"type": "short",
"q": "원문 희귀병 검사에서 병이 없는 사람이 양성으로 나올 확률 p(E|D̄)는?",
"answers": [
"0.005",
".005"
],
"why": "1 − 0.995.",
"mode": "formula"
},
{
"id": "recall-dm07-045",
"course": "discrete-math",
"src": [
"dm07",
47
],
"type": "short",
"q": "기계 A, B, C(생산 50/30/20%, 불량률 1/2/3%)에서 불량품이 C에서 나왔을 확률은?",
"answers": [
"6/17"
],
"why": "0.006/0.017.",
"mode": "formula"
},
{
"id": "recall-dm07-046",
"course": "discrete-math",
"src": [
"dm07",
48
],
"type": "cloze",
"q": "스팸 B, 정상 G에서 단어 w의 추정값 q(w) = nG(w)/___",
"answers": [
"|G|"
],
"why": "p(w) = nB(w)/|B|, q(w) = nG(w)/|G|.",
"mode": "formula"
},
{
"id": "recall-dm07-047",
"course": "discrete-math",
"src": [
"dm07",
49
],
"type": "cloze",
"q": "p(S) = 1/2 가정의 단어 하나 스팸 필터: r(w) = p(w) / (p(w) + ___)",
"answers": [
"q(w)"
],
"why": "r(w) > 기준이면 스팸.",
"mode": "formula"
},
{
"id": "recall-dm07-048",
"course": "discrete-math",
"src": [
"dm07",
50
],
"type": "short",
"q": "\"Rolex\" 예에서 p(Rolex) = 250/2000의 올바른 값은?",
"answers": [
"0.125",
".125"
],
"why": "원문의 .0125는 오타입니다.",
"mode": "formula"
},
{
"id": "recall-dm07-049",
"course": "discrete-math",
"src": [
"dm07",
50
],
"type": "short",
"q": "\"Rolex\" 예의 r(Rolex)는 약? (소수 셋째 자리)",
"answers": [
"0.962"
],
"why": "0.125/(0.125 + 0.005).",
"mode": "formula"
},
{
"id": "recall-dm07-050",
"course": "discrete-math",
"src": [
"dm07",
52
],
"type": "short",
"q": "\"stock\", \"undervalued\" 두 단어 예의 r 값은 약? (소수 셋째 자리)",
"answers": [
"0.930",
"0.93"
],
"why": "(0.2)(0.1)/[(0.2)(0.1) + (0.06)(0.025)].",
"mode": "formula"
},
{
"id": "recall-dm07-051",
"course": "discrete-math",
"src": [
"dm07",
53
],
"type": "cloze",
"q": "k개 단어 스팸 필터 r의 분모: Π p(wi) + ___",
"answers": [
"Π q(wi)",
"Πq(wi)"
],
"why": "원문 슬라이드는 Π p(wi)로 잘못 적혀 있습니다.",
"mode": "formula"
},
{
"id": "recall-dm07-052",
"course": "discrete-math",
"src": [
"dm07",
56
],
"type": "short",
"q": "공정한 주사위 눈의 기댓값은? (분수)",
"answers": [
"7/2",
"3.5"
],
"why": "21/6 = 7/2.",
"mode": "formula"
},
{
"id": "recall-dm07-053",
"course": "discrete-math",
"src": [
"dm07",
56
],
"type": "cloze",
"q": "기댓값의 정의: E(X) = Σ(s∈S) p(s)·___",
"answers": [
"X(s)"
],
"why": "결과마다 값 × 확률을 더합니다.",
"mode": "formula"
},
{
"id": "recall-dm07-054",
"course": "discrete-math",
"src": [
"dm07",
57
],
"type": "short",
"q": "동전 세 번의 앞면 수 X의 기댓값은?",
"answers": [
"3/2",
"1.5"
],
"why": "0·1/8 + 1·3/8 + 2·3/8 + 3·1/8.",
"mode": "formula"
},
{
"id": "recall-dm07-055",
"course": "discrete-math",
"src": [
"dm07",
58
],
"type": "short",
"q": "성공 확률 p인 독립 베르누이 시행 n번의 성공 횟수의 기댓값은?",
"answers": [
"np"
],
"why": "정리 2.",
"mode": "formula"
},
{
"id": "recall-dm07-056",
"course": "discrete-math",
"src": [
"dm07",
59
],
"type": "cloze",
"q": "정리 2 증명에 쓰인 항등식: k·C(n,k) = ___",
"answers": [
"n·C(n−1,k−1)",
"nC(n−1,k−1)",
"n*C(n-1,k-1)",
"nC(n-1,k-1)",
"n·C(n-1,k-1)"
],
"why": "6.4절 연습문제 21.",
"mode": "formula"
},
{
"id": "recall-dm07-057",
"course": "discrete-math",
"src": [
"dm07",
60
],
"type": "cloze",
"q": "기댓값의 선형성: E(aX + b) = ___",
"answers": [
"aE(X) + b",
"aE(X)+b"
],
"why": "정리 3 (ii).",
"mode": "formula"
},
{
"id": "recall-dm07-058",
"course": "discrete-math",
"src": [
"dm07",
61
],
"type": "short",
"q": "모자 돌려주기 문제에서 자기 모자를 받는 사람 수의 기댓값은?",
"answers": [
"1"
],
"why": "n·(1/n) = 1, n과 무관.",
"mode": "formula"
},
{
"id": "recall-dm07-059",
"course": "discrete-math",
"src": [
"dm07",
61
],
"type": "cloze",
"q": "사건이 일어나면 1, 아니면 0인 확률변수의 기댓값은 그 사건의 ___과 같다.",
"answers": [
"확률"
],
"why": "E(X) = 1·p(A) + 0·p(Ā) = p(A).",
"mode": "term"
},
{
"id": "recall-dm07-060",
"course": "discrete-math",
"src": [
"dm07",
62
],
"type": "short",
"q": "1~n의 무작위 순열에서 평균 역순 쌍의 개수는?",
"answers": [
"n(n−1)/4",
"n(n-1)/4"
],
"why": "C(n,2)·(1/2).",
"mode": "formula"
},
{
"id": "recall-dm07-061",
"course": "discrete-math",
"src": [
"dm07",
62
],
"type": "short",
"q": "순열 3, 5, 1, 4, 2의 역순 개수는?",
"answers": [
"6"
],
"why": "(1,3), (1,5), (2,3), (2,4), (2,5), (4,5).",
"mode": "formula"
},
{
"id": "recall-dm07-062",
"course": "discrete-math",
"src": [
"dm07",
65
],
"type": "short",
"q": "x가 반드시 리스트에 있을 때 선형 탐색의 평균 비교 횟수는?",
"answers": [
"n+2",
"n + 2"
],
"why": "E = p(n + 2) + (2n + 2)q에서 p = 1, q = 0.",
"mode": "formula"
},
{
"id": "recall-dm07-063",
"course": "discrete-math",
"src": [
"dm07",
65
],
"type": "short",
"q": "선형 탐색에서 x가 리스트에 없을 때 비교 횟수는?",
"answers": [
"2n+2",
"2n + 2"
],
"why": "원문: 2n + 2 comparisons are used if x is not on the list.",
"mode": "formula"
},
{
"id": "recall-dm07-064",
"course": "discrete-math",
"src": [
"dm07",
68
],
"type": "short",
"q": "삽입 정렬(n개)의 평균 비교 횟수는?",
"answers": [
"(n^2+3n−4)/4",
"(n^2+3n-4)/4"
],
"why": "(1/2)[(n + 1)(n + 2)/2 − 3]. Θ(n^2).",
"mode": "formula"
},
{
"id": "recall-dm07-065",
"course": "discrete-math",
"src": [
"dm07",
69
],
"type": "short",
"q": "처음 성공까지의 시행 횟수 X가 따르는 분포는?",
"answers": [
"기하분포",
"geometric distribution"
],
"why": "p(X = k) = (1 − p)^(k−1)p.",
"mode": "term"
},
{
"id": "recall-dm07-066",
"course": "discrete-math",
"src": [
"dm07",
69
],
"type": "short",
"q": "성공 확률 p인 기하분포의 기댓값은?",
"answers": [
"1/p"
],
"why": "정리 4.",
"mode": "formula"
},
{
"id": "recall-dm07-067",
"course": "discrete-math",
"src": [
"dm07",
70
],
"type": "cloze",
"q": "독립인 확률변수 X, Y에 대해 E(XY) = ___",
"answers": [
"E(X)E(Y)",
"E(X)·E(Y)",
"E(X)*E(Y)"
],
"why": "정리 5. 독립이 아니면 성립하지 않을 수 있습니다.",
"mode": "formula"
},
{
"id": "recall-dm07-068",
"course": "discrete-math",
"src": [
"dm07",
71
],
"type": "cloze",
"q": "분산의 계산 공식: V(X) = E(X^2) − ___",
"answers": [
"E(X)^2",
"E(X)²"
],
"why": "정리 6. 제곱의 평균 − 평균의 제곱.",
"mode": "formula"
},
{
"id": "recall-dm07-069",
"course": "discrete-math",
"src": [
"dm07",
71
],
"type": "short",
"q": "분산의 제곱근을 무엇이라 하는가?",
"answers": [
"표준편차",
"standard deviation",
"σ(X)"
],
"why": "σ(X) = √V(X).",
"mode": "term"
},
{
"id": "recall-dm07-070",
"course": "discrete-math",
"src": [
"dm07",
72
],
"type": "short",
"q": "성공 확률 p인 베르누이 확률변수의 분산은?",
"answers": [
"pq",
"p(1−p)",
"p(1-p)"
],
"why": "X^2 = X이므로 p − p^2 = pq.",
"mode": "formula"
},
{
"id": "recall-dm07-071",
"course": "discrete-math",
"src": [
"dm07",
72
],
"type": "short",
"q": "공정한 주사위 눈의 분산은? (분수)",
"answers": [
"35/12"
],
"why": "91/6 − 49/4.",
"mode": "formula"
},
{
"id": "recall-dm07-072",
"course": "discrete-math",
"src": [
"dm07",
73
],
"type": "short",
"q": "독립인 확률변수 합의 분산은 각 분산의 합이라는 공식의 이름은?",
"answers": [
"비에네메 공식",
"Bienaymé",
"Bienaymé's formula",
"비에네메",
"Bienayme"
],
"why": "V(X + Y) = V(X) + V(Y).",
"mode": "term"
},
{
"id": "recall-dm07-073",
"course": "discrete-math",
"src": [
"dm07",
73
],
"type": "short",
"q": "n번 독립 베르누이 시행의 성공 횟수의 분산은?",
"answers": [
"npq",
"np(1−p)",
"np(1-p)"
],
"why": "비에네메 공식으로 V(Xi) = pq를 n번 더합니다.",
"mode": "formula"
},
{
"id": "recall-dm07-074",
"course": "discrete-math",
"src": [
"dm07",
74
],
"type": "cloze",
"q": "체비쇼프 부등식: p(|X − E(X)| ≥ r) ≤ ___",
"answers": [
"V(X)/r^2",
"V(X)/r²"
],
"why": "원문의 \"V(X) | r^2\"는 나눗셈입니다.",
"mode": "formula"
},
{
"id": "recall-dm07-075",
"course": "discrete-math",
"src": [
"dm07",
74
],
"type": "short",
"q": "공정한 동전 n번의 뒷면 수가 n/2에서 √n 이상 벗어날 확률의 체비쇼프 상한은?",
"answers": [
"1/4"
],
"why": "(n/4)/(√n)^2 = 1/4.",
"mode": "formula"
}
]);
