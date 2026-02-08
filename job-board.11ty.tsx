import { Data } from "./types.js";

export const data = {
  title: "Job Board",
};

export const render = ({ workplaces }: Data) => {
  return (
    <>
      <h1 class="lh-tight marg-b-3 marg-t-2">Job Board 🌹</h1>

      <p>
        More and more tech-driven organizations are unionizing. This is an
        incomplete list of workplaces with an active union. Some of these
        workplaces haven't recognized their unions yet, or contracts have not
        been signed between the union and the workplace. Know of another one?{" "}
        <a href="https://github.com/techworkersco/twc-site/tree/master/_data/workplaces.yml">
          Please add it.
        </a>
      </p>

      <h2 class="marg-b-2">Active tech unions and campaigns</h2>
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
            <div class="flex">
              <a href={x.job_listings} class="button">
                See all jobs
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
                  class="lucide lucide-chevron-right-icon lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
