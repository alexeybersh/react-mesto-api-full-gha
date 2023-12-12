const { Router } = require('express');
const { cardValidateId, cardValidateInfo } = require('../middlewares/cardValidate');

const {
  createCard, getCards, deleteCard, addLikes, deleteLikes,
} = require('../controllers/cards');

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.delete('/:id', cardValidateId, deleteCard);

cardRouter.post('/', cardValidateInfo, createCard);

cardRouter.put('/:id/likes', cardValidateId, addLikes);

cardRouter.delete('/:id/likes', cardValidateId, deleteLikes);

module.exports = cardRouter;
