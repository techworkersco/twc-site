import path from "node:path";

import { DateTime } from "luxon";

const dateRe = /^(\d{4})-(\d{2})-(\d{2})-.*$/;

export default {
  tags: ["events"],
  layout: "event",
  permalink({ page: { inputPath } }) {
    const parsed = path.parse(inputPath);
    return `/events/${this.slugify(parsed.name)}/`;
  },
};
