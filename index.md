---
layout: default
namespace: home
permalink: /
languages: ["en", "es", "fr", "it", "pt", "ru"]
---

<h1 class="lh-tight marg-b-3">{% t home.title %}</h1>
<h2 class="p-3 marg-b-1 secondaryBg">{% t home.summary %}</h2>

<div class="p-3 marg-b-2 secondaryBg">
  <h3>{% t home.who_we_are.title %}</h3>
  <p>{% t home.who_we_are.description %}</p>
</div>
<div class="p-3 marg-b-2 secondaryBg">
  <h3>{% t home.who_we_support.title %}</h3>
  <p>{% t home.who_we_support.description %}</p>
</div>
<div class="p-3 marg-b-2 secondaryBg">
  <h3>{% t home.how_we_work.title %}</h3>
  <p>{% t home.how_we_work.description %}</p>
</div>
<div class="p-3 marg-b-2 secondaryBg">
  <h3>{% t home.check_out_meeting.title %}</h3>
  <p>{% t home.check_out_meeting.link %}</p>
</div>
<div class="p-3 marg-b-2 secondaryBg">
  <h3>{% t home.contact_us.title %}</h3>
  {% t home.contact_us.description %}
</div>

<h2>{% t home.events.title %}</h2>
{% include events.html limit=5 %}

{% if site.lang == 'en' %}
  <h2>Blog Posts</h2>
  {% include blog.html limit=2 %}
  {% include newsletter.html limit=2 %}
  <h2 class="txt-2"> TWC in the Press</h2>
  <a href="/press">All Press mentions</a>
  {% include press.html limit=2%}
{% endif %}
