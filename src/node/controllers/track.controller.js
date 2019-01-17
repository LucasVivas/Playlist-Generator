const Track = require('../models/track.model.js');

// Retrieve and return all tracks from the database.
exports.findAll = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  Track.getPlaylistTracks(userId, playlistId)
    .then((tracks) => {
      res.status(200);
      res.send(tracks);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Playlist or user not found with ids ${userId}, ${playlistId}`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tracks.',
      });
    });
};
// Delete all the tracks of an user
exports.deleteAll = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  Track.deletePlaylistTracks(userId, playlistId)
    .then(() => {
      res.status(200);
      res.send({
        message: 'Successful operation.',
      });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Playlist or user not found with ids ${userId}, ${playlistId}`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting tracks.',
      });
    });
};

// Find a single track with a trackId
exports.findOne = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  Track.getPlaylistTrackWithId(userId, playlistId, trackId)
    .then((track) => {
      if (!track) {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${trackId}`,
        });
      }
      res.status(200);
      res.send(track);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${trackId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving Track with id ${trackId}`,
      });
    });
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
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${newTrack.name}`,
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


// Update a track identified by the trackId in the request
exports.update = (req, res) => {
  if (!req.body.name || !req.body.artist || !req.body.time) {
    return res.status(400).send({
      message: 'Bad Track format.',
    });
  }
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  const newTrack = req.body;


  // Find note and update it with the request body
  Track.updatePlaylistTrack(userId, playlistId, trackId, newTrack)
    .then((track) => {
      if (!track) {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${trackId}`,
        });
      }
      res.status(200);
      res.send(track);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${trackId}`,
        });
      }
      if (err.code === 11000) {
        return res.status(409).send({
          message: `Conflict the name "${req.body.name}" already exist in ${userId}/${playlistId}.`,
        });
      }
      return res.status(500).send({
        message: `Error updating track with id ${trackId}. Err : ${err.message}`,
      });
    });
};

// Delete a track with the specified trackId in the request
exports.delete = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const trackId = req.params.track_id;
  Track.deletePlaylistTrack(userId, playlistId, trackId)
    .then((track) => {
      if (!track) {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${trackId}`,
        });
      }
      res.status(200);
      res.send({ message: 'Track deleted successfully!' });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Track or playlist or user not found with ids ${userId}, ${playlistId}, ${trackId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete track with userid ${userId} & playlistId ${playlistId} & trackId ${trackId}`,
      });
    });
};
