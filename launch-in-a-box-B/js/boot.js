/* Doc Desk v2 · boot: restore per-viewer settings, route from the URL, first render, and start the demo from #/demo. */
try { S.lens = localStorage.getItem("docdesk-lens") === "1" } catch (e) { }
try { const l = JSON.parse(localStorage.getItem("docdesk-logged") || "[]"); if (Array.isArray(l)) S.logged = l.filter(x => x && x.id && x.q && x.a) } catch (e) { }
S.view = "home";
const DEMO_AT = demoStepFromHash();
readHash();
if (innerWidth >= 1600) { $("#agentpanel").hidden = false; $("#app").classList.add("agent-open") }
$("#agentnote").textContent = `Demo agent: ${SCRIPT.length} checked answers, keyword search for anything else.`;
HASH_POP = true; render(); HASH_POP = false;
renderConvo(); setAskUI();
if (DEMO_AT !== null) { HASH_POP = true; tourStart(DEMO_AT); HASH_POP = false }
addEventListener("popstate", () => {
  const target = location.hash, n = demoStepFromHash();
  HASH_POP = true;
  if (n !== null) tourStart(n);
  else {
    if (TR.on) { tourEnd(true); if (location.hash !== target) history.replaceState(null, "", target || location.pathname) }
    readHash(); render(); const sc = $("#main .scroll"); if (sc) sc.scrollTop = 0;
  }
  HASH_POP = false;
});
