"use client";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[var(--moa-black)] font-sans selection:bg-[var(--gold)] selection:text-black">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: EASE_PREMIUM }}
      >
        <Image
          src="/images/Home/home.png"
          alt="Mall of America"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={100}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--moa-blue-rgb),0.85)] via-[rgba(var(--moa-blue-rgb),0.35)] to-[rgba(var(--moa-blue-rgb),0.75)]" />
        <div className="absolute inset-x-0 top-0 h-[35vh] bg-gradient-to-b from-[rgba(var(--moa-blue-rgb),0.60)] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-[rgba(var(--moa-blue-rgb),0.85)] to-transparent pointer-events-none" />

        <motion.div
          className="absolute -inset-32 opacity-40 pointer-events-none"
          animate={
            isActive ? { x: [0, 30, 0], y: [0, -20, 0] } : { x: 0, y: 0 }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(50% 50% at 25% 30%, rgba(var(--moa-yellow-rgb), 0.15), transparent 65%), radial-gradient(60% 60% at 75% 40%, rgba(255,255,255,0.08), transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      <div className="absolute top-12 left-12 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1, duration: 1.5, ease: EASE_PREMIUM }}
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

      <div className="absolute left-12 bottom-12 z-40">
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 1.5, ease: EASE_PREMIUM }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.985 }}
          className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-black/25 px-5 py-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] cursor-pointer"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_35%,rgba(201,168,76,0.14)_50%,transparent_65%,transparent_100%)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out" />
          <div className="relative mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-[var(--gold)] to-transparent" />
            <span className="text-[0.52rem] uppercase tracking-[0.45em] text-[var(--gold)]/90">
              Opening Scene
            </span>
          </div>

          <div className="relative flex items-center gap-5">
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-white/[0.03] flex items-center justify-center transition-all duration-500 group-hover:border-[var(--gold)] group-hover:shadow-[0_0_28px_rgba(201,168,76,0.28)]">
              <motion.div
                className="absolute inset-[5px] rounded-full border border-[var(--gold)]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-white group-hover:bg-[var(--gold)] rounded-full"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="absolute inset-0 w-full h-full -rotate-90 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              >
                <motion.circle
                  cx="8"
                  cy="8"
                  r="7.5"
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  strokeDasharray="48"
                  initial={{ strokeDashoffset: 48 }}
                  whileHover={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[0.72rem] md:text-[0.8rem] uppercase tracking-[0.46em] text-white/95 transition-colors duration-300 group-hover:text-white">
                Enter The Mall
              </span>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-[0.52rem] uppercase tracking-[0.35em] text-white/45 group-hover:text-[var(--gold)]/90 transition-colors duration-500">
                  Start Presentation
                </span>
                <div className="h-px w-8 bg-white/20 group-hover:w-16 group-hover:bg-[var(--gold)] transition-all duration-700 ease-in-out" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="absolute right-12 bottom-12 z-40 flex flex-col gap-5">
        {SOCIALS.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.8 + i * 0.1, duration: 0.8 }}
            className="relative w-11 h-11 flex items-center justify-center rounded-full border border-white/30 text-white/85 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-500 hover:-translate-y-1 bg-black/30 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md group"
            aria-label={social.label}
          >
            <div className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-0 group-hover:opacity-10 transition-opacity" />
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
