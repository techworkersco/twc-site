---
layout: page
title: Berlin Events
permalink: /berlin/events
---
{{page.title}}
<ul class="list">
{% assign events = (site.berlin_events | sort: 'date') | reverse %}  
{% for post in events %}
  <li class="list__item">
    <div class="list__item-inner">
      <a class="list__primary-content" href="{{ post.url }}">{{ post.title }}</a>: {{ post.date | date: '%d %B, %Y' }}
    </div>
  </li>
{% endfor %}
</ul>

<ul class="pagination">
  {% if paginator.previous_page %}
    <li>
      <a href="{{ paginator.previous_page_path }}"><span class="pagination__icon">◀</span> Previous</a>
    </li>
  {% endif %}
  {% if paginator.next_page %}
    <li>
      <a href="{{ paginator.next_page_path }}">Next <span class="pagination__icon">►</span></a>
    </li>
  {% endif %}
</ul>
