import dynamic from "next/dynamic";

export const WhyThisProperty = dynamic(
  () => import("@/components/sections/WhyThisProperty"),
  { ssr: true },
);

export const Retail = dynamic(() => import("@/components/sections/Retail"), {
  ssr: true,
});

export const Luxury = dynamic(() => import("@/components/sections/Luxury"), {
  ssr: true,
});

export const DiningLifestyle = dynamic(
  () => import("@/components/sections/DiningLifestyle"),
  { ssr: true },
);

export const Entertainment = dynamic(
  () => import("@/components/sections/Entertainment"),
  { ssr: false },
);

export const Events = dynamic(() => import("@/components/sections/Events"), {
  ssr: true,
});

export const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA"),
  { ssr: true },
);
