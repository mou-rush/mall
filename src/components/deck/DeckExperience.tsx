"use client";
import React, { useState, useCallback, useEffect, FC } from "react";
import { AnimatePresence } from "framer-motion";
import { useDeckNavigation } from "@/hooks/useDeckNavigation";
import {
  getAllSlideIds,
  getSlideIndex,
  getTotalSlides,
  type SlideId,
} from "@/lib/slide-registry";
import EntryScreen from "./EntryScreen";
import IntroScreen from "./IntroScreen";
import NavigationArrows from "./NavigationArrows";
import SlideWrapper from "./SlideWrapper";

import {
  HeroSlide,
  WhySlide,
  RetailLeasingSlide,
  RetailPhaseIISlide,
  RetailExpansionHospitalitySlide,
  RetailExpansionWellnessSlide,
  LuxurySignatureSlide,
  LuxuryPropositionSlide,
  LuxuryFutureSlide,
  DiningSlide,
  EntertainmentNickelodeonSlide,
  EntertainmentSealifeSlide,
  EntertainmentCrayolaSlide,
  EntertainmentFlyoverSlide,
  EventsSlide,
  CTASlide,
  SideMenu,
  type SlideComponent,
} from "@/lib/lazy-slides";

import CoverSlide from "./slides/CoverSlide";

const WhyCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Why MOA"
    imageSrc="/images/why/Why_MOA_Cover.jpg"
  />
);

const RetailCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Retail Leasing"
    imageSrc="/images/retail/Retail_Leasing_Cover.jpg"
  />
);

const LuxuryCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Luxury"
    imageSrc="/images/luxury/Luxury_Cover.jpg"
  />
);

const DiningCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Dining"
    imageSrc="/images/Dinning/Dinning_Cover.jpg"
  />
);

const EntertainmentCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Attractions + Entertainment"
    imageSrc="/images/entertainment/Attractions_and_Entertainment_Cover.png"
  />
);

const EventsCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Events"
    imageSrc="/images/events/Events_Cover.jpg"
  />
);

const PartnerCover: FC<{ isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Partner With Us"
    imageSrc="/images/Partner/Partner_Cover.jpg"
  />
);

const SLIDE_COMPONENTS: Record<SlideId, SlideComponent> = {
  hero: HeroSlide,
  "why-cover": WhyCover,
  why: WhySlide,
  "retail-cover": RetailCover,
  "retail-leasing": RetailLeasingSlide,
  "retail-phase-ii": RetailPhaseIISlide,
  "retail-expansion-hospitality": RetailExpansionHospitalitySlide,
  "retail-expansion-wellness": RetailExpansionWellnessSlide,
  "luxury-cover": LuxuryCover,
  "luxury-signature": LuxurySignatureSlide,
  "luxury-proposition": LuxuryPropositionSlide,
  "luxury-future": LuxuryFutureSlide,
  "dining-cover": DiningCover,
  dining: DiningSlide,
  "entertainment-cover": EntertainmentCover,
  "entertainment-nickelodeon": EntertainmentNickelodeonSlide,
  "entertainment-sealife": EntertainmentSealifeSlide,
  "entertainment-crayola": EntertainmentCrayolaSlide,
  "entertainment-flyover": EntertainmentFlyoverSlide,
  "events-cover": EventsCover,
  events: EventsSlide,
  "partner-cover": PartnerCover,
  partner: CTASlide,
};

type Stage = "entry" | "intro" | "deck";

export default function DeckExperience() {
  const [stage, setStage] = useState<Stage>("entry");
  const [menuOpen, setMenuOpen] = useState(false);
  const totalSlides = getTotalSlides();
  const nav = useDeckNavigation(totalSlides, stage === "deck");

  const handleEnter = useCallback(() => {
    setStage("intro");
  }, []);

  const handleSkip = useCallback(() => {
    setStage("deck");
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavigateToSlide = useCallback(
    (slideId: SlideId) => {
      const index = getSlideIndex(slideId);
      if (index >= 0) {
        nav.goTo(index);
      }
    },
    [nav],
  );

  useEffect(() => {
    if (stage !== "entry") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, handleEnter]);

  if (stage === "entry") {
    return <EntryScreen onEnter={handleEnter} />;
  }

  if (stage === "intro") {
    return <IntroScreen onSkip={handleSkip} />;
  }

  const allSlides = getAllSlideIds();
  const currentSlideId = allSlides[nav.current];
  const Component = currentSlideId ? SLIDE_COMPONENTS[currentSlideId] : null;

  if (!Component) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden touch-none select-none">
      <SideMenu
        isOpen={menuOpen}
        onToggle={toggleMenu}
        onClose={() => setMenuOpen(false)}
        currentSlideId={currentSlideId}
        onNavigate={handleNavigateToSlide}
      />

      <NavigationArrows
        onPrev={nav.prev}
        onNext={nav.next}
        canGoPrev={nav.current > 0}
        canGoNext={nav.current < totalSlides - 1}
        hideNext={currentSlideId === "hero"}
      />

      <div className="relative w-full h-full">
        <AnimatePresence mode="wait" custom={nav.direction}>
          <SlideWrapper key={nav.current} direction={nav.direction}>
            <Component
              isActive
              onNext={nav.next}
              goTo={nav.goTo}
              currentSlide={nav.current}
            />
          </SlideWrapper>
        </AnimatePresence>
      </div>

      <div
        className="fixed bottom-6 right-6 z-[70] hidden md:flex items-center gap-2
                      px-4 py-2 rounded-full border border-white/10 bg-black/25 backdrop-blur-xl
                      shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
      >
        <span className="text-white/40 text-[0.6rem] tabular-nums tracking-[0.2em]">
          {String(nav.current + 1).padStart(2, "0")} /{" "}
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
