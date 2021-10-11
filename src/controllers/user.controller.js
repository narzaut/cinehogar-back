const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status')

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
	res.status(httpStatus.OK).send(users);
});

const getUser = catchAsync(async (req, res) => {
	const user = await userService.getUserById(req.params.userId)
	res.status(httpStatus.OK).send(user);
})

const deleteUser = catchAsync(async (req, res) => {
	await userService.deleteUserById(req.params.userId)
	res.status(httpStatus.NO_CONTENT).send()
})

const updateUser = catchAsync(async (req, res) => {
	const user = await userService.updateUserById(req.params.userId, req.body)
	res.status(httpStatus.OK).send(user);

})


module.exports = {
  getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser
};
