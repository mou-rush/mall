import dynamic from "next/dynamic";
import FloatingNav from "@/components/navigation/FloatingNav";
import Hero from "@/components/sections/Hero";

const WhyThisProperty = dynamic(
  () => import("@/components/sections/WhyThisProperty"),
  { ssr: true },
);

const Retail = dynamic(() => import("@/components/sections/Retail"), {
  ssr: true,
});

const Luxury = dynamic(() => import("@/components/sections/Luxury"), {
  ssr: true,
});

const DiningLifestyle = dynamic(
  () => import("@/components/sections/DiningLifestyle"),
  { ssr: true },
);

const Entertainment = dynamic(
  () => import("@/components/sections/Entertainment"),
);

const Events = dynamic(() => import("@/components/sections/Events"), {
  ssr: true,
});

const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), {
  ssr: true,
});

export default function MallOfAmericaExperience() {
  return (
    <>
      <FloatingNav />

      <main className="bg-[var(--moa-black)]">
        <Hero />

        <WhyThisProperty />

        <Retail />
        <Luxury />

        <DiningLifestyle />

        <Entertainment />

        <Events />

        <FinalCTA />
      </main>
    </>
  );
}
