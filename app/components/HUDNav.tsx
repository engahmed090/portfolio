"use client";

import { motion } from "framer-motion";
import { Sound } from "./SoundSystem";

export const FRAMES = [
  { id: "01", label: "IDENTITY", href: "#frame-01" },
  { id: "02", label: "METRICS",  href: "#frame-02" },
  { id: "03", label: "PROJECTS", href: "#frame-03" },
  { id: "04", label: "CONTACT",  href: "#frame-04" },
] as const;

interface HUDNavProps {
  activeFrame: number;
  onFrameSelect: (index: number) => void;
}

export default function HUDNav({ activeFrame, onFrameSelect }: HUDNavProps) {
  return (
    <nav
      aria-label="Frame navigation"
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.75rem",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: "flex-end",
      }}
    >
      {/* Top-right logo / identity marker */}
      <div
        className="mono"
        style={{
          fontSize: "0.58rem",
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
          marginBottom: "10px",
        }}
      >
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
            animate={{
              opacity: isActive ? 1 : 0.4,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "3px 0",
              color: isActive ? "var(--cyan-pale)" : "var(--text-muted)",
            }}
          >
            {/* Active indicator dot */}
            <motion.div
              animate={{
                width: isActive ? "20px" : "6px",
                background: isActive ? "var(--cyan-pale)" : "var(--text-muted)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{ height: "1px", borderRadius: "1px" }}
            />

            {/* Label */}
            <span
              className="mono"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive ? "var(--cyan-pale)" : "var(--text-muted)",
                transition: "color 0.2s ease",
              }}
            >
              {frame.id} / {frame.label}
            </span>
          </motion.button>
        );
      })}

      {/* Bottom status line */}
      <div
        className="mono"
        style={{
          fontSize: "0.5rem",
          letterSpacing: "0.16em",
          color: "var(--text-muted)",
          marginTop: "10px",
          opacity: 0.5,
        }}
      >
        FRAME {String(activeFrame + 1).padStart(2, "0")} / 04
      </div>
    </nav>
  );
}
