const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');


const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(200).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();
  res.send(result);
});

module.exports = {
  getUsers,
	createUser
};
