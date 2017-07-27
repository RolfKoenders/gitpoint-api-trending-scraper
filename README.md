
# GitPoint - API - Trending Scraper
> This project is part of the [GitPoint API]((https://github.com/RolfKoenders/gitpoint-api-docs)). More info about the GitPoint API can be found [here](https://github.com/RolfKoenders/gitpoint-api-docs).

## Introduction
[GitPoint](https://github.com/gitpoint/git-point) is a Github app build in react-native. A incoming feature requests was to add Github trending to the app. Which is of course really cool but Github does not provide an api to retrieve the trending repositories. This is where the GitPoint API idea was born.

This scraper is `scraping` all the trending repositories of the Github trending page and stores them in a MongoDB database. The actual API layer is used to retrieve them by HTTP requests. _(The API is still wip)_.

## Model
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
        language: String,
        totalStars: Number,
        starsToday: Number,
        forks: Number
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

| env          | description                        | default         | required |
|--------------|------------------------------------|-----------------|----------|
| LOGGER_NAME  | Name of the logger.                | TrendingScraper | ✓        |
| LOGGER_LEVEL | The level of the logger to output. | error           | ✓        |
| MONGODB_HOST | Host of the mongodb instance       | -               | ✓        |
| MONGODB_PORT | Port of the mongodb instance       | -               | ✓        |
| MONGODB_DB   | Database to use                    | gitpoint        | ✓        |
| CRON_PATTERN | Cronjob pattern for the scraper    | `'0 * * * * *'` | ✓        |

