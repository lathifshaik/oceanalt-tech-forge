import { useEffect, useRef, useState } from "react";
import "@fontsource-variable/instrument-sans/wght.css";
import "./masa.css";

// MASA: our own product, free to try (founder, 20 Nov 2026: "add masa ...
// giving it for free", made by Oceanalt; then "use the masa logo and keep it
// simple or say try our product", "masa theme"). In MASA's own look: its
// logo (marigold tile, ink slash), ink #15171a, marigold #ffc42e, Instrument
// Sans. Every claim here is on MASA's welcome page; keep it that way. The
// demo is the welcome page's own example, played once when in view; the
// finished state shows for reduced motion or without JavaScript.

export const MASA_URL = "https://masa.8fy6kwkzn2.workers.dev";

export function MasaLogo({ size = 30 }: { size?: number }) {
  return (
    <span className="mx-logo">
      <svg viewBox="0 0 28 28" width={size} height={size} aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#ffc42e" />
        <path d="M11 20L17 8" fill="none" stroke="#15171a" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <span>masa</span>
    </span>
  );
}

const ASK = "the kitchen tap is dripping";

export function Masa() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(3); // 0 nothing, 1 typing, 2 thinking, 3 done
  const [typed, setTyped] = useState(ASK.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStep(0); setTyped(0);
    const timers: number[] = [];
    const play = () => {
      timers.push(window.setTimeout(() => setStep(1), 400));
      for (let c = 1; c <= ASK.length; c++) timers.push(window.setTimeout(() => setTyped(c), 400 + c * 55));
      const sent = 400 + ASK.length * 55 + 350;
      timers.push(window.setTimeout(() => setStep(2), sent));
      timers.push(window.setTimeout(() => setStep(3), sent + 1300));
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { play(); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section id="masa" className="mx" ref={ref} aria-labelledby="mx-h">
      <div className="s-wrap mx-in">
        <div className="mx-copy">
          <MasaLogo />
          <p className="mx-try">Try our product · free</p>
          <h2 id="mx-h">Text it.<br />It's done.</h2>
          <p className="mx-lede">MASA runs the everyday operations of your workplace. Say what you need, and it reaches the right person and tells you when it's finished. We built it, and it's free.</p>
          <div className="mx-ctas">
            <a className="mx-btn" href={`${MASA_URL}/sign-up`} target="_blank" rel="noopener">Try MASA free</a>
            <a className="mx-link" href={`${MASA_URL}/welcome`} target="_blank" rel="noopener">See what it runs</a>
          </div>
          <p className="mx-for">For offices, clinics, schools, gyms, depots, shops and co-working spaces.</p>
        </div>

        <div className="mx-panel">
          <figure className="mx-phone" aria-label="An example: texting MASA that the kitchen tap is dripping">
            <div className="mx-bar">
              <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#ffc42e" /><path d="M11 20L17 8" fill="none" stroke="#15171a" strokeWidth="3.2" strokeLinecap="round" /></svg>
              <b>MASA</b>
              <span>{step === 2 ? "Working on it" : "Ready"}</span>
            </div>
            <div className="mx-chat">
              {step >= 1 && <p className="mx-me">{ASK.slice(0, typed)}</p>}
              {step === 2 && <p className="mx-dots" aria-hidden="true"><i /><i /><i /></p>}
              {step >= 3 && (
                <div className="mx-reply">
                  <p>Done. I've opened a request and told Maintenance.</p>
                  <div className="mx-card">
                    <b>Dripping tap</b>
                    <span>Kitchen · With Maintenance</span>
                  </div>
                  <p className="mx-note">You'll hear from MASA when it's fixed.</p>
                </div>
              )}
            </div>
            <p className="mx-input"><span>Say what you need</span><i aria-hidden="true" /></p>
          </figure>
        </div>
      </div>
    </section>
  );
}
