import type { EventFeed, EventFeedId } from "./types";

export const FEEDS: ReadonlyArray<EventFeed> = [
  {
    id: "celebrity",
    title: "Celebrity Appearances",
    videoSrc: "/videos/events/celebrity_appearances.mp4",
    description:
      "High-attention moments that create national buzz, spike foot traffic, and deliver measurable tenant lift in a single broadcast-worthy window.",
    stats: [
      { value: 15, suffix: "k", label: "Peak Crowd" },
      { value: 250, suffix: "k+", label: "Social Impressions" },
      { value: 3, suffix: "x", label: "Sales Lift" },
    ],
  },
  {
    id: "music",
    title: "Live Music",
    videoSrc: "/videos/events/live_music.mp4",
    description:
      "Always-on performances that extend dwell time and convert the property into a destination — not just a shopping trip.",
    stats: [
      { value: 80, suffix: "+", label: "Shows / Year" },
      { value: 45, suffix: "%", label: "Dwell Increase" },
      { value: 20, suffix: "k", label: "Peak Attendance" },
    ],
  },
  {
    id: "charity",
    title: "Charitable Initiatives",
    videoSrc: "/videos/events/charitable_initiatives.mp4",
    description:
      "Cause-led broadcasts that build trust and brand affinity — bringing sponsors into the story the community cares about.",
    stats: [
      { value: 30, suffix: "+", label: "Events / Year" },
      { value: 90, suffix: "%", label: "Positive Sentiment" },
      { value: 5, suffix: "M+", label: "Potential Reach" },
    ],
  },
  {
    id: "launch",
    title: "Product Launches",
    videoSrc: "/videos/events/product_launch.mp4",
    description:
      "Debuts designed for fans + press: a live platform where brands meet purchase intent at scale — with cameras rolling.",
    stats: [
      { value: 40, suffix: "+", label: "Launches / Year" },
      { value: 60, suffix: "M+", label: "Media Impressions" },
      { value: 2, suffix: "x", label: "Day-1 Sales" },
    ],
  },
  {
    id: "books",
    title: "Book Signings",
    videoSrc: "/videos/events/book_signing.mp4",
    description:
      "Built-in audiences and devoted communities — a cultural signal that keeps the destination relevant beyond retail.",
    stats: [
      { value: 50, suffix: "+", label: "Signings / Year" },
      { value: 5, suffix: "k+", label: "Fans / Event" },
      { value: 35, suffix: "%", label: "Adj. Uplift" },
    ],
  },
  {
    id: "premieres",
    title: "Movie Premieres",
    videoSrc: "/videos/events/movie_premieres.mp4",
    description:
      "Red-carpet energy and studio-grade moments — a broadcast-ready spectacle that turns the mall into a media destination.",
    stats: [
      { value: 10, suffix: "+", label: "Premieres / Year" },
      { value: 100, suffix: "M+", label: "Media Reach" },
      { value: 25, suffix: "k", label: "Premiere Night" },
    ],
  },
];

export const TICKER_ITEMS: ReadonlyArray<string> = [
  "Nike Air Max Product Launch",
  "Celebrity Meet & Greet",
  "MOA Foundation Gala",
  "Book Signing: NYT Bestseller",
  "Live Concert Series",
  "Movie Premiere Screening",
  "Charitable 5K Kickoff",
  "Brand Activation: Samsung",
  "Creator Pop-Up: Beauty Lab",
  "Holiday Music Broadcast",
  "Kids Literacy Week Live",
  "Charity Auction Night",
  "Film Q&A + Red Carpet",
  "Live DJ Set: Rotunda",
  "Limited Edition Drop",
  "Community Food Drive",
  "Premiere Afterparty",
  "Author Talk + Signing",
  "Global Brand Launch",
  "VIP Celebrity Appearance",
];

export const FEED_GRID_AREAS: Record<EventFeedId, string> = {
  music: "a",
  celebrity: "b",
  charity: "c",
  launch: "d",
  books: "e",
  premieres: "f",
};

export const GRID_TEMPLATE_AREAS = `
  'a a b c'
  'a a d d'
  'e f d d'
`;
