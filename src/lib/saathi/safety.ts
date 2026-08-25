import type { ConcernLevel } from "./types";

/**
 * Lightweight, transparent keyword-based signal detection.
 * This is NOT a diagnosis — it only routes the conversation towards
 * human support when concerning language appears.
 */

const IMMEDIATE = [
  "kill myself",
  "end my life",
  "suicide",
  "suicidal",
  "want to die",
  "not want to live",
  "don't want to live",
  "hurt myself",
  "self harm",
  "self-harm",
  "cutting myself",
  "overdose",
  "jump off",
  "khudkhushi",
  "marna chahta",
  "marna chahti",
  "jeena nahi",
];

const HIGH = [
  "hopeless",
  "worthless",
  "no reason to go on",
  "give up",
  "can't take it anymore",
  "cant take it anymore",
  "nobody would miss me",
  "burden",
  "empty inside",
  "hate myself",
  "bekaar",
  "himmat nahi",
];

const MODERATE = [
  "lonely",
  "alone",
  "isolated",
  "no friends",
  "nobody to talk",
  "no one to talk",
  "anxious",
  "panic",
  "crying",
  "can't sleep",
  "cant sleep",
  "stressed",
  "sad",
  "akela",
  "udaas",
  "tension",
];

export interface SafetyResult {
  level: ConcernLevel;
  matched: string[];
}

export function assessSafety(text: string): SafetyResult {
  const t = text.toLowerCase();
  const find = (list: string[]) => list.filter((k) => t.includes(k));

  const immediate = find(IMMEDIATE);
  if (immediate.length) return { level: "immediate", matched: immediate };

  const high = find(HIGH);
  if (high.length) return { level: "high", matched: high };

  const moderate = find(MODERATE);
  if (moderate.length) return { level: "moderate", matched: moderate };

  return { level: "low", matched: [] };
}

export const CONCERN_LABEL: Record<ConcernLevel, string> = {
  low: "Low concern",
  moderate: "Moderate concern",
  high: "High concern",
  immediate: "Needs immediate human support",
};

export const HELPLINES = [
  {
    name: "Tele-MANAS (India, 24x7)",
    detail: "14416 or 1-800-891-4416",
  },
  { name: "KIRAN Mental Health Helpline (India)", detail: "1800-599-0019" },
  { name: "AASRA (24x7)", detail: "+91 98204 66726" },
  {
    name: "Emergency services",
    detail: "112 (India) — or your local emergency number",
  },
];
