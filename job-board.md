---
layout: page
title: Job Board
namespace: job-board
permalink: /job-board/
---

<h1 class="lh-tight marg-b-3 marg-t-2">Job Board 🌹</h1>

<p>
  More and more tech-driven organizations are unionizing. This is an incomplete list of
  workplaces with an active union. Some of these workplaces haven't recognized their
  unions yet, or contracts have not been signed between the union and the workplace.
  Know of another one? <a href="https://github.com/techworkersco/twc-site/tree/master/_workplaces">Please add it</a>.
</p>

<h2 class="marg-b-2">Active tech unions and campaigns</h2>
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
          See all jobs
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </div>
    </li>
  {% endfor %}
</ul>
