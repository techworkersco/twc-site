import { DateTime } from "luxon";

import { Page } from "../types.ts";

export const data = { layout: "default.11ty.tsx" };

export const render = ({
  content,
  title,
  page,
  allTimeZones,
  time_zones,
}: {
  content: string;
  title: string;
  page: Page;
  allTimeZones: (x: Date, timezones: string[]) => string;
  time_zones: string[];
}) => {
  return (
    <>
      <style>
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
            <a
              target="_blank"
              href={`https://www.timeanddate.com/worldclock/converter.html?iso=${DateTime.fromJSDate(page.date).setZone("UTC").toFormat("yyyyMMdd'T'HHmmss")}&p1=179&p2=224&p3=37`}
            >
              {allTimeZones(page.date, time_zones)}
            </a>
          </div>

          {{ type: "raw", value: content }}
        </div>
      </article>
    </>
  );
};
