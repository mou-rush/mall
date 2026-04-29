"use client";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionCurtainProps {
  readonly isAnimating: boolean;
  readonly direction?: "left" | "right";
}

export default function TransitionCurtain({
  isAnimating,
  direction = "right",
}: TransitionCurtainProps) {
  const x =
    direction === "right" ? ["-101%", "0%", "101%"] : ["101%", "0%", "-101%"];

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[80] pointer-events-none"
          style={{ background: "var(--gold)", transformOrigin: "left center" }}
          initial={{ x: x[0] }}
          animate={{ x: x[1] }}
          exit={{ x: x[2] }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
