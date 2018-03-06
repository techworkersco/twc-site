---
layout: page
title: Join Us
permalink: /subscribe/
show_in_footer: true
---

# Join us

Our Slack is governed by the principles and rules in our [Community Guide](/community-guide). By joining, you agree to follow them. Our newsletter includes announcements and updates from the Tech Workers Coalition.


**Please provide the following:**

<form class="join-form" action="https://ancient-ridge-68647.herokuapp.com/signup" method="POST" target="_blank">
  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" required name="email">
  </div>
  <div>
    <label for="name">Name:</label>
    <input id="name" type="text" required name="name">
  </div>
  <div>
    <label for="social">Please provide two links to social handles (Twitter, Medium, personal blog, etc.):</label>
    <input id="social" required type="url" name="social_media_1">
    <input type="url" required name="social_media_2">
  </div>
  <div>
    <label for="company_name">Company Name (optional):</label>
    <input id="company_name" type="text" name="company_name">
  </div>
  <div>
    <label for="referrer">How Did You Hear About Us? (optional):</label>
    <input id="referrer" type="text" name="referrer">
  </div>
  <div>
    <input id="subscribeNewsletter" type="checkbox" name="newsletter">
    <label for="subscribeNewsletter">Subscribe to newsletter?</label>
  </div>
  <div>
    <input id="subscribeSlack" type="checkbox" name="slack">
    <label for="subscribeSlack">Join our slack?</label>
  </div>
  <input type="hidden" name="team_id" value="T0M2JM76F" />
  <input type="hidden" name="redirect_uri" value="https://techworkerscoalition.org/slack-thanks" />
  <input type="submit" value="Submit">
</form>
