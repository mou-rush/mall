import FloatingNav from "@/components/navigation/FloatingNav";
import Hero from "@/components/sections/Hero";
import {
  WhyThisProperty,
  Retail,
  Luxury,
  DiningLifestyle,
  Entertainment,
  Events,
  FinalCTA,
} from "@/lib/lazy-sections";

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
