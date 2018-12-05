const router = require('express').Router();
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

router.get('/portfolio', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user.portfolio) {
      user.portfolio = {};
      await user.markModified('portfolio');
      await user.save();
    }
    res.json(user.portfolio);
  } catch (err) {
    next(err);
  }
});

router.get('/orders', isLoggedIn, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
