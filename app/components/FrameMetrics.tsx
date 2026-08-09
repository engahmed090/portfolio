"use client";

import { motion } from "framer-motion";
import { Globe, Briefcase, Shield, Award, Brain, GraduationCap, Zap } from "lucide-react";
import { Sound } from "./SoundSystem";

// ── Metric HUD badges ──────────────────────────────────────────
const METRICS = [
  { value: "400K+", label: "CST Data Points Generated" },
  { value: "4.5",   label: "ECTS · DTI Germany" },
  { value: "2nd",   label: "Overall Rank · SPU" },
  { value: "1st",   label: "Rank · Year 3 · SPU" },
];

// ── Experience nodes ───────────────────────────────────────────
const EXPERIENCE = [
  { Icon: Briefcase, label: "Huawei",        sub: "via Asiacell ASAS · 2025" },
  { Icon: Zap,       label: "Ericsson",       sub: "Asoy Gash · 2024" },
  { Icon: Shield,    label: "Cisco",          sub: "Cybersecurity · SPU · 2024" },
  { Icon: Globe,     label: "Korek Telecom",  sub: "Field Visit · RBS Systems" },
  { Icon: Globe,     label: "FH Münster",     sub: "DTI Summer School · Germany" },
];

// ── Certificates ──────────────────────────────────────────────
const CERTS = [
  { id: "C1", label: "DTI Summer School",          when: "Aug–Sep 2025", Icon: Globe },
  { id: "C2", label: "ASAS Internship · Asiacell",  when: "Jul–Aug 2025", Icon: Briefcase },
  { id: "C3", label: "ICT & Cybersecurity · Cisco", when: "Aug 2024",     Icon: Shield },
  { id: "C4", label: "Telecom Course · Ericsson",   when: "Jul–Aug 2024", Icon: Award },
  { id: "C5", label: "AI Seminars · 4 Certs",       when: "Mar–May 2026", Icon: Brain },
];

// ── Year rank timeline ─────────────────────────────────────────
const YEAR_RANKS = [
  { yr: "Y1", rank: "3rd" },
  { yr: "Y2", rank: "2nd" },
  { yr: "Y3", rank: "1st", highlight: true },
  { yr: "Y4", rank: "2nd" },
];

const itemVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export default function FrameMetrics() {
  return (
    <div
      id="frame-02"
      style={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "4.5rem 2rem 1.5rem",
        gap: "1.25rem",
        boxSizing: "border-box",
      }}
    >
      {/* ── Frame label ── */}
      <div className="coord-label">02 / METRICS</div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flex: 1, minHeight: 0 }}
      >
        {/* ── Row 1: HUD Metric Badges — uniform 4-col grid ── */}
        <motion.div
          variants={containerVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(0.5rem, 1.5vw, 1rem)",
            flexShrink: 0,
          }}
        >
          {METRICS.map(m => (
            <motion.div
              key={m.value}
              variants={itemVariants}
              className="stat-badge"
              style={{ width: "100%", boxSizing: "border-box" }}
              onMouseEnter={() => Sound.hover()}
            >
              <span className="stat-value" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>
                {m.value}
              </span>
              <span className="stat-label" style={{ fontSize: "clamp(0.5rem, 0.9vw, 0.62rem)", whiteSpace: "normal", lineHeight: 1.3 }}>
                {m.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Row 2: Three-column body ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "clamp(0.75rem, 2vw, 1.5rem)",
            flex: 1,
            minHeight: 0,
            alignItems: "start",
          }}
        >
          {/* ── Col A: Field Exposure ── */}
          <motion.div
            variants={containerVariants}
            style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}
          >
            <div className="coord-label" style={{ marginBottom: 4 }}>FIELD EXPOSURE</div>
            {EXPERIENCE.map(({ Icon, label, sub }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="node-card"
                style={{ padding: "9px 12px", display: "flex", flexDirection: "column", gap: 3 }}
                onMouseEnter={() => Sound.hover()}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon size={10} style={{ color: "var(--cyan-mid)", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)", fontSize: "0.7rem", fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {label}
                  </span>
                </span>
                <span style={{ fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.06em", paddingLeft: 16 }}>
                  {sub}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Col B: Education + Year ranks ── */}
          <motion.div
            variants={containerVariants}
            style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}
          >
            <div className="coord-label" style={{ marginBottom: 4 }}>EDUCATION</div>

            <motion.div
              variants={itemVariants}
              className="node-card"
              style={{ padding: "12px 14px" }}
            >
              <div className="coord-label" style={{ marginBottom: 4 }}>BSc Communication Engineering</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "Space Grotesk, monospace" }}>
                Sulaimani Polytechnic Univ.
              </div>
              <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 3, letterSpacing: "0.1em" }}>
                2022 – 2026
              </div>
            </motion.div>

            {/* Year rank strip */}
            <motion.div variants={containerVariants} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {YEAR_RANKS.map(({ yr, rank, highlight }) => (
                <motion.div
                  key={yr}
                  variants={itemVariants}
                  style={{
                    border: `1px solid ${highlight ? "rgba(168,216,240,0.38)" : "var(--border)"}`,
                    padding: "8px 4px",
                    textAlign: "center",
                    background: highlight ? "rgba(168,216,240,0.06)" : "var(--surface)",
                  }}
                >
                  <div style={{ fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "Space Grotesk, monospace" }}>
                    {yr}
                  </div>
                  <div style={{
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    color: highlight ? "var(--cyan-pale)" : "var(--text-sub)",
                    fontFamily: "Space Grotesk, monospace",
                    lineHeight: 1.1,
                    marginTop: 3,
                  }}>
                    {rank}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Col C: Certificates ── */}
          <motion.div
            variants={containerVariants}
            style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}
          >
            <div className="coord-label" style={{ marginBottom: 4 }}>CERTIFICATES · 5</div>
            {CERTS.map(({ id, label, when, Icon }) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className="node-card"
                style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={() => Sound.hover()}
              >
                <span className="mono" style={{ fontSize: "0.55rem", color: "var(--cyan-mid)", flexShrink: 0, minWidth: 16 }}>
                  {id}
                </span>
                <Icon size={10} style={{ color: "var(--cyan-mid)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.56rem", color: "var(--text-muted)", marginTop: 1 }}>
                    {when}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
