// =============== v6.0: ritmo da carreira — mensagem respondida na própria semana, pico de forma e próximo marco ===============
// ---------- responder a mensagem obrigatória direto no card da semana ----------
{const _mu=v5Must;v5Must=function(){const L=_mu();try{const i=L.findIndex(x=>x.id==='dm');if(i>=0){const D=(S.dms||[]).filter(d=>!d.done),d=D[D.length-1];if(d&&d.o&&d.o.length){const more=D.length-1;
 L[i]={...L[i],t:`Mensagem de ${d.a}${more?` (+${more})`:''}`,d:String(d.t||'').replace(/<[^>]+>/g,'').slice(0,220),b:[...d.o.slice(0,3).map((o,j)=>[o[0],`dmAnswer('${d.id}',${j});save();render()`]),['Ver no Social',"SOCTAB='dm';go('social')"]]}}}}catch(e){}return L}}
// ---------- pico de forma para os grandes torneios ----------
const V5PKT=['GS','M1000','FIN','OLY'];
{const _tr=train;train=function(){try{if(S&&!S.tour)S._wk='train'}catch(e){}return _tr.apply(this,arguments)}}
{const _rs=rest;rest=function(){try{if(S&&!S.tour)S._wk='rest'}catch(e){}return _rs.apply(this,arguments)}}
{const _ew=endWeek;endWeek=function(){try{if(S&&S.me){const k=S.tour?((S.tour.br&&S.tour.br.length<=2)||(S.results[0]&&S.results[0].w0===S.w&&/Campeão|Final|Semifinal/.test(S.results[0].r))?'deep':'tour'):(S._wk||'train');S.me.wlog=S.me.wlog||{};S.me.wlog[S.w]=k;for(const w in S.me.wlog)if(+w<S.w-10)delete S.me.wlog[w];S._wk=null}}catch(e){}return _ew()}}
function v5Peak(w){const m=S.me,L=m.wlog||{};w=w==null?S.w:w;let pk=60;const last=L[w-1];
 pk+=last==='rest'?16:last==='train'?8:last==='deep'?-10:last==='tour'?-3:0;
 let n=0;for(let k=w-4;k<w;k++)if(L[k]==='tour'||L[k]==='deep')n++;if(n>=3)pk-=(n-2)*12;
 pk+=((m.energy??80)-70)*.45;pk-=Math.max(0,(m.load||0)-60)*.5;return Math.round(clamp(pk,0,100))}
const v5PeakB=pk=>clamp((pk-55)/45,-1,1)*1.3;
{const _ef=eff;eff=function(id,surf,tacK,opp){const r=_ef.apply(this,arguments);try{if(id==='me'&&CUR_EV&&V5PKT.includes(CUR_EV.tier)&&S.me.wlog){const b=v5PeakB(v5Peak(S.busy===S.w?S.w-1:S.w));r.sv+=b;r.rt+=b;if(typeof LAST_F==='object'&&LAST_F)LAST_F.peak=Math.round(b*10)/10}}catch(e){}return r}}
function v5PeakNext(){try{for(let k=0;k<=3;k++){const w=S.w+k,evs=weekEvents(w)||[];const mine=evs.find(e=>V5PKT.includes(e.tier)&&(S.plan&&S.plan[w]===e.key||(k===0&&S.tour&&curEv()&&curEv().key===e.key)));const any=mine||evs.find(e=>e.tier==='GS'&&isPro());if(any)return{ev:any,k,mine:!!mine}}}catch(e){}return null}
function v5PeakCard(){if(!S||!S.me||!isPro()||S.ended)return'';const N=v5PeakNext();if(!N)return'';const pk=v5Peak(S.w+N.k),b=v5PeakB(pk),tip=N.k===0?(pk>=70?'Você chega inteiro. Aproveite.':'Você chega cansado: o rendimento cai um pouco.'):N.k===1?'Na semana antes, descansar ou treinar leve rende mais do que jogar outro torneio.':'Evite emendar 3 torneios ou mais antes dele.';
 return `<div class="card v5pk"><div class="row sb"><div class="mk">Pico de forma · ${esc(N.ev.name)}</div><span class="xs mut">${N.k===0?'esta semana':N.k===1?'semana que vem':`em ${N.k} semanas`}</span></div><div class="v5pkb"><i style="--p:${pk}%"></i><b>${pk}%</b></div><p class="xs mut" style="margin:6px 0 0">${b>=.3?'Bônus':b<=-.3?'Perda':'Efeito'} no jogo: ${b>0?'+':''}${b.toFixed(1)} de nível nos grandes torneios. ${tip}</p></div>`}
// ---------- próximo marco ----------
function v5Mile(){const m=S.me,out=[];try{const cat=isPro()?'pro':'jr',my=RK[cat].me,O=ORD[cat],myP=PTS[cat].me||0;const T=[1000,500,300,200,100,50,30,20,10,5,3,1];
 const tg=T.find(t=>!my||my>t);if(tg&&O&&O.length>=tg){const id=O[tg-1],need=Math.max(1,(PTS[cat][id]||0)-myP+1);out.push({t:`Top ${tg}${cat==='jr'?' juvenil':''}`,s:`faltam ${need.toLocaleString('pt-BR')} pontos`,p:clamp(myP/((PTS[cat][id]||1)+1),0,1)})}
 const w=m.st.w||0,WM=[1,10,25,50,100,200,300,500,750,1000].find(x=>x>w);if(WM)out.push({t:WM===1?"Primeira vitória":`${WM} vitórias`,s:`faltam ${WM-w}`,p:w/WM});
 const ti=(m.st.titles||[]).length,TM=[1,3,5,10,20,30,50,75,100].find(x=>x>ti);if(isPro()&&TM)out.push({t:TM===1?'Primeiro título':`${TM} títulos`,s:`faltam ${TM-ti}`,p:ti/TM})}catch(e){}return out.slice(0,3)}
function v5MileCard(){const L=v5Mile();if(!L.length)return'';return `<div class="card v5ml"><div class="mk">Próximos marcos</div>${L.map(x=>`<div class="v5mlr"><span><b>${x.t}</b><small>${x.s}</small></span><i style="--p:${Math.round(x.p*100)}%"></i></div>`).join('')}</div>`}
{const _hv=homeView;homeView=function(){let s=_hv();try{const add=v5PeakCard()+v5MileCard();if(add){const c=s.indexOf('v5conf');const i=c>=0?s.indexOf('<details',c):-1;s=i>=0?s.slice(0,i)+add+s.slice(i):s+add}}catch(e){}return s}}
// painel lateral do computador
{const _rg=v5RailGoals;v5RailGoals=function(){let s=_rg();try{const L=v5Mile();if(L.length)s+=`<div class="v5rc"><div class="v5rh"><b>Próximos marcos</b></div>${L.map(x=>`<div class="v5rg"><span>${x.t} · <span style="color:var(--mut)">${x.s}</span></span><i style="--p:${Math.round(x.p*100)}%"></i></div>`).join('')}</div>`}catch(e){}return s}}
// glossário das novas mecânicas
try{V5GLO.push(['Jogabilidade em quadra',[
 ['Tempo do golpe','Depois de cada batida aparece uma faixa no alto da quadra: o marcador mostra se você bateu cedo, no tempo ou atrasado, em milésimos. No fim da partida você vê a sua porcentagem em cada faixa e uma dica.'],
 ['Tipos de golpe','Deslize curto ou toque: top spin, o golpe seguro. Para cima com força: chapado, forte e arriscado. Para baixo: slice, bola baixa que deixa a resposta dele mais lenta. Para cima curto: deixadinha. Para baixo longo: lob.'],
 ['Bola na linha','Deslize bem longo para o lado: a bola vai buscar a linha. Rende mais pontos, mas às vezes sai por centímetros. No teclado, segure Shift.'],
 ['Saque no corpo','No saque, deslize para baixo (ou seta para baixo): menos aces, mas a devolução dele sai apertada.'],
 ['Padrão do adversário','Cada adversário tem um costume: jogar no seu lado fraco, alternar os lados, responder ataque na paralela, usar o lob ou preferir a diagonal. Depois de algumas bolas você percebe e passa a sair antes. Analista ou treinador de 3+ estrelas contam antes do jogo.'],
 ['Cansaço na partida','Em jogos longos, a janela do tempo certo fica menor, principalmente para quem tem pouco físico ou entra com pouca energia. O aviso aparece no canto da quadra.'],
 ['Intervalo de set','No Simular assistindo, a partida para entre os sets: você vê os números (saque, devolução, winners, erros, break points) e escolhe se muda a tática. Com treinador, ele sugere o que fazer.'],
 ['Pico de forma','Nos Grand Slams, Masters 1000, Finals e Olimpíadas conta como você chega: descansar ou treinar leve na semana anterior dá bônus; emendar 3 torneios ou mais antes tira rendimento.']]])}catch(e){}
