import { readFile } from "node:fs/promises";

import browserslist from "browserslist";
import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";
import * as lightningcss from "lightningcss";
import type markdownIt from "markdown-it";

import { Page, Site } from "../types.ts";
import { nmap } from "../utils.ts";

const header_links = [
  { url: "/subscribe", text: "Join" },
  { url: "/events", text: "Events" },
  { url: "/chapters", text: "Chapters" },
];

const links = [
  { url: "/subscribe", text: "Join" },
  { url: "/events", text: "Events" },
  { url: "/blog", text: "Blog" },
  { url: "/chapters", text: "Chapters" },
  { url: "/community-guide", text: "Community Guide" },
  { url: "/job-board", text: "Union Job Board" },
  { url: "/press", text: "Press mentions" },
  { url: "/security", text: "Security Tips" },
  { url: "https://www.youtube.com/@techworkerscoalitionvideos", text: "YouTube" },
];

const renderCss = async () => {
  const res = lightningcss.transform({
    code: Buffer.concat([
      await readFile("_includes/normalize.css"),
      await readFile("_includes/main.css"),
    ]),
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

const getLinkProps = (url: string) => {
  const isExternal = url.includes("youtube.com") || url.startsWith("http");
  
  if (isExternal) {
    return {
      target: "_blank",
      rel: "noopener noreferrer",
      ariaLabel: "Opens in a new tab"
    };
  }
  
  return {}; // Return nothing for internal links
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
      { type: "doctype" },
      { type: "text", value: "\n" },
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title ?? site.title}</title>
          {/* The page supports both dark and light color schemes,
          and the page author prefers dark. */}
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
                "https://www.youtube.com",
                "https://www.youtube-nocookie.com",
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

          <style>{await renderCss()}</style>
          <link rel="canonical" href={canonicalUrl.href} />
          <link
            rel="shortcut icon"
            href="/assets/favicon.png"
            type="image/x-icon"
          />
          <link rel="icon" href="/assets/favicon.png" type="image/x-icon" />
        </head>
        <body class="primaryBg textColor">
          <header role="banner">
            <div id="circuit-breakers">
              <div class="content">
                <a href="/circuit-breakers/">
                  The <strong>CIRCUIT BREAKERS</strong> conference is coming up in
                  <strong> NYC on October 17-18 2026.</strong> By and for tech
                  labor organizing.
                </a>
              </div>
            </div>
            <div class="nav-header contain flex flex-row ai-ctr justify-between">
              <div class="flex flex-row ai-ctr">
                <img
                  alt="TWC logo"
                  aria-hidden="true"
                  role="presentation"
                  class="marg-r-2 m:hide"
                  height="30"
                  src="/assets/img/logo.svg"
                  width="30"
                  id="logo-header"
                />
                <h1 class="title">
                  <a href="/">
                    Tech <span class="black">Workers</span> Coalition
                  </a>
                </h1>
              </div>

              <div class="flex flex-row ai-ctr">
                <div class="flex flex-row ai-ctr rel marg-r-2">
                  {header_links.map((x) => (
                    <a href={x.url}>
                      <li class="desktop-header">{x.text}</li>
                    </a>
                  ))}

                  <div class="flex flex-row ai-ctr rel">
                    <button
                      class="flex"
                      id="navBtn"
                      role="button"
                      aria-label="Open menu links"
                    >
                      <svg
                        aria-hidden="true"
                        class="primarySvgFill"
                        height="23"
                        width="20"
                        fill="#fff"
                        xmlns="https://www.w3.org/2000/svg"
                        xmlns:xlink="https://www.w3.org/1999/xlink"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        style="enable-background:new 0 0 100 100;"
                        xml:space="preserve"
                      >
                        <path d="M85.5,81.5h-70c-2.8,0-5-2.2-5-5v-4c0-2.8,2.2-5,5-5h70c2.8,0,5,2.2,5,5v4C90.5,79.3,88.3,81.5,85.5,81.5z   M85.5,57.5h-70c-2.8,0-5-2.2-5-5v-4c0-2.8,2.2-5,5-5h70c2.8,0,5,2.2,5,5v4C90.5,55.3,88.3,57.5,85.5,57.5z M85.5,33.5h-70  c-2.8,0-5-2.2-5-5v-4c0-2.8,2.2-5,5-5h70c2.8,0,5,2.2,5,5v4C90.5,31.3,88.3,33.5,85.5,33.5z"></path>
                      </svg>
                    </button>

                    <ul
                      id="nav"
                      class="navOverlay abs hide list-style-none"
                      role="navigation"
                    >
                      {links.map((x) => (
                        <li>
                          <a href={x.url} {...getLinkProps(x.url)}>{x.text}
                            {x.url.includes("youtube") ? (
                              <svg
                                role="img"
                                aria-hidden="true"
                                focusable="false"
                                class="primarySvgFill"
                                height="16"
                                width="16"
                                xmlns="https://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="1.4"
                              >
                                <path d="M14 2.7L8.4 8.4a.5.5 0 01-.8-.8L13.3 2H9.5a.5.5 0 010-1h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.7zM5 3H2.5C1.7 3 1 3.7 1 4.5v9c0 .8.7 1.5 1.5 1.5h9a1.5 1.5 0 001.5-1.5V11a.5.5 0 00-1 0v2.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9c0-.3.2-.5.5-.5H5a.5.5 0 000-1z" fill-rule="nonzero"/>
                              </svg>
                            ) : null}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main class="contain grow-main">
            {{ type: "raw", value: content }}
          </main>
          <footer class="secondaryBg">
            <div class="contain">
              <img
                alt=""
                role="presentation"
                aria-hidden="true"
                class="marg-b-2"
                height="40"
                src="/assets/img/logo.svg"
                width="40"
                id="logo-footer"
              />
              <ul class="d:flex flex-wrap d:flex-row list-style-none">
                {links.map((x) => (
                  <li class="d:c-1/3 marg-b-3 d:marg-r-3">
                    <a href={x.url} {...getLinkProps(x.url)}>{x.text}
                      {x.url.includes("youtube") ? (
                        <svg
                          role="img"
                          aria-hidden="true"
                          focusable="false"
                          class="primarySvgFill"
                          height="16"
                          width="16"
                          xmlns="https://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="1.4"
                        >
                          <path d="M14 2.7L8.4 8.4a.5.5 0 01-.8-.8L13.3 2H9.5a.5.5 0 010-1h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.7zM5 3H2.5C1.7 3 1 3.7 1 4.5v9c0 .8.7 1.5 1.5 1.5h9a1.5 1.5 0 001.5-1.5V11a.5.5 0 00-1 0v2.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9c0-.3.2-.5.5-.5H5a.5.5 0 000-1z" fill-rule="nonzero"/>
                        </svg>
                      ) : null}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/contact-us">Contact Us</a>
                </li>
              </ul>
            </div>
          </footer>

          <script src="/assets/js/main.js"></script>
        </body>
      </html>,
    ],
  };
};
