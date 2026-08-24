"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  once?: boolean;
  /** Extra margin before the trigger fires — negative = trigger earlier */
  margin?: string;
}

const buildVariants = (direction: Direction, distance: number): Variants => {
  const offset = {
    up:    { y: distance,  x: 0 },
    down:  { y: -distance, x: 0 },
    left:  { x: distance,  y: 0 },
    right: { x: -distance, y: 0 },
    fade:  { x: 0,         y: 0 },
  }[direction];

  return {
    hidden:  { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

/**
 * ScrollReveal — smooth tween-based fade-in & slide animation.
 * Uses type:"tween" + easeOut to prevent spring jitter/bounce.
 */
export default function ScrollReveal({
  children,
  delay     = 0,
  duration  = 0.5,
  direction = "up",
  distance  = 24,
  className,
  once      = true,
  margin    = "-40px",
}: ScrollRevealProps) {
  const reduced  = useReducedMotion();
  const variants = buildVariants(direction, distance);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{
        type:     "tween",    // ← no spring, no bounce, no jitter
        ease:     "easeOut",
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
