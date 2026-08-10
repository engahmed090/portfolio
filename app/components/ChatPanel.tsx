"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadioTower, X, Send, Sparkles, RefreshCw } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { Message } from "../hooks/useChat";
import { Sound } from "./SoundSystem";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onResetChat: () => void;
  suggestedPrompts: string[];
}

export default function ChatPanel({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSendMessage,
  onResetChat,
  suggestedPrompts,
}: ChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    Sound.click();
    onSendMessage(inputText);
    setInputText("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    Sound.click();
    onSendMessage(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[980] bg-slate-950/70 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* HUD Chat Panel - Fullscreen on Mobile, Sleek Floating Panel on Desktop */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Ahmed's Engineering AI Chat Interface"
            initial={{ opacity: 0, y: "100%", mdY: 0, x: 0, mdX: "100%", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, mdY: 0, x: 0, mdX: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", mdY: 0, x: 0, mdX: "100%", scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[999] flex w-full h-full flex-col bg-slate-950/95 backdrop-blur-2xl text-slate-100 overflow-hidden md:top-4 md:right-4 md:bottom-4 md:left-auto md:w-[420px] md:h-[calc(100vh-2rem)] md:rounded-2xl md:border md:border-cyan-400/20 md:shadow-[0_0_50px_rgba(34,211,238,0.12)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-cyan-400/30 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                  <RadioTower className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-sm font-bold tracking-wide text-slate-100 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Ahmed&apos;s Engineering AI
                    </h2>
                    <span className="flex h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 tracking-wider truncate">
                    Communication Engineer · Sulaimani
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    Sound.click();
                    onResetChat();
                  }}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    Sound.click();
                    onClose();
                  }}
                  aria-label="Close chat interface"
                  className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isLoading && (
                <div className="flex items-center gap-2.5 text-xs justify-start my-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-slate-900/80 text-cyan-400">
                    <RadioTower className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-slate-950/70 border border-cyan-400/20 px-3.5 py-2.5 text-slate-400">
                    <span className="text-[11px] font-mono text-cyan-400/80 mr-1">Thinking</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length <= 1 && (
              <div className="p-3 sm:p-4 border-t border-slate-800/40 bg-slate-950/60 shrink-0">
                <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-cyan-400" /> Suggested Prompts
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handlePromptClick(prompt)}
                      className="rounded-lg border border-cyan-400/20 bg-slate-900/60 px-2.5 py-1.5 text-[11px] sm:text-xs text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 transition-all text-left break-words"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Section */}
            <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md shrink-0">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Ahmed anything (English / کوردی)..."
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-950/80 px-3.5 py-2.5 sm:px-4 sm:py-3 pr-11 text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 disabled:opacity-50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                  aria-label="Send message"
                  className="absolute right-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 hover:text-cyan-300 disabled:opacity-30 disabled:hover:bg-cyan-500/20 transition-all"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
              <div className="mt-1.5 text-center text-[8px] sm:text-[9px] font-mono text-slate-500">
                Ahmed Osman Qader · Communication Engineer Persona
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
