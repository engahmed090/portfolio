"use client";

import { motion, useReducedMotion } from "framer-motion";

const wave = "M0 56 C22 56 22 22 44 22 S66 90 88 56 110 56 110 34 132 34 154 78 176 56 198 56 198 18 220 18 242 86 264 56 286 56";

export default function ProjectTelemetry({ id }: { id: string }) {
  const reduced = useReducedMotion();
  const common = { duration: 5, repeat: Infinity, ease: "linear" as const };

  return (
    <div className={`project-telemetry project-telemetry--${id.toLowerCase()}`} aria-hidden="true">
      <div className="project-telemetry__meta"><span>MODULE / {id}</span><span>DATA STREAM ACTIVE</span></div>
      <svg viewBox="0 0 300 112" preserveAspectRatio="none">
        <path className="telemetry-grid" d="M0 28H300M0 56H300M0 84H300M60 0V112M120 0V112M180 0V112M240 0V112" />
        {id === "P1" && <>
          {[18, 30, 42].map((r, i) => <motion.rect key={r} x={150-r} y={56-r} width={r*2} height={r*2} fill="none" stroke="#67e8f9" strokeOpacity={.55-i*.12} strokeWidth="1" animate={reduced?undefined:{rotate:[0,360]}} style={{transformOrigin:"150px 56px"}} transition={{duration:14+i*4,repeat:Infinity,ease:"linear"}} />)}
          <motion.circle cx="150" cy="56" r="7" fill="#67e8f9" animate={reduced?undefined:{opacity:[.25,1,.25],scale:[.8,1.2,.8]}} transition={{duration:2,repeat:Infinity}} />
          <text x="10" y="103">S11 / −34.8 dB</text><text x="290" y="103" textAnchor="end">ABS / 99.4%</text>
        </>}
        {id === "P2" && <>
          <path d="M150 105V52M137 105h26M142 82h16M145 66h10" stroke="#a5f3fc" fill="none" />
          {[20,38,58].map((r,i)=><motion.path key={r} d={`M${150-r} 52 A${r} ${r} 0 0 1 ${150+r} 52`} fill="none" stroke="#67e8f9" strokeOpacity={.7-i*.16} strokeDasharray="4 6" animate={reduced?undefined:{strokeDashoffset:[0,-40]}} transition={{...common,duration:3+i}}/>)}
          <motion.circle cx="239" cy="34" r="3" fill="#a5f3fc" animate={reduced?undefined:{x:[0,-22,0],y:[0,10,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}/>
          <text x="10" y="103">AZ / 072°</text><text x="290" y="103" textAnchor="end">TRACK / LOCKED</text>
        </>}
        {id === "P3" && <>
          {[[82,34],[124,70],[168,35],[215,70]].map(([x,y],i)=><g key={i}><motion.circle cx={x} cy={y} r="9" fill="none" stroke="#67e8f9" strokeOpacity=".65" animate={reduced?undefined:{r:[7,11,7]}} transition={{duration:2.5,repeat:Infinity,delay:i*.3}}/><circle cx={x} cy={y} r="3" fill="#a5f3fc"/></g>)}
          <path d="M90 39l26 25m16 0l28-24m16 0l31 24" stroke="#67e8f9" strokeOpacity=".45" strokeDasharray="4 5"/>
          <text x="10" y="103">COMPOUND GRAPH</text><text x="290" y="103" textAnchor="end">35 SOURCES</text>
        </>}
        {id === "P4" && <>
          <motion.path d={wave} fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="8 5" animate={reduced?undefined:{strokeDashoffset:[0,-78]}} transition={common}/>
          {[44,88,132,176,220,264].map((x,i)=><motion.circle key={x} cx={x} cy={i%2?56:34} r="3" fill="#a5f3fc" animate={reduced?undefined:{opacity:[.3,1,.3]}} transition={{duration:1.5,repeat:Infinity,delay:i*.18}}/>)}
          <text x="10" y="103">ADC / 12 BIT</text><text x="290" y="103" textAnchor="end">DSP / ONLINE</text>
        </>}
      </svg>
    </div>
  );
}
