# Oceanalt

Websites for Australian small businesses on a monthly plan: **Care $29 · Launch $99 · Grow $199 AUD/month, $0 upfront.** Tell us what you need and we design, build, host and keep improving it. Already have a site? We rebuild it, payments included.

- Business plan and unit economics: [`docs/business/BUSINESS_PLAN.md`](docs/business/BUSINESS_PLAN.md)
- How the firm operates (pipeline, QA, KPIs, Stripe setup): [`docs/business/OPERATIONS.md`](docs/business/OPERATIONS.md)
- Agent team and design skills: [`CLAUDE.md`](CLAUDE.md)

## Run locally

Prerequisite: Node.js 20+.

```bash
npm install
cp .env.example .env   # fill in Gemini, EmailJS, Firebase and (optional) Stripe Payment Links
npm run dev            # http://localhost:3000
npm run lint && npm run build
```
