const express = require('express');
const path = require('path');
const volleyball = require('volleyball');

const app = express();

app.use(volleyball);
app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
