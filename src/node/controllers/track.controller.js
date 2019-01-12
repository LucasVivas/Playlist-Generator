const Track = require('../models/track.model.js');

// Retrieve and return all tracks from the database.
exports.findAll = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
};
// Delete all the tracks of an user
exports.deleteAll = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
};

// Create and Save a new Track
exports.create = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const newTrack = req.body;
};

// Find a single track with a trackId
exports.findOne = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
};

// Update a track identified by the trackId in the request
exports.update = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  const newTrack = req.body;
};

// Delete a track with the specified trackId in the request
exports.delete = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
};
