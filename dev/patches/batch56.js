// =============== v5.2 · 6) caminhos aos 17-18 anos ===============
const V5UNI=['Universidade da Geórgia','Universidade do Texas','Universidade da Virgínia','Universidade de Stanford','Universidade da Flórida','Universidade de Ohio','Universidade da Carolina do Norte','Universidade do Tennessee'];
const v5Col=()=>{const c=S.me&&S.me.college;return c&&S.w<c.end?c:null};
const v5Fed=()=>{const f=S.me&&S.me.fedProg;return f&&S.w<f.end?f:null};
function v5PathModal(){const md=S.modals.find(x=>x.k==='Carreira'&&x.ti==='Hora de virar profissional?'&&!x.v5);if(!md)return;md.v5=1;
 md.o.push({l:'Universidade nos EUA (2 anos)',t:'Bolsa integral e treino forte, sem prêmios. Só circuito profissional nas férias de verão.',fx:{v5:'college'}},{l:'Programa da federação (2 anos)',t:'Ajuda de custo semanal e CT pago, mas convocações obrigatórias.',fx:{v5:'fedprog'}});
 md.q+=' Também dá para ir para uma universidade americana ou entrar no programa de desenvolvimento da federação.'}
{const _ap2=applyFx;applyFx=function(fx){_ap2(fx);try{const m=S.me;if(fx&&fx.v5==='college'){const u=pick(V5UNI);m.college={uni:u,start:S.w,end:S.w+104,ncaa:0};m.proAsk=1;news(`Você aceitou a bolsa na ${u}. Dois anos de tênis universitário pela frente.`)}
 if(fx&&fx.v5==='fedprog'){m.fedProg={start:S.w,end:S.w+104};m.pro=true;news(`Você entrou no programa de desenvolvimento da federação: ajuda de custo e CT pagos por dois anos.`)}}catch(e){console.error(e)}}}
{const _es2=entryStatus;entryStatus=function(ev){const s=_es2(ev);try{const c=v5Col(),t=TIERS[ev.tier];if(c&&t.cat==='pro'){const wk=(ev.w!=null?ev.w:S.w)%52;if(wk<21||wk>34)return{ok:0,txt:'Temporada universitária'}}}catch(e){}return s}}
function v5PathWeek(){const m=S.me;if(!m||S.ended)return;const c=v5Col(),f=v5Fed();
 if(c){const wk=S.w%52;if(wk<21||wk>34){ATTR.forEach(([k])=>{if(k!=='me')m.attrs[k]=Math.min(m.pot||95,m.attrs[k]+.045)});m.attrs.me=Math.min(95,m.attrs.me+.03);m.money+=Math.round(weekCost()*.8)}
  if(wk===20&&!c['y'+year()]){c['y'+year()]=1;const p=clamp((ovr()-58)/22,.05,.6);if(R()<p){c.ncaa++;m.wc=m.wc||{n:0,gs:0};m.wc.gs++;m.wc.n+=2;news(`Campeão universitário! O título da NCAA rende um convite para a chave principal de um Grand Slam e dois para ATP/Challengers.`);hl&&hl('Título universitário (NCAA)')}else news(`Fim da temporada universitária: você chegou longe, mas o título ficou com outro.`)}}
 if(m.college&&!c&&!m.college.done){m.college.done=1;m.pro=true;news(`Formado na ${m.college.uni}! Agora é tênis profissional em tempo integral.`)}
 if(f){m.money+=800+Math.round((CENTERS[m.center||0]||{c:0}).c*.8)}
 if(m.fedProg&&!f&&!m.fedProg.done){m.fedProg.done=1;news('O programa da federação terminou. A partir de agora, os custos são todos seus.')}}
{const _ew5=endWeek;endWeek=function(){const go=!S.modals.length;const r=_ew5();if(go)try{v5PathWeek();v5PathModal()}catch(e){console.error(e)}return r}}
{const _vs2=v5Season;v5Season=function(){let s=_vs2();try{const c=v5Col(),f=v5Fed();if(c||f){const b=c?`<div class="v5next" style="margin-top:12px">${esc(c.uni)} · universitário até ${wkDate(c.end)} ${year0(c.end)}. Circuito profissional só nas férias (semanas 22 a 35).${c.ncaa?` Títulos NCAA: ${c.ncaa}.`:''}</div>`:`<div class="v5next" style="margin-top:12px">Programa da federação até ${wkDate(f.end)} ${year0(f.end)}: US$ 800/sem e 80% do CT pagos.</div>`;s=s.replace(/<\/section>$/,b+'</section>')}}catch(e){}return s}}
