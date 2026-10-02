#!/usr/bin/env node
// Oceanalt site builder.
//
// Turns one client content file (site.json) into a finished static site:
//   node templates/engine/build.mjs <path/to/site.json> [--out dist-sites]
//
// The content file names a template ("cafe", "trades", "coach", "studio",
// "shop"). The template's template.html is rendered with a small Mustache
// subset, wrapped in a shared <head> (SEO, Open Graph, LocalBusiness JSON-LD,
// favicon), and written with robots.txt and sitemap.xml. No dependencies, no
// client-side framework: the output is one HTML file that scores well on
// Lighthouse and costs nothing to host.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FX_JS = readFileSync(join(ROOT, "engine", "fx.js"), "utf8");
const BASE_CSS = readFileSync(join(ROOT, "engine", "base.css"), "utf8");
const ICONS = JSON.parse(readFileSync(join(ROOT, "icons", "icons.json"), "utf8"));

// ── Mustache subset ─────────────────────────────────────────────────────────
// {{name}} escaped · {{{name}}} raw · {{#name}}…{{/name}} section (loops arrays,
// enters objects, renders once for truthy scalars) · {{^name}}…{{/name}}
// inverted · {{.}} current item · {{icon:name}} static icon · {{icon:@field}}
// icon named by a field in the current context.

const TOKEN = /\{\{\{\s*([\w.@:-]+)\s*\}\}\}|\{\{([#^/]?)\s*([\w.@:-]+)\s*\}\}/g;

export function parse(tpl) {
  const root = { children: [] };
  const stack = [root];
  let last = 0;
  for (const m of tpl.matchAll(TOKEN)) {
    const top = stack[stack.length - 1];
    if (m.index > last) top.children.push({ type: "text", value: tpl.slice(last, m.index) });
    last = m.index + m[0].length;
    if (m[1]) { top.children.push({ type: "raw", name: m[1] }); continue; }
    const [, , sigil, name] = m;
    if (sigil === "#" || sigil === "^") {
      const node = { type: sigil === "#" ? "section" : "inverted", name, children: [] };
      top.children.push(node);
      stack.push(node);
    } else if (sigil === "/") {
      const open = stack.pop();
      if (!open || open.name !== name) throw new Error(`Template error: {{/${name}}} closes {{#${open?.name}}}`);
    } else {
      top.children.push({ type: "var", name });
    }
  }
  if (stack.length !== 1) throw new Error(`Template error: unclosed {{#${stack[stack.length - 1].name}}}`);
  if (last < tpl.length) root.children.push({ type: "text", value: tpl.slice(last) });
  return root;
}

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function lookup(stack, name) {
  if (name === ".") {
    const top = stack[stack.length - 1];
    return top !== null && typeof top === "object" && "." in top ? top["."] : top;
  }
  const [head, ...rest] = name.split(".");
  for (let i = stack.length - 1; i >= 0; i--) {
    const ctx = stack[i];
    if (ctx !== null && typeof ctx === "object" && Object.prototype.hasOwnProperty.call(ctx, head)) {
      return rest.reduce((acc, k) => (acc == null ? undefined : acc[k]), ctx[head]);
    }
  }
  return undefined;
}

const truthy = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));

export function icon(name, cls = "i") {
  const body = ICONS[name];
  if (!body) throw new Error(`Unknown icon "${name}". Available: ${Object.keys(ICONS).join(", ")}`);
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function renderNodes(nodes, stack) {
  let out = "";
  for (const n of nodes) {
    if (n.type === "text") out += n.value;
    else if (n.type === "var" || n.type === "raw") {
      if (n.name.startsWith("icon:")) {
        const ref = n.name.slice(5);
        const name = ref.startsWith("@") ? lookup(stack, ref.slice(1)) : ref;
        if (name) out += icon(name);
        continue;
      }
      const v = lookup(stack, n.name);
      if (v == null) continue;
      out += n.type === "raw" ? String(v) : escapeHtml(v);
    } else if (n.type === "section") {
      const v = lookup(stack, n.name);
      if (!truthy(v)) continue;
      if (Array.isArray(v)) {
        v.forEach((item, i) => {
          const pos = { "@index": i + 1, "@first": i === 0, "@last": i === v.length - 1 };
          const frame = item !== null && typeof item === "object" ? { ...item, ...pos } : { ".": item, ...pos };
          out += renderNodes(n.children, [...stack, frame]);
        });
      } else {
        out += renderNodes(n.children, [...stack, v]);
      }
    } else if (n.type === "inverted") {
      if (!truthy(lookup(stack, n.name))) out += renderNodes(n.children, stack);
    }
  }
  return out;
}

export const render = (tpl, data) => renderNodes(parse(tpl).children, [data]);

// ── Content helpers ─────────────────────────────────────────────────────────

const telHref = (phone) => "tel:" + String(phone).replace(/[^\d+]/g, "").replace(/^0/, "+61");

function initials(name) {
  return name.replace(/&/g, " ").split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function enrich(site) {
  const b = site.business;
  const data = structuredClone(site);
  data.year = new Date().getFullYear();
  data.business.initials = b.initials || initials(b.name);
  if (b.phone) data.business.phoneHref = telHref(b.phone);
  if (b.address) {
    data.business.mapUrl = b.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name} ${b.address}`)}`;
  }
  // Mark today's opening hours so templates can highlight them without JS.
  if (Array.isArray(b.hours)) {
    data.business.hours = b.hours.map((h, i) => ({ ...h, dayIndex: (i + 1) % 7 }));
    const byJsDay = Array(7).fill(null);
    b.hours.forEach((h, i) => { byJsDay[(i + 1) % 7] = h.open ? [h.open, h.close] : null; });
    data.business.hoursJson = JSON.stringify(byJsDay);
  }
  return data;
}

function jsonLd(site, url) {
  const b = site.business;
  const ld = {
    "@context": "https://schema.org",
    "@type": site.schemaType || "LocalBusiness",
    name: b.name,
    description: site.seo?.description,
    url,
    telephone: b.phone,
    email: b.email,
  };
  if (b.address) {
    ld.address = { "@type": "PostalAddress", streetAddress: b.street || b.address, addressLocality: b.suburb, addressRegion: b.state, postalCode: b.postcode, addressCountry: "AU" };
  }
  if (Array.isArray(b.hours)) {
    ld.openingHours = b.hours.filter((h) => h.open && h.close).map((h) => `${h.day.slice(0, 2)} ${h.open}-${h.close}`);
  }
  if (b.areaServed) ld.areaServed = b.areaServed;
  return JSON.stringify(ld).replace(/</g, "\\u003c");
}

function favicon(letters, bg, fg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${bg}"/><text x="32" y="42" font-family="system-ui,sans-serif" font-size="26" font-weight="700" text-anchor="middle" fill="${fg}">${letters}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

// ── Build ───────────────────────────────────────────────────────────────────

function validate(site, meta, file) {
  const missing = (meta.required || []).filter((path) => {
    const v = path.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), site);
    return v == null || v === "" || (Array.isArray(v) && v.length === 0);
  });
  if (missing.length) {
    throw new Error(`${file} is missing required fields for the "${site.template}" template:\n  - ${missing.join("\n  - ")}`);
  }
}

export function buildSite(site, { sourceLabel = "site.json" } = {}) {
  const tdir = join(ROOT, site.template || "");
  if (!site.template || !existsSync(join(tdir, "template.html"))) {
    throw new Error(`${sourceLabel}: unknown template "${site.template}". Use one of: cafe, trades, coach, studio, shop.`);
  }
  const meta = JSON.parse(readFileSync(join(tdir, "meta.json"), "utf8"));
  validate(site, meta, sourceLabel);

  const data = enrich(site);
  const body = render(readFileSync(join(tdir, "template.html"), "utf8"), data);
  const url = site.url || "https://example.com/";
  const theme = site.theme || {};
  const overrides = Object.entries(theme)
    .filter(([k]) => !k.endsWith("Dark"))
    .map(([k, v]) => `--${k}:${v};`).join("");
  const darkOverrides = Object.entries(theme)
    .filter(([k]) => k.endsWith("Dark"))
    .map(([k, v]) => `--${k.slice(0, -4)}:${v};`).join("");
  const seo = site.seo || {};
  const title = seo.title || `${site.business.name} | ${site.business.tagline || ""}`.trim();
  const desc = seo.description || site.business.tagline || "";

  const html = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${escapeHtml(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${escapeHtml(url)}">
${seo.image ? `<meta property="og:image" content="${escapeHtml(seo.image)}">` : ""}
<meta name="theme-color" content="${escapeHtml(theme.accent || meta.themeColor)}">
<link rel="icon" href="${favicon(data.business.initials, theme.accent || meta.themeColor, meta.themeColorInk || "#fff")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${meta.fonts}">
<style>${BASE_CSS}</style>
<script type="application/ld+json">${jsonLd(site, url)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${body}
${overrides || darkOverrides ? `<style>:root{${overrides}}${darkOverrides ? `@media (prefers-color-scheme: dark){:root{${darkOverrides}}}` : ""}</style>` : ""}
<script>${FX_JS}</script>
</body>
</html>
`;
  return { html, url };
}

function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) {
    console.error("Usage: node templates/engine/build.mjs <site.json> [--out dist-sites]");
    process.exit(1);
  }
  const outIdx = args.indexOf("--out");
  const outRoot = outIdx >= 0 ? args[outIdx + 1] : "dist-sites";
  const site = JSON.parse(readFileSync(file, "utf8"));
  const slug = site.slug || site.business.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const { html, url } = buildSite(site, { sourceLabel: file });
  const dir = join(outRoot, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  writeFileSync(join(dir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", url)}\n`);
  writeFileSync(join(dir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(url)}</loc></url></urlset>\n`);
  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`Built ${site.business.name} (${site.template}) → ${join(dir, "index.html")} (${kb} KB)`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (e) { console.error(e.message); process.exit(1); }
}
