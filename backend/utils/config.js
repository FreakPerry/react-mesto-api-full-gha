require('dotenv').config();

const { DATABASE_URL, PORT, JWT_SECRET, NODE_ENV, CORS_ORIGIN } = process.env;

module.exports = {
  DATABASE_URL,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  CORS_ORIGIN,
};
