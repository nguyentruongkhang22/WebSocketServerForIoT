const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    default: `user${this._id}`,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: function (el) {
      return el === this.password;
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, currentPassword) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

module.exports = mongoose.model('User', userSchema);
