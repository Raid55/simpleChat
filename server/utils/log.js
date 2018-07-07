// env vars
const { NODE_ENV } = require('../../config');
const logger = require('winston');
const path = require('path');
// const tsFormat = () => ( new Date() ).toLocaleDateString() + ' - ' + ( new Date() ).toLocaleTimeString()

logger.addColors({
	debug: 'green',
	info: 'cyan',
	silly: 'magenta',
	warn: 'yellow',
	error: 'red',
});

// debug is for personal sue, debugging a function or something
// verbose is for all extra stuff, server starting, stoping, db connection and what not
logger.add(new logger.transports.Console({
	level: 'verbose',
	handleExceptions: true,
	colorize: true,
	json: false,
	silent: NODE_ENV === "test",
}));

// info is all loggable info the server goes through, requests and other useful info
// warn is for all semi errors, they wont cause a crash or arent really a problem but need to get solved
// errors are logging for all handled errors
logger.add(new logger.transports.File({
	level: 'info',
	filename: path.resolve('./logs/logs.log'),
	handleExceptions: true,
	// json: true,
	// timestamp: tsFormat,
	silent: NODE_ENV === "test",
}));

// let logger = winston.createLogger({
// 	transports: transports,
// 	silent: NODE_ENV === "test",
// });

module.exports = logger;
module.exports.stream = {
	write: function (message, encoding) {
		logger.info(message);
	},
};
