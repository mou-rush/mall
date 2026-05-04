"use client";
import { motion } from "framer-motion";

interface SceneReachProps {
  readonly isActive: boolean;
}

export default function SceneReach({ isActive }: SceneReachProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url(/images/why/destination_demand.jpeg)",
        }}
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="mb-16">
            <motion.span
              className="text-[12rem] md:text-[18rem] font-black text-[#FFC72C] leading-none tracking-tighter"
              animate={isActive ? { scale: [1, 1.02, 1] } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              60%
            </motion.span>
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl font-light text-white/60"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Destination demand
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
