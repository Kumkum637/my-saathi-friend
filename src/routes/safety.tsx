import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { AppShell } from "@/components/saathi/AppShell";
import { Disclaimer } from "@/components/saathi/bits";
import { HELPLINES } from "@/lib/saathi/safety";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety support — SaathiAI" },
      {
        name: "description",
        content:
          "If you may be in danger, reach real human help now: a trusted person nearby, a crisis helpline, or emergency services.",
      },
      { property: "og:title", content: "Safety support — SaathiAI" },
      {
        property: "og:description",
        content: "Immediate real-world support options if you may be in danger.",
      },
    ],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  return (
    <AppShell title="Safety support" subtitle="Real people, right now">
      <div className="space-y-4">
        <div className="rounded-2xl border border-alert/40 bg-alert/10 p-4">
          <p className="text-sm font-semibold">You reached out — that matters</p>
          <p className="mt-2 text-sm text-muted-foreground">
            SaathiAI is not an emergency service and cannot keep you safe on its own. If there's any
            chance you could be hurt, please contact a real person now — someone nearby you trust, a
            crisis line, or emergency services.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Call or message someone now</p>
          <ul className="mt-3 space-y-3">
            {HELPLINES.map((line) => (
              <li key={line.name} className="flex items-start gap-2 text-sm">
                <Phone className="mt-0.5 size-4 shrink-0 text-alert" aria-hidden />
                <span>
                  <span className="font-semibold">{line.name}</span>
                  <span className="block text-muted-foreground">{line.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Get human support</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You can request a counsellor, psychologist or crisis volunteer from this prototype.
          </p>
          <Link
            to="/professionals"
            className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Talk to a professional
          </Link>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Small steps while you wait</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Stay near another person if you can, even without talking.</li>
            <li>Move to a safer room and put anything harmful out of reach.</li>
            <li>Slow breathing: in for 4, hold 7, out for 8 — four rounds.</li>
            <li>Tell one person the plain truth: "I'm not okay right now."</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/chat"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
          >
            Back to chat
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
          >
            Home
          </Link>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
