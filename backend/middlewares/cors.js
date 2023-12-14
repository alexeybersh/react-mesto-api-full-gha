const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  '*',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://mesto.balex.nomoredomainsmonster.ru',
  'http://mesto.balex.nomoredomainsmonster.ru',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['Access-control-request-headers'];
  console.log(origin, method, requestHeaders, req.headers);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  next();

  return true;
};
