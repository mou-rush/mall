"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import type { IconComponent } from "@/lib/types";

interface CTACardProps {
  icon: IconComponent;
  title: string;
  desc: string;
  cta: string;
  color: string;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

export default function CTACard({
  icon: Icon,
  title,
  desc,
  cta,
  color,
  index,
  isActive,
  onSelect,
}: Readonly<CTACardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      }}
      className={`glass-card rounded-[2px] p-8 lg:p-10 relative overflow-hidden 
                  cursor-pointer transition-all duration-500
                  ${isActive ? "border-opacity-60 scale-[1.01]" : "hover:border-opacity-30"}`}
      style={{ borderColor: isActive ? color : undefined }}
      onClick={onSelect}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top, ${color}15, transparent 70%)`,
          opacity: isActive ? 1 : 0,
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: isActive ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        <Icon size={28} className="mb-6 block" style={{ color }} />
        <h3 className="text-[var(--moa-white)] font-medium text-xl mb-3">
          {title}
        </h3>
        <p className="text-[var(--moa-muted)] text-sm leading-loose mb-6">
          {desc}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="flex items-center gap-2 text-sm font-semibold tracking-wider 
                     uppercase transition-all duration-300"
          style={{ color }}
        >
          {isActive ? "Close ✕" : cta}
          {!isActive && <ArrowIcon size={14} />}
        </button>
      </div>
    </motion.div>
  );
}
