"use client";

import { motion } from "framer-motion";
import { Download, Trophy } from "lucide-react";

interface MetricBadgeProps {
  value: string;
  label: string;
  /** Show a stronger glow for top-rank badges */
  highlight?: boolean;
}

/**
 * MetricBadge — premium glowing metallic rank badge.
 * Used for "2nd Overall", "1st Year 3" etc.
 */
export function MetricBadge({ value, label, highlight = false }: MetricBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative flex flex-col items-start p-3 sm:p-4 min-w-[90px] select-none cursor-default overflow-hidden"
      style={{
        background: highlight
          ? "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(6,182,212,0.06) 50%, rgba(14,22,38,0.9) 100%)"
          : "linear-gradient(135deg, rgba(148,163,184,0.08) 0%, rgba(14,22,38,0.85) 100%)",
        border: `1px solid ${highlight ? "rgba(34,211,238,0.45)" : "rgba(148,163,184,0.15)"}`,
        boxShadow: highlight
          ? "0 0 18px rgba(34,211,238,0.18), 0 0 40px rgba(34,211,238,0.06), inset 0 0 12px rgba(34,211,238,0.06)"
          : "0 0 8px rgba(148,163,184,0.05), inset 0 0 6px rgba(148,163,184,0.03)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Shimmer overlay */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none animate-badge-shimmer"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Icon */}
      {highlight && (
        <Trophy
          size={11}
          className="mb-1.5 text-cyan-300"
          strokeWidth={2.5}
        />
      )}

      {/* Value */}
      <span
        className="font-extrabold leading-none tracking-tight"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
          background: highlight
            ? "linear-gradient(135deg, #67e8f9 0%, #a5f3fc 40%, #e0f2fe 70%, #7dd3fc 100%)"
            : "linear-gradient(135deg, #cbd5e1 0%, #e2e8f0 50%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          filter: highlight ? "drop-shadow(0 0 8px rgba(34,211,238,0.6))" : "none",
        }}
      >
        {value}
      </span>

      {/* Label */}
      <span
        className="mt-1.5 uppercase tracking-widest leading-tight"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "0.55rem",
          color: highlight ? "rgba(165,243,252,0.75)" : "rgba(148,163,184,0.6)",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/**
 * DownloadCVButton — highly visible glowing "Download CV" CTA.
 */
export function DownloadCVButton() {
  return (
    <motion.a
      id="download-cv-button"
      href="/Ahmed_Othman_Qadir_CV_Communication_Engineering_2.pdf"
      download
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      animate={{
        boxShadow: [
          "0 0 12px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.08)",
          "0 0 22px rgba(34,211,238,0.50), 0 0 48px rgba(34,211,238,0.18)",
          "0 0 12px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.08)",
        ],
      }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm cursor-pointer select-none relative overflow-hidden group"
      style={{
        background:
          "linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(6,182,212,0.10) 50%, rgba(14,22,38,0.95) 100%)",
        border: "1px solid rgba(34,211,238,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        textDecoration: "none",
      }}
    >
      {/* Hover sweep */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.14) 0%, rgba(6,182,212,0.08) 100%)",
        }}
      />

      <Download
        size={13}
        strokeWidth={2.5}
        className="text-cyan-300 shrink-0 relative z-10"
      />
      <span
        className="relative z-10 font-bold tracking-widest uppercase"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "0.68rem",
          background: "linear-gradient(135deg, #67e8f9 0%, #a5f3fc 60%, #e0f2fe 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 6px rgba(34,211,238,0.5))",
        }}
      >
        Download CV
      </span>
    </motion.a>
  );
}
