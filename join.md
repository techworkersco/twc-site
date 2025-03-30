---
layout: page
title: Join Us
permalink: /subscribe/
---

# Join us

Our Slack is governed by the principles and rules in our [Community Guide](/community-guide). By joining, you agree to follow them.

<h3>Please provide the following:</h3>
<form class="join-form" method="POST" target="_blank" class="marg-b-4" data-netlify="true" action="/welcome" netlify-honeypot="bot-field">
  <label style="display:none">
    Don’t fill this out if you’re human: <input name="bot-field" />
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
    <div><b>Social media link #1</b></div>
    <input placeholder="LinkedIn, Twitter, etc" id="social" required type="text" name="social_media_1" title="enter a valid url">
    <div><b>Social media link #2</b></div>  
    <input placeholder="GitHub, Instagram, Blog" type="text" required name="social_media_2" title="enter a valid url">
  </label>
  <label for="company_name">
    <div><b>Your employer</b></div>
    <input id="company_name" type="text" name="company_name" required>
  </label>
  <label for="human-referrer">
    <div><b>How can we support your personal goals?</b> (optional):</div>
    <input id="human-referrer" type="text" name="human-referrer">
  </label>
  <input type="submit" value="Submit">
</form>
