export type SlideId =
  | "hero"
  // Why MOA
  | "why-cover"
  | "why"
  // Retail Leasing
  | "retail-cover"
  | "retail-leasing"
  | "retail-phase-ii"
  | "retail-expansion-hospitality"
  | "retail-expansion-wellness"
  // Luxury
  | "luxury-cover"
  | "luxury-signature"
  | "luxury-proposition"
  | "luxury-future"
  // Dining
  | "dining-cover"
  | "dining"
  // Attractions + Entertainment
  | "entertainment-cover"
  | "entertainment-nickelodeon"
  | "entertainment-sealife"
  | "entertainment-crayola"
  | "entertainment-flyover"
  // Events
  | "events-cover"
  | "events"
  // Partner
  | "partner-cover"
  | "partner";

export interface MenuItem {
  id: string;
  label: string;
  slideId: SlideId;
  subItems?: MenuItem[];
}

export const MENU_STRUCTURE: ReadonlyArray<MenuItem> = [
  {
    id: "why",
    label: "Why MOA",
    slideId: "why-cover",
    subItems: [{ id: "why-content", label: "Overview", slideId: "why" }],
  },
  {
    id: "retail",
    label: "Retail Leasing",
    slideId: "retail-cover",
    subItems: [
      { id: "retail-leasing", label: "Leasing", slideId: "retail-leasing" },
      { id: "retail-phase-ii", label: "Phase II", slideId: "retail-phase-ii" },
      {
        id: "retail-expansion-hospitality",
        label: "Expansion (Hospitality + Stay)",
        slideId: "retail-expansion-hospitality",
      },
      {
        id: "retail-expansion-wellness",
        label: "Expansion (Water + Wellness)",
        slideId: "retail-expansion-wellness",
      },
    ],
  },
  {
    id: "luxury",
    label: "Luxury",
    slideId: "luxury-cover",
    subItems: [
      {
        id: "luxury-signature",
        label: "Signature",
        slideId: "luxury-signature",
      },
      {
        id: "luxury-proposition",
        label: "Proposition",
        slideId: "luxury-proposition",
      },
      { id: "luxury-future", label: "Future", slideId: "luxury-future" },
    ],
  },
  {
    id: "dining",
    label: "Dining",
    slideId: "dining-cover",
    subItems: [{ id: "dining-content", label: "Overview", slideId: "dining" }],
  },
  {
    id: "entertainment",
    label: "Attractions + Entertainment",
    slideId: "entertainment-cover",
    subItems: [
      {
        id: "entertainment-nickelodeon",
        label: "Nickelodeon Universe",
        slideId: "entertainment-nickelodeon",
      },
      {
        id: "entertainment-sealife",
        label: "Sea Life",
        slideId: "entertainment-sealife",
      },
      {
        id: "entertainment-crayola",
        label: "Crayola Experience",
        slideId: "entertainment-crayola",
      },
      {
        id: "entertainment-flyover",
        label: "Flyover America",
        slideId: "entertainment-flyover",
      },
    ],
  },
  {
    id: "events",
    label: "Events",
    slideId: "events-cover",
    subItems: [{ id: "events-content", label: "Overview", slideId: "events" }],
  },
  {
    id: "partner",
    label: "Partner",
    slideId: "partner-cover",
    subItems: [
      { id: "partner-content", label: "Overview", slideId: "partner" },
    ],
  },
];

export function getAllSlideIds(): ReadonlyArray<SlideId> {
  const slides: SlideId[] = ["hero"];

  MENU_STRUCTURE.forEach((item) => {
    if (item.subItems && item.subItems.length > 0) {
      slides.push(item.slideId);

      item.subItems.forEach((subItem) => {
        slides.push(subItem.slideId);
      });
    } else {
      slides.push(item.slideId);
    }
  });

  return slides;
}

export function getSlideIndex(slideId: SlideId): number {
  return getAllSlideIds().indexOf(slideId);
}

export function getSlideById(index: number): SlideId | undefined {
  return getAllSlideIds()[index];
}

export function getTotalSlides(): number {
  return getAllSlideIds().length;
}
