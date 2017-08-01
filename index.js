'use strict';

const CronJob = require('cron').CronJob;

const config = require('./config');
const logger = require('./utils/logger');
const mongo = require('./utils/mongo');

const scraper = require('./lib/scraper');
const httpServer = require('./lib/http-server');

// CronJob
const job = new CronJob(config.cron.pattern, () => {
    scraper.scrape()
        .then(() => {
            logger.trace('Succesfully inserted scraped data');
        })
        .catch((err) => {
            logger.error('Succesfully inserted scraped data');
        });
}, () => {
    // Function is called when cronjob is stopped.
    logger.info('Cronjob stopped. If you see this the cronjob probably crashed..');
}, false, config.cron.timezone);

// Open DB connection and start CronJob!
mongo.once('open', () => {
    // Start cronjob
    job.start();
});

// Start listening for HTTP requests
httpServer.listen(config.http.port, '0.0.0.0', () => {
    logger.info(`HTTP Server is listening on port: ${config.http.port}`);
});
