"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import AcDcSignal from "./AcDcSignal";
import TechNodeNetwork from "./TechNodeNetwork";

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const STATS = [
  { value: "400K+", label: "CST Simulation Points" },
  { value: "4.5",   label: "ECTS · FH Münster" },
  { value: "Rank 1",label: "Year 3 at SPU" },
  { value: "Rank 2",label: "Overall at SPU" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero zoom-out as user scrolls past
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden:  { opacity: 0, scale: 0.88, y: 24 },
    visible: { opacity: 1, scale: 1,    y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center py-24 lg:py-32 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Scroll-driven zoom-out layer */}
      <motion.div
        className="w-full"
        style={shouldReduce ? {} : { scale: heroScale, opacity: heroOpacity, y: heroY }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-6">

            {/* ── Left: Text Content ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            >
              {/* Location badge */}
              <motion.div variants={itemVariants} className="mb-5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
                  <MapPin className="h-3 w-3 text-sky-500" />
                  Sulaimani · Kurdistan Region · Iraq
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight pale-gradient leading-[1.06] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ahmed<br />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Othman Qadir</span>
              </motion.h1>

              {/* H2 */}
              <motion.h2
                variants={itemVariants}
                className="text-lg sm:text-xl font-medium tracking-wide text-[#94a3b8] mb-6"
              >
                Communication Engineer
              </motion.h2>

              {/* Stat badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
              >
                {STATS.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex flex-col items-center px-3 py-1.5 rounded-lg glass border border-[rgba(56,189,248,0.15)] text-center"
                  >
                    <span
                      className="text-sm font-bold text-sky-300"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {s.value}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 leading-tight">{s.label}</span>
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-white text-slate-900 px-7 py-3.5 text-sm font-bold shadow-[0_0_24px_rgba(241,245,249,0.12)] transition-all"
                >
                  View Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href="https://wa.me/9647700907212"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-xl border border-[rgba(148,163,184,0.25)] px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:border-[rgba(56,189,248,0.4)] hover:bg-[rgba(56,189,248,0.06)] transition-all"
                >
                  <WaIcon />
                  WhatsApp Me
                </motion.a>
              </motion.div>
            </motion.div>

            {/* ── Center: AC/DC Signal Bridge ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden xl:flex items-center justify-center"
            >
              <AcDcSignal />
            </motion.div>

            {/* ── Right: Tech Node Network ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/5 via-slate-500/5 to-violet-500/5 blur-2xl" />

              {/* Profile image — centred in node network */}
              <div className="relative aspect-square w-full max-w-xs mx-auto">
                {/* Profile circle */}
                <div className="absolute inset-[18%] z-20 rounded-full overflow-hidden border-2 border-[rgba(148,163,184,0.25)] shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_24px_rgba(56,189,248,0.08)]">
                  <Image
                    src="/profile.jpg"
                    alt="Ahmed Othman Qadir — Communication Engineer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 200px, 280px"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(8,12,20,0.3)]" />
                </div>

                {/* Ring decorations */}
                <motion.div
                  className="absolute inset-[10%] rounded-full border border-[rgba(56,189,248,0.1)]"
                  animate={shouldReduce ? {} : { rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-[5%] rounded-full border border-dashed border-[rgba(148,163,184,0.07)]"
                  animate={shouldReduce ? {} : { rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />

                {/* TechNodeNetwork overlay */}
                <div className="absolute inset-0 z-10">
                  <TechNodeNetwork />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ opacity: heroOpacity }}
      >
        <span className="text-[9px] font-mono tracking-widest text-slate-600 uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-sky-500/40 to-transparent"
          animate={shouldReduce ? {} : { scaleY: [1, 0.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
