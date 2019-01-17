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


TrackSchema.statics.getPlaylistTracks = async function (userId, playlistId) {
  await userExist(userId);
  await playlistExist(userId, playlistId);
  const res = await this.find({ owner: userId, playlist: playlistId });
  return res;
};

TrackSchema.statics.deletePlaylistTracks = async function (userId, playlistId) {
  await userExist(userId);
  await playlistExist(userId, playlistId);
  const res = await this.deleteMany({ owner: userId, playlist: playlistId });
  return res;
};

TrackSchema.statics.getPlaylistTrackWithId = async function (userId, playlistId, trackId) {
  await userExist(userId);
  await playlistExist(userId, playlistId);
  const res = await this.findOne({ name: trackId, owner: userId, playlist: playlistId });
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

TrackSchema.statics.updatePlaylistTrack = async function (userId, playlistId, trackId, newTrack) {
  await userExist(userId);
  await playlistExist(userId, playlistId);
  const res = await this.findOneAndUpdate({ name: trackId, owner: userId, playlist: playlistId }, {
    name: newTrack.name,
    artist: newTrack.artist,
    time: newTrack.time,
    owner: userId,
    playlist: playlistId,
  }, { new: true });
  return res;
};

TrackSchema.statics.deletePlaylistTrack = async function (userId, playlistId, trackId) {
  await userExist(userId);
  await playlistExist(userId, playlistId);
  const res = await this.findOneAndRemove({ name: trackId, owner: userId, playlist: playlistId });
  return res;
};

module.exports = mongoose.model('Track', TrackSchema);
