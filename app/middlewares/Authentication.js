const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config');

function authenticate(req, res, next){
    const token = req.headers.authorization;
    jwt.verify(token, SECRET_KEY, (err, payload) =>{
      if (err) {
        return res.status(200).send(errorCode.invalid_token);
      }
      req.userId = payload._id;
      return next();
    });
}
module.exports = {
  authenticate
}