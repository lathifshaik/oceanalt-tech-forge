# Oceanalt

Oceanalt is run as a small firm of Claude agents plus the founder. It sells three things to Australian small businesses, with equal weight: **digital presence** (website, Google profile, SEO; Care $29, Launch $99, Grow $149 AUD/month, $0 upfront, or one-off from $1,499), **web apps and software** (quoted per project), and **AI agents** ($39/month assistant + usage at cost, custom agents quoted). Tagline: "More customers. Less admin."

What we sell, in the owner's words: **get found** (website, Google Business Profile, SEO, showing up in AI search), **when you can't pick up** (AI concierge $149/month with a local number + call time at cost; website chat assistant $39/month), **less admin** (we make their pipeline efficient, from first enquiry to paid invoice: web apps and workflow automation, quoted per project). Client sites and apps are hosted on Cloudflare and AWS, and client data stays in Australia (AWS Sydney); keep that true (see OPERATIONS.md).

Every service on the site should feel like a demo: `src/components/Story.tsx` has the hero phone, the call and the checkout; `src/components/Demos.tsx` has the pipeline demo and the logo wall (brand SVGs in `public/logos/`, logos only, names in alt text; only tools we actually use or connect to, never WordPress, Wix or Squarespace); the story has the animated concierge call and checkout. Demos use sample businesses and say so.

**We sell a story, to Australians.** Think like a marketer: lead with the moment the owner recognises ("you're up a ladder and the phone rings"), then what changes, then the product. Write the way Aussie small-business owners talk: plain, direct, a bit dry, Australian spelling, no hype or American sales talk, local words where they fit naturally (tradie, sparky, arvo, on the tools) but never forced. Aussies trust straight answers: show prices, say what's not included, never promise rankings or invent stats.

## Source of truth
- `docs/business/BUSINESS_PLAN.md`: offer, pricing, unit economics, validation plan, risks
- `docs/business/OPERATIONS.md`: client pipeline, QA checklist, edit policy, KPIs, Stripe setup, tech debt
- `docs/business/LAUNCH_PLAN.md`: the first 30 days, setup checklist and weekly rhythm
- `docs/growth/OUTREACH.md`: outreach templates and Spam Act rules
- `docs/business/AGENT_PLAYBOOK.md`: what every agent handles, the weekly rhythm, and what needs the founder
- `docs/business/CONCIERGE_SETUP.md`: the form a client fills in so the AI concierge can answer their phone, plus the 10 test calls

Pricing (including the AI add-on), delivery time, reply time and terms appear in four places, and they must always agree: the BUSINESS_PLAN, `PLANS`/`FAQ`/the AI add-on block in `src/App.tsx`, the `Terms` component in `src/App.tsx`, and the system prompt in `api/start.ts`. Change them together.

## The 15-minute reply (`api/start.ts`)
A Vercel function: the start form posts to it, Claude recommends a plan and layout as structured output, and Resend emails the reply to the enquirer and the lead to us. It falls back to the Firebase/EmailJS path if its env vars aren't set. Our USP is that Oceanalt runs on AI agents, checked by people, so keep that claim true: a person reads every enquiry the same business day. The site only promises the 15-minute reply once this function runs on Cloudflare (where the site is hosted) and passes an end-to-end test; until then it promises a same-business-day reply from a person.

## The homepage story (`src/components/Story.tsx`)
Hero: "Get found. Get booked. Get paid." with a browser and a phone that rotate through four matched sample businesses (Little Tern Coffee, Kerr & Sons, Saltwater Yoga, Tidewater Physio): each scene shows that business's own sample site (the address bar shows its real path on oceanalt.com.au/work/), the owner's phone, and two wins of one service from that business. Owners wave when a win lands (`Wave`: one Fluent person in a hand-down and a hand-up pose, `<name>.webp` + `<name>-wave.webp`, played as a flipbook). Jim's founder-made frames (`docs/design/avatars/jim-sheet.png`) and `scripts/make-wave-strip.py` (keys out drawn backgrounds, removes number badges, aligns frames, `--smooth 30` adds motion-interpolated in-betweens) are kept, but Jim is off the site for now (founder's call): the Kerr & Sons scene has no owner avatar and the WhatsApp card shows the WhatsApp logo. `mel-sheet.png` is saved for Mel; she isn't animated yet (founder's call). Then the "We work with" logo row (scrolls left to right), then one sticky scroll story in four steps, each with a small working visual: get found (a site we designed + where it shows up), when you can't pick up (the call as a transcript, the pattern the best competitors use, see `docs/growth/research/voice-agent-competitors.md`: plain lines paced to be read, the line being said highlighted, action rows for what the agent did (address saved, booked, sent to Jim), then the WhatsApp summary; the opening line says "I'm Jim's AI agent, and this call is recorded", and the agent never gives electrical advice beyond the triple zero line), get paid (a checkout cycling Apple Pay, Google Pay, Afterpay, card into Stripe), less admin (the pipeline demo). On mobile each visual sits under its step. People are 3D avatars from Microsoft Fluent Emoji (MIT, `public/avatars/LICENSE.txt`): Jim the sparky, Mel the caller, the AI concierge (with an AI badge), customers, and the owners of the sample businesses. No emoji anywhere (founder's call): no mood badges or emoji faces. Expression comes only from the people's own variants (`mel-worried` → `mel-ok`, `jim` → `jim-wave`): Mel is worried until the concierge books her, Jim waves when a win lands. The pay step plays a real-looking sheet per method (Face ID for Apple Pay, card tap for Google Pay, four dots for Afterpay, typed card) ending in a drawn tick. The work gallery shows each sample business as a case study: owner, before, what the site does (sample, no results claimed). Sample businesses only, and the page says so. Keep the page uncluttered: one idea per screen, logos instead of chips, motion that tells the story and stops for reduced motion.

`api/demo.ts` and `shared/aiDemo.ts` (live Claude chat demo) are kept for a future website-chat demo but aren't on the homepage now.

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
| `marketing` | Positioning, the story, homepage and landing-page copy, ad and social copy |
| `ui-designer` | Visual design: type, colour, spacing, components, motion, avatars |
| `ux-designer` | Page structure, journeys, CTAs, forms, navigation, accessibility |
| `engineer` | Builds, Stripe, bookings, migrations, launches, tech debt |
| `qa` | Launch sign-off against the QA checklist |

## Design skills (`.claude/skills/`)
`design-taste-frontend`, `redesign-existing-projects`, `minimalist-ui`, `high-end-visual-design`, `full-output-enforcement` (Taste Skill, MIT) · `frontend-design`, `webapp-testing` (Anthropic, Apache-2.0) · `web-design-guidelines`, `react-best-practices` (Vercel, MIT) · `design-references` (awesome-design-md, MIT).
Load the right one before doing any UI work. No invented stats, testimonials or scarcity on any site we ship.

## Dev
`npm install` · `npm run dev` (port 3000) · `npm run lint` (tsc) · `npm run build` · `npm run site:build -- <site.json>`. Copy `.env.example` to `.env`. The site is React + plain CSS tokens (`src/index.css`), with the Geist font self-hosted. Icons come from `templates/icons/icons.json` via `src/components/Icon.tsx`. Don't use another icon library.

## Selling the AI concierge (CEO decisions, 8 Oct 2026)
- The product is the **AI concierge** on the site. On calls it introduces itself as **"[owner]'s AI agent"**, never a human name, and every call opens with the AI and recording notice (can't be switched off). Never "receptionist" in our copy; "AI receptionist" only in the landing meta description, because buyers search it.
- Never "never miss a call" or any promise that every call is answered. Urgent transfer is "can … if you want".
- Show the cost per call (15 to 20c/min estimate, a 3-minute call about 45 to 60 cents) and put "3-month minimum. Nothing is charged until it passes our test calls" next to the price.
- "Hear a sample call" player: approved, but only ships when real audio exists (made by the founder in ElevenLabs with commercially licensed library voices; no dead play button; the shown length must be the real file length). "Ring our sample line": approved in principle with an Australian number, the real product, a $50/month cap and a final CEO go/no-go.
