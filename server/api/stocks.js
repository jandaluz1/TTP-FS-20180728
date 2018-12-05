const router = require('express').Router();
const axios = require('axios');
const { User, Order } = require('../db');

const isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    const error = new Error();
    error.status = 401;
    error.message = 'Unauthorized Access';
    next(error);
  }
};

router.post('/buy', isLoggedIn, async (req, res, next) => {
  const order = req.body;
  console.log('/BUY', req.body);
  const user = await User.findOne({ _id: req.user._id });
  if (!user.portfolio) user.portfolio = {};
  !user.portfolio[order.symbol]
    ? (user.portfolio[order.symbol] = Number(order.quantity))
    : (user.portfolio[order.symbol] += Number(order.quantity));
  user.balance -= order.price * Number(order.quantity);
  user.markModified('portfolio');
  const newOrder = new Order({
    name: order.name,
    symbol: order.symbol,
    quantity: order.quantity,
    price: order.price,
    type: 'buy'
  });
  console.log('after markModified');
  newOrder.user = user._id;
  await user.save();
  await newOrder.save();
  res.status(201).send(user);
});

router.get('/quote', isLoggedIn, async (req, res, next) => {
  const symbols = Object.keys(req.user.portfolio);
  const stocks = await axios.get(
    `https://ws-api.iextrading.com/1.0/stock/market/batch?symbols=${symbols.join(
      ','
    )}&types=quote`
  );
  res.send(stocks.data);
});
module.exports = router;
