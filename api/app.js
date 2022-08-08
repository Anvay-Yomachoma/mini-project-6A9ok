var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
// const csrf = require('csurf');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
<<<<<<< HEAD
  origin : 'http://localhost:3000', 
  methods : ["GET", "POST"],
=======
<<<<<<< HEAD
  origin : 'http://localhost:3000'
=======
  origin: 'http://localhost:3000'
>>>>>>> temp
>>>>>>> 9f8b58a9a6163d8610cfe9a7eca93dd2f48e7e35
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
<<<<<<< HEAD
 
<<<<<<< HEAD
app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })
=======
=======

>>>>>>> temp
>>>>>>> 9f8b58a9a6163d8610cfe9a7eca93dd2f48e7e35

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
// catch 404 and forward to error handler
<<<<<<< HEAD
app.use(function(req, res, next) {
=======
app.use(function (req, res, next) {
>>>>>>> temp
  next(createError(404));
});

// error handler
<<<<<<< HEAD
app.use(function(err, req, res, next) {
=======
app.use(function (err, req, res, next) {
>>>>>>> temp
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
