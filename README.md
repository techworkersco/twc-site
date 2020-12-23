# TWC Site
[![Build Status](https://travis-ci.com/techworkersco/twc-site.svg?branch=develop)](https://travis-ci.com/techworkersco/twc-site)

This repository is responsible for most content visible on the website [techworkerscoalition.org](https://techworkerscoalition.org). The site is made with a static site generator called [Jekyll](https://jekyllrb.com/) in a language called Ruby.

## Getting Started

1. Install dependencies: `bundle install`
2. Start a local server: `bundle exec jekyll serve`

Open a browser to localhost:8080

## Add your city

If your country/city's TWC chapter is not mentioned in the website, link to it on the homepage [here](_layouts/home.html) and if you want a local markdown page (as opposed to external link) see the other examples [here](city_local).

## Translation

I18n (internationalization) is made available with the [jekyll-multiple-languages-plugin](https://github.com/kurtsson/jekyll-multiple-languages-plugin/). When a page has a translated version available, a link will show up on the top right if you use the [default_translate](_layouts/default_translate.html) layout. English is the default language, while other languages have their two letter ISO code prefixed, for example [TechWorkersCoalition.org/ru](https://TechWorkersCoalition.org/ru) for Russian.

### Adding new language
1. Add new language key to [en.yml](_i18n/en.yml)
2. Add two letter iso code in [config](_config.yml). The order here determines the order shown on the page. English must be first.
3. Inside the [i18n](_i18n) directory create a
  - `LANGUAGE/` (where LANGUAGE is two letter ISO code for that language)
  - `LANGUAGE.yml` with the language key and value in its own language, for example `es: Español`

Note, only the default [en.yml](_i18n/en.yml) must contain the names of each language. The other language yml files contain just their own language key.

![Screen Shot 2019-07-21 at 14 48 46](https://user-images.githubusercontent.com/7111514/61591397-cb0cd180-abc6-11e9-9876-1577d5c8b4bd.png)

To include only certain languages, specify the exact language keys you want inside the page front matter. For example `languages: ["en", 'ja']` 

### Supported Pages
* Landing Page [index.md](index.md)
* Community Guide [_i18n/en/guide.md](_i18n/en/guide.md) and [guide.md](guide.md)

### Supported Languages
* English
* Russian
* Portuguese
* Italian
* Portuguese (BR)
* Spanish (ES)
