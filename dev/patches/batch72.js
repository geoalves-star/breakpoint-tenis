// =============== v5.7: primeiro ponto com tutorial + vida depois da aposentadoria como treinador ===============
// ---------- tutorial nos primeiros pontos em tempo real ----------
const v5TutOn=()=>!OPTS.arcTut;
function v5TutDone(){OPTS.arcTut=1;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}}
{const _st=v5ArcStart;v5ArcStart=function(){_st();try{const A=V5A;if(A&&v5TutOn()){OPTS._tp=(OPTS._tp||0)+1;A.tut=1;if(A.phase==='srvMe'){A.txt='Tutorial: seu saque';A.sub='Toque quando o marcador passar pela faixa verde'}else{A.txt='Tutorial: devolução';A.sub='Toque quando o anel em volta fechar e ficar verde'}if(OPTS._tp>=4)v5TutDone()}}catch(e){}}}
{const _os=v5OppServe;v5OppServe=function(){_os();try{const A=V5A;if(A&&A.tut&&A.ball&&A.ball.toMe){A.ball.T*=1.5;A.sub='Toque quando o anel ficar verde'}}catch(e){}}}
{const _o=v5OppHit;v5OppHit=function(){_o();try{const A=V5A;if(A&&A.tut&&A.ball&&A.ball.toMe&&A.phase==='incoming'){A.ball.T*=1.35;A.txt='Sua vez';A.sub=A.shots<2?'Deslize para o lado para mirar, para cima para atacar':'Para cima curto: deixadinha. Para baixo longo: lob'}}catch(e){}}}
{const _e=v5End;v5End=function(aw,kind,txt){const A=V5A,tut=A&&A.tut&&!A.end;_e(aw,kind,txt);try{if(tut&&A.end){A.sub=aw?'Boa! É assim. O ponto vai para o placar.':'Sem problema: no próximo ponto, observe o anel.'}}catch(e){}}}
// ---------- aposentadoria: começar como treinador ----------
{const _ec=endCareer;endCareer=function(why){_ec(why);try{if(!S.cm){const m=S.me,st=m.st,gs=st.titles.filter(t=>t.tier==='GS').length;
 const exp={n:m.name,c:m.c,circ:S.circ||CIRC(),age:meAge(),hi:st.hiPro||null,gs,ti:st.titles.length,g:m.g};try{localStorage.setItem('bp_exp',JSON.stringify(exp))}catch(e){}
 S.endHtml=(S.endHtml||'')+`<div class="card" style="margin-top:10px"><div class="sec-t" style="margin:0 0 6px">Vida depois da quadra</div><p class="small" style="margin:0 0 8px">Que tal virar ${G('treinador','treinadora')}? Você começa uma carreira nova treinando um talento juvenil, com a reputação que construiu: ${st.hiPro?`ex-número ${st.hiPro} do mundo`:'ex-jogador do circuito'}${gs?` e ${gs} Grand Slam${gs>1?'s':''}`:''}.</p><button class="full" onclick="v5ToCoach()">Começar como ${G('treinador','treinadora')}</button></div>`}}catch(e){console.error(e)}}}
function v5ToCoach(){let exp=null;try{exp=JSON.parse(localStorage.getItem('bp_exp')||'null')}catch(e){}if(!exp){TOAST='Não encontrei a carreira encerrada.';render();return}
 FORM={...FORM,coach:true,leg:false,age:14,cname:exp.n,cage:clamp(exp.age||35,35,65),circ:exp.circ||FORM.circ};try{if(exp.c!=null)FORM.c=exp.c}catch(e){}
 let n=-1;for(let i=0;i<3;i++)if(!slotMeta(i)){n=i;break}
 if(n<0){toMenu();TOAST='Os 3 espaços estão ocupados. Apague um para começar como treinador: o formulário já vem preenchido.';render();return}
 saveNow();SLOT=n;S=null;MENU=false;IM=null;INMENU=false;render();window.scrollTo(0,0)}
{const _ng=newGame;newGame=function(o){_ng(o);try{if(o&&o.coach&&S.cm){const exp=JSON.parse(localStorage.getItem('bp_exp')||'null');if(exp&&exp.n&&(o.cname||'').trim()===exp.n){const b=(exp.hi?clamp(Math.round(30/Math.sqrt(exp.hi)),1,22):0)+exp.gs*2;S.cm.trust=clamp(S.cm.trust+b,0,95);S.cm.ex={hi:exp.hi,gs:exp.gs,ti:exp.ti};if(exp.hi&&exp.hi<=20)S.cm.acad=(S.cm.acad||0)+1;
  news(`🧑‍🏫 ${exp.hi?`Ex-número ${exp.hi} do mundo`:'Ex-jogador do circuito'}, ${exp.n} começa a carreira de ${G('treinador','treinadora')} com ${S.me.name}. A reputação abre portas: confiança inicial ${Math.round(S.cm.trust)}.`);localStorage.removeItem('bp_exp')}}}catch(e){}}}
