const User = require('../models/user.model');
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')

const createUser = async (userBody) => {
	if (await User.isEmailTaken(userBody.email)) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	userBody.password = bcrypt.hashSync(userBody.password, 10)
  return User.create(userBody);
};

const getUsers = async () => {
	const users = await User.findAll();
	if (!users) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return users
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	return user
};

const deleteUserById = async (userId) => {
	const user = await User.findByPk(userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  await User.destroy({
		where: {
			id: userId
		}
	})
}

const updateUserById = async (userId, updateBody) => {
	const user = await User.findByPk(userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	if (updateBody.email && (await User.isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
	if (updateBody.password){
		updateBody.password = bcrypt.hashSync(updateBody.password, 10)
	} 
	Object.assign(user, updateBody);
  await user.save();
  return user;
}


module.exports = {
  getUsers,
	getUserById,
	deleteUserById,
	createUser,
	updateUserById
};
