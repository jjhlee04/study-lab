/* 데이터중심머신러닝 07(비지도학습) 추가 문항: 단답·참거짓·계산 결과. 모든 문항은 src 쪽 내용에 근거하며, 계산 문항은 직접 계산으로 확인했다. */
(window.EXAM_BANK=window.EXAM_BANK||[]).push(
/* 단답형 */
{id:'ml-s01',course:'data-centric-ml',src:['ml07',10],type:'short',q:'K-means의 objective function J의 이름(우리말 설명)은? "군집 안 ○○ ○○○"',answer:['거리 제곱합','군집 안 거리 제곱합','거리제곱합'],why:'J = Σ‖x⁽ⁱ⁾ − μ_{cᵢ}‖² (ML07 10쪽).'},
{id:'ml-s02',course:'data-centric-ml',src:['ml07',17],type:'short',q:'K-means 결과가 초기 중심점에 따라 달라지는 문제를 줄이기 위해, 서로 떨어진 초기 중심점을 고르게 돕는 방법은?',answer:['K-means++','k-means++','kmeans++'],why:'ML07 17쪽.'},
{id:'ml-s03',course:'data-centric-ml',src:['ml07',19],type:'short',q:'feature마다 평균을 빼고 표준편차로 나누는 전처리의 이름은?',answer:['표준화','standardization','스탠더드화'],why:'z = (x − 평균)/표준편차 (ML07 19쪽).'},
{id:'ml-s04',course:'data-centric-ml',src:['ml07',22],type:'short',q:'K별 J 그래프에서 감소 폭이 갑자기 작아지는 지점을 K 후보로 고르는 방법은?',answer:['Elbow method','elbow','엘보우','엘보우 방법','팔꿈치 방법','엘보 방법'],why:'ML07 22쪽.'},
{id:'ml-s05',course:'data-centric-ml',src:['ml07',24],type:'short',q:'DBSCAN에서 Core는 아니지만 Core의 ε 안에 있는 점의 이름은?',answer:['Border','경계점','border point'],why:'Core·Border·Noise (ML07 24쪽).'},
{id:'ml-s06',course:'data-centric-ml',src:['ml07',28],type:'short',q:'병합 계층 군집화의 병합 순서와 거리를 기록한 트리 그림은?',answer:['Dendrogram','덴드로그램','dendrogram'],why:'ML07 28쪽.'},
{id:'ml-s07',course:'data-centric-ml',src:['ml07',29],type:'short',q:'합쳤을 때 J의 증가량으로 군집 사이 거리를 정의하는 linkage는?',answer:['Ward','ward','와드'],why:'Ward ≈ K-means처럼 J를 줄인다 (ML07 29쪽).'},
{id:'ml-s08',course:'data-centric-ml',src:['ml07',34],type:'short',q:'PCA에서 PC1과 직교하면서 남은 분산이 가장 큰 방향은?',answer:['PC2','제2주성분','두 번째 주성분'],why:'ML07 34쪽.'},
{id:'ml-s09',course:'data-centric-ml',src:['ml07',36],type:'short',q:'PCA에서 주성분 방향을 주는 공분산 행렬의 벡터는?',answer:['고유벡터','eigenvector','eigenvectors'],why:'고유값 = 그 방향의 분산 (ML07 36쪽).'},
{id:'ml-s10',course:'data-centric-ml',src:['ml07',40],type:'short',q:'t-SNE에서 이웃의 범위를 조절하는 설정값은?',answer:['perplexity','퍼플렉서티'],why:'ML07 40쪽.'},
{id:'ml-s11',course:'data-centric-ml',src:['ml07',40],type:'short',q:'t-SNE가 고차원 이웃 확률 p와 2차원 q의 차이로 줄이는 값은?',answer:['KL divergence','KL 발산','KL'],why:'gradient descent로 줄인다 (ML07 40쪽).'},
{id:'ml-s12',course:'data-centric-ml',src:['ml07',23],type:'short',q:'K-means가 잘 나누지 못하는, 두 초승달이 맞물린 예제 데이터의 이름은?',answer:['Two Moons','two moons','투문','두 초승달'],why:'ML07 23쪽.'},
/* 참거짓 */
{id:'ml-t01',course:'data-centric-ml',src:['ml07',15],type:'tf',q:'K-means의 할당·갱신을 반복하면 항상 J가 가장 작은 전역 최적해에 도달한다.',answer:false,why:'J는 증가하지 않지만 전역 최적해를 보장하지 않는다 (ML07 15쪽).'},
{id:'ml-t02',course:'data-centric-ml',src:['ml07',22],type:'tf',q:'K를 정할 때는 J가 가장 작은 K를 고르면 된다.',answer:false,why:'K를 계속 늘리면 J는 0으로 수렴한다 (ML07 22쪽).'},
{id:'ml-t03',course:'data-centric-ml',src:['ml07',18],type:'tf',q:'한 feature의 단위만 바꾸어도 K-means 군집 결과가 달라질 수 있다.',answer:true,why:'x₂를 100배 하면 가장 가까운 점이 바뀐다 (ML07 18쪽).'},
{id:'ml-t04',course:'data-centric-ml',src:['ml07',27],type:'tf',q:'DBSCAN은 K를 정하지 않으므로 미리 정할 값이 하나도 없다.',answer:false,why:'ε과 minPts는 정해야 한다 (ML07 27쪽).'},
{id:'ml-t05',course:'data-centric-ml',src:['ml07',27],type:'tf',q:'DBSCAN은 이상치를 억지로 군집에 넣지 않고 noise로 남긴다.',answer:true,why:'ML07 27쪽.'},
{id:'ml-t06',course:'data-centric-ml',src:['ml07',37],type:'tf',q:'PCA는 분산을 최대화하므로 단위가 큰 feature가 PC1을 결정할 수 있다.',answer:true,why:'x₂만 100배 → PC1 ≈ x₂ 축 (ML07 37쪽).'},
{id:'ml-t07',course:'data-centric-ml',src:['ml07',42],type:'tf',q:'t-SNE 그림에서 무리 사이의 거리는 원래 데이터에서의 거리 차이를 그대로 나타낸다.',answer:false,why:'무리 사이 거리도 그대로 믿기 어렵다 (ML07 42쪽).'},
{id:'ml-t08',course:'data-centric-ml',src:['ml07',43],type:'tf',q:'군집은 t-SNE 2차원 좌표 위에서 계산하는 것이 가장 좋다.',answer:false,why:'군집은 원래의 feature 공간에서 계산하고 t-SNE는 결과를 보는 창으로 쓴다 (ML07 43쪽).'},
{id:'ml-t09',course:'data-centric-ml',src:['ml07',39],type:'tf',q:'PCA는 전역 분산을 보존하지만 국소 이웃 관계는 놓칠 수 있다.',answer:true,why:'ML07 39쪽.'},
{id:'ml-t10',course:'data-centric-ml',src:['ml07',41],type:'tf',q:'원문의 PCA·t-SNE 비교 그림에서 두 방법 모두 학습에 숫자 label을 사용했다.',answer:false,why:'색과 숫자는 해석용으로만 표시했다 (ML07 41쪽).'},
/* 계산 결과 */
{id:'ml-c01',course:'data-centric-ml',src:['ml07',16],type:'code',q:'다음 K-means를 한 번(할당 → 평균 갱신) 실행한 뒤의 J는?',code:'데이터: 1, 2, 3, 8, 9, 10\nK = 2, 초기 중심점 μ₁ = 2, μ₂ = 8\n1) 가까운 중심점에 할당  2) 군집 평균으로 갱신  3) J = Σ(x − μ)^2',answer:['4'],why:'할당 {1,2,3} | {8,9,10}, 새 중심 2와 9, J = 2 + 2 = 4.'},
{id:'ml-c02',course:'data-centric-ml',src:['ml07',15],type:'code',q:'다음 K-means가 수렴했을 때 두 중심점은? (작은 값, 큰 값 순서로 쉼표)',code:'데이터: 0, 1, 5, 6\nK = 2, 초기 중심점 μ₁ = 0, μ₂ = 1\n할당 → 평균 갱신을 변화가 없을 때까지 반복',answer:['0.5, 5.5','0.5,5.5'],why:'{0}|{1,5,6} → μ = 0, 4 → {0,1}|{5,6} → μ = 0.5, 5.5 → 변화 없음.'},
{id:'ml-c03',course:'data-centric-ml',src:['ml07',25],type:'code',q:'다음 DBSCAN 설정에서 만들어지는 군집의 개수는?',code:'점(1차원): 1, 2, 3, 4, 8, 9, 10, 15\nε = 1.5, minPts = 3 (자기 자신 포함)\nCore 판정 → Core끼리 연결 → Border 배정',answer:['2','2개'],why:'Core 2·3이 이어진 군집 {1,2,3,4}, Core 9의 군집 {8,9,10}, 15는 Noise.'},
{id:'ml-c04',course:'data-centric-ml',src:['ml07',36],type:'code',q:'다음 PCA에서 분산 90% 이상을 설명하려면 주성분을 최소 몇 개 남겨야 하는가?',code:'공분산 행렬의 고유값(큰 순): 4, 3, 2, 1\n설명된 분산 비율 = 고유값 / 고유값 합',answer:['3','3개'],why:'누적 40%, 70%, 90% → 3개.'}
);
