import { inspect } from "node:util";

import { Data, Site } from "./types.ts";
import { inlineSvg, PAIcon } from "./src/icons.ts";
import icons from "./src/lucide.ts";

import { parseDatesAndSort, renderTime } from "./src/collections.tsx";

import { BlogCard } from "./blog.11ty.tsx";

export const render = async ({
  press,
  collections: { events: globalEvents, blog },
  berlin_events,
  nl_events,
  site: { timeZone },
}: Data & { site: Site }) => {
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
  eventsFuture.reverse();
  const eventsPast = events.filter(
    (x) => x.timestamp.epochNanoseconds < renderTs.epochNanoseconds,
  );

  press = parseDatesAndSort(press).slice(0, 3);
  blog = parseDatesAndSort(blog).slice(0, 3);

  const videoId = "jlAbwmoai-0";

  return (
    <main>
      <div class="banner">
        {/* todo(maximsmol): webp everything */}
        <img src="/assets/img/hero-banner.jpg" alt="" />
      </div>
      <section class="hero">
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
      </section>
      <section class="cards">
        <header>
          <h2 class="h3">Upcoming Events</h2>
          <a href="/events" class="button">
            View More {icons.ArrowRight}
          </a>
        </header>
        <ol>
          {eventsFuture.slice(0, 5).map((data) => {
            const { title, timestamp, locations, url, image } = data;
            try {
              const tzs =
                "time_zones" in data ? data.time_zones : data.timeszones;

              if (tzs.length === 0) throw new Error("No time zone specified");

              return (
                <li>
                  <section>
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
                        {tzs.map((tz) => (
                          <div>{renderTime(timestamp, { tz })}</div>
                        ))}
                      </div>
                      <span class="location">
                        <span>{locations[0]}</span>
                        {icons.MapPin}
                      </span>
                    </div>
                  </section>
                </li>
              );
            } catch (err) {
              throw new Error(`Failed to render event ${inspect(data)}`, {
                cause: err,
              });
            }
          })}
        </ol>
      </section>
      <section class="cards press">
        <header>
          <h2 class="h3">TWC in the Press</h2>
          <a href="/press" class="button">
            View More
            {icons.ArrowRight}
          </a>
        </header>
        <hr />
        <ol>
          {press.map(({ title, timestamp, media, url }) => (
            <li>
              <section>
                <a href={url}>{icons.Newspaper}</a>
                <div class="info">
                  <div>
                    <h3>
                      <a href={url} class="plain">
                        {title}
                      </a>
                    </h3>
                    {renderTime(timestamp, { tz: "UTC", dateOnly: true })}
                  </div>
                  <a href={url} class="location plain">
                    <u>{media}</u>
                    {icons.Link2}
                  </a>
                </div>
              </section>
            </li>
          ))}
        </ol>
      </section>
      <section class="cards">
        <header>
          <h2 class="h3">Blog Posts</h2>
          <a href="/blog" class="button">
            View More {icons.ArrowRight}
          </a>
        </header>
        <ol>
          {blog.map((post) => BlogCard({ post, header: "h3", timeZone }))}
        </ol>
      </section>
      <section class="youtube">
        <header>
          <h2>Featured Video</h2>
        </header>
        {/* todo(maximsmol): this is not accessible, code is inherited from old site */}
        <div class="container">
          <div
            class="video"
            onclick={`
            const iframe = document.createElement('iframe');

            iframe.setAttribute('src', 'https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1');
            iframe.setAttribute('title', 'Featured Video');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;');

            this.appendChild(iframe);
          `}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Featured Video Thumbnail"
              onerror={`this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg';`}
            />
            {/* this is directly from YouTube's normal iframe */}
            <div class="play-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 67 60"
                fill=""
                focusable="false"
                aria-hidden="true"
              >
                <path d="M63 14.87a7.885 7.885 0 00-5.56-5.56C52.54 8 32.88 8 32.88 8S13.23 8 8.32 9.31c-2.7.72-4.83 2.85-5.56 5.56C1.45 19.77 1.45 30 1.45 30s0 10.23 1.31 15.13c.72 2.7 2.85 4.83 5.56 5.56C13.23 52 32.88 52 32.88 52s19.66 0 24.56-1.31c2.7-.72 4.83-2.85 5.56-5.56C64.31 40.23 64.31 30 64.31 30s0-10.23-1.31-15.13z"></path>
                <path
                  fill="#FFF"
                  class="logo-arrow"
                  d="M26.6 39.43L42.93 30 26.6 20.57z"
                ></path>
              </svg>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@techworkerscoalitionvideos"
            class="button framed"
          >
            More on our channel {icons.ArrowRight}
          </a>
        </div>
      </section>
    </main>
  );
};
