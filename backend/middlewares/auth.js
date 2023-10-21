require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const CastomError = require('../utils/errors/CastomError');
const { UNAUTHORIZED } = require('../utils/constants');

const authMiddleware = (req, res, next) => {
  let payload;
  try {
    const { token } = req.cookies;
    if (!token) {
      next(new CastomError('Authorization required', UNAUTHORIZED));
    } else {
      payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    }
  } catch (e) {
    return next(new CastomError('Authorization required', UNAUTHORIZED));
  }
};

module.exports = authMiddleware;
