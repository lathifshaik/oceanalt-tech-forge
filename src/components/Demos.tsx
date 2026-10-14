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

// One sample job, from the website form to the money in Xero, shown like a
// delivery tracker: each stop lights up with the app that did the work.
const STOPS: { stage: string; when: string; logo: string; app: string; title: string; detail: string }[] = [
  { stage: "Enquiry", when: "Mon 8:12am", logo: "gmail", app: "Website form", title: "New job: EV charger and switchboard", detail: "Priya filled in your website form. The job is on your list with her address and photos, before you've had a coffee." },
  { stage: "Quote", when: "Mon 8:40am", logo: "gmail", app: "Gmail", title: "Quote sent: $2,380", detail: "Built from your quote template and sent from your own email. You get a nudge when she opens it, and she opened it twice." },
  { stage: "Booked", when: "Tue 14th, 9am", logo: "googlecalendar", app: "Google Calendar", title: "Booked in for Tuesday 9am", detail: "She accepted the quote and picked a time. It's in your calendar, and she gets a reminder the day before." },
  { stage: "Paid", when: "Tue 3:05pm", logo: "stripe", app: "Stripe", title: "Paid $2,380 by card", detail: "The invoice went out when you marked the job done. She paid on her phone, and it's already reconciled in Xero." },
];

// One job moving through the pipeline on its own, with what was automated.
export function PipelineDemo() {
  const [stop, setStop] = useState(STOPS.length - 1);
  const timer = useRef<number | undefined>(undefined);

  const run = () => {
    if (reduced()) return;
    let i = 0;
    setStop(0);
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      i += 1;
      setStop(i);
      if (i >= STOPS.length - 1) window.clearInterval(timer.current);
    }, 2200);
  };
  const ref = useInView(run);
  useEffect(() => () => window.clearInterval(timer.current), []);
  const now = STOPS[stop];
  const done = stop === STOPS.length - 1;

  return (
    <div className="demo pl" ref={ref} aria-label="Pipeline demo">
      <div className="pl-head">
        <img className="pl-face" src="/avatars/people/priya.webp" alt="" width={44} height={44} />
        <div><b>Priya N., Merewether</b><small>EV charger and switchboard, Kerr &amp; Sons</small></div>
        <span className={`pl-status${done ? " is-done" : ""}`}>{done ? "Paid" : now.stage}</span>
      </div>
      <ol className="pl-track" style={{ "--p": stop / (STOPS.length - 1) } as React.CSSProperties}>
        {STOPS.map((s, i) => (
          <li key={s.stage} className={i < stop ? "is-past" : i === stop ? "is-here" : ""}>
            <span className="pl-dot"><img src={logo(s.logo)} alt="" width={20} height={20} /></span>
            <b>{s.stage}</b>
            <small className="num">{i <= stop ? s.when : ""}</small>
          </li>
        ))}
      </ol>
      <div className="pl-event" key={stop} aria-live="polite">
        <span className="pl-app"><img src={logo(now.logo)} alt="" width={16} height={16} /> {now.app}<time className="num">{now.when}</time></span>
        <b>{now.title}</b>
        <p>{now.detail}</p>
        {done && <span className="pl-xero"><img src={logo("xero")} alt="" width={16} height={16} /> Synced to Xero. Nothing typed twice.</span>}
      </div>
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
