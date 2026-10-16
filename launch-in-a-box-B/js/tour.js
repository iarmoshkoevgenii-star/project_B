/* Doc Desk v2 · demo journey
   A click-through of every feature. Chapter one follows the four parts of the Scenario B brief (B1–B4). Chapter two
   follows the 34 gaps, module by module. Each step opens a view, rings the part that does the work and names the brief
   requirement it meets and the gaps it closes. Back and Next (or ← →) move, Esc leaves, and #/demo/N opens step N.
   Loaded after agent.js and before boot.js. */

const REQS = {
  B1: ["Launch tracker", "A hosted launch tracker built from Noor's launch plan: every help article and enablement piece needed for early access and GA, who it's for, who reviews it, and when it moves from draft to review to ready to published."],
  B2: ["EA help article", "The early-access help article for merchants, due to Noor for review by Nov 2."],
  B3: ["Enablement", "Internal enablement for Sales, CS and Support that matches the current plan: what's in, what's out, how to talk about it, and what to tell merchants who won't be covered."],
  B4: ["Confirm · stay in step", "A short list of what Product must confirm before anything is published, and how the docs stay in step if the plan changes again."]
};
const GSHORT = {
  DOC2: "HC06 steps partly wrong", DOC3: "HC06 counts routed chats only", DOC4: "No Sync never explained", DOC5: "HC01 out of date",
  DOC7: "HC03 misleads", DOC8: "HC04 for developers only", DOC17: "Uneven article quality", D42: "Stats mix time windows",
  PR25: "Siena Inbox is a black box", DOC9: "Contradicting page-hiding answers", P3: "Conflicts stay in circulation",
  P6: "Announcement advice flip-flopped", P8: "Ad hoc session-length advice", P1: "No macro for the top issue",
  P2: "Wrong peer answers unchecked", P4: "DM answers never captured", D41: "Unreliable questions log",
  P18: "Releases skip merchant review", P7: "LC-1204 never announced", D45: "Silent setting changes", D40: "CRM errors",
  D35: "“Solved” hides unmet needs", D37: "Inconsistent tags and fields", P12: "Repeat asks not tracked",
  D43: "Inconsistent request counts", P16: "Scope changes miss Sales and Support", DOC18: "Stale roadmap and brief",
  P10: "No troubleshooting checklist", P11: "Scattered escalations", D44: "Weak escalation evidence",
  D36: "Untidy ticket statuses", D38: "Undefined first-response clock", D39: "Incomplete ticket log", D29: "Out-of-date sources win"
};
const CHAPTERS = [["brief", "The brief"], ["gaps", "The gaps"]];
const TR = { on: false, i: 0, saved: null, list: false, timer: null };

const weekPublishing = () => scheduledPieces().filter(p => { const n = daysFrom(p.d[3]); return n >= 0 && n < 7 }).length;
const peerStats = () => { const ps = allQuestions().filter(q => /peer/.test(q.by)); return [ps.filter(q => q.v === "wrong").length, ps.length] };
const fernCounts = () => CHECKLIST.reduce((a, c) => (a[c.fern[0]] = (a[c.fern[0]] || 0) + 1, a), {});

const TOUR = [
  /* ---------- chapter 1: the brief ---------- */
  { ch: "brief", go: "home", el: "#x-stats", req: ["B1"],
    t: "The Visibility Rules launch, in one place",
    s: () => `today is Monday, Oct 19 · ${DOCS.length} Live Chat pages · ${scheduledPieces().length} launch pieces, ${latePieces().length} late · early access in ${daysFrom("2026-11-09")} days` },
  { ch: "brief", go: "launch:plan", el: "#x-plan", req: ["B1"],
    t: "Every piece for early access and GA",
    s: () => `${LAUNCH.pieces.length} help articles, guides, messages and updates in four phases · who each one is for · its owner · its reviewer` },
  { ch: "brief", go: "launch:plan", el: ["#x-plan tr.late .stepr", "#x-stages"], req: ["B1"], gaps: ["DOC18"],
    t: "Draft → review → ready → published",
    s: "a date for every stage · amber is due today, red is late · the Linear update was due Oct 14, and Sales quoted the old dates on Oct 16" },
  { ch: "brief", go: "launch:schedule", el: "#x-gantt", req: ["B1"],
    t: "The same plan on a timeline",
    s: () => `${weekPublishing()} pieces publish this week · EA list Oct 23 · article to Noor Nov 2 · early access Nov 9 · GA Jan 11` },
  { ch: "brief", go: "doc:d4", el: ".docbody .dtable", req: ["B2"],
    t: "The early-access help article",
    s: "at a glance · who can use page rules · how to add a rule · what each pattern matches · recipes · known issues · troubleshooting" },
  { ch: "brief", go: "doc:d4", el: "#x-lstrip", req: ["B2", "B1"],
    t: "Due to Noor for review on Nov 2",
    s: "Tomás and Dani review it too · it's published with early access on Nov 9 · what Product still owes is at the bottom" },
  { ch: "brief", go: "doc:d4", el: "#x-d4-confirm", req: ["B4", "B2"],
    t: "Questions for Product, at the bottom of the article",
    s: () => `${LAUNCH.confirm.length} questions to answer before publishing · an owner and a date for each · starting with what customers will see` },
  { ch: "brief", go: "doc:d4", el: "#x-d4-instep", req: ["B4"], gaps: ["DOC18", "P16"],
    t: "If the plan changes again",
    s: "four steps, the same day · change the source, find every copy, update together, close the loop · the facts this article shares with other pages" },
  { ch: "brief", go: "doc:d4:llm", el: "#wsbody .scorebox", req: ["B2"],
    t: "Written so the AI agent can quote it",
    s: () => `retrieval score ${llmScore("d4")} now · front matter and flagged open questions take it to ${Math.min(100, LLM.d4.base + LLM.d4.props.reduce((a, p) => a + p.pts, 0))} · tested on questions from real tickets` },
  { ch: "brief", go: "doc:d5", el: ".docbody .dtable", req: ["B3"], gaps: ["P16", "DOC18"],
    t: "Internal enablement: what's in, what's out",
    s: "one hub for Sales, CS and Support · the plan in one table · what's out and what to say · a guide for each team" },
  { ch: "brief", go: "doc:d27", el: ".dtable.say", req: ["B3"], gaps: ["P16"],
    t: "Sales: how to talk about it",
    s: "the one-liner · what to promise and what not to · what to say instead of the old pitch · prospects who won't be covered" },
  { ch: "brief", go: "doc:d28", el: ".docbody .dtable", req: ["B3"], gaps: ["P16", "P12"],
    t: "CS: who's invited, and who isn't",
    s: "the 31 requesting accounts by coverage · nominations by Oct 23 · what to say to the 12 that won't be covered" },
  { ch: "brief", go: "doc:d29", el: ".docbody .dtable", req: ["B3"], gaps: ["DOC9", "D37"],
    t: "Support: the answer, by date",
    s: "before Nov 9, from Nov 9 and at GA · the macro and the feature-request tag · troubleshooting · tickets to revisit" },
  { ch: "brief", go: "doc:d30", el: ".dtable.wide", req: ["B3"], gaps: ["P16"],
    t: "What to tell merchants who won't be covered",
    s: "headless · non-Shopify · pasted scripts · after-hours hiding · what works today · the same words for every team" },
  { ch: "brief", go: "doc:d3:conditions", el: "#wsbody > .box", req: ["B4", "B3"], gaps: ["DOC18", "P16"],
    t: "Publishing the change runs six conditions",
    s: "PM sign-off · install coverage · Linear updated · older docs superseded · contradicting articles queued · every team told" },
  { ch: "brief", modal: true, req: ["B3", "B1"], gaps: ["P16"],
    act: () => { navTo("doc:d3:conditions"); openCompose(BYID.d3, "Sales") }, leave: () => { if (MODAL) closeModal() },
    t: "Edit the draft, then send it",
    s: "drafted from the Sales template with the Oct 14 details · the condition ticks itself off when every team has theirs" },
  { ch: "brief", go: "launch:corrections", el: ".corrs", req: ["B3", "B4"], gaps: ["P16", "DOC18"],
    t: "Sales is already pitching the old version",
    s: "everyone who repeated the old scope · who heard it · what's wrong · the fix that sets it straight" },
  { ch: "brief", go: "launch:confirm", el: "#x-confirm", req: ["B4"],
    t: "The same questions, tracked to an answer",
    s: () => `${LAUNCH.confirm.length} questions · the piece each one blocks · tick one off and the article and the hub show it answered` },
  { ch: "brief", go: "launch:confirm", el: "#x-facts", req: ["B4"], gaps: ["P16", "DOC18"],
    t: "Keep every copy in step",
    s: "each launch fact, found in every page and message · red chips still carry the old value · “find every copy”, done for you" },
  { ch: "brief", req: ["B4"], map: true,
    act: () => { S.view = "map"; S.mapDoc = "d3"; S.mapTag = ""; S.mapAnim = true; $("#app").classList.remove("tree-open"); if (innerWidth < 1600 && !$("#agentpanel").hidden) openAgent(false); render() },
    t: "Show related documents",
    s: "the library scatters, then snaps together by shared tags · a change to one doc shows every doc it touches" },

  /* ---------- chapter 2: the gaps ---------- */
  { ch: "gaps", go: "launch:candidates", el: "#x-checks", req: ["B1"], gaps: ["D40", "D35", "D37", "P12", "D43"],
    t: "Check the data before invites go out",
    s: "31 accounts asked, holding $3.44M · CRM errors · unmet asks behind “Solved” · missing tags · repeat asks per account" },
  { ch: "gaps", go: "health", el: "#main .page > .box.tablewrap", gaps: ["DOC17", "D42", "DOC5", "DOC7", "DOC8"],
    t: "Help-centre health",
    s: () => `${hcIds().length} public articles · views, votes and a six-point template check · ${hcIds().filter(id => templateScore(id) === TEMPLATE_CHECKS.length).length} pass today · fixes ready for HC01, HC03 and HC04` },
  { ch: "gaps", go: "doc:d15:health", el: "#wsbody .prop", gaps: ["DOC2", "DOC3"],
    t: "Fixes as before-and-after changes",
    s: "accept them, then send the article to review · HC06's Zendesk and Gorgias steps, and what the tag really counts" },
  { ch: "gaps", go: "doc:d16", el: "#wsbody .dnote", gaps: ["DOC4", "PR25"],
    t: "No Sync, explained",
    s: "26 accounts ($2.88M) use it · the questions Product must answer about the Siena Inbox before it ships" },
  { ch: "gaps", go: "answers", el: "#x-a1", gaps: ["DOC9", "P3", "P6", "P8"],
    t: "One answer per question",
    s: () => `${ANSWERS[0].circulation.length} answers in circulation on hiding chat, each with a verdict · one owner · one decision and a date` },
  { ch: "gaps", go: "questions:peer", el: ".qlist", gaps: ["P2", "P4", "D41"],
    t: "Every internal answer, reviewed",
    s: () => { const [w, n] = peerStats(); return `${w} of ${n} peer answers were wrong · DM answers logged in one step · reviewed every Friday` } },
  { ch: "gaps", go: "questions:all", el: "#x-macros", gaps: ["P1"],
    t: "Answered three times? Make it a macro",
    s: "repeated questions and tickets become macro drafts · starting with the instance toggle" },
  { ch: "gaps", go: "changes", el: "#x-review", req: ["B4"], gaps: ["P18"],
    t: "Seven checks before a release ships",
    s: () => `Session Controls shipped with ${relScore(RELEASES[0])} of 7 · Visibility Rules early access has ${7 - relScore(RELEASES[2])} to close by Nov 9` },
  { ch: "gaps", go: "changes", el: "#x-lc1204", gaps: ["P7"],
    t: "Tell merchants about regressions",
    s: "LC-1204 closed routed One-Way tickets early for two weeks · no merchant was told · the status entry and the email are drafted" },
  { ch: "gaps", go: "changes", el: "#x-log", gaps: ["D45"],
    t: "A dated change log for merchants",
    s: () => `${CHANGELOG_M.filter(c => c.announced !== "yes").length} of ${CHANGELOG_M.length} changes weren't announced · every default change and migration, dated for before-and-after reports` },
  { ch: "gaps", el: ".runsum", gaps: ["P10"],
    act: () => { S.run = true; navTo("doc:d22") }, leave: () => { S.run = TR.saved.run },
    t: "A troubleshooting checklist, timezone first",
    s: () => { const c = fernCounts(); return `run against Fernwood's settings export · ${c.bad || 0} problems and ${c.warn || 0} to check · the order comes from the cases that went wrong` } },
  { ch: "gaps", go: "doc:d23", el: "#wsbody .facts", gaps: ["P11", "D44", "D36"],
    t: "One page and one owner per escalation",
    s: "Fernwood: what Jordan reported and why · one thread · an evidence check · the ticket statuses to fix" },
  { ch: "gaps", go: "doc:d24", el: "#wsbody .box.tablewrap", gaps: ["D38", "D39"],
    t: "Data definitions",
    s: "the first-response clock in business minutes, per channel · what the ticket export must include" },
  { ch: "gaps", el: "#convo .tool", delay: 1500, gaps: ["D29"],
    act: () => { navTo("doc:d3"); navTo("agent:ask") }, leave: () => { if (!TR.saved.agent) openAgent(false) },
    t: "Out-of-date sources don't win",
    s: "the agent ranks its sources: authority first, then freshness · the Oct 6 roadmap loses to the Oct 14 decision" },
  { ch: "gaps", el: ".modgrid",
    act: () => { navTo("gaps"); if (!S.lens) setLens(true) }, leave: () => { if (S.lens !== TR.saved.lens) setLens(TR.saved.lens) },
    t: () => `All ${Object.keys(GAPS).length} gaps, and where each one is closed`,
    s: "select a gap to open it in place · the gap lens puts a badge next to every feature · press G at any time" }
];

const tval = v => typeof v === "function" ? v() : v;
function tourBox() {
  let el = document.getElementById("tour");
  if (!el) {
    el = document.createElement("section"); el.id = "tour"; el.setAttribute("aria-label", "Demo journey");
    el.addEventListener("click", tourClick);
    document.body.appendChild(el);
  }
  return el;
}
function tourStart(i = 0) {
  if (!TR.on) {
    TR.on = true; TR.list = false; TR.i = -1;
    TR.saved = { lens: S.lens, run: S.run, agent: !$("#agentpanel").hidden };
    document.body.classList.add("touring");
    addEventListener("resize", tourPlace);
  }
  tourGo(i);
}
function tourEnd(fromPop) {
  const st = TOUR[TR.i]; if (st && st.leave) st.leave();
  tourClearHL(); clearTimeout(TR.timer);
  TR.on = false; TR.list = false;
  document.body.classList.remove("touring", "tour-top");
  document.getElementById("tour")?.remove();
  removeEventListener("resize", tourPlace);
  renderRail();
  if (!fromPop) { syncHash(); toast("Demo closed. Restart it from ▶ Demo, top right") }
}
function tourGo(i) {
  i = Math.max(0, Math.min(TOUR.length - 1, +i || 0));
  const prev = TOUR[TR.i];
  if (prev && prev.leave && TR.i !== i) prev.leave();
  TR.i = i; TR.list = false;
  const st = TOUR[i];
  clearTimeout(TR.timer); tourClearHL();
  if ($("#modalroot").innerHTML) closeModal();
  if (st.act) st.act(); else navTo(st.go);
  syncHash();
  tourRender(); tourPlace();
  requestAnimationFrame(() => { tourPlace(); TR.timer = setTimeout(() => tourHighlight(st), st.delay || 60) });
}
const tourNext = () => TR.i >= TOUR.length - 1 ? tourEnd() : tourGo(TR.i + 1);
function tourClick(e) {
  const b = e.target.closest("button"); if (!b) return;
  e.stopPropagation();
  if (b.hasAttribute("data-tnext")) tourNext();
  else if (b.hasAttribute("data-tback")) tourGo(TR.i - 1);
  else if (b.hasAttribute("data-tclose")) tourEnd();
  else if (b.hasAttribute("data-tlist")) { TR.list = !TR.list; tourRender(); tourPlace(); if (TR.list) document.querySelector("#tour .tl-it.on")?.scrollIntoView({ block: "center" }) }
  else if (b.dataset.tgo !== undefined) tourGo(+b.dataset.tgo);
}
function tourRender() {
  const box = tourBox(), st = TOUR[TR.i], n = TOUR.length, inCh = TOUR.filter(x => x.ch === st.ch), k = inCh.indexOf(st) + 1;
  const total = Object.keys(GAPS).length, seen = new Set(TOUR.slice(0, TR.i + 1).flatMap(x => x.gaps || []));
  if (TR.i === n - 1) Object.keys(GAPS).forEach(g => seen.add(g));
  const req = (st.req || []).map(r => `<span class="tr-req" title="${esc(REQS[r][1])}"><b>${r}</b>${esc(REQS[r][0])}</span>`).join("");
  const gaps = (st.gaps || []).map(g => `<span class="tr-gap" title="${esc(g + " · " + GAPS[g].name)}"><b>${g}</b>${esc(GSHORT[g] || GAPS[g].name)}</span>`).join("");
  const chName = CHAPTERS.find(c => c[0] === st.ch)[1];
  const list = !TR.list ? "" : `<div class="tour-list" id="tour-list">${CHAPTERS.map(([key, name]) => `<div class="tl-ch">${name}<span>${TOUR.filter(x => x.ch === key).length} steps</span></div>${TOUR.map((x, j) => x.ch !== key ? "" : `<button class="tl-it ${j === TR.i ? "on" : ""}" data-tgo="${j}" aria-current="${j === TR.i}"><span class="tl-n">${j + 1}</span><span class="tl-t">${esc(tval(x.t))}</span><span class="tl-c">${[...(x.req || []), ...(x.gaps || [])].join(" · ")}</span></button>`).join("")}`).join("")}</div>`;
  box.innerHTML = `${list}<div class="tour-card">
    <span class="tour-prog" role="progressbar" aria-label="Demo progress" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${TR.i + 1}"><i style="width:${((TR.i + 1) / n * 100).toFixed(1)}%"></i><em style="left:${(TOUR.filter(x => x.ch === "brief").length / n * 100).toFixed(1)}%"></em></span>
    <div class="tour-meta"><span>${chName} · ${k} of ${inCh.length}</span>${st.ch === "gaps" ? `<span class="tour-cnt">${seen.size} of ${total} gaps</span>` : ""}<span class="sp"></span>
     <button class="tour-x" data-tlist aria-expanded="${TR.list}" aria-controls="tour-list">${ico("index", 13)}<span class="lbl">All steps</span></button><button class="tour-x icon" data-tclose aria-label="Leave the demo" title="Leave the demo (Esc)">${ico("x", 14)}</button></div>
    <div aria-live="polite"><div class="tour-t">${esc(tval(st.t))}</div><div class="tour-s">${esc(tval(st.s))}</div></div>
    <div class="tour-nav"><div class="tour-tags">${req}${gaps}</div><span class="tour-n">${TR.i + 1} / ${n}</span>
     <button class="tour-btn" data-tback ${TR.i === 0 ? "disabled" : ""} aria-label="Previous step">←<span> Back</span></button><button class="tour-btn next" data-tnext>${TR.i === n - 1 ? "Finish" : "Next →"}</button></div>
  </div>`;
}
/* the caption sits over the visible part of the page: between the doc tree and the agent panel */
function tourPlace() {
  const t = document.getElementById("tour"); if (!t || !TR.on) return;
  const m = $("#main").getBoundingClientRect(); let L = m.left, R = m.right;
  const ap = $("#agentpanel");
  if (!ap.hidden && innerWidth > 640) { const a = ap.getBoundingClientRect(); if (a.width && a.left < R) R = a.left }
  if (innerWidth <= 640) { L = 0; R = innerWidth }
  const w = Math.max(260, Math.min(780, R - L - 32));
  t.style.width = w + "px"; t.style.left = Math.max(8, L + (R - L - w) / 2) + "px";
  const top = !!$("#modalroot").innerHTML;
  document.body.classList.toggle("tour-top", top);
  document.body.style.setProperty("--tourh", (t.offsetHeight + 28) + "px");
}
function tourClearHL() { document.querySelectorAll(".tour-hl").forEach(x => x.classList.remove("tour-hl")) }
function tourHighlight(st) {
  if (!TR.on || TOUR[TR.i] !== st) return;
  tourClearHL();
  let el = null; for (const s of [].concat(st.el || [])) { el = document.querySelector(s); if (el) break }
  if (!el) return;
  el.classList.add("tour-hl");
  if (el.closest("#agentpanel") || el.closest(".modal")) return;
  const r = el.getBoundingClientRect(), vh = innerHeight;
  el.scrollIntoView({ block: r.height < vh * .42 ? "center" : "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
addEventListener("keydown", e => {
  if (!TR.on) return;
  const t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
  const modal = !!$("#modalroot").innerHTML;
  if (e.key === "Escape") {
    if (modal) return;
    e.preventDefault();
    if (TR.list) { TR.list = false; tourRender(); tourPlace() } else tourEnd();
    return;
  }
  if (typing || modal || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === "ArrowRight") { e.preventDefault(); tourNext() }
  else if (e.key === "ArrowLeft") { e.preventDefault(); if (TR.i > 0) tourGo(TR.i - 1) }
}, true);
new MutationObserver(() => { if (TR.on) tourPlace() }).observe($("#modalroot"), { childList: true });
const demoStepFromHash = () => { const m = location.hash.match(/^#\/demo(?:\/(\d+))?\/?$/); return m ? Math.max(0, (+m[1] || 1) - 1) : null };
