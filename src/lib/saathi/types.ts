export type Language = "english" | "hindi" | "hinglish";

export type ConcernLevel = "low" | "moderate" | "high" | "immediate";

export type Mood = "good" | "okay" | "low" | "heavy" | "numb";

export interface UserProfile {
  name: string;
  language: Language;
  mood: Mood;
  /** consent to store conversation data for well-being tracking */
  consentTracking: boolean;
  /** consent to keep optional long-term memories */
  consentMemories: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  /** safety level detected on the user's message */
  risk?: ConcernLevel;
}

export interface Memory {
  id: string;
  text: string;
  createdAt: string;
}

export interface CheckIn {
  date: string;
  loneliness: number;
  distress: number;
  connection: number;
  note: string;
}

export interface Indicators {
  loneliness: number;
  distress: number;
  connection: number;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  languages: string;
  availability: string;
  experience: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  minutes: string;
  tag: "connect" | "move" | "reflect" | "calm" | "professional";
}
