'use strict';

const trendingScraper = require('./lib/trending-scraper');
const TrendingDay = require('./models/TrendingDay');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gitpoint');

const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    trendingScraper.scrapeIt()
        .then((repos) => {
            console.log(repos);
            let day = new TrendingDay({
                repositories: repos
            });

            day.save((err, day) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('Day inserted');
                    mongoose.disconnect();
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });

});
