// =============== v5.9: rivalidades com história ===============
function v5RvMeets(id){return S.hist.filter(h=>h.o===id&&h.tier!=='TEAM')}
const V5BIG=['GS','M1000','FIN','OLY','JGS'];
function v5RvLine(id){const p=IDX.get(id);if(!p)return'';const [w,l]=h2h(id),M=v5RvMeets(id),last=M[0],fin=M.filter(h=>h.rd==='Final'),n=w+l;
 if(!n)return `${esc(p.n)} ainda não cruzou com você. A imprensa trata o primeiro encontro como questão de tempo.`;
 const lead=w>l?`Você lidera por ${w} a ${l}`:l>w?`${esc(p.n)} lidera por ${l} a ${w}`:`Empate em ${w} a ${l}`;
 let s=`${lead} em ${n} confronto${n>1?'s':''}`;if(fin.length)s+=`, com ${fin.length} final${fin.length>1?'is':''} entre vocês`;s+='.';
 if(last)s+=` Último encontro: ${last.win?'vitória sua':'vitória dele'} ${last.s?'por '+last.s:''} em ${esc(last.e)} (${esc(last.rd)}).`;
 let st=0;for(const h of M){if(st===0)st=h.win?1:-1;else if((st>0)!==h.win)break;else st+=st>0?1:-1}
 if(Math.abs(st)>=3)s+=st>0?` Você vem de ${st} vitórias seguidas sobre ${esc(p.n)}.`:` ${esc(p.n)} vem de ${-st} vitórias seguidas sobre você.`;return s}
function v5RvTimeline(id,max){const M=v5RvMeets(id).slice(0,max||12);if(!M.length)return'';
 return `<div class="v5rvt">${M.map(h=>`<div class="v5rvi ${h.win?'w':'l'}${h.rd==='Final'||V5BIG.includes(h.tier)?' top':''}"><span class="v5rvd">${h.win?'V':'D'}</span><div><b>${esc(h.e)}</b><span>${esc(h.rd||'')} · ${yearOfW(h.w)}${h.s?' · '+esc(h.s):''}</span></div></div>`).join('')}</div>`}
const yearOfW=w=>year()-Math.floor(S.w/52)+Math.floor(w/52);
function v5RvCompare(id){const p=IDX.get(id),m=S.me;if(!p)return'';const pt=(p.titles||[]).length||((p.st&&p.st.titles)||[]).length||0,mt=m.st.titles.length+m.st.jrTitles.length;
 const pb=p.best||null,rk=RK.pro[id]||RK.jr[id]||null,my=myRank('pro')||myRank('jr');
 return `<div class="v5rvc"><div><b>${my?'#'+my:'–'}</b><span>você</span></div><div class="v5rvx">ranking</div><div><b>${rk?'#'+rk:'–'}</b><span>${esc(p.n.split(' ')[0])}</span></div></div>`}
function v5RivalBlock(id,full){const p=IDX.get(id);if(!p)return'';const heat=Math.round(S.heat||0);
 return `<div class="card v5rvb"><div class="row sb"><div class="mk" style="color:#ff8a65">⚔️ Rivalidade${id===S.rival?'':' antiga'}</div>${id===S.rival?`<span class="xs mut">${heat>=70?'🔥 em brasa':heat>=40?'esquentando':'morna'}</span>`:''}</div>
 <p class="small" style="margin:6px 0 10px;line-height:1.45">${v5RvLine(id)}</p>${v5RvCompare(id)}${v5RvTimeline(id,full?20:6)}</div>`}
// histórico de rivais: arquiva quando o rival muda
{const _ew=endWeek;endWeek=function(){try{if(S&&S.me){S.rivLog=S.rivLog||[];if(S._rvPrev!=null&&S._rvPrev!==S.rival){const p=IDX.get(S._rvPrev);if(p){const [w,l]=h2h(p.id);if(w+l>0&&!S.rivLog.some(x=>x.id===p.id))S.rivLog.unshift({id:p.id,n:p.n,c:p.c,w,l,to:year()})}}S._rvPrev=S.rival}}catch(e){}return _ew()}}
// carta do jogador: história completa do confronto
{const _pc=pcardView;pcardView=function(){let s=_pc();try{const p=IDX.get(PCARD);if(!p)return s;const M=v5RvMeets(p.id);if(p.id!==S.rival&&M.length<2)return s;const blk=v5RivalBlock(p.id,1);
  const k=s.lastIndexOf('</div></div>');s=k>0?s.slice(0,k)+blk+s.slice(k):s+blk}catch(e){console.error(e)}return s}}
// aba Carreira: rival atual e rivais antigos
{const _pv=profileView;profileView=function(){let s=_pv();try{if(PROFTAB!=='career')return s;let h='';if(S.rival!=null&&IDX.get(S.rival))h+=v5RivalBlock(S.rival,0);
  const old=(S.rivLog||[]).filter(x=>x.id!==S.rival);if(old.length)h+=`<div class="card"><div class="mk">Rivais da carreira</div>${old.map(x=>`<div class="row sb small" style="padding:6px 0;border-bottom:1px solid var(--line);cursor:pointer" onclick="openP(${x.id})"><span>${flag(x.c)} ${esc(x.n)}</span><span class="mut">${x.w}–${x.l} · até ${x.to}</span></div>`).join('')}</div>`;
  s+=h}catch(e){console.error(e)}return s}}
// dia de jogo contra o rival: manchete
function v5RvHeadline(opp,stage){const p=IDX.get(opp);if(!p)return'';const [w,l]=h2h(opp),ev=curEv(),big=ev&&V5BIG.includes(ev.tier);
 const H=[];if(stage==='Final')H.push(big?`A final que todo mundo queria: ${esc(p.n)} de novo, agora valendo um título grande.`:`Final contra ${esc(p.n)}. O troféu tem dono certo: um de vocês dois.`);
 else if(w+l===0)H.push(`Primeiro capítulo: você e ${esc(p.n)} se enfrentam pela primeira vez.`);
 else if(l>w+1)H.push(`${esc(p.n)} tem ${l} vitórias contra ${w}. Hora de virar essa história.`);
 else if(w>l+1)H.push(`Você domina o confronto (${w} a ${l}). ${esc(p.n)} chega querendo revanche.`);
 else H.push(`Confronto equilibrado (${w} a ${l}). Quem vencer hoje assume a frente.`);
 return `<div class="card v5rvh"><div class="mk" style="color:#ff8a65">⚔️ Clássico</div><p style="margin:6px 0 0;font-weight:700;line-height:1.4">${H[0]}</p><p class="small mut" style="margin:6px 0 0">${v5RvLine(opp)}</p></div>`}
{const _vm=v5Match;v5Match=function(){let s=_vm();try{const opp=oppOf();if(opp!==S.rival)return s;const T=S.tour,stage=T&&!T.q?roundName(T.br.length):'';const h=v5RvHeadline(opp,stage);const i=s.indexOf('<div class="v5vss">');s=i>0?s.slice(0,i)+h+s.slice(i):h+s}catch(e){}return s}}
// depois do jogo contra o rival: manchete no noticiário
{const _r=render;render=function(){try{if(S&&S.hist&&S.hist[0]){const h=S.hist[0];if(h.rv&&!h.rvN){h.rvN=1;const p=IDX.get(h.o);if(p){const [w,l]=h2h(h.o);const fin=h.rd==='Final';
  const t=h.win?(fin?`🏆⚔️ ${S.me.name} vence ${p.n} na final de ${h.e} e ${w>l?`abre ${w} a ${l} no confronto`:w===l?`empata o clássico em ${w} a ${l}`:`diminui a diferença para ${w} a ${l}`}.`:w===l?`⚔️ Tudo igual: ${S.me.name} bate ${p.n} e empata o confronto em ${w} a ${l}.`:`⚔️ ${S.me.name} vence ${p.n} em ${h.e} (${h.s}). Confronto: ${w} a ${l}.`)
   :(fin?`⚔️ ${p.n} vence a final de ${h.e} contra ${S.me.name}. Confronto: ${w} a ${l}.`:`⚔️ ${p.n} leva a melhor em ${h.e} (${h.s}). Confronto: ${w} a ${l}.`);news(t);if(fin)S.heat=clamp((S.heat||0)+8,0,100)}}}}catch(e){}return _r.apply(this,arguments)}}
