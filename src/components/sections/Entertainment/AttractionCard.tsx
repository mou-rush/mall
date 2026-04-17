"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ArrowIcon from "@/components/ui/ArrowIcon";

interface AttractionCardProps {
  name: string;
  type: string;
  headline: string;
  desc: string;
  color: string;
  image: string;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

export default function AttractionCard({
  name,
  type,
  headline,
  desc,
  color,
  image,
  index,
  isActive,
  onHover,
}: Readonly<AttractionCardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      }}
      onMouseEnter={onHover}
      className="group glass-card rounded-[2px] p-8 lg:p-10 relative overflow-hidden 
                 cursor-default transition-all duration-500
                 hover:border-opacity-50"
      style={{
        borderColor: isActive ? `${color}40` : undefined,
      }}
    >
      <div className="absolute inset-0 transition-opacity duration-700 opacity-20 group-hover:opacity-35">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center rounded-[2px]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--moa-card)] via-[var(--moa-card)]/60 to-transparent" />
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 
                   transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${color}15, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <span
          className="eyebrow text-[0.6rem] inline-block px-3 py-1 rounded-full 
                     border mb-5 transition-all duration-300"
          style={{ borderColor: `${color}60`, color }}
        >
          {type}
        </span>

        <h3
          className="text-[var(--moa-white)] font-light text-2xl lg:text-3xl 
                       mb-3 tracking-[-0.02em] leading-tight"
        >
          {name}
        </h3>

        <p className="mb-4 font-medium" style={{ color }}>
          {headline}
        </p>

        <p className="text-[var(--moa-muted)] text-sm leading-loose">{desc}</p>

        <motion.div
          className="mt-6 flex items-center gap-2 text-sm font-medium 
                     opacity-0 group-hover:opacity-100 transition-all duration-300 
                     translate-y-2 group-hover:translate-y-0"
          style={{ color }}
        >
          <span>Explore Sponsorship</span>
          <ArrowIcon size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}
