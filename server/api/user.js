const router = require('express').Router();
const { User } = require('../db');

router.get('/portfolio', async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user.portfolio) {
      user.portfolio = {};
      user.save();
    }
    console.log(user.portfolio);
    res.json(user.portfolio);
  } catch (err) {
    next(err);
  }
});

router.put('/buy', async (req, res, next) => {
  const order = req.body;
  console.log(order);
  const user = await User.findOne({ _id: req.user._id });
  !user.portfolio[order.symbol]
    ? (user.portfolio[order.symbol] = Number(order.quantity))
    : (user.portfolio[order.symbol] += Number(order.quantity));
  user.balance -= order.price * Number(order.quantity);
  user.markModified('portfolio');
  console.log('after markModified');
  user.save();
  res.send(user);
});

module.exports = router;
