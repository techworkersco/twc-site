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
  const nav = (
    <nav class="monospace">
      <ul>
        <li>
          <a href="/about" class="button">
            About Us
          </a>
        </li>
        <li>
          <a href="/blog" class="button">
            Blog
          </a>
        </li>
        <li>
          <a href="/resources" class="button">
            Resources
          </a>
        </li>
        <li>
          <a href="/newsletter" class="button">
            Newsletter
          </a>
        </li>
        <li>
          <a href="/donate" class="button framed">
            Donate
          </a>
        </li>
      </ul>
    </nav>
  );

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
          <div class="header-padding">
            <header>
              <h1>
                <svg
                  alt=""
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  class="logo"
                >
                  <path d="M94.44,261.32v-102.21h-20.44v-20.44h61.32v20.44h-20.44v102.21h-20.44Z" />
                  <path d="M148.9,261.32v-122.65h20.44v102.21h20.44v-102.21h20.44v102.21h20.44v-102.21h20.44v122.65h-102.21Z" />
                  <path d="M264.68,261.32v-122.65h61.32v40.88h-20.44v-20.44h-20.44v81.76h20.44v-20.44h20.44v40.88h-61.32Z" />
                  <path d="M200,387.25c-103.25,0-187.25-84-187.25-187.25S96.75,12.75,200,12.75s187.25,84,187.25,187.25-84,187.25-187.25,187.25ZM200,22.77C102.27,22.77,22.77,102.27,22.77,200s79.51,177.23,177.23,177.23,177.23-79.51,177.23-177.23S297.73,22.77,200,22.77Z" />
                  <path d="M260.09,305.49c-2.06,6.68-8.3,11.54-15.64,11.54s-13.57-4.86-15.64-11.52c-2.49,0-23.24.02-23.24.02l-43.13,73.62-8.63-5.05,46.08-78.52,29-.04c2.21-6.82,8.56-11.25,15.55-11.25s13.38,4.71,15.54,11.22l89.28-.02v10h-89.18ZM244.45,294.3c-3.51,0-6.37,2.86-6.37,6.37s2.86,6.37,6.37,6.37,6.37-2.86,6.37-6.37-2.86-6.37-6.37-6.37Z" />
                  <path d="M146.9,318.09c-4.89-4.99-6.21-12.78-2.72-19.25,4.29-7.94,14.24-10.91,22.18-6.62s10.91,14.24,6.62,22.18c-3.43,6.36-10.5,9.53-17.26,8.34l-26.22,45.36-8.8-4.75M164.18,309.64c1.67-3.09.51-6.96-2.58-8.63s-6.96-.51-8.63,2.58-.51,6.96,2.58,8.63c3.09,1.67,6.96.51,8.63-2.58Z" />
                  <path d="M199.84,362.72c-4.89-4.99-6.21-12.78-2.72-19.25,4.29-7.94,14.24-10.91,22.18-6.62s10.91,14.24,6.62,22.18c-3.43,6.36-10.5,9.53-17.26,8.34l-9.56,16.86-8.8-4.75M217.12,354.28c1.67-3.09.51-6.96-2.58-8.63s-6.96-.51-8.63,2.58-.51,6.96,2.58,8.63,6.96.51,8.63-2.58Z" />
                  <path d="M139.13,95.65c2.06-6.68,8.3-11.54,15.64-11.54s13.57,4.86,15.64,11.52c2.49,0,23.24-.02,23.24-.02l43.13-73.62,8.63,5.05-46.08,78.52-29,.04c-2.21,6.82-8.56,11.25-15.55,11.25s-13.38-4.71-15.54-11.22l-91.94.02v-10M154.77,106.84c3.51,0,6.37-2.86,6.37-6.37s-2.86-6.37-6.37-6.37-6.37,2.86-6.37,6.37,2.86,6.37,6.37,6.37Z" />
                  <path d="M252.32,83.05c4.89,4.99,6.21,12.78,2.72,19.25-4.29,7.94-14.24,10.91-22.18,6.62-7.94-4.29-10.91-14.24-6.62-22.18,3.43-6.36,10.5-9.53,17.26-8.34l26.22-45.36,8.8,4.75M235.04,91.5c-1.67,3.09-.51,6.96,2.58,8.63s6.96.51,8.63-2.58.51-6.96-2.58-8.63-6.96-.51-8.63,2.58Z" />
                  <path d="M199.38,38.42c4.89,4.99,6.21,12.78,2.72,19.25-4.29,7.94-14.24,10.91-22.18,6.62s-10.91-14.24-6.62-22.18c3.43-6.36,10.5-9.53,17.26-8.34l9.56-16.86,8.8,4.75M182.1,46.86c-1.67,3.09-.51,6.96,2.58,8.63s6.96.51,8.63-2.58c1.67-3.09.51-6.96-2.58-8.63s-6.96-.51-8.63,2.58Z" />
                </svg>
                <span>
                  Tech&nbsp;Workers
                  <br />
                  Coalition
                </span>
              </h1>
              <details>
                <summary>
                  {/* lucide-menu */}
                  <svg
                    alt="Navigation"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M4 5h16" />
                    <path d="M4 12h16" />
                    <path d="M4 19h16" />
                  </svg>
                </summary>

                {nav}
              </details>
              {nav}
            </header>
          </div>
          <main>
            <div class="banner">
              <img src="/assets/img/header.jpg" alt="" />
            </div>
            <article class="hero">
              <h2>
                {{
                  type: "raw",
                  value: await readFile("assets/img/decor/chip.svg"),
                }}
                <div class="title">
                  <div>
                    Worker <span class="red">Power</span>
                  </div>
                  <div class="h4">In the Tech Industry</div>
                </div>
                <div class="icon-lines red">
                  <div>
                    {/* see https://pixelarticons.com/ */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 3h6v2H5zm8 10h6v2h-6zM5 5h2v4H5zm8 10h2v4h-2zM9 5h2v4H9zm8 10h2v4h-2zM5 9h6v2H5zm8 10h6v2h-6zm0-16h4v2h-4zM5 13h4v2H5zm10-8h2v4h-2zM7 15h2v4H7zm6-6h6v2h-6zM5 19h6v2H5z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 10h7v2h2v-2h7V6h2v13h-9v-5h-2v5H2V6h2v4Zm2 6h2v-2H6v2Zm11 0h2v-2h-2v2ZM4 14h2v-2H4v2Zm11 0h2v-2h-2v2ZM6 6H4V4h2v2Zm14 0h-2V4h2v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 13h8v6h2v2h-2v2h-2v-8H2v-4h2v2Zm12 6h-2v-2h2v2Zm2-2h-2v-2h2v2Zm2-2h-2v-2h2v2Zm-6-6h8v4h-2v-2h-8V5h-2V3h2V1h2v8Zm-8 2H4V9h2v2Zm2-2H6V7h2v2Zm2-2H8V5h2v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 21H5v-2h14v2ZM5 19H3v-4H1v-2h2V9h2v10Zm16-6h2v2h-2v4h-2V9h2v4Zm-11 3H8v-4h2v4Zm6 0h-2v-4h2v4Zm-3-9h6v2H5V7h6V5h2v2Zm-2-2H7V3h4v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 22h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 16H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 14H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 12H1V6h2v6Zm20 0h-2V6h2v6ZM13 8h-2V6h2v2ZM5 6H3V4h2v2Zm6 0H9V4h2v2Zm4 0h-2V4h2v2Zm6 0h-2V4h2v2ZM9 4H5V2h4v2Zm10 0h-4V2h4v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 21h-2v2h-2v-2h-2v2h-2v-2H9v2H7v-2H5v-2h14v2ZM5 19H3v-2H1v-2h2v-2H1v-2h2V9H1V7h2V5h2v14ZM21 7h2v2h-2v2h2v2h-2v2h2v2h-2v2h-2V5h2v2Zm-4 10H7V7h10v10Zm-8-2h6V9H9v6ZM9 3h2V1h2v2h2V1h2v2h2v2H5V3h2V1h2v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 16h2v4h2v2H7v-2h2v-4h2v-2h2v2Zm-6 4H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 18H3v-8h2v8Zm16 0h-2v-6h2v6Zm-6-6h-2v-2h2v2Zm4 0h-2v-2h2v2ZM7 10H5V8h2v2Zm6 0h-2V6h2v4Zm4 0h-2V8h2v2ZM9 8H7V6h2v2Zm2-2H9V2h2v4Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 12v8h2v-8H4Zm16 8h-2v-4h2v4Zm2-4h-2v-4h2v4Zm-6-6h4v2h-6V8h2v2Zm-6 0H8V8h2v2Zm2-2h-2V6h2v2Zm6 0h-2V4h2v4Zm-4-2h-2V4h2v2Zm2-2h-2V2h2v2ZM8 20h10v2H2V10h6v10Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 22h-4v-2h4v2Zm-4-2H8v-2h2v2Zm6 0h-2v-2h2v2Zm-8-2H6v-2h2v2Zm10 0h-2v-2h2v2Zm-5-1h-2v-2h2v2Zm-7-1H4v-2h2v2Zm14 0h-2v-2h2v2ZM4 14H2v-4h2v4Zm18 0h-2v-4h2v4Zm-9-7v6h-2V7h2Zm-7 3H4V8h2v2Zm14 0h-2V8h2v2ZM8 8H6V6h2v2Zm10 0h-2V6h2v2Zm-8-2H8V4h2v2Zm6 0h-2V4h2v2Zm-2-2h-4V2h4v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 20v-6H8v6h8Zm-4-10H6V6h6v4Zm8-4h-2V4h2v2Zm0 14V6h2v16H2V2h16v2H4v16h2v-8h12v8h2Z" />
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 22H2V2h20v20ZM4 20h16V4H4v16Zm5-3H7v-2h2v2Zm4 0h-2v-4h2v4Zm4 0h-2v-6h2v6Zm-6-4H7v-2h4v2Zm4-2h-2V9h2v2Zm-2-2H7V7h6v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 22h-2v-2h2v2Zm-2-2h-2v-2h2v2Zm-6-2H6v-2h8v2Zm4 0h-2v-2h2v2ZM6 16H4v-2h2v2Zm10 0h-2v-2h2v2ZM4 14H2V6h2v8Zm7-5h3v2h-3v3H9v-3H6V9h3V6h2v3Zm7 5h-2V6h2v8ZM6 6H4V4h2v2Zm10 0h-2V4h2v2Zm-2-2H6V2h8v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 17v2h2v-2h-2Zm-7-2h16V5H4v10Zm11 4h3v2H6v-2h3v-2H2V3h20v14h-7v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 19H5v-2h2v2Zm12 0h-2v-2h2v2ZM9 15v2H7v-2h2Zm8 2h-2v-2h2v2Zm-6-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-2-2h-2v-2h2v2Zm-2-2H9V9h2v2Zm4 0h-2V9h2v2ZM9 9H7V7h2v2Zm8 0h-2V7h2v2ZM7 7H5V5h2v2Zm12 0h-2V5h2v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 22H4v-2h2v2Zm14 0h-3v-2h3v2Zm-3-2h-2v-3h2v3Zm5 0h-2v-3h2v3ZM6 18H4v-4h2v4Zm14-1h-3v-2h3v2Zm-5-3H6v-2h9v2Zm2-10h2v2h2v2h-4v4h-2V8h-4V6h2V4h2V2h2v2ZM4 8H2V6h2v2Zm4 0H6V6h2v2ZM6 6H4V4h2v2ZM4 4H2V2h2v2Zm4 0H6V2h2v2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 22h-2v-2h2v2Zm-2-2h-2v-2h2v2Zm4 0h-2v-4h2v4Zm-6-2h-2v-2h2v2Zm-2-2H8v-2h2v2Zm10-2h-4v2h-2v-4h6v2ZM4 4v8h2V4H4Zm18 8h-2V8h2v4Zm-2-4h-2V4h2v4ZM8 14H2V2h16v2H8v10Z" />
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2 5h2v4H2zm20 0h-2v4h2zM4 9h2v2H4zm16 0h-2v2h2zM2 13h4v2H2zm20 0h-4v2h4zM4 17h2v2H4zm16 0h-2v2h2zM2 19h2v2H2zm20 0h-2v2h2zM6 11h12v2H6z" />
                      <path d="M6 7h2v12H6zm10 0h2v12h-2zM8 19h8v2H8zM8 5h8v2H8z" />
                      <path d="M11 15h2v6h-2zM8 1h2v6H8zm6 0h2v6h-2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 4h6v2H3zm18 0h-6v2h6zM3 20h6v-2H3zm18 0h-6v-2h6zM3 6h2v5H3zm18 0h-2v5h2zM3 18h2v-5H3zm18 0h-2v-5h2zM1 11h2v2H1zm10 0h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2zm8 0h-2v2h2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5h2v2H8V5ZM6 7h2v2H6V7ZM4 9h2v2H4V9Zm-2 2h2v2H2v-2Zm2 2h2v2H4v-2Zm2 2h2v2H6v-2Zm2 2h2v2H8v-2Zm8-12h-2v2h2V5Zm2 2h-2v2h2V7Zm2 2h-2v2h2V9Zm2 2h-2v2h2v-2Zm-2 2h-2v2h2v-2Zm-2 2h-2v2h2v-2Zm-2 2h-2v2h2v-2Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 12h-2v8h2v2h-4V10h4v2Zm6 8h-6v-2h4v-2h2v4Zm-2-4h-2v-2h2v2Zm-2-2h-2v-2h2v2Zm4-2h-2V4H4v16h6v2H2V2h20v10Z" />
                    </svg>
                  </div>
                </div>
              </h2>
              <hr />
              {/* todo(maximsmol): smarty-pants this */}
              <ul class="cards">
                <li>
                  <section>
                    <h3 class="h5">Vision & Values:</h3>
                    <p>
                      Guided by our vision for an inclusive and equitable tech
                      industry, TWC organizes to build worker power through rank
                      and file self-organization and education.
                    </p>
                  </section>
                </li>
                <li>
                  <section>
                    <h3 class="h5">Who We Are:</h3>
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
                    <h3 class="h5">How We Operate:</h3>
                    <p>
                      We're democratically structured, all-volunteer, and
                      worker-led organization.
                    </p>
                  </section>
                </li>
              </ul>
              <section class="cta">
                <a href="/chapters" class="button monospace">
                  <u>Find a Local Chapter</u>
                </a>
                {/* lucide */}
                <a href="/get-involved" class="button framed">
                  Get Involved
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
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
