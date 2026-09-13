"use client";

import { motion, useReducedMotion } from "framer-motion";

const bars = [18, 26, 22, 36, 30, 48, 38, 58, 44, 72, 52, 84, 62, 46, 56, 34, 42, 28, 34, 20];

export default function LiveSpectrum() {
  const reduced = useReducedMotion();

  return (
    <div className="spectrum-module" aria-label="Animated radio-frequency spectrum visualisation">
      <div className="spectrum-head">
        <span><i /> LIVE RF SPECTRUM</span>
        <span>2.40 GHz</span>
      </div>
      <div className="spectrum-bars" aria-hidden="true">
        {bars.map((height, index) => (
          <motion.span
            key={`${height}-${index}`}
            style={{ height: `${height}%` }}
            animate={reduced ? undefined : { scaleY: [0.55, 1, 0.72, 0.92] }}
            transition={{ duration: 1.7 + (index % 5) * 0.18, repeat: Infinity, ease: "easeInOut", delay: index * 0.04 }}
          />
        ))}
      </div>
      <div className="spectrum-scale"><span>1 GHz</span><span>FIELD / 01</span><span>6 GHz</span></div>
    </div>
  );
}
