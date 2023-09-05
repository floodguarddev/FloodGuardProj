var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
require('dotenv').config();
var {infoLogger} = require('./src/logging/logger')
var {errorLogger, errorResponder, invalidPathHandler, assignHTTPError} = require('./src/middlewares/errorhandling');

global.__basedir = __dirname;

//Setting Up DB//
require('./db/connection');

//Importing Routes//
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var adminsRouter = require('./src/routes/admins');
var ngosRouter = require('./src/routes/ngos');
var recuersRouter = require('./src/routes/rescuers');

var app = express();

//Morgan's Information in Stream//
app.use(morgan('combined', {stream: infoLogger.stream}));
//Extracting Body from Request//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Cookie Parser for Cookie Secret//
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminsRouter);
app.use('/ngos', ngosRouter);
app.use('/rescuers', recuersRouter);


/*--------------Error Handling----------------*/

//Assign Errors to Code
app.use(assignHTTPError);

// Attach the first Error handling Middleware
// function defined above (which logs the error)
app.use(errorLogger)

// Attach the second Error handling Middleware
// function defined above (which sends back the response)
app.use(errorResponder)

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
app.use(invalidPathHandler)

module.exports = app;
