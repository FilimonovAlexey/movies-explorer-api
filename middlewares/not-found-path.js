const NotFoundError = require('../utils/errors/notFound-error');

module.exports = () => {
  throw new NotFoundError('Указанного пути не существует');
};
