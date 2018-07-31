const Joi = require('joi');
module.exports = Joi.object().keys({
  email: Joi.string().email({minDomainAtoms: 2}).invalid(null).options({abortEarly: true}),
  name: Joi.string().allow(""),
  about: Joi.string().allow(""),
  status: Joi.string().allow(""),
  birthday: Joi.date().iso().allow(""),
  gender: Joi.string().valid("female", "male", "other", ""), // 0: female, 1: male, 2: undefined
  picture: Joi.string().allow("")
});