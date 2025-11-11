# TWC Site
[![Netlify Status](https://api.netlify.com/api/v1/badges/9ea4d7f9-fe8b-438b-b972-c3ba1076eae2/deploy-status)](https://app.netlify.com/sites/techworkersco/deploys)

This repository is responsible for most content visible on the website [techworkerscoalition.org](https://techworkerscoalition.org). The site is made with a static site generator called [Jekyll](https://jekyllrb.com/) in a language called Ruby.

## Getting Started

1. Install dependencies: `bundle install`
2. Start a local server: `bundle exec jekyll serve`

Open a browser to localhost:8080

## Join
* When users fill out the [/subscribe]([url](https://techworkerscoalition.org/subscribe/)) form, they are invited to check out our [community guidelines]([url](https://techworkerscoalition.org/community-guide/))
* After submitting the form, they are redirected to [/welcome]([url](https://techworkerscoalition.org/welcome) which explains next steps.
* Under the hood, the website uses "Netlify form" and if it's not spam, will trigger Zapier integration requests to ActionNetwork (newsletter subscription), Slack (for manual verification)

## DecapCMS

In addition to GitHub, you can update the website via [DecapCMS](https://decapcms.org/) for example adding new blog posts and events by going to [/admin](https://techworkerscoalition.org/admin) interface. 
* The [/admin](https://techworkerscoalition.org/admin) interface allows anyone with a Gmail or GitHub account to create/edit existing event and blog posts.
* Future improvements can include navigation links and static pages, for example the [Merchandise page]([url](https://techworkerscoalition.org/merch/))
* Feedback on making the DecapCMS more intuitive and friendly is always welcome. Create a GitHub issue, contact support@techworkerscoalition.org or ping us in our Slack channel #twc-infrastructure
* For local development, visit this [tutorial](https://decapcms.org/docs/working-with-a-local-git-repository/) (run `npx decap-server` from a different shell)

## Add your city

If your TWC chapter is not mentioned in the website, update the [chapter page](_data/chapters.yaml). Internal files can also be stored in [chapter_local folder](chapter_local)

## Add a press mention
* TWC mentioned in the media or update? Create a media entry, with date format in `YYYY-MM-DD`
* Update entry in [`_data/press.yml`](_data/press.yml) 

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


### Supported Languages
* English
* Russian
* Portuguese
* Italian
* Portuguese (BR)
* Spanish (ES)
