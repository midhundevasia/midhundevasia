#!/usr/bin/env ruby

require 'net/http'
require 'uri'
require 'yaml'
require 'timeout'

def fetch_readme(readme_url, repo_name)
  return nil if readme_url.nil? || readme_url.empty?
  
  # Try the provided URL first
  content = fetch_url(readme_url)
  return content if content
  
  # Try standard README.md with different branches
  branches = ['main', 'master', 'develop']
  branches.each do |branch|
    url = "https://raw.githubusercontent.com/midhundevasia/#{repo_name}/#{branch}/README.md"
    content = fetch_url(url)
    return content if content
  end
  
  nil
end

def fetch_url(url, timeout_sec = 3)
  begin
    Timeout.timeout(timeout_sec) do
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = uri.scheme == 'https'
      http.read_timeout = 2
      http.open_timeout = 2
      
      request = Net::HTTP::Get.new(uri.request_uri)
      response = http.request(request)
      
      return response.body if response.is_a?(Net::HTTPSuccess)
    end
  rescue => e
    # Silently fail and return nil
  end
  nil
end

# Load repos data
project_root = File.expand_path('..', __dir__)
repos_file = File.join(project_root, '_data', 'github_repos.yml')
repos = YAML.load_file(repos_file) || []

puts "📖 Fetching README content for #{repos.length} repositories..."

repos.each_with_index do |repo, idx|
  repo_name = repo['name']
  readme_url = repo['readme_url']
  
  print "  [#{idx + 1}/#{repos.length}] #{repo_name}... "
  
  content = fetch_readme(readme_url, repo_name)
  
  if content && content.length > 0
    repo['readme_content'] = content
    puts "✓ (#{content.length} bytes)"
  else
    repo['readme_content'] = nil
    puts "✗ (no content)"
  end
end

# Save updated repos file with README content
File.write(repos_file, repos.to_yaml)
puts "\n✓ README content saved to _data/github_repos.yml"
