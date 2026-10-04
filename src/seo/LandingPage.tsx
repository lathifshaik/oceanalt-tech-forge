import { Icon } from "../components/Icon";
import { ABN, EMAIL, LogoMark, PLANS } from "../App";
import { LANDINGS, type Landing } from "./landing";

// A service page, rendered to static HTML at build time (scripts/prerender.mjs).
// No JavaScript runs on these pages, so everything here is plain links.
export function LandingPage({ page }: { page: Landing }) {
  const start = `/?plan=${page.plan}#start`;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav is-scrolled">
        <div className="nav-pill">
          <a className="logo" href="/" aria-label="Oceanalt home"><LogoMark /><span translate="no">oceanalt</span></a>
          <nav className="nav-links" aria-label="Main">
            <a href="/#work">Work</a>
            <a href="/#ai">AI</a>
            <a href="/#how">How it works</a>
            <a href="/#pricing">Pricing</a>
          </nav>
          <a className="btn btn-primary nav-cta lp-nav-cta" href={start}>Start my website</a>
        </div>
      </header>

      <main id="main" className="lp">
        <div className="wrap">
          <nav className="lp-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">{page.nav}</span>
          </nav>
          <div className="lp-hero">
            <div>
              <h1>{page.h1}</h1>
              <p>{page.intro}</p>
              <div className="ctas">
                <a className="btn btn-primary btn-island" href={start}>Start my website <span className="btn-i"><Icon name="arrow-up-right" /></span></a>
                {page.example && <a className="text-link" href={`/work/${page.example.path}/`}>See {page.example.label} <Icon name="arrow-right" /></a>}
              </div>
            </div>
            <img src={page.image.src} alt={page.image.alt} width={1200} height={750} />
          </div>
        </div>

        <section className="lp-sec">
          <div className="wrap">
            <h2 className="h2">What your site includes</h2>
            <ul className="lp-includes">
              {page.includes.map((x) => <li key={x}><Icon name="check" /> {x}</li>)}
            </ul>
          </div>
        </section>

        {page.sections.map((s) => (
          <section className="lp-sec lp-text" key={s.h2}>
            <div className="wrap">
              <h2 className="h2">{s.h2}</h2>
              <div>{s.body.map((b) => <p key={b}>{b}</p>)}</div>
            </div>
          </section>
        ))}

        <section className="lp-sec">
          <div className="wrap">
            <h2 className="h2">Plans</h2>
            <ul className="lp-plans">
              {PLANS.map((p) => (
                <li key={p.id} className={p.id === page.plan ? "is-on" : ""}>
                  <b>{p.name}</b>
                  <span className="num"><strong>{p.price}</strong>/month</span>
                  <small>{p.desc}</small>
                </li>
              ))}
            </ul>
            <p className="lp-note">Prices in AUD, nothing upfront. Launch and Grow have a 12-month minimum; after that the site is yours to keep. <a className="link" href="/#pricing">Full plan details</a>.</p>
          </div>
        </section>

        <section className="lp-sec faq">
          <div className="wrap">
            <h2 className="h2">Questions</h2>
            <div className="faq-list">
              {page.faq.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}<span className="faq-x" aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec lp-end">
          <div className="wrap">
            <h2 className="h2">Tell us about your business.</h2>
            <p className="lede">A short form. You'll hear back within 15 minutes with a suggested plan, and nothing is charged until you've seen your site.</p>
            <a className="btn btn-primary btn-island" href={start}>Start my website <span className="btn-i"><Icon name="arrow-up-right" /></span></a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-row">
            <span>© {new Date().getFullYear()} Oceanalt, Sydney · ABN {ABN}</span>
            <nav aria-label="Footer">
              <a href="/#work">Work</a>
              <a href="/#pricing">Pricing</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href="/#/terms">Terms</a>
              <a href="/#/privacy">Privacy</a>
            </nav>
          </div>
          <nav className="foot-services" aria-label="Who we build for">
            {LANDINGS.map((l) => <a key={l.slug} href={`/${l.slug}/`} aria-current={l.slug === page.slug ? "page" : undefined}>{l.nav}</a>)}
          </nav>
          <p className="foot-word" aria-hidden="true" translate="no">oceanalt</p>
        </div>
      </footer>
    </>
  );
}
