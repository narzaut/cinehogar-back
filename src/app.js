const express = require('express');
const cors = require('cors');
const compression = require('compression');
const httpStatus = require('http-status');
const helmet = require('helmet');
const xss = require('xss-clean');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const userRoute = require('./routes/v1/user.route.js');
const authRoute = require('./routes/v1/auth.route.js');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1/users', userRoute);
app.use('/v1/auth', authRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;