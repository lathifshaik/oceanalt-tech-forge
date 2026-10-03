import { useEffect, useRef, useState, type FormEvent } from "react";
import { SCENARIOS, STEPS, type Scenario, type Step } from "../../shared/aiDemo";
import { Icon, type IconName } from "./Icon";

// The AI agent demo: pick a job, watch the agent do it in a phone, with each
// step it takes listed beside it. Live answers come from api/demo.ts when it's
// configured; otherwise the scripted samples play and the phone says so.

type Msg = { from: "customer" | "owner" | "system" | "agent"; text: string };
type Mode = "unknown" | "live" | "sample";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AiDemo({ onAsk }: { onAsk: () => void }) {
  const [id, setId] = useState<Scenario["id"]>("answer");
  const s = SCENARIOS.find((x) => x.id === id)!;
  const [msgs, setMsgs] = useState<Msg[]>([s.opener]);
  const [steps, setSteps] = useState<(Step & { done: boolean })[]>([]);
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<Mode>("unknown");
  const [used, setUsed] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const run = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    run.current++;
    setMsgs([s.opener]);
    setSteps([]);
    setUsed([]);
    setBusy(false);
    setTyping(false);
  }, [id]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced() ? "auto" : "smooth" });
  }, [msgs, typing]);

  async function ask(text: string) {
    if (busy) return;
    const me = ++run.current;
    const still = () => run.current === me;
    setBusy(true);
    setUsed((u) => [...u, text]);
    setSteps([]);
    const from: Msg["from"] = s.opener.from === "system" && s.freeText ? "customer" : "owner";
    setMsgs((m) => [...m, { from, text }]);
    setTyping(true);

    const scripted = s.prompts.find((p) => p.text === text)?.scripted;
    let answer = scripted ?? { reply: "", steps: [] as Step[] };
    let live = false;
    if (mode !== "sample") {
      try {
        const res = await fetch("/api/demo", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ scenario: s.id, message: text }),
        });
        const data = res.ok ? await res.json() : null;
        if (data?.live && data.reply) { answer = { reply: data.reply, steps: data.steps ?? [] }; live = true; }
      } catch { /* scripted below */ }
      if (still()) setMode(live ? "live" : "sample");
    }
    if (!still()) return;
    if (!live && !scripted) {
      answer = { reply: "In this sample I can only answer the suggested questions. Ask us to set one up for your business and it'll answer anything from your real info.", steps: [] };
    }

    // Play the steps one by one, then the reply.
    const fast = reduced();
    for (const st of answer.steps) {
      if (!still()) return;
      setSteps((p) => [...p, { ...st, done: false }]);
      await wait(fast ? 0 : 520);
      setSteps((p) => p.map((x, i) => (i === p.length - 1 ? { ...x, done: true } : x)));
    }
    if (!still()) return;
    await wait(fast ? 0 : 250);
    setTyping(false);
    setMsgs((m) => [...m, { from: "agent", text: answer.reply }]);
    setBusy(false);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    setDraft("");
    ask(t);
  }

  const left = s.prompts.filter((p) => !used.includes(p.text));
  const canType = mode === "live" && s.freeText;
  const agentLabel = s.id === "review" || s.id === "quote" ? "Draft for Jim" : "Assistant";

  return (
    <section className="aid" id="ai" aria-labelledby="ai-h">
      <div className="aid-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="aid-head">
          <span className="eyebrow"><Icon name="sparkle" /> New: AI agents</span>
          <h2 id="ai-h">An assistant that works<br /><span>while you're on the tools.</span></h2>
          <p>We build AI agents for small businesses: they answer customers, take bookings, reply to reviews and chase quotes, using your real info. You approve anything that matters. Try one.</p>
        </div>

        <div className="aid-stage">
          <div className="aid-side">
            <div className="aid-tabs" role="tablist" aria-label="What the agent does">
              {SCENARIOS.map((x) => (
                <button key={x.id} role="tab" type="button" aria-selected={x.id === id} aria-controls="aid-phone" onClick={() => setId(x.id)}>
                  <Icon name={x.icon as IconName} /> {x.tab}
                </button>
              ))}
            </div>
            <p className="aid-pitch">{s.pitch}</p>

            <div className="aid-log">
              <div className="aid-log-top">
                <span>Agent activity</span>
                <span className={`aid-status${busy ? " is-busy" : ""}`}>{busy ? "Working" : steps.length ? "Done" : "Waiting"}</span>
              </div>
              <ol aria-live="polite">
                {steps.length === 0 && <li className="aid-empty">Pick a message in the phone to see each step.</li>}
                {steps.map((st, i) => (
                  <li key={i} className={st.done ? "is-done" : ""}>
                    <span className="aid-dot"><Icon name={st.done ? "check" : (STEPS[st.step].icon as IconName)} /></span>
                    <span className="aid-step">{STEPS[st.step].label}</span>
                    <span className="aid-detail">{st.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="aid-phone-shell">
            <div className="aid-phone" id="aid-phone" role="tabpanel">
              <div className="aid-bar">
                <span className="aid-avatar">{s.business.initials}</span>
                <span className="aid-biz"><b>{s.business.name}</b><small>{s.business.kind}</small></span>
                <span className={`aid-mode is-${mode}`}>{mode === "live" ? "Live" : "Sample"}</span>
              </div>
              <div className="aid-chat" ref={scroller}>
                {msgs.map((m, i) => (
                  <div key={i} className={`aid-msg from-${m.from}`}>
                    {m.from === "agent" && <span className="aid-who"><Icon name="sparkle" /> {agentLabel}</span>}
                    <p>{m.text}</p>
                  </div>
                ))}
                {typing && <div className="aid-msg from-agent aid-typing" aria-label="Agent is working"><i /><i /><i /></div>}
              </div>
              <div className="aid-input">
                {left.length > 0 && (
                  <div className="aid-chips">
                    {left.map((p) => (
                      <button key={p.text} type="button" disabled={busy} onClick={() => ask(p.text)}>{p.text}</button>
                    ))}
                  </div>
                )}
                {canType ? (
                  <form onSubmit={submit} className="aid-form">
                    <input value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={200} placeholder="Ask your own question" aria-label="Your question" disabled={busy} />
                    <button type="submit" disabled={busy || !draft.trim()} aria-label="Send"><Icon name="send" /></button>
                  </form>
                ) : left.length === 0 && !busy ? (
                  <button type="button" className="aid-reset" onClick={() => { run.current++; setMsgs([s.opener]); setSteps([]); setUsed([]); }}>Start again</button>
                ) : null}
              </div>
            </div>
            <p className="aid-note">
              {mode === "live"
                ? "Live: answered just now by Claude, from this sample business's info."
                : "Sample conversation with a fictional business. Yours answers from your real info."}
            </p>
          </div>
        </div>

        <div className="aid-offer">
          <div className="aid-offer-core">
            <div>
              <h3>AI assistant <span className="num">$39</span><small>/month</small></h3>
              <p>Add it to any plan. Custom agents are quoted per job. AI usage is billed at cost with no markup (usually $5 to $30 a month) and you set a monthly cap.</p>
            </div>
            <button className="btn btn-accent aid-cta" type="button" onClick={onAsk}>
              Ask about AI for my business <span className="aid-cta-i"><Icon name="arrow-up-right" /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
