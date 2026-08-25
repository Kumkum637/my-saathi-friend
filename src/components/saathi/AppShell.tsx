import { Link } from "@tanstack/react-router";
import { Activity, HeartHandshake, MessageCircle, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/dashboard", label: "Well-being", icon: Activity },
  { to: "/support", label: "Support", icon: Sparkles },
  { to: "/professionals", label: "Humans", icon: HeartHandshake },
  { to: "/profile", label: "Privacy", icon: User },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-lg leading-tight">{title}</h1>
            {subtitle ? (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {action}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-4 pb-28">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-stretch justify-between px-2 py-1.5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary bg-primary/10" }}
            >
              <Icon className="size-5" aria-hidden />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
