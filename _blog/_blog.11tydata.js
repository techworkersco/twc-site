import path from "node:path";

const dateRe = /^(\d{4})-(\d{2})-(\d{2})-(.*)$/;

export default {
  tags: ["blog"],
  layout: "newsletter.11ty.tsx",
  permalink(data) {
    const {
      page: { inputPath },
    } = data;

    const parsed = path.parse(inputPath);
    const m = dateRe.exec(parsed.name);
    if (m == null)
      throw new Error(
        `Could not parse blog date from filename: ${parsed.name}`,
      );

    return `/blog/${m[1]}/${m[2]}/${m[3]}/${this.slugify(m[4])}/`;
  },
};
