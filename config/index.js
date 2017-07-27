'use strict';

const convict = require('convict');

const configSchema = convict({
    logger: {
        name: {
            doc: 'Name of the logger',
            format: String,
            default: 'TrendingScraper',
            env: 'LOGGER_NAME'
        },
        level: {
            doc: 'Level to log',
            format: String,
            default: 'trace',
            env: 'LOGGER_LEVEL'
        }
    },
    mongo: {
        host: {
            doc: 'MongoDB host',
            format: String,
            default: '127.0.0.1',
            env: 'MONGODB_HOST'
        },
        port: {
            doc: 'MongoDB port',
            format: 'port',
            default: 27017,
            env: 'MONGODB_PORT'
        },
        database: {
            doc: 'MongoDB database',
            format: String,
            default: 'gitpoint',
            env: 'MONGODB_DB'
        }
    },
    cron: {
        pattern: {
            doc: 'Conjob pattern for when the scraper runs',
            format: String,
            default: '0 * * * * *',
            env: 'CRON_PATTERN'
        }
    }
});

const config = configSchema.getProperties();
module.exports = config;
