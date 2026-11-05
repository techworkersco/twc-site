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
    event,
  }: {
    content: string;
    title: string;
    page: Page;
    time_zones: string[];
    image?: string;
  },
) {
  // Events and their dates come from 3 sources:
  // * _events/*.md files with dates and timezones in the frontmatter
  // * remote YAML files with dates and timezones.
  // * iCal events.
  //
  // The event date is in the page.date value for *.md files and remote YAML files. For iCal events, the event date is
  // in the event.date value (page.date is the creation date of the _ical.md template file).
  //
  // For *.md and YAML events, we format the datetime according to the given timezones. Some events specify multiple
  // timezones. For iCal events, we format according to the timezone in the Date object.
  let event_date;
  let formatted_event_date;
  if (event == null) {
    event_date = page.date;
    formatted_event_date = this.all_time_zones(page.date, time_zones);
  } else {
    event_date = event.date;
    formatted_event_date = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    }).format(event_date);
  }

  // create datetime converter hyperlink for the event time.
  const timeConverterUrl = new URL(
    "https://www.timeanddate.com/worldclock/converter.html",
  );
  // todo(maximsmol): can this use regular iso format?
  timeConverterUrl.searchParams.set(
    "iso",
    DateTime.fromJSDate(event_date)
      .setZone("UTC")
      .toFormat("yyyyMMdd'T'HHmmss"),
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
              {formatted_event_date}
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
