import { EleventyFuns } from "./types.ts";

export const data = {
  permalink: "/",
};

export const render = async function (
  this: EleventyFuns,
  data: Record<string, unknown>,
) {
  return (
    <>
      <h1 class="leading-tight marg-b-2">
        <span class="red">Worker</span> power in the{" "}
        <span class="red">tech industry</span>
      </h1>

      {/* todo(maximsmol): add a banner/hero image to make this stand out even more */}
      <div class="p-3 marg-b-2 secondaryBg">
        <p>
          Guided by our vision for an inclusive & equitable tech industry, TWC
          organizes to build worker power through rank & file self-organization
          and education.
        </p>
        <p>
          We are a coalition of workers in and around the tech industry, labor
          organizers, community organizers, and friends. We work in solidarity
          with existing movements towards social justice, workers' rights, and
          economic inclusion.
        </p>
        <p>
          We’re a democratically structured, all-volunteer, and worker-led
          organization.
        </p>
      </div>
      <nav style="font-size: clamp(0.875rem, 0.7216rem + 0.6818vw, 1.25rem)">
        <ul>
          <li>
            <a href="/subscribe" class="button primary">
              Get Involved
            </a>
          </li>
          <li>
            <a href="/chapters" class="button">
              Find a Local Chapter
            </a>
          </li>
        </ul>
      </nav>

      <section>
        {{
          type: "raw",
          value: await this.renderFile("_includes/events.html", {
            ...data,
            include: { limit: 5 },
          }),
        }}
      </section>

      <section>
        {{
          type: "raw",
          value: await this.renderFile("_includes/blog.11ty.tsx", {
            ...data,
            include: { limit: 3 },
          }),
        }}
      </section>

      <section>
        <h2>TWC in the Press</h2>
        <>
          {{
            type: "raw",
            value: await this.renderFile("_includes/press.11ty.tsx", {
              ...data,
              include: { limit: 2 },
            }),
          }}
        </>

        <a href="/press" class="button">
          See more press mentions
        </a>
      </section>
    </>
  );
};
