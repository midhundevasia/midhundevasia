#!/bin/bash

# Update GitHub Projects
# This script fetches the latest projects from GitHub and regenerates project pages

set -e

echo "🔄 Updating GitHub projects..."
echo ""

# Change to project root directory
PROJECT_ROOT="$(dirname "$0")/.."
cd "$PROJECT_ROOT"

# Fetch latest repos from GitHub
echo "📥 Fetching repositories from GitHub..."
bundle exec ruby scripts/fetch_github_repos.rb

echo ""

# Fetch README content for all repos
echo "📖 Fetching README content..."
bundle exec ruby scripts/fetch_readmes.rb

echo ""
# Generate project detail pages
echo "📝 Generating project detail pages..."
bundle exec ruby scripts/generate_project_pages.rb

echo ""
echo "✅ Projects updated successfully!"
echo ""
echo "Next steps:"
echo "1. Build the site: bundle exec jekyll build"
echo "2. Or serve locally: bundle exec jekyll serve"
