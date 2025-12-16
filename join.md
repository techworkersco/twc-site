---
layout: page
title: Join Us
permalink: /subscribe/
---

# Join us

1. Fill out this form to subscribe to our newsletter.
2. If eligible, you will be invited to our Slack.
3. You agree to the [Community Guide](/community-guide) by filling the form.

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
    <input placeholder="LinkedIn, Bluesky, Twitter, etc.." id="social" required type="text" name="social_media_1" title="enter a valid url">
    <div><b>Social media link #2</b></div>  
    <input placeholder="GitHub, Instagram, Blog etc.." type="text" required name="social_media_2" title="enter a valid url">
  </label>
  <label for="company_name">
    <div><b>Your employer</b></div>
    <input id="company_name" type="text" name="company_name" required>
  </label>
  <label for="human-referrer">
    <div><b>How can we support your personal goals?</b> (optional):</div>
    <input id="human-referrer" type="text" name="human-referrer">
  </label>
  <label class="marg-b-3" for="nearby-chapter">
    <div><b>Do you live or work near an existing chapter?</b> (optional):</div>
    <select id="nearby-chapter" name="nearby-chapter">
      <option value="">Select a chapter</option>
      <option value="want-to-start">I want to help start a chapter</option>
      {% assign active_chapters = site.data.chapters.chapters | where_exp:"chapter", "chapter.activity_level == 'active' or chapter.activity_level == 'semiactive'" | sort: "text" %}
      {% for chapter in active_chapters %}
      <option value="{{chapter.text | replace: ' ', '-' | downcase }}">{{chapter.text}}</option>
      {% endfor %}
    </select>
  </label>
  <label class="marg-b-3" for="is-manager">
    <input id="is-manager" type="checkbox" name="is-manager" value="yes" style="margin-right: 8px;">
    <b>Are you a manager with hiring or firing power? Note: for security reasons, managers won't be added to our internal channels.</b>
  </label>
  <label class="marg-b-3" for="outreach">
    <input id="outreach" type="checkbox" name="outreach" value="wants-outreach" style="margin-right: 8px;">
    <b>Do you want 1:1 outreach with someone in TWC?</b> (optional)
  </label>
   
  <input type="submit" value="Submit">
</form>
