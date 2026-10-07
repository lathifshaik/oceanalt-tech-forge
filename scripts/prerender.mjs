// After `vite build`: renders the home page and every service page to HTML,
// adds structured data and writes sitemap.xml, so each page is fully readable
// without JavaScript.
// If anything here fails, the build still succeeds: the home page works
// without pre-rendering (the browser renders it), so a prerender bug must never
// block a deploy. The error is printed in full so it shows in the host's log.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";

const SITE = "https://oceanalt.com.au/";
const BUSINESS = `${SITE}#business`;
// Sitemap entries. Images are listed too, so they can show up in image search.
const urls = [{
  loc: SITE,
  priority: "1.0",
  images: [
    { loc: `${SITE}og-image.png`, title: "Oceanalt: your website, done for you" },
    { loc: `${SITE}ai/cafe.webp`, title: "A café after closing, its AI assistant still answering customers" },
  ],
}];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ld = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
const faqPage = (id, faq) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

function business(seo) {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS,
    name: "Oceanalt",
    url: SITE,
    logo: `${SITE}apple-touch-icon.png`,
    image: `${SITE}og-image.png`,
    email: seo.EMAIL,
    description: "Websites, AI receptionists, web apps and workflow automation for Australian small businesses, designed, built and looked after from Sydney.",
    address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", postalCode: "2037", addressCountry: "AU" },
    areaServed: [{ "@type": "City", name: "Sydney" }, { "@type": "Country", name: "Australia" }],
    taxID: seo.ABN,
    priceRange: "$29 to $149 a month",
    knowsAbout: ["Website design", "Web application development", "Custom software", "Business automation", "Local SEO", "Google Business Profile", "AI search optimisation", "AI receptionist", "Phone answering", "Online bookings", "Online payments", "Website migration", "AI assistants for small businesses"],
    makesOffer: seo.PLANS.map((p) => ({
      "@type": "Offer",
      name: `${p.name} plan`,
      description: p.desc,
      price: p.price.replace("$", ""),
      priceCurrency: "AUD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.replace("$", ""), priceCurrency: "AUD", unitText: "MONTH" },
    })),
  };
}

// Sets the page-specific head tags on a copy of the built index.html.
function withHead(html, { title, description, url }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`);
}

async function prerender() {
  const { render, renderLanding, seo } = await import("../dist-ssr/entry-server.js");
  const template = readFileSync("dist/index.html", "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error("root div not found in dist/index.html");

  // Home page: hydrated in the browser.
  const home = template
    .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
    .replace("</head>", `${ld({
      "@context": "https://schema.org",
      "@graph": [
        business(seo),
        { "@type": "WebSite", "@id": `${SITE}#website`, url: SITE, name: "Oceanalt", inLanguage: "en-AU", publisher: { "@id": BUSINESS } },
        faqPage(`${SITE}#faq`, seo.FAQ),
      ],
    })}\n  </head>`);
  writeFileSync("dist/index.html", home);
  console.log(`prerender: / (${Math.round(home.length / 1024)} KB)`);

  // Service pages: static HTML, no app script (it would replace the page).
  const staticTemplate = template
    .replace(/\s*<script type="module"[^>]*><\/script>/g, "")
    .replace(/\s*<link rel="modulepreload"[^>]*>/g, "");
  for (const page of seo.LANDINGS) {
    const url = `${SITE}${page.slug}/`;
    const html = withHead(staticTemplate, { title: page.title, description: page.description, url })
      .replace('<div id="root"></div>', `<div id="root">${renderLanding(page.slug)}</div>`)
      .replace("</head>", `${ld({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: page.h1,
            description: page.description,
            url,
            provider: { "@id": BUSINESS },
            areaServed: { "@type": "Country", name: "Australia" },
            offers: { "@type": "AggregateOffer", priceCurrency: "AUD", lowPrice: "29", highPrice: "149" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: page.nav, item: url },
            ],
          },
          faqPage(`${url}#faq`, page.faq),
        ],
      })}\n  </head>`);
    mkdirSync(`dist/${page.slug}`, { recursive: true });
    writeFileSync(`dist/${page.slug}/index.html`, html);
    urls.push({ loc: url, priority: "0.8", images: [{ loc: new URL(page.image.src, SITE).href, title: page.image.alt }] });
  }
  console.log(`prerender: ${seo.LANDINGS.length} service pages`);
}

// lastmod is the date the site's content last changed in git, not the build
// date, so Google can trust it. Falls back to today if git isn't available.
function lastChanged() {
  try {
    const d = execSync("git log -1 --format=%cs -- src shared public", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

function sitemap() {
  const lastmod = lastChanged();
  const entry = (u) => [
    "  <url>",
    `    <loc>${esc(u.loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>monthly</changefreq>`,
    `    <priority>${u.priority}</priority>`,
    ...u.images.map((i) => `    <image:image><image:loc>${esc(i.loc)}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`),
    "  </url>",
  ].join("\n");
  writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(entry).join("\n")}
</urlset>
`);
}

try {
  await prerender();
} catch (error) {
  console.warn("prerender: skipped, the site will render in the browser instead. Reason:");
  console.warn(error);
}
try {
  sitemap();
  console.log(`prerender: sitemap.xml written (${urls.length} pages)`);
} catch (error) {
  console.warn("prerender: couldn't write sitemap.xml", error);
}
rmSync("dist-ssr", { recursive: true, force: true });
