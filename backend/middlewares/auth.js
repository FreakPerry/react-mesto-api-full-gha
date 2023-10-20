require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const authMiddleware = (req, res, next) => {
  let payload;
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send({ message: 'Authorization required' });
    }
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Authorization required' });
  }
};

module.exports = authMiddleware;
