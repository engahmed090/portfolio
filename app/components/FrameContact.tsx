"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Sound } from "./SoundSystem";

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="14" height="14">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const nodeVariants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function FrameContact() {
  return (
    <div
      id="frame-04"
      style={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4.5rem 2rem 2rem",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Frame label */}
      <div className="coord-label" style={{ position: "absolute", top: "4.5rem", left: "2rem" }}>
        04 / CONTACT
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(1rem, 2.5vh, 1.75rem)",
          maxWidth: 520,
          width: "100%",
        }}
      >

          {/* Identity line */}
          <motion.div
            variants={nodeVariants}
            style={{ textAlign: "center" }}
          >
            <div className="coord-label" style={{ marginBottom: 8 }}>
              INITIATE COMMUNICATION PROTOCOL
            </div>
            <div
              className="mono"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Ahmed Othman Qadir
            </div>
            <div
              className="mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--text-sub)",
                marginTop: 6,
                textTransform: "uppercase",
              }}
            >
              Communication Engineer
            </div>
          </motion.div>

          {/* Signal divider */}
          <motion.div
            variants={nodeVariants}
            style={{
              width: "100%",
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(168,216,240,0.25), transparent)",
            }}
          />

          {/* Contact nodes */}
          <motion.div
            variants={nodeVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
            }}
          >
            {/* Email */}
            <a
              href="mailto:ahmad.tce2223096@spu.edu.iq"
              className="node-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                textDecoration: "none",
              }}
              onMouseEnter={() => Sound.hover()}
              onClick={() => Sound.click()}
            >
              <Mail size={14} style={{ color: "var(--cyan-mid)", flexShrink: 0 }} />
              <div>
                <div className="coord-label" style={{ marginBottom: 2 }}>EMAIL</div>
                <div
                  className="mono"
                  style={{ fontSize: "0.75rem", color: "var(--text-primary)", fontWeight: 600 }}
                >
                  ahmad.tce2223096@spu.edu.iq
                </div>
              </div>
            </a>

            {/* Location */}
            <div
              className="node-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                cursor: "default",
              }}
            >
              <MapPin size={14} style={{ color: "var(--cyan-mid)", flexShrink: 0 }} />
              <div>
                <div className="coord-label" style={{ marginBottom: 2 }}>LOCATION</div>
                <div
                  className="mono"
                  style={{ fontSize: "0.75rem", color: "var(--text-primary)", fontWeight: 600 }}
                >
                  Sulaimani · Kurdistan Region · Iraq
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Primary CTA: WhatsApp — exact markup as specified ── */}
          <motion.div variants={nodeVariants}>
            <a
              href="https://wa.me/9647700907212"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-node"
              onClick={() => Sound.click()}
              onMouseEnter={() => Sound.hover()}
              style={{ position: "relative" }}
            >
              {/* Pulse border animation */}
              <motion.span
                aria-hidden
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: -3,
                  border: "1px solid rgba(168,216,240,0.2)",
                  pointerEvents: "none",
                }}
              />
              <WaIcon />
              Initiate WhatsApp
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={nodeVariants}
            className="coord-label"
            style={{ textAlign: "center", opacity: 0.5, fontSize: "0.55rem" }}
          >
            © 2026 Ahmed Othman Qadir. All rights reserved.
          </motion.div>

      </motion.div>

      {/* Decorative corner marks */}
      {[
        { top: "5rem", left: "2rem"   },
        { top: "5rem", right: "2rem"  },
        { bottom: "2rem", left: "2rem"   },
        { bottom: "2rem", right: "2rem"  },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          style={{
            position: "absolute",
            ...pos,
            width: 6,
            height: 6,
            border: "1px solid rgba(168,216,240,0.18)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Rotating orbit ring */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        aria-hidden
      >
        <motion.circle
          cx="50%" cy="50%" r="180"
          fill="none"
          stroke="rgba(168,216,240,0.04)"
          strokeWidth="1"
          strokeDasharray="8 24"
          animate={{ rotate: [0, 360] }}
          style={{ transformOrigin: "50% 50%" }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
