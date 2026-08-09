"use client";

import { motion } from "framer-motion";

export default function RFBackground() {
  const rings = [0, 1, 2, 3, 4];

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Deep pale gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#0b101c] to-[#080c14]" />

      {/* Subtle tech grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Communication tower SVG — pale silver aesthetic */}
      <svg
        className="absolute right-[5%] bottom-0 w-48 md:w-64 opacity-[0.05]"
        viewBox="0 0 120 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="60" y1="0" x2="20" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="60" y1="0" x2="100" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
        {[40, 80, 120, 160, 200, 240].map((y, i) => {
          const spread = 2 + i * 6.5;
          return (
            <line
              key={y}
              x1={60 - spread}
              y1={y}
              x2={60 + spread}
              y2={y}
              stroke="#94a3b8"
              strokeWidth="1"
            />
          );
        })}
        {[0, 1, 2, 3, 4].map((i) => {
          const y0 = 40 + i * 40;
          const y1 = 80 + i * 40;
          const s0 = 2 + i * 6.5;
          const s1 = 2 + (i + 1) * 6.5;
          return (
            <g key={i}>
              <line x1={60 - s0} y1={y0} x2={60 + s1} y2={y1} stroke="#94a3b8" strokeWidth="0.7" opacity="0.5" />
              <line x1={60 + s0} y1={y0} x2={60 - s1} y2={y1} stroke="#94a3b8" strokeWidth="0.7" opacity="0.5" />
            </g>
          );
        })}
        <line x1="60" y1="0" x2="60" y2="-24" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="60" cy="-27" r="2.5" fill="#38bdf8" />
      </svg>

      {/* Radiating RF wave rings */}
      <div className="absolute right-[12%] md:right-[15%] bottom-[38%] md:bottom-[42%]">
        {rings.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[rgba(148,163,184,0.12)]"
            style={{
              width: (i + 1) * 70,
              height: (i + 1) * 70,
              top: -((i + 1) * 35),
              left: -((i + 1) * 35),
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{
              duration: 4 + i * 0.8,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Soft ambient background radial glows */}
      <div className="absolute top-[10%] left-[10%] h-96 w-96 rounded-full bg-[#1e293b] opacity-[0.15] blur-[100px]" />
      <div className="absolute bottom-[20%] right-[20%] h-80 w-80 rounded-full bg-[#0284c7] opacity-[0.04] blur-[90px]" />
    </div>
  );
}
