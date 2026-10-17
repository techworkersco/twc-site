import { DateTime } from "luxon";

import { Page } from "../types.ts";

export const data = { layout: "default.11ty.tsx" };

export const render = function (
  this: {
    all_time_zones: (x: Date, timezones: string[]) => string;
  },
  {
    content,
    title,
    page,
    time_zones,
    image,
  }: {
    content: string;
    title: string;
    page: Page;
    time_zones: string[];
    image?: string;
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
    <main class="plain">
      <nav>
        <a href="/blog" class="button framed">
          Find more events
        </a>
      </nav>
      <article class="post">
        <header>
          <h1 class="h4">{title}</h1>
          {/* todo(maximsmol): use regular time rendering */}
          <div>
            📆{" "}
            <a class="plain" target="_blank" href={timeConverterUrl.href}>
              {this.all_time_zones(page.date, time_zones)}
            </a>
          </div>
        </header>
        <div class="content">
          {image != null && !content.includes(image) && (
            <p>
              <img src={image} />
            </p>
          )}
          {{ type: "raw", value: content }}
        </div>
      </article>
    </main>
  );
};
