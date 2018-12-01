const { User } = require('../db');
const router = require('express').Router();

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
