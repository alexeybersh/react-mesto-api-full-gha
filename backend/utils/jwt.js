const jwt = require('jsonwebtoken');

const { SECRET_CODE, NODE_ENV } = process.env;
const genToken = (payload) => jwt.sign(payload, NODE_ENV ? SECRET_CODE : 'dev_simple_code', { expiresIn: '7d' });
module.exports = { genToken };
