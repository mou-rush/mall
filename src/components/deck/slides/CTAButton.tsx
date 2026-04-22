"use client";

import { motion } from "framer-motion";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CTAButtonProps {
  readonly isActive: boolean;
  readonly onNext?: () => void;
}

export default function CTAButton({ isActive, onNext }: CTAButtonProps) {
  return (
    <div className="absolute bottom-8 left-1/2 z-40 w-[min(92vw,520px)] -translate-x-1/2 md:bottom-10">
      <motion.button
        onClick={onNext}
        initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }}
        animate={
          isActive
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }
        }
        transition={{ delay: 1.7, duration: 1.5, ease: EASE_PREMIUM }}
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        className="group relative w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/16 bg-[linear-gradient(135deg,rgba(18,18,24,0.54),rgba(0,0,0,0.26))] px-6 py-5 backdrop-blur-2xl shadow-[0_24px_90px_rgba(0,0,0,0.34)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_30%,rgba(255,199,44,0.22)_50%,transparent_70%,transparent_100%)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out" />
        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/8" />

        <div className="relative flex items-center justify-center gap-5">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] transition-all duration-500 group-hover:border-[var(--gold)] group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] md:h-14 md:w-14">
            <motion.div
              className="absolute inset-[5px] rounded-full border border-[var(--gold)]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-1.5 h-1.5 bg-white group-hover:bg-[var(--gold)] rounded-full"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="absolute inset-0 h-full w-full -rotate-90 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
            >
              <motion.circle
                cx="8"
                cy="8"
                r="7.5"
                stroke="var(--gold)"
                strokeWidth="0.5"
                strokeDasharray="48"
                initial={{ strokeDashoffset: 48 }}
                whileHover={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.1 }}
              />
            </svg>
          </div>
          <div className="flex flex-col items-start pr-2 text-left">
            <span className="text-[0.76rem] uppercase tracking-[0.42em] text-white/95 transition-colors duration-300 group-hover:text-white md:text-[0.82rem]">
              Enter The Mall
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
