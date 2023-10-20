require('dotenv').config();

const { DATABASE_URL } = process.env;
const { PORT } = process.env;

module.exports = {
  DATABASE_URL,
  PORT,
};
