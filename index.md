---
layout: default
namespace: home
permalink: /
languages: ["en", "es", "fr", "it", "pt", "ru"]
---

<h1 class="leading-tight marg-b-2">{% t home.title %}</h1>

<div class="p-3 marg-b-2 secondaryBg">
  <p>{% t home.summary %}</p>
  <p>{% t home.who_we_are.description %} 
  {% t home.who_we_support.description %}</p>
  <p>{% t home.how_we_work.description %}</p>
</div>
<div class="p-3 marg-b-2 secondaryBg">
  <h3>{% t home.contact_us.title %}</h3>
  {% t home.contact_us.description %}
</div>

<h2 class class="marg-b-2">{% t home.events.title %}</h2>
{% include events.html limit=5 %}

<h2 class class="marg-b-2">Blog Posts</h2>
{% include blog.html limit=2 %}
{% include newsletter.html limit=2 %}
<h2> TWC in the Press</h2>
<a href="/press">All Press mentions</a>
{% include press.html limit=2%}