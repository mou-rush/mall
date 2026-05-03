"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SlideId } from "@/lib/slide-registry";
import { motion, AnimatePresence } from "framer-motion";
import { useSocialLinks } from "@/hooks/useSocialLinks";

interface SocialItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ReactNode;
}

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
    stat: "4 Signature Attractions",
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

  const socialLinks = useSocialLinks();
  const socials: SocialItem[] = socialLinks.map((link) => ({
    label: link.label,
    href: link.href,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d={link.iconPath} />
      </svg>
    ),
  }));

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
        <h1 className="text-5xl md:text-6xl font-extralight tracking-wide text-white mb-4">
          Choose Your Path
        </h1>

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

            return (
              <motion.div key={section.id} className="hub-card" layout>
                <button
                  className="relative group cursor-pointer w-full text-left"
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => setExpandedSection(section.id)}
                  aria-label={`Explore ${section.label}`}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl transition-all duration-500"
                    style={{
                      height: "320px",
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
                          {isHovered && (
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

                        <motion.div
                          className="text-white/70 group-hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          Explore
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {expandedSection && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close section topics"
              onClick={() => setExpandedSection(null)}
            />

            {(() => {
              const section = SECTIONS.find((s) => s.id === expandedSection);
              if (!section) return null;

              return (
                <motion.div
                  initial={{ scale: 0.94, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.98, y: 8, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative z-10 w-full max-w-3xl rounded-2xl border border-white/20 bg-[#050A14]/95 p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p
                        className="text-xs uppercase tracking-[0.22em] mb-2"
                        style={{ color: section.color }}
                      >
                        {section.tagline}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-semibold text-white">
                        {section.label}
                      </h2>
                      <p className="text-white/60 text-sm mt-2">
                        {section.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedSection(null)}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider text-white/80 hover:text-white hover:border-white/40"
                    >
                      Close
                    </button>
                  </div>

                  {section.id === "entertainment" ? (
                    <>
                      <div className="rounded-2xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(0,0,0,0.12)_55%,rgba(255,255,255,0.04)_100%)] p-5 md:p-6">
                        <div className="mt-5 flex flex-wrap gap-2">
                          {section.subSlides.map((subSlide) => (
                            <span
                              key={subSlide.id}
                              className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/72"
                            >
                              {subSlide.label}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setExpandedSection(null);
                            onNavigate(section.coverSlide, section.id);
                          }}
                          className="mt-6 inline-flex items-center  bg-[#FFC72C] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:brightness-110"
                        >
                          Enter Entertainment
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-3">
                        Choose a topic
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {section.subSlides.map((subSlide) => (
                          <button
                            key={subSlide.id}
                            onClick={() => {
                              setExpandedSection(null);
                              onNavigate(subSlide.id, section.id);
                            }}
                            className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-white text-sm font-medium text-left"
                          >
                            {subSlide.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-6 left-6 z-20 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
