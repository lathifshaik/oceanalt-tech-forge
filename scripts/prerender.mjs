// After `vite build`: renders the home page and every service page to HTML,
// adds structured data and writes sitemap.xml, so each page is fully readable
// without JavaScript.
// If anything here fails, the build still succeeds: the home page works
// without pre-rendering (the browser renders it), so a prerender bug must never
// block a deploy. The error is printed in full so it shows in the host's log.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";

const SITE = "https://oceanalt.com.au/";
const BUSINESS = `${SITE}#business`;
const urls = [SITE];

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
    description: "Custom websites for Australian small businesses, designed, built and looked after for one monthly fee. Nothing upfront, live in 1 to 3 days.",
    address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", postalCode: "2037", addressCountry: "AU" },
    areaServed: [{ "@type": "City", name: "Sydney" }, { "@type": "Country", name: "Australia" }],
    taxID: seo.ABN,
    priceRange: "$29 to $149 a month",
    knowsAbout: ["Website design", "Small business websites", "Online bookings", "Online payments", "Website migration", "AI assistants for small businesses"],
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
    urls.push(url);
  }
  console.log(`prerender: ${seo.LANDINGS.length} service pages`);
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
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
