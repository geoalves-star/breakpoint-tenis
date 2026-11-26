// ===== v7.5: patrocínios por categoria, finanças organizadas e uniformes por quadra =====
// ---------------------------------------------------------------- PATROCÍNIOS
const BCSPC={kit:['Material esportivo','👕','Roupa e tênis de jogo'],rq:['Raquete','🎾','A raquete que você usa'],relogio:['Relógio','⌚','Marca de luxo'],carro:['Automóvel','🚗','Montadora'],banco:['Banco','🏦','Serviços financeiros'],bebida:['Bebida','🥤','Bebidas e energéticos'],tech:['Tecnologia','📱','Games e eletrônicos'],aerea:['Companhia aérea','✈️','Desconto nas passagens'],moda:['Moda','🕶️','Moda e estilo de vida'],nac:['Empresa do seu país','🏳️','Apoio de empresa nacional']};
const BCSPCAT={vortex:'rq',pulse:'kit',turbo:'bebida',grifo:'moda',meridiano:'banco',nebula:'tech',altura:'relogio',aurora:'carro'};
const BCSPTIER={vortex:1,pulse:2,turbo:1,grifo:2,meridiano:2,nebula:2,altura:3,aurora:3};
SPONSORS.forEach(s=>{s.cat=s.cat||BCSPCAT[s.id];s.tier=s.tier||BCSPTIER[s.id]||2});
[{id:'rally',n:'Rally Wear',e:'👕',t:'Material esportivo',cat:'kit',tier:1,pay:120,bon:400,req:{jr:150,pro:700},img:'any',col:'#1b8a5a'},
 {id:'nordvik',n:'Nordvik',e:'👕',t:'Material esportivo',cat:'kit',tier:2,pay:800,bon:3000,req:{pro:180,fol:40000},img:'any',col:'#14324f'},
 {id:'kinetic',n:'Kinetic',e:'👕',t:'Material esportivo',cat:'kit',tier:3,pay:2400,bon:9000,req:{pro:60},img:'any',col:'#e2401c'},
 {id:'sakura',n:'Sakura Athletics',e:'👕',t:'Material esportivo',cat:'kit',tier:3,pay:4000,bon:15000,req:{pro:20},img:'calm',col:'#c21d5a'},
 {id:'koen',n:'Kōen Racquets',e:'🎾',t:'Raquetes',cat:'rq',tier:2,pay:350,bon:1500,req:{jr:40,pro:300},img:'any',col:'#2a2a2a'},
 {id:'axion',n:'Axion Racquets',e:'🎾',t:'Raquetes',cat:'rq',tier:2,pay:650,bon:2500,req:{pro:150},img:'any',col:'#0f6fc6'},
 {id:'helix',n:'Helix Pro',e:'🎾',t:'Raquetes',cat:'rq',tier:3,pay:1900,bon:7000,req:{pro:40},img:'any',col:'#7a1fa2'},
 {id:'meridtime',n:'Meridian Time',e:'⌚',t:'Relógios',cat:'relogio',tier:2,pay:2500,bon:10000,req:{pro:60},img:'calm',col:'#1d3b2a'},
 {id:'voltan',n:'Voltan EV',e:'🚗',t:'Carros elétricos',cat:'carro',tier:2,pay:3000,bon:12000,req:{pro:50,fol:150000},img:'any',col:'#0aa37f'},
 {id:'orion',n:'Crédito Orion',e:'🏦',t:'Banco',cat:'banco',tier:3,pay:4500,bon:18000,req:{pro:25},img:'calm',col:'#0b2a5b'},
 {id:'cristal',n:'Água Cristal',e:'🥤',t:'Bebidas',cat:'bebida',tier:1,pay:300,bon:1000,req:{pro:400,fol:10000},img:'any',col:'#1aa3d9'},
 {id:'lumen',n:'Lumen Tech',e:'📱',t:'Tecnologia',cat:'tech',tier:3,pay:3500,bon:12000,req:{pro:30,fol:300000},img:'any',col:'#5b2be0'},
 {id:'aerovia',n:'AeroVia',e:'✈️',t:'Companhia aérea',cat:'aerea',tier:2,pay:500,bon:2000,req:{pro:200},img:'any',col:'#d1342c',perk:.2},
 {id:'atlas',n:'Atlas Air',e:'✈️',t:'Companhia aérea',cat:'aerea',tier:3,pay:2000,bon:8000,req:{pro:40},img:'calm',col:'#0d3e74',perk:.35}
].forEach(b=>{if(!SPONSORS.some(x=>x.id===b.id))SPONSORS.push(b)});
const BCSPCOL={vortex:'#d64a1c',pulse:'#ff5a1f',turbo:'#f2c200',grifo:'#111111',meridiano:'#1f4f8f',nebula:'#6b2fd6',altura:'#9a7b2e',aurora:'#5a6470'};
SPONSORS.forEach(s=>{s.col=s.col||BCSPCOL[s.id]||'#333'});
// empresas do país do jogador
const BCNATW={BR:'Tupã',AR:'Pampa',US:'Liberty',ES:'Hispânia',FR:'Gália',IT:'Itálica',DE:'Rhein',GB:'Albion',AU:'Austral',CA:'Maple',JP:'Hinode',CN:'Huaxia',MX:'Anáhuac',CL:'Andina',CO:'Cóndor',PT:'Lusitana',RU:'Volga',NL:'Delta',CH:'Helvética',SE:'Norden',NO:'Fjord',PL:'Wisła',CZ:'Vltava',RS:'Dunav',HR:'Jadran',GR:'Egeu',KR:'Hanbit',IN:'Ganga',BE:'Brabant',AT:'Donau',PE:'Inti',UY:'Celeste',PY:'Guaraní',DK:'Øresund',FI:'Saimaa',KZ:'Altyn',ZA:'Protea',NZ:'Kiwi',HU:'Tisza',RO:'Carpați',BG:'Balkan',UA:'Dnipro',TR:'Anadolu',EG:'Nilo',MA:'Atlas Sul',TN:'Cartago',IL:'Negev',TW:'Formosa',TH:'Siam',GE:'Kartli',BY:'Neman',SK:'Tatra',SI:'Triglav',EC:'Chimborazo',VE:'Orinoco',BO:'Illimani',DO:'Quisqueya',PR:'Borinquen',IE:'Shannon',IS:'Geysir',EE:'Tallinna',LV:'Daugava',LT:'Nemunas'};
function bcNatBrands(){try{const iso=COUNTRIES[S.me.c][0],w=BCNATW[iso]||COUNTRIES[S.me.c][1];const L=[['nac_e',`${w} Energia`,'⚡',450,2000,{nat:3,pro:250},'#1f7a3d'],['nac_t',`${w} Telecom`,'📶',260,1200,{nat:6,pro:450,jnat:2},'#0a66c2']];
 for(const[k,n,e,pay,bon,req,col]of L){const id=k+'_'+iso;if(!SPONSORS.some(x=>x.id===id))SPONSORS.push({id,n,e,t:'Empresa nacional',cat:'nac',tier:1,pay,bon,req,img:'any',col,nat:iso})}}catch(e){}}
function bcNatRank(cat){try{const c=S.me.c,ids=ORD[cat].filter(id=>id==='me'||(IDX.get(id)||{}).c===c);const i=ids.indexOf('me');return i<0?99:i+1}catch(e){return 99}}
const bcSpOf=id=>SPONSORS.find(x=>x.id===id);
const bcSpCat=c=>{const s=bcSpOf(c.id);return s?s.cat:'moda'};
function bcSpMax(){const m=S.me,r=myRank('pro')||9999;return r<=10?4:r<=30?3:r<=100?2:(r<=400||m.fol>=50000)?1:0}
function bcSpOthers(){return (S.me.spons||[]).filter(c=>!['kit','rq','nac'].includes(bcSpCat(c))).length}
eligible=function(sp){const m=S.me,r=myRank('pro')||1e6,j=meAge()<=18?(myRank('jr')||1e6):1e6,q=sp.req||{};let ok=false;
 if(q.pro&&r<=q.pro)ok=true;if(q.jr&&j<=q.jr)ok=true;if(q.fol&&m.fol>=q.fol&&(!q.pro||r<=q.pro*3))ok=true;
 if(q.nat&&bcNatRank('pro')<=q.nat&&r<=600)ok=true;if(q.jnat&&meAge()<=18&&bcNatRank('jr')<=q.jnat)ok=true;if(sp.nat&&COUNTRIES[m.c][0]!==sp.nat)ok=false;
 if(sp.img==='calm'&&(m.behav>55||(m.app??50)<40))ok=false;if(sp.img==='bad'&&m.behav<50)ok=false;return ok};
function bcSpRankF(){const r=myRank('pro')||9999;return r<=5?3.5:r<=10?2.6:r<=20?2:r<=50?1.5:r<=100?1.2:1}
function bcSpTerms(sp,len,ren){const m=S.me,ag=STF().agt||0,bm=1+.15*ag,lf=len>=156?.9:len>=104?.95:1,ff=1+Math.min(.6,(m.fol||0)/2e6);const pay=Math.round(sp.pay*bcSpRankF()*bm*lf*ff/10)*10,bon=Math.round(sp.bon*bcSpRankF()*bm/50)*50;
 const r=myRank('pro');const floor=r&&r<=300?Math.max(r*2,r+60):null;return{id:sp.id,pay,bon,len,obl:1+sp.tier,floor:sp.cat==='nac'?null:floor,exp:S.w+4,ren:ren?1:0}}
function bcSpOffers(){return S.me.spOff=S.me.spOff||[]}
// chegada de propostas: vão para a caixa de propostas (com aviso)
maybeOffer=function(){const m=S.me,ag=STF().agt||0;bcNatBrands();if(!isPro()&&meAge()>18)return;const O=bcSpOffers();for(let i=O.length-1;i>=0;i--)if(O[i].exp<S.w)O.splice(i,1);
 if(S.modals.length||O.length>=4||R()>.22+.1*ag)return;
 const have=new Set((m.spons||[]).map(bcSpCat)),othFull=bcSpOthers()>=bcSpMax();
 const L=SPONSORS.filter(sp=>{if(!sp.cat||(m.spons||[]).some(c=>c.id===sp.id)||O.some(o=>o.id===sp.id)||((S.cool||{})[sp.id]>S.w)||!eligible(sp))return false;
  if(have.has(sp.cat)){const cur=(m.spons||[]).find(c=>bcSpCat(c)===sp.cat),cs=cur&&bcSpOf(cur.id);return cs&&sp.tier>cs.tier}
  if(!['kit','rq','nac'].includes(sp.cat)&&othFull)return false;return true});
 if(!L.length)return;L.sort((a,b)=>b.tier-a.tier||b.pay-a.pay);const sp=L[Math.floor(R()*Math.min(3,L.length))];
 const len=[52,52,104,104,156][Math.floor(R()*5)],o=bcSpTerms(sp,len);O.push(o);
 if(O.length>1){news(`📨 Nova proposta de patrocínio: ${sp.n} (${BCSPC[sp.cat][0]}). Veja em Carreira › Patrocínios.`);return}
 S.modals.push({k:'Proposta de patrocínio',e:sp.e,ti:`${sp.n} quer você`,q:`${BCSPC[sp.cat][0]} · ${money(o.pay)}/semana por ${len/52} ano${len>52?'s':''} + ${money(o.bon)} por título. A proposta vale por 4 semanas na sua caixa de propostas.`,o:[{l:'Ver e decidir',t:'Abrir seus patrocínios',fx:{bcSpGo:1}},{l:'Depois',t:'Fica guardada por 4 semanas',fx:{}}]})};
function bcSpAccept(i){const m=S.me,O=bcSpOffers(),o=O[i];if(!o)return;const sp=bcSpOf(o.id);if(!sp)return;
 const old=(m.spons||[]).find(c=>bcSpCat(c)===sp.cat);if(old&&!o.ren&&old.id!==o.id){const os=bcSpOf(old.id);m.spons=m.spons.filter(c=>c!==old);news(`📄 Você trocou ${os.n} por ${sp.n}.`)}
 if(!old&&!['kit','rq','nac'].includes(sp.cat)&&bcSpOthers()>=bcSpMax()){TOAST=`Você já tem o máximo de marcas para o seu nível (${bcSpMax()}).`;render();return}
 m.spons=(m.spons||[]).filter(c=>c.id!==o.id);
 m.spons.push({id:o.id,until:S.w+o.len,mult:+(o.pay/sp.pay).toFixed(3),pm:1,bm:+(o.bon/sp.bon/(o.pay/sp.pay)).toFixed(3),sat:o.ren?Math.max(60,o.sat||60):70,obl:o.obl,done:0,y0:year(),floor:o.floor,w0:S.w});
 O.splice(i,1);news(`✍️ ${o.ren?'Contrato renovado':'Novo patrocinador'}: ${sp.e} ${sp.n} (${money(o.pay)}/semana).`);if(!o.ren)addPost({a:m.name,h:handleOf(m.name),t:`Feliz demais em fazer parte do time ${sp.n}! ${sp.e}🤝`,k:'me',c:m.c});
 if(sp.cat==='kit')bcWdReset();save();render()}
function bcSpCounter(i){const m=S.me,O=bcSpOffers(),o=O[i];if(!o||o.neg)return;const sp=bcSpOf(o.id),ag=STF().agt||0;const ch=clamp(.38+.17*ag+((m.app??50)-50)/220+(myRank('pro')&&myRank('pro')<=20?.1:0),.15,.85);o.neg=1;
 if(R()<ch){o.pay=Math.round(o.pay*1.18/10)*10;o.bon=Math.round(o.bon*1.18/50)*50;TOAST=`🤝 ${sp.n} aceitou: +18% no contrato.`}
 else if(R()<.45){O.splice(i,1);S.cool=S.cool||{};S.cool[sp.id]=S.w+26;TOAST=`🚪 ${sp.n} não gostou da contraproposta e retirou a oferta.`}
 else TOAST=`${sp.n} manteve a proposta original.`;save();render()}
function bcSpDecline(i){const O=bcSpOffers(),o=O[i];if(!o)return;O.splice(i,1);S.cool=S.cool||{};S.cool[o.id]=S.w+(o.ren?52:20);save();render()}
let BCSPRC=null;
function bcSpRescind(id){const m=S.me,c=(m.spons||[]).find(x=>x.id===id);if(!c)return;if(BCSPRC!==id){BCSPRC=id;render();return}BCSPRC=null;const sp=bcSpOf(id),wk=Math.round(sp.pay*(c.mult||1)),fee=wk*8;
 m.money-=fee;bcLedAdd('Multas e rescisões',-fee);m.spons=m.spons.filter(x=>x!==c);S.cool=S.cool||{};S.cool[id]=S.w+52;news(`📄 Você rescindiu com ${sp.n} e pagou ${money(fee)} de multa.`);if(sp.cat==='kit')bcWdReset();save();render()}
// fim de contrato, renovação, satisfação e ações com a marca
checkSponsors=function(){const m=S.me;bcNatBrands();const O=bcSpOffers();
 m.spons=(m.spons||[]).filter(c=>{const sp=bcSpOf(c.id);if(!sp)return false;if(c.sat==null){c.sat=70;c.obl=1+(sp.tier||2);c.done=0;c.y0=year()}
  if(S.w>=c.until){news(`📄 Contrato com ${sp.n} encerrado.`);if(sp.cat==='kit')setTimeout(bcWdReset,0);return false}
  if(sp.img==='calm'&&m.behav>70){news(`❌ ${sp.n} rompeu o contrato por causa da sua imagem.`);addPost({a:MEDIA[3][0],h:MEDIA[3][1],t:`💼 ${sp.n} rompe com ${m.name} após polêmicas.`,k:'md'});return false}
  if(c.sat<15){news(`❌ ${sp.n} encerrou a parceria: a relação estava desgastada.`);return false}
  const left=c.until-S.w;if(left<=8&&!c.renAsk&&!O.some(o=>o.id===c.id)){c.renAsk=1;if(c.sat>=40&&eligible(sp)){const o=bcSpTerms(sp,[52,104,104,156][Math.floor(R()*4)],1);o.sat=c.sat;o.exp=c.until;if(c.sat>=75){o.pay=Math.round(o.pay*1.1/10)*10}O.push(o);news(`🔁 ${sp.n} mandou uma proposta de renovação.`)}else news(`⚠️ ${sp.n} não deve renovar seu contrato, que termina em ${left} semanas.`)}
  return true})};
function bcSpWeek(){const m=S.me;if(!m||S.ended||S.cm)return;const nt=(m.st.titles||[]).length,lt=m._spT??nt;m._spT=nt;const r=myRank('pro')||9999,lr=m._spR??r;m._spR=r;
 (m.spons||[]).forEach(c=>{const sp=bcSpOf(c.id);if(!sp)return;if(c.sat==null)c.sat=70;if(c.y0!==year()){c.y0=year();c.done=0}
  let d=(nt-lt)*8+(r<lr?.4:r>lr+5?-.3:0)+(70-c.sat)*.01;if(sp.img==='calm'&&m.behav>60)d-=.8;if(sp.img==='bad'&&m.behav<40)d-=.5;c.sat=clamp(c.sat+d,0,100)});
 // ação de patrocínio (gravação, evento, fotos)
 if(!S.modals.length&&!S.tour&&R()<.12){const L=(m.spons||[]).filter(c=>(c.done||0)<(c.obl||2));if(L.length){const c=L[Math.floor(R()*L.length)],sp=bcSpOf(c.id),k=['gravar um comercial','um evento com clientes','uma sessão de fotos da nova coleção','uma live nas redes da marca','visitar a sede e conhecer a equipe'][Math.floor(R()*5)],v=Math.round(sp.pay*(c.mult||1)*.6/10)*10;
  S.modals.push({k:'Ação de patrocínio',e:sp.e,ti:`${sp.n} chama você para ${k}`,q:`Faz parte do contrato (${(c.done||0)+1}ª de ${c.obl} ações no ano). Participar cansa um pouco, mas agrada a marca.`,o:[{l:'Participar',t:`+${money(v)} · −10 energia · marca mais satisfeita`,fx:{bcSpAct:c.id,ok:1,money:v,energy:-10}},{l:'Recusar desta vez',t:'A marca fica bem menos satisfeita',fx:{bcSpAct:c.id,ok:0}}]})}}}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcSpGo){go('me');PROFTAB='spon'}if(fx&&fx.bcSpAct){const c=(S.me.spons||[]).find(x=>x.id===fx.bcSpAct);if(c){if(fx.ok){c.done=(c.done||0)+1;c.sat=clamp((c.sat??70)+8,0,100);S.me.fol=Math.round(S.me.fol*1.01)}else c.sat=clamp((c.sat??70)-14,0,100)}}}catch(e){console.error(e)}return r}}
{const _ft=fxText;fxText=function(fx){if(fx&&(fx.bcSpGo)&&Object.keys(fx).length===1)return'';return _ft.apply(this,arguments)}}
{const _ew=endWeek;endWeek=function(){const go=!S.modals.length,w0=S.w;const r=_ew.apply(this,arguments);if(go&&S.w!==w0)try{bcSpWeek()}catch(e){console.error(e)}return r}}
// vantagens: companhia aérea barateia viagens; marca de raquete dá desconto em raquetes
{const _to=tripOf;tripOf=function(e,from,main){const r=_to.apply(this,arguments);try{const a=(S.me.spons||[]).map(c=>bcSpOf(c.id)).find(s=>s&&s.cat==='aerea');if(a&&r.c){const cut=Math.round(r.c*a.perk);r.c-=cut;r.total-=cut;r.air=a.n}}catch(e){}return r}}
// logotipo das marcas (inventadas)
function bcBrandLogo(sp,sz){sz=sz||40;const w=sp.n.replace(/^(Raquetes|Energético|Banco|Relógios|Água|Crédito) /,'').split(/\s+/),ini=(w.length>1?w[0][0]+w[1][0]:w[0].slice(0,2)).toUpperCase();
 return `<span class="bcbl" style="width:${sz}px;height:${sz}px;background:${sp.col};font-size:${Math.round(sz*.38)}px">${esc(ini)}</span>`}
// tela de patrocínios
function bcSponView(){const m=S.me;bcNatBrands();const O=bcSpOffers();for(let i=O.length-1;i>=0;i--)if(O[i].exp<S.w)O.splice(i,1);const C=m.spons||[],wk=sponPay(),max=bcSpMax(),oth=bcSpOthers();
 const sumY=C.reduce((s,c)=>{const sp=bcSpOf(c.id);return s+Math.round(sp.pay*(c.mult||1)*(c.pm||1))},0)*52;
 const head=`<div class="card"><div class="g3"><div class="pill"><b>${money(wk)}</b><span>Por semana</span></div><div class="pill"><b>${money(sumY)}</b><span>Por ano (fixo)</span></div><div class="pill"><b>${C.length}</b><span>Contratos</span></div></div>
  <p class="xs mut" style="margin:8px 0 0">Material esportivo, raquete e empresa do seu país têm vaga própria. Outras marcas: ${oth}/${max} vagas, que crescem com o seu ranking (top 400: 1 · top 100: 2 · top 30: 3 · top 10: 4).</p></div>`;
 const offers=O.length?`<div class="card"><h3>📨 Propostas na mesa (${O.length})</h3>${O.map((o,i)=>{const sp=bcSpOf(o.id);if(!sp)return'';const cur=C.find(c=>bcSpCat(c)===sp.cat&&c.id!==o.id),cs=cur&&bcSpOf(cur.id);const left=o.exp-S.w;
   return `<div class="bcspo">${bcBrandLogo(sp,44)}<div class="bcspb"><b>${esc(sp.n)}</b> <span class="xs mut">${BCSPC[sp.cat][1]} ${BCSPC[sp.cat][0]}${o.ren?' · renovação':''}</span>
   <div class="bcspk"><span>${money(o.pay)}/sem</span><span>${money(o.bon)}/título</span><span>${o.len/52} ano${o.len>52?'s':''}</span><span>${o.obl} ações/ano</span></div>
   <div class="xs mut">${o.floor?`Cláusula: se cair abaixo do #${o.floor}, o valor cai 30%. `:''}${sp.perk?`Vantagem: ${Math.round(sp.perk*100)}% de desconto nas passagens. `:''}${sp.cat==='kit'?'Você passa a jogar com a coleção da marca. ':''}${sp.cat==='rq'?'50% de desconto em raquetes. ':''}${cs&&!o.ren?`Substitui ${esc(cs.n)} (sem multa). `:''}${left<=0?'Último dia para responder.':`Vale por mais ${left} semana${left===1?'':'s'}.`}</div>
   <div class="bcspa"><button class="pri" onclick="bcSpAccept(${i})">Assinar</button>${o.neg?'':`<button class="sec" onclick="bcSpCounter(${i})">Negociar +18%</button>`}<button class="sec" onclick="bcSpDecline(${i})">Recusar</button></div></div></div>`}).join('')}</div>`:'';
 const cats=['kit','rq','nac',...Object.keys(BCSPC).filter(k=>!['kit','rq','nac'].includes(k))];
 const mine=cats.map(k=>{const c=C.find(x=>bcSpCat(x)===k);if(!c)return'';const sp=bcSpOf(c.id),left=c.until-S.w,tot=Math.max(1,c.until-(c.w0??(c.until-52))),pw=Math.round(sp.pay*(c.mult||1)*(c.pm||1)),bon=Math.round(sp.bon*(c.mult||1)*(c.bm||1)),sat=Math.round(c.sat??70),fee=Math.round(sp.pay*(c.mult||1))*8;
  return `<div class="bcspc">${bcBrandLogo(sp,44)}<div class="bcspb"><div class="row sb"><b>${esc(sp.n)}</b><span class="xs mut">${BCSPC[k][1]} ${BCSPC[k][0]}</span></div>
  <div class="bcspk"><span>${money(pw)}/sem${(c.pm||1)<1?' (cortado)':''}</span><span>${money(bon)}/título</span><span>${left} sem. restantes</span></div>
  <div class="bcsps"><span class="xs mut">Satisfação da marca</span><div class="bar"><i style="width:${sat}%;background:${sat>=60?'var(--acc)':sat>=35?'var(--gold)':'var(--bad)'}"></i></div><b class="xs">${sat>=75?'😍':sat>=55?'🙂':sat>=35?'😐':'😟'} ${sat}</b></div>
  <div class="xs mut">Ações com a marca este ano: ${c.done||0}/${c.obl||2}${c.floor?` · Cláusula: manter-se até #${c.floor}`:''}${sp.perk?` · ${Math.round(sp.perk*100)}% de desconto nas passagens`:''}${left<=8?' · renovação em negociação':''}</div>
  <div class="bcspa"><button class="sec" onclick="bcSpRescind('${c.id}')">${BCSPRC===c.id?`Confirmar rescisão (multa ${money(fee)})`:'Rescindir'}</button>${k==='kit'?`<button class="sec" onclick="PROFTAB='look';render()">👕 Ver uniformes</button>`:''}</div></div></div>`}).join('');
 const empty=cats.filter(k=>!C.some(x=>bcSpCat(x)===k)).filter(k=>['kit','rq','nac'].includes(k)||oth<max).map(k=>{const L=SPONSORS.filter(s=>s.cat===k&&(!s.nat||s.nat===COUNTRIES[m.c][0]));const int=L.filter(eligible).length;return `<div class="bcspv"><span>${BCSPC[k][1]}</span><div><b>${BCSPC[k][0]}</b><div class="xs mut">${int?`${int} marca${int>1?'s':''} interessada${int>1?'s':''}: as propostas chegam nas próximas semanas`:`Ainda nenhuma marca interessada · ${BCSPC[k][2]}`}</div></div></div>`}).join('');
 const mkt=cats.map(k=>{const L=SPONSORS.filter(s=>s.cat===k&&(!s.nat||s.nat===COUNTRIES[m.c][0]));if(!L.length)return'';return `<div class="bcspm"><div class="sec-t">${BCSPC[k][1]} ${BCSPC[k][0]}</div>${L.map(s=>{const has=C.some(c=>c.id===s.id),q=s.req||{},req=[q.jr?'top '+q.jr+' juvenil':'',q.pro?'top '+q.pro+' '+CIRC():'',q.fol?kfmt(q.fol)+' seguidores':'',q.nat?`top ${q.nat} do seu país`:''].filter(Boolean).join(' ou ');
  return `<div class="bcspr">${bcBrandLogo(s,30)}<div style="flex:1;min-width:0"><b class="small">${esc(s.n)}</b> ${has?'<span class="chip t">contratada</span>':eligible(s)?'<span class="chip bcint">interessada</span>':''}<div class="xs mut">${'★'.repeat(s.tier||1)}${'☆'.repeat(3-(s.tier||1))} · a partir de ${money(s.pay)}/sem · exige ${req}${s.img==='calm'?' · só imagem limpa':s.img==='bad'?' · prefere polêmicos':''}</div></div></div>`}).join('')}</div>`}).join('');
 return head+offers+`<div class="card"><h3>✍️ Seus contratos</h3>${mine||'<p class="mut small">Nenhum contrato ainda. As propostas chegam conforme seu ranking, seus seguidores e seu desempenho no país crescem.</p>'}${empty?`<div class="sec-t" style="margin-top:10px">Vagas abertas</div>${empty}`:''}</div>`+`<div class="card"><h3>🏪 Mercado de marcas</h3><p class="xs mut" style="margin-top:-4px">Marcas melhores (★★★) pagam mais e exigem mais. Uma proposta melhor na mesma categoria pode substituir a atual.</p>${mkt}</div>`}
// ---------------------------------------------------------------- FINANÇAS
function bcLed(){const m=S.me;if(!m.led||m.led.y!==year()){const old=m.led;m.led={y:year(),inc:{},exp:{},inv:0,wk:(old&&old.wk)||[],cur:{},prev:old?{y:old.y,inc:old.inc,exp:old.exp}:(m.led&&m.led.prev)||null,m0:old?old.m0:m.money,lp:old?old.lp:m.st.prize||0,lf:old?old.lf:m.st.fees||0,lfi:old?old.lfi:m.st.fines||0}}return m.led}
function bcLedAdd(cat,v){try{if(!S||!S.me||S.cm||!v)return;const L=bcLed();L.cur[cat]=(L.cur[cat]||0)+v}catch(e){}}
function bcLedInv(v){try{const L=bcLed();L.cur.__inv=(L.cur.__inv||0)+v}catch(e){}}
const BCLEDF=[['buyEq','Equipamento'],['buyPrev','Saúde'],['buyAsset','Compras de bens'],['sellAsset','Venda de bens'],['donate','Doações'],['buyBiz','Negócios'],['sellBiz','Negócios'],['brandUp','Marca própria'],['chronTreat','Saúde'],['injFx','Saúde'],['setBase','Moradia'],['foundAcad','Academia própria']];
for(const[f,cat]of BCLEDF){try{const o=window[f];if(typeof o!=='function')continue;window[f]=function(){const m=S&&S.me,b=m?m.money:0;const r=o.apply(this,arguments);try{if(m){const d=m.money-b;if(d)bcLedAdd(cat,d)}}catch(e){}return r}}catch(e){}}
{const _i=invest;invest=function(){const b=S.me.money;const r=_i.apply(this,arguments);bcLedInv(S.me.money-b);return r}}
{const _w=withdraw;withdraw=function(){const b=S.me.money;const r=_w.apply(this,arguments);bcLedInv(S.me.money-b);return r}}
{const _t=travLog;travLog=function(v){try{bcLedAdd('Viagens',-(v.total||v.c||0))}catch(e){}return _t.apply(this,arguments)}}
// fecha a semana: custos fixos, rendas fixas, prêmios, impostos, multas e o resto
{const _ew=endWeek;endWeek=function(){const m=S.me;if(!m||S.modals.length||S.cm||S.ended)return _ew.apply(this,arguments);const w0=S.w;let fx=null;
 try{const ag=AGENT()+TAXR(),sp=sponPay(),as=assetSum('inc');fx={inc:{'Federação':fedSupport(),'Patrocínios':sp,'Bens e aluguéis':as,'Marca própria':brandInc()},exp:{'Fama e imagem':fameCost(),'Impostos e comissões':Math.round((sp+as)*ag),'Treinador':coachSal(),'Fisioterapia':PHYSIO[m.physio].c,'Academia':CENTERS[m.center].c,'Estilo de vida':LIFE[m.life].c,'Manutenção de bens':assetSum('u'),'Equipe':staffCost(),'Cordas':eqWeek(),'Família e moradia':relCost()}}}catch(e){fx=null}
 const nt0=(m.st.titles||[]).length;const r=_ew.apply(this,arguments);
 try{if(S.w!==w0&&fx){const L=bcLed();for(const[k,v]of Object.entries(fx.inc))if(v)L.cur[k]=(L.cur[k]||0)+v;for(const[k,v]of Object.entries(fx.exp))if(v)L.cur[k]=(L.cur[k]||0)-v;
  const pz=(m.st.prize||0)-(L.lp||0),fe=(m.st.fees||0)-(L.lf||0),fi=(m.st.fines||0)-(L.lfi||0);L.lp=m.st.prize||0;L.lf=m.st.fees||0;L.lfi=m.st.fines||0;
  if(pz>0)L.cur['Prêmios']=(L.cur['Prêmios']||0)+pz;if(fe>0)L.cur['Impostos e comissões']=(L.cur['Impostos e comissões']||0)-fe;if(fi>0)L.cur['Multas e rescisões']=(L.cur['Multas e rescisões']||0)-fi;
  // bônus por título dos patrocinadores
  const T=(m.st.titles||[]).slice(nt0);let sb=0;for(const t of T){const tr=TIERS[t.tier];if(!tr)continue;(m.spons||[]).forEach(c=>{const s=bcSpOf(c.id);if(s)sb+=Math.round(s.bon*(c.mult||1)*(c.bm||1)*Math.min(1,tr.w/2))})}if(sb)L.cur['Bônus de patrocínio']=(L.cur['Bônus de patrocínio']||0)+sb;
  // poupança automática: parte dos prêmios vai para o investimento
  const net=pz-Math.max(0,fe);if(m.autoInv&&net>0){const v=Math.min(Math.round(net*m.autoInv),Math.max(0,Math.floor(m.money)));if(v>=500){m.money-=v;m.inv=(m.inv||0)+v;L.cur.__inv=(L.cur.__inv||0)-v}}
  let sum=0;for(const[k,v]of Object.entries(L.cur))sum+=v;const res=Math.round((m.money-(L.m0??m.money))-sum);if(Math.abs(res)>=1)L.cur[res>0?'Outras entradas':'Outras saídas']=(L.cur[res>0?'Outras entradas':'Outras saídas']||0)+res;
  let wi=0,we=0;for(const[k,v]of Object.entries(L.cur)){if(k==='__inv'){L.inv=(L.inv||0)-v;continue}if(v>0){L.inc[k]=(L.inc[k]||0)+v;wi+=v}else{L.exp[k]=(L.exp[k]||0)-v;we-=v}}
  L.wk.push({w:w0,i:Math.round(wi),e:Math.round(we)});if(L.wk.length>26)L.wk.splice(0,L.wk.length-26);L.cur={};L.m0=m.money}}catch(e){console.error(e)}return r}}
function bcFinDash(){const m=S.me;if(S.cm)return'';const L=bcLed(),inc=Object.entries(L.inc).sort((a,b)=>b[1]-a[1]),exp=Object.entries(L.exp).sort((a,b)=>b[1]-a[1]),ti=inc.reduce((s,x)=>s+x[1],0),te=exp.reduce((s,x)=>s+x[1],0),res=ti-te;
 let fin=0,fout=0;try{fin=fedSupport()+sponPay()+assetSum('inc')+brandInc();fout=weekCost()}catch(e){}const sal=fin-fout,run=sal<0?Math.floor(Math.max(0,m.money)/(-sal)):null;
 const bars=(arr,tot,cls)=>arr.slice(0,8).map(([k,v])=>`<div class="bcfr"><span>${esc(k)}</span><div class="bar"><i class="${cls}" style="width:${Math.max(3,Math.round(v/Math.max(1,arr[0][1])*100))}%"></i></div><b>${money(Math.round(v))}</b></div>`).join('')||'<p class="xs mut">Nada ainda nesta temporada.</p>';
 const W=L.wk.slice(-16),mx=Math.max(1,...W.map(x=>Math.max(x.i,x.e)));const ch=W.length?`<svg viewBox="0 0 ${W.length*20} 64" class="bcfch" preserveAspectRatio="none">${W.map((x,i)=>`<rect x="${i*20+3}" y="${32-28*x.i/mx}" width="6" height="${28*x.i/mx}" fill="var(--acc)"/><rect x="${i*20+10}" y="32" width="6" height="${28*x.e/mx}" fill="var(--bad)" opacity=".8"/>`).join('')}<line x1="0" y1="32" x2="${W.length*20}" y2="32" stroke="var(--line)"/></svg><div class="xs mut row sb"><span>${W.length} semanas atrás</span><span>esta semana</span></div>`:'<p class="xs mut">O gráfico aparece depois da primeira semana.</p>';
 const top=exp[0],tip=run!=null&&run<12?`<div class="bcfw">⚠️ No ritmo atual, seu dinheiro dura <b>${run} semana${run===1?'':'s'}</b> sem prêmios. Reduza o estilo de vida, escolha torneios mais perto de casa ou busque patrocínio.</div>`:top&&te>0?`<p class="xs mut" style="margin:8px 0 0">Sua maior despesa na temporada é <b>${esc(top[0])}</b> (${Math.round(top[1]/te*100)}% das saídas).</p>`:'';
 const pv=L.prev;const pvt=pv?{i:Object.values(pv.inc||{}).reduce((s,v)=>s+v,0),e:Object.values(pv.exp||{}).reduce((s,v)=>s+v,0)}:null;
 return `<div class="card bcfin"><h3>💰 Finanças · temporada ${L.y}</h3><div class="g3"><div class="pill"><b class="win">${money(Math.round(ti))}</b><span>Entradas</span></div><div class="pill"><b class="loss">${money(Math.round(te))}</b><span>Saídas</span></div><div class="pill"><b class="${res>=0?'win':'loss'}">${res>=0?'+':'−'}${money(Math.abs(Math.round(res)))}</b><span>Resultado</span></div></div>
  ${pvt?`<p class="xs mut" style="margin:6px 0 0">Temporada ${pv.y}: entradas ${money(Math.round(pvt.i))}, saídas ${money(Math.round(pvt.e))}, resultado ${pvt.i-pvt.e>=0?'+':'−'}${money(Math.abs(Math.round(pvt.i-pvt.e)))}.</p>`:''}
  <div class="bcfbox"><div class="row sb"><span class="small">Renda fixa por semana</span><b class="win">${money(fin)}</b></div><div class="row sb"><span class="small">Custo fixo por semana</span><b class="loss">${money(fout)}</b></div><div class="row sb"><span class="small"><b>Saldo fixo semanal</b></span><b class="${sal>=0?'win':'loss'}">${sal>=0?'+':'−'}${money(Math.abs(sal))}</b></div><p class="xs mut" style="margin:4px 0 0">Prêmios, viagens e bônus variam a cada torneio e não entram aqui.</p></div>${tip}
  <div class="sec-t" style="margin-top:12px">Entradas e saídas nas últimas semanas</div>${ch}
  <div class="sec-t" style="margin-top:12px">De onde vem o dinheiro</div>${bars(inc,ti,'g')}
  <div class="sec-t" style="margin-top:12px">Para onde vai o dinheiro</div>${bars(exp,te,'r')}
  <div class="sec-t" style="margin-top:12px">Poupança automática</div><p class="xs mut" style="margin:-2px 0 6px">Uma parte de cada prêmio vai direto para o investimento.</p><div class="chips">${[[0,'Desligada'],[.1,'10% dos prêmios'],[.25,'25% dos prêmios'],[.4,'40% dos prêmios']].map(([v,l])=>`<button class="${(m.autoInv||0)===v?'on':''}" onclick="S.me.autoInv=${v};save();render()">${l}</button>`).join('')}</div></div>`}
{const _bc=brandCard;brandCard=function(){let h='';try{if(PROFTAB==='bens')h=bcFinDash()}catch(e){console.error(e)}return h+_bc()}}
// a aba de patrocínios usa a tela nova; Patrimônio vira Finanças
{const _pv=profileView;profileView=function(){let s;if(PROFTAB==='spon'){PROFTAB='stats';try{s=_pv()}finally{PROFTAB='spon'}const i=s.indexOf('<div class="chips v5tabs"');if(i<0)return s;let d=0,j=i;const re=/<\/?div\b/g;re.lastIndex=i;let mm;while(mm=re.exec(s)){d+=mm[0]==='<div'?1:-1;if(d===0){j=s.indexOf('>',mm.index)+1;break}}
  let tabs=s.slice(i,j).replace(/class="on"/g,'class=""').replace(`class="" onclick="PROFTAB='spon'`,`class="on" onclick="PROFTAB='spon'`);s=s.slice(0,i)+tabs+bcSponView()}else s=_pv();
 return s.replace('>Patrimônio</button>','>💰 Finanças</button>')}}
// ---------------------------------------------------------------- UNIFORMES
const BCTOP={tee:'Camiseta',polo:'Polo',tank:'Regata',long:'Manga longa',dress:'Vestido'};
const BCHEAD={none:'Nada',band:'Faixa',cap:'Boné',visor:'Viseira',bandana:'Bandana'};
const BCBASIC=['#ffffff','#1d1d1d','#2f6bff','#c8102e','#18b39b','#7b5cff','#ff7a3d','#f2c200','#0b2a5b','#2a7d4f'];
function bcKit(){try{const c=(S.me.spons||[]).find(x=>bcSpCat(x)==='kit');return c?bcSpOf(c.id):null}catch(e){return null}}
function bcMix(a,b,t){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')}
function bcColl(sp,surf){// coleção da marca para cada piso
 const b=sp?sp.col:'#2f6bff',h=seedHash((sp?sp.id:'basic')+surf);const S2={hard:[b,'#ffffff','#1d1d1d',bcMix(b,'#ffffff',.55),['#2f6bff','#ff5a1f','#18b39b','#ffd400','#ff5fa2'][h%5],bcMix(b,'#000000',.4)],clay:[b,'#ffffff','#0b2a5b',['#f2c200','#e2661b','#7b5cff','#18b39b'][h%4],bcMix(b,'#ffffff',.35),'#1d1d1d'],grass:['#ffffff',b,'#efe6cf','#2a7d4f',bcMix(b,'#ffffff',.6),'#0b2a5b']};
 return S2[surf]||S2.hard}
function bcIsWimb(ev){return !!ev&&ev.surf==='grass'&&/^Wimbledon/.test(ev.name||'')}
function bcWd(){const m=S.me;if(!m.wd){const f=m.g==='f';m.wd={hard:{top:f?'tank':'tee',c1:'#2f6bff',c2:'#ffffff',bot:f?'#2f6bff':'#1d1d1d',head:'band',hc:'#ffffff'},clay:{top:f?'dress':'polo',c1:'#ffffff',c2:'#c8102e',bot:'#0b2a5b',head:'cap',hc:'#0b2a5b'},grass:{top:'polo',c1:'#ffffff',c2:'#2a7d4f',bot:'#ffffff',head:'none',hc:'#ffffff'}}}return m.wd}
function bcWdReset(){try{const k=bcKit();if(!k)return;const W=bcWd();for(const s of['hard','clay','grass']){const C=bcColl(k,s);W[s].c1=C[0];W[s].c2=C[1];W[s].bot=s==='grass'?'#ffffff':C[2];W[s].hc=C[1]}news(`👕 Chegou a coleção ${bcKit().n} da temporada: seus uniformes foram atualizados.`)}catch(e){}}
function bcCurEv(){try{if(typeof IM!=='undefined'&&IM&&IM.ev)return IM.ev}catch(e){}try{if(typeof LIVE!=='undefined'&&LIVE&&LIVE.ev)return LIVE.ev}catch(e){}try{if(S.tour)return curEv()}catch(e){}return null}
function bcWhite(o){return{...o,c1:'#ffffff',c2:'#eeeeee',bot:'#ffffff',hc:'#ffffff',wh:1}}
function bcMyOutfit(ev){const W=bcWd();ev=ev||bcCurEv();const s=ev?ev.surf:'hard';let o={...(W[s]||W.hard)};if(o.top==='dress'&&S.me.g!=='f')o.top='tee';o.logo=bcKit()?bcKit().col:null;if(bcIsWimb(ev))o=bcWhite(o);return o}
function bcAiOutfit(id,g,ev){ev=ev||bcCurEv();const r=seeded(id*31+7),pk=a=>a[Math.floor(r()*a.length)];const kits=SPONSORS.filter(s=>s.cat==='kit'),k=pk(kits),s=ev?ev.surf:'hard',C=bcColl(k,s);
 const f=g==='f';let top=f?pk(['dress','dress','tank','tee','tank','polo']):pk(['tee','tee','tee','polo','polo','tank','long']);const c1=pk([C[0],C[0],C[1],C[3],C[4]]),c2=c1===C[1]?C[0]:C[1];
 let o={top,c1,c2,bot:f&&top!=='dress'?pk([C[2],c1,'#ffffff']):pk([C[2],'#1d1d1d','#ffffff',C[5]]),head:pk(['none','none','band','cap','visor','bandana']),hc:pk([c2,'#ffffff',C[2]]),logo:k.col};if(bcIsWimb(ev))o=bcWhite(o);return o}
{const _a=aiAv;aiAv=function(p){const a=_a.apply(this,arguments);try{if(a&&p&&p.id!=null)a.pid=p.id}catch(e){}return a}}
// desenho do tenista em quadra com o uniforme
v5DrawPl=function(g,px,py,s,av,front,pose,now,rk){const sk=SKIN[av.sk]||SKIN[1],hc=HAIRC[av.hc]||HAIRC[0],f=av.g==='f';
 let of=av.of||null;try{if(!of){if(av.pid!=null)of=bcAiOutfit(av.pid,av.g);else if(S&&S.me&&av.sk===S.me.av.sk&&av.hc===S.me.av.hc&&av.h===S.me.av.h)of=bcMyOutfit()}}catch(e){}
 if(!of){const sc=SHIRT[av.sh]||SHIRT[0];of={top:f?'tank':'tee',c1:sc,c2:'#ffffff',bot:av.sh===5?'#F3ECDC':shade(sc,-.6),head:av.a==='faixa'?'band':av.a==='viseira'?'visor':av.a==='bone'?'cap':'none',hc:ACCC[av.ac??0]||'#fff'}}
 const sh=of.c1,tr=of.c2||'#ffffff',bot=of.top==='dress'?sh:of.bot,ac=of.hc||'#fff',rkC=rk||(ac==='#ffffff'?'#e8312f':ac),shoe=of.wh?'#ffffff':'#ffffff',shoeT=of.wh?'#e9e9e9':(of.logo||tr);
 g.save();g.translate(px,py);g.scale(front?-s:s,s);g.lineCap='round';g.lineJoin='round';
 g.fillStyle='#0000004d';g.beginPath();g.ellipse(2,1,17,4.5,0,0,6.3);g.fill();
 const run=pose.run||0,ph=pose.ph||0,bob=run>.05?-Math.abs(Math.sin(ph))*2.2:Math.sin(now/170)*.7;
 const lf=[-7+Math.sin(ph)*4*run,-Math.max(0,Math.sin(ph))*4*run],rf=[7-Math.sin(ph)*4*run,-Math.max(0,-Math.sin(ph))*4*run];
 for(const[ft,hx]of[[lf,-4],[rf,4]]){v5Limb(g,[hx,-22+bob],[ft[0]*.8,ft[1]-9],4.6,sk);v5Limb(g,[ft[0]*.8,ft[1]-9],[ft[0],ft[1]-2.5],4.2,'#ffffff');g.fillStyle=shoe;g.strokeStyle=V5INK;g.lineWidth=1.5;g.beginPath();g.ellipse(ft[0],ft[1]-1.5,4,2.4,0,0,6.3);g.fill();g.stroke();g.strokeStyle=shoeT;g.lineWidth=1.1;g.beginPath();g.moveTo(ft[0]-2.4,ft[1]-1.8);g.lineTo(ft[0]+2,ft[1]-1.2);g.stroke()}
 // short, saia ou vestido
 g.fillStyle=bot;g.strokeStyle=V5INK;g.lineWidth=1.8;g.beginPath();if(f){g.moveTo(-8,-30+bob);g.lineTo(8,-30+bob);g.lineTo(11,-19+bob);g.lineTo(-11,-19+bob)}else{g.moveTo(-8.5,-30+bob);g.lineTo(8.5,-30+bob);g.lineTo(9.5,-20+bob);g.lineTo(1,-20+bob);g.lineTo(0,-24+bob);g.lineTo(-1,-20+bob);g.lineTo(-9.5,-20+bob)}g.closePath();g.fill();g.stroke();
 if(f&&of.top!=='dress'&&!of.wh){g.strokeStyle=tr;g.lineWidth=1;g.beginPath();g.moveTo(-10.4,-21+bob);g.lineTo(10.4,-21+bob);g.stroke()}
 let hR=[4,-33],aR=-148,hL=[-6,-35],ball=null;const k=pose.k||0,m=pose.mode;
 if(m==='prep'){if(pose.side==='fh'){hR=[14,-37];aR=25}else{hR=[-12,-37];aR=155;hL=[-9,-37]}}
 else if(m==='swing'){const e=v5Ease(k);if(pose.side==='fh'){hR=[14-22*e,-37-11*Math.sin(e*3.1)];aR=25-235*e;hL=[-8+6*e,-36]}else{hR=[-12+24*e,-37-11*Math.sin(e*3.1)];aR=155+185*e;hL=[-9+14*e,-37-4*e]}}
 else if(m==='srvReady'){hR=[10,-36];aR=60;hL=[-5,-32-Math.abs(Math.sin(now/220))*4];ball=[hL[0],hL[1]-3-Math.abs(Math.sin(now/220))*7]}
 else if(m==='toss'){hL=[-6,-36-30*k];hR=[12,-48];aR=100;ball=[-6,-40-46*Math.sin(Math.min(1,k)*1.57)]}
 else if(m==='troph'){const e=v5Ease(k),up=e;hR=[v5Lerp(up,[10,7]),v5Lerp(up,[-40,-70])-Math.abs(Math.sin(now/260))*2*up];hL=[v5Lerp(up,[-10,-7]),v5Lerp(up,[-40,-70])-Math.abs(Math.sin(now/260))*2*up]}
 else if(m==='serve'){const e=v5Ease(k);hR=[v5Lerp(e,[12,8,4,-8]),v5Lerp(e,[-50,-60,-71,-42])];aR=v5Lerp(e,[100,200,270,195]);hL=[v5Lerp(e,[-6,-6,-8,-6]),v5Lerp(e,[-66,-58,-42,-36])]}
 const body=()=>{g.fillStyle=sh;g.strokeStyle=V5INK;g.lineWidth=1.8;g.beginPath();
  if(of.top==='tank'){g.moveTo(-8.5,-46+bob);g.quadraticCurveTo(0,-48+bob,8.5,-46+bob);g.lineTo(9,-28+bob);g.lineTo(-9,-28+bob)}else{g.moveTo(-11,-46+bob);g.quadraticCurveTo(0,-49+bob,11,-46+bob);g.lineTo(9,-28+bob);g.lineTo(-9,-28+bob)}g.closePath();g.fill();g.stroke();
  if(of.top==='dress'){g.fillStyle=sh;g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.moveTo(-9,-29+bob);g.lineTo(9,-29+bob);g.lineTo(12,-18+bob);g.lineTo(-12,-18+bob);g.closePath();g.fill();g.stroke();g.strokeStyle=tr;g.lineWidth=1.2;g.beginPath();g.moveTo(-9,-30+bob);g.lineTo(9,-30+bob);g.stroke()}
  // detalhes: gola, recortes e logo
  g.strokeStyle=tr;g.lineWidth=1.3;g.beginPath();
  if(of.top==='polo'){if(front){g.fillStyle=tr;g.beginPath();g.moveTo(-4.5,-47.5+bob);g.lineTo(0,-44+bob);g.lineTo(-1.5,-47.5+bob);g.closePath();g.moveTo(4.5,-47.5+bob);g.lineTo(0,-44+bob);g.lineTo(1.5,-47.5+bob);g.closePath();g.fill();g.strokeStyle=shade(sh,-.3);g.lineWidth=.9;g.beginPath();g.moveTo(0,-44+bob);g.lineTo(0,-39+bob);g.stroke()}else{g.fillStyle=tr;g.fillRect(-5,-48.5+bob,10,2.2)}}
  else if(of.top==='tank'){g.moveTo(-8.5,-46+bob);g.lineTo(-9,-28+bob);g.moveTo(8.5,-46+bob);g.lineTo(9,-28+bob);g.stroke()}
  else{if(front){g.arc(0,-47.5+bob,3.2,.3,Math.PI-.3)}else{g.moveTo(-4,-47.6+bob);g.lineTo(4,-47.6+bob)}g.stroke()}
  if(!of.wh&&of.top!=='tank'){g.strokeStyle=tr;g.lineWidth=1.1;g.beginPath();g.moveTo(-9.4,-33+bob);g.lineTo(9.4,-33+bob);g.stroke()}
  if(front&&of.logo&&!of.wh){g.fillStyle=of.logo===sh?tr:of.logo;g.beginPath();g.arc(-4.2,-41+bob,1.5,0,6.3);g.fill()}
  if(!front){g.strokeStyle=shade(sh,-.25);g.lineWidth=1;g.beginPath();g.moveTo(0,-45+bob);g.lineTo(0,-31+bob);g.stroke()}
  // cabeça
  const hy=-54+bob;if(av.h==='longo'||av.h==='medio'){g.fillStyle=hc;g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.roundRect(-7.5,hy-2,15,av.h==='longo'?15:9,4);g.fill();g.stroke()}
  if(av.h==='rabo'){const sw=Math.sin(ph)*3*run;g.fillStyle=hc;g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.ellipse(sw*.5,hy+7,2.6,6.5,sw*.06,0,6.3);g.fill();g.stroke()}
  g.fillStyle=sk;g.strokeStyle=V5INK;g.lineWidth=1.8;g.beginPath();g.arc(0,hy,7.3,0,6.3);g.fill();g.stroke();
  g.fillStyle=hc;g.beginPath();if(front){if(av.h!=='raspado'){g.arc(0,hy,7.3,Math.PI*1.05,Math.PI*1.95);g.quadraticCurveTo(2,hy-3.5,-7,hy-1.2)}}else{if(av.h==='raspado'){g.globalAlpha=.55}g.arc(0,hy,7.3,Math.PI*.82,Math.PI*2.18)}g.closePath();g.fill();g.globalAlpha=1;g.stroke();
  if(av.h==='cacheado'){g.fillStyle=hc;for(let a=3.3;a<6.2;a+=.55){g.beginPath();g.arc(Math.cos(a)*7.3,hy+Math.sin(a)*7.3,2.6,0,6.3);g.fill()}}
  if(av.h==='coque'){g.fillStyle=hc;g.strokeStyle=V5INK;g.lineWidth=1.5;g.beginPath();g.arc(0,hy-8.5,3.4,0,6.3);g.fill();g.stroke()}
  if(front){g.fillStyle=V5INK;g.beginPath();g.arc(-2.6,hy+.6,.95,0,6.3);g.arc(2.6,hy+.6,.95,0,6.3);g.fill();g.strokeStyle=V5INK;g.lineWidth=.9;g.beginPath();g.moveTo(-1.6,hy+3.8);g.quadraticCurveTo(0,hy+4.6,1.6,hy+3.8);g.stroke()}
  const hd=of.head;
  if(hd==='band'||hd==='visor'){g.strokeStyle=V5INK;g.lineWidth=3.4;g.beginPath();g.arc(0,hy,7.3,Math.PI*1.08,Math.PI*1.92);g.stroke();g.strokeStyle=ac;g.lineWidth=2;g.stroke();if(hd==='visor'&&front){g.fillStyle=ac;g.strokeStyle=V5INK;g.lineWidth=1.2;g.beginPath();g.ellipse(0,hy-3,8,2.4,0,0,3.15);g.fill();g.stroke()}}
  if(hd==='bandana'){g.fillStyle=ac;g.strokeStyle=V5INK;g.lineWidth=1.3;g.beginPath();g.arc(0,hy-.8,7.5,Math.PI*1.02,Math.PI*1.98);g.closePath();g.fill();g.stroke();if(!front){g.beginPath();g.moveTo(-1,hy-1);g.lineTo(-4,hy+5);g.lineTo(1,hy+2);g.closePath();g.fill();g.stroke()}}
  if(hd==='cap'){g.fillStyle=ac;g.strokeStyle=V5INK;g.lineWidth=1.5;g.beginPath();g.arc(0,hy-.5,7.6,Math.PI,Math.PI*2);g.closePath();g.fill();g.stroke();if(front){g.beginPath();g.ellipse(0,hy-1,8.5,2.6,0,0,3.15);g.fill();g.stroke()}}};
 const sleeve=(a,b)=>{if(of.top==='tank'||of.top==='dress')return;const t=of.top==='long'?1:.36,e=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];v5Limb(g,a,e,of.top==='long'?4.4:5.4,sh);if(!of.wh&&of.top!=='long'){g.strokeStyle=tr;g.lineWidth=1.1;g.beginPath();const nx=e[0]-a[0],ny=e[1]-a[1],L=Math.hypot(nx,ny)||1;g.moveTo(e[0]-ny/L*2.6,e[1]+nx/L*2.6);g.lineTo(e[0]+ny/L*2.6,e[1]-nx/L*2.6);g.stroke()}};
 const arms=()=>{v5Limb(g,[-10,-44+bob],hL,4,sk);sleeve([-10,-44+bob],hL);
  const rx=hR[0]+Math.cos(aR*Math.PI/180)*9,ry=hR[1]+Math.sin(aR*Math.PI/180)*9,cx=hR[0]+Math.cos(aR*Math.PI/180)*19,cy=hR[1]+Math.sin(aR*Math.PI/180)*19;
  if(!pose.noRk){v5Limb(g,hR,[rx,ry],2.2,'#2b2a27');g.save();g.translate(cx,cy);g.rotate(aR*Math.PI/180);g.fillStyle='#F3ECDC88';g.strokeStyle=V5INK;g.lineWidth=4.4;g.beginPath();g.ellipse(0,0,10,7.2,0,0,6.3);g.stroke();g.strokeStyle=rkC;g.lineWidth=2.4;g.stroke();g.fill();
  g.strokeStyle='#14100b55';g.lineWidth=.6;g.beginPath();for(let i=-6;i<=6;i+=3){g.moveTo(i,-6);g.lineTo(i,6)}for(let i=-4;i<=4;i+=2.7){g.moveTo(-8.5,i);g.lineTo(8.5,i)}g.stroke();g.restore();}
  v5Limb(g,[10,-44+bob],hR,4,sk);sleeve([10,-44+bob],hR);if(pose.cup)pose.cup(g,(hL[0]+hR[0])/2,Math.min(hL[1],hR[1])-2);g.fillStyle=sk;g.strokeStyle=V5INK;g.lineWidth=1.3;for(const h of[hL,hR]){g.beginPath();g.arc(h[0],h[1],2.4,0,6.3);g.fill();g.stroke()}
  if(ball){g.fillStyle='#E8FF4A';g.strokeStyle=V5INK;g.lineWidth=1.2;g.beginPath();g.arc(ball[0],ball[1],2.8,0,6.3);g.fill();g.stroke()}};
 if(front){arms();body()}else{body();arms()}
 g.restore()};
// guarda-roupa (aba Visual)
let BCWDS='hard';
function bcWdSet(k,v){const W=bcWd();W[BCWDS][k]=v;const kit=bcKit();if(!kit&&['c1','c2','bot','top','hc'].includes(k)){S.me.money-=150;bcLedAdd('Uniformes',-150)}save();render()}
function bcWdView(){const m=S.me,W=bcWd(),o=W[BCWDS],kit=bcKit(),f=m.g==='f',C=kit?bcColl(kit,BCWDS):BCBASIC;
 const sw=(k,cur,L)=>`<div class="bcsw">${L.map(c=>`<button class="${cur===c?'on':''}" style="background:${c}" aria-label="cor ${c}" onclick="bcWdSet('${k}','${c}')"></button>`).join('')}</div>`;
 const tops=Object.entries(BCTOP).filter(([k])=>f||k!=='dress');
 return `<div class="card bcwd"><h3>👕 Uniformes de jogo</h3><p class="xs mut" style="margin-top:-4px">${kit?`Você joga com a coleção <b>${esc(kit.n)}</b>: as cores seguem a marca e trocar de peça é de graça.`:'Sem patrocínio de material esportivo: cada peça nova custa US$ 150. Com um patrocinador, a coleção dele vem de graça.'}</p>
 <div class="chips">${[['hard','🔵 Quadra dura'],['clay','🟠 Saibro'],['grass','🟢 Grama']].map(([k,l])=>`<button class="${BCWDS===k?'on':''}" onclick="BCWDS='${k}';render()">${l}</button>`).join('')}</div>
 <div class="bcwdp"><canvas id="bcwdc" width="240" height="190" aria-label="Prévia do uniforme"></canvas>${BCWDS==='grass'?`<canvas id="bcwdw" width="120" height="190" aria-label="Prévia em Wimbledon"></canvas>`:''}</div>
 ${BCWDS==='grass'?'<p class="xs mut" style="margin:4px 0 8px">Em Wimbledon a regra é jogar todo de branco: o jogo veste você assim automaticamente (à direita).</p>':''}
 <div class="sec-t">Modelo</div><div class="chips">${tops.map(([k,l])=>`<button class="${o.top===k?'on':''}" onclick="bcWdSet('top','${k}')">${l}</button>`).join('')}</div>
 <div class="sec-t">Cor principal</div>${sw('c1',o.c1,C)}
 <div class="sec-t">Detalhes</div>${sw('c2',o.c2,C)}
 ${o.top!=='dress'?`<div class="sec-t">${f?'Saia ou short':'Short'}</div>${sw('bot',o.bot,C)}`:''}
 <div class="sec-t">Cabeça</div><div class="chips">${Object.entries(BCHEAD).map(([k,l])=>`<button class="${o.head===k?'on':''}" onclick="bcWdSet('head','${k}')">${l}</button>`).join('')}</div>${o.head!=='none'?sw('hc',o.hc,C):''}</div>`}
function bcWdDraw(){try{const cv=document.getElementById('bcwdc');if(!cv)return;const g=cv.getContext('2d'),dpr=Math.min(2,window.devicePixelRatio||1);const W=240,H=190;cv.style.width=W+'px';cv.style.height=H+'px';cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);
 const bg=SURFC[BCWDS]||SURFC.hard;const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,bg[0]);gr.addColorStop(1,bg[1]);g.fillStyle=gr;g.beginPath();g.roundRect(0,0,W,H,14);g.fill();g.strokeStyle='#ffffff66';g.lineWidth=2;g.beginPath();g.moveTo(0,H*.78);g.lineTo(W,H*.78);g.stroke();
 const ev={surf:BCWDS,name:''},o=bcMyOutfit(ev),av={...myAv(),of:o};v5DrawPl(g,W*.3,H*.88,2.4,av,true,{mode:'srvReady'},0);v5DrawPl(g,W*.72,H*.88,2.4,av,false,{},0);
 const cw=document.getElementById('bcwdw');if(cw){const g2=cw.getContext('2d');cw.style.width='120px';cw.style.height=H+'px';cw.width=120*dpr;cw.height=H*dpr;g2.setTransform(dpr,0,0,dpr,0,0);const g3=g2.createLinearGradient(0,0,0,H);g3.addColorStop(0,'#3f8a4a');g3.addColorStop(1,'#1d5a2a');g2.fillStyle=g3;g2.beginPath();g2.roundRect(0,0,120,H,14);g2.fill();g2.fillStyle='#ffffffcc';g2.font='700 11px Barlow Condensed, sans-serif';g2.textAlign='center';g2.fillText('WIMBLEDON',60,18);v5DrawPl(g2,60,H*.88,2.4,{...myAv(),of:bcMyOutfit({surf:'grass',name:'Wimbledon'})},true,{},0)}}catch(e){console.error(e)}}
{const _pv=profileView;profileView=function(){let s=_pv();try{if(PROFTAB==='look'){s+=bcWdView();requestAnimationFrame(bcWdDraw)}}catch(e){console.error(e)}return s}}

// cortes por ranking: usa a cláusula de cada contrato (quando houver)
v5SponWeek=function(){const m=S.me;if(!m||S.ended||!isPro()||!(m.spons||[]).length)return;const r=myRank('pro');if(!r)return;m.v5hi=m.v5hi||9999;
 for(const lv of [100,50,20,10,1]){if(r<=lv&&m.v5hi>lv){const b=Math.round(sponPay()*(lv===1?20:lv===10?12:lv===20?8:lv===50?6:4));m.money+=b;bcLedAdd('Bônus de patrocínio',b);news(`Bônus de patrocínio: entrar no top ${lv===1?'1 (número 1 do mundo!)':lv} rendeu ${money(b)} dos seus patrocinadores.`);break}}
 m.v5hi=Math.min(m.v5hi,r);
 (m.spons||[]).forEach(c=>{const sp=bcSpOf(c.id);if(!sp)return;const fl=c.floor!==undefined?c.floor:(sp.req&&sp.req.pro?sp.req.pro*2:null);if(!fl)return;const bad=r>fl;
  if(bad&&(c.pm||1)>=1){c.pm=.7;c.sat=clamp((c.sat??70)-10,0,100);news(`${sp.n} cortou 30% do contrato: você ficou abaixo do #${fl}, como dizia a cláusula.`)}else if(!bad&&c.pm&&c.pm<1){c.pm=1;news(`${sp.n} restabeleceu o valor integral do contrato.`)}})};
