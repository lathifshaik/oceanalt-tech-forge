---
name: design-references
description: Library of 20 DESIGN.md breakdowns of well-known product sites (Stripe, Airbnb, Linear, Notion, Apple, Wise, Cal.com, Starbucks…) — colours, type scale, spacing, components, motion. Use when picking a visual direction for a client site, when a client says "make it feel like X", or when a design needs a concrete, coherent token set instead of guesswork.
---

# Design references

`systems/<name>.md` holds a structured breakdown of one site's design language: colour tokens, typography scale, radii, spacing, component patterns, and do's and don'ts. Source: VoltAgent/awesome-design-md (MIT), commit f696123.

## When to use

- **Choosing a direction.** Pick 1–2 references that match the client's personality, then adapt them with `design-taste-frontend`.
- **"Make it feel like…"** If the client names a site, read that file. If it isn't here, pick the closest one.
- **Token sanity check.** Before shipping, compare your type scale and spacing to a reference that's in the same mood.

## Picking by client type

| Client mood | Start from |
|---|---|
| Warm, hospitality, food (cafés, restaurants) | `starbucks`, `airbnb` |
| Trust and clarity (tradies, clinics, accountants) | `wise`, `stripe`, `intercom` |
| Calm and personal (coaches, therapists, wellness) | `notion`, `cal`, `superhuman` |
| Premium product or retail | `apple`, `shopify`, `spotify` |
| Bold, modern, startup | `linear.app`, `vercel`, `framer`, `resend`, `supabase` |
| Booking or marketplace flows | `airbnb`, `cal`, `uber` |
| Playful or creative | `clay`, `webflow`, `revolut` |

## Rules

- **Borrow the system, never the brand.** Take the spacing logic, type ratios, palette structure and component patterns. Never copy logos, brand names, proprietary fonts, product imagery or distinctive copy. A client site must never look like it belongs to Stripe or Airbnb.
- Proprietary fonts (Söhne, SF Pro, Circular…) get swapped for free equivalents from Google Fonts or Fontsource.
- Always mix with the client's own colours and photos. A reference is a starting point, not a template.
