/** Mirrors src/eventDescriptionTemplates.ts */

export function fillCity(body, city) {
  const trimmed = city.trim();
  if (!trimmed) {
    return body;
  }
  return body.replaceAll("{{city}}", trimmed);
}

export const EVENT_TEMPLATES = [
  {
    id: "meetup",
    name: "Cursor Meetup",
    tagline: "Evening community meetup - speakers, demos, pizza.",
    body: `Join us for the next Cursor Meetup in {{city}}!

We're bringing together developers, indie hackers, and AI builders who use Cursor to rethink how software gets built. Whether you're deep into AI-assisted coding or just getting started - this is a space to exchange ideas, workflows, and lessons learned from shipping real things.

tl;dr a room full of people who build, not just talk.

What to expect

🍕 Pizza, drinks & warm-up
Kick things off casually - grab a slice, meet other builders, get into the flow.

🎙️ Short talks
Practitioners sharing how they actually use Cursor day-to-day. Practical insights, not theory.
Speakers will be announced soon - want to present? Let us know!

🛠️ Show & tell
Bring your laptop. Demo what you're working on. Get feedback, swap setups, or just watch and learn.

Why come?
• See how others use Cursor in production and side projects
• Exchange workflows, prompts, and tooling tricks
• Meet people who are building real things

🍕 Pizza & drinks provided
📍 {{city}} - venue details coming soon
🤝 Builder-first, low-ego atmosphere
💻 Laptops encouraged

Come to share, come to learn, or just come to build.

See you in {{city}} 👋`,
  },
  {
    id: "cafe",
    name: "Cafe Cursor",
    tagline: "Daytime cafe takeover - co-work, coffee, credits.",
    body: `Join us at Cafe Cursor in {{city}}.

We're taking over a cafe for the day and inviting Cursor users to swing by. Bring your laptop and spend a few hours building alongside other developers - or just pop in for coffee and a chat.

💻 Comfortable co-working space
☕ Coffee on us
💳 Cursor credits for those who come to build
🤝 Casual networking with developers and builders

Members of the Cursor team will be around through the day - ask questions, share what you're working on, or just say hi.

We have limited seats, so when you sign up please pick the slot that works for you:

9:30–13:00 - morning co-working block
13:00–16:00 - afternoon co-working block
Drop-in - just stopping by for coffee and a quick hello

See you soon!`,
  },
  {
    id: "hackathon",
    name: "Cursor Hackathon",
    tagline: "Build sprint - any length, teams, prizes, sponsors.",
    body: `Cursor Hackathon - {{city}}

Ready to turn an idea into a working product?

Join us for a hackathon in {{city}} where developers, designers, and builders come together to prototype, ship, and present real projects - all built with Cursor.

This isn't just a competition. It's an opportunity to push your limits, collaborate with talented people, and walk away with something you can actually use.

What to expect
- Focused building time on your own AI-powered project
- A community of developers and makers who take shipping seriously
- The chance to build your MVP using Cursor as your main tool
- Prizes, recognition, and real feedback from judges and peers

Teams of 1–5 are welcome. Solo builders too. Bring your idea and your laptop - we'll handle the rest.

🍕 Food & drinks provided
💳 Cursor credits for all participants
🎟️ Limited spots - if your plans change, update your RSVP so someone from the waitlist can join

If you've been sitting on an idea, this is your excuse to finally build it.

See you in {{city}} 🚀`,
  },
  {
    id: "workshop",
    name: "Cursor Workshop",
    tagline: "Hands-on session - learn workflows, build together.",
    body: `Cursor Workshop - {{city}}

A hands-on session for developers who want to go deeper with Cursor.

Whether you've been using it for months or just installed it last week - bring your laptop, bring a task you're working on, and let's build together. We'll walk through real workflows, share tricks that actually save time, and answer questions live.

What we'll cover
• How people are using Cursor agents, rules, and context in real projects
• Live walkthrough of setups that work (and ones that don't)
• Open build time - work on your own stuff with help from the room
• Q&A with experienced Cursor users

This isn't a lecture. It's a working session. You'll leave with better prompts, a cleaner setup, and a few new ideas to try on Monday.

📍 {{city}} - venue details on signup
💻 Bring your laptop and something to work on
☕ Coffee and snacks provided

Spots are limited - save yours and come ready to build.`,
  },
  {
    id: "demo-night",
    name: "Demo Night",
    tagline: "Show what you built - short demos, audience feedback.",
    body: `Cursor Demo Night - {{city}}

Built something with Cursor? Come show it off.

We're hosting a demo night in {{city}} - a casual evening where builders get 5 minutes on stage to show what they've been working on. No slides required, just your screen and your story.

It doesn't have to be finished. It doesn't have to be polished. If you built it and you're proud of it (or learned something from it) - that's enough.

How it works
• Sign up to demo when you register (or just come to watch)
• Each demo is ~5 minutes + a few questions from the crowd
• Audience votes on favorites at the end

Whether you shipped a side project, automated your workflow, or built something weird and wonderful with agents - we want to see it.

🍕 Food & drinks
📍 {{city}} - venue on signup
🏆 Crowd favorites get Cursor credits and merch

Come to present, come to get inspired, or come for the pizza. All good.

See you there 👋`,
  },
];

export function getEventTemplateById(id) {
  return EVENT_TEMPLATES.find((t) => t.id === id);
}
