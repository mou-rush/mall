"use client";

import {memo} from "react";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SocialItem {
  readonly label: string;
  readonly href: string;
  readonly icon: ReactNode;
}

interface SocialDockProps {
  readonly isActive: boolean;
  readonly socials: ReadonlyArray<SocialItem>;
}

const dockVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delayChildren: 1.15,
      staggerChildren: 0.12,
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

export default memo(function SocialDock({ isActive, socials }: SocialDockProps) {
  return (
    <motion.div
      variants={dockVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className="absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 md:right-8 lg:flex"
    >
      <div className="flex flex-col gap-3 rounded-[28px] border border-[var(--gold)]/30 bg-[linear-gradient(135deg,rgba(8,16,35,0.72),rgba(0,0,0,0.35))] px-3 py-3 text-[var(--gold)] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.38)]">
        {socials.map((social) => (
          <motion.a
            key={social.label}
            variants={itemVariants}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/18 bg-white/[0.03] text-[var(--gold)] transition-all duration-300 hover:border-[var(--gold)]/60 hover:bg-[rgba(255,199,44,0.08)] hover:text-[#FFD86B] hover:shadow-[0_0_30px_rgba(255,199,44,0.4)]"
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {social.icon}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
});
