import type { ConcernLevel, Suggestion } from "./types";

const ALL: Suggestion[] = [
  {
    id: "trusted",
    title: "Reach out to someone you trust",
    description:
      "One short message to a friend, cousin or neighbour. It doesn't have to be deep — 'thinking of you' is enough to start.",
    minutes: "5 min",
    tag: "connect",
  },
  {
    id: "walk",
    title: "Take a slow walk outside",
    description:
      "A change of light and air often shifts how heavy things feel. Leave the phone in your pocket.",
    minutes: "15 min",
    tag: "move",
  },
  {
    id: "journal",
    title: "Write it down without editing",
    description:
      "Put the loudest thought on paper exactly as it sounds in your head. Naming it usually shrinks it a little.",
    minutes: "10 min",
    tag: "reflect",
  },
  {
    id: "breathe",
    title: "4-7-8 breathing",
    description:
      "Breathe in for 4, hold for 7, out for 8. Repeat four times. A simple way to settle a racing body.",
    minutes: "3 min",
    tag: "calm",
  },
  {
    id: "social",
    title: "Join one low-pressure social activity",
    description:
      "A walking group, a class, a community kitchen, an online hobby meet — presence matters more than conversation.",
    minutes: "This week",
    tag: "connect",
  },
  {
    id: "counsellor",
    title: "Talk to a counsellor or psychologist",
    description:
      "A trained human can support you in ways an app cannot. SaathiAI can help you connect to one.",
    minutes: "Anytime",
    tag: "professional",
  },
  {
    id: "routine",
    title: "Anchor one small daily routine",
    description:
      "Same wake-up time, one meal at the table, ten minutes of sunlight. Small anchors steady heavy weeks.",
    minutes: "Daily",
    tag: "reflect",
  },
];

export function suggestionsFor(level: ConcernLevel): Suggestion[] {
  switch (level) {
    case "immediate":
      return ALL.filter((s) => ["counsellor", "trusted", "breathe"].includes(s.id));
    case "high":
      return ALL.filter((s) => ["counsellor", "trusted", "breathe", "walk"].includes(s.id));
    case "moderate":
      return ALL.filter((s) => ["trusted", "walk", "journal", "social", "breathe"].includes(s.id));
    default:
      return ALL.filter((s) => ["walk", "journal", "social", "routine"].includes(s.id));
  }
}

export const ALL_SUGGESTIONS = ALL;
