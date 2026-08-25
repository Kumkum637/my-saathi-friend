import type { ChatMessage, CheckIn, Memory, UserProfile } from "./types";
import { sampleHistory } from "./wellbeing";

const KEYS = {
  profile: "saathi.profile",
  messages: "saathi.messages",
  memories: "saathi.memories",
  checkins: "saathi.checkins",
  consentShare: "saathi.consentShare",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("saathi:change"));
}

export const store = {
  getProfile: () => read<UserProfile | null>(KEYS.profile, null),
  setProfile: (profile: UserProfile) => write(KEYS.profile, profile),

  getMessages: () => read<ChatMessage[]>(KEYS.messages, []),
  setMessages: (messages: ChatMessage[]) => write(KEYS.messages, messages),

  getMemories: () => read<Memory[]>(KEYS.memories, []),
  setMemories: (memories: Memory[]) => write(KEYS.memories, memories),

  getCheckIns: () => {
    const stored = read<CheckIn[] | null>(KEYS.checkins, null);
    if (stored && stored.length) return stored;
    const seeded = sampleHistory();
    write(KEYS.checkins, seeded);
    return seeded;
  },
  setCheckIns: (checkIns: CheckIn[]) => write(KEYS.checkins, checkIns),

  clearConversation: () => {
    write(KEYS.messages, []);
  },

  clearAll: () => {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((key) => window.localStorage.removeItem(key));
    window.dispatchEvent(new Event("saathi:change"));
  },
};

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
