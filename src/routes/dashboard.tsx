import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/saathi/AppShell";
import { ConcernBadge, Disclaimer, IndicatorCard } from "@/components/saathi/bits";
import { connectionLevel, levelFromScore, overallLevel } from "@/lib/saathi/wellbeing";
import { useSaathi } from "@/lib/saathi/useSaathi";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Well-being trends — SaathiAI" },
      {
        name: "description",
        content:
          "See loneliness, emotional distress and social connection signals from your conversations — supportive indicators, never a medical diagnosis.",
      },
      { property: "og:title", content: "Well-being trends — SaathiAI" },
      {
        property: "og:description",
        content: "Supportive well-being indicators derived from your own conversations.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { indicators, checkIns, messages } = useSaathi();
  const overall = overallLevel(indicators);
  const hasHistory = messages.some((m) => m.role === "user");

  const trend = checkIns.slice(-7);
  const max = 100;

  return (
    <AppShell
      title="Your well-being"
      subtitle="Signals, not diagnoses"
      action={<ConcernBadge level={overall} />}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Overall support level</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {overall === "immediate"
              ? "🔴 Immediate human support recommended — please reach a person or helpline now."
              : overall === "high"
                ? "🟠 High concern — a counsellor or trusted person could help carry this."
                : overall === "moderate"
                  ? "🟡 Moderate concern — worth staying gentle with yourself this week."
                  : "🟢 Low concern — keep the small things that help you going."}
          </p>
          {!hasHistory ? (
            <p className="mt-3 rounded-xl border border-warn/50 bg-warn/10 p-2 text-[11px] font-semibold text-warn-foreground">
              DEMO DATA — start a conversation to build your own signals.
            </p>
          ) : null}
          <Link
            to="/chat"
            className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            {hasHistory ? "Continue talking" : "Start talking"}
          </Link>
        </div>

        <div className="grid gap-3">
          <IndicatorCard
            label="Loneliness"
            score={indicators.loneliness}
            level={levelFromScore(indicators.loneliness)}
            hint="How much being alone is weighing on you lately."
          />
          <IndicatorCard
            label="Emotional distress"
            score={indicators.distress}
            level={levelFromScore(indicators.distress)}
            hint="Signals of heaviness, worry or restlessness in your words."
          />
          <IndicatorCard
            label="Social connection"
            score={indicators.connection}
            level={connectionLevel(indicators.connection)}
            hint="How much real human contact shows up in your days."
          />
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">7-day trend</p>
            <span className="rounded-full bg-warn/20 px-2 py-0.5 text-[10px] font-bold text-warn-foreground">
              DEMO DATA
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            {trend.map((entry) => (
              <div key={entry.date} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-32 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-1.5 rounded-full bg-warn"
                    style={{ height: `${(entry.loneliness / max) * 100}%` }}
                    title={`Loneliness ${entry.loneliness}`}
                  />
                  <div
                    className="w-1.5 rounded-full bg-alert/70"
                    style={{ height: `${(entry.distress / max) * 100}%` }}
                    title={`Distress ${entry.distress}`}
                  />
                  <div
                    className="w-1.5 rounded-full bg-calm"
                    style={{ height: `${(entry.connection / max) * 100}%` }}
                    title={`Connection ${entry.connection}`}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString(undefined, { weekday: "narrow" })}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-warn" /> Loneliness
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-alert/70" /> Distress
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-calm" /> Connection
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Recent check-ins</p>
          <ul className="mt-3 space-y-3">
            {[...checkIns]
              .reverse()
              .slice(0, 5)
              .map((entry) => (
                <li key={entry.date} className="border-b border-border/50 pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">
                      {new Date(entry.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <ConcernBadge level={levelFromScore(entry.distress)} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
                </li>
              ))}
          </ul>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
