"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SlideId } from "@/lib/slide-registry";
import { motion, AnimatePresence } from "framer-motion";

interface HubSection {
  id: string;
  label: string;
  tagline: string;
  stat: string;
  description: string;
  coverSlide: SlideId;
  subSlides: Array<{ id: SlideId; label: string }>;
  image: string;
  color: string;
}

const SECTIONS: HubSection[] = [
  {
    id: "why",
    label: "Why MOA",
    tagline: "America's #1 Destination",
    stat: "40M+ Visitors",
    description:
      "The most visited destination in the U.S. with unmatched reach and impact.",
    coverSlide: "why-cover",
    subSlides: [{ id: "why", label: "Overview" }],
    image: "/images/why/Why_MOA_Cover.jpg",
    color: "#003DA5",
  },
  {
    id: "retail",
    label: "Retail Leasing",
    tagline: "500+ Stores & Restaurants",
    stat: "$2B+ Sales",
    description:
      "Unparalleled retail opportunities with proven performance and expansion plans.",
    coverSlide: "retail-cover",
    subSlides: [
      { id: "retail-leasing", label: "Leasing" },
      { id: "retail-phase-ii", label: "Phase II" },
      { id: "retail-expansion-hospitality", label: "Hospitality + Stay" },
      { id: "retail-expansion-wellness", label: "Water + Wellness" },
    ],
    image: "/images/retail/Retail_Leasing_Cover.jpg",
    color: "#FFC72C",
  },
  {
    id: "luxury",
    label: "Luxury",
    tagline: "World-Class Brands",
    stat: "60% Destination Shoppers",
    description:
      "The ultimate luxury retail environment attracting global affluent shoppers.",
    coverSlide: "luxury-cover",
    subSlides: [
      { id: "luxury-signature", label: "Signature" },
      { id: "luxury-proposition", label: "Proposition" },
      { id: "luxury-future", label: "Future" },
    ],
    image: "/images/luxury/Luxury_Cover.jpg",
    color: "#003DA5",
  },
  {
    id: "dining",
    label: "Dining",
    tagline: "50+ Culinary Experiences",
    stat: "14 Distinctive Concepts",
    description:
      "From quick bites to fine dining, an extraordinary culinary destination.",
    coverSlide: "dining-cover",
    subSlides: [{ id: "dining", label: "Overview" }],
    image: "/images/Dinning/Dinning_Cover.jpg",
    color: "#E63946",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    tagline: "Unmatched Attractions",
    stat: "7 Major Attractions",
    description:
      "World-class entertainment anchors that drive traffic and dwell time.",
    coverSlide: "entertainment-cover",
    subSlides: [
      { id: "entertainment-nickelodeon", label: "Nickelodeon Universe" },
      { id: "entertainment-sealife", label: "Sea Life" },
      { id: "entertainment-crayola", label: "Crayola Experience" },
      { id: "entertainment-flyover", label: "Flyover America" },
    ],
    image: "/images/entertainment/Attractions_and_Entertainment_Cover.png",
    color: "#06B6D4",
  },
  {
    id: "events",
    label: "Events",
    tagline: "400+ Events Per Year",
    stat: "Global Stage",
    description:
      "A premier events platform with massive reach and cultural impact.",
    coverSlide: "events-cover",
    subSlides: [{ id: "events", label: "Overview" }],
    image: "/images/events/Events_Cover.jpg",
    color: "#10B981",
  },
  {
    id: "partner",
    label: "Partner With Us",
    tagline: "Your Brand. Our Stage.",
    stat: "Category Exclusivity Available",
    description:
      "Unlock unprecedented brand exposure through exclusive partnerships.",
    coverSlide: "partner-cover",
    subSlides: [{ id: "partner", label: "Overview" }],
    image: "/images/Partner/Partner_Cover.jpg",
    color: "#FFC72C",
  },
];

interface HubProps {
  readonly visitedSlides: Set<SlideId>;
  readonly onNavigate: (slideId: SlideId, section: string) => void;
  readonly explorationProgress: { visited: number; total: number };
}

export default function Hub({
  visitedSlides,
  onNavigate,
  explorationProgress,
}: HubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hub-card", { scale: 0, opacity: 0, rotateX: -15 });
      gsap.set(".hub-header", { opacity: 0, y: -30 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(".hub-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.to(
        ".hub-card",
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          stagger: {
            amount: 0.6,
            from: "center",
            grid: "auto",
          },
          duration: 0.7,
          ease: "back.out(1.4)",
        },
        "-=0.4",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const progressPercent = Math.round(
    (explorationProgress.visited / explorationProgress.total) * 100,
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #000 0%, #001529 50%, #000814 100%)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,61,165,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,61,165,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="hub-header relative z-10 pt-20 pb-12 text-center px-6">
        <motion.div
          className="inline-block px-4 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(255,199,44,0.1)",
            border: "1px solid rgba(255,199,44,0.3)",
          }}
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
            Exploration Mode
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-extralight tracking-wide text-white mb-4">
          Choose Your Path
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-6">
          Click any section to explore. Hover for details, expand for
          sub-topics.
        </p>

        <div className="max-w-md mx-auto mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/50 text-xs tracking-wider uppercase">
              Exploration Progress
            </span>
            <span className="text-[var(--gold)] text-sm font-medium">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--gold)] to-yellow-300"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section) => {
            const isVisited = visitedSlides.has(section.coverSlide);
            const isHovered = hoveredSection === section.id;
            const isExpanded = expandedSection === section.id;

            return (
              <motion.div
                key={section.id}
                className="hub-card"
                layout
                style={{
                  gridColumn: isExpanded ? "1 / -1" : "auto",
                }}
              >
                <button
                  className="relative group cursor-pointer w-full text-left"
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => {
                    if (isExpanded) {
                      setExpandedSection(null);
                    } else {
                      setExpandedSection(section.id);
                    }
                  }}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${section.label}`}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl transition-all duration-500"
                    style={{
                      height: isExpanded ? "400px" : "320px",
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${isHovered ? section.color + "80" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: isHovered
                        ? `0 20px 60px ${section.color}40`
                        : "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${section.image})`,
                        transform: isHovered ? "scale(1.1)" : "scale(1.05)",
                        filter: isHovered
                          ? "brightness(0.5)"
                          : "brightness(0.3)",
                      }}
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${section.color}20 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {section.label}
                            </h3>
                            <p
                              className="text-sm font-medium"
                              style={{ color: section.color }}
                            >
                              {section.tagline}
                            </p>
                          </div>
                          {isVisited && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400 flex items-center justify-center"
                            >
                              <svg
                                className="w-4 h-4 text-green-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isHovered && !isExpanded && (
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="text-white/80 text-sm leading-relaxed"
                            >
                              {section.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <div
                          className="inline-block px-4 py-2 rounded-full mb-4"
                          style={{
                            background: `${section.color}30`,
                            border: `1px solid ${section.color}60`,
                          }}
                        >
                          <span
                            className="text-sm font-bold tracking-wide"
                            style={{ color: section.color }}
                          >
                            {section.stat}
                          </span>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4 }}
                              className="mt-4 space-y-2"
                            >
                              <p className="text-white/60 text-xs uppercase tracking-wider mb-3">
                                Explore Topics
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {section.subSlides.map((subSlide) => (
                                  <button
                                    key={subSlide.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigate(subSlide.id, section.id);
                                    }}
                                    className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-white text-sm font-medium group/btn"
                                  >
                                    <span className="group-hover/btn:translate-x-1 inline-block transition-transform">
                                      {subSlide.label} →
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!isExpanded && (
                          <motion.button
                            className="text-white/70 hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            {isExpanded ? "Collapse" : "Explore"}
                            <svg
                              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <button
          className="w-14 h-14 rounded-full bg-[var(--gold)] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          title="Navigation Help"
        >
          <span className="text-2xl">?</span>
        </button>
      </motion.div>
    </div>
  );
}
