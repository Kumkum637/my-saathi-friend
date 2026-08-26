import { assessSafety } from "./safety";
import type { ConcernLevel, Language } from "./types";

/**
 * Demo conversation engine.
 *
 * Used when no AI API is reachable (or when Demo Mode is on) so the prototype
 * always responds sensibly. Responses are supportive only — never diagnostic,
 * never dependency-encouraging, never a replacement for people or professionals.
 */

type Bank = Record<ConcernLevel, string[]>;

const EN: Bank = {
  low: [
    "Thanks for saying it out loud — a little lonely still counts. What did today look like for you?",
    "That sounds like one of those quiet, flat days. Was there a moment it felt heavier than the rest?",
    "I hear you. Loneliness can show up even on ordinary days. Who was around you today, if anyone?",
  ],
  moderate: [
    "Several days of carrying this by yourself is a lot. What's made reaching out to anyone feel hard?",
    "So it's been stretching on, and talking to people has felt like too much. What usually stops you first — energy, or worry about how they'd react?",
    "That withdrawing feeling makes sense when you're already tired. Is there one person who'd be the easiest to say even a small hello to?",
  ],
  high: [
    "Hopeless and completely alone — that's a heavy thing to be holding, and I'm glad you told me. How long has it felt this way?",
    "I'm staying right here with that. It sounds exhausting. Has anything been keeping you going through these days?",
    "Feeling this alone deserves more support than a screen can give. Would it feel possible to let one trusted person, or a counsellor, in on some of this?",
  ],
  immediate: [
    "Thank you for trusting me with something this serious. I'm not able to keep you safe on my own, so please reach a real person right now — someone nearby you trust, or Tele-MANAS at 14416. If you're in immediate danger, call 112.",
  ],
};

const HI: Bank = {
  low: [
    "बताने के लिए शुक्रिया — थोड़ा अकेलापन भी मायने रखता है। आज का दिन कैसा गुज़रा?",
    "लगता है दिन कुछ सुस्त और खाली रहा। कोई पल था जब ज़्यादा भारी लगा?",
  ],
  moderate: [
    "कई दिनों से यह सब अकेले संभालना बहुत होता है। किसी से बात करना क्यों मुश्किल लग रहा है?",
    "थकान में लोगों से दूरी बनाना समझ आता है। कोई एक व्यक्ति है जिससे छोटा-सा हैलो कहना आसान लगे?",
  ],
  high: [
    "इतना खाली और अकेला महसूस करना बहुत भारी है, और आपने बताया — यह अच्छा किया। कब से ऐसा लग रहा है?",
    "मैं यहीं हूँ, सुन रहा हूँ। इतना बोझ अकेले नहीं उठाना चाहिए। किसी भरोसेमंद इंसान या काउंसलर से बात करना मुमकिन लगेगा?",
  ],
  immediate: [
    "इतनी गंभीर बात बताने के लिए शुक्रिया। मैं अकेले आपकी सुरक्षा नहीं कर सकता — कृपया अभी किसी भरोसेमंद इंसान से या Tele-MANAS 14416 पर बात करें। तुरंत ख़तरा हो तो 112 पर कॉल करें।",
  ],
};

const HINGLISH: Bank = {
  low: [
    "Batane ke liye thanks — thoda lonely feel karna bhi valid hai. Aaj ka din kaisa tha?",
    "Lagta hai din kuch flat aur quiet raha. Koi ek moment tha jo zyada heavy laga?",
  ],
  moderate: [
    "Kai din se ye sab akele carry karna bahut hota hai. Kisi se baat karna kyun mushkil lag raha hai?",
    "Thake hue ho to logon se door hona samajh aata hai. Koi ek banda hai jisko chhota sa hello karna easy lage?",
  ],
  high: [
    "Itna hopeless aur akela feel karna bahut bhaari hai — accha kiya ki bataya. Kab se aisa chal raha hai?",
    "Main yahin hoon, sun raha hoon. Ye bojh akele uthane wala nahi hai. Kisi trusted insaan ya counsellor se baat karna possible lagega?",
  ],
  immediate: [
    "Itni serious baat share karne ke liye shukriya. Main akela aapko safe nahi rakh sakta — please abhi kisi trusted insaan se ya Tele-MANAS 14416 par baat karein. Immediate danger ho to 112 call karein.",
  ],
};

const BANKS: Record<Language, Bank> = { english: EN, hindi: HI, hinglish: HINGLISH };

export function demoReply(opts: {
  text: string;
  language: Language;
  turn: number;
  level?: ConcernLevel;
}): { reply: string; level: ConcernLevel } {
  const level = opts.level ?? assessSafety(opts.text).level;
  const bank = BANKS[opts.language][level];
  const reply = bank[opts.turn % bank.length] ?? bank[0]!;
  return { reply, level };
}

export interface DemoScenario {
  id: ConcernLevel;
  label: string;
  emoji: string;
  message: string;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "low",
    label: "Low concern",
    emoji: "🟢",
    message: "I feel a little lonely today.",
  },
  {
    id: "moderate",
    label: "Moderate concern",
    emoji: "🟡",
    message: "I've been feeling lonely for several days and haven't wanted to talk to anyone.",
  },
  {
    id: "high",
    label: "High concern",
    emoji: "🟠",
    message: "I feel hopeless and completely alone.",
  },
  {
    id: "immediate",
    label: "Safety escalation",
    emoji: "🔴",
    message: "Sometimes I think I want to die. I don't see a point anymore.",
  },
];
