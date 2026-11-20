import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { WORK } from "../App";
import SPINES from "../data/spines.json";
import "./shelf.css";

// The record shelf under the homepage statement (founder, 20 Nov 2026: "more
// like the discs ... we can only see ||||| lines moving and when we click on
// them they are like albums"). Every sample design is a record filed spine
// out, in its own theme's colours, drifting slowly past. Pick one and the
// album slides off the shelf: the cover (the design) with its record sliding
// out, the details, and a link to play the site. Arrow keys flip through,
// Esc puts it back. Still for reduced motion (the shelf scrolls by hand).
// Spine colours: src/data/spines.json (scripts/make-spines.mjs).

type Spine = { path: string; business: string; kind: string; theme: string; added: string; bg: string; ink: string; accent: string };
const COLOURS = SPINES as Record<string, { bg: string; ink: string; accent: string }>;

// Established-brand samples lead; the rest newest first.
const LEAD = ["fenwick-hale", "corella-hotels", "calloway-day-surgery", "calder-and-ames", "tallowwood-home", "torrens-and-pike"];

function useSpines(): Spine[] {
  return useMemo(() => {
    const all = WORK.flatMap((w) => w.designs.map((d) => {
      const c = COLOURS[d.theme] ?? { bg: "#f3f4f4", ink: "#0d1114", accent: "#1f3a46" };
      return { path: d.path, business: w.business.split(",")[0], kind: w.kind, theme: d.theme, added: w.added, ...c };
    }));
    const lead = LEAD.flatMap((p) => all.filter((s) => s.path === p));
    const rest = all.filter((s) => !LEAD.includes(s.path)).sort((a, b) => b.added.localeCompare(a.added));
    return [...lead, ...rest];
  }, []);
}

// Three spine styles so the shelf reads like a real one, not a barcode.
function spineStyle(s: Spine, i: number): CSSProperties {
  const v = (i * 7) % 3;
  const [bg, fg, band] = v === 0 ? [s.ink, s.bg, s.accent] : v === 1 ? [s.accent, s.ink, s.bg] : [s.bg, s.ink, s.accent];
  return { "--sp-bg": bg, "--sp-fg": fg, "--sp-band": band, "--sp-w": `${1.7 + ((i * 13) % 5) * 0.22}rem` } as CSSProperties;
}

const cat = (i: number) => `OA-${String(i + 1).padStart(3, "0")}`;

export function Shelf() {
  const spines = useSpines();
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const last = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % spines.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + spines.length) % spines.length));
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, spines.length]);

  const pick = (i: number, el: HTMLButtonElement) => { last.current = el; setOpen(i); };
  const close = () => { setOpen(null); last.current?.focus(); };

  const row = (hidden: boolean) => (
    <ul className="sh-row" aria-hidden={hidden || undefined}>
      {spines.map((s, i) => (
        <li key={s.path}>
          <button
            type="button" className="sh-spine" style={spineStyle(s, i)} tabIndex={hidden ? -1 : undefined}
            aria-label={hidden ? undefined : `${s.business}, ${s.kind}. Take it off the shelf`}
            onClick={(e) => pick(i, e.currentTarget)}
          >
            <span className="sh-band" aria-hidden="true" />
            <span className="sh-title">{s.business}</span>
            <span className="sh-cat">{cat(i)}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  const s = open === null ? null : spines[open];

  return (
    <div className="sh" aria-label="Sample designs, filed like records">
      <div className="sh-shelf">
        <div className="sh-track">{row(false)}{row(true)}</div>
      </div>
      <p className="s-wrap s-note">{spines.length} sample designs for fictional businesses, filed like records. Pull one out.</p>

      <dialog ref={dlg} className="sh-dlg" onClose={() => open !== null && close()} onClick={(e) => { if (e.target === dlg.current) close(); }} aria-label={s ? `${s.business}, sample design` : "Sample design"}>
        {s && open !== null && (
          <div className="sh-album" key={s.path} style={{ "--al-bg": s.bg, "--al-ink": s.ink, "--al-acc": s.accent } as CSSProperties}>
            <div className="sh-art">
              <div className="sh-disc" aria-hidden="true"><span>{s.business.slice(0, 1)}</span></div>
              <div className="sh-cover">
                <img src={`/previews/${s.path}.webp`} alt={`${s.business}, sample design`} width={1200} height={750} />
                <span className="sh-sticker">Sample</span>
              </div>
            </div>
            <div className="sh-info">
              <p className="sh-meta">{cat(open)} · {s.theme} pressing</p>
              <h3>{s.business}</h3>
              <p className="sh-kind">{s.kind}</p>
              <p className="sh-note">A sample design for a fictional business, made to show our range.</p>
              <div className="sh-actions">
                <a className="s-btn s-btn-ink" href={`/work/${s.path}/`} target="_blank" rel="noopener">Play the site</a>
                <button type="button" className="s-btn s-btn-soft" onClick={() => setOpen((o) => (o === null ? o : (o + 1) % spines.length))}>Next record</button>
              </div>
              <button type="button" className="sh-close" onClick={close}>Back on the shelf</button>
              <p className="sh-keys">Arrow keys flip through. Esc puts it back.</p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
