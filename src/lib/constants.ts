import {
  LuUtensilsCrossed,
  LuChefHat,
  LuCoffee,
  LuWine,
  LuLeaf,
  LuMusic2,
  LuTrophy,
  LuMic,
  LuSparkles,
  LuGamepad2,
  LuCalendarDays,
  LuHandshake,
  LuStore,
} from "react-icons/lu";

export type { IconComponent, NavId } from "@/lib/types";

export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "why", label: "Why MoA" },
  { id: "retail", label: "Retail" },
  { id: "luxury", label: "Luxury" },
  { id: "dining", label: "Dining" },
  { id: "entertainment", label: "Entertainment" },
  { id: "events", label: "Events" },
  { id: "cta", label: "Partner" },
] as const;

export const STATS = [
  {
    value: "40M+",
    label: "Annual Visitors",
    sub: "More than Disneyland & Disney World combined",
  },
  {
    value: "5.6M",
    label: "Sq Ft of Experience",
    sub: "The size of 88 football fields under one roof",
  },
  {
    value: "500+",
    label: "Stores & Restaurants",
    sub: "The deepest retail mix in North America",
  },
  {
    value: "$2B+",
    label: "in Annual Sales",
    sub: "Sustained sales density per sq ft",
  },
  {
    value: "60%",
    label: "Destination Shoppers",
    sub: "Guests traveling 150+ miles to visit",
  },
  {
    value: "#1",
    label: "US Shopping Destination",
    sub: "Ranked by tourist spend year over year",
  },
];

export const RETAIL_FEATURES = [
  {
    title: "Flagship Opportunity",
    body: "Anchor your brand in one of the most-visited buildings on earth. North Star Court, South Avenue, and East Broadway offer marquee frontage with unmatched foot traffic.",
    tag: "Leasing",
  },
  {
    title: "Pop-Up Culture",
    body: "Short-term activations from 30–180 days. Ideal for launches, collabs, and limited drops that generate earned media and direct-to-consumer revenue.",
    tag: "Activation",
  },
  {
    title: "Data-Driven Placement",
    body: "Our proprietary foot-traffic analytics match your category to the highest-converting zones. Stop guessing — start knowing.",
    tag: "Analytics",
  },
  {
    title: "Omni-Channel Integration",
    body: "BOPIS, same-day delivery hubs, and connected digital kiosks. Phygital retail done right, at the scale only MoA can provide.",
    tag: "Technology",
  },
];

export const BRAND_LOGO_MAP: Record<string, string> = {
  Nordstrom: "/images/LuxuryBrands/Nordstrom.png",
  "Tiffany & Co.": "/images/LuxuryBrands/Tiffany%20%26%20Co..png",
  Coach: "/images/LuxuryBrands/Coach.png",
  "Hugo Boss": "/images/LuxuryBrands/Hugo%20Boss.png",
  Rolex: "/images/LuxuryBrands/Rolex.png",
  "Louis Vuitton": "/images/LuxuryBrands/Louis%20Vuitton.png",
  Gucci: "/images/LuxuryBrands/Gucci.png",
  Prada: "/images/LuxuryBrands/Prada.png",
  Burberry: "/images/LuxuryBrands/Burberry.png",
  Versace: "/images/LuxuryBrands/Versace.png",
  "Bottega Veneta": "/images/LuxuryBrands/Bottega%20Veneta.png",
  Balenciaga: "/images/LuxuryBrands/Balenciaga.png",
};

export const DINING_CATEGORIES = [
  {
    icon: LuUtensilsCrossed,
    title: "Fine Dining",
    count: "12 Concepts",
    desc: "White-tablecloth experiences drawing guests from across the metro.",
  },
  {
    icon: LuChefHat,
    title: "Global Street",
    count: "40+ Options",
    desc: "International food halls curated for the modern palate.",
  },
  {
    icon: LuCoffee,
    title: "Coffee & Craft",
    count: "8 Roasters",
    desc: "Artisan coffee culture from local Minnesota roasters to global names.",
  },
  {
    icon: LuWine,
    title: "Nightlife & Bars",
    count: "6 Venues",
    desc: "From craft cocktail bars to sports viewing experiences.",
  },
  {
    icon: LuLeaf,
    title: "Wellness & Spa",
    count: "5 Studios",
    desc: "Integrated wellness experiences within the property footprint.",
  },
  {
    icon: LuMusic2,
    title: "Live Entertainment",
    count: "Nightly",
    desc: "Music, street performers, and pop-up shows across all levels.",
  },
];

export const ENTERTAINMENT_ITEMS = [
  {
    name: "Nickelodeon Universe",
    type: "Theme Park",
    headline: "The world's largest indoor theme park",
    desc: "7 acres, 30+ rides, and the only SpongeBob-themed coaster on planet Earth. It generates a gravitational pull that no other retail property can match.",
    image: "/images/entertainment/nick.png",
    color: "#f59e0b",
  },
  {
    name: "SEA LIFE Minnesota",
    type: "Aquarium",
    headline: "1.3 million gallons of wonder",
    desc: "A world-class aquarium drawing 1M+ annual visitors independently. Your brand can live inside the experience — literally.",
    image: "/images/entertainment/sealife.png",
    color: "#0ea5e9",
  },
  {
    name: "Crayola Experience",
    type: "Family Attraction",
    headline: "Where creativity becomes a destination",
    desc: "Interactive color experiences for families. Sponsored activations available inside 65,000 sq ft of brand-safe family entertainment.",
    image: "/images/entertainment/crayola.png",
    color: "#ef4444",
  },
  {
    name: "FlyOver America",
    type: "Immersive Experience",
    headline: "The highest ROI per square foot in the building",
    desc: "A combination flight ride simulator, 4D film, and sensory experience. The definitive modern attraction format — and a sponsorship canvas.",
    image: "/images/entertainment/flyover.png",
    color: "#8b5cf6",
  },
];

export const EVENTS_CATEGORIES = [
  {
    icon: LuTrophy,
    title: "Brand Activations",
    scale: "5,000–50,000 guests",
    examples: [
      "Product launches",
      "Brand anniversaries",
      "Fan experience events",
    ],
  },
  {
    icon: LuMic,
    title: "Concerts & Live",
    scale: "2,500 capacity",
    examples: [
      "National touring artists",
      "Album release shows",
      "Residencies",
    ],
  },
  {
    icon: LuSparkles,
    title: "Fashion & Runway",
    scale: "1,200 seated",
    examples: [
      "Seasonal fashion shows",
      "Designer launches",
      "Influencer events",
    ],
  },
  {
    icon: LuGamepad2,
    title: "Sports & eSports",
    scale: "Custom configurations",
    examples: [
      "eSports tournaments",
      "Pro athlete signings",
      "Fitness challenges",
    ],
  },
  {
    icon: LuCalendarDays,
    title: "Seasonal Tentpoles",
    scale: "Multi-week campaigns",
    examples: ["Holiday experiences", "Back-to-school", "Summer Fest"],
  },
  {
    icon: LuHandshake,
    title: "Trade & B2B",
    scale: "Invite-only or open",
    examples: ["Leasing summits", "Partner days", "Press previews"],
  },
];

export const VIDEOS = {
  hero: "ZRvKDndEG8g",
  events: "ZRvKDndEG8g",
  intro: "3Z9sCTOk9L0",
} as const;

export const TICKER_FACTS = [
  "40M+ Annual Visitors",
  "500+ Stores & Restaurants",
  "#1 US Tourism Destination",
  "$2B+ Annual Sales",
  "World's Largest Indoor Theme Park",
  "60% Destination Shoppers",
  "10,000 Free Parking Spaces",
  "5.6M Sq Ft",
] as const;

export const LIFESTYLE_METRICS = [
  { value: "3.5h", label: "Avg. Visit Duration" },
  { value: "2.8×", label: "Avg. Return Visit Frequency" },
  { value: "$187", label: "Avg. In-Mall Spend Per Visit" },
  { value: "92%", label: "Guest Satisfaction Score" },
] as const;

export const EVENTS_TIMELINE = [
  {
    step: "01",
    title: "Brief & Vision",
    desc: "Our events team consults with you to define goals, audience, and KPIs.",
  },
  {
    step: "02",
    title: "Venue & Date Matching",
    desc: "We match your format to the optimal venue — from common areas to full mall exclusives.",
  },
  {
    step: "03",
    title: "Brand Integration",
    desc: "Sponsorship touchpoints, signage, digital screens, and announcement campaigns built in.",
  },
  {
    step: "04",
    title: "Execution & Live",
    desc: "Our on-site production team handles logistics. You focus on the experience.",
  },
  {
    step: "05",
    title: "Measurement & ROI",
    desc: "Post-event analytics: foot traffic, dwell time, media value, social reach.",
  },
] as const;

export const LUXURY_PILLARS = [
  {
    title: "Curated Environment",
    desc: "Luxury brands don't exist in isolation here. Your neighbors define your brand's company — and ours are the best in the business.",
  },
  {
    title: "Dwell Time",
    desc: "Average visit duration at MoA: 3.5 hours. Guests explore, they linger, they return. That creates multiple conversion touchpoints per visit.",
  },
  {
    title: "Destination Mindset",
    desc: "60% of our visitors travel 150+ miles to be here. They arrive with intention and budget — the perfect customer for premium and luxury.",
  },
] as const;

export const CTA_PATHS = [
  {
    id: "leasing" as const,
    icon: LuStore,
    title: "Retail Leasing",
    desc: "Flagship, pop-up, or long-term tenancy. Our leasing team is ready to build your business case.",
    cta: "Request Leasing Info",
    color: "var(--gold)",
  },
  {
    id: "sponsorship" as const,
    icon: LuHandshake,
    title: "Brand Sponsorship",
    desc: "Title sponsorships, category exclusivity, experiential activations inside 5.6M sq ft.",
    cta: "Explore Sponsorship",
    color: "#60a5fa",
  },
  {
    id: "events" as const,
    icon: LuMic,
    title: "Event Booking",
    desc: "Launch your next campaign inside America's most-visited address. 400+ events a year.",
    cta: "Book a Conversation",
    color: "#a78bfa",
  },
];

export const CTA_FORM_LABELS: Record<string, string> = {
  leasing: "Leasing Inquiry",
  sponsorship: "Sponsorship Inquiry",
  events: "Event Booking Request",
};
