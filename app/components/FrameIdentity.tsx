"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Radio, Cpu, Satellite, CircuitBoard, Waves, Activity } from "lucide-react";
import { Sound } from "./SoundSystem";
import Avatar from "./Avatar";
import { MetricBadge, DownloadCVButton } from "./MetricBadge";
import LiveSpectrum from "./LiveSpectrum";

const STACK_TAGS = [
  { Icon: Radio,        label: "RF Systems" },
  { Icon: Cpu,          label: "CST Studio" },
  { Icon: Activity,     label: "AI Dev" },
  { Icon: CircuitBoard, label: "Arduino / Pi" },
  { Icon: Satellite,    label: "Telecom" },
  { Icon: Waves,        label: "Signal Proc" },
];

const RANK_BADGES = [
  { value: "2nd", label: "Overall · SPU · 4 Yrs", highlight: true },
  { value: "1st", label: "Year 3 · SPU",           highlight: true },
];

function TelecomTower() {
  const reduced = useReducedMotion();
  const draw = {
    hidden:  { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 2.6, ease: "easeInOut" }, opacity: { duration: 0.4 } },
    },
  } as const;
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
      <motion.line variants={draw} x1="40" y1="4"  x2="40"  y2="156" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.3 } } } }} x1="24" y1="20"  x2="56" y2="20" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.5 } } } }} x1="18" y1="50"  x2="62" y2="50" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.7 } } } }} x1="10" y1="88"  x2="70" y2="88" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 2.2, ease: "easeInOut", delay: 0.9 } } } }} x1="4"  y1="130" x2="76" y2="130" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.0 } } } }} x1="24" y1="20"  x2="18" y2="50" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.0 } } } }} x1="56" y1="20"  x2="62" y2="50" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.2 } } } }} x1="18" y1="50"  x2="10" y2="88" />
      <motion.line variants={{ ...draw, visible: { ...draw.visible, transition: { ...draw.visible.transition, pathLength: { duration: 1.8, ease: "easeInOut", delay: 1.2 } } } }} x1="62" y1="50"  x2="70" y2="88" />
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

function YagiAntenna() {
  const draw = {
    hidden:  { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.0 + delay * 0.15, ease: "easeInOut" as const, delay },
        opacity:    { duration: 0.3, delay },
      },
    }),
  } as const;
  const elements = [
    { x: 8,  len: 56, delay: 0.2 },
    { x: 20, len: 46, delay: 0.5 },
    { x: 34, len: 38, delay: 0.8 },
    { x: 48, len: 30, delay: 1.1 },
    { x: 60, len: 22, delay: 1.4 },
    { x: 70, len: 16, delay: 1.7 },
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
      <motion.line variants={draw} custom={0} x1="4" y1="35" x2="86" y2="35" strokeWidth="1.6" />
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

function NeuralNet() {
  const reduced = useReducedMotion();
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
          delay: li * 0.3 + a * 0.08 + b * 0.05,
        });
      }
    }
  }
  return (
    <motion.svg viewBox="0 0 80 88" fill="none" width={80} height={88} initial="hidden" animate="visible" aria-hidden>
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
      {layers.flat().map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={4}
          fill="rgba(168,216,240,0.06)"
          stroke="rgba(168,216,240,0.5)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={reduced ? { scale: 1, opacity: 1 } : { scale: [0, 1.15, 1], opacity: [0, 1, 0.7] }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: "easeOut" }}
        />
      ))}
    </motion.svg>
  );
}

const containerVariants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:   { opacity: 0, scale: 0.88, y: 12 },
  visible:  { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 22 } },
};

export default function FrameIdentity() {
  return (
    <div
      id="frame-01"
      className="flex flex-col h-full w-full p-4 pt-14 sm:p-8 lg:p-12 overflow-y-auto overflow-x-hidden relative max-w-7xl mx-auto justify-between"
    >
      {/* Frame label */}
      <div className="coord-label mb-3 sm:mb-6">01 / IDENTITY</div>

      {/* Main content: Responsive Grid / Flex */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:grid lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-12 items-center my-auto w-full"
      >
        {/* Col 1: HUD Avatar */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2.5 shrink-0">
          <Avatar size={128} />
        </motion.div>

        {/* Col 2: Identity text block */}
        <motion.div variants={containerVariants} className="flex flex-col gap-2.5 sm:gap-3 text-center lg:text-left min-w-0 w-full">
          <motion.div variants={itemVariants} className="coord-label">
            ENGINEER / COMMUNICATION
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mono text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-100 tracking-tight break-words"
          >
            Ahmed<br />
            <span className="text-cyan-300">Othman</span><br />
            Qadir
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mono text-[11px] sm:text-xs tracking-[0.2em] text-slate-400 uppercase"
          >
            Communication Engineer · RF / AI Systems
          </motion.div>

          <motion.p variants={itemVariants} className="identity-manifesto">
            I engineer the invisible infrastructure—turning radio waves, intelligent sensing,
            and embedded hardware into systems that can be measured, trusted, and deployed.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider"
          >
            Sulaimani · Kurdistan Region · Iraq
          </motion.div>

          {/* Glowing Rank badges */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-1"
          >
            {RANK_BADGES.map((b) => (
              <motion.div key={b.value} variants={itemVariants}>
                <MetricBadge value={b.value} label={b.label} highlight={b.highlight} />
              </motion.div>
            ))}
          </motion.div>

          {/* Download CV CTA */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mt-2">
            <DownloadCVButton />
          </motion.div>
        </motion.div>

        {/* Col 3: Stack tags */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap lg:flex-col justify-center lg:items-end gap-2 sm:gap-2.5 w-full min-w-0"
        >
          <div className="coord-label w-full lg:w-auto text-center lg:text-right mb-1">CORE STACK</div>
          {STACK_TAGS.map((tag) => {
            const Icon = tag.Icon;
            return (
              <motion.div
                key={tag.label}
                variants={itemVariants}
                className="tag-pill"
                onMouseEnter={() => Sound.hover()}
              >
                <Icon size={10} className="text-cyan-400 shrink-0" />
                {tag.label}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="hidden lg:block absolute right-12 bottom-14 w-[310px]">
        <LiveSpectrum />
      </motion.div>

      {/* SVG Illustrations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="hidden md:flex items-end justify-center gap-8 lg:gap-16 pointer-events-none opacity-50 my-4"
        aria-hidden="true"
      >
        <TelecomTower />
        <YagiAntenna />
        <NeuralNet />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="flex flex-col items-center gap-1.5 pointer-events-none mt-4 sm:mt-0"
      >
        <span className="coord-label text-[9px]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-5 bg-gradient-to-b from-cyan-400 to-transparent"
        />
      </motion.div>
    </div>
  );
}
