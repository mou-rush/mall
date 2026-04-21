"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface EventTileProps {
  readonly title: string;
  readonly desc: string;
  readonly imageSrc: string;
  readonly index: number;
  readonly isActive: boolean;
  readonly offsetClass: string;
}

export default function EventTile({
  title,
  desc,
  imageSrc,
  index,
  isActive,
  offsetClass,
}: EventTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92, rotateX: -8 }}
      animate={
        isActive
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y: 50, scale: 0.92, rotateX: -8 }
      }
      transition={{
        delay: 0.24 + index * 0.08,
        duration: 0.95,
        ease: EASE_OUT_EXPO,
      }}
      whileHover={{ y: -10, scale: 1.03 }}
      className={`group relative h-[23vh] min-h-[185px] overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_26px_80px_rgba(0,0,0,0.46)] ${offsetClass}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority={index < 3}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(19,18,36,0.14)_30%,rgba(10,10,16,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,199,44,0.16),transparent_34%,transparent_58%,rgba(255,0,128,0.20)_100%)] opacity-90" />

      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(255,199,44,0.22), transparent 45%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 40%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.55rem] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
            Event Type
          </span>
          <div className="h-8 w-8 rounded-full border border-white/15 bg-white/8 shadow-[0_0_22px_rgba(255,255,255,0.10)]" />
        </div>

        <div>
          <motion.h3
            className="max-w-[12ch] text-lg font-medium leading-tight text-white md:text-xl"
            animate={isActive ? { y: 0 } : { y: 8 }}
            transition={{ delay: 0.35 + index * 0.06, duration: 0.7 }}
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="mt-3 max-w-[24ch] text-xs leading-relaxed text-white/78 opacity-0 group-hover:opacity-100 md:text-sm"
          >
            {desc}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
