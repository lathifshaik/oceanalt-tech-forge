# AI concierge setup form

Everything the AI concierge needs to answer a client's phone. `client-success` fills this in with the client on the setup call (about 20 minutes) and saves it as `clients/<slug>/CONCIERGE.md`. `engineer` builds from it, and `qa` runs the test calls. Nothing is charged until the test calls pass and the client is happy (3-month minimum after that; call time at cost, our estimate about 15 to 20 cents a minute).

## 1. The business

| Field | Example |
|---|---|
| Business name (as said on the phone) | Kerr & Sons Electrical |
| Owner's first name (who the concierge works for) | Jim |
| What you do, in one sentence | Residential and small commercial electrical, Newcastle and Lake Macquarie |
| Licence or registration numbers callers ask about | NSW Contractor Licence 274113C |
| Website | |
| Business address (needed for an Australian number) | |

## 2. The phone

| Field | Options |
|---|---|
| Number | Keep yours and divert to the concierge, or a new local number from us |
| When it answers | Every call / only calls you miss / after hours / weekends |
| Rings before it picks up (if diverting) | e.g. 4 rings |
| Voice | Female or male Australian voice |
| Opening line | "G'day, you're through to [business]. I'm [owner]'s AI agent, and this call is recorded. How can I help?" (the AI and recording notice can't be removed) |

## 3. What it can talk about

| Field | Notes |
|---|---|
| Services you offer | One line each |
| Services you don't offer (and who to suggest) | So it says no politely |
| Prices or price ranges it may quote | Or "never quote, offer a call back" |
| Call-out fee, minimums, deposits | |
| Service area: suburbs or postcodes | And what to say outside it |
| Opening hours, and public holidays | |
| Payment options | Card, Apple Pay, Google Pay, Afterpay, invoice terms |
| The 10 questions callers ask most, with your answers | Parking, warranty, how long a job takes… |

## 4. Bookings

| Field | Notes |
|---|---|
| Calendar | Google Calendar or Outlook; which calendar |
| Can it book straight in, or only request a time you confirm? | |
| Job types and how long each takes | e.g. quote visit 30 min, power point 1 h |
| Booking windows | e.g. 2-hour windows, 7am to 4pm weekdays |
| Notice needed / latest same-day booking | |
| Details to collect | Name, mobile, address, job, photos by text, access notes |
| Deposits | If yes, Stripe link sent by SMS |

## 5. Urgent calls and people

| Field | Notes |
|---|---|
| What counts as urgent | e.g. no power, sparking, burning smell |
| What it does with urgent calls | Put through to your mobile / text you straight away / book first available |
| Your mobile for transfers, and when you can be reached | |
| Callers who must always reach a person | Existing clients, builders, suppliers |
| If a caller asks for a person | Take a message and promise a call back within X / transfer |
| Safety line | For anything dangerous it says only: "If there's smoke or flames, or anyone's hurt, hang up and call triple zero." It never gives technical, medical or legal advice. |

## 6. After each call

| Field | Options |
|---|---|
| Where the summary goes | WhatsApp / SMS / email (one or more) |
| Who gets it | Owner, office, both |
| What's in it | Caller, number, address, job, time booked, urgency, link to the transcript |
| Daily round-up | Optional, e.g. 6pm |

## 7. Rules and limits

| Field | Notes |
|---|---|
| Things it must never say or promise | e.g. exact prices for big jobs, finish dates |
| Competitors or topics to avoid | |
| Monthly call-time cap | e.g. $40; at the cap, calls go to voicemail or your mobile |
| Recording and transcript retention | Kept 90 days unless you want longer |
| Privacy | Transcripts are processed by our voice and phone providers (overseas); we list them in writing |

## 8. Before it goes live: 10 test calls (`qa`)

1. A straightforward booking.
2. A price question.
3. An urgent job (checks transfer or alert, and the safety line).
4. A caller outside the service area.
5. A service you don't offer.
6. A caller who wants a person.
7. A wrong number or sales call.
8. A caller who's upset.
9. A booking outside hours or on a full day.
10. The owner rings it themselves and is happy.

Each call: the summary arrives where it should, the details are right, and the opening line has the AI and recording notice. All 10 pass, the client signs off, then the first charge.
