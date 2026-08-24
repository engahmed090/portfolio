"use client";

import { motion } from "framer-motion";
import { Globe, Briefcase, Shield, Award, Brain, Zap } from "lucide-react";
import { Sound } from "./SoundSystem";
import { MetricBadge } from "./MetricBadge";

const METRICS = [
  { value: "400K+", label: "CST Data Points Generated",  highlight: false },
  { value: "4.5",   label: "ECTS · DTI Germany",         highlight: false },
  { value: "2nd",   label: "Overall Rank · SPU",          highlight: true  },
  { value: "1st",   label: "Rank · Year 3 · SPU",         highlight: true  },
];

const EXPERIENCE = [
  { Icon: Briefcase, label: "Huawei",        sub: "via Asiacell ASAS · 2025" },
  { Icon: Zap,       label: "Ericsson",      sub: "Asoy Gash · 2024" },
  { Icon: Shield,    label: "Cisco",         sub: "Cybersecurity · SPU · 2024" },
  { Icon: Globe,     label: "Korek Telecom", sub: "Field Visit · RBS Systems" },
  { Icon: Globe,     label: "FH Münster",    sub: "DTI Summer School · Germany" },
];

const CERTS = [
  { id: "C1", label: "DTI Summer School",        when: "Aug–Sep 2025", Icon: Globe },
  { id: "C2", label: "ASAS Internship · Asiacell",when: "Jul–Aug 2025", Icon: Briefcase },
  { id: "C3", label: "ICT & Cybersecurity · Cisco",when: "Aug 2024",   Icon: Shield },
  { id: "C4", label: "Telecom Course · Ericsson", when: "Jul–Aug 2024", Icon: Award },
  { id: "C5", label: "AI Seminars · 4 Certs",    when: "Mar–May 2026", Icon: Brain },
];

const YEAR_RANKS = [
  { yr: "Y1", rank: "3rd" },
  { yr: "Y2", rank: "2nd" },
  { yr: "Y3", rank: "1st", highlight: true },
  { yr: "Y4", rank: "2nd" },
];

const itemVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 220, damping: 24 } },
};

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export default function FrameMetrics() {
  return (
    <div
      id="frame-02"
      className="flex flex-col h-full w-full p-4 pt-14 sm:p-8 lg:p-12 overflow-y-auto max-w-7xl mx-auto gap-4 sm:gap-6"
    >
      <div className="coord-label">02 / METRICS</div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 sm:gap-6 flex-1"
      >
        {/* Row 1: Glowing HUD Metric Badges */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 shrink-0"
        >
          {METRICS.map((m) => (
            <motion.div
              key={m.value}
              variants={itemVariants}
              onMouseEnter={() => Sound.hover()}
            >
              <MetricBadge
                value={m.value}
                label={m.label}
                highlight={m.highlight}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2: Responsive Columns */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {/* Col A: Field Exposure */}
          <motion.div variants={containerVariants} className="flex flex-col gap-2 w-full min-w-0">
            <div className="coord-label mb-1">FIELD EXPOSURE</div>
            {EXPERIENCE.map(({ Icon, label, sub }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="node-card p-2.5 sm:p-3 flex flex-col gap-1"
                onMouseEnter={() => Sound.hover()}
              >
                <span className="flex items-center gap-2">
                  <Icon size={12} className="text-cyan-400 shrink-0" />
                  <span className="text-slate-100 text-xs sm:text-sm font-bold truncate">{label}</span>
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 pl-5 tracking-wide">{sub}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Col B: Education + Year ranks */}
          <motion.div variants={containerVariants} className="flex flex-col gap-3 w-full min-w-0">
            <div className="coord-label mb-1">EDUCATION</div>

            <motion.div variants={itemVariants} className="node-card p-3 sm:p-4">
              <div className="coord-label mb-1">BSc Communication Engineering</div>
              <div className="text-xs sm:text-sm font-bold text-slate-100 font-mono">
                Sulaimani Polytechnic Univ.
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 tracking-wider">2022 – 2026</div>
            </motion.div>

            {/* Year rank strip */}
            <motion.div variants={containerVariants} className="grid grid-cols-4 gap-2">
              {YEAR_RANKS.map(({ yr, rank, highlight }) => (
                <motion.div
                  key={yr}
                  variants={itemVariants}
                  className={`p-2 text-center rounded-lg border ${
                    highlight
                      ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-200"
                      : "border-slate-800 bg-slate-900/60 text-slate-400"
                  }`}
                  style={highlight ? {
                    boxShadow: "0 0 12px rgba(34,211,238,0.15), inset 0 0 8px rgba(34,211,238,0.06)",
                  } : {}}
                >
                  <div className="text-[9px] font-mono text-slate-400">{yr}</div>
                  <div className="text-sm font-extrabold font-mono mt-0.5">{rank}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Col C: Certificates */}
          <motion.div variants={containerVariants} className="flex flex-col gap-2 w-full min-w-0">
            <div className="coord-label mb-1">CERTIFICATES · 5</div>
            {CERTS.map(({ id, label, when, Icon }) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className="node-card p-2.5 sm:p-3 flex items-center gap-2.5"
                onMouseEnter={() => Sound.hover()}
              >
                <span className="mono text-[10px] text-cyan-400 shrink-0 min-w-[20px] font-bold">{id}</span>
                <Icon size={12} className="text-cyan-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-100 truncate">{label}</div>
                  <div className="text-[10px] text-slate-400">{when}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
