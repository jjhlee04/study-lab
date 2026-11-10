"""PL 09 데이터 타입 교재 원고 공용 도우미.
PDF 쪽 번호(영문 원문 PL-09-Types.pdf)와 순서를 그대로 따른다."""
PAGES = {}

def E(title='', code='', lang='', out='', note='', error=False, outLabel=''):
    d = dict(title=title, code=code.strip('\n'), lang=lang, out=out.strip('\n'), note=note, error=error)
    if outLabel:
        d['outLabel'] = outLabel
    return d

def Q(question, options, why, reasons=None):
    assert 2 <= len(options) <= 4, question
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

def R(original, checked, label, ask):
    return dict(original=original, checked=checked, label=label, ask=ask)
