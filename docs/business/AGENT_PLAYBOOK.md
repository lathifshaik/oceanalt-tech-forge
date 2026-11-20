# Agent playbook

_Updated 20 November 2026 for the studio (BUSINESS_PLAN section 0). Every agent works to `POLICIES.md`._

Everything Oceanalt's agents handle, who handles it, and what still needs the founder. The agents live in `.claude/agents/`. Ask for one by name ("use the `growth` agent to…"). If a job isn't listed here, it goes to the `ceo` agent to decide who owns it.

## The rule that overrides everything

Agents draft, build, check and recommend. **The founder approves anything that leaves the building**: money, messages to real people, launches, prices and legal wording. No agent sends an email or SMS, charges a card, signs anyone up or publishes a price change on its own.

## Who handles what

### `ceo`: decisions
- **Handles:** `POLICIES.md` and its open decisions (platform fee band, free-website term and exit), checking the scope and price of every proposal, go/no-go on large or regulated work, risk and legal checks on claims (ACL, Spam Act, Privacy Act, AI disclosure, call recording), the monthly KPI review and the Friday weekly numbers.
- **Starts when:** a proposal is drafted; a price, term or claim changes; it's Friday or the 1st of the month; any agent is unsure who owns a job.
- **Produces:** a decision with a reason, the exact wording, and updates to `BUSINESS_PLAN.md` and `POLICIES.md`. How we price and our terms change in all four places together (see CLAUDE.md). No prices ever go on the site.
- **Founder signs off:** every price, term or offer change before it goes live.

### `researcher`: facts
- **Handles:** finding established brands to contact (the person, their role, a source for their contact details, the one thing we noticed), competitor studios, and checking any claim before it goes on the site. Always with sources.
- **Starts when:** it's Monday, we pick a new segment, or someone wants to state a fact publicly.
- **Produces:** 20 researched brands a week for `growth`, and short sourced notes.

### `growth`: leads
- **Handles:** outreach drafts to named people at established brands (email, LinkedIn) under `docs/growth/OUTREACH.md`, the two-tier follow-up policy (POLICIES section 14), teardowns with `designer`, service pages, and the Notion Sales pipeline.
- **Starts when:** it's Monday batch day, a new niche is approved, or a reply needs a follow-up drafted.
- **Produces:** 15 to 20 first messages a week, each with one specific, checked observation, ready to send.
- **Founder signs off:** sends every message personally. Agents never send.

### `marketing`: what we say
- **Handles:** positioning, the homepage and service-page copy, LinkedIn posts, voice agent call scripts, and a final word check on anything customer-facing (Aussie voice, no hype, no invented stats, samples labelled as fictional, no prices).
- **Starts when:** any customer-facing words are written or changed.
- **Produces:** exact before/after copy. Legal-sensitive lines go to `ceo` first.

### `client-success`: clients
- **Handles:** reading every enquiry the same business day; booking the 30-minute first call; drafting proposals, change requests and care agreements (POLICIES sections 3 to 7); kick-off briefs; support requests against the response times; complaints; existing small-business clients' edits against their allowance; the voice agent setup form (`CONCIERGE_SETUP.md`).
- **Starts when:** an enquiry, reply, edit request or cancellation arrives.
- **Produces:** drafted replies and proposals for the founder (proposal within 3 business days of the call), briefs and logs.
- **Founder signs off:** every reply, proposal, agreement and change request.

### `designer`, `ui-designer`, `ux-designer`: how it looks and works
- **`designer`:** client design, sample brands and outreach teardowns. Every design unique; the builder refuses one another client has.
- **`ui-designer`:** visual polish on our site and client sites: type, colour, spacing, motion, avatars and character animations (via `scripts/make-wave-strip.py`).
- **`ux-designer`:** page order, journeys, forms, mobile flow and accessibility.
- **All three:** load the design skills first, check screenshots at 390 px and 1440 px, and keep the light theme and no-emoji rules.

### `engineer`: builds and launches
- **Handles:** building client sites and apps, Stripe Connect and the platform fee, project invoices, bookings, migrations, DNS and launches, AI and voice agents (number, voice, actions, summaries, spend caps), workflow automations, data in AWS Sydney, access and breach response (POLICIES section 10), the 15-minute reply port to Cloudflare, and the tech-debt list in `OPERATIONS.md`.
- **Starts when:** a client approves a preview, a concierge form is complete, or something breaks.
- **Founder signs off:** going live, and anything that changes a client's billing.

### `qa`: nothing ships broken
- **Handles:** the QA checklist before every launch and every push to our own site: errors, broken images, mobile overflow, keyboard and accessibility, prices agreeing everywhere, links and 404s; and the concierge's 10 test calls.
- **Starts when:** before any launch or deploy, and after any big change.
- **Produces:** a pass/fail list. A fail blocks the launch.

## Founder only

- Sending any outreach, and replying to clients (agents draft).
- The 30-minute first call.
- Signing proposals and agreements; approving designs, launches, prices, terms and offers.
- Anything that touches money: Stripe account, refunds, invoices.
- Accounts and legal: ABN, ASIC business name, domain, insurance, the lawyer review of the Terms.
- Making character art for the site (agents turn it into animations).

## The week

| When | Agents | What |
|---|---|---|
| Monday | `researcher` → `designer` → `growth` → `marketing` | 20 brands researched, teardowns for the best 5, messages drafted and checked |
| Every weekday morning | `client-success` | Read every enquiry and reply, draft answers, update the pipeline |
| Mon–Fri, 9 to 5 | Founder | Send about 4 a day; one follow-up after 5 to 7 business days |
| After a first call | `client-success` → `ceo` → founder | Proposal within 3 business days |
| Once signed | `designer` → `engineer` → `qa` | Kick-off, design, build, QA, launch, by the proposal's stages |
| Friday | `ceo` | Weekly numbers: sent, replies, calls, clients, what to change |
| 1st of the month | `ceo` | KPI review against `OPERATIONS.md` |

## Promises the agents must keep true

- A person reads every enquiry the same business day. The site only promises a 15-minute AI reply once `api/start` runs on Cloudflare and passes an end-to-end test.
- How we price, terms and reply time match in the business plan, `POLICIES.md`, the site's FAQ, the Terms and `api/start.ts`. No prices on the site, ever.
- No invented stats, testimonials or scarcity. Sample businesses are labelled as samples. Never promise rankings.
- Client data stays in AWS Sydney; overseas processors are listed in writing.
- Every voice agent opens by saying it's the brand's AI agent and that the call is recorded, and never gives safety or technical advice beyond "call triple zero".
