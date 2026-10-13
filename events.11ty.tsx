import icons from "./src/lucide.ts";

import { Data } from "./types.ts";
import { parseDatesAndSort, renderTime } from "./src/collections.tsx";

export const data = {
  title: "Events",
};

export const render = async ({
  collections: { events: globalEvents },
  berlin_events,
  nl_events,
}: Data) => {
  const events = parseDatesAndSort([
    ...globalEvents.map(({ data, url }) => ({ ...data, url })),
    ...(berlin_events ?? []),
    ...(nl_events ?? []),
  ]);

  return (
    <main class="cards">
      <header>
        <div>
          <h1>Events</h1>
          <div>
            Explore all <strong>{events.length}</strong> public events we
            organized.
          </div>
        </div>
      </header>
      <ol>
        {events.map(({ title, timestamp, locations, url, image }) => (
          <li>
            <article>
              <a href={url} class="large">
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
                  <h2>
                    <a href={url} class="plain">
                      {title}
                    </a>
                  </h2>
                  {renderTime(timestamp)}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
};
