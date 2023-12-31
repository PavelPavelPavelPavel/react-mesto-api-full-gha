const { celebrate, Joi } = require('celebrate');
const { urlValidation, idValidation } = require('../config');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlValidation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const validateUserAvatar = celebrate({
  body: Joi.object().required().keys({
    avatar: Joi.string().pattern(urlValidation),
  }).unknown(true),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const validateIdUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(idValidation),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUserAvatar,
  validateUpdateUserInfo,
  validateIdUser,
};
