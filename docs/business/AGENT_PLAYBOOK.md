# Agent playbook

Everything Oceanalt's agents handle, who handles it, and what still needs the founder. The agents live in `.claude/agents/`. Ask for one by name ("use the `growth` agent to…"). If a job isn't listed here, it goes to the `ceo` agent to decide who owns it.

## The rule that overrides everything

Agents draft, build, check and recommend. **The founder approves anything that leaves the building**: money, messages to real people, launches, prices and legal wording. No agent sends an email or SMS, charges a card, signs anyone up or publishes a price change on its own.

## Who handles what

### `ceo`: decisions
- **Handles:** pricing and offer changes, go/no-go on custom work, the Founding 10 offer, minimum terms, risk and legal checks on claims (ACL, Spam Act, Privacy Act, AI disclosure, call recording), the monthly KPI review and the Friday weekly numbers.
- **Starts when:** a price, term or claim changes; a custom quote comes in; it's Friday or the 1st of the month; any agent is unsure who owns a job.
- **Produces:** a decision with a reason, the exact wording, and updates to `BUSINESS_PLAN.md`. Prices and terms change in all four places together (see CLAUDE.md).
- **Founder signs off:** every price, term or offer change before it goes live.

### `researcher`: facts
- **Handles:** niche and suburb validation, competitor pricing, finding target businesses, and checking any claim or number before it goes on the site. Always with sources.
- **Starts when:** we pick a new trade or area, or someone wants to state a fact or price publicly.
- **Produces:** a short sourced note, and lead lists for `growth`.

### `growth`: leads
- **Handles:** lead lists, preview-site outreach drafts (email, SMS, DMs) under the Spam Act rules in `docs/growth/OUTREACH.md`, follow-ups, referral offers, niche landing pages, and `docs/growth/pipeline.md`.
- **Starts when:** it's Monday batch day, a new niche is approved, or a reply needs a follow-up drafted.
- **Produces:** 40 to 50 leads a week with a preview link each, and messages ready to send.
- **Founder signs off:** sends every message personally. Agents never send.

### `marketing`: what we say
- **Handles:** positioning, the homepage story, landing-page and ad copy, the hero scenes, the concierge call script, and a final word check on anything customer-facing (Aussie voice, no hype, no invented stats, sample businesses labelled).
- **Starts when:** any customer-facing words are written or changed.
- **Produces:** exact before/after copy. Legal-sensitive lines go to `ceo` first.

### `client-success`: clients
- **Handles:** reading every enquiry the same business day; correcting the AI's suggested plan; booking the 15-minute call; writing `clients/<slug>/BRIEF.md` and `site.json`; edit requests logged against the cap in `EDITS.md`; upgrades; cancellations; the concierge setup form (`CONCIERGE_SETUP.md`) with the client.
- **Starts when:** an enquiry, reply, edit request or cancellation arrives.
- **Produces:** drafted replies for the founder, briefs and edit logs.
- **Founder signs off:** replies to clients, and anything off-plan or over the edit cap.

### `designer`, `ui-designer`, `ux-designer`: how it looks and works
- **`designer`:** client previews and redesigns. Picks layout, theme, hero and accent for each client (never reused), from the brief.
- **`ui-designer`:** visual polish on our site and client sites: type, colour, spacing, motion, avatars and character animations (via `scripts/make-wave-strip.py`).
- **`ux-designer`:** page order, journeys, forms, mobile flow and accessibility.
- **All three:** load the design skills first, check screenshots at 390 px and 1440 px, and keep the light theme and no-emoji rules.

### `engineer`: builds and launches
- **Handles:** building client sites, Stripe (Payment Links, deposits, Apple Pay, Google Pay, Afterpay), bookings, migrations from Wix, WordPress and Shopify, DNS and launches, the AI concierge setup (number, voice agent, booking, WhatsApp summaries, spend caps), the chat assistant, the 15-minute reply port to Cloudflare, and the tech-debt list in `OPERATIONS.md`.
- **Starts when:** a client approves a preview, a concierge form is complete, or something breaks.
- **Founder signs off:** going live, and anything that changes a client's billing.

### `qa`: nothing ships broken
- **Handles:** the QA checklist before every launch and every push to our own site: errors, broken images, mobile overflow, keyboard and accessibility, prices agreeing everywhere, links and 404s; and the concierge's 10 test calls.
- **Starts when:** before any launch or deploy, and after any big change.
- **Produces:** a pass/fail list. A fail blocks the launch.

## Founder only

- Sending any outreach, and replying to clients (agents draft).
- The 15-minute discovery call.
- Approving previews, launches, prices, terms and offers.
- Anything that touches money: Stripe account, refunds, invoices.
- Accounts and legal: ABN, ASIC business name, domain, insurance, the lawyer review of the Terms.
- Making character art for the site (agents turn it into animations).

## The week

| When | Agents | What |
|---|---|---|
| Monday | `researcher` → `designer` → `qa` → `growth` | 40 to 50 leads, a preview each, checked, messages drafted |
| Every weekday morning | `client-success` | Read every enquiry and reply, draft answers, update the pipeline |
| Mon–Fri, 9 to 5 | Founder | Send 10 to 15 messages a day; follow up once after 4 to 5 days |
| When someone says yes | Founder, then `client-success` | 15-minute call, then brief and `site.json` the same day |
| Next 1 to 3 days | `designer` → `engineer` → `qa` | Preview within 24 h, build, QA, launch |
| Friday | `ceo` | Weekly numbers: sent, replies, calls, clients, what to change |
| 1st of the month | `ceo` | KPI review against `OPERATIONS.md` |

## Promises the agents must keep true

- A person reads every enquiry the same business day. The site only promises a 15-minute AI reply once `api/start` runs on Cloudflare and passes an end-to-end test.
- Prices, terms, delivery time and reply time match in the business plan, the site, the Terms and `api/start.ts`.
- No invented stats, testimonials or scarcity. Sample businesses are labelled as samples. Never promise rankings.
- Client data stays in AWS Sydney; overseas processors are listed in writing.
- The concierge always says it's an AI assistant and that the call is recorded, and never gives safety or technical advice beyond "call triple zero".
