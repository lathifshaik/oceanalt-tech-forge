// After `vite build`: renders the home page to HTML, adds structured data and
// writes sitemap.xml, so the page is fully readable without JavaScript.
import { readFileSync, writeFileSync, rmSync } from "node:fs";

const SITE = "https://oceanalt.com.au/";
const { render, seo } = await import("../dist-ssr/entry-server.js");

const plans = seo.PLANS.map((p) => ({
  "@type": "Offer",
  name: `${p.name} plan`,
  description: p.desc,
  price: p.price.replace("$", ""),
  priceCurrency: "AUD",
  priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.replace("$", ""), priceCurrency: "AUD", unitText: "MONTH" },
}));

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}#business`,
      name: "Oceanalt",
      url: SITE,
      logo: `${SITE}apple-touch-icon.png`,
      image: `${SITE}og-image.png`,
      email: seo.EMAIL,
      description: "Custom websites for Australian small businesses, designed, built and looked after for one monthly fee. Nothing upfront, live in 1 to 3 days.",
      address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", postalCode: "2037", addressCountry: "AU" },
      areaServed: { "@type": "Country", name: "Australia" },
      taxID: seo.ABN,
      priceRange: "$29 to $149 a month",
      knowsAbout: ["Website design", "Small business websites", "Online bookings", "Online payments", "AI assistants for small businesses"],
      makesOffer: plans,
    },
    { "@type": "WebSite", "@id": `${SITE}#website`, url: SITE, name: "Oceanalt", inLanguage: "en-AU", publisher: { "@id": `${SITE}#business` } },
    {
      "@type": "FAQPage",
      "@id": `${SITE}#faq`,
      mainEntity: seo.FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const file = "dist/index.html";
let html = readFileSync(file, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("prerender: root div not found");
html = html
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace("</head>", `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>\n  </head>`);
writeFileSync(file, html);

const today = new Date().toISOString().slice(0, 10);
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}</loc><lastmod>${today}</lastmod></url>
</urlset>
`);
rmSync("dist-ssr", { recursive: true, force: true });
console.log(`prerender: ${Math.round(html.length / 1024)} KB index.html, sitemap.xml written`);
