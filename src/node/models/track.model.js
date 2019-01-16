const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const Playlist = require('../models/playlist.model.js');

const TrackSchema = mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  time: { type: Number, required: true },
  owner: { type: String, required: true },
  playlist: { type: String, required: true },
});

TrackSchema.index({ name: 1, owner: 1, playlist: 1 }, { unique: true });

TrackSchema.options.toJSON = {
  transform(doc, ret) {
    delete ret.playlist;
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

const playlistExist = async function (userId, playlistId) {
  await Playlist.findOne({ name: playlistId, owner: userId })
    .then((playlist) => {
      if (!playlist) {
        const error = new Error();
        error.name = 'NotFound';
        throw error;
      }
    }).catch((err) => {
      throw err;
    });
};

// TODO:
TrackSchema.statics.getUserPlaylists = async function (userId) {
  await userExist(userId);
  const res = await this.find({ owner: userId });
  return res;
};

// TODO:
TrackSchema.statics.deleteUserPlaylists = async function (userId) {
  const res = await this.deleteMany({ owner: userId });
  await userExist(userId);
  return res;
};

// TODO:
TrackSchema.statics.getUserPlaylistWithId = async function (userId, playlistId) {
  await userExist(userId);
  const res = await this.findOne({ owner: userId, name: playlistId });
  return res;
};

TrackSchema.statics.addPlaylistTrack = async function (userId, playlistId, newTrack) {
  await userExist(userId);
  await playlistExist(userId, playlistId);
  const track = new this({
    name: newTrack.name,
    artist: newTrack.artist,
    time: newTrack.time,
    owner: userId,
    playlist: playlistId,
  });

  const res = await track.save();
  return res;
};

module.exports = mongoose.model('Track', TrackSchema);
