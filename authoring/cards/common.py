"""전 과목 쓰기 복습 카드(2026-11-13 추가분) 공용 도우미.
각 챕터 파일(<챕터>.py)이 deck()으로 카드를 등록하고, build.py가 dist/recall-cards-extra.js로 묶는다.
카드는 교재 해당 쪽(src)의 내용에 근거하며, 객관식 문항의 선택지만 떼어 옮기지 않는다(새로 쓴 단답·빈칸).
mode: term(띄어쓰기·대소문자 무시) / formula(공백만 무시, 소수는 같은 값 인정) / verbatim(그대로 비교)"""
CARDS = []


def deck(course, chapter):
    n = [0]

    def C(page, q, answers, why, mode='term'):
        n[0] += 1
        kind = 'cloze' if '___' in q else 'short'
        assert answers and why, q
        CARDS.append(dict(id=f'recall-{chapter}-x{n[0]:03d}', course=course, src=[chapter, page], type=kind, q=q,
                          answers=list(dict.fromkeys(answers)), why=why, mode=mode))
    return C


F = 'formula'
V = 'verbatim'
