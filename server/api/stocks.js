const router = require('express').Router();
const axios = require('axios');

const stocks = axios.create({
  baseURL: 'https://api.iextrading.com/1.0/stock',
  headers: {
    Accept: 'applicatoin/json'
  },
  timeout: 3000
});

router.get('/buy', async (req, res, next) => {
  try {
    console.log('REQUEST', req.body);
    const stock = await stocks.get(`/${req.body.symbol}/batch?types=quote`);
    res.json(stock.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
