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
      </svg>

      {/* Very subtle radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #0A0D12 100%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
