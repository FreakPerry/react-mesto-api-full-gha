require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const appRouter = require('./routes/index');
const { NOT_FOUND } = require('./utils/constants');
const { login, createUser, logout } = require('./controllers/users');
const error = require('./middlewares/error');
const authMiddleware = require('./middlewares/auth');
const {
  loginValidator,
  registerValidator,
} = require('./utils/validators/userValidator');
const { DATABASE_URL, PORT } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cookieParser());

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Подключено к MongoDB');
  })
  .catch((e) => {
    console.error('Ошибка подключения к MongoDB:', e);
  });

app.use(
  cors({
    origin: 'https://e-tatarenko.nomoredomainsrocks.ru',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', registerValidator, createUser);
app.post('/logout', logout);

app.use(authMiddleware);
app.use(appRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({
    message: 'The requested page was not found',
  });
});

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
