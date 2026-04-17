"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MallFloorPlan from "@/components/ui/MallFloorPlan";

export default function FloorPlanSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.9 }}
      className="mt-16 glass-card rounded-[2px] p-6 lg:p-8"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="eyebrow mb-1">Property Map</p>
          <p className="text-[var(--moa-muted)] text-sm">
            500+ stores across 4 retail levels
          </p>
        </div>
      </div>
      <MallFloorPlan />
    </motion.div>
  );
}
