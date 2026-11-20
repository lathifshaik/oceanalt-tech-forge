import { useMemo, useState } from "react";
import { SERVICES } from "./content";
import "./mixdesk.css";

// "Mix your project": a small mixing desk (founder, 20 Nov 2026: liked the
// record shop, "something unique"). Each service is a channel strip with a
// real fader (a native range input, so it works with keyboard and screen
// readers). Push up what you need; the meters light, the desk writes the mix
// as a tracklist, and "Send this mix" drops it into the enquiry form (Start
// listens for the "oc:mix" event). No prices, no scores: just what they want.

// Which "What do you need?" option a lead channel maps to (NEEDS in content.ts).
const NEED: Record<string, string> = {
  brand: "brand", websites: "website", software: "software", automation: "automation",
  ai: "ai", voice: "voice", payments: "payments", search: "unsure", care: "care",
};
const SHORT: Record<string, string> = {
  brand: "Brand", websites: "Website", software: "Apps", automation: "Automate",
  ai: "AI agents", voice: "Voice", payments: "Payments", search: "Search", care: "Care",
};
const LEDS = 10;
const amount = (v: number) => (v >= 8 ? "the lot" : v >= 5 ? "a fair bit" : "a little");

export function MixDesk() {
  const [lv, setLv] = useState<Record<string, number>>({});
  const mix = useMemo(
    () => SERVICES.filter((s) => (lv[s.id] ?? 0) > 0).sort((a, b) => (lv[b.id] ?? 0) - (lv[a.id] ?? 0)),
    [lv],
  );
  const set = (id: string, v: number) => setLv((o) => ({ ...o, [id]: v }));

  const send = () => {
    if (!mix.length) return;
    const lines = mix.map((s, i) => `${i === 0 ? "Lead: " : ""}${s.name} (${amount(lv[s.id])})`);
    const message = `From the mixing desk:\n${lines.join("\n")}\n\nA bit about the project: `;
    window.dispatchEvent(new CustomEvent("oc:mix", { detail: { need: NEED[mix[0].id] ?? "unsure", message } }));
    document.getElementById("start")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => document.querySelector<HTMLTextAreaElement>("#start textarea")?.focus({ preventScroll: true }), 700);
  };

  return (
    <section id="mix" className="s-sec md" aria-labelledby="md-h">
      <div className="s-wrap">
        <div className="md-head">
          <h2 id="md-h" className="s-h2">Mix your project</h2>
          <p className="s-lede">Push up what you need, as much or as little as you like. We'll quote the mix.</p>
        </div>

        <div className="md-desk">
          <div className="md-channels" role="group" aria-label="Services">
            {SERVICES.map((s, n) => {
              const v = lv[s.id] ?? 0;
              return (
                <div className={`md-ch${v ? " is-on" : ""}`} key={s.id}>
                  <span className="md-num" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                  <span className="md-led" aria-hidden="true" />
                  <div className="md-strip">
                    <span className="md-meter" aria-hidden="true">
                      {Array.from({ length: LEDS }, (_, i) => <i key={i} className={i < v ? "is-lit" : ""} style={{ animationDelay: `${(i * 37) % 9 * -.11}s` }} />)}
                    </span>
                    <input
                      type="range" min={0} max={10} step={1} value={v}
                      aria-label={s.name}
                      aria-valuetext={v ? `${s.name}: ${amount(v)}` : `${s.name}: off`}
                      onChange={(e) => set(s.id, Number(e.target.value))}
                    />
                  </div>
                  <span className="md-tape">{SHORT[s.id] ?? s.name}</span>
                </div>
              );
            })}
          </div>

          <div className="md-master">
            <p className="md-master-h">Your mix</p>
            {mix.length ? (
              <ol className="md-tracks" aria-live="polite">
                {mix.map((s, i) => (
                  <li key={s.id}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <b>{s.name}</b>
                    <small>{i === 0 ? "lead" : amount(lv[s.id])}</small>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="md-empty" aria-live="polite">Nothing playing yet. Push a fader up.</p>
            )}
            <div className="md-actions">
              <button type="button" className="s-btn md-send" onClick={send} disabled={!mix.length}>Send this mix to Lathif</button>
              {mix.length > 0 && <button type="button" className="md-reset" onClick={() => setLv({})}>Reset</button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
