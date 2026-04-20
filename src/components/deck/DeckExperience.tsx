"use client";
import React, { useState, useCallback, useEffect } from "react";
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
import SideMenu from "./SideMenu";
import NavigationArrows from "./NavigationArrows";
import SlideWrapper from "./SlideWrapper";

import HeroSlide from "./slides/HeroSlide";
import WhySlide from "./slides/WhySlide";
import CoverSlide from "./slides/CoverSlide";
import RetailLeasingSlide from "./slides/RetailLeasingSlide";
import RetailPhaseIISlide from "./slides/RetailPhaseIISlide";
import RetailExpansionHospitalitySlide from "./slides/RetailExpansionHospitalitySlide";
import RetailExpansionWellnessSlide from "./slides/RetailExpansionWellnessSlide";
import LuxurySignatureSlide from "./slides/LuxurySignatureSlide";
import LuxuryPropositionSlide from "./slides/LuxuryPropositionSlide";
import LuxuryFutureSlide from "./slides/LuxuryFutureSlide";
import DiningSlide from "./slides/DiningSlide";
import EntertainmentNickelodeonSlide from "./slides/EntertainmentNickelodeonSlide";
import EntertainmentSealifeSlide from "./slides/EntertainmentSealifeSlide";
import EntertainmentCrayolaSlide from "./slides/EntertainmentCrayolaSlide";
import EntertainmentFlyoverSlide from "./slides/EntertainmentFlyoverSlide";
import EventsSlide from "./slides/EventsSlide";
import CTASlide from "./slides/CTASlide";

type SlideProps = {
  isActive: boolean;
  onNext?: () => void;
  goTo?: (idx: number) => void;
  currentSlide?: number;
};
type SlideComponent = React.ComponentType<SlideProps>;

const WhyCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Why MOA"
    imageSrc="/images/why/Why_MOA_Cover.jpg"
  />
);

const RetailCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Retail Leasing"
    imageSrc="/images/retail/Retail_Leasing_Cover.jpg"
  />
);

const LuxuryCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Luxury"
    imageSrc="/images/luxury/Luxury_Cover.jpg"
  />
);

const DiningCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Dining"
    imageSrc="/images/Dinning/Dinning_Cover.jpg"
  />
);

const EntertainmentCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Attractions + Entertainment"
    imageSrc="/images/entertainment/Attractions_and_Entertainment_Cover.png"
  />
);

const EventsCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Events"
    imageSrc="/images/events/Events_Cover.jpg"
  />
);

const PartnerCover: SlideComponent = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Partner With Us"
    imageSrc="/images/Home/home.png"
  />
);

// Map slide IDs to components
const SLIDE_COMPONENTS: Record<SlideId, SlideComponent> = {
  hero: HeroSlide as SlideComponent,
  "why-cover": WhyCover,
  why: WhySlide as SlideComponent,
  "retail-cover": RetailCover,
  "retail-leasing": RetailLeasingSlide as SlideComponent,
  "retail-phase-ii": RetailPhaseIISlide as SlideComponent,
  "retail-expansion-hospitality":
    RetailExpansionHospitalitySlide as SlideComponent,
  "retail-expansion-wellness": RetailExpansionWellnessSlide as SlideComponent,
  "luxury-cover": LuxuryCover,
  "luxury-signature": LuxurySignatureSlide as SlideComponent,
  "luxury-proposition": LuxuryPropositionSlide as SlideComponent,
  "luxury-future": LuxuryFutureSlide as SlideComponent,
  "dining-cover": DiningCover,
  dining: DiningSlide as SlideComponent,
  "entertainment-cover": EntertainmentCover,
  "entertainment-nickelodeon": EntertainmentNickelodeonSlide as SlideComponent,
  "entertainment-sealife": EntertainmentSealifeSlide as SlideComponent,
  "entertainment-crayola": EntertainmentCrayolaSlide as SlideComponent,
  "entertainment-flyover": EntertainmentFlyoverSlide as SlideComponent,
  "events-cover": EventsCover,
  events: EventsSlide as SlideComponent,
  "partner-cover": PartnerCover,
  partner: CTASlide as SlideComponent,
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
        currentSlideId={currentSlideId}
        onNavigate={handleNavigateToSlide}
      />

      <NavigationArrows
        onPrev={nav.prev}
        onNext={nav.next}
        canGoPrev={nav.current > 0}
        canGoNext={nav.current < totalSlides - 1}
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
