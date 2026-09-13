"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadioTower, X, Send, Sparkles, RefreshCw,
  Wifi, Signal, Zap,
} from "lucide-react";
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

// ─── Header scan-line decoration ────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      aria-hidden
      className="absolute bottom-0 left-0 h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 40%, rgba(34,211,238,0.9) 50%, rgba(34,211,238,0.6) 60%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── RF signal bars (decorative) ─────────────────────────────────
function SignalBars() {
  return (
    <span className="flex items-end gap-[2px] h-3.5" aria-hidden>
      {[0.4, 0.65, 0.85, 1].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-[1px] bg-cyan-400"
          style={{ height: `${h * 100}%` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

// ─── Thinking indicator ──────────────────────────────────────────
function ThinkingBubble() {
  return (
    <div className="flex items-end gap-2.5 my-3">
      {/* AI avatar chip */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(6,182,212,0.06) 100%)",
          border: "1px solid rgba(34,211,238,0.35)",
          boxShadow: "0 0 14px rgba(34,211,238,0.20)",
        }}
      >
        <RadioTower className="h-4 w-4 text-cyan-400" />
      </div>

      {/* Bubble */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{
          background: "rgba(6,182,212,0.06)",
          border: "1px solid rgba(34,211,238,0.18)",
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          className="text-[11px] font-mono tracking-widest uppercase"
          style={{ color: "rgba(165,243,252,0.7)" }}
        >
          Processing
        </span>
        {[0, 150, 300].map((delay, i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: delay / 1000, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
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
      if (e.key === "Escape" && isOpen) onClose();
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
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[980] md:hidden"
            style={{ background: "rgba(10,13,18,0.75)", backdropFilter: "blur(4px)" }}
            aria-hidden="true"
          />

          {/* ═══════════ MAIN PANEL ═══════════ */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Ahmed's Engineering AI Chat Interface"
            initial={{ opacity: 0, x: -28, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0,  scale: 1, filter: "blur(0px)" }}
            exit={{  opacity: 0, x: -28,  scale: 0.96, filter: "blur(8px)" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed z-[999] flex flex-col overflow-hidden chat-command"
            style={{
              /* Mobile: fullscreen */
              inset: 0,
              /* Desktop: floating panel — overridden via media query below */
              background: "radial-gradient(circle at 20% 0%, rgba(8,145,178,.16), transparent 34%), linear-gradient(165deg, rgba(5,12,24,0.99) 0%, rgba(7,16,29,0.98) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(34,211,238,0.15)",
              boxShadow:
                "0 0 0 1px rgba(34,211,238,0.08), 0 0 60px rgba(34,211,238,0.10), 0 32px 64px rgba(0,0,0,0.7)",
            }}
          >
            {/* Inline breakpoint override — desktop panel */}
            <style>{`
              @media (min-width: 768px) {
                [role="dialog"][aria-label="Ahmed's Engineering AI Chat Interface"] {
                  top: 1.25rem; right: auto; bottom: 1.25rem; left: 1.25rem;
                  width: min(520px, calc(100vw - 2.5rem));
                  border-radius: 24px;
                  inset: unset;
                  top: 1.25rem; right: auto; bottom: 1.25rem; left: 1.25rem;
                }
              }
            `}</style>

            {/* Corner accent geometry */}
            <svg
              aria-hidden
              className="absolute top-0 right-0 pointer-events-none"
              width={80} height={80}
            >
              <path d="M80 0 L80 80 L60 80" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1" />
              <path d="M80 0 L80 30" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx={80} cy={0} r={3} fill="rgba(34,211,238,0.6)" />
            </svg>
            <svg
              aria-hidden
              className="absolute bottom-0 left-0 pointer-events-none"
              width={80} height={80}
            >
              <path d="M0 80 L0 0 L20 0" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1" />
              <path d="M0 80 L0 50" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx={0} cy={80} r={3} fill="rgba(34,211,238,0.3)" />
            </svg>

            {/* ─── HEADER ─── */}
            <div
              className="relative flex items-center justify-between px-5 py-4 shrink-0"
              style={{
                background: "linear-gradient(180deg, rgba(34,211,238,0.06) 0%, transparent 100%)",
                borderBottom: "1px solid rgba(34,211,238,0.12)",
              }}
            >
              {/* Animated scan-line on header bottom */}
              <ScanLine />

              {/* Left: identity */}
              <div className="flex items-center gap-3 min-w-0">
                {/* AI icon with glow ring */}
                <div className="relative shrink-0">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(34,211,238,0.20) 0%, rgba(6,182,212,0.08) 100%)",
                      border: "1px solid rgba(34,211,238,0.40)",
                      boxShadow: "0 0 18px rgba(34,211,238,0.25), inset 0 0 10px rgba(34,211,238,0.08)",
                    }}
                  >
                    <RadioTower className="h-4 w-4 text-cyan-300" />
                  </div>
                  {/* Online dot */}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2"
                    style={{
                      borderColor: "rgba(8,14,26,0.98)",
                      background: "#22d3ee",
                      boxShadow: "0 0 6px rgba(34,211,238,0.9)",
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2
                      className="text-sm font-bold text-slate-100 truncate"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.02em" }}
                    >
                      AOQ Signal Intelligence
                    </h2>
                    <SignalBars />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Wifi size={9} className="text-cyan-500" />
                    <p
                      className="text-[10px] font-mono text-slate-400 tracking-widest truncate uppercase"
                    >
                      Communication Engineering Copilot · Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: controls */}
              <div className="flex items-center gap-1 shrink-0">
                <motion.button
                  onClick={() => { Sound.click(); onResetChat(); }}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                  style={{ color: "rgba(148,163,184,0.7)" }}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </motion.button>
                <motion.button
                  onClick={() => { Sound.click(); onClose(); }}
                  aria-label="Close chat"
                  whileHover={{ scale: 1.1, color: "#22d3ee" }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                  style={{ color: "rgba(148,163,184,0.7)" }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* ─── STATUS BAR ─── */}
            <div
              className="flex items-center justify-between px-5 py-2 shrink-0"
              style={{ borderBottom: "1px solid rgba(34,211,238,0.06)", background: "rgba(34,211,238,0.02)" }}
            >
              <div className="flex items-center gap-3">
                {[
                  { icon: Signal, label: "RF LINK" },
                  { icon: Zap,    label: "AI CORE" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1">
                    <Icon size={9} className="text-cyan-500" />
                    <span className="text-[9px] font-mono text-cyan-600 tracking-widest uppercase">{label}</span>
                  </div>
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase">
                SPU / KRI
              </span>
            </div>

            {/* ─── MESSAGE AREA ─── */}
            <div
              className="msg-area flex-1 overflow-y-auto px-5 py-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(34,211,238,0.15) transparent" }}
            >
              <style>{`
                [role="dialog"] .msg-area::-webkit-scrollbar { width: 3px; }
                [role="dialog"] .msg-area::-webkit-scrollbar-track { background: transparent; }
                [role="dialog"] .msg-area::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.18); border-radius: 2px; }
              `}</style>

              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isLoading && <ThinkingBubble />}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── SUGGESTED PROMPTS ─── */}
            {messages.length <= 1 && (
              <div
                className="px-4 py-3 shrink-0"
                style={{ borderTop: "1px solid rgba(34,211,238,0.08)", background: "rgba(6,182,212,0.02)" }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={10} className="text-cyan-500" />
                  <span className="text-[9px] font-mono text-cyan-600 tracking-widest uppercase">
                    Start a signal
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handlePromptClick(prompt)}
                      className="rounded-lg px-3 py-1.5 text-[11px] text-left transition-all"
                      style={{
                        background: "rgba(34,211,238,0.05)",
                        border: "1px solid rgba(34,211,238,0.15)",
                        color: "rgba(148,163,184,0.85)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,211,238,0.40)";
                        (e.currentTarget as HTMLButtonElement).style.background  = "rgba(34,211,238,0.10)";
                        (e.currentTarget as HTMLButtonElement).style.color       = "rgba(165,243,252,0.9)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,211,238,0.15)";
                        (e.currentTarget as HTMLButtonElement).style.background  = "rgba(34,211,238,0.05)";
                        (e.currentTarget as HTMLButtonElement).style.color       = "rgba(148,163,184,0.85)";
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── INPUT ─── */}
            <div
              className="px-4 py-3.5 shrink-0"
              style={{
                borderTop: "1px solid rgba(34,211,238,0.12)",
                background: "linear-gradient(0deg, rgba(34,211,238,0.04) 0%, transparent 100%)",
              }}
            >
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Ahmed anything (English / کوردی)..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none disabled:opacity-50 transition-all"
                  style={{
                    background: "rgba(10,18,32,0.90)",
                    border: "1px solid rgba(34,211,238,0.18)",
                    boxShadow: "inset 0 0 12px rgba(34,211,238,0.04)",
                    fontFamily: "system-ui, sans-serif",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34,211,238,0.45)";
                    e.currentTarget.style.boxShadow   = "0 0 0 2px rgba(34,211,238,0.08), inset 0 0 12px rgba(34,211,238,0.06)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34,211,238,0.18)";
                    e.currentTarget.style.boxShadow   = "inset 0 0 12px rgba(34,211,238,0.04)";
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                  aria-label="Send message"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl disabled:opacity-30 transition-all"
                  style={{
                    background: "linear-gradient(135deg, rgba(34,211,238,0.25) 0%, rgba(6,182,212,0.12) 100%)",
                    border: "1px solid rgba(34,211,238,0.40)",
                    boxShadow: "0 0 14px rgba(34,211,238,0.15)",
                    color: "#67e8f9",
                  }}
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>

              {/* Footer tag */}
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span
                  className="text-[9px] font-mono uppercase tracking-widest"
                  style={{ color: "rgba(71,85,105,0.7)" }}
                >
                  Grounded in Ahmed&apos;s engineering portfolio
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
