/**
 * Centralized Data Service with React cache() for optimal performance
 *
 * This service provides:
 * - Deduplicated data access via React cache()
 * - Memoized expensive computations
 * - Single source of truth for all content
 * - Type-safe data access
 */

import { cache } from "react";
import {
  DECK_WEBSITE_CONTENT,
  LEASING_DEVELOPMENT,
  type DeckEntertainmentItem,
  type DeckPillar,
  type DeckCategory,
  type DeckCard,
  type MoaStat,
  type RetailScene,
} from "./moa-website-content";
import { BRAND_LOGO_MAP, CTA_FORM_LABELS, VIDEOS } from "./constants";

export const getEntertainmentContent = cache(() => {
  return {
    ...DECK_WEBSITE_CONTENT.entertainment,
    items: DECK_WEBSITE_CONTENT.entertainment.items,
    itemsById: DECK_WEBSITE_CONTENT.entertainment.items.reduce(
      (acc, item) => {
        acc[item.id] = item;
        return acc;
      },
      {} as Record<string, DeckEntertainmentItem>,
    ),
  };
});

export const getLuxuryContent = cache(() => {
  return {
    ...DECK_WEBSITE_CONTENT.luxury,
    pillars: DECK_WEBSITE_CONTENT.luxury.pillars,
  };
});

export const getEventsContent = cache(() => {
  return {
    ...DECK_WEBSITE_CONTENT.events,
    categories: DECK_WEBSITE_CONTENT.events.categories,
  };
});

export const getDiningContent = cache(() => {
  return DECK_WEBSITE_CONTENT.dining;
});

export const getPartnerContent = cache(() => {
  return {
    ...DECK_WEBSITE_CONTENT.partner,
    cards: DECK_WEBSITE_CONTENT.partner.cards,
  };
});

export const getLeasingContent = cache(() => {
  return {
    ...LEASING_DEVELOPMENT,
    why: LEASING_DEVELOPMENT.why,
    retail: {
      ...LEASING_DEVELOPMENT.retail,
      scenes: LEASING_DEVELOPMENT.retail.scenes,
      scenesById: LEASING_DEVELOPMENT.retail.scenes.reduce(
        (acc, scene) => {
          acc[scene.id] = scene;
          return acc;
        },
        {} as Record<string, RetailScene>,
      ),
    },
  };
});

export const getBrandNames = cache(() => {
  return Object.keys(BRAND_LOGO_MAP);
});

export const getBrandLogoMap = cache(() => {
  return BRAND_LOGO_MAP;
});

export const getBrandLogo = cache((brandName: string) => {
  return BRAND_LOGO_MAP[brandName];
});

export const getFormLabels = cache(() => {
  return CTA_FORM_LABELS;
});

export const getVideos = cache(() => {
  return VIDEOS;
});

export const getRetailScene = cache((sceneId: string) => {
  const content = getLeasingContent();
  return content.retail.scenesById[sceneId] || content.retail.scenes[0];
});

export const getEntertainmentItem = cache((itemId: string) => {
  const content = getEntertainmentContent();
  return content.itemsById[itemId];
});

export const getLeasingStats = cache(() => {
  return LEASING_DEVELOPMENT.why.stats;
});

export const getLeasingContact = cache(() => {
  return LEASING_DEVELOPMENT.why.contact;
});

export type {
  DeckEntertainmentItem,
  DeckPillar,
  DeckCategory,
  DeckCard,
  MoaStat,
  RetailScene,
};

export { DECK_WEBSITE_CONTENT, LEASING_DEVELOPMENT, BRAND_LOGO_MAP, VIDEOS };
