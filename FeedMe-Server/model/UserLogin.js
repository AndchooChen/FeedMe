const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserLogin = mongoose.model('UserLogin', userSchema, 'users');

module.exports = UserLogin;