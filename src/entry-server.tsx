// Server render used at build time by scripts/prerender.mjs: the home page
// (hydrated in the browser) and the static pages (/design/, /designs/ and the
// service pages, no JavaScript), so search engines and link previews get every
// page as plain HTML.
import { StrictMode } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import App, { ABN, EMAIL, PHONE } from "./App";
import { SERVICES, STUDIO_FAQ } from "./studio/content";
import { LANDINGS } from "./seo/landing";
import { LandingPage } from "./seo/LandingPage";
import { DESIGNS, DESIGNS_PAGE, DesignsPage } from "./seo/DesignsPage";
import { DESIGN_PAGE, DesignPage } from "./seo/DesignPage";

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}

export function renderLanding(slug: string) {
  const page = LANDINGS.find((l) => l.slug === slug);
  if (!page) throw new Error(`No service page "${slug}"`);
  return renderToStaticMarkup(<LandingPage page={page} />);
}

export function renderDesigns() {
  return renderToStaticMarkup(<DesignsPage />);
}

export function renderDesign() {
  return renderToStaticMarkup(<DesignPage />);
}

export const seo = { ABN, EMAIL, PHONE, FAQ: STUDIO_FAQ, SERVICES, LANDINGS, DESIGNS, DESIGNS_PAGE, DESIGN_PAGE };
