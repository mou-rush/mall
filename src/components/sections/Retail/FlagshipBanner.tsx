"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function FlagshipBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="relative mt-16 w-full h-56 md:h-80 rounded-[2px] overflow-hidden"
    >
      <Image
        src="/images/retail/flagship.png"
        alt="Modern retail flagship store interior at Mall of America"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--moa-surface)] via-transparent to-[var(--moa-surface)] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--moa-surface)] via-transparent to-[var(--moa-surface)] opacity-30" />

      <div className="absolute bottom-6 left-8">
        <p className="eyebrow text-[var(--gold)] mb-1">Available Now</p>
        <p className="text-[var(--moa-white)] text-lg font-light tracking-wide">
          Flagship &amp; Anchor Spaces
        </p>
      </div>
    </motion.div>
  );
}
