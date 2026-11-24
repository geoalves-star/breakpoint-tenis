// =============== v6.8 · primeiros passos, dificuldade explicada, cartão para compartilhar e conquistas novas ===============
// ---------- cartão 1080x1350 genérico (Instagram e X) ----------
async function bcShareCard(o){try{const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');try{await document.fonts.ready}catch(e){}
 const BAR='#0C0C0E',HI=o.col||'#FFE14D',TX='#FFFFFF',MU='#9a9aa3',FC='"Barlow Condensed",Arial Narrow,sans-serif',FD='Barlow,Arial,sans-serif';
 g.fillStyle=BAR;g.fillRect(0,0,W,H);g.strokeStyle='#ffffff0d';g.lineWidth=2;for(let x=-H;x<W;x+=150){g.beginPath();g.moveTo(x,H);g.lineTo(x+H*.47,0);g.stroke()}
 const rg=g.createRadialGradient(W/2,560,40,W/2,560,520);rg.addColorStop(0,HI+'33');rg.addColorStop(1,HI+'00');g.fillStyle=rg;g.fillRect(0,0,W,H);
 g.fillStyle=HI;g.fillRect(0,0,W,14);g.font=`800 40px ${FC}`;g.textAlign='left';g.fillText((o.kick||'').toUpperCase(),80,110);
 if(o.tag){g.textAlign='right';g.fillStyle=MU;g.font=`700 34px ${FC}`;g.fillText(o.tag.toUpperCase(),W-80,110)}
 g.textAlign='center';g.fillStyle=HI;g.font='260px serif';g.fillText(o.icon||'🏆',W/2,600);
 const fit=(t,f,max)=>{g.font=f;let n=t;while(g.measureText(n).width>max&&n.length>4)n=n.slice(0,-1);return n};
 {const t=fit((o.title||'').toUpperCase(),`800 120px ${FC}`,W-120);g.fillStyle=TX;g.font=`800 120px ${FC}`;g.fillText(t,W/2,780)}
 let y=780;if(o.big){y+=110;g.fillStyle=HI;g.font=`800 110px ${FC}`;g.fillText(String(o.big),W/2,y)}
 if(o.name){y+=120;g.fillStyle=TX;const t=fit(o.name.toUpperCase(),`800 64px ${FC}`,W-120);g.font=`800 64px ${FC}`;g.fillText(t,W/2,y)}
 if(o.sub){y+=60;g.fillStyle=MU;const t=fit(o.sub,`500 36px ${FD}`,W-140);g.font=`500 36px ${FD}`;g.fillText(t,W/2,y)}
 if(o.why){y+=60;g.fillStyle=TX;const t=fit(o.why,`600 34px ${FD}`,W-160);g.font=`600 34px ${FD}`;g.fillText(t,W/2,y)}
 g.fillStyle=HI;g.fillRect(0,H-150,W,150);g.fillStyle=BAR;g.textAlign='left';g.font=`800 52px ${FC}`;g.fillText('BREAKPOINT',80,H-62);g.textAlign='right';g.font=`600 30px ${FD}`;g.fillText('breakpoint-vercel-one.vercel.app',W-80,H-62);
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));const file=new File([blob],(o.file||'breakpoint')+'.png',{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({files:[file],title:`${o.title} · Breakpoint Tênis`});else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}}catch(e){console.error(e)}}

// ---------- dificuldade explicada, com efeito além da quadra ----------
BCPICK.diff={t:'Dificuldade',o:{
 facil:{n:'Fácil',i:'😊',d:'Para curtir a carreira e subir mais rápido.',p:['+3 no saque e na devolução em toda partida.','Treino rende 20% a mais.','Você fica com mais do prêmio: 12% a menos de taxas.','Lesões 30% menos frequentes.'],c:['Menos desafio nos grandes torneios.']},
 normal:{n:'Normal',i:'⚖️',d:'O equilíbrio padrão do jogo.',p:['Nas carreiras que simulamos, cerca de 15% chegaram a número 1 e 1 em 3 entrou no top 10.'],c:['Sem ajuda extra: técnico e investimentos fazem diferença.']},
 real:{n:'Realista',i:'🧠',d:'Como no circuito de verdade.',p:['Para quem quer um desafio de verdade.'],c:['−2,5 no saque e na devolução, e mais ainda quando você está no top 10.','Os rivais estudam seu jogo e surgem mais jovens fortes.','Chegar a número 1 é raro: cerca de 2% das carreiras simuladas.']}}};
try{DIFF.facil[1]='Para subir mais rápido: +3 no saque e na devolução, treino 20% melhor, menos taxas e menos lesões.'}catch(e){}
const bcEasy=()=>{try{return S&&S.diff==='facil'}catch(e){return false}};
{const _g=gain;gain=function(k,base){if(bcEasy()){const a=S.me.attrs[k];const r=_g.apply(this,arguments);const d=S.me.attrs[k]-a;if(d>0){S.me.attrs[k]=Math.min(99,a+d*1.2);return d*1.2}return r}return _g.apply(this,arguments)}}
{const _t=v5Tax;v5Tax=function(){const h=_t.apply(this,arguments);return bcEasy()?Math.max(0,h-.12):h}}
{const _i=injure;injure=function(a,b){if(bcEasy()&&R()<.3){news('🍀 Foi só um susto: a dor passou e não virou lesão.');return}return _i.apply(this,arguments)}}

// ---------- primeiros passos ----------
const BCOB={
 cal:['📅','Monte sua temporada','Escolha os torneios das próximas semanas no calendário. Quem planeja viaja menos e gasta menos.',()=>Object.keys(S.plan||{}).some(w=>+w>=S.ob.w0),"TOURTAB='cal';go('tour')"],
 tr:['💪','Escolha o plano de treino','Na aba Equipe, escolha um plano pronto ou monte o seu dia a dia. Ele roda sozinho toda semana.',()=>!!S.ob.tr,"go('train')"],
 post:['📱','Faça o primeiro post','Fãs trazem patrocinadores. Um post por semana já ajuda.',()=>S.posted!=null&&S.posted>=0,"go('social')"],
 wk:['⏭️','Termine a primeira semana','Confirme a decisão da semana no botão grande do Início.',()=>S.w>S.ob.w0,"go('home');window.scrollTo(0,0)"],
 m1:['🎾','Jogue a primeira partida','Entre num torneio da semana. Na partida, escolha a tática e como quer jogar.',()=>(S.hist||[]).some(h=>h.tier!=='TEAM'),"TOURTAB='week';go('tour')"],
 w1:['🏅','Vença a primeira partida','A primeira vitória sobe a confiança e os pontos de ranking.',()=>(S.me.st.w||0)>=1,"TOURTAB='week';go('tour')"]};
const BCOBC={
 cal:['📅','Monte a temporada do atleta','Escolha os torneios no calendário. Bons torneios dão pontos sem gastar demais.',()=>Object.keys(S.plan||{}).some(w=>+w>=S.ob.w0),"TOURTAB='cal';go('tour')"],
 staff:['🧰','Monte sua equipe técnica','Contrate um preparador físico, um fisioterapeuta ou um olheiro no painel da equipe.',()=>{const s=(S.cm&&S.cm.st)||{};return (s.pf||0)+(s.fis||0)+(s.sc||0)>0},"go('home');setTimeout(()=>{const e=document.querySelector('.bcstf');e&&e.scrollIntoView({block:'center'})},60)"],
 m1:['🎾','Acompanhe a primeira partida','Com você no box, o atleta joga melhor. Nos intervalos, ajuste a tática.',()=>(S.hist||[]).some(h=>h.tier!=='TEAM'),"TOURTAB='week';go('tour')"],
 wk:['⏭️','Termine a primeira semana','Confirme a decisão da semana no botão grande do Início.',()=>S.w>S.ob.w0,"go('home');window.scrollTo(0,0)"],
 w1:['🏅','Primeira vitória do atleta','Cada vitória dá experiência para você subir de nível como técnico.',()=>(S.me.st.w||0)>=1,"TOURTAB='week';go('tour')"]};
const bcObL=()=>bcV2()?BCOBC:BCOB;
function bcObInit(){if(!S||!S.me||S.ob)return;S.ob={w0:S.w,d:{},on:1,tr:0,h:{}}}
function bcObTick(){const o=S&&S.ob;if(!o||!o.on||S.ended)return;const L=bcObL();let nw=0;
 for(const [k,v] of Object.entries(L)){if(o.d[k])continue;let ok=false;try{ok=v[3]()}catch(e){}if(ok){o.d[k]=S.w+1;nw++;if(bcV2()){S.cm.wallet=(S.cm.wallet||0)+300}else{S.me.money+=300}}}
 const n=Object.keys(L).filter(k=>o.d[k]).length;if(n>=Object.keys(L).length&&!o.fin){o.fin=1;o.on=0;const $=1500;if(bcV2())S.cm.wallet=(S.cm.wallet||0)+$;else S.me.money+=$;news(`🎓 Primeiros passos concluídos! Bônus de ${money($)}.`);TOAST=`🎓 Primeiros passos concluídos! +${money($)}`}
 else if(nw&&!QUIET&&!TOAST)TOAST=`✅ Passo concluído: +${money(300)}`}
function bcObCard(){const o=S.ob;if(!o||!o.on||S.ended||S.tour)return'';if(S.w>o.w0+40){o.on=0;return''}
 const L=Object.entries(bcObL()),n=L.filter(([k])=>o.d[k]).length,nx=L.find(([k])=>!o.d[k]);if(!nx)return'';const [k,v]=nx;
 return `<div class="card bcob"><div class="bcobh"><span class="bckick">Primeiros passos · ${n}/${L.length}</span><button class="ghost bcobx" onclick="S.ob.on=0;save();render()" aria-label="Fechar">✕</button></div>
 <div class="bcobb"><i style="width:${n/L.length*100}%"></i></div>
 <div class="bcobn"><span class="bcobi">${v[0]}</span><div><b>${v[1]}</b><small>${v[2]}</small></div></div>
 <button class="bcobgo" onclick="${v[4].replace(/"/g,'&quot;')}">Ir agora</button>
 <div class="bcobl">${L.map(([kk,vv])=>`<span class="${o.d[kk]?'ok':kk===k?'nx':''}"><b>${o.d[kk]?'✓':vv[0]}</b> <em>${vv[1]}</em></span>`).join('')}</div>
 <div class="xs mut" style="margin-top:6px">Cada passo vale ${money(300)}. Completar todos vale mais ${money(1500)}.</div></div>`}
// dicas na hora certa (uma vez cada)
const BCHINT={
 lowE:[()=>S.me.energy<40&&!S.tour,'🔋','Energia baixa','Descansar uma semana recupera bastante energia. Jogar cansado rende menos e aumenta o risco de lesão.'],
 loss1:[()=>(S.me.st.l||0)>=1&&(S.me.st.w||0)<3,'💬','Derrota faz parte','A confiança cai um pouco depois de perder e volta com vitórias. Torneios de nível menor ajudam a retomar o ritmo.'],
 cash:[()=>!bcV2()&&S.me.money<1500&&S.w>(S.ob?S.ob.w0:0)+2,'💸','Dinheiro curto','Torneios perto de casa custam menos de viagem. Patrocinadores aparecem conforme você sobe no ranking e ganha fãs.'],
 pro:[()=>!bcV2()&&!S.me.pro&&meAge()>=17,'🚀','Hora de pensar no profissional','Aos 17 anos você já pode virar profissional. Os torneios ITF (M15 e M25) são a porta de entrada.']};
function bcHintCard(){const o=S.ob;if(!o||S.ended||S.tour)return'';o.h=o.h||{};for(const [k,v] of Object.entries(BCHINT)){if(o.h[k])continue;let ok=false;try{ok=v[0]()}catch(e){}if(ok)return `<div class="card tipc bchint"><div class="row sb"><b>${v[1]} ${v[2]}</b><button class="ghost" style="padding:4px 10px" onclick="S.ob.h['${k}']=1;save();render()">Entendi</button></div><div class="small" style="margin-top:4px">${v[3]}</div></div>`}return''}
{const _ng=newGame;newGame=function(o){const r=_ng.apply(this,arguments);try{S.ob=null;bcObInit()}catch(e){}return r}}
{const _sp=setPreset;setPreset=function(){const r=_sp.apply(this,arguments);try{if(S.ob)S.ob.tr=1}catch(e){}return r}}
{const _sd=setDay;setDay=function(){const r=_sd.apply(this,arguments);try{if(S.ob)S.ob.tr=1}catch(e){}return r}}
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{bcObTick()}catch(e){}return r}}
{const _r=render;render=function(...a){try{if(S&&S.ob&&!MENU)bcObTick()}catch(e){}const v=_r.apply(this,a);try{if(S&&S.me&&!MENU&&TAB==='home'&&!S.tour&&!S.modals.length){const wk=document.querySelector('.bcwk');if(wk&&!document.querySelector('.bcob,.bchint')){const h=bcObCard()+bcHintCard();if(h)wk.insertAdjacentHTML('afterend',h)}}}catch(e){console.error(e)}return v}}

// ---------- conquistas: novas, cerimônia e cartão ----------
const bcStreak=()=>{let b=0,c=0;for(const h of (S.hist||[]).slice().reverse()){if(h.tier==='TEAM')continue;if(h.win){c++;b=Math.max(b,c)}else c=0}return b};
const bcTEv=t=>{try{return tierEv(t.tier,t.n)||{}}catch(e){return{}}};
ACH.push(
 ['jr10','🎓','Top 10 juvenil','Entre no top 10 do ranking juvenil',m=>m.st.hiJr&&m.st.hiJr<=10],
 ['dv1','🇺🇳','Convocação','Defenda seu país na competição por equipes',m=>((m.st.dv||{}).n||0)>=1],
 ['top50','📈','Top 50','Entre no top 50',m=>m.st.hiPro&&m.st.hiPro<=50],
 ['upset','💥','Derrubou um top 10','Vença um adversário do top 10',m=>(S.hist||[]).some(h=>h.win&&h.or&&h.or<=10&&h.tier!=='TEAM')],
 ['str10','🔥','10 seguidas','Vença 10 partidas seguidas',m=>bcStreak()>=10],
 ['home','🏠','Campeão em casa','Ganhe um título profissional no seu país',m=>m.st.titles.some(t=>t.tier!=='TEAM'&&bcTEv(t).iso===COUNTRIES[m.c][0])],
 ['pan','🌎','Ouro pan-americano','Ganhe o ouro nos Jogos Pan-Americanos',m=>(m.st.pan||[]).some(x=>x.k==='ouro')],
 ['med','🏅','Medalhista olímpico','Ganhe qualquer medalha nas Olimpíadas',m=>(m.st.medals||[]).length>0],
 ['yr50','📆','Temporada de ouro','Vença 50 partidas numa mesma temporada',m=>{const c={};(S.hist||[]).forEach(h=>{if(h.win&&h.tier!=='TEAM'){const y=year0(h.w);c[y]=(c[y]||0)+1}});return Object.values(c).some(v=>v>=50)}],
 ['surf3','🌈','Dono dos três pisos','Ganhe títulos profissionais na dura, no saibro e na grama',m=>{const s=new Set(m.st.titles.filter(t=>t.tier!=='TEAM').map(t=>bcTEv(t).surf));return s.has('hard')&&s.has('clay')&&s.has('grass')}]);
Object.assign(RARE,{jr10:0,dv1:0,top50:1,upset:1,str10:1,home:1,pan:1,med:1,yr50:2,surf3:2});
const bcAchOf=id=>ACH.find(a=>a[0]===id);
function bcAchShare(id){const a=bcAchOf(id),m=S.me;if(!a||!(m.ach||{})[id])return;const rr=RARE[id]??1;
 bcShareCard({kick:'Conquista desbloqueada',tag:RARL[rr][0],col:rr>=3?'#FFD400':rr===2?'#B388FF':rr===1?'#39C0FF':'#FFE14D',icon:a[1],title:a[2],big:year0(m.ach[id]),name:m.name,sub:`${COUNTRIES[m.c][1]} · ${myRank('pro')?'#'+myRank('pro')+' do mundo':myRank('jr')?'#'+myRank('jr')+' juvenil':'Breakpoint Tênis'}`,why:a[3],file:`breakpoint_conquista_${id}`})}
{const _c=checkAch;checkAch=function(){const m=S.me,b=new Set(Object.keys(m.ach||{}));const r=_c.apply(this,arguments);try{if(QUIET||bcV2())return r;const nw=Object.keys(m.ach||{}).filter(k=>!b.has(k)).map(bcAchOf).filter(Boolean).sort((x,y)=>(RARE[y[0]]??1)-(RARE[x[0]]??1));const a=nw[0];
 if(a&&(RARE[a[0]]??1)>=1&&!S.modals.some(x=>x.k==='Conquista')){const rr=RARE[a[0]]??1;S.modals.push({k:'Conquista',e:a[1],ti:a[2],q:`${a[3]}. Conquista ${RARL[rr][0].toLowerCase()}${nw.length>1?`, junto com mais ${nw.length-1}`:''}.`,html:`<div class="bcachm">${badgeSVG(a[0],a[1],true)}</div>`,o:[{l:'Continuar',t:'',fx:{}},{l:'Compartilhar a conquista',t:'Imagem pronta para Instagram e X',fx:{bcAch:a[0]}}]})}}catch(e){console.error(e)}return r}}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcAch){const id=fx.bcAch;setTimeout(()=>bcAchShare(id),0)}}catch(e){}return r}}
{const _ac=achCard;achCard=function(){let h=_ac.apply(this,arguments);try{const A=S.me.ach||{};ACH.forEach(([id,e,nm,d])=>{h=h.replace(`<div class="bdg on" title="${esc(d)}">${badgeSVG(id,e,true)}`,`<div class="bdg on" role="button" title="${esc(d)}" onclick="bcAchShare('${id}')">${badgeSVG(id,e,true)}`).replace(`<div class="bdg " title="${esc(d)}">${badgeSVG(id,e,false)}`,`<div class="bdg " role="button" title="${esc(d)}" onclick="TOAST='🔒 ${esc(d).replace(/'/g,'’')}.';render()">${badgeSVG(id,e,false)}`)});
 h=h.replace('</h3>','</h3><div class="xs mut" style="margin:-2px 0 6px">Toque numa conquista para gerar a imagem e compartilhar.</div>')}catch(e){}return h}}
