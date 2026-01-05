import path from "node:path";

import { DateTime } from "luxon";

const dateRe = /^(\d{4})-(\d{2})-(\d{2})-.*$/;

export default {
  tags: ["events"],
  layout: "event",
  eleventyComputed: {
    date(data) {
      const res = DateTime.fromFormat(data.date, "yyyy-MM-dd HH:mm", {
        zone: "America/New_York",
      }).toJSDate();
      data.page.date = res;
      return res;
    },
  },
  permalink({ page: { inputPath } }) {
    const parsed = path.parse(inputPath);
    return `/events/${this.slugify(parsed.name)}/`;
  },
};
