'use strict';

const trendingScraper = require('./lib/trending-scraper');

trendingScraper.scrapeIt()
    .then((repos) => {
        console.log(repos);
    })
    .catch((error) => {
        console.error(error);
    });
