---
layout: page
title: Blog
permalink: /blog
---
{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

<div class="blog-list">
{% for post in site.posts %}
<div class="blog-item">
  <small class="blog-date">{{ post.date | date: date_format }}</small>
  <a href="{{ post.url }}" class="blog-link">{{ post.title }}</a>
</div>
{% endfor %}
</div>