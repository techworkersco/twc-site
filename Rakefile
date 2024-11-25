require 'html-proofer'

task default: [:test]

task :test do
  sh "bundle exec jekyll build"
  options = { :assume_extension => true, disable_external: true, extension: ['.html'], check_internal_hash: false }
  HTMLProofer.check_directory("./_site", options).run
end
