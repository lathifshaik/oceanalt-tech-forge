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

// The 9pm to-do list for one sample job (Priya's EV charger), then each chore
// flipping to "done on its own" with the app that does it, until nothing is
// left to type and the clock says tools down.
const CHORES: { old: string; auto: string; logo: string; app: string }[] = [
  { old: "Copy Priya's details from her email into the job list", auto: "Your website form adds the job, with her address and photos", logo: "gmail", app: "Website form" },
  { old: "Write up her quote and email it", auto: "Quote built from your template and sent from your email", logo: "gmail", app: "Gmail" },
  { old: "Ring her to check she got it", auto: "You're told the moment she opens it", logo: "gmail", app: "Gmail" },
  { old: "Put the job in the calendar", auto: "She picks a time and it lands in your calendar", logo: "googlecalendar", app: "Google Calendar" },
  { old: "Type the invoice, then enter the payment in Xero", auto: "Invoice sends itself when the job's done, she pays by card, Xero updates", logo: "xero", app: "Stripe and Xero" },
];

export function PipelineDemo() {
  const [done, setDone] = useState(CHORES.length);
  const timer = useRef<number | undefined>(undefined);

  const run = () => {
    if (reduced()) return;
    let i = 0;
    setDone(0);
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      i += 1;
      setDone(i);
      if (i >= CHORES.length) window.clearInterval(timer.current);
    }, 1500);
  };
  const ref = useInView(() => window.setTimeout(run, 900));
  useEffect(() => () => window.clearInterval(timer.current), []);
  const left = CHORES.length - done;
  const finished = left === 0;

  return (
    <div className={`demo pl${finished ? " is-done" : ""}`} ref={ref} aria-label="Less admin demo">
      <div className="pl-head">
        <div>
          <span className="pl-clock num">{finished ? "5:30pm" : "9:04pm"}</span>
          <small>{finished ? "Tools down. Nothing left to type." : "Still at the kitchen table"}</small>
        </div>
        <span className="pl-count"><b className="num">{left}</b> {left === 1 ? "thing" : "things"} to type</span>
      </div>
      <ul className="pl-list">
        {CHORES.map((c, i) => (
          <li key={c.old} className={i < done ? "is-auto" : ""}>
            <span className="pl-mark">{i < done ? <Icon name="check" /> : <i />}</span>
            <span className="pl-text">
              <s>{c.old}</s>
              <span className="pl-auto">{c.auto}</span>
            </span>
            <img className="pl-logo" src={logo(c.logo)} alt={c.app} width={18} height={18} />
          </li>
        ))}
      </ul>
      <p className="pl-job">For one job: Priya N., Merewether, EV charger and switchboard, $2,380.</p>
      <button type="button" className="text-link" onClick={run}>Run it again <Icon name="arrow-right" /></button>
      <p className="demo-note">Demo with a sample business.</p>
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
        <h2 id="logos-h">We work with</h2>
      </div>
      <div className="logos-track">{row(false)}{row(true)}</div>
    </section>
  );
}
