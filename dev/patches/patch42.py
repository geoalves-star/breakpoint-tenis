import sys
p='/home/claude/tenis42.html';s=open(p).read()
def R(a,b,c=1):
    global s;n=s.count(a);assert n==c,(a[:70],n);s=s.replace(a,b)
mod=open('/home/claude/p31/batch42.js').read()
R("// =============== tutorial ===============",mod+"\n// =============== tutorial ===============")
css=""".retro{position:fixed;inset:0;z-index:95;background:radial-gradient(120% 80% at 50% 0%,#2a1450 0%,#0b0614 62%);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 22px 40px;text-align:center;overflow:auto;user-select:none;-webkit-user-select:none}
.retro .rbars{position:absolute;top:14px;left:14px;right:56px;display:flex;gap:4px}.retro .rbars i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.22);overflow:hidden;display:block}.retro .rbars i b{display:block;height:100%;width:0;background:#fff}.retro .rbars i.d b{width:100%}.retro .rbars i.a b{animation:rfill 6.5s linear forwards}
@keyframes rfill{to{width:100%}}.retro .rx{position:absolute;top:4px;right:8px;background:none!important;border:0!important;color:#fff!important;font-size:22px;padding:6px 10px;box-shadow:none!important;width:auto}
.retro .rsl{max-width:520px;width:100%;animation:rin .55s cubic-bezier(.2,.8,.2,1)}@keyframes rin{from{opacity:0;transform:translateY(26px) scale(.96)}to{opacity:1;transform:none}}
.retro .rk{font-weight:800;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#22e07a;margin-bottom:14px}
.retro .rbig{font:900 min(28vw,150px)/.95 "Barlow Condensed","Inter Display",Arial,sans-serif;letter-spacing:-.02em;background:linear-gradient(180deg,#fff 30%,#ffd23f);-webkit-background-clip:text;background-clip:text;color:transparent}.retro .rbig span{opacity:.45}
.retro .rt{font-size:22px;font-weight:800;margin-top:10px}.retro .rs{font-size:15px;opacity:.75;margin-top:8px;line-height:1.4}.retro .rl{margin:16px auto 0;text-align:left;display:inline-block}.retro .rl div{padding:6px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:15px}
.retro button{margin-top:10px}.retro .rcode{font:800 19px ui-monospace,Menlo,monospace;letter-spacing:.05em;background:rgba(255,255,255,.08);border:1px dashed rgba(255,255,255,.35);border-radius:12px;padding:10px 14px;margin-top:14px;display:inline-block;user-select:all;-webkit-user-select:all}
.retro button.sec{color:#fff!important;border-color:rgba(255,255,255,.35)!important;background:rgba(255,255,255,.07)!important}.retro .rhint{position:absolute;bottom:10px;left:0;right:0;font-size:11px;opacity:.45}.retro .badg{display:flex;flex-wrap:wrap;gap:8px}.retro .bdg{width:96px}
</style>"""
R("</style>",css)
R("if(c.trust<5)endCareer('demitido')}","if(c.trust<5&&!c.fired)cmFired('demitido')}")
R("{endCareer('idade');return}","{if(S.cm&&!S.cm.final){cmFired('idade');return}endCareer('idade');return}")
R("S.ended.why==='demitido'?'O atleta decidiu trocar de treinador.':","S.ended.why==='demitido'?'O atleta decidiu trocar de treinador.':S.ended.why==='cmapos'?'O treinador pendurou a prancheta. Hora de aproveitar a aposentadoria.':")
R("(S.cm?1+.06*(S.cm.acad||0):1)","(S.cm?(1+.06*(S.cm.acad||0))*(1-.05*((S.cm.pup||[]).length)):1)")
R("const pk=pick(Q);S.modals.push({k:'Coletiva de imprensa',e:'🎤',ti:`${md[0]} · ${ev.name}`,q:pk.q,o:pk.o.map(([l,t,fx])=>({l,t:`\"${t}\"`,fx}))})}",
  "try{pcExtra(Q,ev,win,stage,opp)}catch(e){}const sel=shuffle(Q.slice()).slice(0,stage==='Final'&&(TIERS[ev.tier]||{}).w>=3&&Q.length>=5?3:2);m.st.press=(m.st.press||0)+sel.length;sel.forEach((pk,i)=>S.modals.push({k:'Coletiva de imprensa',e:'🎤',ti:`${md[0]} · ${ev.name} · pergunta ${i+1} de ${sel.length}`,q:pk.q,o:pk.o.map(([l,t,fx])=>({l,t:`\"${t}\"`,fx}))}))}")
R("if(t.w>=3&&late&&R()<.7)pressConf(ev,win,stage,opp);","if((t.w>=3&&late&&R()<.7)||(stage==='Final'&&t.w<3&&R()<.35))pressConf(ev,win,stage,opp);")
R("I.rainP=true;I.E.run=0;S.me.energy=clamp(S.me.energy+6,0,100);I.feed.unshift('🌧️ CHUVA! Jogo interrompido. Os jogadores vão para o vestiário.');return true}",
  "I.rainP=true;I.E.run=0;if(R()<.35){I.rainNext=1;S.me.energy=clamp(S.me.energy+18,0,100);S.me.load=clamp((S.me.load||0)-4,0,100);I.feed.unshift('🌧️ TEMPORAL! Partida suspensa: vocês voltam amanhã, do mesmo placar.')}else{S.me.energy=clamp(S.me.energy+6,0,100);I.feed.unshift('🌧️ CHUVA! Jogo interrompido. Os jogadores vão para o vestiário.')}return true}")
R("I.rainP=false;I.feed.unshift(`☀️ A chuva parou. Jogo retomado","I.rainP=false;I.feed.unshift(`${I.rainNext?'🌅 Dia seguinte: partida retomada do mesmo placar':'☀️ A chuva parou. Jogo retomado'}")
R("<b>🌧️ Jogo interrompido pela chuva</b>","<b>${I.rainNext?'🌧️ Temporal: partida suspensa até amanhã':'🌧️ Jogo interrompido pela chuva'}</b>")
R("res.smap=I.smap||[];","res.smap=I.smap||[];res.rained=I.rained&&!I.covered?1:0;res.rainNext=I.rainNext||0;")
R("isRv?' · ⚔️ CLÁSSICO':''","isRv?(S.rvRev?' · 🔁 REVANCHE':' · ⚔️ CLÁSSICO'):''")
R("}${anaCard(opp)}","}${anaCard(opp)}${h2hCard(opp)}")
R("CUR_EV={iso:host,name:'',city:'',surf:'hard'};return R()<aiP(a,b,false,'hard')}",
  "CUR_EV={iso:host,name:'',city:'',surf:'hard'};const _w=R()<aiP(a,b,false,'hard');if(log){const pa=IDX.get(a),pb=IDX.get(b);log.push(`🎾 ${flag(pa.c)} ${esc(pa.n)} ${_w?'venceu':'perdeu para'} ${flag(pb.c)} ${esc(pb.n)}`)}return _w}")
R("const da=(tRat(A[1])+tRat(A[2]))/2,db=(tRat(B[1])+tRat(B[2]))/2;if(R()<1/(1+Math.pow(10,-(da-db)/12)))wa++;",
  "const _dm=X=>X.includes('me')&&S.dv&&S.dv.dbl&&S.dv.y===year(),_pr=X=>_dm(X)?['me',X.find((q,i)=>i>=1&&q!=='me')||X[2]]:[X[1],X[2]];const dr=X=>{const P=_pr(X);return(tRat(P[0])*(P[0]==='me'?1.04:1)+tRat(P[1]))/2};const da=dr(A),db=dr(B);const _dw=R()<1/(1+Math.pow(10,-(da-db)/12));if(_dw)wa++;"
  "if(_dm(A)||_dm(B)){S.me.energy=clamp(S.me.energy-4,0,100)}"
  "if(log){const dn=X=>_pr(X).map(q=>q==='me'?'você':esc(IDX.get(q).n.split(' ').slice(-1)[0])).join(' / ');log.push(`👥 Duplas: ${flag(ca)} ${dn(A)} ${_dw?'venceram':'perderam para'} ${flag(cb)} ${dn(B)}`);log.push(`<b>Placar do confronto: ${COUNTRIES[ca][1]} ${wa} x ${3-wa} ${COUNTRIES[cb][1]}</b>`)}")
R("lineupHtml(m.c):''}","lineupHtml(m.c)+dvDblToggle():''}")
R("${smapCard(r)}","${smapCard(r)}${r.rained?`<div class=\"xs mut\" style=\"margin-top:8px\">🌧️ ${r.rainNext?'Partida suspensa pela chuva e terminada no dia seguinte.':'Partida interrompida pela chuva.'}</div>`:''}${r.revTxt?`<div class=\"small\" style=\"margin-top:8px;color:var(--gold)\">🔁 Revanche da final de ${esc(r.revTxt)}!</div>`:''}<button class=\"sec full\" style=\"margin-top:10px\" onclick=\"shareResult()\">📲 Compartilhar resultado</button>")
R("EXPIMG?expView():","EXPIMG?expView():RETRO?retroView():")
R("if(EXPIMG){EXPIMG=null;render();return}","if(EXPIMG){EXPIMG=null;render();return}if(RETRO){retroClose();return}")
R("<h3>📸 Card da carreira</h3>","<h3>${EXPT||'📸 Card da carreira'}</h3>")
R('download="breakpoint_carreira.png"','download="${EXPFN||\'breakpoint_carreira.png\'}"')
R('<div class="g2"><a class="btn"','<button class="full" style="margin:4px 0 8px" onclick="expShare()">📤 Compartilhar (WhatsApp e outros)</button><div class="g2"><a class="btn"')
R('onclick="exportCard()">📸 Exportar card da carreira</button>','onclick="exportCard()">📸 Exportar card da carreira</button>${retroListCard()}',2)
R("VERSION='4.1'","VERSION='4.2'")
open(p,'w').write(s);print('ok')
