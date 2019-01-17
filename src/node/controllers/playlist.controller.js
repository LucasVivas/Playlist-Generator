const Playlist = require('../models/playlist.model.js');

// Retrieve and return all playlists from the database.
exports.findAll = (req, res) => {
  const userId = req.params.user_id;

  Playlist.getUserPlaylists(userId)
    .then((playlists) => {
      res.status(200);
      res.send(playlists);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving playlists.',
      });
    });
};
// Delete all the playlists of an user
exports.deleteAll = (req, res) => {
  const userId = req.params.user_id;

  Playlist.deleteUserPlaylists(userId)
    .then(() => {
      res.status(200);
      res.send({
        message: 'Successful operation.',
      });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting playlist.',
      });
    });
};

// Create and Save a new Playlist
exports.create = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.genre) {
    return res.status(400).send({
      message: 'Bad Playlist format.',
    });
  }
  const userId = req.params.user_id;
  const newPlaylist = req.body;
  Playlist.addUserPlaylist(userId, newPlaylist)
    .then((data) => {
      res.status(201);
      res.send(data);
    }).catch((err) => {
      if (err.name === 'NotFound') {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      if (err.code === 11000) {
        return res.status(409).send({
          message: `Conflict the name "${newPlaylist.name}" already exist with user "user_id".`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Playlist.',
      });
    });
};

// Find a single playlist with a playlistId
exports.findOne = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;

  Playlist.getUserPlaylistWithId(userId, playlistId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `Playlist not found with id ${userId}`,
        });
      }
      res.status(200);
      res.send(user);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `User or Playlist not found with ids ${userId} & ${playlistId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving Playlist with id ${playlistId}`,
      });
    });
};

// Update a playlist identified by the playlistId in the request
exports.update = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.genre) {
    return res.status(400).send({
      message: 'Bad Playlist format.',
    });
  }
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;
  const newPlaylist = req.body;

  // Find note and update it with the request body
  Playlist.updateUserPlaylist(userId, playlistId, newPlaylist)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `Playlist not found with userid ${userId} & playlistId ${playlistId}`,
        });
      }
      res.status(200);
      res.send(user);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Playlist not found with userid ${userId} & playlistId ${playlistId}`,
        });
      }
      if (err.code === 11000) {
        return res.status(409).send({
          message: `Conflict the name "${req.body.name}" already exist in ${userId}.`,
        });
      }
      return res.status(500).send({
        message: `Error updating user with id ${userId}. Err : ${err.message}`,
      });
    });
};

// Delete a playlist with the specified playlistId in the request
exports.delete = (req, res) => {
  const userId = req.params.user_id;
  const playlistId = req.params.playlist_id;

  Playlist.deleteUserPlaylist(userId, playlistId)
    .then((playlist) => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist not found with userid ${userId} & playlistId ${playlistId}`,
        });
      }
      res.status(200);
      res.send({ message: 'Playlist deleted successfully!' });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Playlist not found with userid ${userId} & playlistId ${playlistId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete playlist with userid ${userId} & playlistId ${playlistId}`,
      });
    });
};
