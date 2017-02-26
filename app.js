//grabbed these contants from https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
//going to use these instead of the regular variable declaration because there seems to be
//added value in limiting the scope here

const express = require('express')  
const passport = require('passport')  
const session = require('express-session')  
const config = require('./config')
const logger = require('morgan')
const bodyParser = require ('body-parser')
const cookieParser = require ('cookie-parser')
const authentuicate = require ('./authentication/index.js')

//may need to actually setup a redistore here i.e a cloud based db 
//instead of using reggie mongo

const RedisStore = require('connect-redis')(session)

const app = express()  
app.use(session({  
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())  
app.use(passport.session())  

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/login', function (req, res) {
  res.render('login')
})

//Not sure if I will need to use these routes later or not
//Commenting out for now until I reach a stage when i'm ready to handle rendering views

// app.use('/', routes);
// app.use('/users', users);

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
