"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import type { SlideProps } from "@/lib/lazy-slides";
import WhyFootprintSection from "./why/WhyFootprintSection";
import WhyLocationSection from "./why/WhyLocationSection";
import WhyReachSection from "./why/WhyReachSection";
import WhyScaleSection from "./why/WhyScaleSection";

const sections = [
  { id: "scale", label: "Scale" },
  { id: "location", label: "Location" },
  { id: "reach", label: "Reach" },
  { id: "footprint", label: "Footprint" },
] as const;

export default function WhySlide({ isActive }: SlideProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstSceneRef = useRef(true);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !isActive) return;

    const handleScroll = () => {
      const index = Math.round(scroller.scrollTop / scroller.clientHeight);
      setActiveIndex(Math.max(0, Math.min(index, sections.length - 1)));
    };

    handleScroll();
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  useEffect(() => {
    if (!overlayRef.current || firstSceneRef.current) {
      firstSceneRef.current = false;
      return;
    }

    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      opacity: 0.4,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.5, ease: "power2.out" },
      "+=0.12",
    );
  }, [activeIndex]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[var(--moa-black)]">
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[50] bg-black opacity-0"
      />

      <div
        ref={scrollerRef}
        className="relative h-full w-full overflow-y-auto [scrollbar-width:none]"
        style={{ scrollSnapType: "y mandatory", overscrollBehavior: "contain" }}
      >
        <div
          ref={(node) => {
            sectionRefs.current[0] = node;
          }}
        >
          <WhyScaleSection scrollerRef={scrollerRef} />
        </div>
        <div
          ref={(node) => {
            sectionRefs.current[1] = node;
          }}
        >
          <WhyLocationSection scrollerRef={scrollerRef} />
        </div>
        <div
          ref={(node) => {
            sectionRefs.current[2] = node;
          }}
        >
          <WhyReachSection scrollerRef={scrollerRef} />
        </div>
        <div
          ref={(node) => {
            sectionRefs.current[3] = node;
          }}
        >
          <WhyFootprintSection scrollerRef={scrollerRef} />
        </div>
      </div>

      <div className="fixed right-5 top-1/2 z-[64] flex -translate-y-1/2 flex-col items-end gap-3">
        {sections.map((section, index) => (
          <div key={section.id} className="group flex items-center gap-2">
            <span className="pointer-events-none text-[0.52rem] uppercase tracking-[0.22em] text-white/0 transition-colors duration-200 group-hover:text-white/55">
              {section.label}
            </span>
            <button
              onClick={() => scrollToSection(index)}
              aria-label={`Go to ${section.label}`}
              className="flex items-center justify-center"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                {activeIndex === index && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-[var(--gold)]/40"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <motion.span
                  className="block rounded-full"
                  animate={{
                    width: activeIndex === index ? 10 : 5,
                    height: activeIndex === index ? 10 : 5,
                    backgroundColor:
                      activeIndex === index
                        ? "#C9A84C"
                        : "rgba(255,255,255,0.4)",
                    boxShadow:
                      activeIndex === index
                        ? "0 0 18px rgba(201,168,76,0.55)"
                        : "0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
