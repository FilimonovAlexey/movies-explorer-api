const validationError = require('../utils/errors/validation-error');
const { COMMON_ERROR_CODE } = require('../utils/errors/errorConstants');
const conflictError = require('../utils/errors/conflict-error');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
    return;
  }

  if (err.code === 11000) {
    res.status(conflictError.statusCode).send({
      message: conflictError.message,
    });
    return;
  }

  const { statusCode = COMMON_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === COMMON_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
  });

  next();
};
