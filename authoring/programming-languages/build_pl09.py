"""PL 09 원고(pl09_a~e.py)를 dist/pl-types.js로 만든다. 실행: python3 build_pl09.py"""
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
import pl09_common as C
for name in ['pl09_a', 'pl09_b', 'pl09_c', 'pl09_d', 'pl09_e']:
    __import__(name)
TOTAL = 96
missing = [n for n in range(1, TOTAL + 1) if n not in C.PAGES]
assert not missing, missing
DIST = os.path.join(here, '..', '..', 'dist')
PDF = os.path.join(DIST, 'original', 'PL-09-Types.pdf')

def pdf_text(n):
    # Searchable extracted text per page (pdftotext from poppler-utils).
    return subprocess.run(['pdftotext', '-f', str(n), '-l', str(n), PDF, '-'], capture_output=True, text=True, check=True).stdout.strip()

pages = []
for n in range(1, TOTAL + 1):
    p = dict(C.PAGES[n])
    p['image'] = f'pages/pl09-{n:02d}.jpg'
    assert os.path.exists(os.path.join(DIST, p['image'])), p['image']
    p['text'] = pdf_text(n)
    if p['kind'] == 'lesson':
        qs = p['quizzes']
        p['quiz'] = qs[0][:3]
        if len(qs[0]) > 3:
            p['quizReasons'] = qs[0][3]
    pages.append(p)
chapter = dict(id='pl09', title='PL 09 · 데이터 타입', url='original/PL-09-Types.pdf',
               startPage=4, finalRange='전체', quizVersion='v2', pages=pages)
out = os.path.join(here, '..', '..', 'dist', 'pl-types.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('/* PL 09 데이터 타입 · 생성 파일: authoring/programming-languages/build_pl09.py\n'
            ' * 쪽 번호와 순서는 영문 원문 PL-09-Types.pdf를 따른다. 해설·예제·풀이·퀴즈는 원문 개념을 풀어 쓴 보충 설명이다. */\n')
    f.write('(() => {\n  window.COURSE_CHAPTERS.push(' + json.dumps(chapter, ensure_ascii=False, indent=1) + ');\n})();\n')
lessons = [p for p in pages if p['kind'] == 'lesson']
print('pages', len(pages), 'lessons', len(lessons), 'quizzes', sum(len(p['quizzes']) for p in lessons),
      'examples', sum(len(p['lesson']['examples']) for p in lessons), 'reviews', sum('review' in p for p in pages))
