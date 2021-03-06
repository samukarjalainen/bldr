/**
 * app.js - the launching point of bldr
 *
 * @type {*|exports|module.exports}
 */



/* -- VARIABLES -- */
var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');
var User = require('./server/models/user');
var app = express();


/* -- RESPONSE HEADERS -- */
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


/* -- MIDDLEWARE -- */
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
  cookieName: 'session',
  secret: 'shhhsupersecretstuffhere',
  duration: 5 * 24 * 60 * 60 * 1000,
  activeDuration: 60 * 60 * 1000
}));
app.use(function (req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        res.locals.user = req.user;
      }
      next();
    });
  } else {
    next();
  }
});


/* -- ENVIRONMENT VARIABLES -- */
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';
app.set('port', process.env.PORT || 4000);


/* -- View engine setup -- */
app.set('views', path.join(__dirname, 'public/partials'));
app.set('view engine', 'jade');
app.locals.pretty = true;


/* -- ROUTING -- */
app.use('/', require('./server/routes'));


/* -- 404 ERROR -- */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/* -- ERROR HANDLERS -- */
// Development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// Production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


/* -- START THE SERVER -- */
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;
