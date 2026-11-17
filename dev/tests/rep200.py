import json,sys,glob,statistics as st,collections
P=sys.argv[1];rows=[];bad=[]
for f in sorted(glob.glob(f'/home/claude/sims/{P}/[0-9]*.txt')):
    L=open(f).read().splitlines();d=[json.loads(x) for x in L if x.startswith('{"name"')]
    er=[x for x in L if x.startswith('ERRS')]
    if not d:bad.append((f[-7:-4],open(f).read()[:160]));continue
    d=d[0];d['id']=f[-7:-4];d['errs']=er[0][5:] if er else '';cfg=[l for l in open('/home/claude/sims/cfg200.txt') if l.startswith(d['id']+'|')][0].split('|',1)[1];d['cfg']=json.loads(cfg);rows.append(d)
def pct(a,q):a=sorted(a);return a[min(len(a)-1,int(q*len(a)))] if a else None
def summ(R,lab):
    if not R:return
    n=len(R);hi=[r['hiPro'] or 9999 for r in R];yrs=[max(1,r['fim']-r['ini']) for r in R]
    w=[int(r['wl'].split('-')[0]) for r in R];l=[int(r['wl'].split('-')[1]) for r in R]
    gs=[len(r['gs']) for r in R];tit=[r['tit'] for r in R];m1k=[r['cnt'].get('M1000',0) for r in R]
    print(f"== {lab}: {n} carreiras")
    print(f"  melhor ranking: #1 {sum(h==1 for h in hi)} | top10 {sum(h<=10 for h in hi)} | top50 {sum(h<=50 for h in hi)} | top100 {sum(h<=100 for h in hi)} | top300 {sum(h<=300 for h in hi)} | nunca top300 {sum(h>300 for h in hi)} | mediana #{pct(hi,.5)}")
    print(f"  Slams: total {sum(gs)} | jogadores com Slam {sum(g>0 for g in gs)} | máx {max(gs)} ; Masters: total {sum(m1k)} ; títulos mediana {pct(tit,.5)} p90 {pct(tit,.9)} máx {max(tit)}")
    print(f"  aposentadoria idade mediana {pct([r['fim'] for r in R],.5)} (p10 {pct([r['fim'] for r in R],.1)} p90 {pct([r['fim'] for r in R],.9)}) motivos {dict(collections.Counter(r['why'] for r in R))}")
    print(f"  jogos/ano mediana {pct([(a+b)/y for a,b,y in zip(w,l,yrs)],.5):.0f} | % vitórias mediana {pct([r['pct'] for r in R],.5)} | prêmios mediana US$ {pct([r['prize'] for r in R],.5):,} p90 {pct([r['prize'] for r in R],.9):,} | patrimônio final mediana {pct([r['nw'] for r in R],.5):,} ; falidos(nw<0) {sum(r['nw']<0 for r in R)}")
    for k in ['elite','medio','sorte']:
        S=[r for r in R if r['cfg']['tal']==k]
        if S:h=[r['hiPro'] or 9999 for r in S];print(f"  talento {k:6} n={len(S):3} melhor ranking mediana #{pct(h,.5)} top10 {sum(x<=10 for x in h)} Slams {sum(len(r['gs']) for r in S)} títulos med {pct([r['tit'] for r in S],.5)}")
    for k in ['facil','normal','real']:
        S=[r for r in R if r['cfg']['diff']==k]
        if S:h=[r['hiPro'] or 9999 for r in S];print(f"  dificuldade {k:6} n={len(S):3} mediana #{pct(h,.5)} top10 {sum(x<=10 for x in h)}")
    e=[r for r in R if r['errs'] not in ('','[]')]
    print(f"  carreiras com erro de código: {len(e)}",[(r['id'],r['errs'][:120]) for r in e[:3]])
summ([r for r in rows if r['cfg']['circ']=='ATP'],'ATP');summ([r for r in rows if r['cfg']['circ']=='WTA'],'WTA')
print('falhas',len(bad),bad[:3])
