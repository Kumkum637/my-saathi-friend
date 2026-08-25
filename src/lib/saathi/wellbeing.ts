import { assessSafety } from "./safety";
import type { ChatMessage, CheckIn, ConcernLevel, Indicators } from "./types";

export function levelFromScore(score: number): ConcernLevel {
  if (score >= 85) return "immediate";
  if (score >= 65) return "high";
  if (score >= 35) return "moderate";
  return "low";
}

/** Higher connection = better, so invert before mapping to a concern level. */
export function connectionLevel(score: number): ConcernLevel {
  return levelFromScore(100 - score);
}

export function overallLevel(i: Indicators): ConcernLevel {
  const composite = Math.round((i.loneliness + i.distress + (100 - i.connection)) / 3);
  return levelFromScore(composite);
}

/** Derives indicators from conversation signals layered on a baseline. */
export function analyseConversation(messages: ChatMessage[], baseline: Indicators): Indicators {
  const userMessages = messages.filter((m) => m.role === "user");
  if (!userMessages.length) return baseline;

  let loneliness = baseline.loneliness;
  let distress = baseline.distress;
  let connection = baseline.connection;

  for (const message of userMessages.slice(-12)) {
    const { level } = assessSafety(message.content);
    if (level === "immediate") {
      distress += 22;
      loneliness += 12;
      connection -= 10;
    } else if (level === "high") {
      distress += 12;
      loneliness += 8;
      connection -= 6;
    } else if (level === "moderate") {
      distress += 5;
      loneliness += 6;
      connection -= 3;
    } else {
      distress -= 2;
      connection += 2;
    }
  }

  const clamp = (n: number) => Math.max(2, Math.min(98, Math.round(n)));
  return {
    loneliness: clamp(loneliness),
    distress: clamp(distress),
    connection: clamp(connection),
  };
}

/** Realistic 7-day sample history so the dashboard is demo-ready. */
export function sampleHistory(): CheckIn[] {
  const seed: Array<Omit<CheckIn, "date">> = [
    { loneliness: 68, distress: 61, connection: 30, note: "Long weekend alone at home." },
    { loneliness: 62, distress: 55, connection: 34, note: "Called an old friend briefly." },
    { loneliness: 70, distress: 64, connection: 28, note: "Trouble sleeping, felt restless." },
    { loneliness: 55, distress: 48, connection: 42, note: "Went for an evening walk." },
    { loneliness: 49, distress: 44, connection: 48, note: "Wrote in a journal for 10 minutes." },
    { loneliness: 52, distress: 46, connection: 45, note: "Quiet day, some overthinking." },
    { loneliness: 44, distress: 38, connection: 55, note: "Had chai with a neighbour." },
  ];

  const today = new Date();
  return seed.map((entry, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (seed.length - 1 - index));
    return { ...entry, date: date.toISOString().slice(0, 10) };
  });
}

export const BASELINE: Indicators = { loneliness: 44, distress: 38, connection: 55 };
