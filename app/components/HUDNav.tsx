"use client";

import { motion } from "framer-motion";
import { Sound } from "./SoundSystem";

export const FRAMES = [
  { id: "01", label: "IDENTITY", href: "#frame-01" },
  { id: "02", label: "METRICS", href: "#frame-02" },
  { id: "03", label: "PROJECTS", href: "#frame-03" },
  { id: "04", label: "CONTACT", href: "#frame-04" },
] as const;

interface HUDNavProps {
  activeFrame: number;
  onFrameSelect: (index: number) => void;
}

export default function HUDNav({ activeFrame, onFrameSelect }: HUDNavProps) {
  return (
    <nav
      aria-label="Frame navigation"
      className="fixed top-3 right-3 sm:top-6 sm:right-7 z-[900] flex flex-col items-end gap-1 select-none"
    >
      {/* Top-right logo / identity marker */}
      <div className="mono text-[9px] sm:text-[10px] tracking-[0.2em] text-slate-400 mb-1">
        AOQ
      </div>

      {/* Frame index items */}
      {FRAMES.map((frame, i) => {
        const isActive = i === activeFrame;
        return (
          <motion.button
            key={frame.id}
            onClick={() => {
              Sound.click();
              onFrameSelect(i);
            }}
            onMouseEnter={() => Sound.hover()}
            aria-label={`Navigate to frame ${frame.id}: ${frame.label}`}
            aria-current={isActive ? "page" : undefined}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 bg-transparent border-none cursor-pointer py-0.5 px-0 text-[10px] sm:text-xs font-mono tracking-wider uppercase ${
              isActive ? "text-cyan-300" : "text-slate-400"
            }`}
          >
            {/* Active indicator line */}
            <motion.div
              animate={{
                width: isActive ? "18px" : "5px",
                background: isActive ? "#67e8f9" : "#64748b",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="h-px rounded-full"
            />

            <span>
              {frame.id} / {frame.label}
            </span>
          </motion.button>
        );
      })}

      {/* Bottom status line */}
      <div className="mono text-[8px] sm:text-[9px] tracking-widest text-slate-500 mt-1 opacity-60">
        FRAME {String(activeFrame + 1).padStart(2, "0")} / 04
      </div>
    </nav>
  );
}
