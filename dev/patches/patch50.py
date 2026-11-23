import re,sys
import os
F=os.environ.get('OUT','/home/claude/tenis50.html')
s=open(F).read()
def R(a,b,c=1):
    global s
    n=s.count(a)
    assert n==c,(a[:60],n)
    s=s.replace(a,b)
# fontes: troca bloco Barlow pelo novo
i=s.index("<style>/* Barlow e Barlow Condensed")
j=s.index("</style>",i)+len("</style>")
s=s[:i]+open('/tmp/fonts5.css').read()+s[j:]
s=s.replace('"Barlow Condensed"','"Archivo"').replace("'Barlow Condensed'","'Archivo'").replace("Barlow Condensed","Archivo")
s=s.replace("font-family:Barlow,","font-family:'Archivo',").replace("'Barlow'","'Archivo'").replace(",Barlow,",",")
assert 'Barlow' not in s, [m.start() for m in re.finditer('Barlow',s)][:5]
# css v5
R("</style>\n</head>","</style>\n<style id=\"v5css\">"+open('p31/v5.css').read()+"</style>\n<style id=\"bcfonts\">"+open('p31/bcfonts.css').read()+"</style>\n<style id=\"bccss\">"+open('p31/bc.css').read()+"</style>\n</head>")
# seletor de temas
R("${themePicker()}","${v5ThemePicker()}",2)
# versão
R("VERSION='4.6'","VERSION='5.5'")
import importlib.util as _u;_sp=_u.spec_from_file_location('p52','/home/claude/p31/patch52.py');_m=_u.module_from_spec(_sp);_sp.loader.exec_module(_m)
def _R2(a,b,c=1):
    global s
    n=s.count(a);assert n==c,(a[:60],n);s=s.replace(a,b)
_m.apply(s,_R2)
R("}else finishTour(res.win?'Abandono (lesão)':'Qualifying',null);","}else if(!res.win&&!res.inj&&v5LL(T,t)){}else finishTour(res.win?'Abandono (lesão)':'Qualifying',null);")
R("m.center===4?5:m.center>=2?2:0","ctLv()===4?5:ctLv()>=2?2:0")
R("m.center>=3&&m.coach>=3","ctLv()>=3&&m.coach>=3")
R("+acc('center','🏟️ Local de treino',CENTERS[m.center].n,ctr,false)","+acc('center','🏟️ Base e CT',v5CtName()+' · '+myBase().city,v5BaseMini(),false)")
R("acc('base','🏠 Base e viagens'","acc('base','✈️ Viagens'")
R("""onclick="ACCO.base=true;go('train')">🏠 Mudar base""","""onclick="setBase()">🏠 Base e CT""")
R("c.ex=true;S.coaches.push(c)","c.ex=true;c.f=CIRC()==='WTA';S.coaches.push(c)")
R("const cc=pickCountry(),ex=R()<.25;return{id:'c'+(S.nextId++),n:genName(cc,R()<(CIRC()==='WTA'?.45:.15)),","const cc=pickCountry(),ex=R()<.25,fe=R()<(CIRC()==='WTA'?.45:.15);return{id:'c'+(S.nextId++),n:genName(cc,fe),f:fe,")
import re as _re
_i=s.index('<div class="card"><h3>📦 Onde você mora</h3>');_j=s.index("</div>`}",_i)
s=s[:_i]+"${v5HomeCard()}"+s[_j+6:]
# js
R("// =============== tutorial ===============",open('p31/batch50.js').read()+"\n"+open('p31/batch51.js').read()+"\n"+open('p31/batch52.js').read()+"\n"+open('p31/batch53.js').read()+"\n"+open('p31/batch54.js').read()+"\n"+open('p31/batch55.js').read()+"\n"+open('p31/batch56.js').read()+"\n"+open('p31/batch57.js').read()+"\n"+open('p31/batch58.js').read()+"\n"+open('p31/batch59.js').read()+"\n"+open('p31/batch60.js').read()+"\n"+open('p31/batch61.js').read()+"\n"+open('p31/batch62.js').read()+"\n"+open('p31/batch63.js').read()+"\n"+open('p31/batch64.js').read()+"\n"+open('p31/batch65.js').read()+"\n"+open('p31/batch66.js').read()+"\n"+open('p31/batch67.js').read()+"\n"+open('p31/batch68.js').read()+"\n"+open('p31/batch69.js').read()+"\n"+open('p31/batch70.js').read()+"\n"+open('p31/batch71.js').read()+"\n"+open('p31/batch72.js').read()+"\n"+open('p31/batch73.js').read()+"\n"+open('p31/batch74.js').read()+"\n"+open('p31/batch75.js').read()+"\n"+open('p31/batch76.js').read()+"\n"+open('p31/batch77.js').read()+"\n"+open('p31/batch78.js').read()+"\n"+open('p31/batch79.js').read()+"\n"+open('p31/batch80.js').read()+"\n"+open('p31/batch81.js').read()+"\n"+open('p31/batch82.js').read()+"\n"+open('p31/batch83.js').read()+"\n"+open('p31/batch84.js').read()+"\n"+open('p31/batch85.js').read()+"\n"+open('p31/batch86.js').read()+"\n"+open('p31/batch87.js').read()+"\n"+open('p31/batch88.js').read()+"\n"+open('p31/batch89.js').read()+"\n"+open('p31/batch90.js').read()+"\n"+open('p31/batch91.js').read()+"\n"+open('p31/batch92.js').read()+"\n"+open('p31/batch93.js').read()+"\n"+open('p31/batch94.js').read()+"\n"+open('p31/batch95.js').read()+"\n"+open('p31/batch96.js').read()+"\n"+open('p31/batch97.js').read()+"\n// =============== tutorial ===============")
open(F,'w').write(s);print('ok',len(s))
