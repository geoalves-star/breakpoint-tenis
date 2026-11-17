p='/home/claude/tenis44.html';s=open(p).read()
def R(a,b,c=1):
    global s;n=s.count(a);assert n==c,(a[:80],n);s=s.replace(a,b)
R("// =============== tutorial ===============",open('/home/claude/p31/batch44.js').read()+"\n// =============== tutorial ===============")
R("const peakAge=()=>26+5*clamp((cond()-40)/50,0,1);","const peakAge=()=>25+4*clamp((cond()-40)/50,0,1);")
R("const retireAge=()=>Math.round(35+10*clamp((cond()-40)/45,0,1));","const retireAge=()=>Math.round(32+6*clamp((cond()-40)/45,0,1));")
R("a<pk+1?.55:.15}","a<pk+1?.5:.08}")
R("const rate=(.6+.5*(a-pk))*(1.4-cond()/100*.6)/52;","const rate=(.8+.6*(a-pk))*(1.4-cond()/100*.6)/52;")
R("try{dashSnap()}catch(e){}","try{dashSnap()}catch(e){}try{fatWeek()}catch(e){}")
# treinador do ano mais raro
R("const win=sc>=3.5&&R()<Math.min(.7,.2+sc*.08);","const win=sc>=5&&R()<Math.min(.5,.08+sc*.05);")
# reeleição mais difícil
R("let a=.28+(cd.plat==='base'","let a=.16-.08*Math.min(4,c.terms||0)+(cd.plat==='base'")
# coletivas menos frequentes
R("if((t.w>=3&&late&&R()<.7)||(stage==='Final'&&t.w<3&&R()<.35))pressConf(ev,win,stage,opp);","if((t.w>=3&&late&&R()<.45)||(stage==='Final'&&t.w<3&&R()<.2))pressConf(ev,win,stage,opp);")
R("slice(0,stage==='Final'&&(TIERS[ev.tier]||{}).w>=3&&Q.length>=5?3:2)","slice(0,stage==='Final'&&(TIERS[ev.tier]||{}).w>=5&&Q.length>=5?3:2)")
# alunos arquivados ao fim
R("S.cm.final=1;cmArchive(S.me);","S.cm.final=1;cmArchive(S.me);(S.cm.pup||[]).forEach(x=>{try{cmArchPup(x)}catch(e){}});S.cm.pup=[];")
# painel: carga da temporada
R("Forma = vitórias nas últimas 10 partidas. As setas comparam com o começo da semana.","Forma = vitórias nas últimas 10 partidas. As setas comparam com o começo da semana. Temporada: ${seasonLoad()} torneio(s) em 12 meses${seasonLoad()>22?' <b class=\"loss\">(acima de 22: o corpo sente e o risco de lesão sobe)</b>':' (ideal: até 22)'}.")
R("o.tal==='elite'?86+R()*4:o.tal==='medio'?72+R()*4:","o.tal==='elite'?84+R()*4:o.tal==='medio'?74+R()*5:")
R("if(p.r<p.pot)p.r=Math.min(p.pot,p.r+.03*(1+.3*(c.acad||0)));","if(p.r<p.pot)p.r=Math.min(p.pot,p.r+.015*(1+.3*(c.acad||0)));")
R("sc+=1.5*((c.pty||{})[y]||0);","sc+=.8*Math.min(3,(c.pty||{})[y]||0);")
R("lim={leve:2,eq:3,max:5}[mode]||3;let run=0,n=0,","lim={leve:2,eq:3,max:5}[mode]||3,cap={leve:16,eq:21,max:27}[mode]||21;let run=0,n=0,")
R("if(best&&(run<lim||must)){","if(best&&((run<lim&&n<cap)||must)){")
R("(${{leve:'leve',eq:'equilibrada',max:'intensa'}[mode]}). Ajuste o que quiser.`","(${{leve:'leve',eq:'equilibrada',max:'intensa'}[mode]})${n>22?'. Acima de 22 torneios o corpo sente: menos rendimento e mais lesões':''}. Ajuste o que quiser.`")
R("VERSION='4.3.1'","VERSION='4.4'")
open(p,'w').write(s);print('ok')
