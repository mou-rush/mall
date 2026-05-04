"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import SceneIntro from "./why/scenes/SceneIntro";
import SceneScale from "./why/scenes/SceneScale";
import SceneProximity from "./why/scenes/SceneProximity";
import SceneReach from "./why/scenes/SceneReach";
import SceneAudience from "./why/scenes/SceneAudience";
import SceneScaleLand from "./why/scenes/SceneScaleLand";
import SceneImpact from "./why/scenes/SceneImpact";

const SCENES = [
  { id: "intro", Component: SceneIntro, label: "Intro" },
  { id: "scale", Component: SceneScale, label: "Scale" },
  { id: "proximity", Component: SceneProximity, label: "Access" },
  { id: "reach", Component: SceneReach, label: "Reach" },
  { id: "audience", Component: SceneAudience, label: "Audience" },
  { id: "land", Component: SceneScaleLand, label: "Footprint" },
  { id: "impact", Component: SceneImpact, label: "Impact" },
] as const;

interface WhyCinematicExperienceProps {
  readonly isActive: boolean;
}

export default function WhyCinematicExperience({
  isActive,
}: WhyCinematicExperienceProps) {
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
      setActiveIndex(Math.max(0, Math.min(index, SCENES.length - 1)));
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
      opacity: 0.3,
      duration: 0.25,
      ease: "power2.out",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.4, ease: "power2.out" },
      "+=0.1",
    );
  }, [activeIndex]);

  const scrollToScene = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-black">
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[50] bg-black opacity-0"
      />

      <div
        ref={scrollerRef}
        className="relative h-full w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: "y mandatory",
          overscrollBehavior: "contain",
        }}
      >
        {SCENES.map((scene, index) => (
          <div
            key={scene.id}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
          >
            <scene.Component isActive={activeIndex === index && isActive} />
          </div>
        ))}
      </div>

      <div className="fixed right-4 md:right-6 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-end gap-3">
        {SCENES.map((scene, index) => (
          <div key={scene.id} className="group flex items-center gap-3">
            <motion.span
              className="pointer-events-none text-[0.65rem] uppercase tracking-[0.25em] text-white/0 transition-all duration-300 group-hover:text-white/70"
              initial={{ opacity: 0, x: -10 }}
              animate={
                activeIndex === index
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
            >
              {scene.label}
            </motion.span>
            <button
              onClick={() => scrollToScene(index)}
              aria-label={`Go to ${scene.label}`}
              className="flex items-center justify-center"
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                {activeIndex === index && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-[#FFC72C]/40"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <motion.span
                  className="block rounded-full"
                  animate={{
                    width: activeIndex === index ? 12 : 6,
                    height: activeIndex === index ? 12 : 6,
                    backgroundColor:
                      activeIndex === index
                        ? "#FFC72C"
                        : "rgba(255,255,255,0.3)",
                    boxShadow:
                      activeIndex === index
                        ? "0 0 20px rgba(255,199,44,0.6)"
                        : "0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
