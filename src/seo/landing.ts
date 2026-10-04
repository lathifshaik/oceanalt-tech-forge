// Service pages, one per search intent ("websites for tradies", "pay monthly
// website", ...). scripts/prerender.mjs renders each to /<slug>/index.html at
// build time and adds it to sitemap.xml. Every page must be genuinely useful on
// its own: specific to that kind of business, no invented stats, prices that
// match PLANS in src/App.tsx.

export type Landing = {
  slug: string;
  /** <title>, under 60 characters. */
  title: string;
  /** Meta description, under 155 characters. */
  description: string;
  /** Short name for links and breadcrumbs. */
  nav: string;
  h1: string;
  intro: string;
  image: { src: string; alt: string };
  /** A sample site to open, from /work/. */
  example?: { path: string; label: string };
  includes: string[];
  sections: { h2: string; body: string[] }[];
  faq: { q: string; a: string }[];
  /** Plan to preselect in the start form. */
  plan: "launch" | "grow" | "care" | "rebuild" | "ai";
};

export const LANDINGS: Landing[] = [
  {
    slug: "website-design-sydney",
    title: "Website Design Sydney for Small Businesses | Oceanalt",
    description: "Sydney website design for small businesses. A custom site, built and looked after for one monthly fee from $99. Nothing upfront, live in 1 to 3 days.",
    nav: "Website design Sydney",
    h1: "Website design for Sydney small businesses",
    intro: "We're a small Sydney studio. We design your website, write the words, build it, host it and keep it up to date, for one monthly fee from $99 with nothing upfront.",
    image: { src: "/previews/tidewater-physio-pilates-forest.webp", alt: "A website we designed for a sample physio and Pilates studio" },
    example: { path: "tidewater-physio-pilates-forest", label: "a sample physio and Pilates studio" },
    includes: [
      "A design made for your business, never reused for anyone else",
      "We write the words after a 15-minute call",
      "Your domain, hosting and SSL, set up and paid for",
      "Google Business Profile set up and linked",
      "Online bookings or payments on the Grow plan",
      "Changes by email, usually done within two business days",
    ],
    sections: [
      { h2: "Local, and quick", body: [
        "We're based in Sydney (NSW 2037) and work with businesses across the city, from the Inner West to Parramatta and the Shire, and anywhere else in Australia.",
        "Most sites are live 1 to 3 business days after the first call, because we start from our own library of layouts and components and tailor them, rather than starting from a blank page.",
      ] },
      { h2: "What it costs", body: [
        "Launch is $99 a month for a custom site of up to 5 pages. Grow is $149 a month and adds online payments, bookings, gift vouchers and a rebuild of your current site. Both have a 12-month minimum, and after 12 months the site and its code are yours to keep.",
        "If you'd rather pay once, one-off builds start at $1,499.",
      ] },
    ],
    faq: [
      { q: "Do you meet in person?", a: "Usually a 15-minute phone or video call is all we need. If you're in Sydney and would rather meet, we can." },
      { q: "Do I need to supply photos?", a: "A few of your own photos help most. If you don't have any, we use your Google Business photos or licensed photos that look local." },
      { q: "Will it show up on Google?", a: "Every site is built to be fast and readable by search engines, with your business details marked up for Google. We also set up your Google Business Profile, which matters most for local searches." },
    ],
    plan: "launch",
  },
  {
    slug: "websites-for-tradies",
    title: "Websites for Tradies, from $99 a Month | Oceanalt",
    description: "Websites for electricians, plumbers, builders and other trades. Tap-to-call, quote forms and your licence up front. From $99 a month, nothing upfront.",
    nav: "Tradies",
    h1: "Websites for tradies that make the phone ring",
    intro: "Electricians, plumbers, builders, landscapers, cleaners. Your website has one job: get people to call or ask for a quote. We build it around that, and look after it for one monthly fee.",
    image: { src: "/previews/kerr-and-sons-electrical.webp", alt: "A website we designed for a sample electrician" },
    example: { path: "kerr-and-sons-electrical", label: "a sample electrician's site" },
    includes: [
      "Tap-to-call buttons on every screen, made for phones",
      "A quote form that lands in your inbox or phone",
      "Your licence number, insurance and service areas up front",
      "A page for each main service, so people find you for the job they need",
      "Your Google reviews linked from the site",
      "Photos of your work, updated whenever you send new ones",
    ],
    sections: [
      { h2: "Built for people searching on their phone", body: [
        "Most people looking for a tradie are on a phone, often in a hurry. The site loads fast, puts your number where their thumb is, and says clearly which suburbs you cover.",
        "Each main service gets its own section with plain-English detail, which also helps you show up when someone searches for that job in their area.",
      ] },
      { h2: "No time spent on it", body: [
        "You give us 15 minutes on the phone. We write the words, sort the domain and set up your Google Business Profile. When something changes, like prices, areas or a new service, text or email us and we update it.",
      ] },
    ],
    faq: [
      { q: "Can customers book or pay a deposit online?", a: "Yes, on the Grow plan ($149 a month). Payments go straight into your own Stripe account." },
      { q: "I already have a Facebook page. Do I need a website?", a: "A Facebook page is a good start, but many people search Google first and want a site with your services, areas and a way to get a quote. We link the two together." },
      { q: "What if I want to leave?", a: "After 12 months you can cancel any time and keep the site, the code and your domain." },
    ],
    plan: "launch",
  },
  {
    slug: "websites-for-cafes-restaurants",
    title: "Websites for Cafés and Restaurants | Oceanalt",
    description: "Café and restaurant websites with your menu, hours and directions first, plus online ordering if you want it. From $99 a month, nothing upfront.",
    nav: "Cafés and restaurants",
    h1: "Websites for cafés and restaurants",
    intro: "People want three things from a café or restaurant website: the menu, the hours and how to get there. We put those first, make it look like your place, and keep it current for you.",
    image: { src: "/previews/little-tern-coffee.webp", alt: "A website we designed for a sample café" },
    example: { path: "little-tern-coffee", label: "a sample café" },
    includes: [
      "Your menu as real text, easy to read and easy for us to update",
      "Opening hours, with an open or closed sign that follows them",
      "Directions, parking and a map link",
      "Table bookings or online ordering on the Grow plan",
      "Gift vouchers you can sell online",
      "Your photos, styled to match the place",
    ],
    sections: [
      { h2: "A menu that's always right", body: [
        "Menus change. Email or text us the new prices or specials and we update the site, usually within two business days. Launch includes 30 minutes of changes a month; Grow includes an hour.",
      ] },
      { h2: "Made to look like your place", body: [
        "Your site gets its own colours, type and layout, chosen from your fit-out, your signage and your food. We never give the same design to two businesses.",
      ] },
    ],
    faq: [
      { q: "Can people order or book online?", a: "Yes, on the Grow plan. We can connect a booking tool or set up simple online ordering, with payments going straight to your own Stripe account." },
      { q: "Can you add an assistant that answers questions?", a: "Yes. Our AI assistant answers questions about your menu, hours and dietary options day and night, for $39 a month plus AI usage at cost." },
      { q: "How fast can it be live?", a: "Usually 1 to 3 business days after a 15-minute call, once we have your menu, hours and a few photos." },
    ],
    plan: "launch",
  },
  {
    slug: "websites-for-clinics-salons",
    title: "Websites for Clinics, Salons and Studios | Oceanalt",
    description: "Websites for physios, salons, Pilates studios and clinics, with online bookings, prices and gift vouchers. From $149 a month with bookings, nothing upfront.",
    nav: "Clinics, salons and studios",
    h1: "Websites for clinics, salons and studios",
    intro: "If your business runs on appointments, your website should take them. Every treatment gets a price and a Book button, and gift vouchers sell themselves.",
    image: { src: "/previews/tidewater-physio-pilates.webp", alt: "A website we designed for a sample physio and Pilates studio" },
    example: { path: "tidewater-physio-pilates", label: "a sample physio and Pilates studio" },
    includes: [
      "Online bookings connected to the booking tool you already use",
      "Every service with its price and length",
      "Gift vouchers sold online, paid into your own Stripe account",
      "Practitioner profiles with photos",
      "Health fund, HICAPS and referral details where they apply",
      "Opening hours and how to find you",
    ],
    sections: [
      { h2: "Fewer phone calls, fuller days", body: [
        "When people can see prices and book in a few taps, they don't need to call during a session. Bookings and vouchers come with the Grow plan at $149 a month.",
      ] },
      { h2: "Already using a booking system?", body: [
        "We connect the one you have rather than make you switch, and design the site around it so the booking step doesn't feel bolted on.",
      ] },
    ],
    faq: [
      { q: "Which booking systems do you work with?", a: "Most of the common ones used by clinics and salons can be linked or embedded. Tell us which you use on the call and we'll confirm." },
      { q: "Can an assistant handle booking questions?", a: "Yes. Our AI assistant can answer questions, suggest times and hold a slot for you to confirm, for $39 a month plus AI usage at cost." },
      { q: "Can you rebuild my current site?", a: "Yes. A rebuild of your existing site is included in Grow, and we keep your pages' addresses so you keep your Google rankings." },
    ],
    plan: "grow",
  },
  {
    slug: "websites-for-shops",
    title: "Websites for Shops with Online Ordering | Oceanalt",
    description: "Websites for florists, makers and local shops, with online ordering and payments straight to your Stripe. From $149 a month, nothing upfront.",
    nav: "Shops and online ordering",
    h1: "Websites for shops that sell online",
    intro: "Florists, makers, bakers, boutiques. Every product gets its own Buy button, payments land in your own Stripe account, and delivery details are clear before checkout.",
    image: { src: "/previews/wattle-and-fern-florist.webp", alt: "A website we designed for a sample florist" },
    example: { path: "wattle-and-fern-florist", label: "a sample florist" },
    includes: [
      "Products with photos, prices and a Buy button",
      "Payments straight into your own Stripe account",
      "Delivery areas, cut-off times and pickup options",
      "Gift vouchers",
      "Product updates by email whenever your range changes",
      "A small shop that's simple to run, not a full e-commerce system",
    ],
    sections: [
      { h2: "Simple selling, not a big platform", body: [
        "Most local shops don't need a full e-commerce system with apps and themes. A clear catalogue with Buy buttons, delivery details and secure payments covers it, and we keep it updated for you.",
      ] },
      { h2: "Your money, your account", body: [
        "Customer payments go straight into your own Stripe account. We never hold your money or see card details.",
      ] },
    ],
    faq: [
      { q: "How many products can I have?", a: "The Grow plan suits a focused range of products. For a large catalogue we'll quote a custom build first." },
      { q: "Can you move my shop from Shopify, Wix or Square?", a: "Yes. We rebuild it, move your products and set up redirects so links and search rankings carry over." },
      { q: "What does it cost?", a: "Grow is $149 a month with a 12-month minimum and nothing upfront. Stripe charges its standard card fees on each sale." },
    ],
    plan: "grow",
  },
  {
    slug: "websites-for-professional-services",
    title: "Websites for Accountants, Lawyers and Advisers | Oceanalt",
    description: "Websites for accountants, lawyers, real estate and consultants. Clear services, fixed fees and the team up front. From $99 a month, nothing upfront.",
    nav: "Professional services",
    h1: "Websites for accountants, lawyers and advisers",
    intro: "People choosing an accountant, lawyer or adviser want to know three things: what you do, roughly what it costs, and who they'll deal with. Your site should answer all three in under a minute.",
    image: { src: "/previews/harlow-reid-lawyers.webp", alt: "A website we designed for a sample law firm" },
    example: { path: "harlow-reid-lawyers", label: "a sample law firm" },
    includes: [
      "Each service explained in plain English",
      "Fixed fees or starting prices, if you want to show them",
      "Team profiles with photos and qualifications",
      "An enquiry or booking form that lands in your inbox",
      "Your business card on the site, saveable to a phone",
      "Privacy policy and the details your industry body asks for",
    ],
    sections: [
      { h2: "Trust first", body: [
        "A calm, readable design, real photos of the team, and the details that show you're the real thing: registration numbers, memberships and where you are.",
      ] },
      { h2: "Kept current without your time", body: [
        "New team members, new services, changed fees. Email us and it's done, usually within two business days.",
      ] },
    ],
    faq: [
      { q: "Can clients book a first meeting online?", a: "Yes. We can link your calendar or booking tool; online booking and payments come with the Grow plan." },
      { q: "Can you write about our services?", a: "Yes. We write the words after a 15-minute call, and you approve everything before it goes live." },
      { q: "Do we own the site?", a: "Your domain is registered in your name from day one, and after 12 months the site and its code are yours to keep." },
    ],
    plan: "launch",
  },
  {
    slug: "pay-monthly-websites",
    title: "Pay Monthly Websites in Australia, $0 Upfront | Oceanalt",
    description: "Pay monthly websites for Australian small businesses: a custom site from $99 a month, nothing upfront, no hostage terms. Keep the site after 12 months.",
    nav: "Pay monthly websites",
    h1: "Pay monthly websites, with nothing upfront",
    intro: "A custom website for your business for one monthly fee, with design, writing, hosting and changes included. And none of the catches pay-monthly websites are known for.",
    image: { src: "/previews/kerr-and-sons-electrical-ink.webp", alt: "A website we designed for a sample electrician" },
    example: { path: "kerr-and-sons-electrical-ink", label: "a sample electrician's site" },
    includes: [
      "Care, $29 a month: hosting and upkeep for a site you already like",
      "Launch, $99 a month: a custom site up to 5 pages",
      "Grow, $149 a month: payments, bookings, vouchers and a rebuild",
      "Nothing upfront on any plan",
      "You see the site before the first charge",
      "Your domain is registered in your name",
    ],
    sections: [
      { h2: "No hostage websites", body: [
        "Some pay-monthly providers keep your domain or make leaving expensive. We put the opposite in writing: the domain is yours from day one, and after 12 months the site and its code are yours to keep, free.",
        "If you leave in the first year, it costs the rest of that year or a $1,499 buyout, whichever is less, and the site is still yours.",
      ] },
      { h2: "Why monthly works", body: [
        "There's no big bill to start, and the site doesn't go stale, because changes are part of the plan. Launch includes 30 minutes of changes a month; Grow includes an hour.",
      ] },
    ],
    faq: [
      { q: "Is there a contract?", a: "Launch and Grow have a 12-month minimum, then run month to month with 30 days' notice. Care is month to month from the start." },
      { q: "What happens after 12 months?", a: "The site and its code become yours. Stay with us, move to Care for $29 a month, or take it anywhere." },
      { q: "Would a one-off payment be cheaper?", a: "One-off builds start at $1,499. Monthly suits most small businesses because changes and hosting are included and there's nothing to pay upfront." },
    ],
    plan: "launch",
  },
  {
    slug: "website-rebuild",
    title: "Website Rebuild: Move from Wix, WordPress or Squarespace | Oceanalt",
    description: "We rebuild slow Wix, WordPress, Squarespace and Shopify sites: faster, cleaner, with payments, keeping your Google rankings. Included in Grow at $149 a month.",
    nav: "Website rebuild",
    h1: "Rebuild your website, and keep your Google rankings",
    intro: "A slow Wix site, a WordPress install nobody updates, a Squarespace theme you've outgrown. We rebuild it faster and cleaner, connect payments, and move everything across without losing your search rankings.",
    image: { src: "/previews/wattle-and-fern-florist-forest.webp", alt: "A website we designed for a sample florist" },
    example: { path: "wattle-and-fern-florist-forest", label: "a sample florist" },
    includes: [
      "A new design made for your business",
      "Your existing pages, words and images moved across",
      "Redirects from every old address, so links and rankings carry over",
      "Online payments or bookings connected",
      "The switch done with no downtime, on the same domain and email",
      "Included in the Grow plan, $149 a month",
    ],
    sections: [
      { h2: "How the move works", body: [
        "Send us your current address and tell us what works and what doesn't. Within a day you get a preview of the new version, built from your existing content.",
        "Once you're happy, we move every page, set up redirects from the old addresses, and switch the domain over. Your email keeps working, and your old host can be cancelled.",
      ] },
      { h2: "Keeping your rankings", body: [
        "Rankings belong to your page addresses and content. We keep your best pages, redirect the rest to their closest match, and submit the new sitemap to Google so nothing gets lost in the move.",
      ] },
    ],
    faq: [
      { q: "Will my email stop working?", a: "No. We only change where the website points; your email settings stay as they are." },
      { q: "Can you move my online shop too?", a: "Yes, for a focused range of products. Larger catalogues get a fixed quote first." },
      { q: "How long does a rebuild take?", a: "Usually 1 to 3 business days after we have access, plus time for you to check the preview." },
    ],
    plan: "rebuild",
  },
  {
    slug: "ai-assistant-for-small-business",
    title: "AI Assistant for Small Business Websites | Oceanalt",
    description: "An AI assistant on your website that answers customers, takes booking requests and replies to enquiries day and night. $39 a month plus usage at cost.",
    nav: "AI assistant",
    h1: "An AI assistant for your small business",
    intro: "It answers customer questions on your website day and night, from your real prices, hours and policies, and hands anything it isn't sure about to you.",
    image: { src: "/ai/cafe.webp", alt: "A café after closing, its sign still lit" },
    includes: [
      "Answers questions from your real menu, prices, hours and FAQs",
      "Replies to new enquiries within minutes, even at night",
      "Suggests booking times and holds a slot for you to confirm",
      "Drafts replies to Google reviews for you to approve",
      "Follows up quotes that went quiet, at a time you choose",
      "Hands anything unusual to you, with the conversation attached",
    ],
    sections: [
      { h2: "What it costs", body: [
        "$39 a month on any plan, plus AI usage billed at cost with no markup, usually $5 to $30 a month for a small business. You set a monthly cap, so there's no surprise bill.",
        "Custom agents, for things like invoice chasing or lead sorting, are quoted per job.",
      ] },
      { h2: "You stay in charge", body: [
        "The assistant only uses the information you give it. Anything that matters, like a booking, a review reply or a quote follow-up, waits for your approval if you want it to.",
        "It's the same kind of assistant that answers enquiries on our own site.",
      ] },
    ],
    faq: [
      { q: "Will it make things up?", a: "It's set up to answer only from your information and to say it will check with you when something isn't covered." },
      { q: "Do I need a website from you to use it?", a: "It's easiest on a site we build, but we can add it to most existing sites." },
      { q: "Can I try it?", a: "Yes. The demo on our home page shows the assistant answering for sample businesses." },
    ],
    plan: "ai",
  },
];
