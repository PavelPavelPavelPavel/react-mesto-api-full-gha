const { celebrate, Joi } = require('celebrate');

const jwtValidation = /^([\w\W]{36}\.)([\w\W]{91}\.)([\w\W]{43})$/;

const validateJwt = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().pattern(jwtValidation).replace('Bearer ', ' '),
  }).unknown(true),
});

module.exports = validateJwt;
