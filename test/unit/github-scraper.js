'use strict';

import path from 'path';
import test from 'ava';

import githubScraper from '../../lib/github-scraper';

test.cb('Scrape correct data from saved Github trending html page', t => {
	githubScraper.scrapeIt()
		.then(repos => {
			const repo = repos[0];
			const props = Object.keys(repo);
			t.deepEqual(props.length, 8, 'Wrong amount of repository properties.');
			t.deepEqual(repos.length, 25, 'Wrong amount of repositories scraped.');
			t.end();
		})
		.catch(() => {
			t.fail();
			t.end();
		});
});
