const { User } = require('../db');
const router = require('express').Router();

router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    newUser.portfolio = {};
    await newUser.markModified('portfolio');
    await newUser.save();
    req.login(newUser, err => (err ? next(err) : res.json(newUser)));
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

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = router;
