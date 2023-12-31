const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const { errors } = require('celebrate');
const { connect } = require('mongoose');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const { userValidateAuth } = require('./middlewares/userValidate');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

// app.use(cors({
//   origin: ['http://localhost:3001', 'https://mesto.balex.nomoredomainsmonster.ru'],
//   credentials: true,
//   maxAge: 30,
// }));

app.use(requestLogger);

app.use(
  rateLimit({
    max: 100,
  }),
);

app.use(helmet());

connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.post('/signin', userValidateAuth, login);

app.post('/signup', userValidateAuth, createUser);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
});
