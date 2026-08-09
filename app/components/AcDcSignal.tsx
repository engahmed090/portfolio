"use client";

import { motion } from "framer-motion";

export default function AcDcSignal() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[260px] lg:max-w-[300px] h-24 my-2 lg:my-0 pointer-events-none select-none shrink-0">
      {/* Subtle glow backing */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-400/5 via-sky-400/10 to-slate-400/5 blur-xl rounded-full opacity-60" />

      {/* Pale cybernetic header telemetry */}
      <div className="flex items-center justify-between w-full px-1 mb-1 text-[9px] font-mono font-medium tracking-widest text-[#94a3b8] uppercase">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" />
          ~ AC (SINE WAVE)
        </span>
        <span className="flex items-center gap-1.5 text-slate-400">
          = DC (LINE BIAS)
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        </span>
      </div>

      <svg
        className="w-full h-14 overflow-visible"
        viewBox="0 0 300 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="acGradientPale" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="dcGradientPale" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
          </linearGradient>

          <filter id="paleSignalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- AC SINE WAVE (Pale pulsing sine wave) --- */}
        <path
          d="M 0 16 C 25 0, 50 32, 75 16 C 100 0, 125 32, 150 16 C 175 0, 200 32, 225 16 C 250 0, 275 32, 300 16"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
        />

        <motion.path
          d="M 0 16 C 25 0, 50 32, 75 16 C 100 0, 125 32, 150 16 C 175 0, 200 32, 225 16 C 250 0, 275 32, 300 16"
          stroke="url(#acGradientPale)"
          strokeWidth="2"
          fill="none"
          filter="url(#paleSignalGlow)"
          strokeDasharray="12 6"
          animate={{ strokeDashoffset: [0, -160] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        <motion.circle
          cx={0}
          cy={16}
          r={3.5}
          fill="#7dd3fc"
          filter="url(#paleSignalGlow)"
          animate={{
            cx: [0, 75, 150, 225, 300],
            cy: [16, 16, 16, 16, 16],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        {/* --- DC SIGNAL (Solid glowing straight line) --- */}
        <line
          x1="0"
          y1="38"
          x2="300"
          y2="38"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeOpacity="0.15"
          filter="url(#paleSignalGlow)"
        />
        <line
          x1="0"
          y1="38"
          x2="300"
          y2="38"
          stroke="url(#dcGradientPale)"
          strokeWidth="1.5"
          strokeDasharray="6 3 16 3"
        />

        <motion.circle
          cx={0}
          cy={38}
          r={3}
          fill="#e2e8f0"
          filter="url(#paleSignalGlow)"
          animate={{ cx: [0, 300], cy: [38, 38] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Terminal nodes bridging left & right */}
        <circle cx="0" cy="16" r="3" fill="#7dd3fc" />
        <circle cx="300" cy="16" r="3" fill="#94a3b8" />
        <circle cx="0" cy="38" r="3" fill="#64748b" />
        <circle cx="300" cy="38" r="3" fill="#cbd5e1" />
      </svg>

      {/* Sub-label */}
      <div className="flex items-center justify-between w-full px-1 text-[8px] font-mono text-slate-500">
        <span>[INPUT: TEXT]</span>
        <span className="text-slate-400 font-medium">RF / BIAS SIGNAL</span>
        <span>[OUTPUT: STAGE]</span>
      </div>
    </div>
  );
}
