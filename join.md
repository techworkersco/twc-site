---
layout: page
title: Join Us
permalink: /subscribe/
---

# Join us

1. Filling this form will add you to our newsletter.
2. If you are eligible, you will be invited to our Slack.
3. You will also be invited to our Slack if you are eligible according to . By joining, you agree to follow the [Community Guide](/community-guide).

<h3>Please provide the following:</h3>
<form class="join-form" method="POST" target="_blank" data-netlify="true" action="/welcome" netlify-honeypot="bot-field">
  <label style="display:none">
    Don't fill this out if you’re human: <input name="bot-field" />
  </label>
  <label for="name">
    <div><b>Your full name</b></div>
    <input id="name" type="text" required name="name">
  </label>
  <label for="email">
    <div><b>Email</b></div>
    <input id="email" type="email" required name="email">
  </label>
  <label for="social">
    <div><b>Social media link #1</b><br>We manually verify that you meet the 
    <a href="https://techworkerscoalition.org/community-guide/#membership">membership requirements</a>.</div>
    <input placeholder="LinkedIn, Instagram, Twitter, etc" id="social" required type="text" name="social_media_1">
    <div><b>Social media link #2</b></div>  
    <input placeholder="GitHub, Instagram, Blog" type="text" required name="social_media_2">
  </label>
  <label for="company_name">
    <div><b>Your employer</b></div>
    <input id="company_name" type="text" name="company_name" required>
  </label>
    <label for="location">
    <div><b>What city are you located in?</b></div>
    <input placeholder="Bay Area, Mumbai, Amsterdam, NYC etc.." id="location" type="text" name="location" required>
  </label>
  <label for="human-referrer">
    <div><b>How Did You Hear About TWC?</b><br>How can we support your workplace organizing goals? (optional):</div>
    <input id="human-referrer" type="text" name="human-referrer">
  </label>
  <input type="submit" value="Submit">
</form>
