import { useEffect, useRef, type CSSProperties } from "react";
import "@fontsource/caveat/latin-500.css";
import { LogoMark } from "../App";
import "./postcard.css";

// What a sent enquiry becomes (founder, 20 Nov 2026: "something unique
// somewhere else", then "the postcard can be a little better"). The form
// itself stays plain; only the moment after "Send" changes. A postcard
// arrives picture side up ("Greetings from Oceanalt"), flips over, their
// message writes itself in handwriting, it gets an Oceanalt stamp and a
// postmark with today's date, and goes into the post slot. Then the
// thank-you. With reduced motion the back of the card and the thank-you show.
// Handwriting: Caveat (OFL), self-hosted via @fontsource.

export function Postcard({ name, company, message, replied, email }: { name: string; company: string; message: string; replied: boolean; email: string }) {
  const first = name.trim().split(/\s+/)[0] || "you";
  const text = message.trim().replace(/\s+/g, " ");
  const excerpt = (text.length > 150 ? `${text.slice(0, 150).trimEnd()}…` : text) || "We'd like to talk about a project.";
  const sign = `${name.trim() || "A new friend"}${company.trim() ? `, ${company.trim()}` : ""}`;
  const words = excerpt.split(" ");
  // However long the message, it takes about 1.4 seconds to write.
  const step = Math.min(0.07, 1.4 / Math.max(words.length, 1));
  const date = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
  const ref = useRef<HTMLDivElement>(null);

  // The form is taller than the card: bring the card into view so the post is seen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 70 || r.bottom > window.innerHeight) el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  return (
    <div className="pc" role="status" ref={ref} style={{ "--write": `${(words.length * step).toFixed(2)}s` } as CSSProperties}>
      <div className="pc-stage" aria-hidden="true">
        <div className="pc-slot"><span>Post</span></div>
        <div className="pc-drop">
          <div className="pc-post">
            <div className="pc-flip">
              <div className="pc-front">
                <LogoMark />
                <p className="pc-greet"><small>Greetings from</small>Oceanalt</p>
                <p className="pc-cities">Sydney · Melbourne</p>
              </div>
              <div className="pc-card">
                <div className="pc-left">
                  <p className="pc-dear pc-hand">Dear Lathif,</p>
                  <p className="pc-msg pc-hand">
                    {words.map((w, i) => <span key={i} style={{ "--w": `${(i * step).toFixed(3)}s` } as CSSProperties}>{w} </span>)}
                  </p>
                  <p className="pc-sign pc-hand">{sign}</p>
                </div>
                <div className="pc-right">
                  <div className="pc-stamp"><LogoMark /><span>Oceanalt</span></div>
                  <div className="pc-postmark"><span>Sydney · Melbourne</span><b>{date}</b></div>
                  <div className="pc-to">
                    <span>Lathif Shaik</span>
                    <span>Oceanalt</span>
                    <span>Sydney and Melbourne</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pc-thanks">
        <h3>Posted. Thanks, {first}.</h3>
        <p>{replied ? "There's a note in your inbox now. " : ""}Lathif will reply the same business day from {email} to find a time to talk.</p>
      </div>
    </div>
  );
}
