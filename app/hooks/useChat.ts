"use client";

import { useState, useCallback, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const SUGGESTED_PROMPTS = [
  "Tell me about your final project",
  "What hardware have you built?",
  "What's your educational background?",
];

const INITIAL_GREETING: Message = {
  id: "init-1",
  role: "assistant",
  content:
    "Hello! I am Ahmed's Engineering AI — trained on Ahmed's portfolio data, metamaterial PyTorch AI research, ESP32 VNA hardware, and telecommunication datasets. How can I assist you today?",
  timestamp: "",
};

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState(false);

  // Set initial timestamp on mount to prevent hydration mismatch
  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === "init-1" && !msg.timestamp
          ? {
              ...msg,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
          : msg
      )
    );
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([
      {
        ...INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      const userMsgId = `user-${Date.now()}`;
      const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const userMsg: Message = {
        id: userMsgId,
        role: "user",
        content: trimmed,
        timestamp: nowStr,
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();
        const aiMsgContent = data.content || "Sorry, I couldn't generate a response.";

        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: aiMsgContent,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        console.error("Failed to send message:", err);
        const errorMsg: Message = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I encountered a temporary connection issue. However, I can confirm that Ahmed graduated 2nd overall in Communication Engineering at SPU and built an AI-enhanced Metamaterial Absorber sensing system with PyTorch.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return {
    isOpen,
    toggleChat,
    openChat,
    closeChat,
    messages,
    isLoading,
    sendMessage,
    resetChat,
    suggestedPrompts: SUGGESTED_PROMPTS,
  };
}
