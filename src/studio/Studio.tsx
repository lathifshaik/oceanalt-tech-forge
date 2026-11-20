import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon, type IconName } from "../components/Icon";
import { ABN, EMAIL, FOUNDER, LogoMark, PHONE, PHONE_HREF, WORK } from "../App";
import { NEEDS, SERVICES, STEPS, STUDIO_FAQ, WHY } from "./content";
import "./studio.css";

// The studio homepage. Layout learned from premium studios (docs/design/STUDIO_STUDY.md):
// a centred statement, real work straight after it, services you can swipe through,
// one idea per section, and a dark band for the work.

const FOUNDER_PHOTO = "/team/lathif.webp";

// The samples that read most like an established brand lead the strip and the
// work band. The rest stay on /designs/.
const FEATURED = [
  "fenwick-hale", "corella-hotels", "calloway-day-surgery", "calder-and-ames", "tallowwood-home", "torrens-and-pike",
  "small-spaces-architects", "ridgeline-wines", "willow-and-arch", "twist-design-studio", "velvet-hour",
  "harlow-reid-lawyers", "saltbush-norwood", "golden-hour-weddings", "still-water-float", "kumo-sushi",
  "gable-and-co", "ochre-skin-co", "wide-eyes-art-studio", "hillside-orchard-market",
];
// A function, not a constant: App.tsx imports this file, so WORK isn't ready
// while this module first loads.
const getFeatured = () => FEATURED.flatMap((path) => {
  const w = WORK.find((x) => x.designs.some((d) => d.path === path));
  const d = w?.designs.find((x) => x.path === path);
  return w && d ? [{ w, d }] : [];
});

// Service pages (src/seo/landing.ts). Care has no page of its own.
const SERVICE_PAGE: Record<string, string> = {
  brand: "/brand-identity/", websites: "/website-design-sydney/", software: "/web-apps-and-software/",
  ai: "/ai-agents/", search: "/search-and-ai-visibility/",
  voice: "/voice-agents-and-audio/", payments: "/payments/", automation: "/workflow-automation/",
};

// Photos that fail (or aren't in yet) stay hidden instead of showing a broken icon.
// The ref covers images that finished loading before hydration.
const showWhenLoaded = {
  onLoad: (e: { currentTarget: HTMLImageElement }) => e.currentTarget.classList.add("is-loaded"),
  ref: (el: HTMLImageElement | null) => { if (el?.complete && el.naturalWidth) el.classList.add("is-loaded"); },
};

// Fades a section's children up as it scrolls into view. Off for reduced motion.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("is-in");
        io.disconnect();
      }
    }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Plain pill buttons: no icon-in-a-circle (a stock AI-site pattern, founder 17 Nov 2026).
function Arrow() {
  return null;
}

export function StudioNav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("s-locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("s-locked");
    };
  }, [open]);
  const base = home ? "" : "/";
  const links: [string, string][] = [
    [`${base}#work`, "Work"],
    [`${base}#services`, "Services"],
    ["/design/", "Design"],
    [`${base}#studio`, "Studio"],
    [`${base}#faq`, "FAQ"],
  ];
  return (
    <header className={`s-nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="s-wrap s-nav-row">
        <a className="s-logo" href={home ? "#top" : "/"} aria-label="Oceanalt home">
          <LogoMark />
          <span translate="no">oceanalt</span>
        </a>
        <nav className="s-nav-links" aria-label="Main">
          {links.map(([href, label]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="s-btn s-btn-ink s-nav-cta" href={`${base}#start`}>Start a project</a>
        <button className="s-burger" type="button" aria-expanded={open} aria-controls="s-menu" onClick={() => setOpen((o) => !o)}>
          <i /><i />
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <nav id="s-menu" className="s-menu" aria-label="Main" hidden={!open}>
        {links.map(([href, label], i) => (
          <a key={label} href={href} style={{ transitionDelay: `${80 + i * 50}ms` }} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="s-btn s-btn-ink" href={`${base}#start`} onClick={() => setOpen(false)}>Start a project <Arrow /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="s-hero" aria-labelledby="s-hero-h">
      <div className="s-wrap s-hero-copy">
        <h1 id="s-hero-h">We design and build what your brand runs on</h1>
        <p className="s-hero-sub">Brand, websites, software, AI agents and automation from one studio. The people who design it are the people who build it, and they're still here after launch.</p>
        <div className="s-ctas">
          <a className="s-btn s-btn-ink" href="#start">Start a project <Arrow /></a>
          <a className="s-btn s-btn-soft" href="#work">See the work</a>
        </div>
      </div>
      <Strip />
    </section>
  );
}

// A slow, endless row of sample designs and studio photos, straight under the
// statement: the work speaks first. Pauses on hover; still for reduced motion.
function Strip() {
  const items = getFeatured().slice(0, 10).map(({ w, d }) => ({ src: `/previews/${d.path}.webp`, alt: `${w.business}, sample design`, label: w.business.split(",")[0], href: `/work/${d.path}/` }));
  const row = (hidden: boolean) => (
    <ul className="s-strip-row" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it.src}>
          <a href={it.href} target="_blank" rel="noopener" tabIndex={hidden ? -1 : undefined}>
            <img src={it.src} alt={hidden ? "" : it.alt} width={1200} height={750} loading="lazy" />
            <span>{it.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="s-strip" aria-label="Sample designs">
      <div className="s-strip-track">{row(false)}{row(true)}</div>
      <p className="s-wrap s-note">Sample designs for fictional businesses, made to show our range.</p>
    </div>
  );
}

const TOOLS = [
  ["Cloudflare", "cloudflare"], ["Stripe", "stripe"], ["Shopify", "shopify"], ["Xero", "xero"], ["Google", "google"],
  ["Google Maps", "googlemaps"], ["Apple Pay", "applepay"], ["Google Pay", "googlepay"], ["WhatsApp", "whatsapp"], ["MYOB", "myob"],
];

function Tools() {
  return (
    <section className="s-tools s-wrap" aria-labelledby="s-tools-h">
      <h2 id="s-tools-h" className="s-small">What we build with and connect to</h2>
      <ul className="s-tools-row">
        {TOOLS.map(([name, file]) => <li key={file}><img src={`/logos/${file}.svg`} alt={name} title={name} width={30} height={30} loading="lazy" /></li>)}
      </ul>
    </section>
  );
}

function Services() {
  const track = useRef<HTMLDivElement>(null);
  const ref = useReveal<HTMLElement>();
  const nudge = (dir: number) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".s-svc");
    if (el) el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 16), behavior: "smooth" });
  };
  return (
    <section id="services" className="s-sec s-services s-reveal" ref={ref} aria-labelledby="s-svc-h">
      <div className="s-wrap s-head-row">
        <h2 id="s-svc-h" className="s-h2">Everything your brand needs online, in one studio</h2>
        <div className="s-arrows">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous service"><Icon name="arrow-right" className="i flip" /></button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next service"><Icon name="arrow-right" /></button>
        </div>
      </div>
      <div className="s-svc-track" ref={track} tabIndex={0} aria-label="Services">
        {SERVICES.map((s) => (
          <article className="s-svc" key={s.id}>
            <div className="s-svc-art" data-svc={s.id}>
              <img src={s.photo} alt="" loading="lazy" width={900} height={1125} {...showWhenLoaded} />
              <Icon name={s.icon} className="i s-svc-glyph" />
            </div>
            <h3 className="s-svc-name">{s.name}</h3>
            <p>{s.line}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// AI agents for your business: an example day's log for a sample hotel group,
// and a real sample call (ElevenLabs, licensed voices; see CLAUDE.md).
const AGENT_DAY = [
  { t: "7:42am", what: "Answered a call about a late check-in at Bondi", done: "Arrival noted, front desk told" },
  { t: "8:15am", what: "Replied to an enquiry for a group of 12 in March", done: "Dates and rates sent, passed to sales" },
  { t: "9:03am", what: "Chased an unpaid invoice from a corporate account", done: "Second reminder, polite and on time" },
  { t: "9:30am", what: "A guest asked for a refund", done: "Handed to a person, with the booking attached" },
];
const AGENT_KINDS = [
  { title: "Phone and voice agents", body: "Answer the calls your team can't take, book, take messages and send a summary." },
  { title: "Enquiry and email agents", body: "Reply to enquiries with accurate answers from your own information, and collect what your team needs." },
  { title: "Admin agents", body: "Draft quotes, chase invoices, reply to reviews and sort documents, with a person approving where it matters." },
];

function Agents() {
  return (
    <section id="agents" className="s-sec s-agents" aria-labelledby="s-agents-h">
      <div className="s-wrap s-split is-top">
        <div>
          <h2 id="s-agents-h" className="s-h2">AI agents for your business</h2>
          <p className="s-lede">Agents that answer the phone, reply to enquiries and do the follow-up, working from your own information. They always say they're AI, and anything unusual goes to a person on your team.</p>
          <ul className="s-rows">
            {AGENT_KINDS.map((k, i) => (
              <li key={k.title}>
                <span className="s-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><b>{k.title}</b><span>{k.body}</span></div>
              </li>
            ))}
          </ul>
          <a className="s-btn s-btn-ink s-free-cta" href="/ai-agents/">How our agents work</a>
        </div>
        <div className="s-agent-side">
          <figure className="s-log" aria-label="An example morning for an AI agent">
            <p className="s-log-head"><b>Corella Hotels</b><span>Agent log, Tuesday</span></p>
            <ol>
              {AGENT_DAY.map((r) => (
                <li key={r.t}><time>{r.t}</time><div><p>{r.what}</p><span>{r.done}</span></div></li>
              ))}
            </ol>
            <figcaption>An example morning for a sample hotel group</figcaption>
          </figure>
          <div className="s-call">
            <p><b>Hear a sample call</b><span>A table booking for a fictional restaurant, 41 seconds. It opens by saying it's an AI agent and that the call is recorded.</span></p>
            <audio controls preload="none" src="/audio/concierge-restaurant.mp3">
              <a href="/audio/concierge-restaurant.mp3">Download the sample call</a>
            </audio>
          </div>
        </div>
      </div>
    </section>
  );
}

// Automating workflows: one job moving through a sample day-surgery group's
// apps, from referral to paid, with nothing typed twice.
const FLOW = [
  { t: "9:02am", logo: "gmail", app: "Gmail", what: "Referral received", detail: "The specialist's referral read and filed to the patient's record" },
  { t: "9:03am", logo: "gmail", app: "Gmail", what: "Forms sent", detail: "Admission forms sent to the patient, with a reminder set" },
  { t: "11:40am", logo: "googlecalendar", app: "Google Calendar", what: "Surgery booked", detail: "Date confirmed against the theatre list" },
  { t: "11:52am", logo: "stripe", app: "Stripe", what: "Excess paid", detail: "Paid online by the patient" },
  { t: "11:53am", logo: "xero", app: "Xero", what: "In the books", detail: "Invoice and payment reconciled" },
];

function Automation() {
  return (
    <section id="automation" className="s-sec s-auto" aria-labelledby="s-auto-h">
      <div className="s-wrap s-split is-top">
        <figure className="s-flow" aria-label="An example workflow, from referral to paid">
          <p className="s-log-head"><b>Calloway Day Surgery</b><span>One admission, start to finish</span></p>
          <ol>
            {FLOW.map((f, i) => (
              <li key={i}>
                <img src={`/logos/${f.logo}.svg`} alt={f.app} width={28} height={28} loading="lazy" />
                <div><p>{f.what}<time>{f.t}</time></p><span>{f.detail}</span></div>
              </li>
            ))}
          </ol>
          <p className="s-flow-end">Nothing typed twice.</p>
          <figcaption>An example for a sample day-surgery group</figcaption>
        </figure>
        <div>
          <h2 id="s-auto-h" className="s-h2">Automate the way your business runs</h2>
          <p className="s-lede">Most admin is copying the same details from one app to the next. We map how a job moves from first enquiry to paid invoice, then connect the steps so they happen on their own, with a person approving where it matters.</p>
          <ul className="s-rows">
            <li><span className="s-num" aria-hidden="true">01</span><div><b>Map it</b><span>One call to walk through a job and find where the time and the double entry go.</span></div></li>
            <li><span className="s-num" aria-hidden="true">02</span><div><b>Connect it</b><span>Email, calendar, CRM, Stripe, Xero or MYOB working together, with AI agents for the in-between steps.</span></div></li>
            <li><span className="s-num" aria-hidden="true">03</span><div><b>Watch it</b><span>Every step is logged and monitored, so problems are caught before a customer notices.</span></div></li>
          </ul>
          <a className="s-btn s-btn-ink s-free-cta" href="/workflow-automation/">How automation works</a>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="studio" className="s-sec s-why s-reveal" ref={ref} aria-labelledby="s-why-h">
      <div className="s-wrap s-split">
        <div>
          <h2 id="s-why-h" className="s-h2">Handovers are where projects go wrong</h2>
          <p className="s-lede">When the designer, the developers and whoever looks after the site work for different companies, every change becomes a meeting. Here it's one team, from the first sketch to the hundredth update.</p>
          <ul className="s-rows">
            {WHY.map((w, i) => (
              <li key={w.title}>
                <span className="s-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><b>{w.title}</b><span>{w.body}</span></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="s-photo" aria-hidden="true">
          <img src="/photos/studio-2.webp" alt="" width={1600} height={1000} loading="lazy" {...showWhenLoaded} />
        </div>
      </div>
    </section>
  );
}

// The free website: paid for by a platform fee on payments, never by an
// invoice. The rate is in the written agreement, not on the site.
const PAY_STEPS = [
  { icon: "svc-web" as IconName, title: "We design, build and host your site", body: "At no charge, to the same standard as any project we quote." },
  { icon: "svc-payments" as IconName, title: "Customers pay through our gateway", body: "Cards, Apple Pay and Google Pay, paid straight into your own account." },
  { icon: "step-improve" as IconName, title: "We take a small fee per payment", body: "A platform fee on each payment, agreed in writing. When nothing sells, you pay nothing." },
];

function FreeSite() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="payments" className="s-sec s-free s-reveal" ref={ref} aria-labelledby="s-free-h">
      <div className="s-wrap s-split">
        <div>
          <h2 id="s-free-h" className="s-h2">The website is free. We earn when you do.</h2>
          <p className="s-lede">Take payments through our gateway and there's no bill for the site. We take a small platform fee on each payment instead, so we only do well when your customers buy.</p>
          <ul className="s-rows">
            {PAY_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="s-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><b>{s.title}</b><span>{s.body}</span></div>
              </li>
            ))}
          </ul>
          <a className="s-btn s-btn-ink s-free-cta" href="/payments/">How payments work <Arrow /></a>
        </div>
        <figure className="s-panel s-pay" aria-label="Example payment">
          <div className="s-pay-sheet">
            <p className="s-pay-shop">Ridgeline Wines</p>
            <p className="s-pay-item"><span>Mixed dozen, 2025 release</span></p>
            <div className="s-pay-methods" aria-hidden="true">
              <img src="/logos/applepay.svg" alt="" width={44} height={28} />
              <img src="/logos/googlepay.svg" alt="" width={44} height={28} />
              <span className="s-pay-card"><Icon name="card" /> Card</span>
            </div>
            <p className="s-pay-paid"><Icon name="check-circle" /> Paid to Ridgeline's own account</p>
          </div>
          <figcaption>A sample business, for illustration</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="s-sec s-process" aria-labelledby="s-proc-h">
      <div className="s-wrap s-split is-top">
        <div className="s-process-copy">
          <h2 id="s-proc-h" className="s-h2">From the first call to launch, and after</h2>
          <p className="s-lede">You get a written scope and a fixed quote before anything starts. Then you see the work as it's made, on a private link, and nothing goes live until you've signed it off.</p>
          <a className="s-btn s-btn-ink" href="#start">Start a project</a>
        </div>
        <ol className="s-steps-list">
          {STEPS.map((s, i) => (
            <li key={s.title}><span className="s-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{s.title}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Work() {
  const track = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".s-case");
    if (el) el.scrollBy({ left: dir * ((card?.offsetWidth ?? 560) + 8), behavior: "smooth" });
  };
  const picks = getFeatured().slice(0, 10);
  const total = WORK.reduce((n, w) => n + w.designs.length, 0);
  return (
    <section id="work" className="s-work" aria-labelledby="s-work-h">
      <div className="s-wrap s-head-row">
        <h2 id="s-work-h" className="s-h2">Selected designs, each made for one business</h2>
        <a className="s-btn s-btn-white" href="/designs/">See all {total} designs <Arrow /></a>
      </div>
      <div className="s-case-track" ref={track} tabIndex={0} aria-label="Selected designs">
        {picks.map(({ w, d }) => (
          <a className="s-case" key={d.path} href={`/work/${d.path}/`} target="_blank" rel="noopener">
            <img src={`/previews/${d.path}.webp`} alt={`${w.business}, ${d.theme} design`} width={1200} height={750} loading="lazy" />
            <span className="s-case-name">{w.business.split(",")[0]}</span>
            <span className="s-case-kind">{w.kind}</span>
            <span className="s-pill">View design</span>
          </a>
        ))}
      </div>
      <div className="s-wrap s-work-foot">
        <p className="s-note">Sample businesses made to show the range; names and details are fictional. A client's design is made for them and never reused.</p>
        <div className="s-arrows is-dark">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous design"><Icon name="arrow-right" className="i flip" /></button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next design"><Icon name="arrow-right" /></button>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="s-sec s-founder s-reveal" ref={ref} aria-labelledby="s-founder-h">
      <div className="s-wrap">
        <h2 className="sr" id="s-founder-h">Who you'll work with</h2>
        <blockquote>
          <p>"I keep the studio small on purpose. You deal with me from the first call, I sign off every page before it goes live, and I pick up the phone."</p>
        </blockquote>
        <div className="s-person">
          <img src={FOUNDER_PHOTO} alt={`${FOUNDER}, founder of Oceanalt`} width={112} height={112} loading="lazy" />
          <div><b>{FOUNDER}</b><span>Builder, Oceanalt</span></div>
          <a className="s-btn s-btn-soft" href={PHONE_HREF}><Icon name="phone" /> {PHONE}</a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="s-sec s-faq" aria-labelledby="s-faq-h">
      <div className="s-wrap s-split is-top">
        <div>
          <h2 id="s-faq-h" className="s-h2">Questions?<br />Fair enough.</h2>
          <p className="s-lede">Something else? Email <a className="s-link" href={`mailto:${EMAIL}`}>{EMAIL}</a> or call <a className="s-link" href={PHONE_HREF}>{PHONE}</a>.</p>
        </div>
        <div className="s-faq-list">
          {STUDIO_FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<span className="s-plus" aria-hidden="true"><Icon name="plus" /></span></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Start() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "replied" | "error">("idle");
  const [need, setNeed] = useState("unsure");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    const site = String(data.get("website") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), business: data.get("business"), email: data.get("email"),
          phone, website: site, template: "unsure", plan: need, message: data.get("message"),
          company_site: data.get("company_site"),
        }),
      });
      if (res.ok && (await res.json()).replied) { setState("replied"); return; }
    } catch {
      // No API here: use the fallback below.
    }
    try {
      const { saveLead } = await import("../firebase");
      await saveLead({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("business") || ""),
        projectType: NEEDS[need] ?? need,
        query: [String(data.get("message") || ""), site && `Current site: ${site}`, phone && `Phone: ${phone}`].filter(Boolean).join("\n"),
        source: "form",
      });
      setState("done");
    } catch {
      setState("error");
    }
  };
  return (
    <section id="start" className="s-sec s-start" aria-labelledby="s-start-h">
      <div className="s-wrap s-split is-top">
        <div>
          <h2 id="s-start-h" className="s-h2">Tell us what you're working on</h2>
          <p className="s-lede">A few lines is plenty. Lathif reads every enquiry himself and replies the same business day to set up a first call.</p>
          <ul className="s-contact">
            <li><Icon name="mail" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><Icon name="phone" /><a href={PHONE_HREF}>{PHONE}</a></li>
            <li><Icon name="pin" />Sydney and Melbourne, working Australia-wide</li>
          </ul>
        </div>
        {state === "replied" || state === "done" ? (
          <div className="s-form s-form-done" role="status">
            <Icon name="check-circle" />
            <h3>Thanks, it's with us.</h3>
            <p>{state === "replied" ? "There's a note in your inbox now. " : ""}Lathif will reply the same business day from {EMAIL} to find a time to talk.</p>
          </div>
        ) : (
          <form className="s-form" onSubmit={submit}>
            <div className="s-row">
              <label className="s-field"><span>Your name</span><input id="f-name" name="name" autoComplete="name" required /></label>
              <label className="s-field"><span>Company</span><input name="business" autoComplete="organization" required /></label>
            </div>
            <div className="s-row">
              <label className="s-field"><span>Email</span><input name="email" type="email" autoComplete="email" spellCheck={false} required /></label>
              <label className="s-field"><span>Phone <small>(optional)</small></span><input name="phone" type="tel" autoComplete="tel" /></label>
            </div>
            <div className="s-row">
              <label className="s-field"><span>What do you need?</span>
                <select value={need} onChange={(e) => setNeed(e.target.value)}>
                  {Object.entries(NEEDS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
              <label className="s-field"><span>Current website <small>(optional)</small></span><input name="website" inputMode="url" autoComplete="url" spellCheck={false} placeholder="yourbrand.com.au…" /></label>
            </div>
            <label className="s-field"><span>About the project</span><textarea name="message" rows={5} maxLength={2000} required placeholder="What you're trying to do, any dates that matter…" /></label>
            <div className="hp" aria-hidden="true"><label htmlFor="f-company-site">Leave this empty</label><input id="f-company-site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
            {state === "error" && <p className="s-form-error" role="alert">That didn't send. Please try again, or email {EMAIL}.</p>}
            <button className="s-btn s-btn-ink" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"} <Arrow /></button>
          </form>
        )}
      </div>
    </section>
  );
}

export function StudioFooter({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  return (
    <footer className="s-foot">
      <div className="s-wrap">
        <div className="s-foot-cta">
          <h2 className="s-h2">Let's talk it through.</h2>
          <a className="s-btn s-btn-white" href={`${base}#start`}>Start a project <Arrow /></a>
        </div>
        <div className="s-foot-grid">
          <a className="s-foot-logo" href={home ? "#top" : "/"} aria-label="Oceanalt home"><LogoMark /><span translate="no">oceanalt</span></a>
          <nav aria-label="Studio">
            <p className="s-label">Studio</p>
            <a href={`${base}#work`}>Work</a>
            <a href={`${base}#services`}>Services</a>
            <a href="/design/">Design</a>
            <a href="/designs/">All designs</a>
            <a href={`${base}#faq`}>FAQ</a>
          </nav>
          <nav aria-label="Services">
            <p className="s-label">Services</p>
            {SERVICES.map((s) => <a key={s.id} href={SERVICE_PAGE[s.id] ?? `${base}#services`}>{s.name}</a>)}
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

export function StudioHome() {
  return (
    <main id="main" className="s-page">
      <Hero />
      <Tools />
      <Services />
      <Agents />
      <Automation />
      <Why />
      <FreeSite />
      <Process />
      <Work />
      <Founder />
      <Faq />
      <Start />
    </main>
  );
}
