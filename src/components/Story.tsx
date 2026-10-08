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
export function Face({ who, label, className = "" }: { who: string; label?: string; className?: string }) {
  return (
    <span className={`face ${className}`}>
      <img key={who} className="face-img" src={face(who)} alt={label ?? ""} width={160} height={160} loading="lazy" />
    </span>
  );
}

/* ─── Hero phone ─────────────────────────────────────────────────────────── */

type Note = { app: string; logo?: string; icon?: "phone" | "calendar"; who: string; title: string; body: string; time: string };
type Scene = { site: string; owner: string; phone: string; when: string; notes: [Note, Note] };

// Four sample businesses, each with its own website, its own owner and the
// kind of win we'd set up for them. The hero rotates through them.
const SCENES: Scene[] = [
  {
    site: "little-tern-coffee", owner: "tern", phone: "Little Tern's phone", when: "Saturday, the morning rush",
    notes: [
      { app: "Google", logo: "google", who: "priya", title: "Priya enquired from your Google listing", body: "Wants a catering box for 20, Friday at 8am.", time: "7:48" },
      { app: "Gmail", logo: "gmail", who: "sam", title: "Sam enquired through your website", body: "Table for 12, Sunday brunch. Is 10am free?", time: "8:15" },
    ],
  },
  {
    site: "kerr-and-sons-electrical", owner: "jim", phone: "Jim's phone", when: "Tuesday, up a ladder in Adamstown",
    notes: [
      { app: "Your concierge", icon: "phone", who: "mel-ok", title: "Mel's call answered, job booked", body: "Sparking power point, Merewether. Today 2 to 4pm.", time: "11:42" },
      { app: "Your concierge", icon: "phone", who: "tom", title: "Tom rang while you were driving", body: "Wants a quote for an EV charger. Prefers a text.", time: "1:20" },
    ],
  },
  {
    site: "saltwater-yoga", owner: "ana", phone: "Ana's phone", when: "Saturday, between classes",
    notes: [
      { app: "Stripe", logo: "stripe", who: "sam", title: "Sam booked and paid $25", body: "Sunrise flow, next Sat 7am. Paid with Apple Pay.", time: "8:31" },
      { app: "Stripe", logo: "stripe", who: "priya", title: "Priya bought a 10-class pack", body: "$240, paid with Afterpay. Lands in your Stripe.", time: "8:34" },
    ],
  },
  {
    site: "tidewater-physio-pilates", owner: "tide", phone: "Tidewater's phone", when: "Thursday, back-to-back patients",
    notes: [
      { app: "Google Calendar", logo: "googlecalendar", who: "tom", title: "Tom booked a Pilates class", body: "Thu 6pm, in your calendar. Reminder goes out Wed.", time: "10:05" },
      { app: "Xero", logo: "xero", who: "priya", title: "Priya paid, already in Xero", body: "Initial consult, $95. Marked paid, nothing typed up.", time: "12:40" },
    ],
  },
];

// One person in two poses (hand down, hand up), played as a short flipbook so
// they actually wave. Give it a new `key` to wave again.
// People with a hand-made frame-by-frame wave (a strip of frames in play order).
const SPRITES: Record<string, number> = { jim: 13 };

export function Wave({ who, on, loop = false, className = "", label }: { who: string; on: boolean; loop?: boolean; className?: string; label?: string }) {
  const frames = SPRITES[who];
  if (frames) {
    return (
      <span
        className={`face sprite${on ? " is-on" : ""}${loop ? " is-loop" : ""} ${className}`}
        style={{ backgroundImage: `url(${face(`${who}-wave-strip`)})`, backgroundSize: `${frames * 100}% 100%`, animationTimingFunction: `steps(${frames}, jump-none)` }}
        role={label ? "img" : undefined}
        aria-label={label}
      />
    );
  }
  return (
    <span className={`face flip${on ? " is-on" : ""}${loop ? " is-loop" : ""} ${className}`} role={label ? "img" : undefined} aria-label={label}>
      <img className="flip-a" src={face(who)} alt="" width={160} height={160} />
      <img className="flip-b" src={face(`${who}-wave`)} alt="" width={160} height={160} loading="lazy" />
    </span>
  );
}

export function HeroPhone() {
  // Scene on screen, and how many of its two notifications have landed.
  // The server renders the finished first scene; the timeline starts on mount.
  const [sc, setSc] = useState(0);
  const [count, setCount] = useState(2);
  useEffect(() => {
    if (reduced()) return;
    const timers: number[] = [];
    let i = 0;
    const run = () => {
      setSc(i % SCENES.length);
      setCount(0);
      timers.push(window.setTimeout(() => setCount(1), 900));
      timers.push(window.setTimeout(() => setCount(2), 3200));
      i += 1;
    };
    run();
    const loop = window.setInterval(run, 8000);
    return () => { window.clearInterval(loop); timers.forEach(clearTimeout); };
  }, []);
  const scene = SCENES[sc];
  const shown = scene.notes.slice(0, count).reverse();

  return (
    <div className="hp-scene" aria-hidden="true">
      <div className="hp-site">
        <div className="hp-site-bar"><i /><i /><i /><span>oceanalt.com.au/work/{scene.site}</span></div>
        <div className="hp-site-shots">
          {SCENES.map((x, i) => (
            <img key={x.site} className={i === sc ? "is-on" : ""} src={`/previews/${x.site}.webp`} alt="" width={1200} height={750} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
          ))}
        </div>
      </div>
      <div className="hp-phone">
        <div className="hp-island" />
        <div className="hp-owner">
          <Wave key={`${sc}-${count}`} who={scene.owner} on={count > 0} className="hp-jim" />
          <p><b>{scene.phone}</b><span>{scene.when}</span></p>
        </div>
        <p className="hp-clock num">{scene.notes[Math.max(count, 1) - 1].time}</p>
        <ul className="hp-notes">
          {shown.map((note, k) => (
            <li key={`${sc}-${note.title}`} className={`hp-note is-${k}`}>
              <Face who={note.who} className="hp-face" />
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

// A sample call, read like a real one: each line waits for the last to be
// said, the person talking is highlighted, and the next speaker "types" first.
const LINES: { who: "c" | "m"; text: string }[] = [
  { who: "c", text: "G'day, you're through to Kerr & Sons. I'm Jim's AI assistant, and this call is recorded. How can I help?" },
  { who: "m", text: "Hi. A power point in my kitchen's sparking. Can someone come out today?" },
  { who: "c", text: "If there's smoke or flames, hang up and call triple zero. Otherwise, keep clear of it." },
  { who: "m", text: "No smoke. I'm staying well away from it." },
  { who: "c", text: "Good. Jim can be there between 2 and 4 this arvo. What's the address?" },
  { who: "m", text: "That suits. It's Mel, 14 Ridge Street, Merewether." },
  { who: "c", text: "14 Ridge Street, Merewether, between 2 and 4 today. Jim's got it now. Thanks, Mel." },
];
const DONE = LINES.length + 1; // ringing is 0, lines are 1..n, then the WhatsApp

function CallVisual({ active }: { active: boolean }) {
  // `step` lines have been said; `typing` shows who's about to speak.
  const [step, setStep] = useState(DONE);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!active || reduced()) return;
    const timers: number[] = [];
    let at = 1200;
    setStep(0);
    setTyping(false);
    LINES.forEach((l, i) => {
      timers.push(window.setTimeout(() => setTyping(true), at));
      at += 700;
      timers.push(window.setTimeout(() => { setTyping(false); setStep(i + 1); }, at));
      at += Math.max(1500, l.text.length * 38); // time to read it
    });
    timers.push(window.setTimeout(() => setStep(DONE), at));
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const said = Math.min(step, LINES.length);
  const next = LINES[said];
  const melOk = said >= 6;
  const speaking = typing ? next?.who : step > 0 && step <= LINES.length ? LINES[said - 1].who : undefined;

  return (
    <div className="sv sv-call">
      <div className="sv-callcard">
        <div className="sv-caller">
          <span className={`sv-av${step === 0 ? " is-ringing" : ""}${speaking === "m" ? " is-speaking" : ""}`}><Face who={melOk ? "mel-ok" : "mel-worried"} label="Mel, the caller" /></span>
          <div><b>{step === 0 ? "Mel is calling" : step >= DONE ? "Call ended, job booked" : "Answered by Jim's AI concierge"}</b><small>{step >= DONE ? "Sent to Jim on WhatsApp" : "Jim's up a ladder in Adamstown"}</small></div>
          <span className={`sv-av sv-av-ai${speaking === "c" ? " is-speaking" : ""}`}><span className="sv-facewrap is-ai"><Face who="concierge" label="The AI concierge" /></span></span>
        </div>
        <ol className="sv-lines" aria-live="off">
          {said === 0 && !typing && <li className="sv-ringing"><Icon name="phone" /> Ringing. Your concierge picks up on the second ring.</li>}
          {LINES.slice(0, said).map((l, i) => (
            <li key={i} className={`is-${l.who}${i === said - 1 && step <= LINES.length ? " is-now" : ""}`}>
              <span className={`sv-facewrap${l.who === "c" ? " is-ai" : ""}`}><Face who={l.who === "c" ? "concierge" : i < 5 ? "mel-worried" : "mel-ok"} className="sv-face" /></span>
              <div><span>{l.who === "c" ? "AI concierge" : "Mel"}</span><p>{l.text}</p></div>
            </li>
          ))}
          {typing && next && (
            <li className={`is-${next.who} is-typing`}>
              <span className={`sv-facewrap${next.who === "c" ? " is-ai" : ""}`}><Face who={next.who === "c" ? "concierge" : melOk ? "mel-ok" : "mel-worried"} className="sv-face" /></span>
              <div><span>{next.who === "c" ? "AI concierge" : "Mel"}</span><p className="sv-dots"><i /><i /><i /></p></div>
            </li>
          )}
        </ol>
      </div>
      <div className={`sv-wa${step >= DONE ? " is-on" : ""}`}>
        <span className="sv-wa-who"><Wave key={step >= DONE ? "on" : "off"} who="jim" on={step >= DONE} label="Jim" /><img className="sv-wa-logo" src={logo("whatsapp")} alt="" width={18} height={18} /></span>
        <div><b>To Jim: new job booked</b><span>Mel, 14 Ridge St, Merewether. Sparking power point. Today 2 to 4pm.</span></div>
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
        <span>{m.id === "apple" ? "Pay Saltwater Yoga" : m.id === "afterpay" ? "Pay in 4 at Saltwater Yoga" : m.id === "card" ? "Card payment" : "Saltwater Yoga"}<small>Sunrise flow, Sat 7am</small></span>
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
      <div className={`sv-checkout${phase === "sheet" || phase === "auth" || phase === "done" ? " is-sheet" : ""}`}>
        <div className="sv-co-top">
          <Face who="ana" className="sv-co-face" />
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
  // Only the visible copy of each visual animates: the sticky stage on wide
  // screens, the inline one under each step on phones.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
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
                <div className="story-inline">{s.visual(i === active && !wide)}</div>
              </li>
            ))}
          </ol>
          {/* Only one copy of each visual is ever displayed (this stage on wide
              screens, the inline one on phones), and panes not on screen are inert. */}
          <div className="story-stage">
            {steps.map((s, i) => (
              <div key={s.id} className={`story-pane${i === active ? " is-on" : ""}`} inert={i !== active}>{s.visual(i === active && wide)}</div>
            ))}
          </div>
        </div>
        <p className="story-note">Kerr &amp; Sons and Saltwater Yoga are sample businesses we made up to show how it works.</p>
      </div>
    </section>
  );
}
