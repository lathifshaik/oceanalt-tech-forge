# Menus for the Oceanalt × Uber Eats taste engine

The page at `/concepts/uber/` recommends dishes from `public/concepts/uber/menus.json`. That file is built from the menus here.

## Add a restaurant

1. Make a text file in `menus/inbox/`, e.g. `menus/inbox/little-red-lantern.txt`:

   ```
   name: Little Red Lantern
   suburb: Collingwood
   price: 2
   ubereats: https://www.ubereats.com/au/store/...
   ---
   Dan dan noodles  $19  pork mince, chilli oil, Sichuan pepper
   Mapo tofu  $21  silken tofu, beef, doubanjiang (gf on request)
   ...
   ```

   - `price` is 1 ($), 2 ($$) or 3 ($$$).
   - `ubereats` is optional: the store's own Uber Eats link. Without it, "Open in Uber Eats" searches for the dish and the place.
   - Paste the menu as it comes (from a PDF, a website or a feed). Layout doesn't matter.
   - Only use menus we have permission to use: from Uber, or from the restaurant. Don't copy menus off the Uber Eats site.

2. Tag and rebuild:

   ```
   npx tsx scripts/menus/tag-menus.ts
   ```

   Claude reads each new or changed menu and scores every dish (heat, crunch, richness, freshness, sweetness, tang, savoury depth, diet tags and which drawn plate fits). Results go to `menus/tagged/`. Unchanged menus are skipped. Needs `ANTHROPIC_API_KEY`.

3. Spot-check a few dishes in `menus/tagged/<restaurant>.json`. Fix any score by hand and run `npx tsx scripts/menus/tag-menus.ts --index` to rebuild without calling Claude.

## Now

`menus/tagged/` holds the 20 made-up sample restaurants (`"sample": true`), so the page keeps working. Delete them when real menus arrive.

## Later

- Uber menu feed: when Uber gives us a menu feed, convert it into files in `menus/inbox/`, or tag it straight from the feed.
- Data: the index is a static file for the prototype. A live version keeps menus in a database in AWS Sydney (see OPERATIONS.md), refreshed from Uber's feed.
