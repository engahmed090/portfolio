"use client";

import { motion, type Variants } from "framer-motion";
import { User, Zap, Globe, FlaskConical } from "lucide-react";

const HIGHLIGHTS = [
  {
    Icon: Zap,
    label: "AI + RF",
    text: "Trained 400K+ CST simulation data points for AI cancer & nitrate detection systems.",
  },
  {
    Icon: Globe,
    label: "Global",
    text: "Attended DTI Summer School at FH Münster, Germany — earned 4.5 ECTS credits.",
  },
  {
    Icon: User,
    label: "Industry",
    text: "Hands-on with Huawei (Asiacell ASAS), Ericsson, Cisco, and Korek Telecom RBS systems.",
  },
  {
    Icon: FlaskConical,
    label: "Research",
    text: "Final project: AI-integrated Metamaterial Absorber for biomedical and agricultural sensing.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center gap-4"
        >
          <span className="eyebrow">About</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* ── Profile Bio ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6 leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Communication Engineering graduate building at the intersection of{" "}
              <span className="text-sky-300">RF engineering</span> and{" "}
              <span className="text-sky-300">artificial intelligence</span>.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              <p>
                Communication Engineering graduate from Sulaimani Polytechnic University, consistently
                ranked among the top students — achieving 1st place in third year. Hands-on experience
                with Huawei telecommunications systems through the Asiacell ASAS Internship Program,
                along with practical exposure to Ericsson equipment, Cisco cybersecurity, and
                Arduino-based embedded systems.
              </p>
              <p>
                Attended the DTI Summer School at FH Münster, Germany, earning 4.5 ECTS credits.
                A field visit to Korek Telecom provided practical exposure to real telecom
                infrastructure including RBS systems and RF antenna networks.
              </p>
              <p>
                Final-year project integrates AI with CST software to develop a Metamaterial Absorber
                for cancer and nitrate detection. Passionate about RF engineering, intelligent systems,
                and building AI-driven solutions for real-world problems.
              </p>
            </div>
          </motion.div>

          {/* ── Highlight Cards ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {HIGHLIGHTS.map((h) => {
              const Icon = h.Icon;
              return (
                <motion.div
                  key={h.label}
                  variants={itemVariants}
                  className="glass2 card rounded-xl p-4 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(56,189,248,0.28)] transition-all flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-semibold text-sky-400 uppercase tracking-widest mb-0.5">
                      {h.label}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{h.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* ── Skills Grid ── */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="eyebrow">Skills</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {[
              {
                category: "Telecommunications",
                skills: ["RF Systems", "Antenna Engineering", "Frequency Planning", "2G/3G/4G Networks"],
              },
              {
                category: "Software",
                skills: ["CST Studio", "MATLAB", "Multisim", "Cisco Packet Tracer", "AutoCAD", "PyCharm"],
              },
              {
                category: "AI & Data",
                skills: ["AI System Development", "Data Generation & Training", "Prompt Engineering"],
              },
              {
                category: "Programming",
                skills: ["Python", "C (Arduino)"],
              },
              {
                category: "Hardware",
                skills: ["Arduino", "Raspberry Pi", "Circuit Design & Implementation"],
              },
            ].map((group) => (
              <motion.div
                key={group.category}
                variants={itemVariants}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 rounded-xl glass border border-[rgba(148,163,184,0.1)] hover:border-[rgba(56,189,248,0.2)] transition-all"
              >
                <span className="text-xs font-mono font-semibold text-slate-400 w-36 shrink-0 uppercase tracking-wider">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
