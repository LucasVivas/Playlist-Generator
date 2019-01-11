const User = require('../models/user.model.js');

exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200);
      res.send(users);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.',
      });
    });
};

exports.deleteAll = (req, res) => {
  User.remove({})
    .then(() => {
      res.status(200);
      res.send({
        message: 'Successful operation.',
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.',
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Bad User format.',
    });
  }
  const user = new User({
    mail: req.body.mail,
    username: req.body.username,
    password: req.body.password,
  });

  user.save()
    .then((data) => {
      res.status(201);
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

// find one user
exports.findOne = (req, res) => {
  const playlistId = req.params.playlist_id;

  User.findById(playlistId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${playlistId}`,
        });
      }
      res.status(200);
      res.send(user);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `User not found with id ${playlistId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving user with id ${playlistId}`,
      });
    });
};

exports.update = (req, res) => {
  const playlistId = req.params.playlist_id;
  const newPlaylist = req.body;

  if (!req.body.mail || !req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Bad User format.',
    });
  }

  // Find note and update it with the request body
  User.findByIdAndUpdate(playlistId, {
    mail: newPlaylist.mail,
    username: newPlaylist.username,
    password: newPlaylist.password,
  }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${playlistId}`,
        });
      }
      res.status(200);
      res.send(user);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `User not found with id ${playlistId}`,
        });
      }
      return res.status(500).send({
        message: `Error updating user with id ${playlistId}`,
      });
    });
};

exports.delete = (req, res) => {
  const playlistId = req.params.playlist_id;

  User.findByIdAndRemove(playlistId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: `User not found with id ${playlistId}`,
        });
      }
      res.status(200);
      res.send({ message: 'User deleted successfully!' });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `User not found with id ${playlistId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete note with id ${playlistId}`,
      });
    });
};
