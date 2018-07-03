/* eslint-env node */

// This is a simple chat app, the react app and api are tied together
// and are easily ejectable. This app is not made with HTTPS or security 
// in mind, therefore it will have light security (checking for correct values, sanitizing inputs)
// this app will not rate limit...as of yet...

// importing modules
const bodyParser = require('body-parser');
const passport   = require('passport');
const express    = require('express');
const morgan     = require("morgan");
const chalk      = require('chalk');
const path       = require('path');
const fs         = require('fs');

// init app
const app = express();

// init http server
const httpServer = require('http').createServer(app);

// init socket IO
const io = require('socket.io')(httpServer);

// passing IO to response middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Main socketIO logic
io.use(require('./utils/socketio/auth.js'))
.on('connection', require('./utils/socketio/events.js'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize passport
app.use(passport.initialize());
// import passport strategies
const signupStrategy = require('./utils/passport/signup.js');
const jwtStrategy = require('./utils/passport/jwt.js');
// load passport strategies
passport.use('signup', signupStrategy);
passport.use('jwt', jwtStrategy);

// Morgan logger //
app.use(morgan(chalk.grey('........................................')));
app.use(morgan(chalk.blue(':user-agent')));
app.use(morgan(chalk.red.bold('[:date[clf]]')));
app.use(morgan(chalk.yellow.bold('":method | :url | HTTP/:http-version"')));
app.use(morgan(chalk.cyan(':status | :res[content-length] | :response-time ms')));
app.use(morgan(chalk.grey('........................................')));
app.use(morgan(' '));
// end of logger info //

// Serve bundlejs and static files
app.use(express.static(path.resolve(__dirname, '../client/public')));

// importing api routes
const api = require("./routes");

// Apply routes that wont serve react app
app.use("/api", api);

// Serve React app on all routes except the ones above route
// if this app had multiple clients, such as a desktop app, iPhone App, etc..
// I would split it up so that the API isen't also serving the react app, but
// for the sake of simplicity I added it here, altho that being said it would
// be very easy to eject the react app from the API if nessesairy...
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
})

module.exports = httpServer
