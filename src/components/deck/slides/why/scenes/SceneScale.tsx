"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SceneScaleProps {
  readonly isActive: boolean;
}

export default function SceneScale({ isActive }: SceneScaleProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;

    let current = 0;
    const target = 520;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/retail/Retail_Leasing_Cover.jpg)",
          opacity: 0.45,
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="font-black text-white leading-none tracking-tighter tabular-nums"
          style={{ fontSize: "clamp(10rem, 20vw, 24rem)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {count}
          <span className="text-[#FFC72C]">+</span>
        </motion.div>

        <motion.p
          className="text-white/55 font-light uppercase tracking-[0.3em]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", marginTop: "2.5rem" }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Stores &amp; restaurants
        </motion.p>
      </div>
    </section>
  );
}
