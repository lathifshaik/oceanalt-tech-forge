import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { WORK } from "../App";
import SPINES from "../data/spines.json";
import "./shelf.css";

// The record shelf under the homepage statement (founder, 20 Nov 2026: "we
// can only see ||||| lines moving and when we click on them they are like
// albums"; then "it feels like books, not records" and "it should feel like
// we're actually getting it out"). Every sample design is a record filed
// spine out: thin sleeves, all one height, packed tight, spines only. Pick one and it lifts out of its slot, turns from spine to
// cover as it comes to you, lands, and the record slides out of the sleeve.
// Arrow keys flip through, Esc puts it back. Reduced motion: no flight, the
// shelf stays still and scrolls by hand. Colours: src/data/spines.json.

type Rec = { path: string; business: string; kind: string; theme: string; added: string; bg: string; ink: string; accent: string };
const COLOURS = SPINES as Record<string, { bg: string; ink: string; accent: string }>;
const LEAD = ["fenwick-hale", "corella-hotels", "calloway-day-surgery", "calder-and-ames", "tallowwood-home", "torrens-and-pike"];
const cat = (i: number) => `OA-${String(i + 1).padStart(3, "0")}`;
const img = (p: string) => `/previews/${p}.webp`;
const still = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function useRecords(): Rec[] {
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

// A sleeve spine: mostly the theme's ink or background, with a thin accent stripe.
function spineStyle(s: Rec, i: number): CSSProperties {
  const v = (i * 7) % 4;
  const [bg, fg] = v === 0 || v === 3 ? [s.ink, s.bg] : v === 1 ? [s.accent, s.ink] : [s.bg, s.ink];
  return { "--sp-bg": bg, "--sp-fg": fg, "--sp-acc": s.accent, "--sp-w": `${0.5 + ((i * 11) % 5) * 0.11}rem` } as CSSProperties;
}

export function Shelf() {
  const recs = useRecords();
  const [open, setOpen] = useState<number | null>(null);
  const [landed, setLanded] = useState(true);
  const dlg = useRef<HTMLDialogElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const from = useRef<{ el: HTMLElement; rect: DOMRect } | null>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  // The flight: from the spine's slot on the shelf to the cover's place in the album.
  useLayoutEffect(() => {
    const f = from.current, to = cover.current, d = dlg.current;
    if (open === null || landed || !f || !to || !d) return;
    if (!d.open) d.showModal(); // open first, so the album has a place to land
    const a = f.rect, b = to.getBoundingClientRect();
    const fly = document.createElement("div");
    fly.className = "sh-fly";
    fly.style.backgroundImage = `url(${img(recs[open].path)})`;
    fly.style.setProperty("--fly-bg", getComputedStyle(f.el).getPropertyValue("--sp-bg") || "#222");
    d.appendChild(fly);
    const box = (x: number, y: number, w: number, h: number) => ({ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
    const lift = a.height * 0.55;
    const anim = fly.animate([
      { ...box(a.left, a.top, a.width, a.height), transform: "perspective(900px) rotateY(0deg)", offset: 0 },
      { ...box(a.left, a.top - lift, a.width, a.height), transform: "perspective(900px) rotateY(0deg)", offset: 0.32 },
      { ...box((a.left + b.left) / 2, a.top - lift * 0.8, Math.max(a.width, b.width * 0.45), (a.height + b.height) / 2), transform: "perspective(900px) rotateY(-55deg)", offset: 0.62 },
      { ...box(b.left, b.top, b.width, b.height), transform: "perspective(900px) rotateY(0deg)", offset: 1 },
    ], { duration: 1150, easing: "cubic-bezier(.32,.72,0,1)", fill: "forwards" });
    anim.onfinish = () => { setLanded(true); fly.remove(); };
    return () => { anim.cancel(); fly.remove(); };
  }, [open, landed, recs]);

  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  const pick = (i: number, el: HTMLElement) => {
    from.current = { el, rect: el.getBoundingClientRect() };
    el.classList.add("is-out");
    setLanded(still());
    setOpen(i);
  };
  const step = (dir: number) => {
    from.current?.el.classList.remove("is-out");
    from.current = null;
    setLanded(true);
    setOpen((o) => (o === null ? o : (o + dir + recs.length) % recs.length));
  };
  const close = () => {
    const f = from.current;
    setOpen(null);
    if (f) { f.el.classList.remove("is-out"); f.el.focus({ preventScroll: true }); }
    from.current = null;
  };

  const row = (hidden: boolean) => (
    <ul className="sh-row" aria-hidden={hidden || undefined}>
      {recs.map((s, i) => (
        <li key={s.path}>
          <button type="button" className="sh-spine" tabIndex={hidden ? -1 : undefined} style={spineStyle(s, i)}
            aria-label={hidden ? undefined : `${s.business}, ${s.kind}. Take it off the shelf`} onClick={(e) => pick(i, e.currentTarget)}>
            <span className="sh-title">{s.business}</span>
            <span className="sh-cat">{cat(i)}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  const s = open === null ? null : recs[open];

  return (
    <div className="sh" aria-label="Sample designs, filed like records">
      <div className={`sh-shelf${open !== null ? " is-holding" : ""}`}>
        <div className="sh-track">{row(false)}{row(true)}</div>
      </div>
      <p className="s-wrap s-note">{recs.length} sample designs for fictional businesses, filed like records. Pull one out.</p>

      <dialog ref={dlg} className="sh-dlg" onClose={() => open !== null && close()} onClick={(e) => { if (e.target === dlg.current) close(); }} aria-label={s ? `${s.business}, sample design` : "Sample design"}>
        {s && open !== null && (
          <div className={`sh-album${landed ? " is-landed" : ""}`} key={s.path} style={{ "--al-bg": s.bg, "--al-ink": s.ink, "--al-acc": s.accent } as CSSProperties}>
            <div className="sh-art">
              <div className="sh-disc" aria-hidden="true"><span>{s.business.slice(0, 1)}</span></div>
              <div className="sh-cover" ref={cover}>
                <img src={img(s.path)} alt={`${s.business}, sample design`} width={1200} height={750} />
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
                <button type="button" className="s-btn s-btn-soft" onClick={() => step(1)}>Next record</button>
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
