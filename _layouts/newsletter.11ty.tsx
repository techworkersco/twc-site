import { readFile } from "node:fs/promises";

import { fromHtml } from "hast-util-from-html";
import { select } from "hast-util-select";
import { toText } from "hast-util-to-text";
import { DateTime } from "luxon";

import { Page, Site } from "../types.ts";

export const data = { layout: "default.11ty.tsx" };

type BlogItem = {
  data: {
    image?:
      | string
      | {
          file: string;
          alt?: string;
        };
    title: string;
  };
  url: string;
  date: Date;
  content: string;
};

const BlogCard = async ({
  blog,
  timeZone,
}: {
  blog: BlogItem;
  timeZone: string;
}) => {
  // todo(maximsmol): combine with the meta description generator somehow?
  const contentAst = fromHtml(blog.content);
  const foundImg = select("img[src]", contentAst);

  const snippetWords = toText(contentAst).split(/\s+/g);
  const snippet =
    snippetWords.length <= 25
      ? snippetWords.join(" ")
      : snippetWords.slice(0, 25).join(" ") + "…";

  const date = DateTime.fromJSDate(blog.date).setZone(timeZone);

  return (
    <article class="card-preview">
      {typeof blog.data.image === "object" ? (
        <img src={blog.data.image.file} alt={blog.data.image.alt} />
      ) : typeof blog.data.image === "string" ? (
        <img src={blog.data.image} />
      ) : (
        foundImg ?? (
          <div class="icon">
            {{
              type: "raw",
              value: (
                await readFile("_includes/icons/newspaper.html")
              ).toString(),
            }}
          </div>
        )
      )}
      <div>
        <time datetime={date.toFormat("yyyy-MM-dd HH:mm:ss ZZZ")}>
          {date.toFormat("d LLLL yyyy")}
        </time>
        <h3>
          <a href={blog.url}>{blog.data.title}</a>
        </h3>
        <p class="tablet-hide">{snippet}</p>
      </div>
    </article>
  );
};

export const render = async function (
  this: {
    getNextCollectionItem: (xs: BlogItem[], page: Page) => BlogItem | undefined;
    getPreviousCollectionItem: (
      xs: BlogItem[],
      page: Page,
    ) => BlogItem | undefined;
  },
  {
    content,
    title,
    page,
    site,
    collections,
  }: {
    content: string;
    title: string;
    page: Page;
    site: Site;
    collections: { blog: BlogItem[] };
  },
) {
  const curUrlAbsolute = new URL(page.url, site.url);
  const shareUrl = new URL("https://twitter.com/intent/tweet");
  shareUrl.searchParams.set(
    "text",
    `${title} via @techworkersco ${curUrlAbsolute.href}`,
  );

  // todo(maximsmol): why is `this.page` wrong?
  const prevPost = this.getPreviousCollectionItem(collections.blog, page);
  const nextPost = this.getNextCollectionItem(collections.blog, page);

  const date = DateTime.fromJSDate(page.date).setZone(site.timeZone);

  return (
    <>
      <nav class="see-more">
        <a href="/blog" class="button primary">
          See more blog posts
        </a>
      </nav>
      <article>
        <h2 class="blog-header">{title}</h2>
        <time datetime={date.toFormat("yyyy-MM-dd HH:mm:ss ZZZ")}>
          {date.toFormat("d LLLL yyyy")}
        </time>
        <div class="blog-content">{{ type: "raw", value: content }}</div>
      </article>
      <nav aria-label="Share on social media">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a
              class="button"
              href={shareUrl.href}
              title="Share on Twitter"
              target="_blank"
            >
              <svg
                class="simple-icon twitter"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>X</title>
                <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
              </svg>
              Tweet
            </a>
          </li>
        </ul>
      </nav>
      <h3>Explore other blog posts</h3>
      {/* todo(maximsmol): fix components syntax with hastscript */}
      {nextPost != null &&
        (await BlogCard({ blog: nextPost, timeZone: site.timeZone }))}
      {prevPost != null &&
        (await BlogCard({ blog: prevPost, timeZone: site.timeZone }))}
    </>
  );
};
