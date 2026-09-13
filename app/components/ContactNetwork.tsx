"use client";

import { motion, useReducedMotion } from "framer-motion";

const points = [[42,150],[96,84],[158,122],[220,54],[278,110],[338,36],[388,142]];

export default function ContactNetwork() {
  const reduced = useReducedMotion();
  return <div className="contact-network" aria-hidden="true">
    <div className="contact-network__head"><span>GLOBAL LINK MAP</span><span>CHANNEL SECURE</span></div>
    <svg viewBox="0 0 430 220">
      <path className="contact-orbit" d="M20 170Q100 5 216 112T410 42" />
      <path className="contact-orbit" d="M20 112Q118 205 220 80T410 154" />
      {points.slice(0,-1).map((p,i)=><motion.line key={i} x1={p[0]} y1={p[1]} x2={points[i+1][0]} y2={points[i+1][1]} stroke="#67e8f9" strokeOpacity=".25" strokeDasharray="4 8" animate={reduced?undefined:{strokeDashoffset:[0,-48]}} transition={{duration:4+i*.5,repeat:Infinity,ease:"linear"}}/>)}
      {points.map((p,i)=><g key={i}><motion.circle cx={p[0]} cy={p[1]} r="12" fill="none" stroke="#67e8f9" strokeOpacity=".22" animate={reduced?undefined:{r:[5,16,5],opacity:[.8,0,.8]}} transition={{duration:2.5,repeat:Infinity,delay:i*.25}}/><circle cx={p[0]} cy={p[1]} r="3" fill="#a5f3fc"/></g>)}
      <g transform="translate(196 80)" stroke="#a5f3fc" fill="none"><path d="M20 20L5 110m15-90l15 90M11 72h18M8 94h24M15 48h10"/><circle cx="20" cy="16" r="3" fill="#a5f3fc"/></g>
      <motion.circle cx="42" cy="150" r="4" fill="#fff" animate={reduced?undefined:{cx:[42,96,158,220,278,338,388],cy:[150,84,122,54,110,36,142]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}/>
    </svg>
    <div className="contact-network__stats"><span><b>99.99%</b> LINK</span><span><b>−62 dBm</b> RSSI</span><span><b>12 ms</b> LATENCY</span></div>
  </div>;
}
