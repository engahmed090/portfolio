"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    title: "BSc Communication Engineering",
    period: "2022 - 2026",
    detail: "Graduated 2nd overall.",
  },
  {
    title: "DTI Summer School, Germany",
    period: "Aug - Sep 2025",
    detail: "4.5 ECTS.",
  },
  {
    title: "Asiacell ASAS Internship",
    period: "Jul - Aug 2025",
    detail: "Huawei Systems.",
  },
  {
    title: "Telecom Course",
    period: "Jul - Aug 2024",
    detail: "Ericsson RBS.",
  },
  {
    title: "Cisco Lab Training",
    period: "Aug 2024",
    detail: "Cybersecurity & Data Security.",
  },
];

export default function Experience() {
  return (
    <section id="timeline" className="relative py-16 md:py-24" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="eyebrow">Timeline</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
        </motion.div>

        {/* ── Vertical Timeline ── */}
        <div className="relative pl-8 border-l border-[rgba(148,163,184,0.2)] space-y-6">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[39px] top-2 h-3.5 w-3.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] border-2 border-[#080c14]" />

              <div className="glass2 card rounded-xl p-5 border border-[rgba(148,163,184,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3
                    className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono font-medium text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
