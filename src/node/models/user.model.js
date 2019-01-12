const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: String,
  mail: String,
  password: String,
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

UserSchema.virtual('username').get(function () {
  return this._id;
});

module.exports = mongoose.model('User', UserSchema);
