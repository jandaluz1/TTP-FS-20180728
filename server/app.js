const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const { User } = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(volleyball);
app.use(express.static(path.join(__dirname, '..', 'public')));

//passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'stocksecret',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

mongoose.connect(
  'mongodb://localhost/stocks',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

db.once('open', () => {
  const PORT = 8080;
  app.listen(PORT, () => {});
});
