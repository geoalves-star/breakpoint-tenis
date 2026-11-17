// =============== v4.2: equipe do treinador, volta por cima, treinador do ano ===============
const CMMAX=2;
function cmPups(){const c=S.cm;if(!c)return[];c.pup=(c.pup||[]).filter(x=>IDX.get(x.id));return c.pup}
function cmArchive(m){const c=S.cm;if(!c||!m||m._arch)return;m._arch=1;(c.formed=c.formed||[]).push({n:m.name,c:m.c,from:c.since||0,to:S.w,hi:m.st.hiPro||null,hj:m.st.hiJr||null,t:m.st.titles.length,gs:m.st.titles.filter(t=>t.tier==='GS').length,main:1})}
function cmArchPup(x){const c=S.cm;(c.formed=c.formed||[]).push({n:x.n,c:x.c,from:x.since,to:S.w,hi:x.hi||null,hj:x.hj||null,t:x.t||0,gs:0,main:0})}
function cmAddPup(id){const c=S.cm,p=IDX.get(id);if(!c||!p)return;c.pup=c.pup||[];if(c.pup.length>=CMMAX||c.pup.some(x=>x.id===id))return;c.pup.push({id,since:S.w,r0:p.r,n:p.n,c:p.c,t:0});c.pupN=(c.pupN||0)+1;news(`🧑‍🏫 ${flag(p.c)} ${p.n} agora faz parte da sua equipe.`)}
function cmDrop(id){const c=S.cm;if(!c)return;const x=(c.pup||[]).find(q=>q.id===id);if(!x)return;cmArchPup(x);c.pup=c.pup.filter(q=>q.id!==id);news(`👋 Você dispensou ${x.n} da sua equipe.`);save();render()}
function cmOffer(){const c=S.cm;if(!c||S.ended||c.fired||(c.offW||-99)>S.w-6||S.modals.length||S.tour)return;const pu=cmPups(),rep=cmRep();if(pu.length>=CMMAX||rep<2||R()>.2)return;
 const taken=new Set([S.rival,...pu.map(x=>x.id)]),myO=ovr();
 const pool=S.jr.filter(p=>!taken.has(p.id)&&ageOf(p)>=14&&ageOf(p)<=17&&p.r<myO+4).concat(S.pro.filter(p=>!taken.has(p.id)&&ageOf(p)<=23&&p.r<myO-2&&(RK.pro[p.id]||999)>40));if(!pool.length)return;
 pool.sort((a,b)=>b.pot-a.pot);const top=pool.slice(0,Math.max(8,Math.round(pool.length*(rep>=4?.05:rep>=3?.15:.35))));const p=pick(top);c.offW=S.w;
 S.modals.push({k:'Treinador',e:'🧑‍🏫',ti:`${p.n} quer treinar com você`,q:`${p.n}, ${ageOf(p)} anos (${rkOf(p.id)}, nível ${Math.round(p.r)}), gostou do seu trabalho com ${S.me.name}. Sua equipe pode ter até ${CMMAX+1} atletas. Cada aluno rende US$ 120 por semana, mais bônus por ranking e títulos, mas tira 5% do rendimento do treino de ${S.me.name.split(' ')[0]}.`,o:[{l:'Aceitar o aluno',t:`${flag(p.c)} ${COUNTRIES[p.c][1]} · olheiros: ${scoutTxt(p.pot)}`,fx:{cmPup:p.id}},{l:'Recusar',t:`Foco total em ${S.me.name.split(' ')[0]}`,fx:{cmT:1}}]})}
function cmPupWeek(){const c=S.cm;if(!c||S.ended)return;const keep=[];
 for(const x of(c.pup||[])){const p=IDX.get(x.id);if(!p){cmArchPup(x);news(`👋 ${x.n} deixou o circuito e saiu da sua equipe.`);continue}
  x.n=p.n;x.c=p.c;const rk=RK.pro[p.id]||null,rj=RK.jr[p.id]||null;if(rk&&(!x.hi||rk<x.hi))x.hi=rk;if(rj&&(!x.hj||rj<x.hj))x.hj=rj;
  if(p.r<p.pot)p.r=Math.min(p.pot,p.r+.03*(1+.3*(c.acad||0)));
  c.wallet+=120+(rk&&rk<=20?900:rk&&rk<=100?300:rj&&rj<=20?150:0);keep.push(x)}
 c.pup=keep;if(keep.length)c.trust=clamp(c.trust-.12*keep.length,0,100);cmOffer()}
function cmCands(){try{computeRanks()}catch(e){}const c=S.cm,rep=cmRep(),L=[];cmPups().forEach(x=>L.push({id:x.id,pup:1}));
 const taken=new Set([S.rival,...L.map(x=>x.id)]);const pool=S.jr.filter(p=>!taken.has(p.id)&&ageOf(p)>=14&&ageOf(p)<=16).sort((a,b)=>b.pot-a.pot);
 const lo=Math.floor(pool.length*(rep>=4?0:rep>=3?.08:rep>=2?.25:.45));const sl=pool.slice(lo,lo+40);const pk=[];const same=sl.filter(p=>p.c===S.me.c);if(same.length)pk.push(pick(same));
 let g=0;while(pk.length<3&&sl.length&&g++<50){const p=pick(sl);if(!pk.includes(p))pk.push(p)}pk.forEach(p=>L.push({id:p.id}));return L.filter(x=>IDX.get(x.id)).slice(0,4)}
function cmFired(why){const c=S.cm,m=S.me;if(!c||c.fired)return;c.fired=why;if(c.born!=null&&ageOf(c)>=70){endCareer('cmapos');return}
 const L=cmCands();const fired=why==='demitido';
 S.modals.push({k:'Treinador',e:'🧑‍🏫',ti:fired?`${m.name} decidiu trocar de treinador`:`${m.name} se aposentou`,q:fired?'A confiança chegou ao fim. Mas o seu trabalho não passou despercebido: chegaram propostas de outros atletas. Quem você quer treinar agora?':`Fim de uma bela jornada juntos. Agora é hora de escolher o próximo talento.`,
  o:L.map(x=>{const p=IDX.get(x.id);return{l:`${x.pup?'Seu aluno: ':''}${p.n}`,t:`${flag(p.c)} ${ageOf(p)} anos · ${rkOf(p.id)} · nível ${Math.round(p.r)} · olheiros: ${scoutTxt(p.pot)}`,fx:{cmNew:p.id}}}).concat([{l:'Encerrar a carreira de treinador',t:'Fim de jogo, com a sua história registrada',fx:{cmQuit:why}}])})}
function cmTake(id){const c=S.cm,old=S.me,p=IDX.get(id);if(!c||!p)return;cmArchive(old);const back=c.fired==='demitido';
 c.pup=(c.pup||[]).filter(x=>x.id!==id);const ag=ageOf(p),jr=S.jr.includes(p);S.jr=S.jr.filter(x=>x!==p);S.pro=S.pro.filter(x=>x!==p);for(const k in(S.draws||{}))if(Array.isArray(S.draws[k]))S.draws[k]=S.draws[k].filter(q=>q!==id);if(old.ment===id)old.ment=null;
 const a={};ATTR.forEach(([k])=>a[k]=clamp(p.r+gauss()*1.8,15,95));const style=p.b>=2?'sacador':p.b<=-1?'contra':pick(['fundo','completo']);const pers=pick([15,40,40,65]);
 S.me={name:p.n,g:old.g,av:{...aiAv(p),g:old.g},c:p.c,hand:R()<.12?'canhoto':'destro',style,attrs:a,gen:+R().toFixed(2),pot0:0,pot:Math.max(p.pot,p.r+4),energy:100,money:4000,coach:0,physio:0,center:0,life:'equil',injury:0,born:p.born,ptsPro:jr?[]:p.pts.slice(),ptsJr:jr?p.pts.slice():[],focus:'geral',tac:'equil',health:60,load:0,wear:0,assets:[],inv:0,base:pers,behav:pers,fol:300+Math.max(0,ag-14)*400,spons:[],st:{w:0,l:0,titles:[],jrTitles:[],hiPro:null,hiJr:null,prize:0}};
 const m=S.me;m.fs=p.fs??favSurfIdx(COUNTRIES[p.c][0]);m.app=50;m.biz=[];m.don={};m.pro=jr?0:1;m.ach=old.ach||{};['pmode','noRemind','wint'].forEach(k=>{if(old[k]!=null)m[k]=old[k]});
 S.hist=[];S.results=[];S.plan={};S.tour=null;S.busy=-1;S.rvRev=null;S.heat=25;S.rival=null;computeRanks();{const o=ovr(),pool=(ag<=18?S.jr.filter(q=>Math.abs(ageOf(q)-ag)<=1):S.pro.filter(q=>Math.abs(ageOf(q)-ag)<=2)).filter(q=>q.c!==m.c||R()<.3).sort((x,y)=>Math.abs(x.r-o)-Math.abs(y.r-o));const rv=pool[0];if(rv){S.rival=rv.id;rv.pot=Math.max(rv.pot,m.pot-1);news(`⚔️ A imprensa já aponta ${flag(rv.c)} ${rv.n} como ${G('o rival','a rival')} de ${m.name}.`)}}computeRanks();
 S.season={w0:S.w,rp:myRank('pro'),rj:ag<=18?myRank('jr'):null,fol:m.fol,prize:0,ovr:ovr()};
 c.trust=60;c.since=S.w;c.fired=0;c.warn=0;c.lt=null;c.lp=0;if(back)c.backs=(c.backs||0)+1;
 try{mkGoals()}catch(e){}try{checkPro()}catch(e){}try{autoPlan('eq',0)}catch(e){}
 news(`🧑‍🏫 Novo capítulo: ${c.n} agora treina ${flag(m.c)} ${m.name}, ${ag} anos.`);hl(`🧑‍🏫 Começou a treinar ${m.name}`);TAB='home'}
function cmQuit(why){const c=S.cm;if(c)c.final=1;endCareer(why==='idade'?'idade':'demitido')}
function cmTeamCard(){const c=S.cm;if(!c)return'';const pu=cmPups(),F=c.formed||[],f1=esc(S.me.name.split(' ')[0]);const mr=myRank('pro'),mj=myRank('jr');
 return `<div class="card"><h3>👥 Sua equipe <span class="xs mut">${pu.length+1}/${CMMAX+1}</span></h3>
 <div class="spn">${av(S.me.name,S.me.c,'sm',myAv())}<div style="flex:1;min-width:0"><b>${esc(S.me.name)}</b> <span class="xs" style="color:var(--acc)">principal</span><div class="xs mut">${meAge()} anos · ${mr?'#'+mr+' '+CIRC():mj?'#'+mj+' JR':'s/ rank'} · nível ${Math.round(ovr())}</div></div></div>
 ${pu.map(x=>{const p=IDX.get(x.id);const d=p.r-x.r0;return `<div class="spn"><span onclick="openP(${p.id})" style="cursor:pointer">${av(p.n,p.c,'sm',pAv(p))}</span><div style="flex:1;min-width:0;cursor:pointer" onclick="openP(${p.id})"><b>${esc(p.n)}</b><div class="xs mut">${ageOf(p)} anos · ${rkOf(p.id)} · nível ${Math.round(p.r)} <span class="${d>=0?'win':'loss'}">(${d>=0?'+':''}${d.toFixed(1)})</span>${x.t?` · 🏆 ${x.t}`:''}</div></div><button class="ghost" onclick="cmDrop(${p.id})">Dispensar</button></div>`}).join('')}
 <p class="xs mut" style="margin:8px 0 0">${pu.length?`Cada aluno rende US$ 120 por semana, mais bônus por ranking e títulos. Em troca, ${f1} perde 5% do rendimento no treino e um pouco de confiança.`:cmRep()>=2?'Com a sua reputação, outros atletas podem pedir para treinar com você.':'Com ★★ de reputação, outros atletas vão pedir para treinar com você.'}</p>
 ${F.length?`<div class="sec-t" style="margin-top:10px">Atletas que você formou</div>${F.slice(-8).reverse().map(f=>`<div class="small" style="padding:3px 0">${flag(f.c)} ${esc(f.n)} <span class="xs mut">${f.main?'principal':'aluno'} · ${2027+Math.floor(f.from/52)}–${2027+Math.floor(f.to/52)} · melhor ${f.hi?'#'+f.hi:f.hj?'#'+f.hj+' JR':'—'}${f.t?' · '+f.t+' título(s)':''}${f.gs?' · '+f.gs+' Slam(s)':''}</span></div>`).join('')}`:''}
 ${(c.awards||[]).length?`<div class="sec-t" style="margin-top:10px">🏅 Treinador do Ano</div><div class="small">${c.awards.join(' · ')}</div>`:''}</div>`}
function cmLegacyHtml(){const c=S.cm;if(!c)return'';const F=c.formed||[];return `<div class="sec-t" style="margin-top:12px">🧑‍🏫 A carreira de ${esc(c.n)}${c.born!=null?` (${ageOf(c)} anos)`:''}</div><div class="small">${F.length} atleta(s) formado(s) · ${(c.awards||[]).length} prêmio(s) de Treinador do Ano · ${ACADL[c.acad||0][0]}</div>${F.slice(-6).map(f=>`<div class="xs mut">${flag(f.c)} ${esc(f.n)}: melhor ${f.hi?'#'+f.hi:f.hj?'#'+f.hj+' JR':'—'}${f.t?', '+f.t+' título(s)':''}</div>`).join('')}`}

// =============== v4.2: coletiva ampliada ===============
function pcExtra(Q,ev,win,stage,opp){const m=S.me,md=MEDIA[ri(0,4)],nm=m.name,p=opp!=null?IDX.get(opp):null,cn=COUNTRIES[m.c][1];
 Q.push({q:`Que recado você deixa para quem torce por você em ${cn}?`,o:[['Emocionado','Cada mensagem de vocês me empurra em quadra. Obrigado!',{app:2,folP:2}],['Focado','Ainda não fiz nada. Quero muito mais.',{me:.2}]]});
 if(m.spons&&m.spons.length)Q.push({q:'Seus patrocinadores estão satisfeitos com a temporada?',o:[['Valorizar a marca','Tenho parceiros que acreditam no meu trabalho desde o começo.',{app:1,money:2000}],['Só tênis','Prefiro falar só de tênis hoje.',{me:.2,app:-1}]]});
 if(isPro())Q.push({q:`Você vai defender ${cn} na ${TEAMN()}?`,o:[['Sempre que chamarem','Jogar pelo meu país é uma honra enorme.',{app:3,folP:1}],['A agenda decide','Primeiro preciso cuidar do meu calendário.',{app:-2,me:.1}]]});
 if(m.energy<55||(m.load||0)>60)Q.push({q:'Você parece cansado. Vai diminuir o ritmo?',o:[['Poupar o corpo','Preciso descansar para render mais.',{en:8,app:.5}],['Sem tempo para descanso','Estou num grande momento e quero jogar tudo.',{me:.2,en:-4,folP:1}]]});
 if(p&&!win)Q.push({q:`${p.n} foi superior hoje?`,o:[['Dar o mérito','Mérito total. Jogou melhor do que eu.',{app:2,behav:-2}],['Eu perdi sozinho','Perdi mais do que o adversário ganhou.',{me:.2,behav:2,post:{a:md[0],h:md[1],t:`😶 ${nm} depois da derrota: "Perdi mais do que o adversário ganhou."`,k:'md'}}]]});
 if(p&&win&&(RK.pro[opp]||999)<(myRank('pro')||999))Q.push({q:'Foi a maior vitória da sua carreira?',o:[['Humildade','Só mais uma vitória. Amanhã tem mais.',{me:.2,app:1}],['Recado dado','Agora o circuito sabe quem eu sou.',{folP:3,behav:2,me:.3,post:{a:md[0],h:md[1],t:`📣 ${nm} após vencer ${p.n}: "Agora o circuito sabe quem eu sou."`,k:'md'}}]]});
 if(stage==='Final')Q.push({q:`Como é jogar uma final em ${ev.name}?`,o:[['Sonho realizado','Eu sonhava com isso desde criança.',{folP:2,app:1}],['Não basta','Final é bom, mas eu vim para ganhar.',{me:.3}]]});
 if(S.cm)Q.push({q:`Qual é o papel de ${S.cm.n} nessa fase?`,o:[['Elogiar o treinador','Sem o trabalho da minha equipe, nada disso acontece.',{cmT:5,app:1}],['O mérito é meu','Quem entra em quadra sou eu.',{cmT:-6,folP:2,behav:3}]]});
 if(opp!=null&&opp===S.rival&&S.rvRev)Q.push({q:'Essa partida tinha gosto de revanche?',o:[['Sem mágoa','Cada jogo é uma história nova.',{heat:-5,app:1}],['Com certeza','Eu esperava por esse jogo desde aquela final.',{heat:8,folP:2}]]})}

// =============== v4.2: rivalidade com história ===============
function h2hCard(opp){if(opp==null)return'';const H=S.hist.filter(h=>h.o===opp).slice(0,3);const rv=opp===S.rival;if(!H.length&&!(rv&&S.rvRev))return'';
 return `<div class="card" style="margin:10px 0 0;padding:10px 12px;${rv?'border-color:var(--pink,#ff5fa2)':''}"><div class="mk">${rv?'⚔️ Histórico da rivalidade':'📜 Últimos confrontos'}</div>${H.map(h=>`<div class="small" style="margin-top:4px"><b class="${h.win?'win':'loss'}">${h.win?'V':'D'}</b> ${esc(h.e)}${h.rd?' · '+esc(h.rd):''} · ${h.s}</div>`).join('')}${rv&&S.rvRev?`<div class="xs" style="margin-top:6px;color:var(--gold)">🔁 Revanche da final de ${esc(S.rvRev.e)}: motivação extra no saque e na devolução.</div>`:''}</div>`}

// =============== v4.2: retrospectiva do ano e placar entre amigos ===============
const TSC={FIN:80,EXH:0,GS:120,M1000:60,A500:35,A250:22,C175:14,C125:12,C100:10,C75:8,C50:7,M25:4,M15:3,OLY:70,JGS:30,J500:15,J300:10,J200:8,J100:6,J60:4,J30:3};
function yrScore(sn){let s=sn.W*3-sn.L;sn.tit.forEach(([n,t])=>s+=TSC[t]??8);if(sn.rp)s+=Math.round(400/Math.sqrt(sn.rp));else if(sn.rj)s+=Math.round(120/Math.sqrt(sn.rj));return Math.max(0,s)}
function cksum(t){let h=7;for(const ch of t)h=(h*31+ch.charCodeAt(0))%1296;return h.toString(36).toUpperCase().padStart(2,'0')}
const sdTag=()=>((S.seed||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6))||'LIVRE';
function yrCode(sn){const b=`${sdTag()}-${sn.y%100}-${sn.sc.toString(36).toUpperCase()}-${(sn.rp||0).toString(36).toUpperCase()}-${sn.tit.length.toString(36).toUpperCase()}`;return b+'-'+cksum(b+'bp')}
function yrParse(code){const t=(code||'').toUpperCase().replace(/\s+/g,'');const p=t.split('-');if(p.length!==6)return null;const b=p.slice(0,5).join('-');if(cksum(b+'bp')!==p[5])return null;const y=2000+(+p[1]);if(!(y>=2027&&y<2200))return null;return{sd:p[0],y,sc:parseInt(p[2],36),rp:parseInt(p[3],36)||null,t:parseInt(p[4],36)||0,code:t}}
function retroSnap(){const m=S.me,y=year(),s0=S.season||{w0:S.w-51},w0=s0.w0||0;
 const H=S.hist.filter(h=>h.w>=w0&&h.tier!=='TEAM'),W=H.filter(h=>h.win).length,L=H.length-W;const res=S.results.filter(r=>r.y===y);const tit=res.filter(r=>r.r==='Campeão'&&r.tier!=='EXH').map(r=>[r.n,r.tier]);
 const bw=H.filter(h=>h.win&&h.or).sort((a,b)=>a.or-b.or)[0];const T=(m.trips||[]).filter(t=>t.w>=w0);const km=Math.round(T.reduce((s,t)=>s+(t.km||0),0));
 const ctr=new Set(T.filter(t=>!t.home).map(t=>t.bi)).size,cit=new Set(T.filter(t=>!t.home).map(t=>t.b)).size;
 const rows=(m.hx||[]).filter(r=>r[0]>=w0),usePro=rows.some(r=>r[1]);const hx=rows.map(r=>usePro?r[1]:r[2]).filter(v=>v>0);
 const rp=myRank('pro'),rj=meAge()<=18?myRank('jr'):null;const rv=rival(),rvH=H.filter(h=>h.o===S.rival),rvW=rvH.filter(h=>h.win).length;
 const ach=Object.entries(m.ach||{}).filter(([k,w])=>w-1>=w0).map(([k])=>k);const gs=res.filter(r=>r.tier==='GS'||r.tier==='JGS').map(r=>[r.n,r.r]);
 const sn={y,n:m.name,c:m.c,age:meAge(),W,L,tit,bw:bw?{n:bw.on,c:bw.oc,r:bw.or,e:bw.e,s:bw.s}:null,rp0:s0.rp||null,rp,rj0:s0.rj||null,rj,hx,hxp:usePro?1:0,km,ctr,cit,rv:rv&&rvH.length?{n:rv.n,c:rv.c,w:rvW,l:rvH.length-rvW}:null,ach,gs,prize:Math.round(m.st.prize-(s0.prize||0)),fol:Math.round(m.fol-(s0.fol||0)),o:+(ovr()-(s0.ovr||ovr())).toFixed(1)};
 if(S.cm)sn.cm={n:S.cm.n,tr:Math.round(S.cm.trust),pu:cmPups().map(x=>x.n),aw:(S.cm.awards||[]).includes(y)?1:0};
 sn.sc=yrScore(sn);sn.code=yrCode(sn);m.retros=m.retros||{};m.retros[y]=sn;const ks=Object.keys(m.retros).map(Number).sort((a,b)=>a-b);while(ks.length>15)delete m.retros[ks.shift()];return sn}
function retroVerdict(sn){if(sn.tit.some(t=>t[1]==='GS'))return `Temporada histórica: ${G('campeão','campeã')} de Grand Slam!`;if(sn.rp&&sn.rp<=10)return 'Temporada de elite, entre os melhores do mundo.';if(sn.tit.length>=3)return 'Temporada vencedora, cheia de títulos.';if(sn.rp0&&sn.rp&&sn.rp<sn.rp0*.6)return 'Temporada de afirmação: grande salto no ranking.';if(sn.rj&&sn.rj<=20)return 'Destaque do circuito juvenil. O futuro promete!';if(sn.rp0&&sn.rp&&sn.rp>sn.rp0*1.3)return 'Temporada difícil. A próxima vai ser diferente.';return 'Temporada de aprendizado e evolução.'}
function rSpark(v){if(v.length<2)return'';const mx=Math.max(...v),mn=Math.min(...v),W=300,H=90;const pts=v.map((y,i)=>`${(i/(v.length-1)*W).toFixed(1)},${(mx===mn?H/2:(y-mn)/(mx-mn)*H).toFixed(1)}`).join(' ');const last=pts.split(' ').pop().split(',');
 return `<svg viewBox="-8 -8 316 106" style="width:100%;max-width:340px;margin-top:18px"><polyline points="${pts}" fill="none" stroke="#22e07a" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${last[0]}" cy="${last[1]}" r="6" fill="#ffd23f"/></svg>`}
function retroSlides(sn){const S2=[],nm=esc(sn.n),pct=sn.W+sn.L?Math.round(sn.W/(sn.W+sn.L)*100):0;
 S2.push(`<div class="rk">Breakpoint · retrospectiva</div><div class="rbig">${sn.y}</div><div class="rt">A temporada de ${nm}</div><div class="rs">${flag(sn.c)} ${sn.age} anos${sn.cm?` · treinad${G('o','a')} por ${esc(sn.cm.n)}`:''}</div>`);
 S2.push(sn.W+sn.L?`<div class="rk">Em quadra</div><div class="rbig">${sn.W}<span>–</span>${sn.L}</div><div class="rt">vitórias e derrotas</div><div class="rs">${pct}% de aproveitamento${sn.o?` · nível ${sn.o>0?'+':''}${sn.o}`:''}</div>`:`<div class="rk">Em quadra</div><div class="rbig">0</div><div class="rt">partidas oficiais</div><div class="rs">Um ano de preparação longe das quadras.</div>`);
 S2.push(sn.tit.length?`<div class="rk">Troféus</div><div class="rbig">${sn.tit.length}</div><div class="rt">título${sn.tit.length>1?'s':''} no ano</div><div class="rl">${sn.tit.slice(0,6).map(t=>`<div>🏆 ${esc(t[0])}</div>`).join('')}</div>`:`<div class="rk">Troféus</div><div class="rbig">0</div><div class="rt">títulos desta vez</div><div class="rs">${sn.gs.length?'Nos Slams: '+sn.gs.map(g=>esc(g[0])+' ('+esc(g[1])+')').join(', '):'O primeiro está chegando.'}</div>`);
 if(sn.bw)S2.push(`<div class="rk">Melhor vitória</div><div class="rbig" style="font-size:min(20vw,110px)">#${sn.bw.r}</div><div class="rt">${flag(sn.bw.c)} ${esc(sn.bw.n)}</div><div class="rs">${esc(sn.bw.e)} · ${sn.bw.s}</div>`);
 {const a=sn.hxp?sn.rp0:sn.rj0,b=sn.hxp?sn.rp:sn.rj;if(b||sn.hx.length)S2.push(`<div class="rk">Ranking ${sn.hxp?CIRC():'juvenil'}</div><div class="rbig" style="font-size:min(20vw,110px)">${b?'#'+b:'—'}</div><div class="rt">${a&&b?(b<a?`subiu ${a-b} posições`:b>a?`caiu ${b-a} posições`:'manteve a posição'):'posição no fim do ano'}</div>${a?`<div class="rs">Começou o ano em #${a}</div>`:''}${rSpark(sn.hx)}`)}
 if(sn.km)S2.push(`<div class="rk">Na estrada</div><div class="rbig" style="font-size:min(18vw,100px)">${Math.round(sn.km).toLocaleString('pt-BR')}</div><div class="rt">km viajados</div><div class="rs">${(sn.km/40075).toFixed(1).replace('.',',')} voltas ao mundo · ${sn.ctr} país(es) · ${sn.cit} cidade(s)</div>`);
 if(sn.rv)S2.push(`<div class="rk">Rivalidade</div><div class="rbig">${sn.rv.w}<span>–</span>${sn.rv.l}</div><div class="rt">contra ${flag(sn.rv.c)} ${esc(sn.rv.n)}</div><div class="rs">${sn.rv.w>sn.rv.l?'O ano foi seu.':sn.rv.w<sn.rv.l?'O rival levou a melhor. Por enquanto.':'Empate. A história continua.'}</div>`);
 if(sn.ach.length){const A=sn.ach.map(id=>ACH.find(a=>a[0]===id)).filter(Boolean);if(A.length)S2.push(`<div class="rk">Conquistas</div><div class="rbig">${A.length}</div><div class="rt">desbloqueada${A.length>1?'s':''} no ano</div><div class="badg" style="justify-content:center;margin-top:14px">${A.slice(0,6).map(([id,e,n])=>`<div class="bdg on">${badgeSVG(id,e,true)}<b>${n}</b></div>`).join('')}</div>`)}
 if(sn.cm)S2.push(`<div class="rk">Treinador</div><div class="rbig" style="font-size:min(20vw,110px)">${sn.cm.tr}</div><div class="rt">de confiança do atleta</div><div class="rs">${sn.cm.aw?'🏅 Treinador do Ano! ':''}${sn.cm.pu.length?'Alunos: '+sn.cm.pu.map(esc).join(', '):'Sem alunos extras'}</div>`);
 S2.push(`<div class="rk">Resumo</div><div class="rt" style="font-size:24px">${retroVerdict(sn)}</div><div class="rbig" style="font-size:min(18vw,96px);margin-top:12px">${sn.sc}</div><div class="rs">pontos no placar da temporada</div><div class="rcode">${sn.code}</div><div class="xs" style="opacity:.6;margin-top:6px">Mande esse código para os amigos compararem em ☰ → Desafio entre amigos</div>
  <button class="full" onclick="event.stopPropagation();shareRetro(${sn.y})">📲 Compartilhar imagem</button><button class="sec full" onclick="event.stopPropagation();copyTxt('${sn.code}','Código copiado.')">Copiar código</button><button class="sec full" onclick="event.stopPropagation();retroClose()">Fechar</button>`);
 return S2}
let RETRO=null,RETROT=null;
function retroOpen(y){if(!(S.me.retros||{})[y])return;RETRO={y,i:0};S.me.st.retro=1;render();retroTimer()}
function retroN(){const sn=S.me&&(S.me.retros||{})[RETRO&&RETRO.y];return sn?retroSlides(sn).length:0}
function retroTimer(){clearTimeout(RETROT);RETROT=setTimeout(()=>{if(!RETRO)return;if(RETRO.i<retroN()-1){RETRO.i++;render();retroTimer()}},6500)}
function retroNav(d){if(!RETRO)return;RETRO.i=clamp(RETRO.i+d,0,retroN()-1);render();retroTimer()}
function retroClose(){RETRO=null;clearTimeout(RETROT);save();render()}
function retroTap(e){if(e.target.closest&&e.target.closest('button'))return;retroNav(e.clientX<window.innerWidth*.3?-1:1)}
function retroView(){const sn=(S.me.retros||{})[RETRO.y];if(!sn){RETRO=null;return''}const sl=retroSlides(sn),i=Math.min(RETRO.i,sl.length-1);
 return `<div class="retro" onclick="retroTap(event)"><div class="rbars">${sl.map((_,j)=>`<i class="${j<i?'d':j===i?'a':''}"><b></b></i>`).join('')}</div><button class="rx" onclick="event.stopPropagation();retroClose()">✕</button><div class="rsl">${sl[i]}</div><div class="rhint">toque para avançar · lado esquerdo volta</div></div>`}
function retroListCard(){const R0=(S.me&&S.me.retros)||{},ys=Object.keys(R0).map(Number).sort((a,b)=>b-a);if(!ys.length)return'';return `<div class="card"><h3>🎬 Retrospectivas</h3><p class="xs mut" style="margin:-4px 0 8px">O resumo animado de cada temporada, com card para compartilhar.</p><div class="chips">${ys.map(y=>`<button onclick="retroOpen(${y})">${y}</button>`).join('')}</div></div>`}
function copyTxt(t,ok){try{navigator.clipboard.writeText(t).then(()=>{TOAST=ok||'Copiado.';render()},()=>{TOAST=t;render()})}catch(e){TOAST=t;render()}}

// placar entre amigos
const BKEY='breakpoint_board';let BOARDY=null;
function boardList(){try{return JSON.parse(localStorage.getItem(BKEY)||'[]')}catch(e){return[]}}
function boardAdd(){const c=document.getElementById('bdcode'),n=document.getElementById('bdname');const p=yrParse(c&&c.value);if(!p){TOAST='Código inválido. Confira as letras e os traços.';render();return}
 const L=boardList().filter(x=>x.code!==p.code);L.push({code:p.code,n:((n&&n.value)||'Amigo').trim().slice(0,20)||'Amigo'});try{localStorage.setItem(BKEY,JSON.stringify(L.slice(-40)))}catch(e){}S.me.st.board=1;BOARDY=p.y;TOAST='Placar adicionado.';save();render()}
function boardDel(code){try{localStorage.setItem(BKEY,JSON.stringify(boardList().filter(x=>x.code!==code)))}catch(e){}render()}
function boardHtml(){const m=S.me,mine=Object.values(m.retros||{}).sort((a,b)=>b.y-a.y);const fr=boardList().map(x=>({...x,...yrParse(x.code)})).filter(x=>x.y);
 const ys=[...new Set(mine.map(x=>x.y).concat(fr.map(x=>x.y)))].sort((a,b)=>b-a);const y=ys.includes(BOARDY)?BOARDY:ys[0];const my=mine.find(x=>x.y===y);
 const rows=(my?[{n:esc(m.name)+' (você)',sc:my.sc,rp:my.rp,t:my.tit.length,sd:sdTag(),me:1}]:[]).concat(fr.filter(x=>x.y===y).map(x=>({n:esc(x.n),sc:x.sc,rp:x.rp,t:x.t,sd:x.sd,code:x.code}))).sort((a,b)=>b.sc-a.sc);
 return `<div class="sec-t" style="margin-top:18px">🏁 Placar da temporada</div><p class="small mut" style="margin:0 0 8px">No fim de cada ano a retrospectiva gera um código com a sua pontuação. Troque códigos com amigos que jogam no mesmo mundo (mesmo código de mundo) e vejam quem fez a melhor temporada.</p>
 ${my?`<div class="row" style="gap:8px;align-items:center"><code style="flex:1;font-weight:800">${my.code}</code><button class="sec" onclick="copyTxt('${my.code}','Seu código foi copiado.')">Copiar</button></div>`:'<div class="xs mut">Seu código aparece no fim da primeira temporada.</div>'}
 ${ys.length>1?`<div class="chips" style="margin-top:8px">${ys.map(v=>`<button class="${v===y?'on':''}" onclick="BOARDY=${v};render()">${v}</button>`).join('')}</div>`:''}
 ${rows.length?`<div style="margin-top:8px">${rows.map((r,i)=>`<div class="spn"><b style="width:26px">${i<3?['🥇','🥈','🥉'][i]:i+1+'º'}</b><div style="flex:1;min-width:0"><b class="${r.me?'win':''}">${r.n}</b><div class="xs mut">${r.rp?'#'+r.rp:'s/ rank'} · ${r.t} título(s)${r.sd!==sdTag()?' · ⚠️ outro mundo ('+r.sd+')':''}</div></div><b>${r.sc}</b>${r.code?`<button class="ghost" onclick="boardDel('${r.code}')">✕</button>`:''}</div>`).join('')}</div>`:''}
 <div class="row" style="gap:8px;margin-top:10px"><input id="bdname" placeholder="Nome do amigo" maxlength="20" style="flex:1"><input id="bdcode" placeholder="Código" style="flex:1.4;text-transform:uppercase"></div><button class="sec full" style="margin-top:8px" onclick="boardAdd()">Adicionar ao placar</button>`}

// =============== v4.2: card de resultado para WhatsApp ===============
let EXPT=null,EXPFN=null,EXPTXT=null;
function fitFont(x,t,max,wt,fam,w){let s=max;x.font=`${wt} ${s}px ${fam}`;while(x.measureText(t).width>w&&s>20){s-=2;x.font=`${wt} ${s}px ${fam}`}return s}
function cardImg(sp){const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d'),FD='"Barlow Condensed","Inter Display",Arial',acc='#22e07a',gold='#ffd23f';
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1d0f38');g.addColorStop(.55,'#0b0614');g.addColorStop(1,'#07040e');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalAlpha=.07;x.strokeStyle='#fff';x.lineWidth=4;x.strokeRect(140,330,800,760);x.beginPath();x.moveTo(140,710);x.lineTo(940,710);x.moveTo(540,330);x.lineTo(540,1090);x.stroke();x.globalAlpha=1;
 x.fillStyle='#120a24';x.fillRect(0,0,W,120);x.fillStyle=acc;x.fillRect(0,118,W,4);x.font=`italic 900 66px ${FD}`;x.fillStyle='#fff';x.fillText('BREAK',50,84);const bw=x.measureText('BREAK').width;x.fillStyle=acc;x.fillText('POINT',50+bw,84);
 x.textAlign='right';x.font='800 28px Arial';x.fillStyle=gold;x.fillText(sp.tag||'',W-50,74);x.textAlign='center';
 x.fillStyle='#b9b2d6';fitFont(x,sp.kick,38,'800','Arial',W-120);x.fillText(sp.kick,W/2,210);
 x.fillStyle=sp.good?acc:'#ff5f7a';fitFont(x,sp.big,180,'900',FD,W-100);x.fillText(sp.big,W/2,380);
 let y=470;if(sp.p1){x.fillStyle='#fff';fitFont(x,sp.p1[0].toUpperCase(),72,'900',FD,W-120);x.fillText(sp.p1[0].toUpperCase(),W/2,y);x.font='30px Arial';x.fillStyle='#9d96bd';x.fillText(sp.p1[1],W/2,y+44);y+=110}
 if(sp.p2){x.font='800 30px Arial';x.fillStyle=gold;x.fillText('VS',W/2,y);y+=64;x.fillStyle='#e6e1ff';fitFont(x,sp.p2[0].toUpperCase(),56,'900',FD,W-120);x.fillText(sp.p2[0].toUpperCase(),W/2,y);x.font='28px Arial';x.fillStyle='#9d96bd';x.fillText(sp.p2[1],W/2,y+40);y+=90}
 if(sp.sets&&sp.sets.length){const n=sp.sets.length,bw2=150,gap=20,x0=W/2-(n*bw2+(n-1)*gap)/2;sp.sets.forEach((s,i)=>{const cx=x0+i*(bw2+gap),won=s[0]>s[1];x.fillStyle=won?acc:'#2a1f45';x.fillRect(cx,y,bw2,120);x.fillStyle=won?'#07140d':'#fff';x.font=`900 72px ${FD}`;x.fillText(`${s[0]}-${s[1]}`,cx+bw2/2,y+84);if(s[2]!=null){x.font='800 24px Arial';x.fillText(`(${s[2]})`,cx+bw2/2,y+112)}});y+=170}
 if(sp.cells){const n=sp.cells.length,cols=n>4?3:Math.min(4,n),cw=(W-100-(cols-1)*20)/cols;sp.cells.forEach(([v,l],i)=>{const cx=50+(i%cols)*(cw+20),cy=y+Math.floor(i/cols)*160;x.fillStyle='#1a1233';x.fillRect(cx,cy,cw,140);x.fillStyle=gold;x.fillRect(cx,cy,cw,6);x.fillStyle='#fff';fitFont(x,String(v),64,'900',FD,cw-20);x.fillText(String(v),cx+cw/2,cy+82);x.fillStyle='#9d96bd';x.font='24px Arial';x.fillText(l,cx+cw/2,cy+120)})}
 if(sp.note){x.fillStyle='#e6e1ff';fitFont(x,sp.note,40,'800','Arial',W-120);x.fillText(sp.note,W/2,1170)}
 if(sp.foot){x.fillStyle=gold;fitFont(x,sp.foot,40,'800','ui-monospace,monospace',W-100);x.fillText(sp.foot,W/2,1250)}
 x.fillStyle='#6f6890';x.font='24px Arial';x.fillText('Breakpoint · jogo de carreira de tênis',W/2,1310);
 EXPIMG=cv.toDataURL('image/png');EXPT=sp.title;EXPFN=sp.fn;EXPTXT=sp.txt;S.me.st.shared=1;save();render()}
function shareResult(){const L=LIVE;if(!L)return;const r=L.res,p=IDX.get(L.opp),m=S.me,T=S.tour,rr=T&&T.over?S.results[0]:null,champ=r.win&&rr&&rr.r==='Campeão';const a=r.st.a;
 cardImg({tag:CIRC(),kick:`${L.ev.name} · ${L.stage}`.toUpperCase(),big:champ?G('CAMPEÃO','CAMPEÃ'):r.win?'VITÓRIA':r.ret?'ABANDONO':'DERROTA',good:r.win,p1:[m.name,COUNTRIES[m.c][1]],p2:[p.n,COUNTRIES[p.c][1]+(RK.pro[p.id]?' · #'+RK.pro[p.id]:'')],sets:r.sets,cells:[[a.ace,'Aces'],[a.win,'Winners'],[`${a.bpw}/${a.bpo}`,'Break points'],[`${Math.floor(r.st.dur/60)}h${String(r.st.dur%60).padStart(2,'0')}`,'Duração']],title:'📲 Card do resultado',fn:'breakpoint_resultado.png',txt:`${champ?'🏆 ':'🎾 '}${m.name} ${r.win?'venceu':'perdeu para'} ${p.n} por ${scoreStr(r.sets)} em ${L.ev.name} (${L.stage}). #Breakpoint`})}
function shareRetro(y){const sn=(S.me.retros||{})[y];if(!sn)return;const b=sn.hxp?sn.rp:sn.rj;
 cardImg({tag:'RETROSPECTIVA',kick:`A TEMPORADA DE ${sn.n.toUpperCase()}`,big:String(sn.y),good:true,p1:[sn.n,`${COUNTRIES[sn.c][1]} · ${sn.age} anos`],cells:[[`${sn.W}-${sn.L}`,'Vitórias-derrotas'],[sn.tit.length,'Títulos'],[b?'#'+b:'—',sn.hxp?'Ranking final':'Ranking juvenil'],[sn.km?Math.round(sn.km/1000)+' mil':'—','km viajados'],[sn.bw?'#'+sn.bw.r:'—','Melhor vitória'],[sn.sc,'Pontos no ano']],note:retroVerdict(sn),foot:sn.code,title:'📲 Card da temporada',fn:`breakpoint_${sn.y}.png`,txt:`🎬 Minha temporada ${sn.y} no Breakpoint: ${sn.W}-${sn.L}, ${sn.tit.length} título(s), ${sn.sc} pontos. Código para comparar: ${sn.code}`})}
function expShare(){const go2=b=>{const f=new File([b],EXPFN||'breakpoint.png',{type:'image/png'});try{if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:EXPTXT||''}).catch(()=>{});return}}catch(e){}if(DLNS){DLNS.save({filename:EXPFN||'breakpoint.png',data:b}).then(()=>{TOAST='Imagem salva. Agora é só mandar no WhatsApp.';render()}).catch(()=>{});return}if(EXPTXT)copyTxt(EXPTXT,'Texto copiado. Baixe a imagem e envie junto no WhatsApp.');else{TOAST='Toque em Baixar e envie a imagem pelo WhatsApp.';render()}};
 try{fetch(EXPIMG).then(r=>r.blob()).then(go2).catch(()=>{TOAST='Toque em Baixar e envie a imagem pelo WhatsApp.';render()})}catch(e){}}

// =============== v4.2: copa por países (duplas) ===============
function dvDblToggle(){const on=S.dv&&S.dv.dbl;return `<label class="row small" style="gap:8px;margin-top:8px;cursor:pointer"><input type="checkbox" style="width:auto" ${on?'checked':''} onchange="S.dv.dbl=this.checked;save();render()"> Jogar também as duplas (mais chance de vencer o confronto, −4 de energia)</label>`}

// =============== v4.2: novas conquistas ===============
ACH.push(
 ['bigw','🎯','Gigante abatido','Vença um top 10',m=>!!m.st.b10],['kingw','👊','Derrubou o rei','Vença o número 1 do mundo',m=>!!m.st.b1],
 ['homet','🏠','Campeão em casa','Ganhe um título no seu país',m=>(m.st.homeT||0)>=1],['world','✈️','Volta ao mundo','Jogue em 15 países diferentes',m=>(m.st.ctry||[]).length>=15],
 ['miles','🛫','Milhas de ouro','Viaje 250 mil km na carreira',m=>(m.st.km||0)>=250000],['rainw','🌧️','Dança na chuva','Vença uma partida interrompida pela chuva',m=>(m.st.rainW||0)>=1],
 ['press','🎤','Queridinho da imprensa','Responda 15 perguntas em coletivas',m=>(m.st.press||0)>=15],['rev','🔁','Revanche','Vença o rival depois de perder uma final para ele',m=>(m.st.rev||0)>=1],
 ['bagel','🥯','Pneu','Vença um set por 6-0',m=>!!m.st.bagel],['tb3','🧠','Nervos de aço','Vença 3 tie-breaks numa partida',m=>!!m.st.tb3],['cb','💫','Virada','Vença depois de perder o primeiro set',m=>!!m.st.cb],
 ['stk10','📈','Embalado','10 vitórias seguidas',m=>(m.st.stkB||0)>=10],['hero','🛡️','Herói da pátria','Vença 5 partidas pela seleção',m=>(m.st.teamW||0)>=5],
 ['retro','🎬','Retrospectiva','Veja a retrospectiva de uma temporada',m=>!!m.st.retro],['share','📲','Viralizou','Gere um card para compartilhar',m=>!!m.st.shared],['board','🤝','Desafio aceito','Compare o placar da temporada com um amigo',m=>!!m.st.board],
 ['cm1','🧑‍🏫','Mentor','Tenha um aluno além do atleta principal',m=>!!(S.cm&&(S.cm.pupN||0)>=1)],['cmteam','👥','Equipe completa','Treine 3 atletas ao mesmo tempo',m=>!!(S.cm&&cmPups().length>=CMMAX)],
 ['cmy','🏅','Treinador do Ano','Ganhe o prêmio de Treinador do Ano',m=>!!(S.cm&&(S.cm.awards||[]).length)],['cmback','🔄','Volta por cima','Recomece com outro atleta depois de uma demissão',m=>!!(S.cm&&(S.cm.backs||0)>=1)],
 ['cmacad','🏟️','Centro de excelência','Construa a academia de alto rendimento',m=>!!(S.cm&&(S.cm.acad||0)>=3)],['cmpt','🎓','Formador de campeões','Um aluno seu ganha um título',m=>!!(S.cm&&(S.cm.pupT||0)>=1)]);
Object.assign(RARE,{bigw:1,kingw:2,homet:1,world:1,miles:2,rainw:1,press:1,rev:2,bagel:0,tb3:2,cb:1,stk10:1,hero:2,retro:0,share:0,board:0,cm1:1,cmteam:2,cmy:2,cmback:1,cmacad:2,cmpt:2});

// =============== v4.2: ganchos ===============
{const _af=applyFx;applyFx=function(fx){_af(fx);if(!fx)return;try{if(fx.cmPup!=null)cmAddPup(fx.cmPup);if(fx.cmNew!=null)cmTake(fx.cmNew);if(fx.cmQuit)cmQuit(fx.cmQuit);if(fx.retro!=null)setTimeout(()=>retroOpen(fx.retro),0)}catch(e){console.error(e)}}}
{const _ft=fxText;fxText=function(fx){let t=_ft(fx);if(fx&&fx.cmT&&Math.abs(fx.cmT)>1)t+=(t?' · ':'')+`${fx.cmT>0?'+':''}${fx.cmT} confiança no treinador`;return t}}
{const _cw=cmWeek;cmWeek=function(){_cw();try{if(S.cm&&!S.ended)cmPupWeek()}catch(e){console.error(e)}}}
{const _cc=cmCard;cmCard=function(){return _cc()+cmTeamCard()}}
{const _rc=recChamp;recChamp=function(ev,id,y){_rc(ev,id,y);try{if(y==null&&S.cm&&id!=null&&id!=='me'){const x=(S.cm.pup||[]).find(q=>q.id===id);if(x){const t=TIERS[ev.tier];x.t=(x.t||0)+1;S.cm.pupT=(S.cm.pupT||0)+1;const yy=year();S.cm.pty=S.cm.pty||{};S.cm.pty[yy]=(S.cm.pty[yy]||0)+1;const b=Math.round(1500*Math.max(.3,t.w||1));S.cm.wallet+=b;news(`🏆 Seu aluno ${x.n} foi campeão de ${ev.name}! Bônus de ${money(b)} para você.`)}}}catch(e){}}}
{const _sa=seasonAwards;seasonAwards=function(){let h=_sa();try{const c=S.cm;if(c){const y=year(),s0=S.season||{},rp=myRank('pro'),res=S.results.filter(r=>r.y===y&&r.r==='Campeão');let sc=0;if(rp&&rp<=10)sc+=3;if(res.some(r=>r.tier==='GS'))sc+=4;if(s0.rp&&rp&&rp<=150&&rp<s0.rp*.55)sc+=2;sc+=Math.min(3,res.length*.6);sc+=1.5*((c.pty||{})[y]||0);
 const win=sc>=3.5&&R()<Math.min(.7,.2+sc*.08);const oth=pick((S.coaches||[]).filter(x=>x.q>=4))||{n:'—',c:0};
 if(win){(c.awards=c.awards||[]).push(y);c.wallet+=25000;hl(`🏅 Treinador do Ano ${y}: ${c.n}`);news(`🏅 ${c.n} é eleit${G('o','a')} Treinador do Ano ${y}! Prêmio de ${money(25000)}.`);addPost({a:MEDIA[0][0],h:MEDIA[0][1],t:`🏅 Treinador do Ano ${y}: ${c.n}, o nome por trás da temporada de ${S.me.name}.`,k:'md'})}
 h+=`<div class="small ${win?'win':''}">🧑‍🏫 Treinador do ano: ${win?'<b>você!</b>':flag(oth.c)+' '+esc(oth.n)}</div>`}}catch(e){console.error(e)}return h}}
{const _ss=seasonSummary;seasonSummary=function(){_ss();try{const sn=retroSnap();const md=S.modals.filter(x=>x.k==='Resumo da temporada').pop();if(md&&sn)md.o.unshift({l:'🎬 Ver a retrospectiva do ano',t:'Seu ano em telas animadas, com card para compartilhar',fx:{retro:sn.y}})}catch(e){console.error(e)}}}
{const _ny=newYear;newYear=function(){_ny();try{const c=S.cm;if(c&&!S.ended&&!c.fired&&c.born!=null){const a=ageOf(c);if(a>=70){c.fired='cmapos';endCareer('cmapos')}else if(a===69)news(`⏳ ${c.n} completa 69 anos: esta deve ser a última temporada como treinador.`)}}catch(e){console.error(e)}}}
{const _ec=endCareer;endCareer=function(why){_ec(why);try{if(S.cm){S.cm.final=1;cmArchive(S.me);S.endHtml=(S.endHtml||'')+cmLegacyHtml()}}catch(e){console.error(e)}}}
{const _ta=tripAdd;tripAdd=function(o){_ta(o);try{const st=S.me.st;st.km=(st.km||0)+(o.km||0);if(!o.home&&o.bi!=null){st.ctry=st.ctry||[];if(!st.ctry.includes(o.bi))st.ctry.push(o.bi)}}catch(e){}}}
{const _ch=champion;champion=function(ev){try{const m=S.me;if(ev.tier!=='EXH'&&ev.iso===COUNTRIES[m.c][0])m.st.homeT=(m.st.homeT||0)+1}catch(e){}return _ch(ev)}}
{const _mu=matchUp;matchUp=function(a,b,log,host){const r=_mu(a,b,log,host);if((a==='me'||b==='me')&&(a==='me'?r:!r))S.me.st.teamW=(S.me.st.teamW||0)+1;return r}}
{const _ef=eff;eff=function(id,surf,tac,opp){const A=_ef.apply(this,arguments);if(id==='me'&&opp!=null&&opp===S.rival&&S.rvRev&&A){A.sv+=.4;A.rt+=.4}return A}}
{const _um=userMatch;userMatch=function(opp,ev,bo5,stage,pre){const rvB=S.rvRev,ork=RK.pro[opp]||null;const res=_um.apply(this,arguments);try{const m=S.me,st=m.st,p=IDX.get(opp),t=TIERS[ev.tier];
 if(!pre){const cl=climateOf(ev,S.w);if(cl!=='indoor'&&R()<(ev.surf==='hard'?.03:.06)){res.rained=1;res.rainNext=R()<.35?1:0;news(`🌧️ A chuva interrompeu sua partida contra ${p.n} em ${ev.name}${res.rainNext?'. O jogo só terminou no dia seguinte':''}.`)}}
 if(res.rained&&res.win)st.rainW=(st.rainW||0)+1;
 if(res.win&&t.cat==='pro'&&ork){if(ork<=10)st.b10=1;if(ork===1)st.b1=1}
 if(res.win&&res.sets){if(res.sets.some(s=>s[0]===6&&s[1]===0))st.bagel=1;if(res.sets.filter(s=>s[2]!=null&&s[0]>s[1]).length>=3)st.tb3=1;if(res.sets.length&&res.sets[0][0]<res.sets[0][1])st.cb=1}
 if(opp===S.rival&&p){if(!res.win&&stage==='Final'){S.rvRev={w:S.w,e:ev.name};news(`⚔️ ${p.n} venceu você na final de ${ev.name}. A imprensa já fala em revanche.`)}
  else if(res.win&&rvB){st.rev=(st.rev||0)+1;S.rvRev=null;S.heat=clamp(S.heat+10,0,100);res.revTxt=rvB.e;hl(`🔁 Revanche contra ${p.n} em ${ev.name}`);news(`🔁 REVANCHE! ${m.name} devolve a derrota da final de ${rvB.e} e vence ${p.n} em ${ev.name}.`);addPost({a:MEDIA[1][0],h:MEDIA[1][1],t:`🔁 Revanche servida! ${m.name} ${flag(m.c)} bate ${p.n} ${flag(p.c)} em ${ev.name}: ${scoreStr(res.sets)}.`,k:'md'})}
  if(res.win&&stage==='Final')hl(`⚔️ Venceu o rival ${p.n} na final de ${ev.name}`)}}catch(e){console.error(e)}return res}}
{const _xc=exportCard;exportCard=function(){EXPT=null;EXPFN=null;EXPTXT=null;return _xc()}}
{const _chv=chView;chView=function(){const h=_chv();try{return h.replace(/<\/div><\/div>\s*$/,boardHtml()+'</div></div>')}catch(e){return h}}}
