---
layout: page
title: Projects
permalink: /projects
---

<div class="projects-container">
  {% assign sorted_repos = site.data.github_repos | sort: "updated_at" | reverse %}
  {% for repo in sorted_repos %}
  <div class="project-card">
    <div class="project-header">
      <h3 class="project-title">
        <a href="/projects/{{ repo.name }}">{{ repo.name }}</a>
      </h3>
      <div class="project-meta">
        {% if repo.language %}
        <span class="badge badge-language">{{ repo.language }}</span>
        {% endif %}
        {% if repo.stars > 0 %}
        <span class="badge badge-stars">⭐ {{ repo.stars }}</span>
        {% endif %}
      </div>
    </div>
    
    <p class="project-description">{{ repo.desc }}</p>
    
    <div class="project-footer">
      <small class="text-muted">Updated: {{ repo.updated_at }}</small>
      <a href="/projects/{{ repo.name }}" class="btn btn-sm btn-primary">view details</a>
      <a href="{{ repo.url }}" class="btn btn-sm btn-outline" target="_blank">github</a>
    </div>
  </div>
  {% endfor %}
</div>