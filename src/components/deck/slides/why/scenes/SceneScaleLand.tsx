"use client";
import { motion } from "framer-motion";

interface SceneScaleLandProps {
  readonly isActive: boolean;
}

export default function SceneScaleLand({ isActive }: SceneScaleLandProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url(/images/why/Why_MOA_Cover.jpg)",
        }}
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-16"
            animate={isActive ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[11rem] md:text-[16rem] font-black text-white leading-none tracking-tighter">
              78
            </span>
            <span className="text-5xl md:text-7xl font-light text-white/50 ml-6">
              acres
            </span>
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl font-light text-white/60"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Built for discovery
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
