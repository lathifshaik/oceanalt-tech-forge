import { Icon } from "../components/Icon";
import { WORK } from "../App";
import { SERVICES } from "../studio/content";
import { LANDINGS, type Landing } from "./landing";
import { Arrow, Art, StaticFooter, StaticNav } from "./StaticChrome";

// Lower-cases a service name mid-sentence, keeping "AI" as is.
const lc = (s: string) => (s.startsWith("AI") ? s : s[0].toLowerCase() + s.slice(1));

// A service page, rendered to static HTML at build time (scripts/prerender.mjs).
// No JavaScript runs on these pages, so everything here is plain links, and the
// FAQ uses <details>. No prices: every project is quoted after a call.
export function LandingPage({ page }: { page: Landing }) {
  const svc = SERVICES.find((s) => s.id === page.service)!;
  const samples = (page.examples ?? [])
    .map((path) => {
      const w = WORK.find((x) => x.designs.some((d) => d.path === path));
      const d = w?.designs.find((x) => x.path === path);
      return w && d ? { path, business: w.business, kind: w.kind, theme: d.theme } : null;
    })
    .filter((x) => x !== null);
  const others = LANDINGS.filter((l) => l.slug !== page.slug);
  return (
    <>
      <StaticNav />
      <main id="main" className="s-page sp">
        <section className="s-sec sp-svc-hero" aria-labelledby="sp-h1">
          <div className="s-wrap">
            <nav className="sp-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/#services">Services</a> <span aria-hidden="true">/</span> <span aria-current="page">{page.nav}</span>
            </nav>
            <div className="s-split">
              <div>
                <h1 id="sp-h1" className="sp-h1">{page.h1}</h1>
                <p className="s-lede">{page.intro}</p>
                <div className="sp-ctas">
                  <a className="s-btn s-btn-ink" href="/#start">Start a project <Arrow /></a>
                  <a className="s-btn s-btn-soft" href="/design/">How we design</a>
                </div>
              </div>
              <Art src={svc.photo} icon={svc.icon} className="sp-art-tall" />
            </div>
          </div>
        </section>

        <section className="s-sec sp-band" aria-labelledby="sp-offer">
          <div className="s-wrap">
            <h2 id="sp-offer" className="s-h2 sp-h2-wide">What we do for you</h2>
            <ul className="sp-offers">
              {page.offers.map((o, i) => (
                <li key={o.title}>
                  <span className="sp-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="s-sec" aria-labelledby="sp-approach">
          <div className="s-wrap s-split is-top">
            <div>
              <h2 id="sp-approach" className="s-h2">{page.approach.h2}</h2>
            </div>
            <div className="sp-prose">
              {page.approach.body.map((b) => <p key={b}>{b}</p>)}
              <ul className="sp-ticks">
                <li><Icon name="check" /> A written scope and a fixed quote before work starts</li>
                <li><Icon name="check" /> One team designs it, builds it and looks after it</li>
                <li><Icon name="check" /> Customer data stored in Australia</li>
              </ul>
            </div>
          </div>
        </section>

        {samples.length > 0 && (
          <section className="s-sec sp-tight" aria-labelledby="sp-samples">
            <div className="s-wrap">
              <div className="s-head-row">
                <div>
                  <h2 id="sp-samples" className="s-h2 sp-h2-gap">Designs made to show the range</h2>
                </div>
                <a className="s-btn s-btn-soft" href="/designs/">All designs <Arrow /></a>
              </div>
              <ul className="sp-work is-three">
                {samples.map((s) => (
                  <li key={s.path}>
                    <a href={`/work/${s.path}/`} target="_blank" rel="noopener">
                      <span className="sp-shot">
                        <img src={`/previews/${s.path}.webp`} alt={`${s.business}, ${s.theme} design`} width={1200} height={750} loading="lazy" decoding="async" />
                        <span className="sp-tag">Sample</span>
                      </span>
                      <span className="sp-meta"><b>{s.business.split(",")[0]}</b><small>{s.kind} · {s.theme}</small></span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="s-note">Sample designs for fictional businesses. They aren't clients, and no results are claimed.</p>
            </div>
          </section>
        )}

        <section className="s-sec s-faq" aria-labelledby="sp-faq">
          <div className="s-wrap s-split is-top">
            <div>
              <h2 id="sp-faq" className="s-h2">Questions about {lc(page.nav)}</h2>
            </div>
            <div className="s-faq-list">
              {page.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<span className="s-plus" aria-hidden="true"><Icon name="plus" /></span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="s-sec sp-tight sp-others" aria-labelledby="sp-others">
          <div className="s-wrap">
            <h2 className="sp-others-h" id="sp-others">More from the studio</h2>
            <ul>
              {others.map((l) => (
                <li key={l.slug}><a href={`/${l.slug}/`}>{l.nav}<span className="sp-others-i" aria-hidden="true"><Icon name="arrow-up-right" /></span></a></li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <StaticFooter label="Start a project" heading={`Talk to us about ${lc(page.nav)}.`} />
    </>
  );
}
