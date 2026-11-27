/**
 * Menu engine: read each restaurant menu in menus/inbox/, score every dish with our own tagger
 * (scripts/menus/tagger.mjs, no outside service), and write the index the Oceanalt × Uber Eats
 * page reads (public/concepts/uber/menus.json).
 *
 *   node scripts/menus/build-menus.mjs           tag new or changed menus, then rebuild the index
 *   node scripts/menus/build-menus.mjs --force   re-tag every menu
 *   node scripts/menus/build-menus.mjs --why "Dan dan noodles" "pork mince, chilli oil"
 *                                                show the scores for one dish and the words behind them
 *
 * Hand fixes: edit a dish in menus/tagged/<restaurant>.json and set "fixed": true on it. Re-tagging
 * keeps fixed dishes as they are.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { AXES, guessCuisine, parseMenu, tagDish } from "./tagger.mjs";

const ROOT = process.cwd();
const INBOX = path.join(ROOT, "menus/inbox");
const TAGGED = path.join(ROOT, "menus/tagged");
const OUT = path.join(ROOT, "public/concepts/uber/menus.json");
const slug = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function readMenu(file) {
  const raw = fs.readFileSync(file, "utf8");
  const [head, ...rest] = raw.split(/^---\s*$/m);
  const meta = {};
  for (const line of head.split("\n")) { const m = line.match(/^\s*([a-z]+)\s*:\s*(.+?)\s*$/i); if (m) meta[m[1].toLowerCase()] = m[2]; }
  if (!meta.name || !rest.length) throw new Error(`${path.basename(file)}: needs a header with at least "name:" and a "---" line before the menu`);
  return { meta, body: rest.join("---"), hash: createHash("sha256").update(raw).digest("hex").slice(0, 16) };
}

function tagMenu(file, force) {
  const { meta, body, hash } = readMenu(file);
  const out = path.join(TAGGED, slug(meta.name) + ".json");
  const old = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, "utf8")) : null;
  if (!force && old?.source === hash) return `skip  ${meta.name} (unchanged)`;
  const lines = parseMenu(body);
  if (!lines.length) throw new Error(`${meta.name}: found no dishes with prices`);
  const fixed = new Map((old?.dishes || []).filter((d) => d.fixed).map((d) => [d.name.toLowerCase(), d]));
  const dishes = lines.map(({ name, price, description }) => {
    if (fixed.has(name.toLowerCase())) return fixed.get(name.toLowerCase());
    const t = tagDish(name, description);
    return { name, price, description, kind: t.kind, look: t.look, diets: t.diets, ...Object.fromEntries(AXES.map((a, i) => [a, t.v[i]])) };
  });
  const rec = {
    name: meta.name, suburb: meta.suburb || "", level: Number(meta.price) || 2, ubereats: meta.ubereats || null,
    sample: meta.sample === "true", source: hash, cuisine: meta.cuisine || guessCuisine(dishes.map((d) => `${d.name} ${d.description || ""}`)), dishes,
  };
  fs.writeFileSync(out, JSON.stringify(rec, null, 1));
  return `tag   ${rec.name}: ${rec.cuisine}, ${dishes.length} dishes`;
}

function buildIndex() {
  const files = fs.existsSync(TAGGED) ? fs.readdirSync(TAGGED).filter((f) => f.endsWith(".json")).sort() : [];
  const restaurants = files.map((f) => JSON.parse(fs.readFileSync(path.join(TAGGED, f), "utf8")))
    .map((r) => ({
      name: r.name, suburb: r.suburb, cuisine: r.cuisine, level: r.level, ubereats: r.ubereats, sample: !!r.sample,
      dishes: r.dishes.filter((d) => d.kind !== "drink").map((d) => ({
        name: d.name, price: d.price, look: d.look, kind: d.kind || "main", diets: d.diets || [],
        v: AXES.map((a) => Math.round((d[a] ?? 0) * 100) / 100),
      })),
    }))
    .filter((r) => r.dishes.length);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ built: new Date().toISOString(), restaurants }));
  const n = restaurants.reduce((a, r) => a + r.dishes.length, 0);
  console.log(`index: ${restaurants.length} restaurants, ${n} dishes -> ${path.relative(ROOT, OUT)}`);
}

const args = process.argv.slice(2);
if (args[0] === "--why") {
  const t = tagDish(args[1] || "", args[2] || "");
  console.log(`${args[1]}: ${t.kind}, plate ${t.look}, diets [${t.diets.join(", ")}]`);
  AXES.forEach((a, i) => console.log(`  ${a.padEnd(6)} ${t.v[i].toFixed(2)}  ${t.why[a].join(", ")}`));
} else {
  fs.mkdirSync(TAGGED, { recursive: true });
  const files = fs.existsSync(INBOX) ? fs.readdirSync(INBOX).filter((f) => /\.(txt|md)$/.test(f)).sort() : [];
  let failed = 0;
  for (const f of files) { try { console.log(tagMenu(path.join(INBOX, f), args.includes("--force"))); } catch (e) { failed++; console.error(String(e.message || e)); } }
  if (failed) console.error(`${failed} menu(s) failed; the rest are in the index`);
  buildIndex();
}
