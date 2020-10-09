const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const directorsRouter = require('./routes/directors');

const app = express();

// ======================= MONGO DB GLOBAL ULASH ====================

const db = require('./helper/db');
db();

// CONFIG SECRET KEY ULAYMIZ 

const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

//================================================== MIDDLEWARE==========================================
  
const tokenVer = require("./middleware/tokenver")


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/api', tokenVer)
app.use('/api/movies', moviesRouter);
app.use('/api/directors', directorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
