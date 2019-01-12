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

// UserSchema.virtual('username').get(function () {
//   return this._id;
// });

// UserSchema.statics.toApiUserSchema = function (data) {
//   return data.map(user => ({
//     username: user.username,
//     mail: user.mail,
//     password: user.password,
//   }));
// };

module.exports = mongoose.model('User', UserSchema);
