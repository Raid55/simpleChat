
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

// sentry io

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
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
})

module.exports = httpServer
