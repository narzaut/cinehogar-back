const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const httpStatus = require('http-status')

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
	const tokens = await tokenService.generateAuthTokens(user);

  res.send({ user, tokens });
});

module.exports = {
  login
};
