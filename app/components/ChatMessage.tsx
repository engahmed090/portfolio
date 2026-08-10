"use client";

import { RadioTower } from "lucide-react";
import { Message } from "../hooks/useChat";

interface ChatMessageProps {
  message: Message;
}

// Convert plain text URLs to clickable links safely
function renderFormattedContent(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200 transition-colors break-all"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3 text-xs leading-relaxed my-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-slate-900/80 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
          <RadioTower className="h-3.5 w-3.5" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`relative max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-md transition-all ${
          isUser
            ? "bg-slate-900/90 text-slate-100 border border-slate-700/50 rounded-br-xs"
            : "bg-slate-950/70 text-slate-200 border border-slate-800/80 border-l-2 border-l-cyan-400 backdrop-blur-md rounded-bl-xs shadow-[0_0_20px_rgba(34,211,238,0.04)]"
        }`}
      >
        {/* Message Content */}
        <div className="whitespace-pre-wrap font-sans text-[13px] text-slate-200">
          {renderFormattedContent(message.content)}
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <div
            className={`mt-1.5 text-[9px] font-mono tracking-wider ${
              isUser ? "text-slate-400 text-right" : "text-slate-500 text-left"
            }`}
          >
            {message.timestamp}
          </div>
        )}
      </div>
    </div>
  );
}
