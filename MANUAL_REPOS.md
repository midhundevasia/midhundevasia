# Manual Repositories Guide

You can add repositories from other GitHub organizations or accounts without them being overwritten when you run `make update-projects`.

## How to Add Manual Repositories

To add a manual repository entry that won't be overwritten, add it to `_data/github_repos.yml` with `manual: true`:

```yaml
- name: my-org-project
  url: https://github.com/some-org/my-org-project
  desc: A project from another organization
  created_at: '2024-01-15'
  updated_at: '2025-12-30'
  language: TypeScript
  stars: 42
  forks: 5
  readme_url: https://raw.githubusercontent.com/some-org/my-org-project/main/README.md
  manual: true
```

## Important Fields

- **name**: Repository name (must be unique)
- **url**: GitHub repository URL
- **desc**: Repository description
- **created_at**: Creation date (YYYY-MM-DD format)
- **updated_at**: Last update date (YYYY-MM-DD format)
- **language**: Primary programming language (or "N/A")
- **stars**: Star count (number)
- **forks**: Fork count (number)
- **readme_url**: URL to fetch README from (usually `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md`)
- **manual: true**: This flag marks it as a manual entry and protects it from being overwritten

## Update Process

When you run `make update-projects`:

1. Fetches all your public repositories from GitHub
2. Loads existing manual entries (those with `manual: true`)
3. Merges both lists (automated + manual)
4. Removes duplicates (if same repo name exists, automated version takes precedence)
5. Removes the `manual` flag before saving
6. Saves everything to `_data/github_repos.yml`

## Example

To add a project from another organization:

```yaml
# Your personal repositories (auto-fetched)
- name: my-personal-project
  url: https://github.com/midhundevasia/my-personal-project
  # ... auto-generated fields ...

# A project from another organization (manual entry)
- name: awesome-project
  url: https://github.com/some-org/awesome-project
  desc: An awesome project from another org
  created_at: '2023-06-20'
  updated_at: '2025-12-15'
  language: Go
  stars: 156
  forks: 42
  readme_url: https://raw.githubusercontent.com/some-org/awesome-project/main/README.md
  manual: true
```

## Tips

- Keep the `manual: true` flag in the YAML file - it's removed during processing
- Use consistent formatting for dates (YYYY-MM-DD)
- You can get the correct `readme_url` by visiting the repo on GitHub and looking at the raw README URL
- Manual entries appear alongside your personal projects on `/projects`
