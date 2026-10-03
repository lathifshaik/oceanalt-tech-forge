# Reference boards with Claude in Chrome

How we use Pinterest, Framer, Webflow and award sites to keep our layouts and themes fresh, **without copying anyone's work**.

## Why this runs on your machine, not in the cloud

[Claude in Chrome](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome) is a browser extension that runs in **your** Chrome, so it browses as you. That suits Pinterest, which hides most pins behind a login. Cloud sessions of Claude Code can't use it.

So the split is:
- **You, in Chrome:** collect references into a markdown file, using the prompt below.
- **The `designer` agent, in the repo:** turns those notes into changes to `templates/` and `templates/themes/themes.json`.

## Rules (read before collecting)

- **Inspiration, never copies.** Framer and Webflow templates and Pinterest pins are other people's copyrighted work. We note *patterns*: layout ideas, type pairings, colour relationships and interactions. We never take their code, images, text, logos or exact layouts.
- **Never download images from Pinterest** for client sites. Pins are often stolen photos with no licence. Use photos from the client, from us, or from Unsplash/Pexels (see `templates/README.md`).
- **Small-business sites only.** We're collecting what works for cafés, trades, clinics, shops and professional firms, not agency portfolios or SaaS landing pages.

## Setup (once)

1. Install Claude in Chrome from the Chrome Web Store, sign in, and pin it to the toolbar. It's Chrome-only, and it needs a plan that includes it.
2. Log in to Pinterest (and Framer, if you have an account) yourself in that browser.
3. Make a Pinterest board per niche: `oceanalt-cafe`, `oceanalt-trades`, `oceanalt-studio`, `oceanalt-shop`, `oceanalt-pro`.

## The prompt

Open the Claude side panel on the Pinterest board (or a Framer/Webflow template marketplace page) and paste this, changing the niche:

```
I run Oceanalt, a small studio that makes websites for Australian small
businesses. Help me build a design reference board for the CAFÉ niche
(swap for: trades, salon/clinic, shop/florist, professional services).

Look through the pins on this board (or the templates on this page).
Open up to 12 of the most relevant ones. For each, write a markdown entry:

### <short name>
- Source: <exact URL>
- What it is: <site/template name and type of business>
- Pattern worth borrowing: <the idea, in one or two lines, e.g. "menu as a
  two-column priced list beside a tall food photo", "hero headline over a
  full-bleed photo with a hand-written price tag">
- Type: <font style if identifiable, e.g. "wide grotesque display + humanist sans">
- Colour: <describe the palette relationship, e.g. "dark green ground,
  cream text, one amber accent"; give hex values if visible>
- Interaction/motion: <anything that moves or responds, if present>
- Do NOT copy: <the parts that are distinctive to that brand or author>
- Fits Oceanalt layout: <cafe | trades | studio | shop | pro> and theme
  <harbour | coast | calm | ink | forest | night | sun | needs a new theme>

Rules: describe patterns only. Don't copy text, code, logos or images.
Skip anything that's an agency portfolio, a SaaS product page, or
obviously AI-generated. Finish with a short "Top 3 ideas to try" list.
Give me the result as one markdown block I can copy.
```

Save the result in the repo as `docs/design/references/<niche>-<yyyy-mm>.md`, for example `docs/design/references/cafe-2026-10.md`.

## Turning a board into improvements

In Claude Code, ask the designer agent:

```
Use the designer agent. Read docs/design/references/cafe-2026-10.md and
propose up to three changes to templates/cafe (or a new theme in
templates/themes/themes.json) that would make the café layout better for
real café owners. Patterns only, nothing copied. Build the example,
screenshot desktop and phone, and show me before/after.
```

The designer agent then follows its normal rules: theme tokens only, both colour schemes, WCAG AA contrast, reduced-motion support, no invented stats.

## What about "full apps"?

Framer and Webflow also sell templates for apps: dashboards, booking systems, client portals. Those don't fit our one-page site system, and they aren't templates we resell. They're **custom projects** (pricing section: "Need something bigger?"), quoted per job. Reference boards for app work are still useful. Save them as `docs/design/references/apps-<topic>.md` for when a custom project comes in.
