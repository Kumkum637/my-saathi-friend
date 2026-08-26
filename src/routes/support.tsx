import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/saathi/AppShell";
import { ConcernBadge, Disclaimer } from "@/components/saathi/bits";
import { suggestionsFor } from "@/lib/saathi/suggestions";
import { useSaathi } from "@/lib/saathi/useSaathi";
import { overallLevel } from "@/lib/saathi/wellbeing";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Personalised support ideas — SaathiAI" },
      {
        name: "description",
        content:
          "Gentle, general well-being ideas matched to how your conversations have been going — from a short walk to talking with a counsellor.",
      },
      { property: "og:title", content: "Personalised support ideas — SaathiAI" },
      {
        property: "og:description",
        content: "Small, general well-being steps matched to how you've been feeling.",
      },
    ],
  }),
  component: SupportPage,
});

const TAG_LABEL: Record<string, string> = {
  connect: "Connect",
  move: "Move",
  reflect: "Reflect",
  calm: "Calm",
  professional: "Professional",
};

function SupportPage() {
  const { indicators } = useSaathi();
  const level = overallLevel(indicators);
  const suggestions = suggestionsFor(level);

  return (
    <AppShell
      title="Support for right now"
      subtitle="General ideas, not prescriptions"
      action={<ConcernBadge level={level} />}
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          These are chosen from how your conversations have been going. Take what fits, skip the
          rest.
        </p>

        <div className="grid gap-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{suggestion.title}</p>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {TAG_LABEL[suggestion.tag] ?? suggestion.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{suggestion.description}</p>
              <p className="mt-2 text-[11px] font-semibold text-primary">{suggestion.minutes}</p>
              {suggestion.tag === "professional" ? (
                <Link
                  to="/professionals"
                  className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Talk to a professional
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Feeling unsafe right now?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Safety support has helplines and immediate next steps.
          </p>
          <Link
            to="/safety"
            className="mt-3 inline-flex rounded-full bg-alert px-4 py-2 text-sm font-semibold text-alert-foreground"
          >
            Open safety support
          </Link>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
