function validate(req, res, next){
  const token = req.headers.authorization;
  if (token === null || !token){
    return res.status(200).send(errorCode.authorization_required);
  }
  next();
};

module.exports = validate;