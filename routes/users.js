const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getСurrentUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/me', getСurrentUser);

router.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/(?:[a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,9}(?:\/[^/]+)*\/[^/]+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)$/i),
  }),
}), updateUserAvatar);

module.exports = router;
