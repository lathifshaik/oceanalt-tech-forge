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
          {m.kind === "agent" && <span className="ai-who"><Icon name="sparkle" /> Assistant</span>}
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

export function AiDemo({ onAsk }: { onAsk: () => void }) {
  const cafe = SCENARIOS[0].prompts[2].scripted;
  return (
    <section className="ai" id="ai" aria-labelledby="ai-h">
      <div className="wrap">
        <div className="ai-hero">
          <img src="/ai/cafe.webp" alt="A café after closing, its sign still lit" width={1400} height={925} loading="lazy" />
          <h2 id="ai-h">You've closed for the night. Your assistant hasn't.</h2>
        </div>

        <ol className="ai-night" aria-label="One enquiry, overnight">
          <li>
            <time>9:47pm</time>
            <h3>A customer asks</h3>
            <div className="ai-msg is-out"><p>{SCENARIOS[0].prompts[2].text}</p></div>
          </li>
          <li className="is-now">
            <time>9:47pm</time>
            <h3>Your assistant answers</h3>
            <Thread msgs={[{ kind: "agent", text: cafe.reply, steps: cafe.steps.filter((x) => x.step === "check_hours" || x.step === "notify_owner") }]} />
          </li>
          <li>
            <time>7:02am</time>
            <h3>You catch up over coffee</h3>
            <p>One summary of the night. Anything that needs you waits for a tap.</p>
          </li>
        </ol>

        <Demo onAsk={onAsk} />
        <p className="ai-note">The businesses here are samples we made up. Yours answers from your own prices, hours and policies.</p>
      </div>
    </section>
  );
}
