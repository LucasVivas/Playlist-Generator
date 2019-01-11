const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
  name: String,
  description: String,
  genre: String,
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
