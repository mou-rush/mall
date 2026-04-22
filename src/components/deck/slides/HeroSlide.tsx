"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import CTAButton from "./CTAButton";
import SocialDock from "./SocialDock";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/mallofamerica",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://twitter.com/mallofamerica",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.85L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/mall-of-america",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

interface HeroSlideProps {
  readonly isActive: boolean;
  readonly onNext?: () => void;
}

export default function HeroSlide({ isActive, onNext }: HeroSlideProps) {
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

      <SocialDock isActive={isActive} socials={SOCIALS} />
    </div>
  );
}
