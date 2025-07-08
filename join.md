---
layout: page
title: Join Us
permalink: /subscribe/
---

# Join us

Our Slack is governed by the principles and rules in our [Community Guide](/community-guide). By joining, you agree to follow them.

<h3 class="marg-b-3">Please provide the following:</h3>
<form class="join-form" method="POST" target="_blank" class="marg-b-4" data-netlify="true" action="/welcome" netlify-honeypot="bot-field">
  <label style="display:none">
    Don’t fill this out if you’re human: <input name="bot-field" />
  </label>
  <label class="marg-b-3" for="email">
    <div><b>Email:</b></div>
    <input id="email" type="email" required name="email">
  </label>
  <label class="marg-b-3" for="name">
    <div><b>Name:</b></div>
    <input id="name" type="text" required name="name">
  </label>
  <label class="marg-b-3" for="social">
    <div class="marg-b-2">
      <b>Please provide two links to your social media.</b>
      <div>We need a way to validate that you meet the membership requirements laid out <a href="/community-guide#membership">here</a>. Linkedin is preferred, but anything that allows us to verify that you are not a manager, journalist etc is acceptable.</div>
    </div>
    <input placeholder="LinkedIn, Twitter, etc" id="social" required type="text" name="social_media_1" title="enter a valid url">
    <input placeholder="GitHub, Instagram, Blog" type="text" required name="social_media_2" title="enter a valid url">
  </label>
  <label class="marg-b-3" for="company_name">
    <div><b>Company Name</b></div>
    <div class="marg-b-2">Including a company name helps us vet you.</div>
    <input id="company_name" type="text" name="company_name" required>
  </label>
  <label class="marg-b-3" for="human-referrer">
    <div><b>How Did You Hear About Us?</b> (optional):</div>
    <div class="marg-b-2">Including a referrer from an existing member can be a good way to get in the slack if you lack a social media presence. Also, please be specific! If you found us on search, don't just say "Google" (it's unclear if you mean the company or the search engine).</div>
    <input id="human-referrer" type="text" name="human-referrer">
  </label>
  <label class="marg-b-3" for="nearby-chapter">
    <div><b>Do you live or work near an existing chapter?</b> (optional):</div>
    <div class="marg-b-2">This helps us connect you with local organizing efforts. If there isn't already a chapter in your area, we'd love to chat with you about starting one!</div>
    <select id="nearby-chapter" name="nearby-chapter">
      <option value="">Select a chapter</option>
      {% assign active_chapters = site.data.chapters.chapters | where_exp:"chapter", "chapter.activity_level == 'active' or chapter.activity_level == 'midactive' or chapter.activity_level == 'semiactive'" | sort: "text" %}
      {% for chapter in active_chapters %}
      <option value="{{chapter.text}}">{{chapter.text}}</option>
      {% endfor %}
    </select>
  </label>
  <div id="chapter-outreach-fields" style="display: none;">
    <label class="marg-b-3" for="wants-outreach">
      <input id="wants-outreach" type="checkbox" name="wants-outreach" value="yes" style="margin-right: 8px;">
      <b>Are you interested in 1:1 outreach from someone in the chapter?</b> (optional)
    </label>
    <label class="marg-b-3" for="phone-number">
      <div><b>Phone Number</b> (optional):</div>
      <div class="marg-b-2">Provide a phone number for 1:1 outreach. Otherwise we will reach out via email.</div>
      <input id="phone-number" type="tel" name="phone-number" placeholder="(555) 123-4567">
    </label>
  </div>
  <input type="submit" value="Submit">
</form>

<script>
(function() {
  const chapterSelect = document.getElementById('nearby-chapter');
  const outreachFields = document.getElementById('chapter-outreach-fields');
  const form = document.querySelector('.join-form');
  const baseAction = '/welcome';

  function updateFormForChapter() {
    const selectedChapter = chapterSelect.value;
    
    if (selectedChapter) {
      // Show the additional fields
      outreachFields.style.display = 'block';
      
      // Update form action with query parameter
      const encodedChapter = encodeURIComponent(selectedChapter);
      form.action = baseAction + '?chapter=' + encodedChapter;
    } else {
      // Hide the additional fields
      outreachFields.style.display = 'none';
      
      // Reset form action to base
      form.action = baseAction;
      
      // Clear the additional field values
      document.getElementById('wants-outreach').checked = false;
      document.getElementById('phone-number').value = '';
    }
  }

  // Listen for changes to the chapter select
  chapterSelect.addEventListener('change', updateFormForChapter);
  
  // Run on page load in case there's a pre-selected value
  updateFormForChapter();
})();
</script>
