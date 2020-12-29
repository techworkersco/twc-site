require "jekyll"
require 'json'
require 'deep_merge'
require 'open-uri'
# require 'pry'

module JekyllGetData
  class GetDataGenerator < Jekyll::Generator
    safe true
    priority :highest
    @ran_once = false

    def generate(site)
      return if @ran_once
      puts "Initializing jekyll_get_data plugin"
      config = site.config['jekyll_get_data']
      return  warn "No config".yellow unless config

      config.each do |d|
        begin
          loaded_content = URI.open(d['url'])
          if d['url'].end_with?('json')
            source = JSON.load loaded_content
          elsif d['url'].end_with?(*%w(yml yaml))
            source = YAML.load(loaded_content.read)
          end

          # @ran_once = true
          if source
            puts "Loading source: #{d['url']}".green
          else
            warn "source #{d['url']} not found".red
          end

          site.data[d['data']] = source
        end
      end
      @ran_once = true
    end
  end
end
