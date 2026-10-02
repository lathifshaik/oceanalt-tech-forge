# Oceanalt

Oceanalt is run as a small firm of Claude agents plus the founder. It sells website subscriptions to Australian small businesses: **Care $29, Launch $99, Grow $199 AUD/month, $0 upfront**, plus one-off builds from $1,499.

## Source of truth
- `docs/business/BUSINESS_PLAN.md`: offer, pricing, unit economics, validation plan, risks
- `docs/business/OPERATIONS.md`: client pipeline, QA checklist, edit policy, KPIs, Stripe setup, tech debt

Pricing and terms appear in four places, and they must always agree: the BUSINESS_PLAN, `Pricing` in `src/App.tsx`, `SYSTEM_PROMPT` in `src/components/ChatBot.tsx`, and the Terms page in `src/App.tsx`. Change them together.

## The team (`.claude/agents/`)
| Agent | Owns |
|---|---|
| `ceo` | Pricing, offer, monthly KPI review, go/no-go on custom work |
| `researcher` | Market, competitor and niche validation (always sourced) |
| `growth` | Lead lists, outreach drafts, case studies, niche landing pages |
| `client-success` | Intake, briefs, edit requests, cancellations |
| `designer` | Design previews and redesigns, using the design skills |
| `engineer` | Builds, Stripe, bookings, migrations, launches, tech debt |
| `qa` | Launch sign-off against the QA checklist |

## Design skills (`.claude/skills/`)
`design-taste-frontend`, `redesign-existing-projects`, `minimalist-ui`, `high-end-visual-design`, `full-output-enforcement` (Taste Skill, MIT) · `frontend-design`, `webapp-testing` (Anthropic, Apache-2.0) · `web-design-guidelines`, `react-best-practices` (Vercel, MIT) · `design-references` (awesome-design-md, MIT).
Load the right one before doing any UI work. No invented stats, testimonials or scarcity on any site we ship.

## Dev
`npm install` · `npm run dev` (port 3000) · `npm run lint` (tsc) · `npm run build`. Copy `.env.example` to `.env`. With no Stripe links set, the plan buttons fall back to the brief form.
