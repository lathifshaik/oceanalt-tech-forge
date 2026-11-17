// After `vite build`: renders the home page, /design/, /designs/ and every
// service page to HTML,
// adds structured data and writes sitemap.xml, so each page is fully readable
// without JavaScript.
// If anything here fails, the build still succeeds: the home page works
// without pre-rendering (the browser renders it), so a prerender bug must never
// block a deploy. The error is printed in full so it shows in the host's log.
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";

const SITE = "https://oceanalt.com.au/";
const BUSINESS = `${SITE}#business`;
// Sitemap entries. Images are listed too, so they can show up in image search.
const urls = [{
  loc: SITE,
  priority: "1.0",
  images: [
    { loc: `${SITE}og-image.png`, title: "Oceanalt, a design and technology studio in Sydney and Melbourne" },
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
    telephone: seo.PHONE ? "+61 " + seo.PHONE.replace(/^0/, "") : undefined,
    description: "A Sydney and Melbourne design and technology studio for established Australian brands: brand identity, websites, web apps and software, AI agents, and search and AI visibility, designed, built and looked after by one team. Every project is quoted after a call.",
    address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", postalCode: "2037", addressCountry: "AU" },
    areaServed: [{ "@type": "City", name: "Sydney" }, { "@type": "City", name: "Melbourne" }, { "@type": "Country", name: "Australia" }],
    taxID: seo.ABN,
    founder: { "@type": "Person", name: "Lathif Shaik" },
    knowsAbout: ["Brand identity design", "Website design", "Website development", "Website migration", "Web application development", "Custom software", "Systems integration", "AI agents", "Technical SEO", "Google Business Profile", "AI search visibility", "Accessibility"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Studio services",
      itemListElement: seo.LANDINGS.map((l) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: l.nav, url: `${SITE}${l.slug}/` } })),
    },
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
  const { render, renderLanding, renderDesigns, renderDesign, seo } = await import("../dist-ssr/entry-server.js");
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
            serviceType: page.nav,
            areaServed: { "@type": "Country", name: "Australia" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}#services` },
              { "@type": "ListItem", position: 3, name: page.nav, item: url },
            ],
          },
          faqPage(`${url}#faq`, page.faq),
        ],
      })}\n  </head>`);
    mkdirSync(`dist/${page.slug}`, { recursive: true });
    writeFileSync(`dist/${page.slug}/index.html`, html);
    // The service photo, once it's in public/photos/.
    const photo = seo.SERVICES.find((s) => s.id === page.service)?.photo;
    urls.push({ loc: url, priority: "0.8", images: photo && existsSync(`dist${photo}`) ? [{ loc: new URL(photo, SITE).href, title: page.nav }] : [] });
  }
  console.log(`prerender: ${seo.LANDINGS.length} service pages`);

  // The design practice page.
  {
    const url = `${SITE}design/`;
    const html = withHead(staticTemplate, { ...seo.DESIGN_PAGE, url })
      .replace('<div id="root"></div>', `<div id="root">${renderDesign()}</div>`)
      .replace("</head>", `${ld({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#page`,
            name: "Design at Oceanalt",
            description: seo.DESIGN_PAGE.description,
            url,
            inLanguage: "en-AU",
            publisher: { "@id": BUSINESS },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Design", item: url },
            ],
          },
        ],
      })}\n  </head>`);
    mkdirSync("dist/design", { recursive: true });
    writeFileSync("dist/design/index.html", html);
    urls.push({ loc: url, priority: "0.9", images: seo.DESIGNS.slice(0, 6).map((d) => ({ loc: `${SITE}previews/${d.path}.webp`, title: `${d.business}, ${d.theme} sample design` })) });
    console.log("prerender: /design/");
  }

  // The designs page: every sample design, newest first.
  {
    const url = `${SITE}designs/`;
    const html = withHead(staticTemplate, { ...seo.DESIGNS_PAGE, url })
      .replace('<div id="root"></div>', `<div id="root">${renderDesigns()}</div>`)
      .replace("</head>", `${ld({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${url}#page`,
            name: "Sample designs",
            description: seo.DESIGNS_PAGE.description,
            url,
            publisher: { "@id": BUSINESS },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Designs", item: url },
            ],
          },
        ],
      })}\n  </head>`);
    mkdirSync("dist/designs", { recursive: true });
    writeFileSync("dist/designs/index.html", html);
    urls.push({ loc: url, priority: "0.8", images: seo.DESIGNS.slice(0, 12).map((d) => ({ loc: `${SITE}previews/${d.path}.webp`, title: `${d.business}, ${d.theme} sample design` })) });
    console.log(`prerender: /designs/ (${seo.DESIGNS.length} designs)`);
  }
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
