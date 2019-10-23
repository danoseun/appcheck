/* eslint-disable max-len */
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import passport from './config/passport';
import connect from './config/config';
import {
  defaultRouter, userRouter, protectedRouter
} from './routes';


dotenv.config();

const app = express();

// Connect to the db
connect();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((error) => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
// require('./config/passport')(passport);

// const testURI = process.env.TEST_URI;
// if (process.env.NODE_ENV === 'test') {
//   mongoose.connect(testURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then(() => console.log('TEST MongoDB connected'))
//     .catch((error) => console.log(error));
// }


app.use('/api', userRouter);
app.use('/api', protectedRouter);
// app.use('/api', publicRouter);
app.use('/api', defaultRouter);

// const portNum = 80;
// if (process.env.NODE_ENV === 'test') {
//   app.listen(portNum, () => {
//     console.log(`Server is live on PORT ${portNum}`);
//   });
// }
const port = process.env.PORT || 1010;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is live on PORT ${port}`);
  });
}


export default app;
