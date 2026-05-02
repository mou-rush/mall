"use client";
import React, { useState, useCallback, useEffect, FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExplorationNavigation } from "@/hooks/useExplorationNavigation";
import { getTotalSlides, type SlideId } from "@/lib/slide-registry";
import EntryScreen from "./EntryScreen";
import IntroScreen from "./IntroScreen";
import Hub from "./Hub";
import LiveTicker from "@/components/ui/LiveTicker";
import { ScrollProgressBar } from "@/components/ui/ScrollAnimations";

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
        />
      )}
    </AnimatePresence>
  );
}

interface ContentStageProps {
  readonly currentSlideId: SlideId;
  readonly explorationPath: ReadonlyArray<{
    readonly slideId: SlideId;
    readonly timestamp: number;
    readonly section: string;
  }>;
  readonly onNavigateToSlide: (id: SlideId, section: string) => void;
  readonly onGoToHub: () => void;
  readonly onGoBack: () => void;
  readonly progress: { readonly visited: number; readonly total: number };
}

function ContentStage({
  currentSlideId,
  explorationPath,
  onNavigateToSlide,
  onGoToHub,
  onGoBack,
  progress,
}: ContentStageProps) {
  const Component = currentSlideId ? SLIDE_COMPONENTS[currentSlideId] : null;
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(false);

  if (!Component) return null;

  const progressPercent = Math.round((progress.visited / progress.total) * 100);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <ScrollProgressBar />

      <div className="fixed top-0 left-0 right-0 z-[80] pointer-events-none">
        <div className="max-w-screen-2xl mx-auto px-6 py-6 flex items-center justify-between pointer-events-auto">
          <motion.button
            onClick={onGoBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 text-white/60 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">
              Back
            </span>
          </motion.button>

          {/* Breadcrumbs */}
          <div className="relative">
            <button
              className="px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all"
              onMouseEnter={() => setShowBreadcrumbs(true)}
              onMouseLeave={() => setShowBreadcrumbs(false)}
              aria-label="View breadcrumbs"
            >
              <span className="text-white/60 text-xs uppercase tracking-wider">
                Path: {explorationPath.length} stops
              </span>
            </button>

            <AnimatePresence>
              {showBreadcrumbs && explorationPath.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 p-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl min-w-[300px]"
                >
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                    Your Journey
                  </p>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {explorationPath.map((item, index) => (
                      <button
                        key={`${item.slideId}-${item.timestamp}`}
                        onClick={() =>
                          onNavigateToSlide(item.slideId, item.section)
                        }
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3"
                      >
                        <span className="text-white/40 text-xs tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/80 text-sm flex-1">
                          {item.slideId
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                        {index === explorationPath.length - 1 && (
                          <span className="text-[var(--gold)] text-xs">
                            Current
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={onGoToHub}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--gold)]/10 backdrop-blur-xl border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 text-[var(--gold)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="text-[var(--gold)] text-sm font-medium">Hub</span>
          </motion.button>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-[80] pointer-events-none">
        <div className="px-5 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs uppercase tracking-wider">
              Explored
            </span>
            <span className="text-[var(--gold)] text-lg font-bold tabular-nums">
              {progressPercent}%
            </span>
            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--gold)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full overflow-y-auto">
        <motion.div
          key={currentSlideId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Component
            isActive
            onNext={() => {}}
            goTo={() => {}}
            currentSlide={0}
            onGoToHub={onGoToHub}
          />
        </motion.div>
      </div>

      <LiveTicker />
    </div>
  );
}
