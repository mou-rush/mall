"use client";
import { useCallback, useState } from "react";
import type { SlideId } from "@/lib/slide-registry";

export interface ExplorationPath {
  slideId: SlideId;
  timestamp: number;
  section: string;
}

interface ExplorationNavigationReturn {
  readonly current: SlideId | null;
  readonly explorationPath: ExplorationPath[];
  readonly visitedSlides: Set<SlideId>;
  readonly navigateTo: (slideId: SlideId, section?: string) => void;
  readonly goBack: () => void;
  readonly clearHistory: () => void;
  readonly getProgress: () => { visited: number; total: number };
}

export function useExplorationNavigation(
  totalSlides: number,
): ExplorationNavigationReturn {
  const [current, setCurrent] = useState<SlideId | null>(null);
  const [explorationPath, setExplorationPath] = useState<ExplorationPath[]>([]);
  const [visitedSlides, setVisitedSlides] = useState<Set<SlideId>>(new Set());

  const navigateTo = useCallback((slideId: SlideId, section?: string) => {
    setCurrent(slideId);

    setExplorationPath((prev) => [
      ...prev,
      {
        slideId,
        timestamp: Date.now(),
        section: section ?? "",
      },
    ]);

    setVisitedSlides((prev) => new Set([...prev, slideId]));
  }, []);

  const goBack = useCallback(() => {
    setExplorationPath((prev) => {
      if (prev.length <= 1) return prev;
      const newPath = prev.slice(0, -1);
      const previousSlide = newPath[newPath.length - 1];
      if (previousSlide) {
        setCurrent(previousSlide.slideId);
      }
      return newPath;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setExplorationPath([]);
    setVisitedSlides(new Set());
    setCurrent(null);
  }, []);

  const getProgress = useCallback(() => {
    return {
      visited: visitedSlides.size,
      total: totalSlides,
    };
  }, [visitedSlides.size, totalSlides]);

  return {
    current,
    explorationPath,
    visitedSlides,
    navigateTo,
    goBack,
    clearHistory,
    getProgress,
  };
}
