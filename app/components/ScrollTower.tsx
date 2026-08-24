"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ScrollTowerProps {
  /** Active frame index (0-based) */
  activeFrame: number;
  /** Total number of frames */
  totalFrames: number;
}

/**
 * ScrollTower — a fixed right-edge vertical laser line with a
 * geometric SVG telecom tower that slides down as frames advance.
 */
export default function ScrollTower({ activeFrame, totalFrames }: ScrollTowerProps) {
  const reduced    = useReducedMotion();
  const progress   = totalFrames > 1 ? activeFrame / (totalFrames - 1) : 0;

  // Line geometry
  const TRACK_H    = 280; // px — visible track height
  const TOWER_H    = 48;  // px — tower SVG height
  const towerY     = progress * (TRACK_H - TOWER_H);

  // Glow line fill height (in %)
  const fillPct    = progress * 100;

  return (
    <div
      aria-hidden
      className="fixed pointer-events-none"
      style={{
        right:  "1.25rem",
        top:    "50%",
        transform: "translateY(-50%)",
        zIndex: 800,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: TRACK_H,
        width: 28,
        userSelect: "none",
      }}
    >
      {/* ── Track rail (background line) ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: 0,
          width: 1.5,
          height: "100%",
          background: "rgba(34,211,238,0.08)",
          borderRadius: 2,
        }}
      />

      {/* ── Filled laser beam (grows downward with progress) ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0"
        style={{
          width: 1.5,
          borderRadius: 2,
          background:
            "linear-gradient(180deg, rgba(34,211,238,0.0) 0%, rgba(34,211,238,0.7) 40%, rgba(34,211,238,1.0) 100%)",
          boxShadow: "0 0 6px rgba(34,211,238,0.7), 0 0 16px rgba(34,211,238,0.3)",
          originY: 0,
        }}
        animate={{ height: `${fillPct}%` }}
        transition={reduced ? { duration: 0 } : { type: "tween", ease: "easeInOut", duration: 0.55 }}
      />

      {/* ── Dot markers for each frame ── */}
      {Array.from({ length: totalFrames }).map((_, i) => {
        const dotY = (i / (totalFrames - 1)) * TRACK_H;
        const isActive = i <= activeFrame;
        return (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              top: dotY,
              width:        isActive ? 5 : 3,
              height:       isActive ? 5 : 3,
              borderRadius: "50%",
              background:   isActive ? "#22d3ee" : "rgba(34,211,238,0.22)",
              boxShadow:    isActive ? "0 0 8px rgba(34,211,238,0.9)" : "none",
              transition:   "all 0.4s ease",
            }}
          />
        );
      })}

      {/* ── Telecom Tower SVG sliding down ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: TOWER_H, height: TOWER_H }}
        animate={{ top: towerY }}
        transition={reduced ? { duration: 0 } : { type: "tween", ease: "easeInOut", duration: 0.55 }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width={TOWER_H}
          height={TOWER_H}
        >
          {/* Glow filter */}
          <defs>
            <filter id="towerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Tower body — vertical mast */}
          <line x1="24" y1="4"  x2="24" y2="44"  stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" filter="url(#towerGlow)" />

          {/* Cross beams */}
          <line x1="18" y1="12" x2="30" y2="12" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="22" x2="34" y2="22" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="10" y1="34" x2="38" y2="34" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />

          {/* Diagonal braces */}
          <line x1="18" y1="12" x2="14" y2="22" stroke="rgba(34,211,238,0.55)" strokeWidth="0.8" />
          <line x1="30" y1="12" x2="34" y2="22" stroke="rgba(34,211,238,0.55)" strokeWidth="0.8" />
          <line x1="14" y1="22" x2="10" y2="34" stroke="rgba(34,211,238,0.55)" strokeWidth="0.8" />
          <line x1="34" y1="22" x2="38" y2="34" stroke="rgba(34,211,238,0.55)" strokeWidth="0.8" />

          {/* Base legs */}
          <line x1="10" y1="34" x2="8"  y2="44" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="38" y1="34" x2="40" y2="44" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />

          {/* Tip antenna bead — pulsing */}
          <motion.circle
            cx={24} cy={4} r={2.5}
            fill="#22d3ee"
            filter="url(#towerGlow)"
            animate={{ opacity: [0.5, 1, 0.5], r: [2, 3, 2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Signal arc 1 */}
          <motion.path
            d="M 17 7 A 8 8 0 0 1 31 7"
            stroke="rgba(34,211,238,0.55)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Signal arc 2 */}
          <motion.path
            d="M 13 4 A 12 12 0 0 1 35 4"
            stroke="rgba(34,211,238,0.30)"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
            animate={{ opacity: [0.1, 0.55, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          />
        </svg>
      </motion.div>

      {/* ── Frame label ── */}
      <motion.div
        className="absolute"
        style={{
          right: 20,
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(34,211,238,0.55)",
          whiteSpace: "nowrap",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
        animate={{ top: Math.max(0, towerY - 4) }}
        transition={reduced ? { duration: 0 } : { type: "tween", ease: "easeInOut", duration: 0.55 }}
      >
        {`0${activeFrame + 1}`}
      </motion.div>
    </div>
  );
}
