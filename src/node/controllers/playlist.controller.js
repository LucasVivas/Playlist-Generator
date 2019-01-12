const Playlist = require('../models/playlist.model.js');

// Retrieve and return all playlists from the database.
exports.findAll = (req, res) => {
  const userId = req.params.user_id;
};
// Delete all the playlists of an user
exports.deleteAll = (req, res) => {
  const userId = req.params.user_id;
};

// Create and Save a new Playlist
exports.create = (req, res) => {
  const userId = req.params.user_id;
  const newPlaylist = req.body;
};

// Find a single playlist with a playlistId
exports.findOne = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
};

// Update a playlist identified by the playlistId in the request
exports.update = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const newPlaylist = req.body;
};

// Delete a playlist with the specified playlistId in the request
exports.delete = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
};
