"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;

  noSnap?: boolean;

  dark?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  noSnap = false,
  dark = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={[
        "relative w-full overflow-hidden",
        !noSnap && "scroll-snap-start",
        dark ? "bg-[var(--moa-dark)]" : "bg-[var(--moa-black)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.section>
  );
}
