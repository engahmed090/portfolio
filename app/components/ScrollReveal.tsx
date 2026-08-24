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
  /** Extra margin before the trigger fires — use negative value to trigger earlier */
  margin?: string;
}

const buildVariants = (direction: Direction, distance: number): Variants => {
  const offset = {
    up:    { y: distance,   x: 0 },
    down:  { y: -distance,  x: 0 },
    left:  { x: distance,   y: 0 },
    right: { x: -distance,  y: 0 },
    fade:  { x: 0,          y: 0 },
  }[direction];

  return {
    hidden: {
      opacity: 0,
      ...offset,
      scale: direction === "fade" ? 0.96 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
  };
};

/**
 * ScrollReveal — buttery-smooth fade-in & slide animation.
 *
 * @example
 * <ScrollReveal direction="up" delay={0.2}>
 *   <YourComponent />
 * </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay    = 0,
  duration = 0.55,
  direction = "up",
  distance  = 28,
  className,
  once      = true,
  margin    = "-60px",
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
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
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}
