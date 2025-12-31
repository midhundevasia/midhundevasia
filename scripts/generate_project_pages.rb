#!/usr/bin/env ruby

require 'yaml'

# Load repos data (relative to project root)
project_root = File.expand_path('..', __dir__)
repos_file = File.join(project_root, '_data', 'github_repos.yml')
repos = YAML.load_file(repos_file)

# Create projects directory
projects_dir = File.join(project_root, 'pages', 'projects')
Dir.mkdir(projects_dir) unless File.directory?(projects_dir)

# Generate a detail page for each repo
repos.each do |repo|
  filename = File.join(projects_dir, "#{repo['name']}.md")
  
  content = <<~CONTENT
    ---
    layout: project
    title: "#{repo['name']}"
    project_name: #{repo['name']}
    permalink: /projects/#{repo['name']}
    ---
  CONTENT
  
  File.write(filename, content.strip)
  puts "✓ Created: pages/projects/#{repo['name']}.md"
end

puts "\n✓ Generated #{repos.length} project detail pages"
