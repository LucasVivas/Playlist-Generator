const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  mail: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
