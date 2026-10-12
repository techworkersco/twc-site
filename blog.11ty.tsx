import liquidjs from "liquidjs";

import icons from "./src/lucide.ts";

export const data = {
  title: "Blog",
};

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

export const render = async function ({ collections: { blog } }) {
  const posts = blog.map((x) => {
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
        `Failed to parse blog timestamp: ${inspect(x.date)} (${date?.toISOString()})`,
        { cause: err },
      );
    }
  });
  // todo(maximsmol): use Instant.compare when available
  posts.sort(
    (a, b) => -(a.timestamp.epochMilliseconds - b.timestamp.epochMilliseconds),
  );

  return (
    <main class="cards">
      <header>
        <div>
          <h1>Blog</h1>
          <div>Explore our {blog.length} blog posts</div>
        </div>
      </header>
      <ol>
        {posts.map(({ data: { title, image }, content, url }) => (
          <li>
            <article>
              <a href={url} class="large">
                {image != null ? (
                  <div
                    class="thumbnail"
                    style={`background-image: url(${image.file})`}
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
                  <p class="detail">
                    {/* todo(maximsmol): use `page.excerpt`? */}
                    {/* todo(maximsmol): do not rely on liquid */}
                    {truncatewords(strip_html(content), 25)}
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
};
