import { useCallback, useEffect, useState } from "react";
import { store } from "./storage";
import type { ChatMessage, CheckIn, Memory, UserProfile } from "./types";
import { analyseConversation, BASELINE } from "./wellbeing";

interface SaathiState {
  profile: UserProfile | null;
  messages: ChatMessage[];
  memories: Memory[];
  checkIns: CheckIn[];
  hydrated: boolean;
}

const empty: SaathiState = {
  profile: null,
  messages: [],
  memories: [],
  checkIns: [],
  hydrated: false,
};

export function useSaathi() {
  const [state, setState] = useState<SaathiState>(empty);

  const refresh = useCallback(() => {
    setState({
      profile: store.getProfile(),
      messages: store.getMessages(),
      memories: store.getMemories(),
      checkIns: store.getCheckIns(),
      hydrated: true,
    });
  }, []);

  useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener("saathi:change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("saathi:change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const indicators = analyseConversation(state.messages, BASELINE);

  return { ...state, indicators, refresh };
}
