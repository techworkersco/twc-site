import { readFile } from "node:fs/promises";
import { type Site } from "../types.ts";

import icons from "../src/lucide.ts";
import { inlineSvg, PAIcon } from "../src/icons.ts";

export const data = {
  layout: "base.11ty.tsx",
};

const navigation = {
  footer: [
    { text: "Join", href: "/subscribe", icon: icons.UserPlus },
    { text: "Chapters", href: "/chapters", icon: icons.UserGroup },
    { text: "Press Mentions", href: "/press", icon: icons.Newspaper },
    { text: "Events", href: "/events", icon: icons.CalendarDays },
    {
      text: "Community Guide",
      href: "/community-guide",
      icon: icons.Scale,
    },
    {
      text: "Security Tips",
      href: "/security",
      icon: icons.ShieldKeyhole,
    },
    {
      text: "Job Board",
      href: "/job-board",
      icon: icons.BriefcaseBusiness,
    },
    {
      text: "Contact Us",
      href: "/contact-us",
      icon: icons.Mail,
    },
  ],
};

export const render = async function ({
  content,
  site,
  pageTitle,
  title,
}: {
  content: string;
  site: Site;
  pageTitle?: string;
  title: string;
}) {
  const nav = (
    <nav class="monospace">
      <ul>
        {/*<li>
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
        </li>*/}

        <li>
          <a href="/blog" class="button">
            Blog
          </a>
        </li>
        <li>
          <a href="/events" class="button">
            Events
          </a>
        </li>
        <li>
          <a href="/chapters" class="button">
            Chapters
          </a>
        </li>
        <li>
          <a href="/press" class="button">
            Press
          </a>
        </li>
        <li>
          <a href="/subscribe" class="button framed">
            Join
          </a>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <header>
        <div class="banner">
          <a class="plain" href="/circuit-breakers/">
            The <strong>CIRCUIT BREAKERS</strong> conference is coming up in
            <strong> NYC on October 17-18 2026.</strong> By and for tech labor
            organizing.
          </a>
        </div>
        <div>
          <div class="contents">
            <a href="/" class="h1 plain">
              {await inlineSvg("site-logo")}
              <span>
                Tech&nbsp;Workers
                <br />
                Coalition
              </span>
            </a>
            <div class="pushdown" />
            <details>
              <summary>{icons.Menu}</summary>

              {nav}
            </details>
            {nav}
          </div>
        </div>
      </header>
      {{ type: "raw", value: content }}
      <div style="flex-grow: 1;" />
      <footer>
        <nav>
          <ul class="contents">
            {await Promise.all(
              navigation.footer.map(async ({ href, text, icon }) => (
                <li>
                  <a href={href} class="button">
                    {icon}
                    {text}
                  </a>
                </li>
              )),
            )}
          </ul>
        </nav>
      </footer>
    </>
  );
};
