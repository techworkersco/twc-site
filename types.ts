export type Chapter = {
  text: string;
  icon: string;
  active: boolean;
  locality: "north_america" | "europe" | "asia";

  established?: number;

  url?: string;
  image?: string;

  twitter?: string;
  facebook?: string;
  email?: string;
  calendar?: string;
  instagram?: string;
  telegram?: string;
  bluesky?: string;
  mastodon?: string;
  linked_in?: string;
  forum?: string;
  youtube?: string;
};

type Workplace = {
  organization: string;
  division?: string;
  union: string;
  union_twitter: string;
  union_website: string;
  job_listings: string;
};

export type Page = {
  excerpt?: string;
  inputPath: string;
  fileSlug: string;
  filePathStem: string;
  outputFileExtension: string;
  templateSyntax: string;
  date: Date;
  rawInput: string;
  url: string;
  outputPath: string;
};

export type Site = {
  title: string;
  description: string;
  url: string;
  timeZone: string;
};

export type Data = {
  chapters: Chapter[];
  workplaces: Workplace[];
};
