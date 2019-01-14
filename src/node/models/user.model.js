const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  versionKey: false,
  id: false,

});

module.exports = mongoose.model('User', UserSchema);
