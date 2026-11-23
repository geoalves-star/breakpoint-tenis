// =============== v6.7 · dinheiro parado vira sugestão; técnico do adversário na preparação ===============
// pendência: quando sobra dinheiro, sugere o próximo investimento que cabe no bolso (40 semanas de custo)
function bcIdle(){try{const m=S.me;if(S.cm||S.ended||meAge()<15||m.money<25000)return null;const M=m.money;
 if(typeof bcCoUp==='function'&&bcCoUp())return null;
 const c=myCoach(),r=myRank('pro')||9999,j=meAge()<=18?(myRank('jr')||9999):9999;
 const ok=x=>!CREQ[x.q]||r<=CREQ[x.q]||j<=CREQ[x.q]/10;
 const bc=freeCoaches().filter(x=>x.q>(c?c.q:0)&&x.sal*40<=M&&ok(x)).sort((a,b)=>b.q-a.q)[0];
 if(bc&&(!c||c.club||c.fam||bc.q>=c.q+1))return['💰',`Dinheiro parado: dá para contratar um técnico ${'★'.repeat(bc.q)}`,"ACCO.coach=true;go('train')"];
 const ph=(m.physio||0)+1;if(PHYSIO[ph]&&PHYSIO[ph].c*40<=M)return['💰',`Dinheiro parado: dá para pagar ${PHYSIO[ph].n.toLowerCase()} (${money(PHYSIO[ph].c)}/sem)`,"ACCO.physio=true;go('train')"];
 const ct=CENTERS.map((x,i)=>({...x,i})).filter(x=>x.m>CENTERS[m.center||0].m&&x.c*40<=M).sort((a,b)=>b.m-a.m)[0];
 if(ct)return['💰',`Dinheiro parado: dá para treinar em ${ct.n.split(' (')[0]} (${money(ct.c)}/sem)`,"ACCO.center=true;go('train')"];
 return null}catch(e){return null}}
// preparação: quem treina o adversário, com nível, ao lado do seu técnico
{const _vm=v5Match;v5Match=function(){let s=_vm.apply(this,arguments);try{const p=IDX.get(oppOf());const co=p&&p.co&&COI.get(p.co);if(!co)return s;const lv=bcCoLv(co);
 const mine=bcV2()?{n:S.cm.n,lv:bcMyLv(),f:S.cm.f,you:1}:(()=>{const c=myCoach();return c?{n:c.n,lv:bcCoLv(c),f:c.f}:null})();
 const d=mine?mine.lv-lv:0;const cmp=!mine?'':d>=2?'Vantagem no banco: seu técnico tem mais experiência.':d<=-2?'Desvantagem no banco: o técnico adversário é bem mais experiente.':'Bancos equilibrados.';
 const row=`<div class="bcoco"><div><span class="v5k">${co.f?'Técnica':'Técnico'} ${G('dele','dela')}</span><b>${esc(co.n)}</b><em>${co.club?'Técnico de clube':'★'.repeat(co.q)} · nível ${lv} · ${bcLvName(lv).toLowerCase()}</em></div>${mine?`<div><span class="v5k">${mine.you?'Você':mine.f?'Sua técnica':'Seu técnico'}</span><b>${esc(mine.n)}</b><em>nível ${mine.lv} · ${bcLvName(mine.lv).toLowerCase()}</em></div>`:''}</div>${cmp?`<p class="xs mut" style="margin:6px 0 0">${cmp}</p>`:''}`;
 s=s.replace('<div class="v5sec"><span class="v5k">Sua forma</span>',row+'<div class="v5sec"><span class="v5k">Sua forma</span>')}catch(e){console.error(e)}return s}}
// diferença de nível entre os bancos pesa um pouco na partida
{const _e=eff;eff=function(id,surf,tacK,opp){const r=_e.apply(this,arguments);try{if(id==='me'&&r&&opp!=null){const p=IDX.get(opp),co=p&&p.co&&COI.get(p.co);if(co){const mine=bcV2()?bcMyLv():(myCoach()?bcCoLv(myCoach()):0);const d=clamp((mine-bcCoLv(co))*.06,-.3,.3);r.sv+=d;r.rt+=d}}}catch(e){}return r}}
// cartão do troféu para compartilhar (1080×1350, pronto para Instagram e X)
async function bcAwShare(i){try{const c=S.cm,t=(c.tro||[])[i];if(!t)return;const A=BCAW[t.k],M=BCMIL.find(x=>x[0]===t.k);const ic=A?A.i:M[1],nm=(A?A.n:M[2]).replace(/^Técnico/,c.f?'Técnica':'Técnico');
 const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');try{await document.fonts.ready}catch(e){}
 const BAR='#0C0C0E',HI='#FFE14D',TX='#FFFFFF',MU='#9a9aa3',FC='"Barlow Condensed",Arial Narrow,sans-serif',FD='Barlow,Arial,sans-serif';
 g.fillStyle=BAR;g.fillRect(0,0,W,H);g.strokeStyle='#ffffff0d';g.lineWidth=2;for(let x=-H;x<W;x+=150){g.beginPath();g.moveTo(x,H);g.lineTo(x+H*.47,0);g.stroke()}
 const rg=g.createRadialGradient(W/2,560,40,W/2,560,520);rg.addColorStop(0,'#FFE14D33');rg.addColorStop(1,'#FFE14D00');g.fillStyle=rg;g.fillRect(0,0,W,H);
 g.fillStyle=HI;g.fillRect(0,0,W,14);g.font=`800 40px ${FC}`;g.fillStyle=HI;g.textAlign='left';g.fillText(A?'PRÊMIO DE TÉCNICO':'CONQUISTA DE TÉCNICO',80,110);
 g.textAlign='center';g.font='260px serif';g.fillText(ic,W/2,600);
 g.fillStyle=TX;g.font=`800 120px ${FC}`;let n=nm.toUpperCase();while(g.measureText(n).width>W-120&&n.length>4)n=n.slice(0,-1);g.fillText(n,W/2,780);
 if(A){g.fillStyle=HI;g.font=`800 110px ${FC}`;g.fillText(String(t.y),W/2,890)}
 g.fillStyle=TX;g.font=`800 64px ${FC}`;g.fillText(c.n.toUpperCase(),W/2,A?1010:920);
 g.fillStyle=MU;g.font=`500 36px ${FD}`;const sub=`${c.f?'Técnica':'Técnico'} nível ${bcMyLv()} · ${bcLvName(bcMyLv()).toLowerCase()} · treina ${S.me.name}`;g.fillText(sub,W/2,A?1070:980);
 if(t.why){g.fillStyle=TX;g.font=`600 34px ${FD}`;let w=t.why;while(g.measureText(w).width>W-160&&w.length>6)w=w.slice(0,-2);g.fillText(w,W/2,A?1130:1040)}
 g.fillStyle=HI;g.fillRect(0,H-150,W,150);g.fillStyle=BAR;g.textAlign='left';g.font=`800 52px ${FC}`;g.fillText('BREAKPOINT',80,H-62);g.textAlign='right';g.font=`600 30px ${FD}`;g.fillText('breakpoint-vercel-one.vercel.app',W-80,H-62);
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));const file=new File([blob],`breakpoint_${t.k}_${t.y}.png`,{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({files:[file],title:`${nm} · Breakpoint Tênis`});else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}}catch(e){console.error(e)}}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcShare!=null){const i=fx.bcShare;setTimeout(()=>bcAwShare(i),0)}}catch(e){}return r}}
// cerimônia ganha o botão de compartilhar
{const _g=bcGive;bcGive=function(k,y,why,quiet){const r=_g.apply(this,arguments);try{const c=S.cm,md=S.modals[S.modals.length-1];if(!quiet&&md&&md.k==='Prêmio')md.o.push({l:'Compartilhar o troféu',t:'Imagem pronta para Instagram e X',fx:{bcShare:c.tro.length-1}})}catch(e){}return r}}
// sala de troféus: tocar num prêmio ganho gera a imagem
{const _tc=bcTroCard;bcTroCard=function(){let h=_tc();try{const T=S.cm.tro||[];Object.keys(BCAW).forEach(k=>{let i=-1;T.forEach((t,j)=>{if(t.k===k)i=j});if(i>=0)h=h.replace(`<div class="bctri on"><span>${BCAW[k].i}</span>`,`<div class="bctri on" role="button" onclick="bcAwShare(${i})" title="Compartilhar"><span>${BCAW[k].i}</span>`)});h=h.replace('Os prêmios de técnico saem','Toque num prêmio ganho para gerar a imagem e compartilhar. Os prêmios de técnico saem')}catch(e){}return h}}
