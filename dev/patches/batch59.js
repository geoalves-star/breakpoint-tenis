// =============== v5.4 · equilíbrio: renda mínima, Realista mais duro, pressão de Slam ===============
// Renda mínima garantida (inspirada no programa Baseline da ATP): se o prêmio do ano ficar abaixo do piso, o circuito completa
const v5Floor=r=>!r?0:r<=100?300000:r<=175?200000:r<=250?100000:0;
function v5BaseYear(){const m=S.me;if(!m||S.ended||!isPro())return;const r=myRank('pro'),earned=(m.st.prize||0)-(m.v5py??(m.st.prize||0)),fl=v5Floor(r);m.v5py=m.st.prize||0;
 if(fl&&earned<fl){const pay=Math.round(fl-earned);m.money+=pay;news(`Renda mínima do circuito: você terminou o ano em #${r} e ganhou ${money(earned)} em prêmios. O circuito completou ${money(pay)} até o piso de ${money(fl)}.`)}}
{const _ny=newYear;newYear=function(){try{v5BaseYear()}catch(e){console.error(e)}return _ny()}}
{const _ew6=endWeek;endWeek=function(){try{if(S.me&&S.me.v5py==null)S.me.v5py=S.me.st.prize||0}catch(e){}return _ew6()}}
// dificuldade Realista mais dura desde o início; pressão nas fases finais de Grand Slam
{const _ef4=eff;eff=function(id,surf,t,o){const r=_ef4(id,surf,t,o);try{if(id==='me'&&r){if(S.diff==='real'){r.sv-=2.5;r.rt-=2.5}if(S.diff==='facil'){r.sv+=1.5;r.rt+=1.5}
 const T=S.tour;if(T&&!T.q&&T.br&&T.br.length<=8){const e=curEv();if(e&&e.tier==='GS'){const m=S.me,won=(m.st.titles||[]).filter(x=>x.tier==='GS').length,pen=clamp(4.5-1.2*won-((m.attrs.me??60)-60)*.06,0,5);r.sv-=pen;r.rt-=pen}}}}catch(e){}return r}}
