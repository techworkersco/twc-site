---
layout: page
permalink: /press/
title: Press
---

<h1 class="marg-b-4">{{page.title}}</h1>

<ul>
  {% assign english_berlin_press = site.data.berlin_press | where:"lang",site.lang %}
  {% assign posts = site.data.press | concat: english_berlin_press | sort: 'date' | reverse %}
  {% for post in posts  %}
    <article class="marg-b-4 flex">
        <img
          alt="Newspaper icon"
          aria-hidden
          class="marg-r-3 press-icon"
          role="presentation"
          src="/assets/icons/news.svg"
          width="32">
        <div>
          <div>
            {{post.media}} —
            <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
              {{ post.date | localize: site.lang, '%-d %B %Y' }}
            </time>
          </div>
          <h2>
            <a href="{{ post.url }}">
              {{ post.title }}
            </a>
          </h2>
        </div>
      </article>
  {% endfor %}
</ul>
