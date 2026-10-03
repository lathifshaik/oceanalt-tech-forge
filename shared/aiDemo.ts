// The AI agent demo on the Oceanalt site: four scenarios, each with a sample
// business, the facts the agent may use, suggested prompts, and a scripted
// answer for when the live API (api/demo.ts) isn't configured. Shared by the
// page (src/components/AiDemo.tsx) and the API, so both use the same facts.
// The businesses are the fictional samples from templates/*/example.json.

export const STEPS = {
  read_info: { label: "Read the business info", icon: "file" },
  check_hours: { label: "Checked opening hours", icon: "clock" },
  check_calendar: { label: "Checked the calendar", icon: "calendar" },
  hold_booking: { label: "Held the booking slot", icon: "check-circle" },
  draft_reply: { label: "Drafted the reply", icon: "pencil" },
  look_up_quote: { label: "Looked up the quote", icon: "file" },
  schedule_followup: { label: "Scheduled the follow-up", icon: "send" },
  save_for_approval: { label: "Saved for the owner to approve", icon: "eye" },
  notify_owner: { label: "Let the owner know", icon: "mail" },
} as const;
export type StepId = keyof typeof STEPS;

export type Step = { step: StepId; detail: string };
export type Scripted = { reply: string; steps: Step[] };

export type Scenario = {
  id: "answer" | "book" | "review" | "quote";
  tab: string;
  icon: string;
  pitch: string;
  business: { name: string; initials: string; kind: string };
  /** What the customer (or the owner) sees first in the phone. */
  opener: { from: "customer" | "owner" | "system"; text: string };
  /** Facts the live agent may use, and nothing else. */
  facts: string;
  /** Suggested prompts, each with a scripted answer for the offline demo. */
  prompts: { text: string; scripted: Scripted }[];
  /** Whether visitors can type their own message when the live API is on. */
  freeText: boolean;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "answer",
    tab: "Answer customers",
    icon: "chat",
    pitch: "Answers questions on your site day and night, from your real menu, prices and hours.",
    business: { name: "Little Tern Coffee", initials: "LT", kind: "Café, Fremantle" },
    opener: { from: "system", text: "Hi! I'm the Little Tern assistant. Ask me anything about the café." },
    facts: `Little Tern Coffee, 31 Tern Lane, Fremantle WA. Phone (08) 5550 1427.
Hours: Mon to Thu 6:30am to 2pm, Fri 6:30am to 3pm, Sat 7am to 3pm, Sun 7am to 1pm.
Coffee: espresso or long black $4.50, flat white/latte/cappuccino $5.20 (large +$0.80), batch brew $5.00, iced latte $6.50.
Food: ham, cheese and mustard toastie $12, mushroom and miso toastie (vegetarian) $13, granola with poached pear $15, almond croissant $7.
Oat, soy and almond milk at no extra cost. Gluten-free bread available. Dogs welcome on the deck. No table bookings: walk-ins only.`,
    prompts: [
      {
        text: "Do you have gluten-free options?",
        scripted: {
          reply: "We do! Any toastie can be made on gluten-free bread, and the granola with poached pear is a good pick too. Just tell us about any allergies when you order.",
          steps: [
            { step: "read_info", detail: "menu and dietary notes" },
            { step: "draft_reply", detail: "gluten-free options" },
          ],
        },
      },
      {
        text: "Can I bring my dog?",
        scripted: {
          reply: "Absolutely, dogs are welcome on the deck. We'll even bring a water bowl out.",
          steps: [
            { step: "read_info", detail: "house rules" },
            { step: "draft_reply", detail: "dogs on the deck" },
          ],
        },
      },
      {
        text: "Can I book a table for 8 on Saturday?",
        scripted: {
          reply: "We don't take bookings, it's walk-ins only. For a group of 8 on Saturday, coming before 9am is your best bet. I've let the team know you might be coming in.",
          steps: [
            { step: "read_info", detail: "booking policy" },
            { step: "check_hours", detail: "Saturday, 7am to 3pm" },
            { step: "notify_owner", detail: "group of 8, Saturday" },
            { step: "draft_reply", detail: "walk-ins only, suggest early" },
          ],
        },
      },
    ],
    freeText: true,
  },
  {
    id: "book",
    tab: "Take bookings",
    icon: "calendar",
    pitch: "Finds a time that works, holds the slot and sends the details, without a phone call.",
    business: { name: "Tidewater Physio", initials: "TP", kind: "Physio & Pilates, Bulimba" },
    opener: { from: "system", text: "Hi, I can help you book a session. What are you after?" },
    facts: `Tidewater Physio & Pilates, 2/48 Oxford Street, Bulimba QLD. Phone (07) 5550 3812.
Hours: Mon to Thu 7am to 7pm, Fri 7am to 4pm, Sat 8am to 12pm, closed Sunday.
Initial physio consultation 60 min $120. Follow-up 30 min $95. Sports massage 45 min $105.
Clinical Pilates: 1:1 assessment 60 min $110 (required before classes), small group class 55 min $45 (max 4).
HICAPS on site. No referral needed. Free cancellation with 24 hours' notice.
Sample free slots this week: Thu 2:30pm and 4pm with Ana; Fri 8am with Jess; Sat 9am with Ravi.
You can hold a slot and send details; the clinic confirms by SMS.`,
    prompts: [
      {
        text: "I'd like an initial consult Thursday afternoon",
        scripted: {
          reply: "Thursday works: Ana has 2:30pm or 4pm for a 60-minute initial consultation ($120, and you can claim on your health fund with HICAPS). I've held 2:30pm for you. Want me to keep that one?",
          steps: [
            { step: "check_calendar", detail: "Thursday afternoon" },
            { step: "hold_booking", detail: "Thu 2:30pm, initial consult, Ana" },
            { step: "draft_reply", detail: "offer 2:30pm or 4pm" },
          ],
        },
      },
      {
        text: "Do I need a referral?",
        scripted: {
          reply: "No referral needed, you can book directly. If you have a GP care plan, bring it along and we'll claim with Medicare.",
          steps: [
            { step: "read_info", detail: "referral policy" },
            { step: "draft_reply", detail: "no referral needed" },
          ],
        },
      },
    ],
    freeText: true,
  },
  {
    id: "review",
    tab: "Reply to reviews",
    icon: "quote",
    pitch: "Drafts a thoughtful reply to every Google review, for you to approve with one tap.",
    business: { name: "Kerr & Sons Electrical", initials: "KS", kind: "Electrician, Newcastle" },
    opener: { from: "customer", text: "3-star Google review: \"Good work on the switchboard but the electrician was 40 minutes late and didn't call ahead.\" Sam R." },
    facts: `Kerr & Sons Electrical, family-run electricians in Newcastle and Lake Macquarie. Owner: Jim Kerr.
Promises: fixed price agreed before work starts, 12-month workmanship guarantee, same-day service for most calls before 1pm.
Policy: if running late, the team is meant to text the customer. Phone 0491 570 156.
Write replies as the owner, warm and specific, owning any mistake, never defensive, under 70 words.`,
    prompts: [
      {
        text: "Draft a reply to Sam",
        scripted: {
          reply: "Thanks Sam, glad the new switchboard is sorted. You're right, we should have texted you when we were running late, and I'm sorry we didn't. I've raised it with the team. If anything with the board ever gives you trouble, it's covered by our 12-month guarantee, so just call me directly. Jim",
          steps: [
            { step: "read_info", detail: "review, job notes and policies" },
            { step: "draft_reply", detail: "own the lateness, thank them" },
            { step: "save_for_approval", detail: "Google review reply" },
          ],
        },
      },
    ],
    freeText: false,
  },
  {
    id: "quote",
    tab: "Chase quotes",
    icon: "send",
    pitch: "Follows up quotes that went quiet, politely, at the right time, so jobs don't slip away.",
    business: { name: "Kerr & Sons Electrical", initials: "KS", kind: "Electrician, Newcastle" },
    opener: { from: "system", text: "Quote #1042 for Priya N., $2,380 for an EV charger and switchboard upgrade. Sent 6 days ago. No reply." },
    facts: `Kerr & Sons Electrical, Newcastle. Owner: Jim Kerr. Phone 0491 570 156.
Quote #1042: Priya N., Merewether. EV charger install plus switchboard upgrade, $2,380 including GST, valid 30 days, sent 6 days ago, opened twice, no reply.
Next available install dates: Tue 14th, Thu 16th. Write a short, friendly SMS follow-up from Jim (under 50 words, no pressure).`,
    prompts: [
      {
        text: "Write the follow-up",
        scripted: {
          reply: "Hi Priya, Jim from Kerr & Sons here. Just checking you got the quote for the EV charger and switchboard. Happy to answer any questions. We've got Tue 14th or Thu 16th free if you'd like to lock it in. Cheers, Jim",
          steps: [
            { step: "look_up_quote", detail: "#1042, opened twice, no reply" },
            { step: "check_calendar", detail: "next free install dates" },
            { step: "draft_reply", detail: "friendly SMS, no pressure" },
            { step: "schedule_followup", detail: "send tomorrow 9am" },
            { step: "save_for_approval", detail: "SMS to Priya" },
          ],
        },
      },
    ],
    freeText: false,
  },
];
