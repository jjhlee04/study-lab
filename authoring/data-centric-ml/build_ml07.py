"""데이터중심머신러닝 07 원고(ml07_a~c.py)를 dist/ml-course.js로 만든다.
실행: python3 build_ml07.py [원문 PDF 경로]
원문 PDF(07_Data_centric_ML.pptx를 LibreOffice로 변환한 것)를 주면 dist/original/ML-07-unsupervised.pdf와 쪽 이미지(pages/ml07-NN.jpg, 1200×676)를 새로 만든다.
PDF 경로를 생략하면 dist에 이미 있는 PDF·이미지를 그대로 쓴다."""
import json, os, re, shutil, subprocess, sys, tempfile
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
import ml07_common as C
for name in ['ml07_a', 'ml07_b', 'ml07_c']:
    __import__(name)
TOTAL = 46
missing = [n for n in range(1, TOTAL + 1) if n not in C.PAGES]
assert not missing, missing
DIST = os.path.normpath(os.path.join(here, '..', '..', 'dist'))
PDF = os.path.join(DIST, 'original', 'ML-07-unsupervised.pdf')

if len(sys.argv) > 1:
    shutil.copy(sys.argv[1], PDF)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', '120', '-jpeg', '-jpegopt', 'quality=85', PDF, os.path.join(tmp, 'p')], check=True)
        for n in range(1, TOTAL + 1):
            shutil.copy(os.path.join(tmp, f'p-{n:02d}.jpg'), os.path.join(DIST, 'pages', f'ml07-{n:02d}.jpg'))


def pdf_text(n):
    t = subprocess.run(['pdftotext', '-f', str(n), '-l', str(n), PDF, '-'], capture_output=True, text=True, check=True).stdout
    t = t.replace('© 2019 McGraw-Hill Education', '').replace('Access the text alternative for slide images.', '')
    t = re.sub(r'[ \t]+', ' ', t)
    return re.sub(r'\n\s*\n+', '\n', t).strip()


pages = []
for n in range(1, TOTAL + 1):
    p = dict(C.PAGES[n])
    p['image'] = f'pages/ml07-{n:02d}.jpg'
    assert os.path.exists(os.path.join(DIST, p['image'])), p['image']
    p['text'] = pdf_text(n)
    p['quiz'] = None
    if p['kind'] == 'lesson':
        qs = p['quizzes']
        p['quiz'] = qs[0][:3]
        if len(qs[0]) > 3:
            p['quizReasons'] = qs[0][3]
    pages.append(p)
chapter = dict(id='ml07', course='data-centric-ml', title='ML 07 · 비지도학습: 군집화와 차원 축소',
               url='original/ML-07-unsupervised.pdf', startPage=2, finalRange='전체', quizVersion='v2', imageRatio='1200/676', pages=pages)
out = os.path.join(DIST, 'ml-course.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('/* 데이터중심머신러닝 07 비지도학습 · 생성 파일: authoring/data-centric-ml/build_ml07.py\n'
            ' * 쪽 번호와 순서는 원문 슬라이드(07_Data_centric_ML.pptx의 PDF 변환본 ML-07-unsupervised.pdf)를 따른다. 해설·예제·풀이·퀴즈는 원문 개념을 풀어 쓴 보충 설명이다. */\n')
    f.write('window.COURSE_CHAPTERS=(window.COURSE_CHAPTERS||[]).concat([' + json.dumps(chapter, ensure_ascii=False, indent=1) + ']);\n')
lessons = [p for p in pages if p['kind'] == 'lesson']
print('pages', len(pages), 'lessons', len(lessons), 'quizzes', sum(len(p['quizzes']) for p in lessons),
      'examples', sum(len(p['lesson']['examples']) for p in lessons), 'reviews', sum('review' in p for p in pages))
