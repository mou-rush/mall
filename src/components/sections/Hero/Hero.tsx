"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VideoBackground from "@/components/ui/VideoBackground";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { VIDEOS } from "@/lib/constants";
import { useScrollTo } from "@/hooks/useScrollTo";
import TickerStrip from "./TickerStrip";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const scrollTo = useScrollTo();

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex flex-col items-center 
                 justify-center overflow-hidden bg-[var(--moa-black)]"
    >
      <VideoBackground
        src={VIDEOS.hero}
        poster="/images/hero-poster.jpg"
        overlayOpacity={0.65}
      />

      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[var(--moa-black)] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--moa-black)] to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ y, opacity, scale: titleScale }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          Bloomington, Minnesota · Est. 1992
        </motion.p>

        <motion.h1
          className="font-extralight tracking-[-0.04em] leading-[0.92] mb-8"
          style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="block text-[var(--moa-white)]">America&rsquo;s</span>
          <span className="block text-gold-gradient font-thin pb-[0.12em]">
            Stage
          </span>
        </motion.h1>

        <motion.p
          className="text-[var(--moa-muted)] font-light max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          40 million visitors. 500+ world-class brands. Every category. Every
          experience. One address that changes what retail can be.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <button onClick={() => scrollTo("cta")} className="btn-primary">
            Partner With Us
            <ArrowIcon />
          </button>
          <button onClick={() => scrollTo("why")} className="btn-outline">
            Explore the Property
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 
                   flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="eyebrow text-[0.6rem] tracking-[0.3em]">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-[var(--gold)] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-0 inset-x-0 z-20 flex items-center px-8 h-14
                   border-t border-[var(--moa-border)] bg-[rgba(6,6,8,0.6)] 
                   backdrop-blur-sm overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <TickerStrip />
      </motion.div>
    </section>
  );
}
