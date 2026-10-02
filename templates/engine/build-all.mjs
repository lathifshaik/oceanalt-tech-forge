#!/usr/bin/env node
// Builds every template's example site into public/work/<slug>/ so the
// marketing site can show them as live previews, and writes a manifest the
// site reads for the gallery. Runs automatically before `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite } from "./build.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "..", "public", "work");
const manifest = [];

for (const t of readdirSync(ROOT, { withFileTypes: true })) {
  const example = join(ROOT, t.name, "example.json");
  if (!t.isDirectory() || !existsSync(example)) continue;
  const site = JSON.parse(readFileSync(example, "utf8"));
  const meta = JSON.parse(readFileSync(join(ROOT, t.name, "meta.json"), "utf8"));
  const { html } = buildSite({ ...site, url: `https://oceanalt.com.au/work/${site.slug}/` }, { sourceLabel: example });
  mkdirSync(join(OUT, site.slug), { recursive: true });
  writeFileSync(join(OUT, site.slug, "index.html"), html);
  manifest.push({ template: t.name, name: meta.name, for: meta.for, slug: site.slug, business: site.business.name });
  console.log(`work/${site.slug}/ (${t.name})`);
}
writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
