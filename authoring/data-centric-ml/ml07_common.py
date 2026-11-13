"""데이터중심머신러닝 07(비지도학습: 군집화·차원 축소) 교재 원고 공용 도우미.
쪽 번호와 순서는 원문 슬라이드(07_Data_centric_ML.pptx → PDF 변환본 ML-07-unsupervised.pdf, 46쪽)를 그대로 따른다.
표기: 거듭제곱은 ^, 거리 제곱은 ‖x − μ‖², 아래첨자는 원문처럼 μ₁ 등."""
PAGES = {}


def E(title='', work='', answer='', note='', label='풀이', answer_label='답'):
    """예제 하나: work(계산 과정)와 answer(결과)를 구분해 보여 준다."""
    d = dict(title=title, code=work.strip('\n'), lang='', codeLabel=label, out=answer.strip('\n'), note=note, error=False)
    if answer:
        d['outLabel'] = answer_label
    return d


def Q(question, options, why, reasons=None):
    """첫 번째 선택지가 정답이다(화면에서는 순서를 섞어 보여 준다)."""
    assert 2 <= len(options) <= 4, question
    assert len(set(options)) == len(options), question
    if reasons is not None:
        assert len(reasons) == len(options), question
    return [question, list(options), why] + ([list(reasons)] if reasons else [])


def S(n, title, explanation, role='안내'):
    assert n not in PAGES, n
    PAGES[n] = dict(page=n, title=title, explanation=explanation, kind='structure', role=role)


def L(n, title, intro, core, analogy, examples, steps, trap, recap, quizzes, review=None, role=None):
    assert n not in PAGES, n
    assert 2 <= len(quizzes) <= 3, n
    assert core and steps and trap and recap, n
    p = dict(page=n, title=title, explanation=intro, kind='lesson',
             lesson=dict(core=list(core), analogy=analogy, examples=list(examples), steps=list(steps),
                         trap=[trap] if isinstance(trap, str) else list(trap), recap=recap, source=f'PDF {n}쪽'),
             quizzes=quizzes)
    if review:
        p['review'] = review
    if role:
        p['role'] = role
    PAGES[n] = p


def R(original, checked, label='원문 오타 의심 · 직접 계산', ask='필요하면 강의에서 확인하세요.'):
    """원문 그대로(original)와 확인한 내용(checked)을 분리해 둔다."""
    return dict(original=original, checked=checked, label=label, ask=ask)
