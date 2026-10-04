// Server render of the home page, used at build time by scripts/prerender.mjs
// so search engines and link previews get the full page as plain HTML.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App, { ABN, EMAIL, FAQ, PLANS } from "./App";

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}

export const seo = { ABN, EMAIL, FAQ, PLANS };
