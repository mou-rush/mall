"use client";
import { motion } from "framer-motion";

interface SceneAudienceProps {
  readonly isActive: boolean;
}

export default function SceneAudience({ isActive }: SceneAudienceProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url(/images/Home/Home_Hero.jpg)",
        }}
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-12 mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isActive ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-[10rem] md:text-[16rem] font-black text-white leading-none tracking-tighter">
              8
            </span>
            <motion.span
              className="text-4xl md:text-6xl text-white/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              to
            </motion.span>
            <span className="text-[10rem] md:text-[16rem] font-black text-[#FFC72C] leading-none tracking-tighter">
              82
            </span>
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl font-light text-white/60"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Universal appeal
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
