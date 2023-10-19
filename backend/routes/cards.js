const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { cardValidator, cardIdValidator } = require('../utils/validators/cardValidator');

router.delete('/:cardId', cardIdValidator, deleteCard);
router.get('/', getCards);
router.post('/', cardValidator, createCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
