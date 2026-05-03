"use client";
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useExplorationNavigation } from "@/hooks/useExplorationNavigation";
import { getTotalSlides, type SlideId } from "@/lib/slide-registry";
import EntryScreen from "./EntryScreen";
import IntroScreen from "./IntroScreen";
import Hub from "./Hub";
import ContentStage from "./ContentStage";
import type { SlideComponent } from "@/lib/lazy-slides";

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
  EventsSlide,
  CTASlide,
} from "@/lib/lazy-slides";

import {
  WhyCover,
  RetailCover,
  LuxuryCover,
  DiningCover,
  EntertainmentCover,
  EntertainmentNickelodeon,
  EntertainmentSealife,
  EntertainmentCrayola,
  EntertainmentFlyover,
  EventsCover,
  PartnerCover,
} from "./slides/CoverComponents";

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
  "entertainment-nickelodeon": EntertainmentNickelodeon,
  "entertainment-sealife": EntertainmentSealife,
  "entertainment-crayola": EntertainmentCrayola,
  "entertainment-flyover": EntertainmentFlyover,
  "events-cover": EventsCover,
  events: EventsSlide,
  "partner-cover": PartnerCover,
  partner: CTASlide,
};

type Stage = "entry" | "intro" | "hub" | "content" | "detail";

export default function DeckExperience() {
  const [stage, setStage] = useState<Stage>("entry");
  const totalSlides = getTotalSlides();
  const nav = useExplorationNavigation(totalSlides);

  const handleEnter = useCallback(() => {
    setStage("intro");
  }, []);

  const handleSkip = useCallback(() => {
    setStage("hub");
  }, []);

  const handleNavigateToSlide = useCallback(
    (slideId: SlideId, section: string) => {
      nav.navigateTo(slideId, section);
      setStage("content");
    },
    [nav],
  );

  const handleGoToHub = useCallback(() => {
    setStage("hub");
  }, []);

  const handleGoBack = useCallback(() => {
    if (nav.explorationPath.length > 1) {
      nav.goBack();
    } else {
      handleGoToHub();
    }
  }, [nav, handleGoToHub]);

  useEffect(() => {
    if (stage !== "entry") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, handleEnter]);

  useEffect(() => {
    if (stage !== "content" && stage !== "detail") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleGoBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, handleGoBack]);

  const progress = nav.getProgress();

  return (
    <AnimatePresence mode="wait">
      {stage === "entry" && <EntryScreen key="entry" onEnter={handleEnter} />}

      {stage === "intro" && <IntroScreen key="intro" onSkip={handleSkip} />}

      {stage === "hub" && (
        <Hub
          key="hub"
          visitedSlides={nav.visitedSlides}
          onNavigate={handleNavigateToSlide}
          explorationProgress={progress}
        />
      )}

      {(stage === "content" || stage === "detail") && nav.current && (
        <ContentStage
          key="content"
          currentSlideId={nav.current}
          explorationPath={nav.explorationPath}
          onNavigateToSlide={handleNavigateToSlide}
          onGoToHub={handleGoToHub}
          onGoBack={handleGoBack}
          progress={progress}
          Component={nav.current ? SLIDE_COMPONENTS[nav.current] : null}
        />
      )}
    </AnimatePresence>
  );
}

