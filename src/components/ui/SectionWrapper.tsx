"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

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
}: Readonly<SectionWrapperProps>) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
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
