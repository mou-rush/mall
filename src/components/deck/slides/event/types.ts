export type EventFeedId =
  | "celebrity"
  | "music"
  | "charity"
  | "launch"
  | "books"
  | "premieres";

export interface EventFeedStat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export interface EventFeed {
  readonly id: EventFeedId;
  readonly title: string;
  readonly videoSrc: string;
  readonly description: string;
  readonly stats: ReadonlyArray<EventFeedStat>;
}
