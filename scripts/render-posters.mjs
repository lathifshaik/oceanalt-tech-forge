// Renders each poster in templates/posters/posters.html to a 1080 x 1350 PNG
// in public/posters/. Needs network for Google Fonts and the photos.
//   node scripts/render-posters.mjs
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Playwright isn't a project dependency: use a local copy if there is one, else the global one.
const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(execSync("npm root -g").toString().trim() + "/playwright"); }
const { chromium } = pw;

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/posters");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 1500 },
  ignoreHTTPSErrors: true,
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: "localhost,127.0.0.1" } : undefined,
});
const page = await ctx.newPage();
await page.goto("file://" + resolve(root, "templates/posters/posters.html"), { waitUntil: "load" });
await page.evaluate(async () => { await document.fonts.ready; });
await page.waitForTimeout(1500);
for (const id of await page.$$eval(".poster", (els) => els.map((e) => e.id))) {
  await page.locator(`#${id}`).screenshot({ path: resolve(out, `${id}.png`) });
  console.log(`posters/${id}.png`);
}
await browser.close();
