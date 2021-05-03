---
layout: page
title: Job Board
namespace: job-board
permalink: /job-board/
languages: ["en"]
---

<h1 class="lh-tight marg-b-3">{% t job_board.title %}</h1>

<h2 class="marg-b-4">{% t job_board.unionized_workplaces %}</h2>

<p>{% t job_board.intro_to_unionized_workplaces %}</p>

{% for workplace in site.unionized_workplaces %}

  <h3>{{ workplace.organization }} {% if workplace.division %} - {{workplace.division }} {% endif %}</h3>

<p>Union: {{ workplace.union }} </p>
<p>
{% if workplace.union_twitter %}<a href="https://twitter.com/{{ worplace.union_twitter }}">@{{ workplace.union_twitter }}</a>{% endif %} 
{% if workplace.union_website %}<a href="https://twitter.com/{{ worplace.union_website }}">website</a>{% endif %}
</p>
<a href="{{ workplace.job_listings }}">{% t job_board.see_jobs %}&nbsp;></a>
{% endfor %}
