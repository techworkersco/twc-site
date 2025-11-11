# TWC Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/9ea4d7f9-fe8b-438b-b972-c3ba1076eae2/deploy-status)](https://app.netlify.com/sites/techworkersco/deploys)

This repository is responsible for most content visible on the website [techworkerscoalition.org](https://techworkerscoalition.org). The site is made with a static site generator called [Jekyll](https://jekyllrb.com/) in a language called Ruby.

## Getting Started

1. Install dependencies: `bundle install`
2. Start a local server: `bundle exec jekyll serve`

Open a browser to localhost:8080

## DecapCMS

In addition to GitHub, you can update the website via [DecapCMS](https://decapcms.org/) for example adding new blog posts and events by going to [/admin](https://techworkerscoalition.org/admin) interface. For local development, visit this [tutorial](https://decapcms.org/docs/working-with-a-local-git-repository/) (run `npx decap-server` from a different shell)

## Add your city

If your country/city's TWC chapter is not mentioned in the website, link to it on the homepage [here](_layouts/home.html) and if you want a local markdown page (as opposed to external link) see the other examples [here](city_local).

## Add a press mention

Inside [`_data/press.yml`](_data/press.yml) file, add a media entry, with date format in `YYYY-MM-DD`

### Supported Pages

- Landing Page [index.md](index.md)
- Community Guide [guide.md](guide.md)
