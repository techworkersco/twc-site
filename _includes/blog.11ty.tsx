import { Data, EleventyFuns } from "../types.ts";

export const render = async function (
  this: EleventyFuns,
  data: Data & { include?: { limit?: number } },
) {
  const {
    include: { limit } = {},
    page: { url },
    collections: { blog },
  } = data;

  const items = blog.toSorted((a, b) => -(a.date.getTime() - b.date.getTime()));

  const cards = await Promise.all(
    items.slice(0, limit ?? items.length).map(
      async (blog) =>
        ({
          type: "raw",
          value: await this.renderFile("_includes/blog-card.html", {
            ...data,
            include: { blog },
          }),
        }) as const,
    ),
  );

  return url === "/blog/" ? (
    <>
      <h1>Blog</h1>
      Explore our <b>{items.length}</b> blog posts
      <section>
        <>{cards}</>
      </section>
    </>
  ) : (
    <>
      <h2 class="marg-b-2">Blog Posts</h2>
      {cards}
      <a href="/blog" class="button">
        See more blog posts
      </a>
    </>
  );
};
