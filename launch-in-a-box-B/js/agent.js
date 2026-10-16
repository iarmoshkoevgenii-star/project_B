/* Doc Desk v2 · Ask agent
   A demo agent with no model behind it: 14 questions have checked answers (SCRIPT in content.js), and anything
   else gets a keyword search. Every answer shows its sources ranked by authority, then freshness, with
   superseded and contradicted sources set aside, so it's clear why one source beat another. */

const AG = { chat: [], busy: false, timer: null, done: null };
const strip = h => String(h).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();
const docText = d => d.body.map(b => b.h ? b.h + ":" : b.ul ? b.ul.map(x => "- " + strip(x)).join("\n") : b.ol ? b.ol.map((x, i) => `${i + 1}. ${strip(x)}`).join("\n")
  : b.table ? b.table.rows.map(r => "- " + r.map((c, i) => (b.table.head[i] ? strip(b.table.head[i]) + ": " : "") + strip(c)).join(" · ")).join("\n") : strip(b.p || b.quote || b.note || (typeof b.html === "function" ? b.text : b.html) || "")).join("\n");
const STOP = new Set("the a an and or of to in on for is are be it this that with what which who when where how do does can i we our my you your from by at as about any there their they them was were will would should could still".split(" "));
const toks = s => String(s).toLowerCase().replace(/[^a-z0-9_\/\-\s]/g, " ").split(/\s+/).filter(w => w.length > 1 && !STOP.has(w));
const SUGG = [0, 13, 3, 12, 7, 9].map(i => SCRIPT[i].q);

function retrieve(q, k = 4) {
  const qs = toks(q); if (!qs.length) return [];
  return DOCS.map(d => {
    const fields = [[d.title, 3], [d.tags.map(t => t.t.replace(/_/g, " ") + " " + t.t).join(" "), 3], [d.summary, 2], [d.conflict || "", 1.5], [docText(d), 1]];
    let sc = 0;
    fields.forEach(([txt, w]) => { const T = toks(txt); qs.forEach(x => { const hits = T.filter(t => t === x || (x.length > 4 && t.startsWith(x.slice(0, 5)))).length; sc += Math.min(hits, 3) * w }) });
    return { d, sc };
  }).filter(x => x.sc > 0).sort((a, b) => b.sc - a.sc).slice(0, k);
}
function bestLine(d, q) {
  const qs = toks(q), lines = [d.summary, ...docText(d).split("\n")];
  let best = lines[0], bs = -1;
  lines.forEach(l => { const T = toks(l), sc = qs.filter(x => T.includes(x)).length; if (sc > bs) { bs = sc; best = l } });
  return best.replace(/^- /, "");
}
function scriptMatch(q) {
  const norm = s => s.toLowerCase().replace(/[^a-z0-9\/\- ]/g, "").replace(/\s+/g, " ").trim();
  const exact = SCRIPT.find(s => norm(s.q) === norm(q)); if (exact) return exact;
  const qs = toks(q); if (!qs.length) return null;
  let best = null, bs = 0;
  SCRIPT.forEach(s => {
    const T = toks(s.q + " " + s.k.join(" "));
    const hit = qs.filter(x => T.some(t => t === x || (t.length > 4 && x.length > 4 && t.slice(0, 5) === x.slice(0, 5)))).length;
    const sc = hit / Math.max(qs.length, 3);
    if (sc > bs) { bs = sc; best = s }
  });
  return bs >= .55 ? best : null;
}
/* authority first, then freshness; superseded docs are left out and contradicted ones lose */
function rankSources(ids) {
  return ids.map(id => BYID[id]).filter(Boolean).map(d => ({ d, out: d.status === "Superseded", lost: !!d.conflict && d.status !== "Superseded", auth: AUTHORITY[d.type] || 1 }))
    .sort((a, b) => (a.out - b.out) || (a.lost - b.lost) || (b.auth - a.auth) || b.d.date.localeCompare(a.d.date))
    .map(x => ({
      id: x.d.id, state: x.out ? "out" : x.lost ? "lost" : "used",
      why: x.out ? `Superseded, so it's left out` : x.lost ? `${TYPES[x.d.type].label}, ${fmtShort(x.d.date)}. Flagged as contradicting a newer doc` : `${TYPES[x.d.type].label}, ${fmtShort(x.d.date)}`
    }));
}
function answerFor(q) {
  const s = scriptMatch(q);
  if (s) return { content: s.a, rank: s.rank.map(([id, why, state]) => ({ id, why, state: state || (BYID[id].status === "Superseded" ? "out" : "used") })) };
  const hits = retrieve(q, 4);
  if (!hits.length) return { content: "Nothing in Doc Desk matches that. Try other words, or one of the suggested questions.", rank: [], note: "Keyword search" };
  const rank = rankSources(hits.map(h => h.d.id)), used = rank.filter(r => r.state === "used").slice(0, 3);
  const pick = used.length ? used : rank.filter(r => r.state === "lost").slice(0, 2);
  return {
    content: "I don't have a checked answer for that, so here are the closest passages, the most authoritative first:\n" + pick.map(r => `- ${bestLine(BYID[r.id], q)} [${r.id}]`).join("\n"),
    rank, note: "Keyword search · not a checked answer"
  };
}

function fmtAnswer(t) {
  return esc(t).replace(/\[((?:d\d+)(?:\s*[,;]\s*d\d+)*)\]/g, (m, ids) => ids.split(/\s*[,;]\s*/).map(id => BYID[id] ? `<button class="cite" data-cite="${id}" title="${esc(BYID[id].title)}">${id}</button>` : m).join(""));
}
function msgA(m) {
  if (m.pending) return `<div class="msg a"><div class="tool"><div class="tsum">${ico("book", 15)} Searching ${DOCS.length} docs <span><span class="spin"></span></span></div></div></div>`;
  const rk = m.rank || [], used = rk.filter(r => r.state === "used").length, aside = rk.length - used;
  let n = 0;
  const tool = rk.length ? `<details class="tool" ${aside ? "open" : ""}><summary>${ico("book", 15)} Sources, ranked <span>${used} used${aside ? ` · ${aside} set aside` : ""}</span></summary>
    <ol class="rank">${rk.map(r => `<li class="${r.state}"><span class="rn">${r.state === "used" ? ++n : "✕"}</span><div><button data-cite="${r.id}">${esc(BYID[r.id].title)}</button><small>${esc(r.why)}</small></div><span class="rk ${r.state}">${{ used: "Used", lost: "Lost", out: "Left out" }[r.state]}</span></li>`).join("")}</ol>
    <div class="rankcap">${gl("D29")}<span>Authority first, then freshness. Superseded docs are left out.</span></div></details>` : "";
  return `<div class="msg a">${tool}<div class="atext">${fmtAnswer(m.shown ?? m.content)}</div>${m.note && m.shown === undefined ? `<div class="anote">${esc(m.note)}</div>` : ""}</div>`;
}
function renderConvo() {
  const c = $("#convo");
  if (!AG.chat.length) {
    c.innerHTML = `<div class="hello"><h3>How can I help?</h3><p>Ask about Live Chat. I answer from Doc Desk, cite each source and show why one source beat another.</p>
     <div class="sugg">${SUGG.map(q => `<button data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div></div>`;
    return;
  }
  c.innerHTML = AG.chat.map(m => m.role === "user" ? `<div class="msg q">${esc(m.content)}</div>` : msgA(m)).join("");
  c.scrollTop = c.scrollHeight;
}
function ask(q) {
  q = String(q).trim(); if (!q || AG.busy) return;
  AG.chat.push({ role: "user", content: q });
  const ans = { role: "assistant", pending: true };
  AG.chat.push(ans); AG.busy = true; setAskUI(); renderConvo();
  const res = answerFor(q);
  AG.done = () => { clearTimeout(AG.timer); clearInterval(AG.timer); Object.assign(ans, res, { pending: false }); delete ans.shown; AG.busy = false; AG.timer = null; AG.done = null; setAskUI(); renderConvo() };
  AG.timer = setTimeout(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { AG.done(); return }
    Object.assign(ans, res, { pending: false, shown: "" });
    const words = res.content.split(/(\s+)/); let i = 0;
    AG.timer = setInterval(() => { i = Math.min(words.length, i + 6); ans.shown = words.slice(0, i).join(""); if (i >= words.length) AG.done(); else renderConvo() }, 30);
  }, 480);
}
function setAskUI() {
  const b = $("#askgo"); b.classList.toggle("stop", AG.busy);
  b.innerHTML = AG.busy ? '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/></svg>'
    : '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  b.setAttribute("aria-label", AG.busy ? "Finish now" : "Ask");
}
function openAgent(open) {
  const app = $("#app"), p = $("#agentpanel"), on = open ?? p.hidden;
  p.hidden = !on; app.classList.toggle("agent-open", on); renderRail();
  if (on) { renderConvo(); if (innerWidth > 640) $("#askq").focus({ preventScroll: true }) }
}
$("#agentclose").addEventListener("click", () => openAgent(false));
$("#agentclear").addEventListener("click", () => { if (AG.done) AG.done(); AG.chat = []; renderConvo() });
$("#askform").addEventListener("submit", e => { e.preventDefault(); if (AG.busy) { AG.done && AG.done(); return } const v = $("#askq").value; $("#askq").value = ""; $("#askq").style.height = "auto"; $("#askgo").classList.remove("go"); ask(v) });
$("#askq").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#askform").requestSubmit() } });
$("#askq").addEventListener("input", e => { $("#askgo").classList.toggle("go", !!e.target.value.trim()); e.target.style.height = "auto"; e.target.style.height = Math.min(140, e.target.scrollHeight) + "px" });
$("#convo").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.q) ask(b.dataset.q);
  else if (b.dataset.cite) { S.fTag = ""; S.q = ""; navTo("doc:" + b.dataset.cite); if (innerWidth <= 1240) openAgent(false) }
});
