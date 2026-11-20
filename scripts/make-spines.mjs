// Spine colours for the homepage record shelf (src/studio/Shelf.tsx): each
// theme's background, ink and accent, keyed by theme name as WORK uses it.
// Runs with `npm run templates`, so a new theme gets a spine automatically.
import { readFileSync, writeFileSync } from "node:fs";
const raw = JSON.parse(readFileSync(new URL("../templates/themes/themes.json", import.meta.url)));
const themes = raw.themes || raw;
const out = {};
for (const t of Object.values(themes)) {
  const c = t.light || t.dark;
  if (c) out[t.name] = { bg: c.bg, ink: c.ink, accent: c.accent };
}
writeFileSync(new URL("../src/data/spines.json", import.meta.url), JSON.stringify(out, null, 0) + "\n");
console.log(`spines: ${Object.keys(out).length} themes`);
