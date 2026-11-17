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
R("VERSION='4.6'","VERSION='5.0'")
# js
R("// =============== tutorial ===============",open('p31/batch50.js').read()+"\n// =============== tutorial ===============")
open(F,'w').write(s);print('ok',len(s))
