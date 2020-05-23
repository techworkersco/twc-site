---
layout: page
title: Join Us
permalink: /subscribe/
show_in_footer: true
---

# Join us

Our Slack is governed by the principles and rules in our [Community Guide](/community-guide). By joining, you agree to follow them. [Our newsletter](https://news.techworkerscoalition.org) includes news, announcements, and updates from the Tech Workers Coalition. You can [subscribe here](https://news.techworkerscoalition.org/subscribe/)

For joining the Slack, please keep in mind that you will be manually vetted before you are allowed in. Sometimes this can take a day or two. Please be patient with us!

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
    <div>
      <label for="social">Please provide two links to social media handles.</label>
      What we are looking for here is a way to validate that you meet the membership requirements laid out <a href="/community-guide#membership">here</a>. Linkedin is preferred, but anything that allows us to verify that you aren't a manager, journalist, etc is acceptable.
    </div>
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
    <input id="subscribeSlack" type="checkbox" name="slack">
    <label for="subscribeSlack">Join our slack?</label>
  </div>
  <input type="hidden" name="team_id" value="T0M2JM76F" />
  <input type="hidden" name="redirect_uri" value="https://techworkerscoalition.org/slack-thanks" />
  <input type="submit" value="Submit">
</form>
