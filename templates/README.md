# Client site templates

This is what makes 1–3 day delivery possible. Each client site is **one content file** (`site.json`) rendered through one of three templates into a single static HTML page, around 25 KB plus photos. It has no framework and no build chain to maintain, and costs nothing to host.

| Template | For | Signature detail |
|---|---|---|
| `cafe` | Cafés, bakeries, small restaurants, bars | Full-bleed photo hero; a 3D hanging sign flips to OPEN or CLOSED from the real opening hours |
| `trades` | Electricians, plumbers, builders, cleaners, mobile services | Job photo with a 3D licence card that tilts with the pointer; sticky call bar on phones |
| `studio` | Salons, clinics, physio, Pilates, massage, coaches | Bookable treatments with prices; a 3D gift voucher that flips to show its terms |

Live examples are built into `public/work/<slug>/` by `npm run templates`, and the marketing site shows them as the portfolio.

## Build a client site

```bash
cp templates/trades/example.json clients/smith-electrical/site.json   # start from the closest example
# edit the content: business details, services, photos, reviews
npm run site:build -- clients/smith-electrical/site.json --out dist-sites
# → dist-sites/smith-electrical/index.html, robots.txt, sitemap.xml
```

The build fails with a clear list if a required field is missing (see each template's `meta.json`).

**What you get automatically:** SEO title and description, Open Graph tags, LocalBusiness JSON-LD, a favicon made from the business initials, a canonical URL, robots.txt and sitemap.xml. You also get light and dark mode, `tel:` links in international format, a Google Maps directions link, today's hours highlighted, and reduced-motion support.

**Theme:** set `"theme": { "accent": "#1d6fd8", "accentDark": "#79aef0" }` to change the accent colour per client. Any template token can be overridden the same way (`bg`, `ink`, `surface`…).

**Payments and bookings:** `business.bookingUrl` (Cal.com, Fresha, Square…), `gift.buyUrl` and `bookUrl` on any treatment take Stripe Payment Links created in the **client's own** Stripe account.

**Forms:** `contact.formAction` takes any form endpoint (Formspree, Web3Forms, Basin). Leave it out and the page shows phone and email only.

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
- `engine/fx.js`: the 3D tilt, flip, live open/closed sign and today's hours (around 2 KB, no dependencies)
- `icons/icons.json`: Oceanalt's custom icon set (43 icons, 24px grid, 1.75 stroke), also in `icons/svg/`
- `<template>/template.html`, `meta.json`, `example.json`
