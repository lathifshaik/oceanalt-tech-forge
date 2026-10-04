# Oceanalt operations playbook

How the firm runs day to day. Each stage names the agent in `.claude/agents/` that owns it.

## Client pipeline

| Stage | Owner agent | Output | Time target |
|---|---|---|---|
| 1. Lead in (form, outreach) | `growth` | `api/start.ts` emails the enquirer a recommended plan + booking link and sends us the lead (fallback: Firestore + EmailJS) | **≤ 15 min, any time** |
| 2. Qualify + plan fit | `client-success` | A person reads every enquiry and the AI's suggestion, corrects it if needed, and confirms the call | Same business day |
| 3. Brief + content | `client-success` | `clients/<slug>/BRIEF.md` and `clients/<slug>/site.json` (copied from the closest `templates/*/example.json`); we write the copy | Day 0, same day as the call |
| 4. Preview | `designer` | Built site on a private preview URL. The designer picks the layout, theme, hero and accent for this client (the builder refuses a combination another client has), then places photos and orders sections around what customers do first | Within 24 h |
| 5. Approval → first charge | `client-success` | Client approves; Stripe trial ends or is ended early | — |
| 6. Finish | `engineer` | One round of changes; payments via the client's own Stripe; bookings if Grow | Day 1–2 |
| 7. QA | `qa` | Checklist below passes; screenshots at 390 px and 1440 px | 1 day |
| 8. Launch | `engineer` | DNS cut-over, redirects, Google Business Profile, analytics | **Day 1–3** |
| 9. Monthly edits | `client-success` → `engineer` | Edit logged with minutes used against the cap | 2 business days |
| 10. Monthly review | `ceo` | KPI table updated (below) | 1st of month |

## Brief template (`clients/<slug>/BRIEF.md`)

```
Business:            Suburb:            Plan: Care / Launch / Grow
Current site URL:    Domain registrar + login holder:
What they sell / book / take payment for:
Top 3 actions a visitor should take:
Pages:
Brand: logo? colours? photos? (if none → designer picks a direction)
Payments: Stripe account owner email (client creates it; we never own it)
Bookings: tool (Cal.com / Square / Fresha / built-in) 
Competitors they like / hate:
Launch deadline:
```

## Design standard

Every client build and every change to this marketing site uses the installed skills:

- `design-taste-frontend` for new sites (read the brief, pick a direction, run the pre-flight check)
- `redesign-existing-projects` for rebuilds of a client's existing site (audit first)
- `minimalist-ui` / `high-end-visual-design` as style variants when the brief calls for them
- `frontend-design` (Anthropic) as a second opinion on typography and aesthetic direction
- `full-output-enforcement` when generating whole pages, so nothing ships with placeholders
- `webapp-testing` for the QA pass
- `web-design-guidelines` (Vercel) for the accessibility/UX rules audit in QA
- `design-references` for a concrete starting token set (20 DESIGN.md breakdowns: Stripe, Airbnb, Notion, Wise…). Borrow the system, never the brand.
- `react-best-practices` (Vercel) when writing or reviewing React code

Starting points: five layouts (`cafe`, `trades`, `studio`, `shop`, `pro`) × seven themes × two hero styles, plus the client's own accent colour (see `templates/README.md`). We sell this as **custom design**, and it is: each client's combination is unique and enforced by the builder. See `templates/README.md` for the build command and the 1–3 day checklist. Never ship one unchanged: each client gets their own photos, words and accent colour, and sections are reordered to fit what their customers need to do first. Real photography is non-negotiable. A template without real photos looks AI-made.

## QA checklist (blocks launch)

- [ ] No horizontal scroll at 390 px; tap targets ≥ 44 px
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Every form delivers to the client's inbox (send a real test)
- [ ] Payments: a test-mode charge succeeds and appears in the **client's** Stripe dashboard
- [ ] 301 redirects from every indexed old URL (rebuilds only; pull the list from Google Search Console or `site:` search)
- [ ] Title, meta description, OG image, favicon, sitemap, robots.txt
- [ ] No console errors; no placeholder text or lorem ipsum; no stock-photo watermarks
- [ ] `web-design-guidelines` review has no unresolved accessibility findings

## Edit-time policy

- Log every edit: `clients/<slug>/EDITS.md` with date, request, minutes.
- Launch: 30 min/mo. Grow: 60 min/mo. No rollover.
- If a request will clearly exceed the remaining time, or it's a new feature or page, quote it first. Never just do it and bill afterwards.
- A client over the cap two months running should be offered an upgrade (Launch → Grow).

## Monthly KPIs (CEO review)

| KPI | Healthy | Action if not |
|---|---|---|
| New clients this month | ≥ 5 (first 90 days) | More outreach volume; test a new niche |
| MRR | rising | — |
| Logo churn (post-term) | ≤ 3%/mo | Call every churned client; fix the cause |
| Avg build hours, Launch | ≤ 6 h | Improve templates and pipeline |
| Avg edit minutes used, Launch | ≤ 25 | Tighten scope language in onboarding |
| Lead → close rate | ≥ 15% of qualified calls | Rework offer or call script |

## Business details and domain (one-off)

- **ABN:** 65 119 854 062. Shown in the site footer, Terms, Privacy and the reply email footer. Put it on every invoice too (required on tax invoices).
- **ABN Lookup (checked 4 October 2026):** Shaik, Abdul Lathif, Individual/Sole Trader, active from 3 October 2026, not registered for GST, NSW 2037. The first .com.au attempt (Namecheap, 3 October) failed before the ABN appeared; re-register now that it shows.
- **Business name:** to trade as "Oceanalt" under a sole-trader ABN, register "Oceanalt" as a business name with ASIC (business.gov.au). It also makes the .com.au name match.
- **oceanalt.com.au, once active:**
  1. Vercel: Project, Settings, Domains, add `oceanalt.com.au` and `www.oceanalt.com.au`, then add the DNS records Vercel shows at the registrar.
  2. Email: set up `hello@oceanalt.com.au` (Google Workspace, Zoho or registrar forwarding). The site and Terms already use this address.
  3. Resend: add the domain, add its DNS records (SPF, DKIM), then set `LEAD_FROM_EMAIL` to `Oceanalt <hello@oceanalt.com.au>`.
  4. Send a test enquiry through the form.

## Hosting (Cloudflare Workers)

The Oceanalt site deploys from `master` on Cloudflare: build command `npm run build`, deploy command `npx wrangler deploy`. `wrangler.jsonc` uploads `dist/` as static assets; keep it in the repo, or wrangler auto-configures the project and breaks the build. `public/_headers` keeps `/work/` noindex.

Not running on Cloudflare yet: the Vercel functions in `api/` (the 15-minute AI reply and the live AI demo). Until they're ported to the Worker, the form uses the Firebase/EmailJS fallback (its env vars must be set in the Cloudflare build settings, because Vite bakes them in at build time) and the demo plays its sample answers.

## SEO

On the site (done, in the build):
- The home page is pre-rendered to HTML at build time (`scripts/prerender.mjs`), so Google and link previews see the full page without running JavaScript.
- Title and description target "websites for Australian small businesses". One H1. Canonical URL `https://oceanalt.com.au/`.
- Structured data (JSON-LD): ProfessionalService (Sydney NSW 2037, Australia-wide, ABN, plans and prices), WebSite and FAQPage, generated from `PLANS` and `FAQ` in `src/App.tsx`, so it can't drift from the page.
- `sitemap.xml` written at build; `robots.txt` points to it.
- The sample sites under `/work/` send `X-Robots-Tag: noindex` (`vercel.json`), so Google never lists the fictional businesses.

Off the site (founder, once oceanalt.com.au is live):
1. Google Search Console: add the domain (DNS TXT record), submit `https://oceanalt.com.au/sitemap.xml`.
2. Google Business Profile: "Website designer", service-area business (hide the home address), area = Sydney plus Australia-wide. This matters more than anything on the page for local searches.
3. Bing Webmaster Tools: import from Search Console.
4. Same name, email and area on every listing: True Local, Yellow Pages, Hotfrog, LinkedIn page.
5. Ask every happy client for a Google review (never offer anything in return), and put a small "Site by Oceanalt" link in their footer if they agree.
6. One case-study page per real client once there are three, written from real numbers.

## 15-minute reply setup (one-off)

1. **Anthropic API key:** create one at console.anthropic.com and set a monthly spend limit there.
2. **Resend:** create an account, verify the `oceanalt.com.au` domain (DNS records), and create an API key.
3. **Booking link:** a Cal.com, Calendly or Google Calendar link for 15-minute calls.
4. In Vercel → Project → Settings → Environment Variables, set `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL` and `BOOKING_URL` (see `.env.example`), then redeploy.
5. Test it: send the form with your own email. You should get the reply within a minute, and the lead email as well.

Until this is set up, the form falls back to Firebase/EmailJS, and the site's "15 minutes" claim isn't true. **Don't ship the 15-minute copy to production before step 5 passes.**

## AI add-on operations

- **The site demo (`api/demo.ts`)** uses the same `ANTHROPIC_API_KEY`. Each live answer costs a few cents; it's rate-limited to 10 per visitor per hour, and the review and quote scenarios only accept their suggested prompts. Set a monthly spend limit on that key in Anthropic's console. Without the key, the demo plays labelled sample answers.

- Use the same pattern as `api/start.ts`, deployed per client: a fixed system prompt with their prices, hours and FAQs, and structured output where possible.
- Create a separate Anthropic API key (or workspace) per client, so usage can be read per client and billed at cost.
- Set each client's monthly usage cap in Anthropic's console to match what they agreed.
- Bill usage monthly in arrears, at cost, converted to AUD, alongside their plan.

## Stripe setup (one-off)

1. Create Products in Oceanalt's Stripe account: Care (A$29/mo), Launch (A$99/mo), Grow (A$149/mo).
2. Create a Payment Link for each one.
3. Send the client the link **after they approve their preview**. That's the "see it before you pay" promise. The website's plan buttons go to the start form, not to checkout.
4. Turn on the customer portal so clients can update cards, see invoices and cancel themselves. The site promises cancellation without a phone call.
5. Client sites that take payments use the **client's own** Stripe account. Help them create it on the kickoff call, because verification is the slowest part of a Grow launch.

## Tech debt (owner: `engineer`)

1. ~~Gemini API key exposed in the browser bundle.~~ Fixed: the chatbot was removed in the October 2026 rebuild. **Rotate the old key** in Google AI Studio, because it shipped in earlier deployments.
2. ~~4,400-line `App.tsx` and 1.1 MB bundle.~~ Fixed: the new site is ~520 lines, and the initial JS is 224 KB (71 KB gzipped), with Firebase loaded only on form submit.
3. `firestore.rules` allows unvalidated `create` on `leads`. Add field and size validation.
4. Unused dependencies remain in `package.json` (`@google/genai`, `lenis`, `motion`, `shadcn`, `@base-ui/react`, `express`). Remove them with `npm uninstall` and commit the lockfile.
