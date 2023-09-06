const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
};

const getUser = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
