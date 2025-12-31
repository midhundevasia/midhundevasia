# AI Coding Instructions for midhundev.asia

## Project Overview
This is Midhun Devasia's personal website built with Jekyll and hosted on GitHub Pages. It features a dynamic project portfolio that auto-syncs with GitHub repositories, event tracking, and blog functionality.

## Architecture & Data Flow

### Dynamic Project System
- **`scripts/fetch_github_repos.rb`** fetches public repos via Octokit API → **`_data/github_repos.yml`**
- **`scripts/fetch_readmes.rb`** downloads README content for each repo
- **`scripts/generate_project_pages.rb`** creates individual project pages at `/pages/projects/{repo-name}.md`
- **`_layouts/project.html`** renders project details by matching `page.project_name` with `site.data.github_repos`

### Event Management
- Events stored in **`assets/events/2024.yaml`** and **`assets/events/2026.yaml`**
- JavaScript in **`assets/js/events.js`** handles dynamic filtering and display
- **`pages/events/`** contains year-specific pages that include the event data

## Critical Workflows

### Project Updates
```bash
make update-projects  # Runs scripts/update_projects.sh
# OR manually:
bundle exec ruby scripts/fetch_github_repos.rb
bundle exec ruby scripts/fetch_readmes.rb  
bundle exec ruby scripts/generate_project_pages.rb
```

### Development
```bash
make serve    # Start local server with live reload
make build    # Generate _site/ for production
make clean    # Remove build artifacts
```

## Project-Specific Conventions

### Content Organization
- **Posts**: `_posts/blog/YYYY/` and `_posts/art/YYYY/` (currently empty but structured)
- **Pages**: `pages/*.md` for main navigation items
- **Projects**: Auto-generated in `pages/projects/` - never edit manually
- **Events**: YAML files in `assets/events/` with date, title, link structure

### Layout Hierarchy
- `default.html` → base layout with Bootstrap 4
- `page.html` → extends default for static pages  
- `project.html` → extends page for GitHub project details
- `home.html` → extends default for index page

### Data Binding Patterns
- Projects use `{% assign repo = site.data.github_repos | where: "name", page.project_name | first %}`
- Events loaded via `{% assign events = site.data[page.events_year] %}`
- All layouts expect specific frontmatter variables (see existing pages for examples)

### Custom Plugins & Dependencies
- Uses `jekyll-avatar` for GitHub profile images
- Custom GitHub repo fetching replaces `jekyll-github-repos` plugin
- Bootstrap 4 via `_sass/bootstrap/` (not CDN)
- Google Analytics via `site.google_analytics`

## Integration Points
- **GitHub API**: Authenticated via environment or local config for rate limits
- **Disqus**: Comments system (see `_includes/disqus_comments.html`)
- **Social Media**: Handles in `_config.yml` used across layouts

## File Modification Guidelines
- Never manually edit `_data/github_repos.yml` or `pages/projects/*.md` (auto-generated)
- Add new events to appropriate `assets/events/YYYY.yaml` files
- New blog posts go in `_posts/blog/YYYY/YYYY-MM-DD-title.md` format
- Custom styles in `assets/main.scss` which imports Bootstrap and Minima