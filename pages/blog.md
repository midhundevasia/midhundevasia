---
layout: page
title: Blog
permalink: /blog
---
{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

{% for post in site.posts %}
<div>
  <small class="text-muted pr-5">{{ post.date | date: date_format }} </small> <a href="{{ post.url }}">{{ post.title }}</a>
</div>
{% endfor %}