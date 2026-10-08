import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon, type IconName } from "./components/Icon";
import { LogoWall } from "./components/Demos";
import { Face, HeroPhone, Story } from "./components/Story";
import { LANDINGS } from "./seo/landing";

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
  owner: { face: string };
  problem: string;
  pitch: string;
  designs: { path: string; theme: string }[];
}[] = [
  {
    id: "cafe",
    kind: "Café",
    business: "Little Tern Coffee, Fremantle",
    owner: { face: "tern" },
    problem: "People kept ringing to ask if they were open yet.",
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
    owner: { face: "jim" },
    problem: "Jobs went to whoever picked up first, and Jim's usually up a ladder.",
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
    owner: { face: "tide" },
    problem: "Bookings came in by phone and text, and gift vouchers lived on paper.",
    pitch: "Every treatment has a price and a Book button. Gift vouchers can be bought online and flip over to show their terms.",
    designs: [
      { path: "tidewater-physio-pilates", theme: "Calm" },
      { path: "tidewater-physio-pilates-ink", theme: "Ink" },
      { path: "tidewater-physio-pilates-forest", theme: "Forest" },
    ],
  },
  {
    id: "studio",
    kind: "Yoga studio",
    business: "Saltwater Yoga, Cronulla",
    owner: { face: "ana" },
    problem: "Ana was taking class bookings in Instagram DMs and chasing $25 payments after class.",
    pitch: "Every class has a time, a price and a Book button. People pay with Apple Pay or Google Pay before they've rolled out their mat.",
    designs: [
      { path: "saltwater-yoga", theme: "Sun" },
      { path: "saltwater-yoga-calm", theme: "Calm" },
      { path: "saltwater-yoga-night", theme: "Night" },
    ],
  },
  {
    id: "shop",
    kind: "Florist",
    business: "Wattle & Fern, Hobart",
    owner: { face: "landscaper" },
    problem: "Orders came through Instagram DMs, paid by bank transfer, chased by hand.",
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
    owner: { face: "accountant" },
    problem: "People didn't call because they couldn't tell what anything would cost.",
    pitch: "Fixed fees in plain sight, the team up front, and a business card that flips over to save the firm straight to your phone.",
    designs: [
      { path: "harlow-reid-lawyers", theme: "Ink" },
      { path: "harlow-reid-lawyers-calm", theme: "Calm" },
      { path: "harlow-reid-lawyers-night", theme: "Night" },
    ],
  },
];


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
      "Usually live in 1 to 3 business days",
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
    q: "What if I want to leave?",
    a: "After 12 months you can cancel any time from your billing page and keep the site, code and domain. Leaving earlier costs the rest of the first year or a $1,499 buyout, whichever is less, and the site is still yours.",
  },
  {
    q: "How can it be live in 1 to 3 days?",
    a: "We don't start from a blank page. We've built our own design tools, so the time goes on your business, not on setup. We also write the words ourselves after a 15-minute call, which removes the usual weeks of waiting on copy. Google Business Profile and Stripe verification are run by Google and Stripe, so those can take a little longer.",
  },
  {
    q: "How does the AI concierge work?",
    a: "Keep your number and divert calls you can't pick up, or after-hours calls, to your concierge, or we give you a new local number. It answers in a natural Australian voice, knows your services, prices, hours and areas, takes bookings and messages, and sends you a summary on WhatsApp, text or email after every call. It's $149 a month with the number included, plus call time at cost, and you set a monthly cap. There's a 3-month minimum, and your first charge waits until it's passed our test calls and you've rung it yourself. Call time is at cost with no markup; our estimate is about 15 to 20 cents a minute, a bit more for any part of a call we put through to your mobile, and we confirm the real rate before you go live.",
  },
  {
    q: "How do my customers pay?",
    a: "Through Stripe, straight into your own account. Customers can pay by card, Apple Pay or Google Pay, and Afterpay where Stripe approves your business, for a deposit when they book or the full amount up front. Bookings, payments and reminders are part of the Grow plan, and Stripe's standard fees apply to each payment.",
  },
  {
    q: "I already have a website. Can you rebuild it?",
    a: "Yes. A slow or tired site gets rebuilt faster and cleaner, with your pages and images moved across, redirects from every old address so the search traffic you have has the best chance of carrying over, and payments connected. It's included in Grow.",
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
    q: "What do I need to give you?",
    a: "Fifteen minutes on the phone, your logo if you have one, a few photos, your prices and hours, and access to your domain if you already own one. No photos? We'll use your Google Business photos or source licensed ones that look local.",
  },
  {
    q: "Will my business show up in ChatGPT and Google's AI answers?",
    a: "Nobody can guarantee it, and be wary of anyone who does. What we do is give AI search tools what they look for: clear, consistent details about your business on your website, your Google Business Profile and the directories they read, written so they can be quoted. It's part of every website plan.",
  },
  {
    q: "Can you build AI tools for my business?",
    a: "Yes. An AI concierge that answers your phone ($149 a month plus call time at cost), a chat assistant on your website that answers questions and replies to enquiries ($39 a month plus usage at cost), and custom agents for bookings, review replies, quote follow-ups and admin. Every one hands anything it's unsure about to you.",
  },
  {
    q: "What kind of web apps and software do you build?",
    a: "Tools that take admin off your plate: booking systems, client portals, quoting and job tools, dashboards, and automations that connect the apps you already use. Each project is quoted on its own. Send a brief and you'll get a scope and a price within 24 hours.",
  },
  {
    q: "Where is my data kept?",
    a: "Your site and apps run on Cloudflare and AWS, and your customers' details, bookings and files are stored in Australia, in Sydney. AI features use specialist providers, some overseas; we tell you exactly which ones, and only use providers that don't train on your data.",
  },
  {
    q: "Who reads my enquiry?",
    a: "A person, the same business day. Our AI assistant may email you a suggested plan within minutes, and it says it's an AI. A person reads every enquiry and follows up the same business day. It's the same kind of assistant we can set up on your own site.",
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
    ["#story", "How it works"],
    ["#work", "Work"],
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
        <a className="btn btn-primary nav-cta" href="#start">Get started</a>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          <span className="burger" aria-hidden="true"><i /><i /></span>
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Main" hidden={!open}>
        {links.map(([href, label], i) => <a key={href} href={href} style={{ animationDelay: `${i * 40}ms` }} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="btn btn-primary" href="#start" onClick={() => setOpen(false)}>Get started</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1><span>Get found.</span> <span>Get booked.</span> <span>Get paid.</span></h1>
          <p>From the corner café to the tradie's ute: a website, an AI concierge and payments, all looked after for you.</p>
          <div className="ctas">
            <a className="btn btn-primary btn-island" href="#start">Get started <span className="btn-i"><Icon name="arrow-up-right" /></span></a>
            <a className="text-link" href="#story">See how it works <Icon name="arrow-right" /></a>
          </div>
        </div>
        <HeroPhone />
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
        <div className="work-case">
          <Face who={w.owner.face} className="work-face" />
          <div>
            <h3>{w.business}</h3>
            <dl>
              <dt>Before</dt><dd>{w.problem}</dd>
              <dt>What the site does</dt><dd>{w.pitch}</dd>
            </dl>
          </div>
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
          <p className="lede">Six sample businesses, each in three of its own designs. Switch between them, or open the live site.</p>
        </div>
        <div className="work-nav">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous"><Icon name="arrow-right" className="i flip" /></button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next"><Icon name="arrow-right" /></button>
        </div>
      </div>
      <div className="work-track" ref={track} tabIndex={0} aria-label="Example sites">
        {WORK.map((w) => <WorkCard key={w.designs[0].path} w={w} />)}
      </div>
      <div className="wrap">
        <p className="work-note">These are sample businesses we made to show the range; names and reviews are fictional. A real client's design is made for them and never given to anyone else.</p>
      </div>
    </section>
  );
}

function Pricing({ onPlan }: { onPlan: (plan: string) => void }) {
  return (
    <section id="pricing" className="pricing">
      <div className="wrap">
        <h2 className="h2">One price a month. Nothing upfront.</h2>
        <p className="lede">Design, hosting and changes on one monthly bill. Prices in AUD.</p>
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
          <p><b>AI concierge</b> $149 a month with a local number, plus call time at cost (our estimate: about 15 to 20 cents a minute, so 200 minutes is roughly $30 to $40) up to a monthly cap you set. 3-month minimum, and nothing is charged until it's passed our test calls and you're happy with it. A chat assistant for your website is $39 a month.</p>
          <p><b>Web apps and automations</b> Quoted per project. <button className="link" type="button" onClick={() => onPlan("custom")}>Send a brief</button> for a scope and price within 24 hours.</p>
          <p><b>Rather own it outright?</b> One-off builds from $1,499, half at the start and half at launch.</p>
          <p><b>Founding clients</b> Our first 10 Launch clients pay $79 a month instead of $99, for as long as they stay on Launch. Same plan, same terms.</p>
        </div>
        <p className="plan-not">Not included: Stripe's fee on each payment, paid ads and photo shoots. No GST is added: we're not registered for GST yet.</p>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="promises-sec">
      <div className="wrap">
        <h2 className="h2">Straight up, in writing.</h2>
        <p className="lede">Some providers hold your domain, make leaving hard or won't say where your data lives. Not us.</p>
        <ul className="promises">
          <li><b>See it before you pay</b><span>A preview link before anything goes live. Your first charge happens only once you're happy with it.</span></li>
          <li><b>Your domain, in your name</b><span>Registered to you from day one. If you leave, it goes with you.</span></li>
          <li><b>Keep the site after 12 months</b><span>After a year, the site and its code are yours to keep, free. Stay on Care for $29 a month or take it anywhere.</span></li>
          <li><b>Your customers' data, stored in Sydney</b><span>Form submissions, bookings, files and databases we build for you are stored in AWS Sydney. Some tools process data overseas, like Stripe, Google and the AI and phone providers behind the concierge. We list every one in writing before you go live.</span></li>
          <li><b>Fast and safe, on Cloudflare and AWS</b><span>SSL, daily backups and uptime monitoring included. Payments go straight to your own Stripe account; we never hold your money.</span></li>
        </ul>
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

export const TEMPLATE_LABEL: Record<string, string> = {
  cafe: "Café, restaurant or bar",
  trades: "Trade or home service",
  studio: "Appointments (salon, clinic, studio)",
  shop: "Shop or online orders",
  pro: "Professional services (accounting, legal, real estate)",
  unsure: "Something else",
};
export const PLAN_LABEL: Record<string, string> = {
  launch: "Launch ($99/month)",
  grow: "Grow ($149/month)",
  care: "Care ($29/month)",
  rebuild: "Rebuild my existing site",
  oneoff: "One-off build (from $1,499)",
  custom: "Web app or custom software",
  concierge: "AI concierge ($149/month + call time)",
  ai: "Chat assistant ($39/month + usage) or custom AI",
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
          <h2 className="h2">Tell us about your business.</h2>
          <p className="lede">Tell us a little about your business. A person reads every enquiry and replies the same business day, with a suggested plan and a time for a quick call.</p>
          <p className="start-founder">Oceanalt is a small Sydney business that runs on AI agents, checked by a person. The agents draft and build. A person checks every site before it goes live and reads every enquiry the same business day. <a className="link" href="https://abr.business.gov.au/ABN/View?abn=65119854062" target="_blank" rel="noopener">ABN {ABN}</a>.</p>
          <div className="start-aside">
            <a href={`mailto:${EMAIL}`}><Icon name="mail" /> {EMAIL}</a>
            <span><Icon name="pin" /> Based in Sydney, working Australia-wide</span>
            <span><Icon name="clock" /> A reply the same business day</span>
          </div>
        </div>

        {state === "replied" ? (
          <div className="form-done" role="status">
            <Icon name="mail" />
            <h3>Check your inbox.</h3>
            <p>Our AI assistant has already emailed you a suggested plan and a link to book a 15-minute call. A person reads every enquiry and follows up the same business day. If it's not there in a minute, check your spam folder.</p>
          </div>
        ) : state === "done" ? (
          <div className="form-done" role="status">
            <Icon name="check-circle" />
            <h3>Thanks, we've got it.</h3>
            <p>A person will reply the same business day from {EMAIL}, with a suggested plan and a time for a quick call. If you have photos or a logo handy, send them along when you reply.</p>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            {plan !== "unsure" && <p className="form-picked">You picked <b>{PLAN_LABEL[plan]}</b>. You can change it below.</p>}
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
                <label htmlFor="f-plan">What are you after?</label>
                <select id="f-plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option value="unsure">{PLAN_LABEL.unsure}</option>
                  <optgroup label="Websites">
                    {["launch", "grow", "care", "rebuild", "oneoff"].map((v) => <option key={v} value={v}>{PLAN_LABEL[v]}</option>)}
                  </optgroup>
                  <optgroup label="AI and software">
                    {["concierge", "ai", "custom"].map((v) => <option key={v} value={v}>{PLAN_LABEL[v]}</option>)}
                  </optgroup>
                </select>
              </div>
            </div>
            <div className="field"><label htmlFor="f-website">Current website <small>(if you have one)</small></label><input id="f-website" name="website" type="text" inputMode="url" autoComplete="url" spellCheck={false} placeholder="yourbusiness.com.au…" /></div>
            <div className="field"><label htmlFor="f-message">What does your business do, and what do you need?</label><textarea id="f-message" name="message" rows={4} maxLength={2000} required /></div>
            <div className="hp" aria-hidden="true"><label htmlFor="f-company-site">Leave this empty</label><input id="f-company-site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
            {state === "error" && <p className="form-error" role="alert">That didn't send. Please try again, or email {EMAIL} directly.</p>}
            <button className="btn btn-accent" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : "Send it through"} <Icon name="send" />
            </button>
            <p className="form-note">Nothing is charged until you've seen it working and you're happy with it.</p>
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
        <nav className="foot-services" aria-label="Who we build for">
          {LANDINGS.map((l) => <a key={l.slug} href={`/${l.slug}/`}>{l.nav}</a>)}
        </nav>
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
      <p>Oceanalt designs, builds, hosts and maintains websites, web apps and AI agents for small businesses, on a monthly plan (Care, Launch or Grow, plus AI add-ons) or as a quoted project. What each plan includes is listed on the pricing section of this site and confirmed in writing before work starts.</p>
      <h2>2. Delivery</h2>
      <p>Launch and Grow sites are usually live within 1 to 3 business days of the kickoff call, provided we have the photos, prices and domain access we ask for. Steps run by third parties, such as Google Business Profile verification, Stripe account verification and domain transfers, may take longer and are outside that timeframe.</p>
      <h2>3. Billing</h2>
      <p>Monthly plans are billed in advance by card through Stripe. The first charge happens only after the client approves the preview. Launch and Grow have a 12-month minimum term, then continue month to month and can be cancelled with 30 days' notice. Founding clients (our first 10 on Launch) pay $79 a month instead of $99 for as long as they stay on Launch; everything else in these terms is the same. Cancelling within the first 12 months costs the lesser of the remaining months in that term or a $1,499 AUD buyout, and either way the site is transferred to the client. Care is month to month. One-off projects are billed 50% upfront and 50% at launch.</p>
      <h2>4. Ownership</h2>
      <p>The client owns their content and domain from day one; domains are registered in the client's name. On Launch and Grow, ownership of the site code transfers at no charge after 12 paid months, or earlier on payment of the buyout in section 3. For one-off projects, the client owns the code once the final invoice is paid.</p>
      <h2>5. Edits</h2>
      <p>Included edit time covers changes to existing pages. New pages or features are quoted in writing before work starts. Unused edit time does not roll over.</p>
      <h2>6. Payments to the client</h2>
      <p>Where a site takes payments, they are processed by Stripe into the client's own Stripe account. Oceanalt does not hold client funds or handle card data.</p>
      <h2>7. AI add-ons</h2>
      <p>The AI chat assistant costs $39 AUD a month plus AI usage. The AI concierge costs $149 AUD a month, including one Australian phone number, plus call time. Usage and call time are billed monthly in arrears at the providers' prices, converted to AUD, with no markup. The client sets a monthly cap; when it's reached, the assistant pauses (calls go to voicemail or the client's own number) until the next month or until the cap is raised. Custom AI agents are quoted in writing, with usage billed the same way.</p>
      <p>The AI concierge has a 3-month minimum term, then continues month to month with 30 days' notice. Its first charge happens only after it passes our test calls and the client approves it. Cancelling within the first 3 months costs the remaining months of that term. A number we supplied can be transferred to the client on request.</p>
      <p>The AI concierge tells every caller they're speaking with an AI assistant and, where calls are recorded, that the call may be recorded. The client provides the information it answers from and is responsible for keeping it accurate.</p>
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
      <p>This website is hosted on Cloudflare. When you send the start form, your message is sent to Anthropic's Claude API so our AI assistant can write the first reply, and emails are delivered by Resend. If that isn't available, submissions are stored in Google Firestore and sent to the Oceanalt inbox via EmailJS. Some of these providers are overseas, mainly in the United States. They process the data on our behalf and don't use it to train models.</p>
      <p>For our clients: their websites and apps are hosted on Cloudflare and AWS, and their customers' data (form submissions, bookings, files and databases) is stored in Australia, in AWS's Sydney region. AI features, such as the chat assistant and the AI concierge, send conversation or call content to AI and telephony providers that may be overseas; we tell each client which providers are used, and only use providers that don't train on their data. Call summaries are sent by WhatsApp, SMS or email.</p>
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
  const [plan, setPlan] = useState("unsure");
  // Service pages link to /?plan=<id>#start so the right plan is preselected.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("plan");
    if (p && p in PLAN_LABEL) setPlan(p);
  }, []);

  const goStart = () => document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  const pickPlan = (p: string) => {
    setPlan(p);
    goStart();
    window.setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 700);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div id="top" />
      <Nav />
      {route === "terms" ? <Terms /> : route === "privacy" ? <Privacy /> : (
        <main id="main">
          <Hero />
          <LogoWall />
          <Story onPlan={pickPlan} />
          <Work />
          <Promises />
          <Pricing onPlan={pickPlan} />
          <Faq />
          <Start template={template} plan={plan} setTemplate={setTemplate} setPlan={setPlan} />
        </main>
      )}
      <Footer />
    </>
  );
}
