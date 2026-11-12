"""이산수학 7장 원고(dm07_a~d.py)를 dist/dm-probability.js로 만든다.
실행: python3 build_dm07.py [원문 PDF 경로]
원문 PDF를 주면 dist/original/DM-07-discrete-probability.pdf와 쪽 이미지(pages/dm07-NN.jpg, 1200×900)를 새로 만든다.
PDF 경로를 생략하면 dist에 이미 있는 PDF·이미지를 그대로 쓴다."""
import json, os, re, shutil, subprocess, sys, tempfile
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
import dm07_common as C
for name in ['dm07_a', 'dm07_b', 'dm07_c', 'dm07_d']:
    __import__(name)
TOTAL = 74
missing = [n for n in range(1, TOTAL + 1) if n not in C.PAGES]
assert not missing, missing
DIST = os.path.normpath(os.path.join(here, '..', '..', 'dist'))
PDF = os.path.join(DIST, 'original', 'DM-07-discrete-probability.pdf')

if len(sys.argv) > 1:
    shutil.copy(sys.argv[1], PDF)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', '120', '-jpeg', '-jpegopt', 'quality=85', PDF, os.path.join(tmp, 'p')], check=True)
        for n in range(1, TOTAL + 1):
            shutil.copy(os.path.join(tmp, f'p-{n:02d}.jpg'), os.path.join(DIST, 'pages', f'dm07-{n:02d}.jpg'))


def pdf_text(n):
    t = subprocess.run(['pdftotext', '-f', str(n), '-l', str(n), PDF, '-'], capture_output=True, text=True, check=True).stdout
    t = t.replace('© 2019 McGraw-Hill Education', '').replace('Access the text alternative for slide images.', '')
    t = re.sub(r'[ \t]+', ' ', t)
    return re.sub(r'\n\s*\n+', '\n', t).strip()


pages = []
for n in range(1, TOTAL + 1):
    p = dict(C.PAGES[n])
    p['image'] = f'pages/dm07-{n:02d}.jpg'
    assert os.path.exists(os.path.join(DIST, p['image'])), p['image']
    p['text'] = pdf_text(n)
    p['quiz'] = None
    if p['kind'] == 'lesson':
        qs = p['quizzes']
        p['quiz'] = qs[0][:3]
        if len(qs[0]) > 3:
            p['quizReasons'] = qs[0][3]
    pages.append(p)
chapter = dict(id='dm07', course='discrete-math', title='7장 · Discrete Probability (이산 확률)',
               url='original/DM-07-discrete-probability.pdf', startPage=5, finalRange='전체', quizVersion='v2', pages=pages)
out = os.path.join(DIST, 'dm-probability.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('/* 이산수학 7장 이산 확률 · 생성 파일: authoring/discrete-math/build_dm07.py\n'
            ' * 쪽 번호와 순서는 원문 슬라이드 DM-07-discrete-probability.pdf를 따른다. 해설·예제·풀이·퀴즈는 원문 개념을 풀어 쓴 보충 설명이다. */\n')
    f.write('window.COURSE_CHAPTERS=(window.COURSE_CHAPTERS||[]).concat([' + json.dumps(chapter, ensure_ascii=False, indent=1) + ']);\n')
lessons = [p for p in pages if p['kind'] == 'lesson']
print('pages', len(pages), 'lessons', len(lessons), 'quizzes', sum(len(p['quizzes']) for p in lessons),
      'examples', sum(len(p['lesson']['examples']) for p in lessons), 'reviews', sum('review' in p for p in pages))
