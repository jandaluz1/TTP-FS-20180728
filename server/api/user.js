const router = require('express').Router();
const { User, Order } = require('../db');

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

module.exports = router;
