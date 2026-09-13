"use client";

import AskMeChat from "./components/AskMeChat";
import StructuralDiagramLayer from "./components/StructuralDiagramLayer";
import EngineeringCanvas from "./components/EngineeringCanvas";
import { SoundToggle } from "./components/SoundSystem";
import SignalWaveBackground from "./components/SignalWaveBackground";

export default function Home() {
  return (
    <>
      {/* ── Deep ambient radial glow — LEFT edge ─────────── */}
      <div
        aria-hidden
        style={{
          position:     "fixed",
          top:          "50%",
          left:         "-12vw",
          transform:    "translateY(-50%)",
          width:        "50vw",
          height:       "90vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, rgba(8,145,178,0.06) 35%, transparent 70%)",
          pointerEvents: "none",
          zIndex:        0,
          animation:    "ambient-glow-breathe 8s ease-in-out infinite",
        }}
      />

      {/* ── Deep ambient radial glow — RIGHT edge ────────── */}
      <div
        aria-hidden
        style={{
          position:     "fixed",
          top:          "50%",
          right:        "-12vw",
          transform:    "translateY(-50%)",
          width:        "50vw",
          height:       "90vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(14,116,144,0.10) 0%, rgba(6,182,212,0.05) 35%, transparent 70%)",
          pointerEvents: "none",
          zIndex:        0,
          animation:    "ambient-glow-breathe 10s ease-in-out infinite reverse",
        }}
      />

      {/* ── Top-center accent glow ────────────────────────── */}
      <div
        aria-hidden
        style={{
          position:     "fixed",
          top:          "-15vh",
          left:         "50%",
          transform:    "translateX(-50%)",
          width:        "60vw",
          height:       "40vh",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex:        0,
        }}
      />

      {/* Fixed structural diagram layer */}
      <SignalWaveBackground />
      <StructuralDiagramLayer />

      <div className="system-rail" aria-hidden="true">
        <span>AOQ / SIGNAL INTELLIGENCE</span>
        <span className="system-rail__status"><i /> AVAILABLE FOR ENGINEERING COLLABORATION</span>
      </div>

      {/* Sound toggle — fixed bottom-right */}
      <SoundToggle />

      {/* AI Chatbot */}
      <AskMeChat />

      {/* Spatial frame canvas */}
      <EngineeringCanvas />
    </>
  );
}
