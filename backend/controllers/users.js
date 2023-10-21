require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const { JWT_SECRET } = require('../utils/config');

const {
  OK,
  CREATED,
  CONFLICT,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
} = require('../utils/constants');
const CastomError = require('../utils/errors/CastomError');

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.status(CREATED).send(userWithoutPassword);
  } catch (e) {
    if (e.code === 11000) {
      next(new CastomError('User with this email already exists', CONFLICT));
    }
    if (e instanceof mongoose.Error.ValidationError) {
      next(new CastomError('Invalid data entered', BAD_REQUEST));
    }
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.checkUser(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
      })
      .status(OK)
      .send(user);
  } catch (e) {
    if (e.message === 'Неверная почта или пароль') {
      next(new CastomError('Неверная почта или пароль', UNAUTHORIZED));
    }
    next(e);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(OK).send({ message: 'Вы успешно вышли из системы' });
  } catch (e) {
    console.log(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    return res.status(OK).send(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).orFail();

    return res.status(OK).send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      next(new CastomError(e.message, BAD_REQUEST));
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new CastomError('User is not found', NOT_FOUND));
    }
    next(e);
  }
};

const updateUser = async (req, res, updateData, next) => {
  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(req.user._id, updateData, {
        new: true,
        runValidators: true,
      })
      .orFail();
    res.status(OK).send(updatedUser);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(new CastomError(e.message, BAD_REQUEST));
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      next(new CastomError('User is not found', NOT_FOUND));
    }
    next(e);
  }
};

const updateUserById = async (req, res) => {
  const { name, about } = req.body;
  const updateData = { name, about };
  updateUser(req, res, updateData);
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const updateData = { avatar };
  updateUser(req, res, updateData);
};

const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    res.status(OK).send(user);
  } catch (e) {
    next(new CastomError('User is not found', NOT_FOUND));
    next(e);
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatar,
  getMe,
  logout,
};
