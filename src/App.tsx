import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon, type IconName } from "./components/Icon";

// ─── Content ─────────────────────────────────────────────────────────────────
// Pricing and terms here must match docs/business/BUSINESS_PLAN.md and the
// Terms page below. Change them together.

const EMAIL = "hello@oceanalt.com.au";

type TemplateId = "cafe" | "trades" | "studio";

const WORK: { id: TemplateId; name: string; slug: string; sample: string; pitch: string; for: string }[] = [
  {
    id: "cafe",
    name: "Café",
    slug: "little-tern-coffee",
    sample: "Little Tern Coffee, Fremantle",
    pitch: "Menu, opening hours and directions up front. The sign on the photo flips to OPEN or CLOSED from your real hours.",
    for: "Cafés, bakeries, small restaurants and bars",
  },
  {
    id: "trades",
    name: "Trades",
    slug: "kerr-and-sons-electrical",
    sample: "Kerr & Sons Electrical, Newcastle",
    pitch: "Built to make the phone ring: tap-to-call everywhere, your licence front and centre, and a quote form.",
    for: "Electricians, plumbers, builders and cleaners",
  },
  {
    id: "studio",
    name: "Studio",
    slug: "tidewater-physio-pilates",
    sample: "Tidewater Physio & Pilates, Bulimba",
    pitch: "Every treatment has a price and a Book button. Gift vouchers sell themselves, paid straight into your Stripe.",
    for: "Salons, clinics, physio, Pilates and coaches",
  },
];

const PLANS = [
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
      "Up to 5 pages on your choice of template",
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
    price: "$199",
    term: "$0 upfront · 12-month minimum",
    desc: "For businesses that take money or bookings online. Everything in Launch, plus:",
    features: [
      "Up to 12 pages",
      "Online payments, deposits or a small shop",
      "Bookings and gift vouchers",
      "Rebuild of your existing site included",
      "2 hours of edits every month",
      "Monthly traffic and leads report",
    ],
    featured: false,
  },
];

const PROMISES: { icon: IconName; title: string; body: string }[] = [
  { icon: "eye", title: "See it before you pay", body: "You get a preview link within a day. Your first monthly charge only happens once you're happy with it." },
  { icon: "globe", title: "Your domain, in your name", body: "We register it to you from day one. It's never held hostage, whatever happens." },
  { icon: "home", title: "Keep the site after 12 months", body: "After a year, the site and its code are yours to keep, free. Stay on Care for $29 or take it anywhere." },
  { icon: "card", title: "Payments go straight to you", body: "Customer payments land in your own Stripe account. We never hold your money or see card details." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How can it be live in 1 to 3 days?",
    a: "We start from one of our templates instead of a blank page, and we write the words ourselves after a 15-minute call. That removes the two things that usually take weeks: designing from scratch and waiting on copy. Google Business Profile and Stripe verification are run by Google and Stripe, so those can take a little longer.",
  },
  {
    q: "What do I need to give you?",
    a: "Fifteen minutes on the phone, your logo if you have one, a few photos, your prices and hours, and access to your domain if you already own one. No photos? We'll use your Google Business photos or source licensed ones that look local.",
  },
  {
    q: "Will my site look like everyone else's?",
    a: "No. The template is the structure. Your photos, words, colours and logo go on top, and the layout is adjusted to what your customers need to do first.",
  },
  {
    q: "How do changes work?",
    a: "Email us what you want changed: prices, photos, a new menu, a blog post. It's usually done within two business days. Launch includes 30 minutes a month and Grow includes 2 hours. Bigger additions are quoted before any work starts.",
  },
  {
    q: "What if I want to leave?",
    a: "After 12 months you can cancel any time from your billing page and keep the site, code and domain. Leaving earlier costs the rest of the first year or a $1,499 buyout, whichever is less, and the site is still yours.",
  },
  {
    q: "Do you build custom apps too?",
    a: "Sometimes. Client portals, internal tools and small SaaS products are quoted per project. Send a brief and you'll get a scope and a price within 24 hours.",
  },
];

// ─── Pieces ─────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Oceanalt home">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
        <circle cx="16" cy="16" r="13" />
        <path d="M7 17.5c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 5 0" />
        <path d="M9 22c1.8-1.4 3.6-1.4 5.4 0s3.6 1.4 5.4 0" opacity=".55" />
      </svg>
      oceanalt
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
  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          <a href="#work">Work</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="btn btn-primary" href="#start">Start my website</a>
      </div>
    </header>
  );
}

// The three real templates, stacked in 3D. Pointer position tilts the stack.
function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      el.classList.add("is-tilting");
    };
    const leave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
      el.classList.remove("is-tilting");
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
        {WORK.map((w) => (
          <a key={w.id} className="frame" href={`/work/${w.slug}/`} target="_blank" rel="noopener" aria-label={`Open the ${w.name} example`}>
            <div className="frame-bar" aria-hidden="true">
              <span /><span /><span />
              <em>{w.slug.replace(/-/g, "")}.com.au</em>
            </div>
            <img src={`/previews/${w.slug}.webp`} alt="" width={1200} height={750} />
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <h1>Your website, done for you.</h1>
          <p>We design, build and look after it for one monthly fee. Nothing upfront, live in 1 to 3 days.</p>
          <div className="ctas">
            <a className="btn btn-accent" href="#start">Start my website <Icon name="arrow-right" /></a>
            <a className="btn btn-line" href="#work">See our work</a>
          </div>
        </div>
        <Stack />
      </div>
    </div>
  );
}

function Facts() {
  const facts: { icon: IconName; text: string }[] = [
    { icon: "tag", text: "From $99 a month" },
    { icon: "card", text: "$0 upfront" },
    { icon: "bolt", text: "Live in 1 to 3 days" },
    { icon: "home", text: "Yours to keep after 12 months" },
  ];
  return (
    <div className="facts">
      <ul className="wrap">
        {facts.map((f) => (
          <li key={f.text}><Icon name={f.icon} /> {f.text}</li>
        ))}
      </ul>
    </div>
  );
}

function Work({ onPick }: { onPick: (t: TemplateId) => void }) {
  return (
    <section id="work">
      <div className="wrap">
        <h2 className="h2">Pick a starting point</h2>
        <p className="lede">Three templates built around how small businesses actually get customers. Yours gets your photos, words and colours, so no two sites look the same.</p>
        <div className="work-grid">
          {WORK.map((w) => (
            <article className="work" key={w.id}>
              <a className="work-img" href={`/work/${w.slug}/`} target="_blank" rel="noopener" aria-label={`Open the live ${w.name} example`}>
                <img src={`/previews/${w.slug}.webp`} alt={`${w.name} template, shown as ${w.sample}`} width={1200} height={750} loading="lazy" />
              </a>
              <div className="work-body">
                <h3>{w.name}</h3>
                <span className="sample">{w.for}</span>
                <p>{w.pitch}</p>
                <div className="work-actions">
                  <a className="btn btn-line" href={`/work/${w.slug}/`} target="_blank" rel="noopener">Live example <Icon name="arrow-up-right" /></a>
                  <button className="btn btn-primary" type="button" onClick={() => onPick(w.id)}>Start with {w.name}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="work-note">The examples are sample businesses we made to show each template. Names and reviews are fictional.</p>
      </div>
    </section>
  );
}

function How() {
  const steps: { when: string; icon: IconName; title: string; body: string }[] = [
    { when: "Day 0", icon: "chat", title: "Tell us about your business", body: "A 15-minute call or the form below. Send photos if you have them. We write the words." },
    { when: "Within 24 hours", icon: "eye", title: "See your site", body: "A private preview link to check on your phone. Ask for changes, and nothing is charged until you're happy." },
    { when: "Day 1 to 3", icon: "send", title: "Go live, then we look after it", body: "We connect your domain, Google profile and payments. After that, just email us when something needs changing." },
  ];
  return (
    <section className="how" id="how">
      <div className="wrap">
        <h2 className="h2">How it works</h2>
        <ol className="steps">
          {steps.map((s) => (
            <li className="step" key={s.title}>
              <span className="when"><Icon name={s.icon} /> {s.when}</span>
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
    <section id="pricing">
      <div className="wrap">
        <h2 className="h2">One monthly fee. Everything handled.</h2>
        <p className="lede">Prices in AUD. No setup fee on any plan.</p>
        <div className="plans">
          {PLANS.map((p) => (
            <div className={`plan${p.featured ? " is-featured" : ""}`} key={p.id}>
              <div className="plan-top">
                <span className="plan-name">{p.name}</span>
                {p.featured && <span className="plan-badge">Most popular</span>}
              </div>
              <div className="plan-price num"><b>{p.price}</b><span>/month</span></div>
              <p className="plan-term">{p.term}</p>
              <p className="plan-desc">{p.desc}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}><Icon name="check" /> {f}</li>
                ))}
              </ul>
              <button className="btn btn-line" type="button" onClick={() => onPlan(p.id)}>Choose {p.name}</button>
            </div>
          ))}
        </div>
        <div className="plan-extra">
          <div>
            <h3>Rather own it outright?</h3>
            <p>One-off builds from $1,499, paid half at the start and half at launch. Add Care for $29 a month if you'd like us to keep looking after it.</p>
          </div>
          <div>
            <h3>Need something bigger?</h3>
            <p>Client portals, internal tools and small SaaS products are quoted per project. <button className="link" type="button" onClick={() => onPlan("custom")}>Send a brief</button> and you'll get a scope and price within 24 hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rebuild({ onPlan }: { onPlan: (plan: string) => void }) {
  return (
    <section className="rebuild" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="box">
          <div>
            <h2>Already have a website? <em>We'll rebuild it, payments included.</em></h2>
            <p className="lede">Slow Wix site, tired WordPress, a Shopify theme you've outgrown. We rebuild it faster and cleaner, keep your Google rankings, and connect payments. It's included in Grow.</p>
            <button className="btn btn-accent" type="button" onClick={() => onPlan("rebuild")}>Rebuild my site</button>
          </div>
          <ol>
            <li><b>Send us your URL</b><span>Tell us what works and what doesn't.</span></li>
            <li><b>See the new version</b><span>A preview within a day, built from your existing content.</span></li>
            <li><b>We move everything across</b><span>Pages, images and redirects, so you keep your search rankings.</span></li>
            <li><b>Switch over with no downtime</b><span>Same domain and email. Your old host can be cancelled.</span></li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2 className="h2">No hostage websites</h2>
        <p className="lede">Pay-monthly websites have a bad name because some providers hold your domain and make leaving hard. We put these in writing instead.</p>
        <div className="promises">
          {PROMISES.map((p) => (
            <div className="promise" key={p.title}>
              <Icon name={p.icon} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div>
          <h2 className="h2">Questions</h2>
          <p className="lede">Something else? Email <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEMPLATE_LABEL: Record<string, string> = { cafe: "Café", trades: "Trades", studio: "Studio", unsure: "Not sure yet" };
const PLAN_LABEL: Record<string, string> = {
  launch: "Launch ($99/month)",
  grow: "Grow ($199/month)",
  care: "Care ($29/month)",
  rebuild: "Rebuild my existing site",
  oneoff: "One-off build (from $1,499)",
  custom: "Custom project",
  unsure: "Not sure yet",
};

function Start({ template, plan, setTemplate, setPlan }: { template: string; plan: string; setTemplate: (v: string) => void; setPlan: (v: string) => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      const site = String(data.get("website") || "").trim();
      const phone = String(data.get("phone") || "").trim();
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
          <h2 className="h2">Start your website</h2>
          <p className="lede">Tell us a little about your business. We'll reply within one business day to book a 15-minute call.</p>
          <div className="start-aside">
            <a href={`mailto:${EMAIL}`}><Icon name="mail" /> {EMAIL}</a>
            <span><Icon name="pin" /> Based in Sydney, working Australia-wide</span>
            <span><Icon name="clock" /> Replies within one business day</span>
          </div>
        </div>

        {state === "done" ? (
          <div className="form-done" role="status">
            <Icon name="check-circle" />
            <h3>Thanks, we've got it.</h3>
            <p>We'll email you within one business day to book a quick call. If you have photos or a logo handy, reply to that email with them.</p>
          </div>
        ) : (
          <form className="form" onSubmit={submit}>
            <div className="row">
              <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" autoComplete="name" required /></div>
              <div className="field"><label htmlFor="f-business">Business name</label><input id="f-business" name="business" autoComplete="organization" required /></div>
            </div>
            <div className="row">
              <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required /></div>
              <div className="field"><label htmlFor="f-phone">Phone <small>(optional)</small></label><input id="f-phone" name="phone" type="tel" autoComplete="tel" /></div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="f-template">Template</label>
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
            <div className="field"><label htmlFor="f-website">Current website <small>(if you have one)</small></label><input id="f-website" name="website" type="url" inputMode="url" placeholder="https://" /></div>
            <div className="field"><label htmlFor="f-message">What does your business do, and what should the site help with?</label><textarea id="f-message" name="message" rows={4} required /></div>
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
        <span>© {new Date().getFullYear()} Oceanalt · Sydney, Australia</span>
        <nav aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#pricing">Pricing</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="#/terms">Terms</a>
          <a href="#/privacy">Privacy</a>
        </nav>
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
      <h2>7. Limitation of liability</h2>
      <p>To the extent permitted by the Australian Consumer Law, Oceanalt is not liable for indirect or consequential loss arising from the use of, or inability to use, the services.</p>
    </Legal>
  );
}

function Privacy() {
  return (
    <Legal title="Privacy policy">
      <h2>1. Contact</h2>
      <p>Oceanalt is based in Sydney, Australia. For privacy enquiries, email {EMAIL}.</p>
      <h2>2. What is collected</h2>
      <p>When you send the start form, we collect your name, business name, email, and optionally your phone number, current website and message. No tracking pixels or third-party analytics are used by default.</p>
      <h2>3. Where it is stored</h2>
      <p>Submissions are stored in Google Firestore, and a copy is sent to the Oceanalt inbox via EmailJS.</p>
      <h2>4. How it is used</h2>
      <p>Submissions are used to reply to you and scope your website. Data is not sold, shared with third parties for marketing, or used to train any model. Deletion requests are honoured.</p>
      <h2>5. Your rights under the Privacy Act 1988</h2>
      <p>You may request access to, correction of, or deletion of the information we hold about you by emailing {EMAIL}.</p>
    </Legal>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

function useRoute() {
  const read = () => (window.location.hash.startsWith("#/") ? window.location.hash.slice(2) : "");
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
  const pickTemplate = (t: TemplateId) => { setTemplate(t); goStart(); };
  const pickPlan = (p: string) => { setPlan(p); goStart(); };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div id="top" />
      <Nav />
      {route === "terms" ? <Terms /> : route === "privacy" ? <Privacy /> : (
        <main id="main">
          <Hero />
          <Facts />
          <Work onPick={pickTemplate} />
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
