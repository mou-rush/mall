"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SlideWrapperProps {
  readonly children: ReactNode;
  readonly direction: number;
}

const EASE_OUT: [number, number, number, number] = [0.19, 1, 0.22, 1];
const EASE_IN: [number, number, number, number] = [0.95, 0.05, 0.795, 0.035];

const variants = {
  enter: (d: number) => ({
    opacity: 0,
    scale: 0.96,
    y: d > 0 ? 40 : -40,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
  exit: (d: number) => ({
    opacity: 0,
    scale: 1.03,
    y: d > 0 ? -30 : 30,
    filter: "blur(4px)",
    transition: {
      duration: 0.45,
      ease: EASE_IN,
    },
  }),
};

const wipeVariants = {
  enter: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 1 }),
  center: {
    x: "100%",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, transition: { duration: 0 } },
};

export default function SlideWrapper({
  children,
  direction,
}: SlideWrapperProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 w-full h-full"
    >
      {children}

      <motion.div
        custom={direction}
        variants={wipeVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute inset-0 pointer-events-none z-[60]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold) 49%, var(--gold) 51%, transparent 100%)",
          backgroundSize: "8px 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
        }}
      />
    </motion.div>
  );
}
