"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Radio, Satellite, Cpu, Wifi, CircuitBoard, Waves } from "lucide-react";

const NODES = [
  { id: "rf",      Icon: Radio,        label: "RF Sensing",     x: 55,  y: 12,  delay: 0 },
  { id: "sat",     Icon: Satellite,    label: "Telecom",        x: 82,  y: 35,  delay: 0.6 },
  { id: "cpu",     Icon: Cpu,          label: "AI Systems",     x: 70,  y: 68,  delay: 1.2 },
  { id: "wifi",    Icon: Wifi,         label: "2G/3G/4G",       x: 35,  y: 80,  delay: 1.8 },
  { id: "circuit", Icon: CircuitBoard, label: "Hardware",       x: 8,   y: 50,  delay: 2.4 },
  { id: "waves",   Icon: Waves,        label: "Signal Proc.",   x: 20,  y: 20,  delay: 3.0 },
];

// Pairs of node IDs to connect with SVG lines
const EDGES: [string, string][] = [
  ["rf", "sat"],
  ["sat", "cpu"],
  ["cpu", "wifi"],
  ["wifi", "circuit"],
  ["circuit", "waves"],
  ["waves", "rf"],
  ["rf", "cpu"],
  ["sat", "wifi"],
];

function pct(v: number) { return `${v}%`; }

export default function TechNodeNetwork() {
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Map node ids to their positions (in %)
  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, { x: n.x, y: n.y }]));

  return (
    <div
      className="relative w-full h-full select-none"
      aria-hidden="true"
    >
      {/* SVG connector lines */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.05" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {EDGES.map(([a, b]) => {
          const na = nodeMap[a], nb = nodeMap[b];
          const active = hovered === a || hovered === b;
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={active ? "#38bdf8" : "url(#edgeGrad)"}
              strokeWidth={active ? 0.5 : 0.3}
              strokeOpacity={active ? 0.7 : 0.35}
              strokeDasharray="2 3"
              animate={shouldReduce ? {} : {
                strokeDashoffset: [0, -20],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          );
        })}

        {/* Animated data packets traveling along edges */}
        {!shouldReduce && EDGES.map(([a, b], i) => {
          const na = nodeMap[a], nb = nodeMap[b];
          return (
            <motion.circle
              key={`packet-${a}-${b}`}
              r={0.8}
              fill="#7dd3fc"
              fillOpacity={0.6}
              filter="url(#nodeGlow)"
              animate={{
                cx: [na.x, nb.x, na.x],
                cy: [na.y, nb.y, na.y],
              }}
              transition={{
                duration: 4 + i * 0.7,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Node badges */}
      {NODES.map((node) => {
        const Icon = node.Icon;
        const isHov = hovered === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute z-10"
            style={{ left: pct(node.x), top: pct(node.y), transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay * 0.3, duration: 0.5 }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              animate={shouldReduce ? {} : {
                y: [0, -5, 0],
                scale: isHov ? 1.15 : 1,
              }}
              transition={{
                y: { duration: 3.5 + node.delay, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                scale: { duration: 0.2 },
              }}
              className={`
                relative flex flex-col items-center gap-1 cursor-default
                group
              `}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={shouldReduce ? {} : {
                  boxShadow: isHov
                    ? ["0 0 0px rgba(56,189,248,0)", "0 0 14px rgba(56,189,248,0.5)", "0 0 0px rgba(56,189,248,0)"]
                    : ["0 0 0px rgba(125,211,252,0)", "0 0 8px rgba(125,211,252,0.2)", "0 0 0px rgba(125,211,252,0)"],
                }}
                transition={{ duration: 2.5 + node.delay, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Icon container */}
              <div
                className={`
                  relative flex items-center justify-center rounded-xl
                  w-9 h-9 sm:w-10 sm:h-10
                  border transition-all duration-300
                  ${isHov
                    ? "bg-sky-500/20 border-sky-400/50 text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.3)]"
                    : "bg-slate-800/60 border-slate-600/30 text-slate-400 backdrop-blur-sm"
                  }
                `}
              >
                <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </div>

              {/* Label */}
              <span
                className={`
                  text-[9px] font-mono font-medium tracking-wider
                  transition-colors duration-200 whitespace-nowrap
                  ${isHov ? "text-sky-300" : "text-slate-500"}
                `}
              >
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
