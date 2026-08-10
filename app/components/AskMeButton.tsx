"use client";

import { motion } from "framer-motion";
import { RadioTower } from "lucide-react";
import { Sound } from "./SoundSystem";

interface AskMeButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AskMeButton({ onClick, isOpen }: AskMeButtonProps) {
  return (
    <motion.button
      id="ask-me-trigger-button"
      onClick={() => {
        Sound.click();
        onClick();
      }}
      onMouseEnter={() => Sound.hover()}
      aria-label="Ask Me AI Assistant"
      aria-expanded={isOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: [1, 1.03, 1],
        boxShadow: [
          "0 0 14px rgba(34,211,238,0.18), inset 0 0 10px rgba(34,211,238,0.05)",
          "0 0 24px rgba(34,211,238,0.45), inset 0 0 16px rgba(34,211,238,0.15)",
          "0 0 14px rgba(34,211,238,0.18), inset 0 0 10px rgba(34,211,238,0.05)",
        ],
        borderColor: [
          "rgba(34,211,238,0.25)",
          "rgba(34,211,238,0.55)",
          "rgba(34,211,238,0.25)",
        ],
      }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="fixed top-3 left-3 sm:top-6 sm:left-7 z-[900] flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/30 text-slate-100 cursor-pointer select-none"
    >
      {/* Animated RadioTower Icon */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center text-cyan-400"
      >
        <RadioTower className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />
      </motion.div>

      {/* Button text - EXACTLY "Ask Me" */}
      <span
        className="mono text-xs sm:text-xs font-bold tracking-wider text-cyan-200"
      >
        Ask Me
      </span>

      {/* Online indicator dot */}
      <span className="relative flex h-2 w-2 ml-0.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
      </span>
    </motion.button>
  );
}
