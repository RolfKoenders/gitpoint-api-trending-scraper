'use strict';

import path from 'path';
import test from 'ava';
import nock from 'nock';

import githubScraper from '../../lib/github-scraper';

test.cb('Scrape correct data from saved Github trending html page', t => {
    nock('https://github.com')
        .get('/trending')
        .replyWithFile(200, path.resolve(__dirname, '../data/github-trending.html'));

    githubScraper.scrapeIt()
        .then(repos => {
            const repo = repos[0];
            const props = Object.keys(repo);
            t.deepEqual(props.length, 7, 'Wrong amount of repository properties.')
            t.deepEqual(repos.length, 25, 'Wrong amount of repositories scraped.');
            t.end();
        })
        .catch(err => {
            t.fail();
            t.end();
        });
});
