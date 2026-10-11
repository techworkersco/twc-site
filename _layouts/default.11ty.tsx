import { readFile } from "node:fs/promises";
import { Navigation, type Site } from "../types.ts";

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
    { text: "Join", href: "/join", icon: "join" },
    { text: "Chapters", href: "/chapters", icon: "chapters" },
    { text: "Press Mentions", href: "/press", icon: "press" },
    { text: "Events", href: "/events", icon: "events" },
    {
      text: "Community Guide",
      href: "/community-guide",
      icon: "community-guide",
    },
    {
      text: "Security Tips",
      href: "/security",
      icon: "security",
    },
    {
      text: "Job Board",
      href: "/job-board",
      icon: "job-board",
    },
    {
      text: "Contact Us",
      href: "/contact-us",
      icon: "contact",
    },
  ],
};

const inlineSvg = async (filename) => {
  if (Array.isArray(filename)) {
    const arr = [];

    for (const item of filename) {
      arr.push({
        type: "raw",
        value: (await readFile(`_includes/inline-svgs/${item}.svg`)).toString(),
      });
    }

    return arr;
  }

  return {
    type: "raw",
    value: (await readFile(`_includes/inline-svgs/${filename}.svg`)).toString(),
  };
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
  const ctaNavLink = navigation.main.filter(({ cta = false }) => cta);
  const heroIconNames = [
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
  const heroIcons = heroIconNames.map((item) => `pixel-art-icons/${item}`);
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
                <div class="icon-line">{await inlineSvg(iconLines[0])}</div>
                <div class="icon-line">{await inlineSvg(iconLines[1])}</div>
                <div class="icon-line">{await inlineSvg(iconLines[2])}</div>
              </div>
            </div>
          </div>
        )}
        {{ type: "raw", value: content }}
      </main>
      <footer class="site-footer">
        <div class="site-footer-inner">
          <ul role="list" class="footer-links">
            {navigation.footer.map(({ slug, text }) => (
              <li>
                <a href={slug}>
                  {/* @todo uncomment this once all the svg files have been added */}
                  {/* {inlineSvg(`pixel-art-icons/${item.iconName}`)} */}
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
};
