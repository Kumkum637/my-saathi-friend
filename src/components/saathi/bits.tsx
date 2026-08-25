import { Link } from "@tanstack/react-router";
import { AlertTriangle, Info, Phone } from "lucide-react";
import { CONCERN_LABEL, HELPLINES } from "@/lib/saathi/safety";
import type { ConcernLevel } from "@/lib/saathi/types";
import { cn } from "@/lib/utils";

const TONE: Record<ConcernLevel, string> = {
  low: "bg-calm/15 text-calm-foreground ring-calm/40",
  moderate: "bg-warn/20 text-warn-foreground ring-warn/40",
  high: "bg-accent/40 text-accent-foreground ring-accent",
  immediate: "bg-alert/15 text-alert ring-alert/40",
};

const BAR: Record<ConcernLevel, string> = {
  low: "bg-calm",
  moderate: "bg-warn",
  high: "bg-accent-foreground/70",
  immediate: "bg-alert",
};

export function ConcernBadge({ level, className }: { level: ConcernLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        TONE[level],
        className,
      )}
    >
      {CONCERN_LABEL[level]}
    </span>
  );
}

export function IndicatorCard({
  label,
  score,
  level,
  hint,
}: {
  label: string;
  score: number;
  level: ConcernLevel;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold">{label}</p>
        <ConcernBadge level={level} />
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", BAR[level])}
          style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-2xl border border-border/70 bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>
        SaathiAI offers emotional support and general well-being suggestions. It is{" "}
        <strong className="font-semibold text-foreground">
          not a psychologist, not a medical diagnosis, and not an emergency service
        </strong>
        . It does not replace people or professional care. In an emergency, contact local emergency
        services immediately.
      </p>
    </div>
  );
}

export function CrisisCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-alert/40 bg-alert/10 p-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-alert" aria-hidden />
        <p className="text-sm font-semibold text-foreground">If you may be in danger right now</p>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Please reach a real human immediately — someone nearby you trust, or a crisis line. SaathiAI
        cannot keep you safe on its own.
      </p>
      {!compact ? (
        <ul className="mt-3 space-y-2">
          {HELPLINES.map((line) => (
            <li key={line.name} className="flex items-center gap-2 text-sm">
              <Phone className="size-4 shrink-0 text-alert" aria-hidden />
              <span className="font-medium">{line.name}</span>
              <span className="text-muted-foreground">{line.detail}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        to="/safety"
        className="mt-3 inline-flex items-center justify-center rounded-full bg-alert px-4 py-2 text-sm font-semibold text-alert-foreground"
      >
        Open safety support
      </Link>
    </div>
  );
}
