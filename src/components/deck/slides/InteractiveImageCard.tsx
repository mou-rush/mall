"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface InteractiveImageCardProps {
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly isActive: boolean;
  readonly delay?: number;
  readonly hoverScale?: number;
  readonly hoverY?: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly children?: React.ReactNode;
}

export default function InteractiveImageCard({
  imageSrc,
  imageAlt,
  isActive,
  delay = 0.18,
  hoverScale = 1.03,
  hoverY = -8,
  className = "",
  style,
  priority = false,
  sizes = "(max-width: 1024px) 80vw, 620px",
  children,
}: InteractiveImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, rotate: -10, y: 36 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1, rotate: -4, y: 0 }
          : { opacity: 0, scale: 0.86, rotate: -10, y: 36 }
      }
      transition={{ duration: 1.05, delay, ease: EASE_OUT_EXPO }}
      whileHover={{ scale: hoverScale, rotate: -2, y: hoverY }}
      className={`group relative overflow-hidden ${className}`}
      style={style}
    >
      <motion.div
        className="absolute inset-0"
        animate={
          isActive
            ? { scale: [1, 1.06, 1], y: [0, -10, 0] }
            : { scale: 1, y: 0 }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
      {children}
    </motion.div>
  );
}
