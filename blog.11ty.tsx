import liquidjs from "liquidjs";

import { Data, BlogPost } from "./types.ts";
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

export const BlogCard = ({
  post: {
    data: { title, image },
    timestamp,
    content,
    url,
  },
  header,
}: {
  post: BlogPost;
  header: string;
}) => {
  const resolvedImage = image?.file ?? firstImageIn(content);

  const titleLink = (
    <a href={url} class="plain">
      {title}
    </a>
  );

  return (
    <li>
      <section>
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
            {header === "h2" && <h2>{titleLink}</h2>}
            {header === "h3" && <h3>{titleLink}</h3>}
            <p class="detail">
              {/* todo(maximsmol): use `page.excerpt`? */}
              {/* todo(maximsmol): do not rely on liquid */}
              {truncatewords(strip_html(content), 25)}
            </p>
            <div class="tiny">{renderTime(timestamp, { dateOnly: true })}</div>
          </div>
        </div>
      </section>
    </li>
  );
};

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
      <ol>{posts.map((post) => BlogCard({ post, header: "h2" }))}</ol>
    </main>
  );
};
