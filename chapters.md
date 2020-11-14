---
layout: page
title: Join a Chapter
permalink: /chapters/
---

{% for region in site.data.chapters.regions %}
<h2>{{region.region}}</h2>
{% for chapter in region.chapters %}
  <h3>{{ chapter.text }}</h3>
  <ul class="list-style-none marg-b-3 pad-l-3">
    {% if chapter.url %}<li><a href="{{chapter.url}}">Website</a></li>{% endif %}
    {% if chapter.twitter %}<li><a href="https://twitter.com/{{chapter.twitter}}"> @{{chapter.twitter}}</a></li>{% endif %}
    {% if chapter.meetup %}<li><a href="https://meetup.com/{{chapter.meetup}}">Meetup</a></li>{% endif %}
  </ul>
{% endfor %}
<br />
{% endfor %}
