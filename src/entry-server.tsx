// Server render used at build time by scripts/prerender.mjs: the home page
// (hydrated in the browser) and the service pages (static, no JavaScript), so
// search engines and link previews get every page as plain HTML.
import { StrictMode } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import App, { ABN, EMAIL, FAQ, PLANS } from "./App";
import { LANDINGS } from "./seo/landing";
import { LandingPage } from "./seo/LandingPage";

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}

export function renderLanding(slug: string) {
  const page = LANDINGS.find((l) => l.slug === slug);
  if (!page) throw new Error(`No service page "${slug}"`);
  return renderToStaticMarkup(<LandingPage page={page} />);
}

export const seo = { ABN, EMAIL, FAQ, PLANS, LANDINGS };
