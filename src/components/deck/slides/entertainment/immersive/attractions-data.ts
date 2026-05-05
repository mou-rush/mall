import type { EntertainmentTileData } from "../EntertainmentVideoTile";

export const ATTRACTIONS: ReadonlyArray<EntertainmentTileData> = [
  {
    id: "nick",
    name: "Nickelodeon Universe",
    tagline: "High-energy thrills in warm orange light.",
    poster: "/images/entertainment/nickelodeon_1.jpg",
    video: "/videos/entertainment/nickelodeon.mp4",
    expandedVideo: "/videos/entertainment/nickelodeon_2.mp4",
    accent: "#ff8a00",
    headline: "A full-throttle family magnet at the center of the property.",
    stats: [
      { value: 27, suffix: "", label: "Rides + Attractions" },
      { value: 7, suffix: "ac", label: "Indoor Theme Park" },
      { value: 365, suffix: "d", label: "Year-Round Draw" },
    ],
    ctaLabel: "See Nickelodeon Universe",
    ctaHref: "https://www.mallofamerica.com/directory/nickelodeon-universe",
    galleryImages: [
      "/images/entertainment/nick.png",
      "/images/entertainment/nickelodeon_1.jpg",
    ],
  },
  {
    id: "sealife",
    name: "SEA LIFE Aquarium",
    tagline: "Slow underwater wonder in blue light.",
    poster: "/images/entertainment/sealife_4.jpg",
    video: "/videos/entertainment/sealife.mp4",
    expandedVideo: "/videos/entertainment/sealife_1.mp4",
    accent: "#118dff",
    headline: "A calmer, longer-stay experience that deepens discovery.",
    stats: [
      { value: 1200, suffix: "+", label: "Sea Creatures" },
      { value: 300, suffix: "ft", label: "Tunnel Experience" },
      { value: 52, suffix: "w", label: "All-Season Appeal" },
    ],
    ctaLabel: "See SEA LIFE Aquarium",
    ctaHref:
      "https://www.mallofamerica.com/directory/sea-life-minnesota-aquarium",
    galleryImages: [
      "/images/entertainment/sealife_3.jpg",
      "/images/entertainment/sealife_closeup.jpg",
    ],
  },
  {
    id: "crayola",
    name: "Crayola Experience",
    tagline: "Colorful, playful hands-on activity footage.",
    poster: "/images/entertainment/crayola_2.webp",
    video: "/videos/entertainment/crayola.mp4",
    expandedVideo: "/videos/entertainment/crayola_1.mp4",
    accent: "#ffd400",
    headline: "Creative family dwell time with bright repeat-visit energy.",
    stats: [
      { value: 25, suffix: "+", label: "Hands-On Activities" },
      { value: 2, suffix: "fl", label: "Immersive Floors" },
      { value: 1, suffix: "x", label: "All-Day Family Anchor" },
    ],
    ctaLabel: "See Crayola Experience",
    ctaHref: "https://www.mallofamerica.com/directory/crayola-experience",
    galleryImages: [
      "/images/entertainment/crayola_1.jpg",
      "/images/entertainment/crayola.png",
      "/images/entertainment/crayola_2.webp",
    ],
  },
  {
    id: "flyover",
    name: "FlyOver America",
    tagline: "Aerial cinematic landscapes with premium motion.",
    poster: "/images/entertainment/flyover_1.png",
    video: "/videos/entertainment/flyover.mp4",
    expandedVideo: "/videos/entertainment/flyover_1.mp4",
    accent: "#68d3ff",
    headline:
      "A cinematic attraction that makes the whole destination feel larger.",
    stats: [
      { value: 8, suffix: "k", label: "Daily Capacity Potential" },
      { value: 360, suffix: "°", label: "Visual Immersion" },
      { value: 12, suffix: "mo", label: "Seasonless Demand" },
    ],
    ctaLabel: "See FlyOver America",
    ctaHref: "https://www.mallofamerica.com/directory/flyover-america",
    galleryImages: [
      "/images/entertainment/flyover_2.png",
      "/images/entertainment/flyover.png",
    ],
  },
];
