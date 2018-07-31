const Joi = require('joi');
module.exports = Joi.object().keys({
  email: Joi.string().email({minDomainAtoms: 2}).required().invalid(null).options({abortEarly: true}),
  password: Joi.string().required().min(1).max(200).invalid(null).options({abortEarly: true}),
  name: Joi.string(),
  about: Joi.string(),
  status: Joi.string(),
  birthday: Joi.date().iso(),
  gender: Joi.string().valid("female", "male", "other", ""), // 0: female, 1: male, 2: undefined
  picture: Joi.string()
});