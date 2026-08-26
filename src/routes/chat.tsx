import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mic, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ConcernBadge, CrisisCard, Disclaimer } from "@/components/saathi/bits";
import { DEMO_SCENARIOS, demoReply } from "@/lib/saathi/demo";
import { buildSystemPrompt } from "@/lib/saathi/prompt";
import { assessSafety } from "@/lib/saathi/safety";
import { newId, store } from "@/lib/saathi/storage";
import type { ChatMessage, ConcernLevel } from "@/lib/saathi/types";
import { useSaathi } from "@/lib/saathi/useSaathi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Talk to SaathiAI — a companion that listens" },
      {
        name: "description",
        content:
          "A calm, private chat with SaathiAI. It listens first, asks gentle questions, and points you to real human support when it matters.",
      },
      { property: "og:title", content: "Talk to SaathiAI" },
      {
        property: "og:description",
        content: "A calm, private conversation with an AI companion that listens first.",
      },
    ],
  }),
  component: ChatPage,
});

const GREETING =
  "Hi, I'm SaathiAI. You don't have to explain everything perfectly. What's been on your mind?";

function ChatPage() {
  const { profile, messages, memories, hydrated } = useSaathi();
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const name = profile?.name ?? "friend";
  const language = profile?.language ?? "english";

  const thread: ChatMessage[] = useMemo(() => {
    if (messages.length) return messages;
    return [
      {
        id: "greeting",
        role: "assistant",
        content: GREETING,
        createdAt: new Date().toISOString(),
      },
    ];
  }, [messages]);

  const lastUserRisk: ConcernLevel =
    [...thread].reverse().find((m) => m.role === "user")?.risk ?? "low";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [thread.length, thinking]);

  const send = async (raw: string, forcedLevel?: ConcernLevel) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setError(null);
    setInput("");

    const risk = forcedLevel ?? assessSafety(text).level;
    const base = messages.length
      ? messages
      : [
          {
            id: "greeting",
            role: "assistant" as const,
            content: GREETING,
            createdAt: new Date().toISOString(),
          },
        ];
    const userMessage: ChatMessage = {
      id: newId(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
      risk,
    };
    const next = [...base, userMessage];
    store.setMessages(next);
    setThinking(true);

    const turn = next.filter((m) => m.role === "user").length - 1;

    const finish = (reply: string) => {
      store.setMessages([
        ...next,
        {
          id: newId(),
          role: "assistant",
          content: reply,
          createdAt: new Date().toISOString(),
        },
      ]);
      setThinking(false);
    };

    if (demoMode) {
      const { reply } = demoReply({ text, language, turn, level: risk });
      setTimeout(() => finish(reply), 650);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system: buildSystemPrompt({
            name,
            language,
            risk,
            memories: memories.map((m) => m.text),
          }),
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        setError(
          (data.error ?? "SaathiAI couldn't reach the AI service.") +
            " Showing a demo response instead.",
        );
        finish(demoReply({ text, language, turn, level: risk }).reply);
        return;
      }
      finish(data.reply);
    } catch {
      setError("Network issue — showing a demo response instead.");
      finish(demoReply({ text, language, turn, level: risk }).reply);
    }
  };

  if (hydrated && !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-warm px-6 text-center">
        <h1 className="text-2xl">Let's set things up first</h1>
        <p className="text-sm text-muted-foreground">
          A quick 30-second setup so SaathiAI knows what to call you.
        </p>
        <Link
          to="/onboarding"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            to="/"
            aria-label="Back home"
            className="grid size-9 place-items-center rounded-full border border-border bg-card"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <div className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">SaathiAI</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Listening — not a diagnosis, not an emergency service
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDemoMode((v) => !v)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[11px] font-semibold",
              demoMode
                ? "border-warn bg-warn/20 text-warn-foreground"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {demoMode ? "DEMO ON" : "Demo mode"}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-4">
        {demoMode ? (
          <div className="mb-3 rounded-2xl border border-warn/50 bg-warn/10 p-3">
            <p className="text-[11px] font-semibold tracking-wide text-warn-foreground uppercase">
              Demo data — simulated scenarios
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => send(scenario.message, scenario.id)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
                >
                  <span aria-hidden>{scenario.emoji}</span> {scenario.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex-1 space-y-3">
          {thread.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft",
                  message.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border/70 bg-card",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {thinking ? (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/70 bg-card px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {lastUserRisk === "immediate" ? <CrisisCard /> : null}

          {lastUserRisk === "high" ? (
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">This sounds heavy to carry alone</p>
                <ConcernBadge level="high" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A trained human can support you in ways an app cannot.
              </p>
              <Link
                to="/professionals"
                className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Get human support
              </Link>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-xl border border-border/70 bg-muted/60 p-3 text-xs text-muted-foreground">
              {error}
            </p>
          ) : null}

          <div ref={endRef} />
        </div>

        <Disclaimer className="mt-4" />
      </main>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
        className="sticky bottom-0 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur"
      >
        <div className="mx-auto flex w-full max-w-2xl items-end gap-2">
          <button
            type="button"
            aria-label="Voice input (coming soon)"
            title="Voice input coming soon"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-muted-foreground"
          >
            <Mic className="size-4" aria-hidden />
          </button>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Say whatever comes first…"
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
          >
            <Send className="size-4" aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}
