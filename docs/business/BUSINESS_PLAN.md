# Oceanalt business plan: website subscriptions for small businesses

_Last reviewed: 2 October 2026 (second pass: 1–3 day delivery, template system, site rebuild). Owner: CEO agent + founder._

## 1. The idea in one line

Small business owners tell us what they want, and we design, build, host and keep improving their website for one monthly fee with $0 upfront, **live in 1–3 business days**. If they already have a site, we rebuild it, payments included.

## 2. Verdict

**Good business, wrong price point at $30. Right at $99–$149.**

| Question | Answer |
|---|---|
| Is there demand? | Yes. **44% of Australian small businesses still have no dedicated website** ([auDA Digital Lives 2026](https://files.auda.org.au/documents/2026-Digital-Lives-of-Australians-report.pdf)). Their top reasons are "too small" (44%), "too expensive" (30%) and "no time" (17%) ([GoDaddy AU study](https://www.godaddy.com/resources/au/stories/study-reveals-why-59-of-australian-small-businesses-dont-have-a-website)); $0 upfront and done-for-you answers the last two. "Pay monthly websites" is an established category in AU, UK and US. AU competitors already sell exactly this at A$99–$200/mo ([A1 Local](https://www.gappsy.com/tools/a1local/) from A$99/mo with no upfront cost; [help4bis](https://help4bis.com/pricing/) A$300 first month then A$200/mo). |
| Is $30/month viable for a custom build? | **No.** At $30 you compete with Wix, Squarespace and Durable (A$20–$50/mo DIY), but you're selling human design and edits. A build costs 6–10 hours even with AI; at $30/mo payback is 15+ months, longer than most small businesses stay. |
| Is $100/month viable? | **Yes.** $99/mo is the market's entry price for done-for-you. With a 12-month minimum it's a A$1,188 contract per client, and AI-assisted builds make it profitable from month 4–5. |
| Where does $30 fit? | As **Care** ($29/mo): hosting and maintenance for sites that already exist (or that clients keep after their 12 months). Almost no labour, so the margin is high. It also catches leads you'll upsell later. |
| Biggest risk | Churn and scope creep, not demand. Both are solved by the term length, edit caps and ownership rules below. |

## 3. Offer and pricing (AUD)

| Plan | Price | Term | What's included | Who it's for |
|---|---|---|---|---|
| **Care** | $29/mo | Month to month | Hosting, SSL, backups, updates, uptime monitoring. Edits $60 each. | Already has a site they like; post-term Launch/Grow clients |
| **Launch** | $99/mo, $0 upfront | 12-month minimum | Custom site up to 5 pages on a template, we write the copy, domain, forms, Google Business Profile, SEO basics, 30 min edits/mo, **live in 1–3 business days** | Cafés, tradies, coaches, clinics with no site or a bad one |
| **Grow** | $149/mo, $0 upfront | 12-month minimum | Launch + up to 12 pages, Stripe payments/deposits/small shop, bookings, gift vouchers, existing-site rebuild, 1 h edits/mo, monthly report | Businesses that take money or bookings online |
| One-off build | from $1,499 | 50/50 | Same as Launch, client owns it at launch | People who hate subscriptions |
| Custom | quoted | per project | Portals, internal tools, small SaaS | Rare, high-value, take selectively |

**Why these rules exist:**
- **12-month minimum** spreads the build cost. Without it, a client who cancels in month 2 is a loss.
- **First charge after design approval** (Stripe 14-day trial on the Payment Link) is the trust hook that makes $0 upfront believable.
- **You keep the site after 12 months / $1,499 buyout** kills the "hostage website" objection, which is the #1 complaint about this model online. It also caps your liability in an ACL dispute.
- **Edit caps** (30 min / 2 h) stop $99 clients from consuming $500 of labour. New features are quoted separately.
- **Payments go to the client's own Stripe account.** We never touch card data or customer funds, so no PCI scope and no trust-account issues.

## 3b. Delivery: why 1–3 days is a safe promise

The research is consistent: what delays web projects is **waiting on the client's content**, not the build ([Forefront](https://forefrontweb.com/why-projects-stall-and-how-to-fix-them/), [Marketeam](https://marketeam.com.au/website-design/how-long-does-a-website-take-to-build)). Local competitors already ship simple sites in about 3 business days ([Between Coffees, Melbourne](https://betweencoffees.com/quick-websites)). So the promise holds if we remove the content dependency:

1. **A design system, not a blank page.** Three layouts (café, trades, studio) cover how most small businesses get customers: walk-ins, phone calls and bookings. Seven themes and two hero styles, plus each client's own accent colour, give every client a design no other client has; the builder enforces that. We sell it as custom design because it is custom design: assembled from our own parts instead of drawn from nothing. Each site is one `site.json` file rendered to a ~25 KB static page (`templates/README.md`).
2. **We write the copy** from a 15-minute call, the client's Google Business Profile and their reviews.
3. **Photos:** the client's own, their Google Business photos, or licensed Unsplash/Pexels as a last resort.
4. **Excluded from the clock, and stated in the Terms:** Google Business Profile verification, Stripe account verification and domain transfers, because Google, Stripe and registrars control those.

### Why Grow is $149, not $199 (decided 2 October 2026)

Every site starts from one of our templates rather than a from-scratch design, so a Grow build is about 6 hours, not 10. At $199 we'd be at the top of the AU done-for-you market (A1 Local from $99, help4bis $200) for a template-based site. At $149 we're below the $200 providers while including payments and bookings. A $50 step up from Launch also makes the upgrade easy to say yes to. To keep the margin, included edit time is 1 hour a month, down from 2. A truly from-scratch design is a one-off or custom project, priced separately.

## 4. Unit economics

Assumptions: builder time valued at A$60/h; AI tooling (Claude Max etc.) treated as fixed overhead; hosting on Cloudflare Pages / Vercel hobby-to-pro tiers.

| Per client per month | Care | Launch | Grow |
|---|---|---|---|
| Revenue | $29 | $99 | $149 |
| Hosting + domain + email forwarding | ~$3 | ~$4 | ~$6 |
| Edit labour (avg used, not cap) | ~$5 | ~$20 (20 min) | ~$40 (40 min) |
| Stripe fees on our invoice (~1.7% + 30c) | ~$0.80 | ~$2 | ~$2.80 |
| **Monthly contribution** | **~$20** | **~$73** | **~$100** |
| Build cost (one-time, on templates) | ~$60 (migration) | ~$240 (4 h) | ~$360 (6 h) |
| **Payback** | 3 months | **~3–4 months** | **~3–4 months** |
| 12-month contract contribution | — | ~$636 | ~$840 |

Templates are what make the price work. Before them, a custom Launch build was about 8 hours and took 7 months to pay back. Starting from one of three templates (`templates/`), with copy written from a 15-minute call, it's about 4 hours and pays back in 3–4 months. The 12-month minimum still matters for Grow and for clients who churn early.

**Lifetime value.** Assume 12-month term, then 3%/month churn (small-business typical): expected life is about 12 + 33 = 45 months. LTV contribution is roughly $73 × 45 − $240 ≈ **$3,000 per Launch client** and $100 × 45 − $360 ≈ **$4,100 per Grow client**. That supports up to ~$500 customer acquisition cost.

**Targets**

| Milestone | Clients (mix ~60% Launch / 30% Grow / 10% Care) | MRR |
|---|---|---|
| Ramen (covers one person part-time) | 25 | ~A$2,700 |
| Full-time founder salary | 60 | ~A$6,400 |
| First hire (VA / junior for edits) | 100 | ~A$10,700 |

At around 80 active clients, edit time is roughly 40 h/month. That's when you hire.

## 5. Market and competition

| Option | Price | Weakness we exploit |
|---|---|---|
| DIY builders (Wix, Squarespace, Durable, Hostinger AI) | A$20–$60/mo | Owner has to do it themselves; looks templated; no one to call |
| Shopify | ~US$29+/mo + apps + theme | Overkill for a tradie; still DIY |
| Traditional agency | A$3k–$15k upfront + hourly edits | Upfront cost; slow; edits cost extra |
| Pay-monthly AU competitors (A1 Local, help4bis) | A$99–$200/mo | Mostly WordPress templates; little AI; "rented site" stigma |
| **Oceanalt** | A$29 / $99 / $149 | Live in 1–3 days, photo-led templates with a 3D signature detail each, payments and bookings built in, you keep the site |

**Positioning:** "Your web department for $99 a month." The edge is speed (1–3 days), design quality (real photography, one signature 3D detail per template), payments and bookings at $149, and an honest exit.

## 6. Validation plan (run before scaling anything)

The site now sells the offer. The next 30 days prove someone pays for it.

| Week | Action | Pass mark |
|---|---|---|
| 1 | Set up Stripe Payment Links (Care/Launch/Grow, 14-day trial on Launch/Grow) and add them to `.env`. Deploy. | Checkout works end to end |
| 1–2 | Build a list of 200 local businesses in 2–3 suburbs with no site, a broken site, or no online booking (Google Maps; Clay/Apollo are connected if you want to enrich) | List exists |
| 2–3 | Outreach: walk in, call, or send a 60-second Loom of their current site next to a mock-up of the new one. Offer "Founding 10": Launch at $79/mo locked for life. | ≥20 conversations |
| 3–4 | Close | **≥5 paying clients from 200 contacts** (2.5%) = validated. Under 2: change the niche or message, not the price. |

**Kill / pivot signals:** under 2 closes from 200 contacts; average edit time over 1 h for Launch clients; more than 1 in 5 clients asking to cancel before month 6.

## 7. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Churn after 12 months | Monthly report (Grow), proactive "here's what we changed" email, Care downgrade instead of cancel |
| Scope creep | Written edit caps; anything new gets a quote before work; the client-success agent logs time per client |
| "Hostage website" reputation | Free code/domain handover after 12 months, written in the Terms |
| Australian Consumer Law: auto-renewal and minimum terms | Terms state the term, renewal and exit cost in plain English; the price is shown before checkout. Get a lawyer to review the Terms before client #10. |
| GST | Register once turnover passes A$75k (≈ 65 clients). Decide then whether prices become "+GST" or inclusive. |
| Chatbot API key exposure | **Resolved:** the browser-side Gemini chatbot was removed in the site rebuild. If a chat assistant comes back, it must run server-side. |
| Founder bottleneck | Agent team plus templates; first hire at ~80–100 clients |

## 8. 90-day plan

- **Days 1–30:** Validate (section 6). Ship 5 founding sites, and time each build.
- **Days 31–60:** Turn the 3 best founding builds into case studies on the site, replacing the sample businesses in the gallery. Time every build against the 1–3 day promise. Add a fourth template only if one niche keeps not fitting.
- **Days 61–90:** Pick the niche with the best close rate (probably tradies or cafés). Build a niche landing page. Start a referral offer (one month free for both sides). Target: 25 clients, ~A$3k MRR.
