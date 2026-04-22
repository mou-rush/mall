export type MoaStat = {
  value: string;
  label: string;
  sub?: string;
  detail?: string;
  countTo?: number;
  prefix?: string;
  suffix?: string;
};

export type RetailScene = {
  id: string;
  label: string;
  eyebrow: string;
  headline: string;
  body: string;
  stats: Array<{ val: string; lab: string }>;
  imagePosition: string;
};

export type DeckLink = {
  label: string;
  href: string;
};

export type DeckCard = {
  id: string;
  title: string;
  desc: string;
  cta: DeckLink;
  accent?: "gold" | "blue";
};

export type DeckPillar = {
  title: string;
  desc: string;
};

export type DeckCategory = {
  id: string;
  title: string;
  desc: string;
  tag?: string;
};

export type DeckEntertainmentItem = {
  id: string;
  name: string;
  type: string;
  headline: string;
  desc: string;
  image: string;
  color: string;
};

export const LEASING_DEVELOPMENT_SOURCE =
  "https://www.mallofamerica.com/leasing-development";

export const DINING_SOURCE = "https://www.mallofamerica.com/dining";
export const ATTRACTIONS_SOURCE = "https://www.mallofamerica.com/attractions";
export const EVENTS_SOURCE = "https://www.mallofamerica.com/events";
export const CORPORATE_PARTNERSHIPS_SOURCE =
  "https://www.mallofamerica.com/partnership-opportunities";
export const LEASING_DEVELOPMENT = {
  why: {
    eyebrow: "Why This Property",
    title: "Location. Access. Scale.",
    subtitle: "Bloomington, MN",
    summary:
      "A leader in retail, entertainment and attractions, Mall of America is one of the top tourist destinations in the country and is known around the world.",
    highlights: [
      "78 acres of prime real estate",
      "12-minute light-rail trip from MSP",
      "More than 50 hotels within 10 minutes",
    ],
    stats: [
      {
        value: "520+",
        label: "Specialty Stores",
        sub: "Retail depth",
        countTo: 520,
        suffix: "+",
      },
      {
        value: "50+",
        label: "Hotels Nearby",
        sub: "10 minutes",
        countTo: 50,
        suffix: "+",
      },
      {
        value: "12",
        label: "Minutes from MSP",
        sub: "Light rail",
        countTo: 12,
      },
      {
        value: "60%",
        label: "Outside 150 Miles",
        sub: "Regional draw",
        countTo: 60,
        suffix: "%",
      },
      {
        value: "8–82",
        label: "Age Reach",
        sub: "All ages",
        countTo: 82,
        prefix: "8–",
      },
      {
        value: "78",
        label: "Acres",
        sub: "Prime site",
        countTo: 78,
      },
    ] satisfies MoaStat[],
    contact: {
      phone: "952.883.8699",
      email: "lease.inquiry@moa.net",
      line: "Leasing inquiries: call or email the leasing team.",
    },
  },

  retail: {
    scenes: [
      {
        id: "leasing",
        label: "Leasing",
        eyebrow: "Leasing + Development",
        headline: "Elevate your business\nat MOA",
        body: "Position your brand inside a destination built for shopping, dining, and entertainment — where discovery is constant and foot traffic stays in motion.",
        stats: [
          { val: "520+", lab: "Specialty Stores" },
          { val: "2", lab: "Department Stores" },
          { val: "MOA", lab: "Destination" },
        ],
        imagePosition: "50% 45%",
      },
      {
        id: "phase2",
        label: "Phase II",
        eyebrow: "Future Expansions",
        headline: "Phase II expansion\n(vision + scale)",
        body: "Phase II expansion is projected to add up to 20 million annual visitors, with a majority traveling from beyond 150 miles and a broader statewide economic impact.",
        stats: [
          { val: "20M", lab: "Visitors" },
          { val: "60%", lab: "Outside 150 Miles" },
          { val: "$4.3B", lab: "Impact" },
        ],
        imagePosition: "55% 45%",
      },
      {
        id: "expansion-1",
        label: "Expansion",
        eyebrow: "Phase II Concepts",
        headline: "Hospitality + stay",
        body: "Future Expansions plans include multiple lodging concepts designed for different trip types, from boutique experiences to family stays.",
        stats: [
          { val: "Phase II", lab: "Planned" },
          { val: "Lodging", lab: "Concepts" },
          { val: "Stay", lab: "Options" },
        ],
        imagePosition: "60% 45%",
      },
      {
        id: "expansion-2",
        label: "Expansion",
        eyebrow: "Phase II Concepts",
        headline: "Water + wellness",
        body: "Future concepts include major aquatic programming plus wellness and spa services as part of the Phase II vision.",
        stats: [
          { val: "Water", lab: "Programming" },
          { val: "Wellness", lab: "Services" },
          { val: "Spa", lab: "Included" },
        ],
        imagePosition: "40% 55%",
      },
    ] satisfies RetailScene[],
  },
} as const;

export const DECK_WEBSITE_CONTENT = {
  luxury: {
    source: LEASING_DEVELOPMENT_SOURCE,
    eyebrow: "Luxury & Premium",
    title: "World-Class Retail, Under One Roof",
    subtitle:
      "More than 520 specialty stores join department stores Macy's and Nordstrom for a world-class shopping experience.",
    pillars: [
      {
        title: "World-class shopping mix",
        desc: "A retail lineup built on depth: specialty stores alongside Macy's and Nordstrom.",
      },
      {
        title: "Retail + entertainment destination",
        desc: "Mall of America® is positioned as an indoor shopping and entertainment center — built to keep guests exploring.",
      },
      {
        title: "Phase II future offerings",
        desc: "Future Expansions (Phase II) plans include fine quality restaurants and bistros, nightlife and entertainment options, and exclusive and boutique-style retail offerings.",
      },
    ] satisfies DeckPillar[],
    stats: [
      { val: "520+", lab: "Specialty Stores" },
      { val: "2", lab: "Department Stores" },
      { val: "Phase II", lab: "Future Expansions" },
    ],
  },

  dining: {
    source: DINING_SOURCE,
    eyebrow: "Dining Guide",
    title: "Find Flavor + Fun",
    subtitle: "Find flavor and fun for the whole family.",
    featured: {
      name: "FireLake Grill House + Cocktail Bar",
      location: "LEVEL 2, RADISSON BLU",
      link: {
        label: "View listing",
        href: "https://www.mallofamerica.com/directory/firelake",
      } satisfies DeckLink,
    },
    categories: [
      {
        id: "full-service",
        title: "Full Service Restaurants",
        desc: "Sit-down dining across the property — built for longer stays.",
      },
      {
        id: "food-court",
        title: "Food Court",
        desc: "High-velocity dining for peak foot-traffic windows.",
      },
      {
        id: "coffee-tea",
        title: "Coffee + Tea",
        desc: "All-day beverage stops that keep guests circulating.",
      },
      {
        id: "sweets",
        title: "Sweets + Treats",
        desc: "Dessert concepts that turn breaks into purchases.",
      },
      {
        id: "fast-casual",
        title: "Fast Casual",
        desc: "Quick-service favorites — ideal for repeat visits.",
      },
      {
        id: "breakfast",
        title: "Breakfast",
        desc: "Morning offerings that start the day on-site.",
      },
    ] satisfies DeckCategory[],
  },

  entertainment: {
    source: ATTRACTIONS_SOURCE,
    eyebrow: "Attractions + Entertainment",
    title: "Attractions: Everything and More",
    subtitle:
      "From high-flying roller coaster rides to colorful craft adventures, MOA® has an awesome array of attractions to fit every kind of visit.",
    cta: {
      label: "Get tickets now",
      href: "https://tix.mallofamerica.com/",
    } satisfies DeckLink,
    items: [
      {
        id: "nick",
        name: "Nickelodeon Universe®",
        type: "Attraction",
        headline: "Rides + characters + energy",
        desc: "A signature attraction at the center of the property — built for repeat visits and shared moments.",
        image: "/images/entertainment/nick.png",
        color: "var(--gold)",
      },
      {
        id: "sealife",
        name: "SEA LIFE Minnesota Aquarium",
        type: "Attraction",
        headline: "Immersive, family-friendly wonder",
        desc: "A must-see experience that brings guests deeper into the building — and keeps them exploring.",
        image: "/images/entertainment/sealife.png",
        color: "var(--accent-blue)",
      },
      {
        id: "crayola",
        name: "Crayola Experience",
        type: "Attraction",
        headline: "Colorful craft adventures",
        desc: "Hands-on creative experiences designed for families and group trips.",
        image: "/images/entertainment/crayola.png",
        color: "var(--gold)",
      },
      {
        id: "flyover",
        name: "FlyOver America",
        type: "Attraction",
        headline: "An experience you feel",
        desc: "A ticketed immersive attraction that turns a visit into a story worth repeating.",
        image: "/images/entertainment/flyover.png",
        color: "var(--accent-blue)",
      },
    ] satisfies DeckEntertainmentItem[],
  },

  events: {
    source: EVENTS_SOURCE,
    eyebrow: "Events at Mall of America®",
    title: "Over 400 Events Every Year",
    subtitle:
      "MOA® has earned a national reputation for entertaining guests with celebrity appearances, live music, charitable initiatives, product launches, book signings + movie premieres.",
    stats: [{ val: "400+", lab: "Events / Year" }],
    cta: {
      label: "See all events",
      href: "https://www.mallofamerica.com/entertainment/events/all",
    } satisfies DeckLink,
    partnerCta: {
      label: "Corporate partnerships",
      href: CORPORATE_PARTNERSHIPS_SOURCE,
    } satisfies DeckLink,
    categories: [
      {
        id: "celebrity",
        title: "Celebrity Appearances",
        desc: "High-attention moments that drive crowds and coverage.",
      },
      {
        id: "music",
        title: "Live Music",
        desc: "Performances that turn shopping into an experience.",
      },
      {
        id: "charity",
        title: "Charitable Initiatives",
        desc: "Cause-led events that build brand affinity.",
      },
      {
        id: "launch",
        title: "Product Launches",
        desc: "Debuts designed for fans, creators, and press.",
      },
      {
        id: "books",
        title: "Book Signings",
        desc: "Community-facing moments with built-in audiences.",
      },
      {
        id: "premieres",
        title: "Movie Premieres",
        desc: "Red-carpet energy inside a retail destination.",
      },
    ] satisfies DeckCategory[],
  },

  partner: {
    source: LEASING_DEVELOPMENT_SOURCE,
    eyebrow: "Leasing + Partnerships",
    title: "Start the Conversation",
    subtitle:
      "For leasing inquiries, please call 952.883.8699 or email lease.inquiry@moa.net.",
    addressLine: "Mall of America · 2131 Lindau Lane · Bloomington, MN 55425",
    cards: [
      {
        id: "leasing",
        title: "Leasing Inquiry",
        desc: "Leasing + Development: connect directly with the leasing team.",
        cta: {
          label: "Email leasing",
          href: "mailto:lease.inquiry@moa.net?subject=Lease%20Inquiry",
        },
        accent: "gold",
      },
      {
        id: "events",
        title: "Events at MOA®",
        desc: "Explore current events and upcoming programming.",
        cta: {
          label: "View events",
          href: "https://www.mallofamerica.com/entertainment/events/all",
        },
        accent: "blue",
      },
      {
        id: "partnerships",
        title: "Corporate Partnerships",
        desc: "Want to host an event at Mall of America? Start here.",
        cta: {
          label: "Explore partnerships",
          href: CORPORATE_PARTNERSHIPS_SOURCE,
        },
        accent: "blue",
      },
    ] satisfies DeckCard[],
    formLabels: {
      leasing: "Leasing Inquiry",
      events: "Events Inquiry",
      partnerships: "Corporate Partnerships Inquiry",
    } as const,
  },
} as const;
