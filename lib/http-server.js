'use strict';

const http = require('http');
const config = require('../config');
const logger = require('../utils/logger');
const scraper = require('./scraper');

const server = http.createServer((req, res) => {
    logger.trace(req, 'incoming request');

    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
            code: 'method_not_allowed',
            message: 'Request method not allowed'
        }));
    }

    if (req.url === '/health') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('OK\n');
    }

    if (req.url === '/scrape') {
        return scraper.scrape()
            .then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Done!\n');
            })
            .catch((err) => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                    code: 'scraping_error',
                    message: 'Something went wrong while scraping.'
                }));
            })
    }

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        code: 'generic_error',
        message: 'Something went wrong..'
    }));
});

module.exports = server;
