/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const cardModel = require('../models/card');
const {
  NotFoundError,
  DataError,
  ForbidenError,
} = require('../errors');

function getAllCards(req, res, next) {
  return cardModel
    .find({}).sort({ _id: -1 }).limit(12)
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
}

function createCard(req, res, next) {
  const cardData = req.body;
  const userId = req.user._id;

  return cardModel
    .create({
      name: cardData.name,
      link: cardData.link,
      owner: userId,
    })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Введены некорректные данные'));
      }
      return next(err);
    });
}

function deleteCard(req, res, next) {
  const userId = req.user._id;
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() === userId.toString()) {
        return card
          .deleteOne({ cardId })
          // eslint-disable-next-line consistent-return
          .then((card) => res.send({ message: `Deleted: ${card._id}` }));
      }
      return next(new ForbidenError('Нет доступа'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new DataError('Введены некорректные данные'));
      }
      return next(err);
    });
}

function handlerLikes(req, res, next, findOption) {
  return cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      findOption,
      { new: true },
    )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return next(new NotFoundError('Карточка не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return next(err);
    });
}

function likeCard(req, res, next) {
  handlerLikes(req, res, next, {
    $addToSet: {
      likes: req.user._id,
    },
  });
}

function dislikeCard(req, res, next) {
  handlerLikes(req, res, next, {
    $pull: {
      likes: req.user._id,
    },
  });
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
