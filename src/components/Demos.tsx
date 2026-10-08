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
        <h2 id="logos-h">We work with</h2>
      </div>
      <div className="logos-track">{row(false)}{row(true)}</div>
    </section>
  );
}
