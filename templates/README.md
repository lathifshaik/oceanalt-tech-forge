# Client site templates

This is what makes **custom design in 1–3 days** possible. Each client site is **one content file** (`site.json`) rendered into a single static HTML page, around 25 KB plus photos. It has no framework and no build chain to maintain, and costs nothing to host.

A site's look comes from three independent choices, so no two clients get the same design:

1. **Layout** (`template`): `cafe`, `trades`, `studio`, `shop` or `pro`. This is the structure, built around how that kind of business gets customers.
2. **Theme** (`design.theme`): one of thirty-eight complete design directions in `themes/themes.json`. Each one sets the palette (light and dark), the font pairing, the corner style and the heading style. Any theme works with any layout.
3. **Hero** (`design.hero`): a full-bleed photo (`full`) or a split screen (`split`). The `cafe` layout also has two restaurant heroes: `centre` (a big centred headline with `hero.lineTwo` in italic, a round dish photo `hero.dish` rising from the bottom, and optional `hero.cards` and `hero.stats`) and `wordmark` (the business name huge, sized to fit its longest word, the headline as a tagline, and a live open or closed chip from the hours).

On top of that come the client's own accent colour (`design.accent`, `design.accentDark`), photos, words and logo.

| Theme | Feel |
|---|---|
| `harbour` | Warm and local. Olive and brick, a characterful grotesque |
| `coast` | Clean and trustworthy. Navy and hi-vis yellow |
| `calm` | Quiet and premium. Light type, deep teal |
| `ink` | Editorial. Black and white, square corners, electric blue |
| `forest` | Natural. Deep green and amber, soft pill shapes |
| `night` | Moody. Always dark, coral accent |
| `sun` | Playful. Hot pink, wide rounded display face |
| `riso` | Poster print. Cream paper, navy ink, tomato red, a big serif, print grain, a flat circle in the hero |
| `halftone` | Loud print. Blue-tinted photos, hot pink, tilted condensed headlines, square corners |
| `bloom` | Flower-shop poster. Butter, aubergine and orange, heavy italic type, a flat flower in the hero |
| `autumn` | Seasonal poster. Cream, brick and gold, very light display type, a flat leaf shape |
| `paddy` | Restaurant. Cream and rice-paddy green, soft pink, Newsreader with an italic second line |
| `orchid` | Restaurant. Blush and plum, bright pink, a soft chunky Fraunces wordmark with Oswald capitals |
| `ember` | Fine dining. Near-black and candle gold, Cormorant serif, thin gold rules, outlined buttons (always dark) |
| `checker` | Street-food poster. Cobalt, white and yellow, Anton capitals with a hard shadow, checkerboard strips |
| `trattoria` | Italian. Cream, tomato and olive, Gloock with Newsreader italics, arched photos, a striped awning |
| `cantina` | Bright and loud. Cream, chilli orange, lime and pink, Bowlby One capitals, a row of party flags |
| `umami` | Black, rice-paper white and one red sun. Extra-wide Archivo capitals, square corners (always dark) |
| `blush` | Beauty editorial. Powder pink and rose, Bodoni Moda with italics, arched photos |
| `sage` | Apothecary calm. Sage, stone and oat, Instrument Serif in lower case, square photos |
| `iron` | Gym. Black and acid lime, heavy italic condensed capitals, hazard stripes between sections (always dark) |
| `pomade` | Barbershop. Oxblood, cream and brass, Alfa Slab One, a striped barber pole in the hero |
| `mint` | Friendly clinic. White, mint and navy, rounded Nunito, soft blob shapes |
| `garage` | Workshop. Hazard yellow and black, stencil capitals, hazard-tape strips |
| `terrace` | Property. Warm white, navy and brass, Marcellus in spaced capitals, inset frames on photos |
| `ledger` | Accounting. Ruled ledger paper, bottle green, IBM Plex Serif with monospaced figures |
| `veil` | Weddings. Ivory and taupe, Italiana with Pinyon Script flourishes |
| `chalk` | Tutoring. Blackboard green, chalk white, yellow highlighter, Caveat handwriting notes |
| `crayon` | Early learning. Cream with sunny primaries, Fredoka, scalloped section edges, bubble shapes |
| `paws` | Vet. Teal and warm sand, Lexend, a paw-print trail under headings |
| `fresh` | Cleaning. White and electric blue, bold Plus Jakarta Sans, soap-bubble circles |
| `cellar` | Cellar door. Burgundy and parchment, Cinzel capitals with EB Garamond |
| `haven` | Warm interiors. Sun-washed cream, rust italics, Libre Caslon Display |
| `nocturne` | After-dark beauty. Black with violet and blue glows, Playfair Display (always dark) |
| `basalt` | Stone and water. Warm grey, light Spectral, one word glowing red, an arched photo and a red band |
| `burst` | Adrenaline. Black, a hot-pink starburst, Archivo Black with an italic serif word, grain (always dark) |
| `sunnyside` | Breakfast. Cobalt and yolk orange, drawn fried eggs (cafe wordmark hero), Gabarito |
| `pirouette` | Dance poster. Pink, giant League Spartan capitals, green-tinted photos printed into the page |

Any theme can use `hero.eyebrow` (a small spaced line above the headline) and `hero.accent` (a word of the headline set in the accent style); the builder adds them in every layout.

The four poster themes (`riso`, `halftone`, `bloom`, `autumn`) also carry their own CSS (`css` in `themes.json`): print grain, black-and-white or tinted photos, oversized headlines and one flat shape. The builder adds it after the layout's own styles.

**No two sites look the same, and the builder enforces it.** Building `clients/<slug>/site.json` fails if another client already has the same layout + theme + hero + accent. When that happens, change one of them.

All theme colour pairs pass WCAG AA. The `accent-text` token exists for themes whose accent is too light to use as text (Coast's yellow, for example).

| Template | For | Signature detail |
|---|---|---|
| `cafe` | Cafés, bakeries, small restaurants, bars | Full-bleed photo hero; a 3D hanging sign flips to OPEN or CLOSED from the real opening hours |
| `trades` | Electricians, plumbers, builders, cleaners, mobile services | Job photo with a 3D licence card that tilts with the pointer; sticky call bar on phones |
| `studio` | Salons, clinics, physio, Pilates, massage, coaches | Bookable treatments with prices; a 3D gift voucher that flips to show its terms |
| `shop` | Florists, makers, boutiques, bakeries that deliver (up to ~50 products) | Product grid where each product has its own Stripe Payment Link; a 3D delivery tag that counts down to the same-day cutoff |
| `pro` | Accountants, lawyers, real estate, consultants | Services with fixed fees, fee list, team, FAQs; a 3D business card that flips to show contact details and a "Save contact" vCard |

Each example business is built in three designs (the `showcase` list in each `meta.json`) into `public/work/` by `npm run templates`. The marketing site shows them with a design switcher.

## Build a client site

```bash
cp templates/trades/example.json clients/smith-electrical/site.json   # start from the closest example
# edit the content: business details, services, photos, reviews
npm run site:build -- clients/smith-electrical/site.json --out dist-sites
# → dist-sites/smith-electrical/index.html, robots.txt, sitemap.xml
```

The build fails with a clear list if a required field is missing (see each template's `meta.json`).

**What you get automatically:** SEO title and description, Open Graph tags, LocalBusiness JSON-LD, a favicon made from the business initials, a canonical URL, robots.txt and sitemap.xml. You also get light and dark mode, `tel:` links in international format, a Google Maps directions link, today's hours highlighted, and reduced-motion support.

**Design:** `"design": { "theme": "forest", "hero": "split", "accent": "#1d6fd8", "accentDark": "#79aef0" }`. Leave it out and the layout's default theme is used.

**Sections (cafe layout):** besides the menu and visit sections, a restaurant can have `dishes` (signature dishes; `dishStyle` is `round` or `cards`), `chef`, `special` (a weekly deal), `gallery` and `booking` (book a table). `"sections": ["facts", "dishes", "special", "menu", "visit"]` picks which appear and in what order; leave it out for the layout's order. A showcase entry can set its own `sections` and `dishStyle`, so one business can be shown with different pages. `npm run templates` stops if two gallery designs share the same layout, theme, hero, sections and dish style: every sample design must be unique. Pick the accent from the client's logo, and check it reads on the theme's background at 4.5:1.

**Payments and bookings:** `business.bookingUrl` (Cal.com, Fresha, Square…), `gift.buyUrl` and `bookUrl` on any treatment take Stripe Payment Links created in the **client's own** Stripe account.

**Forms:** `contact.formAction` takes any form endpoint (Formspree, Web3Forms, Basin). Leave it out and the page shows phone and email only.

**Shop delivery:** `"delivery": { "cutoff": { "time": "1pm", "days": ["mon", "tue"] }, "facts": [...] }` turns on the countdown tag.

**Save contact:** every site gets `business.vcard` (a vCard data URI) from its phone, email and address. Set `business.contactName` and `business.contactRole` to put a person on the card.

**Reference boards:** to refresh a layout or add a theme, collect references first (`docs/design/REFERENCE_BOARDS.md`).

## Photos

Photos make or break these templates. In order of preference:
1. The client's own photos (ask on the kickoff call; their Google Business Profile usually has some).
2. Photos we take ourselves on a local visit.
3. Unsplash or Pexels (both free for commercial use). Pick ones that look local and real, not staged stock.

Use `?w=1600&q=75&auto=format&fit=crop` on Unsplash URLs for the hero, and `w=1000` elsewhere.

## 1–3 day delivery checklist

| When | Step |
|---|---|
| Day 0 | 15-minute kickoff call. Pick the template, get photos, prices, hours, logo and the domain login. We write the copy. |
| Day 1 | Fill in `site.json`, build, and send the preview link. The first monthly charge waits for their approval. |
| Day 1–2 | One round of changes |
| Day 2–3 | Connect the domain, set up Google Business Profile, test forms and payments (QA checklist in `docs/business/OPERATIONS.md`), go live |

Not covered by the 1–3 day promise, because a third party controls them: Google Business Profile verification, Stripe account verification, and domain transfers away from another registrar.

## Files

- `engine/build.mjs`: renderer (Mustache subset), `<head>`, SEO and JSON-LD
- `engine/build-all.mjs`: builds every example into `public/work/` for the portfolio
- `engine/base.css`: shared reset and accessibility styles
- `engine/fx.js`: the 3D tilt, flip, live open/closed sign, same-day delivery countdown and today's hours (around 3 KB, no dependencies)
- `icons/icons.json`: Oceanalt's custom icon set (47 icons, 24px grid, 1.75 stroke), also in `icons/svg/`
- `themes/themes.json`: the thirty-eight design directions
- `<template>/template.html` (reads only theme tokens: `--bg`, `--ink`, `--accent`, `--accent-text`, `--accent-2`, `--font-display`, `--r`, `--r-img`, `--r-btn`…), `meta.json` (required fields, default theme, hero variants, showcase), `example.json`
