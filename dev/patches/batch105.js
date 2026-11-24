// =============== v6.8 · seleção: ficha da seleção, Jogos Pan-Americanos e técnico capitão ===============
// ---------- convocações contadas ----------
{const _ps=playSpecial;playSpecial=function(kind,accept){try{if(accept&&kind!=='lv'){const st=S.me.st;st.dv=st.dv||{n:0,y:[]};st.dv.n++;if(!st.dv.y.includes(year()))st.dv.y.push(year())}}catch(e){}return _ps.apply(this,arguments)}}
function bcSelCard(){const m=S.me,st=m.st,H=(S.hist||[]).filter(h=>h.tier==='TEAM'),dv=H.filter(h=>h.e===TEAMN()),pa=H.filter(h=>h.e==='Jogos Pan-Americanos');
 const tw=st.titles.filter(t=>t.tier==='TEAM').length,md=st.medals||[],pn=st.pan||[],cv=(st.dv||{}).n||0;
 if(!cv&&!md.length&&!pn.length&&!H.length)return `<div class="card bcsel"><h3>${flag(m.c)} Seleção</h3><div class="small mut">Você ainda não defendeu ${esc(COUNTRIES[m.c][1])}. A convocação para a ${TEAMN()} chega para quem está entre os melhores do país no ranking profissional${bcAmer(m.c)?'. Os Jogos Pan-Americanos acontecem a cada 4 anos':''}. As Olimpíadas também acontecem a cada 4 anos.</div></div>`;
 const ic=k=>k.startsWith('ouro')?'🥇':k.startsWith('prata')?'🥈':'🥉';const wl=L=>`${L.filter(h=>h.win).length}-${L.filter(h=>!h.win).length}`;
 return `<div class="card bcsel"><h3>${flag(m.c)} Seleção</h3><div class="bcselg">
  <div><b>${cv}</b><span>convocaç${cv===1?'ão':'ões'}</span></div><div><b>${wl(dv)}</b><span>na ${TEAMN()}</span></div><div><b>${tw}</b><span>título${tw===1?'':'s'} por equipe</span></div><div><b>${md.length+pn.length}</b><span>medalha${md.length+pn.length===1?'':'s'}</span></div></div>
  ${md.length||pn.length?`<div class="bcselm">${md.map(x=>`<span>${ic(x.k)} Olimpíadas ${x.y}</span>`).join('')}${pn.map(x=>`<span>${ic(x.k)} Pan-Americano ${x.y}</span>`).join('')}</div>`:''}
  ${(st.dv&&st.dv.y||[]).length?`<div class="xs mut" style="margin-top:6px">Convocações em ${st.dv.y.join(', ')}.</div>`:''}</div>`}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&S.me&&!MENU&&TAB==='me'&&PROFTAB==='career'&&!document.querySelector('.bcsel')){const w=document.querySelector('.card.wiki');if(w)w.insertAdjacentHTML('afterend',bcSelCard())}}catch(e){console.error(e)}return v}}

// ---------- Jogos Pan-Americanos (países das Américas, a cada 4 anos) ----------
const BCAMER=['BR','AR','US','CA','CL','CO','MX','PE','PY','BO'];
const bcAmer=ci=>BCAMER.includes(COUNTRIES[ci][0]);
const BCPANW=30;
function bcPanHost(y){if(y===2027)return['Lima','PE'];const L=[['Santiago','CL'],['Guadalajara','MX'],['Toronto','CA'],['Rio de Janeiro','BR'],['Buenos Aires','AR'],['Assunção','PY']];return L[Math.floor((y-2031)/4)%L.length]}
function bcPanTeam(ci){const L=ORD.pro.filter(id=>IDX.get(id).c===ci).slice(0,3);if(S.me.c===ci&&myRank('pro'))L.push('me');L.sort((a,b)=>(RK.pro[a]||999)-(RK.pro[b]||999));return L.slice(0,3)}
function bcPanOk(){const m=S.me,y=year();if(S.ended||S.tour||S.busy===S.w||(y-2027)%4!==0||S.w%52!==BCPANW)return false;if(!bcAmer(m.c)||!isPro()||m.injury>0||meAge()<16)return false;S.pan=S.pan&&S.pan.y===y?S.pan:{y,done:0};if(S.pan.done)return false;const r=myRank('pro');return r&&r<=400&&bcPanTeam(m.c).includes('me')}
function bcPanCard(){if(!bcPanOk())return'';const y=year(),[city,iso]=bcPanHost(y);
 return `<div class="card bcpan" style="border-color:var(--gold)"><div class="mk" style="color:var(--gold)">🌎 Convocação: Jogos Pan-Americanos ${y}</div><p class="small" style="margin:6px 0">${esc(COUNTRIES[S.me.c][1])} conta com você em ${esc(city)}. Chave de 32 com os melhores das Américas, em quadra dura. Não vale pontos de ranking, mas vale medalha, fãs e a torcida do país inteiro.</p><div class="g2" style="margin-top:10px"><button onclick="bcPanPlay(true)">Jogar</button><button class="sec" onclick="bcPanPlay(false)">Recusar</button></div></div>`}
function bcPanPlay(acc){const m=S.me,y=year(),[city,iso]=bcPanHost(y);S.pan={y,done:1};
 if(!acc){m.app=clamp((m.app??50)-2,0,100);news('Você recusou a convocação para os Jogos Pan-Americanos.');save();render();return}
 const AM=ORD.pro.filter(id=>bcAmer(IDX.get(id).c)),cnt={},pool=[];for(const id of AM){const c=IDX.get(id).c;if((cnt[c]||0)>=4)continue;cnt[c]=(cnt[c]||0)+1;pool.push(id);if(pool.length>=31)break}
 for(const id of AM){if(pool.length>=31)break;if(!pool.includes(id))pool.push(id)}
 if(pool.length<31){TOAST='Os Jogos Pan-Americanos não tiveram inscritos suficientes.';S.pan={y,done:1};render();return}const draw=shuffle(['me',...pool]);
 const st=m.st;st.dv=st.dv||{n:0,y:[]};st.dv.n++;if(!st.dv.y.includes(y))st.dv.y.push(y);
 const rn=['1ª rodada','Oitavas','Quartas','Semifinal','Final'];const log=[];let alive=true,r=0,br=draw,med=null,semiOpp=null;
 const play=(opp,label)=>{const p=IDX.get(opp);CUR_EV={iso,name:'Jogos Pan-Americanos',city,surf:'hard'};const res=simMatch(eff('me','hard','equil',opp),eff(opp,'hard'),false);res.win?st.w++:st.l++;m.energy=clamp(m.energy-7,0,100);m.load=clamp((m.load||0)+4,0,100);
  S.hist.unshift({w:S.w,e:'Jogos Pan-Americanos',tier:'TEAM',rd:label,o:opp,or:RK.pro[opp]||null,rv:opp===S.rival?1:0,on:p.n,oc:p.c,s:scoreStr(res.sets),win:res.win,tac:'equil'});log.push(`${res.win?'✅':'❌'} ${label}: você x ${flag(p.c)} ${esc(p.n)} ${RK.pro[opp]?'#'+RK.pro[opp]:''} · ${scoreStr(res.sets)}`);return res.win};
 while(br.length>1){const nx=[];for(let i=0;i<br.length;i+=2){const a=br[i],b=br[i+1];let w;if(a==='me'||b==='me'){const o=a==='me'?b:b==='me'?a:null;const won=play(o,rn[r]);w=won?'me':o;if(!won){alive=false;if(r===3)semiOpp=o}}else{CUR_EV={iso,name:'',city,surf:'hard'};w=R()<aiP(a,b,false,'hard')?a:b}nx.push(w)}br=nx;r++;if(!alive)break}
 if(alive)med='ouro';else if(r===5)med='prata';else if(r===4){const L=draw.filter(id=>id!=='me'&&id!==semiOpp);const o=pick(L.slice(0,8));if(o&&play(o,'Disputa do bronze'))med='bronze'}
 if(med){(st.pan=st.pan||[]).push({y,k:med});const e=med==='ouro'?'🥇':med==='prata'?'🥈':'🥉';hl(`${e} Medalha de ${med} nos Jogos Pan-Americanos ${y}`);m.app=clamp((m.app??50)+(med==='ouro'?6:3),0,100);m.fol=Math.round(m.fol*(med==='ouro'?1.08:1.04));try{fixFol()}catch(e){}
  news(`${e} ${m.name} conquista a medalha de ${med} nos Jogos Pan-Americanos de ${city}!`);try{addPost({a:MEDIA[0][0],h:MEDIA[0][1],t:`${e} ${m.name} ${flag(m.c)} é ${med} nos Jogos Pan-Americanos ${y}!`,k:'md'})}catch(e){}}
 else news(`🌎 ${m.name} se despede dos Jogos Pan-Americanos de ${city}.`);
 S.busy=S.w;S.busyName='Jogos Pan-Americanos';S.busyMsg='Você jogou os Jogos Pan-Americanos nesta semana.';
 S.modals.push({k:'Seleção',e:'🌎',ti:`Jogos Pan-Americanos ${y}`,q:'',html:`<p><b>${esc(city)} · quadra dura</b></p>${log.map(x=>`<div class="small">${x}</div>`).join('')}<p style="font-weight:700" class="${med?'win':'loss'}">${med==='ouro'?'🥇 MEDALHA DE OURO!':med==='prata'?'🥈 Medalha de prata.':med==='bronze'?'🥉 Medalha de bronze.':'Sem medalha desta vez.'}</p>`,o:[{l:'Continuar',t:'',fx:{}}].concat(med?[{l:'Compartilhar a medalha',t:'Imagem pronta para Instagram e X',fx:{bcPanSh:med}}]:[])});try{checkAch()}catch(e){}save();render()}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcPanSh){const k=fx.bcPanSh,m=S.me,y=year();setTimeout(()=>bcShareCard({kick:'Jogos Pan-Americanos',tag:String(y),icon:k==='ouro'?'🥇':k==='prata'?'🥈':'🥉',title:`Medalha de ${k}`,big:bcPanHost(y)[0],name:m.name,sub:`${COUNTRIES[m.c][1]} · tênis, simples`,file:`breakpoint_pan_${y}`}),0)}}catch(e){}return r}}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&S.me&&!MENU&&TAB==='home'&&!S.tour&&!S.modals.length&&!document.querySelector('.bcpan')){const h=bcPanCard();if(h){const wk=document.querySelector('.bcwk');if(wk)wk.insertAdjacentHTML('afterend',h)}}}catch(e){console.error(e)}return v}}
// a semana do Pan não passa em branco: se o jogador avançar sem responder, conta como recusa silenciosa
{const _ew=endWeek;endWeek=function(){try{if(bcPanOk())S.pan={y:year(),done:1}}catch(e){}return _ew.apply(this,arguments)}}

// ---------- técnico capitão da seleção (modo treinador) ----------
BCMIL.push(['capt','🇺🇳','Capitão campeão','Sua seleção vence a competição por equipes com você de capitão.',40000,2]);
const bcCapC=()=>{try{const c=S.cm;return c&&c.cap&&c.cap.y===year()?c.cap.c:null}catch(e){return null}};
{const _t=tie;tie=function(ca,cb,log){const cc=bcCapC();if(cc==null||(ca!==cc&&cb!==cc))return _t.apply(this,arguments);
 const lv=bcMyLv(),bo=1+.2*lv,ids=teamOf(cc).filter(id=>id!=='me');ids.forEach(id=>{const p=IDX.get(id);if(p)p.r+=bo});let w;
 try{w=_t.apply(this,arguments)}finally{ids.forEach(id=>{const p=IDX.get(id);if(p)p.r-=bo})}
 const won=ca===cc?w:!w,opp=ca===cc?cb:ca,c=S.cm;c.cap.res=c.cap.res||[];c.cap.res.push({w:S.w,o:opp,win:won?1:0,f:S.w%52===SPW().f?1:0});
 if(won){c.txp=(c.txp||0)+12}return w}}
function bcCapInvite(){const c=S.cm,y=year(),sp=SPW(),wk=S.w%52;if(!bcV2()||S.ended||bcMyLv()<4)return;c.capInv=c.capInv||{};if(c.capInv[y])return;
 if(wk!==((sp.q-2+52)%52))return;c.capInv[y]=1;const ci=c.c??S.me.c;if(teamOf(ci).length<3)return;
 S.modals.push({k:'Seleção',e:'🇺🇳',ti:`Convite da federação: capitã${c.f?'':'o'} da seleção`,q:`A federação ${flag(ci)} quer você no comando da seleção na ${TEAMN()} de ${y}. Os jogadores convocados rendem mais com você (+${(1+.2*bcMyLv()).toFixed(1).replace('.',',')} no nível) e cada confronto vencido dá experiência de técnico.`,html:`<div class="xs mut" style="margin-top:6px">${lineupHtml(ci).replace(/Capitão: [^<]*/,'Convocados hoje')}</div>`,
  o:[{l:'Aceitar o convite',t:'Você comanda a seleção nesta temporada',fx:{bcCap:1}},{l:'Recusar',t:'Foco total na sua equipe',fx:{}}]})}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcCap){const c=S.cm,ci=c.c??S.me.c;c.cap={y:year(),c:ci,res:[],q:null,fin:0};S.capt=S.capt||{};S.capt[ci]=c.n;news(`🇺🇳 ${c.n} é ${c.f?'a nova capitã':'o novo capitão'} da seleção ${flag(ci)} na ${TEAMN()}.`);try{addPost({a:MEDIA[0][0],h:MEDIA[0][1],t:`🇺🇳 Seleção ${flag(ci)} anuncia ${c.n} como ${c.f?'capitã':'capitão'} na ${TEAMN()} ${year()}.`,k:'md'})}catch(e){}}}catch(e){}return r}}
// qualificatória: se o atleta principal não jogou por essa seleção, o confronto acontece do mesmo jeito
function bcCapQual(wk){const c=S.cm,cc=bcCapC();if(cc==null||c.cap.q!=null||wk!==SPW().q)return;
 const others=teamCountries().filter(x=>x!==cc);if(!others.length)return;const opp=pick(others),log=[];const w=tie(cc,opp,log);c.cap.q=w?1:0;
 S.modals.push({k:'Seleção',e:'🇺🇳',ti:`${TEAMN()} · Qualificatória`,q:'',html:`<p><b>${flag(cc)} ${COUNTRIES[cc][1]} x ${flag(opp)} ${COUNTRIES[opp][1]}</b> · você de capitã${c.f?'':'o'}</p>${log.map(x=>`<div class="small">${x}</div>`).join('')}<p class="${w?'win':'loss'}" style="font-weight:700">${w?'Vitória! Classificados para as Finais.':'Derrota. Eliminados nesta temporada.'}</p>`,o:[{l:'Continuar',t:'',fx:{}}]})}
// finais: a seleção classificada pelo capitão entra mesmo fora das 8 mais fortes
{const _a=aiTeamWeek;aiTeamWeek=function(){const cc=bcCapC(),c=S.cm,wk=S.w%52,sp=SPW();if(cc==null||!c.cap.q||wk!==sp.f||S.dv&&S.dv.y===year()&&S.dv.done[wk])return _a.apply(this,arguments);
 const top=teamCountries().filter(x=>x!==cc).sort((a,b)=>teamStr(b)-teamStr(a)).slice(0,7);let br=shuffle([cc,...top]);const rn=['Quartas','Semifinal','Final'];let r=0;const log=[];
 while(br.length>1){const nx=[];for(let i=0;i<br.length;i+=2){const a=br[i],b=br[i+1],mine=a===cc||b===cc;const L=[];const wA=tie(a,b,mine?L:null);const w=wA?a:b;nx.push(w);if(mine){log.push(`<b>${rn[r]}: ${flag(a)} ${COUNTRIES[a][1]} x ${flag(b)} ${COUNTRIES[b][1]}</b> — ${w===cc?'✅ vitória':'❌ derrota'}`);L.forEach(x=>log.push(x))}}br=nx;r++}
 const ch=br[0];recTeam(TEAMN(),COUNTRIES[ch][1],ch,false);news(`🏆 ${flag(ch)} ${COUNTRIES[ch][1]} venceu a ${TEAMN()}.`);
 S.modals.push({k:'Seleção',e:'🇺🇳',ti:`${TEAMN()} · Finais`,q:'',html:log.map(x=>`<div class="small">${x}</div>`).join('')+`<p style="font-weight:700" class="${ch===cc?'win':''}">${ch===cc?'🏆 CAMPEÕES!':`Campeão: ${flag(ch)} ${COUNTRIES[ch][1]}`}</p>`,o:[{l:'Continuar',t:'',fx:{}}]})}}
// fecha a campanha: título de capitão e reputação
function bcCapClose(wk){const c=S.cm,cc=bcCapC();if(cc==null||c.cap.fin||wk!==SPW().f)return;c.cap.fin=1;const F=(c.cap.res||[]).filter(x=>x.f);const champ=F.length>=3&&F.every(x=>x.win);
 if(champ){if(!bcHas('capt'))bcGive('capt',year(),`Seleção ${flag(cc)} campeã com você no comando.`);else{c.wallet+=40000;news(`🇺🇳 Seleção ${flag(cc)} campeã de novo com ${c.n} no comando! Bônus de ${money(40000)}.`)}c.trust=clamp(c.trust+5,0,100)}
 else if(F.length)news(`🇺🇳 Campanha da seleção ${flag(cc)} encerrada: ${F.filter(x=>x.win).length} vitória${F.filter(x=>x.win).length===1?'':'s'} nas Finais.`)}
{const _ew=endWeek;endWeek=function(){const wk=S.w%52;try{if(bcV2()&&!S.ended)bcCapQual(wk)}catch(e){console.error(e)}const r=_ew.apply(this,arguments);try{if(bcV2()&&!S.ended){bcCapClose(wk);bcCapInvite()}}catch(e){console.error(e)}return r}}
// painel da equipe: faixa da seleção
{const _tp=bcTeamPanel;bcTeamPanel=function(){let h=_tp();try{const c=S.cm,cc=bcCapC();if(cc!=null){const R0=c.cap.res||[];const s=`<div class="bcrv bccap"><b>🇺🇳 Capitã${c.f?'':'o'} da seleção ${flag(cc)} · ${TEAMN()} ${year()}</b><span>${c.cap.q==null?'Qualificatória em breve':c.cap.q?'Classificados para as Finais':'Eliminados na qualificatória'} · confrontos ${R0.filter(x=>x.win).length}-${R0.filter(x=>!x.win).length}</span></div>`;const i=h.lastIndexOf('</div>');h=h.slice(0,i)+s+h.slice(i)}else if(bcV2()&&bcMyLv()<4){}}catch(e){}return h}}
