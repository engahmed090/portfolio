"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import FrameIdentity from "./FrameIdentity";
import FrameMetrics from "./FrameMetrics";
import FrameProjects from "./FrameProjects";
import FrameContact from "./FrameContact";
import HUDNav from "./HUDNav";
import { Sound, useSoundUnlock } from "./SoundSystem";

const FRAMES = [FrameIdentity, FrameMetrics, FrameProjects, FrameContact];
const FRAME_COUNT = FRAMES.length;

// ── Spring config — mechanical/precise, not bouncy ──
const SPRING = { type: "spring" as const, stiffness: 180, damping: 30 };

// ── Per-frame transition variants ──
const frameVariants = {
  entering: (dir: number) => ({
    scale: 0.72,
    opacity: 0,
    filter: "blur(8px)",
    y: dir > 0 ? 40 : -40,
  }),
  active: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { ...SPRING, opacity: { duration: 0.4 }, filter: { duration: 0.35 } },
  },
  exiting: (dir: number) => ({
    scale: 1.08,
    opacity: 0,
    filter: "blur(4px)",
    y: dir > 0 ? -30 : 30,
    transition: { ...SPRING, opacity: { duration: 0.25 }, filter: { duration: 0.22 } },
  }),
};

export default function EngineeringCanvas() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const shouldReduce = useReducedMotion();

  // Unlock audio on first gesture
  useSoundUnlock();

  // ── Navigate to a specific frame ──────────────────────────────
  const goToFrame = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeFrame || isTransitioning) return;
      if (nextIndex < 0 || nextIndex >= FRAME_COUNT) return;
      const dir = nextIndex > activeFrame ? 1 : -1;
      setDirection(dir);
      setIsTransitioning(true);
      Sound.frameBlip();
      setActiveFrame(nextIndex);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [activeFrame, isTransitioning]
  );

  // ── Wheel / scroll handler ─────────────────────────────────────
  const wheelAccum = useRef(0);
  const wheelTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (isTransitioning) return;

      wheelAccum.current += e.deltaY;

      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 120);

      if (Math.abs(wheelAccum.current) > 80) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        goToFrame(activeFrame + dir);
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeFrame, goToFrame, isTransitioning]);

  // ── Keyboard navigation ────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goToFrame(activeFrame + 1);
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  goToFrame(activeFrame - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeFrame, goToFrame]);

  // ── Touch / swipe ─────────────────────────────────────────────
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchStart.current = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      touchStart.current = null;
      if (Math.abs(delta) < 40) return;
      goToFrame(activeFrame + (delta > 0 ? 1 : -1));
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [activeFrame, goToFrame]);

  const CurrentFrame = FRAMES[activeFrame];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
      }}
      aria-label="Engineering canvas"
    >
      {/* HUD Nav — always on top */}
      <HUDNav activeFrame={activeFrame} onFrameSelect={goToFrame} />

      {/* Frame renderer with zoom transitions */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeFrame}
          custom={direction}
          variants={shouldReduce ? {} : frameVariants}
          initial="entering"
          animate="active"
          exit="exiting"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
          }}
        >
          <CurrentFrame />
        </motion.div>
      </AnimatePresence>

      {/* Frame progress indicators — bottom center dots */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          zIndex: 1000,
          alignItems: "center",
        }}
        role="tablist"
        aria-label="Frame indicators"
      >
        {FRAMES.map((_, i) => (
          <motion.button
            key={i}
            role="tab"
            aria-selected={i === activeFrame}
            aria-label={`Frame ${i + 1}`}
            onClick={() => goToFrame(i)}
            onMouseEnter={() => Sound.hover()}
            animate={{
              width: i === activeFrame ? 24 : 6,
              background: i === activeFrame ? "var(--cyan-pale)" : "rgba(148,163,184,0.25)",
              opacity: i === activeFrame ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              height: 3,
              border: "none",
              cursor: "pointer",
              borderRadius: 2,
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
