const mongoose = require('mongoose');
const User = require('../models/user.model.js');

const PlaylistSchema = mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  description: { type: String, required: false },
  genre: { type: String, required: true },
  owner: { type: String, required: true },
}, { versionKey: false });

PlaylistSchema.options.toJSON = {
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
};

const userExist = async function (userId) {
  await User.findOne({ username: userId })
    .then((user) => {
      if (!user) {
        const error = new Error();
        error.name = 'NotFound';
        throw error;
      }
    }).catch((err) => {
      throw err;
    });
};

PlaylistSchema.statics.getUserPlaylists = async function (userId) {
  await userExist(userId);
  const res = await this.find({ owner: userId });
  return res;
};

PlaylistSchema.statics.deleteUserPlaylists = async function (userId) {
  await userExist(userId);
  const res = await this.deleteMany({ owner: userId });
  return res;
};

module.exports = mongoose.model('Playlist', PlaylistSchema);
