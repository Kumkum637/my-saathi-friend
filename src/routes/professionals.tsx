import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/saathi/AppShell";
import { Disclaimer } from "@/components/saathi/bits";
import { PROFESSIONALS } from "@/lib/saathi/professionals";
import type { Professional } from "@/lib/saathi/types";
import { useSaathi } from "@/lib/saathi/useSaathi";
import { overallLevel } from "@/lib/saathi/wellbeing";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { title: "Talk to a professional — SaathiAI" },
      {
        name: "description",
        content:
          "Request a connection with a counsellor, psychologist or crisis volunteer. You decide whether a short conversation summary is shared.",
      },
      { property: "og:title", content: "Talk to a professional — SaathiAI" },
      {
        property: "og:description",
        content: "Connect with a human counsellor — sharing your summary is always your choice.",
      },
    ],
  }),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  const { messages, profile, indicators } = useSaathi();
  const [selected, setSelected] = useState<Professional | null>(null);
  const [confirmed, setConfirmed] = useState<{ name: string; shared: boolean } | null>(null);

  const userLines = messages.filter((m) => m.role === "user");
  const summary = `${profile?.name ?? "This person"} has shared ${userLines.length} message${
    userLines.length === 1 ? "" : "s"
  } with SaathiAI. Current signals — loneliness ${indicators.loneliness}, emotional distress ${
    indicators.distress
  }, social connection ${indicators.connection} (support level: ${overallLevel(indicators)}). Recent theme: ${
    userLines.at(-1)?.content.slice(0, 140) ?? "no conversation yet"
  }`;

  const connect = (shared: boolean) => {
    if (!selected) return;
    setConfirmed({ name: selected.name, shared });
    setSelected(null);
  };

  return (
    <AppShell title="Talk to a professional" subtitle="Demo profiles for this prototype">
      <div className="space-y-4">
        <div className="rounded-2xl border border-warn/50 bg-warn/10 p-3 text-xs font-semibold text-warn-foreground">
          DEMO DATA — these profiles are samples for the prototype, not real bookings.
        </div>

        {confirmed ? (
          <div className="rounded-2xl border border-calm/50 bg-calm/10 p-4">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-calm-foreground" aria-hidden />
              <p className="text-sm font-semibold">Request sent to {confirmed.name}</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {confirmed.shared
                ? "A short summary of your conversation was included."
                : "No conversation summary was shared."}{" "}
              In the prototype this is simulated — in the real product you'd get a confirmation and a
              time slot.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/chat"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Back to chat
              </Link>
              <button
                type="button"
                onClick={() => setConfirmed(null)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
              >
                Request another
              </button>
            </div>
          </div>
        ) : null}

        {PROFESSIONALS.map((pro) => (
          <div key={pro.id} className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
            <p className="text-sm font-semibold">{pro.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{pro.specialty}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden /> {pro.availability}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="size-3.5" aria-hidden /> {pro.languages}
              </span>
              <span>{pro.experience} experience</span>
            </div>
            <button
              type="button"
              onClick={() => setSelected(pro)}
              className="mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground active:scale-[0.99]"
            >
              Request connection
            </button>
          </div>
        ))}

        <Disclaimer />
      </div>

      {selected ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-foreground/40 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              <p className="text-sm font-semibold">Your consent, your choice</p>
            </div>
            <p className="mt-3 text-sm">
              Would you like SaathiAI to share a short summary of what you've discussed with{" "}
              {selected.name}?
            </p>
            <div className="mt-3 rounded-xl border border-border/60 bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
              {summary}
            </div>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => connect(true)}
                className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Share &amp; continue
              </button>
              <button
                type="button"
                onClick={() => connect(false)}
                className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full py-1 text-xs font-semibold text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
