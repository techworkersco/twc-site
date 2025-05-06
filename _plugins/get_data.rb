require "jekyll"
require 'json'
require 'deep_merge'
require 'open-uri'

module JekyllGetData
  class GetDataGenerator < Jekyll::Generator
    attr_accessor :external_data
    safe true
    priority :highest

    def initialize(_plugin)
      @external_data = {}
    end

    def generate(site)
      site.data.deep_merge(external_data)
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
            source = YAML.load(
              loaded_content.read,
              permitted_classes: [Date, Time]
            )
          end

          if source
            puts "Loading source: #{d['url']}".green
          else
            warn "source #{d['url']} not found".red
          end

          external_data[d['data']] = source
        end
      end

      site.data.deep_merge(external_data)
      @ran_once = true
    end
  end
end
