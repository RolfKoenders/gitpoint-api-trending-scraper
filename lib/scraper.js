'use strict';

const moment = require('moment');
const config = require('../config');
const logger = require('../utils/logger');
const githubScraper = require('./github-scraper');
const TrendingDay = require('../models/TrendingDay');

function scraper() {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    return githubScraper.scrapeIt()
        .then((repos) => {
            logger.trace(repos, 'Scraped repositories.');

            TrendingDay.findOne({
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            }, (err, trendingDay) => {
                if (err) {
                    logger.error(err, 'Error while trying to find in mongo.');
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
                            logger.error(err, 'Error while saving trendingday to mongo.');
                            return err;
                        } else {
                            logger.info('TrendingDay saved in Mongo.');
                        }
                    });
                }
            });

        })
        .catch((error) => {
            logger.error(error, 'Error!');
        });
}

exports.scrape = scraper;
