'use strict';

const request = require('request');
const cheerio = require('cheerio');

const GITHUB_TRENDING_URL = 'https://github.com/trending';

exports.scrapeIt = () => {
	return new Promise((resolve, reject) => {
		request(GITHUB_TRENDING_URL, (error, response, html) => {
			if (!error && response.statusCode === 200) {
				const $ = cheerio.load(html);

				const repos = [];

				$('.repo-list').children('li').each(function (i) {
					const repository = $(this).find('h3').text().trim().replace(/ /g, '').split('/');
					const description = $(this).find('div.py-1 > p').text().trim();
					const language = $(this).find('span[itemprop=programmingLanguage]').text().trim();
					const totalStars = $(this).find('div.f6 > a').first().text().trim();
					const forks = $(this).find('div.f6 > a').last().text().trim();
					const starsToday = $(this).find('div.f6 > span').last().text().trim();

					const data = {
						position: (i + 1),
						namespace: repository[0],
						name: repository[1],
						description,
						language,
						totalStars,
						starsToday: starsToday.split(' ')[0],
						forks
					};
					repos.push(data);
				});
				resolve(repos);
			} else {
				const errorObj = new Error();
				errorObj.error = error;
				reject(errorObj);
			}
		});
	});
};
