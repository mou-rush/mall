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
import HubNav from "./HubNav";
import NavigationArrows from "./NavigationArrows";
import SlideWrapper from "./SlideWrapper";
import LiveTicker from "@/components/ui/LiveTicker";

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

const SLIDE_TO_SECTION: Partial<Record<SlideId, string>> = {
  "why-cover": "why",
  why: "why",
  "retail-cover": "retail",
  "retail-leasing": "retail",
  "retail-phase-ii": "retail",
  "retail-expansion-hospitality": "retail",
  "retail-expansion-wellness": "retail",
  "luxury-cover": "luxury",
  "luxury-signature": "luxury",
  "luxury-proposition": "luxury",
  "luxury-future": "luxury",
  "dining-cover": "dining",
  dining: "dining",
  "entertainment-cover": "entertainment",
  "entertainment-nickelodeon": "entertainment",
  "entertainment-sealife": "entertainment",
  "entertainment-crayola": "entertainment",
  "entertainment-flyover": "entertainment",
  "events-cover": "events",
  events: "events",
  "partner-cover": "partner",
  partner: "partner",
};

type Stage = "entry" | "intro" | "hub" | "deck";

export default function DeckExperience() {
  const [stage, setStage] = useState<Stage>("entry");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(
    new Set(),
  );
  const totalSlides = getTotalSlides();
  const nav = useDeckNavigation(totalSlides, stage === "deck");

  const handleEnter = useCallback(() => {
    setStage("intro");
  }, []);

  const handleSkip = useCallback(() => {
    setStage("hub");
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavigateToSlide = useCallback(
    (slideId: SlideId) => {
      const sectionId = SLIDE_TO_SECTION[slideId];
      if (sectionId) {
        setVisitedSections((prev) => new Set([...prev, sectionId]));
      }
      const index = getSlideIndex(slideId);
      if (index >= 0) {
        nav.goTo(index);
        setStage("deck");
      }
    },
    [nav],
  );

  const handleGoToHub = useCallback(() => {
    setStage("hub");
  }, []);

  useEffect(() => {
    if (stage !== "entry") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, handleEnter]);

  useEffect(() => {
    if (stage !== "deck") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleGoToHub();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, handleGoToHub]);

  return (
    <AnimatePresence mode="wait">
      {stage === "entry" && <EntryScreen key="entry" onEnter={handleEnter} />}

      {stage === "intro" && <IntroScreen key="intro" onSkip={handleSkip} />}

      {stage === "hub" && (
        <HubNav
          key="hub"
          visitedSections={visitedSections}
          onNavigate={handleNavigateToSlide}
        />
      )}

      {stage === "deck" && (
        <DeckStage
          key="deck"
          nav={nav}
          totalSlides={totalSlides}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onCloseMenu={() => setMenuOpen(false)}
          onNavigateToSlide={handleNavigateToSlide}
          onGoToHub={handleGoToHub}
        />
      )}
    </AnimatePresence>
  );
}

interface DeckStageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nav: any;
  totalSlides: number;
  menuOpen: boolean;
  toggleMenu: () => void;
  onCloseMenu: () => void;
  onNavigateToSlide: (id: SlideId) => void;
  onGoToHub: () => void;
}

function DeckStage({
  nav,
  totalSlides,
  menuOpen,
  toggleMenu,
  onCloseMenu,
  onNavigateToSlide,
  onGoToHub,
}: DeckStageProps) {
  const allSlides = getAllSlideIds();
  const currentSlideId = allSlides[nav.current];
  const Component = currentSlideId ? SLIDE_COMPONENTS[currentSlideId] : null;

  if (!Component) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden touch-none select-none">
      <SideMenu
        isOpen={menuOpen}
        onToggle={toggleMenu}
        onClose={onCloseMenu}
        currentSlideId={currentSlideId}
        onNavigate={onNavigateToSlide}
        onGoToHub={onGoToHub}
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
              onGoToHub={onGoToHub}
            />
          </SlideWrapper>
        </AnimatePresence>
      </div>

      <div
        className="fixed bottom-9 right-6 z-[70] hidden md:flex items-center gap-2
                   px-4 py-2 rounded-full border border-white/10 bg-black/25 backdrop-blur-xl
                   shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
      >
        <button
          onClick={onGoToHub}
          className="text-white/30 hover:text-[var(--gold)] text-[0.55rem] tracking-[0.22em] uppercase transition-colors duration-300 mr-2"
          title="Back to Hub (Esc)"
        >
          ← Hub
        </button>
        <span className="text-white/40 text-[0.6rem] tabular-nums tracking-[0.2em]">
          {String(nav.current + 1).padStart(2, "0")} /{" "}
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      <LiveTicker />
    </div>
  );
}
