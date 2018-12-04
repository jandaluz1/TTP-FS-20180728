const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  balance: { type: Number, default: 5000 },
  portfolio: {}
});

UserSchema.virtual('password').set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, SALT_WORK_FACTOR);
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
