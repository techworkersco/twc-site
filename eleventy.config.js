import path from "node:path";
import { DateTime } from "luxon";
import memoize from "memoize";
import * as sass from "sass";
import { IdAttributePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import prettier from "prettier";

const baseUrl = "https://techworkerscoalition.org";
const timeZone = "America/New_York";

const ampmZones = new Set([
  "US/Eastern",
  "US/Pacific",
  "US/Central",
  "US/Mountain",
]);

export default (cfg) => {
  cfg.ignores.add("_site_jekyll"); // todo(maximsmol): remove before merging
  cfg.ignores.add("_site_jekyll_prettier"); // todo(maximsmol): remove before merging

  cfg.setLayoutsDirectory("_layouts");
  cfg.addPassthroughCopy("assets");

  cfg.setLiquidOptions({
    jekyllInclude: true, // todo(maximsmol): rewrite to new syntax?
    timezoneOffset: timeZone,
  });
  cfg.setLibrary(
    "md",
    markdownIt({
      html: true,
      typographer: true,
    }),
  );
  // cfg.configureErrorReporting({ allowMissingExtensions: true });

  // cfg.addPlugin(IdAttributePlugin);
  cfg.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--excerpt-->",
  });
  cfg.addTransform("prettier", async function (x) {
    // todo(maximsmol): remove, this is for diffing
    if (!this.page.outputPath.endsWith(".html")) return x;

    try {
      return await prettier.format(x, {
        parser: "html",
      });
    } catch (error) {
      return x;
    }
  });

  cfg.addFilter("time_converter_url", function (x) {
    return `https://www.timeanddate.com/worldclock/converter.html?iso=${x.toISOString()}&p1=179&p2=224&p3=37`;
  });
  cfg.addFilter("all_time_zones", function (x, timezones) {
    const dt = DateTime.fromJSDate(x);
    if (timezones == null) timezones = ["Europe/Berlin"];

    return timezones
      .map((tz) => {
        const cur = dt.setZone(tz);

        if (ampmZones.has(tz))
          return (
            cur.toFormat("dd LLLL yyyy – h:mm") +
            cur.toFormat("a").toLowerCase() +
            cur.toFormat(" ZZZZ")
          );

        return cur.toFormat("dd LLLL yyyy – H:mm ZZZZ");
      })
      .join(", ");
  });

  cfg.htmlTransformer.setPosthtmlProcessOptions({
    // closingSingleTag: "slash",
    recognizeNoValueAttribute: true,
  }); // todo(maximsmol): remove
  cfg.addFilter("absolute_url", function (x) {
    return new URL(x, baseUrl).href;
  }); // todo(maximsmol): fix in sources
  cfg.addFilter("relative_url", function (x) {
    return x;
  }); // todo(maximsmol): fix in sources
  cfg.addFilter("filter_tags", function (x) {
    return x;
  }); // todo(maximsmol): fix in sources
  cfg.addLiquidTag("link", (liquid) => ({
    // todo(maximsmol): rewrite in sources and remove
    parse: function (tagToken, remainTokens) {
      this.path = tagToken.args;
    },
    render: async function (ctx) {
      const res = cfg
        .getFilter("inputPathToUrl")
        .call(ctx.environments, this.path);
      if (res == null) throw new Error(`{% link ${this.path} %} not found`);

      return res.url;
    },
  }));

  cfg.addDateParsing(function (x) {
    // todo(maximsmol): fix in sources
    if (x == null) return;

    let res;
    if (x instanceof Date)
      // res = DateTime.fromJSDate(x);
      res = DateTime.fromJSDate(x, { zone: "utc" }).setZone(timeZone, {
        keepLocalTime: true,
      });
    else if (typeof x === "string")
      res = DateTime.fromFormat(x, "yyyy-MM-dd hh:mm", { zone: timeZone });
    // res = DateTime.fromFormat(x, "yyyy-MM-dd hh:mm");
    else throw new Error(`Invalid date: ${x} in ${this.page.inputPath}`);

    // console.log(this.page.inputPath, x, res);

    if (!res.isValid)
      throw new Error(
        `Invalid \`date\` value (${x}) is invalid for ${this.page.inputPath}: ${res.invalidReason}`,
      );

    return res;
  });

  // todo(maximsmol): replace sass with lightningcss
  cfg.addFilter(
    "scssify",
    memoize(function (content) {
      const parsed = path.parse(this.page.inputPath);
      const res = sass.compileString(content, {
        loadPaths: [parsed.dir ?? ".", this.eleventy.directories.includes],
        style: "compressed",
      });
      // todo(maximsmol): does this need addDependencies somehow?

      return res.css;
    }),
  );

  cfg.addGlobalData("eleventyComputed.site", (a) => (data) => ({
    // ...data.collections,
    // time: new Date(),
    title: "Tech Workers Coalition",
    description:
      "A coalition of tech industry workers, labor organizers, community organizers, and friends cultivating solidarity among all workers in tech.",
    header_links: [
      { url: "/subscribe", text: "Join" },
      { url: "/events", text: "Events" },
      { url: "/chapters", text: "Chapters" },
    ],
    links: [
      { url: "/subscribe", text: "Join" },
      { url: "/events", text: "Events" },
      { url: "/blog", text: "Blog" },
      { url: "/chapters", text: "Chapters" },
      { url: "/community-guide", text: "Community Guide" },
      { url: "/job-board", text: "Union Job Board" },
      { url: "/press", text: "Press mentions" },
      { url: "/security", text: "Security Tips" },
    ],
    // data: {
    //   chapters: data.chapters,
    //   press: data.press,
    // },
  }));
};
