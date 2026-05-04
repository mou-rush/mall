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
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url(/images/retail/Retail_Leasing_Cover.jpg)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-8"
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-white leading-none tracking-tighter tabular-nums">
              {count}
              <span className="text-[#FFC72C]">+</span>
            </span>
          </motion.div>

          <motion.p
            className="text-3xl md:text-5xl font-light text-white/60"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Retail powerhouse
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
