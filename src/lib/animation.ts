export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.19, 1, 0.22, 1];

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 1,
  premium: 1.5,
} as const;

export const ANIMATION_DELAYS = {
  short: 0.2,
  medium: 0.4,
  long: 1.2,
  premium: 1.7,
} as const;
