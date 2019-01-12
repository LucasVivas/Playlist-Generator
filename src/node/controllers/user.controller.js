const User = require('../models/user.model.js');

exports.findAll = (req, res) => {
  User.find({}, { _id: false })
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
  User.deleteMany({})
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
  const newUser = req.body;
  const user = new User({
    username: newUser.username,
    mail: newUser.mail,
    password: newUser.password,
  });

  user.save()
    .then((data) => {
      res.status(201);
      res.send(data);
    }).catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({
          message: `Conflict the username "${req.body.username}" already exist.`,
        });
      }
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

// find one user
exports.findOne = (req, res) => {
  const userId = req.params.user_id;

  User.findOne({ username: userId }, { _id: false })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      res.status(200);
      res.send(user);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving user with id ${userId}`,
      });
    });
};

exports.update = (req, res) => {
  const userId = req.params.user_id;
  const newUser = req.body;

  if (!req.body.mail || !req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Bad User format.',
    });
  }

  // Find note and update it with the request body
  User.findOneAndUpdate({ username: userId }, {
    username: newUser.username,
    mail: newUser.mail,
    password: newUser.password,
  }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      res.status(200);
      res.send(user);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      if (err.code === 11000) {
        return res.status(409).send({
          message: `Conflict the username "${req.body.username}" already exist.`,
        });
      }
      return res.status(500).send({
        message: `Error updating user with id ${userId}. Err : ${err.message}`,
      });
    });
};

exports.delete = (req, res) => {
  const userId = req.params.user_id;

  User.findOneAndRemove({ username: userId })
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      res.status(200);
      res.send({ message: 'User deleted successfully!' });
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `User not found with id ${userId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete note with id ${userId}`,
      });
    });
};
