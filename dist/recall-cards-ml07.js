/* 데이터중심머신러닝 07 쓰기 복습 카드 · 생성 파일: authoring/data-centric-ml/ml07_cards.py */
(window.RECALL_CARDS = window.RECALL_CARDS || []).push(...[
{
"id": "recall-ml07-001",
"course": "data-centric-ml",
"src": [
"ml07",
2
],
"type": "short",
"q": "정답 label 없이 데이터의 구조·패턴을 찾는 머신러닝 갈래는?",
"answers": [
"비지도학습",
"비지도 학습",
"unsupervised learning",
"unsupervised"
],
"why": "지도학습은 (x, y), 비지도학습은 x만 씁니다.",
"mode": "term"
},
{
"id": "recall-ml07-002",
"course": "data-centric-ml",
"src": [
"ml07",
2
],
"type": "short",
"q": "환경에서 행동하고 받은 보상으로 학습하는 머신러닝 갈래는?",
"answers": [
"강화학습",
"강화 학습",
"reinforcement learning",
"reinforcement"
],
"why": "원문 그림: Reinforcement Learning — Q-Learning 등.",
"mode": "term"
},
{
"id": "recall-ml07-003",
"course": "data-centric-ml",
"src": [
"ml07",
3
],
"type": "cloze",
"q": "지도학습의 입력은 feature x와 ___ y이다.",
"answers": [
"정답",
"label",
"레이블",
"라벨"
],
"why": "비지도학습의 입력은 feature x만.",
"mode": "term"
},
{
"id": "recall-ml07-004",
"course": "data-centric-ml",
"src": [
"ml07",
5
],
"type": "short",
"q": "신경망이 가중치를 학습하는 방식은?",
"answers": [
"gradient descent",
"경사하강법",
"경사 하강법",
"그래디언트 디센트"
],
"why": "원문 표: Neural Network — Gradient descent.",
"mode": "term"
},
{
"id": "recall-ml07-005",
"course": "data-centric-ml",
"src": [
"ml07",
5
],
"type": "short",
"q": "결정 트리가 분할 기준을 고를 때 비교하는 양은?",
"answers": [
"불순도 감소량",
"불순도",
"impurity decrease",
"불순도감소량"
],
"why": "원문 표: Decision Tree — 불순도 감소량 비교.",
"mode": "term"
},
{
"id": "recall-ml07-006",
"course": "data-centric-ml",
"src": [
"ml07",
5
],
"type": "cloze",
"q": "K-means가 학습하는 것은 군집의 ___이다.",
"answers": [
"중심점",
"centroid",
"중심",
"센트로이드"
],
"why": "할당과 평균 갱신 반복으로 중심점을 찾습니다.",
"mode": "term"
},
{
"id": "recall-ml07-007",
"course": "data-centric-ml",
"src": [
"ml07",
6
],
"type": "short",
"q": "다음 토큰 예측, 가려진 patch 복원처럼 데이터 자체에서 문제를 만들어 표현을 배우는 학습은?",
"answers": [
"자가지도 학습",
"자가지도학습",
"self-supervised learning",
"self-supervised",
"자기지도학습",
"자기지도 학습"
],
"why": "원문 ②: 모델을 위한 표현 학습(자가지도).",
"mode": "term"
},
{
"id": "recall-ml07-008",
"course": "data-centric-ml",
"src": [
"ml07",
7
],
"type": "short",
"q": "데이터를 더 적은 수의 좌표로 표현하는 비지도학습 작업은?",
"answers": [
"차원 축소",
"차원축소",
"dimensionality reduction"
],
"why": "원문: PCA, t-SNE.",
"mode": "term"
},
{
"id": "recall-ml07-009",
"course": "data-centric-ml",
"src": [
"ml07",
10
],
"type": "cloze",
"q": "K-means의 objective function J는 군집 안 거리 ___의 합이다.",
"answers": [
"제곱",
"제곱합"
],
"why": "J = Σ‖x⁽ⁱ⁾ − μ_{cᵢ}‖².",
"mode": "term"
},
{
"id": "recall-ml07-010",
"course": "data-centric-ml",
"src": [
"ml07",
10
],
"type": "cloze",
"q": "K-means 기호 cᵢ의 뜻은? (데이터 i에 할당한 ___ )",
"answers": [
"군집 번호",
"클러스터 번호",
"군집번호",
"군집"
],
"why": "μⱼ는 군집 j의 평균 위치, K는 군집 수.",
"mode": "term"
},
{
"id": "recall-ml07-011",
"course": "data-centric-ml",
"src": [
"ml07",
11
],
"type": "short",
"q": "K-means에서 각 데이터를 가장 가까운 중심점에 배정하는 단계의 영어 이름은?",
"answers": [
"Assignment",
"assignment step",
"할당"
],
"why": "다음 단계는 Update(평균으로 갱신).",
"mode": "term"
},
{
"id": "recall-ml07-012",
"course": "data-centric-ml",
"src": [
"ml07",
11
],
"type": "short",
"q": "K-means에서 군집별 평균으로 중심점을 옮기는 단계의 영어 이름은?",
"answers": [
"Update",
"update step",
"갱신"
],
"why": "Assignment ↔ Update 반복.",
"mode": "term"
},
{
"id": "recall-ml07-013",
"course": "data-centric-ml",
"src": [
"ml07",
14
],
"type": "short",
"q": "군집에 속한 점이 2, 4, 9일 때 갱신된 중심점은?",
"answers": [
"5"
],
"why": "(2 + 4 + 9)/3 = 5.",
"mode": "formula"
},
{
"id": "recall-ml07-014",
"course": "data-centric-ml",
"src": [
"ml07",
14
],
"type": "short",
"q": "점 (0, 0), (4, 2)로 이루어진 군집의 새 중심점은? (x, y) 형식",
"answers": [
"(2,1)",
"(2, 1)",
"2,1"
],
"why": "좌표별 평균.",
"mode": "formula"
},
{
"id": "recall-ml07-015",
"course": "data-centric-ml",
"src": [
"ml07",
15
],
"type": "cloze",
"q": "K-means 반복에서 J는 ___하지 않지만 전역 최적해를 보장하지 않는다.",
"answers": [
"증가",
"커지지",
"늘지"
],
"why": "국소 최적해에 머물 수 있습니다.",
"mode": "term"
},
{
"id": "recall-ml07-016",
"course": "data-centric-ml",
"src": [
"ml07",
16
],
"type": "short",
"q": "데이터 1, 2, 3, 8, 9, 10, 초기 μ₁ = 2, μ₂ = 8로 한 번 반복한 뒤의 μ₂는?",
"answers": [
"9"
],
"why": "(8 + 9 + 10)/3.",
"mode": "formula"
},
{
"id": "recall-ml07-017",
"course": "data-centric-ml",
"src": [
"ml07",
16
],
"type": "short",
"q": "같은 퀴즈(1, 2, 3, 8, 9, 10 / μ₁ = 2, μ₂ = 8)에서 갱신 후 J는?",
"answers": [
"4"
],
"why": "(1+0+1) + (1+0+1).",
"mode": "formula"
},
{
"id": "recall-ml07-018",
"course": "data-centric-ml",
"src": [
"ml07",
17
],
"type": "short",
"q": "서로 떨어진 초기 중심점을 고르도록 돕는 K-means 초기화 방법은?",
"answers": [
"K-means++",
"kmeans++",
"k-means++",
"K-means 플러스플러스"
],
"why": "원문 17쪽. 여러 번 실행해 가장 작은 J를 고르는 방법도 함께 씁니다.",
"mode": "term"
},
{
"id": "recall-ml07-019",
"course": "data-centric-ml",
"src": [
"ml07",
18
],
"type": "short",
"q": "기준점 (0, 0)과 점 (0, 100) 사이의 거리 제곱은? (쉼표 없이)",
"answers": [
"10000",
"10,000"
],
"why": "x₂를 100배 하면 (0, 1)이 (0, 100)이 됩니다.",
"mode": "formula"
},
{
"id": "recall-ml07-020",
"course": "data-centric-ml",
"src": [
"ml07",
19
],
"type": "cloze",
"q": "표준화 공식: z = (x − 평균) / ___",
"answers": [
"표준편차",
"standard deviation",
"std",
"σ"
],
"why": "평균 0, 표준편차 1로 맞춥니다.",
"mode": "term"
},
{
"id": "recall-ml07-021",
"course": "data-centric-ml",
"src": [
"ml07",
19
],
"type": "short",
"q": "평균 10, 표준편차 5인 feature에서 x = 20의 표준화 값은?",
"answers": [
"2"
],
"why": "(20 − 10)/5.",
"mode": "formula"
},
{
"id": "recall-ml07-022",
"course": "data-centric-ml",
"src": [
"ml07",
20
],
"type": "short",
"q": "데이터 1, 2, 3, 20의 평균 중심점은?",
"answers": [
"6.5"
],
"why": "26/4 = 6.5. 이상치 하나가 평균을 크게 이동시킵니다.",
"mode": "formula"
},
{
"id": "recall-ml07-023",
"course": "data-centric-ml",
"src": [
"ml07",
22
],
"type": "short",
"q": "K를 늘려 가며 J의 감소 폭이 작아지는 지점을 K 후보로 고르는 방법은?",
"answers": [
"Elbow method",
"elbow",
"엘보우",
"엘보우 방법",
"엘보 방법",
"팔꿈치 방법"
],
"why": "원문 예제는 K ≈ 3.",
"mode": "term"
},
{
"id": "recall-ml07-024",
"course": "data-centric-ml",
"src": [
"ml07",
22
],
"type": "short",
"q": "K를 계속 늘리면 J는 어떤 값으로 수렴하는가?",
"answers": [
"0"
],
"why": "그래서 가장 작은 J만으로 K를 고르지 않습니다.",
"mode": "formula"
},
{
"id": "recall-ml07-025",
"course": "data-centric-ml",
"src": [
"ml07",
23
],
"type": "short",
"q": "K-means가 잘 나누지 못하는, 두 초승달이 맞물린 데이터 이름은?",
"answers": [
"Two Moons",
"two moons",
"투문",
"두 초승달"
],
"why": "K-means는 원형에 가까운 군집에 잘 맞습니다.",
"mode": "term"
},
{
"id": "recall-ml07-026",
"course": "data-centric-ml",
"src": [
"ml07",
24
],
"type": "short",
"q": "DBSCAN에서 ε 안에 이웃이 minPts개 이상인 점은?",
"answers": [
"Core",
"핵심점",
"core point",
"코어"
],
"why": "Border는 core 근처, Noise는 어느 core와도 닿지 않음.",
"mode": "term"
},
{
"id": "recall-ml07-027",
"course": "data-centric-ml",
"src": [
"ml07",
24
],
"type": "short",
"q": "DBSCAN에서 어느 core와도 닿지 않는 점은?",
"answers": [
"Noise",
"잡음점",
"노이즈",
"noise point"
],
"why": "이상치를 억지로 군집에 넣지 않습니다.",
"mode": "term"
},
{
"id": "recall-ml07-028",
"course": "data-centric-ml",
"src": [
"ml07",
24
],
"type": "cloze",
"q": "DBSCAN의 두 기준값은 ε와 ___이다.",
"answers": [
"minPts",
"min_samples",
"minpts"
],
"why": "ε: 이웃 반경, minPts: 밀집으로 볼 최소 점 수.",
"mode": "term"
},
{
"id": "recall-ml07-029",
"course": "data-centric-ml",
"src": [
"ml07",
25
],
"type": "cloze",
"q": "DBSCAN에서 거리가 ε 이하인 ___끼리 이어 같은 군집으로 묶는다.",
"answers": [
"핵심점",
"Core",
"core",
"코어"
],
"why": "경계점은 이웃 핵심점의 군집에 배정됩니다.",
"mode": "term"
},
{
"id": "recall-ml07-030",
"course": "data-centric-ml",
"src": [
"ml07",
26
],
"type": "short",
"q": "DBSCAN이 곡선을 따라 핵심점을 이어 군집을 확장하는 것을 원문은 무엇이라 부르는가?",
"answers": [
"연결",
"chaining",
"체이닝"
],
"why": "원문 ②: 연결(chaining).",
"mode": "term"
},
{
"id": "recall-ml07-031",
"course": "data-centric-ml",
"src": [
"ml07",
27
],
"type": "short",
"q": "DBSCAN에서 ε가 너무 크면 두 초승달은 어떻게 되는가?",
"answers": [
"하나로 합쳐진다",
"합쳐진다",
"합쳐짐",
"하나로 합쳐짐",
"하나의 군집"
],
"why": "원문 그림 ε = 0.6.",
"mode": "term"
},
{
"id": "recall-ml07-032",
"course": "data-centric-ml",
"src": [
"ml07",
28
],
"type": "short",
"q": "병합 계층 군집화에서 병합 순서와 거리를 기록한 트리는?",
"answers": [
"Dendrogram",
"덴드로그램",
"dendrogram"
],
"why": "자르는 높이가 K를 정합니다.",
"mode": "term"
},
{
"id": "recall-ml07-033",
"course": "data-centric-ml",
"src": [
"ml07",
29
],
"type": "short",
"q": "두 군집 사이 거리를 가장 가까운 두 점의 거리로 정의하는 linkage는?",
"answers": [
"Single",
"single linkage",
"단일 연결",
"single"
],
"why": "Single ≈ DBSCAN처럼 연결을 따라갑니다.",
"mode": "term"
},
{
"id": "recall-ml07-034",
"course": "data-centric-ml",
"src": [
"ml07",
29
],
"type": "short",
"q": "두 군집을 합쳤을 때 J의 증가량으로 거리를 정의하는 linkage는?",
"answers": [
"Ward",
"ward linkage",
"와드",
"ward"
],
"why": "Ward ≈ K-means처럼 J를 줄입니다.",
"mode": "term"
},
{
"id": "recall-ml07-035",
"course": "data-centric-ml",
"src": [
"ml07",
29
],
"type": "short",
"q": "두 군집 사이 거리를 가장 먼 두 점의 거리로 정의하는 linkage는?",
"answers": [
"Complete",
"complete linkage",
"완전 연결",
"complete"
],
"why": "Average는 모든 점 쌍의 평균 거리.",
"mode": "term"
},
{
"id": "recall-ml07-036",
"course": "data-centric-ml",
"src": [
"ml07",
29
],
"type": "short",
"q": "군집 {0, 1}과 {3, 6}의 Average linkage 거리는?",
"answers": [
"4"
],
"why": "(3 + 6 + 2 + 5)/4.",
"mode": "formula"
},
{
"id": "recall-ml07-037",
"course": "data-centric-ml",
"src": [
"ml07",
30
],
"type": "cloze",
"q": "Dendrogram에서 K를 정하는 것은 자르는 ___이다.",
"answers": [
"높이",
"height"
],
"why": "세로 간격이 크게 벌어지는 곳이 자연스러운 K 후보.",
"mode": "term"
},
{
"id": "recall-ml07-038",
"course": "data-centric-ml",
"src": [
"ml07",
30
],
"type": "short",
"q": "Single linkage가 띄엄띄엄 이어진 점 때문에 두 무리를 하나로 잇는 약점은?",
"answers": [
"chaining",
"체이닝",
"연쇄",
"연결"
],
"why": "DBSCAN은 그 다리 점들을 noise로 봅니다.",
"mode": "term"
},
{
"id": "recall-ml07-039",
"course": "data-centric-ml",
"src": [
"ml07",
31
],
"type": "short",
"q": "이상치를 평균으로 끌어당기는 군집화 방법은?",
"answers": [
"K-means",
"kmeans",
"k-means",
"K 평균"
],
"why": "DBSCAN은 noise로 분리, 계층적은 단독 군집이 되기 쉬움.",
"mode": "term"
},
{
"id": "recall-ml07-040",
"course": "data-centric-ml",
"src": [
"ml07",
33
],
"type": "short",
"q": "8×8 픽셀 손글씨 이미지 한 장은 몇 차원 벡터인가?",
"answers": [
"64"
],
"why": "8 × 8 = 64.",
"mode": "formula"
},
{
"id": "recall-ml07-041",
"course": "data-centric-ml",
"src": [
"ml07",
34
],
"type": "short",
"q": "분산이 가장 큰 방향을 무엇이라 하는가? (PCA)",
"answers": [
"PC1",
"제1주성분",
"첫 번째 주성분",
"1주성분"
],
"why": "PC2는 PC1과 직교하고 남은 분산이 가장 큰 방향.",
"mode": "term"
},
{
"id": "recall-ml07-042",
"course": "data-centric-ml",
"src": [
"ml07",
34
],
"type": "cloze",
"q": "PCA 투영 식: z = (x − 평균) · ___",
"answers": [
"w"
],
"why": "w는 주성분 방향의 단위벡터.",
"mode": "formula"
},
{
"id": "recall-ml07-043",
"course": "data-centric-ml",
"src": [
"ml07",
34
],
"type": "short",
"q": "평균 (2, 1), PC1 방향 w = (0.6, 0.8)일 때 점 (5, 5)의 PC1 좌표는?",
"answers": [
"5"
],
"why": "(3, 4)·(0.6, 0.8) = 1.8 + 3.2 = 5.",
"mode": "formula"
},
{
"id": "recall-ml07-044",
"course": "data-centric-ml",
"src": [
"ml07",
35
],
"type": "cloze",
"q": "PCA의 주성분 방향은 공분산 행렬의 ___이다.",
"answers": [
"고유벡터",
"eigenvector",
"eigenvectors"
],
"why": "원문: Principal directions (eigenvectors) W.",
"mode": "term"
},
{
"id": "recall-ml07-045",
"course": "data-centric-ml",
"src": [
"ml07",
36
],
"type": "cloze",
"q": "PCA에서 공분산 행렬의 고유값이 나타내는 것은 그 방향의 ___이다.",
"answers": [
"분산",
"variance"
],
"why": "고유값이 큰 순서로 k개를 고릅니다.",
"mode": "term"
},
{
"id": "recall-ml07-046",
"course": "data-centric-ml",
"src": [
"ml07",
36
],
"type": "short",
"q": "고유값 5, 3, 2에서 PC1의 설명된 분산 비율은? (%)",
"answers": [
"50",
"50%"
],
"why": "5/(5 + 3 + 2).",
"mode": "formula"
},
{
"id": "recall-ml07-047",
"course": "data-centric-ml",
"src": [
"ml07",
36
],
"type": "short",
"q": "원문에서 digits의 분산 90%를 설명하려면 주성분이 몇 개 필요한가?",
"answers": [
"21",
"21개"
],
"why": "PC1 + PC2는 28.5%.",
"mode": "formula"
},
{
"id": "recall-ml07-048",
"course": "data-centric-ml",
"src": [
"ml07",
37
],
"type": "short",
"q": "x₂만 100배로 키우고 PCA를 하면 PC1은 거의 어느 축 방향이 되는가?",
"answers": [
"x₂",
"x2",
"x₂ 축",
"x2 축"
],
"why": "단위가 큰 feature의 분산이 PC1을 결정합니다.",
"mode": "term"
},
{
"id": "recall-ml07-049",
"course": "data-centric-ml",
"src": [
"ml07",
39
],
"type": "cloze",
"q": "PCA는 전역 분산을 보존하지만 ___ 이웃 관계는 놓칠 수 있다.",
"answers": [
"국소",
"local",
"가까운"
],
"why": "PCA는 직선 축으로의 선형 투영.",
"mode": "term"
},
{
"id": "recall-ml07-050",
"course": "data-centric-ml",
"src": [
"ml07",
40
],
"type": "short",
"q": "t-SNE에서 이웃의 범위를 조절하는 값은?",
"answers": [
"perplexity",
"퍼플렉서티"
],
"why": "원문 40쪽.",
"mode": "term"
},
{
"id": "recall-ml07-051",
"course": "data-centric-ml",
"src": [
"ml07",
40
],
"type": "short",
"q": "t-SNE가 2차원에서 쓰는 꼬리가 두꺼운 분포는?",
"answers": [
"t-분포",
"t분포",
"t-distribution",
"Student t",
"t 분포"
],
"why": "덜 가까운 점을 더 멀리 둘 수 있어 무리 사이가 벌어집니다.",
"mode": "term"
},
{
"id": "recall-ml07-052",
"course": "data-centric-ml",
"src": [
"ml07",
40
],
"type": "short",
"q": "t-SNE가 gradient descent로 줄이는 p와 q의 차이 척도는?",
"answers": [
"KL divergence",
"KL 발산",
"쿨백-라이블러 발산",
"KL"
],
"why": "원문 3단계.",
"mode": "term"
},
{
"id": "recall-ml07-053",
"course": "data-centric-ml",
"src": [
"ml07",
42
],
"type": "cloze",
"q": "원문에 따르면 t-SNE 그림은 결론이 아니라 ___을 세우는 도구이다.",
"answers": [
"가설"
],
"why": "크기·거리는 그대로 믿기 어렵습니다.",
"mode": "term"
},
{
"id": "recall-ml07-054",
"course": "data-centric-ml",
"src": [
"ml07",
43
],
"type": "short",
"q": "원문 실전 흐름에서 군집화보다 먼저 하는 두 단계는? (순서대로)",
"answers": [
"표준화, PCA",
"표준화 PCA",
"표준화→PCA",
"표준화, 주성분분석"
],
"why": "① 표준화 ② PCA ③ 군집화 ④ t-SNE ⑤ 해석·점검.",
"mode": "term"
},
{
"id": "recall-ml07-055",
"course": "data-centric-ml",
"src": [
"ml07",
43
],
"type": "cloze",
"q": "원문이 피하라고 한 것: ___ 좌표 위에서 바로 군집화하기",
"answers": [
"t-SNE",
"tsne",
"t-sne"
],
"why": "크기·거리가 왜곡된 공간입니다.",
"mode": "term"
},
{
"id": "recall-ml07-056",
"course": "data-centric-ml",
"src": [
"ml07",
44
],
"type": "short",
"q": "전역 기준 시각화 방법은?",
"answers": [
"PCA",
"주성분분석",
"주성분 분석"
],
"why": "국소 기준은 t-SNE.",
"mode": "term"
},
{
"id": "recall-ml07-057",
"course": "data-centric-ml",
"src": [
"ml07",
45
],
"type": "short",
"q": "원문 45쪽: 한 칸 옮긴 0과 원본 0의 픽셀 거리는?",
"answers": [
"63.9"
],
"why": "다른 숫자 6은 27.3으로 더 가깝습니다 → 픽셀 거리 ≠ 의미 거리.",
"mode": "formula"
}
]);
