const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка.' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданы некорректные данные.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(404);
    })
    .then(() => res.status(200).send({ message: 'Удаление карточки выполнено.' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан неправильный id карточки.' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Карточка с таким id не найдена.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(404);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданы некорректные данные.' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан неправильный id карточки.' });
      }
      if (res.statusCode === 404) {
        return res.send({ message: 'Запрашиваемая карточка не найдена.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(404);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданы некорректные данные.' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан неправильный id карточки.' });
      }
      if (res.statusCode === 404) {
        return res.send({ message: 'Запрашиваемая карточка не найдена.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
