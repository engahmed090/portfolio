"use client";

import { motion } from "framer-motion";
import { Layers, Shield, Leaf, Cpu, ExternalLink } from "lucide-react";
import { Sound } from "./SoundSystem";

interface Project {
  id: string;
  Icon: typeof Layers;
  title: string;
  tag: string;
  link: string | null;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: "P1",
    Icon: Layers,
    title: "Metamaterial AI Absorber",
    tag: "RF + AI sensing — built 0 to 100",
    link: "https://metamaterial-absorber-ai-platform.vercel.app",
    tags: ["CST Studio", "Python AI", "Cancer Detection", "Nitrate Sensing"],
  },
  {
    id: "P2",
    Icon: Shield,
    title: "Smart Anti-Drone Defense",
    tag: "Yagi array — AI threat neutralization",
    link: "https://sulaymaniyahintlairport-ahmed.lovable.app",
    tags: ["Yagi Antennas", "2.4/5.1 GHz", "AI Threat ID", "SLY Airport"],
  },
  {
    id: "P3",
    Icon: Leaf,
    title: "NanoHerbalAI",
    tag: "Veterinary AI decision platform",
    link: "https://herb-vet-pro.vercel.app",
    tags: ["AI Prediction", "35 Papers", "Drug Formulation", "Biomarker Analysis"],
  },
  {
    id: "P4",
    Icon: Cpu,
    title: "Embedded Systems",
    tag: "Hardware + LM741 op-amp signal conditioning",
    link: null,
    tags: ["Arduino", "Raspberry Pi", "LM741 Op-Amp", "ECG Conditioning"],
  },
];

const itemVariants = {
  hidden:  { opacity: 0, scale: 0.90, y: 16 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 24 },
  },
};

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.10, delayChildren: 0.08 } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.Icon;
  return (
    <motion.div
      variants={itemVariants}
      className="node-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "20px 20px",
        height: "100%",
        boxSizing: "border-box",
      }}
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 280, damping: 22 } }}
      onMouseEnter={() => Sound.hover()}
    >
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(168,216,240,0.22)",
            background: "rgba(168,216,240,0.05)",
            flexShrink: 0,
          }}
        >
          <Icon size={14} style={{ color: "var(--cyan-mid)" }} />
        </div>
        <span
          className="mono"
          style={{ fontSize: "0.6rem", color: "var(--cyan-mid)", letterSpacing: "0.16em" }}
        >
          {project.id}
        </span>
        {/* Pulse dot */}
        {project.link && (
          <div
            className="pulse-dot"
            style={{ marginLeft: "auto", opacity: 0.5 }}
          />
        )}
      </div>

      {/* Title */}
      <div style={{ flex: "none" }}>
        <h3
          className="mono"
          style={{
            fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.25,
            margin: 0,
            marginBottom: 6,
          }}
        >
          {project.title}
        </h3>
        <div
          className="coord-label"
          style={{ color: "var(--text-muted)", lineHeight: 1.4 }}
        >
          {project.tag}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} className="tag-pill" style={{ fontSize: "0.58rem" }}>
            {t}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)" }} />

      {/* CTA */}
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-node"
          onClick={() => Sound.click()}
          onMouseEnter={() => Sound.hover()}
          style={{
            justifyContent: "center",
            fontSize: "0.62rem",
            padding: "10px 16px",
            letterSpacing: "0.16em",
          }}
        >
          View Project
          <ExternalLink size={11} style={{ marginLeft: 7, flexShrink: 0 }} />
        </a>
      ) : (
        <div
          className="coord-label"
          style={{
            color: "var(--text-muted)",
            textAlign: "center",
            padding: "10px 0",
            borderTop: "1px solid var(--border)",
            fontStyle: "italic",
          }}
        >
          Hardware Demo · No Live Link
        </div>
      )}
    </motion.div>
  );
}

export default function FrameProjects() {
  return (
    <div
      id="frame-03"
      style={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "4.5rem 2rem 2rem",
        gap: "1.25rem",
        boxSizing: "border-box",
      }}
    >
      {/* Frame label */}
      <div className="coord-label">03 / PROJECTS</div>

      {/* 2×2 card grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "clamp(0.75rem, 2vw, 1.25rem)",
          minHeight: 0,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </motion.div>

      {/* Subtle crosshair lines behind grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <motion.line
          x1="50%" y1="5%" x2="50%" y2="95%"
          stroke="rgba(168,216,240,0.04)" strokeWidth="1" strokeDasharray="6 18"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        />
        <motion.line
          x1="5%" y1="50%" x2="95%" y2="50%"
          stroke="rgba(168,216,240,0.04)" strokeWidth="1" strokeDasharray="6 18"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        />
      </svg>
    </div>
  );
}
