import { JSX } from "hastscript/jsx-runtime";

import { Chapter, Data } from "./types.ts";
import { makeAriaId } from "./utils.ts";

import icons from "./src/lucide.ts";
import siIcons from "./src/simple-icons.ts";

export const data = {
  title: "Join a Chapter",
};

type ChaptersByLocality = Record<Chapter["locality"], Chapter[]>;

// todo(maximsmol): the Seattle chapter doesn't render right on mobile for some reason
export const render = ({ chapters }: Data) => {
  const active: ChaptersByLocality = {
    north_america: [],
    europe: [],
    asia: [],
  };
  const inactive: ChaptersByLocality = structuredClone(active);

  chapters.sort((a, b) => a.text.localeCompare(b.text));

  for (const x of chapters)
    if (x.active) active[x.locality].push(x);
    else inactive[x.locality].push(x);

  const renderChapter = (x: Chapter) => {
    // icons on this page are CC0 https://simpleicons.org/
    // todo(maximsmol): get these from npm?
    const links: JSX.Element[] = [];

    if (x.telegram != null)
      links.push(
        <li>
          <a href={`https://t.me/${x.telegram}`}>{siIcons.siTelegram}</a>
        </li>,
      );

    if (x.mastodon != null)
      links.push(
        <li>
          <a href={x.mastodon}>{siIcons.siMastodon}</a>
        </li>,
      );

    if (x.calendar != null)
      links.push(
        <li>
          <a href={x.calendar}>{icons.Calendar1}</a>
        </li>,
      );
    if (x.bluesky != null)
      links.push(
        <li>
          <a href={`https://bsky.app/profile/${x.bluesky}`}>
            {siIcons.siBluesky}
          </a>
        </li>,
      );

    if (x.email != null)
      links.push(
        <li>
          <a href={`mailto:${x.email}`}>{icons.Mail}</a>
        </li>,
      );

    if (x.youtube != null)
      links.push(
        <li>
          <a href={`https://youtube.com/@${x.youtube}`}>{siIcons.siYoutube}</a>
        </li>,
      );

    if (x.instagram != null)
      links.push(
        <li>
          <a href={`https://www.instagram.com/${x.instagram}`}>
            {siIcons.siInstagram}
          </a>
        </li>,
      );

    if (x.facebook != null)
      links.push(
        <li>
          <a href={`https://www.facebook.com/${x.facebook}`}>
            {siIcons.siFacebook}
          </a>
        </li>,
      );

    if (x.twitter != null)
      links.push(
        <li>
          <a href={`https://twitter.com/${x.twitter}`}>{siIcons.Twitter}</a>
        </li>,
      );

    const titleId = makeAriaId();

    return (
      <li>
        <section>
          <a href={x.url ?? x.twitter ?? x.facebook} class="header">
            <section>
              <h3>
                {/*<span aria-hidden>{x.icon} </span>*/}
                {x.text}
              </h3>
              <p class="details">
                {x.active ? (
                  x.established != null ? (
                    `Active since ${x.established}`
                  ) : (
                    "Active"
                  )
                ) : (
                  <em>Inactive</em>
                )}
              </p>
            </section>
            <div class="image">
              <img
                class={
                  (x.image?.endsWith(".svg") ?? true)
                    ? "twc-svg-logo"
                    : undefined
                }
                src={x.image ?? "/assets/chapters/generic.svg"}
              />
            </div>
          </a>
          <ul class="quick-links" aria-label="Social media links">
            {links}
          </ul>
        </section>
      </li>
    );
  };

  const renderLocalities = (xs: ChaptersByLocality) => {
    return (
      <div class="region-group">
        <section>
          <h2 class="h4">North America</h2>
          <ul aria-label="Chapters" class="list">
            {xs.north_america.map(renderChapter)}
          </ul>
        </section>
        <section>
          <h2 class="h4">Europe</h2>
          <ul aria-label="Chapters" class="list">
            {xs.europe.map(renderChapter)}
          </ul>
        </section>
        {xs.asia.length > 0 && (
          <section>
            <h2 class="h4">Asia</h2>
            <ul aria-label="Chapters" class="list">
              {xs.asia.map(renderChapter)}
            </ul>
          </section>
        )}
      </div>
    );
  };

  return (
    <main class="plain chapters-page">
      {/* todo(maximsmol): add an info blurb and/or an image for each chapter */}
      {/* todo(maximsmol): add more social links */}

      <section>
        <h1 class="h3">Active chapters</h1>
        {renderLocalities(active)}
      </section>

      <section>
        <h1 class="h3">Inactive and former chapters</h1>
        {renderLocalities(inactive)}
      </section>
    </main>
  );
};
