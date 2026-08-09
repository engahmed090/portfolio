"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function SignalWaveBackground() {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="80%" stopColor="#a5b4fc" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          <filter id="bgGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Metamaterial / RF metamaterial grid pattern */}
        <g opacity="0.4">
          {/* Horizontal grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`hgrid-${i}`}
              x1="0"
              y1={i * 80}
              x2="1440"
              y2={i * 80}
              stroke="#1e293b"
              strokeWidth="1"
              strokeOpacity={i % 3 === 0 ? 0.5 : 0.2}
              strokeDasharray={i % 3 === 0 ? "none" : "4 16"}
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`vgrid-${i}`}
              x1={i * 80}
              y1="0"
              x2={i * 80}
              y2="900"
              stroke="#1e293b"
              strokeWidth="1"
              strokeOpacity={i % 3 === 0 ? 0.4 : 0.15}
              strokeDasharray={i % 3 === 0 ? "none" : "4 16"}
            />
          ))}
        </g>

        {/* Background radial glow — upper right corner (signal source) */}
        <circle
          cx="1100"
          cy="180"
          r="380"
          fill="none"
          stroke="url(#wave1Grad)"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        {/* RF Concentric rings emanating from "antenna" point */}
        {!shouldReduce && [120, 220, 320, 420, 520].map((r, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={1150}
            cy={120}
            r={r}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeOpacity={0.05 + (i * 0.005)}
            strokeDasharray="8 24"
            animate={{ strokeDashoffset: [0, -(r * 2)] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Sine wave layers — top region */}
        <motion.path
          d="M0 180 C120 120, 240 240, 360 180 C480 120, 600 240, 720 180 C840 120, 960 240, 1080 180 C1200 120, 1320 240, 1440 180"
          stroke="url(#wave1Grad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#bgGlow)"
          animate={shouldReduce ? {} : { strokeDashoffset: [0, -480] }}
          strokeDasharray="16 8"
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0 220 C180 160, 360 280, 540 220 C720 160, 900 280, 1080 220 C1260 160, 1380 280, 1440 220"
          stroke="url(#wave2Grad)"
          strokeWidth="1"
          fill="none"
          animate={shouldReduce ? {} : { strokeDashoffset: [0, 560] }}
          strokeDasharray="10 14"
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Bottom wave layer */}
        <motion.path
          d="M0 700 C180 640, 360 760, 540 700 C720 640, 900 760, 1080 700 C1260 640, 1380 760, 1440 700"
          stroke="url(#wave1Grad)"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
          animate={shouldReduce ? {} : { strokeDashoffset: [0, -480] }}
          strokeDasharray="12 10"
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        {/* Yagi antenna motif — far left, subtle */}
        <g opacity="0.07" stroke="#94a3b8" strokeWidth="1">
          <line x1="60" y1="400" x2="60" y2="100" />
          {[120, 160, 200, 240, 280, 320, 360].map((y, i) => (
            <line
              key={`yagi-${i}`}
              x1={60 - (24 - i * 3)}
              y1={y}
              x2={60 + (24 - i * 3)}
              y2={y}
            />
          ))}
        </g>

        {/* Subtle top-left radial glow blob */}
        <circle cx="200" cy="300" r="300" fill="#38bdf8" fillOpacity="0.02" />

        {/* Bottom right corner warm accent */}
        <circle cx="1300" cy="800" r="260" fill="#a5b4fc" fillOpacity="0.025" />
      </svg>
    </motion.div>
  );
}
