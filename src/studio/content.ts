// Words for the studio site (homepage, /design and the service pages).
// Oceanalt is a design and technology studio for established Australian brands.
// No prices anywhere on the site (founder's call, 17 Nov 2026): every project is
// quoted after a call. The website is free when payments go through our gateway;
// we take a platform fee per payment, with the rate in the written agreement,
// never on the site. No invented stats, testimonials, client logos or scarcity.

import type { IconName } from "../components/Icon";

export type Service = {
  id: string;
  name: string;
  line: string;
  icon: IconName;
  photo: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: "brand",
    name: "Brand identity",
    line: "A name, a mark and a system your team can actually use, from the website to the side of a van.",
    icon: "sparkle",
    photo: "/photos/brand.webp",
    points: ["Logo, type and colour system", "Brand guidelines your team can follow", "Templates for decks, socials and signage"],
  },
  {
    id: "websites",
    name: "Websites",
    line: "Fast, custom sites designed around what your customers came to do, written and built in-house.",
    icon: "layout",
    photo: "/photos/websites.webp",
    points: ["Strategy, copy and design", "Built for speed on Cloudflare", "Content your team can edit"],
  },
  {
    id: "software",
    name: "Web apps and software",
    line: "Portals, dashboards, booking and quoting tools that take the admin out of the way the business runs.",
    icon: "bolt",
    photo: "/photos/software.webp",
    points: ["Customer and staff portals", "Integrations with Xero, Stripe and your CRM", "Data stored in Australia"],
  },
  {
    id: "ai",
    name: "AI agents",
    line: "Agents that answer the phone, reply to enquiries and do the follow-up, with a person checking the edge cases.",
    icon: "chat",
    photo: "/photos/ai.webp",
    points: ["Phone and website agents", "Trained on your own information", "Clear hand-off to your team"],
  },
  {
    id: "voice",
    name: "Voice agents and audio",
    line: "Phone and voice agents in your brand's own voice, plus custom audio: voiceovers, sonic logos and on-hold sound.",
    icon: "phone",
    photo: "/photos/voice.webp",
    points: ["Voice agents that answer and book", "A custom voice for your brand", "Voiceovers and sonic branding"],
  },
  {
    id: "payments",
    name: "Payments",
    line: "A payment gateway built into your site, paying straight into your own account. It's how the website can be free.",
    icon: "card",
    photo: "/photos/payments.webp",
    points: ["Cards, Apple Pay and Google Pay", "Paid into your own account", "A small platform fee per payment, in writing"],
  },
  {
    id: "search",
    name: "Search and AI visibility",
    line: "Making sure Google and the AI answer engines describe you correctly, and send people to you.",
    icon: "globe",
    photo: "/photos/search.webp",
    points: ["Technical SEO and site structure", "Google Business Profile", "Content AI tools can quote"],
  },
  {
    id: "care",
    name: "Care and improvement",
    line: "After launch we stay on: hosting, security, changes and a short list of improvements each month.",
    icon: "care",
    photo: "/photos/care.webp",
    points: ["Hosting, backups and monitoring", "Changes handled by the people who built it", "Monthly report in plain English"],
  },
];

export const WHY = [
  { icon: "pencil" as IconName, title: "Designed and built by one team", body: "The person who designs your site is the person who builds it. No handover, nothing lost in translation." },
  { icon: "shield-check" as IconName, title: "Your data stays in Australia", body: "Sites and apps run on Cloudflare and AWS, with customer data stored in Sydney." },
  { icon: "file" as IconName, title: "You own all of it", body: "Code, designs and domain are yours. No lock-in, no hostage fees, no surprises in the contract." },
];

export const STEPS = [
  { icon: "chat" as IconName, title: "A first call about the business" },
  { icon: "compass" as IconName, title: "A written scope and a fixed quote" },
  { icon: "pencil" as IconName, title: "Design, shown to you as we go" },
  { icon: "layout" as IconName, title: "Build, on a private preview link" },
  { icon: "bolt" as IconName, title: "Launch, once you've signed it off" },
  { icon: "chart" as IconName, title: "Look after it and keep improving" },
];

export const STUDIO_FAQ: { q: string; a: string }[] = [
  {
    q: "What does Oceanalt actually do?",
    a: "We design and build what a brand runs on online: the identity, the website, the web apps and software behind it, and AI agents that handle the repetitive work. One studio does all of it, so nothing falls between two agencies.",
  },
  {
    q: "What does a project cost?",
    a: "Every project is quoted in writing after a first call, with a fixed scope, so you know the number before anything starts. We don't publish prices because no two briefs are the same.",
  },
  {
    q: "Is the website really free?",
    a: "Yes, if your customers pay you online through our payment gateway. We design, build and host the site at no charge, and take a small platform fee on each payment instead. The fee is set out in writing before anything starts, and payments go straight into your own account.",
  },
  {
    q: "How does the platform fee work?",
    a: "It's a small percentage of each payment taken through the gateway, on top of the card network's standard processing fee. There's no fee when nothing sells. The exact rate is in your written agreement, and every payment and fee shows in your own payments dashboard.",
  },
  {
    q: "What are voice agents?",
    a: "Agents that answer your phone or speak on your site in a natural voice, can be your brand's own custom voice, and book, answer questions and pass anything tricky to your team. Every call opens by saying it's an AI agent and that the call is recorded.",
  },
  {
    q: "Who will we deal with?",
    a: "Lathif Shaik, from the first call to launch and after. He designs the work, signs off every page and answers the phone. You won't be passed to an account manager.",
  },
  {
    q: "How long does it take?",
    a: "The timeline comes with the quote, set around your launch date. Larger builds are split into stages so you see working pieces early, not one big reveal at the end.",
  },
  {
    q: "Can you work with our existing brand or team?",
    a: "Yes. We can take an existing identity and build on it, work alongside your marketing team or in-house developers, and hand over clean code and documentation if your team will run it.",
  },
  {
    q: "Do we own the work?",
    a: "Yes. The code, designs and content are yours once the final invoice is paid, and your domain is registered in your name from day one.",
  },
  {
    q: "Where is our data kept?",
    a: "Sites and apps run on Cloudflare and AWS, and your customers' details, bookings and files are stored in Australia, in Sydney. Where a tool needs an overseas provider, such as some AI services, we list it in writing before you go live.",
  },
  {
    q: "What happens after launch?",
    a: "Most clients keep us on to host, look after and improve what we built. The terms are agreed in writing with the project, and you can take the work elsewhere at any time.",
  },
];

export const NEEDS: Record<string, string> = {
  unsure: "Not sure yet",
  brand: "Brand identity",
  website: "A new website",
  rebuild: "Rebuild our current website",
  software: "A web app or software",
  payments: "A free website with payments",
  ai: "AI agents",
  voice: "Voice agents or custom audio",
  care: "Look after an existing site",
};

// Licensed photos (Unsplash licence: free for commercial use, no permission
// needed). Credits in public/photos/CREDITS.md.
export const PHOTOS = {
  hero: ["/photos/strip-1.webp", "/photos/strip-2.webp", "/photos/strip-3.webp"],
  founder: "/team/lathif.webp",
};
