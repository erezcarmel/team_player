'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const compression = require('compression')
const helmet = require('helmet')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(compression())
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// babelify compile
app.get('/js/index.js', require('browserify-middleware')(path.join(__dirname, 'public/javascripts/index.js'), {
  cache: app.get('env') === 'development' ? 'dynamic' : true,
  precompile: app.get('env') === 'development' ? false : true,
  transform: [ ['babelify', {presets: ['es2015', 'react']}]]
}))

// let login = require('./routes/login')
app.use('/', routes);
// app.use('/', login.app);
// app.use('/users', users);
// app.use('/api', login.ensureAuthenticated);
// app.use('/api/posts', require('./routes/posts'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
