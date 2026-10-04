# Launch plan: the first 30 days

Goal: test the business properly. 200 personalised contacts in 4 weeks; 5 or more paying clients means it works (see BUSINESS_PLAN section 6).

Business details: Abdul Lathif Shaik, sole trader, ABN 65 119 854 062 (active from 3 October 2026, not registered for GST), NSW 2037.

## Week 0: setup (this week)

Founder does these; most take 10 to 20 minutes.

| # | Task | Why | Done |
|---|---|---|---|
| 1 | Register the business name "Oceanalt" on business.gov.au (about $44 for 1 year) | Required to trade as "Oceanalt" on a sole-trader ABN, and gives the .com.au a matching name | |
| 2 | Re-register oceanalt.com.au, eligibility type ABN, registrant "Abdul Lathif Shaik", add the business name once it's issued | The first attempt failed before the ABN showed on ABN Lookup; it shows now | |
| 3 | Until the domain works: change the site's contact email to one that works today | hello@oceanalt.com.au bounces until the domain exists | |
| 4 | Domain live: add it in Vercel, set up the hello@ inbox, verify it in Resend | See OPERATIONS.md, "Business details and domain" | |
| 5 | Vercel env vars: ANTHROPIC_API_KEY (with a monthly spend limit), RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_NOTIFY_EMAIL, BOOKING_URL | Turns on the 15-minute reply and the live AI demo | |
| 6 | Stripe account in the business name, ABN attached | Monthly billing for clients | |
| 7 | A free booking link (Cal.com or Google Calendar booking page) for 15-minute calls | Used in every "yes" reply | |
| 8 | Test the whole path: send an enquiry through the form, get the reply, book a call with yourself | Catch problems before a real lead does | |

Optional but sensible before the first client: public liability and professional indemnity insurance.

## Week 1: first batch

- **Where:** start close to home, in the Inner West (Glebe, Newtown, Leichhardt, Annandale, Marrickville). Close enough to walk in, which converts far better than email for cafés and shops. Second area: Western Sydney trades (Parramatta, Blacktown, Penrith).
- **Who:** businesses with no website, or only a Facebook page, and a decent Google rating. Trades, cafés, salons, physios.
- **Agents:** `researcher` finds 20 leads; `designer` and `engineer` build 10 preview sites; `qa` checks every name, phone number and suburb; `growth` writes each message from `docs/growth/OUTREACH.md`.
- **Founder:** review the 10, send them (emails from Gmail drafts, texts from your phone), walk into 3 or 4 of the local ones with the preview on your phone.

## Weeks 2 to 4: steady rhythm

| When | Who | What |
|---|---|---|
| Monday morning | `researcher`, `designer`, `engineer`, `qa`, `growth` | 40 to 50 new leads, previews built and checked, messages ready |
| Monday to Friday, 9am to 5pm | Founder | Send 10 to 15 a day; one follow-up after 4 to 5 days |
| Every weekday morning | `client-success` | Read replies, draft answers, update `docs/growth/pipeline.md` |
| When someone says yes | Founder | 15-minute call; then Stripe setup |
| After a call | `engineer` → `qa` | Finish the site and launch within 1 to 3 days |
| Friday | `ceo` | Weekly numbers: sent, replies, calls, clients, what to change |

Founder time: about 30 minutes a day, plus calls.

## Numbers we track (in pipeline.md, reviewed every Friday)

Previews sent, replies, "yes" replies, calls, paying clients, cancellations, hours spent per launch.

## Day 30 decision

- 5 or more paying clients from about 200 contacts: it works. Keep going, add a second area.
- 2 to 4: change the trade, the area or the message. Not the price.
- Under 2: stop outreach and rethink the offer with the `ceo` agent before spending more time.

## Things that would make this work better

- Preview sites with an "I want this" button and a note that it was made for them (to build).
- A text alert when a business opens its preview, so you can call while they're looking (to build; disclose it in the Privacy page).
- First clients asked for a real testimonial once they're happy. Never invent one.
