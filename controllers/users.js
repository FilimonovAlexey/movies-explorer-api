const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFound-error');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => next(err));
  });
};

module.exports.getProfileData = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => next(err));
};

module.exports.updateProfileData = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(201).send({ email: user.email, name: user.name });
    })
    .catch((err) => next(err));
};
