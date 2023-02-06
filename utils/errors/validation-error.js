const { VALIDATION_ERROR_CODE } = require('./errorConstants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = new ValidationError('Ошибка валидации. Преданы некорректные данные!');
