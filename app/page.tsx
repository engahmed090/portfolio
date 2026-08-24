"use client";

import AskMeChat from "./components/AskMeChat";
import StructuralDiagramLayer from "./components/StructuralDiagramLayer";
import EngineeringCanvas from "./components/EngineeringCanvas";
import { SoundToggle } from "./components/SoundSystem";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { Volume2, VolumeX } from "lucide-react";

// ─── Ambient Audio toggle button ─────────────────────────────
function AmbientToggle() {
  const { isPlaying, toggle } = useAmbientAudio();
  return (
    <button
      id="ambient-audio-toggle"
      onClick={toggle}
      aria-label={isPlaying ? "Disable ambient audio" : "Enable ambient audio"}
      title={isPlaying ? "Ambient: ON" : "Ambient: OFF"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "4rem",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        border: `1px solid ${isPlaying ? "rgba(168,216,240,0.3)" : "rgba(148,163,184,0.12)"}`,
        background: isPlaying ? "rgba(168,216,240,0.06)" : "rgba(14,20,32,0.7)",
        color: isPlaying ? "#A8D8F0" : "#4A5568",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "all 0.25s ease",
      }}
    >
      {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Deep ambient radial glow — LEFT edge ─────────── */}
      <div
        aria-hidden
        className="ambient-glow-left"
        style={{
          position: "fixed",
          top: "50%",
          left: "-12vw",
          transform: "translateY(-50%)",
          width: "50vw",
          height: "90vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, rgba(8,145,178,0.06) 35%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "ambient-glow-breathe 8s ease-in-out infinite",
        }}
      />

      {/* ── Deep ambient radial glow — RIGHT edge ────────── */}
      <div
        aria-hidden
        className="ambient-glow-right"
        style={{
          position: "fixed",
          top: "50%",
          right: "-12vw",
          transform: "translateY(-50%)",
          width: "50vw",
          height: "90vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(14,116,144,0.10) 0%, rgba(6,182,212,0.05) 35%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "ambient-glow-breathe 10s ease-in-out infinite reverse",
        }}
      />

      {/* ── Top-center accent glow (identity frame) ────── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "-15vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "40vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Fixed persistent structural diagram — always behind everything */}
      <StructuralDiagramLayer />

      {/* Sound toggle — fixed corner */}
      <SoundToggle />

      {/* Ambient audio toggle */}
      <AmbientToggle />

      {/* "Ask Me" AI Chatbot Interface */}
      <AskMeChat />

      {/* Spatial frame canvas — replaces all standard scroll sections */}
      <EngineeringCanvas />
    </>
  );
}
