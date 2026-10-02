# Oceanalt

Websites for Australian small businesses, done for you: **Care $29 · Launch $99 · Grow $199 AUD/month, $0 upfront, live in 1–3 business days.** Already have a site? We rebuild it, payments included.

- Business plan and unit economics: [`docs/business/BUSINESS_PLAN.md`](docs/business/BUSINESS_PLAN.md)
- How the firm operates (pipeline, QA, KPIs, Stripe setup): [`docs/business/OPERATIONS.md`](docs/business/OPERATIONS.md)
- Client site templates and builder: [`templates/README.md`](templates/README.md)
- Agent team and design skills: [`CLAUDE.md`](CLAUDE.md)

## Run locally

Prerequisite: Node.js 20+.

```bash
npm install
cp .env.example .env   # EmailJS + Firebase for the start form
npm run dev            # http://localhost:3000
npm run lint && npm run build
```
