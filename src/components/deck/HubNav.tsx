"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { SlideId } from "@/lib/slide-registry";

interface HubSection {
  id: string;
  label: string;
  tagline: string;
  stat: string;
  coverSlide: SlideId;
  image: string;
  span?: string;
}

const SECTIONS: HubSection[] = [
  {
    id: "why",
    label: "Why MOA",
    tagline: "America's #1 Destination",
    stat: "40M+ Visitors",
    coverSlide: "why-cover",
    image: "/images/why/Why_MOA_Cover.jpg",
    span: "col-span-2",
  },
  {
    id: "retail",
    label: "Retail Leasing",
    tagline: "500+ Stores & Restaurants",
    stat: "$2B+ Sales",
    coverSlide: "retail-cover",
    image: "/images/retail/Retail_Leasing_Cover.jpg",
  },
  {
    id: "luxury",
    label: "Luxury",
    tagline: "World-Class Brands",
    stat: "60% Destination Shoppers",
    coverSlide: "luxury-cover",
    image: "/images/luxury/Luxury_Cover.jpg",
  },
  {
    id: "dining",
    label: "Dining",
    tagline: "50+ Culinary Experiences",
    stat: "14 Distinctive Concepts",
    coverSlide: "dining-cover",
    image: "/images/Dinning/Dinning_Cover.jpg",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    tagline: "Unmatched Attractions",
    stat: "7 Major Attractions",
    coverSlide: "entertainment-cover",
    image: "/images/entertainment/Attractions_and_Entertainment_Cover.png",
    span: "col-span-2",
  },
  {
    id: "events",
    label: "Events",
    tagline: "400+ Events Per Year",
    stat: "Global Stage",
    coverSlide: "events-cover",
    image: "/images/events/Events_Cover.jpg",
  },
  {
    id: "partner",
    label: "Partner With Us",
    tagline: "Your Brand. Our Stage.",
    stat: "Category Exclusivity Available",
    coverSlide: "partner-cover",
    image: "/images/Partner/Partner_Cover.jpg",
    span: "col-span-4",
  },
];

interface HubNavProps {
  readonly visitedSections: Set<string>;
  readonly onNavigate: (slideId: SlideId) => void;
}

export default function HubNav({ visitedSections, onNavigate }: HubNavProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hub-node", { scale: 0, opacity: 0, y: 30 });
      gsap.set(headlineRef.current, { opacity: 0, y: -20 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      tl.to(
        ".hub-node",
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.65,
          ease: "back.out(1.6)",
        },
        "-=0.35",
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--moa-black)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,61,165,0.12) 0%, transparent 70%)",
        }}
      />

      <div ref={headlineRef} className="relative z-10 mb-10 text-center">
        <p className="text-[0.65rem] tracking-[0.32em] uppercase text-[var(--gold)] mb-2 font-medium">
          Mall of America
        </p>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white">
          Choose Your Experience
        </h1>
      </div>

      {/* Grid */}
      <div
        className="relative z-10 grid grid-cols-4 gap-3 w-full max-w-5xl px-5"
        style={{ maxHeight: "70vh" }}
      >
        {SECTIONS.map((section) => {
          const visited = visitedSections.has(section.id);
          return (
            <button
              key={section.id}
              className={`hub-node group relative overflow-hidden rounded-lg
                          ${section.span ?? "col-span-1"}
                          ${section.id === "partner" ? "h-28" : "h-44"}
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]`}
              onClick={() => onNavigate(section.coverSlide)}
              style={{ willChange: "transform" }}
            >
              <img
                src={section.image}
                alt={section.label}
                className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-700 ease-out
                           group-hover:scale-110"
                loading="lazy"
              />

              <div
                className="absolute inset-0 transition-opacity duration-500
                           bg-gradient-to-t from-black/80 via-black/40 to-black/20
                           group-hover:from-black/60 group-hover:via-black/20"
              />

              <div
                className="absolute inset-0 border border-[var(--gold)]/0 rounded-lg
                           transition-colors duration-500 group-hover:border-[var(--gold)]/60"
              />

              <div className="relative z-10 h-full flex flex-col justify-end p-4">
                {visited && (
                  <span
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--gold)" }}
                  >
                    <svg
                      viewBox="0 0 10 8"
                      className="w-3 h-3 fill-none stroke-black stroke-[1.8]"
                    >
                      <polyline points="1 4 3.5 6.5 9 1" />
                    </svg>
                  </span>
                )}
                <p
                  className="text-[0.55rem] tracking-[0.28em] uppercase text-[var(--gold)] mb-1
                             font-medium"
                >
                  {section.stat}
                </p>
                <h2
                  className="text-sm md:text-base font-semibold text-white leading-tight mb-0.5
                             transition-colors duration-300 group-hover:text-[var(--gold-light)]"
                >
                  {section.label}
                </h2>
                <p className="text-[0.6rem] text-white/55 group-hover:text-white/75 transition-colors duration-300">
                  {section.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="relative z-10 mt-8 text-[0.55rem] tracking-[0.22em] uppercase text-white/25">
        Select a section to begin
      </p>
    </div>
  );
}
