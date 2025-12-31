.PHONY: help update-projects build serve clean

help:
	@echo "Available commands:"
	@echo "  make update-projects    Fetch GitHub repos and regenerate project pages"
	@echo "  make build              Build the Jekyll site"
	@echo "  make serve              Serve the site locally"
	@echo "  make clean              Clean the build directory"

# Update projects from GitHub
update-projects:
	@echo "🔄 Updating GitHub projects..."
	@./scripts/update_projects.sh

# Build the Jekyll site
build:
	@echo "🔨 Building Jekyll site..."
	@bundle exec jekyll build

# Serve the site locally
serve:
	@echo "🚀 Starting Jekyll server..."
	@bundle exec jekyll serve

# Clean build files
clean:
	@echo "🧹 Cleaning build files..."
	@rm -rf _site
	@echo "✓ Build directory cleaned"
