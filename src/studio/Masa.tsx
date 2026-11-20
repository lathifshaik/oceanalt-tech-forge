import { useEffect, useRef, useState } from "react";
import "@fontsource-variable/instrument-sans/wght.css";
import { StatusBar } from "./CallPhone";
import "./masa.css";

// MASA: our own product, free to try (founder, 20 Nov 2026: made by Oceanalt,
// free for everyone; "use the masa logo and keep it simple or say try our
// product"; "masa theme"; "show it in Slack /masa my chair is broken ... or
// on Teams @masa book a meeting room ... Room Lorikeet is booked"; "more
// interactive, make the app look more real, show it in a realistic phone").
// The section is in MASA's own theme (its logo, ink #15171a, marigold
// #ffc42e, Instrument Sans). The phone is the same realistic iPhone as the
// voice-agent demo (CallPhone), showing MASA where people use it: its own app,
// a Slack channel and a Teams chat. Visitors tap one of three things to try;
// it's typed and sent in that app and MASA answers. Until someone taps, the
// three play in turn while the section is on screen. Every claim is on MASA's
// welcome page (web, Slack, Teams; requests, rooms). Slack and Teams are named
// in text only and tinted like each app; their logos aren't ours to use.

export const MASA_URL = "https://masa.8fy6kwkzn2.workers.dev";

const Mark = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 28 28" width={size} height={size} aria-hidden="true">
    <rect width="28" height="28" rx="7" fill="#ffc42e" />
    <path d="M11 20L17 8" fill="none" stroke="#15171a" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

export function MasaLogo() {
  return <span className="mx-logo"><Mark size={30} /><span>masa</span></span>;
}

type Scene = { id: "web" | "slack" | "teams"; chip: string; ask: string; who: string; reply: string; card: { title: string; sub: string } };
const SCENES: Scene[] = [
  { id: "web", chip: "the kitchen tap is dripping", ask: "the kitchen tap is dripping", who: "You", reply: "Done. I've opened a request and told Maintenance.", card: { title: "Dripping tap", sub: "Kitchen · With Maintenance" } },
  { id: "slack", chip: "/masa my chair is broken", ask: "/masa my chair is broken", who: "Priya", reply: "I'll take care of that. Facilities have it, and I'll tell you when it's fixed.", card: { title: "Broken chair", sub: "With Facilities" } },
  { id: "teams", chip: "@masa book a room, 1:30 to 2, for 6", ask: "@masa book a meeting room available from 1:30 to 2 for 6 people", who: "Tom", reply: "Room Lorikeet is booked.", card: { title: "Lorikeet", sub: "Today · 1:30 to 2:00 pm · 6 people" } },
];
const WHERE = { web: "MASA", slack: "Slack", teams: "Teams" } as const;

export function Masa() {
  const ref = useRef<HTMLElement>(null);
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(3); // 0 empty, 1 typing, 2 MASA thinking, 3 answered
  const [typed, setTyped] = useState(SCENES[0].ask.length);
  const [live, setLive] = useState(false); // on screen, with motion allowed
  const [auto, setAuto] = useState(true); // until someone taps
  const timers = useRef<number[]>([]);

  const stop = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const play = (i: number, next: boolean) => {
    stop();
    const ask = SCENES[i].ask;
    const per = Math.min(55, 1400 / ask.length);
    const t = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    setScene(i); setStep(0); setTyped(0);
    t(350, () => setStep(1));
    for (let c = 1; c <= ask.length; c++) t(350 + c * per, () => setTyped(c));
    const sent = 350 + ask.length * per + 300;
    t(sent, () => setStep(2));
    t(sent + 1100, () => setStep(3));
    if (next) t(sent + 1100 + 3800, () => play((i + 1) % SCENES.length, true));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  useEffect(() => {
    if (!live) { stop(); return; }
    if (auto) play(scene, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);

  const tryIt = (i: number) => {
    setAuto(false);
    if (live) play(i, false);
    else { stop(); setScene(i); setStep(3); setTyped(SCENES[i].ask.length); }
  };

  const sc = SCENES[scene];
  const asked = sc.ask.slice(0, typed);
  const sending = step === 1;

  return (
    <section id="masa" className="mx" ref={ref} aria-labelledby="mx-h">
      <div className="s-wrap mx-in">
        <div className="mx-copy">
          <MasaLogo />
          <p className="mx-try">Try our product · free</p>
          <h2 id="mx-h">Text it.<br />It's done.</h2>
          <p className="mx-lede">MASA runs the everyday operations of your workplace. Say what you need, on the web or from Slack or Teams, and it reaches the right person and tells you when it's finished. We built it, and it's free.</p>
          <div className="mx-ctas">
            <a className="mx-btn" href={`${MASA_URL}/sign-up`} target="_blank" rel="noopener">Try MASA free</a>
            <a className="mx-link" href={`${MASA_URL}/welcome`} target="_blank" rel="noopener">See what it runs</a>
          </div>
          <p className="mx-for">For offices, clinics, schools, gyms, depots, shops and co-working spaces.</p>
        </div>

        <div className="mx-panel">
          <figure className="cp mx-fig" aria-label={`MASA ${sc.id === "web" ? "on the web" : `in ${WHERE[sc.id]}`}: ${sc.ask}. MASA replies: ${sc.reply}`}>
            <div className="cp-device">
              <span className="cp-side is-action" aria-hidden="true" />
              <span className="cp-side is-vol-up" aria-hidden="true" />
              <span className="cp-side is-vol-down" aria-hidden="true" />
              <span className="cp-side is-power" aria-hidden="true" />
              <div className={`cp-screen mx-screen is-${sc.id}`} aria-hidden="true">
                <div className="cp-island" />
                <StatusBar />

                {/* app header */}
                {sc.id === "web" && (
                  <div className="mx-h mx-h-web"><Mark size={26} /><b>MASA</b><span>{step === 2 ? "Working on it" : "Ready"}</span></div>
                )}
                {sc.id === "slack" && (
                  <div className="mx-h mx-h-slack"><span className="mx-back">‹</span><div><b># office</b><small>Slack</small></div></div>
                )}
                {sc.id === "teams" && (
                  <div className="mx-h mx-h-teams"><span className="mx-back">‹</span><span className="mx-grp">OC</span><div><b>Office chat</b><small>Teams</small></div></div>
                )}

                {/* conversation */}
                <div className="mx-thread" key={sc.id}>
                  {step >= 2 && (
                    sc.id === "web" ? <p className="mx-b mx-b-me">{sc.ask}</p>
                    : sc.id === "slack" ? (
                      <div className="mx-row"><span className="mx-av">P</span><div><p className="mx-name">{sc.who} <time>1:12 PM</time></p><p className="mx-txt"><code>/masa</code>{sc.ask.replace("/masa", "")}</p></div></div>
                    ) : <p className="mx-b mx-b-me mx-teams-me"><span className="mx-at">@MASA</span>{sc.ask.replace("@masa", "")}</p>
                  )}
                  {step === 2 && <p className="mx-dots"><i /><i /><i /></p>}
                  {step >= 3 && (
                    sc.id === "slack" ? (
                      <div className="mx-row mx-in-anim"><span className="mx-av mx-av-masa"><Mark size={30} /></span><div><p className="mx-name">MASA <em>APP</em> <time>1:12 PM</time></p><p className="mx-txt">{sc.reply}</p><div className="mx-att"><b>{sc.card.title}</b><span>{sc.card.sub}</span></div></div></div>
                    ) : (
                      <div className={`mx-reply mx-in-anim${sc.id === "teams" ? " is-teams" : ""}`}>
                        {sc.id === "teams" && <span className="mx-av mx-av-masa"><Mark size={26} /></span>}
                        <div className="mx-reply-body">
                          {sc.id === "teams" && <p className="mx-name">MASA <time>1:30 PM</time></p>}
                          <p className="mx-b mx-b-them">{sc.reply}</p>
                          <div className="mx-card"><b>{sc.card.title}</b><span>{sc.card.sub}</span></div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* composer: what's being typed shows here, then sends */}
                <div className={`mx-compose is-${sc.id}`}>
                  <span className={asked && step === 1 ? "is-typing" : ""}>
                    {step === 1 ? (asked.length > 30 ? `…${asked.slice(-29)}` : asked) : sc.id === "web" ? "Say what you need" : sc.id === "slack" ? "Message # office" : "Type a message"}
                    {step === 1 && <i className="mx-caret" />}
                  </span>
                  <b className={sending && typed === sc.ask.length ? "is-ready" : ""} />
                </div>
                <span className="cp-home" />
              </div>
            </div>
          </figure>

          <div className="mx-try-it">
            <p>Tap one to try it</p>
            <div className="mx-chips">
              {SCENES.map((x, i) => (
                <button key={x.id} type="button" aria-pressed={!auto && i === scene} onClick={() => tryIt(i)}>
                  <small>{x.id === "web" ? "MASA" : WHERE[x.id]}</small>{x.chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
