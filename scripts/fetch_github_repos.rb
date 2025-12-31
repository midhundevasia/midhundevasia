#!/usr/bin/env ruby

require 'octokit'
require 'yaml'
require 'set'

# Fetch public repositories
client = Octokit::Client.new(per_page: 100)
username = 'midhundevasia'

repos = client.repos(username, type: 'public', sort: 'updated')

# Format data for Jekyll
repos_data = repos.map do |repo|
  {
    'name' => repo.name,
    'url' => repo.html_url,
    'desc' => repo.description || 'No description',
    'created_at' => repo.created_at.strftime('%Y-%m-%d'),
    'updated_at' => repo.updated_at.strftime('%Y-%m-%d'),
    'language' => repo.language || 'N/A',
    'stars' => repo.stargazers_count,
    'forks' => repo.forks_count,
    'readme_url' => "https://raw.githubusercontent.com/#{username}/#{repo.name}/main/README.md"
  }
end

# Load existing manual entries
project_root = File.expand_path('..', __dir__)
data_dir = File.join(project_root, '_data')
Dir.mkdir(data_dir) unless File.directory?(data_dir)

repos_file = File.join(data_dir, 'github_repos.yml')
existing_data = File.exist?(repos_file) ? YAML.load_file(repos_file) : []

# Find manually added repos (marked with 'manual: true')
manual_repos = existing_data.select { |repo| repo['manual'] == true }

# Combine: automated repos + manual repos
# Manual repos should not be overwritten by automated ones
all_repos = repos_data + manual_repos

# Remove duplicates: keep manual repos for duplicates, automated for non-duplicates
final_repos = []
seen_names = Set.new

manual_names = Set.new(manual_repos.map { |repo| repo['name'] })

# Add all manual repos first (they take priority)
manual_repos.each do |repo|
  final_repos << repo
  seen_names.add(repo['name'])
end

# Add automated repos that aren't already in manual list
repos_data.each do |repo|
  unless seen_names.include?(repo['name'])
    final_repos << repo
    seen_names.add(repo['name'])
  end
end

# Save to YAML file
File.write(repos_file, final_repos.to_yaml)

puts "✓ Fetched #{repos_data.length} repositories from GitHub"
puts "✓ Merged with #{manual_repos.length} manual entries"
puts "✓ Total repositories: #{final_repos.length}"
puts "✓ Saved to _data/github_repos.yml"

