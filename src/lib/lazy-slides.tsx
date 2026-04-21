/**
 * Centralized lazy loading for all deck slide components.
 * All slides are loaded on-demand to optimize initial bundle size.
 * SSR is disabled since slides require client-side Framer Motion.
 */
"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const SlideLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[var(--moa-black)]">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-[var(--gold)]" />
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        Loading
      </p>
    </div>
  </div>
);

export interface SlideProps {
  isActive: boolean;
  onNext?: () => void;
  goTo?: (idx: number) => void;
  currentSlide?: number;
}

export type SlideComponent = ComponentType<SlideProps>;

export const HeroSlide = dynamic(
  () => import("@/components/deck/slides/HeroSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const WhySlide = dynamic(
  () => import("@/components/deck/slides/WhySlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const RetailLeasingSlide = dynamic(
  () => import("@/components/deck/slides/RetailLeasingSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const RetailPhaseIISlide = dynamic(
  () => import("@/components/deck/slides/RetailPhaseIISlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const RetailExpansionHospitalitySlide = dynamic(
  () => import("@/components/deck/slides/RetailExpansionHospitalitySlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const RetailExpansionWellnessSlide = dynamic(
  () => import("@/components/deck/slides/RetailExpansionWellnessSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const LuxurySignatureSlide = dynamic(
  () => import("@/components/deck/slides/LuxurySignatureSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const LuxuryPropositionSlide = dynamic(
  () => import("@/components/deck/slides/LuxuryPropositionSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const LuxuryFutureSlide = dynamic(
  () => import("@/components/deck/slides/LuxuryFutureSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const DiningSlide = dynamic(
  () => import("@/components/deck/slides/DiningSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const EntertainmentNickelodeonSlide = dynamic(
  () => import("@/components/deck/slides/EntertainmentNickelodeonSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const EntertainmentSealifeSlide = dynamic(
  () => import("@/components/deck/slides/EntertainmentSealifeSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const EntertainmentCrayolaSlide = dynamic(
  () => import("@/components/deck/slides/EntertainmentCrayolaSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const EntertainmentFlyoverSlide = dynamic(
  () => import("@/components/deck/slides/EntertainmentFlyoverSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const EventsSlide = dynamic(
  () => import("@/components/deck/slides/EventsSlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const CTASlide = dynamic(
  () => import("@/components/deck/slides/CTASlide"),
  {
    ssr: false,
    loading: SlideLoader,
  },
) as SlideComponent;

export const SideMenu = dynamic(() => import("@/components/deck/SideMenu"), {
  ssr: false,
  loading: () => null,
});

export const ContactFormLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[var(--gold)]" />
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        Loading Form
      </p>
    </div>
  </div>
);

export const ContactForm = dynamic(
  () => import("@/components/forms/ContactForm"),
  {
    ssr: false,
    loading: ContactFormLoader,
  },
);
