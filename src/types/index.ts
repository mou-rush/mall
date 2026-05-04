import type { ComponentType, ReactNode } from "react";
import type { SlideId } from "@/lib/slide-registry";

export type IconComponent = ComponentType<{
  readonly className?: string;
  readonly size?: number;
  readonly style?: React.CSSProperties;
}>;

export interface SocialItem {
  readonly label: string;
  readonly href: string;
  readonly icon: ReactNode;
}

export interface HubSection {
  readonly id: string;
  readonly label: string;
  readonly tagline: string;
  readonly stat: string;
  readonly description: string;
  readonly coverSlide: SlideId;
  readonly subSlides: ReadonlyArray<{
    readonly id: SlideId;
    readonly label: string;
  }>;
  readonly image: string;
  readonly color: string;
}

export type Stage = "entry" | "intro" | "hub" | "content" | "detail";

export interface ExplorationPathItem {
  readonly slideId: SlideId;
  readonly timestamp: number;
  readonly section: string;
}

export interface ExplorationProgress {
  readonly visited: number;
  readonly total: number;
}

export interface SlideComponentProps {
  readonly isActive: boolean;
  readonly onNext?: () => void;
  readonly goTo?: (slide: number) => void;
  readonly currentSlide?: number;
  readonly onGoToHub?: () => void;
  readonly onNavigateToSlide?: (slideId: SlideId, section: string) => void;
  readonly currentSection?: string;
}

export type SlideComponent = ComponentType<SlideComponentProps>;

export interface MenuItemComponentProps {
  readonly item: {
    readonly id: string;
    readonly label: string;
    readonly slideId?: SlideId;
    readonly subItems?: ReadonlyArray<{
      readonly id: string;
      readonly label: string;
      readonly slideId: SlideId;
    }>;
  };
  readonly currentSlideId: SlideId;
  readonly isExpanded: boolean;
  readonly onToggleExpand: () => void;
  readonly onNavigate: (slideId: SlideId) => void;
}
