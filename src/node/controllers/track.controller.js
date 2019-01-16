const Track = require('../models/track.model.js');

// Retrieve and return all tracks from the database.
exports.findAll = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  res.send();
};
// Delete all the tracks of an user
exports.deleteAll = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  res.send();
};

// Create and Save a new Track
exports.create = (req, res) => {
  if (!req.body.name || !req.body.artist || !req.body.time) {
    return res.status(400).send({
      message: 'Bad Track format.',
    });
  }
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const newTrack = req.body;
  Track.addPlaylistTrack(userId, playlistId, newTrack)
    .then((data) => {
      res.status(201);
      res.send(data);
    }).catch((err) => {
      if (err.name === 'NotFound') {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${newTrack.name}, `,
        });
      }
      if (err.code === 11000) {
        return res.status(409).send({
          message: `Conflict the name "${newTrack.name}" already exist with user "${userId}".`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Track.',
      });
    });
};

// Find a single track with a trackId
exports.findOne = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  res.send();
};

// Update a track identified by the trackId in the request
exports.update = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  const newTrack = req.body;
  res.send();
};

// Delete a track with the specified trackId in the request
exports.delete = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  res.send();
};
