import { inspect } from "node:util";

import { Data } from "./types.ts";
import { inlineSvg, PAIcon } from "./src/icons.ts";
import icons from "./src/lucide.ts";

import { parseDatesAndSort, renderTime } from "./src/collections.tsx";

export const render = async ({
  collections: { events: globalEvents },
  berlin_events,
  nl_events,
}: Data) => {
  const heroIcons = [
    "binary-sharp",
    "sunglasses-sharp",
    "zap",
    "robot",
    "heart",
    "cpu-sharp",
    "fire",
    "thumbs-up-sharp",
    "warning-diamond",
    "rss-square-sharp",
    "zoom-in",
    "tv-sharp",
    "close",
    "directions",
    "thumbs-down-sharp",
    "bug",
    "braces-content-sharp",
    "brackets-angle",
    "square-cursor-sharp",
  ];
  const iconLines = [
    heroIcons.slice(0, 10),
    heroIcons.slice(10, 16),
    heroIcons.slice(16, 20),
  ];

  const events = parseDatesAndSort([
    ...globalEvents.map(({ data, url }) => ({ ...data, url })),
    ...(berlin_events ?? []),
    ...(nl_events ?? []),
  ]);

  const renderTs = Temporal.Now.instant();
  const eventsFuture = events.filter(
    (x) => x.timestamp.epochNanoseconds >= renderTs.epochNanoseconds,
  );
  const eventsPast = events.filter(
    (x) => x.timestamp.epochNanoseconds < renderTs.epochNanoseconds,
  );

  return (
    <main>
      <div class="banner">
        {/* todo(maximsmol): webp everything */}
        <img src="/assets/img/hero-banner.jpg" alt="" />
      </div>
      <article class="hero">
        <h1>
          {await inlineSvg("chip")}
          <div class="title">
            <div>
              Worker <span class="red">Power</span>
            </div>
            <div class="h4">In the Tech Industry</div>
          </div>
          <div class="icon-lines red">
            {await Promise.all(
              iconLines.map(async (line) => (
                <div class="icon-line">
                  {await Promise.all(line.map(PAIcon))}
                </div>
              )),
            )}
          </div>
        </h1>
        <hr />
        {/* todo(maximsmol): smarty-pants this */}
        <ul class="hero-cards">
          <li>
            <section>
              <h3 class="h5">Vision & Values:</h3>
              <p>
                Guided by our vision for an inclusive and equitable tech
                industry, TWC organizes to build worker power through rank and
                file self-organization and education.
              </p>
            </section>
          </li>
          <li>
            <section>
              <h3 class="h5">Who We Are:</h3>
              <p>
                We are a coalition of workers in and around the tech industry,
                labor organizers, community organizers, and friends. We work in
                solidarity with existing movements towards social justice,
                worker's rights, and economic inclusion.
              </p>
            </section>
          </li>
          <li>
            <section>
              <h3 class="h5">How We Operate:</h3>
              <p>
                We're democratically structured, all-volunteer, and worker-led
                organization.
              </p>
            </section>
          </li>
        </ul>
        <section class="cta">
          <a href="/chapters" class="button monospace">
            <u>Find a Local Chapter</u>
          </a>
          <a href="/subscribe" class="button framed">
            Get Involved
            {icons.ArrowRight}
          </a>
        </section>
      </article>
      <article class="cards">
        <header>
          <h2 class="h3">Upcoming Events</h2>
          <a href="/events" class="button">
            View More {icons.ArrowRight}
          </a>
        </header>
        <ol>
          {/* todo(maximsmol): title fails to wrap if it doesn't fit */}
          {eventsFuture.map((data) => {
            const { title, timestamp, locations, url, image } = data;
            try {
              const tzs =
                "time_zones" in data ? data.time_zones : data.timeszones;

              if (tzs.length === 0) throw new Error("No time zone specified");

              return (
                <li>
                  <article>
                    <a href={url}>
                      {image != null ? (
                        <div
                          class="thumbnail"
                          style={`background-image: url(${image})`}
                        />
                      ) : (
                        icons.CalendarDays
                      )}
                    </a>
                    <div class="info">
                      <div>
                        <h3>
                          <a href={url} class="plain">
                            {title}
                          </a>
                        </h3>
                        {tzs.map((tz) => renderTime(timestamp, tz))}
                      </div>
                      <span class="location">
                        <span>{locations[0]}</span>
                        {icons.MapPin}
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
              {icons.Newspaper}
              <h3>
                Despite Crackdown on Activism, Tech Employees Are Still Picking
                Fights
              </h3>
              <time datetime="2025-12-26">26 December 2025</time>
              <p>New York Times</p>
            </article>
            <article>
              {icons.Newspaper}
              <h3>
                "Grand Theft, Not Wage Theft", Rockstar Protest in NYC Draws
                Tech Workers, Multiple Unions
              </h3>
              <time datetime="2025-12-08">08 December 2025</time>
              <p>Aftermath</p>
            </article>
          </li>
        </ol>
      </article>
    </main>
  );
};
