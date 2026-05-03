"use client";

import { FC, memo } from "react";
import CoverSlide from "./CoverSlide";
import { EntertainmentImmersiveSlide } from "@/lib/lazy-slides";
import type { SlideComponentProps } from "@/types";

const EntertainmentExperience = EntertainmentImmersiveSlide as unknown as FC<
  SlideComponentProps & {
    readonly initialAttraction?: "nick" | "sealife" | "crayola" | "flyover";
  }
>;

const WhyCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Why MOA"
    imageSrc="/images/why/Why_MOA_Cover.jpg"
  />
);

const RetailCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Retail Leasing"
    imageSrc="/images/retail/Retail_Leasing_Cover.jpg"
  />
);

const LuxuryCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Luxury"
    imageSrc="/images/luxury/Luxury_Cover.jpg"
  />
);

const DiningCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Dining"
    imageSrc="/images/Dinning/Dinning_Cover.jpg"
  />
);

const EntertainmentCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <EntertainmentExperience isActive={isActive} />
);

const EntertainmentNickelodeonComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <EntertainmentExperience isActive={isActive} initialAttraction="nick" />
);

const EntertainmentSealifeComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <EntertainmentExperience isActive={isActive} initialAttraction="sealife" />
);

const EntertainmentCrayolaComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <EntertainmentExperience isActive={isActive} initialAttraction="crayola" />
);

const EntertainmentFlyoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <EntertainmentExperience isActive={isActive} initialAttraction="flyover" />
);

const EventsCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Events"
    imageSrc="/images/events/Events_Cover.jpg"
  />
);

const PartnerCoverComponent: FC<{ readonly isActive: boolean }> = ({ isActive }) => (
  <CoverSlide
    isActive={isActive}
    title="Partner With Us"
    imageSrc="/images/Partner/Partner_Cover.jpg"
  />
);

export const WhyCover = memo(WhyCoverComponent);
export const RetailCover = memo(RetailCoverComponent);
export const LuxuryCover = memo(LuxuryCoverComponent);
export const DiningCover = memo(DiningCoverComponent);
export const EntertainmentCover = memo(EntertainmentCoverComponent);
export const EntertainmentNickelodeon = memo(EntertainmentNickelodeonComponent);
export const EntertainmentSealife = memo(EntertainmentSealifeComponent);
export const EntertainmentCrayola = memo(EntertainmentCrayolaComponent);
export const EntertainmentFlyover = memo(EntertainmentFlyoverComponent);
export const EventsCover = memo(EventsCoverComponent);
export const PartnerCover = memo(PartnerCoverComponent);
