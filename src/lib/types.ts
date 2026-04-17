import type { ComponentType, CSSProperties } from "react";

export type IconComponent = ComponentType<{
  className?: string;
  size?: number;
  style?: CSSProperties;
}>;

export type NavId =
  | "hero"
  | "why"
  | "retail"
  | "luxury"
  | "dining"
  | "entertainment"
  | "events"
  | "cta";
