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

{% include events.html limit=5 %}

{% include blog.html limit=3 %}
<h2> TWC in the Press</h2>
<a href="/press">All Press mentions</a>
{% include press.html limit=2%}