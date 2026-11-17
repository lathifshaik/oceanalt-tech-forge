import { Icon } from "../components/Icon";
import { WORK } from "../App";
import { Arrow, StaticFooter, StaticNav } from "./StaticChrome";

// /designs/: every sample design, newest first, rendered to static HTML at
// build time (scripts/prerender.mjs). The filter is plain radio buttons and CSS
// (:has), so it works without JavaScript. New samples added to WORK in App.tsx
// show up here on the next build, and the newest get the New badge.

const CATS = [
  { id: "food", label: "Food and drink", layouts: ["cafe"] },
  { id: "trades", label: "Trades and home", layouts: ["trades"] },
  { id: "health", label: "Health and beauty", layouts: ["studio"] },
  { id: "fitness", label: "Fitness", layouts: [] },
  { id: "shops", label: "Retail", layouts: ["shop"] },
  { id: "pro", label: "Professional services", layouts: ["pro"] },
  { id: "learning", label: "Education", layouts: [] },
  { id: "pets", label: "Pets", layouts: [] },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return `${day} ${MONTHS[m - 1]} ${y}`;
};

export const DESIGNS = WORK.flatMap((w) =>
  w.designs.map((d) => ({
    ...d,
    business: w.business,
    kind: w.kind,
    added: w.added,
    // A sample can set its own group; otherwise its layout decides.
    cat: w.group ?? CATS.find((c) => c.layouts.includes(w.id))!.id,
  })),
).sort((a, b) => b.added.localeCompare(a.added));

export const DESIGNS_PAGE = {
  title: "Sample Designs: Websites Made for One Business Each | Oceanalt",
  description: `Every sample website design from Oceanalt's Sydney studio, newest first: hospitality, retail, health, professional services and more. ${DESIGNS.length} designs, each made for one business.`,
};

export function DesignsPage() {
  const newest = DESIGNS[0].added;
  const styles = new Set(DESIGNS.map((d) => d.theme.split(",")[0])).size;
  return (
    <>
      <StaticNav />
      <main id="main" className="s-page sp sp-dz">
        <section className="s-hero sp-hero" aria-labelledby="sp-h1">
          <div className="s-wrap s-hero-copy">
            <p className="s-kicker"><span className="s-dot" aria-hidden="true" /> Sample designs</p>
            <h1 id="sp-h1">Every design, newest first</h1>
            <p className="s-hero-sub">Website designs made for fictional businesses, to show the range of what we draw and build. A client's design is made for them and never reused.</p>
            <ul className="sp-stats">
              <li><b>{DESIGNS.length}</b> designs</li>
              <li><b>{WORK.length}</b> sample businesses</li>
              <li><b>{styles}</b> styles</li>
              <li>Last added <b>{longDate(newest)}</b></li>
            </ul>
          </div>
        </section>

        <section className="s-sec sp-gallery" aria-label="Designs">
          <div className="s-wrap">
            <fieldset className="sp-filter">
              <legend className="sr">Show designs for</legend>
              <span className="sp-opt">
                <input type="radio" name="dz" id="dz-all" className="sr" defaultChecked />
                <label htmlFor="dz-all">All <span>{DESIGNS.length}</span></label>
              </span>
              {CATS.map((c) => (
                <span key={c.id} className="sp-opt">
                  <input type="radio" name="dz" id={`dz-${c.id}`} className="sr" />
                  <label htmlFor={`dz-${c.id}`}>{c.label} <span>{DESIGNS.filter((d) => d.cat === c.id).length}</span></label>
                </span>
              ))}
            </fieldset>

            <ul className="sp-grid">
              {DESIGNS.map((d) => (
                <li key={d.path} className="sp-cell" data-cat={d.cat}>
                  <a href={`/work/${d.path}/`} target="_blank" rel="noopener">
                    <span className="sp-shot">
                      <img src={`/previews/${d.path}.webp`} alt={`${d.business}, ${d.theme} design`} width={1200} height={750} loading="lazy" decoding="async" />
                      {d.added === newest && <span className="sp-new">New</span>}
                      <span className="sp-open" aria-hidden="true"><Icon name="arrow-up-right" /></span>
                    </span>
                    <span className="sp-meta"><b>{d.business}</b><small>{d.kind} · {d.theme}</small></span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="s-note">Every business on this page is a sample we made up to show the designs. They aren't clients, and no results are claimed.</p>
            <a className="s-btn s-btn-soft sp-gap" href="/design/">How we design <Arrow /></a>
          </div>
        </section>
      </main>
      <StaticFooter label="Don't see your kind of business?" heading="Every design starts from your brand." />
    </>
  );
}
