"use client";
import { motion } from "framer-motion";

interface SceneProximityProps {
  readonly isActive: boolean;
}

export default function SceneProximity({ isActive }: SceneProximityProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/why/Why_MOA_Cover.jpg)",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 bg-black/65" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 60, Q 30 45, 60 50, T 120 50"
          stroke="#FFC72C"
          strokeWidth="1.5"
          fill="none"
          opacity="0.35"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 0.35 } : {}}
          transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "55%", left: "0%" }}
        initial={{ x: "-10%", y: "-50%", rotate: 90 }}
        animate={isActive ? { x: "110vw", y: "-50%", rotate: 90 } : {}}
        transition={{ duration: 5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#FFC72C]"
        >
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="font-black text-white leading-none tracking-tighter"
          style={{ fontSize: "clamp(10rem, 22vw, 26rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.8, delay: 2, ease: [0.19, 1, 0.22, 1] }}
        >
          12
          <span
            className="text-[#FFC72C] font-light"
            style={{ fontSize: "0.35em", marginLeft: "0.3em" }}
          >
            min
          </span>
        </motion.div>

        <motion.p
          className="text-white/80 font-light uppercase tracking-[0.45em]"
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
            marginTop: "2.5rem",
            letterSpacing: "0.45em",
          }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 1.8, delay: 2, ease: "easeOut" }}
        >
          From MSP International Airport
        </motion.p>
      </div>
    </section>
  );
}
