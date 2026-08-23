import { pathToFileURL } from "node:url";

import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import * as mdx from "@mdx-js/mdx";
import { toHtml } from "hast-util-to-html";
import * as jsxRuntime from "hastscript/jsx-runtime";
import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import rehypeSlug from "rehype-slug";
import YAML from "yaml";

const timeZone = "America/New_York";

const site = {
  title: "Tech Workers Coalition",
  description:
    "A coalition of tech industry workers, labor organizers, community organizers, and friends cultivating solidarity among all workers in tech.",
  url: "https://techworkerscoalition.org",
  timeZone,
};

const ampmZones = new Set([
  "US/Eastern",
  "US/Pacific",
  "US/Central",
  "US/Mountain",
]);

// https://github.com/gettalong/kramdown/blob/fc051a9d93e4dc3ff05bf41b70a79297ebdb669f/lib/kramdown/converter/base.rb#L222
// modified to convert ASCII character classes to Unicode character properties
// Ruby might be doing this implicitly? the generated slugs imperically match
const slugifyKramdown = (x) =>
  x
    .replaceAll(/^[^\p{L}\p{Nd}]+/gu, "")
    .replaceAll(/[^\p{M}\p{L}\p{Nd} -]/gu, "")
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
  cfg.addGlobalData("layout", "default.11ty.tsx");
  cfg.setLayoutResolution(false);

  cfg.ignores.add("README.md");

  cfg.setLayoutsDirectory("_layouts");
  cfg.addPassthroughCopy("assets");
  cfg.addPassthroughCopy("netlify.toml");

  cfg.addPassthroughCopy("circuit-breakers");
  cfg.ignores.add("circuit-breakers");

  cfg.addPassthroughCopy("admin");
  cfg.ignores.add("admin");

  cfg.addDataExtension("yml", YAML.parse);
  cfg.addDataExtension("yaml", YAML.parse);

  const getRssConfig = (collection, name) => ({
    type: "atom",
    outputPath: `/feed/${collection}.xml`,
    collection: {
      name: collection,
      limit: 20,
    },
    metadata: {
      language: "en",
      title: `${site.title} | ${name}`,
      subtitle: site.description,
      base: site.url,
      author: {
        name: "",
      },
    },
  });

  cfg.addPlugin(feedPlugin, getRssConfig("blog", "Blog"));
  cfg.addPlugin(feedPlugin, getRssConfig("events", "Events"));

  cfg.setLiquidOptions({
    jekyllInclude: true, // todo(maximsmol): rewrite to new syntax?
    timezoneOffset: timeZone,
  });

  // todo(maximsmol): switch to this?
  // cfg.addPlugin(IdAttributePlugin);
  const md = markdownIt({
    html: true,
    typographer: true,
  }).use(markdownItAnchor, {
    tabIndex: false,
    slugify: slugifyKramdown,
  });
  cfg.setLibrary("md", md);
  // todo(maximsmol): get rid of this somehow? e.g. via `renderTemplate`?
  cfg.addGlobalData("md", md);

  cfg.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--excerpt-->",
  });

  // todo(maximsmol): move this into a javascript util file
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

  cfg.addFilter("filter_tags", function (x) {
    return x;
  }); // todo(maximsmol): fix in sources
  cfg.addLiquidTag("link", () => ({
    // todo(maximsmol): rewrite in sources and remove
    parse: function (tagToken) {
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
    return xs.toSorted(
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

  cfg.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile() {
      return async function (data) {
        const res = await this.defaultRenderer(data);
        return toHtml(res, {
          allowDangerousHtml: true,
        });
      };
    },
  });
  cfg.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);

  cfg.addExtension("mdx", {
    async compile(str, inputPath) {
      const { default: mdxContent } = await mdx.evaluate(str, {
        ...jsxRuntime,
        baseUrl: pathToFileURL(inputPath),
        development: process.env.CONTEXT === "development",
        elementAttributeNameCase: "html",
      });

      return async function (data) {
        const res = await mdxContent.call(this, data);
        rehypeSlug({
          slugify: slugifyKramdown,
        })(res);
        return toHtml(res, {
          allowDangerousHtml: true,
        });
      };
    },
  });
  cfg.addTemplateFormats("mdx");
  
  cfg.addShortcode("featuredVideo", (videoId) => {
    if (!videoId) return '';

    return `
      <div class="featured-video-wrapper">
        <div class="featured-video-facade" 
            id="youtube-${videoId}"
            style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; cursor: pointer;"
            onclick="
              const iframe = document.createElement('iframe');
              iframe.setAttribute('src', 'https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1');
              iframe.setAttribute('title', 'Featured Video');
              iframe.setAttribute('frameborder', '0');
              iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
              iframe.setAttribute('allowfullscreen', 'true');
              iframe.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;');
              this.innerHTML = '';
              this.appendChild(iframe);
            ">
          <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
            alt="Featured Video Thumbnail" 
            style="position: absolute; top: 0; left: 0; right: 0; width: 100%; max-width: 100%; height: 100%; object-fit: cover; opacity: 0.85;"
            onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg';">
          <div class="play-button" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(30, 30, 30, 0.9); border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: white;"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <style>
        .featured-video-facade:hover .play-button { background: #FF0000 !important; }
      </style>
    `;
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

        let data;
        try {
          data = YAML.parse(await req.text());
        } catch (error) {
          console.error(`Failed to fetch remote data from ${x.url}`, error);
        }

        console.log(`Fetched: ${x.data} from ${x.url}`);

        cfg.addGlobalData(x.data, data);
      })(),
    );
  await Promise.all(deferred);

  cfg.addGlobalData(
    "jekyll.environment",
    process.env.CONTEXT === "production" ? "production" : "development",
  );
  cfg.addGlobalData("eleventyComputed.site", () => (data) => ({
    ...data.collections, // todo(maximsmol): fix in source code
    ...site,
    time: new Date(),
    data: {
      chapters: data.chapters,
      press: data.press,
      workplaces: data.workplaces,
      ...Object.fromEntries(remoteDataSrcs.map((x) => [x.data, data[x.data]])),
    },
  }));
};

// todo(maximsmol): fix canonicals
// todo(maximsmol): fix some quotation marks not getting smarty-panted
