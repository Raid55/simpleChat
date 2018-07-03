// env vars
const { PORT, MONGO_CONN } = require('./config');

// I like pretty things
const chalk = require('chalk');

// Mongoose imports
const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// Mongoose connection
mongoose.connect(MONGO_CONN)
  .then(() => {
    console.log(chalk.bold.green("Connected to MongoDB"));
  })
  .catch(err => {
    console.log(chalk.bold.bgRed.white("Err, not connected to DB"));
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
})
httpServer.on('error', err => {
  console.log(chalk.red.bold(err));
});

