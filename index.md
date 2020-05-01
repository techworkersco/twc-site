---
layout: default_translate
namespace: home
permalink: /
---

<div class="rich-text home-page">
  <div id="home">
    <h1>{% t home.title %}</h1>
    <h2>{% t home.summary %}</h2>
  </div>
  <div id="learn">
    <div class="columns">
      <div class="column is-1">
        <h3>{% t home.who_we_are.title %}</h3>
        <p>{% t home.who_we_are.description %}</p>
      </div>
      <div class="column is-1">
        <h3>{% t home.why_we_organize.title %}</h3>
        <p>{% t home.why_we_organize.description %}</p>
      </div>
      <div class="column is-1">
        <h3>{% t home.who_we_support.title %}</h3>
        <p>{% t home.who_we_support.description %}</p>
      </div>
    </div>
    <div class="columns">
      <div id="how" class="column is-1">
        <h3>{% t home.how_we_work.title %}</h3>
        <p>{% t home.how_we_work.description %}</p>
      </div>
    </div>
  </div>
  <div id="connect">
    <h3>{% t home.check_out_meeting.title %}</h3>
    <p>{% t home.check_out_meeting.locations %}</p>

    <h3>{% t home.join_discussion.title %}</h3>
    <ul>{% t home.join_discussion.links %}</ul>

    {% include collective-actions.html %}

    <h3>{% t home.social_media.title %}</h3>
    <ul id="social">{% t home.social_media.links %}</ul>

    <h3>{% t home.contact_us.title %}</h3>
    {% t home.contact_us.description %}


  </div>
  <script src="/assets/js/main.js"></script>
</div>
