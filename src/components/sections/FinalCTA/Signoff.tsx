"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Signoff() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="border-t border-[var(--moa-border)] pt-12 
                 flex flex-col lg:flex-row items-center justify-between gap-8"
    >
      <div>
        <p className="font-black tracking-[0.1em] text-xl uppercase mb-1">
          <span className="text-gold-gradient">Mall of America</span>
        </p>
        <p className="text-[var(--moa-muted)] text-xs tracking-wider">
          60 E Broadway · Bloomington, MN 55425
        </p>
      </div>

      <nav className="flex items-center gap-6" aria-label="Footer navigation">
        {["Leasing", "Sponsorship", "Events", "Press", "Careers"].map(
          (link) => (
            <button
              key={link}
              className="text-[var(--moa-muted)] text-xs tracking-widest uppercase 
                       hover:text-[var(--gold)] transition-colors"
            >
              {link}
            </button>
          ),
        )}
      </nav>

      <p className="text-[var(--moa-muted)] text-xs">
        © {new Date().getFullYear()} Mall of America. All rights reserved.
      </p>
    </motion.div>
  );
}
