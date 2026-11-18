// =============== v5.7: cada torneio com a sua cara (velocidade da quadra, calor, cores, torcida) ===============
// velocidade aproximada de cada quadra (positivo = mais rápida); valores de referência, não oficiais
const V5PACE={'Xangai':.010,'Cincinnati':.010,'Turim':.010,'Madri':.008,'Basileia':.008,'Viena':.008,'Roterdã':.008,'Dubai':.008,'Doha':.006,'Halle':.006,'Tóquio':.006,'Dallas':.006,'Acapulco':.006,'Gstaad':.005,'Kitzbühel':.005,'Brisbane':.005,'Toronto':.004,'Montreal':.004,'Nova York':.004,'Melbourne':.003,
 'Indian Wells':-.010,'Monte Carlo':-.010,'Rio de Janeiro':-.008,'Barcelona':-.006,'Buenos Aires':-.006,'Marrakech':-.004,'Roma':-.004,'Hamburgo':-.004,'Umag':-.004,'Miami':-.004,'Santiago':-.003,'Pequim':-.002};
function v5PaceOf(ev){if(!ev)return 0;if(/Paris Masters/i.test(ev.name||''))return .010;if(/Roland/i.test(ev.name||''))return -.003;if(ev.city==='Londres'&&ev.surf==='grass')return .006;return V5PACE[ev.city]||0}
const v5PaceTxt=d=>d>=.006?'Quadra rápida':d<=-.006?'Quadra lenta':'Quadra de velocidade média';
const v5EvNow=()=>{try{return(IM&&IM.ev)||CUR_EV||null}catch(e){return null}};
{const _b=v5B0;v5B0=function(A){return _b(A)+v5PaceOf(v5EvNow())}}
{const _a=v5Ac;v5Ac=function(x){return _a(x)*(1+v5PaceOf(v5EvNow())*25)}}
// pausa de calor: 10 minutos antes do set decisivo em melhor de 3
{const _sb=setBreak;setBreak=function(){_sb();try{const I=IM,E=I.E;if(!I.heatB&&E.need===2&&E.sets.length===2&&E.sa===1&&E.sb===1&&climateOf(I.ev,S.w)==='quente'&&!I.covered&&!(I.roof&&I.rained)){I.heatB=1;S.me.energy=clamp(S.me.energy+8,0,100);E.run=0;I.feed.unshift('🌡️ Pausa de calor: 10 minutos para se refrescar, trocar de roupa e ouvir o treinador antes do set decisivo.')}}catch(e){}}}
// cores das quadras de alguns torneios na partida em tempo real
const V5CCOL={'US Open':['#3b6db4','#2f6e47'],'Australian Open':['#2f7fd0','#1a4f9a'],'Miami Open':['#2f7fd0','#1a3f78']};
{const _bb=v5BgBuild;v5BgBuild=function(W,H,dpr,ev,P,top){const cc=V5CCOL[ev.name],old=SURFC.hard;if(cc&&ev.surf==='hard')SURFC.hard=cc;let r;try{r=_bb(W,H,dpr,ev,P,top)}finally{SURFC.hard=old}
 try{const iso=COUNTRIES[S.me.c][0];if(ev.iso===iso){const fl=isoFlag(iso),R2=seeded(W*7+H);for(const c of r.img.slice(0,2)){const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.font=`${Math.round(11*W/360)}px sans-serif`;g.textAlign='center';for(let i=0;i<14;i++){const x=12+R2()*(W-24),y=6+R2()*(r.wallB-34);g.fillText(fl,x,y)}}}}catch(e){}return r}}
// condições na tela da partida
function v5CondTags(ev){const L=[],pc=v5PaceOf(ev),cl=climateOf(ev,S.w),ln=v5Lines(ev),iso=COUNTRIES[S.me.c][0];
 L.push(`<span class="v5t n">${v5PaceTxt(pc)}</span>`);
 if(cl==='altitude')L.push('<span class="v5t n">Altitude: a bola voa mais</span>');if(cl==='indoor')L.push('<span class="v5t n">Coberto: sem vento nem sol</span>');
 if(cl==='quente')L.push('<span class="v5t b">Calor: pausa de 10 min antes do set decisivo</span>');if(cl==='frio')L.push('<span class="v5t n">Frio: bola mais pesada</span>');
 L.push(`<span class="v5t n">${ln==='elc'?'Marcação eletrônica':ln==='mark'?'Juízes de linha · o árbitro confere a marca':'Sem revisão de bola'}</span>`);
 if(ev.tier==='GS')L.push('<span class="v5t n">Set decisivo com tiebreak de 10</span>');
 if(ev.iso===iso)L.push('<span class="v5t g">Torcida a seu favor</span>');
 return `<div class="v5tags" style="margin:6px 0 2px">${L.join('')}</div>`}
{const _m=v5Match;v5Match=function(){let s=_m();try{const ev=curEv();if(ev){const i=s.indexOf('</section>');if(i>=0)s=s.slice(0,i)+v5CondTags(ev)+s.slice(i)}}catch(e){}return s}}
