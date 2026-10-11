import { readFile } from "node:fs/promises";
import { Navigation, type Site } from "../types.ts";

import { JSX } from "hastscript/jsx-runtime";
import * as lucideRaw from "lucide-static";

const icons = Object.fromEntries(
  Object.entries(lucideRaw).map(([name, value]) => [
    name,
    { type: "raw", value },
  ]),
) as { [K in keyof typeof lucideRaw]: JSX.Element };

export const data = {
  layout: "base.11ty.tsx",
};

const navigation = {
  main: [
    { text: "About", href: "/about" },
    { text: "Blog", href: "/blog" },
    { text: "Resources", href: "/resources" },
    { text: "Newsletter", href: "/newsletter" },
    { text: "Donate", href: "/donate", cta: true },
  ],
  footer: [
    { text: "Join", href: "/join", icon: icons.UserPlus },
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

const PAIcon = async (icon: string) => ({
  type: "raw",
  value: (
    await readFile(`node_modules/pixelarticons/svg/${icon}.svg`)
  ).toString(),
});

const inlineSvg = async (filename) => ({
  type: "raw",
  value: (await readFile(`_includes/inline-svgs/${filename}.svg`)).toString(),
});

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
  const ctaNavLink = navigation.main.filter(({ cta = false }) => cta);
  const heroIcons = [
    "binary-sharp",
    "sunglasses-sharp",
    "zap",
    "robot",
    "heart",
    "cpu-sharp",
    "fire",
    "thumbs-up-sharp",
    "warning-diamond",
    "rss-square-sharp",
    "zoom-in",
    "tv-sharp",
    "close",
    "directions",
    "thumbs-down-sharp",
    "bug",
    "braces-content-sharp",
    "brackets-angle",
    "square-cursor-sharp",
  ];
  const iconLines = [
    heroIcons.slice(0, 10),
    heroIcons.slice(10, 16),
    heroIcons.slice(16, 20),
  ];

  return (
    <>
      <header role="banner" class="site-header">
        <div class="site-header-inner">
          <a href="/" class="site-logo-link">
            {await inlineSvg("site-logo")}
            <span>{site.title}</span>
          </a>
          {navigation?.main && navigation.main.length > 0 && (
            <nav aria-label="site" class="site-nav">
              <ul role="list">
                {navigation.main.map(
                  ({ href, text, cta = false }) =>
                    !cta && (
                      <li>
                        <a href={href}>{text}</a>
                      </li>
                    ),
                )}
              </ul>
              {ctaNavLink.length > 0 &&
                ctaNavLink.map(({ href, text }) => (
                  <a href={href} class="framed">
                    {text}
                  </a>
                ))}
            </nav>
          )}
        </div>
      </header>
      <main>
        <div class="hero-banner">
          {/* @todo change to picture el with cropped sizes */}
          <img src="/assets/img/hero-banner.jpg" alt="" />
        </div>
        {!content.includes("<h1") && (
          <div class="hero">
            <div class="hero-container">
              <h1>
                {/* @todo find a better way to work with svgs */}
                <span class="box-icon">{await inlineSvg("chip")}</span>

                <span class="heading-text">{pageTitle ?? title}</span>
              </h1>
              {/* see https://pixelarticons.com/ */}
              <div class="icon-lines" aria-hidden="true">
                {await Promise.all(
                  iconLines.map(async (line) => (
                    <div class="icon-line">
                      {await Promise.all(line.map(PAIcon))}
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>
        )}
        {{ type: "raw", value: content }}
      </main>
      <footer class="site-footer">
        <div class="site-footer-inner">
          <ul role="list" class="footer-links">
            {await Promise.all(
              navigation.footer.map(async ({ href, text, icon }) => (
                <li>
                  <a href={href}>
                    {icon}
                    {text}
                  </a>
                </li>
              )),
            )}
          </ul>
        </div>
      </footer>
    </>
  );
};
