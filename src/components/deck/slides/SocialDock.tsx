"use client";

import { motion } from "framer-motion";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ReactNode;
}

interface SocialDockProps {
  readonly isActive: boolean;
  readonly socials: readonly SocialLink[];
}

export default function SocialDock({ isActive, socials }: SocialDockProps) {
  return (
    <div className="absolute left-6 top-1/2 z-40 -translate-y-1/2 md:left-10">
      <motion.div
        initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
        animate={
          isActive
            ? { opacity: 1, x: 0, filter: "blur(0px)" }
            : { opacity: 0, x: -20, filter: "blur(8px)" }
        }
        transition={{ delay: 1.45, duration: 1, ease: EASE_PREMIUM }}
        className="flex flex-col items-center gap-3 rounded-[28px]"
      >
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -8, scale: 0.92 }}
            animate={isActive ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{
              delay: 1.55 + i * 0.08,
              duration: 0.8,
              ease: EASE_PREMIUM,
            }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[rgba(255,255,255,0.05)] text-white/88 shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition-all duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)] md:h-12 md:w-12"
            aria-label={social.label}
          >
            <div className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-0 transition-opacity group-hover:opacity-10" />
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
