const mongoose = require('mongoose');
const cardModel = require('../models/card');

const {
  OK,
  CREATED,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
} = require('../utils/constants');
const CastomError = require('../utils/errors/CastomError');

const getCards = async (req, res, next) => {
  try {
    const cards = await cardModel.find();
    res.status(OK).send(cards);
  } catch (e) {
    next(e);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await cardModel.create({ name, link, owner: req.user._id });
    res.status(CREATED).send(card);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new CastomError(e.message, BAD_REQUEST));
    } else {
      next(e);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { user } = req;
    const card = await cardModel.findById(cardId).orFail();
    if (card.owner.toString() !== user._id) {
      throw new CastomError("You can't delete other people's cards", FORBIDDEN);
    }
    await cardModel.deleteOne(card);
    res.status(OK).send({ message: 'card was deleted' });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new CastomError(e.message, BAD_REQUEST));
    } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new CastomError('Card not found', NOT_FOUND));
    } else {
      next(e);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const updatedCard = await cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        {
          new: true,
        },
      )
      .orFail();
    return res.status(OK).send(updatedCard);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new CastomError(e.message, BAD_REQUEST));
    } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new CastomError('Card not found', NOT_FOUND));
    } else {
      next(e);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const updatedCard = await cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        {
          new: true,
        },
      )
      .orFail();
    return res.status(OK).send(updatedCard);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new CastomError(e.message, BAD_REQUEST));
    } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new CastomError('Card not found', NOT_FOUND));
    } else {
      next(e);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
