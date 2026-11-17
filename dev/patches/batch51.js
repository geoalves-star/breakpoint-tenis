// =============== v5.1 · base, CT e treinadores ===============
// CTs fictícios: id, nome, cidade, país, piso, nível (1-4), custo/sem, multiplicador de treino, especialidade, exige top N
const V5CTS=[
 ['bcn','Academia Sol de Barcelona','Barcelona','ES','clay',3,1500,1.26,'bh',0],
 ['vlc','Escola Terra Batida','Valência','ES','clay',2,900,1.18,'bh',0],
 ['mad','Centro Castelhano de Tênis','Madri','ES','clay',2,1000,1.19,'fi',0],
 ['par','Instituto Rive Gauche','Paris','FR','clay',3,1700,1.27,'fh',0],
 ['mco','Riviera Performance Lab','Monte Carlo','MC','clay',4,4200,1.45,'me',250],
 ['rom','Centro Tevere','Roma','IT','clay',2,1100,1.2,'bh',0],
 ['lon','Academia Southfields','Londres','GB','grass',3,2000,1.28,'vo',0],
 ['hal','Grasshof Tennis Akademie','Halle','DE','grass',2,1200,1.2,'sv',0],
 ['mia','Miami Hardcourt Academy','Miami','US','hard',3,1900,1.26,'sv',0],
 ['bra','Gulf Coast Performance','Bradenton','US','hard',4,4500,1.46,'sv',200],
 ['aus','Texas Baseline Club','Austin','US','hard',2,1000,1.19,'fh',0],
 ['dxb','Desert Tennis Hub','Dubai','AE','hard',3,2200,1.3,'fi',0],
 ['mel','Yarra Tennis Centre','Melbourne','AU','hard',3,1800,1.26,'rt',0],
 ['tyo','Ariake Performance Center','Tóquio','JP','hard',2,1300,1.2,'rt',0],
 ['bue','Club Polvo de Ladrillo','Buenos Aires','AR','clay',2,600,1.17,'bh',0],
 ['scl','Academia Andina','Santiago','CL','clay',1,350,1.12,'fi',0],
 ['flp','CT Serra do Mar','Florianópolis','BR','clay',2,500,1.16,'fi',0],
 ['sao','Centro Paulista de Alto Rendimento','São Paulo','BR','hard',3,1300,1.25,'me',0],
 ['rio','Rio Tennis Club','Rio de Janeiro','BR','hard',1,300,1.12,'sv',0],
 ['cwb','Academia Araucária','Curitiba','BR','clay',1,280,1.11,'bh',0]];
const CT0=CENTERS.length;
V5CTS.forEach(c=>CENTERS.push({n:c[1],e:'',c:c[6],m:c[7],sp:c[8],d:'',lv:c[5],ct:c[0]}));
const ctLv=()=>{const i=S.me.center||0,C=CENTERS[i]||CENTERS[0];return C.lv!=null?C.lv:i};
const V5EU=new Set(['ES','FR','IT','GB','DE','NL','BE','CH','AT','PT','SE','RS','CZ','PL','GR','NO','DK','HR','HU','RO','BG','SK','SI','FI','IE']);
const v5Reg=iso=>iso===COUNTRIES[S.me.c][0]?'casa':iso==='MC'?'monaco':iso==='US'?'eua':V5EU.has(iso)?'europa':'casa';
const SURFL={clay:'Saibro',hard:'Quadra dura',grass:'Grama'};
function v5CtOpts(){const m=S.me,hi=COUNTRIES[m.c][0],hc=BASEC[hi]||COUNTRIES[m.c][1];
 const L=[{i:0,n:'Clube do bairro',city:hc,iso:hi,surf:null,lv:0,c:0,mu:1,sp:null,req:0,d:'Quadras simples perto de casa. Sem custo.'},{i:1,n:'Centro regional',city:hc,iso:hi,surf:'hard',lv:1,c:CENTERS[1].c,mu:CENTERS[1].m,sp:'fi',req:0,d:'Estrutura boa e preparação física.'}];
 V5CTS.forEach((c,k)=>L.push({i:CT0+k,n:c[1],city:c[2],iso:c[3],surf:c[4],lv:c[5],c:c[6],mu:c[7],sp:c[8],req:c[9]}));
 const cur=m.center||0;if(cur>=2&&cur<CT0){const C=CENTERS[cur];L.push({i:cur,n:C.n,city:myBase().city,iso:myBase().iso,surf:cur===2?'clay':cur===3?'hard':'hard',lv:cur,c:C.c,mu:C.m,sp:C.sp,req:0,old:1})}
 return L}
function v5CurCt(){const m=S.me,b=myBase(),cur=m.center||0;return v5CtOpts().find(o=>o.i===cur&&(o.i>=CT0||o.city===b.city))||{i:cur,n:CENTERS[cur].n,city:b.city,iso:b.iso,surf:null,lv:ctLv(),c:CENTERS[cur].c,mu:CENTERS[cur].m,sp:CENTERS[cur].sp,req:0}}
const v5CtName=()=>v5CurCt().n;
function v5Fee(a,b){if(a.city===b.city)return 0;if(a.iso===b.iso)return 2000;const ra=v5Reg(a.iso),rb=v5Reg(b.iso);if(ra===rb&&ra!=='casa')return 6000;return 12000}
function v5ReqOk(o){if(!o.req)return true;const r=myRank('pro')||9999,j=meAge()<=18?(myRank('jr')||9999):9999;return r<=o.req||j<=o.req/8}
const v5Stars=n=>n?'★'.repeat(n):'—';
function v5Live(reg){return BASES[reg]?BASES[reg][2]:0}
function v5Fx(o){const reg=v5Reg(o.iso),T=[];T.push([`treino ×${o.mu.toFixed(2)}`,o.mu>1?'g':'n']);if(o.sp)T.push([`bônus em ${ATTR.find(a=>a[0]===o.sp)[1].toLowerCase()}`,'g']);if(BASES[reg][3])T.push([`energia +${String(BASES[reg][3]).replace('.',',')}/sem`,'g']);if(reg==='casa'&&o.iso===COUNTRIES[S.me.c][0])T.push(['perto da família','g']);if(reg==='monaco')T.push(['impostos −8%','g'],['parte da torcida não gosta','b']);if(o.lv>=4)T.push(['recuperação melhor','g']);return T}
let V5BS=false,V5BF='all',V5MV=null;
setBase=function(){V5BS=true;V5MV=null;render()};
function v5BaseMini(){const o=v5CurCt(),reg=v5Reg(o.iso),tot=o.c+v5Live(reg);return `<div class="v5bm"><div class="v5bmh" style="--sf:${o.surf?(SURFC[o.surf]||['#666'])[0]:'var(--line)'}"><span class="v5k">${esc(o.city)} ${isoFlag(o.iso)}</span><b>${esc(o.n)}</b><span class="stars">${v5Stars(o.lv)}</span></div><div class="v5tags">${v5Fx(o).map(([t,c])=>`<span class="v5t ${c}">${t}</span>`).join('')}<span class="v5t m">${money(tot)}/sem</span></div><button class="full" style="margin-top:12px" onclick="setBase()">Ver bases e CTs</button></div>`}
baseCard=function(){const m=S.me,b=myBase(),loc=myLoc(),tv=m.trav&&m.trav.y===year()?m.trav:{v:0,n:0,km:0},pt=planTrips(0);
 return `<div class="card"><h3>Viagens</h3><div class="small">Sua base: <b>${placeName(b)}</b>${loc.city!==b.city?` · agora você está em <b>${placeName(loc)}</b>`:''}</div><p class="xs mut" style="margin:6px 0 10px">Cada torneio cobra a viagem a partir de onde você estiver e a hospedagem (nos ATP/WTA a hospedagem é paga pelo torneio na chave principal). Treinador e fisioterapeuta viajam com você. Entre torneios próximos, você fica na região se for mais barato.</p>
 <div class="g3" style="margin-bottom:10px"><div class="pill"><b>${money(tv.v)}</b><span>Viagens em ${year()}</span></div><div class="pill"><b>${fmt(tv.km)}</b><span>km rodados</span></div><div class="pill"><b>${money(pt.tot)}</b><span>Agenda prevista</span></div></div><button class="sec full" onclick="setBase()">Mudar de base ou de CT</button></div>`};
function v5HomeCard(){const o=v5CurCt();return `<div class="card"><h3>Onde você mora</h3><p class="small">Você mora e treina em <b>${esc(o.city)}</b>, no ${esc(o.n)}. Moradia, região e centro de treino agora ficam juntos na tela de base.</p><button class="sec full" onclick="setBase()">Ver bases e CTs</button></div>`}
function v5BaseView(){const m=S.me,o=v5CurCt(),reg=v5Reg(o.iso),live=v5Live(reg),b=myBase(),hi=COUNTRIES[m.c][0];
 let L=v5CtOpts().filter(x=>!(x.i===o.i&&x.city===o.city));if(V5BF==='home')L=L.filter(x=>x.iso===hi);else if(V5BF!=='all')L=L.filter(x=>x.surf===V5BF);
 L.sort((a,c)=>(v5ReqOk(c)-v5ReqOk(a))||c.lv-a.lv||a.c-c.c);
 const card=x=>{const ok=v5ReqOk(x),fee=v5Fee(b,x),xr=v5Reg(x.iso),wk=x.c+v5Live(xr),sc=x.surf?(SURFC[x.surf]||['#666','#333']):['#555','#333'];
  return `<button class="v5ct ${ok?'':'lock'}" onclick="V5MV=${x.i}+'|'+${JSON.stringify(x.city).replace(/"/g,'&quot;')};render()"><span class="v5ctb" style="background:linear-gradient(110deg,${sc[1]},${sc[0]})"><span><span class="v5k" style="color:#fff;opacity:.85">${esc(x.city)} ${isoFlag(x.iso)}${x.surf?' · '+SURFL[x.surf]:''}</span><b>${esc(x.n)}</b></span><span class="stars">${v5Stars(x.lv)}</span></span><span class="v5tags" style="padding:10px 12px 0">${v5Fx(x).slice(0,3).map(([t,c])=>`<span class="v5t ${c}">${t}</span>`).join('')}</span><span class="v5ctc"><span><small>Mudança</small><b>${fee?money(fee):'grátis'}</b></span><span><small>Manter</small><b>${wk?money(wk)+'/sem':'grátis'}</b></span>${ok?'':`<span><small>Convite</small><b style="color:var(--bad)">top ${x.req}</b></span>`}</span></button>`};
 const ch=[['all','Todos'],['clay','Saibro'],['hard','Quadra dura'],['grass','Grama'],['home','Seu país']];
 return `<div class="v5page" role="dialog" aria-label="Base e centro de treinamento"><div class="v5pat"></div><div class="v5pagein">
 <div class="v5ptop"><button class="v5menu" aria-label="Voltar" onclick="V5BS=false;render()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><span class="v5k">Base e centro de treinamento</span></div>
 <span class="v5k a">Sua base hoje</span><h1 class="v5h1 v5h1s">${esc(o.city)}</h1><p class="v5lede">${esc(o.n)} · ${v5Stars(o.lv)}${o.surf?` · ${SURFL[o.surf].toLowerCase()}`:''}</p>
 <div class="card" style="margin-top:12px"><div class="v5tags">${v5Fx(o).map(([t,c])=>`<span class="v5t ${c}">${t}</span>`).join('')}</div><div class="g3" style="margin-top:12px"><div class="pill"><b>${money(o.c)}</b><span>CT/sem</span></div><div class="pill"><b>${money(live)}</b><span>Moradia/sem</span></div><div class="pill"><b>${money(o.c+live)}</b><span>Total/sem</span></div></div></div>
 <p class="small mut" style="margin:0 0 12px">A base define onde você treina, de onde saem as viagens e quanto custa viver. CTs melhores fazem o treino render mais, mas custam caro para manter. Nada muda sem você confirmar.</p>
 <div class="chips v5tabs">${ch.map(([k,l])=>`<button class="${V5BF===k?'on':''}" onclick="V5BF='${k}';render()">${l}</button>`).join('')}</div>
 <div class="v5cts">${L.map(card).join('')||'<p class="mut">Nenhum CT com esse filtro.</p>'}</div></div></div>`}
function v5MoveView(){const[i,city]=String(V5MV).split('|'),m=S.me,x=v5CtOpts().find(o=>o.i===+i&&o.city===city);if(!x)return'';const o=v5CurCt(),b=myBase(),fee=v5Fee(b,x),xr=v5Reg(x.iso),or=v5Reg(o.iso),wk0=o.c+v5Live(or),wk1=x.c+v5Live(xr),ok=v5ReqOk(x),dw=wk1-wk0;
 const why=!ok?`O ${esc(x.n)} só aceita ${G('jogadores','jogadoras')} do top ${x.req}.`:S.tour?'Termine o torneio atual antes de se mudar.':m.money<fee?`Você precisa de ${money(fee)} para a mudança e tem ${money(m.money)}.`:'';
 return `<div class="modal" onclick="if(event.target===this){V5MV=null;render()}"><div class="box"><span class="v5k a">Confirmar mudança</span><h2 style="margin:6px 0 4px">${esc(x.city)} ${isoFlag(x.iso)}</h2><p style="margin:0 0 12px">${esc(x.n)} · ${v5Stars(x.lv)}${x.surf?' · '+SURFL[x.surf].toLowerCase():''}</p>
 <div class="v5cmp"><div><span>Mudança agora</span><b>${fee?money(fee):'grátis'}</b></div><div><span>Custo por semana</span><b>${money(wk0)} → ${money(wk1)}</b><small style="color:${dw>0?'var(--bad)':'var(--good)'}">${dw>0?'+':dw<0?'−':''}${dw?money(Math.abs(dw)):'igual'}</small></div><div><span>Treino</span><b>×${o.mu.toFixed(2)} → ×${x.mu.toFixed(2)}</b></div></div>
 <div class="v5tags" style="margin-top:10px">${v5Fx(x).map(([t,c])=>`<span class="v5t ${c}">${t}</span>`).join('')}${or==='casa'&&xr!=='casa'?'<span class="v5t b">longe da família</span>':''}</div>
 ${why?`<p class="small" style="color:var(--bad);margin:12px 0 0">${why}</p>`:''}
 <div class="g2" style="margin-top:14px"><button class="sec" onclick="V5MV=null;render()">Cancelar</button><button ${why?'disabled':''} onclick="v5DoMove()">Confirmar mudança</button></div></div></div>`}
function v5DoMove(){const[i,city]=String(V5MV).split('|'),m=S.me,x=v5CtOpts().find(o=>o.i===+i&&o.city===city);if(!x||S.tour||!v5ReqOk(x))return;const b=myBase(),fee=v5Fee(b,x);if(m.money<fee)return;
 m.money-=fee;m.center=x.i;m.hb={city:x.city,iso:x.iso};m.loc=null;const r=REL(),nr=v5Reg(x.iso);if(nr==='monaco'&&r.base!=='monaco')m.app=clamp((m.app??50)-3,0,100);r.base=nr;
 news(`Nova base: ${x.city} ${isoFlag(x.iso)}, no ${x.n}.${fee?` Mudança: ${money(fee)}.`:''}`);TOAST=`Base agora em ${x.city}`;V5MV=null;V5BS=false;save();render()}
{const _r5=render0;render0=function(){try{if(S&&S.me&&S.me.rel&&!BASES[S.me.rel.base])S.me.rel.base=v5Reg(myBase().iso)}catch(e){}_r5();try{if(S&&S.me&&!MENU&&!S.ended){const a=document.getElementById('app');if(V5BS)a.insertAdjacentHTML('beforeend',v5BaseView());if(V5MV!=null)a.insertAdjacentHTML('beforeend',v5MoveView());if(V5CO)a.insertAdjacentHTML('beforeend',v5CoachView())}}catch(e){console.error(e);V5BS=false;V5MV=null;V5CO=null}}}

// ---- treinadores ----
let V5CO=null,V5CF=null;
const V5TR=[['Exigente','Cobra muito e não aceita meio esforço.'],['Paciente','Constrói o jogo devagar, sem pressa.'],['Motivador','Levanta o astral nos piores momentos.'],['Estrategista','Estuda cada adversário a fundo.'],['Disciplinador','Rotina rígida, dentro e fora da quadra.'],['Calmo','Fala pouco e passa tranquilidade.'],['Explosivo','Intenso no box, vibra a cada ponto.']];
const cNum=c=>+String(c.id).replace(/\D/g,'')||7;
function v5CF(c){if(c.f==null){const N=NAMES[COUNTRIES[c.c][0]]||NAMES.US;c.f=N.f.some(x=>c.n===x||c.n.startsWith(x+' '))}return c.f}
function v5CAge(c){if(c.ab==null){const n=cNum(c);c.ab=year()-(c.ex?36+n%14:33+n%30)}return year()-c.ab}
function v5CAv(c){const r=seeded(cNum(c)*11+5),f=v5CF(c),pk=a=>a[Math.floor(r()*a.length)],age=v5CAge(c);return{g:f?'f':'m',ey:Math.floor(r()*5),sk:Math.floor(r()*6),h:f?pk(['curto','medio','coque','rabo']):pk(['curto','curto','raspado','medio','cacheado']),hc:age>=52&&r()<.75?5:Math.floor(r()*5),a:pk(['nada','nada','nada','bone','viseira']),sh:Math.floor(r()*8),bs:f?0:pk([0,0,1,2,3,4,2]),ac:Math.floor(r()*8),wb:-1,tt:false}}
const v5Trait=c=>V5TR[cNum(c)%V5TR.length];
function v5CHist(c){if(c.h)return c.h;const n=cNum(c),old=RNG;RNG=seeded(n*17+3);const H=[];try{const k=c.q>=4?ri(3,5):c.q>=2?ri(2,4):ri(1,2);let y=year()-1;for(let i=0;i<k&&y>year()-30;i++){const len=ri(1,c.q>=3?5:3),cc=R()<.45?c.c:pickCountry(),f=R()<(CIRC()==='WTA'?.95:.05);const base=[0,700,400,200,60,12][c.q];const hi=Math.max(1,Math.round(base*(.25+R()*1.1)));const t=c.q>=3?Math.max(0,Math.round(R()*c.q*1.6-2)):R()<.4?1:0;const gs=c.q===5&&hi<=6&&R()<.5?ri(1,3):0;const e={n:genName(cc,f),c:cc,y0:y-len+1,y1:y,hi};if(t)e.t=t;if(gs)e.gs=gs;if(c.q<=1&&R()<.5)e.jr=1;H.push(e);y-=len+ri(0,2)}}finally{RNG=old}c.h=H;return H}
function v5CLog(c,o){const H=v5CHist(c),y=year(),L=H[0];if(L&&((o.pid!=null&&L.pid===o.pid)||(o.me&&L.me))){L.y1=Math.max(L.y1,y);if(o.hi&&(!L.hi||o.hi<L.hi))L.hi=o.hi;return}H.unshift({...o,y0:y,y1:y});if(H.length>6)H.length=6}
{const _ac=assignCoaches;assignCoaches=function(){try{(S.pro||[]).forEach(p=>{if(p.co){const c=COI.get(p.co);if(c)v5CLog(c,{pid:p.id,n:p.n,c:p.c,hi:RK.pro[p.id]||null})}})}catch(e){}return _ac()}}
{const _hc=hireCoach;hireCoach=function(id){const before=S.me.coachId;_hc(id);if(S.me.coachId===id&&before!==id){const c=COI.get(id);if(c)v5CLog(c,{me:1,n:S.me.name,c:S.me.c,hi:myRank('pro')||null})}V5CO=null;render()}}
{const _fc=fireCoach;fireCoach=function(){V5CF=null;V5CO=null;_fc()}}
function v5CAllowed(q){const r=myRank('pro')||9999,j=meAge()<=18?(myRank('jr')||9999):9999;return !CREQ[q]||r<=CREQ[q]||j<=CREQ[q]/10}
function v5CRow(c,tag){const bot=S.pro.find(p=>p.co===c.id),[tn]=v5Trait(c);return `<button class="v5co" onclick="V5CO='${c.id}';render()">${av(c.n,c.c,'sm',v5CAv(c))}<span class="v5cod"><b>${esc(c.n)}</b><span><span class="stars">${'★'.repeat(c.q)}</span> · ${v5CAge(c)} anos · ${tn}${c.ex?' · ex-jogador':''}</span><small>${bot?`treina ${esc(bot.n)} (${rkOf(bot.id)})`:tag||`${money(c.sal)}/sem`}</small></span><i>›</i></button>`}
coachCard=function(){const m=S.me,c=myCoach(),fr=freeCoaches();
 const ok=fr.filter(x=>v5CAllowed(x.q)),lk=fr.filter(x=>!v5CAllowed(x.q)).sort((a,b)=>a.q-b.q||a.sal-b.sal);
 const pickV=[];for(let q=5;q>=1;q--){ok.filter(x=>x.q===q).sort((a,b)=>a.sal-b.sal).slice(0,q>=3?2:3).forEach(x=>pickV.push(x))}
 const locked=[];[3,4,5].forEach(q=>{const x=lk.find(y=>y.q===q);if(x)locked.push(x)});
 const elite=S.coaches.filter(x=>x.q>=4&&S.pro.some(p=>p.co===x.id)).sort((a,b)=>b.q-a.q||(RK.pro[S.pro.find(p=>p.co===a.id).id]||999)-(RK.pro[S.pro.find(p=>p.co===b.id).id]||999)).slice(0,4);
 const r=myRank('pro');
 let cur='<p class="small mut">Você está sem treinador. Um treinador acelera o treino e ajuda nas partidas.</p>';
 if(c){cInit();const[tn,td]=v5Trait(c);cur=`<button class="v5co me" onclick="V5CO='${c.id}';render()">${av(c.n,c.c,'md',v5CAv(c))}<span class="v5cod"><b>${esc(c.n)}</b><span><span class="stars">${'★'.repeat(c.q)}</span> · ${v5CAge(c)} anos · ${tn}</span><small>${COACH_ST[c.st]} · ${ATTR.find(a=>a[0]===c.sp)[1]} · ${money(c.sal)}/sem</small></span><i>›</i></button>${c.me?'':`<div class="small" style="margin:10px 0 4px">Confiança do treinador: <b class="${m.cTrust<35?'loss':m.cTrust>=65?'win':''}">${Math.round(m.cTrust)}/100</b> · contrato até ${wkDate(m.cUntil)} ${year0(m.cUntil)}</div><div class="bar"><i style="width:${m.cTrust}%"></i></div><div class="xs mut" style="margin-top:4px">Sobe quando você segue as dicas e vence. Abaixo de 18, ele pede demissão.</div>`}`}
 return `<div class="card"><h3>Treinador</h3>${cur}
 <div class="sec-t" style="margin-top:14px">Querem trabalhar com você${r?` · você é #${r}`:''}</div>${pickV.map(x=>v5CRow(x)).join('')||'<p class="small mut">Ninguém disponível agora.</p>'}
 ${locked.length?`<div class="sec-t" style="margin-top:14px">Ainda fora do seu alcance</div>${locked.map(x=>v5CRow(x,`só aceita top ${CREQ[x.q]}`)).join('')}`:''}
 ${elite.length?`<div class="sec-t" style="margin-top:14px">Elite, com outros ${G('jogadores','jogadoras')}</div>${elite.map(x=>v5CRow(x)).join('')}`:''}</div>`};
function v5CoachView(){const c=COI.get(V5CO);if(!c)return'';const m=S.me,mine=m.coachId===c.id,bot=S.pro.find(p=>p.co===c.id),fee=bot?c.sal*10:0,ok=v5CAllowed(c.q),[tn,td]=v5Trait(c),H=v5CHist(c);
 if(mine){const L=H.find(h=>h.me);if(L){L.y1=year();const r=myRank('pro');if(r&&(!L.hi||r<L.hi))L.hi=r}}
 const why=mine?'':!ok?`Só aceita ${G('jogadores','jogadoras')} do top ${CREQ[c.q]}${meAge()<=18?` (ou top ${CREQ[c.q]/10} juvenil)`:''}.`:m.money<fee+c.sal?`Você precisa de ${money(fee+c.sal)} e tem ${money(m.money)}.`:'';
 const hist=H.map(h=>`<div class="v5ch"><span class="v5chy">${h.y0===h.y1?h.y0:`${h.y0}–${String(h.y1).slice(-2)}`}</span><span><b>${h.me?esc(m.name)+' (você)':esc(h.n)}</b> ${flag(h.c)}<small>${h.jr?'juvenil · ':''}${h.hi?`melhor ranking #${h.hi}`:'sem ranking'}${h.t?` · ${h.t} título${h.t>1?'s':''}`:''}${h.gs?` · ${h.gs} Slam${h.gs>1?'s':''}`:''}</small></span></div>`).join('');
 return `<div class="modal" onclick="if(event.target===this){V5CO=null;V5CF=null;render()}"><div class="box"><div class="v5cph">${av(c.n,c.c,'lg',v5CAv(c))}<div><span class="v5k a">Treinador${v5CF(c)?'a':''} · ${'★'.repeat(c.q)}</span><h2 style="margin:4px 0 2px">${esc(c.n)}</h2><span class="small mut">${flag(c.c)} ${esc(COUNTRIES[c.c][1])} · ${v5CAge(c)} anos${c.ex?' · ex-jogador':''}</span></div></div>
 <p style="margin:12px 0 8px"><b style="font-family:var(--fd)">${tn}.</b> ${td}</p>
 <div class="v5cmp"><div><span>Estilo</span><b>${COACH_ST[c.st]}</b></div><div><span>Especialidade</span><b>${ATTR.find(a=>a[0]===c.sp)[1]}</b></div><div><span>Salário</span><b>${money(c.sal)}/sem</b></div><div><span>Treino</span><b>×${COACH[c.q].m}</b></div>${bot?`<div><span>Treina hoje</span><b>${esc(bot.n)} ${rkOf(bot.id)}</b></div>`:''}${CREQ[c.q]?`<div><span>Exige</span><b>top ${CREQ[c.q]}</b></div>`:''}</div>
 <div class="sec-t" style="margin-top:14px">Quem já treinou</div><div class="v5chl">${hist||'<p class="small mut">Primeiro trabalho como treinador.</p>'}</div>
 ${mine?(V5CF?`<p class="small" style="margin:14px 0 0">Dispensar ${esc(c.n.split(' ')[0])}? O contrato termina hoje e o treino volta a render sem treinador.</p><div class="g2" style="margin-top:10px"><button class="sec" onclick="V5CF=null;render()">Manter</button><button style="background:var(--bad);color:#fff" onclick="fireCoach()">Dispensar</button></div>`:`<div class="g2" style="margin-top:14px"><button class="sec" onclick="V5CO=null;render()">Fechar</button><button class="sec" onclick="V5CF=1;render()">Dispensar</button></div>`)
 :`${!why?`<p class="small" style="margin:14px 0 0">${fee?`Multa para tirar de ${esc(bot.n)}: <b>${money(fee)}</b>. `:''}Salário: <b>${money(c.sal)}/sem</b>${m.coachId?` · substitui ${esc(myCoach().n)}`:''}.</p>`:`<p class="small" style="color:var(--bad);margin:14px 0 0">${why}</p>`}<div class="g2" style="margin-top:10px"><button class="sec" onclick="V5CO=null;render()">Fechar</button><button ${why?'disabled':''} onclick="hireCoach('${c.id}')">${fee?'Contratar e pagar multa':'Contratar'}</button></div>`}
 </div></div>`}
// rosto do treinador no elenco
{const _ro=v5Roster;v5Roster=function(){let s=_ro();const c=myCoach();if(c)s=s.replace(/<span class="v5ini">[^<]*<\/span>/,`<span class="v5face">${av(c.n,c.c,'sm',v5CAv(c))}</span>`);return s.replace(`onclick="ACCO['coach']`,`onclick="ACCO['coach']`)}}
