import { Data } from "./types.ts";

import icons from "./src/lucide";

export const data = {
  title: "Job Board",
};

export const render = ({ workplaces }: Data) => {
  return (
    <main class="plain">
      <h1>Job Board 🌹</h1>

      <p>
        More and more tech-driven organizations are unionizing. This is an
        incomplete list of workplaces with an active union. Some of these
        workplaces haven't recognized their unions yet, or contracts have not
        been signed between the union and the workplace. Know of another one?{" "}
        <a href="https://github.com/techworkersco/twc-site/tree/master/_data/workplaces.yml">
          Please add it.
        </a>
      </p>

      <h2 class="h4">Active tech unions and campaigns</h2>
      <ul class="job-board">
        {workplaces.map((x) => (
          <li>
            <h3>
              {x.organization}
              {x.division != null && ` - ${x.division}`}
            </h3>
            <div>
              <strong>✊ Union:</strong> {x.union}
            </div>
            <p>
              {x.union_twitter && (
                <a href={`https://twitter.com/${x.union_twitter}`}>
                  @{x.union_twitter}
                </a>
              )}
              {x.union_website && (
                <>
                  {" "}
                  (<a href={x.union_website}>website</a>)
                </>
              )}
            </p>
            <div style="display: flex;">
              <a href={x.job_listings} class="button framed">
                See all jobs
                {icons.ChevronRight}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};
