"use client";
import { motion } from "framer-motion";

interface SceneScaleLandProps {
  readonly isActive: boolean;
}

export default function SceneScaleLand({ isActive }: SceneScaleLandProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/why/Why_MOA_Cover.jpg)",
        }}
        initial={{ scale: 1.0, opacity: 0 }}
        animate={isActive ? { scale: 1.15, opacity: 0.55 } : {}}
        transition={{
          scale: { duration: 15, ease: "easeOut" },
          opacity: { duration: 2, ease: "easeOut" },
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 3, delay: 1.5, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,199,44,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        animate={isActive ? { x: "100%", opacity: [0, 0.4, 0] } : {}}
        transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,199,44,0.15) 50%, transparent 70%)",
          transform: "skewX(-15deg)",
        }}
      />

      <div className="relative z-10 text-center px-6">
        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.div
              className="font-black text-white leading-none tracking-tighter"
              style={{
                fontSize: "clamp(10rem, 22vw, 26rem)",
                paddingRight: "0.1em",
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={isActive ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              78
              <span
                className="text-[#FFC72C] font-light"
                style={{ fontSize: "0.4em", marginLeft: "0.25em" }}
              >
                acres
              </span>
            </motion.div>
          </div>
        </div>

        <motion.p
          className="text-white/45 font-light uppercase tracking-[0.45em]"
          style={{
            fontSize: "clamp(0.75rem, 1.3vw, 1.1rem)",
            letterSpacing: "0.45em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 1.8, ease: "easeOut" }}
        >
          Built for discovery
        </motion.p>
      </div>
    </section>
  );
}
