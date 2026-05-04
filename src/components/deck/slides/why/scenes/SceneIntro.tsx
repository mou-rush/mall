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

      <div className="relative z-10 text-center px-8">
        <motion.h1
          className="font-black uppercase tracking-tighter text-white leading-[0.85]"
          style={{
            fontSize: "clamp(1rem, 6vw, 6rem)",
            textShadow: "0 0 120px rgba(0,0,0,0.9)",
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[#FFC72C]">Scale</span>
        </motion.h1>

        <motion.p
          className="text-white/90 font-medium uppercase tracking-[0.3em]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", marginTop: "2.5rem" }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          Location. Access. Dominance.
        </motion.p>
      </div>
    </section>
  );
}
