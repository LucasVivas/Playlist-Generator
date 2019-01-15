const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: String,
  username: { type: String, unique: true, required: true },
  mail: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
});

UserSchema.options.toJSON = {
  transform(doc, ret) {
    delete ret._id;
    delete ret.id;
    delete ret.__v;
  },
};

module.exports = mongoose.model('User', UserSchema);
