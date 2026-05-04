/**
 * Centralized animation configurations for consistent motion design
 * across the entire deck experience.
 */

import type { Transition } from "framer-motion";

/**
 * Premium cubic-bezier easing for smooth, cinematic animations
 */
export const EASING = {
  cinematic: [0.22, 1, 0.36, 1] as const,

  smoothOut: [0.16, 1, 0.3, 1] as const,

  reveal: [0.19, 1, 0.22, 1] as const,

  easeOut: "easeOut" as const,

  easeInOut: "easeInOut" as const,

  linear: "linear" as const,
} as const;

/**
 * Standard animation durations in seconds
 */
export const DURATION = {
  /** Quick transition (0.6s) */
  fast: 0.6,

  /** Standard transition (0.8s) */
  normal: 0.8,

  /** Smooth transition (1.2s) */
  smooth: 1.2,

  /** Cinematic entrance (1.5s) */
  cinematic: 1.5,

  /** Slow reveal (1.8s) */
  slow: 1.8,

  /** Very slow Ken Burns effect (15s) */
  kenBurns: 15,

  /** Continuous zoom (20-25s) */
  zoom: 20,
} as const;

/**
 * Standard animation delays in seconds
 */
export const DELAY = {
  /** No delay */
  none: 0,
  quick: 0.3,
  short: 0.6,
  medium: 1.0,
  long: 1.5,
  veryLong: 2.0,
  extended: 3.0,
} as const;

/**
 * Pre-configured transition objects for common animation patterns
 */
export const TRANSITIONS = {
  /** Standard fade and scale entrance */
  fadeIn: {
    duration: DURATION.normal,
    delay: DELAY.quick,
    ease: EASING.cinematic,
  } satisfies Transition,

  /** Cinematic text reveal */
  textReveal: {
    duration: DURATION.cinematic,
    delay: DELAY.long,
    ease: EASING.reveal,
  } satisfies Transition,

  /** Quick fade */
  quickFade: {
    duration: DURATION.fast,
    ease: EASING.easeOut,
  } satisfies Transition,

  /** Ken Burns zoom effect */
  kenBurns: {
    duration: DURATION.kenBurns,
    ease: EASING.easeOut,
  } satisfies Transition,

  /** Continuous subtle zoom */
  continuousZoom: {
    duration: DURATION.zoom,
    ease: EASING.linear,
  } satisfies Transition,

  /** Video entrance from bottom */
  videoEnter: {
    duration: 1.8,
    ease: EASING.cinematic,
  } satisfies Transition,
} as const;

/**
 * Common animation variants for text and content
 */
export const VARIANTS = {
  /** Fade in with scale */
  fadeScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },

  /** Slide up reveal */
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },

  /** Slide up from below viewport */
  slideUpFull: {
    initial: { y: "110%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
  },

  /** Subtle slide up */
  slideUpSubtle: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
  },

  /** Fade in only */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },

  /** Video entrance from right */
  videoRight: {
    initial: { x: "100%", scale: 1.1 },
    animate: { x: 0, scale: [1.1, 1, 1.05] },
  },

  /** Video entrance from bottom */
  videoBottom: {
    initial: { y: "100%", scale: 1.1 },
    animate: { y: 0, scale: [1.1, 1, 1.05] },
  },

  /** Ken Burns zoom */
  kenBurns: {
    initial: { scale: 1.0, opacity: 0 },
    animate: { scale: 1.15, opacity: 0.55 },
  },
} as const;

/**
 * Common overlay gradient configurations
 */
export const OVERLAYS = {
  solidMedium: "bg-black/55",
  solidHeavy: "bg-black/65",
  solidLight: "bg-black/40",
  gradientVertical: "bg-gradient-to-b from-black/60 via-black/40 to-black/70",
  radialCenter:
    "bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]",
  goldenGlow:
    "bg-[radial-gradient(ellipse_50%_40%_at_50%_52%,rgba(255,199,44,0.10)_0%,transparent_70%)]",
} as const;

/**
 * Common text style configurations
 */
export const TEXT_STYLES = {
  /** Large headline number */
  heroNumber: {
    className: "font-black leading-none tracking-tighter",
    fontSize: "clamp(10rem, 20vw, 24rem)" as const,
  },

  /** Extra large headline */
  heroXL: {
    className: "font-black leading-none tracking-tighter",
    fontSize: "clamp(10rem, 22vw, 26rem)" as const,
  },

  /** Supporting text */
  supporting: {
    className: "text-white/55 font-light uppercase tracking-[0.3em]",
    fontSize: "clamp(1rem, 2vw, 1.5rem)" as const,
  },

  /** Small supporting text */
  supportingSmall: {
    className: "font-light uppercase tracking-[0.45em]",
    fontSize: "clamp(0.7rem, 1.2vw, 1rem)" as const,
  },

  /** Impact headline */
  impact: {
    className: "block font-black uppercase leading-[0.88] tracking-[-0.03em]",
    fontSize: "clamp(6rem, 14vw, 18rem)" as const,
  },
} as const;
