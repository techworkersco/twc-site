import { DateTime } from "luxon";

import { EleventyFuns, Page } from "../types.ts";

export const data = { layout: "default.11ty.tsx" };

export const render = function (
  this: EleventyFuns,
  {
    content,
    title,
    page,
    time_zones,
  }: {
    content: string;
    title: string;
    page: Page;
    time_zones: string[];
  },
) {
  const timeConverterUrl = new URL(
    "https://www.timeanddate.com/worldclock/converter.html",
  );
  // todo(maximsmol): can this use regular iso format?
  timeConverterUrl.searchParams.set(
    "iso",
    DateTime.fromJSDate(page.date).setZone("UTC").toFormat("yyyyMMdd'T'HHmmss"),
  );
  timeConverterUrl.searchParams.set("p1", "179"); // New York City
  timeConverterUrl.searchParams.set("p2", "224"); // San Francisco
  timeConverterUrl.searchParams.set("p3", "37"); // Berlin

  return (
    <>
      <style>
        {/* todo(maximsmol): move to main.css? */}
        {"h1, .main-wrapper h2, h3 {text-align: left; font-weight: bold;}"}
      </style>
      <nav class="see-more">
        <a href="/events" class="button primary">
          Find more events
        </a>
      </nav>
      <article class="post">
        <h1 class="post-title">{title}</h1>
        <div class="post-content">
          <div class="event-time">
            📆{" "}
            <a target="_blank" href={timeConverterUrl.href}>
              {this.all_time_zones(page.date, time_zones)}
            </a>
          </div>

          <>{{ type: "raw", value: content }}</>
        </div>
      </article>
    </>
  );
};
