import { readFile } from "node:fs/promises";
import {Navigation, type Site} from "../types.ts";

export const data = {
  layout: "base.11ty.tsx",
};

export const render = async function ({
  content,
  site,
  navigation,
  pageTitle,
  title,
}: {
    content: string;
    site: Site;
    navigation: Navigation;
    pageTitle?: string;
    title: string;
  }) {
  const ctaNavLink = navigation.main.filter((item) => item?.cta);
  const heroIconNames = [
    'binary-sharp',
    'sunglasses-sharp',
    'zap',
    'robot',
    'heart',
    'cpu-sharp',
    'fire',
    'thumbs-up-sharp',
    'warning-diamond',
    'rss-square-sharp',
    'zoom-in',
    'tv-sharp',
    'close',
    'directions',
    'thumbs-down-sharp',
    'bug',
    'braces-content-sharp',
    'brackets-angle',
    'square-cursor-sharp',
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
            {await this.inlineSvg('site-logo')}
            <span>{site.title}</span>
          </a>
          {
            navigation?.main && navigation.main.length > 0
            && <nav aria-label="site" class="site-nav">
              <ul role="list">
                {navigation.main.map((item) => (
                  !item?.cta
                  && <li>
                    <a href={item.slug}>
                      {item.text}
                    </a>
                  </li>
                ))}
                </ul>
                {
                  ctaNavLink.length > 0
                  && ctaNavLink.map((item) => (
                    <a href={item.slug} class="framed">
                      {item.text}
                    </a>
                  ))
              }
            </nav>
          }
        </div>
      </header>
      <main>
        <div class="hero-banner">
          {/* @todo change to picture el with cropped sizes */}
          <img src="/assets/img/hero-banner.jpg" alt="" />
        </div>
        {
          !content.includes('<h1')
          && <div class="hero">
            <div class="hero-container">
              <h1>
                {/* @todo find a better way to work with svgs */}
                  <span class="box-icon">
                    {await this.inlineSvg('chip')}
                  </span>

                  <span class="heading-text">
                    {pageTitle ?? title}
                  </span>
                </h1>
                {/* see https://pixelarticons.com/ */}
                <div class="icon-lines" aria-hidden="true">
                  <div class="icon-line">
                    {await this.inlineSvg(iconLines[0])}
                  </div>
                  <div class="icon-line">
                    {await this.inlineSvg(iconLines[1])}
                  </div>
                  <div class="icon-line">
                    {await this.inlineSvg(iconLines[2])}
                  </div>
                </div>
              </div>
            </div>
        }
        {{type: "raw", value: content}}
      </main>
      <footer class="site-footer">
        <div class="site-footer-inner">
          <ul role="list" class="footer-links">
            {navigation.footer.map((item) => (
              <li>
                <a href={item.slug}>
                  {/* @todo uncomment this once all the svg files have been added */}
                  {/* {this.inlineSvg(`pixel-art-icons/${item.iconName}`)} */}
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
};
