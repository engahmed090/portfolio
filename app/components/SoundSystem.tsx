"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// ─── Web Audio synthesis helpers ───────────────────────────────
function createCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext ||
    (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

let _ctx: AudioContext | null = null;
let _muted = true;
let _unlocked = false;

function getCtx(): AudioContext | null {
  if (!_ctx) _ctx = createCtx();
  if (_ctx?.state === "suspended") _ctx.resume().catch(() => {});
  return _ctx;
}

function playTone(freq: number, type: OscillatorType, gainVal: number, durationMs: number, freqEnd?: number) {
  if (_muted || !_unlocked) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const now  = ctx.currentTime;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, now + durationMs / 1000);
    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
    osc.start(now);
    osc.stop(now + durationMs / 1000 + 0.01);
  } catch { /* ignore */ }
}

// ─── Public sound API ──────────────────────────────────────────
export const Sound = {
  click:     () => { playTone(900,  "sine",     0.06, 60,  440); },
  hover:     () => { playTone(660,  "sine",     0.03, 40,  600); },
  frameBlip: () => { playTone(440,  "triangle", 0.05, 120, 220); },
  expand:    () => { playTone(1100, "sine",     0.04, 80,  550); },
};

// ─── Internal unlock helper ────────────────────────────────────
function doUnlock() {
  if (_unlocked) return;
  const ctx = getCtx();
  if (ctx) {
    ctx.resume().then(() => { _unlocked = true; }).catch(() => {});
  } else {
    _unlocked = true;
  }
}

// ─── Unlock on VERY FIRST user gesture — auto, no button needed ─
export function useSoundUnlock() {
  useEffect(() => {
    const unlock = () => doUnlock();

    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown",     unlock, { once: true });
    window.addEventListener("wheel",       unlock, { once: true, passive: true });
    window.addEventListener("touchstart",  unlock, { once: true, passive: true });
    window.addEventListener("scroll",      unlock, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown",     unlock);
      window.removeEventListener("wheel",       unlock);
      window.removeEventListener("touchstart",  unlock);
      window.removeEventListener("scroll",      unlock);
    };
  }, []);
}

// ─── Mute Toggle UI ───────────────────────────────────────────
export function SoundToggle() {
  const [muted, setMuted] = useState(true);

  // Keep local state in sync with module-level _muted
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    _muted = !_muted;
    setMuted(_muted);
    if (!_muted) {
      // Un-muting also unlocks
      doUnlock();
      // Give a small feedback tone
      setTimeout(() => Sound.click(), 50);
    }
  }, []);

  return (
    <button
      ref={btnRef}
      id="sound-toggle"
      onClick={toggle}
      aria-label={muted ? "Enable sound effects" : "Disable sound effects"}
      title={muted ? "Enable sounds" : "Mute sounds"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        border: `1px solid ${muted ? "rgba(148,163,184,0.12)" : "rgba(168,216,240,0.3)"}`,
        background: muted ? "rgba(14,20,32,0.7)" : "rgba(168,216,240,0.06)",
        color: muted ? "#4A5568" : "#A8D8F0",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "all 0.25s ease",
      }}
    >
      {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
    </button>
  );
}
