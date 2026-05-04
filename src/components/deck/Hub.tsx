"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
    coverSlide: "why" as SlideId,
    subSlides: [{ id: "why" as SlideId, label: "Overview" }],
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
    coverSlide: "retail-leasing" as SlideId,
    subSlides: [
      { id: "retail-leasing" as SlideId, label: "Leasing" },
      { id: "retail-phase-ii" as SlideId, label: "Phase II" },
      {
        id: "retail-expansion-hospitality" as SlideId,
        label: "Hospitality + Stay",
      },
      { id: "retail-expansion-wellness" as SlideId, label: "Water + Wellness" },
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
    coverSlide: "luxury-signature" as SlideId,
    subSlides: [
      { id: "luxury-signature" as SlideId, label: "Signature" },
      { id: "luxury-proposition" as SlideId, label: "Proposition" },
      { id: "luxury-future" as SlideId, label: "Future" },
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
    coverSlide: "dining" as SlideId,
    subSlides: [{ id: "dining" as SlideId, label: "Overview" }],
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
    coverSlide: "entertainment-cover" as SlideId,
    subSlides: [
      { id: "entertainment-cover" as SlideId, label: "Overview" },
      {
        id: "entertainment-nickelodeon" as SlideId,
        label: "Nickelodeon Universe",
      },
      { id: "entertainment-sealife" as SlideId, label: "Sea Life" },
      { id: "entertainment-crayola" as SlideId, label: "Crayola Experience" },
      { id: "entertainment-flyover" as SlideId, label: "Flyover America" },
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
    coverSlide: "events" as SlideId,
    subSlides: [{ id: "events" as SlideId, label: "Overview" }],
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
    coverSlide: "partner" as SlideId,
    subSlides: [{ id: "partner" as SlideId, label: "Overview" }],
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
        className="flex flex-col md:flex-row w-full"
        style={{ height: "calc(100% - clamp(64px, 9vh, 90px))" }}
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
              onClick={() =>
                onNavigate(heroSection.subSlides[0].id, heroSection.id)
              }
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
                See Why
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
              className="absolute left-10 md:left-14 lg:left-16"
              style={{
                right: "2rem",
                bottom: "calc(clamp(64px,9vh,90px) + 1.5rem)",
              }}
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

        <div
          className="flex-1 flex flex-col h-[50vh] md:h-full overflow-hidden"
          style={{ minHeight: 0 }}
        >
          <div
            className="flex-none overflow-hidden"
            style={{ flex: "0 0 40%" }}
          >
            <CinematicTile
              data={toTileData(retailSection)}
              onClick={() =>
                onNavigate(retailSection.subSlides[0].id, retailSection.id)
              }
              delayIndex={0}
              className="w-full h-full"
            />
          </div>

          <div
            className="grid grid-cols-2 grid-rows-2"
            style={{ flex: "1 1 60%", minHeight: 0 }}
          >
            {tilesSm.map((section, i) => (
              <div key={section.id} className="overflow-hidden">
                <CinematicTile
                  data={toTileData(section)}
                  onClick={() =>
                    onNavigate(section.subSlides[0].id, section.id)
                  }
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
        onClick={() =>
          onNavigate(partnerSection.subSlides[0].id, partnerSection.id)
        }
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
    </div>
  );
}
