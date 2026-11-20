import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "../components/Icon";
import CALL from "../data/sample-call-restaurant.json";

// The voice-agent demo (founder, 20 Nov 2026: "a phone is ringing and the user
// picks up the call"). A phone rings; answer it (or decline: the agent picks up
// anyway) and the real sample call plays, the transcript writing itself in time
// with the voices and the agent's actions appearing as it takes them. When it
// ends, the owner's summary shows. The recording and timings come from
// src/data/sample-call-restaurant.json (scripts/make-sample-call.py).

type Line = { who: string; text: string; act?: { icon: string; text: string } };
const LINES = CALL.lines as Line[];
const STARTS = CALL.audio.starts;
const CALLER = { name: "Pauline", number: "0491 570 159", to: "Nonna Pina" };
const AGENT = "Maria's AI agent";

type State = "ringing" | "declined" | "live" | "ended";

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

export function CallPhone() {
  const audio = useRef<HTMLAudioElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [state, setState] = useState<State>("ringing");
  const [t, setT] = useState(0);
  const shown = STARTS.filter((s) => s <= t + 0.05).length;

  const start = () => {
    const a = audio.current;
    setT(0);
    setState("live");
    if (a) {
      a.currentTime = 0;
      a.play().catch(() => setState("ended"));
    }
  };
  const answer = () => start();
  const decline = () => {
    setState("declined");
    window.setTimeout(start, 1400);
  };
  const hangUp = () => {
    audio.current?.pause();
    setState("ended");
  };
  const again = () => {
    audio.current?.pause();
    setT(0);
    setState("ringing");
  };

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => setT(a.currentTime);
    const onEnd = () => setState("ended");
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("ended", onEnd); };
  }, []);

  // Keep the newest line in view inside the phone, without scrolling the page.
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown]);

  const acts = LINES.slice(0, shown).filter((l) => l.act).map((l) => l.act!);
  const allActs = LINES.filter((l) => l.act).map((l) => l.act!);

  return (
    <figure className="cp" aria-label="Sample call: answer the phone to hear an AI agent take a booking">
      <div className={`cp-phone is-${state}`}>
        <div className="cp-island" aria-hidden="true" />

        {(state === "ringing" || state === "declined") && (
          <div className="cp-ring">
            <p className="cp-small">{state === "declined" ? "Declined. The agent picks up anyway." : `Incoming call to ${CALLER.to}`}</p>
            <p className="cp-name">{CALLER.name}</p>
            <p className="cp-small">{CALLER.number}, mobile</p>
            <div className="cp-btns">
              <button type="button" className="cp-btn is-decline" onClick={decline} disabled={state === "declined"}>
                <span className="cp-dot" aria-hidden="true"><Icon name="phone" /></span>
                Decline
              </button>
              <button type="button" className="cp-btn is-answer" onClick={answer} disabled={state === "declined"}>
                <span className="cp-dot" aria-hidden="true"><Icon name="phone" /></span>
                Answer
              </button>
            </div>
          </div>
        )}

        {state === "live" && (
          <div className="cp-live">
            <div className="cp-live-head">
              <p><b>{AGENT}</b><span>On the call with {CALLER.name}</span></p>
              <time className="num">{mmss(t)}</time>
            </div>
            <ol className="cp-lines" ref={list} aria-live="polite">
              {LINES.slice(0, shown).map((l, i) => (
                <li key={i} className={l.who === "c" ? "is-agent" : "is-caller"}>
                  <small>{l.who === "c" ? "Agent" : CALLER.name}</small>
                  <p>{l.text}</p>
                  {l.act && <span className="cp-act"><Icon name={l.act.icon as IconName} /> {l.act.text}</span>}
                </li>
              ))}
            </ol>
            <button type="button" className="cp-hang" onClick={hangUp}>
              <span className="cp-dot" aria-hidden="true"><Icon name="phone" /></span>
              <span className="sr">Hang up</span>
            </button>
          </div>
        )}

        {state === "ended" && (
          <div className="cp-end">
            <p className="cp-small">Call ended. Sent to Maria on WhatsApp</p>
            <p className="cp-sum-title">Table booked for {CALLER.name}</p>
            <ul>
              {(acts.length ? acts : allActs).map((a) => (
                <li key={a.text}><Icon name={a.icon as IconName} /> {a.text}</li>
              ))}
            </ul>
            <button type="button" className="cp-again" onClick={again}>Ring again</button>
          </div>
        )}
      </div>
      <audio ref={audio} src={CALL.audio.src} preload="none" />
      <figcaption>
        {state === "ringing" ? "Pick up to listen in. " : ""}A sample call for a fictional restaurant, {Math.round(CALL.audio.duration)} seconds, with licensed voices. Every call opens by saying it's an AI agent and that it's recorded.
      </figcaption>
    </figure>
  );
}
