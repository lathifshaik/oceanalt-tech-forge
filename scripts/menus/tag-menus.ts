/**
 * Menu engine, step 1: read each restaurant menu in menus/inbox/, have Claude score every dish,
 * and write the index the Oceanalt × Uber Eats page reads (public/concepts/uber/menus.json).
 *
 *   npx tsx scripts/menus/tag-menus.ts            tag new or changed menus, then rebuild the index
 *   npx tsx scripts/menus/tag-menus.ts --index    only rebuild the index from menus/tagged/
 *   npx tsx scripts/menus/tag-menus.ts --force    re-tag every menu
 *
 * A menu is a text file (paste from a PDF, a website or a feed) with a short header:
 *
 *   name: Little Red Lantern
 *   suburb: Collingwood
 *   price: 2                        1 = $, 2 = $$, 3 = $$$
 *   ubereats: https://www.ubereats.com/au/store/...   (optional: the store's real Uber Eats link)
 *   sample: true                    (optional: marks made-up menus so the page can say so)
 *   ---
 *   Dan dan noodles  $19  pork mince, chilli oil, Sichuan pepper
 *   ...
 *
 * Needs ANTHROPIC_API_KEY (or another credential the SDK resolves) to tag. --index needs none.
 */
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INBOX = path.join(ROOT, "menus/inbox");
const TAGGED = path.join(ROOT, "menus/tagged");
const OUT = path.join(ROOT, "public/concepts/uber/menus.json");

/* the drawn plates the page knows how to draw */
const LOOKS = ["noodles-red", "noodles", "pasta", "bowl-red", "bowl-brown", "bowl-yellow", "bowl-mixed", "greens", "tacos", "flat",
  "rice", "plate-grill", "falafel", "sushi", "platter", "pizza", "chicken", "roll", "burrito", "ceviche", "pie", "rolls"] as const;

const score = z.number().min(0).max(1);
const Dish = z.object({
  name: z.string().describe("Dish name as written on the menu"),
  price: z.number().nullable().describe("Price in AUD, or null if the menu gives none"),
  kind: z.enum(["main", "side", "dessert", "drink", "other"]),
  heat: score.describe("Chilli heat. 0 none, 1 very hot"),
  crunch: score.describe("Crunchy or crispy texture"),
  rich: score.describe("Rich, heavy, filling (fat, cream, cheese, braises)"),
  fresh: score.describe("Fresh, light, raw or herby"),
  sweet: score,
  tang: score.describe("Sour or tangy (citrus, vinegar, pickles, tamarind)"),
  umami: score.describe("Savoury depth (soy, broth, cheese, cured meat, mushrooms)"),
  diets: z.array(z.enum(["veg", "vegan", "gf", "halal"])).describe("Only what the menu states or the ingredients make plain. Never guess halal."),
  look: z.enum(LOOKS).describe("Which drawn plate fits the dish best"),
});
const Menu = z.object({
  cuisine: z.string().describe("The restaurant's cuisine in one or two words, e.g. Sichuan, Ethiopian, Barbecue"),
  dishes: z.array(Dish),
});
type Tagged = { name: string; suburb: string; level: number; ubereats: string | null; sample: boolean; source: string; cuisine: string; dishes: z.infer<typeof Dish>[] };

const SYSTEM = `You read restaurant menus for a food recommendation engine in Melbourne.
For every dish on the menu, give its price and score its flavour and texture from 0 to 1, judging from the name, the description and what the dish usually is.
Scores are relative to food in general: a mild butter chicken is heat 0.3, a Sichuan mapo tofu 0.9; a fried chicken is crunch 1, a soup crunch 0.
Leave out drinks only if the menu has more than a handful; keep sides and desserts.
Diet tags: only when the menu states it or the ingredients make it certain. Never infer halal.
Copy dish names exactly. Do not invent dishes or prices.`;

function parse(file: string) {
  const raw = fs.readFileSync(file, "utf8");
  const [head, ...rest] = raw.split(/^---\s*$/m);
  const meta: Record<string, string> = {};
  for (const line of head.split("\n")) { const m = line.match(/^\s*([a-z]+)\s*:\s*(.+?)\s*$/i); if (m) meta[m[1].toLowerCase()] = m[2]; }
  if (!meta.name || !rest.length) throw new Error(`${path.basename(file)}: needs a header with at least "name:" and a "---" line before the menu`);
  return { meta, body: rest.join("---").trim(), hash: createHash("sha256").update(raw).digest("hex").slice(0, 16) };
}

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function tag(client: Anthropic, name: string, body: string) {
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: betaZodOutputFormat(Menu) },
    system: SYSTEM,
    messages: [{ role: "user", content: `Restaurant: ${name}\n\nMenu:\n"""\n${body}\n"""` }],
  });
  if (response.stop_reason === "refusal") throw new Error(`${name}: declined`);
  if (response.stop_reason === "max_tokens") throw new Error(`${name}: menu too long for one pass, split the file`);
  if (!response.parsed_output) throw new Error(`${name}: no structured output`);
  return response.parsed_output;
}

function buildIndex() {
  const files = fs.existsSync(TAGGED) ? fs.readdirSync(TAGGED).filter((f) => f.endsWith(".json")).sort() : [];
  const restaurants = files.map((f) => JSON.parse(fs.readFileSync(path.join(TAGGED, f), "utf8")) as Tagged)
    .map((r) => ({
      name: r.name, suburb: r.suburb, cuisine: r.cuisine, level: r.level, ubereats: r.ubereats, sample: r.sample,
      dishes: r.dishes.filter((d) => d.kind !== "drink").map((d) => ({
        name: d.name, price: d.price, look: d.look, kind: d.kind, diets: d.diets,
        v: [d.heat, d.crunch, d.rich, d.fresh, d.sweet, d.tang, d.umami].map((x) => Math.round(x * 100) / 100),
      })),
    }))
    .filter((r) => r.dishes.length);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ built: new Date().toISOString(), restaurants }, null, 1));
  const n = restaurants.reduce((a, r) => a + r.dishes.length, 0);
  console.log(`index: ${restaurants.length} restaurants, ${n} dishes -> ${path.relative(ROOT, OUT)}`);
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (!args.has("--index") && !process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    console.error("No ANTHROPIC_API_KEY set, so no menus were tagged. Rebuilding the index from menus/tagged/ only.");
    args.add("--index");
  }
  if (!args.has("--index")) {
    const files = fs.existsSync(INBOX) ? fs.readdirSync(INBOX).filter((f) => /\.(txt|md)$/.test(f)).sort() : [];
    fs.mkdirSync(TAGGED, { recursive: true });
    const client = new Anthropic();
    let failed = 0;
    for (const f of files) {
      const { meta, body, hash } = parse(path.join(INBOX, f));
      const out = path.join(TAGGED, slug(meta.name) + ".json");
      if (!args.has("--force") && fs.existsSync(out) && JSON.parse(fs.readFileSync(out, "utf8")).source === hash) { console.log(`skip  ${meta.name} (unchanged)`); continue; }
      try {
        const menu = await tag(client, meta.name, body);
        const rec: Tagged = { name: meta.name, suburb: meta.suburb ?? "", level: Number(meta.price) || 2, ubereats: meta.ubereats ?? null, sample: meta.sample === "true", source: hash, ...menu };
        fs.writeFileSync(out, JSON.stringify(rec, null, 1));
        console.log(`tag   ${meta.name}: ${menu.cuisine}, ${menu.dishes.length} dishes`);
      } catch (error) {
        failed++;
        if (error instanceof Anthropic.AuthenticationError) { console.error("No valid Anthropic credential. Set ANTHROPIC_API_KEY, or run with --index."); process.exit(1); }
        if (error instanceof Anthropic.RateLimitError) console.error(`rate limited on ${meta.name}, run again later`);
        else if (error instanceof Anthropic.APIError) console.error(`API error ${error.status} on ${meta.name}`);
        else console.error(String(error));
      }
    }
    if (failed) console.error(`${failed} menu(s) failed; the rest are in the index`);
  }
  buildIndex();
}

main();
