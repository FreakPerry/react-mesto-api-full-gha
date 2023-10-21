const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const CastomError = require('../utils/errors/CastomError');
const { UNAUTHORIZED } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value) => {
          validator.isURL(value);
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.checkUser = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return Promise.reject(
      new CastomError('Неверная почта или пароль', UNAUTHORIZED),
    );
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return Promise.reject(
      new CastomError('Неверная почта или пароль', UNAUTHORIZED),
    );
  }

  if (user && match) {
    return user;
  }
};

module.exports = mongoose.model('user', userSchema);
