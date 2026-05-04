"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SlideId } from "@/lib/slide-registry";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import CinematicTile, { type CinematicTileData } from "./CinematicTile";

interface SocialItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ReactNode;
}

interface HubSection {
  readonly id: string;
  readonly label: string;
  readonly tagline: string;
  readonly stat: string;
  readonly description: string;
  readonly coverSlide: SlideId;
  readonly subSlides: Array<{ id: SlideId; label: string }>;
  readonly image: string;
  readonly color: string;
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
    label: "Partner",
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);

  const socialLinks = useSocialLinks();
  const socials: SocialItem[] = socialLinks.map((link) => ({
    label: link.label,
    href: link.href,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d={link.iconPath} />
      </svg>
    ),
  }));

  const progressPercent = Math.round(
    (explorationProgress.visited / explorationProgress.total) * 100,
  );

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const heroSection = SECTIONS[0];
  const retailSection = SECTIONS[1];
  const tilesSm: HubSection[] = SECTIONS.slice(2, 6);
  const partnerSection = SECTIONS[6];
  const heroVisited = visitedSlides.has(heroSection.coverSlide);

  const heroParallaxX = (mousePos.x - 0.5) * -20;
  const heroParallaxY = (mousePos.y - 0.5) * -14;

  const toTileData = (s: HubSection): CinematicTileData => ({
    id: s.id,
    label: s.label,
    tagline: s.tagline,
    stat: s.stat,
    image: s.image,
    accentColor: s.color,
  });

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      <div
        className="flex flex-col md:flex-row h-full w-full"
        style={{ paddingBottom: "clamp(52px, 7vh, 72px)" }}
      >
        <div
          ref={heroRef}
          className="relative flex-none md:w-[54%] h-[50vh] md:h-full overflow-hidden"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
        >
          <motion.div
            className="absolute inset-[-6%] bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSection.image})` }}
            animate={{ x: heroParallaxX, y: heroParallaxY, scale: 1.08 }}
            initial={{ scale: 1.14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 30 }}
          />
          <motion.div
            className="absolute inset-[-6%] bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSection.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,61,165,0.18)_0%,transparent_60%)]" />

          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#003DA5]"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-14 lg:px-16">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <div className="w-8 h-px bg-[#FFC72C]" />
              <span className="text-[#FFC72C] text-xs uppercase tracking-[0.3em] font-semibold">
                The Experience
              </span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                className="text-white font-black uppercase leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 6.5vw, 7rem)" }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Why
                <br />
                <span style={{ color: "#FFC72C" }}>Mall of</span>
                <br />
                America
              </motion.h1>
            </div>

            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95 }}
            >
              <div
                className="font-black text-white leading-none tracking-tighter"
                style={{
                  fontSize: "clamp(4rem, 8vw, 8rem)",
                  textShadow: "0 0 80px rgba(0,61,165,0.5)",
                }}
              >
                40M<span className="text-[#FFC72C]">+</span>
              </div>
              <div className="text-white/50 text-xs uppercase tracking-[0.25em] font-light mt-2">
                Annual Visitors
              </div>
            </motion.div>

            <motion.button
              onClick={() => setExpandedSection(heroSection.id)}
              className="relative self-start inline-flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#FFC72C]/25 blur-2xl rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative flex items-center gap-3 bg-[#FFC72C] text-black px-8 py-3 font-black uppercase tracking-[0.18em] text-sm">
                {heroVisited ? "Continue" : "Start Experience"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>

            <motion.div
              className="absolute bottom-8 left-10 md:left-14 lg:left-16"
              style={{ right: "2rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/15 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-[#FFC72C]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[#FFC72C] text-xs font-semibold whitespace-nowrap">
                  {progressPercent}% explored
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 flex flex-col h-[50vh] md:h-full overflow-hidden">
          <div className="flex-none md:flex-[2] h-2/5 md:h-auto overflow-hidden">
            <CinematicTile
              data={toTileData(retailSection)}
              onClick={() => setExpandedSection(retailSection.id)}
              delayIndex={0}
              className="w-full h-full"
            />
          </div>

          <div className="flex-1 grid grid-cols-2 grid-rows-2">
            {tilesSm.map((section, i) => (
              <div key={section.id} className="overflow-hidden">
                <CinematicTile
                  data={toTileData(section)}
                  onClick={() => setExpandedSection(section.id)}
                  delayIndex={i + 1}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 cursor-pointer group/partner"
        style={{ height: "clamp(64px, 9vh, 90px)" }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setExpandedSection(partnerSection.id)}
        whileHover={{ scaleY: 1.06 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover/partner:brightness-50"
          style={{
            backgroundImage: `url(${partnerSection.image})`,
            filter: "brightness(0.25)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFC72C]/20 via-transparent to-[#003DA5]/20" />
        <div className="absolute inset-0 border-t border-[#FFC72C]/30" />

        <div className="relative z-10 h-full flex items-center justify-center gap-6">
          <motion.div
            className="w-8 h-px bg-[#FFC72C]"
            animate={{ scaleX: [1, 1.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[#FFC72C] text-sm uppercase tracking-[0.35em] font-black">
            Partner With Us
          </span>
          <span className="text-white/30">·</span>
          <span className="text-white/55 text-xs uppercase tracking-[0.18em] font-light">
            Category Exclusivity Available
          </span>
          <motion.div
            className="w-8 h-px bg-[#FFC72C]"
            animate={{ scaleX: [1, 1.5, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.25,
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="fixed top-5 right-5 z-40 flex gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>

      <AnimatePresence>
        {expandedSection && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              aria-label="Close"
              onClick={() => setExpandedSection(null)}
            />

            {(() => {
              const section = SECTIONS.find((s) => s.id === expandedSection);
              if (!section) return null;

              return (
                <motion.div
                  className="relative z-10 w-full max-w-2xl"
                  initial={{ scale: 0.93, y: 28, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.97, y: 12, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative overflow-hidden border border-white/10">
                    {/* Section image behind modal */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{ backgroundImage: `url(${section.image})` }}
                    />
                    <div className="absolute inset-0 bg-[#03080F]/90" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${section.color}20 0%, transparent 60%)`,
                      }}
                    />
                    {/* Accent top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: section.color }}
                    />

                    <div className="relative z-10 p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <div
                            className="text-xs uppercase tracking-[0.28em] font-semibold mb-2"
                            style={{ color: section.color }}
                          >
                            {section.tagline}
                          </div>
                          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
                            {section.label}
                          </h2>
                          <div
                            className="mt-3 text-3xl font-black leading-none"
                            style={{ color: section.color }}
                          >
                            {section.stat}
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedSection(null)}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors text-xl leading-none border border-white/10 hover:border-white/30 mt-1"
                        >
                          ×
                        </button>
                      </div>

                      {/* Sub-slides */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {section.subSlides.map((subSlide, i) => (
                          <motion.button
                            key={subSlide.id}
                            onClick={() => {
                              setExpandedSection(null);
                              onNavigate(subSlide.id, section.id);
                            }}
                            className="relative overflow-hidden text-left px-5 py-4 border border-white/10 hover:border-white/25 transition-all duration-300 group/sub"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.06 * i, duration: 0.35 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(90deg, ${section.color}15, transparent)`,
                              }}
                            />
                            <div className="relative flex items-center justify-between">
                              <span className="text-white/90 text-sm font-medium">
                                {subSlide.label}
                              </span>
                              <svg
                                className="w-3.5 h-3.5 text-white/25 group-hover/sub:text-white/70 transition-colors"
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
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Enter CTA */}
                      <motion.button
                        onClick={() => {
                          setExpandedSection(null);
                          // For entertainment, events, dining: show the cover (it's the main experience)
                          // For retail, luxury: skip to first sub-slide (they have section navigation)
                          const shouldShowCover =
                            section.id === "entertainment" ||
                            section.id === "events" ||
                            section.id === "dining";

                          const targetSlide = shouldShowCover
                            ? section.coverSlide
                            : section.subSlides[0].id;

                          onNavigate(targetSlide, section.id);
                        }}
                        className="mt-6 w-full py-4 font-black uppercase tracking-[0.22em] text-sm text-black"
                        style={{ background: section.color }}
                        whileHover={{ scale: 1.01, filter: "brightness(1.1)" }}
                        whileTap={{ scale: 0.99 }}
                      >
                        Enter {section.label}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
