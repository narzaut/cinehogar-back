
const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const User = require('../models/user.model')

const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await userService.getUserByEmail(email);
	if ( ! await User.isPasswordMatch(email, password) ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  return user;
}

module.exports = {
  loginUserWithEmailAndPassword,
};