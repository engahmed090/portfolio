"use client";

import { motion } from "framer-motion";
import { ExternalLink, Layers, Shield, Leaf, Cpu, Brain, Antenna } from "lucide-react";

const PROJECTS = [
  {
    Icon: Layers,
    title: "Metamaterial AI Absorber",
    badge: "Graduation Project",
    description:
      "Self-developed RF + AI system, built entirely from scratch (0 to 100). Generated 400,000+ CST simulation data points and trained an AI system in Python to simplify and accelerate engineering workflows. Performs cancer detection (via patient blood analysis) and nitrate detection in fruits/food products, includes a dedicated AI chatbot tab and automated report generation.",
    link: "https://metamaterial-absorber-ai-platform.vercel.app",
    tags: ["CST Studio", "Python AI", "RF Engineering", "Biomedical"],
    featured: true,
  },
  {
    Icon: Shield,
    title: "Smart Anti-Drone RF Defense",
    badge: "Defense Tech",
    description:
      "Designed and simulated to protect sensitive locations in Sulaymaniyah, modeled over Sulaymaniyah International Airport. Uses four directional Yagi antennas covering 1,600 m², neutralizing drones by transmitting a high-power noise signal at the drone's frequency to sever its control link. Includes an AI layer for real-time threat assessment, drone-type identification, and proximity monitoring, targeting 2.4 GHz and 5.1 GHz while avoiding interference with civilian infrastructure.",
    link: "https://sulaymaniyahintlairport-ahmed.lovable.app",
    tags: ["Yagi Antennas", "2.4/5.1 GHz", "AI Threat Assessment", "RF Defense"],
    featured: false,
  },
  {
    Icon: Leaf,
    title: "NanoHerbalAI Platform",
    badge: "Medical AI",
    description:
      "AI-powered veterinary decision system built from scratch on 35 peer-reviewed papers, covering antiviral, antimicrobial, antioxidant, anti-inflammatory, and expectorant herbal compounds. Features an AI prediction model for combined-compound efficacy, an evidence-grounded AI chatbot with full paper-backed traceability, and a references module. Core modules: Drug Selector, Formulation Builder, Formula Engine, Drug Comparison, Biomarker Analysis, and Stability Timeline.",
    link: "https://herb-vet-pro.vercel.app",
    tags: ["AI Prediction", "Veterinary", "35 Peer-Reviewed Papers", "Drug Formulation"],
    featured: false,
  },
  {
    Icon: Cpu,
    title: "Embedded Systems & Signal Processing",
    badge: "Hardware & Signals",
    description:
      "Hands-on embedded systems projects using Arduino Nano, Uno, and Raspberry Pi (C and Python), including a small radar system, a mobile-controlled remote car, a sensor-driven autonomous car, a digital timer, and a portable public-space alarm system. Also includes analog circuit projects using the LM741 op-amp IC: an ECG signal conditioning circuit to filter and reduce noise from heart signal recordings, and a function generator producing sine, square, and triangular waveforms.",
    link: null,
    tags: ["Arduino", "Raspberry Pi", "LM741 Op-Amp", "ECG Conditioning"],
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 28 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center gap-4"
        >
          <span className="eyebrow">Featured Projects</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {PROJECTS.map((p) => {
            const Icon = p.Icon;
            return (
              <motion.div
                key={p.title}
                variants={cardVariants}
                whileHover={p.featured ? { y: -6 } : { y: -4 }}
                className={`
                  glass2 card group relative rounded-2xl p-7 flex flex-col
                  border shadow-[0_6px_32px_rgba(0,0,0,0.4)]
                  hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]
                  transition-all duration-300
                  ${p.featured
                    ? "border-[rgba(56,189,248,0.2)] hover:border-[rgba(56,189,248,0.45)]"
                    : "border-[rgba(148,163,184,0.13)] hover:border-[rgba(56,189,248,0.3)]"
                  }
                `}
              >
                {/* Featured glow accent */}
                {p.featured && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/5 via-transparent to-violet-500/5 pointer-events-none" />
                )}

                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`
                    flex h-11 w-11 items-center justify-center rounded-xl border
                    ${p.featured
                      ? "bg-sky-500/15 border-sky-500/30 text-sky-300"
                      : "bg-sky-500/10 border-sky-500/20 text-sky-400"
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold tracking-widest text-sky-300 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                    {p.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-bold text-slate-100 mb-3 group-hover:text-sky-200 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Link */}
                <div className="pt-4 border-t border-[rgba(148,163,184,0.1)]">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-200 transition-colors group/link"
                    >
                      View Project
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono italic">
                      Hardware Demo — No Live Link
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
