import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Disclaimer } from "@/components/saathi/bits";
import { store } from "@/lib/saathi/storage";
import type { Language, Mood } from "@/lib/saathi/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — SaathiAI" },
      {
        name: "description",
        content:
          "Tell SaathiAI what to call you, your preferred language, and how you're feeling today before you start talking.",
      },
      { property: "og:title", content: "Get started — SaathiAI" },
      {
        property: "og:description",
        content: "A short, private setup before your first conversation with SaathiAI.",
      },
    ],
  }),
  component: Onboarding,
});

const LANGUAGES: Array<{ value: Language; label: string; hint: string }> = [
  { value: "english", label: "English", hint: "Simple, warm English" },
  { value: "hindi", label: "हिन्दी", hint: "Hindi in Devanagari" },
  { value: "hinglish", label: "Hinglish", hint: "Hindi in Roman script" },
];

const MOODS: Array<{ value: Mood; label: string; emoji: string }> = [
  { value: "good", label: "Okay-ish, good", emoji: "🙂" },
  { value: "okay", label: "Just getting by", emoji: "😐" },
  { value: "low", label: "Low and lonely", emoji: "😔" },
  { value: "heavy", label: "Heavy, hard day", emoji: "😞" },
  { value: "numb", label: "Numb, nothing", emoji: "🌫️" },
];

function Onboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("english");
  const [mood, setMood] = useState<Mood>("low");
  const [consentTracking, setConsentTracking] = useState(true);
  const [consentMemories, setConsentMemories] = useState(true);

  const start = (withMemories: boolean) => {
    store.setProfile({
      name: name.trim() || "friend",
      language,
      mood,
      consentTracking,
      consentMemories: withMemories && consentMemories,
      createdAt: new Date().toISOString(),
    });
    navigate({ to: "/chat" });
  };

  return (
    <div className="min-h-screen bg-warm">
      <div className="mx-auto w-full max-w-lg px-5 py-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">SaathiAI</p>
        <h1 className="mt-2 text-3xl">Before we begin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Four quick things. Nothing here is required to be true or complete.
        </p>

        <div className="mt-7 space-y-5">
          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <label htmlFor="name" className="text-sm font-semibold">
              What would you like to be called?
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="A name or nickname"
              className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <p className="text-sm font-semibold">Preferred language</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {LANGUAGES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLanguage(option.value)}
                  className={cn(
                    "rounded-xl border px-2 py-3 text-sm font-semibold transition-colors",
                    language === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {option.label}
                  <span className="mt-0.5 block text-[10px] font-normal">{option.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <p className="text-sm font-semibold">How are you feeling today?</p>
            <div className="mt-3 space-y-2">
              {MOODS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMood(option.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                    mood === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background",
                  )}
                >
                  <span aria-hidden>{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <p className="text-sm font-semibold">Consent</p>
            <label className="mt-3 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={consentTracking}
                onChange={(event) => setConsentTracking(event.target.checked)}
                className="mt-0.5 size-4 accent-[var(--primary)]"
              />
              <span className="text-muted-foreground">
                Use my conversations to show my own well-being trends inside this app.
              </span>
            </label>
            <label className="mt-3 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={consentMemories}
                onChange={(event) => setConsentMemories(event.target.checked)}
                className="mt-0.5 size-4 accent-[var(--primary)]"
              />
              <span className="text-muted-foreground">
                Remember optional details I share (like names or events) so I don't repeat myself.
              </span>
            </label>
          </div>

          <Disclaimer />

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => start(true)}
              className="w-full rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-soft active:scale-[0.98]"
            >
              Start talking
            </button>
            <button
              type="button"
              onClick={() => start(false)}
              className="w-full rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold"
            >
              Continue without saving memories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
