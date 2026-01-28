import path from "node:path";
import { DateTime } from "luxon";
import memoize from "memoize";
import * as sass from "sass";
import { IdAttributePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import prettier from "prettier";
import YAML from "yaml";

const baseUrl = "https://techworkerscoalition.org";
const timeZone = "America/New_York";

const ampmZones = new Set([
  "US/Eastern",
  "US/Pacific",
  "US/Central",
  "US/Mountain",
]);

// https://github.com/jekyll/jekyll/blob/ebe567c1d2efd94f2752acbe9cc2156671747aa1/lib/jekyll/utils.rb#L202
const slugifyJekyll = (x) =>
  x
    .replace(/[^\p{M}\p{L}\p{Nd}]+/gu, "-")
    .replace(/^-|-$/i, "")
    .toLowerCase();

// todo(maximsmol): this doesn't match for some reason
// https://github.com/gettalong/kramdown/blob/fc051a9d93e4dc3ff05bf41b70a79297ebdb669f/lib/kramdown/converter/base.rb#L222
const slugifyKramdown = (x) =>
  x
    .replace(/^[^a-zA-Z]+/g, "")
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

const parseLooseDate = (x) => {
  let dt = DateTime.fromJSDate(x);
  if (!dt.isValid) dt = DateTime.fromISO(x, { setZone: true });
  if (!dt.isValid)
    dt = DateTime.fromFormat(x, "yyyy-MM-dd HH:mm:ss ZZ", { setZone: true });
  if (!dt.isValid)
    dt = DateTime.fromFormat(x, "yyyy-MM-dd HH:mm:ss ZZZ", { setZone: true });

  return dt;
};

export default async (cfg) => {
  cfg.ignores.add("_site_jekyll"); // todo(maximsmol): remove before merging
  cfg.ignores.add("_site_jekyll_prettier"); // todo(maximsmol): remove before merging

  cfg.setLayoutsDirectory("_layouts");
  cfg.addPassthroughCopy("assets");
  cfg.addPassthroughCopy("circuit-breakers");
  cfg.ignores.add("circuit-breakers");

  cfg.addDataExtension("yml", YAML.parse);
  cfg.addDataExtension("yaml", YAML.parse);

  cfg.setLiquidOptions({
    jekyllInclude: true, // todo(maximsmol): rewrite to new syntax?
    timezoneOffset: timeZone,
  });
  cfg.setLibrary(
    "md",
    markdownIt({
      html: true,
      typographer: true,
    }).use(markdownItAnchor, {
      tabIndex: false,
      slugify: slugifyJekyll,
      // slugify: slugifyKramdown // todo(maximsmol): fix
    }),
  );

  // todo(maximsmol): switch to this?
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
      console.log(`!!! Prettier failed: ${this.page.inputPath} (${error})`);
      return x;
    }
  });

  cfg.addFilter("time_converter_url", function (x) {
    return `https://www.timeanddate.com/worldclock/converter.html?iso=${DateTime.fromJSDate(x).setZone("UTC").toFormat("yyyyMMdd'T'HHmmss")}&p1=179&p2=224&p3=37`;
  });
  cfg.addFilter("all_time_zones", function (x, timezones) {
    const dt = parseLooseDate(x);
    if (!dt.isValid) throw new Error(`all_time_zones: invalid input: ${x}`);

    if (timezones == null) timezones = ["Europe/Berlin"];

    return (
      dt.setZone(timezones[0]).toFormat("dd LLLL yyyy – ") +
      timezones
        .map((tz) => {
          const cur = dt.setZone(tz);

          if (ampmZones.has(tz))
            return (
              cur.toFormat("h:mm") +
              cur.toFormat("a").toLowerCase() +
              cur.toFormat(" ZZZZ")
            );

          return cur
            .toFormat("HH:mm ZZZZ")
            .replace("GMT+1", "CET")
            .replace("GMT+2", "CEST");
        })
        .join(", ")
    );
  });
  cfg.addFilter("relative_day_of_month", function (x, timezones) {
    if (timezones == null) timezones = [timeZone];
    const dt = DateTime.fromJSDate(x);
    return dt.setZone(timezones[0]).toFormat("dd");
  });

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

      return res;
    },
  }));

  cfg.addDateParsing(function (x) {
    // todo(maximsmol): fix in sources
    if (x == null) return;

    if (x instanceof Date) return DateTime.fromJSDate(x);

    const res = DateTime.fromFormat(x, "yyyy-MM-dd HH:mm", { zone: timeZone });
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

  // todo(maximsmol): do something about these?
  cfg.addFilter("where_future", function (xs, ts) {
    const tsTime = new Date(ts).getTime();
    return xs.filter((x) => new Date(x.date).getTime() >= tsTime);
  });
  cfg.addFilter("where_past", function (xs, ts) {
    const tsTime = new Date(ts).getTime();
    return xs.filter((x) => new Date(x.date).getTime() < tsTime);
  });
  cfg.addFilter("date_sort", function (xs) {
    return xs.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  });
  cfg.addFilter("date_or_utc", function (x, fmt) {
    if (fmt !== "%Y-%m-%d %H:%M:%S %z")
      throw new Error("date_or_utc: unexpected format");

    if (typeof x === "string")
      return parseLooseDate(x).toFormat("yyyy-MM-dd HH:mm:ss ZZZ");

    return DateTime.fromJSDate(x)
      .setZone("UTC")
      .toFormat("yyyy-MM-dd HH:mm:ss 'UTC'");
  });

  const remoteDataSrcs = [
    {
      data: "berlin_press",
      url: "https://raw.githubusercontent.com/techworkersco/twc-site-berlin/develop/_data/press.yml",
    },
    {
      data: "berlin_events",
      url: "https://techworkersberlin.com/events.yml",
    },
    {
      data: "nl_events",
      url: "https://techwerkers.nl/en/twc-global/index.yaml",
    },
  ];
  const deferred = [];
  for (const x of remoteDataSrcs)
    deferred.push(
      (async () => {
        const req = await fetch(x.url, {
          headers: {
            "User-Agent": "twc-website/1.0",
          },
        });
        const data = YAML.parse(await req.text());

        console.log(`Fetched: ${x.data} from ${x.url}`);

        cfg.addGlobalData(x.data, data);
      })(),
    );
  await Promise.all(deferred);

  cfg.addGlobalData(
    "jekyll.environment",
    process.env.CONTEXT === "production" ? "production" : "development",
  );
  cfg.addGlobalData("eleventyComputed.site", (a) => (data) => ({
    ...data.collections, // todo(maximsmol): fix in source code
    // time: new Date(),
    time: new Date("2026-01-01 00:00:00 -07:00"), // todo(maximsmol): remove, for diffing
    url: "https://techworkerscoalition.org",
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
    data: {
      chapters: data.chapters,
      press: data.press,
      workplaces: data.workplaces,
      ...Object.fromEntries(remoteDataSrcs.map((x) => [x.data, data[x.data]])),
    },
  }));
};

// fixme(maximsmol): blog excerpts
// fixme(maximsmol): recent blog dates are wrong
// todo(maximsmol): fix canonicals
// todo(maximsmol): fix markdown anchor slugify
// todo(maximsmol): fix some quotation marks not getting smarty-panted
// todo(maximsmol): fix bill-of-rights description
