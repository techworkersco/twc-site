import { DateTime } from "luxon";

import { Data, EleventyFuns } from "../types.ts";

export const render = async function (
  this: EleventyFuns,
  {
    include: { limit } = {},
    press,
    site: { timeZone },
    berlin_press,
  }: Data & {
    include?: { limit?: number };
  },
) {
  const readDate = (x: string) =>
    DateTime.fromFormat(x, "yyyy-MM-dd").setZone(timeZone);

  const posts = [...press, ...berlin_press.filter((x) => x.lang === "en")].map(
    ({ date, ...x }) => ({ ...x, date: readDate(date) }),
  );
  posts.sort((a, b) => -(a.date.toUnixInteger() - b.date.toUnixInteger()));

  const icon = {
    type: "raw",
    value: await this.renderFile("_includes/icons/newspaper.html"),
  };

  return posts.slice(0, limit ?? posts.length).map((post) => (
    <article class="card-preview">
      <div class="icon">{icon}</div>
      <div>
        <div>
          {post.media} —{" "}
          <time datetime={post.date.setZone("UTC").toFormat("yyyy-MM-dd")}>
            {post.date.setZone("UTC").toFormat("d LLLL yyyy")}
          </time>
        </div>
        <h3>
          <a href={post.url}>{post.title}</a>
        </h3>
      </div>
    </article>
  ));
};
