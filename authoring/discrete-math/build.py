import json, re, shutil, os, importlib.util
D='/tmp/claude-0/-home-claude/bfde739c-4e95-5ce2-93dd-43a03266ab67/scratchpad/repo/dist'
def load(n):
    spec=importlib.util.spec_from_file_location(n,n+'.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m.PAGES
def texts(f):
    t=open(f).read().split('\f')
    out=[]
    for p in t:
        p=p.replace('© 2019 McGraw-Hill Education','').replace('Access the text alternative for slide images.','')
        p=re.sub(r'[ \t]+',' ',p);p=re.sub(r'\n\s*\n+','\n',p).strip()
        out.append(p)
    return out
chapters=[]
for cid,num,title,pdfname,src,pages,ntot,final in [
  ('dm05',5,'5장 · Induction and Recursion (귀납과 재귀)','DM-05-induction-recursion.pdf','dm5.pdf',load('c5'),83,'33-83'),
  ('dm06',6,'6장 · Counting (셈)','DM-06-counting.pdf','dm6.pdf',load('c6'),72,'전체')]:
    T=texts(f'r{num}.txt')
    shutil.copy(src,f'{D}/original/{pdfname}')
    arr=[]
    for n in range(1,ntot+1):
        img=f'pages/{cid}-{n:02d}.jpg'
        shutil.copy(f'img/{cid}-{n:02d}.jpg',f'{D}/{img}')
        text=T[n-1]
        if n in pages:
            d=pages[n]
            o={'page':n,'title':d['title'],'text':text,'explanation':d['concept'],'kind':d['kind'],'image':img,
               'quiz':None,'role':d['role'] or ('안내·주제 표지' if d['kind']=='structure' else '핵심 개념')}
            if d['kind']=='lesson':
                o['lesson']={'concept':d['concept'],'example':d['example'],'steps':d['steps'],'trap':d['trap'],'recap':d['recap'],'source':f'PDF {n}쪽'}
                if d['quiz']:
                    q,opts,why,reasons=d['quiz'];o['quiz']=[q,opts,why];o['quizReasons']=reasons
                    assert len(reasons)==len(opts),(cid,n)
            if d['review']:o['review']=d['review']
        else:
            head=text.splitlines()[0] if text else f'{n}쪽'
            o={'page':n,'title':f'5.1~5.2 · {head} (범위 밖)','text':text,
               'explanation':'5.1~5.2절(수학적 귀납법, 강한 귀납법과 정렬성) 쪽입니다. 말씀하신 기말 범위(5.3절부터) 밖이라 해설·문제를 만들지 않았고, 원문 이미지와 추출 텍스트만 제공합니다.',
               'kind':'outside','image':img,'quiz':None,'role':'기말 범위 밖 · 원문만'}
        arr.append(o)
    chapters.append({'id':cid,'course':'discrete-math','title':title,'url':f'original/{pdfname}','pages':arr,'finalRange':final,**({'startPage':33} if cid=='dm05' else {})})
    lessons=sum(1 for p in arr if p['kind']=='lesson');qz=sum(1 for p in arr if p['quiz'])
    print(cid,len(arr),'lessons',lessons,'quizzes',qz,'reviews',sum(1 for p in arr if p.get('review')))
js='/* 이산수학 교재: 5장(5.3~5.4 기말 범위) · 6장 전체. 원문은 dist/original의 PDF, 해설·문항은 페이지별 보충 설명 */\n'
js+='window.COURSE_CHAPTERS=(window.COURSE_CHAPTERS||[]).concat('+json.dumps(chapters,ensure_ascii=False)+');\n'
open(f'{D}/dm-course.js','w',encoding='utf-8').write(js)
print(len(js))
