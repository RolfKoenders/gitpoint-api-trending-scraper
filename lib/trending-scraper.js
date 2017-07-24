'use strict';

const request = require('request');
const cheerio = require('cheerio');

const GITHUB_TRENDING_URL = 'https://github.com/trending';

exports.scrapeIt = () => {

    request(GITHUB_TRENDING_URL, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $('.repo-list').children('li').each(function (i, el) {
                const repository = $(this).find('h3').text().trim().replace(/ /g, '').split('/');
                const description = $(this).find('div.py-1 > p').text().trim();
                const language = $(this).find('span[itemprop=programmingLanguage]').text().trim();
                const totalStars = $(this).find('div.f6 > a').first().text().trim();
                const forks = $(this).find('div.f6 > a').last().text().trim();
                const starsToday = $(this).find('div.f6 > span').last().text().trim();

                let data = {
                    position: (i + 1),
                    namespace: repository[0],
                    name: repository[1],
                    language: language || null,
                    totalStars: parseInt(totalStars, 10),
                    starsToday: parseInt(starsToday, 10),
                    forks: parseInt(forks, 10),
                };

                console.log(data);
            });
        } else {
            console.log('An error occurred: ', error);
        }
    });
};
