import { readFile } from "node:fs/promises";

import browserslist from "browserslist";
import * as lightningcss from "lightningcss";

export const data = {
  layout: "empty.11ty.tsx",
};

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

export const render = async () => {
  return {
    type: "root",
    children: [
      { type: "doctype" },
      { type: "text", value: "\n" },
      <html lang="en-US">
        {/* see https://rviscomi.github.io/capo.js/ */}
        <head>
          {/* todo(maximsmol): make sure we set the CSP header */}
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Tech Workers Coalition</title>

          <style>{await renderCss()}</style>

          {/* todo(maximsmol): theme-color */}
          {/*<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />*/}
          <meta name="color-scheme" content="dark light" />

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
          <header>
            <h1>
              <img src="logo.svg" alt="Tech Workers Coalition" />
            </h1>
            <nav>
              <ul>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/resources">Resources</a>
                </li>
                <li>
                  <a href="/newsletter">Newsletter</a>
                </li>
                <li>
                  <a href="/donate">Donate</a>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <article>
              <img src="/assets/img/header.jpg" alt="" />
              <h2>
                <img src="decor/chip.svg" alt="" />
                <span>Worker Power</span>
                <br />
                <span>In the Tech Industry</span>
                <div>
                  <div>Decor icons line 1</div>
                  <div>Decor icons line 2</div>
                  <div>Decor icons line 3</div>
                </div>
              </h2>
              {/* todo(maximsmol): smarty-pants this */}
              <ul>
                <li>
                  <section>
                    <h3>Vision & Values:</h3>
                    <p>
                      Guided by our vision for an inclusive and equitable tech
                      industry, TWC organizes to build worker power through rank
                      and file self-organization and education.
                    </p>
                  </section>
                </li>
                <li>
                  <section>
                    <h3>Who We Are:</h3>
                    <p>
                      We are a coalition of workers in and around the tech
                      industry, labor organizers, community organizers, and
                      friends. We work in solidarity with existing movements
                      towards social justice, worker's rights, and economic
                      inclusion.
                    </p>
                  </section>
                </li>
                <li>
                  <section>
                    <h3>How We Operate:</h3>
                    <p>
                      We're democratically structured, all-volunteer, and
                      worker-led organization.
                    </p>
                  </section>
                </li>
              </ul>
              <section>
                <a href="/chapters">Find a Local Chapter</a>
                <a href="/get-involved">Get Involved</a>
              </section>
            </article>
            <article>
              <h2>
                Upcoming Events
                <a href="/events">View More</a>
              </h2>
              <ol>
                <li>
                  <article>
                    <img src="stuff.png" alt="" />
                    <h3>Bay Area: Social Meeting</h3>
                    <time datetime="2026-02-26T18:00-07:00">
                      26 February 2026 - 6:00pm PST
                    </time>
                    <p>Bay Area</p>
                  </article>
                </li>
                <li>
                  <article>
                    <img src="stuff.png" alt="" />
                    <h3>TWC Book Club: Empire of AI</h3>
                    <time datetime="2026-03-01T21:00-04:00">
                      01 March 2026 - 9:00pm ET
                    </time>
                    <p>Online</p>
                  </article>
                </li>
                <li>
                  <article>
                    <img src="stuff.png" alt="" />
                    <h3>Netherlands: Organizing Meetup</h3>
                    <time datetime="2026-03-02T17:00+01:00">
                      02 March 2026 - 5:00pm CET
                    </time>
                    <p>Netherlands</p>
                  </article>
                </li>
                <li>
                  <article>
                    <img src="stuff.png" alt="" />
                    <h3>Portland: General Meeting</h3>
                    <time datetime="2026-03-14T15:00-07:00">
                      14 March 2026 - 3:00pm PST
                    </time>
                    <p>Portland</p>
                  </article>
                </li>
              </ol>
            </article>
            <article>
              <h2>
                TWC in the Press
                <a href="/press">View More</a>
              </h2>
              <ol>
                <li>
                  <article>
                    <img src="assets/img/newspaper.svg" alt="" />
                    <h3>
                      Despite Crackdown on Activism, Tech Employees Are Still
                      Picking Fights
                    </h3>
                    <time datetime="2025-12-26">26 December 2025</time>
                    <p>New York Times</p>
                  </article>
                  <article>
                    <img src="assets/img/newspaper.svg" alt="" />
                    <h3>
                      "Grand Theft, Not Wage Theft", Rockstar Protest in NYC
                      Draws Tech Workers, Multiple Unions
                    </h3>
                    <time datetime="2025-12-08">08 December 2025</time>
                    <p>Aftermath</p>
                  </article>
                </li>
              </ol>
            </article>
          </main>
          <footer>
            <ul>
              <li>
                <a href="/join">
                  <img src="icons/join.svg" alt="" />
                  Join
                </a>
              </li>
              <li>
                <a href="/chapters">
                  <img src="icons/chapters.svg" alt="" />
                  Chapters
                </a>
              </li>
              <li>
                <a href="/press">
                  <img src="icons/press.svg" alt="" />
                  Press Mentions
                </a>
              </li>
              <li>
                <a href="/events">
                  <img src="icons/events.svg" alt="" />
                  Events
                </a>
              </li>
              <li>
                <a href="/community-guide">
                  <img src="icons/community-guide.svg" alt="" />
                  Community Guide
                </a>
              </li>
              <li>
                <a href="/security">
                  <img src="icons/security.svg" alt="" />
                  Security Tips
                </a>
              </li>
              <li>
                <a href="/job-board">
                  <img src="icons/job-board.svg" alt="" />
                  Union Job Board
                </a>
              </li>
              <li>
                <a href="/contact-us">
                  <img src="icons/contact.svg" alt="" />
                  Contact Us
                </a>
              </li>
            </ul>
          </footer>
        </body>
      </html>,
    ],
  };
};
