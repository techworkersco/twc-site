---
pagination:
  data: portland_events
  size: 1
  alias: event
permalink: "{{ event.url }}"
eleventyComputed:
  layout: "event.11ty.tsx"
  title: "{{ event.data.title }}"
---

{{ event.content }}
