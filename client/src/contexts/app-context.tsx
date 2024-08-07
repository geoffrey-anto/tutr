"use client";

import React, { createContext, useCallback, useEffect } from "react";

export interface ChatMessage {
  message: string;
  sender: boolean;
  timestamp: string;
}

export const AppContext = createContext({
  chatState: Array<ChatMessage>(),
  setChatState: (a: ChatMessage[]) => {},
  currentChatContext: "",
  setCurrentChatContext: (a: string) => {},
  resetChatStatus: () => {},
  chatContextHistory: Array<string>(),
  setChatContextHistory: (a: string[]) => {},
  setPromptType: (a: string) => {},
  promptType: "",
  resetChatHistory: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatState, setChatState] = React.useState<ChatMessage[]>([]);
  const [currentChatContext, setCurrentChatContext] = React.useState("");
  const [chatContextHistory, setChatContextHistory] = React.useState<string[]>(
    []
  );
  const [promptType, setPromptType] = React.useState("");

  const resetChatStatus = useCallback(() => {
    setChatState([]);
    setCurrentChatContext("");
    localStorage.removeItem("currentChatContext");
    localStorage.removeItem("chatState");
  }, []);

  const resetChatHistory = useCallback(() => {
    setChatContextHistory([]);
    localStorage.removeItem("chatContextHistory");
  }, []);

  useEffect(() => {
    if (currentChatContext && currentChatContext.length > 0)
      localStorage.setItem("currentChatContext", currentChatContext);
    if (chatState) localStorage.setItem("chatState", JSON.stringify(chatState));

    if (chatContextHistory && chatContextHistory.length > 0)
      localStorage.setItem(
        "chatContextHistory",
        JSON.stringify(chatContextHistory)
      );

    return () => {};
  }, [currentChatContext, chatState, chatContextHistory]);

  useEffect(() => {
    const c = localStorage.getItem("currentChatContext");
    const cs = localStorage.getItem("chatState");
    const ch = localStorage.getItem("chatContextHistory");

    if (c) {
      setCurrentChatContext(c);
    }

    if (cs) {
      setChatState(JSON.parse(cs));
    }

    if (ch) {
      setChatContextHistory(JSON.parse(ch));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        chatState,
        setChatState,
        currentChatContext,
        setCurrentChatContext,
        resetChatStatus,
        chatContextHistory,
        setChatContextHistory,
        setPromptType,
        promptType,
        resetChatHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
