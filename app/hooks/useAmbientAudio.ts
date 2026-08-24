"use client";

import { useEffect, useRef, useState } from "react";

// ─── Shared AudioContext (reuse same instance as SoundSystem) ────────────────
function getOrCreateCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as typeof window & {
    __portfolioAudioCtx?: AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  if (!w.__portfolioAudioCtx) {
    const Ctor = window.AudioContext || w.webkitAudioContext;
    if (!Ctor) return null;
    w.__portfolioAudioCtx = new Ctor();
  }
  return w.__portfolioAudioCtx;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface AmbientNodes {
  oscillators: OscillatorNode[];
  gainNode: GainNode;
  masterGain: GainNode;
}

// ─── useAmbientAudio ─────────────────────────────────────────────────────────
/**
 * Plays a layered ambient tech drone on first user interaction.
 * Consists of:
 *   - A deep sub-bass sine (55 Hz)
 *   - A mid carrier triangle (110 Hz)
 *   - A barely-audible high shimmer sine (880 Hz at near-zero gain)
 * All fade in slowly over 4 seconds. Returns `{ isPlaying, toggle }`.
 */
export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const nodesRef = useRef<AmbientNodes | null>(null);
  const unlockedRef = useRef(false);
  const startedRef = useRef(false);

  // ── Start ambient layer ──────────────────────────────────────────
  const startAmbient = () => {
    if (startedRef.current) return;
    const ctx = getOrCreateCtx();
    if (!ctx) return;

    ctx.resume().catch(() => {});

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 4); // slow fade-in
    masterGain.connect(ctx.destination);

    const configs: { freq: number; type: OscillatorType; gain: number }[] = [
      { freq: 55,  type: "sine",     gain: 0.07 },   // sub-bass drone
      { freq: 110, type: "triangle", gain: 0.04 },   // mid warmth
      { freq: 220, type: "sine",     gain: 0.02 },   // first harmonic
      { freq: 880, type: "sine",     gain: 0.004 },  // air shimmer
    ];

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(1, ctx.currentTime);
    gainNode.connect(masterGain);

    const oscillators: OscillatorNode[] = configs.map(({ freq, type, gain }) => {
      const osc  = ctx.createOscillator();
      const g    = ctx.createGain();
      g.gain.setValueAtTime(gain, ctx.currentTime);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Subtle frequency drift for organic feel
      osc.frequency.linearRampToValueAtTime(freq * 1.003, ctx.currentTime + 8);
      osc.frequency.linearRampToValueAtTime(freq,          ctx.currentTime + 16);
      osc.connect(g);
      g.connect(gainNode);
      osc.start();
      return osc;
    });

    nodesRef.current = { oscillators, gainNode, masterGain };
    startedRef.current = true;
    setIsPlaying(true);
  };

  // ── Stop ambient layer ───────────────────────────────────────────
  const stopAmbient = () => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    const ctx = getOrCreateCtx();
    if (!ctx) return;
    nodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    setTimeout(() => {
      try {
        nodes.oscillators.forEach((o) => o.stop());
      } catch { /* already stopped */ }
      nodesRef.current = null;
      startedRef.current = false;
    }, 1600);
    setIsPlaying(false);
  };

  // ── Toggle ────────────────────────────────────────────────────────
  const toggle = () => {
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  // ── Unlock on first interaction, then auto-start ──────────────────
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      // Auto-start with a slight delay so the page has settled
      setTimeout(() => startAmbient(), 800);
      // Remove listeners after first interaction
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown",     unlock);
      window.removeEventListener("scroll",      unlock);
      window.removeEventListener("wheel",       unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown",     unlock, { once: true });
    window.addEventListener("scroll",      unlock, { once: true, passive: true });
    window.addEventListener("wheel",       unlock, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown",     unlock);
      window.removeEventListener("scroll",      unlock);
      window.removeEventListener("wheel",       unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Cleanup on unmount ────────────────────────────────────────────
  useEffect(() => {
    return () => {
      const nodes = nodesRef.current;
      if (nodes) {
        try { nodes.oscillators.forEach((o) => o.stop()); } catch { /**/ }
      }
    };
  }, []);

  return { isPlaying, toggle };
}
