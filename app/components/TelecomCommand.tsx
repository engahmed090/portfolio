"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Radio, Satellite, Wifi } from "lucide-react";
import LiveSpectrum from "./LiveSpectrum";

const nodes = [
  { x: 46, y: 72, delay: 0 },
  { x: 118, y: 26, delay: .5 },
  { x: 214, y: 58, delay: 1 },
  { x: 270, y: 18, delay: 1.5 },
];

export default function TelecomCommand() {
  const reduced = useReducedMotion();

  return (
    <div className="telecom-command">
      <div className="telecom-command__title">
        <span>NETWORK DIGITAL TWIN</span>
        <span className="telecom-live"><i /> LIVE</span>
      </div>

      <div className="telecom-stage" aria-hidden="true">
        <svg viewBox="0 0 300 120" role="img">
          <defs>
            <linearGradient id="beam" x1="0" x2="1">
              <stop stopColor="#67e8f9" stopOpacity=".55" />
              <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="telecom-grid-line" d="M0 96H300M0 72H300M0 48H300M0 24H300" />
          <path className="telecom-grid-line" d="M50 0V120M100 0V120M150 0V120M200 0V120M250 0V120" />
          <motion.path
            d="M45 71 Q145 -14 286 20"
            fill="none"
            stroke="url(#beam)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            animate={reduced ? undefined : { strokeDashoffset: [0, -72] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M45 71 Q154 130 274 20"
            fill="none"
            stroke="url(#beam)"
            strokeWidth=".7"
            strokeDasharray="3 9"
            animate={reduced ? undefined : { strokeDashoffset: [0, -84] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {nodes.map((node, index) => (
            <g key={index}>
              <motion.circle
                cx={node.x} cy={node.y} r="7" fill="none" stroke="#67e8f9" strokeOpacity=".22"
                animate={reduced ? undefined : { r: [5, 13, 5], opacity: [.8, 0, .8] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: node.delay }}
              />
              <circle cx={node.x} cy={node.y} r="2.6" fill="#a5f3fc" />
            </g>
          ))}
          <g transform="translate(31 72)" stroke="#a5f3fc" fill="none" strokeWidth="1">
            <path d="M14 0L4 39M14 0l10 39M8 24h12M5 38h19M10 13h8" />
          </g>
        </svg>
        <div className="telecom-stage__label label-a">gNB / SLEMANI</div>
        <div className="telecom-stage__label label-b">UE-04</div>
        <div className="telecom-stage__label label-c">LEO LINK</div>
      </div>

      <div className="telecom-kpis">
        <span><Radio size={11} /><b>3.5</b> GHz</span>
        <span><Wifi size={11} /><b>64</b> MIMO</span>
        <span><Satellite size={11} /><b>28</b> GHz</span>
      </div>
      <LiveSpectrum />
    </div>
  );
}
