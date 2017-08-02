'use strict';

const pino = require('pino');
const config = require('../config');

const logger = pino({
	name: config.logger.name,
	level: config.logger.level
});

module.exports = logger;
