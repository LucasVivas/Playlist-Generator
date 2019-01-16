const mongoose = require('mongoose');
const User = require('../models/user.model.js');

const PlaylistSchema = mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  description: { type: String, required: false },
  genre: { type: String, required: true },
  owner: { type: String, required: true },
}, { versionKey: false });

PlaylistSchema.index({ name: 1, owner: 1 }, { unique: true });

PlaylistSchema.options.toJSON = {
  transform(doc, ret) {
    delete ret.owner;
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

PlaylistSchema.statics.getUserPlaylistWithId = async function (userId, playlistId) {
  await userExist(userId);
  const res = await this.findOne({ owner: userId, name: playlistId });
  return res;
};

PlaylistSchema.statics.addUserPlaylist = async function (userId, newPlaylist) {
  await userExist(userId);
  const playlist = new this({
    _id: userId + newPlaylist.name,
    name: newPlaylist.name,
    description: newPlaylist.description,
    genre: newPlaylist.genre,
    owner: userId,
  });

  const res = await playlist.save();
  return res;
};

PlaylistSchema.statics.updateUserPlaylist = async function (userId, playlistId, newPlaylist) {
  await userExist(userId);
  const res = await this.findOneAndUpdate({ name: playlistId, owner: userId }, {
    name: newPlaylist.name,
    description: newPlaylist.description,
    genre: newPlaylist.genre,
    owner: userId,
  }, { new: true });
  return res;
};

PlaylistSchema.statics.deleteUserPlaylist = async function (userId, playlistId) {
  await userExist(userId);
  const res = await this.findOneAndRemove({ name: playlistId, owner: userId });
  return res;
};

module.exports = mongoose.model('Playlist', PlaylistSchema);
