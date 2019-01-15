const User = require('../models/user.model.js');
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
        message: err.message || 'Some error occurred while retrieving notes.',
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
  const playlist = new Playlist({
    _id: userId + newPlaylist.name,
    name: newPlaylist.name,
    description: newPlaylist.description,
    genre: newPlaylist.genre,
    owner: userId,
  });

  playlist.save()
    .then((data) => {
      res.status(201);
      res.send(data);
    }).catch((err) => {
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
