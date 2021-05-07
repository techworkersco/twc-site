---
layout: page
title: Job Board
namespace: job-board
permalink: /job-board/
languages: ["en"]
---

<h1 class="lh-tight marg-b-3 marg-t-2">{% t job_board.title %}</h1>

<h2 class="marg-b-4">{% t job_board.workplaces %}</h2>

<p>{% t job_board.intro_to_unionized_workplaces %}</p>

{% for workplace in site.workplaces %}

  <h3>{{ workplace.organization }} {% if workplace.division %} - {{workplace.division }} {% endif %}</h3>

<p>Union: {{ workplace.union }} </p>
{% assign content = workplace.content | strip_newlines %}
{% if content != "" %}
  {{content}}
{% endif %}
<p>
{% if workplace.union_twitter %}<a href="https://twitter.com/{{ worplace.union_twitter }}">@{{ workplace.union_twitter }}</a>{% endif %} 
{% if workplace.union_website %}<a href="https://twitter.com/{{ worplace.union_website }}">website</a>{% endif %}
</p>
<a href="{{ workplace.job_listings }}">{% t job_board.see_jobs %}&nbsp;></a>
{% endfor %}
