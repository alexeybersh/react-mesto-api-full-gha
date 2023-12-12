/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { errorMessage } = require('../utils/errorsMessage');

const { SECRET_CODE, NODE_ENV } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(errorMessage({ message: 'Необходима авторизация' }));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? SECRET_CODE : 'dev_simple_code');
  } catch (err) {
    return next(errorMessage({ message: 'Необходима авторизация' }));
  }

  req.user = payload;

  next();
};
