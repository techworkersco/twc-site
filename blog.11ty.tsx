import liquidjs from "liquidjs";

import { Data } from "./types.ts";
import icons from "./src/lucide.ts";

import { parseDatesAndSort, renderTime } from "./src/collections.tsx";

export const data = {
  title: "Blog",
};

const imageTagRe = /<\s*img\s+(?:[^>]+\s+)?src\s*=\s*"([^"]*)"[^>]*>/is;
const firstImageIn = (x: string) => imageTagRe.exec(x)?.[1];

const strip_html = (x: string) =>
  liquidjs.filters.strip_html.call(
    { context: { memoryLimit: { use() {} } } },
    x,
  );

const truncatewords = (x: string, words?: number) =>
  liquidjs.filters.truncatewords.call(
    { context: { memoryLimit: { use() {} } } },
    x,
    words,
  );

export const render = async ({ collections: { blog } }: Data) => {
  const posts = parseDatesAndSort(blog);

  return (
    <main class="cards">
      <header>
        <div>
          <h1>Blog</h1>
          <div>
            Explore our <strong>{blog.length}</strong> blog posts.
          </div>
        </div>
      </header>
      <ol>
        {posts.map(({ data: { title, image }, timestamp, content, url }) => {
          const resolvedImage = image?.file ?? firstImageIn(content);

          return (
            <li>
              <article>
                <a href={url} class="large">
                  {resolvedImage != null ? (
                    // todo(maximsmol): add alt text
                    <div
                      class="thumbnail"
                      style={`background-image: url(${resolvedImage})`}
                    />
                  ) : (
                    icons.Newspaper
                  )}
                </a>
                <div class="info">
                  <div>
                    <h2>
                      <a href={url} class="plain">
                        {title}
                      </a>
                    </h2>
                    <p class="detail">
                      {/* todo(maximsmol): use `page.excerpt`? */}
                      {/* todo(maximsmol): do not rely on liquid */}
                      {truncatewords(strip_html(content), 25)}
                    </p>
                    <div class="tiny">
                      {renderTime(timestamp, { dateOnly: true })}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </main>
  );
};
