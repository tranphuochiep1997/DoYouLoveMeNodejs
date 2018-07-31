const Joi = require('joi');
const schema = require('../ValidationSchema/UpdateUserSchema');

function Validate(req, res, next){
  const result = Joi.validate(req.body, schema);
  if (!result.error){
    return next();
  }
  let response = errorCode.validation_error;
  response.message = result.error.details[0].message;
  response.data = null;
  response.status = 400;
  res.status(200).send(response);
};

module.exports = Validate;