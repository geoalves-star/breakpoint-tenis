const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await ctx.route('https://gist.githubusercontent.com/**',r=>r.fulfill({status:200,contentType:'text/plain',headers:{'access-control-allow-origin':'*'},body:JSON.stringify({app:'breakpoint-pacote',v:1,circ:'ATP',pro:[{n:'Fulano Teste',c:'BRA'},{n:'Ciclano Teste',c:'ESP'}],jr:[]})}));
await p.goto('file:///home/claude/tenis56.html');await p.waitForTimeout(400);
await p.evaluate(()=>{localStorage.removeItem('bp_logos');MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];TOAST=null;INMENU=true;render()});
const out={};out.menu=await p.evaluate(()=>{const t=document.body.innerText;return{img:t.includes('Imagens dos torneios'),np:t.includes('Sem polêmicas')}});
await p.screenshot({path:'shots/l_menu.png'});
await p.evaluate(()=>{INMENU='logos';render()});await p.waitForTimeout(200);
const inp=await p.$('.v5lrow input[type=file]');await inp.setInputFiles('shots/testlogo.png');await p.waitForTimeout(800);
out.logo=await p.evaluate(()=>{const L=v5Logos();const k=Object.keys(L);return{k,len:k.length&&L[k[0]].length,img:!!document.querySelector('.v5lrow .emb img')}});
await p.screenshot({path:'shots/l_view.png'});
const ex=await p.evaluate(()=>{const o=nedExportObj();return{app:o.app,logos:Object.keys(o.logos||{}).length}});out.export=ex;
// import via link
await p.evaluate(()=>{INMENU='nimp';render()});await p.fill('#v5link','https://gist.github.com/alguem/0123abcd');await p.click('#v5linkb');await p.waitForTimeout(600);
out.linkTxt=await p.evaluate(()=>document.getElementById('nimp').value.slice(0,60));
await p.screenshot({path:'shots/l_imp.png'});
await p.evaluate(()=>nedImport());await p.waitForTimeout(200);
out.after=await p.evaluate(()=>({np:OPTS.np,toast:TOAST,top:nedList('pro').slice(0,2).map(x=>x.n)}));
// sem polêmicas: post de provocação bloqueado
out.post=await p.evaluate(()=>{const n0=(S.feed||S.posts||[]).length;addPost({a:'X',h:'@x',t:'Chave fácil essa semana, né?',k:'rv',c:1});addPost({a:'X',h:'@x',t:'Título 🏆',k:'rv',c:1});return [n0,(S.feed||S.posts||[]).length]});
// partida em quadra com logo no muro
await p.evaluate(()=>{INMENU=false;const name=Object.keys(v5Logos())[0];const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok);enter(evs[0].e.key);S.modals=[];VINH=null;S.me.pmode='all';goMatch('court');if(VINH){clearTimeout(VT);vinGo()}S.modals=[];if(IM){IM.toss=null;IM.sig=null;IM.ev={...IM.ev,name}}render()});
await p.waitForTimeout(1500);const el=await p.$('#v5arc');if(el)await el.screenshot({path:'shots/l_court.png'});
console.log(JSON.stringify(out,null,0),JSON.stringify(errs.slice(0,5)));await b.close()})();
