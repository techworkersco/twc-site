import {readFile} from "node:fs/promises";

import browserslist from "browserslist";
import {fromHtml} from "hast-util-from-html";
import {toText} from "hast-util-to-text";
import * as lightningcss from "lightningcss";
import type markdownIt from "markdown-it";

import {Page, Site} from "../types.ts";
import {nmap} from "../utils.ts";

const renderCss = async () => {
  const res = lightningcss.transform({
    code: Buffer.concat([await readFile("_includes/new.css")]),
    filename: "<inline>",
    minify: true,
    sourceMap: process.env["CONTEXT"] === "development",
    drafts: {
      customMedia: true,
    },
    targets: lightningcss.browserslistToTargets(browserslist()),
  });
  if (res.warnings.length > 0) {
    console.warn("Lightning CSS warnings:");
    for (const x of res.warnings) console.warn(x);
  }
  // todo(maximsmol): does this to track dependencies on the CSS files somehow?

  return Buffer.from(res.code).toString();
};

export const render = async ({
  md,
  content,
  title,
  site,
  page,
}: {
  md: markdownIt;
  content: string;
  title?: string;
  site: Site;
  page: Page;
}) => {
  // todo(maximsmol): switch to hast-based excerpts to avoid having to re-render the text
  // and relying on it being markdown
  const descriptionRaw =
    nmap(page.excerpt, (x) => md.render(x)) ?? site.description;
  const descriptionAst = fromHtml(descriptionRaw);
  let description = toText(descriptionAst).replaceAll(/\s+/g, " ").trim();
  if (description.length > 160)
    description = description.slice(0, 159).trimEnd() + "…";

  const canonicalUrl = new URL(
    page.url.replaceAll(/index.html$/g, ""),
    site.url,
  );

  return {
    type: "root",
    children: [
      {type: "doctype"},
      {type: "text", value: "\n"},
      <html lang="en-US">
        {/* see https://rviscomi.github.io/capo.js/ */}
        <head>
          {/* todo(maximsmol): make sure we set the CSP header */}
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>{typeof title !== undefined && title ? `${title} | ${site.title}` : site.title}</title>
          {/* The page supports both dark and light color schemes, and the page author prefers dark. */}
          <meta name="color-scheme" content="dark light" />
          {/* todo(maximsmol): make sure all blog and event pages have non-default descriptions */}
          <meta name="description" content={description} />
          <meta
            http-equiv="Content-Security-Policy"
            content={Object.entries({
              "base-uri": ["'none'"],
              "connect-src": [
                "'self'",
                "https://www.googleapis.com",
                "https://actionnetwork.org",
              ],
              "default-src": ["'none'"],
              "frame-src": [
                "https://airtable.com",
                "https://calendar.google.com",
                "https://app.netlify.com",
                "https://dev.techworkerscoalition.org",
              ],
              "font-src": ["'self'"],
              "img-src": [
                "'self'",
                "http://localhost:*",
                "http://127.0.0.1:*",
                "https:",
                "data:",
              ],
              "object-src": ["https://actionnetwork.org"],
              "script-src": [
                "'self'",
                "https://actionnetwork.org",
                "'unsafe-inline'",
                "'unsafe-eval'",
              ],
              "style-src": [
                "'self'",
                "https://actionnetwork.org",
                "'unsafe-inline'",
              ],
            })
              .map(([k, v]) => `${k} ${v.join(" ")}`)
              .join(";\n")}
          />
          <style>{await renderCss()}</style>
          <link
            rel="alternate"
            type="application/atom+xml"
            href="/feed/blog.xml"
            title="Blog posts"
          />

          <link
            rel="alternate"
            type="application/atom+xml"
            href="/feed/events.xml"
            title="Events"
          />
          <link
            rel="me"
            href="https://union.place/@techworkersco"
          />

          <link rel="canonical" href={canonicalUrl.href} />
          <link
            rel="shortcut icon"
            href="/assets/favicon.png"
            type="image/x-icon"
          />
          <link rel="icon" href="/assets/favicon.png" type="image/x-icon" />

          {/* todo(maximsmol): theme-color */}
          {/* <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" /> */}
          {/* <meta name="theme-color" content="#090035" media="(prefers-color-scheme: dark)" /> */}

          {/* todo(maximsmol): canonical? */}

          {/* todo(maximsmol): check favicon.ico */}
          {/* todo(maximsmol): svg favicon */}
          {/* todo(maximsmol): svg favicon dark mode */}
          {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
          {/* todo(maximsmol): apple touch icon? */}

          {/* todo(maximsmol): Atom feeds */}

          {/* todo(maximsmol): OpenGraph */}
          {/* <meta name="twitter:card" content="summary_large_image"> */}
          {/* todo(maximsmol): JSON-LD */}
          {/* todo(maximsmol): WebMention? */}
        </head>
        <body>
          {{type: "raw", value: content}}
        </body>
      </html>,
    ],
  };
};
