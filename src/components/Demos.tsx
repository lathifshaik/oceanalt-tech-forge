import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// Small working demos for the services section, so each service feels like a
// product you can try. They use sample businesses and move no real money.

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const logo = (name: string) => `/logos/${name}.svg`;

// Runs `fn` once when the element scrolls into view.
function useInView(fn: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { fn(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

const SLOTS = ["Thu 2:30pm", "Thu 4:00pm", "Fri 8:00am"];
const METHODS: { id: string; label: string; logo?: string }[] = [
  { id: "card", label: "Card" },
  { id: "apple", label: "Apple Pay", logo: "applepay" },
  { id: "google", label: "Google Pay", logo: "googlepay" },
  { id: "afterpay", label: "Afterpay", logo: "afterpay" },
  { id: "bank", label: "Bank transfer" },
];

// Book a time and pay a deposit, like a customer would on a client's site.
export function BookPayDemo() {
  const [slot, setSlot] = useState(SLOTS[0]);
  const [method, setMethod] = useState("apple");
  const [state, setState] = useState<"pick" | "paying" | "done">("pick");
  const m = METHODS.find((x) => x.id === method)!;

  const pay = () => {
    setState("paying");
    window.setTimeout(() => setState("done"), reduced() ? 0 : 1100);
  };

  return (
    <div className="demo bp" aria-label="Booking and payment demo">
      <div className="demo-bar"><b>Tidewater Physio</b><span>Initial consult, 60 min, $120</span></div>
      {state !== "done" ? (
        <div className="bp-body">
          <p className="bp-label">Pick a time with Ana</p>
          <div className="bp-chips" role="radiogroup" aria-label="Time">
            {SLOTS.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={slot === s} onClick={() => setSlot(s)}>{s}</button>
            ))}
          </div>
          <p className="bp-label">Pay a $30 deposit with</p>
          <div className="bp-chips bp-methods" role="radiogroup" aria-label="Payment method">
            {METHODS.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={method === x.id} onClick={() => setMethod(x.id)}>
                {x.logo ? <img src={logo(x.logo)} alt="" width={18} height={18} /> : <Icon name={x.id === "card" ? "card" : "briefcase"} />}
                {x.label}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary bp-pay" onClick={pay} disabled={state === "paying"}>
            {state === "paying" ? "Processing…" : `Pay $30 deposit`}
          </button>
        </div>
      ) : (
        <div className="bp-body bp-done" role="status">
          <span className="bp-tick"><Icon name="check" /></span>
          <b>Booked and paid</b>
          <p>{slot} with Ana. $30 deposit paid with {m.label}. Confirmation sent by text and email.</p>
          <p className="bp-stripe"><img src={logo("stripe")} alt="" width={16} height={16} /> Paid into Tidewater's own Stripe account</p>
          <button type="button" className="text-link" onClick={() => setState("pick")}>Try it again <Icon name="arrow-right" /></button>
        </div>
      )}
      <p className="demo-note">Demo with a sample business. No money moves.</p>
    </div>
  );
}

const STAGES = ["Enquiry", "Quote", "Booked", "Paid"];
const LOG: { text: string; logo: string }[] = [
  { text: "Enquiry from the website, added to your job list", logo: "gmail" },
  { text: "Quote sent from your template, opened twice", logo: "gmail" },
  { text: "Job booked into Google Calendar for Tue 14th", logo: "googlecalendar" },
  { text: "Invoice paid by card and synced to Xero", logo: "xero" },
];

// One job moving through the pipeline on its own, with what was automated.
export function PipelineDemo() {
  const [stage, setStage] = useState(STAGES.length - 1);
  const timer = useRef<number | undefined>(undefined);

  const run = () => {
    if (reduced()) return;
    let i = 0;
    setStage(0);
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      i += 1;
      setStage(i);
      if (i >= STAGES.length - 1) window.clearInterval(timer.current);
    }, 1700);
  };
  const ref = useInView(run);
  useEffect(() => () => window.clearInterval(timer.current), []);

  return (
    <div className="demo pl" ref={ref} aria-label="Pipeline demo">
      <div className="demo-bar"><b>Kerr &amp; Sons jobs</b><span>From first enquiry to paid invoice</span></div>
      <ol className="pl-cols">
        {STAGES.map((s, i) => (
          <li key={s} className={i === stage ? "is-here" : i < stage ? "is-past" : ""}>
            <span>{s}</span>
            {i === stage && (
              <div className="pl-card">
                <b>Priya N., Merewether</b>
                <small>EV charger and switchboard</small>
                <em className="num">$2,380</em>
              </div>
            )}
          </li>
        ))}
      </ol>
      <ul className="pl-log" aria-live="polite">
        {LOG.map((l, i) => (
          <li key={l.text} className={i <= stage ? "is-on" : ""}>
            <img src={logo(l.logo)} alt="" width={16} height={16} /> {l.text}
          </li>
        ))}
      </ul>
      <button type="button" className="text-link" onClick={run}>Run it again <Icon name="arrow-right" /></button>
      <p className="demo-note">Demo with a sample business. Nobody typed anything twice.</p>
    </div>
  );
}

const BRANDS: { name: string; file: string }[] = [
  { name: "Google", file: "google" },
  { name: "Google Maps", file: "googlemaps" },
  { name: "Google Calendar", file: "googlecalendar" },
  { name: "Gmail", file: "gmail" },
  { name: "WhatsApp", file: "whatsapp" },
  { name: "Stripe", file: "stripe" },
  { name: "Apple Pay", file: "applepay" },
  { name: "Google Pay", file: "googlepay" },
  { name: "Afterpay", file: "afterpay" },
  { name: "Xero", file: "xero" },
  { name: "MYOB", file: "myob" },
  { name: "Cloudflare", file: "cloudflare" },
  { name: "ElevenLabs", file: "elevenlabs" },
  { name: "Google Gemini", file: "googlegemini" },
  { name: "Perplexity", file: "perplexity" },
  { name: "Shopify", file: "shopify" },
];

// "Works with" logos, scrolling slowly. Logos only, names in alt text.
// Only tools we actually use or connect to; no website builders.
export function LogoWall() {
  const row = (hidden: boolean) => (
    <ul className="logos-row" aria-hidden={hidden || undefined}>
      {BRANDS.map((b) => (
        <li key={b.file}><img src={logo(b.file)} alt={hidden ? "" : b.name} title={b.name} width={28} height={28} loading="lazy" /></li>
      ))}
    </ul>
  );
  return (
    <section className="logos" aria-labelledby="logos-h">
      <div className="wrap">
        <h2 id="logos-h">Works with the tools you already use.</h2>
      </div>
      <div className="logos-track">{row(false)}{row(true)}</div>
    </section>
  );
}
