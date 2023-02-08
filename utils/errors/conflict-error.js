const { CONFLICT_ERROR_CODE } = require('./errorConstants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = new ConflictError(
  'Пользователь с указанным email уже существует',
);
