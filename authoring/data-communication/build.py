import json,re,shutil,importlib.util,subprocess
D='/tmp/claude-0/-home-claude/bfde739c-4e95-5ce2-93dd-43a03266ab67/scratchpad/repo/dist'
def load(n):
    spec=importlib.util.spec_from_file_location(n,n+'.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m.PAGES
def texts(w):
    out=[]
    for blk in open(f't{w}.txt').read().split('## ')[1:]:
        head,_,body=blk.partition('\n');out.append(body.replace(' // ','\n').replace(' / ','\n').strip())
    return out
chapters=[]
for cid,w,title,fname in [('dc09','09','9주차 · 6장 링크 계층: 링크, 접속망, LAN','DC-09-link-layer.pdf')]:
    pages=load(f'w{w}');T=texts(w);n_tot=len(T)
    shutil.copy(f'dc{w}.pdf',f'{D}/original/{fname}')
    arr=[]
    for n in range(1,n_tot+1):
        img=f'pages/{cid}-{n:02d}.jpg';shutil.copy(f'img/dc{w}-{n:02d}.jpg',f'{D}/{img}')
        d=pages[n];o={'page':n,'title':d['title'],'text':T[n-1],'explanation':d['concept'],'kind':d['kind'],'image':img,'quiz':None,'role':d['role'] or ('안내·주제 표지' if d['kind']=='structure' else '핵심 개념')}
        if d['kind']=='lesson':
            o['lesson']={'concept':d['concept'],'example':d['example'],'steps':d['steps'],'trap':d['trap'],'recap':d['recap'],'source':f'PDF {n}쪽'}
            if d['quiz']:
                q,opts,why,rs=d['quiz'];assert len(rs)==len(opts),(cid,n);o['quiz']=[q,opts,why];o['quizReasons']=rs
        if d['review']:o['review']=d['review']
        arr.append(o)
    chapters.append({'id':cid,'course':'data-communication','title':title,'url':f'original/{fname}','pages':arr,'finalRange':'전체'})
    print(cid,len(arr),'lessons',sum(p['kind']=='lesson' for p in arr),'quiz',sum(bool(p['quiz']) for p in arr),'review',sum('review' in p for p in arr))
open(f'{D}/dc-course.js','w',encoding='utf-8').write('/* 데이터통신 교재 (기말 범위). 원문은 강의 PPT를 PDF로 변환한 것이며, 해설·문항은 페이지별 보충 설명 */\nwindow.COURSE_CHAPTERS=(window.COURSE_CHAPTERS||[]).concat('+json.dumps(chapters,ensure_ascii=False)+');\n')
