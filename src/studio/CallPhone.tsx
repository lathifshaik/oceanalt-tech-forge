import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "../components/Icon";
import CALL from "../data/sample-call-hotel.json";

// The voice-agent demo (founder, 20 Nov 2026: "a phone is ringing and the user
// picks up the call", "as a brand", "the phone should look more real").
// A real-looking phone rings with a guest calling Corella Hotels (a sample
// brand). Answer it (or decline: the agent picks up anyway) and the recorded
// call plays, the live transcript keeping time with the voices and the
// agent's actions appearing as it takes them. When it ends, the summary the
// team gets shows. Recording and timings: src/data/sample-call-hotel.json.

type Line = { who: string; text: string; act?: { icon: string; text: string } };
const LINES = CALL.lines as Line[];
const STARTS = CALL.audio.starts;
const C = CALL.caller;

type State = "ringing" | "declined" | "live" | "ended";

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

function StatusBar() {
  return (
    <div className="cp-status" aria-hidden="true">
      <span className="cp-clock">9:41</span>
      <span className="cp-sys">
        <svg viewBox="0 0 18 12" width="18" height="12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12" width="16" height="12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0Z" /><path d="M3.4 6.8a6.5 6.5 0 0 1 9.2 0l-1.5 1.5a4.4 4.4 0 0 0-6.2 0Z" /><path d="M1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.5 1.5a7.5 7.5 0 0 0-10.6 0Z" /></svg>
        <svg viewBox="0 0 27 12" width="27" height="12"><rect x=".5" y=".5" width="23" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width="17" height="8" rx="2" /><path d="M25 4v4a2 2 0 0 0 0-4Z" opacity=".45" /></svg>
      </span>
    </div>
  );
}

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
  const decline = () => {
    setState("declined");
    window.setTimeout(start, 1500);
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

  const done = LINES.slice(0, shown).filter((l) => l.act).map((l) => l.act!);
  const acts = done.length ? done : LINES.filter((l) => l.act).map((l) => l.act!);

  return (
    <figure className="cp" aria-label={`Sample call: answer the phone to hear an AI agent help a guest of ${CALL.business}`}>
      <div className={`cp-device is-${state}`}>
        <span className="cp-side is-action" aria-hidden="true" />
        <span className="cp-side is-vol-up" aria-hidden="true" />
        <span className="cp-side is-vol-down" aria-hidden="true" />
        <span className="cp-side is-power" aria-hidden="true" />
        <div className="cp-screen">
          <div className="cp-wall" aria-hidden="true" />
          <div className="cp-island" aria-hidden="true" />
          <StatusBar />

          {(state === "ringing" || state === "declined") && (
            <div className="cp-ring">
              <span className="cp-avatar" aria-hidden="true">{C.initials}</span>
              <p className="cp-name">{C.name}</p>
              <p className="cp-sub">{state === "declined" ? "Declined. The agent picks up anyway." : `mobile · calling ${CALL.business}`}</p>
              <div className="cp-extras" aria-hidden="true">
                <span><Icon name="clock" />Remind Me</span>
                <span><Icon name="chat" />Message</span>
              </div>
              <div className="cp-btns">
                <button type="button" className="cp-btn is-decline" onClick={decline} disabled={state === "declined"}>
                  <span className="cp-dot" aria-hidden="true"><Icon name="phone" /></span>
                  Decline
                </button>
                <button type="button" className="cp-btn is-answer" onClick={start} disabled={state === "declined"}>
                  <span className="cp-dot" aria-hidden="true"><Icon name="phone" /></span>
                  Accept
                </button>
              </div>
            </div>
          )}

          {state === "live" && (
            <div className="cp-live">
              <div className="cp-live-head">
                <p className="cp-live-name">{C.name}</p>
                <p className="cp-sub"><time className="num">{mmss(t)}</time> · answered by {CALL.agent}</p>
              </div>
              <ol className="cp-lines" ref={list} aria-live="polite">
                {LINES.slice(0, shown).map((l, i) => (
                  <li key={i} className={l.who === "c" ? "is-agent" : "is-caller"}>
                    <small>{l.who === "c" ? "Agent" : C.name.split(" ")[0]}</small>
                    <p>{l.text}</p>
                    {l.act && <span className="cp-act"><Icon name={l.act.icon as IconName} /> {l.act.text}</span>}
                  </li>
                ))}
              </ol>
              <div className="cp-controls" aria-hidden="true">
                <span><i><svg viewBox="0 0 24 24"><path d="M9 4a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0Z" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg></i>mute</span>
                <span><i><svg viewBox="0 0 24 24">{[5, 12, 19].flatMap((y) => [6, 12, 18].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" />))}</svg></i>keypad</span>
                <span><i><svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4Z" /><path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /></svg></i>speaker</span>
              </div>
              <button type="button" className="cp-hang" onClick={hangUp}>
                <span className="cp-dot" aria-hidden="true"><Icon name="phone" /></span>
                <span className="sr">End call</span>
              </button>
            </div>
          )}

          {state === "ended" && (
            <div className="cp-end">
              <div className="cp-note">
                <p className="cp-note-app"><span aria-hidden="true">{CALL.business.slice(0, 1)}</span>{CALL.agent} · now</p>
                <p className="cp-note-title">{CALL.summaryTitle}</p>
                <ul>
                  {acts.map((a) => (
                    <li key={a.text}><Icon name={a.icon as IconName} /> {a.text}</li>
                  ))}
                </ul>
                <p className="cp-note-to">{CALL.summaryTo}</p>
              </div>
              <button type="button" className="cp-again" onClick={again}>Ring again</button>
            </div>
          )}

          <span className="cp-home" aria-hidden="true" />
        </div>
      </div>
      <audio ref={audio} src={CALL.audio.src} preload="none" />
      <figcaption>
        {state === "ringing" ? "Pick up to listen in. " : ""}A sample call for a fictional hotel group, {Math.round(CALL.audio.duration)} seconds, with licensed voices. Every call opens by saying it's an AI agent and that it's recorded.
      </figcaption>
    </figure>
  );
}
