require "jekyll"
require 'json'
require 'deep_merge'
require 'open-uri'

module JekyllGetJson
  class GetJsonGenerator < Jekyll::Generator
    safe true
    priority :highest
    @ran_once = false

    def generate(site)
      return if @ran_once
      puts "Initializing jekyll_get_json plugin"
      config = site.config['jekyll_get_json']
      if !config
      return  warn "No config".yellow unless config
      end

      if !config.kind_of?(Array)
        config = [config]
      end

      config.each do |d|
        begin
          target = site.data[d['data']]
          source = JSON.load(URI.open(d['json']))
          @ran_once = true
          if source
            puts "Loading source: #{d['json']}"
          else
            warn "source #{d['json']} not found".red
          end

          if target
            target.deep_merge(source)
          else
            site.data[d['data']] = source
          end
        end
      end
    end
  end
end
