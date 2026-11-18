import { Icon } from "../components/Icon";
import { WORK } from "../App";
import { Arrow, StaticFooter, StaticNav } from "./StaticChrome";

// /designs/: every sample design, filed like a record shop. Each design is a
// "record": its preview is the cover, the business and style are the title and
// artist. Crates group them by kind of business; the wall shows them all,
// newest first. Rendered to static HTML at build time (scripts/prerender.mjs):
// without JavaScript every cover links straight to the live design and the
// crates/wall switch is two radio buttons and CSS (:has). /crate.js (public/)
// adds the lift-out panel, Shuffle and the keyboard. New samples added to WORK
// in App.tsx show up here on the next build, and the newest get the New badge.

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
    cat: w.group ?? CATS.find((c) => c.layouts.includes(w.id))?.id ?? "pro",
  })),
).sort((a, b) => b.added.localeCompare(a.added));

export const DESIGNS_PAGE = {
  title: "Sample Designs: Websites Made for One Business Each | Oceanalt",
  description: `Every sample website design from Oceanalt's Sydney studio, newest first: hospitality, retail, health, professional services and more. ${DESIGNS.length} designs, each made for one business.`,
};

type Design = (typeof DESIGNS)[number];

// "Little Tern Coffee, Fremantle" -> "Little Tern Coffee" for the cover line.
const shortName = (b: string) => b.split(",")[0];

// Cafe, Restaurant, Bakery and 9 more: what's in a crate, in plain words.
function kindsLine(items: Design[]) {
  const kinds = [...new Set(items.map((d) => d.kind))];
  if (kinds.length <= 4) return kinds.join(", ");
  return `${kinds.slice(0, 3).join(", ")} and ${kinds.length - 3} more`;
}

function Record({ d, newest, list, eager }: { d: Design; newest: string; list: string; eager?: boolean }) {
  const i = DESIGNS.indexOf(d);
  return (
    <li className="sp-rec">
      <a href={`/work/${d.path}/`} target="_blank" rel="noopener" data-i={i} data-list={list}>
        <span className="sp-cover">
          <img src={`/previews/${d.path}.webp`} alt="" width={1200} height={750} loading={eager ? "eager" : "lazy"} decoding="async" />
          {d.added === newest && <span className="sp-new">New</span>}
        </span>
        <span className="sp-rec-t">
          <b>{shortName(d.business)}</b>
          <small><span className="sr">{d.kind}, </span>{d.theme}</small>
        </span>
      </a>
    </li>
  );
}

export function DesignsPage() {
  const newest = DESIGNS[0].added;
  const styles = new Set(DESIGNS.map((d) => d.theme.split(",")[0])).size;
  const crates = CATS.map((c) => ({ ...c, items: DESIGNS.filter((d) => d.cat === c.id) })).filter((c) => c.items.length);
  // What /crate.js needs to fill the lift-out panel, in DESIGNS order.
  const data = {
    crates: Object.fromEntries(crates.map((c) => [c.id, c.label])),
    designs: DESIGNS.map((d) => ({ p: d.path, b: d.business, k: d.kind, t: d.theme, c: d.cat })),
  };
  return (
    <>
      <StaticNav />
      <main id="main" className="s-page sp sp-dz">
        <section className="s-hero sp-hero" aria-labelledby="sp-h1">
          <div className="s-wrap s-hero-copy">
            <h1 id="sp-h1">Flick through the crates</h1>
            <p className="s-hero-sub">Website designs we made for fictional businesses, filed by trade. Pick one up for a closer look, or open it and click around. A client's design is made for them and never reused.</p>
            <ul className="sp-stats">
              <li><b>{DESIGNS.length}</b> designs</li>
              <li><b>{WORK.length}</b> sample businesses</li>
              <li><b>{styles}</b> styles</li>
              <li>Last added <b>{longDate(newest)}</b></li>
            </ul>
          </div>
        </section>

        <section className="sp-shop" aria-label="Designs">
          <input type="radio" name="sp-view" id="sp-v-crates" className="sr" defaultChecked />
          <input type="radio" name="sp-view" id="sp-v-wall" className="sr" />
          <div className="s-wrap sp-bar">
            <div className="sp-views" role="group" aria-label="Show designs">
              <label htmlFor="sp-v-crates">In crates</label>
              <label htmlFor="sp-v-wall">All, newest first</label>
            </div>
            <button type="button" className="s-btn s-btn-ink sp-dig" hidden>Shuffle</button>
          </div>

          <div className="sp-crates">
            {crates.map((c, ci) => (
              <section key={c.id} className="sp-crate" id={`crate-${c.id}`} aria-labelledby={`crate-${c.id}-h`}>
                <div className="s-wrap sp-crate-head">
                  <p className="sp-crate-n" aria-hidden="true">{c.items.length}</p>
                  <div className="sp-crate-t">
                    <h2 id={`crate-${c.id}-h`}>{c.label}<span className="sr">, {c.items.length} designs</span></h2>
                    <p>{kindsLine(c.items)}</p>
                  </div>
                  <div className="sp-flick" hidden>
                    <button type="button" data-dir="-1" aria-label={`Flick back through ${c.label}`}><Icon name="arrow-right" className="i sp-flip" /></button>
                    <button type="button" data-dir="1" aria-label={`Flick forward through ${c.label}`}><Icon name="arrow-right" /></button>
                  </div>
                </div>
                <ul className="sp-row">
                  {c.items.map((d, k) => <Record key={d.path} d={d} newest={newest} list={c.id} eager={ci === 0 && k < 6} />)}
                </ul>
              </section>
            ))}
          </div>

          <div className="s-wrap sp-wall-wrap">
            <h2 className="sr">All designs, newest first</h2>
            <ul className="sp-wall">
              {DESIGNS.map((d) => <Record key={d.path} d={d} newest={newest} list="all" />)}
            </ul>
          </div>

          <div className="s-wrap">
            <p className="s-note sp-honest">Every business on this page is a sample we made up to show the designs. They aren't clients, and no results are claimed.</p>
            <a className="s-btn s-btn-soft sp-gap" href="/design/">How we design <Arrow /></a>
          </div>
        </section>

        {/* The lift-out panel. Empty and closed until /crate.js fills it. */}
        <dialog className="sp-lift" aria-labelledby="sp-lift-h">
          <div className="sp-lift-in">
            <button type="button" className="sp-lift-x" aria-label="Put it back"><Icon name="plus" /></button>
            <div className="sp-stage">
              <div className="sp-deck">
                <div className="sp-disc" aria-hidden="true">
                  <img alt="" width={1200} height={750} />
                  <span className="sp-label"><b /><small /></span>
                </div>
                <div className="sp-sleeve"><img alt="" width={1200} height={750} /></div>
              </div>
            </div>
            <div className="sp-lift-info">
              <h2 id="sp-lift-h" tabIndex={-1} />
              <p className="sp-lift-kind" />
              <dl className="sp-lift-dl">
                <div><dt>Style</dt><dd data-f="theme" /></div>
                <div><dt>Crate</dt><dd data-f="crate" /></div>
              </dl>
              <a className="sp-lift-shot" target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true"><img alt="" width={1200} height={750} /></a>
              <a className="s-btn s-btn-ink sp-lift-go" target="_blank" rel="noopener">Open the live design</a>
              <div className="sp-lift-more">
                <h3>Same business, other designs</h3>
                <ul />
              </div>
              <div className="sp-lift-nav">
                <button type="button" data-step="-1" aria-label="Previous record"><Icon name="arrow-right" className="i sp-flip" /></button>
                <p aria-live="polite" />
                <button type="button" data-step="1" aria-label="Next record"><Icon name="arrow-right" /></button>
              </div>
            </div>
          </div>
        </dialog>
        <script type="application/json" id="sp-crate-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
        <script src="/crate.js" defer />
      </main>
      <StaticFooter label="Don't see your kind of business?" heading="Every design starts from your brand." />
    </>
  );
}
