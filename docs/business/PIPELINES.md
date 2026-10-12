# How Oceanalt runs, end to end

The pipelines that turn a stranger into a paying client and keep them. Owner agents are in `.claude/agents/`; the founder does anything marked **(founder)**. Pricing is the founder's decision of 12 October 2026 (see `BUSINESS_PLAN.md` section 3c): Care $29/month; Launch month one just the domain at cost, then $69/month for months 2 to 6 and $99/month from month 7; Grow month one just the domain, then $149/month; 6-month minimum on Launch and Grow, then the site is theirs.

The founder's working copy of these pipelines lives in Notion ("Oceanalt: plans, pricing and pipeline", with the Sales pipeline database). This file is the source of truth if they disagree.

## 1. Set up once (founder)

| # | What | Why | Status |
|---|---|---|---|
| 1 | ABN | Invoices, Stripe, domains | Done (65 119 854 062) |
| 2 | Register "Oceanalt" as a business name with ASIC (small yearly fee) | Trading under a name that isn't yours legally needs it; matches the .com.au | To do |
| 3 | Separate bank account for the business | Stripe payouts and expenses kept apart from personal money | To do |
| 4 | Stripe account in Oceanalt's name, with the ABN | Our subscriptions and invoices. Clients' own sales go to *their* Stripe, never ours | To do |
| 5 | Stripe products and prices (section 4) | So a yes can be billed the same day | To do |
| 6 | `hello@oceanalt.com.au` mailbox, plus Resend for site email | Replies and the start form | Check |
| 7 | Cal.com (free) link for 15-minute calls | Every reply offers a time | To do |
| 8 | Google Business Profile: "Website designer", service area Sydney + Australia-wide, mobile 0431 236 999 | Local search and reviews | To do |
| 9 | Insurance: professional indemnity and public liability | Clients and venues ask; cheap at our size | Get quotes |
| 10 | Notion: Sales pipeline database (section 2) | One place to see every lead and client | Done |
| 11 | Lawyer review of the Terms (minimum term, early exit, auto-renewal) | Australian Consumer Law | Before client 10 |

## 2. Sales pipeline (owner: `growth`, founder makes the calls)

Every lead is one row in the Notion **Sales pipeline** database, moved through these stages:

| Stage | Means | Next step and timing |
|---|---|---|
| **Lead** | We know the business; no contact yet | Make a free preview of their new site (about 1 hour from the closest sample) |
| **Contacted** | Preview sent (walk-in, call, email or text) | Follow up on day 2 and day 7, then stop. Spam Act rules in `docs/growth/OUTREACH.md` |
| **Call booked** | 15-minute call in the calendar | Brief filled in on the call (`OPERATIONS.md` brief template) |
| **Preview sent** | Their real preview link, with their words and photos | Ask for changes within 2 days |
| **Approved** | They said yes to the preview | Payments pipeline, section 4 |
| **Live** | Site launched, subscription running | Ask for a Google review after 2 weeks |
| **Lost** | Said no or went quiet after day 7 | Note why; try again in 3 months only if they said "not now" |

Where leads come from, in the order to try them:
1. **Walk-ins and calls** to local businesses with no site or a bad one, with the preview on a phone. Appointment businesses first (dentists, physios, salons, barbers), then cafés and tradies.
2. **Google Business Profile** enquiries.
3. **Referrals:** ask every live client, every time. No paid referrals until the Terms cover them.
4. **Outreach email or text** (`OUTREACH.md`), one business at a time, never bought lists.

What to say on price (the trust answer): "Month one, you only pay for your domain, and only after you've seen and approved the site. Then it's $69 a month until month six, $99 after that. Six-month minimum, then the site's yours to keep." Show the preview before price comes up.

Weekly numbers to watch (put real numbers in, don't guess): leads added, previews sent, calls booked, approvals, live sites, lost and why.

## 3. Delivery pipeline (owners: `client-success`, `designer`, `engineer`, `qa`)

The 10 stages in `OPERATIONS.md` ("Client pipeline"), in short: brief on the call → preview within 24 hours (a design no other client has) → approval → one round of changes → QA at phone and desktop sizes → launch, usually 1 to 3 business days from the call. The founder signs off every design before it's sent ("designed by a person" must stay true).

## 4. Payments pipeline (owner: `client-success`; founder sets up Stripe)

**Stripe products (once):**
- Care: A$29/month.
- Launch: two prices, A$69/month and A$99/month.
- Grow: A$149/month.
- Domain: invoiced as a one-off item at what we pay the registrar (no markup).

**When a client approves their preview:**
1. Register the domain **in the client's name** and send a Stripe invoice for it at cost, due on receipt. This is the only charge in month one.
2. Create their subscription as a **Stripe subscription schedule** starting one month after approval:
   - Launch: phase 1 = A$69/month for 5 iterations (months 2 to 6), phase 2 = A$99/month ongoing.
   - Grow: A$149/month ongoing.
   - Save the card at this point (Stripe Checkout in setup mode or the hosted invoice page), so month two charges on its own.
3. Turn on the **customer portal** so they can update cards, see invoices and cancel without calling us.
4. Log the start date, the plan and the month-6 date in the Notion row.

**Every month:** Stripe charges in advance. For AI add-ons, add usage and call time **in arrears, at cost, in AUD**, as invoice items before the next charge (`OPERATIONS.md`, "AI add-on operations").

**If a payment fails:** Stripe Smart Retries and its reminder emails run for 2 weeks. Day 3, text the client. Day 14, call. Don't take a site down for non-payment unless the Terms say how and when; add that wording at the lawyer review (step 11) before relying on it.

**If they cancel:**
- Inside the 6 months: invoice the remaining months of the term (the Terms say so), then hand over the site.
- After 6 months: cancel at the end of the paid month (30 days' notice), hand over the code and domain, offer Care at $29.

**Tax:** we're not registered for GST, so invoices say "No GST" and show the ABN. Register for GST once turnover is heading past A$75,000 a year, and update prices, invoices and the site the same week. Set money aside for income tax from every payout; ask an accountant what share.

**Clients' own payments:** card payments on client sites (Grow) go to the **client's own Stripe account**. We help them set it up on the kickoff call. We never hold client money or card data.

## 5. Support and edits (owners: `client-success` → `engineer`)

- Requests by email or text to 0431 236 999; logged in the Notion row with minutes used.
- Included: 30 minutes a month on Launch, 1 hour on Grow, changes to existing pages only. New pages or features: quoted in writing first.
- Turnaround: 2 business days.

## 6. Money, every month (founder, with `ceo`)

On the 1st:
1. Stripe: revenue last month, failed payments, upcoming month-6 dates.
2. Costs: hosting, domains, AI and phone usage (already billed at cost), tools.
3. Contribution per client against `BUSINESS_PLAN.md` section 4. **Watch item:** a Launch client who leaves at month 6 costs us about $30; if more than 1 in 4 leave then, raise months 2 to 6 to $79 or the minimum to 9 months.
4. Update the KPI table in `OPERATIONS.md`.

## 7. The week

| Day | What |
|---|---|
| Monday | Pick 10 businesses; make previews for the best 5 |
| Tuesday to Thursday | Visits, calls and follow-ups; build approved sites |
| Friday | QA and launches; update every Notion row; ask live clients for reviews and referrals |
