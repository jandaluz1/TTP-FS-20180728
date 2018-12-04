const router = require('express').Router();
const { User, Order } = require('../db');

router.post('/buy', async (req, res, next) => {
  const order = req.body;
  console.log('/BUY', req.body);
  const user = await User.findOne({ _id: req.user._id });
  !user.portfolio[order.symbol]
    ? (user.portfolio[order.symbol] = Number(order.quantity))
    : (user.portfolio[order.symbol] += Number(order.quantity));
  user.balance -= order.price * Number(order.quantity);
  user.markModified('portfolio');
  const newOrder = new Order({
    name: order.name,
    symbol: order.symbol,
    quantity: order.quantity,
    price: order.quantity,
    type: 'buy'
  });
  console.log('after markModified');
  newOrder.user = user._id;
  await user.save();
  await newOrder.save();
  res.status(201).send(user);
});

module.exports = router;
