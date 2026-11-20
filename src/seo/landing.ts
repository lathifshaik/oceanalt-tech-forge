// Service pages for the studio: one per service an established brand might
// search for. scripts/prerender.mjs renders each to /<slug>/index.html at build
// time and adds it to sitemap.xml. No prices (founder's call, 17 Nov 2026):
// every project is quoted after a call. No invented stats, testimonials or
// ranking promises. Old small-business slugs redirect here (public/_redirects).

export type Landing = {
  slug: string;
  /** <title>, about 60 characters or fewer. */
  title: string;
  /** Meta description, about 155 characters or fewer. */
  description: string;
  /** Short name for links and breadcrumbs. */
  nav: string;
  /** SERVICES id in src/studio/content.ts: the photo and icon. */
  service: "brand" | "websites" | "software" | "automation" | "ai" | "voice" | "payments" | "search" | "care";
  h1: string;
  intro: string;
  offers: { title: string; body: string }[];
  approach: { h2: string; body: string[] };
  /** Sample designs to show (paths in WORK, src/App.tsx). */
  examples?: string[];
  faq: { q: string; a: string }[];
};

const QUOTED = {
  q: "How is it priced?",
  a: "Every project starts with a free first call, about 30 minutes with Lathif. Within 3 business days you get a written proposal with a fixed scope and a fixed price, so you know the number before anything starts. We don't publish a price list because no two briefs are the same, and a “from” figure would mislead more people than it helped.",
};

export const LANDINGS: Landing[] = [
  {
    slug: "brand-identity",
    title: "Brand Identity Design for Established Brands | Oceanalt",
    description: "Logo, type, colour and a brand system your team can actually use, from the website to signage. Designed in Sydney for established Australian brands.",
    nav: "Brand identity",
    service: "brand",
    h1: "A brand your whole team can use properly",
    intro: "Most established brands don't need a new name. They need the logo, type and colour pulled into one system that works on a phone, in a proposal and on the side of a van, with rules simple enough that people follow them.",
    offers: [
      { title: "An honest audit", body: "We start with every place the brand shows up now and keep what's working. Often a careful refresh is the right call, not a rebuild." },
      { title: "Mark, type and colour", body: "A logo that reads at small sizes, type that works on screen and in print, and colours that pass contrast checks." },
      { title: "Guidelines people read", body: "A short, practical guide with real examples, not a hundred-page PDF nobody opens." },
      { title: "Templates", body: "Decks, social posts, email signatures and signage, set up in the tools your team already uses." },
    ],
    approach: {
      h2: "Designed for the screen first",
      body: [
        "Most people meet your brand on a phone. So we design the identity alongside the website and product screens, and test it there before anything goes to print.",
        "Because the same team builds the website, the brand system goes straight into code: colours, type and spacing are set once and used everywhere.",
      ],
    },
    examples: ["twist-design-studio", "wide-eyes-art-studio", "whirl-gelato"],
    faq: [
      { q: "Do we have to change our logo?", a: "No. If the logo has equity, we usually keep it and tidy it up. If we think a bigger change is worth it, we'll say so plainly, and why." },
      { q: "Who owns the files?", a: "You do, once the final invoice is paid: the source files, the guidelines and the templates. Where a typeface needs a licence, it's bought in your name." },
      QUOTED,
    ],
  },
  {
    slug: "website-design-sydney",
    title: "Website Design and Build for Established Brands | Oceanalt",
    description: "Custom websites designed and built by one Sydney studio: strategy, copy, design and a fast build on Cloudflare, for established Australian brands.",
    nav: "Websites",
    service: "websites",
    h1: "Websites built around what your customers came to do",
    intro: "We find out what people are trying to do when they land on your site, then design the shortest way to get them there. Strategy, words, design and build happen in one studio, so nothing gets lost between agencies.",
    offers: [
      { title: "Strategy and structure", body: "What the site is for, who it's for and what they need to find, worked out before anything is drawn." },
      { title: "Copy", body: "Words written for your customers in your voice, working from what you have or starting fresh." },
      { title: "Design", body: "A design made for your brand and never reused. You see it on a private link as it comes together." },
      { title: "Build", body: "Fast, accessible pages on Cloudflare, with the parts that change often set up for your team to edit." },
    ],
    approach: {
      h2: "Fast, accessible and yours",
      body: [
        "Pages are built to load quickly on an ordinary phone connection and to meet the WCAG accessibility guidelines, because both decide who can actually use the site.",
        "The code, design and content are yours once the final invoice is paid, and your domain stays registered in your name.",
      ],
    },
    examples: ["harlow-reid-lawyers", "small-spaces-architects", "ridgeline-wines"],
    faq: [
      { q: "Can our team edit the site?", a: "Yes. We set up editing for the parts that change often, such as news, team, products or locations, and show your team how it works." },
      { q: "Can you work with our marketing team?", a: "Yes. We can work from your team's brief and brand, or take on the whole project. Either way you have one person to call." },
      { q: "How long does a website take?", a: "The timeline comes with the quote and is set around your launch date. Larger sites go live in stages, so you see working pages early." },
      QUOTED,
    ],
  },
  {
    slug: "website-rebuild",
    title: "Website Rebuilds Without Losing Search Traffic | Oceanalt",
    description: "Rebuild or redesign an established website: every old address mapped and redirected, content moved carefully, and DNS switched only after testing.",
    nav: "Website rebuilds",
    service: "websites",
    h1: "Rebuild the site without losing what it's earned",
    intro: "An established site has years of links, search history and content behind it. We rebuild it carefully: every page accounted for, every old address redirected, and nothing switched over until it's been tested.",
    offers: [
      { title: "A full inventory", body: "We crawl the current site and list every indexed page and file, so nothing is forgotten in the move." },
      { title: "A redirect map", body: "Each old address is mapped to its new home with a permanent redirect, and checked before and after launch." },
      { title: "Careful content moves", body: "Content comes across as it is unless we've agreed to rewrite it, with images, titles and structured data kept." },
      { title: "A quiet cutover", body: "Your domain and email stay where they are. DNS changes only after testing passes, at a time that suits you." },
    ],
    approach: {
      h2: "No promises about rankings, just careful work",
      body: [
        "Nobody can promise a rebuild won't move your search rankings, and you should be wary of anyone who does. What we can do is remove the usual causes of a drop: missing pages, broken redirects, lost titles and slower pages.",
        "We watch the search data for several weeks after launch and fix anything that turns up.",
      ],
    },
    examples: ["tally-and-co", "gable-and-co", "brightwater-dental"],
    faq: [
      { q: "Will our email be affected?", a: "No. We don't touch your email (MX) records. Only the records for the website change, and only after testing." },
      { q: "Can you keep our current design?", a: "Yes. Some clients want the same look on faster, cleaner code; others want a redesign at the same time. Both are rebuilds." },
      QUOTED,
    ],
  },
  {
    slug: "web-apps-and-software",
    title: "Web Apps and Custom Software, Australia | Oceanalt",
    description: "Customer portals, dashboards, booking and quoting tools built around how your business runs, connected to Xero, Stripe and your CRM. Data kept in Australia.",
    nav: "Web apps and software",
    service: "software",
    h1: "Software shaped around how your business runs",
    intro: "When work moves through spreadsheets, inboxes and copy-paste, small delays add up. We design and build the tools that take that admin out: portals, dashboards, booking and quoting systems, and the connections between the apps you already pay for.",
    offers: [
      { title: "Customer and staff portals", body: "One place for customers to see orders, bookings or documents, and for staff to manage them." },
      { title: "Dashboards", body: "The numbers you check every week, pulled from the systems they live in, without the export and paste." },
      { title: "Booking, quoting and job tools", body: "From the first enquiry to the paid invoice, with each step recorded once." },
      { title: "Integrations", body: "Connections to Xero, MYOB, Stripe, Shopify, your CRM and calendars, so nothing is typed twice." },
    ],
    approach: {
      h2: "Start with the step that costs the most",
      body: [
        "We map how the work moves now and find the step that costs the most time. That usually becomes the first release, so you're using working software early, with the rest planned in stages.",
        "Apps run on Cloudflare and AWS, with your customers' data stored in Australia, in Sydney. Where a tool needs an overseas provider, we list it in writing before you go live.",
      ],
    },
    faq: [
      { q: "Do you build mobile apps?", a: "We build web apps that work well on phones and can be added to the home screen. If you need an app in the App Store or Google Play, we'll talk through whether it's worth it for you." },
      { q: "Can you work with our existing systems?", a: "Usually. If a system has an API we can connect to it. If it doesn't, we'll tell you on the first call what the options are." },
      { q: "Who owns the code?", a: "You do, once the final invoice is paid. It's documented so your own team, or another one, could take it over." },
      QUOTED,
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation for Australian Businesses | Oceanalt",
    description: "We map how work moves through your business, from first enquiry to paid invoice, then connect your apps and AI agents so the busywork runs on its own.",
    nav: "Workflow automation",
    service: "automation",
    h1: "Automate the way your business runs",
    intro: "Most admin is people copying the same details from one app to the next: an enquiry into the CRM, a quote into a spreadsheet, an invoice into Xero. We map how a job moves through your business and connect the steps, so the work moves on its own and your team spends the time on customers.",
    offers: [
      { title: "A map of how work moves now", body: "One call to walk through a job from first enquiry to paid invoice, and a written map of where the time and the double entry go." },
      { title: "Your apps, connected", body: "Email, calendar, CRM, Stripe, Xero or MYOB talking to each other, so a detail typed once turns up everywhere it's needed." },
      { title: "AI agents for the in-between work", body: "Reading enquiries, drafting quotes, chasing invoices and sorting documents, with a person approving where it matters." },
      { title: "Watched after launch", body: "Every automation is logged and monitored. If something fails, we know before it costs you a customer." },
    ],
    approach: {
      h2: "Start with one workflow",
      body: [
        "We pick the job that costs the most time each week, automate that first and show you the result. Then the next one. No big-bang system replacement.",
        "Customer data we store for you stays in Australia, and every outside service an automation uses is listed in writing before it goes live.",
      ],
    },
    faq: [
      { q: "Do we have to change our software?", a: "Usually not. We connect what you already use where it has a way in. If something truly can't be connected, we'll say so on the first call and explain the options." },
      { q: "What if an automation gets something wrong?", a: "You decide which steps run on their own and which wait for a person to approve. Everything is logged, so it's easy to see what happened and fix it." },
      QUOTED,
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents for Phone, Chat and Admin | Oceanalt",
    description: "AI agents that answer calls, reply to enquiries and handle follow-up, working from your own information, with a clear hand-off to your team.",
    nav: "AI agents",
    service: "ai",
    h1: "Agents that do the follow-up, and know when to hand over",
    intro: "A lot of a team's day goes on the same questions, the same replies and the same follow-ups. We build AI agents that take that on, working from your own information, and pass anything unusual to a person.",
    offers: [
      { title: "Phone agents", body: "Answer the calls you can't take, book or take a message, and send your team a summary. Every call opens by saying it's an AI agent and that the call is recorded." },
      { title: "Website and email agents", body: "Reply to enquiries with accurate answers from your own content, and collect what your team needs to follow up." },
      { title: "Admin agents", body: "Draft quotes, chase unpaid invoices, reply to reviews or sort incoming documents, with a person approving where it matters." },
      { title: "A clear hand-off", body: "You decide what an agent can do on its own and what goes to a person, and it says so when it isn't sure." },
    ],
    approach: {
      h2: "Tested before it talks to a customer",
      body: [
        "Each agent is tested against real situations from your business before it goes live, and we keep checking its work after launch.",
        "We use AI providers that don't train on your data and list every one in writing. Customer records we store for you stay in Australia.",
      ],
    },
    faq: [
      { q: "Will customers know they're talking to AI?", a: "Yes. Our agents always say they're an AI agent, and phone calls open with a recording notice. That can't be switched off." },
      { q: "Will it answer every call?", a: "It answers the calls you send to it, at the times you choose. Like any phone system it relies on networks and providers, so we set up a fallback, such as voicemail or your own number." },
      { q: "What does it cost to run?", a: "Agents have a running cost for AI usage and, for phone agents, call time. We estimate it in the written quote, pass it on at cost and agree a monthly cap with you." },
      QUOTED,
    ],
  },
  {
    slug: "voice-agents-and-audio",
    title: "Voice Agents and Custom Audio for Brands | Oceanalt",
    description: "Phone and voice agents in your brand's own voice, plus voiceovers, sonic logos and on-hold audio. Designed and built in Sydney for Australian brands.",
    nav: "Voice agents and audio",
    service: "voice",
    h1: "Your brand, with a voice of its own",
    intro: "More of your customers now hear your brand before they see it: on the phone, in a voice assistant, in a video. We build voice agents that answer and book in a voice made for you, and the audio that goes around them.",
    offers: [
      { title: "Voice agents", body: "Answer calls, book, take messages and pass anything tricky to your team, with a summary after every call. Every call opens by saying it's an AI agent and that the call is recorded." },
      { title: "A custom voice", body: "Pick from licensed Australian voices or create one for the brand, with clear rights to use it commercially." },
      { title: "Voiceovers", body: "Narration for videos, explainers and ads, written and produced to match the brand." },
      { title: "Sonic branding", body: "A short audio logo, on-hold sound and notification sounds that belong to you." },
    ],
    approach: {
      h2: "Natural, honest and tested",
      body: [
        "A voice agent is tested on real calls from your business before it answers a customer, and checked after launch. It always says it's an AI agent, and a person is one step away.",
        "We only use voices licensed for commercial use, and we list every provider that hears a call in writing before you go live.",
      ],
    },
    faq: [
      { q: "Can it sound like a real person from our team?", a: "Only with that person's written consent, and it still says it's an AI agent on every call. Most brands choose a licensed voice that suits them instead." },
      { q: "What does it cost to run?", a: "Voice agents have running costs for AI usage and call time. We estimate them in the written quote, pass them on at cost and agree a monthly cap with you." },
      QUOTED,
    ],
  },
  {
    slug: "payments",
    title: "Payments and a Free Website for Your Brand | Oceanalt",
    description: "Take payments through our gateway and your website is designed, built and hosted at no charge. We take a small platform fee per payment instead.",
    nav: "Payments",
    service: "payments",
    h1: "A free website, paid for by what you sell",
    intro: "Take payments through our gateway and there's no bill for the website. We design, build and host it, and take a small platform fee on each payment instead. If nothing sells, you pay us nothing.",
    offers: [
      { title: "Checkout built in", body: "Cards, Apple Pay and Google Pay on your own site, for orders, deposits, bookings or invoices." },
      { title: "Paid into your own account", body: "Money goes straight to your business through the payment provider. We never hold your funds." },
      { title: "A clear fee, in writing", body: "One platform fee per payment, on top of the provider's processing fee, set out in your agreement before anything starts." },
      { title: "One dashboard", body: "Every payment, refund and fee is visible in your own payments dashboard, so there are no surprises." },
    ],
    approach: {
      h2: "We only do well when you do",
      body: [
        "Most studios send an invoice whether the site sells or not. Here, the site is free and we earn a small share of what goes through it, so our job is to make it sell.",
        "The fee rate, what's included and what happens if you ever move to another provider are all in your written agreement. No hidden charges, and no lock-in on your domain or content.",
      ],
    },
    faq: [
      { q: "What's the platform fee?", a: "A small percentage of each payment through the gateway, on top of the provider's processing fee. We set the rate with you on the first call, based on what you expect to sell, and fix it in your written agreement before work starts. There's no fee when nothing sells." },
      { q: "What if we don't take payments online?", a: "Then the website is quoted as a project, like our other work. The free website is for brands whose customers pay online." },
      { q: "Can we leave?", a: "Yes. Your domain and content are always yours, and the agreement sets out exactly how a move works, including keeping the site." },
    ],
  },
  {
    slug: "search-and-ai-visibility",
    title: "Search and AI Visibility for Australian Brands | Oceanalt",
    description: "Technical SEO, Google Business Profile and clear content that AI answer engines can quote, so Google and AI tools describe your brand correctly.",
    nav: "Search and AI visibility",
    service: "search",
    h1: "Be described correctly, wherever people search",
    intro: "People now ask Google, ChatGPT and other AI tools about a brand before they visit. We make sure what those tools find about you is accurate, consistent and easy to quote, and that your site gives them a clear path to you.",
    offers: [
      { title: "Technical SEO", body: "Site structure, speed, titles, structured data and crawl problems fixed at the source." },
      { title: "Google Business Profile", body: "Locations, hours, categories and photos kept accurate and consistent with your site." },
      { title: "Content AI tools can quote", body: "Clear, factual pages about what you do, where and for whom, written for people and easy for machines to read." },
      { title: "Plain reporting", body: "A short monthly note on what changed, what we found and what we'd do next." },
    ],
    approach: {
      h2: "No ranking promises",
      body: [
        "Nobody controls where Google or an AI tool puts you, and anyone who guarantees a ranking is guessing. What we can control is whether the information about your brand is accurate, consistent and easy to find, and that's where we spend the time.",
      ],
    },
    faq: [
      { q: "Can you guarantee the first page of Google?", a: "No, and be wary of anyone who does. We fix what's in your control and report honestly on what changes." },
      { q: "Do you write the content?", a: "Yes, or we work with your team's writers. Either way it's checked for accuracy against what you actually offer." },
      { q: "Is this a monthly service?", a: "It can be a one-off project or ongoing care agreed in writing. Both are quoted after a first call." },
    ],
  },
];
