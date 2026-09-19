import type { ReactNode } from "react";

type Rule = {
  title: string;
  body: ReactNode;
  email?: boolean;
  sun?: boolean;
};

const colleagueRules: Rule[] = [
  {
    title: "Request for context.",
    body: (
      <>
        At the start of something I&apos;ll spend as long as it takes to get a shared context.{" "}
        <span className="font-semibold">I will ask a lot of questions</span>, and they will probably
        be very dumb, but honestly I just don&apos;t care. There are no dumb questions at the start,
        only expensive ones later.
      </>
    ),
  },
  {
    title: "Request for direct contribution.",
    body: "Use this when you want my hands on the thing. Say what the deliverable is, when it's due, and what done looks like. If I can't commit I'll say so early. Don't implicitly delegate: a task doesn't become mine because it was mentioned near me. Be direct.",
  },
  {
    title: "Cold request.",
    body: "Ask me anything. I usually respond. Just tell me who you are, what you want, and where I fit. Most of the people I build with were strangers first.",
    email: true,
  },
  {
    title: "Disagree with me.",
    body: "Out loud, with an argument. Agreeing to keep the peace is the fastest way to lose my respect.",
  },
  {
    title: "I'll tell you when the work is bad.",
    body: "Please tell me when mine is. Eviscerate the work, never the person, and never take it personally. It's a human duty to put the best thing we can out there. I'm a work in progress like everyone, so help me along and I'll do the same for you.",
  },
  {
    title: "I don't really like meetings.",
    body: "Most could have been a message, a doc, or a decision someone was already allowed to make alone. If it's going on the calendar, make sure it needs to be. When it does, I'm all in for as long as the problem takes.",
  },
  {
    title: "Ask whether it should exist before you optimize it.",
    body: "My biggest mistakes were building things that should not have existed. I'll do it again, so build in a way that stays easy to cut. Please find flaws in my work and in your own, especially the things that should not exist at all. Cutting is a habit of great thinkers.",
  },
  {
    title: "Use AI to draft and challenge, never to skip understanding.",
    body: "If you can't defend the output without the tool, you don't own it. Beyond that I love these tools and we'll probably be working inside them together. I'll keep showing you how I use mine. Show me yours.",
  },
  {
    title: 'There is only one "most important" thing at a time.',
    body: 'By definition, "most" is singular. If everything is a priority, then nothing is. Always know what it is and be honest when it changes.',
  },
];

const friendRules: Rule[] = [
  {
    title: "Talk to me about something you give a shit about.",
    body: "Some things I care about are consciousness, artificial intelligence, music (Kanye West is my favourite artist :)), and human history. It could be something I don't know anything about, which I'd love to learn about even more. I don't know why it's become uncool to give a shit, but I really just love talking with people that do.",
    sun: true,
  },
  {
    title: "Being ambitious is good.",
    body: "I value career goals and personal ones. Tell me what yours are, and I'll try my best to help you get there. However, I'll be shameless about asking you for help too.",
  },
  {
    title: "Teach me something.",
    body: "Something you know well that I don't. A cool way you use AI, or anything else. I'll just love to talk to you.",
  },
  {
    title: "Just be direct.",
    body: "I'm quite stupid when it comes to relationships, and I don't understand this idea of subtle cues. If something's wrong, or you need something, or I did something, you have to tell me. Don't expect me to pick it up otherwise.",
  },
  {
    title: "I'm really direct at times and I don't hold back my thoughts.",
    body: "If it comes off as rude or arrogant, that is not my intention.",
  },
  {
    title: "You don't need a reason.",
    body: "No agenda, no ask, no point to get to.",
  },
  {
    title: "If I go quiet it means nothing.",
    body: "I'm bad at replying when I'm deep in something. Text me again. Being annoying is always allowed.",
  },
  {
    title: "Say the hard thing.",
    body: "Attack the work and never the person was always really a rule about friendship. Tell me I'm making a mistake.",
  },
  {
    title: "The no-meetings rule is inverted here.",
    body: "I will clear out time for you.",
  },
  {
    title: "I don't like superficial relationships.",
    body: "If I care about you, I really care about you.",
  },
];

function AudienceHeading({ label, note }: { label: string; note?: string }) {
  return (
    <div className="mt-12 border-t border-[var(--line)] pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <p className="font-ui text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
        {label}
        {note ? <span className="text-[var(--muted)]"> &middot; {note}</span> : null}
      </p>
    </div>
  );
}

export default function PragApi() {
  return (
    <div className="text-[1.05rem] leading-8">
      <p>
        This is to specify how to interact with my consciousness so it costs you as little friction
        as possible.
      </p>

      <AudienceHeading label="For colleagues" note="work, projects, anyone who wants to work with me" />

      <p className="mt-5">
        I really care about what I do, and if I work with you, I expect the same.
      </p>

      <ol className="mt-5 space-y-5">
        {colleagueRules.map((rule, index) => (
          <li key={rule.title}>
            <span className="font-semibold">
              {index + 1}. {rule.title}
            </span>{" "}
            {rule.body}
            {rule.email ? (
              <>
                {" "}
                <a
                  href="mailto:pragalvhasharma@gmail.com"
                  className="text-[var(--accent)] underline decoration-[var(--accent)]/35 underline-offset-4 hover:decoration-[var(--accent)]"
                >
                  pragalvhasharma@gmail.com
                </a>
                .
              </>
            ) : null}
          </li>
        ))}
      </ol>

      <AudienceHeading label="For friends" note="everyone above who stuck around" />

      <div className="mt-5 space-y-5">
        {friendRules.map((rule) => (
          <p key={rule.title}>
            {rule.sun ? "☀️ " : null}
            <span className="font-semibold">{rule.title}</span> {rule.body}
          </p>
        ))}
      </div>

      <p className="font-ui mt-12 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
        Inspired by Geoffrey Woo, Kaz Nejatian, and Vu Tran.
      </p>
    </div>
  );
}
