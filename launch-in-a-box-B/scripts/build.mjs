#!/usr/bin/env node
/* Doc Desk build: zero dependencies, Node 18+.
   1. Checks every script compiles and the page loads them in order.
   2. Checks the data the pages are rendered from: docs, the launch plan, the questions for Product, the
      sections at the bottom of the early-access article, the gaps, and every demo step's target.
   3. Writes the deployable site to dist/, with content hashes on the CSS and JS URLs so a new deploy
      never mixes old and new files in a browser cache.

   npm run build    checks, then writes dist/   (Vercel and Netlify run this)
   npm run check    checks only
*/
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");
const CHECK_ONLY = process.argv.includes("--check");
const SCRIPTS = ["data", "content", "app", "modules", "agent", "tour", "boot"].map(n => `js/${n}.js`);
const SITE = ["index.html", "css", "js", "fonts", "robots.txt", "_headers"]; // _headers is for Netlify; Vercel uses vercel.json

const problems = [];
const ok = msg => console.log(`  ✓ ${msg}`);
const fail = msg => problems.push(msg);
const read = p => readFileSync(join(ROOT, p), "utf8");
const isDate = s => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + "T12:00:00Z"));

console.log(`Doc Desk ${CHECK_ONLY ? "check" : "build"}`);

/* ---------- 1. the page and its scripts ---------- */
const html = read("index.html");
const linked = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
if (linked.join() !== SCRIPTS.join()) fail(`index.html must load ${SCRIPTS.join(", ")} in that order (found ${linked.join(", ") || "none"})`);
if (!/href="css\/styles\.css"/.test(html)) fail("index.html must link css/styles.css");
for (const f of [...SCRIPTS, "css/styles.css", "robots.txt"]) if (!existsSync(join(ROOT, f))) fail(`missing ${f}`);
const fontRefs = [...read("css/styles.css").matchAll(/url\("?\.\.\/(fonts\/[^")]+)"?\)/g)].map(m => m[1]);
for (const f of fontRefs) if (!existsSync(join(ROOT, f))) fail(`css/styles.css points to missing ${f}`);
let compiled = 0;
for (const f of SCRIPTS) {
  if (!existsSync(join(ROOT, f))) continue;
  try { new vm.Script(read(f), { filename: f }); compiled++ } catch (e) { fail(`${f} doesn't compile: ${e.message}`) }
}
if (compiled === SCRIPTS.length) ok(`${compiled} scripts compile and load in order · ${fontRefs.length} fonts present`);

/* ---------- 2. the data ---------- */
let D = null;
if (!problems.length) {
  const ctx = vm.createContext({ console });
  try {
    vm.runInContext(read("js/data.js"), ctx, { filename: "js/data.js" });
    vm.runInContext(read("js/content.js"), ctx, { filename: "js/content.js" });
    D = vm.runInContext("({ DOCS, BYID, LAUNCH, GAPS, SCRIPT, COND_OVERRIDE, LLM })", ctx);
  } catch (e) { fail(`the data doesn't load: ${e.message}`) }
}
if (D) {
  const { DOCS, BYID, LAUNCH, GAPS, SCRIPT, COND_OVERRIDE, LLM } = D;
  const docRef = (id, where) => { if (!BYID[id]) fail(`${where} points to a doc that doesn't exist: ${id}`) };

  const ids = DOCS.map(d => d.id);
  if (new Set(ids).size !== ids.length) fail("two docs share an id");
  for (const d of DOCS) {
    if (!d.title || !Array.isArray(d.body)) fail(`${d.id} needs a title and a body`);
    for (const b of d.body || []) for (const m of JSON.stringify(b).matchAll(/data-nav=\\?['"]doc:(d\d+)/g)) docRef(m[1], `a link in ${d.id}`);
  }

  for (const p of LAUNCH.pieces) {
    if (p.doc) docRef(p.doc, `launch piece “${p.piece}”`);
    const go = /^doc:(d\d+)/.exec(p.go || ""); if (go) docRef(go[1], `launch piece “${p.piece}”`);
    const ds = (p.d || []).filter(Boolean);
    if (ds.some(x => !isDate(x))) fail(`launch piece “${p.piece}” has a stage date that isn't YYYY-MM-DD`);
    else if (ds.some((x, i) => i && x < ds[i - 1])) fail(`launch piece “${p.piece}” has stages out of order: ${ds.join(" → ")}`);
  }

  const qs = LAUNCH.confirm;
  if (!qs.length) fail("there are no questions for Product");
  qs.forEach((c, i) => {
    const n = `question ${i + 1} for Product`;
    if (!c.q || !c.who || !c.blocks) fail(`${n} needs a question, an owner and what it blocks`);
    if (!isDate(c.by)) fail(`${n} needs a YYYY-MM-DD answer date`);
    if (/·/.test(c.who || "")) fail(`${n}: join owners with “and”, not “·”`);
  });
  if (new Set(qs.map(c => c.q)).size !== qs.length) fail("a question for Product is listed twice");
  if (LAUNCH.ifChanges.length !== 4 || LAUNCH.ifChanges.some(s => s.length !== 2 || !s[0] || !s[1])) fail("“If the plan changes again” needs four [step, detail] pairs");

  const slot = (id, name) => { const n = (BYID[id]?.body || []).filter(b => b.slot === name).length; if (n !== 1) fail(`${id} needs exactly one “${name}” section (found ${n})`) };
  slot("d4", "confirm"); slot("d4", "instep"); slot("d5", "confirm-short");
  const d4 = BYID.d4?.body || [], notes = d4.findIndex(b => b.h === "Notes for reviewers (internal)");
  if (notes < 0 || notes > d4.findIndex(b => b.slot === "confirm")) fail("d4: the questions for Product must sit under “Notes for reviewers (internal)”");

  const nGaps = Object.keys(GAPS).length;
  if (nGaps !== 34) fail(`expected 34 gaps, found ${nGaps}`);
  for (const s of SCRIPT) for (const [id] of s.rank || []) docRef(id, `the agent's ranking for “${s.q}”`);
  for (const id of Object.keys(COND_OVERRIDE)) docRef(id, "publish conditions");
  for (const id of Object.keys(LLM)) docRef(id, "LLM-ready proposals");

  /* the demo journey: parsed, not run, because tour.js needs a browser */
  const tour = read("js/tour.js");
  const steps = [...tour.matchAll(/\{ ch: "(brief|gaps)"([^\n]*)/g)];
  const brief = steps.filter(m => m[1] === "brief").length;
  for (const m of steps) {
    const go = /go: "doc:(d\d+)/.exec(m[2]); if (go) docRef(go[1], "a demo step");
    for (const g of (/gaps: \[([^\]]*)\]/.exec(m[2])?.[1] || "").match(/[A-Z]+\d+/g) || []) if (!GAPS[g]) fail(`a demo step names a gap that doesn't exist: ${g}`);
    for (const r of (/req: \[([^\]]*)\]/.exec(m[2])?.[1] || "").match(/B\d/g) || []) if (!/^B[1-4]$/.test(r)) fail(`a demo step names an unknown brief part: ${r}`);
  }
  for (const id of ["x-d4-confirm", "x-d4-instep"]) if (!tour.includes(`"#${id}"`)) fail(`the demo has no step for #${id}`);

  if (!problems.length) {
    ok(`${DOCS.length} docs · ${LAUNCH.pieces.length} launch pieces · ${nGaps} gaps`);
    ok(`${qs.length} questions for Product and the four in-step steps, shared by the article, the hub and Confirm with Product`);
    ok(`demo: ${steps.length} steps (${brief} brief, ${steps.length - brief} gaps), every target doc exists`);
  }
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem${problems.length > 1 ? "s" : ""}:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (CHECK_ONLY) { console.log("All checks passed."); process.exit(0) }

/* ---------- 3. dist/ ---------- */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const p of SITE) if (existsSync(join(ROOT, p))) cpSync(join(ROOT, p), join(OUT, p), { recursive: true });
const hash = p => createHash("sha256").update(readFileSync(join(ROOT, p))).digest("hex").slice(0, 10);
const page = html
  .replace('href="css/styles.css"', `href="css/styles.css?v=${hash("css/styles.css")}"`)
  .replace(/<script src="(js\/[\w-]+\.js)"><\/script>/g, (_, f) => `<script src="${f}?v=${hash(f)}"></script>`);
writeFileSync(join(OUT, "index.html"), page);

const files = [];
const walk = d => { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : files.push(p) } };
walk(OUT);
const kb = Math.round(files.reduce((a, f) => a + statSync(f).size, 0) / 1024);
ok(`dist/ written: ${files.length} files, ${kb} KB (${files.map(f => relative(OUT, f)).filter(f => !f.includes("/")).join(", ")} and css/, js/, fonts/)`);
