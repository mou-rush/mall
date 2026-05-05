"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import type { EntertainmentTileData } from "../EntertainmentVideoTile";

interface FloatingGalleryProps {
  readonly images: ReadonlyArray<string>;
  readonly accent: string;
  readonly attractionId: EntertainmentTileData["id"];
}

export default function FloatingGallery({
  images,
  accent,
  attractionId,
}: FloatingGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;
    const cards = galleryRef.current.querySelectorAll(".gallery-card");

    if (attractionId === "nick") {
      gsap.fromTo(
        cards,
        { y: -120, opacity: 0, rotation: -25, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          rotation: (i) => [-12, 8][i] || 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "elastic.out(1, 0.6)",
          delay: 0.3,
        },
      );
    } else if (attractionId === "sealife") {
      gsap.fromTo(
        cards,
        { y: 150, opacity: 0, scale: 0.7 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "power1.out",
          delay: 0.4,
        },
      );
    } else if (attractionId === "crayola") {
      gsap.fromTo(
        cards,
        { x: -150, y: -80, opacity: 0, rotation: -35 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: (i) => [-18, 12, 5][i] || 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "back.out(1.4)",
          delay: 0.35,
        },
      );
    } else {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }

    cards.forEach((card, i) => {
      if (attractionId === "sealife") {
        gsap.to(card, {
          y: "+=20",
          x: "+=8",
          rotation: "+=3",
          duration: 4 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      } else if (attractionId === "nick") {
        gsap.to(card, {
          y: "+=12",
          rotation: i % 2 === 0 ? "-=3" : "+=3",
          duration: 2.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      } else if (attractionId === "crayola") {
        gsap.to(card, {
          rotation: i % 2 === 0 ? "-=8" : "+=8",
          y: "+=10",
          duration: 2.8 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      } else {
        gsap.to(card, {
          y: "+=15",
          duration: 3.5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  }, [images, attractionId]);

  if (!images || images.length === 0) return null;

  if (attractionId === "nick") {
    return (
      <div ref={galleryRef} className="absolute inset-0 pointer-events-none">
        {images.slice(0, 2).map((img, i) => (
          <div
            key={i}
            className="gallery-card absolute"
            style={{
              left: i === 0 ? "10%" : "6%",
              top: i === 0 ? "25%" : "55%",
              width: "clamp(170px, 15vw, 210px)",
            }}
          >
            <div
              className="relative p-3 shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.96)",
                borderRadius: "8px",
                boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 2px ${accent}50`,
                border: `3px solid ${accent}`,
              }}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="210px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2 flex gap-1">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: accent }}
                />
                <div className="h-1.5 w-1.5 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (attractionId === "sealife") {
    return (
      <div ref={galleryRef} className="absolute inset-0 pointer-events-none">
        {images.slice(0, 2).map((img, i) => (
          <div
            key={i}
            className="gallery-card absolute"
            style={{
              left: i === 0 ? "8%" : "14%",
              top: i === 0 ? "30%" : "58%",
              width: "clamp(160px, 14vw, 190px)",
            }}
          >
            <div
              className="relative aspect-square rounded-full p-4 shadow-2xl backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                boxShadow: `0 0 0 8px rgba(17, 141, 255, 0.25), 0 16px 48px rgba(0,0,0,0.6), inset 0 0 20px rgba(17, 141, 255, 0.15)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="190px"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "inset 0 4px 12px rgba(0,0,0,0.2)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (attractionId === "crayola") {
    return (
      <div ref={galleryRef} className="absolute inset-0 pointer-events-none">
        {images.slice(0, 3).map((img, i) => (
          <div
            key={i}
            className="gallery-card absolute"
            style={{
              left: [5, 14, 8][i] + "%",
              top: [22, 48, 68][i] + "%",
              width: "clamp(140px, 13vw, 170px)",
            }}
          >
            <div
              className="relative shadow-2xl"
              style={{
                background: ["#FFD400", "#FF6B6B", "#4ECDC4"][i],
                padding: "10px",
                borderRadius: "12px",
                boxShadow: `0 10px 35px rgba(0,0,0,0.45), 0 0 0 3px rgba(255,255,255,0.5)`,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-white p-1">
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="170px"
                  className="object-cover rounded"
                />
              </div>
              <div className="mt-1.5 flex justify-center gap-1">
                {[0, 1, 2].map((dot) => (
                  <div key={dot} className="h-1 w-1 rounded-full bg-white/70" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={galleryRef} className="absolute inset-0 pointer-events-none">
      {images.slice(0, 2).map((img, i) => (
        <div
          key={i}
          className="gallery-card absolute"
          style={{
            left: "6%",
            top: i === 0 ? "28%" : "56%",
            width: "clamp(240px, 20vw, 280px)",
          }}
        >
          <div
            className="relative shadow-2xl"
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              padding: "12px",
              borderRadius: "6px",
              boxShadow: `0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px ${accent}80`,
            }}
          >
            <div className="relative aspect-video overflow-hidden rounded-sm">
              <Image
                src={img}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-0.5 flex-1 rounded-full bg-white/20" />
              <div
                className="h-1 w-1 rounded-full"
                style={{ background: accent }}
              />
              <div className="h-0.5 flex-1 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
