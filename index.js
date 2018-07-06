// env vars
const { PORT, MONGO_CONN } = require('./config');

// I like pretty things
const chalk = require('chalk');

// Mongoose imports
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// Mongoose connection
mongoose.connect(MONGO_CONN)
	.then((re) => {
		console.log(chalk.bold.green("Connected to MongoDB")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
		return re;
	})
	.catch(err => {
		console.log(chalk.bold.bgRed.white("***DB CONNECTION ERROR***")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
		throw err;
	});

// importing models
require('./server/models/User.js');
require('./server/models/Room.js');

// Importing server
const httpServer = require('./server/app.js');

httpServer.listen(PORT);
httpServer.on('listening', () => {
	console.log(chalk.grey.bold('\n...'));
	console.log(chalk.blue(`Starting Chat app...`));
	console.log(chalk.magenta.bold(`Started!!!`));
	console.log(chalk.grey.bold('...\n'));
});
httpServer.on('error', err => {
	console.log(chalk.bold.bgRed.white("***ERROR***")); /* eslint-disable-line babel/quotes */ // stings "" keys ''
	throw err;
});

// close function
function stop () {
	httpServer.close();
	mongoose.connection.close();
}

module.exports = httpServer;
module.exports.stop = stop;
