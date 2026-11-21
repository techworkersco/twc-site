import type { Data } from "./types.ts";

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
    <>
      <h1 id="join-us">Join us</h1>
      Our Slack is governed by the principles and rules in our{" "}
      <a href="/community-guide">Community Guide.</a> By joining, you agree to
      follow them.
      <h3 class="marg-b-3">Please provide the following:</h3>
      <form
        name="signup-global-extended"
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
            type="text"
            name="social_media_1"
            title="Enter a valid url"
          />{" "}
          <input
            placeholder="GitHub, Instagram, Blog"
            type="text"
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
          />
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
          />
          <b>
            Are you interested in 1:1 outreach from someone in TWC? (optional)
          </b>
        </label>
        <fieldset id="outreach-details">
          <legend>Request a 1-on-1 with Tech Workers Coalition</legend>

          <p>
            Tell us how to reach you and what you're interested in, and we'll
            get in touch to schedule a 1-on-1 chat. We'll use the email address
            you entered above unless you tell us otherwise.
          </p>

          <label class="marg-b-3" for="phone">
            <div>
              <b>Phone number</b> (optional):
            </div>
            <input
              id="phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              placeholder="+1 555 555 5555"
            />
          </label>

          <label class="marg-b-3">
            <div>
              <b>How do you prefer to be contacted?</b> (optional):
            </div>
            <select name="Contact_Preference" id="Contact_Preference">
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="TWC Slack">TWC Slack</option>
            </select>
          </label>

          <label class="marg-b-3">
            <div>
              <b>How would you like to get involved?</b> (select at least one):
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Local chapter - support local community or start new chapter"
                />
                <span>
                  Local chapter - support local community or start new chapter
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Finance - fundraising and managing budget"
                />
                <span>Finance - fundraising and managing budget</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Infrastructure - website and automations"
                />
                <span>Infrastructure - website and automations</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Onboarding - onboarding &amp; retention"
                />
                <span>Onboarding - onboarding &amp; retention</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Trainings/Digital Events - organizing training &amp; political education"
                />
                <span>
                  Trainings/Digital Events - organizing training &amp; political
                  education
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Comms - social media and newsletter and blog"
                />
                <span>Comms - social media and newsletter and blog</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Building community - hosting virtual events &amp; ways to socialize"
                />
                <span>
                  Building community - hosting virtual events &amp; ways to
                  socialize
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Involved_Preference[]"
                  value="Something else - let us know in the questions box!"
                />
                <span>Something else - let us know in the questions box!</span>
              </label>
            </div>
          </label>

          <label class="marg-b-3" for="past-experience">
            <div>
              <b>
                What labor or political organizing experience do you have, if
                any?
              </b>{" "}
              (optional):
            </div>
            <textarea
              id="past-experience"
              maxlength="2000"
              name="past-experience"
            />
          </label>

          <label for="further-questions">
            <div>
              <b>What questions do you have about Tech Workers Coalition?</b>{" "}
              (optional):
            </div>
            <textarea
              id="further-questions"
              maxlength="2000"
              name="further-questions"
            />
          </label>
        </fieldset>

        <input type="submit" value="Submit" />
      </form>
      <i>
        Our policy and practices for using and managing data are described in
        our <a href="/data-policy">data transparency policy</a>.
      </i>
      <script src="/assets/js/subscribe.js" defer></script>
    </>
  );
};
