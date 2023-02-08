require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { PORT, DB_ADDRESS } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('strictQuery', false);
mongoose.connect(DB_ADDRESS, () => {
  console.log('MongoDB подключен');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestLogger);

app.use('/', require('./routes/auth'));
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));
app.use(require('./middlewares/not-found-path'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errors'));

app.listen(PORT);
