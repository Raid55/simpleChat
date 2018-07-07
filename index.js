// env vars
const { PORT, MONGO_CONN, NODE_ENV } = require('./config');

// I like pretty things
const chalk = require('chalk');

// importing and init logger
// const logger = require('./server/utils/log.js');

// logger.error("lol it errors")
// logger.verbose("hello verboses")
// logger.warn("warning")
// logger.info("informational")

// Mongoose imports
const mongoose = require('mongoose');
mongoose.set('debug', NODE_ENV === "dev");
mongoose.Promise = global.Promise;

// Mongoose connection
mongoose.connect(MONGO_CONN)

mongoose.connection
	.on('connected', () => {  
		console.log(chalk.bold.green("Connected to MongoDB")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
	})
	.on('disconnected', () => {  
		console.log(chalk.bold.bgRed.white("***DB DISCONNECTED***")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
		throw new Error("***DB DISCONNECTED***");
	})
	.on('error', (err) => {  
		console.log(chalk.bold.bgRed.white("***DB CONNECTION ERROR***")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
		throw err;
	}); 


// importing models
require('./server/models/User.js');
require('./server/models/Room.js');

// Importing server
const httpServer = require('./server/app.js');

// close function
function stop () {
	httpServer.close();
	mongoose.connection.close();
}

httpServer.listen(PORT);
httpServer
	.on('listening', () => {
		if (NODE_ENV !== "test") {
			console.log(chalk.grey.bold('\n...'));
			console.log(chalk.blue(`Starting Chat app...`));
			console.log(chalk.magenta.bold(`Started!!!`));
			console.log(chalk.grey.bold('...\n'));
		}
	})
	.on('error', err => {
		console.log(chalk.bold.bgRed.white("***ERROR***")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
		throw err;
	});

module.exports = httpServer;
module.exports.stop = stop;
