"use client";

import { motion } from "framer-motion";
import { MessageSquareText, RadioTower } from "lucide-react";
import { Sound } from "./SoundSystem";

interface AskMeButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AskMeButton({ onClick, isOpen }: AskMeButtonProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[900]"
      style={{ pointerEvents: "auto" }}
    >
      {/* ── Triple-ring pulse halos ───────────────────────── */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: "1.5px solid rgba(34,211,238,0.55)",
          }}
          animate={{
            scale:   [1, 1.65 + i * 0.25],
            opacity: [0.55, 0],
          }}
          transition={{
            duration: 2.2,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── Main button ───────────────────────────────────── */}
      <motion.button
        id="ask-me-trigger-button"
        onClick={() => {
          Sound.click();
          onClick();
        }}
        onMouseEnter={() => Sound.hover()}
        aria-label="Ask Me AI Assistant"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.07, y: -2 }}
        whileTap={{ scale: 0.93 }}
        animate={{
          boxShadow: [
            "0 0 16px rgba(34,211,238,0.22), 0 0 32px rgba(34,211,238,0.08), inset 0 0 12px rgba(34,211,238,0.06)",
            "0 0 32px rgba(34,211,238,0.55), 0 0 72px rgba(34,211,238,0.20), inset 0 0 22px rgba(34,211,238,0.14)",
            "0 0 16px rgba(34,211,238,0.22), 0 0 32px rgba(34,211,238,0.08), inset 0 0 12px rgba(34,211,238,0.06)",
          ],
          borderColor: [
            "rgba(34,211,238,0.30)",
            "rgba(34,211,238,0.70)",
            "rgba(34,211,238,0.30)",
          ],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="ask-ai-trigger relative flex items-center gap-3 px-3 pr-6 py-2.5 rounded-2xl select-none cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.14) 0%, rgba(6,182,212,0.06) 50%, rgba(10,13,18,0.90) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1.5px solid rgba(34,211,238,0.35)",
        }}
      >
        {/* Animated RadioTower Icon */}
        <motion.div
          animate={{ opacity: [0.65, 1, 0.65], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <div className="ask-ai-trigger__icon">
            <RadioTower className="h-5 w-5 text-cyan-200" />
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          </div>
        </motion.div>

        {/* Label */}
        <span
          className="flex flex-col items-start font-bold uppercase leading-none"
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: "0.78rem",
            background:
              "linear-gradient(135deg, #67e8f9 0%, #a5f3fc 60%, #e0f2fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 5px rgba(34,211,238,0.5))",
          }}
        >
          <span className="tracking-[0.18em]">ASK AOQ AI</span>
          <span className="mt-1.5 text-[8px] tracking-[0.2em] opacity-70">RF · AI · ENGINEERING</span>
        </span>

        {/* Online indicator */}
        <span className="relative flex h-2 w-2 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
        <MessageSquareText className="h-4 w-4 text-cyan-300/70" />
      </motion.button>
    </div>
  );
}
