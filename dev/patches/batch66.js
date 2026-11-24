// =============== v5.7: regras oficiais (ranking com melhores resultados, zero obrigatório, tiebreak de 10, marcação eletrônica) ===============
const V5BEST=18;
function v5PK(ev){if(!ev)return'O';const t=ev.tier,n=(ev.name||'')+' '+(ev.city||'');if(t==='GS')return'G';if(t==='FIN')return'F';if(TIERS[t]&&TIERS[t].cat==='jr')return'J';
 if(t==='M1000'){if(CIRC()==='WTA')return/Doha|Qatar|Dubai|Wuhan/i.test(n)?'N':'M';return/Monte/i.test(n)?'O':'M'}return'O'}
const v5CurEv=()=>{try{return S.tour?weekEvents(S.w).find(e=>e.key===S.tour.key)||null:null}catch(e){return null}};
// marca cada resultado com o tipo de torneio
{const _a=award;award=function(id,t,idx){let arr=null;try{arr=id==='me'?(t.cat==='pro'?S.me.ptsPro:S.me.ptsJr):(id!=null&&IDX.get(id)?IDX.get(id).pts:null)}catch(e){}const n0=arr?arr.length:0;const r=_a(id,t,idx);
 try{if(arr&&arr.length>n0){const e=arr[arr.length-1];if(e.length<3){const ev=(id==='me'?v5CurEv():null)||CUR_EV;e.push(t.cat==='jr'?'J':v5PK(ev))}}}catch(e){}return r}}
// ranking: Slams + obrigatórios + melhores resultados até 18 (ATP Finals/WTA Finals como bônus)
function v5Split(a){const lo=S.w-53,B={G:[],M:[],N:[],F:[],O:[],J:[]};for(const e of a||[]){if(e[0]<=lo)continue;(B[e[2]]||B.O).push(e)}return B}
function v5Count(a){const B=v5Split(a),W=CIRC()==='WTA',d=x=>x.slice().sort((p,q)=>q[1]-p[1]);const used=[],out=[];
 if(B.J.length&&!B.G.length&&!B.M.length){return{used:B.J.concat(B.O),out:[],tot:[...B.J,...B.O].reduce((s,e)=>s+e[1],0),fin:0,mand:0}}
 B.G.forEach(e=>used.push(e));let other=B.O.slice();
 if(W){const m=d(B.M);m.slice(0,6).forEach(e=>used.push(e));other.push(...m.slice(6));const n=d(B.N);if(n.length){used.push(n[0]);other.push(...n.slice(1))}}
 else B.M.forEach(e=>used.push(e));
 const mand=used.length,free=Math.max(0,V5BEST-mand);other=d(other);other.slice(0,free).forEach(e=>used.push(e));out.push(...other.slice(free));
 const fin=B.F.reduce((s,e)=>s+e[1],0);return{used,out,tot:used.reduce((s,e)=>s+e[1],0)+fin,fin,mand}}
sumPts=function(a){return v5Count(a).tot};
// zero obrigatório: top 30 que falta a um Masters/WTA 1000 obrigatório sem lesão
{const _ew=endWeek;endWeek=function(){try{const m=S.me;if(m&&!S.ended&&isPro()&&typeof v5Commit==='function'&&v5Commit()&&S._zw!==S.w&&S._pw!==S.w&&!(m.injury>0)&&S.busy!==S.w){const md=weekEvents(S.w).find(e=>v5Mand(e)&&e.tier!=='GS');if(md){S._zw=S.w;(m.ptsPro=m.ptsPro||[]).push([S.w,0,v5PK(md)]);news(`Zero no ranking: faltar ao ${md.name} conta como um resultado de 0 ponto pelos próximos 12 meses.`)}}}catch(e){}return _ew()}}
// quadro "como seu ranking conta"
function v5RankBox(){try{if(RKTAB!=='pro'||!isPro())return'';const c=v5Count(S.me.ptsPro),W=CIRC()==='WTA',B=v5Split(S.me.ptsPro);const sm=k=>B[k].reduce((s,e)=>s+e[1],0);
 const gs=sm('G'),ms=c.used.filter(e=>e[2]==='M'||e[2]==='N').reduce((s,e)=>s+e[1],0),ot=c.used.filter(e=>e[2]!=='G'&&e[2]!=='M'&&e[2]!=='N').reduce((s,e)=>s+e[1],0),nO=c.used.filter(e=>e[2]!=='G'&&e[2]!=='M'&&e[2]!=='N').length;
 const lost=c.out.reduce((s,e)=>s+e[1],0);
 return `<div class="card v5rkbox"><div class="sec-t" style="margin:0 0 6px">Como o seu ranking conta</div><p class="xs mut" style="margin:0 0 8px">Valem os ${V5BEST} melhores resultados dos últimos 12 meses. Os 4 Slams${W?', os 6 melhores WTA 1000 principais e o melhor dos outros WTA 1000':' e os 8 Masters 1000 obrigatórios'} sempre entram, mesmo quando o resultado é fraco ou zero. ${W?'O WTA Finals':'O ATP Finals'} soma como bônus.</p>
 <div class="v5rkg"><div><b>${fmt(gs)}</b><span>Slams (${B.G.length})</span></div><div><b>${fmt(ms)}</b><span>${W?'WTA 1000':'Masters'} (${c.used.filter(e=>e[2]==='M'||e[2]==='N').length})</span></div><div><b>${fmt(ot)}</b><span>Outros (${nO} de ${Math.max(0,V5BEST-c.mand)})</span></div>${c.fin?`<div><b>${fmt(c.fin)}</b><span>Finals</span></div>`:''}</div>
 ${c.out.length?`<p class="xs mut" style="margin:8px 0 0">${c.out.length} resultado(s) ficaram de fora por não estarem entre os melhores (${fmt(lost)} pts).</p>`:''}</div>`}catch(e){return''}}
{const _rv=rankView;rankView=function(){let s=_rv();try{if(RKTAB==='pro'||!RKTAB){const b=v5RankBox();if(b){const i=s.indexOf('<div class="card">');if(i>=0)s=s.slice(0,i)+b+s.slice(i)}}}catch(e){}return s}}
// tiebreak de 10 pontos no set decisivo dos Grand Slams
const v5Tb10=sets=>{try{const ev=(IM&&IM.ev)||v5CurEv()||CUR_EV;return!!ev&&(ev.tier==='GS'||ev.tier==='JGS')&&sets}catch(e){return false}};
// marcação: eletrônica (sem desafio), juiz de linha no saibro (árbitro confere a marca) ou sem revisão
function v5Lines(ev){ev=ev||(IM&&IM.ev);if(!ev)return'elc';const t=ev.tier,n=ev.name||'',W=CIRC()==='WTA';
 if(/Roland/i.test(n))return'mark';
 if(['GS','FIN','M1000','A500','OLY','EXH'].includes(t))return'elc';
 if(t==='A250')return W?(ev.surf==='clay'?'mark':'none'):'elc';
 return ev.surf==='clay'?'mark':'none'}
{const _cv=courtView;courtView=function(){let s=_cv();try{const I=IM;if(I&&I.chal){s=s.replace('Desafios restantes neste set: '+I.ch.n,'No saibro, o árbitro desce e confere a marca da bola.').replace('🦅 Pedir desafio','Pedir para ver a marca').replace(/(<button )disabled( onclick="imChallenge\(true\)")/,'$1$2')}}catch(e){}return s}}
{const _ic=imChallenge;imChallenge=function(go){const I=IM;if(I&&I.ch)I.ch.n=Math.max(I.ch.n,1);_ic(go);try{if(I&&I.feed&&I.feed[0]){I.feed[0]=I.feed[0].replace('🦅 DESAFIO CORRETO! A bola foi fora. O ponto é seu.','O árbitro confere a marca: fora! O ponto é seu.').replace(/🦅 Desafio perdido: a bola pegou na linha\. Restam \d+ neste set\./,'O árbitro confere a marca: a bola pegou na linha. Ponto mantido.');if(I.last&&I.last.txt)I.last.txt=I.last.txt.replace('🦅 Desafio correto: ponto seu!','Marca conferida: ponto seu!')}if(I&&I.ch)I.ch.n=99}catch(e){}if(IM)render()}}
