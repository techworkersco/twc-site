# TWC Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/9ea4d7f9-fe8b-438b-b972-c3ba1076eae2/deploy-status)](https://app.netlify.com/sites/techworkersco/deploys)

This repository is responsible for most content visible on the website [techworkerscoalition.org](https://techworkerscoalition.org). The site is made with a static site generator called [Jekyll](https://jekyllrb.com/) in a language called Ruby.

## Getting Started

1. Install dependencies: `bundle install`
2. Start a local server: `bundle exec jekyll serve`

Open a browser to localhost:8080

## Join
* When users fill out the [/subscribe](https://techworkerscoalition.org/subscribe/) form, they are invited to check out our [community guidelines](https://techworkerscoalition.org/community-guide/)
* After submitting the form, they are redirected to [/welcome](https://techworkerscoalition.org/welcome) which explains next steps.
* Under the hood, the website uses "Netlify form" and if it's not spam, will trigger automated integration requests to ActionNetwork (newsletter subscription), Slack (for manual verification)

## DecapCMS

In addition to GitHub, you can update the website via [DecapCMS](https://decapcms.org/).
* Future improvements can include navigation links and static pages, for example the [Merchandise page](https://techworkerscoalition.org/merch/)
* Feedback on making the DecapCMS more intuitive and friendly is always welcome. Create a GitHub issue, contact support@techworkerscoalition.org or ping us in our Slack channel #twc-infrastructure
* For local development, visit this [tutorial](https://decapcms.org/docs/working-with-a-local-git-repository/) (run `npx decap-server` from a different shell)

## Add your city

If your TWC chapter is not mentioned in the website, update the [chapter page](_data/chapters.yaml). Internal files can also be stored in [chapter_local folder](chapter_local)

## Add a press mention
* TWC mentioned in the media or update? Create a media entry, with date format in `YYYY-MM-DD`
* Update entry in [`_data/press.yml`](_data/press.yml) 
