/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from '../config/passport';


dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return `Bearer ${token}`;
};

// export const verifyToken = (req, res, next) => {
//   let token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({
//       status: 403,
//       error: 'No token supplied'
//     });
//   }
//   token = token.split(' ')[1];
//   jwt.verify(token, process.env.SECRETKEY, (error, authData) => {
//     // console.log('authData', authData);
//     if (error) {
//       if (error.message.includes('signature')) {
//         return res.status(403).json({
//           status: 403,
//           error: 'Invalid token supplied'
//         });
//       }
//       return res.status(403).json({
//         status: 403,
//         error: error.message
//       });
//     }
//     req.authData = authData;
//     return next();
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   const { isAdmin } = req.authData.payload;
//   if (isAdmin) {
//     return next();
//   }

//   return res.status(401).json({
//     status: 401,
//     error: 'You do not have permissions to access this route'
//   });
// };

/**
   * Checks for admin
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {function} next function
   *
   */
export const verifyAdmin = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    return next();
  }

  return res.status(401).json({
    status: 401,
    error: 'You do not have permissions to access this route'
  });
};

/**
   * Checks for User's Token
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {function} next function
   *
   */
export const passportJWTCheck = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: 'No token supplied'
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
