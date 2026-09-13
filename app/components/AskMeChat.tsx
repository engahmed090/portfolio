"use client";

import AskMeButton from "./AskMeButton";
import ChatPanel from "./ChatPanel";
import { useChat } from "../hooks/useChat";

export default function AskMeChat() {
  const {
    isOpen,
    toggleChat,
    closeChat,
    messages,
    isLoading,
    sendMessage,
    resetChat,
    suggestedPrompts,
  } = useChat();

  return (
    <>
      {/* Trigger Button fixed on top-left */}
      <AskMeButton onClick={toggleChat} isOpen={isOpen} />

      {/* Glassmorphism Slide-In HUD Panel */}
      <ChatPanel
        isOpen={isOpen}
        onClose={closeChat}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        onResetChat={resetChat}
        suggestedPrompts={suggestedPrompts}
      />
    </>
  );
}
