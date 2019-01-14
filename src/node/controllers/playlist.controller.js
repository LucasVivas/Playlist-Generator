const Playlist = require('../models/playlist.model.js');

// Retrieve and return all playlists from the database.
exports.findAll = (req, res) => {
  const userId = req.params.user_id;

  res.send();
};
// Delete all the playlists of an user
exports.deleteAll = (req, res) => {
  const userId = req.params.user_id;

  res.send();
};

// Create and Save a new Playlist
exports.create = (req, res) => {
  const userId = req.params.user_id;
  const newPlaylist = req.body;

  res.send();
};

// Find a single playlist with a playlistId
exports.findOne = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;

  res.send();
};

// Update a playlist identified by the playlistId in the request
exports.update = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const newPlaylist = req.body;

  res.send();
};

// Delete a playlist with the specified playlistId in the request
exports.delete = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;

  res.send();
};
