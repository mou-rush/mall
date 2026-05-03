"use client";
import {memo} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CTAButton from "./CTAButton";
import SocialDock from "./SocialDock";
import { EASE_PREMIUM } from "@/lib/animation";
import { useSocialLinks, type SocialLinkData } from "@/hooks/useSocialLinks";
import type { SocialItem } from "@/types";

interface HeroSlideProps {
  readonly isActive: boolean;
  readonly onNext?: () => void;
}

export default memo(function HeroSlide({ isActive, onNext }: HeroSlideProps) {
  const socialLinks = useSocialLinks();
  
  const socials: SocialItem[] = socialLinks.map((link) => ({
    label: link.label,
    href: link.href,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d={link.iconPath} />
      </svg>
    ),
  }));

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[var(--moa-black)] font-sans selection:bg-[var(--gold)] selection:text-black">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 3.5, ease: EASE_PREMIUM }}
      >
        <Image
          src="/images/Home/moa_1.jpg"
          alt="Mall of America"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={100}
        />

        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(14,18,28,0.56)_0%,rgba(12,16,26,0.22)_42%,rgba(4,8,18,0.6)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[38vh] bg-gradient-to-b from-[rgba(255,199,44,0.12)] via-[rgba(255,255,255,0.04)] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[48vh] bg-gradient-to-t from-[rgba(4,8,16,0.68)] via-[rgba(12,16,24,0.26)] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_36%,rgba(255,199,44,0.16),transparent_24%),radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.08),transparent_28%)]" />
      </motion.div>
      <div className="absolute top-12 left-12 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.2, duration: 2, ease: EASE_PREMIUM }}
          className="relative w-28 h-12 md:w-40 md:h-16"
        >
          <Image
            src="/images/moa-logo.png"
            alt="MOA"
            fill
            className="object-contain object-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 h-[34vh] bg-gradient-to-t from-black/40 via-black/12 to-transparent pointer-events-none" />

      <CTAButton isActive={isActive} onNext={onNext} />

      <SocialDock isActive={isActive} socials={socials} />
    </div>
  );
});
