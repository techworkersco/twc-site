---
layout: default
namespace: home
permalink: /
languages: ["en", "es", "fr", "it", "pt", "ru"]
---

<h1 class="leading-tight mb-12">{% t home.title %}</h1>

<div class="p-4 mb-8 secondaryBg">
  <p>{% t home.summary %}</p>
  <p>{% t home.who_we_are.description %} 
  {% t home.who_we_support.description %}</p>
  <p>{% t home.how_we_work.description %}</p>
</div>
<div class="p-4 mb-8 secondaryBg">
  <h3>{% t home.contact_us.title %}</h3>
  {% t home.contact_us.description %}
</div>

<h2 class class="mb-12">{% t home.events.title %}</h2>
{% include events.html limit=5 %}

{% if site.lang == 'en' %}
  <h2 class class="mb-12">Blog Posts</h2>
  {% include blog.html limit=2 %}
  {% include newsletter.html limit=2 %}
  <h2 class="text-2xl mb-12"> TWC in the Press</h2>
  <a href="/press">All Press mentions</a>
  {% include press.html limit=2%}
{% endif %}