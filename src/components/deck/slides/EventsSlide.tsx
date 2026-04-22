"use client";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { getEventsContent } from "@/lib/data-service";
import { motion } from "framer-motion";
import EventTile from "./EventTile";

interface EventsSlideProps {
  readonly isActive: boolean;
}

export default function EventsSlide({ isActive }: EventsSlideProps) {
  const content = getEventsContent();
  const imageById: Record<string, string> = {
    celebrity: "/images/events/celebrity_appearances.jpg",
    music: "/images/events/live_shows.jpg",
    charity: "/images/events/charitable_initiatives.jpg",
    launch: "/images/events/product_launch.jpg",
    books: "/images/events/book_signings.jpg",
    premieres: "/images/events/movie_premiers.jpg",
  };
  const imagePositionById: Record<string, string> = {
    celebrity: "50% 30%",
  };
  const imageClassNameById: Record<string, string> = {
    celebrity: "object-contain object-top scale-[0.96]",
  };

  const getOffsetClass = (index: number): string => {
    if (index % 3 === 0) return "lg:-translate-y-8";
    if (index % 3 === 1) return "lg:translate-y-4";
    return "lg:-translate-y-2";
  };

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[var(--moa-black)]">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/events/Events_Cover.jpg"
        imageAlt="Events at Mall of America"
        imagePosition="50% 50%"
        overlayOpacity={0.28}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.18)_0%,rgba(7,8,12,0.24)_28%,rgba(6,6,8,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,199,44,0.18),transparent_22%),radial-gradient(circle_at_82%_34%,rgba(255,77,148,0.16),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(0,198,255,0.12),transparent_28%)]" />

      <motion.div
        className="pointer-events-none absolute -left-[8%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,199,44,0.16),transparent_62%)] blur-3xl"
        animate={
          isActive
            ? { x: [0, 28, 0], y: [0, -12, 0], scale: [1, 1.06, 1] }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute right-[-10%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,0,128,0.16),transparent_62%)] blur-3xl"
        animate={
          isActive
            ? { x: [0, -24, 0], y: [0, 16, 0], scale: [1, 1.08, 1] }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 md:px-10 lg:px-16 lg:py-10">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={
              isActive
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(10px)" }
            }
            transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-4xl">
              <p className="eyebrow mb-5">{content.eyebrow}</p>
              <h2 className="max-w-[11ch] text-5xl font-extralight leading-[0.92] tracking-[-0.05em] text-white md:text-7xl lg:text-[6.1rem]">
                {content.title}
              </h2>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/66 md:text-base lg:text-lg">
                {content.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4 self-start lg:self-end">
              {content.stats.map((s) => (
                <motion.div
                  key={s.lab}
                  initial={{ opacity: 0, scale: 0.9, y: 18 }}
                  animate={
                    isActive
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.9, y: 18 }
                  }
                  transition={{
                    delay: 0.18,
                    duration: 1.3,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="rounded-[28px] border border-white/12 bg-black/20 px-5 py-4 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.32)]"
                >
                  <div className="text-3xl font-extralight tracking-[-0.04em] text-[#ffd35c] md:text-4xl">
                    {s.val}
                  </div>
                  <div className="mt-1 text-[0.58rem] uppercase tracking-[0.24em] text-white/50">
                    {s.lab}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mx-auto flex w-full max-w-[1500px] flex-1 items-center py-6 lg:py-8">
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
            {content.categories.map((cat, i) => {
              const imageSrc = imageById[cat.id] ?? "/images/events/crowd.png";
              const imagePosition = imagePositionById[cat.id] ?? "50% 50%";
              const imageClassName =
                imageClassNameById[cat.id] ?? "object-cover";
              const offsetClass = getOffsetClass(i);

              return (
                <EventTile
                  key={cat.title}
                  title={cat.title}
                  desc={cat.desc}
                  imageSrc={imageSrc}
                  imagePosition={imagePosition}
                  imageClassName={imageClassName}
                  index={i}
                  isActive={isActive}
                  offsetClass={offsetClass}
                />
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={
            isActive
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          transition={{ delay: 1.06, duration: 1.3, ease: EASE_OUT_EXPO }}
          className="mx-auto flex w-full max-w-[1500px] items-end justify-between gap-5 border-t border-white/10 pt-5"
        >
          <div className="text-[0.62rem] uppercase tracking-[0.38em] text-white/42">
            {content.partnerCta.label}
          </div>

          <a
            href={content.partnerCta.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 rounded-full border border-white/14 bg-white/[0.04] px-5 py-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--gold)] hover:shadow-[0_0_35px_rgba(255,199,44,0.22)]"
          >
            <span className="text-[0.72rem] uppercase tracking-[0.22em]">
              Host your next event at Mall of America
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] transition-transform duration-500 group-hover:translate-x-1 group-hover:border-[var(--gold)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3.5L11 8L6 12.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
