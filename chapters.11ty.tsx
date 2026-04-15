import { JSX } from "hastscript/jsx-runtime";

import { Chapter, Data } from "./types.ts";
import { makeAriaId } from "./utils.ts";

export const data = {
  title: "Join a Chapter",
};

type ChaptersByLocality = Record<Chapter["locality"], Chapter[]>;

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
          <a href={`https://t.me/${x.telegram}`}>
            <svg
              class="simple-icon telegram"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Telegram</title>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </li>,
      );

    if (x.mastodon != null)
      links.push(
        <li>
          <a href={x.mastodon}>
            <svg
              class="simple-icon mastodon"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mastodon</title>
              <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
            </svg>
          </a>
        </li>,
      );

    if (x.calendar != null)
      links.push(
        <li>
          <a href={x.calendar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-calendar1-icon lucide-calendar-1"
            >
              <path d="M11 14h1v4" />
              <path d="M16 2v4" />
              <path d="M3 10h18" />
              <path d="M8 2v4" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
            </svg>
          </a>
        </li>,
      );
    if (x.bluesky != null)
      links.push(
        <li>
          <a href={`https://bsky.app/profile/${x.bluesky}`}>
            <svg
              class="simple-icon bluesky"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bluesky</title>
              <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
            </svg>
          </a>
        </li>,
      );

    if (x.email != null)
      links.push(
        <li>
          <a href={`mailto:${x.email}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-mail-icon lucide-mail"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          </a>
        </li>,
      );

    if (x.youtube != null)
      links.push(
        <li>
          <a href={`https://youtube.com/@${x.youtube}`}>
            <svg
              class="simple-icon youtube"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>YouTube</title>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </li>,
      );

    if (x.instagram != null)
      links.push(
        <li>
          <a href={`https://www.instagram.com/${x.instagram}`}>
            <svg
              class="simple-icon instagram"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Instagram</title>
              <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
            </svg>
          </a>
        </li>,
      );

    if (x.facebook != null)
      links.push(
        <li>
          <a href={`https://www.facebook.com/${x.facebook}`}>
            <svg
              class="simple-icon facebook"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Facebook</title>
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
            </svg>
          </a>
        </li>,
      );

    if (x.twitter != null)
      links.push(
        <li>
          <a href={`https://twitter.com/${x.twitter}`}>
            <svg
              class="simple-icon twitter"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>X.com (Twitter)</title>
              <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
            </svg>
          </a>
        </li>,
      );

    const titleId = makeAriaId();

    return (
      <li class="card">
        <article class="content" aria-labelledby={titleId}>
          <a href={x.url ?? x.twitter ?? x.facebook} class="header">
            <section>
              <h4 id={titleId}>
                {/*<span aria-hidden>{x.icon} </span>*/}
                {x.text}
              </h4>
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
                  x.image?.endsWith(".svg") ?? true ? "twc-svg-logo" : undefined
                }
                src={x.image ?? "/assets/chapters/generic.svg"}
              />
            </div>
          </a>
          <ul class="quick-links" aria-label="Social media links">
            {links}
          </ul>
        </article>
      </li>
    );
  };

  const renderLocalities = (xs: ChaptersByLocality) => {
    const naId = makeAriaId();
    const euId = makeAriaId();
    const asiaId = makeAriaId();

    return (
      <div class="region-group">
        <article aria-labelledby={naId}>
          <h3 id={naId}>North America</h3>
          <ul aria-label="Chapters" class="list">
            {xs.north_america.map(renderChapter)}
          </ul>
        </article>
        <article aria-labelledby={euId}>
          <h3 id={euId}>Europe</h3>
          <ul aria-label="Chapters" class="list">
            {xs.europe.map(renderChapter)}
          </ul>
        </article>
        {xs.asia.length > 0 && (
          <article aria-labelledby={asiaId}>
            <h3 id={asiaId}>Asia</h3>
            <ul aria-label="Chapters" class="list">
              {xs.asia.map(renderChapter)}
            </ul>
          </article>
        )}
      </div>
    );
  };

  const activeId = makeAriaId();
  const inactiveId = makeAriaId();

  return (
    <div class="chapters-page">
      {/* todo(maximsmol): add an info blurb and/or an image for each chapter */}
      {/* todo(maximsmol): add more social links */}

      <article aria-labelledby={activeId}>
        <h2 id={activeId}>Active chapters</h2>
        {renderLocalities(active)}
      </article>

      <article aria-labelledby={inactiveId}>
        <h2 id={inactiveId}>Inactive and former chapters</h2>
        {renderLocalities(inactive)}
      </article>
    </div>
  );
};
