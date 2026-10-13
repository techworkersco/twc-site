import path from "node:path";

import { DateTime } from "luxon";

export default {
  tags: ["events"],
  layout: "event.11ty.tsx",
  eleventyComputed: {
    date(data) {
      if (data.event != null) return;

      const res = DateTime.fromFormat(data.date, "yyyy-MM-dd HH:mm", {
        zone: "America/New_York",
      }).toJSDate();
      data.page.date = res;
      return res;
    },
    excerpt(data) {
      let content = data.page.rawInput;
      if (data.event != null) content = data.event.content ?? "";

      const res = content.trim().split("\n\n")[0];
      data.page.excerpt = res;
      return res;
    },
  },
  permalink({ page: { inputPath } }) {
    const parsed = path.parse(inputPath);
    return `/events/${this.slugify(parsed.name)}/`;
  },
};
