"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import VideoBackground from "@/components/ui/VideoBackground";
import { VIDEOS } from "@/lib/constants";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

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
          <span className="block text-gold-gradient font-thin">Stage</span>
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
          <button
            onClick={() =>
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary"
          >
            Partner With Us
            <ArrowRight />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("why")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline"
          >
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

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TickerStrip() {
  const facts = [
    "40M+ Annual Visitors",
    "500+ Stores & Restaurants",
    "#1 US Tourism Destination",
    "$2B+ Annual Sales",
    "World's Largest Indoor Theme Park",
    "60% Destination Shoppers",
    "10,000 Free Parking Spaces",
    "5.6M Sq Ft",
  ];

  return (
    <div className="flex items-center gap-0 overflow-hidden w-full">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {[...facts, ...facts].map((fact, i) => (
          // eslint-disable-next-line react/no-array-index-key -- static infinite ticker, duplicate content by design
          <span key={`ticker-${i}`} className="flex items-center gap-10">
            <span className="eyebrow text-[0.65rem] text-[var(--moa-muted)]">
              {fact}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
