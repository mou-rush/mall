"use client";
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useDeckNavigation } from "@/hooks/useDeckNavigation";
import EntryScreen from "./EntryScreen";
import IntroScreen from "./IntroScreen";
import DeckNav from "./DeckNav";
import SlideWrapper from "./SlideWrapper";
import HeroSlide from "./slides/HeroSlide";
import WhySlide from "./slides/WhySlide";
import RetailSlide from "./slides/RetailSlide";
import LuxurySlide from "./slides/LuxurySlide";
import DiningSlide from "./slides/DiningSlide";
import EntertainmentSlide from "./slides/EntertainmentSlide";
import EventsSlide from "./slides/EventsSlide";
import CTASlide from "./slides/CTASlide";

type SlideProps = {
  isActive: boolean;
  onNext?: () => void;
  goTo?: (idx: number) => void;
  currentSlide?: number;
};
type SlideComponent = React.ComponentType<SlideProps>;

const SLIDES: ReadonlyArray<{ id: string; Component: SlideComponent }> = [
  { id: "hero", Component: HeroSlide as SlideComponent },
  { id: "why", Component: WhySlide as SlideComponent },
  { id: "retail", Component: RetailSlide as SlideComponent },
  { id: "luxury", Component: LuxurySlide as SlideComponent },
  { id: "dining", Component: DiningSlide as SlideComponent },
  { id: "entertainment", Component: EntertainmentSlide as SlideComponent },
  { id: "events", Component: EventsSlide as SlideComponent },
  { id: "cta", Component: CTASlide as SlideComponent },
];

type Stage = "entry" | "intro" | "deck";

export default function DeckExperience() {
  const [stage, setStage] = useState<Stage>("entry");
  const nav = useDeckNavigation(SLIDES.length, stage === "deck");

  const handleEnter = useCallback(() => {
    setStage("intro");
  }, []);

  const handleSkip = useCallback(() => {
    setStage("deck");
  }, []);

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

  const { Component } = SLIDES[nav.current];

  return (
    <div className="fixed inset-0 bg-[var(--moa-black)] overflow-hidden touch-none select-none">
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

      <DeckNav
        current={nav.current}
        total={nav.total}
        goTo={nav.goTo}
        next={nav.next}
        prev={nav.prev}
      />
    </div>
  );
}
