#!/usr/bin/env node
// Builds every template's example site, in each showcase design, into
// public/work/ so the marketing site can show them as live previews, and writes a manifest the
// site reads for the gallery. Runs automatically before `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite } from "./build.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "..", "public", "work");
const manifest = [];

const themes = JSON.parse(readFileSync(join(ROOT, "themes", "themes.json"), "utf8"));

// Each layout folder has example.json, and can have more sample businesses as
// example-<name>.json. An example may set its own "showcase" designs.
const examples = [];
for (const t of readdirSync(ROOT, { withFileTypes: true })) {
  if (!t.isDirectory()) continue;
  for (const f of readdirSync(join(ROOT, t.name)).filter((f) => /^example(-[\w-]+)?\.json$/.test(f)).sort()) {
    examples.push({ t, example: join(ROOT, t.name, f) });
  }
}

// Gallery builds are samples: say so on the page, keep them out of search, and
// drop the LocalBusiness schema so a made-up business isn't published as real.
const SAMPLE_BAR = `<style>@media (max-width:760px){body:has(.callbar) #oc-sample{bottom:88px}}</style><a id="oc-sample" href="/#work" style="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;padding:10px 18px;border-radius:999px;background:#0b1a22;color:#fff;font:600 14px/1.2 system-ui,sans-serif;text-decoration:none;box-shadow:0 10px 30px -10px rgba(0,0,0,.45);white-space:nowrap">Sample design by Oceanalt. Back to the site</a>`;
const sample = (html) => html
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "")
  .replace("<head>", '<head>\n<meta name="robots" content="noindex, nofollow">')
  .replace("</body>", `${SAMPLE_BAR}\n</body>`);

for (const { t, example } of examples) {
  const { showcase, ...site } = JSON.parse(readFileSync(example, "utf8"));
  const meta = JSON.parse(readFileSync(join(ROOT, t.name, "meta.json"), "utf8"));
  // The same business in several designs, to show that no two sites look alike.
  const variants = (showcase || meta.showcase || [{ theme: meta.defaultTheme, hero: meta.heroVariants[0] }]).map((v, i) => {
    const path = i === 0 ? site.slug : `${site.slug}-${v.theme}`;
    const { html } = buildSite(
      { ...site, design: { ...site.design, ...v }, url: `https://oceanalt.com.au/work/${path}/` },
      { sourceLabel: `${example} (${v.theme}/${v.hero})` },
    );
    mkdirSync(join(OUT, path), { recursive: true });
    writeFileSync(join(OUT, path, "index.html"), sample(html));
    console.log(`work/${path}/ (${t.name}, ${v.theme}, ${v.hero} hero)`);
    return { path, theme: v.theme, themeName: themes[v.theme].name, hero: v.hero };
  });
  manifest.push({ template: t.name, name: meta.name, for: meta.for, slug: site.slug, business: site.business.name, variants });
}
writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
