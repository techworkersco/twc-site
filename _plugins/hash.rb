require "jekyll"
require 'securerandom'

$nonce = SecureRandom.uuid()

module Jekyll
  class RenderNonce < Liquid::Tag

    def render(context)
      "#{$nonce}"
    end
  end
end

Liquid::Template.register_tag('nonce', Jekyll::RenderNonce)
