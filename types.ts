export type Chapter = {
  text: string;
  icon: string;
  url?: string;
  twitter?: string;
  meetup?: string;
  facebook?: string;
  activity_level: "active" | "inactive";
};

type Workplace = {
  organization: string;
  division: string;
  union: string;
  union_twitter: string;
  union_website: string;
  job_listings: string;
};

export type Data = {
  chapters: Chapter[];
  workplaces: Workplace[];
};
