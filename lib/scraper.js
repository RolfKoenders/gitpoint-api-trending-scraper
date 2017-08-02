'use strict';

const moment = require('moment');
const logger = require('../utils/logger');
const TrendingDay = require('../models/trending-day');
const githubScraper = require('./github-scraper');

function scraper() {
	const startOfDay = moment().startOf('day');
	const endOfDay = moment().endOf('day');

	return githubScraper.scrapeIt()
		.then(repos => {
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
				}
				if (trendingDay === null) {
					trendingDay = new TrendingDay({
						repositories: repos
					});
				} else {
					trendingDay.repositories = repos;
				}

				trendingDay.save(err => {
					if (err) {
						logger.error(err, 'Error while saving trendingday to mongo.');
						return err;
					}
					logger.info('TrendingDay saved in Mongo.');
				});
			});
		})
		.catch(err => {
			logger.error(err, 'Error!');
		});
}

exports.scrape = scraper;
