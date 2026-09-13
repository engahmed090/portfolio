"use client";

import { useEffect } from "react";

// ─── Web Audio synthesis helpers ───────────────────────────────
function createCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext ||
    (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

let _ctx: AudioContext | null = null;
const _muted = false;
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
  click:     () => { playTone(740, "sine", .025, 85, 520); },
  hover:     () => { playTone(520, "sine", .012, 55, 610); },
  frameBlip: () => { playTone(196, "sine", .035, 240, 392); setTimeout(() => playTone(587, "sine", .018, 180, 784), 65); },
  expand:    () => { playTone(392, "triangle", .025, 180, 659); },
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
    const unlock = () => { doUnlock(); setTimeout(() => Sound.expand(), 40); };

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
