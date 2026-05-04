"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface SceneReachProps {
  readonly isActive: boolean;
}

export default function SceneReach({ isActive }: SceneReachProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ y: "100%", scale: 1.1 }}
        animate={
          isActive
            ? {
                y: 0,
                scale: [1.1, 1, 1.05],
              }
            : { y: "100%", scale: 1.1 }
        }
        transition={{
          y: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
          scale: {
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.5, 1],
          },
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/why/visitors.mp4"
          loop
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 25, delay: 2.5, ease: "linear" }}
        style={{ pointerEvents: "none" }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="font-black text-[#FFC72C] leading-none tracking-tighter"
          style={{ fontSize: "clamp(10rem, 20vw, 24rem)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          60%
        </motion.div>

        <motion.p
          className="text-white font-light uppercase tracking-[0.3em]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", marginTop: "2.5rem" }}
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 3.2 }}
        >
          Visitors from outside Minnesota
        </motion.p>
      </div>
    </section>
  );
}
