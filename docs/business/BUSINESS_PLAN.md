# Oceanalt business plan: website subscriptions for small businesses

_Last reviewed: 2 October 2026. Owner: CEO agent + founder._

## 1. The idea in one line

Small business owners tell us what they want, and we design, build, host and keep improving their website for one monthly fee with $0 upfront. If they already have a site, we rebuild it, payments included.

## 2. Verdict

**Good business, wrong price point at $30. Right at $99–$199.**

| Question | Answer |
|---|---|
| Is there demand? | Yes. "Pay monthly websites" is an established category in AU, UK and US. AU competitors already sell exactly this at A$99–$200/mo ([A1 Local](https://www.gappsy.com/tools/a1local/) from A$99/mo with no upfront cost; [help4bis](https://help4bis.com/pricing/) A$300 first month then A$200/mo). |
| Is $30/month viable for a custom build? | **No.** At $30 you compete with Wix, Squarespace and Durable (A$20–$50/mo DIY), but you're selling human design and edits. A build costs 6–10 hours even with AI; at $30/mo payback is 15+ months, longer than most small businesses stay. |
| Is $100/month viable? | **Yes.** $99/mo is the market's entry price for done-for-you. With a 12-month minimum it's a A$1,188 contract per client, and AI-assisted builds make it profitable from month 4–5. |
| Where does $30 fit? | As **Care** ($29/mo): hosting and maintenance for sites that already exist (or that clients keep after their 12 months). Almost no labour, so the margin is high. It also catches leads you'll upsell later. |
| Biggest risk | Churn and scope creep, not demand. Both are solved by the term length, edit caps and ownership rules below. |

## 3. Offer and pricing (AUD)

| Plan | Price | Term | What's included | Who it's for |
|---|---|---|---|---|
| **Care** | $29/mo | Month to month | Hosting, SSL, backups, updates, uptime monitoring. Edits $60 each. | Already has a site they like; post-term Launch/Grow clients |
| **Launch** | $99/mo, $0 upfront | 12-month minimum | Custom site up to 5 pages, domain, forms, Google Business Profile, SEO basics, 30 min edits/mo, live in ~10 days | Cafés, tradies, coaches, clinics with no site or a bad one |
| **Grow** | $199/mo, $0 upfront | 12-month minimum | Launch + up to 12 pages, Stripe payments/deposits/shop (≤50 products), bookings, AI chat assistant, existing-site rebuild, 2 h edits/mo, monthly report | Businesses that take money or bookings online |
| One-off build | from $1,499 | 50/50 | Same as Launch, client owns it at launch | People who hate subscriptions |
| Custom | quoted | per project | Portals, internal tools, small SaaS | Rare, high-value, take selectively |

**Why these rules exist:**
- **12-month minimum** spreads the build cost. Without it, a client who cancels in month 2 is a loss.
- **First charge after design approval** (Stripe 14-day trial on the Payment Link) is the trust hook that makes $0 upfront believable.
- **You keep the site after 12 months / $1,499 buyout** kills the "hostage website" objection, which is the #1 complaint about this model online. It also caps your liability in an ACL dispute.
- **Edit caps** (30 min / 2 h) stop $99 clients from consuming $500 of labour. New features are quoted separately.
- **Payments go to the client's own Stripe account.** We never touch card data or customer funds, so no PCI scope and no trust-account issues.

## 4. Unit economics

Assumptions: builder time valued at A$60/h; AI tooling (Claude Max etc.) treated as fixed overhead; hosting on Cloudflare Pages / Vercel hobby-to-pro tiers.

| Per client per month | Care | Launch | Grow |
|---|---|---|---|
| Revenue | $29 | $99 | $199 |
| Hosting + domain + email forwarding | ~$3 | ~$4 | ~$6 |
| AI chat tokens | 0 | 0 | ~$5 |
| Edit labour (avg used, not cap) | ~$5 | ~$20 (20 min) | ~$60 (1 h) |
| Stripe fees on our invoice (~1.7% + 30c) | ~$0.80 | ~$2 | ~$3.70 |
| **Monthly contribution** | **~$20** | **~$73** | **~$124** |
| Build cost (one-time) | ~$60 (migration) | ~$480 (8 h) | ~$900 (15 h) |
| **Payback** | 3 months | **~7 months** | **~7 months** |
| 12-month contract contribution | — | ~$396 | ~$588 |

Payback at ~7 months is why the 12-month minimum is non-negotiable. Two levers shorten it:
1. **Templates.** Reuse the 18 demo templates already on the site (café, tradie, coach, retail, small biz, AI) as starting points. Target build time is 5 h for Launch and 10 h for Grow, which brings payback to ~4 months.
2. **AI-assisted build pipeline** (see `OPERATIONS.md`): intake form → brief → design-taste skill → preview in 48 h.

**Lifetime value.** Assume 12-month term, then 3%/month churn (small-business typical): expected life is about 12 + 33 = 45 months. LTV contribution is roughly $73 × 45 − $480 ≈ **$2,800 per Launch client** and $124 × 45 − $900 ≈ **$4,700 per Grow client**. That supports up to ~$500 customer acquisition cost.

**Targets**

| Milestone | Clients (mix ~60% Launch / 30% Grow / 10% Care) | MRR |
|---|---|---|
| Ramen (covers one person part-time) | 25 | ~A$3,000 |
| Full-time founder salary | 60 | ~A$7,500 |
| First hire (VA / junior for edits) | 100 | ~A$12,500 |

At around 80 active clients, edit time is roughly 40 h/month. That's when you hire.

## 5. Market and competition

| Option | Price | Weakness we exploit |
|---|---|---|
| DIY builders (Wix, Squarespace, Durable, Hostinger AI) | A$20–$60/mo | Owner has to do it themselves; looks templated; no one to call |
| Shopify | ~US$29+/mo + apps + theme | Overkill for a tradie; still DIY |
| Traditional agency | A$3k–$15k upfront + hourly edits | Upfront cost; slow; edits cost extra |
| Pay-monthly AU competitors (A1 Local, help4bis) | A$99–$200/mo | Mostly WordPress templates; little AI; "rented site" stigma |
| **Oceanalt** | A$29 / $99 / $199 | Design-first with taste skills, payments built in, AI assistant, you keep the site |

**Positioning:** "Your web department for $99 a month." The edge is speed (10 days), taste (not templated), payments and AI included at $199, and an honest exit.

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
| Chatbot API key exposure | **Open issue:** the Gemini key ships in the client bundle (see `OPERATIONS.md` → Tech debt). Move it behind a serverless function before turning on ads. |
| Founder bottleneck | Agent team plus templates; first hire at ~80–100 clients |

## 8. 90-day plan

- **Days 1–30:** Validate (section 6). Ship 5 founding sites, and time each build.
- **Days 31–60:** Turn the 3 best founding builds into case studies on the site. Templatise the build. Fix the chatbot key. Add a client intake form that writes to Firestore.
- **Days 61–90:** Pick the niche with the best close rate (probably tradies or cafés). Build a niche landing page. Start a referral offer (one month free for both sides). Target: 25 clients, ~A$3k MRR.
