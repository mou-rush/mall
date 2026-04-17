/**
 * "use client" is required here so that the Entertainment entry can use
 * `ssr: false`. Server Components may import from client modules — the
 * boundary is respected at render time.
 *
 * All section-level dynamic imports live here to keep page.tsx clean.
 * `ssr: true` is the next/dynamic default and is omitted for brevity.
 */
"use client";
import dynamic from "next/dynamic";

export const WhyThisProperty = dynamic(
  () => import("@/components/sections/WhyThisProperty"),
);

export const Retail = dynamic(() => import("@/components/sections/Retail"));

export const Luxury = dynamic(() => import("@/components/sections/Luxury"));

export const DiningLifestyle = dynamic(
  () => import("@/components/sections/DiningLifestyle"),
);

export const Entertainment = dynamic(
  () => import("@/components/sections/Entertainment"),
  { ssr: false },
);

export const Events = dynamic(() => import("@/components/sections/Events"));

export const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"));
