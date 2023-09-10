const jwt = require('jsonwebtoken');
const AuthorizationError = require('./errors/authorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthorizationError('Залогинитесь используя почту и пароль.'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'jwt-secret-word');
  } catch (err) {
    next(new AuthorizationError('Залогинитесь используя почту и пароль.'));
    return;
  }

  req.user = payload;

  next();
};
