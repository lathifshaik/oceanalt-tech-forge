# Oceanalt

Oceanalt is run as a small firm of Claude agents plus the founder. It sells website subscriptions to Australian small businesses: **Care $29, Launch $99, Grow $149 AUD/month, $0 upfront**, plus one-off builds from $1,499.

## Source of truth
- `docs/business/BUSINESS_PLAN.md`: offer, pricing, unit economics, validation plan, risks
- `docs/business/OPERATIONS.md`: client pipeline, QA checklist, edit policy, KPIs, Stripe setup, tech debt

Pricing (including the AI add-on), delivery time, reply time and terms appear in four places, and they must always agree: the BUSINESS_PLAN, `PLANS`/`FAQ`/the AI add-on block in `src/App.tsx`, the `Terms` component in `src/App.tsx`, and the system prompt in `api/start.ts`. Change them together.

## The 15-minute reply (`api/start.ts`)
A Vercel function: the start form posts to it, Claude recommends a plan and layout as structured output, and Resend emails the reply to the enquirer and the lead to us. It falls back to the Firebase/EmailJS path if its env vars aren't set. Our USP is that Oceanalt runs on AI agents, checked by people, so keep that claim true: a person reads every enquiry the same business day.

## The AI agent demo (`api/demo.ts`)
The `#ai` section (`src/components/AiDemo.tsx`) tells one after-hours enquiry in three moments, then lets visitors pick a job (answer customers, take bookings, reply to reviews, chase quotes) and see the agent's reply and each step it took, over a photo of that business. Scenarios, facts and sample answers live in `shared/aiDemo.ts`, photos in `public/ai/`. With `ANTHROPIC_API_KEY` set, `GET /api/demo` reports live and visitors can type their own question; otherwise the sample answers play, labelled "Sample". The businesses are fictional, so keep them labelled that way. Design rules for this section came from `design-taste-frontend`: light theme only, no eyebrows, glows or decorative dots, real photos.

## Client sites (`templates/`)
Five layouts (`cafe`, `trades`, `studio`, `shop`, `pro`) × seven themes (`templates/themes/themes.json`) × two hero styles, plus a per-client accent. Also a zero-dependency builder and Oceanalt's custom icon set. One `site.json` per client is rendered to a static page, and the builder refuses a design another client already has. Publicly we call this **custom design, never reused**; don't call it "templates" in client-facing copy. `npm run templates` builds the examples into `public/work/` for the portfolio (this runs automatically before `dev` and `build`). Read `templates/README.md` before building a client site. Design references collected in Chrome live in `docs/design/references/` (how: `docs/design/REFERENCE_BOARDS.md`).

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
`npm install` · `npm run dev` (port 3000) · `npm run lint` (tsc) · `npm run build` · `npm run site:build -- <site.json>`. Copy `.env.example` to `.env`. The site is React + plain CSS tokens (`src/index.css`), with the Geist font self-hosted. Icons come from `templates/icons/icons.json` via `src/components/Icon.tsx`. Don't use another icon library.
