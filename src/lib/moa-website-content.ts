export type MoaStat = {
  value: string;
  label: string;
  sub?: string;
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

export const LEASING_DEVELOPMENT_SOURCE =
  "https://www.mallofamerica.com/leasing-development";
export const LEASING_DEVELOPMENT = {
  why: {
    eyebrow: "Leasing + Development",
    title: "Leasing at Mall of America",
    subtitle:
      "Over 520 specialty stores alongside Macy's and Nordstrom create a high-intent shopping environment designed to convert.",
    stats: [
      {
        value: "520+",
        label: "Specialty Stores",
        sub: "Leasing + Development",
      },
      {
        value: "2",
        label: "Department Stores",
        sub: "Macy's + Nordstrom",
      },
      {
        value: "20M",
        label: "Additional Visitors",
        sub: "Phase II projection",
      },
      {
        value: "60%",
        label: "From Outside 150 Miles",
        sub: "Phase II mix projection",
      },
      {
        value: "$4.3B",
        label: "Estimated Economic Impact",
        sub: "Projected with Phase II",
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
        body: "Phase II expansion is projected to add up to 20 million annual visitors, with a majority traveling from beyond 150 miles, and a broader statewide economic impact.",
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
        body: "Plans include multiple lodging concepts designed for different trip types — from boutique experiences to family stays.",
        stats: [
          { val: "01", lab: "Lodging" },
          { val: "02", lab: "Trip Length" },
          { val: "03", lab: "Destination" },
        ],
        imagePosition: "60% 45%",
      },
      {
        id: "expansion-2",
        label: "Expansion",
        eyebrow: "Phase II Concepts",
        headline: "Water + wellness",
        body: "Future concepts include major aquatic programming plus wellness and spa services — experiences that extend dwell time.",
        stats: [
          { val: "01", lab: "Water" },
          { val: "02", lab: "Wellness" },
          { val: "03", lab: "Dwell" },
        ],
        imagePosition: "40% 55%",
      },
    ] satisfies RetailScene[],
  },
} as const;
