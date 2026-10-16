/* Doc Desk v2 · knowledge-ops modules
   Launch tracker, help-centre health, one answer per question, questions log, releases and changes,
   playbook / escalation / data pages, the gap lens and the gap index.
   Loaded after app.js (uses S, $, esc, ico, IC, render, renderDoc, openCompose …) and before agent.js. */

/* ---------- state ---------- */
Object.assign(S, {
  lens: false, sub: "", launchTab: "plan", gRange: "whole", candFilter: "all", qFilter: "all", homeAll: false, fact: "",
  corr: {}, confirmed: new Set(), hc: {}, ans: {}, logged: [], run: false, escDone: new Set()
});

/* ---------- helpers ---------- */
const TODAY = "2026-10-19";
const asDate = iso => new Date(iso + "T12:00:00");
const fmtShort = iso => { const d = asDate(iso); return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + (d.getFullYear() !== 2026 ? ", " + d.getFullYear() : "") };
const daysFrom = iso => Math.round((asDate(iso) - asDate(TODAY)) / 864e5);
function dueChip(iso, done) {
  if (!iso || done) return "";
  const n = daysFrom(iso);
  if (n > 14) return "";
  const cls = n < 0 ? "over" : n <= 4 ? "soon" : "later";
  const txt = n < 0 ? `${-n} day${n === -1 ? "" : "s"} late` : n === 0 ? "today" : n === 1 ? "tomorrow" : `in ${n} days`;
  return `<span class="due ${cls}">${txt}</span>`;
}
const liveStatus = id => { const d = BYID[id]; return d.status === "Published" && d.conflict ? "NeedsUpdate" : d.status };
const pillS = st => `<span class="pill s-${st}">${STATUS[st] || st}</span>`;
const typeDot = t => `<i class="dot" style="background:${tcol(t)}"></i>`;
const shortTitle = id => HC[id] ? HC[id].code : BYID[id].title.replace(/^(Macro|Escalation): /, "").split(/: | · /)[0];
const CHIP = { d1: "Feature brief", d2: "Roadmap snapshot", d3: "Scope change, Oct 14", d4: "EA help article", d5: "Enablement hub", d6: "GA announcement", d17: "Headless page for CX leads", d20: "Availability macro", d25: "Merchant change log", d27: "Sales guide", d28: "CS guide", d29: "Support guide", d30: "Not covered guide", d31: "Known issue: case and locale", d32: "EA invitation", d33: "GA help article", d34: "EA feedback plan", d35: "GA enablement update" };
const chipName = id => CHIP[id] || shortTitle(id);
const docLink = (id, label) => BYID[id] ? `<button class="lnk" data-nav="doc:${id}">${esc(label || BYID[id].title)}</button>` : "";
const initials = n => esc(String(n).replace(/\(.*?\)/g, "").split(/[\s·+]+/).filter(x => /^[A-Za-zÀ-ÿ]/.test(x)).map(x => x[0]).join("").slice(0, 2).toUpperCase());
const avatar = n => `<span class="av">${initials(n)}</span>`;
const money = k => k >= 1000 ? "$" + (k / 1000).toFixed(2) + "M" : "$" + k + "K";
const plural = (n, w, ws) => `${n} ${n === 1 ? w : (ws || w + "s")}`;
const trunc = (s, n) => s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
const firstNames = s => [...new Set(String(s).split(/,|·|\band\b/).map(x => x.trim()).filter(x => x && !/^you\b/i.test(x)).map(x => x.split(" ")[0]))].join(" and ");
function stackBar(segs, label, cls = "") {
  return `<span class="sbar ${cls}" role="img" aria-label="${esc(label)}">${segs.filter(s => s[0] > 0).map(([n, c, t]) => `<i style="flex:${n};background:${c}" title="${esc(t)}: ${n}"></i>`).join("")}</span>`;
}
const VORDER = ["right", "partial", "outdated", "decide", "wrong", "unrev"];
const VCOL = { right: "var(--ok-bar)", partial: "var(--warn)", outdated: "color-mix(in srgb,var(--warn) 50%,var(--soft))", decide: "var(--accent)", wrong: "var(--bad)", unrev: "var(--muted)" };
const verdictBar = (vs, label) => stackBar(VORDER.map(v => [vs.filter(x => x === v).length, VCOL[v], VERDICT[v].label]), label);
const verdictLegend = vs => `<span class="vleg">${VORDER.filter(v => vs.includes(v)).map(v => `<span><i style="background:${VCOL[v]}"></i>${VERDICT[v].label} <b>${vs.filter(x => x === v).length}</b></span>`).join("")}</span>`;

Object.assign(IC, {
  rocket: '<path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2"/><path d="M9 15l-3-3c1-4 4-8 10-9 0 6-5 9-9 10z"/><circle cx="14.5" cy="9.5" r="1.6"/>',
  pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  answers: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5V14"/><path d="M12 17.5h.01"/>',
  changes: '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M6 8.2v7.6M8.2 6.6c5 .5 7.4 2.5 7.8 3.4M8.2 17.4c5-.5 7.4-2.5 7.8-3.4"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  index: '<path d="M4 6h16M4 12h16M4 18h10"/><circle cx="19" cy="18" r="2"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  play: '<path d="M7 5v14l11-7z"/>',
  bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
  flow: '<path d="M4 7h10M4 12h16M4 17h7"/><path d="m17 4 3 3-3 3"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  playc: '<circle cx="12" cy="12" r="9"/><path d="M10 8.6v6.8l5.4-3.4z"/>'
});

/* ---------- gap lens ---------- */
function gl(...ids) {
  ids = [...new Set(ids.flat().filter(id => id && GAPS[id]))];
  if (!ids.length) return "";
  return `<span class="gl" title="${esc(ids.map(id => id + " · " + GAPS[id].name).join("\n"))}" data-nav="gaps:${ids[0]}">${ico("target", 11)}${ids.map(id => `<b>${id}</b>`).join("")}</span>`;
}
const DOC_GAPS = {
  d1: ["DOC18"], d2: ["DOC18"], d3: ["P16"], d5: ["P16", "DOC18"], d27: ["P16"], d28: ["P16", "P12"], d29: ["P16", "DOC9", "D37"], d30: ["P16"], d7: ["DOC9", "P3"], d8: ["DOC5"], d9: ["DOC8"], d10: ["DOC7", "P6"], d11: ["P18"],
  d13: ["DOC4"], d14: ["P7"], d15: ["DOC2", "DOC3"], d16: ["DOC4", "PR25"], d17: ["DOC8"], d18: ["P1"], d19: ["P6", "P8"], d20: ["DOC9", "D37"],
  d21: ["P1", "P4"], d22: ["P10"], d23: ["P11", "D44", "D36"], d24: ["D38", "D39"], d25: ["D45"], d26: ["P8"]
};
function lensBar() {
  if (!S.lens) return "";
  return `<div class="lensbar" role="status">${ico("target", 15)}<span><b>Gap lens on.</b> Dark badges mark the gap each feature closes. Hover for its name, click for its entry in the index.</span><button class="btn small" data-nav="gaps">Gap index</button><button class="btn small" data-lens="off">Turn off</button></div>`;
}
function setLens(on) {
  S.lens = !!on;
  try { localStorage.setItem("docdesk-lens", S.lens ? "1" : "0") } catch (e) { }
  const sc = $("#main .scroll"), top = sc ? sc.scrollTop : 0;
  render();
  const sc2 = $("#main .scroll"); if (sc2) sc2.scrollTop = top;
  toast(S.lens ? "Gap lens on. Press G to turn it off." : "Gap lens off");
}

/* ---------- navigation ---------- */
function navTo(n) {
  const [v, a, b, c] = String(n).split(":");
  if (v === "agent") {
    openAgent(true);
    if (a === "ask") { const q = SCRIPT[0].q, last = AG.chat.filter(m => m.role === "user").at(-1); if (!last || last.content !== q) ask(q) }
    return;
  }
  let sub = "";
  if (v === "doc") { if (!BYID[a]) return; S.view = "doc"; S.sel = a; S.tab = b || "content"; sub = c || ""; S.recent = [a, ...S.recent.filter(x => x !== a)].slice(0, 3) }
  else if (v === "launch") { S.view = "launch"; const t = a === "pieces" ? "plan" : a; if (LTABS.includes(t)) S.launchTab = t; sub = b || "" }
  else if (v === "demo") { tourStart(a ? Math.max(0, +a - 1) : 0); return }
  else if (v === "questions") { S.view = "questions"; if (["all", "wrong", "peer", "dm", "decide"].includes(a)) S.qFilter = a; else sub = a || "" }
  else if (["home", "health", "answers", "changes", "gaps", "map"].includes(v)) { S.view = v; sub = a || ""; if (v === "map") { S.mapDoc = ""; S.mapTag = "" } }
  else return;
  $("#app").classList.remove("tree-open");
  if (innerWidth <= 1240 && !$("#agentpanel").hidden) openAgent(false);
  render();
  const sc = $("#main .scroll"); if (sc) sc.scrollTop = 0;
  if (innerWidth <= 640) scrollTo(0, 0);
  if (sub) requestAnimationFrame(() => {
    const el = document.getElementById("x-" + sub); if (!el) return;
    el.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1900);
  });
}
document.addEventListener("click", e => {
  const tb = e.target.closest("[data-tour]");
  if (tb && !e.target.closest(".modal")) { e.preventDefault(); tourStart(+tb.dataset.tour || 0); return }
  const l = e.target.closest("[data-lens]");
  if (l) { setLens(l.dataset.lens === "toggle" ? !S.lens : l.dataset.lens === "on"); return }
  const n = e.target.closest("[data-nav]");
  if (n && !e.target.closest(".modal")) { e.preventDefault(); navTo(n.dataset.nav) }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !MODAL && $("#modalroot").innerHTML) { $("#modalroot").innerHTML = ""; return }
  const t = e.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
  if ((e.key === "g" || e.key === "G") && !e.metaKey && !e.ctrlKey && !e.altKey && !$("#modalroot").innerHTML) setLens(!S.lens);
});

/* ---------- workspace nav (sidebar) ---------- */
function navRows() {
  const ids = hcIds(), qs = allQuestions();
  const cnt = (n, hot) => n ? `<span class="cnt ${hot ? "hot" : ""}">${n}</span>` : "";
  const items = [
    ["home", "home", "Overview", ""],
    ["launch", "rocket", "Launch · Visibility Rules", `<span class="cnt">Nov 9</span>`],
    ["health", "pulse", "Help-centre health", cnt(ids.filter(id => BYID[id].status === "NeedsUpdate").length, true)],
    ["answers", "answers", "Answers", cnt(ANSWERS.filter(a => answerStatus(a) !== "decided").length)],
    ["questions", "question", "Questions log", cnt(qs.filter(q => q.v === "wrong").length, true)],
    ["changes", "changes", "Releases and changes", cnt(CHANGELOG_M.filter(c => c.announced !== "yes").length, true)],
    ["gaps", "target", "Gap index", cnt(Object.keys(GAPS).length)]
  ];
  return items.map(([v, icon, label, c]) => `<button class="trow nav" data-nav="${v}" aria-current="${S.view === v}">${ico(icon, 15)}<span class="tt">${label}</span>${c}</button>`).join("");
}

/* ---------- Overview ---------- */
const hcIds = () => Object.keys(HC).sort((a, b) => HC[a].code.localeCompare(HC[b].code));
const BRIEF = [
  ["B1", "Launch tracker", "Every piece for early access and GA: who it's for, who reviews it, and its draft, review, ready and publish dates.", "launch:plan", () => `${LAUNCH.pieces.length} pieces · Launch → Plan and Schedule`],
  ["B2", "Early-access help article", "For invited merchants, due to Noor for review by Nov 2.", "doc:d4", () => `Show or hide Live Chat on chosen pages · ${STATUS[BYID.d4.status]}`],
  ["B3", "Enablement for Sales, CS and Support", "What's in, what's out, how to talk about it, and what to tell merchants who won't be covered.", "doc:d5", () => "Hub, three team guides, a not-covered guide and five messages"],
  ["B4", "Confirm with Product, keep docs in step", "What Product must confirm before anything is published, and what happens if the plan changes again.", "launch:confirm", () => `${LAUNCH.confirm.length} questions, also at the bottom of the article · where each fact lives`]
];
function renderOverview() {
  const att = DOCS.filter(attention), ids = hcIds(), sch = scheduledPieces(), late = latePieces(), rd = launchReadiness();
  const pass = ids.filter(id => templateScore(id) === TEMPLATE_CHECKS.length).length;
  const needUpd = ids.filter(id => BYID[id].status === "NeedsUpdate").length;
  const circ = ANSWERS.flatMap(a => a.circulation.map(c => c.v));
  const nAns = s => ANSWERS.filter(a => answerStatus(a) === s).length;
  const qs = allQuestions(), peers = qs.filter(q => /peer/.test(q.by));
  const notTold = CHANGELOG_M.filter(c => c.announced !== "yes").length;
  const nGaps = Object.keys(GAPS).length, firstGap = TOUR.findIndex(x => x.ch === "gaps");
  const stepAt = (go, el) => Math.max(0, TOUR.findIndex(x => x.go === go && (!el || x.el === el)));
  const briefStep = { B1: stepAt("launch:plan"), B2: stepAt("doc:d4"), B3: stepAt("doc:d5"), B4: stepAt("doc:d4", "#x-d4-confirm") };
  const sorted = [...DOCS].sort(S.homeSort === "top" ? (a, b) => relatedDocs(b).length - relatedDocs(a).length : S.homeSort === "oldest" ? (a, b) => a.date.localeCompare(b.date) : (a, b) => b.date.localeCompare(a.date));
  const shown = S.homeAll ? sorted : sorted.slice(0, 8);
  const fold = d => { const w = where(d); return `<span class="fold hide-s">${w.folder[1]} ${esc(w.folder[0])}</span>` };
  const row = (d, right) => `<button class="lrow" data-doc="${d.id}"><span class="t">${typeDot(d.type)} ${esc(d.title)}</span><span class="r">${right}</span></button>`;
  $("#main").innerHTML = crumbs(["Live Chat docs", "Overview"]) + `<div class="scroll"><div class="page wide home">
   <div class="titlerow"><h1>Overview</h1><span class="datechip">${ico("cal", 14)} Mon, Oct 19, 2026</span></div>
   <div class="stats" id="x-stats"><div><span>Pages</span><b>${DOCS.length}</b><span class="note">${DOCS.filter(d => d.status === "Published").length} published · ${DOCS.filter(d => ["Draft", "InReview", "Open"].includes(d.status)).length} in progress</span></div><div><span>Need attention</span><b>${att.length}</b><em>conflicts or out of date</em></div><div><span>Launch pieces</span><b>${sch.length}</b>${late.length ? `<em class="bad">${plural(late.length, "piece")} late</em>` : `<span class="note">on schedule</span>`}</div><div><span>Early access</span><b>${daysFrom("2026-11-09")} days</b><span class="note">Nov 9 · GA Jan 11, 2027</span></div></div>
   <div class="demo-box" id="x-demo"><span class="db-i">${ico("play", 14)}</span><div class="db-t"><b>Demo journey</b><span>${TOUR.length} steps: the four parts of the Scenario B brief, then the ${nGaps} gaps and where each one is closed. Use ← and → to move, Esc to leave.</span></div><div class="btnrow"><button class="btn primary" data-tour="0">${ico("play", 12)} Start the demo</button><button class="btn" data-tour="${firstGap}">Start at the gaps</button></div></div>
   <div class="section" id="x-brief"><div class="listhead"><span class="h3">Scenario B, and where each part lives</span></div>
    <div class="box">${BRIEF.map(([k, t, d, go, w]) => `<div class="brow"><span class="bk">${k}</span><button class="bt" data-nav="${go}"><b>${t}</b><small>${d}</small></button><span class="bw">${esc(w())}</span><span class="btnrow"><button class="btn small" data-nav="${go}">Open</button><button class="btn small ghost" data-tour="${briefStep[k]}" title="Show it in the demo">${ico("play", 11)} Demo</button></span></div>`).join("")}</div></div>
   <div class="section" id="x-launch"><div class="listhead"><span class="h3">Launch · Visibility Rules</span><button class="btn small ghost" data-nav="launch:plan">Open the plan ${ico("chev", 12)}</button></div>
    <div class="box lbox"><div class="lb-top"><div class="lb-l"><b>Early access Nov 9 · GA Jan 11, 2027</b><span class="note">${rd.done} of ${rd.n} pieces published · ${rd.pct}% of the way, counting each stage reached</span><span class="bar"><i style="width:${Math.max(rd.pct, 2)}%"></i></span></div>
      <div class="lb-r"><span class="note">Pieces due to publish, by week</span><span class="wkleg"><span><i class="wk-now"></i>Correct the scope</span><span><i class="wk-ea"></i>Early access</span><span><i class="wk-ga"></i>GA</span><span><i class="wk-late"></i>Late</span></span></div></div>
     ${weekBars()}
     <div class="lb-list">${nextUp(5).map(upRow).join("")}</div></div></div>
   <div class="section"><span class="h3">Workspace</span><div class="wsgrid">
    ${wscell("health", "pulse", "Help-centre health", `${pass} of ${ids.length}`, "articles pass the template", templateMatrix(ids), `${needUpd} need updates · ${HC_QUEUE.length} new pages queued`, ["DOC17", "D42"])}
    ${wscell("answers", "answers", "One answer per question", `${circ.length}`, `answers in circulation for ${ANSWERS.length} questions`, verdictBar(circ, "Verdicts on answers in circulation"), `${nAns("proposed")} proposed · ${nAns("waiting")} waiting on Product`, ["DOC9", "P3"])}
    ${wscell("questions", "question", "Questions log", `${qs.filter(q => q.v === "wrong").length} wrong`, `answers to ${qs.length} internal questions`, verdictBar(qs.map(q => q.v), "Verdicts on internal answers"), `${peers.filter(q => q.v === "wrong").length} of ${peers.length} peer answers wrong`, ["P2", "D41"])}
    ${wscell("changes", "changes", "Releases and changes", `${notTold} of ${CHANGELOG_M.length}`, "changes merchants weren't told about", `<span class="dots" role="img" aria-label="${notTold} of ${CHANGELOG_M.length} changes not announced">${CHANGELOG_M.map(c => `<i class="d-${c.announced}" title="${esc(c.date)}: ${esc(c.title)}"></i>`).join("")}</span>`, "LC-1204: no merchant told yet", ["P18", "P7", "D45"])}
   </div></div>
   <div class="section"><span class="h3">Playbooks and data</span><div class="box">${[["d22", "10 checks, timezone first · tested on Fernwood", ["P10"]], ["d23", `Go/no-go Oct 30, in ${daysFrom("2026-10-30")} days`, ["P11", "D44", "D36"]], ["d24", `${DATA_DEFS.length} fields, starting with the first-response clock`, ["D38", "D39"]]].map(([id, sub, g]) => `<button class="lrow" data-nav="doc:${id}"><span class="t">${typeDot(BYID[id].type)} ${esc(BYID[id].title)} ${gl(g)}</span><span class="r">${fold(BYID[id])}<span>${sub}</span></span></button>`).join("")}</div></div>
   <div class="section"><div class="listhead"><span class="h3">Needs attention <span class="note">${att.length}</span></span></div>
    <div class="box">${att.map(d => row(d, `<span class="flag">▲ ${esc(trunc(d.conflict ? d.conflict.split(". ")[0] : "Out of date", 64))}</span>${pillS(d.status)}`)).join("") || `<p class="note" style="padding:12px 16px">Nothing needs attention.</p>`}</div></div>
   <div class="section" id="x-pages"><div class="listhead"><span class="h3">Pages <span class="note">${DOCS.length}</span></span><div class="seg" role="group" aria-label="Sort pages">${[["top", "Most linked"], ["latest", "Latest"], ["oldest", "Oldest"]].map(([k, l]) => `<button data-sort="${k}" aria-pressed="${S.homeSort === k}">${l}</button>`).join("")}</div></div>
    <div class="box">${shown.map(d => row(d, `${fold(d)}${avatar(d.owner)}<span class="hide-s">${plural(relatedDocs(d).length, "link")}</span>${pillS(liveStatus(d.id))}<span class="nowrap">${fmtShort(d.date)}</span>`)).join("")}${sorted.length > 8 ? `<button class="lrow more" data-homeall>${S.homeAll ? "Show fewer" : `Show all ${sorted.length} pages`}</button>` : ""}</div></div>
   <p class="note foot">Prototype with simulated data, built for the Siena Product Specialist case study (Scenario B, Launch in a box). Not a Siena product. Merchant names, people and ticket references come from the confidential case-study pack, so please don't share this link.</p>
  </div></div>`;
  $("#main").onclick = e => {
    const s = e.target.closest("[data-sort]"); if (s) { S.homeSort = s.dataset.sort; renderOverview(); return }
    if (e.target.closest("[data-homeall]")) { S.homeAll = !S.homeAll; renderOverview(); return }
    const r = e.target.closest("[data-doc]"); if (r) openDoc(r.dataset.doc);
  };
}
function wscell(view, icon, title, big, label, viz, sub, gaps) {
  return `<button class="wscell" data-nav="${view}"><span class="ws-h">${ico(icon, 15)}<span>${title}</span></span><span class="ws-n"><b>${big}</b>${gl(gaps)}</span><span class="ws-l">${label}</span><span class="viz">${viz}</span><span class="note">${sub}</span></button>`;
}
/* late pieces first, then what's next; department messages due the same day at the same stage share a row */
function nextUp(k = 5) {
  const out = latePieces().map(p => ({ p, late: pieceLate(p) })), seen = {};
  scheduledPieces().filter(p => !pieceLate(p)).map(p => ({ p, nx: pieceNext(p) })).filter(x => x.nx && daysFrom(x.nx.dt) >= 0)
    .sort((a, b) => a.nx.dt.localeCompare(b.nx.dt) || a.nx.i - b.nx.i)
    .forEach(x => {
      if (pieceKind(x.p) === "comms") { const key = x.nx.dt + ":" + x.nx.i; if (seen[key]) { seen[key].group.push(x.p); return } x.group = [x.p]; seen[key] = x }
      out.push(x);
    });
  return out.slice(0, k);
}
const DEPT_SHORT = { "Customer Success": "CS" };
function upRow(x) {
  const p = x.p, kind = pieceKind(p), at = x.late || x.nx;
  const act = kind === "comms" ? ["Draft", "Review", "Mark ready", "Send"] : kind === "cond" ? ["", "", "", "Done by"] : ["Start the draft", "Send to review", "Mark ready", "Publish"];
  const grp = x.group && x.group.length > 1;
  const name = grp ? `Messages to ${x.group.map(q => DEPT_SHORT[q.comms] || q.comms).join(", ").replace(/, ([^,]*)$/, " and $1")}` : p.piece;
  const sub = grp ? "Department messages, drafted from each team's template" : `${PHASES.find(z => z.k === p.phase).t} · for ${p.aud}`;
  return `<button class="lrow up ${x.late ? "late" : ""}" data-nav="${grp ? "doc:d3:conditions" : pieceTarget(p)}"><span class="t">${typeDot(p.doc ? BYID[p.doc].type : p.comms ? "enable" : "roadmap")} <span class="up-t">${esc(name)}<small>${esc(sub)}</small></span></span><span class="r"><span>${act[at.i]} · ${fmtShort(at.dt)}</span>${x.late ? `<span class="due over">${at.n} day${at.n === 1 ? "" : "s"} late</span>` : dueChip(at.dt) || `<span class="due later">in ${daysFrom(at.dt)} days</span>`}</span></button>`;
}
function templateMatrix(ids) {
  return `<span class="tmx" role="img" aria-label="Template checks passed, per article">${ids.map(id => `<span title="${HC[id].code}: ${templateScore(id)} of 6 checks">${TEMPLATE_CHECKS.map(([k]) => `<i class="${HC[id].template[k] ? "on" : ""}"></i>`).join("")}</span>`).join("")}</span>`;
}
const isoOf = t => `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
/* how many pieces publish each week, from the week of the scope change to GA */
function weekBars() {
  const W0 = asDate("2026-10-12").getTime(), WK = 7 * 864e5, weeks = [];
  for (let k = 0; k < 14; k++) weeks.push({ iso: isoOf(new Date(W0 + k * WK)), n: 0, seg: { late: 0, now: 0, ea: 0, ga: 0 }, done: 0 });
  scheduledPieces().forEach(p => { const k = Math.floor((asDate(p.d[3]).getTime() - W0) / WK); const w = weeks[k]; if (!w) return; w.n++; if (stageIx(p) === 3) w.done++; if (pieceLate(p)) w.seg.late++; else w.seg[p.phase]++ });
  const max = Math.max(...weeks.map(w => w.n)), mark = { "2026-10-19": "Today", "2026-11-09": "Early access", "2027-01-11": "GA" };
  return `<div class="wk" role="img" aria-label="Launch pieces due to publish each week: ${weeks.filter(w => w.n).map(w => `${plural(w.n, "piece")} the week of ${fmtShort(w.iso)}`).join(", ")}">${weeks.map(w => { const m = mark[w.iso]; return `<div class="wk-c ${m ? "mk" : ""} ${w.iso === TODAY ? "now" : ""}" title="Week of ${fmtShort(w.iso)}: ${plural(w.n, "piece")} to publish${w.done ? `, ${w.done} done` : ""}"><span class="wk-n">${w.n || ""}</span><span class="wk-b" style="height:${w.n ? Math.max(4, Math.round(w.n / max * 92)) : 0}px">${["late", "now", "ea", "ga"].filter(k => w.seg[k]).map(k => `<i class="wk-${k}" style="flex:${w.seg[k]}"></i>`).join("")}</span><span class="wk-l">${fmtShort(w.iso).replace(", 2027", "")}${m ? `<b>${m}</b>` : ""}</span></div>` }).join("")}</div>`;
}

/* ---------- Launch ---------- */
const STAGE_NAMES = ["Draft", "Review", "Ready", "Published"];
const PHASES = [
  { k: "now", t: "Correct the scope", s: "Internal enablement · Oct 19–23" },
  { k: "ea", t: "Early access", s: "Nov 9, 2026 · 25 invited merchants" },
  { k: "ga", t: "General availability", s: "Jan 11, 2027 · standard install path" },
  { k: "later", t: "Later", s: "Not scheduled yet" }
];
const LTABS = ["plan", "schedule", "candidates", "corrections", "confirm"];
const STAGE_IX = { NotStarted: -1, NeedsUpdate: 0, Draft: 0, Open: 0, InReview: 1, Ready: 2, Published: 3, Superseded: 3 };
function pieceStage(p) {
  if (p.stage) return p.stage;
  if (p.comms) { const c = (S.comms.d3 || {})[p.comms]; return !c ? "NotStarted" : c.status === "sent" ? "Published" : "Draft" }
  if (p.cond) { const c = (S.cond[p.cond[0]] || []).find(x => x.id === p.cond[1]); return c && c.on ? "Published" : "NotStarted" }
  return p.doc ? BYID[p.doc].status : "NotStarted";
}
const stageIx = p => STAGE_IX[pieceStage(p)] ?? -1;
const pieceKind = p => p.comms ? "comms" : p.cond ? "cond" : p.doc ? "doc" : "none";
const stageLabels = p => pieceKind(p) === "comms" ? ["Drafted", "Review", "Ready", "Sent"] : STAGE_NAMES;
const pieceTarget = p => p.go || (p.comms ? "doc:d3:conditions" : "doc:" + p.doc);
const scheduledPieces = () => LAUNCH.pieces.filter(p => p.d);
function pieceLate(p) {
  if (!p.d) return null; const a = stageIx(p);
  for (let i = 0; i < 4; i++) { const dt = p.d[i]; if (dt && a < i && daysFrom(dt) < 0) return { i, dt, n: -daysFrom(dt) } }
  return null;
}
function pieceNext(p) {
  if (!p.d) return null; const a = stageIx(p);
  for (let i = Math.max(0, a + 1); i < 4; i++) if (p.d[i]) return { i, dt: p.d[i] };
  return null;
}
const latePieces = () => scheduledPieces().filter(pieceLate);
function launchReadiness() {
  const W = [0, .25, .5, .75, 1], sch = scheduledPieces();
  return { pct: Math.round(sch.reduce((a, p) => a + W[stageIx(p) + 1], 0) / sch.length * 100), done: sch.filter(p => stageIx(p) === 3).length, n: sch.length };
}
const shortDate = dt => fmtShort(dt).replace(", 2027", " ’27");
function stepper(p) {
  if (!p.d) return `<span class="stepr none"><em>${esc(p.note || "Not scheduled")}</em></span>`;
  const a = stageIx(p), L = stageLabels(p);
  const node = (i, label) => {
    const dt = p.d[i]; if (!dt) return `<span class="sn skip"><i></i><b>${label}</b><em>—</em></span>`;
    const n = daysFrom(dt), cls = a > i || (a === 3 && i === 3) ? "done" : a === i ? "cur" : n < 0 ? "late" : n === 0 ? "today" : "todo";
    return `<span class="sn ${cls}" title="${esc(label)}: ${fmt(dt)}${cls === "late" ? " · late" : cls === "cur" ? " · current stage" : ""}"><i>${cls === "done" ? "✓" : ""}</i><b>${label}</b><em>${shortDate(dt)}</em></span>`;
  };
  if (pieceKind(p) === "cond") return `<span class="stepr task">${node(3, "Done by")}</span>`;
  return `<span class="stepr">${[0, 1, 2, 3].map(i => node(i, L[i])).join("")}</span>`;
}
function renderLaunch() {
  const tab = LTABS.includes(S.launchTab) ? S.launchTab : (S.launchTab = "plan");
  const openCorr = LAUNCH.corrections.filter(c => corrState(c) !== "done").length;
  const tabs = [["plan", "Plan", scheduledPieces().length], ["schedule", "Schedule", ""], ["candidates", "EA candidates", LAUNCH.accounts.length], ["corrections", "Corrections", openCorr], ["confirm", "Confirm with Product", LAUNCH.confirm.length - S.confirmed.size]];
  const tl = LAUNCH.timeline.map(p => { const n = daysFrom(p.d); return `<div class="tlh k-${p.k} ${n < 0 ? "past" : ""}"><span class="tlh-d">${fmtShort(p.d)}</span><i></i><b>${esc(p.l)}</b>${p.s ? `<small>${esc(p.s)}</small>` : ""}</div>` }).join("");
  $("#main").innerHTML = crumbs(["Live Chat docs", "Launch · Visibility Rules"]) + `<div class="scroll"><div class="page wide">
   <div class="titlerow"><div><div class="eyebrow">Launch tracker · PM Noor Haddad · docs owned by you</div><h1>Visibility Rules</h1>
     <p class="lead">The documentation plan for page rules: early access for 25 merchants on November 9, then everyone on the standard install path on January 11, 2027. Scheduled availability moves to Q1 2027. Headless storefronts aren't in v1.</p></div>
    <button class="btn" data-nav="doc:d3" style="flex:none">${ico("docs", 15)} Noor's Oct 14 plan</button></div>
   <div class="tlwrap" tabindex="0" aria-label="Launch timeline"><div class="tlrow">${tl}</div></div>
   <div class="tabs" role="tablist" aria-label="Launch">${tabs.map(([k, l, n]) => `<button role="tab" data-ltab="${k}" aria-selected="${tab === k}">${l}${n !== "" ? `<span class="badge">${n}</span>` : ""}</button>`).join("")}</div>
   <div id="ltab" class="ltab"></div>
  </div></div>`;
  $("#main").querySelector(".tabs").onclick = e => { const b = e.target.closest("[data-ltab]"); if (b) { S.launchTab = b.dataset.ltab; renderLaunch() } };
  ({ plan: launchPlan, schedule: launchSchedule, candidates: launchCandidates, corrections: launchCorrections, confirm: launchConfirm })[tab]();
  const w = $("#main .tlwrap");
  if (w) {
    const items = [...w.querySelectorAll(".tlh")], ti = items.findIndex(x => x.classList.contains("k-today")), start = items[Math.max(0, ti - 2)];
    const fit = () => { w.classList.toggle("fl", w.scrollLeft > 2); w.classList.toggle("fr", w.scrollLeft + w.clientWidth < w.scrollWidth - 2) };
    if (w.scrollWidth > w.clientWidth + 2 && start) w.scrollLeft = Math.max(0, start.offsetLeft - 6);
    fit(); w.onscroll = fit;
  }
  syncHash();
}
function openPiece(p) { if (p.comms) openCompose(BYID.d3, p.comms); else navTo(pieceTarget(p)) }
function bindPieces(root) {
  root.onclick = e => { const r = e.target.closest("[data-piece]"); if (r && !e.target.closest(".gl")) openPiece(LAUNCH.pieces[+r.dataset.piece]) };
  root.onkeydown = e => { const r = e.target.closest("[data-piece]"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openPiece(LAUNCH.pieces[+r.dataset.piece]) } };
}
function launchPlan() {
  const sch = scheduledPieces(), late = latePieces(), today = sch.filter(p => !pieceLate(p) && pieceNext(p) && daysFrom(pieceNext(p).dt) === 0).length;
  const cnt = k => sch.filter(p => stageIx(p) === k).length;
  const groups = PHASES.map(ph => { const ps = LAUNCH.pieces.map((p, i) => [p, i]).filter(([p]) => p.phase === ph.k); return `<tbody class="ph-${ph.k}"><tr class="grp-row"><td colspan="5"><span class="ph-t">${ph.t}</span><span class="ph-s">${ph.s}</span><span class="ph-n">${plural(ps.length, "piece")}</span></td></tr>${ps.map(([p, i]) => planRow(p, i)).join("")}</tbody>` }).join("");
  $("#ltab").innerHTML = `
   <div class="sumrow"><span><b>${sch.length}</b> scheduled pieces</span><span>${pillS("Published")} ${cnt(3)}</span><span>${pillS("Ready")} ${cnt(2)}</span><span>${pillS("InReview")} ${cnt(1)}</span><span>${pillS("Draft")} ${cnt(0)}</span><span>${pillS("NotStarted")} ${cnt(-1)}</span>${late.length ? `<span class="due over">${plural(late.length, "piece")} late</span>` : ""}${today ? `<span class="due soon">${today} due today</span>` : ""}</div>
   <div class="box tablewrap" id="x-plan"><table class="tbl plan"><thead><tr><th>Piece</th><th>For</th><th>Owner</th><th>Reviewer</th><th id="x-stages">Draft → Review → Ready → Published</th></tr></thead>${groups}</table></div>
   <p class="note">Every help article and enablement piece for early access and GA, from Noor's Oct 14 plan. Dates are when each piece enters a stage: amber is due today, red is late. Department messages count as published once they're sent. Select a row to open the piece.</p>`;
  bindPieces($("#ltab"));
}
function planRow(p, i) {
  const d = p.doc ? BYID[p.doc] : null, kind = pieceKind(p), lt = pieceLate(p);
  const col = d ? tcol(d.type) : kind === "comms" ? "var(--t-enable)" : kind === "cond" ? "var(--t-roadmap)" : "var(--muted)";
  const sub = p.kind || (d ? TYPES[d.type].label : kind === "comms" ? "Department message, from the scope change" : "Not scheduled");
  return `<tr class="click ${lt ? "late" : ""} ${p.d ? "" : "later"}" data-piece="${i}" tabindex="0"><td><div class="pc"><i class="dot" style="background:${col}"></i><div><b>${esc(p.piece)}</b><small class="block">${esc(sub)}${p.note && p.d ? " · " + esc(p.note) : ""}</small></div></div></td><td>${esc(p.aud)}</td><td><span class="who">${avatar(p.owner)}${esc(p.owner)}</span></td><td>${p.rev ? esc(p.rev) : `<span class="muted">—</span>`}</td><td>${stepper(p)}</td></tr>`;
}
const MILESTONES = [["2026-10-23", "EA list", "Early-access candidates to Noor"], ["2026-11-02", "To Noor", "Early-access article to Noor for review"], ["2026-11-09", "EA", "Early access for 25 merchants"], ["2026-12-14", "GA review", "GA comms review"], ["2027-01-11", "GA", "General availability"]];
function launchSchedule() {
  const near = S.gRange === "near", r0 = near ? "2026-10-17" : "2026-10-12", r1 = near ? "2026-11-14" : "2027-01-16";
  const t0 = asDate(r0).getTime(), t1 = asDate(r1).getTime(), X = dt => (asDate(dt).getTime() - t0) / (t1 - t0) * 100, clip = v => Math.max(0, Math.min(100, v));
  const ticks = []; for (let t = asDate(r0); t <= asDate(r1); t = new Date(t.getTime() + 864e5)) if (t.getDay() === 1) ticks.push(new Date(t.getTime()));
  const months = []; for (let t = new Date(asDate(r0).getFullYear(), asDate(r0).getMonth() + 1, 1, 12); t <= asDate(r1); t = new Date(t.getFullYear(), t.getMonth() + 1, 1, 12)) months.push(t);
  const iso = t => `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  const seg = (a, b, cls, label) => { if (!a || !b) return ""; const l = clip(X(a)), w = clip(X(b)) - l; return w > 0 ? `<i class="gs ${cls}" style="left:${l.toFixed(2)}%;width:${w.toFixed(2)}%" title="${label}: ${fmtShort(a)} – ${fmtShort(b)}"></i>` : "" };
  const rowsHTML = PHASES.filter(ph => ph.k !== "later").map(ph => {
    const ps = LAUNCH.pieces.map((p, i) => [p, i]).filter(([p]) => p.phase === ph.k && p.d);
    return `<div class="g-ph"><b>${ph.t}</b><span>${ph.s}</span></div>` + ps.map(([p, i]) => {
      const a = stageIx(p), lt = pieceLate(p), d = p.d, st = k => a > k ? "past" : a === k ? "now" : "next", px = X(d[3]);
      return `<div class="g-row ${lt ? "late" : ""}" data-piece="${i}" tabindex="0"><div class="g-l"><b>${esc(p.piece)}</b><small>${esc(p.aud)}${p.rev ? " · " + esc(p.rev) : ""}</small></div><div class="g-t">${seg(d[0], d[1], "draft " + st(0), "Draft")}${seg(d[1], d[2], "review " + st(1), "Review")}${seg(d[2], d[3], "ready " + st(2), "Ready")}${px >= 0 && px <= 100 ? `<i class="gp ${a === 3 ? "done" : lt ? "late" : ""}" style="left:${px.toFixed(2)}%" title="${pieceKind(p) === "comms" ? "Sent" : "Published"}: ${fmt(d[3])}"></i>` : ""}</div></div>`;
    }).join("");
  }).join("");
  $("#ltab").innerHTML = `
   <div class="listhead"><div class="glegend"><span><i class="gs draft now"></i>Draft</span><span><i class="gs review now"></i>Review</span><span><i class="gs ready now"></i>Ready</span><span><i class="gp done"></i>Published or sent</span><span><i class="gp late"></i>Late</span><span><i class="g-today-k"></i>Today</span></div><div class="seg" role="group" aria-label="Range">${[["whole", "Whole launch"], ["near", "Next four weeks"]].map(([k, l]) => `<button data-grange="${k}" aria-pressed="${(S.gRange || "whole") === k}">${l}</button>`).join("")}</div></div>
   <div class="box gantt" id="x-gantt">
    <div class="g-head"><div class="g-l"><b>Piece</b></div><div class="g-t">${months.map(m => `<span class="g-month" style="left:${clip(X(iso(m))).toFixed(2)}%">${m.toLocaleDateString("en-US", { month: "short" })}${m.getFullYear() === 2027 && m.getMonth() === 0 ? " 2027" : ""}</span>`).join("")}${MILESTONES.filter(([dt]) => X(dt) >= 0 && X(dt) <= 100).map(([dt, l, full]) => `<span class="g-mh" style="left:${X(dt).toFixed(2)}%" title="${esc(full)} · ${fmtShort(dt)}">${l}</span>`).join("")}${ticks.map(t => `<span class="g-tick" style="left:${X(iso(t)).toFixed(2)}%">${t.getDate()}</span>`).join("")}</div></div>
    <div class="g-body">${rowsHTML}
     <div class="g-lines" aria-hidden="true">${MILESTONES.filter(([dt]) => X(dt) >= 0 && X(dt) <= 100).map(([dt]) => `<span class="g-ms" style="left:${X(dt).toFixed(2)}%"></span>`).join("")}<span class="g-today" style="left:${X(TODAY).toFixed(2)}%"><em>Today</em></span></div>
    </div>
   </div>
   <p class="note">The same plan on a timeline. Each bar shows when a piece is in draft, in review and ready, and the dot is the day it publishes or is sent. Select a row to open the piece.</p>`;
  bindPieces($("#x-gantt"));
  $("#ltab").querySelector(".seg").onclick = e => { const b = e.target.closest("[data-grange]"); if (b) { S.gRange = b.dataset.grange; launchSchedule() } };
}
function launchCandidates() {
  const f = S.candFilter || "all", total = LAUNCH.groups.reduce((a, g) => a + g.arr, 0);
  const flagged = LAUNCH.accounts.filter(a => a[5].length).length;
  const accts = LAUNCH.accounts.filter(a => f === "all" || (f === "flagged" ? a[5].length > 0 : a[1] === f));
  const chip = { eligible: "Eligible", pending: "Waiting on Tomás", nonshopify: "Non-Shopify", headless: "Headless" };
  const segs = [["all", "All", LAUNCH.accounts.length], ...LAUNCH.groups.map(g => [g.k, chip[g.k], g.n]), ["flagged", "Flagged", flagged]];
  $("#ltab").innerHTML = `
   <div class="arrhead"><b>31 accounts asked for page rules, holding $3.44M of Live Chat ARR</b><p class="note">From the CRM export of Oct 16. If Tomás confirms that pasted scripts count, the 24 eligible requesters take 24 of the 25 early-access places.</p></div>
   <div class="arrbar" role="img" aria-label="Requesting ARR by group">${LAUNCH.groups.map(g => `<i class="g-${g.k}" style="flex:${g.arr}" title="${esc(g.label)}: $${g.arr.toFixed(2)}M"></i>`).join("")}</div>
   <div class="groups">${LAUNCH.groups.map(g => `<button class="grp g-${g.k} ${f === g.k ? "on" : ""}" data-cf="${g.k}" aria-pressed="${f === g.k}"><span class="grp-l">${esc(g.label)}</span><b>${g.n}<small> accounts</small></b><span class="money">$${g.arr.toFixed(2)}M · ${Math.round(g.arr / total * 100)}% of requesting ARR</span><span class="note">${esc(g.note)}</span></button>`).join("")}</div>
   <div class="section" id="x-checks"><h3>Check the data before invites go out ${gl(LAUNCH.checks.map(c => c.gaps))}</h3><p class="note">Neither the CRM nor the ticket data can be filtered as they are. Each check changes who gets an invite or how demand is counted.</p>
    <div class="checks5">${LAUNCH.checks.map(c => `<div class="dcheck"><div class="dc-h">${ico("warn", 14)}<b>${esc(c.t)}</b>${gl(c.gaps)}</div><p>${esc(c.d)}</p><p class="act"><b>Do:</b> ${esc(c.act)}</p></div>`).join("")}</div></div>
   <div class="section"><div class="listhead"><h3>Accounts that asked</h3><div class="seg" role="group" aria-label="Filter accounts">${segs.map(([k, l, n]) => `<button data-cf="${k}" aria-pressed="${f === k}">${l} <span class="note">${n}</span></button>`).join("")}</div></div>
    <div class="box tablewrap"><table class="tbl"><thead><tr><th>Account</th><th>Group</th><th class="num">Live Chat ARR</th><th>Helpdesk</th><th>Ticket</th><th>Flags</th></tr></thead><tbody>
     ${accts.map(a => `<tr><td><b>${esc(a[0])}</b></td><td><span class="gchip g-${a[1]}">${chip[a[1]]}</span></td><td class="num">${money(a[2])}</td><td>${esc(a[3])}</td><td class="nowrap">${a[4] ? `<span class="mono small">${esc(a[4])}</span>` : `<span class="muted">—</span>`}</td><td class="flags">${a[5].map(([g, t]) => `<div class="aflag">${g ? gl(g) : ""}<span>${esc(t)}</span></div>`).join("") || `<span class="muted">—</span>`}</td></tr>`).join("")}
    </tbody></table></div></div>`;
  $("#ltab").onclick = e => { const b = e.target.closest("[data-cf]"); if (b) { S.candFilter = b.classList.contains("grp") && S.candFilter === b.dataset.cf ? "all" : b.dataset.cf; launchCandidates() } };
}
const corrState = c => S.corr[c.who] || "open";
function launchCorrections() {
  const open = LAUNCH.corrections.filter(c => corrState(c) !== "done").length;
  $("#ltab").innerHTML = `
   <div class="sumrow"><span><b>${open}</b> still out there</span><span><b>${LAUNCH.corrections.length - open}</b> corrected</span><span class="note">Everyone who repeated the old scope after the Oct 14 change, who heard it, and what fixes it. ${gl("P16", "DOC18")}</span></div>
   <div class="corrs">${LAUNCH.corrections.map((c, i) => { const st = corrState(c); const dept = /Sales message/.test(c.fix) ? "Sales" : /Support message/.test(c.fix) ? "Support" : ""; return `<article class="corr ${st}">
     <div class="corr-h"><div class="corr-w">${avatar(c.who)}<div><b>${esc(c.who)}</b><span class="note">${esc(c.where)}</span></div></div>${gl(c.gaps)}<span class="cstate s-${st}">${{ open: "Still out there", drafted: "Correction drafted", done: "✓ Corrected" }[st]}</span></div>
     <blockquote>${esc(c.said)}</blockquote>
     <div class="corr-g"><div><span class="colh">Reached</span><p>${esc(c.reach)}</p></div><div><span class="colh">What's wrong</span><p>${esc(c.wrong)}</p></div><div><span class="colh">Fix</span><p>${esc(c.fix)}</p></div></div>
     <div class="btnrow">${c.doc ? `<button class="btn small" data-nav="doc:${c.doc}">Open the ${c.doc === "d1" ? "brief" : "snapshot"}</button>` : ""}${dept ? `<button class="btn small" data-cdept="${dept}" data-ci="${i}">${ico("spark", 13)} Draft the ${dept} message</button>` : ""}${st !== "done" ? `<button class="btn small primary" data-cdone="${i}">Mark corrected</button>` : `<button class="btn small ghost" data-creopen="${i}">Reopen</button>`}</div></article>` }).join("")}</div>`;
  $("#ltab").onclick = e => {
    const b = e.target.closest("button"); if (!b || b.dataset.nav) return;
    const c = LAUNCH.corrections[+(b.dataset.ci ?? b.dataset.cdone ?? b.dataset.creopen)]; if (!c) return;
    if (b.dataset.cdept) { if (corrState(c) === "open") S.corr[c.who] = "drafted"; openCompose(BYID.d3, b.dataset.cdept) }
    else if (b.dataset.cdone !== undefined) { S.corr[c.who] = "done"; toast(`${c.who.split(" · ")[0]}: marked corrected`); renderLaunch() }
    else if (b.dataset.creopen !== undefined) { S.corr[c.who] = "open"; renderLaunch() }
  };
}

/* where each launch fact is stated, so a change reaches every copy */
const FACTS = [
  { k: "ea", label: "Early access on Nov 9, for 25 merchants", now: /\bNov(ember)? 9\b|\b25 (invited )?merchants|\bFrom November\b/i, old: /\bNov(ember)? 16\b|\b10 merchants\b/i },
  { k: "ga", label: "GA on Jan 11, 2027", now: /\bJan(uary)? 11\b|everyone[^.]{0,24}\bJanuary\b/i, old: /\bDec(ember)? 7\b/i },
  { k: "headless", label: "Headless storefronts aren't in v1", now: /headless[^.]{0,40}(not|n't)[^.]{0,20}(v1|scoped|covered|supported)|n't (support|cover)[^.]{0,24}headless|not (in|scoped for) v1|headless[^.]{0,60}come later/i, old: /every install method/i },
  { k: "sched", label: "Scheduled availability in Q1 2027", now: /scheduled availability[^.]*Q1 2027|after[- ]hours (hiding|scheduling)|hides chat after hours/i, old: null },
  { k: "locale", label: "Locale paths need /*/checkout*", now: /\/\*\/checkout\*/, old: null }
];
const docPlain = d => strip(d.title + ". " + d.summary + ". " + d.body.map(blockText).join(". ")).replace(/\((was|previously)\b[^)]*\)/gi, "");
function factWhere(f) {
  const docs = DOCS.filter(d => d.status !== "Superseded");
  const msgs = Object.keys(DEPT_META).filter(n => f.now.test(fill(TEMPLATES[n], VARS.d3)));
  return { now: docs.filter(d => f.now.test(docPlain(d))), old: f.old ? docs.filter(d => f.old.test(docPlain(d))) : [], msgs };
}
/* ---------- one list, every copy ----------
   The questions for Product and the four in-step steps live once, in LAUNCH. They close the early-access article (d4),
   fill the hub's "Still being confirmed" list (d5) and drive Launch → Confirm with Product, so no copy can drift.
   Rendered on demand: ticking a question in Confirm with Product shows it answered everywhere. */
const qWho = w => w.split(" and ").map(x => x.split(" ")[0]).join(" and ");
const listAnd = xs => xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs.at(-1);
const D4_FACTS = [["ea", "early access on Nov 9"], ["ga", "GA on Jan 11, 2027"], ["headless", "headless not in this version"], ["locale", "the <code>/*/</code> rule for language folders"]];
function d4Confirm() {
  return `<div class="docsub" id="x-d4-confirm"><h5>Questions for Product before publishing</h5><ol class="pq">${LAUNCH.confirm.map((c, i) => { const done = S.confirmed.has(i); return `<li${done ? ' class="done"' : ""}><b>${esc(c.q)}</b>${c.d ? " " + c.d : ""}<span class="qm">${esc(qWho(c.who))} · ${done ? "✓ answered" : fmtShort(c.by)}</span></li>` }).join("")}</ol>
    <p class="qnote">Tracked with what each answer blocks in <button class="lnk" data-nav="launch:confirm">Launch → Confirm with Product</button>. Tick one off there and it shows as answered here.</p></div>`;
}
function d4InStep() {
  const own = docPlain(BYID.d4);
  const facts = D4_FACTS.map(([k, label]) => [FACTS.find(f => f.k === k), label]).filter(([f]) => f && f.now.test(own))
    .map(([f, label], i) => `${label} (${factWhere(f).now.filter(d => d.id !== "d4").length}${i ? "" : " other pages"})`);
  return `<div class="docsub" id="x-d4-instep"><h5>If the plan changes again</h5><ol>${LAUNCH.ifChanges.map(([h, p]) => `<li><b>${h}.</b> ${p}</li>`).join("")}</ol>
    <p class="qnote"><b>Facts in this article that live elsewhere:</b> ${listAnd(facts)}. Update them together, from <button class="lnk" data-nav="launch:confirm:facts">Where each fact lives</button>.</p></div>`;
}
function hubOpen() {
  return `<ul>${LAUNCH.confirm.map((c, i) => S.confirmed.has(i) ? `<li><s>${esc(c.q)}</s> Answered: update the guides.</li>` : `<li>${esc(c.q)} ${esc(qWho(c.who))}, by ${fmtShort(c.by)}.</li>`).join("")}</ul>`;
}
{
  const put = (doc, slot, block) => { const i = doc.body.findIndex(b => b.slot === slot); if (i >= 0) doc.body[i] = block };
  const qText = LAUNCH.confirm.map((c, i) => `${i + 1}. ${c.q} ${c.d || ""} (${qWho(c.who)}, by ${fmtShort(c.by)})`).join("\n");
  put(BYID.d4, "confirm", { html: d4Confirm, text: "Questions for Product before publishing:\n" + qText });
  put(BYID.d4, "instep", { html: d4InStep, text: LAUNCH.ifChanges.map(([h, p], i) => `If the plan changes again, step ${i + 1} of 4: ${h}. ${p}`).join("\n") });
  put(BYID.d5, "confirm-short", { html: hubOpen, text: qText });
}
function launchConfirm() {
  const msgState = n => { const c = (S.comms.d3 || {})[n]; return !c ? ["", "not drafted"] : c.status === "sent" ? ["sent", "sent: follow up"] : ["draft", "draft: regenerates"] };
  $("#ltab").innerHTML = `
   <div class="section" id="x-confirm"><h3>What Product must confirm before anything is published</h3><p class="note">Each question has an owner, a date and the piece it blocks. It's the same list that closes the <button class="lnk" data-nav="doc:d4:content:d4-confirm">early-access article</button>. Tick one off when the answer is in the scope-change doc.</p>
   <div class="box">${LAUNCH.confirm.map((c, i) => { const done = S.confirmed.has(i); return `<div class="cq ${done ? "done" : ""}">
     <button class="check ${done ? "on" : ""}" data-cq="${i}" aria-pressed="${done}" aria-label="Mark answered: ${esc(c.q)}">${done ? "✓" : ""}</button>
     <div><b>${esc(c.q)}</b>${c.d ? `<p class="cq-d">${c.d}</p>` : ""}<div class="sub">${avatar(c.who)} ${esc(c.who)} · by ${fmtShort(c.by)} ${done ? "" : dueChip(c.by)}</div><div class="sub">Blocks: ${esc(c.blocks)}${c.note ? ` · <span class="flag">${esc(c.note)}</span>` : ""}</div></div>
     <span class="cstate s-${done ? "done" : "open"}">${done ? "✓ Answered" : "Waiting"}</span></div>` }).join("")}</div></div>
   <div class="section" id="x-instep"><h3>If the plan changes again ${gl("P16", "DOC18")}</h3>
    <div class="steps4">${LAUNCH.ifChanges.map(([h, p], i) => `<div><span class="num">${i + 1}</span><b>${h}</b><p class="note">${p}</p></div>`).join("")}</div></div>
   <div class="section" id="x-facts"><div class="listhead"><div><h3>Where each fact lives</h3><p class="note">Found by Doc Desk in every page and department message. When a fact changes, this is the list to update. Red chips still carry the old value.</p></div></div>
    <div class="box facts-map">${FACTS.map(f => { const w = factWhere(f); return `<div class="fact">
      <div class="fact-h"><b>${esc(f.label)}</b><span class="note">${plural(w.now.length + w.msgs.length, "place")}${w.old.length ? ` · <span class="badc">${w.old.length} with the old value</span>` : ""}</span></div>
      <div class="fact-c">${w.now.map(d => `<button class="fchip2" data-nav="doc:${d.id}" title="${esc(d.title)}">${typeDot(d.type)}${esc(chipName(d.id))}</button>`).join("")}${w.msgs.map(n => { const [cls, t] = msgState(n); return `<button class="fchip2 msg ${cls}" data-fmsg="${n}" title="Department message to ${n}: ${t}">${ico("flow", 12)}${esc(DEPT_META[n].ch)}<em>${t}</em></button>` }).join("")}${w.old.map(d => `<button class="fchip2 old" data-nav="doc:${d.id}" title="Still states the old value">${typeDot(d.type)}${esc(chipName(d.id))}<em>old value</em></button>`).join("")}</div></div>` }).join("")}</div></div>`;
  $("#ltab").onclick = e => {
    const b = e.target.closest("[data-cq]"); if (b) { const i = +b.dataset.cq; S.confirmed.has(i) ? S.confirmed.delete(i) : S.confirmed.add(i); renderLaunch(); return }
    const m = e.target.closest("[data-fmsg]"); if (m) openCompose(BYID.d3, m.dataset.fmsg);
  };
}

/* ---------- Help-centre health ---------- */
const templateScore = id => TEMPLATE_CHECKS.filter(([k]) => HC[id].template[k]).length;
const hcState = id => S.hc[id] || (S.hc[id] = { acc: new Set(), skip: new Set() });
const hcOpen = id => HC[id].issues.filter(x => !hcState(id).acc.has(x.fix)).length;
function renderHealth() {
  const ids = hcIds(), maxV = Math.max(...ids.map(id => HC[id].views));
  const pass = ids.filter(id => templateScore(id) === TEMPLATE_CHECKS.length).length;
  const issues = ids.reduce((a, id) => a + hcOpen(id), 0);
  const rows = ids.map(id => {
    const h = HC[id], d = BYID[id], sc = templateScore(id), open = hcOpen(id), pct = Math.round(h.votes[0] / h.votes[1] * 100);
    return `<tr class="click" data-hc="${id}" tabindex="0">
     <td><div class="pc"><span class="code">${h.code}</span><div><b>${esc(d.title)}</b><small class="block">${esc(d.aud)} · ${d.owner === "Support" || d.owner === "Product team" ? "no named owner" : "owner: " + esc(d.owner)}</small></div></div></td>
     <td class="nowrap">${fmtShort(d.date)}<small class="block">${-daysFrom(d.date)} days ago</small></td>
     <td class="num nowrap"><span class="hbar"><i style="width:${(h.views / maxV * 100).toFixed(1)}%"></i></span>${h.views.toLocaleString("en-US")}</td>
     <td class="num nowrap"><b class="${pct >= 60 ? "okc" : pct >= 45 ? "warnc" : "badc"}">${pct}%</b><small class="block">${h.votes[0]} of ${h.votes[1]}</small></td>
     <td class="nowrap"><span class="tsq" title="${sc} of 6 template checks">${TEMPLATE_CHECKS.map(([k, l]) => `<i class="${h.template[k] ? "on" : ""}" title="${esc(l)}"></i>`).join("")}</span><small class="block">${sc}/6 · review ${fmtShort(h.review)}</small></td>
     <td class="nowrap">${open ? `<span class="flag">▲ ${open}</span>` : `<span class="okc">✓ fixed</span>`} ${gl(DOC_GAPS[id])}</td>
     <td>${pillS(d.status)}</td></tr>`;
  }).join("");
  const perCheck = TEMPLATE_CHECKS.map(([k, l]) => [l, k, ids.filter(id => HC[id].template[k]).length]);
  $("#main").innerHTML = crumbs(["Live Chat docs", "Help-centre health"]) + `<div class="scroll"><div class="page wide">
   <div class="titlerow"><div><div class="eyebrow">Public Help Center · ${ids.length} Live Chat articles</div><h1>Help-centre health</h1>
    <p class="lead">Every article gets an owner, a review date and the same template. Fixes are written as before-and-after changes you can accept, then sent to review.</p></div></div>
   <div class="stats"><div><span>Pass the template</span><b>${pass} of ${ids.length}</b><em>none names an owner</em></div><div><span>Need updates</span><b>${ids.filter(id => BYID[id].status === "NeedsUpdate").length}</b><span class="note">wrong or out of date</span></div><div><span>Open issues</span><b>${issues}</b><span class="note">with fixes ready</span></div><div><span>New pages queued</span><b>${HC_QUEUE.length}</b><span class="note">drafts in Doc Desk</span></div></div>
   <div class="callout" id="x-windows"><b>${ico("clock", 16)} Views and votes don't cover the same period ${gl("D42")}</b><p>Views cover the last 30 days. Helpful votes have no date range, so they may include votes cast before an article's last update. HC03 is only ${-daysFrom("2026-09-29")} days old, so its views include launch-week traffic, and HC06 rates 88% while its steps are wrong. Don't rank articles on these numbers until votes are counted from each article's last update.</p></div>
   <div class="box tablewrap"><table class="tbl"><thead><tr><th>Article</th><th>Updated</th><th class="num">Views, 30 days</th><th class="num">Helpful</th><th>Template</th><th>Open issues</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
   <div class="grid2">
    <div class="section" id="x-template"><h3>One template for every article ${gl("DOC17")}</h3><div class="box">${perCheck.map(([l, k, n]) => `<div class="tcheck"><span>${esc(l)}</span><span class="tsq lg">${ids.map(id => `<i class="${HC[id].template[k] ? "on" : ""}" title="${HC[id].code}"></i>`).join("")}</span><b class="${n ? "" : "badc"}">${n}/${ids.length}</b></div>`).join("")}</div>
     <p class="note">Squares follow the table order, HC01 to HC06. Only HC06 has a “Still stuck?” contact, only HC03 has a marketing sign-off, and no article names an owner or a review date.</p></div>
    <div class="section"><h3>New pages queued in Doc Desk</h3><div class="box">${HC_QUEUE.map(q => { const d = BYID[q.doc]; return `<button class="lrow tall" data-nav="doc:${q.doc}"><span class="t">${typeDot(d.type)} ${esc(d.title)}<small class="block note">${esc(q.why)}</small></span><span class="r">${gl(q.gaps)}${pillS(d.status)}</span></button>` }).join("")}</div></div>
   </div>
  </div></div>`;
  const tb = $("#main").querySelector("tbody");
  tb.onclick = e => { const r = e.target.closest("[data-hc]"); if (r && !e.target.closest(".gl")) navTo("doc:" + r.dataset.hc + ":health") };
  tb.onkeydown = e => { const r = e.target.closest("[data-hc]"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); navTo("doc:" + r.dataset.hc + ":health") } };
}
function tabHealth(d) {
  const h = HC[d.id], st = hcState(d.id), sc = templateScore(d.id), pct = Math.round(h.votes[0] / h.votes[1] * 100), open = hcOpen(d.id);
  const pending = h.props.filter(p => !st.acc.has(p.id) && !st.skip.has(p.id));
  $("#wsbody").innerHTML = `
   <div class="box scorebox"><div class="score"><div class="ring" style="--p:${(sc / 6 * 100).toFixed(0)};--sc:${sc >= 5 ? "var(--ok)" : sc >= 3 ? "var(--warn)" : "var(--bad)"}"><span>${sc}/6</span></div><div><b>Template check</b> ${gl("DOC17")}<div class="note">${h.code} · review by ${fmtShort(h.review)}, proposed</div></div></div>
    <div><div class="checks">${TEMPLATE_CHECKS.map(([k, l]) => `<div><span class="ck ${h.template[k] ? "y" : "n"}">${h.template[k] ? "✓" : "✗"}</span><span>${esc(l)}</span></div>`).join("")}</div>
    <p class="note" style="margin-top:10px">${h.views.toLocaleString("en-US")} views in 30 days · ${pct}% helpful (${h.votes[0]} of ${h.votes[1]}, no date range) ${gl("D42")}</p></div></div>
   <div class="section"><h3>Issues <span class="note">${open ? open + " open" : "all fixed"}</span></h3><div class="box">${h.issues.map(x => { const ok = st.acc.has(x.fix); return `<div class="issue ${ok ? "fixed" : ""}"><span class="ib">${ok ? "✓" : "▲"}</span><p>${esc(x.t)} ${gl(x.gaps)}</p><button class="btn small ghost" data-jump="${x.fix}">${ok ? "Fixed by" : "Fix"} ${x.fix.toUpperCase()}</button></div>` }).join("")}</div></div>
   <div class="section"><div class="btnrow" style="justify-content:space-between"><h3>Proposed fixes</h3>${pending.length ? `<button class="acc" id="hcall">✓ Accept all ${pending.length}</button>` : d.status !== "InReview" ? `<button class="btn small primary" id="hcreview">Send ${h.code} to review</button>` : `<span class="applied">In review</span>`}</div>
    ${h.props.map(p => `<div class="prop ${st.acc.has(p.id) ? "done" : ""} ${st.skip.has(p.id) ? "skip" : ""}" id="fix-${p.id}"><header><div><b><span class="code">${p.id.toUpperCase()}</span> ${esc(p.title)} ${gl(p.gaps)}</b><p>${esc(p.why)}</p></div><div class="btnrow">${st.acc.has(p.id) ? `<span class="applied">✓ Accepted</span><button class="rej" data-hundo="${p.id}">Revert</button>` : st.skip.has(p.id) ? `<span class="note">Rejected</span><button class="rej" data-hundo="${p.id}">Undo</button>` : `<button class="acc" data-hacc="${p.id}">✓ Accept</button><button class="rej" data-hskip="${p.id}">✕ Reject</button>`}</div></header>
     <div class="diff"><div class="b">${esc(p.before)}</div><div class="a">${esc(p.after)}</div></div></div>`).join("")}</div>`;
  $("#wsbody").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.hacc) { st.acc.add(b.dataset.hacc); st.skip.delete(b.dataset.hacc); renderDoc() }
    else if (b.dataset.hskip) { st.skip.add(b.dataset.hskip); renderDoc() }
    else if (b.dataset.hundo) { st.acc.delete(b.dataset.hundo); st.skip.delete(b.dataset.hundo); renderDoc() }
    else if (b.id === "hcall") { pending.forEach(p => st.acc.add(p.id)); toast(`${h.code}: ${pending.length} fixes accepted`); renderDoc() }
    else if (b.id === "hcreview") { d.status = "InReview"; toast(`${h.code} sent to review with ${st.acc.size} fixes`); render() }
    else if (b.dataset.jump) { const el = document.getElementById("fix-" + b.dataset.jump); if (el) { el.scrollIntoView({ block: "center", behavior: "smooth" }); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1700) } }
  };
}

/* ---------- One answer per question ---------- */
const answerStatus = a => S.ans[a.id] || a.status;
const ASTATE = { proposed: ["Proposed", "Proposed answer"], waiting: ["Waiting on Product", "What we can say now"], decided: ["✓ Decided", "The answer"] };
function renderAnswers() {
  const all = ANSWERS.flatMap(a => a.circulation.map(c => c.v)), nA = s => ANSWERS.filter(a => answerStatus(a) === s).length;
  $("#main").innerHTML = crumbs(["Live Chat docs", "Answers"]) + `<div class="scroll"><div class="page wide">
   <div class="titlerow"><div><div class="eyebrow">Answers</div><h1>One answer per question</h1>
    <p class="lead">When people give different answers, the question gets one owner, one decision and a date. Docs, macros and talk tracks follow the decision.</p></div></div>
   <div class="stats"><div><span>Questions</span><b>${ANSWERS.length}</b>${gl("P3")}</div><div><span>Answers in circulation</span><b>${all.length}</b><em>${all.filter(v => v === "wrong" || v === "outdated").length} wrong or outdated</em></div><div><span>Proposed, to confirm</span><b>${nA("proposed")}</b></div><div><span>Waiting on Product</span><b>${nA("waiting")}</b>${nA("decided") ? `<span class="note">${nA("decided")} decided</span>` : ""}</div></div>
   <div class="vsum">${verdictBar(all, "Verdicts on every answer in circulation")}${verdictLegend(all)}</div>
   ${ANSWERS.map(a => { const st = answerStatus(a), [chip, colh] = ASTATE[st], remind = firstNames(st === "waiting" ? a.owner : a.confirm) || "the owner"; return `<article class="anscard s-${st}" id="x-${a.id}">
     <header><div><h2>${esc(a.q)}</h2><div class="meta">${avatar(a.owner)} ${esc(a.owner)} <span>·</span> confirm with ${esc(a.confirm)} <span>·</span> ${st === "decided" ? "decided" : `decide by ${fmtShort(a.by)} ${dueChip(a.by)}`} <span>·</span> <span class="mono small">${esc(a.asks)}</span></div></div>
      <div class="btnrow">${gl(a.gaps)}<span class="astate ${st}">${chip}</span></div></header>
     <div class="ans-grid">
      <div><div class="colh">In circulation <span>${a.circulation.length}</span></div><ol class="circ">${a.circulation.map(c => `<li class="cv-${c.v}"><div class="circ-h"><b>${esc(c.who)}</b><span class="note">${esc(c.when)}</span><span class="verdict ${VERDICT[c.v].cls}">${VERDICT[c.v].label}</span></div><q>${esc(c.said)}</q>${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}${c.ref ? docLink(c.ref, "Open " + shortTitle(c.ref)) : ""}</li>`).join("")}</ol></div>
      <div class="ans-r"><div class="colh">${colh}</div><div class="theanswer ${st}">${a.answer.map(([k, v]) => `<div><span>${esc(k)}</span><p>${esc(v)}</p></div>`).join("")}</div>
       <div class="colh" style="margin-top:18px">Then update <span>${a.update.length}</span></div><div class="upd">${a.update.map(u => u.doc ? `<button class="lrow slim" data-nav="doc:${u.doc}"><span class="t">${typeDot(BYID[u.doc].type)} ${esc(u.what)}</span><span class="r">${pillS(liveStatus(u.doc))}</span></button>` : `<div class="lrow slim static"><span class="t">${ico("flow", 13)} ${esc(u.text)}</span><span class="r"><span class="pill s-NotStarted">To do</span></span></div>`).join("")}</div>
       <div class="btnrow" style="margin-top:12px">${st === "decided" ? `<button class="btn small ghost" data-areopen="${a.id}">Reopen</button>` : `<button class="btn small primary" data-adecide="${a.id}">Record the decision</button><button class="btn small" data-aremind="${a.id}">Remind ${esc(remind)}</button>`}</div></div>
     </div></article>` }).join("")}
  </div></div>`;
  $("#main").querySelector(".page").onclick = e => {
    const b = e.target.closest("button"); if (!b || b.dataset.nav) return;
    const a = ANSWERS.find(x => x.id === (b.dataset.adecide || b.dataset.areopen || b.dataset.aremind)); if (!a) return;
    if (b.dataset.adecide) { S.ans[a.id] = "decided"; toast(`Decision recorded. ${plural(a.update.length, "linked item")} queued for update.`); renderAnswers() }
    else if (b.dataset.areopen) { S.ans[a.id] = a.status === "decided" ? "proposed" : a.status; renderAnswers() }
    else if (b.dataset.aremind) toast(`Reminder posted to ${firstNames(answerStatus(a) === "waiting" ? a.owner : a.confirm)} in #product-live-chat`);
  };
}

/* ---------- Questions log ---------- */
function allQuestions() {
  const base = IQ.map(r => ({ id: r[0], date: r[1], role: r[2], where: r[3], by: r[4], similar: r[5], q: r[6], a: r[7], v: r[8], right: r[9], ref: r[10] }));
  return [...S.logged, ...base];
}
function saveLogged() { try { localStorage.setItem("docdesk-logged", JSON.stringify(S.logged)) } catch (e) { } }
function renderQuestions() {
  const f = S.qFilter || "all", all = allQuestions(), peers = all.filter(q => /peer/.test(q.by));
  const sets = { all, wrong: all.filter(q => q.v === "wrong"), peer: peers, dm: all.filter(q => q.where === "Slack DM"), decide: all.filter(q => q.v === "decide"), unrev: all.filter(q => q.v === "unrev") };
  const list = sets[f] || all;
  const refBtn = r => !r ? "" : r.startsWith("d") ? docLink(r, "Source: " + BYID[r].title) : `<button class="lnk" data-nav="${r}">${r.startsWith("answers") ? "See the open question" : r.startsWith("changes") ? "See the regression notice" : "See the corrections"}</button>`;
  $("#main").innerHTML = crumbs(["Live Chat docs", "Questions log"]) + `<div class="scroll"><div class="page wide">
   <div class="titlerow"><div><div class="eyebrow">Internal questions · Sep 21 – Oct 16</div><h1>Questions log</h1>
    <p class="lead">Every question internal teams ask about Live Chat, the answer they got and whether it was right. Reviewed every Friday. Corrections go back to the original thread.</p></div>
    <button class="btn primary" id="logdm" style="flex:none">${ico("plus", 15)} Log a DM answer</button></div>
   <div class="stats"><div><span>Questions</span><b>${all.length}</b>${gl("D41")}</div><div><span>Wrong answers</span><b>${sets.wrong.length}</b><em>${peers.filter(q => q.v === "wrong").length} of ${peers.length} peer answers</em></div><div><span>Asked in DMs</span><b>${sets.dm.length}</b><span class="note">plus Wen's headless DMs, never logged</span></div><div><span>Waiting on a decision</span><b>${sets.decide.length}</b></div></div>
   <div class="vsum">${verdictBar(all.map(q => q.v), "Verdicts on internal answers")}${verdictLegend(all.map(q => q.v))}</div>
   <div class="listhead"><div class="seg" role="group" aria-label="Filter questions">${[["all", "All"], ["wrong", "Wrong"], ["peer", "Peer answers"], ["dm", "Asked in DMs"], ["decide", "Needs a decision"]].concat(sets.unrev.length ? [["unrev", "Not reviewed"]] : []).map(([k, l]) => `<button data-qf="${k}" aria-pressed="${f === k}">${l} <span class="note">${sets[k].length}</span></button>`).join("")}</div>${gl(f === "dm" ? "P4" : "P2")}</div>
   <div class="qlist">${list.map(q => `<div class="qrow qv-${q.v}">
     <div class="qcol"><div class="qmeta"><span class="mono">${esc(q.id)}</span><span>${fmtShort(q.date)}</span><span>${esc(q.role)}</span><span class="${q.where === "Slack DM" ? "dmchip" : "chchip"}">${esc(q.where)}</span>${q.similar ? `<span>${q.similar} similar this month</span>` : ""}</div><b>${esc(q.q)}</b></div>
     <div class="qcol"><span class="note">${esc(q.by)} answered</span><q>${esc(q.a)}</q></div>
     <div class="qcol"><span class="verdict ${VERDICT[q.v].cls}">${VERDICT[q.v].label}</span>${q.v === "unrev" ? `<div class="vbtns">${["right", "partial", "wrong", "decide"].map(v => `<button class="btn small" data-setv="${esc(q.id)}" data-v="${v}">${VERDICT[v].label}</button>`).join("")}</div>` : `<p>${esc(q.right)}</p>`}${refBtn(q.ref)}</div></div>`).join("") || `<p class="note" style="padding:14px 16px">Nothing here.</p>`}</div>
   <div class="section" id="x-macros"><h3>Answered three times? Make it a macro ${gl("P1")}</h3><p class="note">Doc Desk groups repeated questions and tickets into macro suggestions. Specialists draft them, and the Support lead reviews.</p>
    <div class="box">${REPEATS.map(r => { const d = r.doc ? BYID[r.doc] : null; return `<div class="rep"><div><b>${esc(r.topic)}</b> ${gl(r.gaps)}<p class="note">${esc(r.evidence)}</p>${r.suggestion ? `<p class="flag">${esc(r.suggestion)}</p>` : ""}</div><div class="btnrow">${d ? `${pillS(d.status)}<button class="btn small" data-nav="doc:${r.doc}">${d.type === "macro" ? "Open macro" : "Open article"}</button>` : `<span class="pill s-NotStarted">Suggested</span>`}</div></div>` }).join("")}</div></div>
  </div></div>`;
  $("#main").querySelector(".page").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.qf) { S.qFilter = b.dataset.qf; renderQuestions(); syncHash() }
    else if (b.id === "logdm") openLogModal();
    else if (b.dataset.setv) { const q = S.logged.find(x => x.id === b.dataset.setv); if (q) { q.v = b.dataset.v; q.right = `Reviewed on ${fmtShort(TODAY)}: ${VERDICT[q.v].label.toLowerCase()}.`; saveLogged(); toast(`${q.id} marked ${VERDICT[q.v].label.toLowerCase()}`); render() } }
  };
}
function openLogModal() {
  $("#modalroot").innerHTML = `<div class="overlay" id="lovl"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="ltitle" style="width:min(600px,100%)">
   <header><div><h2 id="ltitle">Log a DM answer</h2><p class="note">Answers given in DMs don't reach anyone else. Log them here so they're reviewed with the rest.</p></div><button class="btn small ghost" id="lclose" aria-label="Close">✕</button></header>
   <div class="mbody">
    <div class="field"><label for="lq">Question</label><input id="lq" placeholder="Does Visibility Rules work with our headless site?"></div>
    <div class="field"><label for="la">The answer you gave</label><textarea id="la" class="short" placeholder="Not in v1. Headless isn't covered in early access or at GA."></textarea></div>
    <div class="grid2 tight"><div class="field"><label for="lw">Who asked</label><input id="lw" placeholder="CSM"></div><div class="field"><label for="lb">You are</label><input id="lb" placeholder="Support Specialist"></div></div>
   </div>
   <footer><span class="note">It's added as “Not reviewed” and goes into Friday's review.</span><div class="btnrow"><button class="btn" id="lcancel">Cancel</button><button class="btn primary" id="lsave">Add to the log</button></div></footer></div></div>`;
  const close = () => { $("#modalroot").innerHTML = "" };
  $("#lovl").onclick = e => {
    if (e.target.id === "lovl" || e.target.closest("#lclose") || e.target.closest("#lcancel")) { close(); return }
    if (!e.target.closest("#lsave")) return;
    const q = $("#lq").value.trim(), a = $("#la").value.trim();
    if (!q || !a) { toast("Add the question and the answer you gave"); return }
    const n = 125 + S.logged.length;
    S.logged.unshift({ id: "IQ-" + n, date: TODAY, role: $("#lw").value.trim() || "Not given", where: "Slack DM", by: ($("#lb").value.trim() || "You") + ", logged", similar: 0, q, a, v: "unrev", right: "", ref: "" });
    saveLogged(); close(); S.qFilter = "all"; render(); toast(`IQ-${n} added to the questions log`);
  };
  $("#lq").focus();
}

/* ---------- Releases and changes ---------- */
const relScore = r => RELEASE_CHECKS.filter(([k]) => r.res[k][0]).length;
const ringCol = (s, max) => s / max >= .85 ? "var(--ok)" : s / max >= .55 ? "var(--warn)" : "var(--bad)";
function renderChanges() {
  $("#main").innerHTML = crumbs(["Live Chat docs", "Releases and changes"]) + `<div class="scroll"><div class="page wide">
   <div class="titlerow"><div><div class="eyebrow">Releases · regressions · what merchants were told</div><h1>Releases and changes</h1>
    <p class="lead">Each release is reviewed before it ships, regressions are announced to the merchants they hit, and every default change is dated so merchants can read their reports.</p></div></div>
   <div class="stats"><div><span>Session Controls review</span><b>${relScore(RELEASES[0])} of 7</b><em>shipped anyway</em></div><div><span>LC-1204: merchants told</span><b>0</b><span class="note">2 known affected, 69 One-Way accounts to check</span></div><div><span>Changes merchants weren't told</span><b>${CHANGELOG_M.filter(c => c.announced !== "yes").length} of ${CHANGELOG_M.length}</b></div><div><span>Visibility Rules EA review</span><b>${relScore(RELEASES[2])} of 7</b><span class="note">${7 - relScore(RELEASES[2])} to close by Nov 9</span></div></div>
   <div class="section" id="x-review"><h3>Release review ${gl("P18")}</h3><p class="note">Seven checks before a release ships. Session Controls failed all seven, and the fix for its regression failed three.</p>
    <div class="rels">${RELEASES.map(r => { const sc = relScore(r); return `<div class="rel ${r.state}"><div class="rel-h"><div><span class="eyebrow">${r.state === "upcoming" ? "Upcoming" : "Shipped"} · ${esc(r.date)}</span><b>${esc(r.name)}</b></div><div class="ring small" style="--p:${(sc / 7 * 100).toFixed(0)};--sc:${ringCol(sc, 7)}"><span>${sc}/7</span></div></div>
      <ul class="rcl">${RELEASE_CHECKS.map(([k, l]) => `<li class="${r.res[k][0] ? "y" : "n"}"><span class="ck ${r.res[k][0] ? "y" : "n"}">${r.res[k][0] ? "✓" : "✗"}</span><div><b>${esc(l)}</b><p class="note">${esc(r.res[k][1])}</p></div></li>`).join("")}</ul>
      ${r.doc ? `<button class="btn small" data-nav="doc:${r.doc}:release">Open ${r.doc === "d3" ? "the scope change" : "the changelog entry"}</button>` : ""}</div>` }).join("")}</div></div>
   <div class="section" id="x-lc1204"><h3>Regression notice: LC-1204 ${gl("P7")}</h3>
    <div class="box notice"><div class="nt-h"><div><span class="pill s-Open">Not announced</span> <b>Routed One-Way tickets closed early, Sep 28 – Oct 13</b></div><div class="btnrow"><button class="btn small" data-draft="status">Draft the status-page entry</button><button class="btn small primary" data-draft="email">Draft the merchant email</button></div></div>
     <p class="nt-p">${esc(LC1204.what)}</p>
     <div class="grid2"><div><div class="colh">Affected merchants</div>${LC1204.affected.map(a => `<div class="aff"><div><b>${esc(a.m)}</b><span class="mono small">${esc(a.t)}</span></div><p class="note">${esc(a.note)}</p></div>`).join("")}</div>
      <div><div class="colh">Not done yet</div><ul class="miss">${LC1204.missing.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
       <div class="colh" style="margin-top:14px">The remedy, completed</div>${LC1204.remedy.map(([k, v]) => `<div class="rem"><span>${esc(k)}</span><p>${esc(v)}</p></div>`).join("")}</div></div></div></div>
   <div class="section" id="x-log"><div class="listhead"><div><h3>What changed in Live Chat: the merchant log ${gl("D45")}</h3><p class="note">Every default change, migration and regression, dated, so merchants can mark it in before-and-after reports. Fernwood's settings still say “default (Session Controls v43.4.0 migration)” with no notice behind it.</p></div><button class="btn small" data-nav="doc:d25">Open the article draft</button></div>
    ${changeLogHTML()}</div>
  </div></div>`;
  $("#main").querySelector(".page").onclick = e => { const b = e.target.closest("[data-draft]"); if (b) openTextModal(b.dataset.draft === "status" ? "Status-page entry" : "Email to affected merchants", "LC-1204 · drafted from the changelog and the tickets", b.dataset.draft === "status" ? LC1204.status : LC1204.email) };
}
function changeLogHTML() {
  return `<div class="clog">${CHANGELOG_M.map(c => `<div class="cl"><div class="cl-d"><b>${esc(c.date.replace(", 2026", ""))}</b><span class="mono">${esc(c.ver)}</span></div><i class="cl-dot d-${c.announced}"></i><div class="cl-b"><b>${esc(c.title)}</b><p>${esc(c.body)}</p><div class="cl-f">${c.flags.map(f => `<span class="fchip f-${f}">${FLAG_LABEL[f]}</span>`).join("")}<span class="ann a-${c.announced}">${{ no: "Merchants weren't told", partly: "Announced without the change", yes: "Announced" }[c.announced]}</span></div>${c.marker ? `<p class="marker">${ico("clock", 13)}<span><b>For your reports:</b> ${esc(c.marker)}</span></p>` : ""}</div></div>`).join("")}</div>`;
}
function openTextModal(title, sub, text) {
  $("#modalroot").innerHTML = `<div class="overlay" id="tovl"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="ttitle">
   <header><div><h2 id="ttitle">${esc(title)}</h2><p class="note">${esc(sub)}</p></div><button class="btn small ghost" id="tclose" aria-label="Close">✕</button></header>
   <div class="mbody"><div class="field"><label for="tta">Draft</label><textarea id="tta">${esc(text)}</textarea></div></div>
   <footer><span class="note">Values in {{braces}} are filled in per merchant.</span><div class="btnrow"><button class="btn" id="tcopy">${ico("copy", 14)} Copy</button><button class="btn primary" id="tdone">Done</button></div></footer></div></div>`;
  $("#tovl").onclick = e => {
    if (e.target.id === "tovl" || e.target.closest("#tclose") || e.target.closest("#tdone")) { $("#modalroot").innerHTML = ""; return }
    if (e.target.closest("#tcopy")) { const t = $("#tta").value; (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Copied")).catch(() => { $("#tta").select(); toast("Selected. Press Ctrl+C to copy.") }) }
  };
  $("#tclose").focus();
}
function tabRelease(d) {
  const r = RELEASES.find(x => x.doc === d.id), sc = relScore(r);
  $("#wsbody").innerHTML = `<div class="box scorebox"><div class="score"><div class="ring" style="--p:${(sc / 7 * 100).toFixed(0)};--sc:${ringCol(sc, 7)}"><span>${sc}/7</span></div><div><b>Release review</b> ${gl("P18")}<div class="note">${esc(r.name)} · ${esc(r.date)}</div></div></div><p class="note">Seven checks every Live Chat release should pass before it ships. ${r.state === "upcoming" ? `${7 - sc} still open before early access.` : sc < 7 ? "This one shipped without them." : ""}</p></div>
   <ul class="rcl big">${RELEASE_CHECKS.map(([k, l]) => `<li class="${r.res[k][0] ? "y" : "n"}"><span class="ck ${r.res[k][0] ? "y" : "n"}">${r.res[k][0] ? "✓" : "✗"}</span><div><b>${esc(l)}</b><p class="note">${esc(r.res[k][1])}</p></div></li>`).join("")}</ul>
   <div class="btnrow">${d.id === "d14" ? `<button class="btn" data-nav="changes:lc1204">Open the LC-1204 regression notice</button>` : ""}<button class="btn" data-nav="changes:log">See the merchant change log</button></div>`;
}

/* ---------- custom doc pages ---------- */
const DOC_NOTES = {
  d4: { t: "Due to Noor Haddad for review on Nov 2", p: "The questions Product must answer before it's published are at the bottom, each with an owner and a date, followed by what to do if the plan changes again. Remove that section before publishing.", go: ["Jump to the questions", "doc:d4:content:d4-confirm"] },
  d5: { t: "Each department gets its own message", p: "Sales, CS, Support, Deployment and Marketing each get a message drafted from their template with this launch's details. Corrections are tracked until everyone who repeated the old scope is set straight.", go: ["Open the messages", "doc:d3:conditions"], gaps: ["P16"] },
  d16: { t: "Questions Product must answer before this ships", gaps: ["PR25", "DOC4"], p: "26 accounts ($2.88M ARR) use No Sync. HC02 tells them a ticket is created outside business hours, which can't happen on No Sync, and nothing explains what the Siena Inbox does.",
    ul: ["What the customer sees when a chat is routed in business hours, and who on the team is notified", "Outside business hours: the message the customer gets, and when the team sees the chat", "Siena Inbox: can conversations be assigned, and to whom?", "Which statuses exist, and does anything close on its own?", "Are there SLAs or reminders for waiting chats?", "Can conversations be exported, and in what format?", "Can a No Sync instance move to One-Way or Two-Way later without being recreated?"] },
  d17: { t: "Before it ships", gaps: ["DOC8"], p: "Product confirms that the hidden-bubble pattern is supported, then Ines Park reviews. Halden & Rowe needs it before its Nov 13 code freeze.", go: ["Confirm with Product", "launch:confirm"] },
  d26: { t: "Waiting on Product", gaps: ["P8"], p: "Product owes one recommended session length (proposed decide-by date: Oct 26). Until then, agents explain the trade-off instead of giving a number.", go: ["See the open question", "answers:a3"] }
};
function docNote(d) {
  const n = DOC_NOTES[d.id]; if (!n) return "";
  return `<div class="dnote"><div class="dn-h">${ico(n.ul ? "question" : "flow", 15)}<b>${esc(n.t)}</b>${gl(n.gaps || [])}</div><p>${esc(n.p)}</p>${n.ul ? `<ol>${n.ul.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}${n.go ? `<button class="lnk" data-nav="${n.go[1]}">${esc(n.go[0])} →</button>` : ""}</div>`;
}
const blockText = b => b.h || b.p || b.quote || b.note || (b.ul || b.ol || []).join(". ") || (b.table ? [b.table.head.join(". "), ...b.table.rows.map(r => r.join(". "))].join(". ") : "") || (typeof b.html === "function" ? b.text || "" : b.html || "");
const bodyHTML = d => d.body.map(b =>
  b.html ? (typeof b.html === "function" ? b.html() : b.html) :
  b.h ? `<h4>${b.h}</h4>` :
  b.ul ? `<ul>${b.ul.map(x => `<li>${x}</li>`).join("")}</ul>` :
  b.ol ? `<ol>${b.ol.map(x => `<li>${x}</li>`).join("")}</ol>` :
  b.table ? `<div class="dtable ${b.cls || ""}"><table><thead><tr>${b.table.head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${b.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` :
  b.quote ? `<blockquote>${b.quote}</blockquote>` :
  b.note ? `<div class="dnote2">${ico("flow", 14)}<span>${b.note}</span></div>` :
  `<p>${b.p}</p>`).join("");
const withVars = h => h.replace(/\{\{(\w+)\}\}/g, '<span class="var">{{$1}}</span>');
/* the launch-plan rows for a doc, shown on its page */
function docLaunchStrip(d) {
  const ps = LAUNCH.pieces.filter(p => p.d && (p.doc === d.id || (d.id === "d3" && (p.comms || p.cond))));
  if (!ps.length) return "";
  return `<div class="lstrip" id="x-lstrip"><div class="ls-h">${ico("rocket", 14)}<b>In the launch plan</b><button class="lnk" data-nav="launch:plan">Open the plan →</button></div>${ps.slice(0, 3).map(p => `<div class="ls-r"><div class="ls-p"><b>${esc(p.piece)}</b><small>${PHASES.find(x => x.k === p.phase).t} · for ${esc(p.aud)}${p.rev ? " · review: " + esc(p.rev) : ""}</small></div>${stepper(p)}</div>`).join("")}${ps.length > 3 ? `<div class="ls-more note">and ${ps.length - 3} more pieces on this page</div>` : ""}</div>`;
}
function pageMacro(d) {
  const rep = REPEATS.find(r => r.doc === d.id);
  const body = withVars(bodyHTML(d));
  $("#wsbody").innerHTML = `<p class="lead">${esc(d.summary)}</p>
   ${rep ? `<div class="callout gray"><b>${ico("question", 16)} Why this macro exists ${gl(rep.gaps)}</b><p>${esc(rep.evidence)}</p></div>` : ""}
   ${d.status === "NotStarted" ? `<div class="macro suggested"><div class="macro-h"><span class="mtag">Suggested by Doc Desk</span><span class="note">Not drafted yet · owner ${esc(d.owner)}</span></div><div class="docbody">${body}</div><div class="macro-f"><button class="btn small primary" data-mstart>Start the draft</button></div></div>`
      : `<div class="macro"><div class="macro-h"><span class="mtag">Saved reply</span><span class="note">${esc(d.owner)} · ${STATUS[d.status]}</span><button class="btn small ghost" data-mcopy>${ico("copy", 14)} Copy</button></div><div class="docbody">${body}</div></div>`}`;
  $("#wsbody").onclick = e => {
    if (e.target.closest("[data-mcopy]")) { const t = strip(bodyHTML(d).replace(/<\/(p|li|h4)>/g, "\n")); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Copied")).catch(() => toast("Copy isn't available here")) }
    if (e.target.closest("[data-mstart]")) { d.status = "Draft"; toast("Draft started from the CX-lead page"); render() }
  };
}
function pagePlaybook(d) {
  const run = S.run, res = { bad: ["✗", "Problem"], warn: ["!", "Check"], ok: ["✓", "OK"], na: ["–", "Not applicable"] };
  const counts = CHECKLIST.reduce((a, c) => (a[c.fern[0]] = (a[c.fern[0]] || 0) + 1, a), {});
  $("#wsbody").innerHTML = `<p class="lead">${esc(d.summary)}</p>
   <div class="runbar ${run ? "ran" : ""}"><div><b>Run it against a settings export</b><p class="note">Fernwood Kitchen Co. · exported Oct 14 at 21:40 UTC by Jordan Blake</p></div><button class="btn ${run ? "" : "primary"}" data-run>${run ? "Clear the results" : `${ico("play", 13)} Run against Fernwood`}</button></div>
   ${run ? `<div class="sumrow runsum"><span class="r-bad">✗ ${counts.bad || 0} problems</span><span class="r-warn">! ${counts.warn || 0} to check</span><span class="r-ok">✓ ${counts.ok || 0} OK</span><span class="note">${counts.na || 0} not applicable · the four symptoms in Jordan's email trace to steps 1, 6, 7, 8 and 9</span></div>` : ""}
   <ol class="chk">${CHECKLIST.map((c, i) => `<li class="${run ? "r-" + c.fern[0] : ""}"><span class="num">${i + 1}</span><div class="chk-b"><div class="chk-h"><b>${esc(c.step)}</b>${i === 0 ? `<span class="pill s-InReview">Check first</span>` : ""}</div><p class="note">${esc(c.why)}</p><span class="where">${esc(c.where)}</span>
     ${run ? `<div class="res r-${c.fern[0]}" style="animation-delay:${i * 70}ms"><span>${res[c.fern[0]][0]} ${res[c.fern[0]][1]}</span><p>${esc(c.fern[1])}</p></div>` : ""}</div></li>`).join("")}</ol>
   <p class="note">${gl("P10")} The order comes from the cases that went wrong: Fernwood's timezone was missed (LC-48133), Oakhurst lost a day to a “propagation delay” (LC-48113), and Verdant's late replies were blamed on expiry before its rate-limit errors were ruled out.</p>`;
  $("#wsbody").onclick = e => { if (e.target.closest("[data-run]")) { S.run = !S.run; pagePlaybook(d) } };
}
function pageEscalation(d) {
  $("#wsbody").innerHTML = `<div class="facts">${ESC.facts.map(([k, v]) => `<div><span>${k}</span><b>${esc(v)}</b></div>`).join("")}</div>
   <div class="section"><h3>What Jordan reported, and why</h3><div class="box tablewrap"><table class="tbl"><thead><tr><th>What Jordan sees</th><th>Kind</th><th>Cause</th><th>Fix</th></tr></thead><tbody>${ESC.symptoms.map(s => `<tr><td><b>${esc(s.s)}</b></td><td><span class="kchip">${esc(s.kind)}</span></td><td>${esc(s.c)}</td><td>${esc(s.fix)}</td></tr>`).join("")}</tbody></table></div></div>
   <div class="grid2">
    <div class="section"><h3>One thread, one owner ${gl("P11")}</h3><div class="box"><div class="tlbody timeline">${ESC.thread.map(t => `<div class="tl ${t.k === "key" ? "me" : ""}"><span class="d">${t.d}</span><span class="rail"><i style="background:${t.k === "bad" ? "var(--bad)" : t.k === "warn" ? "var(--warn)" : t.k === "key" ? "var(--accent)" : "var(--muted)"}"></i></span><span class="x"><b class="tlt">${esc(t.t)}</b>${t.n ? `<small>${esc(t.n)}</small>` : ""}</span></div>`).join("")}</div></div></div>
    <div class="stack"><div class="section"><h3>Evidence check ${gl("D44")}</h3><div class="box">${ESC.evidence.map(([ok, k, v]) => `<div class="ev"><span class="ck ${ok ? "y" : "n"}">${ok ? "✓" : "✗"}</span><div><b>${esc(k)}</b><p class="note">${esc(v)}</p></div></div>`).join("")}</div></div>
     <div class="section"><h3>Ticket statuses to fix ${gl("D36")}</h3><div class="box">${ESC.hygiene.map(([t, p, f]) => `<div class="ev"><span class="mono small tkt">${t}</span><div><b>${esc(p)}</b><p class="note">${esc(f)}</p></div></div>`).join("")}</div></div></div>
   </div>
   <div class="section"><h3>Next steps <span class="note">${S.escDone.size} of ${ESC.next.length} done</span></h3><div class="box">${ESC.next.map(([t, w, by], i) => { const on = S.escDone.has(i); return `<div class="cq ${on ? "done" : ""}"><button class="check ${on ? "on" : ""}" data-esc="${i}" aria-pressed="${on}" aria-label="Mark done: ${esc(t)}">${on ? "✓" : ""}</button><div><b>${esc(t)}</b><div class="sub">${avatar(w)} ${esc(w)} · by ${esc(by)}</div></div></div>` }).join("")}</div></div>`;
  $("#wsbody").onclick = e => { const b = e.target.closest("[data-esc]"); if (b) { const i = +b.dataset.esc; S.escDone.has(i) ? S.escDone.delete(i) : S.escDone.add(i); pageEscalation(d) } };
}
function pageData(d) {
  $("#wsbody").innerHTML = `<p class="lead">${esc(d.summary)}</p>
   <div class="box tablewrap"><table class="tbl defs"><thead><tr><th>Field</th><th>Today</th><th>Problem</th><th>Proposed definition</th><th>Owner</th></tr></thead><tbody>${DATA_DEFS.map(r => `<tr><td><span class="fname">${esc(r.f)}</span>${gl(r.gaps)}</td><td>${esc(r.today)}</td><td>${esc(r.issue)}</td><td><b>${esc(r.def)}</b></td><td class="nowrap">${avatar(r.owner)} ${esc(r.owner)}</td></tr>`).join("")}</tbody></table></div>
   <p class="note">CRM problems that change who gets an early-access invite are flagged in <button class="lnk" data-nav="launch:candidates:checks">Launch → EA candidates</button>.</p>`;
}
function pageChangeLog(d) {
  $("#wsbody").innerHTML = `<p class="lead">${esc(d.summary)}</p><div class="callout gray"><b>${ico("clock", 16)} Why merchants need this ${gl("D45")}</b><p>Session Controls moved existing Two-Way instances to 1-hour sessions without telling them. Any merchant comparing contacts or reopens across Sep 29 is comparing two different setups.</p></div>${changeLogHTML()}`;
}

/* ---------- Gap index ---------- */
const MOD_ICON = { health: "pulse", answers: "answers", questions: "question", changes: "changes", launch: "rocket", playbooks: "book", data: "index" };
function goLabel(go) {
  const [v, a, b] = go.split(":");
  if (v === "doc") return shortTitle(a) + (b === "health" ? " · Health" : "");
  if (v === "agent") return "Ask agent · source ranking";
  const base = { launch: "Launch", health: "Help-centre health", answers: "Answers", questions: "Questions log", changes: "Releases and changes" }[v];
  const sub = { candidates: b === "checks" ? "Data checks" : "EA candidates", corrections: "Corrections", confirm: "Confirm with Product", macros: "Macros", peer: "Peer answers", dm: "DMs", lc1204: "LC-1204 notice", log: "Change log", review: "Release review", windows: "Stats windows", template: "Template" }[a] || (v === "answers" && a ? ANSWERS.find(x => x.id === a).short : "");
  return base + (sub ? " · " + sub : "");
}
function renderGaps() {
  const by = MODULES.map(m => ({ m, gaps: Object.entries(GAPS).filter(([, g]) => g.mod === m.key) }));
  $("#main").innerHTML = crumbs(["Live Chat docs", "Gap index"]) + `<div class="scroll"><div class="page wide">
   <div class="titlerow"><div><div class="eyebrow">Case study · Scenario B, Launch in a box</div><h1>Gap index</h1>
    <p class="lead">The ${Object.keys(GAPS).length} gaps championed for this scenario, grouped by the Doc Desk feature that closes them. Select a gap to see it in place, or turn on the gap lens (G) to see badges across the app. IDs follow the consolidated gaps-and-solutions list.</p></div>
</div>
   <div class="modgrid">${by.map(({ m, gaps }) => `<button class="modcard" data-jump="mod-${m.key}"><span class="mc-i">${ico(MOD_ICON[m.key], 16)}</span><b>${esc(m.title)}</b><span class="note">${plural(gaps.length, "gap")}</span></button>`).join("")}</div>
   ${by.map(({ m, gaps }) => `<section class="section gapmod" id="mod-${m.key}">
     <div class="listhead"><div><h3>${ico(MOD_ICON[m.key], 15)} ${esc(m.title)} <span class="note">${gaps.length}</span></h3><p class="note">${esc(m.blurb)}</p></div><button class="btn small" data-nav="${m.view}">Open ${ico("chev", 12)}</button></div>
     <div class="box">${gaps.map(([id, g]) => `<button class="gaprow" id="x-${id}" data-nav="${g.go}"><span class="gid">${id}</span><span class="gname"><b>${esc(g.name)}</b><small>${esc(g.what)}</small></span><span class="gwhere">${esc(goLabel(g.go))} ${ico("chev", 12)}</span><span class="gsols">${g.sols.map(s => `<span class="sol" title="${esc(SOLS[s] || "")}">${s}</span>`).join("")}</span></button>`).join("")}</div></section>`).join("")}
  </div></div>`;
  $("#main").querySelector(".modgrid").onclick = e => { const b = e.target.closest("[data-jump]"); if (b) document.getElementById(b.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" }) };
}

/* ---------- URL routing ---------- */
let HASH_POP = false;
const VIEW_SLUG = { home: "overview", health: "help-centre", answers: "answers", questions: "questions", changes: "changes", gaps: "gaps", map: "map" };
function hashFor() {
  if (TR.on) return "#/demo/" + (TR.i + 1);
  if (S.view === "doc") return "#/doc/" + S.sel + (S.tab && S.tab !== "content" ? "/" + S.tab : "");
  if (S.view === "launch") return "#/launch/" + (S.launchTab || "plan");
  if (S.view === "questions" && S.qFilter && S.qFilter !== "all") return "#/questions/" + S.qFilter;
  return "#/" + (VIEW_SLUG[S.view] || "overview");
}
function readHash() {
  const h = location.hash.replace(/^#\/?/, "").split("/"), v = h[0];
  if (v === "doc" && BYID[h[1]]) { S.view = "doc"; S.sel = h[1]; S.tab = h[2] || "content" }
  else if (v === "launch") { S.view = "launch"; S.launchTab = LTABS.includes(h[1]) ? h[1] : "plan" }
  else if (v === "questions") { S.view = "questions"; S.qFilter = ["wrong", "peer", "dm", "decide"].includes(h[1]) ? h[1] : "all" }
  else { const m = Object.keys(VIEW_SLUG).find(k => VIEW_SLUG[k] === v); if (m) S.view = m }
}
function syncHash() {
  const h = hashFor(); if (location.hash === h) return;
  try { HASH_POP ? history.replaceState(null, "", h) : history.pushState(null, "", h) } catch (e) { }
}
