import { useEffect, useRef, useState, type FormEvent } from "react";
import { SCENARIOS, STEPS, type Scenario, type Step } from "../../shared/aiDemo";
import { Icon, type IconName } from "./Icon";

// The AI section: one after-hours story (photo + three moments), then a demo
// where visitors pick a job and see the agent's reply and what it did. Sample
// answers come from shared/aiDemo.ts; when api/demo.ts has a key, visitors
// can also type their own question and Claude answers live.

type Msg = { kind: "in" | "out" | "agent"; text: string; steps?: Step[] };
type Id = Scenario["id"];

const PHOTOS: Record<Id, { src: string; alt: string }> = {
  answer: { src: "/ai/bakery.webp", alt: "Pastry cabinet at Little Tern Coffee" },
  book: { src: "/ai/physio.webp", alt: "A Tidewater Physio client stretching by the water at sunset" },
  review: { src: "/ai/sparky.webp", alt: "A Kerr & Sons electrician working on a switchboard" },
  quote: { src: "/ai/tools.webp", alt: "Screwdrivers in a leather tool roll" },
};
const KIND: Record<Id, string> = { answer: "Website chat", book: "Booking chat", review: "Google review", quote: "Quote follow-up" };
const JOB: Record<Id, string> = { answer: "Answers questions", book: "Takes bookings", review: "Replies to reviews", quote: "Chases quotes" };

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Each job opens already answered once, so the card is never empty.
function opening(s: Scenario): Msg[] {
  const first = s.prompts[0];
  const asked: Msg = s.freeText ? { kind: "out", text: first.text } : { kind: "in", text: s.opener.text };
  return [asked, { kind: "agent", text: first.scripted.reply, steps: first.scripted.steps }];
}

function Thread({ msgs }: { msgs: Msg[] }) {
  return (
    <>
      {msgs.map((m, i) => (
        <div key={i} className={`ai-msg is-${m.kind}`}>
          {m.kind === "agent" && <span className="ai-who">Assistant</span>}
          <p>{m.text}</p>
          {m.steps && m.steps.length > 0 && (
            <ul className="ai-did">
              {m.steps.map((st, n) => (
                <li key={n} style={{ animationDelay: `${n * 120}ms` }}>
                  <Icon name="check" /><span>{STEPS[st.step].label}</span><em>{st.detail}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

function Demo({ onAsk }: { onAsk: () => void }) {
  const [id, setId] = useState<Id>("answer");
  const s = SCENARIOS.find((x) => x.id === id)!;
  const [msgs, setMsgs] = useState<Msg[]>(() => opening(s));
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(false);
  const [draft, setDraft] = useState("");
  const run = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/demo").then((r) => (r.ok ? r.json() : null)).then((d) => setLive(Boolean(d?.live))).catch(() => {});
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced() ? "auto" : "smooth" });
  }, [msgs, busy]);

  function pick(next: Id) {
    run.current++;
    setId(next);
    setBusy(false);
    setMsgs(opening(SCENARIOS.find((x) => x.id === next)!));
  }

  async function ask(text: string) {
    if (busy) return;
    const me = ++run.current;
    setBusy(true);
    setMsgs((m) => [...m, { kind: "out", text }]);
    let answer = s.prompts.find((p) => p.text === text)?.scripted ?? null;
    if (live) {
      try {
        const res = await fetch("/api/demo", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ scenario: s.id, message: text }) });
        const data = res.ok ? await res.json() : null;
        if (data?.live && data.reply) answer = { reply: data.reply, steps: data.steps ?? [] };
      } catch { /* fall back to the sample answer */ }
    } else {
      await wait(reduced() ? 0 : 900);
    }
    if (run.current !== me) return;
    setMsgs((m) => [...m, answer
      ? { kind: "agent", text: answer.reply, steps: answer.steps }
      : { kind: "agent", text: "Sorry, I couldn't answer that just now. Try one of the suggestions." }]);
    setBusy(false);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    setDraft("");
    ask(t);
  }

  const asked = new Set(msgs.filter((m) => m.kind === "out").map((m) => m.text));
  const chips = s.freeText ? s.prompts.filter((p) => !asked.has(p.text)) : [];

  return (
    <div className="ai-demo">
      <div className="ai-copy">
        <h3>Try it on a business like yours.</h3>
        <div className="ai-jobs" role="group" aria-label="What the assistant does">
          {SCENARIOS.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === id} onClick={() => pick(x.id)}>
              <Icon name={x.icon as IconName} />
              <b>{JOB[x.id]}</b>
              <small>{x.pitch}</small>
            </button>
          ))}
        </div>
        <div className="ai-cta">
          <button className="btn btn-primary ai-ask" type="button" onClick={onAsk}>
            Ask about AI <span className="ai-ask-i"><Icon name="arrow-up-right" /></span>
          </button>
          <p><b>$39 a month</b>, plus AI usage at cost. You set the cap.</p>
        </div>
      </div>

      <div className="ai-visual">
        <div className="ai-photo">
          {SCENARIOS.map((x) => (
            <img key={x.id} src={PHOTOS[x.id].src} alt={x.id === id ? PHOTOS[x.id].alt : ""} width={1000} height={667} loading="lazy" className={x.id === id ? "is-on" : ""} />
          ))}
        </div>
        <div className="ai-card" aria-live="polite">
          <div className="ai-card-top">
            <span className="ai-av">{s.business.initials}</span>
            <span><b>{s.business.name}</b><small>{KIND[id]}</small></span>
            <span className="ai-tag">{live ? "Live" : "Sample"}</span>
          </div>
          <div className="ai-thread" ref={scroller}>
            <Thread msgs={msgs} />
            {busy && <div className="ai-typing" aria-label="Assistant is typing"><i /><i /><i /></div>}
          </div>
          {(chips.length > 0 || (live && s.freeText)) && (
            <div className="ai-input">
              {chips.map((p) => (
                <button key={p.text} type="button" disabled={busy} onClick={() => ask(p.text)}>{p.text}</button>
              ))}
              {live && s.freeText && (
                <form onSubmit={submit}>
                  <label className="sr-only" htmlFor="ai-q">Ask your own question</label>
                  <input id="ai-q" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={200} placeholder="Or ask your own question" disabled={busy} />
                  <button type="submit" disabled={busy || !draft.trim()} aria-label="Send"><Icon name="send" /></button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// The phone story: a tradie up a ladder, a customer calls, the AI concierge
// answers and books the job, and the owner gets the summary on WhatsApp and
// email. Rendered complete (server and no-JS); in the browser it resets and
// plays once when scrolled into view. Reduced motion shows the final state.
type Line = { who: "agent" | "caller"; text: string };
const CALL: Line[] = [
  { who: "agent", text: "Kerr & Sons Electrical, you're speaking with Jim's AI concierge. How can I help?" },
  { who: "caller", text: "Hi, a power point in my kitchen is sparking. Can someone come out today?" },
  { who: "agent", text: "Sorry to hear that. Switch it off at the switchboard and don't use it for now. We can have an electrician there between 2 and 4 this arvo. Does that suit?" },
  { who: "caller", text: "Yes please. 14 Ridge Street, Merewether." },
  { who: "agent", text: "You're booked in. I'll text you to confirm 2 to 4 today. Thanks, Mel." },
];
// Step numbers: 0 ringing, 1 answered, 2..6 transcript lines, 7 call ended, 8 WhatsApp, 9 email.
const FINAL = 9;
const AT = [0, 2600, 3400, 6000, 8800, 11800, 14000, 16400, 17400, 18800];

function CallStory() {
  const [step, setStep] = useState(FINAL);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const play = () => {
    timers.current.forEach(clearTimeout);
    if (reduced()) { setStep(FINAL); return; }
    setPlaying(true);
    setStep(-1);
    timers.current = AT.map((t, i) => window.setTimeout(() => {
      setStep(i);
      if (i === FINAL) setPlaying(false);
    }, t + 300));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    setStep(-1);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { play(); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); timers.current.forEach(clearTimeout); };
  }, []);

  const shown = (n: number) => step >= n;
  const ringing = step === 0;
  const live = step >= 1 && step < 7;

  return (
    <div className="call" ref={ref}>
      <div className="call-phone" aria-label="Sample phone call">
        <div className="call-top">
          <span className={`call-av${ringing ? " is-ringing" : ""}`} aria-hidden="true">M</span>
          <div>
            <b>{step < 1 && step >= 0 ? "Incoming call" : step >= 7 ? "Call ended, 1:12" : step < 0 ? "Kerr & Sons line" : "Answered by your concierge"}</b>
            <small>Mel, 0412 ••• 318</small>
          </div>
          {live && <span className="call-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>}
        </div>
        <ol className="call-lines" aria-live="polite">
          {CALL.map((l, i) => (
            <li key={i} className={`is-${l.who}${shown(i + 2) ? " is-on" : ""}`}>
              <span className="call-face" aria-hidden="true">{l.who === "agent" ? <i className="call-orb" /> : "M"}</span>
              <div>
                <span>{l.who === "agent" ? "Your concierge" : "Mel"}</span>
                <p>{l.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="call-out">
        <div className="call-owner">
          <img src="/ai/sparky.webp" alt="" width={1000} height={667} />
          <div>
            <b>Jim Kerr, up a ladder in Charlestown</b>
            <small>11:42am. Phone's in the ute.</small>
          </div>
          <span className={`call-state${shown(8) ? " is-done" : step >= 1 ? " is-live" : ""}`}>
            {shown(8) ? "Job booked" : step >= 1 ? "Concierge has it" : step === 0 ? "Phone ringing" : "On the tools"}
          </span>
        </div>
        <div className={`call-msg${shown(8) ? " is-on" : ""}`}>
          <span className="call-chan">WhatsApp</span>
          <b>New job booked by your concierge</b>
          <ul>
            <li>Mel, 0412 ••• 318</li>
            <li>Sparking power point in the kitchen. Told to switch it off at the board.</li>
            <li>Today, 2 to 4pm. 14 Ridge St, Merewether</li>
          </ul>
          <div className="call-acts"><span>Call Mel back</span><span>Read transcript</span></div>
        </div>
        <div className={`call-msg call-mail${shown(9) ? " is-on" : ""}`}>
          <span className="call-chan">Email</span>
          <b>Call summary: Mel, Merewether, booked today 2 to 4pm</b>
        </div>
        <p className={`call-value${shown(9) ? " is-on" : ""}`}>Job booked while Jim kept working. Without it, Mel would have rung the next sparky on Google.</p>
        <button type="button" className="text-link call-replay" onClick={play} disabled={playing}>
          {playing ? "Playing…" : "Play the call again"} <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}

export function AiDemo({ onAsk, onCall }: { onAsk: () => void; onCall: () => void }) {
  return (
    <section className="ai" id="ai" aria-labelledby="ai-h">
      <div className="wrap">
        <div className="ai-hero">
          <img src="/ai/sparky.webp" alt="An electrician working on a switchboard" width={1000} height={667} loading="lazy" />
          <h2 id="ai-h">You're up a ladder. Your phone still gets answered.</h2>
        </div>

        <CallStory />

        <ul className="call-facts">
          <li><b>Keep your number</b><span>Calls you can't pick up, or after hours, divert to your concierge. Or we give you a new local number.</span></li>
          <li><b>Sounds like a person</b><span>A natural Australian voice that knows your services, prices, hours and areas. It books, quotes ranges and takes messages.</span></li>
          <li><b>You get it straight away</b><span>A summary on WhatsApp, text or email after every call, with the recording and transcript if you want them.</span></li>
        </ul>
        <div className="call-price">
          <p><b>AI concierge</b> $149 a month with a local number, plus call time at cost. You set a monthly cap.</p>
          <button className="btn btn-primary ai-ask" type="button" onClick={onCall}>Set up my concierge <span className="ai-ask-i"><Icon name="arrow-up-right" /></span></button>
        </div>

        <Demo onAsk={onAsk} />
        <p className="ai-note">Kerr &amp; Sons and the other businesses here are samples we made up. Yours answers from your own prices, hours and policies.</p>
      </div>
    </section>
  );
}
