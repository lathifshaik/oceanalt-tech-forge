import { Icon, type IconName } from "../components/Icon";
import { WORK } from "../App";
import { Arrow, Art, StaticFooter, StaticNav } from "./StaticChrome";

// /design/: Oceanalt's design practice, for established brands. Rendered to
// static HTML at build time (scripts/prerender.mjs), no JavaScript. The work
// shown is sample designs for fictional businesses, and the page says so.

export const DESIGN_PAGE = {
  title: "Design for Established Brands: Identity, Web and Product | Oceanalt",
  description: "How Oceanalt designs brand identities, websites and product screens for established Australian brands: one idea per screen, designed and built by the same people, never reused.",
};

const PRINCIPLES: { title: string; body: string }[] = [
  { title: "One idea per screen", body: "Each screen has one job. If a page is trying to say four things, we split it or cut it, so people find what they came for without hunting." },
  { title: "Designed and built by the same people", body: "The person who draws the screen builds it. Nothing is lost in a handover, and the details you signed off are the details that ship." },
  { title: "Made for you, never reused", body: "Every design starts from your brand and your customers. Once it's yours, we don't give it, or a recoloured copy of it, to anyone else." },
  { title: "Accessible and fast", body: "Readable type, real contrast, keyboard-friendly and quick on an ordinary phone connection. A design that some people can't use isn't finished." },
];

const PRACTICE: { name: string; icon: IconName; photo: string; line: string; points: string[]; href: string; more: string }[] = [
  {
    name: "Identity",
    icon: "svc-brand",
    photo: "/photos/brand.webp",
    line: "A mark, type and colour system that holds together from a phone screen to a shopfront.",
    points: ["Logo refresh or new mark", "Type, colour and layout system", "Guidelines and templates"],
    href: "/brand-identity/",
    more: "Brand identity service",
  },
  {
    name: "Websites",
    icon: "svc-web",
    photo: "/photos/websites.webp",
    line: "Sites designed around what customers came to do, then built by the same team.",
    points: ["Structure and copy", "Page design and components", "Built and tested in-house"],
    href: "/website-design-sydney/",
    more: "Website service",
  },
  {
    name: "Product and app UI",
    icon: "svc-software",
    photo: "/photos/software.webp",
    line: "Portals, dashboards and tools that staff and customers can use without a manual.",
    points: ["Flows and wireframes", "Interface design system", "Prototypes you can click through"],
    href: "/web-apps-and-software/",
    more: "Web apps and software",
  },
];

export function DesignPage() {
  const picks = [...WORK].filter((w) => w.designs.length).sort((a, b) => b.added.localeCompare(a.added)).slice(0, 6);
  const total = WORK.reduce((n, w) => n + w.designs.length, 0);
  return (
    <>
      <StaticNav current="/design/" />
      <main id="main" className="s-page sp">
        <section className="s-hero sp-hero" aria-labelledby="sp-h1">
          <div className="s-wrap s-hero-copy">
            <h1 id="sp-h1">Clear design for brands with a name to keep</h1>
            <p className="s-hero-sub">Identity, websites and product screens for established Australian brands. Designed and built by one small team in Sydney and Melbourne, and never reused for anyone else.</p>
            <div className="s-ctas">
              <a className="s-btn s-btn-ink" href="/#start">Start a project <Arrow /></a>
              <a className="s-btn s-btn-soft" href="#work">See sample work</a>
            </div>
          </div>
        </section>

        <section className="s-sec" aria-labelledby="sp-how">
          <div className="s-wrap s-split is-top">
            <div className="sp-sticky">
              <h2 id="sp-how" className="s-h2">Four rules we don't bend</h2>
              <p className="s-lede">Good design for an established brand is mostly restraint: keep what people already recognise, remove what gets in their way, and make the rest work properly.</p>
            </div>
            <ol className="sp-rules">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title}>
                  <span className="sp-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3>{p.title}</h3><p>{p.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="s-sec sp-band" aria-labelledby="sp-what">
          <div className="s-wrap">
            <h2 id="sp-what" className="s-h2 sp-h2-wide">Three kinds of work, one way of doing it</h2>
            <div className="sp-practice">
              {PRACTICE.map((p) => (
                <article key={p.name} className="sp-card">
                  <Art src={p.photo} icon={p.icon} />
                  <h3 className="s-svc-name">{p.name}</h3>
                  <p className="sp-card-line">{p.line}</p>
                  <ul className="sp-ticks">
                    {p.points.map((x) => <li key={x}><Icon name="check" /> {x}</li>)}
                  </ul>
                  <a className="sp-more" href={p.href}>{p.more} <Icon name="arrow-right" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="s-sec" aria-labelledby="sp-work">
          <div className="s-wrap">
            <div className="s-head-row">
              <div>
                <h2 id="sp-work" className="s-h2 sp-h2-gap">Sample designs, each made for one business</h2>
              </div>
              <a className="s-btn s-btn-soft" href="/designs/">See all {total} designs <Arrow /></a>
            </div>
            <ul className="sp-work">
              {picks.map((w) => {
                const d = w.designs[0];
                return (
                  <li key={d.path}>
                    <a href={`/work/${d.path}/`} target="_blank" rel="noopener">
                      <span className="sp-shot">
                        <img src={`/previews/${d.path}.webp`} alt={`${w.business}, ${d.theme} design`} width={1200} height={750} loading="lazy" decoding="async" />
                        <span className="sp-tag">Sample</span>
                      </span>
                      <span className="sp-meta"><b>{w.business.split(",")[0]}</b><small>{w.kind} · {d.theme}</small></span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="s-note">These are sample designs for fictional businesses, made to show our range. They aren't clients, and no results are claimed. A client's design is made for them and never reused.</p>
          </div>
        </section>
      </main>
      <StaticFooter label="Start a project" heading="Have a brand that deserves better design?" />
    </>
  );
}
