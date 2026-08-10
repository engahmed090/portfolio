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
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 24 },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.Icon;
  return (
    <motion.div
      variants={itemVariants}
      className="node-card p-4 sm:p-5 flex flex-col gap-3 h-full min-w-0"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 280, damping: 22 } }}
      onMouseEnter={() => Sound.hover()}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 flex items-center justify-center border border-cyan-400/30 bg-cyan-500/10 rounded-lg shrink-0">
          <Icon size={14} className="text-cyan-400" />
        </div>
        <span className="mono text-xs text-cyan-400 font-bold tracking-wider">{project.id}</span>
        {project.link && <div className="pulse-dot ml-auto opacity-75" />}
      </div>

      {/* Title & Tag */}
      <div>
        <h3 className="mono text-sm sm:text-base font-bold text-slate-100 mb-1 leading-snug break-words">
          {project.title}
        </h3>
        <div className="coord-label text-slate-400 leading-normal">{project.tag}</div>
      </div>

      <div className="flex-1" />

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="tag-pill text-[10px] sm:text-xs">
            {t}
          </span>
        ))}
      </div>

      <div className="h-px bg-slate-800 my-1" />

      {/* CTA */}
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-node justify-center text-xs py-2 tracking-wider"
          onClick={() => Sound.click()}
          onMouseEnter={() => Sound.hover()}
        >
          View Project
          <ExternalLink size={12} className="ml-2 shrink-0" />
        </a>
      ) : (
        <div className="coord-label text-slate-500 text-center py-2 italic border-t border-slate-800">
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
      className="flex flex-col h-full w-full p-4 pt-14 sm:p-8 lg:p-12 overflow-y-auto max-w-7xl mx-auto gap-4 sm:gap-6"
    >
      <div className="coord-label">03 / PROJECTS</div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </motion.div>
    </div>
  );
}
