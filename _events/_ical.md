---
pagination:
  data: ical_events
  size: 1
  alias: event
permalink: "{{ event.url }}"
eleventyComputed:
  title: "{{ event.data.title }}"
---

{{ event.content }}
