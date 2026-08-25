import { createFileRoute, Link } from "@tanstack/react-router";
import { Ear, HeartHandshake, Lock, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Disclaimer } from "@/components/saathi/bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SaathiAI — Listen. Understand. Support. Connect." },
      {
        name: "description",
        content:
          "SaathiAI is an AI emotional support companion for anyone feeling lonely or isolated. Talk freely, track your well-being, and connect to real human support.",
      },
      { property: "og:title", content: "SaathiAI — Listen. Understand. Support. Connect." },
      {
        property: "og:description",
        content:
          "A calm AI companion that listens, notices signs of loneliness, and encourages real human support when it matters.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    icon: MessageCircle,
    title: "You talk, at your pace",
    body: "Type in English, Hindi or Hinglish. SaathiAI listens first and asks gentle follow-up questions instead of dumping advice.",
  },
  {
    icon: Sparkles,
    title: "It notices patterns",
    body: "Signals of loneliness, distress and social connection are tracked over time as concern levels — never as medical diagnoses.",
  },
  {
    icon: HeartHandshake,
    title: "It connects you to humans",
    body: "When things feel heavy, SaathiAI encourages trusted people, counsellors and crisis lines — with your consent before anything is shared.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-warm">
        <div className="mx-auto w-full max-w-2xl px-5 pt-14 pb-12">
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
              <Ear className="size-5" aria-hidden />
            </span>
            <span className="font-display text-xl font-semibold">SaathiAI</span>
          </div>

          <h1 className="mt-8 text-4xl leading-[1.1] sm:text-5xl">
            Listen. Understand.
            <br />
            Support. Connect.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Some days there is nobody you can say the real thing to. SaathiAI is a calm companion
            that listens without judgement, helps you understand what you're carrying, and gently
            points you back towards people who can help.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
            >
              Start talking
            </Link>
            <Link
              to="/professionals"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground"
            >
              Talk to a professional
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Free to try. No diagnosis, no judgement, no pressure.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-5 py-12">
        <h2 className="text-2xl">How it works</h2>
        <div className="mt-5 space-y-3">
          {STEPS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-soft"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-5 pb-12">
        <h2 className="text-2xl">Privacy & safety</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <Lock className="size-5 text-primary" aria-hidden />
            <p className="mt-2 font-semibold">You stay in control</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Conversations stay on your device in this prototype. You can continue without saving
              any memories, and delete your chat or all of your data at any time.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <ShieldCheck className="size-5 text-primary" aria-hidden />
            <p className="mt-2 font-semibold">Safety before everything</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If the conversation suggests you may be in danger, SaathiAI responds calmly and points
              you to crisis lines and real people — never to itself as a substitute.
            </p>
          </div>
        </div>
        <Disclaimer className="mt-4" />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          SaathiAI — a companion, not a clinician.
        </p>
      </section>
    </div>
  );
}
