
# GitPoint - API - Trending Scraper
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Build Status](https://travis-ci.org/RolfKoenders/gitpoint-api-trending-scraper.svg?branch=master)](https://travis-ci.org/RolfKoenders/gitpoint-api-trending-scraper)
[![Dependency Status](https://dependencyci.com/github/RolfKoenders/gitpoint-api-trending-scraper/badge)](https://dependencyci.com/github/RolfKoenders/gitpoint-api-trending-scraper)

> This project is part of the [GitPoint API]((https://github.com/RolfKoenders/gitpoint-api-docs)). More info about the GitPoint API can be found [here](https://github.com/RolfKoenders/gitpoint-api-docs).

## Introduction
[GitPoint](https://github.com/gitpoint/git-point) is a Github app build in react-native. A feature requests was to add Github trending to the app. Which is of course really cool but Github does not provide an api to retrieve the trending repositories. This is where the GitPoint API idea was born.

This scraper is `scraping` all the trending repositories of the Github trending page and stores them in a MongoDB database. The [GitPoint API](https://github.com/RolfKoenders/gitpoint-api) is used to retrieve them.

## Data model
At this moment we only scrape the repositories which are trending 'Today'. We save them with the following model to a mongo collection.
```javascript
{
    date: {
        type: Date,
        default: Date.now
    },
    repositories: [{
        position: Number,
        namespace: String,
        name: String,
		description: String,
        language: String,
        totalStars: String,
        starsToday: String,
        forks: String
    }]
}
```

## Running

### Prerequisites
- Docker && docker-compose

To run the scraper locally use `docker-compose`
```bash
$ docker-compose up --build
```

This launches a container running MongoDB and a container with the scraper. The scraper is running based on a cronjob pattern. _The default pattern is every minute._

## Configuration
To customize the configuration you can use the following environment variables.

| env           | description                        | default         | required |
|---------------|------------------------------------|-----------------|----------|
| LOGGER_NAME   | Name of the logger.                | TrendingScraper | ✓        |
| LOGGER_LEVEL  | The level of the logger to output. | error           | ✓        |
| MONGODB_HOST  | Host of the mongodb instance       | -               | ✓        |
| MONGODB_PORT  | Port of the mongodb instance       | -               | ✓        |
| MONGODB_DB    | Database to use                    | gitpoint        | ✓        |
| CRON_PATTERN  | Cronjob pattern for the scraper    | `'0 * * * * *'` | ✓        |
| CRON_TIMEZONE | Time zone of the cronjob           | -               | ✓        |
| HTTP_PORT     | Port for the HTTP server.          | 1337            | ✓        |

## HTTP Actions
There is a HTTP server which can be used to trigger a scrape action and to check if the application is launched / still running.

### GET /scrape
Will trigger the scraper.

### GET /health
Returns 200 'OK' if running.
