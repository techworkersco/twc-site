---
layout: page
title: Job Board
namespace: job-board
permalink: /job-board/
languages: ["en"]
---

<h1 class="lh-tight marg-b-3 marg-t-2">{% t job_board.title %}</h1>

<p>{% t job_board.intro_to_unionized_workplaces %}</p>

<h2 class="marg-b-2">{% t job_board.workplaces %}</h2>
<ul class="job-board">
  {% for workplace in site.data.workplaces %}
    <li>
      <h3>
        {{ workplace.organization }}
        {% if workplace.division %}
          - {{workplace.division }}
        {% endif %}
      </h3>

      <div><strong>✊ Union:</strong> {{ workplace.union }}</div>

      {% assign content = workplace.content | strip_newlines %}
      {% if content != "" %}
        {{content}}
      {% endif %}

      <p>
        {% if workplace.union_twitter %}
          <a href="https://twitter.com/{{ workplace.union_twitter }}">@{{ workplace.union_twitter }}</a>
        {% endif %}

        {% if workplace.union_website %}
          (<a href="{{ workplace.union_website }}">website</a>)
        {% endif %}
      </p>

      <div class="flex">
        <a href="{{ workplace.job_listings }}" class="button">
          {% t job_board.see_jobs %}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </div>
    </li>
  {% endfor %}
</ul>
