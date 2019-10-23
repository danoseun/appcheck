/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import 'dotenv/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import mongoose from 'mongoose';
import passport from 'passport';
import { User } from '../models';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

passport.use(new Strategy(opts, (jwt_payload, done) => {
  // console.log('JWT', jwt_payload.payload);
  User.findById(jwt_payload.payload._id).then((user) => {
    // console.log('PAYLOAD', user);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }).catch((error) => console.log(error));
}));

export const verifyIsAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized to access this route'
    });
  }
};
export default passport;
