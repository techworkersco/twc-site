---
layout: page
title: Job Board
namespace: job-board
permalink: /job-board/
languages: ["en"]
---

<h1 class="lh-tight marg-b-3">{% t job_board.title %}</h1>

<h2 class="marg-b-4">{% t job_board.unionized_workplaces %}</h2>

{% for workplace in site.unionized_workplaces %}

  <h3>{{ workplace.organization }} - {{workplace.division }}</h3>

{% if workplace.union_twitter %}

<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

Union: <a href="https://twitter.com/{{ worplace.union_twitter }}">
@{{ workplace.union_twitter }}
</a>

{% endif %}  
<a href="{{ workplace.job_listings }}">{% t job_board.see_jobs %}&nbsp;></a>
{% endfor %}
