import { useEffect, useRef } from "react";
import { LogoMark } from "../App";
import "./postcard.css";

// What a sent enquiry becomes (founder, 20 Nov 2026: "something unique
// somewhere else", after the mixing desk was too much). The form itself stays
// plain; only the moment after "Send" changes: the enquiry turns into a
// postcard to Lathif, gets an Oceanalt stamp and a postmark with today's date,
// and drops into a post slot. Then the thank-you. With reduced motion the
// card and the thank-you simply show.

export function Postcard({ name, company, message, replied, email }: { name: string; company: string; message: string; replied: boolean; email: string }) {
  const first = name.trim().split(/\s+/)[0] || "you";
  const text = message.trim().replace(/\s+/g, " ");
  const excerpt = text.length > 150 ? `${text.slice(0, 150).trimEnd()}…` : text;
  const ref = useRef<HTMLDivElement>(null);
  // The form is taller than the card: bring the card into view so the post is seen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 70 || r.bottom > window.innerHeight) el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);
  const date = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="pc" role="status" ref={ref}>
      <div className="pc-stage" aria-hidden="true">
        <div className="pc-slot"><span>Post</span></div>
        <div className="pc-drop">
          <div className="pc-card">
            <div className="pc-left">
              <p className="pc-dear">Dear Lathif,</p>
              <p className="pc-msg">{excerpt || "We'd like to talk about a project."}</p>
              <p className="pc-sign">{name.trim() || "A new friend"}{company.trim() ? `, ${company.trim()}` : ""}</p>
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
      <div className="pc-thanks">
        <h3>Posted. Thanks, {first}.</h3>
        <p>{replied ? "There's a note in your inbox now. " : ""}Lathif will reply the same business day from {email} to find a time to talk.</p>
      </div>
    </div>
  );
}
