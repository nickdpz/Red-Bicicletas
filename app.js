require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./db');
const passport = require('./config/passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bicicletasAPIRouter = require('./routes/api/bicicletas')
const bicicletasRouter = require('./routes/bicicletas')
const usuariosAPIRouter = require('./routes/api/usuarios');

const app = express();

const store = new session.MemoryStore;
app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000 },
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'red_bicicletas'
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express)

database();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter)
app.use('/api/bicicletas', bicicletasAPIRouter)
app.use('/api/usuarios', usuariosAPIRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENVIRONMENT === 'DEV' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(cookieParser());

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('Usuario sin loguearse');
    res.redirect('/login');
  }
}

module.exports = app;