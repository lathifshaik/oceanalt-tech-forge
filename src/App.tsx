import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./components/Icon";
import { StudioFooter, StudioHome, StudioNav } from "./studio/Studio";

// ─── Content ─────────────────────────────────────────────────────────────────
// Oceanalt is a design and technology studio for established Australian brands
// (founder's call, 17 Nov 2026). No prices anywhere on the site: every project
// is quoted in writing after a call. The Terms below must match how projects
// are actually run (docs/business/). The studio's words live in
// src/studio/content.ts.

export const EMAIL = "hello@oceanalt.com.au";
export const ABN = "65 119 854 062";
export const PHONE = "0431 236 999";
export const FOUNDER = "Lathif Shaik";
export const PHONE_HREF = "tel:+61431236999";

type TemplateId = "cafe" | "trades" | "studio" | "shop" | "pro";

// Each example business shown in three of its designs. Paths match the
// showcase list in templates/<template>/meta.json (built by `npm run templates`).
export const WORK: {
  id: TemplateId;
  kind: string;
  group?: "food" | "trades" | "health" | "fitness" | "shops" | "pro" | "learning" | "pets"; // the Designs page filter, if not the layout's
  added: string; // when the sample went on the site (YYYY-MM-DD); the designs page shows newest first
  business: string;
  owner?: { face: string };
  problem: string;
  pitch: string;
  designs: { path: string; theme: string }[];
}[] = [
  {
    id: "cafe",
    kind: "Café",
    added: "2026-10-02",
    business: "Little Tern Coffee, Fremantle",
    owner: { face: "tern" },
    problem: "People kept ringing to ask if they were open yet.",
    pitch: "Menu, hours and directions first. The sign on the photo flips to OPEN or CLOSED from the real opening hours.",
    designs: [
      { path: "little-tern-coffee", theme: "Harbour" },
      { path: "little-tern-coffee-night", theme: "Night" },
      { path: "little-tern-coffee-sun", theme: "Sun" },
    ],
  },
  {
    id: "trades",
    kind: "Electrician",
    added: "2026-10-02",
    business: "Kerr & Sons Electrical, Newcastle",
    problem: "Jobs went to whoever picked up first, and Jim's usually up a ladder.",
    pitch: "Built to make the phone ring: tap-to-call everywhere, the licence front and centre, and a quote form.",
    designs: [
      { path: "kerr-and-sons-electrical", theme: "Coast" },
      { path: "kerr-and-sons-electrical-ink", theme: "Ink" },
      { path: "kerr-and-sons-electrical-sun", theme: "Sun" },
    ],
  },
  {
    id: "studio",
    kind: "Physio & Pilates",
    added: "2026-10-02",
    business: "Tidewater Physio & Pilates, Bulimba",
    owner: { face: "tide" },
    problem: "Bookings came in by phone and text, and gift vouchers lived on paper.",
    pitch: "Every treatment has a price and a Book button. Gift vouchers can be bought online, with the terms in plain view.",
    designs: [
      { path: "tidewater-physio-pilates", theme: "Calm" },
      { path: "tidewater-physio-pilates-ink", theme: "Ink" },
      { path: "tidewater-physio-pilates-forest", theme: "Forest" },
    ],
  },
  {
    id: "studio",
    kind: "Yoga studio",
    group: "fitness",
    added: "2026-10-08",
    business: "Saltwater Yoga, Cronulla",
    owner: { face: "ana" },
    problem: "Ana was taking class bookings in Instagram DMs and chasing $25 payments after class.",
    pitch: "Every class has a time, a price and a Book button. People pay with Apple Pay or Google Pay before they've rolled out their mat.",
    designs: [
      { path: "saltwater-yoga", theme: "Sun" },
      { path: "saltwater-yoga-calm", theme: "Calm" },
      { path: "saltwater-yoga-night", theme: "Night" },
    ],
  },
  {
    id: "shop",
    kind: "Florist",
    added: "2026-10-03",
    business: "Wattle & Fern, Hobart",
    owner: { face: "landscaper" },
    problem: "Orders came through Instagram DMs, paid by bank transfer, chased by hand.",
    pitch: "Every bunch has its own Buy button, paid straight into the shop's Stripe. The delivery tag counts down to the same-day cutoff.",
    designs: [
      { path: "wattle-and-fern-florist", theme: "Sun" },
      { path: "wattle-and-fern-florist-forest", theme: "Forest" },
      { path: "wattle-and-fern-florist-ink", theme: "Ink" },
    ],
  },
  {
    id: "pro",
    kind: "Law firm",
    added: "2026-10-03",
    business: "Harlow Reid Lawyers, Parramatta",
    owner: { face: "accountant" },
    problem: "People didn't call because they couldn't tell what anything would cost.",
    pitch: "Fixed fees in plain sight, the team up front, and one tap to save the firm straight to your phone.",
    designs: [
      { path: "harlow-reid-lawyers", theme: "Ink" },
      { path: "harlow-reid-lawyers-calm", theme: "Calm" },
      { path: "harlow-reid-lawyers-night", theme: "Night" },
    ],
  },
  {
    id: "cafe",
    kind: "Bakery",
    added: "2026-10-09",
    business: "Lemon & Rye, Marrickville",
    problem: "Saturday regulars rang to check if the sourdough had sold out yet.",
    pitch: "Bread, pastries and prices up front, today's hours, and a sign that flips to OPEN or CLOSED from the real opening hours.",
    designs: [
      { path: "lemon-and-rye-bakery", theme: "Riso" },
      { path: "lemon-and-rye-bakery-bloom", theme: "Bloom" },
      { path: "lemon-and-rye-bakery-halftone", theme: "Halftone" },
    ],
  },
  {
    id: "pro",
    kind: "Architects",
    added: "2026-10-09",
    business: "Small Spaces Architects, Fitzroy",
    problem: "People liked the work on Instagram but couldn't tell what a project would cost.",
    pitch: "Fixed fees per stage, a feasibility study you can book, and a site visit one tap away.",
    designs: [
      { path: "small-spaces-architects", theme: "Halftone" },
      { path: "small-spaces-architects-riso", theme: "Riso" },
      { path: "small-spaces-architects-autumn", theme: "Autumn" },
    ],
  },
  {
    id: "shop",
    kind: "Plant shop",
    added: "2026-10-09",
    business: "Greenhouse Plant Co, Brunswick",
    problem: "Most sales were walk-ins, and delivery questions came in by DM.",
    pitch: "Plants with a Buy button each, paid into the shop's Stripe, and a same-day delivery cutoff on the tag.",
    designs: [
      { path: "greenhouse-plant-co", theme: "Bloom" },
      { path: "greenhouse-plant-co-autumn", theme: "Autumn" },
      { path: "greenhouse-plant-co-riso", theme: "Riso" },
    ],
  },
  {
    id: "trades",
    kind: "Landscaper",
    added: "2026-10-09",
    business: "Oakleaf Gardens, Blue Mountains",
    problem: "Autumn was flat out, and quote requests got lost in voicemail.",
    pitch: "Services and suburbs clearly listed, the licence up front, and a quote form that goes straight to their inbox.",
    designs: [
      { path: "oakleaf-gardens", theme: "Autumn" },
      { path: "oakleaf-gardens-halftone", theme: "Halftone" },
      { path: "oakleaf-gardens-bloom", theme: "Bloom" },
    ],
  },
  {
    id: "cafe",
    kind: "Vietnamese restaurant",
    added: "2026-10-12",
    business: "Lúa Kitchen, Cabramatta",
    problem: "The lunch queue ran out the door, and takeaway orders came in on one busy phone.",
    pitch: "The menu with prices, a call-ahead button so lunch is ready on arrival, and today's hours with an open or closed sign.",
    designs: [
      { path: "lua-kitchen", theme: "Paddy" },
      { path: "lua-kitchen-orchid", theme: "Orchid" },
      { path: "lua-kitchen-paddy", theme: "Paddy, big name" },
    ],
  },
  {
    id: "cafe",
    kind: "Brunch café",
    added: "2026-10-12",
    business: "Magnolia, Newtown",
    problem: "Weekend groups turned up unannounced, and the menu only lived on Instagram.",
    pitch: "The name big enough to remember, the full menu, a live open or closed sign, and directions one tap away.",
    designs: [
      { path: "magnolia-newtown", theme: "Orchid" },
      { path: "magnolia-newtown-paddy", theme: "Paddy" },
      { path: "magnolia-newtown-orchid", theme: "Orchid, headline" },
    ],
  },
  {
    id: "cafe",
    kind: "Fine dining",
    added: "2026-10-12",
    business: "Saltbush, Norwood",
    problem: "Bookings came in by email and phone, and the menu changed faster than the website.",
    pitch: "The tasting menu up front, a few of this season's courses, and booking details with the deposit spelled out.",
    designs: [
      { path: "saltbush-norwood", theme: "Ember" },
      { path: "saltbush-norwood-umami", theme: "Umami" },
    ],
  },
  {
    id: "cafe",
    kind: "Burger joint",
    added: "2026-10-12",
    business: "Big Bun, Footscray",
    problem: "Monday deals only lived on a chalkboard, and the menu was a photo on Instagram.",
    pitch: "Best sellers with prices, the Monday deal in big type, and the full menu one scroll down.",
    designs: [
      { path: "big-bun-burgers", theme: "Checker" },
      { path: "big-bun-burgers-cantina", theme: "Cantina" },
    ],
  },
  {
    id: "cafe",
    kind: "Pizzeria",
    added: "2026-10-12",
    business: "Nonna Pina, Leichhardt",
    problem: "Groups rang every night to ask if they could fit, and nobody knew about Tuesday's deal.",
    pitch: "The Tuesday special, pizzas with prices, the family story, and a booking panel for groups.",
    designs: [
      { path: "nonna-pina", theme: "Trattoria" },
      { path: "nonna-pina-checker", theme: "Checker" },
    ],
  },
  {
    id: "cafe",
    kind: "Taqueria",
    added: "2026-10-12",
    business: "Calaca, Fortitude Valley",
    problem: "Taco Tuesday was word of mouth, and the menu was a PDF.",
    pitch: "Tacos with prices, Taco Tuesday up top, a photo gallery and the full menu on the page.",
    designs: [
      { path: "calaca-taqueria", theme: "Cantina" },
      { path: "calaca-taqueria-trattoria", theme: "Trattoria" },
    ],
  },
  {
    id: "cafe",
    kind: "Sushi bar",
    added: "2026-10-12",
    business: "Kumo, Chatswood",
    problem: "Twelve omakase seats a night, booked through DMs.",
    pitch: "The chef, the lunch menu with prices, and omakase booking with the price and sittings shown.",
    designs: [
      { path: "kumo-sushi", theme: "Umami" },
      { path: "kumo-sushi-ember", theme: "Ember" },
    ],
  },
  {
    id: "studio",
    kind: "Hair salon",
    added: "2026-10-12",
    business: "Marlo Hair, Paddington",
    problem: "Clients asked for prices by text before every colour.",
    pitch: "Every service priced, a free colour consult, online booking and gift cards.",
    designs: [
      { path: "marlo-hair", theme: "Blush" },
      { path: "marlo-hair-ember", theme: "Ember" },
    ],
  },
  {
    id: "studio",
    kind: "Skin clinic",
    added: "2026-10-12",
    business: "Clearwater Skin, Bondi Junction",
    problem: "New clients didn't know where to start, so they didn't book.",
    pitch: "A free skin consult first, every treatment priced, and booking online.",
    designs: [
      { path: "clearwater-skin", theme: "Sage" },
      { path: "clearwater-skin-ember", theme: "Ember" },
    ],
  },
  {
    id: "shop",
    kind: "Skincare brand",
    added: "2026-10-12",
    business: "Ochre Skin Co, Byron Bay",
    problem: "Sales were at the market stall and by DM, with no way to pay online.",
    pitch: "Four products with a Buy button each, paid into Stripe, and a same-day post cutoff.",
    designs: [
      { path: "ochre-skin-co", theme: "Sage" },
      { path: "ochre-skin-co-blush", theme: "Blush" },
    ],
  },
  {
    id: "studio",
    kind: "Gym",
    group: "fitness",
    added: "2026-10-12",
    business: "Ironbark Strength, Marrickville",
    problem: "New members asked about contracts and prices in DMs before they'd come in.",
    pitch: "Memberships priced, no lock-in said up front, and a free intro session booked online.",
    designs: [
      { path: "ironbark-strength", theme: "Iron" },
      { path: "ironbark-strength-checker", theme: "Checker" },
    ],
  },
  {
    id: "studio",
    kind: "Barber",
    added: "2026-10-12",
    business: "Fade & Co, Northbridge",
    problem: "The phone rang all day with people asking if there was a chair free.",
    pitch: "Every cut priced, online booking with the barber you like, and walk-in rules spelled out.",
    designs: [
      { path: "fade-and-co", theme: "Pomade" },
      { path: "fade-and-co-umami", theme: "Umami" },
    ],
  },
  {
    id: "studio",
    kind: "Dentist",
    added: "2026-10-12",
    business: "Brightwater Dental, Geelong",
    problem: "Patients rang to ask what a check-up costs before booking.",
    pitch: "Fees shown up front, health funds explained, and check-ups booked online.",
    designs: [
      { path: "brightwater-dental", theme: "Mint" },
      { path: "brightwater-dental-harbour", theme: "Harbour" },
    ],
  },
  {
    id: "studio",
    kind: "Tutor",
    group: "learning",
    added: "2026-10-12",
    business: "Chalk & Talk Tutoring, Ryde",
    problem: "Parents found them by word of mouth and asked the same questions every term.",
    pitch: "Lessons priced by year level, a free first lesson, and booking online.",
    designs: [
      { path: "chalk-and-talk", theme: "Chalk" },
      { path: "chalk-and-talk-riso", theme: "Riso" },
    ],
  },
  {
    id: "studio",
    kind: "Vet clinic",
    group: "pets",
    added: "2026-10-12",
    business: "Riverbend Vet, Penrith",
    problem: "Owners rang to ask fees, and the front desk was flat out.",
    pitch: "Fees shown as a guide, same-day appointments booked online, and what to do in an emergency.",
    designs: [
      { path: "riverbend-vet", theme: "Paws" },
      { path: "riverbend-vet-coast", theme: "Coast" },
    ],
  },
  {
    id: "trades",
    kind: "Mechanic",
    added: "2026-10-12",
    business: "Torque Street Auto, Moorabbin",
    problem: "Customers worried about surprise bills and called for prices.",
    pitch: "Services with prices from, a promise to call before extra work, and a booking form.",
    designs: [
      { path: "torque-street-auto", theme: "Garage" },
      { path: "torque-street-auto-night", theme: "Night" },
    ],
  },
  {
    id: "trades",
    kind: "Cleaner",
    added: "2026-10-12",
    business: "Clean Slate Co, Canberra",
    problem: "Quotes took a phone call each, and evenings went on back-and-forth texts.",
    pitch: "Prices by service, suburbs covered, and a quote form that lands in their inbox.",
    designs: [
      { path: "clean-slate-co", theme: "Fresh" },
      { path: "clean-slate-co-calm", theme: "Calm" },
    ],
  },
  {
    id: "pro",
    kind: "Real estate",
    added: "2026-10-12",
    business: "Gable & Co Property, Ballarat",
    problem: "Sellers couldn't find fees anywhere and went to the big agencies.",
    pitch: "Fees in a plain table, the process in three steps, and free appraisals booked online.",
    designs: [
      { path: "gable-and-co", theme: "Terrace" },
      { path: "gable-and-co-forest", theme: "Forest" },
    ],
  },
  {
    id: "pro",
    kind: "Accountant",
    added: "2026-10-12",
    business: "Tally & Co Accountants, Hobart",
    problem: "Tax time meant the same fee questions, fifty times over.",
    pitch: "Fixed fees listed, what to send, and a free first chat booked online.",
    designs: [
      { path: "tally-and-co", theme: "Ledger" },
      { path: "tally-and-co-harbour", theme: "Harbour" },
    ],
  },
  {
    id: "pro",
    kind: "Wedding photographer",
    added: "2026-10-12",
    business: "Golden Hour Weddings, Margaret River",
    problem: "Enquiries came through Instagram with no date or venue.",
    pitch: "Packages and prices, how the day works, and a 'check my date' button.",
    designs: [
      { path: "golden-hour-weddings", theme: "Veil" },
      { path: "golden-hour-weddings-ember", theme: "Ember" },
    ],
  },
  {
    id: "pro",
    kind: "Early learning",
    group: "learning",
    added: "2026-10-12",
    business: "Little Gumnuts, Toowoomba",
    problem: "Families rang to ask about fees, rooms and waitlists.",
    pitch: "Rooms and daily fees, the subsidy explained, and tours booked online.",
    designs: [
      { path: "little-gumnuts", theme: "Crayon" },
      { path: "little-gumnuts-bloom", theme: "Bloom" },
    ],
  },
  {
    id: "cafe",
    kind: "Winery",
    added: "2026-10-12",
    business: "Ridgeline Wines, Clare Valley",
    problem: "Groups turned up unannounced, and the wine list was a PDF.",
    pitch: "This season's wines with prices, cellar door hours, and tastings booked ahead.",
    designs: [
      { path: "ridgeline-wines", theme: "Cellar" },
      { path: "ridgeline-wines-ember", theme: "Ember" },
    ],
  },
  {
    id: "pro",
    kind: "Interior designer",
    added: "2026-10-14",
    business: "Willow & Arch Interiors, Bowral",
    problem: "Clients found her through friends and had no idea what a room would cost.",
    pitch: "Fixed design fees in a plain table, how a project runs, and home visits booked online.",
    designs: [
      { path: "willow-and-arch", theme: "Haven" },
    ],
  },
  {
    id: "studio",
    kind: "Make-up artist",
    added: "2026-10-14",
    business: "Velvet Hour, Surry Hills",
    problem: "Brides asked for prices and dates in DMs, one message at a time.",
    pitch: "Every service priced, trials booked online, and gift cards.",
    designs: [
      { path: "velvet-hour", theme: "Nocturne" },
    ],
  },
  {
    id: "studio",
    kind: "Float and massage",
    added: "2026-10-14",
    business: "Still Water, Fremantle",
    problem: "First-timers rang to ask what floating is before they'd book.",
    pitch: "A plain first-float guide, sessions priced, and booking online.",
    designs: [
      { path: "still-water-float", theme: "Basalt" },
    ],
  },
  {
    id: "studio",
    kind: "Skydiving",
    group: "fitness",
    added: "2026-10-14",
    business: "Freefall Coast, Albion Park",
    problem: "Gift buyers and nervous first-timers called with the same questions.",
    pitch: "Jumps priced, what happens on the day, safety answers, and gift cards.",
    designs: [
      { path: "freefall-coast", theme: "Burst" },
    ],
  },
  {
    id: "cafe",
    kind: "Breakfast café",
    added: "2026-10-14",
    business: "Sunny Side, Brunswick",
    problem: "The menu lived on a chalkboard and a blurry Instagram post.",
    pitch: "Breakfast with prices, opening hours with a live open sign, and directions.",
    designs: [
      { path: "sunny-side-brunswick", theme: "Sunnyside" },
    ],
  },
  {
    id: "studio",
    kind: "Dance studio",
    group: "fitness",
    added: "2026-10-14",
    business: "Leap Dance Studio, Newtown",
    problem: "Beginners didn't know which class to try, so they didn't come.",
    pitch: "A free first class, classes priced, and booking online.",
    designs: [
      { path: "leap-dance-studio", theme: "Pirouette" },
    ],
  },
  {
    id: "studio",
    kind: "Art classes",
    group: "learning",
    added: "2026-10-19",
    business: "Wide Eyes Art Studio, Fitzroy",
    problem: "People wanted to try a class but couldn't tell which one was for beginners.",
    pitch: "Classes for adults and kids with prices up front, booked and paid online.",
    designs: [
      { path: "wide-eyes-art-studio", theme: "Orbit" },
    ],
  },
  {
    id: "pro",
    kind: "Design studio",
    added: "2026-10-19",
    business: "Twist Studio, Collingwood",
    problem: "Their own site looked older than the work they were doing for clients.",
    pitch: "Fixed project fees in plain sight, how a project runs, and one button to start.",
    designs: [
      { path: "twist-design-studio", theme: "Lilac" },
    ],
  },
  {
    id: "cafe",
    kind: "Soft serve and gelato",
    added: "2026-10-19",
    business: "Whirl, Brunswick East",
    problem: "New flavours sold out before anyone online knew they existed.",
    pitch: "This season's flavours up top, the Thursday deal, and the full menu with prices.",
    designs: [
      { path: "whirl-gelato", theme: "Swirl" },
    ],
  },
  {
    id: "shop",
    kind: "Growers' market",
    added: "2026-10-19",
    business: "Hillside Orchard Market, Bilpin",
    problem: "Saturday boxes were ordered by text and written in a notebook.",
    pitch: "This week's boxes to order and pay online by Thursday, ready for Saturday pickup.",
    designs: [
      { path: "hillside-orchard-market", theme: "Orchard" },
    ],
  },
  {
    id: "pro",
    kind: "Property developer",
    added: "2026-11-17",
    business: "Fenwick Hale, Northcote",
    problem: "A new project launch needed registrations before the display suite opened, not a brochure PDF.",
    pitch: "The homes, prices and who's building it, then a register-interest form that asks which home you want.",
    designs: [
      { path: "fenwick-hale", theme: "Plinth" },
    ],
  },
  {
    id: "studio",
    kind: "Boutique hotel group",
    group: "food",
    added: "2026-11-17",
    business: "Corella Hotels, Surry Hills",
    problem: "Three hotels, three booking engines, and most guests booking through someone else's site.",
    pitch: "All three hotels on one page, every room with its rate and a Book button, and gift vouchers sold online.",
    designs: [
      { path: "corella-hotels", theme: "Foyer" },
    ],
  },
  {
    id: "studio",
    kind: "Day surgery group",
    added: "2026-11-17",
    business: "Calloway Day Surgery, Chatswood",
    problem: "Patients rang four centres with the same questions about fasting, fees and getting home.",
    pitch: "Procedures with typical stay times, the specialists, all four centres, and admission started online.",
    designs: [
      { path: "calloway-day-surgery", theme: "Lucent" },
    ],
  },
  {
    id: "pro",
    kind: "Private wealth firm",
    added: "2026-11-17",
    business: "Calder & Ames, Sydney",
    problem: "The site said nothing a client couldn't get from any other adviser.",
    pitch: "The advisers by name, how fees work in plain words, short insights, and one button to book a first meeting.",
    designs: [
      { path: "calder-and-ames", theme: "Claret" },
    ],
  },
  {
    id: "shop",
    kind: "Homewares label",
    added: "2026-11-17",
    business: "Tallowwood, Paddington",
    problem: "The stores looked like the brand. The website looked like a marketplace listing.",
    pitch: "This season's pieces with each maker named, bought online, and all three stores in one place.",
    designs: [
      { path: "tallowwood-home", theme: "Kiln" },
    ],
  },
  {
    id: "trades",
    kind: "Commercial builder",
    group: "pro",
    added: "2026-11-17",
    business: "Torrens & Pike, North Sydney",
    problem: "Tender panels and graduates both judged the firm on a site built for a much smaller builder.",
    pitch: "Sectors, selected projects, how a job is delivered, accreditations up front, and a project enquiry form.",
    designs: [
      { path: "torrens-and-pike", theme: "Girder" },
    ],
  },
];


// ─── Pieces ─────────────────────────────────────────────────────────────────

// Two waves drawn past the edges of the circle and clipped to it. Each path
// repeats every 16 units, so sliding it 16 units left loops seamlessly.
const WAVE = (y: number, amp: number) => `M-16 ${y}q4 ${-amp} 8 0` + " t8 0".repeat(7);

// The waves roll for a few loops after load, then settle: motion that runs
// forever next to content is distracting. Hovering the logo sets them rolling
// again, faster. Uses the Web Animations API so a finished animation can be
// replayed, and speed changes don't make the waves jump.
const ROLL = [{ transform: "translateX(0)" }, { transform: "translateX(-16px)" }];

export function LogoMark({ className = "", rolling = false }: { className?: string; rolling?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const anims = useRef<Animation[]>([]);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    anims.current = [...svg.querySelectorAll<SVGPathElement>(".wave")].map((w, i) =>
      w.animate(ROLL, { duration: i === 0 ? 3200 : 4600, iterations: i === 0 ? 4 : 3, easing: "linear" }),
    );
    return () => anims.current.forEach((a) => a.cancel());
  }, []);
  useEffect(() => {
    anims.current.forEach((a) => {
      a.updatePlaybackRate(rolling ? 2.5 : 1);
      if (rolling && a.playState === "finished") a.play();
    });
  }, [rolling]);
  return (
    <svg ref={ref} className={`mark ${className}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <defs>
        <clipPath id="mark-clip"><circle cx="16" cy="16" r="12" /></clipPath>
      </defs>
      <circle cx="16" cy="16" r="13" />
      <g clipPath="url(#mark-clip)">
        <path className="wave" d={WAVE(16.5, 2.6)} />
        <path className="wave" d={WAVE(21.5, 2)} opacity=".5" />
      </g>
    </svg>
  );
}

// ─── Legal ──────────────────────────────────────────────────────────────────

function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="legal" id="main">
      <div className="wrap">
        <a className="back" href="#top"><Icon name="arrow-right" /> Back to home</a>
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  );
}

function Terms() {
  return (
    <Legal title="Terms of service">
      <p>These terms are between you and Oceanalt (ABN {ABN}), based in Sydney and Melbourne, Australia. They apply to every project, alongside the written proposal for that project. Where the proposal and these terms differ, the proposal wins.</p>
      <h2>1. Services</h2>
      <p>Oceanalt designs and builds brand identities, websites, web apps and software, AI agents and search work, and looks after them after launch. Every project is scoped and quoted in writing before any work starts. Work outside the agreed scope is quoted separately and only goes ahead once you've approved it in writing.</p>
      <h2>2. Quotes and payment</h2>
      <p>Each written proposal sets out the scope, the price, the timeline and the payment schedule, usually a deposit before work starts and the balance in milestones as agreed. Invoices are payable within the time stated on them. Running costs that belong to the client, such as domains, third-party software, AI usage and call time, are listed in the proposal and passed on at cost unless the proposal says otherwise.</p>
      <h2>3. Timelines and approvals</h2>
      <p>Timelines in the proposal depend on us receiving the content, access and feedback we ask for. Nothing goes live until you've approved it. Steps run by third parties, such as domain transfers, app store reviews and payment provider checks, may take longer and are outside our control.</p>
      <h2>4. Ownership</h2>
      <p>You own your content, brand assets and data from the start. Your domain is registered in your name. Once the final invoice for a project is paid, the designs, code and other work we made for you under that project are yours. We may keep general know-how and reusable tools we built before or outside your project, and you get a licence to use any of them included in your work. Third-party software, fonts and services stay under their own licences, bought in your name where needed.</p>
      <h2>5. Care after launch</h2>
      <p>Hosting, maintenance, support and ongoing improvements are provided under a separate care agreement, made in writing, that sets out what's included, the price, the notice period and how changes are requested. You can take your site, code and data elsewhere at any time, and we'll help with the handover.</p>
      <h2>6. Payments to the client</h2>
      <p>Where a site or app takes payments, they are processed by a payment provider such as Stripe into the client's own account. Oceanalt does not hold client funds or handle card data.</p>
      <p>Where a client takes payments through Oceanalt's payment gateway, the website can be designed, built and hosted at no charge. In return, Oceanalt receives a platform fee on each payment processed through the gateway, in addition to the payment provider's own processing fees. The platform fee rate, what the free website includes, and what happens if the client stops using the gateway are set out in the client's written agreement before work starts. Every payment and fee is shown in the client's own payments dashboard.</p>
      <h2>7. AI agents</h2>
      <p>AI agents we build always tell people they are an AI agent. Phone agents open every call by saying so and that the call is recorded, and this can't be switched off. The client provides the information an agent answers from and is responsible for keeping it accurate. We agree with the client, in writing, what an agent may do on its own and what is passed to a person, and which providers it uses.</p>
      <h2>8. Confidentiality and data</h2>
      <p>We keep your business information confidential and use it only to deliver your project. Customer data we store for you is kept in Australia unless we've told you in writing that a particular service processes it overseas.</p>
      <h2>9. Ending a project</h2>
      <p>Either party may end a project by written notice. You pay for work done up to that point, and you receive the work you've paid for.</p>
      <h2>10. Limitation of liability</h2>
      <p>Nothing in these terms excludes rights you have under the Australian Consumer Law. To the extent the law allows, Oceanalt is not liable for indirect or consequential loss, including lost profits or data, and our total liability for a project is limited to the amount paid to us for that project.</p>
    </Legal>
  );
}

function Privacy() {
  return (
    <Legal title="Privacy policy">
      <h2>1. Contact</h2>
      <p>Oceanalt (ABN {ABN}) is based in Sydney and Melbourne, Australia. For privacy enquiries, email {EMAIL}.</p>
      <h2>2. What is collected</h2>
      <p>When you send the start form, we collect your name, company, email, and optionally your phone number, current website and message. No tracking pixels or third-party analytics are used by default.</p>
      <h2>3. Where it is stored</h2>
      <p>This website is hosted on Cloudflare. When you send the start form, your message may be sent to Anthropic's Claude API to prepare the first acknowledgement, and emails are delivered by Resend. If that isn't available, submissions are stored in Google Firestore and sent to the Oceanalt inbox via EmailJS. Some of these providers are overseas, mainly in the United States. They process the data on our behalf and don't use it to train models.</p>
      <p>For our clients: their websites and apps are hosted on Cloudflare and AWS, and their customers' data (form submissions, bookings, files and databases) is stored in Australia, in AWS's Sydney region. AI agents we build may send conversation or call content to AI and telephony providers that are overseas; we tell each client which providers are used, and only use providers that don't train on their data.</p>
      <h2>4. How it is used</h2>
      <p>Submissions are used to reply to you and to scope your project. Data is not sold, shared with third parties for marketing, or used to train any model. Deletion requests are honoured.</p>
      <h2>5. Your rights under the Privacy Act 1988</h2>
      <p>You may request access to, correction of, or deletion of the information we hold about you by emailing {EMAIL}.</p>
    </Legal>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

function useRoute() {
  const read = () => (typeof window !== "undefined" && window.location.hash.startsWith("#/") ? window.location.hash.slice(2) : "");
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => {
      const next = read();
      setRoute(next);
      if (next) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

export default function App() {
  const route = useRoute();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div id="top" />
      <StudioNav />
      {route === "terms" ? <Terms /> : route === "privacy" ? <Privacy /> : <StudioHome />}
      <StudioFooter />
    </>
  );
}
