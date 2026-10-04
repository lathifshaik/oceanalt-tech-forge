import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon, type IconName } from "./components/Icon";
import { AiDemo } from "./components/AiDemo";

// ─── Content ─────────────────────────────────────────────────────────────────
// Pricing and terms here must match docs/business/BUSINESS_PLAN.md and the
// Terms page below. Change them together.

export const EMAIL = "hello@oceanalt.com.au";
export const ABN = "65 119 854 062";

type TemplateId = "cafe" | "trades" | "studio" | "shop" | "pro";

// Each example business shown in three of its designs. Paths match the
// showcase list in templates/<template>/meta.json (built by `npm run templates`).
const WORK: {
  id: TemplateId;
  kind: string;
  business: string;
  pitch: string;
  designs: { path: string; theme: string }[];
}[] = [
  {
    id: "cafe",
    kind: "Café",
    business: "Little Tern Coffee, Fremantle",
    pitch: "Menu, hours and directions first. The sign on the photo flips to OPEN or CLOSED from the real opening hours.",
    designs: [
      { path: "little-tern-coffee", theme: "Harbour" },
      { path: "little-tern-coffee-night", theme: "Night" },
      { path: "little-tern-coffee-sun", theme: "Sun" },
    ],
  },
  {
    id: "trades",
    kind: "Electrician",
    business: "Kerr & Sons Electrical, Newcastle",
    pitch: "Built to make the phone ring: tap-to-call everywhere, the licence front and centre, and a quote form.",
    designs: [
      { path: "kerr-and-sons-electrical", theme: "Coast" },
      { path: "kerr-and-sons-electrical-ink", theme: "Ink" },
      { path: "kerr-and-sons-electrical-sun", theme: "Sun" },
    ],
  },
  {
    id: "studio",
    kind: "Physio & Pilates",
    business: "Tidewater Physio & Pilates, Bulimba",
    pitch: "Every treatment has a price and a Book button. Gift vouchers flip over to show their terms and sell themselves.",
    designs: [
      { path: "tidewater-physio-pilates", theme: "Calm" },
      { path: "tidewater-physio-pilates-ink", theme: "Ink" },
      { path: "tidewater-physio-pilates-forest", theme: "Forest" },
    ],
  },
  {
    id: "shop",
    kind: "Florist",
    business: "Wattle & Fern, Hobart",
    pitch: "Every bunch has its own Buy button, paid straight into the shop's Stripe. The delivery tag counts down to the same-day cutoff.",
    designs: [
      { path: "wattle-and-fern-florist", theme: "Sun" },
      { path: "wattle-and-fern-florist-forest", theme: "Forest" },
      { path: "wattle-and-fern-florist-ink", theme: "Ink" },
    ],
  },
  {
    id: "pro",
    kind: "Law firm",
    business: "Harlow Reid Lawyers, Parramatta",
    pitch: "Fixed fees in plain sight, the team up front, and a business card that flips over to save the firm straight to your phone.",
    designs: [
      { path: "harlow-reid-lawyers", theme: "Ink" },
      { path: "harlow-reid-lawyers-calm", theme: "Calm" },
      { path: "harlow-reid-lawyers-night", theme: "Night" },
    ],
  },
];

// Three different designs for the hero stack, to show the range at a glance.
const STACK = ["little-tern-coffee", "kerr-and-sons-electrical-ink", "tidewater-physio-pilates-forest"];

export const PLANS = [
  {
    id: "care",
    name: "Care",
    price: "$29",
    term: "Month to month",
    desc: "Already have a site you like? We move it to fast hosting and look after it.",
    features: ["Hosting, SSL and daily backups", "Security updates and uptime monitoring", "Small edits at $60 each", "Upgrade to Launch or Grow any time"],
    featured: false,
  },
  {
    id: "launch",
    name: "Launch",
    price: "$99",
    term: "$0 upfront · 12-month minimum",
    desc: "A custom website for a local business, designed, built, hosted and kept up to date.",
    features: [
      "Custom design, up to 5 pages",
      "We write the words; you send photos",
      "Domain, hosting and SSL",
      "Contact or quote form to your inbox",
      "Google Business Profile set up",
      "30 minutes of edits every month",
      "Live in 1 to 3 business days",
    ],
    featured: true,
  },
  {
    id: "grow",
    name: "Grow",
    price: "$149",
    term: "$0 upfront · 12-month minimum",
    desc: "For businesses that take money or bookings online. Everything in Launch, plus:",
    features: [
      "Up to 12 pages",
      "Online payments, deposits or a small shop",
      "Bookings and gift vouchers",
      "Rebuild of your existing site included",
      "1 hour of edits every month",
      "Monthly traffic and leads report",
    ],
    featured: false,
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "How can it be live in 1 to 3 days?",
    a: "We don't start from a blank page. We've built our own library of layouts, design directions and components, so your design is assembled and tailored rather than drawn from nothing. We also write the words ourselves after a 15-minute call, which removes the usual weeks of waiting on copy. Google Business Profile and Stripe verification are run by Google and Stripe, so those can take a little longer.",
  },
  {
    q: "What do I need to give you?",
    a: "Fifteen minutes on the phone, your logo if you have one, a few photos, your prices and hours, and access to your domain if you already own one. No photos? We'll use your Google Business photos or source licensed ones that look local.",
  },
  {
    q: "Will my site look like anyone else's?",
    a: "No. Every site gets its own design: colours, type, layout and photography chosen for your business and your customers. We keep a register of every design we've shipped, and our build tools refuse to make a second site with the same look.",
  },
  {
    q: "How do changes work?",
    a: "Email us what you want changed: prices, photos, a new menu, a blog post. It's usually done within two business days. Launch includes 30 minutes a month and Grow includes an hour. Bigger additions are quoted before any work starts.",
  },
  {
    q: "What if I want to leave?",
    a: "After 12 months you can cancel any time from your billing page and keep the site, code and domain. Leaving earlier costs the rest of the first year or a $1,499 buyout, whichever is less, and the site is still yours.",
  },
  {
    q: "Can you build AI tools for my business?",
    a: "Yes. The most popular is an AI assistant on your website that answers customer questions and replies to enquiries within minutes, for $39 a month plus AI usage at cost. We also build custom tools for bookings, review replies, quote follow-ups and admin. Every tool hands anything it's unsure about to you.",
  },
  {
    q: "How do you reply in 15 minutes?",
    a: "When you send the form, our AI assistant reads it and emails you straight away with a suggested plan and a link to book a call. A person reads every enquiry the same business day. It's the same assistant we can set up on your own site.",
  },
  {
    q: "Do you build custom apps too?",
    a: "Sometimes. Client portals, internal tools and small SaaS products are quoted per project. Send a brief and you'll get a scope and a price within 24 hours.",
  },
];

// ─── Pieces ─────────────────────────────────────────────────────────────────

// Two waves drawn past the edges of the circle and clipped to it. Each path
// repeats every 16 units, so sliding it 16 units left loops seamlessly.
const WAVE = (y: number, amp: number) => `M-16 ${y}q4 ${-amp} 8 0` + " t8 0".repeat(7);

// The waves roll for a few loops after load, then settle: motion that runs
// forever next to content is distracting. Hovering the logo sets them rolling
// again, faster. Uses the Web Animations API so a finished animation can be
// replayed, and speed changes don't make the waves jump.
const ROLL = [{ transform: "translateX(0)" }, { transform: "translateX(-16px)" }];

export function LogoMark({ className = "", rolling = false }: { className?: string; rolling?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const anims = useRef<Animation[]>([]);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    anims.current = [...svg.querySelectorAll<SVGPathElement>(".wave")].map((w, i) =>
      w.animate(ROLL, { duration: i === 0 ? 3200 : 4600, iterations: i === 0 ? 4 : 3, easing: "linear" }),
    );
    return () => anims.current.forEach((a) => a.cancel());
  }, []);
  useEffect(() => {
    anims.current.forEach((a) => {
      a.updatePlaybackRate(rolling ? 2.5 : 1);
      if (rolling && a.playState === "finished") a.play();
    });
  }, [rolling]);
  return (
    <svg ref={ref} className={`mark ${className}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <defs>
        <clipPath id="mark-clip"><circle cx="16" cy="16" r="12" /></clipPath>
      </defs>
      <circle cx="16" cy="16" r="13" />
      <g clipPath="url(#mark-clip)">
        <path className="wave" d={WAVE(16.5, 2.6)} />
        <path className="wave" d={WAVE(21.5, 2)} opacity=".5" />
      </g>
    </svg>
  );
}

function Logo() {
  const [hover, setHover] = useState(false);
  return (
    <a className="logo" href="#top" aria-label="Oceanalt home" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <LogoMark rolling={hover} />
      <span translate="no">oceanalt</span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sentinel = document.getElementById("top");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { rootMargin: "80px 0px 0px 0px" });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const links = [
    ["#work", "Work"],
    ["#ai", "AI"],
    ["#how", "How it works"],
    ["#pricing", "Pricing"],
    ["#faq", "FAQ"],
  ];
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="nav-pill">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="btn btn-primary nav-cta" href="#start">Start my website</a>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          <span className="burger" aria-hidden="true"><i /><i /></span>
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Main" hidden={!open}>
        {links.map(([href, label], i) => <a key={href} href={href} style={{ animationDelay: `${i * 40}ms` }} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="btn btn-primary" href="#start" onClick={() => setOpen(false)}>Start my website</a>
      </nav>
    </header>
  );
}

// Three real client-style sites we built, stacked in 3D. Pointer position tilts the stack.
function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    };
    const leave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className="stack" ref={ref}>
      <div className="stack-inner">
        {STACK.map((path) => (
          <a key={path} className="frame" href={`/work/${path}/`} target="_blank" rel="noopener" aria-label="Open this example site">
            <img src={`/previews/${path}.webp`} alt="" width={1200} height={750} fetchPriority="high" />
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>Your website, done for you.</h1>
          <p>Custom websites for Australian small businesses, built and looked after for one monthly fee. Nothing upfront, live in 1 to 3 days.</p>
          <div className="ctas">
            <a className="btn btn-primary btn-island" href="#start">Start my website <span className="btn-i"><Icon name="arrow-up-right" /></span></a>
            <a className="text-link" href="#work">See our work <Icon name="arrow-right" /></a>
          </div>
        </div>
        <Stack />
      </div>
      <div className="wrap">
        <dl className="proof">
          <div><dt>$0</dt><dd>upfront, on every plan</dd></div>
          <div><dt>1-3</dt><dd>days from first call to live</dd></div>
          <div><dt>15 min</dt><dd>to reply to an enquiry, day or night</dd></div>
        </dl>
      </div>
    </div>
  );
}

function WorkCard({ w }: { w: (typeof WORK)[number] }) {
  const [i, setI] = useState(0);
  const d = w.designs[i];
  return (
    <article className="work">
      <a className="work-img" href={`/work/${d.path}/`} target="_blank" rel="noopener" aria-label={`Open ${w.business} in the ${d.theme} design`}>
        {w.designs.map((x, j) => (
          <img key={x.path} src={`/previews/${x.path}.webp`} alt={j === i ? `${w.business}, ${x.theme} design` : ""} width={1200} height={750} loading="lazy" className={j === i ? "is-on" : ""} />
        ))}
        <span className="work-open" aria-hidden="true"><Icon name="arrow-up-right" /></span>
      </a>
      <div className="work-meta">
        <div>
          <h3>{w.business}</h3>
          <p>{w.pitch}</p>
        </div>
        <div className="work-row">
          <div className="designs" role="group" aria-label={`${w.business} designs`}>
            {w.designs.map((x, j) => (
              <button key={x.path} type="button" aria-pressed={j === i} onClick={() => setI(j)}>{x.theme}</button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Work() {
  const track = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".work");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 600) + 24), behavior: "smooth" });
  };
  return (
    <section id="work" className="work-sec">
      <div className="wrap work-head">
        <div>
          <h2 className="h2">Designed for one business. Never reused.</h2>
          <p className="lede">Five sample businesses, each in three of its own designs. Switch between them, or open the live site.</p>
        </div>
        <div className="work-nav">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous"><Icon name="arrow-right" className="i flip" /></button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next"><Icon name="arrow-right" /></button>
        </div>
      </div>
      <div className="work-track" ref={track} tabIndex={0} aria-label="Example sites">
        {WORK.map((w) => <WorkCard key={w.id} w={w} />)}
      </div>
      <div className="wrap">
        <p className="work-note">These are sample businesses we made to show the range; names and reviews are fictional. A real client's design is made for them and never given to anyone else.</p>
      </div>
    </section>
  );
}

function How() {
  const steps: { when: string; title: string; body: string }[] = [
    { when: "Within 15 minutes", title: "Tell us about your business", body: "Send the form. Our AI assistant replies with a suggested plan, then we have a 15-minute call. We write the words." },
    { when: "Within 24 hours", title: "See your design", body: "A private preview link to check on your phone. Ask for changes. Nothing is charged until you're happy." },
    { when: "Day 1 to 3", title: "Go live, then we look after it", body: "We connect your domain, Google profile and payments. After that, just email us when something needs changing." },
  ];
  return (
    <section className="how" id="how">
      <div className="wrap">
        <h2 className="h2">From hello to live in three days.</h2>
        <ol className="how-rows">
          {steps.map((s) => (
            <li key={s.title}>
              <span className="how-when">{s.when}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing({ onPlan }: { onPlan: (plan: string) => void }) {
  return (
    <section id="pricing" className="pricing">
      <div className="wrap">
        <h2 className="h2">One monthly fee. Everything handled.</h2>
        <p className="lede">Prices in AUD. No setup fee on any plan.</p>
        <div className="plans">
          {PLANS.map((p) => (
            <div className={`plan${p.featured ? " is-featured" : ""}`} key={p.id}>
              <div className="plan-top">
                <h3 className="plan-name">{p.name}</h3>
                {p.featured && <span className="plan-badge">Recommended</span>}
              </div>
              <div className="plan-price num"><b>{p.price}</b><span>/month</span></div>
              <p className="plan-term">{p.term}</p>
              <p className="plan-desc">{p.desc}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}><Icon name="check" /> {f}</li>
                ))}
              </ul>
              <button className={`btn ${p.featured ? "btn-primary" : "btn-line"}`} type="button" onClick={() => onPlan(p.id)}>Choose {p.name}</button>
            </div>
          ))}
        </div>
        <div className="plan-extra">
          <p><b>Rather own it outright?</b> One-off builds from $1,499, half at the start and half at launch. Add Care for $29 a month if you'd like us to keep looking after it.</p>
          <p><b>Need something bigger?</b> Client portals, internal tools and small SaaS products are quoted per project. <button className="link" type="button" onClick={() => onPlan("custom")}>Send a brief</button> for a scope and price within 24 hours.</p>
          <p><b>AI on your site?</b> The AI assistant is $39 a month on any plan, plus AI usage at cost. <a className="link" href="#ai">See it working</a>.</p>
        </div>
      </div>
    </section>
  );
}

function Rebuild({ onPlan }: { onPlan: (plan: string) => void }) {
  const steps = [
    ["Send us your URL", "Tell us what works and what doesn't."],
    ["See the new version", "A preview within a day, built from your content."],
    ["We move everything", "Pages, images and redirects, so you keep your rankings."],
    ["Switch with no downtime", "Same domain and email. Cancel your old host."],
  ];
  return (
    <section className="rebuild">
      <div className="wrap">
        <div className="rebuild-head">
          <h2 className="h2">Already have a website? We'll rebuild it, payments included.</h2>
          <p className="lede">Slow Wix site, tired WordPress, a Shopify theme you've outgrown. We rebuild it faster and cleaner and keep your Google rankings. It's included in Grow.</p>
        </div>
        <ol className="rebuild-steps">
          {steps.map(([t, b]) => <li key={t}><b>{t}</b><span>{b}</span></li>)}
        </ol>
        <button className="btn btn-line" type="button" onClick={() => onPlan("rebuild")}>Rebuild my site</button>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="promises-sec">
      <div className="wrap">
        <h2 className="h2">No hostage websites.</h2>
        <p className="lede">Pay-monthly websites have a bad name because some providers hold your domain and make leaving hard. We put these in writing instead.</p>
        <div className="bento">
          <div className="cell cell-preview">
            <div>
              <h3>See it before you pay</h3>
              <p>A preview link within a day. Your first charge happens only once you're happy with it.</p>
            </div>
            <img src="/previews/wattle-and-fern-florist.webp" alt="A preview of the Wattle & Fern florist site" width={1200} height={750} loading="lazy" />
          </div>
          <div className="cell">
            <Icon name="globe" />
            <h3>Your domain, in your name</h3>
            <p>Registered to you from day one. Never held hostage, whatever happens.</p>
          </div>
          <div className="cell">
            <Icon name="card" />
            <h3>Payments go straight to you</h3>
            <p>Customer payments land in your own Stripe account. We never hold your money.</p>
          </div>
          <div className="cell cell-keep">
            <b className="num">12</b>
            <div>
              <h3>Keep the site after 12 months</h3>
              <p>After a year, the site and its code are yours to keep, free. Stay on Care for $29 a month or take it anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-side">
          <h2 className="h2">Questions</h2>
          <p className="lede">Something else? Email <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}<span className="faq-x" aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEMPLATE_LABEL: Record<string, string> = {
  cafe: "Café, restaurant or bar",
  trades: "Trade or home service",
  studio: "Appointments (salon, clinic, studio)",
  shop: "Shop or online orders",
  pro: "Professional services (accounting, legal, real estate)",
  unsure: "Something else",
};
const PLAN_LABEL: Record<string, string> = {
  launch: "Launch ($99/month)",
  grow: "Grow ($149/month)",
  care: "Care ($29/month)",
  rebuild: "Rebuild my existing site",
  oneoff: "One-off build (from $1,499)",
  custom: "Custom project",
  ai: "AI assistant or custom AI agents",
  unsure: "Not sure yet",
};

function Start({ template, plan, setTemplate, setPlan }: { template: string; plan: string; setTemplate: (v: string) => void; setPlan: (v: string) => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "replied" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    const site = String(data.get("website") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    // First choice: /api/start, where our AI assistant emails a reply within
    // minutes (see api/start.ts). If that isn't configured, fall back to saving
    // the lead through Firebase/EmailJS.
    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), business: data.get("business"), email: data.get("email"),
          phone, website: site, template, plan, message: data.get("message"),
          company_site: data.get("company_site"),
        }),
      });
      if (res.ok && (await res.json()).replied) {
        setState("replied");
        return;
      }
    } catch {
      // Network error or no API in this environment: use the fallback below.
    }
    try {
      // Firebase is ~450 KB, so it loads only when someone actually sends the form.
      const { saveLead } = await import("./firebase");
      await saveLead({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("business") || ""),
        projectType: `${TEMPLATE_LABEL[template] ?? template} · ${PLAN_LABEL[plan] ?? plan}`,
        query: [String(data.get("message") || ""), site && `Current site: ${site}`, phone && `Phone: ${phone}`].filter(Boolean).join("\n"),
        source: "form",
      });
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="start" id="start">
      <div className="wrap">
        <div>
          <h2 className="h2">Start your website.</h2>
          <p className="lede">Tell us a little about your business. You'll hear back within 15 minutes, day or night, with a suggested plan and a link to book a call.</p>
          <div className="start-aside">
            <a href={`mailto:${EMAIL}`}><Icon name="mail" /> {EMAIL}</a>
            <span><Icon name="pin" /> Based in Sydney, working Australia-wide</span>
            <span><Icon name="clock" /> Replies within 15 minutes, any time</span>
          </div>
        </div>

        {state === "replied" ? (
          <div className="form-done" role="status">
            <Icon name="mail" />
            <h3>Check your inbox.</h3>
            <p>Our AI assistant has already emailed you a suggested plan and a link to book a 15-minute call. A person reads every enquiry and will follow up today. If it's not there in a minute, check your spam folder.</p>
          </div>
        ) : state === "done" ? (
          <div className="form-done" role="status">
            <Icon name="check-circle" />
            <h3>Thanks, we've got it.</h3>
            <p>We'll be in touch shortly to book a quick call. If you have photos or a logo handy, reply to that email with them.</p>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            <div className="row">
              <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" autoComplete="name" required /></div>
              <div className="field"><label htmlFor="f-business">Business name</label><input id="f-business" name="business" autoComplete="organization" required /></div>
            </div>
            <div className="row">
              <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" spellCheck={false} required /></div>
              <div className="field"><label htmlFor="f-phone">Phone <small>(optional)</small></label><input id="f-phone" name="phone" type="tel" autoComplete="tel" /></div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="f-template">Type of business</label>
                <select id="f-template" value={template} onChange={(e) => setTemplate(e.target.value)}>
                  {Object.entries(TEMPLATE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-plan">Plan</label>
                <select id="f-plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                  {Object.entries(PLAN_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="field"><label htmlFor="f-website">Current website <small>(if you have one)</small></label><input id="f-website" name="website" type="text" inputMode="url" autoComplete="url" spellCheck={false} placeholder="yourbusiness.com.au…" /></div>
            <div className="field"><label htmlFor="f-message">What does your business do, and what should the site help with?</label><textarea id="f-message" name="message" rows={4} maxLength={2000} required /></div>
            <div className="hp" aria-hidden="true"><label htmlFor="f-company-site">Leave this empty</label><input id="f-company-site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
            {state === "error" && <p className="form-error" role="alert">That didn't send. Please try again, or email {EMAIL} directly.</p>}
            <button className="btn btn-accent" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : "Send"} <Icon name="send" />
            </button>
            <p className="form-note">Nothing is charged until you've seen and approved your site.</p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-row">
          <span>© {new Date().getFullYear()} Oceanalt, Sydney · ABN {ABN}</span>
          <nav aria-label="Footer">
            <a href="#work">Work</a>
            <a href="#pricing">Pricing</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="#/terms">Terms</a>
            <a href="#/privacy">Privacy</a>
          </nav>
        </div>
        <p className="foot-word" aria-hidden="true" translate="no">oceanalt</p>
      </div>
    </footer>
  );
}

// ─── Legal ──────────────────────────────────────────────────────────────────

function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="legal" id="main">
      <div className="wrap">
        <a className="back" href="#top"><Icon name="arrow-right" /> Back to home</a>
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  );
}

function Terms() {
  return (
    <Legal title="Terms of service">
      <p>These terms are between you and Oceanalt (ABN {ABN}), based in Sydney, Australia.</p>
      <h2>1. Services</h2>
      <p>Oceanalt designs, builds, hosts and maintains websites for small businesses, either on a monthly plan (Care, Launch or Grow) or as a one-off project. What each plan includes is listed on the pricing section of this site and confirmed in writing before work starts.</p>
      <h2>2. Delivery</h2>
      <p>Launch and Grow sites are usually live within 1 to 3 business days of the kickoff call, provided we have the photos, prices and domain access we ask for. Steps run by third parties, such as Google Business Profile verification, Stripe account verification and domain transfers, may take longer and are outside that timeframe.</p>
      <h2>3. Billing</h2>
      <p>Monthly plans are billed in advance by card through Stripe. The first charge happens only after the client approves the preview. Launch and Grow have a 12-month minimum term, then continue month to month and can be cancelled with 30 days' notice. Cancelling within the first 12 months costs the lesser of the remaining months in that term or a $1,499 AUD buyout, and either way the site is transferred to the client. Care is month to month. One-off projects are billed 50% upfront and 50% at launch.</p>
      <h2>4. Ownership</h2>
      <p>The client owns their content and domain from day one; domains are registered in the client's name. On Launch and Grow, ownership of the site code transfers at no charge after 12 paid months, or earlier on payment of the buyout in section 3. For one-off projects, the client owns the code once the final invoice is paid.</p>
      <h2>5. Edits</h2>
      <p>Included edit time covers changes to existing pages. New pages or features are quoted in writing before work starts. Unused edit time does not roll over.</p>
      <h2>6. Payments to the client</h2>
      <p>Where a site takes payments, they are processed by Stripe into the client's own Stripe account. Oceanalt does not hold client funds or handle card data.</p>
      <h2>7. AI add-ons</h2>
      <p>The AI assistant add-on costs $39 AUD a month plus AI usage. Usage is billed monthly in arrears at the AI provider's price, converted to AUD, with no markup. The client sets a monthly usage cap; when it's reached, the assistant pauses until the next month or until the cap is raised. Custom AI agents are quoted in writing, with usage billed the same way.</p>
      <h2>8. Limitation of liability</h2>
      <p>To the extent permitted by the Australian Consumer Law, Oceanalt is not liable for indirect or consequential loss arising from the use of, or inability to use, the services.</p>
    </Legal>
  );
}

function Privacy() {
  return (
    <Legal title="Privacy policy">
      <h2>1. Contact</h2>
      <p>Oceanalt (ABN {ABN}) is based in Sydney, Australia. For privacy enquiries, email {EMAIL}.</p>
      <h2>2. What is collected</h2>
      <p>When you send the start form, we collect your name, business name, email, and optionally your phone number, current website and message. No tracking pixels or third-party analytics are used by default.</p>
      <h2>3. Where it is stored</h2>
      <p>Your message is sent to Anthropic's Claude API so our AI assistant can write the first reply, and emails are delivered by Resend. If that isn't available, submissions are stored in Google Firestore and sent to the Oceanalt inbox via EmailJS. These providers process the data on our behalf and don't use it to train models.</p>
      <h2>4. How it is used</h2>
      <p>Submissions are used to reply to you and scope your website. Data is not sold, shared with third parties for marketing, or used to train any model. Deletion requests are honoured.</p>
      <h2>5. Your rights under the Privacy Act 1988</h2>
      <p>You may request access to, correction of, or deletion of the information we hold about you by emailing {EMAIL}.</p>
    </Legal>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

function useRoute() {
  const read = () => (typeof window !== "undefined" && window.location.hash.startsWith("#/") ? window.location.hash.slice(2) : "");
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => {
      const next = read();
      setRoute(next);
      if (next) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

export default function App() {
  const route = useRoute();
  const [template, setTemplate] = useState("unsure");
  const [plan, setPlan] = useState("launch");

  const goStart = () => document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  const pickPlan = (p: string) => { setPlan(p); goStart(); };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div id="top" />
      <Nav />
      {route === "terms" ? <Terms /> : route === "privacy" ? <Privacy /> : (
        <main id="main">
          <Hero />
          <Work />
          <AiDemo onAsk={() => pickPlan("ai")} />
          <How />
          <Pricing onPlan={pickPlan} />
          <Rebuild onPlan={pickPlan} />
          <Promises />
          <Faq />
          <Start template={template} plan={plan} setTemplate={setTemplate} setPlan={setPlan} />
        </main>
      )}
      <Footer />
    </>
  );
}
