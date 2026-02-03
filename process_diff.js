import fs from "fs/promises";

const main = async () => {
  let data = (await fs.readFile("_site.diff")).toString();

  data = data.replaceAll(
    new RegExp(
      String.raw`
        [a-f0-9]+(,[a-f0-9]+)? \n
        (
          < \x20 <!doctype \x20 html> \n
          --- \n
          > \x20 <!DOCTYPE \x20 html> \n

          |

          > \s+ <link \n
          > \s+   rel="alternate" \n
          > \s+   type="application/atom\+xml" \n
          > \s+   href="/feed/blog.xml" \n
          > \s+   title="Blog \x20 posts" \n
          > \s+ /> \n
          > \s+ \n
          > \s+ <link \n
          > \s+   rel="alternate" \n
          > \s+   type="application/atom\+xml" \n
          > \s+   href="/feed/events.xml" \n
          > \s+   title="Events" \n
          > \s+ /> \n
          > \s+ \n

          |

          < \s+ <link \n
          < \s+   rel="alternate" \n
          < \s+   type="application/rss\+xml" \n
          < \s+   title="Tech \x20 Workers \x20 Coalition" \n
          < \s+   href="/feed.xml" \n
          < \s+ /> \n

          |

          < \s+ /\*! \x20 normalize\.css \x20 v3\.0\.2 \x20 \| \x20 MIT \x20 License \x20 \| \x20 git.io/normalize \x20 \*/ \n
          < \s+ html \x20 \{ \n
          --- \n
          > \s+ /\*! \x20 normalize\.css \x20 v3\.0\.2 \x20 \| \x20 MIT \x20 License \x20 \| \x20 git\.io/normalize \x20 \*/html \x20 \{ \n

          |
          (
          < \s+ \n
          )?
          < \s+ <!--excerpt--> \n
          (
          < \s+ \n
          )?

        )
      `.replaceAll(/\s|\/\/[^\n]*/g, ""),
      "g",
    ),
    "",
  );

  await fs.writeFile("_site_clean.diff", data);
};

main();
