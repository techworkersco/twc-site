---
layout: page
title: Join a Chapter
permalink: /chapters/
---
{% assign activity_levels = "active,inactive" | split: ','%}
{% for level in activity_levels %}
  <h2>{{level | capitalize}} chapters</h2>
  {% assign chapters = site.data.chapters.chapters | where:"activity_level",level | sort: "text" %}
  {% for chapter in chapters %}
  <ul class="list-style-none marg-b-3 pad-l-3">
    <b>{% if chapter.url %}<a href="{{chapter.url}}">{{chapter.text}}</a>{% else if%}{{chapter.text}}{% endif %}</b>
    {% if chapter.twitter %} · <a href="https://twitter.com/{{chapter.twitter}}">Twitter</a>{% endif %}
    {% if chapter.meetup %} · <a href="https://meetup.com/{{chapter.meetup}}">Meetup</a>{% endif %}
    {% if chapter.facebook %} · <a href="{{chapter.facebook}}">Facebook</a>{% endif %}
  </ul>
{% endfor %}
{% endfor %}  
