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

// An invoice that writes itself: each field fills in from where the details
// already live (the website form, the calendar, the accepted quote), then the
// customer pays, a PAID stamp lands, and it files itself in Xero.
const FIELDS: { label: string; value: string; from: string; logo: string }[] = [
  { label: "Bill to", value: "Priya N., Merewether NSW", from: "website form", logo: "gmail" },
  { label: "Job", value: "EV charger and switchboard upgrade", from: "accepted quote", logo: "gmail" },
  { label: "Done", value: "Tuesday 14 October", from: "Google Calendar", logo: "googlecalendar" },
];
const ITEMS: { item: string; price: string }[] = [
  { item: "EV charger, supply and install", price: "$1,640" },
  { item: "Switchboard upgrade", price: "$740" },
];
// 0 blank, 1-3 fields, 4-5 line items, 6 total, 7 paid, 8 filed in Xero
const LAST = 8;

export function PipelineDemo() {
  const [step, setStep] = useState(LAST);
  const timer = useRef<number | undefined>(undefined);

  const run = () => {
    if (reduced()) return;
    let i = 0;
    setStep(0);
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= LAST) window.clearInterval(timer.current);
    }, 950);
  };
  const ref = useInView(() => window.setTimeout(run, 600));
  useEffect(() => () => window.clearInterval(timer.current), []);
  const at = (n: number) => (step >= n ? " is-on" : "");

  return (
    <div className="demo inv" ref={ref} aria-label="An invoice that writes itself">
      <div className="inv-paper">
        <div className="inv-top">
          <div><b>Kerr &amp; Sons Electrical</b><small>Newcastle NSW</small></div>
          <div className="inv-no"><b>Invoice</b><small className="num">#1042</small></div>
        </div>
        <dl className="inv-fields">
          {FIELDS.map((f, i) => (
            <div key={f.label} className={`inv-row${at(i + 1)}`}>
              <dt>{f.label}</dt>
              <dd><span className="inv-type">{f.value}</span></dd>
              <span className="inv-from"><img src={logo(f.logo)} alt="" width={12} height={12} /> from {f.from}</span>
            </div>
          ))}
        </dl>
        <ul className="inv-items">
          {ITEMS.map((it, i) => (
            <li key={it.item} className={`inv-item${at(4 + i)}`}><span className="inv-type">{it.item}</span><b className="num inv-type">{it.price}</b></li>
          ))}
          <li className={`inv-total${at(6)}`}><span>Total</span><b className="num inv-type">$2,380</b></li>
        </ul>
        <span className={`inv-stamp${at(7)}`} aria-hidden="true">Paid</span>
      </div>
      <div className="inv-steps">
        <span className={`inv-chip${at(7)}`}><img src={logo("stripe")} alt="" width={16} height={16} /> Priya paid by card, Tue 3:05pm</span>
        <span className={`inv-chip${at(8)}`}><img src={logo("xero")} alt="" width={16} height={16} /> Filed in Xero</span>
      </div>
      <p className={`inv-line${at(8)}`}>Nobody typed this invoice.</p>
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
