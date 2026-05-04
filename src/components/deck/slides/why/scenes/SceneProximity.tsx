"use client";
import { motion } from "framer-motion";

interface SceneProximityProps {
  readonly isActive: boolean;
}

export default function SceneProximity({ isActive }: SceneProximityProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url(/images/why/Why_MOA_Cover.jpg)",
        }}
      />

      <div className="absolute inset-0 bg-black/80" />

      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
      >
        <motion.path
          d="M 0 540 Q 480 300 960 540 T 1920 540"
          stroke="#FFC72C"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="mb-16">
            <span className="text-[10rem] md:text-[16rem] font-black text-white leading-none tracking-tighter">
              12
            </span>
            <span className="text-5xl md:text-8xl font-light text-white/60 ml-6">
              min
            </span>
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl font-light text-white/60"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Global access
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
