"""전 과목 추가 카드를 dist/recall-cards-extra.js로 묶는다. 실행: python3 build.py"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import CARDS
import dm05, dm06, dc09, dc10, w01, w02, w06, w09, pl07, pl08  # noqa: F401  (등록 순서 = 출력 순서)

ids = [c['id'] for c in CARDS]
assert len(ids) == len(set(ids)), 'duplicate id'
for c in CARDS:
    assert c['mode'] in ('term', 'formula', 'verbatim'), c
    assert isinstance(c['src'][1], int) and c['src'][1] > 0, c

out = os.path.join(os.path.dirname(__file__), '..', '..', 'dist', 'recall-cards-extra.js')
body = ',\n'.join(json.dumps(c, ensure_ascii=False, separators=(',', ':')) for c in CARDS)
with open(out, 'w', encoding='utf-8', newline='\n') as f:
    f.write('/* 전 과목 쓰기 복습 카드 추가분. 원본: authoring/cards/*.py (build.py로 생성, 직접 고치지 말 것).\n'
            ' * 각 카드는 src 쪽의 교재 내용에 근거한다. */\n')
    f.write('(window.RECALL_CARDS=window.RECALL_CARDS||[]).push(\n' + body + '\n);\n')
by = {}
for c in CARDS:
    by[c['src'][0]] = by.get(c['src'][0], 0) + 1
print(len(CARDS), by)
