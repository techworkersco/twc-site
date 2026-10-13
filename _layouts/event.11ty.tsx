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
    formatted_event_date = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short'
    }).format(event_date);
  }

  // create datetime converter hyperlink for the event time.
  const timeConverterUrl = new URL(
    "https://www.timeanddate.com/worldclock/converter.html",
  );
  // todo(maximsmol): can this use regular iso format?
  timeConverterUrl.searchParams.set(
    "iso",
    DateTime.fromJSDate(event_date).setZone("UTC").toFormat("yyyyMMdd'T'HHmmss"),
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
              {formatted_event_date}
            </a>
          </div>

          {image != null && !content.includes(image) && (
            <img class="img-fluid" src={image} />
          )}

          {{ type: "raw", value: content }}
        </div>
      </article>
    </>
  );
};
