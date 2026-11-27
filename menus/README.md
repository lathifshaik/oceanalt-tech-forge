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
   node scripts/menus/build-menus.mjs
   ```

   Our own tagger (`scripts/menus/tagger.mjs`, no outside service, no keys) reads each new or changed menu and scores every dish on heat, crunch, richness, freshness, sweetness, tang and savoury depth from its ingredients, cooking words and what well-known dishes usually contain. It also sets diet tags (only vegetarian is inferred; vegan, gluten free and halal only when the menu says so) and which drawn plate fits. Results go to `menus/tagged/`. Unchanged menus are skipped.

3. Spot-check a few dishes in `menus/tagged/<restaurant>.json`. To see why a dish scored what it did: `node scripts/menus/build-menus.mjs --why "Mapo tofu" "silken tofu, beef, chilli"`. Fix a score by editing the dish and adding `"fixed": true`; re-tagging keeps it. To fix it for every menu, add the word or dish to the lists in `tagger.mjs`.

## Now

`menus/tagged/` holds the 20 made-up sample restaurants (`"sample": true`), so the page keeps working. Delete them when real menus arrive.

## Later

- Uber menu feed: when Uber gives us a menu feed, convert it into files in `menus/inbox/`, or tag it straight from the feed.
- Data: the index is a static file for the prototype. A live version keeps menus in a database in AWS Sydney (see OPERATIONS.md), refreshed from Uber's feed.
