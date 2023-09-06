const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      console.log(`proizowla owibka ${err}`);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      console.log(`proizowla owibka ${err}`);
    });
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      console.log(`proizowla owibka ${err}`);
    });
};

module.exports = { getUsers, getUser, updateUser };