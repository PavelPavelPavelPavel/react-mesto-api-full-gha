const { celebrate, Joi } = require('celebrate');
const { urlValidation, idValidation } = require('../config');

const validateCreateCard = celebrate({
  body: Joi.object().required().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(urlValidation),
  }).unknown(true),
});

const validateIdCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(idValidation),
  }),
});

module.exports = {
  validateCreateCard,
  validateIdCard,
};
