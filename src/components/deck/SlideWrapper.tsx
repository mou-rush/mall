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
    </motion.div>
  );
}
