'use strict';

const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const CronJob = require('cron').CronJob;

const trendingScraper = require('./lib/trending-scraper');
const TrendingDay = require('./models/TrendingDay');

const pino = require('pino')({
    name: config.logger.name,
    level: config.logger.level
});

mongoose.Promise = global.Promise;
const mongodbUri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`;
mongoose.connect(mongodbUri, {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE
});

const db = mongoose.connection;
db.on('error', (error) => {
    pino.error(error, 'Error while opening connection to Mongo');
});

const job = new CronJob(config.cron.pattern, () => {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    trendingScraper.scrapeIt()
        .then((repos) => {
            pino.trace(repos, 'Scraped repositories.');

            TrendingDay.findOne({
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            }, (err, trendingDay) => {
                if (err) {
                    pino.error(err, 'Error while trying to find in mongo.');
                    return err;
                } else {
                    if (trendingDay === null) {
                        trendingDay = new TrendingDay({
                            repositories: repos
                        });
                    } else {
                        trendingDay.repositories = repos;
                    }

                    trendingDay.save((err, day) => {
                        if (err) {
                            pino.error(err, 'Error while saving trendingday to mongo.');
                            return err;
                        } else {
                            pino.info('TrendingDay saved in Mongo.');
                        }
                    });
                }
            });

        })
        .catch((error) => {
            pino.error(error, 'Error while scraping repositories from Github.');
        });
}, () => {
    // Function is called when cronjob is stopped.
    pino.info('Cronjob stopped. If you see this the cronjob probably crashed..');
}, false, 'Europe/Amsterdam');

db.once('open', () => {
    // Start cronjob
    job.start();
});
