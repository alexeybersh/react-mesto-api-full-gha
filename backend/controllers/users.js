const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { genToken } = require('../utils/jwt');
const { errorMessage } = require('../utils/errorsMessage');

const { STATUS_OK, CREATED } = require('../utils/errorsStatus');

module.exports.createUser = ((req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar,
    }))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.getUsers = ((req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.getUser = ((req, res, next, id) => {
  User.findById(id).orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      next(errorMessage(error, 'user'));
    });
});

module.exports.getCurrentUser = ((req, res, next) => {
  module.exports.getUser(req, res, next, req.user._id);
});

module.exports.getUserById = ((req, res, next) => {
  module.exports.getUser(req, res, next, req.params.id);
});

module.exports.patchUser = ((req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      next(errorMessage(error, 'user'));
    });
});

module.exports.patchAvatar = ((req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      next(errorMessage(error, 'user'));
    });
});

module.exports.login = ((req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(STATUS_OK).send({ token: genToken({ _id: user._id }) });
    })
    .catch((error) => {
      next(errorMessage(error));
    });
});
