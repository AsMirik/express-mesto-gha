const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};

// const auth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;
//
//   try {
//     payload = jwt.verify(token, 'SECRETCODE');
//   } catch (err) {
//     next(new AuthError('Ошибка авторизации'));
//   }
//   req.user = payload;
//   next();
// };
//
// module.exports = auth;
