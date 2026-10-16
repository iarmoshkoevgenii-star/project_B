/* ---------- data ---------- */
const TYPES={
  brief:{label:"Feature brief",c:"--t-brief"},
  roadmap:{label:"Roadmap update",c:"--t-roadmap"},
  announce:{label:"Feature announcement",c:"--t-announce"},
  help:{label:"Help article",c:"--t-help"},
  enable:{label:"Internal enablement",c:"--t-enable"},
  known:{label:"Known issue",c:"--t-known"},
  changelog:{label:"Changelog entry",c:"--t-changelog"},
  macro:{label:"Macro",c:"--t-macro"},
  playbook:{label:"Playbook",c:"--t-playbook"},
  escalation:{label:"Escalation",c:"--t-escalation"},
  data:{label:"Data definition",c:"--t-data"}
};
const TAGS={
  visibility_rules:{d:"The Visibility Rules feature: page rules plus scheduled availability.",depts:["Sales","Customer Success","Support","Marketing"]},
  page_rules:{d:"Show or hide the chat bubble by URL path.",depts:["Support","Customer Success"]},
  scheduled_availability:{d:"What the bubble does outside business hours. Moved to Q1 2027.",depts:["Sales","Support"]},
  early_access:{d:"Content that only applies to the EA cohort (from Nov 9).",depts:["Customer Success"]},
  headless:{d:"Hydrogen, Next.js and custom front ends. Script-based installs.",depts:["Deployment","Customer Success"]},
  locale_paths:{d:"Localized storefront paths such as /en-ca/ and /fr-ca/.",depts:["Deployment","Support"]},
  proactive_campaigns:{d:"URL-targeted proactive messages. Separate from page rules.",depts:["Support","Marketing"]},
  install:{d:"One-click, manual script and headless installation.",depts:["Support","Deployment"]},
  session_controls:{d:"Session length, expiry and abandoned-chat auto-close (v43.4.0).",depts:["Support","Customer Success"]},
  two_way_sync:{d:"Agents reply from the helpdesk into the chat window.",depts:["Support"]},
  business_hours:{d:"Business schedule and handoff messages.",depts:["Support"]},
  known_issue:{d:"Open or recently fixed bugs.",depts:["Support"]},
  localization:{d:"Widget language and translated instances.",depts:["Customer Success","Deployment"]},
  shopping_agent:{d:"Shopping Agent features (add to cart, product expert).",depts:["Sales"]},
  helpdesk_reporting:{d:"Views, routing and reports in the merchant's helpdesk.",depts:["Support","Customer Success"]},
  no_sync:{d:"No Sync handoffs and the Siena Inbox.",depts:["Support","Customer Success","Sales"]},
  troubleshooting:{d:"Diagnosis steps and settings checks.",depts:["Support"]},
  data_quality:{d:"Definitions and checks for ticket and CRM data.",depts:["Support"]}
};
const T=(t,src,conf,why,state)=>({t,src,conf,why,state:state||"ok"});
const DOCS=[
 {id:"d3",title:"Visibility Rules: scope and date change",type:"roadmap",status:"InReview",date:"2026-10-14",owner:"Noor Haddad · you",aud:"Internal",
  summary:"Page rules move earlier to EA Nov 9; GA moves to Jan 11, 2027; scheduled availability moves to Q1 2027; headless is not in v1.",
  tags:[T("visibility_rules","ai",.99,"Feature named in title and throughout."),T("page_rules","ai",.97,"<q>Page rules are moving earlier. EA now November 9</q>"),T("scheduled_availability","ai",.95,"<q>Scheduled availability is moving out to Q1 2027</q>"),T("early_access","ai",.93,"<q>EA cohort grows from 10 to 25 merchants</q>"),T("headless","human",null,"Added by you. Noor's thread: <q>we haven't scoped headless for v1</q>"),T("locale_paths","ai",.88,"<q>doesn't account for locale prefixes … /en-ca/checkout</q>"),T("proactive_campaigns","ai",.81,"<q>Campaigns keep their own targeting, by design</q>")],
  rerun:[T("install","ai",.72,"<q>EA starts with the standard install path</q>. Install method decides eligibility.","sug")],
  body:[{p:"Source: #product-live-chat, Noor Haddad, Wed Oct 14 10:12. Replaces the dates in the Sep 8 brief and the Oct 6 roadmap snapshot."},{h:"What changed"},{ul:["<b>Page rules EA:</b> November 9 (was Nov 16). Cohort grows from 10 to 25 merchants, priority to accounts that asked.","<b>GA:</b> January 11, 2027 (was Dec 7). Coverage broadens for GA.","<b>Scheduled availability:</b> moves to Q1 2027. Depends on the business-hours service refactor.","<b>Install coverage:</b> EA starts with the standard install path. Headless is not scoped for v1."]},{h:"Known issue in the EA build"},{p:"Path matching is case-sensitive and ignores locale prefixes. A rule excluding <code>/checkout*</code> will not match <code>/en-ca/checkout</code>. Workaround: add <code>/*/checkout*</code> alongside the base rule. Fix planned before GA."},{h:"Open questions"},{ul:["<mark>Does “standard install path” include merchants who pasted the script into their theme?</mark> Noor: should be fine. Waiting on Tomás.","Page rules do not hide proactive campaigns. Needs a clear explanation for merchants."]},{h:"Asks"},{ul:["EA candidates to Noor by Oct 23 (Ines, Leah).","EA help article draft to Noor by Nov 2 (Support → Product Specialist)."]}]},
 {id:"d4",title:"Show or hide Live Chat on chosen pages (early access)",type:"help",status:"Draft",date:"2026-10-19",due:"to Noor Nov 2",owner:"you",aud:"Early-access merchants",
  summary:"The early-access help article for merchants: who can use page rules, how to add one, how rules match pages, recipes, known issues, what rules don't do and troubleshooting. The questions for Product and the plan for keeping the docs in step are at the bottom. Draft for Noor's review on Nov 2.",
  tags:[T("visibility_rules","ai",.98,"Feature named in title."),T("page_rules","ai",.99,"Article is about URL include/exclude rules."),T("early_access","ai",.96,"<q>available to invited merchants from November 9</q>"),T("locale_paths","ai",.9,"Known issue: /en-ca/ and /fr-ca/ paths."),T("proactive_campaigns","ai",.84,"<q>Page rules don't hide proactive campaign messages</q>"),T("install","ai",.77,"Eligibility table by install method.")],
  body:[
   {p:"Page rules let you choose where the Live Chat bubble appears on your store, using each page's address. Use them to keep chat off checkout, cart or account pages, or to show it only where it helps your customers."},
   {note:"<b>Early access.</b> Page rules are available to invited merchants from November 9, 2026, and planned for everyone on the standard install path from January 11, 2027."},
   {table:{head:["What it does","Who can use it","Where","Time"],rows:[["Shows or hides the chat bubble, page by page","Invited Shopify theme stores with the one-click install","<b>Settings → Live Chat →</b> your instance <b>→ Visibility</b>","About 2 minutes, no code"]]}},
   {h:"Start where it fits you"},
   {ul:["<b>Running the store?</b> Copy the rules you need from Recipes, then check your pages.","<b>Leading the support team?</b> Read Known issues and What page rules don't do.","<b>A developer?</b> Start with How rules match pages. Headless storefronts aren't supported in this version."]},
   {h:"Before you start"},
   {p:"Page rules work on stores where Live Chat was added with Siena's standard install. Check yours:"},
   {table:{head:["Your store","Page rules in early access"],rows:[["<b>Shopify theme store</b>, one-click install","Yes"],["<b>Shopify theme store</b>, Live Chat script pasted into the theme","Being confirmed"],["<b>Headless storefront</b> (Hydrogen, Next.js or custom)","Not in this version"],["<b>Other websites</b>","No"]]}},
   {p:"You also need an early-access invitation. Not sure about either? Ask your Customer Success Manager."},
   {h:"Words we use"},
   {table:{head:["Term","What it means"],rows:[["Page address (path)","The part of a web address after your domain. In <code>yourstore.com/checkout</code>, the path is <code>/checkout</code>."],["Rule","A path plus what to do there: <b>Exclude</b> hides chat, <b>Include</b> shows chat only on matching pages."],["Wildcard <code>*</code>","Stands for any characters, or none. <code>/checkout*</code> covers <code>/checkout</code> and <code>/checkouts/abc</code>."],["Language or country folder","A part of the path for a market, like <code>/en-ca/</code> or <code>/fr-ca/</code>. Needs its own rule for now."]]}},
   {h:"Add a rule"},
   {ol:["Go to <b>Settings → Live Chat → [your instance] → Visibility</b>. If you run more than one instance, add rules to each one where chat should change.","Choose <b>Exclude</b> to hide chat on matching pages, or <b>Include</b> to show it only on matching pages. Most stores only need Exclude.","Type a page path, for example <code>/checkout*</code>. Start with a slash, and add the same rule with <code>/*/</code> in front for language folders.","<b>Save</b>, then open the page in a private browser window to check it. A private window shows the store the way a new customer sees it."]},
   {h:"How rules match pages"},
   {p:"A rule matches a page when the page's path fits the pattern exactly, letter for letter."},
   {table:{head:["Rule","Matches","Doesn't match"],rows:[["<code>/cart</code>","<code>/cart</code>","<code>/en-ca/cart</code>"],["<code>/checkout*</code>","<code>/checkout</code>, <code>/checkouts/abc</code>","<code>/en-ca/checkout</code>, <code>/Checkout</code>"],["<code>/*/checkout*</code>","<code>/en-ca/checkout</code>, <code>/fr-ca/checkouts/abc</code>","<code>/checkout</code>"],["<code>/account*</code>","<code>/account</code>, <code>/account/orders</code>","<code>/en-ca/account</code>"]]}},
   {ul:["<b>Any characters, or none.</b> Put <code>*</code> where the rest of the path can vary, such as order numbers or product names.","<b>Exclude rules win.</b> If a page matches an include rule and an exclude rule, chat is hidden on it.","<b>Include narrows chat down.</b> Once you add an include rule, chat shows only on pages that match one."]},
   {h:"Recipes"},
   {table:{head:["I want to…","Choose","Add these rules"],rows:[["Keep chat off checkout, in every language","Exclude","<code>/checkout*</code> and <code>/*/checkout*</code>"],["Keep chat off the cart","Exclude","<code>/cart</code> and <code>/*/cart</code>"],["Keep chat off account pages","Exclude","<code>/account*</code> and <code>/*/account*</code>"],["Show chat only on product pages","Include","<code>/products/*</code> and <code>/*/products/*</code>"]]}},
   {p:"Start with one exclude rule, check it in a private window, then add the rest."},
   {h:"Known issues in early access"},
   {ul:["Rules are case-sensitive: <code>/checkout*</code> doesn't match <code>/Checkout</code>.","Rules don't include language or country folders: <code>/checkout*</code> doesn't match <code>/en-ca/checkout</code>.","A fix for both is planned before general availability. Until then, add a second rule:"]},
   {table:{head:["To hide chat on","Add these rules"],rows:[["Checkout, in every language","<code>/checkout*</code> and <code>/*/checkout*</code>"],["Cart, in every language","<code>/cart</code> and <code>/*/cart</code>"],["Account pages, in every language","<code>/account*</code> and <code>/*/account*</code>"],["A page with capital letters in its address","The exact case, or one rule per spelling"]]}},
   {h:"What page rules don't do"},
   {ul:["<b>Hide proactive campaign messages.</b> Campaigns keep their own page targeting. Edit the campaign's URL targeting instead.","<b>Change chat outside business hours.</b> That's planned separately. Your outside-hours message still applies.","<b>Show or hide chat by customer.</b> Rules use the page address, not who is visiting, so they can't target logged-in customers.","<b>Work on headless storefronts.</b> Not in this version, and there's no date yet. Your CSM can tell you what works today."]},
   {p:"<b>Chats in progress:</b> what happens to an open conversation when a rule hides the bubble is still being confirmed."},
   {h:"Troubleshooting"},
   {table:{head:["What you see","Why","What to do"],rows:[["Chat still shows on <code>/en-ca/checkout</code>","Rules don't include language folders yet","Add <code>/*/checkout*</code> next to <code>/checkout*</code>"],["A rule doesn't hide <code>/Checkout</code>","Matching is case-sensitive","Use the address's exact capitals, or one rule per spelling"],["Chat disappeared from most pages","An include rule shows chat only where it matches","Remove the include rule, or add the pages that should show chat"],["A campaign message still appears","Campaigns keep their own targeting","Edit the campaign's URL targeting"],["The change doesn't show on your screen","You're checking in a window that already had the page open","Open the page in a private window"]]}},
   {h:"Turn page rules off"},
   {p:"Delete your rules on the <b>Visibility</b> tab. Chat shows on every page again."},
   {h:"Still stuck?"},
   {p:"Contact support@siena.cx with your store URL and the rules you added."},
   {h:"Notes for reviewers (internal)"},
   {note:"<b>Remove this section before publishing.</b> Owner: Eugene Iarmoshko (PS) · Reviewers: Noor Haddad (PM), Tomás Reyes (Eng), Dani Okafor (Support) · To Noor by <b>Nov 2</b> · published with early access on <b>Nov 9</b>."},
   {slot:"confirm"},
   {slot:"instep"}
  ]},
 {id:"d5",title:"Visibility Rules enablement: what's in, what's out",type:"enable",status:"Draft",date:"2026-10-19",due:"publish Oct 21",owner:"you",aud:"Sales, CS and Support",
  summary:"The current plan on one page for every team: dates, what's in, what's out, the known issue and the guide for each team. It replaces everything said before Oct 14.",
  tags:[T("visibility_rules","ai",.99,"Feature named in title."),T("page_rules","ai",.95,"Explains page rules."),T("headless","ai",.92,"<q>Headless storefronts … not in v1</q>"),T("scheduled_availability","ai",.9,"<q>Scheduled availability … Q1 2027</q>"),T("early_access","ai",.88,"Early-access dates and cohort."),T("proactive_campaigns","ai",.8,"<q>Campaigns keep their own page targeting</q>")],
  body:[
   {note:"Updated Oct 19, 2026 from Noor's scope change of Oct 14. If an older doc, a Slack message or the Linear roadmap says something different, this page wins."},
   {h:"The plan"},
   {table:{head:["When","What happens","Who gets it"],rows:[["<b>Nov 9, 2026</b>","Early access: page rules","25 invited merchants on Shopify theme stores with the standard install. Priority to accounts that asked."],["<b>Jan 11, 2027</b>","General availability: page rules","Everyone on the standard install path. Coverage broadens for GA (details to confirm)."],["<b>Q1 2027</b>","Scheduled availability: hide the bubble or go AI-only outside business hours","Not in early access or GA. Depends on the business-hours refactor. No date yet."],["<b>After GA</b>","Headless storefronts","To be revisited after GA. No date."]]}},
   {h:"What's in"},
   {ul:["Show or hide the chat bubble by page address, in <b>Settings → Live Chat → [instance] → Visibility</b>. No code needed.","Include and exclude rules with <code>*</code> wildcards. Exclude rules win.","Shopify theme stores with the standard (one-click) install. Stores with a pasted script: waiting on Eng."]},
   {h:"What's out"},
   {table:{head:["Not included","Status","Say"],rows:[["Headless storefronts (Hydrogen, Next.js, custom)","Not in v1. Revisit after GA","“Page rules don't support headless storefronts in this version, and we don't have a date yet.”"],["Hiding chat or going AI-only after hours","Q1 2027, not committed","“That's scheduled availability. It's planned for next year, after GA.”"],["Hiding proactive campaigns","By design","“Page rules control the chat bubble. Campaigns keep their own page targeting.”"],["Showing chat by who the customer is (logged in, VIP)","Not planned","“Rules work on the page address, not on who's visiting.”"],["A different greeting per page","Not planned","“Use a proactive campaign for a page-specific message.”"],["A preview or test mode","Not confirmed","“Save the rule, then check the page in a private window.”"]]}},
   {h:"Known issue in early access"},
   {p:"Rules are case-sensitive and ignore language or country folders, so <code>/checkout*</code> doesn't match <code>/en-ca/checkout</code>. Add <code>/*/checkout*</code> next to <code>/checkout*</code>. A fix is planned before GA."},
   {h:"Guides by team"},
   {ul:["<button class='lnk' data-nav='doc:d27'>Sales guide</button>: what you can promise, what to say instead, and prospects who won't be covered.","<button class='lnk' data-nav='doc:d28'>CS guide</button>: your accounts by coverage, early-access nominations by Oct 23, and the calls to make.","<button class='lnk' data-nav='doc:d29'>Support guide</button>: the answer by date, tagging, the macro and troubleshooting rules.","<button class='lnk' data-nav='doc:d30'>Not covered: what to tell merchants</button>: the same words for every team."]},
   {h:"Still being confirmed"},
   {slot:"confirm-short"},
   {p:"Every open question and what it blocks: <button class='lnk' data-nav='launch:confirm'>Launch → Confirm with Product</button>."},
   {h:"Questions"},
   {p:"Ask in #product-live-chat, not in DMs. The Product Specialist owns these pages and updates them the day the plan changes."}
  ]},
 {id:"d6",title:"Visibility Rules is here: choose where chat appears",type:"announce",status:"NotStarted",date:"2027-01-11",due:"planned GA",owner:"you · Marketing",aud:"Merchants",
  summary:"GA announcement for merchants. Drafting starts in December, after early-access feedback. Marketing and Noor review it on Dec 14.",
  tags:[T("visibility_rules","ai",.97,"Feature named in title."),T("page_rules","ai",.93,"Announces page rules.")],
  body:[
   {note:"Planned for Jan 11, 2027. It goes out after internal teams have the GA update on Jan 7."},
   {h:"Working outline"},
   {ul:["What's new: choose where the chat bubble appears, with page rules.","Who gets it: everyone on the standard install path. <mark>confirm</mark> GA coverage.","How to start: link to the GA help article.","What's next: scheduled availability, only if Product confirms a date."]},
   {h:"Rules for this announcement"},
   {ul:["No numbers without a source, a cohort and a sign-off.","Don't mention headless or after-hours hiding unless they ship.","No “intelligently” or “say goodbye to”: say what changed, for whom, and where the setting is."]}
  ]},
 {id:"d1",title:"Feature brief: Visibility Rules",type:"brief",status:"Published",date:"2026-09-08",owner:"Noor Haddad",aud:"Internal",
  summary:"Problem, goals, proposed solution and rollout for page rules and scheduled availability.",
  conflict:"Dates and scope superseded by the Oct 14 scope change (EA Nov 16 → Nov 9, GA Dec 7 → Jan 11, “works for every install method” no longer true).",
  tags:[T("visibility_rules","ai",.99,"Feature named in title."),T("page_rules","ai",.96,"<q>Include and exclude rules using URL path patterns</q>"),T("scheduled_availability","ai",.95,"<q>Outside hours, the merchant picks Keep visible, AI-only or Hide bubble</q>"),T("headless","ai",.82,"<q>For manual and headless installs, rules are evaluated by the loader script</q>"),T("proactive_campaigns","ai",.79,"Non-goal: hiding proactive campaigns.")],
  body:[{p:"Merchants can't control where or when the Live Chat bubble appears. 31 merchants have asked."},{h:"Goals"},{ul:["Show or hide the bubble by URL pattern without touching code.","Choose what the bubble does outside business hours.","<mark>Works for every install method.</mark>"]},{h:"Rollout"},{ul:["<mark>EA November 16 for 10 merchants.</mark>","<mark>GA December 7.</mark>"]}]},
 {id:"d2",title:"Live Chat roadmap snapshot · Q4 2026",type:"roadmap",status:"Published",date:"2026-10-06",owner:"Noor Haddad",aud:"Internal",
  summary:"Linear export: Visibility Rules, LC-1182, LC-1204, business-hours refactor, after-hours tag, SDK events, localization.",
  conflict:"Visibility Rules row still shows EA Nov 16 · GA Dec 7. Sales quoted this version on Oct 16.",
  tags:[T("visibility_rules","ai",.95,"Top row of the roadmap."),T("scheduled_availability","ai",.86,"Part of the Visibility Rules row."),T("business_hours","ai",.84,"Business-hours refactor and after-hours tag rows."),T("headless","ai",.8,"<q>Widget open/close events for headless (SDK)</q>"),T("localization","ai",.78,"<q>Localized widget UI (FR, ES, DE)</q>"),T("known_issue","ai",.83,"LC-1182 and LC-1204 rows.")],
  body:[{p:"Snapshot exported from Linear on October 6, 2026."},{ul:["<mark>Visibility Rules · Now · EA Nov 16 · GA Dec 7</mark>","Fix LC-1182 · Now · v43.8","Fix LC-1204 · Now · v43.6.1","Business-hours service refactor · Next · start Nov","After-hours tag on routed chats · Next · Q1 2027","Widget open/close events (SDK) · Later","Localized widget UI · Later"]}]},
 {id:"d7",title:"Live Chat FAQ",type:"help",status:"NeedsUpdate",date:"2026-05-11",owner:"Support",aud:"Merchants",
  summary:"Ten merchant questions on instances, page targeting, languages, CSAT, headless and Firefox.",
  conflict:"Says showing chat on certain pages is “not currently possible”. Becomes wrong for EA merchants on Nov 9.",
  tags:[T("install","ai",.86,"Instances, custom buttons, headless install questions."),T("localization","ai",.83,"<q>Is Live Chat available in other languages?</q>"),T("headless","ai",.8,"<q>Does it matter if my store is headless?</q>"),T("proactive_campaigns","ai",.88,"<q>Proactive Live Chat Campaigns let you show a message on pages you choose</q>"),T("visibility_rules","ai",.91,"<q>Can I show chat only on certain pages? No.</q> This is the problem Visibility Rules solves.","sug"),T("page_rules","ai",.88,"Same question; answer changes when page rules ship.","sug")],
  body:[{p:"<b>Can I have more than one chat instance?</b> Yes, for different websites. Only one instance can be installed per Shopify store."},{p:"<b>Can I show chat only on certain pages?</b> <mark>No. The chat bubble appears on every page where the script loads. This is not currently possible.</mark>"},{p:"<b>Can I target specific pages with a message?</b> Yes. Proactive Live Chat Campaigns let you show a message on pages you choose."},{p:"<b>Is Live Chat available in other languages?</b> Siena replies in the customer's language. The widget interface is in English."},{p:"<b>Does it matter if my store is headless?</b> You'll need to install manually. See <i>Installing Live Chat on a headless storefront</i>."}]},
 {id:"d8",title:"How to set up Siena Live Chat",type:"help",status:"NeedsUpdate",date:"2026-06-02",owner:"Support",aud:"Merchants",
  summary:"Create an instance, customize, connect the helpdesk, install. 41% helpful.",
  conflict:"Sessions section says 24 hours (Two-Way default is 1 hour since Sep 29). “What you can't customize” says the bubble can't be limited to pages.",
  tags:[T("install","ai",.97,"Step 6: install the widget."),T("two_way_sync","ai",.85,"Step 5: helpdesk sync modes."),T("session_controls","ai",.86,"<q>Sessions close automatically after 24 hours of inactivity</q>","sug"),T("page_rules","ai",.74,"<q>The chat bubble cannot be limited to specific pages.</q>","sug")],
  body:[{h:"Step 6: Install the widget"},{p:"Option A: Shopify one-click install. Option B: manual JavaScript."},{h:"Sessions"},{p:"<mark>Sessions close automatically after 24 hours of inactivity.</mark>"},{h:"What you can't customize"},{p:"A single brand colour only. … <mark>The chat bubble cannot be limited to specific pages.</mark>"}]},
 {id:"d9",title:"Installing Live Chat on a headless storefront",type:"help",status:"NeedsUpdate",date:"2026-01-20",owner:"Support",aud:"Developers",
  summary:"Loader script, CSP, client-side routing, custom launch buttons, visibility.",
  conflict:"Recommends conditionally loading the script to hide the bubble. Arden Denim (LC-48122) and Noor report the bubble stays after client-side navigation.",
  tags:[T("headless","ai",.99,"Title."),T("install","ai",.96,"Loader script and CSP."),T("page_rules","ai",.79,"<q>To hide the bubble on specific routes, conditionally render the loader script</q>","sug"),T("shopping_agent","ai",.41,"<q>Shopping Agent features use your connected Shopify store's catalogue</q>. Low confidence: one passing mention.","sug")],
  body:[{h:"2. Client-side routing"},{p:"<mark>The widget persists across client-side navigations.</mark>"},{h:"4. Visibility"},{p:"Visibility is global per device. <mark>To hide the bubble on specific routes, conditionally render the loader script on those routes.</mark>"}]},
 {id:"d10",title:"Introducing Session Controls",type:"announce",status:"Published",date:"2026-09-29",owner:"Product team",aud:"Merchants",
  summary:"Announcement for v43.4.0. 29% helpful. Support asked agents to stop linking it.",
  conflict:"Doesn't say the Two-Way default dropped from 24 hours to 1 hour, or that agent replies stop reaching the chat after expiry.",
  tags:[T("session_controls","ai",.99,"Title."),T("two_way_sync","ai",.62,"Implied by “smarter session timing”. Not stated.","sug")],
  body:[{p:"With Session Controls, abandoned chats close themselves."},{ul:["<mark>Smarter session timing. Sessions now wrap up faster.</mark>","Automatic abandoned-chat closure.","Full control. Customize your session length."]},{p:"<mark>Early-access merchants saw up to 38% fewer open Live Chat tickets.</mark>"}]},
 {id:"d11",title:"v43.4.0 · Session Controls (GA)",type:"changelog",status:"Published",date:"2026-09-29",owner:"Eng",aud:"Internal",
  summary:"Configurable session length, new 1-hour Two-Way default, abandoned-chat auto-close.",
  tags:[T("session_controls","ai",.99,"Release name."),T("two_way_sync","ai",.94,"<q>For instances using Two-Way Sync, the default session length is now 1 hour</q>")],
  body:[{ul:["Session length configurable: Settings → Live Chat → [instance] → Sessions (30 min to 7 days).","Two-Way default now 1 hour (was 24). Existing instances migrated. Merchants not notified.","Agent replies after expiry are not delivered to the chat window.","A returning customer after expiry creates a new ticket."]}]},
 {id:"d14",title:"v43.6.1 · Fix LC-1204 auto-close on routed One-Way tickets",type:"changelog",status:"Published",date:"2026-10-13",owner:"Eng",aud:"Internal",
  summary:"Routed One-Way tickets were auto-closed between Sep 29 and Oct 13.",
  tags:[T("session_controls","ai",.95,"Regression from Session Controls."),T("known_issue","ai",.97,"Bug fix LC-1204.")],
  body:[{p:"Affected tickets carry the note “Closed automatically: customer did not respond before the chat session expired.” Merchants can search for it to reopen tickets."}]},
 {id:"d12",title:"Known issue LC-1182: outside-hours message repeats",type:"known",status:"Published",date:"2026-09-15",owner:"Support",aud:"Internal",
  summary:"After an outside-hours route, every new customer message re-sends the outside-hours message. Fix in v43.8.",
  tags:[T("business_hours","ai",.97,"Outside-business-hours message."),T("known_issue","ai",.99,"Known issue ID.")],
  body:[{p:"Fix scheduled for v43.8 (late October). Check the merchant's business schedule timezone first: a schedule in UTC also causes “closed” messages during open hours."}]},
 {id:"d13",title:"Business hours and handoff messages in Live Chat",type:"help",status:"Published",date:"2026-04-14",owner:"Support",aud:"Merchants",
  summary:"Business schedule, handoff messages, One-Way fallback outside hours, routing tags.",
  tags:[T("business_hours","ai",.99,"Title."),T("two_way_sync","ai",.88,"Two-Way behaviour during hours."),T("scheduled_availability","ai",.66,"Will need a section on bubble behaviour outside hours when scheduling ships (Q1 2027).","sug")],
  body:[{p:"New organizations start with a default schedule of Monday to Friday, 9:00 to 17:00, in <mark>UTC</mark>."}]},
 {id:"d15",title:"Why Live Chat tickets appear as email in Zendesk and Gorgias",type:"help",status:"NeedsUpdate",date:"2026-08-18",owner:"Support",aud:"Merchants and helpdesk admins",
  summary:"Why API-created chat tickets show as email, and how to find them with the handoff tag. Rated 88% helpful.",
  conflict:"Zendesk and Gorgias steps are wrong, and the tag only marks routed chats. Rated 88% helpful, so merchants think the problem is solved.",
  tags:[T("helpdesk_reporting","ai",.97,"Views, routing and reports by tag."),T("two_way_sync","ai",.71,"<q>Two-Way Sync still works</q>")],
  body:[{h:"The short answer"},{p:"Siena creates Live Chat tickets through your helpdesk's API. Zendesk and Gorgias label API-created tickets as email (or API), not chat."},{h:"How to find them"},{ul:["<b>Build a view.</b> Zendesk: <mark>Admin Center → Workspaces → Views → Add view</mark>, condition <mark>Tags contains at least one of</mark> siena-live-chat-handoff. Gorgias: <mark>Tickets → Create view, filter Tags is</mark> siena-live-chat-handoff.","<b>Route.</b> Create a trigger or rule that sends tagged tickets to <mark>your chat queue</mark>.","<b>Report.</b> Filter reports by the same tag."]},{h:"Kustomer"},{p:"On Kustomer, Siena can create these tickets on the Chat channel. Ask your Siena contact to enable it."},{h:"Still stuck?"},{p:"Contact support@siena.cx with a ticket link."}]},
 {id:"d16",title:"No Sync and the Siena Inbox",type:"help",status:"Draft",date:"2026-10-19",due:"needs Product answers",owner:"you",aud:"Merchants",
  summary:"New article: what happens to a No Sync handoff in and outside business hours, and what the Siena Inbox does. 26 accounts ($2.88M ARR) use No Sync.",
  tags:[T("no_sync","ai",.99,"Title."),T("business_hours","ai",.86,"In and outside business hours."),T("two_way_sync","ai",.55,"Compared with the sync modes.","sug")],
  body:[{p:"Draft outline. Every line marked <mark>confirm</mark> needs a Product answer before this ships."},{h:"What No Sync means"},{p:"Siena doesn't pass conversations to your helpdesk. Chats Siena routes to your team stay in the Siena Inbox."},{h:"When Siena routes a chat"},{ul:["During business hours: <mark>confirm</mark> what the customer is told and who on your team is notified.","Outside business hours: no ticket is created. <mark>confirm</mark> the message the customer gets and when your team sees the chat."]},{h:"Working in the Siena Inbox"},{ul:["Assignment: <mark>confirm</mark>","Statuses: <mark>confirm</mark>","SLAs and reminders: <mark>confirm</mark>","Export: <mark>confirm</mark>"]},{h:"Is No Sync right for you?"},{p:"Pick No Sync if your team works in Siena rather than a helpdesk. Moving to One-Way or Two-Way later: <mark>confirm</mark>."}]},
 {id:"d17",title:"Headless storefronts: what CX leads need to know",type:"help",status:"Draft",date:"2026-10-19",due:"Oct 30",owner:"you",aud:"CX leads",
  summary:"The plain-language half of the HC04 split: what changes on a headless store, what to ask your developers, and who at Siena helps.",
  tags:[T("headless","ai",.99,"Title."),T("install","ai",.93,"What developers install."),T("page_rules","ai",.81,"<q>Page rules don't support headless stores in v1</q>"),T("visibility_rules","ai",.74,"Explains what's not covered.")],
  body:[{p:"If your store's front end is custom-built (Hydrogen, Next.js or your own React app), Live Chat works, but a few things are different."},{h:"What's different"},{ul:["One-click install doesn't work. Your developers add one script to the site's root layout.","They allow two domains in the site's security policy: *.cloudfront.net and *.siena.cx.","Once loaded, the chat stays as shoppers move between pages. Loading it on some pages only doesn't work.","Page rules (Visibility Rules) don't support headless stores in v1.","Open and close events aren't available for analytics yet."]},{h:"What to ask your developers"},{ul:["Add the loader script to the root layout, with your app key.","Allow *.cloudfront.net and *.siena.cx in script-src, connect-src and img-src.","Want chat on some pages only? Hide the bubble in the instance settings and add a “Chat with us” button that calls SienaLaunchWidget() on those pages. Test it first."]},{h:"Who helps"},{p:"Your CSM, and the Deployment team for enterprise launches."}]},
 {id:"d18",title:"Macro: Widget not showing after install",type:"macro",status:"InReview",date:"2026-10-19",owner:"Priya Nair",aud:"Support",
  summary:"Saved reply for the most common Live Chat ticket: the instance is switched off. Drafted by Priya, in review with Dani.",
  tags:[T("install","ai",.98,"Install and the instance toggle.")],
  body:[{p:"Hi {{first_name}}, thanks for installing Live Chat! The most common reason the chat doesn't appear yet is that the instance is switched off. New instances start off."},{ul:["Go to App Store → Live Chat → {{instance_name}}.","Switch the toggle at the top of the page on.","Reload your store. The chat bubble should appear within a minute."]},{p:"Still not there? Reply with your store URL and we'll check the script and app key. One-click install adds the chat to your live theme only, not to unpublished themes."}]},
 {id:"d19",title:"Macro: Session Controls, what changed for Two-Way",type:"macro",status:"Draft",date:"2026-10-19",owner:"you",aud:"Support",
  summary:"Replaces linking the Session Controls announcement: the change, what it does to replies and tickets, and the settings path. The recommendation waits on Product.",
  tags:[T("session_controls","ai",.99,"Session length change."),T("two_way_sync","ai",.95,"Two-Way default.")],
  body:[{p:"Hi {{first_name}}, you're right, and we should have told you directly. On September 29 we changed how long Two-Way chat sessions stay open: the default went from 24 hours to 1 hour, and existing Two-Way instances were moved to it."},{h:"What that means"},{ul:["Once a session ends, replies from your helpdesk no longer reach the chat window.","A customer who comes back after it ends starts a new session and a new ticket."]},{h:"What you can do"},{ul:["Change the session length: Settings → Live Chat → {{instance_name}} → Sessions (30 minutes to 7 days).","Turn on email capture, so your team can reply by email after a session ends.","<mark>Recommended length: waiting on Product's guidance.</mark>"]}]},
 {id:"d20",title:"Macro: Visibility Rules availability",type:"macro",status:"Draft",date:"2026-10-19",owner:"you",aud:"Support",
  summary:"The decided answer to “can we hide chat on checkout?”, with dates and what isn't covered. Sets page-visibility and feature-request.",
  tags:[T("visibility_rules","ai",.98,"Feature named."),T("page_rules","ai",.97,"Hiding chat by page."),T("early_access","ai",.82,"Early access from Nov 9."),T("headless","ai",.7,"Not covered in v1.")],
  body:[{p:"Hi {{first_name}}, thanks for asking. Here's where this stands:"},{ul:["Right now, with one-click install, the chat appears on every page. You can remove one-click install and add the script to chosen templates (you'll need a developer). Proactive campaigns don't hide the bubble.","From November 9, page rules let early-access merchants on Shopify theme stores choose where chat appears.","Page rules are planned for everyone from January 11, 2027.","Headless storefronts aren't covered in this first version."]},{p:"Tags to set: page-visibility, feature-request."}]},
 {id:"d21",title:"Macro: Headless, what it means for your chat",type:"macro",status:"NotStarted",date:"2026-10-19",owner:"Wen Liu",aud:"Support and CSMs",
  summary:"Suggested from repeated DM answers: what a headless store changes, in plain language, linking the CX-lead page.",
  tags:[T("headless","ai",.99,"Headless."),T("install","ai",.9,"Install method.")],
  body:[{p:"Suggested by Doc Desk: answered about five times in DMs and in two logged questions (IQ-101, IQ-114). Draft it from the CX-lead page once that's reviewed."}]},
 {id:"d22",title:"Live Chat troubleshooting checklist",type:"playbook",status:"InReview",date:"2026-10-19",owner:"you",aud:"Support",
  summary:"Ten checks in order, timezone first, before anyone blames the product. Shown here against Fernwood's settings export.",
  tags:[T("troubleshooting","ai",.99,"Checklist."),T("business_hours","ai",.96,"Timezone and holidays first."),T("session_controls","ai",.9,"Session length."),T("install","ai",.86,"Toggle, app key, CSP."),T("known_issue","ai",.83,"Known bugs last.")],
  body:[{p:"Business schedule timezone (UTC by default); holidays; instance toggle; app key and CSP; helpdesk connection and rate limits; session length; email capture; smart delay; knowledge sources; known issues LC-1182 and LC-1204."}]},
 {id:"d23",title:"Escalation: Fernwood Kitchen Co.",type:"escalation",status:"Open",date:"2026-10-15",due:"go/no-go Oct 30",owner:"you",aud:"Internal",
  summary:"One owner and one page: Jordan's email, the merged tickets, Leah's account thread and the Oct 30 deadline, with causes and next steps.",
  tags:[T("troubleshooting","ai",.93,"Diagnosis."),T("business_hours","ai",.95,"Closed during open hours."),T("two_way_sync","ai",.9,"Siena taking tickets back."),T("session_controls","ai",.88,"Reply never delivered."),T("known_issue","ai",.7,"LC-1182.")],
  body:[{p:"Closed during open hours: schedule timezone UTC, and LC-1182 repeats the message. Siena taking tickets back: product behaviour since v42.97.0, plus a 0.5-second smart delay. Wrong return window: imported Gorgias macros say 30 days, the Shopify page says 60. Reply never delivered: 60-minute session from the migration, email capture off."}]},
 {id:"d24",title:"Ticket and CRM data definitions",type:"data",status:"Draft",date:"2026-10-19",owner:"you",aud:"Internal",
  summary:"What each ticket field means and what the export must include: first-response clock, statuses, tags, CSAT and timestamps.",
  tags:[T("data_quality","ai",.99,"Definitions."),T("helpdesk_reporting","ai",.81,"Tags, CSAT and timestamps decide what helpdesk reports can show."),T("troubleshooting","ai",.62,"<q>Full thread, all tags, all channels, including emailed escalations</q>","sug")],
  body:[{p:"First response time: business minutes, per channel. Status: resolution codes on Solved. Tags: required through macros. CSAT: survey responses only. Timestamps: created, first reply, solved and updated, in UTC. Export: full thread, all tags, all channels."}]},
 {id:"d25",title:"What changed in Live Chat",type:"announce",status:"Draft",date:"2026-10-19",due:"publish with EA",owner:"you",aud:"Merchants",
  summary:"A merchant-facing log of every default change, migration and regression, with a date to mark in reports.",
  tags:[T("session_controls","ai",.92,"v43.4.0 default change."),T("known_issue","ai",.86,"LC-1204 and LC-1182."),T("two_way_sync","ai",.75,"Siena keeps working routed tickets.")],
  body:[{p:"Oct 13: LC-1204 fixed. Sep 29: Two-Way sessions changed from 24 hours to 1 hour, existing instances moved; abandoned AI-only chats now close automatically. Sep 15: LC-1182 known issue. Sep 1: AI-written ticket subjects. Jul 20: Siena keeps working routed tickets until an agent replies. May 20: position offsets."}]},
 {id:"d26",title:"Choosing a session length",type:"help",status:"NotStarted",date:"2026-10-26",due:"waiting on Product",owner:"you",aud:"Merchants",
  summary:"One recommendation, with the trade-off spelled out. It can't be written until Product decides.",
  tags:[T("session_controls","ai",.98,"Session length."),T("two_way_sync","ai",.9,"Two-Way default.")],
  body:[{p:"Placeholder. Product owes one recommendation (decide by Oct 26). The article will explain the trade-off: shorter sessions split returning customers into new tickets and drop late replies; longer ones keep the chat open and delay auto-close."}]},
 {id:"d27",title:"Visibility Rules: Sales guide",type:"enable",status:"Draft",date:"2026-10-19",due:"publish Oct 20",owner:"you",aud:"Sales (AEs)",
  summary:"What AEs can promise, what they can't, how to talk about it and what to tell prospects who won't be covered. Replaces the Linear dates and the Oct 16 pitch.",
  tags:[T("visibility_rules","ai",.99,"Feature named in title."),T("page_rules","ai",.95,"What page rules do."),T("headless","ai",.93,"<q>Headless storefronts. Not in this version</q>"),T("scheduled_availability","ai",.9,"<q>Hiding chat after hours … Q1 2027</q>"),T("early_access","ai",.86,"<q>Early access … invite-only</q>"),T("proactive_campaigns","ai",.78,"<q>Campaigns keep their own targeting</q>")],
  body:[
   {note:"Pitched page rules since Oct 14 with the Linear dates, headless or after-hours hiding? Correct it this week. See “Fix what's already out there”."},
   {h:"The one-liner"},
   {quote:"“From November, early-access merchants on Shopify theme stores can hide chat on pages like cart and checkout with simple URL rules. It's planned for everyone in January. Headless storefronts and after-hours scheduling come later.”"},
   {h:"What you can promise"},
   {ul:["Page rules for everyone on the standard install path from January 11, 2027, the planned GA date.","Show or hide the chat bubble on the pages a merchant chooses, such as cart, checkout and account pages, without code.","Exclude rules for pages where chat should stay off, include rules for pages where it should show."]},
   {h:"What you can't promise"},
   {ul:["Early access. It's invite-only, for 25 existing merchants who asked for it. Don't offer it to prospects.","Headless storefronts. Not in this version, and there's no date.","Hiding chat after hours. That's scheduled availability, planned for Q1 2027 and not committed.","Hiding proactive campaign messages. Campaigns keep their own targeting.","Rules by customer or login state."]},
   {h:"Say this, not that"},
   {table:{head:["Don't say","Say instead"],rows:[["“Ships in November.”","“It's in early access from November for invited merchants, and planned for everyone in January.”"],["“Works on any page, including your headless site.”","“It works on Shopify theme stores. Headless storefronts aren't supported in this version.”"],["“It'll automatically hide chat after hours.”","“Hiding chat after hours is planned for next year. Today, customers who write outside your hours get your outside-hours message.”"],["“You can hide anything, campaigns included.”","“Page rules control the chat bubble. Campaigns keep their own targeting.”"]]},cls:"say"},
   {h:"Ask first"},
   {ol:["Is the storefront a Shopify theme, or headless (Hydrogen, Next.js, custom)?","Which pages should chat stay off? Cart, checkout and account are the usual ones.","Do they mean “not on these pages” or “not after hours”? The second is scheduled availability.","Do they run proactive campaigns on those pages?"]},
   {h:"Prospects who won't be covered"},
   {table:{head:["Prospect","Tell them","Then"],rows:[["Headless storefront, like Larkspur Home (Next.js)","“Page rules don't support headless storefronts in this version, and we don't have a date yet.”","Bring in Deployment before promising anything. A workaround is being confirmed."],["Wants chat hidden after hours","“That's planned for next year, after GA. It isn't committed yet.”","Show how the outside-hours message works today."],["Not on Shopify","“Page rules start with Shopify theme stores. Coverage for other sites is still being confirmed.”","Adding the script only to chosen pages works today on sites without client-side routing."]]}},
   {p:"Every group, with what works today: <button class='lnk' data-nav='doc:d30'>Not covered: what to tell merchants</button>."},
   {h:"Fix what's already out there"},
   {ul:["Grant: correct the Larkspur Home pitch this week. It promised headless and after-hours hiding. Deployment or the Product Specialist can join the call.","Marcus, and anyone who reused the wording: tell us who heard it, so we can correct it.","Don't quote the Linear roadmap until Noor updates it. It still shows the dates from before Oct 14."]},
   {h:"What to send"},
   {p:"There's no public article until GA, and the early-access article is for invited merchants only. Questions go to #product-live-chat."}
  ]},
 {id:"d28",title:"Visibility Rules: CS guide",type:"enable",status:"Draft",date:"2026-10-19",due:"publish Oct 21",owner:"you",aud:"Customer Success",
  summary:"Which of your accounts are covered, how to nominate early-access candidates by Oct 23, how to set expectations, and what to tell accounts that won't be covered.",
  tags:[T("visibility_rules","ai",.99,"Feature named in title."),T("early_access","ai",.97,"<q>Nominate early-access candidates by Oct 23</q>"),T("headless","ai",.93,"Headless accounts and what to tell them."),T("install","ai",.86,"Install method decides eligibility."),T("page_rules","ai",.84,"What invited merchants can do.")],
  body:[
   {h:"What changed on Oct 14"},
   {ul:["Early access moves to <b>Nov 9</b> (was Nov 16) and grows to <b>25 merchants</b> (was 10), with priority to accounts that asked.","GA moves to <b>Jan 11, 2027</b> (was Dec 7).","Scheduled availability moves to <b>Q1 2027</b>.","Early access covers the standard install path only. Headless isn't in v1."]},
   {h:"Your accounts"},
   {table:{head:["Group","Accounts","Live Chat ARR","What to do"],rows:[["Shopify theme store, one-click install","19","$1.13M","Nominate the ones that asked. All 19 fit in the 25 places."],["Theme store, script pasted into the theme","5: Pebble Outdoors, Aster Home, Fox Studio, Northpaw Pet Co., Iris Coffee","$0.51M","Hold. Tomás is confirming they count, by Oct 23."],["Non-Shopify site","2: Pine Footwear, Juno Beauty","$0.16M","Not in early access. GA coverage to confirm."],["Headless storefront","5: Halden & Rowe, Kestrel Cycling, Arden Denim, Tallis Athletic, Solstice Swim","$1.65M","Call them before they hear it elsewhere. Don't promise a date."]]}},
   {p:"31 accounts asked, holding $3.44M of Live Chat ARR (CRM export, Oct 16). The full list with flags is in <button class='lnk' data-nav='launch:candidates'>Launch → EA candidates</button>."},
   {h:"Nominate early-access candidates by Oct 23"},
   {ol:["Send Noor the accounts that asked for page rules and run a Shopify theme store with the standard install.","Check the install method with the merchant when the CRM and the tickets disagree. Northpaw: the CRM and Leah say pasted script, LC-48141 describes a one-click install.","Don't filter on CRM status. All six “Implementing” accounts already have live chat sessions.","Flag open escalations. Fernwood is a good candidate once its settings are fixed."]},
   {h:"Setting expectations with invited accounts"},
   {ul:["Early access starts Nov 9 and is invite-only. Merchants set rules themselves in <b>Settings → Live Chat → [instance] → Visibility</b>.","Rules are case-sensitive and ignore language folders in early access. Add <code>/*/checkout*</code> next to <code>/checkout*</code>.","No preview mode is confirmed. Save a rule, then check the page in a private window.","Page rules don't hide proactive campaigns.","We check in during week one and again after BFCM."]},
   {h:"Accounts that won't be covered"},
   {table:{head:["Account","Situation","What to say"],rows:[["Halden & Rowe · $412K · headless","Asked three times. /fr-ca/ launches Nov 2. Code freeze Nov 13 – Dec 2. Runs a campaign on product pages.","“Page rules won't support your headless storefront in this version.” Deployment is checking whether a hidden bubble plus the footer “Chat with us” button can do it before the freeze. Don't promise it until Product confirms."],["Kestrel Cycling · $388K · headless","Told “November” on Oct 12 (LC-48149).","Correct it: headless isn't in v1, and there's no date."],["Arden Denim · $331K · headless","Escalated: loading the script per route doesn't work (LC-48122).","The same message, from the escalation owner."],["Tallis Athletic, Solstice Swim · headless","Asked, not told yet.","The same message. Send Solstice the CX-lead headless page when it publishes on Oct 30."],["Pebble, Aster, Fox, Northpaw, Iris · pasted script","Waiting on Eng.","“We're confirming that early access covers stores where the script was added by hand. We'll let you know by Oct 23.”"],["Pine Footwear, Juno Beauty · non-Shopify","Custom sites.","“Page rules start with Shopify theme stores.” Adding the script only to chosen pages works on sites without client-side routing."]]}},
   {p:"The same words for every team: <button class='lnk' data-nav='doc:d30'>Not covered: what to tell merchants</button>."},
   {h:"Questions"},
   {p:"Ask in #product-live-chat, or ask the Product Specialist."}
  ]},
 {id:"d29",title:"Visibility Rules: Support guide",type:"enable",status:"Draft",date:"2026-10-19",due:"publish Oct 21",owner:"you",aud:"Support",
  summary:"The answer to “can we hide chat on checkout?” by date, how to tag it, the macro to use and how to troubleshoot page rules in early access.",
  tags:[T("visibility_rules","ai",.99,"Feature named in title."),T("page_rules","ai",.99,"Troubleshooting rules."),T("locale_paths","ai",.92,"<q>/en-ca/checkout</q>"),T("proactive_campaigns","ai",.9,"<q>Don't suggest proactive campaigns</q>"),T("early_access","ai",.88,"Answer for early-access merchants."),T("headless","ai",.8,"Headless answer.")],
  body:[
   {h:"The answer, by date"},
   {table:{head:["When","Who","Answer"],rows:[["Until Nov 9","Everyone","Not with one-click install. Theme stores can remove one-click install and add the script only to chosen templates (they'll need a developer). Don't suggest proactive campaigns: they don't hide the bubble."],["From Nov 9","Early-access merchants (the 25 on the list)","Yes, in <b>Settings → Live Chat → [instance] → Visibility</b>. Send the early-access article."],["From Nov 9","Everyone else","Not yet. Planned for everyone on the standard install path from Jan 11, 2027."],["Any time","Headless storefronts","Not in this version, and no date. See Not covered."]]}},
   {h:"Use the macro, and tag it"},
   {p:"Use <button class='lnk' data-nav='doc:d20'>Macro: Visibility Rules availability</button>. It sets <code>page-visibility</code> and <code>feature-request</code>. Every page-visibility ticket needs <code>feature-request</code> so demand can be counted: none of the 9 page-visibility tickets since Sep 21 has it."},
   {h:"Before you answer"},
   {ol:["Check the storefront: theme store or headless. Headless changes the answer.","Check whether the merchant is on the early-access list (Launch → EA candidates).","Ask which pages, and why. If they mean “after hours”, that's scheduled availability, planned for Q1 2027."]},
   {h:"Troubleshooting page rules (early access)"},
   {table:{head:["What the merchant sees","Likely cause","Fix"],rows:[["Chat still shows on <code>/en-ca/checkout</code>","Rules ignore language and country folders","Add <code>/*/checkout*</code> next to <code>/checkout*</code>"],["A rule doesn't match <code>/Checkout</code>","Matching is case-sensitive","Match the URL's case, or add both"],["Chat is hidden on a page where it should show","An exclude rule matches it, and exclude rules win","Narrow the exclude rule"],["A campaign message still appears","Campaigns keep their own targeting, by design","Change the campaign's URL targeting"],["Nothing changes on a headless store","Headless isn't supported in this version","See Not covered"],["A chat in progress closed, or stayed, when a rule changed","Not confirmed yet","Escalate in #product-live-chat with the store URL and the rules"]]}},
   {p:"Known issue page: <button class='lnk' data-nav='doc:d31'>Page rules are case-sensitive and ignore locale folders</button>."},
   {h:"Tickets to revisit on Nov 9"},
   {p:"These merchants were told “not possible” or “soon”, or got a workaround that failed: Tidewater Outfitters (LC-48101), Verdant Supplements (LC-48112), Juniper Lane Kids (LC-48125), Fernwood Kitchen Co. (LC-48134) and Harbour Knitwear (LC-48144). If they're invited, tell them on the ticket. Kestrel Cycling (LC-48149) is headless: correct the “November” answer instead."},
   {h:"Don't"},
   {ul:["Suggest proactive campaigns to hide the bubble.","Say “November” or quote the Linear roadmap.","Promise dates for headless or after-hours hiding.","Answer in DMs. Answer in #cx-support, where everyone sees it."]},
   {h:"Escalate"},
   {p:"In #product-live-chat, with the store URL and the rules the merchant set."}
  ]},
 {id:"d30",title:"Not covered by Visibility Rules v1: what to tell merchants",type:"enable",status:"Draft",date:"2026-10-19",due:"publish Oct 22",owner:"you",aud:"Sales, CS and Support",
  summary:"Every group that won't get page rules in early access or at GA: why, what to say, what works today and what not to promise. The same words for every team.",
  tags:[T("visibility_rules","ai",.99,"Feature named in title."),T("headless","ai",.99,"Headless storefronts."),T("install","ai",.9,"Pasted scripts and non-Shopify sites."),T("scheduled_availability","ai",.9,"After-hours hiding."),T("proactive_campaigns","ai",.86,"Campaigns keep their own targeting."),T("early_access","ai",.8,"Requesters not invited.")],
  body:[
   {note:"When Product answers an open question, this page changes first. Then the department messages go out again."},
   {table:{head:["Who","Why","Say","What works today","Don't promise"],rows:[["<b>Headless storefronts</b> (Hydrogen, Next.js, custom). 5 accounts asked, $1.65M ARR","Not scoped for v1. Revisit after GA","“Page rules don't support headless storefronts in this version, and we don't have a date yet.”","Hide the bubble in the instance settings and open chat from your own “Chat with us” button on chosen routes with <code>SienaLaunchWidget()</code>. Product is confirming this, so test it first","Loading the script on some routes only. The widget stays after client-side navigation"],["<b>Theme stores with a pasted script.</b> 5 accounts, $0.51M","Eng is confirming it counts as the standard install path","“We're confirming that early access covers stores where the script was added by hand. We'll let you know by Oct 23.”","Add the script only to the templates where chat should show","An early-access place, until Tomás confirms"],["<b>Non-Shopify sites.</b> 2 accounts, $0.16M","Early access is for Shopify theme stores. GA coverage to confirm","“Page rules start with Shopify theme stores.”","Add the script only to pages where chat should show, on sites without client-side routing","Coverage at GA"],["<b>Requesters not invited</b> to early access","25 places","“Page rules are planned for everyone on the standard install path from January 11.”","The script on chosen templates (needs a developer)","An early-access place"],["<b>Want chat hidden or AI-only after hours</b>","Scheduled availability, Q1 2027. It depends on the business-hours refactor","“That's planned for next year, after GA. It isn't committed yet.”","The outside-hours message. Check the business schedule's timezone","A date"],["<b>Want page rules to hide a campaign</b>","Campaigns keep their own targeting, by design","“Page rules control the chat bubble. Campaign messages follow their own targeting.”","Edit the campaign's URL targeting","That campaigns will follow page rules"],["<b>Want rules by customer</b> (logged in, VIP)","Rules match the page address only","“Rules work on the page, not on who's visiting.”","Exclude account pages by address, for example <code>/account*</code>","Login-based rules"]]},cls:"wide"},
   {h:"Waiting on Product"},
   {ul:["Pasted scripts: do they count as the standard install path? Tomás, by Oct 23.","Headless: what can CSMs tell the five accounts, and is the hidden-bubble pattern supported? Noor, by Oct 23."]},
   {p:"Every open question and what it blocks: <button class='lnk' data-nav='launch:confirm'>Launch → Confirm with Product</button>."},
   {h:"Who tells whom"},
   {ul:["Sales: prospects, with the <button class='lnk' data-nav='doc:d27'>Sales guide</button>.","CSMs: the 12 requesting accounts that won't be covered, before Nov 9, with the <button class='lnk' data-nav='doc:d28'>CS guide</button>.","Support: on tickets, with the macro and the <button class='lnk' data-nav='doc:d29'>Support guide</button>."]}
  ]},
 {id:"d31",title:"Known issue: page rules are case-sensitive and ignore locale folders",type:"known",status:"Draft",date:"2026-10-19",due:"publish Nov 9",owner:"you",aud:"Support",
  summary:"In the early-access build, /checkout* doesn't match /en-ca/checkout or /Checkout. Workaround: add /*/checkout*. Fix planned before GA.",
  tags:[T("page_rules","ai",.99,"Matching rules."),T("locale_paths","ai",.99,"<q>/en-ca/checkout</q>"),T("known_issue","ai",.97,"Known issue."),T("early_access","ai",.9,"Early-access build.")],
  body:[
   {h:"What happens"},
   {p:"Path matching in the early-access build is case-sensitive and doesn't account for locale prefixes. A rule excluding <code>/checkout*</code> doesn't match <code>/en-ca/checkout</code> or <code>/Checkout</code>."},
   {h:"Workaround"},
   {table:{head:["To hide chat on","Add these rules"],rows:[["Checkout, in every locale","<code>/checkout*</code> and <code>/*/checkout*</code>"],["Cart, in every locale","<code>/cart</code> and <code>/*/cart</code>"],["Account pages, in every locale","<code>/account*</code> and <code>/*/account*</code>"],["A page with capitals in its address","The exact case, or one rule per spelling"]]}},
   {h:"Fix"},
   {p:"Planned before GA (Jan 11, 2027). The release date isn't confirmed yet. This page changes when it is."},
   {h:"Where it's covered"},
   {ul:["The early-access article, under Known issues.","The Support guide's troubleshooting table.","The early-access invitation email."]}
  ]},
 {id:"d32",title:"Early-access invitation: choose where Live Chat appears",type:"announce",status:"Draft",date:"2026-10-19",due:"send Nov 9",owner:"you · sent by CSMs",aud:"Early-access merchants",
  summary:"The email CSMs send the 25 invited merchants on Nov 9: what's included, how to turn it on, what to know and how to give feedback.",
  tags:[T("early_access","ai",.99,"Invitation."),T("page_rules","ai",.96,"How to add a rule."),T("visibility_rules","ai",.95,"Feature."),T("locale_paths","ai",.85,"<q>/en-ca/</q>"),T("proactive_campaigns","ai",.8,"<q>not proactive campaign messages</q>")],
  body:[
   {p:"<b>Subject:</b> You're invited: choose where Live Chat appears"},
   {p:"Hi {{first_name}},"},
   {p:"You asked to control where the chat bubble appears on your store, so we'd like you in early access. From today you can hide or show chat on the pages you choose, such as cart, checkout and account pages."},
   {h:"Turn it on"},
   {ol:["Go to <b>Settings → Live Chat → {{instance_name}} → Visibility</b>.","Add an exclude rule, for example <code>/checkout*</code>.","Save, then check the page in a private window."]},
   {h:"Good to know"},
   {ul:["Rules are case-sensitive and don't include language or country folders yet. If your store uses <code>/en-ca/</code>, add <code>/*/checkout*</code> next to <code>/checkout*</code>.","Page rules hide the chat bubble, not proactive campaign messages. Campaigns keep their own targeting.","Everyone on the standard install path gets page rules from January 11, 2027."]},
   {h:"Tell us how it goes"},
   {p:"We'll check in during your first week and again after Black Friday. Reply to this email any time."},
   {p:"Full guide: Show or hide Live Chat on chosen pages (early access)."},
   {p:"{{csm_name}}, Siena"}
  ]},
 {id:"d33",title:"Show or hide Live Chat on chosen pages",type:"help",status:"NotStarted",date:"2026-12-07",due:"publish Jan 11",owner:"you",aud:"All merchants",
  summary:"The GA version of the early-access article, for everyone on the standard install path. Drafting starts in December, after early-access feedback.",
  tags:[T("visibility_rules","ai",.97,"Feature named in title."),T("page_rules","ai",.97,"Page rules.")],
  body:[
   {note:"Planned. Drafting starts from the early-access article once feedback is in. Noor, Tomás and Dani review it in the GA comms review on Dec 14."},
   {h:"What changes from the early-access article"},
   {ul:["Remove “early access” and the invitation step.","Update the eligibility table with GA coverage. <mark>confirm</mark> which install methods GA adds.","Remove the case and locale known issue if the fix ships before GA.","Add preview mode if Product ships one.","Add the questions early-access merchants and tickets raised.","Link it from the FAQ and the setup article, replacing the early-access link."]}
  ]},
 {id:"d34",title:"Early-access feedback: check-ins and survey",type:"playbook",status:"Draft",date:"2026-10-19",due:"live Nov 9",owner:"you",aud:"Internal",
  summary:"How we hear from the 25 early-access merchants: two check-ins, five survey questions and what we measure before GA.",
  tags:[T("early_access","ai",.98,"Early-access cohort."),T("visibility_rules","ai",.9,"Feature."),T("page_rules","ai",.82,"Questions about rules.")],
  body:[
   {h:"Check-ins"},
   {table:{head:["When","Who","What"],rows:[["Week 1 · Nov 17","CSM","Are rules set up and doing what the merchant expected? Is there a page where chat still shows?"],["After BFCM · Dec 3","CSM and Product Specialist","The five survey questions below, plus anything the GA article should answer."]]}},
   {h:"Survey"},
   {ol:["Which pages did you hide or show chat on?","Did any rule not behave as you expected?","Did you run into the case or language-folder issue?","Did you want to test a rule before saving it?","What would you need before recommending page rules to another merchant?"]},
   {h:"What we measure"},
   {ul:["Instances with at least one rule. The brief's goal is 50% of instances within 60 days of GA.","“Hide chat on page X” tickets. They should fall.","“Chat not appearing” tickets. They must not rise."]},
   {h:"Where the answers go"},
   {p:"Into the GA help article and the GA enablement update, both reviewed on Dec 14."}
  ]},
 {id:"d35",title:"Visibility Rules GA: enablement update",type:"enable",status:"NotStarted",date:"2026-12-14",due:"publish Jan 7",owner:"you",aud:"Sales, CS and Support",
  summary:"What changes in the Sales, CS and Support guides for GA on Jan 11, and when the department messages go out again.",
  tags:[T("visibility_rules","ai",.98,"Feature named in title."),T("page_rules","ai",.86,"GA answer.")],
  body:[
   {note:"Planned. Internal teams get the update on Jan 7, four days before merchants see the announcement."},
   {h:"What changes"},
   {ul:["Sales guide: page rules are live for everyone on the standard install path. Remove the early-access wording.","CS guide: what GA adds, and a follow-up to the accounts that still aren't covered.","Support guide and macro: the answer becomes “yes” for the standard install path.","Not covered: refresh after Product's GA coverage decision.","Re-send the department messages on Jan 7."]}
  ]}
];
const BYID=Object.fromEntries(DOCS.map(d=>[d.id,d]));

/* conditions */
const COND_DEFAULT={
  roadmap:[{id:"pm",label:"PM sign-off",sub:"Owner approves the final wording.",kind:"check"},{id:"comms",label:"Comms sent to affected departments",kind:"comms"}],
  announce:[{id:"pm",label:"PM sign-off",kind:"check"},{id:"support",label:"Support review",kind:"check"},{id:"article",label:"Help article published and linked",kind:"check"},{id:"comms",label:"Internal teams briefed before merchants",kind:"comms"},{id:"llm",label:"LLM-ready score ≥ 80",kind:"llm"}],
  help:[{id:"sme",label:"SME review (PM or Eng)",kind:"check"},{id:"verified",label:"Steps verified in the product",kind:"check"},{id:"limits",label:"Known issues and limits section present",kind:"check"},{id:"links",label:"Related articles cross-linked",kind:"check"},{id:"llm",label:"LLM-ready score ≥ 80",kind:"llm"}],
  enable:[{id:"current",label:"Matches the current roadmap version",kind:"check"},{id:"comms",label:"Audience versions generated and sent",kind:"comms"},{id:"owner",label:"Named owner for follow-up questions",kind:"check"}],
  known:[{id:"eng",label:"Eng ticket linked",kind:"check"},{id:"wa",label:"Workaround verified",kind:"check"},{id:"eta",label:"Fix version or ETA",kind:"check"},{id:"macro",label:"Support macro created",kind:"check"}],
  changelog:[{id:"eng",label:"Eng sign-off",kind:"check"},{id:"ann",label:"Merchant-facing announcement linked",kind:"check"}],
  brief:[{id:"owner",label:"PM owner",kind:"check"},{id:"rm",label:"Linked to roadmap item",kind:"check"}],
  macro:[{id:"owner",label:"Named owner",kind:"check"},{id:"review",label:"Reviewed by the Support lead",kind:"check"},{id:"source",label:"Matches the doc it's based on",kind:"check"},{id:"tags",label:"Sets the required tags",kind:"check"}],
  playbook:[{id:"owner",label:"Named owner",kind:"check"},{id:"tested",label:"Tested on a real case",sub:"Run against Fernwood's settings export.",kind:"check"},{id:"links",label:"Every step links to its doc",kind:"check"}],
  escalation:[{id:"owner",label:"One owner",kind:"check"},{id:"thread",label:"Every ticket and thread linked",kind:"check"},{id:"evidence",label:"Evidence checked: IDs, timezone, dates",kind:"check"},{id:"reply",label:"Reply sent to the merchant",kind:"check"},{id:"eng",label:"Eng ask sent with conversation IDs",kind:"check"}],
  data:[{id:"owner",label:"An owner for every field",kind:"check"},{id:"agreed",label:"Definitions agreed with Support",kind:"check"},{id:"export",label:"Export includes the new fields",kind:"check"}]
};
const COND_OVERRIDE={
  d5:[
    {id:"current",label:"Matches the Oct 14 plan",sub:"Checked against Noor's scope change.",kind:"check",on:true},
    {id:"review",label:"Reviewed by Noor Haddad",kind:"check"},
    {id:"owner",label:"Named owner for follow-up questions",kind:"check",on:true},
    {id:"links",label:"Linked from the Sales, CS and Support guides",kind:"check",on:true}
  ],
  d27:[
    {id:"current",label:"Matches the Oct 14 plan",sub:"Checked against Noor's scope change.",kind:"check",on:true},
    {id:"review",label:"Reviewed by Noor Haddad and the Sales lead",kind:"check"},
    {id:"owner",label:"Named owner for follow-up questions",kind:"check",on:true},
    {id:"links",label:"Linked from the #sales message",kind:"check"}
  ],
  d28:[
    {id:"current",label:"Matches the Oct 14 plan",kind:"check",on:true},
    {id:"review",label:"Reviewed by Leah Moreau and Noor Haddad",kind:"check"},
    {id:"owner",label:"Named owner for follow-up questions",kind:"check",on:true},
    {id:"links",label:"Linked from the CSM message",kind:"check"}
  ],
  d29:[
    {id:"current",label:"Matches the Oct 14 plan",kind:"check",on:true},
    {id:"review",label:"Reviewed by Dani Okafor",kind:"check"},
    {id:"owner",label:"Named owner for follow-up questions",kind:"check",on:true},
    {id:"links",label:"Linked from the #cx-support message and the macro",kind:"check"}
  ],
  d30:[
    {id:"current",label:"Matches the Oct 14 plan",kind:"check",on:true},
    {id:"answers",label:"Product's answers on pasted scripts and headless are in",sub:"The headless and pasted-script questions in Confirm with Product, due Oct 23.",kind:"check"},
    {id:"review",label:"Reviewed by Noor Haddad and Leah Moreau",kind:"check"},
    {id:"owner",label:"Named owner for follow-up questions",kind:"check",on:true}
  ],
  d3:[
    {id:"pm",label:"PM sign-off (Noor Haddad)",sub:"Approved in thread, Oct 14 10:12.",kind:"check",on:true},
    {id:"eng",label:"Eng confirms install coverage for EA",sub:"Open: does a manually pasted theme script count as the “standard install path”? Asked Oct 14, no reply from Tomás.",kind:"check"},
    {id:"linear",label:"Linear roadmap updated to match",sub:"#sales quoted EA Nov 16 / GA Dec 7 from Linear on Oct 16.",kind:"check"},
    {id:"supersede",label:"Older docs on this topic marked superseded",kind:"auto",act:"supersede"},
    {id:"conflicts",label:"Contradicting public articles queued for update",kind:"auto",act:"conflicts"},
    {id:"comms",label:"Comms sent to affected departments",kind:"comms"}
  ],
  d4:[
    {id:"sme",label:"PM review (Noor Haddad, due Nov 2)",kind:"check"},
    {id:"verified",label:"Steps verified in the EA build",sub:"Needs EA build access.",kind:"check"},
    {id:"limits",label:"Known issues and limits section present",sub:"Case sensitivity and locale prefixes covered.",kind:"check",on:true},
    {id:"links",label:"FAQ and setup article updated to link here",kind:"check"},
    {id:"answers",label:"Every question for Product answered",kind:"answers"},
    {id:"llm",label:"LLM-ready score ≥ 80",kind:"llm"}
  ]
};

/* comms */
const DEPT_META={
  "Sales":{ch:"#sales",tpl:"Roadmap change → Sales v3"},
  "Customer Success":{ch:"CS team email",tpl:"Roadmap change → CS v2"},
  "Support":{ch:"#cx-support + macro",tpl:"Roadmap change → Support v4"},
  "Deployment":{ch:"#deployment",tpl:"Roadmap change → Deployment v1"},
  "Marketing":{ch:"#product-marketing",tpl:"Roadmap change → Marketing v2"}
};
const TEMPLATES={
"Sales":`Subject: {{feature}}: what you can promise (updated {{changed_on}})

What changed
{{change_bullets}}

What it does
{{in_scope}}

Say this
"{{say}}"

Don't say
{{dont_say}}

Already pitched the old version? Correct it with the prospect this week, especially headless prospects. Your CSM or I can join the call.

Full guide: Doc Desk › Visibility Rules: Sales guide · Questions: {{owner}}`,
"Customer Success":`Subject: {{feature}} scope change: which of your accounts are affected

What changed
{{change_bullets}}

Your accounts
{{accounts}}

What to do
• Nominate EA candidates who asked for this ({{deadline}}). Theme-store accounts only.
• Call headless accounts before they hear it elsewhere. Don't promise a date.
• Theme stores with a pasted script: hold until Eng confirms coverage.

Known issue in EA
{{known_issue}}

Full guide, with call scripts: Doc Desk › Visibility Rules: CS guide · Questions: {{owner}}`,
"Support":`Subject: {{feature}}: new answer to "can we hide chat on checkout?"

Until {{ea}} the answer stays "not yet". Don't suggest proactive campaigns as a workaround. They don't hide the bubble.

From {{ea}}, for EA merchants
{{in_scope}}

Not covered
{{out_scope}}

Known issue
{{known_issue}}

New macro: "Visibility Rules: availability" (draft in Macros). Tag tickets page-visibility + feature-request so we can count demand.

Full guide: Doc Desk › Visibility Rules: Support guide · Questions: {{owner}}`,
"Deployment":`Subject: {{feature}}: guidance for headless and enterprise implementations

Headless is not in v1. Don't plan launches around it.

Workaround today: load the script only on chosen routes. It's unreliable with client-side navigation (the bubble stays after the first load), so test it before recommending it.

Localized storefronts (/fr-ca/, /en-ca/)
{{known_issue}}

Brief first: Halden & Rowe (code freeze Nov 13), Kestrel Cycling, Arden Denim.

Source: {{doc}} · Questions: {{owner}}`,
"Marketing":`Subject: {{feature}}: hold public messaging until GA

• No public announcement or dates before GA ({{ga}}). EA is invite-only.
• Don't say headless or after-hours scheduling is included.
• Page rules and proactive campaign targeting are different. Page rules don't hide campaigns.

The GA announcement draft lives in Doc Desk. Review opens Dec 14.

Source: {{doc}} · Questions: {{owner}}`,
"_generic":`Subject: {{title}}: ready for your review

What it covers
{{summary}}

What you need to do
Read it before {{due}} and reply in thread with corrections or questions.

Source: {{doc}} · Questions: {{owner}}`
};
const VARS={
 d3:{feature:"Visibility Rules",changed_on:"Oct 14, 2026",ea:"Nov 9",ga:"Jan 11, 2027",doc:"Doc Desk › Visibility Rules: scope and date change",owner:"Live Chat Product Specialist",deadline:"to Noor by Oct 23",
  change_bullets:"• Page rules early access moves earlier: Nov 9 (was Nov 16), 25 merchants (was 10)\n• GA moves later: Jan 11, 2027 (was Dec 7)\n• Scheduled availability (hide or AI-only after hours) moves to Q1 2027\n• Early access covers the standard install path only. Headless is not in v1",
  in_scope:"Show or hide the chat bubble by URL path (include/exclude rules, * wildcards, exclude wins) on Shopify theme stores installed with one-click install.",
  out_scope:"• Headless storefronts (Hydrogen, Next.js, custom React): not in v1\n• After-hours hiding or AI-only mode: Q1 2027\n• Rules based on logged-in customers: not planned\n• Proactive campaigns keep their own targeting",
  known_issue:"Rules are case-sensitive and ignore locale prefixes. /checkout* won't match /en-ca/checkout. Add /*/checkout* next to the base rule. Fix planned before GA.",
  say:"From November, early-access merchants on Shopify theme stores can hide chat on pages like cart and checkout with simple URL rules. It's planned for everyone in January. Headless storefronts and after-hours scheduling come later.",
  dont_say:"• \"Works on any page, including headless\"\n• \"Automatically hides chat after hours\"\n• \"Ships in November\" (it's early access for 25 merchants)",
  accounts:"31 accounts asked for this ($3.44M ARR).\n• Covered by the EA path: 19 one-click accounts ($1.13M)\n• Waiting on Eng: 5 theme stores with a pasted script ($0.51M)\n• Not covered: 2 non-Shopify sites ($0.16M), and 5 headless Enterprise accounts ($1.65M): Halden & Rowe, Kestrel Cycling, Arden Denim, Tallis Athletic, Solstice Swim"}
};
function depsFor(d){
  if(d.id==="d3") return [["Sales","visibility_rules"],["Customer Success","visibility_rules"],["Support","page_rules"],["Deployment","headless"],["Marketing","visibility_rules"]];
  const out=[],seen=new Set();
  d.tags.filter(t=>t.state==="ok").forEach(t=>(TAGS[t.t]?.depts||[]).forEach(x=>{if(!seen.has(x)&&DEPT_META[x]){seen.add(x);out.push([x,t.t])}}));
  return out.slice(0,4);
}
function fill(tpl,vars){return tpl.replace(/\{\{(\w+)\}\}/g,(m,k)=>vars[k]??m)}
function varsFor(d){return VARS[d.id]||{title:d.title,summary:d.summary,due:d.due||"Friday",doc:"Doc Desk › "+d.title,owner:"Live Chat Product Specialist"}}

/* llm-ready */
const LLM={
 d7:{base:38,checks:[["Front matter (audience, applies_to, last_verified)",0,"b"],["Every answer is current",0,"a"],["Answers stand alone without links",0,"c"],["Question-style headings",1],["Dates are absolute",1],["No conflicts with newer docs",0,"a"]],
  props:[
   {id:"a",title:"Replace the stale page-targeting answer",why:"Conflicts with the Oct 14 scope change once EA starts. Agents answer “no” to EA merchants.",pts:22,
    before:"Can I show chat only on certain pages?\nNo. The chat bubble appears on every page where the script loads. This is not currently possible.",
    after:"Can I show chat only on certain pages?\nvalid_from: 2026-11-09\n- Early access merchants on Shopify theme stores (one-click install): yes, with page rules. Settings → Live Chat → [instance] → Visibility.\n- Everyone else: not yet. GA planned Jan 11, 2027.\n- Headless storefronts: not supported in v1.\n- Page rules don't hide proactive campaigns.\nsee: help/page-rules-early-access"},
   {id:"b",title:"Add front matter",why:"Lets the agent filter by audience, install method and freshness.",pts:14,
    before:"# Live Chat FAQ",
    after:"---\ndoc_id: help/live-chat-faq\naudience: merchants\napplies_to: [shopify_one_click, manual_script, headless]\nfeatures: [instances, page_rules, proactive_campaigns, localization, csat]\nlast_verified: 2026-10-19\nsupersedes: help/live-chat-faq@2026-05-11\n---\n# Live Chat FAQ"},
   {id:"c",title:"Make the headless answer self-contained",why:"“See the headless article” gives the agent nothing to quote. Wen gets this question 5×/month from CSMs.",pts:16,
    before:"Does it matter if my store is headless?\nYou'll need to install manually. See Installing Live Chat on a headless storefront.",
    after:"Does it matter if my store is headless?\nYes, in four ways:\n1. One-click install doesn't work. Your developers add the loader script to the root layout.\n2. Page rules (Visibility Rules) don't support headless in v1.\n3. Open/close events aren't exposed.\n4. The widget stays loaded across client-side navigation.\nWhat to ask your developers: see help/headless-installation#checklist"},
   {id:"d",title:"Replace article titles with link IDs",why:"Titles change. Stable IDs let the agent cite the right source.",pts:10,
    before:"See How to launch Siena Chat with custom buttons.",
    after:"see: help/custom-launch-buttons (SienaLaunchWidget, SienaLaunchFullscreen)"}],
  qs:[["Can I hide chat on the checkout page?","Answers “no” (wrong for EA from Nov 9)",["a"]],["Does Visibility Rules work on Hydrogen?","Not covered",["a","c"]],["What do I ask my agency to do for a headless store?","Not covered",["c"]],["Is the widget available in French?","Answered",[]]],
  out:"---\ndoc_id: help/live-chat-faq\naudience: merchants\napplies_to: [shopify_one_click, manual_script, headless]\nlast_verified: 2026-10-19\n---\n# Live Chat FAQ\n\n## Can I show chat only on certain pages?\nvalid_from: 2026-11-09\n- Early access, Shopify theme stores: yes, with page rules …\n- Headless: not supported in v1.\n\n## Does it matter if my store is headless?\nYes, in four ways: …"},
 d10:{base:29,checks:[["Plain, factual wording",0,"a"],["States the actual default values",0,"a"],["Says what changes for agents",0,"b"],["Exact settings path",0,"c"],["Claims are sourced",0,"d"],["Dates are absolute",1]],
  props:[
   {id:"a",title:"State the new defaults as facts",why:"“Sessions wrap up faster” can't answer “what's the default?”. Session expiry is the top Session Controls question.",pts:24,
    before:"Smarter session timing. Sessions now wrap up faster, so conversations don't linger.",
    after:"Session length defaults (from 2026-09-29, v43.4.0)\n| Handoff mode | Default | Before |\n| Two-Way Sync | 1 hour | 24 hours |\n| One-Way Sync | 24 hours | 24 hours |\n| No Sync | 24 hours | 24 hours |\nExisting Two-Way instances were moved to 1 hour unless Siena support had set a custom value."},
   {id:"b",title:"Add “What changes for your agents”",why:"Explains lost replies and duplicate tickets: 7 tickets in 3 weeks.",pts:22,
    before:"(missing)",
    after:"## What changes for your agents\n- After a Two-Way session expires, agent replies from the helpdesk are not delivered to the chat window. Reply by email if you captured it.\n- A customer who returns after expiry starts a new session and a new ticket.\n- Routed conversations are never auto-closed."},
   {id:"c",title:"Give the exact settings path",why:"Merchants couldn't find it (LC-48135).",pts:12,
    before:"Want to fine-tune? Head to your chat instance settings.",
    after:"Change session length: Settings → Live Chat → [instance] → Sessions. Range: 30 minutes to 7 days."},
   {id:"d",title:"Source or remove the 38% claim",why:"Marketing asked to reuse it (IQ-116). The agent shouldn't repeat unsourced numbers.",pts:8,
    before:"Early-access merchants saw up to 38% fewer open Live Chat tickets.",
    after:"(removed until Product shares the source data)"}],
  qs:[["What's the default session length for Two-Way Sync?","Not covered (“faster”)",["a"]],["Why aren't my agents' replies reaching customers?","Not covered",["b"]],["Where do I change session length?","Vague",["c"]],["Why do I have two tickets for one customer?","Not covered",["b"]]],
  out:"---\ndoc_id: announce/session-controls\nrelease: v43.4.0\neffective: 2026-09-29\n---\n# Session Controls\n\n## Session length defaults\n| Two-Way | 1 hour (was 24) | …\n\n## What changes for your agents\n- Replies after expiry are not delivered …"},
 d4:{base:68,checks:[["Front matter with status: early_access",0,"a"],["Eligibility stated per install method",1],["Pattern examples with expected matches",1],["Known issues section",1],["Says what it doesn't do",1],["Open questions marked as unanswered",0,"b"]],
  props:[
   {id:"a",title:"Add front matter",why:"Marks the article as early-access only, so the agent doesn't offer page rules to merchants outside the cohort.",pts:14,
    before:"# Show or hide Live Chat on chosen pages (early access)",
    after:"---\ndoc_id: help/page-rules-early-access\nstatus: early_access\naudience: merchants_ea\nvalid_from: 2026-11-09\nreview_by: 2027-01-04\nsuperseded_by: help/page-rules (GA, 2027-01-11)\n---\n# Show or hide Live Chat on chosen pages (early access)"},
   {id:"b",title:"Mark open questions as unanswered",why:"The agent shouldn't guess what shoppers see, what happens to an open chat, or whether campaigns still fire where chat is hidden.",pts:10,
    before:"Chats in progress: what happens to an open conversation when a rule hides the bubble is still being confirmed.",
    after:"unanswered: [customer_view, open_chat_when_hidden, campaigns_on_hidden_pages, pasted_script_eligibility]\nagent_reply: \"Siena hasn't confirmed this yet. Contact support@siena.cx.\""}],
  qs:[["Will a /checkout rule hide chat on /en-ca/checkout?","Answered",[]],["Can I use page rules on my Hydrogen store?","Answered",[]],["Can every merchant use page rules now?","Partly: no status",["a"]],["Will a campaign still pop up where chat is hidden?","Guesses",["b"]]],
  out:"---\ndoc_id: help/page-rules-early-access\nstatus: early_access\nvalid_from: 2026-11-09\nunanswered: [customer_view, open_chat_when_hidden, campaigns_on_hidden_pages, pasted_script_eligibility]\n---\n# Show or hide Live Chat on chosen pages (early access)\n\n## Who can use it\n| Shopify one-click | Yes | …\n\n## How rules match pages\n| /checkout* | /checkout | not /en-ca/checkout |"},
 d3:{base:52,checks:[["Front matter",0,"b"],["Old and new values side by side",0,"a"],["Effective dates absolute",1],["Superseded facts marked",0,"b"],["Open questions flagged",1],["Self-contained (no thread context)",0,"c"]],
  props:[
   {id:"a",title:"Turn the TL;DR into a dated fact table",why:"The agent can answer “when is GA?” without mixing in the Sep 8 brief.",pts:20,
    before:"Page rules are moving earlier. EA now November 9 (was Nov 16) …",
    after:"| Field | Old (2026-09-08) | New (2026-10-14) |\n| Page rules EA | 2026-11-16 | 2026-11-09 |\n| EA cohort | 10 | 25 |\n| GA | 2026-12-07 | 2027-01-11 |\n| Scheduled availability | with GA | Q1 2027 |\n| Headless | rules on route change | not in v1 |"},
   {id:"b",title:"Link superseded docs",why:"Tells retrieval which version wins.",pts:14,
    before:"(missing)",
    after:"supersedes: [brief/visibility-rules@2026-09-08, roadmap/q4-2026@2026-10-06]"},
   {id:"c",title:"Define “standard install path”",why:"Undefined term; the agent will guess.",pts:12,
    before:"EA starts with the standard install path.",
    after:"standard install path = Shopify one-click install (script injected by Siena).\nunconfirmed: script pasted into the theme manually (Eng to confirm).\nexcluded: headless, non-Shopify."}],
  qs:[["When is Visibility Rules GA?","Ambiguous (Dec 7 vs Jan 11)",["a","b"]],["Can a merchant who pasted the script use EA?","Not covered",["c"]],["Is after-hours hiding in the November release?","Answered",[]]],
  out:"---\ndoc_id: roadmap/visibility-rules-scope-2026-10-14\nsupersedes: [brief/visibility-rules@2026-09-08]\n---\n| Field | Old | New | …"}
};
function genericLLM(d){
  return {base:55,checks:[["Front matter",0,"a"],["Dates are absolute",1],["Question-style headings",0,"b"],["No conflicts with newer docs",d.conflict?0:1,"c"]],
   props:[{id:"a",title:"Add front matter",why:"Audience, feature and freshness for filtering.",pts:15,before:"# "+d.title,after:`---\ndoc_id: ${d.type}/${d.id}\naudience: ${d.aud.toLowerCase()}\nfeatures: [${d.tags.filter(t=>t.state==="ok").map(t=>t.t).join(", ")}]\nlast_verified: 2026-10-19\n---\n# ${d.title}`},
    {id:"b",title:"Rewrite headings as questions",why:"Matches how merchants and agents phrase queries.",pts:12,before:"## Overview",after:"## What does this cover and who is it for?"}].concat(d.conflict?[{id:"c",title:"Resolve conflict with newer docs",why:d.conflict,pts:18,before:"(conflicting statement)",after:"(updated statement + valid_from date + supersedes link)"}]:[]),
   qs:[["What is "+d.title.split(":")[0]+"?","Partly",["b"]]],out:"(preview available after changes are applied)"};
}
