import { Icon } from "../components/Icon";
import { WORK } from "../App";
import { SiteFooter, SiteHeader } from "./LandingPage";

// /designs/: every design we've made, newest first, rendered to static HTML at
// build time (scripts/prerender.mjs). The filter is plain radio buttons and CSS
// (:has), so it works without JavaScript. New samples added to WORK in App.tsx
// show up here on the next build.

const CATS = [
  { id: "food", label: "Food and drink", layouts: ["cafe"] },
  { id: "trades", label: "Trades and home", layouts: ["trades"] },
  { id: "health", label: "Health and beauty", layouts: ["studio"] },
  { id: "fitness", label: "Fitness", layouts: [] },
  { id: "shops", label: "Shops", layouts: ["shop"] },
  { id: "pro", label: "Professional services", layouts: ["pro"] },
  { id: "learning", label: "Kids and learning", layouts: [] },
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
  title: "Our designs: websites for Australian small businesses | Oceanalt",
  description: `Every website design we've made so far, on sample businesses: cafés, restaurants, salons, gyms, tradies, clinics, shops and professionals. ${DESIGNS.length} designs and counting.`,
};

export function DesignsPage() {
  const newest = DESIGNS[0].added;
  const styles = new Set(DESIGNS.map((d) => d.theme.split(",")[0])).size;
  const start = "/?plan=launch#start";
  return (
    <>
      <SiteHeader start={start} cta="Start my website" />
      <main id="main" className="lp dz">
        <div className="wrap">
          <nav className="lp-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">Designs</span>
          </nav>
          <div className="dz-head">
            <h1>Our designs</h1>
            <p>Every design we've made so far, shown on sample businesses. We keep adding new ones, so this page keeps growing.</p>
            <p>See one you like? Tell us, and we use it as the starting point for yours: your words, your photos, your colours. Once it's yours, we don't give the same design to anyone else.</p>
            <ul className="dz-stats">
              <li><b className="num">{DESIGNS.length}</b> designs</li>
              <li><b className="num">{WORK.length}</b> sample businesses</li>
              <li><b className="num">{styles}</b> styles</li>
              <li>Last added <b>{longDate(newest)}</b></li>
            </ul>
          </div>

          <fieldset className="dz-filter">
            <legend className="sr">Show designs for</legend>
            <input type="radio" name="dz" id="dz-all" className="sr" defaultChecked />
            <label htmlFor="dz-all">All <span className="num">{DESIGNS.length}</span></label>
            {CATS.map((c) => (
              <span key={c.id} className="dz-opt">
                <input type="radio" name="dz" id={`dz-${c.id}`} className="sr" />
                <label htmlFor={`dz-${c.id}`}>{c.label} <span className="num">{DESIGNS.filter((d) => d.cat === c.id).length}</span></label>
              </span>
            ))}
          </fieldset>

          <ul className="dz-grid">
            {DESIGNS.map((d) => (
              <li key={d.path} className="dz-card" data-cat={d.cat}>
                <a href={`/work/${d.path}/`} target="_blank" rel="noopener">
                  <span className="dz-img">
                    <img src={`/previews/${d.path}.webp`} alt={`${d.business}, ${d.theme} design`} width={1200} height={750} loading="lazy" />
                    {d.added === newest && <span className="dz-new">New</span>}
                    <span className="dz-open" aria-hidden="true"><Icon name="arrow-up-right" /></span>
                  </span>
                  <span className="dz-meta">
                    <b>{d.business}</b>
                    <small>{d.kind} · {d.theme}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="lp-note">Every business on this page is a sample we made up to show the designs. They aren't clients, and no results are claimed.</p>
        </div>

        <section className="lp-sec lp-end">
          <div className="wrap">
            <h2 className="h2">Don't see your kind of business?</h2>
            <p className="lede">We design for any small business, and new designs go up here as we make them. Send a short form and a person replies the same business day.</p>
            <a className="btn btn-primary btn-island" href={start}>Start my website <span className="btn-i"><Icon name="arrow-up-right" /></span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
