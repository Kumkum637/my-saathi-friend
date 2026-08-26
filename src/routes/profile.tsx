import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/saathi/AppShell";
import { Disclaimer } from "@/components/saathi/bits";
import { newId, store } from "@/lib/saathi/storage";
import { useSaathi } from "@/lib/saathi/useSaathi";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Privacy & memories — SaathiAI" },
      {
        name: "description",
        content:
          "Manage what SaathiAI remembers, update consent settings, delete a conversation, or erase all of your data from this device.",
      },
      { property: "og:title", content: "Privacy & memories — SaathiAI" },
      {
        property: "og:description",
        content: "Full control over memories, consent and deleting your data.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { profile, memories, messages } = useSaathi();
  const [draft, setDraft] = useState("");

  const toggle = (key: "consentTracking" | "consentMemories") => {
    if (!profile) return;
    store.setProfile({ ...profile, [key]: !profile[key] });
  };

  return (
    <AppShell title="Privacy" subtitle={profile ? `Signed in as ${profile.name}` : "Your data"}>
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Where your data lives</p>
          <p className="mt-1 text-sm text-muted-foreground">
            In this prototype everything stays in your own browser on this device. Nothing is shared
            with a professional unless you explicitly consent.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Consent settings</p>
          <label className="mt-3 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={profile?.consentTracking ?? false}
              onChange={() => toggle("consentTracking")}
              className="mt-0.5 size-4 accent-[var(--primary)]"
            />
            <span className="text-muted-foreground">
              Use my conversations for my own well-being indicators.
            </span>
          </label>
          <label className="mt-3 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={profile?.consentMemories ?? false}
              onChange={() => toggle("consentMemories")}
              className="mt-0.5 size-4 accent-[var(--primary)]"
            />
            <span className="text-muted-foreground">Keep optional long-term memories.</span>
          </label>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Manage memories</p>
          <div className="mt-3 flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="e.g. My sister lives in Pune"
              className="flex-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="button"
              onClick={() => {
                if (!draft.trim()) return;
                store.setMemories([
                  ...memories,
                  { id: newId(), text: draft.trim(), createdAt: new Date().toISOString() },
                ]);
                setDraft("");
              }}
              className="rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Add
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {memories.length ? (
              memories.map((memory) => (
                <li
                  key={memory.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
                >
                  <span>{memory.text}</span>
                  <button
                    type="button"
                    aria-label={`Forget: ${memory.text}`}
                    onClick={() => store.setMemories(memories.filter((m) => m.id !== memory.id))}
                    className="text-muted-foreground"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No memories saved.</li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Delete data</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {messages.length} message{messages.length === 1 ? "" : "s"} stored on this device.
          </p>
          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={() => store.clearConversation()}
              className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold"
            >
              Delete conversation
            </button>
            <button
              type="button"
              onClick={() => {
                store.clearAll();
                navigate({ to: "/" });
              }}
              className="w-full rounded-full bg-alert px-4 py-2.5 text-sm font-semibold text-alert-foreground"
            >
              Delete account &amp; all data
            </button>
          </div>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
