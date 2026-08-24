"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Pre-computed static angle endpoints — avoids SSR/client float mismatch
const POLAR_ANGLES_12 = [
  { cos: 1.00, sin: 0.00 }, { cos: 0.87, sin: 0.50 },
  { cos: 0.50, sin: 0.87 }, { cos: 0.00, sin: 1.00 },
  { cos: -0.50, sin: 0.87 }, { cos: -0.87, sin: 0.50 },
  { cos: -1.00, sin: 0.00 }, { cos: -0.87, sin: -0.50 },
  { cos: -0.50, sin: -0.87 }, { cos: 0.00, sin: -1.00 },
  { cos: 0.50, sin: -0.87 }, { cos: 0.87, sin: -0.50 },
];

// Polar plot: concentric circles + radial lines
function PolarPlot({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const reduced = useReducedMotion();
  const rings = [0.25, 0.5, 0.75, 1].map(f => Math.round(f * r * 100) / 100);
  return (
    <g opacity="0.9">
      {rings.map((radius, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={reduced ? {} : { rotate: i % 2 === 0 ? [0, 360] : [0, -360] }}
          transition={{ duration: 80 + i * 20, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="0.5"
            strokeOpacity={0.08 + i * 0.02}
            strokeDasharray={i % 2 === 0 ? "none" : "3 8"}
          />
        </motion.g>
      ))}
      {POLAR_ANGLES_12.map((a, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={Math.round((cx + a.cos * r) * 100) / 100}
          y2={Math.round((cy + a.sin * r) * 100) / 100}
          stroke="#94A3B8"
          strokeWidth="0.4"
          strokeOpacity="0.07"
        />
      ))}
      <circle cx={cx} cy={cy} r={3} fill="#7FB9DC" fillOpacity="0.25" />
    </g>
  );
}


// Smith chart approximation (r=220 pre-computed to avoid SSR mismatch)
// Resistance circles at rv = [0, 0.5, 1, 2, 5]: cr = 220/(1+rv), ccx = cx+220-cr
const SMITH_R_CIRCLES = [
  { cr: 220, ccx_offset: 0   },
  { cr: 147, ccx_offset: 73  },
  { cr: 110, ccx_offset: 110 },
  { cr: 73,  ccx_offset: 147 },
  { cr: 37,  ccx_offset: 183 },
];
// Reactance arcs at xv = [0.5, 1, 2, -0.5, -1, -2]: cr = |220/xv|, sign
const SMITH_X_ARCS = [
  { cr: 440, sign: -1 },
  { cr: 220, sign: -1 },
  { cr: 110, sign: -1 },
  { cr: 440, sign:  1 },
  { cr: 220, sign:  1 },
  { cr: 110, sign:  1 },
];

function SmithChart({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const reduced = useReducedMotion();
  return (
    <g opacity="0.7">
      {/* Outer boundary */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#94A3B8" strokeWidth="0.6" strokeOpacity="0.1" />

      {/* Real-axis line */}
      <line
        x1={cx - r} y1={cy} x2={cx + r} y2={cy}
        stroke="#94A3B8" strokeWidth="0.4" strokeOpacity="0.08"
      />

      {/* Resistance circles */}
      {SMITH_R_CIRCLES.map(({ cr, ccx_offset }, i) => (
        <circle
          key={`r${i}`}
          cx={cx + ccx_offset} cy={cy} r={cr}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="0.4"
          strokeOpacity="0.07"
        />
      ))}

      {/* Reactance arcs */}
      {SMITH_X_ARCS.map(({ cr, sign }, i) => (
        <motion.circle
          key={`x${i}`}
          cx={cx + r} cy={cy + sign * cr} r={cr}
          fill="none"
          stroke="#A8D8F0"
          strokeWidth="0.35"
          strokeOpacity="0.06"
          strokeDasharray="4 12"
          animate={reduced ? {} : { strokeDashoffset: [0, -80] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </g>
  );
}


// Node mesh: pre-computed static coords (no SSR mismatch)
const MESH_NODES = [
  { x: 173, y: 162 }, { x: 403, y: 585 }, { x: 605, y: 225 },
  { x: 792, y: 648 }, { x: 979, y: 342 }, { x: 1123, y: 720 },
  { x: 1267, y: 198 }, { x: 1368, y: 495 }, { x: 504, y: 792 },
  { x: 936, y: 90  }, { x: 115, y: 405 }, { x: 259, y: 828 },
];

const MESH_EDGES: [number, number][] = [
  [0, 2], [0, 10], [1, 2], [1, 3], [2, 4], [2, 9],
  [3, 4], [3, 5], [4, 6], [5, 7], [6, 7], [6, 9],
  [7, 11], [8, 11], [1, 8], [10, 0], [11, 1],
];

function NodeMesh() {
  const reduced = useReducedMotion();
  return (
    <g>
      {MESH_EDGES.map(([a, b], i) => {
        const na = MESH_NODES[a], nb = MESH_NODES[b];
        return (
          <motion.line
            key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="#94A3B8"
            strokeWidth="0.5"
            strokeOpacity="0.09"
            strokeDasharray="4 10"
            animate={reduced ? {} : { strokeDashoffset: [0, -56] }}
            transition={{ duration: 8 + i * 0.7, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
      {MESH_NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={2.5}
          fill="#94A3B8"
          fillOpacity="0.12"
          animate={reduced ? {} : { r: [2.5, 3.5, 2.5], fillOpacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </g>
  );
}


export default function StructuralDiagramLayer() {
  const canvasRef = useRef<SVGSVGElement>(null);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <svg
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Smith chart — upper left quadrant */}
        <SmithChart cx={260} cy={280} r={220} />

        {/* Polar plot — lower right */}
        <PolarPlot cx={1180} cy={680} r={200} />

        {/* Secondary polar — upper right, smaller */}
        <PolarPlot cx={1280} cy={160} r={110} />

        {/* Node mesh — full canvas */}
        <NodeMesh />

        {/* Horizontal scan line */}
        <motion.line
          x1="0" y1="450" x2="1440" y2="450"
          stroke="#7FB9DC"
          strokeWidth="0.6"
          strokeOpacity="0.06"
          strokeDasharray="20 60"
          animate={{ strokeDashoffset: [0, -240] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner coordinates */}
        <text x="16" y="24" fontSize="8" fill="#4A5568" fontFamily="Space Grotesk, monospace" letterSpacing="2">
          X:0.00  Y:0.00
        </text>
        <text x="1380" y="24" fontSize="8" fill="#4A5568" fontFamily="Space Grotesk, monospace" letterSpacing="2" textAnchor="end">
          X:1.00  Y:0.00
        </text>
        <text x="16" y="892" fontSize="8" fill="#4A5568" fontFamily="Space Grotesk, monospace" letterSpacing="2">
          X:0.00  Y:1.00
        </text>

        {/* ── TELECOM ACCENT: Satellite Dish — bottom left ── */}
        <g transform="translate(80, 720)" opacity="0.22">
          {/* Dish parabola */}
          <path
            d="M -40 0 Q 0 -55 40 0"
            stroke="#7FB9DC"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Dish arm */}
          <line x1="0" y1="0" x2="0" y2="-30" stroke="#7FB9DC" strokeWidth="1" />
          <circle cx="0" cy="-32" r="2.5" fill="#7FB9DC" />
          {/* Mount pole */}
          <line x1="0" y1="0" x2="0" y2="24" stroke="#7FB9DC" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-12" y1="24" x2="12" y2="24" stroke="#7FB9DC" strokeWidth="1" />
          {/* Signal arcs emanating */}
          {[14, 22, 30].map((r, i) => (
            <motion.path
              key={i}
              d={`M ${-r} ${-r * 0.4} A ${r} ${r} 0 0 1 ${r} ${-r * 0.4}`}
              stroke="#A8D8F0"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 5"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </g>

        {/* ── TELECOM ACCENT: RF Concentric Arcs — upper right ── */}
        <g transform="translate(1360, 200)" opacity="0.18">
          {[20, 34, 48, 62].map((r, i) => (
            <motion.path
              key={i}
              d={`M ${-r} 0 A ${r} ${r} 0 0 1 0 ${-r}`}
              stroke="#A8D8F0"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
          <circle cx={0} cy={0} r={3} fill="#7FB9DC" fillOpacity="0.5" />
        </g>

        {/* ── TELECOM ACCENT: Circuit node cluster — mid right ── */}
        <g transform="translate(1390, 520)" opacity="0.15">
          {[
            { x: 0, y: 0 }, { x: 28, y: -18 }, { x: 28, y: 18 },
            { x: -28, y: -18 }, { x: -28, y: 18 }, { x: 0, y: -36 },
          ].map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x} cy={n.y} r={i === 0 ? 5 : 3}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="0.8"
              animate={{ r: i === 0 ? [5, 6, 5] : [3, 3.8, 3], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          {/* Connecting traces */}
          {[
            [0,0, 28,-18], [0,0, 28,18], [0,0, -28,-18],
            [0,0, -28,18], [0,0, 0,-36],
          ].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.4"
              strokeDasharray="3 4"
            />
          ))}
        </g>

        {/* ── TELECOM ACCENT: Miniature telecom tower — bottom right ── */}
        <g transform="translate(1300, 600)" opacity="0.14">
          <line x1="0" y1="0" x2="0" y2="100" stroke="#7FB9DC" strokeWidth="1.2" />
          <line x1="-16" y1="20" x2="16" y2="20" stroke="#7FB9DC" strokeWidth="1" />
          <line x1="-26" y1="46" x2="26" y2="46" stroke="#7FB9DC" strokeWidth="1" />
          <line x1="-36" y1="76" x2="36" y2="76" stroke="#7FB9DC" strokeWidth="1" />
          <line x1="-16" y1="20" x2="-26" y2="46" stroke="#7FB9DC" strokeWidth="0.6" />
          <line x1="16"  y1="20" x2="26"  y2="46" stroke="#7FB9DC" strokeWidth="0.6" />
          <line x1="-26" y1="46" x2="-36" y2="76" stroke="#7FB9DC" strokeWidth="0.6" />
          <line x1="26"  y1="46" x2="36"  y2="76" stroke="#7FB9DC" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="2.5" fill="#7FB9DC" fillOpacity="0.5" />
        </g>

      </svg>

      {/* Very subtle radial vignette */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #0A0D12 100%)",
          opacity:    0.6,
        }}
      />
    </div>
  );
}

