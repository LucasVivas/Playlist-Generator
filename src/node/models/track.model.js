const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  artist: String,
  time: Decimal128,
});

module.exports = mongoose.model('User', UserSchema);
