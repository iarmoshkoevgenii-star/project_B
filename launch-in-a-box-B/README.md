# Doc Desk: Live Chat launch tracker (Scenario B)

Doc Desk is where the Live Chat docs live and stay true. It tracks the **Visibility Rules** launch from Noor's scope change on Oct 14 to GA on Jan 11, 2027: every help article and enablement piece, who it's for, who reviews it, and when it moves from draft to review to ready to published. Around the launch it closes 34 documentation, process and data gaps from the case-study pack, each one visible in place.

Built for the Siena Product Specialist case study, Scenario B (Launch in a box). Static HTML, CSS and JavaScript, with a zero-dependency build step that checks the data before every deploy: no backend, no external requests. The look follows Siena Docs: a white icon rail, the doc tree, a quiet page and the Ask panel.

> **Confidential.** This prototype uses merchant names, people and ticket references from the case-study pack. Keep the repository private, share the link only with the hiring team, and take everything down when the hiring process ends (see [Take it down](#take-it-down)).

**Start here:** open the site and choose **Start the demo** on the Overview, or go straight to `/#/demo`.

---

## The brief, and where to find each part

| Scenario B asks for | In Doc Desk |
|---|---|
| **B1.** A hosted launch tracker built from Noor's launch plan: every help article and enablement piece needed for early access and GA, who it's for, who reviews it, and when it moves from draft to review to ready to published | **Launch → Plan**: 30 pieces in four phases (correct the scope, early access, GA, later), each with its audience, owner, reviewer and a date for every stage. Amber is due today, red is late. **Launch → Schedule** shows the same plan as a timeline with the milestones. The Overview counts what publishes each week, and every page in the plan shows its own row of it. |
| **B2.** The early-access help article for merchants, due to Noor for review by Nov 2 | **Help articles → Show or hide Live Chat on chosen pages (early access)**: at a glance, who can use it, how to add a rule, how rules match pages, recipes, known issues, what page rules don't do, troubleshooting and how to turn rules off. It ends with **Notes for reviewers (internal)**, removed before publishing: the eight questions for Product and the four steps to follow if the plan changes again. Its LLM-ready tab shows how the AI agent will read it. |
| **B3.** Internal enablement for Sales, CS and Support that matches the current plan: what's in, what's out, how to talk about it, and what to tell merchants who won't be covered | **Enablement → Visibility Rules enablement: what's in, what's out** (the hub), the **Sales**, **CS** and **Support** guides, **Not covered by Visibility Rules v1: what to tell merchants**, the availability macro, and one message per department drafted from its template (scope change → Publish conditions). **Launch → Corrections** tracks everyone who repeated the old scope until it's corrected. |
| **B4.** A short list of what Product must confirm before anything is published, and how the docs stay in step if the plan changes again | **At the bottom of the early-access article**: eight questions for Product, each with an owner and a date, then the four steps to follow if the plan changes again and the launch facts the article shares with other pages. **Launch → Confirm with Product** tracks the same list with the piece each answer blocks: it's stored once and rendered in the article, the hub and the tab, so tick a question off and every copy shows it answered. **Where each fact lives** finds every page and message that states each launch fact, including the ones that still carry the old value. Tags link every related doc (**Show related documents**). |

### The launch plan

Dates are when each piece enters a stage. Today, in the pack, is Monday Oct 19.

| Piece | For | Owner | Reviewer | Draft → Review → Ready → Published |
|---|---|---|---|---|
| **Correct the scope (Oct 19–23)** | | | | |
| Linear roadmap and feature brief updated | Everyone internal | Noor Haddad | — | done by Oct 14 |
| Enablement hub: what's in, what's out | Sales, CS and Support | You | Noor Haddad | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Sales guide | Sales (AEs) | You | Noor Haddad · Sales lead | Oct 19 → Oct 20 → Oct 20 → Oct 20 |
| Message to #sales | Sales | You | Noor Haddad | Oct 19 → Oct 20 → Oct 20 → Oct 20 |
| CS guide | Customer Success | You | Leah Moreau · Noor Haddad | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Message to CSMs | Customer Success | You | Leah Moreau | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Support guide | Support | You | Dani Okafor | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Macro: Visibility Rules availability | Support | You | Dani Okafor | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Message to #cx-support | Support | You | Dani Okafor | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Not covered: what to tell merchants | Sales, CS and Support | You | Noor Haddad · Leah Moreau | Oct 19 → Oct 21 → Oct 22 → Oct 22 |
| Message to #deployment | Deployment | You | Ines Park | Oct 19 → Oct 20 → Oct 21 → Oct 21 |
| Hold note for Marketing | Marketing | You | Noor Haddad | Oct 19 → Oct 21 → Oct 22 → Oct 23 |
| Headless page for CX leads | CX leads | You | Ines Park · Tomás Reyes | Oct 19 → Oct 26 → Oct 28 → Oct 30 |
| **Early access (Nov 9)** | | | | |
| Early-access help article | Early-access merchants | You, for Support | Noor Haddad · Tomás Reyes · Dani Okafor | Oct 19 → Nov 2 → Nov 5 → Nov 9 |
| Early-access invitation email | Early-access merchants | You · CSMs send | Noor Haddad · Leah Moreau | Oct 19 → Oct 28 → Nov 4 → Nov 9 |
| Known issue: case and locale folders | Support | You | Tomás Reyes | Oct 19 → Nov 2 → Nov 5 → Nov 9 |
| Early-access feedback plan | CSMs and Product | You | Noor Haddad | Oct 19 → Oct 30 → Nov 5 → Nov 9 |
| FAQ: hiding chat on pages | Merchants | Support · you draft | Dani Okafor · Noor Haddad | Oct 19 → Oct 28 → Nov 5 → Nov 9 |
| Setup article (HC01): page-rules limit | Merchants | Support · you draft | Dani Okafor | Oct 19 → Oct 28 → Nov 5 → Nov 9 |
| Headless developer article (HC04) | Developers | You | Tomás Reyes | Oct 19 → Oct 30 → Nov 4 → Nov 6 |
| Merchant change log: early access | Merchants | You | Noor Haddad | Oct 19 → Nov 4 → Nov 6 → Nov 9 |
| **General availability (Jan 11, 2027)** | | | | |
| GA help article | All merchants | You | Noor Haddad · Tomás Reyes · Dani Okafor | Dec 7 → Dec 14 → Jan 6 ’27 → Jan 11 ’27 |
| GA announcement | Merchants | You · Marketing | Noor Haddad · Marketing | Dec 7 → Dec 14 → Jan 6 ’27 → Jan 11 ’27 |
| FAQ and setup article: the GA answer | Merchants | Support · you draft | Dani Okafor | Dec 14 → Dec 21 → Jan 6 ’27 → Jan 11 ’27 |
| Enablement update for GA | Sales, CS and Support | You | Noor Haddad · Dani Okafor · Leah Moreau | Dec 14 → Dec 21 → Jan 5 ’27 → Jan 7 ’27 |
| Macro: the GA version | Support | You | Dani Okafor | Dec 21 → Jan 4 ’27 → Jan 6 ’27 → Jan 11 ’27 |
| Follow-up to accounts not covered | Accounts not covered | CSMs | Noor Haddad | Dec 21 → Jan 4 ’27 → Jan 6 ’27 → Jan 11 ’27 |
| Merchant change log: GA | Merchants | You | Noor Haddad | Jan 4 ’27 → Jan 6 ’27 → Jan 8 ’27 → Jan 11 ’27 |
| **Later (not scheduled)** | | | | |
| Scheduled availability: article and enablement | All merchants and teams | You | Noor Haddad | Q1 2027, after the business-hours refactor. Scheduled once Product sets a date. |
| Headless storefronts: docs and enablement | Headless merchants and teams | You | Noor Haddad · Ines Park | Revisited after GA. No date. |

### The documents written for this launch

| Document | For | Status |
|---|---|---|
| Show or hide Live Chat on chosen pages (early access) | Early-access merchants | Draft, to Noor Nov 2 |
| Visibility Rules enablement: what's in, what's out | Sales, CS and Support | Draft, publish Oct 21 |
| Visibility Rules: Sales guide | Sales (AEs) | Draft, publish Oct 20 |
| Visibility Rules: CS guide | Customer Success | Draft, publish Oct 21 |
| Visibility Rules: Support guide | Support | Draft, publish Oct 21 |
| Not covered by Visibility Rules v1: what to tell merchants | Sales, CS and Support | Draft, publish Oct 22 |
| Macro: Visibility Rules availability | Support | Draft |
| Known issue: page rules are case-sensitive and ignore locale folders | Support | Draft, publish Nov 9 |
| Early-access invitation: choose where Live Chat appears | Early-access merchants (sent by CSMs) | Draft, send Nov 9 |
| Early-access feedback: check-ins and survey | CSMs and Product | Draft, live Nov 9 |
| Headless storefronts: what CX leads need to know | CX leads | Draft, Oct 30 |
| Show or hide Live Chat on chosen pages | All merchants | Outline, publish Jan 11 |
| Visibility Rules is here: choose where chat appears | Merchants | Outline, publish Jan 11 |
| Visibility Rules GA: enablement update | Sales, CS and Support | Outline, publish Jan 7 |

---

## The demo journey

A click-through of every feature, in two chapters. Each step opens the view, rings the part that does the work, and names the brief requirement it meets (B1 to B4) and the gaps it closes.

| Chapter | Steps | What it covers |
|---|---|---|
| **The brief** | 1–20 | The launch plan and its stage dates, the schedule, the early-access article with its questions for Product and its plan for when things change, the hub and the Sales, CS and Support guides, what to tell merchants who aren't covered, the department messages, the corrections, what Product must confirm, where each fact lives, and related documents |
| **The gaps** | 21–35 | The launch data checks, help-centre health, one answer per question, the questions log and macros, release reviews, the regression notice, the merchant change log, the troubleshooting checklist, the escalation page, data definitions, source ranking and the gap index |

- Start it from **▶ Demo** (top right), the **Demo journey** box on the Overview, or the play button in the left rail.
- **← →** move between steps, **Esc** leaves, **All steps** jumps anywhere.
- Every step has its own address: `/#/demo` starts at the beginning, `/#/demo/7` opens the questions for Product and `/#/demo/21` opens the gaps chapter.
- The demo restores what it changes (the gap lens, the checklist run, the agent panel) when you leave.

### The gap lens

Switch on **Gap lens** (top right, or press **G**) and dark badges appear next to every feature, naming the gap it closes (for example `DOC2` or `P16`). Hover a badge for the gap's name; click it for the gap's entry in the index.

---

## What's inside

| View | What it does |
|---|---|
| **Overview** | Pages, what needs attention, launch pieces and days to early access; the demo; where each part of the brief lives; the launch box (pieces due to publish each week, what's late, what's next); a card per module; and every page, sortable like Siena Docs. |
| **Launch · Visibility Rules** | **Plan** (30 pieces with stage dates), **Schedule** (timeline), **EA candidates** (31 accounts, $3.44M ARR, with data checks), **Corrections** (everyone who repeated the old scope) and **Confirm with Product**. |
| **Help-centre health** | All six Live Chat articles with views, votes, a six-point template check and open issues. Each article's **Health** tab has before-and-after fixes to accept and send to review. |
| **Answers** | One answer per question: every answer in circulation with a verdict, the proposed answer, its owner and decide-by date, and what must be updated afterwards. |
| **Questions log** | All 24 internal questions with a verdict and the right answer, a **Log a DM answer** form, and macro suggestions for questions answered three or more times. |
| **Releases and changes** | A seven-point release review, the LC-1204 regression notice (status-page entry and merchant email ready to copy), and a dated change log merchants can use in their reports. |
| **Doc pages** | 35 pages: the launch documents above, macros, the troubleshooting checklist (runs against Fernwood's settings export), the Fernwood escalation page and the data definitions. Every page has tags and links, publish conditions and an LLM-ready score; pages in the launch plan also show their row of it. |
| **Gap index** | The 34 gaps, grouped by the module that closes them. Each one opens the place where it's handled. |
| **Ask agent** | Answers with citations and shows its sources ranked: authority first, then freshness, with superseded or contradicted sources set aside. |

Keyboard: **G** gap lens · **← →** demo steps · **Esc** close a dialog or the demo. Every view has its own address (for example `#/launch/schedule` or `#/doc/d27`).

---

## Gaps and where they're closed

Solution IDs follow the consolidated gaps-and-solutions list and are shown on each row of the gap index.

**Help-centre health**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **DOC2** HC06's instructions are partly wrong | Corrected Zendesk and Gorgias steps, ready to accept on HC06. | HC06 · Health |
| **DOC3** HC06 counts only routed chats | HC06 says what the tag covers and adds Gladly and Dixa. | HC06 · Health |
| **DOC4** No Sync is never explained | A new article draft, plus a No Sync line in HC02. | No Sync and the Siena Inbox |
| **DOC5** HC01 is out of date | Sessions, the one-ticket claim, the toggle and position offsets fixed on HC01. | HC01 · Health |
| **DOC7** HC03 misleads | HC03 rewritten as facts: the change, the rule, the path. Unsourced numbers removed. | HC03 · Health |
| **DOC8** HC04 is for developers only | HC04 split into a CX-lead page and a developer page. | HC04 · Health |
| **DOC17** Article quality is uneven | One template, checked on every article. | Help-centre health · Template |
| **D42** Help-centre stats mix windows | Views and votes are flagged as not comparable until votes are dated. | Help-centre health · Stats windows |
| **PR25** The Siena Inbox is a black box | The Inbox questions Product must answer before the No Sync article ships. | No Sync and the Siena Inbox |

**One answer per question**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **DOC9** Page-hiding answers contradict each other | Every answer in circulation, replaced by one dated answer. | Answers · Hiding chat on pages |
| **P3** Conflicting guidance stays in circulation | Each conflict gets an owner, a decide-by date and a list of what must change. | Answers |
| **P6** Guidance on the announcement flip-flopped | The link-or-not history, ended by one decision and a macro. | Answers · Linking the announcement |
| **P8** Session length advice is ad hoc | Every number agents gave, and the decision Product owes. | Answers · Session length |

**Questions and macros**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **P1** No macro for the most common issue | Answers written three or more times become macro drafts, starting with the instance toggle. | Questions log · Macros |
| **P2** Wrong peer answers go unchecked | Every internal answer is reviewed: right, incomplete, wrong or needs a decision. | Questions log · Peer answers |
| **P4** Questions asked in DMs aren't captured | Log a DM answer in one step, so it reaches the review. | Questions log · DMs |
| **D41** The internal questions log is unreliable | A correctness verdict, the answer's owner and the right answer on every row. | Questions log |

**Releases and changes**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **P18** Releases change behaviour without merchant review | A seven-point release review, run on Session Controls and on Visibility Rules EA. | Releases and changes · Release review |
| **P7** The LC-1204 bug was never announced | A regression notice with affected merchants, a status-page entry and a complete remedy. | Releases and changes · LC-1204 notice |
| **D45** Silent setting changes break before/after comparisons | A merchant-facing log that dates every default change and migration. | Releases and changes · Change log |

**Launch data checks**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **D40** The CRM has errors | CRM conflicts flagged where they change who gets an early-access invite. | Launch · Data checks |
| **D35** “Solved” hides unmet needs: 23 of 57 solved tickets | Unmet asks count as demand, whatever the ticket status says. | Launch · Data checks |
| **D37** Tags and fields are inconsistent | The missing feature-request tag is made part of the macro. | Launch · Data checks |
| **P12** Repeat asks from top accounts aren't tracked | Asks are counted per account, with ARR, so H&R's third ask shows as a third. | Launch · Data checks |
| **D43** Roadmap request counts are inconsistent | One definition of “31 requests”, refreshed on a schedule. | Launch · Data checks |
| **P16** Scope changes don't reach Sales or Support | Every old-scope promise tracked until it's corrected. | Launch · Corrections |
| **DOC18** The roadmap and brief are stale | Stale sources flagged, superseded and listed as corrections. | Launch · Corrections |

**Playbooks**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **P10** There's no troubleshooting checklist | A checklist that starts with the timezone, run against Fernwood's settings. | Live Chat troubleshooting checklist |
| **P11** Escalations are scattered | One owner and one page for the Fernwood escalation. | Fernwood Kitchen Co. |
| **D44** The escalation evidence is weak | An evidence check: conversation IDs, timezone and dates. | Fernwood Kitchen Co. |
| **D36** Ticket statuses are untidy | Merged tickets left open and a wrong “no response” closure, flagged on the escalation. | Fernwood Kitchen Co. |

**Data definitions and source ranking**

| Gap | What Doc Desk does | Where |
|---|---|---|
| **D38** The first-response clock is undefined | A written definition: business minutes, per channel. | Ticket and CRM data definitions |
| **D39** The ticket log is incomplete | What the ticket export must include. | Ticket and CRM data definitions |
| **D29** Out-of-date sources win | The agent ranks sources by authority, then freshness, and says why one won. | Ask agent · source ranking |

---

---

## Run it locally

The source runs as is: open `index.html` in a browser, or serve the folder with `python3 -m http.server 8000`.

To run what Vercel will deploy (Node 18 or later, nothing to install):

```bash
npm run build   # checks the data, then writes dist/
npm start       # serves dist/ on http://localhost:3000 with the production headers
```

## The build

`npm run build` uses only Node's standard library, so there's nothing to install. It:

1. **Checks the scripts.** Every file in `js/` must compile, and `index.html` must load the seven scripts in order.
2. **Checks the data.** Every doc that a plan piece, a link, the agent's ranking or a demo step points to exists. Stage dates run draft → review → ready → published. Every question for Product has an owner, a YYYY-MM-DD date and what it blocks. The early-access article still ends with its reviewer notes, the hub with its open questions, and there are 34 gaps.
3. **Writes `dist/`**: `index.html`, `css/`, `js/`, `fonts/`, `robots.txt` and `_headers`, with a content hash on every CSS and JS URL so a browser never mixes files from two deploys.

If a check fails, the build stops with a list of what's wrong and the deploy doesn't go out. `npm run check` runs the checks without writing anything.

## Deploy privately on Vercel

The brief asks for a hosted solution with the code on GitHub, and for every link to open without a login. Keep the repository **private** and the link **unlisted**. GitHub Pages isn't suitable: on a free plan it only publishes public repositories.

### 1. Put the code in a private GitHub repository

With the GitHub CLI:

```bash
cd launch-in-a-box-B
git init -b main
git add .
git commit -m "Doc Desk: Live Chat launch tracker"
gh repo create launch-in-a-box-B --private --source=. --push
```

Or on github.com: **New repository → Private → Create**, then **uploading an existing file** and drag in the contents of this folder (including the `css`, `js`, `fonts` and `scripts` folders), not the folder itself. `index.html`, `package.json` and `vercel.json` must sit at the top of the repository. If they end up inside a `launch-in-a-box-B` folder, set **Root Directory** to that folder when you import the project into Vercel. Finder hides `.gitignore` and `.vercelignore`; the site deploys without them.

If the reviewers need to read the code, add them under **Settings → Collaborators**.

### 2. Import it into Vercel

1. On vercel.com, choose **Add New → Project** and import the repository. When asked, give Vercel access to this repository only.
2. Give the project a name that's hard to guess, because it becomes the address. Vercel only accepts lowercase letters, digits, `.`, `_` and `-`, with no spaces or capitals, so type something like `launch-in-a-box-b-r4m8` rather than the folder's name.
3. Set **Framework Preset** to **Other**. Leave the other settings alone: `vercel.json` sets the build command (`npm run build`) and the output directory (`dist`).
4. Deploy. Share the address listed under the project's **Domains** (`https://<project>.vercel.app`) with the hiring team only. The longer per-deployment addresses ask visitors to log in to Vercel, because Deployment Protection is on by default for new projects.

From the command line instead: `npx vercel` in this folder links and deploys a preview (when it asks for a name, give a lowercase one like `launch-in-a-box-b-r4m8`), and `npx vercel --prod` deploys to the project's address. `.vercelignore` keeps the README and any local `dist/` out of the upload, so Vercel always builds from source.

Netlify works too: **Add new site → Import an existing project → GitHub**. `netlify.toml` already sets the build command and the publish directory.

### If the deploy fails

| Vercel says | Fix |
|---|---|
| The project name is invalid | Use lowercase letters, digits and hyphens only, for example `launch-in-a-box-b-r4m8`. |
| No output directory named `dist`, or the site shows 404 | Vercel isn't building from the folder with `package.json` in it. Set **Settings → Build and Deployment → Root Directory** to that folder, or move the files to the top of the repository, then redeploy. |
| `✗ … problems` in the build log | The data check stopped the deploy. Each line names what's wrong and where. |

### What keeps it out of search and other people's hands

- `noindex` in three places: a `<meta name="robots">` tag, an `X-Robots-Tag` header (`vercel.json` for Vercel, `_headers` for Netlify) and `robots.txt`.
- `Referrer-Policy: no-referrer`, so the link isn't passed on to other sites.
- No analytics, CDNs or third-party scripts. The fonts are served from the site itself. The gap lens setting and any DM answers you log stay in your own browser's local storage; everything else resets on reload.
- A password needs a paid plan on both Vercel and Netlify. Vercel's free protection for all deployments only lets in people signed in to Vercel with access to the project, which doesn't suit outside reviewers. The unlisted link plus `noindex` is what the pack asks for.

### Take it down

When the hiring process ends:

1. Delete the deployment: on Vercel, **Project → Settings → Delete Project** (on Netlify, **Site configuration → Delete this site**).
2. Delete the repository: **GitHub → Settings → Danger Zone → Delete this repository**.

---

## Files

```
index.html          page shell
package.json        npm run build | check | start (no dependencies)
scripts/build.mjs   checks the scripts and data, writes dist/ with hashed CSS and JS URLs
scripts/serve.mjs   serves dist/ locally with the production headers
css/styles.css      all styles, light and dark
fonts/              Newsreader and JetBrains Mono (SIL Open Font License, licences included)
js/data.js          the 35 docs, tags, publish conditions, department templates, LLM-ready proposals
js/content.js       curated findings from the pack: gaps, help-centre checks, answers, questions, releases,
                    the launch plan and accounts, the questions for Product, checklist, escalation,
                    data definitions, agent script
js/app.js           shell, sidebar, doc pages, tags, publish conditions, department messages, tag map
js/modules.js       overview, launch plan and schedule, help-centre health, answers, questions log,
                    releases and changes, doc page layouts, gap lens, gap index, URL routing
js/agent.js         the Ask agent: scripted answers, keyword search and source ranking
js/tour.js          the demo journey
js/boot.js          restores settings, routes from the URL and starts the demo from #/demo
vercel.json         Vercel build settings and headers
_headers            Netlify headers (copied into dist/)
netlify.toml        Netlify build settings
robots.txt          no crawling
.vercelignore       keeps README.md, Netlify files and dist/ out of a Vercel upload
.gitignore          dist/ and local tool folders
```

## Assumptions and simplifications

- **Today is Monday, October 19, 2026**, as in the pack. Due dates, "due today" and "days late" are counted from that date.
- **The plan is a proposal.** Noor owns the launch; the documentation plan, stage dates, owners and reviewers are what I'd propose to her, built from her Oct 14 decision. "You" is the Product Specialist.
- **Findings are curated, not computed.** Counts, verdicts and flags were worked out from the pack's tickets, internal questions, CRM export, help-centre articles, changelog, roadmap, brief, Slack threads and the Fernwood escalation, then written into `js/content.js`. *Where each fact lives* is the exception: it searches the pages and messages live.
- **Verdicts on internal answers are my review** against the changelog, the Oct 14 decision and the help centre. The pack's questions log has no correctness field (gap D41).
- **Open answers stay open.** In the early-access article, anything Product hasn't confirmed says so in plain words (“Being confirmed”) and is one of the eight questions at its bottom. Other drafts mark open points *confirm*. Confirm with Product tracks the launch questions until they're answered.
- **The agent has no model behind it.** Fourteen questions have checked answers; anything else gets a keyword search, labelled as such. The ranking rule (authority, then freshness, superseded sources left out) is the proposal for Siena's own knowledge sources (SPR21).
- **Actions are simulated.** Sending a message, recording a decision or accepting a fix changes the page for this visit only. Nothing is sent anywhere.
- **Not modelled:** other launches, editing articles in place, user accounts, and syncing with Zendesk, Linear or Slack.

Prototype with simulated data. Not a Siena product, and not affiliated with Zendesk, Gorgias, Vercel or Netlify.
