import { readFile } from "node:fs/promises";

import { fromHtml } from "hast-util-from-html";
import { select } from "hast-util-select";
import { toText } from "hast-util-to-text";
import { DateTime } from "luxon";

import { Page, Site } from "../types.ts";

import { renderTime } from "../src/collections";
import simpleIcons from "../src/simple-icons";

export const data = {
  layout: "default.11ty.tsx",
};

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
        (foundImg ?? (
          <div class="icon">
            {{
              type: "raw",
              value: (
                await readFile("_includes/icons/newspaper.html")
              ).toString(),
            }}
          </div>
        ))
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

  const date = Temporal.Instant.from(new Date(page.date).toISOString());

  return (
    <main class="plain">
      <nav>
        <a href="/blog" class="button framed">
          See more blog posts
        </a>
      </nav>
      <article class="post">
        <header>
          <h1 class="h4">{title}</h1>
          {renderTime(date, { dateOnly: true })}
        </header>
        <div class="content" style="font-family: serif;">
          {{ type: "raw", value: content }}
        </div>
      </article>
      <nav aria-label="Share on social media">
        <a class="button framed" href={shareUrl.href} target="_blank">
          {simpleIcons.siX}
          Share on Twitter
        </a>
      </nav>
      {/* todo(maximsmol): fix components syntax with hastscript */}
      {/* todo(maximsmol): re-add */}
      {/*<h2 class="h4">Explore other blog posts</h2>
      {nextPost != null &&
        (await BlogCard({ blog: nextPost, timeZone: site.timeZone }))}
      {prevPost != null &&
        (await BlogCard({ blog: prevPost, timeZone: site.timeZone }))}*/}
    </main>
  );
};
