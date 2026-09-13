"use client";

import { motion, type Variants } from "framer-motion";
import { Award, Globe, Briefcase, Shield, Brain, GraduationCap } from "lucide-react";

const CERTIFICATES = [
  {
    Icon: Globe,
    title: "Design Technology Innovation (DTI) Summer School",
    issuer: "FH Münster University of Applied Sciences",
    location: "Münster, Germany",
    period: "Aug – Sep 2025",
    badge: "International",
    color: "sky",
    bullets: [
      "Completed an interdisciplinary summer school featuring lectures, workshops, and practical exercises",
      "Covered robotics, AI, VR, coding, 3D printing, prototyping, sustainability, and business innovation",
      "Earned 4.5 ECTS credit points",
    ],
  },
  {
    Icon: Briefcase,
    title: "Asas Internship Program",
    issuer: "Asiacell | ASAS",
    location: "Iraq",
    period: "Jul – Aug 2025",
    badge: "Industry",
    color: "slate",
    bullets: [
      "Gained practical familiarity with telecommunications components and systems used by Asiacell, including several Huawei technologies",
      "Observed and helped address multiple technical issues encountered during the training period",
    ],
  },
  {
    Icon: Shield,
    title: "ICT and Cybersecurity Training Course",
    issuer: "SPU | CISCO LAB",
    location: "Sulaimani, Iraq",
    period: "Aug 2024",
    badge: "Cybersecurity",
    color: "violet",
    bullets: [
      "Trained in cybersecurity protection, ethical hacking, and data security",
      "Instructors from the Polytechnic, Cisco (United States), Iraqi security team, and a Ukrainian cybersecurity company, via a program organized by Cisco",
    ],
  },
  {
    Icon: Award,
    title: "Telecommunication Course",
    issuer: "Asoy Gash Institute",
    location: "Iraq",
    period: "Jul – Aug 2024",
    badge: "Telecom",
    color: "sky",
    bullets: [
      "Certified telecommunications course improving understanding of telecom systems and practical use",
      "Became familiar with the Ericsson system, equipment, and troubleshooting methods used to solve technical issues for companies, especially Halabja Group",
    ],
  },
  {
    Icon: Brain,
    title: "AI Seminars & Scientific Panel",
    issuer: "MegaMind Academy & University of Garmian",
    location: "Iraq",
    period: "Mar – May 2026",
    badge: "AI Research",
    color: "violet",
    bullets: [
      "Earned 4 certificates across specialized webinars and a panel exploring AI integration in academic research, learning, and digital security",
    ],
  },
];

const EDUCATION = {
  Icon: GraduationCap,
  degree: "Bachelor of Science in Communication Engineering",
  institution: "Sulaimani Polytechnic University (SPU)",
  period: "Sep 2022 – Jun 2026",
  ranks: [
    { year: "Year 1", rank: "Ranked 3rd in department" },
    { year: "Year 2", rank: "Ranked 2nd in department" },
    { year: "Year 3", rank: "Ranked 1st in department" },
    { year: "Year 4", rank: "Ranked 2nd in department" },
  ],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.9, y: 24 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const colorMap: Record<string, string> = {
  sky:    "bg-sky-500/10 border-sky-500/20 text-sky-400",
  slate:  "bg-slate-500/10 border-slate-500/20 text-slate-400",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-20 md:py-28" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Education ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="eyebrow">Education</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="glass2 rounded-2xl p-6 sm:p-8 border border-[rgba(148,163,184,0.15)] mb-16 hover:border-[rgba(56,189,248,0.25)] transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                <h3
                  className="text-lg font-bold text-slate-100"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {EDUCATION.degree}
                </h3>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20 shrink-0">
                  {EDUCATION.period}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4">{EDUCATION.institution}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EDUCATION.ranks.map(r => (
                  <div
                    key={r.year}
                    className="rounded-lg bg-slate-800/50 border border-slate-700/40 p-3 text-center"
                  >
                    <div className="text-[10px] font-mono text-slate-500 mb-1">{r.year}</div>
                    <div className="text-xs font-semibold text-slate-200">{r.rank}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Certificates ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="eyebrow">Certificates & Training</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative pl-8 border-l border-[rgba(148,163,184,0.15)] space-y-6"
        >
          {CERTIFICATES.map((cert) => {
            const Icon = cert.Icon;
            const iconClass = colorMap[cert.color] || colorMap.sky;
            return (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[39px] top-5 h-3.5 w-3.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] border-2 border-[#080c14]" />

                <div className="glass2 card rounded-xl p-5 sm:p-6 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(56,189,248,0.3)] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.35)]">

                  <div className="flex items-start gap-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3
                          className="text-base font-bold text-slate-100 group-hover:text-sky-200 transition-colors leading-snug"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] font-mono tracking-widest text-sky-300 uppercase bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                            {cert.badge}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">{cert.period}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{cert.issuer} · {cert.location}</p>
                      <ul className="space-y-1.5">
                        {cert.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-sky-500/50 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
