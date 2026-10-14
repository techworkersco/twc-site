import { Data } from "./types.ts";

export const data = {
  title: "Join Us",
};

export const render = ({ chapters }: Data) => {
  const xs = chapters.filter((x) => x.active);
  xs.sort((a, b) => a.text.localeCompare(b.text));

  const chapterOptions = xs.map((x) => (
    <option value={x.text.replaceAll(" ", "-").toLowerCase()}>{x.text}</option>
  ));

  return (
    <main class="plain">
      <header>
        <h1>Join us</h1>
      </header>

      <p class="callout">
        Our Slack is governed by the principles and rules in our{" "}
        <a href="/community-guide">Community Guide.</a>
        <br />
        By joining, you agree to follow them.
      </p>

      <form
        name="signup-global"
        method="POST"
        data-netlify="true"
        action="/welcome"
        netlify-honeypot="bot-field"
      >
        <p class="h5">Please provide the following:</p>

        <div style="display: none;">
          <label>
            <strong>Don’t fill this out if you’re human:</strong>
          </label>
          <input name="bot-field" />
        </div>

        <div class="column">
          <label for="email">
            <strong>Email:</strong>
          </label>
          <input
            id="email"
            type="email"
            required
            name="email"
            placeholder="mail@example.com"
          />
        </div>

        <div class="row">
          <div class="column">
            <label for="first-name">
              <strong>First Name:</strong>
            </label>
            <input
              id="first-name"
              maxlength="100"
              required
              name="first-name"
              placeholder="John"
            />
          </div>

          <div class="column">
            <label for="last-name">
              <strong>Last Name</strong> (optional):
            </label>
            <input
              id="last-name"
              maxlength="100"
              name="last-name"
              placeholder="Doe"
            />
          </div>
        </div>

        <fieldset>
          <legend>
            <strong>Please provide two links to your social media.</strong>
          </legend>
          <p id="social-description">
            We need a way to validate that you meet{" "}
            <a href="/community-guide#membership">
              the membership requirements laid out in our community guide.
            </a>{" "}
            LinkedIn is preferred, but anything that allows us to verify that
            you are not a manager, journalist etc is acceptable.
          </p>
          <div class="row">
            <div class="column">
              <label for="social">
                <strong>LinkedIn, Twitter, etc.</strong>
              </label>
              <input
                aria-describedby="social-description"
                placeholder="linkedin.com/in/john.doe"
                id="social"
                required
                name="social_media_1"
              />
            </div>
            <div class="column">
              <label for="social-2">
                <strong>GitHub, Instagram, Blog</strong>
              </label>
              <input
                aria-describedby="social-description"
                placeholder="github.com/john.doe"
                id="social-2"
                required
                name="social_media_2"
              />
            </div>
          </div>
        </fieldset>

        <div class="column">
          <label for="company_name">
            <strong>Company Name:</strong>
          </label>
          <p id="company_name-description">
            Including a company name helps us vet you.
          </p>
          <input
            aria-describedby="company_name-description"
            id="company_name"
            name="company_name"
            required
            placeholder="ACME Inc."
          />
        </div>

        <div class="column">
          <label for="contacts-comments">
            <strong>Additional Comments</strong> (optional):
          </label>
          <p id="contacts-comments-description">
            Any additional details regarding your contact information that you
            would like to include.
          </p>
          <textarea
            aria-describedby="contacts-comments-description"
            id="contacts-comments"
            maxlength="2000"
            name="contacts-comments"
          />
        </div>

        <div class="column">
          <label for="human-referrer">
            <strong>How Did You Hear About Us?</strong> (optional):
          </label>
          <p id="human-referrer-description">
            Including a referrer from an existing member can be a good way to
            get in the slack if you lack a social media presence.
            <br />
            Also, please be specific! If you found us on search, don't just say
            "Google" (it's unclear if you mean the company or the search
            engine).
          </p>
          <input
            aria-describedby="human-referrer-description"
            id="human-referrer"
            type="text"
            name="human-referrer"
          />
        </div>

        <div class="column">
          <label for="nearby-chapter">
            <strong>Do you live or work near an existing chapter?</strong>{" "}
            (optional):
          </label>
          <p id="nearby-chapter-description">
            This helps us connect you with local organizing efforts. If there
            isn't already a chapter in your area, we'd love to chat with you
            about starting one!
          </p>
          <select
            aria-describedby="nearby-chapter-description"
            id="nearby-chapter"
            name="nearby-chapter"
          >
            <option value="">Select a chapter</option>
            <option value="want-to-start">
              I want to help start a chapter
            </option>
            {chapterOptions}
          </select>
        </div>

        <div>
          <div>
            <input
              aria-describedby="is-manager-description"
              id="is-manager"
              type="checkbox"
              name="is-manager"
              value="yes"
              style="margin-right: 8px;"
            />
            <label for="is-manager">
              <strong>Are you a manager with hiring or firing power?</strong>
            </label>
          </div>
          <p id="is-manager-description">
            Note: for security reasons, managers won't be added to our internal
            channels.
          </p>
        </div>

        <div>
          <input
            id="outreach"
            type="checkbox"
            name="outreach"
            value="wants-outreach"
            style="margin-right: 8px;"
          />
          <label for="outreach">
            <strong>
              Are you interested in 1:1 outreach from someone in TWC?
            </strong>{" "}
            (optional)
          </label>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </main>
  );
};
