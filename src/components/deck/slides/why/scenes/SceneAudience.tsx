"use client";
import { motion } from "framer-motion";

interface SceneAudienceProps {
  readonly isActive: boolean;
}

export default function SceneAudience({ isActive }: SceneAudienceProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/Home/Home_Hero.jpg)",
          opacity: 0.45,
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: "clamp(8rem, 18vw, 22rem)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white">8</span>
          <span
            className="text-white/20 font-light"
            style={{ fontSize: "0.4em", margin: "0 0.3em" }}
          >
            —
          </span>
          <span className="text-[#FFC72C]">82</span>
        </motion.div>

        <motion.p
          className="text-white/55 font-light uppercase tracking-[0.3em]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", marginTop: "2.5rem" }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Universal appeal
        </motion.p>
      </div>
    </section>
  );
}
