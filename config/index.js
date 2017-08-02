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
			default: 'error',
			env: 'LOGGER_LEVEL'
		}
	},
	mongo: {
		host: {
			doc: 'MongoDB host',
			format: String,
			default: null,
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
		},
		timezone: {
			doc: 'Timezone for the cron',
			format: String,
			default: null,
			env: 'CRON_TIMEZONE'
		}
	},
	http: {
		port: {
			doc: 'Port for the HTTP server to listen on',
			format: 'port',
			default: 1337,
			env: 'HTTP_PORT'
		}
	}
});

const config = configSchema.getProperties();
module.exports = config;
