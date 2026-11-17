import re,sys
F='/home/claude/tenis50.html'
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
R("</style>\n</head>","</style>\n<style id=\"v5css\">"+open('p31/v5.css').read()+"</style>\n</head>")
# seletor de temas
R("${themePicker()}","${v5ThemePicker()}",2)
# versão
R("VERSION='4.6'","VERSION='5.1'")
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
R("// =============== tutorial ===============",open('p31/batch50.js').read()+"\n"+open('p31/batch51.js').read()+"\n// =============== tutorial ===============")
open(F,'w').write(s);print('ok',len(s))
