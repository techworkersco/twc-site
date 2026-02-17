import { Data } from "./types.ts";

export const data = {
  title: "Join Us",
};

export const render = ({ chapters }: Data) => {
  const xs = chapters.filter((x) => x.activity_level === "active");
  xs.sort((a, b) => a.text.localeCompare(b.text));

  const chapterOptions = xs.map((x) => (
    <option value={x.text.replaceAll(" ", "-").toLowerCase()}>{x.text}</option>
  ));

  return (
    <>
      <h1 id="join-us">Join us</h1>
      Our Slack is governed by the principles and rules in our{" "}
      <a href="/community-guide">Community Guide.</a> By joining, you agree to
      follow them.
      <h3 class="marg-b-3">Please provide the following:</h3>
      <form
        method="POST"
        class="marg-b-4"
        data-netlify="true"
        action="/welcome"
        netlify-honeypot="bot-field"
      >
        <label style="display:none">
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
        <label class="marg-b-3" for="email">
          <div>
            <b>Email:</b>
          </div>
          <input
            id="email"
            type="email"
            required
            name="email"
            placeholder="mail@example.com"
          />
        </label>
        <div class="form-row">
          <label class="marg-b-3" for="first-name">
            <div>
              <b>First Name:</b>
            </div>
            <input
              id="first-name"
              type="text"
              maxlength="100"
              required
              name="first-name"
              placeholder="John"
            />
          </label>
          <label class="marg-b-3" for="last-name">
            <div>
              <b>Last Name:</b>
            </div>
            <input
              id="last-name"
              type="text"
              maxlength="100"
              name="last-name"
              placeholder="Doe"
            />
          </label>
        </div>
        <label class="marg-b-3" for="social">
          <div class="marg-b-2">
            <b>Please provide two links to your social media.</b>
            <div>
              We need a way to validate that you meet{" "}
              <a href="/community-guide#membership">
                the membership requirements laid out in our community guide.
              </a>{" "}
              LinkedIn is preferred, but anything that allows us to verify that
              you are not a manager, journalist etc is acceptable.
            </div>
          </div>
          <input
            placeholder="LinkedIn, Twitter, etc"
            id="social"
            required
            type="url"
            name="social_media_1"
            title="Enter a valid url"
          />{" "}
          <input
            placeholder="GitHub, Instagram, Blog"
            type="url"
            required
            name="social_media_2"
            title="Enter a valid url"
          />
        </label>
        <label class="marg-b-3" for="company_name">
          <div>
            <b>Company Name</b>
          </div>
          <div class="marg-b-2">Including a company name helps us vet you.</div>
          <input
            id="company_name"
            type="text"
            name="company_name"
            required
            placeholder="ACME Inc."
          />
        </label>
        <label class="marg-b-3" for="contacts-comments">
          <div>
            <b>Additional Comments</b> (optional):
          </div>
          <div class="marg-b-2">
            Any additional details regarding your contact information that you
            would like to include.
          </div>
          <textarea
            id="contacts-comments"
            maxlength="2000"
            name="contacts-comments"
          />
        </label>
        <label class="marg-b-3" for="human-referrer">
          <div>
            <b>How Did You Hear About Us?</b> (optional):
          </div>
          <div class="marg-b-2">
            Including a referrer from an existing member can be a good way to
            get in the slack if you lack a social media presence. Also, please
            be specific! If you found us on search, don't just say "Google"
            (it's unclear if you mean the company or the search engine).
          </div>
          <input id="human-referrer" type="text" name="human-referrer" />
        </label>
        <label class="marg-b-3" for="nearby-chapter">
          <div>
            <b>Do you live or work near an existing chapter?</b> (optional):
          </div>
          <div class="marg-b-2">
            This helps us connect you with local organizing efforts. If there
            isn't already a chapter in your area, we'd love to chat with you
            about starting one!
          </div>
          <select id="nearby-chapter" name="nearby-chapter">
            <option value="">Select a chapter</option>
            <option value="want-to-start">
              I want to help start a chapter
            </option>
            {chapterOptions}
          </select>
        </label>
        <label class="marg-b-3" for="is-manager">
          <input
            id="is-manager"
            type="checkbox"
            name="is-manager"
            value="yes"
            style="margin-right: 8px;"
          />{" "}
          <b>
            Are you a manager with hiring or firing power? Note: for security
            reasons, managers won't be added to our internal channels.
          </b>
        </label>
        <label class="marg-b-3" for="outreach">
          <input
            id="outreach"
            type="checkbox"
            name="outreach"
            value="wants-outreach"
            style="margin-right: 8px;"
          />{" "}
          <b>Are you interested in 1:1 outreach from someone in TWC?</b>{" "}
          (optional)
        </label>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
