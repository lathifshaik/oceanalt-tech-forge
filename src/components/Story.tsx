import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { PipelineDemo } from "./Demos";

// The homepage story: a hero phone where the day's wins arrive as
// notifications, then four steps (found, called, paid, admin done) told on a
// sticky scroll, each with its own small working visual. Every visual renders
// complete on the server; in the browser it animates, and reduced motion keeps
// it still. Sample businesses only.

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const logo = (name: string) => `/logos/${name}.svg`;

/* ─── Hero phone ─────────────────────────────────────────────────────────── */

type Note = { app: string; logo?: string; icon?: "phone" | "calendar"; title: string; body: string; time: string };
const NOTES: Note[] = [
  { app: "Your concierge", icon: "phone", title: "Call answered, job booked", body: "Mel, Merewether. Sparking power point, today 2 to 4pm.", time: "11:42" },
  { app: "Stripe", logo: "stripe", title: "Deposit paid, $30", body: "Thu 2:30pm with Ana. Paid with Apple Pay.", time: "11:58" },
  { app: "Google", logo: "google", title: "New enquiry from your website", body: "Found you on Google Maps. Wants a quote for an EV charger.", time: "12:15" },
  { app: "Xero", logo: "xero", title: "Invoice paid", body: "Priya N., $2,380. Matched and reconciled.", time: "12:31" },
];

export function HeroPhone() {
  // Index of the newest notification shown; the three before it stack below.
  const [n, setN] = useState(2);
  useEffect(() => {
    if (reduced()) return;
    setN(0);
    const t = window.setInterval(() => setN((x) => x + 1), 2600);
    return () => window.clearInterval(t);
  }, []);
  const shown = [0, 1, 2].map((k) => n - k).filter((i) => i >= 0).map((i) => ({ i, note: NOTES[i % NOTES.length] }));

  return (
    <div className="hp-scene" aria-hidden="true">
      <img className="hp-site" src="/previews/kerr-and-sons-electrical.webp" alt="" width={1200} height={750} fetchPriority="high" />
      <div className="hp-phone">
        <div className="hp-island" />
        <p className="hp-time">Tuesday</p>
        <ul className="hp-notes">
          {shown.map(({ i, note }, k) => (
            <li key={i} className={`hp-note is-${k}`}>
              <span className="hp-app">
                {note.logo ? <img src={logo(note.logo)} alt="" width={16} height={16} /> : <Icon name={note.icon ?? "phone"} />}
                {note.app}
                <time>{note.time}</time>
              </span>
              <b>{note.title}</b>
              <span className="hp-body">{note.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Story visuals ──────────────────────────────────────────────────────── */

function FoundVisual() {
  return (
    <div className="sv sv-found">
      <div className="sv-browser">
        <div className="sv-browser-bar"><i /><i /><i /><span>kerrandsons.com.au</span></div>
        <img src="/previews/kerr-and-sons-electrical.webp" alt="A website we designed for a sample electrician" width={1200} height={750} loading="lazy" />
      </div>
      <div className="sv-where">
        <span>Shows up on</span>
        <img src={logo("google")} alt="Google" width={22} height={22} />
        <img src={logo("googlemaps")} alt="Google Maps" width={22} height={22} />
        <img src={logo("googlegemini")} alt="Google Gemini" width={22} height={22} />
        <img src={logo("perplexity")} alt="Perplexity" width={22} height={22} />
      </div>
    </div>
  );
}

const LINES: { who: "c" | "m"; text: string }[] = [
  { who: "c", text: "Kerr & Sons Electrical, you're speaking with Jim's AI concierge. How can I help?" },
  { who: "m", text: "A power point in my kitchen is sparking. Can someone come today?" },
  { who: "c", text: "Switch it off at the board for now. We can be there between 2 and 4 this arvo. Does that suit?" },
  { who: "m", text: "Perfect, 14 Ridge Street, Merewether." },
];

function CallVisual({ active }: { active: boolean }) {
  // Steps: 0 ringing, 1..4 lines, 5 WhatsApp to Jim. Complete when still.
  const [step, setStep] = useState(5);
  useEffect(() => {
    if (!active || reduced()) return;
    setStep(0);
    const t = [1, 2, 3, 4, 5].map((s) => window.setTimeout(() => setStep(s), 900 + (s - 1) * 1500));
    return () => t.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="sv sv-call">
      <div className="sv-callcard">
        <div className="sv-caller">
          <span className={`sv-av${step === 0 ? " is-ringing" : ""}`}>M</span>
          <div><b>{step === 0 ? "Mel is calling" : "Answered by your concierge"}</b><small>Jim's up a ladder in Charlestown</small></div>
          {step > 0 && step < 5 && <span className="sv-wave"><i /><i /><i /><i /></span>}
        </div>
        <ol className="sv-lines">
          {LINES.map((l, i) => (
            <li key={i} className={`is-${l.who}${step > i ? " is-on" : ""}`}><p>{l.text}</p></li>
          ))}
        </ol>
      </div>
      <div className={`sv-wa${step >= 5 ? " is-on" : ""}`}>
        <img src={logo("whatsapp")} alt="" width={20} height={20} />
        <div><b>New job booked</b><span>Mel, Merewether. Today 2 to 4pm. Told to switch it off at the board.</span></div>
      </div>
    </div>
  );
}

const PAY: { name: string; logo?: string }[] = [
  { name: "Apple Pay", logo: "applepay" },
  { name: "Google Pay", logo: "googlepay" },
  { name: "Afterpay", logo: "afterpay" },
  { name: "Card" },
];

function PayVisual({ active }: { active: boolean }) {
  // Cycles through payment methods: choose, paying, paid.
  const [k, setK] = useState(0);
  const [phase, setPhase] = useState<"ready" | "paying" | "paid">("paid");
  useEffect(() => {
    if (!active || reduced()) return;
    let i = 0;
    const cycle = () => {
      setK(i % PAY.length);
      setPhase("ready");
      timers.push(window.setTimeout(() => setPhase("paying"), 1100));
      timers.push(window.setTimeout(() => setPhase("paid"), 2000));
      i += 1;
    };
    const timers: number[] = [];
    cycle();
    const loop = window.setInterval(cycle, 3600);
    return () => { window.clearInterval(loop); timers.forEach(clearTimeout); };
  }, [active]);
  const m = PAY[k];

  return (
    <div className="sv sv-pay">
      <div className="sv-checkout">
        <div className="sv-co-top"><b>Tidewater Physio</b><span>Initial consult, Thu 2:30pm with Ana</span></div>
        <div className="sv-co-amt"><span>Deposit</span><b className="num">$30.00</b></div>
        <div className={`sv-co-btn is-${phase}`}>
          {phase === "paid" ? (
            <><Icon name="check" /> Paid with {m.name}</>
          ) : phase === "paying" ? (
            <><i className="sv-spin" /> Paying</>
          ) : (
            <>{m.logo ? <img src={logo(m.logo)} alt="" width={20} height={20} /> : <Icon name="card" />} Pay with {m.name}</>
          )}
        </div>
        <p className="sv-co-to"><img src={logo("stripe")} alt="" width={14} height={14} /> Paid straight into your own Stripe account</p>
      </div>
      <div className="sv-methods">
        <img src={logo("applepay")} alt="Apple Pay" width={26} height={26} />
        <img src={logo("googlepay")} alt="Google Pay" width={26} height={26} />
        <img src={logo("afterpay")} alt="Afterpay" width={26} height={26} />
        <img src={logo("stripe")} alt="Stripe" width={26} height={26} />
        <span>Card and bank transfer too</span>
      </div>
    </div>
  );
}

/* ─── The story ──────────────────────────────────────────────────────────── */

type StepDef = { id: string; kicker: string; title: string; body: string; price: string; cta: ReactNode; visual: (active: boolean) => ReactNode };

export function Story({ onPlan }: { onPlan: (plan: string) => void }) {
  const steps: StepDef[] = [
    {
      id: "found",
      kicker: "Get found",
      title: "They search. You're there.",
      body: "A website made for your business, your Google profile done properly, and your details set up so Google, Maps and AI answers point people your way.",
      price: "Websites from $99 a month, nothing upfront",
      cta: <a className="text-link" href="#work">See websites we've designed <Icon name="arrow-right" /></a>,
      visual: () => <FoundVisual />,
    },
    {
      id: "ai",
      kicker: "Never miss a call",
      title: "You're up a ladder. The phone still gets answered.",
      body: "Your AI concierge picks up in a natural Aussie voice, sorts out what the caller needs, books the job and sends you the details on WhatsApp or email.",
      price: "AI concierge $149 a month with a local number, plus call time",
      cta: <button type="button" className="text-link" onClick={() => onPlan("concierge")}>Set up my concierge <Icon name="arrow-right" /></button>,
      visual: (a) => <CallVisual active={a} />,
    },
    {
      id: "payments",
      kicker: "Get paid",
      title: "Booked and paid in one tap.",
      body: "Customers pick a time and pay a deposit or the full amount with Apple Pay, Google Pay, Afterpay or card. It lands in your own Stripe account, and nobody chases anyone.",
      price: "Payments and bookings included in Grow, $149 a month",
      cta: <button type="button" className="text-link" onClick={() => onPlan("grow")}>Start taking payments <Icon name="arrow-right" /></button>,
      visual: (a) => <PayVisual active={a} />,
    },
    {
      id: "admin",
      kicker: "Less admin",
      title: "The paperwork sorts itself out.",
      body: "We make your pipeline efficient, from first enquiry to paid invoice. Quotes, bookings and invoices move between your apps on their own, so nobody types anything twice.",
      price: "Web apps and automations, quoted within 24 hours",
      cta: <button type="button" className="text-link" onClick={() => onPlan("custom")}>Send a brief <Icon name="arrow-right" /></button>,
      visual: () => <PipelineDemo />,
    },
  ];

  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="story" id="story" aria-labelledby="story-h">
      <div className="wrap">
        <h2 className="h2" id="story-h">From first search to paid invoice.</h2>
        <div className="story-grid">
          <ol className="story-steps">
            {steps.map((s, i) => (
              <li key={s.id} id={s.id} data-i={i} ref={(el) => { refs.current[i] = el; }} className={i === active ? "is-active" : ""}>
                <span className="story-kicker"><b className="num">{i + 1}</b> {s.kicker}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="story-price">{s.price}</p>
                {s.cta}
                <div className="story-inline">{s.visual(i === active)}</div>
              </li>
            ))}
          </ol>
          <div className="story-stage" aria-hidden="true">
            {steps.map((s, i) => (
              <div key={s.id} className={`story-pane${i === active ? " is-on" : ""}`}>{s.visual(i === active)}</div>
            ))}
          </div>
        </div>
        <p className="story-note">Kerr &amp; Sons and Tidewater Physio are sample businesses we made up to show how it works.</p>
      </div>
    </section>
  );
}
