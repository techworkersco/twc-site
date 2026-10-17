import icons from "./src/lucide.ts";

import { Data } from "./types.ts";
import { parseDatesAndSort, renderTime } from "./src/collections.tsx";

export const data = {
  title: "Events",
};

const renderEvent = ({ title, timestamp, locations, url, image }) => (
  <li>
    <section>
      <a href={url} class="large">
        {image != null ? (
          <div class="thumbnail" style={`background-image: url(${image})`} />
        ) : (
          icons.CalendarDays
        )}
      </a>
      <div class="info">
        <div>
          <h2>
            <a href={url} class="plain">
              {title}
            </a>
          </h2>
          {/* fixme(maximsmol): handle timezones properly */}
          {renderTime(timestamp)}
        </div>
        <span class="location">
          <span>{locations[0]}</span>
          {icons.MapPin}
        </span>
      </div>
    </section>
  </li>
);

export const render = async ({
  collections: { events: globalEvents },
  berlin_events,
  nl_events,
}: Data) => {
  // todo(maximsmol): deduplicate with landing
  const events = parseDatesAndSort([
    ...globalEvents.map(({ data, url }) => ({ ...data, url })),
    ...(berlin_events ?? []),
    ...(nl_events ?? []),
  ]).map((x) => {
    const tzs = "time_zones" in x ? x.time_zones : x.timeszones;

    if (tzs.length === 0) throw new Error("No time zone specified");

    return { ...x, baseTime: x.timestamp.toZonedDateTimeISO(tzs[0]), tzs };
  });
  events.reverse();

  const renderTs = Temporal.Now.instant();
  const eventsFuture = events.filter(
    (x) => x.timestamp.epochNanoseconds >= renderTs.epochNanoseconds,
  );
  const eventsPast = events.filter(
    (x) => x.timestamp.epochNanoseconds < renderTs.epochNanoseconds,
  );

  const byYear = Object.groupBy(eventsPast, (x) => x.baseTime.year);
  const years = Object.keys(byYear);
  years.sort();
  years.reverse();

  return (
    <main class="events">
      <header>
        <div>
          <h1>Events</h1>
          <div>
            Explore all <strong>{events.length}</strong> public events we
            organized.
          </div>
        </div>
      </header>
      <section class="cards">
        <header>
          <h2 class="h3">Upcoming Events</h2>
        </header>
        <ol>{eventsFuture.map(renderEvent)}</ol>
      </section>
      <section class="past">
        <header>
          <h2 class="h3">Past Events</h2>
        </header>
        {years.map((year) => (
          <section class="cards">
            <details>
              <summary>
                <header>
                  <h2 class="h4">
                    {/* todo(maximsmol): spacing */}
                    <span class="summary-closed">{icons.ChevronRight}</span>
                    <span class="summary-open">{icons.ChevronDown}</span>
                    {year}
                  </h2>
                </header>
              </summary>
              <ol>{byYear[year].map(renderEvent)}</ol>
            </details>
          </section>
        ))}
      </section>
    </main>
  );
};
