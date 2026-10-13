import icons from "./src/lucide.ts";

import { Data } from "./types.ts";
import { parseDatesAndSort, renderTime } from "./src/collections.tsx";

export const data = {
  title: "Press",
};

export const render = async ({ press, berlin_press }: Data) => {
  press = parseDatesAndSort([...press, ...berlin_press]);

  return (
    <main class="cards press">
      <header>
        <div>
          <h1>Press</h1>
        </div>
      </header>
      <p class="callout">
        If you’re a member of the press, please get in touch with us through{" "}
        <a href="mailto:press@techworkerscoalition.org">
          press@techworkerscoalition.org.
        </a>
      </p>
      <ol>
        {/* // todo(maximsmol): display bylines */}
        {press.map(({ title, media, timestamp, url }) => (
          <li>
            <article>
              <a href={url}>{icons.Newspaper}</a>
              <div class="info">
                <div>
                  <h2>
                    <a href={url} class="plain">
                      {title}
                    </a>
                  </h2>
                  {renderTime(timestamp, { dateOnly: true })}
                </div>
                <a href={url} class="location plain">
                  <u>{media}</u>
                  {icons.Link2}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
};
