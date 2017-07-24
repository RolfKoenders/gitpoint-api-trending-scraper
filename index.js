'use strict';

const request = require('request');
const cheerio = require('cheerio');

const GITHUB_TRENDING_URL = 'https://github.com/trending';

request(GITHUB_TRENDING_URL, (error, response, html) => {
    if (!error) {
        const $ = cheerio.load(html);

        $('.repo-list')
            .children('li')
            .each(function (i, el) {
                console.log($(this).find('h3').text().trim());
            });
    }
});
