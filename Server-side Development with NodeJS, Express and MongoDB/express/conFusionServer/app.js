var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');



const uri = "";
// const client = mongoose(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri, { autoIndex: false }, () => {
  console.log('connected to database..');
}, (err) => {
  console.log(err);
});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('connect to db');
//   // perform actions on the collection object
//   client.close();
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('lokdown in the flate do for the boss'));

// authentication
function auth(req, res, next) {
  if (!req.signedCookies.user) {

    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('you are not authenticated');

      res.setHeader('www-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
      res.cookie('user', 'admin', { signed: true });
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.signedCookies.user === 'admin') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
