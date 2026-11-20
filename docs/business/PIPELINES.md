# How Oceanalt runs, end to end

_Rewritten 20 November 2026 for the studio (BUSINESS_PLAN section 0). Policies behind every step: `POLICIES.md`._

The pipelines that turn a brand we've never met into a signed project and a long client. Owner agents are in `.claude/agents/`; the founder does anything marked **(founder)**. No prices here or on the site: every project is quoted in writing, and the platform fee rate lives only in each client's agreement.

The founder's working copy lives in Notion (the Sales pipeline database). This file is the source of truth if they disagree.

## 1. Set up once (founder)

| # | What | Why | Status |
|---|---|---|---|
| 1 | ABN | Invoices, Stripe, domains | Done (65 119 854 062) |
| 2 | Register "Oceanalt" as a business name with ASIC | Trading under the name | To do |
| 3 | Separate business bank account | Payouts and costs kept apart | To do |
| 4 | Stripe account in Oceanalt's name, with the ABN | Project invoices and care agreements | To do |
| 5 | **Stripe Connect platform** approval | The free website with payments runs on it | Apply now |
| 6 | `hello@oceanalt.com.au` mailbox, Resend for site email | Replies and the start form | Check |
| 7 | Booking link for 30-minute calls | In every reply | To do |
| 8 | Insurance: professional indemnity and public liability | Brands' procurement asks | Get quotes |
| 9 | Lawyer review: Terms, free-website agreement, care agreement, voice greeting | Before the first signing | To do |
| 10 | Proposal and agreement templates (`client-success` drafts from POLICIES sections 3 to 7) | So a proposal goes out within 3 business days | Drafting |
| 11 | Notion Sales pipeline (section 2 stages) | One place for every lead | Done; stages to update |

## 2. Sales pipeline (owner: `growth`; founder makes the calls)

Every brand is one row in the Notion **Sales pipeline**, moved through:

| Stage | Means | Next step and timing |
|---|---|---|
| **Researched** | Brand, person, role, source of contact, one thing we noticed | First message (OUTREACH.md) |
| **Contacted** | First message sent | One follow-up after 5 to 7 business days; at most one call; then stop |
| **Talking** | They replied | Offer call times the same day |
| **First call** | 30 minutes with Lathif | Notes in the row; proposal within 3 business days |
| **Proposal sent** | Written scope, price, timeline, schedule | Answer questions; offer a call with the other decision-makers |
| **Signed** | Agreement signed, deposit paid (or gateway agreement signed) | Kick-off within a week |
| **In delivery** | Section 3 | — |
| **Live** | Launched | Care agreement running; ask for permission to show the work after 4 weeks |
| **Lost** | No, not a fit, or quiet after the last touch | Reason noted; try again in 3 months only if they said "not now" |

Where work comes from, in the order to try:
1. **Introductions** from people we know in property, hospitality, health and professional firms.
2. **Researched outreach** to a named person (OUTREACH.md), 15 to 20 a week.
3. **The site:** the start form, service pages, Google Business Profile.
4. **Existing clients:** ask for one introduction once they're happy. No paid referrals until the Terms cover them.

What to say about price: "Every project is quoted in writing after a call, with a fixed scope, so you know the number before anything starts. If you take payments online, the website can be free; we take a small platform fee per payment instead, set out in the agreement."

## 3. Delivery pipeline (owners: `client-success`, `designer`, `engineer`, `qa`)

1. **Kick-off** (week 1): brief, access, content plan, dates, who approves. Domain checked or registered in the client's name.
2. **Design**: direction, then key pages, shown as we go. Two rounds of changes per stage.
3. **Build** on a private preview link. Payments in test mode; agents tested with their test calls.
4. **QA** against `OPERATIONS.md`. A fail blocks launch.
5. **Launch** once the client approves in writing. Redirects, Search Console, analytics.
6. **First month:** fixes at our cost; first care report.

Founder signs off every design before the client sees it.

## 4. Payments pipeline (owner: `client-success`; founder sets up Stripe)

**Projects:**
1. On signing: Stripe invoice for the deposit (recommended 40%), due in 14 days. Work starts when it's paid.
2. Milestones: invoice when the client approves the milestone (recommended 40% at preview, 20% at launch).
3. Running costs (domains, software, AI usage, call time) at cost, in AUD, monthly in arrears, under the cap in the proposal.

**Care agreements:** a Stripe subscription for the agreed monthly amount, customer portal on, 30 days' notice to end.

**Free website with payments (Stripe Connect):**
1. Client creates (or connects) their own Stripe account through our Connect onboarding; payouts go to their bank.
2. Our platform fee is set as an **application fee** on each charge, at the rate in their agreement. Stripe's own fee comes off as normal.
3. Each month: check gateway volume against the agreement (low-volume floor, POLICIES section 19); send the client a short statement of payments and fees, which also show in their own dashboard.
4. Log the term start and end dates in the Notion row.

**If a payment is late:** reminder at day 3 overdue, call at day 10, written notice and work paused after 30 days. Never take a live site down without the notice in the Terms.

**Tax:** not GST-registered; invoices say "No GST" and show the ABN. Register before turnover heads past A$75,000 a year. Set money aside for income tax from every payout.

## 5. Support and changes (owners: `client-success` → `engineer`)

Response times in POLICIES section 8. Every request logged in the Notion row with time spent. Inside the care allowance: done. Outside it, or anything new: a written change request first.

## 6. Money, every month (founder, with `ceo`)

On the 1st:
1. Stripe: project invoices paid and owing, care subscriptions, Connect volume and platform fees per client.
2. Costs: hosting, AI and phone usage (passed on), software, insurance.
3. Pipeline value: proposals out, likely to sign, expected start dates.
4. Update the KPI table in `OPERATIONS.md`.

## 7. Existing small-business clients

Keep running on their plans (POLICIES section 18): Stripe subscription schedules as set up, edits logged against their allowance, Care offered after their term. Don't move them to studio pricing unless they ask.

## 8. The week

| Day | What |
|---|---|
| Monday | 20 brands researched, teardowns for the best 5, messages drafted |
| Tuesday to Thursday | Send, calls, proposals, delivery |
| Friday | QA and launches; Notion rows updated; `ceo` weekly numbers |
