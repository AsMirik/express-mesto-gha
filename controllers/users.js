const User = require('../models/user');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return next(new ServerError());
  }
};

module.exports.getUserById = async (req, res, next) => {
  const id = req.user._id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }

    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError());
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({
      name, about, avatar,
    });

    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }

    return next(new ServerError());
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }

    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }

    return next(new ServerError());
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }

    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }

    return next(new ServerError());
  }
};
