'use strict';

const convict = require('convict');

const configSchema = convict({
    logger: {
        name: {
            doc: 'Name of the logger',
            format: String,
            default: '',
            env: 'LOGGER_NAME'
        },
        logger: {
            doc: 'Level to log',
            format: String,
            default: '',
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
    }
});

const config = configSchema.getProperties();
module.exports = config;
