const User = require('../models/user.model');
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')

const createUser = async (userBody) => {
	if (await User.isEmailTaken(userBody.email)) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	return User.create({ ...userBody, password: bcrypt.hashSync(userBody.password, 10) });
};

const getUsers = async () => {
	const users = await User.findAll();
	if (!users.length) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return users
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	return user
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({
		where: {
			email: userEmail
		}
	});
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
	Object.assign(user, !updateBody.password ? updateBody : { ...updateBody, password: bcrypt.hashSync(updateBody.password, 10) });
  await user.save();
  return user;
}


module.exports = {
  getUsers,
	getUserById,
	getUserByEmail,
	deleteUserById,
	createUser,
	updateUserById
};
