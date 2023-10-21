---
layout: page
title: Projects
permalink: /projects
---

<div class="row">
{% for repo in site.data.github_repos %}

<div class="col-12 ">
    <div class="card-body border mb-3">
        <h5 class="card-title"><a href="{{ repo.url }}">{{ repo.name }}</a></h5>
        <p class="card-text">{{ repo.desc }}<br>
        <small>Created: {{ repo.created_at }}</small>
        </p>
    </div>
</div>
{% endfor %}
</div>
