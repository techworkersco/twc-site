---
layout: page
title: Job Board
namespace: job-board
permalink: /job-board/
---

<h1 class="lh-tight marg-b-3 marg-t-2">Job Board 🌹</h1>

<h2 class="marg-b-4">Active tech unions and campaigns</h2>

<p>
  <p>
  More and more tech-driven organizations are unionizing. This is an incomplete list of
  workplaces with an active union. Some of these workplaces haven't recognized their
  unions yet, or contracts have not been signed between the union and the workplace.
  Know of another one? <a href="https://github.com/techworkersco/twc-site/tree/master/_workplaces">Please add it</a>.
  </p>
</p>

{% for workplace in site.data.workplaces %}

  <h3>{{ workplace.organization }} {% if workplace.division %} - {{workplace.division }} {% endif %}</h3>

<p>Union: {{ workplace.union }} </p>
{% assign content = workplace.content | strip_newlines %}
{% if content != "" %}
  {{content}}
{% endif %}
<p>
{% if workplace.union_twitter %}<a href="https://twitter.com/{{ workplace.union_twitter }}">@{{ workplace.union_twitter }}</a>{% endif %}
{% if workplace.union_website %}(<a href="{{ workplace.union_website }}">website</a>){% endif %}
</p>
<a href="{{ workplace.job_listings }}">See all jobs&nbsp;></a>
{% endfor %}
