---
layout: default
namespace: home
permalink: /
---

<h1 class="lh-tight marg-b-3">{% t home.title %}</h1>
<h2 class="grey marg-b-4">{% t home.summary %}</h2>

<div class="marg-b-3 p-3 bg-black">
  <h3 class="white">{% t home.black_lives_matter.title %}</h3>
  <p>{% t home.black_lives_matter.description %}</p>
</div>

<h3>{% t home.who_we_are.title %}</h3>
<p>{% t home.who_we_are.description %}</p>

<h3>{% t home.why_we_organize.title %}</h3>
<p>{% t home.why_we_organize.description %}</p>

<h3>{% t home.who_we_support.title %}</h3>
<p>{% t home.who_we_support.description %}</p>

<h3>{% t home.how_we_work.title %}</h3>
<p>{% t home.how_we_work.description %}</p>

<h3>{% t home.check_out_meeting.title %}</h3>
<p>{% t home.check_out_meeting.locations %}</p>

<div class="marg-b-4">
  <h3>{% t home.contact_us.title %}</h3>
  {% t home.contact_us.description %}
</div>

{% if site.lang == 'en' %}
  {% include collective-actions.html %}
{% endif %}
