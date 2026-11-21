// =============== v5.9: metas da temporada — conversa de meio de ano com o treinador ===============
{const _af=applyFx;applyFx=function(fx){_af(fx);try{if(fx&&fx.v5g){const m=S.me,g=(S.goals||[]).find(x=>x.k==='rank');
 if(fx.v5g==='focus'){m.money-=fx.cost||0;S.v5gF=S.w+8;news('🎯 Bloco de treino focado nas metas: 8 semanas de treino mais eficiente.')}
 if(fx.v5g==='lower'&&g){g.v=niceN(g.v*1.5);g.t=`Terminar o ano no top ${g.v} do ranking ${g.cat==='pro'?CIRC():'juvenil'}`;g.rew='+3 confiança';g.low=1;m.conf=clamp((m.conf??50)+3,10,95)}
 if(fx.v5g==='keep'){m.conf=clamp((m.conf??50)+(fx.conf||0),10,95)}}}catch(e){}}}
// bloco focado: treino rende mais
{const _tr=train;train=function(){const r=_tr.apply(this,arguments);try{if(S.v5gF&&S.w<=S.v5gF){const a=S.me.attrs,k=pick(['sv','rt','fi','me']);a[k]=clamp(a[k]+.12,0,99)}}catch(e){}return r}}
// conversa no meio da temporada (semana 26) e alerta na reta final (semana 40)
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{const wk=S.w%52;if(!S.goals||S.ended)return r;S.v5gc=S.v5gc||{};const key=year()+'-'+wk;
 if(wk===26&&!S.v5gc[key]){S.v5gc[key]=1;const c=myCoach(),who=c?esc(c.n):'Sua equipe';const P=S.goals.map(g=>({g,pr:goalProg(g)}));const ok=P.filter(x=>x.pr.ok).length,gR=P.find(x=>x.g.k==='rank');
  const html=`<p class="small mut" style="margin:0 0 8px">${who} chamou você para conversar sobre a temporada.</p>${P.map(x=>`<div class="small" style="margin:4px 0">${x.pr.ok?'✅':'⏳'} ${esc(x.g.t)} <span class="mut">(${x.pr.txt})</span></div>`).join('')}<p class="small" style="margin:10px 0 0">${ok>=2?'"Metade do ano e estamos no caminho. Não é hora de relaxar."':gR&&!gR.pr.ok&&gR.pr.p<.6?'"A meta de ranking ficou longe. Ou a gente aperta o treino, ou ajusta o alvo."':'"Dá para chegar lá, mas o segundo semestre precisa ser melhor."'}</p>`;
  const cost=Math.max(3000,Math.round((S.me.money||0)*.04/500)*500);
  S.modals.push({k:'Conversa de meio de temporada',e:'🎯',ti:'Conversa de meio de temporada',q:'',html,o:[
   {l:'Manter o plano',t:'Seguir como está. Confiança se a fase é boa.',fx:{v5g:'keep',conf:ok>=2?4:0}},
   {l:`Bloco de treino focado (${money(cost)})`,t:'8 semanas de treino mais eficiente.',fx:{v5g:'focus',cost}},
   ...(gR&&!gR.pr.ok&&!gR.g.low?[{l:'Ajustar a meta de ranking',t:'Alvo mais realista, recompensa menor.',fx:{v5g:'lower'}}]:[])]})}
 if(wk===40&&!S.v5gc[key]){S.v5gc[key]=1;const P=S.goals.map(g=>({g,pr:goalProg(g)})).filter(x=>!x.pr.ok);if(P.length)news(`🎯 Faltam 12 semanas. Metas em aberto: ${P.map(x=>x.g.t.toLowerCase()).join('; ')}.`);else news('🎯 Todas as metas do ano já estão cumpridas. O resto da temporada é bônus.')}}catch(e){console.error(e)}return r}}
