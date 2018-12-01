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

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send('No user found');
    } else if (!user.validPassword(req.body.password)) {
      res.status(401).send('Invalid Password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
