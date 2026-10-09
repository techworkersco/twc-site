import {inspect} from "node:util";

import {Data} from "./types.ts";

export const data = {
  layout: "default.11ty.tsx",
  pageTitle: <>Worker <span class="red">Power</span><div>In the Tech Industry</div></>,
  title: "Home",
};

export const render = async ({
  collections: { events: globalEvents },
  berlin_events,
  nl_events,
}: Data) => {
  const events = [
    ...globalEvents.map(({ data, url }) => ({ ...data, url })),
    ...(berlin_events ?? []),
    ...(nl_events ?? []),
  ].map((x) => {
    let date: Date | undefined;
    try {
      // Temporal.Instant is very picky about whitespace
      date = new Date(x.date);
      return {
        ...x,
        timestamp: Temporal.Instant.from(date.toISOString()),
      };
    } catch (err) {
      throw new Error(
        `Failed to parse event timestamp: ${inspect(x.date)} (${date?.toISOString()})`,
        { cause: err },
      );
    }
  });
  // todo(maximsmol): use Instant.compare when available
  events.sort(
    (a, b) => a.timestamp.epochMilliseconds - b.timestamp.epochMilliseconds,
  );

  const renderTs = Temporal.Now.instant();
  const eventsFuture = events.filter(
    (x) => x.timestamp.epochNanoseconds >= renderTs.epochNanoseconds,
  );
  const eventsPast = events.filter(
    (x) => x.timestamp.epochNanoseconds < renderTs.epochNanoseconds,
  );

  const eventsExample = [
    {
      title: "Bay Area: Social Meeting",
      time: "2026-02-26T18:00-08:00[America/Los_Angeles]",
      location: "Bay Area",
    },
    {
      title: "TWC Book Club: Empire of AI",
      time: "2026-03-01T21:00-05:00[America/New_York]",
      location: "Online",
    },
    {
      title: "Netherlands: Organizing Meetup",
      time: "2026-03-02T17:00+01:00[Europe/Amsterdam]",
      location: "Netherlands",
    },
    {
      title: "Portland: General Meeting",
      time: "2026-03-14T15:00-07:00[America/Los_Angeles]",
      location: "Portland",
    },
  ];

  {
    /* todo(maximsmol): load icons by name instead of copy-paste */
  }
  return (
    <>
      <div class="hero">
        {/* todo(maximsmol): smarty-pants this */}
        <ul class="cards">
          <li>
            <section>
              <h3 class="h5">Vision & Values:</h3>
              <p>
                Guided by our vision for an inclusive and equitable tech
                industry, TWC organizes to build worker power through rank
                and file self-organization and education.
              </p>
            </section>
          </li>
          <li>
            <section>
              <h3 class="h5">Who We Are:</h3>
              <p>
                We are a coalition of workers in and around the tech
                industry, labor organizers, community organizers, and
                friends. We work in solidarity with existing movements
                towards social justice, worker's rights, and economic
                inclusion.
              </p>
            </section>
          </li>
          <li>
            <section>
              <h3 class="h5">How We Operate:</h3>
              <p>
                We're democratically structured, all-volunteer, and
                worker-led organization.
              </p>
            </section>
          </li>
        </ul>
        <section class="cta">
          <a href="/chapters" class="button monospace">
            <u>Find a Local Chapter</u>
          </a>
          {/* lucide */}
          <a href="/get-involved" class="button framed">
            Get Involved
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </section>
      </div>
      <article class="events">
        {/* todo(maximsmol): add a minimal padding */}
        {/* todo(maximsmol): doesn't work right */}
        <div class="bg" />
        <header>
          <h2 class="h3">Upcoming Events</h2>
          <a href="/events" class="button">
            View More{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </header>
        <ol>
          {/* todo(maximsmol): title fails to wrap if it doesn't fit */}
          {eventsFuture.map((data) => {
            const {title, timestamp, locations, url, image} = data;
            try {
              const tzs =
                "time_zones" in data ? data.time_zones : data.timeszones;

              if (tzs.length === 0)
                throw new Error("No time zone specified");

              return (
                <li>
                  <article>
                    <a href={url}>
                      <div
                        class="icon"
                        style={`background-image: url(${image})`}
                      >
                        {image == null && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M8 2v3" />
                            <path d="M16 2v3" />
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                            />
                            <path d="M3 9h18" />
                            <path d="M8 13h.01" />
                            <path d="M12 13h.01" />
                            <path d="M16 13h.01" />
                            <path d="M8 17h.01" />
                            <path d="M12 17h.01" />
                            <path d="M16 17h.01" />
                          </svg>
                        )}
                      </div>
                    </a>
                    <div class="info">
                      <div>
                        <h3>
                          <a href={url} class="plain">
                            {title}
                          </a>
                        </h3>
                        {tzs.map((tz) => {
                          const time = timestamp.toZonedDateTimeISO(tz);

                          return (
                            <time
                              // todo(maximsmol): add IXDTF suffix when supported
                              datetime={timestamp.toString({
                                timeZone: time.timeZoneId,
                              })}
                            >
                              <span class="short">
                                {new Intl.DateTimeFormat("en-US", {
                                  timeZone: time.timeZoneId,
                                  // We want `dateStyle: "short"` + `timeStyle: "short"` but with a time zone
                                  year: "2-digit",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  timeZoneName: "short",
                                }).format(timestamp)}
                              </span>
                              <span class="long">
                                {new Intl.DateTimeFormat("en-US", {
                                  timeZone: time.timeZoneId,
                                  // We want `dateStyle: "long"`` + `timeStyle: "long"` but no seconds
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  timeZoneName: "short",
                                }).format(timestamp)}
                              </span>
                            </time>
                          );
                        })}
                      </div>
                      <span class="location">
                        <span>{locations[0]}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </li>
              );
            } catch (err) {
              throw new Error(`Failed to render event ${inspect(data)}`, {
                cause: err,
              });
            }
          })}
        </ol>
      </article>
      <article>
        <h2>
          TWC in the Press
          <a href="/press">View More</a>
        </h2>
        <ol>
          <li>
            <article>
              <img src="assets/img/newspaper.svg" alt="" />
              <h3>
                Despite Crackdown on Activism, Tech Employees Are Still
                Picking Fights
              </h3>
              <time datetime="2025-12-26">26 December 2025</time>
              <p>New York Times</p>
            </article>
            <article>
              <img src="assets/img/newspaper.svg" alt="" />
              <h3>
                "Grand Theft, Not Wage Theft", Rockstar Protest in NYC
                Draws Tech Workers, Multiple Unions
              </h3>
              <time datetime="2025-12-08">08 December 2025</time>
              <p>Aftermath</p>
            </article>
          </li>
        </ol>
      </article>
    </>
  );
};
