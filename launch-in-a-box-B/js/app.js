/* ---------- state ---------- */
const S={view:"home",sel:"d3",tab:"content",q:"",fType:"",fTag:"",mapTag:"",
  cond:{},comms:{},llm:{},busy:{}};
DOCS.forEach(d=>{
  const list=(COND_OVERRIDE[d.id]||COND_DEFAULT[d.type]).map(c=>({...c}));
  S.cond[d.id]=list;
  S.llm[d.id]={acc:new Set(),skip:new Set()};
});
// pre-mark some conditions on published docs
["d1","d2","d11","d12","d13","d14","d10"].forEach(id=>S.cond[id].forEach(c=>{if(c.kind!=="llm")c.on=true}));
S.cond.d10.forEach(c=>{if(c.kind==="comms")c.on=true});
S.cond.d5.find(c=>c.id==="owner").on=true;
// new pages: what is already true on Oct 19
[["d18",["owner","source"]],["d19",["owner"]],["d20",["owner"]],["d22",["owner","tested"]],["d23",["owner","thread"]],["d24",["owner"]]].forEach(([id,ks])=>S.cond[id].forEach(c=>{if(ks.includes(c.id))c.on=true}));

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const STATUS={NotStarted:"Not started",Draft:"Draft",InReview:"In review",Ready:"Ready",Published:"Published",NeedsUpdate:"Needs update",Superseded:"Superseded",Open:"Open"};
const fmt=iso=>{const d=new Date(iso+"T12:00:00");return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};
const tcol=t=>`var(${TYPES[t].c})`;
const okTags=d=>d.tags.filter(t=>t.state==="ok");
const sugTags=d=>d.tags.filter(t=>t.state==="sug");
function toast(m){document.querySelectorAll(".toast").forEach(x=>x.remove());const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}
function llmScore(id){const d=BYID[id],L=LLM[id]||genericLLM(d),st=S.llm[id];return Math.min(100,L.base+L.props.filter(p=>st.acc.has(p.id)).reduce((a,p)=>a+p.pts,0))}
function condMet(d,c){
  if(c.kind==="llm") return llmScore(d.id)>=80;
  if(c.kind==="answers") return S.confirmed.size===LAUNCH.confirm.length;
  if(c.kind==="comms"){const deps=depsFor(d),cm=S.comms[d.id]||{};return deps.length>0&&deps.every(([n])=>cm[n]?.status==="sent")}
  return !!c.on;
}
function condStats(d){const l=S.cond[d.id];const m=l.filter(c=>condMet(d,c)).length;return [m,l.length]}

/* ---------- shell ---------- */
const IC={
 home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
 docs:'<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
 map:'<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="12" cy="17" r="2.2"/><path d="M8 7l8 0M7.2 8l3.8 7M16.8 9l-3.8 6"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
 alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
 spark:'<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 chev:'<path d="m9 6 6 6-6 6"/>',
 down:'<path d="m6 9 6 6 6-6"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 check:'<path d="M5 12l5 5 9-10"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>'
};
const ico=(k,sz=16)=>`<svg class="ic" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
const SPACES=[
 {name:"Internal Team Space",em:"🏠",folders:[["Roadmap & briefs","🗺️",["brief","roadmap"]],["Enablement","🎯",["enable"]],["Macros","💬",["macro"]],["Playbooks","🧭",["playbook"]],["Escalations","🚨",["escalation"]],["Known issues","🐞",["known"]],["Changelog","📒",["changelog"]],["Data definitions","📐",["data"]]]},
 {name:"Public Help Center",em:"🌐",folders:[["Help articles","📘",["help"]],["Announcements","📣",["announce"]]]}
];
function where(d){for(const s of SPACES)for(const f of s.folders)if(f[2].includes(d.type))return {space:s,folder:f};return {space:SPACES[0],folder:SPACES[0].folders[0]}}
S.collapsed=new Set();S.recent=["d3","d4","d7"];S.homeSort="top";
const attention=d=>d.status!=="Superseded"&&(d.conflict||d.status==="NeedsUpdate");
function crumbs(parts,acts=""){return `<div class="crumbs"><div class="path">${parts.map((p,i)=>i===parts.length-1?`<b>${p}</b>`:`<span>${p}</span><i>›</i>`).join("")}</div><div class="acts"><span class="mockflag">Prototype</span>${acts}<button class="btn ghost small demobtn" data-tour="0" title="Click through every feature, the brief requirement it meets and the gaps it closes">${ico("play",12)}<span class="lbl"> Demo</span></button><button class="lensbtn" data-lens="toggle" aria-pressed="${!!S.lens}" title="Show which gap each feature closes (G)"><span class="sw" aria-hidden="true"></span>Gap lens</button><button class="btn ghost small askopen" data-nav="agent" aria-label="Ask agent">${ico("spark",15)}<span class="lbl"> Ask agent</span></button></div></div>`+lensBar()}

function renderRail(){
  const review=DOCS.reduce((a,d)=>a+sugTags(d).length,0);const agentOn=!$("#agentpanel").hidden;
  const b=(r,icon,label,cur,extra="")=>`<button data-r="${r}" title="${label}" aria-label="${label}" aria-current="${cur}">${ico(icon,18)}${extra}</button>`;
  $("#rail").innerHTML=`<div class="logo" aria-hidden="true">D</div>
   ${b("home","home","Overview",S.view==="home")}
   ${b("launch","rocket","Launch · Visibility Rules",S.view==="launch")}
   ${b("health","pulse","Help-centre health",S.view==="health")}
   ${b("answers","answers","One answer per question",S.view==="answers")}
   ${b("questions","question","Questions log",S.view==="questions")}
   ${b("changes","changes","Releases and changes",S.view==="changes")}
   <i class="rsep" aria-hidden="true"></i>
   ${b("docs","docs","Documents",S.view==="doc")}
   ${b("map","map","Tag map",S.view==="map")}
   ${b("review","tag",`Tags to review (${review})`,false,review?`<span class="bub">${review}</span>`:"")}
   <span class="sp"></span>
   ${b("demo","playc","Demo journey",TR.on)}
   ${b("gaps","target","Gap index",S.view==="gaps")}
   <button data-r="agent" title="Ask agent" aria-label="Ask agent" aria-pressed="${agentOn}" aria-current="${agentOn}">${ico("spark",18)}</button>`;
}
$("#rail").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;const r=b.dataset.r;
  if(r==="docs"){if(innerWidth<=900){$("#app").classList.toggle("tree-open");return}S.view="doc"}
  else if(r==="map"){S.view="map";S.mapDoc="";S.mapTag=""}
  else if(r==="review"){const d=DOCS.find(x=>sugTags(x).length);S.view="doc";if(d){S.sel=d.id;S.tab="tags"}}
  else if(r==="agent"){openAgent();return}
  else if(r==="demo"){tourStart(0);return}
  else S.view=r;
  $("#app").classList.remove("tree-open");
  if(innerWidth<=1240&&!$("#agentpanel").hidden)openAgent(false);
  render();if(innerWidth<=640)scrollTo(0,0);
});

function renderTree(){
  $("#tree").innerHTML=`<div class="treehead"><b>Docs</b><div class="tools"><button class="iconbtn" id="tnew" title="New page" aria-label="New page">${ico("plus",15)}</button></div></div>
   <label class="tsearch" for="q"><input id="q" type="search" placeholder="Search docs and tags" value="${esc(S.q)}" autocomplete="off"></label>
   <div id="tlist"></div>`;
  $("#q").addEventListener("input",e=>{S.q=e.target.value.trim().toLowerCase();renderTreeList()});
  $("#tnew").addEventListener("click",()=>toast("New pages are not part of this mockup"));
  $("#tree").onclick=e=>{
    const t=e.target.closest("[data-doc]");if(t){openDoc(t.dataset.doc);return}
    const f=e.target.closest("[data-fold]");if(f){const k=f.dataset.fold;S.collapsed.has(k)?S.collapsed.delete(k):S.collapsed.add(k);renderTreeList();return}
    const c=e.target.closest("[data-clr]");if(c){S.fTag="";renderTreeList()}
  };
  renderTreeList();
}
function leaf(d,cls="leaf"){
  const dot=attention(d)?"var(--warn)":sugTags(d).length?"var(--accent)":"";
  return `<button class="trow ${cls}" data-doc="${d.id}" aria-current="${S.view==="doc"&&S.sel===d.id}" title="${esc(d.title)}"><span class="tt" ${d.status==="Superseded"?'style="text-decoration:line-through;color:var(--muted)"':""}>${esc(d.title)}</span>${dot?`<i class="sdot" style="background:${dot}"></i>`:""}</button>`;
}
function renderTreeList(){
  let h="";
  if(S.q||S.fTag){
    const res=filtered();
    h+=S.fTag?`<span class="filterchip">${S.fTag}<button data-clr aria-label="Clear tag filter">×</button></span>`:"";
    h+=`<div class="tlabel">${res.length} result${res.length===1?"":"s"}</div>`+(res.map(d=>leaf(d,"leaf\" style=\"padding-left:8px")).join("")||`<p class="note" style="padding:4px 8px">No matches.</p>`);
  }else{
    h+=`<div class="tlabel">Workspace</div>`+navRows();
    h+=`<div class="tlabel" style="margin-top:8px">Recents ${ico("chev",12)}</div>`+S.recent.map(id=>BYID[id]).filter(Boolean).map(d=>leaf(d,"leaf\" style=\"padding-left:8px")).join("");
    h+=`<div class="tlabel" style="margin-top:6px">General ${ico("down",12)}</div>`;
    SPACES.forEach(s=>{
      const sk="s:"+s.name;const sc=S.collapsed.has(sk);
      h+=`<button class="trow space" data-fold="${sk}" aria-expanded="${!sc}"><span class="em">${s.em}</span><span class="tt">${s.name}</span></button>`;
      if(sc)return;
      s.folders.forEach(([fn,em,types])=>{
        const docs=DOCS.filter(d=>types.includes(d.type)).sort((a,b)=>b.date.localeCompare(a.date));if(!docs.length)return;
        const fk="f:"+fn;const fc=S.collapsed.has(fk);
        h+=`<button class="trow folder" data-fold="${fk}" aria-expanded="${!fc}"><span class="em">${em}</span><span class="tt">${fn}</span></button>`;
        if(!fc)h+=docs.map(d=>leaf(d)).join("");
      });
    });
  }
  $("#tlist").innerHTML=h;
}
function openDoc(id){S.view="doc";S.sel=id;S.recent=[id,...S.recent.filter(x=>x!==id)].slice(0,3);$("#app").classList.remove("tree-open");render();if(innerWidth<=640)scrollTo(0,0)}
function filtered(){
  return DOCS.filter(d=>{
    if(S.fTag&&!okTags(d).some(t=>t.t===S.fTag))return false;
    if(S.q){const hay=(d.title+" "+d.summary+" "+d.tags.map(t=>t.t).join(" ")+" "+STATUS[d.status]+" "+TYPES[d.type].label).toLowerCase();if(!S.q.split(/\s+/).every(w=>hay.includes(w)))return false}
    return true;
  }).sort((a,b)=>b.date.localeCompare(a.date));
}

/* ---------- doc page ---------- */
function docTabs(d){
  const [m,n]=condStats(d),sg=sugTags(d).length,sc=llmScore(d.id),t=[["content","Page",""]];
  if(HC[d.id]){const o=hcOpen(d.id);t.push(["health","Health",`<span class="badge ${o?"warnb":"okb"}">${o?o+" open":"✓"}</span>`])}
  const r=RELEASES.find(x=>x.doc===d.id);if(r){const s=relScore(r);t.push(["release","Release review",`<span class="badge ${s>=6?"okb":"warnb"}">${s}/7</span>`])}
  t.push(["tags","Tags & links",sg?`<span class="badge hot">${sg}</span>`:`<span class="badge">${okTags(d).length}</span>`],["conditions","Publish conditions",`<span class="badge ${m===n?"okb":""}">${m}/${n}</span>`],["llm","LLM-ready",`<span class="badge ${sc>=80?"okb":""}">${sc}</span>`]);
  return t;
}
function renderDoc(){
  const d=BYID[S.sel]||BYID.d3;S.sel=d.id;const w=where(d);
  const tabs=docTabs(d);if(!tabs.some(t=>t[0]===S.tab))S.tab="content";
  const rel=relatedDocs(d).length,wide=["escalation","data","playbook"].includes(d.type)||d.id==="d30";
  const acts=`<button class="btn ghost small" id="relatedtop" title="Show related documents" aria-label="Related documents">${ico("map",15)}<span class="lbl"> Related</span> <span class="badge">${rel}</span></button><button class="iconbtn hide-s" title="Favorite" aria-label="Favorite" id="fav">${ico("star",15)}</button><button class="iconbtn hide-s" title="Copy link" aria-label="Copy link" id="lnk">${ico("link",15)}</button>`;
  $("#main").innerHTML=crumbs([w.space.em+" "+w.space.name,w.folder[1]+" "+w.folder[0],esc(d.title)],acts)+`<div class="scroll" id="ws"><div class="page ${wide?"wide":""}">
   <div class="meta">Owned by ${avatar(d.owner)} ${esc(d.owner)} <span>·</span> ${d.status==="NotStarted"?"Planned":"Edited"} ${fmt(d.date)}${d.due?" · "+esc(d.due):""} ${pillS(d.status)}<span class="type">${typeDot(d.type)}${TYPES[d.type].label}</span><span>Audience: ${esc(d.aud)}</span>${gl(DOC_GAPS[d.id]||[])}</div>
   <div class="titlerow"><h1>${esc(d.title)}</h1><button class="btn" id="related" style="flex:none">${ico("map",15)} Show related documents</button></div>
   ${d.status==="Superseded"?`<div class="callout gray"><b>${ico("clock",16)} Superseded</b><p>Replaced by <a href="#/doc/d3" data-go="d3">Visibility Rules: scope and date change</a>. Kept for history and left out of the agent's answers.</p></div>`:d.conflict?`<div class="callout"><b>${ico("clock",16)} Verification needed</b><p>${esc(d.conflict)}${HC[d.id]&&S.tab!=="health"?` <button class="lnk" data-tabgo="health">See the fixes →</button>`:""}</p></div>`:""}
   <div class="tabs" role="tablist">${tabs.map(([k,l,b])=>`<button role="tab" data-tab="${k}" aria-selected="${S.tab===k}">${l}${b}</button>`).join("")}</div>
   <div class="wsbody" id="wsbody"></div>
  </div></div>`;
  const goRel=()=>{S.view="map";S.mapDoc=d.id;S.mapTag="";S.mapAnim=true;if(innerWidth<1600&&!$("#agentpanel").hidden)openAgent(false);render()};
  $("#related").onclick=goRel;$("#relatedtop").onclick=goRel;
  $("#fav").onclick=()=>toast("Added to favorites");
  $("#lnk").onclick=()=>{(navigator.clipboard?navigator.clipboard.writeText(location.href):Promise.reject()).then(()=>toast("Link copied")).catch(()=>toast("Copy isn't available here"))};
  $("#ws").querySelector(".tabs").onclick=e=>{const b=e.target.closest("[data-tab]");if(b){S.tab=b.dataset.tab;renderDoc()}};
  $("#ws").querySelector(".callout")?.addEventListener("click",e=>{const a=e.target.closest("[data-go]");if(a){e.preventDefault();openDoc(a.dataset.go);return}const t=e.target.closest("[data-tabgo]");if(t){S.tab=t.dataset.tabgo;renderDoc()}});
  ({content:tabContent,health:tabHealth,release:tabRelease,tags:tabTags,conditions:tabConditions,llm:tabLLM})[S.tab](d);
  syncHash();
}
function renderWS(){renderDoc()}

function tabContent(d){
  const custom={d22:pagePlaybook,d23:pageEscalation,d24:pageData,d25:pageChangeLog}[d.id]||(d.type==="macro"?pageMacro:null);
  if(custom){custom(d);$("#wsbody").insertAdjacentHTML("afterbegin",docLaunchStrip(d));return}
  const h=HC[d.id];
  $("#wsbody").innerHTML=`${docLaunchStrip(d)}${h?`<button class="hcstrip" data-tabgo="health"><span class="code">${h.code}</span><span>${hcOpen(d.id)?`<b class="warnc">${hcOpen(d.id)} open issues</b>`:`<b class="okc">Issues fixed</b>`} · template ${templateScore(d.id)}/6 · ${h.views.toLocaleString("en-US")} views in 30 days · ${Math.round(h.votes[0]/h.votes[1]*100)}% helpful</span><span class="lnk">Open Health →</span></button>`:""}${docNote(d)}<p class="lead">${esc(d.summary)}</p><div class="docbody">${bodyHTML(d)}</div>`;
  $("#wsbody").onclick=e=>{const t=e.target.closest("[data-tabgo]");if(t){S.tab=t.dataset.tabgo;renderDoc()}};
}
function tabTags(d){
  const rows=d.tags.map((t,i)=>`<div class="tagrow">
     <div><span class="chip ${t.src==="ai"?"ai":""} ${t.state==="sug"?"sug":""}">${t.t}</span>
       <div class="src ${t.src==="ai"?"ai":""}">${t.state==="sug"?"Suggested · ":""}${t.src==="ai"?`Doc Agent · <span class="conf">${t.conf.toFixed(2)}</span>`:t.src==="edited"?"Edited by you":"Added by you"}</div></div>
     <div class="why">${t.why}${TAGS[t.t]?`<div style="margin-top:4px">Links to <b>${DOCS.filter(x=>x!==d&&okTags(x).some(y=>y.t===t.t)).length}</b> other docs</div>`:""}</div>
     <div class="btnrow">${t.state==="sug"?`<button class="btn small primary" data-acc="${i}">Accept</button><button class="btn small" data-rej="${i}">Reject</button>`:`<button class="btn small ghost" data-rm="${i}" aria-label="Remove tag ${t.t}">Remove</button>`}</div>
   </div>`).join("");
  const linked=okTags(d).filter(t=>DOCS.some(x=>x!==d&&okTags(x).some(y=>y.t===t.t)));
  const timelines=linked.map(t=>{
    const ds=DOCS.filter(x=>okTags(x).some(y=>y.t===t.t)).sort((a,b)=>a.date.localeCompare(b.date));
    return `<div class="box"><div class="tlhead"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="chip">${t.t}</span><span class="note">${esc(TAGS[t.t]?.d||"")}</span></div><button class="btn small" data-maptag="${t.t}">Show on map</button></div>
     <div class="tlbody timeline">${ds.map(x=>`<div class="tl ${x===d?"me":""}"><span class="d">${fmt(x.date).replace(", 2026","").replace(", 2027"," '27")}</span><span class="rail"><i style="background:${tcol(x.type)}"></i></span><span class="x"><button data-go="${x.id}">${esc(x.title)}</button><small>${TYPES[x.type].label} · ${STATUS[x.status]}${x===d?" · this doc":""}</small>${x.conflict&&x!==d&&x.status!=="Superseded"?`<span class="cf">▲ ${esc(x.conflict.split(".")[0])}.</span>`:""}</span></div>`).join("")}</div></div>`}).join("");
  $("#wsbody").innerHTML=`
   <div class="section"><div class="btnrow" style="justify-content:space-between"><p class="note">Tags are applied by Doc Agent from the document text, linked tickets and Slack threads. Review suggestions, or add your own. Tags link documents across time.</p>
     <button class="btn" id="rerun">${S.busy.tag===d.id?`<span class="spin"></span> Analyzing…`:"✦ Re-run tagging"}</button></div>
    <div class="box">${rows}
     <div class="addtag"><input id="newtag" list="taglist" placeholder="add_tag" aria-label="Add a tag"><datalist id="taglist">${Object.keys(TAGS).filter(k=>!d.tags.some(t=>t.t===k)).map(k=>`<option value="${k}">`).join("")}</datalist><button class="btn" id="addtag">Add tag</button></div></div></div>
   <div class="section"><h3>Linked documents by tag</h3>${timelines||`<p class="note">No other documents share these tags yet.</p>`}</div>`;
  const w=$("#wsbody");
  w.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.acc){d.tags[+b.dataset.acc].state="ok";toast(`Tag ${d.tags[+b.dataset.acc].t} accepted. Links updated.`);render()}
    else if(b.dataset.rej){const t=d.tags.splice(+b.dataset.rej,1)[0];toast(`Rejected ${t.t}. Doc Agent will learn from this.`);render()}
    else if(b.dataset.rm){const t=d.tags.splice(+b.dataset.rm,1)[0];toast(`Removed ${t.t}`);render()}
    else if(b.dataset.go){S.sel=b.dataset.go;render()}
    else if(b.dataset.maptag){S.view="map";S.mapTag=b.dataset.maptag;render()}
    else if(b.id==="addtag")addTag(d);
    else if(b.id==="rerun"){S.busy.tag=d.id;renderWS();setTimeout(()=>{S.busy.tag=null;const add=(d.rerun||[]).filter(r=>!d.tags.some(t=>t.t===r.t));d.tags.push(...add.map(x=>({...x})));toast(add.length?`Doc Agent suggested ${add.length} new tag${add.length>1?"s":""}`:"No new tags found");render()},1100)}
  });
  $("#newtag").addEventListener("keydown",e=>{if(e.key==="Enter")addTag(d)});
}
function addTag(d){
  const v=$("#newtag").value.trim().toLowerCase().replace(/[^a-z0-9_]+/g,"_").replace(/^_|_$/g,"");
  if(!v)return;if(d.tags.some(t=>t.t===v)){toast("Already tagged");return}
  if(!TAGS[v])TAGS[v]={d:"Custom tag",depts:[]};
  d.tags.push(T(v,"human",null,"Added by you."));toast(`Added ${v}`);render();
}

function tabConditions(d){
  const [m,n]=condStats(d);const list=S.cond[d.id];
  const canPub=m===n&&d.status!=="Published"&&d.status!=="Superseded";
  $("#wsbody").innerHTML=`
   <div class="section"><div class="progress"><div><b style="font-size:15px">${m} of ${n} conditions met</b><div class="note">${TYPES[d.type].label} rules · set by Docs Ops</div></div><div class="bar"><i style="width:${n?m/n*100:0}%"></i></div>
     <button class="btn primary" id="publish" ${canPub?"":"disabled"}>${d.status==="Published"?"Published":"Publish"}</button></div></div>
   <div class="box">${list.map((c,i)=>condRow(d,c,i)).join("")}</div>`;
  const w=$("#wsbody");
  w.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.ck!==undefined){const c=list[+b.dataset.ck];c.on=!c.on;render();return}
    if(b.dataset.act==="supersede"){const ds=supersedeTargets(d);ds.forEach(x=>x.status="Superseded");list.find(c=>c.act==="supersede").on=true;toast(`${ds.length} docs marked superseded and removed from the agent index`);render();return}
    if(b.dataset.act==="conflicts"){conflictTargets(d).forEach(x=>x.status="NeedsUpdate");list.find(c=>c.act==="conflicts").on=true;toast("3 article updates queued for Support");render();return}
    if(b.dataset.goto){S.sel=b.dataset.goto;S.tab=b.dataset.tabto||"content";render();return}
    if(b.dataset.compose){openCompose(d,b.dataset.compose);return}
    if(b.id==="publish"){d.status="Published";toast(`Published: ${d.title}`);render();return}
  });
}
function supersedeTargets(d){return DOCS.filter(x=>x!==d&&["brief","roadmap"].includes(x.type)&&x.date<d.date&&okTags(x).some(t=>t.t==="visibility_rules")&&x.status!=="Superseded")}
function conflictTargets(){return ["d7","d8","d9"].map(i=>BYID[i])}
function condRow(d,c,i){
  const met=condMet(d,c);
  let kind="",act="",extra="";
  if(c.kind==="check"){kind="Manual check"}
  if(c.kind==="llm"){kind="Automatic";const s=llmScore(d.id);extra=`<div class="sub">Current score: <b>${s}</b>. ${s>=80?"Passes.":"Apply proposals in the LLM-ready tab."}</div>`;act=s>=80?"":`<button class="btn small" data-goto="${d.id}" data-tabto="llm">Open LLM-ready</button>`}
  if(c.kind==="auto"){kind="Automatic · needs your confirmation";
    if(c.act==="supersede"){const ts=c.on?[]:supersedeTargets(d);extra=c.on?`<div class="sub">Brief (Sep 8) and roadmap snapshot (Oct 6) marked superseded.</div>`:`<div class="sub">Found via tag <span class="chip">visibility_rules</span>: ${ts.map(x=>`<button class="btn small ghost" data-goto="${x.id}" style="padding:0 2px">${esc(x.title)} (${fmt(x.date)})</button>`).join(", ")}</div>`;act=c.on?"":`<button class="btn small" data-act="supersede">Mark ${ts.length} superseded</button>`}
    if(c.act==="conflicts"){extra=`<div class="sub">${c.on?"Queued for Support:":"Doc Agent found 3 public articles that contradict this change:"} ${conflictTargets(d).map(x=>`<button class="btn small ghost" data-goto="${x.id}" style="padding:0 2px">${esc(x.title)}</button>`).join(", ")}</div>`;act=c.on?"":`<button class="btn small" data-act="conflicts">Queue 3 updates</button>`}}
  if(c.kind==="answers"){kind="Automatic";const a=S.confirmed.size,n=LAUNCH.confirm.length;extra=`<div class="sub"><b>${a} of ${n}</b> answered in Confirm with Product. ${a===n?"Passes.":"The questions are at the bottom of the article."}</div>`;act=a===n?"":`<button class="btn small" data-nav="doc:${d.id}:content:${d.id}-confirm">See the questions</button>`}
  if(c.kind==="comms"){kind="Comms";extra=commsBlock(d)}
  return `<div class="cond">
    <button class="check ${met?"on":""}" ${c.kind==="check"?`data-ck="${i}" aria-label="Toggle: ${esc(c.label)}"`:"disabled aria-label='Completed automatically'"} aria-pressed="${met}">${met?"✓":""}</button>
    <div><div class="kind">${kind}</div><b>${esc(c.label)}</b>${c.sub?`<div class="sub">${esc(c.sub)}</div>`:""}${c.kind!=="comms"?extra:""}</div>
    <div class="act">${act}</div>
    ${c.kind==="comms"?extra:""}
  </div>`;
}
function commsBlock(d){
  const deps=depsFor(d);const cm=S.comms[d.id]||{};
  const sent=deps.filter(([n])=>cm[n]?.status==="sent").length;
  return `<div class="comms">
   <div class="btnrow" style="justify-content:space-between"><span class="note">Affected departments, detected from tags. Each team gets its own message, drafted from that team's template.</span><span class="note mono">${sent}/${deps.length} sent</span></div>
   ${deps.map(([n,t])=>{const c=cm[n];const st=!c?"Not drafted":c.status==="sent"?"✓ Sent "+c.at:c.edited?"Draft saved · edited":"Draft saved";
     return `<div class="deptrow"><div class="who"><b>${n}</b><span class="chip">${DEPT_META[n].ch}</span><span class="note mono" title="Detected from this tag">← ${t}</span><span class="st ${c?c.status:""}">${st}</span></div>
      <button class="btn small ${c?.status==="sent"?"":"primary"}" data-compose="${n}">${!c?"✦ Draft message":c.status==="sent"?"View sent":"Edit draft"}</button></div>`}).join("")}
  </div>`;
}
function draftParts(d,n){
  const tpl=TEMPLATES[VARS[d.id]?n:"_generic"];const txt=fill(tpl,varsFor(d));
  const m=txt.match(/^Subject:\s*(.*)\n\n?([\s\S]*)$/);
  return m?{subject:m[1],body:m[2]}:{subject:d.title,body:txt};
}
let MODAL=null;
function openCompose(d,n){
  const c=S.comms[d.id]?.[n];
  MODAL={d,n,gen:!c,subject:c?.subject||"",body:c?.body||""};
  renderModal();
  if(!c){setTimeout(()=>{if(!MODAL||MODAL.n!==n)return;Object.assign(MODAL,draftParts(d,n),{gen:false});renderModal()},900)}
}
function closeModal(){MODAL=null;$("#modalroot").innerHTML="";}
function renderModal(){
  if(!MODAL){closeModal();return}
  const {d,n,gen}=MODAL;const meta=DEPT_META[n];const c=S.comms[d.id]?.[n];const sent=c?.status==="sent";
  const tplName=VARS[d.id]?meta.tpl:"Doc ready → any team v1";
  const raw=esc(TEMPLATES[VARS[d.id]?n:"_generic"]).replace(/\{\{(\w+)\}\}/g,'<span class="var">{{$1}}</span>');
  $("#modalroot").innerHTML=`<div class="overlay" id="ovl"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle">
   <header><div><h2 id="mtitle">Message to ${n}</h2><p class="note">${esc(d.title)} · Template: ${tplName}</p></div><button class="btn small ghost" id="mclose" aria-label="Close">✕</button></header>
   <div class="mbody">
    <div class="field"><label>To</label><div class="to"><span class="chip">${meta.ch}</span>${sent?`<span class="st sent">✓ Sent ${c.at}</span>`:""}</div></div>
    ${gen?`<div class="genline"><span class="spin"></span> Drafting from the ${n} template with this document's details…</div>`:`
    <div class="field"><label for="msubj">Subject</label><input id="msubj" value="${esc(MODAL.subject)}" ${sent?"readonly":""}></div>
    <div class="field"><label for="mbodyta">Message</label><textarea id="mbodyta" ${sent?"readonly":""}>${esc(MODAL.body)}</textarea></div>`}
    <details class="tpl"><summary>View template</summary><pre>${raw}</pre></details>
   </div>
   <footer>${sent?`<span class="note">Sent messages can't be edited.</span><div class="btnrow"><button class="btn" id="mcopy">Copy</button><button class="btn primary" id="mdone">Close</button></div>`:
    `<button class="btn ghost" id="mregen" ${gen?"disabled":""}>↻ Regenerate from template</button><div class="btnrow"><button class="btn" id="mcancel">Cancel</button><button class="btn" id="msave" ${gen?"disabled":""}>Save draft</button><button class="btn primary" id="msend" ${gen?"disabled":""}>Send to ${meta.ch}</button></div>`}</footer>
  </div></div>`;
  const ovl=$("#ovl");
  ovl.addEventListener("click",e=>{
    if(e.target===ovl){closeModal();return}
    const b=e.target.closest("button");if(!b)return;
    const grab=()=>{const s=$("#msubj"),t=$("#mbodyta");if(s){MODAL.subject=s.value;MODAL.body=t.value}};
    const store=status=>{grab();const base=draftParts(d,n);S.comms[d.id]=S.comms[d.id]||{};
      S.comms[d.id][n]={subject:MODAL.subject,body:MODAL.body,status,edited:MODAL.subject!==base.subject||MODAL.body!==base.body,at:status==="sent"?new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):undefined}};
    if(b.id==="mclose"||b.id==="mcancel"||b.id==="mdone"){closeModal()}
    else if(b.id==="mregen"){MODAL.gen=true;renderModal();setTimeout(()=>{if(!MODAL)return;Object.assign(MODAL,draftParts(d,n),{gen:false});renderModal();toast("Draft regenerated from template")},700)}
    else if(b.id==="msave"){store("draft");closeModal();toast(`Draft for ${n} saved`);render()}
    else if(b.id==="msend"){store("sent");closeModal();toast(`Sent to ${meta.ch}`);render()}
    else if(b.id==="mcopy"){const txt="Subject: "+MODAL.subject+"\n\n"+MODAL.body;navigator.clipboard?.writeText(txt).then(()=>toast("Copied")).catch(()=>{$("#mbodyta")?.select();toast("Selected. Press Ctrl+C to copy")})}
  });
  const f=$("#msubj")||$("#mclose");f&&f.focus();
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&MODAL)closeModal()});

function tabLLM(d){
  const L=LLM[d.id]||genericLLM(d);const st=S.llm[d.id];const sc=llmScore(d.id);
  const max=Math.min(100,L.base+L.props.reduce((a,p)=>a+p.pts,0));
  const col=sc>=80?"var(--ok)":sc>=60?"var(--warn)":"var(--bad)";
  const checks=L.checks.map(([l,v,by])=>{const ok=v||(by&&st.acc.has(by));return `<div><span class="ck ${ok?"y":"n"}">${ok?"✓":"✗"}</span><span>${l}</span></div>`}).join("");
  $("#wsbody").innerHTML=`
   <div class="box scorebox">
    <div class="score"><div class="ring" style="--p:${sc};--sc:${col}"><span>${sc}</span></div><div><b>Retrieval score</b><div class="note">Projected ${max} with all changes</div></div></div>
    <div><p class="note" style="margin-bottom:8px">How reliably the AI support agent can find and quote the right answer from this doc. Target: 80.</p><div class="checks">${checks}</div></div>
   </div>
   <div class="section"><div class="btnrow" style="justify-content:space-between"><h3>Proposed structure changes</h3>${L.props.some(p=>!st.acc.has(p.id)&&!st.skip.has(p.id))?`<button class="acc" id="applyall">✓ Accept all</button>`:""}</div>
    ${L.props.map(p=>`<div class="prop ${st.acc.has(p.id)?"done":""} ${st.skip.has(p.id)?"skip":""}"><header><div><b>${esc(p.title)} <small>+${p.pts}</small></b><p>${esc(p.why)}</p></div><div class="btnrow">${st.acc.has(p.id)?`<span class="applied">✓ Applied</span><button class="rej" data-undo="${p.id}">Revert</button>`:st.skip.has(p.id)?`<span class="note">Rejected</span><button class="rej" data-undo="${p.id}">Undo</button>`:`<button class="acc" data-accp="${p.id}">✓ Accept</button><button class="rej" data-skip="${p.id}">✕ Reject</button>`}</div></header>
     <div class="diff"><div class="b">${esc(p.before)}</div><div class="a">${esc(p.after)}</div></div></div>`).join("")}
   </div>
   <div class="section"><h3>Test questions</h3><p class="note">Questions from real tickets and internal asks, run against this doc by the support agent.</p>
    <div class="box tablewrap"><table class="qa"><thead><tr><th>Question</th><th>Now</th><th>After changes</th></tr></thead><tbody>
     ${L.qs.map(([q,before,need])=>{const ok=need.length===0||need.every(x=>st.acc.has(x));const was=need.length===0;return `<tr><td>${esc(q)}</td><td><span class="ans ${was?"y":before.startsWith("Partly")||before.startsWith("Vague")||before.startsWith("Ambig")?"p":"n"}">${was?"✓":"✗"} ${esc(before)}</span></td><td><span class="ans ${ok?"y":"n"}">${ok?"✓ Answered correctly":"✗ Apply "+need.filter(x=>!st.acc.has(x)).map(x=>`“${L.props.find(p=>p.id===x).title}”`).join(", ")}</span></td></tr>`}).join("")}
    </tbody></table></div></div>
   <div class="section"><h3>LLM-ready version</h3>${st.acc.size?`<pre class="out">${esc(L.out)}</pre><p class="note">Saved as a separate retrieval copy. The merchant-facing article keeps its layout.</p>`:`<p class="note">Apply at least one change to preview the restructured version.</p>`}</div>`;
  $("#wsbody").addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.accp){st.acc.add(b.dataset.accp);st.skip.delete(b.dataset.accp);render()}
    else if(b.dataset.skip){st.skip.add(b.dataset.skip);render()}
    else if(b.dataset.undo){st.acc.delete(b.dataset.undo);st.skip.delete(b.dataset.undo);render()}
    else if(b.id==="applyall"){L.props.forEach(p=>{if(!st.skip.has(p.id))st.acc.add(p.id)});toast(`Applied. Score ${llmScore(d.id)}`);render()}
  });
}

/* ---------- map ---------- */
function relatedDocs(d){const mine=new Set(d.tags.map(t=>t.t));return DOCS.filter(x=>x!==d&&x.tags.some(t=>mine.has(t.t))).map(x=>({d:x,shared:x.tags.filter(t=>mine.has(t.t)).map(t=>t.t)})).sort((a,b)=>b.shared.length-a.shared.length||b.d.date.localeCompare(a.d.date))}
function layout(DOCS,tagOK){
  const nodes=[],idx={};
  const tags=Object.keys(TAGS).filter(t=>(!tagOK||tagOK.has(t))&&DOCS.some(d=>d.tags.some(x=>x.t===t)));
  tags.forEach((t,i)=>{const a=i/tags.length*Math.PI*2;idx["t:"+t]=nodes.length;nodes.push({id:"t:"+t,kind:"tag",t,x:Math.cos(a)*160,y:Math.sin(a)*160,vx:0,vy:0})});
  DOCS.forEach((d,i)=>{const a=i/DOCS.length*Math.PI*2+.3;idx[d.id]=nodes.length;nodes.push({id:d.id,kind:"doc",d,x:Math.cos(a)*320,y:Math.sin(a)*320,vx:0,vy:0})});
  const edges=[];DOCS.forEach(d=>d.tags.forEach(t=>{if(idx["t:"+t.t]!==undefined)edges.push({s:idx[d.id],t:idx["t:"+t.t],sug:t.state==="sug",tag:t.t,doc:d.id})}));
  for(let it=0;it<500;it++){
    const k=1-it/500;
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j];let dx=a.x-b.x,dy=a.y-b.y,dd=dx*dx+dy*dy+.01;const f=7000/dd;const dist=Math.sqrt(dd);
      a.vx+=dx/dist*f;a.vy+=dy/dist*f;b.vx-=dx/dist*f;b.vy-=dy/dist*f}
    edges.forEach(e=>{const a=nodes[e.s],b=nodes[e.t];const dx=b.x-a.x,dy=b.y-a.y,dist=Math.sqrt(dx*dx+dy*dy)+.01;const f=(dist-(e.sug?150:110))*.035;a.vx+=dx/dist*f;a.vy+=dy/dist*f;b.vx-=dx/dist*f;b.vy-=dy/dist*f});
    nodes.forEach(n=>{n.vx-=n.x*.006;n.vy-=n.y*.006;n.x+=Math.max(-20,Math.min(20,n.vx))*k;n.y+=Math.max(-20,Math.min(20,n.vy))*k;n.vx*=.5;n.vy*=.5});
  }
  return {nodes,edges};
}
function focusLayout(F,REL){
  // Concentric rings by contextual proximity: more shared tags = closer to the doc.
  const tagList=F.tags.map(t=>t.t).filter(t=>TAGS[t]);
  const nodes=[{kind:"doc",d:F,x:0,y:0,rank:0}],idx={};
  const tagCount=t=>REL.filter(r=>r.shared.includes(t)).length;
  tagList.sort((a,b)=>tagCount(b)-tagCount(a));
  const TR=105;
  tagList.forEach((t,i)=>{const a=-Math.PI/2+i/tagList.length*Math.PI*2;idx[t]=nodes.length;nodes.push({kind:"tag",t,x:Math.cos(a)*TR,y:Math.sin(a)*TR,a,rank:1})});
  const levels=[...new Set(REL.map(r=>r.shared.length))].sort((a,b)=>b-a);
  const rings=levels.map((s,li)=>({s,r:205+li*92}));
  rings.forEach(({s,r},li)=>{
    const group=REL.filter(x=>x.shared.length===s).map(x=>{let sx=0,sy=0;x.shared.forEach(t=>{const n=nodes[idx[t]];if(n){sx+=Math.cos(n.a);sy+=Math.sin(n.a)}});return {x,want:Math.atan2(sy,sx)}}).sort((a,b)=>a.want-b.want);
    const n=group.length,step=2*Math.PI/Math.max(n,1);
    let cx=0,cy=0;group.forEach((g,i)=>{cx+=Math.cos(g.want-i*step);cy+=Math.sin(g.want-i*step)});
    const off=n?Math.atan2(cy,cx)+li*.35:0;
    const angs=group.map((g,i)=>off+i*step);
    group.forEach((g,i)=>{const a=angs[i];nodes.push({kind:"doc",d:g.x.d,shared:g.x.shared,x:Math.cos(a)*r,y:Math.sin(a)*r,rank:2+li})});
    const all=nodes.filter(q=>q.kind==="doc"&&q.d!==F).map(q=>Math.atan2(q.y,q.x)).sort((a,b)=>a-b);
    let best=-Math.PI/2,bg=-1;all.forEach((a,i)=>{const b=i+1<all.length?all[i+1]:all[0]+2*Math.PI;if(b-a>bg){bg=b-a;best=(a+b)/2}});
    rings[li].la=all.length?best+li*.12:-Math.PI/2;
  });
  const edges=[];nodes.forEach((n,i)=>{if(n.kind!=="doc")return;n.d.tags.forEach(t=>{if(idx[t.t]!==undefined)edges.push({s:i,t:idx[t.t],sug:t.state==="sug",tag:t.t,doc:n.d.id})})});
  return {nodes,edges,rings};
}
function renderMap(){
  const F=S.mapDoc?BYID[S.mapDoc]:null;const REL=F?relatedDocs(F):null;
  const {nodes,edges,rings}=F?focusLayout(F,REL):layout(DOCS,null);
  const willAnim=F&&S.mapAnim&&!matchMedia("(prefers-reduced-motion: reduce)").matches;if(!willAnim)S.mapAnim=false;
  const ghosts=willAnim?DOCS.filter(d=>d!==F&&!REL.some(r=>r.d===d)):[];
  const xs=nodes.map(n=>n.x),ys=nodes.map(n=>n.y);const pad=F?60:70;
  let minX=Math.min(...xs)-pad,maxX=Math.max(...xs)+pad,minY=Math.min(...ys)-pad-12,maxY=Math.max(...ys)+pad;
  if(rings&&rings.length){const R=rings[rings.length-1].r+30;minX=Math.min(minX,-R);maxX=Math.max(maxX,R);minY=Math.min(minY,-R);maxY=Math.max(maxY,R)}
  const sel=S.mapTag;const docSet=new Set(sel?DOCS.filter(d=>d.tags.some(t=>t.t===sel)).map(d=>d.id):[]);
  const cnt=t=>DOCS.filter(d=>okTags(d).some(x=>x.t===t)).length;
  const P=n=>`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`;
  const svg=`<svg viewBox="${minX} ${minY} ${maxX-minX} ${maxY-minY}" role="img" aria-label="${F?"Documents related to "+esc(F.title)+", closer means more shared tags":"Tag cluster map of documents"}">
    ${rings?rings.map(g=>`<g class="ring"><circle cx="0" cy="0" r="${g.r}" fill="none" stroke="var(--muted)" stroke-opacity=".35" stroke-dasharray="3 5"/><g transform="translate(${(Math.cos(g.la)*g.r).toFixed(1)} ${(Math.sin(g.la)*g.r).toFixed(1)})"><g class="nz"><text y="3" text-anchor="middle">${g.s} shared tag${g.s>1?"s":""}</text></g></g></g>`).join(""):""}
    ${edges.map((e,j)=>{const a=nodes[e.s],b=nodes[e.t];const on=sel&&e.tag===sel;return `<line data-e="${j}" class="edge ${e.sug?"sug":""} ${on?"hl":""} ${sel&&!on?"dim":""}" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"/>`}).join("")}
    ${ghosts.map(d=>`<g class="ghost" data-ghost="1"><rect style="transform:scale(var(--k,1))" x="-7" y="-7" width="14" height="14" rx="4" fill="${tcol(d.type)}"/></g>`).join("")}
    ${nodes.map((n,i)=>{if(n.kind==="tag"){const c=cnt(n.t);const r=F?5+Math.min(c,8)*1.1:6+c*2.2;const dim=sel&&n.t!==sel;return `<g class="node tnode ${dim?"dim":""}" data-k="${i}" data-tag="${n.t}" transform="${P(n)}" tabindex="0" role="button" aria-label="Tag ${n.t}"><g class="nz"><circle r="${r}" fill="var(--tag-bg)" stroke="${n.t===sel?"var(--accent)":"var(--muted)"}" stroke-width="${n.t===sel?2.5:1}"/><text y="${r+12}" text-anchor="middle">${n.t}</text></g></g>`}
      const d=n.d;const dim=sel&&!docSet.has(d.id);const sup=d.status==="Superseded";const me=F&&d===F;const z=me?13:8;
      return `<g class="node ${dim?"dim":""}" data-k="${i}" data-doc="${d.id}" transform="${P(n)}" tabindex="0" role="button" aria-label="${esc(d.title)}${n.shared?", "+n.shared.length+" shared tags":""}"><g class="nz">${me?`<rect x="${-z-5}" y="${-z-5}" width="${2*z+10}" height="${2*z+10}" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>`:""}<rect x="${-z}" y="${-z}" width="${2*z}" height="${2*z}" rx="4" fill="${sup?"var(--panel)":tcol(d.type)}" stroke="${tcol(d.type)}" stroke-width="2"/>${d.conflict&&!sup?`<circle cx="9" cy="-9" r="4" fill="var(--warn)"/>`:""}<text y="${me?z+22:-z-6}" text-anchor="middle" ${me?'style="font-weight:700;font-size:12px"':""}>${esc(d.title.length>26?d.title.slice(0,24)+"…":d.title)}</text></g></g>`}).join("")}
  </svg>`;
  const clusters=Object.keys(TAGS).map(t=>[t,cnt(t)]).filter(x=>x[1]>1).sort((a,b)=>b[1]-a[1]);
  let side;
  if(sel){
    const ds=DOCS.filter(d=>d.tags.some(t=>t.t===sel)).sort((a,b)=>a.date.localeCompare(b.date));
    side=`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h2>${sel}</h2><button class="btn small" id="clearmap">Clear</button></div>
     <p class="note">${esc(TAGS[sel]?.d||"")}</p>
     <div><div class="note" style="margin-bottom:6px">Notifies when a linked doc changes</div><div class="depts">${(TAGS[sel]?.depts||[]).map(x=>`<span class="chip">${x}</span>`).join("")||"<span class='note'>None</span>"}</div></div>
     <div class="timeline">${ds.map(x=>{const s=x.tags.find(t=>t.t===sel).state==="sug";return `<div class="tl"><span class="d">${fmt(x.date).replace(", 2026","").replace(", 2027"," '27")}</span><span class="rail"><i style="background:${tcol(x.type)}"></i></span><span class="x"><button data-open="${x.id}">${esc(x.title)}</button><small>${TYPES[x.type].label} · ${STATUS[x.status]}${s?" · suggested link":""}</small>${x.conflict&&x.status!=="Superseded"?`<span class="cf">▲ conflict</span>`:""}</span></div>`}).join("")}</div>
     <button class="btn" data-filter="${sel}">Open these ${ds.length} in the library</button>`;
  }else if(F){
    side=`<div class="btnrow" style="justify-content:space-between"><button class="btn small" id="backdoc">← Back to document</button><button class="btn small ghost" id="fullmap">Full map</button></div>
     <div><div class="note">Related to</div><h2 style="font-family:var(--serif);font-size:20px;font-weight:500;margin-top:2px">${esc(F.title)}</h2><p class="note" style="margin-top:6px">${REL.length} documents share at least one tag with this one, ranked by how many tags they share. Select a tag on the map to narrow it down.</p></div>
     <div>${REL.map(r=>`<div class="cluster" style="align-items:flex-start"><div style="display:flex;flex-direction:column;gap:4px;min-width:0"><button data-open="${r.d.id}" style="font-weight:600;line-height:1.3">${esc(r.d.title)}</button><span class="note" style="font-size:12px"><i class="dot" style="background:${tcol(r.d.type)}"></i> ${TYPES[r.d.type].label} · ${fmt(r.d.date)} · ${STATUS[r.d.status]}</span>${r.d.conflict&&r.d.status!=="Superseded"?`<span class="cf" style="font-size:12px;color:var(--warn)">▲ ${esc(r.d.conflict.split(".")[0])}.</span>`:""}<span class="tags" style="display:flex;gap:4px;flex-wrap:wrap">${r.shared.map(t=>`<span class="chip">${t}</span>`).join("")}</span></div><span class="mono note" title="Shared tags">${r.shared.length}</span></div>`).join("")}</div>`;
  }else{
    side=`<div><h2 style="font-family:var(--ui);font-weight:600">Tag map</h2><p class="note" style="margin-top:4px">Documents (squares) connect to the tags Doc Agent applied (circles). Docs that share tags pull into clusters, so a brief, its scope change and the articles it affects sit together. Dashed lines are suggestions waiting for review.</p></div>
     <div><h3 class="note" style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin-bottom:4px">Largest clusters</h3>${clusters.map(([t,c])=>`<div class="cluster"><button data-pick="${t}"><span class="chip">${t}</span></button><span class="mono note">${c} docs</span></div>`).join("")}</div>`;
  }
  $("#main").innerHTML=crumbs(F?["Tag map","Related to "+esc(F.title)]:["Tag map"])+`<div class="map"><div class="canvas">${svg}<div class="hint">${F?`Related documents for <b>${esc(F.title)}</b>. `:""}Select a tag or document. Superseded docs are hollow. <b style="color:var(--warn)">●</b> = conflict.</div>
    <div class="legend">${Object.entries(TYPES).map(([k,v])=>`<span><i class="dot" style="background:${tcol(k)}"></i>${v.label}</span>`).join("")}</div></div>
    <aside class="mapside">${side}</aside></div>`;
  const fitK=()=>{const sv=$("#main svg");if(!sv||!sv.clientWidth)return;const k=Math.pow(Math.min(3,Math.max(1,Math.max((maxX-minX)/sv.clientWidth,(maxY-minY)/sv.clientHeight))),.75);sv.style.setProperty("--k",k.toFixed(3))};fitK();
  if(!window.__mapResize){window.__mapResize=true;addEventListener("resize",()=>{if(S.view==="map")renderMap()})}
  if(F&&S.mapAnim){S.mapAnim=false;animateFocus(nodes,edges,ghosts.length,minX,maxX,minY,maxY)}
  const pick=t=>{S.mapTag=S.mapTag===t?"":t;renderMap()};
  $("#main svg").addEventListener("click",e=>{const g=e.target.closest(".node");if(!g)return;if(g.dataset.tag)pick(g.dataset.tag);else{S.view="library";S.sel=g.dataset.doc;S.tab="tags";render()}});
  $("#main svg").addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const g=e.target.closest(".node");if(!g)return;e.preventDefault();g.dispatchEvent(new MouseEvent("click",{bubbles:true}))});
  $(".mapside").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.pick)pick(b.dataset.pick);else if(b.id==="clearmap")pick("");
    else if(b.id==="backdoc"){S.view="library";S.sel=F.id;render()}
    else if(b.id==="fullmap"){S.mapDoc="";S.mapTag="";render()}
    else if(b.dataset.open){S.view="library";S.sel=b.dataset.open;S.tab=F?"content":"tags";render()}
    else if(b.dataset.filter){S.view="library";S.fTag=b.dataset.filter;S.fType="";render()}});
}

function animateFocus(nodes,edges,nGhost,minX,maxX,minY,maxY){
  const svg=$("#main svg");if(!svg)return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const els=nodes.map((n,i)=>svg.querySelector(`[data-k="${i}"]`));
  const lines=edges.map((e,j)=>svg.querySelector(`[data-e="${j}"]`));
  const gEls=[...svg.querySelectorAll("[data-ghost]")];
  const rings=[...svg.querySelectorAll(".ring")];
  const W=maxX-minX,H=maxY-minY,R=Math.max(W,H)*.62;
  const rnd=(i,k)=>{const v=Math.sin((i+1)*12.9898+k*78.233)*43758.5453;return v-Math.floor(v)};
  // every body: starts piled at the centre, bursts to a random scatter point, then springs to its home
  const bodies=nodes.map((n,i)=>{const a=rnd(i,1)*Math.PI*2,r=R*(.45+rnd(i,2)*.55);
    return {x:0,y:0,sx:Math.cos(a)*r,sy:Math.sin(a)*r,tx:n.x,ty:n.y,vx:0,vy:0,delay:n.rank===0?0:180+n.rank*110+rnd(i,3)*140,el:els[i],txt:els[i]?.querySelector("text"),settled:false}});
  const ghosts=gEls.map((el,i)=>{const a=rnd(i+50,1)*Math.PI*2;return {el,a,r:R*(.35+rnd(i+50,2)*.3)}});
  lines.forEach(l=>{l&&(l.style.opacity=0)});rings.forEach(r=>r.style.opacity=0);
  bodies.forEach(b=>{if(b.txt)b.txt.style.opacity=0});
  const T0=performance.now(),BURST=420;let last=T0;
  const ease=t=>1-Math.pow(1-t,3);
  function frame(now){
    const t=now-T0,dt=Math.min(32,now-last)/1000;last=now;let moving=false;
    // ghosts: unrelated docs fly outwards and fade
    ghosts.forEach(g=>{const p=Math.min(1,t/900);const r=g.r*ease(Math.min(1,t/BURST))+p*R*.5;g.el.setAttribute("transform",`translate(${(Math.cos(g.a)*r).toFixed(1)} ${(Math.sin(g.a)*r).toFixed(1)})`);g.el.style.opacity=Math.max(0,.9-p)});
    bodies.forEach(b=>{
      if(!b.el)return;
      if(t<BURST){const e=ease(t/BURST);b.x=b.sx*e;b.y=b.sy*e;b.el.style.opacity=Math.min(1,.3+t/BURST)}
      else if(t<BURST+b.delay){/* hang in the scatter */}
      else{const k=150,c=15;const ax=-k*(b.x-b.tx)-c*b.vx,ay=-k*(b.y-b.ty)-c*b.vy;b.vx+=ax*dt;b.vy+=ay*dt;b.x+=b.vx*dt;b.y+=b.vy*dt}
      const far=Math.hypot(b.x-b.tx,b.y-b.ty)+Math.hypot(b.vx,b.vy)*.05;
      if(t>BURST+b.delay&&far<.6){b.x=b.tx;b.y=b.ty;if(!b.settled){b.settled=true;if(b.txt){b.txt.style.transition="opacity .35s";b.txt.style.opacity=1}}}else moving=true;
      b.el.setAttribute("transform",`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`);
    });
    edges.forEach((e,j)=>{const l=lines[j];if(!l)return;const a=bodies[e.s],b=bodies[e.t];l.setAttribute("x1",a.x.toFixed(1));l.setAttribute("y1",a.y.toFixed(1));l.setAttribute("x2",b.x.toFixed(1));l.setAttribute("y2",b.y.toFixed(1));const s=Math.min(1,Math.max(0,(t-BURST-a.delay)/500));l.style.opacity=s});
    rings.forEach((r,i)=>r.style.opacity=Math.min(1,Math.max(0,(t-BURST-200-i*120)/500)));
    if(moving||t<1400)requestAnimationFrame(frame);
    else{lines.forEach(l=>l&&(l.style.opacity=""));rings.forEach(r=>r.style.opacity="");gEls.forEach(g=>g.remove())}
  }
  requestAnimationFrame(frame);
}

const VIEWS={home:()=>renderOverview(),launch:()=>renderLaunch(),health:()=>renderHealth(),answers:()=>renderAnswers(),questions:()=>renderQuestions(),changes:()=>renderChanges(),gaps:()=>renderGaps(),map:()=>renderMap(),doc:()=>renderDoc()};
const TITLES={home:"Overview",launch:"Launch · Visibility Rules",health:"Help-centre health",answers:"One answer per question",questions:"Questions log",changes:"Releases and changes",gaps:"Gap index",map:"Tag map"};
let LASTV="";
function render(){
  if(S.view==="library")S.view="doc";
  if(!VIEWS[S.view])S.view="home";
  document.body.classList.toggle("lens",!!S.lens);
  $("#main").onclick=null;
  renderRail();renderTree();VIEWS[S.view]();
  const key=S.view+":"+(S.view==="doc"?S.sel:"");if(key!==LASTV){LASTV=key;$("#main .page")?.classList.add("enter")}
  document.title=(S.view==="doc"?BYID[S.sel].title:TITLES[S.view])+" · Doc Desk";
  syncHash();
}
