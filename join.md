---
layout: page
title: Join Us
permalink: /subscribe/
show_in_footer: true
---

# Join us

Our Slack is governed by the principles and rules in our [Community Guide](/community-guide). By joining, you agree to follow them. [Our newsletter](https://news.techworkerscoalition.org) includes news, announcements, and updates from the Tech Workers Coalition. You can [subscribe here](https://news.techworkerscoalition.org/subscribe/)

For joining the Slack, please keep in mind that you will be manually vetted before you are allowed in. Sometimes this can take a day or two. Please be patient with us!

<h3 class="marg-b-3">Please provide the following:</h3>

<form class="join-form" action="https://ancient-ridge-68647.herokuapp.com/signup" method="POST" target="_blank">
  <label class="marg-b-3" for="email">
    <div>Email:</div>
    <input id="email" type="email" required name="email">
  </label>
  <label class="marg-b-3" for="name">
    <div>Name:</div>
    <input id="name" type="text" required name="name">
  </label>
  <label class="marg-b-3" for="social">
    <div>
      <b>Please provide two links to social media handles.</b>
      What we are looking for here is a way to validate that you meet the membership requirements laid out <a href="/community-guide#membership">here</a>. Linkedin is preferred, but anything that allows us to verify that you aren't a manager, journalist, etc is acceptable.
    </div>
    <input placeholder="LinkedIn/Twitter/etc" id="social" required type="url" name="social_media_1">
    <input placeholder="LinkedIn/Twitter/etc" type="url" required name="social_media_2">
  </label>
  <label class="marg-b-3" for="company_name">
    <div>Company Name (optional):</div>
    <input id="company_name" type="text" name="company_name">
  </label>
  <label class="marg-b-3" for="referrer">
    <div>How Did You Hear About Us? (optional):</div>
    <input id="referrer" type="text" name="referrer">
  </label>
  <div class="marg-b-3 flex flex-row ai-ctr">
    <input class="marg-r-1" id="subscribeSlack" type="checkbox" name="slack">
    <label for="subscribeSlack"><b>Join the Slack</b></label>
  </div>
  <input type="hidden" name="team_id" value="T0M2JM76F" />
  <input type="hidden" name="redirect_uri" value="https://techworkerscoalition.org/slack-thanks" />
  <input type="submit" value="Submit">
</form>
