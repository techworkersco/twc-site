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
  <p>We’re a democratically structured, all-volunteer, and worker-led organization.</p>
  <nav style="font-size: clamp(0.875rem, 0.7216rem + 0.6818vw, 1.25rem)">
    <ul>
      <li><a href="/subscribe" class="button primary">Get Involved</a></li>
      <li><a href="/chapters" class="button">Find a Local Chapter</a></li>
    </ul>
  </nav>
  <p>
    You can also <a href="mailto:hello@techworkerscoalition.org">reach us by email.</a>
  </p>
</div>

<section>
  {% include events.html limit=5 %}
</section>

<section>
  {% include blog.html limit=3 %}
</section>

<section>
  <h2>TWC in the Press</h2>
  {% include press.html limit=2%}

  <a href="/press" class="button">All Press mentions</a>
</section>
