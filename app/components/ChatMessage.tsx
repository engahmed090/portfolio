"use client";

import { motion } from "framer-motion";
import { RadioTower, User } from "lucide-react";
import { Message } from "../hooks/useChat";

interface ChatMessageProps {
  message: Message;
}

// Convert plain text URLs to clickable links safely
function renderContent(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts    = content.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 break-all transition-colors"
          style={{ color: "#67e8f9" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#a5f3fc")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#67e8f9")}
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
      className={`flex w-full gap-2.5 my-2.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI Avatar chip */}
      {!isUser && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl self-end"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(34,211,238,0.35)",
            boxShadow: "0 0 12px rgba(34,211,238,0.18)",
          }}
        >
          <RadioTower className="h-3.5 w-3.5 text-cyan-400" />
        </div>
      )}

      {/* Bubble */}
      <div className={`relative max-w-[82%] sm:max-w-[76%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className="rounded-2xl px-4 py-3 text-[13px] leading-relaxed"
          style={isUser ? {
            // User — solid deep cyan-tinted dark panel
            background: "linear-gradient(135deg, rgba(6,182,212,0.22) 0%, rgba(8,145,178,0.12) 100%)",
            border: "1px solid rgba(34,211,238,0.35)",
            boxShadow: "0 2px 16px rgba(34,211,238,0.08)",
            borderBottomRightRadius: "4px",
            color: "rgba(224,242,254,0.95)",
          } : {
            // AI — glassy translucent dark with left accent bar effect
            background: "rgba(8,14,26,0.75)",
            border: "1px solid rgba(34,211,238,0.14)",
            borderLeft: "2px solid rgba(34,211,238,0.50)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 2px 20px rgba(34,211,238,0.06), inset 0 0 16px rgba(34,211,238,0.02)",
            borderBottomLeftRadius: "4px",
            color: "rgba(203,213,225,0.95)",
          }}
        >
          <div className="whitespace-pre-wrap">
            {renderContent(message.content)}
          </div>
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <div
            className={`text-[9px] font-mono tracking-widest uppercase px-1 ${isUser ? "text-right" : "text-left"}`}
            style={{ color: "rgba(71,85,105,0.7)" }}
          >
            {message.timestamp}
          </div>
        )}
      </div>

      {/* User Avatar chip */}
      {isUser && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl self-end"
          style={{
            background: "rgba(30,41,59,0.8)",
            border: "1px solid rgba(148,163,184,0.18)",
          }}
        >
          <User className="h-3.5 w-3.5 text-slate-400" />
        </div>
      )}
    </motion.div>
  );
}
