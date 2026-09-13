"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Sound } from "./SoundSystem";
import ContactNetwork from "./ContactNetwork";

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="14" height="14">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
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
      className="flex flex-col items-center justify-center h-full w-full p-4 pt-14 sm:p-8 lg:p-12 overflow-y-auto max-w-7xl mx-auto relative"
    >
      <div className="coord-label absolute top-4 left-4 sm:top-8 sm:left-12">
        04 / CONTACT
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-[minmax(360px,520px)_minmax(420px,1fr)] items-center gap-8 lg:gap-16 w-full my-auto"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
        {/* Identity line */}
        <motion.div variants={nodeVariants} className="text-center">
          <div className="coord-label mb-2">INITIATE COMMUNICATION PROTOCOL</div>
          <div className="mono text-xl sm:text-3xl font-extrabold text-slate-100 tracking-tight break-words">
            Ahmed Othman Qadir
          </div>
          <div className="mono text-[10px] sm:text-xs tracking-[0.2em] text-slate-400 mt-1 uppercase">
            Communication Engineer
          </div>
        </motion.div>

        {/* Signal divider */}
        <motion.div
          variants={nodeVariants}
          className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        />

        {/* Contact nodes */}
        <motion.div variants={nodeVariants} className="flex flex-col gap-3 w-full">
          {/* Email */}
          <a
            href="mailto:ahmad.tce2223096@spu.edu.iq"
            className="node-card flex items-center gap-3 p-3.5 sm:p-4 text-decoration-none min-w-0"
            onMouseEnter={() => Sound.hover()}
            onClick={() => Sound.click()}
          >
            <Mail size={16} className="text-cyan-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="coord-label mb-0.5">EMAIL</div>
              <div className="mono text-xs sm:text-sm font-semibold text-slate-100 truncate break-all">
                ahmad.tce2223096@spu.edu.iq
              </div>
            </div>
          </a>

          {/* Location */}
          <div className="node-card flex items-center gap-3 p-3.5 sm:p-4 min-w-0 cursor-default">
            <MapPin size={16} className="text-cyan-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="coord-label mb-0.5">LOCATION</div>
              <div className="mono text-xs sm:text-sm font-semibold text-slate-100 truncate">
                Sulaimani · Kurdistan Region · Iraq
              </div>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div variants={nodeVariants} className="w-full">
          <a
            href="https://wa.me/9647700907212"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-node relative flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-bold tracking-wider"
            onClick={() => Sound.click()}
            onMouseEnter={() => Sound.hover()}
          >
            <motion.span
              aria-hidden
              animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute -inset-1 border border-cyan-400/20 rounded-xl pointer-events-none"
            />
            <WaIcon />
            Initiate WhatsApp
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={nodeVariants}
          className="coord-label text-center opacity-50 text-[9px] sm:text-[10px] mt-2"
        >
          © 2026 Ahmed Othman Qadir. All rights reserved.
        </motion.div>
        </div>

        <motion.div variants={nodeVariants} className="hidden lg:block w-full">
          <ContactNetwork />
        </motion.div>
      </motion.div>
    </div>
  );
}
