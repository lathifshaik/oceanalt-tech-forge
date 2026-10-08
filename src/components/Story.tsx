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
// 3D people from Microsoft Fluent Emoji (MIT, see public/avatars/LICENSE.txt).
const face = (name: string) => `/avatars/${name}.webp`;

// A person, plus an optional 3D expression that pops in beside them when it
// changes (worried, relieved, grinning...), so you can read how they feel.
export type Mood = "worried" | "anxious" | "relieved" | "grin" | "party" | "smile" | "thinking" | "wink" | "beaming" | "nerd" | "starstruck";
export function Face({ who, mood, label, className = "" }: { who: string; mood?: Mood; label?: string; className?: string }) {
  return (
    <span className={`face ${className}`}>
      <img key={who} className="face-img" src={face(who)} alt={label ?? ""} width={160} height={160} loading="lazy" />
      {mood && <img key={mood} className="face-mood" src={face(`mood-${mood}`)} alt="" width={96} height={96} loading="lazy" />}
    </span>
  );
}

/* ─── Hero phone ─────────────────────────────────────────────────────────── */

type Note = { app: string; logo?: string; icon?: "phone" | "calendar"; who: string; mood: Mood; title: string; body: string; time: string };
const NOTES: Note[] = [
  { app: "Your concierge", icon: "phone", who: "mel-ok", mood: "relieved", title: "Mel's call answered, job booked", body: "Sparking power point, Merewether. Today 2 to 4pm.", time: "11:42" },
  { app: "Stripe", logo: "stripe", who: "sam", mood: "smile", title: "Sam paid a $30 deposit", body: "Switchboard check, Thu 8am. Paid with Apple Pay.", time: "11:58" },
  { app: "Google", logo: "google", who: "tom", mood: "grin", title: "Tom found you on Google Maps", body: "Wants a quote for an EV charger in Adamstown.", time: "12:15" },
  { app: "Xero", logo: "xero", who: "priya", mood: "beaming", title: "Priya paid her invoice", body: "$2,380, matched and reconciled in Xero.", time: "12:31" },
];

// The kinds of owners we work for, floating around the phone.
const ORBIT: { who: string; label: string; mood: Mood }[] = [
  { who: "yoga", label: "Yoga teacher", mood: "relieved" },
  { who: "cafe", label: "Café owner", mood: "beaming" },
  { who: "physio", label: "Physio", mood: "smile" },
  { who: "mechanic", label: "Mechanic", mood: "wink" },
  { who: "landscaper", label: "Landscaper", mood: "grin" },
  { who: "accountant", label: "Accountant", mood: "nerd" },
];

export function HeroPhone() {
  // Index of the newest notification shown; the three before it stack below.
  const [n, setN] = useState(2);
  const [jim, setJim] = useState<Mood | undefined>("grin");
  useEffect(() => {
    if (reduced()) return;
    setN(0);
    setJim(undefined);
    const off: number[] = [];
    const t = window.setInterval(() => {
      setN((x) => x + 1);
      setJim(["grin", "party", "beaming", "starstruck"][Math.floor(Math.random() * 4)] as Mood);
      off.push(window.setTimeout(() => setJim(undefined), 1500));
    }, 2600);
    return () => { window.clearInterval(t); off.forEach(clearTimeout); };
  }, []);
  const shown = [0, 1, 2].map((k) => n - k).filter((i) => i >= 0).map((i) => ({ i, note: NOTES[i % NOTES.length] }));

  return (
    <div className="hp-scene" aria-hidden="true">
      {ORBIT.map((o, i) => (
        <span key={o.who} className={`hp-orbit o${i + 1}`} title={o.label} style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
          <Face who={o.who} mood={o.mood} />
        </span>
      ))}
      <img className="hp-site" src="/previews/kerr-and-sons-electrical.webp" alt="" width={1200} height={750} fetchPriority="high" />
      <div className="hp-phone">
        <div className="hp-island" />
        <div className="hp-owner">
          <Face who="jim" mood={jim} className="hp-jim" />
          <p><b>Jim's phone</b><span>Tuesday, on the tools</span></p>
        </div>
        <ul className="hp-notes">
          {shown.map(({ i, note }, k) => (
            <li key={i} className={`hp-note is-${k}`}>
              <Face who={note.who} mood={note.mood} className="hp-face" />
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
        <span>Set up for</span>
        <img src={logo("google")} alt="Google" width={22} height={22} />
        <img src={logo("googlemaps")} alt="Google Maps" width={22} height={22} />
        <img src={logo("googlegemini")} alt="Google Gemini" width={22} height={22} />
        <img src={logo("perplexity")} alt="Perplexity" width={22} height={22} />
      </div>
    </div>
  );
}

const LINES: { who: "c" | "m"; text: string }[] = [
  { who: "c", text: "G'day, Kerr & Sons Electrical. I'm Jim's AI concierge, and this call is recorded so Jim gets the details. How can I help?" },
  { who: "m", text: "A power point in my kitchen is sparking. Can someone come today?" },
  { who: "c", text: "If there's smoke or flames, hang up and call triple zero. Otherwise keep clear of it. Jim can be there between 2 and 4 this arvo. Does that suit?" },
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
          <span className={`sv-av${step === 0 ? " is-ringing" : ""}`}><Face who={step >= 4 ? "mel-ok" : "mel-worried"} mood={step >= 4 ? "relieved" : "worried"} label="Mel, the caller" /></span>
          <div><b>{step === 0 ? "Mel is calling" : "Answered by your concierge"}</b><small>Jim's up a ladder in Charlestown</small></div>
          {step > 0 && step < 5 && <span className="sv-wave"><i /><i /><i /><i /></span>}
        </div>
        <ol className="sv-lines">
          {LINES.map((l, i) => (
            <li key={i} className={`is-${l.who}${step > i ? " is-on" : ""}`}>
              <span className={`sv-facewrap${l.who === "c" ? " is-ai" : ""}`}><Face who={l.who === "c" ? "concierge" : i < 3 ? "mel-worried" : "mel-ok"} className="sv-face" /></span>
              <div><span>{l.who === "c" ? "AI concierge" : "Mel"}</span><p>{l.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <div className={`sv-wa${step >= 5 ? " is-on" : ""}`}>
        <span className="sv-wa-who"><Face who={step >= 5 ? "jim-wave" : "jim"} mood={step >= 5 ? "party" : undefined} label="Jim" /><img className="sv-wa-logo" src={logo("whatsapp")} alt="" width={18} height={18} /></span>
        <div><b>To Jim: new job booked</b><span>Mel, Merewether. Today 2 to 4pm. Told to switch it off at the board.</span></div>
      </div>
    </div>
  );
}

// A checkout that plays each payment method the way people know it: a sheet
// slides up (Apple Pay with Face ID, Google Pay with a card, Afterpay in four,
// or a typed card), then a tick draws itself and the class is paid.
type Method = "apple" | "google" | "afterpay" | "card";
const PAY: { id: Method; name: string; logo?: string; done: string }[] = [
  { id: "apple", name: "Apple Pay", logo: "applepay", done: "#0b1a22" },
  { id: "google", name: "Google Pay", logo: "googlepay", done: "#1a73e8" },
  { id: "afterpay", name: "Afterpay", logo: "afterpay", done: "#0f1c1a" },
  { id: "card", name: "card", done: "#0b7285" },
];
type Phase = "ready" | "sheet" | "auth" | "done" | "paid";

function Tick({ color }: { color: string }) {
  return (
    <svg className="sv-tick" viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="23" fill="none" stroke={color} strokeWidth="3" />
      <path d="M15 27l7 7 15-16" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaceId() {
  return (
    <svg className="sv-faceid" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M4 14V9a5 5 0 0 1 5-5h5M34 4h5a5 5 0 0 1 5 5v5M44 34v5a5 5 0 0 1-5 5h-5M14 44H9a5 5 0 0 1-5-5v-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M17 18v4M31 18v4M24 18v9h-2M18 33c3.5 3 8.5 3 12 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sheet({ m, phase }: { m: (typeof PAY)[number]; phase: Phase }) {
  const auth = phase === "auth";
  const done = phase === "done";
  return (
    <div className={`sv-sheet is-${m.id}${phase === "sheet" || auth || done ? " is-open" : ""}`}>
      <div className="sv-sheet-top">
        {m.logo ? <img src={logo(m.logo)} alt="" width={40} height={40} /> : <Icon name="card" />}
        <span>Saltwater Yoga</span>
        <b className="num">$25.00</b>
      </div>
      {done ? (
        <div className="sv-sheet-done"><Tick color={m.done} /><span>{m.id === "apple" ? "Done" : "Paid"}</span></div>
      ) : m.id === "apple" ? (
        <div className={`sv-sheet-auth${auth ? " is-scan" : ""}`}><FaceId /><span>{auth ? "Confirming with Face ID" : "Double-click to pay"}</span></div>
      ) : m.id === "google" ? (
        <div className="sv-sheet-auth">
          <div className={`sv-gcard${auth ? " is-tap" : ""}`}><span>Visa</span><b>•••• 4242</b></div>
          <span className={`sv-gbtn${auth ? " is-press" : ""}`}>Continue</span>
        </div>
      ) : m.id === "afterpay" ? (
        <div className="sv-sheet-auth">
          <ol className={`sv-four${auth ? " is-fill" : ""}`}><li /><li /><li /><li /></ol>
          <span>4 payments of $6.25, interest-free</span>
        </div>
      ) : (
        <div className="sv-sheet-auth">
          <span className={`sv-cardno num${auth ? " is-typed" : ""}`}><i>4242 4242 4242 4242</i></span>
          <span>Card details</span>
        </div>
      )}
    </div>
  );
}

function PayVisual({ active }: { active: boolean }) {
  const [k, setK] = useState(0);
  const [phase, setPhase] = useState<Phase>("paid");
  useEffect(() => {
    if (!active || reduced()) return;
    let i = 0;
    const timers: number[] = [];
    const at = (ms: number, f: () => void) => timers.push(window.setTimeout(f, ms));
    const cycle = () => {
      setK(i % PAY.length);
      setPhase("ready");
      at(900, () => setPhase("sheet"));
      at(1700, () => setPhase("auth"));
      at(3200, () => setPhase("done"));
      at(4600, () => setPhase("paid"));
      i += 1;
    };
    cycle();
    const loop = window.setInterval(cycle, 6200);
    return () => { window.clearInterval(loop); timers.forEach(clearTimeout); };
  }, [active]);
  const m = PAY[k];
  const paid = phase === "paid" || phase === "done";

  return (
    <div className="sv sv-pay">
      <div className="sv-checkout">
        <div className="sv-co-top">
          <Face who="yoga" mood={paid ? "starstruck" : "smile"} className="sv-co-face" />
          <div><b>Saltwater Yoga</b><span>Sunrise flow, Sat 7am with Ana</span></div>
        </div>
        <div className="sv-co-amt"><span>Class</span><b className="num">$25.00</b></div>
        <div className={`sv-co-btn is-${phase === "paid" ? "paid" : "ready"}${phase === "ready" ? " is-press" : ""}`}>
          {phase === "paid" ? (
            <><Icon name="check" /> Paid with {m.name === "card" ? "card" : m.name}</>
          ) : (
            <>{m.logo ? <img src={logo(m.logo)} alt="" width={20} height={20} /> : <Icon name="card" />} Pay with {m.name}</>
          )}
        </div>
        <p className="sv-co-to"><img src={logo("stripe")} alt="" width={14} height={14} /> Paid straight into your own Stripe account</p>
        <Sheet m={m} phase={phase} />
      </div>
      <div className="sv-methods">
        <img src={logo("applepay")} alt="Apple Pay" width={26} height={26} />
        <img src={logo("googlepay")} alt="Google Pay" width={26} height={26} />
        <img src={logo("afterpay")} alt="Afterpay" width={26} height={26} />
        <img src={logo("stripe")} alt="Stripe" width={26} height={26} />
        <span>Card too, straight into Stripe</span>
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
      title: "Someone nearby searches 'sparky near me' tonight.",
      body: "A website made for your business, your Google profile done properly, and your details set up so Google, Maps and AI answers have the right facts about you.",
      price: "Websites from $99 a month, nothing upfront",
      cta: <a className="text-link" href="#work">See websites we've designed <Icon name="arrow-right" /></a>,
      visual: () => <FoundVisual />,
    },
    {
      id: "ai",
      kicker: "Never miss a call",
      title: "You're up a ladder. The phone still gets answered.",
      body: "Your AI concierge picks up in a natural Aussie voice, sorts out what the caller needs, tells callers it's an AI, books the job and sends you the details by WhatsApp, text or email.",
      price: "AI concierge $149 a month with a local number, plus call time at cost",
      cta: <button type="button" className="text-link" onClick={() => onPlan("concierge")}>Set up my concierge <Icon name="arrow-right" /></button>,
      visual: (a) => <CallVisual active={a} />,
    },
    {
      id: "payments",
      kicker: "Get paid",
      title: "No more chasing $25 after class.",
      body: "Whether it's a sunrise yoga class or a switchboard check, customers pick a time and pay a deposit or the full amount with Apple Pay, Google Pay, Afterpay or card. It lands in your own Stripe account, and nobody chases anyone.",
      price: "Payments and bookings included in Grow, $149 a month",
      cta: <button type="button" className="text-link" onClick={() => onPlan("grow")}>Start taking payments <Icon name="arrow-right" /></button>,
      visual: (a) => <PayVisual active={a} />,
    },
    {
      id: "admin",
      kicker: "Less admin",
      title: "It's 9pm and you're still typing up invoices.",
      body: "We make your pipeline efficient: we connect the apps you already use, so an enquiry turns into a quote, a booking and a paid invoice without you copying it across.",
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
        <p className="story-note">Kerr &amp; Sons and Saltwater Yoga are sample businesses we made up to show how it works.</p>
      </div>
    </section>
  );
}
