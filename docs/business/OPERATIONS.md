# Oceanalt operations playbook

How the firm runs day to day. Each stage names the agent in `.claude/agents/` that owns it.

## Client pipeline

| Stage | Owner agent | Output | Time target |
|---|---|---|---|
| 1. Lead in (form, chatbot, outreach) | `growth` | Lead in Firestore `leads` + inbox email | — |
| 2. Qualify + plan fit | `client-success` | Reply within 24 h: recommended plan, what's included, 15-min call link | 24 h |
| 3. Brief | `client-success` | `clients/<slug>/BRIEF.md` from the template below | Same day as call |
| 4. Design preview | `designer` | Homepage design on a preview URL using the `design-taste-frontend` skill | 48–72 h |
| 5. Approval → first charge | `client-success` | Client approves; Stripe trial ends or is ended early | — |
| 6. Build | `engineer` | Full site on preview URL; payments via client's own Stripe; bookings if Grow | 5–7 days |
| 7. QA | `qa` | Checklist below passes; screenshots at 390 px and 1440 px | 1 day |
| 8. Launch | `engineer` | DNS cut-over, redirects, Google Business Profile, analytics | ~day 10 |
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

Starting points: the 18 demo templates in `src/App.tsx` (`CafeV1–3`, `TradieV1–3`, `CoachV1–3`, `RetailV1–3`, `SmallBizV1–3`, `AIV1–3`). Never ship a template unchanged. Each client gets their own type pairing, palette and hero.

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
- Launch: 30 min/mo. Grow: 120 min/mo. No rollover.
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

## Stripe setup (one-off)

1. Create Products: Care (A$29/mo), Launch (A$99/mo), Grow (A$199/mo).
2. Create a Payment Link for each. On Launch and Grow, add a **14-day free trial** so the first charge lands after design approval. End the trial early from the dashboard when the client approves sooner.
3. Put the three links in `.env` as `STRIPE_LINK_CARE`, `STRIPE_LINK_LAUNCH`, `STRIPE_LINK_GROW` and redeploy. With no links set, the plan buttons open the brief form.
4. Turn on the customer portal so clients can update cards and see invoices themselves.

## Tech debt (owner: `engineer`)

1. **Gemini API key is exposed in the browser bundle** (`vite.config.ts` → `process.env.GEMINI_API_KEY`). Anyone can lift it from the JS and spend on your account. Move the call into a serverless function (Firebase Function or Cloudflare Worker) before driving traffic. Until then, keep a hard budget cap on the key.
2. The chatbot uses `gemini-2.0-flash-exp`, an experimental model id that may be retired. Check it still responds, and move to a current stable model when the key moves server-side.
3. `src/App.tsx` is ~4,300 lines. Split it into `src/sections/*` and `src/demos/*` before the next big design pass.
4. Main JS bundle is ~1.1 MB. Lazy-load the demo templates.
5. `firestore.rules` allows unvalidated `create` on `leads`. Add field and size validation.
