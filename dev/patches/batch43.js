// =============== v4.3: níveis de jogo ===============
const LVLS=[['rapido','⚡ Rápido','Menos gestão: entrevistas, coletivas e eventos são respondidos sozinhos, a temporada é montada automaticamente e não há política no Conselho.'],['completo','🎾 Completo','O jogo inteiro, como sempre foi.'],['esp','🧠 Especialista','Tudo do Completo, mais números exatos: chance de vitória antes de cada partida, variação semanal do painel e o voto de cada jogador no Conselho.']];
const LVL=()=>(S&&S.lvl)||'completo';
function lvlChips(cur,set){return `<div class="chips">${LVLS.map(([k,l])=>`<button class="${cur===k?'on':''}" onclick="${set}='${k}';${set==='S.lvl'?'save();':''}render()">${l}</button>`).join('')}</div><div class="xs mut">${(LVLS.find(x=>x[0]===cur)||LVLS[1])[2]}</div>`}

// =============== v4.3: painel do atleta ===============
function dashVals(){const m=S.me,H=S.hist.filter(h=>h.tier!=='TEAM').slice(0,10);return{forma:H.length?Math.round(H.filter(h=>h.win).length/H.length*100):50,moral:Math.round(m.conf??50),img:Math.round(m.app??50),torc:crowdScore(),fis:Math.round(m.energy),fed:Math.round(m.fed??50),fin:Math.round(m.money),spo:sponPay()}}
function dashSnap(){if(!S.me||S.ended)return;S.me.dsh=dashVals()}
function crowdScore(){const m=S.me;return clamp(Math.round((m.app??50)+((m.boo||0)>S.w?-30:0)),0,100)}
function dashCard(){if(S.ended||S.tour)return'';const v=dashVals(),p=S.me.dsh||v,esp=LVL()==='esp';
 const ar=(k,inv)=>{const d=v[k]-p[k];if(Math.abs(d)<(k==='fin'||k==='spo'?1:1))return'<i class="mut">●</i>';const up=d>0;return `<i class="${up?'win':'loss'}">${up?'▲':'▼'}${esp&&k!=='fin'&&k!=='spo'?Math.abs(d):''}</i>`};
 const bar=x=>`<div class="dbar"><u style="width:${clamp(x,0,100)}%;background:${x<30?'var(--bad)':x<55?'var(--gold)':'var(--acc)'}"></u></div>`;
 const tl=(k,l,val,b)=>`<div class="dt"><span>${l}</span><b>${val} ${ar(k)}</b>${b!=null?bar(b):''}</div>`;
 const tc=v.torc>=70?'Aplaude':v.torc>=40?'Neutra':'Vaia';
 const grid=`<div class="dgrid">${tl('forma','Forma',v.forma,v.forma)}${tl('moral','Moral',v.moral,v.moral)}${tl('img','Imagem',v.img,v.img)}${tl('torc','Torcida',esp?v.torc:tc,v.torc)}${tl('fis','Físico',v.fis+'⚡',v.fis)}${tl('fed','Federação',v.fed,v.fed)}${tl('fin','Dinheiro',(v.fin<0?'−$':'$')+kfmt(Math.abs(v.fin)),null)}${tl('spo','Patrocínio',v.spo?'$'+kfmt(v.spo)+'/sem':'—',null)}</div><div class="xs mut" style="margin-top:6px">Forma = vitórias nas últimas 10 partidas. As setas comparam com o começo da semana.${(S.me.boo||0)>S.w?' 🗣️ A torcida está na bronca com você.':''}</div>`;
 return acc('dash','📊 Painel do atleta',`forma ${v.forma} · moral ${v.moral} · torcida ${tc.toLowerCase()}`,grid,true)}

// =============== v4.3: torcida ===============
function crowdMood(){const m=S.me,home=CUR_EV&&CUR_EV.iso===COUNTRIES[m.c][0];if((m.boo||0)>S.w)return -1;if((home&&(m.app??50)>=55)||(m.app??50)>=85)return 1;return 0}
function booSet(wk,why){const m=S.me;m.boo=Math.max(m.boo||0,S.w+wk);if(why)news(why)}

// =============== v4.3: sala de imprensa ===============
const COLS=[['Beto Linhares','Diário do Saibro'],['Clara Moura','Revista Ponto Final'],['Rafa Quadra','Podcast Fundo de Quadra']];
function pressCol(k,c){try{const m=S.me;if(!m||S.ended)return;S.press=S.press||[];if(S.press.some(x=>x.k===k&&x.w>S.w-4))return;c=c||{};const nm=m.name,f=nm.split(' ')[0],cn=COUNTRIES[m.c][1];
 const T={elected:[1,'A voz que faltava no vestiário',`Eleit${G('o','a')} para o Conselho de Jogadores, ${nm} chega com a bandeira de ${c.plat||'mudanças'}. Agora vem a parte difícil: transformar discurso em regra aprovada.`],
  lostEl:[-1,'Campanha sem força',`${nm} tentou uma vaga no Conselho de Jogadores, mas o vestiário não comprou a ideia. Faltou apoio entre os colegas, e talvez sobrou pressa.`],
  lawY:[1,`${c.rule||'Nova regra'}: vitória de ${f}`,`A proposta de ${nm} passou no Conselho por ${c.y} a ${c.n}. Quem ganha com a mudança já comemora; quem perdeu promete voltar ao assunto.`],
  lawN:[-1,'Derrota no Conselho',`${nm} levou "${c.rule||'a proposta'}" à votação e perdeu por ${c.n} a ${c.y}. O recado do vestiário foi claro.`],
  declTeam:[-1,'Faltou vestir a camisa',`${nm} recusou a convocação para a ${TEAMN()}. Pode até fazer sentido para o calendário, mas a torcida de ${cn} não costuma esquecer.`],
  skip:[-1,'Trocou a torcida pela agenda',`${nm} deixou de lado o ${c.alt} para jogar o ${c.ev}. Em casa, a escolha pegou mal.`],
  provoc:[-1,'Língua afiada',`As declarações de ${nm} rendem cliques, mas cada frase atravessada vira munição para os adversários e afasta patrocinadores.`],
  title:[1,`${f} merece o destaque`,`O título em ${c.ev} confirma o que já se via nas últimas semanas: ${nm} está jogando com outra confiança.`],
  slump:[-1,'Fase para esquecer',`São ${c.n} derrotas seguidas para ${nm}. Ainda não é crise, mas a equipe precisa encontrar respostas logo.`],
  teamY:[1,`${f} pela ${cn}`,`Quando o país chamou, ${nm} respondeu. Atitude que conta pontos com a torcida e com a federação.`]}[k];if(!T)return;
 const col=pick(COLS);S.press.unshift({w:S.w,k,a:col[0],o:col[1],tone:T[0],t:T[1],b:T[2]});S.press=S.press.slice(0,30)}catch(e){}}
function pressView(){const P=S.press||[],H=S.news.filter(n=>/^(🏆|📈|⚔️|🔁|🏅|🏛️|🗣️|📜|🚀|🎆)/.test(n.t)).slice(0,6);
 return `<div class="card"><h3>📰 Manchetes</h3>${H.map(n=>`<div class="small" style="padding:6px 0;border-bottom:1px solid var(--line)">${n.t}<div class="xs mut">${wkDate(n.w)}</div></div>`).join('')||'<div class="small mut">Sem manchetes por enquanto.</div>'}</div>
 <div class="sec-t" style="margin:12px 4px 6px">Colunas de opinião</div>${P.map(c=>`<div class="card"><div class="row" style="gap:10px"><div class="av sm" style="display:flex;align-items:center;justify-content:center;font-weight:800;background:var(--card2)">${c.a.split(' ').map(x=>x[0]).join('')}</div><div style="flex:1;min-width:0"><b class="small">${esc(c.a)}</b><div class="xs mut">${esc(c.o)} · ${wkDate(c.w)}</div></div><span class="xs ${c.tone>0?'win':'loss'}" style="font-weight:700">${c.tone>0?'ELOGIO':'CRÍTICA'}</span></div><h4 style="margin:10px 0 4px">${esc(c.t)}</h4><p class="small" style="margin:0">${esc(c.b)}</p></div>`).join('')||'<div class="card small mut">Os colunistas ainda não escreveram sobre você. Decisões polêmicas, títulos e o Conselho de Jogadores rendem colunas.</div>'}`}

// =============== v4.3: Conselho de Jogadores ===============
const CNPLAT={base:'premiação para quem está subindo',elite:'os interesses dos melhores do mundo',vet:'mais proteção para os veteranos'};
const CNP=[
 {k:'chal',n:'Mais premiação nos Challengers e ITF',d:'+30% de prêmio nos Challengers e ITF',fav:(p,r)=>r>=80?.32:r<=30?-.18:.05},
 {k:'slam',n:'Slams pagam mais nas primeiras rodadas',d:'+40% de prêmio até a 3ª rodada dos Slams; o campeão recebe 10% menos',fav:(p,r)=>r>=40?.3:r<=10?-.35:0},
 {k:'pens',n:'Fundo de aposentadoria',d:'1% de cada prêmio vai para um fundo, devolvido em dobro quando você se aposentar',fav:(p,r)=>ageOf(p)>=29?.33:ageOf(p)<=22?-.15:.05},
 {k:'slow',n:'Bolas mais lentas',d:'O saque perde força e a devolução ganha: favorece quem joga do fundo',fav:(p,r)=>p.b>=2?-.4:p.b<=-1?.35:.03},
 {k:'trav',n:'Calendário regional',d:'Torneios agrupados por região: viagens 15% mais baratas',fav:(p,r)=>r>=100?.28:.1},
 {k:'off',n:'Pré-temporada maior',d:'Nas últimas 4 semanas do ano, cada semana recupera +8⚡ e −5 de carga',fav:(p,r)=>ageOf(p)>=27?.25:.08},
 {k:'spon',n:'Liberdade de patrocínio no uniforme',d:'Contratos de patrocínio pagam 10% a mais',fav:(p,r)=>r<=50?.3:.08}];
const cnElig=()=>isPro()&&(myRank('pro')||9999)<=300&&meAge()>=18;
function cnInf(p){const m=S.me,mr=myRank('pro')||999;return((m.app??50)-50)/250+(mr<=20?.06:mr<=100?.03:0)-(p.id===S.rival?.3:0)+(p.c===m.c?.08:0)}
function cnWeek(){const m=S.me;if(!m||S.ended)return;m.fed=clamp((m.fed??50)+(50-(m.fed??50))*.01,0,100);S.rules=S.rules||{};
 if(S.rules.off&&S.w%52>=48){m.energy=clamp(m.energy+8,0,100);m.load=clamp((m.load||0)-5,0,100)}
 if(LVL()==='rapido')return;const c=S.cn=S.cn||{},wk=S.w%52,y=year();if(y%2!==0)return;
 if(wk>=3&&wk<=5&&c.ay!==y&&cnElig()){c.ay=y;S.modals.push({k:'Conselho de Jogadores',e:'🏛️',ti:`Eleição do Conselho ${y}`,q:`Em poucas semanas, os 200 melhores do ranking ${CIRC()} elegem os representantes dos jogadores. Conselheiros propõem regras que mudam o circuito. ${c.mem?'Seu mandato termina agora: quer tentar a reeleição?':'Quer se candidatar?'} Escolha a sua bandeira:`,o:[{l:'Base do circuito',t:'Mais dinheiro para quem está subindo: forte entre quem está fora do top 60',fx:{cnRun:'base'}},{l:'Elite',t:'Defender os interesses dos melhores: forte no top 30',fx:{cnRun:'elite'}},{l:'Veteranos',t:'Proteção para quem tem 29 anos ou mais',fx:{cnRun:'vet'}},{l:'Não me candidatar',t:c.mem?'Seu mandato termina nesta eleição':'Fica para a próxima',fx:{}}]})}
 if(wk>=5&&wk<=6&&c.cand&&c.cand.y===y&&!c.cand.camp){c.cand.camp=1;S.modals.push({k:'Conselho de Jogadores',e:'🏛️',ti:'Reta final da campanha',q:'Faltam poucos dias para a votação. Como você quer fechar a campanha?',o:[{l:'Pedir apoio a um top 10',t:'Se ele topar, você ganha muitos votos; se recusar, a imprensa repercute',fx:{cnCamp:'top'}},{l:'Debate na imprensa',t:'Pode ganhar ou perder votos, dependendo da sua imagem',fx:{cnCamp:'deb'}},{l:'Campanha nas redes',t:'Ganho seguro e menor, ajudado pelos seus seguidores',fx:{cnCamp:'net'}}]})}
 if(wk>=7&&wk<=9&&c.cand&&c.cand.y===y&&!c.cand.done)cnElect();
 else if(wk>=7&&c.mem&&y>=(c.term||0)&&!(c.cand&&c.cand.y===y)){c.mem=0;news('🏛️ Seu mandato no Conselho de Jogadores terminou.')}}
function cnElect(){const m=S.me,c=S.cn,cd=c.cand;cd.done=1;const V=ORD.pro.slice(0,200).filter(id=>IDX.get(id));let yes=0;const g=[[0,0],[0,0],[0,0]];
 V.forEach((id,i)=>{const p=IDX.get(id),r=i+1;let a=.28+(cd.plat==='base'&&r>60?.25:0)+(cd.plat==='elite'&&r<=30?.32:0)+(cd.plat==='vet'&&ageOf(p)>=29?.3:0)+cnInf(p)+(cd.bon||0)+(R()-.5)*.2;const v=R()<clamp(a,.02,.95);if(v)yes++;const gi=r<=30?0:r<=100?1:2;g[gi][0]+=v?1:0;g[gi][1]++});
 const ok=yes>=V.length*.5,pct=Math.round(yes/V.length*100);
 if(ok){c.mem=1;c.term=year()+2;c.terms=(c.terms||0)+1;m.app=clamp((m.app??50)+3,0,100);m.fed=clamp((m.fed??50)+5,0,100);hl(`🏛️ Eleit${G('o','a')} para o Conselho de Jogadores`);news(`🏛️ ${m.name} é eleit${G('o','a')} para o Conselho de Jogadores com ${pct}% dos votos.`);addPost({a:MEDIA[0][0],h:MEDIA[0][1],t:`🏛️ ${m.name} ${flag(m.c)} é eleit${G('o','a')} para o Conselho de Jogadores (${pct}% dos votos).`,k:'md'});pressCol('elected',{plat:CNPLAT[cd.plat]})}
 else{news(`🏛️ ${m.name} não conseguiu votos suficientes para o Conselho (${pct}%).`);pressCol('lostEl');if(c.mem)c.mem=0}
 const gl=['Top 30','31º ao 100º','101º ao 200º'];
 S.modals.push({k:'Conselho de Jogadores',e:'🏛️',ti:ok?`Eleit${G('o','a')}! ${pct}% dos votos`:`Não foi desta vez: ${pct}%`,q:ok?`Você tem mandato até a eleição de ${year()+2} e pode propor uma regra por temporada no Conselho (Início → Conselho de Jogadores).`:'Você precisava de metade dos votos. Melhorar a imagem e o ranking ajuda na próxima eleição.',html:`<div class="dbar" style="height:10px;margin:4px 0 10px"><u style="width:${pct}%;background:${ok?'var(--acc)':'var(--bad)'}"></u></div>${g.map((x,i)=>`<div class="small">${gl[i]}: <b>${x[0]}</b> de ${x[1]} votos</div>`).join('')}`,o:[{l:'Continuar',t:'',fx:{}}]})}
function cnPropose(k,rev){const m=S.me,c=S.cn||{},y=year();if(!c.mem)return;c.py=c.py||{};if((c.py[y]||0)>=1){TOAST='Você já levou uma proposta ao Conselho nesta temporada.';render();return}c.py[y]=(c.py[y]||0)+1;
 const P=CNP.find(x=>x.k===k);const V=ORD.pro.slice(0,100).filter(id=>IDX.get(id));let yes=0;const g=[[0,0],[0,0]],named=[];
 V.forEach((id,i)=>{const p=IDX.get(id),r=i+1;let f=P.fav(p,r);if(rev)f=-f;const v=R()<clamp(.5+f+cnInf(p)+(R()-.5)*.3,.03,.97);if(v)yes++;const gi=r<=30?0:1;g[gi][0]+=v?1:0;g[gi][1]++;if(r<=12)named.push([p,v])});
 const no=V.length-yes,ok=yes>no,nm=(rev?'Revogar: ':'')+P.n;S.rules=S.rules||{};
 if(ok){if(rev)delete S.rules[k];else S.rules[k]=y;m.fed=clamp((m.fed??50)+2,0,100);(c.laws=c.laws||[]).push({y,k,rev:rev?1:0});news(`📜 Conselho aprova "${nm}" por ${yes} a ${no}. Proposta de ${m.name}.`);hl(`📜 Aprovou "${nm}" no Conselho`);pressCol('lawY',{rule:nm,y:yes,n:no})}
 else{news(`📜 Conselho rejeita "${nm}" (${yes} a ${no}).`);pressCol('lawN',{rule:nm,y:yes,n:no})}
 (c.hist=c.hist||[]).unshift({y,n:nm,yes,no,ok});c.hist=c.hist.slice(0,8);
 const esp=LVL()==='esp';
 S.modals.push({k:'Conselho de Jogadores',e:'📜',ti:ok?`Aprovada: ${nm}`:`Rejeitada: ${nm}`,q:`${yes} votos a favor e ${no} contra.${ok?(rev?' A regra deixa de valer.':' A regra já vale a partir de agora.'):''}`,html:`<div class="dbar" style="height:10px;margin:4px 0 10px"><u style="width:${yes}%;background:${ok?'var(--acc)':'var(--bad)'}"></u></div><div class="small">Top 30: <b>${g[0][0]}</b> sim, ${g[0][1]-g[0][0]} não</div><div class="small">31º ao 100º: <b>${g[1][0]}</b> sim, ${g[1][1]-g[1][0]} não</div>${esp?`<div class="sec-t" style="margin-top:8px">Votos do top 12</div>${named.map(([p,v])=>`<div class="xs">${v?'✅':'❌'} ${flag(p.c)} ${esc(p.n)}${p.id===S.rival?' (rival)':''}</div>`).join('')}`:`<div class="xs mut" style="margin-top:6px">Cada jogador vota pensando em quem sai ganhando com a mudança.</div>`}`,o:[{l:'Continuar',t:'',fx:{}}]});save();render()}
function cnCard(){const c=S.cn||{},y=year(),A=Object.keys(S.rules||{}),next=y%2===0&&S.w%52<7?y:y+(y%2===0?2:1);const used=((c.py||{})[y]||0)>=1;
 return `${c.mem?`<div class="small"><b class="win">Você é conselheir${G('o','a')}</b> · mandato até a eleição de ${c.term}</div>`:`<div class="small">Você não está no Conselho. Próxima eleição: início de ${next}${cnElig()?'':' (é preciso estar no top 300 e ter 18 anos ou mais)'}.</div>`}
 <div class="sec-t" style="margin-top:10px">Regras em vigor</div>${A.length?A.map(k=>{const P=CNP.find(x=>x.k===k);return P?`<div class="small" style="padding:4px 0">📜 <b>${P.n}</b><div class="xs mut">${P.d}</div>${c.mem&&!used?`<button class="ghost" style="padding:2px 0" onclick="cnPropose('${k}',1)">Propor revogação</button>`:''}</div>`:''}).join(''):'<div class="xs mut">Nenhuma mudança aprovada até agora.</div>'}
 ${c.mem?`<div class="sec-t" style="margin-top:10px">Levar proposta à votação ${used?'<span class="xs mut">(próxima temporada)</span>':'<span class="xs mut">(1 por temporada)</span>'}</div>${CNP.filter(P=>!A.includes(P.k)).map(P=>`<button class="opt" ${used?'disabled':''} onclick="cnPropose('${P.k}')">${P.n}<small>${P.d}</small></button>`).join('')}`:''}
 ${(c.hist||[]).length?`<div class="sec-t" style="margin-top:10px">Últimas votações</div>${c.hist.slice(0,4).map(h=>`<div class="xs">${h.ok?'✅':'❌'} ${esc(h.n)} · ${h.yes} a ${h.no} (${h.y})</div>`).join('')}`:''}`}
function cnAcc(){if(LVL()==='rapido'||!S.me||S.ended)return'';const c=S.cn||{};if(!isPro()&&!Object.keys(S.rules||{}).length)return'';return acc('cn','🏛️ Conselho de Jogadores',c.mem?'você é conselheiro':Object.keys(S.rules||{}).length?`${Object.keys(S.rules).length} regra(s) em vigor`:'eleição a cada 2 anos',cnCard(),false)}

// =============== v4.3: chance de vitória (especialista) ===============
let WPC={};
function winProb(opp){const ev=curEv();if(!ev)return null;const key=`${S.w}|${opp}|${S.me.tac}|${ev.key}`;if(WPC.k===key)return WPC.v;const ce=CUR_EV;CUR_EV=ev;let w=0;const N=60;try{const t=TIERS[ev.tier],b5=!S.tour.q&&bo5Of(t);for(let i=0;i<N;i++){const r=simMatch(eff('me',ev.surf,S.me.tac,opp),eff(opp,ev.surf),b5,false);if(r.win)w++}}finally{CUR_EV=ce}WPC={k:key,v:Math.round(w/N*100)};return WPC.v}
function winProbCard(opp){if(LVL()!=='esp'||opp==null||!S.tour)return'';const v=winProb(opp);if(v==null)return'';return `<div class="small" style="margin-top:8px">🧠 Chance estimada de vitória com esta tática: <b class="${v>=50?'win':'loss'}">${v}%</b> <span class="xs mut">(60 simulações)</span></div>`}

// =============== v4.3: base de nomes por circuito ===============
function nedStore(){try{return JSON.parse(localStorage.getItem(NKEY)||'null')}catch(e){return null}}
function nedBaseOf(circ){const b=nedStore();if(!b)return null;if(b.v===2)return b[circ]&&b[circ].auto?b[circ]:null;return b.auto?b:null}
const nedHasAuto=circ=>!!nedBaseOf(circ);
function nedSaveBase(base,circ){let o=nedStore();if(!o||o.v!==2)o={v:2};o[circ]={auto:1,...base};try{localStorage.setItem(NKEY,JSON.stringify(o))}catch(e){}}

// =============== v4.3: conquistas ===============
ACH.push(['cnel','🏛️','Voz do vestiário','Seja eleito para o Conselho de Jogadores',m=>!!(S.cn&&S.cn.terms)],['cnlaw','📜','Legislador','Aprove uma regra no Conselho',m=>!!(S.cn&&(S.cn.laws||[]).length)],['cn3','⚖️','Reformista','Aprove 3 regras no Conselho',m=>!!(S.cn&&(S.cn.laws||[]).length>=3)],['fed90','🤝','Queridinho da federação','Chegue a 90 de relação com a federação',m=>(m.fed??50)>=90],['idol','👏','Ídolo da torcida','Chegue a 90 de imagem pública',m=>(m.app??50)>=90]);
Object.assign(RARE,{cnel:1,cnlaw:2,cn3:3,fed90:2,idol:2});

// =============== v4.3: ganchos ===============
{const _ng=newGame;newGame=function(o){_ng(o);try{S.lvl=o.lvl||'completo';S.me.fed=50;save()}catch(e){}}}
{const _af=applyFx;applyFx=function(fx){_af(fx);if(!fx)return;try{const m=S.me,c=S.cn=S.cn||{};
 if(fx.cnRun){c.cand={y:year(),plat:fx.cnRun,bon:0};news(`🏛️ ${m.name} lança candidatura ao Conselho de Jogadores, defendendo ${CNPLAT[fx.cnRun]}.`)}
 if(fx.cnCamp&&c.cand){const cd=c.cand;if(fx.cnCamp==='top'){const ok=R()<.25+((m.app??50)-50)/100+((myRank('pro')||999)<=50?.15:0);if(ok){cd.bon+=.14;const p=IDX.get(ORD.pro[ri(0,9)]);news(`🤝 ${p.n} declara apoio a ${m.name} na eleição do Conselho.`)}else{cd.bon-=.04;news('🙅 O top 10 procurado preferiu não apoiar ninguém. A imprensa repercutiu a recusa.')}}
  if(fx.cnCamp==='deb'){const ok=R()<.35+((m.app??50)-50)/80-(m.behav>60?.15:0);cd.bon+=ok?.1:-.07;news(ok?'🎙️ Você foi bem no debate: muitos colegas gostaram das propostas.':'🎙️ O debate não foi bem: suas respostas viraram piada no vestiário.')}
  if(fx.cnCamp==='net'){cd.bon+=.03+Math.min(.05,Math.log10(Math.max(10,m.fol))/100);m.fol=Math.round(m.fol*1.02)}}
 if(fx.behav>=4){booSet(4);if(R()<.5)pressCol('provoc')}}catch(e){console.error(e)}}}
{const _fs=fedSupport;fedSupport=function(){return Math.round(_fs()*(.6+.8*((S.me&&S.me.fed)??50)/100))}}
{const _lc=legCost;legCost=function(a,b){const r=_lc(a,b);if(S&&S.rules&&S.rules.trav&&r.c)r.c=Math.round(r.c*.85/10)*10;return r}}
{const _aw=award;award=function(id,t,idx){const r=_aw(id,t,idx);try{if(id==='me'&&r&&r.pr>0&&S.rules){const m=S.me;let f=0;if(S.rules.chal&&[TIERS.C175,TIERS.C125,TIERS.C100,TIERS.C75,TIERS.C50,TIERS.M25,TIERS.M15].includes(t))f+=.3;if(S.rules.slam&&t===TIERS.GS){const L=t.pts.length;if(idx>=L-3)f+=.4;else if(idx===0)f-=.1}
 const ex=Math.round(r.pr*f);if(ex){m.money+=ex;m.st.prize+=ex;r.pr+=ex}if(S.rules.pens){const cut=Math.round(r.pr*.01);m.money-=cut;m.pens=(m.pens||0)+cut}}}catch(e){}return r}}
{const _ef=eff;eff=function(id,surf,tac,opp){const A=_ef.apply(this,arguments);try{if(A&&S.rules&&S.rules.slow){A.sv-=.5;A.rt+=.5}if(A&&id==='me'&&S.me){const cm=crowdMood();if(cm<0){A.sv-=.3;A.rt-=.3}else if(cm>0){A.sv+=.25;A.rt+=.25}}}catch(e){}return A}}
{const _ec=enterCourt;enterCourt=function(){_ec();try{if(IM){const cm=crowdMood();if(cm<0)IM.feed.unshift('🗣️ Vaias quando você entra em quadra: a torcida não esqueceu a polêmica.');else if(cm>0)IM.feed.unshift('👏 A torcida está com você: aplausos na entrada em quadra.');render()}}catch(e){}}}
{const _en=enter;enter=function(key){const m=S.me,home=COUNTRIES[m.c][0];let alt=null,ev=null;try{const W=weekEvents(S.w);ev=W.find(e=>e.key===key);if(ev&&ev.iso!==home)alt=W.find(e=>e.key!==key&&e.iso===home&&TIERS[e.tier].cat===TIERS[ev.tier].cat&&TIERS[e.tier].w>=(TIERS[e.tier].cat==='jr'?1.2:2.5)&&TIERS[e.tier].w>=TIERS[ev.tier].w*.6&&!((m.hsk||{})[e.name+year()])&&entryStatus(e).ok)}catch(e){}
 const was=!!S.tour;_en(key);try{if(!was&&S.tour&&alt){(m.hsk=m.hsk||{})[alt.name+year()]=1;m.app=clamp((m.app??50)-1.5,0,100);m.fed=clamp((m.fed??50)-2,0,100);booSet(6,`🗣️ Torcedores de ${COUNTRIES[m.c][1]} reclamaram: você trocou o ${alt.name} pelo ${ev.name}.`);pressCol('skip',{alt:alt.name,ev:ev.name});save();render()}}catch(e){}}}
{const _ps=playSpecial;playSpecial=function(kind,accept){try{if(kind!=='lv'){const m=S.me;if(accept){m.fed=clamp((m.fed??50)+6,0,100);pressCol('teamY')}else{m.fed=clamp((m.fed??50)-10,0,100);booSet(10);pressCol('declTeam')}}}catch(e){}return _ps(kind,accept)}}
{const _ch=champion;champion=function(ev){try{const m=S.me;if(ev.iso===COUNTRIES[m.c][0]&&ev.tier!=='EXH')m.fed=clamp((m.fed??50)+3,0,100);if((TIERS[ev.tier].w||0)>=2)pressCol('title',{ev:ev.name})}catch(e){}return _ch(ev)}}
{const _um=userMatch;userMatch=function(opp,ev,bo5,stage,pre){const res=_um.apply(this,arguments);try{const m=S.me;if(res.win)m.lstk=0;else{m.lstk=(m.lstk||0)+1;if(m.lstk===4)pressCol('slump',{n:4})}}catch(e){}return res}}
{const _ecr=endCareer;endCareer=function(why){try{const m=S.me;if(m&&m.pens>0&&!m.pensPaid){m.pensPaid=1;m.money+=m.pens*2;news(`💰 O fundo de aposentadoria do Conselho devolveu ${money(m.pens*2)} para você.`)}}catch(e){}return _ecr(why)}}
{const _as=autoSkip;let busy=false;autoSkip=function(){_as();if(!S||busy||LVL()!=='rapido')return;busy=true;let n=0;try{while(S.modals.length&&['Entrevista','Coletiva de imprensa','Evento'].includes(S.modals[0].k)&&n++<12){const md=S.modals.shift();applyFx(md.o[0].fx||{})}}finally{busy=false}}}
{const _ny=newYear;newYear=function(){_ny();try{if(LVL()==='rapido'&&!S.ended&&!Object.keys(S.plan).some(w=>+w>=S.w)){autoPlan('eq',0);TOAST=null}}catch(e){}}}
