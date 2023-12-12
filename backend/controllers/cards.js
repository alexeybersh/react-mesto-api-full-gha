/* eslint-disable no-undef */
const Card = require('../models/card');
const { STATUS_OK, CREATED } = require('../utils/errorsStatus');
const { errorMessage } = require('../utils/errorsMessage');

module.exports.createCard = ((req, res, next) => {
  owner = req.user._id;

  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.getCards = ((req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.deleteCard = ((req, res, next) => {
  Card.findById(req.params.id).orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new Error('Удаление не своей карточки');
      }
      Card.deleteOne({ _id: req.params.id }).orFail()
        .then(() => res.status(STATUS_OK).send({ message: ' Карточка удалена!' }));
    })
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.addLikes = ((req, res, next) => {
  userId = req.user._id;

  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: userId } }, {
    new: true,
  }).orFail()
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.deleteLikes = ((req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } }, {
    new: true,
  }).orFail()
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((error) => {
      next(errorMessage(error));
    });
});
