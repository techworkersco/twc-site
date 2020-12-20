---
layout: default
namespace: home
permalink: /
languages: ["en", "es", "fr", "it", "pt", "ru"]
---

<h1 class="lh-tight marg-b-3">{% t home.title %}</h1>
<h2 class="marg-b-4">{% t home.summary %}</h2>

{% if site.lang == 'en' %}
<div class="marg-b-3 p-3 secondaryBg">
  <h3>{% t home.looking_for_union.title %}</h3>
  <p>{% t home.looking_for_union.description %}</p>
</div>
{% endif %}

<h3>{% t home.who_we_are.title %}</h3>
<p>{% t home.who_we_are.description %}</p>

<h3>{% t home.who_we_support.title %}</h3>
<p>{% t home.who_we_support.description %}</p>

<h3>{% t home.how_we_work.title %}</h3>
<p>{% t home.how_we_work.description %}</p>

<h3>{% t home.check_out_meeting.title %}</h3>
<p>{% t home.check_out_meeting.link %}</p>

<div class="marg-b-4">
  <h3>{% t home.contact_us.title %}</h3>
  {% t home.contact_us.description %}
</div>

{% if site.lang == 'en' %}
  {% include collective-actions.html %}
{% endif %}
