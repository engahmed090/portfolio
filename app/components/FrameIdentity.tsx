"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Radio, Cpu, Satellite, CircuitBoard, Waves, Activity } from "lucide-react";
import { Sound } from "./SoundSystem";

const STACK_TAGS = [
  { Icon: Radio,        label: "RF Systems" },
  { Icon: Cpu,          label: "CST Studio" },
  { Icon: Activity,     label: "AI Dev" },
  { Icon: CircuitBoard, label: "Arduino / Pi" },
  { Icon: Satellite,    label: "Telecom" },
  { Icon: Waves,        label: "Signal Proc" },
];

const RANK_BADGES = [
  { value: "2nd", label: "Overall · SPU · 4 Yrs" },
  { value: "1st", label: "Year 3 · SPU" },
];

// ── Self-drawing SVG: Telecom Tower ──────────────────────────────
function TelecomTower() {
  const reduced = useReducedMotion();
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 2.6, ease: "easeInOut" }, opacity: { duration: 0.4 } },
    },
  };
  return (
    <motion.svg
      viewBox="0 0 80 160"
      fill="none"
      stroke="rgba(168,216,240,0.35)"
      strokeWidth="1.2"
      strokeLinecap="round"
      width={80}
      height={160}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      {/* Mast */}
      <motion.line variants={draw} x1="40" y1="4" x2="40" y2="156" />
      {/* Cross-arms — top to bottom */}
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.3 } } } }} x1="24" y1="20" x2="56" y2="20" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.5 } } } }} x1="18" y1="50" x2="62" y2="50" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.7 } } } }} x1="10" y1="88" x2="70" y2="88" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.9 } } } }} x1="4" y1="130" x2="76" y2="130" />
      {/* Diagonal bracing */}
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.0 } } } }} x1="24" y1="20" x2="18" y2="50" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.0 } } } }} x1="56" y1="20" x2="62" y2="50" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.2 } } } }} x1="18" y1="50" x2="10" y2="88" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.2 } } } }} x1="62" y1="50" x2="70" y2="88" />
      {/* Top antenna element */}
      <motion.circle
        cx={40} cy={8} r={3}
        fill="none"
        stroke="rgba(168,216,240,0.6)"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={reduced ? {} : { opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
      />
    </motion.svg>
  );
}

// ── Self-drawing SVG: Yagi Antenna ───────────────────────────────
function YagiAntenna() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.0 + delay * 0.15, ease: "easeInOut", delay },
        opacity: { duration: 0.3, delay },
      },
    }),
  };
  // Boom + elements: reflector (longest), driven, then directors (shorter)
  const elements = [
    { x: 8,  len: 56, delay: 0.2 },   // reflector
    { x: 20, len: 46, delay: 0.5 },   // driven (split)
    { x: 34, len: 38, delay: 0.8 },   // director 1
    { x: 48, len: 30, delay: 1.1 },   // director 2
    { x: 60, len: 22, delay: 1.4 },   // director 3
    { x: 70, len: 16, delay: 1.7 },   // director 4
  ];
  return (
    <motion.svg
      viewBox="0 0 90 70"
      fill="none"
      stroke="rgba(168,216,240,0.32)"
      strokeWidth="1.2"
      strokeLinecap="round"
      width={90}
      height={70}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      {/* Boom (horizontal) */}
      <motion.line
        variants={draw}
        custom={0}
        x1="4" y1="35" x2="86" y2="35"
        strokeWidth="1.6"
      />
      {/* Elements */}
      {elements.map((el, i) => (
        <motion.line
          key={i}
          variants={draw}
          custom={el.delay}
          x1={el.x} y1={35 - el.len / 2}
          x2={el.x} y2={35 + el.len / 2}
        />
      ))}
    </motion.svg>
  );
}

// ── Self-drawing SVG: Neural Network ─────────────────────────────
function NeuralNet() {
  const reduced = useReducedMotion();
  // Layers: input (3 nodes), hidden (4), output (2)
  const layers = [
    [{ x: 10, y: 20 }, { x: 10, y: 45 }, { x: 10, y: 70 }],
    [{ x: 40, y: 14 }, { x: 40, y: 34 }, { x: 40, y: 54 }, { x: 40, y: 74 }],
    [{ x: 70, y: 32 }, { x: 70, y: 58 }],
  ];
  const edges: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    for (let a = 0; a < layers[li].length; a++) {
      for (let b = 0; b < layers[li + 1].length; b++) {
        edges.push({
          x1: layers[li][a].x, y1: layers[li][a].y,
          x2: layers[li + 1][b].x, y2: layers[li + 1][b].y,
          delay: (li * 0.3 + a * 0.08 + b * 0.05),
        });
      }
    }
  }
  return (
    <motion.svg
      viewBox="0 0 80 88"
      fill="none"
      width={80}
      height={88}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      {/* Edges */}
      {edges.map((e, i) => (
        <motion.line
          key={i}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="rgba(168,216,240,0.18)"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.6, delay: e.delay, ease: "easeOut" }, opacity: { duration: 0.3, delay: e.delay } }}
        />
      ))}
      {/* Nodes */}
      {layers.flat().map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={4}
          fill="rgba(168,216,240,0.06)"
          stroke="rgba(168,216,240,0.5)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={reduced ? { scale: 1, opacity: 1 } : {
            scale: [0, 1.15, 1],
            opacity: [0, 1, 0.7],
          }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: "easeOut" }}
        />
      ))}
    </motion.svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 12 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

export default function FrameIdentity() {
  return (
    <div
      id="frame-01"
      className="frame-grid"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "4.5rem 2rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* ── Frame label ── */}
      <div className="coord-label" style={{ marginBottom: "1.5rem" }}>
        01 / IDENTITY
      </div>

      {/* ── Main content: two-column layout ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "clamp(1.5rem, 4vw, 3.5rem)",
          alignItems: "center",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* ── Col 1: Profile image ── */}
        <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              position: "relative",
              width: "clamp(100px, 12vw, 148px)",
              height: "clamp(100px, 12vw, 148px)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid rgba(168,216,240,0.22)",
                boxShadow: "0 0 28px rgba(127,185,220,0.1)",
                position: "relative",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Ahmed Othman Qadir"
                fill
                className="object-cover object-top"
                priority
                sizes="148px"
              />
              <div
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "linear-gradient(to bottom, transparent 60%, rgba(10,13,18,0.45))",
                }}
              />
            </div>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.14, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", inset: -8, borderRadius: "50%",
                border: "1px solid rgba(168,216,240,0.22)", pointerEvents: "none",
              }}
            />
          </div>
          <div className="coord-label" style={{ textAlign: "center" }}>NODE / ID-000</div>
        </motion.div>

        {/* ── Col 2: Identity text block ── */}
        <motion.div
          variants={containerVariants}
          style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 2vh, 1.25rem)", minWidth: 0 }}
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="coord-label">
            ENGINEER / COMMUNICATION
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="mono"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Ahmed<br />
            <span style={{ color: "var(--cyan-pale)" }}>Othman</span><br />
            Qadir
          </motion.h1>

          {/* Subtitle — exactly "COMMUNICATION ENGINEER" */}
          <motion.div
            variants={itemVariants}
            className="mono"
            style={{
              fontSize: "clamp(0.58rem, 1.1vw, 0.72rem)",
              letterSpacing: "0.22em",
              color: "var(--text-sub)",
              textTransform: "uppercase",
            }}
          >
            Communication Engineer
          </motion.div>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            style={{
              fontSize: "0.6rem",
              color: "var(--text-muted)",
              fontFamily: "Space Grotesk, monospace",
              letterSpacing: "0.12em",
            }}
          >
            Sulaimani · Kurdistan · Iraq
          </motion.div>

          {/* Rank badges — flex row, flows below subtitle naturally */}
          <motion.div
            variants={containerVariants}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "0.25rem" }}
          >
            {RANK_BADGES.map(b => (
              <motion.div key={b.value} variants={itemVariants} className="stat-badge">
                <span className="stat-value">{b.value}</span>
                <span className="stat-label">{b.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Col 3: Stack tags + SVG illustrations ── */}
        <motion.div
          variants={containerVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.5rem, 1.5vh, 1rem)",
            alignItems: "flex-end",
            minWidth: 0,
          }}
        >
          <div className="coord-label" style={{ marginBottom: 2 }}>CORE STACK</div>
          {STACK_TAGS.map(tag => {
            const Icon = tag.Icon;
            return (
              <motion.div
                key={tag.label}
                variants={itemVariants}
                className="tag-pill"
                onMouseEnter={() => Sound.hover()}
              >
                <Icon size={10} style={{ color: "var(--cyan-mid)", flexShrink: 0 }} />
                {tag.label}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── SVG Illustrations row — behind text, pointer-events-none ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(2rem, 5vw, 4rem)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.55,
        }}
        aria-hidden="true"
      >
        <TelecomTower />
        <YagiAntenna />
        <NeuralNet />
      </motion.div>

      {/* ── Connecting SVG lines (behind content) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <motion.line
          x1="16%" y1="50%" x2="22%" y2="50%"
          stroke="rgba(168,216,240,0.1)" strokeWidth="1" strokeDasharray="4 8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        />
        <motion.line
          x1="62%" y1="50%" x2="68%" y2="50%"
          stroke="rgba(168,216,240,0.1)" strokeWidth="1" strokeDasharray="4 8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        />
      </svg>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span className="coord-label">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 20, background: "linear-gradient(to bottom, var(--cyan-mid), transparent)" }}
        />
      </motion.div>
    </div>
  );
}
