"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface SceneIntroProps {
  readonly isActive: boolean;
}

export default function SceneIntro({ isActive }: SceneIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src="/videos/why/why_moa_intro_scene.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-black uppercase tracking-tighter text-white leading-[0.85] mb-12"
            style={{ textShadow: "0 0 100px rgba(0,0,0,0.9)" }}
          >
            <span className="text-[#FFC72C]">Scale</span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-4xl font-light text-white/90"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            Location. Access. Dominance.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
