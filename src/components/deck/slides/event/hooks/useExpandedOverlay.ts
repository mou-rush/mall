import { RefObject, useCallback, useEffect } from "react";
import gsap from "gsap";
import type { EventFeed, EventFeedId } from "../types";
import { animateStatCountUp } from "../animations";

interface UseExpandedOverlayParams {
  readonly leftZoneRef: RefObject<HTMLDivElement | null>;
  readonly rootRef: RefObject<HTMLDivElement | null>;
  readonly expandedOverlayRef: RefObject<HTMLDivElement | null>;
  readonly expandedOnAirRef: RefObject<HTMLDivElement | null>;
  readonly detailPanelRef: RefObject<HTMLDivElement | null>;
  readonly selectedId: EventFeedId | null;
  readonly setSelectedId: (id: EventFeedId | null) => void;
  readonly selectedFeed: EventFeed | null;
}

export function useExpandedOverlay({
  leftZoneRef,
  rootRef,
  expandedOverlayRef,
  expandedOnAirRef,
  detailPanelRef,
  selectedId,
  setSelectedId,
  selectedFeed,
}: UseExpandedOverlayParams) {
  const openOnAir = useCallback(
    (id: EventFeedId) => {
      if (!leftZoneRef.current || !expandedOverlayRef.current) return;
      const tile = rootRef.current?.querySelector<HTMLElement>(
        `[data-monitor-id="${id}"]`,
      );
      if (!tile) return;

      const zoneRect = leftZoneRef.current.getBoundingClientRect();
      const tileRect = tile.getBoundingClientRect();

      const top = Math.max(0, tileRect.top - zoneRect.top);
      const left = Math.max(0, tileRect.left - zoneRect.left);
      const right = Math.max(0, zoneRect.right - tileRect.right);
      const bottom = Math.max(0, zoneRect.bottom - tileRect.bottom);

      setSelectedId(id);

      gsap.set(expandedOverlayRef.current, {
        pointerEvents: "auto",
        opacity: 1,
        clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round 10px)`,
      });

      gsap.to(expandedOverlayRef.current, {
        clipPath: "inset(0px 0px 0px 0px round 16px)",
        duration: 0.75,
        ease: "power3.inOut",
      });

      if (expandedOnAirRef.current) {
        gsap.fromTo(
          expandedOnAirRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            delay: 0.2,
          },
        );
      }
    },
    [leftZoneRef, rootRef, expandedOverlayRef, expandedOnAirRef, setSelectedId],
  );

  const closeOnAir = useCallback(() => {
    if (!expandedOverlayRef.current) return;
    if (detailPanelRef.current) {
      gsap.to(detailPanelRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
    gsap.to(expandedOverlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        setSelectedId(null);
        if (expandedOverlayRef.current)
          gsap.set(expandedOverlayRef.current, {
            pointerEvents: "none",
            clipPath: "none",
          });
      },
    });
  }, [expandedOverlayRef, detailPanelRef, setSelectedId]);

  const handleMonitorClick = useCallback(
    (id: EventFeedId) => {
      if (selectedId === id) {
        closeOnAir();
        return;
      }
      if (selectedId) {
        if (detailPanelRef.current) {
          gsap.to(detailPanelRef.current, {
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
            onComplete: () => {
              setSelectedId(id);
              if (detailPanelRef.current)
                gsap.to(detailPanelRef.current, {
                  opacity: 1,
                  duration: 0.22,
                  ease: "power2.out",
                });
            },
          });
        } else {
          setSelectedId(id);
        }
        return;
      }
      openOnAir(id);
    },
    [closeOnAir, openOnAir, selectedId, detailPanelRef, setSelectedId],
  );

  useEffect(() => {
    const overlay = expandedOverlayRef.current;
    if (!overlay) return;
    const video = overlay.querySelector<HTMLVideoElement>(
      "video[data-expanded-video]",
    );
    if (!video) return;
    if (!selectedFeed) {
      video.pause();
      video.removeAttribute("src");
      video.load();
      return;
    }

    const nextSrc = selectedFeed.videoSrc;
    gsap.set(video, { opacity: 0 });
    video.src = nextSrc;
    video.load();

    const onCanPlay = () => {
      video.play().catch(() => {});
      gsap.to(video, { opacity: 1, duration: 0.6, ease: "power2.out" });
    };

    video.addEventListener("canplay", onCanPlay, { once: true });
    return () => video.removeEventListener("canplay", onCanPlay);
  }, [selectedFeed, expandedOverlayRef]);

  useEffect(() => {
    if (!detailPanelRef.current || !selectedFeed) return;
    const counters =
      detailPanelRef.current.querySelectorAll<HTMLElement>("[data-count-to]") ??
      [];
    animateStatCountUp(counters);
  }, [selectedFeed, detailPanelRef]);

  return { handleMonitorClick, closeOnAir };
}
