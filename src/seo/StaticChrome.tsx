import { Icon, type IconName } from "../components/Icon";
import { ABN, EMAIL, LogoMark, PHONE, PHONE_HREF } from "../App";
import { SERVICES } from "../studio/content";
import { LANDINGS } from "./landing";

// The nav and footer for the static, no-JavaScript pages (/design/, /designs/
// and the service pages). Same markup and classes as StudioNav and StudioFooter
// in src/studio/Studio.tsx, except the mobile menu is a <details> element so it
// opens without JavaScript, and the footer's services link to their own pages.

const LINKS: [string, string][] = [
  ["/#work", "Work"],
  ["/#services", "Services"],
  ["/design/", "Design"],
  ["/#studio", "Studio"],
  ["/#faq", "FAQ"],
];

export function Arrow() {
  return null; // plain pill buttons, no icon-in-a-circle
}

export function StaticNav({ current }: { current?: string }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="s-nav is-scrolled">
        <div className="s-wrap s-nav-row">
          <a className="s-logo" href="/" aria-label="Oceanalt home">
            <LogoMark />
            <span translate="no">oceanalt</span>
          </a>
          <nav className="s-nav-links" aria-label="Main">
            {LINKS.map(([href, label]) => <a key={label} href={href} aria-current={href === current ? "page" : undefined}>{label}</a>)}
          </nav>
          <a className="s-btn s-btn-ink s-nav-cta" href="/#start">Start a project</a>
          <details className="sp-burger">
            <summary><i /><i /><span className="sr">Menu</span></summary>
            <nav className="sp-menu" aria-label="Main">
              {LINKS.map(([href, label]) => <a key={label} href={href}>{label}</a>)}
              <a className="s-btn s-btn-ink" href="/#start">Start a project <Arrow /></a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

// The page's service links: each service with its own page goes there, the
// rest to the homepage's services row.
const serviceHref = (id: string) => {
  const page = LANDINGS.find((l) => l.service === id);
  return page ? `/${page.slug}/` : "/#services";
};

export function StaticFooter({ label = "Have something in mind?", heading = "Let's talk it through." }: { label?: string; heading?: string }) {
  return (
    <footer className="s-foot">
      <div className="s-wrap">
        <div className="s-foot-cta">
          <p className="s-label">{label}</p>
          <h2 className="s-h2">{heading}</h2>
          <a className="s-btn s-btn-white" href="/#start">Start a project <Arrow /></a>
        </div>
        <div className="s-foot-grid">
          <a className="s-foot-logo" href="/" aria-label="Oceanalt home"><LogoMark /><span translate="no">oceanalt</span></a>
          <nav aria-label="Studio">
            <p className="s-label">Studio</p>
            <a href="/#work">Work</a>
            <a href="/#services">Services</a>
            <a href="/design/">Design</a>
            <a href="/designs/">All designs</a>
            <a href="/#faq">FAQ</a>
          </nav>
          <nav aria-label="Services">
            <p className="s-label">Services</p>
            {SERVICES.map((s) => <a key={s.id} href={serviceHref(s.id)}>{s.name}</a>)}
            <a href="/website-rebuild/">Website rebuilds</a>
          </nav>
          <div>
            <p className="s-label">Contact</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={PHONE_HREF}>{PHONE}</a>
            <span>Sydney and Melbourne</span>
          </div>
        </div>
        <p className="s-ack">Oceanalt works on the lands of the Gadigal people of the Eora Nation in Sydney and the Wurundjeri Woi-wurrung people of the Kulin Nation in Melbourne. We pay our respects to their Elders past and present.</p>
        <div className="s-foot-base">
          <span>© {new Date().getFullYear()} Oceanalt · ABN {ABN}</span>
          <span><a href="/photos/CREDITS.md">Photo credits</a><a href="/#/terms">Terms</a><a href="/#/privacy">Privacy</a></span>
        </div>
      </div>
    </footer>
  );
}

// A photo panel with the service's glyph on top. These pages run no
// JavaScript, so React's onError can't hide a missing photo: the <img> is
// written as HTML with an inline onerror, and the glyph on a soft gradient
// shows on its own until the photo exists.
export function Art({ src, icon, className = "" }: { src: string; icon: IconName; className?: string }) {
  return (
    <div className={`sp-art ${className}`}>
      <span className="sp-art-img" dangerouslySetInnerHTML={{ __html: `<img src="${src}" alt="" width="1200" height="900" loading="lazy" decoding="async" onerror="this.hidden=true">` }} />
      <Icon name={icon} className="i s-svc-glyph" />
    </div>
  );
}
