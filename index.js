'use strict';

const config = require('./config');
const mongoose = require('mongoose');
const pino = require('pino')({
    name: config.logger.name,
    level: config.logger.level || 'trace'
});

const trendingScraper = require('./lib/trending-scraper');
const TrendingDay = require('./models/TrendingDay');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gitpoint', { useMongoClient: true });
const db = mongoose.connection;
db.on('error', (error) => {
    pino.error(error, 'Error while opening connection to Mongo');
});

db.once('open', () => {
    trendingScraper.scrapeIt()
        .then((repos) => {
            pino.trace(repos, 'Scraped repositories');

            const day = new TrendingDay({
                repositories: repos
            });

            day.save((err, day) => {
                if (err) {
                    pino.error(err, 'Error while saving trendingday to mongo');
                    return err;
                } else {
                    pino.info('TrendingDay saved in Mongo.');
                    mongoose.disconnect();
                }
            });
        })
        .catch((error) => {
            pino.error(error, 'Error while scraping repositories from Github');
        });
});
