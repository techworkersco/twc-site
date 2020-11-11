---
layout: page
title: Join a Chapter
permalink: /chapters/
---

{% for region in site.data.chapters.regions %}
  {% include chapters.html region=region.region chapters=region.chapters %}
{% endfor %}
