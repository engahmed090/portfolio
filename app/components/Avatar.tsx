"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Avatar — profile picture wrapped in a futuristic rotating HUD ring
 * with animated telecom-style radio wave arcs.
 *
 * @param size — px size of the avatar circle (default 144)
 */
interface AvatarProps {
  size?: number;
  className?: string;
}

function RadioArc({ r, delay, ccw = false }: { r: number; delay: number; ccw?: boolean }) {
  const circumference = 2 * Math.PI * r;
  const dash = circumference * 0.18; // 18% visible arc
  return (
    <motion.circle
      cx={0}
      cy={0}
      r={r}
      fill="none"
      stroke="rgba(34,211,238,0.35)"
      strokeWidth={1}
      strokeLinecap="round"
      strokeDasharray={`${dash} ${circumference - dash}`}
      initial={{ strokeDashoffset: 0, opacity: 0 }}
      animate={{
        strokeDashoffset: ccw ? [0, circumference] : [0, -circumference],
        opacity: [0, 0.7, 0.4, 0.7, 0],
      }}
      transition={{
        strokeDashoffset: {
          duration: 6 + delay,
          repeat: Infinity,
          ease: "linear",
        },
        opacity: {
          duration: 6 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    />
  );
}

export default function Avatar({ size = 144, className = "" }: AvatarProps) {
  const reduced = useReducedMotion();
  const half     = size / 2;
  const svgSize  = size + 72; // extra space for rings
  const svgHalf  = svgSize / 2;

  // Ring radii
  const r1 = half + 14; // inner dashed HUD ring
  const r2 = half + 28; // outer subtle arc ring
  const r3 = half + 42; // outermost radio arc

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: svgSize, height: svgSize }}
    >
      {/* ── SVG ring layer ── */}
      <svg
        viewBox={`${-svgHalf} ${-svgHalf} ${svgSize} ${svgSize}`}
        width={svgSize}
        height={svgSize}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        {/* Dashed HUD ring — slow rotation */}
        {!reduced && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx={0} cy={0} r={r1}
              fill="none"
              stroke="rgba(34,211,238,0.28)"
              strokeWidth={1.2}
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            {/* Corner accent dots on ring */}
            {[0, 90, 180, 270].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <circle
                  key={angle}
                  cx={r1 * Math.cos(rad)}
                  cy={r1 * Math.sin(rad)}
                  r={2.2}
                  fill="rgba(34,211,238,0.7)"
                />
              );
            })}
          </motion.g>
        )}

        {/* Counter-rotating thin ring */}
        {!reduced && (
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx={0} cy={0} r={r2}
              fill="none"
              stroke="rgba(34,211,238,0.10)"
              strokeWidth={0.8}
              strokeDasharray="2 18"
            />
          </motion.g>
        )}

        {/* Radio-wave arcs (telecom accent) */}
        {!reduced && (
          <>
            <RadioArc r={r2} delay={0}   ccw={false} />
            <RadioArc r={r3} delay={1.5} ccw={true}  />
          </>
        )}

        {/* Glow circle behind avatar */}
        <circle
          cx={0} cy={0} r={half + 4}
          fill="none"
          stroke="rgba(34,211,238,0.18)"
          strokeWidth={6}
          filter="url(#avatarGlow)"
        />

        {/* Glow filter def */}
        <defs>
          <filter id="avatarGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ── Profile image ── */}
      <div
        className="relative overflow-hidden rounded-full z-10 shrink-0"
        style={{
          width: size,
          height: size,
          border: "1.5px solid rgba(34,211,238,0.45)",
          boxShadow:
            "0 0 22px rgba(34,211,238,0.22), 0 0 60px rgba(34,211,238,0.08), inset 0 0 16px rgba(34,211,238,0.04)",
        }}
      >
        <Image
          src="/profile.jpg"
          alt="Ahmed Othman Qadir"
          fill
          className="object-cover object-top"
          priority
          sizes={`${size}px`}
        />
        {/* Inner vignette */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(10,13,18,0.45) 100%)",
          }}
        />
      </div>

      {/* NODE label */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(148,163,184,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        NODE / ID-000
      </span>
    </div>
  );
}
