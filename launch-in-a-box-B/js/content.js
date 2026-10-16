/* Doc Desk: curated content for the knowledge-ops modules.
   Everything here is written from the case-study pack (tickets, internal questions, CRM export, help centre,
   changelog, roadmap, brief, Slack threads, Fernwood escalation). Ticket and question IDs are the pack's own. */

/* ------------------------------------------------------------------ gaps and solutions */
const MODULES = [
  { key: "health", title: "Help-centre health", view: "health", blurb: "Every article with an owner, a review date, a template check and fixes ready to accept." },
  { key: "answers", title: "One answer per question", view: "answers", blurb: "Each recurring question gets one decision, one owner and a date. Docs and macros follow it." },
  { key: "questions", title: "Questions and macros", view: "questions", blurb: "Internal answers are reviewed, DM answers are captured, and repeated answers become macros." },
  { key: "changes", title: "Releases and changes", view: "changes", blurb: "Releases are reviewed before they ship, regressions are announced, and default changes are logged for merchants." },
  { key: "launch", title: "Launch data checks", view: "launch", blurb: "The early-access list is built from data that has been checked, and every old-scope promise is corrected." },
  { key: "playbooks", title: "Playbooks", view: "doc:d22", blurb: "A troubleshooting checklist that starts with the timezone, and one page per escalation." },
  { key: "data", title: "Data definitions and source ranking", view: "doc:d24", blurb: "Ticket fields are defined, and the agent says why one source beats another." }
];

const GAPS = {
  DOC2: { name: "HC06's instructions are partly wrong", mod: "health", go: "doc:d15:health", sols: ["SDOC1"], what: "Corrected Zendesk and Gorgias steps, ready to accept on HC06." },
  DOC3: { name: "HC06 counts only routed chats", mod: "health", go: "doc:d15:health", sols: ["SDOC1"], what: "HC06 says what the tag covers and adds Gladly and Dixa." },
  DOC4: { name: "No Sync is never explained", mod: "health", go: "doc:d16", sols: ["SDOC3", "SDOC10"], what: "A new article draft, plus a No Sync line in HC02." },
  DOC5: { name: "HC01 is out of date", mod: "health", go: "doc:d8:health", sols: ["SDOC2"], what: "Sessions, the one-ticket claim, the toggle and position offsets fixed on HC01." },
  DOC7: { name: "HC03 misleads", mod: "health", go: "doc:d10:health", sols: ["SDOC4"], what: "HC03 rewritten as facts: the change, the rule, the path. Unsourced numbers removed." },
  DOC8: { name: "HC04 is for developers only", mod: "health", go: "doc:d9:health", sols: ["SDOC7"], what: "HC04 split into a CX-lead page and a developer page." },
  DOC17: { name: "Article quality is uneven", mod: "health", go: "health:template", sols: ["SDOC17"], what: "One template, checked on every article." },
  D42: { name: "Help-centre stats mix windows", mod: "health", go: "health:windows", sols: ["SDOC16"], what: "Views and votes are flagged as not comparable until votes are dated." },
  PR25: { name: "The Siena Inbox is a black box", mod: "health", go: "doc:d16", sols: ["SDOC10"], what: "The Inbox questions Product must answer before the No Sync article ships." },
  DOC9: { name: "Page-hiding answers contradict each other", mod: "answers", go: "answers:a1", sols: ["SDOC5"], what: "Every answer in circulation, replaced by one dated answer." },
  P3: { name: "Conflicting guidance stays in circulation", mod: "answers", go: "answers", sols: ["SP3"], what: "Each conflict gets an owner, a decide-by date and a list of what must change." },
  P6: { name: "Guidance on the announcement flip-flopped", mod: "answers", go: "answers:a2", sols: ["SP5"], what: "The link-or-not history, ended by one decision and a macro." },
  P8: { name: "Session length advice is ad hoc", mod: "answers", go: "answers:a3", sols: ["SP5", "SDOC9"], what: "Every number agents gave, and the decision Product owes." },
  P1: { name: "No macro for the most common issue", mod: "questions", go: "questions:macros", sols: ["SP1"], what: "Answers written three or more times become macro drafts, starting with the instance toggle." },
  P2: { name: "Wrong peer answers go unchecked", mod: "questions", go: "questions:peer", sols: ["SP2"], what: "Every internal answer is reviewed: right, incomplete, wrong or needs a decision." },
  P4: { name: "Questions asked in DMs aren't captured", mod: "questions", go: "questions:dm", sols: ["SP4", "SD15"], what: "Log a DM answer in one step, so it reaches the review." },
  D41: { name: "The internal questions log is unreliable", mod: "questions", go: "questions", sols: ["SD15"], what: "A correctness verdict, the answer's owner and the right answer on every row." },
  P18: { name: "Releases change behaviour without merchant review", mod: "changes", go: "changes:review", sols: ["SP13"], what: "A seven-point release review, run on Session Controls and on Visibility Rules EA." },
  P7: { name: "The LC-1204 bug was never announced", mod: "changes", go: "changes:lc1204", sols: ["SP6", "SDOC12"], what: "A regression notice with affected merchants, a status-page entry and a complete remedy." },
  D45: { name: "Silent setting changes break before/after comparisons", mod: "changes", go: "changes:log", sols: ["SDOC18", "SDF8"], what: "A merchant-facing log that dates every default change and migration." },
  D40: { name: "The CRM has errors", mod: "launch", go: "launch:candidates:checks", sols: ["SD13"], what: "CRM conflicts flagged where they change who gets an early-access invite." },
  D35: { name: "“Solved” hides unmet needs: 23 of 57 solved tickets", mod: "launch", go: "launch:candidates:checks", sols: ["SD12"], what: "Unmet asks count as demand, whatever the ticket status says." },
  D37: { name: "Tags and fields are inconsistent", mod: "launch", go: "launch:candidates:checks", sols: ["SD12"], what: "The missing feature-request tag is made part of the macro." },
  P12: { name: "Repeat asks from top accounts aren't tracked", mod: "launch", go: "launch:candidates:checks", sols: ["SP10"], what: "Asks are counted per account, with ARR, so H&R's third ask shows as a third." },
  D43: { name: "Roadmap request counts are inconsistent", mod: "launch", go: "launch:candidates:checks", sols: ["SD13", "SP15"], what: "One definition of “31 requests”, refreshed on a schedule." },
  P16: { name: "Scope changes don't reach Sales or Support", mod: "launch", go: "launch:corrections", sols: ["SP14"], what: "Every old-scope promise tracked until it's corrected." },
  DOC18: { name: "The roadmap and brief are stale", mod: "launch", go: "launch:corrections", sols: ["SDOC19", "SP14"], what: "Stale sources flagged, superseded and listed as corrections." },
  P10: { name: "There's no troubleshooting checklist", mod: "playbooks", go: "doc:d22", sols: ["SP8"], what: "A checklist that starts with the timezone, run against Fernwood's settings." },
  P11: { name: "Escalations are scattered", mod: "playbooks", go: "doc:d23", sols: ["SP9"], what: "One owner and one page for the Fernwood escalation." },
  D44: { name: "The escalation evidence is weak", mod: "playbooks", go: "doc:d23", sols: ["SD14"], what: "An evidence check: conversation IDs, timezone and dates." },
  D36: { name: "Ticket statuses are untidy", mod: "playbooks", go: "doc:d23", sols: ["SD12"], what: "Merged tickets left open and a wrong “no response” closure, flagged on the escalation." },
  D38: { name: "The first-response clock is undefined", mod: "data", go: "doc:d24", sols: ["SDOC20"], what: "A written definition: business minutes, per channel." },
  D39: { name: "The ticket log is incomplete", mod: "data", go: "doc:d24", sols: ["SD12"], what: "What the ticket export must include." },
  D29: { name: "Out-of-date sources win", mod: "data", go: "agent:ask", sols: ["SPR21"], what: "The agent ranks sources by authority, then freshness, and says why one won." }
};
const SOLS = {
  SDOC1: "Correct HC06", SDOC2: "Update HC01", SDOC3: "Fix HC02", SDOC4: "Rewrite HC03", SDOC5: "One answer on hiding chat",
  SDOC7: "Split HC04 in two", SDOC9: "Session-length guidance", SDOC10: "Explain No Sync and the Siena Inbox", SDOC12: "Complete the LC-1204 remedy",
  SDOC16: "Review-by dates and conflict flags", SDOC17: "One article template", SDOC18: "A change log merchants can see", SDOC19: "Keep the roadmap, brief and Linear current",
  SDOC20: "Define the ticket-data fields", SDF8: "No silent migrations", SD12: "Ticket hygiene", SD13: "CRM validation rules", SD14: "Evidence hygiene",
  SD15: "An internal questions log people can trust", SPR21: "Rank knowledge by authority and freshness",
  SP1: "Own macros and make them fast", SP2: "Review peer answers", SP3: "Close open questions with an owner and a date", SP4: "Answer in channels, not DMs",
  SP5: "One message on Session Controls", SP6: "Tell merchants about regressions", SP8: "A troubleshooting checklist, timezone first",
  SP9: "One owner per escalation", SP10: "Track repeat asks from top accounts", SP13: "Review releases before they ship",
  SP14: "Broadcast scope changes the same day", SP15: "Prioritise by revenue and severity"
};

/* ------------------------------------------------------------------ help-centre health */
const TEMPLATE_CHECKS = [
  ["owner", "Owner and review-by date"],
  ["paths", "Exact settings paths"],
  ["limits", "Known issues and limits"],
  ["stuck", "“Still stuck?” contact"],
  ["tone", "Plain wording, no sign-off"],
  ["audience", "Says who it's for"]
];
const HC = {
  d8: {
    code: "HC01", views: 1904, votes: [58, 141], review: "2026-11-02",
    template: { owner: 0, paths: 1, limits: 1, stuck: 0, tone: 1, audience: 1 },
    issues: [
      { t: "Says sessions close after 24 hours and “extend by one hour”. Two-Way instances default to 1 hour since Sep 29 (v43.4.0).", gaps: ["DOC5"], fix: "b" },
      { t: "Says all messages from one customer stay in one helpdesk ticket. After a session expires, a returning customer gets a new ticket.", gaps: ["DOC5"], fix: "c" },
      { t: "The instance toggle, off by default, appears only at the bottom under “If it doesn't work”. Eight tickets in four weeks. “Nobody scrolls that far” (Marco).", gaps: ["DOC5"], fix: "a" },
      { t: "No mention of position offsets (v42.30.0, May 20), so agents told merchants “middle-right” was the only option (LC-48110, IQ-119).", gaps: ["DOC5"], fix: "d" },
      { t: "“The chat bubble cannot be limited to specific pages” becomes wrong for early-access merchants on Nov 9.", gaps: ["DOC9"], fix: "e" }
    ],
    props: [
      { id: "a", title: "Turn the instance on in Step 1", why: "The most common Live Chat ticket. The answer is in the article, in the wrong place.", gaps: ["DOC5", "P1"],
        before: "## If it doesn't work\nChat widget not appearing:\n- Make sure your Live Chat instance is toggled on … The toggle is off by default when you create an instance.",
        after: "## Step 1: Create your chat instance\n…\n5. Switch the instance on with the toggle at the top of the instance page. New instances start switched off, and the widget won't appear on your site until it's on." },
      { id: "b", title: "Correct the Sessions section", why: "Wrong for every Two-Way merchant since Sep 29.", gaps: ["DOC5"],
        before: "Sessions close automatically after 24 hours of inactivity, and extend by one hour whenever the customer sends a new message.",
        after: "A session ends after a period with no messages: 1 hour for Two-Way Sync (since Sep 29, 2026) and 24 hours for One-Way Sync and No Sync. Change it in Settings → Live Chat → [instance] → Sessions (30 minutes to 7 days).\nAfter a session ends, replies from your helpdesk no longer reach the chat, and a customer who returns starts a new session and a new ticket." },
      { id: "c", title: "Fix the one-ticket claim", why: "Explains the “two tickets for one customer” question (Priya, Oct 12).", gaps: ["DOC5"],
        before: "All messages from the same customer are kept in one helpdesk ticket.",
        after: "Messages stay in one helpdesk ticket while the session is open. If the customer comes back after it ends, a new ticket is created. Turn on email capture so your helpdesk can merge them." },
      { id: "d", title: "Add position offsets", why: "Four tickets about the bubble covering add-to-cart bars and cookie banners.", gaps: ["DOC5"],
        before: "Upload your logo, set your brand colour and choose a window style (Full Height or Minimized).",
        after: "Upload your logo, set your brand colour and choose a window style (Full Height or Minimized).\nPosition: move the bubble up or in from the edge, separately on desktop and mobile (Appearance → Position). Use it when the bubble covers a sticky add-to-cart bar or a cookie banner." },
      { id: "e", title: "Date the page-rules limit", why: "Keeps the article true on Nov 9 and on Jan 11.", gaps: ["DOC9"],
        before: "The chat bubble cannot be limited to specific pages.",
        after: "Limiting the bubble to specific pages: available to early-access merchants from Nov 9, 2026 (see Show or hide Live Chat on chosen pages), and planned for everyone from Jan 11, 2027." }
    ]
  },
  d13: {
    code: "HC02", views: 612, votes: [22, 42], review: "2026-11-09",
    template: { owner: 0, paths: 1, limits: 0, stuck: 0, tone: 1, audience: 1 },
    issues: [
      { t: "Says Siena “falls back to One-Way Sync” outside hours and creates a ticket. That can't apply to No Sync, which never creates one, and No Sync isn't explained anywhere.", gaps: ["DOC4"], fix: "a" },
      { t: "States the UTC default without a warning. Fernwood's schedule is in UTC, so its customers are told it's closed while it's open (LC-48133, LC-48155).", gaps: [], fix: "b" }
    ],
    props: [
      { id: "a", title: "Say what each handoff mode does outside hours", why: "26 accounts ($2.88M ARR) use No Sync, and nothing tells them what happens.", gaps: ["DOC4"],
        before: "Siena tells the customer the team is unavailable, shows your Outside business hours message and falls back to One-Way Sync. A ticket is created in your helpdesk for email follow-up the next business day.",
        after: "Siena tells the customer the team is unavailable and shows your Outside business hours message. Then:\n- Two-Way Sync: falls back to One-Way Sync. A ticket is created for email follow-up the next business day.\n- One-Way Sync: a ticket is created as usual.\n- No Sync: no ticket is created. The conversation waits in the Siena Inbox. See No Sync and the Siena Inbox." },
      { id: "b", title: "Warn about the UTC default", why: "The root cause of Fernwood's “closed while open” chats.", gaps: [],
        before: "New organizations start with a default schedule of Monday to Friday, 9:00 to 17:00, in UTC.",
        after: "New organizations start with Monday to Friday, 9:00 to 17:00, in UTC. Change the timezone to your support team's before launch, or customers will be told you're closed while you're open. Add your holidays at the same time." }
    ]
  },
  d10: {
    code: "HC03", views: 2387, votes: [19, 65], review: "2026-10-26", young: true,
    template: { owner: 0, paths: 0, limits: 0, stuck: 0, tone: 0, audience: 1 },
    issues: [
      { t: "Doesn't say the Two-Way default dropped from 24 hours to 1 hour, or that existing instances were moved. That's why Support stopped linking it on Oct 12.", gaps: ["DOC7", "P6"], fix: "a" },
      { t: "“Intelligently detects when a customer has left” describes a timer, and “There's nothing to set up” is wrong for Two-Way merchants.", gaps: ["DOC7"], fix: "b" },
      { t: "No settings path: “Head to your chat instance settings” (LC-48135).", gaps: ["DOC7"], fix: "c" },
      { t: "Unsourced claims: “up to 38% fewer open tickets” and “hours back every single day”.", gaps: ["DOC7"], fix: "d" },
      { t: "The only article with a marketing sign-off (“Happy chatting! The Siena Product Team”).", gaps: ["DOC17"], fix: "d" }
    ],
    props: [
      { id: "a", title: "Lead with what changed", why: "Session expiry is the top Session Controls question: 10 tickets since Sep 29.", gaps: ["DOC7"],
        before: "# Introducing Session Controls: say goodbye to ghost tickets\nWe're thrilled to announce Session Controls, the smartest way yet to keep your Live Chat queue clean …",
        after: "# Session Controls: how chat sessions end\nSince Sep 29, 2026 (v43.4.0), a chat session ends after a set time without messages, and Siena closes abandoned AI-only chats.\nWhat changed: Two-Way Sync instances now default to 1 hour (was 24 hours). Existing Two-Way instances were moved to the new default." },
      { id: "b", title: "Replace “intelligently detects” with the rule", why: "Merchants need the rule to explain it to their agents (LC-48137).", gaps: ["DOC7"],
        before: "Siena intelligently detects when a customer has left and wraps things up automatically, so your agents can focus on real conversations.",
        after: "When a session has had no messages for the session length, it ends. If Siena resolved the chat on its own and the customer didn't reply, the chat and its helpdesk ticket are closed. Chats routed to your team are never closed automatically." },
      { id: "c", title: "Give the settings path and the trade-off", why: "Merchants couldn't find the setting (LC-48135).", gaps: ["DOC7"],
        before: "There's nothing to set up: it just works. Want to fine-tune? Head to your chat instance settings.",
        after: "Check your session length in Settings → Live Chat → [instance] → Sessions (30 minutes to 7 days). After a session ends, helpdesk replies no longer reach the chat, and a returning customer starts a new ticket." },
      { id: "d", title: "Remove unsourced numbers and the sign-off", why: "Marketing asked to reuse the 38% in the newsletter (IQ-116).", gaps: ["DOC7", "DOC17"],
        before: "Early-access merchants saw up to 38% fewer open Live Chat tickets in their helpdesk within the first week. That's hours back for your team every single day.\n\nHappy chatting!\nThe Siena Product Team",
        after: "(numbers removed until Product shares the cohort, method and source)\n\nStill stuck? Contact support@siena.cx with a ticket link." }
    ]
  },
  d9: {
    code: "HC04", views: 288, votes: [9, 14], review: "2026-11-13",
    template: { owner: 0, paths: 1, limits: 1, stuck: 0, tone: 1, audience: 1 },
    issues: [
      { t: "Written for developers. CX leads can't tell what to ask their team (Solstice, LC-48108: “written for engineers”; Wen answers it in DMs).", gaps: ["DOC8"], fix: "a" },
      { t: "Contradicts itself: it suggests loading the script on chosen routes, but the widget stays across client-side navigation (Arden Denim, LC-48122).", gaps: ["DOC8", "DOC9"], fix: "b" },
      { t: "No Next.js guidance (Solstice's agency, LC-48139).", gaps: ["DOC8"], fix: "c" },
      { t: "Doesn't say page rules don't support headless storefronts in v1.", gaps: ["DOC9"], fix: "b" }
    ],
    props: [
      { id: "a", title: "Split it in two", why: "Two readers with different questions: a CX lead deciding what to ask for, and the developer doing it.", gaps: ["DOC8"],
        before: "# Installing Live Chat on a headless storefront\n(one article, written for developers)",
        after: "Two pages:\n1. Headless storefronts: what CX leads need to know (new: what changes, what to ask your developers, who at Siena helps)\n2. Installing Live Chat on a headless storefront (developers: loader, CSP, Next.js, launch API)" },
      { id: "b", title: "Fix the visibility section", why: "The current advice doesn't work, and the replacement needs a test before anyone relies on it.", gaps: ["DOC8", "DOC9"],
        before: "To hide the bubble on specific routes, conditionally render the loader script on those routes.",
        after: "Loading the script on some routes only doesn't work: once loaded, the widget stays across client-side navigation.\nTo limit where chat appears, hide the bubble in the instance settings and open chat from your own button with SienaLaunchWidget() on the routes you choose. Test this on your store first.\nPage rules (Visibility Rules) don't support headless storefronts in v1." },
      { id: "c", title: "Add a Next.js section", why: "The agency had to work it out alone (LC-48139). Eng to confirm before publishing.", gaps: ["DOC8"],
        before: "(missing)",
        after: "### Next.js\nApp Router: add the loader with next/script in app/layout.tsx, strategy \"afterInteractive\".\nPages Router: add it in pages/_app.tsx. Not in _document." }
    ]
  },
  d7: {
    code: "HC05", views: 1140, votes: [33, 70], review: "2026-11-09",
    template: { owner: 0, paths: 0, limits: 0, stuck: 0, tone: 1, audience: 1 },
    issues: [
      { t: "“Can I show chat only on certain pages? No … not currently possible.” Three other answers are in circulation, and this one changes for early-access merchants on Nov 9.", gaps: ["DOC9", "P3"], fix: "a" },
      { t: "Points to How to launch Siena Chat with custom buttons, which isn't in the help centre (IQ-104).", gaps: ["DOC9"], fix: "b" }
    ],
    props: [
      { id: "a", title: "Use the decided answer", why: "One answer, dated, instead of four in circulation.", gaps: ["DOC9", "P3"],
        before: "Can I show chat only on certain pages?\nNo. The chat bubble appears on every page where the script loads. This is not currently possible.",
        after: "Can I show chat only on certain pages?\n- Until Nov 9: not with one-click install. You can remove one-click install and add the script only to the templates you choose (you'll need a developer). Proactive campaigns don't hide the bubble.\n- From Nov 9, early access: page rules on Shopify theme stores with one-click install.\n- From Jan 11, 2027: page rules for everyone on the standard install path.\n- Headless storefronts: not supported in v1." },
      { id: "b", title: "Fix the dead reference", why: "Agents link an article that doesn't exist.", gaps: ["DOC9"],
        before: "Yes. Use SienaLaunchWidget(). See How to launch Siena Chat with custom buttons.",
        after: "Yes. Call window.SienaLaunchWidget() from your button once the script has loaded. Details: Installing Live Chat on a headless storefront → Launch from your own UI." }
    ]
  },
  d15: {
    code: "HC06", views: 406, votes: [37, 42], review: "2026-10-30",
    template: { owner: 0, paths: 0, limits: 1, stuck: 1, tone: 1, audience: 1 },
    issues: [
      { t: "Zendesk path is wrong. It's Admin Center → Workspaces → Agent tools → Views → Create view, with the condition Ticket: Tags “Contains at least one of the following”.", gaps: ["DOC2"], fix: "a" },
      { t: "Gorgias path and filter are wrong. It's Inbox sidebar → Shared views → + → Create view, and the tag filters are “Contains one of”, “Contains all of”, “Does not contain any of”, “Is empty” and “Is not empty”. There's no “is”.", gaps: ["DOC2"], fix: "b" },
      { t: "“Send tagged tickets to your chat queue”: neither tool has one. In Zendesk a trigger sets the group. In Gorgias a rule assigns a team.", gaps: ["DOC2"], fix: "c" },
      { t: "Reports: Zendesk Explore filters “Ticket tags” in the Support – Tickets dataset, which Explore Lite (Team plans) can't do. Gorgias statistics use “Is one of”.", gaps: ["DOC2"], fix: "c" },
      { t: "The tag only marks routed chats, so these views miss every chat Siena resolved. Rated 88% helpful, so merchants think the problem is solved.", gaps: ["DOC3"], fix: "d" },
      { t: "Covers Zendesk, Gorgias and Kustomer, not Gladly or Dixa.", gaps: ["DOC3"], fix: "e" }
    ],
    props: [
      { id: "a", title: "Correct the Zendesk view steps", why: "Merchants follow these steps word for word (LC-48103, LC-48128).", gaps: ["DOC2"],
        before: "Zendesk: Admin Center → Workspaces → Views → Add view, condition Tags contains at least one of siena-live-chat-handoff.",
        after: "Zendesk: Admin Center → Workspaces → Agent tools → Views → Create view. Condition: Ticket: Tags · Contains at least one of the following · siena-live-chat-handoff." },
      { id: "b", title: "Correct the Gorgias view steps", why: "The “Tags is” filter doesn't exist (LC-48114, LC-48148, LC-48161).", gaps: ["DOC2"],
        before: "Gorgias: Tickets → Create view, filter Tags is siena-live-chat-handoff.",
        after: "Gorgias: Inbox sidebar → Shared views → + → Create view. Filter: Tags · Contains one of · siena-live-chat-handoff." },
      { id: "c", title: "Say how routing and reports really work", why: "There's no “chat queue” in either tool, and Explore Lite can't filter by tag.", gaps: ["DOC2"],
        before: "Route. Create a trigger or rule that sends tagged tickets to your chat queue.\nReport. Filter reports by the same tag.",
        after: "Route. Zendesk: a trigger that sets the group. Gorgias: a rule that assigns a team.\nReport. Zendesk Explore: Support – Tickets dataset, filter Ticket tags (not available on Explore Lite). Gorgias statistics: tag filter Is one of." },
      { id: "d", title: "Say what the tag covers", why: "A tag view isn't total chat volume. Merchants should know before they report on it.", gaps: ["DOC3"],
        before: "Every routed Live Chat ticket carries the tag siena-live-chat-handoff.",
        after: "The tag siena-live-chat-handoff marks routed chats only. Chats Siena resolves on its own aren't tagged, even with All Conversations sync, so a tag view shows handoffs, not your total chat volume." },
      { id: "e", title: "Add Gladly and Dixa", why: "Two of the five supported helpdesks are missing.", gaps: ["DOC3"],
        before: "(missing)",
        after: "Gladly: handoffs arrive as Tasks, outside channel reports.\nDixa: the tag is applied (since Jul 20, 2026), and chats land in the chat queue." }
    ]
  }
};
/* Articles queued in Doc Desk that the help centre doesn't have yet. */
const HC_QUEUE = [
  { doc: "d4", why: "Early-access help article for page rules. Due to Noor on Nov 2.", gaps: [] },
  { doc: "d16", why: "Nothing explains No Sync handoffs or what the Siena Inbox does.", gaps: ["DOC4", "PR25"] },
  { doc: "d17", why: "The CX-lead half of the HC04 split.", gaps: ["DOC8"] },
  { doc: "d26", why: "Waiting on Product's session-length recommendation.", gaps: ["P8"] },
  { doc: "d25", why: "Merchant-facing log of default changes and migrations.", gaps: ["D45"] }
];

/* ------------------------------------------------------------------ one answer per question */
const VERDICT = {
  right: { label: "Right", cls: "v-right" },
  partial: { label: "Incomplete", cls: "v-partial" },
  wrong: { label: "Wrong", cls: "v-wrong" },
  outdated: { label: "Outdated", cls: "v-partial" },
  decide: { label: "Needs a decision", cls: "v-decide" },
  unrev: { label: "Not reviewed", cls: "v-unrev" }
};
const ANSWERS = [
  { id: "a1", short: "Hiding chat on pages", q: "Can a merchant hide chat on checkout, cart or other pages?", gaps: ["DOC9", "P3"], status: "proposed",
    owner: "You (Product Specialist)", confirm: "Noor Haddad, Tomás Reyes", by: "2026-10-23", asks: "9 tickets · IQ-102, IQ-120, IQ-123",
    circulation: [
      { who: "Live Chat FAQ (HC05)", when: "May 11", said: "No. … This is not currently possible.", v: "outdated", ref: "d7", note: "Linked on LC-48101, LC-48134 and LC-48149. Wrong for early-access merchants from Nov 9." },
      { who: "Wen Liu, Support", when: "Oct 12", said: "Use proactive campaigns.", v: "wrong", note: "Campaigns target a message, not the bubble. Verdant tried it: “the bubble still appears everywhere” (LC-48112)." },
      { who: "Support, #cx-support", when: "Oct 12", said: "Hand-place the script.", v: "partial", note: "Works today on theme stores, but needs a developer. Juniper Lane Kids has none (LC-48125)." },
      { who: "HC04, headless article", when: "Jan 20", said: "Conditionally render the loader script on those routes.", v: "wrong", ref: "d9", note: "The widget stays across client-side navigation (Arden Denim, LC-48122)." },
      { who: "Feature brief", when: "Sep 8", said: "Works for every install method.", v: "outdated", ref: "d1", note: "Superseded on Oct 14: early access covers the standard install path only." },
      { who: "Support agent, LC-48149", when: "Oct 12", said: "Visibility Rules is on the roadmap for November.", v: "wrong", note: "Kestrel is headless. Not in v1." },
      { who: "Dani Okafor, Support lead", when: "Oct 12", said: "Keep answering the way you have been.", v: "decide", note: "Leaves all of the above in circulation." }
    ],
    answer: [
      ["Until Nov 9", "Not with one-click install. Theme stores can remove one-click install and add the script only to chosen templates (they'll need a developer). Proactive campaigns don't hide the bubble."],
      ["From Nov 9 · early access", "Page rules for the 25 invited merchants on Shopify theme stores with one-click install. Exclude rules win. Rules are case-sensitive and ignore locale folders, so add /*/checkout* next to /checkout*."],
      ["From Jan 11, 2027 · GA", "Page rules for everyone on the standard install path."],
      ["Headless", "Not in v1. Hide the bubble and open chat from your own button on chosen routes. Test it first."],
      ["Script pasted into a theme", "Waiting on Tomás (asked Oct 14)."]
    ],
    update: [
      { doc: "d7", what: "Replace the “not possible” answer" }, { doc: "d9", what: "Fix the visibility section" },
      { doc: "d8", what: "Date the page-rules limit" }, { doc: "d20", what: "Macro: Visibility Rules availability" },
      { doc: "d29", what: "Support guide: the answer by date" }, { doc: "d27", what: "Sales guide: say this, not that" }, { text: "#cx-support: withdraw “keep answering the way you have been”" }
    ] },
  { id: "a2", short: "Linking the announcement", q: "Should agents link the Session Controls announcement?", gaps: ["P6"], status: "proposed",
    owner: "Dani Okafor (Support lead) with you", confirm: "Noor Haddad", by: "2026-10-19", asks: "10 tickets · IQ-107, IQ-122",
    circulation: [
      { who: "Dani Okafor, IQ-107", when: "Sep 29", said: "Link them the announcement article.", v: "wrong", note: "Linked on LC-48116, LC-48120 (a bug report), LC-48132 and LC-48135 between Sep 30 and Oct 7." },
      { who: "Dani Okafor, #cx-support", when: "Oct 12", said: "Please stop linking the Session Controls announcement.", v: "right", note: "It doesn't mention the 24-to-1-hour change or what it does to replies." },
      { who: "Agents, LC-48153 and LC-48162", when: "Oct 13–16", said: "Personal advice instead: 4 hours, 2–4 hours.", v: "partial", note: "No link, but no documented answer either." },
      { who: "Dani Okafor, IQ-122", when: "Oct 15", said: "Point them to the Session Controls announcement.", v: "wrong", note: "Reverses the Oct 12 instruction three days later, in a DM." }
    ],
    answer: [
      ["Decision", "Don't link HC03 until it's rewritten."],
      ["Instead", "Use the macro Session Controls: what changed for Two-Way. It covers the change (24 hours to 1 hour on Sep 29, existing instances moved), what it does to replies and tickets, the settings path, and turning on email capture."],
      ["Also", "Withdraw the Oct 15 instruction (IQ-122) in #cx-support, where everyone sees it."]
    ],
    update: [
      { doc: "d19", what: "Macro: Session Controls, what changed" }, { doc: "d10", what: "Rewrite HC03" },
      { text: "#cx-support: one post replacing IQ-107 and IQ-122" }
    ] },
  { id: "a3", short: "Session length", q: "What session length should we recommend to Two-Way merchants?", gaps: ["P8"], status: "waiting",
    owner: "Noor Haddad decides · you write it up", confirm: "Tomás Reyes", by: "2026-10-26", asks: "IQ-117 · LC-48132, 48143, 48153, 48162",
    circulation: [
      { who: "Changelog v43.4.0", when: "Sep 29", said: "Default 1 hour for Two-Way. Range 30 minutes to 7 days.", v: "right", ref: "d11", note: "A default, not a recommendation." },
      { who: "Agent, LC-48132 (Halden & Rowe)", when: "Oct 6", said: "Set to 6 hours at the merchant's request.", v: "decide" },
      { who: "Agent, LC-48143 (Oakhurst)", when: "Oct 9", said: "Longer expiry and email capture.", v: "decide" },
      { who: "Support peer, IQ-117", when: "Oct 12", said: "No official guidance. I usually say 2–4 hours.", v: "decide" },
      { who: "Agent, LC-48153 (Arden Denim)", when: "Oct 13", said: "4-hour expiry.", v: "decide" },
      { who: "Agent, LC-48162 (Kestrel)", when: "Oct 16", said: "2–4 hours, personal recommendation.", v: "decide" }
    ],
    answer: [
      ["Decision needed", "One recommendation from Product, with the trade-off spelled out."],
      ["Until then", "Give the facts, not a number. Shorter sessions split returning customers into new tickets and drop late replies. Longer ones keep the chat open and delay auto-close. Match the length to how long your team takes to reply, and turn on email capture."]
    ],
    update: [
      { doc: "d26", what: "Session-length guidance article" }, { doc: "d19", what: "Fill in the macro's recommendation" },
      { doc: "d8", what: "HC01 Sessions section" }
    ] },
  { id: "a4", short: "Second instance", q: "Can one Shopify store run a second chat instance, for example one per language?", gaps: ["P3"], status: "waiting",
    owner: "Noor Haddad decides · you write it up", confirm: "Ines Park", by: "2026-10-23", asks: "IQ-105 · LC-48124, 48145, 48159",
    circulation: [
      { who: "HC01 and the FAQ", when: "May–Jun", said: "Only one instance can be installed per Shopify store.", v: "right", ref: "d8" },
      { who: "Roadmap", when: "Oct 6", said: "Workaround: separate instance with translated greeting and heading.", v: "decide", ref: "d2", note: "Doesn't say whether that works on the same store." },
      { who: "Support Specialist, IQ-105", when: "Sep 25", said: "Could do a separate instance, but I'm not sure that works on the same store.", v: "decide" },
      { who: "Agent, LC-48124 (Solstice)", when: "Oct 3", said: "Separate instance, but only one per Shopify store.", v: "decide", note: "The merchant was left confused." },
      { who: "Agent, LC-48145 (Kestrel)", when: "Oct 10", said: "A separate instance on a separate Shopify store is fine.", v: "right" }
    ],
    answer: [
      ["Clear today", "One instance per Shopify store. A separate store, like Kestrel's German store, can have its own."],
      ["Not decided", "Whether a second instance can serve a language folder on the same store, such as /fr-ca/. Halden & Rowe needs the answer before its Nov 13 code freeze (LC-48159)."]
    ],
    update: [
      { doc: "d7", what: "FAQ: languages answer" }, { text: "Reply to Halden & Rowe on LC-48159" }
    ] }
];

/* ------------------------------------------------------------------ internal questions log */
const IQ = [
  ["IQ-101", "2026-09-21", "CSM", "Slack DM", "CSM (peer)", 5, "Does it matter if an account is headless for Live Chat? All they need is Shopify, right?", "It shouldn't matter, as long as Shopify is connected.", "wrong", "Headless matters. One-click install doesn't work, so developers add the loader script. Page rules don't cover headless in v1, and the widget stays across client-side navigation.", "d17"],
  ["IQ-102", "2026-09-22", "Account Executive", "#sales", "AE (peer)", 4, "Can Live Chat hide on checkout? Prospect asking.", "Not today, it's coming.", "outdated", "Early access from Nov 9 for 25 invited merchants on one-click theme stores. GA Jan 11, 2027. Not for headless in v1.", "d5"],
  ["IQ-103", "2026-09-23", "Support Specialist", "#cx-support", "Support lead", 6, "Is there a macro for 'widget not showing'?", "No macro. Check the instance toggle.", "partial", "Right diagnosis, but no macro followed. Eight tickets and 3.7 hours later there's still none.", "d18"],
  ["IQ-104", "2026-09-24", "Deployment Manager", "#product-live-chat", "PM", 2, "For a headless merchant, how do they open chat from their own button?", "SienaLaunchWidget(). It's in the custom buttons article.", "partial", "Right method. The custom buttons article isn't in the help centre. Point to HC04, Launch from your own UI.", "d9"],
  ["IQ-105", "2026-09-25", "CSM", "Slack DM", "Support Specialist", 3, "Merchant wants the widget in French. Options?", "UI is English only. Could do a separate instance but I'm not sure if that works on the same store.", "decide", "The widget UI is English only and Siena replies in French. Whether a second instance works on the same store is waiting on Product.", "answers:a4"],
  ["IQ-106", "2026-09-28", "Account Executive", "#sales", "Deployment Manager", 3, "What's the difference between One-Way and Two-Way Sync in plain English? Prospect is confused.", "Two-way means agents reply in the chat window. One-way means they reply by email.", "partial", "Also: Two-Way replies stop reaching the chat once the session ends (1 hour by default), it falls back to One-Way outside hours, and it can't be switched back without recreating the instance.", "d10"],
  ["IQ-107", "2026-09-29", "Support Specialist", "#cx-support", "Support lead", 1, "Session Controls shipped today. Anything we need to tell merchants?", "Link them the announcement article.", "wrong", "The announcement leaves out the 24-to-1-hour change. Use the Session Controls macro.", "answers:a2"],
  ["IQ-108", "2026-09-30", "CSM", "#product-live-chat", "PM", 4, "Why did my merchant's chats start closing after an hour?", "New Two-Way default from Session Controls. They can change it in instance settings.", "right", "Path: Settings → Live Chat → [instance] → Sessions.", "d11"],
  ["IQ-109", "2026-10-01", "Support Specialist", "#product-live-chat", "Eng lead", 5, "Are routed chats supposed to auto-close now? A merchant says theirs are.", "No, routed chats should never auto-close. That's LC-1204, fix is going out this week.", "right", "Right, though the fix shipped Oct 13, not that week, and merchants were never told.", "changes:lc1204"],
  ["IQ-110", "2026-10-02", "Deployment Manager", "Slack DM", "Deployment Manager (peer)", 2, "How do enterprise brands test Shopping Agent add-to-cart when the dev store is password protected?", "Use a test instance on production with the bubble hidden and open it with SienaLaunchWidget().", "wrong", "Risky: test chats on a live store become real tickets (Priya's did), and the one-instance rule is unclear. There's no test mode yet. Needs a Product answer.", "answers:a4"],
  ["IQ-111", "2026-10-05", "CSM", "#cx-support", "Support Specialist", 3, "Customer can't see chat after install. Is Siena down?", "Probably the instance toggle is off.", "right", "Right. Now a macro.", "d18"],
  ["IQ-112", "2026-10-06", "Account Executive", "#sales", "AE (peer)", 2, "Can Live Chat show only after business hours? Prospect wants agents on Gorgias chat during the day and Siena at night.", "Not natively. You'd need to swap widgets manually.", "right", "Right for now. Scheduled availability is planned for Q1 2027.", "d3"],
  ["IQ-113", "2026-10-07", "Support Specialist", "#cx-support", "Support lead", 3, "Merchant asks if Two-Way Sync can be turned off. Can it?", "Only by recreating the instance. They'll lose appearance settings.", "right", "Right. Reversible Two-Way is on the roadmap as Later.", "d2"],
  ["IQ-114", "2026-10-08", "CSM", "Slack DM", "Support Specialist", 5, "Headless merchant asks whether to put the script in root layout. Is there anything else their devs need?", "Send them the headless article.", "partial", "The article is for developers, so the CSM can't check the list. Send the CX-lead page with its checklist.", "d17"],
  ["IQ-115", "2026-10-09", "Deployment Manager", "#product-live-chat", "PM", 3, "Why does Siena grab tickets back after an agent is assigned?", "By design, Siena stops only when an agent replies. Smart delay helps.", "right", "Right (v42.97.0). Add a minimum smart delay: Fernwood set 0.5 seconds.", "d22"],
  ["IQ-116", "2026-10-09", "Marketing", "#product-live-chat", "PM", 1, "Can I use the '38% fewer open tickets' stat from Session Controls in the newsletter?", "Sure.", "wrong", "No source, cohort or method. Abandoned chats aren't resolved ones, and LC-1204 closures may be inside it.", "d10"],
  ["IQ-117", "2026-10-12", "Support Specialist", "#cx-support", "Support Specialist (peer)", 3, "What session expiry should we recommend for Two-Way merchants?", "No official guidance. I usually say 2-4 hours.", "decide", "Honest, but personal. Product owes one recommendation.", "answers:a3"],
  ["IQ-118", "2026-10-12", "CSM", "#product-live-chat", "PM", 4, "Is there a way to tag after-hours chats differently?", "Not yet. It's on the roadmap for Q1.", "right", "Right. After-hours tag, Q1 2027.", "d2"],
  ["IQ-119", "2026-10-13", "Account Executive", "#sales", "AE (peer)", 2, "Can the chat bubble be moved up on mobile? Prospect's sticky cart bar is in the way.", "Only to middle-right, I think.", "wrong", "Position offsets move it up or in, separately on mobile (Appearance → Position), since May 20.", "d8"],
  ["IQ-120", "2026-10-14", "Support Specialist", "#cx-support", "Support Specialist (peer)", 2, "Does Visibility Rules work for headless?", "I think so?", "wrong", "No. Headless isn't in v1.", "d3"],
  ["IQ-121", "2026-10-15", "Deployment Manager", "#product-live-chat", "PM", 1, "Will page rules match localized paths like /fr-ca/checkout?", "Not in EA, add a wildcard rule. See Noor's thread.", "right", "Right: add /*/checkout* next to /checkout*.", "d4"],
  ["IQ-122", "2026-10-15", "CSM", "Slack DM", "Support lead", 3, "Merchant is upset nobody told them sessions got shorter. What do I tell them?", "Point them to the Session Controls announcement.", "wrong", "Reverses the Oct 12 instruction. Use the macro and say plainly that merchants weren't told.", "answers:a2"],
  ["IQ-123", "2026-10-16", "Account Executive", "#sales", "AE (peer)", 3, "When exactly does Visibility Rules launch and what's in it?", "November, per the roadmap.", "wrong", "Early access Nov 9 for 25 invited merchants. GA Jan 11, 2027. The Linear roadmap is stale.", "launch:corrections"],
  ["IQ-124", "2026-10-16", "Support Specialist", "#cx-support", "Support Specialist (peer)", 2, "Merchant's customers are told 'outside hours' during open hours. Known bug?", "Could be LC-1182?", "wrong", "LC-1182 repeats the message. “Closed during open hours” is the schedule timezone left in UTC. Check it first.", "d22"]
];
const REPEATS = [
  { topic: "Widget not showing after install", evidence: "8 tickets (LC-48102, 107, 113, 119, 130, 136, 141, 157) · 3.7 hours of handling · IQ-103, IQ-111 · Priya: “at least six times this month”", doc: "d18", gaps: ["P1"] },
  { topic: "Replies not reaching the chat, two tickets for one customer", evidence: "10 Session Controls tickets · IQ-107, 108, 117, 122 · Priya, Oct 12", doc: "d19", gaps: ["P1", "P6"] },
  { topic: "Hide chat on checkout or other pages", evidence: "9 tickets · IQ-102, 120, 123 · Marco, Oct 12", doc: "d20", gaps: ["P1", "DOC9"] },
  { topic: "Headless: what it means for chat", evidence: "IQ-101 and IQ-114, 5 similar asks each · Wen: “in DMs maybe five times” · LC-48108", doc: "d21", gaps: ["P1", "P4"] },
  { topic: "After-hours chats landing in the live queue", evidence: "LC-48104, 48115, 48160 · IQ-118", doc: null, gaps: ["P1"], suggestion: "Draft a macro once the after-hours tag ships (Q1 2027). Until then: a Dixa or Gorgias business-hours rule." },
  { topic: "Chat tickets show as email", evidence: "5 tickets · macro “Live Chat - tickets as email” exists", doc: "d15", gaps: ["DOC2"], suggestion: "The macro links HC06, whose Zendesk and Gorgias steps are wrong. Fix HC06 first." }
];

/* ------------------------------------------------------------------ releases and changes */
const RELEASE_CHECKS = [
  ["notice", "Default changes announced to every affected merchant, with old and new values"],
  ["migrate", "Existing settings migrated only with notice or an opt-out"],
  ["regress", "Regression test on routed tickets, in every handoff mode"],
  ["stage", "Staged rollout, with the early-access cohort and its feedback written down"],
  ["articles", "Articles that describe the behaviour updated before release"],
  ["support", "Support briefed with a macro before release"],
  ["claims", "Every number in the announcement has a source, a cohort and a sign-off"]
];
const RELEASES = [
  { key: "v4340", doc: "d11", name: "v43.4.0 · Session Controls", date: "Sep 29, 2026", state: "shipped",
    res: {
      notice: [0, "“Merchants were not notified individually” (changelog). Northpaw and Halden & Rowe asked why (LC-48116, LC-48132)."],
      migrate: [0, "Existing Two-Way instances were moved to 1 hour. Fernwood's settings show “default (Session Controls v43.4.0 migration)”."],
      regress: [0, "LC-1204 shipped with it: routed One-Way tickets auto-closed from Sep 29 to Oct 13."],
      stage: [0, "The early-access cohort and its feedback aren't written down anywhere."],
      articles: [0, "HC01 still says 24-hour sessions. HC03 leaves the change out."],
      support: [0, "Support was told to “link the announcement” (IQ-107). No macro."],
      claims: [0, "“Up to 38% fewer open tickets” was cleared with “Sure.” (IQ-116)."]
    } },
  { key: "v4361", doc: "d14", name: "v43.6.1 · Fix for LC-1204", date: "Oct 13, 2026", state: "shipped",
    res: {
      notice: [0, "No status-page entry and no merchant outreach. Merchants found it when customers complained (LC-48120, LC-48129)."],
      migrate: [1, "No settings changed."],
      regress: [1, "Fixes the regression. Forward-only: tickets closed before Oct 13 stay closed."],
      stage: [1, "Not needed for a fix."],
      articles: [0, "The remedy in the changelog is half a recipe (see the regression notice below)."],
      support: [0, "Promised “this week” on Oct 1 (IQ-109). Shipped Oct 13, with no macro for affected merchants."],
      claims: [1, "No claims."]
    } },
  { key: "vrea", doc: "d3", name: "Visibility Rules · early access", date: "Nov 9, 2026", state: "upcoming",
    res: {
      notice: [1, "No defaults change. Page rules are opt-in."],
      migrate: [1, "Nothing is migrated."],
      regress: [1, "Page rules don't touch routing. The EA build's known issue is written down: case-sensitive matching, no locale folders (workaround: /*/checkout*)."],
      stage: [0, "25-merchant cohort agreed, but the list is due Oct 23 and feedback collection isn't set up."],
      articles: [0, "FAQ, HC01 and HC04 updates are queued, not published."],
      support: [0, "Macro “Visibility Rules: availability” is a draft."],
      claims: [1, "No numbers in merchant copy. “31 requests” stays internal until it has one definition."]
    } }
];
const LC1204 = {
  what: "Between Sep 29 and Oct 13, routed One-Way Sync tickets were closed automatically when the chat session expired, before an agent replied. They carry the note “Closed automatically: customer did not respond before the chat session expired.” Tidewater saw closures from Sep 28.",
  affected: [
    { m: "Tidewater Outfitters", t: "LC-48120", note: "Reproduced and escalated. Asked how to find every affected ticket." },
    { m: "Cobalt Coffee Roasters", t: "LC-48129", note: "Found 23 affected tickets. A customer complained first." },
    { m: "Every other One-Way merchant with routed chats", t: "Eng query", note: "69 accounts are on One-Way Sync. Eng to list the ones with auto-closed routed tickets from Sep 28 to Oct 13." }
  ],
  missing: [
    "No status-page entry. Priya checked on Oct 15 and found “no incidents”.",
    "No outreach to affected merchants, and no list of their tickets.",
    "No backfill. The fix only stops new closures.",
    "Promised for “this week” on Oct 1. Shipped Oct 13."
  ],
  remedy: [
    ["Changelog says", "Search for the note and reopen the tickets."],
    ["Missing 1", "The same note is on legitimate closures of chats Siena resolved. Only routed tickets carry siena-live-chat-handoff, so filter by that tag and the dates."],
    ["Missing 2", "Closed Zendesk tickets can't be reopened. Create a follow-up ticket instead."]
  ],
  status: "Status page · Resolved incident\nLive Chat: routed One-Way Sync conversations closed early (Sep 28 – Oct 13, 2026)\n\nBetween September 28 and October 13, some conversations that Siena routed to your team on One-Way Sync instances were closed automatically when the chat session expired, before an agent replied. This was fixed in v43.6.1 on October 13. Tickets closed before the fix stay closed. We're contacting affected merchants with a list of their tickets.",
  email: "Subject: Some routed Live Chat tickets were closed early (Sep 28 – Oct 13)\n\nHi {{first_name}},\n\nBetween September 28 and October 13, a bug in Live Chat (LC-1204) closed some conversations Siena had routed to your team, before an agent replied. It was fixed on October 13. We should have told you sooner, and we're sorry.\n\nYour affected tickets: {{ticket_count}} (list attached).\n\nTo find them yourself:\n1. Search for tickets with the tag siena-live-chat-handoff created between Sep 28 and Oct 13.\n2. Keep the ones with the internal note “Closed automatically: customer did not respond before the chat session expired.” Without the tag, the note is a normal closure.\n3. Gorgias: reopen them. Zendesk: closed tickets can't be reopened, so create a follow-up ticket.\n\nThese customers may still be waiting. If you'd like, we'll draft the follow-up message with you.\n\n{{csm_name}}, Siena"
};
const CHANGELOG_M = [
  { date: "Oct 13, 2026", ver: "v43.6.1", title: "Fixed: routed One-Way tickets closed early (LC-1204)", body: "Routed One-Way Sync tickets were closed when the session expired, from Sep 28 to Oct 13.", flags: ["fix", "reports"], announced: "no", marker: "Ticket closures from Sep 28 to Oct 13 include bug closures. Exclude them from resolution metrics." },
  { date: "Sep 29, 2026", ver: "v43.4.0", title: "Two-Way session length: 24 hours → 1 hour", body: "New default for Two-Way Sync. Existing Two-Way instances were moved to it unless Siena support had set a custom value.", flags: ["default", "migrated", "reports"], announced: "partly", marker: "From Sep 29, contacts rise and reopens fall: returning customers start new tickets. Don't compare before and after without this marker." },
  { date: "Sep 29, 2026", ver: "v43.4.0", title: "Abandoned AI-only chats close automatically", body: "Chats Siena resolved where the customer didn't reply are closed when the session ends, with an internal note.", flags: ["default", "reports"], announced: "yes", marker: "Resolution time now equals session length for these chats, and the backlog closed at once on Sep 29." },
  { date: "Sep 15, 2026", ver: "v43.1.2", title: "Known issue: outside-hours message repeats (LC-1182)", body: "After an outside-hours route, every new customer message re-sends the outside-hours message. Fix in v43.8.", flags: ["issue"], announced: "no", marker: "" },
  { date: "Sep 1, 2026", ver: "v42.141.0", title: "Ticket subjects are written by AI", body: "Live Chat ticket subjects are generated from the conversation in every helpdesk.", flags: ["default", "reports"], announced: "no", marker: "Views and rules that match on subject behave differently from Sep 1." },
  { date: "Jul 20, 2026", ver: "v42.97.0", title: "Siena keeps working routed tickets until an agent replies", body: "Assigning a ticket doesn't stop Siena. When Siena replies, the ticket is assigned back to Siena.", flags: ["behaviour", "reports"], announced: "no", marker: "Assignment and message counts include Siena taking tickets back." },
  { date: "May 20, 2026", ver: "v42.30.0", title: "New: position offsets", body: "Move the bubble up or in from the edge, separately on desktop and mobile (Appearance → Position).", flags: ["new"], announced: "no", marker: "" }
];
const FLAG_LABEL = { fix: "Fix", reports: "Affects your reports", default: "Changes a default", migrated: "Changed existing settings", issue: "Known issue", behaviour: "Changes behaviour", new: "New option" };

/* ------------------------------------------------------------------ launch */
const LAUNCH = {
  timeline: [
    { d: "2026-09-08", l: "Feature brief", s: "EA Nov 16 · GA Dec 7 · every install method", k: "old" },
    { d: "2026-10-06", l: "Roadmap snapshot", s: "Linear export, still Nov 16 / Dec 7", k: "old" },
    { d: "2026-10-14", l: "Scope change", s: "EA Nov 9 for 25 · GA Jan 11 · scheduling Q1", k: "key" },
    { d: "2026-10-16", l: "Old scope pitched", s: "#sales, Larkspur Home", k: "warn" },
    { d: "2026-10-19", l: "Today", s: "", k: "today" },
    { d: "2026-10-23", l: "EA candidates due", s: "Ines and Leah to Noor", k: "due" },
    { d: "2026-11-02", l: "EA article to Noor", s: "and H&R's /fr-ca/ launch", k: "due" },
    { d: "2026-11-09", l: "Early access", s: "25 merchants", k: "key" },
    { d: "2026-11-13", l: "H&R code freeze", s: "until Dec 2", k: "due" },
    { d: "2026-12-14", l: "GA comms review", s: "announcement draft", k: "due" },
    { d: "2027-01-11", l: "GA", s: "standard install path", k: "key" }
  ],
  /* The documentation plan. d = the dates a piece enters Draft, Review, Ready and Published. */
  pieces: [
    { phase: "now", cond: ["d3", "linear"], go: "doc:d3:conditions", piece: "Linear roadmap and feature brief updated", kind: "Task on the scope change", aud: "Everyone internal", owner: "Noor Haddad", rev: "", d: [null, null, null, "2026-10-14"], note: "Sales quoted the old dates on Oct 16" },
    { phase: "now", doc: "d5", piece: "Enablement hub: what's in, what's out", aud: "Sales, CS and Support", owner: "You", rev: "Noor Haddad", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"] },
    { phase: "now", doc: "d27", piece: "Sales guide", aud: "Sales (AEs)", owner: "You", rev: "Noor Haddad · Sales lead", d: ["2026-10-19", "2026-10-20", "2026-10-20", "2026-10-20"], note: "Grant pitched the old scope on Oct 16" },
    { phase: "now", comms: "Sales", piece: "Message to #sales", aud: "Sales", owner: "You", rev: "Noor Haddad", d: ["2026-10-19", "2026-10-20", "2026-10-20", "2026-10-20"] },
    { phase: "now", doc: "d28", piece: "CS guide", aud: "Customer Success", owner: "You", rev: "Leah Moreau · Noor Haddad", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"], note: "Before EA nominations close on Oct 23" },
    { phase: "now", comms: "Customer Success", piece: "Message to CSMs", aud: "Customer Success", owner: "You", rev: "Leah Moreau", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"] },
    { phase: "now", doc: "d29", piece: "Support guide", aud: "Support", owner: "You", rev: "Dani Okafor", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"] },
    { phase: "now", doc: "d20", piece: "Macro: Visibility Rules availability", aud: "Support", owner: "You", rev: "Dani Okafor", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"] },
    { phase: "now", comms: "Support", piece: "Message to #cx-support", aud: "Support", owner: "You", rev: "Dani Okafor", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"] },
    { phase: "now", doc: "d30", piece: "Not covered: what to tell merchants", aud: "Sales, CS and Support", owner: "You", rev: "Noor Haddad · Leah Moreau", d: ["2026-10-19", "2026-10-21", "2026-10-22", "2026-10-22"], note: "Updated Oct 23 with Product's answers" },
    { phase: "now", comms: "Deployment", piece: "Message to #deployment", aud: "Deployment", owner: "You", rev: "Ines Park", d: ["2026-10-19", "2026-10-20", "2026-10-21", "2026-10-21"] },
    { phase: "now", comms: "Marketing", piece: "Hold note for Marketing", aud: "Marketing", owner: "You", rev: "Noor Haddad", d: ["2026-10-19", "2026-10-21", "2026-10-22", "2026-10-23"] },
    { phase: "now", doc: "d17", piece: "Headless page for CX leads", aud: "CX leads", owner: "You", rev: "Ines Park · Tomás Reyes", d: ["2026-10-19", "2026-10-26", "2026-10-28", "2026-10-30"], note: "Halden & Rowe freezes code on Nov 13" },
    { phase: "ea", doc: "d4", piece: "Early-access help article", aud: "Early-access merchants", owner: "You, for Support", rev: "Noor Haddad · Tomás Reyes · Dani Okafor", d: ["2026-10-19", "2026-11-02", "2026-11-05", "2026-11-09"], note: "Draft to Noor by Nov 2" },
    { phase: "ea", doc: "d32", piece: "Early-access invitation email", aud: "Early-access merchants", owner: "You · CSMs send", rev: "Noor Haddad · Leah Moreau", d: ["2026-10-19", "2026-10-28", "2026-11-04", "2026-11-09"] },
    { phase: "ea", doc: "d31", piece: "Known issue: case and locale folders", aud: "Support", owner: "You", rev: "Tomás Reyes", d: ["2026-10-19", "2026-11-02", "2026-11-05", "2026-11-09"] },
    { phase: "ea", doc: "d34", piece: "Early-access feedback plan", aud: "CSMs and Product", owner: "You", rev: "Noor Haddad", d: ["2026-10-19", "2026-10-30", "2026-11-05", "2026-11-09"] },
    { phase: "ea", doc: "d7", piece: "FAQ: hiding chat on pages", aud: "Merchants", owner: "Support · you draft", rev: "Dani Okafor · Noor Haddad", d: ["2026-10-19", "2026-10-28", "2026-11-05", "2026-11-09"] },
    { phase: "ea", doc: "d8", piece: "Setup article (HC01): page-rules limit", aud: "Merchants", owner: "Support · you draft", rev: "Dani Okafor", d: ["2026-10-19", "2026-10-28", "2026-11-05", "2026-11-09"] },
    { phase: "ea", doc: "d9", piece: "Headless developer article (HC04)", aud: "Developers", owner: "You", rev: "Tomás Reyes", d: ["2026-10-19", "2026-10-30", "2026-11-04", "2026-11-06"] },
    { phase: "ea", doc: "d25", piece: "Merchant change log: early access", aud: "Merchants", owner: "You", rev: "Noor Haddad", d: ["2026-10-19", "2026-11-04", "2026-11-06", "2026-11-09"] },
    { phase: "ga", doc: "d33", piece: "GA help article", aud: "All merchants", owner: "You", rev: "Noor Haddad · Tomás Reyes · Dani Okafor", d: ["2026-12-07", "2026-12-14", "2027-01-06", "2027-01-11"], note: "Starts from early-access feedback" },
    { phase: "ga", doc: "d6", piece: "GA announcement", aud: "Merchants", owner: "You · Marketing", rev: "Noor Haddad · Marketing", d: ["2026-12-07", "2026-12-14", "2027-01-06", "2027-01-11"] },
    { phase: "ga", doc: "d7", stage: "NotStarted", piece: "FAQ and setup article: the GA answer", aud: "Merchants", owner: "Support · you draft", rev: "Dani Okafor", d: ["2026-12-14", "2026-12-21", "2027-01-06", "2027-01-11"] },
    { phase: "ga", doc: "d35", piece: "Enablement update for GA", aud: "Sales, CS and Support", owner: "You", rev: "Noor Haddad · Dani Okafor · Leah Moreau", d: ["2026-12-14", "2026-12-21", "2027-01-05", "2027-01-07"], note: "Internal teams first, four days before merchants" },
    { phase: "ga", doc: "d20", stage: "NotStarted", piece: "Macro: the GA version", aud: "Support", owner: "You", rev: "Dani Okafor", d: ["2026-12-21", "2027-01-04", "2027-01-06", "2027-01-11"] },
    { phase: "ga", doc: "d30", stage: "NotStarted", piece: "Follow-up to accounts not covered", aud: "Accounts not covered", owner: "CSMs", rev: "Noor Haddad", d: ["2026-12-21", "2027-01-04", "2027-01-06", "2027-01-11"] },
    { phase: "ga", doc: "d25", stage: "NotStarted", piece: "Merchant change log: GA", aud: "Merchants", owner: "You", rev: "Noor Haddad", d: ["2027-01-04", "2027-01-06", "2027-01-08", "2027-01-11"] },
    { phase: "later", go: "doc:d3", piece: "Scheduled availability: article and enablement", aud: "All merchants and teams", owner: "You", rev: "Noor Haddad", d: null, note: "Q1 2027, after the business-hours refactor. Scheduled once Product sets a date." },
    { phase: "later", go: "doc:d30", piece: "Headless storefronts: docs and enablement", aud: "Headless merchants and teams", owner: "You", rev: "Noor Haddad · Ines Park", d: null, note: "Revisited after GA. No date." }
  ],
  groups: [
    { k: "eligible", label: "Eligible for early access", n: 19, arr: 1.13, note: "One-click theme stores. All fit in the 25-merchant cohort." },
    { k: "pending", label: "Waiting on Tomás", n: 5, arr: 0.51, note: "Theme stores with a pasted script. If they count, 24 requesters fill 24 of 25 places." },
    { k: "nonshopify", label: "Not covered: non-Shopify", n: 2, arr: 0.16, note: "Manual script on a custom site." },
    { k: "headless", label: "Not covered: headless", n: 5, arr: 1.65, note: "Not in v1. They hold nearly half the requesting ARR." }
  ],
  accounts: [
    ["Halden & Rowe", "headless", 412, "Kustomer", "LC-48163 (3rd ask)", [["P12", "Asked three times. The ticket file shows one ask (LC-48163, first response 330 minutes)."], ["", "Code freeze Nov 13. Needs the hidden-bubble pattern tested before then."]]],
    ["Kestrel Cycling", "headless", 388, "Kustomer", "LC-48149", [["P16", "Told “November” on Oct 12. Needs a correction."]]],
    ["Arden Denim", "headless", 331, "Zendesk", "LC-48122", [["", "Open and escalated: script-per-route doesn't work on headless."]]],
    ["Tallis Athletic", "headless", 284, "Kustomer", "", []],
    ["Solstice Swim", "headless", 231, "Zendesk", "", []],
    ["Pebble Outdoors", "pending", 150, "Zendesk", "", []],
    ["Brook Tea", "eligible", 146, "Gorgias", "", []],
    ["Aster Home", "pending", 146, "Kustomer", "", []],
    ["Fern Sleep", "eligible", 142, "Zendesk", "", []],
    ["Fox Studio", "pending", 106, "Zendesk", "", []],
    ["Pine Footwear", "nonshopify", 94, "Zendesk", "", []],
    ["Copper Beauty", "eligible", 93, "Kustomer", "", []],
    ["Glen Pet", "eligible", 87, "Gorgias", "", [["D40", "CRM says Implementing, but it has 5,652 sessions a month. Don't filter invites on status."]]],
    ["Bluff Kitchen", "eligible", 86, "Gladly", "", []],
    ["Fernwood Kitchen Co.", "eligible", 64, "Gorgias", "LC-48134", [["D35", "Ticket Solved with “soon”. The need is still open."], ["", "Open escalation, go/no-go Oct 30. Leah: “add them, and fix the fire first”."]]],
    ["Juno Beauty", "nonshopify", 62, "Zendesk", "", []],
    ["Northpaw Pet Co.", "pending", 61, "Zendesk", "LC-48154", [["D40", "Install method unclear: CRM and Leah say pasted script, LC-48141 describes a one-click install. Decides eligibility."]]],
    ["Harbour Knitwear", "eligible", 58, "Dixa", "LC-48144", [["D35", "Solved as “not supported”. Wants account pages: page rules can do that by URL, but not logged-in targeting."]]],
    ["Rowan Botanics", "eligible", 56, "Zendesk", "", []],
    ["Juniper Lane Kids", "eligible", 55, "Gladly", "LC-48125", [["D35", "Solved, but the workaround needs a developer they don't have. Page rules fix it."]]],
    ["Verdant Supplements", "eligible", 52, "Gorgias", "LC-48112", [["D35", "Solved with proactive campaigns, which didn't hide the bubble."]]],
    ["Iris Coffee", "pending", 49, "Gladly", "", []],
    ["Tidewater Outfitters", "eligible", 47, "Gorgias", "LC-48101", [["D35", "Solved as “not possible per FAQ”. CSAT 1."], ["D40", "CRM says One-Way; LC-48109 describes Two-Way behaviour. Also hit by LC-1204."]]],
    ["Zephyr Skin", "eligible", 42, "Gladly", "", []],
    ["Swift Studio", "eligible", 39, "Dixa", "", []],
    ["Cedar Botanics", "eligible", 37, "Gorgias", "", []],
    ["Moor Goods", "eligible", 35, "Gladly", "", []],
    ["Mesa Nutrition", "eligible", 29, "Gorgias", "", []],
    ["Stone Botanics", "eligible", 28, "Gladly", "", []],
    ["Alder Outdoors", "eligible", 18, "Gorgias", "", []],
    ["Cove Coffee", "eligible", 15, "Zendesk", "", []]
  ],
  checks: [
    { gaps: ["D35"], t: "“Solved” hides demand", d: "6 of the 7 Solved page-visibility tickets ended with “not possible”, “soon” or a workaround that failed. Across all 57 Solved Live Chat tickets, 23 are unmet needs.", act: "Notify everyone with an unmet ask when early access opens, not only open tickets." },
    { gaps: ["D37"], t: "No demand tag", d: "None of the 9 page-visibility tickets carries feature-request, so demand can't be counted from tickets.", act: "Make page-visibility + feature-request required in the availability macro." },
    { gaps: ["P12"], t: "Repeat asks aren't counted", d: "Halden & Rowe asked three times. The ticket file shows one ask, answered after 330 minutes.", act: "Count asks per account, and answer accounts above $250K ARR within an hour." },
    { gaps: ["D43"], t: "“31” means three things", d: "31 merchants asked (brief, Sep 8). 31 merchant requests (roadmap, Oct 6). 31 requests vs 7 for scheduling (Slack, Oct 14). 31 accounts flagged in the CRM (Oct 16). It hasn't moved since Sep 8, and after-hours demand is 7 in Slack and 9 on the roadmap.", act: "One definition: accounts with a logged ask, refreshed weekly, shown with their ARR." },
    { gaps: ["D40"], t: "The CRM can't be filtered as-is", d: "All 6 Implementing accounts show live sessions. Starter accounts at $100K+ ARR (Oakhurst, Cobalt, Bramble & Bee). H&R at 30,092 sessions vs about 38,000 in its profile. Bramble & Bee still Two-Way after recreating its instance (LC-48123). The account ID is the ARR rank. No fields for sync scope, session length, timezone or email capture.", act: "Use install method and storefront for eligibility, confirm conflicts with the CSM, and add validation rules." }
  ],
  corrections: [
    { who: "Grant Whitley · AE", where: "#sales · Oct 16", said: "“From November … on any page, including on your headless site. And it'll automatically hide chat after hours.”", reach: "Larkspur Home (headless, Next.js) and #sales: 3 reactions, 2 replies", wrong: "Date, headless and after-hours are all wrong.", fix: "Sales message, then a call to Larkspur with Grant", gaps: ["P16"] },
    { who: "Marcus Lee · AE", where: "#sales · Oct 16", said: "“Stealing this.”", reach: "Unknown prospects", wrong: "Repeats Grant's pitch.", fix: "Sales message, and ask Marcus who heard it", gaps: ["P16"] },
    { who: "AE (peer) · IQ-123", where: "#sales · Oct 16", said: "“November, per the roadmap.”", reach: "One AE and their prospect", wrong: "EA is Nov 9 for 25 invited merchants. GA is Jan 11.", fix: "Sales message", gaps: ["P16"] },
    { who: "Support Specialist (peer) · IQ-120", where: "#cx-support · Oct 14", said: "“I think so?” (headless)", reach: "Support team", wrong: "Headless isn't in v1.", fix: "Support message and macro", gaps: ["P16"] },
    { who: "Support agent · LC-48149", where: "Kestrel Cycling · Oct 12", said: "“Visibility Rules on the roadmap for November.”", reach: "Kestrel ($388K, headless)", wrong: "Not in v1 for headless.", fix: "CSM call before Kestrel plans around it", gaps: ["P16"] },
    { who: "Support agent · LC-48134", where: "Fernwood · Oct 7", said: "“Soon.”", reach: "Fernwood ($64K)", wrong: "Vague, and Fernwood is an early-access candidate.", fix: "Early-access invite from Leah", gaps: ["P16"] },
    { who: "Linear roadmap", where: "Roadmap snapshot · Oct 6", said: "“EA Nov 16 · GA Dec 7.”", reach: "Everyone who checks Linear. Grant got his dates there.", wrong: "Noor planned to update it on Oct 14. Sales quoted it on Oct 16.", fix: "Update Linear, mark the snapshot superseded", gaps: ["DOC18"], doc: "d2" },
    { who: "Feature brief", where: "Brief · Sep 8", said: "“Works for every install method.”", reach: "Anyone reading the brief", wrong: "Early access covers the standard install path only.", fix: "Mark superseded and link the Oct 14 decision", gaps: ["DOC18"], doc: "d1" }
  ],
  /* the single list of what Product must confirm: rendered in Launch → Confirm with Product, at the bottom of the
     early-access article and in the enablement hub, so every copy stays the same */
  confirm: [
    { q: "What do visibility rules look like from the customer's perspective?", d: "What does a merchant see on the Visibility tab, and what does a shopper see where chat is hidden? The article's steps come from the brief, not the build.", who: "Noor Haddad and Tomás Reyes", by: "2026-10-23", blocks: "The “Add a rule” steps, and what the article and the Support guide say shoppers see" },
    { q: "Does the platform block two app keys on one domain, and can two loaders run on one page?", d: "Both would define <code>window.SienaLaunchWidget</code>. If two instances can run, do page rules apply to each one separately?", who: "Tomás Reyes", by: "2026-10-23", blocks: "What CSMs tell stores that want one instance per language" },
    { q: "Is “hidden bubble plus the store's own Chat button” a supported answer for headless stores?", d: "What can CSMs promise the five headless accounts ($1.65M)?", who: "Noor Haddad", by: "2026-10-23", blocks: "The Deployment message, the headless page for CX leads, and Halden & Rowe before its Nov 13 code freeze" },
    { q: "Do themes with a pasted Live Chat script count as the standard install path?", d: "Decides eligibility for 5 accounts ($0.51M).", who: "Tomás Reyes", by: "2026-10-23", blocks: "Eligibility in the article, and invites for 5 accounts", note: "Asked in the Oct 14 thread. No reply yet." },
    { q: "Can a proactive campaign still fire on a page where a rule hides the bubble, and does clicking it open chat there?", d: "", who: "Noor Haddad and Tomás Reyes", by: "2026-11-02", blocks: "“What page rules don't do” in the article and the guides" },
    { q: "What happens to an open chat when a rule hides the bubble?", d: "Are rules checked again when a theme changes pages without a full reload?", who: "Tomás Reyes", by: "2026-11-02", blocks: "“What page rules don't do” and the Support guide" },
    { q: "Does the one-click install move off Shopify script tags before Shopify stops loading them on Mar 1, 2027, and do rules carry over?", d: "113 one-click accounts ($8.38M) use script tags.", who: "Tomás Reyes and Noor Haddad", by: "2026-12-14", blocks: "Eligibility wording at GA, and the GA article" },
    { q: "Can early access be provided before November 9th to selected merchant accounts?", d: "", who: "Noor Haddad and Tomás Reyes", by: "2026-10-23", blocks: "Invitation dates and the early-access email" }
  ],
  ifChanges: [
    ["Change the source first", "Update Noor's Oct 14 scope-change doc the same day. It's the source the agent ranks first."],
    ["Find every copy", "“Where each fact lives” lists every page and team message that states a launch fact, including any still on the old value."],
    ["Update together, then re-send", "The early-access article, the enablement hub and the Sales, CS and Support guides change in one pass. Team messages regenerate from their templates."],
    ["Close the loop", "Move the dates in the launch plan, and follow up with everyone who repeated the old version until it's corrected."]
  ]
};

/* ------------------------------------------------------------------ playbook: troubleshooting checklist */
const CHECKLIST = [
  { id: "tz", step: "Business schedule timezone", where: "Settings → Business schedule → Support timezone", why: "New organizations start in UTC. Customers are told you're closed while you're open, handoff messages fire at the wrong time, and the reply mode is wrong.", fern: ["bad", "UTC. 8:00–18:00 UTC is 4 am–2 pm Eastern, so Transcript A (3:42 pm Eastern) and the Saturday chats (LC-48155) fall outside hours."] },
  { id: "hol", step: "Holidays", where: "Settings → Business schedule → Holidays", why: "An empty list keeps the team “open” on holidays.", fern: ["bad", "Empty, with Thanksgiving and BFCM ahead."] },
  { id: "toggle", step: "Instance toggle", where: "App Store → Live Chat → [instance]", why: "New instances start switched off. The most common Live Chat ticket.", fern: ["ok", "Enabled."] },
  { id: "key", step: "App key and CSP (manual or headless installs)", where: "Installation tab, browser console", why: "A wrong key or a CSP block fails silently.", fern: ["na", "One-click install."] },
  { id: "rate", step: "Helpdesk connection and rate limits", where: "Siena integration page", why: "Hitting the Gorgias limit blocks message sync. Rule it out before blaming expiry (Verdant, LC-48118).", fern: ["warn", "18,422 requests in 24 hours on default Gorgias limits. No increase requested, and BFCM brings four times the volume."] },
  { id: "session", step: "Session length", where: "Settings → Live Chat → [instance] → Sessions", why: "After expiry, helpdesk replies don't reach the chat and returning customers get a new ticket.", fern: ["bad", "60 minutes, set by the Session Controls migration. Transcript D's Monday reply couldn't be delivered."] },
  { id: "email", step: "Email capture", where: "Appearance → Email capture", why: "Without an email, nobody can follow up after hours or after expiry.", fern: ["bad", "Off. Siena promised emails it couldn't send (Transcripts A and D)."] },
  { id: "delay", step: "Smart delay", where: "Settings → AI → Smart delays", why: "Very short delays make Siena and agents reply at once (Verdant, LC-48138: 0.5 s to 5 s fixed it).", fern: ["bad", "0.5 seconds, lowered on Oct 8."] },
  { id: "know", step: "Knowledge sources", where: "Knowledge → Sources", why: "Imported content doesn't sync. An old source can beat a current one on similarity.", fern: ["bad", "Gorgias macros imported Aug 12 (no auto-sync) still say 30-day returns and beat the Shopify returns page (60 days). Transcript C."] },
  { id: "bugs", step: "Known issues", where: "Known issues in Doc Desk", why: "Check last, once the settings are ruled out.", fern: ["warn", "LC-1182 explains the repeated message, not the wrong hours. LC-1204 doesn't apply: Fernwood is Two-Way."] }
];

/* ------------------------------------------------------------------ escalation: Fernwood */
const ESC = {
  facts: [["Account", "Fernwood Kitchen Co. · Growth · $64K Live Chat ARR"], ["Live since", "Oct 5, 2026 (from Gorgias Chat)"], ["Owner", "You (Product Specialist), from Oct 15"], ["Deadline", "Go/no-go on chat through BFCM, Oct 30 (Alana Ruiz, VP CX)"], ["People", "Jordan Blake (CX Ops), Leah Moreau (CSM), Tomás Reyes (Eng)"]],
  thread: [
    { d: "Oct 5", t: "Went live on Live Chat", k: "" },
    { d: "Oct 6", t: "LC-48133 · “Chat says we're closed during open hours?”", k: "bad", n: "Closed as “no response after 3 days”, although Jordan replied that the hours were correct. The first report, never linked." },
    { d: "Oct 7", t: "LC-48134 · Hide chat on cart and checkout", k: "", n: "Solved with “soon”. Early-access candidate." },
    { d: "Oct 10", t: "Transcript D · damaged Dutch oven, reply never delivered", k: "" },
    { d: "Oct 12", t: "LC-48148 · Gorgias chat view empty", k: "", n: "Tickets show as email. Solved with HC06." },
    { d: "Oct 13", t: "LC-48152 · Siena taking tickets back", k: "bad", n: "Merged into the escalation, but still Open." },
    { d: "Oct 13", t: "Transcript A · “closed” at 3:42 pm, repeated message", k: "" },
    { d: "Oct 14", t: "Transcript B · Siena reassigns Becca's ticket", k: "" },
    { d: "Oct 14", t: "LC-48155 · Saturday chats say we're closed", k: "bad", n: "Merged into the escalation, but still Open." },
    { d: "Oct 14", t: "Jordan's email, 5:52 pm Eastern", k: "key" },
    { d: "Oct 15", t: "#support-escalations · Priya escalates", k: "" },
    { d: "Oct 15", t: "Transcript C · 30-day return window", k: "warn", n: "Dated after Jordan's email, so it can't be one of the cases he described." },
    { d: "Oct 30", t: "Go/no-go decision", k: "key" }
  ],
  evidence: [
    [0, "Conversation IDs", "None of the four transcripts has one. Tomás asked for IDs before he'll look at traces."],
    [1, "Timezone stated", "Transcripts are in Eastern Time (the viewer's timezone). The settings export is in UTC."],
    [0, "Dates checked", "Transcript C is dated Oct 15, after Jordan's Oct 14 email."],
    [0, "Representative sample", "Four transcripts chosen by the merchant, out of thousands of sessions a month."],
    [0, "Complete transcripts", "Transcript C stops at routing, with no outcome."],
    [1, "Settings export", "Attached: exported Oct 14 at 21:40 UTC."]
  ],
  hygiene: [
    ["LC-48152", "Merged into the escalation, still Open.", "Close it as merged, with a link."],
    ["LC-48155", "Merged into the escalation, still Open.", "Close it as merged, with a link."],
    ["LC-48133", "Closed as “no response after 3 days”, although the merchant replied.", "Reopen, link to the escalation, record the real cause."]
  ],
  symptoms: [
    { s: "“We're told we're closed when we're open”, and the message repeats", kind: "Configuration + bug", c: "The schedule timezone is UTC, so 8–18 means 4 am–2 pm Eastern. LC-1182 makes the outside-hours message repeat.", fix: "Set the timezone to Eastern and add holidays. LC-1182 is fixed in v43.8." },
    { s: "“Siena is fighting my agents”", kind: "Product behaviour + configuration", c: "Siena keeps working a routed ticket until a human replies, and takes it back when it replies (v42.97.0). A 0.5-second smart delay makes it jump in first.", fix: "Smart delay of at least 5 seconds. Agents reply rather than only assign. Product question: pause Siena on assignment." },
    { s: "“A customer was told 30-day returns”", kind: "Merchant content", c: "Imported Gorgias macros (Aug 12, no auto-sync) still say 30 days and beat the Shopify returns page (60 days) on similarity.", fix: "Update or remove the 30-day macros. Product question: rank sources by freshness." },
    { s: "“Customers never hear back”", kind: "Product behaviour + configuration", c: "The session expired after 60 minutes (migrated default), so Monday's reply couldn't reach the chat, and email capture is off.", fix: "Turn on email capture and lengthen the session. Product question: deliver late replies another way." }
  ],
  next: [
    ["Reply to Jordan with causes and fixes", "You", "Oct 20"],
    ["Fix settings with Jordan: timezone, holidays, email capture, smart delay, session length", "You + Jordan", "Oct 21"],
    ["Remove or update the 30-day macros", "Jordan", "Oct 21"],
    ["Ask Gorgias for a higher rate limit before BFCM", "Jordan", "Oct 23"],
    ["Eng ask with conversation IDs: reassignment and late replies", "You → Tomás", "Oct 21"],
    ["Account update and early-access invite", "Leah Moreau", "Oct 23"]
  ]
};

/* ------------------------------------------------------------------ data definitions */
const DATA_DEFS = [
  { f: "first_response_min", today: "Minutes. Unit not written down.", issue: "Weekend tickets weren't slower, so it's probably business minutes. In-app chat (8–38 minutes) is mixed with email.", def: "Business minutes in the support team's timezone, reported separately for email and in-app chat.", owner: "Dani Okafor", gaps: ["D38"] },
  { f: "status", today: "Open, Pending, Solved, Closed.", issue: "Solved hides unmet needs (23 of 57). Merged tickets left Open (LC-48152, 48155). LC-48133 closed as “no response” after a reply.", def: "Solved needs a resolution code: Fixed, Workaround, Not possible yet, Feature request. Merging closes the merged ticket with a link.", owner: "Dani Okafor", gaps: ["D35", "D36"] },
  { f: "tags", today: "Symptom tags, added by hand.", issue: "feature-request is missing from all 9 page-visibility tickets. Tags describe symptoms, not causes.", def: "Macros set required tags, including a cause tag and feature-request where it applies.", owner: "Support ops", gaps: ["D37"] },
  { f: "csat", today: "Score per ticket.", issue: "Filled on 57 of 58 closed tickets (missing on LC-48144). No real survey gets 98% responses.", def: "Only scores from survey responses, with the response rate reported next to the average.", owner: "Support ops", gaps: ["D37"] },
  { f: "article_linked", today: "Article sent to the merchant.", issue: "Credits articles that lack the answer, such as the FAQ's “not possible” on LC-48101.", def: "Article linked, plus “answered the question: yes/no”.", owner: "You", gaps: ["D37"] },
  { f: "subject", today: "Ticket subject.", issue: "Contradicts the body on LC-48101, 48131 and 48149.", def: "Subject is free text. Reporting uses tags and the cause field, not subjects.", owner: "Support ops", gaps: ["D37"] },
  { f: "timestamps", today: "created_at only. Timezone not stated.", issue: "No solved or updated time, so resolution time can't be measured.", def: "created_at, first_reply_at, solved_at, updated_at, all in UTC.", owner: "Support ops", gaps: ["D39"] },
  { f: "export scope", today: "First message only, one tag (live-chat).", issue: "Jordan's escalation email isn't a row. Threads and follow-ups are missing.", def: "Full thread, all tags, all channels, including emailed escalations.", owner: "Support ops", gaps: ["D39"] }
];

/* ------------------------------------------------------------------ Ask agent: authority, scripted answers */
const AUTHORITY = { roadmap: 5, changelog: 4, brief: 3, help: 3, known: 3, enable: 2, macro: 2, playbook: 2, escalation: 1, data: 2, announce: 2 };
const SCRIPT = [
  { q: "When is Visibility Rules GA, and what changed?", k: ["ga", "visibility", "changed", "when", "launch", "date"],
    a: "GA is January 11, 2027. It was December 7 until the Oct 14 scope change [d3].\n- Page rules early access moves earlier to November 9, for 25 merchants (was Nov 16, 10 merchants) [d3].\n- Early access covers the standard install path only. Headless isn't in v1 [d3].\n- Scheduled availability moves to Q1 2027 [d3].\nThe Sep 8 brief and the Oct 6 roadmap still show the old dates [d1][d2].",
    rank: [["d3", "Newest decision (Oct 14), approved by the PM"], ["d2", "Older (Oct 6). Contradicts the Oct 14 decision, so it lost", "lost"], ["d1", "Oldest (Sep 8). Replaced by the Oct 14 decision, so it's left out", "out"]] },
  { q: "Can headless merchants use page rules?", k: ["headless", "page", "rules", "hydrogen", "next"],
    a: "No. Headless storefronts aren't in v1 of Visibility Rules [d3].\n- Loading the script on some routes doesn't work either: the widget stays across client-side navigation [d9].\n- Until there's a plan: hide the bubble and open chat from your own button on chosen routes. Test it first [d17].\n- Five headless accounts asked for page rules, holding $1.65M of ARR.",
    rank: [["d3", "Decision record, Oct 14"], ["d17", "Current guidance for CX leads (draft)"], ["d9", "Developer article (Jan 20). Its visibility advice is wrong, so it lost on that point", "lost"]] },
  { q: "Which articles still say sessions last 24 hours?", k: ["24", "hours", "sessions", "articles", "say"],
    a: "One article says it outright, and another leaves the change out:\n- How to set up Siena Live Chat (HC01) says sessions close after 24 hours and “extend by one hour” [d8].\n- Introducing Session Controls (HC03) never says the Two-Way default dropped to 1 hour [d10].\nThe changelog is the source: Two-Way defaults to 1 hour since Sep 29, One-Way and No Sync keep 24 hours [d11].",
    rank: [["d11", "Changelog: the release itself, Sep 29"], ["d8", "Help article, last updated Jun 2. Quoted as the article at fault"], ["d10", "Announcement, Sep 29. Quoted as the article at fault"]] },
  { q: "What should Sales stop saying?", k: ["sales", "stop", "saying", "pitch", "promise"],
    a: "Stop saying these three things [d27]:\n- “Works on any page, including headless.” Headless isn't in v1.\n- “Automatically hides chat after hours.” That's Q1 2027, and not committed.\n- “Ships in November.” It's early access for 25 invited merchants on Nov 9. GA is Jan 11.\nSay instead: from November, early-access merchants on Shopify theme stores can hide chat on pages like cart and checkout, and it's planned for everyone in January [d27].",
    rank: [["d27", "Sales guide, built from the Oct 14 decision"], ["d5", "Enablement hub, same plan"], ["d3", "The decision itself"]] },
  { q: "How do I hide chat on /en-ca/checkout?", k: ["en-ca", "fr-ca", "locale", "checkout", "hide", "wildcard"],
    a: "In early access, add a wildcard rule next to the base rule [d3][d4]:\n- /checkout* matches /checkout but not /en-ca/checkout.\n- /*/checkout* matches /en-ca/checkout.\nRules are case-sensitive and ignore locale folders. The fix is planned before GA [d3].",
    rank: [["d3", "Known issue in the EA build, Oct 14"], ["d4", "EA help article (draft)"]] },
  { q: "Should I link the Session Controls announcement?", k: ["link", "announcement", "session", "controls", "hc03"],
    a: "No, not until it's rewritten. It leaves out the 24-to-1-hour change [d10].\nUse the macro Session Controls: what changed for Two-Way instead [d19]. The Oct 15 instruction to link it (IQ-122) is withdrawn.",
    rank: [["d19", "Macro written for this question"], ["d10", "The article. Needs a rewrite"]] },
  { q: "What session length should we recommend?", k: ["session", "length", "recommend", "expiry", "hours"],
    a: "There's no recommendation yet. Product owes one by Oct 26 [d26].\nUntil then, give facts, not a number: shorter sessions split returning customers into new tickets and drop late replies; longer ones keep the chat open and delay auto-close. Range: 30 minutes to 7 days [d11].",
    rank: [["d11", "Changelog: the default and the range"], ["d26", "Guidance article, waiting on Product"]] },
  { q: "Why did Fernwood's chat say 30-day returns?", k: ["fernwood", "30", "return", "window", "returns", "wrong"],
    a: "An out-of-date source won. Fernwood's Gorgias macros were imported on Aug 12 without auto-sync and still say 30 days. The Shopify returns page (synced Oct 1) says 60. Siena picked the macro on similarity [d23].\nFix: update or remove the 30-day macros. Product question: rank sources by freshness [d22].",
    rank: [["d23", "Escalation page, Oct 15 evidence"], ["d22", "Checklist step: knowledge sources"]] },
  { q: "What do I say when the widget isn't showing after install?", k: ["widget", "showing", "install", "toggle", "appear", "invisible"],
    a: "It's almost always the instance toggle. New instances start switched off [d18].\n1. App Store → Live Chat → [instance].\n2. Switch the toggle at the top of the page on.\n3. Reload the store.\nThen check the script placement and app key, and that one-click went to the live theme [d8].",
    rank: [["d18", "Macro, reviewed by Support"], ["d8", "Setup article: the answer, at the bottom"]] },
  { q: "Which merchants were hit by LC-1204?", k: ["lc-1204", "1204", "closed", "auto-close", "routed", "one-way"],
    a: "Routed One-Way tickets closed early between Sep 28 and Oct 13 [d14].\n- Known from tickets: Tidewater Outfitters (LC-48120) and Cobalt Coffee Roasters (LC-48129, 23 tickets).\n- The full list needs an Eng query across the 69 One-Way accounts.\nNo merchant was told. The regression notice and email are drafted in Changes.",
    rank: [["d14", "Changelog entry for the fix"]] },
  { q: "Does page rules hide proactive campaigns?", k: ["campaign", "campaigns", "proactive"],
    a: "No. Campaigns keep their own targeting, by design [d3]. Page rules hide the bubble, not campaign messages [d4].",
    rank: [["d3", "Decision record"], ["d4", "EA help article (draft)"]] },
  { q: "Who's waiting on a Visibility Rules answer?", k: ["waiting", "who", "accounts", "asked", "merchants"],
    a: "31 accounts asked ($3.44M ARR). The ones waiting on us now:\n- Halden & Rowe: third ask (LC-48163), headless, code freeze Nov 13.\n- Kestrel Cycling: told “November” (LC-48149), headless.\n- Arden Denim: escalated (LC-48122), headless.\n- Fernwood: told “soon” (LC-48134), early-access candidate.\nThe full list is in Launch → EA candidates [d3].",
    rank: [["d3", "Decision record and asks"]] },
  { q: "What do I tell a headless merchant about Visibility Rules?", k: ["headless", "hydrogen", "next", "tell", "merchant", "covered", "storefront"],
    a: "Page rules don't support headless storefronts in this version, and there's no date yet [d30].\n- Don't suggest loading the script on some routes only: the widget stays after client-side navigation [d9].\n- What works today, being confirmed by Product: hide the bubble and open chat from your own “Chat with us” button on chosen routes [d30].\n- Five headless accounts asked, holding $1.65M. CSMs call them before Nov 9 [d28].",
    rank: [["d30", "Not covered guide, Oct 19: written for this question"], ["d28", "CS guide, with the account list"], ["d9", "Developer article (Jan 20). Its visibility advice is wrong, so it lost on that point", "lost"]] },
  { q: "What's due for the launch this week?", k: ["due", "week", "launch", "deadline", "plan", "today", "late"],
    a: "This week, Oct 19–23. Today: draft the five department messages [d3].\n- Oct 20: the Sales guide and the message to #sales [d27].\n- Oct 21: the enablement hub, the CS and Support guides, the availability macro and the messages to CSMs, #cx-support and #deployment [d5][d28][d29].\n- Oct 22: Not covered: what to tell merchants [d30].\n- Oct 23: the hold note for Marketing, early-access candidates to Noor, and Product's answers on pasted scripts and headless [d3].\nLate: the Linear roadmap update, due Oct 14. The full plan is in Launch → Plan.",
    rank: [["d5", "Enablement hub, Oct 19"], ["d3", "Scope change, Oct 14: the dates and asks"]] }
];
