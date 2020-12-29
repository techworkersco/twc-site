---
layout: page
permalink: /press
---

# Press


<ul
class="list -no-list-style l-stack -vertical"
style="--stack-spacing: 1.5rem"
role="list">
  {% assign english_berlin_press = site.data.berlin_press | where:"lang",site.lang %}
  {% assign posts = site.data.press | concat: english_berlin_press | sort: 'date' | reverse %}
  {% for post in posts  %}
    <article class="event-card">
        <img
          class="event-card__icon"
          src="/assets/icons/news.svg"
          alt="Newspaper">
        <div
          class="event-card__info-column l-stack -vertical"
          style="--stack-spacing: 0.25rem">
          <div class="aside event-card__date" >
            {{post.media}} —
            <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | localize: site.lang, '%-d %B %Y' }}</time>
          </div>
          <h2 class="event-card__title ">
            <a hreflang="{{post.lang}}-DE" href="{{ post.url }}" class="event-card__link">{{ post.title }}</a>
          </h2>
        </div>
      </article>
  {% endfor %}
</ul>
