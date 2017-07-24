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
                const repoData = $(this).find('h3').text().trim().replace(/ /g, '').split('/');
                const repositoryNamespace = repoData[0];
                const repositoryName = repoData[1];

                console.log(`${(i+1)}. ${repositoryNamespace} / ${repositoryName}`);
            });
    }
});
