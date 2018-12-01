const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', require('./auth'));

mongoose.connect(
  'mongodb://localhost/stocks',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

db.once('open', () => {
  console.log('DB Connected!');
  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
});
