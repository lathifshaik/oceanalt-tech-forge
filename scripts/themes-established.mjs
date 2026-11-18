import { readFileSync, writeFileSync } from "node:fs";
// Source for the six established-brand themes; run `node scripts/themes-established.mjs` to write them into themes.json.
const F = new URL("../templates/themes/themes.json", import.meta.url);
const themes = JSON.parse(readFileSync(F, "utf8"));
const min = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "").replace(/\s*([{};,>])\s*/g, "$1").replace(/;}/g, "}").trim();

// Slow, eased entrances. Hero on load; sections as they scroll in (where the browser supports
// scroll-driven animation). Both stop for reduced motion (base.css also kills them).
const motion = (p, sel) => `
@media (prefers-reduced-motion:no-preference){
  .hero h1,.hero .eyebrow,.hero p,.hero .ctas{animation:${p}-rise 1.4s cubic-bezier(.16,1,.3,1) both}
  .hero .eyebrow{animation-delay:.05s}.hero h1{animation-delay:.12s}.hero p{animation-delay:.28s}.hero .ctas{animation-delay:.4s}
  @keyframes ${p}-rise{from{opacity:0;transform:translateY(1.75rem)}}
  @supports (animation-timeline:view()){
    ${sel}{animation:${p}-in linear both;animation-timeline:view();animation-range:entry 5% entry 55%}
    @keyframes ${p}-in{from{opacity:0;transform:translateY(2.5rem)}}
  }
}`;
// Pill buttons with the arrow in its own circle.
const pill = (arrow = "\\2192") => `
.btn{gap:.7rem;padding:.95rem 1.6rem;transition:transform .5s cubic-bezier(.32,.72,0,1),background .4s,color .4s,box-shadow .4s}
.btn .i{display:none}
.btn::after{content:"${arrow}";font-size:1rem;line-height:1;letter-spacing:0;transition:transform .5s cubic-bezier(.32,.72,0,1)}
.btn:hover::after{transform:translateX(4px)}
.btn:active{transform:scale(.98)}
.btn-line{border:0;box-shadow:inset 0 0 0 1px color-mix(in srgb,currentColor 35%,transparent)}`;

// ── 1. plinth: Melbourne property developer ──────────────────────────────────
themes.plinth = {
  name: "Plinth",
  mood: "Residential development. Warm concrete and near-black, a light high-contrast serif set very large, spaced capitals, hairline rows and nothing boxed.",
  fonts: "https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@0,300;0,400;1,300&family=Schibsted+Grotesk:wght@400;500;600&display=swap",
  type: { display: "\"Noto Serif Display\"", body: "\"Schibsted Grotesk\"", weight: 300, tracking: "-0.025em" },
  shape: { r: "0px", img: "0px", btn: "999px" },
  light: { bg: "#f1eee8", surface: "#e8e3da", card: "#f7f5f1", ink: "#1b1a17", muted: "#5d584f", line: "#d6cfc3", accent: "#1b1a17", "on-accent": "#f1eee8", "accent-text": "#6b5637", "accent-2": "#6b5637", "on-accent-2": "#f7f5f1" },
  dark: { bg: "#141311", surface: "#1c1a17", card: "#23211d", ink: "#ece7de", muted: "#a59e92", line: "#34302a", accent: "#ece7de", "on-accent": "#141311", "accent-text": "#cdb48c", "accent-2": "#cdb48c", "on-accent-2": "#141311" },
  css: min(`
${pill()}
.top{border-bottom:1px solid var(--line)}
.hero-full .top{position:absolute;inset:0 0 auto;z-index:5;border:0;color:#fff}
.top .wrap{height:5.5rem}
.mono{display:none}
.brand{font-family:var(--font-body);font-weight:600;font-size:.8rem;letter-spacing:.36em;text-transform:uppercase}
.nav{gap:2.25rem}
.nav a{color:inherit;opacity:.75;font-size:.72rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.nav a:hover{opacity:1;color:inherit}
.top .btn{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px color-mix(in srgb,currentColor 40%,transparent);font-size:.9rem}
.hero-full .hero .wrap{min-height:min(100svh,1000px);padding-block:9rem clamp(3rem,6vw,5rem)}
.hero-full .shot::after{background:linear-gradient(90deg,rgb(14 12 10 / .55),rgb(14 12 10 / 0) 60%),linear-gradient(180deg,rgb(14 12 10 / .6),rgb(14 12 10 / .2) 26%,rgb(14 12 10 / .38) 48%,rgb(14 12 10 / .88))}
.hero-full .hero p:not(.eyebrow){text-shadow:0 1px 16px rgb(0 0 0 / .45)}
.hero-full .shot img{object-position:50% 40%}
.hero .wrap > div:first-child{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:0 clamp(2rem,6vw,6rem);align-items:end}
.hero .eyebrow{grid-column:1/-1;grid-row:1;font-size:.7rem;letter-spacing:.32em;opacity:.9;margin-bottom:2rem}
.hero h1{grid-column:1;grid-row:2/span 2;font-weight:400;font-size:clamp(3rem,7.6vw,7.4rem);line-height:.94;letter-spacing:-.035em;max-width:11ch}
h1 em.accent{color:inherit}
.hero p:not(.eyebrow){grid-column:2;grid-row:2;align-self:end;font-size:1.08rem;max-width:40ch;margin-top:0}
.hero .ctas{grid-column:2;grid-row:3;align-self:end;margin-top:2rem}

.hero-full .hero .btn-accent{background:#f1eee8;color:#1b1a17}
@media (max-width:860px){.hero .wrap > div:first-child{grid-template-columns:1fr}.hero h1,.hero p:not(.eyebrow),.hero .ctas{grid-column:1;grid-row:auto}.hero p:not(.eyebrow){margin-top:1.5rem}.hero .eyebrow{margin-bottom:1.25rem}}
section{padding-block:clamp(5rem,11vw,9rem)}
.h2{font-size:clamp(2.4rem,5.2vw,4.4rem);line-height:1;letter-spacing:-.03em}
.lede{font-size:1.08rem;margin-top:1.25rem}
.creds{border-block:0;background:var(--bg)}
.creds .i{display:none}
.look-creds-big .creds ul{grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid var(--line)}
.look-creds-big .creds li{border-left:1px solid var(--line);padding:2.75rem 1.75rem;font-size:clamp(1.2rem,1.7vw,1.5rem);line-height:1.25;gap:0}
.look-creds-big .creds li:first-child{border-left:0;padding-left:0}
@media (max-width:860px){.look-creds-big .creds ul{grid-template-columns:1fr 1fr;gap:0 1.25rem}.look-creds-big .creds li,.look-creds-big .creds li:first-child{border-left:0;border-top:1px solid var(--line);padding:1.5rem 0}}
.look-services-rows .svc{margin-top:3.5rem;border-bottom:1px solid var(--line)}
.look-services-rows .svc li{border-top:1px solid var(--line);grid-template-columns:minmax(0,1fr) minmax(0,1.15fr) minmax(0,.5fr);gap:.6rem clamp(1.5rem,4vw,3.5rem);padding:2.25rem 0;align-items:baseline;transition:padding .7s cubic-bezier(.32,.72,0,1)}
.look-services-rows .svc .i{display:none}
.look-services-rows .svc h3{grid-column:1;grid-row:1;font-size:clamp(1.7rem,3vw,2.5rem)}
.look-services-rows .svc p{grid-column:2;grid-row:1;max-width:44ch}
.look-services-rows .svc .fee{grid-column:3;grid-row:1;text-align:right;font-family:var(--font-display);font-weight:300;font-size:1.3rem}
.look-services-rows .svc li:hover{padding-left:1rem}
@media (max-width:760px){.look-services-rows .svc li{grid-template-columns:1fr}.look-services-rows .svc h3,.look-services-rows .svc p,.look-services-rows .svc .fee{grid-column:1;grid-row:auto;text-align:left}}
.plate-grid figcaption b{font-family:var(--font-display);font-weight:300;font-size:1.45rem;letter-spacing:-.01em}
.plate-grid figcaption span{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;align-self:center}
#team .team-grid{margin-top:3.5rem;border-bottom:1px solid var(--line)}
.look-team-list .member{grid-template-columns:1fr;padding-block:2.25rem}
.member figcaption{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr) minmax(0,.5fr);gap:.4rem clamp(1.5rem,4vw,3.5rem);align-items:baseline}
.member h3,.look-team-list .member h3{grid-column:1;grid-row:1;font-size:clamp(1.6rem,2.8vw,2.3rem)}
.member p,.look-team-list .member p{grid-column:2;grid-row:1;margin:0;font-size:1rem}
.member .role{grid-column:3;grid-row:1;text-align:right;margin:0;color:var(--muted);font-weight:500;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase}
@media (max-width:760px){.member figcaption{grid-template-columns:1fr}.member h3,.member p,.member .role,.look-team-list .member h3,.look-team-list .member p{grid-column:1;grid-row:auto;text-align:left}}
.look-process-timeline .steps{grid-template-columns:repeat(5,minmax(0,1fr));gap:2rem;max-width:none;margin:3.5rem 0 0;border:0}
.look-process-timeline .steps li{padding:2rem 0 0;border-top:1px solid var(--ink)}
.look-process-timeline .steps li::before{content:"0" counter(s);position:static;display:block;width:auto;height:auto;margin:0 0 1.5rem;background:none;border-radius:0;color:var(--muted);font-family:var(--font-body);font-size:.72rem;letter-spacing:.2em}
.steps h3{font-size:1.4rem}
@media (max-width:1000px){.look-process-timeline .steps{grid-template-columns:1fr 1fr}}
@media (max-width:600px){.look-process-timeline .steps{grid-template-columns:1fr}}
.look-faq-split .faq{border-top:1px solid var(--ink)}
.faq summary{font-family:var(--font-display);font-weight:300;font-size:1.4rem;letter-spacing:-.01em}
.faq summary::after{font-family:var(--font-body);font-weight:300;color:var(--ink)}
.contact .h2{font-size:clamp(2.6rem,6vw,5.2rem)}
.look-contact-invert .contact{padding-block:clamp(5rem,11vw,9rem)}
.look-contact-invert .contact .wrap{align-items:start}
.look-contact-invert .contact .btn-accent{background:var(--bg);color:var(--ink)}
.direct-line a{font-family:var(--font-display);font-weight:300;font-size:1.5rem}
footer{border-top:0}
${motion("pl", ".svc li,.plate-grid li,.member,.steps li,.faq details,.creds li")}
`),
};

// ── 2. foyer: boutique hotel group ───────────────────────────────────────────
const foyerPal = { bg: "#0e1411", surface: "#141b17", card: "#18201b", ink: "#ece5d6", muted: "#a8a293", line: "#2a332d", accent: "#c9a46a", "on-accent": "#15110a", "accent-text": "#d4b47f", "accent-2": "#ece5d6", "on-accent-2": "#0e1411" };
themes.foyer = {
  name: "Foyer",
  mood: "Boutique hotels. Bottle-green black, brass and parchment, an old-world display serif in spaced capitals, arched portraits, hairlines. Always dark.",
  fonts: "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Red+Hat+Text:wght@400;500&display=swap",
  type: { display: "\"Gilda Display\"", body: "\"Red Hat Text\"", weight: 400, tracking: "-0.005em" },
  shape: { r: "0px", img: "0px", btn: "999px" },
  darkOnly: true,
  light: foyerPal,
  dark: foyerPal,
  css: min(`
${pill("\\2192")}
.btn{font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;font-weight:500}
.btn-light{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ink) 40%,transparent)}
.top{inset:0 0 auto 0}
.top .wrap{height:5.5rem;padding-inline:0;border-radius:0;background:none;border:0;border-bottom:1px solid rgb(236 229 214 / .2);backdrop-filter:none}
.brand{font-family:var(--font-display);font-size:1.55rem;letter-spacing:.3em;text-transform:uppercase}
.brand .i{display:none}
.nav{gap:2.25rem}
.nav a{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase}
.hero{min-height:min(100svh,1000px)}
.hero::after{background:linear-gradient(180deg,rgb(8 10 9 / .6),rgb(8 10 9 / .1) 32%,rgb(8 10 9 / .25) 55%,rgb(8 10 9 / .9))}
.hero .wrap{padding-block:10rem clamp(4rem,8vw,6.5rem)}
.hero h1{font-size:clamp(3rem,7.4vw,7rem);line-height:.98;max-width:14ch}
h1 em.accent{font-style:normal;color:var(--accent)}
.hero .eyebrow{color:var(--accent);opacity:1;margin-bottom:1.75rem}
.hero p{font-size:1.1rem;max-width:44ch;margin-top:1.75rem}
.hero .ctas{margin-top:2.5rem}
.hero .btn-accent{background:var(--accent);color:var(--on-accent)}
.curve{display:none}
section{padding-block:clamp(5rem,11vw,9rem)}
.h2{font-size:clamp(2.6rem,5.4vw,4.6rem);line-height:1}
.lede{font-size:1.08rem}
#team{padding-top:clamp(4rem,8vw,6rem)}
.look-team-strip .team-grid{grid-auto-columns:minmax(16rem,1fr);gap:1.25rem;margin-top:2.5rem}
.look-team-strip .member .ph{aspect-ratio:3/4}
.look-team-strip .member .ph img{transition:transform 1.4s cubic-bezier(.16,1,.3,1)}
.look-team-strip .member:hover .ph img{transform:scale(1.04)}
.look-team-strip .member .ph::after{background:linear-gradient(180deg,transparent 45%,rgb(6 8 7 / .85))}
.look-team-strip .member h3{bottom:5rem;font-size:clamp(2rem,3vw,2.6rem);letter-spacing:.02em}
.look-team-strip .member p{bottom:1.5rem;height:2.9rem;display:flex;align-items:flex-end;font-size:.95rem;line-height:1.45;opacity:.85;max-width:28ch}
.intro .body{font-size:1.1rem}
.portrait{border-radius:999px 999px 0 0}
.creds{display:grid;gap:.7rem;margin-top:2.25rem}
.creds li{border:0;border-radius:0;padding:0 0 0 1.4rem;position:relative;font-size:.98rem}
.creds li::before{content:"";position:absolute;left:0;top:.62em;width:.5rem;height:1px;background:var(--accent)}
.treat{background:var(--bg)}
.look-treatments-menu .group{border-top:1px solid var(--line);padding:2.75rem 0}
.look-treatments-menu .group h3{font-size:clamp(2rem,3.6vw,3rem)}
.tx b{font-weight:400;font-size:1.15rem}
.tx .price{font-family:var(--font-display);font-size:1.35rem;color:var(--accent-text)}
.tx a{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase}
.tx+.tx{border-top-color:var(--line)}
.plate-grid figcaption b{font-family:var(--font-display);font-weight:400;font-size:1.5rem}
.plate-grid figcaption span{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent-text);align-self:center}
.gift{border-block:1px solid var(--line)}
.look-gift-line .g-amt{-webkit-text-stroke:1px var(--accent);font-size:clamp(6rem,16vw,12rem)}
.g-label{color:var(--accent-text)}
.info{background:var(--surface)}
.info .addr{display:none}
.look-visit-wide .info .wrap{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,6vw,5rem)}
.look-visit-wide .policies{grid-template-columns:1fr}
.locs b{font-size:1.6rem}
.policies{gap:0;border-top:1px solid var(--line)}
.policies details{background:none;border-radius:0;border-bottom:1px solid var(--line);padding:1.35rem 0}
.policies summary{font-family:var(--font-display);font-size:1.3rem;font-weight:400}
@media (max-width:860px){.look-visit-wide .info .wrap{grid-template-columns:1fr}}
.look-band-giant .cta-band .wrap{background:var(--accent);color:var(--on-accent)}
.look-band-giant .cta-band h2{font-size:clamp(2.8rem,8vw,7rem);max-width:15ch}
.cta-band .btn{background:var(--on-accent);color:var(--accent)}
footer{padding-block:3rem}
${motion("fy", ".member,.tx,.group h3,.plate-grid li,.g-card,.locs li,.policies details")}
`),
};

// ── 3. lucent: private day-surgery group ─────────────────────────────────────
themes.lucent = {
  name: "Lucent",
  mood: "Private health. Clinical white and pale sage-grey, one deep blue, a light rounded grotesque at large sizes, soft rounded photos, nothing boxed.",
  fonts: "https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600&display=swap",
  type: { display: "\"Onest\"", body: "\"Onest\"", weight: 300, tracking: "-0.035em" },
  shape: { r: "24px", img: "28px", btn: "999px" },
  light: { bg: "#f6f7f5", surface: "#ebefed", card: "#ffffff", ink: "#11232b", muted: "#4f6168", line: "#d5dddb", accent: "#1f4e79", "on-accent": "#ffffff", "accent-2": "#cfe0e4", "on-accent-2": "#11232b" },
  dark: { bg: "#0d171b", surface: "#132026", card: "#17262d", ink: "#e7eef0", muted: "#9db0b6", line: "#24363e", accent: "#8cbbe6", "on-accent": "#0d171b", "accent-2": "#24414f", "on-accent-2": "#e7eef0" },
  css: min(`
${pill("\\2192")}
.btn{font-weight:500}
.top .wrap{height:5rem;padding-inline:0;border-radius:0;background:none!important;border:0;border-bottom:1px solid var(--line);backdrop-filter:none}
.brand{font-family:var(--font-body);font-weight:500;font-size:1.1rem;letter-spacing:-.01em;gap:.7rem}
.brand .i{display:none}
.brand{white-space:nowrap}
.brand::before{content:"";flex:none;width:1.15rem;height:1.15rem;border-radius:50%;box-shadow:inset 0 0 0 3.5px var(--accent)}
.nav a{font-size:.95rem;opacity:.75}
.hero-split .top .btn-light{background:var(--ink);color:var(--bg)}
@media (min-width:861px){.hero-split .hero{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);min-height:min(94svh,920px)}}
.hero-split .hero-img{align-self:end;height:calc(100% - 7rem);border-radius:var(--r-img) 0 0 var(--r-img)}
@media (max-width:860px){.hero-split .hero-img{height:auto;border-radius:0}}
.hero-split .hero .wrap{padding-top:8rem}
@media (max-width:860px){.hero-split .hero .wrap{padding-top:6.5rem}.hero-split .hero h1{font-size:2.6rem}}
@media (max-width:520px){.top .btn{display:none}}
.hero-split .hero h1{font-size:clamp(2.6rem,5.2vw,5rem);line-height:1;letter-spacing:-.04em;max-width:12ch}
.hero .eyebrow{color:var(--accent-text);opacity:1;letter-spacing:.18em;font-weight:500;margin-bottom:1.5rem}
.hero p{font-size:1.12rem;max-width:42ch;margin-top:1.5rem}
.hero .ctas{margin-top:2.25rem}
section{padding-block:clamp(5rem,10vw,8.5rem)}
.h2{font-size:clamp(2.3rem,4.6vw,4rem);line-height:1.02}
.portrait{border-radius:var(--r-img);aspect-ratio:4/5}
.intro .body{font-size:1.12rem}
.creds{display:grid;gap:0;margin-top:2.25rem;border-top:1px solid var(--line)}
.creds li{border:0;border-radius:0;border-bottom:1px solid var(--line);padding:1rem 0 1rem 2rem;position:relative;font-size:1rem}
.creds li::before{content:"";position:absolute;left:0;top:1.45rem;width:.75rem;height:.4rem;border-left:1.5px solid var(--accent);border-bottom:1.5px solid var(--accent);transform:rotate(-45deg)}
.treat{background:var(--surface)}
.look-treatments-numbered .group h3{color:var(--accent-text);font-size:.78rem;letter-spacing:.22em}
.look-treatments-numbered .tx{border-top-color:var(--line)}
.look-treatments-numbered .tx::before{font-weight:300;color:color-mix(in srgb,var(--accent) 55%,var(--surface))}
.look-treatments-numbered .tx b{font-weight:400}
.tx .price{font-size:1rem!important;color:var(--muted);font-weight:400}
.look-treatments-numbered .tx a{border-color:color-mix(in srgb,var(--ink) 25%,transparent)}
.look-team-list .team-grid{margin-top:3rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,26rem),1fr))}
.look-team-list .member{grid-template-columns:7.5rem 1fr;gap:0 1.75rem;padding-block:1.75rem}
.look-team-list .member h3{font-size:clamp(1.4rem,2.2vw,1.8rem)}
.look-team-list .member p{color:var(--muted)}
.look-visit-invert .info{background:var(--ink);color:var(--bg)}
.info .addr{display:none}
.info .h2{font-size:clamp(2.6rem,5.4vw,4.6rem)}
.locs{margin-top:2.5rem}
.locs b{font-weight:400;font-size:1.5rem}
.hours{margin-top:2.5rem}
.policies{gap:0;border-top:1px solid var(--line)}
.policies details{background:none;border-radius:0;border-bottom:1px solid var(--line);padding:1.3rem 0}
.policies summary{font-weight:400;font-size:1.15rem}
.look-band-line .cta-band .wrap{border-block:1px solid var(--line);padding-block:clamp(2.5rem,6vw,4.5rem)}
.look-band-line .cta-band h2{font-size:clamp(2rem,4.4vw,3.6rem);max-width:20ch;font-weight:300}
${motion("lu", ".tx,.member,.locs li,.policies details,.portrait,.creds li")}
`),
};

// ── 4. claret: independent private wealth firm ───────────────────────────────
themes.claret = {
  name: "Claret",
  mood: "Private wealth. Warm paper, ink and one claret, a light book serif with italics, duotone photography, square buttons and ruled rows.",
  fonts: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=Instrument+Sans:wght@400;500;600&display=swap",
  type: { display: "\"Source Serif 4\"", body: "\"Instrument Sans\"", weight: 300, tracking: "-0.02em" },
  shape: { r: "0px", img: "0px", btn: "0px" },
  light: { bg: "#f4f2ee", surface: "#ebe7e0", card: "#faf8f5", ink: "#16181d", muted: "#585a60", line: "#d9d4cb", accent: "#5c1f2b", "on-accent": "#f8f2ef", "accent-2": "#16181d", "on-accent-2": "#f4f2ee" },
  dark: { bg: "#121316", surface: "#1a1b1f", card: "#202227", ink: "#ece8e1", muted: "#a3a29f", line: "#2f3137", accent: "#e0a9b3", "on-accent": "#1a0d10", "accent-2": "#ece8e1", "on-accent-2": "#121316" },
  css: min(`
.btn{padding:1rem 1.5rem;gap:.85rem;font-weight:500;transition:background .45s cubic-bezier(.32,.72,0,1),color .45s,box-shadow .45s}
.btn .i{display:none}
.btn::after{content:"\\2192";transition:transform .5s cubic-bezier(.32,.72,0,1)}
.btn:hover::after{transform:translateX(5px)}
.btn:active{transform:scale(.985)}
.btn-line{border:0;box-shadow:inset 0 0 0 1px var(--line)}
.btn-line:hover{box-shadow:inset 0 0 0 1px var(--ink)}
.top .wrap{height:5.25rem}
.top .btn{padding:.7rem 1.1rem}
.top .btn::after{display:none}
.mono{border-radius:0;width:2.2rem;height:2.2rem;background:var(--accent);color:var(--on-accent);font-family:var(--font-display);font-weight:400;font-size:.9rem;letter-spacing:.04em}
.brand{font-family:var(--font-display);font-weight:400;font-size:1.35rem;letter-spacing:-.01em;white-space:nowrap}
@media (max-width:520px){.brand{font-size:1.15rem}.top .btn{padding:.6rem .85rem;font-size:.88rem}}
.nav a{font-size:.92rem}
.hero .wrap{gap:clamp(2rem,7vw,7rem);align-items:end;padding-block:clamp(3rem,7vw,6rem) clamp(4rem,8vw,7rem)}
@media (min-width:861px){.hero .wrap{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}}
.hero h1{font-size:clamp(3rem,6.2vw,5.8rem);line-height:.98;letter-spacing:-.035em;max-width:12ch}
h1 em.accent{color:var(--accent);font-style:italic}
.hero .eyebrow{color:var(--accent);opacity:1;font-weight:600;margin-bottom:1.75rem}
.hero p{font-size:1.12rem;max-width:42ch;margin-top:1.75rem}
.hero .ctas{margin-top:2.5rem}
.shot{position:relative;aspect-ratio:3/4}
.shot img{filter:grayscale(1) contrast(1.08)}
.shot::after{content:"";position:absolute;inset:0;background:var(--accent);mix-blend-mode:multiply;opacity:.55}
@media (max-width:860px){.shot{aspect-ratio:4/3}}
.creds{border-block:1px solid var(--line)}
.creds ul{justify-content:space-between;padding-block:1.5rem;font-size:.92rem;font-weight:500}
.creds .i{color:var(--accent)}
section{padding-block:clamp(5rem,10vw,8.5rem)}
.h2{font-size:clamp(2.3rem,4.6vw,4rem);line-height:1.02}
.svc{background:none;border:0;border-radius:0;gap:0;border-bottom:1px solid var(--line)}
.svc li{background:none;border-top:1px solid var(--line);padding:1.9rem 0;grid-template-columns:2.75rem 1fr;gap:.4rem 1rem}
.svc .i{color:var(--accent);width:1.35rem;height:1.35rem}
.svc h3{font-size:1.6rem;font-weight:400}
.look-team-large .team-grid{gap:2.5rem;margin-top:3.5rem}
.member .ph{aspect-ratio:4/5}
.member .ph img{filter:grayscale(1) contrast(1.05);transition:filter 1s cubic-bezier(.16,1,.3,1)}
.member:hover .ph img{filter:none}
.look-team-large .member h3{font-size:1.75rem;margin-top:1.4rem;font-weight:400}
.member .role{color:var(--accent);font-weight:600;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;margin-top:.5rem}
.plates{padding-top:0}
.plate-grid img{filter:grayscale(1) contrast(1.05)}
.plate-grid figcaption b{font-family:var(--font-display);font-size:1.3rem;font-weight:400}
.look-process-big .steps{gap:clamp(2rem,4vw,3.5rem)}
.look-process-big .steps li{border-top:1px solid var(--ink);padding-top:1.75rem}
.look-process-big .steps li::before{content:counter(s);-webkit-text-stroke:1px var(--accent);font-weight:300;font-size:clamp(4.5rem,9vw,7.5rem);margin-bottom:1rem}
.steps h3{font-size:1.5rem;font-weight:400}
.look-fees-table .fees{background:var(--surface)}
.look-fees-table .fee-list{border-top:1px solid var(--ink);margin-top:3rem}
.look-fees-table .fee-list li{grid-template-columns:7rem minmax(0,1fr) auto;gap:.3rem 2rem;padding:1.6rem 0;align-items:baseline;transition:padding .6s cubic-bezier(.32,.72,0,1)}
.look-fees-table .fee-list li:hover{padding-left:.75rem}
.look-fees-table .fee-list .amt{grid-column:1;grid-row:1;font-family:var(--font-body);font-size:.78rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.look-fees-table .fee-list b{grid-column:2;grid-row:1;font-family:var(--font-display);font-weight:400;font-size:clamp(1.25rem,2.2vw,1.7rem);line-height:1.25}
.look-fees-table .fee-list small{grid-column:3;grid-row:1;color:var(--accent);font-weight:500}
@media (max-width:760px){.look-fees-table .fee-list li{grid-template-columns:1fr}.look-fees-table .fee-list .amt,.look-fees-table .fee-list b,.look-fees-table .fee-list small{grid-column:1;grid-row:auto}}
.look-faq-grid .faq{gap:0 clamp(2rem,5vw,4rem)}
.faq details{border:0;border-top:1px solid var(--line);border-radius:0;background:none;padding:1.5rem 0}
.faq summary{font-family:var(--font-display);font-weight:400;font-size:1.3rem}
.faq summary::after{color:var(--accent)}
.contact .h2{font-size:clamp(2.6rem,6vw,5.2rem)}
.look-contact-centre .reach{width:min(100%,34rem);text-align:left;margin-top:1rem}
.reach .i,.reach a:hover{color:var(--accent)}
${motion("cl", ".svc li,.member,.steps li,.fee-list li,.faq details,.plate-grid li")}
`),
};

// ── 5. kiln: premium homewares label ─────────────────────────────────────────
themes.kiln = {
  name: "Kiln",
  mood: "Homewares label. Oat, clay and terracotta, a soft bookish serif with italics, spaced capitals, square edges, text-link buttons and big product photography.",
  fonts: "https://fonts.googleapis.com/css2?family=Castoro:ital@0;1&family=Rethink+Sans:wght@400;500;600&display=swap",
  type: { display: "\"Castoro\"", body: "\"Rethink Sans\"", weight: 400, tracking: "-0.015em" },
  shape: { r: "0px", img: "0px", btn: "0px" },
  light: { bg: "#efe9df", surface: "#e6ded1", card: "#f6f2ec", ink: "#2b2420", muted: "#675b51", line: "#d8cdbd", accent: "#2b2420", "on-accent": "#f6f2ec", "accent-text": "#94432a", "accent-2": "#94432a", "on-accent-2": "#fbf3ec" },
  dark: { bg: "#1a1613", surface: "#221d19", card: "#29231e", ink: "#eee6da", muted: "#b3a798", line: "#3a322b", accent: "#eee6da", "on-accent": "#1a1613", "accent-text": "#e0a080", "accent-2": "#e0a080", "on-accent-2": "#1a1613" },
  css: min(`
.btn{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;font-weight:600;padding:1.1rem 1.75rem;transition:background .45s cubic-bezier(.32,.72,0,1),color .45s}
.btn .i{display:none}
.btn:active{transform:scale(.985)}
.top{background:color-mix(in srgb,var(--bg) 90%,transparent)}
.top .wrap{display:grid;grid-template-columns:1fr auto 1fr;height:4.5rem}
.nav{order:-1;margin:0;gap:2rem}
.nav a{font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ink);opacity:.8}
.brand{font-family:var(--font-body);font-weight:600;font-size:.88rem;letter-spacing:.42em;text-transform:uppercase;margin-right:-.42em}
.brand .i{display:none}
.top .btn{justify-self:end;background:none;color:var(--ink);padding:.35rem 0;border-bottom:1px solid currentColor}
@media (max-width:760px){.top .wrap{grid-template-columns:1fr auto}}
.hero-full .hero .wrap{grid-template-columns:1fr;min-height:min(92svh,920px);padding-block:5rem clamp(3rem,6vw,5rem)}
.hero-full .shot .photo::after{background:linear-gradient(90deg,rgb(30 20 14 / .72),rgb(30 20 14 / .3) 55%,rgb(30 20 14 / 0) 80%),linear-gradient(180deg,rgb(30 20 14 / 0) 45%,rgb(30 20 14 / .55))}
.hero h1{font-size:clamp(2.8rem,6.8vw,6.2rem);line-height:.98;max-width:13ch}
h1 em.accent{font-style:italic;color:inherit}
.hero .eyebrow{letter-spacing:.32em;opacity:.95;margin-bottom:1.5rem}
.hero p{font-size:1.08rem;max-width:44ch;margin-top:1.5rem}
.hero .ctas{margin-top:2.25rem}
.hero-full .hero .btn-accent{background:#f6f2ec;color:#2b2420}
.hero .btn-line{display:none}
.facts{border-block:1px solid var(--line)}
.facts ul{padding-block:1.6rem}
.facts li{font-weight:500;font-size:.95rem}
.facts .i{width:1.25rem;height:1.25rem;color:var(--accent-text)}
section{padding-block:clamp(5rem,10vw,8.5rem)}
.h2{font-size:clamp(2.4rem,5vw,4.3rem);line-height:1}
.look-heads-centre section > .wrap > .h2::before{content:"";display:block;width:1px;height:2.5rem;margin:0 auto 1.75rem;background:var(--accent-text)}
.grid{gap:3.25rem 1.5rem;margin-top:3.5rem}
.product .ph{aspect-ratio:4/5}
.product .badge{left:1rem;top:1rem;border-radius:0;background:var(--bg);font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;padding:.35rem .6rem}
.product h3{font-family:var(--font-display);font-size:1.3rem;font-weight:400;letter-spacing:-.01em}
.product .price{font-weight:500}
.product .btn,.product .btn-dark{width:fit-content;background:none;color:var(--ink);padding:.35rem 0;border-bottom:1px solid currentColor;margin-top:1.1rem}
.product .btn:hover{color:var(--accent-text)}
.look-products-feature .product:first-child h3{font-size:2.1rem}
.look-products-feature .product:first-child .ph{min-height:30rem}
.look-story-banner .story{padding-block:clamp(8rem,18vw,14rem)}
.look-story-banner .story .frame::after{background:linear-gradient(90deg,rgb(30 20 14 / .78),rgb(30 20 14 / .25))}
.look-story-banner .story .h2{max-width:12ch;font-size:clamp(2.6rem,5.4vw,4.8rem)}
.look-story-banner .story .body{font-size:1.15rem}
.plate-grid figcaption{flex-direction:column}
.plate-grid figcaption b{font-family:var(--font-display);font-size:1.35rem;font-weight:400}
.plate-grid figcaption span{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase}
.look-visit-invert .visit .wrap{grid-template-columns:1fr}
.look-visit-invert .visit .h2{text-align:center}
.look-visit-invert .locs{grid-template-columns:repeat(3,minmax(0,1fr));gap:0 clamp(1.5rem,4vw,3rem);border-top:0;margin-top:3rem}
.look-visit-invert .locs li{border-top:1px solid var(--line);border-bottom:0;padding-top:1.75rem;gap:.4rem}
.look-visit-invert .locs b{font-size:clamp(1.8rem,3vw,2.5rem)}
.look-visit-invert .contact{grid-auto-flow:column;justify-content:center;gap:2rem;margin-top:0;order:2}
@media (max-width:760px){.look-visit-invert .locs{grid-template-columns:1fr}.look-visit-invert .contact{grid-auto-flow:row;justify-content:start}}
footer{font-size:.85rem}
${motion("kn", ".product,.plate-grid li,.locs li,.facts li")}
`),
};

// ── 6. girder: commercial construction and engineering ──────────────────────
themes.girder = {
  name: "Girder",
  mood: "Commercial construction. Concrete grey, near-black and one signal orange, tall condensed capitals, square edges, numbered rows and a dark enquiry panel.",
  fonts: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Public+Sans:wght@400;500;600;700&display=swap",
  type: { display: "\"Big Shoulders Display\"", body: "\"Public Sans\"", weight: 800, tracking: "0em" },
  shape: { r: "0px", img: "0px", btn: "0px" },
  light: { bg: "#ecebe7", surface: "#e2e0da", card: "#f5f4f1", ink: "#111316", muted: "#52575d", line: "#cfccc5", accent: "#e0531f", "on-accent": "#111316", "accent-text": "#a83a0f", "accent-2": "#111316", "on-accent-2": "#ecebe7" },
  dark: { bg: "#0f1113", surface: "#16191c", card: "#1c1f23", ink: "#ecebe7", muted: "#9ea3a8", line: "#2a2e33", accent: "#ff6a33", "on-accent": "#111316", "accent-text": "#ff8a5c", "accent-2": "#ecebe7", "on-accent-2": "#0f1113" },
  css: min(`
h1,.h2,h3{text-transform:uppercase}
.btn{font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;font-weight:700;padding:1.1rem 1.5rem;transition:background .4s cubic-bezier(.32,.72,0,1),color .4s,box-shadow .4s}
.btn:active{transform:scale(.985)}
.btn-line{border:0;box-shadow:inset 0 0 0 1px color-mix(in srgb,currentColor 40%,transparent)}
.btn-line::after{content:"\\2192";font-size:1rem;letter-spacing:0}
.hero-full .top{position:absolute;inset:0 0 auto;z-index:5;color:#fff}
.top .wrap{height:5.25rem}
.mark{border-radius:0;background:var(--accent);color:#111316;font-family:var(--font-display);font-size:1rem;font-weight:800}
.brand{font-family:var(--font-display);font-weight:800;font-size:1.55rem;text-transform:uppercase;letter-spacing:.01em}
.nav a{color:inherit;opacity:.78;font-size:.74rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.nav a:hover{opacity:1;color:inherit}
.hero-full .top .btn-call{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px rgb(255 255 255 / .4)}
.hero-full .hero .wrap{grid-template-columns:1fr;min-height:min(100svh,1000px);padding-block:9rem clamp(3rem,6vw,5rem)}
.hero-full .shot .photo::after{background:linear-gradient(90deg,rgb(10 12 14 / .7),rgb(10 12 14 / .1) 65%),linear-gradient(180deg,rgb(10 12 14 / .62),rgb(10 12 14 / .12) 30%,rgb(10 12 14 / .3) 55%,rgb(10 12 14 / .9))}
.hero h1{font-size:clamp(3.2rem,8vw,7.6rem);line-height:.86;max-width:16ch}
h1 em.accent{font-style:normal;color:var(--accent)}
.hero .eyebrow{font-weight:700;letter-spacing:.28em;opacity:.9;margin-bottom:1.75rem}
.hero .eyebrow::before{content:"";display:inline-block;width:.6rem;height:.6rem;margin-right:.8rem;background:var(--accent);vertical-align:.05em}
.hero p{font-size:1.1rem;max-width:56ch;margin-top:1.75rem}
.hero .ctas{margin-top:2.25rem}
.callbar{display:none!important}
footer{padding-bottom:2.5rem}
.look-trust-band .trust{background:#111316;color:#ecebe7}
.trust ul{padding-block:2.25rem;gap:2rem}
.trust li{font-family:var(--font-display);font-weight:700;font-size:1.35rem;letter-spacing:.02em;text-transform:uppercase;line-height:1.1}
.trust small{font-family:var(--font-body);text-transform:none;letter-spacing:0;font-size:.92rem;font-weight:400;margin-top:.4rem}
.look-trust-band .trust .i{background:none;padding:0;color:var(--accent);width:1.6rem;height:1.6rem}
section{padding-block:clamp(5rem,10vw,8.5rem)}
.h2{font-size:clamp(2.8rem,6.6vw,5.8rem);line-height:.9}
.lede{font-size:1.08rem}
.look-heads-rule section .h2{border-top:0;padding-top:0}
.look-heads-rule section .h2::before{content:"";display:block;width:3rem;height:6px;margin-bottom:1.5rem;background:var(--accent)}
.svc{counter-reset:sv}
.look-services-list .svc{margin-top:3rem;border-bottom:1px solid var(--line)}
.look-services-list .svc li,.look-services-list .svc li:first-child{counter-increment:sv;grid-template-columns:5rem minmax(0,1fr) minmax(0,1.1fr);gap:.4rem 2rem;padding:2rem 0;align-items:baseline;transition:background .5s cubic-bezier(.32,.72,0,1),padding .5s cubic-bezier(.32,.72,0,1)}
.look-services-list .svc li::before{content:"0" counter(sv);grid-column:1;grid-row:1;font-family:var(--font-display);font-weight:800;font-size:1.4rem;color:var(--accent-text)}
.look-services-list .svc li .i{display:none}
.look-services-list .svc h3{grid-column:2;grid-row:1;font-size:clamp(2rem,4vw,3.2rem);line-height:.95}
.look-services-list .svc p,.look-services-list .svc li:first-child p{grid-column:3;grid-row:1;font-size:1.02rem;max-width:44ch}
.look-services-list .svc li:hover{background:var(--surface);padding-inline:1rem}
@media (max-width:760px){.look-services-list .svc li,.look-services-list .svc li:first-child{grid-template-columns:3rem 1fr}.look-services-list .svc p,.look-services-list .svc li:first-child p{grid-column:2;grid-row:auto}}
.plate-grid figcaption{border-top:2px solid var(--ink);padding-top:.9rem;margin-top:1.1rem}
.plate-grid figcaption b{font-family:var(--font-display);font-weight:800;font-size:1.6rem;text-transform:uppercase;line-height:1}
.plate-grid figcaption span{font-size:.74rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;align-self:center}
.look-process-big .how{background:var(--surface)}
.look-process-big .steps li{border-top:2px solid var(--ink)}
.look-process-big .steps li::before{color:var(--accent);font-size:clamp(4.5rem,9vw,7.5rem)}
.steps h3{font-size:1.9rem;line-height:1}
.look-areas-columns .chips li{font-family:var(--font-display);font-weight:700;font-size:1.7rem;text-transform:uppercase;border-bottom-color:var(--line)}
.look-quote-invert .quote{background:#111316;color:#ecebe7}
.look-quote-invert form{background:none;color:inherit;padding:0;border-radius:0;gap:1.5rem}
.quote label{font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;opacity:.75}
.quote input,.quote textarea{background:transparent;color:inherit;border:0;border-bottom:1px solid color-mix(in srgb,currentColor 35%,transparent);border-radius:0;padding:.8rem 0;font-size:1.05rem}
.quote input:focus,.quote textarea:focus{border-bottom-color:var(--accent)}
.quote .btn-dark{background:var(--accent);color:#111316;justify-self:start}
.quote small{color:inherit;opacity:.7}
.look-quote-invert .direct .i{background:none;color:var(--accent);padding:0}
.direct a{font-family:var(--font-display);font-weight:700;font-size:1.6rem;text-transform:uppercase}
.direct span{font-size:1rem}
${motion("gd", ".svc li,.plate-grid li,.steps li,.chips li,.trust li")}
`),
};

writeFileSync(F, JSON.stringify(themes, null, 2) + "\n");
console.log(Object.keys(themes).length, "themes");
