"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center gap-4"
        >
          <span className="eyebrow">Contact</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(148,163,184,0.2)] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Heading + CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let&apos;s{" "}
              <span className="pale-gradient">build something</span>{" "}
              together.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
              Whether you&apos;re interested in RF engineering, AI systems, or embedded hardware — I&apos;m open to collaboration, internships, and research opportunities.
            </p>

            {/* Primary WhatsApp CTA */}
            <motion.a
              href="https://wa.me/9647700907212"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="
                inline-flex items-center gap-3
                rounded-2xl px-8 py-4 text-sm font-bold
                bg-slate-100 hover:bg-white text-slate-900
                shadow-[0_0_32px_rgba(241,245,249,0.12),0_8px_24px_rgba(0,0,0,0.4)]
                hover:shadow-[0_0_48px_rgba(241,245,249,0.2),0_12px_32px_rgba(0,0,0,0.5)]
                transition-all duration-300
                group relative overflow-hidden
              "
            >
              {/* Pulse ring on hover */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-sky-200/10 to-violet-200/10" />
              <WaIcon />
              <span className="relative">WhatsApp Me</span>
            </motion.a>
          </motion.div>

          {/* Right: Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {[
              {
                Icon: Mail,
                label: "Email",
                value: "ahmad.tce2223096@spu.edu.iq",
                href: "mailto:ahmad.tce2223096@spu.edu.iq",
              },
              {
                Icon: Phone,
                label: "Phone",
                value: "+964 770 090 7212",
                href: "tel:+9647700907212",
              },
              {
                Icon: MapPin,
                label: "Location",
                value: "Sulaimani, Kurdistan Region, Iraq",
                href: null,
              },
            ].map((item) => {
              const Icon = item.Icon;
              const inner = (
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-slate-200 truncate">{item.value}</div>
                  </div>
                  {item.href && (
                    <ExternalLink className="h-3.5 w-3.5 text-slate-600 group-hover:text-sky-400 transition-colors shrink-0" />
                  )}
                </div>
              );

              return (
                <motion.div key={item.label} variants={itemVariants}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="glass2 card group block rounded-xl p-4 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(56,189,248,0.3)] transition-all"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="glass2 rounded-xl p-4 border border-[rgba(148,163,184,0.12)]">
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
