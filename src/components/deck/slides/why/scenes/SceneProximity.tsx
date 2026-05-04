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
          opacity: 0.45,
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="font-black text-white leading-none tracking-tighter"
          style={{ fontSize: "clamp(10rem, 20vw, 24rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          12
          <span
            className="text-[#FFC72C] font-light"
            style={{ fontSize: "0.4em", marginLeft: "0.2em" }}
          >
            min
          </span>
        </motion.div>

        <motion.p
          className="text-white/55 font-light uppercase tracking-[0.3em]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", marginTop: "2.5rem" }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          From MSP International Airport
        </motion.p>
      </div>
    </section>
  );
}
