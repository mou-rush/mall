"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface AnimatedTextProps {
  text: string;
  el?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  variant?: "words" | "line";
  delay?: number;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.07,
      duration: 0.7,
      ease: EASE_OUT_EXPO,
    },
  }),
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

function toWordEntries(
  text: string,
): Array<{ word: string; key: string; order: number }> {
  let offset = 0;
  return text.split(" ").map((word, order) => {
    const key = String(offset);
    offset += word.length + 1;
    return { word, key, order };
  });
}

export default function AnimatedText({
  text,
  el: El = "p",
  className = "",
  variant = "words",
  delay = 0,
}: Readonly<AnimatedTextProps>) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (variant === "line") {
    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay }}
      >
        <El className={className}>{text}</El>
      </motion.div>
    );
  }

  const wordEntries = toWordEntries(text);

  return (
    // @ts-expect-error — polymorphic element ref typing
    <El ref={ref} className={`${className} overflow-hidden`} aria-label={text}>
      {wordEntries.map(({ word, key, order }) => (
        <motion.span
          key={key}
          custom={order}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </El>
  );
}
