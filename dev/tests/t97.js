const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/tenis55.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];S.planAsk=S.w-S.w%52;setTheme('noite');TOAST=null;OPTS.voice=false;SND=false;
 const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok);enter(evs[0].e.key);S.modals=[];VINH=null;S.me.pmode='all';goMatch('court');if(VINH){clearTimeout(VT);vinGo()}S.modals=[];
 if(IM&&IM.toss){try{tossChoose('sacar')}catch(e){IM.toss=null}}if(IM&&IM.sig)IM.sig=null;render();
 // robô: joga com timing aleatório
 window.BOT=setInterval(()=>{const A=V5A;if(IM&&IM.toss){try{tossChoose('sacar')}catch(e){IM.toss=null;render()}}if(IM&&IM.sig){IM.sig=null;render()}if(IM&&IM.brk){try{setTac('eq')}catch(e){IM.brk=false;render()}}if(IM&&IM.chal){imChallenge(false)}
  if(!A)return;if(A.phase==='srvMe'&&!A.bs){A.bs=1;setTimeout(()=>{if(V5A===A&&A.phase==='srvMe'){A.t0=performance.now()-260*Math.PI*0.5*1.6;v5MeServe();A.bs=0}},200)}
  if(A.phase==='incoming'&&A.ball&&A.ball.hs!==A.ball.t0){A.ball.hs=A.ball.t0;const b=A.ball,j=(Math.random()-.5)*160;setTimeout(()=>{if(V5A===A&&A.phase==='incoming')v5MeHit([-1,0,1][Math.floor(Math.random()*3)],['neu','atk','def'][Math.floor(Math.random()*3)])},b.T+j)}},40)});
await p.waitForTimeout(1500);await p.screenshot({path:'shots/u1.png'});
await p.waitForTimeout(1200);await p.screenshot({path:'shots/u2.png'});
await p.waitForTimeout(8000);await p.screenshot({path:'shots/u3.png'});
const st=await p.evaluate(()=>IM?{flags:{anim:IM.anim,toss:IM.toss,sig:!!IM.sig,brk:IM.brk,chal:!!IM.chal,rain:IM.rainP,cramp:IM.cramp,pend:IM.pend,mode:IM.mode,ready:v5ArcReady(),A:V5A&&{ph:V5A.phase,pt:V5A.pt,end:!!V5A.end},canvas:!!document.getElementById('v5arc')},tl:IM.E.TL.length,sets:IM.E.sets,ga:IM.E.ga,gb:IM.E.gb,a:IM.E.a,b:IM.E.b,SA:IM.E.SA,feed:IM.feed.slice(0,4)}:{done:true,live:!!LIVE});
const dbg=await p.evaluate(()=>{const o={V5AR,ball:V5A&&V5A.ball&&{T:V5A.ball.T,age:performance.now()-V5A.ball.t0}};try{V5AR=0;v5ArcFrame(performance.now())}catch(e){o.err=e.message+' '+e.stack.slice(0,300)}return o});console.log(JSON.stringify(st),JSON.stringify(errs.slice(0,5)),JSON.stringify(dbg));await b.close()})();
